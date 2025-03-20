var nr = Object.defineProperty;
var rr = (a, t, e) => t in a ? nr(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var N = (a, t, e) => rr(a, typeof t != "symbol" ? t + "" : t, e);
import { defineComponent as R, h as fa, ref as K, computed as w, onMounted as ye, watch as de, onUnmounted as Ee, Comment as lr, cloneVNode as sr, openBlock as i, createElementBlock as f, normalizeClass as O, createElementVNode as c, withModifiers as te, createTextVNode as V, toDisplayString as g, unref as q, Fragment as z, renderList as J, createVNode as ee, withKeys as ae, withCtx as Z, createBlock as H, resolveDynamicComponent as ge, mergeProps as Q, createCommentVNode as b, useId as Yt, inject as Qe, toRef as st, renderSlot as B, provide as Re, resolveComponent as xe, useCssVars as zt, nextTick as Qa, normalizeStyle as Te, normalizeProps as Ie, mergeModels as Be, useModel as _e, withDirectives as Me, vModelCheckbox as yt, guardReactiveProps as kt, useAttrs as or, useSlots as Gt, hasInjectionContext as ir, useTemplateRef as ur, reactive as dr, Teleport as cr, vModelSelect as Xt, onBeforeUnmount as fr, Transition as pr, vShow as mr, vModelText as pa, toHandlers as hr } from "vue";
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
const Lr = (a) => a === "unset" || a === "undefined" || a === "none";
function Mr(a, t) {
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
  [e, n].forEach((L) => {
    const k = [], x = L.hFlip, T = L.vFlip;
    let M = L.rotate;
    x ? T ? M += 2 : (k.push(
      "translate(" + (r.width + r.left).toString() + " " + (0 - r.top).toString() + ")"
    ), k.push("scale(-1 1)"), r.top = r.left = 0) : T && (k.push(
      "translate(" + (0 - r.left).toString() + " " + (r.height + r.top).toString() + ")"
    ), k.push("scale(1 -1)"), r.top = r.left = 0);
    let v;
    switch (M < 0 && (M -= Math.floor(M / 4) * 4), M = M % 4, M) {
      case 1:
        v = r.height / 2 + r.top, k.unshift(
          "rotate(90 " + v.toString() + " " + v.toString() + ")"
        );
        break;
      case 2:
        k.unshift(
          "rotate(180 " + (r.width / 2 + r.left).toString() + " " + (r.height / 2 + r.top).toString() + ")"
        );
        break;
      case 3:
        v = r.width / 2 + r.left, k.unshift(
          "rotate(-90 " + v.toString() + " " + v.toString() + ")"
        );
        break;
    }
    M % 2 === 1 && (r.left !== r.top && (v = r.left, r.left = r.top, r.top = v), r.width !== r.height && (v = r.width, r.width = r.height, r.height = v)), k.length && (l = Pr(
      l,
      '<g transform="' + k.join(" ") + '">',
      "</g>"
    ));
  });
  const s = n.width, o = n.height, u = r.width, d = r.height;
  let p, h;
  s === null ? (h = o === null ? "1em" : o === "auto" ? d : o, p = va(h, u / d)) : (p = s === "auto" ? u : s, h = o === null ? va(p, d / u) : o === "auto" ? d : o);
  const m = {}, C = (L, k) => {
    Lr(k) || (m[L] = k.toString());
  };
  C("width", p), C("height", h);
  const _ = [r.left, r.top, u, d];
  return m.viewBox = _.join(" "), {
    attributes: m,
    viewBox: _,
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
    const h = {
      provider: l,
      prefix: s,
      name: o
    };
    p.push(h);
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
    let E = a.resources.slice(0);
    for (s = []; E.length > 1; ) {
      const D = Math.floor(Math.random() * E.length);
      s.push(E[D]), E = E.slice(0, D).concat(E.slice(D + 1));
    }
    s = s.concat(E);
  } else
    s = a.resources.slice(l).concat(a.resources.slice(0, l));
  const o = Date.now();
  let u = "pending", d = 0, p, h = null, m = [], C = [];
  typeof n == "function" && C.push(n);
  function _() {
    h && (clearTimeout(h), h = null);
  }
  function L() {
    u === "pending" && (u = "aborted"), _(), m.forEach((E) => {
      E.status === "pending" && (E.status = "aborted");
    }), m = [];
  }
  function k(E, D) {
    D && (C = []), typeof E == "function" && C.push(E);
  }
  function x() {
    return {
      startTime: o,
      payload: t,
      status: u,
      queriesSent: d,
      queriesPending: m.length,
      subscribe: k,
      abort: L
    };
  }
  function T() {
    u = "failed", C.forEach((E) => {
      E(void 0, p);
    });
  }
  function M() {
    m.forEach((E) => {
      E.status === "pending" && (E.status = "aborted");
    }), m = [];
  }
  function v(E, D, F) {
    const P = D !== "success";
    switch (m = m.filter((G) => G !== E), u) {
      case "pending":
        break;
      case "failed":
        if (P || !a.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (D === "abort") {
      p = F, T();
      return;
    }
    if (P) {
      p = F, m.length || (s.length ? I() : T());
      return;
    }
    if (_(), M(), !a.random) {
      const G = a.resources.indexOf(E.resource);
      G !== -1 && G !== a.index && (a.index = G);
    }
    u = "completed", C.forEach((G) => {
      G(F);
    });
  }
  function I() {
    if (u !== "pending")
      return;
    _();
    const E = s.shift();
    if (E === void 0) {
      if (m.length) {
        h = setTimeout(() => {
          _(), u === "pending" && (M(), T());
        }, a.timeout);
        return;
      }
      T();
      return;
    }
    const D = {
      status: "pending",
      resource: E,
      callback: (F, P) => {
        v(D, F, P);
      }
    };
    m.push(D), d++, h = setTimeout(I, a.rotate), e(E, t, D.callback);
  }
  return setTimeout(I), x;
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
      (h, m) => {
        n(), d && d(h, m);
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
const Lt = /* @__PURE__ */ Object.create(null);
function Zr(a) {
  if (!Lt[a]) {
    const t = ea(a);
    if (!t)
      return;
    const e = tn(t), n = {
      config: t,
      redundancy: e
    };
    Lt[a] = n;
  }
  return Lt[a];
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
        const h = l(p, n, e);
        xa(h, (m) => {
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
      Jr(e, p, (h) => {
        Xe(a, p.icons, h, !0);
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
    const h = r[d] || (r[d] = /* @__PURE__ */ Object.create(null));
    h[p] || (h[p] = []);
  }), n.pending.forEach((u) => {
    const { provider: d, prefix: p, name: h } = u, m = qe(d, p), C = m.pendingIcons || (m.pendingIcons = /* @__PURE__ */ new Set());
    C.has(h) || (C.add(h), r[d][p].push(h));
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
  for (let L in t) {
    const k = t[L];
    if (k !== void 0)
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
          e[L] = k === !0 || k === "true" || k === 1;
          break;
        case "flip":
          typeof k == "string" && cl(e, k);
          break;
        case "color":
          l.color = k;
          break;
        case "rotate":
          typeof k == "string" ? e[L] = fl(k) : typeof k == "number" && (e[L] = k);
          break;
        case "ariaHidden":
        case "aria-hidden":
          k !== !0 && k !== "true" && delete n["aria-hidden"];
          break;
        default: {
          const x = ct[L];
          x ? (k === !0 || k === "true" || k === 1) && (e[x] = !0) : Da[L] === void 0 && (n[L] = k);
        }
      }
  }
  const u = Mr(a, e), d = u.attributes;
  if (e.inline && (l.verticalAlign = "-0.125em"), r === "svg") {
    n.style = {
      ...l,
      ...o
    }, Object.assign(n, d);
    let L = 0, k = t.id;
    return typeof k == "string" && (k = k.replace(/-/g, "_")), n.innerHTML = Ar(u.body, k ? () => k + "ID" + L++ : "iconifyVue"), fa("svg", n);
  }
  const { body: p, width: h, height: m } = a, C = r === "mask" || (r === "bg" ? !1 : p.indexOf("currentColor") !== -1), _ = pl(p, {
    ...d,
    width: h + "",
    height: m + ""
  });
  return n.style = {
    ...l,
    "--svg": vl(_),
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
}, kl = R({
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
}, se = (a = "", t = "") => (a ? `${a}-` : "") + Yt() + (t ? `-${t}` : ""), wl = { class: "fr-accordion" }, _l = ["aria-expanded", "aria-controls"], xl = ["id"], Dl = /* @__PURE__ */ R({
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
    }), de(d, (h, m) => {
      h !== m && l(h);
    }), (h, m) => (i(), f("section", wl, [
      (i(), H(ge(h.titleTag), { class: "fr-accordion__title" }, {
        default: Z(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": q(d),
            "aria-controls": h.id,
            type: "button",
            onClick: m[0] || (m[0] = (C) => q(p)())
          }, [
            B(h.$slots, "title", {}, () => [
              V(g(h.title), 1)
            ])
          ], 8, _l)
        ]),
        _: 3
      })),
      c("div", {
        id: h.id,
        ref_key: "collapse",
        ref: e,
        class: O(["fr-collapse", {
          "fr-collapse--expanded": q(r),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": q(n)
        }]),
        onTransitionend: m[1] || (m[1] = (C) => q(s)(q(d), !1))
      }, [
        B(h.$slots, "default")
      ], 42, xl)
    ]));
  }
}), Tl = { class: "fr-accordions-group" }, Il = /* @__PURE__ */ R({
  __name: "DsfrAccordionsGroup",
  props: {
    modelValue: { default: -1 }
  },
  emits: ["update:modelValue"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = w({
      get: () => e.modelValue,
      set(o) {
        n("update:modelValue", o);
      }
    }), l = K(/* @__PURE__ */ new Map()), s = K(0);
    return Re(na, (o) => {
      const u = s.value++;
      l.value.set(u, o.value);
      const d = w(() => u === r.value);
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
      }), { isActive: d, expand: p };
    }), (o, u) => (i(), f("div", Tl, [
      B(o.$slots, "default")
    ]));
  }
}), Cl = ["id", "role"], El = ["title", "aria-label"], Pl = /* @__PURE__ */ R({
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
    const e = a, n = t, r = () => n("close"), l = w(
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
      class: O(["fr-alert", l.value]),
      role: s.alert ? "alert" : void 0
    }, [
      s.small ? b("", !0) : (i(), H(ge(s.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: Z(() => [
          V(g(s.title), 1)
        ]),
        _: 1
      })),
      B(s.$slots, "default", {}, () => [
        V(g(s.description), 1)
      ]),
      s.closeable ? (i(), f("button", {
        key: 1,
        class: "fr-btn fr-btn--close",
        title: s.closeButtonLabel,
        "aria-label": s.closeButtonLabel,
        onClick: r
      }, null, 8, El)) : b("", !0)
    ], 10, Cl));
  }
}), Ll = /* @__PURE__ */ R({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(a) {
    return (t, e) => (i(), f("a", {
      class: O(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${t.position}`]),
      href: "#top"
    }, g(t.label), 3));
  }
}), Ml = ["title"], dn = /* @__PURE__ */ R({
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
      class: O(["fr-badge", {
        [`fr-badge--${t.type}`]: t.type,
        "fr-badge--no-icon": t.noIcon,
        "fr-badge--sm": t.small
      }]),
      title: t.ellipsis ? t.label : void 0
    }, [
      c("span", {
        class: O(t.ellipsis ? "fr-ellipsis" : "")
      }, g(t.label), 3)
    ], 10, Ml));
  }
}), Bl = ["aria-label"], Sl = ["aria-expanded", "aria-controls"], $l = ["id"], Al = { class: "fr-breadcrumb__list" }, Ol = ["aria-current"], Rl = /* @__PURE__ */ R({
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
    return de(s, (o, u) => {
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
        }, g(o.showBreadcrumbLabel), 9, Sl)),
        c("div", {
          id: o.breadcrumbId,
          ref_key: "collapse",
          ref: t,
          class: O(["fr-collapse", {
            "fr-collapse--expanded": q(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": q(e)
          }]),
          onTransitionend: u[1] || (u[1] = (p) => q(l)(s.value))
        }, [
          c("ol", Al, [
            (i(!0), f(z, null, J(o.links, (p, h) => (i(), f("li", {
              key: h,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), H(d, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": h === o.links.length - 1 ? "page" : void 0
              }, {
                default: Z(() => [
                  V(g(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : b("", !0),
              p.to ? b("", !0) : (i(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": h === o.links.length - 1 ? "page" : void 0
              }, g(p.text), 9, Ol))
            ]))), 128))
          ])
        ], 42, $l)
      ], 8, Bl);
    };
  }
}), Fl = /* @__PURE__ */ R({
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
    const t = a, e = K(null), n = w(() => `${+t.scale * 1.2}rem`), r = w(() => t.flip === "both" ? "horizontal,vertical" : t.flip);
    de(() => t.title, l);
    async function l() {
      var u, d, p, h;
      if (!((u = e.value) != null && u.$el))
        return;
      const m = !!((d = e.value) == null ? void 0 : d.$el).querySelector("title"), C = document.createElement("title");
      if (!t.title) {
        C.remove();
        return;
      }
      C.innerHTML = t.title, await Qa(), m || (h = ((p = e.value) == null ? void 0 : p.$el).firstChild) == null || h.before(C);
    }
    ye(l);
    const s = w(() => {
      var u;
      return (u = t.name) != null && u.startsWith("vi-") ? t.name.replace(/vi-(.*)/, "vscode-icons:$1") : t.name ?? "";
    }), o = w(() => t.color ?? t.fill ?? "inherit");
    return (u, d) => (i(), H(q(kl), {
      ref_key: "icon",
      ref: e,
      icon: s.value,
      style: Te({ fontSize: n.value, verticalAlign: u.verticalAlign, display: u.display }),
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
}), we = (a, t) => {
  const e = a.__vccOpts || a;
  for (const [n, r] of t)
    e[n] = r;
  return e;
}, be = /* @__PURE__ */ we(Fl, [["__scopeId", "data-v-73a1cd7e"]]), Vl = ["title", "disabled", "aria-disabled"], Nl = { key: 1 }, ql = /* @__PURE__ */ R({
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
    const e = a, n = w(() => ["sm", "small"].includes(e.size)), r = w(() => ["md", "medium"].includes(e.size)), l = w(() => ["lg", "large"].includes(e.size)), s = K(null);
    t({ focus: () => {
      var p;
      (p = s.value) == null || p.focus();
    } });
    const o = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), u = w(() => e.iconOnly ? 1.25 : 0.8325), d = w(
      () => typeof e.icon == "string" ? { scale: u.value, name: e.icon } : { scale: u.value, ...e.icon }
    );
    return (p, h) => (i(), f("button", {
      ref_key: "btn",
      ref: s,
      class: O(["fr-btn", {
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
      onClick: h[0] || (h[0] = (m) => p.onClick ? p.onClick(m) : () => {
      })
    }, [
      p.icon && !o.value ? (i(), H(be, Ie(Q({ key: 0 }, d.value)), null, 16)) : b("", !0),
      p.iconOnly ? b("", !0) : (i(), f("span", Nl, [
        V(g(p.label) + " ", 1),
        B(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, Vl));
  }
}), je = /* @__PURE__ */ we(ql, [["__scopeId", "data-v-118397f5"]]), Tt = /* @__PURE__ */ R({
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
    const t = a, e = K(null), n = w(() => ["sm", "small"].includes(t.size)), r = w(() => ["md", "medium"].includes(t.size)), l = w(() => ["lg", "large"].includes(t.size)), s = w(() => ["always", "", !0].includes(t.inlineLayoutWhen)), o = w(() => ["sm", "small"].includes(t.inlineLayoutWhen)), u = w(() => ["md", "medium"].includes(t.inlineLayoutWhen)), d = w(() => ["lg", "large"].includes(t.inlineLayoutWhen)), p = w(() => t.align === "center"), h = w(() => t.align === "right"), m = K("auto"), C = w(() => `--equisized-width: ${m.value};`), _ = async () => {
      var L;
      let k = 0;
      await new Promise((x) => setTimeout(x, 100)), (L = e.value) == null || L.querySelectorAll(".fr-btn").forEach((x) => {
        const T = x, M = T.offsetWidth, v = window.getComputedStyle(T), I = +v.marginLeft.replace("px", ""), E = +v.marginRight.replace("px", "");
        T.style.width = "var(--equisized-width)";
        const D = M + I + E;
        D > k && (k = D);
      }), m.value = `${k}px`;
    };
    return ye(async () => {
      !e.value || !t.equisized || await _();
    }), (L, k) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: e,
      style: Te(C.value),
      class: O(["fr-btns-group", {
        "fr-btns-group--equisized": L.equisized,
        "fr-btns-group--sm": n.value,
        "fr-btns-group--md": r.value,
        "fr-btns-group--lg": l.value,
        "fr-btns-group--inline-sm": s.value || o.value,
        "fr-btns-group--inline-md": s.value || u.value,
        "fr-btns-group--inline-lg": s.value || d.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": h.value,
        "fr-btns-group--icon-right": L.iconRight,
        "fr-btns-group--inline-reverse": L.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (i(!0), f(z, null, J(L.buttons, ({ onClick: x, ...T }, M) => (i(), f("li", { key: M }, [
        ee(je, Q({ ref_for: !0 }, T, { onClick: x }), null, 16, ["onClick"])
      ]))), 128)),
      B(L.$slots, "default")
    ], 6));
  }
}), jl = {
  key: 2,
  class: "fr-callout__text"
}, Hl = {
  key: 4,
  class: "fr-callout__text"
}, Wl = /* @__PURE__ */ R({
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
    const t = a, e = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), n = w(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : { ...t.icon ?? {} });
    return (r, l) => (i(), f("div", {
      class: O(["fr-callout", { [String(r.icon)]: e.value }])
    }, [
      r.icon && n.value ? (i(), H(be, Ie(Q({ key: 0 }, n.value)), null, 16)) : b("", !0),
      r.title ? (i(), H(ge(r.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: Z(() => [
          V(g(r.title), 1)
        ]),
        _: 1
      })) : b("", !0),
      r.content ? (i(), f("p", jl, g(r.content), 1)) : b("", !0),
      r.button ? (i(), H(je, Ie(Q({ key: 3 }, r.button)), null, 16)) : b("", !0),
      r.$slots.default && !r.content ? (i(), f("div", Hl, [
        B(r.$slots, "default", {}, void 0, !0)
      ])) : B(r.$slots, "default", { key: 5 }, void 0, !0)
    ], 2));
  }
}), Kl = /* @__PURE__ */ we(Wl, [["__scopeId", "data-v-c59b3cec"]]), Nt = /* @__PURE__ */ R({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(a) {
    const t = a, e = w(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), n = w(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("p", {
      class: O(["fr-card__detail", e.value ? { [String(r.icon)]: e.value } : {}])
    }, [
      r.icon && !e.value ? (i(), H(be, Ie(Q({ key: 0 }, n.value)), null, 16)) : b("", !0),
      B(r.$slots, "default")
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
}, ls = /* @__PURE__ */ R({
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
    const e = a, n = w(() => ["sm", "small"].includes(e.size)), r = w(() => ["lg", "large"].includes(e.size)), l = w(() => ["sm", "small"].includes(e.imgRatio)), s = w(() => ["lg", "large"].includes(e.imgRatio)), o = w(() => typeof e.link == "string" && e.link.startsWith("http")), u = K(null);
    return t({ goToTargetLink: () => {
      var d;
      ((d = u.value) == null ? void 0 : d.querySelector(".fr-card__link")).click();
    } }), (d, p) => {
      const h = xe("RouterLink");
      return i(), f("div", {
        class: O(["fr-card", {
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
            (i(), H(ge(d.titleTag), { class: "fr-card__title" }, {
              default: Z(() => [
                o.value ? (i(), f("a", {
                  key: 0,
                  href: d.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, g(d.title), 9, zl)) : d.link ? (i(), H(h, {
                  key: 1,
                  to: d.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: p[0] || (p[0] = (m) => m.stopPropagation())
                }, {
                  default: Z(() => [
                    V(g(d.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (i(), f(z, { key: 2 }, [
                  V(g(d.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            c("p", Gl, g(d.description), 1),
            d.$slots["start-details"] || d.detail ? (i(), f("div", Xl, [
              B(d.$slots, "start-details"),
              d.detail ? (i(), H(Nt, {
                key: 0,
                icon: d.detailIcon
              }, {
                default: Z(() => [
                  V(g(d.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0),
            d.$slots["end-details"] || d.endDetail ? (i(), f("div", Ul, [
              B(d.$slots, "end-details"),
              d.endDetail ? (i(), H(Nt, {
                key: 0,
                icon: d.endDetailIcon
              }, {
                default: Z(() => [
                  V(g(d.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0)
          ]),
          d.buttons.length || d.linksGroup.length ? (i(), f("div", Zl, [
            d.buttons.length ? (i(), H(Tt, {
              key: 0,
              buttons: d.buttons,
              "inline-layout-when": "always",
              size: d.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : b("", !0),
            d.linksGroup.length ? (i(), f("ul", Jl, [
              (i(!0), f(z, null, J(d.linksGroup, (m, C) => (i(), f("li", {
                key: `card-link-${C}`
              }, [
                m.to ? (i(), H(h, {
                  key: 0,
                  to: m.to
                }, {
                  default: Z(() => [
                    V(g(m.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (i(), f("a", {
                  key: 1,
                  href: m.link || m.href,
                  class: O(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": n.value,
                    "fr-link--lg": r.value
                  }])
                }, g(m.label), 11, es))
              ]))), 128))
            ])) : b("", !0)
          ])) : b("", !0)
        ]),
        d.imgSrc || d.badges.length ? (i(), f("div", ts, [
          d.imgSrc ? (i(), f("div", as, [
            c("img", {
              src: d.imgSrc,
              class: "fr-responsive-img",
              alt: d.altImg,
              "data-testid": "card-img"
            }, null, 8, ns)
          ])) : b("", !0),
          d.badges.length ? (i(), f("ul", rs, [
            (i(!0), f(z, null, J(d.badges, (m, C) => (i(), f("li", { key: C }, [
              ee(dn, Q({ ref_for: !0 }, m), null, 16)
            ]))), 128))
          ])) : b("", !0)
        ])) : b("", !0)
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
}, cs = /* @__PURE__ */ R({
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
    const t = a, e = w(() => t.errorMessage || t.validMessage), n = w(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = _e(a, "modelValue");
    return (l, s) => (i(), f("div", {
      class: O(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline, readonly: l.readonly }])
    }, [
      c("div", {
        class: O(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        Me(c("input", Q({
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
          B(l.$slots, "label", {}, () => [
            V(g(l.label) + " ", 1),
            B(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", is, " *")) : b("", !0)
            ], !0)
          ], !0),
          l.hint ? (i(), f("span", us, g(l.hint), 1)) : b("", !0)
        ], 8, os),
        e.value ? (i(), f("div", ds, [
          c("p", {
            class: O(["fr-message--info flex items-center", n.value])
          }, g(e.value), 3)
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), It = /* @__PURE__ */ we(cs, [["__scopeId", "data-v-18fa6c7b"]]), fs = { class: "fr-form-group" }, ps = ["disabled", "aria-labelledby", "aria-invalid", "role"], ms = ["id"], hs = {
  key: 0,
  class: "required"
}, vs = ["id"], gs = /* @__PURE__ */ R({
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
    const t = a, e = w(() => t.errorMessage || t.validMessage), n = w(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = w(() => e.value ? `${t.titleId} messages-${t.titleId}` : t.titleId), l = _e(a, "modelValue");
    return (s, o) => (i(), f("div", fs, [
      c("fieldset", {
        class: O(["fr-fieldset", {
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
          B(s.$slots, "legend", {}, () => [
            V(g(s.legend) + " ", 1),
            B(s.$slots, "required-tip", {}, () => [
              s.required ? (i(), f("span", hs, " *")) : b("", !0)
            ])
          ])
        ], 8, ms),
        B(s.$slots, "default", {}, () => [
          (i(!0), f(z, null, J(s.options, (u) => (i(), H(It, {
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
            class: O(["fr-message--info flex items-center", n.value])
          }, [
            c("span", null, g(e.value), 1)
          ], 2)
        ], 8, vs)) : b("", !0)
      ], 10, ps)
    ]));
  }
}), bs = { class: "fr-consent-banner__content" }, ys = { class: "fr-text--sm" }, ks = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, ws = /* @__PURE__ */ R({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(a) {
    const t = a, e = w(() => typeof t.url == "string" && t.url.startsWith("http")), n = w(() => t.url ? e.value ? "a" : "RouterLink" : "a"), r = w(() => ({ [e.value ? "href" : "to"]: t.url }));
    return (l, s) => (i(), f(z, null, [
      c("div", bs, [
        c("p", ys, [
          B(l.$slots, "default", {}, () => [
            s[4] || (s[4] = V(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (i(), H(ge(n.value), Q(r.value, { "data-testid": "link" }), {
              default: Z(() => s[3] || (s[3] = [
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
}, xs = { class: "fr-pagination__list" }, Ds = ["href", "title", "disabled", "aria-disabled"], Ts = ["href", "title", "disabled", "aria-disabled"], Is = ["href", "title", "aria-current", "onClick"], Cs = { key: 0 }, Es = { key: 1 }, Ps = ["href", "title", "disabled", "aria-disabled"], Ls = ["href", "title", "disabled", "aria-disabled"], Ms = /* @__PURE__ */ R({
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
    const e = a, n = t, r = w(() => Math.min(e.pages.length - 1 - e.truncLimit, Math.max(e.currentPage - (e.truncLimit - e.truncLimit % 2) / 2, 0))), l = w(() => Math.min(e.pages.length - 1, r.value + e.truncLimit)), s = w(() => e.pages.length > e.truncLimit ? e.pages.slice(r.value, l.value + 1) : e.pages), o = (_) => n("update:current-page", _), u = (_) => o(_), d = () => u(0), p = () => u(Math.max(0, e.currentPage - 1)), h = () => u(Math.min(e.pages.length - 1, e.currentPage + 1)), m = () => u(e.pages.length - 1), C = (_) => e.pages.indexOf(_) === e.currentPage;
    return (_, L) => {
      var k, x, T, M;
      return i(), f("nav", _s, [
        c("ul", xs, [
          c("li", null, [
            c("a", {
              href: (k = _.pages[0]) == null ? void 0 : k.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: _.firstPageTitle,
              disabled: _.currentPage === 0 ? !0 : void 0,
              "aria-disabled": _.currentPage === 0 ? !0 : void 0,
              onClick: L[0] || (L[0] = te((v) => d(), ["prevent"]))
            }, null, 8, Ds)
          ]),
          c("li", null, [
            c("a", {
              href: (x = _.pages[Math.max(_.currentPage - 1, 0)]) == null ? void 0 : x.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: _.prevPageTitle,
              disabled: _.currentPage === 0 ? !0 : void 0,
              "aria-disabled": _.currentPage === 0 ? !0 : void 0,
              onClick: L[1] || (L[1] = te((v) => p(), ["prevent"]))
            }, g(_.prevPageTitle), 9, Ts)
          ]),
          (i(!0), f(z, null, J(s.value, (v, I) => (i(), f("li", { key: I }, [
            c("a", {
              href: v == null ? void 0 : v.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: v.title,
              "aria-current": C(v) ? "page" : void 0,
              onClick: te((E) => u(_.pages.indexOf(v)), ["prevent"])
            }, [
              s.value.indexOf(v) === 0 && r.value > 0 ? (i(), f("span", Cs, "...")) : b("", !0),
              V(" " + g(v.label) + " ", 1),
              s.value.indexOf(v) === s.value.length - 1 && l.value < _.pages.length - 1 ? (i(), f("span", Es, "...")) : b("", !0)
            ], 8, Is)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (T = _.pages[Math.min(_.currentPage + 1, _.pages.length - 1)]) == null ? void 0 : T.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: _.nextPageTitle,
              disabled: _.currentPage === _.pages.length - 1 ? !0 : void 0,
              "aria-disabled": _.currentPage === _.pages.length - 1 ? !0 : void 0,
              onClick: L[2] || (L[2] = te((v) => h(), ["prevent"]))
            }, g(_.nextPageTitle), 9, Ps)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (M = _.pages.at(-1)) == null ? void 0 : M.href,
              title: _.lastPageTitle,
              disabled: _.currentPage === _.pages.length - 1 ? !0 : void 0,
              "aria-disabled": _.currentPage === _.pages.length - 1 ? !0 : void 0,
              onClick: L[3] || (L[3] = te((v) => m(), ["prevent"]))
            }, null, 8, Ls)
          ])
        ])
      ]);
    };
  }
}), la = /* @__PURE__ */ we(Ms, [["__scopeId", "data-v-4dfa8248"]]), Bs = { class: "fr-table" }, Ss = { class: "fr-table__wrapper" }, $s = { class: "fr-table__container" }, As = { class: "fr-table__content" }, Os = ["id"], Rs = { key: 0 }, Fs = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Vs = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Ns = ["id", "checked"], qs = ["for"], js = ["tabindex", "onClick", "onKeydown"], Hs = { key: 0 }, Ws = { key: 1 }, Ks = ["data-row-key"], Qs = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Ys = { class: "fr-checkbox-group fr-checkbox-group--sm" }, zs = ["id", "value"], Gs = ["for"], Xs = ["onKeydown"], Us = { class: "flex gap-2 items-center" }, Zs = ["selected"], Js = ["value", "selected"], eo = { class: "flex ml-1" }, to = { class: "self-center" }, ao = /* @__PURE__ */ R({
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
    const e = a, n = t, r = _e(a, "selection"), l = _e(a, "rowsPerPage"), s = _e(a, "currentPage"), o = w(() => Math.ceil(e.rows.length / l.value)), u = w(() => e.pages ?? Array.from({ length: o.value }).map((I, E) => ({ label: `${E + 1}`, title: `Page ${E + 1}`, href: `#${E + 1}` }))), d = w(() => s.value * l.value), p = w(() => (s.value + 1) * l.value), h = _e(a, "sortedBy"), m = _e(a, "sortedDesc");
    function C(I, E) {
      const D = h.value ?? e.sorted;
      return (I[D] ?? I) < (E[D] ?? E) ? -1 : (I[D] ?? I) > (E[D] ?? E) ? 1 : 0;
    }
    function _(I) {
      if (!(!e.sortableRows || Array.isArray(e.sortableRows) && !e.sortableRows.includes(I))) {
        if (h.value === I) {
          if (m.value) {
            h.value = void 0, m.value = !1;
            return;
          }
          m.value = !0;
          return;
        }
        m.value = !1, h.value = I;
      }
    }
    const L = w(() => {
      const I = h.value ? e.rows.slice().sort(e.sortFn ?? C) : e.rows.slice();
      return m.value && I.reverse(), I;
    }), k = w(() => {
      const I = e.headersRow.map((D) => typeof D != "object" ? D : D.key), E = L.value.map((D) => Array.isArray(D) ? D : I.map((F) => typeof D != "object" ? D : D[F] ?? D));
      return e.pagination ? E.slice(d.value, p.value) : E;
    });
    function x(I) {
      if (I) {
        const E = e.headersRow.findIndex((D) => D.key ?? D);
        r.value = k.value.map((D) => D[E]);
      } else
        r.value.length = 0;
    }
    const T = w(() => r.value.length === k.value.length);
    function M() {
      n("update:current-page", 0), r.value.length = 0;
    }
    function v(I) {
      navigator.clipboard.writeText(I);
    }
    return (I, E) => (i(), f("div", Bs, [
      c("div", Ss, [
        c("div", $s, [
          c("div", As, [
            c("table", { id: I.id }, [
              I.noCaption ? b("", !0) : (i(), f("caption", Rs, g(I.title), 1)),
              c("thead", null, [
                c("tr", null, [
                  I.selectableRows ? (i(), f("th", Fs, [
                    c("div", Vs, [
                      c("input", {
                        id: `table-select--${I.id}-all`,
                        checked: T.value,
                        type: "checkbox",
                        onInput: E[0] || (E[0] = (D) => x(D.target.checked))
                      }, null, 40, Ns),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${I.id}-all`
                      }, " Sélectionner tout ", 8, qs)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(z, null, J(I.headersRow, (D, F) => (i(), f("th", Q({
                    key: typeof D == "object" ? D.key : D,
                    scope: "col",
                    ref_for: !0
                  }, typeof D == "object" && D.headerAttrs, {
                    tabindex: I.sortableRows ? 0 : void 0,
                    onClick: (P) => _(D.key ?? (Array.isArray(I.rows[0]) ? F : D)),
                    onKeydown: [
                      ae((P) => _(D.key ?? D), ["enter"]),
                      ae((P) => _(D.key ?? D), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: O({ "sortable-header": I.sortableRows === !0 || Array.isArray(I.sortableRows) && I.sortableRows.includes(D.key ?? D) })
                    }, [
                      B(I.$slots, "header", Q({ ref_for: !0 }, typeof D == "object" ? D : { key: D, label: D }), () => [
                        V(g(typeof D == "object" ? D.label : D), 1)
                      ], !0),
                      h.value !== (D.key ?? D) && (I.sortableRows === !0 || Array.isArray(I.sortableRows) && I.sortableRows.includes(D.key ?? D)) ? (i(), f("span", Hs, [
                        ee(be, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : h.value === (D.key ?? D) ? (i(), f("span", Ws, [
                        ee(be, {
                          name: m.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : b("", !0)
                    ], 2)
                  ], 16, js))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(z, null, J(k.value, (D, F) => (i(), f("tr", {
                  key: `row-${F}`,
                  "data-row-key": F + 1
                }, [
                  I.selectableRows ? (i(), f("th", Qs, [
                    c("div", Ys, [
                      Me(c("input", {
                        id: `row-select-${I.id}-${F}`,
                        "onUpdate:modelValue": E[1] || (E[1] = (P) => r.value = P),
                        value: I.rows[F][I.rowKey] ?? `row-${F}`,
                        type: "checkbox"
                      }, null, 8, zs), [
                        [yt, r.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${I.id}-${F}`
                      }, " Sélectionner la ligne " + g(F + 1), 9, Gs)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(z, null, J(D, (P, G) => (i(), f("td", {
                    key: typeof P == "object" ? P[I.rowKey] : P,
                    tabindex: "0",
                    onKeydown: [
                      ae(te((y) => v(typeof P == "object" ? P[I.rowKey] : P), ["ctrl"]), ["c"]),
                      ae(te((y) => v(typeof P == "object" ? P[I.rowKey] : P), ["meta"]), ["c"])
                    ]
                  }, [
                    B(I.$slots, "cell", Q({ ref_for: !0 }, {
                      colKey: typeof I.headersRow[G] == "object" ? I.headersRow[G].key : I.headersRow[G],
                      cell: P
                    }), () => [
                      V(g(typeof P == "object" ? P[I.rowKey] : P), 1)
                    ], !0)
                  ], 40, Xs))), 128))
                ], 8, Ks))), 128))
              ])
            ], 8, Os)
          ])
        ])
      ]),
      c("div", {
        class: O(I.bottomActionBarClass)
      }, [
        B(I.$slots, "pagination", {}, () => [
          I.pagination && !I.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: O(["flex justify-between items-center", I.paginationWrapperClass])
          }, [
            c("div", Us, [
              E[6] || (E[6] = c("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              Me(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": E[2] || (E[2] = (D) => l.value = D),
                class: "fr-select",
                onChange: E[3] || (E[3] = (D) => M())
              }, [
                c("option", {
                  value: "",
                  selected: !I.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, Zs),
                (i(!0), f(z, null, J(I.paginationOptions, (D, F) => (i(), f("option", {
                  key: F,
                  value: D,
                  selected: +D === l.value
                }, g(D), 9, Js))), 128))
              ], 544), [
                [Xt, l.value]
              ])
            ]),
            c("div", eo, [
              c("span", to, "Page " + g(s.value + 1) + " sur " + g(o.value), 1)
            ]),
            ee(la, {
              "current-page": s.value,
              "onUpdate:currentPage": [
                E[4] || (E[4] = (D) => s.value = D),
                E[5] || (E[5] = (D) => r.value.length = 0)
              ],
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : b("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), no = /* @__PURE__ */ we(ao, [["__scopeId", "data-v-831b7391"]]), ro = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARoAAAFACAYAAABjprMrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAC3eSURBVHgB7Z1bjJxVdu9Xd/XFdl9cHo+i4eryQxIRAjTJC+SEoS2dM/FIMJiMhDMSyM3DwANItqWEh0E6tkeHeQCNbEvwMMwDbeHRAaSMTczRAXIktyGag5JM3FxGhiRSl83FIyWM25dut/ua9a/+vvau3VXV3/7uVfX/SaW6rrrs/X3/WmvtvdfuEBKYCxcuDPX09OzQm+N9fX3HxRG1L3V3d8N+sr+/f1QcUfui2o/Afm5u7vimTZsmxZErV67swbVnXxZHLl26tKNQKAzNzs6OhrG/fPnycGdn5/Di4uLYwMDAmDji98HS0lI5ahuGsSckUSAS09PTS8ZlTwj7Cd9+amrqFXHEtNfLaXEEn2nYT+Ckc7G/evXqPsP+gorWkIu9vn7EbEP9Pjtc7NGGanMhrj7QyzEhqdApJBD6L2gf1LvFAXgBelXy73d0dIyIA/AETHtlSP/Vt4gD1mf63lVg1AsxX1/U93Oy1zbYZT00Ig6oJzOin2mKY6Q+UJy+PwkPhSY44+YdPeDHxAF9vR3mlMWB+fn5cRWWlffAbeWiuFE27+iJNyYOaMhT9RsQvogDKlSnotjbr9c2LYsDUfuAkFRQ1/+Q53qf1DCiJI6o279fL6fD2iM/4tmfdg07AEIdz37CNewA+M56OQl7/BZxBKGa2o16n39MhcMpdAP43Lj6wDX0I4QQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQvYK0OSh2g3ICEwLf3VmKHArZh1jnFbR+1DbK2j9IHhCRG3LVQUNtFHMFiSsP+pDiidgej1KNRm92WfcnF3hOplTZ0Pdlr1JNxXhgatQ9IOFgmIiCoR2PVQtklDti1UJaWlpxOEm+l8ZBhP+xaj0YxP9O5Ho1+3ohp39vb61qPZrfZhp2dnU5tgHo0Ul1PxqkeDVa/S3Uf7BeSChSa4JTNOzVqmzSkxuud7Ofm5sr2Y671aMx6Nt79sjhg16NZXFx0+g36+rPW+10QB+zvz3o0pOUwaqlUymiGqYXi1bNBCcsLYXIEXi2VC1744Rw24B/dqyVzIUw9GfxmI/RwDt1g79WCWQpTT8bqg4mw9Wj8PoiSqyKEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCEkS7xaJkNha6GAOOyj7BmN9UFRarGgDeKwdy1RYZJ1HxCSGFYtlFCLIlFDJmItlYNRaqnAxvj80+IIFiEa9WSc69lYNX0mXAXTrkcTZlFk1D4gJFH8Vb9hC095K6eXjItTiQSclJb9kms9GtveVSyNldehTlR9/TGrDV9xsdc22GN9vpNYRu0DEh7WowmIXQslBpzer1AorHp91Ho0rkStR6Of7/R948a1hhCJDwpNQObm5kbFK5SEE3ZhYWGvg7kMDg4eV7sjvr2epAdc7NevX19WuxUb3N60aZNr8a0Ve/38IwMDA2PigPeby97dMRW/MXFAhWq/YY9rpzaw+8BsjyDg9+rvPmw85GRPSGogmaoHeOhEZlR72Ea1D1MwKi57EId9ln1ACCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhAQg6vT5KHVYfPso7xHV3n8PiUDWSxiifn9CEgMHp1HLZCJM8ampqalXjA3qd4kjZj2ZkPVodhn1YA6KI9oGQ4b9sTD1aIx6MhOuxafy0AeEJIoe1CNZ1qPxTtKqejKuJ7pZNCqLejTGSV65aJsecrGP2gf4vaxHkw0sExGcqn9P19W/nZ2dkdz17u7uVfbFYnGjOGB/Z9ff0NHREckeb2G9X0nciPT5NV7PEColuqSF+Pzzz4f1ahgFjubm5o5v3bq1LDFRKBQO6YH6kN4s4b5rLRR8n97e3n2G/WEX+/7+/nH9Rz+iglVx91FXRX/nWXEDn+mHXOOokSNuwN4Pucr6XUbFAf3N8GAegmChnozaO3lEqEejbbhbvDbE5/temS1atUSshtCgTUe858qe3SSKjKH+j5BAnDt3bof2Rfnmm28et5/74osv8Ac91CEtwPnz51Ff5BW9DMtyYSQcUEU9aA7deOONTgWqGoEk5Pz8fAknfdhqbTgxYIv3kBBEtffzGmHto7ZBI3s8t7CwgH6r1IvBtR7AWzyBKOml6D2eiicCMdTPKnvfs6zifhaChIv+hnHXwmOtypdffnlMr4a1XbaZYgOR0bZDeDvZEkKjP3QC1/pDH/Z/qP7IEf2RB/UyGqfYkPAgp7Ru3bqinrBD2lcl9Rzu8kRkKE0BiQvPKxvX63FPhMbbUYDwR6+/H4JShJd6ww03HDFEBu20remFBm6bHrDHZmdnt9qhkoZS+/WH7/ae479PSkBQurq6cKANwSORZW9kyLtuB/BnN6Yn2Ck99iA8ZWlxDLEpyXKJVIS44ns5TS80npg8dNNNN91tPzcxMVHs6em5oA2w7ZZbbhkTEisQFE1Sl/QmBOUuCAu8lWbzTFLA93qc6zQ3E5bYTJqhVKskg2se2J6bLiQ6ppfihTyVJJ/5Gn0MyVQhq/DbbUSH+JH3QZH0NzFA0IJhln8uFnGcyLJ3J63g0Qzrv+nJWl6LKuw+fXxEvZ2tQpzwksbDnqgMS/uEPamibTuqV2/29fW5jgDmCjNPown9x/W4wegkkvkjyNm0xN/PV199dQz/sBhyVldtFCGTejO79Yfvx7YmKkD7hdTFG+0ZZviTKRjNGtOczoFmy+mYIuOHS2YYBbFpCaGBsKhbX0n8Gg9PesJzSEgV3hA58ir3w1uhqOQLeDnNlM/RP/qT3h991fC2KUAtFVDjh2GOBoZK9R96jCNN13Mr6so+RG+luUAuR4/nA3kXHJx3mP9Ua8Kef04yc9di2MLi5VdIEwPBmZmZebyZh8kpNE2OLyx6uV+WZ2cOC2lJEFI1Yw4HUGiaEC95i4mKDzEUaj+0v/erh3O4mYbGKTQOoMyBXu3A+pdr16497PrPMj09vVv/lfbDXgXi8aDrjcxwSO1HKCxEltdeHdBjaFSaAApNQLDKV0dpXvHvI25ev379tqD2GOlRoTDrp5Q3bNhQd36PN+t2hF4LaUSzhFMtVSYiYSLVo6lRtsC+XxEjO9fC2bakEXpsjPT29g7rH2GuvRsWvgrOKFbr+ndQD8bBtlKPRpZLWFTZe1XfDqL6HTwehFZM6BJHMCkO1QsP5rUeMv8qHfBn0KIeSZi5DbBXwUGuBaHQRuZbSAIgf7gtb6EUhSYl/LAI4iJcN0SSZVI95r15CqUoNAniFXrCsgjObyGpg2FwHbBwKjmbFBSamPFGizDHZRfFheSA4xpKPZ71nBsKTUx4w9ec50LySOZ5GwpNBMy5LvReSM7JVGwoNCGg90KaFMwmfjjsDhhRoNAEhN4LaREwIrUtbbGh0KyBP3KknbOH3gtpEVIXGwpNHbzwCEPTO4SQ1iNVsaHQWHgT6/YxPCJtQGpiQ6GR6/kXr+ZwSQhpH1IZjWproWH+hZAKiYtNWwoNBYaQVYx7YpPIDOK2EhoKDCENOb5hw4aHJQHaQmgoMIQEI6mFmC0tNBQYQtxB1T4VmyMSIy0pNBQYQiIxqfmau+NMDreU0FBgCImNsic2sSSHW6ZmMHYp6O3tPe1tZ0KRISQaJT2f9klMNL1Hw5m8hCSHnlcP9/X1HZeINK3QaJg0pGHSQQoMIYkSS76m6UIn5GGwrYQXJg0LISRJkPd8RSLSVEKDLWV7enom9OYeIYSkAv7Q9dyLdM41RejklWw4KNZukYSQ1EAItTXsKFSuPRqESVNTU694e1ZTZAjJjqKmK0KHULn1aBAmcaiakHyxsLCwLcwurbkTGvViSkg+MdFLSC4pb9iwYas4kqvQ6erVq/vUPZugyBCSW0qaztgvjuTCo8GcGC/+Yx6GkPzjnBjO3KPxvJjTQpEhpFko9vT0OA13Z+bRMBdDSFPjNGM4E4/Gm3jX9jN7v/66UyYmuuS3vy0IIU0GvJrAiy5T9WgwL0a/3EEU1pE2Z2FB5MyZ7pX7W7YsyMDAohDSTHi5mvJar0vNo/ESvqcpMrVZWhJCmo6gXk0qHg0n39Xm0qUODZ8KMji4KJs305shzYl6NZvWGoFK1KPxV1rrzUMUmdUMDi7J1q3zFBnS1AQZgUrMo8GokoZKx4TD1iRnLCx0yORkh3R3L1XEnkRmzXk1iXg0Xj6GCyFJLvn3fy/I+fMFOXeuS6amuCt0DKw5ryZ2obl69eou/VCITEkIyRkY7Zubuy4uMzMUmjjQ1MhDjZ6PVWi8pO8o8zEkrxQKIr/3ewuV293dIgMDDJ1iYgh1o+o9GZucYykBRpaEkCYAeZpCgSITM3W31I1FaCgyhBBpkBSOHDqhAh5FhhAiy1X4Rmo9EUloIDKc6UsI8amXFA4dOjFcIiReNOxAqUxZXFzURHV35dLZ2XybydaaKRxKaCgy7hw9+q/y3ntfCcmOjRt75emn75AtW/olT0BYrly5Urku6LAYxGV+fr7yXH9/f+WxJmOvJoUPmQ84Cw1Fxp0TJ87Kzp3vCsme++67Qd555wHJE5qCqAjLwMDAigej59iK+AwODiIkkWZBv+vY+vXrt5mPOfll/uJIIU589NF/CskH585dkTwBIZmdnRU9MavCJAgLvBkIDp5vJlBnCusczccCCw3WLunVISGExAaEBiAfYwOxgfj4r2km9PfsMO93BTHyFkieFBILZ878leYJBoSkwxNPnKrkyPKIHxLBc6kVHtV7PO9oXul+vRr17wfyaLxV2CUhhMSKn/ydmZlZ9RxGoeDN9PT0SLOhAlnl0awpNEj+CldhE5IYfX19FVHxk8K46HmHnKisW7euKYe4laIms1d0o2HohHIPTP4mz+x7v5K5938l6x7dKYUtt1Q9N//RJ3LtxNs1n1s4+7nMHH1deh/4rnTddbsEZWnyksz84jVZ1OtWA22Etmomurq6KiNOEJbLly9XHkO4pEPEiCakWVGBHNarcdyuKzTIGnshE0kQiMXF7d+v3L764s9l85l/ko7iYNVzEAT7uaWLlyrP4TXTz/1Uiu/8rXTf92eBPnNy+1+qgP1GWpX5D38j/S/8WJoJiA2GsZGTwaVJvZgqvF1OKgNIdX+NigxCppKQRIEn4wPxWLp4seq+73Xg9vzHn6w8tzh5sSIy5v2gLBp2rcis0abNhj/S1Arob7nfv13zF3lD2U470ZFw9D74Xem8dTkkWv/UD6XTCI+67rxdw6Ltldvd991b5bEgRNjw9A9Xnuu5779JUDY8+9fSqnRsHJS+H7Xu72syiurVbMGNmqETQ6b0wImx+dN/rPv84Buv1H2u7/kfVy6urFeBWu+JFCFJogluzBAeXeXRaKZ4RDjKRAiJh4qWrBIajQ8Db3NJCCGN0DxNCddVoZPnzZSEJMqJE2UpFpt32DIu7rhjs9x112YhrYsKzV247rIe3C0kcZ555gMhy2AlNVZUk5alhKkyK6ETKpir0DA3Q1KFNXpan2KxuHFFaDQ3s0sISZGNG3vk0Uf/QEhro07M3WbotENIKiBcuPXWfFV5ywIIDXNVrY86McWK0Fy6dGkHN31LD4gMy0SQdgEjT5XQqVAoPCSEEJIA6tFsqQiNKs6wEEJIAiwuLm7q9NY1lYQQQhJAHZktnRo2cUibEJIkRQoNISRxOv0pwoQQkhDFTg5rE0ISpti5tLRUEkIISZAuFZpiM+4b0058+OHXculStrsVcuEjiUIXQ6d8c9ttr8nZs5cla+68c7N88MFfCiFhaI0qyC3K+++fz4XIgI8++rriWRESBgpNjoEXkZfFl828PssM+x54YIuQ9Am09zbJBqxuxkrvjz76nVy8mG2O5oEHbpViMf6tWeElffzx15XfVy5f1utrVc9D3LDCe1l0B/S+u/A+9tgfSKm0LJLMNWVCGUJTFi5ByC040VpppTcKXSEkfO+98yowv5PJyWtO9hCdP//zb8n3vldS0bgxsPBQYLKFHg1JnMnJWXnppY8r4gKRifZe1+Stt85WLgACAo+FBbRyzSRGncqcS0OSwBeYl176TWDPxSyGFSQRDuHC5bnn/kWeffZPKDg5RDVmsmtxcfEs59GQuHnuuV83FBgIyoMPbtHcyzcrOyE0SjZjxOvs2St6/Z91vSKI0hNPnKLg5BDVmIuYsDdJoSFxgcT1E0+MVcTBxq8RvJxfCZ4zQSIYFwjTs88uh08nTiB8KleuTXzBgSA9++yfhkoek3hRjakkg8eFkBh48cVP5Jln/v+qxyEwTz99hzz11O2x1AjGeyAvgwuEBV7M0aP/WvUa3Ifn89pr/4N7R2VMJXQSCk2u8Udp0uDRR/8wtAcAgYHQmMQtMLVAuPXyy/dXwiVbcCBC9977S3n++Xsq34NkQ8WjmZubK/f2shJ9HkFeYvv2/yNpAaE4c+YHTvNlkPDdufPdVWKI0AgCkNbQvC84+Fzkh86du7LyHDbswzwdhFIkfSA0nZs2bZrUG/Rqcog9eS35z3ObFAiR2b79rVUiA+8CEw2zmP+DcKrW7pfwdiBAJH36+/snKksQVGhOCckdSICm6fJDIFy8mSefPLUq6fuzn92fuecAgYPY2N8DYvPiix8LSRfN0Zz1J+zRo8kpyC/gkjdw0p44UV657y+XgDi6gBwURo6QT8FMYXhV/pA48joY9sblscf+sDLq5AKEc/m7XvdkEEbdddc3OVM4PSraUhGaQqEwpl6NEBIEJFztMOSNN74TWGSQe4Jn8Ytf/FvDiXx4Dhd4TQjPXPNHoJbYPPLIu/LBB9/n0HcKqK5U5h9UQqf169eXZXnNEyENgUjAmzF5/vl7A3kIyOlgjsttt/1veemlT5zWOcHTCVsyw57Ah/fCXB+SCtc9GrC4uPhmZ2fnbiGkAfAMzBP+qaf+WPNIf7ymHUa0fvKTf2k4U/jb376hcr1x4/IoKJLhEDaMIOFz7PkwC2c/l9m3/q/0PPBdKWy5peHnv/DCvZUwzR+NgocEr4rD3smiujKG6xWhURfnuF5RaEhdEDKZ81SQO8EJvBa15tj49si9PPro7zuPUEFkJu/977I4eUk6/tdPZfOZf5KO4mDd10PAEN7dc88vVx6DZ4a5Q0mUvyDLzM/PVzyalcJXAwMDyNNMCiF1sEMmJH/XAqGSLTIQGNh++ukPKmFNmGHwi9u/XxEZsHTxksx//MmaNsghmSNRCKGw6JMkRhnTZ3CjqsKeCs0RIaQG8GTMkAk5j7UEAiJjLw1ACITaw1FGfa488z8rHo1P5623SPd9fxbIFmGeWbUQIojcEYkf1ZMP/dtd1hMMn3IGTgQkTpMAJ9zrr38nUOhgezP+aE6j19sigzk2mFAXhZmjr8vVF3++cr9j46AU3/nbwPYIoeDVYA4Q8L0azhqOn46OjjH/dpXQIHyampqa5M4I+QAJy1qLFOMCHkqQk8wukr6WN4Okqz38HYfIwIuZUm/GpP/5H6+ZCLbB90C7+jOhIeZPPXUHczUx4yeCwari5Ayf8kMahclRh3ctXn212jNZy5t58sn3Vr0+qsgAMy8D1j/1Q1n32E4JgznaBMFB3WISK5P9/f0rE4FXlfJk+JQf4DXAE3j//a8kCbZsGQwkAOZaJiRUG3kzCJls78f2mJZULK7psDTyKkG9kVp5mf4Xflzztfh8DGM3ygMhV2N6Xa+++hlnC8eIvaxpldAgfLp69SpGoIaFZI5fdyUrVodNv9/w9fbwdy3v5/KTu+Xaibcrtwd+dli9kkekES55GSyL2Lnz7yu3ISaYTFgL5GogLL6I2gW0SDQ8h2WFmvs6LSwsvCmEyHK+xQQ7D9TDHpmCQNbyfnyRARCdmVffqPuernkZUzDWGlF68MHSym2ET9wgLz6wrMm8X1No5ubmRjmnhgCUxPSBh9KoWp2dy6lXt3fdo9UeTCOxcc3LmOIBjh79rO5r7d+SVIjahox7y5pWqLndCibZ6OjTYb25T0hbY5aBaLRoEh6BmcvBjpD1cjkDLx+uXM8cvS4uEJuFc+dk8ewXVbmYoHkZH38Zgz+iBA+n3jIDOydTq84xcUdHm1aVnam7r9Ps7Oyh3t5eCk0bg5PVLIbVyJuxT1Lbs7CpJTbTz/207uuDzpfxcy/+vk9riQfE0A/3UFidxMKo/UDdvbfh1XR2dh4X0rbYq6UbjTbZ+Y0gJSMgNnYYVY8Nz/514BGqb3/7eh5prVXfd9zxjarXksiUzWFtn85GFpqrOSykbbFPvEZCc+5c9ckcdOcBCIhN1523V8Ikk1kjgbwW9vc06wfbmEXTXbfnJaupNw+vodBgqNucRkxIPczRHZdFkgsf/abqPkaUNn3w/2Tzp/9YtX5p7v1fVebfBMEuaNXIozFfS48mOhoFjdZ8XNZgfn7+gJC2JGyhKRfmPqpex9X74PaV2/b8mqWLFyUIyNOQ9IFTYo82+awpNPRq2he/AFWS2HmXGSNEmnvvV1XPdWzcKEFoFCqR5FhYWKi7fKlLAgCvplAoDAtpK+xFho0mv5mvdfGEeh/8rlyWPSv3MTkP+ZhKjRnD2ylo3qZRYatGNArlUMGPxMKk5nTrDh6t6dEAejXtib2os9E+U/bizKBig2HrDU//sOox5GPmrZBqYI35Myb2CNjgYP1QykwAZ7EPVaug+nDcL3JVi0BCA5iraT/sbWwbTdFfPcs2+Da+fZoAtsXGBAnioIWtgLlsAvmaRiNgZpiVxmr5FqahPgQKnQAXW7Yfy4XCr8+ybeSl2PNm/u7vynWXINQCYlO443aZfevtldnAEJf1KkCu9Wbs1eaNMCf0cfuVcDRKAvsEFhrAXE37gRPVP3EbeSn2amhcI6fjUkwKa5jC1pfxwcJOc5i6kdjZs4ZdN78jywSZbxc4dAJeAXMWxmojzLBjrVm29mroLAp/2ws7sfapHuaCUYAdLIkz5cHBwTVXEDgJTcWgs3M/V3a3D/aaJXMbXBuUhTDnsKRd+BvejOl1rVVy1N7Sl4Wv3FlcXAyUu3UWGi8W49KENgEnnykejQpE4XV2icyf/OTXkga1dtBsVHIUrzdFiSITCqxrGg3yQmehAVjZTa+mfTC9GpycjUafam1ngh0hk8beQXMtb8auPbPWanOymqDeDAglNBgv10wzh7vbBLuUqL2Nigm8mp//fLjqsWee+cBpuNsVe2uXeiVEbRvz9VmWS21SAnszIJTQgA0bNsCrGZeMWVhYEB12r/mcKq5MT09jRamQ8CCsMEdkcFI3yr3g9XaxqUceeXdVojYOsG2KvbUL6gQ38mbskqNmWQkSDBdvBoQWGu/D9krGQGhmZmZkamqq6nGIzOXLl+XatWsUmhjADpM+QXIvzz9/T1XeAzbYtM0WhbAgx/IXf/HWqu124cl873ulhraum+GRVTh5MyCS0GC4W68yLY7V09ODBDXyRiti44sMrvv6+jBSJiQaCC3s3Mta4dAbb3xn1dwUnOS33fZaw/CrEfCkIFb33vvLVZ8PwVhrM7xa28Fw6YEb+uf+uDgS+QzUXM3erBPD69atWxGbK1euVIkMhIjEg30S/83fNN5FE/ka7LNth1E40bEvty84QRY2+rtf/tEfvVYRC7tIFcKltURmeWTq11Xfj96MG3q+j3oOhhNOM4NrgeHuPBQyh9hAXBAqAYpM/MCrMeeqYGYtciT19k7yQRgFbwgnuTlr1xccAM8Hr4F34c8mxvPwYP7hH35bt/odbGp5TrXYvv2tqvsYIaM340yoQaAOiQlNuk7oVUkywgyXAEQGYpMHcIKZeYEzZ/6qaQ9wnPz33PPLKsEIuq82bO0RorD4c3aeeur2VYs/awFBNPM5EKhPP/2BkOBo5HJAz6n9EoLYkhdh4ra4sHMyds6GxAcE0g5RcBIH2XwNti+/fH9FaJEbCVMJbznc+dPKeyDsCSIywJxoiPd4550HhDhRDisyIHLo5IO4TU/sIxrD7ZIUsUXGDJf8Ye+8eDatAkIOlFfwJ+LBu0FY8vbbDwQqSu4Ljsj9FQFA/gVhGC61CqLfeec39PLNyrqlsDN4MWoGQQTwwBgyuRHVkYgtdAIXLlwo6ok+oWJTlJRATgZzZWrlZDDsDbFREZSurtg01Rk7dGoGkPN4/fXvNCydgOFlc+QHnsLLLw/Lgw9ukTxgrx6HkCFkCuoFkWX0T/ywDmfvkQjEOu6bxYzh3t5ePXCKNRO/SBBv3LgxU5FpVnBSPvfcPzd8jZ2EhTeyc+e7sc2VCQsEZufOv5cbbzxSGdnyJxfiu+ZNZOzcov0cRlH9AY6MiBQy+cQ+wQQzhtMu+6mfV/e5PMyhgdvfjKwVXvi5jlpzZTATOIt6vAjDMMfGX5mNBPRbb5Ulr+DYrSU2/mNzc3OZHsMImfQ7Rp6+Emvo5KPhSkkz1BNCVsD0+2baRH7LlsHAc0zgyUBc7MWTECqMCtXb+9oH4oD3gCCHrXIHrwWzle2ZwiDvo3y+qAANUSrik4e5YFFGmWwSERqgieH92mDcu7uNgNjUCpuWR6r+pGa1O4RoGC73X4eEchixwXwce9gc+Rgs8GyGEhC+2GC5jO/lZDwXrKzRyVaJicR8MpSS0KuykLYBYgLvwS7ybc4ExrU5FG5WucPrMHoVR8gFccGs5GapM4PwCMICoYHIIL+YoSeDXOs2iZHEPBqgCj1cKBROCmk76nk3PvBeIALwXuwRuTCeDUQKCWDwox+tvbAyb5h5GogOBAejpXr+SNrod3jcddHkWiQqNECz5oe04XYLaTuizASOEkY1G/ZcMIyS+mFU2mITZ17GJHGhwdwaHYI+LRkuTyDZAsHBxDwki122q8UkuxdeuFdamXoTTs2cTYpiM6Z5mVhDJp/Ex80wtybL5Qkke+CdYDYx1hZhOBwCEmQRpMtWLc2Kn5OxE78InyAwSAyj5lIKlPWzEjtPE/dofHQUajTt5Qkk32BF9scf/64y58Uelr7jjm9URImzeJMHyV8VtrvX2gQuCqkJTRbLE0j+wQgTJtiZZSAoMumiHtXdmvxNtCxvalMOGUKRWhw9+hlFJlv2Ji0yINW5zd6OdpmW/iT5Atuc+OUiMNxNkUkPjDBhyZCkQGqhkw9DKGKDUanlJQjc+zotkhrGrkfqQgMuXbq0o6ur65gQQlInbZEBmSwLRQiFGhdCCEmVLEQGZOLRAE7kIyRdshIZkFmhC45CEZIeWYoMyLQqFOoMM4QiJFmyFhmQWejkwxCKkORIYiV2GDIXGnDlypUhHe4+ySHv5mB2tkP+4z86Zd06kc2bU1mHQxzBsgIVmYfD7CqZBLkQGjA9PY0q6weF5J7PPuuSubnlQ+eGGxZUbBaF5AoskNyW5NolV3Kz+30WRc1JOBYXr/8/LdChyRvjeRMZkBuhATMzMw8Ly3/mnm99a0HDpiXp61uSYnFJSD7AwIr+Yd+dN5EBuQmdfFj+kxA3vBq/qa1bCkPuhAYwX0NIYMpI+qaxAjsKuRQaoGKDtVA7hBBSj+MaJsWywVvS5CpHY3Lt2jXMGi4LIaQKhEp6tVdDpYebQWRAbj0awPk1hKwCo0oP5zHh24jcejQAcaeq914hhPiFqnI5qrQWufZofLg3FGlzxr2lBLlO+DaiKYQGXL169aQq+rAQ0iZ4uZjDWS+IjIOmERouviRtxhj2WWrGMKkWTSM0QL2akqo8JvOVhJAWBF4M8pJ5WHEdJ00lNIAjUaRVwRIChEnNMmTtQq5HnWrBkSjSgox5m7jtaUWRAU3n0fhwmQJpAcYXFhb25qVmTJI0rdCAqakpuJn7hJAmolXzMI1oaqEBFBvSLPjD1V7tpZYMkerR9EIDOKGP5Jl2FhiflhAaoGIzqmKzSwjJCRSY67SM0ACKDckDFJjVtJTQAIoNyZCyNxdmlAJTTcsJDWCCmKTMmA5TH2iHYeqwtKTQAIoNSYHjKjCHKTBr07JCAyg2JG6YfwlHSwsN0JzNiOZsXhFCosHwKAItLzQACzFVbFDsvCSEBMT3XvT6eDMXncoDbSE0gCUmiAP0XmKmbYQGoHhWd3f3fs4iJjXACuo3OTSdDG0lND5MEhPgh0YqMGP0XpKlSmi++OKLIW30kv7jl2+++eaWjkkZSrUn3vaxRzQ0Ok5xSY+K0EBgtPHtZGl5dnZ229atW8uSEth3W0WuqJ87vmnTprI4Anv9HaW5ubmxIPYMpdoDikv2dJw/f76kXsxp7Yixa9eu7YWwGMIjetLfrY8lHrNOT0+jiNUe725Zv8vdKhaBP9caxp7U37Qt6EiBZ4tQqiSkVSjr5U2KSz7o1BPyoCp++cYbb3zY914QNkFg9Gaxq6trj6SD+Tkl9TSc9t1WYTS9EtQTHgloivKgo9oGp4Q0O2PYZE2Pha0bNmzAZQ9FJh906WVYLwfsJ+DFfP7550e00+6XFNADBFt9Dhn3y+KA2uL1Q8ZDrjmmspCmAiGReqJYBnBKR4uOc7Qov0Bo8O+feQfpQfO4XiH0KekB4zyHQW1QsLyoHhrCvjHXMonqwR3q6enBZ2Pld2Wo08vdlITkBu8P6RRDouai46uvvsLIi2jotM1+8ssvv5zQq7GbbrrpcWlDMDKlgjOiN3dze5dsoNfSGnRoeISRnpN62X/DDTdUQqiJiYmi/rsjObvDSwaXpY3xBGe/3nyIgpMs3ggR9pp+U++Ocep/a+APb2M/GQjLpHepnEza6dtafT6NCxAc/WfdwZAqPkxhQVjEcKg1WZmwh2FuPYmGtbORpyjPzc0dT2NYu1nBkHihUNil7TUsJDCesCAHdorC0j605RKEOPFmGGNo/iGhl7MKP3mrwjKuwjzWKpvWEzcoNDGCmcl6MmH+T7uKThneinrGH0JgkF9h8pYACk1CePkcJNofQnjVSklkP6+iNz+Ep6LX4zoiVKaokHpQaFICxbf0CgW4MM/nLm++T97FpyzLEx/P6vctw0vp6uoqM/whrlBoMgTioydvETOiVYBKngBBfEopiFDZ80wqnoh+7lnMxsaFYkLihkKTY7zwqwgxwgUr2/E4Vqg3sjOXb6iAQEwqF80fTa5bt26SIQ4hhBCSJAglMHIjIUF9GdjrdUlCkLU9iNoGWdvnoQ8wxynsb/Dtp6amnKoHmOCz47AP2wawx2+I2oZZ9UGiaJiwb3p6esm7TODLutijYyz7kos9Xq/vccGzv+DaSLDH5xrfwbm8htqc9u3RHuIIavoY9icdzWPpA6MNo/bBUtZ9oN/FeZsesw/CtGHM50GoNjT7wLUN7T7wj+NOyQmaS4hUj8aqkgd7pwbC640ELPIhrvb4viXjIaeqfd4BYZbJ2O9ykHmv3WPYD3sjXYFRmxHjbqg+MNowah9IDH3gJNZ2H+h3GdE22RLU3u4DWW6Dkjig54HZ5qXe3t4RccCuFqmJfad96O0+UJzsNQ+I9iv5973JrPkRGhskMSUCUROe2mEXJBpOn5/HBK1rH3jFvkNjt4H2wUZxAEPw1kNlcQCjbfZjk5OTF8WBqG2gv7nK3rUPMHpo3tfBBKfvL1abuR6XNV6fr+MaMZ3vcuntUXEE/96Gy3YSIzYu9ni9YT/hao9/M3U5Rz2X+4KrNwGwO4NvH9Lt32O4/fvFEfyjG21wzNHcbsOTYdowSh8AbfdDvn3YPkD7e304Io5cunQJoctE2D40j2P8FnEEbaaf7Yd/JzFa6WJvHsdh+hD4fRD2PEgF14axCdMwcdpH/f7+ULaEJKq9/x4Sgaz7gBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQkjLg3UWUaafR7UHcdi7Lu2P0x62Ue2bvQ+wviZqTaAoa3TiqukjITFq+oQ6DuKqqxTFPjH04Npl1MFwXtCnP2rIqoXiupisalGl64HmnWAn/Xo2YQofof5JlFoqVi2Tg47mdj2Z02HaMGo9mqh9ELUejdkHYWoCWX3gfBzXqKvk2gdDMfbBUhjBM2v6hOmDRLEOkCWsgnWxN07yUKuXjVW/vv1xR/sR0x6/x8XeWzlt2l9wrUdj2S+5nqh2H7iuXrb7wHX1cQJ94FTqo0YfLKXdB8bK61Anqt0Het+peJfdB64F1LzV66v6IDf1aKKuGI77/VxroYi3X7lB1DoekdvDtQ1iWPUda+2REH1gk3pNILsNXNvU3v0iak0g13o0CdRFivv9omHWUkEdDHHEq7N6IWwtE7OWCt4nYi2VpTChE+rwhPXIgF/PZjpkTR+rD067niT4946zD8LkSWZmZo759iHD1/1R+sBswzD1ZPx6NmHPgzjqKkXtA6sezYjkDTRKlCScbx/lnxmClaU9vn+UZGhcbSghwW/Pug+8/dAzq+kD2zwMSkgEsm5DQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQFok6/j6OmT5b2oNnrMiWGVUfDuZaKV0fDX2J/LEwtFWOJvXMdD2DUMgm1wTxqmXhtgMVwu8QRtdvtt2GYWipx9IHRhmH6oBi1D0z7MG1o1pMJ04ZmH0xHrwkU6jg2F1WGqUdjtmGY49g8D8L0QaLYtVBcC+7YdThc63jUqMPhWsdjJEodD3TodMb1aOxaKK41gazCXanXBKpRC8WpJlCNPmi6ejQQp+kINYHM1ethjuOmq0fjuvJzcXHRruNREgfsOiBKSdyI9P3Xer+1WLdu3arXh/gOJfNOZ2dnpFoqadcEcv2+aZB2PZqoxNBnNe1zIzTawAeMu+Xu7u5xcUDtj/i3UfynUCg4KbnaHDKLBmkHH3Ywl7m5uVG9Khvv96Y40N/fP6424+bnb9q0KfBBtn79+rLaHDEeGh8YGBgTB+w+0DYcEwfm5+cj9YEyGrEP4AGVje9wxMUefaBXxw37Ay59gNfCxnhozLUPFPM3O/eBttkBvw3D9IH3+rJvH0MfONmnAsIlhCBhVdWrpZKpPVzHKIWlo9rDFu8R9jfkoQ/iaIMoyUyvDZxCHpOoxc2j1lWCfZSaPrCLoy5T1IQyIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEJIVhh1ME6HrKXi20+EqQMCYAd7lDsIU7QHtUi8Ghwnw9RS8e3RBmHWyqCejN+GYTa4z0MfePVg/D4oiSP4XL+mT5g2NOrJTIRpQ9RfgT0uYdvQqKuUek0goN/dLzVxOmRNoH1R+iBRpiPWo7FroYSo47EnSh0Puw6Hax0P7wBbVcfDBbsNXQ8yuxZK1D4IUY9mJM4+wIniYl+rD1zb0O6DJqwJNJJETaDclIkQqxZKR0dHSRzQ1w+b913r0SwtLVUdEIVC4S5xoLOzs2S9X0kc6Orqsl/vVM7RWylbst7T9d+kZN7RNnCyr9EGrrVYhq3Pj9QH4lhTqLu72/6+zhUC7c+MWo+mxnHhZK9tskXcGLLez8m+Rj2aUuVxyQlW3QvnOhxSXcdDXOtw6OePmvcXFhacapno5x03a6m41kKZn58fF6OOh3LctR6NHhRjxkNl11oo5nfGb9H3c/o3q1GDZ1QciNoHNWoCOdVCiVoTCK+1agKVo9ajce0DuyaQXh0QN+KuCVT5/A7JEXDb9KqIkxYnjjgCtw3/wto4YQoOVeqIaMfuCGsPr0JtR/TmeF9fn9MB4tvryVVxldV+VL9L4IMc4B9V/5VhXwxjD7LuA78No9jrwY5+nAxjD7zfIGH60LfHPzvsw/QBQlZ49GHtveNoGH/WYfrQt1eRKMfVB/8F6Hs5AEoN5qAAAAAASUVORK5CYII=", lo = { class: "fr-container flex" }, so = { class: "half" }, oo = { class: "fr-h1" }, io = { class: "flex fr-my-md-3w" }, uo = { class: "fr-h6" }, co = /* @__PURE__ */ R({
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
          c("h1", oo, g(t.title), 1),
          c("span", io, g(t.subtitle), 1),
          c("p", uo, g(t.description), 1),
          c("p", null, g(t.help), 1),
          (n = t.buttons) != null && n.length ? (i(), H(Tt, {
            key: 0,
            buttons: t.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : b("", !0),
          B(t.$slots, "default", {}, void 0, !0)
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
}, vo = { class: "fr-fieldset__element" }, cn = /* @__PURE__ */ R({
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
          class: O(["fr-fieldset__legend", t.legendClass])
        }, [
          V(g(t.legend) + " ", 1),
          B(t.$slots, "legend")
        ], 10, mo)) : b("", !0),
        t.hint || (s = (l = t.$slots).hint) != null && s.call(l) ? (i(), f("div", ho, [
          c("span", {
            class: O(["fr-hint-text", t.hintClass])
          }, [
            V(g(t.hint) + " ", 1),
            B(t.$slots, "hint")
          ], 2)
        ])) : b("", !0),
        c("div", vo, [
          B(t.$slots, "default")
        ])
      ]);
    };
  }
}), go = ["href", "download"], bo = { class: "fr-link__detail" }, fn = /* @__PURE__ */ R({
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
      V(g(t.title) + " ", 1),
      c("span", bo, g(t.format) + " – " + g(t.size), 1)
    ], 8, go));
  }
}), yo = { class: "fr-downloads-group fr-downloads-group--bordered" }, ko = {
  key: 0,
  class: "fr-downloads-group__title"
}, wo = /* @__PURE__ */ R({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", yo, [
      t.title ? (i(), f("h4", ko, g(t.title), 1)) : b("", !0),
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
}, Co = ["id"], Eo = /* @__PURE__ */ R({
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
    }, l = w(() => Array.isArray(e.accept) ? e.accept.join(",") : e.accept);
    return (s, o) => (i(), f("div", {
      class: O(["fr-upload-group", {
        "fr-upload-group--error": s.error,
        "fr-upload-group--valid": s.validMessage,
        "fr-upload-group--disabled": s.disabled
      }])
    }, [
      c("label", {
        class: "fr-label",
        for: s.id
      }, [
        V(g(s.label) + " ", 1),
        "required" in s.$attrs && s.$attrs.required !== !1 ? (i(), f("span", xo, " *")) : b("", !0),
        s.hint ? (i(), f("span", Do, g(s.hint), 1)) : b("", !0)
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
        }, g(s.error ?? s.validMessage), 9, Co)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), Po = { class: "fr-follow__newsletter" }, Lo = { class: "fr-h5 fr-follow__title" }, Mo = { class: "fr-text--sm fr-follow__desc" }, Bo = { key: 0 }, So = ["title"], $o = { key: 1 }, Ao = { action: "" }, Oo = {
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
}, pn = /* @__PURE__ */ R({
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
        c("h3", Lo, g(r.title), 1),
        c("p", Mo, g(r.description), 1)
      ]),
      r.onlyCallout ? (i(), f("div", Bo, [
        c("button", {
          class: "fr-btn",
          title: r.buttonTitle,
          onClick: l[0] || (l[0] = (s) => r.buttonAction ? r.buttonAction(s) : () => {
          })
        }, g(r.buttonText), 9, So)
      ])) : (i(), f("div", $o, [
        c("form", Ao, [
          c("label", Oo, g(r.labelEmail), 1),
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
            }, g(r.buttonText), 9, Vo)
          ]),
          r.error ? (i(), f("div", No, [
            c("p", qo, g(r.error), 1)
          ])) : b("", !0),
          c("p", jo, g(r.hintText), 1)
        ])
      ]))
    ]));
  }
}), Ho = { class: "fr-follow__social" }, Wo = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, Ko = ["title", "href"], mn = /* @__PURE__ */ R({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Ho, [
      (i(), H(ge(t.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: Z(() => e[0] || (e[0] = [
          V(" Suivez-nous "),
          c("br", null, null, -1),
          V(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      t.networks.length ? (i(), f("ul", Wo, [
        (i(!0), f(z, null, J(t.networks, (n, r) => (i(), f("li", { key: r }, [
          c("a", {
            class: O(["fr-btn", `fr-btn--${n.type}`]),
            title: n.name,
            href: n.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, g(n.name), 11, Ko)
        ]))), 128))
      ])) : b("", !0)
    ]));
  }
}), Qo = { class: "fr-follow" }, Yo = { class: "fr-container" }, zo = { class: "fr-grid-row" }, Go = /* @__PURE__ */ R({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(a) {
    const t = a, e = w(() => t.networks && t.networks.length), n = w(() => typeof t.newsletterData == "object");
    return (r, l) => (i(), f("div", Qo, [
      c("div", Yo, [
        c("div", zo, [
          B(r.$slots, "default", {}, () => [
            r.newsletterData ? (i(), f("div", {
              key: 0,
              class: O(["fr-col-12", { "fr-col-md-8": e.value }])
            }, [
              ee(pn, Ie(kt(r.newsletterData)), null, 16)
            ], 2)) : b("", !0),
            e.value ? (i(), f("div", {
              key: 1,
              class: O(["fr-col-12", { "fr-col-md-4": n.value }])
            }, [
              ee(mn, { networks: r.networks }, null, 8, ["networks"])
            ], 2)) : b("", !0)
          ])
        ])
      ])
    ]));
  }
}), Pa = 1, hn = /* @__PURE__ */ R({
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
    const t = a, e = w(() => {
      var p;
      return (p = t.href) == null ? void 0 : p.startsWith("http");
    }), n = w(() => {
      var p;
      return (p = t.href) == null ? void 0 : p.startsWith("mailto");
    }), r = w(() => t.button ? "button" : e.value || n.value ? "a" : "RouterLink"), l = w(() => {
      if (!(!e.value && !n.value))
        return t.href;
    }), s = w(() => {
      if (!(e.value || n.value))
        return t.to;
    }), o = w(() => s.value ? { to: s.value } : { href: l.value }), u = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), d = w(
      () => typeof t.icon == "string" ? { name: t.icon, scale: Pa, ...t.iconAttrs ?? {} } : { scale: Pa, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (p, h) => (i(), H(ge(r.value), Q({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": u.value && p.iconRight,
        "fr-btn--icon-left": u.value && !p.iconRight,
        [String(p.icon)]: u.value
      }]
    }, o.value, {
      target: p.target,
      onClick: te(p.onClick, ["stop"])
    }), {
      default: Z(() => {
        var m, C;
        return [
          !u.value && (p.icon || (m = p.iconAttrs) != null && m.name) && !p.iconRight ? (i(), H(be, Q({
            key: 0,
            class: "fr-mr-1w"
          }, d.value), null, 16)) : b("", !0),
          V(" " + g(p.label) + " ", 1),
          !u.value && (p.icon || (C = p.iconAttrs) != null && C.name) && p.iconRight ? (i(), H(be, Q({
            key: 1,
            class: "fr-ml-1w"
          }, d.value), null, 16)) : b("", !0)
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
}, ei = ["href"], ti = ["src", "alt"], ai = { class: "fr-footer__partners-sub" }, ni = ["href"], ri = ["src", "alt"], vn = /* @__PURE__ */ R({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Xo, [
      t.title ? (i(), f("h4", Uo, g(t.title), 1)) : b("", !0),
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
        ])) : b("", !0),
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
}), li = ["innerHTML"], nt = /* @__PURE__ */ R({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(a) {
    const t = a, e = w(() => Array.isArray(t.logoText) ? t.logoText.join("<br>") : t.logoText);
    return (n, r) => (i(), f("p", {
      class: O(["fr-logo", {
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
}, Di = /* @__PURE__ */ R({
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
    const t = a, e = w(() => [
      ...t.beforeMandatoryLinks,
      ...t.mandatoryLinks,
      ...t.afterMandatoryLinks
    ]), n = Gt(), r = w(() => {
      var p;
      return (p = n["footer-link-lists"]) == null ? void 0 : p.call(n);
    }), l = w(() => {
      const p = t.licenceTo || t.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), s = w(() => {
      const { to: p, href: h, ...m } = t.licenceLinkProps ?? {};
      return m;
    }), o = w(() => l.value ? "" : t.licenceTo), u = w(() => l.value ? t.licenceTo : ""), d = w(() => typeof t.operatorTo == "string" && t.operatorTo.startsWith("http"));
    return (p, h) => {
      const m = xe("RouterLink");
      return i(), f("footer", si, [
        r.value ? (i(), f("div", oi, [
          c("div", ii, [
            c("div", ui, [
              B(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : b("", !0),
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
              ], 8, pi)) : (i(), H(m, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: Z(() => [
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
                default: Z(() => [
                  ee(nt, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            c("div", gi, [
              c("p", bi, [
                B(p.$slots, "description", {}, () => [
                  V(g(p.descText), 1)
                ], !0)
              ]),
              c("ul", yi, [
                (i(!0), f(z, null, J(p.ecosystemLinks, ({ href: C, label: _, title: L, ...k }, x) => (i(), f("li", {
                  key: x,
                  class: "fr-footer__content-item"
                }, [
                  c("a", Q({
                    class: "fr-footer__content-link",
                    href: C,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: L,
                    ref_for: !0
                  }, k), g(_), 17, ki)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (i(), H(vn, Ie(Q({ key: 0 }, p.partners)), null, 16)) : b("", !0),
          c("div", wi, [
            c("ul", _i, [
              (i(!0), f(z, null, J(e.value, (C, _) => (i(), f("li", {
                key: _,
                class: "fr-footer__bottom-item"
              }, [
                ee(hn, Q({ ref_for: !0 }, C), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (i(), f("div", xi, [
              c("p", null, [
                V(g(p.licenceText) + " ", 1),
                (i(), H(ge(l.value ? "a" : "RouterLink"), Q({
                  class: "fr-link-licence no-content-after",
                  to: l.value ? void 0 : o.value,
                  href: l.value ? u.value : void 0,
                  target: l.value ? "_blank" : void 0,
                  title: l.value ? `${p.licenceName} (nouvelle fenêtre)` : p.licenceName,
                  rel: "noopener noreferrer"
                }, s.value), {
                  default: Z(() => [
                    V(g(p.licenceName), 1)
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
}), Ti = /* @__PURE__ */ we(Di, [["__scopeId", "data-v-4030eed5"]]), Ii = { class: "fr-footer__top-cat" }, Ci = { class: "fr-footer__top-list" }, Ei = ["href"], Pi = /* @__PURE__ */ R({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(a) {
    return (t, e) => {
      const n = xe("RouterLink");
      return i(), f("div", null, [
        c("h3", Ii, g(t.categoryName), 1),
        c("ul", Ci, [
          (i(!0), f(z, null, J(t.links, (r, l) => (i(), f("li", { key: l }, [
            typeof r.to == "string" && r.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: r.to
            }, g(r.label), 9, Ei)) : b("", !0),
            typeof r.to == "object" || typeof r.to == "string" && !r.to.startsWith("http") ? (i(), H(n, {
              key: 1,
              class: "fr-footer__top-link",
              to: r.to
            }, {
              default: Z(() => [
                V(g(r.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : b("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Li = { class: "fr-connect-group" }, Mi = ["href", "title"], Bi = /* @__PURE__ */ R({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", Li, [
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
        }, g(`Qu’est-ce que FranceConnect${t.secure ? "+" : ""} ?`), 9, Mi)
      ])
    ]));
  }
}), Si = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, $i = { class: "fr-nav__item" }, Ai = ["aria-controls", "aria-expanded"], Oi = { class: "fr-hidden-lg" }, Ri = ["id"], Fi = { class: "fr-menu__list" }, Vi = ["hreflang", "lang", "aria-current", "href", "onClick"], rt = /* @__PURE__ */ R({
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
    const h = w(
      () => e.languages.find(({ codeIso: m }) => m === e.currentLanguage)
    );
    return de(d, (m, C) => {
      m !== C && o(m);
    }), (m, C) => {
      var _, L;
      return i(), f("nav", Si, [
        c("div", $i, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": m.id,
            "aria-expanded": d.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: C[0] || (C[0] = te((k) => d.value = !d.value, ["prevent", "stop"]))
          }, [
            V(g((_ = h.value) == null ? void 0 : _.codeIso.toUpperCase()), 1),
            c("span", Oi, " - " + g((L = h.value) == null ? void 0 : L.label), 1)
          ], 8, Ai),
          c("div", {
            id: m.id,
            ref_key: "collapse",
            ref: r,
            class: O(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": q(s), "fr-collapsing": q(l) }]),
            onTransitionend: C[1] || (C[1] = (k) => q(u)(d.value))
          }, [
            c("ul", Fi, [
              (i(!0), f(z, null, J(m.languages, (k, x) => (i(), f("li", { key: x }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: k.codeIso,
                  lang: k.codeIso,
                  "aria-current": m.currentLanguage === k.codeIso ? !0 : void 0,
                  href: `#${k.codeIso}`,
                  onClick: te((T) => p(k), ["prevent", "stop"])
                }, g(`${k.codeIso.toUpperCase()} - ${k.label}`), 9, Vi)
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
}, Hi = /* @__PURE__ */ R({
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
    }, s = w(() => e.isTextarea ? "textarea" : "input"), o = w(() => e.isWithWrapper || n.type === "date" || !!e.wrapperClass), u = w(() => [
      "fr-label",
      { invisible: !e.labelVisible },
      e.labelClass
    ]);
    return t({
      focus: l
    }), (d, p) => (i(), f(z, null, [
      c("label", {
        class: O(u.value),
        for: d.id
      }, [
        B(d.$slots, "label", {}, () => [
          V(g(d.label) + " ", 1),
          B(d.$slots, "required-tip", {}, () => [
            "required" in d.$attrs && d.$attrs.required !== !1 ? (i(), f("span", qi, "*")) : b("", !0)
          ], !0)
        ], !0),
        d.hint ? (i(), f("span", ji, g(d.hint), 1)) : b("", !0)
      ], 10, Ni),
      o.value ? (i(), f("div", {
        key: 1,
        class: O([
          { "fr-input-wrap": d.isWithWrapper || d.$attrs.type === "date" },
          d.wrapperClass
        ])
      }, [
        (i(), H(ge(s.value), Q({ id: d.id }, d.$attrs, {
          ref_key: "__input",
          ref: r,
          class: ["fr-input", {
            "fr-input--error": d.isInvalid,
            "fr-input--valid": d.isValid
          }],
          value: d.modelValue,
          "aria-describedby": d.descriptionId || void 0,
          onInput: p[1] || (p[1] = (h) => d.$emit("update:modelValue", h.target.value))
        }), null, 16, ["id", "class", "value", "aria-describedby"]))
      ], 2)) : (i(), H(ge(s.value), Q({
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
        onInput: p[0] || (p[0] = (h) => d.$emit("update:modelValue", h.target.value))
      }), null, 16, ["id", "class", "value", "aria-describedby"]))
    ], 64));
  }
}), Ct = /* @__PURE__ */ we(Hi, [["__scopeId", "data-v-7ca45de8"]]), lt = /* @__PURE__ */ R({
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
      class: O(["fr-search-bar", { "fr-search-bar--lg": n.large }]),
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
        default: Z(() => [
          V(g(n.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), La = 1, sa = /* @__PURE__ */ R({
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
    const t = a, e = w(() => typeof t.path == "string"), n = w(() => {
      var h;
      return ((h = t.href) == null ? void 0 : h.startsWith("http")) || e.value && t.path.startsWith("http") || typeof t.to == "string" && t.to.startsWith("http");
    }), r = w(() => {
      var h;
      return ((h = t.href) == null ? void 0 : h.startsWith("mailto")) || e.value && t.path.startsWith("mailto") || typeof t.to == "string" && t.to.startsWith("mailto");
    }), l = w(() => t.button ? "button" : n.value || r.value ? "a" : "RouterLink"), s = w(() => {
      if (!(!n.value && !r.value))
        return t.to ?? t.href ?? t.path;
    }), o = w(() => {
      if (!(n.value || r.value))
        return t.to ?? t.path;
    }), u = w(() => o.value ? { to: o.value } : { href: s.value }), d = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), p = w(
      () => typeof t.icon == "string" ? { name: t.icon, scale: La, ...t.iconAttrs ?? {} } : { scale: La, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (h, m) => (i(), H(ge(l.value), Q({
      class: ["fr-btn", {
        "fr-btn--icon-right": d.value && h.iconRight,
        "fr-btn--icon-left": d.value && !h.iconRight,
        [String(h.icon)]: d.value
      }]
    }, u.value, {
      target: h.target,
      onClick: m[0] || (m[0] = te((C) => h.onClick(C), ["stop"]))
    }), {
      default: Z(() => {
        var C, _;
        return [
          !d.value && (h.icon || (C = h.iconAttrs) != null && C.name) && !h.iconRight ? (i(), H(be, Q({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : b("", !0),
          V(" " + g(h.label) + " ", 1),
          !d.value && (h.icon || (_ = h.iconAttrs) != null && _.name) && h.iconRight ? (i(), H(be, Q({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : b("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Wi = ["aria-label"], Ki = { class: "fr-btns-group" }, qt = /* @__PURE__ */ R({
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
}, bu = /* @__PURE__ */ R({
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
    const h = () => {
      u.value = !0, s.value = !0, o.value = !1, setTimeout(() => {
        var x;
        (x = document.getElementById("close-button")) == null || x.focus();
      });
    }, m = () => {
      u.value = !0, s.value = !1, o.value = !0;
    }, C = d, _ = w(() => [e.homeLabel, e.serviceTitle].filter((x) => x).join(" - ")), L = w(() => !!r.operator || !!e.operatorImgSrc), k = w(() => !!r.mainnav);
    return Re(ra, () => d), (x, T) => {
      var M, v, I;
      const E = xe("RouterLink");
      return i(), f("header", Qi, [
        c("div", Yi, [
          c("div", zi, [
            c("div", Gi, [
              c("div", Xi, [
                c("div", Ui, [
                  c("div", Zi, [
                    ee(E, {
                      to: x.homeTo,
                      title: _.value
                    }, {
                      default: Z(() => [
                        ee(nt, {
                          "logo-text": x.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  L.value ? (i(), f("div", Ji, [
                    B(x.$slots, "operator", {}, () => [
                      x.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: x.operatorImgSrc,
                        alt: x.operatorImgAlt,
                        style: Te(x.operatorImgStyle)
                      }, null, 12, eu)) : b("", !0)
                    ])
                  ])) : b("", !0),
                  x.showSearch || k.value || (M = x.quickLinks) != null && M.length ? (i(), f("div", tu, [
                    x.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": x.showSearchLabel,
                      title: x.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: T[0] || (T[0] = te((D) => m(), ["prevent", "stop"]))
                    }, null, 8, au)) : b("", !0),
                    k.value || (v = x.quickLinks) != null && v.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": h,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "dialog",
                      "aria-label": x.menuLabel,
                      title: x.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: T[1] || (T[1] = te((D) => h(), ["prevent", "stop"]))
                    }, null, 8, nu)) : b("", !0)
                  ])) : b("", !0)
                ]),
                x.serviceTitle ? (i(), f("div", ru, [
                  ee(E, Q({
                    to: x.homeTo,
                    title: _.value
                  }, x.$attrs), {
                    default: Z(() => [
                      c("p", lu, [
                        V(g(x.serviceTitle) + " ", 1),
                        x.showBeta ? (i(), f("span", su, " BETA ")) : b("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  x.serviceDescription ? (i(), f("p", ou, g(x.serviceDescription), 1)) : b("", !0)
                ])) : b("", !0),
                !x.serviceTitle && x.showBeta ? (i(), f("div", iu, T[9] || (T[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : b("", !0)
              ]),
              c("div", uu, [
                (I = x.quickLinks) != null && I.length || l.value ? (i(), f("div", du, [
                  B(x.$slots, "before-quick-links"),
                  s.value ? b("", !0) : (i(), H(qt, {
                    key: 0,
                    links: x.quickLinks,
                    "nav-aria-label": x.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  B(x.$slots, "after-quick-links"),
                  l.value ? (i(), H(rt, Q({ key: 1 }, l.value, {
                    onSelect: T[2] || (T[2] = (D) => n("languageSelect", D))
                  }), null, 16)) : b("", !0)
                ])) : b("", !0),
                x.showSearch ? (i(), f("div", cu, [
                  ee(lt, {
                    id: x.searchbarId,
                    label: x.searchLabel,
                    "model-value": x.modelValue,
                    placeholder: x.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": T[3] || (T[3] = (D) => n("update:modelValue", D)),
                    onSearch: T[4] || (T[4] = (D) => n("search", D))
                  }, null, 8, ["id", "label", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ]),
            x.showSearch || k.value || x.quickLinks && x.quickLinks.length || l.value ? (i(), f("div", {
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
                  onClick: T[5] || (T[5] = te((D) => d(), ["prevent", "stop"]))
                }, g(x.closeMenuModalLabel), 1),
                c("div", mu, [
                  l.value ? (i(), H(rt, Q({ key: 0 }, l.value, {
                    onSelect: T[6] || (T[6] = (D) => l.value.currentLanguage = D.codeIso)
                  }), null, 16)) : b("", !0),
                  B(x.$slots, "before-quick-links"),
                  s.value ? (i(), H(qt, {
                    key: 1,
                    role: "navigation",
                    links: x.quickLinks,
                    "nav-aria-label": x.quickLinksAriaLabel,
                    onLinkClick: q(C)
                  }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : b("", !0),
                  B(x.$slots, "after-quick-links")
                ]),
                u.value ? B(x.$slots, "mainnav", {
                  key: 0,
                  hidemodal: d
                }) : b("", !0),
                o.value ? (i(), f("div", hu, [
                  ee(lt, {
                    "searchbar-id": x.searchbarId,
                    "model-value": x.modelValue,
                    placeholder: x.placeholder,
                    "onUpdate:modelValue": T[7] || (T[7] = (D) => n("update:modelValue", D)),
                    onSearch: T[8] || (T[8] = (D) => n("search", D))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ], 10, fu)) : b("", !0),
            B(x.$slots, "default")
          ])
        ]),
        c("div", vu, [
          k.value && !u.value ? (i(), f("div", gu, [
            B(x.$slots, "mainnav", { hidemodal: d })
          ])) : b("", !0)
        ])
      ]);
    };
  }
}), yu = /* @__PURE__ */ R({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", {
      class: O(["fr-highlight", { [`fr-highlight--${t.color}`]: t.color }])
    }, [
      c("p", {
        class: O({
          "fr-text--lg": t.large && !t.small,
          "fr-text--sm": t.small && !t.large
        })
      }, [
        V(g(t.text) + " ", 1),
        B(t.$slots, "default")
      ], 2)
    ], 2));
  }
}), ku = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, wu = ["id", "data-testid"], _u = ["id", "data-testid"], xu = ["id", "data-testid"], Du = ["id", "data-testid"], Tu = /* @__PURE__ */ R({
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
      class: O(["fr-input-group", [
        {
          "fr-input-group--error": t.errorMessage,
          "fr-input-group--valid": t.validMessage && !t.errorMessage
        },
        t.wrapperClass
      ]])
    }, [
      B(t.$slots, "before-input"),
      B(t.$slots, "default"),
      t.$slots.default ? b("", !0) : (i(), H(Ct, Q({ key: 0 }, t.$attrs, {
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
        }, g(n), 9, wu))), 128)) : t.errorMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.errorMessage,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, g(t.errorMessage), 9, _u)) : b("", !0),
        Array.isArray(t.validMessage) ? (i(!0), f(z, { key: 2 }, J(t.validMessage, (n) => (i(), f("p", {
          id: t.descriptionId,
          key: n,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, g(n), 9, xu))), 128)) : t.validMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.validMessage,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, g(t.validMessage), 9, Du)) : b("", !0)
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
        var h = s.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(s), m = !ht(h, !1) && (!n.shadowRootFilter || n.shadowRootFilter(s));
        if (h && m) {
          var C = a(h === !0 ? s.children : h.children, !0, n);
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
}, Lu = function(a) {
  var t = a.tagName === "DETAILS" && Array.prototype.slice.apply(a.children).some(function(e) {
    return e.tagName === "SUMMARY";
  });
  return t;
}, Mu = function(a, t) {
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
  var r = Mu(n, a.form);
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
}, Ma = function(a) {
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
          return Ma(a);
        a.assignedSlot ? a = a.assignedSlot : !o && u !== a.ownerDocument ? a = u.host : a = o;
      }
      a = s;
    }
    if (Au(a))
      return !a.getClientRects().length;
    if (e !== "legacy-full")
      return !0;
  } else if (e === "non-zero-area")
    return Ma(a);
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
  Lu(t) || Ru(t));
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
}, ju = /* @__PURE__ */ gn.concat("iframe").join(","), Mt = function(a, t) {
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
  }, s, o = function(y, S, j) {
    return y && y[S] !== void 0 ? y[S] : r[j || S];
  }, u = function(y, S) {
    var j = typeof (S == null ? void 0 : S.composedPath) == "function" ? S.composedPath() : void 0;
    return l.containerGroups.findIndex(function($) {
      var A = $.container, U = $.tabbableNodes;
      return A.contains(y) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (j == null ? void 0 : j.includes(A)) || U.find(function(Y) {
        return Y === y;
      });
    });
  }, d = function(y) {
    var S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, j = S.hasFallback, $ = j === void 0 ? !1 : j, A = S.params, U = A === void 0 ? [] : A, Y = r[y];
    if (typeof Y == "function" && (Y = Y.apply(void 0, Yu(U))), Y === !0 && (Y = void 0), !Y) {
      if (Y === void 0 || Y === !1)
        return Y;
      throw new Error("`".concat(y, "` was specified but was not a node, or did not return a node"));
    }
    var re = Y;
    if (typeof Y == "string") {
      try {
        re = e.querySelector(Y);
      } catch (ne) {
        throw new Error("`".concat(y, '` appears to be an invalid selector; error="').concat(ne.message, '"'));
      }
      if (!re && !$)
        throw new Error("`".concat(y, "` as selector refers to no known node"));
    }
    return re;
  }, p = function() {
    var y = d("initialFocus", {
      hasFallback: !0
    });
    if (y === !1)
      return !1;
    if (y === void 0 || y && !Mt(y, r.tabbableOptions))
      if (u(e.activeElement) >= 0)
        y = e.activeElement;
      else {
        var S = l.tabbableGroups[0], j = S && S.firstTabbableNode;
        y = j || d("fallbackFocus");
      }
    else y === null && (y = d("fallbackFocus"));
    if (!y)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return y;
  }, h = function() {
    if (l.containerGroups = l.containers.map(function(y) {
      var S = Nu(y, r.tabbableOptions), j = qu(y, r.tabbableOptions), $ = S.length > 0 ? S[0] : void 0, A = S.length > 0 ? S[S.length - 1] : void 0, U = j.find(function(ne) {
        return We(ne);
      }), Y = j.slice().reverse().find(function(ne) {
        return We(ne);
      }), re = !!S.find(function(ne) {
        return Ne(ne) > 0;
      });
      return {
        container: y,
        tabbableNodes: S,
        focusableNodes: j,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: re,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: $,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: A,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: U,
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
          var De = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, Ce = S.indexOf(ne);
          return Ce < 0 ? De ? j.slice(j.indexOf(ne) + 1).find(function(W) {
            return We(W);
          }) : j.slice(0, j.indexOf(ne)).reverse().find(function(W) {
            return We(W);
          }) : S[Ce + (De ? 1 : -1)];
        }
      };
    }), l.tabbableGroups = l.containerGroups.filter(function(y) {
      return y.tabbableNodes.length > 0;
    }), l.tabbableGroups.length <= 0 && !d("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (l.containerGroups.find(function(y) {
      return y.posTabIndexesFound;
    }) && l.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, m = function(y) {
    var S = y.activeElement;
    if (S)
      return S.shadowRoot && S.shadowRoot.activeElement !== null ? m(S.shadowRoot) : S;
  }, C = function(y) {
    if (y !== !1 && y !== m(document)) {
      if (!y || !y.focus) {
        C(p());
        return;
      }
      y.focus({
        preventScroll: !!r.preventScroll
      }), l.mostRecentlyFocusedNode = y, Uu(y) && y.select();
    }
  }, _ = function(y) {
    var S = d("setReturnFocus", {
      params: [y]
    });
    return S || (S === !1 ? !1 : y);
  }, L = function(y) {
    var S = y.target, j = y.event, $ = y.isBackward, A = $ === void 0 ? !1 : $;
    S = S || it(j), h();
    var U = null;
    if (l.tabbableGroups.length > 0) {
      var Y = u(S, j), re = Y >= 0 ? l.containerGroups[Y] : void 0;
      if (Y < 0)
        A ? U = l.tabbableGroups[l.tabbableGroups.length - 1].lastTabbableNode : U = l.tabbableGroups[0].firstTabbableNode;
      else if (A) {
        var ne = l.tabbableGroups.findIndex(function(me) {
          var ve = me.firstTabbableNode;
          return S === ve;
        });
        if (ne < 0 && (re.container === S || Mt(S, r.tabbableOptions) && !We(S, r.tabbableOptions) && !re.nextTabbableNode(S, !1)) && (ne = Y), ne >= 0) {
          var De = ne === 0 ? l.tabbableGroups.length - 1 : ne - 1, Ce = l.tabbableGroups[De];
          U = Ne(S) >= 0 ? Ce.lastTabbableNode : Ce.lastDomTabbableNode;
        } else et(j) || (U = re.nextTabbableNode(S, !1));
      } else {
        var W = l.tabbableGroups.findIndex(function(me) {
          var ve = me.lastTabbableNode;
          return S === ve;
        });
        if (W < 0 && (re.container === S || Mt(S, r.tabbableOptions) && !We(S, r.tabbableOptions) && !re.nextTabbableNode(S)) && (W = Y), W >= 0) {
          var X = W === l.tabbableGroups.length - 1 ? 0 : W + 1, le = l.tabbableGroups[X];
          U = Ne(S) >= 0 ? le.firstTabbableNode : le.firstDomTabbableNode;
        } else et(j) || (U = re.nextTabbableNode(S));
      }
    } else
      U = d("fallbackFocus");
    return U;
  }, k = function(y) {
    var S = it(y);
    if (!(u(S, y) >= 0)) {
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
    var S = it(y), j = u(S, y) >= 0;
    if (j || S instanceof Document)
      j && (l.mostRecentlyFocusedNode = S);
    else {
      y.stopImmediatePropagation();
      var $, A = !0;
      if (l.mostRecentlyFocusedNode)
        if (Ne(l.mostRecentlyFocusedNode) > 0) {
          var U = u(l.mostRecentlyFocusedNode), Y = l.containerGroups[U].tabbableNodes;
          if (Y.length > 0) {
            var re = Y.findIndex(function(ne) {
              return ne === l.mostRecentlyFocusedNode;
            });
            re >= 0 && (r.isKeyForward(l.recentNavEvent) ? re + 1 < Y.length && ($ = Y[re + 1], A = !1) : re - 1 >= 0 && ($ = Y[re - 1], A = !1));
          }
        } else
          l.containerGroups.some(function(ne) {
            return ne.tabbableNodes.some(function(De) {
              return Ne(De) > 0;
            });
          }) || (A = !1);
      else
        A = !1;
      A && ($ = L({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: l.mostRecentlyFocusedNode,
        isBackward: r.isKeyBackward(l.recentNavEvent)
      })), C($ || l.mostRecentlyFocusedNode || p());
    }
    l.recentNavEvent = void 0;
  }, T = function(y) {
    var S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    l.recentNavEvent = y;
    var j = L({
      event: y,
      isBackward: S
    });
    j && (et(y) && y.preventDefault(), C(j));
  }, M = function(y) {
    (r.isKeyForward(y) || r.isKeyBackward(y)) && T(y, r.isKeyBackward(y));
  }, v = function(y) {
    Zu(y) && Ue(r.escapeDeactivates, y) !== !1 && (y.preventDefault(), s.deactivate());
  }, I = function(y) {
    var S = it(y);
    u(S, y) >= 0 || Ue(r.clickOutsideDeactivates, y) || Ue(r.allowOutsideClick, y) || (y.preventDefault(), y.stopImmediatePropagation());
  }, E = function() {
    if (l.active)
      return $a.activateTrap(n, s), l.delayInitialFocusTimer = r.delayInitialFocus ? Aa(function() {
        C(p());
      }) : C(p()), e.addEventListener("focusin", x, !0), e.addEventListener("mousedown", k, {
        capture: !0,
        passive: !1
      }), e.addEventListener("touchstart", k, {
        capture: !0,
        passive: !1
      }), e.addEventListener("click", I, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", M, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", v), s;
  }, D = function() {
    if (l.active)
      return e.removeEventListener("focusin", x, !0), e.removeEventListener("mousedown", k, !0), e.removeEventListener("touchstart", k, !0), e.removeEventListener("click", I, !0), e.removeEventListener("keydown", M, !0), e.removeEventListener("keydown", v), s;
  }, F = function(y) {
    var S = y.some(function(j) {
      var $ = Array.from(j.removedNodes);
      return $.some(function(A) {
        return A === l.mostRecentlyFocusedNode;
      });
    });
    S && C(p());
  }, P = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(F) : void 0, G = function() {
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
      var S = o(y, "onActivate"), j = o(y, "onPostActivate"), $ = o(y, "checkCanFocusTrap");
      $ || h(), l.active = !0, l.paused = !1, l.nodeFocusedBeforeActivation = e.activeElement, S == null || S();
      var A = function() {
        $ && h(), E(), G(), j == null || j();
      };
      return $ ? ($(l.containers.concat()).then(A, A), this) : (A(), this);
    },
    deactivate: function(y) {
      if (!l.active)
        return this;
      var S = Sa({
        onDeactivate: r.onDeactivate,
        onPostDeactivate: r.onPostDeactivate,
        checkCanReturnFocus: r.checkCanReturnFocus
      }, y);
      clearTimeout(l.delayInitialFocusTimer), l.delayInitialFocusTimer = void 0, D(), l.active = !1, l.paused = !1, G(), $a.deactivateTrap(n, s);
      var j = o(S, "onDeactivate"), $ = o(S, "onPostDeactivate"), A = o(S, "checkCanReturnFocus"), U = o(S, "returnFocus", "returnFocusOnDeactivate");
      j == null || j();
      var Y = function() {
        Aa(function() {
          U && C(_(l.nodeFocusedBeforeActivation)), $ == null || $();
        });
      };
      return U && A ? (A(_(l.nodeFocusedBeforeActivation)).then(Y, Y), this) : (Y(), this);
    },
    pause: function(y) {
      return l.active ? (l.manuallyPaused = !0, this._setPausedState(!0, y)) : this;
    },
    unpause: function(y) {
      return l.active ? (l.manuallyPaused = !1, n[n.length - 1] !== this ? this : this._setPausedState(!1, y)) : this;
    },
    updateContainerElements: function(y) {
      var S = [].concat(y).filter(Boolean);
      return l.containers = S.map(function(j) {
        return typeof j == "string" ? e.querySelector(j) : j;
      }), l.active && h(), G(), this;
    }
  }, Object.defineProperties(s, {
    _isManuallyPaused: {
      value: function() {
        return l.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function(y, S) {
        if (l.paused === y)
          return this;
        if (l.paused = y, y) {
          var j = o(S, "onPause"), $ = o(S, "onPostPause");
          j == null || j(), D(), G(), $ == null || $();
        } else {
          var A = o(S, "onUnpause"), U = o(S, "onPostUnpause");
          A == null || A(), h(), E(), G(), U == null || U();
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
}, rd = R({
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
    const r = K(null), l = w(() => {
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
        const o = t.default().filter((u) => u.type !== lr);
        return !o || !o.length || o.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), o) : sr(o[0], { ref: r });
      }
    };
  }
}), ld = ["aria-labelledby", "role", "open"], sd = { class: "fr-container fr-container--fluid fr-container-md" }, od = { class: "fr-grid-row fr-grid-row--center" }, id = { class: "fr-modal__body" }, ud = { class: "fr-modal__header" }, dd = ["title"], cd = { class: "fr-modal__content" }, fd = ["id"], pd = {
  key: 0,
  class: "fr-modal__footer"
}, Oa = 2, md = /* @__PURE__ */ R({
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
    const e = a, n = t, r = (_) => {
      _.key === "Escape" && h();
    }, l = w(() => e.isAlert ? "alertdialog" : "dialog"), s = K(null), o = K();
    de(() => e.opened, (_) => {
      var L, k;
      _ ? ((L = o.value) == null || L.showModal(), setTimeout(() => {
        var x;
        (x = s.value) == null || x.focus();
      }, 100)) : (k = o.value) == null || k.close(), u(_);
    });
    function u(_) {
      typeof window < "u" && document.body.classList.toggle("modal-open", _);
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
    async function h() {
      var _;
      await Qa(), (_ = e.origin) == null || _.focus(), n("close");
    }
    const m = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), C = w(
      () => m.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: Oa } : { scale: Oa, ...e.icon ?? {} }
    );
    return (_, L) => _.opened ? (i(), H(q(rd), { key: 0 }, {
      default: Z(() => {
        var k, x;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: o,
            "aria-modal": "true",
            "aria-labelledby": _.modalId,
            role: l.value,
            class: O(["fr-modal", { "fr-modal--opened": _.opened }]),
            open: _.opened
          }, [
            c("div", sd, [
              c("div", od, [
                c("div", {
                  class: O(["fr-col-12", {
                    "fr-col-md-8": _.size === "lg",
                    "fr-col-md-6": _.size === "md",
                    "fr-col-md-4": _.size === "sm"
                  }])
                }, [
                  c("div", id, [
                    c("div", ud, [
                      c("button", {
                        ref_key: "closeBtn",
                        ref: s,
                        class: "fr-btn fr-btn--close",
                        title: _.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: L[0] || (L[0] = (T) => h())
                      }, [
                        c("span", null, g(_.closeButtonLabel), 1)
                      ], 8, dd)
                    ]),
                    c("div", cd, [
                      c("h1", {
                        id: _.modalId,
                        class: "fr-modal__title"
                      }, [
                        m.value || C.value ? (i(), f("span", {
                          key: 0,
                          class: O({
                            [String(_.icon)]: m.value
                          })
                        }, [
                          _.icon && C.value ? (i(), H(be, Ie(Q({ key: 0 }, C.value)), null, 16)) : b("", !0)
                        ], 2)) : b("", !0),
                        V(" " + g(_.title), 1)
                      ], 8, fd),
                      B(_.$slots, "default", {}, void 0, !0)
                    ]),
                    (k = _.actions) != null && k.length || _.$slots.footer ? (i(), f("div", pd, [
                      B(_.$slots, "footer", {}, void 0, !0),
                      (x = _.actions) != null && x.length ? (i(), H(Tt, {
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
          ], 10, ld)
        ];
      }),
      _: 3
    })) : b("", !0);
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
}, _d = { class: "fr-input-wrap fr-icon-search-line" }, xd = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Dd = { key: 2 }, Td = ["id"], Id = /* @__PURE__ */ R({
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
    }, r = (W, X, le) => `${X}-${n(W, le)}`, l = K(null), s = K(!1), o = _e(a, "modelValue"), u = K(0), d = w(() => t.errorMessage || t.successMessage), p = w(() => t.errorMessage ? "error" : "valid"), h = [], {
      collapse: m,
      collapsing: C,
      cssExpanded: _,
      doExpand: L,
      onTransitionEnd: k
    } = Se(), x = () => document.querySelectorAll(`[id^="${t.id}-"][id$="-checkbox"]`), T = K(!1), M = K("");
    function v(W) {
      W.key === "Escape" && P();
    }
    function I(W) {
      var X, le;
      const me = W.target;
      !((X = l.value) != null && X.$el.contains(me)) && !((le = m.value) != null && le.contains(me)) && P();
    }
    function E(W, X) {
      if (window.ResizeObserver) {
        const le = new window.ResizeObserver((me) => {
          for (const ve of me)
            X(W, ve);
        });
        return le.observe(W), () => {
          le.unobserve(W), le.disconnect();
        };
      }
      return () => {
      };
    }
    function D(W) {
      const X = W.getBoundingClientRect();
      X.width !== u.value && (u.value = X.width);
    }
    function F() {
      s.value = !0, T.value = !0, l.value && h.push(E(l.value.$el, D)), document.addEventListener("click", I), document.addEventListener("keydown", v), setTimeout(() => {
        L(!0);
      }, 100);
    }
    function P() {
      s.value = !1, L(!1), setTimeout(() => {
        T.value = !1;
      }, 300), y();
    }
    const G = async () => {
      T.value ? P() : F();
    };
    function y() {
      for (; h.length; ) {
        const W = h.pop();
        W && W();
      }
      document.removeEventListener("click", I), document.removeEventListener("keydown", v);
    }
    const S = w(
      () => t.options.filter((W) => typeof W == "object" && W !== null ? t.filteringKeys.some(
        (X) => `${W[X]}`.toLowerCase().includes(M.value.toLowerCase())
      ) : `${W}`.toLowerCase().includes(M.value.toLowerCase()))
    ), j = w(() => t.modelValue.length < S.value.length ? !1 : S.value.every((W) => {
      const X = n(W, t.idKey);
      return t.modelValue.includes(X);
    })), $ = () => {
      const W = new Set(o.value || []);
      j.value ? S.value.forEach((X) => {
        const le = n(X, t.idKey);
        W.delete(le);
      }) : S.value.forEach((X) => {
        const le = n(X, t.idKey);
        W.add(le);
      }), o.value = Array.from(W);
    }, A = (W) => {
      const [X] = x();
      X && (W.preventDefault(), X.focus());
    }, U = (W) => {
      W.preventDefault();
      const X = x(), le = document.activeElement, me = Array.from(X).indexOf(le);
      if (me !== -1) {
        const ve = (me + 1) % X.length;
        X[ve].focus();
      }
    }, Y = (W) => {
      W.preventDefault();
      const X = x(), le = document.activeElement, me = Array.from(X).indexOf(le);
      if (me !== -1) {
        const ve = (me - 1 + X.length) % X.length;
        X[ve].focus();
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
      y();
    });
    const De = w(() => {
      var W;
      const X = ((W = o.value) == null ? void 0 : W.length) ?? 0, le = X === 0, me = X > 1;
      return le ? "Sélectionner une option" : `${X} option${me ? "s" : ""} sélectionnée${me ? "s" : ""}`;
    }), Ce = w(() => [
      "fr-label",
      { invisible: !t.labelVisible },
      t.labelClass
    ]);
    return (W, X) => {
      var le, me;
      return i(), f("div", {
        class: O(["fr-select-group", { [`fr-select-group--${p.value}`]: d.value }])
      }, [
        c("label", {
          class: O(Ce.value),
          for: W.id
        }, [
          B(W.$slots, "label", {}, () => [
            V(g(W.label) + " ", 1),
            B(W.$slots, "required-tip", {}, () => [
              "required" in W.$attrs && W.$attrs.required !== !1 ? (i(), f("span", vd)) : b("", !0)
            ], !0)
          ], !0),
          t.hint || (me = (le = W.$slots).hint) != null && me.call(le) ? (i(), f("span", gd, [
            B(W.$slots, "hint", {}, () => [
              V(g(t.hint), 1)
            ], !0)
          ])) : b("", !0)
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
          default: Z(() => [
            B(W.$slots, "button-label", {}, () => [
              V(g(t.buttonLabel || De.value), 1)
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
          class: O(["fr-multiselect__collapse fr-collapse", { "fr-collapse--expanded": q(_), "fr-collapsing": q(C) }]),
          onTransitionend: X[2] || (X[2] = (ve) => q(k)(s.value))
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
                disabled: S.value.length === 0,
                onClick: $,
                onKeydown: ae(te(ne, ["shift"]), ["tab"])
              }, {
                default: Z(() => [
                  c("span", {
                    class: O([
                      "fr-multiselect__search__icon",
                      j.value ? "fr-icon-close-circle-line" : "fr-icon-check-line"
                    ])
                  }, null, 2),
                  V(" " + g(t.selectAllLabel[j.value ? 1 : 0]), 1)
                ]),
                _: 1
              }, 8, ["disabled", "onKeydown"])
            ])
          ])) : b("", !0),
          t.search ? (i(), f("div", wd, [
            c("div", _d, [
              ee(Ct, {
                modelValue: M.value,
                "onUpdate:modelValue": X[0] || (X[0] = (ve) => M.value = ve),
                "aria-describedby": `${t.id}-text-hint`,
                "aria-controls": `${t.id}-checkboxes`,
                "aria-live": "polite",
                placeholder: "Rechercher",
                type: "text",
                onKeydown: [
                  ae(A, ["down"]),
                  ae(A, ["right"]),
                  ae(ne, ["tab"])
                ]
              }, null, 8, ["modelValue", "aria-describedby", "aria-controls"])
            ]),
            X[3] || (X[3] = c("div", {
              class: "fr-messages-group",
              "aria-live": "assertive"
            }, null, -1))
          ])) : b("", !0),
          ee(cn, {
            id: `${t.id}-checkboxes`,
            class: "fr-multiselect__collapse__fieldset",
            "aria-live": "polite",
            style: Te({ "--maxOverflowHeight": `${t.maxOverflowHeight}` }),
            legend: t.legend,
            "legend-id": `${t.id}-checkboxes-legend`
          }, {
            default: Z(() => [
              B(W.$slots, "legend", {}, void 0, !0),
              (i(!0), f(z, null, J(S.value, (ve) => (i(), f("div", {
                key: `${r(ve, W.id, t.idKey)}-checkbox`,
                class: "fr-fieldset__element"
              }, [
                c("div", xd, [
                  ee(It, {
                    id: `${r(ve, W.id, t.idKey)}-checkbox`,
                    modelValue: o.value,
                    "onUpdate:modelValue": X[1] || (X[1] = (ar) => o.value = ar),
                    value: n(ve, t.idKey),
                    name: `${r(ve, W.id, t.idKey)}-checkbox`,
                    small: "",
                    onKeydown: [
                      ae(U, ["down"]),
                      ae(U, ["right"]),
                      ae(Y, ["up"]),
                      ae(Y, ["left"]),
                      ae(re, ["tab"])
                    ]
                  }, {
                    label: Z(() => [
                      B(W.$slots, "checkbox-label", {
                        option: ve
                      }, () => [
                        V(g(n(ve, t.labelKey)), 1)
                      ], !0)
                    ]),
                    _: 2
                  }, 1032, ["id", "modelValue", "value", "name"])
                ])
              ]))), 128))
            ]),
            _: 3
          }, 8, ["id", "style", "legend", "legend-id"]),
          S.value.length === 0 ? (i(), f("div", Dd, [
            B(W.$slots, "no-results", {}, () => [
              X[4] || (X[4] = V(" Pas de résultat "))
            ], !0)
          ])) : b("", !0)
        ], 46, bd)) : b("", !0),
        d.value ? (i(), f("p", {
          key: 1,
          id: `select-${p.value}-desc-${p.value}`,
          class: O(`fr-${p.value}-text`)
        }, g(d.value), 11, Td)) : b("", !0)
      ], 2);
    };
  }
}), Cd = /* @__PURE__ */ we(Id, [["__scopeId", "data-v-829d79d0"]]), Ed = ["id", "aria-current"], Pd = /* @__PURE__ */ R({
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
      B(t.$slots, "default", {}, void 0, !0)
    ], 8, Ed));
  }
}), Dn = /* @__PURE__ */ we(Pd, [["__scopeId", "data-v-aa4076c4"]]), Ld = ["href"], Ra = 2, Et = /* @__PURE__ */ R({
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
    const t = a, e = w(() => typeof t.to == "string" && t.to.startsWith("http")), n = w(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), r = w(
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
      }, g(o.text), 9, Ld)) : (i(), H(d, {
        key: 1,
        class: O(["fr-nav__link", {
          [String(o.icon)]: n.value
        }]),
        "data-testid": "nav-router-link",
        to: o.to,
        onClick: u[1] || (u[1] = (p) => {
          var h;
          q(s)(), o.$emit("toggleId", o.id), (h = o.onClick) == null || h.call(o, p);
        })
      }, {
        default: Z(() => [
          o.icon && r.value ? (i(), H(be, Ie(Q({ key: 0 }, r.value)), null, 16)) : b("", !0),
          V(" " + g(o.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), Md = { class: "fr-col-12 fr-col-lg-3" }, Bd = { class: "fr-mega-menu__category" }, Sd = { class: "fr-mega-menu__list" }, Tn = /* @__PURE__ */ R({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", Md, [
      c("h5", Bd, [
        c("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: e[0] || (e[0] = te(() => {
          }, ["prevent"]))
        }, g(t.title), 1)
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
}), $d = ["aria-expanded", "aria-current", "aria-controls"], Ad = ["id"], Od = { class: "fr-container fr-container--fluid fr-container-lg" }, Rd = { class: "fr-grid-row fr-grid-row-lg--gutters" }, Fd = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, Vd = { class: "fr-mega-menu__leader" }, Nd = { class: "fr-h4 fr-mb-2v" }, qd = { class: "fr-hidden fr-displayed-lg" }, jd = /* @__PURE__ */ R({
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
    } = Se(), o = w(() => t.id === t.expandedId);
    return de(o, (u, d) => {
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
          onClick: d[0] || (d[0] = (h) => u.$emit("toggleId", u.id))
        }, g(u.title), 9, $d),
        c("div", {
          id: u.id,
          ref_key: "collapse",
          ref: e,
          "data-testid": "mega-menu-wrapper",
          class: O(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": q(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": q(n)
          }]),
          tabindex: "-1",
          onTransitionend: d[2] || (d[2] = (h) => q(s)(o.value))
        }, [
          c("div", Od, [
            c("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: d[1] || (d[1] = (h) => u.$emit("toggleId", u.id))
            }, " Fermer "),
            c("div", Rd, [
              c("div", Fd, [
                c("div", Vd, [
                  c("h4", Nd, g(u.title), 1),
                  c("p", qd, [
                    V(g(u.description) + " ", 1),
                    B(u.$slots, "description", {}, void 0, !0)
                  ]),
                  ee(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: u.link.to
                  }, {
                    default: Z(() => [
                      V(g(u.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              B(u.$slots, "default", {}, void 0, !0),
              (i(!0), f(z, null, J(u.menus, (h, m) => (i(), H(Tn, Q({
                key: m,
                ref_for: !0
              }, h), null, 16))), 128))
            ])
          ])
        ], 42, Ad)
      ], 64);
    };
  }
}), In = /* @__PURE__ */ we(jd, [["__scopeId", "data-v-1e103394"]]), Hd = ["id", "aria-current"], Cn = /* @__PURE__ */ R({
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
      B(t.$slots, "default")
    ], 8, Hd));
  }
}), Wd = ["aria-expanded", "aria-current", "aria-controls"], Kd = ["id"], Qd = { class: "fr-menu__list" }, En = /* @__PURE__ */ R({
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
    } = Se(), o = w(() => t.id === t.expandedId);
    return de(o, (u, d) => {
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
        c("span", null, g(u.title), 1)
      ], 8, Wd),
      c("div", {
        id: u.id,
        ref_key: "collapse",
        ref: e,
        class: O(["fr-collapse fr-menu", { "fr-collapse--expanded": q(r), "fr-collapsing": q(n) }]),
        "data-testid": "navigation-menu",
        onTransitionend: d[2] || (d[2] = (p) => q(s)(o.value))
      }, [
        c("ul", Qd, [
          B(u.$slots, "default"),
          (i(!0), f(z, null, J(u.links, (p, h) => (i(), H(Cn, { key: h }, {
            default: Z(() => [
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
}), Yd = ["id", "aria-label"], zd = { class: "fr-nav__list" }, Gd = /* @__PURE__ */ R({
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
        B(o.$slots, "default"),
        (i(!0), f(z, null, J(o.navItems, (d, p) => (i(), H(Dn, {
          id: d.id,
          key: p
        }, {
          default: Z(() => [
            d.to && d.text ? (i(), H(Et, Q({
              key: 0,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[0] || (u[0] = (h) => n(h))
            }), null, 16, ["expanded-id"])) : d.title && d.links ? (i(), H(En, Q({
              key: 1,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[1] || (u[1] = (h) => n(h))
            }), null, 16, ["expanded-id"])) : d.title && d.menus ? (i(), H(In, Q({
              key: 2,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[2] || (u[2] = (h) => n(h))
            }), null, 16, ["expanded-id"])) : b("", !0)
          ]),
          _: 2
        }, 1032, ["id"]))), 128))
      ])
    ], 8, Yd));
  }
}), Xd = { class: "fr-container" }, Ud = { class: "fr-notice__body" }, Zd = { class: "fr-notice__title" }, Jd = { class: "fr-notice__desc" }, ec = /* @__PURE__ */ R({
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
      class: O(["fr-notice", `fr-notice--${t.type}`])
    }, [
      c("div", Xd, [
        c("div", Ud, [
          c("p", null, [
            c("span", Zd, [
              B(t.$slots, "default", {}, () => [
                V(g(t.title), 1)
              ])
            ]),
            c("span", Jd, [
              B(t.$slots, "desc", {}, () => [
                V(g(t.desc), 1)
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
}), tc = ["aria-label"], ac = { class: "fr-content-media__img" }, nc = ["src", "alt", "title", "ratio"], rc = { class: "fr-content-media__caption" }, lc = /* @__PURE__ */ R({
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
      class: O(["fr-content-media", {
        "fr-content-media--sm": t.size === "small",
        "fr-content-media--lg": t.size === "large"
      }]),
      role: "group",
      "aria-label": t.legend
    }, [
      c("div", ac, [
        B(t.$slots, "default", {}, () => [
          t.src ? (i(), f("img", {
            key: 0,
            src: t.src,
            class: O(["fr-responsive-img", `fr-ratio-${t.ratio}`]),
            alt: t.alt,
            title: t.title,
            ratio: t.ratio
          }, null, 10, nc)) : b("", !0)
        ])
      ]),
      c("figcaption", rc, g(t.legend), 1)
    ], 10, tc));
  }
}), sc = { class: "fr-quote fr-quote--column" }, oc = ["cite"], ic = { class: "fr-quote__author" }, uc = { class: "fr-quote__source" }, dc = ["href"], cc = {
  key: 0,
  class: "fr-quote__image"
}, fc = ["src"], pc = /* @__PURE__ */ R({
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
        c("p", null, "« " + g(t.quote) + " »", 1)
      ], 8, oc)) : b("", !0),
      c("figcaption", null, [
        c("p", ic, g(t.author), 1),
        c("ul", uc, [
          c("li", null, [
            c("cite", null, g(t.source), 1)
          ]),
          (i(!0), f(z, null, J(t.details, (n, r) => (i(), f("li", { key: r }, [
            typeof n == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.url
            }, g(n.label), 9, dc)) : (i(), f(z, { key: 1 }, [
              V(g(n), 1)
            ], 64))
          ]))), 128))
        ]),
        t.quoteImage ? (i(), f("div", cc, [
          c("img", {
            src: t.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, fc)
        ])) : b("", !0)
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
}, yc = ["src", "title"], kc = { key: 0 }, wc = ["href"], _c = ["href"], xc = ["href"], Pn = /* @__PURE__ */ R({
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
    const t = a, e = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = w(() => !!t.img || !!t.svgPath);
    return (r, l) => (i(), f("div", {
      class: O(["fr-fieldset__element", { "fr-fieldset__element--inline": r.inline }])
    }, [
      c("div", {
        class: O(["fr-radio-group", {
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
          B(r.$slots, "label", {}, () => [
            V(g(r.label) + " ", 1),
            B(r.$slots, "required-tip", {}, () => [
              r.$attrs.required ? (i(), f("span", vc, " *")) : b("", !0)
            ])
          ]),
          r.hint ? (i(), f("span", gc, g(r.hint), 1)) : b("", !0)
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
            r.imgTitle ? (i(), f("title", kc, g(r.imgTitle), 1)) : b("", !0),
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
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), Dc = { class: "fr-form-group" }, Tc = ["disabled", "aria-labelledby", "aria-invalid", "role"], Ic = ["id"], Cc = {
  key: 0,
  class: "fr-hint-text"
}, Ec = {
  key: 0,
  class: "required"
}, Pc = ["id"], Lc = /* @__PURE__ */ R({
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
    const e = a, n = t, r = w(() => e.errorMessage || e.validMessage), l = w(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), s = (u) => {
      u !== e.modelValue && n("update:modelValue", u);
    }, o = w(() => r.value ? `${e.titleId} messages-${e.titleId}` : e.titleId);
    return (u, d) => (i(), f("div", Dc, [
      c("fieldset", {
        class: O(["fr-fieldset", {
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
            V(g(u.legend) + " ", 1),
            u.hint || u.$slots.hint ? (i(), f("span", Cc, [
              B(u.$slots, "hint", {}, () => [
                V(g(u.hint), 1)
              ])
            ])) : b("", !0),
            B(u.$slots, "required-tip", {}, () => [
              u.required ? (i(), f("span", Ec, " *")) : b("", !0)
            ])
          ])
        ], 8, Ic)) : b("", !0),
        B(u.$slots, "default", {}, () => [
          (i(!0), f(z, null, J(u.options, (p, h) => (i(), H(Pn, Q({
            key: typeof p.value == "boolean" ? h : p.value || h,
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
            class: O(["fr-message fr-message--info flex items-center", l.value])
          }, g(r.value), 3)
        ], 8, Pc)) : b("", !0)
      ], 10, Tc)
    ]));
  }
}), Mc = ["id"], Bc = ["id"], Sc = { class: "fr-hint-text" }, $c = ["data-fr-prefix", "data-fr-suffix"], Ac = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Oc = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Rc = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Fc = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Vc = ["id"], Nc = ["id"], qc = /* @__PURE__ */ R({
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
    const e = a, n = t, r = K(), l = K(), s = K(), o = w(() => e.lowerValue !== void 0), u = w(() => e.step !== void 0), d = w(() => {
      if (e.lowerValue === void 0) {
        const m = (e.modelValue - e.min) / (e.max - e.min) * s.value;
        return `transform: translateX(${m}px) translateX(-${m / s.value * 100}%);`;
      }
      return `transform: translateX(${(e.modelValue + e.lowerValue - e.min) / 2 / (e.max - e.min) * s.value}px) translateX(-${e.lowerValue + (e.modelValue - e.lowerValue) / 2}%);`;
    }), p = w(() => {
      const m = e.max - e.min, C = (e.modelValue - e.min) / m, _ = ((e.lowerValue ?? 0) - e.min) / m, L = e.small ? 12 : 24, k = (s.value - L) / (m / (e.step ?? 2)), x = o.value ? 32 * (1 - C) : 0;
      return {
        "--progress-right": `${(C * s.value + x).toFixed(2)}px`,
        ...o.value ? { "--progress-left": `${(_ * s.value).toFixed(2)}px` } : {},
        ...u.value ? { "--step-width": `${Math.floor(k)}px` } : {}
      };
    });
    de([() => e.modelValue, () => e.lowerValue], ([m, C]) => {
      C !== void 0 && (o.value && m < C && n("update:lowerValue", m), o.value && C > m && n("update:modelValue", C));
    });
    const h = w(() => (e.prefix ?? "").concat(o.value ? `${e.lowerValue} - ` : "").concat(`${e.modelValue}`).concat(e.suffix ?? ""));
    return ye(() => {
      var m;
      s.value = (m = r.value) == null ? void 0 : m.offsetWidth;
    }), (m, C) => (i(), f("div", {
      id: `${m.id}-group`,
      class: O(["fr-range-group", { "fr-range-group--error": m.message }])
    }, [
      c("label", {
        id: `${m.id}-label`,
        class: "fr-label"
      }, [
        B(m.$slots, "label", {}, () => [
          V(g(m.label), 1)
        ]),
        c("span", Sc, [
          B(m.$slots, "hint", {}, () => [
            V(g(m.hint), 1)
          ])
        ])
      ], 8, Bc),
      c("div", {
        class: O(["fr-range", {
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
        }, g(h.value), 5),
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
          onInput: C[0] || (C[0] = (_) => {
            var L;
            return n("update:lowerValue", +((L = _.target) == null ? void 0 : L.value));
          })
        }, null, 40, Ac)) : b("", !0),
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
          onInput: C[1] || (C[1] = (_) => {
            var L;
            return n("update:modelValue", +((L = _.target) == null ? void 0 : L.value));
          })
        }, null, 40, Oc),
        m.hideIndicators ? b("", !0) : (i(), f("span", Rc, g(m.min), 1)),
        m.hideIndicators ? b("", !0) : (i(), f("span", Fc, g(m.max), 1))
      ], 14, $c),
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
          }, g(m.message), 9, Nc)) : b("", !0)
        ])
      ], 8, Vc)) : b("", !0)
    ], 10, Mc));
  }
}), jc = { class: "fr-segmented__element" }, Hc = ["id", "name", "value", "checked", "disabled", "aria-disabled"], Wc = ["for"], Kc = { key: 1 }, Ln = /* @__PURE__ */ R({
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
    const t = a, e = w(() => typeof t.icon == "string" ? { name: t.icon } : t.icon), n = w(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : "");
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
        class: O(["fr-label", { [n.value]: n.value }])
      }, [
        r.icon && !n.value ? (i(), H(be, Ie(Q({ key: 0 }, e.value)), null, 16)) : b("", !0),
        r.icon ? (i(), f("span", Kc, " ")) : b("", !0),
        V(" " + g(r.label), 1)
      ], 10, Wc)
    ]));
  }
}), Qc = { class: "fr-form-group" }, Yc = ["disabled"], zc = ["id"], Gc = {
  key: 0,
  class: "fr-hint-text"
}, Xc = { class: "fr-segmented__elements" }, Uc = /* @__PURE__ */ R({
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
          B(l.$slots, "legend", {}, () => [
            V(g(l.legend), 1)
          ]),
          l.hint ? (i(), f("span", Gc, g(l.hint), 1)) : b("", !0)
        ], 10, zc)) : b("", !0),
        c("div", Xc, [
          B(l.$slots, "default", {}, () => [
            (i(!0), f(z, null, J(l.options, (o, u) => (i(), H(Ln, Q({
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
}, tf = ["id", "name", "disabled", "aria-disabled", "required"], af = ["selected"], nf = ["selected", "value", "disabled", "aria-disabled"], rf = ["id"], lf = /* @__PURE__ */ R({
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
    const e = w(() => t.errorMessage || t.successMessage), n = w(() => t.errorMessage ? "error" : "valid");
    return (r, l) => (i(), f("div", {
      class: O(["fr-select-group", { [`fr-select-group--${n.value}`]: e.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: r.selectId
      }, [
        B(r.$slots, "label", {}, () => [
          V(g(r.label) + " ", 1),
          B(r.$slots, "required-tip", {}, () => [
            r.required ? (i(), f("span", Jc, " *")) : b("", !0)
          ])
        ]),
        r.hint ?? r.description ? (i(), f("span", ef, g(r.hint ?? r.description), 1)) : b("", !0)
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
        }, g(r.defaultUnselectedText), 9, af),
        (i(!0), f(z, null, J(r.options, (s, o) => (i(), f("option", {
          key: o,
          selected: r.modelValue === s || typeof s == "object" && s.value === r.modelValue,
          value: typeof s == "object" ? s.value : s,
          disabled: !!(typeof s == "object" && s.disabled),
          "aria-disabled": !!(typeof s == "object" && s.disabled)
        }, g(typeof s == "object" ? s.text : s), 9, nf))), 128))
      ], 16, tf),
      e.value ? (i(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: O(`fr-${n.value}-text`)
      }, g(e.value), 11, rf)) : b("", !0)
    ], 2));
  }
}), sf = { class: "fr-share" }, of = { class: "fr-share__title" }, uf = { class: "fr-btns-group" }, df = ["title", "href", "onClick"], cf = { key: 0 }, ff = ["href", "title"], pf = ["title"], mf = /* @__PURE__ */ R({
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
        c("p", of, g(n.title), 1),
        c("ul", uf, [
          (i(!0), f(z, null, J(n.networks, (s, o) => (i(), f("li", { key: o }, [
            c("a", {
              class: O(`fr-btn fr-btn--${s.name}`),
              title: `${s.label} - nouvelle fenêtre`,
              href: s.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: te((u) => e(s), ["prevent"])
            }, g(s.label), 11, df)
          ]))), 128)),
          (l = n.mail) != null && l.to ? (i(), f("li", cf, [
            c("a", {
              class: "fr-btn fr-btn--mail",
              href: n.mail.to,
              title: n.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, g(n.mail.label), 9, ff)
          ])) : b("", !0),
          c("li", null, [
            c("button", {
              class: "fr-btn fr-btn--copy",
              title: n.copyLabel,
              onClick: r[0] || (r[0] = (s) => t())
            }, g(n.copyLabel), 9, pf)
          ])
        ])
      ]);
    };
  }
}), hf = ["aria-current", "aria-expanded", "aria-controls"], Mn = /* @__PURE__ */ R({
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
    ], 8, hf));
  }
}), Bn = /* @__PURE__ */ R({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      class: O(["fr-sidemenu__item", { "fr-sidemenu__item--active": t.active }])
    }, [
      B(t.$slots, "default")
    ], 2));
  }
}), vf = ["id"], gf = { class: "fr-sidemenu__list" }, Sn = /* @__PURE__ */ R({
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
    de(() => t.expanded, (p, h) => {
      p !== h && l(p);
    }), ye(() => {
      t.expanded && l(!0);
    });
    const o = (p) => typeof p == "string" && p.startsWith("http"), u = (p) => o(p) ? "a" : "RouterLink", d = (p) => ({ [o(p) ? "href" : "to"]: p });
    return (p, h) => {
      const m = xe("DsfrSideMenuList", !0);
      return i(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: e,
        class: O({
          "fr-collapse": p.collapsable,
          "fr-collapsing": q(n),
          "fr-collapse--expanded": q(r)
        }),
        onTransitionend: h[2] || (h[2] = (C) => q(s)(!!p.expanded, p.focusOnExpanding))
      }, [
        c("ul", gf, [
          B(p.$slots, "default"),
          (i(!0), f(z, null, J(p.menuItems, (C, _) => (i(), H(Bn, {
            key: _,
            active: C.active
          }, {
            default: Z(() => [
              C.menuItems ? b("", !0) : (i(), H(ge(u(C.to)), Q({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": C.active ? "page" : void 0,
                ref_for: !0
              }, d(C.to)), {
                default: Z(() => [
                  V(g(C.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              C.menuItems ? (i(), f(z, { key: 1 }, [
                ee(Mn, {
                  active: !!C.active,
                  expanded: !!C.expanded,
                  "control-id": C.id,
                  onToggleExpand: h[0] || (h[0] = (L) => p.$emit("toggleExpand", L))
                }, {
                  default: Z(() => [
                    V(g(C.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                C.menuItems ? (i(), H(m, {
                  key: 0,
                  id: C.id,
                  collapsable: "",
                  expanded: C.expanded,
                  "menu-items": C.menuItems,
                  onToggleExpand: h[1] || (h[1] = (L) => p.$emit("toggleExpand", L))
                }, null, 8, ["id", "expanded", "menu-items"])) : b("", !0)
              ], 64)) : b("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, vf);
    };
  }
}), bf = ["aria-labelledby"], yf = { class: "fr-sidemenu__inner" }, kf = ["aria-controls", "aria-expanded"], wf = ["id"], _f = /* @__PURE__ */ R({
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
    return de(s, (o, u) => {
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
        }, g(o.buttonLabel), 9, kf),
        c("div", {
          id: o.id,
          ref_key: "collapse",
          ref: t,
          class: O(["fr-collapse", {
            "fr-collapse--expanded": q(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": q(e)
          }]),
          onTransitionend: u[2] || (u[2] = (d) => q(l)(s.value, o.focusOnExpanding))
        }, [
          (i(), H(ge(o.titleTag), { class: "fr-sidemenu__title" }, {
            default: Z(() => [
              V(g(o.headingTitle), 1)
            ]),
            _: 1
          })),
          B(o.$slots, "default", {}, () => [
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
}), xf = /* @__PURE__ */ R({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(a) {
    const t = a, e = w(() => typeof t.to == "string" && t.to.startsWith("http")), n = w(() => e.value ? "a" : "RouterLink"), r = w(() => ({ [e.value ? "href" : "to"]: t.to }));
    return (l, s) => (i(), H(ge(n.value), Q({
      "aria-current": l.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, r.value), {
      default: Z(() => [
        B(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), Df = { class: "fr-skiplinks" }, Tf = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, If = { class: "fr-skiplinks__list" }, Cf = ["href", "onClick"], Ef = /* @__PURE__ */ R({
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
            }, g(r.text), 9, Cf)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Pf = { class: "fr-stepper" }, Lf = { class: "fr-stepper__title" }, Mf = { class: "fr-stepper__state" }, Bf = ["data-fr-current-step", "data-fr-steps"], Sf = { class: "fr-stepper__details" }, $f = {
  key: 0,
  class: "fr-text--bold"
}, Af = /* @__PURE__ */ R({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Pf, [
      c("h2", Lf, [
        V(g(t.steps[t.currentStep - 1]) + " ", 1),
        c("span", Mf, "Étape " + g(t.currentStep) + " sur " + g(t.steps.length), 1)
      ]),
      c("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": t.currentStep,
        "data-fr-steps": t.steps.length
      }, null, 8, Bf),
      c("p", Sf, [
        t.currentStep < t.steps.length ? (i(), f("span", $f, "Étape suivante :")) : b("", !0),
        V(" " + g(t.steps[t.currentStep]), 1)
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
}, Ff = { class: "fr-summary__list" }, Vf = ["href"], Nf = /* @__PURE__ */ R({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(a) {
    return (t, e) => (i(), f("nav", Of, [
      c("h2", Rf, g(t.title), 1),
      c("ol", Ff, [
        (i(!0), f(z, null, J(t.anchors, (n, r) => (i(), f("li", { key: r }, [
          c("a", {
            class: "fr-summary__link",
            href: n.link
          }, g(n.name), 9, Vf)
        ]))), 128))
      ])
    ]));
  }
}), qf = ["id", "aria-labelledby", "tabindex"], jf = /* @__PURE__ */ R({
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
    const t = a, e = { true: "100%", false: "-100%" }, n = Qe(Dt), { isVisible: r, asc: l } = n(st(() => t.tabId)), s = w(() => e[String(l == null ? void 0 : l.value)]), o = w(() => e[String(!(l != null && l.value))]);
    return (u, d) => (i(), H(pr, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: Z(() => [
        Me(c("div", {
          id: u.panelId,
          class: O(["fr-tabs__panel", {
            "fr-tabs__panel--selected": q(r)
          }]),
          role: "tabpanel",
          "aria-labelledby": u.tabId,
          tabindex: q(r) ? 0 : -1
        }, [
          B(u.$slots, "default", {}, void 0, !0)
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
}, An = /* @__PURE__ */ R({
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
      const h = p == null ? void 0 : p.key, m = l[h];
      m && n(m);
    }
    const o = Qe(Dt), { isVisible: u } = o(st(() => e.tabId)), d = ur("button");
    return de(u, () => {
      var p;
      u.value && ((p = d.value) == null || p.focus());
    }), (p, h) => (i(), f("li", Hf, [
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
        onClick: h[0] || (h[0] = te((m) => p.$emit("click", p.tabId), ["prevent"])),
        onKeydown: h[1] || (h[1] = (m) => s(m))
      }, [
        p.icon ? (i(), f("span", Kf, [
          ee(be, { name: p.icon }, null, 8, ["name"])
        ])) : b("", !0),
        B(p.$slots, "default")
      ], 40, Wf)
    ]));
  }
}), On = /* @__PURE__ */ R({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(a) {
    const t = a, e = w(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), n = w(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("th", Q(r.headerAttrs, { scope: "col" }), [
      V(g(r.header) + " ", 1),
      r.icon && !e.value ? (i(), H(be, Ie(Q({ key: 0 }, n.value)), null, 16)) : b("", !0),
      e.value ? (i(), f("span", {
        key: 1,
        class: O({ [String(r.icon)]: e.value })
      }, null, 2)) : b("", !0)
    ], 16));
  }
}), Qf = { key: 0 }, Rn = /* @__PURE__ */ R({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(a) {
    return (t, e) => t.headers ? (i(), f("tr", Qf, [
      (i(!0), f(z, null, J(t.headers, (n, r) => (i(), H(On, {
        key: r,
        header: (typeof n == "object" ? n : {}).text || n,
        "header-attrs": n.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : b("", !0);
  }
}), Fn = /* @__PURE__ */ R({
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
    const t = a, e = w(() => typeof t.field == "object" && t.field !== null && t.field.component ? t.field.component : !1), n = w(() => ["string", "number", "boolean"].includes(typeof t.field));
    return (r, l) => (i(), f("td", Ie(kt(r.cellAttrs)), [
      e.value ? (i(), H(ge(e.value), Ie(Q({ key: 0 }, typeof r.field == "object" ? r.field : {})), {
        default: Z(() => [
          V(g(r.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f(z, { key: 1 }, [
        V(g(n.value ? r.field : r.field.text), 1)
      ], 64))
    ], 16));
  }
}), Vn = /* @__PURE__ */ R({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(a) {
    return (t, e) => (i(), f("tr", Ie(kt(t.rowAttrs)), [
      B(t.$slots, "default"),
      (i(!0), f(z, null, J(t.rowData, (n, r) => (i(), H(Fn, {
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
}, ap = { class: "self-center fr-m-0" }, np = { class: "flex ml-1" }, rp = /* @__PURE__ */ R({
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
    const e = a, n = t, r = (x) => Array.isArray(x) ? x : x.rowData, l = K(e.currentPage), s = se("resultPerPage"), o = K(e.resultsDisplayed), u = w(
      () => e.rows.length > o.value ? Math.ceil(e.rows.length / o.value) : 1
    ), d = [5, 10, 25, 50, 100], p = () => l.value * o.value - o.value, h = () => l.value * o.value, m = w(() => e.pagination ? e.rows.slice(p(), h()) : e.rows), C = () => {
      l.value = 1, n("update:currentPage");
    }, _ = () => {
      l.value > 1 && (l.value -= 1, n("update:currentPage"));
    }, L = () => {
      l.value < u.value && (l.value += 1, n("update:currentPage"));
    }, k = () => {
      l.value = u.value, n("update:currentPage");
    };
    return (x, T) => (i(), f("div", {
      class: O(["fr-table", { "fr-table--no-caption": x.noCaption }])
    }, [
      c("table", null, [
        c("caption", Yf, g(x.title), 1),
        c("thead", null, [
          B(x.$slots, "header", {}, () => [
            x.headers && x.headers.length ? (i(), H(Rn, {
              key: 0,
              headers: x.headers
            }, null, 8, ["headers"])) : b("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          B(x.$slots, "default", {}, void 0, !0),
          x.rows && x.rows.length ? (i(!0), f(z, { key: 0 }, J(m.value, (M, v) => (i(), H(Vn, {
            key: x.rowKey && r(M) ? typeof x.rowKey == "string" ? r(M)[x.headers.indexOf(x.rowKey)].toString() : x.rowKey(r(M)) : v,
            "row-data": r(M),
            "row-attrs": "rowAttrs" in M ? M.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : b("", !0),
          x.pagination ? (i(), f("tr", zf, [
            c("td", {
              colspan: x.headers.length
            }, [
              c("div", Xf, [
                c("div", Uf, [
                  c("label", { for: q(s) }, "Résultats par page : ", 8, Zf),
                  Me(c("select", {
                    id: q(s),
                    "onUpdate:modelValue": T[0] || (T[0] = (M) => o.value = M),
                    title: "Résultats par page - le nombre résultats est mis à jour dès sélection d’une valeur",
                    onChange: T[1] || (T[1] = (M) => n("update:currentPage"))
                  }, [
                    (i(), f(z, null, J(d, (M, v) => c("option", {
                      key: v,
                      value: M
                    }, g(M), 9, ep)), 64))
                  ], 40, Jf), [
                    [Xt, o.value]
                  ])
                ]),
                c("div", tp, [
                  c("p", ap, " Page " + g(l.value) + " sur " + g(u.value), 1)
                ]),
                c("div", np, [
                  c("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: T[2] || (T[2] = (M) => C())
                  }, T[6] || (T[6] = [
                    c("span", { class: "fr-sr-only" }, "Première page du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: T[3] || (T[3] = (M) => _())
                  }, T[7] || (T[7] = [
                    c("span", { class: "fr-sr-only" }, "Page précédente du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: T[4] || (T[4] = (M) => L())
                  }, T[8] || (T[8] = [
                    c("span", { class: "fr-sr-only" }, "Page suivante du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: T[5] || (T[5] = (M) => k())
                  }, T[9] || (T[9] = [
                    c("span", { class: "fr-sr-only" }, "Dernière page du tableau", -1)
                  ]))
                ])
              ])
            ], 8, Gf)
          ])) : b("", !0)
        ])
      ])
    ], 2));
  }
}), lp = /* @__PURE__ */ we(rp, [["__scopeId", "data-v-129bf2b7"]]), sp = ["aria-label"], op = /* @__PURE__ */ R({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(a, { expose: t, emit: e }) {
    const n = a, r = e, l = K(!1), s = w({
      get: () => n.modelValue,
      set(v) {
        r("update:modelValue", v);
      }
    }), o = K(/* @__PURE__ */ new Map()), u = K(0);
    Re(Dt, (v) => {
      const I = K(!0);
      if (de(s, (F, P) => {
        I.value = F > P;
      }), [...o.value.values()].includes(v.value))
        return { isVisible: w(() => o.value.get(s.value) === v.value), asc: I };
      const E = u.value++;
      o.value.set(E, v.value);
      const D = w(() => E === s.value);
      return de(v, () => {
        o.value.set(E, v.value);
      }), Ee(() => {
        o.value.delete(E);
      }), { isVisible: D };
    });
    const d = K(null), p = K(null), h = dr({}), m = (v) => {
      if (h[v])
        return h[v];
      const I = se("tab");
      return h[v] = I, I;
    }, C = async () => {
      const v = s.value === 0 ? n.tabTitles.length - 1 : s.value - 1;
      l.value = !1, s.value = v;
    }, _ = async () => {
      const v = s.value === n.tabTitles.length - 1 ? 0 : s.value + 1;
      l.value = !0, s.value = v;
    }, L = async () => {
      s.value = 0;
    }, k = async () => {
      s.value = n.tabTitles.length - 1;
    }, x = K({ "--tabs-height": "100px" }), T = () => {
      var v;
      if (s.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const I = p.value.offsetHeight, E = (v = d.value) == null ? void 0 : v.querySelectorAll(".fr-tabs__panel")[s.value];
      if (!E || !E.offsetHeight)
        return;
      const D = E.offsetHeight;
      x.value["--tabs-height"] = `${I + D}px`;
    }, M = K(null);
    return ye(() => {
      var v;
      window.ResizeObserver && (M.value = new window.ResizeObserver(() => {
        T();
      })), (v = d.value) == null || v.querySelectorAll(".fr-tabs__panel").forEach((I) => {
        var E;
        I && ((E = M.value) == null || E.observe(I));
      });
    }), Ee(() => {
      var v;
      (v = d.value) == null || v.querySelectorAll(".fr-tabs__panel").forEach((I) => {
        var E;
        I && ((E = M.value) == null || E.unobserve(I));
      });
    }), t({
      renderTabs: T,
      selectFirst: L,
      selectLast: k
    }), (v, I) => (i(), f("div", {
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
        "aria-label": v.tabListName
      }, [
        B(v.$slots, "tab-items", {}, () => [
          (i(!0), f(z, null, J(v.tabTitles, (E, D) => (i(), H(An, {
            key: D,
            icon: E.icon,
            "panel-id": E.panelId || `${m(D)}-panel`,
            "tab-id": E.tabId || m(D),
            onClick: (F) => s.value = D,
            onNext: I[0] || (I[0] = (F) => _()),
            onPrevious: I[1] || (I[1] = (F) => C()),
            onFirst: I[2] || (I[2] = (F) => L()),
            onLast: I[3] || (I[3] = (F) => k())
          }, {
            default: Z(() => [
              V(g(E.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, sp),
      (i(!0), f(z, null, J(v.tabContents, (E, D) => {
        var F, P, G, y;
        return i(), H($n, {
          key: D,
          "panel-id": ((P = (F = v.tabTitles) == null ? void 0 : F[D]) == null ? void 0 : P.panelId) || `${m(D)}-panel`,
          "tab-id": ((y = (G = v.tabTitles) == null ? void 0 : G[D]) == null ? void 0 : y.tabId) || m(D)
        }, {
          default: Z(() => [
            V(g(E), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      B(v.$slots, "default")
    ], 4));
  }
}), ip = /* @__PURE__ */ R({
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
    const t = a, e = w(() => typeof t.link == "string" && t.link.startsWith("http")), n = w(() => t.link ? e.value ? "a" : "RouterLink" : t.disabled && t.tagName === "p" || t.selectable ? "button" : t.tagName), r = w(() => ({ [e.value ? "href" : "to"]: t.link })), l = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), s = w(() => t.small ? 0.65 : 0.9), o = w(
      () => typeof t.icon == "string" ? { scale: s.value, name: t.icon } : { scale: s.value, ...t.icon }
    );
    return (u, d) => (i(), H(ge(n.value), Q({
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
      default: Z(() => [
        t.icon && !l.value ? (i(), H(be, Q({
          key: 0,
          label: u.iconOnly ? u.label : void 0,
          class: { "fr-mr-1v": !u.iconOnly }
        }, o.value), null, 16, ["label", "class"])) : b("", !0),
        u.iconOnly ? b("", !0) : (i(), f(z, { key: 1 }, [
          V(g(u.label), 1)
        ], 64)),
        B(u.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class", "aria-pressed"]));
  }
}), oa = /* @__PURE__ */ we(ip, [["__scopeId", "data-v-0cada598"]]), up = { class: "fr-tags-group" }, dp = /* @__PURE__ */ R({
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
        var h;
        return i(), f("li", { key: p }, [
          ee(oa, Q({ ref_for: !0 }, d, {
            icon: o,
            label: u,
            selectable: d.selectable,
            selected: d.selectable ? (h = l.modelValue) == null ? void 0 : h.includes(d.value) : void 0,
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
}, yp = ["src"], kp = ["href"], wp = ["href"], _p = ["href"], xp = /* @__PURE__ */ R({
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
    const t = a, e = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = w(() => typeof t.to == "string" && t.to.startsWith("http"));
    return (r, l) => {
      const s = xe("RouterLink");
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
            (i(), H(ge(r.titleTag), { class: "fr-tile__title" }, {
              default: Z(() => [
                n.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: r.download,
                  href: r.disabled ? "" : r.to
                }, g(r.title), 9, pp)) : b("", !0),
                n.value ? b("", !0) : (i(), H(s, {
                  key: 1,
                  download: r.download,
                  class: "fr-tile__link",
                  to: r.disabled ? "" : r.to
                }, {
                  default: Z(() => [
                    V(g(r.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            r.description ? (i(), f("p", mp, g(r.description), 1)) : b("", !0),
            r.details ? (i(), f("p", hp, g(r.details), 1)) : b("", !0),
            r.$slots["start-details"] ? (i(), f("div", vp, [
              B(r.$slots, "start-details", {}, void 0, !0)
            ])) : b("", !0)
          ])
        ]),
        c("div", gp, [
          B(r.$slots, "header", {}, void 0, !0),
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
          ])) : b("", !0)
        ])
      ], 2);
    };
  }
}), Nn = /* @__PURE__ */ we(xp, [["__scopeId", "data-v-f4d836a2"]]), Dp = { class: "fr-grid-row fr-grid-row--gutters" }, Tp = /* @__PURE__ */ R({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Dp, [
      (i(!0), f(z, null, J(t.tiles, (n, r) => (i(), f("div", {
        key: r,
        class: O({
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
}), Ip = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby", "name"], Cp = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], Ep = ["id"], Pp = /* @__PURE__ */ R({
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
    const t = a, e = w(() => `${t.inputId}-hint-text`);
    return (n, r) => (i(), f("div", {
      class: O(["fr-toggle", {
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
      }, g(n.label), 9, Cp),
      n.hint ? (i(), f("p", {
        key: 0,
        id: `${n.inputId}-hint-text`,
        class: "fr-hint-text"
      }, g(n.hint), 9, Ep)) : b("", !0)
    ], 2));
  }
}), Lp = ["id"], Mp = /* @__PURE__ */ R({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => se("tooltip") }
  },
  setup(a) {
    const t = a, e = K(!1), n = K(null), r = K(null), l = K("0px"), s = K("0px"), o = K("0px"), u = K(!1), d = K(0);
    async function p() {
      var T, M, v, I, E, D, F, P;
      if (typeof document > "u" || !e.value)
        return;
      await new Promise((Ce) => setTimeout(Ce, 100));
      const G = (T = n.value) == null ? void 0 : T.getBoundingClientRect().top, y = (M = n.value) == null ? void 0 : M.offsetHeight, S = (v = n.value) == null ? void 0 : v.offsetWidth, j = (I = n.value) == null ? void 0 : I.getBoundingClientRect().left, $ = (E = r.value) == null ? void 0 : E.offsetHeight, A = (D = r.value) == null ? void 0 : D.offsetWidth, U = (F = r.value) == null ? void 0 : F.offsetTop, Y = (P = r.value) == null ? void 0 : P.offsetLeft, re = !(G - $ < 0) && G + y + $ >= document.documentElement.offsetHeight;
      u.value = re;
      const ne = j + S >= document.documentElement.offsetWidth, De = j + S / 2 - A / 2 <= 0;
      s.value = re ? `${G - U - $ + 8}px` : `${G - U + y - 8}px`, d.value = 1, l.value = ne ? `${j - Y + S - A - 4}px` : De ? `${j - Y + 4}px` : `${j - Y + S / 2 - A / 2}px`, o.value = ne ? `${A / 2 - S / 2 + 4}px` : De ? `${-(A / 2) + S / 2 - 4}px` : "0px";
    }
    de(e, p, { immediate: !0 }), ye(() => {
      window.addEventListener("scroll", p);
    }), Ee(() => {
      window.removeEventListener("scroll", p);
    });
    const h = w(() => `transform: translate(${l.value}, ${s.value}); --arrow-x: ${o.value}; opacity: ${d.value};'`), m = w(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), C = (T) => {
      var M, v;
      e.value && (T.target === n.value || (M = n.value) != null && M.contains(T.target) || T.target === r.value || (v = r.value) != null && v.contains(T.target) || (e.value = !1));
    }, _ = (T) => {
      T.key === "Escape" && (e.value = !1);
    }, L = (T) => {
      var M;
      t.onHover && (T.target === n.value || (M = n.value) != null && M.contains(T.target)) && (e.value = !0, globalThis.__vueDsfr__lastTooltipShow.value = !1);
    }, k = () => {
      t.onHover && (e.value = !1);
    }, x = () => {
      t.onHover || (e.value = !0, globalThis.__vueDsfr__lastTooltipShow = e);
    };
    return ye(() => {
      document.documentElement.addEventListener("click", C), document.documentElement.addEventListener("keydown", _), document.documentElement.addEventListener("mouseover", L);
    }), Ee(() => {
      document.documentElement.removeEventListener("click", C), document.documentElement.removeEventListener("keydown", _), document.documentElement.removeEventListener("mouseover", L);
    }), (T, M) => (i(), f(z, null, [
      (i(), H(ge(T.onHover ? "a" : "button"), Q(T.$attrs, {
        id: `link-${T.id}`,
        ref_key: "source",
        ref: n,
        class: T.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip",
        "aria-describedby": T.id,
        href: T.onHover ? "#" : void 0,
        onClick: M[0] || (M[0] = (v) => x()),
        onMouseleave: M[1] || (M[1] = (v) => k()),
        onFocus: M[2] || (M[2] = (v) => L(v)),
        onBlur: M[3] || (M[3] = (v) => k())
      }), {
        default: Z(() => [
          B(T.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["id", "class", "aria-describedby", "href"])),
      c("span", {
        id: T.id,
        ref_key: "tooltip",
        ref: r,
        class: O(["fr-tooltip fr-placement", m.value]),
        style: Te(h.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, g(T.content), 15, Lp)
    ], 64));
  }
}), Bp = /* @__PURE__ */ we(Mp, [["__scopeId", "data-v-ed1e8874"]]), Sp = { class: "fr-transcription" }, $p = ["aria-expanded", "aria-controls"], Ap = ["id"], Op = ["id", "aria-labelledby"], Rp = { class: "fr-container fr-container--fluid fr-container-md" }, Fp = { class: "fr-grid-row fr-grid-row--center" }, Vp = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, Np = { class: "fr-modal__body" }, qp = { class: "fr-modal__header" }, jp = ["aria-controls"], Hp = { class: "fr-modal__content" }, Wp = ["id"], Kp = { class: "fr-transcription__footer" }, Qp = { class: "fr-transcription__actions-group" }, Yp = ["aria-controls"], qn = /* @__PURE__ */ R({
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
    } = Se(), o = K(!1), u = K(!1), d = w(() => `fr-transcription__modal-${t.id}`), p = w(() => `fr-transcription__collapse-${t.id}`);
    return de(u, (h, m) => {
      h !== m && l(h);
    }), (h, m) => (i(), f("div", Sp, [
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
        class: O(["fr-collapse", { "fr-collapse--expanded": q(r), "fr-collapsing": q(n) }]),
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
                    }, g(h.title), 9, Wp),
                    V(" " + g(h.content), 1)
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
      (i(), H(cr, { to: "body" }, [
        ee(xn, {
          title: h.title,
          opened: o.value,
          onClose: m[3] || (m[3] = (C) => o.value = !1)
        }, {
          default: Z(() => [
            B(h.$slots, "default", {}, () => [
              V(g(h.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), zp = ["src"], Gp = { class: "fr-content-media__caption" }, Xp = /* @__PURE__ */ R({
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
        c("div", Gp, g(t.legend), 1)
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
  DsfrBackToTop: Ll,
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
  DsfrRadioButtonSet: Lc,
  DsfrRange: qc,
  DsfrSearchBar: lt,
  DsfrSegmented: Ln,
  DsfrSegmentedSet: Uc,
  DsfrSelect: lf,
  DsfrShare: mf,
  DsfrSideMenu: _f,
  DsfrSideMenuButton: Mn,
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
function he(a, t) {
  return ke(t || a, a);
}
function Hn(a, t, e) {
  const n = he(a, e == null ? void 0 : e.in);
  return isNaN(t) ? ke((e == null ? void 0 : e.in) || a, NaN) : (t && n.setDate(n.getDate() + t), n);
}
let nm = {};
function ze() {
  return nm;
}
function Fe(a, t) {
  var o, u, d, p;
  const e = ze(), n = (t == null ? void 0 : t.weekStartsOn) ?? ((u = (o = t == null ? void 0 : t.locale) == null ? void 0 : o.options) == null ? void 0 : u.weekStartsOn) ?? e.weekStartsOn ?? ((p = (d = e.locale) == null ? void 0 : d.options) == null ? void 0 : p.weekStartsOn) ?? 0, r = he(a, t == null ? void 0 : t.in), l = r.getDay(), s = (l < n ? 7 : 0) + l - n;
  return r.setDate(r.getDate() - s), r.setHours(0, 0, 0, 0), r;
}
function Ye(a, t) {
  return Fe(a, { ...t, weekStartsOn: 1 });
}
function Wn(a, t) {
  const e = he(a, t == null ? void 0 : t.in), n = e.getFullYear(), r = ke(e, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const l = Ye(r), s = ke(e, 0);
  s.setFullYear(n, 0, 4), s.setHours(0, 0, 0, 0);
  const o = Ye(s);
  return e.getTime() >= l.getTime() ? n + 1 : e.getTime() >= o.getTime() ? n : n - 1;
}
function gt(a) {
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
function rm(a, ...t) {
  const e = ke.bind(
    null,
    t.find((n) => typeof n == "object")
  );
  return t.map(e);
}
function Va(a, t) {
  const e = he(a, t == null ? void 0 : t.in);
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
  return !(!om(a) && typeof a != "number" || isNaN(+he(a)));
}
function um(a, t) {
  const e = he(a, t == null ? void 0 : t.in);
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
    const s = l[0], o = n && a.parsePatterns[n] || a.parsePatterns[a.defaultParseWidth], u = Array.isArray(o) ? Cm(o, (h) => h.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      Im(o, (h) => h.test(s))
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
const Pm = /^(\d+)(th|st|nd|rd)?/i, Lm = /\d+/i, Mm = {
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
    parsePattern: Lm,
    valueCallback: (a) => parseInt(a, 10)
  }),
  era: Je({
    matchPatterns: Mm,
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
  const e = he(a, t == null ? void 0 : t.in);
  return lm(e, um(e)) + 1;
}
function Qn(a, t) {
  const e = he(a, t == null ? void 0 : t.in), n = +Ye(e) - +sm(e);
  return Math.round(n / jn) + 1;
}
function ia(a, t) {
  var p, h, m, C;
  const e = he(a, t == null ? void 0 : t.in), n = e.getFullYear(), r = ze(), l = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((h = (p = t == null ? void 0 : t.locale) == null ? void 0 : p.options) == null ? void 0 : h.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((C = (m = r.locale) == null ? void 0 : m.options) == null ? void 0 : C.firstWeekContainsDate) ?? 1, s = ke((t == null ? void 0 : t.in) || a, 0);
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
  const e = he(a, t == null ? void 0 : t.in), n = +Fe(e, t) - +Hm(e, t);
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
  var p, h, m, C;
  const n = ze(), r = n.locale ?? Kn, l = n.firstWeekContainsDate ?? ((h = (p = n.locale) == null ? void 0 : p.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, s = n.weekStartsOn ?? ((C = (m = n.locale) == null ? void 0 : m.options) == null ? void 0 : C.weekStartsOn) ?? 0, o = he(a, e == null ? void 0 : e.in);
  if (!im(o))
    throw new RangeError("Invalid time value");
  let u = t.match(Xm).map((_) => {
    const L = _[0];
    if (L === "p" || L === "P") {
      const k = Wt[L];
      return k(_, r.formatLong);
    }
    return _;
  }).join("").match(Gm).map((_) => {
    if (_ === "''")
      return { isToken: !1, value: "'" };
    const L = _[0];
    if (L === "'")
      return { isToken: !1, value: eh(_) };
    if (Na[L])
      return { isToken: !0, value: _ };
    if (L.match(Jm))
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
    (Xn(L) || Gn(L)) && Kt(L, t, String(a));
    const k = Na[L[0]];
    return k(o, L, r.localize, d);
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
  const e = he(a, t == null ? void 0 : t.in).getDay();
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
    value: n * (r * tm + l * em + s * am),
    rest: t.slice(e[0].length)
  };
}
function Zn(a) {
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
function bt(a, t) {
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
function gh(a, t, e) {
  const n = he(a, e == null ? void 0 : e.in), r = Yn(n, e) - t;
  return n.setDate(n.getDate() - r * 7), he(n, e == null ? void 0 : e.in);
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
    return Fe(gh(e, r, l), l);
  }
}
function yh(a, t, e) {
  const n = he(a, e == null ? void 0 : e.in), r = Qn(n, e) - t;
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
        return ue(fe.date, e);
      case "do":
        return r.ordinalNumber(e, { unit: "date" });
      default:
        return ce(n.length, e);
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
        return ue(fe.dayOfYear, e);
      case "Do":
        return r.ordinalNumber(e, { unit: "date" });
      default:
        return ce(n.length, e);
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
  var h, m, C, _;
  const n = ze(), r = (e == null ? void 0 : e.weekStartsOn) ?? ((m = (h = e == null ? void 0 : e.locale) == null ? void 0 : h.options) == null ? void 0 : m.weekStartsOn) ?? n.weekStartsOn ?? ((_ = (C = n.locale) == null ? void 0 : C.options) == null ? void 0 : _.weekStartsOn) ?? 0, l = he(a, e == null ? void 0 : e.in), s = l.getDay(), u = (t % 7 + 7) % 7, d = 7 - r, p = t < 0 || t > 6 ? t - (s + d) % 7 : (u + d) % 7 - (s + d) % 7;
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
function Eh(a, t, e) {
  const n = he(a, e == null ? void 0 : e.in), r = ah(n, e), l = t - r;
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
    return e = Eh(e, r), e.setHours(0, 0, 0, 0), e;
  }
}
class Lh extends oe {
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
class Mh extends oe {
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
class $h extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 70);
    N(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
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
class Ah extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 70);
    N(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
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
class Oh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 70);
    N(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
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
class Rh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 60);
    N(this, "incompatibleTokens", ["t", "T"]);
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
class Fh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 50);
    N(this, "incompatibleTokens", ["t", "T"]);
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
class Vh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 30);
    N(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, n) {
    const r = (l) => Math.trunc(l * Math.pow(10, -n.length + 3));
    return pe(ce(n.length, e), r);
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
  a: new Lh(),
  b: new Mh(),
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
  var k, x, T, M;
  const r = () => ke(e, NaN), l = th(), s = l.locale ?? Kn, o = l.firstWeekContainsDate ?? ((x = (k = l.locale) == null ? void 0 : k.options) == null ? void 0 : x.firstWeekContainsDate) ?? 1, u = l.weekStartsOn ?? ((M = (T = l.locale) == null ? void 0 : T.options) == null ? void 0 : M.weekStartsOn) ?? 0;
  if (!t)
    return a ? r() : he(e, n == null ? void 0 : n.in);
  const d = {
    firstWeekContainsDate: o,
    weekStartsOn: u,
    locale: s
  }, p = [new oh(n == null ? void 0 : n.in, e)], h = t.match(Qh).map((v) => {
    const I = v[0];
    if (I in Wt) {
      const E = Wt[I];
      return E(v, s.formatLong);
    }
    return v;
  }).join("").match(Kh), m = [];
  for (let v of h) {
    Xn(v) && Kt(v, t, a), Gn(v) && Kt(v, t, a);
    const I = v[0], E = Wh[I];
    if (E) {
      const { incompatibleTokens: D } = E;
      if (Array.isArray(D)) {
        const P = m.find(
          (G) => D.includes(G.token) || G.token === I
        );
        if (P)
          throw new RangeError(
            `The format string mustn't contain \`${P.fullToken}\` and \`${v}\` at the same time`
          );
      } else if (E.incompatibleTokens === "*" && m.length > 0)
        throw new RangeError(
          `The format string mustn't contain \`${v}\` and any other token at the same time`
        );
      m.push({ token: I, fullToken: v });
      const F = E.run(
        a,
        v,
        s.match,
        d
      );
      if (!F)
        return r();
      p.push(F.setter), a = F.rest;
    } else {
      if (I.match(Xh))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + I + "`"
        );
      if (v === "''" ? v = "'" : I === "'" && (v = Uh(v)), a.indexOf(v) === 0)
        a = a.slice(v.length);
      else
        return r();
    }
  }
  if (a.length > 0 && Gh.test(a))
    return r();
  const C = p.map((v) => v.priority).sort((v, I) => I - v).filter((v, I, E) => E.indexOf(v) === I).map(
    (v) => p.filter((I) => I.priority === v).sort((I, E) => E.subPriority - I.subPriority)
  ).map((v) => v[0]);
  let _ = he(e, n == null ? void 0 : n.in);
  if (isNaN(+_)) return r();
  const L = {};
  for (const v of C) {
    if (!v.validate(_, d))
      return r();
    const I = v.set(_, L, d);
    Array.isArray(I) ? (_ = I[0], Object.assign(L, I[1])) : _ = I;
  }
  return _;
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
      e.title ? e.active = e.links.some((n) => n.setActive === !0 || window.location.pathname.startsWith(n.to)) : e.active = e.setActive === !0;
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
      B(n.$slots, "default")
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
}, rv = { class: "fr-mb-1w fr-text--md" }, lv = { key: 0 }, sv = { class: "facet" }, ov = { class: "flex justify-between w-full fr-mb-0" }, iv = { class: "facet--count" }, uv = { key: 1 }, dv = { class: "flex justify-between w-full" }, cv = { class: "facet--count" }, fv = { key: 0 }, pv = { class: "facet" }, mv = { class: "flex justify-between w-full fr-mb-0" }, hv = { class: "facet--count" }, vv = { key: 1 }, gv = { class: "flex justify-between w-full" }, bv = { class: "facet--count" }, yv = { class: "fr-mb-2w" };
function kv(a, t, e, n, r, l) {
  const s = xe("DsfrTag"), o = xe("DsfrCheckbox"), u = xe("DsfrButton");
  return i(), f("div", null, [
    l.isAnyFacetValueSelected() ? (i(), f("div", nv, [
      (i(!0), f(z, null, J(e.selectedFacets, (d, p) => (i(), f(z, { key: p }, [
        l.facetMultipleByCode(p) ? b("", !0) : (i(!0), f(z, { key: 0 }, J(d, (h) => (i(), H(s, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: h.code,
          onClick: (m) => a.$emit("toogle-facet", p, h, e.contextKey)
        }, {
          default: Z(() => [
            V(g(l.facetLabelByCode(p)) + ": " + g(l.facetValueLabelByCode(p, h)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ], 64))), 128))
    ])) : b("", !0),
    (i(!0), f(z, null, J(e.facets, (d) => (i(), f("div", {
      key: d.code,
      class: "facets"
    }, [
      d.multiple || !l.isFacetSelected(d.code) ? (i(), f(z, { key: 0 }, [
        c("h6", rv, g(d.label), 1),
        c("ul", null, [
          (i(!0), f(z, null, J(l.selectedInvisibleFacets(d.code), (p) => (i(), f(z, {
            key: p.code
          }, [
            d.multiple ? (i(), f("li", lv, [
              c("div", sv, [
                ee(o, {
                  small: "",
                  modelValue: !0,
                  "onUpdate:modelValue": (h) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
                }, {
                  label: Z(() => [
                    c("p", ov, [
                      V(g(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", iv, g(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", uv, [
              ee(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (h) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
              }, {
                default: Z(() => [
                  c("span", dv, [
                    V(g(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", cv, g(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("ul", null, [
          (i(!0), f(z, null, J(l.visibleFacets(d.code, d.values), (p) => (i(), f(z, {
            key: p.code
          }, [
            d.multiple ? (i(), f("li", fv, [
              c("div", pv, [
                ee(o, {
                  small: "",
                  modelValue: l.isFacetValueSelected(d.code, p.code),
                  class: "facet",
                  "onUpdate:modelValue": (h) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
                }, {
                  label: Z(() => [
                    c("p", mv, [
                      V(g(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", hv, g(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", vv, [
              ee(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (h) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
              }, {
                default: Z(() => [
                  c("span", gv, [
                    V(g(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", bv, g(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("div", yv, [
          d.values.length > e.maxValues && !l.isFacetExpanded(d.code) ? (i(), H(u, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.expandFacet(d.code)
          }, {
            default: Z(() => [
              V(g(a.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : b("", !0),
          d.values.length > e.maxValues && l.isFacetExpanded(d.code) ? (i(), H(u, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.reduceFacet(d.code)
          }, {
            default: Z(() => [
              V(g(a.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : b("", !0)
        ])
      ], 64)) : b("", !0)
    ]))), 128))
  ]);
}
const wv = /* @__PURE__ */ Ae(av, [["render", kv], ["__scopeId", "data-v-0be4e596"]]), ca = () => {
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
}, _v = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], xv = ["id", "aria-labelledby", "onKeydown"], Dv = {
  class: "fr-menu__list",
  role: "none"
}, Tv = /* @__PURE__ */ R({
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
    let p = K(0), h = [];
    Re("menuItem", { menuItemIndex: p, addMenuItem: (D, F) => {
      p.value += 1, h.push(`${D}@${F}`);
    } }), Re("id", o.id), de(d, (D, F) => {
      D !== F && (l(D), D ? (setTimeout(() => L(), 100), document.addEventListener("click", T), document.addEventListener("touchstart", T)) : (document.removeEventListener("click", T), document.removeEventListener("touchstart", T)));
    });
    const C = (D, F) => {
      const P = F === "down" ? (D + 1) % h.length : (D - 1 + h.length) % h.length, G = document.getElementById(`${o.id}_item_${P}`);
      return G.ariaDisabled === "true" ? C(P, F) : G;
    }, _ = (D) => {
      const F = document.activeElement.id, P = F.startsWith(`${o.id}_item_`) ? Number(F.split("_")[2]) : D === "down" ? -1 : 0;
      C(P, D).focus();
    }, L = (D) => _("down"), k = (D) => _("up");
    let x = (D) => {
      let F = D.key;
      if (F.length > 1 && F.match(/\S/))
        return;
      F = F.toLowerCase();
      let P = h.filter((y) => y.toLowerCase().startsWith(F)), G = document.activeElement.id;
      for (let y of P) {
        let S = y.split("@")[1], j = document.getElementById(`${o.id}_item_${S}`);
        if (G !== j.id) {
          j.focus();
          break;
        }
      }
    }, T = (D) => {
      u.value.contains(D.target) || (d.value = !1);
    };
    function M() {
      d.value = !1;
    }
    const v = w(() => ["sm", "small"].includes(o.size)), I = w(() => ["md", "medium"].includes(o.size)), E = w(() => ["lg", "large"].includes(o.size));
    return t({ closeMenu: M }), (D, F) => (i(), f("div", {
      class: "relative-position",
      onKeydown: F[9] || (F[9] = ae(
        //@ts-ignore
        (...P) => q(T) && q(T)(...P),
        ["tab"]
      )),
      ref_key: "container",
      ref: u
    }, [
      c("button", Q({
        id: D.id,
        onClick: F[0] || (F[0] = te((P) => d.value = !d.value, ["prevent", "stop"])),
        onKeyup: [
          F[1] || (F[1] = ae(te((P) => d.value = !1, ["stop"]), ["esc"])),
          F[2] || (F[2] = ae(te((P) => d.value = !d.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          ae(te(L, ["prevent"]), ["down"]),
          ae(te(k, ["prevent"]), ["up"]),
          F[3] || (F[3] = //@ts-ignore
          (...P) => q(x) && q(x)(...P)),
          F[4] || (F[4] = ae((P) => d.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          [D.icon]: !0,
          "fr-btn--secondary": D.secondary,
          "fr-btn--tertiary": D.tertiary,
          "fr-btn--sm": v.value,
          "fr-btn--md": I.value,
          "fr-btn--lg": E.value
        }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": D.disabled,
        "aria-controls": `${D.id}_menu`,
        "aria-expanded": d.value
      }, D.$attrs), [
        c("span", null, g(D.label), 1)
      ], 16, _v),
      c("div", {
        id: `${D.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: O(["fr-collapse fr-menu", { "fr-collapse--expanded": q(r), "fr-collapsing": q(n) }]),
        role: "menu",
        "aria-labelledby": D.id,
        onKeyup: F[5] || (F[5] = ae((P) => d.value = !1, ["esc"])),
        onKeydown: [
          F[6] || (F[6] = ae((P) => d.value = !1, ["tab"])),
          ae(te(L, ["prevent"]), ["down"]),
          ae(te(k, ["prevent"]), ["up"]),
          F[7] || (F[7] = //@ts-ignore
          (...P) => q(x) && q(x)(...P))
        ],
        onTransitionend: F[8] || (F[8] = (P) => q(s)(d.value))
      }, [
        c("ul", Dv, [
          B(D.$slots, "default", {}, void 0, !0)
        ])
      ], 42, xv)
    ], 544));
  }
}), Iv = /* @__PURE__ */ Ae(Tv, [["__scopeId", "data-v-7e2a2d17"]]), Cv = { role: "none" }, Ev = ["id", "href"], Pv = /* @__PURE__ */ R({
  inheritAttrs: !1,
  __name: "DsfrMenuLink",
  props: {
    label: { default: "" },
    icon: { default: "" },
    url: { default: "" }
  },
  setup(a) {
    const t = a, { menuItemIndex: e, addMenuItem: n } = Qe("menuItem"), l = `fr-btn fr-btn--secondary fr-nav__link ${w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")) ? t.icon : ""} fr-btn--icon-left`, s = Qe("id"), o = e.value;
    return n(t.label, o), (u, d) => {
      const p = xe("dsfr-button");
      return i(), f("li", Cv, [
        u.url === "" ? (i(), H(p, Q({
          key: 0,
          tabindex: "-1",
          role: "menuitem",
          label: u.label,
          id: `${q(s)}_item_${q(o)}`,
          icon: u.icon,
          tertiary: "",
          "no-outline": "",
          "icon-left": "",
          class: "fr-nav__link"
        }, u.$attrs), null, 16, ["label", "id", "icon"])) : (i(), f("a", Q({
          key: 1,
          tabindex: "-1",
          role: "menuitem",
          id: `${q(s)}_item_${q(o)}`,
          href: u.url,
          class: l
        }, u.$attrs), g(u.label), 17, Ev))
      ]);
    };
  }
}), Lv = /* @__PURE__ */ Ae(Pv, [["__scopeId", "data-v-2b0119ca"]]), Mv = ["for", "id"], Bv = {
  key: 0,
  class: "required"
}, Sv = {
  key: 0,
  class: "fr-hint-text"
}, $v = ["id", "value", "aria-expanded", "aria-controls", "aria-disabled", "aria-required"], Av = { class: "grow overflow" }, Ov = { class: "fr-pl-1v fr-select__icon" }, Rv = ["id"], Fv = {
  key: 0,
  class: "fr-btns-group fr-btns-group--icon-left"
}, Vv = ["id"], Nv = {
  key: 1,
  class: "fr-input-wrap fr-icon-search-line fr-mb-3v"
}, qv = ["id", "aria-controls"], jv = ["id"], Hv = {
  key: 0,
  class: "fr-hint-text"
}, Wv = ["aria-describedby", "id"], Kv = ["id", "onKeydown", "onClick", "aria-selected"], Qv = ["data-id", "value"], Yv = ["id"], zv = /* @__PURE__ */ R({
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
    de(o, ($, A) => {
      $ !== A && (r($), $ ? (document.addEventListener("click", S), document.addEventListener("touchstart", S)) : (document.removeEventListener("click", S), document.removeEventListener("touchstart", S)));
    });
    const p = K(null), h = K(null), m = K(null), C = K(""), _ = w(() => s.errorMessage || s.successMessage), L = w(() => s.errorMessage !== "" ? "error" : "valid"), k = w(() => d.value.every(($) => s.modelValue.includes($.value)) ? "fr-icon-close-circle-line" : "fr-icon-check-line"), x = w(() => d.value.every(($) => s.modelValue.includes($.value)) ? "Tout déselectionner" : "Tout sélectionner"), T = w(() => {
      let A = `${s.options.filter((U) => s.modelValue.includes(U.value)).length} options séléctionnées`;
      return s.modelValue.length > 2 ? A : s.options.filter((U) => s.modelValue.includes(U.value)).map((U) => U.text).join(", ");
    });
    let M = function() {
      if (d.value.every((A) => s.modelValue.includes(A.value))) {
        const A = d.value.map((Y) => Y.value), U = s.modelValue.filter((Y) => !A.includes(Y));
        s.modelValue.length = 0, U.forEach((Y) => s.modelValue.push(Y));
      } else
        d.value.filter((U) => !s.modelValue.includes(U.value)).forEach((U) => s.modelValue.push(U.value));
    }, v = function($) {
      const A = $.target.value.toLowerCase();
      d.value = s.options.filter((U) => U.text.toLowerCase().indexOf(A) > -1);
    };
    const I = function($) {
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
          $.preventDefault(), o.value ? F() : (o.value = !0, setTimeout(() => F(), 100));
          break;
        case "Up":
        case "ArrowUp":
          $.preventDefault(), o.value ? P() : (o.value = !0, setTimeout(() => P(), 100));
          break;
        case "Tab":
          G($);
          break;
        default:
          let A = /^[a-zA-Z0-9àâäçéèêëîïôöùûüÿÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸ]$/.test($.key);
          if (!A && $.shiftKey)
            return;
          s.comboHasFilter && document.activeElement.id === `${s.id}_filter` || (s.comboHasFilter && A ? m.value.focus() : y($));
      }
    }, E = ($, A) => {
      const U = A === "down" ? ($ + 1) % d.value.length : ($ - 1 + d.value.length) % d.value.length, Y = document.getElementById(`${s.id}_item_${U}`);
      return Y === null || Y.ariaDisabled === "true" ? E(U, A) : Y;
    }, D = ($) => {
      const A = document.activeElement.id, U = A.startsWith(`${s.id}_item_`) ? Number(A.split("_")[2]) : $ === "down" ? -1 : 0;
      E(U, $).focus();
    }, F = ($) => D("down"), P = ($) => D("up"), G = ($) => {
      if (!o.value)
        return;
      const A = [];
      s.comboHasButton && A.push(`${s.id}_button`), s.comboHasFilter && A.push(`${s.id}_filter`), A.push("item");
      const U = A.indexOf($.target.id);
      let Y;
      $.shiftKey ? Y = (U - 1 + A.length) % A.length : Y = (U + 1) % A.length;
      const re = document.getElementById(A[Y]);
      A[Y] === "item" ? (F(), $.preventDefault()) : re && (re.focus(), $.preventDefault());
    };
    let y = ($) => {
      let A = $.key;
      if (A.length > 1 && A.match(/\S/) || document.activeElement.id === `${s.id}_filter`)
        return;
      A = A.toLowerCase();
      let U = d.value.filter((re) => re.text.toLowerCase().startsWith(A)), Y = document.activeElement.id;
      for (let re of U) {
        let ne = document.querySelector(`[data-id='${re.value}']`);
        if (Y !== ne.id) {
          ne.focus();
          break;
        }
      }
    }, S = ($) => {
      p.value.contains($.target) || (o.value = !1);
    }, j = ($, A) => {
      u.value.includes(A) ? u.value.splice(u.value.indexOf(A), 1) : (u.value.push(A), d.value.length === 1 && (C.value = "", d.value = s.options));
    };
    return ($, A) => {
      const U = xe("v-icon");
      return i(), f(z, null, [
        c("div", Q({
          ref_key: "container",
          ref: p,
          class: ["fr-select-group", { [`fr-select-group--${L.value}`]: _.value !== "" }],
          onKeyup: A[6] || (A[6] = ae(
            //@ts-ignore
            (...Y) => q(S) && q(S)(...Y),
            ["tab"]
          ))
        }, $.$attrs), [
          c("label", {
            class: "fr-label",
            for: $.id,
            id: `${$.id}_label`
          }, [
            B($.$slots, "label", {}, () => [
              V(g($.label) + " ", 1),
              B($.$slots, "required-tip", {}, () => [
                $.required ? (i(), f("span", Bv, " *")) : b("", !0)
              ], !0)
            ], !0),
            $.description ? (i(), f("span", Sv, g($.description), 1)) : b("", !0)
          ], 8, Mv),
          c("div", {
            id: $.id,
            class: O([{ [`fr-select--${L.value}`]: _.value !== "" }, "fr-input fr-select--menu flex"]),
            onClick: A[0] || (A[0] = (Y) => o.value = !o.value),
            onKeydown: I,
            value: T.value,
            tabindex: "0",
            "aria-autocomplete": "none",
            role: "combobox",
            "aria-expanded": o.value,
            "aria-haspopup": "dialog",
            "aria-controls": `${$.id}_dialog`,
            "aria-disabled": $.disabled,
            "aria-required": $.required
          }, [
            c("p", Av, g(T.value), 1),
            c("div", Ov, [
              ee(U, {
                style: { "font-size": "1rem" },
                name: "ri-arrow-down-s-line"
              })
            ])
          ], 42, $v),
          c("div", {
            id: `${$.id}_dialog`,
            ref_key: "collapse",
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "Choix des options",
            class: O(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": q(n), "fr-collapsing": q(e) }]),
            onKeydown: I,
            onTransitionend: A[5] || (A[5] = (Y) => q(l)(o.value))
          }, [
            $.comboHasButton ? (i(), f("div", Fv, [
              c("button", {
                class: O(["fr-btn fr-btn--tertiary fr-btn--sm", `${k.value}`]),
                id: `${$.id}_button`,
                onClick: A[1] || (A[1] = (Y) => q(M)()),
                ref_key: "button",
                ref: h,
                type: "button"
              }, g(x.value), 11, Vv)
            ])) : b("", !0),
            $.comboHasFilter ? (i(), f("div", Nv, [
              Me(c("input", {
                class: "fr-input",
                id: `${$.id}_filter`,
                ref_key: "filter",
                ref: m,
                onInput: A[2] || (A[2] = //@ts-ignore
                (...Y) => q(v) && q(v)(...Y)),
                "onUpdate:modelValue": A[3] || (A[3] = (Y) => C.value = Y),
                "aria-label": "Rechercher une option",
                "aria-controls": `${$.id}_listbox`,
                placeholder: "Rechercher",
                type: "text"
              }, null, 40, qv), [
                [pa, C.value]
              ])
            ])) : b("", !0),
            $.comboLabel ? (i(), f("p", {
              key: 2,
              class: "fr-label fr-mb-2v",
              id: `${$.id}_combolabel`
            }, [
              V(g($.comboLabel) + " ", 1),
              $.comboDescription ? (i(), f("span", Hv, g($.comboDescription), 1)) : b("", !0)
            ], 8, jv)) : b("", !0),
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
                onKeydown: ae(te((ne) => q(j)(ne, Y.value), ["prevent"]), ["space"]),
                onClick: (ne) => q(j)(ne, Y.value),
                "aria-selected": u.value.includes(Y.value)
              }, [
                Me(c("input", {
                  "data-id": Y.value,
                  type: "hidden",
                  class: "",
                  tabindex: "-1",
                  value: Y.value,
                  "onUpdate:modelValue": A[4] || (A[4] = (ne) => u.value = ne)
                }, null, 8, Qv), [
                  [pa, u.value]
                ]),
                c("span", null, g(Y.text), 1)
              ], 40, Kv))), 256))
            ], 8, Wv)
          ], 42, Rv)
        ], 16),
        _.value ? (i(), f("p", {
          key: 0,
          id: `select-${L.value}-desc-${L.value}`,
          class: O(`fr-${L.value}-text`)
        }, g(_.value), 11, Yv)) : b("", !0)
      ], 64);
    };
  }
}), Gv = /* @__PURE__ */ Ae(zv, [["__scopeId", "data-v-3c129b3e"]]), Xv = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Uv = ["id", "aria-labelledby", "onKeydown"], Zv = {
  key: 0,
  class: "fr-label fr-mb-0"
}, Jv = {
  key: 0,
  class: "fr-hint-text"
}, eg = {
  class: "fr-menu-header__list fr-mx-n4v fr-pt-2v fr-mb-0",
  role: "none"
}, tg = { role: "none" }, ag = { class: "fr-p-2v" }, ng = ["id", "href"], rg = /* @__PURE__ */ R({
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
    const h = (T, M) => {
      d.value += 1, p.push(`${T}@${M}`);
    };
    Re("menuItem", { menuItemIndex: d, addMenuItem: h }), Re("id", s.id), de(u, (T, M) => {
      T !== M && (r(T), T ? (setTimeout(() => _(), 100), document.addEventListener("click", x), document.addEventListener("touchstart", x)) : (document.removeEventListener("click", x), document.removeEventListener("touchstart", x)));
    }), ye(() => {
      h(s.logoutLabel, d.value);
    });
    const m = (T, M) => {
      const v = M === "down" ? (T + 1) % p.length : (T - 1 + p.length) % p.length, I = document.getElementById(`${s.id}_item_${v}`);
      return I.ariaDisabled === "true" ? m(v, M) : I;
    }, C = (T) => {
      const M = document.activeElement.id, v = M.startsWith(`${s.id}_item_`) ? Number(M.split("_")[2]) : T === "down" ? -1 : 0;
      m(v, T).focus();
    }, _ = (T) => C("down"), L = (T) => C("up");
    let k = (T) => {
      let M = T.key;
      if (M.length > 1 && M.match(/\S/))
        return;
      M = M.toLowerCase();
      let v = p.filter((E) => E.toLowerCase().startsWith(M)), I = document.activeElement.id;
      for (let E of v) {
        let D = E.split("@")[1], F = document.getElementById(`${s.id}_item_${D}`);
        if (I !== F.id) {
          F.focus();
          break;
        }
      }
    }, x = (T) => {
      o.value.contains(T.target) || (u.value = !1);
    };
    return (T, M) => (i(), f("div", {
      class: "relative-position fr-menu-header",
      onKeyup: M[9] || (M[9] = ae(
        //@ts-ignore
        (...v) => q(x) && q(x)(...v),
        ["tab"]
      )),
      ref_key: "container",
      ref: o
    }, [
      c("button", Q({
        id: T.id,
        onClick: M[0] || (M[0] = te((v) => u.value = !u.value, ["prevent", "stop"])),
        onKeyup: [
          M[1] || (M[1] = ae(te((v) => u.value = !1, ["stop"]), ["esc"])),
          M[2] || (M[2] = ae(te((v) => u.value = !u.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          ae(te(_, ["prevent"]), ["down"]),
          ae(te(L, ["prevent"]), ["up"]),
          M[3] || (M[3] = //@ts-ignore
          (...v) => q(k) && q(k)(...v)),
          M[4] || (M[4] = ae((v) => u.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-btn--tertiary-no-outline fr-menu__btn fr-btn--sm fr-btn--icon-left", { [T.icon]: !0 }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": T.disabled,
        "aria-controls": `${T.id}_menu`,
        "aria-expanded": u.value
      }, T.$attrs), [
        c("span", null, g(T.label), 1)
      ], 16, Xv),
      c("div", {
        id: `${T.id}_menu`,
        ref_key: "collapse",
        ref: t,
        class: O(["fr-collapse fr-menu fr-menu-header__modal fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": q(n), "fr-collapsing": q(e) }]),
        role: "menu",
        "aria-labelledby": T.id,
        onKeyup: M[5] || (M[5] = ae((v) => u.value = !1, ["esc"])),
        onKeydown: [
          M[6] || (M[6] = ae((v) => u.value = !1, ["tab"])),
          ae(te(_, ["prevent"]), ["down"]),
          ae(te(L, ["prevent"]), ["up"]),
          M[7] || (M[7] = //@ts-ignore
          (...v) => q(k) && q(k)(...v))
        ],
        onTransitionend: M[8] || (M[8] = (v) => q(l)(u.value))
      }, [
        B(T.$slots, "detail", {}, () => [
          T.nom === "" && T.email === "" ? b("", !0) : (i(), f("p", Zv, [
            V(g(T.nom) + " ", 1),
            T.email !== "" ? (i(), f("span", Jv, g(T.email), 1)) : b("", !0)
          ]))
        ], !0),
        c("ul", eg, [
          B(T.$slots, "default", {}, void 0, !0),
          c("li", tg, [
            c("div", ag, [
              T.logoutUrl !== "" ? (i(), f("a", {
                key: 0,
                id: `${T.id}_item_${q(d) - 1}`,
                class: "fr-btn fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left",
                role: "menuitem",
                tabindex: "-1",
                href: T.logoutUrl
              }, g(T.logoutLabel), 9, ng)) : b("", !0)
            ])
          ])
        ])
      ], 42, Uv)
    ], 544));
  }
}), lg = /* @__PURE__ */ Ae(rg, [["__scopeId", "data-v-3a8c3dd5"]]), sg = Symbol("header"), og = ["aria-label"], ig = { class: "fr-btns-group" }, Qt = /* @__PURE__ */ R({
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
      c("ul", ig, [
        (i(!0), f(z, null, J(n.links, (l, s) => (i(), f("li", { key: s }, [
          ee(q(sa), Q({ ref_for: !0 }, l, {
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
}, yg = ["aria-label", "title", "data-fr-opened"], kg = ["aria-label", "title"], wg = {
  key: 0,
  class: "fr-header__service"
}, _g = { class: "fr-header__service-title" }, xg = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, Dg = {
  key: 0,
  class: "fr-header__service-tagline"
}, Tg = {
  key: 1,
  class: "fr-header__service"
}, Ig = { class: "fr-header__tools" }, Cg = {
  key: 0,
  class: "fr-header__tools-links"
}, Eg = { class: "fr-header__search fr-modal" }, Pg = ["aria-label"], Lg = { class: "fr-container" }, Mg = { class: "fr-header__menu-links" }, Bg = {
  key: 1,
  class: "flex justify-center items-center"
}, Sg = { class: "fr-header__menu fr-modal" }, $g = {
  key: 0,
  class: "fr-container"
}, Ag = /* @__PURE__ */ R({
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
      var k;
      o.value = !1, l.value = !1, s.value = !1, (k = document.getElementById("button-menu")) == null || k.focus();
    }, d = (k) => {
      k.key === "Escape" && u();
    };
    ye(() => {
      document.addEventListener("keydown", d), n("on-mounted");
    }), Ee(() => {
      document.removeEventListener("keydown", d);
    });
    const p = () => {
      var k;
      o.value = !0, l.value = !0, s.value = !1, (k = document.getElementById("close-button")) == null || k.focus();
    }, h = () => {
      o.value = !0, l.value = !1, s.value = !0;
    }, m = u, C = Gt(), _ = w(() => {
      var k;
      return !!((k = C.operator) != null && k.call(C).length) || !!e.operatorImgSrc;
    }), L = w(() => !!C.mainnav);
    return Re(sg, () => u), (k, x) => {
      var M, v, I;
      const T = xe("RouterLink");
      return i(), f("header", ug, [
        c("div", dg, [
          c("div", cg, [
            c("div", fg, [
              c("div", pg, [
                c("div", mg, [
                  c("div", hg, [
                    ee(T, {
                      to: k.homeTo,
                      title: `${k.homeLabel} - ${k.serviceTitle}`
                    }, {
                      default: Z(() => [
                        ee(q(nt), {
                          "logo-text": k.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  _.value ? (i(), f("div", vg, [
                    B(k.$slots, "operator", {}, () => [
                      k.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: k.operatorImgSrc,
                        alt: k.operatorImgAlt,
                        style: Te(k.operatorImgStyle)
                      }, null, 12, gg)) : b("", !0)
                    ])
                  ])) : b("", !0),
                  k.showSearch || L.value || (M = k.quickLinks) != null && M.length ? (i(), f("div", bg, [
                    k.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": k.showSearchLabel,
                      title: k.showSearchLabel,
                      "data-fr-opened": s.value,
                      onClick: x[0] || (x[0] = te((E) => h(), ["prevent", "stop"]))
                    }, null, 8, yg)) : b("", !0),
                    L.value || (v = k.quickLinks) != null && v.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": k.menuLabel,
                      title: k.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: x[1] || (x[1] = te((E) => p(), ["prevent", "stop"]))
                    }, null, 8, kg)) : b("", !0)
                  ])) : b("", !0)
                ]),
                k.serviceTitle ? (i(), f("div", wg, [
                  ee(T, Q({
                    to: k.homeTo,
                    title: `${k.homeLabel} - ${k.serviceTitle}`
                  }, k.$attrs), {
                    default: Z(() => [
                      c("p", _g, [
                        V(g(k.serviceTitle) + " ", 1),
                        k.showBeta ? (i(), f("span", xg, " BETA ")) : b("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  k.serviceDescription ? (i(), f("p", Dg, g(k.serviceDescription), 1)) : b("", !0)
                ])) : b("", !0),
                !k.serviceTitle && k.showBeta ? (i(), f("div", Tg, x[9] || (x[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : b("", !0)
              ]),
              c("div", Ig, [
                (I = k.quickLinks) != null && I.length || r.value ? (i(), f("div", Cg, [
                  l.value ? b("", !0) : (i(), H(Qt, {
                    key: 0,
                    links: k.quickLinks,
                    "nav-aria-label": k.quickLinksAriaLabel
                  }, {
                    default: Z(() => [
                      B(k.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label"])),
                  r.value ? (i(), H(q(rt), Q({ key: 1 }, r.value, {
                    onSelect: x[2] || (x[2] = (E) => n("language-select", E))
                  }), null, 16)) : b("", !0)
                ])) : b("", !0),
                c("div", Eg, [
                  B(k.$slots, "header-search"),
                  k.showSearch ? (i(), H(q(lt), {
                    key: 0,
                    "searchbar-id": k.searchbarId,
                    label: k.searchLabel,
                    "model-value": k.modelValue,
                    placeholder: k.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": x[3] || (x[3] = (E) => n("update:modelValue", E)),
                    onSearch: x[4] || (x[4] = (E) => n("search", E))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])) : b("", !0)
                ])
              ])
            ]),
            k.showSearch || L.value || k.quickLinks && k.quickLinks.length || r.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: O(["fr-header__menu fr-modal", { "fr-modal--opened": o.value }]),
              "aria-label": k.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", Lg, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: x[5] || (x[5] = te((E) => u(), ["prevent", "stop"]))
                }, g(k.closeMenuModalLabel), 1),
                c("div", Mg, [
                  r.value ? (i(), H(q(rt), Q({ key: 0 }, r.value, {
                    onSelect: x[6] || (x[6] = (E) => r.value.currentLanguage = E.codeIso)
                  }), null, 16)) : b("", !0),
                  l.value ? (i(), H(Qt, {
                    key: 1,
                    role: "navigation",
                    links: k.quickLinks,
                    "nav-aria-label": k.quickLinksAriaLabel,
                    onLinkClick: q(m)
                  }, {
                    default: Z(() => [
                      B(k.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label", "onLinkClick"])) : b("", !0),
                  B(k.$slots, "header-search")
                ]),
                o.value ? B(k.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : b("", !0),
                s.value ? (i(), f("div", Bg, [
                  ee(q(lt), {
                    "searchbar-id": k.searchbarId,
                    "model-value": k.modelValue,
                    placeholder: k.placeholder,
                    "onUpdate:modelValue": x[7] || (x[7] = (E) => n("update:modelValue", E)),
                    onSearch: x[8] || (x[8] = (E) => n("search", E))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ], 10, Pg)) : b("", !0),
            B(k.$slots, "default")
          ])
        ]),
        c("div", Sg, [
          L.value && !o.value ? (i(), f("div", $g, [
            B(k.$slots, "mainnav", { hidemodal: u })
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
}, Xg = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Ug = ["id", "value"], Zg = ["for"], Jg = ["onKeydown"], eb = { key: 0 }, tb = ["colspan"], ab = { class: "flex gap-2 items-center" }, nb = ["selected"], rb = ["value", "selected"], lb = { class: "flex ml-1" }, sb = /* @__PURE__ */ R({
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
    const n = a, r = e, l = _e(a, "selection"), s = _e(a, "rowsPerPage"), o = _e(a, "currentPage"), u = w(() => Math.max(Math.ceil(n.rows.length / s.value), 1)), d = w(() => n.pages ?? Array.from({ length: u.value }).map((P, G) => ({
      label: `${G + 1}`,
      title: `Page ${G + 1}`,
      href: `#${G + 1}`
    }))), p = w(() => o.value * s.value), h = w(() => (o.value + 1) * s.value), m = w(() => ["sm", "small"].includes(n.footerSize));
    function C(P, G) {
      const y = _.value;
      return (P[y] ?? P) < (G[y] ?? G) ? -1 : (P[y] ?? P) > (G[y] ?? G) ? 1 : 0;
    }
    const _ = _e(a, "sortedBy");
    _.value = n.sorted;
    const L = _e(a, "sortedDesc");
    function k(P) {
      if (!(!n.sortableRows || Array.isArray(n.sortableRows) && !n.sortableRows.includes(P))) {
        if (_.value === P) {
          if (L.value) {
            _.value = void 0, L.value = !1;
            return;
          }
          L.value = !0;
          return;
        }
        L.value = !1, _.value = P;
      }
    }
    const x = w(() => {
      const P = _.value ? n.rows.slice().sort(n.sortFn ?? C) : n.rows.slice();
      return L.value && P.reverse(), P;
    }), T = w(() => {
      const P = n.headersRow.map((y) => typeof y != "object" ? y : y.key), G = x.value.map((y) => Array.isArray(y) ? y : P.map((S) => y));
      return n.pagination ? G.slice(p.value, h.value) : G;
    });
    function M(P) {
      P && (l.value = T.value.map((G) => G[0][n.rowKey])), l.value.length = 0;
    }
    const v = K(!1);
    function I() {
      v.value = l.value.length === T.value.length;
    }
    function E() {
      r("update:current-page", 0), v.value = !1, l.value.length = 0;
    }
    function D(P) {
      navigator.clipboard.writeText(P);
    }
    function F() {
      o.value = 0;
    }
    return t({ resetCurrentPage: F }), (P, G) => (i(), f("div", Og, [
      c("div", Rg, [
        c("div", Fg, [
          c("div", Vg, [
            c("table", { id: P.id }, [
              c("caption", {
                class: O({ "fr-sr-only": P.noCaption })
              }, g(P.title), 3),
              c("thead", null, [
                c("tr", null, [
                  P.selectableRows ? (i(), f("th", qg, [
                    P.showToggleAll ? (i(), f("div", jg, [
                      c("input", {
                        id: `table-select--${P.id}-all`,
                        checked: v.value,
                        type: "checkbox",
                        onInput: G[0] || (G[0] = (y) => M(y.target.checked))
                      }, null, 40, Hg),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${P.id}-all`
                      }, " Sélectionner tout ", 8, Wg)
                    ])) : b("", !0)
                  ])) : b("", !0),
                  (i(!0), f(z, null, J(P.headersRow, (y, S) => (i(), f("th", Q({
                    key: typeof y == "object" ? y.key : y,
                    scope: "col",
                    ref_for: !0
                  }, typeof y == "object" && y.headerAttrs, {
                    class: {
                      "text-right": y.align === "right",
                      "text-left": y.align === "left"
                    },
                    tabindex: P.sortableRows ? 0 : void 0,
                    onClick: (j) => k(y.key ?? (Array.isArray(P.rows[0]) ? S : y)),
                    onKeydown: [
                      ae((j) => k(y.key ?? y), ["enter"]),
                      ae((j) => k(y.key ?? y), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: O({
                        "sortable-header": P.sortableRows === !0 || Array.isArray(P.sortableRows) && P.sortableRows.includes(y.key ?? y),
                        "fr-sr-only": typeof y == "object" ? y.hideLabel : !1,
                        "flex-row-reverse": typeof y == "object" ? y.align === "right" : !1
                      })
                    }, [
                      B(P.$slots, "header", Q({ ref_for: !0 }, typeof y == "object" ? y : { key: y, label: y }), () => [
                        V(g(typeof y == "object" ? y.label : y), 1)
                      ], !0),
                      _.value !== (y.key ?? y) && (P.sortableRows === !0 || Array.isArray(P.sortableRows) && P.sortableRows.includes(y.key ?? y)) ? (i(), f("span", Qg, [
                        ee(q(be), {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : _.value === (y.key ?? y) ? (i(), f("span", Yg, [
                        ee(q(be), {
                          name: L.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : b("", !0)
                    ], 2)
                  ], 16, Kg))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(z, null, J(T.value, (y, S) => (i(), f("tr", {
                  key: `row-${S}`,
                  "data-row-key": S + 1
                }, [
                  P.selectableRows ? (i(), f("th", Gg, [
                    c("div", Xg, [
                      Me(c("input", {
                        id: `row-select-${P.id}-${S}`,
                        "onUpdate:modelValue": G[1] || (G[1] = (j) => l.value = j),
                        value: y[0][P.rowKey] ?? `row-${S}`,
                        type: "checkbox",
                        onChange: G[2] || (G[2] = (j) => I())
                      }, null, 40, Ug), [
                        [yt, l.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${P.id}-${S}`
                      }, " Sélectionner la ligne " + g(S + 1), 9, Zg)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(z, null, J(y, (j, $) => (i(), f("td", {
                    key: typeof j == "object" ? j[P.rowKey] : j,
                    class: O({
                      "text-right": P.headersRow[$].align === "right",
                      "text-left": P.headersRow[$].align === "left"
                    }),
                    onKeydown: [
                      ae(te((A) => D(typeof j == "object" ? j[P.rowKey] : j), ["ctrl"]), ["c"]),
                      ae(te((A) => D(typeof j == "object" ? j[P.rowKey] : j), ["meta"]), ["c"])
                    ]
                  }, [
                    B(P.$slots, "cell", Q({ ref_for: !0 }, {
                      colKey: typeof P.headersRow[$] == "object" ? P.headersRow[$].key : P.headersRow[$],
                      cell: j,
                      idx: S + 1
                    }), () => [
                      V(g(typeof j == "object" ? j[P.rowKey] : j), 1)
                    ], !0)
                  ], 42, Jg))), 128))
                ], 8, zg))), 128)),
                T.value.length === 0 ? (i(), f("tr", eb, [
                  c("td", {
                    colspan: P.selectableRows ? P.headersRow.length + 1 : P.headersRow.length
                  }, g(n.noResultLabel), 9, tb)
                ])) : b("", !0)
              ])
            ], 8, Ng)
          ])
        ])
      ]),
      c("div", {
        class: O(P.bottomActionBarClass)
      }, [
        B(P.$slots, "pagination", {}, () => [
          P.pagination && !P.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: O(["flex justify-between items-center flex-wrap", P.paginationWrapperClass])
          }, [
            P.showNbRows ? (i(), f("p", {
              key: 0,
              class: O(["fr-mb-0 fr-ml-1v", { "fr-text--sm": m.value }])
            }, g(P.rows.length) + " résulat(s)", 3)) : b("", !0),
            c("div", ab, [
              c("label", {
                class: O(["fr-label", { "fr-text--sm": m.value }]),
                for: "pagination-options"
              }, " Résultats par page : ", 2),
              Me(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": G[3] || (G[3] = (y) => s.value = y),
                class: "fr-select",
                onChange: G[4] || (G[4] = (y) => E())
              }, [
                c("option", {
                  value: "",
                  selected: !P.paginationOptions.includes(s.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, nb),
                (i(!0), f(z, null, J(P.paginationOptions, (y, S) => (i(), f("option", {
                  key: S,
                  value: y,
                  selected: +y === s.value
                }, g(y), 9, rb))), 128))
              ], 544), [
                [Xt, s.value]
              ])
            ]),
            c("div", lb, [
              c("span", {
                class: O(["self-center", { "fr-text--sm": m.value }])
              }, " Page " + g(o.value + 1) + " sur " + g(u.value), 3)
            ]),
            ee(q(la), {
              "current-page": o.value,
              "onUpdate:currentPage": G[5] || (G[5] = (y) => o.value = y),
              pages: d.value,
              "next-page-title": "Suivant",
              "prev-page-title": "Précédent"
            }, null, 8, ["current-page", "pages"])
          ], 2)) : b("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), ob = /* @__PURE__ */ Ae(sb, [["__scopeId", "data-v-50097005"]]), ib = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], ub = ["for"], db = {
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
}, pb = /* @__PURE__ */ R({
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
    const t = a, e = w(() => t.errorMessage || t.validMessage), n = w(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = _e(a, "modelValue");
    return (l, s) => (i(), f("div", {
      class: O(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      c("div", {
        class: O(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        Me(c("input", Q({
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
          [yt, r.value]
        ]),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          B(l.$slots, "label", {}, () => [
            V(g(l.label) + " ", 1),
            B(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", db, " *")) : b("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", cb, [
            B(l.$slots, "hint", {}, () => [
              V(g(l.hint), 1)
            ])
          ])) : b("", !0)
        ], 8, ub),
        e.value ? (i(), f("div", fb, [
          c("p", {
            class: O(["fr-message--info flex items-center", n.value])
          }, g(e.value), 3)
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), mb = ["for"], hb = {
  key: 0,
  class: "required"
}, vb = {
  key: 0,
  class: "fr-hint-text"
}, gb = ["id", "name", "disabled", "aria-disabled", "required"], bb = ["selected"], yb = ["selected", "value", "disabled", "aria-disabled"], kb = ["id"], wb = /* @__PURE__ */ R({
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
    const e = w(() => t.errorMessage || t.successMessage), n = w(() => t.errorMessage ? "error" : "valid"), r = function(l) {
      if (l === "")
        return null;
      let o = t.options.length > 0 && t.options[0].value !== "" && typeof t.options[0].value == "string" ? 0 : 1, u = t.options.length > o && typeof t.options[o].value == "string";
      return isNaN(l) || u ? l : parseInt(l, 10);
    };
    return (l, s) => (i(), f("div", {
      class: O(["fr-select-group", { [`fr-select-group--${n.value}`]: e.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: l.selectId
      }, [
        B(l.$slots, "label", {}, () => [
          V(g(l.label) + " ", 1),
          B(l.$slots, "required-tip", {}, () => [
            l.required ? (i(), f("span", hb, " *")) : b("", !0)
          ])
        ]),
        l.hint ?? l.description ? (i(), f("span", vb, g(l.hint ?? l.description), 1)) : b("", !0)
      ], 8, mb),
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
          disabled: "",
          hidden: ""
        }, g(l.defaultUnselectedText), 9, bb),
        (i(!0), f(z, null, J(l.options, (o, u) => (i(), f("option", {
          key: u,
          selected: l.modelValue === o || typeof o == "object" && o.value === l.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, g(typeof o == "object" ? o.text : o), 9, yb))), 128))
      ], 16, gb),
      e.value ? (i(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: O(`fr-${n.value}-text`)
      }, g(e.value), 11, kb)) : b("", !0)
    ], 2));
  }
}), _b = ["id"], xb = /* @__PURE__ */ R({
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
    const t = a, e = K(!1), n = K(null), r = K(null), l = K("0px"), s = K("0px"), o = K("0px"), u = K(!1), d = K(0);
    async function p() {
      var U, Y, re, ne, De, Ce, W, X;
      if (typeof document > "u" || !e.value || r.value.matches(":empty"))
        return;
      await new Promise((le) => setTimeout(le, 100));
      const v = (U = n.value) == null ? void 0 : U.getBoundingClientRect().top, I = (Y = n.value) == null ? void 0 : Y.offsetHeight, E = (re = n.value) == null ? void 0 : re.offsetWidth, D = (ne = n.value) == null ? void 0 : ne.getBoundingClientRect().left, F = (De = r.value) == null ? void 0 : De.offsetHeight, P = (Ce = r.value) == null ? void 0 : Ce.offsetWidth, G = (W = r.value) == null ? void 0 : W.offsetTop, y = (X = r.value) == null ? void 0 : X.offsetLeft, j = !(v - F < 0) && v + I + F >= document.documentElement.offsetHeight;
      u.value = j;
      const $ = D + E >= document.documentElement.offsetWidth, A = D + E / 2 - P / 2 <= 0;
      s.value = j ? `${v - G - F + 8}px` : `${v - G + I - 8}px`, d.value = 1, l.value = $ ? `${D - y + E - P - 4}px` : A ? `${D - y + 4}px` : `${D - y + E / 2 - P / 2}px`, o.value = $ ? `${P / 2 - E / 2 + 4}px` : A ? `${-(P / 2) + E / 2 - 4}px` : "0px";
    }
    de(e, p, { immediate: !0 }), ye(() => {
      window.addEventListener("scroll", p), n.value.addEventListener("click", () => e.value = !1);
    }), Ee(() => {
      window.removeEventListener("scroll", p);
    });
    const h = w(() => ["sm", "small"].includes(t.size)), m = w(() => ["md", "medium"].includes(t.size)), C = w(() => ["lg", "large"].includes(t.size)), _ = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), L = w(() => `transform: translate(${l.value}, ${s.value}); --arrow-x: ${o.value}; opacity: ${d.value};'`), k = w(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), x = (v) => {
      v.key === "Escape" && (e.value = !1);
    }, T = (v) => {
      var I;
      (v.target === n.value || (I = n.value) != null && I.contains(v.target)) && (e.value = !0);
    }, M = () => {
      e.value = !1;
    };
    return ye(() => {
      document.documentElement.addEventListener("keydown", x), document.documentElement.addEventListener("mouseover", T), t.disabled && n.value.addEventListener("click", (v) => v.preventDefault());
    }), Ee(() => {
      document.documentElement.removeEventListener("keydown", x), document.documentElement.removeEventListener("mouseover", T);
    }), de(t.disabled, () => {
      t.disabled ? n.value.addEventListener("click", (v) => v.preventDefault()) : n.value.removeEventListener("click", (v) => v.preventDefault());
    }), (v, I) => (i(), f(z, null, [
      (i(), H(ge(v.href !== "" ? "a" : "button"), Q({
        id: `button-${v.id}`,
        ref_key: "source",
        ref: n,
        href: v.href !== "" && !v.disabled ? v.href : void 0,
        class: {
          "fr-link": v.isLink && !v.inline,
          "fr-btn": !v.isLink,
          "fr-btn--secondary": v.secondary && !v.tertiary,
          "fr-btn--tertiary": v.tertiary && !v.secondary && !v.noOutline,
          "fr-btn--tertiary-no-outline": v.tertiary && !v.secondary && v.noOutline,
          "fr-btn--sm": h.value,
          "fr-btn--md": m.value,
          "fr-btn--lg": C.value,
          "fr-btn--icon-right": !v.isLink && !v.iconOnly && _.value && v.iconRight,
          "fr-btn--icon-left": !v.isLink && !v.iconOnly && _.value && !v.iconRight,
          "fr-link--icon-right": v.isLink && !v.inline && !v.iconOnly && _.value && v.iconRight,
          "fr-link--icon-left": v.isLink && !v.inline && !v.iconOnly && _.value && !v.iconRight,
          "inline-flex": !_.value,
          reverse: v.iconRight && !_.value,
          "fr-btn--custom-tooltip": v.iconOnly,
          "justify-center": !_.value && v.iconOnly,
          [v.icon]: _.value
        },
        "aria-disabled": v.disabled,
        "aria-labelledby": v.id,
        onMouseleave: I[0] || (I[0] = (E) => M()),
        onFocus: I[1] || (I[1] = (E) => T(E)),
        onBlur: I[2] || (I[2] = (E) => M())
      }, v.$attrs), {
        default: Z(() => [
          V(g(v.label), 1)
        ]),
        _: 1
      }, 16, ["id", "href", "class", "aria-disabled", "aria-labelledby"])),
      c("p", {
        id: v.id,
        ref_key: "tooltip",
        ref: r,
        class: O(["fr-tooltip fr-placement", k.value]),
        style: Te(L.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, [
        B(v.$slots, "default", {}, () => [
          V(g(v.content), 1)
        ], !0)
      ], 14, _b)
    ], 64));
  }
}), tr = /* @__PURE__ */ Ae(xb, [["__scopeId", "data-v-d3680cd6"]]), Db = /* @__PURE__ */ R({
  __name: "DsfrButtonTooltip",
  setup(a) {
    return (t, e) => (i(), H(tr, Q({ "is-link": !1 }, t.$attrs), {
      default: Z(() => [
        B(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Tb = /* @__PURE__ */ R({
  __name: "DsfrLinkTooltip",
  props: {
    asButton: { type: Boolean, default: !1 }
  },
  setup(a) {
    return (t, e) => (i(), H(tr, Q({
      "is-link": !t.asButton
    }, t.$attrs), {
      default: Z(() => [
        B(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["is-link"]));
  }
}), Ib = ["id", "href", "aria-disabled"], Cb = /* @__PURE__ */ R({
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
    const t = a, e = w(() => ["sm", "small"].includes(t.size)), n = w(() => ["md", "medium"].includes(t.size)), r = w(() => ["lg", "large"].includes(t.size)), l = w(() => t.asButton ? "btn" : "link"), s = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-"));
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
      B(o.$slots, "default", {}, () => [
        V(g(o.label), 1)
      ], !0)
    ], 16, Ib));
  }
}), Eb = /* @__PURE__ */ Ae(Cb, [["__scopeId", "data-v-44994a07"]]), Pb = (a, t) => a.matches ? a.matches(t) : a.msMatchesSelector ? a.msMatchesSelector(t) : a.webkitMatchesSelector ? a.webkitMatchesSelector(t) : null, Lb = (a, t) => {
  let e = a;
  for (; e && e.nodeType === 1; ) {
    if (Pb(e, t))
      return e;
    e = e.parentNode;
  }
  return null;
}, Mb = (a, t) => a.closest ? a.closest(t) : Lb(a, t), Bb = (a) => !!(a && typeof a.then == "function");
class Sb {
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
    onLoaded: h = () => {
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
      const { target: e } = t, n = Mb(e, "[data-result-index]");
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
    this.search = Bb(t) ? t : (C) => Promise.resolve(t(C)), this.autoSelect = e, this.setValue = n, this.setAttribute = r, this.onUpdate = l, this.onSubmit = s, this.autocorrect = u, this.onShow = o, this.onHide = d, this.onLoading = p, this.onLoaded = h, this.submitOnEnter = m;
  }
}
const $b = (a, t) => {
  const e = a.getBoundingClientRect(), n = t.getBoundingClientRect();
  return /* 1 */ e.bottom + n.height > window.innerHeight && /* 2 */
  window.innerHeight - e.bottom < e.top && /* 3 */
  window.pageYOffset + e.top - n.height > 0 ? "above" : "below";
}, Ab = (a, t, e) => {
  let n;
  return function() {
    const l = this, s = arguments, o = function() {
      n = null, a.apply(l, s);
    };
    clearTimeout(n), n = setTimeout(o, t);
  };
}, Ob = (a) => {
  if (a != null && a.length) {
    const t = a.startsWith("#");
    return {
      attribute: t ? "aria-labelledby" : "aria-label",
      content: t ? a.substring(1) : a
    };
  }
}, Rb = {
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
    const a = new Sb({
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
    return this.debounceTime > 0 && (a.handleInput = Ab(a.handleInput, this.debounceTime)), {
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
      const a = this.position === "below" ? "top" : "bottom", t = Ob(this.resultListLabel);
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
    !this.$refs.input || !this.$refs.resultList || (this.resetPosition && this.results.length > 0 && (this.resetPosition = !1, this.position = $b(
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
function Fb(a, t, e, n, r, l) {
  return i(), f("div", Q({ ref: "root" }, {
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
      c("div", Ie(kt(l.rootProps)), [
        c("input", Q({ ref: "input" }, l.inputProps, {
          onInput: t[0] || (t[0] = (...s) => l.handleInput && l.handleInput(...s)),
          onKeydown: t[1] || (t[1] = (...s) => r.core.handleKeyDown && r.core.handleKeyDown(...s)),
          onFocus: t[2] || (t[2] = (...s) => r.core.handleFocus && r.core.handleFocus(...s)),
          onBlur: t[3] || (t[3] = (...s) => r.core.handleBlur && r.core.handleBlur(...s))
        }), null, 16),
        c("ul", Q({ ref: "resultList" }, l.resultListProps, hr(l.resultListListeners, !0)), [
          (i(!0), f(z, null, J(r.results, (s, o) => B(a.$slots, "result", {
            result: s,
            props: l.resultProps[o]
          }, () => [
            (i(), f("li", Q({
              key: l.resultProps[o].id,
              ref_for: !0
            }, l.resultProps[o]), g(e.getResultValue(s)), 17))
          ])), 256))
        ], 16)
      ], 16)
    ])
  ], 16);
}
const Vb = /* @__PURE__ */ Ae(Rb, [["render", Fb]]);
var Nb = {
  install: function(a, t) {
    a.use(Zp), a.component("RouterLink", tv), a.component("DsfrFacets", wv), a.component("DsfrSelectMultiple", Gv), a.component("DsfrMenu", Iv), a.component("DsfrMenuLink", Lv), a.component("DsfrHeaderMenu", lg), a.component("DsfrCustomHeader", Ag), a.component("DsfrCustomHeaderMenuLinks", Qt), a.component("DsfrCustomDataTable", ob), a.component("DsfrCustomCheckbox", pb), a.component("DsfrCustomSelect", wb), a.component("DsfrButtonTooltip", Db), a.component("DsfrLinkTooltip", Tb), a.component("DsfrLink", Eb), a.component("autocomplete", Vb);
  },
  methods: Zh,
  utils: Jh
};
window && (window.DSFR = Nb);
export {
  Nb as default
};
//# sourceMappingURL=dsfr.es.js.map
