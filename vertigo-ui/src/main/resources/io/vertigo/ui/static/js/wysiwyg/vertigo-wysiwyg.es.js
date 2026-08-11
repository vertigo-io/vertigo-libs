/**
* @vue/shared v3.5.24
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Gh(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return (n) => n in e;
}
const $t = {}, Yh = [], ii = () => {
}, Xh = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), Xe = Object.assign, Qh = Object.prototype.hasOwnProperty, hi = (t, e) => Qh.call(t, e), F = Array.isArray, rr = (t) => ps(t) === "[object Map]", Zh = (t) => ps(t) === "[object Set]", he = (t) => typeof t == "function", st = (t) => typeof t == "string", Dr = (t) => typeof t == "symbol", Me = (t) => t !== null && typeof t == "object", ep = (t) => (Me(t) || he(t)) && he(t.then) && he(t.catch), tp = Object.prototype.toString, ps = (t) => tp.call(t), np = (t) => ps(t).slice(8, -1), rp = (t) => ps(t) === "[object Object]", ll = (t) => st(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, du = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return ((n) => e[n] || (e[n] = t(n)));
}, ip = /-\w/g, fu = du(
  (t) => t.replace(ip, (e) => e.slice(1).toUpperCase())
), sp = /\B([A-Z])/g, hu = du(
  (t) => t.replace(sp, "-$1").toLowerCase()
), xe = (t, e) => !Object.is(t, e), op = (t, ...e) => {
  for (let n = 0; n < t.length; n++)
    t[n](...e);
}, lp = (t, e, n, r = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, pu = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let ba;
const al = () => ba || (ba = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function gr(t) {
  if (F(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = st(r) ? dp(r) : gr(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else if (st(t) || Me(t))
    return t;
}
const ap = /;(?![^(]*\))/g, cp = /:([^]+)/, up = /\/\*[^]*?\*\//g;
function dp(t) {
  const e = {};
  return t.replace(up, "").split(ap).forEach((n) => {
    if (n) {
      const r = n.split(cp);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function sn(t) {
  let e = "";
  if (st(t))
    e = t;
  else if (F(t))
    for (let n = 0; n < t.length; n++) {
      const r = sn(t[n]);
      r && (e += r + " ");
    }
  else if (Me(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
/**
* @vue/reactivity v3.5.24
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let V;
const zs = /* @__PURE__ */ new WeakSet();
class fp {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, zs.has(this) && (zs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || hp(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, wa(this), gu(this);
    const e = V, n = qe;
    V = this, qe = !0;
    try {
      return this.fn();
    } finally {
      yu(this), V = e, qe = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        dl(e);
      this.deps = this.depsTail = void 0, wa(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? zs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    go(this) && this.run();
  }
  get dirty() {
    return go(this);
  }
}
let mu = 0, ir, sr;
function hp(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = sr, sr = t;
    return;
  }
  t.next = ir, ir = t;
}
function cl() {
  mu++;
}
function ul() {
  if (--mu > 0)
    return;
  if (sr) {
    let e = sr;
    for (sr = void 0; e; ) {
      const n = e.next;
      e.next = void 0, e.flags &= -9, e = n;
    }
  }
  let t;
  for (; ir; ) {
    let e = ir;
    for (ir = void 0; e; ) {
      const n = e.next;
      if (e.next = void 0, e.flags &= -9, e.flags & 1)
        try {
          e.trigger();
        } catch (r) {
          t || (t = r);
        }
      e = n;
    }
  }
  if (t) throw t;
}
function gu(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function yu(t) {
  let e, n = t.depsTail, r = n;
  for (; r; ) {
    const i = r.prevDep;
    r.version === -1 ? (r === n && (n = i), dl(r), mp(r)) : e = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = i;
  }
  t.deps = e, t.depsTail = n;
}
function go(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (pp(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function pp(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === pi) || (t.globalVersion = pi, !t.isSSR && t.flags & 128 && (!t.deps && !t._dirty || !go(t))))
    return;
  t.flags |= 2;
  const e = t.dep, n = V, r = qe;
  V = t, qe = !0;
  try {
    gu(t);
    const i = t.fn(t._value);
    (e.version === 0 || xe(i, t._value)) && (t.flags |= 128, t._value = i, e.version++);
  } catch (i) {
    throw e.version++, i;
  } finally {
    V = n, qe = r, yu(t), t.flags &= -3;
  }
}
function dl(t, e = !1) {
  const { dep: n, prevSub: r, nextSub: i } = t;
  if (r && (r.nextSub = i, t.prevSub = void 0), i && (i.prevSub = r, t.nextSub = void 0), n.subs === t && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      dl(s, !0);
  }
  !e && !--n.sc && n.map && n.map.delete(n.key);
}
function mp(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
let qe = !0;
const bu = [];
function ms() {
  bu.push(qe), qe = !1;
}
function gs() {
  const t = bu.pop();
  qe = t === void 0 ? !0 : t;
}
function wa(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const n = V;
    V = void 0;
    try {
      e();
    } finally {
      V = n;
    }
  }
}
let pi = 0, gp = class {
  constructor(e, n) {
    this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
};
class fl {
  // TODO isolatedDeclarations "__v_skip"
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!V || !qe || V === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== V)
      n = this.activeLink = new gp(V, this), V.deps ? (n.prevDep = V.depsTail, V.depsTail.nextDep = n, V.depsTail = n) : V.deps = V.depsTail = n, wu(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = V.depsTail, n.nextDep = void 0, V.depsTail.nextDep = n, V.depsTail = n, V.deps === n && (V.deps = r);
    }
    return n;
  }
  trigger(e) {
    this.version++, pi++, this.notify(e);
  }
  notify(e) {
    cl();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      ul();
    }
  }
}
function wu(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let r = e.deps; r; r = r.nextDep)
        wu(r);
    }
    const n = t.dep.subs;
    n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
  }
}
const yo = /* @__PURE__ */ new WeakMap(), cn = Symbol(
  ""
), bo = Symbol(
  ""
), yr = Symbol(
  ""
);
function Se(t, e, n) {
  if (qe && V) {
    let r = yo.get(t);
    r || yo.set(t, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || (r.set(n, i = new fl()), i.map = r, i.key = n), i.track();
  }
}
function Lt(t, e, n, r, i, s) {
  const o = yo.get(t);
  if (!o) {
    pi++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (cl(), e === "clear")
    o.forEach(l);
  else {
    const a = F(t), c = a && ll(n);
    if (a && n === "length") {
      const u = Number(r);
      o.forEach((d, f) => {
        (f === "length" || f === yr || !Dr(f) && f >= u) && l(d);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), c && l(o.get(yr)), e) {
        case "add":
          a ? c && l(o.get("length")) : (l(o.get(cn)), rr(t) && l(o.get(bo)));
          break;
        case "delete":
          a || (l(o.get(cn)), rr(t) && l(o.get(bo)));
          break;
        case "set":
          rr(t) && l(o.get(cn));
          break;
      }
  }
  ul();
}
function kn(t) {
  const e = z(t);
  return e === t ? e : (Se(e, "iterate", yr), Fe(t) ? e : e.map(ae));
}
function ys(t) {
  return Se(t = z(t), "iterate", yr), t;
}
const yp = {
  __proto__: null,
  [Symbol.iterator]() {
    return $s(this, Symbol.iterator, ae);
  },
  concat(...t) {
    return kn(this).concat(
      ...t.map((e) => F(e) ? kn(e) : e)
    );
  },
  entries() {
    return $s(this, "entries", (t) => (t[1] = ae(t[1]), t));
  },
  every(t, e) {
    return ut(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return ut(this, "filter", t, e, (n) => n.map(ae), arguments);
  },
  find(t, e) {
    return ut(this, "find", t, e, ae, arguments);
  },
  findIndex(t, e) {
    return ut(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return ut(this, "findLast", t, e, ae, arguments);
  },
  findLastIndex(t, e) {
    return ut(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return ut(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return _s(this, "includes", t);
  },
  indexOf(...t) {
    return _s(this, "indexOf", t);
  },
  join(t) {
    return kn(this).join(t);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...t) {
    return _s(this, "lastIndexOf", t);
  },
  map(t, e) {
    return ut(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return qn(this, "pop");
  },
  push(...t) {
    return qn(this, "push", t);
  },
  reduce(t, ...e) {
    return ka(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return ka(this, "reduceRight", t, e);
  },
  shift() {
    return qn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return ut(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return qn(this, "splice", t);
  },
  toReversed() {
    return kn(this).toReversed();
  },
  toSorted(t) {
    return kn(this).toSorted(t);
  },
  toSpliced(...t) {
    return kn(this).toSpliced(...t);
  },
  unshift(...t) {
    return qn(this, "unshift", t);
  },
  values() {
    return $s(this, "values", ae);
  }
};
function $s(t, e, n) {
  const r = ys(t), i = r[e]();
  return r !== t && !Fe(t) && (i._next = i.next, i.next = () => {
    const s = i._next();
    return s.done || (s.value = n(s.value)), s;
  }), i;
}
const bp = Array.prototype;
function ut(t, e, n, r, i, s) {
  const o = ys(t), l = o !== t && !Fe(t), a = o[e];
  if (a !== bp[e]) {
    const d = a.apply(t, s);
    return l ? ae(d) : d;
  }
  let c = n;
  o !== t && (l ? c = function(d, f) {
    return n.call(this, ae(d), f, t);
  } : n.length > 2 && (c = function(d, f) {
    return n.call(this, d, f, t);
  }));
  const u = a.call(o, c, r);
  return l && i ? i(u) : u;
}
function ka(t, e, n, r) {
  const i = ys(t);
  let s = n;
  return i !== t && (Fe(t) ? n.length > 3 && (s = function(o, l, a) {
    return n.call(this, o, l, a, t);
  }) : s = function(o, l, a) {
    return n.call(this, o, ae(l), a, t);
  }), i[e](s, ...r);
}
function _s(t, e, n) {
  const r = z(t);
  Se(r, "iterate", yr);
  const i = r[e](...n);
  return (i === -1 || i === !1) && hl(n[0]) ? (n[0] = z(n[0]), r[e](...n)) : i;
}
function qn(t, e, n = []) {
  ms(), cl();
  const r = z(t)[e].apply(t, n);
  return ul(), gs(), r;
}
const wp = /* @__PURE__ */ Gh("__proto__,__v_isRef,__isVue"), ku = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Dr)
);
function kp(t) {
  Dr(t) || (t = String(t));
  const e = z(this);
  return Se(e, "has", t), e.hasOwnProperty(t);
}
class xu {
  constructor(e = !1, n = !1) {
    this._isReadonly = e, this._isShallow = n;
  }
  get(e, n, r) {
    if (n === "__v_skip") return e.__v_skip;
    const i = this._isReadonly, s = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return s;
    if (n === "__v_raw")
      return r === (i ? s ? Np : Cu : s ? Op : vu).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const o = F(e);
    if (!i) {
      let a;
      if (o && (a = yp[n]))
        return a;
      if (n === "hasOwnProperty")
        return kp;
    }
    const l = Reflect.get(
      e,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Ne(e) ? e : r
    );
    if ((Dr(n) ? ku.has(n) : wp(n)) || (i || Se(e, "get", n), s))
      return l;
    if (Ne(l)) {
      const a = o && ll(n) ? l : l.value;
      return i && Me(a) ? ko(a) : a;
    }
    return Me(l) ? i ? ko(l) : Mu(l) : l;
  }
}
class xp extends xu {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, r, i) {
    let s = e[n];
    if (!this._isShallow) {
      const a = Jt(s);
      if (!Fe(r) && !Jt(r) && (s = z(s), r = z(r)), !F(e) && Ne(s) && !Ne(r))
        return a || (s.value = r), !0;
    }
    const o = F(e) && ll(n) ? Number(n) < e.length : hi(e, n), l = Reflect.set(
      e,
      n,
      r,
      Ne(e) ? e : i
    );
    return e === z(i) && (o ? xe(r, s) && Lt(e, "set", n, r) : Lt(e, "add", n, r)), l;
  }
  deleteProperty(e, n) {
    const r = hi(e, n);
    e[n];
    const i = Reflect.deleteProperty(e, n);
    return i && r && Lt(e, "delete", n, void 0), i;
  }
  has(e, n) {
    const r = Reflect.has(e, n);
    return (!Dr(n) || !ku.has(n)) && Se(e, "has", n), r;
  }
  ownKeys(e) {
    return Se(
      e,
      "iterate",
      F(e) ? "length" : cn
    ), Reflect.ownKeys(e);
  }
}
class Sp extends xu {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, n) {
    return !0;
  }
  deleteProperty(e, n) {
    return !0;
  }
}
const vp = /* @__PURE__ */ new xp(), Cp = /* @__PURE__ */ new Sp(), wo = (t) => t, Fr = (t) => Reflect.getPrototypeOf(t);
function Mp(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, s = z(i), o = rr(s), l = t === "entries" || t === Symbol.iterator && o, a = t === "keys" && o, c = i[t](...r), u = n ? wo : e ? mi : ae;
    return !e && Se(
      s,
      "iterate",
      a ? bo : cn
    ), {
      // iterator protocol
      next() {
        const { value: d, done: f } = c.next();
        return f ? { value: d, done: f } : {
          value: l ? [u(d[0]), u(d[1])] : u(d),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Hr(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function Tp(t, e) {
  const n = {
    get(i) {
      const s = this.__v_raw, o = z(s), l = z(i);
      t || (xe(i, l) && Se(o, "get", i), Se(o, "get", l));
      const { has: a } = Fr(o), c = e ? wo : t ? mi : ae;
      if (a.call(o, i))
        return c(s.get(i));
      if (a.call(o, l))
        return c(s.get(l));
      s !== o && s.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !t && Se(z(i), "iterate", cn), i.size;
    },
    has(i) {
      const s = this.__v_raw, o = z(s), l = z(i);
      return t || (xe(i, l) && Se(o, "has", i), Se(o, "has", l)), i === l ? s.has(i) : s.has(i) || s.has(l);
    },
    forEach(i, s) {
      const o = this, l = o.__v_raw, a = z(l), c = e ? wo : t ? mi : ae;
      return !t && Se(a, "iterate", cn), l.forEach((u, d) => i.call(s, c(u), c(d), o));
    }
  };
  return Xe(
    n,
    t ? {
      add: Hr("add"),
      set: Hr("set"),
      delete: Hr("delete"),
      clear: Hr("clear")
    } : {
      add(i) {
        !e && !Fe(i) && !Jt(i) && (i = z(i));
        const s = z(this);
        return Fr(s).has.call(s, i) || (s.add(i), Lt(s, "add", i, i)), this;
      },
      set(i, s) {
        !e && !Fe(s) && !Jt(s) && (s = z(s));
        const o = z(this), { has: l, get: a } = Fr(o);
        let c = l.call(o, i);
        c || (i = z(i), c = l.call(o, i));
        const u = a.call(o, i);
        return o.set(i, s), c ? xe(s, u) && Lt(o, "set", i, s) : Lt(o, "add", i, s), this;
      },
      delete(i) {
        const s = z(this), { has: o, get: l } = Fr(s);
        let a = o.call(s, i);
        a || (i = z(i), a = o.call(s, i)), l && l.call(s, i);
        const c = s.delete(i);
        return a && Lt(s, "delete", i, void 0), c;
      },
      clear() {
        const i = z(this), s = i.size !== 0, o = i.clear();
        return s && Lt(
          i,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    n[i] = Mp(i, t, e);
  }), n;
}
function Su(t, e) {
  const n = Tp(t, e);
  return (r, i, s) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(
    hi(n, i) && i in r ? n : r,
    i,
    s
  );
}
const Ep = {
  get: /* @__PURE__ */ Su(!1, !1)
}, Ap = {
  get: /* @__PURE__ */ Su(!0, !1)
}, vu = /* @__PURE__ */ new WeakMap(), Op = /* @__PURE__ */ new WeakMap(), Cu = /* @__PURE__ */ new WeakMap(), Np = /* @__PURE__ */ new WeakMap();
function Ip(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Rp(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Ip(np(t));
}
function Mu(t) {
  return Jt(t) ? t : Tu(
    t,
    !1,
    vp,
    Ep,
    vu
  );
}
function ko(t) {
  return Tu(
    t,
    !0,
    Cp,
    Ap,
    Cu
  );
}
function Tu(t, e, n, r, i) {
  if (!Me(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = Rp(t);
  if (s === 0)
    return t;
  const o = i.get(t);
  if (o)
    return o;
  const l = new Proxy(
    t,
    s === 2 ? r : n
  );
  return i.set(t, l), l;
}
function Nn(t) {
  return Jt(t) ? Nn(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Jt(t) {
  return !!(t && t.__v_isReadonly);
}
function Fe(t) {
  return !!(t && t.__v_isShallow);
}
function hl(t) {
  return t ? !!t.__v_raw : !1;
}
function z(t) {
  const e = t && t.__v_raw;
  return e ? z(e) : t;
}
function Eu(t) {
  return !hi(t, "__v_skip") && Object.isExtensible(t) && lp(t, "__v_skip", !0), t;
}
const ae = (t) => Me(t) ? Mu(t) : t, mi = (t) => Me(t) ? ko(t) : t;
function Ne(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function pl(t) {
  return Au(t, !1);
}
function Dp(t) {
  return Au(t, !0);
}
function Au(t, e) {
  return Ne(t) ? t : new Pp(t, e);
}
class Pp {
  constructor(e, n) {
    this.dep = new fl(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? e : z(e), this._value = n ? e : ae(e), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const n = this._rawValue, r = this.__v_isShallow || Fe(e) || Jt(e);
    e = r ? e : z(e), xe(e, n) && (this._rawValue = e, this._value = r ? e : ae(e), this.dep.trigger());
  }
}
function re(t) {
  return Ne(t) ? t.value : t;
}
const Lp = {
  get: (t, e, n) => e === "__v_raw" ? t : re(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return Ne(i) && !Ne(n) ? (i.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Bp(t) {
  return Nn(t) ? t : new Proxy(t, Lp);
}
class zp {
  constructor(e) {
    this.__v_isRef = !0, this._value = void 0;
    const n = this.dep = new fl(), { get: r, set: i } = e(n.track.bind(n), n.trigger.bind(n));
    this._get = r, this._set = i;
  }
  get value() {
    return this._value = this._get();
  }
  set value(e) {
    this._set(e);
  }
}
function Ou(t) {
  return new zp(t);
}
const Vr = {}, gi = /* @__PURE__ */ new WeakMap();
let nn;
function $p(t, e = !1, n = nn) {
  if (n) {
    let r = gi.get(n);
    r || gi.set(n, r = []), r.push(t);
  }
}
function _p(t, e, n = $t) {
  const { immediate: r, deep: i, once: s, scheduler: o, augmentJob: l, call: a } = n, c = (w) => i ? w : Fe(w) || i === !1 || i === 0 ? wt(w, 1) : wt(w);
  let u, d, f, h, p = !1, m = !1;
  if (Ne(t) ? (d = () => t.value, p = Fe(t)) : Nn(t) ? (d = () => c(t), p = !0) : F(t) ? (m = !0, p = t.some((w) => Nn(w) || Fe(w)), d = () => t.map((w) => {
    if (Ne(w))
      return w.value;
    if (Nn(w))
      return c(w);
    if (he(w))
      return a ? a(w, 2) : w();
  })) : he(t) ? e ? d = a ? () => a(t, 2) : t : d = () => {
    if (f) {
      ms();
      try {
        f();
      } finally {
        gs();
      }
    }
    const w = nn;
    nn = u;
    try {
      return a ? a(t, 3, [h]) : t(h);
    } finally {
      nn = w;
    }
  } : d = ii, e && i) {
    const w = d, C = i === !0 ? 1 / 0 : i;
    d = () => wt(w(), C);
  }
  const g = () => {
    u.stop();
  };
  if (s && e) {
    const w = e;
    e = (...C) => {
      w(...C), g();
    };
  }
  let y = m ? new Array(t.length).fill(Vr) : Vr;
  const b = (w) => {
    if (!(!(u.flags & 1) || !u.dirty && !w))
      if (e) {
        const C = u.run();
        if (i || p || (m ? C.some((k, T) => xe(k, y[T])) : xe(C, y))) {
          f && f();
          const k = nn;
          nn = u;
          try {
            const T = [
              C,
              // pass undefined as the old value when it's changed for the first time
              y === Vr ? void 0 : m && y[0] === Vr ? [] : y,
              h
            ];
            y = C, a ? a(e, 3, T) : (
              // @ts-expect-error
              e(...T)
            );
          } finally {
            nn = k;
          }
        }
      } else
        u.run();
  };
  return l && l(b), u = new fp(d), u.scheduler = o ? () => o(b, !1) : b, h = (w) => $p(w, !1, u), f = u.onStop = () => {
    const w = gi.get(u);
    if (w) {
      if (a)
        a(w, 4);
      else
        for (const C of w) C();
      gi.delete(u);
    }
  }, e ? r ? b(!0) : y = u.run() : o ? o(b.bind(null, !0), !0) : u.run(), g.pause = u.pause.bind(u), g.resume = u.resume.bind(u), g.stop = g, g;
}
function wt(t, e = 1 / 0, n) {
  if (e <= 0 || !Me(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(t) || 0) >= e))
    return t;
  if (n.set(t, e), e--, Ne(t))
    wt(t.value, e, n);
  else if (F(t))
    for (let r = 0; r < t.length; r++)
      wt(t[r], e, n);
  else if (Zh(t) || rr(t))
    t.forEach((r) => {
      wt(r, e, n);
    });
  else if (rp(t)) {
    for (const r in t)
      wt(t[r], e, n);
    for (const r of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, r) && wt(t[r], e, n);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.24
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ml(t, e, n, r) {
  try {
    return r ? t(...r) : t();
  } catch (i) {
    Nu(i, e, n);
  }
}
function gl(t, e, n, r) {
  if (he(t)) {
    const i = ml(t, e, n, r);
    return i && ep(i) && i.catch((s) => {
      Nu(s, e, n);
    }), i;
  }
  if (F(t)) {
    const i = [];
    for (let s = 0; s < t.length; s++)
      i.push(gl(t[s], e, n, r));
    return i;
  }
}
function Nu(t, e, n, r = !0) {
  const i = e ? e.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: o } = e && e.appContext.config || $t;
  if (e) {
    let l = e.parent;
    const a = e.proxy, c = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let d = 0; d < u.length; d++)
          if (u[d](t, a, c) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      ms(), ml(s, null, 10, [
        t,
        a,
        c
      ]), gs();
      return;
    }
  }
  Fp(t, n, i, r, o);
}
function Fp(t, e, n, r = !0, i = !1) {
  if (i)
    throw t;
  console.error(t);
}
const ze = [];
let pt = -1;
const In = [];
let Nt = null, Cn = 0;
const Iu = /* @__PURE__ */ Promise.resolve();
let yi = null;
function yl(t) {
  const e = yi || Iu;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Hp(t) {
  let e = pt + 1, n = ze.length;
  for (; e < n; ) {
    const r = e + n >>> 1, i = ze[r], s = br(i);
    s < t || s === t && i.flags & 2 ? e = r + 1 : n = r;
  }
  return e;
}
function Ru(t) {
  if (!(t.flags & 1)) {
    const e = br(t), n = ze[ze.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= br(n) ? ze.push(t) : ze.splice(Hp(e), 0, t), t.flags |= 1, Du();
  }
}
function Du() {
  yi || (yi = Iu.then(Pu));
}
function Vp(t) {
  F(t) ? In.push(...t) : Nt && t.id === -1 ? Nt.splice(Cn + 1, 0, t) : t.flags & 1 || (In.push(t), t.flags |= 1), Du();
}
function jp(t) {
  if (In.length) {
    const e = [...new Set(In)].sort(
      (n, r) => br(n) - br(r)
    );
    if (In.length = 0, Nt) {
      Nt.push(...e);
      return;
    }
    for (Nt = e, Cn = 0; Cn < Nt.length; Cn++) {
      const n = Nt[Cn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Nt = null, Cn = 0;
  }
}
const br = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function Pu(t) {
  try {
    for (pt = 0; pt < ze.length; pt++) {
      const e = ze[pt];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), ml(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; pt < ze.length; pt++) {
      const e = ze[pt];
      e && (e.flags &= -2);
    }
    pt = -1, ze.length = 0, jp(), yi = null, (ze.length || In.length) && Pu();
  }
}
let _e = null, Lu = null;
function xa(t) {
  const e = _e;
  return _e = t, Lu = t && t.type.__scopeId || null, e;
}
function Up(t, e = _e, n) {
  if (!e || t._n)
    return t;
  const r = (...i) => {
    r._d && ki(-1);
    const s = xa(e);
    let o;
    try {
      o = t(...i);
    } finally {
      xa(s), r._d && ki(1);
    }
    return o;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Wp(t, e) {
  if (_e === null)
    return t;
  const n = Wu(_e), r = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [s, o, l, a = $t] = e[i];
    s && (he(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && wt(o), r.push({
      dir: s,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return t;
}
const Kp = (t) => t.__isTeleport;
function Bu(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, Bu(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
// @__NO_SIDE_EFFECTS__
function zu(t, e) {
  return he(t) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Xe({ name: t.name }, e, { setup: t })
  ) : t;
}
al().requestIdleCallback;
al().cancelIdleCallback;
function qp(t, e, n = Un, r = !1) {
  if (n) {
    const i = n[t] || (n[t] = []), s = e.__weh || (e.__weh = (...o) => {
      ms();
      const l = Uu(n), a = gl(e, n, t, o);
      return l(), gs(), a;
    });
    return r ? i.unshift(s) : i.push(s), s;
  }
}
const $u = (t) => (e, n = Un) => {
  (!xi || t === "sp") && qp(t, (...r) => e(...r), n);
}, _u = $u("m"), bl = $u(
  "bum"
), Jp = Symbol.for("v-ndc");
function jr(t, e, n, r) {
  let i;
  const s = n, o = F(t);
  if (o || st(t)) {
    const l = o && Nn(t);
    let a = !1, c = !1;
    l && (a = !Fe(t), c = Jt(t), t = ys(t)), i = new Array(t.length);
    for (let u = 0, d = t.length; u < d; u++)
      i[u] = e(
        a ? c ? mi(ae(t[u])) : ae(t[u]) : t[u],
        u,
        void 0,
        s
      );
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let l = 0; l < t; l++)
      i[l] = e(l + 1, l, void 0, s);
  } else if (Me(t))
    if (t[Symbol.iterator])
      i = Array.from(
        t,
        (l, a) => e(l, a, void 0, s)
      );
    else {
      const l = Object.keys(t);
      i = new Array(l.length);
      for (let a = 0, c = l.length; a < c; a++) {
        const u = l[a];
        i[a] = e(t[u], u, a, s);
      }
    }
  else
    i = [];
  return i;
}
const xo = (t) => t ? xm(t) ? Wu(t) : xo(t.parent) : null, Fs = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Xe(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => xo(t.parent),
    $root: (t) => xo(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => Yp(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      Ru(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = yl.bind(t.proxy)),
    $watch: (t) => cm.bind(t)
  })
);
function bi(t) {
  return F(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
function Gp(t, e) {
  return !t || !e ? t || e : F(t) && F(e) ? t.concat(e) : Xe({}, bi(t), bi(e));
}
function Yp(t) {
  const e = t.type, { mixins: n, extends: r } = e, {
    mixins: i,
    optionsCache: s,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = s.get(e);
  let a;
  return l ? a = l : !i.length && !n && !r ? a = e : (a = {}, i.length && i.forEach(
    (c) => wi(a, c, o, !0)
  ), wi(a, e, o)), Me(e) && s.set(e, a), a;
}
function wi(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && wi(t, s, n, !0), i && i.forEach(
    (o) => wi(t, o, n, !0)
  );
  for (const o in e)
    if (!(r && o === "expose")) {
      const l = Xp[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const Xp = {
  data: Sa,
  props: Ca,
  emits: Ca,
  // objects
  methods: Xn,
  computed: Xn,
  // lifecycle
  beforeCreate: me,
  created: me,
  beforeMount: me,
  mounted: me,
  beforeUpdate: me,
  updated: me,
  beforeDestroy: me,
  beforeUnmount: me,
  destroyed: me,
  unmounted: me,
  activated: me,
  deactivated: me,
  errorCaptured: me,
  serverPrefetch: me,
  // assets
  components: Xn,
  directives: Xn,
  // watch
  watch: Zp,
  // provide / inject
  provide: Sa,
  inject: Qp
};
function Sa(t, e) {
  return e ? t ? function() {
    return Xe(
      he(t) ? t.call(this, this) : t,
      he(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function Qp(t, e) {
  return Xn(va(t), va(e));
}
function va(t) {
  if (F(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function me(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Xn(t, e) {
  return t ? Xe(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function Ca(t, e) {
  return t ? F(t) && F(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : Xe(
    /* @__PURE__ */ Object.create(null),
    bi(t),
    bi(e ?? {})
  ) : e;
}
function Zp(t, e) {
  if (!t) return e;
  if (!e) return t;
  const n = Xe(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = me(t[r], e[r]);
  return n;
}
let em = null;
function tm(t, e, n = !1) {
  const r = kl();
  if (r || em) {
    let i = r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return n && he(e) ? e.call(r && r.proxy) : e;
  }
}
const nm = {}, Fu = (t) => Object.getPrototypeOf(t) === nm, rm = pm, im = Symbol.for("v-scx"), sm = () => tm(im);
function om(t, e) {
  return bs(t, null, e);
}
function lm(t, e) {
  return bs(
    t,
    null,
    { flush: "sync" }
  );
}
function am(t, e, n) {
  return bs(t, e, n);
}
function bs(t, e, n = $t) {
  const { immediate: r, deep: i, flush: s, once: o } = n, l = Xe({}, n), a = e && r || !e && s !== "post";
  let c;
  if (xi) {
    if (s === "sync") {
      const h = sm();
      c = h.__watcherHandles || (h.__watcherHandles = []);
    } else if (!a) {
      const h = () => {
      };
      return h.stop = ii, h.resume = ii, h.pause = ii, h;
    }
  }
  const u = Un;
  l.call = (h, p, m) => gl(h, u, p, m);
  let d = !1;
  s === "post" ? l.scheduler = (h) => {
    rm(h, u && u.suspense);
  } : s !== "sync" && (d = !0, l.scheduler = (h, p) => {
    p ? h() : Ru(h);
  }), l.augmentJob = (h) => {
    e && (h.flags |= 4), d && (h.flags |= 2, u && (h.id = u.uid, h.i = u));
  };
  const f = _p(t, e, l);
  return xi && (c ? c.push(f) : a && f()), f;
}
function cm(t, e, n) {
  const r = this.proxy, i = st(t) ? t.includes(".") ? um(r, t) : () => r[t] : t.bind(r, r);
  let s;
  he(e) ? s = e : (s = e.handler, n = e);
  const o = Uu(this), l = bs(i, s.bind(r), n);
  return o(), l;
}
function um(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++)
      r = r[n[i]];
    return r;
  };
}
function dm(t, e, n = $t) {
  const r = kl(), i = fu(e), s = hu(e), o = fm(t, i), l = Ou((a, c) => {
    let u, d = $t, f;
    return lm(() => {
      const h = t[i];
      xe(u, h) && (u = h, c());
    }), {
      get() {
        return a(), n.get ? n.get(u) : u;
      },
      set(h) {
        const p = n.set ? n.set(h) : h;
        if (!xe(p, u) && !(d !== $t && xe(h, d)))
          return;
        const m = r.vnode.props;
        m && // check if parent has passed v-model
        (e in m || i in m || s in m) && (`onUpdate:${e}` in m || `onUpdate:${i}` in m || `onUpdate:${s}` in m) || (u = h, c()), r.emit(`update:${e}`, p), xe(h, p) && xe(h, d) && !xe(p, f) && c(), d = h, f = p;
      }
    };
  });
  return l[Symbol.iterator] = () => {
    let a = 0;
    return {
      next() {
        return a < 2 ? { value: a++ ? o || $t : l, done: !1 } : { done: !0 };
      }
    };
  }, l;
}
const fm = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${fu(e)}Modifiers`] || t[`${hu(e)}Modifiers`], hm = (t) => t.__isSuspense;
function pm(t, e) {
  e && e.pendingBranch ? F(t) ? e.effects.push(...t) : e.effects.push(t) : Vp(t);
}
const It = Symbol.for("v-fgt"), mm = Symbol.for("v-txt"), So = Symbol.for("v-cmt"), si = [];
let Oe = null;
function Ee(t = !1) {
  si.push(Oe = t ? null : []);
}
function gm() {
  si.pop(), Oe = si[si.length - 1] || null;
}
let wr = 1;
function ki(t, e = !1) {
  wr += t, t < 0 && Oe && e && (Oe.hasOnce = !0);
}
function Hu(t) {
  return t.dynamicChildren = wr > 0 ? Oe || Yh : null, gm(), wr > 0 && Oe && Oe.push(t), t;
}
function Ue(t, e, n, r, i, s) {
  return Hu(
    Qe(
      t,
      e,
      n,
      r,
      i,
      s,
      !0
    )
  );
}
function Vu(t, e, n, r, i) {
  return Hu(
    _t(
      t,
      e,
      n,
      r,
      i,
      !0
    )
  );
}
function vo(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
const ju = ({ key: t }) => t ?? null, oi = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? st(t) || Ne(t) || he(t) ? { i: _e, r: t, k: e, f: !!n } : t : null);
function Qe(t, e = null, n = null, r = 0, i = null, s = t === It ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && ju(e),
    ref: e && oi(e),
    scopeId: Lu,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: _e
  };
  return l ? (wl(a, n), s & 128 && t.normalize(a)) : n && (a.shapeFlag |= st(n) ? 8 : 16), wr > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Oe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Oe.push(a), a;
}
const _t = ym;
function ym(t, e = null, n = null, r = 0, i = null, s = !1) {
  if ((!t || t === Jp) && (t = So), vo(t)) {
    const l = Co(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && wl(l, n), wr > 0 && !s && Oe && (l.shapeFlag & 6 ? Oe[Oe.indexOf(t)] = l : Oe.push(l)), l.patchFlag = -2, l;
  }
  if (Sm(t) && (t = t.__vccOpts), e) {
    e = bm(e);
    let { class: l, style: a } = e;
    l && !st(l) && (e.class = sn(l)), Me(a) && (hl(a) && !F(a) && (a = Xe({}, a)), e.style = gr(a));
  }
  const o = st(t) ? 1 : hm(t) ? 128 : Kp(t) ? 64 : Me(t) ? 4 : he(t) ? 2 : 0;
  return Qe(
    t,
    e,
    n,
    r,
    i,
    o,
    s,
    !0
  );
}
function bm(t) {
  return t ? hl(t) || Fu(t) ? Xe({}, t) : t : null;
}
function Co(t, e, n = !1, r = !1) {
  const { props: i, ref: s, patchFlag: o, children: l, transition: a } = t, c = e ? km(i || {}, e) : i, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: c,
    key: c && ju(c),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? F(s) ? s.concat(oi(e)) : [s, oi(e)] : oi(e)
    ) : s,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: l,
    target: t.target,
    targetStart: t.targetStart,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== It ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && Co(t.ssContent),
    ssFallback: t.ssFallback && Co(t.ssFallback),
    placeholder: t.placeholder,
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return a && r && Bu(
    u,
    a.clone(u)
  ), u;
}
function wm(t = " ", e = 0) {
  return _t(mm, null, t, e);
}
function Ma(t = "", e = !1) {
  return e ? (Ee(), Vu(So, null, t)) : _t(So, null, t);
}
function wl(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (F(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), wl(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !Fu(e) ? e._ctx = _e : i === 3 && _e && (_e.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else he(e) ? (e = { default: e, _ctx: _e }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [wm(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function km(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = sn([e.class, r.class]));
      else if (i === "style")
        e.style = gr([e.style, r.style]);
      else if (Xh(i)) {
        const s = e[i], o = r[i];
        o && s !== o && !(F(s) && s.includes(o)) && (e[i] = s ? [].concat(s, o) : o);
      } else i !== "" && (e[i] = r[i]);
  }
  return e;
}
let Un = null;
const kl = () => Un || _e;
let Mo;
{
  const t = al(), e = (n, r) => {
    let i;
    return (i = t[n]) || (i = t[n] = []), i.push(r), (s) => {
      i.length > 1 ? i.forEach((o) => o(s)) : i[0](s);
    };
  };
  Mo = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Un = n
  ), e(
    "__VUE_SSR_SETTERS__",
    (n) => xi = n
  );
}
const Uu = (t) => {
  const e = Un;
  return Mo(t), t.scope.on(), () => {
    t.scope.off(), Mo(e);
  };
};
function xm(t) {
  return t.vnode.shapeFlag & 4;
}
let xi = !1;
function Wu(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(Bp(Eu(t.exposed)), {
    get(e, n) {
      if (n in e)
        return e[n];
      if (n in Fs)
        return Fs[n](t);
    },
    has(e, n) {
      return n in e || n in Fs;
    }
  })) : t.proxy;
}
function Sm(t) {
  return he(t) && "__vccOpts" in t;
}
function Ku(t, e, n) {
  try {
    ki(-1);
    const r = arguments.length;
    return r === 2 ? Me(e) && !F(e) ? vo(e) ? _t(t, null, [e]) : _t(t, e) : _t(t, null, e) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && vo(n) && (n = [n]), _t(t, e, n));
  } finally {
    ki(1);
  }
}
/**
* @vue/runtime-dom v3.5.24
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let vm;
const Ta = typeof window < "u" && window.trustedTypes;
if (Ta)
  try {
    vm = /* @__PURE__ */ Ta.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
function Jn(t, e, n, r) {
  t.addEventListener(e, n, r);
}
const Ea = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return F(e) ? (n) => op(e, n) : e;
};
function Cm(t) {
  t.target.composing = !0;
}
function Aa(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const Hs = Symbol("_assign");
function Oa(t, e, n) {
  return e && (t = t.trim()), n && (t = pu(t)), t;
}
const Mm = {
  created(t, { modifiers: { lazy: e, trim: n, number: r } }, i) {
    t[Hs] = Ea(i);
    const s = r || i.props && i.props.type === "number";
    Jn(t, e ? "change" : "input", (o) => {
      o.target.composing || t[Hs](Oa(t.value, n, s));
    }), (n || s) && Jn(t, "change", () => {
      t.value = Oa(t.value, n, s);
    }), e || (Jn(t, "compositionstart", Cm), Jn(t, "compositionend", Aa), Jn(t, "change", Aa));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, oldValue: n, modifiers: { lazy: r, trim: i, number: s } }, o) {
    if (t[Hs] = Ea(o), t.composing) return;
    const l = (s || t.type === "number") && !/^0\d/.test(t.value) ? pu(t.value) : t.value, a = e ?? "";
    l !== a && (document.activeElement === t && t.type !== "range" && (r && e === n || i && t.value.trim() === a) || (t.value = a));
  }
};
function le(t) {
  this.content = t;
}
le.prototype = {
  constructor: le,
  find: function(t) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === t) return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(t) {
    var e = this.find(t);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(t, e, n) {
    var r = n && n != t ? this.remove(n) : this, i = r.find(t), s = r.content.slice();
    return i == -1 ? s.push(n || t, e) : (s[i + 1] = e, n && (s[i] = n)), new le(s);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(t) {
    var e = this.find(t);
    if (e == -1) return this;
    var n = this.content.slice();
    return n.splice(e, 2), new le(n);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(t, e) {
    return new le([t, e].concat(this.remove(t).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(t, e) {
    var n = this.remove(t).content.slice();
    return n.push(t, e), new le(n);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(t, e, n) {
    var r = this.remove(e), i = r.content.slice(), s = r.find(t);
    return i.splice(s == -1 ? i.length : s, 0, e, n), new le(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(t) {
    for (var e = 0; e < this.content.length; e += 2)
      t(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(t) {
    return t = le.from(t), t.size ? new le(t.content.concat(this.subtract(t).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(t) {
    return t = le.from(t), t.size ? new le(this.subtract(t).content.concat(t.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(t) {
    var e = this;
    t = le.from(t);
    for (var n = 0; n < t.content.length; n += 2)
      e = e.remove(t.content[n]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var t = {};
    return this.forEach(function(e, n) {
      t[e] = n;
    }), t;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
le.from = function(t) {
  if (t instanceof le) return t;
  var e = [];
  if (t) for (var n in t) e.push(n, t[n]);
  return new le(e);
};
function qu(t, e, n) {
  for (let r = 0; ; r++) {
    if (r == t.childCount || r == e.childCount)
      return t.childCount == e.childCount ? null : n;
    let i = t.child(r), s = e.child(r);
    if (i == s) {
      n += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(s))
      return n;
    if (i.isText && i.text != s.text) {
      for (let o = 0; i.text[o] == s.text[o]; o++)
        n++;
      return n;
    }
    if (i.content.size || s.content.size) {
      let o = qu(i.content, s.content, n + 1);
      if (o != null)
        return o;
    }
    n += i.nodeSize;
  }
}
function Ju(t, e, n, r) {
  for (let i = t.childCount, s = e.childCount; ; ) {
    if (i == 0 || s == 0)
      return i == s ? null : { a: n, b: r };
    let o = t.child(--i), l = e.child(--s), a = o.nodeSize;
    if (o == l) {
      n -= a, r -= a;
      continue;
    }
    if (!o.sameMarkup(l))
      return { a: n, b: r };
    if (o.isText && o.text != l.text) {
      let c = 0, u = Math.min(o.text.length, l.text.length);
      for (; c < u && o.text[o.text.length - c - 1] == l.text[l.text.length - c - 1]; )
        c++, n--, r--;
      return { a: n, b: r };
    }
    if (o.content.size || l.content.size) {
      let c = Ju(o.content, l.content, n - 1, r - 1);
      if (c)
        return c;
    }
    n -= a, r -= a;
  }
}
class x {
  /**
  @internal
  */
  constructor(e, n) {
    if (this.content = e, this.size = n || 0, n == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, n, r, i = 0, s) {
    for (let o = 0, l = 0; l < n; o++) {
      let a = this.content[o], c = l + a.nodeSize;
      if (c > e && r(a, i + l, s || null, o) !== !1 && a.content.size) {
        let u = l + 1;
        a.nodesBetween(Math.max(0, e - u), Math.min(a.content.size, n - u), r, i + u);
      }
      l = c;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, n, r, i) {
    let s = "", o = !0;
    return this.nodesBetween(e, n, (l, a) => {
      let c = l.isText ? l.text.slice(Math.max(e, a) - a, n - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && c || l.isTextblock) && r && (o ? o = !1 : s += r), s += c;
    }, 0), s;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let n = this.lastChild, r = e.firstChild, i = this.content.slice(), s = 0;
    for (n.isText && n.sameMarkup(r) && (i[i.length - 1] = n.withText(n.text + r.text), s = 1); s < e.content.length; s++)
      i.push(e.content[s]);
    return new x(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, n = this.size) {
    if (e == 0 && n == this.size)
      return this;
    let r = [], i = 0;
    if (n > e)
      for (let s = 0, o = 0; o < n; s++) {
        let l = this.content[s], a = o + l.nodeSize;
        a > e && ((o < e || a > n) && (l.isText ? l = l.cut(Math.max(0, e - o), Math.min(l.text.length, n - o)) : l = l.cut(Math.max(0, e - o - 1), Math.min(l.content.size, n - o - 1))), r.push(l), i += l.nodeSize), o = a;
      }
    return new x(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, n) {
    return e == n ? x.empty : e == 0 && n == this.content.length ? this : new x(this.content.slice(e, n));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, n) {
    let r = this.content[e];
    if (r == n)
      return this;
    let i = this.content.slice(), s = this.size + n.nodeSize - r.nodeSize;
    return i[e] = n, new x(i, s);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new x([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new x(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let n = 0; n < this.content.length; n++)
      if (!this.content[n].eq(e.content[n]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let n = this.content[e];
    if (!n)
      throw new RangeError("Index " + e + " out of range for " + this);
    return n;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let n = 0, r = 0; n < this.content.length; n++) {
      let i = this.content[n];
      e(i, r, n), r += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, n = 0) {
    return qu(this, e, n);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, n = this.size, r = e.size) {
    return Ju(this, e, n, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return Ur(0, e);
    if (e == this.size)
      return Ur(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let n = 0, r = 0; ; n++) {
      let i = this.child(n), s = r + i.nodeSize;
      if (s >= e)
        return s == e ? Ur(n + 1, s) : Ur(n, r);
      r = s;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, n) {
    if (!n)
      return x.empty;
    if (!Array.isArray(n))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new x(n.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return x.empty;
    let n, r = 0;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      r += s.nodeSize, i && s.isText && e[i - 1].sameMarkup(s) ? (n || (n = e.slice(0, i)), n[n.length - 1] = s.withText(n[n.length - 1].text + s.text)) : n && n.push(s);
    }
    return new x(n || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return x.empty;
    if (e instanceof x)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new x([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
x.empty = new x([], 0);
const Vs = { index: 0, offset: 0 };
function Ur(t, e) {
  return Vs.index = t, Vs.offset = e, Vs;
}
function Si(t, e) {
  if (t === e)
    return !0;
  if (!(t && typeof t == "object") || !(e && typeof e == "object"))
    return !1;
  let n = Array.isArray(t);
  if (Array.isArray(e) != n)
    return !1;
  if (n) {
    if (t.length != e.length)
      return !1;
    for (let r = 0; r < t.length; r++)
      if (!Si(t[r], e[r]))
        return !1;
  } else {
    for (let r in t)
      if (!(r in e) || !Si(t[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in t))
        return !1;
  }
  return !0;
}
let $ = class To {
  /**
  @internal
  */
  constructor(e, n) {
    this.type = e, this.attrs = n;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let n, r = !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      if (this.eq(s))
        return e;
      if (this.type.excludes(s.type))
        n || (n = e.slice(0, i));
      else {
        if (s.type.excludes(this.type))
          return e;
        !r && s.type.rank > this.type.rank && (n || (n = e.slice(0, i)), n.push(this), r = !0), n && n.push(s);
      }
    }
    return n || (n = e.slice()), r || n.push(this), n;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let n = 0; n < e.length; n++)
      if (this.eq(e[n]))
        return e.slice(0, n).concat(e.slice(n + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let n = 0; n < e.length; n++)
      if (this.eq(e[n]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && Si(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let n in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, n) {
    if (!n)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[n.type];
    if (!r)
      throw new RangeError(`There is no mark type ${n.type} in this schema`);
    let i = r.create(n.attrs);
    return r.checkAttrs(i.attrs), i;
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, n) {
    if (e == n)
      return !0;
    if (e.length != n.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(n[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return To.none;
    if (e instanceof To)
      return [e];
    let n = e.slice();
    return n.sort((r, i) => r.type.rank - i.type.rank), n;
  }
};
$.none = [];
class vi extends Error {
}
class M {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, n, r) {
    this.content = e, this.openStart = n, this.openEnd = r;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, n) {
    let r = Yu(this.content, e + this.openStart, n);
    return r && new M(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, n) {
    return new M(Gu(this.content, e + this.openStart, n + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, n) {
    if (!n)
      return M.empty;
    let r = n.openStart || 0, i = n.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new M(x.fromJSON(e, n.content), r, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, n = !0) {
    let r = 0, i = 0;
    for (let s = e.firstChild; s && !s.isLeaf && (n || !s.type.spec.isolating); s = s.firstChild)
      r++;
    for (let s = e.lastChild; s && !s.isLeaf && (n || !s.type.spec.isolating); s = s.lastChild)
      i++;
    return new M(e, r, i);
  }
}
M.empty = new M(x.empty, 0, 0);
function Gu(t, e, n) {
  let { index: r, offset: i } = t.findIndex(e), s = t.maybeChild(r), { index: o, offset: l } = t.findIndex(n);
  if (i == e || s.isText) {
    if (l != n && !t.child(o).isText)
      throw new RangeError("Removing non-flat range");
    return t.cut(0, e).append(t.cut(n));
  }
  if (r != o)
    throw new RangeError("Removing non-flat range");
  return t.replaceChild(r, s.copy(Gu(s.content, e - i - 1, n - i - 1)));
}
function Yu(t, e, n, r) {
  let { index: i, offset: s } = t.findIndex(e), o = t.maybeChild(i);
  if (s == e || o.isText)
    return r && !r.canReplace(i, i, n) ? null : t.cut(0, e).append(n).append(t.cut(e));
  let l = Yu(o.content, e - s - 1, n, o);
  return l && t.replaceChild(i, o.copy(l));
}
function Tm(t, e, n) {
  if (n.openStart > t.depth)
    throw new vi("Inserted content deeper than insertion position");
  if (t.depth - n.openStart != e.depth - n.openEnd)
    throw new vi("Inconsistent open depths");
  return Xu(t, e, n, 0);
}
function Xu(t, e, n, r) {
  let i = t.index(r), s = t.node(r);
  if (i == e.index(r) && r < t.depth - n.openStart) {
    let o = Xu(t, e, n, r + 1);
    return s.copy(s.content.replaceChild(i, o));
  } else if (n.content.size)
    if (!n.openStart && !n.openEnd && t.depth == r && e.depth == r) {
      let o = t.parent, l = o.content;
      return dn(o, l.cut(0, t.parentOffset).append(n.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: o, end: l } = Em(n, t);
      return dn(s, Zu(t, o, l, e, r));
    }
  else return dn(s, Ci(t, e, r));
}
function Qu(t, e) {
  if (!e.type.compatibleContent(t.type))
    throw new vi("Cannot join " + e.type.name + " onto " + t.type.name);
}
function Eo(t, e, n) {
  let r = t.node(n);
  return Qu(r, e.node(n)), r;
}
function un(t, e) {
  let n = e.length - 1;
  n >= 0 && t.isText && t.sameMarkup(e[n]) ? e[n] = t.withText(e[n].text + t.text) : e.push(t);
}
function or(t, e, n, r) {
  let i = (e || t).node(n), s = 0, o = e ? e.index(n) : i.childCount;
  t && (s = t.index(n), t.depth > n ? s++ : t.textOffset && (un(t.nodeAfter, r), s++));
  for (let l = s; l < o; l++)
    un(i.child(l), r);
  e && e.depth == n && e.textOffset && un(e.nodeBefore, r);
}
function dn(t, e) {
  return t.type.checkContent(e), t.copy(e);
}
function Zu(t, e, n, r, i) {
  let s = t.depth > i && Eo(t, e, i + 1), o = r.depth > i && Eo(n, r, i + 1), l = [];
  return or(null, t, i, l), s && o && e.index(i) == n.index(i) ? (Qu(s, o), un(dn(s, Zu(t, e, n, r, i + 1)), l)) : (s && un(dn(s, Ci(t, e, i + 1)), l), or(e, n, i, l), o && un(dn(o, Ci(n, r, i + 1)), l)), or(r, null, i, l), new x(l);
}
function Ci(t, e, n) {
  let r = [];
  if (or(null, t, n, r), t.depth > n) {
    let i = Eo(t, e, n + 1);
    un(dn(i, Ci(t, e, n + 1)), r);
  }
  return or(e, null, n, r), new x(r);
}
function Em(t, e) {
  let n = e.depth - t.openStart, i = e.node(n).copy(t.content);
  for (let s = n - 1; s >= 0; s--)
    i = e.node(s).copy(x.from(i));
  return {
    start: i.resolveNoCache(t.openStart + n),
    end: i.resolveNoCache(i.content.size - t.openEnd - n)
  };
}
class kr {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.pos = e, this.path = n, this.parentOffset = r, this.depth = n.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, n = this.index(this.depth);
    if (n == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], i = e.child(n);
    return r ? e.child(n).cut(r) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), n = this.pos - this.path[this.path.length - 1];
    return n ? this.parent.child(e).cut(0, n) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, n) {
    n = this.resolveDepth(n);
    let r = this.path[n * 3], i = n == 0 ? 0 : this.path[n * 3 - 1] + 1;
    for (let s = 0; s < e; s++)
      i += r.child(s).nodeSize;
    return i;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, n = this.index();
    if (e.content.size == 0)
      return $.none;
    if (this.textOffset)
      return e.child(n).marks;
    let r = e.maybeChild(n - 1), i = e.maybeChild(n);
    if (!r) {
      let l = r;
      r = i, i = l;
    }
    let s = r.marks;
    for (var o = 0; o < s.length; o++)
      s[o].type.spec.inclusive === !1 && (!i || !s[o].isInSet(i.marks)) && (s = s[o--].removeFromSet(s));
    return s;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let n = this.parent.maybeChild(this.index());
    if (!n || !n.isInline)
      return null;
    let r = n.marks, i = e.parent.maybeChild(e.index());
    for (var s = 0; s < r.length; s++)
      r[s].type.spec.inclusive === !1 && (!i || !r[s].isInSet(i.marks)) && (r = r[s--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let n = this.depth; n > 0; n--)
      if (this.start(n) <= e && this.end(n) >= e)
        return n;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, n) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!n || n(this.node(r))))
        return new Mi(this, e, r);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let n = 1; n <= this.depth; n++)
      e += (e ? "/" : "") + this.node(n).type.name + "_" + this.index(n - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, n) {
    if (!(n >= 0 && n <= e.content.size))
      throw new RangeError("Position " + n + " out of range");
    let r = [], i = 0, s = n;
    for (let o = e; ; ) {
      let { index: l, offset: a } = o.content.findIndex(s), c = s - a;
      if (r.push(o, l, i + a), !c || (o = o.child(l), o.isText))
        break;
      s = c - 1, i += a + 1;
    }
    return new kr(n, r, s);
  }
  /**
  @internal
  */
  static resolveCached(e, n) {
    let r = Na.get(e);
    if (r)
      for (let s = 0; s < r.elts.length; s++) {
        let o = r.elts[s];
        if (o.pos == n)
          return o;
      }
    else
      Na.set(e, r = new Am());
    let i = r.elts[r.i] = kr.resolve(e, n);
    return r.i = (r.i + 1) % Om, i;
  }
}
class Am {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Om = 12, Na = /* @__PURE__ */ new WeakMap();
class Mi {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, n, r) {
    this.$from = e, this.$to = n, this.depth = r;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const Nm = /* @__PURE__ */ Object.create(null);
let jt = class Ao {
  /**
  @internal
  */
  constructor(e, n, r, i = $.none) {
    this.type = e, this.attrs = n, this.marks = i, this.content = r || x.empty;
  }
  /**
  The array of this node's child nodes.
  */
  get children() {
    return this.content.content;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](https://prosemirror.net/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively between
  the given two positions that are relative to start of this
  node's content. The callback is invoked with the node, its
  position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, n, r, i = 0) {
    this.content.nodesBetween(e, n, r, i, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec.leafText) will be used.
  */
  textBetween(e, n, r, i) {
    return this.content.textBetween(e, n, r, i);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, n, r) {
    return this.type == e && Si(this.attrs, n || e.defaultAttrs || Nm) && $.sameSet(this.marks, r || $.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new Ao(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new Ao(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, n = this.content.size) {
    return e == 0 && n == this.content.size ? this : this.copy(this.content.cut(e, n));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, n = this.content.size, r = !1) {
    if (e == n)
      return M.empty;
    let i = this.resolve(e), s = this.resolve(n), o = r ? 0 : i.sharedDepth(n), l = i.start(o), c = i.node(o).content.cut(i.pos - l, s.pos - l);
    return new M(c, i.depth - o, s.depth - o);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, n, r) {
    return Tm(this.resolve(e), this.resolve(n), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let n = this; ; ) {
      let { index: r, offset: i } = n.content.findIndex(e);
      if (n = n.maybeChild(r), !n)
        return null;
      if (i == e || n.isText)
        return n;
      e -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: n, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(n), index: n, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: n, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(n), index: n, offset: r };
    let i = this.content.child(n - 1);
    return { node: i, index: n - 1, offset: r - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return kr.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return kr.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, n, r) {
    let i = !1;
    return n > e && this.nodesBetween(e, n, (s) => (r.isInSet(s.marks) && (i = !0), !i)), i;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), ed(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let n = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!n)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return n;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, n, r = x.empty, i = 0, s = r.childCount) {
    let o = this.contentMatchAt(e).matchFragment(r, i, s), l = o && o.matchFragment(this.content, n);
    if (!l || !l.validEnd)
      return !1;
    for (let a = i; a < s; a++)
      if (!this.type.allowsMarks(r.child(a).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, n, r, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let s = this.contentMatchAt(e).matchType(r), o = s && s.matchFragment(this.content, n);
    return o ? o.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise an exception when they do not.
  */
  check() {
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = $.none;
    for (let n = 0; n < this.marks.length; n++) {
      let r = this.marks[n];
      r.type.checkAttrs(r.attrs), e = r.addToSet(e);
    }
    if (!$.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((n) => n.type.name)}`);
    this.content.forEach((n) => n.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let n in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((n) => n.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, n) {
    if (!n)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r;
    if (n.marks) {
      if (!Array.isArray(n.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = n.marks.map(e.markFromJSON);
    }
    if (n.type == "text") {
      if (typeof n.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(n.text, r);
    }
    let i = x.fromJSON(e, n.content), s = e.nodeType(n.type).create(n.attrs, i, r);
    return s.type.checkAttrs(s.attrs), s;
  }
};
jt.prototype.text = void 0;
class Ti extends jt {
  /**
  @internal
  */
  constructor(e, n, r, i) {
    if (super(e, n, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : ed(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, n) {
    return this.text.slice(e, n);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new Ti(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Ti(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, n = this.text.length) {
    return e == 0 && n == this.text.length ? this : this.withText(this.text.slice(e, n));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function ed(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    e = t[n].type.name + "(" + e + ")";
  return e;
}
class mn {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, n) {
    let r = new Im(e, n);
    if (r.next == null)
      return mn.empty;
    let i = td(r);
    r.next && r.err("Unexpected trailing text");
    let s = $m(zm(i));
    return _m(s, r), s;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let n = 0; n < this.next.length; n++)
      if (this.next[n].type == e)
        return this.next[n].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, n = 0, r = e.childCount) {
    let i = this;
    for (let s = n; i && s < r; s++)
      i = i.matchType(e.child(s).type);
    return i;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: n } = this.next[e];
      if (!(n.isText || n.hasRequiredAttrs()))
        return n;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let n = 0; n < this.next.length; n++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[n].type == e.next[r].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, n = !1, r = 0) {
    let i = [this];
    function s(o, l) {
      let a = o.matchFragment(e, r);
      if (a && (!n || a.validEnd))
        return x.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < o.next.length; c++) {
        let { type: u, next: d } = o.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && i.indexOf(d) == -1) {
          i.push(d);
          let f = s(d, l.concat(u));
          if (f)
            return f;
        }
      }
      return null;
    }
    return s(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e)
        return this.wrapCache[r + 1];
    let n = this.computeWrapping(e);
    return this.wrapCache.push(e, n), n;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let n = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let i = r.shift(), s = i.match;
      if (s.matchType(e)) {
        let o = [];
        for (let l = i; l.type; l = l.via)
          o.push(l.type);
        return o.reverse();
      }
      for (let o = 0; o < s.next.length; o++) {
        let { type: l, next: a } = s.next[o];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in n) && (!i.type || a.validEnd) && (r.push({ match: l.contentMatch, type: l, via: i }), n[l.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function n(r) {
      e.push(r);
      for (let i = 0; i < r.next.length; i++)
        e.indexOf(r.next[i].next) == -1 && n(r.next[i].next);
    }
    return n(this), e.map((r, i) => {
      let s = i + (r.validEnd ? "*" : " ") + " ";
      for (let o = 0; o < r.next.length; o++)
        s += (o ? ", " : "") + r.next[o].type.name + "->" + e.indexOf(r.next[o].next);
      return s;
    }).join(`
`);
  }
}
mn.empty = new mn(!0);
class Im {
  constructor(e, n) {
    this.string = e, this.nodeTypes = n, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function td(t) {
  let e = [];
  do
    e.push(Rm(t));
  while (t.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Rm(t) {
  let e = [];
  do
    e.push(Dm(t));
  while (t.next && t.next != ")" && t.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Dm(t) {
  let e = Bm(t);
  for (; ; )
    if (t.eat("+"))
      e = { type: "plus", expr: e };
    else if (t.eat("*"))
      e = { type: "star", expr: e };
    else if (t.eat("?"))
      e = { type: "opt", expr: e };
    else if (t.eat("{"))
      e = Pm(t, e);
    else
      break;
  return e;
}
function Ia(t) {
  /\D/.test(t.next) && t.err("Expected number, got '" + t.next + "'");
  let e = Number(t.next);
  return t.pos++, e;
}
function Pm(t, e) {
  let n = Ia(t), r = n;
  return t.eat(",") && (t.next != "}" ? r = Ia(t) : r = -1), t.eat("}") || t.err("Unclosed braced range"), { type: "range", min: n, max: r, expr: e };
}
function Lm(t, e) {
  let n = t.nodeTypes, r = n[e];
  if (r)
    return [r];
  let i = [];
  for (let s in n) {
    let o = n[s];
    o.isInGroup(e) && i.push(o);
  }
  return i.length == 0 && t.err("No node type or group '" + e + "' found"), i;
}
function Bm(t) {
  if (t.eat("(")) {
    let e = td(t);
    return t.eat(")") || t.err("Missing closing paren"), e;
  } else if (/\W/.test(t.next))
    t.err("Unexpected token '" + t.next + "'");
  else {
    let e = Lm(t, t.next).map((n) => (t.inline == null ? t.inline = n.isInline : t.inline != n.isInline && t.err("Mixing inline and block content"), { type: "name", value: n }));
    return t.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function zm(t) {
  let e = [[]];
  return i(s(t, 0), n()), e;
  function n() {
    return e.push([]) - 1;
  }
  function r(o, l, a) {
    let c = { term: a, to: l };
    return e[o].push(c), c;
  }
  function i(o, l) {
    o.forEach((a) => a.to = l);
  }
  function s(o, l) {
    if (o.type == "choice")
      return o.exprs.reduce((a, c) => a.concat(s(c, l)), []);
    if (o.type == "seq")
      for (let a = 0; ; a++) {
        let c = s(o.exprs[a], l);
        if (a == o.exprs.length - 1)
          return c;
        i(c, l = n());
      }
    else if (o.type == "star") {
      let a = n();
      return r(l, a), i(s(o.expr, a), a), [r(a)];
    } else if (o.type == "plus") {
      let a = n();
      return i(s(o.expr, l), a), i(s(o.expr, a), a), [r(a)];
    } else {
      if (o.type == "opt")
        return [r(l)].concat(s(o.expr, l));
      if (o.type == "range") {
        let a = l;
        for (let c = 0; c < o.min; c++) {
          let u = n();
          i(s(o.expr, a), u), a = u;
        }
        if (o.max == -1)
          i(s(o.expr, a), a);
        else
          for (let c = o.min; c < o.max; c++) {
            let u = n();
            r(a, u), i(s(o.expr, a), u), a = u;
          }
        return [r(a)];
      } else {
        if (o.type == "name")
          return [r(l, void 0, o.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function nd(t, e) {
  return e - t;
}
function Ra(t, e) {
  let n = [];
  return r(e), n.sort(nd);
  function r(i) {
    let s = t[i];
    if (s.length == 1 && !s[0].term)
      return r(s[0].to);
    n.push(i);
    for (let o = 0; o < s.length; o++) {
      let { term: l, to: a } = s[o];
      !l && n.indexOf(a) == -1 && r(a);
    }
  }
}
function $m(t) {
  let e = /* @__PURE__ */ Object.create(null);
  return n(Ra(t, 0));
  function n(r) {
    let i = [];
    r.forEach((o) => {
      t[o].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        Ra(t, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let s = e[r.join(",")] = new mn(r.indexOf(t.length - 1) > -1);
    for (let o = 0; o < i.length; o++) {
      let l = i[o][1].sort(nd);
      s.next.push({ type: i[o][0], next: e[l.join(",")] || n(l) });
    }
    return s;
  }
}
function _m(t, e) {
  for (let n = 0, r = [t]; n < r.length; n++) {
    let i = r[n], s = !i.validEnd, o = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      o.push(a.name), s && !(a.isText || a.hasRequiredAttrs()) && (s = !1), r.indexOf(c) == -1 && r.push(c);
    }
    s && e.err("Only non-generatable nodes (" + o.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function rd(t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let n in t) {
    let r = t[n];
    if (!r.hasDefault)
      return null;
    e[n] = r.default;
  }
  return e;
}
function id(t, e) {
  let n = /* @__PURE__ */ Object.create(null);
  for (let r in t) {
    let i = e && e[r];
    if (i === void 0) {
      let s = t[r];
      if (s.hasDefault)
        i = s.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    n[r] = i;
  }
  return n;
}
function sd(t, e, n, r) {
  for (let i in e)
    if (!(i in t))
      throw new RangeError(`Unsupported attribute ${i} for ${n} of type ${i}`);
  for (let i in t) {
    let s = t[i];
    s.validate && s.validate(e[i]);
  }
}
function od(t, e) {
  let n = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      n[r] = new Hm(t, r, e[r]);
  return n;
}
let Da = class ld {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.name = e, this.schema = n, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = od(e, r.attrs), this.defaultAttrs = rd(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == mn.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  Return true when this node type is part of the given
  [group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).
  */
  isInGroup(e) {
    return this.groups.indexOf(e) > -1;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : id(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, n, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new jt(this, this.computeAttrs(e), x.from(n), $.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, n, r) {
    return n = x.from(n), this.checkContent(n), new jt(this, this.computeAttrs(e), n, $.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, n, r) {
    if (e = this.computeAttrs(e), n = x.from(n), n.size) {
      let o = this.contentMatch.fillBefore(n);
      if (!o)
        return null;
      n = o.append(n);
    }
    let i = this.contentMatch.matchFragment(n), s = i && i.fillBefore(x.empty, !0);
    return s ? new jt(this, e, n.append(s), $.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let n = this.contentMatch.matchFragment(e);
    if (!n || !n.validEnd)
      return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  /**
  @internal
  */
  checkAttrs(e) {
    sd(this.attrs, e, "node", this.name);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let n = 0; n < e.length; n++)
      if (!this.allowsMarkType(e[n].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let n;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? n && n.push(e[r]) : n || (n = e.slice(0, r));
    return n ? n.length ? n : $.none : e;
  }
  /**
  @internal
  */
  static compile(e, n) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((s, o) => r[s] = new ld(s, n, o));
    let i = n.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let s in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
function Fm(t, e, n) {
  let r = n.split("|");
  return (i) => {
    let s = i === null ? "null" : typeof i;
    if (r.indexOf(s) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${t}, got ${s}`);
  };
}
class Hm {
  constructor(e, n, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Fm(e, n, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class ws {
  /**
  @internal
  */
  constructor(e, n, r, i) {
    this.name = e, this.rank = n, this.schema = r, this.spec = i, this.attrs = od(e, i.attrs), this.excluded = null;
    let s = rd(this.attrs);
    this.instance = s ? new $(this, s) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new $(this, id(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, n) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((s, o) => r[s] = new ws(s, i++, n, o)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var n = 0; n < e.length; n++)
      e[n].type == this && (e = e.slice(0, n).concat(e.slice(n + 1)), n--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let n = 0; n < e.length; n++)
      if (e[n].type == this)
        return e[n];
  }
  /**
  @internal
  */
  checkAttrs(e) {
    sd(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class ad {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let n = this.spec = {};
    for (let i in e)
      n[i] = e[i];
    n.nodes = le.from(e.nodes), n.marks = le.from(e.marks || {}), this.nodes = Da.compile(this.spec.nodes, this), this.marks = ws.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let s = this.nodes[i], o = s.spec.content || "", l = s.spec.marks;
      if (s.contentMatch = r[o] || (r[o] = mn.parse(o, this.nodes)), s.inlineContent = s.contentMatch.inlineContent, s.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!s.isInline || !s.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = s;
      }
      s.markSet = l == "_" ? null : l ? Pa(this, l.split(" ")) : l == "" || !s.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let s = this.marks[i], o = s.spec.excludes;
      s.excluded = o == null ? [s] : o == "" ? [] : Pa(this, o.split(" "));
    }
    this.nodeFromJSON = (i) => jt.fromJSON(this, i), this.markFromJSON = (i) => $.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, n = null, r, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof Da) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else throw new RangeError("Invalid node type: " + e);
    return e.createChecked(n, r, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, n) {
    let r = this.nodes.text;
    return new Ti(r, r.defaultAttrs, e, $.setFrom(n));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, n) {
    return typeof e == "string" && (e = this.marks[e]), e.create(n);
  }
  /**
  @internal
  */
  nodeType(e) {
    let n = this.nodes[e];
    if (!n)
      throw new RangeError("Unknown node type: " + e);
    return n;
  }
}
function Pa(t, e) {
  let n = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], s = t.marks[i], o = s;
    if (s)
      n.push(s);
    else
      for (let l in t.marks) {
        let a = t.marks[l];
        (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && n.push(o = a);
      }
    if (!o)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return n;
}
function Vm(t) {
  return t.tag != null;
}
function jm(t) {
  return t.style != null;
}
class Ut {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, n) {
    this.schema = e, this.rules = n, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    n.forEach((i) => {
      if (Vm(i))
        this.tags.push(i);
      else if (jm(i)) {
        let s = /[^=]*/.exec(i.style)[0];
        r.indexOf(s) < 0 && r.push(s), this.styles.push(i);
      }
    }), this.normalizeLists = !this.tags.some((i) => {
      if (!/^(ul|ol)\b/.test(i.tag) || !i.node)
        return !1;
      let s = e.nodes[i.node];
      return s.contentMatch.matchType(s);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, n = {}) {
    let r = new Ba(this, n, !1);
    return r.addAll(e, $.none, n.from, n.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, n = {}) {
    let r = new Ba(this, n, !0);
    return r.addAll(e, $.none, n.from, n.to), M.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, n, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let s = this.tags[i];
      if (Km(e, s.tag) && (s.namespace === void 0 || e.namespaceURI == s.namespace) && (!s.context || n.matchesContext(s.context))) {
        if (s.getAttrs) {
          let o = s.getAttrs(e);
          if (o === !1)
            continue;
          s.attrs = o || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, n, r, i) {
    for (let s = i ? this.styles.indexOf(i) + 1 : 0; s < this.styles.length; s++) {
      let o = this.styles[s], l = o.style;
      if (!(l.indexOf(e) != 0 || o.context && !r.matchesContext(o.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != n))) {
        if (o.getAttrs) {
          let a = o.getAttrs(n);
          if (a === !1)
            continue;
          o.attrs = a || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let n = [];
    function r(i) {
      let s = i.priority == null ? 50 : i.priority, o = 0;
      for (; o < n.length; o++) {
        let l = n[o];
        if ((l.priority == null ? 50 : l.priority) < s)
          break;
      }
      n.splice(o, 0, i);
    }
    for (let i in e.marks) {
      let s = e.marks[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = za(o)), o.mark || o.ignore || o.clearMark || (o.mark = i);
      });
    }
    for (let i in e.nodes) {
      let s = e.nodes[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = za(o)), o.node || o.ignore || o.mark || (o.node = i);
      });
    }
    return n;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.GenericParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new Ut(e, Ut.schemaRules(e)));
  }
}
const cd = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, Um = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, ud = { ol: !0, ul: !0 }, xr = 1, Oo = 2, lr = 4;
function La(t, e, n) {
  return e != null ? (e ? xr : 0) | (e === "full" ? Oo : 0) : t && t.whitespace == "pre" ? xr | Oo : n & ~lr;
}
class Wr {
  constructor(e, n, r, i, s, o) {
    this.type = e, this.attrs = n, this.marks = r, this.solid = i, this.options = o, this.content = [], this.activeMarks = $.none, this.match = s || (o & lr ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let n = this.type.contentMatch.fillBefore(x.from(e));
      if (n)
        this.match = this.type.contentMatch.matchFragment(n);
      else {
        let r = this.type.contentMatch, i;
        return (i = r.findWrapping(e.type)) ? (this.match = r, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & xr)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let s = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = s.withText(s.text.slice(0, s.text.length - i[0].length));
      }
    }
    let n = x.from(this.content);
    return !e && this.match && (n = n.append(this.match.fillBefore(x.empty, !0))), this.type ? this.type.create(this.attrs, n, this.marks) : n;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !cd.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Ba {
  constructor(e, n, r) {
    this.parser = e, this.options = n, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = n.topNode, s, o = La(null, n.preserveWhitespace, 0) | (r ? lr : 0);
    i ? s = new Wr(i.type, i.attrs, $.none, !0, n.topMatch || i.type.contentMatch, o) : r ? s = new Wr(null, null, $.none, !0, null, o) : s = new Wr(e.schema.topNodeType, null, $.none, !0, null, o), this.nodes = [s], this.find = n.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, n) {
    e.nodeType == 3 ? this.addTextNode(e, n) : e.nodeType == 1 && this.addElement(e, n);
  }
  addTextNode(e, n) {
    let r = e.nodeValue, i = this.top, s = i.options & Oo ? "full" : this.localPreserveWS || (i.options & xr) > 0, { schema: o } = this.parser;
    if (s === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (s)
        if (s === "full")
          r = r.replace(/\r\n?/g, `
`);
        else if (o.linebreakReplacement && /[\r\n]/.test(r) && this.top.findWrapping(o.linebreakReplacement.create())) {
          let l = r.split(/\r?\n|\r/);
          for (let a = 0; a < l.length; a++)
            a && this.insertNode(o.linebreakReplacement.create(), n, !0), l[a] && this.insertNode(o.text(l[a]), n, !/\S/.test(l[a]));
          r = "";
        } else
          r = r.replace(/\r?\n|\r/g, " ");
      else if (r = r.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1) {
        let l = i.content[i.content.length - 1], a = e.previousSibling;
        (!l || a && a.nodeName == "BR" || l.isText && /[ \t\r\n\u000c]$/.test(l.text)) && (r = r.slice(1));
      }
      r && this.insertNode(o.text(r), n, !/\S/.test(r)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, n, r) {
    let i = this.localPreserveWS, s = this.top;
    (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
    let o = e.nodeName.toLowerCase(), l;
    ud.hasOwnProperty(o) && this.parser.normalizeLists && Wm(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : Um.hasOwnProperty(o))
      this.findInside(e), this.ignoreFallback(e, n);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let c, u = this.needsBlock;
      if (cd.hasOwnProperty(o))
        s.content.length && s.content[0].isInline && this.open && (this.open--, s = this.top), c = !0, s.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, n);
        break e;
      }
      let d = a && a.skip ? n : this.readStyles(e, n);
      d && this.addAll(e, d), c && this.sync(s), this.needsBlock = u;
    } else {
      let c = this.readStyles(e, n);
      c && this.addElementByRule(e, a, c, a.consuming === !1 ? l : void 0);
    }
    this.localPreserveWS = i;
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, n) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), n);
  }
  // Called for ignored nodes
  ignoreFallback(e, n) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), n, !0);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, n) {
    let r = e.style;
    if (r && r.length)
      for (let i = 0; i < this.parser.matchedStyles.length; i++) {
        let s = this.parser.matchedStyles[i], o = r.getPropertyValue(s);
        if (o)
          for (let l = void 0; ; ) {
            let a = this.parser.matchStyle(s, o, this, l);
            if (!a)
              break;
            if (a.ignore)
              return null;
            if (a.clearMark ? n = n.filter((c) => !a.clearMark(c)) : n = n.concat(this.parser.schema.marks[a.mark].create(a.attrs)), a.consuming === !1)
              l = a;
            else
              break;
          }
      }
    return n;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, n, r, i) {
    let s, o;
    if (n.node)
      if (o = this.parser.schema.nodes[n.node], o.isLeaf)
        this.insertNode(o.create(n.attrs), r, e.nodeName == "BR") || this.leafFallback(e, r);
      else {
        let a = this.enter(o, n.attrs || null, r, n.preserveWhitespace);
        a && (s = !0, r = a);
      }
    else {
      let a = this.parser.schema.marks[n.mark];
      r = r.concat(a.create(n.attrs));
    }
    let l = this.top;
    if (o && o.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, r, i);
    else if (n.getContent)
      this.findInside(e), n.getContent(e, this.parser.schema).forEach((a) => this.insertNode(a, r, !1));
    else {
      let a = e;
      typeof n.contentElement == "string" ? a = e.querySelector(n.contentElement) : typeof n.contentElement == "function" ? a = n.contentElement(e) : n.contentElement && (a = n.contentElement), this.findAround(e, a, !0), this.addAll(a, r), this.findAround(e, a, !1);
    }
    s && this.sync(l) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, n, r, i) {
    let s = r || 0;
    for (let o = r ? e.childNodes[r] : e.firstChild, l = i == null ? null : e.childNodes[i]; o != l; o = o.nextSibling, ++s)
      this.findAtPoint(e, s), this.addDOM(o, n);
    this.findAtPoint(e, s);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, n, r) {
    let i, s;
    for (let o = this.open, l = 0; o >= 0; o--) {
      let a = this.nodes[o], c = a.findWrapping(e);
      if (c && (!i || i.length > c.length + l) && (i = c, s = a, !c.length))
        break;
      if (a.solid) {
        if (r)
          break;
        l += 2;
      }
    }
    if (!i)
      return null;
    this.sync(s);
    for (let o = 0; o < i.length; o++)
      n = this.enterInner(i[o], null, n, !1);
    return n;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, n, r) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let s = this.textblockFromContext();
      s && (n = this.enterInner(s, null, n));
    }
    let i = this.findPlace(e, n, r);
    if (i) {
      this.closeExtra();
      let s = this.top;
      s.match && (s.match = s.match.matchType(e.type));
      let o = $.none;
      for (let l of i.concat(e.marks))
        (s.type ? s.type.allowsMarkType(l.type) : $a(l.type, e.type)) && (o = l.addToSet(o));
      return s.content.push(e.mark(o)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, n, r, i) {
    let s = this.findPlace(e.create(n), r, !1);
    return s && (s = this.enterInner(e, n, r, !0, i)), s;
  }
  // Open a node of the given type
  enterInner(e, n, r, i = !1, s) {
    this.closeExtra();
    let o = this.top;
    o.match = o.match && o.match.matchType(e);
    let l = La(e, s, o.options);
    o.options & lr && o.content.length == 0 && (l |= lr);
    let a = $.none;
    return r = r.filter((c) => (o.type ? o.type.allowsMarkType(c.type) : $a(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new Wr(e, n, a, i, null, l)), this.open++, r;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let n = this.nodes.length - 1;
    if (n > this.open) {
      for (; n > this.open; n--)
        this.nodes[n - 1].content.push(this.nodes[n].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
  }
  sync(e) {
    for (let n = this.open; n >= 0; n--) {
      if (this.nodes[n] == e)
        return this.open = n, !0;
      this.localPreserveWS && (this.nodes[n].options |= xr);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let n = this.open; n >= 0; n--) {
      let r = this.nodes[n].content;
      for (let i = r.length - 1; i >= 0; i--)
        e += r[i].nodeSize;
      n && e++;
    }
    return e;
  }
  findAtPoint(e, n) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == n && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let n = 0; n < this.find.length; n++)
        this.find[n].pos == null && e.nodeType == 1 && e.contains(this.find[n].node) && (this.find[n].pos = this.currentPos);
  }
  findAround(e, n, r) {
    if (e != n && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && n.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let n = 0; n < this.find.length; n++)
        this.find[n].node == e && (this.find[n].pos = this.currentPos - (e.nodeValue.length - this.find[n].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let n = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), s = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), o = (l, a) => {
      for (; l >= 0; l--) {
        let c = n[l];
        if (c == "") {
          if (l == n.length - 1 || l == 0)
            continue;
          for (; a >= s; a--)
            if (o(l - 1, a))
              return !0;
          return !1;
        } else {
          let u = a > 0 || a == 0 && i ? this.nodes[a].type : r && a >= s ? r.node(a - s).type : null;
          if (!u || u.name != c && !u.isInGroup(c))
            return !1;
          a--;
        }
      }
      return !0;
    };
    return o(n.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let n = e.depth; n >= 0; n--) {
        let r = e.node(n).contentMatchAt(e.indexAfter(n)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let n in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[n];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
}
function Wm(t) {
  for (let e = t.firstChild, n = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && ud.hasOwnProperty(r) && n ? (n.appendChild(e), e = n) : r == "li" ? n = e : r && (n = null);
  }
}
function Km(t, e) {
  return (t.matches || t.msMatchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector).call(t, e);
}
function za(t) {
  let e = {};
  for (let n in t)
    e[n] = t[n];
  return e;
}
function $a(t, e) {
  let n = e.schema.nodes;
  for (let r in n) {
    let i = n[r];
    if (!i.allowsMarkType(t))
      continue;
    let s = [], o = (l) => {
      s.push(l);
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: c, next: u } = l.edge(a);
        if (c == e || s.indexOf(u) < 0 && o(u))
          return !0;
      }
    };
    if (o(i.contentMatch))
      return !0;
  }
}
class wn {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, n) {
    this.nodes = e, this.marks = n;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, n = {}, r) {
    r || (r = js(n).createDocumentFragment());
    let i = r, s = [];
    return e.forEach((o) => {
      if (s.length || o.marks.length) {
        let l = 0, a = 0;
        for (; l < s.length && a < o.marks.length; ) {
          let c = o.marks[a];
          if (!this.marks[c.type.name]) {
            a++;
            continue;
          }
          if (!c.eq(s[l][0]) || c.type.spec.spanning === !1)
            break;
          l++, a++;
        }
        for (; l < s.length; )
          i = s.pop()[1];
        for (; a < o.marks.length; ) {
          let c = o.marks[a++], u = this.serializeMark(c, o.isInline, n);
          u && (s.push([c, i]), i.appendChild(u.dom), i = u.contentDOM || u.dom);
        }
      }
      i.appendChild(this.serializeNodeInner(o, n));
    }), r;
  }
  /**
  @internal
  */
  serializeNodeInner(e, n) {
    let { dom: r, contentDOM: i } = li(js(n), this.nodes[e.type.name](e), null, e.attrs);
    if (i) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, n, i);
    }
    return r;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(e, n = {}) {
    let r = this.serializeNodeInner(e, n);
    for (let i = e.marks.length - 1; i >= 0; i--) {
      let s = this.serializeMark(e.marks[i], e.isInline, n);
      s && ((s.contentDOM || s.dom).appendChild(r), r = s.dom);
    }
    return r;
  }
  /**
  @internal
  */
  serializeMark(e, n, r = {}) {
    let i = this.marks[e.type.name];
    return i && li(js(r), i(e, n), null, e.attrs);
  }
  static renderSpec(e, n, r = null, i) {
    return li(e, n, r, i);
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new wn(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let n = _a(e.nodes);
    return n.text || (n.text = (r) => r.text), n;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return _a(e.marks);
  }
}
function _a(t) {
  let e = {};
  for (let n in t) {
    let r = t[n].spec.toDOM;
    r && (e[n] = r);
  }
  return e;
}
function js(t) {
  return t.document || window.document;
}
const Fa = /* @__PURE__ */ new WeakMap();
function qm(t) {
  let e = Fa.get(t);
  return e === void 0 && Fa.set(t, e = Jm(t)), e;
}
function Jm(t) {
  let e = null;
  function n(r) {
    if (r && typeof r == "object")
      if (Array.isArray(r))
        if (typeof r[0] == "string")
          e || (e = []), e.push(r);
        else
          for (let i = 0; i < r.length; i++)
            n(r[i]);
      else
        for (let i in r)
          n(r[i]);
  }
  return n(t), e;
}
function li(t, e, n, r) {
  if (typeof e == "string")
    return { dom: t.createTextNode(e) };
  if (e.nodeType != null)
    return { dom: e };
  if (e.dom && e.dom.nodeType != null)
    return e;
  let i = e[0], s;
  if (typeof i != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (r && (s = qm(r)) && s.indexOf(e) > -1)
    throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
  let o = i.indexOf(" ");
  o > 0 && (n = i.slice(0, o), i = i.slice(o + 1));
  let l, a = n ? t.createElementNS(n, i) : t.createElement(i), c = e[1], u = 1;
  if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
    u = 2;
    for (let d in c)
      if (c[d] != null) {
        let f = d.indexOf(" ");
        f > 0 ? a.setAttributeNS(d.slice(0, f), d.slice(f + 1), c[d]) : d == "style" && a.style ? a.style.cssText = c[d] : a.setAttribute(d, c[d]);
      }
  }
  for (let d = u; d < e.length; d++) {
    let f = e[d];
    if (f === 0) {
      if (d < e.length - 1 || d > u)
        throw new RangeError("Content hole must be the only child of its parent node");
      return { dom: a, contentDOM: a };
    } else {
      let { dom: h, contentDOM: p } = li(t, f, n, r);
      if (a.appendChild(h), p) {
        if (l)
          throw new RangeError("Multiple content holes");
        l = p;
      }
    }
  }
  return { dom: a, contentDOM: l };
}
const dd = 65535, fd = Math.pow(2, 16);
function Gm(t, e) {
  return t + e * fd;
}
function Ha(t) {
  return t & dd;
}
function Ym(t) {
  return (t - (t & dd)) / fd;
}
const hd = 1, pd = 2, ai = 4, md = 8;
class No {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.pos = e, this.delInfo = n, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & md) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (hd | ai)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (pd | ai)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & ai) > 0;
  }
}
class Ae {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, n = !1) {
    if (this.ranges = e, this.inverted = n, !e.length && Ae.empty)
      return Ae.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let n = 0, r = Ha(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        n += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + n + Ym(e);
  }
  mapResult(e, n = 1) {
    return this._map(e, n, !1);
  }
  map(e, n = 1) {
    return this._map(e, n, !0);
  }
  /**
  @internal
  */
  _map(e, n, r) {
    let i = 0, s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e)
        break;
      let c = this.ranges[l + s], u = this.ranges[l + o], d = a + c;
      if (e <= d) {
        let f = c ? e == a ? -1 : e == d ? 1 : n : n, h = a + i + (f < 0 ? 0 : u);
        if (r)
          return h;
        let p = e == (n < 0 ? a : d) ? null : Gm(l / 3, e - a), m = e == a ? pd : e == d ? hd : ai;
        return (n < 0 ? e != a : e != d) && (m |= md), new No(h, m, p);
      }
      i += u - c;
    }
    return r ? e + i : new No(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, n) {
    let r = 0, i = Ha(n), s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e)
        break;
      let c = this.ranges[l + s], u = a + c;
      if (e <= u && l == i * 3)
        return !0;
      r += this.ranges[l + o] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let n = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let i = 0, s = 0; i < this.ranges.length; i += 3) {
      let o = this.ranges[i], l = o - (this.inverted ? s : 0), a = o + (this.inverted ? 0 : s), c = this.ranges[i + n], u = this.ranges[i + r];
      e(l, l + c, a, a + u), s += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new Ae(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? Ae.empty : new Ae(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Ae.empty = new Ae([]);
class Sr {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e, n, r = 0, i = e ? e.length : 0) {
    this.mirror = n, this.from = r, this.to = i, this._maps = e || [], this.ownData = !(e || n);
  }
  /**
  The step maps in this mapping.
  */
  get maps() {
    return this._maps;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, n = this.maps.length) {
    return new Sr(this._maps, this.mirror, e, n);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, n) {
    this.ownData || (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), this.ownData = !0), this.to = this._maps.push(e), n != null && this.setMirror(this._maps.length - 1, n);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let n = 0, r = this._maps.length; n < e._maps.length; n++) {
      let i = e.getMirror(n);
      this.appendMap(e._maps[n], i != null && i < n ? r + i : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let n = 0; n < this.mirror.length; n++)
        if (this.mirror[n] == e)
          return this.mirror[n + (n % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, n) {
    this.mirror || (this.mirror = []), this.mirror.push(e, n);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let n = e.maps.length - 1, r = this._maps.length + e._maps.length; n >= 0; n--) {
      let i = e.getMirror(n);
      this.appendMap(e._maps[n].invert(), i != null && i > n ? r - i - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new Sr();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, n = 1) {
    if (this.mirror)
      return this._map(e, n, !0);
    for (let r = this.from; r < this.to; r++)
      e = this._maps[r].map(e, n);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, n = 1) {
    return this._map(e, n, !1);
  }
  /**
  @internal
  */
  _map(e, n, r) {
    let i = 0;
    for (let s = this.from; s < this.to; s++) {
      let o = this._maps[s], l = o.mapResult(e, n);
      if (l.recover != null) {
        let a = this.getMirror(s);
        if (a != null && a > s && a < this.to) {
          s = a, e = this._maps[a].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, e = l.pos;
    }
    return r ? e : new No(e, i, null);
  }
}
const Us = /* @__PURE__ */ Object.create(null);
class pe {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Ae.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, n) {
    if (!n || !n.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = Us[n.stepType];
    if (!r)
      throw new RangeError(`No step type ${n.stepType} defined`);
    return r.fromJSON(e, n);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, n) {
    if (e in Us)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return Us[e] = n, n.prototype.jsonID = e, n;
  }
}
class Z {
  /**
  @internal
  */
  constructor(e, n) {
    this.doc = e, this.failed = n;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new Z(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new Z(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, n, r, i) {
    try {
      return Z.ok(e.replace(n, r, i));
    } catch (s) {
      if (s instanceof vi)
        return Z.fail(s.message);
      throw s;
    }
  }
}
function xl(t, e, n) {
  let r = [];
  for (let i = 0; i < t.childCount; i++) {
    let s = t.child(i);
    s.content.size && (s = s.copy(xl(s.content, e, s))), s.isInline && (s = e(s, n, i)), r.push(s);
  }
  return x.fromArray(r);
}
class Ft extends pe {
  /**
  Create a mark step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), s = new M(xl(n.content, (o, l) => !o.isAtom || !l.type.allowsMarkType(this.mark.type) ? o : o.mark(this.mark.addToSet(o.marks)), i), n.openStart, n.openEnd);
    return Z.fromReplace(e, this.from, this.to, s);
  }
  invert() {
    return new Ke(this.from, this.to, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deleted && r.deleted || n.pos >= r.pos ? null : new Ft(n.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Ft && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Ft(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new Ft(n.from, n.to, e.markFromJSON(n.mark));
  }
}
pe.jsonID("addMark", Ft);
class Ke extends pe {
  /**
  Create a mark-removing step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = new M(xl(n.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), n.openStart, n.openEnd);
    return Z.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new Ft(this.from, this.to, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deleted && r.deleted || n.pos >= r.pos ? null : new Ke(n.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Ke && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Ke(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new Ke(n.from, n.to, e.markFromJSON(n.mark));
  }
}
pe.jsonID("removeMark", Ke);
class Ht extends pe {
  /**
  Create a node mark step.
  */
  constructor(e, n) {
    super(), this.pos = e, this.mark = n;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return Z.fail("No node at mark step's position");
    let r = n.type.create(n.attrs, null, this.mark.addToSet(n.marks));
    return Z.fromReplace(e, this.pos, this.pos + 1, new M(x.from(r), 0, n.isLeaf ? 0 : 1));
  }
  invert(e) {
    let n = e.nodeAt(this.pos);
    if (n) {
      let r = this.mark.addToSet(n.marks);
      if (r.length == n.marks.length) {
        for (let i = 0; i < n.marks.length; i++)
          if (!n.marks[i].isInSet(r))
            return new Ht(this.pos, n.marks[i]);
        return new Ht(this.pos, this.mark);
      }
    }
    return new gn(this.pos, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new Ht(n.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new Ht(n.pos, e.markFromJSON(n.mark));
  }
}
pe.jsonID("addNodeMark", Ht);
class gn extends pe {
  /**
  Create a mark-removing step.
  */
  constructor(e, n) {
    super(), this.pos = e, this.mark = n;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return Z.fail("No node at mark step's position");
    let r = n.type.create(n.attrs, null, this.mark.removeFromSet(n.marks));
    return Z.fromReplace(e, this.pos, this.pos + 1, new M(x.from(r), 0, n.isLeaf ? 0 : 1));
  }
  invert(e) {
    let n = e.nodeAt(this.pos);
    return !n || !this.mark.isInSet(n.marks) ? this : new Ht(this.pos, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new gn(n.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new gn(n.pos, e.markFromJSON(n.mark));
  }
}
pe.jsonID("removeNodeMark", gn);
class ie extends pe {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, n, r, i = !1) {
    super(), this.from = e, this.to = n, this.slice = r, this.structure = i;
  }
  apply(e) {
    return this.structure && Io(e, this.from, this.to) ? Z.fail("Structure replace would overwrite content") : Z.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Ae([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new ie(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deletedAcross && r.deletedAcross ? null : new ie(n.pos, Math.max(n.pos, r.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof ie) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let n = this.slice.size + e.slice.size == 0 ? M.empty : new M(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new ie(this.from, this.to + (e.to - e.from), n, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let n = this.slice.size + e.slice.size == 0 ? M.empty : new M(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new ie(e.from, this.to, n, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new ie(n.from, n.to, M.fromJSON(e, n.slice), !!n.structure);
  }
}
pe.jsonID("replace", ie);
class se extends pe {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, n, r, i, s, o, l = !1) {
    super(), this.from = e, this.to = n, this.gapFrom = r, this.gapTo = i, this.slice = s, this.insert = o, this.structure = l;
  }
  apply(e) {
    if (this.structure && (Io(e, this.from, this.gapFrom) || Io(e, this.gapTo, this.to)))
      return Z.fail("Structure gap-replace would overwrite content");
    let n = e.slice(this.gapFrom, this.gapTo);
    if (n.openStart || n.openEnd)
      return Z.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, n.content);
    return r ? Z.fromReplace(e, this.from, this.to, r) : Z.fail("Content does not fit in gap");
  }
  getMap() {
    return new Ae([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let n = this.gapTo - this.gapFrom;
    return new se(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? n.pos : e.map(this.gapFrom, -1), s = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return n.deletedAcross && r.deletedAcross || i < n.pos || s > r.pos ? null : new se(n.pos, r.pos, i, s, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number" || typeof n.gapFrom != "number" || typeof n.gapTo != "number" || typeof n.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new se(n.from, n.to, n.gapFrom, n.gapTo, M.fromJSON(e, n.slice), n.insert, !!n.structure);
  }
}
pe.jsonID("replaceAround", se);
function Io(t, e, n) {
  let r = t.resolve(e), i = n - e, s = r.depth;
  for (; i > 0 && s > 0 && r.indexAfter(s) == r.node(s).childCount; )
    s--, i--;
  if (i > 0) {
    let o = r.node(s).maybeChild(r.indexAfter(s));
    for (; i > 0; ) {
      if (!o || o.isLeaf)
        return !0;
      o = o.firstChild, i--;
    }
  }
  return !1;
}
function Xm(t, e, n, r) {
  let i = [], s = [], o, l;
  t.doc.nodesBetween(e, n, (a, c, u) => {
    if (!a.isInline)
      return;
    let d = a.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(c, e), h = Math.min(c + a.nodeSize, n), p = r.addToSet(d);
      for (let m = 0; m < d.length; m++)
        d[m].isInSet(p) || (o && o.to == f && o.mark.eq(d[m]) ? o.to = h : i.push(o = new Ke(f, h, d[m])));
      l && l.to == f ? l.to = h : s.push(l = new Ft(f, h, r));
    }
  }), i.forEach((a) => t.step(a)), s.forEach((a) => t.step(a));
}
function Qm(t, e, n, r) {
  let i = [], s = 0;
  t.doc.nodesBetween(e, n, (o, l) => {
    if (!o.isInline)
      return;
    s++;
    let a = null;
    if (r instanceof ws) {
      let c = o.marks, u;
      for (; u = r.isInSet(c); )
        (a || (a = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(o.marks) && (a = [r]) : a = o.marks;
    if (a && a.length) {
      let c = Math.min(l + o.nodeSize, n);
      for (let u = 0; u < a.length; u++) {
        let d = a[u], f;
        for (let h = 0; h < i.length; h++) {
          let p = i[h];
          p.step == s - 1 && d.eq(i[h].style) && (f = p);
        }
        f ? (f.to = c, f.step = s) : i.push({ style: d, from: Math.max(l, e), to: c, step: s });
      }
    }
  }), i.forEach((o) => t.step(new Ke(o.from, o.to, o.style)));
}
function Sl(t, e, n, r = n.contentMatch, i = !0) {
  let s = t.doc.nodeAt(e), o = [], l = e + 1;
  for (let a = 0; a < s.childCount; a++) {
    let c = s.child(a), u = l + c.nodeSize, d = r.matchType(c.type);
    if (!d)
      o.push(new ie(l, u, M.empty));
    else {
      r = d;
      for (let f = 0; f < c.marks.length; f++)
        n.allowsMarkType(c.marks[f].type) || t.step(new Ke(l, u, c.marks[f]));
      if (i && c.isText && n.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, p;
        for (; f = h.exec(c.text); )
          p || (p = new M(x.from(n.schema.text(" ", n.allowedMarks(c.marks))), 0, 0)), o.push(new ie(l + f.index, l + f.index + f[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(x.empty, !0);
    t.replace(l, l, new M(a, 0, 0));
  }
  for (let a = o.length - 1; a >= 0; a--)
    t.step(o[a]);
}
function Zm(t, e, n) {
  return (e == 0 || t.canReplace(e, t.childCount)) && (n == t.childCount || t.canReplace(0, n));
}
function Wn(t) {
  let n = t.parent.content.cutByIndex(t.startIndex, t.endIndex);
  for (let r = t.depth; ; --r) {
    let i = t.$from.node(r), s = t.$from.index(r), o = t.$to.indexAfter(r);
    if (r < t.depth && i.canReplace(s, o, n))
      return r;
    if (r == 0 || i.type.spec.isolating || !Zm(i, s, o))
      break;
  }
  return null;
}
function eg(t, e, n) {
  let { $from: r, $to: i, depth: s } = e, o = r.before(s + 1), l = i.after(s + 1), a = o, c = l, u = x.empty, d = 0;
  for (let p = s, m = !1; p > n; p--)
    m || r.index(p) > 0 ? (m = !0, u = x.from(r.node(p).copy(u)), d++) : a--;
  let f = x.empty, h = 0;
  for (let p = s, m = !1; p > n; p--)
    m || i.after(p + 1) < i.end(p) ? (m = !0, f = x.from(i.node(p).copy(f)), h++) : c++;
  t.step(new se(a, c, o, l, new M(u.append(f), d, h), u.size - d, !0));
}
function vl(t, e, n = null, r = t) {
  let i = tg(t, e), s = i && ng(r, e);
  return s ? i.map(Va).concat({ type: e, attrs: n }).concat(s.map(Va)) : null;
}
function Va(t) {
  return { type: t, attrs: null };
}
function tg(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, s = n.contentMatchAt(r).findWrapping(e);
  if (!s)
    return null;
  let o = s.length ? s[0] : e;
  return n.canReplaceWith(r, i, o) ? s : null;
}
function ng(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, s = n.child(r), o = e.contentMatch.findWrapping(s.type);
  if (!o)
    return null;
  let a = (o.length ? o[o.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(n.child(c).type);
  return !a || !a.validEnd ? null : o;
}
function rg(t, e, n) {
  let r = x.empty;
  for (let o = n.length - 1; o >= 0; o--) {
    if (r.size) {
      let l = n[o].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = x.from(n[o].type.create(n[o].attrs, r));
  }
  let i = e.start, s = e.end;
  t.step(new se(i, s, i, s, new M(r, 0, 0), n.length, !0));
}
function ig(t, e, n, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let s = t.steps.length;
  t.doc.nodesBetween(e, n, (o, l) => {
    let a = typeof i == "function" ? i(o) : i;
    if (o.isTextblock && !o.hasMarkup(r, a) && sg(t.doc, t.mapping.slice(s).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !p ? c = !1 : !h && p && (c = !0);
      }
      c === !1 && yd(t, o, l, s), Sl(t, t.mapping.slice(s).map(l, 1), r, void 0, c === null);
      let u = t.mapping.slice(s), d = u.map(l, 1), f = u.map(l + o.nodeSize, 1);
      return t.step(new se(d, f, d + 1, f - 1, new M(x.from(r.create(a, null, o.marks)), 0, 0), 1, !0)), c === !0 && gd(t, o, l, s), !1;
    }
  });
}
function gd(t, e, n, r) {
  e.forEach((i, s) => {
    if (i.isText) {
      let o, l = /\r?\n|\r/g;
      for (; o = l.exec(i.text); ) {
        let a = t.mapping.slice(r).map(n + 1 + s + o.index);
        t.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function yd(t, e, n, r) {
  e.forEach((i, s) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let o = t.mapping.slice(r).map(n + 1 + s);
      t.replaceWith(o, o + 1, e.type.schema.text(`
`));
    }
  });
}
function sg(t, e, n) {
  let r = t.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, n);
}
function og(t, e, n, r, i) {
  let s = t.doc.nodeAt(e);
  if (!s)
    throw new RangeError("No node at given position");
  n || (n = s.type);
  let o = n.create(r, null, i || s.marks);
  if (s.isLeaf)
    return t.replaceWith(e, e + s.nodeSize, o);
  if (!n.validContent(s.content))
    throw new RangeError("Invalid content for node type " + n.name);
  t.step(new se(e, e + s.nodeSize, e + 1, e + s.nodeSize - 1, new M(x.from(o), 0, 0), 1, !0));
}
function St(t, e, n = 1, r) {
  let i = t.resolve(e), s = i.depth - n, o = r && r[r.length - 1] || i.parent;
  if (s < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = n - 2; c > s; c--, u--) {
    let d = i.node(c), f = i.index(c);
    if (d.type.spec.isolating)
      return !1;
    let h = d.content.cutByIndex(f, d.childCount), p = r && r[u + 1];
    p && (h = h.replaceChild(0, p.type.create(p.attrs)));
    let m = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !m.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(s), a = r && r[0];
  return i.node(s).canReplaceWith(l, l, a ? a.type : i.node(s + 1).type);
}
function lg(t, e, n = 1, r) {
  let i = t.doc.resolve(e), s = x.empty, o = x.empty;
  for (let l = i.depth, a = i.depth - n, c = n - 1; l > a; l--, c--) {
    s = x.from(i.node(l).copy(s));
    let u = r && r[c];
    o = x.from(u ? u.type.create(u.attrs, o) : i.node(l).copy(o));
  }
  t.step(new ie(e, e, new M(s.append(o), n, n), !0));
}
function Qt(t, e) {
  let n = t.resolve(e), r = n.index();
  return bd(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function ag(t, e) {
  e.content.size || t.type.compatibleContent(e.type);
  let n = t.contentMatchAt(t.childCount), { linebreakReplacement: r } = t.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let s = e.child(i), o = s.type == r ? t.type.schema.nodes.text : s.type;
    if (n = n.matchType(o), !n || !t.type.allowsMarks(s.marks))
      return !1;
  }
  return n.validEnd;
}
function bd(t, e) {
  return !!(t && e && !t.isLeaf && ag(t, e));
}
function ks(t, e, n = -1) {
  let r = t.resolve(e);
  for (let i = r.depth; ; i--) {
    let s, o, l = r.index(i);
    if (i == r.depth ? (s = r.nodeBefore, o = r.nodeAfter) : n > 0 ? (s = r.node(i + 1), l++, o = r.node(i).maybeChild(l)) : (s = r.node(i).maybeChild(l - 1), o = r.node(i + 1)), s && !s.isTextblock && bd(s, o) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = n < 0 ? r.before(i) : r.after(i);
  }
}
function cg(t, e, n) {
  let r = null, { linebreakReplacement: i } = t.doc.type.schema, s = t.doc.resolve(e - n), o = s.node().type;
  if (i && o.inlineContent) {
    let u = o.whitespace == "pre", d = !!o.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = t.steps.length;
  if (r === !1) {
    let u = t.doc.resolve(e + n);
    yd(t, u.node(), u.before(), l);
  }
  o.inlineContent && Sl(t, e + n - 1, o, s.node().contentMatchAt(s.index()), r == null);
  let a = t.mapping.slice(l), c = a.map(e - n);
  if (t.step(new ie(c, a.map(e + n, -1), M.empty, !0)), r === !0) {
    let u = t.doc.resolve(c);
    gd(t, u.node(), u.before(), t.steps.length);
  }
  return t;
}
function ug(t, e, n) {
  let r = t.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), n))
    return e;
  if (r.parentOffset == 0)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.index(i);
      if (r.node(i).canReplaceWith(s, s, n))
        return r.before(i + 1);
      if (s > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.indexAfter(i);
      if (r.node(i).canReplaceWith(s, s, n))
        return r.after(i + 1);
      if (s < r.node(i).childCount)
        return null;
    }
  return null;
}
function wd(t, e, n) {
  let r = t.resolve(e);
  if (!n.content.size)
    return e;
  let i = n.content;
  for (let s = 0; s < n.openStart; s++)
    i = i.firstChild.content;
  for (let s = 1; s <= (n.openStart == 0 && n.size ? 2 : 1); s++)
    for (let o = r.depth; o >= 0; o--) {
      let l = o == r.depth ? 0 : r.pos <= (r.start(o + 1) + r.end(o + 1)) / 2 ? -1 : 1, a = r.index(o) + (l > 0 ? 1 : 0), c = r.node(o), u = !1;
      if (s == 1)
        u = c.canReplace(a, a, i);
      else {
        let d = c.contentMatchAt(a).findWrapping(i.firstChild.type);
        u = d && c.canReplaceWith(a, a, d[0]);
      }
      if (u)
        return l == 0 ? r.pos : l < 0 ? r.before(o + 1) : r.after(o + 1);
    }
  return null;
}
function xs(t, e, n = e, r = M.empty) {
  if (e == n && !r.size)
    return null;
  let i = t.resolve(e), s = t.resolve(n);
  return kd(i, s, r) ? new ie(e, n, r) : new dg(i, s, r).fit();
}
function kd(t, e, n) {
  return !n.openStart && !n.openEnd && t.start() == e.start() && t.parent.canReplace(t.index(), e.index(), n.content);
}
class dg {
  constructor(e, n, r) {
    this.$from = e, this.$to = n, this.unplaced = r, this.frontier = [], this.placed = x.empty;
    for (let i = 0; i <= e.depth; i++) {
      let s = e.node(i);
      this.frontier.push({
        type: s.type,
        match: s.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = x.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), n = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let s = this.placed, o = r.depth, l = i.depth;
    for (; o && l && s.childCount == 1; )
      s = s.firstChild.content, o--, l--;
    let a = new M(s, o, l);
    return e > -1 ? new se(r.pos, e, this.$to.pos, this.$to.end(), a, n) : a.size || r.pos != this.$to.pos ? new ie(r.pos, i.pos, a) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let n = this.unplaced.content, r = 0, i = this.unplaced.openEnd; r < e; r++) {
      let s = n.firstChild;
      if (n.childCount > 1 && (i = 0), s.type.spec.isolating && i <= r) {
        e = r;
        break;
      }
      n = s.content;
    }
    for (let n = 1; n <= 2; n++)
      for (let r = n == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i, s = null;
        r ? (s = Ws(this.unplaced.content, r - 1).firstChild, i = s.content) : i = this.unplaced.content;
        let o = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, d = null;
          if (n == 1 && (o ? c.matchType(o.type) || (d = c.fillBefore(x.from(o), !1)) : s && a.compatibleContent(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: s, inject: d };
          if (n == 2 && o && (u = c.findWrapping(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: s, wrap: u };
          if (s && c.matchType(s.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: n, openEnd: r } = this.unplaced, i = Ws(e, n);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new M(e, n + 1, Math.max(r, i.size + n >= e.size - r ? n + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: n, openEnd: r } = this.unplaced, i = Ws(e, n);
    if (i.childCount <= 1 && n > 0) {
      let s = e.size - n <= n + i.size;
      this.unplaced = new M(Qn(e, n - 1, 1), n - 1, s ? n - 1 : r);
    } else
      this.unplaced = new M(Qn(e, n, 1), n, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: n, parent: r, inject: i, wrap: s }) {
    for (; this.depth > n; )
      this.closeFrontierNode();
    if (s)
      for (let m = 0; m < s.length; m++)
        this.openFrontierNode(s[m]);
    let o = this.unplaced, l = r ? r.content : o.content, a = o.openStart - e, c = 0, u = [], { match: d, type: f } = this.frontier[n];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        u.push(i.child(m));
      d = d.matchFragment(i);
    }
    let h = l.size + e - (o.content.size - o.openEnd);
    for (; c < l.childCount; ) {
      let m = l.child(c), g = d.matchType(m.type);
      if (!g)
        break;
      c++, (c > 1 || a == 0 || m.content.size) && (d = g, u.push(xd(m.mark(f.allowedMarks(m.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)));
    }
    let p = c == l.childCount;
    p || (h = -1), this.placed = Zn(this.placed, n, x.from(u)), this.frontier[n].match = d, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, g = l; m < h; m++) {
      let y = g.lastChild;
      this.frontier.push({ type: y.type, match: y.contentMatchAt(y.childCount) }), g = y.content;
    }
    this.unplaced = p ? e == 0 ? M.empty : new M(Qn(o.content, e - 1, 1), e - 1, h < 0 ? o.openEnd : e - 1) : new M(Qn(o.content, e, c), o.openStart, o.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], n;
    if (!e.type.isTextblock || !Ks(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (n = this.findCloseLevel(this.$to)) && n.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let n = Math.min(this.depth, e.depth); n >= 0; n--) {
      let { match: r, type: i } = this.frontier[n], s = n < e.depth && e.end(n + 1) == e.pos + (e.depth - (n + 1)), o = Ks(e, n, i, r, s);
      if (o) {
        for (let l = n - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], u = Ks(e, l, c, a, !0);
          if (!u || u.childCount)
            continue e;
        }
        return { depth: n, fit: o, move: s ? e.doc.resolve(e.after(n + 1)) : e };
      }
    }
  }
  close(e) {
    let n = this.findCloseLevel(e);
    if (!n)
      return null;
    for (; this.depth > n.depth; )
      this.closeFrontierNode();
    n.fit.childCount && (this.placed = Zn(this.placed, n.depth, n.fit)), e = n.move;
    for (let r = n.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), s = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, s);
    }
    return e;
  }
  openFrontierNode(e, n = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Zn(this.placed, this.depth, x.from(e.create(n, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let n = this.frontier.pop().match.fillBefore(x.empty, !0);
    n.childCount && (this.placed = Zn(this.placed, this.frontier.length, n));
  }
}
function Qn(t, e, n) {
  return e == 0 ? t.cutByIndex(n, t.childCount) : t.replaceChild(0, t.firstChild.copy(Qn(t.firstChild.content, e - 1, n)));
}
function Zn(t, e, n) {
  return e == 0 ? t.append(n) : t.replaceChild(t.childCount - 1, t.lastChild.copy(Zn(t.lastChild.content, e - 1, n)));
}
function Ws(t, e) {
  for (let n = 0; n < e; n++)
    t = t.firstChild.content;
  return t;
}
function xd(t, e, n) {
  if (e <= 0)
    return t;
  let r = t.content;
  return e > 1 && (r = r.replaceChild(0, xd(r.firstChild, e - 1, r.childCount == 1 ? n - 1 : 0))), e > 0 && (r = t.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(t.type.contentMatch.matchFragment(r).fillBefore(x.empty, !0)))), t.copy(r);
}
function Ks(t, e, n, r, i) {
  let s = t.node(e), o = i ? t.indexAfter(e) : t.index(e);
  if (o == s.childCount && !n.compatibleContent(s.type))
    return null;
  let l = r.fillBefore(s.content, !0, o);
  return l && !fg(n, s.content, o) ? l : null;
}
function fg(t, e, n) {
  for (let r = n; r < e.childCount; r++)
    if (!t.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function hg(t) {
  return t.spec.defining || t.spec.definingForContent;
}
function pg(t, e, n, r) {
  if (!r.size)
    return t.deleteRange(e, n);
  let i = t.doc.resolve(e), s = t.doc.resolve(n);
  if (kd(i, s, r))
    return t.step(new ie(e, n, r));
  let o = vd(i, t.doc.resolve(n));
  o[o.length - 1] == 0 && o.pop();
  let l = -(i.depth + 1);
  o.unshift(l);
  for (let f = i.depth, h = i.pos - 1; f > 0; f--, h--) {
    let p = i.node(f).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    o.indexOf(f) > -1 ? l = f : i.before(f) == h && o.splice(1, 0, -f);
  }
  let a = o.indexOf(l), c = [], u = r.openStart;
  for (let f = r.content, h = 0; ; h++) {
    let p = f.firstChild;
    if (c.push(p), h == r.openStart)
      break;
    f = p.content;
  }
  for (let f = u - 1; f >= 0; f--) {
    let h = c[f], p = hg(h.type);
    if (p && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      u = f;
    else if (p || !h.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let h = (f + u + 1) % (r.openStart + 1), p = c[h];
    if (p)
      for (let m = 0; m < o.length; m++) {
        let g = o[(m + a) % o.length], y = !0;
        g < 0 && (y = !1, g = -g);
        let b = i.node(g - 1), w = i.index(g - 1);
        if (b.canReplaceWith(w, w, p.type, p.marks))
          return t.replace(i.before(g), y ? s.after(g) : n, new M(Sd(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = t.steps.length;
  for (let f = o.length - 1; f >= 0 && (t.replace(e, n, r), !(t.steps.length > d)); f--) {
    let h = o[f];
    h < 0 || (e = i.before(h), n = s.after(h));
  }
}
function Sd(t, e, n, r, i) {
  if (e < n) {
    let s = t.firstChild;
    t = t.replaceChild(0, s.copy(Sd(s.content, e + 1, n, r, s)));
  }
  if (e > r) {
    let s = i.contentMatchAt(0), o = s.fillBefore(t).append(t);
    t = o.append(s.matchFragment(o).fillBefore(x.empty, !0));
  }
  return t;
}
function mg(t, e, n, r) {
  if (!r.isInline && e == n && t.doc.resolve(e).parent.content.size) {
    let i = ug(t.doc, e, r.type);
    i != null && (e = n = i);
  }
  t.replaceRange(e, n, new M(x.from(r), 0, 0));
}
function gg(t, e, n) {
  let r = t.doc.resolve(e), i = t.doc.resolve(n), s = vd(r, i);
  for (let o = 0; o < s.length; o++) {
    let l = s[o], a = o == s.length - 1;
    if (a && l == 0 || r.node(l).type.contentMatch.validEnd)
      return t.delete(r.start(l), i.end(l));
    if (l > 0 && (a || r.node(l - 1).canReplace(r.index(l - 1), i.indexAfter(l - 1))))
      return t.delete(r.before(l), i.after(l));
  }
  for (let o = 1; o <= r.depth && o <= i.depth; o++)
    if (e - r.start(o) == r.depth - o && n > r.end(o) && i.end(o) - n != i.depth - o && r.start(o - 1) == i.start(o - 1) && r.node(o - 1).canReplace(r.index(o - 1), i.index(o - 1)))
      return t.delete(r.before(o), n);
  t.delete(e, n);
}
function vd(t, e) {
  let n = [], r = Math.min(t.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let s = t.start(i);
    if (s < t.pos - (t.depth - i) || e.end(i) > e.pos + (e.depth - i) || t.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (s == e.start(i) || i == t.depth && i == e.depth && t.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == s - 1) && n.push(i);
  }
  return n;
}
class Rn extends pe {
  /**
  Construct an attribute step.
  */
  constructor(e, n, r) {
    super(), this.pos = e, this.attr = n, this.value = r;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return Z.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let s in n.attrs)
      r[s] = n.attrs[s];
    r[this.attr] = this.value;
    let i = n.type.create(r, null, n.marks);
    return Z.fromReplace(e, this.pos, this.pos + 1, new M(x.from(i), 0, n.isLeaf ? 0 : 1));
  }
  getMap() {
    return Ae.empty;
  }
  invert(e) {
    return new Rn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new Rn(n.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, n) {
    if (typeof n.pos != "number" || typeof n.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Rn(n.pos, n.attr, n.value);
  }
}
pe.jsonID("attr", Rn);
class vr extends pe {
  /**
  Construct an attribute step.
  */
  constructor(e, n) {
    super(), this.attr = e, this.value = n;
  }
  apply(e) {
    let n = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      n[i] = e.attrs[i];
    n[this.attr] = this.value;
    let r = e.type.create(n, e.content, e.marks);
    return Z.ok(r);
  }
  getMap() {
    return Ae.empty;
  }
  invert(e) {
    return new vr(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, n) {
    if (typeof n.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new vr(n.attr, n.value);
  }
}
pe.jsonID("docAttr", vr);
let Ln = class extends Error {
};
Ln = function t(e) {
  let n = Error.call(this, e);
  return n.__proto__ = t.prototype, n;
};
Ln.prototype = Object.create(Error.prototype);
Ln.prototype.constructor = Ln;
Ln.prototype.name = "TransformError";
class Cd {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Sr();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(e) {
    let n = this.maybeStep(e);
    if (n.failed)
      throw new Ln(n.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let n = e.apply(this.doc);
    return n.failed || this.addStep(e, n.doc), n;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  @internal
  */
  addStep(e, n) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = n;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, n = e, r = M.empty) {
    let i = xs(this.doc, e, n, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, n, r) {
    return this.replace(e, n, new M(x.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, n) {
    return this.replace(e, n, M.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, n) {
    return this.replaceWith(e, e, n);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(e, n, r) {
    return pg(this, e, n, r), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(e, n, r) {
    return mg(this, e, n, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, n) {
    return gg(this, e, n), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, n) {
    return eg(this, e, n), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, n = 1) {
    return cg(this, e, n), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, n) {
    return rg(this, e, n), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, n = e, r, i = null) {
    return ig(this, e, n, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, n, r = null, i) {
    return og(this, e, n, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, n, r) {
    return this.step(new Rn(e, n, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, n) {
    return this.step(new vr(e, n)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, n) {
    return this.step(new Ht(e, n)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, n) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (n instanceof $)
      n.isInSet(r.marks) && this.step(new gn(e, n));
    else {
      let i = r.marks, s, o = [];
      for (; s = n.isInSet(i); )
        o.push(new gn(e, s)), i = s.removeFromSet(i);
      for (let l = o.length - 1; l >= 0; l--)
        this.step(o[l]);
    }
    return this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split (with the outermost nodes coming first).
  */
  split(e, n = 1, r) {
    return lg(this, e, n, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, n, r) {
    return Xm(this, e, n, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, n, r) {
    return Qm(this, e, n, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, n, r) {
    return Sl(this, e, n, r), this;
  }
}
const qs = /* @__PURE__ */ Object.create(null);
class I {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, n, r) {
    this.$anchor = e, this.$head = n, this.ranges = r || [new Md(e.min(n), e.max(n))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let n = 0; n < e.length; n++)
      if (e[n].$from.pos != e[n].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, n = M.empty) {
    let r = n.content.lastChild, i = null;
    for (let l = 0; l < n.openEnd; l++)
      i = r, r = r.lastChild;
    let s = e.steps.length, o = this.ranges;
    for (let l = 0; l < o.length; l++) {
      let { $from: a, $to: c } = o[l], u = e.mapping.slice(s);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? M.empty : n), l == 0 && Wa(e, s, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, n) {
    let r = e.steps.length, i = this.ranges;
    for (let s = 0; s < i.length; s++) {
      let { $from: o, $to: l } = i[s], a = e.mapping.slice(r), c = a.map(o.pos), u = a.map(l.pos);
      s ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, n), Wa(e, r, n.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, n, r = !1) {
    let i = e.parent.inlineContent ? new D(e) : Mn(e.node(0), e.parent, e.pos, e.index(), n, r);
    if (i)
      return i;
    for (let s = e.depth - 1; s >= 0; s--) {
      let o = n < 0 ? Mn(e.node(0), e.node(s), e.before(s + 1), e.index(s), n, r) : Mn(e.node(0), e.node(s), e.after(s + 1), e.index(s) + 1, n, r);
      if (o)
        return o;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, n = 1) {
    return this.findFrom(e, n) || this.findFrom(e, -n) || new Ie(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Mn(e, e, 0, 0, 1) || new Ie(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Mn(e, e, e.content.size, e.childCount, -1) || new Ie(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, n) {
    if (!n || !n.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = qs[n.type];
    if (!r)
      throw new RangeError(`No selection type ${n.type} defined`);
    return r.fromJSON(e, n);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, n) {
    if (e in qs)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return qs[e] = n, n.prototype.jsonID = e, n;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return D.between(this.$anchor, this.$head).getBookmark();
  }
}
I.prototype.visible = !0;
class Md {
  /**
  Create a range.
  */
  constructor(e, n) {
    this.$from = e, this.$to = n;
  }
}
let ja = !1;
function Ua(t) {
  !ja && !t.parent.inlineContent && (ja = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + t.parent.type.name + ")"));
}
class D extends I {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, n = e) {
    Ua(e), Ua(n), super(e, n);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, n) {
    let r = e.resolve(n.map(this.head));
    if (!r.parent.inlineContent)
      return I.near(r);
    let i = e.resolve(n.map(this.anchor));
    return new D(i.parent.inlineContent ? i : r, r);
  }
  replace(e, n = M.empty) {
    if (super.replace(e, n), n == M.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof D && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Ss(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.anchor != "number" || typeof n.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new D(e.resolve(n.anchor), e.resolve(n.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, n, r = n) {
    let i = e.resolve(n);
    return new this(i, r == n ? i : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, n, r) {
    let i = e.pos - n.pos;
    if ((!r || i) && (r = i >= 0 ? 1 : -1), !n.parent.inlineContent) {
      let s = I.findFrom(n, r, !0) || I.findFrom(n, -r, !0);
      if (s)
        n = s.$head;
      else
        return I.near(n, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = n : (e = (I.findFrom(e, -r, !0) || I.findFrom(e, r, !0)).$anchor, e.pos < n.pos != i < 0 && (e = n))), new D(e, n);
  }
}
I.jsonID("text", D);
class Ss {
  constructor(e, n) {
    this.anchor = e, this.head = n;
  }
  map(e) {
    return new Ss(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return D.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class O extends I {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let n = e.nodeAfter, r = e.node(0).resolve(e.pos + n.nodeSize);
    super(e, r), this.node = n;
  }
  map(e, n) {
    let { deleted: r, pos: i } = n.mapResult(this.anchor), s = e.resolve(i);
    return r ? I.near(s) : new O(s);
  }
  content() {
    return new M(x.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof O && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Cl(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new O(e.resolve(n.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, n) {
    return new O(e.resolve(n));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
O.prototype.visible = !1;
I.jsonID("node", O);
class Cl {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: n, pos: r } = e.mapResult(this.anchor);
    return n ? new Ss(r, r) : new Cl(r);
  }
  resolve(e) {
    let n = e.resolve(this.anchor), r = n.nodeAfter;
    return r && O.isSelectable(r) ? new O(n) : I.near(n);
  }
}
class Ie extends I {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, n = M.empty) {
    if (n == M.empty) {
      e.delete(0, e.doc.content.size);
      let r = I.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, n);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new Ie(e);
  }
  map(e) {
    return new Ie(e);
  }
  eq(e) {
    return e instanceof Ie;
  }
  getBookmark() {
    return yg;
  }
}
I.jsonID("all", Ie);
const yg = {
  map() {
    return this;
  },
  resolve(t) {
    return new Ie(t);
  }
};
function Mn(t, e, n, r, i, s = !1) {
  if (e.inlineContent)
    return D.create(t, n);
  for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < e.childCount : o >= 0; o += i) {
    let l = e.child(o);
    if (l.isAtom) {
      if (!s && O.isSelectable(l))
        return O.create(t, n - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = Mn(t, l, n + i, i < 0 ? l.childCount : 0, i, s);
      if (a)
        return a;
    }
    n += l.nodeSize * i;
  }
  return null;
}
function Wa(t, e, n) {
  let r = t.steps.length - 1;
  if (r < e)
    return;
  let i = t.steps[r];
  if (!(i instanceof ie || i instanceof se))
    return;
  let s = t.mapping.maps[r], o;
  s.forEach((l, a, c, u) => {
    o == null && (o = u);
  }), t.setSelection(I.near(t.doc.resolve(o), n));
}
const Ka = 1, Kr = 2, qa = 4;
class bg extends Cd {
  /**
  @internal
  */
  constructor(e) {
    super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Ka) & ~Kr, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & Ka) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= Kr, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return $.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(e) {
    return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(e) {
    return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & Kr) > 0;
  }
  /**
  @internal
  */
  addStep(e, n) {
    super.addStep(e, n), this.updated = this.updated & ~Kr, this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(e) {
    return this.time = e, this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(e, n = !0) {
    let r = this.selection;
    return n && (e = e.mark(this.storedMarks || (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || $.none))), r.replaceWith(this, e), this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(e, n, r) {
    let i = this.doc.type.schema;
    if (n == null)
      return e ? this.replaceSelectionWith(i.text(e), !0) : this.deleteSelection();
    {
      if (r == null && (r = n), !e)
        return this.deleteRange(n, r);
      let s = this.storedMarks;
      if (!s) {
        let o = this.doc.resolve(n);
        s = r == n ? o.marks() : o.marksAcross(this.doc.resolve(r));
      }
      return this.replaceRangeWith(n, r, i.text(e, s)), !this.selection.empty && this.selection.to == n + e.length && this.setSelection(I.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, n) {
    return this.meta[typeof e == "string" ? e : e.key] = n, this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let e in this.meta)
      return !1;
    return !0;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    return this.updated |= qa, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & qa) > 0;
  }
}
function Ja(t, e) {
  return !e || !t ? t : t.bind(e);
}
class er {
  constructor(e, n, r) {
    this.name = e, this.init = Ja(n.init, r), this.apply = Ja(n.apply, r);
  }
}
const wg = [
  new er("doc", {
    init(t) {
      return t.doc || t.schema.topNodeType.createAndFill();
    },
    apply(t) {
      return t.doc;
    }
  }),
  new er("selection", {
    init(t, e) {
      return t.selection || I.atStart(e.doc);
    },
    apply(t) {
      return t.selection;
    }
  }),
  new er("storedMarks", {
    init(t) {
      return t.storedMarks || null;
    },
    apply(t, e, n, r) {
      return r.selection.$cursor ? t.storedMarks : null;
    }
  }),
  new er("scrollToSelection", {
    init() {
      return 0;
    },
    apply(t, e) {
      return t.scrolledIntoView ? e + 1 : e;
    }
  })
];
class Js {
  constructor(e, n) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = wg.slice(), n && n.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new er(r.key, r.spec.state, r));
    });
  }
}
class On {
  /**
  @internal
  */
  constructor(e) {
    this.config = e;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(e) {
    return this.applyTransaction(e).state;
  }
  /**
  @internal
  */
  filterTransaction(e, n = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != n) {
        let i = this.config.plugins[r];
        if (i.spec.filterTransaction && !i.spec.filterTransaction.call(i, e, this))
          return !1;
      }
    return !0;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(e) {
    if (!this.filterTransaction(e))
      return { state: this, transactions: [] };
    let n = [e], r = this.applyInner(e), i = null;
    for (; ; ) {
      let s = !1;
      for (let o = 0; o < this.config.plugins.length; o++) {
        let l = this.config.plugins[o];
        if (l.spec.appendTransaction) {
          let a = i ? i[o].n : 0, c = i ? i[o].state : this, u = a < n.length && l.spec.appendTransaction.call(l, a ? n.slice(a) : n, c, r);
          if (u && r.filterTransaction(u, o)) {
            if (u.setMeta("appendedTransaction", e), !i) {
              i = [];
              for (let d = 0; d < this.config.plugins.length; d++)
                i.push(d < o ? { state: r, n: n.length } : { state: this, n: 0 });
            }
            n.push(u), r = r.applyInner(u), s = !0;
          }
          i && (i[o] = { state: r, n: n.length });
        }
      }
      if (!s)
        return { state: r, transactions: n };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let n = new On(this.config), r = this.config.fields;
    for (let i = 0; i < r.length; i++) {
      let s = r[i];
      n[s.name] = s.apply(e, this[s.name], this, n);
    }
    return n;
  }
  /**
  Accessor that constructs and returns a new [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new bg(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let n = new Js(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new On(n);
    for (let i = 0; i < n.fields.length; i++)
      r[n.fields[i].name] = n.fields[i].init(e, r);
    return r;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(e) {
    let n = new Js(this.schema, e.plugins), r = n.fields, i = new On(n);
    for (let s = 0; s < r.length; s++) {
      let o = r[s].name;
      i[o] = this.hasOwnProperty(o) ? this[o] : r[s].init(e, i);
    }
    return i;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(e) {
    let n = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (n.storedMarks = this.storedMarks.map((r) => r.toJSON())), e && typeof e == "object")
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let i = e[r], s = i.spec.state;
        s && s.toJSON && (n[r] = s.toJSON.call(i, this[i.key]));
      }
    return n;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, n, r) {
    if (!n)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let i = new Js(e.schema, e.plugins), s = new On(i);
    return i.fields.forEach((o) => {
      if (o.name == "doc")
        s.doc = jt.fromJSON(e.schema, n.doc);
      else if (o.name == "selection")
        s.selection = I.fromJSON(s.doc, n.selection);
      else if (o.name == "storedMarks")
        n.storedMarks && (s.storedMarks = n.storedMarks.map(e.schema.markFromJSON));
      else {
        if (r)
          for (let l in r) {
            let a = r[l], c = a.spec.state;
            if (a.key == o.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(n, l)) {
              s[o.name] = c.fromJSON.call(a, e, n[l], s);
              return;
            }
          }
        s[o.name] = o.init(e, s);
      }
    }), s;
  }
}
function Td(t, e, n) {
  for (let r in t) {
    let i = t[r];
    i instanceof Function ? i = i.bind(e) : r == "handleDOMEvents" && (i = Td(i, e, {})), n[r] = i;
  }
  return n;
}
class K {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && Td(e.props, this, this.props), this.key = e.key ? e.key.key : Ed("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const Gs = /* @__PURE__ */ Object.create(null);
function Ed(t) {
  return t in Gs ? t + "$" + ++Gs[t] : (Gs[t] = 0, t + "$");
}
class G {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = Ed(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const Ml = (t, e) => t.selection.empty ? !1 : (e && e(t.tr.deleteSelection().scrollIntoView()), !0);
function Ad(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("backward", t) : n.parentOffset > 0) ? null : n;
}
const Od = (t, e, n) => {
  let r = Ad(t, n);
  if (!r)
    return !1;
  let i = Tl(r);
  if (!i) {
    let o = r.blockRange(), l = o && Wn(o);
    return l == null ? !1 : (e && e(t.tr.lift(o, l).scrollIntoView()), !0);
  }
  let s = i.nodeBefore;
  if ($d(t, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Bn(s, "end") || O.isSelectable(s)))
    for (let o = r.depth; ; o--) {
      let l = xs(t.doc, r.before(o), r.after(o), M.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = t.tr.step(l);
          a.setSelection(Bn(s, "end") ? I.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : O.create(a.doc, i.pos - s.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (o == 1 || r.node(o - 1).childCount > 1)
        break;
    }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(t.tr.delete(i.pos - s.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, kg = (t, e, n) => {
  let r = Ad(t, n);
  if (!r)
    return !1;
  let i = Tl(r);
  return i ? Nd(t, i, e) : !1;
}, xg = (t, e, n) => {
  let r = Rd(t, n);
  if (!r)
    return !1;
  let i = El(r);
  return i ? Nd(t, i, e) : !1;
};
function Nd(t, e, n) {
  let r = e.nodeBefore, i = r, s = e.pos - 1;
  for (; !i.isTextblock; s--) {
    if (i.type.spec.isolating)
      return !1;
    let u = i.lastChild;
    if (!u)
      return !1;
    i = u;
  }
  let o = e.nodeAfter, l = o, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let u = l.firstChild;
    if (!u)
      return !1;
    l = u;
  }
  let c = xs(t.doc, s, a, M.empty);
  if (!c || c.from != s || c instanceof ie && c.slice.size >= a - s)
    return !1;
  if (n) {
    let u = t.tr.step(c);
    u.setSelection(D.create(u.doc, s)), n(u.scrollIntoView());
  }
  return !0;
}
function Bn(t, e, n = !1) {
  for (let r = t; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (n && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Id = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("backward", t) : r.parentOffset > 0)
      return !1;
    s = Tl(r);
  }
  let o = s && s.nodeBefore;
  return !o || !O.isSelectable(o) ? !1 : (e && e(t.tr.setSelection(O.create(t.doc, s.pos - o.nodeSize)).scrollIntoView()), !0);
};
function Tl(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; e >= 0; e--) {
      if (t.index(e) > 0)
        return t.doc.resolve(t.before(e + 1));
      if (t.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Rd(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("forward", t) : n.parentOffset < n.parent.content.size) ? null : n;
}
const Dd = (t, e, n) => {
  let r = Rd(t, n);
  if (!r)
    return !1;
  let i = El(r);
  if (!i)
    return !1;
  let s = i.nodeAfter;
  if ($d(t, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Bn(s, "start") || O.isSelectable(s))) {
    let o = xs(t.doc, r.before(), r.after(), M.empty);
    if (o && o.slice.size < o.to - o.from) {
      if (e) {
        let l = t.tr.step(o);
        l.setSelection(Bn(s, "start") ? I.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : O.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(t.tr.delete(i.pos, i.pos + s.nodeSize).scrollIntoView()), !0) : !1;
}, Pd = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("forward", t) : r.parentOffset < r.parent.content.size)
      return !1;
    s = El(r);
  }
  let o = s && s.nodeAfter;
  return !o || !O.isSelectable(o) ? !1 : (e && e(t.tr.setSelection(O.create(t.doc, s.pos)).scrollIntoView()), !0);
};
function El(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; e >= 0; e--) {
      let n = t.node(e);
      if (t.index(e) + 1 < n.childCount)
        return t.doc.resolve(t.after(e + 1));
      if (n.type.spec.isolating)
        break;
    }
  return null;
}
const Sg = (t, e) => {
  let n = t.selection, r = n instanceof O, i;
  if (r) {
    if (n.node.isTextblock || !Qt(t.doc, n.from))
      return !1;
    i = n.from;
  } else if (i = ks(t.doc, n.from, -1), i == null)
    return !1;
  if (e) {
    let s = t.tr.join(i);
    r && s.setSelection(O.create(s.doc, i - t.doc.resolve(i).nodeBefore.nodeSize)), e(s.scrollIntoView());
  }
  return !0;
}, vg = (t, e) => {
  let n = t.selection, r;
  if (n instanceof O) {
    if (n.node.isTextblock || !Qt(t.doc, n.to))
      return !1;
    r = n.to;
  } else if (r = ks(t.doc, n.to, 1), r == null)
    return !1;
  return e && e(t.tr.join(r).scrollIntoView()), !0;
}, Cg = (t, e) => {
  let { $from: n, $to: r } = t.selection, i = n.blockRange(r), s = i && Wn(i);
  return s == null ? !1 : (e && e(t.tr.lift(i, s).scrollIntoView()), !0);
}, Ld = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (e && e(t.tr.insertText(`
`).scrollIntoView()), !0);
};
function Al(t) {
  for (let e = 0; e < t.edgeCount; e++) {
    let { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs())
      return n;
  }
  return null;
}
const Mg = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  if (!n.parent.type.spec.code || !n.sameParent(r))
    return !1;
  let i = n.node(-1), s = n.indexAfter(-1), o = Al(i.contentMatchAt(s));
  if (!o || !i.canReplaceWith(s, s, o))
    return !1;
  if (e) {
    let l = n.after(), a = t.tr.replaceWith(l, l, o.createAndFill());
    a.setSelection(I.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, Bd = (t, e) => {
  let n = t.selection, { $from: r, $to: i } = n;
  if (n instanceof Ie || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let s = Al(i.parent.contentMatchAt(i.indexAfter()));
  if (!s || !s.isTextblock)
    return !1;
  if (e) {
    let o = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = t.tr.insert(o, s.createAndFill());
    l.setSelection(D.create(l.doc, o + 1)), e(l.scrollIntoView());
  }
  return !0;
}, zd = (t, e) => {
  let { $cursor: n } = t.selection;
  if (!n || n.parent.content.size)
    return !1;
  if (n.depth > 1 && n.after() != n.end(-1)) {
    let s = n.before();
    if (St(t.doc, s))
      return e && e(t.tr.split(s).scrollIntoView()), !0;
  }
  let r = n.blockRange(), i = r && Wn(r);
  return i == null ? !1 : (e && e(t.tr.lift(r, i).scrollIntoView()), !0);
};
function Tg(t) {
  return (e, n) => {
    let { $from: r, $to: i } = e.selection;
    if (e.selection instanceof O && e.selection.node.isBlock)
      return !r.parentOffset || !St(e.doc, r.pos) ? !1 : (n && n(e.tr.split(r.pos).scrollIntoView()), !0);
    if (!r.depth)
      return !1;
    let s = [], o, l, a = !1, c = !1;
    for (let h = r.depth; ; h--)
      if (r.node(h).isBlock) {
        a = r.end(h) == r.pos + (r.depth - h), c = r.start(h) == r.pos - (r.depth - h), l = Al(r.node(h - 1).contentMatchAt(r.indexAfter(h - 1))), s.unshift(a && l ? { type: l } : null), o = h;
        break;
      } else {
        if (h == 1)
          return !1;
        s.unshift(null);
      }
    let u = e.tr;
    (e.selection instanceof D || e.selection instanceof Ie) && u.deleteSelection();
    let d = u.mapping.map(r.pos), f = St(u.doc, d, s.length, s);
    if (f || (s[0] = l ? { type: l } : null, f = St(u.doc, d, s.length, s)), !f)
      return !1;
    if (u.split(d, s.length, s), !a && c && r.node(o).type != l) {
      let h = u.mapping.map(r.before(o)), p = u.doc.resolve(h);
      l && r.node(o - 1).canReplaceWith(p.index(), p.index() + 1, l) && u.setNodeMarkup(u.mapping.map(r.before(o)), l);
    }
    return n && n(u.scrollIntoView()), !0;
  };
}
const Eg = Tg(), Ag = (t, e) => {
  let { $from: n, to: r } = t.selection, i, s = n.sharedDepth(r);
  return s == 0 ? !1 : (i = n.before(s), e && e(t.tr.setSelection(O.create(t.doc, i))), !0);
};
function Og(t, e, n) {
  let r = e.nodeBefore, i = e.nodeAfter, s = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(s - 1, s) ? (n && n(t.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(s, s + 1) || !(i.isTextblock || Qt(t.doc, e.pos)) ? !1 : (n && n(t.tr.join(e.pos).scrollIntoView()), !0);
}
function $d(t, e, n, r) {
  let i = e.nodeBefore, s = e.nodeAfter, o, l, a = i.type.spec.isolating || s.type.spec.isolating;
  if (!a && Og(t, e, n))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (o = (l = i.contentMatchAt(i.childCount)).findWrapping(s.type)) && l.matchType(o[0] || s.type).validEnd) {
    if (n) {
      let h = e.pos + s.nodeSize, p = x.empty;
      for (let y = o.length - 1; y >= 0; y--)
        p = x.from(o[y].create(null, p));
      p = x.from(i.copy(p));
      let m = t.tr.step(new se(e.pos - 1, h, e.pos, h, new M(p, 1, 0), o.length, !0)), g = m.doc.resolve(h + 2 * o.length);
      g.nodeAfter && g.nodeAfter.type == i.type && Qt(m.doc, g.pos) && m.join(g.pos), n(m.scrollIntoView());
    }
    return !0;
  }
  let u = s.type.spec.isolating || r > 0 && a ? null : I.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && Wn(d);
  if (f != null && f >= e.depth)
    return n && n(t.tr.lift(d, f).scrollIntoView()), !0;
  if (c && Bn(s, "start", !0) && Bn(i, "end")) {
    let h = i, p = [];
    for (; p.push(h), !h.isTextblock; )
      h = h.lastChild;
    let m = s, g = 1;
    for (; !m.isTextblock; m = m.firstChild)
      g++;
    if (h.canReplace(h.childCount, h.childCount, m.content)) {
      if (n) {
        let y = x.empty;
        for (let w = p.length - 1; w >= 0; w--)
          y = x.from(p[w].copy(y));
        let b = t.tr.step(new se(e.pos - p.length, e.pos + s.nodeSize, e.pos + g, e.pos + s.nodeSize - g, new M(y, p.length, 0), 0, !0));
        n(b.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function _d(t) {
  return function(e, n) {
    let r = e.selection, i = t < 0 ? r.$from : r.$to, s = i.depth;
    for (; i.node(s).isInline; ) {
      if (!s)
        return !1;
      s--;
    }
    return i.node(s).isTextblock ? (n && n(e.tr.setSelection(D.create(e.doc, t < 0 ? i.start(s) : i.end(s)))), !0) : !1;
  };
}
const Ng = _d(-1), Ig = _d(1);
function Rg(t, e = null) {
  return function(n, r) {
    let { $from: i, $to: s } = n.selection, o = i.blockRange(s), l = o && vl(o, t, e);
    return l ? (r && r(n.tr.wrap(o, l).scrollIntoView()), !0) : !1;
  };
}
function Ga(t, e = null) {
  return function(n, r) {
    let i = !1;
    for (let s = 0; s < n.selection.ranges.length && !i; s++) {
      let { $from: { pos: o }, $to: { pos: l } } = n.selection.ranges[s];
      n.doc.nodesBetween(o, l, (a, c) => {
        if (i)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(t, e)))
          if (a.type == t)
            i = !0;
          else {
            let u = n.doc.resolve(c), d = u.index();
            i = u.parent.canReplaceWith(d, d + 1, t);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let s = n.tr;
      for (let o = 0; o < n.selection.ranges.length; o++) {
        let { $from: { pos: l }, $to: { pos: a } } = n.selection.ranges[o];
        s.setBlockType(l, a, t, e);
      }
      r(s.scrollIntoView());
    }
    return !0;
  };
}
function Ol(...t) {
  return function(e, n, r) {
    for (let i = 0; i < t.length; i++)
      if (t[i](e, n, r))
        return !0;
    return !1;
  };
}
Ol(Ml, Od, Id);
Ol(Ml, Dd, Pd);
Ol(Ld, Bd, zd, Eg);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Dg(t, e = null) {
  return function(n, r) {
    let { $from: i, $to: s } = n.selection, o = i.blockRange(s);
    if (!o)
      return !1;
    let l = r ? n.tr : null;
    return Pg(l, o, t, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Pg(t, e, n, r = null) {
  let i = !1, s = e, o = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(n) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let a = o.resolve(e.start - 2);
    s = new Mi(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new Mi(e.$from, o.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = vl(s, n, r, e);
  return l ? (t && Lg(t, e, l, i, n), !0) : !1;
}
function Lg(t, e, n, r, i) {
  let s = x.empty;
  for (let u = n.length - 1; u >= 0; u--)
    s = x.from(n[u].type.create(n[u].attrs, s));
  t.step(new se(e.start - (r ? 2 : 0), e.end, e.start, e.end, new M(s, 0, 0), n.length, !0));
  let o = 0;
  for (let u = 0; u < n.length; u++)
    n[u].type == i && (o = u + 1);
  let l = n.length - o, a = e.start + n.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && St(t.doc, a, l) && (t.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
  return t;
}
function Bg(t) {
  return function(e, n) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (o) => o.childCount > 0 && o.firstChild.type == t);
    return s ? n ? r.node(s.depth - 1).type == t ? zg(e, n, t, s) : $g(e, n, s) : !0 : !1;
  };
}
function zg(t, e, n, r) {
  let i = t.tr, s = r.end, o = r.$to.end(r.depth);
  s < o && (i.step(new se(s - 1, o, s, o, new M(x.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Mi(i.doc.resolve(r.$from.pos), i.doc.resolve(o), r.depth));
  const l = Wn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.doc.resolve(i.mapping.map(s, -1) - 1);
  return Qt(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function $g(t, e, n) {
  let r = t.tr, i = n.parent;
  for (let h = n.end, p = n.endIndex - 1, m = n.startIndex; p > m; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let s = r.doc.resolve(n.start), o = s.nodeAfter;
  if (r.mapping.map(n.end) != n.start + s.nodeAfter.nodeSize)
    return !1;
  let l = n.startIndex == 0, a = n.endIndex == i.childCount, c = s.node(-1), u = s.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, o.content.append(a ? x.empty : x.from(i))))
    return !1;
  let d = s.pos, f = d + o.nodeSize;
  return r.step(new se(d - (l ? 1 : 0), f + (a ? 1 : 0), d + 1, f - 1, new M((l ? x.empty : x.from(i.copy(x.empty))).append(a ? x.empty : x.from(i.copy(x.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function _g(t) {
  return function(e, n) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == t);
    if (!s)
      return !1;
    let o = s.startIndex;
    if (o == 0)
      return !1;
    let l = s.parent, a = l.child(o - 1);
    if (a.type != t)
      return !1;
    if (n) {
      let c = a.lastChild && a.lastChild.type == l.type, u = x.from(c ? t.create() : null), d = new M(x.from(t.create(null, x.from(l.type.create(null, u)))), c ? 3 : 1, 0), f = s.start, h = s.end;
      n(e.tr.step(new se(f - (c ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
const ce = function(t) {
  for (var e = 0; ; e++)
    if (t = t.previousSibling, !t)
      return e;
}, zn = function(t) {
  let e = t.assignedSlot || t.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let Ro = null;
const yt = function(t, e, n) {
  let r = Ro || (Ro = document.createRange());
  return r.setEnd(t, n ?? t.nodeValue.length), r.setStart(t, e || 0), r;
}, Fg = function() {
  Ro = null;
}, yn = function(t, e, n, r) {
  return n && (Ya(t, e, n, r, -1) || Ya(t, e, n, r, 1));
}, Hg = /^(img|br|input|textarea|hr)$/i;
function Ya(t, e, n, r, i) {
  for (var s; ; ) {
    if (t == n && e == r)
      return !0;
    if (e == (i < 0 ? 0 : $e(t))) {
      let o = t.parentNode;
      if (!o || o.nodeType != 1 || Pr(t) || Hg.test(t.nodeName) || t.contentEditable == "false")
        return !1;
      e = ce(t) + (i < 0 ? 0 : 1), t = o;
    } else if (t.nodeType == 1) {
      let o = t.childNodes[e + (i < 0 ? -1 : 0)];
      if (o.nodeType == 1 && o.contentEditable == "false")
        if (!((s = o.pmViewDesc) === null || s === void 0) && s.ignoreForSelection)
          e += i;
        else
          return !1;
      else
        t = o, e = i < 0 ? $e(t) : 0;
    } else
      return !1;
  }
}
function $e(t) {
  return t.nodeType == 3 ? t.nodeValue.length : t.childNodes.length;
}
function Vg(t, e) {
  for (; ; ) {
    if (t.nodeType == 3 && e)
      return t;
    if (t.nodeType == 1 && e > 0) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[e - 1], e = $e(t);
    } else if (t.parentNode && !Pr(t))
      e = ce(t), t = t.parentNode;
    else
      return null;
  }
}
function jg(t, e) {
  for (; ; ) {
    if (t.nodeType == 3 && e < t.nodeValue.length)
      return t;
    if (t.nodeType == 1 && e < t.childNodes.length) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[e], e = 0;
    } else if (t.parentNode && !Pr(t))
      e = ce(t) + 1, t = t.parentNode;
    else
      return null;
  }
}
function Ug(t, e, n) {
  for (let r = e == 0, i = e == $e(t); r || i; ) {
    if (t == n)
      return !0;
    let s = ce(t);
    if (t = t.parentNode, !t)
      return !1;
    r = r && s == 0, i = i && s == $e(t);
  }
}
function Pr(t) {
  let e;
  for (let n = t; n && !(e = n.pmViewDesc); n = n.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == t || e.contentDOM == t);
}
const vs = function(t) {
  return t.focusNode && yn(t.focusNode, t.focusOffset, t.anchorNode, t.anchorOffset);
};
function rn(t, e) {
  let n = document.createEvent("Event");
  return n.initEvent("keydown", !0, !0), n.keyCode = t, n.key = n.code = e, n;
}
function Wg(t) {
  let e = t.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function Kg(t, e, n) {
  if (t.caretPositionFromPoint)
    try {
      let r = t.caretPositionFromPoint(e, n);
      if (r)
        return { node: r.offsetNode, offset: Math.min($e(r.offsetNode), r.offset) };
    } catch {
    }
  if (t.caretRangeFromPoint) {
    let r = t.caretRangeFromPoint(e, n);
    if (r)
      return { node: r.startContainer, offset: Math.min($e(r.startContainer), r.startOffset) };
  }
}
const ot = typeof navigator < "u" ? navigator : null, Xa = typeof document < "u" ? document : null, Zt = ot && ot.userAgent || "", Do = /Edge\/(\d+)/.exec(Zt), Fd = /MSIE \d/.exec(Zt), Po = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Zt), Ce = !!(Fd || Po || Do), Wt = Fd ? document.documentMode : Po ? +Po[1] : Do ? +Do[1] : 0, He = !Ce && /gecko\/(\d+)/i.test(Zt);
He && +(/Firefox\/(\d+)/.exec(Zt) || [0, 0])[1];
const Lo = !Ce && /Chrome\/(\d+)/.exec(Zt), fe = !!Lo, Hd = Lo ? +Lo[1] : 0, be = !Ce && !!ot && /Apple Computer/.test(ot.vendor), $n = be && (/Mobile\/\w+/.test(Zt) || !!ot && ot.maxTouchPoints > 2), Be = $n || (ot ? /Mac/.test(ot.platform) : !1), qg = ot ? /Win/.test(ot.platform) : !1, kt = /Android \d/.test(Zt), Lr = !!Xa && "webkitFontSmoothing" in Xa.documentElement.style, Jg = Lr ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Gg(t) {
  let e = t.defaultView && t.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: t.documentElement.clientWidth,
    top: 0,
    bottom: t.documentElement.clientHeight
  };
}
function dt(t, e) {
  return typeof t == "number" ? t : t[e];
}
function Yg(t) {
  let e = t.getBoundingClientRect(), n = e.width / t.offsetWidth || 1, r = e.height / t.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + t.clientWidth * n,
    top: e.top,
    bottom: e.top + t.clientHeight * r
  };
}
function Qa(t, e, n) {
  let r = t.someProp("scrollThreshold") || 0, i = t.someProp("scrollMargin") || 5, s = t.dom.ownerDocument;
  for (let o = n || t.dom; o; ) {
    if (o.nodeType != 1) {
      o = zn(o);
      continue;
    }
    let l = o, a = l == s.body, c = a ? Gg(s) : Yg(l), u = 0, d = 0;
    if (e.top < c.top + dt(r, "top") ? d = -(c.top - e.top + dt(i, "top")) : e.bottom > c.bottom - dt(r, "bottom") && (d = e.bottom - e.top > c.bottom - c.top ? e.top + dt(i, "top") - c.top : e.bottom - c.bottom + dt(i, "bottom")), e.left < c.left + dt(r, "left") ? u = -(c.left - e.left + dt(i, "left")) : e.right > c.right - dt(r, "right") && (u = e.right - c.right + dt(i, "right")), u || d)
      if (a)
        s.defaultView.scrollBy(u, d);
      else {
        let h = l.scrollLeft, p = l.scrollTop;
        d && (l.scrollTop += d), u && (l.scrollLeft += u);
        let m = l.scrollLeft - h, g = l.scrollTop - p;
        e = { left: e.left - m, top: e.top - g, right: e.right - m, bottom: e.bottom - g };
      }
    let f = a ? "fixed" : getComputedStyle(o).position;
    if (/^(fixed|sticky)$/.test(f))
      break;
    o = f == "absolute" ? o.offsetParent : zn(o);
  }
}
function Xg(t) {
  let e = t.dom.getBoundingClientRect(), n = Math.max(0, e.top), r, i;
  for (let s = (e.left + e.right) / 2, o = n + 1; o < Math.min(innerHeight, e.bottom); o += 5) {
    let l = t.root.elementFromPoint(s, o);
    if (!l || l == t.dom || !t.dom.contains(l))
      continue;
    let a = l.getBoundingClientRect();
    if (a.top >= n - 20) {
      r = l, i = a.top;
      break;
    }
  }
  return { refDOM: r, refTop: i, stack: Vd(t.dom) };
}
function Vd(t) {
  let e = [], n = t.ownerDocument;
  for (let r = t; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), t != n); r = zn(r))
    ;
  return e;
}
function Qg({ refDOM: t, refTop: e, stack: n }) {
  let r = t ? t.getBoundingClientRect().top : 0;
  jd(n, r == 0 ? 0 : r - e);
}
function jd(t, e) {
  for (let n = 0; n < t.length; n++) {
    let { dom: r, top: i, left: s } = t[n];
    r.scrollTop != i + e && (r.scrollTop = i + e), r.scrollLeft != s && (r.scrollLeft = s);
  }
}
let xn = null;
function Zg(t) {
  if (t.setActive)
    return t.setActive();
  if (xn)
    return t.focus(xn);
  let e = Vd(t);
  t.focus(xn == null ? {
    get preventScroll() {
      return xn = { preventScroll: !0 }, !0;
    }
  } : void 0), xn || (xn = !1, jd(e, 0));
}
function Ud(t, e) {
  let n, r = 2e8, i, s = 0, o = e.top, l = e.top, a, c;
  for (let u = t.firstChild, d = 0; u; u = u.nextSibling, d++) {
    let f;
    if (u.nodeType == 1)
      f = u.getClientRects();
    else if (u.nodeType == 3)
      f = yt(u).getClientRects();
    else
      continue;
    for (let h = 0; h < f.length; h++) {
      let p = f[h];
      if (p.top <= o && p.bottom >= l) {
        o = Math.max(p.bottom, o), l = Math.min(p.top, l);
        let m = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
        if (m < r) {
          n = u, r = m, i = m && n.nodeType == 3 ? {
            left: p.right < e.left ? p.right : p.left,
            top: e.top
          } : e, u.nodeType == 1 && m && (s = d + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
          continue;
        }
      } else p.top > e.top && !a && p.left <= e.left && p.right >= e.left && (a = u, c = { left: Math.max(p.left, Math.min(p.right, e.left)), top: p.top });
      !n && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (s = d + 1);
    }
  }
  return !n && a && (n = a, i = c, r = 0), n && n.nodeType == 3 ? ey(n, i) : !n || r && n.nodeType == 1 ? { node: t, offset: s } : Ud(n, i);
}
function ey(t, e) {
  let n = t.nodeValue.length, r = document.createRange();
  for (let i = 0; i < n; i++) {
    r.setEnd(t, i + 1), r.setStart(t, i);
    let s = Ot(r, 1);
    if (s.top != s.bottom && Nl(e, s))
      return { node: t, offset: i + (e.left >= (s.left + s.right) / 2 ? 1 : 0) };
  }
  return { node: t, offset: 0 };
}
function Nl(t, e) {
  return t.left >= e.left - 1 && t.left <= e.right + 1 && t.top >= e.top - 1 && t.top <= e.bottom + 1;
}
function ty(t, e) {
  let n = t.parentNode;
  return n && /^li$/i.test(n.nodeName) && e.left < t.getBoundingClientRect().left ? n : t;
}
function ny(t, e, n) {
  let { node: r, offset: i } = Ud(e, n), s = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let o = r.getBoundingClientRect();
    s = o.left != o.right && n.left > (o.left + o.right) / 2 ? 1 : -1;
  }
  return t.docView.posFromDOM(r, i, s);
}
function ry(t, e, n, r) {
  let i = -1;
  for (let s = e, o = !1; s != t.dom; ) {
    let l = t.docView.nearestDesc(s, !0), a;
    if (!l)
      return null;
    if (l.dom.nodeType == 1 && (l.node.isBlock && l.parent || !l.contentDOM) && // Ignore elements with zero-size bounding rectangles
    ((a = l.dom.getBoundingClientRect()).width || a.height) && (l.node.isBlock && l.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(l.dom.nodeName) && (!o && a.left > r.left || a.top > r.top ? i = l.posBefore : (!o && a.right < r.left || a.bottom < r.top) && (i = l.posAfter), o = !0), !l.contentDOM && i < 0 && !l.node.isText))
      return (l.node.isBlock ? r.top < (a.top + a.bottom) / 2 : r.left < (a.left + a.right) / 2) ? l.posBefore : l.posAfter;
    s = l.dom.parentNode;
  }
  return i > -1 ? i : t.docView.posFromDOM(e, n, -1);
}
function Wd(t, e, n) {
  let r = t.childNodes.length;
  if (r && n.top < n.bottom)
    for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - n.top) / (n.bottom - n.top)) - 2)), s = i; ; ) {
      let o = t.childNodes[s];
      if (o.nodeType == 1) {
        let l = o.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let c = l[a];
          if (Nl(e, c))
            return Wd(o, e, c);
        }
      }
      if ((s = (s + 1) % r) == i)
        break;
    }
  return t;
}
function iy(t, e) {
  let n = t.dom.ownerDocument, r, i = 0, s = Kg(n, e.left, e.top);
  s && ({ node: r, offset: i } = s);
  let o = (t.root.elementFromPoint ? t.root : n).elementFromPoint(e.left, e.top), l;
  if (!o || !t.dom.contains(o.nodeType != 1 ? o.parentNode : o)) {
    let c = t.dom.getBoundingClientRect();
    if (!Nl(e, c) || (o = Wd(t.dom, e, c), !o))
      return null;
  }
  if (be)
    for (let c = o; r && c; c = zn(c))
      c.draggable && (r = void 0);
  if (o = ty(o, e), r) {
    if (He && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
      let u = r.childNodes[i], d;
      u.nodeName == "IMG" && (d = u.getBoundingClientRect()).right <= e.left && d.bottom > e.top && i++;
    }
    let c;
    Lr && i && r.nodeType == 1 && (c = r.childNodes[i - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && i--, r == t.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? l = t.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (l = ry(t, r, i, e));
  }
  l == null && (l = ny(t, o, e));
  let a = t.docView.nearestDesc(o, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function Za(t) {
  return t.top < t.bottom || t.left < t.right;
}
function Ot(t, e) {
  let n = t.getClientRects();
  if (n.length) {
    let r = n[e < 0 ? 0 : n.length - 1];
    if (Za(r))
      return r;
  }
  return Array.prototype.find.call(n, Za) || t.getBoundingClientRect();
}
const sy = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function Kd(t, e, n) {
  let { node: r, offset: i, atom: s } = t.docView.domFromPos(e, n < 0 ? -1 : 1), o = Lr || He;
  if (r.nodeType == 3)
    if (o && (sy.test(r.nodeValue) || (n < 0 ? !i : i == r.nodeValue.length))) {
      let a = Ot(yt(r, i, i), n);
      if (He && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
        let c = Ot(yt(r, i - 1, i - 1), -1);
        if (c.top == a.top) {
          let u = Ot(yt(r, i, i + 1), -1);
          if (u.top != a.top)
            return Gn(u, u.left < c.left);
        }
      }
      return a;
    } else {
      let a = i, c = i, u = n < 0 ? 1 : -1;
      return n < 0 && !i ? (c++, u = -1) : n >= 0 && i == r.nodeValue.length ? (a--, u = 1) : n < 0 ? a-- : c++, Gn(Ot(yt(r, a, c), u), u < 0);
    }
  if (!t.state.doc.resolve(e - (s || 0)).parent.inlineContent) {
    if (s == null && i && (n < 0 || i == $e(r))) {
      let a = r.childNodes[i - 1];
      if (a.nodeType == 1)
        return Ys(a.getBoundingClientRect(), !1);
    }
    if (s == null && i < $e(r)) {
      let a = r.childNodes[i];
      if (a.nodeType == 1)
        return Ys(a.getBoundingClientRect(), !0);
    }
    return Ys(r.getBoundingClientRect(), n >= 0);
  }
  if (s == null && i && (n < 0 || i == $e(r))) {
    let a = r.childNodes[i - 1], c = a.nodeType == 3 ? yt(a, $e(a) - (o ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
    if (c)
      return Gn(Ot(c, 1), !1);
  }
  if (s == null && i < $e(r)) {
    let a = r.childNodes[i];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
      a = a.nextSibling;
    let c = a ? a.nodeType == 3 ? yt(a, 0, o ? 0 : 1) : a.nodeType == 1 ? a : null : null;
    if (c)
      return Gn(Ot(c, -1), !0);
  }
  return Gn(Ot(r.nodeType == 3 ? yt(r) : r, -n), n >= 0);
}
function Gn(t, e) {
  if (t.width == 0)
    return t;
  let n = e ? t.left : t.right;
  return { top: t.top, bottom: t.bottom, left: n, right: n };
}
function Ys(t, e) {
  if (t.height == 0)
    return t;
  let n = e ? t.top : t.bottom;
  return { top: n, bottom: n, left: t.left, right: t.right };
}
function qd(t, e, n) {
  let r = t.state, i = t.root.activeElement;
  r != e && t.updateState(e), i != t.dom && t.focus();
  try {
    return n();
  } finally {
    r != e && t.updateState(r), i != t.dom && i && i.focus();
  }
}
function oy(t, e, n) {
  let r = e.selection, i = n == "up" ? r.$from : r.$to;
  return qd(t, e, () => {
    let { node: s } = t.docView.domFromPos(i.pos, n == "up" ? -1 : 1);
    for (; ; ) {
      let l = t.docView.nearestDesc(s, !0);
      if (!l)
        break;
      if (l.node.isBlock) {
        s = l.contentDOM || l.dom;
        break;
      }
      s = l.dom.parentNode;
    }
    let o = Kd(t, i.pos, 1);
    for (let l = s.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1)
        a = l.getClientRects();
      else if (l.nodeType == 3)
        a = yt(l, 0, l.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < a.length; c++) {
        let u = a[c];
        if (u.bottom > u.top + 1 && (n == "up" ? o.top - u.top > (u.bottom - o.top) * 2 : u.bottom - o.bottom > (o.bottom - u.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const ly = /[\u0590-\u08ac]/;
function ay(t, e, n) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let i = r.parentOffset, s = !i, o = i == r.parent.content.size, l = t.domSelection();
  return l ? !ly.test(r.parent.textContent) || !l.modify ? n == "left" || n == "backward" ? s : o : qd(t, e, () => {
    let { focusNode: a, focusOffset: c, anchorNode: u, anchorOffset: d } = t.domSelectionRange(), f = l.caretBidiLevel;
    l.modify("move", n, "character");
    let h = r.depth ? t.docView.domAfterPos(r.before()) : t.dom, { focusNode: p, focusOffset: m } = t.domSelectionRange(), g = p && !h.contains(p.nodeType == 1 ? p : p.parentNode) || a == p && c == m;
    try {
      l.collapse(u, d), a && (a != u || c != d) && l.extend && l.extend(a, c);
    } catch {
    }
    return f != null && (l.caretBidiLevel = f), g;
  }) : r.pos == r.start() || r.pos == r.end();
}
let ec = null, tc = null, nc = !1;
function cy(t, e, n) {
  return ec == e && tc == n ? nc : (ec = e, tc = n, nc = n == "up" || n == "down" ? oy(t, e, n) : ay(t, e, n));
}
const Ve = 0, rc = 1, on = 2, lt = 3;
class Br {
  constructor(e, n, r, i) {
    this.parent = e, this.children = n, this.dom = r, this.contentDOM = i, this.dirty = Ve, r.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, n, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  // When parsing in-editor content (in domchange.js), we allow
  // descriptions to determine the parse rules that should be used to
  // parse them.
  parseRule() {
    return null;
  }
  // Used by the editor's event handler to ignore events that come
  // from certain descs.
  stopEvent(e) {
    return !1;
  }
  // The size of the content represented by this desc.
  get size() {
    let e = 0;
    for (let n = 0; n < this.children.length; n++)
      e += this.children[n].size;
    return e;
  }
  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let n = 0, r = this.posAtStart; ; n++) {
      let i = this.children[n];
      if (i == e)
        return r;
      r += i.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, n, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[n - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.previousSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.previousSibling;
        return s ? this.posBeforeChild(o) + o.size : this.posAtStart;
      } else {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[n];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.nextSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.nextSibling;
        return s ? this.posBeforeChild(o) : this.posAtEnd;
      }
    let i;
    if (e == this.dom && this.contentDOM)
      i = n > ce(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      i = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (n == 0)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !1;
            break;
          }
          if (s.previousSibling)
            break;
        }
      if (i == null && n == e.childNodes.length)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !0;
            break;
          }
          if (s.nextSibling)
            break;
        }
    }
    return i ?? r > 0 ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, n = !1) {
    for (let r = !0, i = e; i; i = i.parentNode) {
      let s = this.getDesc(i), o;
      if (s && (!n || s.node))
        if (r && (o = s.nodeDOM) && !(o.nodeType == 1 ? o.contains(e.nodeType == 1 ? e : e.parentNode) : o == e))
          r = !1;
        else
          return s;
    }
  }
  getDesc(e) {
    let n = e.pmViewDesc;
    for (let r = n; r; r = r.parent)
      if (r == this)
        return n;
  }
  posFromDOM(e, n, r) {
    for (let i = e; i; i = i.parentNode) {
      let s = this.getDesc(i);
      if (s)
        return s.localPosFromDOM(e, n, r);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let n = 0, r = 0; n < this.children.length; n++) {
      let i = this.children[n], s = r + i.size;
      if (r == e && s != r) {
        for (; !i.border && i.children.length; )
          for (let o = 0; o < i.children.length; o++) {
            let l = i.children[o];
            if (l.size) {
              i = l;
              break;
            }
          }
        return i;
      }
      if (e < s)
        return i.descAt(e - r - i.border);
      r = s;
    }
  }
  domFromPos(e, n) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, i = 0;
    for (let s = 0; r < this.children.length; r++) {
      let o = this.children[r], l = s + o.size;
      if (l > e || o instanceof Gd) {
        i = e - s;
        break;
      }
      s = l;
    }
    if (i)
      return this.children[r].domFromPos(i - this.children[r].border, n);
    for (let s; r && !(s = this.children[r - 1]).size && s instanceof Jd && s.side >= 0; r--)
      ;
    if (n <= 0) {
      let s, o = !0;
      for (; s = r ? this.children[r - 1] : null, !(!s || s.dom.parentNode == this.contentDOM); r--, o = !1)
        ;
      return s && n && o && !s.border && !s.domAtom ? s.domFromPos(s.size, n) : { node: this.contentDOM, offset: s ? ce(s.dom) + 1 : 0 };
    } else {
      let s, o = !0;
      for (; s = r < this.children.length ? this.children[r] : null, !(!s || s.dom.parentNode == this.contentDOM); r++, o = !1)
        ;
      return s && o && !s.border && !s.domAtom ? s.domFromPos(0, n) : { node: this.contentDOM, offset: s ? ce(s.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, n, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: n, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let i = -1, s = -1;
    for (let o = r, l = 0; ; l++) {
      let a = this.children[l], c = o + a.size;
      if (i == -1 && e <= c) {
        let u = o + a.border;
        if (e >= u && n <= c - a.border && a.node && a.contentDOM && this.contentDOM.contains(a.contentDOM))
          return a.parseRange(e, n, u);
        e = o;
        for (let d = l; d > 0; d--) {
          let f = this.children[d - 1];
          if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(1)) {
            i = ce(f.dom) + 1;
            break;
          }
          e -= f.size;
        }
        i == -1 && (i = 0);
      }
      if (i > -1 && (c > n || l == this.children.length - 1)) {
        n = c;
        for (let u = l + 1; u < this.children.length; u++) {
          let d = this.children[u];
          if (d.size && d.dom.parentNode == this.contentDOM && !d.emptyChildAt(-1)) {
            s = ce(d.dom);
            break;
          }
          n += d.size;
        }
        s == -1 && (s = this.contentDOM.childNodes.length);
        break;
      }
      o = c;
    }
    return { node: this.contentDOM, from: e, to: n, fromOffset: i, toOffset: s };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let n = this.children[e < 0 ? 0 : this.children.length - 1];
    return n.size == 0 || n.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: n, offset: r } = this.domFromPos(e, 0);
    if (n.nodeType != 1 || r == n.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return n.childNodes[r];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, n, r, i = !1) {
    let s = Math.min(e, n), o = Math.max(e, n);
    for (let h = 0, p = 0; h < this.children.length; h++) {
      let m = this.children[h], g = p + m.size;
      if (s > p && o < g)
        return m.setSelection(e - p - m.border, n - p - m.border, r, i);
      p = g;
    }
    let l = this.domFromPos(e, e ? -1 : 1), a = n == e ? l : this.domFromPos(n, n ? -1 : 1), c = r.root.getSelection(), u = r.domSelectionRange(), d = !1;
    if ((He || be) && e == n) {
      let { node: h, offset: p } = l;
      if (h.nodeType == 3) {
        if (d = !!(p && h.nodeValue[p - 1] == `
`), d && p == h.nodeValue.length)
          for (let m = h, g; m; m = m.parentNode) {
            if (g = m.nextSibling) {
              g.nodeName == "BR" && (l = a = { node: g.parentNode, offset: ce(g) + 1 });
              break;
            }
            let y = m.pmViewDesc;
            if (y && y.node && y.node.isBlock)
              break;
          }
      } else {
        let m = h.childNodes[p - 1];
        d = m && (m.nodeName == "BR" || m.contentEditable == "false");
      }
    }
    if (He && u.focusNode && u.focusNode != a.node && u.focusNode.nodeType == 1) {
      let h = u.focusNode.childNodes[u.focusOffset];
      h && h.contentEditable == "false" && (i = !0);
    }
    if (!(i || d && be) && yn(l.node, l.offset, u.anchorNode, u.anchorOffset) && yn(a.node, a.offset, u.focusNode, u.focusOffset))
      return;
    let f = !1;
    if ((c.extend || e == n) && !(d && He)) {
      c.collapse(l.node, l.offset);
      try {
        e != n && c.extend(a.node, a.offset), f = !0;
      } catch {
      }
    }
    if (!f) {
      if (e > n) {
        let p = l;
        l = a, a = p;
      }
      let h = document.createRange();
      h.setEnd(a.node, a.offset), h.setStart(l.node, l.offset), c.removeAllRanges(), c.addRange(h);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(e, n) {
    for (let r = 0, i = 0; i < this.children.length; i++) {
      let s = this.children[i], o = r + s.size;
      if (r == o ? e <= o && n >= r : e < o && n > r) {
        let l = r + s.border, a = o - s.border;
        if (e >= l && n <= a) {
          this.dirty = e == r || n == o ? on : rc, e == l && n == a && (s.contentLost || s.dom.parentNode != this.contentDOM) ? s.dirty = lt : s.markDirty(e - l, n - l);
          return;
        } else
          s.dirty = s.dom == s.contentDOM && s.dom.parentNode == this.contentDOM && !s.children.length ? on : lt;
      }
      r = o;
    }
    this.dirty = on;
  }
  markParentsDirty() {
    let e = 1;
    for (let n = this.parent; n; n = n.parent, e++) {
      let r = e == 1 ? on : rc;
      n.dirty < r && (n.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  get ignoreForSelection() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class Jd extends Br {
  constructor(e, n, r, i) {
    let s, o = n.type.toDOM;
    if (typeof o == "function" && (o = o(r, () => {
      if (!s)
        return i;
      if (s.parent)
        return s.parent.posBeforeChild(s);
    })), !n.type.spec.raw) {
      if (o.nodeType != 1) {
        let l = document.createElement("span");
        l.appendChild(o), o = l;
      }
      o.contentEditable = "false", o.classList.add("ProseMirror-widget");
    }
    super(e, [], o, null), this.widget = n, this.widget = n, s = this;
  }
  matchesWidget(e) {
    return this.dirty == Ve && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let n = this.widget.spec.stopEvent;
    return n ? n(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get ignoreForSelection() {
    return !!this.widget.type.spec.relaxedSide;
  }
  get side() {
    return this.widget.type.side;
  }
}
class uy extends Br {
  constructor(e, n, r, i) {
    super(e, [], n, null), this.textDOM = r, this.text = i;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, n) {
    return e != this.textDOM ? this.posAtStart + (n ? this.size : 0) : this.posAtStart + n;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class bn extends Br {
  constructor(e, n, r, i, s) {
    super(e, [], r, i), this.mark = n, this.spec = s;
  }
  static create(e, n, r, i) {
    let s = i.nodeViews[n.type.name], o = s && s(n, i, r);
    return (!o || !o.dom) && (o = wn.renderSpec(document, n.type.spec.toDOM(n, r), null, n.attrs)), new bn(e, n, o.dom, o.contentDOM || o.dom, o);
  }
  parseRule() {
    return this.dirty & lt || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != lt && this.mark.eq(e);
  }
  markDirty(e, n) {
    if (super.markDirty(e, n), this.dirty != Ve) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = Ve;
    }
  }
  slice(e, n, r) {
    let i = bn.create(this.parent, this.mark, !0, r), s = this.children, o = this.size;
    n < o && (s = zo(s, n, o, r)), e > 0 && (s = zo(s, 0, e, r));
    for (let l = 0; l < s.length; l++)
      s[l].parent = i;
    return i.children = s, i;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
}
class Kt extends Br {
  constructor(e, n, r, i, s, o, l, a, c) {
    super(e, [], s, o), this.node = n, this.outerDeco = r, this.innerDeco = i, this.nodeDOM = l;
  }
  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finicky
  // implementation details to the user code that they probably will
  // never need.)
  static create(e, n, r, i, s, o) {
    let l = s.nodeViews[n.type.name], a, c = l && l(n, s, () => {
      if (!a)
        return o;
      if (a.parent)
        return a.parent.posBeforeChild(a);
    }, r, i), u = c && c.dom, d = c && c.contentDOM;
    if (n.isText) {
      if (!u)
        u = document.createTextNode(n.text);
      else if (u.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else u || ({ dom: u, contentDOM: d } = wn.renderSpec(document, n.type.spec.toDOM(n), null, n.attrs));
    !d && !n.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), n.type.spec.draggable && (u.draggable = !0));
    let f = u;
    return u = Qd(u, r, n), c ? a = new dy(e, n, r, i, u, d || null, f, c, s, o + 1) : n.isText ? new Cs(e, n, r, i, u, f, s) : new Kt(e, n, r, i, u, d || null, f, s, o + 1);
  }
  parseRule() {
    if (this.node.type.spec.reparseInView)
      return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM)
      e.getContent = () => this.node.content;
    else if (!this.contentLost)
      e.contentElement = this.contentDOM;
    else {
      for (let n = this.children.length - 1; n >= 0; n--) {
        let r = this.children[n];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => x.empty);
    }
    return e;
  }
  matchesNode(e, n, r) {
    return this.dirty == Ve && e.eq(this.node) && Ei(n, this.outerDeco) && r.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  updateChildren(e, n) {
    let r = this.node.inlineContent, i = n, s = e.composing ? this.localCompositionInfo(e, n) : null, o = s && s.pos > -1 ? s : null, l = s && s.pos < 0, a = new hy(this, o && o.node, e);
    gy(this.node, this.innerDeco, (c, u, d) => {
      c.spec.marks ? a.syncToMarks(c.spec.marks, r, e) : c.type.side >= 0 && !d && a.syncToMarks(u == this.node.childCount ? $.none : this.node.child(u).marks, r, e), a.placeWidget(c, e, i);
    }, (c, u, d, f) => {
      a.syncToMarks(c.marks, r, e);
      let h;
      a.findNodeMatch(c, u, d, f) || l && e.state.selection.from > i && e.state.selection.to < i + c.nodeSize && (h = a.findIndexWithChild(s.node)) > -1 && a.updateNodeAt(c, u, d, h, e) || a.updateNextNode(c, u, d, e, f, i) || a.addNode(c, u, d, e, i), i += c.nodeSize;
    }), a.syncToMarks([], r, e), this.node.isTextblock && a.addTextblockHacks(), a.destroyRest(), (a.changed || this.dirty == on) && (o && this.protectLocalComposition(e, o), Yd(this.contentDOM, this.children, e), $n && yy(this.dom));
  }
  localCompositionInfo(e, n) {
    let { from: r, to: i } = e.state.selection;
    if (!(e.state.selection instanceof D) || r < n || i > n + this.node.content.size)
      return null;
    let s = e.input.compositionNode;
    if (!s || !this.dom.contains(s.parentNode))
      return null;
    if (this.node.inlineContent) {
      let o = s.nodeValue, l = by(this.node.content, o, r - n, i - n);
      return l < 0 ? null : { node: s, pos: l, text: o };
    } else
      return { node: s, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: n, pos: r, text: i }) {
    if (this.getDesc(n))
      return;
    let s = n;
    for (; s.parentNode != this.contentDOM; s = s.parentNode) {
      for (; s.previousSibling; )
        s.parentNode.removeChild(s.previousSibling);
      for (; s.nextSibling; )
        s.parentNode.removeChild(s.nextSibling);
      s.pmViewDesc && (s.pmViewDesc = void 0);
    }
    let o = new uy(this, s, n, i);
    e.input.compositionNodes.push(o), this.children = zo(this.children, r, r + i.length, e, o);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, n, r, i) {
    return this.dirty == lt || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, n, r, i), !0);
  }
  updateInner(e, n, r, i) {
    this.updateOuterDeco(n), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(i, this.posAtStart), this.dirty = Ve;
  }
  updateOuterDeco(e) {
    if (Ei(e, this.outerDeco))
      return;
    let n = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = Xd(this.dom, this.nodeDOM, Bo(this.outerDeco, this.node, n), Bo(e, this.node, n)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.nodeDOM.draggable = !0));
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.nodeDOM.removeAttribute("draggable"));
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function ic(t, e, n, r, i) {
  Qd(r, e, t);
  let s = new Kt(void 0, t, e, n, r, r, r, i, 0);
  return s.contentDOM && s.updateChildren(i, 0), s;
}
class Cs extends Kt {
  constructor(e, n, r, i, s, o, l) {
    super(e, n, r, i, s, null, o, l, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, n, r, i) {
    return this.dirty == lt || this.dirty != Ve && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(n), (this.dirty != Ve || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, i.trackWrites == this.nodeDOM && (i.trackWrites = null)), this.node = e, this.dirty = Ve, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let n = this.nodeDOM; n; n = n.parentNode)
      if (n == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, n, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(n, this.node.text.length) : super.localPosFromDOM(e, n, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, n, r) {
    let i = this.node.cut(e, n), s = document.createTextNode(i.text);
    return new Cs(this.parent, i, this.outerDeco, this.innerDeco, s, s, r);
  }
  markDirty(e, n) {
    super.markDirty(e, n), this.dom != this.nodeDOM && (e == 0 || n == this.nodeDOM.nodeValue.length) && (this.dirty = lt);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class Gd extends Br {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == Ve && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class dy extends Kt {
  constructor(e, n, r, i, s, o, l, a, c, u) {
    super(e, n, r, i, s, o, l, c, u), this.spec = a;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, n, r, i) {
    if (this.dirty == lt)
      return !1;
    if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
      let s = this.spec.update(e, n, r);
      return s && this.updateInner(e, n, r, i), s;
    } else return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, n, r, i);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, n, r, i) {
    this.spec.setSelection ? this.spec.setSelection(e, n, r.root) : super.setSelection(e, n, r, i);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function Yd(t, e, n) {
  let r = t.firstChild, i = !1;
  for (let s = 0; s < e.length; s++) {
    let o = e[s], l = o.dom;
    if (l.parentNode == t) {
      for (; l != r; )
        r = sc(r), i = !0;
      r = r.nextSibling;
    } else
      i = !0, t.insertBefore(l, r);
    if (o instanceof bn) {
      let a = r ? r.previousSibling : t.lastChild;
      Yd(o.contentDOM, o.children, n), r = a ? a.nextSibling : t.firstChild;
    }
  }
  for (; r; )
    r = sc(r), i = !0;
  i && n.trackWrites == t && (n.trackWrites = null);
}
const ar = function(t) {
  t && (this.nodeName = t);
};
ar.prototype = /* @__PURE__ */ Object.create(null);
const ln = [new ar()];
function Bo(t, e, n) {
  if (t.length == 0)
    return ln;
  let r = n ? ln[0] : new ar(), i = [r];
  for (let s = 0; s < t.length; s++) {
    let o = t[s].type.attrs;
    if (o) {
      o.nodeName && i.push(r = new ar(o.nodeName));
      for (let l in o) {
        let a = o[l];
        a != null && (n && i.length == 1 && i.push(r = new ar(e.isInline ? "span" : "div")), l == "class" ? r.class = (r.class ? r.class + " " : "") + a : l == "style" ? r.style = (r.style ? r.style + ";" : "") + a : l != "nodeName" && (r[l] = a));
      }
    }
  }
  return i;
}
function Xd(t, e, n, r) {
  if (n == ln && r == ln)
    return e;
  let i = e;
  for (let s = 0; s < r.length; s++) {
    let o = r[s], l = n[s];
    if (s) {
      let a;
      l && l.nodeName == o.nodeName && i != t && (a = i.parentNode) && a.nodeName.toLowerCase() == o.nodeName || (a = document.createElement(o.nodeName), a.pmIsDeco = !0, a.appendChild(i), l = ln[0]), i = a;
    }
    fy(i, l || ln[0], o);
  }
  return i;
}
function fy(t, e, n) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in n) && t.removeAttribute(r);
  for (let r in n)
    r != "class" && r != "style" && r != "nodeName" && n[r] != e[r] && t.setAttribute(r, n[r]);
  if (e.class != n.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], i = n.class ? n.class.split(" ").filter(Boolean) : [];
    for (let s = 0; s < r.length; s++)
      i.indexOf(r[s]) == -1 && t.classList.remove(r[s]);
    for (let s = 0; s < i.length; s++)
      r.indexOf(i[s]) == -1 && t.classList.add(i[s]);
    t.classList.length == 0 && t.removeAttribute("class");
  }
  if (e.style != n.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, i;
      for (; i = r.exec(e.style); )
        t.style.removeProperty(i[1]);
    }
    n.style && (t.style.cssText += n.style);
  }
}
function Qd(t, e, n) {
  return Xd(t, t, ln, Bo(e, n, t.nodeType != 1));
}
function Ei(t, e) {
  if (t.length != e.length)
    return !1;
  for (let n = 0; n < t.length; n++)
    if (!t[n].type.eq(e[n].type))
      return !1;
  return !0;
}
function sc(t) {
  let e = t.nextSibling;
  return t.parentNode.removeChild(t), e;
}
class hy {
  constructor(e, n, r) {
    this.lock = n, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = py(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, n) {
    if (e != n) {
      for (let r = e; r < n; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, n - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, n, r) {
    let i = 0, s = this.stack.length >> 1, o = Math.min(s, e.length);
    for (; i < o && (i == s - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1; )
      i++;
    for (; i < s; )
      this.destroyRest(), this.top.dirty = Ve, this.index = this.stack.pop(), this.top = this.stack.pop(), s--;
    for (; s < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let l = -1;
      for (let a = this.index; a < Math.min(this.index + 3, this.top.children.length); a++) {
        let c = this.top.children[a];
        if (c.matchesMark(e[s]) && !this.isLocked(c.dom)) {
          l = a;
          break;
        }
      }
      if (l > -1)
        l > this.index && (this.changed = !0, this.destroyBetween(this.index, l)), this.top = this.top.children[this.index];
      else {
        let a = bn.create(this.top, e[s], n, r);
        this.top.children.splice(this.index, 0, a), this.top = a, this.changed = !0;
      }
      this.index = 0, s++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, n, r, i) {
    let s = -1, o;
    if (i >= this.preMatch.index && (o = this.preMatch.matches[i - this.preMatch.index]).parent == this.top && o.matchesNode(e, n, r))
      s = this.top.children.indexOf(o, this.index);
    else
      for (let l = this.index, a = Math.min(this.top.children.length, l + 5); l < a; l++) {
        let c = this.top.children[l];
        if (c.matchesNode(e, n, r) && !this.preMatch.matched.has(c)) {
          s = l;
          break;
        }
      }
    return s < 0 ? !1 : (this.destroyBetween(this.index, s), this.index++, !0);
  }
  updateNodeAt(e, n, r, i, s) {
    let o = this.top.children[i];
    return o.dirty == lt && o.dom == o.contentDOM && (o.dirty = on), o.update(e, n, r, s) ? (this.destroyBetween(this.index, i), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let n = e.parentNode;
      if (!n)
        return -1;
      if (n == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let i = this.index; i < this.top.children.length; i++)
            if (this.top.children[i] == r)
              return i;
        }
        return -1;
      }
      e = n;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, n, r, i, s, o) {
    for (let l = this.index; l < this.top.children.length; l++) {
      let a = this.top.children[l];
      if (a instanceof Kt) {
        let c = this.preMatch.matched.get(a);
        if (c != null && c != s)
          return !1;
        let u = a.dom, d, f = this.isLocked(u) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != lt && Ei(n, a.outerDeco));
        if (!f && a.update(e, n, r, i))
          return this.destroyBetween(this.index, l), a.dom != u && (this.changed = !0), this.index++, !0;
        if (!f && (d = this.recreateWrapper(a, e, n, r, i, o)))
          return this.destroyBetween(this.index, l), this.top.children[this.index] = d, d.contentDOM && (d.dirty = on, d.updateChildren(i, o + 1), d.dirty = Ve), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, n, r, i, s, o) {
    if (e.dirty || n.isAtom || !e.children.length || !e.node.content.eq(n.content) || !Ei(r, e.outerDeco) || !i.eq(e.innerDeco))
      return null;
    let l = Kt.create(this.top, n, r, i, s, o);
    if (l.contentDOM) {
      l.children = e.children, e.children = [];
      for (let a of l.children)
        a.parent = l;
    }
    return e.destroy(), l;
  }
  // Insert the node as a newly created node desc.
  addNode(e, n, r, i, s) {
    let o = Kt.create(this.top, e, n, r, i, s);
    o.contentDOM && o.updateChildren(i, s + 1), this.top.children.splice(this.index++, 0, o), this.changed = !0;
  }
  placeWidget(e, n, r) {
    let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let s = new Jd(this.top, e, n, r);
      this.top.children.splice(this.index++, 0, s), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], n = this.top;
    for (; e instanceof bn; )
      n = e, e = n.children[n.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof Cs) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((be || fe) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", n), this.addHackNode("BR", this.top));
  }
  addHackNode(e, n) {
    if (n == this.top && this.index < n.children.length && n.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let i = new Gd(this.top, [], r, null);
      n != this.top ? n.children.push(i) : n.children.splice(this.index++, 0, i), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function py(t, e) {
  let n = e, r = n.children.length, i = t.childCount, s = /* @__PURE__ */ new Map(), o = [];
  e: for (; i > 0; ) {
    let l;
    for (; ; )
      if (r) {
        let c = n.children[r - 1];
        if (c instanceof bn)
          n = c, r = c.children.length;
        else {
          l = c, r--;
          break;
        }
      } else {
        if (n == e)
          break e;
        r = n.parent.children.indexOf(n), n = n.parent;
      }
    let a = l.node;
    if (a) {
      if (a != t.child(i - 1))
        break;
      --i, s.set(l, i), o.push(l);
    }
  }
  return { index: i, matched: s, matches: o.reverse() };
}
function my(t, e) {
  return t.type.side - e.type.side;
}
function gy(t, e, n, r) {
  let i = e.locals(t), s = 0;
  if (i.length == 0) {
    for (let c = 0; c < t.childCount; c++) {
      let u = t.child(c);
      r(u, i, e.forChild(s, u), c), s += u.nodeSize;
    }
    return;
  }
  let o = 0, l = [], a = null;
  for (let c = 0; ; ) {
    let u, d;
    for (; o < i.length && i[o].to == s; ) {
      let g = i[o++];
      g.widget && (u ? (d || (d = [u])).push(g) : u = g);
    }
    if (u)
      if (d) {
        d.sort(my);
        for (let g = 0; g < d.length; g++)
          n(d[g], c, !!a);
      } else
        n(u, c, !!a);
    let f, h;
    if (a)
      h = -1, f = a, a = null;
    else if (c < t.childCount)
      h = c, f = t.child(c++);
    else
      break;
    for (let g = 0; g < l.length; g++)
      l[g].to <= s && l.splice(g--, 1);
    for (; o < i.length && i[o].from <= s && i[o].to > s; )
      l.push(i[o++]);
    let p = s + f.nodeSize;
    if (f.isText) {
      let g = p;
      o < i.length && i[o].from < g && (g = i[o].from);
      for (let y = 0; y < l.length; y++)
        l[y].to < g && (g = l[y].to);
      g < p && (a = f.cut(g - s), f = f.cut(0, g - s), p = g, h = -1);
    } else
      for (; o < i.length && i[o].to < p; )
        o++;
    let m = f.isInline && !f.isLeaf ? l.filter((g) => !g.inline) : l.slice();
    r(f, m, e.forChild(s, f), h), s = p;
  }
}
function yy(t) {
  if (t.nodeName == "UL" || t.nodeName == "OL") {
    let e = t.style.cssText;
    t.style.cssText = e + "; list-style: square !important", window.getComputedStyle(t).listStyle, t.style.cssText = e;
  }
}
function by(t, e, n, r) {
  for (let i = 0, s = 0; i < t.childCount && s <= r; ) {
    let o = t.child(i++), l = s;
    if (s += o.nodeSize, !o.isText)
      continue;
    let a = o.text;
    for (; i < t.childCount; ) {
      let c = t.child(i++);
      if (s += c.nodeSize, !c.isText)
        break;
      a += c.text;
    }
    if (s >= n) {
      if (s >= r && a.slice(r - e.length - l, r - l) == e)
        return r - e.length;
      let c = l < r ? a.lastIndexOf(e, r - l - 1) : -1;
      if (c >= 0 && c + e.length + l >= n)
        return l + c;
      if (n == r && a.length >= r + e.length - l && a.slice(r - l, r - l + e.length) == e)
        return r;
    }
  }
  return -1;
}
function zo(t, e, n, r, i) {
  let s = [];
  for (let o = 0, l = 0; o < t.length; o++) {
    let a = t[o], c = l, u = l += a.size;
    c >= n || u <= e ? s.push(a) : (c < e && s.push(a.slice(0, e - c, r)), i && (s.push(i), i = void 0), u > n && s.push(a.slice(n - c, a.size, r)));
  }
  return s;
}
function Il(t, e = null) {
  let n = t.domSelectionRange(), r = t.state.doc;
  if (!n.focusNode)
    return null;
  let i = t.docView.nearestDesc(n.focusNode), s = i && i.size == 0, o = t.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
  if (o < 0)
    return null;
  let l = r.resolve(o), a, c;
  if (vs(n)) {
    for (a = o; i && !i.node; )
      i = i.parent;
    let d = i.node;
    if (i && d.isAtom && O.isSelectable(d) && i.parent && !(d.isInline && Ug(n.focusNode, n.focusOffset, i.dom))) {
      let f = i.posBefore;
      c = new O(o == f ? l : r.resolve(f));
    }
  } else {
    if (n instanceof t.dom.ownerDocument.defaultView.Selection && n.rangeCount > 1) {
      let d = o, f = o;
      for (let h = 0; h < n.rangeCount; h++) {
        let p = n.getRangeAt(h);
        d = Math.min(d, t.docView.posFromDOM(p.startContainer, p.startOffset, 1)), f = Math.max(f, t.docView.posFromDOM(p.endContainer, p.endOffset, -1));
      }
      if (d < 0)
        return null;
      [a, o] = f == t.state.selection.anchor ? [f, d] : [d, f], l = r.resolve(o);
    } else
      a = t.docView.posFromDOM(n.anchorNode, n.anchorOffset, 1);
    if (a < 0)
      return null;
  }
  let u = r.resolve(a);
  if (!c) {
    let d = e == "pointer" || t.state.selection.head < l.pos && !s ? 1 : -1;
    c = Rl(t, u, l, d);
  }
  return c;
}
function Zd(t) {
  return t.editable ? t.hasFocus() : tf(t) && document.activeElement && document.activeElement.contains(t.dom);
}
function vt(t, e = !1) {
  let n = t.state.selection;
  if (ef(t, n), !!Zd(t)) {
    if (!e && t.input.mouseDown && t.input.mouseDown.allowDefault && fe) {
      let r = t.domSelectionRange(), i = t.domObserver.currentSelection;
      if (r.anchorNode && i.anchorNode && yn(r.anchorNode, r.anchorOffset, i.anchorNode, i.anchorOffset)) {
        t.input.mouseDown.delayedSelectionSync = !0, t.domObserver.setCurSelection();
        return;
      }
    }
    if (t.domObserver.disconnectSelection(), t.cursorWrapper)
      ky(t);
    else {
      let { anchor: r, head: i } = n, s, o;
      oc && !(n instanceof D) && (n.$from.parent.inlineContent || (s = lc(t, n.from)), !n.empty && !n.$from.parent.inlineContent && (o = lc(t, n.to))), t.docView.setSelection(r, i, t, e), oc && (s && ac(s), o && ac(o)), n.visible ? t.dom.classList.remove("ProseMirror-hideselection") : (t.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && wy(t));
    }
    t.domObserver.setCurSelection(), t.domObserver.connectSelection();
  }
}
const oc = be || fe && Hd < 63;
function lc(t, e) {
  let { node: n, offset: r } = t.docView.domFromPos(e, 0), i = r < n.childNodes.length ? n.childNodes[r] : null, s = r ? n.childNodes[r - 1] : null;
  if (be && i && i.contentEditable == "false")
    return Xs(i);
  if ((!i || i.contentEditable == "false") && (!s || s.contentEditable == "false")) {
    if (i)
      return Xs(i);
    if (s)
      return Xs(s);
  }
}
function Xs(t) {
  return t.contentEditable = "true", be && t.draggable && (t.draggable = !1, t.wasDraggable = !0), t;
}
function ac(t) {
  t.contentEditable = "false", t.wasDraggable && (t.draggable = !0, t.wasDraggable = null);
}
function wy(t) {
  let e = t.dom.ownerDocument;
  e.removeEventListener("selectionchange", t.input.hideSelectionGuard);
  let n = t.domSelectionRange(), r = n.anchorNode, i = n.anchorOffset;
  e.addEventListener("selectionchange", t.input.hideSelectionGuard = () => {
    (n.anchorNode != r || n.anchorOffset != i) && (e.removeEventListener("selectionchange", t.input.hideSelectionGuard), setTimeout(() => {
      (!Zd(t) || t.state.selection.visible) && t.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function ky(t) {
  let e = t.domSelection();
  if (!e)
    return;
  let n = t.cursorWrapper.dom, r = n.nodeName == "IMG";
  r ? e.collapse(n.parentNode, ce(n) + 1) : e.collapse(n, 0), !r && !t.state.selection.visible && Ce && Wt <= 11 && (n.disabled = !0, n.disabled = !1);
}
function ef(t, e) {
  if (e instanceof O) {
    let n = t.docView.descAt(e.from);
    n != t.lastSelectedViewDesc && (cc(t), n && n.selectNode(), t.lastSelectedViewDesc = n);
  } else
    cc(t);
}
function cc(t) {
  t.lastSelectedViewDesc && (t.lastSelectedViewDesc.parent && t.lastSelectedViewDesc.deselectNode(), t.lastSelectedViewDesc = void 0);
}
function Rl(t, e, n, r) {
  return t.someProp("createSelectionBetween", (i) => i(t, e, n)) || D.between(e, n, r);
}
function uc(t) {
  return t.editable && !t.hasFocus() ? !1 : tf(t);
}
function tf(t) {
  let e = t.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return t.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (t.editable || t.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function xy(t) {
  let e = t.docView.domFromPos(t.state.selection.anchor, 0), n = t.domSelectionRange();
  return yn(e.node, e.offset, n.anchorNode, n.anchorOffset);
}
function $o(t, e) {
  let { $anchor: n, $head: r } = t.selection, i = e > 0 ? n.max(r) : n.min(r), s = i.parent.inlineContent ? i.depth ? t.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
  return s && I.findFrom(s, e);
}
function Rt(t, e) {
  return t.dispatch(t.state.tr.setSelection(e).scrollIntoView()), !0;
}
function dc(t, e, n) {
  let r = t.state.selection;
  if (r instanceof D)
    if (n.indexOf("s") > -1) {
      let { $head: i } = r, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!s || s.isText || !s.isLeaf)
        return !1;
      let o = t.state.doc.resolve(i.pos + s.nodeSize * (e < 0 ? -1 : 1));
      return Rt(t, new D(r.$anchor, o));
    } else if (r.empty) {
      if (t.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = $o(t.state, e);
        return i && i instanceof O ? Rt(t, i) : !1;
      } else if (!(Be && n.indexOf("m") > -1)) {
        let i = r.$head, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, o;
        if (!s || s.isText)
          return !1;
        let l = e < 0 ? i.pos - s.nodeSize : i.pos;
        return s.isAtom || (o = t.docView.descAt(l)) && !o.contentDOM ? O.isSelectable(s) ? Rt(t, new O(e < 0 ? t.state.doc.resolve(i.pos - s.nodeSize) : i)) : Lr ? Rt(t, new D(t.state.doc.resolve(e < 0 ? l : l + s.nodeSize))) : !1 : !1;
      }
    } else return !1;
  else {
    if (r instanceof O && r.node.isInline)
      return Rt(t, new D(e > 0 ? r.$to : r.$from));
    {
      let i = $o(t.state, e);
      return i ? Rt(t, i) : !1;
    }
  }
}
function Ai(t) {
  return t.nodeType == 3 ? t.nodeValue.length : t.childNodes.length;
}
function cr(t, e) {
  let n = t.pmViewDesc;
  return n && n.size == 0 && (e < 0 || t.nextSibling || t.nodeName != "BR");
}
function Sn(t, e) {
  return e < 0 ? Sy(t) : vy(t);
}
function Sy(t) {
  let e = t.domSelectionRange(), n = e.focusNode, r = e.focusOffset;
  if (!n)
    return;
  let i, s, o = !1;
  for (He && n.nodeType == 1 && r < Ai(n) && cr(n.childNodes[r], -1) && (o = !0); ; )
    if (r > 0) {
      if (n.nodeType != 1)
        break;
      {
        let l = n.childNodes[r - 1];
        if (cr(l, -1))
          i = n, s = --r;
        else if (l.nodeType == 3)
          n = l, r = n.nodeValue.length;
        else
          break;
      }
    } else {
      if (nf(n))
        break;
      {
        let l = n.previousSibling;
        for (; l && cr(l, -1); )
          i = n.parentNode, s = ce(l), l = l.previousSibling;
        if (l)
          n = l, r = Ai(n);
        else {
          if (n = n.parentNode, n == t.dom)
            break;
          r = 0;
        }
      }
    }
  o ? _o(t, n, r) : i && _o(t, i, s);
}
function vy(t) {
  let e = t.domSelectionRange(), n = e.focusNode, r = e.focusOffset;
  if (!n)
    return;
  let i = Ai(n), s, o;
  for (; ; )
    if (r < i) {
      if (n.nodeType != 1)
        break;
      let l = n.childNodes[r];
      if (cr(l, 1))
        s = n, o = ++r;
      else
        break;
    } else {
      if (nf(n))
        break;
      {
        let l = n.nextSibling;
        for (; l && cr(l, 1); )
          s = l.parentNode, o = ce(l) + 1, l = l.nextSibling;
        if (l)
          n = l, r = 0, i = Ai(n);
        else {
          if (n = n.parentNode, n == t.dom)
            break;
          r = i = 0;
        }
      }
    }
  s && _o(t, s, o);
}
function nf(t) {
  let e = t.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function Cy(t, e) {
  for (; t && e == t.childNodes.length && !Pr(t); )
    e = ce(t) + 1, t = t.parentNode;
  for (; t && e < t.childNodes.length; ) {
    let n = t.childNodes[e];
    if (n.nodeType == 3)
      return n;
    if (n.nodeType == 1 && n.contentEditable == "false")
      break;
    t = n, e = 0;
  }
}
function My(t, e) {
  for (; t && !e && !Pr(t); )
    e = ce(t), t = t.parentNode;
  for (; t && e; ) {
    let n = t.childNodes[e - 1];
    if (n.nodeType == 3)
      return n;
    if (n.nodeType == 1 && n.contentEditable == "false")
      break;
    t = n, e = t.childNodes.length;
  }
}
function _o(t, e, n) {
  if (e.nodeType != 3) {
    let s, o;
    (o = Cy(e, n)) ? (e = o, n = 0) : (s = My(e, n)) && (e = s, n = s.nodeValue.length);
  }
  let r = t.domSelection();
  if (!r)
    return;
  if (vs(r)) {
    let s = document.createRange();
    s.setEnd(e, n), s.setStart(e, n), r.removeAllRanges(), r.addRange(s);
  } else r.extend && r.extend(e, n);
  t.domObserver.setCurSelection();
  let { state: i } = t;
  setTimeout(() => {
    t.state == i && vt(t);
  }, 50);
}
function fc(t, e) {
  let n = t.state.doc.resolve(e);
  if (!(fe || qg) && n.parent.inlineContent) {
    let i = t.coordsAtPos(e);
    if (e > n.start()) {
      let s = t.coordsAtPos(e - 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left < i.left ? "ltr" : "rtl";
    }
    if (e < n.end()) {
      let s = t.coordsAtPos(e + 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left > i.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(t.dom).direction == "rtl" ? "rtl" : "ltr";
}
function hc(t, e, n) {
  let r = t.state.selection;
  if (r instanceof D && !r.empty || n.indexOf("s") > -1 || Be && n.indexOf("m") > -1)
    return !1;
  let { $from: i, $to: s } = r;
  if (!i.parent.inlineContent || t.endOfTextblock(e < 0 ? "up" : "down")) {
    let o = $o(t.state, e);
    if (o && o instanceof O)
      return Rt(t, o);
  }
  if (!i.parent.inlineContent) {
    let o = e < 0 ? i : s, l = r instanceof Ie ? I.near(o, e) : I.findFrom(o, e);
    return l ? Rt(t, l) : !1;
  }
  return !1;
}
function pc(t, e) {
  if (!(t.state.selection instanceof D))
    return !0;
  let { $head: n, $anchor: r, empty: i } = t.state.selection;
  if (!n.sameParent(r))
    return !0;
  if (!i)
    return !1;
  if (t.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let s = !n.textOffset && (e < 0 ? n.nodeBefore : n.nodeAfter);
  if (s && !s.isText) {
    let o = t.state.tr;
    return e < 0 ? o.delete(n.pos - s.nodeSize, n.pos) : o.delete(n.pos, n.pos + s.nodeSize), t.dispatch(o), !0;
  }
  return !1;
}
function mc(t, e, n) {
  t.domObserver.stop(), e.contentEditable = n, t.domObserver.start();
}
function Ty(t) {
  if (!be || t.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: n } = t.domSelectionRange();
  if (e && e.nodeType == 1 && n == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    mc(t, r, "true"), setTimeout(() => mc(t, r, "false"), 20);
  }
  return !1;
}
function Ey(t) {
  let e = "";
  return t.ctrlKey && (e += "c"), t.metaKey && (e += "m"), t.altKey && (e += "a"), t.shiftKey && (e += "s"), e;
}
function Ay(t, e) {
  let n = e.keyCode, r = Ey(e);
  if (n == 8 || Be && n == 72 && r == "c")
    return pc(t, -1) || Sn(t, -1);
  if (n == 46 && !e.shiftKey || Be && n == 68 && r == "c")
    return pc(t, 1) || Sn(t, 1);
  if (n == 13 || n == 27)
    return !0;
  if (n == 37 || Be && n == 66 && r == "c") {
    let i = n == 37 ? fc(t, t.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return dc(t, i, r) || Sn(t, i);
  } else if (n == 39 || Be && n == 70 && r == "c") {
    let i = n == 39 ? fc(t, t.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return dc(t, i, r) || Sn(t, i);
  } else {
    if (n == 38 || Be && n == 80 && r == "c")
      return hc(t, -1, r) || Sn(t, -1);
    if (n == 40 || Be && n == 78 && r == "c")
      return Ty(t) || hc(t, 1, r) || Sn(t, 1);
    if (r == (Be ? "m" : "c") && (n == 66 || n == 73 || n == 89 || n == 90))
      return !0;
  }
  return !1;
}
function Dl(t, e) {
  t.someProp("transformCopied", (h) => {
    e = h(e, t);
  });
  let n = [], { content: r, openStart: i, openEnd: s } = e;
  for (; i > 1 && s > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    i--, s--;
    let h = r.firstChild;
    n.push(h.type.name, h.attrs != h.type.defaultAttrs ? h.attrs : null), r = h.content;
  }
  let o = t.someProp("clipboardSerializer") || wn.fromSchema(t.state.schema), l = cf(), a = l.createElement("div");
  a.appendChild(o.serializeFragment(r, { document: l }));
  let c = a.firstChild, u, d = 0;
  for (; c && c.nodeType == 1 && (u = af[c.nodeName.toLowerCase()]); ) {
    for (let h = u.length - 1; h >= 0; h--) {
      let p = l.createElement(u[h]);
      for (; a.firstChild; )
        p.appendChild(a.firstChild);
      a.appendChild(p), d++;
    }
    c = a.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${i} ${s}${d ? ` -${d}` : ""} ${JSON.stringify(n)}`);
  let f = t.someProp("clipboardTextSerializer", (h) => h(e, t)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: a, text: f, slice: e };
}
function rf(t, e, n, r, i) {
  let s = i.parent.type.spec.code, o, l;
  if (!n && !e)
    return null;
  let a = !!e && (r || s || !n);
  if (a) {
    if (t.someProp("transformPastedText", (f) => {
      e = f(e, s || r, t);
    }), s)
      return l = new M(x.from(t.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0), t.someProp("transformPasted", (f) => {
        l = f(l, t, !0);
      }), l;
    let d = t.someProp("clipboardTextParser", (f) => f(e, i, r, t));
    if (d)
      l = d;
    else {
      let f = i.marks(), { schema: h } = t.state, p = wn.fromSchema(h);
      o = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let g = o.appendChild(document.createElement("p"));
        m && g.appendChild(p.serializeNode(h.text(m, f)));
      });
    }
  } else
    t.someProp("transformPastedHTML", (d) => {
      n = d(n, t);
    }), o = Ry(n), Lr && Dy(o);
  let c = o && o.querySelector("[data-pm-slice]"), u = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (u && u[3])
    for (let d = +u[3]; d > 0; d--) {
      let f = o.firstChild;
      for (; f && f.nodeType != 1; )
        f = f.nextSibling;
      if (!f)
        break;
      o = f;
    }
  if (l || (l = (t.someProp("clipboardParser") || t.someProp("domParser") || Ut.fromSchema(t.state.schema)).parseSlice(o, {
    preserveWhitespace: !!(a || u),
    context: i,
    ruleFromNode(f) {
      return f.nodeName == "BR" && !f.nextSibling && f.parentNode && !Oy.test(f.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    l = Py(gc(l, +u[1], +u[2]), u[4]);
  else if (l = M.maxOpen(Ny(l.content, i), !0), l.openStart || l.openEnd) {
    let d = 0, f = 0;
    for (let h = l.content.firstChild; d < l.openStart && !h.type.spec.isolating; d++, h = h.firstChild)
      ;
    for (let h = l.content.lastChild; f < l.openEnd && !h.type.spec.isolating; f++, h = h.lastChild)
      ;
    l = gc(l, d, f);
  }
  return t.someProp("transformPasted", (d) => {
    l = d(l, t, a);
  }), l;
}
const Oy = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function Ny(t, e) {
  if (t.childCount < 2)
    return t;
  for (let n = e.depth; n >= 0; n--) {
    let i = e.node(n).contentMatchAt(e.index(n)), s, o = [];
    if (t.forEach((l) => {
      if (!o)
        return;
      let a = i.findWrapping(l.type), c;
      if (!a)
        return o = null;
      if (c = o.length && s.length && of(a, s, l, o[o.length - 1], 0))
        o[o.length - 1] = c;
      else {
        o.length && (o[o.length - 1] = lf(o[o.length - 1], s.length));
        let u = sf(l, a);
        o.push(u), i = i.matchType(u.type), s = a;
      }
    }), o)
      return x.from(o);
  }
  return t;
}
function sf(t, e, n = 0) {
  for (let r = e.length - 1; r >= n; r--)
    t = e[r].create(null, x.from(t));
  return t;
}
function of(t, e, n, r, i) {
  if (i < t.length && i < e.length && t[i] == e[i]) {
    let s = of(t, e, n, r.lastChild, i + 1);
    if (s)
      return r.copy(r.content.replaceChild(r.childCount - 1, s));
    if (r.contentMatchAt(r.childCount).matchType(i == t.length - 1 ? n.type : t[i + 1]))
      return r.copy(r.content.append(x.from(sf(n, t, i + 1))));
  }
}
function lf(t, e) {
  if (e == 0)
    return t;
  let n = t.content.replaceChild(t.childCount - 1, lf(t.lastChild, e - 1)), r = t.contentMatchAt(t.childCount).fillBefore(x.empty, !0);
  return t.copy(n.append(r));
}
function Fo(t, e, n, r, i, s) {
  let o = e < 0 ? t.firstChild : t.lastChild, l = o.content;
  return t.childCount > 1 && (s = 0), i < r - 1 && (l = Fo(l, e, n, r, i + 1, s)), i >= n && (l = e < 0 ? o.contentMatchAt(0).fillBefore(l, s <= i).append(l) : l.append(o.contentMatchAt(o.childCount).fillBefore(x.empty, !0))), t.replaceChild(e < 0 ? 0 : t.childCount - 1, o.copy(l));
}
function gc(t, e, n) {
  return e < t.openStart && (t = new M(Fo(t.content, -1, e, t.openStart, 0, t.openEnd), e, t.openEnd)), n < t.openEnd && (t = new M(Fo(t.content, 1, n, t.openEnd, 0, 0), t.openStart, n)), t;
}
const af = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
let yc = null;
function cf() {
  return yc || (yc = document.implementation.createHTMLDocument("title"));
}
let Qs = null;
function Iy(t) {
  let e = window.trustedTypes;
  return e ? (Qs || (Qs = e.defaultPolicy || e.createPolicy("ProseMirrorClipboard", { createHTML: (n) => n })), Qs.createHTML(t)) : t;
}
function Ry(t) {
  let e = /^(\s*<meta [^>]*>)*/.exec(t);
  e && (t = t.slice(e[0].length));
  let n = cf().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(t), i;
  if ((i = r && af[r[1].toLowerCase()]) && (t = i.map((s) => "<" + s + ">").join("") + t + i.map((s) => "</" + s + ">").reverse().join("")), n.innerHTML = Iy(t), i)
    for (let s = 0; s < i.length; s++)
      n = n.querySelector(i[s]) || n;
  return n;
}
function Dy(t) {
  let e = t.querySelectorAll(fe ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let n = 0; n < e.length; n++) {
    let r = e[n];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(t.ownerDocument.createTextNode(" "), r);
  }
}
function Py(t, e) {
  if (!t.size)
    return t;
  let n = t.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return t;
  }
  let { content: i, openStart: s, openEnd: o } = t;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = n.nodes[r[l]];
    if (!a || a.hasRequiredAttrs())
      break;
    i = x.from(a.create(r[l + 1], i)), s++, o++;
  }
  return new M(i, s, o);
}
const we = {}, ke = {}, Ly = { touchstart: !0, touchmove: !0 };
class By {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "", button: 0 }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function zy(t) {
  for (let e in we) {
    let n = we[e];
    t.dom.addEventListener(e, t.input.eventHandlers[e] = (r) => {
      _y(t, r) && !Pl(t, r) && (t.editable || !(r.type in ke)) && n(t, r);
    }, Ly[e] ? { passive: !0 } : void 0);
  }
  be && t.dom.addEventListener("input", () => null), Ho(t);
}
function Vt(t, e) {
  t.input.lastSelectionOrigin = e, t.input.lastSelectionTime = Date.now();
}
function $y(t) {
  t.domObserver.stop();
  for (let e in t.input.eventHandlers)
    t.dom.removeEventListener(e, t.input.eventHandlers[e]);
  clearTimeout(t.input.composingTimeout), clearTimeout(t.input.lastIOSEnterFallbackTimeout);
}
function Ho(t) {
  t.someProp("handleDOMEvents", (e) => {
    for (let n in e)
      t.input.eventHandlers[n] || t.dom.addEventListener(n, t.input.eventHandlers[n] = (r) => Pl(t, r));
  });
}
function Pl(t, e) {
  return t.someProp("handleDOMEvents", (n) => {
    let r = n[e.type];
    return r ? r(t, e) || e.defaultPrevented : !1;
  });
}
function _y(t, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let n = e.target; n != t.dom; n = n.parentNode)
    if (!n || n.nodeType == 11 || n.pmViewDesc && n.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function Fy(t, e) {
  !Pl(t, e) && we[e.type] && (t.editable || !(e.type in ke)) && we[e.type](t, e);
}
ke.keydown = (t, e) => {
  let n = e;
  if (t.input.shiftKey = n.keyCode == 16 || n.shiftKey, !df(t, n) && (t.input.lastKeyCode = n.keyCode, t.input.lastKeyCodeTime = Date.now(), !(kt && fe && n.keyCode == 13)))
    if (n.keyCode != 229 && t.domObserver.forceFlush(), $n && n.keyCode == 13 && !n.ctrlKey && !n.altKey && !n.metaKey) {
      let r = Date.now();
      t.input.lastIOSEnter = r, t.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        t.input.lastIOSEnter == r && (t.someProp("handleKeyDown", (i) => i(t, rn(13, "Enter"))), t.input.lastIOSEnter = 0);
      }, 200);
    } else t.someProp("handleKeyDown", (r) => r(t, n)) || Ay(t, n) ? n.preventDefault() : Vt(t, "key");
};
ke.keyup = (t, e) => {
  e.keyCode == 16 && (t.input.shiftKey = !1);
};
ke.keypress = (t, e) => {
  let n = e;
  if (df(t, n) || !n.charCode || n.ctrlKey && !n.altKey || Be && n.metaKey)
    return;
  if (t.someProp("handleKeyPress", (i) => i(t, n))) {
    n.preventDefault();
    return;
  }
  let r = t.state.selection;
  if (!(r instanceof D) || !r.$from.sameParent(r.$to)) {
    let i = String.fromCharCode(n.charCode), s = () => t.state.tr.insertText(i).scrollIntoView();
    !/[\r\n]/.test(i) && !t.someProp("handleTextInput", (o) => o(t, r.$from.pos, r.$to.pos, i, s)) && t.dispatch(s()), n.preventDefault();
  }
};
function Ms(t) {
  return { left: t.clientX, top: t.clientY };
}
function Hy(t, e) {
  let n = e.x - t.clientX, r = e.y - t.clientY;
  return n * n + r * r < 100;
}
function Ll(t, e, n, r, i) {
  if (r == -1)
    return !1;
  let s = t.state.doc.resolve(r);
  for (let o = s.depth + 1; o > 0; o--)
    if (t.someProp(e, (l) => o > s.depth ? l(t, n, s.nodeAfter, s.before(o), i, !0) : l(t, n, s.node(o), s.before(o), i, !1)))
      return !0;
  return !1;
}
function Dn(t, e, n) {
  if (t.focused || t.focus(), t.state.selection.eq(e))
    return;
  let r = t.state.tr.setSelection(e);
  r.setMeta("pointer", !0), t.dispatch(r);
}
function Vy(t, e) {
  if (e == -1)
    return !1;
  let n = t.state.doc.resolve(e), r = n.nodeAfter;
  return r && r.isAtom && O.isSelectable(r) ? (Dn(t, new O(n)), !0) : !1;
}
function jy(t, e) {
  if (e == -1)
    return !1;
  let n = t.state.selection, r, i;
  n instanceof O && (r = n.node);
  let s = t.state.doc.resolve(e);
  for (let o = s.depth + 1; o > 0; o--) {
    let l = o > s.depth ? s.nodeAfter : s.node(o);
    if (O.isSelectable(l)) {
      r && n.$from.depth > 0 && o >= n.$from.depth && s.before(n.$from.depth + 1) == n.$from.pos ? i = s.before(n.$from.depth) : i = s.before(o);
      break;
    }
  }
  return i != null ? (Dn(t, O.create(t.state.doc, i)), !0) : !1;
}
function Uy(t, e, n, r, i) {
  return Ll(t, "handleClickOn", e, n, r) || t.someProp("handleClick", (s) => s(t, e, r)) || (i ? jy(t, n) : Vy(t, n));
}
function Wy(t, e, n, r) {
  return Ll(t, "handleDoubleClickOn", e, n, r) || t.someProp("handleDoubleClick", (i) => i(t, e, r));
}
function Ky(t, e, n, r) {
  return Ll(t, "handleTripleClickOn", e, n, r) || t.someProp("handleTripleClick", (i) => i(t, e, r)) || qy(t, n, r);
}
function qy(t, e, n) {
  if (n.button != 0)
    return !1;
  let r = t.state.doc;
  if (e == -1)
    return r.inlineContent ? (Dn(t, D.create(r, 0, r.content.size)), !0) : !1;
  let i = r.resolve(e);
  for (let s = i.depth + 1; s > 0; s--) {
    let o = s > i.depth ? i.nodeAfter : i.node(s), l = i.before(s);
    if (o.inlineContent)
      Dn(t, D.create(r, l + 1, l + 1 + o.content.size));
    else if (O.isSelectable(o))
      Dn(t, O.create(r, l));
    else
      continue;
    return !0;
  }
}
function Bl(t) {
  return Oi(t);
}
const uf = Be ? "metaKey" : "ctrlKey";
we.mousedown = (t, e) => {
  let n = e;
  t.input.shiftKey = n.shiftKey;
  let r = Bl(t), i = Date.now(), s = "singleClick";
  i - t.input.lastClick.time < 500 && Hy(n, t.input.lastClick) && !n[uf] && t.input.lastClick.button == n.button && (t.input.lastClick.type == "singleClick" ? s = "doubleClick" : t.input.lastClick.type == "doubleClick" && (s = "tripleClick")), t.input.lastClick = { time: i, x: n.clientX, y: n.clientY, type: s, button: n.button };
  let o = t.posAtCoords(Ms(n));
  o && (s == "singleClick" ? (t.input.mouseDown && t.input.mouseDown.done(), t.input.mouseDown = new Jy(t, o, n, !!r)) : (s == "doubleClick" ? Wy : Ky)(t, o.pos, o.inside, n) ? n.preventDefault() : Vt(t, "pointer"));
};
class Jy {
  constructor(e, n, r, i) {
    this.view = e, this.pos = n, this.event = r, this.flushed = i, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!r[uf], this.allowDefault = r.shiftKey;
    let s, o;
    if (n.inside > -1)
      s = e.state.doc.nodeAt(n.inside), o = n.inside;
    else {
      let u = e.state.doc.resolve(n.pos);
      s = u.parent, o = u.depth ? u.before() : 0;
    }
    const l = i ? null : r.target, a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a && a.nodeDOM.nodeType == 1 ? a.nodeDOM : null;
    let { selection: c } = e.state;
    (r.button == 0 && s.type.spec.draggable && s.type.spec.selectable !== !1 || c instanceof O && c.from <= o && c.to > o) && (this.mightDrag = {
      node: s,
      pos: o,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && He && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), Vt(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => vt(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let n = this.pos;
    this.view.state.doc != this.startDoc && (n = this.view.posAtCoords(Ms(e))), this.updateAllowDefault(e), this.allowDefault || !n ? Vt(this.view, "pointer") : Uy(this.view, n.pos, n.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    be && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    fe && !this.view.state.selection.visible && Math.min(Math.abs(n.pos - this.view.state.selection.from), Math.abs(n.pos - this.view.state.selection.to)) <= 2) ? (Dn(this.view, I.near(this.view.state.doc.resolve(n.pos))), e.preventDefault()) : Vt(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), Vt(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
we.touchstart = (t) => {
  t.input.lastTouch = Date.now(), Bl(t), Vt(t, "pointer");
};
we.touchmove = (t) => {
  t.input.lastTouch = Date.now(), Vt(t, "pointer");
};
we.contextmenu = (t) => Bl(t);
function df(t, e) {
  return t.composing ? !0 : be && Math.abs(e.timeStamp - t.input.compositionEndedAt) < 500 ? (t.input.compositionEndedAt = -2e8, !0) : !1;
}
const Gy = kt ? 5e3 : -1;
ke.compositionstart = ke.compositionupdate = (t) => {
  if (!t.composing) {
    t.domObserver.flush();
    let { state: e } = t, n = e.selection.$to;
    if (e.selection instanceof D && (e.storedMarks || !n.textOffset && n.parentOffset && n.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1)))
      t.markCursor = t.state.storedMarks || n.marks(), Oi(t, !0), t.markCursor = null;
    else if (Oi(t, !e.selection.empty), He && e.selection.empty && n.parentOffset && !n.textOffset && n.nodeBefore.marks.length) {
      let r = t.domSelectionRange();
      for (let i = r.focusNode, s = r.focusOffset; i && i.nodeType == 1 && s != 0; ) {
        let o = s < 0 ? i.lastChild : i.childNodes[s - 1];
        if (!o)
          break;
        if (o.nodeType == 3) {
          let l = t.domSelection();
          l && l.collapse(o, o.nodeValue.length);
          break;
        } else
          i = o, s = -1;
      }
    }
    t.input.composing = !0;
  }
  ff(t, Gy);
};
ke.compositionend = (t, e) => {
  t.composing && (t.input.composing = !1, t.input.compositionEndedAt = e.timeStamp, t.input.compositionPendingChanges = t.domObserver.pendingRecords().length ? t.input.compositionID : 0, t.input.compositionNode = null, t.input.compositionPendingChanges && Promise.resolve().then(() => t.domObserver.flush()), t.input.compositionID++, ff(t, 20));
};
function ff(t, e) {
  clearTimeout(t.input.composingTimeout), e > -1 && (t.input.composingTimeout = setTimeout(() => Oi(t), e));
}
function hf(t) {
  for (t.composing && (t.input.composing = !1, t.input.compositionEndedAt = Xy()); t.input.compositionNodes.length > 0; )
    t.input.compositionNodes.pop().markParentsDirty();
}
function Yy(t) {
  let e = t.domSelectionRange();
  if (!e.focusNode)
    return null;
  let n = Vg(e.focusNode, e.focusOffset), r = jg(e.focusNode, e.focusOffset);
  if (n && r && n != r) {
    let i = r.pmViewDesc, s = t.domObserver.lastChangedTextNode;
    if (n == s || r == s)
      return s;
    if (!i || !i.isText(r.nodeValue))
      return r;
    if (t.input.compositionNode == r) {
      let o = n.pmViewDesc;
      if (!(!o || !o.isText(n.nodeValue)))
        return r;
    }
  }
  return n || r;
}
function Xy() {
  let t = document.createEvent("Event");
  return t.initEvent("event", !0, !0), t.timeStamp;
}
function Oi(t, e = !1) {
  if (!(kt && t.domObserver.flushingSoon >= 0)) {
    if (t.domObserver.forceFlush(), hf(t), e || t.docView && t.docView.dirty) {
      let n = Il(t), r = t.state.selection;
      return n && !n.eq(r) ? t.dispatch(t.state.tr.setSelection(n)) : (t.markCursor || e) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? t.dispatch(t.state.tr.deleteSelection()) : t.updateState(t.state), !0;
    }
    return !1;
  }
}
function Qy(t, e) {
  if (!t.dom.parentNode)
    return;
  let n = t.dom.parentNode.appendChild(document.createElement("div"));
  n.appendChild(e), n.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), i = document.createRange();
  i.selectNodeContents(e), t.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
    n.parentNode && n.parentNode.removeChild(n), t.focus();
  }, 50);
}
const Cr = Ce && Wt < 15 || $n && Jg < 604;
we.copy = ke.cut = (t, e) => {
  let n = e, r = t.state.selection, i = n.type == "cut";
  if (r.empty)
    return;
  let s = Cr ? null : n.clipboardData, o = r.content(), { dom: l, text: a } = Dl(t, o);
  s ? (n.preventDefault(), s.clearData(), s.setData("text/html", l.innerHTML), s.setData("text/plain", a)) : Qy(t, l), i && t.dispatch(t.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function Zy(t) {
  return t.openStart == 0 && t.openEnd == 0 && t.content.childCount == 1 ? t.content.firstChild : null;
}
function e0(t, e) {
  if (!t.dom.parentNode)
    return;
  let n = t.input.shiftKey || t.state.selection.$from.parent.type.spec.code, r = t.dom.parentNode.appendChild(document.createElement(n ? "textarea" : "div"));
  n || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let i = t.input.shiftKey && t.input.lastKeyCode != 45;
  setTimeout(() => {
    t.focus(), r.parentNode && r.parentNode.removeChild(r), n ? Mr(t, r.value, null, i, e) : Mr(t, r.textContent, r.innerHTML, i, e);
  }, 50);
}
function Mr(t, e, n, r, i) {
  let s = rf(t, e, n, r, t.state.selection.$from);
  if (t.someProp("handlePaste", (a) => a(t, i, s || M.empty)))
    return !0;
  if (!s)
    return !1;
  let o = Zy(s), l = o ? t.state.tr.replaceSelectionWith(o, r) : t.state.tr.replaceSelection(s);
  return t.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function pf(t) {
  let e = t.getData("text/plain") || t.getData("Text");
  if (e)
    return e;
  let n = t.getData("text/uri-list");
  return n ? n.replace(/\r?\n/g, " ") : "";
}
ke.paste = (t, e) => {
  let n = e;
  if (t.composing && !kt)
    return;
  let r = Cr ? null : n.clipboardData, i = t.input.shiftKey && t.input.lastKeyCode != 45;
  r && Mr(t, pf(r), r.getData("text/html"), i, n) ? n.preventDefault() : e0(t, n);
};
class mf {
  constructor(e, n, r) {
    this.slice = e, this.move = n, this.node = r;
  }
}
const t0 = Be ? "altKey" : "ctrlKey";
function gf(t, e) {
  let n = t.someProp("dragCopies", (r) => !r(e));
  return n ?? !e[t0];
}
we.dragstart = (t, e) => {
  let n = e, r = t.input.mouseDown;
  if (r && r.done(), !n.dataTransfer)
    return;
  let i = t.state.selection, s = i.empty ? null : t.posAtCoords(Ms(n)), o;
  if (!(s && s.pos >= i.from && s.pos <= (i instanceof O ? i.to - 1 : i.to))) {
    if (r && r.mightDrag)
      o = O.create(t.state.doc, r.mightDrag.pos);
    else if (n.target && n.target.nodeType == 1) {
      let d = t.docView.nearestDesc(n.target, !0);
      d && d.node.type.spec.draggable && d != t.docView && (o = O.create(t.state.doc, d.posBefore));
    }
  }
  let l = (o || t.state.selection).content(), { dom: a, text: c, slice: u } = Dl(t, l);
  (!n.dataTransfer.files.length || !fe || Hd > 120) && n.dataTransfer.clearData(), n.dataTransfer.setData(Cr ? "Text" : "text/html", a.innerHTML), n.dataTransfer.effectAllowed = "copyMove", Cr || n.dataTransfer.setData("text/plain", c), t.dragging = new mf(u, gf(t, n), o);
};
we.dragend = (t) => {
  let e = t.dragging;
  window.setTimeout(() => {
    t.dragging == e && (t.dragging = null);
  }, 50);
};
ke.dragover = ke.dragenter = (t, e) => e.preventDefault();
ke.drop = (t, e) => {
  let n = e, r = t.dragging;
  if (t.dragging = null, !n.dataTransfer)
    return;
  let i = t.posAtCoords(Ms(n));
  if (!i)
    return;
  let s = t.state.doc.resolve(i.pos), o = r && r.slice;
  o ? t.someProp("transformPasted", (p) => {
    o = p(o, t, !1);
  }) : o = rf(t, pf(n.dataTransfer), Cr ? null : n.dataTransfer.getData("text/html"), !1, s);
  let l = !!(r && gf(t, n));
  if (t.someProp("handleDrop", (p) => p(t, n, o || M.empty, l))) {
    n.preventDefault();
    return;
  }
  if (!o)
    return;
  n.preventDefault();
  let a = o ? wd(t.state.doc, s.pos, o) : s.pos;
  a == null && (a = s.pos);
  let c = t.state.tr;
  if (l) {
    let { node: p } = r;
    p ? p.replace(c) : c.deleteSelection();
  }
  let u = c.mapping.map(a), d = o.openStart == 0 && o.openEnd == 0 && o.content.childCount == 1, f = c.doc;
  if (d ? c.replaceRangeWith(u, u, o.content.firstChild) : c.replaceRange(u, u, o), c.doc.eq(f))
    return;
  let h = c.doc.resolve(u);
  if (d && O.isSelectable(o.content.firstChild) && h.nodeAfter && h.nodeAfter.sameMarkup(o.content.firstChild))
    c.setSelection(new O(h));
  else {
    let p = c.mapping.map(a);
    c.mapping.maps[c.mapping.maps.length - 1].forEach((m, g, y, b) => p = b), c.setSelection(Rl(t, h, c.doc.resolve(p)));
  }
  t.focus(), t.dispatch(c.setMeta("uiEvent", "drop"));
};
we.focus = (t) => {
  t.input.lastFocus = Date.now(), t.focused || (t.domObserver.stop(), t.dom.classList.add("ProseMirror-focused"), t.domObserver.start(), t.focused = !0, setTimeout(() => {
    t.docView && t.hasFocus() && !t.domObserver.currentSelection.eq(t.domSelectionRange()) && vt(t);
  }, 20));
};
we.blur = (t, e) => {
  let n = e;
  t.focused && (t.domObserver.stop(), t.dom.classList.remove("ProseMirror-focused"), t.domObserver.start(), n.relatedTarget && t.dom.contains(n.relatedTarget) && t.domObserver.currentSelection.clear(), t.focused = !1);
};
we.beforeinput = (t, e) => {
  if (fe && kt && e.inputType == "deleteContentBackward") {
    t.domObserver.flushSoon();
    let { domChangeCount: r } = t.input;
    setTimeout(() => {
      if (t.input.domChangeCount != r || (t.dom.blur(), t.focus(), t.someProp("handleKeyDown", (s) => s(t, rn(8, "Backspace")))))
        return;
      let { $cursor: i } = t.state.selection;
      i && i.pos > 0 && t.dispatch(t.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let t in ke)
  we[t] = ke[t];
function Tr(t, e) {
  if (t == e)
    return !0;
  for (let n in t)
    if (t[n] !== e[n])
      return !1;
  for (let n in e)
    if (!(n in t))
      return !1;
  return !0;
}
class Ni {
  constructor(e, n) {
    this.toDOM = e, this.spec = n || fn, this.side = this.spec.side || 0;
  }
  map(e, n, r, i) {
    let { pos: s, deleted: o } = e.mapResult(n.from + i, this.side < 0 ? -1 : 1);
    return o ? null : new ye(s - r, s - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof Ni && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && Tr(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class qt {
  constructor(e, n) {
    this.attrs = e, this.spec = n || fn;
  }
  map(e, n, r, i) {
    let s = e.map(n.from + i, this.spec.inclusiveStart ? -1 : 1) - r, o = e.map(n.to + i, this.spec.inclusiveEnd ? 1 : -1) - r;
    return s >= o ? null : new ye(s, o, this);
  }
  valid(e, n) {
    return n.from < n.to;
  }
  eq(e) {
    return this == e || e instanceof qt && Tr(this.attrs, e.attrs) && Tr(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof qt;
  }
  destroy() {
  }
}
class zl {
  constructor(e, n) {
    this.attrs = e, this.spec = n || fn;
  }
  map(e, n, r, i) {
    let s = e.mapResult(n.from + i, 1);
    if (s.deleted)
      return null;
    let o = e.mapResult(n.to + i, -1);
    return o.deleted || o.pos <= s.pos ? null : new ye(s.pos - r, o.pos - r, this);
  }
  valid(e, n) {
    let { index: r, offset: i } = e.content.findIndex(n.from), s;
    return i == n.from && !(s = e.child(r)).isText && i + s.nodeSize == n.to;
  }
  eq(e) {
    return this == e || e instanceof zl && Tr(this.attrs, e.attrs) && Tr(this.spec, e.spec);
  }
  destroy() {
  }
}
class ye {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.from = e, this.to = n, this.type = r;
  }
  /**
  @internal
  */
  copy(e, n) {
    return new ye(e, n, this.type);
  }
  /**
  @internal
  */
  eq(e, n = 0) {
    return this.type.eq(e.type) && this.from + n == e.from && this.to + n == e.to;
  }
  /**
  @internal
  */
  map(e, n, r) {
    return this.type.map(e, this, n, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, n, r) {
    return new ye(e, e, new Ni(n, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, n, r, i) {
    return new ye(e, n, new qt(r, i));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, n, r, i) {
    return new ye(e, n, new zl(r, i));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof qt;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof Ni;
  }
}
const Tn = [], fn = {};
class W {
  /**
  @internal
  */
  constructor(e, n) {
    this.local = e.length ? e : Tn, this.children = n.length ? n : Tn;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, n) {
    return n.length ? Ii(n, e, 0, fn) : de;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, n, r) {
    let i = [];
    return this.findInner(e ?? 0, n ?? 1e9, i, 0, r), i;
  }
  findInner(e, n, r, i, s) {
    for (let o = 0; o < this.local.length; o++) {
      let l = this.local[o];
      l.from <= n && l.to >= e && (!s || s(l.spec)) && r.push(l.copy(l.from + i, l.to + i));
    }
    for (let o = 0; o < this.children.length; o += 3)
      if (this.children[o] < n && this.children[o + 1] > e) {
        let l = this.children[o] + 1;
        this.children[o + 2].findInner(e - l, n - l, r, i + l, s);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, n, r) {
    return this == de || e.maps.length == 0 ? this : this.mapInner(e, n, 0, 0, r || fn);
  }
  /**
  @internal
  */
  mapInner(e, n, r, i, s) {
    let o;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, i);
      a && a.type.valid(n, a) ? (o || (o = [])).push(a) : s.onRemove && s.onRemove(this.local[l].spec);
    }
    return this.children.length ? n0(this.children, o || [], e, n, r, i, s) : o ? new W(o.sort(hn), Tn) : de;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, n) {
    return n.length ? this == de ? W.create(e, n) : this.addInner(e, n, 0) : this;
  }
  addInner(e, n, r) {
    let i, s = 0;
    e.forEach((l, a) => {
      let c = a + r, u;
      if (u = bf(n, l, c)) {
        for (i || (i = this.children.slice()); s < i.length && i[s] < a; )
          s += 3;
        i[s] == a ? i[s + 2] = i[s + 2].addInner(l, u, c + 1) : i.splice(s, 0, a, a + l.nodeSize, Ii(u, l, c + 1, fn)), s += 3;
      }
    });
    let o = yf(s ? wf(n) : n, -r);
    for (let l = 0; l < o.length; l++)
      o[l].type.valid(e, o[l]) || o.splice(l--, 1);
    return new W(o.length ? this.local.concat(o).sort(hn) : this.local, i || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == de ? this : this.removeInner(e, 0);
  }
  removeInner(e, n) {
    let r = this.children, i = this.local;
    for (let s = 0; s < r.length; s += 3) {
      let o, l = r[s] + n, a = r[s + 1] + n;
      for (let u = 0, d; u < e.length; u++)
        (d = e[u]) && d.from > l && d.to < a && (e[u] = null, (o || (o = [])).push(d));
      if (!o)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[s + 2].removeInner(o, l + 1);
      c != de ? r[s + 2] = c : (r.splice(s, 3), s -= 3);
    }
    if (i.length) {
      for (let s = 0, o; s < e.length; s++)
        if (o = e[s])
          for (let l = 0; l < i.length; l++)
            i[l].eq(o, n) && (i == this.local && (i = this.local.slice()), i.splice(l--, 1));
    }
    return r == this.children && i == this.local ? this : i.length || r.length ? new W(i, r) : de;
  }
  forChild(e, n) {
    if (this == de)
      return this;
    if (n.isLeaf)
      return W.empty;
    let r, i;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let s = e + 1, o = s + n.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < o && a.to > s && a.type instanceof qt) {
        let c = Math.max(s, a.from) - s, u = Math.min(o, a.to) - s;
        c < u && (i || (i = [])).push(a.copy(c, u));
      }
    }
    if (i) {
      let l = new W(i.sort(hn), Tn);
      return r ? new Bt([l, r]) : l;
    }
    return r || de;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof W) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let n = 0; n < this.local.length; n++)
      if (!this.local[n].eq(e.local[n]))
        return !1;
    for (let n = 0; n < this.children.length; n += 3)
      if (this.children[n] != e.children[n] || this.children[n + 1] != e.children[n + 1] || !this.children[n + 2].eq(e.children[n + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return $l(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == de)
      return Tn;
    if (e.inlineContent || !this.local.some(qt.is))
      return this.local;
    let n = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof qt || n.push(this.local[r]);
    return n;
  }
  forEachSet(e) {
    e(this);
  }
}
W.empty = new W([], []);
W.removeOverlap = $l;
const de = W.empty;
class Bt {
  constructor(e) {
    this.members = e;
  }
  map(e, n) {
    const r = this.members.map((i) => i.map(e, n, fn));
    return Bt.from(r);
  }
  forChild(e, n) {
    if (n.isLeaf)
      return W.empty;
    let r = [];
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].forChild(e, n);
      s != de && (s instanceof Bt ? r = r.concat(s.members) : r.push(s));
    }
    return Bt.from(r);
  }
  eq(e) {
    if (!(e instanceof Bt) || e.members.length != this.members.length)
      return !1;
    for (let n = 0; n < this.members.length; n++)
      if (!this.members[n].eq(e.members[n]))
        return !1;
    return !0;
  }
  locals(e) {
    let n, r = !0;
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].localsInner(e);
      if (s.length)
        if (!n)
          n = s;
        else {
          r && (n = n.slice(), r = !1);
          for (let o = 0; o < s.length; o++)
            n.push(s[o]);
        }
    }
    return n ? $l(r ? n : n.sort(hn)) : Tn;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return de;
      case 1:
        return e[0];
      default:
        return new Bt(e.every((n) => n instanceof W) ? e : e.reduce((n, r) => n.concat(r instanceof W ? r : r.members), []));
    }
  }
  forEachSet(e) {
    for (let n = 0; n < this.members.length; n++)
      this.members[n].forEachSet(e);
  }
}
function n0(t, e, n, r, i, s, o) {
  let l = t.slice();
  for (let c = 0, u = s; c < n.maps.length; c++) {
    let d = 0;
    n.maps[c].forEach((f, h, p, m) => {
      let g = m - p - (h - f);
      for (let y = 0; y < l.length; y += 3) {
        let b = l[y + 1];
        if (b < 0 || f > b + u - d)
          continue;
        let w = l[y] + u - d;
        h >= w ? l[y + 1] = f <= w ? -2 : -1 : f >= u && g && (l[y] += g, l[y + 1] += g);
      }
      d += g;
    }), u = n.maps[c].map(u, -1);
  }
  let a = !1;
  for (let c = 0; c < l.length; c += 3)
    if (l[c + 1] < 0) {
      if (l[c + 1] == -2) {
        a = !0, l[c + 1] = -1;
        continue;
      }
      let u = n.map(t[c] + s), d = u - i;
      if (d < 0 || d >= r.content.size) {
        a = !0;
        continue;
      }
      let f = n.map(t[c + 1] + s, -1), h = f - i, { index: p, offset: m } = r.content.findIndex(d), g = r.maybeChild(p);
      if (g && m == d && m + g.nodeSize == h) {
        let y = l[c + 2].mapInner(n, g, u + 1, t[c] + s + 1, o);
        y != de ? (l[c] = d, l[c + 1] = h, l[c + 2] = y) : (l[c + 1] = -2, a = !0);
      } else
        a = !0;
    }
  if (a) {
    let c = r0(l, t, e, n, i, s, o), u = Ii(c, r, 0, o);
    e = u.local;
    for (let d = 0; d < l.length; d += 3)
      l[d + 1] < 0 && (l.splice(d, 3), d -= 3);
    for (let d = 0, f = 0; d < u.children.length; d += 3) {
      let h = u.children[d];
      for (; f < l.length && l[f] < h; )
        f += 3;
      l.splice(f, 0, u.children[d], u.children[d + 1], u.children[d + 2]);
    }
  }
  return new W(e.sort(hn), l);
}
function yf(t, e) {
  if (!e || !t.length)
    return t;
  let n = [];
  for (let r = 0; r < t.length; r++) {
    let i = t[r];
    n.push(new ye(i.from + e, i.to + e, i.type));
  }
  return n;
}
function r0(t, e, n, r, i, s, o) {
  function l(a, c) {
    for (let u = 0; u < a.local.length; u++) {
      let d = a.local[u].map(r, i, c);
      d ? n.push(d) : o.onRemove && o.onRemove(a.local[u].spec);
    }
    for (let u = 0; u < a.children.length; u += 3)
      l(a.children[u + 2], a.children[u] + c + 1);
  }
  for (let a = 0; a < t.length; a += 3)
    t[a + 1] == -1 && l(t[a + 2], e[a] + s + 1);
  return n;
}
function bf(t, e, n) {
  if (e.isLeaf)
    return null;
  let r = n + e.nodeSize, i = null;
  for (let s = 0, o; s < t.length; s++)
    (o = t[s]) && o.from > n && o.to < r && ((i || (i = [])).push(o), t[s] = null);
  return i;
}
function wf(t) {
  let e = [];
  for (let n = 0; n < t.length; n++)
    t[n] != null && e.push(t[n]);
  return e;
}
function Ii(t, e, n, r) {
  let i = [], s = !1;
  e.forEach((l, a) => {
    let c = bf(t, l, a + n);
    if (c) {
      s = !0;
      let u = Ii(c, l, n + a + 1, r);
      u != de && i.push(a, a + l.nodeSize, u);
    }
  });
  let o = yf(s ? wf(t) : t, -n).sort(hn);
  for (let l = 0; l < o.length; l++)
    o[l].type.valid(e, o[l]) || (r.onRemove && r.onRemove(o[l].spec), o.splice(l--, 1));
  return o.length || i.length ? new W(o, i) : de;
}
function hn(t, e) {
  return t.from - e.from || t.to - e.to;
}
function $l(t) {
  let e = t;
  for (let n = 0; n < e.length - 1; n++) {
    let r = e[n];
    if (r.from != r.to)
      for (let i = n + 1; i < e.length; i++) {
        let s = e[i];
        if (s.from == r.from) {
          s.to != r.to && (e == t && (e = t.slice()), e[i] = s.copy(s.from, r.to), bc(e, i + 1, s.copy(r.to, s.to)));
          continue;
        } else {
          s.from < r.to && (e == t && (e = t.slice()), e[n] = r.copy(r.from, s.from), bc(e, i, r.copy(s.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function bc(t, e, n) {
  for (; e < t.length && hn(n, t[e]) > 0; )
    e++;
  t.splice(e, 0, n);
}
function Zs(t) {
  let e = [];
  return t.someProp("decorations", (n) => {
    let r = n(t.state);
    r && r != de && e.push(r);
  }), t.cursorWrapper && e.push(W.create(t.state.doc, [t.cursorWrapper.deco])), Bt.from(e);
}
const i0 = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, s0 = Ce && Wt <= 11;
class o0 {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class l0 {
  constructor(e, n) {
    this.view = e, this.handleDOMChange = n, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new o0(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let i = 0; i < r.length; i++)
        this.queue.push(r[i]);
      Ce && Wt <= 11 && r.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), s0 && (this.onCharData = (r) => {
      this.queue.push({ target: r.target, type: "characterData", oldValue: r.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, i0)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let n = 0; n < e.length; n++)
          this.queue.push(e[n]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (uc(this.view)) {
      if (this.suppressingSelectionUpdates)
        return vt(this.view);
      if (Ce && Wt <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && yn(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let n = /* @__PURE__ */ new Set(), r;
    for (let s = e.focusNode; s; s = zn(s))
      n.add(s);
    for (let s = e.anchorNode; s; s = zn(s))
      if (n.has(s)) {
        r = s;
        break;
      }
    let i = r && this.view.docView.nearestDesc(r);
    if (i && i.ignoreMutation({
      type: "selection",
      target: r.nodeType == 3 ? r.parentNode : r
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let n = this.pendingRecords();
    n.length && (this.queue = []);
    let r = e.domSelectionRange(), i = !this.suppressingSelectionUpdates && !this.currentSelection.eq(r) && uc(e) && !this.ignoreSelectionChange(r), s = -1, o = -1, l = !1, a = [];
    if (e.editable)
      for (let u = 0; u < n.length; u++) {
        let d = this.registerMutation(n[u], a);
        d && (s = s < 0 ? d.from : Math.min(d.from, s), o = o < 0 ? d.to : Math.max(d.to, o), d.typeOver && (l = !0));
      }
    if (He && a.length) {
      let u = a.filter((d) => d.nodeName == "BR");
      if (u.length == 2) {
        let [d, f] = u;
        d.parentNode && d.parentNode.parentNode == f.parentNode ? f.remove() : d.remove();
      } else {
        let { focusNode: d } = this.currentSelection;
        for (let f of u) {
          let h = f.parentNode;
          h && h.nodeName == "LI" && (!d || u0(e, d) != h) && f.remove();
        }
      }
    }
    let c = null;
    s < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && vs(r) && (c = Il(e)) && c.eq(I.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, vt(e), this.currentSelection.set(r), e.scrollToSelection()) : (s > -1 || i) && (s > -1 && (e.docView.markDirty(s, o), a0(e)), this.handleDOMChange(s, o, l, a), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || vt(e), this.currentSelection.set(r));
  }
  registerMutation(e, n) {
    if (n.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let u = 0; u < e.addedNodes.length; u++) {
        let d = e.addedNodes[u];
        n.push(d), d.nodeType == 3 && (this.lastChangedTextNode = d);
      }
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let i = e.previousSibling, s = e.nextSibling;
      if (Ce && Wt <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: d, nextSibling: f } = e.addedNodes[u];
          (!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) && (i = d), (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (s = f);
        }
      let o = i && i.parentNode == e.target ? ce(i) + 1 : 0, l = r.localPosFromDOM(e.target, o, -1), a = s && s.parentNode == e.target ? ce(s) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, a, 1);
      return { from: l, to: c };
    } else return e.type == "attributes" ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border } : (this.lastChangedTextNode = e.target, {
      from: r.posAtStart,
      to: r.posAtEnd,
      // An event was generated for a text change that didn't change
      // any text. Mark the dom change to fall back to assuming the
      // selection was typed over with an identical value if it can't
      // find another change.
      typeOver: e.target.nodeValue == e.oldValue
    });
  }
}
let wc = /* @__PURE__ */ new WeakMap(), kc = !1;
function a0(t) {
  if (!wc.has(t) && (wc.set(t, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(t.dom).whiteSpace) !== -1)) {
    if (t.requiresGeckoHackNode = He, kc)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), kc = !0;
  }
}
function xc(t, e) {
  let n = e.startContainer, r = e.startOffset, i = e.endContainer, s = e.endOffset, o = t.domAtPos(t.state.selection.anchor);
  return yn(o.node, o.offset, i, s) && ([n, r, i, s] = [i, s, n, r]), { anchorNode: n, anchorOffset: r, focusNode: i, focusOffset: s };
}
function c0(t, e) {
  if (e.getComposedRanges) {
    let i = e.getComposedRanges(t.root)[0];
    if (i)
      return xc(t, i);
  }
  let n;
  function r(i) {
    i.preventDefault(), i.stopImmediatePropagation(), n = i.getTargetRanges()[0];
  }
  return t.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), t.dom.removeEventListener("beforeinput", r, !0), n ? xc(t, n) : null;
}
function u0(t, e) {
  for (let n = e.parentNode; n && n != t.dom; n = n.parentNode) {
    let r = t.docView.nearestDesc(n, !0);
    if (r && r.node.isBlock)
      return n;
  }
  return null;
}
function d0(t, e, n) {
  let { node: r, fromOffset: i, toOffset: s, from: o, to: l } = t.docView.parseRange(e, n), a = t.domSelectionRange(), c, u = a.anchorNode;
  if (u && t.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (c = [{ node: u, offset: a.anchorOffset }], vs(a) || c.push({ node: a.focusNode, offset: a.focusOffset })), fe && t.input.lastKeyCode === 8)
    for (let g = s; g > i; g--) {
      let y = r.childNodes[g - 1], b = y.pmViewDesc;
      if (y.nodeName == "BR" && !b) {
        s = g;
        break;
      }
      if (!b || b.size)
        break;
    }
  let d = t.state.doc, f = t.someProp("domParser") || Ut.fromSchema(t.state.schema), h = d.resolve(o), p = null, m = f.parse(r, {
    topNode: h.parent,
    topMatch: h.parent.contentMatchAt(h.index()),
    topOpen: !0,
    from: i,
    to: s,
    preserveWhitespace: h.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: f0,
    context: h
  });
  if (c && c[0].pos != null) {
    let g = c[0].pos, y = c[1] && c[1].pos;
    y == null && (y = g), p = { anchor: g + o, head: y + o };
  }
  return { doc: m, sel: p, from: o, to: l };
}
function f0(t) {
  let e = t.pmViewDesc;
  if (e)
    return e.parseRule();
  if (t.nodeName == "BR" && t.parentNode) {
    if (be && /^(ul|ol)$/i.test(t.parentNode.nodeName)) {
      let n = document.createElement("div");
      return n.appendChild(document.createElement("li")), { skip: n };
    } else if (t.parentNode.lastChild == t || be && /^(tr|table)$/i.test(t.parentNode.nodeName))
      return { ignore: !0 };
  } else if (t.nodeName == "IMG" && t.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const h0 = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function p0(t, e, n, r, i) {
  let s = t.input.compositionPendingChanges || (t.composing ? t.input.compositionID : 0);
  if (t.input.compositionPendingChanges = 0, e < 0) {
    let v = t.input.lastSelectionTime > Date.now() - 50 ? t.input.lastSelectionOrigin : null, E = Il(t, v);
    if (E && !t.state.selection.eq(E)) {
      if (fe && kt && t.input.lastKeyCode === 13 && Date.now() - 100 < t.input.lastKeyCodeTime && t.someProp("handleKeyDown", (N) => N(t, rn(13, "Enter"))))
        return;
      let R = t.state.tr.setSelection(E);
      v == "pointer" ? R.setMeta("pointer", !0) : v == "key" && R.scrollIntoView(), s && R.setMeta("composition", s), t.dispatch(R);
    }
    return;
  }
  let o = t.state.doc.resolve(e), l = o.sharedDepth(n);
  e = o.before(l + 1), n = t.state.doc.resolve(n).after(l + 1);
  let a = t.state.selection, c = d0(t, e, n), u = t.state.doc, d = u.slice(c.from, c.to), f, h;
  t.input.lastKeyCode === 8 && Date.now() - 100 < t.input.lastKeyCodeTime ? (f = t.state.selection.to, h = "end") : (f = t.state.selection.from, h = "start"), t.input.lastKeyCode = null;
  let p = y0(d.content, c.doc.content, c.from, f, h);
  if (p && t.input.domChangeCount++, ($n && t.input.lastIOSEnter > Date.now() - 225 || kt) && i.some((v) => v.nodeType == 1 && !h0.test(v.nodeName)) && (!p || p.endA >= p.endB) && t.someProp("handleKeyDown", (v) => v(t, rn(13, "Enter")))) {
    t.input.lastIOSEnter = 0;
    return;
  }
  if (!p)
    if (r && a instanceof D && !a.empty && a.$head.sameParent(a.$anchor) && !t.composing && !(c.sel && c.sel.anchor != c.sel.head))
      p = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (c.sel) {
        let v = Sc(t, t.state.doc, c.sel);
        if (v && !v.eq(t.state.selection)) {
          let E = t.state.tr.setSelection(v);
          s && E.setMeta("composition", s), t.dispatch(E);
        }
      }
      return;
    }
  t.state.selection.from < t.state.selection.to && p.start == p.endB && t.state.selection instanceof D && (p.start > t.state.selection.from && p.start <= t.state.selection.from + 2 && t.state.selection.from >= c.from ? p.start = t.state.selection.from : p.endA < t.state.selection.to && p.endA >= t.state.selection.to - 2 && t.state.selection.to <= c.to && (p.endB += t.state.selection.to - p.endA, p.endA = t.state.selection.to)), Ce && Wt <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > c.from && c.doc.textBetween(p.start - c.from - 1, p.start - c.from + 1) == "  " && (p.start--, p.endA--, p.endB--);
  let m = c.doc.resolveNoCache(p.start - c.from), g = c.doc.resolveNoCache(p.endB - c.from), y = u.resolve(p.start), b = m.sameParent(g) && m.parent.inlineContent && y.end() >= p.endA;
  if (($n && t.input.lastIOSEnter > Date.now() - 225 && (!b || i.some((v) => v.nodeName == "DIV" || v.nodeName == "P")) || !b && m.pos < c.doc.content.size && (!m.sameParent(g) || !m.parent.inlineContent) && m.pos < g.pos && !/\S/.test(c.doc.textBetween(m.pos, g.pos, "", ""))) && t.someProp("handleKeyDown", (v) => v(t, rn(13, "Enter")))) {
    t.input.lastIOSEnter = 0;
    return;
  }
  if (t.state.selection.anchor > p.start && g0(u, p.start, p.endA, m, g) && t.someProp("handleKeyDown", (v) => v(t, rn(8, "Backspace")))) {
    kt && fe && t.domObserver.suppressSelectionUpdates();
    return;
  }
  fe && p.endB == p.start && (t.input.lastChromeDelete = Date.now()), kt && !b && m.start() != g.start() && g.parentOffset == 0 && m.depth == g.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == p.endA && (p.endB -= 2, g = c.doc.resolveNoCache(p.endB - c.from), setTimeout(() => {
    t.someProp("handleKeyDown", function(v) {
      return v(t, rn(13, "Enter"));
    });
  }, 20));
  let w = p.start, C = p.endA, k = (v) => {
    let E = v || t.state.tr.replace(w, C, c.doc.slice(p.start - c.from, p.endB - c.from));
    if (c.sel) {
      let R = Sc(t, E.doc, c.sel);
      R && !(fe && t.composing && R.empty && (p.start != p.endB || t.input.lastChromeDelete < Date.now() - 100) && (R.head == w || R.head == E.mapping.map(C) - 1) || Ce && R.empty && R.head == w) && E.setSelection(R);
    }
    return s && E.setMeta("composition", s), E.scrollIntoView();
  }, T;
  if (b)
    if (m.pos == g.pos) {
      Ce && Wt <= 11 && m.parentOffset == 0 && (t.domObserver.suppressSelectionUpdates(), setTimeout(() => vt(t), 20));
      let v = k(t.state.tr.delete(w, C)), E = u.resolve(p.start).marksAcross(u.resolve(p.endA));
      E && v.ensureMarks(E), t.dispatch(v);
    } else if (
      // Adding or removing a mark
      p.endA == p.endB && (T = m0(m.parent.content.cut(m.parentOffset, g.parentOffset), y.parent.content.cut(y.parentOffset, p.endA - y.start())))
    ) {
      let v = k(t.state.tr);
      T.type == "add" ? v.addMark(w, C, T.mark) : v.removeMark(w, C, T.mark), t.dispatch(v);
    } else if (m.parent.child(m.index()).isText && m.index() == g.index() - (g.textOffset ? 0 : 1)) {
      let v = m.parent.textBetween(m.parentOffset, g.parentOffset), E = () => k(t.state.tr.insertText(v, w, C));
      t.someProp("handleTextInput", (R) => R(t, w, C, v, E)) || t.dispatch(E());
    } else
      t.dispatch(k());
  else
    t.dispatch(k());
}
function Sc(t, e, n) {
  return Math.max(n.anchor, n.head) > e.content.size ? null : Rl(t, e.resolve(n.anchor), e.resolve(n.head));
}
function m0(t, e) {
  let n = t.firstChild.marks, r = e.firstChild.marks, i = n, s = r, o, l, a;
  for (let u = 0; u < r.length; u++)
    i = r[u].removeFromSet(i);
  for (let u = 0; u < n.length; u++)
    s = n[u].removeFromSet(s);
  if (i.length == 1 && s.length == 0)
    l = i[0], o = "add", a = (u) => u.mark(l.addToSet(u.marks));
  else if (i.length == 0 && s.length == 1)
    l = s[0], o = "remove", a = (u) => u.mark(l.removeFromSet(u.marks));
  else
    return null;
  let c = [];
  for (let u = 0; u < e.childCount; u++)
    c.push(a(e.child(u)));
  if (x.from(c).eq(t))
    return { mark: l, type: o };
}
function g0(t, e, n, r, i) {
  if (
    // The content must have shrunk
    n - e <= i.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
    eo(r, !0, !1) < i.pos
  )
    return !1;
  let s = t.resolve(e);
  if (!r.parent.isTextblock) {
    let l = s.nodeAfter;
    return l != null && n == e + l.nodeSize;
  }
  if (s.parentOffset < s.parent.content.size || !s.parent.isTextblock)
    return !1;
  let o = t.resolve(eo(s, !0, !0));
  return !o.parent.isTextblock || o.pos > n || eo(o, !0, !1) < n ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function eo(t, e, n) {
  let r = t.depth, i = e ? t.end() : t.pos;
  for (; r > 0 && (e || t.indexAfter(r) == t.node(r).childCount); )
    r--, i++, e = !1;
  if (n) {
    let s = t.node(r).maybeChild(t.indexAfter(r));
    for (; s && !s.isLeaf; )
      s = s.firstChild, i++;
  }
  return i;
}
function y0(t, e, n, r, i) {
  let s = t.findDiffStart(e, n);
  if (s == null)
    return null;
  let { a: o, b: l } = t.findDiffEnd(e, n + t.size, n + e.size);
  if (i == "end") {
    let a = Math.max(0, s - Math.min(o, l));
    r -= o + a - s;
  }
  if (o < s && t.size < e.size) {
    let a = r <= s && r >= o ? s - r : 0;
    s -= a, s && s < e.size && vc(e.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1), l = s + (l - o), o = s;
  } else if (l < s) {
    let a = r <= s && r >= l ? s - r : 0;
    s -= a, s && s < t.size && vc(t.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1), o = s + (o - l), l = s;
  }
  return { start: s, endA: o, endB: l };
}
function vc(t) {
  if (t.length != 2)
    return !1;
  let e = t.charCodeAt(0), n = t.charCodeAt(1);
  return e >= 56320 && e <= 57343 && n >= 55296 && n <= 56319;
}
class kf {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, n) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new By(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = n, this.state = n.state, this.directPlugins = n.plugins || [], this.directPlugins.forEach(Ac), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = Tc(this), Mc(this), this.nodeViews = Ec(this), this.docView = ic(this.state.doc, Cc(this), Zs(this), this.dom, this), this.domObserver = new l0(this, (r, i, s, o) => p0(this, r, i, s, o)), this.domObserver.start(), zy(this), this.updatePluginViews();
  }
  /**
  Holds `true` when a
  [composition](https://w3c.github.io/uievents/#events-compositionevents)
  is active.
  */
  get composing() {
    return this.input.composing;
  }
  /**
  The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
  */
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let n in e)
        this._props[n] = e[n];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && Ho(this);
    let n = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(Ac), this.directPlugins = e.plugins), this.updateStateInner(e.state, n);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let n = {};
    for (let r in this._props)
      n[r] = this._props[r];
    n.state = this.state;
    for (let r in e)
      n[r] = e[r];
    this.update(n);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, n) {
    var r;
    let i = this.state, s = !1, o = !1;
    e.storedMarks && this.composing && (hf(this), o = !0), this.state = e;
    let l = i.plugins != e.plugins || this._props.plugins != n.plugins;
    if (l || this._props.plugins != n.plugins || this._props.nodeViews != n.nodeViews) {
      let h = Ec(this);
      w0(h, this.nodeViews) && (this.nodeViews = h, s = !0);
    }
    (l || n.handleDOMEvents != this._props.handleDOMEvents) && Ho(this), this.editable = Tc(this), Mc(this);
    let a = Zs(this), c = Cc(this), u = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve", d = s || !this.docView.matchesNode(e.doc, c, a);
    (d || !e.selection.eq(i.selection)) && (o = !0);
    let f = u == "preserve" && o && this.dom.style.overflowAnchor == null && Xg(this);
    if (o) {
      this.domObserver.stop();
      let h = d && (Ce || fe) && !this.composing && !i.selection.empty && !e.selection.empty && b0(i.selection, e.selection);
      if (d) {
        let p = fe ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = Yy(this)), (s || !this.docView.update(e.doc, c, a, this)) && (this.docView.updateOuterDeco(c), this.docView.destroy(), this.docView = ic(e.doc, c, a, this.dom, this)), p && !this.trackWrites && (h = !0);
      }
      h || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && xy(this)) ? vt(this, h) : (ef(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(i), !((r = this.dragging) === null || r === void 0) && r.node && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i), u == "reset" ? this.dom.scrollTop = 0 : u == "to selection" ? this.scrollToSelection() : f && Qg(f);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode))) {
      if (!this.someProp("handleScrollToSelection", (n) => n(this))) if (this.state.selection instanceof O) {
        let n = this.docView.domAfterPos(this.state.selection.from);
        n.nodeType == 1 && Qa(this, n.getBoundingClientRect(), e);
      } else
        Qa(this, this.coordsAtPos(this.state.selection.head, 1), e);
    }
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let n = 0; n < this.directPlugins.length; n++) {
        let r = this.directPlugins[n];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let n = 0; n < this.state.plugins.length; n++) {
        let r = this.state.plugins[n];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let n = 0; n < this.pluginViews.length; n++) {
        let r = this.pluginViews[n];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, n) {
    let r = e.node, i = -1;
    if (this.state.doc.nodeAt(r.from) == r.node)
      i = r.from;
    else {
      let s = r.from + (this.state.doc.content.size - n.doc.content.size);
      (s > 0 && this.state.doc.nodeAt(s)) == r.node && (i = s);
    }
    this.dragging = new mf(e.slice, e.move, i < 0 ? void 0 : O.create(this.state.doc, i));
  }
  someProp(e, n) {
    let r = this._props && this._props[e], i;
    if (r != null && (i = n ? n(r) : r))
      return i;
    for (let o = 0; o < this.directPlugins.length; o++) {
      let l = this.directPlugins[o].props[e];
      if (l != null && (i = n ? n(l) : l))
        return i;
    }
    let s = this.state.plugins;
    if (s)
      for (let o = 0; o < s.length; o++) {
        let l = s[o].props[e];
        if (l != null && (i = n ? n(l) : l))
          return i;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (Ce) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  /**
  Focus the editor.
  */
  focus() {
    this.domObserver.stop(), this.editable && Zg(this.dom), vt(this), this.domObserver.start();
  }
  /**
  Get the document root in which the editor exists. This will
  usually be the top-level `document`, but might be a [shadow
  DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  root if the editor is inside one.
  */
  get root() {
    let e = this._root;
    if (e == null) {
      for (let n = this.dom.parentNode; n; n = n.parentNode)
        if (n.nodeType == 9 || n.nodeType == 11 && n.host)
          return n.getSelection || (Object.getPrototypeOf(n).getSelection = () => n.ownerDocument.getSelection()), this._root = n;
    }
    return e || document;
  }
  /**
  When an existing editor view is moved to a new document or
  shadow tree, call this to make it recompute its root.
  */
  updateRoot() {
    this._root = null;
  }
  /**
  Given a pair of viewport coordinates, return the document
  position that corresponds to them. May return null if the given
  coordinates aren't inside of the editor. When an object is
  returned, its `pos` property is the position nearest to the
  coordinates, and its `inside` property holds the position of the
  inner node that the position falls inside of, or -1 if it is at
  the top level, not in any node.
  */
  posAtCoords(e) {
    return iy(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, n = 1) {
    return Kd(this, e, n);
  }
  /**
  Find the DOM position that corresponds to the given document
  position. When `side` is negative, find the position as close as
  possible to the content before the position. When positive,
  prefer positions close to the content after the position. When
  zero, prefer as shallow a position as possible.
  
  Note that you should **not** mutate the editor's internal DOM,
  only inspect it (and even that is usually not necessary).
  */
  domAtPos(e, n = 0) {
    return this.docView.domFromPos(e, n);
  }
  /**
  Find the DOM node that represents the document node after the
  given position. May return `null` when the position doesn't point
  in front of a node or if the node is inside an opaque node view.
  
  This is intended to be able to call things like
  `getBoundingClientRect` on that DOM node. Do **not** mutate the
  editor DOM directly, or add styling this way, since that will be
  immediately overriden by the editor as it redraws the node.
  */
  nodeDOM(e) {
    let n = this.docView.descAt(e);
    return n ? n.nodeDOM : null;
  }
  /**
  Find the document position that corresponds to a given DOM
  position. (Whenever possible, it is preferable to inspect the
  document structure directly, rather than poking around in the
  DOM, but sometimes—for example when interpreting an event
  target—you don't have a choice.)
  
  The `bias` parameter can be used to influence which side of a DOM
  node to use when the position is inside a leaf node.
  */
  posAtDOM(e, n, r = -1) {
    let i = this.docView.posFromDOM(e, n, r);
    if (i == null)
      throw new RangeError("DOM position not inside the editor");
    return i;
  }
  /**
  Find out whether the selection is at the end of a textblock when
  moving in a given direction. When, for example, given `"left"`,
  it will return true if moving left from the current cursor
  position would leave that position's parent textblock. Will apply
  to the view's current state by default, but it is possible to
  pass a different state.
  */
  endOfTextblock(e, n) {
    return cy(this, n || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, n) {
    return Mr(this, "", e, !1, n || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, n) {
    return Mr(this, e, null, !0, n || new ClipboardEvent("paste"));
  }
  /**
  Serialize the given slice as it would be if it was copied from
  this editor. Returns a DOM element that contains a
  representation of the slice as its children, a textual
  representation, and the transformed slice (which can be
  different from the given input due to hooks like
  [`transformCopied`](https://prosemirror.net/docs/ref/#view.EditorProps.transformCopied)).
  */
  serializeForClipboard(e) {
    return Dl(this, e);
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && ($y(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], Zs(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, Fg());
  }
  /**
  This is true when the view has been
  [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
  used anymore).
  */
  get isDestroyed() {
    return this.docView == null;
  }
  /**
  Used for testing.
  */
  dispatchEvent(e) {
    return Fy(this, e);
  }
  /**
  @internal
  */
  domSelectionRange() {
    let e = this.domSelection();
    return e ? be && this.root.nodeType === 11 && Wg(this.dom.ownerDocument) == this.dom && c0(this, e) || e : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
kf.prototype.dispatch = function(t) {
  let e = this._props.dispatchTransaction;
  e ? e.call(this, t) : this.updateState(this.state.apply(t));
};
function Cc(t) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(t.editable), t.someProp("attributes", (n) => {
    if (typeof n == "function" && (n = n(t.state)), n)
      for (let r in n)
        r == "class" ? e.class += " " + n[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + n[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(n[r]));
  }), e.translate || (e.translate = "no"), [ye.node(0, t.state.doc.content.size, e)];
}
function Mc(t) {
  if (t.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), t.cursorWrapper = { dom: e, deco: ye.widget(t.state.selection.from, e, { raw: !0, marks: t.markCursor }) };
  } else
    t.cursorWrapper = null;
}
function Tc(t) {
  return !t.someProp("editable", (e) => e(t.state) === !1);
}
function b0(t, e) {
  let n = Math.min(t.$anchor.sharedDepth(t.head), e.$anchor.sharedDepth(e.head));
  return t.$anchor.start(n) != e.$anchor.start(n);
}
function Ec(t) {
  let e = /* @__PURE__ */ Object.create(null);
  function n(r) {
    for (let i in r)
      Object.prototype.hasOwnProperty.call(e, i) || (e[i] = r[i]);
  }
  return t.someProp("nodeViews", n), t.someProp("markViews", n), e;
}
function w0(t, e) {
  let n = 0, r = 0;
  for (let i in t) {
    if (t[i] != e[i])
      return !0;
    n++;
  }
  for (let i in e)
    r++;
  return n != r;
}
function Ac(t) {
  if (t.spec.state || t.spec.filterTransaction || t.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var Gt = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, Ri = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, k0 = typeof navigator < "u" && /Mac/.test(navigator.platform), x0 = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var ue = 0; ue < 10; ue++) Gt[48 + ue] = Gt[96 + ue] = String(ue);
for (var ue = 1; ue <= 24; ue++) Gt[ue + 111] = "F" + ue;
for (var ue = 65; ue <= 90; ue++)
  Gt[ue] = String.fromCharCode(ue + 32), Ri[ue] = String.fromCharCode(ue);
for (var to in Gt) Ri.hasOwnProperty(to) || (Ri[to] = Gt[to]);
function S0(t) {
  var e = k0 && t.metaKey && t.shiftKey && !t.ctrlKey && !t.altKey || x0 && t.shiftKey && t.key && t.key.length == 1 || t.key == "Unidentified", n = !e && t.key || (t.shiftKey ? Ri : Gt)[t.keyCode] || t.key || "Unidentified";
  return n == "Esc" && (n = "Escape"), n == "Del" && (n = "Delete"), n == "Left" && (n = "ArrowLeft"), n == "Up" && (n = "ArrowUp"), n == "Right" && (n = "ArrowRight"), n == "Down" && (n = "ArrowDown"), n;
}
const v0 = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), C0 = typeof navigator < "u" && /Win/.test(navigator.platform);
function M0(t) {
  let e = t.split(/-(?!$)/), n = e[e.length - 1];
  n == "Space" && (n = " ");
  let r, i, s, o;
  for (let l = 0; l < e.length - 1; l++) {
    let a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      o = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      s = !0;
    else if (/^mod$/i.test(a))
      v0 ? o = !0 : i = !0;
    else
      throw new Error("Unrecognized modifier name: " + a);
  }
  return r && (n = "Alt-" + n), i && (n = "Ctrl-" + n), o && (n = "Meta-" + n), s && (n = "Shift-" + n), n;
}
function T0(t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let n in t)
    e[M0(n)] = t[n];
  return e;
}
function no(t, e, n = !0) {
  return e.altKey && (t = "Alt-" + t), e.ctrlKey && (t = "Ctrl-" + t), e.metaKey && (t = "Meta-" + t), n && e.shiftKey && (t = "Shift-" + t), t;
}
function E0(t) {
  return new K({ props: { handleKeyDown: _l(t) } });
}
function _l(t) {
  let e = T0(t);
  return function(n, r) {
    let i = S0(r), s, o = e[no(i, r)];
    if (o && o(n.state, n.dispatch, n))
      return !0;
    if (i.length == 1 && i != " ") {
      if (r.shiftKey) {
        let l = e[no(i, r, !1)];
        if (l && l(n.state, n.dispatch, n))
          return !0;
      }
      if ((r.altKey || r.metaKey || r.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
      !(C0 && r.ctrlKey && r.altKey) && (s = Gt[r.keyCode]) && s != i) {
        let l = e[no(s, r)];
        if (l && l(n.state, n.dispatch, n))
          return !0;
      }
    }
    return !1;
  };
}
var A0 = Object.defineProperty, Fl = (t, e) => {
  for (var n in e)
    A0(t, n, { get: e[n], enumerable: !0 });
};
function Ts(t) {
  const { state: e, transaction: n } = t;
  let { selection: r } = n, { doc: i } = n, { storedMarks: s } = n;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return s;
    },
    get selection() {
      return r;
    },
    get doc() {
      return i;
    },
    get tr() {
      return r = n.selection, i = n.doc, s = n.storedMarks, n;
    }
  };
}
var Es = class {
  constructor(t) {
    this.editor = t.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = t.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: t, editor: e, state: n } = this, { view: r } = e, { tr: i } = n, s = this.buildProps(i);
    return Object.fromEntries(
      Object.entries(t).map(([o, l]) => [o, (...c) => {
        const u = l(...c)(s);
        return !i.getMeta("preventDispatch") && !this.hasCustomState && r.dispatch(i), u;
      }])
    );
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(t, e = !0) {
    const { rawCommands: n, editor: r, state: i } = this, { view: s } = r, o = [], l = !!t, a = t || i.tr, c = () => (!l && e && !a.getMeta("preventDispatch") && !this.hasCustomState && s.dispatch(a), o.every((d) => d === !0)), u = {
      ...Object.fromEntries(
        Object.entries(n).map(([d, f]) => [d, (...p) => {
          const m = this.buildProps(a, e), g = f(...p)(m);
          return o.push(g), u;
        }])
      ),
      run: c
    };
    return u;
  }
  createCan(t) {
    const { rawCommands: e, state: n } = this, r = !1, i = t || n.tr, s = this.buildProps(i, r);
    return {
      ...Object.fromEntries(
        Object.entries(e).map(([l, a]) => [l, (...c) => a(...c)({ ...s, dispatch: void 0 })])
      ),
      chain: () => this.createChain(i, r)
    };
  }
  buildProps(t, e = !0) {
    const { rawCommands: n, editor: r, state: i } = this, { view: s } = r, o = {
      tr: t,
      editor: r,
      view: s,
      state: Ts({
        state: i,
        transaction: t
      }),
      dispatch: e ? () => {
      } : void 0,
      chain: () => this.createChain(t, e),
      can: () => this.createCan(t),
      get commands() {
        return Object.fromEntries(
          Object.entries(n).map(([l, a]) => [l, (...c) => a(...c)(o)])
        );
      }
    };
    return o;
  }
}, xf = {};
Fl(xf, {
  blur: () => O0,
  clearContent: () => N0,
  clearNodes: () => I0,
  command: () => R0,
  createParagraphNear: () => D0,
  cut: () => P0,
  deleteCurrentNode: () => L0,
  deleteNode: () => B0,
  deleteRange: () => z0,
  deleteSelection: () => $0,
  enter: () => _0,
  exitCode: () => F0,
  extendMarkRange: () => H0,
  first: () => V0,
  focus: () => U0,
  forEach: () => W0,
  insertContent: () => K0,
  insertContentAt: () => G0,
  joinBackward: () => Q0,
  joinDown: () => X0,
  joinForward: () => Z0,
  joinItemBackward: () => eb,
  joinItemForward: () => tb,
  joinTextblockBackward: () => nb,
  joinTextblockForward: () => rb,
  joinUp: () => Y0,
  keyboardShortcut: () => sb,
  lift: () => ob,
  liftEmptyBlock: () => lb,
  liftListItem: () => ab,
  newlineInCode: () => cb,
  resetAttributes: () => ub,
  scrollIntoView: () => db,
  selectAll: () => fb,
  selectNodeBackward: () => hb,
  selectNodeForward: () => pb,
  selectParentNode: () => mb,
  selectTextblockEnd: () => gb,
  selectTextblockStart: () => yb,
  setContent: () => bb,
  setMark: () => Lb,
  setMeta: () => Bb,
  setNode: () => zb,
  setNodeSelection: () => $b,
  setTextSelection: () => _b,
  sinkListItem: () => Fb,
  splitBlock: () => Hb,
  splitListItem: () => Vb,
  toggleList: () => jb,
  toggleMark: () => Ub,
  toggleNode: () => Wb,
  toggleWrap: () => Kb,
  undoInputRule: () => qb,
  unsetAllMarks: () => Jb,
  unsetMark: () => Gb,
  updateAttributes: () => Yb,
  wrapIn: () => Xb,
  wrapInList: () => Qb
});
var O0 = () => ({ editor: t, view: e }) => (requestAnimationFrame(() => {
  var n;
  t.isDestroyed || (e.dom.blur(), (n = window == null ? void 0 : window.getSelection()) == null || n.removeAllRanges());
}), !0), N0 = (t = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: t }), I0 = () => ({ state: t, tr: e, dispatch: n }) => {
  const { selection: r } = e, { ranges: i } = r;
  return n && i.forEach(({ $from: s, $to: o }) => {
    t.doc.nodesBetween(s.pos, o.pos, (l, a) => {
      if (l.type.isText)
        return;
      const { doc: c, mapping: u } = e, d = c.resolve(u.map(a)), f = c.resolve(u.map(a + l.nodeSize)), h = d.blockRange(f);
      if (!h)
        return;
      const p = Wn(h);
      if (l.type.isTextblock) {
        const { defaultType: m } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(h.start, m);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, R0 = (t) => (e) => t(e), D0 = () => ({ state: t, dispatch: e }) => Bd(t, e), P0 = (t, e) => ({ editor: n, tr: r }) => {
  const { state: i } = n, s = i.doc.slice(t.from, t.to);
  r.deleteRange(t.from, t.to);
  const o = r.mapping.map(e);
  return r.insert(o, s.content), r.setSelection(new D(r.doc.resolve(Math.max(o - 1, 0)))), !0;
}, L0 = () => ({ tr: t, dispatch: e }) => {
  const { selection: n } = t, r = n.$anchor.node();
  if (r.content.size > 0)
    return !1;
  const i = t.selection.$anchor;
  for (let s = i.depth; s > 0; s -= 1)
    if (i.node(s).type === r.type) {
      if (e) {
        const l = i.before(s), a = i.after(s);
        t.delete(l, a).scrollIntoView();
      }
      return !0;
    }
  return !1;
};
function ee(t, e) {
  if (typeof t == "string") {
    if (!e.nodes[t])
      throw Error(`There is no node type named '${t}'. Maybe you forgot to add the extension?`);
    return e.nodes[t];
  }
  return t;
}
var B0 = (t) => ({ tr: e, state: n, dispatch: r }) => {
  const i = ee(t, n.schema), s = e.selection.$anchor;
  for (let o = s.depth; o > 0; o -= 1)
    if (s.node(o).type === i) {
      if (r) {
        const a = s.before(o), c = s.after(o);
        e.delete(a, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, z0 = (t) => ({ tr: e, dispatch: n }) => {
  const { from: r, to: i } = t;
  return n && e.delete(r, i), !0;
}, $0 = () => ({ state: t, dispatch: e }) => Ml(t, e), _0 = () => ({ commands: t }) => t.keyboardShortcut("Enter"), F0 = () => ({ state: t, dispatch: e }) => Mg(t, e);
function Hl(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}
function Di(t, e, n = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => n.strict ? e[i] === t[i] : Hl(e[i]) ? e[i].test(t[i]) : e[i] === t[i]) : !0;
}
function Sf(t, e, n = {}) {
  return t.find((r) => r.type === e && Di(
    // Only check equality for the attributes that are provided
    Object.fromEntries(Object.keys(n).map((i) => [i, r.attrs[i]])),
    n
  ));
}
function Oc(t, e, n = {}) {
  return !!Sf(t, e, n);
}
function Vl(t, e, n) {
  var r;
  if (!t || !e)
    return;
  let i = t.parent.childAfter(t.parentOffset);
  if ((!i.node || !i.node.marks.some((u) => u.type === e)) && (i = t.parent.childBefore(t.parentOffset)), !i.node || !i.node.marks.some((u) => u.type === e) || (n = n || ((r = i.node.marks[0]) == null ? void 0 : r.attrs), !Sf([...i.node.marks], e, n)))
    return;
  let o = i.index, l = t.start() + i.offset, a = o + 1, c = l + i.node.nodeSize;
  for (; o > 0 && Oc([...t.parent.child(o - 1).marks], e, n); )
    o -= 1, l -= t.parent.child(o).nodeSize;
  for (; a < t.parent.childCount && Oc([...t.parent.child(a).marks], e, n); )
    c += t.parent.child(a).nodeSize, a += 1;
  return {
    from: l,
    to: c
  };
}
function Ct(t, e) {
  if (typeof t == "string") {
    if (!e.marks[t])
      throw Error(`There is no mark type named '${t}'. Maybe you forgot to add the extension?`);
    return e.marks[t];
  }
  return t;
}
var H0 = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  const s = Ct(t, r.schema), { doc: o, selection: l } = n, { $from: a, from: c, to: u } = l;
  if (i) {
    const d = Vl(a, s, e);
    if (d && d.from <= c && d.to >= u) {
      const f = D.create(o, d.from, d.to);
      n.setSelection(f);
    }
  }
  return !0;
}, V0 = (t) => (e) => {
  const n = typeof t == "function" ? t(e) : t;
  for (let r = 0; r < n.length; r += 1)
    if (n[r](e))
      return !0;
  return !1;
};
function jl(t) {
  return t instanceof D;
}
function xt(t = 0, e = 0, n = 0) {
  return Math.min(Math.max(t, e), n);
}
function vf(t, e = null) {
  if (!e)
    return null;
  const n = I.atStart(t), r = I.atEnd(t);
  if (e === "start" || e === !0)
    return n;
  if (e === "end")
    return r;
  const i = n.from, s = r.to;
  return e === "all" ? D.create(t, xt(0, i, s), xt(t.content.size, i, s)) : D.create(t, xt(e, i, s), xt(e, i, s));
}
function j0() {
  return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
}
function Ul() {
  return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || // iPad on iOS 13 detection
  navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
var U0 = (t = null, e = {}) => ({ editor: n, view: r, tr: i, dispatch: s }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const o = () => {
    (Ul() || j0()) && r.dom.focus(), requestAnimationFrame(() => {
      n.isDestroyed || (r.focus(), e != null && e.scrollIntoView && n.commands.scrollIntoView());
    });
  };
  if (r.hasFocus() && t === null || t === !1)
    return !0;
  if (s && t === null && !jl(n.state.selection))
    return o(), !0;
  const l = vf(i.doc, t) || n.state.selection, a = n.state.selection.eq(l);
  return s && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0;
}, W0 = (t, e) => (n) => t.every((r, i) => e(r, { ...n, index: i })), K0 = (t, e) => ({ tr: n, commands: r }) => r.insertContentAt({ from: n.selection.from, to: n.selection.to }, t, e), Cf = (t) => {
  const e = t.childNodes;
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const r = e[n];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? t.removeChild(r) : r.nodeType === 1 && Cf(r);
  }
  return t;
};
function qr(t) {
  if (typeof window > "u")
    throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${t}</body>`, n = new window.DOMParser().parseFromString(e, "text/html").body;
  return Cf(n);
}
function Er(t, e, n) {
  if (t instanceof jt || t instanceof x)
    return t;
  n = {
    slice: !0,
    parseOptions: {},
    ...n
  };
  const r = typeof t == "object" && t !== null, i = typeof t == "string";
  if (r)
    try {
      if (Array.isArray(t) && t.length > 0)
        return x.fromArray(t.map((l) => e.nodeFromJSON(l)));
      const o = e.nodeFromJSON(t);
      return n.errorOnInvalidContent && o.check(), o;
    } catch (s) {
      if (n.errorOnInvalidContent)
        throw new Error("[tiptap error]: Invalid JSON content", { cause: s });
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", t, "Error:", s), Er("", e, n);
    }
  if (i) {
    if (n.errorOnInvalidContent) {
      let o = !1, l = "";
      const a = new ad({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        // Prosemirror's schemas are executed such that: the last to execute, matches last
        // This means that we can add a catch-all node at the end of the schema to catch any content that we don't know how to handle
        nodes: e.spec.nodes.append({
          __tiptap__private__unknown__catch__all__node: {
            content: "inline*",
            group: "block",
            parseDOM: [
              {
                tag: "*",
                getAttrs: (c) => (o = !0, l = typeof c == "string" ? c : c.outerHTML, null)
              }
            ]
          }
        })
      });
      if (n.slice ? Ut.fromSchema(a).parseSlice(qr(t), n.parseOptions) : Ut.fromSchema(a).parse(qr(t), n.parseOptions), n.errorOnInvalidContent && o)
        throw new Error("[tiptap error]: Invalid HTML content", {
          cause: new Error(`Invalid element found: ${l}`)
        });
    }
    const s = Ut.fromSchema(e);
    return n.slice ? s.parseSlice(qr(t), n.parseOptions).content : s.parse(qr(t), n.parseOptions);
  }
  return Er("", e, n);
}
function q0(t, e, n) {
  const r = t.steps.length - 1;
  if (r < e)
    return;
  const i = t.steps[r];
  if (!(i instanceof ie || i instanceof se))
    return;
  const s = t.mapping.maps[r];
  let o = 0;
  s.forEach((l, a, c, u) => {
    o === 0 && (o = u);
  }), t.setSelection(I.near(t.doc.resolve(o), n));
}
var J0 = (t) => !("type" in t), G0 = (t, e, n) => ({ tr: r, dispatch: i, editor: s }) => {
  var o;
  if (i) {
    n = {
      parseOptions: s.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...n
    };
    let l;
    const a = (g) => {
      s.emit("contentError", {
        editor: s,
        error: g,
        disableCollaboration: () => {
          "collaboration" in s.storage && typeof s.storage.collaboration == "object" && s.storage.collaboration && (s.storage.collaboration.isDisabled = !0);
        }
      });
    }, c = {
      preserveWhitespace: "full",
      ...n.parseOptions
    };
    if (!n.errorOnInvalidContent && !s.options.enableContentCheck && s.options.emitContentError)
      try {
        Er(e, s.schema, {
          parseOptions: c,
          errorOnInvalidContent: !0
        });
      } catch (g) {
        a(g);
      }
    try {
      l = Er(e, s.schema, {
        parseOptions: c,
        errorOnInvalidContent: (o = n.errorOnInvalidContent) != null ? o : s.options.enableContentCheck
      });
    } catch (g) {
      return a(g), !1;
    }
    let { from: u, to: d } = typeof t == "number" ? { from: t, to: t } : { from: t.from, to: t.to }, f = !0, h = !0;
    if ((J0(l) ? l : [l]).forEach((g) => {
      g.check(), f = f ? g.isText && g.marks.length === 0 : !1, h = h ? g.isBlock : !1;
    }), u === d && h) {
      const { parent: g } = r.doc.resolve(u);
      g.isTextblock && !g.type.spec.code && !g.childCount && (u -= 1, d += 1);
    }
    let m;
    if (f) {
      if (Array.isArray(e))
        m = e.map((g) => g.text || "").join("");
      else if (e instanceof x) {
        let g = "";
        e.forEach((y) => {
          y.text && (g += y.text);
        }), m = g;
      } else typeof e == "object" && e && e.text ? m = e.text : m = e;
      r.insertText(m, u, d);
    } else {
      m = l;
      const g = r.doc.resolve(u), y = g.node(), b = g.parentOffset === 0, w = y.isText || y.isTextblock, C = y.content.size > 0;
      b && w && C && (u = Math.max(0, u - 1)), r.replaceWith(u, d, m);
    }
    n.updateSelection && q0(r, r.steps.length - 1, -1), n.applyInputRules && r.setMeta("applyInputRules", { from: u, text: m }), n.applyPasteRules && r.setMeta("applyPasteRules", { from: u, text: m });
  }
  return !0;
}, Y0 = () => ({ state: t, dispatch: e }) => Sg(t, e), X0 = () => ({ state: t, dispatch: e }) => vg(t, e), Q0 = () => ({ state: t, dispatch: e }) => Od(t, e), Z0 = () => ({ state: t, dispatch: e }) => Dd(t, e), eb = () => ({ state: t, dispatch: e, tr: n }) => {
  try {
    const r = ks(t.doc, t.selection.$from.pos, -1);
    return r == null ? !1 : (n.join(r, 2), e && e(n), !0);
  } catch {
    return !1;
  }
}, tb = () => ({ state: t, dispatch: e, tr: n }) => {
  try {
    const r = ks(t.doc, t.selection.$from.pos, 1);
    return r == null ? !1 : (n.join(r, 2), e && e(n), !0);
  } catch {
    return !1;
  }
}, nb = () => ({ state: t, dispatch: e }) => kg(t, e), rb = () => ({ state: t, dispatch: e }) => xg(t, e);
function Mf() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function ib(t) {
  const e = t.split(/-(?!$)/);
  let n = e[e.length - 1];
  n === "Space" && (n = " ");
  let r, i, s, o;
  for (let l = 0; l < e.length - 1; l += 1) {
    const a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      o = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      s = !0;
    else if (/^mod$/i.test(a))
      Ul() || Mf() ? o = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (n = `Alt-${n}`), i && (n = `Ctrl-${n}`), o && (n = `Meta-${n}`), s && (n = `Shift-${n}`), n;
}
var sb = (t) => ({ editor: e, view: n, tr: r, dispatch: i }) => {
  const s = ib(t).split(/-(?!$)/), o = s.find((c) => !["Alt", "Ctrl", "Meta", "Shift"].includes(c)), l = new KeyboardEvent("keydown", {
    key: o === "Space" ? " " : o,
    altKey: s.includes("Alt"),
    ctrlKey: s.includes("Ctrl"),
    metaKey: s.includes("Meta"),
    shiftKey: s.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), a = e.captureTransaction(() => {
    n.someProp("handleKeyDown", (c) => c(n, l));
  });
  return a == null || a.steps.forEach((c) => {
    const u = c.map(r.mapping);
    u && i && r.maybeStep(u);
  }), !0;
};
function Yt(t, e, n = {}) {
  const { from: r, to: i, empty: s } = t.selection, o = e ? ee(e, t.schema) : null, l = [];
  t.doc.nodesBetween(r, i, (d, f) => {
    if (d.isText)
      return;
    const h = Math.max(r, f), p = Math.min(i, f + d.nodeSize);
    l.push({
      node: d,
      from: h,
      to: p
    });
  });
  const a = i - r, c = l.filter((d) => o ? o.name === d.node.type.name : !0).filter((d) => Di(d.node.attrs, n, { strict: !1 }));
  return s ? !!c.length : c.reduce((d, f) => d + f.to - f.from, 0) >= a;
}
var ob = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = ee(t, n.schema);
  return Yt(n, i, e) ? Cg(n, r) : !1;
}, lb = () => ({ state: t, dispatch: e }) => zd(t, e), ab = (t) => ({ state: e, dispatch: n }) => {
  const r = ee(t, e.schema);
  return Bg(r)(e, n);
}, cb = () => ({ state: t, dispatch: e }) => Ld(t, e);
function As(t, e) {
  return e.nodes[t] ? "node" : e.marks[t] ? "mark" : null;
}
function Nc(t, e) {
  const n = typeof e == "string" ? [e] : e;
  return Object.keys(t).reduce((r, i) => (n.includes(i) || (r[i] = t[i]), r), {});
}
var ub = (t, e) => ({ tr: n, state: r, dispatch: i }) => {
  let s = null, o = null;
  const l = As(
    typeof t == "string" ? t : t.name,
    r.schema
  );
  return l ? (l === "node" && (s = ee(t, r.schema)), l === "mark" && (o = Ct(t, r.schema)), i && n.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (c, u) => {
      s && s === c.type && n.setNodeMarkup(u, void 0, Nc(c.attrs, e)), o && c.marks.length && c.marks.forEach((d) => {
        o === d.type && n.addMark(u, u + c.nodeSize, o.create(Nc(d.attrs, e)));
      });
    });
  }), !0) : !1;
}, db = () => ({ tr: t, dispatch: e }) => (e && t.scrollIntoView(), !0), fb = () => ({ tr: t, dispatch: e }) => {
  if (e) {
    const n = new Ie(t.doc);
    t.setSelection(n);
  }
  return !0;
}, hb = () => ({ state: t, dispatch: e }) => Id(t, e), pb = () => ({ state: t, dispatch: e }) => Pd(t, e), mb = () => ({ state: t, dispatch: e }) => Ag(t, e), gb = () => ({ state: t, dispatch: e }) => Ig(t, e), yb = () => ({ state: t, dispatch: e }) => Ng(t, e);
function Vo(t, e, n = {}, r = {}) {
  return Er(t, e, {
    slice: !1,
    parseOptions: n,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
var bb = (t, { errorOnInvalidContent: e, emitUpdate: n = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: s, dispatch: o, commands: l }) => {
  const { doc: a } = s;
  if (r.preserveWhitespace !== "full") {
    const c = Vo(t, i.schema, r, {
      errorOnInvalidContent: e ?? i.options.enableContentCheck
    });
    return o && s.replaceWith(0, a.content.size, c).setMeta("preventUpdate", !n), !0;
  }
  return o && s.setMeta("preventUpdate", !n), l.insertContentAt({ from: 0, to: a.content.size }, t, {
    parseOptions: r,
    errorOnInvalidContent: e ?? i.options.enableContentCheck
  });
};
function Tf(t, e) {
  const n = Ct(e, t.schema), { from: r, to: i, empty: s } = t.selection, o = [];
  s ? (t.storedMarks && o.push(...t.storedMarks), o.push(...t.selection.$head.marks())) : t.doc.nodesBetween(r, i, (a) => {
    o.push(...a.marks);
  });
  const l = o.find((a) => a.type.name === n.name);
  return l ? { ...l.attrs } : {};
}
function Ef(t, e) {
  const n = new Cd(t);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      n.step(i);
    });
  }), n;
}
function wb(t) {
  for (let e = 0; e < t.edgeCount; e += 1) {
    const { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs())
      return n;
  }
  return null;
}
function kb(t, e, n) {
  const r = [];
  return t.nodesBetween(e.from, e.to, (i, s) => {
    n(i) && r.push({
      node: i,
      pos: s
    });
  }), r;
}
function xb(t, e) {
  for (let n = t.depth; n > 0; n -= 1) {
    const r = t.node(n);
    if (e(r))
      return {
        pos: n > 0 ? t.before(n) : 0,
        start: t.start(n),
        depth: n,
        node: r
      };
  }
}
function zr(t) {
  return (e) => xb(e.$from, t);
}
function A(t, e, n) {
  return t.config[e] === void 0 && t.parent ? A(t.parent, e, n) : typeof t.config[e] == "function" ? t.config[e].bind({
    ...n,
    parent: t.parent ? A(t.parent, e, n) : null
  }) : t.config[e];
}
function Wl(t) {
  return t.map((e) => {
    const n = {
      name: e.name,
      options: e.options,
      storage: e.storage
    }, r = A(e, "addExtensions", n);
    return r ? [e, ...Wl(r())] : e;
  }).flat(10);
}
function Kl(t, e) {
  const n = wn.fromSchema(e).serializeFragment(t), i = document.implementation.createHTMLDocument().createElement("div");
  return i.appendChild(n), i.innerHTML;
}
function Af(t) {
  return typeof t == "function";
}
function B(t, e = void 0, ...n) {
  return Af(t) ? e ? t.bind(e)(...n) : t(...n) : t;
}
function Sb(t = {}) {
  return Object.keys(t).length === 0 && t.constructor === Object;
}
function Ar(t) {
  const e = t.filter((i) => i.type === "extension"), n = t.filter((i) => i.type === "node"), r = t.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: n,
    markExtensions: r
  };
}
function Of(t) {
  const e = [], { nodeExtensions: n, markExtensions: r } = Ar(t), i = [...n, ...r], s = {
    default: null,
    validate: void 0,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  };
  return t.forEach((o) => {
    const l = {
      name: o.name,
      options: o.options,
      storage: o.storage,
      extensions: i
    }, a = A(
      o,
      "addGlobalAttributes",
      l
    );
    if (!a)
      return;
    a().forEach((u) => {
      u.types.forEach((d) => {
        Object.entries(u.attributes).forEach(([f, h]) => {
          e.push({
            type: d,
            name: f,
            attribute: {
              ...s,
              ...h
            }
          });
        });
      });
    });
  }), i.forEach((o) => {
    const l = {
      name: o.name,
      options: o.options,
      storage: o.storage
    }, a = A(
      o,
      "addAttributes",
      l
    );
    if (!a)
      return;
    const c = a();
    Object.entries(c).forEach(([u, d]) => {
      const f = {
        ...s,
        ...d
      };
      typeof (f == null ? void 0 : f.default) == "function" && (f.default = f.default()), f != null && f.isRequired && (f == null ? void 0 : f.default) === void 0 && delete f.default, e.push({
        type: o.name,
        name: u,
        attribute: f
      });
    });
  }), e;
}
function Q(...t) {
  return t.filter((e) => !!e).reduce((e, n) => {
    const r = { ...e };
    return Object.entries(n).forEach(([i, s]) => {
      if (!r[i]) {
        r[i] = s;
        return;
      }
      if (i === "class") {
        const l = s ? String(s).split(" ") : [], a = r[i] ? r[i].split(" ") : [], c = l.filter((u) => !a.includes(u));
        r[i] = [...a, ...c].join(" ");
      } else if (i === "style") {
        const l = s ? s.split(";").map((u) => u.trim()).filter(Boolean) : [], a = r[i] ? r[i].split(";").map((u) => u.trim()).filter(Boolean) : [], c = /* @__PURE__ */ new Map();
        a.forEach((u) => {
          const [d, f] = u.split(":").map((h) => h.trim());
          c.set(d, f);
        }), l.forEach((u) => {
          const [d, f] = u.split(":").map((h) => h.trim());
          c.set(d, f);
        }), r[i] = Array.from(c.entries()).map(([u, d]) => `${u}: ${d}`).join("; ");
      } else
        r[i] = s;
    }), r;
  }, {});
}
function Pi(t, e) {
  return e.filter((n) => n.type === t.type.name).filter((n) => n.attribute.rendered).map((n) => n.attribute.renderHTML ? n.attribute.renderHTML(t.attrs) || {} : {
    [n.name]: t.attrs[n.name]
  }).reduce((n, r) => Q(n, r), {});
}
function vb(t) {
  return typeof t != "string" ? t : t.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(t) : t === "true" ? !0 : t === "false" ? !1 : t;
}
function Ic(t, e) {
  return "style" in t ? t : {
    ...t,
    getAttrs: (n) => {
      const r = t.getAttrs ? t.getAttrs(n) : t.attrs;
      if (r === !1)
        return !1;
      const i = e.reduce((s, o) => {
        const l = o.attribute.parseHTML ? o.attribute.parseHTML(n) : vb(n.getAttribute(o.name));
        return l == null ? s : {
          ...s,
          [o.name]: l
        };
      }, {});
      return { ...r, ...i };
    }
  };
}
function Rc(t) {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(t).filter(([e, n]) => e === "attrs" && Sb(n) ? !1 : n != null)
  );
}
function Cb(t, e) {
  var n;
  const r = Of(t), { nodeExtensions: i, markExtensions: s } = Ar(t), o = (n = i.find((c) => A(c, "topNode"))) == null ? void 0 : n.name, l = Object.fromEntries(
    i.map((c) => {
      const u = r.filter((y) => y.type === c.name), d = {
        name: c.name,
        options: c.options,
        storage: c.storage,
        editor: e
      }, f = t.reduce((y, b) => {
        const w = A(b, "extendNodeSchema", d);
        return {
          ...y,
          ...w ? w(c) : {}
        };
      }, {}), h = Rc({
        ...f,
        content: B(A(c, "content", d)),
        marks: B(A(c, "marks", d)),
        group: B(A(c, "group", d)),
        inline: B(A(c, "inline", d)),
        atom: B(A(c, "atom", d)),
        selectable: B(A(c, "selectable", d)),
        draggable: B(A(c, "draggable", d)),
        code: B(A(c, "code", d)),
        whitespace: B(A(c, "whitespace", d)),
        linebreakReplacement: B(
          A(c, "linebreakReplacement", d)
        ),
        defining: B(A(c, "defining", d)),
        isolating: B(A(c, "isolating", d)),
        attrs: Object.fromEntries(
          u.map((y) => {
            var b, w;
            return [
              y.name,
              { default: (b = y == null ? void 0 : y.attribute) == null ? void 0 : b.default, validate: (w = y == null ? void 0 : y.attribute) == null ? void 0 : w.validate }
            ];
          })
        )
      }), p = B(A(c, "parseHTML", d));
      p && (h.parseDOM = p.map(
        (y) => Ic(y, u)
      ));
      const m = A(c, "renderHTML", d);
      m && (h.toDOM = (y) => m({
        node: y,
        HTMLAttributes: Pi(y, u)
      }));
      const g = A(c, "renderText", d);
      return g && (h.toText = g), [c.name, h];
    })
  ), a = Object.fromEntries(
    s.map((c) => {
      const u = r.filter((g) => g.type === c.name), d = {
        name: c.name,
        options: c.options,
        storage: c.storage,
        editor: e
      }, f = t.reduce((g, y) => {
        const b = A(y, "extendMarkSchema", d);
        return {
          ...g,
          ...b ? b(c) : {}
        };
      }, {}), h = Rc({
        ...f,
        inclusive: B(A(c, "inclusive", d)),
        excludes: B(A(c, "excludes", d)),
        group: B(A(c, "group", d)),
        spanning: B(A(c, "spanning", d)),
        code: B(A(c, "code", d)),
        attrs: Object.fromEntries(
          u.map((g) => {
            var y, b;
            return [
              g.name,
              { default: (y = g == null ? void 0 : g.attribute) == null ? void 0 : y.default, validate: (b = g == null ? void 0 : g.attribute) == null ? void 0 : b.validate }
            ];
          })
        )
      }), p = B(A(c, "parseHTML", d));
      p && (h.parseDOM = p.map(
        (g) => Ic(g, u)
      ));
      const m = A(c, "renderHTML", d);
      return m && (h.toDOM = (g) => m({
        mark: g,
        HTMLAttributes: Pi(g, u)
      })), [c.name, h];
    })
  );
  return new ad({
    topNode: o,
    nodes: l,
    marks: a
  });
}
function Mb(t) {
  const e = t.filter((n, r) => t.indexOf(n) !== r);
  return Array.from(new Set(e));
}
function ql(t) {
  return t.sort((n, r) => {
    const i = A(n, "priority") || 100, s = A(r, "priority") || 100;
    return i > s ? -1 : i < s ? 1 : 0;
  });
}
function Nf(t) {
  const e = ql(Wl(t)), n = Mb(e.map((r) => r.name));
  return n.length && console.warn(
    `[tiptap warn]: Duplicate extension names found: [${n.map((r) => `'${r}'`).join(", ")}]. This can lead to issues.`
  ), e;
}
function If(t, e, n) {
  const { from: r, to: i } = e, { blockSeparator: s = `

`, textSerializers: o = {} } = n || {};
  let l = "";
  return t.nodesBetween(r, i, (a, c, u, d) => {
    var f;
    a.isBlock && c > r && (l += s);
    const h = o == null ? void 0 : o[a.type.name];
    if (h)
      return u && (l += h({
        node: a,
        pos: c,
        parent: u,
        index: d,
        range: e
      })), !1;
    a.isText && (l += (f = a == null ? void 0 : a.text) == null ? void 0 : f.slice(Math.max(r, c) - c, i - c));
  }), l;
}
function Rf(t, e) {
  const n = {
    from: 0,
    to: t.content.size
  };
  return If(t, n, e);
}
function Jl(t) {
  return Object.fromEntries(
    Object.entries(t.nodes).filter(([, e]) => e.spec.toText).map(([e, n]) => [e, n.spec.toText])
  );
}
function Tb(t, e) {
  const n = ee(e, t.schema), { from: r, to: i } = t.selection, s = [];
  t.doc.nodesBetween(r, i, (l) => {
    s.push(l);
  });
  const o = s.reverse().find((l) => l.type.name === n.name);
  return o ? { ...o.attrs } : {};
}
function Df(t, e) {
  const n = As(
    typeof e == "string" ? e : e.name,
    t.schema
  );
  return n === "node" ? Tb(t, e) : n === "mark" ? Tf(t, e) : {};
}
function Eb(t, e = JSON.stringify) {
  const n = {};
  return t.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(n, i) ? !1 : n[i] = !0;
  });
}
function Ab(t) {
  const e = Eb(t);
  return e.length === 1 ? e : e.filter((n, r) => !e.filter((s, o) => o !== r).some((s) => n.oldRange.from >= s.oldRange.from && n.oldRange.to <= s.oldRange.to && n.newRange.from >= s.newRange.from && n.newRange.to <= s.newRange.to));
}
function Pf(t) {
  const { mapping: e, steps: n } = t, r = [];
  return e.maps.forEach((i, s) => {
    const o = [];
    if (i.ranges.length)
      i.forEach((l, a) => {
        o.push({ from: l, to: a });
      });
    else {
      const { from: l, to: a } = n[s];
      if (l === void 0 || a === void 0)
        return;
      o.push({ from: l, to: a });
    }
    o.forEach(({ from: l, to: a }) => {
      const c = e.slice(s).map(l, -1), u = e.slice(s).map(a), d = e.invert().map(c, -1), f = e.invert().map(u);
      r.push({
        oldRange: {
          from: d,
          to: f
        },
        newRange: {
          from: c,
          to: u
        }
      });
    });
  }), Ab(r);
}
function Gl(t, e, n) {
  const r = [];
  return t === e ? n.resolve(t).marks().forEach((i) => {
    const s = n.resolve(t), o = Vl(s, i.type);
    o && r.push({
      mark: i,
      ...o
    });
  }) : n.nodesBetween(t, e, (i, s) => {
    !i || (i == null ? void 0 : i.nodeSize) === void 0 || r.push(
      ...i.marks.map((o) => ({
        from: s,
        to: s + i.nodeSize,
        mark: o
      }))
    );
  }), r;
}
var Ob = (t, e, n, r = 20) => {
  const i = t.doc.resolve(n);
  let s = r, o = null;
  for (; s > 0 && o === null; ) {
    const l = i.node(s);
    (l == null ? void 0 : l.type.name) === e ? o = l : s -= 1;
  }
  return [o, s];
};
function ro(t, e) {
  return e.nodes[t] || e.marks[t] || null;
}
function ci(t, e, n) {
  return Object.fromEntries(
    Object.entries(n).filter(([r]) => {
      const i = t.find((s) => s.type === e && s.name === r);
      return i ? i.attribute.keepOnSplit : !1;
    })
  );
}
var Nb = (t, e = 500) => {
  let n = "";
  const r = t.parentOffset;
  return t.parent.nodesBetween(Math.max(0, r - e), r, (i, s, o, l) => {
    var a, c;
    const u = ((c = (a = i.type.spec).toText) == null ? void 0 : c.call(a, {
      node: i,
      pos: s,
      parent: o,
      index: l
    })) || i.textContent || "%leaf%";
    n += i.isAtom && !i.isText ? u : u.slice(0, Math.max(0, r - s));
  }), n;
};
function jo(t, e, n = {}) {
  const { empty: r, ranges: i } = t.selection, s = e ? Ct(e, t.schema) : null;
  if (r)
    return !!(t.storedMarks || t.selection.$from.marks()).filter((d) => s ? s.name === d.type.name : !0).find((d) => Di(d.attrs, n, { strict: !1 }));
  let o = 0;
  const l = [];
  if (i.forEach(({ $from: d, $to: f }) => {
    const h = d.pos, p = f.pos;
    t.doc.nodesBetween(h, p, (m, g) => {
      if (!m.isText && !m.marks.length)
        return;
      const y = Math.max(h, g), b = Math.min(p, g + m.nodeSize), w = b - y;
      o += w, l.push(
        ...m.marks.map((C) => ({
          mark: C,
          from: y,
          to: b
        }))
      );
    });
  }), o === 0)
    return !1;
  const a = l.filter((d) => s ? s.name === d.mark.type.name : !0).filter((d) => Di(d.mark.attrs, n, { strict: !1 })).reduce((d, f) => d + f.to - f.from, 0), c = l.filter((d) => s ? d.mark.type !== s && d.mark.type.excludes(s) : !0).reduce((d, f) => d + f.to - f.from, 0);
  return (a > 0 ? a + c : a) >= o;
}
function Ib(t, e, n = {}) {
  if (!e)
    return Yt(t, null, n) || jo(t, null, n);
  const r = As(e, t.schema);
  return r === "node" ? Yt(t, e, n) : r === "mark" ? jo(t, e, n) : !1;
}
var Rb = (t, e) => {
  const { $from: n, $to: r, $anchor: i } = t.selection;
  if (e) {
    const s = zr((l) => l.type.name === e)(t.selection);
    if (!s)
      return !1;
    const o = t.doc.resolve(s.pos + 1);
    return i.pos + 1 === o.end();
  }
  return !(r.parentOffset < r.parent.nodeSize - 2 || n.pos !== r.pos);
}, Db = (t) => {
  const { $from: e, $to: n } = t.selection;
  return !(e.parentOffset > 0 || e.pos !== n.pos);
};
function Dc(t, e) {
  return Array.isArray(e) ? e.some((n) => (typeof n == "string" ? n : n.name) === t.name) : e;
}
function Uo(t, e) {
  const { nodeExtensions: n } = Ar(e), r = n.find((o) => o.name === t);
  if (!r)
    return !1;
  const i = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, s = B(A(r, "group", i));
  return typeof s != "string" ? !1 : s.split(" ").includes("list");
}
function Os(t, {
  checkChildren: e = !0,
  ignoreWhitespace: n = !1
} = {}) {
  var r;
  if (n) {
    if (t.type.name === "hardBreak")
      return !0;
    if (t.isText)
      return /^\s*$/m.test((r = t.text) != null ? r : "");
  }
  if (t.isText)
    return !t.text;
  if (t.isAtom || t.isLeaf)
    return !1;
  if (t.content.childCount === 0)
    return !0;
  if (e) {
    let i = !0;
    return t.content.forEach((s) => {
      i !== !1 && (Os(s, { ignoreWhitespace: n, checkChildren: e }) || (i = !1));
    }), i;
  }
  return !1;
}
function Lf(t) {
  return t instanceof O;
}
function Bf(t, e, n) {
  const i = t.state.doc.content.size, s = xt(e, 0, i), o = xt(n, 0, i), l = t.coordsAtPos(s), a = t.coordsAtPos(o, -1), c = Math.min(l.top, a.top), u = Math.max(l.bottom, a.bottom), d = Math.min(l.left, a.left), f = Math.max(l.right, a.right), h = f - d, p = u - c, y = {
    top: c,
    bottom: u,
    left: d,
    right: f,
    width: h,
    height: p,
    x: d,
    y: c
  };
  return {
    ...y,
    toJSON: () => y
  };
}
function Pb(t, e, n) {
  var r;
  const { selection: i } = e;
  let s = null;
  if (jl(i) && (s = i.$cursor), s) {
    const l = (r = t.storedMarks) != null ? r : s.marks();
    return s.parent.type.allowsMarkType(n) && (!!n.isInSet(l) || !l.some((c) => c.type.excludes(n)));
  }
  const { ranges: o } = i;
  return o.some(({ $from: l, $to: a }) => {
    let c = l.depth === 0 ? t.doc.inlineContent && t.doc.type.allowsMarkType(n) : !1;
    return t.doc.nodesBetween(l.pos, a.pos, (u, d, f) => {
      if (c)
        return !1;
      if (u.isInline) {
        const h = !f || f.type.allowsMarkType(n), p = !!n.isInSet(u.marks) || !u.marks.some((m) => m.type.excludes(n));
        c = h && p;
      }
      return !c;
    }), c;
  });
}
var Lb = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  const { selection: s } = n, { empty: o, ranges: l } = s, a = Ct(t, r.schema);
  if (i)
    if (o) {
      const c = Tf(r, a);
      n.addStoredMark(
        a.create({
          ...c,
          ...e
        })
      );
    } else
      l.forEach((c) => {
        const u = c.$from.pos, d = c.$to.pos;
        r.doc.nodesBetween(u, d, (f, h) => {
          const p = Math.max(h, u), m = Math.min(h + f.nodeSize, d);
          f.marks.find((y) => y.type === a) ? f.marks.forEach((y) => {
            a === y.type && n.addMark(
              p,
              m,
              a.create({
                ...y.attrs,
                ...e
              })
            );
          }) : n.addMark(p, m, a.create(e));
        });
      });
  return Pb(r, n, a);
}, Bb = (t, e) => ({ tr: n }) => (n.setMeta(t, e), !0), zb = (t, e = {}) => ({ state: n, dispatch: r, chain: i }) => {
  const s = ee(t, n.schema);
  let o;
  return n.selection.$anchor.sameParent(n.selection.$head) && (o = n.selection.$anchor.parent.attrs), s.isTextblock ? i().command(({ commands: l }) => Ga(s, { ...o, ...e })(n) ? !0 : l.clearNodes()).command(({ state: l }) => Ga(s, { ...o, ...e })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, $b = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, i = xt(t, 0, r.content.size), s = O.create(r, i);
    e.setSelection(s);
  }
  return !0;
}, _b = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, { from: i, to: s } = typeof t == "number" ? { from: t, to: t } : t, o = D.atStart(r).from, l = D.atEnd(r).to, a = xt(i, o, l), c = xt(s, o, l), u = D.create(r, a, c);
    e.setSelection(u);
  }
  return !0;
}, Fb = (t) => ({ state: e, dispatch: n }) => {
  const r = ee(t, e.schema);
  return _g(r)(e, n);
};
function Pc(t, e) {
  const n = t.storedMarks || t.selection.$to.parentOffset && t.selection.$from.marks();
  if (n) {
    const r = n.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    t.tr.ensureMarks(r);
  }
}
var Hb = ({ keepMarks: t = !0 } = {}) => ({ tr: e, state: n, dispatch: r, editor: i }) => {
  const { selection: s, doc: o } = e, { $from: l, $to: a } = s, c = i.extensionManager.attributes, u = ci(c, l.node().type.name, l.node().attrs);
  if (s instanceof O && s.node.isBlock)
    return !l.parentOffset || !St(o, l.pos) ? !1 : (r && (t && Pc(n, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock)
    return !1;
  const d = a.parentOffset === a.parent.content.size, f = l.depth === 0 ? void 0 : wb(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = d && f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0, p = St(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !p && St(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (p = !0, h = f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0), r) {
    if (p && (s instanceof D && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const m = e.mapping.map(l.before()), g = e.doc.resolve(m);
      l.node(-1).canReplaceWith(g.index(), g.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    t && Pc(n, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, Vb = (t, e = {}) => ({ tr: n, state: r, dispatch: i, editor: s }) => {
  var o;
  const l = ee(t, r.schema), { $from: a, $to: c } = r.selection, u = r.selection.node;
  if (u && u.isBlock || a.depth < 2 || !a.sameParent(c))
    return !1;
  const d = a.node(-1);
  if (d.type !== l)
    return !1;
  const f = s.extensionManager.attributes;
  if (a.parent.content.size === 0 && a.node(-1).childCount === a.indexAfter(-1)) {
    if (a.depth === 2 || a.node(-3).type !== l || a.index(-2) !== a.node(-2).childCount - 1)
      return !1;
    if (i) {
      let y = x.empty;
      const b = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
      for (let E = a.depth - b; E >= a.depth - 3; E -= 1)
        y = x.from(a.node(E).copy(y));
      const w = (
        // eslint-disable-next-line no-nested-ternary
        a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3
      ), C = {
        ...ci(f, a.node().type.name, a.node().attrs),
        ...e
      }, k = ((o = l.contentMatch.defaultType) == null ? void 0 : o.createAndFill(C)) || void 0;
      y = y.append(x.from(l.createAndFill(null, k) || void 0));
      const T = a.before(a.depth - (b - 1));
      n.replace(T, a.after(-w), new M(y, 4 - b, 0));
      let v = -1;
      n.doc.nodesBetween(T, n.doc.content.size, (E, R) => {
        if (v > -1)
          return !1;
        E.isTextblock && E.content.size === 0 && (v = R + 1);
      }), v > -1 && n.setSelection(D.near(n.doc.resolve(v))), n.scrollIntoView();
    }
    return !0;
  }
  const h = c.pos === a.end() ? d.contentMatchAt(0).defaultType : null, p = {
    ...ci(f, d.type.name, d.attrs),
    ...e
  }, m = {
    ...ci(f, a.node().type.name, a.node().attrs),
    ...e
  };
  n.delete(a.pos, c.pos);
  const g = h ? [
    { type: l, attrs: p },
    { type: h, attrs: m }
  ] : [{ type: l, attrs: p }];
  if (!St(n.doc, a.pos, 2))
    return !1;
  if (i) {
    const { selection: y, storedMarks: b } = r, { splittableMarks: w } = s.extensionManager, C = b || y.$to.parentOffset && y.$from.marks();
    if (n.split(a.pos, 2, g).scrollIntoView(), !C || !i)
      return !0;
    const k = C.filter((T) => w.includes(T.type.name));
    n.ensureMarks(k);
  }
  return !0;
}, io = (t, e) => {
  const n = zr((o) => o.type === e)(t.selection);
  if (!n)
    return !0;
  const r = t.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
  if (r === void 0)
    return !0;
  const i = t.doc.nodeAt(r);
  return n.node.type === (i == null ? void 0 : i.type) && Qt(t.doc, n.pos) && t.join(n.pos), !0;
}, so = (t, e) => {
  const n = zr((o) => o.type === e)(t.selection);
  if (!n)
    return !0;
  const r = t.doc.resolve(n.start).after(n.depth);
  if (r === void 0)
    return !0;
  const i = t.doc.nodeAt(r);
  return n.node.type === (i == null ? void 0 : i.type) && Qt(t.doc, r) && t.join(r), !0;
}, jb = (t, e, n, r = {}) => ({ editor: i, tr: s, state: o, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = ee(t, o.schema), p = ee(e, o.schema), { selection: m, storedMarks: g } = o, { $from: y, $to: b } = m, w = y.blockRange(b), C = g || m.$to.parentOffset && m.$from.marks();
  if (!w)
    return !1;
  const k = zr((T) => Uo(T.type.name, d))(m);
  if (w.depth >= 1 && k && w.depth - k.depth <= 1) {
    if (k.node.type === h)
      return c.liftListItem(p);
    if (Uo(k.node.type.name, d) && h.validContent(k.node.content) && l)
      return a().command(() => (s.setNodeMarkup(k.pos, h), !0)).command(() => io(s, h)).command(() => so(s, h)).run();
  }
  return !n || !C || !l ? a().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => io(s, h)).command(() => so(s, h)).run() : a().command(() => {
    const T = u().wrapInList(h, r), v = C.filter((E) => f.includes(E.type.name));
    return s.ensureMarks(v), T ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => io(s, h)).command(() => so(s, h)).run();
}, Ub = (t, e = {}, n = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: s = !1 } = n, o = Ct(t, r.schema);
  return jo(r, o, e) ? i.unsetMark(o, { extendEmptyMarkRange: s }) : i.setMark(o, e);
}, Wb = (t, e, n = {}) => ({ state: r, commands: i }) => {
  const s = ee(t, r.schema), o = ee(e, r.schema), l = Yt(r, s, n);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? i.setNode(o, a) : i.setNode(s, { ...a, ...n });
}, Kb = (t, e = {}) => ({ state: n, commands: r }) => {
  const i = ee(t, n.schema);
  return Yt(n, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, qb = () => ({ state: t, dispatch: e }) => {
  const n = t.plugins;
  for (let r = 0; r < n.length; r += 1) {
    const i = n[r];
    let s;
    if (i.spec.isInputRules && (s = i.getState(t))) {
      if (e) {
        const o = t.tr, l = s.transform;
        for (let a = l.steps.length - 1; a >= 0; a -= 1)
          o.step(l.steps[a].invert(l.docs[a]));
        if (s.text) {
          const a = o.doc.resolve(s.from).marks();
          o.replaceWith(s.from, s.to, t.schema.text(s.text, a));
        } else
          o.delete(s.from, s.to);
      }
      return !0;
    }
  }
  return !1;
}, Jb = () => ({ tr: t, dispatch: e }) => {
  const { selection: n } = t, { empty: r, ranges: i } = n;
  return r || e && i.forEach((s) => {
    t.removeMark(s.$from.pos, s.$to.pos);
  }), !0;
}, Gb = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  var s;
  const { extendEmptyMarkRange: o = !1 } = e, { selection: l } = n, a = Ct(t, r.schema), { $from: c, empty: u, ranges: d } = l;
  if (!i)
    return !0;
  if (u && o) {
    let { from: f, to: h } = l;
    const p = (s = c.marks().find((g) => g.type === a)) == null ? void 0 : s.attrs, m = Vl(c, a, p);
    m && (f = m.from, h = m.to), n.removeMark(f, h, a);
  } else
    d.forEach((f) => {
      n.removeMark(f.$from.pos, f.$to.pos, a);
    });
  return n.removeStoredMark(a), !0;
}, Yb = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  let s = null, o = null;
  const l = As(
    typeof t == "string" ? t : t.name,
    r.schema
  );
  return l ? (l === "node" && (s = ee(t, r.schema)), l === "mark" && (o = Ct(t, r.schema)), i && n.selection.ranges.forEach((a) => {
    const c = a.$from.pos, u = a.$to.pos;
    let d, f, h, p;
    n.selection.empty ? r.doc.nodesBetween(c, u, (m, g) => {
      s && s === m.type && (h = Math.max(g, c), p = Math.min(g + m.nodeSize, u), d = g, f = m);
    }) : r.doc.nodesBetween(c, u, (m, g) => {
      g < c && s && s === m.type && (h = Math.max(g, c), p = Math.min(g + m.nodeSize, u), d = g, f = m), g >= c && g <= u && (s && s === m.type && n.setNodeMarkup(g, void 0, {
        ...m.attrs,
        ...e
      }), o && m.marks.length && m.marks.forEach((y) => {
        if (o === y.type) {
          const b = Math.max(g, c), w = Math.min(g + m.nodeSize, u);
          n.addMark(
            b,
            w,
            o.create({
              ...y.attrs,
              ...e
            })
          );
        }
      }));
    }), f && (d !== void 0 && n.setNodeMarkup(d, void 0, {
      ...f.attrs,
      ...e
    }), o && f.marks.length && f.marks.forEach((m) => {
      o === m.type && n.addMark(
        h,
        p,
        o.create({
          ...m.attrs,
          ...e
        })
      );
    }));
  }), !0) : !1;
}, Xb = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = ee(t, n.schema);
  return Rg(i, e)(n, r);
}, Qb = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = ee(t, n.schema);
  return Dg(i, e)(n, r);
}, Zb = class {
  constructor() {
    this.callbacks = {};
  }
  on(t, e) {
    return this.callbacks[t] || (this.callbacks[t] = []), this.callbacks[t].push(e), this;
  }
  emit(t, ...e) {
    const n = this.callbacks[t];
    return n && n.forEach((r) => r.apply(this, e)), this;
  }
  off(t, e) {
    const n = this.callbacks[t];
    return n && (e ? this.callbacks[t] = n.filter((r) => r !== e) : delete this.callbacks[t]), this;
  }
  once(t, e) {
    const n = (...r) => {
      this.off(t, n), e.apply(this, r);
    };
    return this.on(t, n);
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}, Ns = class {
  constructor(t) {
    var e;
    this.find = t.find, this.handler = t.handler, this.undoable = (e = t.undoable) != null ? e : !0;
  }
}, ew = (t, e) => {
  if (Hl(e))
    return e.exec(t);
  const n = e(t);
  if (!n)
    return null;
  const r = [n.text];
  return r.index = n.index, r.input = t, r.data = n.data, n.replaceWith && (n.text.includes(n.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), r.push(n.replaceWith)), r;
};
function Jr(t) {
  var e;
  const { editor: n, from: r, to: i, text: s, rules: o, plugin: l } = t, { view: a } = n;
  if (a.composing)
    return !1;
  const c = a.state.doc.resolve(r);
  if (
    // check for code node
    c.parent.type.spec.code || (e = c.nodeBefore || c.nodeAfter) != null && e.marks.find((f) => f.type.spec.code)
  )
    return !1;
  let u = !1;
  const d = Nb(c) + s;
  return o.forEach((f) => {
    if (u)
      return;
    const h = ew(d, f.find);
    if (!h)
      return;
    const p = a.state.tr, m = Ts({
      state: a.state,
      transaction: p
    }), g = {
      from: r - (h[0].length - s.length),
      to: i
    }, { commands: y, chain: b, can: w } = new Es({
      editor: n,
      state: m
    });
    f.handler({
      state: m,
      range: g,
      match: h,
      commands: y,
      chain: b,
      can: w
    }) === null || !p.steps.length || (f.undoable && p.setMeta(l, {
      transform: p,
      from: r,
      to: i,
      text: s
    }), a.dispatch(p), u = !0);
  }), u;
}
function tw(t) {
  const { editor: e, rules: n } = t, r = new K({
    state: {
      init() {
        return null;
      },
      apply(i, s, o) {
        const l = i.getMeta(r);
        if (l)
          return l;
        const a = i.getMeta("applyInputRules");
        return !!a && setTimeout(() => {
          let { text: u } = a;
          typeof u == "string" ? u = u : u = Kl(x.from(u), o.schema);
          const { from: d } = a, f = d + u.length;
          Jr({
            editor: e,
            from: d,
            to: f,
            text: u,
            rules: n,
            plugin: r
          });
        }), i.selectionSet || i.docChanged ? null : s;
      }
    },
    props: {
      handleTextInput(i, s, o, l) {
        return Jr({
          editor: e,
          from: s,
          to: o,
          text: l,
          rules: n,
          plugin: r
        });
      },
      handleDOMEvents: {
        compositionend: (i) => (setTimeout(() => {
          const { $cursor: s } = i.state.selection;
          s && Jr({
            editor: e,
            from: s.pos,
            to: s.pos,
            text: "",
            rules: n,
            plugin: r
          });
        }), !1)
      },
      // add support for input rules to trigger on enter
      // this is useful for example for code blocks
      handleKeyDown(i, s) {
        if (s.key !== "Enter")
          return !1;
        const { $cursor: o } = i.state.selection;
        return o ? Jr({
          editor: e,
          from: o.pos,
          to: o.pos,
          text: `
`,
          rules: n,
          plugin: r
        }) : !1;
      }
    },
    // @ts-ignore
    isInputRules: !0
  });
  return r;
}
function nw(t) {
  return Object.prototype.toString.call(t).slice(8, -1);
}
function Gr(t) {
  return nw(t) !== "Object" ? !1 : t.constructor === Object && Object.getPrototypeOf(t) === Object.prototype;
}
function zf(t, e) {
  const n = { ...t };
  return Gr(t) && Gr(e) && Object.keys(e).forEach((r) => {
    Gr(e[r]) && Gr(t[r]) ? n[r] = zf(t[r], e[r]) : n[r] = e[r];
  }), n;
}
var Yl = class {
  constructor(t = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = {
      name: this.name
    }, this.config = {
      ...this.config,
      ...t
    }, this.name = this.config.name;
  }
  get options() {
    return {
      ...B(
        A(this, "addOptions", {
          name: this.name
        })
      ) || {}
    };
  }
  get storage() {
    return {
      ...B(
        A(this, "addStorage", {
          name: this.name,
          options: this.options
        })
      ) || {}
    };
  }
  configure(t = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => zf(this.options, t)
    });
    return e.name = this.name, e.parent = this.parent, e;
  }
  extend(t = {}) {
    const e = new this.constructor({ ...this.config, ...t });
    return e.parent = this, this.child = e, e.name = "name" in t ? t.name : e.parent.name, e;
  }
}, en = class $f extends Yl {
  constructor() {
    super(...arguments), this.type = "mark";
  }
  /**
   * Create a new Mark instance
   * @param config - Mark configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const n = typeof e == "function" ? e() : e;
    return new $f(n);
  }
  static handleExit({ editor: e, mark: n }) {
    const { tr: r } = e.state, i = e.state.selection.$from;
    if (i.pos === i.end()) {
      const o = i.marks();
      if (!!!o.find((c) => (c == null ? void 0 : c.type.name) === n.name))
        return !1;
      const a = o.find((c) => (c == null ? void 0 : c.type.name) === n.name);
      return a && r.removeStoredMark(a), r.insertText(" ", i.pos), e.view.dispatch(r), !0;
    }
    return !1;
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const n = typeof e == "function" ? e() : e;
    return super.extend(n);
  }
};
function rw(t) {
  return typeof t == "number";
}
var iw = class {
  constructor(t) {
    this.find = t.find, this.handler = t.handler;
  }
}, sw = (t, e, n) => {
  if (Hl(e))
    return [...t.matchAll(e)];
  const r = e(t, n);
  return r ? r.map((i) => {
    const s = [i.text];
    return s.index = i.index, s.input = t, s.data = i.data, i.replaceWith && (i.text.includes(i.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), s.push(i.replaceWith)), s;
  }) : [];
};
function ow(t) {
  const { editor: e, state: n, from: r, to: i, rule: s, pasteEvent: o, dropEvent: l } = t, { commands: a, chain: c, can: u } = new Es({
    editor: e,
    state: n
  }), d = [];
  return n.doc.nodesBetween(r, i, (h, p) => {
    var m, g, y, b, w;
    if ((g = (m = h.type) == null ? void 0 : m.spec) != null && g.code || !(h.isText || h.isTextblock || h.isInline))
      return;
    const C = (w = (b = (y = h.content) == null ? void 0 : y.size) != null ? b : h.nodeSize) != null ? w : 0, k = Math.max(r, p), T = Math.min(i, p + C);
    if (k >= T)
      return;
    const v = h.isText ? h.text || "" : h.textBetween(k - p, T - p, void 0, "￼");
    sw(v, s.find, o).forEach((R) => {
      if (R.index === void 0)
        return;
      const N = k + R.index + 1, H = N + R[0].length, U = {
        from: n.tr.mapping.map(N),
        to: n.tr.mapping.map(H)
      }, X = s.handler({
        state: n,
        range: U,
        match: R,
        commands: a,
        chain: c,
        can: u,
        pasteEvent: o,
        dropEvent: l
      });
      d.push(X);
    });
  }), d.every((h) => h !== null);
}
var Yr = null, lw = (t) => {
  var e;
  const n = new ClipboardEvent("paste", {
    clipboardData: new DataTransfer()
  });
  return (e = n.clipboardData) == null || e.setData("text/html", t), n;
};
function aw(t) {
  const { editor: e, rules: n } = t;
  let r = null, i = !1, s = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, l;
  try {
    l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
  } catch {
    l = null;
  }
  const a = ({
    state: u,
    from: d,
    to: f,
    rule: h,
    pasteEvt: p
  }) => {
    const m = u.tr, g = Ts({
      state: u,
      transaction: m
    });
    if (!(!ow({
      editor: e,
      state: g,
      from: Math.max(d - 1, 0),
      to: f.b - 1,
      rule: h,
      pasteEvent: p,
      dropEvent: l
    }) || !m.steps.length)) {
      try {
        l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
      } catch {
        l = null;
      }
      return o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, m;
    }
  };
  return n.map((u) => new K({
    // we register a global drag handler to track the current drag source element
    view(d) {
      const f = (p) => {
        var m;
        r = (m = d.dom.parentElement) != null && m.contains(p.target) ? d.dom.parentElement : null, r && (Yr = e);
      }, h = () => {
        Yr && (Yr = null);
      };
      return window.addEventListener("dragstart", f), window.addEventListener("dragend", h), {
        destroy() {
          window.removeEventListener("dragstart", f), window.removeEventListener("dragend", h);
        }
      };
    },
    props: {
      handleDOMEvents: {
        drop: (d, f) => {
          if (s = r === d.dom.parentElement, l = f, !s) {
            const h = Yr;
            h != null && h.isEditable && setTimeout(() => {
              const p = h.state.selection;
              p && h.commands.deleteRange({ from: p.from, to: p.to });
            }, 10);
          }
          return !1;
        },
        paste: (d, f) => {
          var h;
          const p = (h = f.clipboardData) == null ? void 0 : h.getData("text/html");
          return o = f, i = !!(p != null && p.includes("data-pm-slice")), !1;
        }
      }
    },
    appendTransaction: (d, f, h) => {
      const p = d[0], m = p.getMeta("uiEvent") === "paste" && !i, g = p.getMeta("uiEvent") === "drop" && !s, y = p.getMeta("applyPasteRules"), b = !!y;
      if (!m && !g && !b)
        return;
      if (b) {
        let { text: k } = y;
        typeof k == "string" ? k = k : k = Kl(x.from(k), h.schema);
        const { from: T } = y, v = T + k.length, E = lw(k);
        return a({
          rule: u,
          state: h,
          from: T,
          to: { b: v },
          pasteEvt: E
        });
      }
      const w = f.doc.content.findDiffStart(h.doc.content), C = f.doc.content.findDiffEnd(h.doc.content);
      if (!(!rw(w) || !C || w === C.b))
        return a({
          rule: u,
          state: h,
          from: w,
          to: C,
          pasteEvt: o
        });
    }
  }));
}
var Is = class {
  constructor(t, e) {
    this.splittableMarks = [], this.editor = e, this.baseExtensions = t, this.extensions = Nf(t), this.schema = Cb(this.extensions, e), this.setupExtensions();
  }
  /**
   * Get all commands from the extensions.
   * @returns An object with all commands where the key is the command name and the value is the command function
   */
  get commands() {
    return this.extensions.reduce((t, e) => {
      const n = {
        name: e.name,
        options: e.options,
        storage: this.editor.extensionStorage[e.name],
        editor: this.editor,
        type: ro(e.name, this.schema)
      }, r = A(e, "addCommands", n);
      return r ? {
        ...t,
        ...r()
      } : t;
    }, {});
  }
  /**
   * Get all registered Prosemirror plugins from the extensions.
   * @returns An array of Prosemirror plugins
   */
  get plugins() {
    const { editor: t } = this;
    return ql([...this.extensions].reverse()).flatMap((r) => {
      const i = {
        name: r.name,
        options: r.options,
        storage: this.editor.extensionStorage[r.name],
        editor: t,
        type: ro(r.name, this.schema)
      }, s = [], o = A(
        r,
        "addKeyboardShortcuts",
        i
      );
      let l = {};
      if (r.type === "mark" && A(r, "exitable", i) && (l.ArrowRight = () => en.handleExit({ editor: t, mark: r })), o) {
        const f = Object.fromEntries(
          Object.entries(o()).map(([h, p]) => [h, () => p({ editor: t })])
        );
        l = { ...l, ...f };
      }
      const a = E0(l);
      s.push(a);
      const c = A(r, "addInputRules", i);
      if (Dc(r, t.options.enableInputRules) && c) {
        const f = c();
        if (f && f.length) {
          const h = tw({
            editor: t,
            rules: f
          }), p = Array.isArray(h) ? h : [h];
          s.push(...p);
        }
      }
      const u = A(r, "addPasteRules", i);
      if (Dc(r, t.options.enablePasteRules) && u) {
        const f = u();
        if (f && f.length) {
          const h = aw({ editor: t, rules: f });
          s.push(...h);
        }
      }
      const d = A(
        r,
        "addProseMirrorPlugins",
        i
      );
      if (d) {
        const f = d();
        s.push(...f);
      }
      return s;
    });
  }
  /**
   * Get all attributes from the extensions.
   * @returns An array of attributes
   */
  get attributes() {
    return Of(this.extensions);
  }
  /**
   * Get all node views from the extensions.
   * @returns An object with all node views where the key is the node name and the value is the node view function
   */
  get nodeViews() {
    const { editor: t } = this, { nodeExtensions: e } = Ar(this.extensions);
    return Object.fromEntries(
      e.filter((n) => !!A(n, "addNodeView")).map((n) => {
        const r = this.attributes.filter((a) => a.type === n.name), i = {
          name: n.name,
          options: n.options,
          storage: this.editor.extensionStorage[n.name],
          editor: t,
          type: ee(n.name, this.schema)
        }, s = A(n, "addNodeView", i);
        if (!s)
          return [];
        const o = s();
        if (!o)
          return [];
        const l = (a, c, u, d, f) => {
          const h = Pi(a, r);
          return o({
            // pass-through
            node: a,
            view: c,
            getPos: u,
            decorations: d,
            innerDecorations: f,
            // tiptap-specific
            editor: t,
            extension: n,
            HTMLAttributes: h
          });
        };
        return [n.name, l];
      })
    );
  }
  get markViews() {
    const { editor: t } = this, { markExtensions: e } = Ar(this.extensions);
    return Object.fromEntries(
      e.filter((n) => !!A(n, "addMarkView")).map((n) => {
        const r = this.attributes.filter((l) => l.type === n.name), i = {
          name: n.name,
          options: n.options,
          storage: this.editor.extensionStorage[n.name],
          editor: t,
          type: Ct(n.name, this.schema)
        }, s = A(n, "addMarkView", i);
        if (!s)
          return [];
        const o = (l, a, c) => {
          const u = Pi(l, r);
          return s()({
            // pass-through
            mark: l,
            view: a,
            inline: c,
            // tiptap-specific
            editor: t,
            extension: n,
            HTMLAttributes: u,
            updateAttributes: (d) => {
              vw(l, t, d);
            }
          });
        };
        return [n.name, o];
      })
    );
  }
  /**
   * Go through all extensions, create extension storages & setup marks
   * & bind editor event listener.
   */
  setupExtensions() {
    const t = this.extensions;
    this.editor.extensionStorage = Object.fromEntries(
      t.map((e) => [e.name, e.storage])
    ), t.forEach((e) => {
      var n;
      const r = {
        name: e.name,
        options: e.options,
        storage: this.editor.extensionStorage[e.name],
        editor: this.editor,
        type: ro(e.name, this.schema)
      };
      e.type === "mark" && ((n = B(A(e, "keepOnSplit", r))) == null || n) && this.splittableMarks.push(e.name);
      const i = A(e, "onBeforeCreate", r), s = A(e, "onCreate", r), o = A(e, "onUpdate", r), l = A(
        e,
        "onSelectionUpdate",
        r
      ), a = A(e, "onTransaction", r), c = A(e, "onFocus", r), u = A(e, "onBlur", r), d = A(e, "onDestroy", r);
      i && this.editor.on("beforeCreate", i), s && this.editor.on("create", s), o && this.editor.on("update", o), l && this.editor.on("selectionUpdate", l), a && this.editor.on("transaction", a), c && this.editor.on("focus", c), u && this.editor.on("blur", u), d && this.editor.on("destroy", d);
    });
  }
};
Is.resolve = Nf;
Is.sort = ql;
Is.flatten = Wl;
var cw = {};
Fl(cw, {
  ClipboardTextSerializer: () => Ff,
  Commands: () => Hf,
  Delete: () => Vf,
  Drop: () => jf,
  Editable: () => Uf,
  FocusEvents: () => Kf,
  Keymap: () => qf,
  Paste: () => Jf,
  Tabindex: () => Gf,
  focusEventsPluginKey: () => Wf
});
var Y = class _f extends Yl {
  constructor() {
    super(...arguments), this.type = "extension";
  }
  /**
   * Create a new Extension instance
   * @param config - Extension configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const n = typeof e == "function" ? e() : e;
    return new _f(n);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const n = typeof e == "function" ? e() : e;
    return super.extend(n);
  }
}, Ff = Y.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new K({
        key: new G("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: t } = this, { state: e, schema: n } = t, { doc: r, selection: i } = e, { ranges: s } = i, o = Math.min(...s.map((u) => u.$from.pos)), l = Math.max(...s.map((u) => u.$to.pos)), a = Jl(n);
            return If(r, { from: o, to: l }, {
              ...this.options.blockSeparator !== void 0 ? { blockSeparator: this.options.blockSeparator } : {},
              textSerializers: a
            });
          }
        }
      })
    ];
  }
}), Hf = Y.create({
  name: "commands",
  addCommands() {
    return {
      ...xf
    };
  }
}), Vf = Y.create({
  name: "delete",
  onUpdate({ transaction: t, appendedTransactions: e }) {
    var n, r, i;
    const s = () => {
      var o, l, a, c;
      if ((c = (a = (l = (o = this.editor.options.coreExtensionOptions) == null ? void 0 : o.delete) == null ? void 0 : l.filterTransaction) == null ? void 0 : a.call(l, t)) != null ? c : t.getMeta("y-sync$"))
        return;
      const u = Ef(t.before, [t, ...e]);
      Pf(u).forEach((h) => {
        u.mapping.mapResult(h.oldRange.from).deletedAfter && u.mapping.mapResult(h.oldRange.to).deletedBefore && u.before.nodesBetween(h.oldRange.from, h.oldRange.to, (p, m) => {
          const g = m + p.nodeSize - 2, y = h.oldRange.from <= m && g <= h.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: p,
            from: m,
            to: g,
            newFrom: u.mapping.map(m),
            newTo: u.mapping.map(g),
            deletedRange: h.oldRange,
            newRange: h.newRange,
            partial: !y,
            editor: this.editor,
            transaction: t,
            combinedTransform: u
          });
        });
      });
      const f = u.mapping;
      u.steps.forEach((h, p) => {
        var m, g;
        if (h instanceof Ke) {
          const y = f.slice(p).map(h.from, -1), b = f.slice(p).map(h.to), w = f.invert().map(y, -1), C = f.invert().map(b), k = (m = u.doc.nodeAt(y - 1)) == null ? void 0 : m.marks.some((v) => v.eq(h.mark)), T = (g = u.doc.nodeAt(b)) == null ? void 0 : g.marks.some((v) => v.eq(h.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: h.mark,
            from: h.from,
            to: h.to,
            deletedRange: {
              from: w,
              to: C
            },
            newRange: {
              from: y,
              to: b
            },
            partial: !!(T || k),
            editor: this.editor,
            transaction: t,
            combinedTransform: u
          });
        }
      });
    };
    (i = (r = (n = this.editor.options.coreExtensionOptions) == null ? void 0 : n.delete) == null ? void 0 : r.async) == null || i ? setTimeout(s, 0) : s();
  }
}), jf = Y.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [
      new K({
        key: new G("tiptapDrop"),
        props: {
          handleDrop: (t, e, n, r) => {
            this.editor.emit("drop", {
              editor: this.editor,
              event: e,
              slice: n,
              moved: r
            });
          }
        }
      })
    ];
  }
}), Uf = Y.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new K({
        key: new G("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), Wf = new G("focusEvents"), Kf = Y.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: t } = this;
    return [
      new K({
        key: Wf,
        props: {
          handleDOMEvents: {
            focus: (e, n) => {
              t.isFocused = !0;
              const r = t.state.tr.setMeta("focus", { event: n }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            },
            blur: (e, n) => {
              t.isFocused = !1;
              const r = t.state.tr.setMeta("blur", { event: n }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            }
          }
        }
      })
    ];
  }
}), qf = Y.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const t = () => this.editor.commands.first(({ commands: o }) => [
      () => o.undoInputRule(),
      // maybe convert first text block node to default node
      () => o.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: d } = a, { pos: f, parent: h } = d, p = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, m = p.parent.type.spec.isolating, g = d.pos - d.parentOffset, y = m && p.parent.childCount === 1 ? g === d.pos : I.atStart(c).from === f;
        return !u || !h.type.isTextblock || h.textContent.length || !y || y && d.parent.type.name === "paragraph" ? !1 : o.clearNodes();
      }),
      () => o.deleteSelection(),
      () => o.joinBackward(),
      () => o.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: o }) => [
      () => o.deleteSelection(),
      () => o.deleteCurrentNode(),
      () => o.joinForward(),
      () => o.selectNodeForward()
    ]), r = {
      Enter: () => this.editor.commands.first(({ commands: o }) => [
        () => o.newlineInCode(),
        () => o.createParagraphNear(),
        () => o.liftEmptyBlock(),
        () => o.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: t,
      "Mod-Backspace": t,
      "Shift-Backspace": t,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, i = {
      ...r
    }, s = {
      ...r,
      "Ctrl-h": t,
      "Alt-Backspace": t,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return Ul() || Mf() ? s : i;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new K({
        key: new G("clearDocument"),
        appendTransaction: (t, e, n) => {
          if (t.some((m) => m.getMeta("composition")))
            return;
          const r = t.some((m) => m.docChanged) && !e.doc.eq(n.doc), i = t.some((m) => m.getMeta("preventClearDocument"));
          if (!r || i)
            return;
          const { empty: s, from: o, to: l } = e.selection, a = I.atStart(e.doc).from, c = I.atEnd(e.doc).to;
          if (s || !(o === a && l === c) || !Os(n.doc))
            return;
          const f = n.tr, h = Ts({
            state: n,
            transaction: f
          }), { commands: p } = new Es({
            editor: this.editor,
            state: h
          });
          if (p.clearNodes(), !!f.steps.length)
            return f;
        }
      })
    ];
  }
}), Jf = Y.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [
      new K({
        key: new G("tiptapPaste"),
        props: {
          handlePaste: (t, e, n) => {
            this.editor.emit("paste", {
              editor: this.editor,
              event: e,
              slice: n
            });
          }
        }
      })
    ];
  }
}), Gf = Y.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new K({
        key: new G("tabindex"),
        props: {
          attributes: () => this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
}), uw = class En {
  constructor(e, n, r = !1, i = null) {
    this.currentNode = null, this.actualDepth = null, this.isBlock = r, this.resolvedPos = e, this.editor = n, this.currentNode = i;
  }
  get name() {
    return this.node.type.name;
  }
  get node() {
    return this.currentNode || this.resolvedPos.node();
  }
  get element() {
    return this.editor.view.domAtPos(this.pos).node;
  }
  get depth() {
    var e;
    return (e = this.actualDepth) != null ? e : this.resolvedPos.depth;
  }
  get pos() {
    return this.resolvedPos.pos;
  }
  get content() {
    return this.node.content;
  }
  set content(e) {
    let n = this.from, r = this.to;
    if (this.isBlock) {
      if (this.content.size === 0) {
        console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
        return;
      }
      n = this.from + 1, r = this.to - 1;
    }
    this.editor.commands.insertContentAt({ from: n, to: r }, e);
  }
  get attributes() {
    return this.node.attrs;
  }
  get textContent() {
    return this.node.textContent;
  }
  get size() {
    return this.node.nodeSize;
  }
  get from() {
    return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
  }
  get range() {
    return {
      from: this.from,
      to: this.to
    };
  }
  get to() {
    return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1);
  }
  get parent() {
    if (this.depth === 0)
      return null;
    const e = this.resolvedPos.start(this.resolvedPos.depth - 1), n = this.resolvedPos.doc.resolve(e);
    return new En(n, this.editor);
  }
  get before() {
    let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)), new En(e, this.editor);
  }
  get after() {
    let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)), new En(e, this.editor);
  }
  get children() {
    const e = [];
    return this.node.content.forEach((n, r) => {
      const i = n.isBlock && !n.isTextblock, s = n.isAtom && !n.isText, o = this.pos + r + (s ? 0 : 1);
      if (o < 0 || o > this.resolvedPos.doc.nodeSize - 2)
        return;
      const l = this.resolvedPos.doc.resolve(o);
      if (!i && l.depth <= this.depth)
        return;
      const a = new En(l, this.editor, i, i ? n : null);
      i && (a.actualDepth = this.depth + 1), e.push(new En(l, this.editor, i, i ? n : null));
    }), e;
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get lastChild() {
    const e = this.children;
    return e[e.length - 1] || null;
  }
  closest(e, n = {}) {
    let r = null, i = this.parent;
    for (; i && !r; ) {
      if (i.node.type.name === e)
        if (Object.keys(n).length > 0) {
          const s = i.node.attrs, o = Object.keys(n);
          for (let l = 0; l < o.length; l += 1) {
            const a = o[l];
            if (s[a] !== n[a])
              break;
          }
        } else
          r = i;
      i = i.parent;
    }
    return r;
  }
  querySelector(e, n = {}) {
    return this.querySelectorAll(e, n, !0)[0] || null;
  }
  querySelectorAll(e, n = {}, r = !1) {
    let i = [];
    if (!this.children || this.children.length === 0)
      return i;
    const s = Object.keys(n);
    return this.children.forEach((o) => {
      r && i.length > 0 || (o.node.type.name === e && s.every((a) => n[a] === o.node.attrs[a]) && i.push(o), !(r && i.length > 0) && (i = i.concat(o.querySelectorAll(e, n, r))));
    }), i;
  }
  setAttribute(e) {
    const { tr: n } = this.editor.state;
    n.setNodeMarkup(this.from, void 0, {
      ...this.node.attrs,
      ...e
    }), this.editor.view.dispatch(n);
  }
}, dw = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}`;
function fw(t, e, n) {
  const r = document.querySelector("style[data-tiptap-style]");
  if (r !== null)
    return r;
  const i = document.createElement("style");
  return e && i.setAttribute("nonce", e), i.setAttribute("data-tiptap-style", ""), i.innerHTML = t, document.getElementsByTagName("head")[0].appendChild(i), i;
}
var hw = class extends Zb {
  constructor(e = {}) {
    super(), this.css = null, this.className = "tiptap", this.editorView = null, this.isFocused = !1, this.isInitialized = !1, this.extensionStorage = {}, this.instanceId = Math.random().toString(36).slice(2, 9), this.options = {
      element: typeof document < "u" ? document.createElement("div") : null,
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      editorProps: {},
      parseOptions: {},
      coreExtensionOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      enableContentCheck: !1,
      emitContentError: !1,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onMount: () => null,
      onUnmount: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null,
      onContentError: ({ error: i }) => {
        throw i;
      },
      onPaste: () => null,
      onDrop: () => null,
      onDelete: () => null
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("mount", this.options.onMount), this.on("unmount", this.options.onUnmount), this.on("contentError", this.options.onContentError), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: i, slice: s, moved: o }) => this.options.onDrop(i, s, o)), this.on("paste", ({ event: i, slice: s }) => this.options.onPaste(i, s)), this.on("delete", this.options.onDelete);
    const n = this.createDoc(), r = vf(n, this.options.autofocus);
    this.editorState = On.create({
      doc: n,
      schema: this.schema,
      selection: r || void 0
    }), this.options.element && this.mount(this.options.element);
  }
  /**
   * Attach the editor to the DOM, creating a new editor view.
   */
  mount(e) {
    if (typeof document > "u")
      throw new Error(
        "[tiptap error]: The editor cannot be mounted because there is no 'document' defined in this environment."
      );
    this.createView(e), this.emit("mount", { editor: this }), this.css && !document.head.contains(this.css) && document.head.appendChild(this.css), window.setTimeout(() => {
      this.isDestroyed || (this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
    }, 0);
  }
  /**
   * Remove the editor from the DOM, but still allow remounting at a different point in time
   */
  unmount() {
    if (this.editorView) {
      const e = this.editorView.dom;
      e != null && e.editor && delete e.editor, this.editorView.destroy();
    }
    if (this.editorView = null, this.isInitialized = !1, this.css && !document.querySelectorAll(`.${this.className}`).length)
      try {
        typeof this.css.remove == "function" ? this.css.remove() : this.css.parentNode && this.css.parentNode.removeChild(this.css);
      } catch (e) {
        console.warn("Failed to remove CSS element:", e);
      }
    this.css = null, this.emit("unmount", { editor: this });
  }
  /**
   * Returns the editor storage.
   */
  get storage() {
    return this.extensionStorage;
  }
  /**
   * An object of all registered commands.
   */
  get commands() {
    return this.commandManager.commands;
  }
  /**
   * Create a command chain to call multiple commands at once.
   */
  chain() {
    return this.commandManager.chain();
  }
  /**
   * Check if a command or a command chain can be executed. Without executing it.
   */
  can() {
    return this.commandManager.can();
  }
  /**
   * Inject CSS styles.
   */
  injectCSS() {
    this.options.injectCSS && typeof document < "u" && (this.css = fw(dw, this.options.injectNonce));
  }
  /**
   * Update editor options.
   *
   * @param options A list of options
   */
  setOptions(e = {}) {
    this.options = {
      ...this.options,
      ...e
    }, !(!this.editorView || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  /**
   * Update editable state of the editor.
   */
  setEditable(e, n = !0) {
    this.setOptions({ editable: e }), n && this.emit("update", { editor: this, transaction: this.state.tr, appendedTransactions: [] });
  }
  /**
   * Returns whether the editor is editable.
   */
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  /**
   * Returns the editor state.
   */
  get view() {
    return this.editorView ? this.editorView : new Proxy(
      {
        state: this.editorState,
        updateState: (e) => {
          this.editorState = e;
        },
        dispatch: (e) => {
          this.dispatchTransaction(e);
        },
        // Stub some commonly accessed properties to prevent errors
        composing: !1,
        dragging: null,
        editable: !0,
        isDestroyed: !1
      },
      {
        get: (e, n) => {
          if (this.editorView)
            return this.editorView[n];
          if (n === "state")
            return this.editorState;
          if (n in e)
            return Reflect.get(e, n);
          throw new Error(
            `[tiptap error]: The editor view is not available. Cannot access view['${n}']. The editor may not be mounted yet.`
          );
        }
      }
    );
  }
  /**
   * Returns the editor state.
   */
  get state() {
    return this.editorView && (this.editorState = this.view.state), this.editorState;
  }
  /**
   * Register a ProseMirror plugin.
   *
   * @param plugin A ProseMirror plugin
   * @param handlePlugins Control how to merge the plugin into the existing plugins.
   * @returns The new editor state
   */
  registerPlugin(e, n) {
    const r = Af(n) ? n(e, [...this.state.plugins]) : [...this.state.plugins, e], i = this.state.reconfigure({ plugins: r });
    return this.view.updateState(i), i;
  }
  /**
   * Unregister a ProseMirror plugin.
   *
   * @param nameOrPluginKeyToRemove The plugins name
   * @returns The new editor state or undefined if the editor is destroyed
   */
  unregisterPlugin(e) {
    if (this.isDestroyed)
      return;
    const n = this.state.plugins;
    let r = n;
    if ([].concat(e).forEach((s) => {
      const o = typeof s == "string" ? `${s}$` : s.key;
      r = r.filter((l) => !l.key.startsWith(o));
    }), n.length === r.length)
      return;
    const i = this.state.reconfigure({
      plugins: r
    });
    return this.view.updateState(i), i;
  }
  /**
   * Creates an extension manager.
   */
  createExtensionManager() {
    var e, n;
    const i = [...this.options.enableCoreExtensions ? [
      Uf,
      Ff.configure({
        blockSeparator: (n = (e = this.options.coreExtensionOptions) == null ? void 0 : e.clipboardTextSerializer) == null ? void 0 : n.blockSeparator
      }),
      Hf,
      Kf,
      qf,
      Gf,
      jf,
      Jf,
      Vf
    ].filter((s) => typeof this.options.enableCoreExtensions == "object" ? this.options.enableCoreExtensions[s.name] !== !1 : !0) : [], ...this.options.extensions].filter((s) => ["extension", "node", "mark"].includes(s == null ? void 0 : s.type));
    this.extensionManager = new Is(i, this);
  }
  /**
   * Creates an command manager.
   */
  createCommandManager() {
    this.commandManager = new Es({
      editor: this
    });
  }
  /**
   * Creates a ProseMirror schema.
   */
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  /**
   * Creates the initial document.
   */
  createDoc() {
    let e;
    try {
      e = Vo(this.options.content, this.schema, this.options.parseOptions, {
        errorOnInvalidContent: this.options.enableContentCheck
      });
    } catch (n) {
      if (!(n instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(n.message))
        throw n;
      this.emit("contentError", {
        editor: this,
        error: n,
        disableCollaboration: () => {
          "collaboration" in this.storage && typeof this.storage.collaboration == "object" && this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((r) => r.name !== "collaboration"), this.createExtensionManager();
        }
      }), e = Vo(this.options.content, this.schema, this.options.parseOptions, {
        errorOnInvalidContent: !1
      });
    }
    return e;
  }
  /**
   * Creates a ProseMirror view.
   */
  createView(e) {
    var n;
    this.editorView = new kf(e, {
      ...this.options.editorProps,
      attributes: {
        // add `role="textbox"` to the editor element
        role: "textbox",
        ...(n = this.options.editorProps) == null ? void 0 : n.attributes
      },
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: this.editorState,
      markViews: this.extensionManager.markViews,
      nodeViews: this.extensionManager.nodeViews
    });
    const r = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(r), this.prependClass(), this.injectCSS();
    const i = this.view.dom;
    i.editor = this;
  }
  /**
   * Creates all node and mark views.
   */
  createNodeViews() {
    this.view.isDestroyed || this.view.setProps({
      markViews: this.extensionManager.markViews,
      nodeViews: this.extensionManager.nodeViews
    });
  }
  /**
   * Prepend class name to element.
   */
  prependClass() {
    this.view.dom.className = `${this.className} ${this.view.dom.className}`;
  }
  captureTransaction(e) {
    this.isCapturingTransaction = !0, e(), this.isCapturingTransaction = !1;
    const n = this.capturedTransaction;
    return this.capturedTransaction = null, n;
  }
  /**
   * The callback over which to send transactions (state updates) produced by the view.
   *
   * @param transaction An editor state transaction
   */
  dispatchTransaction(e) {
    if (this.view.isDestroyed)
      return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = e;
        return;
      }
      e.steps.forEach((u) => {
        var d;
        return (d = this.capturedTransaction) == null ? void 0 : d.step(u);
      });
      return;
    }
    const { state: n, transactions: r } = this.state.applyTransaction(e), i = !this.state.selection.eq(n.selection), s = r.includes(e), o = this.state;
    if (this.emit("beforeTransaction", {
      editor: this,
      transaction: e,
      nextState: n
    }), !s)
      return;
    this.view.updateState(n), this.emit("transaction", {
      editor: this,
      transaction: e,
      appendedTransactions: r.slice(1)
    }), i && this.emit("selectionUpdate", {
      editor: this,
      transaction: e
    });
    const l = r.findLast((u) => u.getMeta("focus") || u.getMeta("blur")), a = l == null ? void 0 : l.getMeta("focus"), c = l == null ? void 0 : l.getMeta("blur");
    a && this.emit("focus", {
      editor: this,
      event: a.event,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      transaction: l
    }), c && this.emit("blur", {
      editor: this,
      event: c.event,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      transaction: l
    }), !(e.getMeta("preventUpdate") || !r.some((u) => u.docChanged) || o.doc.eq(n.doc)) && this.emit("update", {
      editor: this,
      transaction: e,
      appendedTransactions: r.slice(1)
    });
  }
  /**
   * Get attributes of the currently selected node or mark.
   */
  getAttributes(e) {
    return Df(this.state, e);
  }
  isActive(e, n) {
    const r = typeof e == "string" ? e : null, i = typeof e == "string" ? n : e;
    return Ib(this.state, r, i);
  }
  /**
   * Get the document as JSON.
   */
  getJSON() {
    return this.state.doc.toJSON();
  }
  /**
   * Get the document as HTML.
   */
  getHTML() {
    return Kl(this.state.doc.content, this.schema);
  }
  /**
   * Get the document as text.
   */
  getText(e) {
    const { blockSeparator: n = `

`, textSerializers: r = {} } = e || {};
    return Rf(this.state.doc, {
      blockSeparator: n,
      textSerializers: {
        ...Jl(this.schema),
        ...r
      }
    });
  }
  /**
   * Check if there is no content.
   */
  get isEmpty() {
    return Os(this.state.doc);
  }
  /**
   * Destroy the editor.
   */
  destroy() {
    this.emit("destroy"), this.unmount(), this.removeAllListeners();
  }
  /**
   * Check if the editor is already destroyed.
   */
  get isDestroyed() {
    var e, n;
    return (n = (e = this.editorView) == null ? void 0 : e.isDestroyed) != null ? n : !0;
  }
  $node(e, n) {
    var r;
    return ((r = this.$doc) == null ? void 0 : r.querySelector(e, n)) || null;
  }
  $nodes(e, n) {
    var r;
    return ((r = this.$doc) == null ? void 0 : r.querySelectorAll(e, n)) || null;
  }
  $pos(e) {
    const n = this.state.doc.resolve(e);
    return new uw(n, this);
  }
  get $doc() {
    return this.$pos(0);
  }
};
function Or(t) {
  return new Ns({
    find: t.find,
    handler: ({ state: e, range: n, match: r }) => {
      const i = B(t.getAttributes, void 0, r);
      if (i === !1 || i === null)
        return null;
      const { tr: s } = e, o = r[r.length - 1], l = r[0];
      if (o) {
        const a = l.search(/\S/), c = n.from + l.indexOf(o), u = c + o.length;
        if (Gl(n.from, n.to, e.doc).filter((h) => h.mark.type.excluded.find((m) => m === t.type && m !== h.mark.type)).filter((h) => h.to > c).length)
          return null;
        u < n.to && s.delete(u, n.to), c > n.from && s.delete(n.from + a, c);
        const f = n.from + a + o.length;
        s.addMark(n.from + a, f, t.type.create(i || {})), s.removeStoredMark(t.type);
      }
    },
    undoable: t.undoable
  });
}
function pw(t) {
  return new Ns({
    find: t.find,
    handler: ({ state: e, range: n, match: r }) => {
      const i = B(t.getAttributes, void 0, r) || {}, { tr: s } = e, o = n.from;
      let l = n.to;
      const a = t.type.create(i);
      if (r[1]) {
        const c = r[0].lastIndexOf(r[1]);
        let u = o + c;
        u > l ? u = l : l = u + r[1].length;
        const d = r[0][r[0].length - 1];
        s.insertText(d, o + r[0].length - 1), s.replaceWith(u, l, a);
      } else if (r[0]) {
        const c = t.type.isInline ? o : o - 1;
        s.insert(c, t.type.create(i)).delete(s.mapping.map(o), s.mapping.map(l));
      }
      s.scrollIntoView();
    },
    undoable: t.undoable
  });
}
function mw(t) {
  return new Ns({
    find: t.find,
    handler: ({ state: e, range: n, match: r }) => {
      const i = e.doc.resolve(n.from), s = B(t.getAttributes, void 0, r) || {};
      if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), t.type))
        return null;
      e.tr.delete(n.from, n.to).setBlockType(n.from, n.from, t.type, s);
    },
    undoable: t.undoable
  });
}
function _n(t) {
  return new Ns({
    find: t.find,
    handler: ({ state: e, range: n, match: r, chain: i }) => {
      const s = B(t.getAttributes, void 0, r) || {}, o = e.tr.delete(n.from, n.to), a = o.doc.resolve(n.from).blockRange(), c = a && vl(a, t.type, s);
      if (!c)
        return null;
      if (o.wrap(a, c), t.keepMarks && t.editor) {
        const { selection: d, storedMarks: f } = e, { splittableMarks: h } = t.editor.extensionManager, p = f || d.$to.parentOffset && d.$from.marks();
        if (p) {
          const m = p.filter((g) => h.includes(g.type.name));
          o.ensureMarks(m);
        }
      }
      if (t.keepAttributes) {
        const d = t.type.name === "bulletList" || t.type.name === "orderedList" ? "listItem" : "taskList";
        i().updateAttributes(d, s).run();
      }
      const u = o.doc.resolve(n.from - 1).nodeBefore;
      u && u.type === t.type && Qt(o.doc, n.from - 1) && (!t.joinPredicate || t.joinPredicate(r, u)) && o.join(n.from - 1);
    },
    undoable: t.undoable
  });
}
function gw(t, e) {
  const { selection: n } = t, { $from: r } = n;
  if (n instanceof O) {
    const s = r.index();
    return r.parent.canReplaceWith(s, s + 1, e);
  }
  let i = r.depth;
  for (; i >= 0; ) {
    const s = r.index(i);
    if (r.node(i).contentMatchAt(s).matchType(e))
      return !0;
    i -= 1;
  }
  return !1;
}
var yw = {};
Fl(yw, {
  createAtomBlockMarkdownSpec: () => bw,
  createBlockMarkdownSpec: () => ww,
  createInlineMarkdownSpec: () => Sw,
  parseAttributes: () => Xl,
  parseIndentedBlocks: () => Wo,
  renderNestedMarkdownContent: () => Zl,
  serializeAttributes: () => Ql
});
function Xl(t) {
  if (!(t != null && t.trim()))
    return {};
  const e = {}, n = [], r = t.replace(/["']([^"']*)["']/g, (c) => (n.push(c), `__QUOTED_${n.length - 1}__`)), i = r.match(/(?:^|\s)\.([a-zA-Z][\w-]*)/g);
  if (i) {
    const c = i.map((u) => u.trim().slice(1));
    e.class = c.join(" ");
  }
  const s = r.match(/(?:^|\s)#([a-zA-Z][\w-]*)/);
  s && (e.id = s[1]);
  const o = /([a-zA-Z][\w-]*)\s*=\s*(__QUOTED_\d+__)/g;
  Array.from(r.matchAll(o)).forEach(([, c, u]) => {
    var d;
    const f = parseInt(((d = u.match(/__QUOTED_(\d+)__/)) == null ? void 0 : d[1]) || "0", 10), h = n[f];
    h && (e[c] = h.slice(1, -1));
  });
  const a = r.replace(/(?:^|\s)\.([a-zA-Z][\w-]*)/g, "").replace(/(?:^|\s)#([a-zA-Z][\w-]*)/g, "").replace(/([a-zA-Z][\w-]*)\s*=\s*__QUOTED_\d+__/g, "").trim();
  return a && a.split(/\s+/).filter(Boolean).forEach((u) => {
    u.match(/^[a-zA-Z][\w-]*$/) && (e[u] = !0);
  }), e;
}
function Ql(t) {
  if (!t || Object.keys(t).length === 0)
    return "";
  const e = [];
  return t.class && String(t.class).split(/\s+/).filter(Boolean).forEach((r) => e.push(`.${r}`)), t.id && e.push(`#${t.id}`), Object.entries(t).forEach(([n, r]) => {
    n === "class" || n === "id" || (r === !0 ? e.push(n) : r !== !1 && r != null && e.push(`${n}="${String(r)}"`));
  }), e.join(" ");
}
function bw(t) {
  const {
    nodeName: e,
    name: n,
    parseAttributes: r = Xl,
    serializeAttributes: i = Ql,
    defaultAttributes: s = {},
    requiredAttributes: o = [],
    allowedAttributes: l
  } = t, a = n || e, c = (u) => {
    if (!l)
      return u;
    const d = {};
    return l.forEach((f) => {
      f in u && (d[f] = u[f]);
    }), d;
  };
  return {
    parseMarkdown: (u, d) => {
      const f = { ...s, ...u.attributes };
      return d.createNode(e, f, []);
    },
    markdownTokenizer: {
      name: e,
      level: "block",
      start(u) {
        var d;
        const f = new RegExp(`^:::${a}(?:\\s|$)`, "m"), h = (d = u.match(f)) == null ? void 0 : d.index;
        return h !== void 0 ? h : -1;
      },
      tokenize(u, d, f) {
        const h = new RegExp(`^:::${a}(?:\\s+\\{([^}]*)\\})?\\s*:::(?:\\n|$)`), p = u.match(h);
        if (!p)
          return;
        const m = p[1] || "", g = r(m);
        if (!o.find((b) => !(b in g)))
          return {
            type: e,
            raw: p[0],
            attributes: g
          };
      }
    },
    renderMarkdown: (u) => {
      const d = c(u.attrs || {}), f = i(d), h = f ? ` {${f}}` : "";
      return `:::${a}${h} :::`;
    }
  };
}
function ww(t) {
  const {
    nodeName: e,
    name: n,
    getContent: r,
    parseAttributes: i = Xl,
    serializeAttributes: s = Ql,
    defaultAttributes: o = {},
    content: l = "block",
    allowedAttributes: a
  } = t, c = n || e, u = (d) => {
    if (!a)
      return d;
    const f = {};
    return a.forEach((h) => {
      h in d && (f[h] = d[h]);
    }), f;
  };
  return {
    parseMarkdown: (d, f) => {
      let h;
      if (r) {
        const m = r(d);
        h = typeof m == "string" ? [{ type: "text", text: m }] : m;
      } else l === "block" ? h = f.parseChildren(d.tokens || []) : h = f.parseInline(d.tokens || []);
      const p = { ...o, ...d.attributes };
      return f.createNode(e, p, h);
    },
    markdownTokenizer: {
      name: e,
      level: "block",
      start(d) {
        var f;
        const h = new RegExp(`^:::${c}`, "m"), p = (f = d.match(h)) == null ? void 0 : f.index;
        return p !== void 0 ? p : -1;
      },
      tokenize(d, f, h) {
        var p;
        const m = new RegExp(`^:::${c}(?:\\s+\\{([^}]*)\\})?\\s*\\n`), g = d.match(m);
        if (!g)
          return;
        const [y, b = ""] = g, w = i(b);
        let C = 1;
        const k = y.length;
        let T = "";
        const v = /^:::([\w-]*)(\s.*)?/gm, E = d.slice(k);
        for (v.lastIndex = 0; ; ) {
          const R = v.exec(E);
          if (R === null)
            break;
          const N = R.index, H = R[1];
          if (!((p = R[2]) != null && p.endsWith(":::"))) {
            if (H)
              C += 1;
            else if (C -= 1, C === 0) {
              const U = E.slice(0, N);
              T = U.trim();
              const X = d.slice(0, k + N + R[0].length);
              let L = [];
              if (T)
                if (l === "block")
                  for (L = h.blockTokens(U), L.forEach((_) => {
                    _.text && (!_.tokens || _.tokens.length === 0) && (_.tokens = h.inlineTokens(_.text));
                  }); L.length > 0; ) {
                    const _ = L[L.length - 1];
                    if (_.type === "paragraph" && (!_.text || _.text.trim() === ""))
                      L.pop();
                    else
                      break;
                  }
                else
                  L = h.inlineTokens(T);
              return {
                type: e,
                raw: X,
                attributes: w,
                content: T,
                tokens: L
              };
            }
          }
        }
      }
    },
    renderMarkdown: (d, f) => {
      const h = u(d.attrs || {}), p = s(h), m = p ? ` {${p}}` : "", g = f.renderChildren(d.content || [], `

`);
      return `:::${c}${m}

${g}

:::`;
    }
  };
}
function kw(t) {
  if (!t.trim())
    return {};
  const e = {}, n = /(\w+)=(?:"([^"]*)"|'([^']*)')/g;
  let r = n.exec(t);
  for (; r !== null; ) {
    const [, i, s, o] = r;
    e[i] = s || o, r = n.exec(t);
  }
  return e;
}
function xw(t) {
  return Object.entries(t).filter(([, e]) => e != null).map(([e, n]) => `${e}="${n}"`).join(" ");
}
function Sw(t) {
  const {
    nodeName: e,
    name: n,
    getContent: r,
    parseAttributes: i = kw,
    serializeAttributes: s = xw,
    defaultAttributes: o = {},
    selfClosing: l = !1,
    allowedAttributes: a
  } = t, c = n || e, u = (f) => {
    if (!a)
      return f;
    const h = {};
    return a.forEach((p) => {
      p in f && (h[p] = f[p]);
    }), h;
  }, d = c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return {
    parseMarkdown: (f, h) => {
      const p = { ...o, ...f.attributes };
      if (l)
        return h.createNode(e, p);
      const m = r ? r(f) : f.content || "";
      return m ? h.createNode(e, p, [h.createTextNode(m)]) : h.createNode(e, p, []);
    },
    markdownTokenizer: {
      name: e,
      level: "inline",
      start(f) {
        const h = l ? new RegExp(`\\[${d}\\s*[^\\]]*\\]`) : new RegExp(`\\[${d}\\s*[^\\]]*\\][\\s\\S]*?\\[\\/${d}\\]`), p = f.match(h), m = p == null ? void 0 : p.index;
        return m !== void 0 ? m : -1;
      },
      tokenize(f, h, p) {
        const m = l ? new RegExp(`^\\[${d}\\s*([^\\]]*)\\]`) : new RegExp(`^\\[${d}\\s*([^\\]]*)\\]([\\s\\S]*?)\\[\\/${d}\\]`), g = f.match(m);
        if (!g)
          return;
        let y = "", b = "";
        if (l) {
          const [, C] = g;
          b = C;
        } else {
          const [, C, k] = g;
          b = C, y = k || "";
        }
        const w = i(b.trim());
        return {
          type: e,
          raw: g[0],
          content: y.trim(),
          attributes: w
        };
      }
    },
    renderMarkdown: (f) => {
      let h = "";
      r ? h = r(f) : f.content && f.content.length > 0 && (h = f.content.filter((y) => y.type === "text").map((y) => y.text).join(""));
      const p = u(f.attrs || {}), m = s(p), g = m ? ` ${m}` : "";
      return l ? `[${c}${g}]` : `[${c}${g}]${h}[/${c}]`;
    }
  };
}
function Wo(t, e, n) {
  var r, i, s, o;
  const l = t.split(`
`), a = [];
  let c = "", u = 0;
  const d = e.baseIndentSize || 2;
  for (; u < l.length; ) {
    const f = l[u], h = f.match(e.itemPattern);
    if (!h) {
      if (a.length > 0)
        break;
      if (f.trim() === "") {
        u += 1;
        continue;
      } else
        return;
    }
    const p = e.extractItemData(h), { indentLevel: m, mainContent: g } = p;
    c = `${c}${f}
`;
    const y = [g];
    for (u += 1; u < l.length; ) {
      const k = l[u];
      if (k.trim() === "") {
        const v = l.slice(u + 1).findIndex((N) => N.trim() !== "");
        if (v === -1)
          break;
        if ((((i = (r = l[u + 1 + v].match(/^(\s*)/)) == null ? void 0 : r[1]) == null ? void 0 : i.length) || 0) > m) {
          y.push(k), c = `${c}${k}
`, u += 1;
          continue;
        } else
          break;
      }
      if ((((o = (s = k.match(/^(\s*)/)) == null ? void 0 : s[1]) == null ? void 0 : o.length) || 0) > m)
        y.push(k), c = `${c}${k}
`, u += 1;
      else
        break;
    }
    let b;
    const w = y.slice(1);
    if (w.length > 0) {
      const k = w.map((T) => T.slice(m + d)).join(`
`);
      k.trim() && (e.customNestedParser ? b = e.customNestedParser(k) : b = n.blockTokens(k));
    }
    const C = e.createToken(p, b);
    a.push(C);
  }
  if (a.length !== 0)
    return {
      items: a,
      raw: c.trim()
    };
}
function Zl(t, e, n, r) {
  if (!t || !Array.isArray(t.content))
    return "";
  const i = typeof n == "function" ? n(r) : n, [s, ...o] = t.content, l = e.renderChildren([s]), a = [`${i}${l}`];
  return o && o.length > 0 && o.forEach((c) => {
    const u = e.renderChildren([c]);
    if (u) {
      const d = u.split(`
`).map((f) => f ? e.indent(f) : "").join(`
`);
      a.push(d);
    }
  }), a.join(`
`);
}
function vw(t, e, n = {}) {
  const { state: r } = e, { doc: i, tr: s } = r, o = t;
  i.descendants((l, a) => {
    const c = s.mapping.map(a), u = s.mapping.map(a) + l.nodeSize;
    let d = null;
    if (l.marks.forEach((h) => {
      if (h !== o)
        return !1;
      d = h;
    }), !d)
      return;
    let f = !1;
    if (Object.keys(n).forEach((h) => {
      n[h] !== d.attrs[h] && (f = !0);
    }), f) {
      const h = t.type.create({
        ...t.attrs,
        ...n
      });
      s.removeMark(c, u, t.type), s.addMark(c, u, h);
    }
  }), s.docChanged && e.view.dispatch(s);
}
var De = class Yf extends Yl {
  constructor() {
    super(...arguments), this.type = "node";
  }
  /**
   * Create a new Node instance
   * @param config - Node configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const n = typeof e == "function" ? e() : e;
    return new Yf(n);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const n = typeof e == "function" ? e() : e;
    return super.extend(n);
  }
};
function Fn(t) {
  return new iw({
    find: t.find,
    handler: ({ state: e, range: n, match: r, pasteEvent: i }) => {
      const s = B(t.getAttributes, void 0, r, i);
      if (s === !1 || s === null)
        return null;
      const { tr: o } = e, l = r[r.length - 1], a = r[0];
      let c = n.to;
      if (l) {
        const u = a.search(/\S/), d = n.from + a.indexOf(l), f = d + l.length;
        if (Gl(n.from, n.to, e.doc).filter((p) => p.mark.type.excluded.find((g) => g === t.type && g !== p.mark.type)).filter((p) => p.to > d).length)
          return null;
        f < n.to && o.delete(f, n.to), d > n.from && o.delete(n.from + u, d), c = n.from + u + l.length, o.addMark(n.from + u, c, t.type.create(s || {})), o.removeStoredMark(t.type);
      }
    }
  });
}
function Lc(t) {
  return Ou((e, n) => ({
    get() {
      return e(), t;
    },
    set(r) {
      t = r, requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          n();
        });
      });
    }
  }));
}
var Cw = class extends hw {
  constructor(t = {}) {
    return super(t), this.contentComponent = null, this.appContext = null, this.reactiveState = Lc(this.view.state), this.reactiveExtensionStorage = Lc(this.extensionStorage), this.on("beforeTransaction", ({ nextState: e }) => {
      this.reactiveState.value = e, this.reactiveExtensionStorage.value = this.extensionStorage;
    }), Eu(this);
  }
  get state() {
    return this.reactiveState ? this.reactiveState.value : this.view.state;
  }
  get storage() {
    return this.reactiveExtensionStorage ? this.reactiveExtensionStorage.value : super.storage;
  }
  /**
   * Register a ProseMirror plugin.
   */
  registerPlugin(t, e) {
    const n = super.registerPlugin(t, e);
    return this.reactiveState && (this.reactiveState.value = n), n;
  }
  /**
   * Unregister a ProseMirror plugin.
   */
  unregisterPlugin(t) {
    const e = super.unregisterPlugin(t);
    return this.reactiveState && e && (this.reactiveState.value = e), e;
  }
}, Mw = /* @__PURE__ */ zu({
  name: "EditorContent",
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  setup(t) {
    const e = pl(), n = kl();
    return om(() => {
      const r = t.editor;
      r && r.options.element && e.value && yl(() => {
        var i;
        if (!e.value || !((i = r.view.dom) != null && i.firstChild))
          return;
        const s = re(e.value);
        e.value.append(r.view.dom), r.contentComponent = n.ctx._, n && (r.appContext = {
          ...n.appContext,
          // Vue internally uses prototype chain to forward/shadow injects across the entire component chain
          // so don't use object spread operator or 'Object.assign' and just set `provides` as is on editor's appContext
          // @ts-expect-error forward instance's 'provides' into appContext
          provides: n.provides
        }), r.setOptions({
          element: s
        }), r.createNodeViews();
      });
    }), bl(() => {
      const r = t.editor;
      r && (r.contentComponent = null, r.appContext = null);
    }), { rootEl: e };
  },
  render() {
    return Ku("div", {
      ref: (t) => {
        this.rootEl = t;
      }
    });
  }
}), Tw = (t = {}) => {
  const e = Dp();
  return _u(() => {
    e.value = new Cw(t);
  }), bl(() => {
    var n, r, i;
    const s = (n = e.value) == null ? void 0 : n.view.dom, o = s == null ? void 0 : s.cloneNode(!0);
    (r = s == null ? void 0 : s.parentNode) == null || r.replaceChild(o, s), (i = e.value) == null || i.destroy();
  }), e;
};
const Xf = ["top", "right", "bottom", "left"], Bc = ["start", "end"], zc = /* @__PURE__ */ Xf.reduce((t, e) => t.concat(e, e + "-" + Bc[0], e + "-" + Bc[1]), []), at = Math.min, ge = Math.max, Li = Math.round, rt = (t) => ({
  x: t,
  y: t
}), Ew = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Aw = {
  start: "end",
  end: "start"
};
function Ko(t, e, n) {
  return ge(t, at(e, n));
}
function Mt(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function je(t) {
  return t.split("-")[0];
}
function Je(t) {
  return t.split("-")[1];
}
function Qf(t) {
  return t === "x" ? "y" : "x";
}
function ea(t) {
  return t === "y" ? "height" : "width";
}
const Ow = /* @__PURE__ */ new Set(["top", "bottom"]);
function nt(t) {
  return Ow.has(je(t)) ? "y" : "x";
}
function ta(t) {
  return Qf(nt(t));
}
function Zf(t, e, n) {
  n === void 0 && (n = !1);
  const r = Je(t), i = ta(t), s = ea(i);
  let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[s] > e.floating[s] && (o = zi(o)), [o, zi(o)];
}
function Nw(t) {
  const e = zi(t);
  return [Bi(t), e, Bi(e)];
}
function Bi(t) {
  return t.replace(/start|end/g, (e) => Aw[e]);
}
const $c = ["left", "right"], _c = ["right", "left"], Iw = ["top", "bottom"], Rw = ["bottom", "top"];
function Dw(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? _c : $c : e ? $c : _c;
    case "left":
    case "right":
      return e ? Iw : Rw;
    default:
      return [];
  }
}
function Pw(t, e, n, r) {
  const i = Je(t);
  let s = Dw(je(t), n === "start", r);
  return i && (s = s.map((o) => o + "-" + i), e && (s = s.concat(s.map(Bi)))), s;
}
function zi(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Ew[e]);
}
function Lw(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function na(t) {
  return typeof t != "number" ? Lw(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Hn(t) {
  const {
    x: e,
    y: n,
    width: r,
    height: i
  } = t;
  return {
    width: r,
    height: i,
    top: n,
    left: e,
    right: e + r,
    bottom: n + i,
    x: e,
    y: n
  };
}
function Fc(t, e, n) {
  let {
    reference: r,
    floating: i
  } = t;
  const s = nt(e), o = ta(e), l = ea(o), a = je(e), c = s === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[l] / 2 - i[l] / 2;
  let h;
  switch (a) {
    case "top":
      h = {
        x: u,
        y: r.y - i.height
      };
      break;
    case "bottom":
      h = {
        x: u,
        y: r.y + r.height
      };
      break;
    case "right":
      h = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      h = {
        x: r.x - i.width,
        y: d
      };
      break;
    default:
      h = {
        x: r.x,
        y: r.y
      };
  }
  switch (Je(e)) {
    case "start":
      h[o] -= f * (n && c ? -1 : 1);
      break;
    case "end":
      h[o] += f * (n && c ? -1 : 1);
      break;
  }
  return h;
}
const Bw = async (t, e, n) => {
  const {
    placement: r = "bottom",
    strategy: i = "absolute",
    middleware: s = [],
    platform: o
  } = n, l = s.filter(Boolean), a = await (o.isRTL == null ? void 0 : o.isRTL(e));
  let c = await o.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: u,
    y: d
  } = Fc(c, r, a), f = r, h = {}, p = 0;
  for (let m = 0; m < l.length; m++) {
    const {
      name: g,
      fn: y
    } = l[m], {
      x: b,
      y: w,
      data: C,
      reset: k
    } = await y({
      x: u,
      y: d,
      initialPlacement: r,
      placement: f,
      strategy: i,
      middlewareData: h,
      rects: c,
      platform: o,
      elements: {
        reference: t,
        floating: e
      }
    });
    u = b ?? u, d = w ?? d, h = {
      ...h,
      [g]: {
        ...h[g],
        ...C
      }
    }, k && p <= 50 && (p++, typeof k == "object" && (k.placement && (f = k.placement), k.rects && (c = k.rects === !0 ? await o.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : k.rects), {
      x: u,
      y: d
    } = Fc(c, f, a)), m = -1);
  }
  return {
    x: u,
    y: d,
    placement: f,
    strategy: i,
    middlewareData: h
  };
};
async function Vn(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: r,
    y: i,
    platform: s,
    rects: o,
    elements: l,
    strategy: a
  } = t, {
    boundary: c = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: d = "floating",
    altBoundary: f = !1,
    padding: h = 0
  } = Mt(e, t), p = na(h), g = l[f ? d === "floating" ? "reference" : "floating" : d], y = Hn(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(g))) == null || n ? g : g.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(l.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: a
  })), b = d === "floating" ? {
    x: r,
    y: i,
    width: o.floating.width,
    height: o.floating.height
  } : o.reference, w = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l.floating)), C = await (s.isElement == null ? void 0 : s.isElement(w)) ? await (s.getScale == null ? void 0 : s.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, k = Hn(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: l,
    rect: b,
    offsetParent: w,
    strategy: a
  }) : b);
  return {
    top: (y.top - k.top + p.top) / C.y,
    bottom: (k.bottom - y.bottom + p.bottom) / C.y,
    left: (y.left - k.left + p.left) / C.x,
    right: (k.right - y.right + p.right) / C.x
  };
}
const zw = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: n,
      y: r,
      placement: i,
      rects: s,
      platform: o,
      elements: l,
      middlewareData: a
    } = e, {
      element: c,
      padding: u = 0
    } = Mt(t, e) || {};
    if (c == null)
      return {};
    const d = na(u), f = {
      x: n,
      y: r
    }, h = ta(i), p = ea(h), m = await o.getDimensions(c), g = h === "y", y = g ? "top" : "left", b = g ? "bottom" : "right", w = g ? "clientHeight" : "clientWidth", C = s.reference[p] + s.reference[h] - f[h] - s.floating[p], k = f[h] - s.reference[h], T = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(c));
    let v = T ? T[w] : 0;
    (!v || !await (o.isElement == null ? void 0 : o.isElement(T))) && (v = l.floating[w] || s.floating[p]);
    const E = C / 2 - k / 2, R = v / 2 - m[p] / 2 - 1, N = at(d[y], R), H = at(d[b], R), U = N, X = v - m[p] - H, L = v / 2 - m[p] / 2 + E, _ = Ko(U, L, X), te = !a.arrow && Je(i) != null && L !== _ && s.reference[p] / 2 - (L < U ? N : H) - m[p] / 2 < 0, ne = te ? L < U ? L - U : L - X : 0;
    return {
      [h]: f[h] + ne,
      data: {
        [h]: _,
        centerOffset: L - _ - ne,
        ...te && {
          alignmentOffset: ne
        }
      },
      reset: te
    };
  }
});
function $w(t, e, n) {
  return (t ? [...n.filter((i) => Je(i) === t), ...n.filter((i) => Je(i) !== t)] : n.filter((i) => je(i) === i)).filter((i) => t ? Je(i) === t || (e ? Bi(i) !== i : !1) : !0);
}
const _w = function(t) {
  return t === void 0 && (t = {}), {
    name: "autoPlacement",
    options: t,
    async fn(e) {
      var n, r, i;
      const {
        rects: s,
        middlewareData: o,
        placement: l,
        platform: a,
        elements: c
      } = e, {
        crossAxis: u = !1,
        alignment: d,
        allowedPlacements: f = zc,
        autoAlignment: h = !0,
        ...p
      } = Mt(t, e), m = d !== void 0 || f === zc ? $w(d || null, h, f) : f, g = await Vn(e, p), y = ((n = o.autoPlacement) == null ? void 0 : n.index) || 0, b = m[y];
      if (b == null)
        return {};
      const w = Zf(b, s, await (a.isRTL == null ? void 0 : a.isRTL(c.floating)));
      if (l !== b)
        return {
          reset: {
            placement: m[0]
          }
        };
      const C = [g[je(b)], g[w[0]], g[w[1]]], k = [...((r = o.autoPlacement) == null ? void 0 : r.overflows) || [], {
        placement: b,
        overflows: C
      }], T = m[y + 1];
      if (T)
        return {
          data: {
            index: y + 1,
            overflows: k
          },
          reset: {
            placement: T
          }
        };
      const v = k.map((N) => {
        const H = Je(N.placement);
        return [N.placement, H && u ? (
          // Check along the mainAxis and main crossAxis side.
          N.overflows.slice(0, 2).reduce((U, X) => U + X, 0)
        ) : (
          // Check only the mainAxis.
          N.overflows[0]
        ), N.overflows];
      }).sort((N, H) => N[1] - H[1]), R = ((i = v.filter((N) => N[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        Je(N[0]) ? 2 : 3
      ).every((H) => H <= 0))[0]) == null ? void 0 : i[0]) || v[0][0];
      return R !== l ? {
        data: {
          index: y + 1,
          overflows: k
        },
        reset: {
          placement: R
        }
      } : {};
    }
  };
}, Fw = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, r;
      const {
        placement: i,
        middlewareData: s,
        rects: o,
        initialPlacement: l,
        platform: a,
        elements: c
      } = e, {
        mainAxis: u = !0,
        crossAxis: d = !0,
        fallbackPlacements: f,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: p = "none",
        flipAlignment: m = !0,
        ...g
      } = Mt(t, e);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const y = je(i), b = nt(l), w = je(l) === l, C = await (a.isRTL == null ? void 0 : a.isRTL(c.floating)), k = f || (w || !m ? [zi(l)] : Nw(l)), T = p !== "none";
      !f && T && k.push(...Pw(l, m, p, C));
      const v = [l, ...k], E = await Vn(e, g), R = [];
      let N = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (u && R.push(E[y]), d) {
        const L = Zf(i, o, C);
        R.push(E[L[0]], E[L[1]]);
      }
      if (N = [...N, {
        placement: i,
        overflows: R
      }], !R.every((L) => L <= 0)) {
        var H, U;
        const L = (((H = s.flip) == null ? void 0 : H.index) || 0) + 1, _ = v[L];
        if (_ && (!(d === "alignment" ? b !== nt(_) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        N.every((Te) => nt(Te.placement) === b ? Te.overflows[0] > 0 : !0)))
          return {
            data: {
              index: L,
              overflows: N
            },
            reset: {
              placement: _
            }
          };
        let te = (U = N.filter((ne) => ne.overflows[0] <= 0).sort((ne, Te) => ne.overflows[1] - Te.overflows[1])[0]) == null ? void 0 : U.placement;
        if (!te)
          switch (h) {
            case "bestFit": {
              var X;
              const ne = (X = N.filter((Te) => {
                if (T) {
                  const Et = nt(Te.placement);
                  return Et === b || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  Et === "y";
                }
                return !0;
              }).map((Te) => [Te.placement, Te.overflows.filter((Et) => Et > 0).reduce((Et, Jh) => Et + Jh, 0)]).sort((Te, Et) => Te[1] - Et[1])[0]) == null ? void 0 : X[0];
              ne && (te = ne);
              break;
            }
            case "initialPlacement":
              te = l;
              break;
          }
        if (i !== te)
          return {
            reset: {
              placement: te
            }
          };
      }
      return {};
    }
  };
};
function Hc(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function Vc(t) {
  return Xf.some((e) => t[e] >= 0);
}
const Hw = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(e) {
      const {
        rects: n
      } = e, {
        strategy: r = "referenceHidden",
        ...i
      } = Mt(t, e);
      switch (r) {
        case "referenceHidden": {
          const s = await Vn(e, {
            ...i,
            elementContext: "reference"
          }), o = Hc(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: o,
              referenceHidden: Vc(o)
            }
          };
        }
        case "escaped": {
          const s = await Vn(e, {
            ...i,
            altBoundary: !0
          }), o = Hc(s, n.floating);
          return {
            data: {
              escapedOffsets: o,
              escaped: Vc(o)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
function eh(t) {
  const e = at(...t.map((s) => s.left)), n = at(...t.map((s) => s.top)), r = ge(...t.map((s) => s.right)), i = ge(...t.map((s) => s.bottom));
  return {
    x: e,
    y: n,
    width: r - e,
    height: i - n
  };
}
function Vw(t) {
  const e = t.slice().sort((i, s) => i.y - s.y), n = [];
  let r = null;
  for (let i = 0; i < e.length; i++) {
    const s = e[i];
    !r || s.y - r.y > r.height / 2 ? n.push([s]) : n[n.length - 1].push(s), r = s;
  }
  return n.map((i) => Hn(eh(i)));
}
const jw = function(t) {
  return t === void 0 && (t = {}), {
    name: "inline",
    options: t,
    async fn(e) {
      const {
        placement: n,
        elements: r,
        rects: i,
        platform: s,
        strategy: o
      } = e, {
        padding: l = 2,
        x: a,
        y: c
      } = Mt(t, e), u = Array.from(await (s.getClientRects == null ? void 0 : s.getClientRects(r.reference)) || []), d = Vw(u), f = Hn(eh(u)), h = na(l);
      function p() {
        if (d.length === 2 && d[0].left > d[1].right && a != null && c != null)
          return d.find((g) => a > g.left - h.left && a < g.right + h.right && c > g.top - h.top && c < g.bottom + h.bottom) || f;
        if (d.length >= 2) {
          if (nt(n) === "y") {
            const N = d[0], H = d[d.length - 1], U = je(n) === "top", X = N.top, L = H.bottom, _ = U ? N.left : H.left, te = U ? N.right : H.right, ne = te - _, Te = L - X;
            return {
              top: X,
              bottom: L,
              left: _,
              right: te,
              width: ne,
              height: Te,
              x: _,
              y: X
            };
          }
          const g = je(n) === "left", y = ge(...d.map((N) => N.right)), b = at(...d.map((N) => N.left)), w = d.filter((N) => g ? N.left === b : N.right === y), C = w[0].top, k = w[w.length - 1].bottom, T = b, v = y, E = v - T, R = k - C;
          return {
            top: C,
            bottom: k,
            left: T,
            right: v,
            width: E,
            height: R,
            x: T,
            y: C
          };
        }
        return f;
      }
      const m = await s.getElementRects({
        reference: {
          getBoundingClientRect: p
        },
        floating: r.floating,
        strategy: o
      });
      return i.reference.x !== m.reference.x || i.reference.y !== m.reference.y || i.reference.width !== m.reference.width || i.reference.height !== m.reference.height ? {
        reset: {
          rects: m
        }
      } : {};
    }
  };
}, Uw = /* @__PURE__ */ new Set(["left", "top"]);
async function Ww(t, e) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = t, s = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = je(n), l = Je(n), a = nt(n) === "y", c = Uw.has(o) ? -1 : 1, u = s && a ? -1 : 1, d = Mt(e, t);
  let {
    mainAxis: f,
    crossAxis: h,
    alignmentAxis: p
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return l && typeof p == "number" && (h = l === "end" ? p * -1 : p), a ? {
    x: h * u,
    y: f * c
  } : {
    x: f * c,
    y: h * u
  };
}
const Kw = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, r;
      const {
        x: i,
        y: s,
        placement: o,
        middlewareData: l
      } = e, a = await Ww(e, t);
      return o === ((n = l.offset) == null ? void 0 : n.placement) && (r = l.arrow) != null && r.alignmentOffset ? {} : {
        x: i + a.x,
        y: s + a.y,
        data: {
          ...a,
          placement: o
        }
      };
    }
  };
}, qw = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r,
        placement: i
      } = e, {
        mainAxis: s = !0,
        crossAxis: o = !1,
        limiter: l = {
          fn: (g) => {
            let {
              x: y,
              y: b
            } = g;
            return {
              x: y,
              y: b
            };
          }
        },
        ...a
      } = Mt(t, e), c = {
        x: n,
        y: r
      }, u = await Vn(e, a), d = nt(je(i)), f = Qf(d);
      let h = c[f], p = c[d];
      if (s) {
        const g = f === "y" ? "top" : "left", y = f === "y" ? "bottom" : "right", b = h + u[g], w = h - u[y];
        h = Ko(b, h, w);
      }
      if (o) {
        const g = d === "y" ? "top" : "left", y = d === "y" ? "bottom" : "right", b = p + u[g], w = p - u[y];
        p = Ko(b, p, w);
      }
      const m = l.fn({
        ...e,
        [f]: h,
        [d]: p
      });
      return {
        ...m,
        data: {
          x: m.x - n,
          y: m.y - r,
          enabled: {
            [f]: s,
            [d]: o
          }
        }
      };
    }
  };
}, Jw = function(t) {
  return t === void 0 && (t = {}), {
    name: "size",
    options: t,
    async fn(e) {
      var n, r;
      const {
        placement: i,
        rects: s,
        platform: o,
        elements: l
      } = e, {
        apply: a = () => {
        },
        ...c
      } = Mt(t, e), u = await Vn(e, c), d = je(i), f = Je(i), h = nt(i) === "y", {
        width: p,
        height: m
      } = s.floating;
      let g, y;
      d === "top" || d === "bottom" ? (g = d, y = f === (await (o.isRTL == null ? void 0 : o.isRTL(l.floating)) ? "start" : "end") ? "left" : "right") : (y = d, g = f === "end" ? "top" : "bottom");
      const b = m - u.top - u.bottom, w = p - u.left - u.right, C = at(m - u[g], b), k = at(p - u[y], w), T = !e.middlewareData.shift;
      let v = C, E = k;
      if ((n = e.middlewareData.shift) != null && n.enabled.x && (E = w), (r = e.middlewareData.shift) != null && r.enabled.y && (v = b), T && !f) {
        const N = ge(u.left, 0), H = ge(u.right, 0), U = ge(u.top, 0), X = ge(u.bottom, 0);
        h ? E = p - 2 * (N !== 0 || H !== 0 ? N + H : ge(u.left, u.right)) : v = m - 2 * (U !== 0 || X !== 0 ? U + X : ge(u.top, u.bottom));
      }
      await a({
        ...e,
        availableWidth: E,
        availableHeight: v
      });
      const R = await o.getDimensions(l.floating);
      return p !== R.width || m !== R.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Rs() {
  return typeof window < "u";
}
function Kn(t) {
  return th(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Re(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Tt(t) {
  var e;
  return (e = (th(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function th(t) {
  return Rs() ? t instanceof Node || t instanceof Re(t).Node : !1;
}
function Ge(t) {
  return Rs() ? t instanceof Element || t instanceof Re(t).Element : !1;
}
function ct(t) {
  return Rs() ? t instanceof HTMLElement || t instanceof Re(t).HTMLElement : !1;
}
function jc(t) {
  return !Rs() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Re(t).ShadowRoot;
}
const Gw = /* @__PURE__ */ new Set(["inline", "contents"]);
function $r(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r,
    display: i
  } = Ye(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + n) && !Gw.has(i);
}
const Yw = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Xw(t) {
  return Yw.has(Kn(t));
}
const Qw = [":popover-open", ":modal"];
function Ds(t) {
  return Qw.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const Zw = ["transform", "translate", "scale", "rotate", "perspective"], ek = ["transform", "translate", "scale", "rotate", "perspective", "filter"], tk = ["paint", "layout", "strict", "content"];
function ra(t) {
  const e = ia(), n = Ge(t) ? Ye(t) : t;
  return Zw.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ek.some((r) => (n.willChange || "").includes(r)) || tk.some((r) => (n.contain || "").includes(r));
}
function nk(t) {
  let e = Xt(t);
  for (; ct(e) && !jn(e); ) {
    if (ra(e))
      return e;
    if (Ds(e))
      return null;
    e = Xt(e);
  }
  return null;
}
function ia() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const rk = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function jn(t) {
  return rk.has(Kn(t));
}
function Ye(t) {
  return Re(t).getComputedStyle(t);
}
function Ps(t) {
  return Ge(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function Xt(t) {
  if (Kn(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    jc(t) && t.host || // Fallback.
    Tt(t)
  );
  return jc(e) ? e.host : e;
}
function nh(t) {
  const e = Xt(t);
  return jn(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : ct(e) && $r(e) ? e : nh(e);
}
function rh(t, e, n) {
  var r;
  e === void 0 && (e = []);
  const i = nh(t), s = i === ((r = t.ownerDocument) == null ? void 0 : r.body), o = Re(i);
  return s ? (qo(o), e.concat(o, o.visualViewport || [], $r(i) ? i : [], [])) : e.concat(i, rh(i, []));
}
function qo(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function ih(t) {
  const e = Ye(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const i = ct(t), s = i ? t.offsetWidth : n, o = i ? t.offsetHeight : r, l = Li(n) !== s || Li(r) !== o;
  return l && (n = s, r = o), {
    width: n,
    height: r,
    $: l
  };
}
function sh(t) {
  return Ge(t) ? t : t.contextElement;
}
function Pn(t) {
  const e = sh(t);
  if (!ct(e))
    return rt(1);
  const n = e.getBoundingClientRect(), {
    width: r,
    height: i,
    $: s
  } = ih(e);
  let o = (s ? Li(n.width) : n.width) / r, l = (s ? Li(n.height) : n.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: o,
    y: l
  };
}
const ik = /* @__PURE__ */ rt(0);
function oh(t) {
  const e = Re(t);
  return !ia() || !e.visualViewport ? ik : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function sk(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Re(t) ? !1 : e;
}
function Nr(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), s = sh(t);
  let o = rt(1);
  e && (r ? Ge(r) && (o = Pn(r)) : o = Pn(t));
  const l = sk(s, n, r) ? oh(s) : rt(0);
  let a = (i.left + l.x) / o.x, c = (i.top + l.y) / o.y, u = i.width / o.x, d = i.height / o.y;
  if (s) {
    const f = Re(s), h = r && Ge(r) ? Re(r) : r;
    let p = f, m = qo(p);
    for (; m && r && h !== p; ) {
      const g = Pn(m), y = m.getBoundingClientRect(), b = Ye(m), w = y.left + (m.clientLeft + parseFloat(b.paddingLeft)) * g.x, C = y.top + (m.clientTop + parseFloat(b.paddingTop)) * g.y;
      a *= g.x, c *= g.y, u *= g.x, d *= g.y, a += w, c += C, p = Re(m), m = qo(p);
    }
  }
  return Hn({
    width: u,
    height: d,
    x: a,
    y: c
  });
}
function Ls(t, e) {
  const n = Ps(t).scrollLeft;
  return e ? e.left + n : Nr(Tt(t)).left + n;
}
function lh(t, e) {
  const n = t.getBoundingClientRect(), r = n.left + e.scrollLeft - Ls(t, n), i = n.top + e.scrollTop;
  return {
    x: r,
    y: i
  };
}
function ok(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: r,
    strategy: i
  } = t;
  const s = i === "fixed", o = Tt(r), l = e ? Ds(e.floating) : !1;
  if (r === o || l && s)
    return n;
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = rt(1);
  const u = rt(0), d = ct(r);
  if ((d || !d && !s) && ((Kn(r) !== "body" || $r(o)) && (a = Ps(r)), ct(r))) {
    const h = Nr(r);
    c = Pn(r), u.x = h.x + r.clientLeft, u.y = h.y + r.clientTop;
  }
  const f = o && !d && !s ? lh(o, a) : rt(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - a.scrollLeft * c.x + u.x + f.x,
    y: n.y * c.y - a.scrollTop * c.y + u.y + f.y
  };
}
function lk(t) {
  return Array.from(t.getClientRects());
}
function ak(t) {
  const e = Tt(t), n = Ps(t), r = t.ownerDocument.body, i = ge(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), s = ge(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -n.scrollLeft + Ls(t);
  const l = -n.scrollTop;
  return Ye(r).direction === "rtl" && (o += ge(e.clientWidth, r.clientWidth) - i), {
    width: i,
    height: s,
    x: o,
    y: l
  };
}
const Uc = 25;
function ck(t, e) {
  const n = Re(t), r = Tt(t), i = n.visualViewport;
  let s = r.clientWidth, o = r.clientHeight, l = 0, a = 0;
  if (i) {
    s = i.width, o = i.height;
    const u = ia();
    (!u || u && e === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  const c = Ls(r);
  if (c <= 0) {
    const u = r.ownerDocument, d = u.body, f = getComputedStyle(d), h = u.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, p = Math.abs(r.clientWidth - d.clientWidth - h);
    p <= Uc && (s -= p);
  } else c <= Uc && (s += c);
  return {
    width: s,
    height: o,
    x: l,
    y: a
  };
}
const uk = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function dk(t, e) {
  const n = Nr(t, !0, e === "fixed"), r = n.top + t.clientTop, i = n.left + t.clientLeft, s = ct(t) ? Pn(t) : rt(1), o = t.clientWidth * s.x, l = t.clientHeight * s.y, a = i * s.x, c = r * s.y;
  return {
    width: o,
    height: l,
    x: a,
    y: c
  };
}
function Wc(t, e, n) {
  let r;
  if (e === "viewport")
    r = ck(t, n);
  else if (e === "document")
    r = ak(Tt(t));
  else if (Ge(e))
    r = dk(e, n);
  else {
    const i = oh(t);
    r = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return Hn(r);
}
function ah(t, e) {
  const n = Xt(t);
  return n === e || !Ge(n) || jn(n) ? !1 : Ye(n).position === "fixed" || ah(n, e);
}
function fk(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let r = rh(t, []).filter((l) => Ge(l) && Kn(l) !== "body"), i = null;
  const s = Ye(t).position === "fixed";
  let o = s ? Xt(t) : t;
  for (; Ge(o) && !jn(o); ) {
    const l = Ye(o), a = ra(o);
    !a && l.position === "fixed" && (i = null), (s ? !a && !i : !a && l.position === "static" && !!i && uk.has(i.position) || $r(o) && !a && ah(t, o)) ? r = r.filter((u) => u !== o) : i = l, o = Xt(o);
  }
  return e.set(t, r), r;
}
function hk(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = t;
  const o = [...n === "clippingAncestors" ? Ds(e) ? [] : fk(e, this._c) : [].concat(n), r], l = o[0], a = o.reduce((c, u) => {
    const d = Wc(e, u, i);
    return c.top = ge(d.top, c.top), c.right = at(d.right, c.right), c.bottom = at(d.bottom, c.bottom), c.left = ge(d.left, c.left), c;
  }, Wc(e, l, i));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
function pk(t) {
  const {
    width: e,
    height: n
  } = ih(t);
  return {
    width: e,
    height: n
  };
}
function mk(t, e, n) {
  const r = ct(e), i = Tt(e), s = n === "fixed", o = Nr(t, !0, s, e);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = rt(0);
  function c() {
    a.x = Ls(i);
  }
  if (r || !r && !s)
    if ((Kn(e) !== "body" || $r(i)) && (l = Ps(e)), r) {
      const h = Nr(e, !0, s, e);
      a.x = h.x + e.clientLeft, a.y = h.y + e.clientTop;
    } else i && c();
  s && !r && i && c();
  const u = i && !r && !s ? lh(i, l) : rt(0), d = o.left + l.scrollLeft - a.x - u.x, f = o.top + l.scrollTop - a.y - u.y;
  return {
    x: d,
    y: f,
    width: o.width,
    height: o.height
  };
}
function oo(t) {
  return Ye(t).position === "static";
}
function Kc(t, e) {
  if (!ct(t) || Ye(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return Tt(t) === n && (n = n.ownerDocument.body), n;
}
function ch(t, e) {
  const n = Re(t);
  if (Ds(t))
    return n;
  if (!ct(t)) {
    let i = Xt(t);
    for (; i && !jn(i); ) {
      if (Ge(i) && !oo(i))
        return i;
      i = Xt(i);
    }
    return n;
  }
  let r = Kc(t, e);
  for (; r && Xw(r) && oo(r); )
    r = Kc(r, e);
  return r && jn(r) && oo(r) && !ra(r) ? n : r || nk(t) || n;
}
const gk = async function(t) {
  const e = this.getOffsetParent || ch, n = this.getDimensions, r = await n(t.floating);
  return {
    reference: mk(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function yk(t) {
  return Ye(t).direction === "rtl";
}
const bk = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ok,
  getDocumentElement: Tt,
  getClippingRect: hk,
  getOffsetParent: ch,
  getElementRects: gk,
  getClientRects: lk,
  getDimensions: pk,
  getScale: Pn,
  isElement: Ge,
  isRTL: yk
}, uh = Kw, dh = _w, fh = qw, hh = Fw, ph = Jw, mh = Hw, gh = zw, yh = jw, bh = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: bk,
    ...n
  }, s = {
    ...i.platform,
    _c: r
  };
  return Bw(t, e, {
    ...i,
    platform: s
  });
};
var Jo, Go;
if (typeof WeakMap < "u") {
  let t = /* @__PURE__ */ new WeakMap();
  Jo = (e) => t.get(e), Go = (e, n) => (t.set(e, n), n);
} else {
  const t = [];
  let n = 0;
  Jo = (r) => {
    for (let i = 0; i < t.length; i += 2)
      if (t[i] == r) return t[i + 1];
  }, Go = (r, i) => (n == 10 && (n = 0), t[n++] = r, t[n++] = i);
}
var bt = class {
  constructor(t, e, n, r) {
    this.width = t, this.height = e, this.map = n, this.problems = r;
  }
  // Find the dimensions of the cell at the given position.
  findCell(t) {
    for (let e = 0; e < this.map.length; e++) {
      const n = this.map[e];
      if (n != t) continue;
      const r = e % this.width, i = e / this.width | 0;
      let s = r + 1, o = i + 1;
      for (let l = 1; s < this.width && this.map[e + l] == n; l++)
        s++;
      for (let l = 1; o < this.height && this.map[e + this.width * l] == n; l++)
        o++;
      return { left: r, top: i, right: s, bottom: o };
    }
    throw new RangeError(`No cell with offset ${t} found`);
  }
  // Find the left side of the cell at the given position.
  colCount(t) {
    for (let e = 0; e < this.map.length; e++)
      if (this.map[e] == t)
        return e % this.width;
    throw new RangeError(`No cell with offset ${t} found`);
  }
  // Find the next cell in the given direction, starting from the cell
  // at `pos`, if any.
  nextCell(t, e, n) {
    const { left: r, right: i, top: s, bottom: o } = this.findCell(t);
    return e == "horiz" ? (n < 0 ? r == 0 : i == this.width) ? null : this.map[s * this.width + (n < 0 ? r - 1 : i)] : (n < 0 ? s == 0 : o == this.height) ? null : this.map[r + this.width * (n < 0 ? s - 1 : o)];
  }
  // Get the rectangle spanning the two given cells.
  rectBetween(t, e) {
    const {
      left: n,
      right: r,
      top: i,
      bottom: s
    } = this.findCell(t), {
      left: o,
      right: l,
      top: a,
      bottom: c
    } = this.findCell(e);
    return {
      left: Math.min(n, o),
      top: Math.min(i, a),
      right: Math.max(r, l),
      bottom: Math.max(s, c)
    };
  }
  // Return the position of all cells that have the top left corner in
  // the given rectangle.
  cellsInRect(t) {
    const e = [], n = {};
    for (let r = t.top; r < t.bottom; r++)
      for (let i = t.left; i < t.right; i++) {
        const s = r * this.width + i, o = this.map[s];
        n[o] || (n[o] = !0, !(i == t.left && i && this.map[s - 1] == o || r == t.top && r && this.map[s - this.width] == o) && e.push(o));
      }
    return e;
  }
  // Return the position at which the cell at the given row and column
  // starts, or would start, if a cell started there.
  positionAt(t, e, n) {
    for (let r = 0, i = 0; ; r++) {
      const s = i + n.child(r).nodeSize;
      if (r == t) {
        let o = e + t * this.width;
        const l = (t + 1) * this.width;
        for (; o < l && this.map[o] < i; ) o++;
        return o == l ? s - 1 : this.map[o];
      }
      i = s;
    }
  }
  // Find the table map for the given table node.
  static get(t) {
    return Jo(t) || Go(t, wk(t));
  }
};
function wk(t) {
  if (t.type.spec.tableRole != "table")
    throw new RangeError("Not a table node: " + t.type.name);
  const e = kk(t), n = t.childCount, r = [];
  let i = 0, s = null;
  const o = [];
  for (let c = 0, u = e * n; c < u; c++) r[c] = 0;
  for (let c = 0, u = 0; c < n; c++) {
    const d = t.child(c);
    u++;
    for (let p = 0; ; p++) {
      for (; i < r.length && r[i] != 0; ) i++;
      if (p == d.childCount) break;
      const m = d.child(p), { colspan: g, rowspan: y, colwidth: b } = m.attrs;
      for (let w = 0; w < y; w++) {
        if (w + c >= n) {
          (s || (s = [])).push({
            type: "overlong_rowspan",
            pos: u,
            n: y - w
          });
          break;
        }
        const C = i + w * e;
        for (let k = 0; k < g; k++) {
          r[C + k] == 0 ? r[C + k] = u : (s || (s = [])).push({
            type: "collision",
            row: c,
            pos: u,
            n: g - k
          });
          const T = b && b[k];
          if (T) {
            const v = (C + k) % e * 2, E = o[v];
            E == null || E != T && o[v + 1] == 1 ? (o[v] = T, o[v + 1] = 1) : E == T && o[v + 1]++;
          }
        }
      }
      i += g, u += m.nodeSize;
    }
    const f = (c + 1) * e;
    let h = 0;
    for (; i < f; ) r[i++] == 0 && h++;
    h && (s || (s = [])).push({ type: "missing", row: c, n: h }), u++;
  }
  (e === 0 || n === 0) && (s || (s = [])).push({ type: "zero_sized" });
  const l = new bt(e, n, r, s);
  let a = !1;
  for (let c = 0; !a && c < o.length; c += 2)
    o[c] != null && o[c + 1] < n && (a = !0);
  return a && xk(l, o, t), l;
}
function kk(t) {
  let e = -1, n = !1;
  for (let r = 0; r < t.childCount; r++) {
    const i = t.child(r);
    let s = 0;
    if (n)
      for (let o = 0; o < r; o++) {
        const l = t.child(o);
        for (let a = 0; a < l.childCount; a++) {
          const c = l.child(a);
          o + c.attrs.rowspan > r && (s += c.attrs.colspan);
        }
      }
    for (let o = 0; o < i.childCount; o++) {
      const l = i.child(o);
      s += l.attrs.colspan, l.attrs.rowspan > 1 && (n = !0);
    }
    e == -1 ? e = s : e != s && (e = Math.max(e, s));
  }
  return e;
}
function xk(t, e, n) {
  t.problems || (t.problems = []);
  const r = {};
  for (let i = 0; i < t.map.length; i++) {
    const s = t.map[i];
    if (r[s]) continue;
    r[s] = !0;
    const o = n.nodeAt(s);
    if (!o)
      throw new RangeError(`No cell with offset ${s} found`);
    let l = null;
    const a = o.attrs;
    for (let c = 0; c < a.colspan; c++) {
      const u = (i + c) % t.width, d = e[u * 2];
      d != null && (!a.colwidth || a.colwidth[c] != d) && ((l || (l = Sk(a)))[c] = d);
    }
    l && t.problems.unshift({
      type: "colwidth mismatch",
      pos: s,
      colwidth: l
    });
  }
}
function Sk(t) {
  if (t.colwidth) return t.colwidth.slice();
  const e = [];
  for (let n = 0; n < t.colspan; n++) e.push(0);
  return e;
}
function sa(t) {
  let e = t.cached.tableNodeTypes;
  if (!e) {
    e = t.cached.tableNodeTypes = {};
    for (const n in t.nodes) {
      const r = t.nodes[n], i = r.spec.tableRole;
      i && (e[i] = r);
    }
  }
  return e;
}
new G("selectingCells");
function vk(t) {
  for (let e = t.depth - 1; e > 0; e--)
    if (t.node(e).type.spec.tableRole == "row")
      return t.node(0).resolve(t.before(e + 1));
  return null;
}
function wh(t) {
  const e = t.selection.$head;
  for (let n = e.depth; n > 0; n--)
    if (e.node(n).type.spec.tableRole == "row") return !0;
  return !1;
}
function Ck(t) {
  const e = t.selection;
  if ("$anchorCell" in e && e.$anchorCell)
    return e.$anchorCell.pos > e.$headCell.pos ? e.$anchorCell : e.$headCell;
  if ("node" in e && e.node && e.node.type.spec.tableRole == "cell")
    return e.$anchor;
  const n = vk(e.$head) || Mk(e.$head);
  if (n)
    return n;
  throw new RangeError(`No cell found around position ${e.head}`);
}
function Mk(t) {
  for (let e = t.nodeAfter, n = t.pos; e; e = e.firstChild, n++) {
    const r = e.type.spec.tableRole;
    if (r == "cell" || r == "header_cell") return t.doc.resolve(n);
  }
  for (let e = t.nodeBefore, n = t.pos; e; e = e.lastChild, n--) {
    const r = e.type.spec.tableRole;
    if (r == "cell" || r == "header_cell")
      return t.doc.resolve(n - e.nodeSize);
  }
}
function qc(t) {
  return t.parent.type.spec.tableRole == "row" && !!t.nodeAfter;
}
function kh(t, e) {
  return t.depth == e.depth && t.pos >= e.start(-1) && t.pos <= e.end(-1);
}
function xh(t, e, n) {
  const r = t.node(-1), i = bt.get(r), s = t.start(-1), o = i.nextCell(t.pos - s, e, n);
  return o == null ? null : t.node(0).resolve(s + o);
}
function Jc(t, e, n = 1) {
  const r = { ...t, colspan: t.colspan - n };
  return r.colwidth && (r.colwidth = r.colwidth.slice(), r.colwidth.splice(e, n), r.colwidth.some((i) => i > 0) || (r.colwidth = null)), r;
}
var it = class mt extends I {
  // A table selection is identified by its anchor and head cells. The
  // positions given to this constructor should point _before_ two
  // cells in the same table. They may be the same, to select a single
  // cell.
  constructor(e, n = e) {
    const r = e.node(-1), i = bt.get(r), s = e.start(-1), o = i.rectBetween(
      e.pos - s,
      n.pos - s
    ), l = e.node(0), a = i.cellsInRect(o).filter((u) => u != n.pos - s);
    a.unshift(n.pos - s);
    const c = a.map((u) => {
      const d = r.nodeAt(u);
      if (!d)
        throw RangeError(`No cell with offset ${u} found`);
      const f = s + u + 1;
      return new Md(
        l.resolve(f),
        l.resolve(f + d.content.size)
      );
    });
    super(c[0].$from, c[0].$to, c), this.$anchorCell = e, this.$headCell = n;
  }
  map(e, n) {
    const r = e.resolve(n.map(this.$anchorCell.pos)), i = e.resolve(n.map(this.$headCell.pos));
    if (qc(r) && qc(i) && kh(r, i)) {
      const s = this.$anchorCell.node(-1) != r.node(-1);
      return s && this.isRowSelection() ? mt.rowSelection(r, i) : s && this.isColSelection() ? mt.colSelection(r, i) : new mt(r, i);
    }
    return D.between(r, i);
  }
  // Returns a rectangular slice of table rows containing the selected
  // cells.
  content() {
    const e = this.$anchorCell.node(-1), n = bt.get(e), r = this.$anchorCell.start(-1), i = n.rectBetween(
      this.$anchorCell.pos - r,
      this.$headCell.pos - r
    ), s = {}, o = [];
    for (let a = i.top; a < i.bottom; a++) {
      const c = [];
      for (let u = a * n.width + i.left, d = i.left; d < i.right; d++, u++) {
        const f = n.map[u];
        if (s[f]) continue;
        s[f] = !0;
        const h = n.findCell(f);
        let p = e.nodeAt(f);
        if (!p)
          throw RangeError(`No cell with offset ${f} found`);
        const m = i.left - h.left, g = h.right - i.right;
        if (m > 0 || g > 0) {
          let y = p.attrs;
          if (m > 0 && (y = Jc(y, 0, m)), g > 0 && (y = Jc(
            y,
            y.colspan - g,
            g
          )), h.left < i.left) {
            if (p = p.type.createAndFill(y), !p)
              throw RangeError(
                `Could not create cell with attrs ${JSON.stringify(y)}`
              );
          } else
            p = p.type.create(y, p.content);
        }
        if (h.top < i.top || h.bottom > i.bottom) {
          const y = {
            ...p.attrs,
            rowspan: Math.min(h.bottom, i.bottom) - Math.max(h.top, i.top)
          };
          h.top < i.top ? p = p.type.createAndFill(y) : p = p.type.create(y, p.content);
        }
        c.push(p);
      }
      o.push(e.child(a).copy(x.from(c)));
    }
    const l = this.isColSelection() && this.isRowSelection() ? e : o;
    return new M(x.from(l), 1, 1);
  }
  replace(e, n = M.empty) {
    const r = e.steps.length, i = this.ranges;
    for (let o = 0; o < i.length; o++) {
      const { $from: l, $to: a } = i[o], c = e.mapping.slice(r);
      e.replace(
        c.map(l.pos),
        c.map(a.pos),
        o ? M.empty : n
      );
    }
    const s = I.findFrom(
      e.doc.resolve(e.mapping.slice(r).map(this.to)),
      -1
    );
    s && e.setSelection(s);
  }
  replaceWith(e, n) {
    this.replace(e, new M(x.from(n), 0, 0));
  }
  forEachCell(e) {
    const n = this.$anchorCell.node(-1), r = bt.get(n), i = this.$anchorCell.start(-1), s = r.cellsInRect(
      r.rectBetween(
        this.$anchorCell.pos - i,
        this.$headCell.pos - i
      )
    );
    for (let o = 0; o < s.length; o++)
      e(n.nodeAt(s[o]), i + s[o]);
  }
  // True if this selection goes all the way from the top to the
  // bottom of the table.
  isColSelection() {
    const e = this.$anchorCell.index(-1), n = this.$headCell.index(-1);
    if (Math.min(e, n) > 0) return !1;
    const r = e + this.$anchorCell.nodeAfter.attrs.rowspan, i = n + this.$headCell.nodeAfter.attrs.rowspan;
    return Math.max(r, i) == this.$headCell.node(-1).childCount;
  }
  // Returns the smallest column selection that covers the given anchor
  // and head cell.
  static colSelection(e, n = e) {
    const r = e.node(-1), i = bt.get(r), s = e.start(-1), o = i.findCell(e.pos - s), l = i.findCell(n.pos - s), a = e.node(0);
    return o.top <= l.top ? (o.top > 0 && (e = a.resolve(s + i.map[o.left])), l.bottom < i.height && (n = a.resolve(
      s + i.map[i.width * (i.height - 1) + l.right - 1]
    ))) : (l.top > 0 && (n = a.resolve(s + i.map[l.left])), o.bottom < i.height && (e = a.resolve(
      s + i.map[i.width * (i.height - 1) + o.right - 1]
    ))), new mt(e, n);
  }
  // True if this selection goes all the way from the left to the
  // right of the table.
  isRowSelection() {
    const e = this.$anchorCell.node(-1), n = bt.get(e), r = this.$anchorCell.start(-1), i = n.colCount(this.$anchorCell.pos - r), s = n.colCount(this.$headCell.pos - r);
    if (Math.min(i, s) > 0) return !1;
    const o = i + this.$anchorCell.nodeAfter.attrs.colspan, l = s + this.$headCell.nodeAfter.attrs.colspan;
    return Math.max(o, l) == n.width;
  }
  eq(e) {
    return e instanceof mt && e.$anchorCell.pos == this.$anchorCell.pos && e.$headCell.pos == this.$headCell.pos;
  }
  // Returns the smallest row selection that covers the given anchor
  // and head cell.
  static rowSelection(e, n = e) {
    const r = e.node(-1), i = bt.get(r), s = e.start(-1), o = i.findCell(e.pos - s), l = i.findCell(n.pos - s), a = e.node(0);
    return o.left <= l.left ? (o.left > 0 && (e = a.resolve(
      s + i.map[o.top * i.width]
    )), l.right < i.width && (n = a.resolve(
      s + i.map[i.width * (l.top + 1) - 1]
    ))) : (l.left > 0 && (n = a.resolve(s + i.map[l.top * i.width])), o.right < i.width && (e = a.resolve(
      s + i.map[i.width * (o.top + 1) - 1]
    ))), new mt(e, n);
  }
  toJSON() {
    return {
      type: "cell",
      anchor: this.$anchorCell.pos,
      head: this.$headCell.pos
    };
  }
  static fromJSON(e, n) {
    return new mt(e.resolve(n.anchor), e.resolve(n.head));
  }
  static create(e, n, r = n) {
    return new mt(e.resolve(n), e.resolve(r));
  }
  getBookmark() {
    return new Tk(this.$anchorCell.pos, this.$headCell.pos);
  }
};
it.prototype.visible = !1;
I.jsonID("cell", it);
var Tk = class Sh {
  constructor(e, n) {
    this.anchor = e, this.head = n;
  }
  map(e) {
    return new Sh(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    const n = e.resolve(this.anchor), r = e.resolve(this.head);
    return n.parent.type.spec.tableRole == "row" && r.parent.type.spec.tableRole == "row" && n.index() < n.parent.childCount && r.index() < r.parent.childCount && kh(n, r) ? new it(n, r) : I.near(r, 1);
  }
};
new G("fix-tables");
function vh(t) {
  const e = t.selection, n = Ck(t), r = n.node(-1), i = n.start(-1), s = bt.get(r);
  return { ...e instanceof it ? s.rectBetween(
    e.$anchorCell.pos - i,
    e.$headCell.pos - i
  ) : s.findCell(n.pos - i), tableStart: i, map: s, table: r };
}
function Ek(t) {
  return function(e, n) {
    if (!wh(e)) return !1;
    if (n) {
      const r = sa(e.schema), i = vh(e), s = e.tr, o = i.map.cellsInRect(
        t == "column" ? {
          left: i.left,
          top: 0,
          right: i.right,
          bottom: i.map.height
        } : t == "row" ? {
          left: 0,
          top: i.top,
          right: i.map.width,
          bottom: i.bottom
        } : i
      ), l = o.map((a) => i.table.nodeAt(a));
      for (let a = 0; a < o.length; a++)
        l[a].type == r.header_cell && s.setNodeMarkup(
          i.tableStart + o[a],
          r.cell,
          l[a].attrs
        );
      if (s.steps.length == 0)
        for (let a = 0; a < o.length; a++)
          s.setNodeMarkup(
            i.tableStart + o[a],
            r.header_cell,
            l[a].attrs
          );
      n(s);
    }
    return !0;
  };
}
function Gc(t, e, n) {
  const r = e.map.cellsInRect({
    left: 0,
    top: 0,
    right: t == "row" ? e.map.width : 1,
    bottom: t == "column" ? e.map.height : 1
  });
  for (let i = 0; i < r.length; i++) {
    const s = e.table.nodeAt(r[i]);
    if (s && s.type !== n.header_cell)
      return !1;
  }
  return !0;
}
function oa(t, e) {
  return e = e || { useDeprecatedLogic: !1 }, e.useDeprecatedLogic ? Ek(t) : function(n, r) {
    if (!wh(n)) return !1;
    if (r) {
      const i = sa(n.schema), s = vh(n), o = n.tr, l = Gc("row", s, i), a = Gc(
        "column",
        s,
        i
      ), u = (t === "column" ? l : t === "row" ? a : !1) ? 1 : 0, d = t == "column" ? {
        left: 0,
        top: u,
        right: 1,
        bottom: s.map.height
      } : t == "row" ? {
        left: u,
        top: 0,
        right: s.map.width,
        bottom: 1
      } : s, f = t == "column" ? a ? i.cell : i.header_cell : t == "row" ? l ? i.cell : i.header_cell : i.cell;
      s.map.cellsInRect(d).forEach((h) => {
        const p = h + s.tableStart, m = o.doc.nodeAt(p);
        m && o.setNodeMarkup(p, f, m.attrs);
      }), r(o);
    }
    return !0;
  };
}
oa("row", {
  useDeprecatedLogic: !0
});
oa("column", {
  useDeprecatedLogic: !0
});
oa("cell", {
  useDeprecatedLogic: !0
});
function Xr(t, e) {
  const n = t.selection;
  if (!(n instanceof it)) return !1;
  if (e) {
    const r = t.tr, i = sa(t.schema).cell.createAndFill().content;
    n.forEachCell((s, o) => {
      s.content.eq(i) || r.replace(
        r.mapping.map(o + 1),
        r.mapping.map(o + s.nodeSize - 1),
        new M(i, 0, 0)
      );
    }), r.docChanged && e(r);
  }
  return !0;
}
_l({
  ArrowLeft: Qr("horiz", -1),
  ArrowRight: Qr("horiz", 1),
  ArrowUp: Qr("vert", -1),
  ArrowDown: Qr("vert", 1),
  "Shift-ArrowLeft": Zr("horiz", -1),
  "Shift-ArrowRight": Zr("horiz", 1),
  "Shift-ArrowUp": Zr("vert", -1),
  "Shift-ArrowDown": Zr("vert", 1),
  Backspace: Xr,
  "Mod-Backspace": Xr,
  Delete: Xr,
  "Mod-Delete": Xr
});
function ui(t, e, n) {
  return n.eq(t.selection) ? !1 : (e && e(t.tr.setSelection(n).scrollIntoView()), !0);
}
function Qr(t, e) {
  return (n, r, i) => {
    if (!i) return !1;
    const s = n.selection;
    if (s instanceof it)
      return ui(
        n,
        r,
        I.near(s.$headCell, e)
      );
    if (t != "horiz" && !s.empty) return !1;
    const o = Ch(i, t, e);
    if (o == null) return !1;
    if (t == "horiz")
      return ui(
        n,
        r,
        I.near(n.doc.resolve(s.head + e), e)
      );
    {
      const l = n.doc.resolve(o), a = xh(l, t, e);
      let c;
      return a ? c = I.near(a, 1) : e < 0 ? c = I.near(n.doc.resolve(l.before(-1)), -1) : c = I.near(n.doc.resolve(l.after(-1)), 1), ui(n, r, c);
    }
  };
}
function Zr(t, e) {
  return (n, r, i) => {
    if (!i) return !1;
    const s = n.selection;
    let o;
    if (s instanceof it)
      o = s;
    else {
      const a = Ch(i, t, e);
      if (a == null) return !1;
      o = new it(n.doc.resolve(a));
    }
    const l = xh(o.$headCell, t, e);
    return l ? ui(
      n,
      r,
      new it(o.$anchorCell, l)
    ) : !1;
  };
}
function Ch(t, e, n) {
  if (!(t.state.selection instanceof D)) return null;
  const { $head: r } = t.state.selection;
  for (let i = r.depth - 1; i >= 0; i--) {
    const s = r.node(i);
    if ((n < 0 ? r.index(i) : r.indexAfter(i)) != (n < 0 ? 0 : s.childCount)) return null;
    if (s.type.spec.tableRole == "cell" || s.type.spec.tableRole == "header_cell") {
      const l = r.before(i), a = e == "vert" ? n > 0 ? "down" : "up" : n > 0 ? "right" : "left";
      return t.endOfTextblock(a) ? l : null;
    }
  }
  return null;
}
new G(
  "tableColumnResizing"
);
function Ak(t, e) {
  const n = Math.min(t.top, e.top), r = Math.max(t.bottom, e.bottom), i = Math.min(t.left, e.left), o = Math.max(t.right, e.right) - i, l = r - n, a = i, c = n;
  return new DOMRect(a, c, o, l);
}
var Ok = class {
  constructor({
    editor: t,
    element: e,
    view: n,
    updateDelay: r = 250,
    resizeDelay: i = 60,
    shouldShow: s,
    appendTo: o,
    getReferencedVirtualElement: l,
    options: a
  }) {
    this.preventHide = !1, this.isVisible = !1, this.scrollTarget = window, this.floatingUIOptions = {
      strategy: "absolute",
      placement: "top",
      offset: 8,
      flip: {},
      shift: {},
      arrow: !1,
      size: !1,
      autoPlacement: !1,
      hide: !1,
      inline: !1,
      onShow: void 0,
      onHide: void 0,
      onUpdate: void 0,
      onDestroy: void 0
    }, this.shouldShow = ({ view: u, state: d, from: f, to: h }) => {
      const { doc: p, selection: m } = d, { empty: g } = m, y = !p.textBetween(f, h).length && jl(d.selection), b = this.element.contains(document.activeElement);
      return !(!(u.hasFocus() || b) || g || y || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.dragstartHandler = () => {
      this.hide();
    }, this.resizeHandler = () => {
      this.resizeDebounceTimer && clearTimeout(this.resizeDebounceTimer), this.resizeDebounceTimer = window.setTimeout(() => {
        this.updatePosition();
      }, this.resizeDelay);
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: u }) => {
      var d;
      if (this.editor.isDestroyed) {
        this.destroy();
        return;
      }
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      u != null && u.relatedTarget && ((d = this.element.parentNode) != null && d.contains(u.relatedTarget)) || (u == null ? void 0 : u.relatedTarget) !== this.editor.view.dom && this.hide();
    }, this.handleDebouncedUpdate = (u, d) => {
      const f = !(d != null && d.selection.eq(u.state.selection)), h = !(d != null && d.doc.eq(u.state.doc));
      !f && !h || (this.updateDebounceTimer && clearTimeout(this.updateDebounceTimer), this.updateDebounceTimer = window.setTimeout(() => {
        this.updateHandler(u, f, h, d);
      }, this.updateDelay));
    }, this.updateHandler = (u, d, f, h) => {
      const { composing: p } = u;
      if (p || !d && !f)
        return;
      if (!this.getShouldShow(h)) {
        this.hide();
        return;
      }
      this.updatePosition(), this.show();
    }, this.transactionHandler = ({ transaction: u }) => {
      u.getMeta("bubbleMenu") === "updatePosition" && this.updatePosition();
    };
    var c;
    this.editor = t, this.element = e, this.view = n, this.updateDelay = r, this.resizeDelay = i, this.appendTo = o, this.scrollTarget = (c = a == null ? void 0 : a.scrollTarget) != null ? c : window, this.getReferencedVirtualElement = l, this.floatingUIOptions = {
      ...this.floatingUIOptions,
      ...a
    }, this.element.tabIndex = 0, s && (this.shouldShow = s), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.addEventListener("dragstart", this.dragstartHandler), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.editor.on("transaction", this.transactionHandler), window.addEventListener("resize", this.resizeHandler), this.scrollTarget.addEventListener("scroll", this.resizeHandler), this.update(n, n.state), this.getShouldShow() && (this.show(), this.updatePosition());
  }
  get middlewares() {
    const t = [];
    return this.floatingUIOptions.flip && t.push(hh(typeof this.floatingUIOptions.flip != "boolean" ? this.floatingUIOptions.flip : void 0)), this.floatingUIOptions.shift && t.push(
      fh(typeof this.floatingUIOptions.shift != "boolean" ? this.floatingUIOptions.shift : void 0)
    ), this.floatingUIOptions.offset && t.push(
      uh(typeof this.floatingUIOptions.offset != "boolean" ? this.floatingUIOptions.offset : void 0)
    ), this.floatingUIOptions.arrow && t.push(gh(this.floatingUIOptions.arrow)), this.floatingUIOptions.size && t.push(ph(typeof this.floatingUIOptions.size != "boolean" ? this.floatingUIOptions.size : void 0)), this.floatingUIOptions.autoPlacement && t.push(
      dh(
        typeof this.floatingUIOptions.autoPlacement != "boolean" ? this.floatingUIOptions.autoPlacement : void 0
      )
    ), this.floatingUIOptions.hide && t.push(mh(typeof this.floatingUIOptions.hide != "boolean" ? this.floatingUIOptions.hide : void 0)), this.floatingUIOptions.inline && t.push(
      yh(typeof this.floatingUIOptions.inline != "boolean" ? this.floatingUIOptions.inline : void 0)
    ), t;
  }
  get virtualElement() {
    var t;
    const { selection: e } = this.editor.state, n = (t = this.getReferencedVirtualElement) == null ? void 0 : t.call(this);
    if (n)
      return n;
    const r = Bf(this.view, e.from, e.to);
    let i = {
      getBoundingClientRect: () => r,
      getClientRects: () => [r]
    };
    if (e instanceof O) {
      let s = this.view.nodeDOM(e.from);
      const o = s.dataset.nodeViewWrapper ? s : s.querySelector("[data-node-view-wrapper]");
      o && (s = o), s && (i = {
        getBoundingClientRect: () => s.getBoundingClientRect(),
        getClientRects: () => [s.getBoundingClientRect()]
      });
    }
    if (e instanceof it) {
      const { $anchorCell: s, $headCell: o } = e, l = s ? s.pos : o.pos, a = o ? o.pos : s.pos, c = this.view.nodeDOM(l), u = this.view.nodeDOM(a);
      if (!c || !u)
        return;
      const d = c === u ? c.getBoundingClientRect() : Ak(
        c.getBoundingClientRect(),
        u.getBoundingClientRect()
      );
      i = {
        getBoundingClientRect: () => d,
        getClientRects: () => [d]
      };
    }
    return i;
  }
  updatePosition() {
    const t = this.virtualElement;
    t && bh(t, this.element, {
      placement: this.floatingUIOptions.placement,
      strategy: this.floatingUIOptions.strategy,
      middleware: this.middlewares
    }).then(({ x: e, y: n, strategy: r }) => {
      this.element.style.width = "max-content", this.element.style.position = r, this.element.style.left = `${e}px`, this.element.style.top = `${n}px`, this.isVisible && this.floatingUIOptions.onUpdate && this.floatingUIOptions.onUpdate();
    });
  }
  update(t, e) {
    const { state: n } = t, r = n.selection.from !== n.selection.to;
    if (this.updateDelay > 0 && r) {
      this.handleDebouncedUpdate(t, e);
      return;
    }
    const i = !(e != null && e.selection.eq(t.state.selection)), s = !(e != null && e.doc.eq(t.state.doc));
    this.updateHandler(t, i, s, e);
  }
  getShouldShow(t) {
    var e;
    const { state: n } = this.view, { selection: r } = n, { ranges: i } = r, s = Math.min(...i.map((a) => a.$from.pos)), o = Math.max(...i.map((a) => a.$to.pos));
    return ((e = this.shouldShow) == null ? void 0 : e.call(this, {
      editor: this.editor,
      element: this.element,
      view: this.view,
      state: n,
      oldState: t,
      from: s,
      to: o
    })) || !1;
  }
  show() {
    var t;
    if (this.isVisible)
      return;
    this.element.style.visibility = "visible", this.element.style.opacity = "1";
    const e = typeof this.appendTo == "function" ? this.appendTo() : this.appendTo;
    (t = e ?? this.view.dom.parentElement) == null || t.appendChild(this.element), this.floatingUIOptions.onShow && this.floatingUIOptions.onShow(), this.isVisible = !0;
  }
  hide() {
    this.isVisible && (this.element.style.visibility = "hidden", this.element.style.opacity = "0", this.element.remove(), this.floatingUIOptions.onHide && this.floatingUIOptions.onHide(), this.isVisible = !1);
  }
  destroy() {
    this.hide(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.removeEventListener("dragstart", this.dragstartHandler), window.removeEventListener("resize", this.resizeHandler), this.scrollTarget.removeEventListener("scroll", this.resizeHandler), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler), this.editor.off("transaction", this.transactionHandler), this.floatingUIOptions.onDestroy && this.floatingUIOptions.onDestroy();
  }
}, Mh = (t) => new K({
  key: typeof t.pluginKey == "string" ? new G(t.pluginKey) : t.pluginKey,
  view: (e) => new Ok({ view: e, ...t })
});
Y.create({
  name: "bubbleMenu",
  addOptions() {
    return {
      element: null,
      pluginKey: "bubbleMenu",
      updateDelay: void 0,
      appendTo: void 0,
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      Mh({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        updateDelay: this.options.updateDelay,
        options: this.options.options,
        appendTo: this.options.appendTo,
        getReferencedVirtualElement: this.options.getReferencedVirtualElement,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
var Nk = /* @__PURE__ */ zu({
  name: "BubbleMenu",
  inheritAttrs: !1,
  props: {
    pluginKey: {
      type: [String, Object],
      default: "bubbleMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    updateDelay: {
      type: Number,
      default: void 0
    },
    resizeDelay: {
      type: Number,
      default: void 0
    },
    options: {
      type: Object,
      default: () => ({})
    },
    appendTo: {
      type: Object,
      default: void 0
    },
    shouldShow: {
      type: Function,
      default: null
    },
    getReferencedVirtualElement: {
      type: Function,
      default: void 0
    }
  },
  setup(t, { slots: e, attrs: n }) {
    const r = pl(null);
    return _u(() => {
      const {
        editor: i,
        options: s,
        pluginKey: o,
        resizeDelay: l,
        appendTo: a,
        shouldShow: c,
        getReferencedVirtualElement: u,
        updateDelay: d
      } = t, f = r.value;
      f && (f.style.visibility = "hidden", f.style.position = "absolute", f.remove(), yl(() => {
        i.registerPlugin(
          Mh({
            editor: i,
            element: f,
            options: s,
            pluginKey: o,
            resizeDelay: l,
            appendTo: a,
            shouldShow: c,
            getReferencedVirtualElement: u,
            updateDelay: d
          })
        );
      }));
    }), bl(() => {
      const { pluginKey: i, editor: s } = t;
      s.unregisterPlugin(i);
    }), () => {
      var i;
      return Ku("div", { ref: r, ...n }, (i = e.default) == null ? void 0 : i.call(e));
    };
  }
}), Ik = class {
  constructor({ editor: t, element: e, view: n, options: r, appendTo: i, shouldShow: s }) {
    this.preventHide = !1, this.isVisible = !1, this.shouldShow = ({ view: o, state: l }) => {
      const { selection: a } = l, { $anchor: c, empty: u } = a, d = c.depth === 1, f = c.parent.isTextblock && !c.parent.type.spec.code && !c.parent.textContent && c.parent.childCount === 0 && !this.getTextContent(c.parent);
      return !(!o.hasFocus() || !u || !d || !f || !this.editor.isEditable);
    }, this.floatingUIOptions = {
      strategy: "absolute",
      placement: "right",
      offset: 8,
      flip: {},
      shift: {},
      arrow: !1,
      size: !1,
      autoPlacement: !1,
      hide: !1,
      inline: !1
    }, this.updateHandler = (o, l, a, c) => {
      const { composing: u } = o;
      if (u || !l && !a)
        return;
      if (!this.getShouldShow(c)) {
        this.hide();
        return;
      }
      this.updatePosition(), this.show();
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: o }) => {
      var l;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      o != null && o.relatedTarget && ((l = this.element.parentNode) != null && l.contains(o.relatedTarget)) || (o == null ? void 0 : o.relatedTarget) !== this.editor.view.dom && this.hide();
    }, this.editor = t, this.element = e, this.view = n, this.appendTo = i, this.floatingUIOptions = {
      ...this.floatingUIOptions,
      ...r
    }, this.element.tabIndex = 0, s && (this.shouldShow = s), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.update(n, n.state), this.getShouldShow() && (this.show(), this.updatePosition());
  }
  getTextContent(t) {
    return Rf(t, { textSerializers: Jl(this.editor.schema) });
  }
  get middlewares() {
    const t = [];
    return this.floatingUIOptions.flip && t.push(hh(typeof this.floatingUIOptions.flip != "boolean" ? this.floatingUIOptions.flip : void 0)), this.floatingUIOptions.shift && t.push(
      fh(typeof this.floatingUIOptions.shift != "boolean" ? this.floatingUIOptions.shift : void 0)
    ), this.floatingUIOptions.offset && t.push(
      uh(typeof this.floatingUIOptions.offset != "boolean" ? this.floatingUIOptions.offset : void 0)
    ), this.floatingUIOptions.arrow && t.push(gh(this.floatingUIOptions.arrow)), this.floatingUIOptions.size && t.push(ph(typeof this.floatingUIOptions.size != "boolean" ? this.floatingUIOptions.size : void 0)), this.floatingUIOptions.autoPlacement && t.push(
      dh(
        typeof this.floatingUIOptions.autoPlacement != "boolean" ? this.floatingUIOptions.autoPlacement : void 0
      )
    ), this.floatingUIOptions.hide && t.push(mh(typeof this.floatingUIOptions.hide != "boolean" ? this.floatingUIOptions.hide : void 0)), this.floatingUIOptions.inline && t.push(
      yh(typeof this.floatingUIOptions.inline != "boolean" ? this.floatingUIOptions.inline : void 0)
    ), t;
  }
  getShouldShow(t) {
    var e;
    const { state: n } = this.view, { selection: r } = n, { ranges: i } = r, s = Math.min(...i.map((a) => a.$from.pos)), o = Math.max(...i.map((a) => a.$to.pos));
    return (e = this.shouldShow) == null ? void 0 : e.call(this, {
      editor: this.editor,
      view: this.view,
      state: n,
      oldState: t,
      from: s,
      to: o
    });
  }
  updatePosition() {
    const { selection: t } = this.editor.state, e = Bf(this.view, t.from, t.to);
    bh({
      getBoundingClientRect: () => e,
      getClientRects: () => [e]
    }, this.element, {
      placement: this.floatingUIOptions.placement,
      strategy: this.floatingUIOptions.strategy,
      middleware: this.middlewares
    }).then(({ x: r, y: i, strategy: s }) => {
      this.element.style.width = "max-content", this.element.style.position = s, this.element.style.left = `${r}px`, this.element.style.top = `${i}px`, this.isVisible && this.floatingUIOptions.onUpdate && this.floatingUIOptions.onUpdate();
    });
  }
  update(t, e) {
    const n = !(e != null && e.selection.eq(t.state.selection)), r = !(e != null && e.doc.eq(t.state.doc));
    this.updateHandler(t, n, r, e);
  }
  show() {
    var t;
    if (this.isVisible)
      return;
    this.element.style.visibility = "visible", this.element.style.opacity = "1";
    const e = typeof this.appendTo == "function" ? this.appendTo() : this.appendTo;
    (t = e ?? this.view.dom.parentElement) == null || t.appendChild(this.element), this.floatingUIOptions.onShow && this.floatingUIOptions.onShow(), this.isVisible = !0;
  }
  hide() {
    this.isVisible && (this.element.style.visibility = "hidden", this.element.style.opacity = "0", this.element.remove(), this.floatingUIOptions.onHide && this.floatingUIOptions.onHide(), this.isVisible = !1);
  }
  destroy() {
    this.hide(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler), this.floatingUIOptions.onDestroy && this.floatingUIOptions.onDestroy();
  }
}, Rk = (t) => new K({
  key: typeof t.pluginKey == "string" ? new G(t.pluginKey) : t.pluginKey,
  view: (e) => new Ik({ view: e, ...t })
});
Y.create({
  name: "floatingMenu",
  addOptions() {
    return {
      element: null,
      options: {},
      pluginKey: "floatingMenu",
      appendTo: void 0,
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      Rk({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        options: this.options.options,
        appendTo: this.options.appendTo,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
var Dk = De.create({
  name: "doc",
  topNode: !0,
  content: "block+",
  renderMarkdown: (t, e) => t.content ? e.renderChildren(t.content, `

`) : ""
}), Pk = Dk, Lk = De.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [{ tag: "p" }];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["p", Q(this.options.HTMLAttributes, t), 0];
  },
  parseMarkdown: (t, e) => {
    const n = t.tokens || [];
    return n.length === 1 && n[0].type === "image" ? e.parseChildren([n[0]]) : e.createNode(
      "paragraph",
      void 0,
      // no attributes for paragraph
      e.parseInline(n)
    );
  },
  renderMarkdown: (t, e) => !t || !Array.isArray(t.content) ? "" : e.renderChildren(t.content),
  addCommands() {
    return {
      setParagraph: () => ({ commands: t }) => t.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), Bk = Lk, zk = De.create({
  name: "text",
  group: "inline",
  parseMarkdown: (t) => ({
    type: "text",
    text: t.text || ""
  }),
  renderMarkdown: (t) => t.text || ""
}), $k = zk, _k = De.create({
  name: "hardBreak",
  markdownTokenName: "br",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  linebreakReplacement: !0,
  parseHTML() {
    return [{ tag: "br" }];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["br", Q(this.options.HTMLAttributes, t)];
  },
  renderText() {
    return `
`;
  },
  renderMarkdown: () => `  
`,
  parseMarkdown: () => ({
    type: "hardBreak"
  }),
  addCommands() {
    return {
      setHardBreak: () => ({ commands: t, chain: e, state: n, editor: r }) => t.first([
        () => t.exitCode(),
        () => t.command(() => {
          const { selection: i, storedMarks: s } = n;
          if (i.$from.parent.type.spec.isolating)
            return !1;
          const { keepMarks: o } = this.options, { splittableMarks: l } = r.extensionManager, a = s || i.$to.parentOffset && i.$from.marks();
          return e().insertContent({ type: this.name }).command(({ tr: c, dispatch: u }) => {
            if (u && a && o) {
              const d = a.filter((f) => l.includes(f.type.name));
              c.ensureMarks(d);
            }
            return !0;
          }).run();
        })
      ])
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), Fk = _k;
function Hk(t = {}) {
  return new K({
    view(e) {
      return new Vk(e, t);
    }
  });
}
class Vk {
  constructor(e, n) {
    var r;
    this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.width = (r = n.width) !== null && r !== void 0 ? r : 1, this.color = n.color === !1 ? void 0 : n.color || "black", this.class = n.class, this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((i) => {
      let s = (o) => {
        this[i](o);
      };
      return e.dom.addEventListener(i, s), { name: i, handler: s };
    });
  }
  destroy() {
    this.handlers.forEach(({ name: e, handler: n }) => this.editorView.dom.removeEventListener(e, n));
  }
  update(e, n) {
    this.cursorPos != null && n.doc != e.state.doc && (this.cursorPos > e.state.doc.content.size ? this.setCursor(null) : this.updateOverlay());
  }
  setCursor(e) {
    e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
  }
  updateOverlay() {
    let e = this.editorView.state.doc.resolve(this.cursorPos), n = !e.parent.inlineContent, r, i = this.editorView.dom, s = i.getBoundingClientRect(), o = s.width / i.offsetWidth, l = s.height / i.offsetHeight;
    if (n) {
      let d = e.nodeBefore, f = e.nodeAfter;
      if (d || f) {
        let h = this.editorView.nodeDOM(this.cursorPos - (d ? d.nodeSize : 0));
        if (h) {
          let p = h.getBoundingClientRect(), m = d ? p.bottom : p.top;
          d && f && (m = (m + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2);
          let g = this.width / 2 * l;
          r = { left: p.left, right: p.right, top: m - g, bottom: m + g };
        }
      }
    }
    if (!r) {
      let d = this.editorView.coordsAtPos(this.cursorPos), f = this.width / 2 * o;
      r = { left: d.left - f, right: d.left + f, top: d.top, bottom: d.bottom };
    }
    let a = this.editorView.dom.offsetParent;
    this.element || (this.element = a.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", n), this.element.classList.toggle("prosemirror-dropcursor-inline", !n);
    let c, u;
    if (!a || a == document.body && getComputedStyle(a).position == "static")
      c = -pageXOffset, u = -pageYOffset;
    else {
      let d = a.getBoundingClientRect(), f = d.width / a.offsetWidth, h = d.height / a.offsetHeight;
      c = d.left - a.scrollLeft * f, u = d.top - a.scrollTop * h;
    }
    this.element.style.left = (r.left - c) / o + "px", this.element.style.top = (r.top - u) / l + "px", this.element.style.width = (r.right - r.left) / o + "px", this.element.style.height = (r.bottom - r.top) / l + "px";
  }
  scheduleRemoval(e) {
    clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
  }
  dragover(e) {
    if (!this.editorView.editable)
      return;
    let n = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY }), r = n && n.inside >= 0 && this.editorView.state.doc.nodeAt(n.inside), i = r && r.type.spec.disableDropCursor, s = typeof i == "function" ? i(this.editorView, n, e) : i;
    if (n && !s) {
      let o = n.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let l = wd(this.editorView.state.doc, o, this.editorView.dragging.slice);
        l != null && (o = l);
      }
      this.setCursor(o), this.scheduleRemoval(5e3);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(e) {
    this.editorView.dom.contains(e.relatedTarget) || this.setCursor(null);
  }
}
class J extends I {
  /**
  Create a gap cursor.
  */
  constructor(e) {
    super(e, e);
  }
  map(e, n) {
    let r = e.resolve(n.map(this.head));
    return J.valid(r) ? new J(r) : I.near(r);
  }
  content() {
    return M.empty;
  }
  eq(e) {
    return e instanceof J && e.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new J(e.resolve(n.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new la(this.anchor);
  }
  /**
  @internal
  */
  static valid(e) {
    let n = e.parent;
    if (n.isTextblock || !jk(e) || !Uk(e))
      return !1;
    let r = n.type.spec.allowGapCursor;
    if (r != null)
      return r;
    let i = n.contentMatchAt(e.index()).defaultType;
    return i && i.isTextblock;
  }
  /**
  @internal
  */
  static findGapCursorFrom(e, n, r = !1) {
    e: for (; ; ) {
      if (!r && J.valid(e))
        return e;
      let i = e.pos, s = null;
      for (let o = e.depth; ; o--) {
        let l = e.node(o);
        if (n > 0 ? e.indexAfter(o) < l.childCount : e.index(o) > 0) {
          s = l.child(n > 0 ? e.indexAfter(o) : e.index(o) - 1);
          break;
        } else if (o == 0)
          return null;
        i += n;
        let a = e.doc.resolve(i);
        if (J.valid(a))
          return a;
      }
      for (; ; ) {
        let o = n > 0 ? s.firstChild : s.lastChild;
        if (!o) {
          if (s.isAtom && !s.isText && !O.isSelectable(s)) {
            e = e.doc.resolve(i + s.nodeSize * n), r = !1;
            continue e;
          }
          break;
        }
        s = o, i += n;
        let l = e.doc.resolve(i);
        if (J.valid(l))
          return l;
      }
      return null;
    }
  }
}
J.prototype.visible = !1;
J.findFrom = J.findGapCursorFrom;
I.jsonID("gapcursor", J);
class la {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new la(e.map(this.pos));
  }
  resolve(e) {
    let n = e.resolve(this.pos);
    return J.valid(n) ? new J(n) : I.near(n);
  }
}
function Th(t) {
  return t.isAtom || t.spec.isolating || t.spec.createGapCursor;
}
function jk(t) {
  for (let e = t.depth; e >= 0; e--) {
    let n = t.index(e), r = t.node(e);
    if (n == 0) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(n - 1); ; i = i.lastChild) {
      if (i.childCount == 0 && !i.inlineContent || Th(i.type))
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function Uk(t) {
  for (let e = t.depth; e >= 0; e--) {
    let n = t.indexAfter(e), r = t.node(e);
    if (n == r.childCount) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(n); ; i = i.firstChild) {
      if (i.childCount == 0 && !i.inlineContent || Th(i.type))
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function Wk() {
  return new K({
    props: {
      decorations: Gk,
      createSelectionBetween(t, e, n) {
        return e.pos == n.pos && J.valid(n) ? new J(n) : null;
      },
      handleClick: qk,
      handleKeyDown: Kk,
      handleDOMEvents: { beforeinput: Jk }
    }
  });
}
const Kk = _l({
  ArrowLeft: ei("horiz", -1),
  ArrowRight: ei("horiz", 1),
  ArrowUp: ei("vert", -1),
  ArrowDown: ei("vert", 1)
});
function ei(t, e) {
  const n = t == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(r, i, s) {
    let o = r.selection, l = e > 0 ? o.$to : o.$from, a = o.empty;
    if (o instanceof D) {
      if (!s.endOfTextblock(n) || l.depth == 0)
        return !1;
      a = !1, l = r.doc.resolve(e > 0 ? l.after() : l.before());
    }
    let c = J.findGapCursorFrom(l, e, a);
    return c ? (i && i(r.tr.setSelection(new J(c))), !0) : !1;
  };
}
function qk(t, e, n) {
  if (!t || !t.editable)
    return !1;
  let r = t.state.doc.resolve(e);
  if (!J.valid(r))
    return !1;
  let i = t.posAtCoords({ left: n.clientX, top: n.clientY });
  return i && i.inside > -1 && O.isSelectable(t.state.doc.nodeAt(i.inside)) ? !1 : (t.dispatch(t.state.tr.setSelection(new J(r))), !0);
}
function Jk(t, e) {
  if (e.inputType != "insertCompositionText" || !(t.state.selection instanceof J))
    return !1;
  let { $from: n } = t.state.selection, r = n.parent.contentMatchAt(n.index()).findWrapping(t.state.schema.nodes.text);
  if (!r)
    return !1;
  let i = x.empty;
  for (let o = r.length - 1; o >= 0; o--)
    i = x.from(r[o].createAndFill(null, i));
  let s = t.state.tr.replace(n.pos, n.pos, new M(i, 0, 0));
  return s.setSelection(D.near(s.doc.resolve(n.pos + 1))), t.dispatch(s), !1;
}
function Gk(t) {
  if (!(t.selection instanceof J))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", W.create(t.doc, [ye.widget(t.selection.head, e, { key: "gapcursor" })]);
}
var $i = 200, oe = function() {
};
oe.prototype.append = function(e) {
  return e.length ? (e = oe.from(e), !this.length && e || e.length < $i && this.leafAppend(e) || this.length < $i && e.leafPrepend(this) || this.appendInner(e)) : this;
};
oe.prototype.prepend = function(e) {
  return e.length ? oe.from(e).append(this) : this;
};
oe.prototype.appendInner = function(e) {
  return new Yk(this, e);
};
oe.prototype.slice = function(e, n) {
  return e === void 0 && (e = 0), n === void 0 && (n = this.length), e >= n ? oe.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, n));
};
oe.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
oe.prototype.forEach = function(e, n, r) {
  n === void 0 && (n = 0), r === void 0 && (r = this.length), n <= r ? this.forEachInner(e, n, r, 0) : this.forEachInvertedInner(e, n, r, 0);
};
oe.prototype.map = function(e, n, r) {
  n === void 0 && (n = 0), r === void 0 && (r = this.length);
  var i = [];
  return this.forEach(function(s, o) {
    return i.push(e(s, o));
  }, n, r), i;
};
oe.from = function(e) {
  return e instanceof oe ? e : e && e.length ? new Eh(e) : oe.empty;
};
var Eh = /* @__PURE__ */ (function(t) {
  function e(r) {
    t.call(this), this.values = r;
  }
  t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
  var n = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(i, s) {
    return i == 0 && s == this.length ? this : new e(this.values.slice(i, s));
  }, e.prototype.getInner = function(i) {
    return this.values[i];
  }, e.prototype.forEachInner = function(i, s, o, l) {
    for (var a = s; a < o; a++)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(i, s, o, l) {
    for (var a = s - 1; a >= o; a--)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.leafAppend = function(i) {
    if (this.length + i.length <= $i)
      return new e(this.values.concat(i.flatten()));
  }, e.prototype.leafPrepend = function(i) {
    if (this.length + i.length <= $i)
      return new e(i.flatten().concat(this.values));
  }, n.length.get = function() {
    return this.values.length;
  }, n.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, n), e;
})(oe);
oe.empty = new Eh([]);
var Yk = /* @__PURE__ */ (function(t) {
  function e(n, r) {
    t.call(this), this.left = n, this.right = r, this.length = n.length + r.length, this.depth = Math.max(n.depth, r.depth) + 1;
  }
  return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(r) {
    return r < this.left.length ? this.left.get(r) : this.right.get(r - this.left.length);
  }, e.prototype.forEachInner = function(r, i, s, o) {
    var l = this.left.length;
    if (i < l && this.left.forEachInner(r, i, Math.min(s, l), o) === !1 || s > l && this.right.forEachInner(r, Math.max(i - l, 0), Math.min(this.length, s) - l, o + l) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(r, i, s, o) {
    var l = this.left.length;
    if (i > l && this.right.forEachInvertedInner(r, i - l, Math.max(s, l) - l, o + l) === !1 || s < l && this.left.forEachInvertedInner(r, Math.min(i, l), s, o) === !1)
      return !1;
  }, e.prototype.sliceInner = function(r, i) {
    if (r == 0 && i == this.length)
      return this;
    var s = this.left.length;
    return i <= s ? this.left.slice(r, i) : r >= s ? this.right.slice(r - s, i - s) : this.left.slice(r, s).append(this.right.slice(0, i - s));
  }, e.prototype.leafAppend = function(r) {
    var i = this.right.leafAppend(r);
    if (i)
      return new e(this.left, i);
  }, e.prototype.leafPrepend = function(r) {
    var i = this.left.leafPrepend(r);
    if (i)
      return new e(i, this.right);
  }, e.prototype.appendInner = function(r) {
    return this.left.depth >= Math.max(this.right.depth, r.depth) + 1 ? new e(this.left, new e(this.right, r)) : new e(this, r);
  }, e;
})(oe);
const Xk = 500;
class We {
  constructor(e, n) {
    this.items = e, this.eventCount = n;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, n) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let i, s;
    n && (i = this.remapping(r, this.items.length), s = i.maps.length);
    let o = e.tr, l, a, c = [], u = [];
    return this.items.forEach((d, f) => {
      if (!d.step) {
        i || (i = this.remapping(r, f + 1), s = i.maps.length), s--, u.push(d);
        return;
      }
      if (i) {
        u.push(new Ze(d.map));
        let h = d.step.map(i.slice(s)), p;
        h && o.maybeStep(h).doc && (p = o.mapping.maps[o.mapping.maps.length - 1], c.push(new Ze(p, void 0, void 0, c.length + u.length))), s--, p && i.appendMap(p, s);
      } else
        o.maybeStep(d.step);
      if (d.selection)
        return l = i ? d.selection.map(i.slice(s)) : d.selection, a = new We(this.items.slice(0, r).append(u.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: a, transform: o, selection: l };
  }
  // Create a new branch with the given transform added.
  addTransform(e, n, r, i) {
    let s = [], o = this.eventCount, l = this.items, a = !i && l.length ? l.get(l.length - 1) : null;
    for (let u = 0; u < e.steps.length; u++) {
      let d = e.steps[u].invert(e.docs[u]), f = new Ze(e.mapping.maps[u], d, n), h;
      (h = a && a.merge(f)) && (f = h, u ? s.pop() : l = l.slice(0, l.length - 1)), s.push(f), n && (o++, n = void 0), i || (a = f);
    }
    let c = o - r.depth;
    return c > Zk && (l = Qk(l, c), o -= c), new We(l.append(s), o);
  }
  remapping(e, n) {
    let r = new Sr();
    return this.items.forEach((i, s) => {
      let o = i.mirrorOffset != null && s - i.mirrorOffset >= e ? r.maps.length - i.mirrorOffset : void 0;
      r.appendMap(i.map, o);
    }, e, n), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new We(this.items.append(e.map((n) => new Ze(n))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, n) {
    if (!this.eventCount)
      return this;
    let r = [], i = Math.max(0, this.items.length - n), s = e.mapping, o = e.steps.length, l = this.eventCount;
    this.items.forEach((f) => {
      f.selection && l--;
    }, i);
    let a = n;
    this.items.forEach((f) => {
      let h = s.getMirror(--a);
      if (h == null)
        return;
      o = Math.min(o, h);
      let p = s.maps[h];
      if (f.step) {
        let m = e.steps[h].invert(e.docs[h]), g = f.selection && f.selection.map(s.slice(a + 1, h));
        g && l++, r.push(new Ze(p, m, g));
      } else
        r.push(new Ze(p));
    }, i);
    let c = [];
    for (let f = n; f < o; f++)
      c.push(new Ze(s.maps[f]));
    let u = this.items.slice(0, i).append(c).append(r), d = new We(u, l);
    return d.emptyItemCount() > Xk && (d = d.compress(this.items.length - r.length)), d;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((n) => {
      n.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let n = this.remapping(0, e), r = n.maps.length, i = [], s = 0;
    return this.items.forEach((o, l) => {
      if (l >= e)
        i.push(o), o.selection && s++;
      else if (o.step) {
        let a = o.step.map(n.slice(r)), c = a && a.getMap();
        if (r--, c && n.appendMap(c, r), a) {
          let u = o.selection && o.selection.map(n.slice(r));
          u && s++;
          let d = new Ze(c.invert(), a, u), f, h = i.length - 1;
          (f = i.length && i[h].merge(d)) ? i[h] = f : i.push(d);
        }
      } else o.map && r--;
    }, this.items.length, 0), new We(oe.from(i.reverse()), s);
  }
}
We.empty = new We(oe.empty, 0);
function Qk(t, e) {
  let n;
  return t.forEach((r, i) => {
    if (r.selection && e-- == 0)
      return n = i, !1;
  }), t.slice(n);
}
class Ze {
  constructor(e, n, r, i) {
    this.map = e, this.step = n, this.selection = r, this.mirrorOffset = i;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let n = e.step.merge(this.step);
      if (n)
        return new Ze(n.getMap().invert(), n, this.selection);
    }
  }
}
class Dt {
  constructor(e, n, r, i, s) {
    this.done = e, this.undone = n, this.prevRanges = r, this.prevTime = i, this.prevComposition = s;
  }
}
const Zk = 20;
function ex(t, e, n, r) {
  let i = n.getMeta(pn), s;
  if (i)
    return i.historyState;
  n.getMeta(rx) && (t = new Dt(t.done, t.undone, null, 0, -1));
  let o = n.getMeta("appendedTransaction");
  if (n.steps.length == 0)
    return t;
  if (o && o.getMeta(pn))
    return o.getMeta(pn).redo ? new Dt(t.done.addTransform(n, void 0, r, di(e)), t.undone, Yc(n.mapping.maps), t.prevTime, t.prevComposition) : new Dt(t.done, t.undone.addTransform(n, void 0, r, di(e)), null, t.prevTime, t.prevComposition);
  if (n.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
    let l = n.getMeta("composition"), a = t.prevTime == 0 || !o && t.prevComposition != l && (t.prevTime < (n.time || 0) - r.newGroupDelay || !tx(n, t.prevRanges)), c = o ? lo(t.prevRanges, n.mapping) : Yc(n.mapping.maps);
    return new Dt(t.done.addTransform(n, a ? e.selection.getBookmark() : void 0, r, di(e)), We.empty, c, n.time, l ?? t.prevComposition);
  } else return (s = n.getMeta("rebased")) ? new Dt(t.done.rebased(n, s), t.undone.rebased(n, s), lo(t.prevRanges, n.mapping), t.prevTime, t.prevComposition) : new Dt(t.done.addMaps(n.mapping.maps), t.undone.addMaps(n.mapping.maps), lo(t.prevRanges, n.mapping), t.prevTime, t.prevComposition);
}
function tx(t, e) {
  if (!e)
    return !1;
  if (!t.docChanged)
    return !0;
  let n = !1;
  return t.mapping.maps[0].forEach((r, i) => {
    for (let s = 0; s < e.length; s += 2)
      r <= e[s + 1] && i >= e[s] && (n = !0);
  }), n;
}
function Yc(t) {
  let e = [];
  for (let n = t.length - 1; n >= 0 && e.length == 0; n--)
    t[n].forEach((r, i, s, o) => e.push(s, o));
  return e;
}
function lo(t, e) {
  if (!t)
    return null;
  let n = [];
  for (let r = 0; r < t.length; r += 2) {
    let i = e.map(t[r], 1), s = e.map(t[r + 1], -1);
    i <= s && n.push(i, s);
  }
  return n;
}
function nx(t, e, n) {
  let r = di(e), i = pn.get(e).spec.config, s = (n ? t.undone : t.done).popEvent(e, r);
  if (!s)
    return null;
  let o = s.selection.resolve(s.transform.doc), l = (n ? t.done : t.undone).addTransform(s.transform, e.selection.getBookmark(), i, r), a = new Dt(n ? l : s.remaining, n ? s.remaining : l, null, 0, -1);
  return s.transform.setSelection(o).setMeta(pn, { redo: n, historyState: a });
}
let ao = !1, Xc = null;
function di(t) {
  let e = t.plugins;
  if (Xc != e) {
    ao = !1, Xc = e;
    for (let n = 0; n < e.length; n++)
      if (e[n].spec.historyPreserveItems) {
        ao = !0;
        break;
      }
  }
  return ao;
}
const pn = new G("history"), rx = new G("closeHistory");
function ix(t = {}) {
  return t = {
    depth: t.depth || 100,
    newGroupDelay: t.newGroupDelay || 500
  }, new K({
    key: pn,
    state: {
      init() {
        return new Dt(We.empty, We.empty, null, 0, -1);
      },
      apply(e, n, r) {
        return ex(n, r, e, t);
      }
    },
    config: t,
    props: {
      handleDOMEvents: {
        beforeinput(e, n) {
          let r = n.inputType, i = r == "historyUndo" ? Oh : r == "historyRedo" ? Nh : null;
          return i ? (n.preventDefault(), i(e.state, e.dispatch)) : !1;
        }
      }
    }
  });
}
function Ah(t, e) {
  return (n, r) => {
    let i = pn.getState(n);
    if (!i || (t ? i.undone : i.done).eventCount == 0)
      return !1;
    if (r) {
      let s = nx(i, n, t);
      s && r(e ? s.scrollIntoView() : s);
    }
    return !0;
  };
}
const Oh = Ah(!1, !0), Nh = Ah(!0, !0);
Y.create({
  name: "characterCount",
  addOptions() {
    return {
      limit: null,
      mode: "textSize",
      textCounter: (t) => t.length,
      wordCounter: (t) => t.split(" ").filter((e) => e !== "").length
    };
  },
  addStorage() {
    return {
      characters: () => 0,
      words: () => 0
    };
  },
  onBeforeCreate() {
    this.storage.characters = (t) => {
      const e = (t == null ? void 0 : t.node) || this.editor.state.doc;
      if (((t == null ? void 0 : t.mode) || this.options.mode) === "textSize") {
        const r = e.textBetween(0, e.content.size, void 0, " ");
        return this.options.textCounter(r);
      }
      return e.nodeSize;
    }, this.storage.words = (t) => {
      const e = (t == null ? void 0 : t.node) || this.editor.state.doc, n = e.textBetween(0, e.content.size, " ", " ");
      return this.options.wordCounter(n);
    };
  },
  addProseMirrorPlugins() {
    let t = !1;
    return [
      new K({
        key: new G("characterCount"),
        appendTransaction: (e, n, r) => {
          if (t)
            return;
          const i = this.options.limit;
          if (i == null || i === 0) {
            t = !0;
            return;
          }
          const s = this.storage.characters({ node: r.doc });
          if (s > i) {
            const o = s - i, l = 0, a = o;
            console.warn(
              `[CharacterCount] Initial content exceeded limit of ${i} characters. Content was automatically trimmed.`
            );
            const c = r.tr.deleteRange(l, a);
            return t = !0, c;
          }
          t = !0;
        },
        filterTransaction: (e, n) => {
          const r = this.options.limit;
          if (!e.docChanged || r === 0 || r === null || r === void 0)
            return !0;
          const i = this.storage.characters({ node: n.doc }), s = this.storage.characters({ node: e.doc });
          if (s <= r || i > r && s > r && s <= i)
            return !0;
          if (i > r && s > r && s > i || !e.getMeta("paste"))
            return !1;
          const l = e.selection.$head.pos, a = s - r, c = l - a, u = l;
          return e.deleteRange(c, u), !(this.storage.characters({ node: e.doc }) > r);
        }
      })
    ];
  }
});
Y.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [Hk(this.options)];
  }
});
Y.create({
  name: "focus",
  addOptions() {
    return {
      className: "has-focus",
      mode: "all"
    };
  },
  addProseMirrorPlugins() {
    return [
      new K({
        key: new G("focus"),
        props: {
          decorations: ({ doc: t, selection: e }) => {
            const { isEditable: n, isFocused: r } = this.editor, { anchor: i } = e, s = [];
            if (!n || !r)
              return W.create(t, []);
            let o = 0;
            this.options.mode === "deepest" && t.descendants((a, c) => {
              if (a.isText)
                return;
              if (!(i >= c && i <= c + a.nodeSize - 1))
                return !1;
              o += 1;
            });
            let l = 0;
            return t.descendants((a, c) => {
              if (a.isText || !(i >= c && i <= c + a.nodeSize - 1))
                return !1;
              if (l += 1, this.options.mode === "deepest" && o - l > 0 || this.options.mode === "shallowest" && l > 1)
                return this.options.mode === "deepest";
              s.push(
                ye.node(c, c + a.nodeSize, {
                  class: this.options.className
                })
              );
            }), W.create(t, s);
          }
        }
      })
    ];
  }
});
var sx = Y.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [Wk()];
  },
  extendNodeSchema(t) {
    var e;
    const n = {
      name: t.name,
      options: t.options,
      storage: t.storage
    };
    return {
      allowGapCursor: (e = B(A(t, "allowGapCursor", n))) != null ? e : null
    };
  }
});
Y.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something …",
      showOnlyWhenEditable: !0,
      showOnlyCurrent: !0,
      includeChildren: !1
    };
  },
  addProseMirrorPlugins() {
    return [
      new K({
        key: new G("placeholder"),
        props: {
          decorations: ({ doc: t, selection: e }) => {
            const n = this.editor.isEditable || !this.options.showOnlyWhenEditable, { anchor: r } = e, i = [];
            if (!n)
              return null;
            const s = this.editor.isEmpty;
            return t.descendants((o, l) => {
              const a = r >= l && r <= l + o.nodeSize, c = !o.isLeaf && Os(o);
              if ((a || !this.options.showOnlyCurrent) && c) {
                const u = [this.options.emptyNodeClass];
                s && u.push(this.options.emptyEditorClass);
                const d = ye.node(l, l + o.nodeSize, {
                  class: u.join(" "),
                  "data-placeholder": typeof this.options.placeholder == "function" ? this.options.placeholder({
                    editor: this.editor,
                    node: o,
                    pos: l,
                    hasAnchor: a
                  }) : this.options.placeholder
                });
                i.push(d);
              }
              return this.options.includeChildren;
            }), W.create(t, i);
          }
        }
      })
    ];
  }
});
Y.create({
  name: "selection",
  addOptions() {
    return {
      className: "selection"
    };
  },
  addProseMirrorPlugins() {
    const { editor: t, options: e } = this;
    return [
      new K({
        key: new G("selection"),
        props: {
          decorations(n) {
            return n.selection.empty || t.isFocused || !t.isEditable || Lf(n.selection) || t.view.dragging ? null : W.create(n.doc, [
              ye.inline(n.selection.from, n.selection.to, {
                class: e.className
              })
            ]);
          }
        }
      })
    ];
  }
});
function Qc({ types: t, node: e }) {
  return e && Array.isArray(t) && t.includes(e.type) || (e == null ? void 0 : e.type) === t;
}
Y.create({
  name: "trailingNode",
  addOptions() {
    return {
      node: void 0,
      notAfter: []
    };
  },
  addProseMirrorPlugins() {
    var t;
    const e = new G(this.name), n = ((t = this.editor.schema.topNodeType.contentMatch.defaultType) == null ? void 0 : t.name) || this.options.node || "paragraph", r = Object.entries(this.editor.schema.nodes).map(([, i]) => i).filter((i) => (this.options.notAfter || []).concat(n).includes(i.name));
    return [
      new K({
        key: e,
        appendTransaction: (i, s, o) => {
          const { doc: l, tr: a, schema: c } = o, u = e.getState(o), d = l.content.size, f = c.nodes[n];
          if (u)
            return a.insert(d, f.create());
        },
        state: {
          init: (i, s) => {
            const o = s.tr.doc.lastChild;
            return !Qc({ node: o, types: r });
          },
          apply: (i, s) => {
            if (!i.docChanged)
              return s;
            const o = i.doc.lastChild;
            return !Qc({ node: o, types: r });
          }
        }
      })
    ];
  }
});
var ox = Y.create({
  name: "undoRedo",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: t, dispatch: e }) => Oh(t, e),
      redo: () => ({ state: t, dispatch: e }) => Nh(t, e)
    };
  },
  addProseMirrorPlugins() {
    return [ix(this.options)];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-я": () => this.editor.commands.undo(),
      "Shift-Mod-я": () => this.editor.commands.redo()
    };
  }
}), _i = (t, e) => {
  if (t === "slot")
    return 0;
  if (t instanceof Function)
    return t(e);
  const { children: n, ...r } = e ?? {};
  if (t === "svg")
    throw new Error("SVG elements are not supported in the JSX syntax, use the array syntax instead");
  return [t, r, n];
}, lx = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, ax = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, cx = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, ux = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, dx = en.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (t) => t.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight=400",
        clearMark: (t) => t.type.name === this.name
      },
      {
        style: "font-weight",
        getAttrs: (t) => /^(bold(er)?|[5-9]\d{2,})$/.test(t) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return /* @__PURE__ */ _i("strong", { ...Q(this.options.HTMLAttributes, t), children: /* @__PURE__ */ _i("slot", {}) });
  },
  markdownTokenName: "strong",
  parseMarkdown: (t, e) => e.applyMark("bold", e.parseInline(t.tokens || [])),
  renderMarkdown: (t, e) => `**${e.renderChildren(t)}**`,
  addCommands() {
    return {
      setBold: () => ({ commands: t }) => t.setMark(this.name),
      toggleBold: () => ({ commands: t }) => t.toggleMark(this.name),
      unsetBold: () => ({ commands: t }) => t.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      Or({
        find: lx,
        type: this.type
      }),
      Or({
        find: cx,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Fn({
        find: ax,
        type: this.type
      }),
      Fn({
        find: ux,
        type: this.type
      })
    ];
  }
}), fx = dx, hx = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, px = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, mx = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, gx = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, yx = en.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (t) => t.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=normal",
        clearMark: (t) => t.type.name === this.name
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["em", Q(this.options.HTMLAttributes, t), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: t }) => t.setMark(this.name),
      toggleItalic: () => ({ commands: t }) => t.toggleMark(this.name),
      unsetItalic: () => ({ commands: t }) => t.unsetMark(this.name)
    };
  },
  markdownTokenName: "em",
  parseMarkdown: (t, e) => e.applyMark("italic", e.parseInline(t.tokens || [])),
  renderMarkdown: (t, e) => `*${e.renderChildren(t)}*`,
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      Or({
        find: hx,
        type: this.type
      }),
      Or({
        find: mx,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Fn({
        find: px,
        type: this.type
      }),
      Fn({
        find: gx,
        type: this.type
      })
    ];
  }
}), bx = yx, wx = en.create({
  name: "underline",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "u"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (t) => t.includes("underline") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["u", Q(this.options.HTMLAttributes, t), 0];
  },
  parseMarkdown(t, e) {
    return e.applyMark(this.name || "underline", e.parseInline(t.tokens || []));
  },
  renderMarkdown(t, e) {
    return `++${e.renderChildren(t)}++`;
  },
  markdownTokenizer: {
    name: "underline",
    level: "inline",
    start(t) {
      return t.indexOf("++");
    },
    tokenize(t, e, n) {
      const i = /^(\+\+)([\s\S]+?)(\+\+)/.exec(t);
      if (!i)
        return;
      const s = i[2].trim();
      return {
        type: "underline",
        raw: i[0],
        text: s,
        tokens: n.inlineTokens(s)
      };
    }
  },
  addCommands() {
    return {
      setUnderline: () => ({ commands: t }) => t.setMark(this.name),
      toggleUnderline: () => ({ commands: t }) => t.toggleMark(this.name),
      unsetUnderline: () => ({ commands: t }) => t.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-u": () => this.editor.commands.toggleUnderline(),
      "Mod-U": () => this.editor.commands.toggleUnderline()
    };
  }
}), kx = wx, xx = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, Sx = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, vx = en.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (t) => t.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["s", Q(this.options.HTMLAttributes, t), 0];
  },
  markdownTokenName: "del",
  parseMarkdown: (t, e) => e.applyMark("strike", e.parseInline(t.tokens || [])),
  renderMarkdown: (t, e) => `~~${e.renderChildren(t)}~~`,
  addCommands() {
    return {
      setStrike: () => ({ commands: t }) => t.setMark(this.name),
      toggleStrike: () => ({ commands: t }) => t.toggleMark(this.name),
      unsetStrike: () => ({ commands: t }) => t.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-s": () => this.editor.commands.toggleStrike()
    };
  },
  addInputRules() {
    return [
      Or({
        find: xx,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Fn({
        find: Sx,
        type: this.type
      })
    ];
  }
}), Cx = vx, Mx = Object.defineProperty, Tx = (t, e) => {
  for (var n in e)
    Mx(t, n, { get: e[n], enumerable: !0 });
}, Ex = "listItem", Zc = "textStyle", eu = /^\s*([-+*])\s$/, Ih = De.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [{ tag: "ul" }];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["ul", Q(this.options.HTMLAttributes, t), 0];
  },
  markdownTokenName: "list",
  parseMarkdown: (t, e) => t.type !== "list" || t.ordered ? [] : {
    type: "bulletList",
    content: t.items ? e.parseChildren(t.items) : []
  },
  renderMarkdown: (t, e) => t.content ? e.renderChildren(t.content, `
`) : "",
  markdownOptions: {
    indentsContent: !0
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: t, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(Ex, this.editor.getAttributes(Zc)).run() : t.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let t = _n({
      find: eu,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (t = _n({
      find: eu,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(Zc),
      editor: this.editor
    })), [t];
  }
}), tr = De.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["li", Q(this.options.HTMLAttributes, t), 0];
  },
  markdownTokenName: "list_item",
  parseMarkdown: (t, e) => {
    if (t.type !== "list_item")
      return [];
    let n = [];
    if (t.tokens && t.tokens.length > 0)
      if (t.tokens.some((i) => i.type === "paragraph"))
        n = e.parseChildren(t.tokens);
      else {
        const i = t.tokens[0];
        if (i && i.type === "text" && i.tokens && i.tokens.length > 0) {
          if (n = [
            {
              type: "paragraph",
              content: e.parseInline(i.tokens)
            }
          ], t.tokens.length > 1) {
            const o = t.tokens.slice(1), l = e.parseChildren(o);
            n.push(...l);
          }
        } else
          n = e.parseChildren(t.tokens);
      }
    return n.length === 0 && (n = [
      {
        type: "paragraph",
        content: []
      }
    ]), {
      type: "listItem",
      content: n
    };
  },
  renderMarkdown: (t, e, n) => Zl(
    t,
    e,
    (r) => r.parentType === "bulletList" ? "- " : r.parentType === "orderedList" ? `${r.index + 1}. ` : "- ",
    n
  ),
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), Ax = {};
Tx(Ax, {
  findListItemPos: () => _r,
  getNextListDepth: () => aa,
  handleBackspace: () => Yo,
  handleDelete: () => Xo,
  hasListBefore: () => Rh,
  hasListItemAfter: () => Ox,
  hasListItemBefore: () => Dh,
  listItemHasSubList: () => Ph,
  nextListIsDeeper: () => Lh,
  nextListIsHigher: () => Bh
});
var _r = (t, e) => {
  const { $from: n } = e.selection, r = ee(t, e.schema);
  let i = null, s = n.depth, o = n.pos, l = null;
  for (; s > 0 && l === null; )
    i = n.node(s), i.type === r ? l = s : (s -= 1, o -= 1);
  return l === null ? null : { $pos: e.doc.resolve(o), depth: l };
}, aa = (t, e) => {
  const n = _r(t, e);
  if (!n)
    return !1;
  const [, r] = Ob(e, t, n.$pos.pos + 4);
  return r;
}, Rh = (t, e, n) => {
  const { $anchor: r } = t.selection, i = Math.max(0, r.pos - 2), s = t.doc.resolve(i).node();
  return !(!s || !n.includes(s.type.name));
}, Dh = (t, e) => {
  var n;
  const { $anchor: r } = e.selection, i = e.doc.resolve(r.pos - 2);
  return !(i.index() === 0 || ((n = i.nodeBefore) == null ? void 0 : n.type.name) !== t);
}, Ph = (t, e, n) => {
  if (!n)
    return !1;
  const r = ee(t, e.schema);
  let i = !1;
  return n.descendants((s) => {
    s.type === r && (i = !0);
  }), i;
}, Yo = (t, e, n) => {
  if (t.commands.undoInputRule())
    return !0;
  if (t.state.selection.from !== t.state.selection.to)
    return !1;
  if (!Yt(t.state, e) && Rh(t.state, e, n)) {
    const { $anchor: l } = t.state.selection, a = t.state.doc.resolve(l.before() - 1), c = [];
    a.node().descendants((f, h) => {
      f.type.name === e && c.push({ node: f, pos: h });
    });
    const u = c.at(-1);
    if (!u)
      return !1;
    const d = t.state.doc.resolve(a.start() + u.pos + 1);
    return t.chain().cut({ from: l.start() - 1, to: l.end() + 1 }, d.end()).joinForward().run();
  }
  if (!Yt(t.state, e) || !Db(t.state))
    return !1;
  const r = _r(e, t.state);
  if (!r)
    return !1;
  const s = t.state.doc.resolve(r.$pos.pos - 2).node(r.depth), o = Ph(e, t.state, s);
  return Dh(e, t.state) && !o ? t.commands.joinItemBackward() : t.chain().liftListItem(e).run();
}, Lh = (t, e) => {
  const n = aa(t, e), r = _r(t, e);
  return !r || !n ? !1 : n > r.depth;
}, Bh = (t, e) => {
  const n = aa(t, e), r = _r(t, e);
  return !r || !n ? !1 : n < r.depth;
}, Xo = (t, e) => {
  if (!Yt(t.state, e) || !Rb(t.state, e))
    return !1;
  const { selection: n } = t.state, { $from: r, $to: i } = n;
  return !n.empty && r.sameParent(i) ? !1 : Lh(e, t.state) ? t.chain().focus(t.state.selection.from + 4).lift(e).joinBackward().run() : Bh(e, t.state) ? t.chain().joinForward().joinBackward().run() : t.commands.joinItemForward();
}, Ox = (t, e) => {
  var n;
  const { $anchor: r } = e.selection, i = e.doc.resolve(r.pos - r.parentOffset - 2);
  return !(i.index() === i.parent.childCount - 1 || ((n = i.nodeAfter) == null ? void 0 : n.type.name) !== t);
}, Qo = Y.create({
  name: "listKeymap",
  addOptions() {
    return {
      listTypes: [
        {
          itemName: "listItem",
          wrapperNames: ["bulletList", "orderedList"]
        },
        {
          itemName: "taskItem",
          wrapperNames: ["taskList"]
        }
      ]
    };
  },
  addKeyboardShortcuts() {
    return {
      Delete: ({ editor: t }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: n }) => {
          t.state.schema.nodes[n] !== void 0 && Xo(t, n) && (e = !0);
        }), e;
      },
      "Mod-Delete": ({ editor: t }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: n }) => {
          t.state.schema.nodes[n] !== void 0 && Xo(t, n) && (e = !0);
        }), e;
      },
      Backspace: ({ editor: t }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
          t.state.schema.nodes[n] !== void 0 && Yo(t, n, r) && (e = !0);
        }), e;
      },
      "Mod-Backspace": ({ editor: t }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
          t.state.schema.nodes[n] !== void 0 && Yo(t, n, r) && (e = !0);
        }), e;
      }
    };
  }
}), tu = /^(\s*)(\d+)\.\s+(.*)$/, Nx = /^\s/;
function Ix(t) {
  const e = [];
  let n = 0, r = 0;
  for (; n < t.length; ) {
    const i = t[n], s = i.match(tu);
    if (!s)
      break;
    const [, o, l, a] = s, c = o.length;
    let u = a, d = n + 1;
    const f = [i];
    for (; d < t.length; ) {
      const h = t[d];
      if (h.match(tu))
        break;
      if (h.trim() === "")
        f.push(h), u += `
`, d += 1;
      else if (h.match(Nx))
        f.push(h), u += `
${h.slice(c + 2)}`, d += 1;
      else
        break;
    }
    e.push({
      indent: c,
      number: parseInt(l, 10),
      content: u.trim(),
      raw: f.join(`
`)
    }), r = d, n = d;
  }
  return [e, r];
}
function zh(t, e, n) {
  var r;
  const i = [];
  let s = 0;
  for (; s < t.length; ) {
    const o = t[s];
    if (o.indent === e) {
      const l = o.content.split(`
`), a = ((r = l[0]) == null ? void 0 : r.trim()) || "", c = [];
      a && c.push({
        type: "paragraph",
        raw: a,
        tokens: n.inlineTokens(a)
      });
      const u = l.slice(1).join(`
`).trim();
      if (u) {
        const h = n.blockTokens(u);
        c.push(...h);
      }
      let d = s + 1;
      const f = [];
      for (; d < t.length && t[d].indent > e; )
        f.push(t[d]), d += 1;
      if (f.length > 0) {
        const h = Math.min(...f.map((m) => m.indent)), p = zh(f, h, n);
        c.push({
          type: "list",
          ordered: !0,
          start: f[0].number,
          items: p,
          raw: f.map((m) => m.raw).join(`
`)
        });
      }
      i.push({
        type: "list_item",
        raw: o.raw,
        tokens: c
      }), s = d;
    } else
      s += 1;
  }
  return i;
}
function Rx(t, e) {
  return t.map((n) => {
    if (n.type !== "list_item")
      return e.parseChildren([n])[0];
    const r = [];
    return n.tokens && n.tokens.length > 0 && n.tokens.forEach((i) => {
      if (i.type === "paragraph" || i.type === "list" || i.type === "blockquote" || i.type === "code")
        r.push(...e.parseChildren([i]));
      else if (i.type === "text" && i.tokens) {
        const s = e.parseChildren([i]);
        r.push({
          type: "paragraph",
          content: s
        });
      } else {
        const s = e.parseChildren([i]);
        s.length > 0 && r.push(...s);
      }
    }), {
      type: "listItem",
      content: r
    };
  });
}
var Dx = "listItem", nu = "textStyle", ru = /^(\d+)\.\s$/, $h = De.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (t) => t.hasAttribute("start") ? parseInt(t.getAttribute("start") || "", 10) : 1
      },
      type: {
        default: null,
        parseHTML: (t) => t.getAttribute("type")
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    const { start: e, ...n } = t;
    return e === 1 ? ["ol", Q(this.options.HTMLAttributes, n), 0] : ["ol", Q(this.options.HTMLAttributes, t), 0];
  },
  markdownTokenName: "list",
  parseMarkdown: (t, e) => {
    if (t.type !== "list" || !t.ordered)
      return [];
    const n = t.start || 1, r = t.items ? Rx(t.items, e) : [];
    return n !== 1 ? {
      type: "orderedList",
      attrs: { start: n },
      content: r
    } : {
      type: "orderedList",
      content: r
    };
  },
  renderMarkdown: (t, e) => t.content ? e.renderChildren(t.content, `
`) : "",
  markdownTokenizer: {
    name: "orderedList",
    level: "block",
    start: (t) => {
      const e = t.match(/^(\s*)(\d+)\.\s+/), n = e == null ? void 0 : e.index;
      return n !== void 0 ? n : -1;
    },
    tokenize: (t, e, n) => {
      var r;
      const i = t.split(`
`), [s, o] = Ix(i);
      if (s.length === 0)
        return;
      const l = zh(s, 0, n);
      return l.length === 0 ? void 0 : {
        type: "list",
        ordered: !0,
        start: ((r = s[0]) == null ? void 0 : r.number) || 1,
        items: l,
        raw: i.slice(0, o).join(`
`)
      };
    }
  },
  markdownOptions: {
    indentsContent: !0
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: t, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(Dx, this.editor.getAttributes(nu)).run() : t.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let t = _n({
      find: ru,
      type: this.type,
      getAttributes: (e) => ({ start: +e[1] }),
      joinPredicate: (e, n) => n.childCount + n.attrs.start === +e[1]
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (t = _n({
      find: ru,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (e) => ({ start: +e[1], ...this.editor.getAttributes(nu) }),
      joinPredicate: (e, n) => n.childCount + n.attrs.start === +e[1],
      editor: this.editor
    })), [t];
  }
}), Px = /^\s*(\[([( |x])?\])\s$/, Lx = De.create({
  name: "taskItem",
  addOptions() {
    return {
      nested: !1,
      HTMLAttributes: {},
      taskListTypeName: "taskList",
      a11y: void 0
    };
  },
  content() {
    return this.options.nested ? "paragraph block*" : "paragraph+";
  },
  defining: !0,
  addAttributes() {
    return {
      checked: {
        default: !1,
        keepOnSplit: !1,
        parseHTML: (t) => {
          const e = t.getAttribute("data-checked");
          return e === "" || e === "true";
        },
        renderHTML: (t) => ({
          "data-checked": t.checked
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `li[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ node: t, HTMLAttributes: e }) {
    return [
      "li",
      Q(this.options.HTMLAttributes, e, {
        "data-type": this.name
      }),
      [
        "label",
        [
          "input",
          {
            type: "checkbox",
            checked: t.attrs.checked ? "checked" : null
          }
        ],
        ["span"]
      ],
      ["div", 0]
    ];
  },
  parseMarkdown: (t, e) => {
    const n = [];
    if (t.tokens && t.tokens.length > 0 ? n.push(e.createNode("paragraph", {}, e.parseInline(t.tokens))) : t.text ? n.push(e.createNode("paragraph", {}, [e.createNode("text", { text: t.text })])) : n.push(e.createNode("paragraph", {}, [])), t.nestedTokens && t.nestedTokens.length > 0) {
      const r = e.parseChildren(t.nestedTokens);
      n.push(...r);
    }
    return e.createNode("taskItem", { checked: t.checked || !1 }, n);
  },
  renderMarkdown: (t, e) => {
    var n;
    const i = `- [${(n = t.attrs) != null && n.checked ? "x" : " "}] `;
    return Zl(t, e, i);
  },
  addKeyboardShortcuts() {
    const t = {
      Enter: () => this.editor.commands.splitListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
    return this.options.nested ? {
      ...t,
      Tab: () => this.editor.commands.sinkListItem(this.name)
    } : t;
  },
  addNodeView() {
    return ({ node: t, HTMLAttributes: e, getPos: n, editor: r }) => {
      const i = document.createElement("li"), s = document.createElement("label"), o = document.createElement("span"), l = document.createElement("input"), a = document.createElement("div"), c = (u) => {
        var d, f;
        l.ariaLabel = ((f = (d = this.options.a11y) == null ? void 0 : d.checkboxLabel) == null ? void 0 : f.call(d, u, l.checked)) || `Task item checkbox for ${u.textContent || "empty task item"}`;
      };
      return c(t), s.contentEditable = "false", l.type = "checkbox", l.addEventListener("mousedown", (u) => u.preventDefault()), l.addEventListener("change", (u) => {
        if (!r.isEditable && !this.options.onReadOnlyChecked) {
          l.checked = !l.checked;
          return;
        }
        const { checked: d } = u.target;
        r.isEditable && typeof n == "function" && r.chain().focus(void 0, { scrollIntoView: !1 }).command(({ tr: f }) => {
          const h = n();
          if (typeof h != "number")
            return !1;
          const p = f.doc.nodeAt(h);
          return f.setNodeMarkup(h, void 0, {
            ...p == null ? void 0 : p.attrs,
            checked: d
          }), !0;
        }).run(), !r.isEditable && this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(t, d) || (l.checked = !l.checked));
      }), Object.entries(this.options.HTMLAttributes).forEach(([u, d]) => {
        i.setAttribute(u, d);
      }), i.dataset.checked = t.attrs.checked, l.checked = t.attrs.checked, s.append(l, o), i.append(s, a), Object.entries(e).forEach(([u, d]) => {
        i.setAttribute(u, d);
      }), {
        dom: i,
        contentDOM: a,
        update: (u) => u.type !== this.type ? !1 : (i.dataset.checked = u.attrs.checked, l.checked = u.attrs.checked, c(u), !0)
      };
    };
  },
  addInputRules() {
    return [
      _n({
        find: Px,
        type: this.type,
        getAttributes: (t) => ({
          checked: t[t.length - 1] === "x"
        })
      })
    ];
  }
}), Bx = De.create({
  name: "taskList",
  addOptions() {
    return {
      itemTypeName: "taskItem",
      HTMLAttributes: {}
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      {
        tag: `ul[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["ul", Q(this.options.HTMLAttributes, t, { "data-type": this.name }), 0];
  },
  parseMarkdown: (t, e) => e.createNode("taskList", {}, e.parseChildren(t.items || [])),
  renderMarkdown: (t, e) => t.content ? e.renderChildren(t.content, `
`) : "",
  markdownTokenizer: {
    name: "taskList",
    level: "block",
    start(t) {
      var e;
      const n = (e = t.match(/^\s*[-+*]\s+\[([ xX])\]\s+/)) == null ? void 0 : e.index;
      return n !== void 0 ? n : -1;
    },
    tokenize(t, e, n) {
      const r = (s) => {
        const o = Wo(
          s,
          {
            itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
            extractItemData: (l) => ({
              indentLevel: l[1].length,
              mainContent: l[4],
              checked: l[3].toLowerCase() === "x"
            }),
            createToken: (l, a) => ({
              type: "taskItem",
              raw: "",
              mainContent: l.mainContent,
              indentLevel: l.indentLevel,
              checked: l.checked,
              text: l.mainContent,
              tokens: n.inlineTokens(l.mainContent),
              nestedTokens: a
            }),
            // Allow recursive nesting
            customNestedParser: r
          },
          n
        );
        return o ? [
          {
            type: "taskList",
            raw: o.raw,
            items: o.items
          }
        ] : n.blockTokens(s);
      }, i = Wo(
        t,
        {
          itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
          extractItemData: (s) => ({
            indentLevel: s[1].length,
            mainContent: s[4],
            checked: s[3].toLowerCase() === "x"
          }),
          createToken: (s, o) => ({
            type: "taskItem",
            raw: "",
            mainContent: s.mainContent,
            indentLevel: s.indentLevel,
            checked: s.checked,
            text: s.mainContent,
            tokens: n.inlineTokens(s.mainContent),
            nestedTokens: o
          }),
          // Use the recursive parser for nested content
          customNestedParser: r
        },
        n
      );
      if (i)
        return {
          type: "taskList",
          raw: i.raw,
          items: i.items
        };
    }
  },
  markdownOptions: {
    indentsContent: !0
  },
  addCommands() {
    return {
      toggleTaskList: () => ({ commands: t }) => t.toggleList(this.name, this.options.itemTypeName)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-9": () => this.editor.commands.toggleTaskList()
    };
  }
});
Y.create({
  name: "listKit",
  addExtensions() {
    const t = [];
    return this.options.bulletList !== !1 && t.push(Ih.configure(this.options.bulletList)), this.options.listItem !== !1 && t.push(tr.configure(this.options.listItem)), this.options.listKeymap !== !1 && t.push(Qo.configure(this.options.listKeymap)), this.options.orderedList !== !1 && t.push($h.configure(this.options.orderedList)), this.options.taskItem !== !1 && t.push(Lx.configure(this.options.taskItem)), this.options.taskList !== !1 && t.push(Bx.configure(this.options.taskList)), t;
  }
});
var zx = De.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: !1
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((t) => ({
      tag: `h${t}`,
      attrs: { level: t }
    }));
  },
  renderHTML({ node: t, HTMLAttributes: e }) {
    return [`h${this.options.levels.includes(t.attrs.level) ? t.attrs.level : this.options.levels[0]}`, Q(this.options.HTMLAttributes, e), 0];
  },
  parseMarkdown: (t, e) => e.createNode("heading", { level: t.depth || 1 }, e.parseInline(t.tokens || [])),
  renderMarkdown: (t, e) => {
    var n;
    const r = (n = t.attrs) != null && n.level ? parseInt(t.attrs.level, 10) : 1, i = "#".repeat(r);
    return t.content ? `${i} ${e.renderChildren(t.content)}` : "";
  },
  addCommands() {
    return {
      setHeading: (t) => ({ commands: e }) => this.options.levels.includes(t.level) ? e.setNode(this.name, t) : !1,
      toggleHeading: (t) => ({ commands: e }) => this.options.levels.includes(t.level) ? e.toggleNode(this.name, "paragraph", t) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce(
      (t, e) => ({
        ...t,
        [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({ level: e })
      }),
      {}
    );
  },
  addInputRules() {
    return this.options.levels.map((t) => mw({
      find: new RegExp(`^(#{${Math.min(...this.options.levels)},${t}})\\s$`),
      type: this.type,
      getAttributes: {
        level: t
      }
    }));
  }
}), vn = zx, $x = /^\s*>\s$/, _x = De.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  parseHTML() {
    return [{ tag: "blockquote" }];
  },
  renderHTML({ HTMLAttributes: t }) {
    return /* @__PURE__ */ _i("blockquote", { ...Q(this.options.HTMLAttributes, t), children: /* @__PURE__ */ _i("slot", {}) });
  },
  parseMarkdown: (t, e) => e.createNode("blockquote", void 0, e.parseChildren(t.tokens || [])),
  renderMarkdown: (t, e) => {
    if (!t.content)
      return "";
    const n = [];
    return t.content.forEach((i) => {
      const o = e.renderChildren(i).split(`
`).map((l) => `> ${l}`).join(`
`);
      n.push(o);
    }), n.flatMap((i) => [i, "> "]).slice(0, -1).join(`
`);
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands: t }) => t.wrapIn(this.name),
      toggleBlockquote: () => ({ commands: t }) => t.toggleWrap(this.name),
      unsetBlockquote: () => ({ commands: t }) => t.lift(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      _n({
        find: $x,
        type: this.type
      })
    ];
  }
}), Fx = _x, Hx = De.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {},
      nextNodeType: "paragraph"
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["hr", Q(this.options.HTMLAttributes, t)];
  },
  markdownTokenName: "hr",
  parseMarkdown: (t, e) => e.createNode("horizontalRule"),
  renderMarkdown: () => "---",
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain: t, state: e }) => {
        if (!gw(e, e.schema.nodes[this.name]))
          return !1;
        const { selection: n } = e, { $to: r } = n, i = t();
        return Lf(n) ? i.insertContentAt(r.pos, {
          type: this.name
        }) : i.insertContent({ type: this.name }), i.command(({ state: s, tr: o, dispatch: l }) => {
          if (l) {
            const { $to: a } = o.selection, c = a.end();
            if (a.nodeAfter)
              a.nodeAfter.isTextblock ? o.setSelection(D.create(o.doc, a.pos + 1)) : a.nodeAfter.isBlock ? o.setSelection(O.create(o.doc, a.pos)) : o.setSelection(D.create(o.doc, a.pos));
            else {
              const u = s.schema.nodes[this.options.nextNodeType] || a.parent.type.contentMatch.defaultType, d = u == null ? void 0 : u.create();
              d && (o.insert(c, d), o.setSelection(D.create(o.doc, c + 1)));
            }
            o.scrollIntoView();
          }
          return !0;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      pw({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
}), Vx = Hx, jx = Y.create({
  name: "textAlign",
  addOptions() {
    return {
      types: [],
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: null
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: (t) => {
              const e = t.style.textAlign;
              return this.options.alignments.includes(e) ? e : this.options.defaultAlignment;
            },
            renderHTML: (t) => t.textAlign ? { style: `text-align: ${t.textAlign}` } : {}
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setTextAlign: (t) => ({ commands: e }) => this.options.alignments.includes(t) ? this.options.types.map((n) => e.updateAttributes(n, { textAlign: t })).every((n) => n) : !1,
      unsetTextAlign: () => ({ commands: t }) => this.options.types.map((e) => t.resetAttributes(e, "textAlign")).every((e) => e),
      toggleTextAlign: (t) => ({ editor: e, commands: n }) => this.options.alignments.includes(t) ? e.isActive({ textAlign: t }) ? n.unsetTextAlign() : n.setTextAlign(t) : !1
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-l": () => this.editor.commands.setTextAlign("left"),
      "Mod-Shift-e": () => this.editor.commands.setTextAlign("center"),
      "Mod-Shift-r": () => this.editor.commands.setTextAlign("right"),
      "Mod-Shift-j": () => this.editor.commands.setTextAlign("justify")
    };
  }
});
const Ux = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", Wx = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", Zo = "numeric", el = "ascii", tl = "alpha", ur = "asciinumeric", nr = "alphanumeric", nl = "domain", _h = "emoji", Kx = "scheme", qx = "slashscheme", co = "whitespace";
function Jx(t, e) {
  return t in e || (e[t] = []), e[t];
}
function an(t, e, n) {
  e[Zo] && (e[ur] = !0, e[nr] = !0), e[el] && (e[ur] = !0, e[tl] = !0), e[ur] && (e[nr] = !0), e[tl] && (e[nr] = !0), e[nr] && (e[nl] = !0), e[_h] && (e[nl] = !0);
  for (const r in e) {
    const i = Jx(r, n);
    i.indexOf(t) < 0 && i.push(t);
  }
}
function Gx(t, e) {
  const n = {};
  for (const r in e)
    e[r].indexOf(t) >= 0 && (n[r] = !0);
  return n;
}
function ve(t = null) {
  this.j = {}, this.jr = [], this.jd = null, this.t = t;
}
ve.groups = {};
ve.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(t) {
    const e = this, n = e.j[t];
    if (n)
      return n;
    for (let r = 0; r < e.jr.length; r++) {
      const i = e.jr[r][0], s = e.jr[r][1];
      if (s && i.test(t))
        return s;
    }
    return e.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(t, e = !1) {
    return e ? t in this.j : !!this.go(t);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(t, e, n, r) {
    for (let i = 0; i < t.length; i++)
      this.tt(t[i], e, n, r);
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(t, e, n, r) {
    r = r || ve.groups;
    let i;
    return e && e.j ? i = e : (i = new ve(e), n && r && an(e, n, r)), this.jr.push([t, i]), i;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(t, e, n, r) {
    let i = this;
    const s = t.length;
    if (!s)
      return i;
    for (let o = 0; o < s - 1; o++)
      i = i.tt(t[o]);
    return i.tt(t[s - 1], e, n, r);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(t, e, n, r) {
    r = r || ve.groups;
    const i = this;
    if (e && e.j)
      return i.j[t] = e, e;
    const s = e;
    let o, l = i.go(t);
    if (l ? (o = new ve(), Object.assign(o.j, l.j), o.jr.push.apply(o.jr, l.jr), o.jd = l.jd, o.t = l.t) : o = new ve(), s) {
      if (r)
        if (o.t && typeof o.t == "string") {
          const a = Object.assign(Gx(o.t, r), n);
          an(s, a, r);
        } else n && an(s, n, r);
      o.t = s;
    }
    return i.j[t] = o, o;
  }
};
const P = (t, e, n, r, i) => t.ta(e, n, r, i), q = (t, e, n, r, i) => t.tr(e, n, r, i), iu = (t, e, n, r, i) => t.ts(e, n, r, i), S = (t, e, n, r, i) => t.tt(e, n, r, i), gt = "WORD", rl = "UWORD", Fh = "ASCIINUMERICAL", Hh = "ALPHANUMERICAL", Ir = "LOCALHOST", il = "TLD", sl = "UTLD", fi = "SCHEME", An = "SLASH_SCHEME", ca = "NUM", ol = "WS", ua = "NL", dr = "OPENBRACE", fr = "CLOSEBRACE", Fi = "OPENBRACKET", Hi = "CLOSEBRACKET", Vi = "OPENPAREN", ji = "CLOSEPAREN", Ui = "OPENANGLEBRACKET", Wi = "CLOSEANGLEBRACKET", Ki = "FULLWIDTHLEFTPAREN", qi = "FULLWIDTHRIGHTPAREN", Ji = "LEFTCORNERBRACKET", Gi = "RIGHTCORNERBRACKET", Yi = "LEFTWHITECORNERBRACKET", Xi = "RIGHTWHITECORNERBRACKET", Qi = "FULLWIDTHLESSTHAN", Zi = "FULLWIDTHGREATERTHAN", es = "AMPERSAND", ts = "APOSTROPHE", ns = "ASTERISK", Pt = "AT", rs = "BACKSLASH", is = "BACKTICK", ss = "CARET", zt = "COLON", da = "COMMA", ls = "DOLLAR", et = "DOT", as = "EQUALS", fa = "EXCLAMATION", Le = "HYPHEN", hr = "PERCENT", cs = "PIPE", us = "PLUS", ds = "POUND", pr = "QUERY", ha = "QUOTE", Vh = "FULLWIDTHMIDDLEDOT", pa = "SEMI", tt = "SLASH", mr = "TILDE", fs = "UNDERSCORE", jh = "EMOJI", hs = "SYM";
var Uh = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ALPHANUMERICAL: Hh,
  AMPERSAND: es,
  APOSTROPHE: ts,
  ASCIINUMERICAL: Fh,
  ASTERISK: ns,
  AT: Pt,
  BACKSLASH: rs,
  BACKTICK: is,
  CARET: ss,
  CLOSEANGLEBRACKET: Wi,
  CLOSEBRACE: fr,
  CLOSEBRACKET: Hi,
  CLOSEPAREN: ji,
  COLON: zt,
  COMMA: da,
  DOLLAR: ls,
  DOT: et,
  EMOJI: jh,
  EQUALS: as,
  EXCLAMATION: fa,
  FULLWIDTHGREATERTHAN: Zi,
  FULLWIDTHLEFTPAREN: Ki,
  FULLWIDTHLESSTHAN: Qi,
  FULLWIDTHMIDDLEDOT: Vh,
  FULLWIDTHRIGHTPAREN: qi,
  HYPHEN: Le,
  LEFTCORNERBRACKET: Ji,
  LEFTWHITECORNERBRACKET: Yi,
  LOCALHOST: Ir,
  NL: ua,
  NUM: ca,
  OPENANGLEBRACKET: Ui,
  OPENBRACE: dr,
  OPENBRACKET: Fi,
  OPENPAREN: Vi,
  PERCENT: hr,
  PIPE: cs,
  PLUS: us,
  POUND: ds,
  QUERY: pr,
  QUOTE: ha,
  RIGHTCORNERBRACKET: Gi,
  RIGHTWHITECORNERBRACKET: Xi,
  SCHEME: fi,
  SEMI: pa,
  SLASH: tt,
  SLASH_SCHEME: An,
  SYM: hs,
  TILDE: mr,
  TLD: il,
  UNDERSCORE: fs,
  UTLD: sl,
  UWORD: rl,
  WORD: gt,
  WS: ol
});
const ft = /[a-z]/, Yn = new RegExp("\\p{L}", "u"), uo = new RegExp("\\p{Emoji}", "u"), ht = /\d/, fo = /\s/, su = "\r", ho = `
`, Yx = "️", Xx = "‍", po = "￼";
let ti = null, ni = null;
function Qx(t = []) {
  const e = {};
  ve.groups = e;
  const n = new ve();
  ti == null && (ti = ou(Ux)), ni == null && (ni = ou(Wx)), S(n, "'", ts), S(n, "{", dr), S(n, "}", fr), S(n, "[", Fi), S(n, "]", Hi), S(n, "(", Vi), S(n, ")", ji), S(n, "<", Ui), S(n, ">", Wi), S(n, "（", Ki), S(n, "）", qi), S(n, "「", Ji), S(n, "」", Gi), S(n, "『", Yi), S(n, "』", Xi), S(n, "＜", Qi), S(n, "＞", Zi), S(n, "&", es), S(n, "*", ns), S(n, "@", Pt), S(n, "`", is), S(n, "^", ss), S(n, ":", zt), S(n, ",", da), S(n, "$", ls), S(n, ".", et), S(n, "=", as), S(n, "!", fa), S(n, "-", Le), S(n, "%", hr), S(n, "|", cs), S(n, "+", us), S(n, "#", ds), S(n, "?", pr), S(n, '"', ha), S(n, "/", tt), S(n, ";", pa), S(n, "~", mr), S(n, "_", fs), S(n, "\\", rs), S(n, "・", Vh);
  const r = q(n, ht, ca, {
    [Zo]: !0
  });
  q(r, ht, r);
  const i = q(r, ft, Fh, {
    [ur]: !0
  }), s = q(r, Yn, Hh, {
    [nr]: !0
  }), o = q(n, ft, gt, {
    [el]: !0
  });
  q(o, ht, i), q(o, ft, o), q(i, ht, i), q(i, ft, i);
  const l = q(n, Yn, rl, {
    [tl]: !0
  });
  q(l, ft), q(l, ht, s), q(l, Yn, l), q(s, ht, s), q(s, ft), q(s, Yn, s);
  const a = S(n, ho, ua, {
    [co]: !0
  }), c = S(n, su, ol, {
    [co]: !0
  }), u = q(n, fo, ol, {
    [co]: !0
  });
  S(n, po, u), S(c, ho, a), S(c, po, u), q(c, fo, u), S(u, su), S(u, ho), q(u, fo, u), S(u, po, u);
  const d = q(n, uo, jh, {
    [_h]: !0
  });
  S(d, "#"), q(d, uo, d), S(d, Yx, d);
  const f = S(d, Xx);
  S(f, "#"), q(f, uo, d);
  const h = [[ft, o], [ht, i]], p = [[ft, null], [Yn, l], [ht, s]];
  for (let m = 0; m < ti.length; m++)
    At(n, ti[m], il, gt, h);
  for (let m = 0; m < ni.length; m++)
    At(n, ni[m], sl, rl, p);
  an(il, {
    tld: !0,
    ascii: !0
  }, e), an(sl, {
    utld: !0,
    alpha: !0
  }, e), At(n, "file", fi, gt, h), At(n, "mailto", fi, gt, h), At(n, "http", An, gt, h), At(n, "https", An, gt, h), At(n, "ftp", An, gt, h), At(n, "ftps", An, gt, h), an(fi, {
    scheme: !0,
    ascii: !0
  }, e), an(An, {
    slashscheme: !0,
    ascii: !0
  }, e), t = t.sort((m, g) => m[0] > g[0] ? 1 : -1);
  for (let m = 0; m < t.length; m++) {
    const g = t[m][0], b = t[m][1] ? {
      [Kx]: !0
    } : {
      [qx]: !0
    };
    g.indexOf("-") >= 0 ? b[nl] = !0 : ft.test(g) ? ht.test(g) ? b[ur] = !0 : b[el] = !0 : b[Zo] = !0, iu(n, g, g, b);
  }
  return iu(n, "localhost", Ir, {
    ascii: !0
  }), n.jd = new ve(hs), {
    start: n,
    tokens: Object.assign({
      groups: e
    }, Uh)
  };
}
function Wh(t, e) {
  const n = Zx(e.replace(/[A-Z]/g, (l) => l.toLowerCase())), r = n.length, i = [];
  let s = 0, o = 0;
  for (; o < r; ) {
    let l = t, a = null, c = 0, u = null, d = -1, f = -1;
    for (; o < r && (a = l.go(n[o])); )
      l = a, l.accepts() ? (d = 0, f = 0, u = l) : d >= 0 && (d += n[o].length, f++), c += n[o].length, s += n[o].length, o++;
    s -= d, o -= f, c -= d, i.push({
      t: u.t,
      // token type/name
      v: e.slice(s - c, s),
      // string value
      s: s - c,
      // start index
      e: s
      // end index (excluding)
    });
  }
  return i;
}
function Zx(t) {
  const e = [], n = t.length;
  let r = 0;
  for (; r < n; ) {
    let i = t.charCodeAt(r), s, o = i < 55296 || i > 56319 || r + 1 === n || (s = t.charCodeAt(r + 1)) < 56320 || s > 57343 ? t[r] : t.slice(r, r + 2);
    e.push(o), r += o.length;
  }
  return e;
}
function At(t, e, n, r, i) {
  let s;
  const o = e.length;
  for (let l = 0; l < o - 1; l++) {
    const a = e[l];
    t.j[a] ? s = t.j[a] : (s = new ve(r), s.jr = i.slice(), t.j[a] = s), t = s;
  }
  return s = new ve(n), s.jr = i.slice(), t.j[e[o - 1]] = s, s;
}
function ou(t) {
  const e = [], n = [];
  let r = 0, i = "0123456789";
  for (; r < t.length; ) {
    let s = 0;
    for (; i.indexOf(t[r + s]) >= 0; )
      s++;
    if (s > 0) {
      e.push(n.join(""));
      for (let o = parseInt(t.substring(r, r + s), 10); o > 0; o--)
        n.pop();
      r += s;
    } else
      n.push(t[r]), r++;
  }
  return e;
}
const Rr = {
  defaultProtocol: "http",
  events: null,
  format: lu,
  formatHref: lu,
  nl2br: !1,
  tagName: "a",
  target: null,
  rel: null,
  validate: !0,
  truncate: 1 / 0,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function ma(t, e = null) {
  let n = Object.assign({}, Rr);
  t && (n = Object.assign(n, t instanceof ma ? t.o : t));
  const r = n.ignoreTags, i = [];
  for (let s = 0; s < r.length; s++)
    i.push(r[s].toUpperCase());
  this.o = n, e && (this.defaultRender = e), this.ignoreTags = i;
}
ma.prototype = {
  o: Rr,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(t) {
    return t;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(t) {
    return this.get("validate", t.toString(), t);
  },
  // Private methods
  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(t, e, n) {
    const r = e != null;
    let i = this.o[t];
    return i && (typeof i == "object" ? (i = n.t in i ? i[n.t] : Rr[t], typeof i == "function" && r && (i = i(e, n))) : typeof i == "function" && r && (i = i(e, n.t, n)), i);
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(t, e, n) {
    let r = this.o[t];
    return typeof r == "function" && e != null && (r = r(e, n.t, n)), r;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(t) {
    const e = t.render(this);
    return (this.get("render", null, t) || this.defaultRender)(e, t.t, t);
  }
};
function lu(t) {
  return t;
}
function Kh(t, e) {
  this.t = "token", this.v = t, this.tk = e;
}
Kh.prototype = {
  isLink: !1,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
   */
  toHref(t) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(t) {
    const e = this.toString(), n = t.get("truncate", e, this), r = t.get("format", e, this);
    return n && r.length > n ? r.substring(0, n) + "…" : r;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(t) {
    return t.get("formatHref", this.toHref(t.get("defaultProtocol")), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(t = Rr.defaultProtocol) {
    return {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(t),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(t) {
    return {
      type: this.t,
      value: this.toFormattedString(t),
      isLink: this.isLink,
      href: this.toFormattedHref(t),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(t) {
    return t.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(t) {
    const e = this, n = this.toHref(t.get("defaultProtocol")), r = t.get("formatHref", n, this), i = t.get("tagName", n, e), s = this.toFormattedString(t), o = {}, l = t.get("className", n, e), a = t.get("target", n, e), c = t.get("rel", n, e), u = t.getObj("attributes", n, e), d = t.getObj("events", n, e);
    return o.href = r, l && (o.class = l), a && (o.target = a), c && (o.rel = c), u && Object.assign(o, u), {
      tagName: i,
      attributes: o,
      content: s,
      eventListeners: d
    };
  }
};
function Bs(t, e) {
  class n extends Kh {
    constructor(i, s) {
      super(i, s), this.t = t;
    }
  }
  for (const r in e)
    n.prototype[r] = e[r];
  return n.t = t, n;
}
const au = Bs("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), cu = Bs("text"), e1 = Bs("nl"), ri = Bs("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(t = Rr.defaultProtocol) {
    return this.hasProtocol() ? this.v : `${t}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const t = this.tk;
    return t.length >= 2 && t[0].t !== Ir && t[1].t === zt;
  }
}), Pe = (t) => new ve(t);
function t1({
  groups: t
}) {
  const e = t.domain.concat([es, ns, Pt, rs, is, ss, ls, as, Le, ca, hr, cs, us, ds, tt, hs, mr, fs]), n = [ts, zt, da, et, fa, hr, pr, ha, pa, Ui, Wi, dr, fr, Hi, Fi, Vi, ji, Ki, qi, Ji, Gi, Yi, Xi, Qi, Zi], r = [es, ts, ns, rs, is, ss, ls, as, Le, dr, fr, hr, cs, us, ds, pr, tt, hs, mr, fs], i = Pe(), s = S(i, mr);
  P(s, r, s), P(s, t.domain, s);
  const o = Pe(), l = Pe(), a = Pe();
  P(i, t.domain, o), P(i, t.scheme, l), P(i, t.slashscheme, a), P(o, r, s), P(o, t.domain, o);
  const c = S(o, Pt);
  S(s, Pt, c), S(l, Pt, c), S(a, Pt, c);
  const u = S(s, et);
  P(u, r, s), P(u, t.domain, s);
  const d = Pe();
  P(c, t.domain, d), P(d, t.domain, d);
  const f = S(d, et);
  P(f, t.domain, d);
  const h = Pe(au);
  P(f, t.tld, h), P(f, t.utld, h), S(c, Ir, h);
  const p = S(d, Le);
  S(p, Le, p), P(p, t.domain, d), P(h, t.domain, d), S(h, et, f), S(h, Le, p);
  const m = S(h, zt);
  P(m, t.numeric, au);
  const g = S(o, Le), y = S(o, et);
  S(g, Le, g), P(g, t.domain, o), P(y, r, s), P(y, t.domain, o);
  const b = Pe(ri);
  P(y, t.tld, b), P(y, t.utld, b), P(b, t.domain, o), P(b, r, s), S(b, et, y), S(b, Le, g), S(b, Pt, c);
  const w = S(b, zt), C = Pe(ri);
  P(w, t.numeric, C);
  const k = Pe(ri), T = Pe();
  P(k, e, k), P(k, n, T), P(T, e, k), P(T, n, T), S(b, tt, k), S(C, tt, k);
  const v = S(l, zt), E = S(a, zt), R = S(E, tt), N = S(R, tt);
  P(l, t.domain, o), S(l, et, y), S(l, Le, g), P(a, t.domain, o), S(a, et, y), S(a, Le, g), P(v, t.domain, k), S(v, tt, k), S(v, pr, k), P(N, t.domain, k), P(N, e, k), S(N, tt, k);
  const H = [
    [dr, fr],
    // {}
    [Fi, Hi],
    // []
    [Vi, ji],
    // ()
    [Ui, Wi],
    // <>
    [Ki, qi],
    // （）
    [Ji, Gi],
    // 「」
    [Yi, Xi],
    // 『』
    [Qi, Zi]
    // ＜＞
  ];
  for (let U = 0; U < H.length; U++) {
    const [X, L] = H[U], _ = S(k, X);
    S(T, X, _), S(_, L, k);
    const te = Pe(ri);
    P(_, e, te);
    const ne = Pe();
    P(_, n), P(te, e, te), P(te, n, ne), P(ne, e, te), P(ne, n, ne), S(te, L, k), S(ne, L, k);
  }
  return S(i, Ir, b), S(i, ua, e1), {
    start: i,
    tokens: Uh
  };
}
function n1(t, e, n) {
  let r = n.length, i = 0, s = [], o = [];
  for (; i < r; ) {
    let l = t, a = null, c = null, u = 0, d = null, f = -1;
    for (; i < r && !(a = l.go(n[i].t)); )
      o.push(n[i++]);
    for (; i < r && (c = a || l.go(n[i].t)); )
      a = null, l = c, l.accepts() ? (f = 0, d = l) : f >= 0 && f++, i++, u++;
    if (f < 0)
      i -= u, i < r && (o.push(n[i]), i++);
    else {
      o.length > 0 && (s.push(mo(cu, e, o)), o = []), i -= f, u -= f;
      const h = d.t, p = n.slice(i - u, i);
      s.push(mo(h, e, p));
    }
  }
  return o.length > 0 && s.push(mo(cu, e, o)), s;
}
function mo(t, e, n) {
  const r = n[0].s, i = n[n.length - 1].e, s = e.slice(r, i);
  return new t(s, n);
}
const r1 = typeof console < "u" && console && console.warn || (() => {
}), i1 = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", j = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function s1() {
  return ve.groups = {}, j.scanner = null, j.parser = null, j.tokenQueue = [], j.pluginQueue = [], j.customSchemes = [], j.initialized = !1, j;
}
function uu(t, e = !1) {
  if (j.initialized && r1(`linkifyjs: already initialized - will not register custom scheme "${t}" ${i1}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(t))
    throw new Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);
  j.customSchemes.push([t, e]);
}
function o1() {
  j.scanner = Qx(j.customSchemes);
  for (let t = 0; t < j.tokenQueue.length; t++)
    j.tokenQueue[t][1]({
      scanner: j.scanner
    });
  j.parser = t1(j.scanner.tokens);
  for (let t = 0; t < j.pluginQueue.length; t++)
    j.pluginQueue[t][1]({
      scanner: j.scanner,
      parser: j.parser
    });
  return j.initialized = !0, j;
}
function ga(t) {
  return j.initialized || o1(), n1(j.parser.start, t, Wh(j.scanner.start, t));
}
ga.scan = Wh;
function qh(t, e = null, n = null) {
  if (e && typeof e == "object") {
    if (n)
      throw Error(`linkifyjs: Invalid link type ${e}; must be a string`);
    n = e, e = null;
  }
  const r = new ma(n), i = ga(t), s = [];
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    l.isLink && (!e || l.t === e) && r.check(l) && s.push(l.toFormattedObject(r));
  }
  return s;
}
var ya = "[\0-   ᠎ -\u2029 　]", l1 = new RegExp(ya), a1 = new RegExp(`${ya}$`), c1 = new RegExp(ya, "g");
function u1(t) {
  return t.length === 1 ? t[0].isLink : t.length === 3 && t[1].isLink ? ["()", "[]"].includes(t[0].value + t[2].value) : !1;
}
function d1(t) {
  return new K({
    key: new G("autolink"),
    appendTransaction: (e, n, r) => {
      const i = e.some((c) => c.docChanged) && !n.doc.eq(r.doc), s = e.some((c) => c.getMeta("preventAutolink"));
      if (!i || s)
        return;
      const { tr: o } = r, l = Ef(n.doc, [...e]);
      if (Pf(l).forEach(({ newRange: c }) => {
        const u = kb(r.doc, c, (h) => h.isTextblock);
        let d, f;
        if (u.length > 1)
          d = u[0], f = r.doc.textBetween(
            d.pos,
            d.pos + d.node.nodeSize,
            void 0,
            " "
          );
        else if (u.length) {
          const h = r.doc.textBetween(c.from, c.to, " ", " ");
          if (!a1.test(h))
            return;
          d = u[0], f = r.doc.textBetween(d.pos, c.to, void 0, " ");
        }
        if (d && f) {
          const h = f.split(l1).filter(Boolean);
          if (h.length <= 0)
            return !1;
          const p = h[h.length - 1], m = d.pos + f.lastIndexOf(p);
          if (!p)
            return !1;
          const g = ga(p).map((y) => y.toObject(t.defaultProtocol));
          if (!u1(g))
            return !1;
          g.filter((y) => y.isLink).map((y) => ({
            ...y,
            from: m + y.start + 1,
            to: m + y.end + 1
          })).filter((y) => r.schema.marks.code ? !r.doc.rangeHasMark(y.from, y.to, r.schema.marks.code) : !0).filter((y) => t.validate(y.value)).filter((y) => t.shouldAutoLink(y.value)).forEach((y) => {
            Gl(y.from, y.to, r.doc).some((b) => b.mark.type === t.type) || o.addMark(
              y.from,
              y.to,
              t.type.create({
                href: y.href
              })
            );
          });
        }
      }), !!o.steps.length)
        return o;
    }
  });
}
function f1(t) {
  return new K({
    key: new G("handleClickLink"),
    props: {
      handleClick: (e, n, r) => {
        var i, s;
        if (r.button !== 0 || !e.editable)
          return !1;
        let o = null;
        if (r.target instanceof HTMLAnchorElement)
          o = r.target;
        else {
          let u = r.target;
          const d = [];
          for (; u.nodeName !== "DIV"; )
            d.push(u), u = u.parentNode;
          o = d.find((f) => f.nodeName === "A");
        }
        if (!o)
          return !1;
        const l = Df(e.state, t.type.name), a = (i = o == null ? void 0 : o.href) != null ? i : l.href, c = (s = o == null ? void 0 : o.target) != null ? s : l.target;
        return t.enableClickSelection && t.editor.commands.extendMarkRange(t.type.name), o && a ? (window.open(a, c), !0) : !1;
      }
    }
  });
}
function h1(t) {
  return new K({
    key: new G("handlePasteLink"),
    props: {
      handlePaste: (e, n, r) => {
        const { shouldAutoLink: i } = t, { state: s } = e, { selection: o } = s, { empty: l } = o;
        if (l)
          return !1;
        let a = "";
        r.content.forEach((u) => {
          a += u.textContent;
        });
        const c = qh(a, { defaultProtocol: t.defaultProtocol }).find(
          (u) => u.isLink && u.value === a
        );
        return !a || !c || i !== void 0 && !i(c.href) ? !1 : t.editor.commands.setMark(t.type, {
          href: c.href
        });
      }
    }
  });
}
function tn(t, e) {
  const n = ["http", "https", "ftp", "ftps", "mailto", "tel", "callto", "sms", "cid", "xmpp"];
  return e && e.forEach((r) => {
    const i = typeof r == "string" ? r : r.scheme;
    i && n.push(i);
  }), !t || t.replace(c1, "").match(
    new RegExp(
      // eslint-disable-next-line no-useless-escape
      `^(?:(?:${n.join("|")}):|[^a-z]|[a-z0-9+.-]+(?:[^a-z+.-:]|$))`,
      "i"
    )
  );
}
var p1 = en.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: !1,
  exitable: !0,
  onCreate() {
    this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((t) => {
      if (typeof t == "string") {
        uu(t);
        return;
      }
      uu(t.scheme, t.optionalSlashes);
    });
  },
  onDestroy() {
    s1();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: !0,
      enableClickSelection: !1,
      linkOnPaste: !0,
      autolink: !0,
      protocols: [],
      defaultProtocol: "http",
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      isAllowedUri: (t, e) => !!tn(t, e.protocols),
      validate: (t) => !!t,
      shouldAutoLink: (t) => !!t
    };
  },
  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML(t) {
          return t.getAttribute("href");
        }
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      rel: {
        default: this.options.HTMLAttributes.rel
      },
      class: {
        default: this.options.HTMLAttributes.class
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "a[href]",
        getAttrs: (t) => {
          const e = t.getAttribute("href");
          return !e || !this.options.isAllowedUri(e, {
            defaultValidate: (n) => !!tn(n, this.options.protocols),
            protocols: this.options.protocols,
            defaultProtocol: this.options.defaultProtocol
          }) ? !1 : null;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return this.options.isAllowedUri(t.href, {
      defaultValidate: (e) => !!tn(e, this.options.protocols),
      protocols: this.options.protocols,
      defaultProtocol: this.options.defaultProtocol
    }) ? ["a", Q(this.options.HTMLAttributes, t), 0] : ["a", Q(this.options.HTMLAttributes, { ...t, href: "" }), 0];
  },
  markdownTokenName: "link",
  parseMarkdown: (t, e) => e.applyMark("link", e.parseInline(t.tokens || []), {
    href: t.href,
    title: t.title || null
  }),
  renderMarkdown: (t, e) => {
    var n;
    const r = ((n = t.attrs) == null ? void 0 : n.href) || "";
    return `[${e.renderChildren(t)}](${r})`;
  },
  addCommands() {
    return {
      setLink: (t) => ({ chain: e }) => {
        const { href: n } = t;
        return this.options.isAllowedUri(n, {
          defaultValidate: (r) => !!tn(r, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        }) ? e().setMark(this.name, t).setMeta("preventAutolink", !0).run() : !1;
      },
      toggleLink: (t) => ({ chain: e }) => {
        const { href: n } = t || {};
        return n && !this.options.isAllowedUri(n, {
          defaultValidate: (r) => !!tn(r, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        }) ? !1 : e().toggleMark(this.name, t, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run();
      },
      unsetLink: () => ({ chain: t }) => t().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
    };
  },
  addPasteRules() {
    return [
      Fn({
        find: (t) => {
          const e = [];
          if (t) {
            const { protocols: n, defaultProtocol: r } = this.options, i = qh(t).filter(
              (s) => s.isLink && this.options.isAllowedUri(s.value, {
                defaultValidate: (o) => !!tn(o, n),
                protocols: n,
                defaultProtocol: r
              })
            );
            i.length && i.forEach((s) => {
              this.options.shouldAutoLink(s.value) && e.push({
                text: s.value,
                data: {
                  href: s.href
                },
                index: s.start
              });
            });
          }
          return e;
        },
        type: this.type,
        getAttributes: (t) => {
          var e;
          return {
            href: (e = t.data) == null ? void 0 : e.href
          };
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const t = [], { protocols: e, defaultProtocol: n } = this.options;
    return this.options.autolink && t.push(
      d1({
        type: this.type,
        defaultProtocol: this.options.defaultProtocol,
        validate: (r) => this.options.isAllowedUri(r, {
          defaultValidate: (i) => !!tn(i, e),
          protocols: e,
          defaultProtocol: n
        }),
        shouldAutoLink: this.options.shouldAutoLink
      })
    ), this.options.openOnClick === !0 && t.push(
      f1({
        type: this.type,
        editor: this.editor,
        enableClickSelection: this.options.enableClickSelection
      })
    ), this.options.linkOnPaste && t.push(
      h1({
        editor: this.editor,
        defaultProtocol: this.options.defaultProtocol,
        type: this.type,
        shouldAutoLink: this.options.shouldAutoLink
      })
    ), t;
  }
}), m1 = en.create({
  name: "subscript",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "sub"
      },
      {
        style: "vertical-align",
        getAttrs(t) {
          return t !== "sub" ? !1 : null;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["sub", Q(this.options.HTMLAttributes, t), 0];
  },
  addCommands() {
    return {
      setSubscript: () => ({ commands: t }) => t.setMark(this.name),
      toggleSubscript: () => ({ commands: t }) => t.toggleMark(this.name),
      unsetSubscript: () => ({ commands: t }) => t.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-,": () => this.editor.commands.toggleSubscript()
    };
  }
}), g1 = m1, y1 = en.create({
  name: "superscript",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "sup"
      },
      {
        style: "vertical-align",
        getAttrs(t) {
          return t !== "super" ? !1 : null;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["sup", Q(this.options.HTMLAttributes, t), 0];
  },
  addCommands() {
    return {
      setSuperscript: () => ({ commands: t }) => t.setMark(this.name),
      toggleSuperscript: () => ({ commands: t }) => t.toggleMark(this.name),
      unsetSuperscript: () => ({ commands: t }) => t.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-.": () => this.editor.commands.toggleSuperscript()
    };
  }
}), b1 = y1;
const w1 = {
  key: 0,
  class: "v-wysiwyg"
}, k1 = { class: "toolbar" }, x1 = { class: "button-group" }, S1 = ["title", "aria-label"], v1 = ["data-replicated-value"], C1 = { class: "toolbar" }, M1 = ["aria-pressed", "disabled", "aria-disabled", "title", "aria-label", "onClick"], T1 = { class: "toolbar bubble" }, E1 = ["aria-pressed", "disabled", "aria-disabled", "title", "aria-label", "onClick"], A1 = {
  __name: "Wysiwyg",
  props: /* @__PURE__ */ Gp({
    toolbar: {
      type: Array,
      default: [["bold", "italic", "underline"], ["unordered", "ordered", "outdent", "indent"], [], ["undo", "redo"], ["viewsource"]]
    },
    bubbleToolbar: {
      type: Array,
      default: null
    },
    linkConfiguration: {
      type: Object,
      default: {}
    },
    autofocus: {
      type: Boolean,
      default: !1
    },
    maxHeight: {
      type: String,
      default: "50vh"
    }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    let e = pl(!1);
    const n = dm(t, "modelValue"), r = t, i = jx.configure({
      types: ["heading", "paragraph"]
    }), s = p1.configure({
      openOnClick: !1,
      ...r.linkConfiguration
    }), o = {
      bold: {
        class: "mdi mdi-format-bold",
        action: (f) => f.chain().focus().toggleBold().run(),
        active: (f) => f.isActive("bold"),
        extensions: [fx]
      },
      italic: {
        class: "mdi mdi-format-italic",
        action: (f) => f.chain().focus().toggleItalic().run(),
        active: (f) => f.isActive("italic"),
        extensions: [bx]
      },
      underline: {
        class: "mdi mdi-format-underline",
        action: (f) => f.chain().focus().toggleUnderline().run(),
        active: (f) => f.isActive("underline"),
        extensions: [kx]
      },
      strike: {
        class: "mdi mdi-format-strikethrough-variant",
        action: (f) => f.chain().focus().toggleStrike().run(),
        active: (f) => f.isActive("strike"),
        extensions: [Cx]
      },
      unordered: {
        class: "mdi mdi-format-list-bulleted",
        action: (f) => f.chain().focus().toggleBulletList().run(),
        active: (f) => d(f) === "bulletList",
        extensions: [Ih, tr, Qo]
      },
      ordered: {
        class: "mdi mdi-format-list-numbered",
        action: (f) => f.chain().focus().toggleOrderedList().run(),
        active: (f) => d(f) === "orderedList",
        extensions: [$h, tr, Qo]
      },
      outdent: {
        class: "mdi mdi-format-indent-decrease",
        action: (f) => f.chain().focus().liftListItem("listItem").run(),
        disabled: (f) => !f.can().liftListItem("listItem"),
        extensions: [tr]
      },
      indent: {
        class: "mdi mdi-format-indent-increase",
        action: (f) => f.chain().focus().sinkListItem("listItem").run(),
        disabled: (f) => !f.can().sinkListItem("listItem"),
        extensions: [tr]
      },
      h1: {
        class: "mdi mdi-format-header-1",
        action: (f) => f.chain().focus().toggleHeading({ level: 1 }).run(),
        active: (f) => f.isActive("heading", { level: 1 }),
        extensions: [vn]
      },
      h2: {
        class: "mdi mdi-format-header-2",
        action: (f) => f.chain().focus().toggleHeading({ level: 2 }).run(),
        active: (f) => f.isActive("heading", { level: 2 }),
        extensions: [vn]
      },
      h3: {
        class: "mdi mdi-format-header-3",
        action: (f) => f.chain().focus().toggleHeading({ level: 3 }).run(),
        active: (f) => f.isActive("heading", { level: 3 }),
        extensions: [vn]
      },
      h4: {
        class: "mdi mdi-format-header-4",
        action: (f) => f.chain().focus().toggleHeading({ level: 4 }).run(),
        active: (f) => f.isActive("heading", { level: 4 }),
        extensions: [vn]
      },
      h5: {
        class: "mdi mdi-format-header-5",
        action: (f) => f.chain().focus().toggleHeading({ level: 5 }).run(),
        active: (f) => f.isActive("heading", { level: 5 }),
        extensions: [vn]
      },
      h6: {
        class: "mdi mdi-format-header-6",
        action: (f) => f.chain().focus().toggleHeading({ level: 6 }).run(),
        active: (f) => f.isActive("heading", { level: 6 }),
        extensions: [vn]
      },
      quote: {
        class: "mdi mdi-format-quote-open",
        action: (f) => f.chain().focus().toggleBlockquote().run(),
        active: (f) => f.isActive("blockquote"),
        disabled: (f) => !f.can().toggleBlockquote(),
        extensions: [Fx]
      },
      hardBreak: {
        class: "mdi mdi-keyboard-return",
        action: (f) => f.chain().focus().setHardBreak().run()
      },
      hr: {
        class: "mdi mdi-minus",
        action: (f) => f.chain().focus().setHorizontalRule().run(),
        extensions: [Vx]
      },
      left: {
        class: "mdi mdi-format-align-left",
        action: (f) => f.chain().focus().unsetTextAlign().run(),
        active: (f) => !(f.isActive({ textAlign: "center" }) || f.isActive({ textAlign: "right" }) || f.isActive({ textAlign: "justify" })),
        extensions: [i]
      },
      center: {
        class: "mdi mdi-format-align-center",
        action: (f) => f.chain().focus().setTextAlign("center").run(),
        active: (f) => f.isActive({ textAlign: "center" }),
        extensions: [i]
      },
      right: {
        class: "mdi mdi-format-align-right",
        action: (f) => f.chain().focus().setTextAlign("right").run(),
        active: (f) => f.isActive({ textAlign: "right" }),
        extensions: [i]
      },
      justify: {
        class: "mdi mdi-format-align-justify",
        action: (f) => f.chain().focus().setTextAlign("justify").run(),
        active: (f) => f.isActive({ textAlign: "justify" }),
        extensions: [i]
      },
      link: {
        class: "mdi mdi-link",
        action: (f) => u(f),
        active: (f) => f.isActive("link"),
        extensions: [s]
      },
      unlink: {
        class: "mdi mdi-link-off",
        action: (f) => f.chain().focus().unsetLink().run(),
        disabled: (f) => !f.isActive("link"),
        extensions: [s]
      },
      superscript: {
        class: "mdi mdi-format-superscript",
        action: (f) => {
          var h, p;
          (p = (h = f.chain()).unsetSubscript) == null || p.call(h).run(), f.chain().focus().toggleSuperscript().run();
        },
        active: (f) => f.isActive("superscript"),
        extensions: [b1]
      },
      subscript: {
        class: "mdi mdi-format-subscript",
        action: (f) => {
          var h, p;
          (p = (h = f.chain()).unsetSuperscript) == null || p.call(h).run(), f.chain().focus().toggleSubscript().run();
        },
        active: (f) => f.isActive("subscript"),
        extensions: [g1]
      },
      removeFormat: {
        class: "mdi mdi-format-clear",
        action: (f) => f.chain().focus().unsetAllMarks().run()
      },
      undo: {
        class: "mdi mdi-undo",
        action: (f) => f.chain().focus().undo().run(),
        disabled: (f) => !f.can().undo()
      },
      redo: {
        class: "mdi mdi-redo",
        action: (f) => f.chain().focus().redo().run(),
        disabled: (f) => !f.can().redo()
      },
      viewsource: {
        class: "mdi mdi-code-tags",
        action: () => e.value = !e.value
      },
      infoBlock: {
        class: "mdi mdi-information-outline",
        action: (f) => f.chain().focus().toggleCustom().run(),
        active: (f) => f.isActive("info-block")
      }
    }, l = r.toolbar.flat().flatMap((f) => o[f].extensions).filter((f, h, p) => p.indexOf(f) === h), a = De.create({
      name: "info-block",
      content: "block+",
      group: "block",
      defining: !0,
      addOptions() {
        return {
          HTMLAttributes: { class: "info-block" }
        };
      },
      parseHTML() {
        return [
          { tag: "div" }
        ];
      },
      renderHTML({ HTMLAttributes: f }) {
        return ["div", Q(this.options.HTMLAttributes, f), 0];
      },
      addCommands() {
        return {
          toggleCustom: () => ({ commands: f }) => f.toggleWrap(this.name)
        };
      }
    }), c = Tw({
      content: n.value,
      extensions: [Pk, Bk, $k, ox, Fk, sx, a, ...l],
      onUpdate: function({ editor: f }) {
        n.value = f.getHTML();
      },
      autofocus: r.autofocus
    });
    am(n, (f, h) => {
      var p, m;
      f !== ((p = c == null ? void 0 : c.value) == null ? void 0 : p.getHTML()) && ((m = c == null ? void 0 : c.value) == null || m.commands.setContent(n.value));
    });
    const u = function(f) {
      const h = f.getAttributes("link").href, p = window.prompt("URL", h);
      if (p !== null) {
        if (p === "") {
          f.chain().focus().extendMarkRange("link").unsetLink().run();
          return;
        }
        f.chain().focus().extendMarkRange("link").setLink({ href: /^https?:\/\//i.test(p) ? p : `https://${p}` }).run();
      }
    }, d = function(f) {
      var p;
      const h = zr((m) => Uo(m.type.name, f.extensionManager.extensions))(f.state.selection);
      return (p = h == null ? void 0 : h.node) == null ? void 0 : p.type.name;
    };
    return (f, h) => re(c) ? (Ee(), Ue("div", w1, [
      re(e) ? (Ee(), Ue(It, { key: 0 }, [
        Qe("div", k1, [
          h[2] || (h[2] = Qe("div", { class: "button-group gap" }, null, -1)),
          Qe("div", x1, [
            Qe("button", {
              type: "button",
              class: "mdi mdi-code-tags is-active",
              "aria-pressed": "true",
              title: f.$vui.i18n().wysiwyg.viewsource,
              "aria-label": f.$vui.i18n().wysiwyg.viewsource,
              onClick: h[0] || (h[0] = (...p) => o.viewsource.action && o.viewsource.action(...p))
            }, null, 8, S1)
          ])
        ]),
        Qe("div", {
          class: "grow-wrap",
          "data-replicated-value": n.value
        }, [
          Wp(Qe("textarea", {
            "onUpdate:modelValue": h[1] || (h[1] = (p) => n.value = p),
            class: "editor",
            style: gr({ "max-height": t.maxHeight })
          }, null, 4), [
            [Mm, n.value]
          ])
        ], 8, v1)
      ], 64)) : (Ee(), Ue(It, { key: 1 }, [
        Qe("div", C1, [
          (Ee(!0), Ue(It, null, jr(t.toolbar, (p) => (Ee(), Ue("div", {
            class: sn(["button-group", { gap: p.length === 0 }])
          }, [
            (Ee(!0), Ue(It, null, jr(p, (m) => {
              var g, y, b, w, C, k, T, v;
              return Ee(), Ue("button", {
                type: "button",
                key: m,
                class: sn([o[m].class, { "is-active": (y = (g = o[m]).active) == null ? void 0 : y.call(g, re(c)) }]),
                "aria-pressed": (w = (b = o[m]).active) == null ? void 0 : w.call(b, re(c)),
                disabled: (k = (C = o[m]).disabled) == null ? void 0 : k.call(C, re(c)),
                "aria-disabled": (v = (T = o[m]).disabled) == null ? void 0 : v.call(T, re(c)),
                title: f.$vui.i18n().wysiwyg[m],
                "aria-label": f.$vui.i18n().wysiwyg[m],
                onClick: (E) => o[m].action(re(c))
              }, null, 10, M1);
            }), 128))
          ], 2))), 256))
        ]),
        re(c) && t.bubbleToolbar ? (Ee(), Vu(re(Nk), {
          key: 0,
          editor: re(c)
        }, {
          default: Up(() => [
            Qe("div", T1, [
              (Ee(!0), Ue(It, null, jr(t.bubbleToolbar, (p) => (Ee(), Ue("div", {
                class: sn(["button-group", { gap: p.length === 0 }])
              }, [
                (Ee(!0), Ue(It, null, jr(p, (m) => {
                  var g, y, b, w, C, k, T, v;
                  return Ee(), Ue("button", {
                    type: "button",
                    key: m,
                    class: sn([o[m].class, { "is-active": (y = (g = o[m]).active) == null ? void 0 : y.call(g, re(c)) }]),
                    "aria-pressed": (w = (b = o[m]).active) == null ? void 0 : w.call(b, re(c)),
                    disabled: (k = (C = o[m]).disabled) == null ? void 0 : k.call(C, re(c)),
                    "aria-disabled": (v = (T = o[m]).disabled) == null ? void 0 : v.call(T, re(c)),
                    title: f.$vui.i18n().wysiwyg[m],
                    "aria-label": f.$vui.i18n().wysiwyg[m],
                    onClick: (E) => o[m].action(re(c))
                  }, null, 10, E1);
                }), 128))
              ], 2))), 256))
            ])
          ]),
          _: 1
        }, 8, ["editor"])) : Ma("", !0),
        _t(re(Mw), {
          editor: re(c),
          class: "editor",
          style: gr({ "max-height": t.maxHeight })
        }, null, 8, ["editor", "style"])
      ], 64))
    ])) : Ma("", !0);
  }
}, O1 = {
  bold: "Bold",
  italic: "Italic",
  underline: "Underline",
  strike: "Strike",
  unordered: "Unordered List",
  ordered: "Ordered List",
  outdent: "Outdent",
  indent: "Indent",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  quote: "Quote",
  hardBreak: "Hard Break",
  hr: "Horizontal Rule",
  left: "Align Left",
  center: "Align Center",
  right: "Align Right",
  justify: "Justify",
  link: "Link",
  unlink: "Unlink",
  superscript: "Superscript",
  subscript: "Subscript",
  removeFormat: "Remove Format",
  undo: "Undo",
  redo: "Redo",
  viewsource: "View Source",
  infoBlock: "Information"
}, N1 = {
  bold: "Gras",
  italic: "Italique",
  underline: "Souligné",
  strike: "Barré",
  unordered: "Liste non ordonnée",
  ordered: "Liste ordonnée",
  outdent: "Diminuer le retrait",
  indent: "Augmenter le retrait",
  h1: "Titre 1",
  h2: "Titre 2",
  h3: "Titre 3",
  h4: "Titre 4",
  h5: "Titre 5",
  h6: "Titre 6",
  quote: "Citation",
  hardBreak: "Saut de ligne",
  hr: "Règle horizontale",
  left: "Aligner à gauche",
  center: "Centrer",
  right: "Aligner à droite",
  justify: "Justifier",
  link: "Lien",
  unlink: "Supprimer le lien",
  superscript: "Exposant",
  subscript: "Indice",
  removeFormat: "Supprimer le formatage",
  undo: "Annuler",
  redo: "Rétablir",
  viewsource: "Voir la source",
  infoBlock: "Information"
};
var I1 = {
  install: function(t, e) {
    t.component("v-wysiwyg", A1), VertigoUi.lang.enUS.wysiwyg = O1, VertigoUi.lang.fr.wysiwyg = N1;
  }
};
window && (window.WYSIWYG = I1);
export {
  I1 as default
};
//# sourceMappingURL=vertigo-wysiwyg.es.js.map
