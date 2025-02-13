var ar = Object.defineProperty;
var rr = (n, t, e) => t in n ? ar(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var V = (n, t, e) => rr(n, typeof t != "symbol" ? t + "" : t, e);
import { defineComponent as $, h as fn, ref as K, computed as _, onMounted as ye, watch as pe, onUnmounted as Ce, Comment as lr, cloneVNode as or, openBlock as i, createElementBlock as f, normalizeClass as O, createElementVNode as c, withModifiers as te, createTextVNode as F, toDisplayString as h, unref as R, Fragment as Q, renderList as Z, createVNode as ne, withKeys as J, withCtx as U, createBlock as j, resolveDynamicComponent as ge, mergeProps as W, createCommentVNode as y, useId as Qn, inject as Qe, toRef as ot, renderSlot as L, provide as Oe, resolveComponent as xe, useCssVars as kt, nextTick as Yn, normalizeStyle as De, normalizeProps as Te, mergeModels as Be, useModel as _e, withDirectives as Se, vModelCheckbox as st, guardReactiveProps as wt, useAttrs as sr, useSlots as zt, hasInjectionContext as ir, useTemplateRef as ur, reactive as dr, Teleport as cr, vModelSelect as Gt, onBeforeUnmount as fr, Transition as pr, vShow as mr, toHandlers as hr } from "vue";
const zn = /^[a-z0-9]+(-[a-z0-9]+)*$/, _t = (n, t, e, a = "") => {
  const r = n.split(":");
  if (n.slice(0, 1) === "@") {
    if (r.length < 2 || r.length > 3)
      return null;
    a = r.shift().slice(1);
  }
  if (r.length > 3 || !r.length)
    return null;
  if (r.length > 1) {
    const s = r.pop(), u = r.pop(), d = {
      // Allow provider without '@': "provider:prefix:name"
      provider: r.length > 0 ? r[0] : a,
      prefix: u,
      name: s
    };
    return t && !dt(d) ? null : d;
  }
  const l = r[0], o = l.split("-");
  if (o.length > 1) {
    const s = {
      provider: a,
      prefix: o.shift(),
      name: o.join("-")
    };
    return t && !dt(s) ? null : s;
  }
  if (e && a === "") {
    const s = {
      provider: a,
      prefix: "",
      name: l
    };
    return t && !dt(s, e) ? null : s;
  }
  return null;
}, dt = (n, t) => n ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((t && n.prefix === "" || n.prefix) && n.name) : !1, Gn = Object.freeze(
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
  ...Gn,
  ...pt
}), At = Object.freeze({
  ...xt,
  body: "",
  hidden: !1
});
function vr(n, t) {
  const e = {};
  !n.hFlip != !t.hFlip && (e.hFlip = !0), !n.vFlip != !t.vFlip && (e.vFlip = !0);
  const a = ((n.rotate || 0) + (t.rotate || 0)) % 4;
  return a && (e.rotate = a), e;
}
function pn(n, t) {
  const e = vr(n, t);
  for (const a in At)
    a in pt ? a in n && !(a in e) && (e[a] = pt[a]) : a in t ? e[a] = t[a] : a in n && (e[a] = n[a]);
  return e;
}
function gr(n, t) {
  const e = n.icons, a = n.aliases || /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  function l(o) {
    if (e[o])
      return r[o] = [];
    if (!(o in r)) {
      r[o] = null;
      const s = a[o] && a[o].parent, u = s && l(s);
      u && (r[o] = [s].concat(u));
    }
    return r[o];
  }
  return Object.keys(e).concat(Object.keys(a)).forEach(l), r;
}
function br(n, t, e) {
  const a = n.icons, r = n.aliases || /* @__PURE__ */ Object.create(null);
  let l = {};
  function o(s) {
    l = pn(
      a[s] || r[s],
      l
    );
  }
  return o(t), e.forEach(o), pn(n, l);
}
function Xn(n, t) {
  const e = [];
  if (typeof n != "object" || typeof n.icons != "object")
    return e;
  n.not_found instanceof Array && n.not_found.forEach((r) => {
    t(r, null), e.push(r);
  });
  const a = gr(n);
  for (const r in a) {
    const l = a[r];
    l && (t(r, br(n, r, l)), e.push(r));
  }
  return e;
}
const yr = {
  provider: "",
  aliases: {},
  not_found: {},
  ...Gn
};
function Mt(n, t) {
  for (const e in t)
    if (e in n && typeof n[e] != typeof t[e])
      return !1;
  return !0;
}
function Un(n) {
  if (typeof n != "object" || n === null)
    return null;
  const t = n;
  if (typeof t.prefix != "string" || !n.icons || typeof n.icons != "object" || !Mt(n, yr))
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
        At
      )
    )
      return null;
  }
  const a = t.aliases || /* @__PURE__ */ Object.create(null);
  for (const r in a) {
    const l = a[r], o = l.parent;
    if (
      // Name cannot be empty
      !r || // Parent must be set and point to existing icon
      typeof o != "string" || !e[o] && !a[o] || // Check other props
      !Mt(
        l,
        At
      )
    )
      return null;
  }
  return t;
}
const mn = /* @__PURE__ */ Object.create(null);
function kr(n, t) {
  return {
    provider: n,
    prefix: t,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function qe(n, t) {
  const e = mn[n] || (mn[n] = /* @__PURE__ */ Object.create(null));
  return e[t] || (e[t] = kr(n, t));
}
function Xt(n, t) {
  return Un(t) ? Xn(t, (e, a) => {
    a ? n.icons[e] = a : n.missing.add(e);
  }) : [];
}
function wr(n, t, e) {
  try {
    if (typeof e.body == "string")
      return n.icons[t] = { ...e }, !0;
  } catch {
  }
  return !1;
}
let tt = !1;
function Zn(n) {
  return typeof n == "boolean" && (tt = n), tt;
}
function _r(n) {
  const t = typeof n == "string" ? _t(n, !0, tt) : n;
  if (t) {
    const e = qe(t.provider, t.prefix), a = t.name;
    return e.icons[a] || (e.missing.has(a) ? null : void 0);
  }
}
function xr(n, t) {
  const e = _t(n, !0, tt);
  if (!e)
    return !1;
  const a = qe(e.provider, e.prefix);
  return t ? wr(a, e.name, t) : (a.missing.add(e.name), !0);
}
function Ir(n, t) {
  if (typeof n != "object")
    return !1;
  if (typeof t != "string" && (t = n.provider || ""), tt && !t && !n.prefix) {
    let r = !1;
    return Un(n) && (n.prefix = "", Xn(n, (l, o) => {
      xr(l, o) && (r = !0);
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
  return !!Xt(a, n);
}
const Jn = Object.freeze({
  width: null,
  height: null
}), ea = Object.freeze({
  // Dimensions
  ...Jn,
  // Transformations
  ...pt
}), Dr = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Tr = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function hn(n, t, e) {
  if (t === 1)
    return n;
  if (e = e || 100, typeof n == "number")
    return Math.ceil(n * t * e) / e;
  if (typeof n != "string")
    return n;
  const a = n.split(Dr);
  if (a === null || !a.length)
    return n;
  const r = [];
  let l = a.shift(), o = Tr.test(l);
  for (; ; ) {
    if (o) {
      const s = parseFloat(l);
      isNaN(s) ? r.push(l) : r.push(Math.ceil(s * t * e) / e);
    } else
      r.push(l);
    if (l = a.shift(), l === void 0)
      return r.join("");
    o = !o;
  }
}
function Cr(n, t = "defs") {
  let e = "";
  const a = n.indexOf("<" + t);
  for (; a >= 0; ) {
    const r = n.indexOf(">", a), l = n.indexOf("</" + t);
    if (r === -1 || l === -1)
      break;
    const o = n.indexOf(">", l);
    if (o === -1)
      break;
    e += n.slice(r + 1, l).trim(), n = n.slice(0, a).trim() + n.slice(o + 1);
  }
  return {
    defs: e,
    content: n
  };
}
function Er(n, t) {
  return n ? "<defs>" + n + "</defs>" + t : t;
}
function Pr(n, t, e) {
  const a = Cr(n);
  return Er(a.defs, t + a.content + e);
}
const Mr = (n) => n === "unset" || n === "undefined" || n === "none";
function Lr(n, t) {
  const e = {
    ...xt,
    ...n
  }, a = {
    ...ea,
    ...t
  }, r = {
    left: e.left,
    top: e.top,
    width: e.width,
    height: e.height
  };
  let l = e.body;
  [e, a].forEach((S) => {
    const w = [], x = S.hFlip, T = S.vFlip;
    let M = S.rotate;
    x ? T ? M += 2 : (w.push(
      "translate(" + (r.width + r.left).toString() + " " + (0 - r.top).toString() + ")"
    ), w.push("scale(-1 1)"), r.top = r.left = 0) : T && (w.push(
      "translate(" + (0 - r.left).toString() + " " + (r.height + r.top).toString() + ")"
    ), w.push("scale(1 -1)"), r.top = r.left = 0);
    let D;
    switch (M < 0 && (M -= Math.floor(M / 4) * 4), M = M % 4, M) {
      case 1:
        D = r.height / 2 + r.top, w.unshift(
          "rotate(90 " + D.toString() + " " + D.toString() + ")"
        );
        break;
      case 2:
        w.unshift(
          "rotate(180 " + (r.width / 2 + r.left).toString() + " " + (r.height / 2 + r.top).toString() + ")"
        );
        break;
      case 3:
        D = r.width / 2 + r.left, w.unshift(
          "rotate(-90 " + D.toString() + " " + D.toString() + ")"
        );
        break;
    }
    M % 2 === 1 && (r.left !== r.top && (D = r.left, r.left = r.top, r.top = D), r.width !== r.height && (D = r.width, r.width = r.height, r.height = D)), w.length && (l = Pr(
      l,
      '<g transform="' + w.join(" ") + '">',
      "</g>"
    ));
  });
  const o = a.width, s = a.height, u = r.width, d = r.height;
  let p, m;
  o === null ? (m = s === null ? "1em" : s === "auto" ? d : s, p = hn(m, u / d)) : (p = o === "auto" ? u : o, m = s === null ? hn(p, d / u) : s === "auto" ? d : s);
  const k = {}, E = (S, w) => {
    Mr(w) || (k[S] = w.toString());
  };
  E("width", p), E("height", m);
  const I = [r.left, r.top, u, d];
  return k.viewBox = I.join(" "), {
    attributes: k,
    viewBox: I,
    body: l
  };
}
const Br = /\sid="(\S+)"/g, Sr = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Ar = 0;
function $r(n, t = Sr) {
  const e = [];
  let a;
  for (; a = Br.exec(n); )
    e.push(a[1]);
  if (!e.length)
    return n;
  const r = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return e.forEach((l) => {
    const o = typeof t == "function" ? t(l) : t + (Ar++).toString(), s = l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    n = n.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + s + ')([")]|\\.[a-z])', "g"),
      "$1" + o + r + "$3"
    );
  }), n = n.replace(new RegExp(r, "g"), ""), n;
}
const $t = /* @__PURE__ */ Object.create(null);
function Or(n, t) {
  $t[n] = t;
}
function Ot(n) {
  return $t[n] || $t[""];
}
function Ut(n) {
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
const Zt = /* @__PURE__ */ Object.create(null), Ge = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], ct = [];
for (; Ge.length > 0; )
  Ge.length === 1 || Math.random() > 0.5 ? ct.push(Ge.shift()) : ct.push(Ge.pop());
Zt[""] = Ut({
  resources: ["https://api.iconify.design"].concat(ct)
});
function Rr(n, t) {
  const e = Ut(t);
  return e === null ? !1 : (Zt[n] = e, !0);
}
function Jt(n) {
  return Zt[n];
}
const Fr = () => {
  let n;
  try {
    if (n = fetch, typeof n == "function")
      return n;
  } catch {
  }
};
let vn = Fr();
function Nr(n, t) {
  const e = Jt(n);
  if (!e)
    return 0;
  let a;
  if (!e.maxURL)
    a = 0;
  else {
    let r = 0;
    e.resources.forEach((o) => {
      r = Math.max(r, o.length);
    });
    const l = t + ".json?icons=";
    a = e.maxURL - r - e.path.length - l.length;
  }
  return a;
}
function Vr(n) {
  return n === 404;
}
const qr = (n, t, e) => {
  const a = [], r = Nr(n, t), l = "icons";
  let o = {
    type: l,
    provider: n,
    prefix: t,
    icons: []
  }, s = 0;
  return e.forEach((u, d) => {
    s += u.length + 1, s >= r && d > 0 && (a.push(o), o = {
      type: l,
      provider: n,
      prefix: t,
      icons: []
    }, s = u.length), o.icons.push(u);
  }), a.push(o), a;
};
function jr(n) {
  if (typeof n == "string") {
    const t = Jt(n);
    if (t)
      return t.path;
  }
  return "/";
}
const Hr = (n, t, e) => {
  if (!vn) {
    e("abort", 424);
    return;
  }
  let a = jr(t.provider);
  switch (t.type) {
    case "icons": {
      const l = t.prefix, s = t.icons.join(","), u = new URLSearchParams({
        icons: s
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
  vn(n + a).then((l) => {
    const o = l.status;
    if (o !== 200) {
      setTimeout(() => {
        e(Vr(o) ? "abort" : "next", o);
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
function Kr(n) {
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
    const l = r.provider, o = r.prefix, s = r.name, u = e[l] || (e[l] = /* @__PURE__ */ Object.create(null)), d = u[o] || (u[o] = qe(l, o));
    let p;
    s in d.icons ? p = t.loaded : o === "" || d.missing.has(s) ? p = t.missing : p = t.pending;
    const m = {
      provider: l,
      prefix: o,
      name: s
    };
    p.push(m);
  }), t;
}
function ta(n, t) {
  n.forEach((e) => {
    const a = e.loaderCallbacks;
    a && (e.loaderCallbacks = a.filter((r) => r.id !== t));
  });
}
function Qr(n) {
  n.pendingCallbacksFlag || (n.pendingCallbacksFlag = !0, setTimeout(() => {
    n.pendingCallbacksFlag = !1;
    const t = n.loaderCallbacks ? n.loaderCallbacks.slice(0) : [];
    if (!t.length)
      return;
    let e = !1;
    const a = n.provider, r = n.prefix;
    t.forEach((l) => {
      const o = l.icons, s = o.pending.length;
      o.pending = o.pending.filter((u) => {
        if (u.prefix !== r)
          return !0;
        const d = u.name;
        if (n.icons[d])
          o.loaded.push({
            provider: a,
            prefix: r,
            name: d
          });
        else if (n.missing.has(d))
          o.missing.push({
            provider: a,
            prefix: r,
            name: d
          });
        else
          return e = !0, !0;
        return !1;
      }), o.pending.length !== s && (e || ta([n], l.id), l.callback(
        o.loaded.slice(0),
        o.missing.slice(0),
        o.pending.slice(0),
        l.abort
      ));
    });
  }));
}
let Yr = 0;
function zr(n, t, e) {
  const a = Yr++, r = ta.bind(null, e, a);
  if (!t.pending.length)
    return r;
  const l = {
    id: a,
    icons: t,
    callback: n,
    abort: r
  };
  return e.forEach((o) => {
    (o.loaderCallbacks || (o.loaderCallbacks = [])).push(l);
  }), r;
}
function Gr(n, t = !0, e = !1) {
  const a = [];
  return n.forEach((r) => {
    const l = typeof r == "string" ? _t(r, t, e) : r;
    l && a.push(l);
  }), a;
}
var Xr = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function Ur(n, t, e, a) {
  const r = n.resources.length, l = n.random ? Math.floor(Math.random() * r) : n.index;
  let o;
  if (n.random) {
    let v = n.resources.slice(0);
    for (o = []; v.length > 1; ) {
      const g = Math.floor(Math.random() * v.length);
      o.push(v[g]), v = v.slice(0, g).concat(v.slice(g + 1));
    }
    o = o.concat(v);
  } else
    o = n.resources.slice(l).concat(n.resources.slice(0, l));
  const s = Date.now();
  let u = "pending", d = 0, p, m = null, k = [], E = [];
  typeof a == "function" && E.push(a);
  function I() {
    m && (clearTimeout(m), m = null);
  }
  function S() {
    u === "pending" && (u = "aborted"), I(), k.forEach((v) => {
      v.status === "pending" && (v.status = "aborted");
    }), k = [];
  }
  function w(v, g) {
    g && (E = []), typeof v == "function" && E.push(v);
  }
  function x() {
    return {
      startTime: s,
      payload: t,
      status: u,
      queriesSent: d,
      queriesPending: k.length,
      subscribe: w,
      abort: S
    };
  }
  function T() {
    u = "failed", E.forEach((v) => {
      v(void 0, p);
    });
  }
  function M() {
    k.forEach((v) => {
      v.status === "pending" && (v.status = "aborted");
    }), k = [];
  }
  function D(v, g, C) {
    const q = g !== "success";
    switch (k = k.filter((Y) => Y !== v), u) {
      case "pending":
        break;
      case "failed":
        if (q || !n.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (g === "abort") {
      p = C, T();
      return;
    }
    if (q) {
      p = C, k.length || (o.length ? b() : T());
      return;
    }
    if (I(), M(), !n.random) {
      const Y = n.resources.indexOf(v.resource);
      Y !== -1 && Y !== n.index && (n.index = Y);
    }
    u = "completed", E.forEach((Y) => {
      Y(C);
    });
  }
  function b() {
    if (u !== "pending")
      return;
    I();
    const v = o.shift();
    if (v === void 0) {
      if (k.length) {
        m = setTimeout(() => {
          I(), u === "pending" && (M(), T());
        }, n.timeout);
        return;
      }
      T();
      return;
    }
    const g = {
      status: "pending",
      resource: v,
      callback: (C, q) => {
        D(g, C, q);
      }
    };
    k.push(g), d++, m = setTimeout(b, n.rotate), e(v, t, g.callback);
  }
  return setTimeout(b), x;
}
function na(n) {
  const t = {
    ...Xr,
    ...n
  };
  let e = [];
  function a() {
    e = e.filter((s) => s().status === "pending");
  }
  function r(s, u, d) {
    const p = Ur(
      t,
      s,
      u,
      (m, k) => {
        a(), d && d(m, k);
      }
    );
    return e.push(p), p;
  }
  function l(s) {
    return e.find((u) => s(u)) || null;
  }
  return {
    query: r,
    find: l,
    setIndex: (s) => {
      t.index = s;
    },
    getIndex: () => t.index,
    cleanup: a
  };
}
function gn() {
}
const Lt = /* @__PURE__ */ Object.create(null);
function Zr(n) {
  if (!Lt[n]) {
    const t = Jt(n);
    if (!t)
      return;
    const e = na(t), a = {
      config: t,
      redundancy: e
    };
    Lt[n] = a;
  }
  return Lt[n];
}
function Jr(n, t, e) {
  let a, r;
  if (typeof n == "string") {
    const l = Ot(n);
    if (!l)
      return e(void 0, 424), gn;
    r = l.send;
    const o = Zr(n);
    o && (a = o.redundancy);
  } else {
    const l = Ut(n);
    if (l) {
      a = na(l);
      const o = n.resources ? n.resources[0] : "", s = Ot(o);
      s && (r = s.send);
    }
  }
  return !a || !r ? (e(void 0, 424), gn) : a.query(t, r, e)().abort;
}
const bn = "iconify2", nt = "iconify", aa = nt + "-count", yn = nt + "-version", ra = 36e5, el = 168, tl = 50;
function Rt(n, t) {
  try {
    return n.getItem(t);
  } catch {
  }
}
function en(n, t, e) {
  try {
    return n.setItem(t, e), !0;
  } catch {
  }
}
function kn(n, t) {
  try {
    n.removeItem(t);
  } catch {
  }
}
function Ft(n, t) {
  return en(n, aa, t.toString());
}
function Nt(n) {
  return parseInt(Rt(n, aa)) || 0;
}
const It = {
  local: !0,
  session: !0
}, la = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let tn = !1;
function nl(n) {
  tn = n;
}
let it = typeof window > "u" ? {} : window;
function oa(n) {
  const t = n + "Storage";
  try {
    if (it && it[t] && typeof it[t].length == "number")
      return it[t];
  } catch {
  }
  It[n] = !1;
}
function sa(n, t) {
  const e = oa(n);
  if (!e)
    return;
  const a = Rt(e, yn);
  if (a !== bn) {
    if (a) {
      const s = Nt(e);
      for (let u = 0; u < s; u++)
        kn(e, nt + u.toString());
    }
    en(e, yn, bn), Ft(e, 0);
    return;
  }
  const r = Math.floor(Date.now() / ra) - el, l = (s) => {
    const u = nt + s.toString(), d = Rt(e, u);
    if (typeof d == "string") {
      try {
        const p = JSON.parse(d);
        if (typeof p == "object" && typeof p.cached == "number" && p.cached > r && typeof p.provider == "string" && typeof p.data == "object" && typeof p.data.prefix == "string" && // Valid item: run callback
        t(p, s))
          return !0;
      } catch {
      }
      kn(e, u);
    }
  };
  let o = Nt(e);
  for (let s = o - 1; s >= 0; s--)
    l(s) || (s === o - 1 ? (o--, Ft(e, o)) : la[n].add(s));
}
function ia() {
  if (!tn) {
    nl(!0);
    for (const n in It)
      sa(n, (t) => {
        const e = t.data, a = t.provider, r = e.prefix, l = qe(
          a,
          r
        );
        if (!Xt(l, e).length)
          return !1;
        const o = e.lastModified || -1;
        return l.lastModifiedCached = l.lastModifiedCached ? Math.min(l.lastModifiedCached, o) : o, !0;
      });
  }
}
function al(n, t) {
  const e = n.lastModifiedCached;
  if (
    // Matches or newer
    e && e >= t
  )
    return e === t;
  if (n.lastModifiedCached = t, e)
    for (const a in It)
      sa(a, (r) => {
        const l = r.data;
        return r.provider !== n.provider || l.prefix !== n.prefix || l.lastModified === t;
      });
  return !0;
}
function rl(n, t) {
  tn || ia();
  function e(a) {
    let r;
    if (!It[a] || !(r = oa(a)))
      return;
    const l = la[a];
    let o;
    if (l.size)
      l.delete(o = Array.from(l).shift());
    else if (o = Nt(r), o >= tl || !Ft(r, o + 1))
      return;
    const s = {
      cached: Math.floor(Date.now() / ra),
      provider: n.provider,
      data: t
    };
    return en(
      r,
      nt + o.toString(),
      JSON.stringify(s)
    );
  }
  t.lastModified && !al(n, t.lastModified) || Object.keys(t.icons).length && (t.not_found && (t = Object.assign({}, t), delete t.not_found), e("local") || e("session"));
}
function wn() {
}
function ll(n) {
  n.iconsLoaderFlag || (n.iconsLoaderFlag = !0, setTimeout(() => {
    n.iconsLoaderFlag = !1, Qr(n);
  }));
}
function ol(n) {
  const t = [], e = [];
  return n.forEach((a) => {
    (a.match(zn) ? t : e).push(a);
  }), {
    valid: t,
    invalid: e
  };
}
function Xe(n, t, e, a) {
  function r() {
    const l = n.pendingIcons;
    t.forEach((o) => {
      l && l.delete(o), n.icons[o] || n.missing.add(o);
    });
  }
  if (e && typeof e == "object")
    try {
      if (!Xt(n, e).length) {
        r();
        return;
      }
      a && rl(n, e);
    } catch (l) {
      console.error(l);
    }
  r(), ll(n);
}
function _n(n, t) {
  n instanceof Promise ? n.then((e) => {
    t(e);
  }).catch(() => {
    t(null);
  }) : t(n);
}
function sl(n, t) {
  n.iconsToLoad ? n.iconsToLoad = n.iconsToLoad.concat(t).sort() : n.iconsToLoad = t, n.iconsQueueFlag || (n.iconsQueueFlag = !0, setTimeout(() => {
    n.iconsQueueFlag = !1;
    const { provider: e, prefix: a } = n, r = n.iconsToLoad;
    if (delete n.iconsToLoad, !r || !r.length)
      return;
    const l = n.loadIcon;
    if (n.loadIcons && (r.length > 1 || !l)) {
      _n(
        n.loadIcons(r, a, e),
        (p) => {
          Xe(n, r, p, !1);
        }
      );
      return;
    }
    if (l) {
      r.forEach((p) => {
        const m = l(p, a, e);
        _n(m, (k) => {
          const E = k ? {
            prefix: a,
            icons: {
              [p]: k
            }
          } : null;
          Xe(n, [p], E, !1);
        });
      });
      return;
    }
    const { valid: o, invalid: s } = ol(r);
    if (s.length && Xe(n, s, null, !1), !o.length)
      return;
    const u = a.match(zn) ? Ot(e) : null;
    if (!u) {
      Xe(n, o, null, !1);
      return;
    }
    u.prepare(e, a, o).forEach((p) => {
      Jr(e, p, (m) => {
        Xe(n, p.icons, m, !0);
      });
    });
  }));
}
const il = (n, t) => {
  const e = Gr(n, !0, Zn()), a = Kr(e);
  if (!a.pending.length) {
    let u = !0;
    return t && setTimeout(() => {
      u && t(
        a.loaded,
        a.missing,
        a.pending,
        wn
      );
    }), () => {
      u = !1;
    };
  }
  const r = /* @__PURE__ */ Object.create(null), l = [];
  let o, s;
  return a.pending.forEach((u) => {
    const { provider: d, prefix: p } = u;
    if (p === s && d === o)
      return;
    o = d, s = p, l.push(qe(d, p));
    const m = r[d] || (r[d] = /* @__PURE__ */ Object.create(null));
    m[p] || (m[p] = []);
  }), a.pending.forEach((u) => {
    const { provider: d, prefix: p, name: m } = u, k = qe(d, p), E = k.pendingIcons || (k.pendingIcons = /* @__PURE__ */ new Set());
    E.has(m) || (E.add(m), r[d][p].push(m));
  }), l.forEach((u) => {
    const d = r[u.provider][u.prefix];
    d.length && sl(u, d);
  }), t ? zr(t, a, l) : wn;
};
function ul(n, t) {
  const e = {
    ...n
  };
  for (const a in t) {
    const r = t[a], l = typeof r;
    a in Jn ? (r === null || r && (l === "string" || l === "number")) && (e[a] = r) : l === typeof e[a] && (e[a] = a === "rotate" ? r % 4 : r);
  }
  return e;
}
const dl = /[\s,]+/;
function cl(n, t) {
  t.split(dl).forEach((e) => {
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
function fl(n, t = 0) {
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
function pl(n, t) {
  let e = n.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const a in t)
    e += " " + a + '="' + t[a] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + e + ">" + n + "</svg>";
}
function ml(n) {
  return n.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function hl(n) {
  return "data:image/svg+xml," + ml(n);
}
function vl(n) {
  return 'url("' + hl(n) + '")';
}
const xn = {
  ...ea,
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
}, ua = {
  backgroundColor: "transparent"
}, In = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Dn = {
  webkitMask: Vt,
  mask: Vt,
  background: ua
};
for (const n in Dn) {
  const t = Dn[n];
  for (const e in In)
    t[n + e] = In[e];
}
const ft = {};
["horizontal", "vertical"].forEach((n) => {
  const t = n.slice(0, 1) + "Flip";
  ft[n + "-flip"] = t, ft[n.slice(0, 1) + "-flip"] = t, ft[n + "Flip"] = t;
});
function Tn(n) {
  return n + (n.match(/^[-0-9.]+$/) ? "px" : "");
}
const Cn = (n, t) => {
  const e = ul(xn, t), a = { ...gl }, r = t.mode || "svg", l = {}, o = t.style, s = typeof o == "object" && !(o instanceof Array) ? o : {};
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
          typeof w == "string" && cl(e, w);
          break;
        case "color":
          l.color = w;
          break;
        case "rotate":
          typeof w == "string" ? e[S] = fl(w) : typeof w == "number" && (e[S] = w);
          break;
        case "ariaHidden":
        case "aria-hidden":
          w !== !0 && w !== "true" && delete a["aria-hidden"];
          break;
        default: {
          const x = ft[S];
          x ? (w === !0 || w === "true" || w === 1) && (e[x] = !0) : xn[S] === void 0 && (a[S] = w);
        }
      }
  }
  const u = Lr(n, e), d = u.attributes;
  if (e.inline && (l.verticalAlign = "-0.125em"), r === "svg") {
    a.style = {
      ...l,
      ...s
    }, Object.assign(a, d);
    let S = 0, w = t.id;
    return typeof w == "string" && (w = w.replace(/-/g, "_")), a.innerHTML = $r(u.body, w ? () => w + "ID" + S++ : "iconifyVue"), fn("svg", a);
  }
  const { body: p, width: m, height: k } = n, E = r === "mask" || (r === "bg" ? !1 : p.indexOf("currentColor") !== -1), I = pl(p, {
    ...d,
    width: m + "",
    height: k + ""
  });
  return a.style = {
    ...l,
    "--svg": vl(I),
    width: Tn(d.width),
    height: Tn(d.height),
    ...bl,
    ...E ? Vt : ua,
    ...s
  }, fn("span", a);
};
Zn(!0);
Or("", Wr);
if (typeof document < "u" && typeof window < "u") {
  ia();
  const n = window;
  if (n.IconifyPreload !== void 0) {
    const t = n.IconifyPreload, e = "Invalid IconifyPreload syntax.";
    typeof t == "object" && t !== null && (t instanceof Array ? t : [t]).forEach((a) => {
      try {
        // Check if item is an object and not null/array
        (typeof a != "object" || a === null || a instanceof Array || // Check for 'icons' and 'prefix'
        typeof a.icons != "object" || typeof a.prefix != "string" || // Add icon set
        !Ir(a)) && console.error(e);
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
          Rr(e, r) || console.error(a);
        } catch {
          console.error(a);
        }
      }
  }
}
const yl = {
  ...xt,
  body: ""
}, kl = $({
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
      let r = _r(a);
      if (!r)
        return (!this._loadingIcon || this._loadingIcon.name !== n) && (this.abortLoading(), this._name = "", r !== null && (this._loadingIcon = {
          name: n,
          abort: il([a], () => {
            this.counter++;
          })
        })), null;
      if (this.abortLoading(), this._name !== n && (this._name = n, t && t(n)), e) {
        r = Object.assign({}, r);
        const o = e(r.body, a.name, a.prefix, a.provider);
        typeof o == "string" && (r.body = o);
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
      return Cn(yl, n);
    let e = n;
    return t.classes && (e = {
      ...n,
      class: (typeof n.class == "string" ? n.class + " " : "") + t.classes.join(" ")
    }), Cn({
      ...xt,
      ...t.data
    }, e);
  }
}), nn = Symbol("accordions"), an = Symbol("header"), Dt = Symbol("tabs"), Ae = () => {
  const n = K(), t = K(!1), e = K(!1), a = () => {
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
      var o, s;
      t.value = !1, l && ((s = (o = n.value) == null ? void 0 : o.querySelector("a")) == null || s.focus()), n.value && r === !1 && n.value.style.removeProperty("--collapse-max-height");
    }
  };
}, ae = (n = "", t = "") => (n ? `${n}-` : "") + Qn() + (t ? `-${t}` : ""), wl = { class: "fr-accordion" }, _l = ["aria-expanded", "aria-controls"], xl = ["id"], Il = /* @__PURE__ */ $({
  __name: "DsfrAccordion",
  props: {
    id: { default: () => ae("accordion") },
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
      onTransitionEnd: o
    } = Ae(), s = K(), u = Qe(nn), { isActive: d, expand: p } = (u == null ? void 0 : u(ot(() => t.title))) ?? { isActive: s, expand: () => s.value = !s.value };
    return ye(() => {
      d.value && l(!0);
    }), pe(d, (m, k) => {
      m !== k && l(m);
    }), (m, k) => (i(), f("section", wl, [
      (i(), j(ge(m.titleTag), { class: "fr-accordion__title" }, {
        default: U(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": R(d),
            "aria-controls": m.id,
            type: "button",
            onClick: k[0] || (k[0] = (E) => R(p)())
          }, [
            L(m.$slots, "title", {}, () => [
              F(h(m.title), 1)
            ])
          ], 8, _l)
        ]),
        _: 3
      })),
      c("div", {
        id: m.id,
        ref_key: "collapse",
        ref: e,
        class: O(["fr-collapse", {
          "fr-collapse--expanded": R(r),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": R(a)
        }]),
        onTransitionend: k[1] || (k[1] = (E) => R(o)(R(d), !1))
      }, [
        L(m.$slots, "default")
      ], 42, xl)
    ]));
  }
}), Dl = { class: "fr-accordions-group" }, Tl = /* @__PURE__ */ $({
  __name: "DsfrAccordionsGroup",
  props: {
    modelValue: { default: -1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: t }) {
    const e = n, a = t, r = _({
      get: () => e.modelValue,
      set(s) {
        a("update:modelValue", s);
      }
    }), l = K(/* @__PURE__ */ new Map()), o = K(0);
    return Oe(nn, (s) => {
      const u = o.value++;
      l.value.set(u, s.value);
      const d = _(() => u === r.value);
      pe(s, () => {
        l.value.set(u, s.value);
      });
      function p() {
        if (r.value === u) {
          r.value = -1;
          return;
        }
        r.value = u;
      }
      return Ce(() => {
        l.value.delete(u);
      }), { isActive: d, expand: p };
    }), (s, u) => (i(), f("div", Dl, [
      L(s.$slots, "default")
    ]));
  }
}), Cl = ["id", "role"], El = ["title", "aria-label"], Pl = /* @__PURE__ */ $({
  __name: "DsfrAlert",
  props: {
    alert: { type: Boolean },
    closed: { type: Boolean },
    closeable: { type: Boolean },
    id: { default: () => ae("basic", "alert") },
    title: { default: "" },
    description: {},
    small: { type: Boolean },
    titleTag: { default: "h3" },
    type: { default: "info" },
    closeButtonLabel: { default: "Fermer" }
  },
  emits: ["close"],
  setup(n, { emit: t }) {
    const e = n, a = t, r = () => a("close"), l = _(
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
      class: O(["fr-alert", l.value]),
      role: o.alert ? "alert" : void 0
    }, [
      o.small ? y("", !0) : (i(), j(ge(o.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: U(() => [
          F(h(o.title), 1)
        ]),
        _: 1
      })),
      L(o.$slots, "default", {}, () => [
        F(h(o.description), 1)
      ]),
      o.closeable ? (i(), f("button", {
        key: 1,
        class: "fr-btn fr-btn--close",
        title: o.closeButtonLabel,
        "aria-label": o.closeButtonLabel,
        onClick: r
      }, null, 8, El)) : y("", !0)
    ], 10, Cl));
  }
}), Ml = /* @__PURE__ */ $({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(n) {
    return (t, e) => (i(), f("a", {
      class: O(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${t.position}`]),
      href: "#top"
    }, h(t.label), 3));
  }
}), Ll = ["title"], da = /* @__PURE__ */ $({
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
      class: O(["fr-badge", {
        [`fr-badge--${t.type}`]: t.type,
        "fr-badge--no-icon": t.noIcon,
        "fr-badge--sm": t.small
      }]),
      title: t.ellipsis ? t.label : void 0
    }, [
      c("span", {
        class: O(t.ellipsis ? "fr-ellipsis" : "")
      }, h(t.label), 3)
    ], 10, Ll));
  }
}), Bl = ["aria-label"], Sl = ["aria-expanded", "aria-controls"], Al = ["id"], $l = { class: "fr-breadcrumb__list" }, Ol = ["aria-current"], Rl = /* @__PURE__ */ $({
  __name: "DsfrBreadcrumb",
  props: {
    breadcrumbId: { default: () => ae("breadcrumb") },
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
    } = Ae(), o = K(!1);
    return pe(o, (s, u) => {
      s !== u && r(s);
    }), (s, u) => {
      const d = xe("RouterLink");
      return i(), f("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": s.navigationLabel
      }, [
        o.value ? y("", !0) : (i(), f("button", {
          key: 0,
          class: "fr-breadcrumb__button",
          "aria-expanded": o.value,
          "aria-controls": s.breadcrumbId,
          onClick: u[0] || (u[0] = (p) => o.value = !o.value)
        }, h(s.showBreadcrumbLabel), 9, Sl)),
        c("div", {
          id: s.breadcrumbId,
          ref_key: "collapse",
          ref: t,
          class: O(["fr-collapse", {
            "fr-collapse--expanded": R(a),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": R(e)
          }]),
          onTransitionend: u[1] || (u[1] = (p) => R(l)(o.value))
        }, [
          c("ol", $l, [
            (i(!0), f(Q, null, Z(s.links, (p, m) => (i(), f("li", {
              key: m,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), j(d, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": m === s.links.length - 1 ? "page" : void 0
              }, {
                default: U(() => [
                  F(h(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : y("", !0),
              p.to ? y("", !0) : (i(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": m === s.links.length - 1 ? "page" : void 0
              }, h(p.text), 9, Ol))
            ]))), 128))
          ])
        ], 42, Al)
      ], 8, Bl);
    };
  }
}), Fl = /* @__PURE__ */ $({
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
    kt((u) => ({
      "177d0d84": s.value
    }));
    const t = n, e = K(null), a = _(() => `${+t.scale * 1.2}rem`), r = _(() => t.flip === "both" ? "horizontal,vertical" : t.flip);
    pe(() => t.title, l);
    async function l() {
      var u, d, p, m;
      if (!((u = e.value) != null && u.$el))
        return;
      const k = !!((d = e.value) == null ? void 0 : d.$el).querySelector("title"), E = document.createElement("title");
      if (!t.title) {
        E.remove();
        return;
      }
      E.innerHTML = t.title, await Yn(), k || (m = ((p = e.value) == null ? void 0 : p.$el).firstChild) == null || m.before(E);
    }
    ye(l);
    const o = _(() => {
      var u;
      return (u = t.name) != null && u.startsWith("vi-") ? t.name.replace(/vi-(.*)/, "vscode-icons:$1") : t.name ?? "";
    }), s = _(() => t.color ?? t.fill ?? "inherit");
    return (u, d) => (i(), j(R(kl), {
      ref_key: "icon",
      ref: e,
      icon: o.value,
      style: De({ fontSize: a.value, verticalAlign: u.verticalAlign, display: u.display }),
      "aria-label": u.label,
      class: O(["vicon", {
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
}), we = (n, t) => {
  const e = n.__vccOpts || n;
  for (const [a, r] of t)
    e[a] = r;
  return e;
}, be = /* @__PURE__ */ we(Fl, [["__scopeId", "data-v-73a1cd7e"]]), Nl = ["title", "disabled", "aria-disabled"], Vl = { key: 1 }, ql = /* @__PURE__ */ $({
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
    const e = n, a = _(() => ["sm", "small"].includes(e.size)), r = _(() => ["md", "medium"].includes(e.size)), l = _(() => ["lg", "large"].includes(e.size)), o = K(null);
    t({ focus: () => {
      var p;
      (p = o.value) == null || p.focus();
    } });
    const s = _(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), u = _(() => e.iconOnly ? 1.25 : 0.8325), d = _(
      () => typeof e.icon == "string" ? { scale: u.value, name: e.icon } : { scale: u.value, ...e.icon }
    );
    return (p, m) => (i(), f("button", {
      ref_key: "btn",
      ref: o,
      class: O(["fr-btn", {
        "fr-btn--secondary": p.secondary && !p.tertiary,
        "fr-btn--tertiary": p.tertiary && !p.secondary && !p.noOutline,
        "fr-btn--tertiary-no-outline": p.tertiary && !p.secondary && p.noOutline,
        "fr-btn--sm": a.value,
        "fr-btn--md": r.value,
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
      style: De(!s.value && p.iconOnly ? { "padding-inline": "0.5rem" } : {}),
      onClick: m[0] || (m[0] = (k) => p.onClick ? p.onClick(k) : () => {
      })
    }, [
      p.icon && !s.value ? (i(), j(be, Te(W({ key: 0 }, d.value)), null, 16)) : y("", !0),
      p.iconOnly ? y("", !0) : (i(), f("span", Vl, [
        F(h(p.label) + " ", 1),
        L(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, Nl));
  }
}), je = /* @__PURE__ */ we(ql, [["__scopeId", "data-v-118397f5"]]), Tt = /* @__PURE__ */ $({
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
    const t = n, e = K(null), a = _(() => ["sm", "small"].includes(t.size)), r = _(() => ["md", "medium"].includes(t.size)), l = _(() => ["lg", "large"].includes(t.size)), o = _(() => ["always", "", !0].includes(t.inlineLayoutWhen)), s = _(() => ["sm", "small"].includes(t.inlineLayoutWhen)), u = _(() => ["md", "medium"].includes(t.inlineLayoutWhen)), d = _(() => ["lg", "large"].includes(t.inlineLayoutWhen)), p = _(() => t.align === "center"), m = _(() => t.align === "right"), k = K("auto"), E = _(() => `--equisized-width: ${k.value};`), I = async () => {
      var S;
      let w = 0;
      await new Promise((x) => setTimeout(x, 100)), (S = e.value) == null || S.querySelectorAll(".fr-btn").forEach((x) => {
        const T = x, M = T.offsetWidth, D = window.getComputedStyle(T), b = +D.marginLeft.replace("px", ""), v = +D.marginRight.replace("px", "");
        T.style.width = "var(--equisized-width)";
        const g = M + b + v;
        g > w && (w = g);
      }), k.value = `${w}px`;
    };
    return ye(async () => {
      !e.value || !t.equisized || await I();
    }), (S, w) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: e,
      style: De(E.value),
      class: O(["fr-btns-group", {
        "fr-btns-group--equisized": S.equisized,
        "fr-btns-group--sm": a.value,
        "fr-btns-group--md": r.value,
        "fr-btns-group--lg": l.value,
        "fr-btns-group--inline-sm": o.value || s.value,
        "fr-btns-group--inline-md": o.value || u.value,
        "fr-btns-group--inline-lg": o.value || d.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": m.value,
        "fr-btns-group--icon-right": S.iconRight,
        "fr-btns-group--inline-reverse": S.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (i(!0), f(Q, null, Z(S.buttons, ({ onClick: x, ...T }, M) => (i(), f("li", { key: M }, [
        ne(je, W({ ref_for: !0 }, T, { onClick: x }), null, 16, ["onClick"])
      ]))), 128)),
      L(S.$slots, "default")
    ], 6));
  }
}), jl = {
  key: 2,
  class: "fr-callout__text"
}, Hl = {
  key: 4,
  class: "fr-callout__text"
}, Wl = /* @__PURE__ */ $({
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
    const t = n, e = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), a = _(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : { ...t.icon ?? {} });
    return (r, l) => (i(), f("div", {
      class: O(["fr-callout", { [String(r.icon)]: e.value }])
    }, [
      r.icon && a.value ? (i(), j(be, Te(W({ key: 0 }, a.value)), null, 16)) : y("", !0),
      r.title ? (i(), j(ge(r.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: U(() => [
          F(h(r.title), 1)
        ]),
        _: 1
      })) : y("", !0),
      r.content ? (i(), f("p", jl, h(r.content), 1)) : y("", !0),
      r.button ? (i(), j(je, Te(W({ key: 3 }, r.button)), null, 16)) : y("", !0),
      r.$slots.default && !r.content ? (i(), f("div", Hl, [
        L(r.$slots, "default", {}, void 0, !0)
      ])) : L(r.$slots, "default", { key: 5 }, void 0, !0)
    ], 2));
  }
}), Kl = /* @__PURE__ */ we(Wl, [["__scopeId", "data-v-c59b3cec"]]), qt = /* @__PURE__ */ $({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(n) {
    const t = n, e = _(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), a = _(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("p", {
      class: O(["fr-card__detail", e.value ? { [String(r.icon)]: e.value } : {}])
    }, [
      r.icon && !e.value ? (i(), j(be, Te(W({ key: 0 }, a.value)), null, 16)) : y("", !0),
      L(r.$slots, "default")
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
}, eo = ["href"], to = {
  key: 0,
  class: "fr-card__header"
}, no = {
  key: 0,
  class: "fr-card__img"
}, ao = ["src", "alt"], ro = {
  key: 1,
  class: "fr-badges-group",
  "data-testid": "card-badges"
}, lo = /* @__PURE__ */ $({
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
    const e = n, a = _(() => ["sm", "small"].includes(e.size)), r = _(() => ["lg", "large"].includes(e.size)), l = _(() => ["sm", "small"].includes(e.imgRatio)), o = _(() => ["lg", "large"].includes(e.imgRatio)), s = _(() => typeof e.link == "string" && e.link.startsWith("http")), u = K(null);
    return t({ goToTargetLink: () => {
      var d;
      ((d = u.value) == null ? void 0 : d.querySelector(".fr-card__link")).click();
    } }), (d, p) => {
      const m = xe("RouterLink");
      return i(), f("div", {
        class: O(["fr-card", {
          "fr-card--horizontal": d.horizontal,
          "fr-enlarge-link": !d.noArrow,
          "fr-card--sm": a.value,
          "fr-card--lg": r.value,
          "fr-card--horizontal-tier": l.value,
          "fr-card--horizontal-half": o.value,
          "fr-card--download": d.download,
          "fr-enlarge-button": d.enlarge
        }]),
        "data-testid": "fr-card"
      }, [
        c("div", Ql, [
          c("div", Yl, [
            (i(), j(ge(d.titleTag), { class: "fr-card__title" }, {
              default: U(() => [
                s.value ? (i(), f("a", {
                  key: 0,
                  href: d.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, h(d.title), 9, zl)) : d.link ? (i(), j(m, {
                  key: 1,
                  to: d.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: p[0] || (p[0] = (k) => k.stopPropagation())
                }, {
                  default: U(() => [
                    F(h(d.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (i(), f(Q, { key: 2 }, [
                  F(h(d.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            c("p", Gl, h(d.description), 1),
            d.$slots["start-details"] || d.detail ? (i(), f("div", Xl, [
              L(d.$slots, "start-details"),
              d.detail ? (i(), j(qt, {
                key: 0,
                icon: d.detailIcon
              }, {
                default: U(() => [
                  F(h(d.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : y("", !0)
            ])) : y("", !0),
            d.$slots["end-details"] || d.endDetail ? (i(), f("div", Ul, [
              L(d.$slots, "end-details"),
              d.endDetail ? (i(), j(qt, {
                key: 0,
                icon: d.endDetailIcon
              }, {
                default: U(() => [
                  F(h(d.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : y("", !0)
            ])) : y("", !0)
          ]),
          d.buttons.length || d.linksGroup.length ? (i(), f("div", Zl, [
            d.buttons.length ? (i(), j(Tt, {
              key: 0,
              buttons: d.buttons,
              "inline-layout-when": "always",
              size: d.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : y("", !0),
            d.linksGroup.length ? (i(), f("ul", Jl, [
              (i(!0), f(Q, null, Z(d.linksGroup, (k, E) => (i(), f("li", {
                key: `card-link-${E}`
              }, [
                k.to ? (i(), j(m, {
                  key: 0,
                  to: k.to
                }, {
                  default: U(() => [
                    F(h(k.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (i(), f("a", {
                  key: 1,
                  href: k.link || k.href,
                  class: O(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": a.value,
                    "fr-link--lg": r.value
                  }])
                }, h(k.label), 11, eo))
              ]))), 128))
            ])) : y("", !0)
          ])) : y("", !0)
        ]),
        d.imgSrc || d.badges.length ? (i(), f("div", to, [
          d.imgSrc ? (i(), f("div", no, [
            c("img", {
              src: d.imgSrc,
              class: "fr-responsive-img",
              alt: d.altImg,
              "data-testid": "card-img"
            }, null, 8, ao)
          ])) : y("", !0),
          d.badges.length ? (i(), f("ul", ro, [
            (i(!0), f(Q, null, Z(d.badges, (k, E) => (i(), f("li", { key: E }, [
              ne(da, W({ ref_for: !0 }, k), null, 16)
            ]))), 128))
          ])) : y("", !0)
        ])) : y("", !0)
      ], 2);
    };
  }
}), oo = ["id", "name", "value", "checked", "required", "data-testid", "data-test", "tabindex"], so = ["for"], io = {
  key: 0,
  class: "required"
}, uo = {
  key: 0,
  class: "fr-hint-text"
}, co = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, fo = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: /* @__PURE__ */ Be({
    id: { default: () => ae("basic", "checkbox") },
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
    kt((l) => ({
      "5f542ece": l.readonlyOpacity
    }));
    const t = n, e = _(() => t.errorMessage || t.validMessage), a = _(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = _e(n, "modelValue");
    return (l, o) => (i(), f("div", {
      class: O(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline, readonly: l.readonly }])
    }, [
      c("div", {
        class: O(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        Se(c("input", W({
          id: l.id,
          "onUpdate:modelValue": o[0] || (o[0] = (s) => r.value = s),
          name: l.name,
          type: "checkbox",
          value: l.value,
          checked: r.value === !0 || Array.isArray(r.value) && r.value.includes(l.value),
          required: l.required
        }, l.$attrs, {
          "data-testid": `input-checkbox-${l.id}`,
          "data-test": `input-checkbox-${l.id}`,
          tabindex: l.readonly ? -1 : void 0
        }), null, 16, oo), [
          [st, r.value]
        ]),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          L(l.$slots, "label", {}, () => [
            F(h(l.label) + " ", 1),
            L(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", io, " *")) : y("", !0)
            ], !0)
          ], !0),
          l.hint ? (i(), f("span", uo, h(l.hint), 1)) : y("", !0)
        ], 8, so),
        e.value ? (i(), f("div", co, [
          c("p", {
            class: O(["fr-message--info flex items-center", a.value])
          }, h(e.value), 3)
        ])) : y("", !0)
      ], 2)
    ], 2));
  }
}), Ct = /* @__PURE__ */ we(fo, [["__scopeId", "data-v-18fa6c7b"]]), po = { class: "fr-form-group" }, mo = ["disabled", "aria-labelledby", "aria-invalid", "role"], ho = ["id"], vo = {
  key: 0,
  class: "required"
}, go = ["id"], bo = /* @__PURE__ */ $({
  __name: "DsfrCheckboxSet",
  props: /* @__PURE__ */ Be({
    titleId: { default: () => ae("checkbox", "set") },
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
    const t = n, e = _(() => t.errorMessage || t.validMessage), a = _(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = _(() => e.value ? `${t.titleId} messages-${t.titleId}` : t.titleId), l = _e(n, "modelValue");
    return (o, s) => (i(), f("div", po, [
      c("fieldset", {
        class: O(["fr-fieldset", {
          "fr-fieldset--error": o.errorMessage,
          "fr-fieldset--valid": !o.errorMessage && o.validMessage
        }]),
        disabled: o.disabled,
        "aria-labelledby": r.value,
        "aria-invalid": o.ariaInvalid,
        role: o.errorMessage || o.validMessage ? "group" : void 0
      }, [
        c("legend", {
          id: o.titleId,
          class: "fr-fieldset__legend fr-text--regular"
        }, [
          L(o.$slots, "legend", {}, () => [
            F(h(o.legend) + " ", 1),
            L(o.$slots, "required-tip", {}, () => [
              o.required ? (i(), f("span", vo, " *")) : y("", !0)
            ])
          ])
        ], 8, ho),
        L(o.$slots, "default", {}, () => [
          (i(!0), f(Q, null, Z(o.options, (u) => (i(), j(Ct, {
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
            class: O(["fr-message--info flex items-center", a.value])
          }, [
            c("span", null, h(e.value), 1)
          ], 2)
        ], 8, go)) : y("", !0)
      ], 10, mo)
    ]));
  }
}), yo = { class: "fr-consent-banner__content" }, ko = { class: "fr-text--sm" }, wo = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, _o = /* @__PURE__ */ $({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(n) {
    const t = n, e = _(() => typeof t.url == "string" && t.url.startsWith("http")), a = _(() => t.url ? e.value ? "a" : "RouterLink" : "a"), r = _(() => ({ [e.value ? "href" : "to"]: t.url }));
    return (l, o) => (i(), f(Q, null, [
      c("div", yo, [
        c("p", ko, [
          L(l.$slots, "default", {}, () => [
            o[4] || (o[4] = F(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (i(), j(ge(a.value), W(r.value, { "data-testid": "link" }), {
              default: U(() => o[3] || (o[3] = [
                F(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            o[5] || (o[5] = F(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      c("ul", wo, [
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: o[0] || (o[0] = te((s) => l.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: o[1] || (o[1] = te((s) => l.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: o[2] || (o[2] = te((s) => l.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), xo = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, Io = { class: "fr-pagination__list" }, Do = ["href", "title", "disabled", "aria-disabled"], To = ["href", "title", "disabled", "aria-disabled"], Co = ["href", "title", "aria-current", "onClick"], Eo = { key: 0 }, Po = { key: 1 }, Mo = ["href", "title", "disabled", "aria-disabled"], Lo = ["href", "title", "disabled", "aria-disabled"], Bo = /* @__PURE__ */ $({
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
    const e = n, a = t, r = _(() => Math.min(e.pages.length - 1 - e.truncLimit, Math.max(e.currentPage - (e.truncLimit - e.truncLimit % 2) / 2, 0))), l = _(() => Math.min(e.pages.length - 1, r.value + e.truncLimit)), o = _(() => e.pages.length > e.truncLimit ? e.pages.slice(r.value, l.value + 1) : e.pages), s = (I) => a("update:current-page", I), u = (I) => s(I), d = () => u(0), p = () => u(Math.max(0, e.currentPage - 1)), m = () => u(Math.min(e.pages.length - 1, e.currentPage + 1)), k = () => u(e.pages.length - 1), E = (I) => e.pages.indexOf(I) === e.currentPage;
    return (I, S) => {
      var w, x, T, M;
      return i(), f("nav", xo, [
        c("ul", Io, [
          c("li", null, [
            c("a", {
              href: (w = I.pages[0]) == null ? void 0 : w.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: I.firstPageTitle,
              disabled: I.currentPage === 0 ? !0 : void 0,
              "aria-disabled": I.currentPage === 0 ? !0 : void 0,
              onClick: S[0] || (S[0] = te((D) => d(), ["prevent"]))
            }, null, 8, Do)
          ]),
          c("li", null, [
            c("a", {
              href: (x = I.pages[Math.max(I.currentPage - 1, 0)]) == null ? void 0 : x.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: I.prevPageTitle,
              disabled: I.currentPage === 0 ? !0 : void 0,
              "aria-disabled": I.currentPage === 0 ? !0 : void 0,
              onClick: S[1] || (S[1] = te((D) => p(), ["prevent"]))
            }, h(I.prevPageTitle), 9, To)
          ]),
          (i(!0), f(Q, null, Z(o.value, (D, b) => (i(), f("li", { key: b }, [
            c("a", {
              href: D == null ? void 0 : D.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: D.title,
              "aria-current": E(D) ? "page" : void 0,
              onClick: te((v) => u(I.pages.indexOf(D)), ["prevent"])
            }, [
              o.value.indexOf(D) === 0 && r.value > 0 ? (i(), f("span", Eo, "...")) : y("", !0),
              F(" " + h(D.label) + " ", 1),
              o.value.indexOf(D) === o.value.length - 1 && l.value < I.pages.length - 1 ? (i(), f("span", Po, "...")) : y("", !0)
            ], 8, Co)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (T = I.pages[Math.min(I.currentPage + 1, I.pages.length - 1)]) == null ? void 0 : T.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: I.nextPageTitle,
              disabled: I.currentPage === I.pages.length - 1 ? !0 : void 0,
              "aria-disabled": I.currentPage === I.pages.length - 1 ? !0 : void 0,
              onClick: S[2] || (S[2] = te((D) => m(), ["prevent"]))
            }, h(I.nextPageTitle), 9, Mo)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (M = I.pages.at(-1)) == null ? void 0 : M.href,
              title: I.lastPageTitle,
              disabled: I.currentPage === I.pages.length - 1 ? !0 : void 0,
              "aria-disabled": I.currentPage === I.pages.length - 1 ? !0 : void 0,
              onClick: S[3] || (S[3] = te((D) => k(), ["prevent"]))
            }, null, 8, Lo)
          ])
        ])
      ]);
    };
  }
}), rn = /* @__PURE__ */ we(Bo, [["__scopeId", "data-v-4dfa8248"]]), So = { class: "fr-table" }, Ao = { class: "fr-table__wrapper" }, $o = { class: "fr-table__container" }, Oo = { class: "fr-table__content" }, Ro = ["id"], Fo = { key: 0 }, No = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Vo = { class: "fr-checkbox-group fr-checkbox-group--sm" }, qo = ["id", "checked"], jo = ["for"], Ho = ["tabindex", "onClick", "onKeydown"], Wo = { key: 0 }, Ko = { key: 1 }, Qo = ["data-row-key"], Yo = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, zo = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Go = ["id", "value"], Xo = ["for"], Uo = ["onKeydown"], Zo = { class: "flex gap-2 items-center" }, Jo = ["selected"], es = ["value", "selected"], ts = { class: "flex ml-1" }, ns = { class: "self-center" }, as = /* @__PURE__ */ $({
  __name: "DsfrDataTable",
  props: /* @__PURE__ */ Be({
    id: { default: () => ae("table") },
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
    const e = n, a = t, r = _e(n, "selection"), l = _e(n, "rowsPerPage"), o = _e(n, "currentPage"), s = _(() => Math.ceil(e.rows.length / l.value)), u = _(() => e.pages ?? Array.from({ length: s.value }).map((b, v) => ({ label: `${v + 1}`, title: `Page ${v + 1}`, href: `#${v + 1}` }))), d = _(() => o.value * l.value), p = _(() => (o.value + 1) * l.value), m = _e(n, "sortedBy"), k = _e(n, "sortedDesc");
    function E(b, v) {
      const g = m.value ?? e.sorted;
      return (b[g] ?? b) < (v[g] ?? v) ? -1 : (b[g] ?? b) > (v[g] ?? v) ? 1 : 0;
    }
    function I(b) {
      if (!(!e.sortableRows || Array.isArray(e.sortableRows) && !e.sortableRows.includes(b))) {
        if (m.value === b) {
          if (k.value) {
            m.value = void 0, k.value = !1;
            return;
          }
          k.value = !0;
          return;
        }
        k.value = !1, m.value = b;
      }
    }
    const S = _(() => {
      const b = m.value ? e.rows.slice().sort(e.sortFn ?? E) : e.rows.slice();
      return k.value && b.reverse(), b;
    }), w = _(() => {
      const b = e.headersRow.map((g) => typeof g != "object" ? g : g.key), v = S.value.map((g) => Array.isArray(g) ? g : b.map((C) => typeof g != "object" ? g : g[C] ?? g));
      return e.pagination ? v.slice(d.value, p.value) : v;
    });
    function x(b) {
      if (b) {
        const v = e.headersRow.findIndex((g) => g.key ?? g);
        r.value = w.value.map((g) => g[v]);
      } else
        r.value.length = 0;
    }
    const T = _(() => r.value.length === w.value.length);
    function M() {
      a("update:current-page", 0), r.value.length = 0;
    }
    function D(b) {
      navigator.clipboard.writeText(b);
    }
    return (b, v) => (i(), f("div", So, [
      c("div", Ao, [
        c("div", $o, [
          c("div", Oo, [
            c("table", { id: b.id }, [
              b.noCaption ? y("", !0) : (i(), f("caption", Fo, h(b.title), 1)),
              c("thead", null, [
                c("tr", null, [
                  b.selectableRows ? (i(), f("th", No, [
                    c("div", Vo, [
                      c("input", {
                        id: `table-select--${b.id}-all`,
                        checked: T.value,
                        type: "checkbox",
                        onInput: v[0] || (v[0] = (g) => x(g.target.checked))
                      }, null, 40, qo),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${b.id}-all`
                      }, " Sélectionner tout ", 8, jo)
                    ])
                  ])) : y("", !0),
                  (i(!0), f(Q, null, Z(b.headersRow, (g, C) => (i(), f("th", W({
                    key: typeof g == "object" ? g.key : g,
                    scope: "col",
                    ref_for: !0
                  }, typeof g == "object" && g.headerAttrs, {
                    tabindex: b.sortableRows ? 0 : void 0,
                    onClick: (q) => I(g.key ?? (Array.isArray(b.rows[0]) ? C : g)),
                    onKeydown: [
                      J((q) => I(g.key ?? g), ["enter"]),
                      J((q) => I(g.key ?? g), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: O({ "sortable-header": b.sortableRows === !0 || Array.isArray(b.sortableRows) && b.sortableRows.includes(g.key ?? g) })
                    }, [
                      L(b.$slots, "header", W({ ref_for: !0 }, typeof g == "object" ? g : { key: g, label: g }), () => [
                        F(h(typeof g == "object" ? g.label : g), 1)
                      ], !0),
                      m.value !== (g.key ?? g) && (b.sortableRows === !0 || Array.isArray(b.sortableRows) && b.sortableRows.includes(g.key ?? g)) ? (i(), f("span", Wo, [
                        ne(be, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : m.value === (g.key ?? g) ? (i(), f("span", Ko, [
                        ne(be, {
                          name: k.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : y("", !0)
                    ], 2)
                  ], 16, Ho))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(Q, null, Z(w.value, (g, C) => (i(), f("tr", {
                  key: `row-${C}`,
                  "data-row-key": C + 1
                }, [
                  b.selectableRows ? (i(), f("th", Yo, [
                    c("div", zo, [
                      Se(c("input", {
                        id: `row-select-${b.id}-${C}`,
                        "onUpdate:modelValue": v[1] || (v[1] = (q) => r.value = q),
                        value: b.rows[C][b.rowKey] ?? `row-${C}`,
                        type: "checkbox"
                      }, null, 8, Go), [
                        [st, r.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${b.id}-${C}`
                      }, " Sélectionner la ligne " + h(C + 1), 9, Xo)
                    ])
                  ])) : y("", !0),
                  (i(!0), f(Q, null, Z(g, (q, Y) => (i(), f("td", {
                    key: typeof q == "object" ? q[b.rowKey] : q,
                    tabindex: "0",
                    onKeydown: [
                      J(te((P) => D(typeof q == "object" ? q[b.rowKey] : q), ["ctrl"]), ["c"]),
                      J(te((P) => D(typeof q == "object" ? q[b.rowKey] : q), ["meta"]), ["c"])
                    ]
                  }, [
                    L(b.$slots, "cell", W({ ref_for: !0 }, {
                      colKey: typeof b.headersRow[Y] == "object" ? b.headersRow[Y].key : b.headersRow[Y],
                      cell: q
                    }), () => [
                      F(h(typeof q == "object" ? q[b.rowKey] : q), 1)
                    ], !0)
                  ], 40, Uo))), 128))
                ], 8, Qo))), 128))
              ])
            ], 8, Ro)
          ])
        ])
      ]),
      c("div", {
        class: O(b.bottomActionBarClass)
      }, [
        L(b.$slots, "pagination", {}, () => [
          b.pagination && !b.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: O(["flex justify-between items-center", b.paginationWrapperClass])
          }, [
            c("div", Zo, [
              v[6] || (v[6] = c("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              Se(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": v[2] || (v[2] = (g) => l.value = g),
                class: "fr-select",
                onChange: v[3] || (v[3] = (g) => M())
              }, [
                c("option", {
                  value: "",
                  selected: !b.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, Jo),
                (i(!0), f(Q, null, Z(b.paginationOptions, (g, C) => (i(), f("option", {
                  key: C,
                  value: g,
                  selected: +g === l.value
                }, h(g), 9, es))), 128))
              ], 544), [
                [Gt, l.value]
              ])
            ]),
            c("div", ts, [
              c("span", ns, "Page " + h(o.value + 1) + " sur " + h(s.value), 1)
            ]),
            ne(rn, {
              "current-page": o.value,
              "onUpdate:currentPage": [
                v[4] || (v[4] = (g) => o.value = g),
                v[5] || (v[5] = (g) => r.value.length = 0)
              ],
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : y("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), rs = /* @__PURE__ */ we(as, [["__scopeId", "data-v-831b7391"]]), ls = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARoAAAFACAYAAABjprMrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAC3eSURBVHgB7Z1bjJxVdu9Xd/XFdl9cHo+i4eryQxIRAjTJC+SEoS2dM/FIMJiMhDMSyM3DwANItqWEh0E6tkeHeQCNbEvwMMwDbeHRAaSMTczRAXIktyGag5JM3FxGhiRSl83FIyWM25dut/ua9a/+vvau3VXV3/7uVfX/SaW6rrrs/X3/WmvtvdfuEBKYCxcuDPX09OzQm+N9fX3HxRG1L3V3d8N+sr+/f1QcUfui2o/Afm5u7vimTZsmxZErV67swbVnXxZHLl26tKNQKAzNzs6OhrG/fPnycGdn5/Di4uLYwMDAmDji98HS0lI5ahuGsSckUSAS09PTS8ZlTwj7Cd9+amrqFXHEtNfLaXEEn2nYT+Ckc7G/evXqPsP+gorWkIu9vn7EbEP9Pjtc7NGGanMhrj7QyzEhqdApJBD6L2gf1LvFAXgBelXy73d0dIyIA/AETHtlSP/Vt4gD1mf63lVg1AsxX1/U93Oy1zbYZT00Ig6oJzOin2mKY6Q+UJy+PwkPhSY44+YdPeDHxAF9vR3mlMWB+fn5cRWWlffAbeWiuFE27+iJNyYOaMhT9RsQvogDKlSnotjbr9c2LYsDUfuAkFRQ1/+Q53qf1DCiJI6o279fL6fD2iM/4tmfdg07AEIdz37CNewA+M56OQl7/BZxBKGa2o16n39MhcMpdAP43Lj6wDX0I4QQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQvYK0OSh2g3ICEwLf3VmKHArZh1jnFbR+1DbK2j9IHhCRG3LVQUNtFHMFiSsP+pDiidgej1KNRm92WfcnF3hOplTZ0Pdlr1JNxXhgatQ9IOFgmIiCoR2PVQtklDti1UJaWlpxOEm+l8ZBhP+xaj0YxP9O5Ho1+3ohp39vb61qPZrfZhp2dnU5tgHo0Ul1PxqkeDVa/S3Uf7BeSChSa4JTNOzVqmzSkxuud7Ofm5sr2Y671aMx6Nt79sjhg16NZXFx0+g36+rPW+10QB+zvz3o0pOUwaqlUymiGqYXi1bNBCcsLYXIEXi2VC1744Rw24B/dqyVzIUw9GfxmI/RwDt1g79WCWQpTT8bqg4mw9Wj8PoiSqyKEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCEkS7xaJkNha6GAOOyj7BmN9UFRarGgDeKwdy1RYZJ1HxCSGFYtlFCLIlFDJmItlYNRaqnAxvj80+IIFiEa9WSc69lYNX0mXAXTrkcTZlFk1D4gJFH8Vb9hC095K6eXjItTiQSclJb9kms9GtveVSyNldehTlR9/TGrDV9xsdc22GN9vpNYRu0DEh7WowmIXQslBpzer1AorHp91Ho0rkStR6Of7/R948a1hhCJDwpNQObm5kbFK5SEE3ZhYWGvg7kMDg4eV7sjvr2epAdc7NevX19WuxUb3N60aZNr8a0Ve/38IwMDA2PigPeby97dMRW/MXFAhWq/YY9rpzaw+8BsjyDg9+rvPmw85GRPSGogmaoHeOhEZlR72Ea1D1MwKi57EId9ln1ACCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhAQg6vT5KHVYfPso7xHV3n8PiUDWSxiifn9CEgMHp1HLZCJM8ampqalXjA3qd4kjZj2ZkPVodhn1YA6KI9oGQ4b9sTD1aIx6MhOuxafy0AeEJIoe1CNZ1qPxTtKqejKuJ7pZNCqLejTGSV65aJsecrGP2gf4vaxHkw0sExGcqn9P19W/nZ2dkdz17u7uVfbFYnGjOGB/Z9ff0NHREckeb2G9X0nciPT5NV7PEColuqSF+Pzzz4f1ahgFjubm5o5v3bq1LDFRKBQO6YH6kN4s4b5rLRR8n97e3n2G/WEX+/7+/nH9Rz+iglVx91FXRX/nWXEDn+mHXOOokSNuwN4Pucr6XUbFAf3N8GAegmChnozaO3lEqEejbbhbvDbE5/temS1atUSshtCgTUe858qe3SSKjKH+j5BAnDt3bof2Rfnmm28et5/74osv8Ac91CEtwPnz51Ff5BW9DMtyYSQcUEU9aA7deOONTgWqGoEk5Pz8fAknfdhqbTgxYIv3kBBEtffzGmHto7ZBI3s8t7CwgH6r1IvBtR7AWzyBKOml6D2eiicCMdTPKnvfs6zifhaChIv+hnHXwmOtypdffnlMr4a1XbaZYgOR0bZDeDvZEkKjP3QC1/pDH/Z/qP7IEf2RB/UyGqfYkPAgp7Ru3bqinrBD2lcl9Rzu8kRkKE0BiQvPKxvX63FPhMbbUYDwR6+/H4JShJd6ww03HDFEBu20remFBm6bHrDHZmdnt9qhkoZS+/WH7/ae479PSkBQurq6cKANwSORZW9kyLtuB/BnN6Yn2Ck99iA8ZWlxDLEpyXKJVIS44ns5TS80npg8dNNNN91tPzcxMVHs6em5oA2w7ZZbbhkTEisQFE1Sl/QmBOUuCAu8lWbzTFLA93qc6zQ3E5bYTJqhVKskg2se2J6bLiQ6ppfihTyVJJ/5Gn0MyVQhq/DbbUSH+JH3QZH0NzFA0IJhln8uFnGcyLJ3J63g0Qzrv+nJWl6LKuw+fXxEvZ2tQpzwksbDnqgMS/uEPamibTuqV2/29fW5jgDmCjNPown9x/W4wegkkvkjyNm0xN/PV199dQz/sBhyVldtFCGTejO79Yfvx7YmKkD7hdTFG+0ZZviTKRjNGtOczoFmy+mYIuOHS2YYBbFpCaGBsKhbX0n8Gg9PesJzSEgV3hA58ir3w1uhqOQLeDnNlM/RP/qT3h991fC2KUAtFVDjh2GOBoZK9R96jCNN13Mr6so+RG+luUAuR4/nA3kXHJx3mP9Ua8Kef04yc9di2MLi5VdIEwPBmZmZebyZh8kpNE2OLyx6uV+WZ2cOC2lJEFI1Yw4HUGiaEC95i4mKDzEUaj+0v/erh3O4mYbGKTQOoMyBXu3A+pdr16497PrPMj09vVv/lfbDXgXi8aDrjcxwSO1HKCxEltdeHdBjaFSaAApNQLDKV0dpXvHvI25ev379tqD2GOlRoTDrp5Q3bNhQd36PN+t2hF4LaUSzhFMtVSYiYSLVo6lRtsC+XxEjO9fC2bakEXpsjPT29g7rH2GuvRsWvgrOKFbr+ndQD8bBtlKPRpZLWFTZe1XfDqL6HTwehFZM6BJHMCkO1QsP5rUeMv8qHfBn0KIeSZi5DbBXwUGuBaHQRuZbSAIgf7gtb6EUhSYl/LAI4iJcN0SSZVI95r15CqUoNAniFXrCsgjObyGpg2FwHbBwKjmbFBSamPFGizDHZRfFheSA4xpKPZ71nBsKTUx4w9ec50LySOZ5GwpNBMy5LvReSM7JVGwoNCGg90KaFMwmfjjsDhhRoNAEhN4LaREwIrUtbbGh0KyBP3KknbOH3gtpEVIXGwpNHbzwCEPTO4SQ1iNVsaHQWHgT6/YxPCJtQGpiQ6GR6/kXr+ZwSQhpH1IZjWproWH+hZAKiYtNWwoNBYaQVYx7YpPIDOK2EhoKDCENOb5hw4aHJQHaQmgoMIQEI6mFmC0tNBQYQtxB1T4VmyMSIy0pNBQYQiIxqfmau+NMDreU0FBgCImNsic2sSSHW6ZmMHYp6O3tPe1tZ0KRISQaJT2f9klMNL1Hw5m8hCSHnlcP9/X1HZeINK3QaJg0pGHSQQoMIYkSS76m6UIn5GGwrYQXJg0LISRJkPd8RSLSVEKDLWV7enom9OYeIYSkAv7Q9dyLdM41RejklWw4KNZukYSQ1EAItTXsKFSuPRqESVNTU694e1ZTZAjJjqKmK0KHULn1aBAmcaiakHyxsLCwLcwurbkTGvViSkg+MdFLSC4pb9iwYas4kqvQ6erVq/vUPZugyBCSW0qaztgvjuTCo8GcGC/+Yx6GkPzjnBjO3KPxvJjTQpEhpFko9vT0OA13Z+bRMBdDSFPjNGM4E4/Gm3jX9jN7v/66UyYmuuS3vy0IIU0GvJrAiy5T9WgwL0a/3EEU1pE2Z2FB5MyZ7pX7W7YsyMDAohDSTHi5mvJar0vNo/ESvqcpMrVZWhJCmo6gXk0qHg0n39Xm0qUODZ8KMji4KJs305shzYl6NZvWGoFK1KPxV1rrzUMUmdUMDi7J1q3zFBnS1AQZgUrMo8GokoZKx4TD1iRnLCx0yORkh3R3L1XEnkRmzXk1iXg0Xj6GCyFJLvn3fy/I+fMFOXeuS6amuCt0DKw5ryZ2obl69eou/VCITEkIyRkY7Zubuy4uMzMUmjjQ1MhDjZ6PVWi8pO8o8zEkrxQKIr/3ewuV293dIgMDDJ1iYgh1o+o9GZucYykBRpaEkCYAeZpCgSITM3W31I1FaCgyhBBpkBSOHDqhAh5FhhAiy1X4Rmo9EUloIDKc6UsI8amXFA4dOjFcIiReNOxAqUxZXFzURHV35dLZ2XybydaaKRxKaCgy7hw9+q/y3ntfCcmOjRt75emn75AtW/olT0BYrly5Urku6LAYxGV+fr7yXH9/f+WxJmOvJoUPmQ84Cw1Fxp0TJ87Kzp3vCsme++67Qd555wHJE5qCqAjLwMDAigej59iK+AwODiIkkWZBv+vY+vXrt5mPOfll/uJIIU589NF/CskH585dkTwBIZmdnRU9MavCJAgLvBkIDp5vJlBnCusczccCCw3WLunVISGExAaEBiAfYwOxgfj4r2km9PfsMO93BTHyFkieFBILZ878leYJBoSkwxNPnKrkyPKIHxLBc6kVHtV7PO9oXul+vRr17wfyaLxV2CUhhMSKn/ydmZlZ9RxGoeDN9PT0SLOhAlnl0awpNEj+CldhE5IYfX19FVHxk8K46HmHnKisW7euKYe4laIms1d0o2HohHIPTP4mz+x7v5K5938l6x7dKYUtt1Q9N//RJ3LtxNs1n1s4+7nMHH1deh/4rnTddbsEZWnyksz84jVZ1OtWA22Etmomurq6KiNOEJbLly9XHkO4pEPEiCakWVGBHNarcdyuKzTIGnshE0kQiMXF7d+v3L764s9l85l/ko7iYNVzEAT7uaWLlyrP4TXTz/1Uiu/8rXTf92eBPnNy+1+qgP1GWpX5D38j/S/8WJoJiA2GsZGTwaVJvZgqvF1OKgNIdX+NigxCppKQRIEn4wPxWLp4seq+73Xg9vzHn6w8tzh5sSIy5v2gLBp2rcis0abNhj/S1Arob7nfv13zF3lD2U470ZFw9D74Xem8dTkkWv/UD6XTCI+67rxdw6Ltldvd991b5bEgRNjw9A9Xnuu5779JUDY8+9fSqnRsHJS+H7Xu72syiurVbMGNmqETQ6b0wImx+dN/rPv84Buv1H2u7/kfVy6urFeBWu+JFCFJogluzBAeXeXRaKZ4RDjKRAiJh4qWrBIajQ8Db3NJCCGN0DxNCddVoZPnzZSEJMqJE2UpFpt32DIu7rhjs9x112YhrYsKzV247rIe3C0kcZ555gMhy2AlNVZUk5alhKkyK6ETKpir0DA3Q1KFNXpan2KxuHFFaDQ3s0sISZGNG3vk0Uf/QEhro07M3WbotENIKiBcuPXWfFV5ywIIDXNVrY86McWK0Fy6dGkHN31LD4gMy0SQdgEjT5XQqVAoPCSEEJIA6tFsqQiNKs6wEEJIAiwuLm7q9NY1lYQQQhJAHZktnRo2cUibEJIkRQoNISRxOv0pwoQQkhDFTg5rE0ISpti5tLRUEkIISZAuFZpiM+4b0058+OHXculStrsVcuEjiUIXQ6d8c9ttr8nZs5cla+68c7N88MFfCiFhaI0qyC3K+++fz4XIgI8++rriWRESBgpNjoEXkZfFl828PssM+x54YIuQ9Am09zbJBqxuxkrvjz76nVy8mG2O5oEHbpViMf6tWeElffzx15XfVy5f1utrVc9D3LDCe1l0B/S+u/A+9tgfSKm0LJLMNWVCGUJTFi5ByC040VpppTcKXSEkfO+98yowv5PJyWtO9hCdP//zb8n3vldS0bgxsPBQYLKFHg1JnMnJWXnppY8r4gKRifZe1+Stt85WLgACAo+FBbRyzSRGncqcS0OSwBeYl176TWDPxSyGFSQRDuHC5bnn/kWeffZPKDg5RDVmsmtxcfEs59GQuHnuuV83FBgIyoMPbtHcyzcrOyE0SjZjxOvs2St6/Z91vSKI0hNPnKLg5BDVmIuYsDdJoSFxgcT1E0+MVcTBxq8RvJxfCZ4zQSIYFwjTs88uh08nTiB8KleuTXzBgSA9++yfhkoek3hRjakkg8eFkBh48cVP5Jln/v+qxyEwTz99hzz11O2x1AjGeyAvgwuEBV7M0aP/WvUa3Ifn89pr/4N7R2VMJXQSCk2u8Udp0uDRR/8wtAcAgYHQmMQtMLVAuPXyy/dXwiVbcCBC9977S3n++Xsq34NkQ8WjmZubK/f2shJ9HkFeYvv2/yNpAaE4c+YHTvNlkPDdufPdVWKI0AgCkNbQvC84+Fzkh86du7LyHDbswzwdhFIkfSA0nZs2bZrUG/Rqcog9eS35z3ObFAiR2b79rVUiA+8CEw2zmP+DcKrW7pfwdiBAJH36+/snKksQVGhOCckdSICm6fJDIFy8mSefPLUq6fuzn92fuecAgYPY2N8DYvPiix8LSRfN0Zz1J+zRo8kpyC/gkjdw0p44UV657y+XgDi6gBwURo6QT8FMYXhV/pA48joY9sblscf+sDLq5AKEc/m7XvdkEEbdddc3OVM4PSraUhGaQqEwpl6NEBIEJFztMOSNN74TWGSQe4Jn8Ytf/FvDiXx4Dhd4TQjPXPNHoJbYPPLIu/LBB9/n0HcKqK5U5h9UQqf169eXZXnNEyENgUjAmzF5/vl7A3kIyOlgjsttt/1veemlT5zWOcHTCVsyw57Ah/fCXB+SCtc9GrC4uPhmZ2fnbiGkAfAMzBP+qaf+WPNIf7ymHUa0fvKTf2k4U/jb376hcr1x4/IoKJLhEDaMIOFz7PkwC2c/l9m3/q/0PPBdKWy5peHnv/DCvZUwzR+NgocEr4rD3smiujKG6xWhURfnuF5RaEhdEDKZ81SQO8EJvBa15tj49si9PPro7zuPUEFkJu/977I4eUk6/tdPZfOZf5KO4mDd10PAEN7dc88vVx6DZ4a5Q0mUvyDLzM/PVzyalcJXAwMDyNNMCiF1sEMmJH/XAqGSLTIQGNh++ukPKmFNmGHwi9u/XxEZsHTxksx//MmaNsghmSNRCKGw6JMkRhnTZ3CjqsKeCs0RIaQG8GTMkAk5j7UEAiJjLw1ACITaw1FGfa488z8rHo1P5623SPd9fxbIFmGeWbUQIojcEYkf1ZMP/dtd1hMMn3IGTgQkTpMAJ9zrr38nUOhgezP+aE6j19sigzk2mFAXhZmjr8vVF3++cr9j46AU3/nbwPYIoeDVYA4Q8L0azhqOn46OjjH/dpXQIHyampqa5M4I+QAJy1qLFOMCHkqQk8wukr6WN4Okqz38HYfIwIuZUm/GpP/5H6+ZCLbB90C7+jOhIeZPPXUHczUx4yeCwari5Ayf8kMahclRh3ctXn212jNZy5t58sn3Vr0+qsgAMy8D1j/1Q1n32E4JgznaBMFB3WISK5P9/f0rE4FXlfJk+JQf4DXAE3j//a8kCbZsGQwkAOZaJiRUG3kzCJls78f2mJZULK7psDTyKkG9kVp5mf4Xflzztfh8DGM3ygMhV2N6Xa+++hlnC8eIvaxpldAgfLp69SpGoIaFZI5fdyUrVodNv9/w9fbwdy3v5/KTu+Xaibcrtwd+dli9kkekES55GSyL2Lnz7yu3ISaYTFgL5GogLL6I2gW0SDQ8h2WFmvs6LSwsvCmEyHK+xQQ7D9TDHpmCQNbyfnyRARCdmVffqPuernkZUzDWGlF68MHSym2ET9wgLz6wrMm8X1No5ubmRjmnhgCUxPSBh9KoWp2dy6lXt3fdo9UeTCOxcc3LmOIBjh79rO5r7d+SVIjahox7y5pWqLndCibZ6OjTYb25T0hbY5aBaLRoEh6BmcvBjpD1cjkDLx+uXM8cvS4uEJuFc+dk8ewXVbmYoHkZH38Zgz+iBA+n3jIDOydTq84xcUdHm1aVnam7r9Ps7Oyh3t5eCk0bg5PVLIbVyJuxT1Lbs7CpJTbTz/207uuDzpfxcy/+vk9riQfE0A/3UFidxMKo/UDdvbfh1XR2dh4X0rbYq6UbjTbZ+Y0gJSMgNnYYVY8Nz/514BGqb3/7eh5prVXfd9zxjarXksiUzWFtn85GFpqrOSykbbFPvEZCc+5c9ckcdOcBCIhN1523V8Ikk1kjgbwW9vc06wfbmEXTXbfnJaupNw+vodBgqNucRkxIPczRHZdFkgsf/abqPkaUNn3w/2Tzp/9YtX5p7v1fVebfBMEuaNXIozFfS48mOhoFjdZ8XNZgfn7+gJC2JGyhKRfmPqpex9X74PaV2/b8mqWLFyUIyNOQ9IFTYo82+awpNPRq2he/AFWS2HmXGSNEmnvvV1XPdWzcKEFoFCqR5FhYWKi7fKlLAgCvplAoDAtpK+xFho0mv5mvdfGEeh/8rlyWPSv3MTkP+ZhKjRnD2ylo3qZRYatGNArlUMGPxMKk5nTrDh6t6dEAejXtib2os9E+U/bizKBig2HrDU//sOox5GPmrZBqYI35Myb2CNjgYP1QykwAZ7EPVaug+nDcL3JVi0BCA5iraT/sbWwbTdFfPcs2+Da+fZoAtsXGBAnioIWtgLlsAvmaRiNgZpiVxmr5FqahPgQKnQAXW7Yfy4XCr8+ybeSl2PNm/u7vynWXINQCYlO443aZfevtldnAEJf1KkCu9Wbs1eaNMCf0cfuVcDRKAvsEFhrAXE37gRPVP3EbeSn2amhcI6fjUkwKa5jC1pfxwcJOc5i6kdjZs4ZdN78jywSZbxc4dAJeAXMWxmojzLBjrVm29mroLAp/2ws7sfapHuaCUYAdLIkz5cHBwTVXEDgJTcWgs3M/V3a3D/aaJXMbXBuUhTDnsKRd+BvejOl1rVVy1N7Sl4Wv3FlcXAyUu3UWGi8W49KENgEnnykejQpE4XV2icyf/OTXkga1dtBsVHIUrzdFiSITCqxrGg3yQmehAVjZTa+mfTC9GpycjUafam1ngh0hk8beQXMtb8auPbPWanOymqDeDAglNBgv10wzh7vbBLuUqL2Nigm8mp//fLjqsWee+cBpuNsVe2uXeiVEbRvz9VmWS21SAnszIJTQgA0bNsCrGZeMWVhYEB12r/mcKq5MT09jRamQ8CCsMEdkcFI3yr3g9XaxqUceeXdVojYOsG2KvbUL6gQ38mbskqNmWQkSDBdvBoQWGu/D9krGQGhmZmZkamqq6nGIzOXLl+XatWsUmhjADpM+QXIvzz9/T1XeAzbYtM0WhbAgx/IXf/HWqu124cl873ulhraum+GRVTh5MyCS0GC4W68yLY7V09ODBDXyRiti44sMrvv6+jBSJiQaCC3s3Mta4dAbb3xn1dwUnOS33fZaw/CrEfCkIFb33vvLVZ8PwVhrM7xa28Fw6YEb+uf+uDgS+QzUXM3erBPD69atWxGbK1euVIkMhIjEg30S/83fNN5FE/ka7LNth1E40bEvty84QRY2+rtf/tEfvVYRC7tIFcKltURmeWTq11Xfj96MG3q+j3oOhhNOM4NrgeHuPBQyh9hAXBAqAYpM/MCrMeeqYGYtciT19k7yQRgFbwgnuTlr1xccAM8Hr4F34c8mxvPwYP7hH35bt/odbGp5TrXYvv2tqvsYIaM340yoQaAOiQlNuk7oVUkywgyXAEQGYpMHcIKZeYEzZ/6qaQ9wnPz33PPLKsEIuq82bO0RorD4c3aeeur2VYs/awFBNPM5EKhPP/2BkOBo5HJAz6n9EoLYkhdh4ra4sHMyds6GxAcE0g5RcBIH2XwNti+/fH9FaJEbCVMJbznc+dPKeyDsCSIywJxoiPd4550HhDhRDisyIHLo5IO4TU/sIxrD7ZIUsUXGDJf8Ye+8eDatAkIOlFfwJ+LBu0FY8vbbDwQqSu4Ljsj9FQFA/gVhGC61CqLfeec39PLNyrqlsDN4MWoGQQTwwBgyuRHVkYgtdAIXLlwo6ok+oWJTlJRATgZzZWrlZDDsDbFREZSurtg01Rk7dGoGkPN4/fXvNCydgOFlc+QHnsLLLw/Lgw9ukTxgrx6HkCFkCuoFkWX0T/ywDmfvkQjEOu6bxYzh3t5ePXCKNRO/SBBv3LgxU5FpVnBSPvfcPzd8jZ2EhTeyc+e7sc2VCQsEZufOv5cbbzxSGdnyJxfiu+ZNZOzcov0cRlH9AY6MiBQy+cQ+wQQzhtMu+6mfV/e5PMyhgdvfjKwVXvi5jlpzZTATOIt6vAjDMMfGX5mNBPRbb5Ulr+DYrSU2/mNzc3OZHsMImfQ7Rp6+Emvo5KPhSkkz1BNCVsD0+2baRH7LlsHAc0zgyUBc7MWTECqMCtXb+9oH4oD3gCCHrXIHrwWzle2ZwiDvo3y+qAANUSrik4e5YFFGmWwSERqgieH92mDcu7uNgNjUCpuWR6r+pGa1O4RoGC73X4eEchixwXwce9gc+Rgs8GyGEhC+2GC5jO/lZDwXrKzRyVaJicR8MpSS0KuykLYBYgLvwS7ybc4ExrU5FG5WucPrMHoVR8gFccGs5GapM4PwCMICoYHIIL+YoSeDXOs2iZHEPBqgCj1cKBROCmk76nk3PvBeIALwXuwRuTCeDUQKCWDwox+tvbAyb5h5GogOBAejpXr+SNrod3jcddHkWiQqNECz5oe04XYLaTuizASOEkY1G/ZcMIyS+mFU2mITZ17GJHGhwdwaHYI+LRkuTyDZAsHBxDwki122q8UkuxdeuFdamXoTTs2cTYpiM6Z5mVhDJp/Ex80wtybL5Qkke+CdYDYx1hZhOBwCEmQRpMtWLc2Kn5OxE78InyAwSAyj5lIKlPWzEjtPE/dofHQUajTt5Qkk32BF9scf/64y58Uelr7jjm9URImzeJMHyV8VtrvX2gQuCqkJTRbLE0j+wQgTJtiZZSAoMumiHtXdmvxNtCxvalMOGUKRWhw9+hlFJlv2Ji0yINW5zd6OdpmW/iT5Atuc+OUiMNxNkUkPjDBhyZCkQGqhkw9DKGKDUanlJQjc+zotkhrGrkfqQgMuXbq0o6ur65gQQlInbZEBmSwLRQiFGhdCCEmVLEQGZOLRAE7kIyRdshIZkFmhC45CEZIeWYoMyLQqFOoMM4QiJFmyFhmQWejkwxCKkORIYiV2GDIXGnDlypUhHe4+ySHv5mB2tkP+4z86Zd06kc2bU1mHQxzBsgIVmYfD7CqZBLkQGjA9PY0q6weF5J7PPuuSubnlQ+eGGxZUbBaF5AoskNyW5NolV3Kz+30WRc1JOBYXr/8/LdChyRvjeRMZkBuhATMzMw8Ly3/mnm99a0HDpiXp61uSYnFJSD7AwIr+Yd+dN5EBuQmdfFj+kxA3vBq/qa1bCkPuhAYwX0NIYMpI+qaxAjsKuRQaoGKDtVA7hBBSj+MaJsWywVvS5CpHY3Lt2jXMGi4LIaQKhEp6tVdDpYebQWRAbj0awPk1hKwCo0oP5zHh24jcejQAcaeq914hhPiFqnI5qrQWufZofLg3FGlzxr2lBLlO+DaiKYQGXL169aQq+rAQ0iZ4uZjDWS+IjIOmERouviRtxhj2WWrGMKkWTSM0QL2akqo8JvOVhJAWBF4M8pJ5WHEdJ00lNIAjUaRVwRIChEnNMmTtQq5HnWrBkSjSgox5m7jtaUWRAU3n0fhwmQJpAcYXFhb25qVmTJI0rdCAqakpuJn7hJAmolXzMI1oaqEBFBvSLPjD1V7tpZYMkerR9EIDOKGP5Jl2FhiflhAaoGIzqmKzSwjJCRSY67SM0ACKDckDFJjVtJTQAIoNyZCyNxdmlAJTTcsJDWCCmKTMmA5TH2iHYeqwtKTQAIoNSYHjKjCHKTBr07JCAyg2JG6YfwlHSwsN0JzNiOZsXhFCosHwKAItLzQACzFVbFDsvCSEBMT3XvT6eDMXncoDbSE0gCUmiAP0XmKmbYQGoHhWd3f3fs4iJjXACuo3OTSdDG0lND5MEhPgh0YqMGP0XpKlSmi++OKLIW30kv7jl2+++eaWjkkZSrUn3vaxRzQ0Ok5xSY+K0EBgtPHtZGl5dnZ229atW8uSEth3W0WuqJ87vmnTprI4Anv9HaW5ubmxIPYMpdoDikv2dJw/f76kXsxp7Yixa9eu7YWwGMIjetLfrY8lHrNOT0+jiNUe725Zv8vdKhaBP9caxp7U37Qt6EiBZ4tQqiSkVSjr5U2KSz7o1BPyoCp++cYbb3zY914QNkFg9Gaxq6trj6SD+Tkl9TSc9t1WYTS9EtQTHgloivKgo9oGp4Q0O2PYZE2Pha0bNmzAZQ9FJh906WVYLwfsJ+DFfP7550e00+6XFNADBFt9Dhn3y+KA2uL1Q8ZDrjmmspCmAiGReqJYBnBKR4uOc7Qov0Bo8O+feQfpQfO4XiH0KekB4zyHQW1QsLyoHhrCvjHXMonqwR3q6enBZ2Pld2Wo08vdlITkBu8P6RRDouai46uvvsLIi2jotM1+8ssvv5zQq7GbbrrpcWlDMDKlgjOiN3dze5dsoNfSGnRoeISRnpN62X/DDTdUQqiJiYmi/rsjObvDSwaXpY3xBGe/3nyIgpMs3ggR9pp+U++Ocep/a+APb2M/GQjLpHepnEza6dtafT6NCxAc/WfdwZAqPkxhQVjEcKg1WZmwh2FuPYmGtbORpyjPzc0dT2NYu1nBkHihUNil7TUsJDCesCAHdorC0j605RKEOPFmGGNo/iGhl7MKP3mrwjKuwjzWKpvWEzcoNDGCmcl6MmH+T7uKThneinrGH0JgkF9h8pYACk1CePkcJNofQnjVSklkP6+iNz+Ep6LX4zoiVKaokHpQaFICxbf0CgW4MM/nLm++T97FpyzLEx/P6vctw0vp6uoqM/whrlBoMgTioydvETOiVYBKngBBfEopiFDZ80wqnoh+7lnMxsaFYkLihkKTY7zwqwgxwgUr2/E4Vqg3sjOXb6iAQEwqF80fTa5bt26SIQ4hhBCSJAglMHIjIUF9GdjrdUlCkLU9iNoGWdvnoQ8wxynsb/Dtp6amnKoHmOCz47AP2wawx2+I2oZZ9UGiaJiwb3p6esm7TODLutijYyz7kos9Xq/vccGzv+DaSLDH5xrfwbm8htqc9u3RHuIIavoY9icdzWPpA6MNo/bBUtZ9oN/FeZsesw/CtGHM50GoNjT7wLUN7T7wj+NOyQmaS4hUj8aqkgd7pwbC640ELPIhrvb4viXjIaeqfd4BYZbJ2O9ykHmv3WPYD3sjXYFRmxHjbqg+MNowah9IDH3gJNZ2H+h3GdE22RLU3u4DWW6Dkjig54HZ5qXe3t4RccCuFqmJfad96O0+UJzsNQ+I9iv5973JrPkRGhskMSUCUROe2mEXJBpOn5/HBK1rH3jFvkNjt4H2wUZxAEPw1kNlcQCjbfZjk5OTF8WBqG2gv7nK3rUPMHpo3tfBBKfvL1abuR6XNV6fr+MaMZ3vcuntUXEE/96Gy3YSIzYu9ni9YT/hao9/M3U5Rz2X+4KrNwGwO4NvH9Lt32O4/fvFEfyjG21wzNHcbsOTYdowSh8AbfdDvn3YPkD7e304Io5cunQJoctE2D40j2P8FnEEbaaf7Yd/JzFa6WJvHsdh+hD4fRD2PEgF14axCdMwcdpH/f7+ULaEJKq9/x4Sgaz7gBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQkjLg3UWUaafR7UHcdi7Lu2P0x62Ue2bvQ+wviZqTaAoa3TiqukjITFq+oQ6DuKqqxTFPjH04Npl1MFwXtCnP2rIqoXiupisalGl64HmnWAn/Xo2YQofof5JlFoqVi2Tg47mdj2Z02HaMGo9mqh9ELUejdkHYWoCWX3gfBzXqKvk2gdDMfbBUhjBM2v6hOmDRLEOkCWsgnWxN07yUKuXjVW/vv1xR/sR0x6/x8XeWzlt2l9wrUdj2S+5nqh2H7iuXrb7wHX1cQJ94FTqo0YfLKXdB8bK61Anqt0Het+peJfdB64F1LzV66v6IDf1aKKuGI77/VxroYi3X7lB1DoekdvDtQ1iWPUda+2REH1gk3pNILsNXNvU3v0iak0g13o0CdRFivv9omHWUkEdDHHEq7N6IWwtE7OWCt4nYi2VpTChE+rwhPXIgF/PZjpkTR+rD067niT4946zD8LkSWZmZo759iHD1/1R+sBswzD1ZPx6NmHPgzjqKkXtA6sezYjkDTRKlCScbx/lnxmClaU9vn+UZGhcbSghwW/Pug+8/dAzq+kD2zwMSkgEsm5DQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQFok6/j6OmT5b2oNnrMiWGVUfDuZaKV0fDX2J/LEwtFWOJvXMdD2DUMgm1wTxqmXhtgMVwu8QRtdvtt2GYWipx9IHRhmH6oBi1D0z7MG1o1pMJ04ZmH0xHrwkU6jg2F1WGqUdjtmGY49g8D8L0QaLYtVBcC+7YdThc63jUqMPhWsdjJEodD3TodMb1aOxaKK41gazCXanXBKpRC8WpJlCNPmi6ejQQp+kINYHM1ethjuOmq0fjuvJzcXHRruNREgfsOiBKSdyI9P3Xer+1WLdu3arXh/gOJfNOZ2dnpFoqadcEcv2+aZB2PZqoxNBnNe1zIzTawAeMu+Xu7u5xcUDtj/i3UfynUCg4KbnaHDKLBmkHH3Ywl7m5uVG9Khvv96Y40N/fP6424+bnb9q0KfBBtn79+rLaHDEeGh8YGBgTB+w+0DYcEwfm5+cj9YEyGrEP4AGVje9wxMUefaBXxw37Ay59gNfCxnhozLUPFPM3O/eBttkBvw3D9IH3+rJvH0MfONmnAsIlhCBhVdWrpZKpPVzHKIWlo9rDFu8R9jfkoQ/iaIMoyUyvDZxCHpOoxc2j1lWCfZSaPrCLoy5T1IQyIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEJIVhh1ME6HrKXi20+EqQMCYAd7lDsIU7QHtUi8Ghwnw9RS8e3RBmHWyqCejN+GYTa4z0MfePVg/D4oiSP4XL+mT5g2NOrJTIRpQ9RfgT0uYdvQqKuUek0goN/dLzVxOmRNoH1R+iBRpiPWo7FroYSo47EnSh0Puw6Hax0P7wBbVcfDBbsNXQ8yuxZK1D4IUY9mJM4+wIniYl+rD1zb0O6DJqwJNJJETaDclIkQqxZKR0dHSRzQ1w+b913r0SwtLVUdEIVC4S5xoLOzs2S9X0kc6Orqsl/vVM7RWylbst7T9d+kZN7RNnCyr9EGrrVYhq3Pj9QH4lhTqLu72/6+zhUC7c+MWo+mxnHhZK9tskXcGLLez8m+Rj2aUuVxyQlW3QvnOhxSXcdDXOtw6OePmvcXFhacapno5x03a6m41kKZn58fF6OOh3LctR6NHhRjxkNl11oo5nfGb9H3c/o3q1GDZ1QciNoHNWoCOdVCiVoTCK+1agKVo9ajce0DuyaQXh0QN+KuCVT5/A7JEXDb9KqIkxYnjjgCtw3/wto4YQoOVeqIaMfuCGsPr0JtR/TmeF9fn9MB4tvryVVxldV+VL9L4IMc4B9V/5VhXwxjD7LuA78No9jrwY5+nAxjD7zfIGH60LfHPzvsw/QBQlZ49GHtveNoGH/WYfrQt1eRKMfVB/8F6Hs5AEoN5qAAAAAASUVORK5CYII=", os = { class: "fr-container flex" }, ss = { class: "half" }, is = { class: "fr-h1" }, us = { class: "flex fr-my-md-3w" }, ds = { class: "fr-h6" }, cs = /* @__PURE__ */ $({
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
      return i(), f("div", os, [
        c("div", ss, [
          c("h1", is, h(t.title), 1),
          c("span", us, h(t.subtitle), 1),
          c("p", ds, h(t.description), 1),
          c("p", null, h(t.help), 1),
          (a = t.buttons) != null && a.length ? (i(), j(Tt, {
            key: 0,
            buttons: t.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : y("", !0),
          L(t.$slots, "default", {}, void 0, !0)
        ]),
        e[0] || (e[0] = c("div", { class: "half self-center text-center" }, [
          c("img", {
            class: "error-img",
            src: ls
          })
        ], -1))
      ]);
    };
  }
}), fs = /* @__PURE__ */ we(cs, [["__scopeId", "data-v-0f6cf5b4"]]), ps = { class: "fr-fieldset" }, ms = ["id"], hs = {
  key: 1,
  class: "fr-fieldset__element"
}, vs = { class: "fr-fieldset__element" }, ca = /* @__PURE__ */ $({
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
      var a, r, l, o;
      return i(), f("fieldset", ps, [
        t.legend || (r = (a = t.$slots).legend) != null && r.call(a) ? (i(), f("legend", {
          key: 0,
          id: t.legendId,
          class: O(["fr-fieldset__legend", t.legendClass])
        }, [
          F(h(t.legend) + " ", 1),
          L(t.$slots, "legend")
        ], 10, ms)) : y("", !0),
        t.hint || (o = (l = t.$slots).hint) != null && o.call(l) ? (i(), f("div", hs, [
          c("span", {
            class: O(["fr-hint-text", t.hintClass])
          }, [
            F(h(t.hint) + " ", 1),
            L(t.$slots, "hint")
          ], 2)
        ])) : y("", !0),
        c("div", vs, [
          L(t.$slots, "default")
        ])
      ]);
    };
  }
}), gs = ["href", "download"], bs = { class: "fr-link__detail" }, fa = /* @__PURE__ */ $({
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
      F(h(t.title) + " ", 1),
      c("span", bs, h(t.format) + " – " + h(t.size), 1)
    ], 8, gs));
  }
}), ys = { class: "fr-downloads-group fr-downloads-group--bordered" }, ks = {
  key: 0,
  class: "fr-downloads-group__title"
}, ws = /* @__PURE__ */ $({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(n) {
    return (t, e) => (i(), f("div", ys, [
      t.title ? (i(), f("h4", ks, h(t.title), 1)) : y("", !0),
      c("ul", null, [
        (i(!0), f(Q, null, Z(t.files, (a, r) => (i(), f("li", { key: r }, [
          ne(fa, {
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
}), _s = ["for"], xs = {
  key: 0,
  class: "required"
}, Is = {
  key: 1,
  class: "fr-hint-text"
}, Ds = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], Ts = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Cs = ["id"], Es = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "DsfrFileUpload",
  props: {
    id: { default: () => ae("file-upload") },
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
    const e = n, a = t, r = (o) => {
      var s, u;
      a("update:modelValue", (s = o.target) == null ? void 0 : s.value), a("change", (u = o.target) == null ? void 0 : u.files);
    }, l = _(() => Array.isArray(e.accept) ? e.accept.join(",") : e.accept);
    return (o, s) => (i(), f("div", {
      class: O(["fr-upload-group", {
        "fr-upload-group--error": o.error,
        "fr-upload-group--valid": o.validMessage,
        "fr-upload-group--disabled": o.disabled
      }])
    }, [
      c("label", {
        class: "fr-label",
        for: o.id
      }, [
        F(h(o.label) + " ", 1),
        "required" in o.$attrs && o.$attrs.required !== !1 ? (i(), f("span", xs, " *")) : y("", !0),
        o.hint ? (i(), f("span", Is, h(o.hint), 1)) : y("", !0)
      ], 8, _s),
      c("input", W({
        id: o.id,
        class: "fr-upload",
        type: "file",
        "aria-describedby": o.error || o.validMessage ? `${o.id}-desc` : void 0
      }, o.$attrs, {
        value: o.modelValue,
        disabled: o.disabled,
        "aria-disabled": o.disabled,
        accept: l.value,
        onChange: s[0] || (s[0] = (u) => r(u))
      }), null, 16, Ds),
      o.error || o.validMessage ? (i(), f("div", Ts, [
        o.error ? (i(), f("p", {
          key: 0,
          id: `${o.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, h(o.error ?? o.validMessage), 9, Cs)) : y("", !0)
      ])) : y("", !0)
    ], 2));
  }
}), Ps = { class: "fr-follow__newsletter" }, Ms = { class: "fr-h5 fr-follow__title" }, Ls = { class: "fr-text--sm fr-follow__desc" }, Bs = { key: 0 }, Ss = ["title"], As = { key: 1 }, $s = { action: "" }, Os = {
  class: "fr-label",
  for: "newsletter-email"
}, Rs = { class: "fr-input-wrap fr-input-wrap--addon" }, Fs = ["title", "placeholder", "value"], Ns = ["title"], Vs = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, qs = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, js = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, pa = /* @__PURE__ */ $({
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
    return (r, l) => (i(), f("div", Ps, [
      c("div", null, [
        c("h3", Ms, h(r.title), 1),
        c("p", Ls, h(r.description), 1)
      ]),
      r.onlyCallout ? (i(), f("div", Bs, [
        c("button", {
          class: "fr-btn",
          title: r.buttonTitle,
          onClick: l[0] || (l[0] = (o) => r.buttonAction ? r.buttonAction(o) : () => {
          })
        }, h(r.buttonText), 9, Ss)
      ])) : (i(), f("div", As, [
        c("form", $s, [
          c("label", Os, h(r.labelEmail), 1),
          c("div", Rs, [
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
              onInput: l[1] || (l[1] = (o) => a(o))
            }, null, 40, Fs),
            c("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: r.buttonTitle,
              type: "submit"
            }, h(r.buttonText), 9, Ns)
          ]),
          r.error ? (i(), f("div", Vs, [
            c("p", qs, h(r.error), 1)
          ])) : y("", !0),
          c("p", js, h(r.hintText), 1)
        ])
      ]))
    ]));
  }
}), Hs = { class: "fr-follow__social" }, Ws = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, Ks = ["title", "href"], ma = /* @__PURE__ */ $({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(n) {
    return (t, e) => (i(), f("div", Hs, [
      (i(), j(ge(t.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: U(() => e[0] || (e[0] = [
          F(" Suivez-nous "),
          c("br", null, null, -1),
          F(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      t.networks.length ? (i(), f("ul", Ws, [
        (i(!0), f(Q, null, Z(t.networks, (a, r) => (i(), f("li", { key: r }, [
          c("a", {
            class: O(["fr-btn", `fr-btn--${a.type}`]),
            title: a.name,
            href: a.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, h(a.name), 11, Ks)
        ]))), 128))
      ])) : y("", !0)
    ]));
  }
}), Qs = { class: "fr-follow" }, Ys = { class: "fr-container" }, zs = { class: "fr-grid-row" }, Gs = /* @__PURE__ */ $({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(n) {
    const t = n, e = _(() => t.networks && t.networks.length), a = _(() => typeof t.newsletterData == "object");
    return (r, l) => (i(), f("div", Qs, [
      c("div", Ys, [
        c("div", zs, [
          L(r.$slots, "default", {}, () => [
            r.newsletterData ? (i(), f("div", {
              key: 0,
              class: O(["fr-col-12", { "fr-col-md-8": e.value }])
            }, [
              ne(pa, Te(wt(r.newsletterData)), null, 16)
            ], 2)) : y("", !0),
            e.value ? (i(), f("div", {
              key: 1,
              class: O(["fr-col-12", { "fr-col-md-4": a.value }])
            }, [
              ne(ma, { networks: r.networks }, null, 8, ["networks"])
            ], 2)) : y("", !0)
          ])
        ])
      ])
    ]));
  }
}), En = 1, ha = /* @__PURE__ */ $({
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
    const t = n, e = _(() => {
      var p;
      return (p = t.href) == null ? void 0 : p.startsWith("http");
    }), a = _(() => {
      var p;
      return (p = t.href) == null ? void 0 : p.startsWith("mailto");
    }), r = _(() => t.button ? "button" : e.value || a.value ? "a" : "RouterLink"), l = _(() => {
      if (!(!e.value && !a.value))
        return t.href;
    }), o = _(() => {
      if (!(e.value || a.value))
        return t.to;
    }), s = _(() => o.value ? { to: o.value } : { href: l.value }), u = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), d = _(
      () => typeof t.icon == "string" ? { name: t.icon, scale: En, ...t.iconAttrs ?? {} } : { scale: En, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (p, m) => (i(), j(ge(r.value), W({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": u.value && p.iconRight,
        "fr-btn--icon-left": u.value && !p.iconRight,
        [String(p.icon)]: u.value
      }]
    }, s.value, {
      target: p.target,
      onClick: te(p.onClick, ["stop"])
    }), {
      default: U(() => {
        var k, E;
        return [
          !u.value && (p.icon || (k = p.iconAttrs) != null && k.name) && !p.iconRight ? (i(), j(be, W({
            key: 0,
            class: "fr-mr-1w"
          }, d.value), null, 16)) : y("", !0),
          F(" " + h(p.label) + " ", 1),
          !u.value && (p.icon || (E = p.iconAttrs) != null && E.name) && p.iconRight ? (i(), j(be, W({
            key: 1,
            class: "fr-ml-1w"
          }, d.value), null, 16)) : y("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), Xs = { class: "fr-footer__partners" }, Us = {
  key: 0,
  class: "fr-footer__partners-title"
}, Zs = { class: "fr-footer__partners-logos" }, Js = {
  key: 0,
  class: "fr-footer__partners-main"
}, ei = ["href"], ti = ["src", "alt"], ni = { class: "fr-footer__partners-sub" }, ai = ["href"], ri = ["src", "alt"], va = /* @__PURE__ */ $({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(n) {
    return (t, e) => (i(), f("div", Xs, [
      t.title ? (i(), f("h4", Us, h(t.title), 1)) : y("", !0),
      c("div", Zs, [
        t.mainPartner ? (i(), f("div", Js, [
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
        ])) : y("", !0),
        c("div", ni, [
          c("ul", null, [
            (i(!0), f(Q, null, Z(t.subPartners, (a, r) => (i(), f("li", { key: r }, [
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
                }, null, 8, ri)
              ], 8, ai)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), li = ["innerHTML"], at = /* @__PURE__ */ $({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(n) {
    const t = n, e = _(() => Array.isArray(t.logoText) ? t.logoText.join("<br>") : t.logoText);
    return (a, r) => (i(), f("p", {
      class: O(["fr-logo", {
        "fr-logo--sm": a.small && !a.large,
        "fr-logo--lg": a.large && !a.small
      }]),
      innerHTML: e.value
    }, null, 10, li));
  }
}), oi = {
  id: "footer",
  class: "fr-footer",
  role: "contentinfo"
}, si = {
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
}, Ii = /* @__PURE__ */ $({
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
    const t = n, e = _(() => [
      ...t.beforeMandatoryLinks,
      ...t.mandatoryLinks,
      ...t.afterMandatoryLinks
    ]), a = zt(), r = _(() => {
      var p;
      return (p = a["footer-link-lists"]) == null ? void 0 : p.call(a);
    }), l = _(() => {
      const p = t.licenceTo || t.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), o = _(() => {
      const { to: p, href: m, ...k } = t.licenceLinkProps ?? {};
      return k;
    }), s = _(() => l.value ? "" : t.licenceTo), u = _(() => l.value ? t.licenceTo : ""), d = _(() => typeof t.operatorTo == "string" && t.operatorTo.startsWith("http"));
    return (p, m) => {
      const k = xe("RouterLink");
      return i(), f("footer", oi, [
        r.value ? (i(), f("div", si, [
          c("div", ii, [
            c("div", ui, [
              L(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : y("", !0),
        c("div", di, [
          c("div", ci, [
            p.operatorImgSrc ? (i(), f("div", fi, [
              ne(at, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
              d.value ? (i(), f("a", {
                key: 0,
                href: p.operatorTo,
                "data-testid": "card-link",
                class: "fr-footer__brand-link"
              }, [
                c("img", {
                  class: "fr-footer__logo",
                  style: De(p.operatorImgStyle),
                  src: p.operatorImgSrc,
                  alt: p.operatorImgAlt
                }, null, 12, mi)
              ], 8, pi)) : (i(), j(k, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: U(() => [
                  c("img", {
                    class: "fr-footer__logo",
                    style: De(p.operatorImgStyle),
                    src: p.operatorImgSrc,
                    alt: p.operatorImgAlt
                  }, null, 12, hi)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (i(), f("div", vi, [
              ne(k, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: U(() => [
                  ne(at, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            c("div", gi, [
              c("p", bi, [
                L(p.$slots, "description", {}, () => [
                  F(h(p.descText), 1)
                ], !0)
              ]),
              c("ul", yi, [
                (i(!0), f(Q, null, Z(p.ecosystemLinks, ({ href: E, label: I, title: S, ...w }, x) => (i(), f("li", {
                  key: x,
                  class: "fr-footer__content-item"
                }, [
                  c("a", W({
                    class: "fr-footer__content-link",
                    href: E,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: S,
                    ref_for: !0
                  }, w), h(I), 17, ki)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (i(), j(va, Te(W({ key: 0 }, p.partners)), null, 16)) : y("", !0),
          c("div", wi, [
            c("ul", _i, [
              (i(!0), f(Q, null, Z(e.value, (E, I) => (i(), f("li", {
                key: I,
                class: "fr-footer__bottom-item"
              }, [
                ne(ha, W({ ref_for: !0 }, E), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (i(), f("div", xi, [
              c("p", null, [
                F(h(p.licenceText) + " ", 1),
                (i(), j(ge(l.value ? "a" : "RouterLink"), W({
                  class: "fr-link-licence no-content-after",
                  to: l.value ? void 0 : s.value,
                  href: l.value ? u.value : void 0,
                  target: l.value ? "_blank" : void 0,
                  title: l.value ? `${p.licenceName} (nouvelle fenêtre)` : p.licenceName,
                  rel: "noopener noreferrer"
                }, o.value), {
                  default: U(() => [
                    F(h(p.licenceName), 1)
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
}), Di = /* @__PURE__ */ we(Ii, [["__scopeId", "data-v-4030eed5"]]), Ti = { class: "fr-footer__top-cat" }, Ci = { class: "fr-footer__top-list" }, Ei = ["href"], Pi = /* @__PURE__ */ $({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(n) {
    return (t, e) => {
      const a = xe("RouterLink");
      return i(), f("div", null, [
        c("h3", Ti, h(t.categoryName), 1),
        c("ul", Ci, [
          (i(!0), f(Q, null, Z(t.links, (r, l) => (i(), f("li", { key: l }, [
            typeof r.to == "string" && r.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: r.to
            }, h(r.label), 9, Ei)) : y("", !0),
            typeof r.to == "object" || typeof r.to == "string" && !r.to.startsWith("http") ? (i(), j(a, {
              key: 1,
              class: "fr-footer__top-link",
              to: r.to
            }, {
              default: U(() => [
                F(h(r.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : y("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Mi = { class: "fr-connect-group" }, Li = ["href", "title"], Bi = /* @__PURE__ */ $({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(n) {
    return (t, e) => (i(), f("div", Mi, [
      c("button", {
        class: O(["fr-connect", [{ "fr-connect--plus": t.secure }]])
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
}, Ai = { class: "fr-nav__item" }, $i = ["aria-controls", "aria-expanded"], Oi = { class: "fr-hidden-lg" }, Ri = ["id"], Fi = { class: "fr-menu__list" }, Ni = ["hreflang", "lang", "aria-current", "href", "onClick"], rt = /* @__PURE__ */ $({
  __name: "DsfrLanguageSelector",
  props: {
    id: { default: () => ae("language-selector") },
    languages: { default: () => [] },
    currentLanguage: { default: "fr" }
  },
  emits: ["select"],
  setup(n, { emit: t }) {
    const e = n, a = t, {
      collapse: r,
      collapsing: l,
      cssExpanded: o,
      doExpand: s,
      onTransitionEnd: u
    } = Ae(), d = K(!1);
    function p(k) {
      d.value = !1, a("select", k);
    }
    const m = _(
      () => e.languages.find(({ codeIso: k }) => k === e.currentLanguage)
    );
    return pe(d, (k, E) => {
      k !== E && s(k);
    }), (k, E) => {
      var I, S;
      return i(), f("nav", Si, [
        c("div", Ai, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": k.id,
            "aria-expanded": d.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: E[0] || (E[0] = te((w) => d.value = !d.value, ["prevent", "stop"]))
          }, [
            F(h((I = m.value) == null ? void 0 : I.codeIso.toUpperCase()), 1),
            c("span", Oi, " - " + h((S = m.value) == null ? void 0 : S.label), 1)
          ], 8, $i),
          c("div", {
            id: k.id,
            ref_key: "collapse",
            ref: r,
            class: O(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": R(o), "fr-collapsing": R(l) }]),
            onTransitionend: E[1] || (E[1] = (w) => R(u)(d.value))
          }, [
            c("ul", Fi, [
              (i(!0), f(Q, null, Z(k.languages, (w, x) => (i(), f("li", { key: x }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: w.codeIso,
                  lang: w.codeIso,
                  "aria-current": k.currentLanguage === w.codeIso ? !0 : void 0,
                  href: `#${w.codeIso}`,
                  onClick: te((T) => p(w), ["prevent", "stop"])
                }, h(`${w.codeIso.toUpperCase()} - ${w.label}`), 9, Ni)
              ]))), 128))
            ])
          ], 42, Ri)
        ])
      ]);
    };
  }
}), Vi = ["for"], qi = {
  key: 0,
  class: "required"
}, ji = {
  key: 0,
  class: "fr-hint-text"
}, Hi = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "DsfrInput",
  props: {
    id: { default: () => ae("basic", "input") },
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
    const e = n, a = sr(), r = K(null), l = () => {
      var d;
      return (d = r.value) == null ? void 0 : d.focus();
    }, o = _(() => e.isTextarea ? "textarea" : "input"), s = _(() => e.isWithWrapper || a.type === "date" || !!e.wrapperClass), u = _(() => [
      "fr-label",
      { invisible: !e.labelVisible },
      e.labelClass
    ]);
    return t({
      focus: l
    }), (d, p) => (i(), f(Q, null, [
      c("label", {
        class: O(u.value),
        for: d.id
      }, [
        L(d.$slots, "label", {}, () => [
          F(h(d.label) + " ", 1),
          L(d.$slots, "required-tip", {}, () => [
            "required" in d.$attrs && d.$attrs.required !== !1 ? (i(), f("span", qi, "*")) : y("", !0)
          ], !0)
        ], !0),
        d.hint ? (i(), f("span", ji, h(d.hint), 1)) : y("", !0)
      ], 10, Vi),
      s.value ? (i(), f("div", {
        key: 1,
        class: O([
          { "fr-input-wrap": d.isWithWrapper || d.$attrs.type === "date" },
          d.wrapperClass
        ])
      }, [
        (i(), j(ge(o.value), W({ id: d.id }, d.$attrs, {
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
      ], 2)) : (i(), j(ge(o.value), W({
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
}), Et = /* @__PURE__ */ we(Hi, [["__scopeId", "data-v-7ca45de8"]]), lt = /* @__PURE__ */ $({
  __name: "DsfrSearchBar",
  props: {
    id: { default: () => ae("search", "input") },
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
      class: O(["fr-search-bar", { "fr-search-bar--lg": a.large }]),
      role: "search"
    }, [
      ne(Et, {
        id: a.id,
        type: "search",
        placeholder: a.placeholder,
        "model-value": a.modelValue,
        label: a.label,
        disabled: a.disabled,
        "aria-disabled": a.disabled,
        "onUpdate:modelValue": r[0] || (r[0] = (l) => e("update:modelValue", l)),
        onKeydown: r[1] || (r[1] = J((l) => e("search", a.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label", "disabled", "aria-disabled"]),
      ne(je, {
        title: "Rechercher",
        disabled: a.disabled,
        "aria-disabled": a.disabled,
        onClick: r[2] || (r[2] = (l) => e("search", a.modelValue))
      }, {
        default: U(() => [
          F(h(a.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), Pn = 1, ln = /* @__PURE__ */ $({
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
    const t = n, e = _(() => typeof t.path == "string"), a = _(() => {
      var m;
      return ((m = t.href) == null ? void 0 : m.startsWith("http")) || e.value && t.path.startsWith("http") || typeof t.to == "string" && t.to.startsWith("http");
    }), r = _(() => {
      var m;
      return ((m = t.href) == null ? void 0 : m.startsWith("mailto")) || e.value && t.path.startsWith("mailto") || typeof t.to == "string" && t.to.startsWith("mailto");
    }), l = _(() => t.button ? "button" : a.value || r.value ? "a" : "RouterLink"), o = _(() => {
      if (!(!a.value && !r.value))
        return t.to ?? t.href ?? t.path;
    }), s = _(() => {
      if (!(a.value || r.value))
        return t.to ?? t.path;
    }), u = _(() => s.value ? { to: s.value } : { href: o.value }), d = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), p = _(
      () => typeof t.icon == "string" ? { name: t.icon, scale: Pn, ...t.iconAttrs ?? {} } : { scale: Pn, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (m, k) => (i(), j(ge(l.value), W({
      class: ["fr-btn", {
        "fr-btn--icon-right": d.value && m.iconRight,
        "fr-btn--icon-left": d.value && !m.iconRight,
        [String(m.icon)]: d.value
      }]
    }, u.value, {
      target: m.target,
      onClick: k[0] || (k[0] = te((E) => m.onClick(E), ["stop"]))
    }), {
      default: U(() => {
        var E, I;
        return [
          !d.value && (m.icon || (E = m.iconAttrs) != null && E.name) && !m.iconRight ? (i(), j(be, W({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : y("", !0),
          F(" " + h(m.label) + " ", 1),
          !d.value && (m.icon || (I = m.iconAttrs) != null && I.name) && m.iconRight ? (i(), j(be, W({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : y("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Wi = ["aria-label"], Ki = { class: "fr-btns-group" }, jt = /* @__PURE__ */ $({
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
      c("ul", Ki, [
        (i(!0), f(Q, null, Z(a.links, (l, o) => (i(), f("li", { key: o }, [
          ne(ln, W({ ref_for: !0 }, l, {
            "on-click": (s) => {
              var u;
              e("linkClick", s), (u = l.onClick) == null || u.call(l, s);
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
}, nu = ["aria-label", "title", "data-fr-opened"], au = ["aria-label", "title"], ru = {
  key: 0,
  class: "fr-header__service"
}, lu = { class: "fr-header__service-title" }, ou = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, su = {
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
}, bu = /* @__PURE__ */ $({
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
    const e = n, a = t, r = zt(), l = ot(e, "languageSelector"), o = K(!1), s = K(!1), u = K(!1), d = () => {
      var x;
      u.value = !1, o.value = !1, s.value = !1, (x = document.getElementById("button-menu")) == null || x.focus();
    }, p = (x) => {
      x.key === "Escape" && d();
    };
    ye(() => {
      document.addEventListener("keydown", p);
    }), Ce(() => {
      document.removeEventListener("keydown", p);
    });
    const m = () => {
      u.value = !0, o.value = !0, s.value = !1, setTimeout(() => {
        var x;
        (x = document.getElementById("close-button")) == null || x.focus();
      });
    }, k = () => {
      u.value = !0, o.value = !1, s.value = !0;
    }, E = d, I = _(() => [e.homeLabel, e.serviceTitle].filter((x) => x).join(" - ")), S = _(() => !!r.operator || !!e.operatorImgSrc), w = _(() => !!r.mainnav);
    return Oe(an, () => d), (x, T) => {
      var M, D, b;
      const v = xe("RouterLink");
      return i(), f("header", Qi, [
        c("div", Yi, [
          c("div", zi, [
            c("div", Gi, [
              c("div", Xi, [
                c("div", Ui, [
                  c("div", Zi, [
                    ne(v, {
                      to: x.homeTo,
                      title: I.value
                    }, {
                      default: U(() => [
                        ne(at, {
                          "logo-text": x.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  S.value ? (i(), f("div", Ji, [
                    L(x.$slots, "operator", {}, () => [
                      x.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: x.operatorImgSrc,
                        alt: x.operatorImgAlt,
                        style: De(x.operatorImgStyle)
                      }, null, 12, eu)) : y("", !0)
                    ])
                  ])) : y("", !0),
                  x.showSearch || w.value || (M = x.quickLinks) != null && M.length ? (i(), f("div", tu, [
                    x.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": x.showSearchLabel,
                      title: x.showSearchLabel,
                      "data-fr-opened": s.value,
                      onClick: T[0] || (T[0] = te((g) => k(), ["prevent", "stop"]))
                    }, null, 8, nu)) : y("", !0),
                    w.value || (D = x.quickLinks) != null && D.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": m,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "dialog",
                      "aria-label": x.menuLabel,
                      title: x.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: T[1] || (T[1] = te((g) => m(), ["prevent", "stop"]))
                    }, null, 8, au)) : y("", !0)
                  ])) : y("", !0)
                ]),
                x.serviceTitle ? (i(), f("div", ru, [
                  ne(v, W({
                    to: x.homeTo,
                    title: I.value
                  }, x.$attrs), {
                    default: U(() => [
                      c("p", lu, [
                        F(h(x.serviceTitle) + " ", 1),
                        x.showBeta ? (i(), f("span", ou, " BETA ")) : y("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  x.serviceDescription ? (i(), f("p", su, h(x.serviceDescription), 1)) : y("", !0)
                ])) : y("", !0),
                !x.serviceTitle && x.showBeta ? (i(), f("div", iu, T[9] || (T[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : y("", !0)
              ]),
              c("div", uu, [
                (b = x.quickLinks) != null && b.length || l.value ? (i(), f("div", du, [
                  L(x.$slots, "before-quick-links"),
                  o.value ? y("", !0) : (i(), j(jt, {
                    key: 0,
                    links: x.quickLinks,
                    "nav-aria-label": x.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  L(x.$slots, "after-quick-links"),
                  l.value ? (i(), j(rt, W({ key: 1 }, l.value, {
                    onSelect: T[2] || (T[2] = (g) => a("languageSelect", g))
                  }), null, 16)) : y("", !0)
                ])) : y("", !0),
                x.showSearch ? (i(), f("div", cu, [
                  ne(lt, {
                    id: x.searchbarId,
                    label: x.searchLabel,
                    "model-value": x.modelValue,
                    placeholder: x.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": T[3] || (T[3] = (g) => a("update:modelValue", g)),
                    onSearch: T[4] || (T[4] = (g) => a("search", g))
                  }, null, 8, ["id", "label", "model-value", "placeholder"])
                ])) : y("", !0)
              ])
            ]),
            x.showSearch || w.value || x.quickLinks && x.quickLinks.length || l.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: O(["fr-header__menu fr-modal", { "fr-modal--opened": u.value }]),
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
                  onClick: T[5] || (T[5] = te((g) => d(), ["prevent", "stop"]))
                }, h(x.closeMenuModalLabel), 1),
                c("div", mu, [
                  l.value ? (i(), j(rt, W({ key: 0 }, l.value, {
                    onSelect: T[6] || (T[6] = (g) => l.value.currentLanguage = g.codeIso)
                  }), null, 16)) : y("", !0),
                  L(x.$slots, "before-quick-links"),
                  o.value ? (i(), j(jt, {
                    key: 1,
                    role: "navigation",
                    links: x.quickLinks,
                    "nav-aria-label": x.quickLinksAriaLabel,
                    onLinkClick: R(E)
                  }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : y("", !0),
                  L(x.$slots, "after-quick-links")
                ]),
                u.value ? L(x.$slots, "mainnav", {
                  key: 0,
                  hidemodal: d
                }) : y("", !0),
                s.value ? (i(), f("div", hu, [
                  ne(lt, {
                    "searchbar-id": x.searchbarId,
                    "model-value": x.modelValue,
                    placeholder: x.placeholder,
                    "onUpdate:modelValue": T[7] || (T[7] = (g) => a("update:modelValue", g)),
                    onSearch: T[8] || (T[8] = (g) => a("search", g))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : y("", !0)
              ])
            ], 10, fu)) : y("", !0),
            L(x.$slots, "default")
          ])
        ]),
        c("div", vu, [
          w.value && !u.value ? (i(), f("div", gu, [
            L(x.$slots, "mainnav", { hidemodal: d })
          ])) : y("", !0)
        ])
      ]);
    };
  }
}), yu = /* @__PURE__ */ $({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(n) {
    return (t, e) => (i(), f("div", {
      class: O(["fr-highlight", { [`fr-highlight--${t.color}`]: t.color }])
    }, [
      c("p", {
        class: O({
          "fr-text--lg": t.large && !t.small,
          "fr-text--sm": t.small && !t.large
        })
      }, [
        F(h(t.text) + " ", 1),
        L(t.$slots, "default")
      ], 2)
    ], 2));
  }
}), ku = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, wu = ["id", "data-testid"], _u = ["id", "data-testid"], xu = ["id", "data-testid"], Iu = ["id", "data-testid"], Du = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "DsfrInputGroup",
  props: {
    descriptionId: { default: () => ae("input", "group") },
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
      class: O(["fr-input-group", [
        {
          "fr-input-group--error": t.errorMessage,
          "fr-input-group--valid": t.validMessage && !t.errorMessage
        },
        t.wrapperClass
      ]])
    }, [
      L(t.$slots, "before-input"),
      L(t.$slots, "default"),
      t.$slots.default ? y("", !0) : (i(), j(Et, W({ key: 0 }, t.$attrs, {
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
      c("div", ku, [
        Array.isArray(t.errorMessage) ? (i(!0), f(Q, { key: 0 }, Z(t.errorMessage, (a) => (i(), f("p", {
          id: t.descriptionId,
          key: a,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, h(a), 9, wu))), 128)) : t.errorMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.errorMessage,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, h(t.errorMessage), 9, _u)) : y("", !0),
        Array.isArray(t.validMessage) ? (i(!0), f(Q, { key: 2 }, Z(t.validMessage, (a) => (i(), f("p", {
          id: t.descriptionId,
          key: a,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, h(a), 9, xu))), 128)) : t.validMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.validMessage,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, h(t.validMessage), 9, Iu)) : y("", !0)
      ])
    ], 2));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var ga = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], mt = /* @__PURE__ */ ga.join(","), ba = typeof Element > "u", He = ba ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, ht = !ba && Element.prototype.getRootNode ? function(n) {
  var t;
  return n == null || (t = n.getRootNode) === null || t === void 0 ? void 0 : t.call(n);
} : function(n) {
  return n == null ? void 0 : n.ownerDocument;
}, vt = function n(t, e) {
  var a;
  e === void 0 && (e = !0);
  var r = t == null || (a = t.getAttribute) === null || a === void 0 ? void 0 : a.call(t, "inert"), l = r === "" || r === "true", o = l || e && t && n(t.parentNode);
  return o;
}, Tu = function(n) {
  var t, e = n == null || (t = n.getAttribute) === null || t === void 0 ? void 0 : t.call(n, "contenteditable");
  return e === "" || e === "true";
}, ya = function(n, t, e) {
  if (vt(n))
    return [];
  var a = Array.prototype.slice.apply(n.querySelectorAll(mt));
  return t && He.call(n, mt) && a.unshift(n), a = a.filter(e), a;
}, ka = function n(t, e, a) {
  for (var r = [], l = Array.from(t); l.length; ) {
    var o = l.shift();
    if (!vt(o, !1))
      if (o.tagName === "SLOT") {
        var s = o.assignedElements(), u = s.length ? s : o.children, d = n(u, !0, a);
        a.flatten ? r.push.apply(r, d) : r.push({
          scopeParent: o,
          candidates: d
        });
      } else {
        var p = He.call(o, mt);
        p && a.filter(o) && (e || !t.includes(o)) && r.push(o);
        var m = o.shadowRoot || // check for an undisclosed shadow
        typeof a.getShadowRoot == "function" && a.getShadowRoot(o), k = !vt(m, !1) && (!a.shadowRootFilter || a.shadowRootFilter(o));
        if (m && k) {
          var E = n(m === !0 ? o.children : m.children, !0, a);
          a.flatten ? r.push.apply(r, E) : r.push({
            scopeParent: o,
            candidates: E
          });
        } else
          l.unshift.apply(l, o.children);
      }
  }
  return r;
}, wa = function(n) {
  return !isNaN(parseInt(n.getAttribute("tabindex"), 10));
}, Ve = function(n) {
  if (!n)
    throw new Error("No node provided");
  return n.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(n.tagName) || Tu(n)) && !wa(n) ? 0 : n.tabIndex;
}, Cu = function(n, t) {
  var e = Ve(n);
  return e < 0 && t && !wa(n) ? 0 : e;
}, Eu = function(n, t) {
  return n.tabIndex === t.tabIndex ? n.documentOrder - t.documentOrder : n.tabIndex - t.tabIndex;
}, _a = function(n) {
  return n.tagName === "INPUT";
}, Pu = function(n) {
  return _a(n) && n.type === "hidden";
}, Mu = function(n) {
  var t = n.tagName === "DETAILS" && Array.prototype.slice.apply(n.children).some(function(e) {
    return e.tagName === "SUMMARY";
  });
  return t;
}, Lu = function(n, t) {
  for (var e = 0; e < n.length; e++)
    if (n[e].checked && n[e].form === t)
      return n[e];
}, Bu = function(n) {
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
  var r = Lu(a, n.form);
  return !r || r === n;
}, Su = function(n) {
  return _a(n) && n.type === "radio";
}, Au = function(n) {
  return Su(n) && !Bu(n);
}, $u = function(n) {
  var t, e = n && ht(n), a = (t = e) === null || t === void 0 ? void 0 : t.host, r = !1;
  if (e && e !== n) {
    var l, o, s;
    for (r = !!((l = a) !== null && l !== void 0 && (o = l.ownerDocument) !== null && o !== void 0 && o.contains(a) || n != null && (s = n.ownerDocument) !== null && s !== void 0 && s.contains(n)); !r && a; ) {
      var u, d, p;
      e = ht(a), a = (u = e) === null || u === void 0 ? void 0 : u.host, r = !!((d = a) !== null && d !== void 0 && (p = d.ownerDocument) !== null && p !== void 0 && p.contains(a));
    }
  }
  return r;
}, Mn = function(n) {
  var t = n.getBoundingClientRect(), e = t.width, a = t.height;
  return e === 0 && a === 0;
}, Ou = function(n, t) {
  var e = t.displayCheck, a = t.getShadowRoot;
  if (getComputedStyle(n).visibility === "hidden")
    return !0;
  var r = He.call(n, "details>summary:first-of-type"), l = r ? n.parentElement : n;
  if (He.call(l, "details:not([open]) *"))
    return !0;
  if (!e || e === "full" || e === "legacy-full") {
    if (typeof a == "function") {
      for (var o = n; n; ) {
        var s = n.parentElement, u = ht(n);
        if (s && !s.shadowRoot && a(s) === !0)
          return Mn(n);
        n.assignedSlot ? n = n.assignedSlot : !s && u !== n.ownerDocument ? n = u.host : n = s;
      }
      n = o;
    }
    if ($u(n))
      return !n.getClientRects().length;
    if (e !== "legacy-full")
      return !0;
  } else if (e === "non-zero-area")
    return Mn(n);
  return !1;
}, Ru = function(n) {
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
  vt(t) || Pu(t) || Ou(t, n) || // For a details element with a summary, the summary element gets the focus
  Mu(t) || Ru(t));
}, Ht = function(n, t) {
  return !(Au(t) || Ve(t) < 0 || !gt(n, t));
}, Fu = function(n) {
  var t = parseInt(n.getAttribute("tabindex"), 10);
  return !!(isNaN(t) || t >= 0);
}, Nu = function n(t) {
  var e = [], a = [];
  return t.forEach(function(r, l) {
    var o = !!r.scopeParent, s = o ? r.scopeParent : r, u = Cu(s, o), d = o ? n(r.candidates) : s;
    u === 0 ? o ? e.push.apply(e, d) : e.push(s) : a.push({
      documentOrder: l,
      tabIndex: u,
      item: r,
      isScope: o,
      content: d
    });
  }), a.sort(Eu).reduce(function(r, l) {
    return l.isScope ? r.push.apply(r, l.content) : r.push(l.content), r;
  }, []).concat(e);
}, Vu = function(n, t) {
  t = t || {};
  var e;
  return t.getShadowRoot ? e = ka([n], t.includeContainer, {
    filter: Ht.bind(null, t),
    flatten: !1,
    getShadowRoot: t.getShadowRoot,
    shadowRootFilter: Fu
  }) : e = ya(n, t.includeContainer, Ht.bind(null, t)), Nu(e);
}, qu = function(n, t) {
  t = t || {};
  var e;
  return t.getShadowRoot ? e = ka([n], t.includeContainer, {
    filter: gt.bind(null, t),
    flatten: !0,
    getShadowRoot: t.getShadowRoot
  }) : e = ya(n, t.includeContainer, gt.bind(null, t)), e;
}, We = function(n, t) {
  if (t = t || {}, !n)
    throw new Error("No node provided");
  return He.call(n, mt) === !1 ? !1 : Ht(t, n);
}, ju = /* @__PURE__ */ ga.concat("iframe").join(","), Bt = function(n, t) {
  if (t = t || {}, !n)
    throw new Error("No node provided");
  return He.call(n, ju) === !1 ? !1 : gt(t, n);
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
function Hu(n) {
  if (Array.isArray(n)) return Wt(n);
}
function Wu(n, t, e) {
  return (t = Gu(t)) in n ? Object.defineProperty(n, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[t] = e, n;
}
function Ku(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
}
function Qu() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ln(n, t) {
  var e = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(n);
    t && (a = a.filter(function(r) {
      return Object.getOwnPropertyDescriptor(n, r).enumerable;
    })), e.push.apply(e, a);
  }
  return e;
}
function Bn(n) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ln(Object(e), !0).forEach(function(a) {
      Wu(n, a, e[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e)) : Ln(Object(e)).forEach(function(a) {
      Object.defineProperty(n, a, Object.getOwnPropertyDescriptor(e, a));
    });
  }
  return n;
}
function Yu(n) {
  return Hu(n) || Ku(n) || Xu(n) || Qu();
}
function zu(n, t) {
  if (typeof n != "object" || !n) return n;
  var e = n[Symbol.toPrimitive];
  if (e !== void 0) {
    var a = e.call(n, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(n);
}
function Gu(n) {
  var t = zu(n, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Xu(n, t) {
  if (n) {
    if (typeof n == "string") return Wt(n, t);
    var e = {}.toString.call(n).slice(8, -1);
    return e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set" ? Array.from(n) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Wt(n, t) : void 0;
  }
}
var Sn = {
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
}, Uu = function(n) {
  return n.tagName && n.tagName.toLowerCase() === "input" && typeof n.select == "function";
}, Zu = function(n) {
  return (n == null ? void 0 : n.key) === "Escape" || (n == null ? void 0 : n.key) === "Esc" || (n == null ? void 0 : n.keyCode) === 27;
}, et = function(n) {
  return (n == null ? void 0 : n.key) === "Tab" || (n == null ? void 0 : n.keyCode) === 9;
}, Ju = function(n) {
  return et(n) && !n.shiftKey;
}, ed = function(n) {
  return et(n) && n.shiftKey;
}, An = function(n) {
  return setTimeout(n, 0);
}, Ue = function(n) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    e[a - 1] = arguments[a];
  return typeof n == "function" ? n.apply(void 0, e) : n;
}, ut = function(n) {
  return n.target.shadowRoot && typeof n.composedPath == "function" ? n.composedPath()[0] : n.target;
}, td = [], nd = function(n, t) {
  var e = (t == null ? void 0 : t.document) || document, a = (t == null ? void 0 : t.trapStack) || td, r = Bn({
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
  }, o, s = function(P, A, B) {
    return P && P[A] !== void 0 ? P[A] : r[B || A];
  }, u = function(P, A) {
    var B = typeof (A == null ? void 0 : A.composedPath) == "function" ? A.composedPath() : void 0;
    return l.containerGroups.findIndex(function(N) {
      var X = N.container, z = N.tabbableNodes;
      return X.contains(P) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (B == null ? void 0 : B.includes(X)) || z.find(function(ee) {
        return ee === P;
      });
    });
  }, d = function(P) {
    var A = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, B = A.hasFallback, N = B === void 0 ? !1 : B, X = A.params, z = X === void 0 ? [] : X, ee = r[P];
    if (typeof ee == "function" && (ee = ee.apply(void 0, Yu(z))), ee === !0 && (ee = void 0), !ee) {
      if (ee === void 0 || ee === !1)
        return ee;
      throw new Error("`".concat(P, "` was specified but was not a node, or did not return a node"));
    }
    var le = ee;
    if (typeof ee == "string") {
      try {
        le = e.querySelector(ee);
      } catch (oe) {
        throw new Error("`".concat(P, '` appears to be an invalid selector; error="').concat(oe.message, '"'));
      }
      if (!le && !N)
        throw new Error("`".concat(P, "` as selector refers to no known node"));
    }
    return le;
  }, p = function() {
    var P = d("initialFocus", {
      hasFallback: !0
    });
    if (P === !1)
      return !1;
    if (P === void 0 || P && !Bt(P, r.tabbableOptions))
      if (u(e.activeElement) >= 0)
        P = e.activeElement;
      else {
        var A = l.tabbableGroups[0], B = A && A.firstTabbableNode;
        P = B || d("fallbackFocus");
      }
    else P === null && (P = d("fallbackFocus"));
    if (!P)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return P;
  }, m = function() {
    if (l.containerGroups = l.containers.map(function(P) {
      var A = Vu(P, r.tabbableOptions), B = qu(P, r.tabbableOptions), N = A.length > 0 ? A[0] : void 0, X = A.length > 0 ? A[A.length - 1] : void 0, z = B.find(function(oe) {
        return We(oe);
      }), ee = B.slice().reverse().find(function(oe) {
        return We(oe);
      }), le = !!A.find(function(oe) {
        return Ve(oe) > 0;
      });
      return {
        container: P,
        tabbableNodes: A,
        focusableNodes: B,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: le,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: N,
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
        firstDomTabbableNode: z,
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
        nextTabbableNode: function(oe) {
          var Ie = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, Ee = A.indexOf(oe);
          return Ee < 0 ? Ie ? B.slice(B.indexOf(oe) + 1).find(function(H) {
            return We(H);
          }) : B.slice(0, B.indexOf(oe)).reverse().find(function(H) {
            return We(H);
          }) : A[Ee + (Ie ? 1 : -1)];
        }
      };
    }), l.tabbableGroups = l.containerGroups.filter(function(P) {
      return P.tabbableNodes.length > 0;
    }), l.tabbableGroups.length <= 0 && !d("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (l.containerGroups.find(function(P) {
      return P.posTabIndexesFound;
    }) && l.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, k = function(P) {
    var A = P.activeElement;
    if (A)
      return A.shadowRoot && A.shadowRoot.activeElement !== null ? k(A.shadowRoot) : A;
  }, E = function(P) {
    if (P !== !1 && P !== k(document)) {
      if (!P || !P.focus) {
        E(p());
        return;
      }
      P.focus({
        preventScroll: !!r.preventScroll
      }), l.mostRecentlyFocusedNode = P, Uu(P) && P.select();
    }
  }, I = function(P) {
    var A = d("setReturnFocus", {
      params: [P]
    });
    return A || (A === !1 ? !1 : P);
  }, S = function(P) {
    var A = P.target, B = P.event, N = P.isBackward, X = N === void 0 ? !1 : N;
    A = A || ut(B), m();
    var z = null;
    if (l.tabbableGroups.length > 0) {
      var ee = u(A, B), le = ee >= 0 ? l.containerGroups[ee] : void 0;
      if (ee < 0)
        X ? z = l.tabbableGroups[l.tabbableGroups.length - 1].lastTabbableNode : z = l.tabbableGroups[0].firstTabbableNode;
      else if (X) {
        var oe = l.tabbableGroups.findIndex(function(me) {
          var ve = me.firstTabbableNode;
          return A === ve;
        });
        if (oe < 0 && (le.container === A || Bt(A, r.tabbableOptions) && !We(A, r.tabbableOptions) && !le.nextTabbableNode(A, !1)) && (oe = ee), oe >= 0) {
          var Ie = oe === 0 ? l.tabbableGroups.length - 1 : oe - 1, Ee = l.tabbableGroups[Ie];
          z = Ve(A) >= 0 ? Ee.lastTabbableNode : Ee.lastDomTabbableNode;
        } else et(B) || (z = le.nextTabbableNode(A, !1));
      } else {
        var H = l.tabbableGroups.findIndex(function(me) {
          var ve = me.lastTabbableNode;
          return A === ve;
        });
        if (H < 0 && (le.container === A || Bt(A, r.tabbableOptions) && !We(A, r.tabbableOptions) && !le.nextTabbableNode(A)) && (H = ee), H >= 0) {
          var G = H === l.tabbableGroups.length - 1 ? 0 : H + 1, re = l.tabbableGroups[G];
          z = Ve(A) >= 0 ? re.firstTabbableNode : re.firstDomTabbableNode;
        } else et(B) || (z = le.nextTabbableNode(A));
      }
    } else
      z = d("fallbackFocus");
    return z;
  }, w = function(P) {
    var A = ut(P);
    if (!(u(A, P) >= 0)) {
      if (Ue(r.clickOutsideDeactivates, P)) {
        o.deactivate({
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
      Ue(r.allowOutsideClick, P) || P.preventDefault();
    }
  }, x = function(P) {
    var A = ut(P), B = u(A, P) >= 0;
    if (B || A instanceof Document)
      B && (l.mostRecentlyFocusedNode = A);
    else {
      P.stopImmediatePropagation();
      var N, X = !0;
      if (l.mostRecentlyFocusedNode)
        if (Ve(l.mostRecentlyFocusedNode) > 0) {
          var z = u(l.mostRecentlyFocusedNode), ee = l.containerGroups[z].tabbableNodes;
          if (ee.length > 0) {
            var le = ee.findIndex(function(oe) {
              return oe === l.mostRecentlyFocusedNode;
            });
            le >= 0 && (r.isKeyForward(l.recentNavEvent) ? le + 1 < ee.length && (N = ee[le + 1], X = !1) : le - 1 >= 0 && (N = ee[le - 1], X = !1));
          }
        } else
          l.containerGroups.some(function(oe) {
            return oe.tabbableNodes.some(function(Ie) {
              return Ve(Ie) > 0;
            });
          }) || (X = !1);
      else
        X = !1;
      X && (N = S({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: l.mostRecentlyFocusedNode,
        isBackward: r.isKeyBackward(l.recentNavEvent)
      })), E(N || l.mostRecentlyFocusedNode || p());
    }
    l.recentNavEvent = void 0;
  }, T = function(P) {
    var A = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    l.recentNavEvent = P;
    var B = S({
      event: P,
      isBackward: A
    });
    B && (et(P) && P.preventDefault(), E(B));
  }, M = function(P) {
    (r.isKeyForward(P) || r.isKeyBackward(P)) && T(P, r.isKeyBackward(P));
  }, D = function(P) {
    Zu(P) && Ue(r.escapeDeactivates, P) !== !1 && (P.preventDefault(), o.deactivate());
  }, b = function(P) {
    var A = ut(P);
    u(A, P) >= 0 || Ue(r.clickOutsideDeactivates, P) || Ue(r.allowOutsideClick, P) || (P.preventDefault(), P.stopImmediatePropagation());
  }, v = function() {
    if (l.active)
      return Sn.activateTrap(a, o), l.delayInitialFocusTimer = r.delayInitialFocus ? An(function() {
        E(p());
      }) : E(p()), e.addEventListener("focusin", x, !0), e.addEventListener("mousedown", w, {
        capture: !0,
        passive: !1
      }), e.addEventListener("touchstart", w, {
        capture: !0,
        passive: !1
      }), e.addEventListener("click", b, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", M, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", D), o;
  }, g = function() {
    if (l.active)
      return e.removeEventListener("focusin", x, !0), e.removeEventListener("mousedown", w, !0), e.removeEventListener("touchstart", w, !0), e.removeEventListener("click", b, !0), e.removeEventListener("keydown", M, !0), e.removeEventListener("keydown", D), o;
  }, C = function(P) {
    var A = P.some(function(B) {
      var N = Array.from(B.removedNodes);
      return N.some(function(X) {
        return X === l.mostRecentlyFocusedNode;
      });
    });
    A && E(p());
  }, q = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(C) : void 0, Y = function() {
    q && (q.disconnect(), l.active && !l.paused && l.containers.map(function(P) {
      q.observe(P, {
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
    activate: function(P) {
      if (l.active)
        return this;
      var A = s(P, "onActivate"), B = s(P, "onPostActivate"), N = s(P, "checkCanFocusTrap");
      N || m(), l.active = !0, l.paused = !1, l.nodeFocusedBeforeActivation = e.activeElement, A == null || A();
      var X = function() {
        N && m(), v(), Y(), B == null || B();
      };
      return N ? (N(l.containers.concat()).then(X, X), this) : (X(), this);
    },
    deactivate: function(P) {
      if (!l.active)
        return this;
      var A = Bn({
        onDeactivate: r.onDeactivate,
        onPostDeactivate: r.onPostDeactivate,
        checkCanReturnFocus: r.checkCanReturnFocus
      }, P);
      clearTimeout(l.delayInitialFocusTimer), l.delayInitialFocusTimer = void 0, g(), l.active = !1, l.paused = !1, Y(), Sn.deactivateTrap(a, o);
      var B = s(A, "onDeactivate"), N = s(A, "onPostDeactivate"), X = s(A, "checkCanReturnFocus"), z = s(A, "returnFocus", "returnFocusOnDeactivate");
      B == null || B();
      var ee = function() {
        An(function() {
          z && E(I(l.nodeFocusedBeforeActivation)), N == null || N();
        });
      };
      return z && X ? (X(I(l.nodeFocusedBeforeActivation)).then(ee, ee), this) : (ee(), this);
    },
    pause: function(P) {
      return l.active ? (l.manuallyPaused = !0, this._setPausedState(!0, P)) : this;
    },
    unpause: function(P) {
      return l.active ? (l.manuallyPaused = !1, a[a.length - 1] !== this ? this : this._setPausedState(!1, P)) : this;
    },
    updateContainerElements: function(P) {
      var A = [].concat(P).filter(Boolean);
      return l.containers = A.map(function(B) {
        return typeof B == "string" ? e.querySelector(B) : B;
      }), l.active && m(), Y(), this;
    }
  }, Object.defineProperties(o, {
    _isManuallyPaused: {
      value: function() {
        return l.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function(P, A) {
        if (l.paused === P)
          return this;
        if (l.paused = P, P) {
          var B = s(A, "onPause"), N = s(A, "onPostPause");
          B == null || B(), g(), Y(), N == null || N();
        } else {
          var X = s(A, "onUnpause"), z = s(A, "onPostUnpause");
          X == null || X(), m(), v(), Y(), z == null || z();
        }
        return this;
      }
    }
  }), o.updateContainerElements(n), o;
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
}, rd = $({
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
  setup(n, { slots: t, emit: e }) {
    let a;
    const r = K(null), l = _(() => {
      const s = r.value;
      return s && (s instanceof HTMLElement ? s : s.$el);
    });
    function o() {
      return a || (a = nd(l.value, {
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
    return ye(() => {
      pe(() => n.active, (s) => {
        s && l.value ? o().activate() : a && (a.deactivate(), (!l.value || l.value.nodeType === Node.COMMENT_NODE) && (a = null));
      }, { immediate: !0, flush: "post" });
    }), Ce(() => {
      a && a.deactivate(), a = null;
    }), {
      activate() {
        o().activate();
      },
      deactivate() {
        a && a.deactivate();
      },
      renderImpl() {
        if (!t.default)
          return null;
        const s = t.default().filter((u) => u.type !== lr);
        return !s || !s.length || s.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), s) : or(s[0], { ref: r });
      }
    };
  }
}), ld = ["aria-labelledby", "role", "open"], od = { class: "fr-container fr-container--fluid fr-container-md" }, sd = { class: "fr-grid-row fr-grid-row--center" }, id = { class: "fr-modal__body" }, ud = { class: "fr-modal__header" }, dd = ["title"], cd = { class: "fr-modal__content" }, fd = ["id"], pd = {
  key: 0,
  class: "fr-modal__footer"
}, $n = 2, md = /* @__PURE__ */ $({
  __name: "DsfrModal",
  props: {
    modalId: { default: () => ae("modal", "dialog") },
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
    const e = n, a = t, r = (I) => {
      I.key === "Escape" && m();
    }, l = _(() => e.isAlert ? "alertdialog" : "dialog"), o = K(null), s = K();
    pe(() => e.opened, (I) => {
      var S, w;
      I ? ((S = s.value) == null || S.showModal(), setTimeout(() => {
        var x;
        (x = o.value) == null || x.focus();
      }, 100)) : (w = s.value) == null || w.close(), u(I);
    });
    function u(I) {
      typeof window < "u" && document.body.classList.toggle("modal-open", I);
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
    async function m() {
      var I;
      await Yn(), (I = e.origin) == null || I.focus(), a("close");
    }
    const k = _(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), E = _(
      () => k.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: $n } : { scale: $n, ...e.icon ?? {} }
    );
    return (I, S) => I.opened ? (i(), j(R(rd), { key: 0 }, {
      default: U(() => {
        var w, x;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: s,
            "aria-modal": "true",
            "aria-labelledby": I.modalId,
            role: l.value,
            class: O(["fr-modal", { "fr-modal--opened": I.opened }]),
            open: I.opened
          }, [
            c("div", od, [
              c("div", sd, [
                c("div", {
                  class: O(["fr-col-12", {
                    "fr-col-md-8": I.size === "lg",
                    "fr-col-md-6": I.size === "md",
                    "fr-col-md-4": I.size === "sm"
                  }])
                }, [
                  c("div", id, [
                    c("div", ud, [
                      c("button", {
                        ref_key: "closeBtn",
                        ref: o,
                        class: "fr-btn fr-btn--close",
                        title: I.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: S[0] || (S[0] = (T) => m())
                      }, [
                        c("span", null, h(I.closeButtonLabel), 1)
                      ], 8, dd)
                    ]),
                    c("div", cd, [
                      c("h1", {
                        id: I.modalId,
                        class: "fr-modal__title"
                      }, [
                        k.value || E.value ? (i(), f("span", {
                          key: 0,
                          class: O({
                            [String(I.icon)]: k.value
                          })
                        }, [
                          I.icon && E.value ? (i(), j(be, Te(W({ key: 0 }, E.value)), null, 16)) : y("", !0)
                        ], 2)) : y("", !0),
                        F(" " + h(I.title), 1)
                      ], 8, fd),
                      L(I.$slots, "default", {}, void 0, !0)
                    ]),
                    (w = I.actions) != null && w.length || I.$slots.footer ? (i(), f("div", pd, [
                      L(I.$slots, "footer", {}, void 0, !0),
                      (x = I.actions) != null && x.length ? (i(), j(Tt, {
                        key: 0,
                        align: "right",
                        buttons: I.actions,
                        "inline-layout-when": "large",
                        reverse: ""
                      }, null, 8, ["buttons"])) : y("", !0)
                    ])) : y("", !0)
                  ])
                ], 2)
              ])
            ])
          ], 10, ld)
        ];
      }),
      _: 3
    })) : y("", !0);
  }
}), xa = /* @__PURE__ */ we(md, [["__scopeId", "data-v-70fe954b"]]), hd = ["for"], vd = {
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
}, _d = { class: "fr-input-wrap fr-icon-search-line" }, xd = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Id = { key: 2 }, Dd = ["id"], Td = /* @__PURE__ */ $({
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
    id: { default: () => ae("multiselect") },
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
    const t = n, e = (H, G) => typeof H == "object" && H !== null && !!G && G in H, a = (H, G) => {
      if (G && e(H, G)) {
        const re = H[G];
        if (typeof re == "string" || typeof re == "number")
          return re;
        throw new Error(
          `The value of idKey ${String(G)} is not a string or number.`
        );
      }
      if (typeof H == "string" || typeof H == "number")
        return H;
      throw new Error(
        "Option is not a valid string, number, or object with idKey."
      );
    }, r = (H, G, re) => `${G}-${a(H, re)}`, l = K(null), o = K(!1), s = _e(n, "modelValue"), u = K(0), d = _(() => t.errorMessage || t.successMessage), p = _(() => t.errorMessage ? "error" : "valid"), m = [], {
      collapse: k,
      collapsing: E,
      cssExpanded: I,
      doExpand: S,
      onTransitionEnd: w
    } = Ae(), x = () => document.querySelectorAll(`[id^="${t.id}-"][id$="-checkbox"]`), T = K(!1), M = K("");
    function D(H) {
      H.key === "Escape" && q();
    }
    function b(H) {
      var G, re;
      const me = H.target;
      !((G = l.value) != null && G.$el.contains(me)) && !((re = k.value) != null && re.contains(me)) && q();
    }
    function v(H, G) {
      if (window.ResizeObserver) {
        const re = new window.ResizeObserver((me) => {
          for (const ve of me)
            G(H, ve);
        });
        return re.observe(H), () => {
          re.unobserve(H), re.disconnect();
        };
      }
      return () => {
      };
    }
    function g(H) {
      const G = H.getBoundingClientRect();
      G.width !== u.value && (u.value = G.width);
    }
    function C() {
      o.value = !0, T.value = !0, l.value && m.push(v(l.value.$el, g)), document.addEventListener("click", b), document.addEventListener("keydown", D), setTimeout(() => {
        S(!0);
      }, 100);
    }
    function q() {
      o.value = !1, S(!1), setTimeout(() => {
        T.value = !1;
      }, 300), P();
    }
    const Y = async () => {
      T.value ? q() : C();
    };
    function P() {
      for (; m.length; ) {
        const H = m.pop();
        H && H();
      }
      document.removeEventListener("click", b), document.removeEventListener("keydown", D);
    }
    const A = _(
      () => t.options.filter((H) => typeof H == "object" && H !== null ? t.filteringKeys.some(
        (G) => `${H[G]}`.toLowerCase().includes(M.value.toLowerCase())
      ) : `${H}`.toLowerCase().includes(M.value.toLowerCase()))
    ), B = _(() => t.modelValue.length < A.value.length ? !1 : A.value.every((H) => {
      const G = a(H, t.idKey);
      return t.modelValue.includes(G);
    })), N = () => {
      const H = new Set(s.value || []);
      B.value ? A.value.forEach((G) => {
        const re = a(G, t.idKey);
        H.delete(re);
      }) : A.value.forEach((G) => {
        const re = a(G, t.idKey);
        H.add(re);
      }), s.value = Array.from(H);
    }, X = (H) => {
      const [G] = x();
      G && (H.preventDefault(), G.focus());
    }, z = (H) => {
      H.preventDefault();
      const G = x(), re = document.activeElement, me = Array.from(G).indexOf(re);
      if (me !== -1) {
        const ve = (me + 1) % G.length;
        G[ve].focus();
      }
    }, ee = (H) => {
      H.preventDefault();
      const G = x(), re = document.activeElement, me = Array.from(G).indexOf(re);
      if (me !== -1) {
        const ve = (me - 1 + G.length) % G.length;
        G[ve].focus();
      }
    }, le = (H) => {
      const G = x(), re = document.activeElement;
      Array.from(G).indexOf(re) + 1 === G.length && l.value && !H.shiftKey && q();
    }, oe = (H) => {
      var G;
      const re = document.activeElement;
      H.shiftKey && re === ((G = l.value) == null ? void 0 : G.$el) && q();
    };
    Ce(() => {
      P();
    });
    const Ie = _(() => {
      var H;
      const G = ((H = s.value) == null ? void 0 : H.length) ?? 0, re = G === 0, me = G > 1;
      return re ? "Sélectionner une option" : `${G} option${me ? "s" : ""} sélectionnée${me ? "s" : ""}`;
    }), Ee = _(() => [
      "fr-label",
      { invisible: !t.labelVisible },
      t.labelClass
    ]);
    return (H, G) => {
      var re, me;
      return i(), f("div", {
        class: O(["fr-select-group", { [`fr-select-group--${p.value}`]: d.value }])
      }, [
        c("label", {
          class: O(Ee.value),
          for: H.id
        }, [
          L(H.$slots, "label", {}, () => [
            F(h(H.label) + " ", 1),
            L(H.$slots, "required-tip", {}, () => [
              "required" in H.$attrs && H.$attrs.required !== !1 ? (i(), f("span", vd)) : y("", !0)
            ], !0)
          ], !0),
          t.hint || (me = (re = H.$slots).hint) != null && me.call(re) ? (i(), f("span", gd, [
            L(H.$slots, "hint", {}, () => [
              F(h(t.hint), 1)
            ], !0)
          ])) : y("", !0)
        ], 10, hd),
        ne(je, W({
          id: t.id,
          ref_key: "host",
          ref: l,
          type: "button"
        }, H.$attrs, {
          class: ["fr-select fr-multiselect", {
            "fr-multiselect--is-open": o.value,
            [`fr-select--${p.value}`]: d.value
          }],
          "aria-expanded": o.value,
          "aria-controls": `${t.id}-collapse`,
          onClick: Y,
          onKeydown: J(te(oe, ["shift"]), ["tab"])
        }), {
          default: U(() => [
            L(H.$slots, "button-label", {}, () => [
              F(h(t.buttonLabel || Ie.value), 1)
            ], !0)
          ]),
          _: 3
        }, 16, ["id", "aria-expanded", "aria-controls", "class", "onKeydown"]),
        T.value ? (i(), f("div", {
          key: 0,
          id: `${t.id}-collapse`,
          ref_key: "collapse",
          ref: k,
          style: De({
            "--width-host": `${u.value}px`
          }),
          class: O(["fr-multiselect__collapse fr-collapse", { "fr-collapse--expanded": R(I), "fr-collapsing": R(E) }]),
          onTransitionend: G[2] || (G[2] = (ve) => R(w)(o.value))
        }, [
          c("p", {
            id: `${H.id}-text-hint`,
            class: "fr-sr-only"
          }, " Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions ", 8, yd),
          H.selectAll ? (i(), f("ul", kd, [
            c("li", null, [
              ne(je, {
                type: "button",
                name: "select-all",
                secondary: "",
                size: "sm",
                disabled: A.value.length === 0,
                onClick: N,
                onKeydown: J(te(oe, ["shift"]), ["tab"])
              }, {
                default: U(() => [
                  c("span", {
                    class: O([
                      "fr-multiselect__search__icon",
                      B.value ? "fr-icon-close-circle-line" : "fr-icon-check-line"
                    ])
                  }, null, 2),
                  F(" " + h(t.selectAllLabel[B.value ? 1 : 0]), 1)
                ]),
                _: 1
              }, 8, ["disabled", "onKeydown"])
            ])
          ])) : y("", !0),
          t.search ? (i(), f("div", wd, [
            c("div", _d, [
              ne(Et, {
                modelValue: M.value,
                "onUpdate:modelValue": G[0] || (G[0] = (ve) => M.value = ve),
                "aria-describedby": `${t.id}-text-hint`,
                "aria-controls": `${t.id}-checkboxes`,
                "aria-live": "polite",
                placeholder: "Rechercher",
                type: "text",
                onKeydown: [
                  J(X, ["down"]),
                  J(X, ["right"]),
                  J(oe, ["tab"])
                ]
              }, null, 8, ["modelValue", "aria-describedby", "aria-controls"])
            ]),
            G[3] || (G[3] = c("div", {
              class: "fr-messages-group",
              "aria-live": "assertive"
            }, null, -1))
          ])) : y("", !0),
          ne(ca, {
            id: `${t.id}-checkboxes`,
            class: "fr-multiselect__collapse__fieldset",
            "aria-live": "polite",
            style: De({ "--maxOverflowHeight": `${t.maxOverflowHeight}` }),
            legend: t.legend,
            "legend-id": `${t.id}-checkboxes-legend`
          }, {
            default: U(() => [
              L(H.$slots, "legend", {}, void 0, !0),
              (i(!0), f(Q, null, Z(A.value, (ve) => (i(), f("div", {
                key: `${r(ve, H.id, t.idKey)}-checkbox`,
                class: "fr-fieldset__element"
              }, [
                c("div", xd, [
                  ne(Ct, {
                    id: `${r(ve, H.id, t.idKey)}-checkbox`,
                    modelValue: s.value,
                    "onUpdate:modelValue": G[1] || (G[1] = (nr) => s.value = nr),
                    value: a(ve, t.idKey),
                    name: `${r(ve, H.id, t.idKey)}-checkbox`,
                    small: "",
                    onKeydown: [
                      J(z, ["down"]),
                      J(z, ["right"]),
                      J(ee, ["up"]),
                      J(ee, ["left"]),
                      J(le, ["tab"])
                    ]
                  }, {
                    label: U(() => [
                      L(H.$slots, "checkbox-label", {
                        option: ve
                      }, () => [
                        F(h(a(ve, t.labelKey)), 1)
                      ], !0)
                    ]),
                    _: 2
                  }, 1032, ["id", "modelValue", "value", "name"])
                ])
              ]))), 128))
            ]),
            _: 3
          }, 8, ["id", "style", "legend", "legend-id"]),
          A.value.length === 0 ? (i(), f("div", Id, [
            L(H.$slots, "no-results", {}, () => [
              G[4] || (G[4] = F(" Pas de résultat "))
            ], !0)
          ])) : y("", !0)
        ], 46, bd)) : y("", !0),
        d.value ? (i(), f("p", {
          key: 1,
          id: `select-${p.value}-desc-${p.value}`,
          class: O(`fr-${p.value}-text`)
        }, h(d.value), 11, Dd)) : y("", !0)
      ], 2);
    };
  }
}), Cd = /* @__PURE__ */ we(Td, [["__scopeId", "data-v-829d79d0"]]), Ed = ["id", "aria-current"], Pd = /* @__PURE__ */ $({
  __name: "DsfrNavigationItem",
  props: {
    id: { default: () => ae("nav", "item") },
    active: { type: Boolean }
  },
  setup(n) {
    return (t, e) => (i(), f("li", {
      id: t.id,
      class: "fr-nav__item",
      "aria-current": t.active ? "page" : void 0
    }, [
      L(t.$slots, "default", {}, void 0, !0)
    ], 8, Ed));
  }
}), Ia = /* @__PURE__ */ we(Pd, [["__scopeId", "data-v-aa4076c4"]]), Md = ["href"], On = 2, Pt = /* @__PURE__ */ $({
  __name: "DsfrNavigationMenuLink",
  props: {
    id: { default: () => ae("menu-link") },
    to: { default: "#" },
    text: { default: "" },
    icon: { default: void 0 },
    onClick: { type: Function, default: () => {
    } }
  },
  emits: ["toggleId"],
  setup(n) {
    const t = n, e = _(() => typeof t.to == "string" && t.to.startsWith("http")), a = _(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), r = _(
      () => a.value || !t.icon ? void 0 : typeof t.icon == "string" ? { scale: On, name: t.icon } : { scale: On, ...t.icon || {} }
    ), l = ir() ? Qe(an) : void 0, o = (l == null ? void 0 : l()) ?? (() => {
    });
    return (s, u) => {
      const d = xe("RouterLink");
      return e.value ? (i(), f("a", {
        key: 0,
        class: "fr-nav__link",
        "data-testid": "nav-external-link",
        href: s.to,
        onClick: u[0] || (u[0] = (p) => {
          s.$emit("toggleId", s.id), s.onClick(p);
        })
      }, h(s.text), 9, Md)) : (i(), j(d, {
        key: 1,
        class: O(["fr-nav__link", {
          [String(s.icon)]: a.value
        }]),
        "data-testid": "nav-router-link",
        to: s.to,
        onClick: u[1] || (u[1] = (p) => {
          var m;
          R(o)(), s.$emit("toggleId", s.id), (m = s.onClick) == null || m.call(s, p);
        })
      }, {
        default: U(() => [
          s.icon && r.value ? (i(), j(be, Te(W({ key: 0 }, r.value)), null, 16)) : y("", !0),
          F(" " + h(s.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), Ld = { class: "fr-col-12 fr-col-lg-3" }, Bd = { class: "fr-mega-menu__category" }, Sd = { class: "fr-mega-menu__list" }, Da = /* @__PURE__ */ $({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(n) {
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
        (i(!0), f(Q, null, Z(t.links, (a, r) => (i(), f("li", {
          key: r,
          class: "fr-nav__link"
        }, [
          ne(Pt, W({ ref_for: !0 }, a), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), Ad = ["aria-expanded", "aria-current", "aria-controls"], $d = ["id"], Od = { class: "fr-container fr-container--fluid fr-container-lg" }, Rd = { class: "fr-grid-row fr-grid-row-lg--gutters" }, Fd = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, Nd = { class: "fr-mega-menu__leader" }, Vd = { class: "fr-h4 fr-mb-2v" }, qd = { class: "fr-hidden fr-displayed-lg" }, jd = /* @__PURE__ */ $({
  __name: "DsfrNavigationMegaMenu",
  props: {
    id: { default: () => ae("mega-menu") },
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
      onTransitionEnd: o
    } = Ae(), s = _(() => t.id === t.expandedId);
    return pe(s, (u, d) => {
      u !== d && l(u);
    }), ye(() => {
      s.value && l(!0);
    }), (u, d) => {
      const p = xe("RouterLink");
      return i(), f(Q, null, [
        c("button", {
          class: "fr-nav__btn",
          "aria-expanded": s.value,
          "aria-current": u.active || void 0,
          "aria-controls": u.id,
          onClick: d[0] || (d[0] = (m) => u.$emit("toggleId", u.id))
        }, h(u.title), 9, Ad),
        c("div", {
          id: u.id,
          ref_key: "collapse",
          ref: e,
          "data-testid": "mega-menu-wrapper",
          class: O(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": R(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": R(a)
          }]),
          tabindex: "-1",
          onTransitionend: d[2] || (d[2] = (m) => R(o)(s.value))
        }, [
          c("div", Od, [
            c("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: d[1] || (d[1] = (m) => u.$emit("toggleId", u.id))
            }, " Fermer "),
            c("div", Rd, [
              c("div", Fd, [
                c("div", Nd, [
                  c("h4", Vd, h(u.title), 1),
                  c("p", qd, [
                    F(h(u.description) + " ", 1),
                    L(u.$slots, "description", {}, void 0, !0)
                  ]),
                  ne(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: u.link.to
                  }, {
                    default: U(() => [
                      F(h(u.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              L(u.$slots, "default", {}, void 0, !0),
              (i(!0), f(Q, null, Z(u.menus, (m, k) => (i(), j(Da, W({
                key: k,
                ref_for: !0
              }, m), null, 16))), 128))
            ])
          ])
        ], 42, $d)
      ], 64);
    };
  }
}), Ta = /* @__PURE__ */ we(jd, [["__scopeId", "data-v-1e103394"]]), Hd = ["id", "aria-current"], Ca = /* @__PURE__ */ $({
  __name: "DsfrNavigationMenuItem",
  props: {
    id: { default: () => ae("menu", "item") },
    active: { type: Boolean }
  },
  setup(n) {
    return (t, e) => (i(), f("li", {
      id: t.id,
      class: "fr-menu__item",
      "aria-current": t.active ? "page" : void 0
    }, [
      L(t.$slots, "default")
    ], 8, Hd));
  }
}), Wd = ["aria-expanded", "aria-current", "aria-controls"], Kd = ["id"], Qd = { class: "fr-menu__list" }, Ea = /* @__PURE__ */ $({
  __name: "DsfrNavigationMenu",
  props: {
    id: { default: () => ae("menu") },
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
      onTransitionEnd: o
    } = Ae(), s = _(() => t.id === t.expandedId);
    return pe(s, (u, d) => {
      u !== d && l(u);
    }), ye(() => {
      s.value && l(!0);
    }), (u, d) => (i(), f(Q, null, [
      c("button", {
        class: "fr-nav__btn",
        "aria-expanded": s.value,
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
        class: O(["fr-collapse fr-menu", { "fr-collapse--expanded": R(r), "fr-collapsing": R(a) }]),
        "data-testid": "navigation-menu",
        onTransitionend: d[2] || (d[2] = (p) => R(o)(s.value))
      }, [
        c("ul", Qd, [
          L(u.$slots, "default"),
          (i(!0), f(Q, null, Z(u.links, (p, m) => (i(), j(Ca, { key: m }, {
            default: U(() => [
              ne(Pt, W({ ref_for: !0 }, p, {
                onToggleId: d[1] || (d[1] = (k) => u.$emit("toggleId", u.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, Kd)
    ], 64));
  }
}), Yd = ["id", "aria-label"], zd = { class: "fr-nav__list" }, Gd = /* @__PURE__ */ $({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => ae("nav") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(n) {
    const t = n, e = K(void 0), a = (s) => {
      if (s === e.value) {
        e.value = void 0;
        return;
      }
      e.value = s;
    }, r = (s) => {
      if (s !== document.getElementById(t.id)) {
        if (!(s != null && s.parentNode)) {
          a(e.value);
          return;
        }
        r(s.parentNode);
      }
    }, l = (s) => {
      r(s.target);
    }, o = (s) => {
      s.key === "Escape" && a(e.value);
    };
    return ye(() => {
      document.addEventListener("click", l), document.addEventListener("keydown", o);
    }), Ce(() => {
      document.removeEventListener("click", l), document.removeEventListener("keydown", o);
    }), (s, u) => (i(), f("nav", {
      id: s.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": s.label
    }, [
      c("ul", zd, [
        L(s.$slots, "default"),
        (i(!0), f(Q, null, Z(s.navItems, (d, p) => (i(), j(Ia, {
          id: d.id,
          key: p
        }, {
          default: U(() => [
            d.to && d.text ? (i(), j(Pt, W({
              key: 0,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[0] || (u[0] = (m) => a(m))
            }), null, 16, ["expanded-id"])) : d.title && d.links ? (i(), j(Ea, W({
              key: 1,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[1] || (u[1] = (m) => a(m))
            }), null, 16, ["expanded-id"])) : d.title && d.menus ? (i(), j(Ta, W({
              key: 2,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[2] || (u[2] = (m) => a(m))
            }), null, 16, ["expanded-id"])) : y("", !0)
          ]),
          _: 2
        }, 1032, ["id"]))), 128))
      ])
    ], 8, Yd));
  }
}), Xd = { class: "fr-container" }, Ud = { class: "fr-notice__body" }, Zd = { class: "fr-notice__title" }, Jd = { class: "fr-notice__desc" }, ec = /* @__PURE__ */ $({
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
      class: O(["fr-notice", `fr-notice--${t.type}`])
    }, [
      c("div", Xd, [
        c("div", Ud, [
          c("p", null, [
            c("span", Zd, [
              L(t.$slots, "default", {}, () => [
                F(h(t.title), 1)
              ])
            ]),
            c("span", Jd, [
              L(t.$slots, "desc", {}, () => [
                F(h(t.desc), 1)
              ])
            ])
          ]),
          t.closeable ? (i(), f("button", {
            key: 0,
            class: "fr-btn--close fr-btn",
            title: "Masquer le message",
            onClick: e[0] || (e[0] = (a) => t.$emit("close"))
          }, " Masquer le message ")) : y("", !0)
        ])
      ])
    ], 2));
  }
}), tc = ["aria-label"], nc = { class: "fr-content-media__img" }, ac = ["src", "alt", "title", "ratio"], rc = { class: "fr-content-media__caption" }, lc = /* @__PURE__ */ $({
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
      class: O(["fr-content-media", {
        "fr-content-media--sm": t.size === "small",
        "fr-content-media--lg": t.size === "large"
      }]),
      role: "group",
      "aria-label": t.legend
    }, [
      c("div", nc, [
        L(t.$slots, "default", {}, () => [
          t.src ? (i(), f("img", {
            key: 0,
            src: t.src,
            class: O(["fr-responsive-img", `fr-ratio-${t.ratio}`]),
            alt: t.alt,
            title: t.title,
            ratio: t.ratio
          }, null, 10, ac)) : y("", !0)
        ])
      ]),
      c("figcaption", rc, h(t.legend), 1)
    ], 10, tc));
  }
}), oc = { class: "fr-quote fr-quote--column" }, sc = ["cite"], ic = { class: "fr-quote__author" }, uc = { class: "fr-quote__source" }, dc = ["href"], cc = {
  key: 0,
  class: "fr-quote__image"
}, fc = ["src"], pc = /* @__PURE__ */ $({
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
    return (t, e) => (i(), f("figure", oc, [
      t.source ? (i(), f("blockquote", {
        key: 0,
        cite: t.sourceUrl
      }, [
        c("p", null, "« " + h(t.quote) + " »", 1)
      ], 8, sc)) : y("", !0),
      c("figcaption", null, [
        c("p", ic, h(t.author), 1),
        c("ul", uc, [
          c("li", null, [
            c("cite", null, h(t.source), 1)
          ]),
          (i(!0), f(Q, null, Z(t.details, (a, r) => (i(), f("li", { key: r }, [
            typeof a == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: a.url
            }, h(a.label), 9, dc)) : (i(), f(Q, { key: 1 }, [
              F(h(a), 1)
            ], 64))
          ]))), 128))
        ]),
        t.quoteImage ? (i(), f("div", cc, [
          c("img", {
            src: t.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, fc)
        ])) : y("", !0)
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
}, yc = ["src", "title"], kc = { key: 0 }, wc = ["href"], _c = ["href"], xc = ["href"], Pa = /* @__PURE__ */ $({
  __name: "DsfrRadioButton",
  props: {
    id: { default: () => ae("basic", "radio") },
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
    const t = n, e = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, a = _(() => !!t.img || !!t.svgPath);
    return (r, l) => (i(), f("div", {
      class: O(["fr-fieldset__element", { "fr-fieldset__element--inline": r.inline }])
    }, [
      c("div", {
        class: O(["fr-radio-group", {
          "fr-radio-rich": a.value,
          "fr-radio-group--sm": r.small
        }])
      }, [
        c("input", W({
          id: r.id,
          type: "radio",
          name: r.name,
          value: r.value,
          checked: r.modelValue === r.value,
          disabled: r.disabled
        }, r.$attrs, {
          onClick: l[0] || (l[0] = (o) => r.$emit("update:modelValue", r.value))
        }), null, 16, mc),
        c("label", {
          for: r.id,
          class: "fr-label"
        }, [
          L(r.$slots, "label", {}, () => [
            F(h(r.label) + " ", 1),
            L(r.$slots, "required-tip", {}, () => [
              r.$attrs.required ? (i(), f("span", vc, " *")) : y("", !0)
            ])
          ]),
          r.hint ? (i(), f("span", gc, h(r.hint), 1)) : y("", !0)
        ], 8, hc),
        r.img || r.svgPath ? (i(), f("div", bc, [
          r.img ? (i(), f("img", {
            key: 0,
            src: r.img,
            class: "fr-artwork",
            alt: "",
            title: r.imgTitle
          }, null, 8, yc)) : (i(), f("svg", W({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...e, ...r.svgAttrs }), [
            r.imgTitle ? (i(), f("title", kc, h(r.imgTitle), 1)) : y("", !0),
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
        ])) : y("", !0)
      ], 2)
    ], 2));
  }
}), Ic = { class: "fr-form-group" }, Dc = ["disabled", "aria-labelledby", "aria-invalid", "role"], Tc = ["id"], Cc = {
  key: 0,
  class: "fr-hint-text"
}, Ec = {
  key: 0,
  class: "required"
}, Pc = ["id"], Mc = /* @__PURE__ */ $({
  __name: "DsfrRadioButtonSet",
  props: {
    titleId: { default: () => ae("radio-button", "group") },
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
    const e = n, a = t, r = _(() => e.errorMessage || e.validMessage), l = _(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), o = (u) => {
      u !== e.modelValue && a("update:modelValue", u);
    }, s = _(() => r.value ? `${e.titleId} messages-${e.titleId}` : e.titleId);
    return (u, d) => (i(), f("div", Ic, [
      c("fieldset", {
        class: O(["fr-fieldset", {
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
          L(u.$slots, "legend", {}, () => [
            F(h(u.legend) + " ", 1),
            u.hint || u.$slots.hint ? (i(), f("span", Cc, [
              L(u.$slots, "hint", {}, () => [
                F(h(u.hint), 1)
              ])
            ])) : y("", !0),
            L(u.$slots, "required-tip", {}, () => [
              u.required ? (i(), f("span", Ec, " *")) : y("", !0)
            ])
          ])
        ], 8, Tc)) : y("", !0),
        L(u.$slots, "default", {}, () => [
          (i(!0), f(Q, null, Z(u.options, (p, m) => (i(), j(Pa, W({
            key: typeof p.value == "boolean" ? m : p.value || m,
            name: u.name,
            "aria-disabled": p.disabled,
            ref_for: !0
          }, p, {
            small: u.small,
            inline: u.inline,
            "model-value": u.modelValue,
            "onUpdate:modelValue": d[0] || (d[0] = (k) => o(k))
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
            class: O(["fr-message fr-message--info flex items-center", l.value])
          }, h(r.value), 3)
        ], 8, Pc)) : y("", !0)
      ], 10, Dc)
    ]));
  }
}), Lc = ["id"], Bc = ["id"], Sc = { class: "fr-hint-text" }, Ac = ["data-fr-prefix", "data-fr-suffix"], $c = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Oc = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Rc = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Fc = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Nc = ["id"], Vc = ["id"], qc = /* @__PURE__ */ $({
  __name: "DsfrRange",
  props: {
    id: { default: () => ae("range") },
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
    const e = n, a = t, r = K(), l = K(), o = K(), s = _(() => e.lowerValue !== void 0), u = _(() => e.lowerValue === void 0 ? `transform: translateX(${(e.modelValue - e.min) / (e.max - e.min) * o.value}px) translateX(-${e.modelValue}%);` : `transform: translateX(${(e.modelValue + e.lowerValue - e.min) / 2 / (e.max - e.min) * o.value}px) translateX(-${e.lowerValue + (e.modelValue - e.lowerValue) / 2}%);`), d = _(() => {
      const m = (e.modelValue - e.min) / (e.max - e.min) * o.value - (s.value ? 12 : 0), k = ((e.lowerValue ?? 0) - e.min) / (e.max - e.min) * o.value;
      return {
        "--progress-right": `${m + 24}px`,
        ...s.value ? { "--progress-left": `${k + 12}px` } : {}
      };
    });
    pe([() => e.modelValue, () => e.lowerValue], ([m, k]) => {
      k !== void 0 && (s.value && m < k && a("update:lowerValue", m), s.value && k > m && a("update:modelValue", k));
    });
    const p = _(() => (e.prefix ?? "").concat(s.value ? `${e.lowerValue} - ` : "").concat(`${e.modelValue}`).concat(e.suffix ?? ""));
    return ye(() => {
      var m;
      o.value = (m = r.value) == null ? void 0 : m.offsetWidth;
    }), (m, k) => (i(), f("div", {
      id: `${m.id}-group`,
      class: O(["fr-range-group", { "fr-range-group--error": m.message }])
    }, [
      c("label", {
        id: `${m.id}-label`,
        class: "fr-label"
      }, [
        L(m.$slots, "label", {}, () => [
          F(h(m.label), 1)
        ]),
        c("span", Sc, [
          L(m.$slots, "hint", {}, () => [
            F(h(m.hint), 1)
          ])
        ])
      ], 8, Bc),
      c("div", {
        class: O(["fr-range", {
          "fr-range--sm": m.small,
          "fr-range--double": s.value,
          "fr-range-group--disabled": m.disabled
        }]),
        "data-fr-js-range": "true",
        "data-fr-prefix": m.prefix ?? void 0,
        "data-fr-suffix": m.suffix ?? void 0,
        style: De(d.value)
      }, [
        c("span", {
          ref_key: "output",
          ref: l,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: De(u.value)
        }, h(p.value), 5),
        s.value ? (i(), f("input", {
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
          onInput: k[0] || (k[0] = (E) => {
            var I;
            return a("update:lowerValue", +((I = E.target) == null ? void 0 : I.value));
          })
        }, null, 40, $c)) : y("", !0),
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
          onInput: k[1] || (k[1] = (E) => {
            var I;
            return a("update:modelValue", +((I = E.target) == null ? void 0 : I.value));
          })
        }, null, 40, Oc),
        m.hideIndicators ? y("", !0) : (i(), f("span", Rc, h(m.min), 1)),
        m.hideIndicators ? y("", !0) : (i(), f("span", Fc, h(m.max), 1))
      ], 14, Ac),
      m.message || m.$slots.messages ? (i(), f("div", {
        key: 0,
        id: `${m.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        L(m.$slots, "messages", {}, () => [
          m.message ? (i(), f("p", {
            key: 0,
            id: `${m.id}-message-error`,
            class: "fr-message fr-message--error"
          }, h(m.message), 9, Vc)) : y("", !0)
        ])
      ], 8, Nc)) : y("", !0)
    ], 10, Lc));
  }
}), jc = { class: "fr-segmented__element" }, Hc = ["id", "name", "value", "checked", "disabled", "aria-disabled"], Wc = ["for"], Kc = { key: 1 }, Ma = /* @__PURE__ */ $({
  __name: "DsfrSegmented",
  props: {
    id: { default: () => ae("segmented") },
    name: { default: void 0 },
    modelValue: { default: "" },
    value: {},
    label: { default: "" },
    disabled: { type: Boolean },
    icon: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(n) {
    const t = n, e = _(() => typeof t.icon == "string" ? { name: t.icon } : t.icon), a = _(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : "");
    return (r, l) => (i(), f("div", jc, [
      c("input", W({
        id: r.id,
        type: "radio",
        name: r.name,
        value: r.value,
        checked: r.modelValue === r.value,
        disabled: r.disabled,
        "aria-disabled": r.disabled
      }, r.$attrs, {
        onClick: l[0] || (l[0] = (o) => r.$emit("update:modelValue", r.value))
      }), null, 16, Hc),
      c("label", {
        for: r.id,
        class: O(["fr-label", { [a.value]: a.value }])
      }, [
        r.icon && !a.value ? (i(), j(be, Te(W({ key: 0 }, e.value)), null, 16)) : y("", !0),
        r.icon ? (i(), f("span", Kc, " ")) : y("", !0),
        F(" " + h(r.label), 1)
      ], 10, Wc)
    ]));
  }
}), Qc = { class: "fr-form-group" }, Yc = ["disabled"], zc = ["id"], Gc = {
  key: 0,
  class: "fr-hint-text"
}, Xc = { class: "fr-segmented__elements" }, Uc = /* @__PURE__ */ $({
  __name: "DsfrSegmentedSet",
  props: {
    titleId: { default: () => ae("segmented-button", "set") },
    disabled: { type: Boolean },
    small: { type: Boolean },
    inline: { type: Boolean },
    name: { default: () => ae("segmented-button", "set") },
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
    return (l, o) => (i(), f("div", Qc, [
      c("fieldset", {
        class: O(["fr-segmented", {
          "fr-segmented--sm": l.small,
          "fr-segmented--no-legend": !l.legend
        }]),
        disabled: l.disabled
      }, [
        l.legend ? (i(), f("legend", {
          key: 0,
          id: l.titleId,
          class: O(["fr-segmented__legend", {
            "fr-segmented__legend--inline": l.inline
          }])
        }, [
          L(l.$slots, "legend", {}, () => [
            F(h(l.legend), 1)
          ]),
          l.hint ? (i(), f("span", Gc, h(l.hint), 1)) : y("", !0)
        ], 10, zc)) : y("", !0),
        c("div", Xc, [
          L(l.$slots, "default", {}, () => [
            (i(!0), f(Q, null, Z(l.options, (s, u) => (i(), j(Ma, W({
              key: s.value || u,
              name: l.name || s.name,
              ref_for: !0
            }, { ...s, disabled: l.disabled || s.disabled }, {
              "model-value": l.modelValue,
              "onUpdate:modelValue": o[0] || (o[0] = (d) => r(d))
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
}, tf = ["id", "name", "disabled", "aria-disabled", "required"], nf = ["selected"], af = ["selected", "value", "disabled", "aria-disabled"], rf = ["id"], lf = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "DsfrSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => ae("select") },
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
    const e = _(() => t.errorMessage || t.successMessage), a = _(() => t.errorMessage ? "error" : "valid");
    return (r, l) => (i(), f("div", {
      class: O(["fr-select-group", { [`fr-select-group--${a.value}`]: e.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: r.selectId
      }, [
        L(r.$slots, "label", {}, () => [
          F(h(r.label) + " ", 1),
          L(r.$slots, "required-tip", {}, () => [
            r.required ? (i(), f("span", Jc, " *")) : y("", !0)
          ])
        ]),
        r.hint ?? r.description ? (i(), f("span", ef, h(r.hint ?? r.description), 1)) : y("", !0)
      ], 8, Zc),
      c("select", W({
        id: r.selectId,
        class: [{ [`fr-select--${a.value}`]: e.value }, "fr-select"],
        name: r.name || r.selectId,
        disabled: r.disabled,
        "aria-disabled": r.disabled,
        required: r.required
      }, r.$attrs, {
        onChange: l[0] || (l[0] = (o) => {
          var s;
          return r.$emit("update:modelValue", (s = o.target) == null ? void 0 : s.value);
        })
      }), [
        c("option", {
          selected: !r.options.some((o) => typeof o != "object" || o === null ? o === r.modelValue : o.value === r.modelValue),
          disabled: "",
          hidden: ""
        }, h(r.defaultUnselectedText), 9, nf),
        (i(!0), f(Q, null, Z(r.options, (o, s) => (i(), f("option", {
          key: s,
          selected: r.modelValue === o || typeof o == "object" && o.value === r.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, h(typeof o == "object" ? o.text : o), 9, af))), 128))
      ], 16, tf),
      e.value ? (i(), f("p", {
        key: 0,
        id: `select-${a.value}-desc-${a.value}`,
        class: O(`fr-${a.value}-text`)
      }, h(e.value), 11, rf)) : y("", !0)
    ], 2));
  }
}), of = { class: "fr-share" }, sf = { class: "fr-share__title" }, uf = { class: "fr-btns-group" }, df = ["title", "href", "onClick"], cf = { key: 0 }, ff = ["href", "title"], pf = ["title"], mf = /* @__PURE__ */ $({
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
      return i(), f("div", of, [
        c("p", sf, h(a.title), 1),
        c("ul", uf, [
          (i(!0), f(Q, null, Z(a.networks, (o, s) => (i(), f("li", { key: s }, [
            c("a", {
              class: O(`fr-btn fr-btn--${o.name}`),
              title: `${o.label} - nouvelle fenêtre`,
              href: o.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: te((u) => e(o), ["prevent"])
            }, h(o.label), 11, df)
          ]))), 128)),
          (l = a.mail) != null && l.to ? (i(), f("li", cf, [
            c("a", {
              class: "fr-btn fr-btn--mail",
              href: a.mail.to,
              title: a.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, h(a.mail.label), 9, ff)
          ])) : y("", !0),
          c("li", null, [
            c("button", {
              class: "fr-btn fr-btn--copy",
              title: a.copyLabel,
              onClick: r[0] || (r[0] = (o) => t())
            }, h(a.copyLabel), 9, pf)
          ])
        ])
      ]);
    };
  }
}), hf = ["aria-current", "aria-expanded", "aria-controls"], La = /* @__PURE__ */ $({
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
      L(t.$slots, "default")
    ], 8, hf));
  }
}), Ba = /* @__PURE__ */ $({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(n) {
    return (t, e) => (i(), f("li", {
      class: O(["fr-sidemenu__item", { "fr-sidemenu__item--active": t.active }])
    }, [
      L(t.$slots, "default")
    ], 2));
  }
}), vf = ["id"], gf = { class: "fr-sidemenu__list" }, Sa = /* @__PURE__ */ $({
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
      onTransitionEnd: o
    } = Ae();
    pe(() => t.expanded, (p, m) => {
      p !== m && l(p);
    }), ye(() => {
      t.expanded && l(!0);
    });
    const s = (p) => typeof p == "string" && p.startsWith("http"), u = (p) => s(p) ? "a" : "RouterLink", d = (p) => ({ [s(p) ? "href" : "to"]: p });
    return (p, m) => {
      const k = xe("DsfrSideMenuList", !0);
      return i(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: e,
        class: O({
          "fr-collapse": p.collapsable,
          "fr-collapsing": R(a),
          "fr-collapse--expanded": R(r)
        }),
        onTransitionend: m[2] || (m[2] = (E) => R(o)(!!p.expanded, p.focusOnExpanding))
      }, [
        c("ul", gf, [
          L(p.$slots, "default"),
          (i(!0), f(Q, null, Z(p.menuItems, (E, I) => (i(), j(Ba, {
            key: I,
            active: E.active
          }, {
            default: U(() => [
              E.menuItems ? y("", !0) : (i(), j(ge(u(E.to)), W({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": E.active ? "page" : void 0,
                ref_for: !0
              }, d(E.to)), {
                default: U(() => [
                  F(h(E.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              E.menuItems ? (i(), f(Q, { key: 1 }, [
                ne(La, {
                  active: !!E.active,
                  expanded: !!E.expanded,
                  "control-id": E.id,
                  onToggleExpand: m[0] || (m[0] = (S) => p.$emit("toggleExpand", S))
                }, {
                  default: U(() => [
                    F(h(E.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                E.menuItems ? (i(), j(k, {
                  key: 0,
                  id: E.id,
                  collapsable: "",
                  expanded: E.expanded,
                  "menu-items": E.menuItems,
                  onToggleExpand: m[1] || (m[1] = (S) => p.$emit("toggleExpand", S))
                }, null, 8, ["id", "expanded", "menu-items"])) : y("", !0)
              ], 64)) : y("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, vf);
    };
  }
}), bf = ["aria-labelledby"], yf = { class: "fr-sidemenu__inner" }, kf = ["aria-controls", "aria-expanded"], wf = ["id"], _f = /* @__PURE__ */ $({
  __name: "DsfrSideMenu",
  props: {
    buttonLabel: { default: "Dans cette rubrique" },
    id: { default: () => ae("sidemenu") },
    sideMenuListId: { default: () => ae("sidemenu", "list") },
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
    } = Ae(), o = K(!1);
    return pe(o, (s, u) => {
      s !== u && r(s);
    }), (s, u) => (i(), f("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": s.id
    }, [
      c("div", yf, [
        c("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": s.id,
          "aria-expanded": o.value,
          onClick: u[0] || (u[0] = te((d) => o.value = !o.value, ["prevent", "stop"]))
        }, h(s.buttonLabel), 9, kf),
        c("div", {
          id: s.id,
          ref_key: "collapse",
          ref: t,
          class: O(["fr-collapse", {
            "fr-collapse--expanded": R(a),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": R(e)
          }]),
          onTransitionend: u[2] || (u[2] = (d) => R(l)(o.value, s.focusOnExpanding))
        }, [
          (i(), j(ge(s.titleTag), { class: "fr-sidemenu__title" }, {
            default: U(() => [
              F(h(s.headingTitle), 1)
            ]),
            _: 1
          })),
          L(s.$slots, "default", {}, () => [
            ne(Sa, {
              id: s.sideMenuListId,
              "menu-items": s.menuItems,
              onToggleExpand: u[1] || (u[1] = (d) => s.$emit("toggleExpand", d))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, wf)
      ])
    ], 8, bf));
  }
}), xf = /* @__PURE__ */ $({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(n) {
    const t = n, e = _(() => typeof t.to == "string" && t.to.startsWith("http")), a = _(() => e.value ? "a" : "RouterLink"), r = _(() => ({ [e.value ? "href" : "to"]: t.to }));
    return (l, o) => (i(), j(ge(a.value), W({
      "aria-current": l.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, r.value), {
      default: U(() => [
        L(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), If = { class: "fr-skiplinks" }, Df = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, Tf = { class: "fr-skiplinks__list" }, Cf = ["href", "onClick"], Ef = /* @__PURE__ */ $({
  __name: "DsfrSkipLinks",
  props: {
    links: {}
  },
  setup(n) {
    const t = (e) => {
      const a = document.getElementById(e);
      a == null || a.focus();
    };
    return (e, a) => (i(), f("div", If, [
      c("nav", Df, [
        c("ul", Tf, [
          (i(!0), f(Q, null, Z(e.links, (r) => (i(), f("li", {
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
}), Pf = { class: "fr-stepper" }, Mf = { class: "fr-stepper__title" }, Lf = { class: "fr-stepper__state" }, Bf = ["data-fr-current-step", "data-fr-steps"], Sf = { class: "fr-stepper__details" }, Af = {
  key: 0,
  class: "fr-text--bold"
}, $f = /* @__PURE__ */ $({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(n) {
    return (t, e) => (i(), f("div", Pf, [
      c("h2", Mf, [
        F(h(t.steps[t.currentStep - 1]) + " ", 1),
        c("span", Lf, "Étape " + h(t.currentStep) + " sur " + h(t.steps.length), 1)
      ]),
      c("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": t.currentStep,
        "data-fr-steps": t.steps.length
      }, null, 8, Bf),
      c("p", Sf, [
        t.currentStep < t.steps.length ? (i(), f("span", Af, "Étape suivante :")) : y("", !0),
        F(" " + h(t.steps[t.currentStep]), 1)
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
}, Ff = { class: "fr-summary__list" }, Nf = ["href"], Vf = /* @__PURE__ */ $({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(n) {
    return (t, e) => (i(), f("nav", Of, [
      c("h2", Rf, h(t.title), 1),
      c("ol", Ff, [
        (i(!0), f(Q, null, Z(t.anchors, (a, r) => (i(), f("li", { key: r }, [
          c("a", {
            class: "fr-summary__link",
            href: a.link
          }, h(a.name), 9, Nf)
        ]))), 128))
      ])
    ]));
  }
}), qf = ["id", "aria-labelledby", "tabindex"], jf = /* @__PURE__ */ $({
  __name: "DsfrTabContent",
  props: {
    panelId: {},
    tabId: {}
  },
  setup(n) {
    kt((u) => ({
      "7152af7e": o.value,
      "2a62e962": s.value
    }));
    const t = n, e = { true: "100%", false: "-100%" }, a = Qe(Dt), { isVisible: r, asc: l } = a(ot(() => t.tabId)), o = _(() => e[String(l == null ? void 0 : l.value)]), s = _(() => e[String(!(l != null && l.value))]);
    return (u, d) => (i(), j(pr, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: U(() => [
        Se(c("div", {
          id: u.panelId,
          class: O(["fr-tabs__panel", {
            "fr-tabs__panel--selected": R(r)
          }]),
          role: "tabpanel",
          "aria-labelledby": u.tabId,
          tabindex: R(r) ? 0 : -1
        }, [
          L(u.$slots, "default", {}, void 0, !0)
        ], 10, qf), [
          [mr, R(r)]
        ])
      ]),
      _: 3
    }));
  }
}), Aa = /* @__PURE__ */ we(jf, [["__scopeId", "data-v-5774b16c"]]), Hf = { role: "presentation" }, Wf = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], Kf = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, $a = /* @__PURE__ */ $({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(n, { emit: t }) {
    const e = n, a = t, r = K(null), l = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      Home: "first",
      End: "last"
    };
    function o(p) {
      const m = p == null ? void 0 : p.key, k = l[m];
      k && a(k);
    }
    const s = Qe(Dt), { isVisible: u } = s(ot(() => e.tabId)), d = ur("button");
    return pe(u, () => {
      var p;
      u.value && ((p = d.value) == null || p.focus());
    }), (p, m) => (i(), f("li", Hf, [
      c("button", {
        id: p.tabId,
        ref_key: "button",
        ref: r,
        "data-testid": `test-${p.tabId}`,
        class: "fr-tabs__tab",
        tabindex: R(u) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": R(u),
        "aria-controls": p.panelId,
        onClick: m[0] || (m[0] = te((k) => p.$emit("click", p.tabId), ["prevent"])),
        onKeydown: m[1] || (m[1] = (k) => o(k))
      }, [
        p.icon ? (i(), f("span", Kf, [
          ne(be, { name: p.icon }, null, 8, ["name"])
        ])) : y("", !0),
        L(p.$slots, "default")
      ], 40, Wf)
    ]));
  }
}), Oa = /* @__PURE__ */ $({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(n) {
    const t = n, e = _(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), a = _(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("th", W(r.headerAttrs, { scope: "col" }), [
      F(h(r.header) + " ", 1),
      r.icon && !e.value ? (i(), j(be, Te(W({ key: 0 }, a.value)), null, 16)) : y("", !0),
      e.value ? (i(), f("span", {
        key: 1,
        class: O({ [String(r.icon)]: e.value })
      }, null, 2)) : y("", !0)
    ], 16));
  }
}), Qf = { key: 0 }, Ra = /* @__PURE__ */ $({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(n) {
    return (t, e) => t.headers ? (i(), f("tr", Qf, [
      (i(!0), f(Q, null, Z(t.headers, (a, r) => (i(), j(Oa, {
        key: r,
        header: (typeof a == "object" ? a : {}).text || a,
        "header-attrs": a.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : y("", !0);
  }
}), Fa = /* @__PURE__ */ $({
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
    const t = n, e = _(() => typeof t.field == "object" && t.field !== null && t.field.component ? t.field.component : !1), a = _(() => ["string", "number", "boolean"].includes(typeof t.field));
    return (r, l) => (i(), f("td", Te(wt(r.cellAttrs)), [
      e.value ? (i(), j(ge(e.value), Te(W({ key: 0 }, typeof r.field == "object" ? r.field : {})), {
        default: U(() => [
          F(h(r.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f(Q, { key: 1 }, [
        F(h(a.value ? r.field : r.field.text), 1)
      ], 64))
    ], 16));
  }
}), Na = /* @__PURE__ */ $({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(n) {
    return (t, e) => (i(), f("tr", Te(wt(t.rowAttrs)), [
      L(t.$slots, "default"),
      (i(!0), f(Q, null, Z(t.rowData, (a, r) => (i(), j(Fa, {
        key: r,
        field: a ?? "",
        "cell-attrs": typeof a == "object" && a !== null && !a.component ? a.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), Yf = { class: "caption" }, zf = { key: 1 }, Gf = ["colspan"], Xf = { class: "flex justify-right" }, Uf = { class: "self-center" }, Zf = ["for"], Jf = ["id"], ep = ["value"], tp = {
  class: "flex ml-1",
  "aria-live": "polite",
  "aria-atomic": "true"
}, np = { class: "self-center fr-m-0" }, ap = { class: "flex ml-1" }, rp = /* @__PURE__ */ $({
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
    const e = n, a = t, r = (x) => Array.isArray(x) ? x : x.rowData, l = K(e.currentPage), o = ae("resultPerPage"), s = K(e.resultsDisplayed), u = _(
      () => e.rows.length > s.value ? Math.ceil(e.rows.length / s.value) : 1
    ), d = [5, 10, 25, 50, 100], p = () => l.value * s.value - s.value, m = () => l.value * s.value, k = _(() => e.pagination ? e.rows.slice(p(), m()) : e.rows), E = () => {
      l.value = 1, a("update:currentPage");
    }, I = () => {
      l.value > 1 && (l.value -= 1, a("update:currentPage"));
    }, S = () => {
      l.value < u.value && (l.value += 1, a("update:currentPage"));
    }, w = () => {
      l.value = u.value, a("update:currentPage");
    };
    return (x, T) => (i(), f("div", {
      class: O(["fr-table", { "fr-table--no-caption": x.noCaption }])
    }, [
      c("table", null, [
        c("caption", Yf, h(x.title), 1),
        c("thead", null, [
          L(x.$slots, "header", {}, () => [
            x.headers && x.headers.length ? (i(), j(Ra, {
              key: 0,
              headers: x.headers
            }, null, 8, ["headers"])) : y("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          L(x.$slots, "default", {}, void 0, !0),
          x.rows && x.rows.length ? (i(!0), f(Q, { key: 0 }, Z(k.value, (M, D) => (i(), j(Na, {
            key: x.rowKey && r(M) ? typeof x.rowKey == "string" ? r(M)[x.headers.indexOf(x.rowKey)].toString() : x.rowKey(r(M)) : D,
            "row-data": r(M),
            "row-attrs": "rowAttrs" in M ? M.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : y("", !0),
          x.pagination ? (i(), f("tr", zf, [
            c("td", {
              colspan: x.headers.length
            }, [
              c("div", Xf, [
                c("div", Uf, [
                  c("label", { for: R(o) }, "Résultats par page : ", 8, Zf),
                  Se(c("select", {
                    id: R(o),
                    "onUpdate:modelValue": T[0] || (T[0] = (M) => s.value = M),
                    title: "Résultats par page - le nombre résultats est mis à jour dès sélection d’une valeur",
                    onChange: T[1] || (T[1] = (M) => a("update:currentPage"))
                  }, [
                    (i(), f(Q, null, Z(d, (M, D) => c("option", {
                      key: D,
                      value: M
                    }, h(M), 9, ep)), 64))
                  ], 40, Jf), [
                    [Gt, s.value]
                  ])
                ]),
                c("div", tp, [
                  c("p", np, " Page " + h(l.value) + " sur " + h(u.value), 1)
                ]),
                c("div", ap, [
                  c("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: T[2] || (T[2] = (M) => E())
                  }, T[6] || (T[6] = [
                    c("span", { class: "fr-sr-only" }, "Première page du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: T[3] || (T[3] = (M) => I())
                  }, T[7] || (T[7] = [
                    c("span", { class: "fr-sr-only" }, "Page précédente du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: T[4] || (T[4] = (M) => S())
                  }, T[8] || (T[8] = [
                    c("span", { class: "fr-sr-only" }, "Page suivante du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: T[5] || (T[5] = (M) => w())
                  }, T[9] || (T[9] = [
                    c("span", { class: "fr-sr-only" }, "Dernière page du tableau", -1)
                  ]))
                ])
              ])
            ], 8, Gf)
          ])) : y("", !0)
        ])
      ])
    ], 2));
  }
}), lp = /* @__PURE__ */ we(rp, [["__scopeId", "data-v-129bf2b7"]]), op = ["aria-label"], sp = /* @__PURE__ */ $({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(n, { expose: t, emit: e }) {
    const a = n, r = e, l = K(!1), o = _({
      get: () => a.modelValue,
      set(D) {
        r("update:modelValue", D);
      }
    }), s = K(/* @__PURE__ */ new Map()), u = K(0);
    Oe(Dt, (D) => {
      const b = K(!0);
      if (pe(o, (C, q) => {
        b.value = C > q;
      }), [...s.value.values()].includes(D.value))
        return { isVisible: _(() => s.value.get(o.value) === D.value), asc: b };
      const v = u.value++;
      s.value.set(v, D.value);
      const g = _(() => v === o.value);
      return pe(D, () => {
        s.value.set(v, D.value);
      }), Ce(() => {
        s.value.delete(v);
      }), { isVisible: g };
    });
    const d = K(null), p = K(null), m = dr({}), k = (D) => {
      if (m[D])
        return m[D];
      const b = ae("tab");
      return m[D] = b, b;
    }, E = async () => {
      const D = o.value === 0 ? a.tabTitles.length - 1 : o.value - 1;
      l.value = !1, o.value = D;
    }, I = async () => {
      const D = o.value === a.tabTitles.length - 1 ? 0 : o.value + 1;
      l.value = !0, o.value = D;
    }, S = async () => {
      o.value = 0;
    }, w = async () => {
      o.value = a.tabTitles.length - 1;
    }, x = K({ "--tabs-height": "100px" }), T = () => {
      var D;
      if (o.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const b = p.value.offsetHeight, v = (D = d.value) == null ? void 0 : D.querySelectorAll(".fr-tabs__panel")[o.value];
      if (!v || !v.offsetHeight)
        return;
      const g = v.offsetHeight;
      x.value["--tabs-height"] = `${b + g}px`;
    }, M = K(null);
    return ye(() => {
      var D;
      window.ResizeObserver && (M.value = new window.ResizeObserver(() => {
        T();
      })), (D = d.value) == null || D.querySelectorAll(".fr-tabs__panel").forEach((b) => {
        var v;
        b && ((v = M.value) == null || v.observe(b));
      });
    }), Ce(() => {
      var D;
      (D = d.value) == null || D.querySelectorAll(".fr-tabs__panel").forEach((b) => {
        var v;
        b && ((v = M.value) == null || v.unobserve(b));
      });
    }), t({
      renderTabs: T,
      selectFirst: S,
      selectLast: w
    }), (D, b) => (i(), f("div", {
      ref_key: "$el",
      ref: d,
      class: "fr-tabs",
      style: De(x.value)
    }, [
      c("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": D.tabListName
      }, [
        L(D.$slots, "tab-items", {}, () => [
          (i(!0), f(Q, null, Z(D.tabTitles, (v, g) => (i(), j($a, {
            key: g,
            icon: v.icon,
            "panel-id": v.panelId || `${k(g)}-panel`,
            "tab-id": v.tabId || k(g),
            onClick: (C) => o.value = g,
            onNext: b[0] || (b[0] = (C) => I()),
            onPrevious: b[1] || (b[1] = (C) => E()),
            onFirst: b[2] || (b[2] = (C) => S()),
            onLast: b[3] || (b[3] = (C) => w())
          }, {
            default: U(() => [
              F(h(v.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, op),
      (i(!0), f(Q, null, Z(D.tabContents, (v, g) => {
        var C, q, Y, P;
        return i(), j(Aa, {
          key: g,
          "panel-id": ((q = (C = D.tabTitles) == null ? void 0 : C[g]) == null ? void 0 : q.panelId) || `${k(g)}-panel`,
          "tab-id": ((P = (Y = D.tabTitles) == null ? void 0 : Y[g]) == null ? void 0 : P.tabId) || k(g)
        }, {
          default: U(() => [
            F(h(v), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      L(D.$slots, "default")
    ], 4));
  }
}), ip = /* @__PURE__ */ $({
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
    const t = n, e = _(() => typeof t.link == "string" && t.link.startsWith("http")), a = _(() => t.link ? e.value ? "a" : "RouterLink" : t.disabled && t.tagName === "p" || t.selectable ? "button" : t.tagName), r = _(() => ({ [e.value ? "href" : "to"]: t.link })), l = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), o = t.small ? 0.65 : 0.9, s = _(() => l.value ? void 0 : typeof t.icon == "string" ? { name: t.icon, scale: o } : { scale: o, ...t.icon ?? {} });
    return (u, d) => (i(), j(ge(a.value), W({
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
        t.icon && !l.value ? (i(), j(be, W({
          key: 0,
          label: u.iconOnly ? u.label : void 0,
          class: { "fr-mr-1v": !u.iconOnly }
        }, s.value), null, 16, ["label", "class"])) : y("", !0),
        u.iconOnly ? y("", !0) : (i(), f(Q, { key: 1 }, [
          F(h(u.label), 1)
        ], 64)),
        L(u.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class", "aria-pressed"]));
  }
}), on = /* @__PURE__ */ we(ip, [["__scopeId", "data-v-e0195cb2"]]), up = { class: "fr-tags-group" }, dp = /* @__PURE__ */ $({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] },
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(n, { emit: t }) {
    const e = n, a = t;
    function r([l, o]) {
      if (typeof e.modelValue > "u")
        return;
      if (o) {
        const u = /* @__PURE__ */ new Set([...e.modelValue]);
        u.delete(l), a("update:modelValue", [...u]);
        return;
      }
      const s = [.../* @__PURE__ */ new Set([...e.modelValue, l])];
      a("update:modelValue", s);
    }
    return (l, o) => (i(), f("ul", up, [
      (i(!0), f(Q, null, Z(l.tags, ({ icon: s, label: u, ...d }, p) => {
        var m;
        return i(), f("li", { key: p }, [
          ne(on, W({ ref_for: !0 }, d, {
            icon: s,
            label: u,
            selectable: d.selectable,
            selected: d.selectable ? (m = l.modelValue) == null ? void 0 : m.includes(d.value) : void 0,
            onSelect: o[0] || (o[0] = (k) => r(k))
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
}, yp = ["src"], kp = ["href"], wp = ["href"], _p = ["href"], xp = /* @__PURE__ */ $({
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
    const t = n, e = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, a = _(() => typeof t.to == "string" && t.to.startsWith("http"));
    return (r, l) => {
      const o = xe("RouterLink");
      return i(), f("div", {
        class: O(["fr-tile fr-enlarge-link", [{
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
            (i(), j(ge(r.titleTag), { class: "fr-tile__title" }, {
              default: U(() => [
                a.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: r.download,
                  href: r.disabled ? "" : r.to
                }, h(r.title), 9, pp)) : y("", !0),
                a.value ? y("", !0) : (i(), j(o, {
                  key: 1,
                  download: r.download,
                  class: "fr-tile__link",
                  to: r.disabled ? "" : r.to
                }, {
                  default: U(() => [
                    F(h(r.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            r.description ? (i(), f("p", mp, h(r.description), 1)) : y("", !0),
            r.details ? (i(), f("p", hp, h(r.details), 1)) : y("", !0),
            r.$slots["start-details"] ? (i(), f("div", vp, [
              L(r.$slots, "start-details", {}, void 0, !0)
            ])) : y("", !0)
          ])
        ]),
        c("div", gp, [
          L(r.$slots, "header", {}, void 0, !0),
          r.imgSrc || r.svgPath ? (i(), f("div", bp, [
            r.imgSrc ? (i(), f("img", {
              key: 0,
              src: r.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, yp)) : (i(), f("svg", W({
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
          ])) : y("", !0)
        ])
      ], 2);
    };
  }
}), Va = /* @__PURE__ */ we(xp, [["__scopeId", "data-v-f4d836a2"]]), Ip = { class: "fr-grid-row fr-grid-row--gutters" }, Dp = /* @__PURE__ */ $({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(n) {
    return (t, e) => (i(), f("div", Ip, [
      (i(!0), f(Q, null, Z(t.tiles, (a, r) => (i(), f("div", {
        key: r,
        class: O({
          [a.containerClass ?? "no-class"]: a.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !a.containerClass && !t.horizontal,
          "fr-col-12": t.horizontal
        })
      }, [
        ne(Va, W({
          horizontal: t.horizontal,
          ref_for: !0
        }, a), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), Tp = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby", "name"], Cp = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], Ep = ["id"], Pp = /* @__PURE__ */ $({
  __name: "DsfrToggleSwitch",
  props: {
    modelValue: { type: Boolean },
    inputId: { default: () => ae("toggle") },
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
    const t = n, e = _(() => `${t.inputId}-hint-text`);
    return (a, r) => (i(), f("div", {
      class: O(["fr-toggle", {
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
      }, null, 40, Tp),
      c("label", {
        id: e.value,
        class: "fr-toggle__label",
        for: a.inputId,
        "data-fr-checked-label": a.noText ? void 0 : a.activeText,
        "data-fr-unchecked-label": a.noText ? void 0 : a.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, h(a.label), 9, Cp),
      a.hint ? (i(), f("p", {
        key: 0,
        id: `${a.inputId}-hint-text`,
        class: "fr-hint-text"
      }, h(a.hint), 9, Ep)) : y("", !0)
    ], 2));
  }
}), Mp = ["id"], Lp = /* @__PURE__ */ $({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => ae("tooltip") }
  },
  setup(n) {
    const t = n, e = K(!1), a = K(null), r = K(null), l = K("0px"), o = K("0px"), s = K("0px"), u = K(!1), d = K(0);
    async function p() {
      var T, M, D, b, v, g, C, q;
      if (typeof document > "u" || !e.value)
        return;
      await new Promise((Ee) => setTimeout(Ee, 100));
      const Y = (T = a.value) == null ? void 0 : T.getBoundingClientRect().top, P = (M = a.value) == null ? void 0 : M.offsetHeight, A = (D = a.value) == null ? void 0 : D.offsetWidth, B = (b = a.value) == null ? void 0 : b.getBoundingClientRect().left, N = (v = r.value) == null ? void 0 : v.offsetHeight, X = (g = r.value) == null ? void 0 : g.offsetWidth, z = (C = r.value) == null ? void 0 : C.offsetTop, ee = (q = r.value) == null ? void 0 : q.offsetLeft, le = !(Y - N < 0) && Y + P + N >= document.documentElement.offsetHeight;
      u.value = le;
      const oe = B + A >= document.documentElement.offsetWidth, Ie = B + A / 2 - X / 2 <= 0;
      o.value = le ? `${Y - z - N + 8}px` : `${Y - z + P - 8}px`, d.value = 1, l.value = oe ? `${B - ee + A - X - 4}px` : Ie ? `${B - ee + 4}px` : `${B - ee + A / 2 - X / 2}px`, s.value = oe ? `${X / 2 - A / 2 + 4}px` : Ie ? `${-(X / 2) + A / 2 - 4}px` : "0px";
    }
    pe(e, p, { immediate: !0 }), ye(() => {
      window.addEventListener("scroll", p);
    }), Ce(() => {
      window.removeEventListener("scroll", p);
    });
    const m = _(() => `transform: translate(${l.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${d.value};'`), k = _(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), E = (T) => {
      var M, D;
      e.value && (T.target === a.value || (M = a.value) != null && M.contains(T.target) || T.target === r.value || (D = r.value) != null && D.contains(T.target) || (e.value = !1));
    }, I = (T) => {
      T.key === "Escape" && (e.value = !1);
    }, S = (T) => {
      var M;
      t.onHover && (T.target === a.value || (M = a.value) != null && M.contains(T.target)) && (e.value = !0, globalThis.__vueDsfr__lastTooltipShow.value = !1);
    }, w = () => {
      t.onHover && (e.value = !1);
    }, x = () => {
      t.onHover || (e.value = !0, globalThis.__vueDsfr__lastTooltipShow = e);
    };
    return ye(() => {
      document.documentElement.addEventListener("click", E), document.documentElement.addEventListener("keydown", I), document.documentElement.addEventListener("mouseover", S);
    }), Ce(() => {
      document.documentElement.removeEventListener("click", E), document.documentElement.removeEventListener("keydown", I), document.documentElement.removeEventListener("mouseover", S);
    }), (T, M) => (i(), f(Q, null, [
      (i(), j(ge(T.onHover ? "a" : "button"), W(T.$attrs, {
        id: `link-${T.id}`,
        ref_key: "source",
        ref: a,
        class: T.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip",
        "aria-describedby": T.id,
        href: T.onHover ? "#" : void 0,
        onClick: M[0] || (M[0] = (D) => x()),
        onMouseleave: M[1] || (M[1] = (D) => w()),
        onFocus: M[2] || (M[2] = (D) => S(D)),
        onBlur: M[3] || (M[3] = (D) => w())
      }), {
        default: U(() => [
          L(T.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["id", "class", "aria-describedby", "href"])),
      c("span", {
        id: T.id,
        ref_key: "tooltip",
        ref: r,
        class: O(["fr-tooltip fr-placement", k.value]),
        style: De(m.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, h(T.content), 15, Mp)
    ], 64));
  }
}), Bp = /* @__PURE__ */ we(Lp, [["__scopeId", "data-v-ed1e8874"]]), Sp = { class: "fr-transcription" }, Ap = ["aria-expanded", "aria-controls"], $p = ["id"], Op = ["id", "aria-labelledby"], Rp = { class: "fr-container fr-container--fluid fr-container-md" }, Fp = { class: "fr-grid-row fr-grid-row--center" }, Np = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, Vp = { class: "fr-modal__body" }, qp = { class: "fr-modal__header" }, jp = ["aria-controls"], Hp = { class: "fr-modal__content" }, Wp = ["id"], Kp = { class: "fr-transcription__footer" }, Qp = { class: "fr-transcription__actions-group" }, Yp = ["aria-controls"], qa = /* @__PURE__ */ $({
  __name: "DsfrTranscription",
  props: {
    id: { default: () => ae("transcription") },
    title: { default: "Titre de la vidéo" },
    content: { default: "Transcription du contenu de la vidéo" }
  },
  setup(n) {
    const t = n, {
      collapse: e,
      collapsing: a,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: o
    } = Ae(), s = K(!1), u = K(!1), d = _(() => `fr-transcription__modal-${t.id}`), p = _(() => `fr-transcription__collapse-${t.id}`);
    return pe(u, (m, k) => {
      m !== k && l(m);
    }), (m, k) => (i(), f("div", Sp, [
      c("button", {
        class: "fr-transcription__btn",
        "aria-expanded": u.value,
        "aria-controls": p.value,
        onClick: k[0] || (k[0] = (E) => u.value = !u.value)
      }, " Transcription ", 8, Ap),
      c("div", {
        id: p.value,
        ref_key: "collapse",
        ref: e,
        class: O(["fr-collapse", { "fr-collapse--expanded": R(r), "fr-collapsing": R(a) }]),
        onTransitionend: k[2] || (k[2] = (E) => R(o)(u.value))
      }, [
        c("dialog", {
          id: d.value,
          class: "fr-modal",
          role: "dialog",
          "aria-labelledby": `${d.value}-title`
        }, [
          c("div", Rp, [
            c("div", Fp, [
              c("div", Np, [
                c("div", Vp, [
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
                    }, h(m.title), 9, Wp),
                    F(" " + h(m.content), 1)
                  ]),
                  c("div", Kp, [
                    c("div", Qp, [
                      c("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": d.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: k[1] || (k[1] = (E) => s.value = !0)
                      }, " Agrandir ", 8, Yp)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, Op)
      ], 42, $p),
      (i(), j(cr, { to: "body" }, [
        ne(xa, {
          title: m.title,
          opened: s.value,
          onClose: k[3] || (k[3] = (E) => s.value = !1)
        }, {
          default: U(() => [
            L(m.$slots, "default", {}, () => [
              F(h(m.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), zp = ["src"], Gp = { class: "fr-content-media__caption" }, Xp = /* @__PURE__ */ $({
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
    return (t, e) => (i(), f(Q, null, [
      c("figure", {
        class: O(["fr-content-media", {
          "fr-content-media--sm": t.size === "small",
          "fr-content-media--lg": t.size === "large"
        }])
      }, [
        c("div", {
          class: O(["fr-responsive-vid", `fr-ratio-${t.ratio}`])
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
      ne(qa, {
        title: t.transcriptionTitle,
        content: t.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), Up = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: Il,
  DsfrAccordionsGroup: Tl,
  DsfrAlert: Pl,
  DsfrBackToTop: Ml,
  DsfrBadge: da,
  DsfrBreadcrumb: Rl,
  DsfrButton: je,
  DsfrButtonGroup: Tt,
  DsfrCallout: Kl,
  DsfrCard: lo,
  DsfrCardDetail: qt,
  DsfrCheckbox: Ct,
  DsfrCheckboxSet: bo,
  DsfrConsent: _o,
  DsfrDataTable: rs,
  DsfrErrorPage: fs,
  DsfrFieldset: ca,
  DsfrFileDownload: fa,
  DsfrFileDownloadList: ws,
  DsfrFileUpload: Es,
  DsfrFollow: Gs,
  DsfrFooter: Di,
  DsfrFooterLink: ha,
  DsfrFooterLinkList: Pi,
  DsfrFooterPartners: va,
  DsfrFranceConnect: Bi,
  DsfrHeader: bu,
  DsfrHeaderMenuLink: ln,
  DsfrHeaderMenuLinks: jt,
  DsfrHighlight: yu,
  DsfrInput: Et,
  DsfrInputGroup: Du,
  DsfrLanguageSelector: rt,
  DsfrLogo: at,
  DsfrModal: xa,
  DsfrMultiselect: Cd,
  DsfrNavigation: Gd,
  DsfrNavigationItem: Ia,
  DsfrNavigationMegaMenu: Ta,
  DsfrNavigationMegaMenuCategory: Da,
  DsfrNavigationMenu: Ea,
  DsfrNavigationMenuItem: Ca,
  DsfrNavigationMenuLink: Pt,
  DsfrNewsLetter: pa,
  DsfrNotice: ec,
  DsfrPagination: rn,
  DsfrPicture: lc,
  DsfrQuote: pc,
  DsfrRadioButton: Pa,
  DsfrRadioButtonSet: Mc,
  DsfrRange: qc,
  DsfrSearchBar: lt,
  DsfrSegmented: Ma,
  DsfrSegmentedSet: Uc,
  DsfrSelect: lf,
  DsfrShare: mf,
  DsfrSideMenu: _f,
  DsfrSideMenuButton: La,
  DsfrSideMenuLink: xf,
  DsfrSideMenuList: Sa,
  DsfrSideMenuListItem: Ba,
  DsfrSkipLinks: Ef,
  DsfrSocialNetworks: ma,
  DsfrStepper: $f,
  DsfrSummary: Vf,
  DsfrTabContent: Aa,
  DsfrTabItem: $a,
  DsfrTable: lp,
  DsfrTableCell: Fa,
  DsfrTableHeader: Oa,
  DsfrTableHeaders: Ra,
  DsfrTableRow: Na,
  DsfrTabs: sp,
  DsfrTag: on,
  DsfrTags: dp,
  DsfrTile: Va,
  DsfrTiles: Dp,
  DsfrToggleSwitch: Pp,
  DsfrTooltip: Bp,
  DsfrTranscription: qa,
  DsfrVideo: Xp,
  VIcon: be,
  registerAccordionKey: nn,
  registerNavigationLinkKey: an,
  registerTabKey: Dt
}, Symbol.toStringTag, { value: "Module" })), Zp = {
  install: (n, { components: t } = {}) => {
    Object.entries(Up).forEach(([e, a]) => {
      (t === void 0 || t === "all" || t.map(({ name: r }) => r).includes(e)) && n.component(e, a);
    }), n.component("VIcon", be);
  }
}, ja = 6048e5, Jp = 864e5, em = 6e4, tm = 36e5, nm = 1e3, Rn = Symbol.for("constructDateFrom");
function ke(n, t) {
  return typeof n == "function" ? n(t) : n && typeof n == "object" && Rn in n ? n[Rn](t) : n instanceof Date ? new n.constructor(t) : new Date(t);
}
function he(n, t) {
  return ke(t || n, n);
}
function Ha(n, t, e) {
  const a = he(n, e == null ? void 0 : e.in);
  return isNaN(t) ? ke((e == null ? void 0 : e.in) || n, NaN) : (t && a.setDate(a.getDate() + t), a);
}
let am = {};
function ze() {
  return am;
}
function Re(n, t) {
  var s, u, d, p;
  const e = ze(), a = (t == null ? void 0 : t.weekStartsOn) ?? ((u = (s = t == null ? void 0 : t.locale) == null ? void 0 : s.options) == null ? void 0 : u.weekStartsOn) ?? e.weekStartsOn ?? ((p = (d = e.locale) == null ? void 0 : d.options) == null ? void 0 : p.weekStartsOn) ?? 0, r = he(n, t == null ? void 0 : t.in), l = r.getDay(), o = (l < a ? 7 : 0) + l - a;
  return r.setDate(r.getDate() - o), r.setHours(0, 0, 0, 0), r;
}
function Ye(n, t) {
  return Re(n, { ...t, weekStartsOn: 1 });
}
function Wa(n, t) {
  const e = he(n, t == null ? void 0 : t.in), a = e.getFullYear(), r = ke(e, 0);
  r.setFullYear(a + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const l = Ye(r), o = ke(e, 0);
  o.setFullYear(a, 0, 4), o.setHours(0, 0, 0, 0);
  const s = Ye(o);
  return e.getTime() >= l.getTime() ? a + 1 : e.getTime() >= s.getTime() ? a : a - 1;
}
function bt(n) {
  const t = he(n), e = new Date(
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
function rm(n, ...t) {
  const e = ke.bind(
    null,
    t.find((a) => typeof a == "object")
  );
  return t.map(e);
}
function Fn(n, t) {
  const e = he(n, t == null ? void 0 : t.in);
  return e.setHours(0, 0, 0, 0), e;
}
function lm(n, t, e) {
  const [a, r] = rm(
    e == null ? void 0 : e.in,
    n,
    t
  ), l = Fn(a), o = Fn(r), s = +l - bt(l), u = +o - bt(o);
  return Math.round((s - u) / Jp);
}
function om(n, t) {
  const e = Wa(n, t), a = ke(n, 0);
  return a.setFullYear(e, 0, 4), a.setHours(0, 0, 0, 0), Ye(a);
}
function sm(n) {
  return n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]";
}
function im(n) {
  return !(!sm(n) && typeof n != "number" || isNaN(+he(n)));
}
function um(n, t) {
  const e = he(n, t == null ? void 0 : t.in);
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
}, cm = (n, t, e) => {
  let a;
  const r = dm[n];
  return typeof r == "string" ? a = r : t === 1 ? a = r.one : a = r.other.replace("{{count}}", t.toString()), e != null && e.addSuffix ? e.comparison && e.comparison > 0 ? "in " + a : a + " ago" : a;
};
function St(n) {
  return (t = {}) => {
    const e = t.width ? String(t.width) : n.defaultWidth;
    return n.formats[e] || n.formats[n.defaultWidth];
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
  date: St({
    formats: fm,
    defaultWidth: "full"
  }),
  time: St({
    formats: pm,
    defaultWidth: "full"
  }),
  dateTime: St({
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
}, gm = (n, t, e, a) => vm[n];
function Ze(n) {
  return (t, e) => {
    const a = e != null && e.context ? String(e.context) : "standalone";
    let r;
    if (a === "formatting" && n.formattingValues) {
      const o = n.defaultFormattingWidth || n.defaultWidth, s = e != null && e.width ? String(e.width) : o;
      r = n.formattingValues[s] || n.formattingValues[o];
    } else {
      const o = n.defaultWidth, s = e != null && e.width ? String(e.width) : n.defaultWidth;
      r = n.values[s] || n.values[o];
    }
    const l = n.argumentCallback ? n.argumentCallback(t) : t;
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
}, Im = (n, t) => {
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
}, Dm = {
  ordinalNumber: Im,
  era: Ze({
    values: bm,
    defaultWidth: "wide"
  }),
  quarter: Ze({
    values: ym,
    defaultWidth: "wide",
    argumentCallback: (n) => n - 1
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
function Je(n) {
  return (t, e = {}) => {
    const a = e.width, r = a && n.matchPatterns[a] || n.matchPatterns[n.defaultMatchWidth], l = t.match(r);
    if (!l)
      return null;
    const o = l[0], s = a && n.parsePatterns[a] || n.parsePatterns[n.defaultParseWidth], u = Array.isArray(s) ? Cm(s, (m) => m.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      Tm(s, (m) => m.test(o))
    );
    let d;
    d = n.valueCallback ? n.valueCallback(u) : u, d = e.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      e.valueCallback(d)
    ) : d;
    const p = t.slice(o.length);
    return { value: d, rest: p };
  };
}
function Tm(n, t) {
  for (const e in n)
    if (Object.prototype.hasOwnProperty.call(n, e) && t(n[e]))
      return e;
}
function Cm(n, t) {
  for (let e = 0; e < n.length; e++)
    if (t(n[e]))
      return e;
}
function Em(n) {
  return (t, e = {}) => {
    const a = t.match(n.matchPattern);
    if (!a) return null;
    const r = a[0], l = t.match(n.parsePattern);
    if (!l) return null;
    let o = n.valueCallback ? n.valueCallback(l[0]) : l[0];
    o = e.valueCallback ? e.valueCallback(o) : o;
    const s = t.slice(r.length);
    return { value: o, rest: s };
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
}, Am = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, $m = {
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
}, Nm = {
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
}, qm = {
  ordinalNumber: Em({
    matchPattern: Pm,
    parsePattern: Mm,
    valueCallback: (n) => parseInt(n, 10)
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
    parsePatterns: Am,
    defaultParseWidth: "any",
    valueCallback: (n) => n + 1
  }),
  month: Je({
    matchPatterns: $m,
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
    matchPatterns: Nm,
    defaultMatchWidth: "any",
    parsePatterns: Vm,
    defaultParseWidth: "any"
  })
}, Ka = {
  code: "en-US",
  formatDistance: cm,
  formatLong: hm,
  formatRelative: gm,
  localize: Dm,
  match: qm,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function jm(n, t) {
  const e = he(n, t == null ? void 0 : t.in);
  return lm(e, um(e)) + 1;
}
function Qa(n, t) {
  const e = he(n, t == null ? void 0 : t.in), a = +Ye(e) - +om(e);
  return Math.round(a / ja) + 1;
}
function sn(n, t) {
  var p, m, k, E;
  const e = he(n, t == null ? void 0 : t.in), a = e.getFullYear(), r = ze(), l = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((m = (p = t == null ? void 0 : t.locale) == null ? void 0 : p.options) == null ? void 0 : m.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((E = (k = r.locale) == null ? void 0 : k.options) == null ? void 0 : E.firstWeekContainsDate) ?? 1, o = ke((t == null ? void 0 : t.in) || n, 0);
  o.setFullYear(a + 1, 0, l), o.setHours(0, 0, 0, 0);
  const s = Re(o, t), u = ke((t == null ? void 0 : t.in) || n, 0);
  u.setFullYear(a, 0, l), u.setHours(0, 0, 0, 0);
  const d = Re(u, t);
  return +e >= +s ? a + 1 : +e >= +d ? a : a - 1;
}
function Hm(n, t) {
  var s, u, d, p;
  const e = ze(), a = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (s = t == null ? void 0 : t.locale) == null ? void 0 : s.options) == null ? void 0 : u.firstWeekContainsDate) ?? e.firstWeekContainsDate ?? ((p = (d = e.locale) == null ? void 0 : d.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, r = sn(n, t), l = ke((t == null ? void 0 : t.in) || n, 0);
  return l.setFullYear(r, 0, a), l.setHours(0, 0, 0, 0), Re(l, t);
}
function Ya(n, t) {
  const e = he(n, t == null ? void 0 : t.in), a = +Re(e, t) - +Hm(e, t);
  return Math.round(a / ja) + 1;
}
function ie(n, t) {
  const e = n < 0 ? "-" : "", a = Math.abs(n).toString().padStart(t, "0");
  return e + a;
}
const $e = {
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
}, Nn = {
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
    return $e.y(n, t);
  },
  // Local week-numbering year
  Y: function(n, t, e, a) {
    const r = sn(n, a), l = r > 0 ? r : 1 - r;
    if (t === "YY") {
      const o = l % 100;
      return ie(o, 2);
    }
    return t === "Yo" ? e.ordinalNumber(l, { unit: "year" }) : ie(l, t.length);
  },
  // ISO week-numbering year
  R: function(n, t) {
    const e = Wa(n);
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
        return $e.M(n, t);
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
    const r = Ya(n, a);
    return t === "wo" ? e.ordinalNumber(r, { unit: "week" }) : ie(r, t.length);
  },
  // ISO week of year
  I: function(n, t, e) {
    const a = Qa(n);
    return t === "Io" ? e.ordinalNumber(a, { unit: "week" }) : ie(a, t.length);
  },
  // Day of the month
  d: function(n, t, e) {
    return t === "do" ? e.ordinalNumber(n.getDate(), { unit: "date" }) : $e.d(n, t);
  },
  // Day of year
  D: function(n, t, e) {
    const a = jm(n);
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
    return $e.h(n, t);
  },
  // Hour [0-23]
  H: function(n, t, e) {
    return t === "Ho" ? e.ordinalNumber(n.getHours(), { unit: "hour" }) : $e.H(n, t);
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
    return t === "mo" ? e.ordinalNumber(n.getMinutes(), { unit: "minute" }) : $e.m(n, t);
  },
  // Second
  s: function(n, t, e) {
    return t === "so" ? e.ordinalNumber(n.getSeconds(), { unit: "second" }) : $e.s(n, t);
  },
  // Fraction of second
  S: function(n, t) {
    return $e.S(n, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(n, t, e) {
    const a = n.getTimezoneOffset();
    if (a === 0)
      return "Z";
    switch (t) {
      case "X":
        return qn(a);
      case "XXXX":
      case "XX":
        return Ne(a);
      case "XXXXX":
      case "XXX":
      default:
        return Ne(a, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(n, t, e) {
    const a = n.getTimezoneOffset();
    switch (t) {
      case "x":
        return qn(a);
      case "xxxx":
      case "xx":
        return Ne(a);
      case "xxxxx":
      case "xxx":
      default:
        return Ne(a, ":");
    }
  },
  // Timezone (GMT)
  O: function(n, t, e) {
    const a = n.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Vn(a, ":");
      case "OOOO":
      default:
        return "GMT" + Ne(a, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(n, t, e) {
    const a = n.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Vn(a, ":");
      case "zzzz":
      default:
        return "GMT" + Ne(a, ":");
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
function Vn(n, t = "") {
  const e = n > 0 ? "-" : "+", a = Math.abs(n), r = Math.trunc(a / 60), l = a % 60;
  return l === 0 ? e + String(r) : e + String(r) + t + ie(l, 2);
}
function qn(n, t) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + ie(Math.abs(n) / 60, 2) : Ne(n, t);
}
function Ne(n, t = "") {
  const e = n > 0 ? "-" : "+", a = Math.abs(n), r = ie(Math.trunc(a / 60), 2), l = ie(a % 60, 2);
  return e + r + t + l;
}
const jn = (n, t) => {
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
}, za = (n, t) => {
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
}, Wm = (n, t) => {
  const e = n.match(/(P+)(p+)?/) || [], a = e[1], r = e[2];
  if (!r)
    return jn(n, t);
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
  return l.replace("{{date}}", jn(a, t)).replace("{{time}}", za(r, t));
}, Kt = {
  p: za,
  P: Wm
}, Km = /^D+$/, Qm = /^Y+$/, Ym = ["D", "DD", "YY", "YYYY"];
function Ga(n) {
  return Km.test(n);
}
function Xa(n) {
  return Qm.test(n);
}
function Qt(n, t, e) {
  const a = zm(n, t, e);
  if (console.warn(a), Ym.includes(n)) throw new RangeError(a);
}
function zm(n, t, e) {
  const a = n[0] === "Y" ? "years" : "days of the month";
  return `Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${t}\`) for formatting ${a} to the input \`${e}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Gm = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Xm = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Um = /^'([^]*?)'?$/, Zm = /''/g, Jm = /[a-zA-Z]/;
function Hn(n, t, e) {
  var p, m, k, E;
  const a = ze(), r = a.locale ?? Ka, l = a.firstWeekContainsDate ?? ((m = (p = a.locale) == null ? void 0 : p.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, o = a.weekStartsOn ?? ((E = (k = a.locale) == null ? void 0 : k.options) == null ? void 0 : E.weekStartsOn) ?? 0, s = he(n, e == null ? void 0 : e.in);
  if (!im(s))
    throw new RangeError("Invalid time value");
  let u = t.match(Xm).map((I) => {
    const S = I[0];
    if (S === "p" || S === "P") {
      const w = Kt[S];
      return w(I, r.formatLong);
    }
    return I;
  }).join("").match(Gm).map((I) => {
    if (I === "''")
      return { isToken: !1, value: "'" };
    const S = I[0];
    if (S === "'")
      return { isToken: !1, value: eh(I) };
    if (Nn[S])
      return { isToken: !0, value: I };
    if (S.match(Jm))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + S + "`"
      );
    return { isToken: !1, value: I };
  });
  r.localize.preprocessor && (u = r.localize.preprocessor(s, u));
  const d = {
    firstWeekContainsDate: l,
    weekStartsOn: o,
    locale: r
  };
  return u.map((I) => {
    if (!I.isToken) return I.value;
    const S = I.value;
    (Xa(S) || Ga(S)) && Qt(S, t, String(n));
    const w = Nn[S[0]];
    return w(s, S, r.localize, d);
  }).join("");
}
function eh(n) {
  const t = n.match(Um);
  return t ? t[1].replace(Zm, "'") : n;
}
function th() {
  return Object.assign({}, ze());
}
function nh(n, t) {
  const e = he(n, t == null ? void 0 : t.in).getDay();
  return e === 0 ? 7 : e;
}
function ah(n, t) {
  const e = rh(t) ? new t(0) : ke(t, 0);
  return e.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), e.setHours(
    n.getHours(),
    n.getMinutes(),
    n.getSeconds(),
    n.getMilliseconds()
  ), e;
}
function rh(n) {
  var t;
  return typeof n == "function" && ((t = n.prototype) == null ? void 0 : t.constructor) === n;
}
const lh = 10;
class Ua {
  constructor() {
    V(this, "subPriority", 0);
  }
  validate(t, e) {
    return !0;
  }
}
class oh extends Ua {
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
class sh extends Ua {
  constructor(e, a) {
    super();
    V(this, "priority", lh);
    V(this, "subPriority", -1);
    this.context = e || ((r) => ke(a, r));
  }
  set(e, a) {
    return a.timestampIsSet ? e : ke(e, ah(e, this.context));
  }
}
class se {
  run(t, e, a, r) {
    const l = this.parse(t, e, a, r);
    return l ? {
      setter: new oh(
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
class ih extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 140);
    V(this, "incompatibleTokens", ["R", "u", "t", "T"]);
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
const ce = {
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
function fe(n, t) {
  return n && {
    value: t(n.value),
    rest: n.rest
  };
}
function ue(n, t) {
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
  const a = e[1] === "+" ? 1 : -1, r = e[2] ? parseInt(e[2], 10) : 0, l = e[3] ? parseInt(e[3], 10) : 0, o = e[5] ? parseInt(e[5], 10) : 0;
  return {
    value: a * (r * tm + l * em + o * nm),
    rest: t.slice(e[0].length)
  };
}
function Za(n) {
  return ue(ce.anyDigitsSigned, n);
}
function de(n, t) {
  switch (n) {
    case 1:
      return ue(ce.singleDigit, t);
    case 2:
      return ue(ce.twoDigits, t);
    case 3:
      return ue(ce.threeDigits, t);
    case 4:
      return ue(ce.fourDigits, t);
    default:
      return ue(new RegExp("^\\d{1," + n + "}"), t);
  }
}
function yt(n, t) {
  switch (n) {
    case 1:
      return ue(ce.singleDigitSigned, t);
    case 2:
      return ue(ce.twoDigitsSigned, t);
    case 3:
      return ue(ce.threeDigitsSigned, t);
    case 4:
      return ue(ce.fourDigitsSigned, t);
    default:
      return ue(new RegExp("^-?\\d{1," + n + "}"), t);
  }
}
function un(n) {
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
function Ja(n, t) {
  const e = t > 0, a = e ? t : 1 - t;
  let r;
  if (a <= 50)
    r = n || 100;
  else {
    const l = a + 50, o = Math.trunc(l / 100) * 100, s = n >= l % 100;
    r = n + o - (s ? 100 : 0);
  }
  return e ? r : 1 - r;
}
function er(n) {
  return n % 400 === 0 || n % 4 === 0 && n % 100 !== 0;
}
class uh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 130);
    V(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, a, r) {
    const l = (o) => ({
      year: o,
      isTwoDigitYear: a === "yy"
    });
    switch (a) {
      case "y":
        return fe(de(4, e), l);
      case "yo":
        return fe(
          r.ordinalNumber(e, {
            unit: "year"
          }),
          l
        );
      default:
        return fe(de(a.length, e), l);
    }
  }
  validate(e, a) {
    return a.isTwoDigitYear || a.year > 0;
  }
  set(e, a, r) {
    const l = e.getFullYear();
    if (r.isTwoDigitYear) {
      const s = Ja(
        r.year,
        l
      );
      return e.setFullYear(s, 0, 1), e.setHours(0, 0, 0, 0), e;
    }
    const o = !("era" in a) || a.era === 1 ? r.year : 1 - r.year;
    return e.setFullYear(o, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class dh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 130);
    V(this, "incompatibleTokens", [
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
    const l = (o) => ({
      year: o,
      isTwoDigitYear: a === "YY"
    });
    switch (a) {
      case "Y":
        return fe(de(4, e), l);
      case "Yo":
        return fe(
          r.ordinalNumber(e, {
            unit: "year"
          }),
          l
        );
      default:
        return fe(de(a.length, e), l);
    }
  }
  validate(e, a) {
    return a.isTwoDigitYear || a.year > 0;
  }
  set(e, a, r, l) {
    const o = sn(e, l);
    if (r.isTwoDigitYear) {
      const u = Ja(
        r.year,
        o
      );
      return e.setFullYear(
        u,
        0,
        l.firstWeekContainsDate
      ), e.setHours(0, 0, 0, 0), Re(e, l);
    }
    const s = !("era" in a) || a.era === 1 ? r.year : 1 - r.year;
    return e.setFullYear(s, 0, l.firstWeekContainsDate), e.setHours(0, 0, 0, 0), Re(e, l);
  }
}
class ch extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 130);
    V(this, "incompatibleTokens", [
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
    const l = ke(e, 0);
    return l.setFullYear(r, 0, 4), l.setHours(0, 0, 0, 0), Ye(l);
  }
}
class fh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 130);
    V(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, a) {
    return yt(a === "u" ? 4 : a.length, e);
  }
  set(e, a, r) {
    return e.setFullYear(r, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class ph extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 120);
    V(this, "incompatibleTokens", [
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
        return de(a.length, e);
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
class mh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 120);
    V(this, "incompatibleTokens", [
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
        return de(a.length, e);
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
class hh extends se {
  constructor() {
    super(...arguments);
    V(this, "incompatibleTokens", [
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
    V(this, "priority", 110);
  }
  parse(e, a, r) {
    const l = (o) => o - 1;
    switch (a) {
      case "M":
        return fe(
          ue(ce.month, e),
          l
        );
      case "MM":
        return fe(de(2, e), l);
      case "Mo":
        return fe(
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
class vh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 110);
    V(this, "incompatibleTokens", [
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
    const l = (o) => o - 1;
    switch (a) {
      case "L":
        return fe(
          ue(ce.month, e),
          l
        );
      case "LL":
        return fe(de(2, e), l);
      case "Lo":
        return fe(
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
function gh(n, t, e) {
  const a = he(n, e == null ? void 0 : e.in), r = Ya(a, e) - t;
  return a.setDate(a.getDate() - r * 7), he(a, e == null ? void 0 : e.in);
}
class bh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 100);
    V(this, "incompatibleTokens", [
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
        return ue(ce.week, e);
      case "wo":
        return r.ordinalNumber(e, { unit: "week" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 53;
  }
  set(e, a, r, l) {
    return Re(gh(e, r, l), l);
  }
}
function yh(n, t, e) {
  const a = he(n, e == null ? void 0 : e.in), r = Qa(a, e) - t;
  return a.setDate(a.getDate() - r * 7), a;
}
class kh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 100);
    V(this, "incompatibleTokens", [
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
        return ue(ce.week, e);
      case "Io":
        return r.ordinalNumber(e, { unit: "week" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 53;
  }
  set(e, a, r) {
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
class xh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 90);
    V(this, "subPriority", 1);
    V(this, "incompatibleTokens", [
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
        return ue(ce.date, e);
      case "do":
        return r.ordinalNumber(e, { unit: "date" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    const r = e.getFullYear(), l = er(r), o = e.getMonth();
    return l ? a >= 1 && a <= _h[o] : a >= 1 && a <= wh[o];
  }
  set(e, a, r) {
    return e.setDate(r), e.setHours(0, 0, 0, 0), e;
  }
}
class Ih extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 90);
    V(this, "subpriority", 1);
    V(this, "incompatibleTokens", [
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
        return ue(ce.dayOfYear, e);
      case "Do":
        return r.ordinalNumber(e, { unit: "date" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    const r = e.getFullYear();
    return er(r) ? a >= 1 && a <= 366 : a >= 1 && a <= 365;
  }
  set(e, a, r) {
    return e.setMonth(0, r), e.setHours(0, 0, 0, 0), e;
  }
}
function dn(n, t, e) {
  var m, k, E, I;
  const a = ze(), r = (e == null ? void 0 : e.weekStartsOn) ?? ((k = (m = e == null ? void 0 : e.locale) == null ? void 0 : m.options) == null ? void 0 : k.weekStartsOn) ?? a.weekStartsOn ?? ((I = (E = a.locale) == null ? void 0 : E.options) == null ? void 0 : I.weekStartsOn) ?? 0, l = he(n, e == null ? void 0 : e.in), o = l.getDay(), u = (t % 7 + 7) % 7, d = 7 - r, p = t < 0 || t > 6 ? t - (o + d) % 7 : (u + d) % 7 - (o + d) % 7;
  return Ha(l, p, e);
}
class Dh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 90);
    V(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
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
    return e = dn(e, r, l), e.setHours(0, 0, 0, 0), e;
  }
}
class Th extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 90);
    V(this, "incompatibleTokens", [
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
    const o = (s) => {
      const u = Math.floor((s - 1) / 7) * 7;
      return (s + l.weekStartsOn + 6) % 7 + u;
    };
    switch (a) {
      case "e":
      case "ee":
        return fe(de(a.length, e), o);
      case "eo":
        return fe(
          r.ordinalNumber(e, {
            unit: "day"
          }),
          o
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
    return e = dn(e, r, l), e.setHours(0, 0, 0, 0), e;
  }
}
class Ch extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 90);
    V(this, "incompatibleTokens", [
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
    const o = (s) => {
      const u = Math.floor((s - 1) / 7) * 7;
      return (s + l.weekStartsOn + 6) % 7 + u;
    };
    switch (a) {
      case "c":
      case "cc":
        return fe(de(a.length, e), o);
      case "co":
        return fe(
          r.ordinalNumber(e, {
            unit: "day"
          }),
          o
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
    return e = dn(e, r, l), e.setHours(0, 0, 0, 0), e;
  }
}
function Eh(n, t, e) {
  const a = he(n, e == null ? void 0 : e.in), r = nh(a, e), l = t - r;
  return Ha(a, l, e);
}
class Ph extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 90);
    V(this, "incompatibleTokens", [
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
    const l = (o) => o === 0 ? 7 : o;
    switch (a) {
      case "i":
      case "ii":
        return de(a.length, e);
      case "io":
        return r.ordinalNumber(e, { unit: "day" });
      case "iii":
        return fe(
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
        return fe(
          r.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      case "iiiiii":
        return fe(
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
        return fe(
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
    return e = Eh(e, r), e.setHours(0, 0, 0, 0), e;
  }
}
class Mh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 80);
    V(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
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
    return e.setHours(un(r), 0, 0, 0), e;
  }
}
class Lh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 80);
    V(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
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
    return e.setHours(un(r), 0, 0, 0), e;
  }
}
class Bh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 80);
    V(this, "incompatibleTokens", ["a", "b", "t", "T"]);
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
    return e.setHours(un(r), 0, 0, 0), e;
  }
}
class Sh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 70);
    V(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "h":
        return ue(ce.hour12h, e);
      case "ho":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return de(a.length, e);
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
class Ah extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 70);
    V(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "H":
        return ue(ce.hour23h, e);
      case "Ho":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 23;
  }
  set(e, a, r) {
    return e.setHours(r, 0, 0, 0), e;
  }
}
class $h extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 70);
    V(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "K":
        return ue(ce.hour11h, e);
      case "Ko":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 11;
  }
  set(e, a, r) {
    return e.getHours() >= 12 && r < 12 ? e.setHours(r + 12, 0, 0, 0) : e.setHours(r, 0, 0, 0), e;
  }
}
class Oh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 70);
    V(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "k":
        return ue(ce.hour24h, e);
      case "ko":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return de(a.length, e);
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
class Rh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 60);
    V(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "m":
        return ue(ce.minute, e);
      case "mo":
        return r.ordinalNumber(e, { unit: "minute" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 59;
  }
  set(e, a, r) {
    return e.setMinutes(r, 0, 0), e;
  }
}
class Fh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 50);
    V(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "s":
        return ue(ce.second, e);
      case "so":
        return r.ordinalNumber(e, { unit: "second" });
      default:
        return de(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 59;
  }
  set(e, a, r) {
    return e.setSeconds(r, 0), e;
  }
}
class Nh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 30);
    V(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, a) {
    const r = (l) => Math.trunc(l * Math.pow(10, -a.length + 3));
    return fe(de(a.length, e), r);
  }
  set(e, a, r) {
    return e.setMilliseconds(r), e;
  }
}
class Vh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 10);
    V(this, "incompatibleTokens", ["t", "T", "x"]);
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
    return a.timestampIsSet ? e : ke(
      e,
      e.getTime() - bt(e) - r
    );
  }
}
class qh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 10);
    V(this, "incompatibleTokens", ["t", "T", "X"]);
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
    return a.timestampIsSet ? e : ke(
      e,
      e.getTime() - bt(e) - r
    );
  }
}
class jh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 40);
    V(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return Za(e);
  }
  set(e, a, r) {
    return [ke(e, r * 1e3), { timestampIsSet: !0 }];
  }
}
class Hh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 20);
    V(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return Za(e);
  }
  set(e, a, r) {
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
  D: new Ih(),
  E: new Dh(),
  e: new Th(),
  c: new Ch(),
  i: new Ph(),
  a: new Mh(),
  b: new Lh(),
  B: new Bh(),
  h: new Sh(),
  H: new Ah(),
  K: new $h(),
  k: new Oh(),
  m: new Rh(),
  s: new Fh(),
  S: new Nh(),
  X: new Vh(),
  x: new qh(),
  t: new jh(),
  T: new Hh()
}, Kh = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Qh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Yh = /^'([^]*?)'?$/, zh = /''/g, Gh = /\S/, Xh = /[a-zA-Z]/;
function Wn(n, t, e, a) {
  var w, x, T, M;
  const r = () => ke(e, NaN), l = th(), o = l.locale ?? Ka, s = l.firstWeekContainsDate ?? ((x = (w = l.locale) == null ? void 0 : w.options) == null ? void 0 : x.firstWeekContainsDate) ?? 1, u = l.weekStartsOn ?? ((M = (T = l.locale) == null ? void 0 : T.options) == null ? void 0 : M.weekStartsOn) ?? 0;
  if (!t)
    return n ? r() : he(e, a == null ? void 0 : a.in);
  const d = {
    firstWeekContainsDate: s,
    weekStartsOn: u,
    locale: o
  }, p = [new sh(a == null ? void 0 : a.in, e)], m = t.match(Qh).map((D) => {
    const b = D[0];
    if (b in Kt) {
      const v = Kt[b];
      return v(D, o.formatLong);
    }
    return D;
  }).join("").match(Kh), k = [];
  for (let D of m) {
    Xa(D) && Qt(D, t, n), Ga(D) && Qt(D, t, n);
    const b = D[0], v = Wh[b];
    if (v) {
      const { incompatibleTokens: g } = v;
      if (Array.isArray(g)) {
        const q = k.find(
          (Y) => g.includes(Y.token) || Y.token === b
        );
        if (q)
          throw new RangeError(
            `The format string mustn't contain \`${q.fullToken}\` and \`${D}\` at the same time`
          );
      } else if (v.incompatibleTokens === "*" && k.length > 0)
        throw new RangeError(
          `The format string mustn't contain \`${D}\` and any other token at the same time`
        );
      k.push({ token: b, fullToken: D });
      const C = v.run(
        n,
        D,
        o.match,
        d
      );
      if (!C)
        return r();
      p.push(C.setter), n = C.rest;
    } else {
      if (b.match(Xh))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + b + "`"
        );
      if (D === "''" ? D = "'" : b === "'" && (D = Uh(D)), n.indexOf(D) === 0)
        n = n.slice(D.length);
      else
        return r();
    }
  }
  if (n.length > 0 && Gh.test(n))
    return r();
  const E = p.map((D) => D.priority).sort((D, b) => b - D).filter((D, b, v) => v.indexOf(D) === b).map(
    (D) => p.filter((b) => b.priority === D).sort((b, v) => v.subPriority - b.subPriority)
  ).map((D) => D[0]);
  let I = he(e, a == null ? void 0 : a.in);
  if (isNaN(+I)) return r();
  const S = {};
  for (const D of E) {
    if (!D.validate(I, d))
      return r();
    const b = D.set(I, S, d);
    Array.isArray(b) ? (I = b[0], Object.assign(S, b[1])) : I = b;
  }
  return I;
}
function Uh(n) {
  return n.match(Yh)[1].replace(zh, "'");
}
const Zh = {
  dsfrDecodeDate: function(n, t) {
    if (typeof n != "string" || n === "" || /^\d{4}-\d{2}-\d{2}$/.test(n))
      return n;
    const a = Wn(n, t, /* @__PURE__ */ new Date());
    return Hn(a, "yyyy-MM-dd");
  },
  dsfrDecodeDateTime: function(n, t) {
    if (n === "" || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(n))
      return n;
    const a = Wn(n, t, /* @__PURE__ */ new Date());
    return Hn(a, "yyyy-MM-dd'T'HH:mm");
  },
  _searchAndFilterList: function(n, t, e, a, r) {
    let l = this.$data.vueData[n];
    if (a && (l = l.filter(a)), r != null && r.trim() !== "") {
      const o = this.unaccentLower(r);
      l = l.filter((s) => this.unaccentLower(s[e].toString()).indexOf(o) > -1);
    }
    return l;
  },
  dsfrTransformListForSelection: function(n, t, e, a, r, l) {
    let s = this._searchAndFilterList(n, t, e, r, l).map(function(u) {
      return { value: u[t], text: u[e].toString() };
    });
    return a != null && a !== "" && s.unshift({ value: "", text: a }), s;
  },
  dsfrTransformListForRadio: function(n, t, e, a, r, l, o) {
    return this._searchAndFilterList(n, t, e, l, o).map(function(u) {
      return {
        value: u[t],
        label: u[e].toString(),
        hint: u[r],
        disabled: u[a]
      };
    });
  },
  dsfrTransformListForCheckbox: function(n, t, e, a, r, l, o, s) {
    return this._searchAndFilterList(n, t, e, o, s).map(function(d) {
      return {
        value: d[t],
        label: d[e].toString(),
        name: l,
        hint: d[r],
        disabled: d[a]
      };
    });
  },
  dsfrSearchAutocomplete: function(n, t, e, a, r, l, o) {
    return o.length < l ? Promise.resolve([]) : this.$http.post(r, this.objectToFormData({ terms: o, list: n, valueField: t, labelField: e, CTX: this.$data.vueData.CTX })).then((s) => s.data.map((u) => ({
      value: u[t],
      label: u[e].toString()
      // A label is always a string
    }))).catch(() => []);
  },
  dsfrLoadAutocompleteById: function(n, t, e, a, r, l, o, s) {
    var u;
    s != null ? u = this.$data.vueData[l][s][o] : u = this.$data.vueData[l][o], Array.isArray(u) ? u.forEach((d) => this.dsfrLoadMissingAutocompleteOption(n, t, e, a, r, d)) : this.dsfrLoadMissingAutocompleteOption(n, t, e, a, r, u);
  },
  dsfrLoadMissingAutocompleteOption: function(n, t, e, a, r, l) {
    !l || this.$data.componentStates[a].options.filter((function(o) {
      return o.value === l;
    }).bind(this)).length > 0 || (this.$data.componentStates[a].loading = !0, this.$http.post(r, this.objectToFormData({ value: l, list: n, valueField: t, labelField: e, CTX: this.$data.vueData.CTX })).then((function(o) {
      let s = o.data.map(function(u) {
        return { value: u[t], label: u[e].toString() };
      });
      return this.$data.componentStates[a].options = this.$data.componentStates[a].options.concat(s), this.$data.componentStates[a].options;
    }).bind(this)).catch((function(o) {
      this.$q.notify(o.response.status + ":" + o.response.statusText);
    }).bind(this)).then((function() {
      this.$data.componentStates[a].loading = !1;
    }).bind(this)));
  },
  dsfrUpdateMenuNavigationActiveState: function() {
    var n, t;
    (t = (n = this.componentStates) == null ? void 0 : n.dsfrHeader) == null || t.navItems.forEach((e) => {
      e.title ? e.active = e.links.some((a) => a.setActive === !0 || window.location.pathname.startsWith(a.to)) : e.active = e.setActive === !0;
    });
  }
}, Jh = "abcdefghijklmnopqrstuvwyz0123456789", Kn = Jh.repeat(10), ev = () => {
  const n = Math.floor(Math.random() * Kn.length);
  return Kn[n];
}, tv = (n) => Array.from({ length: n }).map(ev).join(""), Fe = (n = "", t = "") => (n ? `${n}-` : "") + tv(5) + (t ? `-${t}` : ""), nv = {
  getRandomId: Fe
}, av = ["href", "aria-current"], rv = {
  __name: "RouterLink",
  props: ["to", "active"],
  setup(n) {
    const t = n, e = t.to === "/" ? window.location.pathname === t.to : window.location.pathname.startsWith(t.to);
    return (a, r) => (i(), f("a", {
      href: t.to,
      "aria-current": R(e) || n.active ? "page" : void 0
    }, [
      L(a.$slots, "default")
    ], 8, av));
  }
}, Le = (n, t) => {
  const e = n.__vccOpts || n;
  for (const [a, r] of t)
    e[a] = r;
  return e;
}, lv = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: Ct, DsfrTag: on, DsfrButton: je },
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
}, ov = {
  key: 0,
  class: "fr-mb-2w flex flex-column gap--sm"
}, sv = { class: "fr-mb-1w fr-text--md" }, iv = { key: 0 }, uv = { class: "facet" }, dv = { class: "flex justify-between w-full fr-mb-0" }, cv = { class: "facet--count" }, fv = { key: 1 }, pv = { class: "flex justify-between w-full" }, mv = { class: "facet--count" }, hv = { key: 0 }, vv = { class: "facet" }, gv = { class: "flex justify-between w-full fr-mb-0" }, bv = { class: "facet--count" }, yv = { key: 1 }, kv = { class: "flex justify-between w-full" }, wv = { class: "facet--count" }, _v = { class: "fr-mb-2w" };
function xv(n, t, e, a, r, l) {
  const o = xe("DsfrTag"), s = xe("DsfrCheckbox"), u = xe("DsfrButton");
  return i(), f("div", null, [
    l.isAnyFacetValueSelected() ? (i(), f("div", ov, [
      (i(!0), f(Q, null, Z(e.selectedFacets, (d, p) => (i(), f(Q, { key: p }, [
        l.facetMultipleByCode(p) ? y("", !0) : (i(!0), f(Q, { key: 0 }, Z(d, (m) => (i(), j(o, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: m.code,
          onClick: (k) => n.$emit("toogle-facet", p, m, e.contextKey)
        }, {
          default: U(() => [
            F(h(l.facetLabelByCode(p)) + ": " + h(l.facetValueLabelByCode(p, m)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ], 64))), 128))
    ])) : y("", !0),
    (i(!0), f(Q, null, Z(e.facets, (d) => (i(), f("div", {
      key: d.code,
      class: "facets"
    }, [
      d.multiple || !l.isFacetSelected(d.code) ? (i(), f(Q, { key: 0 }, [
        c("h6", sv, h(d.label), 1),
        c("ul", null, [
          (i(!0), f(Q, null, Z(l.selectedInvisibleFacets(d.code), (p) => (i(), f(Q, {
            key: p.code
          }, [
            d.multiple ? (i(), f("li", iv, [
              c("div", uv, [
                ne(s, {
                  small: "",
                  modelValue: !0,
                  "onUpdate:modelValue": (m) => n.$emit("toogle-facet", d.code, p.code, e.contextKey)
                }, {
                  label: U(() => [
                    c("p", dv, [
                      F(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", cv, h(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", fv, [
              ne(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (m) => n.$emit("toogle-facet", d.code, p.code, e.contextKey)
              }, {
                default: U(() => [
                  c("span", pv, [
                    F(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", mv, h(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("ul", null, [
          (i(!0), f(Q, null, Z(l.visibleFacets(d.code, d.values), (p) => (i(), f(Q, {
            key: p.code
          }, [
            d.multiple ? (i(), f("li", hv, [
              c("div", vv, [
                ne(s, {
                  small: "",
                  modelValue: l.isFacetValueSelected(d.code, p.code),
                  class: "facet",
                  "onUpdate:modelValue": (m) => n.$emit("toogle-facet", d.code, p.code, e.contextKey)
                }, {
                  label: U(() => [
                    c("p", gv, [
                      F(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", bv, h(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", yv, [
              ne(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (m) => n.$emit("toogle-facet", d.code, p.code, e.contextKey)
              }, {
                default: U(() => [
                  c("span", kv, [
                    F(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", wv, h(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("div", _v, [
          d.values.length > e.maxValues && !l.isFacetExpanded(d.code) ? (i(), j(u, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.expandFacet(d.code)
          }, {
            default: U(() => [
              F(h(n.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : y("", !0),
          d.values.length > e.maxValues && l.isFacetExpanded(d.code) ? (i(), j(u, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.reduceFacet(d.code)
          }, {
            default: U(() => [
              F(h(n.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : y("", !0)
        ])
      ], 64)) : y("", !0)
    ]))), 128))
  ]);
}
const Iv = /* @__PURE__ */ Le(lv, [["render", xv], ["__scopeId", "data-v-0be4e596"]]), cn = () => {
  const n = K(), t = K(!1), e = K(!1), a = () => {
    if (!n.value)
      return;
    n.value.style.setProperty("--collapser", "none");
    const o = n.value.offsetHeight;
    n.value.style.setProperty("--collapse", `${-o}px`), n.value.style.setProperty("--collapser", "");
  };
  return {
    collapse: n,
    collapsing: t,
    cssExpanded: e,
    doExpand: (o) => {
      n.value && (o === !0 && n.value.style.setProperty("--collapse-max-height", "none"), window.requestAnimationFrame(() => {
        t.value = !0, a(), window.requestAnimationFrame(() => {
          e.value = o;
        });
      }));
    },
    adjust: a,
    onTransitionEnd: (o) => {
      t.value = !1, n.value && o === !1 && n.value.style.removeProperty("--collapse-max-height");
    }
  };
}, Dv = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Tv = ["id", "aria-labelledby", "onKeydown"], Cv = {
  class: "fr-menu__list",
  role: "none"
}, Ev = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "DsfrMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Fe("menu") },
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
      onTransitionEnd: o
    } = cn(), s = n, u = K(null), d = K(!1);
    let p = K(0), m = [];
    Oe("menuItem", { menuItemIndex: p, addMenuItem: (g, C) => {
      p.value += 1, m.push(`${g}@${C}`);
    } }), Oe("id", s.id), pe(d, (g, C) => {
      g !== C && (l(g), g ? (setTimeout(() => S(), 100), document.addEventListener("click", T), document.addEventListener("touchstart", T)) : (document.removeEventListener("click", T), document.removeEventListener("touchstart", T)));
    });
    const E = (g, C) => {
      const q = C === "down" ? (g + 1) % m.length : (g - 1 + m.length) % m.length, Y = document.getElementById(`${s.id}_item_${q}`);
      return Y.ariaDisabled === "true" ? E(q, C) : Y;
    }, I = (g) => {
      const C = document.activeElement.id, q = C.startsWith(`${s.id}_item_`) ? Number(C.split("_")[2]) : g === "down" ? -1 : 0;
      E(q, g).focus();
    }, S = (g) => I("down"), w = (g) => I("up");
    let x = (g) => {
      let C = g.key;
      if (C.length > 1 && C.match(/\S/))
        return;
      C = C.toLowerCase();
      let q = m.filter((P) => P.toLowerCase().startsWith(C)), Y = document.activeElement.id;
      for (let P of q) {
        let A = P.split("@")[1], B = document.getElementById(`${s.id}_item_${A}`);
        if (Y !== B.id) {
          B.focus();
          break;
        }
      }
    }, T = (g) => {
      u.value.contains(g.target) || (d.value = !1);
    };
    function M() {
      d.value = !1;
    }
    const D = _(() => ["sm", "small"].includes(s.size)), b = _(() => ["md", "medium"].includes(s.size)), v = _(() => ["lg", "large"].includes(s.size));
    return t({ closeMenu: M }), (g, C) => (i(), f("div", {
      class: "relative-position",
      onKeydown: C[9] || (C[9] = J(
        //@ts-ignore
        (...q) => R(T) && R(T)(...q),
        ["tab"]
      )),
      ref_key: "container",
      ref: u
    }, [
      c("button", W({
        id: g.id,
        onClick: C[0] || (C[0] = te((q) => d.value = !d.value, ["prevent", "stop"])),
        onKeyup: [
          C[1] || (C[1] = J(te((q) => d.value = !1, ["stop"]), ["esc"])),
          C[2] || (C[2] = J(te((q) => d.value = !d.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          J(te(S, ["prevent"]), ["down"]),
          J(te(w, ["prevent"]), ["up"]),
          C[3] || (C[3] = //@ts-ignore
          (...q) => R(x) && R(x)(...q)),
          C[4] || (C[4] = J((q) => d.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          [g.icon]: !0,
          "fr-btn--secondary": g.secondary,
          "fr-btn--tertiary": g.tertiary,
          "fr-btn--sm": D.value,
          "fr-btn--md": b.value,
          "fr-btn--lg": v.value
        }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": g.disabled,
        "aria-controls": `${g.id}_menu`,
        "aria-expanded": d.value
      }, g.$attrs), [
        c("span", null, h(g.label), 1)
      ], 16, Dv),
      c("div", {
        id: `${g.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: O(["fr-collapse fr-menu", { "fr-collapse--expanded": R(r), "fr-collapsing": R(a) }]),
        role: "menu",
        "aria-labelledby": g.id,
        onKeyup: C[5] || (C[5] = J((q) => d.value = !1, ["esc"])),
        onKeydown: [
          C[6] || (C[6] = J((q) => d.value = !1, ["tab"])),
          J(te(S, ["prevent"]), ["down"]),
          J(te(w, ["prevent"]), ["up"]),
          C[7] || (C[7] = //@ts-ignore
          (...q) => R(x) && R(x)(...q))
        ],
        onTransitionend: C[8] || (C[8] = (q) => R(o)(d.value))
      }, [
        c("ul", Cv, [
          L(g.$slots, "default", {}, void 0, !0)
        ])
      ], 42, Tv)
    ], 544));
  }
}), Pv = /* @__PURE__ */ Le(Ev, [["__scopeId", "data-v-ac7c4692"]]), Mv = { role: "none" }, Lv = ["id", "href"], Bv = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "DsfrMenuLink",
  props: {
    label: { default: "" },
    icon: { default: "" },
    url: { default: "" }
  },
  setup(n) {
    const t = n, { menuItemIndex: e, addMenuItem: a } = Qe("menuItem"), l = `fr-btn fr-btn--secondary fr-nav__link ${_(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")) ? t.icon : ""} fr-btn--icon-left`, o = Qe("id"), s = e.value;
    return a(t.label, s), (u, d) => {
      const p = xe("dsfr-button");
      return i(), f("li", Mv, [
        u.url === "" ? (i(), j(p, W({
          key: 0,
          tabindex: "-1",
          role: "menuitem",
          label: u.label,
          id: `${R(o)}_item_${R(s)}`,
          icon: u.icon,
          tertiary: "",
          "no-outline": "",
          "icon-left": "",
          class: "fr-nav__link"
        }, u.$attrs), null, 16, ["label", "id", "icon"])) : (i(), f("a", W({
          key: 1,
          tabindex: "-1",
          role: "menuitem",
          id: `${R(o)}_item_${R(s)}`,
          href: u.url,
          class: l
        }, u.$attrs), h(u.label), 17, Lv))
      ]);
    };
  }
}), Sv = /* @__PURE__ */ Le(Bv, [["__scopeId", "data-v-2b0119ca"]]), Av = ["for", "id"], $v = {
  key: 0,
  class: "required"
}, Ov = {
  key: 0,
  class: "fr-hint-text"
}, Rv = ["id", "onKeydown", "aria-labelledby", "aria-disabled", "aria-controls", "aria-expanded", "aria-required"], Fv = { class: "grow overflow" }, Nv = { class: "fr-pl-1v fr-select__icon" }, Vv = ["id", "onKeydown"], qv = {
  key: 0,
  class: "fr-btns-group fr-btns-group--icon-left"
}, jv = ["id"], Hv = {
  key: 1,
  class: "fr-input-wrap fr-icon-search-line fr-mb-3v"
}, Wv = ["id"], Kv = {
  key: 2,
  class: "fr-label fr-mb-2v"
}, Qv = {
  key: 0,
  class: "fr-hint-text"
}, Yv = {
  role: "listbox",
  "aria-multiselectable": "true",
  class: "fr-select__ul"
}, zv = ["aria-selected"], Gv = ["id", "data-id", "value"], Xv = ["for"], Uv = ["id"], Zv = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "DsfrSelectMultiple",
  props: /* @__PURE__ */ Be({
    required: { type: Boolean },
    disabled: { type: Boolean },
    id: { default: () => Fe("select-multiple") },
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
    } = cn(), o = n, s = K(!1), u = _e(n, "modelValue"), d = K(o.options);
    pe(s, (B, N) => {
      B !== N && (r(B), B ? (document.addEventListener("click", A), document.addEventListener("touchstart", A)) : (document.removeEventListener("click", A), document.removeEventListener("touchstart", A)));
    });
    const p = K(null), m = K(null), k = K(null), E = _(() => o.errorMessage || o.successMessage), I = _(() => o.errorMessage !== "" ? "error" : "valid"), S = _(() => o.modelValue.length === d.value.length ? "fr-icon-close-circle-line" : "fr-icon-check-line"), w = _(() => o.modelValue.length === d.value.length ? "Tout déselectionner" : "Tout sélectionner"), x = _(() => {
      let N = `${o.options.filter((X) => o.modelValue.includes(X.value)).length} options séléctionnées`;
      return o.modelValue.length > 2 ? N : o.options.filter((X) => o.modelValue.includes(X.value)).map((X) => X.text).join(", ");
    });
    let T = function() {
      if (o.modelValue.length >= d.value.length)
        o.modelValue.length = 0;
      else {
        const B = d.value.filter((N) => !o.modelValue.includes(N.value));
        for (let N of B)
          o.modelValue.push(N.value);
      }
    }, M = function(B) {
      const N = B.target.value.toLowerCase();
      d.value = o.options.filter((X) => X.text.toLowerCase().indexOf(N) > -1);
    };
    const D = (B, N) => {
      const X = N === "down" ? (B + 1) % d.value.length : (B - 1 + d.value.length) % d.value.length, z = document.getElementById(`${o.id}_option_${X}`);
      return z.ariaDisabled === "true" ? D(X, N) : z;
    }, b = (B) => {
      const N = document.activeElement.id, X = N.startsWith(`${o.id}_option_`) ? Number(N.split("_")[2]) : B === "down" ? -1 : 0;
      D(X, B).focus();
    }, v = (B) => b("down"), g = (B) => b("up");
    let C = function(B) {
      B.shiftKey || (o.comboHasButton ? s.value || (s.value = !0, B.preventDefault(), setTimeout(() => m.value.focus(), 100)) : o.comboHasFilter && (s.value || (s.value = !0, B.preventDefault(), setTimeout(() => k.value.focus(), 100))));
    }, q = function(B) {
      B.shiftKey || ((o.comboHasButton && !o.comboHasFilter && document.activeElement.id === `${o.id}_button` || o.comboHasFilter && document.activeElement.id === `${o.id}_filter`) && (B.preventDefault(), s.value = !1), !o.comboHasFilter && !o.comboHasButton && (s.value = !1));
    }, Y = function(B) {
      document.activeElement.id.startsWith(`${o.id}_option_`) && (o.comboHasFilter ? (B.preventDefault(), k.value.focus()) : o.comboHasButton && m.value.focus());
    }, P = (B) => {
      let N = B.key;
      if (N.length > 1 && N.match(/\S/) || document.activeElement.id === `${o.id}_filter`)
        return;
      N = N.toLowerCase();
      let X = d.value.filter((ee) => ee.text.toLowerCase().startsWith(N)), z = document.activeElement.id;
      for (let ee of X) {
        let le = document.querySelector(`[data-id='${ee.value}']`);
        if (z !== le.id) {
          le.focus();
          break;
        }
      }
    }, A = (B) => {
      p.value.contains(B.target) || (s.value = !1);
    };
    return (B, N) => {
      const X = xe("v-icon");
      return i(), f(Q, null, [
        c("div", W({
          ref_key: "container",
          ref: p,
          class: ["fr-select-group", { [`fr-select-group--${I.value}`]: E.value !== "" }],
          onKeyup: N[13] || (N[13] = J(
            //@ts-ignore
            (...z) => R(A) && R(A)(...z),
            ["tab"]
          ))
        }, B.$attrs), [
          c("label", {
            class: "fr-label",
            for: B.id,
            id: `${B.id}_label`
          }, [
            L(B.$slots, "label", {}, () => [
              F(h(B.label) + " ", 1),
              L(B.$slots, "required-tip", {}, () => [
                B.required ? (i(), f("span", $v, " *")) : y("", !0)
              ], !0)
            ], !0),
            B.description ? (i(), f("span", Ov, h(B.description), 1)) : y("", !0)
          ], 8, Av),
          c("div", {
            id: B.id,
            class: O([{ [`fr-select--${I.value}`]: E.value !== "" }, "fr-input fr-select--menu flex"]),
            onClick: N[0] || (N[0] = (z) => s.value = !s.value),
            onKeydown: [
              N[1] || (N[1] = J(te((z) => s.value = !1, ["stop"]), ["esc"])),
              N[2] || (N[2] = J(te((z) => s.value = !s.value, ["prevent"]), ["space"])),
              J(te(v, ["prevent"]), ["down"]),
              J(te(g, ["prevent"]), ["up"]),
              N[3] || (N[3] = J(
                //@ts-ignore
                (...z) => R(C) && R(C)(...z),
                ["tab"]
              )),
              N[4] || (N[4] = //@ts-ignore
              (...z) => R(P) && R(P)(...z))
            ],
            tabindex: "0",
            role: "combobox",
            "aria-haspopup": "listbox",
            "aria-autocomplete": "none",
            "aria-labelledby": `${B.id}_label`,
            "aria-disabled": B.disabled,
            "aria-controls": `${B.id}_list`,
            "aria-expanded": s.value,
            "aria-required": B.required
          }, [
            c("p", Fv, h(x.value), 1),
            c("div", Nv, [
              ne(X, {
                style: { "font-size": "1rem" },
                name: "ri-arrow-down-s-line"
              })
            ])
          ], 42, Rv),
          c("div", {
            id: `${B.id}_list`,
            ref_key: "collapse",
            ref: t,
            class: O(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": R(a), "fr-collapsing": R(e) }]),
            onKeyup: N[8] || (N[8] = J((z) => s.value = !1, ["esc"])),
            onKeydown: [
              N[9] || (N[9] = J(
                //@ts-ignore
                (...z) => R(q) && R(q)(...z),
                ["tab"]
              )),
              J(te(v, ["prevent"]), ["down"]),
              J(te(g, ["prevent"]), ["up"]),
              N[10] || (N[10] = J(te(
                //@ts-ignore
                (...z) => R(Y) && R(Y)(...z),
                ["shift"]
              ), ["tab"])),
              N[11] || (N[11] = //@ts-ignore
              (...z) => R(P) && R(P)(...z))
            ],
            onTransitionend: N[12] || (N[12] = (z) => R(l)(s.value))
          }, [
            B.comboHasButton ? (i(), f("ul", qv, [
              c("li", null, [
                c("button", {
                  class: O(["fr-btn fr-btn--tertiary fr-btn--sm", `${S.value}`]),
                  id: `${B.id}_button`,
                  onClick: N[5] || (N[5] = (z) => R(T)()),
                  ref_key: "button",
                  ref: m,
                  type: "button"
                }, h(w.value), 11, jv)
              ])
            ])) : y("", !0),
            B.comboHasFilter ? (i(), f("div", Hv, [
              c("input", {
                class: "fr-input",
                id: `${B.id}_filter`,
                ref_key: "filter",
                ref: k,
                onInput: N[6] || (N[6] = //@ts-ignore
                (...z) => R(M) && R(M)(...z)),
                "aria-label": "Rechercher une option",
                placeholder: "Rechercher",
                type: "text"
              }, null, 40, Wv)
            ])) : y("", !0),
            B.comboLabel ? (i(), f("p", Kv, [
              F(h(B.comboLabel) + " ", 1),
              B.comboDescription ? (i(), f("span", Qv, h(B.comboDescription), 1)) : y("", !0)
            ])) : y("", !0),
            c("ul", Yv, [
              (i(!0), f(Q, null, Z(d.value, (z, ee) => (i(), f("li", {
                class: "fr-checkbox-group fr-checkbox-group--sm fr-py-1v",
                role: "option",
                "aria-selected": u.value.includes(z.value)
              }, [
                Se(c("input", {
                  id: `${B.id}_option_${ee}`,
                  "data-id": z.value,
                  type: "checkbox",
                  class: "",
                  tabindex: "-1",
                  value: z.value,
                  "onUpdate:modelValue": N[7] || (N[7] = (le) => u.value = le)
                }, null, 8, Gv), [
                  [st, u.value]
                ]),
                c("label", {
                  class: "fr-label",
                  for: `${B.id}_option_${ee}`
                }, h(z.text), 9, Xv)
              ], 8, zv))), 256))
            ])
          ], 42, Vv)
        ], 16),
        E.value ? (i(), f("p", {
          key: 0,
          id: `select-${I.value}-desc-${I.value}`,
          class: O(`fr-${I.value}-text`)
        }, h(E.value), 11, Uv)) : y("", !0)
      ], 64);
    };
  }
}), Jv = /* @__PURE__ */ Le(Zv, [["__scopeId", "data-v-9f294603"]]), eg = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], tg = ["id", "aria-labelledby", "onKeydown"], ng = {
  key: 0,
  class: "fr-label fr-mb-0"
}, ag = {
  key: 0,
  class: "fr-hint-text"
}, rg = {
  class: "fr-menu-header__list fr-mx-n4v fr-pt-2v fr-mb-0",
  role: "none"
}, lg = { role: "none" }, og = { class: "fr-p-2v" }, sg = ["id", "href"], ig = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "DsfrHeaderMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Fe("header-menu") },
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
    } = cn(), o = n, s = K(null), u = K(!1);
    let d = K(0), p = [];
    const m = (T, M) => {
      d.value += 1, p.push(`${T}@${M}`);
    };
    Oe("menuItem", { menuItemIndex: d, addMenuItem: m }), Oe("id", o.id), pe(u, (T, M) => {
      T !== M && (r(T), T ? (setTimeout(() => I(), 100), document.addEventListener("click", x), document.addEventListener("touchstart", x)) : (document.removeEventListener("click", x), document.removeEventListener("touchstart", x)));
    }), ye(() => {
      m(o.logoutLabel, d.value);
    });
    const k = (T, M) => {
      const D = M === "down" ? (T + 1) % p.length : (T - 1 + p.length) % p.length, b = document.getElementById(`${o.id}_item_${D}`);
      return b.ariaDisabled === "true" ? k(D, M) : b;
    }, E = (T) => {
      const M = document.activeElement.id, D = M.startsWith(`${o.id}_item_`) ? Number(M.split("_")[2]) : T === "down" ? -1 : 0;
      k(D, T).focus();
    }, I = (T) => E("down"), S = (T) => E("up");
    let w = (T) => {
      let M = T.key;
      if (M.length > 1 && M.match(/\S/))
        return;
      M = M.toLowerCase();
      let D = p.filter((v) => v.toLowerCase().startsWith(M)), b = document.activeElement.id;
      for (let v of D) {
        let g = v.split("@")[1], C = document.getElementById(`${o.id}_item_${g}`);
        if (b !== C.id) {
          C.focus();
          break;
        }
      }
    }, x = (T) => {
      s.value.contains(T.target) || (u.value = !1);
    };
    return (T, M) => (i(), f("div", {
      class: "relative-position fr-menu-header",
      onKeyup: M[9] || (M[9] = J(
        //@ts-ignore
        (...D) => R(x) && R(x)(...D),
        ["tab"]
      )),
      ref_key: "container",
      ref: s
    }, [
      c("button", W({
        id: T.id,
        onClick: M[0] || (M[0] = te((D) => u.value = !u.value, ["prevent", "stop"])),
        onKeyup: [
          M[1] || (M[1] = J(te((D) => u.value = !1, ["stop"]), ["esc"])),
          M[2] || (M[2] = J(te((D) => u.value = !u.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          J(te(I, ["prevent"]), ["down"]),
          J(te(S, ["prevent"]), ["up"]),
          M[3] || (M[3] = //@ts-ignore
          (...D) => R(w) && R(w)(...D)),
          M[4] || (M[4] = J((D) => u.value = !1, ["tab"]))
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
        class: O(["fr-collapse fr-menu fr-menu-header__modal fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": R(a), "fr-collapsing": R(e) }]),
        role: "menu",
        "aria-labelledby": T.id,
        onKeyup: M[5] || (M[5] = J((D) => u.value = !1, ["esc"])),
        onKeydown: [
          M[6] || (M[6] = J((D) => u.value = !1, ["tab"])),
          J(te(I, ["prevent"]), ["down"]),
          J(te(S, ["prevent"]), ["up"]),
          M[7] || (M[7] = //@ts-ignore
          (...D) => R(w) && R(w)(...D))
        ],
        onTransitionend: M[8] || (M[8] = (D) => R(l)(u.value))
      }, [
        L(T.$slots, "detail", {}, () => [
          T.nom === "" && T.email === "" ? y("", !0) : (i(), f("p", ng, [
            F(h(T.nom) + " ", 1),
            T.email !== "" ? (i(), f("span", ag, h(T.email), 1)) : y("", !0)
          ]))
        ], !0),
        c("ul", rg, [
          L(T.$slots, "default", {}, void 0, !0),
          c("li", lg, [
            c("div", og, [
              T.logoutUrl !== "" ? (i(), f("a", {
                key: 0,
                id: `${T.id}_item_${R(d) - 1}`,
                class: "fr-btn fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left",
                role: "menuitem",
                tabindex: "-1",
                href: T.logoutUrl
              }, h(T.logoutLabel), 9, sg)) : y("", !0)
            ])
          ])
        ])
      ], 42, tg)
    ], 544));
  }
}), ug = /* @__PURE__ */ Le(ig, [["__scopeId", "data-v-02c20dce"]]), dg = Symbol("header"), cg = ["aria-label"], fg = { class: "fr-btns-group" }, Yt = /* @__PURE__ */ $({
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
        (i(!0), f(Q, null, Z(a.links, (l, o) => (i(), f("li", { key: o }, [
          ne(R(ln), W({ ref_for: !0 }, l, {
            "on-click": (s) => {
              var u;
              e("linkClick", s), (u = l.onClick) == null || u.call(l, s);
            }
          }), null, 16, ["on-click"])
        ]))), 128)),
        L(a.$slots, "default")
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
}, xg = ["aria-label", "title", "data-fr-opened"], Ig = ["aria-label", "title"], Dg = {
  key: 0,
  class: "fr-header__service"
}, Tg = { class: "fr-header__service-title" }, Cg = {
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
}, Bg = { class: "fr-header__search fr-modal" }, Sg = ["aria-label"], Ag = { class: "fr-container" }, $g = { class: "fr-header__menu-links" }, Og = {
  key: 1,
  class: "flex justify-center items-center"
}, Rg = { class: "fr-header__menu fr-modal" }, Fg = {
  key: 0,
  class: "fr-container"
}, Ng = /* @__PURE__ */ $({
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
    const e = n, a = t, r = ot(e, "languageSelector"), l = K(!1), o = K(!1), s = K(!1), u = () => {
      var w;
      s.value = !1, l.value = !1, o.value = !1, (w = document.getElementById("button-menu")) == null || w.focus();
    }, d = (w) => {
      w.key === "Escape" && u();
    };
    ye(() => {
      document.addEventListener("keydown", d), a("on-mounted");
    }), Ce(() => {
      document.removeEventListener("keydown", d);
    });
    const p = () => {
      s.value = !0, l.value = !0, o.value = !1, setTimeout(() => {
        var w;
        (w = document.getElementById("close-button")) == null || w.focus();
      });
    }, m = () => {
      s.value = !0, l.value = !1, o.value = !0;
    }, k = u, E = zt(), I = _(() => {
      var w;
      return !!((w = E.operator) != null && w.call(E).length) || !!e.operatorImgSrc;
    }), S = _(() => !!E.mainnav);
    return Oe(dg, () => u), (w, x) => {
      var M, D, b;
      const T = xe("RouterLink");
      return i(), f("header", pg, [
        c("div", mg, [
          c("div", hg, [
            c("div", vg, [
              c("div", gg, [
                c("div", bg, [
                  c("div", yg, [
                    ne(T, {
                      to: w.homeTo,
                      title: `${w.homeLabel} - ${w.serviceTitle}`
                    }, {
                      default: U(() => [
                        ne(R(at), {
                          "logo-text": w.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  I.value ? (i(), f("div", kg, [
                    L(w.$slots, "operator", {}, () => [
                      w.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: w.operatorImgSrc,
                        alt: w.operatorImgAlt,
                        style: De(w.operatorImgStyle)
                      }, null, 12, wg)) : y("", !0)
                    ])
                  ])) : y("", !0),
                  w.showSearch || S.value || (M = w.quickLinks) != null && M.length ? (i(), f("div", _g, [
                    w.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": w.showSearchLabel,
                      title: w.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: x[0] || (x[0] = te((v) => m(), ["prevent", "stop"]))
                    }, null, 8, xg)) : y("", !0),
                    S.value || (D = w.quickLinks) != null && D.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "dialog",
                      "aria-label": w.menuLabel,
                      title: w.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: x[1] || (x[1] = te((v) => p(), ["prevent", "stop"]))
                    }, null, 8, Ig)) : y("", !0)
                  ])) : y("", !0)
                ]),
                w.serviceTitle ? (i(), f("div", Dg, [
                  ne(T, W({
                    to: w.homeTo,
                    title: `${w.homeLabel} - ${w.serviceTitle}`
                  }, w.$attrs), {
                    default: U(() => [
                      c("p", Tg, [
                        F(h(w.serviceTitle) + " ", 1),
                        w.showBeta ? (i(), f("span", Cg, " BETA ")) : y("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  w.serviceDescription ? (i(), f("p", Eg, h(w.serviceDescription), 1)) : y("", !0)
                ])) : y("", !0),
                !w.serviceTitle && w.showBeta ? (i(), f("div", Pg, x[9] || (x[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : y("", !0)
              ]),
              c("div", Mg, [
                (b = w.quickLinks) != null && b.length || r.value ? (i(), f("div", Lg, [
                  L(w.$slots, "before-quick-links"),
                  l.value ? y("", !0) : (i(), j(Yt, {
                    key: 0,
                    links: w.quickLinks,
                    "nav-aria-label": w.quickLinksAriaLabel
                  }, {
                    default: U(() => [
                      L(w.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label"])),
                  L(w.$slots, "after-quick-links"),
                  r.value ? (i(), j(R(rt), W({ key: 1 }, r.value, {
                    onSelect: x[2] || (x[2] = (v) => a("language-select", v))
                  }), null, 16)) : y("", !0)
                ])) : y("", !0),
                c("div", Bg, [
                  L(w.$slots, "header-search"),
                  w.showSearch ? (i(), j(R(lt), {
                    key: 0,
                    "searchbar-id": w.searchbarId,
                    label: w.searchLabel,
                    "model-value": w.modelValue,
                    placeholder: w.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": x[3] || (x[3] = (v) => a("update:modelValue", v)),
                    onSearch: x[4] || (x[4] = (v) => a("search", v))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])) : y("", !0)
                ])
              ])
            ]),
            w.showSearch || S.value || w.quickLinks && w.quickLinks.length || r.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: O(["fr-header__menu fr-modal", { "fr-modal--opened": s.value }]),
              "aria-label": w.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", Ag, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: x[5] || (x[5] = te((v) => u(), ["prevent", "stop"]))
                }, h(w.closeMenuModalLabel), 1),
                c("div", $g, [
                  r.value ? (i(), j(R(rt), W({ key: 0 }, r.value, {
                    onSelect: x[6] || (x[6] = (v) => r.value.currentLanguage = v.codeIso)
                  }), null, 16)) : y("", !0),
                  L(w.$slots, "before-quick-links"),
                  l.value ? (i(), j(Yt, {
                    key: 1,
                    role: "navigation",
                    links: w.quickLinks,
                    "nav-aria-label": w.quickLinksAriaLabel,
                    onLinkClick: R(k)
                  }, {
                    default: U(() => [
                      L(w.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label", "onLinkClick"])) : y("", !0),
                  L(w.$slots, "after-quick-links"),
                  L(w.$slots, "header-search")
                ]),
                s.value ? L(w.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : y("", !0),
                o.value ? (i(), f("div", Og, [
                  ne(R(lt), {
                    "searchbar-id": w.searchbarId,
                    "model-value": w.modelValue,
                    placeholder: w.placeholder,
                    "onUpdate:modelValue": x[7] || (x[7] = (v) => a("update:modelValue", v)),
                    onSearch: x[8] || (x[8] = (v) => a("search", v))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : y("", !0)
              ])
            ], 10, Sg)) : y("", !0),
            L(w.$slots, "default")
          ])
        ]),
        c("div", Rg, [
          S.value && !s.value ? (i(), f("div", Fg, [
            L(w.$slots, "mainnav", { hidemodal: u })
          ])) : y("", !0)
        ])
      ]);
    };
  }
}), Vg = { class: "fr-table" }, qg = { class: "fr-table__wrapper" }, jg = { class: "fr-table__container" }, Hg = { class: "fr-table__content" }, Wg = ["id"], Kg = {
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
}, eb = { class: "fr-checkbox-group fr-checkbox-group--sm" }, tb = ["id", "value"], nb = ["for"], ab = ["onKeydown"], rb = { key: 0 }, lb = ["colspan"], ob = { class: "flex gap-2 items-center" }, sb = ["selected"], ib = ["value", "selected"], ub = { class: "flex ml-1" }, db = /* @__PURE__ */ $({
  __name: "DsfrCustomDataTable",
  props: /* @__PURE__ */ Be({
    id: { default: () => Fe("table") },
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
    currentPage: { default: 0 },
    currentPageModifiers: {},
    sortedBy: { default: void 0 },
    sortedByModifiers: {},
    sortedDesc: { default: !1 },
    sortedDescModifiers: {}
  }),
  emits: /* @__PURE__ */ Be(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(n, { emit: t }) {
    const e = n, a = t, r = _e(n, "selection"), l = _e(n, "rowsPerPage"), o = _e(n, "currentPage"), s = _(() => Math.max(Math.ceil(e.rows.length / l.value), 1)), u = _(() => e.pages ?? Array.from({ length: s.value }).map((v, g) => ({
      label: `${g + 1}`,
      title: `Page ${g + 1}`,
      href: `#${g + 1}`
    }))), d = _(() => o.value * l.value), p = _(() => (o.value + 1) * l.value), m = _(() => ["sm", "small"].includes(e.footerSize)), k = _e(n, "sortedBy");
    k.value = e.sorted;
    const E = _e(n, "sortedDesc");
    function I(v, g) {
      const C = k.value;
      return (v[C] ?? v) < (g[C] ?? g) ? -1 : (v[C] ?? v) > (g[C] ?? g) ? 1 : 0;
    }
    function S(v) {
      if (!(!e.sortableRows || Array.isArray(e.sortableRows) && !e.sortableRows.includes(v))) {
        if (k.value === v) {
          if (E.value) {
            k.value = void 0, E.value = !1;
            return;
          }
          E.value = !0;
          return;
        }
        E.value = !1, k.value = v;
      }
    }
    const w = _(() => {
      const v = k.value ? e.rows.slice().sort(e.sortFn ?? I) : e.rows.slice();
      return E.value && v.reverse(), v;
    }), x = _(() => {
      const v = e.headersRow.map((C) => typeof C != "object" ? C : C.key), g = w.value.map((C) => Array.isArray(C) ? C : v.map((q) => C));
      return e.pagination ? g.slice(d.value, p.value) : g;
    });
    function T(v) {
      v && (r.value = x.value.map((g) => g[0][e.rowKey])), r.value.length = 0;
    }
    const M = _(() => r.value.length === x.value.length);
    function D() {
      a("update:current-page", 0), r.value.length = 0;
    }
    function b(v) {
      navigator.clipboard.writeText(v);
    }
    return (v, g) => (i(), f("div", Vg, [
      c("div", qg, [
        c("div", jg, [
          c("div", Hg, [
            c("table", { id: v.id }, [
              c("caption", {
                class: O({ "fr-sr-only": v.noCaption })
              }, h(v.title), 3),
              c("thead", null, [
                c("tr", null, [
                  v.selectableRows ? (i(), f("th", Kg, [
                    v.showToggleAll ? (i(), f("div", Qg, [
                      c("input", {
                        id: `table-select--${v.id}-all`,
                        checked: M.value,
                        type: "checkbox",
                        onInput: g[0] || (g[0] = (C) => T(C.target.checked))
                      }, null, 40, Yg),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${v.id}-all`
                      }, " Sélectionner tout ", 8, zg)
                    ])) : y("", !0)
                  ])) : y("", !0),
                  (i(!0), f(Q, null, Z(v.headersRow, (C, q) => (i(), f("th", W({
                    key: typeof C == "object" ? C.key : C,
                    scope: "col",
                    ref_for: !0
                  }, typeof C == "object" && C.headerAttrs, {
                    class: {
                      "text-right": C.align === "right",
                      "text-left": C.align === "left"
                    },
                    tabindex: v.sortableRows ? 0 : void 0,
                    onClick: (Y) => S(C.key ?? (Array.isArray(v.rows[0]) ? q : C)),
                    onKeydown: [
                      J((Y) => S(C.key ?? C), ["enter"]),
                      J((Y) => S(C.key ?? C), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: O({
                        "sortable-header": v.sortableRows === !0 || Array.isArray(v.sortableRows) && v.sortableRows.includes(C.key ?? C),
                        "fr-sr-only": typeof C == "object" ? C.hideLabel : !1,
                        "flex-row-reverse": typeof C == "object" ? C.align === "right" : !1
                      })
                    }, [
                      L(v.$slots, "header", W({ ref_for: !0 }, typeof C == "object" ? C : { key: C, label: C }), () => [
                        F(h(typeof C == "object" ? C.label : C), 1)
                      ], !0),
                      k.value !== (C.key ?? C) && (v.sortableRows === !0 || Array.isArray(v.sortableRows) && v.sortableRows.includes(C.key ?? C)) ? (i(), f("span", Xg, [
                        ne(R(be), {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : k.value === (C.key ?? C) ? (i(), f("span", Ug, [
                        ne(R(be), {
                          name: E.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : y("", !0)
                    ], 2)
                  ], 16, Gg))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(Q, null, Z(x.value, (C, q) => (i(), f("tr", {
                  key: `row-${q}`,
                  "data-row-key": q + 1
                }, [
                  v.selectableRows ? (i(), f("th", Jg, [
                    c("div", eb, [
                      Se(c("input", {
                        id: `row-select-${v.id}-${q}`,
                        "onUpdate:modelValue": g[1] || (g[1] = (Y) => r.value = Y),
                        value: C[0][v.rowKey] ?? `row-${q}`,
                        type: "checkbox"
                      }, null, 8, tb), [
                        [st, r.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${v.id}-${q}`
                      }, " Sélectionner la ligne " + h(q + 1), 9, nb)
                    ])
                  ])) : y("", !0),
                  (i(!0), f(Q, null, Z(C, (Y, P) => (i(), f("td", {
                    key: typeof Y == "object" ? Y[v.rowKey] : Y,
                    tabindex: "0",
                    class: O({
                      "text-right": v.headersRow[P].align === "right",
                      "text-left": v.headersRow[P].align === "left"
                    }),
                    onKeydown: [
                      J(te((A) => b(typeof Y == "object" ? Y[v.rowKey] : Y), ["ctrl"]), ["c"]),
                      J(te((A) => b(typeof Y == "object" ? Y[v.rowKey] : Y), ["meta"]), ["c"])
                    ]
                  }, [
                    L(v.$slots, "cell", W({ ref_for: !0 }, {
                      colKey: typeof v.headersRow[P] == "object" ? v.headersRow[P].key : v.headersRow[P],
                      cell: Y,
                      idx: q + 1
                    }), () => [
                      F(h(typeof Y == "object" ? Y[v.rowKey] : Y), 1)
                    ], !0)
                  ], 42, ab))), 128))
                ], 8, Zg))), 128)),
                x.value.length === 0 ? (i(), f("tr", rb, [
                  c("td", {
                    colspan: v.selectableRows ? v.headersRow.length + 1 : v.headersRow.length
                  }, h(e.noResultLabel), 9, lb)
                ])) : y("", !0)
              ])
            ], 8, Wg)
          ])
        ])
      ]),
      c("div", {
        class: O(v.bottomActionBarClass)
      }, [
        L(v.$slots, "pagination", {}, () => [
          v.pagination && !v.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: O(["flex justify-between items-center", v.paginationWrapperClass])
          }, [
            v.showNbRows ? (i(), f("p", {
              key: 0,
              class: O(["fr-mb-0 fr-ml-1v", { "fr-text--sm": m.value }])
            }, h(v.rows.length) + " résulat(s)", 3)) : y("", !0),
            c("div", ob, [
              c("label", {
                class: O(["fr-label", { "fr-text--sm": m.value }]),
                for: "pagination-options"
              }, " Résultats par page : ", 2),
              Se(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": g[2] || (g[2] = (C) => l.value = C),
                class: "fr-select",
                onChange: g[3] || (g[3] = (C) => D())
              }, [
                c("option", {
                  value: "",
                  selected: !v.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, sb),
                (i(!0), f(Q, null, Z(v.paginationOptions, (C, q) => (i(), f("option", {
                  key: q,
                  value: C,
                  selected: +C === l.value
                }, h(C), 9, ib))), 128))
              ], 544), [
                [Gt, l.value]
              ])
            ]),
            c("div", ub, [
              c("span", {
                class: O(["self-center", { "fr-text--sm": m.value }])
              }, " Page " + h(o.value + 1) + " sur " + h(s.value), 3)
            ]),
            ne(R(rn), {
              "current-page": o.value,
              "onUpdate:currentPage": [
                g[4] || (g[4] = (C) => o.value = C),
                g[5] || (g[5] = (C) => r.value.length = 0)
              ],
              pages: u.value,
              "next-page-title": "Précédent",
              "prev-page-title": "Suivant"
            }, null, 8, ["current-page", "pages"])
          ], 2)) : y("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), cb = /* @__PURE__ */ Le(db, [["__scopeId", "data-v-95a02119"]]), fb = ["id", "name", "value", "checked", "required", "data-testid", "data-test", "tabindex"], pb = ["for"], mb = {
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
}, gb = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "DsfrCustomCheckbox",
  props: /* @__PURE__ */ Be({
    id: { default: () => Fe("basic", "checkbox") },
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
    kt((l) => ({
      "183645a5": l.readonlyOpacity
    }));
    const t = n, e = _(() => t.errorMessage || t.validMessage), a = _(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = _e(n, "modelValue");
    return (l, o) => (i(), f("div", {
      class: O(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline, readonly: l.readonly }])
    }, [
      c("div", {
        class: O(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        Se(c("input", W({
          id: l.id,
          "onUpdate:modelValue": o[0] || (o[0] = (s) => r.value = s),
          name: l.name,
          type: "checkbox",
          value: l.value,
          checked: r.value === !0 || Array.isArray(r.value) && r.value.includes(l.value),
          required: l.required
        }, l.$attrs, {
          "data-testid": `input-checkbox-${l.id}`,
          "data-test": `input-checkbox-${l.id}`,
          tabindex: l.readonly ? -1 : void 0
        }), null, 16, fb), [
          [st, r.value]
        ]),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          L(l.$slots, "label", {}, () => [
            F(h(l.label) + " ", 1),
            L(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", mb, " *")) : y("", !0)
            ], !0)
          ], !0),
          l.hint ? (i(), f("span", hb, [
            L(l.$slots, "hint", {}, () => [
              F(h(l.hint), 1)
            ], !0)
          ])) : y("", !0)
        ], 8, pb),
        e.value ? (i(), f("div", vb, [
          c("p", {
            class: O(["fr-message--info flex items-center", a.value])
          }, h(e.value), 3)
        ])) : y("", !0)
      ], 2)
    ], 2));
  }
}), bb = /* @__PURE__ */ Le(gb, [["__scopeId", "data-v-dbd8cd72"]]), yb = ["id"], kb = /* @__PURE__ */ $({
  __name: "DsfrComponentTooltip",
  props: {
    id: { default: () => Fe("tooltip") },
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
  setup(n) {
    const t = n, e = K(!1), a = K(null), r = K(null), l = K("0px"), o = K("0px"), s = K("0px"), u = K(!1), d = K(0);
    async function p() {
      var X, z, ee, le, oe, Ie;
      if (typeof document > "u" || !e.value || r.value.matches(":empty"))
        return;
      await new Promise((Ee) => setTimeout(Ee, 100));
      const b = (X = a.value) == null ? void 0 : X.getBoundingClientRect().top, v = (z = a.value) == null ? void 0 : z.offsetHeight, g = (ee = a.value) == null ? void 0 : ee.offsetWidth, C = (le = a.value) == null ? void 0 : le.getBoundingClientRect().left, q = (oe = r.value) == null ? void 0 : oe.offsetHeight, Y = (Ie = r.value) == null ? void 0 : Ie.offsetWidth, A = !(b - q < 0) && b + v + q >= document.documentElement.offsetHeight;
      u.value = A;
      const B = C + g >= document.documentElement.offsetWidth, N = C + g / 2 - Y / 2 <= 0;
      o.value = A ? `${b - q + 8}px` : `${b + v - 8}px`, d.value = 1, l.value = B ? `${C + g - Y - 4}px` : N ? `${C + 4}px` : `${C + g / 2 - Y / 2}px`, s.value = B ? `${Y / 2 - g / 2 + 4}px` : N ? `${-(Y / 2) + g / 2 - 4}px` : "0px";
    }
    pe(e, p, { immediate: !0 }), ye(() => {
      window.addEventListener("scroll", p), a.value.addEventListener("click", e.value = !1);
    }), Ce(() => {
      window.removeEventListener("scroll", p);
    });
    const m = _(() => ["sm", "small"].includes(t.size)), k = _(() => ["md", "medium"].includes(t.size)), E = _(() => ["lg", "large"].includes(t.size)), I = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), S = _(() => `transform: translate(${l.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${d.value};'`), w = _(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), x = (b) => {
      var v, g;
      e.value && (b.target === a.value || (v = a.value) != null && v.contains(b.target) || b.target === r.value || (g = r.value) != null && g.contains(b.target) || (e.value = !1));
    }, T = (b) => {
      b.key === "Escape" && (e.value = !1);
    };
    ye(() => {
      document.documentElement.addEventListener("click", x), document.documentElement.addEventListener("keydown", T);
    }), Ce(() => {
      document.documentElement.removeEventListener("click", x), document.documentElement.removeEventListener("keydown", T);
    });
    const M = () => {
      e.value = !0;
    }, D = () => {
      e.value = !1;
    };
    return (b, v) => (i(), f(Q, null, [
      (i(), j(ge(b.href !== "" ? "a" : "button"), W({
        id: `button-${b.id}`,
        ref_key: "source",
        ref: a,
        href: b.href !== "" ? b.href : void 0,
        class: {
          "fr-link": b.isLink && !b.inline,
          "fr-btn": !b.isLink,
          "fr-btn--secondary": b.secondary && !b.tertiary,
          "fr-btn--tertiary": b.tertiary && !b.secondary && !b.noOutline,
          "fr-btn--tertiary-no-outline": b.tertiary && !b.secondary && b.noOutline,
          "fr-btn--sm": m.value,
          "fr-btn--md": k.value,
          "fr-btn--lg": E.value,
          "fr-btn--icon-right": !b.isLink && !b.iconOnly && I.value && b.iconRight,
          "fr-btn--icon-left": !b.isLink && !b.iconOnly && I.value && !b.iconRight,
          "fr-link--icon-right": b.isLink && !b.inline && !b.iconOnly && I.value && b.iconRight,
          "fr-link--icon-left": b.isLink && !b.inline && !b.iconOnly && I.value && !b.iconRight,
          "inline-flex": !I.value,
          reverse: b.iconRight && !I.value,
          "fr-btn--custom-tooltip": b.iconOnly,
          "justify-center": !I.value && b.iconOnly,
          [b.icon]: I.value
        },
        "aria-labelledby": b.id,
        onMouseenter: v[0] || (v[0] = (g) => M()),
        onMouseleave: v[1] || (v[1] = (g) => D()),
        onFocus: v[2] || (v[2] = (g) => M()),
        onBlur: v[3] || (v[3] = (g) => D())
      }, b.$attrs), {
        default: U(() => [
          F(h(b.label), 1)
        ]),
        _: 1
      }, 16, ["id", "href", "class", "aria-labelledby"])),
      c("p", {
        id: b.id,
        ref_key: "tooltip",
        ref: r,
        class: O(["fr-tooltip fr-placement", w.value]),
        style: De(S.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, [
        L(b.$slots, "default", {}, () => [
          F(h(b.content), 1)
        ], !0)
      ], 14, yb)
    ], 64));
  }
}), tr = /* @__PURE__ */ Le(kb, [["__scopeId", "data-v-45f74cc0"]]), wb = /* @__PURE__ */ $({
  __name: "DsfrButtonTooltip",
  setup(n) {
    return (t, e) => (i(), j(tr, W({ "is-link": !1 }, t.$attrs), {
      default: U(() => [
        L(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), _b = /* @__PURE__ */ $({
  __name: "DsfrLinkTooltip",
  props: {
    asButton: { type: Boolean, default: !1 }
  },
  setup(n) {
    return (t, e) => (i(), j(tr, W({
      "is-link": !t.asButton
    }, t.$attrs), {
      default: U(() => [
        L(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["is-link"]));
  }
}), xb = ["id", "href", "aria-disabled"], Ib = /* @__PURE__ */ $({
  __name: "DsfrLink",
  props: {
    id: { default: () => Fe("link") },
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
    const t = n, e = _(() => ["sm", "small"].includes(t.size)), a = _(() => ["md", "medium"].includes(t.size)), r = _(() => ["lg", "large"].includes(t.size)), l = _(() => t.asButton ? "btn" : "link"), o = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-"));
    return (s, u) => (i(), f("a", W({
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
        [`fr-${l.value}--md`]: a.value,
        [`fr-${l.value}--lg`]: r.value,
        [`fr-${l.value}--icon-right`]: !s.iconOnly && o.value && s.iconRight,
        [`fr-${l.value}--icon-left`]: !s.iconOnly && o.value && !s.iconRight,
        reverse: s.iconRight && !o.value,
        "fr-btn--custom-tooltip": s.iconOnly,
        "justify-center": !o.value && s.iconOnly,
        [s.icon]: o.value
      }
    }, s.$attrs), [
      L(s.$slots, "default", {}, () => [
        F(h(s.label), 1)
      ], !0)
    ], 16, xb));
  }
}), Db = /* @__PURE__ */ Le(Ib, [["__scopeId", "data-v-cc8b0ebe"]]), Tb = (n, t) => n.matches ? n.matches(t) : n.msMatchesSelector ? n.msMatchesSelector(t) : n.webkitMatchesSelector ? n.webkitMatchesSelector(t) : null, Cb = (n, t) => {
  let e = n;
  for (; e && e.nodeType === 1; ) {
    if (Tb(e, t))
      return e;
    e = e.parentNode;
  }
  return null;
}, Eb = (n, t) => n.closest ? n.closest(t) : Cb(n, t), Pb = (n) => !!(n && typeof n.then == "function");
class Mb {
  constructor({
    search: t,
    autoSelect: e = !1,
    setValue: a = () => {
    },
    setAttribute: r = () => {
    },
    onUpdate: l = () => {
    },
    onSubmit: o = () => {
    },
    onShow: s = () => {
    },
    autocorrect: u = !1,
    onHide: d = () => {
    },
    onLoading: p = () => {
    },
    onLoaded: m = () => {
    },
    submitOnEnter: k = !1
  } = {}) {
    V(this, "value", "");
    V(this, "searchCounter", 0);
    V(this, "results", []);
    V(this, "selectedIndex", -1);
    V(this, "selectedResult", null);
    V(this, "destroy", () => {
      this.search = null, this.setValue = null, this.setAttribute = null, this.onUpdate = null, this.onSubmit = null, this.autocorrect = null, this.onShow = null, this.onHide = null, this.onLoading = null, this.onLoaded = null;
    });
    V(this, "handleInput", (t) => {
      const { value: e } = t.target;
      this.updateResults(e), this.value = e;
    });
    V(this, "handleKeyDown", (t) => {
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
    V(this, "handleFocus", (t) => {
      const { value: e } = t.target;
      this.updateResults(e), this.value = e;
    });
    V(this, "handleBlur", () => {
      this.hideResults();
    });
    // The mousedown event fires before the blur event. Calling preventDefault() when
    // the results list is clicked will prevent it from taking focus, firing the
    // blur event on the input element, and closing the results list before click fires.
    V(this, "handleResultMouseDown", (t) => {
      t.preventDefault();
    });
    V(this, "handleResultClick", (t) => {
      const { target: e } = t, a = Eb(e, "[data-result-index]");
      if (a) {
        this.selectedIndex = parseInt(a.dataset.resultIndex, 10);
        const r = this.results[this.selectedIndex];
        this.selectResult(), this.onSubmit(r);
      }
    });
    V(this, "handleArrows", (t) => {
      const e = this.results.length;
      this.selectedIndex = (t % e + e) % e, this.onUpdate(this.results, this.selectedIndex);
    });
    V(this, "selectResult", () => {
      const t = this.results[this.selectedIndex];
      t && this.setValue(t), this.hideResults();
    });
    V(this, "updateResults", (t) => {
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
    V(this, "showResults", () => {
      this.setAttribute("aria-expanded", !0), this.onShow();
    });
    V(this, "hideResults", () => {
      this.selectedIndex = -1, this.results = [], this.setAttribute("aria-expanded", !1), this.setAttribute("aria-activedescendant", ""), this.onUpdate(this.results, this.selectedIndex), this.onHide();
    });
    // Make sure selected result isn't scrolled out of view
    V(this, "checkSelectedResultVisible", (t) => {
      const e = t.querySelector(
        `[data-result-index="${this.selectedIndex}"]`
      );
      if (!e)
        return;
      const a = t.getBoundingClientRect(), r = e.getBoundingClientRect();
      r.top < a.top ? t.scrollTop -= a.top - r.top : r.bottom > a.bottom && (t.scrollTop += r.bottom - a.bottom);
    });
    this.search = Pb(t) ? t : (E) => Promise.resolve(t(E)), this.autoSelect = e, this.setValue = a, this.setAttribute = r, this.onUpdate = l, this.onSubmit = o, this.autocorrect = u, this.onShow = s, this.onHide = d, this.onLoading = p, this.onLoaded = m, this.submitOnEnter = k;
  }
}
const Lb = (n, t) => {
  const e = n.getBoundingClientRect(), a = t.getBoundingClientRect();
  return /* 1 */ e.bottom + a.height > window.innerHeight && /* 2 */
  window.innerHeight - e.bottom < e.top && /* 3 */
  window.pageYOffset + e.top - a.height > 0 ? "above" : "below";
}, Bb = (n, t, e) => {
  let a;
  return function() {
    const l = this, o = arguments, s = function() {
      a = null, n.apply(l, o);
    };
    clearTimeout(a), a = setTimeout(s, t);
  };
}, Sb = (n) => {
  if (n != null && n.length) {
    const t = n.startsWith("#");
    return {
      attribute: t ? "aria-labelledby" : "aria-label",
      content: t ? n.substring(1) : n
    };
  }
}, Ab = {
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
    const n = new Mb({
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
    return this.debounceTime > 0 && (n.handleInput = Bb(n.handleInput, this.debounceTime)), {
      core: n,
      value: this.defaultValue,
      resultListId: `${this.baseClass}-result-list-${Qn()}`,
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
      const n = this.position === "below" ? "top" : "bottom", t = Sb(this.resultListLabel);
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
    !this.$refs.input || !this.$refs.resultList || (this.resetPosition && this.results.length > 0 && (this.resetPosition = !1, this.position = Lb(
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
function $b(n, t, e, a, r, l) {
  return i(), f("div", W({ ref: "root" }, {
    class: n.$attrs.class,
    ...n.$attrs.style ? { style: n.$attrs.style } : {}
  }), [
    L(n.$slots, "default", {
      rootProps: l.rootProps,
      inputProps: l.inputProps,
      inputListeners: l.inputListeners,
      resultListProps: l.resultListProps,
      resultListListeners: l.resultListListeners,
      results: r.results,
      resultProps: l.resultProps
    }, () => [
      c("div", Te(wt(l.rootProps)), [
        c("input", W({ ref: "input" }, l.inputProps, {
          onInput: t[0] || (t[0] = (...o) => l.handleInput && l.handleInput(...o)),
          onKeydown: t[1] || (t[1] = (...o) => r.core.handleKeyDown && r.core.handleKeyDown(...o)),
          onFocus: t[2] || (t[2] = (...o) => r.core.handleFocus && r.core.handleFocus(...o)),
          onBlur: t[3] || (t[3] = (...o) => r.core.handleBlur && r.core.handleBlur(...o))
        }), null, 16),
        c("ul", W({ ref: "resultList" }, l.resultListProps, hr(l.resultListListeners, !0)), [
          (i(!0), f(Q, null, Z(r.results, (o, s) => L(n.$slots, "result", {
            result: o,
            props: l.resultProps[s]
          }, () => [
            (i(), f("li", W({
              key: l.resultProps[s].id,
              ref_for: !0
            }, l.resultProps[s]), h(e.getResultValue(o)), 17))
          ])), 256))
        ], 16)
      ], 16)
    ])
  ], 16);
}
const Ob = /* @__PURE__ */ Le(Ab, [["render", $b]]);
var Rb = {
  install: function(n, t) {
    n.use(Zp), n.component("RouterLink", rv), n.component("DsfrFacets", Iv), n.component("DsfrSelectMultiple", Jv), n.component("DsfrMenu", Pv), n.component("DsfrMenuLink", Sv), n.component("DsfrHeaderMenu", ug), n.component("DsfrCustomHeader", Ng), n.component("DsfrCustomHeaderMenuLinks", Yt), n.component("DsfrCustomDataTable", cb), n.component("DsfrCustomCheckbox", bb), n.component("DsfrButtonTooltip", wb), n.component("DsfrLinkTooltip", _b), n.component("DsfrLink", Db), n.component("autocomplete", Ob);
  },
  methods: Zh,
  utils: nv
};
window && (window.DSFR = Rb);
export {
  Rb as default
};
//# sourceMappingURL=dsfr.es.js.map
