import { defineComponent as gr, ref as Gi, onMounted as To, onBeforeUnmount as Yi, h as yr, getCurrentInstance as ud, watchEffect as dd, nextTick as fd, unref as ee, shallowRef as hd, markRaw as pd, customRef as md, mergeModels as gd, useModel as yd, watch as bd, openBlock as Oe, createElementBlock as Fe, Fragment as dn, createElementVNode as gt, withDirectives as vd, vModelText as kd, renderList as Lr, normalizeClass as Pr, createBlock as xd, withCtx as Sd, createCommentVNode as ol, createVNode as wd } from "vue";
function se(n) {
  this.content = n;
}
se.prototype = {
  constructor: se,
  find: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n) return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(n, e, t) {
    var r = t && t != n ? this.remove(t) : this, i = r.find(n), s = r.content.slice();
    return i == -1 ? s.push(t || n, e) : (s[i + 1] = e, t && (s[i] = t)), new se(s);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new se(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new se([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new se(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), s = r.find(n);
    return i.splice(s == -1 ? i.length : s, 0, e, t), new se(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(n) {
    return n = se.from(n), n.size ? new se(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = se.from(n), n.size ? new se(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = se.from(n);
    for (var t = 0; t < n.content.length; t += 2)
      e = e.remove(n.content[t]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var n = {};
    return this.forEach(function(e, t) {
      n[e] = t;
    }), n;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
se.from = function(n) {
  if (n instanceof se) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new se(e);
};
function Ya(n, e, t) {
  for (let r = 0; ; r++) {
    if (r == n.childCount || r == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let i = n.child(r), s = e.child(r);
    if (i == s) {
      t += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(s))
      return t;
    if (i.isText && i.text != s.text) {
      for (let o = 0; i.text[o] == s.text[o]; o++)
        t++;
      return t;
    }
    if (i.content.size || s.content.size) {
      let o = Ya(i.content, s.content, t + 1);
      if (o != null)
        return o;
    }
    t += i.nodeSize;
  }
}
function Xa(n, e, t, r) {
  for (let i = n.childCount, s = e.childCount; ; ) {
    if (i == 0 || s == 0)
      return i == s ? null : { a: t, b: r };
    let o = n.child(--i), l = e.child(--s), a = o.nodeSize;
    if (o == l) {
      t -= a, r -= a;
      continue;
    }
    if (!o.sameMarkup(l))
      return { a: t, b: r };
    if (o.isText && o.text != l.text) {
      let c = 0, u = Math.min(o.text.length, l.text.length);
      for (; c < u && o.text[o.text.length - c - 1] == l.text[l.text.length - c - 1]; )
        c++, t--, r--;
      return { a: t, b: r };
    }
    if (o.content.size || l.content.size) {
      let c = Xa(o.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
class x {
  /**
  @internal
  */
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, t, r, i = 0, s) {
    for (let o = 0, l = 0; l < t; o++) {
      let a = this.content[o], c = l + a.nodeSize;
      if (c > e && r(a, i + l, s || null, o) !== !1 && a.content.size) {
        let u = l + 1;
        a.nodesBetween(Math.max(0, e - u), Math.min(a.content.size, t - u), r, i + u);
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
  textBetween(e, t, r, i) {
    let s = "", o = !0;
    return this.nodesBetween(e, t, (l, a) => {
      let c = l.isText ? l.text.slice(Math.max(e, a) - a, t - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
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
    let t = this.lastChild, r = e.firstChild, i = this.content.slice(), s = 0;
    for (t.isText && t.sameMarkup(r) && (i[i.length - 1] = t.withText(t.text + r.text), s = 1); s < e.content.length; s++)
      i.push(e.content[s]);
    return new x(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let r = [], i = 0;
    if (t > e)
      for (let s = 0, o = 0; o < t; s++) {
        let l = this.content[s], a = o + l.nodeSize;
        a > e && ((o < e || a > t) && (l.isText ? l = l.cut(Math.max(0, e - o), Math.min(l.text.length, t - o)) : l = l.cut(Math.max(0, e - o - 1), Math.min(l.content.size, t - o - 1))), r.push(l), i += l.nodeSize), o = a;
      }
    return new x(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? x.empty : e == 0 && t == this.content.length ? this : new x(this.content.slice(e, t));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, t) {
    let r = this.content[e];
    if (r == t)
      return this;
    let i = this.content.slice(), s = this.size + t.nodeSize - r.nodeSize;
    return i[e] = t, new x(i, s);
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
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
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
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
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
    for (let t = 0, r = 0; t < this.content.length; t++) {
      let i = this.content[t];
      e(i, r, t), r += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, t = 0) {
    return Ya(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return Xa(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e, t = -1) {
    if (e == 0)
      return Br(0, e);
    if (e == this.size)
      return Br(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let r = 0, i = 0; ; r++) {
      let s = this.child(r), o = i + s.nodeSize;
      if (o >= e)
        return o == e || t > 0 ? Br(r + 1, o) : Br(r, i);
      i = o;
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
  static fromJSON(e, t) {
    if (!t)
      return x.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new x(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return x.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      r += s.nodeSize, i && s.isText && e[i - 1].sameMarkup(s) ? (t || (t = e.slice(0, i)), t[t.length - 1] = s.withText(t[t.length - 1].text + s.text)) : t && t.push(s);
    }
    return new x(t || e, r);
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
const vs = { index: 0, offset: 0 };
function Br(n, e) {
  return vs.index = n, vs.offset = e, vs;
}
function ri(n, e) {
  if (n === e)
    return !0;
  if (!(n && typeof n == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (n.length != e.length)
      return !1;
    for (let r = 0; r < n.length; r++)
      if (!ri(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !ri(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let K = class qs {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let t, r = !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      if (this.eq(s))
        return e;
      if (this.type.excludes(s.type))
        t || (t = e.slice(0, i));
      else {
        if (s.type.excludes(this.type))
          return e;
        !r && s.type.rank > this.type.rank && (t || (t = e.slice(0, i)), t.push(this), r = !0), t && t.push(s);
      }
    }
    return t || (t = e.slice()), r || t.push(this), t;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && ri(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[t.type];
    if (!r)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    let i = r.create(t.attrs);
    return r.checkAttrs(i.attrs), i;
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(t[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return qs.none;
    if (e instanceof qs)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
K.none = [];
class ii extends Error {
}
class C {
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
  constructor(e, t, r) {
    this.content = e, this.openStart = t, this.openEnd = r;
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
  insertAt(e, t) {
    let r = Za(this.content, e + this.openStart, t);
    return r && new C(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new C(Qa(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
  static fromJSON(e, t) {
    if (!t)
      return C.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new C(x.fromJSON(e, t.content), r, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, t = !0) {
    let r = 0, i = 0;
    for (let s = e.firstChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.firstChild)
      r++;
    for (let s = e.lastChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.lastChild)
      i++;
    return new C(e, r, i);
  }
}
C.empty = new C(x.empty, 0, 0);
function Qa(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), s = n.maybeChild(r), { index: o, offset: l } = n.findIndex(t);
  if (i == e || s.isText) {
    if (l != t && !n.child(o).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != o)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, s.copy(Qa(s.content, e - i - 1, t - i - 1)));
}
function Za(n, e, t, r) {
  let { index: i, offset: s } = n.findIndex(e), o = n.maybeChild(i);
  if (s == e || o.isText)
    return n.cut(0, e).append(t).append(n.cut(e));
  let l = Za(o.content, e - s - 1, t);
  return l && n.replaceChild(i, o.copy(l));
}
function Td(n, e, t) {
  if (t.openStart > n.depth)
    throw new ii("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new ii("Inconsistent open depths");
  return ec(n, e, t, 0);
}
function ec(n, e, t, r) {
  let i = n.index(r), s = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let o = ec(n, e, t, r + 1);
    return s.copy(s.content.replaceChild(i, o));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let o = n.parent, l = o.content;
      return _t(o, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: o, end: l } = Cd(t, n);
      return _t(s, nc(n, o, l, e, r));
    }
  else return _t(s, si(n, e, r));
}
function tc(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new ii("Cannot join " + e.type.name + " onto " + n.type.name);
}
function Js(n, e, t) {
  let r = n.node(t);
  return tc(r, e.node(t)), r;
}
function Jt(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function _n(n, e, t, r) {
  let i = (e || n).node(t), s = 0, o = e ? e.index(t) : i.childCount;
  n && (s = n.index(t), n.depth > t ? s++ : n.textOffset && (Jt(n.nodeAfter, r), s++));
  for (let l = s; l < o; l++)
    Jt(i.child(l), r);
  e && e.depth == t && e.textOffset && Jt(e.nodeBefore, r);
}
function _t(n, e) {
  return n.type.checkContent(e), n.copy(e);
}
function nc(n, e, t, r, i) {
  let s = n.depth > i && Js(n, e, i + 1), o = r.depth > i && Js(t, r, i + 1), l = [];
  return _n(null, n, i, l), s && o && e.index(i) == t.index(i) ? (tc(s, o), Jt(_t(s, nc(n, e, t, r, i + 1)), l)) : (s && Jt(_t(s, si(n, e, i + 1)), l), _n(e, t, i, l), o && Jt(_t(o, si(t, r, i + 1)), l)), _n(r, null, i, l), new x(l);
}
function si(n, e, t) {
  let r = [];
  if (_n(null, n, t, r), n.depth > t) {
    let i = Js(n, e, t + 1);
    Jt(_t(i, si(n, e, t + 1)), r);
  }
  return _n(e, null, t, r), new x(r);
}
function Cd(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let s = t - 1; s >= 0; s--)
    i = e.node(s).copy(x.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class ir {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.path = t, this.parentOffset = r, this.depth = t.length / 3 - 1;
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
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], i = e.child(t);
    return r ? e.child(t).cut(r) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let r = this.path[t * 3], i = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
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
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return K.none;
    if (this.textOffset)
      return e.child(t).marks;
    let r = e.maybeChild(t - 1), i = e.maybeChild(t);
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
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let r = t.marks, i = e.parent.maybeChild(e.index());
    for (var s = 0; s < r.length; s++)
      r[s].type.spec.inclusive === !1 && (!i || !r[s].isInSet(i.marks)) && (r = r[s--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
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
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!t || t(this.node(r))))
        return new oi(this, e, r);
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
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let r = [], i = 0, s = t;
    for (let o = e; ; ) {
      let { index: l, offset: a } = o.content.findIndex(s), c = s - a;
      if (r.push(o, l, i + a), !c || (o = o.child(l), o.isText))
        break;
      s = c - 1, i += a + 1;
    }
    return new ir(t, r, s);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = ll.get(e);
    if (r)
      for (let s = 0; s < r.elts.length; s++) {
        let o = r.elts[s];
        if (o.pos == t)
          return o;
      }
    else
      ll.set(e, r = new Md());
    let i = r.elts[r.i] = ir.resolve(e, t);
    return r.i = (r.i + 1) % Od, i;
  }
}
class Md {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Od = 12, ll = /* @__PURE__ */ new WeakMap();
class oi {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.depth = r;
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
const Ed = /* @__PURE__ */ Object.create(null);
let Gt = class _s {
  /**
  @internal
  */
  constructor(e, t, r, i = K.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || x.empty;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](/docs/guide/#doc.indexing). For text nodes, this is the
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
  nodesBetween(e, t, r, i = 0) {
    this.content.nodesBetween(e, t, r, i, this);
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
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec^leafText) will be used.
  */
  textBetween(e, t, r, i) {
    return this.content.textBetween(e, t, r, i);
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
  hasMarkup(e, t, r) {
    return this.type == e && ri(this.attrs, t || e.defaultAttrs || Ed) && K.sameSet(this.marks, r || K.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new _s(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new _s(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, t = this.content.size, r = !1) {
    if (e == t)
      return C.empty;
    let i = this.resolve(e), s = this.resolve(t), o = r ? 0 : i.sharedDepth(t), l = i.start(o), c = i.node(o).content.cut(i.pos - l, s.pos - l);
    return new C(c, i.depth - o, s.depth - o);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, t, r) {
    return Td(this.resolve(e), this.resolve(t), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: r, offset: i } = t.content.findIndex(e);
      if (t = t.maybeChild(r), !t)
        return null;
      if (i == e || t.isText)
        return t;
      e -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: t, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(t), index: t, offset: r };
    let i = this.content.child(t - 1);
    return { node: i, index: t - 1, offset: r - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return ir.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return ir.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, t, r) {
    let i = !1;
    return t > e && this.nodesBetween(e, t, (s) => (r.isInSet(s.marks) && (i = !0), !i)), i;
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), rc(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, t, r = x.empty, i = 0, s = r.childCount) {
    let o = this.contentMatchAt(e).matchFragment(r, i, s), l = o && o.matchFragment(this.content, t);
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
  canReplaceWith(e, t, r, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let s = this.contentMatchAt(e).matchType(r), o = s && s.matchFragment(this.content, t);
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
    let e = K.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      r.type.checkAttrs(r.attrs), e = r.addToSet(e);
    }
    if (!K.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`);
    this.content.forEach((t) => t.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, r);
    }
    let i = x.fromJSON(e, t.content), s = e.nodeType(t.type).create(t.attrs, i, r);
    return s.type.checkAttrs(s.attrs), s;
  }
};
Gt.prototype.text = void 0;
class li extends Gt {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : rc(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new li(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new li(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function rc(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class en {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, t) {
    let r = new Ad(e, t);
    if (r.next == null)
      return en.empty;
    let i = ic(r);
    r.next && r.err("Unexpected trailing text");
    let s = Bd(Pd(i));
    return Hd(s, r), s;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, t = 0, r = e.childCount) {
    let i = this;
    for (let s = t; i && s < r; s++)
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
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[t].type == e.next[r].type)
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
  fillBefore(e, t = !1, r = 0) {
    let i = [this];
    function s(o, l) {
      let a = o.matchFragment(e, r);
      if (a && (!t || a.validEnd))
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
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
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
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in t) && (!i.type || a.validEnd) && (r.push({ match: l.contentMatch, type: l, via: i }), t[l.name] = !0);
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
    function t(r) {
      e.push(r);
      for (let i = 0; i < r.next.length; i++)
        e.indexOf(r.next[i].next) == -1 && t(r.next[i].next);
    }
    return t(this), e.map((r, i) => {
      let s = i + (r.validEnd ? "*" : " ") + " ";
      for (let o = 0; o < r.next.length; o++)
        s += (o ? ", " : "") + r.next[o].type.name + "->" + e.indexOf(r.next[o].next);
      return s;
    }).join(`
`);
  }
}
en.empty = new en(!0);
class Ad {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
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
function ic(n) {
  let e = [];
  do
    e.push(Nd(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Nd(n) {
  let e = [];
  do
    e.push(Dd(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Dd(n) {
  let e = Ld(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Id(n, e);
    else
      break;
  return e;
}
function al(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Id(n, e) {
  let t = al(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = al(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Rd(n, e) {
  let t = n.nodeTypes, r = t[e];
  if (r)
    return [r];
  let i = [];
  for (let s in t) {
    let o = t[s];
    o.groups.indexOf(e) > -1 && i.push(o);
  }
  return i.length == 0 && n.err("No node type or group '" + e + "' found"), i;
}
function Ld(n) {
  if (n.eat("(")) {
    let e = ic(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Rd(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Pd(n) {
  let e = [[]];
  return i(s(n, 0), t()), e;
  function t() {
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
        i(c, l = t());
      }
    else if (o.type == "star") {
      let a = t();
      return r(l, a), i(s(o.expr, a), a), [r(a)];
    } else if (o.type == "plus") {
      let a = t();
      return i(s(o.expr, l), a), i(s(o.expr, a), a), [r(a)];
    } else {
      if (o.type == "opt")
        return [r(l)].concat(s(o.expr, l));
      if (o.type == "range") {
        let a = l;
        for (let c = 0; c < o.min; c++) {
          let u = t();
          i(s(o.expr, a), u), a = u;
        }
        if (o.max == -1)
          i(s(o.expr, a), a);
        else
          for (let c = o.min; c < o.max; c++) {
            let u = t();
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
function sc(n, e) {
  return e - n;
}
function cl(n, e) {
  let t = [];
  return r(e), t.sort(sc);
  function r(i) {
    let s = n[i];
    if (s.length == 1 && !s[0].term)
      return r(s[0].to);
    t.push(i);
    for (let o = 0; o < s.length; o++) {
      let { term: l, to: a } = s[o];
      !l && t.indexOf(a) == -1 && r(a);
    }
  }
}
function Bd(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(cl(n, 0));
  function t(r) {
    let i = [];
    r.forEach((o) => {
      n[o].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        cl(n, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let s = e[r.join(",")] = new en(r.indexOf(n.length - 1) > -1);
    for (let o = 0; o < i.length; o++) {
      let l = i[o][1].sort(sc);
      s.next.push({ type: i[o][0], next: e[l.join(",")] || t(l) });
    }
    return s;
  }
}
function Hd(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], s = !i.validEnd, o = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      o.push(a.name), s && !(a.isText || a.hasRequiredAttrs()) && (s = !1), r.indexOf(c) == -1 && r.push(c);
    }
    s && e.err("Only non-generatable nodes (" + o.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function oc(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function lc(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in n) {
    let i = e && e[r];
    if (i === void 0) {
      let s = n[r];
      if (s.hasDefault)
        i = s.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    t[r] = i;
  }
  return t;
}
function ac(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${i}`);
  for (let i in n) {
    let s = n[i];
    s.validate && s.validate(e[i]);
  }
}
function cc(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Fd(n, r, e[r]);
  return t;
}
let ul = class uc {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = cc(e, r.attrs), this.defaultAttrs = oc(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == en.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : lc(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, t, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new Gt(this, this.computeAttrs(e), x.from(t), K.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = x.from(t), this.checkContent(t), new Gt(this, this.computeAttrs(e), t, K.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, t, r) {
    if (e = this.computeAttrs(e), t = x.from(t), t.size) {
      let o = this.contentMatch.fillBefore(t);
      if (!o)
        return null;
      t = o.append(t);
    }
    let i = this.contentMatch.matchFragment(t), s = i && i.fillBefore(x.empty, !0);
    return s ? new Gt(this, e, t.append(s), K.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
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
    ac(this.attrs, e, "node", this.name);
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
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? t && t.push(e[r]) : t || (t = e.slice(0, r));
    return t ? t.length ? t : K.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((s, o) => r[s] = new uc(s, t, o));
    let i = t.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let s in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
function zd(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let s = i === null ? "null" : typeof i;
    if (r.indexOf(s) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${s}`);
  };
}
class Fd {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? zd(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Xi {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = cc(e, i.attrs), this.excluded = null;
    let s = oc(this.attrs);
    this.instance = s ? new K(this, s) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new K(this, lc(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((s, o) => r[s] = new Xi(s, i++, t, o)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  /**
  @internal
  */
  checkAttrs(e) {
    ac(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class dc {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = se.from(e.nodes), t.marks = se.from(e.marks || {}), this.nodes = ul.compile(this.spec.nodes, this), this.marks = Xi.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let s = this.nodes[i], o = s.spec.content || "", l = s.spec.marks;
      if (s.contentMatch = r[o] || (r[o] = en.parse(o, this.nodes)), s.inlineContent = s.contentMatch.inlineContent, s.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!s.isInline || !s.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = s;
      }
      s.markSet = l == "_" ? null : l ? dl(this, l.split(" ")) : l == "" || !s.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let s = this.marks[i], o = s.spec.excludes;
      s.excluded = o == null ? [s] : o == "" ? [] : dl(this, o.split(" "));
    }
    this.nodeFromJSON = this.nodeFromJSON.bind(this), this.markFromJSON = this.markFromJSON.bind(this), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, t = null, r, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof ul) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, r, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, t) {
    let r = this.nodes.text;
    return new li(r, r.defaultAttrs, e, K.setFrom(t));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  /**
  Deserialize a node from its JSON representation. This method is
  bound.
  */
  nodeFromJSON(e) {
    return Gt.fromJSON(this, e);
  }
  /**
  Deserialize a mark from its JSON representation. This method is
  bound.
  */
  markFromJSON(e) {
    return K.fromJSON(this, e);
  }
  /**
  @internal
  */
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function dl(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], s = n.marks[i], o = s;
    if (s)
      t.push(s);
    else
      for (let l in n.marks) {
        let a = n.marks[l];
        (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && t.push(o = a);
      }
    if (!o)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
function $d(n) {
  return n.tag != null;
}
function Vd(n) {
  return n.style != null;
}
class Ot {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if ($d(i))
        this.tags.push(i);
      else if (Vd(i)) {
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
  parse(e, t = {}) {
    let r = new hl(this, t, !1);
    return r.addAll(e, K.none, t.from, t.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, t = {}) {
    let r = new hl(this, t, !0);
    return r.addAll(e, K.none, t.from, t.to), C.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let s = this.tags[i];
      if (Kd(e, s.tag) && (s.namespace === void 0 || e.namespaceURI == s.namespace) && (!s.context || t.matchesContext(s.context))) {
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
  matchStyle(e, t, r, i) {
    for (let s = i ? this.styles.indexOf(i) + 1 : 0; s < this.styles.length; s++) {
      let o = this.styles[s], l = o.style;
      if (!(l.indexOf(e) != 0 || o.context && !r.matchesContext(o.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != t))) {
        if (o.getAttrs) {
          let a = o.getAttrs(t);
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
    let t = [];
    function r(i) {
      let s = i.priority == null ? 50 : i.priority, o = 0;
      for (; o < t.length; o++) {
        let l = t[o];
        if ((l.priority == null ? 50 : l.priority) < s)
          break;
      }
      t.splice(o, 0, i);
    }
    for (let i in e.marks) {
      let s = e.marks[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = pl(o)), o.mark || o.ignore || o.clearMark || (o.mark = i);
      });
    }
    for (let i in e.nodes) {
      let s = e.nodes[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = pl(o)), o.node || o.ignore || o.mark || (o.node = i);
      });
    }
    return t;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.ParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new Ot(e, Ot.schemaRules(e)));
  }
}
const fc = {
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
}, jd = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, hc = { ol: !0, ul: !0 }, ai = 1, ci = 2, Gn = 4;
function fl(n, e, t) {
  return e != null ? (e ? ai : 0) | (e === "full" ? ci : 0) : n && n.whitespace == "pre" ? ai | ci : t & ~Gn;
}
class Hr {
  constructor(e, t, r, i, s, o) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = o, this.content = [], this.activeMarks = K.none, this.match = s || (o & Gn ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(x.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let r = this.type.contentMatch, i;
        return (i = r.findWrapping(e.type)) ? (this.match = r, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & ai)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let s = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = s.withText(s.text.slice(0, s.text.length - i[0].length));
      }
    }
    let t = x.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(x.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !fc.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class hl {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0;
    let i = t.topNode, s, o = fl(null, t.preserveWhitespace, 0) | (r ? Gn : 0);
    i ? s = new Hr(i.type, i.attrs, K.none, !0, t.topMatch || i.type.contentMatch, o) : r ? s = new Hr(null, null, K.none, !0, null, o) : s = new Hr(e.schema.topNodeType, null, K.none, !0, null, o), this.nodes = [s], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, t) {
    e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
  }
  addTextNode(e, t) {
    let r = e.nodeValue, i = this.top;
    if (i.options & ci || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (i.options & ai)
        i.options & ci ? r = r.replace(/\r\n?/g, `
`) : r = r.replace(/\r?\n|\r/g, " ");
      else if (r = r.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1) {
        let s = i.content[i.content.length - 1], o = e.previousSibling;
        (!s || o && o.nodeName == "BR" || s.isText && /[ \t\r\n\u000c]$/.test(s.text)) && (r = r.slice(1));
      }
      r && this.insertNode(this.parser.schema.text(r), t), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, t, r) {
    let i = e.nodeName.toLowerCase(), s;
    hc.hasOwnProperty(i) && this.parser.normalizeLists && Wd(e);
    let o = this.options.ruleFromNode && this.options.ruleFromNode(e) || (s = this.parser.matchTag(e, this, r));
    if (o ? o.ignore : jd.hasOwnProperty(i))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!o || o.skip || o.closeParent) {
      o && o.closeParent ? this.open = Math.max(0, this.open - 1) : o && o.skip.nodeType && (e = o.skip);
      let l, a = this.top, c = this.needsBlock;
      if (fc.hasOwnProperty(i))
        a.content.length && a.content[0].isInline && this.open && (this.open--, a = this.top), l = !0, a.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        return;
      }
      let u = o && o.skip ? t : this.readStyles(e, t);
      u && this.addAll(e, u), l && this.sync(a), this.needsBlock = c;
    } else {
      let l = this.readStyles(e, t);
      l && this.addElementByRule(e, o, l, o.consuming === !1 ? s : void 0);
    }
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, t) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), t);
  }
  // Called for ignored nodes
  ignoreFallback(e, t) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, t) {
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
            if (a.clearMark ? t = t.filter((c) => !a.clearMark(c)) : t = t.concat(this.parser.schema.marks[a.mark].create(a.attrs)), a.consuming === !1)
              l = a;
            else
              break;
          }
      }
    return t;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, t, r, i) {
    let s, o;
    if (t.node)
      if (o = this.parser.schema.nodes[t.node], o.isLeaf)
        this.insertNode(o.create(t.attrs), r) || this.leafFallback(e, r);
      else {
        let a = this.enter(o, t.attrs || null, r, t.preserveWhitespace);
        a && (s = !0, r = a);
      }
    else {
      let a = this.parser.schema.marks[t.mark];
      r = r.concat(a.create(t.attrs));
    }
    let l = this.top;
    if (o && o.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, r, i);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((a) => this.insertNode(a, r));
    else {
      let a = e;
      typeof t.contentElement == "string" ? a = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? a = t.contentElement(e) : t.contentElement && (a = t.contentElement), this.findAround(e, a, !0), this.addAll(a, r);
    }
    s && this.sync(l) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, t, r, i) {
    let s = r || 0;
    for (let o = r ? e.childNodes[r] : e.firstChild, l = i == null ? null : e.childNodes[i]; o != l; o = o.nextSibling, ++s)
      this.findAtPoint(e, s), this.addDOM(o, t);
    this.findAtPoint(e, s);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, t) {
    let r, i;
    for (let s = this.open; s >= 0; s--) {
      let o = this.nodes[s], l = o.findWrapping(e);
      if (l && (!r || r.length > l.length) && (r = l, i = o, !l.length) || o.solid)
        break;
    }
    if (!r)
      return null;
    this.sync(i);
    for (let s = 0; s < r.length; s++)
      t = this.enterInner(r[s], null, t, !1);
    return t;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, t) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let i = this.textblockFromContext();
      i && (t = this.enterInner(i, null, t));
    }
    let r = this.findPlace(e, t);
    if (r) {
      this.closeExtra();
      let i = this.top;
      i.match && (i.match = i.match.matchType(e.type));
      let s = K.none;
      for (let o of r.concat(e.marks))
        (i.type ? i.type.allowsMarkType(o.type) : ml(o.type, e.type)) && (s = o.addToSet(s));
      return i.content.push(e.mark(s)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, t, r, i) {
    let s = this.findPlace(e.create(t), r);
    return s && (s = this.enterInner(e, t, r, !0, i)), s;
  }
  // Open a node of the given type
  enterInner(e, t, r, i = !1, s) {
    this.closeExtra();
    let o = this.top;
    o.match = o.match && o.match.matchType(e);
    let l = fl(e, s, o.options);
    o.options & Gn && o.content.length == 0 && (l |= Gn);
    let a = K.none;
    return r = r.filter((c) => (o.type ? o.type.allowsMarkType(c.type) : ml(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new Hr(e, t, a, i, null, l)), this.open++, r;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(this.isOpen || this.options.topOpen);
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--)
      if (this.nodes[t] == e)
        return this.open = t, !0;
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let r = this.nodes[t].content;
      for (let i = r.length - 1; i >= 0; i--)
        e += r[i].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == t && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, r) {
    if (e != t && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && t.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), s = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), o = (l, a) => {
      for (; l >= 0; l--) {
        let c = t[l];
        if (c == "") {
          if (l == t.length - 1 || l == 0)
            continue;
          for (; a >= s; a--)
            if (o(l - 1, a))
              return !0;
          return !1;
        } else {
          let u = a > 0 || a == 0 && i ? this.nodes[a].type : r && a >= s ? r.node(a - s).type : null;
          if (!u || u.name != c && u.groups.indexOf(c) == -1)
            return !1;
          a--;
        }
      }
      return !0;
    };
    return o(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let r = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let t in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[t];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
}
function Wd(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && hc.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Kd(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function pl(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function ml(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let i = t[r];
    if (!i.allowsMarkType(n))
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
class sn {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, t) {
    this.nodes = e, this.marks = t;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, t = {}, r) {
    r || (r = ks(t).createDocumentFragment());
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
          let c = o.marks[a++], u = this.serializeMark(c, o.isInline, t);
          u && (s.push([c, i]), i.appendChild(u.dom), i = u.contentDOM || u.dom);
        }
      }
      i.appendChild(this.serializeNodeInner(o, t));
    }), r;
  }
  /**
  @internal
  */
  serializeNodeInner(e, t) {
    let { dom: r, contentDOM: i } = Yr(ks(t), this.nodes[e.type.name](e), null, e.attrs);
    if (i) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, i);
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
  serializeNode(e, t = {}) {
    let r = this.serializeNodeInner(e, t);
    for (let i = e.marks.length - 1; i >= 0; i--) {
      let s = this.serializeMark(e.marks[i], e.isInline, t);
      s && ((s.contentDOM || s.dom).appendChild(r), r = s.dom);
    }
    return r;
  }
  /**
  @internal
  */
  serializeMark(e, t, r = {}) {
    let i = this.marks[e.type.name];
    return i && Yr(ks(r), i(e, t), null, e.attrs);
  }
  static renderSpec(e, t, r = null, i) {
    return Yr(e, t, r, i);
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new sn(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let t = gl(e.nodes);
    return t.text || (t.text = (r) => r.text), t;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return gl(e.marks);
  }
}
function gl(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function ks(n) {
  return n.document || window.document;
}
const yl = /* @__PURE__ */ new WeakMap();
function Ud(n) {
  let e = yl.get(n);
  return e === void 0 && yl.set(n, e = qd(n)), e;
}
function qd(n) {
  let e = null;
  function t(r) {
    if (r && typeof r == "object")
      if (Array.isArray(r))
        if (typeof r[0] == "string")
          e || (e = []), e.push(r);
        else
          for (let i = 0; i < r.length; i++)
            t(r[i]);
      else
        for (let i in r)
          t(r[i]);
  }
  return t(n), e;
}
function Yr(n, e, t, r) {
  if (typeof e == "string")
    return { dom: n.createTextNode(e) };
  if (e.nodeType != null)
    return { dom: e };
  if (e.dom && e.dom.nodeType != null)
    return e;
  let i = e[0], s;
  if (typeof i != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (r && (s = Ud(r)) && s.indexOf(e) > -1)
    throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
  let o = i.indexOf(" ");
  o > 0 && (t = i.slice(0, o), i = i.slice(o + 1));
  let l, a = t ? n.createElementNS(t, i) : n.createElement(i), c = e[1], u = 1;
  if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
    u = 2;
    for (let d in c)
      if (c[d] != null) {
        let f = d.indexOf(" ");
        f > 0 ? a.setAttributeNS(d.slice(0, f), d.slice(f + 1), c[d]) : a.setAttribute(d, c[d]);
      }
  }
  for (let d = u; d < e.length; d++) {
    let f = e[d];
    if (f === 0) {
      if (d < e.length - 1 || d > u)
        throw new RangeError("Content hole must be the only child of its parent node");
      return { dom: a, contentDOM: a };
    } else {
      let { dom: h, contentDOM: p } = Yr(n, f, t, r);
      if (a.appendChild(h), p) {
        if (l)
          throw new RangeError("Multiple content holes");
        l = p;
      }
    }
  }
  return { dom: a, contentDOM: l };
}
const pc = 65535, mc = Math.pow(2, 16);
function Jd(n, e) {
  return n + e * mc;
}
function bl(n) {
  return n & pc;
}
function _d(n) {
  return (n - (n & pc)) / mc;
}
const gc = 1, yc = 2, Xr = 4, bc = 8;
class Gs {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.delInfo = t, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & bc) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (gc | Xr)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (yc | Xr)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Xr) > 0;
  }
}
class we {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && we.empty)
      return we.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = bl(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + _d(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0, s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e)
        break;
      let c = this.ranges[l + s], u = this.ranges[l + o], d = a + c;
      if (e <= d) {
        let f = c ? e == a ? -1 : e == d ? 1 : t : t, h = a + i + (f < 0 ? 0 : u);
        if (r)
          return h;
        let p = e == (t < 0 ? a : d) ? null : Jd(l / 3, e - a), m = e == a ? yc : e == d ? gc : Xr;
        return (t < 0 ? e != a : e != d) && (m |= bc), new Gs(h, m, p);
      }
      i += u - c;
    }
    return r ? e + i : new Gs(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = bl(t), s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
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
    let t = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let i = 0, s = 0; i < this.ranges.length; i += 3) {
      let o = this.ranges[i], l = o - (this.inverted ? s : 0), a = o + (this.inverted ? 0 : s), c = this.ranges[i + t], u = this.ranges[i + r];
      e(l, l + c, a, a + u), s += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new we(this.ranges, !this.inverted);
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
    return e == 0 ? we.empty : new we(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
we.empty = new we([]);
class Sn {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e = [], t, r = 0, i = e.length) {
    this.maps = e, this.mirror = t, this.from = r, this.to = i;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, t = this.maps.length) {
    return new Sn(this.maps, this.mirror, e, t);
  }
  /**
  @internal
  */
  copy() {
    return new Sn(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, t) {
    this.to = this.maps.push(e), t != null && this.setMirror(this.maps.length - 1, t);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let t = 0, r = this.maps.length; t < e.maps.length; t++) {
      let i = e.getMirror(t);
      this.appendMap(e.maps[t], i != null && i < t ? r + i : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e)
          return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let t = e.maps.length - 1, r = this.maps.length + e.maps.length; t >= 0; t--) {
      let i = e.getMirror(t);
      this.appendMap(e.maps[t].invert(), i != null && i > t ? r - i - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new Sn();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, t = 1) {
    if (this.mirror)
      return this._map(e, t, !0);
    for (let r = this.from; r < this.to; r++)
      e = this.maps[r].map(e, t);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0;
    for (let s = this.from; s < this.to; s++) {
      let o = this.maps[s], l = o.mapResult(e, t);
      if (l.recover != null) {
        let a = this.getMirror(s);
        if (a != null && a > s && a < this.to) {
          s = a, e = this.maps[a].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, e = l.pos;
    }
    return r ? e : new Gs(e, i, null);
  }
}
const xs = /* @__PURE__ */ Object.create(null);
class de {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return we.empty;
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
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = xs[t.stepType];
    if (!r)
      throw new RangeError(`No step type ${t.stepType} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, t) {
    if (e in xs)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return xs[e] = t, t.prototype.jsonID = e, t;
  }
}
class X {
  /**
  @internal
  */
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new X(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new X(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return X.ok(e.replace(t, r, i));
    } catch (s) {
      if (s instanceof ii)
        return X.fail(s.message);
      throw s;
    }
  }
}
function Co(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let s = n.child(i);
    s.content.size && (s = s.copy(Co(s.content, e, s))), s.isInline && (s = e(s, t, i)), r.push(s);
  }
  return x.fromArray(r);
}
class Tt extends de {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), s = new C(Co(t.content, (o, l) => !o.isAtom || !l.type.allowsMarkType(this.mark.type) ? o : o.mark(this.mark.addToSet(o.marks)), i), t.openStart, t.openEnd);
    return X.fromReplace(e, this.from, this.to, s);
  }
  invert() {
    return new Ze(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Tt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Tt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Tt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new Tt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
de.jsonID("addMark", Tt);
class Ze extends de {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new C(Co(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return X.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new Tt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Ze(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Ze && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Ze(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new Ze(t.from, t.to, e.markFromJSON(t.mark));
  }
}
de.jsonID("removeMark", Ze);
class Ct extends de {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return X.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return X.fromReplace(e, this.pos, this.pos + 1, new C(x.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new Ct(this.pos, t.marks[i]);
        return new Ct(this.pos, this.mark);
      }
    }
    return new Mn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Ct(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new Ct(t.pos, e.markFromJSON(t.mark));
  }
}
de.jsonID("addNodeMark", Ct);
class Mn extends de {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return X.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return X.fromReplace(e, this.pos, this.pos + 1, new C(x.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new Ct(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Mn(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new Mn(t.pos, e.markFromJSON(t.mark));
  }
}
de.jsonID("removeNodeMark", Mn);
class te extends de {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, t, r, i = !1) {
    super(), this.from = e, this.to = t, this.slice = r, this.structure = i;
  }
  apply(e) {
    return this.structure && Ys(e, this.from, this.to) ? X.fail("Structure replace would overwrite content") : X.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new we([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new te(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deletedAcross && r.deletedAcross ? null : new te(t.pos, Math.max(t.pos, r.pos), this.slice);
  }
  merge(e) {
    if (!(e instanceof te) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? C.empty : new C(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new te(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? C.empty : new C(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new te(e.from, this.to, t, this.structure);
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
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new te(t.from, t.to, C.fromJSON(e, t.slice), !!t.structure);
  }
}
de.jsonID("replace", te);
class ne extends de {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, t, r, i, s, o, l = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = r, this.gapTo = i, this.slice = s, this.insert = o, this.structure = l;
  }
  apply(e) {
    if (this.structure && (Ys(e, this.from, this.gapFrom) || Ys(e, this.gapTo, this.to)))
      return X.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return X.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? X.fromReplace(e, this.from, this.to, r) : X.fail("Content does not fit in gap");
  }
  getMap() {
    return new we([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new ne(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), s = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || s > r.pos ? null : new ne(t.pos, r.pos, i, s, this.slice, this.insert, this.structure);
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
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new ne(t.from, t.to, t.gapFrom, t.gapTo, C.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
de.jsonID("replaceAround", ne);
function Ys(n, e, t) {
  let r = n.resolve(e), i = t - e, s = r.depth;
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
function Gd(n, e, t, r) {
  let i = [], s = [], o, l;
  n.doc.nodesBetween(e, t, (a, c, u) => {
    if (!a.isInline)
      return;
    let d = a.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(c, e), h = Math.min(c + a.nodeSize, t), p = r.addToSet(d);
      for (let m = 0; m < d.length; m++)
        d[m].isInSet(p) || (o && o.to == f && o.mark.eq(d[m]) ? o.to = h : i.push(o = new Ze(f, h, d[m])));
      l && l.to == f ? l.to = h : s.push(l = new Tt(f, h, r));
    }
  }), i.forEach((a) => n.step(a)), s.forEach((a) => n.step(a));
}
function Yd(n, e, t, r) {
  let i = [], s = 0;
  n.doc.nodesBetween(e, t, (o, l) => {
    if (!o.isInline)
      return;
    s++;
    let a = null;
    if (r instanceof Xi) {
      let c = o.marks, u;
      for (; u = r.isInSet(c); )
        (a || (a = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(o.marks) && (a = [r]) : a = o.marks;
    if (a && a.length) {
      let c = Math.min(l + o.nodeSize, t);
      for (let u = 0; u < a.length; u++) {
        let d = a[u], f;
        for (let h = 0; h < i.length; h++) {
          let p = i[h];
          p.step == s - 1 && d.eq(i[h].style) && (f = p);
        }
        f ? (f.to = c, f.step = s) : i.push({ style: d, from: Math.max(l, e), to: c, step: s });
      }
    }
  }), i.forEach((o) => n.step(new Ze(o.from, o.to, o.style)));
}
function vc(n, e, t, r = t.contentMatch, i = !0) {
  let s = n.doc.nodeAt(e), o = [], l = e + 1;
  for (let a = 0; a < s.childCount; a++) {
    let c = s.child(a), u = l + c.nodeSize, d = r.matchType(c.type);
    if (!d)
      o.push(new te(l, u, C.empty));
    else {
      r = d;
      for (let f = 0; f < c.marks.length; f++)
        t.allowsMarkType(c.marks[f].type) || n.step(new Ze(l, u, c.marks[f]));
      if (i && c.isText && t.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, p;
        for (; f = h.exec(c.text); )
          p || (p = new C(x.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), o.push(new te(l + f.index, l + f.index + f[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(x.empty, !0);
    n.replace(l, l, new C(a, 0, 0));
  }
  for (let a = o.length - 1; a >= 0; a--)
    n.step(o[a]);
}
function Xd(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Bn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth; ; --r) {
    let i = n.$from.node(r), s = n.$from.index(r), o = n.$to.indexAfter(r);
    if (r < n.depth && i.canReplace(s, o, t))
      return r;
    if (r == 0 || i.type.spec.isolating || !Xd(i, s, o))
      break;
  }
  return null;
}
function Qd(n, e, t) {
  let { $from: r, $to: i, depth: s } = e, o = r.before(s + 1), l = i.after(s + 1), a = o, c = l, u = x.empty, d = 0;
  for (let p = s, m = !1; p > t; p--)
    m || r.index(p) > 0 ? (m = !0, u = x.from(r.node(p).copy(u)), d++) : a--;
  let f = x.empty, h = 0;
  for (let p = s, m = !1; p > t; p--)
    m || i.after(p + 1) < i.end(p) ? (m = !0, f = x.from(i.node(p).copy(f)), h++) : c++;
  n.step(new ne(a, c, o, l, new C(u.append(f), d, h), u.size - d, !0));
}
function Mo(n, e, t = null, r = n) {
  let i = Zd(n, e), s = i && ef(r, e);
  return s ? i.map(vl).concat({ type: e, attrs: t }).concat(s.map(vl)) : null;
}
function vl(n) {
  return { type: n, attrs: null };
}
function Zd(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, s = t.contentMatchAt(r).findWrapping(e);
  if (!s)
    return null;
  let o = s.length ? s[0] : e;
  return t.canReplaceWith(r, i, o) ? s : null;
}
function ef(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, s = t.child(r), o = e.contentMatch.findWrapping(s.type);
  if (!o)
    return null;
  let a = (o.length ? o[o.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : o;
}
function tf(n, e, t) {
  let r = x.empty;
  for (let o = t.length - 1; o >= 0; o--) {
    if (r.size) {
      let l = t[o].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = x.from(t[o].type.create(t[o].attrs, r));
  }
  let i = e.start, s = e.end;
  n.step(new ne(i, s, i, s, new C(r, 0, 0), t.length, !0));
}
function nf(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let s = n.steps.length;
  n.doc.nodesBetween(e, t, (o, l) => {
    let a = typeof i == "function" ? i(o) : i;
    if (o.isTextblock && !o.hasMarkup(r, a) && of(n.doc, n.mapping.slice(s).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !p ? c = !1 : !h && p && (c = !0);
      }
      c === !1 && sf(n, o, l, s), vc(n, n.mapping.slice(s).map(l, 1), r, void 0, c === null);
      let u = n.mapping.slice(s), d = u.map(l, 1), f = u.map(l + o.nodeSize, 1);
      return n.step(new ne(d, f, d + 1, f - 1, new C(x.from(r.create(a, null, o.marks)), 0, 0), 1, !0)), c === !0 && rf(n, o, l, s), !1;
    }
  });
}
function rf(n, e, t, r) {
  e.forEach((i, s) => {
    if (i.isText) {
      let o, l = /\r?\n|\r/g;
      for (; o = l.exec(i.text); ) {
        let a = n.mapping.slice(r).map(t + 1 + s + o.index);
        n.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function sf(n, e, t, r) {
  e.forEach((i, s) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let o = n.mapping.slice(r).map(t + 1 + s);
      n.replaceWith(o, o + 1, e.type.schema.text(`
`));
    }
  });
}
function of(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function lf(n, e, t, r, i) {
  let s = n.doc.nodeAt(e);
  if (!s)
    throw new RangeError("No node at given position");
  t || (t = s.type);
  let o = t.create(r, null, i || s.marks);
  if (s.isLeaf)
    return n.replaceWith(e, e + s.nodeSize, o);
  if (!t.validContent(s.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new ne(e, e + s.nodeSize, e + 1, e + s.nodeSize - 1, new C(x.from(o), 0, 0), 1, !0));
}
function wn(n, e, t = 1, r) {
  let i = n.resolve(e), s = i.depth - t, o = r && r[r.length - 1] || i.parent;
  if (s < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = t - 2; c > s; c--, u--) {
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
function af(n, e, t = 1, r) {
  let i = n.doc.resolve(e), s = x.empty, o = x.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    s = x.from(i.node(l).copy(s));
    let u = r && r[c];
    o = x.from(u ? u.type.create(u.attrs, o) : i.node(l).copy(o));
  }
  n.step(new te(e, e, new C(s.append(o), t, t), !0));
}
function Rt(n, e) {
  let t = n.resolve(e), r = t.index();
  return kc(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function kc(n, e) {
  return !!(n && e && !n.isLeaf && n.canAppend(e));
}
function Qi(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let s, o, l = r.index(i);
    if (i == r.depth ? (s = r.nodeBefore, o = r.nodeAfter) : t > 0 ? (s = r.node(i + 1), l++, o = r.node(i).maybeChild(l)) : (s = r.node(i).maybeChild(l - 1), o = r.node(i + 1)), s && !s.isTextblock && kc(s, o) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function cf(n, e, t) {
  let r = new te(e - t, e + t, C.empty, !0);
  n.step(r);
}
function uf(n, e, t) {
  let r = n.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), t))
    return e;
  if (r.parentOffset == 0)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.index(i);
      if (r.node(i).canReplaceWith(s, s, t))
        return r.before(i + 1);
      if (s > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.indexAfter(i);
      if (r.node(i).canReplaceWith(s, s, t))
        return r.after(i + 1);
      if (s < r.node(i).childCount)
        return null;
    }
  return null;
}
function df(n, e, t) {
  let r = n.resolve(e);
  if (!t.content.size)
    return e;
  let i = t.content;
  for (let s = 0; s < t.openStart; s++)
    i = i.firstChild.content;
  for (let s = 1; s <= (t.openStart == 0 && t.size ? 2 : 1); s++)
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
function Zi(n, e, t = e, r = C.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), s = n.resolve(t);
  return xc(i, s, r) ? new te(e, t, r) : new ff(i, s, r).fit();
}
function xc(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class ff {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = x.empty;
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
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let s = this.placed, o = r.depth, l = i.depth;
    for (; o && l && s.childCount == 1; )
      s = s.firstChild.content, o--, l--;
    let a = new C(s, o, l);
    return e > -1 ? new ne(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new te(r.pos, i.pos, a) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, r = 0, i = this.unplaced.openEnd; r < e; r++) {
      let s = t.firstChild;
      if (t.childCount > 1 && (i = 0), s.type.spec.isolating && i <= r) {
        e = r;
        break;
      }
      t = s.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let r = t == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i, s = null;
        r ? (s = Ss(this.unplaced.content, r - 1).firstChild, i = s.content) : i = this.unplaced.content;
        let o = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, d = null;
          if (t == 1 && (o ? c.matchType(o.type) || (d = c.fillBefore(x.from(o), !1)) : s && a.compatibleContent(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: s, inject: d };
          if (t == 2 && o && (u = c.findWrapping(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: s, wrap: u };
          if (s && c.matchType(s.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Ss(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new C(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Ss(e, t);
    if (i.childCount <= 1 && t > 0) {
      let s = e.size - t <= t + i.size;
      this.unplaced = new C(Un(e, t - 1, 1), t - 1, s ? t - 1 : r);
    } else
      this.unplaced = new C(Un(e, t, 1), t, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: r, inject: i, wrap: s }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (s)
      for (let m = 0; m < s.length; m++)
        this.openFrontierNode(s[m]);
    let o = this.unplaced, l = r ? r.content : o.content, a = o.openStart - e, c = 0, u = [], { match: d, type: f } = this.frontier[t];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        u.push(i.child(m));
      d = d.matchFragment(i);
    }
    let h = l.size + e - (o.content.size - o.openEnd);
    for (; c < l.childCount; ) {
      let m = l.child(c), y = d.matchType(m.type);
      if (!y)
        break;
      c++, (c > 1 || a == 0 || m.content.size) && (d = y, u.push(Sc(m.mark(f.allowedMarks(m.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)));
    }
    let p = c == l.childCount;
    p || (h = -1), this.placed = qn(this.placed, t, x.from(u)), this.frontier[t].match = d, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, y = l; m < h; m++) {
      let b = y.lastChild;
      this.frontier.push({ type: b.type, match: b.contentMatchAt(b.childCount) }), y = b.content;
    }
    this.unplaced = p ? e == 0 ? C.empty : new C(Un(o.content, e - 1, 1), e - 1, h < 0 ? o.openEnd : e - 1) : new C(Un(o.content, e, c), o.openStart, o.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !ws(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], s = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), o = ws(e, t, i, r, s);
      if (o) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], u = ws(e, l, c, a, !0);
          if (!u || u.childCount)
            continue e;
        }
        return { depth: t, fit: o, move: s ? e.doc.resolve(e.after(t + 1)) : e };
      }
    }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = qn(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), s = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, s);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = qn(this.placed, this.depth, x.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(x.empty, !0);
    t.childCount && (this.placed = qn(this.placed, this.frontier.length, t));
  }
}
function Un(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Un(n.firstChild.content, e - 1, t)));
}
function qn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(qn(n.lastChild.content, e - 1, t)));
}
function Ss(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Sc(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Sc(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(x.empty, !0)))), n.copy(r);
}
function ws(n, e, t, r, i) {
  let s = n.node(e), o = i ? n.indexAfter(e) : n.index(e);
  if (o == s.childCount && !t.compatibleContent(s.type))
    return null;
  let l = r.fillBefore(s.content, !0, o);
  return l && !hf(t, s.content, o) ? l : null;
}
function hf(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function pf(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function mf(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), s = n.doc.resolve(t);
  if (xc(i, s, r))
    return n.step(new te(e, t, r));
  let o = Tc(i, n.doc.resolve(t));
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
    let h = c[f], p = pf(h.type);
    if (p && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      u = f;
    else if (p || !h.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let h = (f + u + 1) % (r.openStart + 1), p = c[h];
    if (p)
      for (let m = 0; m < o.length; m++) {
        let y = o[(m + a) % o.length], b = !0;
        y < 0 && (b = !1, y = -y);
        let S = i.node(y - 1), w = i.index(y - 1);
        if (S.canReplaceWith(w, w, p.type, p.marks))
          return n.replace(i.before(y), b ? s.after(y) : t, new C(wc(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = o.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let h = o[f];
    h < 0 || (e = i.before(h), t = s.after(h));
  }
}
function wc(n, e, t, r, i) {
  if (e < t) {
    let s = n.firstChild;
    n = n.replaceChild(0, s.copy(wc(s.content, e + 1, t, r, s)));
  }
  if (e > r) {
    let s = i.contentMatchAt(0), o = s.fillBefore(n).append(n);
    n = o.append(s.matchFragment(o).fillBefore(x.empty, !0));
  }
  return n;
}
function gf(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = uf(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new C(x.from(r), 0, 0));
}
function yf(n, e, t) {
  let r = n.doc.resolve(e), i = n.doc.resolve(t), s = Tc(r, i);
  for (let o = 0; o < s.length; o++) {
    let l = s[o], a = o == s.length - 1;
    if (a && l == 0 || r.node(l).type.contentMatch.validEnd)
      return n.delete(r.start(l), i.end(l));
    if (l > 0 && (a || r.node(l - 1).canReplace(r.index(l - 1), i.indexAfter(l - 1))))
      return n.delete(r.before(l), i.after(l));
  }
  for (let o = 1; o <= r.depth && o <= i.depth; o++)
    if (e - r.start(o) == r.depth - o && t > r.end(o) && i.end(o) - t != i.depth - o)
      return n.delete(r.before(o), t);
  n.delete(e, t);
}
function Tc(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let s = n.start(i);
    if (s < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (s == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == s - 1) && t.push(i);
  }
  return t;
}
class Tn extends de {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return X.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let s in t.attrs)
      r[s] = t.attrs[s];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return X.fromReplace(e, this.pos, this.pos + 1, new C(x.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return we.empty;
  }
  invert(e) {
    return new Tn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Tn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Tn(t.pos, t.attr, t.value);
  }
}
de.jsonID("attr", Tn);
class sr extends de {
  /**
  Construct an attribute step.
  */
  constructor(e, t) {
    super(), this.attr = e, this.value = t;
  }
  apply(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      t[i] = e.attrs[i];
    t[this.attr] = this.value;
    let r = e.type.create(t, e.content, e.marks);
    return X.ok(r);
  }
  getMap() {
    return we.empty;
  }
  invert(e) {
    return new sr(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new sr(t.attr, t.value);
  }
}
de.jsonID("docAttr", sr);
let On = class extends Error {
};
On = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
On.prototype = Object.create(Error.prototype);
On.prototype.constructor = On;
On.prototype.name = "TransformError";
class Cc {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Sn();
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
    let t = this.maybeStep(e);
    if (t.failed)
      throw new On(t.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
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
  addStep(e, t) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, t = e, r = C.empty) {
    let i = Zi(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new C(x.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, C.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, t) {
    return this.replaceWith(e, e, t);
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
  replaceRange(e, t, r) {
    return mf(this, e, t, r), this;
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
  replaceRangeWith(e, t, r) {
    return gf(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return yf(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return Qd(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return cf(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return tf(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return nf(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return lf(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Tn(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new sr(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new Ct(e, t)), this;
  }
  /**
  Remove a mark (or a mark of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    if (!(t instanceof K)) {
      let r = this.doc.nodeAt(e);
      if (!r)
        throw new RangeError("No node at position " + e);
      if (t = t.isInSet(r.marks), !t)
        return this;
    }
    return this.step(new Mn(e, t)), this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split.
  */
  split(e, t = 1, r) {
    return af(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return Gd(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return Yd(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return vc(this, e, t, r), this;
  }
}
const Ts = /* @__PURE__ */ Object.create(null);
class P {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new bf(e.min(t), e.max(t))];
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
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
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
  replace(e, t = C.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let s = e.steps.length, o = this.ranges;
    for (let l = 0; l < o.length; l++) {
      let { $from: a, $to: c } = o[l], u = e.mapping.slice(s);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? C.empty : t), l == 0 && Sl(e, s, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, i = this.ranges;
    for (let s = 0; s < i.length; s++) {
      let { $from: o, $to: l } = i[s], a = e.mapping.slice(r), c = a.map(o.pos), u = a.map(l.pos);
      s ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), Sl(e, r, t.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, t, r = !1) {
    let i = e.parent.inlineContent ? new R(e) : gn(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let s = e.depth - 1; s >= 0; s--) {
      let o = t < 0 ? gn(e.node(0), e.node(s), e.before(s + 1), e.index(s), t, r) : gn(e.node(0), e.node(s), e.after(s + 1), e.index(s) + 1, t, r);
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
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new We(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return gn(e, e, 0, 0, 1) || new We(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return gn(e, e, e.content.size, e.childCount, -1) || new We(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = Ts[t.type];
    if (!r)
      throw new RangeError(`No selection type ${t.type} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, t) {
    if (e in Ts)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return Ts[e] = t, t.prototype.jsonID = e, t;
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
    return R.between(this.$anchor, this.$head).getBookmark();
  }
}
P.prototype.visible = !0;
class bf {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let kl = !1;
function xl(n) {
  !kl && !n.parent.inlineContent && (kl = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class R extends P {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    xl(e), xl(t), super(e, t);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    if (!r.parent.inlineContent)
      return P.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new R(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = C.empty) {
    if (super.replace(e, t), t == C.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof R && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new es(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new R(e.resolve(t.anchor), e.resolve(t.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, t, r = t) {
    let i = e.resolve(t);
    return new this(i, r == t ? i : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, t, r) {
    let i = e.pos - t.pos;
    if ((!r || i) && (r = i >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let s = P.findFrom(t, r, !0) || P.findFrom(t, -r, !0);
      if (s)
        t = s.$head;
      else
        return P.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (P.findFrom(e, -r, !0) || P.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new R(e, t);
  }
}
P.jsonID("text", R);
class es {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new es(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return R.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class N extends P {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let t = e.nodeAfter, r = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, r), this.node = t;
  }
  map(e, t) {
    let { deleted: r, pos: i } = t.mapResult(this.anchor), s = e.resolve(i);
    return r ? P.near(s) : new N(s);
  }
  content() {
    return new C(x.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof N && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Oo(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new N(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new N(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
N.prototype.visible = !1;
P.jsonID("node", N);
class Oo {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new es(r, r) : new Oo(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && N.isSelectable(r) ? new N(t) : P.near(t);
  }
}
class We extends P {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = C.empty) {
    if (t == C.empty) {
      e.delete(0, e.doc.content.size);
      let r = P.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new We(e);
  }
  map(e) {
    return new We(e);
  }
  eq(e) {
    return e instanceof We;
  }
  getBookmark() {
    return vf;
  }
}
P.jsonID("all", We);
const vf = {
  map() {
    return this;
  },
  resolve(n) {
    return new We(n);
  }
};
function gn(n, e, t, r, i, s = !1) {
  if (e.inlineContent)
    return R.create(n, t);
  for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < e.childCount : o >= 0; o += i) {
    let l = e.child(o);
    if (l.isAtom) {
      if (!s && N.isSelectable(l))
        return N.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = gn(n, l, t + i, i < 0 ? l.childCount : 0, i, s);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Sl(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof te || i instanceof ne))
    return;
  let s = n.mapping.maps[r], o;
  s.forEach((l, a, c, u) => {
    o == null && (o = u);
  }), n.setSelection(P.near(n.doc.resolve(o), t));
}
const wl = 1, zr = 2, Tl = 4;
class kf extends Cc {
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
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | wl) & ~zr, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & wl) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= zr, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return K.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
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
    return (this.updated & zr) > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    super.addStep(e, t), this.updated = this.updated & ~zr, this.storedMarks = null;
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
  replaceSelectionWith(e, t = !0) {
    let r = this.selection;
    return t && (e = e.mark(this.storedMarks || (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || K.none))), r.replaceWith(this, e), this;
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
  insertText(e, t, r) {
    let i = this.doc.type.schema;
    if (t == null)
      return e ? this.replaceSelectionWith(i.text(e), !0) : this.deleteSelection();
    {
      if (r == null && (r = t), r = r ?? t, !e)
        return this.deleteRange(t, r);
      let s = this.storedMarks;
      if (!s) {
        let o = this.doc.resolve(t);
        s = r == t ? o.marks() : o.marksAcross(this.doc.resolve(r));
      }
      return this.replaceRangeWith(t, r, i.text(e, s)), this.selection.empty || this.setSelection(P.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, t) {
    return this.meta[typeof e == "string" ? e : e.key] = t, this;
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
    return this.updated |= Tl, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & Tl) > 0;
  }
}
function Cl(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Jn {
  constructor(e, t, r) {
    this.name = e, this.init = Cl(t.init, r), this.apply = Cl(t.apply, r);
  }
}
const xf = [
  new Jn("doc", {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    }
  }),
  new Jn("selection", {
    init(n, e) {
      return n.selection || P.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    }
  }),
  new Jn("storedMarks", {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, r) {
      return r.selection.$cursor ? n.storedMarks : null;
    }
  }),
  new Jn("scrollToSelection", {
    init() {
      return 0;
    },
    apply(n, e) {
      return n.scrolledIntoView ? e + 1 : e;
    }
  })
];
class Cs {
  constructor(e, t) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = xf.slice(), t && t.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new Jn(r.key, r.spec.state, r));
    });
  }
}
class kn {
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
  filterTransaction(e, t = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != t) {
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
    let t = [e], r = this.applyInner(e), i = null;
    for (; ; ) {
      let s = !1;
      for (let o = 0; o < this.config.plugins.length; o++) {
        let l = this.config.plugins[o];
        if (l.spec.appendTransaction) {
          let a = i ? i[o].n : 0, c = i ? i[o].state : this, u = a < t.length && l.spec.appendTransaction.call(l, a ? t.slice(a) : t, c, r);
          if (u && r.filterTransaction(u, o)) {
            if (u.setMeta("appendedTransaction", e), !i) {
              i = [];
              for (let d = 0; d < this.config.plugins.length; d++)
                i.push(d < o ? { state: r, n: t.length } : { state: this, n: 0 });
            }
            t.push(u), r = r.applyInner(u), s = !0;
          }
          i && (i[o] = { state: r, n: t.length });
        }
      }
      if (!s)
        return { state: r, transactions: t };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let t = new kn(this.config), r = this.config.fields;
    for (let i = 0; i < r.length; i++) {
      let s = r[i];
      t[s.name] = s.apply(e, this[s.name], this, t);
    }
    return t;
  }
  /**
  Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new kf(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let t = new Cs(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new kn(t);
    for (let i = 0; i < t.fields.length; i++)
      r[t.fields[i].name] = t.fields[i].init(e, r);
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
    let t = new Cs(this.schema, e.plugins), r = t.fields, i = new kn(t);
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
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (t.storedMarks = this.storedMarks.map((r) => r.toJSON())), e && typeof e == "object")
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let i = e[r], s = i.spec.state;
        s && s.toJSON && (t[r] = s.toJSON.call(i, this[i.key]));
      }
    return t;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, t, r) {
    if (!t)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let i = new Cs(e.schema, e.plugins), s = new kn(i);
    return i.fields.forEach((o) => {
      if (o.name == "doc")
        s.doc = Gt.fromJSON(e.schema, t.doc);
      else if (o.name == "selection")
        s.selection = P.fromJSON(s.doc, t.selection);
      else if (o.name == "storedMarks")
        t.storedMarks && (s.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
      else {
        if (r)
          for (let l in r) {
            let a = r[l], c = a.spec.state;
            if (a.key == o.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(t, l)) {
              s[o.name] = c.fromJSON.call(a, e, t[l], s);
              return;
            }
          }
        s[o.name] = o.init(e, s);
      }
    }), s;
  }
}
function Mc(n, e, t) {
  for (let r in n) {
    let i = n[r];
    i instanceof Function ? i = i.bind(e) : r == "handleDOMEvents" && (i = Mc(i, e, {})), t[r] = i;
  }
  return t;
}
class be {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && Mc(e.props, this, this.props), this.key = e.key ? e.key.key : Oc("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const Ms = /* @__PURE__ */ Object.create(null);
function Oc(n) {
  return n in Ms ? n + "$" + ++Ms[n] : (Ms[n] = 0, n + "$");
}
class He {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = Oc(e);
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
const oe = function(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}, or = function(n) {
  let e = n.assignedSlot || n.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let Xs = null;
const ut = function(n, e, t) {
  let r = Xs || (Xs = document.createRange());
  return r.setEnd(n, t ?? n.nodeValue.length), r.setStart(n, e || 0), r;
}, Sf = function() {
  Xs = null;
}, tn = function(n, e, t, r) {
  return t && (Ml(n, e, t, r, -1) || Ml(n, e, t, r, 1));
}, wf = /^(img|br|input|textarea|hr)$/i;
function Ml(n, e, t, r, i) {
  for (; ; ) {
    if (n == t && e == r)
      return !0;
    if (e == (i < 0 ? 0 : De(n))) {
      let s = n.parentNode;
      if (!s || s.nodeType != 1 || br(n) || wf.test(n.nodeName) || n.contentEditable == "false")
        return !1;
      e = oe(n) + (i < 0 ? 0 : 1), n = s;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (i < 0 ? -1 : 0)], n.contentEditable == "false")
        return !1;
      e = i < 0 ? De(n) : 0;
    } else
      return !1;
  }
}
function De(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Tf(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e)
      return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e - 1], e = De(n);
    } else if (n.parentNode && !br(n))
      e = oe(n), n = n.parentNode;
    else
      return null;
  }
}
function Cf(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e < n.nodeValue.length)
      return n;
    if (n.nodeType == 1 && e < n.childNodes.length) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e], e = 0;
    } else if (n.parentNode && !br(n))
      e = oe(n) + 1, n = n.parentNode;
    else
      return null;
  }
}
function Mf(n, e, t) {
  for (let r = e == 0, i = e == De(n); r || i; ) {
    if (n == t)
      return !0;
    let s = oe(n);
    if (n = n.parentNode, !n)
      return !1;
    r = r && s == 0, i = i && s == De(n);
  }
}
function br(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const ts = function(n) {
  return n.focusNode && tn(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset);
};
function jt(n, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = n, t.key = t.code = e, t;
}
function Of(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function Ef(n, e, t) {
  if (n.caretPositionFromPoint)
    try {
      let r = n.caretPositionFromPoint(e, t);
      if (r)
        return { node: r.offsetNode, offset: Math.min(De(r.offsetNode), r.offset) };
    } catch {
    }
  if (n.caretRangeFromPoint) {
    let r = n.caretRangeFromPoint(e, t);
    if (r)
      return { node: r.startContainer, offset: Math.min(De(r.startContainer), r.startOffset) };
  }
}
const tt = typeof navigator < "u" ? navigator : null, Ol = typeof document < "u" ? document : null, Lt = tt && tt.userAgent || "", Qs = /Edge\/(\d+)/.exec(Lt), Ec = /MSIE \d/.exec(Lt), Zs = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Lt), ke = !!(Ec || Zs || Qs), Et = Ec ? document.documentMode : Zs ? +Zs[1] : Qs ? +Qs[1] : 0, Ke = !ke && /gecko\/(\d+)/i.test(Lt);
Ke && +(/Firefox\/(\d+)/.exec(Lt) || [0, 0])[1];
const eo = !ke && /Chrome\/(\d+)/.exec(Lt), ue = !!eo, Ac = eo ? +eo[1] : 0, he = !ke && !!tt && /Apple Computer/.test(tt.vendor), En = he && (/Mobile\/\w+/.test(Lt) || !!tt && tt.maxTouchPoints > 2), Ne = En || (tt ? /Mac/.test(tt.platform) : !1), Af = tt ? /Win/.test(tt.platform) : !1, $e = /Android \d/.test(Lt), vr = !!Ol && "webkitFontSmoothing" in Ol.documentElement.style, Nf = vr ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Df(n) {
  let e = n.defaultView && n.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.documentElement.clientWidth,
    top: 0,
    bottom: n.documentElement.clientHeight
  };
}
function at(n, e) {
  return typeof n == "number" ? n : n[e];
}
function If(n) {
  let e = n.getBoundingClientRect(), t = e.width / n.offsetWidth || 1, r = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * r
  };
}
function El(n, e, t) {
  let r = n.someProp("scrollThreshold") || 0, i = n.someProp("scrollMargin") || 5, s = n.dom.ownerDocument;
  for (let o = t || n.dom; o; o = or(o)) {
    if (o.nodeType != 1)
      continue;
    let l = o, a = l == s.body, c = a ? Df(s) : If(l), u = 0, d = 0;
    if (e.top < c.top + at(r, "top") ? d = -(c.top - e.top + at(i, "top")) : e.bottom > c.bottom - at(r, "bottom") && (d = e.bottom - e.top > c.bottom - c.top ? e.top + at(i, "top") - c.top : e.bottom - c.bottom + at(i, "bottom")), e.left < c.left + at(r, "left") ? u = -(c.left - e.left + at(i, "left")) : e.right > c.right - at(r, "right") && (u = e.right - c.right + at(i, "right")), u || d)
      if (a)
        s.defaultView.scrollBy(u, d);
      else {
        let f = l.scrollLeft, h = l.scrollTop;
        d && (l.scrollTop += d), u && (l.scrollLeft += u);
        let p = l.scrollLeft - f, m = l.scrollTop - h;
        e = { left: e.left - p, top: e.top - m, right: e.right - p, bottom: e.bottom - m };
      }
    if (a || /^(fixed|sticky)$/.test(getComputedStyle(o).position))
      break;
  }
}
function Rf(n) {
  let e = n.dom.getBoundingClientRect(), t = Math.max(0, e.top), r, i;
  for (let s = (e.left + e.right) / 2, o = t + 1; o < Math.min(innerHeight, e.bottom); o += 5) {
    let l = n.root.elementFromPoint(s, o);
    if (!l || l == n.dom || !n.dom.contains(l))
      continue;
    let a = l.getBoundingClientRect();
    if (a.top >= t - 20) {
      r = l, i = a.top;
      break;
    }
  }
  return { refDOM: r, refTop: i, stack: Nc(n.dom) };
}
function Nc(n) {
  let e = [], t = n.ownerDocument;
  for (let r = n; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), n != t); r = or(r))
    ;
  return e;
}
function Lf({ refDOM: n, refTop: e, stack: t }) {
  let r = n ? n.getBoundingClientRect().top : 0;
  Dc(t, r == 0 ? 0 : r - e);
}
function Dc(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: r, top: i, left: s } = n[t];
    r.scrollTop != i + e && (r.scrollTop = i + e), r.scrollLeft != s && (r.scrollLeft = s);
  }
}
let fn = null;
function Pf(n) {
  if (n.setActive)
    return n.setActive();
  if (fn)
    return n.focus(fn);
  let e = Nc(n);
  n.focus(fn == null ? {
    get preventScroll() {
      return fn = { preventScroll: !0 }, !0;
    }
  } : void 0), fn || (fn = !1, Dc(e, 0));
}
function Ic(n, e) {
  let t, r = 2e8, i, s = 0, o = e.top, l = e.top, a, c;
  for (let u = n.firstChild, d = 0; u; u = u.nextSibling, d++) {
    let f;
    if (u.nodeType == 1)
      f = u.getClientRects();
    else if (u.nodeType == 3)
      f = ut(u).getClientRects();
    else
      continue;
    for (let h = 0; h < f.length; h++) {
      let p = f[h];
      if (p.top <= o && p.bottom >= l) {
        o = Math.max(p.bottom, o), l = Math.min(p.top, l);
        let m = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
        if (m < r) {
          t = u, r = m, i = m && t.nodeType == 3 ? {
            left: p.right < e.left ? p.right : p.left,
            top: e.top
          } : e, u.nodeType == 1 && m && (s = d + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
          continue;
        }
      } else p.top > e.top && !a && p.left <= e.left && p.right >= e.left && (a = u, c = { left: Math.max(p.left, Math.min(p.right, e.left)), top: p.top });
      !t && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (s = d + 1);
    }
  }
  return !t && a && (t = a, i = c, r = 0), t && t.nodeType == 3 ? Bf(t, i) : !t || r && t.nodeType == 1 ? { node: n, offset: s } : Ic(t, i);
}
function Bf(n, e) {
  let t = n.nodeValue.length, r = document.createRange();
  for (let i = 0; i < t; i++) {
    r.setEnd(n, i + 1), r.setStart(n, i);
    let s = bt(r, 1);
    if (s.top != s.bottom && Eo(e, s))
      return { node: n, offset: i + (e.left >= (s.left + s.right) / 2 ? 1 : 0) };
  }
  return { node: n, offset: 0 };
}
function Eo(n, e) {
  return n.left >= e.left - 1 && n.left <= e.right + 1 && n.top >= e.top - 1 && n.top <= e.bottom + 1;
}
function Hf(n, e) {
  let t = n.parentNode;
  return t && /^li$/i.test(t.nodeName) && e.left < n.getBoundingClientRect().left ? t : n;
}
function zf(n, e, t) {
  let { node: r, offset: i } = Ic(e, t), s = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let o = r.getBoundingClientRect();
    s = o.left != o.right && t.left > (o.left + o.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(r, i, s);
}
function Ff(n, e, t, r) {
  let i = -1;
  for (let s = e, o = !1; s != n.dom; ) {
    let l = n.docView.nearestDesc(s, !0);
    if (!l)
      return null;
    if (l.dom.nodeType == 1 && (l.node.isBlock && l.parent || !l.contentDOM)) {
      let a = l.dom.getBoundingClientRect();
      if (l.node.isBlock && l.parent && (!o && a.left > r.left || a.top > r.top ? i = l.posBefore : (!o && a.right < r.left || a.bottom < r.top) && (i = l.posAfter), o = !0), !l.contentDOM && i < 0 && !l.node.isText)
        return (l.node.isBlock ? r.top < (a.top + a.bottom) / 2 : r.left < (a.left + a.right) / 2) ? l.posBefore : l.posAfter;
    }
    s = l.dom.parentNode;
  }
  return i > -1 ? i : n.docView.posFromDOM(e, t, -1);
}
function Rc(n, e, t) {
  let r = n.childNodes.length;
  if (r && t.top < t.bottom)
    for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - t.top) / (t.bottom - t.top)) - 2)), s = i; ; ) {
      let o = n.childNodes[s];
      if (o.nodeType == 1) {
        let l = o.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let c = l[a];
          if (Eo(e, c))
            return Rc(o, e, c);
        }
      }
      if ((s = (s + 1) % r) == i)
        break;
    }
  return n;
}
function $f(n, e) {
  let t = n.dom.ownerDocument, r, i = 0, s = Ef(t, e.left, e.top);
  s && ({ node: r, offset: i } = s);
  let o = (n.root.elementFromPoint ? n.root : t).elementFromPoint(e.left, e.top), l;
  if (!o || !n.dom.contains(o.nodeType != 1 ? o.parentNode : o)) {
    let c = n.dom.getBoundingClientRect();
    if (!Eo(e, c) || (o = Rc(n.dom, e, c), !o))
      return null;
  }
  if (he)
    for (let c = o; r && c; c = or(c))
      c.draggable && (r = void 0);
  if (o = Hf(o, e), r) {
    if (Ke && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
      let u = r.childNodes[i], d;
      u.nodeName == "IMG" && (d = u.getBoundingClientRect()).right <= e.left && d.bottom > e.top && i++;
    }
    let c;
    vr && i && r.nodeType == 1 && (c = r.childNodes[i - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && i--, r == n.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? l = n.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (l = Ff(n, r, i, e));
  }
  l == null && (l = zf(n, o, e));
  let a = n.docView.nearestDesc(o, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function Al(n) {
  return n.top < n.bottom || n.left < n.right;
}
function bt(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let r = t[e < 0 ? 0 : t.length - 1];
    if (Al(r))
      return r;
  }
  return Array.prototype.find.call(t, Al) || n.getBoundingClientRect();
}
const Vf = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function Lc(n, e, t) {
  let { node: r, offset: i, atom: s } = n.docView.domFromPos(e, t < 0 ? -1 : 1), o = vr || Ke;
  if (r.nodeType == 3)
    if (o && (Vf.test(r.nodeValue) || (t < 0 ? !i : i == r.nodeValue.length))) {
      let a = bt(ut(r, i, i), t);
      if (Ke && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
        let c = bt(ut(r, i - 1, i - 1), -1);
        if (c.top == a.top) {
          let u = bt(ut(r, i, i + 1), -1);
          if (u.top != a.top)
            return Wn(u, u.left < c.left);
        }
      }
      return a;
    } else {
      let a = i, c = i, u = t < 0 ? 1 : -1;
      return t < 0 && !i ? (c++, u = -1) : t >= 0 && i == r.nodeValue.length ? (a--, u = 1) : t < 0 ? a-- : c++, Wn(bt(ut(r, a, c), u), u < 0);
    }
  if (!n.state.doc.resolve(e - (s || 0)).parent.inlineContent) {
    if (s == null && i && (t < 0 || i == De(r))) {
      let a = r.childNodes[i - 1];
      if (a.nodeType == 1)
        return Os(a.getBoundingClientRect(), !1);
    }
    if (s == null && i < De(r)) {
      let a = r.childNodes[i];
      if (a.nodeType == 1)
        return Os(a.getBoundingClientRect(), !0);
    }
    return Os(r.getBoundingClientRect(), t >= 0);
  }
  if (s == null && i && (t < 0 || i == De(r))) {
    let a = r.childNodes[i - 1], c = a.nodeType == 3 ? ut(a, De(a) - (o ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
    if (c)
      return Wn(bt(c, 1), !1);
  }
  if (s == null && i < De(r)) {
    let a = r.childNodes[i];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
      a = a.nextSibling;
    let c = a ? a.nodeType == 3 ? ut(a, 0, o ? 0 : 1) : a.nodeType == 1 ? a : null : null;
    if (c)
      return Wn(bt(c, -1), !0);
  }
  return Wn(bt(r.nodeType == 3 ? ut(r) : r, -t), t >= 0);
}
function Wn(n, e) {
  if (n.width == 0)
    return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function Os(n, e) {
  if (n.height == 0)
    return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function Pc(n, e, t) {
  let r = n.state, i = n.root.activeElement;
  r != e && n.updateState(e), i != n.dom && n.focus();
  try {
    return t();
  } finally {
    r != e && n.updateState(r), i != n.dom && i && i.focus();
  }
}
function jf(n, e, t) {
  let r = e.selection, i = t == "up" ? r.$from : r.$to;
  return Pc(n, e, () => {
    let { node: s } = n.docView.domFromPos(i.pos, t == "up" ? -1 : 1);
    for (; ; ) {
      let l = n.docView.nearestDesc(s, !0);
      if (!l)
        break;
      if (l.node.isBlock) {
        s = l.contentDOM || l.dom;
        break;
      }
      s = l.dom.parentNode;
    }
    let o = Lc(n, i.pos, 1);
    for (let l = s.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1)
        a = l.getClientRects();
      else if (l.nodeType == 3)
        a = ut(l, 0, l.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < a.length; c++) {
        let u = a[c];
        if (u.bottom > u.top + 1 && (t == "up" ? o.top - u.top > (u.bottom - o.top) * 2 : u.bottom - o.bottom > (o.bottom - u.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const Wf = /[\u0590-\u08ac]/;
function Kf(n, e, t) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let i = r.parentOffset, s = !i, o = i == r.parent.content.size, l = n.domSelection();
  return l ? !Wf.test(r.parent.textContent) || !l.modify ? t == "left" || t == "backward" ? s : o : Pc(n, e, () => {
    let { focusNode: a, focusOffset: c, anchorNode: u, anchorOffset: d } = n.domSelectionRange(), f = l.caretBidiLevel;
    l.modify("move", t, "character");
    let h = r.depth ? n.docView.domAfterPos(r.before()) : n.dom, { focusNode: p, focusOffset: m } = n.domSelectionRange(), y = p && !h.contains(p.nodeType == 1 ? p : p.parentNode) || a == p && c == m;
    try {
      l.collapse(u, d), a && (a != u || c != d) && l.extend && l.extend(a, c);
    } catch {
    }
    return f != null && (l.caretBidiLevel = f), y;
  }) : r.pos == r.start() || r.pos == r.end();
}
let Nl = null, Dl = null, Il = !1;
function Uf(n, e, t) {
  return Nl == e && Dl == t ? Il : (Nl = e, Dl = t, Il = t == "up" || t == "down" ? jf(n, e, t) : Kf(n, e, t));
}
const Re = 0, Rl = 1, Kt = 2, nt = 3;
class kr {
  constructor(e, t, r, i) {
    this.parent = e, this.children = t, this.dom = r, this.contentDOM = i, this.dirty = Re, r.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, r) {
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
    for (let t = 0; t < this.children.length; t++)
      e += this.children[t].size;
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
    for (let t = 0, r = this.posAtStart; ; t++) {
      let i = this.children[t];
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
  localPosFromDOM(e, t, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[t - 1];
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
          s = e.childNodes[t];
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
      i = t > oe(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      i = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !1;
            break;
          }
          if (s.previousSibling)
            break;
        }
      if (i == null && t == e.childNodes.length)
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
  nearestDesc(e, t = !1) {
    for (let r = !0, i = e; i; i = i.parentNode) {
      let s = this.getDesc(i), o;
      if (s && (!t || s.node))
        if (r && (o = s.nodeDOM) && !(o.nodeType == 1 ? o.contains(e.nodeType == 1 ? e : e.parentNode) : o == e))
          r = !1;
        else
          return s;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let r = t; r; r = r.parent)
      if (r == this)
        return t;
  }
  posFromDOM(e, t, r) {
    for (let i = e; i; i = i.parentNode) {
      let s = this.getDesc(i);
      if (s)
        return s.localPosFromDOM(e, t, r);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let t = 0, r = 0; t < this.children.length; t++) {
      let i = this.children[t], s = r + i.size;
      if (r == e && s != r) {
        for (; !i.border && i.children.length; )
          i = i.children[0];
        return i;
      }
      if (e < s)
        return i.descAt(e - r - i.border);
      r = s;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, i = 0;
    for (let s = 0; r < this.children.length; r++) {
      let o = this.children[r], l = s + o.size;
      if (l > e || o instanceof Hc) {
        i = e - s;
        break;
      }
      s = l;
    }
    if (i)
      return this.children[r].domFromPos(i - this.children[r].border, t);
    for (let s; r && !(s = this.children[r - 1]).size && s instanceof Bc && s.side >= 0; r--)
      ;
    if (t <= 0) {
      let s, o = !0;
      for (; s = r ? this.children[r - 1] : null, !(!s || s.dom.parentNode == this.contentDOM); r--, o = !1)
        ;
      return s && t && o && !s.border && !s.domAtom ? s.domFromPos(s.size, t) : { node: this.contentDOM, offset: s ? oe(s.dom) + 1 : 0 };
    } else {
      let s, o = !0;
      for (; s = r < this.children.length ? this.children[r] : null, !(!s || s.dom.parentNode == this.contentDOM); r++, o = !1)
        ;
      return s && o && !s.border && !s.domAtom ? s.domFromPos(0, t) : { node: this.contentDOM, offset: s ? oe(s.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, t, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: t, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let i = -1, s = -1;
    for (let o = r, l = 0; ; l++) {
      let a = this.children[l], c = o + a.size;
      if (i == -1 && e <= c) {
        let u = o + a.border;
        if (e >= u && t <= c - a.border && a.node && a.contentDOM && this.contentDOM.contains(a.contentDOM))
          return a.parseRange(e, t, u);
        e = o;
        for (let d = l; d > 0; d--) {
          let f = this.children[d - 1];
          if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(1)) {
            i = oe(f.dom) + 1;
            break;
          }
          e -= f.size;
        }
        i == -1 && (i = 0);
      }
      if (i > -1 && (c > t || l == this.children.length - 1)) {
        t = c;
        for (let u = l + 1; u < this.children.length; u++) {
          let d = this.children[u];
          if (d.size && d.dom.parentNode == this.contentDOM && !d.emptyChildAt(-1)) {
            s = oe(d.dom);
            break;
          }
          t += d.size;
        }
        s == -1 && (s = this.contentDOM.childNodes.length);
        break;
      }
      o = c;
    }
    return { node: this.contentDOM, from: e, to: t, fromOffset: i, toOffset: s };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: r } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || r == t.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return t.childNodes[r];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, t, r, i = !1) {
    let s = Math.min(e, t), o = Math.max(e, t);
    for (let f = 0, h = 0; f < this.children.length; f++) {
      let p = this.children[f], m = h + p.size;
      if (s > h && o < m)
        return p.setSelection(e - h - p.border, t - h - p.border, r, i);
      h = m;
    }
    let l = this.domFromPos(e, e ? -1 : 1), a = t == e ? l : this.domFromPos(t, t ? -1 : 1), c = r.getSelection(), u = !1;
    if ((Ke || he) && e == t) {
      let { node: f, offset: h } = l;
      if (f.nodeType == 3) {
        if (u = !!(h && f.nodeValue[h - 1] == `
`), u && h == f.nodeValue.length)
          for (let p = f, m; p; p = p.parentNode) {
            if (m = p.nextSibling) {
              m.nodeName == "BR" && (l = a = { node: m.parentNode, offset: oe(m) + 1 });
              break;
            }
            let y = p.pmViewDesc;
            if (y && y.node && y.node.isBlock)
              break;
          }
      } else {
        let p = f.childNodes[h - 1];
        u = p && (p.nodeName == "BR" || p.contentEditable == "false");
      }
    }
    if (Ke && c.focusNode && c.focusNode != a.node && c.focusNode.nodeType == 1) {
      let f = c.focusNode.childNodes[c.focusOffset];
      f && f.contentEditable == "false" && (i = !0);
    }
    if (!(i || u && he) && tn(l.node, l.offset, c.anchorNode, c.anchorOffset) && tn(a.node, a.offset, c.focusNode, c.focusOffset))
      return;
    let d = !1;
    if ((c.extend || e == t) && !u) {
      c.collapse(l.node, l.offset);
      try {
        e != t && c.extend(a.node, a.offset), d = !0;
      } catch {
      }
    }
    if (!d) {
      if (e > t) {
        let h = l;
        l = a, a = h;
      }
      let f = document.createRange();
      f.setEnd(a.node, a.offset), f.setStart(l.node, l.offset), c.removeAllRanges(), c.addRange(f);
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
  markDirty(e, t) {
    for (let r = 0, i = 0; i < this.children.length; i++) {
      let s = this.children[i], o = r + s.size;
      if (r == o ? e <= o && t >= r : e < o && t > r) {
        let l = r + s.border, a = o - s.border;
        if (e >= l && t <= a) {
          this.dirty = e == r || t == o ? Kt : Rl, e == l && t == a && (s.contentLost || s.dom.parentNode != this.contentDOM) ? s.dirty = nt : s.markDirty(e - l, t - l);
          return;
        } else
          s.dirty = s.dom == s.contentDOM && s.dom.parentNode == this.contentDOM && !s.children.length ? Kt : nt;
      }
      r = o;
    }
    this.dirty = Kt;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let r = e == 1 ? Kt : Rl;
      t.dirty < r && (t.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class Bc extends kr {
  constructor(e, t, r, i) {
    let s, o = t.type.toDOM;
    if (typeof o == "function" && (o = o(r, () => {
      if (!s)
        return i;
      if (s.parent)
        return s.parent.posBeforeChild(s);
    })), !t.type.spec.raw) {
      if (o.nodeType != 1) {
        let l = document.createElement("span");
        l.appendChild(o), o = l;
      }
      o.contentEditable = "false", o.classList.add("ProseMirror-widget");
    }
    super(e, [], o, null), this.widget = t, this.widget = t, s = this;
  }
  matchesWidget(e) {
    return this.dirty == Re && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
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
  get side() {
    return this.widget.type.side;
  }
}
class qf extends kr {
  constructor(e, t, r, i) {
    super(e, [], t, null), this.textDOM = r, this.text = i;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class nn extends kr {
  constructor(e, t, r, i) {
    super(e, [], r, i), this.mark = t;
  }
  static create(e, t, r, i) {
    let s = i.nodeViews[t.type.name], o = s && s(t, i, r);
    return (!o || !o.dom) && (o = sn.renderSpec(document, t.type.spec.toDOM(t, r), null, t.attrs)), new nn(e, t, o.dom, o.contentDOM || o.dom);
  }
  parseRule() {
    return this.dirty & nt || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != nt && this.mark.eq(e);
  }
  markDirty(e, t) {
    if (super.markDirty(e, t), this.dirty != Re) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = Re;
    }
  }
  slice(e, t, r) {
    let i = nn.create(this.parent, this.mark, !0, r), s = this.children, o = this.size;
    t < o && (s = ro(s, t, o, r)), e > 0 && (s = ro(s, 0, e, r));
    for (let l = 0; l < s.length; l++)
      s[l].parent = i;
    return i.children = s, i;
  }
}
class At extends kr {
  constructor(e, t, r, i, s, o, l, a, c) {
    super(e, [], s, o), this.node = t, this.outerDeco = r, this.innerDeco = i, this.nodeDOM = l;
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
  static create(e, t, r, i, s, o) {
    let l = s.nodeViews[t.type.name], a, c = l && l(t, s, () => {
      if (!a)
        return o;
      if (a.parent)
        return a.parent.posBeforeChild(a);
    }, r, i), u = c && c.dom, d = c && c.contentDOM;
    if (t.isText) {
      if (!u)
        u = document.createTextNode(t.text);
      else if (u.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else u || ({ dom: u, contentDOM: d } = sn.renderSpec(document, t.type.spec.toDOM(t), null, t.attrs));
    !d && !t.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), t.type.spec.draggable && (u.draggable = !0));
    let f = u;
    return u = $c(u, r, t), c ? a = new Jf(e, t, r, i, u, d || null, f, c, s, o + 1) : t.isText ? new ns(e, t, r, i, u, f, s) : new At(e, t, r, i, u, d || null, f, s, o + 1);
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
      for (let t = this.children.length - 1; t >= 0; t--) {
        let r = this.children[t];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => x.empty);
    }
    return e;
  }
  matchesNode(e, t, r) {
    return this.dirty == Re && e.eq(this.node) && no(t, this.outerDeco) && r.eq(this.innerDeco);
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
  updateChildren(e, t) {
    let r = this.node.inlineContent, i = t, s = e.composing ? this.localCompositionInfo(e, t) : null, o = s && s.pos > -1 ? s : null, l = s && s.pos < 0, a = new Gf(this, o && o.node, e);
    Qf(this.node, this.innerDeco, (c, u, d) => {
      c.spec.marks ? a.syncToMarks(c.spec.marks, r, e) : c.type.side >= 0 && !d && a.syncToMarks(u == this.node.childCount ? K.none : this.node.child(u).marks, r, e), a.placeWidget(c, e, i);
    }, (c, u, d, f) => {
      a.syncToMarks(c.marks, r, e);
      let h;
      a.findNodeMatch(c, u, d, f) || l && e.state.selection.from > i && e.state.selection.to < i + c.nodeSize && (h = a.findIndexWithChild(s.node)) > -1 && a.updateNodeAt(c, u, d, h, e) || a.updateNextNode(c, u, d, e, f, i) || a.addNode(c, u, d, e, i), i += c.nodeSize;
    }), a.syncToMarks([], r, e), this.node.isTextblock && a.addTextblockHacks(), a.destroyRest(), (a.changed || this.dirty == Kt) && (o && this.protectLocalComposition(e, o), zc(this.contentDOM, this.children, e), En && Zf(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: r, to: i } = e.state.selection;
    if (!(e.state.selection instanceof R) || r < t || i > t + this.node.content.size)
      return null;
    let s = e.input.compositionNode;
    if (!s || !this.dom.contains(s.parentNode))
      return null;
    if (this.node.inlineContent) {
      let o = s.nodeValue, l = eh(this.node.content, o, r - t, i - t);
      return l < 0 ? null : { node: s, pos: l, text: o };
    } else
      return { node: s, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: t, pos: r, text: i }) {
    if (this.getDesc(t))
      return;
    let s = t;
    for (; s.parentNode != this.contentDOM; s = s.parentNode) {
      for (; s.previousSibling; )
        s.parentNode.removeChild(s.previousSibling);
      for (; s.nextSibling; )
        s.parentNode.removeChild(s.nextSibling);
      s.pmViewDesc && (s.pmViewDesc = void 0);
    }
    let o = new qf(this, s, t, i);
    e.input.compositionNodes.push(o), this.children = ro(this.children, r, r + i.length, e, o);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, t, r, i) {
    return this.dirty == nt || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, r, i), !0);
  }
  updateInner(e, t, r, i) {
    this.updateOuterDeco(t), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(i, this.posAtStart), this.dirty = Re;
  }
  updateOuterDeco(e) {
    if (no(e, this.outerDeco))
      return;
    let t = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = Fc(this.dom, this.nodeDOM, to(this.outerDeco, this.node, t), to(e, this.node, t)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.dom.draggable = !0);
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.dom.removeAttribute("draggable"));
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function Ll(n, e, t, r, i) {
  $c(r, e, n);
  let s = new At(void 0, n, e, t, r, r, r, i, 0);
  return s.contentDOM && s.updateChildren(i, 0), s;
}
class ns extends At {
  constructor(e, t, r, i, s, o, l) {
    super(e, t, r, i, s, null, o, l, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, r, i) {
    return this.dirty == nt || this.dirty != Re && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != Re || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, i.trackWrites == this.nodeDOM && (i.trackWrites = null)), this.node = e, this.dirty = Re, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode)
      if (t == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, t, r) {
    let i = this.node.cut(e, t), s = document.createTextNode(i.text);
    return new ns(this.parent, i, this.outerDeco, this.innerDeco, s, s, r);
  }
  markDirty(e, t) {
    super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = nt);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class Hc extends kr {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == Re && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class Jf extends At {
  constructor(e, t, r, i, s, o, l, a, c, u) {
    super(e, t, r, i, s, o, l, c, u), this.spec = a;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, t, r, i) {
    if (this.dirty == nt)
      return !1;
    if (this.spec.update) {
      let s = this.spec.update(e, t, r);
      return s && this.updateInner(e, t, r, i), s;
    } else return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, r, i);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, r, i) {
    this.spec.setSelection ? this.spec.setSelection(e, t, r) : super.setSelection(e, t, r, i);
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
function zc(n, e, t) {
  let r = n.firstChild, i = !1;
  for (let s = 0; s < e.length; s++) {
    let o = e[s], l = o.dom;
    if (l.parentNode == n) {
      for (; l != r; )
        r = Pl(r), i = !0;
      r = r.nextSibling;
    } else
      i = !0, n.insertBefore(l, r);
    if (o instanceof nn) {
      let a = r ? r.previousSibling : n.lastChild;
      zc(o.contentDOM, o.children, t), r = a ? a.nextSibling : n.firstChild;
    }
  }
  for (; r; )
    r = Pl(r), i = !0;
  i && t.trackWrites == n && (t.trackWrites = null);
}
const Yn = function(n) {
  n && (this.nodeName = n);
};
Yn.prototype = /* @__PURE__ */ Object.create(null);
const Ut = [new Yn()];
function to(n, e, t) {
  if (n.length == 0)
    return Ut;
  let r = t ? Ut[0] : new Yn(), i = [r];
  for (let s = 0; s < n.length; s++) {
    let o = n[s].type.attrs;
    if (o) {
      o.nodeName && i.push(r = new Yn(o.nodeName));
      for (let l in o) {
        let a = o[l];
        a != null && (t && i.length == 1 && i.push(r = new Yn(e.isInline ? "span" : "div")), l == "class" ? r.class = (r.class ? r.class + " " : "") + a : l == "style" ? r.style = (r.style ? r.style + ";" : "") + a : l != "nodeName" && (r[l] = a));
      }
    }
  }
  return i;
}
function Fc(n, e, t, r) {
  if (t == Ut && r == Ut)
    return e;
  let i = e;
  for (let s = 0; s < r.length; s++) {
    let o = r[s], l = t[s];
    if (s) {
      let a;
      l && l.nodeName == o.nodeName && i != n && (a = i.parentNode) && a.nodeName.toLowerCase() == o.nodeName || (a = document.createElement(o.nodeName), a.pmIsDeco = !0, a.appendChild(i), l = Ut[0]), i = a;
    }
    _f(i, l || Ut[0], o);
  }
  return i;
}
function _f(n, e, t) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in t) && n.removeAttribute(r);
  for (let r in t)
    r != "class" && r != "style" && r != "nodeName" && t[r] != e[r] && n.setAttribute(r, t[r]);
  if (e.class != t.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], i = t.class ? t.class.split(" ").filter(Boolean) : [];
    for (let s = 0; s < r.length; s++)
      i.indexOf(r[s]) == -1 && n.classList.remove(r[s]);
    for (let s = 0; s < i.length; s++)
      r.indexOf(i[s]) == -1 && n.classList.add(i[s]);
    n.classList.length == 0 && n.removeAttribute("class");
  }
  if (e.style != t.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, i;
      for (; i = r.exec(e.style); )
        n.style.removeProperty(i[1]);
    }
    t.style && (n.style.cssText += t.style);
  }
}
function $c(n, e, t) {
  return Fc(n, n, Ut, to(e, t, n.nodeType != 1));
}
function no(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].type.eq(e[t].type))
      return !1;
  return !0;
}
function Pl(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class Gf {
  constructor(e, t, r) {
    this.lock = t, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = Yf(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, t) {
    if (e != t) {
      for (let r = e; r < t; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, t - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, t, r) {
    let i = 0, s = this.stack.length >> 1, o = Math.min(s, e.length);
    for (; i < o && (i == s - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1; )
      i++;
    for (; i < s; )
      this.destroyRest(), this.top.dirty = Re, this.index = this.stack.pop(), this.top = this.stack.pop(), s--;
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
        let a = nn.create(this.top, e[s], t, r);
        this.top.children.splice(this.index, 0, a), this.top = a, this.changed = !0;
      }
      this.index = 0, s++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, t, r, i) {
    let s = -1, o;
    if (i >= this.preMatch.index && (o = this.preMatch.matches[i - this.preMatch.index]).parent == this.top && o.matchesNode(e, t, r))
      s = this.top.children.indexOf(o, this.index);
    else
      for (let l = this.index, a = Math.min(this.top.children.length, l + 5); l < a; l++) {
        let c = this.top.children[l];
        if (c.matchesNode(e, t, r) && !this.preMatch.matched.has(c)) {
          s = l;
          break;
        }
      }
    return s < 0 ? !1 : (this.destroyBetween(this.index, s), this.index++, !0);
  }
  updateNodeAt(e, t, r, i, s) {
    let o = this.top.children[i];
    return o.dirty == nt && o.dom == o.contentDOM && (o.dirty = Kt), o.update(e, t, r, s) ? (this.destroyBetween(this.index, i), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let t = e.parentNode;
      if (!t)
        return -1;
      if (t == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let i = this.index; i < this.top.children.length; i++)
            if (this.top.children[i] == r)
              return i;
        }
        return -1;
      }
      e = t;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, t, r, i, s, o) {
    for (let l = this.index; l < this.top.children.length; l++) {
      let a = this.top.children[l];
      if (a instanceof At) {
        let c = this.preMatch.matched.get(a);
        if (c != null && c != s)
          return !1;
        let u = a.dom, d, f = this.isLocked(u) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != nt && no(t, a.outerDeco));
        if (!f && a.update(e, t, r, i))
          return this.destroyBetween(this.index, l), a.dom != u && (this.changed = !0), this.index++, !0;
        if (!f && (d = this.recreateWrapper(a, e, t, r, i, o)))
          return this.top.children[this.index] = d, d.contentDOM && (d.dirty = Kt, d.updateChildren(i, o + 1), d.dirty = Re), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, t, r, i, s, o) {
    if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content))
      return null;
    let l = At.create(this.top, t, r, i, s, o);
    if (l.contentDOM) {
      l.children = e.children, e.children = [];
      for (let a of l.children)
        a.parent = l;
    }
    return e.destroy(), l;
  }
  // Insert the node as a newly created node desc.
  addNode(e, t, r, i, s) {
    let o = At.create(this.top, e, t, r, i, s);
    o.contentDOM && o.updateChildren(i, s + 1), this.top.children.splice(this.index++, 0, o), this.changed = !0;
  }
  placeWidget(e, t, r) {
    let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let s = new Bc(this.top, e, t, r);
      this.top.children.splice(this.index++, 0, s), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], t = this.top;
    for (; e instanceof nn; )
      t = e, e = t.children[t.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof ns) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((he || ue) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let i = new Hc(this.top, [], r, null);
      t != this.top ? t.children.push(i) : t.children.splice(this.index++, 0, i), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function Yf(n, e) {
  let t = e, r = t.children.length, i = n.childCount, s = /* @__PURE__ */ new Map(), o = [];
  e: for (; i > 0; ) {
    let l;
    for (; ; )
      if (r) {
        let c = t.children[r - 1];
        if (c instanceof nn)
          t = c, r = c.children.length;
        else {
          l = c, r--;
          break;
        }
      } else {
        if (t == e)
          break e;
        r = t.parent.children.indexOf(t), t = t.parent;
      }
    let a = l.node;
    if (a) {
      if (a != n.child(i - 1))
        break;
      --i, s.set(l, i), o.push(l);
    }
  }
  return { index: i, matched: s, matches: o.reverse() };
}
function Xf(n, e) {
  return n.type.side - e.type.side;
}
function Qf(n, e, t, r) {
  let i = e.locals(n), s = 0;
  if (i.length == 0) {
    for (let c = 0; c < n.childCount; c++) {
      let u = n.child(c);
      r(u, i, e.forChild(s, u), c), s += u.nodeSize;
    }
    return;
  }
  let o = 0, l = [], a = null;
  for (let c = 0; ; ) {
    let u, d;
    for (; o < i.length && i[o].to == s; ) {
      let y = i[o++];
      y.widget && (u ? (d || (d = [u])).push(y) : u = y);
    }
    if (u)
      if (d) {
        d.sort(Xf);
        for (let y = 0; y < d.length; y++)
          t(d[y], c, !!a);
      } else
        t(u, c, !!a);
    let f, h;
    if (a)
      h = -1, f = a, a = null;
    else if (c < n.childCount)
      h = c, f = n.child(c++);
    else
      break;
    for (let y = 0; y < l.length; y++)
      l[y].to <= s && l.splice(y--, 1);
    for (; o < i.length && i[o].from <= s && i[o].to > s; )
      l.push(i[o++]);
    let p = s + f.nodeSize;
    if (f.isText) {
      let y = p;
      o < i.length && i[o].from < y && (y = i[o].from);
      for (let b = 0; b < l.length; b++)
        l[b].to < y && (y = l[b].to);
      y < p && (a = f.cut(y - s), f = f.cut(0, y - s), p = y, h = -1);
    } else
      for (; o < i.length && i[o].to < p; )
        o++;
    let m = f.isInline && !f.isLeaf ? l.filter((y) => !y.inline) : l.slice();
    r(f, m, e.forChild(s, f), h), s = p;
  }
}
function Zf(n) {
  if (n.nodeName == "UL" || n.nodeName == "OL") {
    let e = n.style.cssText;
    n.style.cssText = e + "; list-style: square !important", window.getComputedStyle(n).listStyle, n.style.cssText = e;
  }
}
function eh(n, e, t, r) {
  for (let i = 0, s = 0; i < n.childCount && s <= r; ) {
    let o = n.child(i++), l = s;
    if (s += o.nodeSize, !o.isText)
      continue;
    let a = o.text;
    for (; i < n.childCount; ) {
      let c = n.child(i++);
      if (s += c.nodeSize, !c.isText)
        break;
      a += c.text;
    }
    if (s >= t) {
      if (s >= r && a.slice(r - e.length - l, r - l) == e)
        return r - e.length;
      let c = l < r ? a.lastIndexOf(e, r - l - 1) : -1;
      if (c >= 0 && c + e.length + l >= t)
        return l + c;
      if (t == r && a.length >= r + e.length - l && a.slice(r - l, r - l + e.length) == e)
        return r;
    }
  }
  return -1;
}
function ro(n, e, t, r, i) {
  let s = [];
  for (let o = 0, l = 0; o < n.length; o++) {
    let a = n[o], c = l, u = l += a.size;
    c >= t || u <= e ? s.push(a) : (c < e && s.push(a.slice(0, e - c, r)), i && (s.push(i), i = void 0), u > t && s.push(a.slice(t - c, a.size, r)));
  }
  return s;
}
function Ao(n, e = null) {
  let t = n.domSelectionRange(), r = n.state.doc;
  if (!t.focusNode)
    return null;
  let i = n.docView.nearestDesc(t.focusNode), s = i && i.size == 0, o = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (o < 0)
    return null;
  let l = r.resolve(o), a, c;
  if (ts(t)) {
    for (a = l; i && !i.node; )
      i = i.parent;
    let u = i.node;
    if (i && u.isAtom && N.isSelectable(u) && i.parent && !(u.isInline && Mf(t.focusNode, t.focusOffset, i.dom))) {
      let d = i.posBefore;
      c = new N(o == d ? l : r.resolve(d));
    }
  } else {
    let u = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (u < 0)
      return null;
    a = r.resolve(u);
  }
  if (!c) {
    let u = e == "pointer" || n.state.selection.head < l.pos && !s ? 1 : -1;
    c = No(n, a, l, u);
  }
  return c;
}
function Vc(n) {
  return n.editable ? n.hasFocus() : Wc(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function ft(n, e = !1) {
  let t = n.state.selection;
  if (jc(n, t), !!Vc(n)) {
    if (!e && n.input.mouseDown && n.input.mouseDown.allowDefault && ue) {
      let r = n.domSelectionRange(), i = n.domObserver.currentSelection;
      if (r.anchorNode && i.anchorNode && tn(r.anchorNode, r.anchorOffset, i.anchorNode, i.anchorOffset)) {
        n.input.mouseDown.delayedSelectionSync = !0, n.domObserver.setCurSelection();
        return;
      }
    }
    if (n.domObserver.disconnectSelection(), n.cursorWrapper)
      nh(n);
    else {
      let { anchor: r, head: i } = t, s, o;
      Bl && !(t instanceof R) && (t.$from.parent.inlineContent || (s = Hl(n, t.from)), !t.empty && !t.$from.parent.inlineContent && (o = Hl(n, t.to))), n.docView.setSelection(r, i, n.root, e), Bl && (s && zl(s), o && zl(o)), t.visible ? n.dom.classList.remove("ProseMirror-hideselection") : (n.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && th(n));
    }
    n.domObserver.setCurSelection(), n.domObserver.connectSelection();
  }
}
const Bl = he || ue && Ac < 63;
function Hl(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0), i = r < t.childNodes.length ? t.childNodes[r] : null, s = r ? t.childNodes[r - 1] : null;
  if (he && i && i.contentEditable == "false")
    return Es(i);
  if ((!i || i.contentEditable == "false") && (!s || s.contentEditable == "false")) {
    if (i)
      return Es(i);
    if (s)
      return Es(s);
  }
}
function Es(n) {
  return n.contentEditable = "true", he && n.draggable && (n.draggable = !1, n.wasDraggable = !0), n;
}
function zl(n) {
  n.contentEditable = "false", n.wasDraggable && (n.draggable = !0, n.wasDraggable = null);
}
function th(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(), r = t.anchorNode, i = t.anchorOffset;
  e.addEventListener("selectionchange", n.input.hideSelectionGuard = () => {
    (t.anchorNode != r || t.anchorOffset != i) && (e.removeEventListener("selectionchange", n.input.hideSelectionGuard), setTimeout(() => {
      (!Vc(n) || n.state.selection.visible) && n.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function nh(n) {
  let e = n.domSelection(), t = document.createRange();
  if (!e)
    return;
  let r = n.cursorWrapper.dom, i = r.nodeName == "IMG";
  i ? t.setStart(r.parentNode, oe(r) + 1) : t.setStart(r, 0), t.collapse(!0), e.removeAllRanges(), e.addRange(t), !i && !n.state.selection.visible && ke && Et <= 11 && (r.disabled = !0, r.disabled = !1);
}
function jc(n, e) {
  if (e instanceof N) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc && (Fl(n), t && t.selectNode(), n.lastSelectedViewDesc = t);
  } else
    Fl(n);
}
function Fl(n) {
  n.lastSelectedViewDesc && (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(), n.lastSelectedViewDesc = void 0);
}
function No(n, e, t, r) {
  return n.someProp("createSelectionBetween", (i) => i(n, e, t)) || R.between(e, t, r);
}
function $l(n) {
  return n.editable && !n.hasFocus() ? !1 : Wc(n);
}
function Wc(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return n.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (n.editable || n.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function rh(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0), t = n.domSelectionRange();
  return tn(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function io(n, e) {
  let { $anchor: t, $head: r } = n.selection, i = e > 0 ? t.max(r) : t.min(r), s = i.parent.inlineContent ? i.depth ? n.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
  return s && P.findFrom(s, e);
}
function vt(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function Vl(n, e, t) {
  let r = n.state.selection;
  if (r instanceof R)
    if (t.indexOf("s") > -1) {
      let { $head: i } = r, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!s || s.isText || !s.isLeaf)
        return !1;
      let o = n.state.doc.resolve(i.pos + s.nodeSize * (e < 0 ? -1 : 1));
      return vt(n, new R(r.$anchor, o));
    } else if (r.empty) {
      if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = io(n.state, e);
        return i && i instanceof N ? vt(n, i) : !1;
      } else if (!(Ne && t.indexOf("m") > -1)) {
        let i = r.$head, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, o;
        if (!s || s.isText)
          return !1;
        let l = e < 0 ? i.pos - s.nodeSize : i.pos;
        return s.isAtom || (o = n.docView.descAt(l)) && !o.contentDOM ? N.isSelectable(s) ? vt(n, new N(e < 0 ? n.state.doc.resolve(i.pos - s.nodeSize) : i)) : vr ? vt(n, new R(n.state.doc.resolve(e < 0 ? l : l + s.nodeSize))) : !1 : !1;
      }
    } else return !1;
  else {
    if (r instanceof N && r.node.isInline)
      return vt(n, new R(e > 0 ? r.$to : r.$from));
    {
      let i = io(n.state, e);
      return i ? vt(n, i) : !1;
    }
  }
}
function ui(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Xn(n, e) {
  let t = n.pmViewDesc;
  return t && t.size == 0 && (e < 0 || n.nextSibling || n.nodeName != "BR");
}
function hn(n, e) {
  return e < 0 ? ih(n) : sh(n);
}
function ih(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i, s, o = !1;
  for (Ke && t.nodeType == 1 && r < ui(t) && Xn(t.childNodes[r], -1) && (o = !0); ; )
    if (r > 0) {
      if (t.nodeType != 1)
        break;
      {
        let l = t.childNodes[r - 1];
        if (Xn(l, -1))
          i = t, s = --r;
        else if (l.nodeType == 3)
          t = l, r = t.nodeValue.length;
        else
          break;
      }
    } else {
      if (Kc(t))
        break;
      {
        let l = t.previousSibling;
        for (; l && Xn(l, -1); )
          i = t.parentNode, s = oe(l), l = l.previousSibling;
        if (l)
          t = l, r = ui(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = 0;
        }
      }
    }
  o ? so(n, t, r) : i && so(n, i, s);
}
function sh(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i = ui(t), s, o;
  for (; ; )
    if (r < i) {
      if (t.nodeType != 1)
        break;
      let l = t.childNodes[r];
      if (Xn(l, 1))
        s = t, o = ++r;
      else
        break;
    } else {
      if (Kc(t))
        break;
      {
        let l = t.nextSibling;
        for (; l && Xn(l, 1); )
          s = l.parentNode, o = oe(l) + 1, l = l.nextSibling;
        if (l)
          t = l, r = 0, i = ui(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = i = 0;
        }
      }
    }
  s && so(n, s, o);
}
function Kc(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function oh(n, e) {
  for (; n && e == n.childNodes.length && !br(n); )
    e = oe(n) + 1, n = n.parentNode;
  for (; n && e < n.childNodes.length; ) {
    let t = n.childNodes[e];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = 0;
  }
}
function lh(n, e) {
  for (; n && !e && !br(n); )
    e = oe(n), n = n.parentNode;
  for (; n && e; ) {
    let t = n.childNodes[e - 1];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = n.childNodes.length;
  }
}
function so(n, e, t) {
  if (e.nodeType != 3) {
    let s, o;
    (o = oh(e, t)) ? (e = o, t = 0) : (s = lh(e, t)) && (e = s, t = s.nodeValue.length);
  }
  let r = n.domSelection();
  if (!r)
    return;
  if (ts(r)) {
    let s = document.createRange();
    s.setEnd(e, t), s.setStart(e, t), r.removeAllRanges(), r.addRange(s);
  } else r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: i } = n;
  setTimeout(() => {
    n.state == i && ft(n);
  }, 50);
}
function jl(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(ue || Af) && t.parent.inlineContent) {
    let i = n.coordsAtPos(e);
    if (e > t.start()) {
      let s = n.coordsAtPos(e - 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left < i.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let s = n.coordsAtPos(e + 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left > i.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(n.dom).direction == "rtl" ? "rtl" : "ltr";
}
function Wl(n, e, t) {
  let r = n.state.selection;
  if (r instanceof R && !r.empty || t.indexOf("s") > -1 || Ne && t.indexOf("m") > -1)
    return !1;
  let { $from: i, $to: s } = r;
  if (!i.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let o = io(n.state, e);
    if (o && o instanceof N)
      return vt(n, o);
  }
  if (!i.parent.inlineContent) {
    let o = e < 0 ? i : s, l = r instanceof We ? P.near(o, e) : P.findFrom(o, e);
    return l ? vt(n, l) : !1;
  }
  return !1;
}
function Kl(n, e) {
  if (!(n.state.selection instanceof R))
    return !0;
  let { $head: t, $anchor: r, empty: i } = n.state.selection;
  if (!t.sameParent(r))
    return !0;
  if (!i)
    return !1;
  if (n.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let s = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (s && !s.isText) {
    let o = n.state.tr;
    return e < 0 ? o.delete(t.pos - s.nodeSize, t.pos) : o.delete(t.pos, t.pos + s.nodeSize), n.dispatch(o), !0;
  }
  return !1;
}
function Ul(n, e, t) {
  n.domObserver.stop(), e.contentEditable = t, n.domObserver.start();
}
function ah(n) {
  if (!he || n.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    Ul(n, r, "true"), setTimeout(() => Ul(n, r, "false"), 20);
  }
  return !1;
}
function ch(n) {
  let e = "";
  return n.ctrlKey && (e += "c"), n.metaKey && (e += "m"), n.altKey && (e += "a"), n.shiftKey && (e += "s"), e;
}
function uh(n, e) {
  let t = e.keyCode, r = ch(e);
  if (t == 8 || Ne && t == 72 && r == "c")
    return Kl(n, -1) || hn(n, -1);
  if (t == 46 && !e.shiftKey || Ne && t == 68 && r == "c")
    return Kl(n, 1) || hn(n, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || Ne && t == 66 && r == "c") {
    let i = t == 37 ? jl(n, n.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return Vl(n, i, r) || hn(n, i);
  } else if (t == 39 || Ne && t == 70 && r == "c") {
    let i = t == 39 ? jl(n, n.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return Vl(n, i, r) || hn(n, i);
  } else {
    if (t == 38 || Ne && t == 80 && r == "c")
      return Wl(n, -1, r) || hn(n, -1);
    if (t == 40 || Ne && t == 78 && r == "c")
      return ah(n) || Wl(n, 1, r) || hn(n, 1);
    if (r == (Ne ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function Uc(n, e) {
  n.someProp("transformCopied", (h) => {
    e = h(e, n);
  });
  let t = [], { content: r, openStart: i, openEnd: s } = e;
  for (; i > 1 && s > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    i--, s--;
    let h = r.firstChild;
    t.push(h.type.name, h.attrs != h.type.defaultAttrs ? h.attrs : null), r = h.content;
  }
  let o = n.someProp("clipboardSerializer") || sn.fromSchema(n.state.schema), l = Xc(), a = l.createElement("div");
  a.appendChild(o.serializeFragment(r, { document: l }));
  let c = a.firstChild, u, d = 0;
  for (; c && c.nodeType == 1 && (u = Yc[c.nodeName.toLowerCase()]); ) {
    for (let h = u.length - 1; h >= 0; h--) {
      let p = l.createElement(u[h]);
      for (; a.firstChild; )
        p.appendChild(a.firstChild);
      a.appendChild(p), d++;
    }
    c = a.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${i} ${s}${d ? ` -${d}` : ""} ${JSON.stringify(t)}`);
  let f = n.someProp("clipboardTextSerializer", (h) => h(e, n)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: a, text: f, slice: e };
}
function qc(n, e, t, r, i) {
  let s = i.parent.type.spec.code, o, l;
  if (!t && !e)
    return null;
  let a = e && (r || s || !t);
  if (a) {
    if (n.someProp("transformPastedText", (f) => {
      e = f(e, s || r, n);
    }), s)
      return e ? new C(x.from(n.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0) : C.empty;
    let d = n.someProp("clipboardTextParser", (f) => f(e, i, r, n));
    if (d)
      l = d;
    else {
      let f = i.marks(), { schema: h } = n.state, p = sn.fromSchema(h);
      o = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let y = o.appendChild(document.createElement("p"));
        m && y.appendChild(p.serializeNode(h.text(m, f)));
      });
    }
  } else
    n.someProp("transformPastedHTML", (d) => {
      t = d(t, n);
    }), o = ph(t), vr && mh(o);
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
  if (l || (l = (n.someProp("clipboardParser") || n.someProp("domParser") || Ot.fromSchema(n.state.schema)).parseSlice(o, {
    preserveWhitespace: !!(a || u),
    context: i,
    ruleFromNode(f) {
      return f.nodeName == "BR" && !f.nextSibling && f.parentNode && !dh.test(f.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    l = gh(ql(l, +u[1], +u[2]), u[4]);
  else if (l = C.maxOpen(fh(l.content, i), !0), l.openStart || l.openEnd) {
    let d = 0, f = 0;
    for (let h = l.content.firstChild; d < l.openStart && !h.type.spec.isolating; d++, h = h.firstChild)
      ;
    for (let h = l.content.lastChild; f < l.openEnd && !h.type.spec.isolating; f++, h = h.lastChild)
      ;
    l = ql(l, d, f);
  }
  return n.someProp("transformPasted", (d) => {
    l = d(l, n);
  }), l;
}
const dh = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function fh(n, e) {
  if (n.childCount < 2)
    return n;
  for (let t = e.depth; t >= 0; t--) {
    let i = e.node(t).contentMatchAt(e.index(t)), s, o = [];
    if (n.forEach((l) => {
      if (!o)
        return;
      let a = i.findWrapping(l.type), c;
      if (!a)
        return o = null;
      if (c = o.length && s.length && _c(a, s, l, o[o.length - 1], 0))
        o[o.length - 1] = c;
      else {
        o.length && (o[o.length - 1] = Gc(o[o.length - 1], s.length));
        let u = Jc(l, a);
        o.push(u), i = i.matchType(u.type), s = a;
      }
    }), o)
      return x.from(o);
  }
  return n;
}
function Jc(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--)
    n = e[r].create(null, x.from(n));
  return n;
}
function _c(n, e, t, r, i) {
  if (i < n.length && i < e.length && n[i] == e[i]) {
    let s = _c(n, e, t, r.lastChild, i + 1);
    if (s)
      return r.copy(r.content.replaceChild(r.childCount - 1, s));
    if (r.contentMatchAt(r.childCount).matchType(i == n.length - 1 ? t.type : n[i + 1]))
      return r.copy(r.content.append(x.from(Jc(t, n, i + 1))));
  }
}
function Gc(n, e) {
  if (e == 0)
    return n;
  let t = n.content.replaceChild(n.childCount - 1, Gc(n.lastChild, e - 1)), r = n.contentMatchAt(n.childCount).fillBefore(x.empty, !0);
  return n.copy(t.append(r));
}
function oo(n, e, t, r, i, s) {
  let o = e < 0 ? n.firstChild : n.lastChild, l = o.content;
  return n.childCount > 1 && (s = 0), i < r - 1 && (l = oo(l, e, t, r, i + 1, s)), i >= t && (l = e < 0 ? o.contentMatchAt(0).fillBefore(l, s <= i).append(l) : l.append(o.contentMatchAt(o.childCount).fillBefore(x.empty, !0))), n.replaceChild(e < 0 ? 0 : n.childCount - 1, o.copy(l));
}
function ql(n, e, t) {
  return e < n.openStart && (n = new C(oo(n.content, -1, e, n.openStart, 0, n.openEnd), e, n.openEnd)), t < n.openEnd && (n = new C(oo(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)), n;
}
const Yc = {
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
let Jl = null;
function Xc() {
  return Jl || (Jl = document.implementation.createHTMLDocument("title"));
}
function hh(n) {
  let e = window.trustedTypes;
  return e ? e.createPolicy("detachedDocument", { createHTML: (t) => t }).createHTML(n) : n;
}
function ph(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = Xc().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(n), i;
  if ((i = r && Yc[r[1].toLowerCase()]) && (n = i.map((s) => "<" + s + ">").join("") + n + i.map((s) => "</" + s + ">").reverse().join("")), t.innerHTML = hh(n), i)
    for (let s = 0; s < i.length; s++)
      t = t.querySelector(i[s]) || t;
  return t;
}
function mh(n) {
  let e = n.querySelectorAll(ue ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), r);
  }
}
function gh(n, e) {
  if (!n.size)
    return n;
  let t = n.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return n;
  }
  let { content: i, openStart: s, openEnd: o } = n;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = t.nodes[r[l]];
    if (!a || a.hasRequiredAttrs())
      break;
    i = x.from(a.create(r[l + 1], i)), s++, o++;
  }
  return new C(i, s, o);
}
const pe = {}, me = {}, yh = { touchstart: !0, touchmove: !0 };
class bh {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "" }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastAndroidDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function vh(n) {
  for (let e in pe) {
    let t = pe[e];
    n.dom.addEventListener(e, n.input.eventHandlers[e] = (r) => {
      xh(n, r) && !Do(n, r) && (n.editable || !(r.type in me)) && t(n, r);
    }, yh[e] ? { passive: !0 } : void 0);
  }
  he && n.dom.addEventListener("input", () => null), lo(n);
}
function Mt(n, e) {
  n.input.lastSelectionOrigin = e, n.input.lastSelectionTime = Date.now();
}
function kh(n) {
  n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  clearTimeout(n.input.composingTimeout), clearTimeout(n.input.lastIOSEnterFallbackTimeout);
}
function lo(n) {
  n.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      n.input.eventHandlers[t] || n.dom.addEventListener(t, n.input.eventHandlers[t] = (r) => Do(n, r));
  });
}
function Do(n, e) {
  return n.someProp("handleDOMEvents", (t) => {
    let r = t[e.type];
    return r ? r(n, e) || e.defaultPrevented : !1;
  });
}
function xh(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function Sh(n, e) {
  !Do(n, e) && pe[e.type] && (n.editable || !(e.type in me)) && pe[e.type](n, e);
}
me.keydown = (n, e) => {
  let t = e;
  if (n.input.shiftKey = t.keyCode == 16 || t.shiftKey, !Zc(n, t) && (n.input.lastKeyCode = t.keyCode, n.input.lastKeyCodeTime = Date.now(), !($e && ue && t.keyCode == 13)))
    if (n.domObserver.selectionChanged(n.domSelectionRange()) ? n.domObserver.flush() : t.keyCode != 229 && n.domObserver.forceFlush(), En && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let r = Date.now();
      n.input.lastIOSEnter = r, n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        n.input.lastIOSEnter == r && (n.someProp("handleKeyDown", (i) => i(n, jt(13, "Enter"))), n.input.lastIOSEnter = 0);
      }, 200);
    } else n.someProp("handleKeyDown", (r) => r(n, t)) || uh(n, t) ? t.preventDefault() : Mt(n, "key");
};
me.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
me.keypress = (n, e) => {
  let t = e;
  if (Zc(n, t) || !t.charCode || t.ctrlKey && !t.altKey || Ne && t.metaKey)
    return;
  if (n.someProp("handleKeyPress", (i) => i(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof R) || !r.$from.sameParent(r.$to)) {
    let i = String.fromCharCode(t.charCode);
    !/[\r\n]/.test(i) && !n.someProp("handleTextInput", (s) => s(n, r.$from.pos, r.$to.pos, i)) && n.dispatch(n.state.tr.insertText(i).scrollIntoView()), t.preventDefault();
  }
};
function rs(n) {
  return { left: n.clientX, top: n.clientY };
}
function wh(n, e) {
  let t = e.x - n.clientX, r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function Io(n, e, t, r, i) {
  if (r == -1)
    return !1;
  let s = n.state.doc.resolve(r);
  for (let o = s.depth + 1; o > 0; o--)
    if (n.someProp(e, (l) => o > s.depth ? l(n, t, s.nodeAfter, s.before(o), i, !0) : l(n, t, s.node(o), s.before(o), i, !1)))
      return !0;
  return !1;
}
function Cn(n, e, t) {
  if (n.focused || n.focus(), n.state.selection.eq(e))
    return;
  let r = n.state.tr.setSelection(e);
  r.setMeta("pointer", !0), n.dispatch(r);
}
function Th(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.doc.resolve(e), r = t.nodeAfter;
  return r && r.isAtom && N.isSelectable(r) ? (Cn(n, new N(t)), !0) : !1;
}
function Ch(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.selection, r, i;
  t instanceof N && (r = t.node);
  let s = n.state.doc.resolve(e);
  for (let o = s.depth + 1; o > 0; o--) {
    let l = o > s.depth ? s.nodeAfter : s.node(o);
    if (N.isSelectable(l)) {
      r && t.$from.depth > 0 && o >= t.$from.depth && s.before(t.$from.depth + 1) == t.$from.pos ? i = s.before(t.$from.depth) : i = s.before(o);
      break;
    }
  }
  return i != null ? (Cn(n, N.create(n.state.doc, i)), !0) : !1;
}
function Mh(n, e, t, r, i) {
  return Io(n, "handleClickOn", e, t, r) || n.someProp("handleClick", (s) => s(n, e, r)) || (i ? Ch(n, t) : Th(n, t));
}
function Oh(n, e, t, r) {
  return Io(n, "handleDoubleClickOn", e, t, r) || n.someProp("handleDoubleClick", (i) => i(n, e, r));
}
function Eh(n, e, t, r) {
  return Io(n, "handleTripleClickOn", e, t, r) || n.someProp("handleTripleClick", (i) => i(n, e, r)) || Ah(n, t, r);
}
function Ah(n, e, t) {
  if (t.button != 0)
    return !1;
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? (Cn(n, R.create(r, 0, r.content.size)), !0) : !1;
  let i = r.resolve(e);
  for (let s = i.depth + 1; s > 0; s--) {
    let o = s > i.depth ? i.nodeAfter : i.node(s), l = i.before(s);
    if (o.inlineContent)
      Cn(n, R.create(r, l + 1, l + 1 + o.content.size));
    else if (N.isSelectable(o))
      Cn(n, N.create(r, l));
    else
      continue;
    return !0;
  }
}
function Ro(n) {
  return di(n);
}
const Qc = Ne ? "metaKey" : "ctrlKey";
pe.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = Ro(n), i = Date.now(), s = "singleClick";
  i - n.input.lastClick.time < 500 && wh(t, n.input.lastClick) && !t[Qc] && (n.input.lastClick.type == "singleClick" ? s = "doubleClick" : n.input.lastClick.type == "doubleClick" && (s = "tripleClick")), n.input.lastClick = { time: i, x: t.clientX, y: t.clientY, type: s };
  let o = n.posAtCoords(rs(t));
  o && (s == "singleClick" ? (n.input.mouseDown && n.input.mouseDown.done(), n.input.mouseDown = new Nh(n, o, t, !!r)) : (s == "doubleClick" ? Oh : Eh)(n, o.pos, o.inside, t) ? t.preventDefault() : Mt(n, "pointer"));
};
class Nh {
  constructor(e, t, r, i) {
    this.view = e, this.pos = t, this.event = r, this.flushed = i, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!r[Qc], this.allowDefault = r.shiftKey;
    let s, o;
    if (t.inside > -1)
      s = e.state.doc.nodeAt(t.inside), o = t.inside;
    else {
      let u = e.state.doc.resolve(t.pos);
      s = u.parent, o = u.depth ? u.before() : 0;
    }
    const l = i ? null : r.target, a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a && a.dom.nodeType == 1 ? a.dom : null;
    let { selection: c } = e.state;
    (r.button == 0 && s.type.spec.draggable && s.type.spec.selectable !== !1 || c instanceof N && c.from <= o && c.to > o) && (this.mightDrag = {
      node: s,
      pos: o,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && Ke && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), Mt(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => ft(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(rs(e))), this.updateAllowDefault(e), this.allowDefault || !t ? Mt(this.view, "pointer") : Mh(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    he && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    ue && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (Cn(this.view, P.near(this.view.state.doc.resolve(t.pos))), e.preventDefault()) : Mt(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), Mt(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
pe.touchstart = (n) => {
  n.input.lastTouch = Date.now(), Ro(n), Mt(n, "pointer");
};
pe.touchmove = (n) => {
  n.input.lastTouch = Date.now(), Mt(n, "pointer");
};
pe.contextmenu = (n) => Ro(n);
function Zc(n, e) {
  return n.composing ? !0 : he && Math.abs(e.timeStamp - n.input.compositionEndedAt) < 500 ? (n.input.compositionEndedAt = -2e8, !0) : !1;
}
const Dh = $e ? 5e3 : -1;
me.compositionstart = me.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n, t = e.selection.$to;
    if (e.selection instanceof R && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1)))
      n.markCursor = n.state.storedMarks || t.marks(), di(n, !0), n.markCursor = null;
    else if (di(n, !e.selection.empty), Ke && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
      let r = n.domSelectionRange();
      for (let i = r.focusNode, s = r.focusOffset; i && i.nodeType == 1 && s != 0; ) {
        let o = s < 0 ? i.lastChild : i.childNodes[s - 1];
        if (!o)
          break;
        if (o.nodeType == 3) {
          let l = n.domSelection();
          l && l.collapse(o, o.nodeValue.length);
          break;
        } else
          i = o, s = -1;
      }
    }
    n.input.composing = !0;
  }
  eu(n, Dh);
};
me.compositionend = (n, e) => {
  n.composing && (n.input.composing = !1, n.input.compositionEndedAt = e.timeStamp, n.input.compositionPendingChanges = n.domObserver.pendingRecords().length ? n.input.compositionID : 0, n.input.compositionNode = null, n.input.compositionPendingChanges && Promise.resolve().then(() => n.domObserver.flush()), n.input.compositionID++, eu(n, 20));
};
function eu(n, e) {
  clearTimeout(n.input.composingTimeout), e > -1 && (n.input.composingTimeout = setTimeout(() => di(n), e));
}
function tu(n) {
  for (n.composing && (n.input.composing = !1, n.input.compositionEndedAt = Rh()); n.input.compositionNodes.length > 0; )
    n.input.compositionNodes.pop().markParentsDirty();
}
function Ih(n) {
  let e = n.domSelectionRange();
  if (!e.focusNode)
    return null;
  let t = Tf(e.focusNode, e.focusOffset), r = Cf(e.focusNode, e.focusOffset);
  if (t && r && t != r) {
    let i = r.pmViewDesc, s = n.domObserver.lastChangedTextNode;
    if (t == s || r == s)
      return s;
    if (!i || !i.isText(r.nodeValue))
      return r;
    if (n.input.compositionNode == r) {
      let o = t.pmViewDesc;
      if (!(!o || !o.isText(t.nodeValue)))
        return r;
    }
  }
  return t || r;
}
function Rh() {
  let n = document.createEvent("Event");
  return n.initEvent("event", !0, !0), n.timeStamp;
}
function di(n, e = !1) {
  if (!($e && n.domObserver.flushingSoon >= 0)) {
    if (n.domObserver.forceFlush(), tu(n), e || n.docView && n.docView.dirty) {
      let t = Ao(n);
      return t && !t.eq(n.state.selection) ? n.dispatch(n.state.tr.setSelection(t)) : (n.markCursor || e) && !n.state.selection.empty ? n.dispatch(n.state.tr.deleteSelection()) : n.updateState(n.state), !0;
    }
    return !1;
  }
}
function Lh(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), i = document.createRange();
  i.selectNodeContents(e), n.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), n.focus();
  }, 50);
}
const lr = ke && Et < 15 || En && Nf < 604;
pe.copy = me.cut = (n, e) => {
  let t = e, r = n.state.selection, i = t.type == "cut";
  if (r.empty)
    return;
  let s = lr ? null : t.clipboardData, o = r.content(), { dom: l, text: a } = Uc(n, o);
  s ? (t.preventDefault(), s.clearData(), s.setData("text/html", l.innerHTML), s.setData("text/plain", a)) : Lh(n, l), i && n.dispatch(n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function Ph(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1 ? n.content.firstChild : null;
}
function Bh(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code, r = n.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let i = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(), r.parentNode && r.parentNode.removeChild(r), t ? ar(n, r.value, null, i, e) : ar(n, r.textContent, r.innerHTML, i, e);
  }, 50);
}
function ar(n, e, t, r, i) {
  let s = qc(n, e, t, r, n.state.selection.$from);
  if (n.someProp("handlePaste", (a) => a(n, i, s || C.empty)))
    return !0;
  if (!s)
    return !1;
  let o = Ph(s), l = o ? n.state.tr.replaceSelectionWith(o, r) : n.state.tr.replaceSelection(s);
  return n.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function nu(n) {
  let e = n.getData("text/plain") || n.getData("Text");
  if (e)
    return e;
  let t = n.getData("text/uri-list");
  return t ? t.replace(/\r?\n/g, " ") : "";
}
me.paste = (n, e) => {
  let t = e;
  if (n.composing && !$e)
    return;
  let r = lr ? null : t.clipboardData, i = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && ar(n, nu(r), r.getData("text/html"), i, t) ? t.preventDefault() : Bh(n, t);
};
class ru {
  constructor(e, t, r) {
    this.slice = e, this.move = t, this.node = r;
  }
}
const iu = Ne ? "altKey" : "ctrlKey";
pe.dragstart = (n, e) => {
  let t = e, r = n.input.mouseDown;
  if (r && r.done(), !t.dataTransfer)
    return;
  let i = n.state.selection, s = i.empty ? null : n.posAtCoords(rs(t)), o;
  if (!(s && s.pos >= i.from && s.pos <= (i instanceof N ? i.to - 1 : i.to))) {
    if (r && r.mightDrag)
      o = N.create(n.state.doc, r.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let d = n.docView.nearestDesc(t.target, !0);
      d && d.node.type.spec.draggable && d != n.docView && (o = N.create(n.state.doc, d.posBefore));
    }
  }
  let l = (o || n.state.selection).content(), { dom: a, text: c, slice: u } = Uc(n, l);
  (!t.dataTransfer.files.length || !ue || Ac > 120) && t.dataTransfer.clearData(), t.dataTransfer.setData(lr ? "Text" : "text/html", a.innerHTML), t.dataTransfer.effectAllowed = "copyMove", lr || t.dataTransfer.setData("text/plain", c), n.dragging = new ru(u, !t[iu], o);
};
pe.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
me.dragover = me.dragenter = (n, e) => e.preventDefault();
me.drop = (n, e) => {
  let t = e, r = n.dragging;
  if (n.dragging = null, !t.dataTransfer)
    return;
  let i = n.posAtCoords(rs(t));
  if (!i)
    return;
  let s = n.state.doc.resolve(i.pos), o = r && r.slice;
  o ? n.someProp("transformPasted", (p) => {
    o = p(o, n);
  }) : o = qc(n, nu(t.dataTransfer), lr ? null : t.dataTransfer.getData("text/html"), !1, s);
  let l = !!(r && !t[iu]);
  if (n.someProp("handleDrop", (p) => p(n, t, o || C.empty, l))) {
    t.preventDefault();
    return;
  }
  if (!o)
    return;
  t.preventDefault();
  let a = o ? df(n.state.doc, s.pos, o) : s.pos;
  a == null && (a = s.pos);
  let c = n.state.tr;
  if (l) {
    let { node: p } = r;
    p ? p.replace(c) : c.deleteSelection();
  }
  let u = c.mapping.map(a), d = o.openStart == 0 && o.openEnd == 0 && o.content.childCount == 1, f = c.doc;
  if (d ? c.replaceRangeWith(u, u, o.content.firstChild) : c.replaceRange(u, u, o), c.doc.eq(f))
    return;
  let h = c.doc.resolve(u);
  if (d && N.isSelectable(o.content.firstChild) && h.nodeAfter && h.nodeAfter.sameMarkup(o.content.firstChild))
    c.setSelection(new N(h));
  else {
    let p = c.mapping.map(a);
    c.mapping.maps[c.mapping.maps.length - 1].forEach((m, y, b, S) => p = S), c.setSelection(No(n, h, c.doc.resolve(p)));
  }
  n.focus(), n.dispatch(c.setMeta("uiEvent", "drop"));
};
pe.focus = (n) => {
  n.input.lastFocus = Date.now(), n.focused || (n.domObserver.stop(), n.dom.classList.add("ProseMirror-focused"), n.domObserver.start(), n.focused = !0, setTimeout(() => {
    n.docView && n.hasFocus() && !n.domObserver.currentSelection.eq(n.domSelectionRange()) && ft(n);
  }, 20));
};
pe.blur = (n, e) => {
  let t = e;
  n.focused && (n.domObserver.stop(), n.dom.classList.remove("ProseMirror-focused"), n.domObserver.start(), t.relatedTarget && n.dom.contains(t.relatedTarget) && n.domObserver.currentSelection.clear(), n.focused = !1);
};
pe.beforeinput = (n, e) => {
  if (ue && $e && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (n.input.domChangeCount != r || (n.dom.blur(), n.focus(), n.someProp("handleKeyDown", (s) => s(n, jt(8, "Backspace")))))
        return;
      let { $cursor: i } = n.state.selection;
      i && i.pos > 0 && n.dispatch(n.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in me)
  pe[n] = me[n];
function cr(n, e) {
  if (n == e)
    return !0;
  for (let t in n)
    if (n[t] !== e[t])
      return !1;
  for (let t in e)
    if (!(t in n))
      return !1;
  return !0;
}
class fi {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || Yt, this.side = this.spec.side || 0;
  }
  map(e, t, r, i) {
    let { pos: s, deleted: o } = e.mapResult(t.from + i, this.side < 0 ? -1 : 1);
    return o ? null : new Ie(s - r, s - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof fi && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && cr(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class Nt {
  constructor(e, t) {
    this.attrs = e, this.spec = t || Yt;
  }
  map(e, t, r, i) {
    let s = e.map(t.from + i, this.spec.inclusiveStart ? -1 : 1) - r, o = e.map(t.to + i, this.spec.inclusiveEnd ? 1 : -1) - r;
    return s >= o ? null : new Ie(s, o, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof Nt && cr(this.attrs, e.attrs) && cr(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof Nt;
  }
  destroy() {
  }
}
class Lo {
  constructor(e, t) {
    this.attrs = e, this.spec = t || Yt;
  }
  map(e, t, r, i) {
    let s = e.mapResult(t.from + i, 1);
    if (s.deleted)
      return null;
    let o = e.mapResult(t.to + i, -1);
    return o.deleted || o.pos <= s.pos ? null : new Ie(s.pos - r, o.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: i } = e.content.findIndex(t.from), s;
    return i == t.from && !(s = e.child(r)).isText && i + s.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof Lo && cr(this.attrs, e.attrs) && cr(this.spec, e.spec);
  }
  destroy() {
  }
}
class Ie {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.from = e, this.to = t, this.type = r;
  }
  /**
  @internal
  */
  copy(e, t) {
    return new Ie(e, t, this.type);
  }
  /**
  @internal
  */
  eq(e, t = 0) {
    return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
  }
  /**
  @internal
  */
  map(e, t, r) {
    return this.type.map(e, this, t, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, t, r) {
    return new Ie(e, e, new fi(t, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, t, r, i) {
    return new Ie(e, t, new Nt(r, i));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, t, r, i) {
    return new Ie(e, t, new Lo(r, i));
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
    return this.type instanceof Nt;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof fi;
  }
}
const yn = [], Yt = {};
class Z {
  /**
  @internal
  */
  constructor(e, t) {
    this.local = e.length ? e : yn, this.children = t.length ? t : yn;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, t) {
    return t.length ? hi(t, e, 0, Yt) : ce;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, t, r) {
    let i = [];
    return this.findInner(e ?? 0, t ?? 1e9, i, 0, r), i;
  }
  findInner(e, t, r, i, s) {
    for (let o = 0; o < this.local.length; o++) {
      let l = this.local[o];
      l.from <= t && l.to >= e && (!s || s(l.spec)) && r.push(l.copy(l.from + i, l.to + i));
    }
    for (let o = 0; o < this.children.length; o += 3)
      if (this.children[o] < t && this.children[o + 1] > e) {
        let l = this.children[o] + 1;
        this.children[o + 2].findInner(e - l, t - l, r, i + l, s);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, t, r) {
    return this == ce || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, r || Yt);
  }
  /**
  @internal
  */
  mapInner(e, t, r, i, s) {
    let o;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, i);
      a && a.type.valid(t, a) ? (o || (o = [])).push(a) : s.onRemove && s.onRemove(this.local[l].spec);
    }
    return this.children.length ? Hh(this.children, o || [], e, t, r, i, s) : o ? new Z(o.sort(Xt), yn) : ce;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, t) {
    return t.length ? this == ce ? Z.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, r) {
    let i, s = 0;
    e.forEach((l, a) => {
      let c = a + r, u;
      if (u = ou(t, l, c)) {
        for (i || (i = this.children.slice()); s < i.length && i[s] < a; )
          s += 3;
        i[s] == a ? i[s + 2] = i[s + 2].addInner(l, u, c + 1) : i.splice(s, 0, a, a + l.nodeSize, hi(u, l, c + 1, Yt)), s += 3;
      }
    });
    let o = su(s ? lu(t) : t, -r);
    for (let l = 0; l < o.length; l++)
      o[l].type.valid(e, o[l]) || o.splice(l--, 1);
    return new Z(o.length ? this.local.concat(o).sort(Xt) : this.local, i || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == ce ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let r = this.children, i = this.local;
    for (let s = 0; s < r.length; s += 3) {
      let o, l = r[s] + t, a = r[s + 1] + t;
      for (let u = 0, d; u < e.length; u++)
        (d = e[u]) && d.from > l && d.to < a && (e[u] = null, (o || (o = [])).push(d));
      if (!o)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[s + 2].removeInner(o, l + 1);
      c != ce ? r[s + 2] = c : (r.splice(s, 3), s -= 3);
    }
    if (i.length) {
      for (let s = 0, o; s < e.length; s++)
        if (o = e[s])
          for (let l = 0; l < i.length; l++)
            i[l].eq(o, t) && (i == this.local && (i = this.local.slice()), i.splice(l--, 1));
    }
    return r == this.children && i == this.local ? this : i.length || r.length ? new Z(i, r) : ce;
  }
  forChild(e, t) {
    if (this == ce)
      return this;
    if (t.isLeaf)
      return Z.empty;
    let r, i;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let s = e + 1, o = s + t.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < o && a.to > s && a.type instanceof Nt) {
        let c = Math.max(s, a.from) - s, u = Math.min(o, a.to) - s;
        c < u && (i || (i = [])).push(a.copy(c, u));
      }
    }
    if (i) {
      let l = new Z(i.sort(Xt), yn);
      return r ? new St([l, r]) : l;
    }
    return r || ce;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof Z) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t]))
        return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return Po(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == ce)
      return yn;
    if (e.inlineContent || !this.local.some(Nt.is))
      return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof Nt || t.push(this.local[r]);
    return t;
  }
  forEachSet(e) {
    e(this);
  }
}
Z.empty = new Z([], []);
Z.removeOverlap = Po;
const ce = Z.empty;
class St {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map((i) => i.map(e, t, Yt));
    return St.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return Z.empty;
    let r = [];
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].forChild(e, t);
      s != ce && (s instanceof St ? r = r.concat(s.members) : r.push(s));
    }
    return St.from(r);
  }
  eq(e) {
    if (!(e instanceof St) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t]))
        return !1;
    return !0;
  }
  locals(e) {
    let t, r = !0;
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].localsInner(e);
      if (s.length)
        if (!t)
          t = s;
        else {
          r && (t = t.slice(), r = !1);
          for (let o = 0; o < s.length; o++)
            t.push(s[o]);
        }
    }
    return t ? Po(r ? t : t.sort(Xt)) : yn;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return ce;
      case 1:
        return e[0];
      default:
        return new St(e.every((t) => t instanceof Z) ? e : e.reduce((t, r) => t.concat(r instanceof Z ? r : r.members), []));
    }
  }
  forEachSet(e) {
    for (let t = 0; t < this.members.length; t++)
      this.members[t].forEachSet(e);
  }
}
function Hh(n, e, t, r, i, s, o) {
  let l = n.slice();
  for (let c = 0, u = s; c < t.maps.length; c++) {
    let d = 0;
    t.maps[c].forEach((f, h, p, m) => {
      let y = m - p - (h - f);
      for (let b = 0; b < l.length; b += 3) {
        let S = l[b + 1];
        if (S < 0 || f > S + u - d)
          continue;
        let w = l[b] + u - d;
        h >= w ? l[b + 1] = f <= w ? -2 : -1 : f >= u && y && (l[b] += y, l[b + 1] += y);
      }
      d += y;
    }), u = t.maps[c].map(u, -1);
  }
  let a = !1;
  for (let c = 0; c < l.length; c += 3)
    if (l[c + 1] < 0) {
      if (l[c + 1] == -2) {
        a = !0, l[c + 1] = -1;
        continue;
      }
      let u = t.map(n[c] + s), d = u - i;
      if (d < 0 || d >= r.content.size) {
        a = !0;
        continue;
      }
      let f = t.map(n[c + 1] + s, -1), h = f - i, { index: p, offset: m } = r.content.findIndex(d), y = r.maybeChild(p);
      if (y && m == d && m + y.nodeSize == h) {
        let b = l[c + 2].mapInner(t, y, u + 1, n[c] + s + 1, o);
        b != ce ? (l[c] = d, l[c + 1] = h, l[c + 2] = b) : (l[c + 1] = -2, a = !0);
      } else
        a = !0;
    }
  if (a) {
    let c = zh(l, n, e, t, i, s, o), u = hi(c, r, 0, o);
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
  return new Z(e.sort(Xt), l);
}
function su(n, e) {
  if (!e || !n.length)
    return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let i = n[r];
    t.push(new Ie(i.from + e, i.to + e, i.type));
  }
  return t;
}
function zh(n, e, t, r, i, s, o) {
  function l(a, c) {
    for (let u = 0; u < a.local.length; u++) {
      let d = a.local[u].map(r, i, c);
      d ? t.push(d) : o.onRemove && o.onRemove(a.local[u].spec);
    }
    for (let u = 0; u < a.children.length; u += 3)
      l(a.children[u + 2], a.children[u] + c + 1);
  }
  for (let a = 0; a < n.length; a += 3)
    n[a + 1] == -1 && l(n[a + 2], e[a] + s + 1);
  return t;
}
function ou(n, e, t) {
  if (e.isLeaf)
    return null;
  let r = t + e.nodeSize, i = null;
  for (let s = 0, o; s < n.length; s++)
    (o = n[s]) && o.from > t && o.to < r && ((i || (i = [])).push(o), n[s] = null);
  return i;
}
function lu(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    n[t] != null && e.push(n[t]);
  return e;
}
function hi(n, e, t, r) {
  let i = [], s = !1;
  e.forEach((l, a) => {
    let c = ou(n, l, a + t);
    if (c) {
      s = !0;
      let u = hi(c, l, t + a + 1, r);
      u != ce && i.push(a, a + l.nodeSize, u);
    }
  });
  let o = su(s ? lu(n) : n, -t).sort(Xt);
  for (let l = 0; l < o.length; l++)
    o[l].type.valid(e, o[l]) || (r.onRemove && r.onRemove(o[l].spec), o.splice(l--, 1));
  return o.length || i.length ? new Z(o, i) : ce;
}
function Xt(n, e) {
  return n.from - e.from || n.to - e.to;
}
function Po(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let i = t + 1; i < e.length; i++) {
        let s = e[i];
        if (s.from == r.from) {
          s.to != r.to && (e == n && (e = n.slice()), e[i] = s.copy(s.from, r.to), _l(e, i + 1, s.copy(r.to, s.to)));
          continue;
        } else {
          s.from < r.to && (e == n && (e = n.slice()), e[t] = r.copy(r.from, s.from), _l(e, i, r.copy(s.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function _l(n, e, t) {
  for (; e < n.length && Xt(t, n[e]) > 0; )
    e++;
  n.splice(e, 0, t);
}
function As(n) {
  let e = [];
  return n.someProp("decorations", (t) => {
    let r = t(n.state);
    r && r != ce && e.push(r);
  }), n.cursorWrapper && e.push(Z.create(n.state.doc, [n.cursorWrapper.deco])), St.from(e);
}
const Fh = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, $h = ke && Et <= 11;
class Vh {
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
class jh {
  constructor(e, t) {
    this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new Vh(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let i = 0; i < r.length; i++)
        this.queue.push(r[i]);
      ke && Et <= 11 && r.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), $h && (this.onCharData = (r) => {
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
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, Fh)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++)
          this.queue.push(e[t]);
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
    if ($l(this.view)) {
      if (this.suppressingSelectionUpdates)
        return ft(this.view);
      if (ke && Et <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && tn(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
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
    let t = /* @__PURE__ */ new Set(), r;
    for (let s = e.focusNode; s; s = or(s))
      t.add(s);
    for (let s = e.anchorNode; s; s = or(s))
      if (t.has(s)) {
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
  selectionChanged(e) {
    return !this.suppressingSelectionUpdates && !this.currentSelection.eq(e) && $l(this.view) && !this.ignoreSelectionChange(e);
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let r = e.domSelectionRange(), i = this.selectionChanged(r), s = -1, o = -1, l = !1, a = [];
    if (e.editable)
      for (let u = 0; u < t.length; u++) {
        let d = this.registerMutation(t[u], a);
        d && (s = s < 0 ? d.from : Math.min(d.from, s), o = o < 0 ? d.to : Math.max(d.to, o), d.typeOver && (l = !0));
      }
    if (Ke && a.length) {
      let u = a.filter((d) => d.nodeName == "BR");
      if (u.length == 2) {
        let [d, f] = u;
        d.parentNode && d.parentNode.parentNode == f.parentNode ? f.remove() : d.remove();
      } else {
        let { focusNode: d } = this.currentSelection;
        for (let f of u) {
          let h = f.parentNode;
          h && h.nodeName == "LI" && (!d || Uh(e, d) != h) && f.remove();
        }
      }
    }
    let c = null;
    s < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && ts(r) && (c = Ao(e)) && c.eq(P.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, ft(e), this.currentSelection.set(r), e.scrollToSelection()) : (s > -1 || i) && (s > -1 && (e.docView.markDirty(s, o), Wh(e)), this.handleDOMChange(s, o, l, a), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || ft(e), this.currentSelection.set(r));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let u = 0; u < e.addedNodes.length; u++) {
        let d = e.addedNodes[u];
        t.push(d), d.nodeType == 3 && (this.lastChangedTextNode = d);
      }
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let i = e.previousSibling, s = e.nextSibling;
      if (ke && Et <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: d, nextSibling: f } = e.addedNodes[u];
          (!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) && (i = d), (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (s = f);
        }
      let o = i && i.parentNode == e.target ? oe(i) + 1 : 0, l = r.localPosFromDOM(e.target, o, -1), a = s && s.parentNode == e.target ? oe(s) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, a, 1);
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
let Gl = /* @__PURE__ */ new WeakMap(), Yl = !1;
function Wh(n) {
  if (!Gl.has(n) && (Gl.set(n, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(n.dom).whiteSpace) !== -1)) {
    if (n.requiresGeckoHackNode = Ke, Yl)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), Yl = !0;
  }
}
function Xl(n, e) {
  let t = e.startContainer, r = e.startOffset, i = e.endContainer, s = e.endOffset, o = n.domAtPos(n.state.selection.anchor);
  return tn(o.node, o.offset, i, s) && ([t, r, i, s] = [i, s, t, r]), { anchorNode: t, anchorOffset: r, focusNode: i, focusOffset: s };
}
function Kh(n, e) {
  if (e.getComposedRanges) {
    let i = e.getComposedRanges(n.root)[0];
    if (i)
      return Xl(n, i);
  }
  let t;
  function r(i) {
    i.preventDefault(), i.stopImmediatePropagation(), t = i.getTargetRanges()[0];
  }
  return n.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), n.dom.removeEventListener("beforeinput", r, !0), t ? Xl(n, t) : null;
}
function Uh(n, e) {
  for (let t = e.parentNode; t && t != n.dom; t = t.parentNode) {
    let r = n.docView.nearestDesc(t, !0);
    if (r && r.node.isBlock)
      return t;
  }
  return null;
}
function qh(n, e, t) {
  let { node: r, fromOffset: i, toOffset: s, from: o, to: l } = n.docView.parseRange(e, t), a = n.domSelectionRange(), c, u = a.anchorNode;
  if (u && n.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (c = [{ node: u, offset: a.anchorOffset }], ts(a) || c.push({ node: a.focusNode, offset: a.focusOffset })), ue && n.input.lastKeyCode === 8)
    for (let y = s; y > i; y--) {
      let b = r.childNodes[y - 1], S = b.pmViewDesc;
      if (b.nodeName == "BR" && !S) {
        s = y;
        break;
      }
      if (!S || S.size)
        break;
    }
  let d = n.state.doc, f = n.someProp("domParser") || Ot.fromSchema(n.state.schema), h = d.resolve(o), p = null, m = f.parse(r, {
    topNode: h.parent,
    topMatch: h.parent.contentMatchAt(h.index()),
    topOpen: !0,
    from: i,
    to: s,
    preserveWhitespace: h.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: Jh,
    context: h
  });
  if (c && c[0].pos != null) {
    let y = c[0].pos, b = c[1] && c[1].pos;
    b == null && (b = y), p = { anchor: y + o, head: b + o };
  }
  return { doc: m, sel: p, from: o, to: l };
}
function Jh(n) {
  let e = n.pmViewDesc;
  if (e)
    return e.parseRule();
  if (n.nodeName == "BR" && n.parentNode) {
    if (he && /^(ul|ol)$/i.test(n.parentNode.nodeName)) {
      let t = document.createElement("div");
      return t.appendChild(document.createElement("li")), { skip: t };
    } else if (n.parentNode.lastChild == n || he && /^(tr|table)$/i.test(n.parentNode.nodeName))
      return { ignore: !0 };
  } else if (n.nodeName == "IMG" && n.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const _h = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function Gh(n, e, t, r, i) {
  let s = n.input.compositionPendingChanges || (n.composing ? n.input.compositionID : 0);
  if (n.input.compositionPendingChanges = 0, e < 0) {
    let A = n.input.lastSelectionTime > Date.now() - 50 ? n.input.lastSelectionOrigin : null, z = Ao(n, A);
    if (z && !n.state.selection.eq(z)) {
      if (ue && $e && n.input.lastKeyCode === 13 && Date.now() - 100 < n.input.lastKeyCodeTime && n.someProp("handleKeyDown", (j) => j(n, jt(13, "Enter"))))
        return;
      let V = n.state.tr.setSelection(z);
      A == "pointer" ? V.setMeta("pointer", !0) : A == "key" && V.scrollIntoView(), s && V.setMeta("composition", s), n.dispatch(V);
    }
    return;
  }
  let o = n.state.doc.resolve(e), l = o.sharedDepth(t);
  e = o.before(l + 1), t = n.state.doc.resolve(t).after(l + 1);
  let a = n.state.selection, c = qh(n, e, t), u = n.state.doc, d = u.slice(c.from, c.to), f, h;
  n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime ? (f = n.state.selection.to, h = "end") : (f = n.state.selection.from, h = "start"), n.input.lastKeyCode = null;
  let p = Qh(d.content, c.doc.content, c.from, f, h);
  if (p && n.input.domChangeCount++, (En && n.input.lastIOSEnter > Date.now() - 225 || $e) && i.some((A) => A.nodeType == 1 && !_h.test(A.nodeName)) && (!p || p.endA >= p.endB) && n.someProp("handleKeyDown", (A) => A(n, jt(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!p)
    if (r && a instanceof R && !a.empty && a.$head.sameParent(a.$anchor) && !n.composing && !(c.sel && c.sel.anchor != c.sel.head))
      p = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (c.sel) {
        let A = Ql(n, n.state.doc, c.sel);
        if (A && !A.eq(n.state.selection)) {
          let z = n.state.tr.setSelection(A);
          s && z.setMeta("composition", s), n.dispatch(z);
        }
      }
      return;
    }
  n.state.selection.from < n.state.selection.to && p.start == p.endB && n.state.selection instanceof R && (p.start > n.state.selection.from && p.start <= n.state.selection.from + 2 && n.state.selection.from >= c.from ? p.start = n.state.selection.from : p.endA < n.state.selection.to && p.endA >= n.state.selection.to - 2 && n.state.selection.to <= c.to && (p.endB += n.state.selection.to - p.endA, p.endA = n.state.selection.to)), ke && Et <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > c.from && c.doc.textBetween(p.start - c.from - 1, p.start - c.from + 1) == "  " && (p.start--, p.endA--, p.endB--);
  let m = c.doc.resolveNoCache(p.start - c.from), y = c.doc.resolveNoCache(p.endB - c.from), b = u.resolve(p.start), S = m.sameParent(y) && m.parent.inlineContent && b.end() >= p.endA, w;
  if ((En && n.input.lastIOSEnter > Date.now() - 225 && (!S || i.some((A) => A.nodeName == "DIV" || A.nodeName == "P")) || !S && m.pos < c.doc.content.size && !m.sameParent(y) && (w = P.findFrom(c.doc.resolve(m.pos + 1), 1, !0)) && w.head == y.pos) && n.someProp("handleKeyDown", (A) => A(n, jt(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (n.state.selection.anchor > p.start && Xh(u, p.start, p.endA, m, y) && n.someProp("handleKeyDown", (A) => A(n, jt(8, "Backspace")))) {
    $e && ue && n.domObserver.suppressSelectionUpdates();
    return;
  }
  ue && $e && p.endB == p.start && (n.input.lastAndroidDelete = Date.now()), $e && !S && m.start() != y.start() && y.parentOffset == 0 && m.depth == y.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == p.endA && (p.endB -= 2, y = c.doc.resolveNoCache(p.endB - c.from), setTimeout(() => {
    n.someProp("handleKeyDown", function(A) {
      return A(n, jt(13, "Enter"));
    });
  }, 20));
  let g = p.start, M = p.endA, k, D, B;
  if (S) {
    if (m.pos == y.pos)
      ke && Et <= 11 && m.parentOffset == 0 && (n.domObserver.suppressSelectionUpdates(), setTimeout(() => ft(n), 20)), k = n.state.tr.delete(g, M), D = u.resolve(p.start).marksAcross(u.resolve(p.endA));
    else if (
      // Adding or removing a mark
      p.endA == p.endB && (B = Yh(m.parent.content.cut(m.parentOffset, y.parentOffset), b.parent.content.cut(b.parentOffset, p.endA - b.start())))
    )
      k = n.state.tr, B.type == "add" ? k.addMark(g, M, B.mark) : k.removeMark(g, M, B.mark);
    else if (m.parent.child(m.index()).isText && m.index() == y.index() - (y.textOffset ? 0 : 1)) {
      let A = m.parent.textBetween(m.parentOffset, y.parentOffset);
      if (n.someProp("handleTextInput", (z) => z(n, g, M, A)))
        return;
      k = n.state.tr.insertText(A, g, M);
    }
  }
  if (k || (k = n.state.tr.replace(g, M, c.doc.slice(p.start - c.from, p.endB - c.from))), c.sel) {
    let A = Ql(n, k.doc, c.sel);
    A && !(ue && $e && n.composing && A.empty && (p.start != p.endB || n.input.lastAndroidDelete < Date.now() - 100) && (A.head == g || A.head == k.mapping.map(M) - 1) || ke && A.empty && A.head == g) && k.setSelection(A);
  }
  D && k.ensureMarks(D), s && k.setMeta("composition", s), n.dispatch(k.scrollIntoView());
}
function Ql(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size ? null : No(n, e.resolve(t.anchor), e.resolve(t.head));
}
function Yh(n, e) {
  let t = n.firstChild.marks, r = e.firstChild.marks, i = t, s = r, o, l, a;
  for (let u = 0; u < r.length; u++)
    i = r[u].removeFromSet(i);
  for (let u = 0; u < t.length; u++)
    s = t[u].removeFromSet(s);
  if (i.length == 1 && s.length == 0)
    l = i[0], o = "add", a = (u) => u.mark(l.addToSet(u.marks));
  else if (i.length == 0 && s.length == 1)
    l = s[0], o = "remove", a = (u) => u.mark(l.removeFromSet(u.marks));
  else
    return null;
  let c = [];
  for (let u = 0; u < e.childCount; u++)
    c.push(a(e.child(u)));
  if (x.from(c).eq(n))
    return { mark: l, type: o };
}
function Xh(n, e, t, r, i) {
  if (
    // The content must have shrunk
    t - e <= i.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
    Ns(r, !0, !1) < i.pos
  )
    return !1;
  let s = n.resolve(e);
  if (!r.parent.isTextblock) {
    let l = s.nodeAfter;
    return l != null && t == e + l.nodeSize;
  }
  if (s.parentOffset < s.parent.content.size || !s.parent.isTextblock)
    return !1;
  let o = n.resolve(Ns(s, !0, !0));
  return !o.parent.isTextblock || o.pos > t || Ns(o, !0, !1) < t ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function Ns(n, e, t) {
  let r = n.depth, i = e ? n.end() : n.pos;
  for (; r > 0 && (e || n.indexAfter(r) == n.node(r).childCount); )
    r--, i++, e = !1;
  if (t) {
    let s = n.node(r).maybeChild(n.indexAfter(r));
    for (; s && !s.isLeaf; )
      s = s.firstChild, i++;
  }
  return i;
}
function Qh(n, e, t, r, i) {
  let s = n.findDiffStart(e, t);
  if (s == null)
    return null;
  let { a: o, b: l } = n.findDiffEnd(e, t + n.size, t + e.size);
  if (i == "end") {
    let a = Math.max(0, s - Math.min(o, l));
    r -= o + a - s;
  }
  if (o < s && n.size < e.size) {
    let a = r <= s && r >= o ? s - r : 0;
    s -= a, s && s < e.size && Zl(e.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1), l = s + (l - o), o = s;
  } else if (l < s) {
    let a = r <= s && r >= l ? s - r : 0;
    s -= a, s && s < n.size && Zl(n.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1), o = s + (o - l), l = s;
  }
  return { start: s, endA: o, endB: l };
}
function Zl(n) {
  if (n.length != 2)
    return !1;
  let e = n.charCodeAt(0), t = n.charCodeAt(1);
  return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319;
}
class Zh {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, t) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new bh(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(ia), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = na(this), ta(this), this.nodeViews = ra(this), this.docView = Ll(this.state.doc, ea(this), As(this), this.dom, this), this.domObserver = new jh(this, (r, i, s, o) => Gh(this, r, i, s, o)), this.domObserver.start(), vh(this), this.updatePluginViews();
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
      for (let t in e)
        this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && lo(this);
    let t = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(ia), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let t = {};
    for (let r in this._props)
      t[r] = this._props[r];
    t.state = this.state;
    for (let r in e)
      t[r] = e[r];
    this.update(t);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    var r;
    let i = this.state, s = !1, o = !1;
    e.storedMarks && this.composing && (tu(this), o = !0), this.state = e;
    let l = i.plugins != e.plugins || this._props.plugins != t.plugins;
    if (l || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
      let h = ra(this);
      tp(h, this.nodeViews) && (this.nodeViews = h, s = !0);
    }
    (l || t.handleDOMEvents != this._props.handleDOMEvents) && lo(this), this.editable = na(this), ta(this);
    let a = As(this), c = ea(this), u = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve", d = s || !this.docView.matchesNode(e.doc, c, a);
    (d || !e.selection.eq(i.selection)) && (o = !0);
    let f = u == "preserve" && o && this.dom.style.overflowAnchor == null && Rf(this);
    if (o) {
      this.domObserver.stop();
      let h = d && (ke || ue) && !this.composing && !i.selection.empty && !e.selection.empty && ep(i.selection, e.selection);
      if (d) {
        let p = ue ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = Ih(this)), (s || !this.docView.update(e.doc, c, a, this)) && (this.docView.updateOuterDeco(c), this.docView.destroy(), this.docView = Ll(e.doc, c, a, this.dom, this)), p && !this.trackWrites && (h = !0);
      }
      h || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && rh(this)) ? ft(this, h) : (jc(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(i), !((r = this.dragging) === null || r === void 0) && r.node && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i), u == "reset" ? this.dom.scrollTop = 0 : u == "to selection" ? this.scrollToSelection() : f && Lf(f);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!this.someProp("handleScrollToSelection", (t) => t(this))) if (this.state.selection instanceof N) {
      let t = this.docView.domAfterPos(this.state.selection.from);
      t.nodeType == 1 && El(this, t.getBoundingClientRect(), e);
    } else
      El(this, this.coordsAtPos(this.state.selection.head, 1), e);
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let t = 0; t < this.directPlugins.length; t++) {
        let r = this.directPlugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let r = this.state.plugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let r = this.pluginViews[t];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, t) {
    let r = e.node, i = -1;
    if (this.state.doc.nodeAt(r.from) == r.node)
      i = r.from;
    else {
      let s = r.from + (this.state.doc.content.size - t.doc.content.size);
      (s > 0 && this.state.doc.nodeAt(s)) == r.node && (i = s);
    }
    this.dragging = new ru(e.slice, e.move, i < 0 ? void 0 : N.create(this.state.doc, i));
  }
  someProp(e, t) {
    let r = this._props && this._props[e], i;
    if (r != null && (i = t ? t(r) : r))
      return i;
    for (let o = 0; o < this.directPlugins.length; o++) {
      let l = this.directPlugins[o].props[e];
      if (l != null && (i = t ? t(l) : l))
        return i;
    }
    let s = this.state.plugins;
    if (s)
      for (let o = 0; o < s.length; o++) {
        let l = s[o].props[e];
        if (l != null && (i = t ? t(l) : l))
          return i;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (ke) {
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
    this.domObserver.stop(), this.editable && Pf(this.dom), ft(this), this.domObserver.start();
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
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || t.nodeType == 11 && t.host)
          return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()), this._root = t;
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
    return $f(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, t = 1) {
    return Lc(this, e, t);
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
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
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
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
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
  posAtDOM(e, t, r = -1) {
    let i = this.docView.posFromDOM(e, t, r);
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
  endOfTextblock(e, t) {
    return Uf(this, t || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, t) {
    return ar(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, t) {
    return ar(this, e, null, !0, t || new ClipboardEvent("paste"));
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (kh(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], As(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, Sf());
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
    return Sh(this, e);
  }
  /**
  Dispatch a transaction. Will call
  [`dispatchTransaction`](https://prosemirror.net/docs/ref/#view.DirectEditorProps.dispatchTransaction)
  when given, and otherwise defaults to applying the transaction to
  the current state and calling
  [`updateState`](https://prosemirror.net/docs/ref/#view.EditorView.updateState) with the result.
  This method is bound to the view instance, so that it can be
  easily passed around.
  */
  dispatch(e) {
    let t = this._props.dispatchTransaction;
    t ? t.call(this, e) : this.updateState(this.state.apply(e));
  }
  /**
  @internal
  */
  domSelectionRange() {
    let e = this.domSelection();
    return e ? he && this.root.nodeType === 11 && Of(this.dom.ownerDocument) == this.dom && Kh(this, e) || e : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
function ea(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(n.editable), n.someProp("attributes", (t) => {
    if (typeof t == "function" && (t = t(n.state)), t)
      for (let r in t)
        r == "class" ? e.class += " " + t[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + t[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(t[r]));
  }), e.translate || (e.translate = "no"), [Ie.node(0, n.state.doc.content.size, e)];
}
function ta(n) {
  if (n.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), n.cursorWrapper = { dom: e, deco: Ie.widget(n.state.selection.from, e, { raw: !0, marks: n.markCursor }) };
  } else
    n.cursorWrapper = null;
}
function na(n) {
  return !n.someProp("editable", (e) => e(n.state) === !1);
}
function ep(n, e) {
  let t = Math.min(n.$anchor.sharedDepth(n.head), e.$anchor.sharedDepth(e.head));
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function ra(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(r) {
    for (let i in r)
      Object.prototype.hasOwnProperty.call(e, i) || (e[i] = r[i]);
  }
  return n.someProp("nodeViews", t), n.someProp("markViews", t), e;
}
function tp(n, e) {
  let t = 0, r = 0;
  for (let i in n) {
    if (n[i] != e[i])
      return !0;
    t++;
  }
  for (let i in e)
    r++;
  return t != r;
}
function ia(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var Dt = {
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
}, pi = {
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
}, np = typeof navigator < "u" && /Mac/.test(navigator.platform), rp = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var le = 0; le < 10; le++) Dt[48 + le] = Dt[96 + le] = String(le);
for (var le = 1; le <= 24; le++) Dt[le + 111] = "F" + le;
for (var le = 65; le <= 90; le++)
  Dt[le] = String.fromCharCode(le + 32), pi[le] = String.fromCharCode(le);
for (var Ds in Dt) pi.hasOwnProperty(Ds) || (pi[Ds] = Dt[Ds]);
function ip(n) {
  var e = np && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || rp && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? pi : Dt)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
const sp = typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : !1;
function op(n) {
  let e = n.split(/-(?!$)/), t = e[e.length - 1];
  t == "Space" && (t = " ");
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
      sp ? o = !0 : i = !0;
    else
      throw new Error("Unrecognized modifier name: " + a);
  }
  return r && (t = "Alt-" + t), i && (t = "Ctrl-" + t), o && (t = "Meta-" + t), s && (t = "Shift-" + t), t;
}
function lp(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n)
    e[op(t)] = n[t];
  return e;
}
function Is(n, e, t = !0) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t && e.shiftKey && (n = "Shift-" + n), n;
}
function ap(n) {
  return new be({ props: { handleKeyDown: au(n) } });
}
function au(n) {
  let e = lp(n);
  return function(t, r) {
    let i = ip(r), s, o = e[Is(i, r)];
    if (o && o(t.state, t.dispatch, t))
      return !0;
    if (i.length == 1 && i != " ") {
      if (r.shiftKey) {
        let l = e[Is(i, r, !1)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
      if ((r.shiftKey || r.altKey || r.metaKey || i.charCodeAt(0) > 127) && (s = Dt[r.keyCode]) && s != i) {
        let l = e[Is(s, r)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
    }
    return !1;
  };
}
const cp = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function cu(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const up = (n, e, t) => {
  let r = cu(n, t);
  if (!r)
    return !1;
  let i = Bo(r);
  if (!i) {
    let o = r.blockRange(), l = o && Bn(o);
    return l == null ? !1 : (e && e(n.tr.lift(o, l).scrollIntoView()), !0);
  }
  let s = i.nodeBefore;
  if (hu(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (An(s, "end") || N.isSelectable(s)))
    for (let o = r.depth; ; o--) {
      let l = Zi(n.doc, r.before(o), r.after(o), C.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(An(s, "end") ? P.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : N.create(a.doc, i.pos - s.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (o == 1 || r.node(o - 1).childCount > 1)
        break;
    }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - s.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, dp = (n, e, t) => {
  let r = cu(n, t);
  if (!r)
    return !1;
  let i = Bo(r);
  return i ? uu(n, i, e) : !1;
}, fp = (n, e, t) => {
  let r = du(n, t);
  if (!r)
    return !1;
  let i = Ho(r);
  return i ? uu(n, i, e) : !1;
};
function uu(n, e, t) {
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
  let c = Zi(n.doc, s, a, C.empty);
  if (!c || c.from != s || c instanceof te && c.slice.size >= a - s)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(R.create(u.doc, s)), t(u.scrollIntoView());
  }
  return !0;
}
function An(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const hp = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    s = Bo(r);
  }
  let o = s && s.nodeBefore;
  return !o || !N.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(N.create(n.doc, s.pos - o.nodeSize)).scrollIntoView()), !0);
};
function Bo(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function du(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const pp = (n, e, t) => {
  let r = du(n, t);
  if (!r)
    return !1;
  let i = Ho(r);
  if (!i)
    return !1;
  let s = i.nodeAfter;
  if (hu(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (An(s, "start") || N.isSelectable(s))) {
    let o = Zi(n.doc, r.before(), r.after(), C.empty);
    if (o && o.slice.size < o.to - o.from) {
      if (e) {
        let l = n.tr.step(o);
        l.setSelection(An(s, "start") ? P.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : N.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + s.nodeSize).scrollIntoView()), !0) : !1;
}, mp = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    s = Ho(r);
  }
  let o = s && s.nodeAfter;
  return !o || !N.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(N.create(n.doc, s.pos)).scrollIntoView()), !0);
};
function Ho(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount)
        return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const gp = (n, e) => {
  let t = n.selection, r = t instanceof N, i;
  if (r) {
    if (t.node.isTextblock || !Rt(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = Qi(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let s = n.tr.join(i);
    r && s.setSelection(N.create(s.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(s.scrollIntoView());
  }
  return !0;
}, yp = (n, e) => {
  let t = n.selection, r;
  if (t instanceof N) {
    if (t.node.isTextblock || !Rt(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = Qi(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, bp = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), s = i && Bn(i);
  return s == null ? !1 : (e && e(n.tr.lift(i, s).scrollIntoView()), !0);
}, vp = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function fu(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const kp = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), s = t.indexAfter(-1), o = fu(i.contentMatchAt(s));
  if (!o || !i.canReplaceWith(s, s, o))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, o.createAndFill());
    a.setSelection(P.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, xp = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof We || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let s = fu(i.parent.contentMatchAt(i.indexAfter()));
  if (!s || !s.isTextblock)
    return !1;
  if (e) {
    let o = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(o, s.createAndFill());
    l.setSelection(R.create(l.doc, o + 1)), e(l.scrollIntoView());
  }
  return !0;
}, Sp = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let s = t.before();
    if (wn(n.doc, s))
      return e && e(n.tr.split(s).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Bn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
}, wp = (n, e) => {
  let { $from: t, to: r } = n.selection, i, s = t.sharedDepth(r);
  return s == 0 ? !1 : (i = t.before(s), e && e(n.tr.setSelection(N.create(n.doc, i))), !0);
};
function Tp(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, s = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(s - 1, s) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(s, s + 1) || !(i.isTextblock || Rt(n.doc, e.pos)) ? !1 : (t && t(n.tr.clearIncompatible(e.pos, r.type, r.contentMatchAt(r.childCount)).join(e.pos).scrollIntoView()), !0);
}
function hu(n, e, t, r) {
  let i = e.nodeBefore, s = e.nodeAfter, o, l, a = i.type.spec.isolating || s.type.spec.isolating;
  if (!a && Tp(n, e, t))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (o = (l = i.contentMatchAt(i.childCount)).findWrapping(s.type)) && l.matchType(o[0] || s.type).validEnd) {
    if (t) {
      let h = e.pos + s.nodeSize, p = x.empty;
      for (let b = o.length - 1; b >= 0; b--)
        p = x.from(o[b].create(null, p));
      p = x.from(i.copy(p));
      let m = n.tr.step(new ne(e.pos - 1, h, e.pos, h, new C(p, 1, 0), o.length, !0)), y = h + 2 * o.length;
      Rt(m.doc, y) && m.join(y), t(m.scrollIntoView());
    }
    return !0;
  }
  let u = s.type.spec.isolating || r > 0 && a ? null : P.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && Bn(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (c && An(s, "start", !0) && An(i, "end")) {
    let h = i, p = [];
    for (; p.push(h), !h.isTextblock; )
      h = h.lastChild;
    let m = s, y = 1;
    for (; !m.isTextblock; m = m.firstChild)
      y++;
    if (h.canReplace(h.childCount, h.childCount, m.content)) {
      if (t) {
        let b = x.empty;
        for (let w = p.length - 1; w >= 0; w--)
          b = x.from(p[w].copy(b));
        let S = n.tr.step(new ne(e.pos - p.length, e.pos + s.nodeSize, e.pos + y, e.pos + s.nodeSize - y, new C(b, p.length, 0), 0, !0));
        t(S.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function pu(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, s = i.depth;
    for (; i.node(s).isInline; ) {
      if (!s)
        return !1;
      s--;
    }
    return i.node(s).isTextblock ? (t && t(e.tr.setSelection(R.create(e.doc, n < 0 ? i.start(s) : i.end(s)))), !0) : !1;
  };
}
const Cp = pu(-1), Mp = pu(1);
function Op(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: s } = t.selection, o = i.blockRange(s), l = o && Mo(o, n, e);
    return l ? (r && r(t.tr.wrap(o, l).scrollIntoView()), !0) : !1;
  };
}
function sa(n, e = null) {
  return function(t, r) {
    let i = !1;
    for (let s = 0; s < t.selection.ranges.length && !i; s++) {
      let { $from: { pos: o }, $to: { pos: l } } = t.selection.ranges[s];
      t.doc.nodesBetween(o, l, (a, c) => {
        if (i)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(n, e)))
          if (a.type == n)
            i = !0;
          else {
            let u = t.doc.resolve(c), d = u.index();
            i = u.parent.canReplaceWith(d, d + 1, n);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let s = t.tr;
      for (let o = 0; o < t.selection.ranges.length; o++) {
        let { $from: { pos: l }, $to: { pos: a } } = t.selection.ranges[o];
        s.setBlockType(l, a, n, e);
      }
      r(s.scrollIntoView());
    }
    return !0;
  };
}
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Ep(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: s } = t.selection, o = i.blockRange(s), l = !1, a = o;
    if (!o)
      return !1;
    if (o.depth >= 2 && i.node(o.depth - 1).type.compatibleContent(n) && o.startIndex == 0) {
      if (i.index(o.depth - 1) == 0)
        return !1;
      let u = t.doc.resolve(o.start - 2);
      a = new oi(u, u, o.depth), o.endIndex < o.parent.childCount && (o = new oi(i, t.doc.resolve(s.end(o.depth)), o.depth)), l = !0;
    }
    let c = Mo(a, n, e, o);
    return c ? (r && r(Ap(t.tr, o, c, l, n).scrollIntoView()), !0) : !1;
  };
}
function Ap(n, e, t, r, i) {
  let s = x.empty;
  for (let u = t.length - 1; u >= 0; u--)
    s = x.from(t[u].type.create(t[u].attrs, s));
  n.step(new ne(e.start - (r ? 2 : 0), e.end, e.start, e.end, new C(s, 0, 0), t.length, !0));
  let o = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (o = u + 1);
  let l = t.length - o, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && wn(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
  return n;
}
function Np(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (o) => o.childCount > 0 && o.firstChild.type == n);
    return s ? t ? r.node(s.depth - 1).type == n ? Dp(e, t, n, s) : Ip(e, t, s) : !0 : !1;
  };
}
function Dp(n, e, t, r) {
  let i = n.tr, s = r.end, o = r.$to.end(r.depth);
  s < o && (i.step(new ne(s - 1, o, s, o, new C(x.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new oi(i.doc.resolve(r.$from.pos), i.doc.resolve(o), r.depth));
  const l = Bn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.mapping.map(s, -1) - 1;
  return Rt(i.doc, a) && i.join(a), e(i.scrollIntoView()), !0;
}
function Ip(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, p = t.endIndex - 1, m = t.startIndex; p > m; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let s = r.doc.resolve(t.start), o = s.nodeAfter;
  if (r.mapping.map(t.end) != t.start + s.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = s.node(-1), u = s.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, o.content.append(a ? x.empty : x.from(i))))
    return !1;
  let d = s.pos, f = d + o.nodeSize;
  return r.step(new ne(d - (l ? 1 : 0), f + (a ? 1 : 0), d + 1, f - 1, new C((l ? x.empty : x.from(i.copy(x.empty))).append(a ? x.empty : x.from(i.copy(x.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Rp(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!s)
      return !1;
    let o = s.startIndex;
    if (o == 0)
      return !1;
    let l = s.parent, a = l.child(o - 1);
    if (a.type != n)
      return !1;
    if (t) {
      let c = a.lastChild && a.lastChild.type == l.type, u = x.from(c ? n.create() : null), d = new C(x.from(n.create(null, x.from(l.type.create(null, u)))), c ? 3 : 1, 0), f = s.start, h = s.end;
      t(e.tr.step(new ne(f - (c ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function is(n) {
  const { state: e, transaction: t } = n;
  let { selection: r } = t, { doc: i } = t, { storedMarks: s } = t;
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
      return r = t.selection, i = t.doc, s = t.storedMarks, t;
    }
  };
}
class ss {
  constructor(e) {
    this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: e, editor: t, state: r } = this, { view: i } = t, { tr: s } = r, o = this.buildProps(s);
    return Object.fromEntries(Object.entries(e).map(([l, a]) => [l, (...u) => {
      const d = a(...u)(o);
      return !s.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(s), d;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, t = !0) {
    const { rawCommands: r, editor: i, state: s } = this, { view: o } = i, l = [], a = !!e, c = e || s.tr, u = () => (!a && t && !c.getMeta("preventDispatch") && !this.hasCustomState && o.dispatch(c), l.every((f) => f === !0)), d = {
      ...Object.fromEntries(Object.entries(r).map(([f, h]) => [f, (...m) => {
        const y = this.buildProps(c, t), b = h(...m)(y);
        return l.push(b), d;
      }])),
      run: u
    };
    return d;
  }
  createCan(e) {
    const { rawCommands: t, state: r } = this, i = !1, s = e || r.tr, o = this.buildProps(s, i);
    return {
      ...Object.fromEntries(Object.entries(t).map(([a, c]) => [a, (...u) => c(...u)({ ...o, dispatch: void 0 })])),
      chain: () => this.createChain(s, i)
    };
  }
  buildProps(e, t = !0) {
    const { rawCommands: r, editor: i, state: s } = this, { view: o } = i, l = {
      tr: e,
      editor: i,
      view: o,
      state: is({
        state: s,
        transaction: e
      }),
      dispatch: t ? () => {
      } : void 0,
      chain: () => this.createChain(e, t),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([a, c]) => [a, (...u) => c(...u)(l)]));
      }
    };
    return l;
  }
}
class Lp {
  constructor() {
    this.callbacks = {};
  }
  on(e, t) {
    return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), this;
  }
  emit(e, ...t) {
    const r = this.callbacks[e];
    return r && r.forEach((i) => i.apply(this, t)), this;
  }
  off(e, t) {
    const r = this.callbacks[e];
    return r && (t ? this.callbacks[e] = r.filter((i) => i !== t) : delete this.callbacks[e]), this;
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}
function O(n, e, t) {
  return n.config[e] === void 0 && n.parent ? O(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? O(n.parent, e, t) : null
  }) : n.config[e];
}
function ls(n) {
  const e = n.filter((i) => i.type === "extension"), t = n.filter((i) => i.type === "node"), r = n.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: r
  };
}
function mu(n) {
  const e = [], { nodeExtensions: t, markExtensions: r } = ls(n), i = [...t, ...r], s = {
    default: null,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  };
  return n.forEach((o) => {
    const l = {
      name: o.name,
      options: o.options,
      storage: o.storage,
      extensions: i
    }, a = O(o, "addGlobalAttributes", l);
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
    }, a = O(o, "addAttributes", l);
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
function Q(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n])
      throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
function G(...n) {
  return n.filter((e) => !!e).reduce((e, t) => {
    const r = { ...e };
    return Object.entries(t).forEach(([i, s]) => {
      if (!r[i]) {
        r[i] = s;
        return;
      }
      if (i === "class") {
        const l = s ? s.split(" ") : [], a = r[i] ? r[i].split(" ") : [], c = l.filter((u) => !a.includes(u));
        r[i] = [...a, ...c].join(" ");
      } else i === "style" ? r[i] = [r[i], s].join("; ") : r[i] = s;
    }), r;
  }, {});
}
function ao(n, e) {
  return e.filter((t) => t.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(n.attrs) || {} : {
    [t.name]: n.attrs[t.name]
  }).reduce((t, r) => G(t, r), {});
}
function gu(n) {
  return typeof n == "function";
}
function H(n, e = void 0, ...t) {
  return gu(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Pp(n = {}) {
  return Object.keys(n).length === 0 && n.constructor === Object;
}
function Bp(n) {
  return typeof n != "string" ? n : n.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(n) : n === "true" ? !0 : n === "false" ? !1 : n;
}
function oa(n, e) {
  return "style" in n ? n : {
    ...n,
    getAttrs: (t) => {
      const r = n.getAttrs ? n.getAttrs(t) : n.attrs;
      if (r === !1)
        return !1;
      const i = e.reduce((s, o) => {
        const l = o.attribute.parseHTML ? o.attribute.parseHTML(t) : Bp(t.getAttribute(o.name));
        return l == null ? s : {
          ...s,
          [o.name]: l
        };
      }, {});
      return { ...r, ...i };
    }
  };
}
function la(n) {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(n).filter(([e, t]) => e === "attrs" && Pp(t) ? !1 : t != null)
  );
}
function Hp(n, e) {
  var t;
  const r = mu(n), { nodeExtensions: i, markExtensions: s } = ls(n), o = (t = i.find((c) => O(c, "topNode"))) === null || t === void 0 ? void 0 : t.name, l = Object.fromEntries(i.map((c) => {
    const u = r.filter((b) => b.type === c.name), d = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, f = n.reduce((b, S) => {
      const w = O(S, "extendNodeSchema", d);
      return {
        ...b,
        ...w ? w(c) : {}
      };
    }, {}), h = la({
      ...f,
      content: H(O(c, "content", d)),
      marks: H(O(c, "marks", d)),
      group: H(O(c, "group", d)),
      inline: H(O(c, "inline", d)),
      atom: H(O(c, "atom", d)),
      selectable: H(O(c, "selectable", d)),
      draggable: H(O(c, "draggable", d)),
      code: H(O(c, "code", d)),
      whitespace: H(O(c, "whitespace", d)),
      defining: H(O(c, "defining", d)),
      isolating: H(O(c, "isolating", d)),
      attrs: Object.fromEntries(u.map((b) => {
        var S;
        return [b.name, { default: (S = b == null ? void 0 : b.attribute) === null || S === void 0 ? void 0 : S.default }];
      }))
    }), p = H(O(c, "parseHTML", d));
    p && (h.parseDOM = p.map((b) => oa(b, u)));
    const m = O(c, "renderHTML", d);
    m && (h.toDOM = (b) => m({
      node: b,
      HTMLAttributes: ao(b, u)
    }));
    const y = O(c, "renderText", d);
    return y && (h.toText = y), [c.name, h];
  })), a = Object.fromEntries(s.map((c) => {
    const u = r.filter((y) => y.type === c.name), d = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, f = n.reduce((y, b) => {
      const S = O(b, "extendMarkSchema", d);
      return {
        ...y,
        ...S ? S(c) : {}
      };
    }, {}), h = la({
      ...f,
      inclusive: H(O(c, "inclusive", d)),
      excludes: H(O(c, "excludes", d)),
      group: H(O(c, "group", d)),
      spanning: H(O(c, "spanning", d)),
      code: H(O(c, "code", d)),
      attrs: Object.fromEntries(u.map((y) => {
        var b;
        return [y.name, { default: (b = y == null ? void 0 : y.attribute) === null || b === void 0 ? void 0 : b.default }];
      }))
    }), p = H(O(c, "parseHTML", d));
    p && (h.parseDOM = p.map((y) => oa(y, u)));
    const m = O(c, "renderHTML", d);
    return m && (h.toDOM = (y) => m({
      mark: y,
      HTMLAttributes: ao(y, u)
    })), [c.name, h];
  }));
  return new dc({
    topNode: o,
    nodes: l,
    marks: a
  });
}
function Rs(n, e) {
  return e.nodes[n] || e.marks[n] || null;
}
function aa(n, e) {
  return Array.isArray(e) ? e.some((t) => (typeof t == "string" ? t : t.name) === n.name) : e;
}
const zp = (n, e = 500) => {
  let t = "";
  const r = n.parentOffset;
  return n.parent.nodesBetween(Math.max(0, r - e), r, (i, s, o, l) => {
    var a, c;
    const u = ((c = (a = i.type.spec).toText) === null || c === void 0 ? void 0 : c.call(a, {
      node: i,
      pos: s,
      parent: o,
      index: l
    })) || i.textContent || "%leaf%";
    t += i.isAtom && !i.isText ? u : u.slice(0, Math.max(0, r - s));
  }), t;
};
function zo(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
class as {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const Fp = (n, e) => {
  if (zo(e))
    return e.exec(n);
  const t = e(n);
  if (!t)
    return null;
  const r = [t.text];
  return r.index = t.index, r.input = n, r.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), r.push(t.replaceWith)), r;
};
function Fr(n) {
  var e;
  const { editor: t, from: r, to: i, text: s, rules: o, plugin: l } = n, { view: a } = t;
  if (a.composing)
    return !1;
  const c = a.state.doc.resolve(r);
  if (
    // check for code node
    c.parent.type.spec.code || !((e = c.nodeBefore || c.nodeAfter) === null || e === void 0) && e.marks.find((f) => f.type.spec.code)
  )
    return !1;
  let u = !1;
  const d = zp(c) + s;
  return o.forEach((f) => {
    if (u)
      return;
    const h = Fp(d, f.find);
    if (!h)
      return;
    const p = a.state.tr, m = is({
      state: a.state,
      transaction: p
    }), y = {
      from: r - (h[0].length - s.length),
      to: i
    }, { commands: b, chain: S, can: w } = new ss({
      editor: t,
      state: m
    });
    f.handler({
      state: m,
      range: y,
      match: h,
      commands: b,
      chain: S,
      can: w
    }) === null || !p.steps.length || (p.setMeta(l, {
      transform: p,
      from: r,
      to: i,
      text: s
    }), a.dispatch(p), u = !0);
  }), u;
}
function $p(n) {
  const { editor: e, rules: t } = n, r = new be({
    state: {
      init() {
        return null;
      },
      apply(i, s) {
        const o = i.getMeta(r);
        if (o)
          return o;
        const l = i.getMeta("applyInputRules");
        return !!l && setTimeout(() => {
          const { from: c, text: u } = l, d = c + u.length;
          Fr({
            editor: e,
            from: c,
            to: d,
            text: u,
            rules: t,
            plugin: r
          });
        }), i.selectionSet || i.docChanged ? null : s;
      }
    },
    props: {
      handleTextInput(i, s, o, l) {
        return Fr({
          editor: e,
          from: s,
          to: o,
          text: l,
          rules: t,
          plugin: r
        });
      },
      handleDOMEvents: {
        compositionend: (i) => (setTimeout(() => {
          const { $cursor: s } = i.state.selection;
          s && Fr({
            editor: e,
            from: s.pos,
            to: s.pos,
            text: "",
            rules: t,
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
        return o ? Fr({
          editor: e,
          from: o.pos,
          to: o.pos,
          text: `
`,
          rules: t,
          plugin: r
        }) : !1;
      }
    },
    // @ts-ignore
    isInputRules: !0
  });
  return r;
}
function Vp(n) {
  return typeof n == "number";
}
class jp {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const Wp = (n, e, t) => {
  if (zo(e))
    return [...n.matchAll(e)];
  const r = e(n, t);
  return r ? r.map((i) => {
    const s = [i.text];
    return s.index = i.index, s.input = n, s.data = i.data, i.replaceWith && (i.text.includes(i.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), s.push(i.replaceWith)), s;
  }) : [];
};
function Kp(n) {
  const { editor: e, state: t, from: r, to: i, rule: s, pasteEvent: o, dropEvent: l } = n, { commands: a, chain: c, can: u } = new ss({
    editor: e,
    state: t
  }), d = [];
  return t.doc.nodesBetween(r, i, (h, p) => {
    if (!h.isTextblock || h.type.spec.code)
      return;
    const m = Math.max(r, p), y = Math.min(i, p + h.content.size), b = h.textBetween(m - p, y - p, void 0, "￼");
    Wp(b, s.find, o).forEach((w) => {
      if (w.index === void 0)
        return;
      const g = m + w.index + 1, M = g + w[0].length, k = {
        from: t.tr.mapping.map(g),
        to: t.tr.mapping.map(M)
      }, D = s.handler({
        state: t,
        range: k,
        match: w,
        commands: a,
        chain: c,
        can: u,
        pasteEvent: o,
        dropEvent: l
      });
      d.push(D);
    });
  }), d.every((h) => h !== null);
}
const Up = (n) => {
  var e;
  const t = new ClipboardEvent("paste", {
    clipboardData: new DataTransfer()
  });
  return (e = t.clipboardData) === null || e === void 0 || e.setData("text/html", n), t;
};
function qp(n) {
  const { editor: e, rules: t } = n;
  let r = null, i = !1, s = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
  const a = ({ state: u, from: d, to: f, rule: h, pasteEvt: p }) => {
    const m = u.tr, y = is({
      state: u,
      transaction: m
    });
    if (!(!Kp({
      editor: e,
      state: y,
      from: Math.max(d - 1, 0),
      to: f.b - 1,
      rule: h,
      pasteEvent: p,
      dropEvent: l
    }) || !m.steps.length))
      return l = typeof DragEvent < "u" ? new DragEvent("drop") : null, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, m;
  };
  return t.map((u) => new be({
    // we register a global drag handler to track the current drag source element
    view(d) {
      const f = (h) => {
        var p;
        r = !((p = d.dom.parentElement) === null || p === void 0) && p.contains(h.target) ? d.dom.parentElement : null;
      };
      return window.addEventListener("dragstart", f), {
        destroy() {
          window.removeEventListener("dragstart", f);
        }
      };
    },
    props: {
      handleDOMEvents: {
        drop: (d, f) => (s = r === d.dom.parentElement, l = f, !1),
        paste: (d, f) => {
          var h;
          const p = (h = f.clipboardData) === null || h === void 0 ? void 0 : h.getData("text/html");
          return o = f, i = !!(p != null && p.includes("data-pm-slice")), !1;
        }
      }
    },
    appendTransaction: (d, f, h) => {
      const p = d[0], m = p.getMeta("uiEvent") === "paste" && !i, y = p.getMeta("uiEvent") === "drop" && !s, b = p.getMeta("applyPasteRules"), S = !!b;
      if (!m && !y && !S)
        return;
      if (S) {
        const { from: M, text: k } = b, D = M + k.length, B = Up(k);
        return a({
          rule: u,
          state: h,
          from: M,
          to: { b: D },
          pasteEvt: B
        });
      }
      const w = f.doc.content.findDiffStart(h.doc.content), g = f.doc.content.findDiffEnd(h.doc.content);
      if (!(!Vp(w) || !g || w === g.b))
        return a({
          rule: u,
          state: h,
          from: w,
          to: g,
          pasteEvt: o
        });
    }
  }));
}
function Jp(n) {
  const e = n.filter((t, r) => n.indexOf(t) !== r);
  return Array.from(new Set(e));
}
class xn {
  constructor(e, t) {
    this.splittableMarks = [], this.editor = t, this.extensions = xn.resolve(e), this.schema = Hp(this.extensions, t), this.setupExtensions();
  }
  /**
   * Returns a flattened and sorted extension list while
   * also checking for duplicated extensions and warns the user.
   * @param extensions An array of Tiptap extensions
   * @returns An flattened and sorted array of Tiptap extensions
   */
  static resolve(e) {
    const t = xn.sort(xn.flatten(e)), r = Jp(t.map((i) => i.name));
    return r.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${r.map((i) => `'${i}'`).join(", ")}]. This can lead to issues.`), t;
  }
  /**
   * Create a flattened array of extensions by traversing the `addExtensions` field.
   * @param extensions An array of Tiptap extensions
   * @returns A flattened array of Tiptap extensions
   */
  static flatten(e) {
    return e.map((t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage
      }, i = O(t, "addExtensions", r);
      return i ? [t, ...this.flatten(i())] : t;
    }).flat(10);
  }
  /**
   * Sort extensions by priority.
   * @param extensions An array of Tiptap extensions
   * @returns A sorted array of Tiptap extensions by priority
   */
  static sort(e) {
    return e.sort((r, i) => {
      const s = O(r, "priority") || 100, o = O(i, "priority") || 100;
      return s > o ? -1 : s < o ? 1 : 0;
    });
  }
  /**
   * Get all commands from the extensions.
   * @returns An object with all commands where the key is the command name and the value is the command function
   */
  get commands() {
    return this.extensions.reduce((e, t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage,
        editor: this.editor,
        type: Rs(t.name, this.schema)
      }, i = O(t, "addCommands", r);
      return i ? {
        ...e,
        ...i()
      } : e;
    }, {});
  }
  /**
   * Get all registered Prosemirror plugins from the extensions.
   * @returns An array of Prosemirror plugins
   */
  get plugins() {
    const { editor: e } = this, t = xn.sort([...this.extensions].reverse()), r = [], i = [], s = t.map((o) => {
      const l = {
        name: o.name,
        options: o.options,
        storage: o.storage,
        editor: e,
        type: Rs(o.name, this.schema)
      }, a = [], c = O(o, "addKeyboardShortcuts", l);
      let u = {};
      if (o.type === "mark" && O(o, "exitable", l) && (u.ArrowRight = () => Te.handleExit({ editor: e, mark: o })), c) {
        const m = Object.fromEntries(Object.entries(c()).map(([y, b]) => [y, () => b({ editor: e })]));
        u = { ...u, ...m };
      }
      const d = ap(u);
      a.push(d);
      const f = O(o, "addInputRules", l);
      aa(o, e.options.enableInputRules) && f && r.push(...f());
      const h = O(o, "addPasteRules", l);
      aa(o, e.options.enablePasteRules) && h && i.push(...h());
      const p = O(o, "addProseMirrorPlugins", l);
      if (p) {
        const m = p();
        a.push(...m);
      }
      return a;
    }).flat();
    return [
      $p({
        editor: e,
        rules: r
      }),
      ...qp({
        editor: e,
        rules: i
      }),
      ...s
    ];
  }
  /**
   * Get all attributes from the extensions.
   * @returns An array of attributes
   */
  get attributes() {
    return mu(this.extensions);
  }
  /**
   * Get all node views from the extensions.
   * @returns An object with all node views where the key is the node name and the value is the node view function
   */
  get nodeViews() {
    const { editor: e } = this, { nodeExtensions: t } = ls(this.extensions);
    return Object.fromEntries(t.filter((r) => !!O(r, "addNodeView")).map((r) => {
      const i = this.attributes.filter((a) => a.type === r.name), s = {
        name: r.name,
        options: r.options,
        storage: r.storage,
        editor: e,
        type: Q(r.name, this.schema)
      }, o = O(r, "addNodeView", s);
      if (!o)
        return [];
      const l = (a, c, u, d) => {
        const f = ao(a, i);
        return o()({
          editor: e,
          node: a,
          getPos: u,
          decorations: d,
          HTMLAttributes: f,
          extension: r
        });
      };
      return [r.name, l];
    }));
  }
  /**
   * Go through all extensions, create extension storages & setup marks
   * & bind editor event listener.
   */
  setupExtensions() {
    this.extensions.forEach((e) => {
      var t;
      this.editor.extensionStorage[e.name] = e.storage;
      const r = {
        name: e.name,
        options: e.options,
        storage: e.storage,
        editor: this.editor,
        type: Rs(e.name, this.schema)
      };
      e.type === "mark" && (!((t = H(O(e, "keepOnSplit", r))) !== null && t !== void 0) || t) && this.splittableMarks.push(e.name);
      const i = O(e, "onBeforeCreate", r), s = O(e, "onCreate", r), o = O(e, "onUpdate", r), l = O(e, "onSelectionUpdate", r), a = O(e, "onTransaction", r), c = O(e, "onFocus", r), u = O(e, "onBlur", r), d = O(e, "onDestroy", r);
      i && this.editor.on("beforeCreate", i), s && this.editor.on("create", s), o && this.editor.on("update", o), l && this.editor.on("selectionUpdate", l), a && this.editor.on("transaction", a), c && this.editor.on("focus", c), u && this.editor.on("blur", u), d && this.editor.on("destroy", d);
    });
  }
}
function _p(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function $r(n) {
  return _p(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function cs(n, e) {
  const t = { ...n };
  return $r(n) && $r(e) && Object.keys(e).forEach((r) => {
    $r(e[r]) && $r(n[r]) ? t[r] = cs(n[r], e[r]) : t[r] = e[r];
  }), t;
}
class ge {
  constructor(e = {}) {
    this.type = "extension", this.name = "extension", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = H(O(this, "addOptions", {
      name: this.name
    }))), this.storage = H(O(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new ge(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => cs(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new ge({ ...this.config, ...e });
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = H(O(t, "addOptions", {
      name: t.name
    })), t.storage = H(O(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function yu(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: s = `

`, textSerializers: o = {} } = t || {};
  let l = "";
  return n.nodesBetween(r, i, (a, c, u, d) => {
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
    a.isText && (l += (f = a == null ? void 0 : a.text) === null || f === void 0 ? void 0 : f.slice(Math.max(r, c) - c, i - c));
  }), l;
}
function bu(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
const Gp = ge.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new be({
        key: new He("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, { ranges: s } = i, o = Math.min(...s.map((u) => u.$from.pos)), l = Math.max(...s.map((u) => u.$to.pos)), a = bu(t);
            return yu(r, { from: o, to: l }, {
              ...this.options.blockSeparator !== void 0 ? { blockSeparator: this.options.blockSeparator } : {},
              textSerializers: a
            });
          }
        }
      })
    ];
  }
}), Yp = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  var t;
  n.isDestroyed || (e.dom.blur(), (t = window == null ? void 0 : window.getSelection()) === null || t === void 0 || t.removeAllRanges());
}), !0), Xp = (n = !1) => ({ commands: e }) => e.setContent("", n), Qp = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: s, $to: o }) => {
    n.doc.nodesBetween(s.pos, o.pos, (l, a) => {
      if (l.type.isText)
        return;
      const { doc: c, mapping: u } = e, d = c.resolve(u.map(a)), f = c.resolve(u.map(a + l.nodeSize)), h = d.blockRange(f);
      if (!h)
        return;
      const p = Bn(h);
      if (l.type.isTextblock) {
        const { defaultType: m } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(h.start, m);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, Zp = (n) => (e) => n(e), em = () => ({ state: n, dispatch: e }) => xp(n, e), tm = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, s = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const o = r.mapping.map(e);
  return r.insert(o, s.content), r.setSelection(new R(r.doc.resolve(o - 1))), !0;
}, nm = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, r = t.$anchor.node();
  if (r.content.size > 0)
    return !1;
  const i = n.selection.$anchor;
  for (let s = i.depth; s > 0; s -= 1)
    if (i.node(s).type === r.type) {
      if (e) {
        const l = i.before(s), a = i.after(s);
        n.delete(l, a).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, rm = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Q(n, t.schema), s = e.selection.$anchor;
  for (let o = s.depth; o > 0; o -= 1)
    if (s.node(o).type === i) {
      if (r) {
        const a = s.before(o), c = s.after(o);
        e.delete(a, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, im = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, sm = () => ({ state: n, dispatch: e }) => cp(n, e), om = () => ({ commands: n }) => n.keyboardShortcut("Enter"), lm = () => ({ state: n, dispatch: e }) => kp(n, e);
function mi(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : zo(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function co(n, e, t = {}) {
  return n.find((r) => r.type === e && mi(r.attrs, t));
}
function am(n, e, t = {}) {
  return !!co(n, e, t);
}
function Fo(n, e, t = {}) {
  if (!n || !e)
    return;
  let r = n.parent.childAfter(n.parentOffset);
  if (n.parentOffset === r.offset && r.offset !== 0 && (r = n.parent.childBefore(n.parentOffset)), !r.node)
    return;
  const i = co([...r.node.marks], e, t);
  if (!i)
    return;
  let s = r.index, o = n.start() + r.offset, l = s + 1, a = o + r.node.nodeSize;
  for (co([...r.node.marks], e, t); s > 0 && i.isInSet(n.parent.child(s - 1).marks); )
    s -= 1, o -= n.parent.child(s).nodeSize;
  for (; l < n.parent.childCount && am([...n.parent.child(l).marks], e, t); )
    a += n.parent.child(l).nodeSize, l += 1;
  return {
    from: o,
    to: a
  };
}
function Pt(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n])
      throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const cm = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const s = Pt(n, r.schema), { doc: o, selection: l } = t, { $from: a, from: c, to: u } = l;
  if (i) {
    const d = Fo(a, s, e);
    if (d && d.from <= c && d.to >= u) {
      const f = R.create(o, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, um = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1)
    if (t[r](e))
      return !0;
  return !1;
};
function $o(n) {
  return n instanceof R;
}
function dt(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function vu(n, e = null) {
  if (!e)
    return null;
  const t = P.atStart(n), r = P.atEnd(n);
  if (e === "start" || e === !0)
    return t;
  if (e === "end")
    return r;
  const i = t.from, s = r.to;
  return e === "all" ? R.create(n, dt(0, i, s), dt(n.content.size, i, s)) : R.create(n, dt(e, i, s), dt(e, i, s));
}
function Vo() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const dm = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: s }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const o = () => {
    Vo() && r.dom.focus(), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  if (r.hasFocus() && n === null || n === !1)
    return !0;
  if (s && n === null && !$o(t.state.selection))
    return o(), !0;
  const l = vu(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return s && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0;
}, fm = (n, e) => (t) => n.every((r, i) => e(r, { ...t, index: i })), hm = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({ from: t.selection.from, to: t.selection.to }, n, e), ku = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && ku(r);
  }
  return n;
};
function Vr(n) {
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return ku(t);
}
function gi(n, e, t) {
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const r = typeof n == "object" && n !== null, i = typeof n == "string";
  if (r)
    try {
      if (Array.isArray(n) && n.length > 0)
        return x.fromArray(n.map((l) => e.nodeFromJSON(l)));
      const o = e.nodeFromJSON(n);
      return t.errorOnInvalidContent && o.check(), o;
    } catch (s) {
      if (t.errorOnInvalidContent)
        throw new Error("[tiptap error]: Invalid JSON content", { cause: s });
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", s), gi("", e, t);
    }
  if (i) {
    if (t.errorOnInvalidContent) {
      let o = !1, l = "";
      const a = new dc({
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
      if (t.slice ? Ot.fromSchema(a).parseSlice(Vr(n), t.parseOptions) : Ot.fromSchema(a).parse(Vr(n), t.parseOptions), t.errorOnInvalidContent && o)
        throw new Error("[tiptap error]: Invalid HTML content", { cause: new Error(`Invalid element found: ${l}`) });
    }
    const s = Ot.fromSchema(e);
    return t.slice ? s.parseSlice(Vr(n), t.parseOptions).content : s.parse(Vr(n), t.parseOptions);
  }
  return gi("", e, t);
}
function pm(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e)
    return;
  const i = n.steps[r];
  if (!(i instanceof te || i instanceof ne))
    return;
  const s = n.mapping.maps[r];
  let o = 0;
  s.forEach((l, a, c, u) => {
    o === 0 && (o = u);
  }), n.setSelection(P.near(n.doc.resolve(o), t));
}
const mm = (n) => !("type" in n), gm = (n, e, t) => ({ tr: r, dispatch: i, editor: s }) => {
  var o;
  if (i) {
    t = {
      parseOptions: {},
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let l;
    try {
      l = gi(e, s.schema, {
        parseOptions: {
          preserveWhitespace: "full",
          ...t.parseOptions
        },
        errorOnInvalidContent: (o = t.errorOnInvalidContent) !== null && o !== void 0 ? o : s.options.enableContentCheck
      });
    } catch (p) {
      return s.emit("contentError", {
        editor: s,
        error: p,
        disableCollaboration: () => {
          console.error("[tiptap error]: Unable to disable collaboration at this point in time");
        }
      }), !1;
    }
    let { from: a, to: c } = typeof n == "number" ? { from: n, to: n } : { from: n.from, to: n.to }, u = !0, d = !0;
    if ((mm(l) ? l : [l]).forEach((p) => {
      p.check(), u = u ? p.isText && p.marks.length === 0 : !1, d = d ? p.isBlock : !1;
    }), a === c && d) {
      const { parent: p } = r.doc.resolve(a);
      p.isTextblock && !p.type.spec.code && !p.childCount && (a -= 1, c += 1);
    }
    let h;
    u ? (Array.isArray(e) ? h = e.map((p) => p.text || "").join("") : typeof e == "object" && e && e.text ? h = e.text : h = e, r.insertText(h, a, c)) : (h = l, r.replaceWith(a, c, h)), t.updateSelection && pm(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", { from: a, text: h }), t.applyPasteRules && r.setMeta("applyPasteRules", { from: a, text: h });
  }
  return !0;
}, ym = () => ({ state: n, dispatch: e }) => gp(n, e), bm = () => ({ state: n, dispatch: e }) => yp(n, e), vm = () => ({ state: n, dispatch: e }) => up(n, e), km = () => ({ state: n, dispatch: e }) => pp(n, e), xm = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Qi(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Sm = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Qi(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, wm = () => ({ state: n, dispatch: e }) => dp(n, e), Tm = () => ({ state: n, dispatch: e }) => fp(n, e);
function xu() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Cm(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
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
      Vo() || xu() ? o = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), o && (t = `Meta-${t}`), s && (t = `Shift-${t}`), t;
}
const Mm = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const s = Cm(n).split(/-(?!$)/), o = s.find((c) => !["Alt", "Ctrl", "Meta", "Shift"].includes(c)), l = new KeyboardEvent("keydown", {
    key: o === "Space" ? " " : o,
    altKey: s.includes("Alt"),
    ctrlKey: s.includes("Ctrl"),
    metaKey: s.includes("Meta"),
    shiftKey: s.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), a = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (c) => c(t, l));
  });
  return a == null || a.steps.forEach((c) => {
    const u = c.map(r.mapping);
    u && i && r.maybeStep(u);
  }), !0;
};
function It(n, e, t = {}) {
  const { from: r, to: i, empty: s } = n.selection, o = e ? Q(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (d, f) => {
    if (d.isText)
      return;
    const h = Math.max(r, f), p = Math.min(i, f + d.nodeSize);
    l.push({
      node: d,
      from: h,
      to: p
    });
  });
  const a = i - r, c = l.filter((d) => o ? o.name === d.node.type.name : !0).filter((d) => mi(d.node.attrs, t, { strict: !1 }));
  return s ? !!c.length : c.reduce((d, f) => d + f.to - f.from, 0) >= a;
}
const Om = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Q(n, t.schema);
  return It(t, i, e) ? bp(t, r) : !1;
}, Em = () => ({ state: n, dispatch: e }) => Sp(n, e), Am = (n) => ({ state: e, dispatch: t }) => {
  const r = Q(n, e.schema);
  return Np(r)(e, t);
}, Nm = () => ({ state: n, dispatch: e }) => vp(n, e);
function us(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function ca(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const Dm = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let s = null, o = null;
  const l = us(typeof n == "string" ? n : n.name, r.schema);
  return l ? (l === "node" && (s = Q(n, r.schema)), l === "mark" && (o = Pt(n, r.schema)), i && t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (c, u) => {
      s && s === c.type && t.setNodeMarkup(u, void 0, ca(c.attrs, e)), o && c.marks.length && c.marks.forEach((d) => {
        o === d.type && t.addMark(u, u + c.nodeSize, o.create(ca(d.attrs, e)));
      });
    });
  }), !0) : !1;
}, Im = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), Rm = () => ({ tr: n, commands: e }) => e.setTextSelection({
  from: 0,
  to: n.doc.content.size
}), Lm = () => ({ state: n, dispatch: e }) => hp(n, e), Pm = () => ({ state: n, dispatch: e }) => mp(n, e), Bm = () => ({ state: n, dispatch: e }) => wp(n, e), Hm = () => ({ state: n, dispatch: e }) => Mp(n, e), zm = () => ({ state: n, dispatch: e }) => Cp(n, e);
function uo(n, e, t = {}, r = {}) {
  return gi(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const Fm = (n, e = !1, t = {}, r = {}) => ({ editor: i, tr: s, dispatch: o, commands: l }) => {
  var a, c;
  const { doc: u } = s;
  if (t.preserveWhitespace !== "full") {
    const d = uo(n, i.schema, t, {
      errorOnInvalidContent: (a = r.errorOnInvalidContent) !== null && a !== void 0 ? a : i.options.enableContentCheck
    });
    return o && s.replaceWith(0, u.content.size, d).setMeta("preventUpdate", !e), !0;
  }
  return o && s.setMeta("preventUpdate", !e), l.insertContentAt({ from: 0, to: u.content.size }, n, {
    parseOptions: t,
    errorOnInvalidContent: (c = r.errorOnInvalidContent) !== null && c !== void 0 ? c : i.options.enableContentCheck
  });
};
function ds(n, e) {
  const t = Pt(e, n.schema), { from: r, to: i, empty: s } = n.selection, o = [];
  s ? (n.storedMarks && o.push(...n.storedMarks), o.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (a) => {
    o.push(...a.marks);
  });
  const l = o.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function $m(n, e) {
  const t = new Cc(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function Vm(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
function jm(n, e, t) {
  const r = [];
  return n.nodesBetween(e.from, e.to, (i, s) => {
    t(i) && r.push({
      node: i,
      pos: s
    });
  }), r;
}
function Wm(n, e) {
  for (let t = n.depth; t > 0; t -= 1) {
    const r = n.node(t);
    if (e(r))
      return {
        pos: t > 0 ? n.before(t) : 0,
        start: n.start(t),
        depth: t,
        node: r
      };
  }
}
function fs(n) {
  return (e) => Wm(e.$from, n);
}
function Km(n, e) {
  const t = sn.fromSchema(e).serializeFragment(n), i = document.implementation.createHTMLDocument().createElement("div");
  return i.appendChild(t), i.innerHTML;
}
function Um(n, e) {
  const t = {
    from: 0,
    to: n.content.size
  };
  return yu(n, t, e);
}
function qm(n, e) {
  const t = Q(e, n.schema), { from: r, to: i } = n.selection, s = [];
  n.doc.nodesBetween(r, i, (l) => {
    s.push(l);
  });
  const o = s.reverse().find((l) => l.type.name === t.name);
  return o ? { ...o.attrs } : {};
}
function Su(n, e) {
  const t = us(typeof e == "string" ? e : e.name, n.schema);
  return t === "node" ? qm(n, e) : t === "mark" ? ds(n, e) : {};
}
function Jm(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function _m(n) {
  const e = Jm(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((s, o) => o !== r).some((s) => t.oldRange.from >= s.oldRange.from && t.oldRange.to <= s.oldRange.to && t.newRange.from >= s.newRange.from && t.newRange.to <= s.newRange.to));
}
function Gm(n) {
  const { mapping: e, steps: t } = n, r = [];
  return e.maps.forEach((i, s) => {
    const o = [];
    if (i.ranges.length)
      i.forEach((l, a) => {
        o.push({ from: l, to: a });
      });
    else {
      const { from: l, to: a } = t[s];
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
  }), _m(r);
}
function jo(n, e, t) {
  const r = [];
  return n === e ? t.resolve(n).marks().forEach((i) => {
    const s = t.resolve(n), o = Fo(s, i.type);
    o && r.push({
      mark: i,
      ...o
    });
  }) : t.nodesBetween(n, e, (i, s) => {
    !i || (i == null ? void 0 : i.nodeSize) === void 0 || r.push(...i.marks.map((o) => ({
      from: s,
      to: s + i.nodeSize,
      mark: o
    })));
  }), r;
}
const Ym = (n, e, t, r = 20) => {
  const i = n.doc.resolve(t);
  let s = r, o = null;
  for (; s > 0 && o === null; ) {
    const l = i.node(s);
    (l == null ? void 0 : l.type.name) === e ? o = l : s -= 1;
  }
  return [o, s];
};
function Qr(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((s) => s.type === e && s.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function fo(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, s = e ? Pt(e, n.schema) : null;
  if (r)
    return !!(n.storedMarks || n.selection.$from.marks()).filter((d) => s ? s.name === d.type.name : !0).find((d) => mi(d.attrs, t, { strict: !1 }));
  let o = 0;
  const l = [];
  if (i.forEach(({ $from: d, $to: f }) => {
    const h = d.pos, p = f.pos;
    n.doc.nodesBetween(h, p, (m, y) => {
      if (!m.isText && !m.marks.length)
        return;
      const b = Math.max(h, y), S = Math.min(p, y + m.nodeSize), w = S - b;
      o += w, l.push(...m.marks.map((g) => ({
        mark: g,
        from: b,
        to: S
      })));
    });
  }), o === 0)
    return !1;
  const a = l.filter((d) => s ? s.name === d.mark.type.name : !0).filter((d) => mi(d.mark.attrs, t, { strict: !1 })).reduce((d, f) => d + f.to - f.from, 0), c = l.filter((d) => s ? d.mark.type !== s && d.mark.type.excludes(s) : !0).reduce((d, f) => d + f.to - f.from, 0);
  return (a > 0 ? a + c : a) >= o;
}
function Xm(n, e, t = {}) {
  if (!e)
    return It(n, null, t) || fo(n, null, t);
  const r = us(e, n.schema);
  return r === "node" ? It(n, e, t) : r === "mark" ? fo(n, e, t) : !1;
}
const Qm = (n, e) => {
  const { $from: t, $to: r, $anchor: i } = n.selection;
  if (e) {
    const s = fs((l) => l.type.name === e)(n.selection);
    if (!s)
      return !1;
    const o = n.doc.resolve(s.pos + 1);
    return i.pos + 1 === o.end();
  }
  return !(r.parentOffset < r.parent.nodeSize - 2 || t.pos !== r.pos);
}, Zm = (n) => {
  const { $from: e, $to: t } = n.selection;
  return !(e.parentOffset > 0 || e.pos !== t.pos);
};
function ua(n, e) {
  const { nodeExtensions: t } = ls(e), r = t.find((o) => o.name === n);
  if (!r)
    return !1;
  const i = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, s = H(O(r, "group", i));
  return typeof s != "string" ? !1 : s.split(" ").includes("list");
}
function wu(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
  var r;
  if (t) {
    if (n.type.name === "hardBreak")
      return !0;
    if (n.isText)
      return /^\s*$/m.test((r = n.text) !== null && r !== void 0 ? r : "");
  }
  if (n.isText)
    return !n.text;
  if (n.isAtom || n.isLeaf)
    return !1;
  if (n.content.childCount === 0)
    return !0;
  if (e) {
    let i = !0;
    return n.content.forEach((s) => {
      i !== !1 && (wu(s, { ignoreWhitespace: t, checkChildren: e }) || (i = !1));
    }), i;
  }
  return !1;
}
function Tu(n) {
  return n instanceof N;
}
function Cu(n, e, t) {
  const i = n.state.doc.content.size, s = dt(e, 0, i), o = dt(t, 0, i), l = n.coordsAtPos(s), a = n.coordsAtPos(o, -1), c = Math.min(l.top, a.top), u = Math.max(l.bottom, a.bottom), d = Math.min(l.left, a.left), f = Math.max(l.right, a.right), h = f - d, p = u - c, b = {
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
    ...b,
    toJSON: () => b
  };
}
function eg(n, e, t) {
  var r;
  const { selection: i } = e;
  let s = null;
  if ($o(i) && (s = i.$cursor), s) {
    const l = (r = n.storedMarks) !== null && r !== void 0 ? r : s.marks();
    return !!t.isInSet(l) || !l.some((a) => a.type.excludes(t));
  }
  const { ranges: o } = i;
  return o.some(({ $from: l, $to: a }) => {
    let c = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, a.pos, (u, d, f) => {
      if (c)
        return !1;
      if (u.isInline) {
        const h = !f || f.type.allowsMarkType(t), p = !!t.isInSet(u.marks) || !u.marks.some((m) => m.type.excludes(t));
        c = h && p;
      }
      return !c;
    }), c;
  });
}
const tg = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: s } = t, { empty: o, ranges: l } = s, a = Pt(n, r.schema);
  if (i)
    if (o) {
      const c = ds(r, a);
      t.addStoredMark(a.create({
        ...c,
        ...e
      }));
    } else
      l.forEach((c) => {
        const u = c.$from.pos, d = c.$to.pos;
        r.doc.nodesBetween(u, d, (f, h) => {
          const p = Math.max(h, u), m = Math.min(h + f.nodeSize, d);
          f.marks.find((b) => b.type === a) ? f.marks.forEach((b) => {
            a === b.type && t.addMark(p, m, a.create({
              ...b.attrs,
              ...e
            }));
          }) : t.addMark(p, m, a.create(e));
        });
      });
  return eg(r, t, a);
}, ng = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), rg = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const s = Q(n, t.schema);
  return s.isTextblock ? i().command(({ commands: o }) => sa(s, e)(t) ? !0 : o.clearNodes()).command(({ state: o }) => sa(s, e)(o, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, ig = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = dt(n, 0, r.content.size), s = N.create(r, i);
    e.setSelection(s);
  }
  return !0;
}, sg = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: s } = typeof n == "number" ? { from: n, to: n } : n, o = R.atStart(r).from, l = R.atEnd(r).to, a = dt(i, o, l), c = dt(s, o, l), u = R.create(r, a, c);
    e.setSelection(u);
  }
  return !0;
}, og = (n) => ({ state: e, dispatch: t }) => {
  const r = Q(n, e.schema);
  return Rp(r)(e, t);
};
function da(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const lg = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: s, doc: o } = e, { $from: l, $to: a } = s, c = i.extensionManager.attributes, u = Qr(c, l.node().type.name, l.node().attrs);
  if (s instanceof N && s.node.isBlock)
    return !l.parentOffset || !wn(o, l.pos) ? !1 : (r && (n && da(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock)
    return !1;
  const d = a.parentOffset === a.parent.content.size, f = l.depth === 0 ? void 0 : Vm(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = d && f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0, p = wn(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !p && wn(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (p = !0, h = f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0), r) {
    if (p && (s instanceof R && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const m = e.mapping.map(l.before()), y = e.doc.resolve(m);
      l.node(-1).canReplaceWith(y.index(), y.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && da(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, ag = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: s }) => {
  var o;
  const l = Q(n, r.schema), { $from: a, $to: c } = r.selection, u = r.selection.node;
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
      let b = x.empty;
      const S = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
      for (let B = a.depth - S; B >= a.depth - 3; B -= 1)
        b = x.from(a.node(B).copy(b));
      const w = a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3, g = {
        ...Qr(f, a.node().type.name, a.node().attrs),
        ...e
      }, M = ((o = l.contentMatch.defaultType) === null || o === void 0 ? void 0 : o.createAndFill(g)) || void 0;
      b = b.append(x.from(l.createAndFill(null, M) || void 0));
      const k = a.before(a.depth - (S - 1));
      t.replace(k, a.after(-w), new C(b, 4 - S, 0));
      let D = -1;
      t.doc.nodesBetween(k, t.doc.content.size, (B, A) => {
        if (D > -1)
          return !1;
        B.isTextblock && B.content.size === 0 && (D = A + 1);
      }), D > -1 && t.setSelection(R.near(t.doc.resolve(D))), t.scrollIntoView();
    }
    return !0;
  }
  const h = c.pos === a.end() ? d.contentMatchAt(0).defaultType : null, p = {
    ...Qr(f, d.type.name, d.attrs),
    ...e
  }, m = {
    ...Qr(f, a.node().type.name, a.node().attrs),
    ...e
  };
  t.delete(a.pos, c.pos);
  const y = h ? [
    { type: l, attrs: p },
    { type: h, attrs: m }
  ] : [{ type: l, attrs: p }];
  if (!wn(t.doc, a.pos, 2))
    return !1;
  if (i) {
    const { selection: b, storedMarks: S } = r, { splittableMarks: w } = s.extensionManager, g = S || b.$to.parentOffset && b.$from.marks();
    if (t.split(a.pos, 2, y).scrollIntoView(), !g || !i)
      return !0;
    const M = g.filter((k) => w.includes(k.type.name));
    t.ensureMarks(M);
  }
  return !0;
}, Ls = (n, e) => {
  const t = fs((o) => o.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return t.node.type === (i == null ? void 0 : i.type) && Rt(n.doc, t.pos) && n.join(t.pos), !0;
}, Ps = (n, e) => {
  const t = fs((o) => o.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return t.node.type === (i == null ? void 0 : i.type) && Rt(n.doc, r) && n.join(r), !0;
}, cg = (n, e, t, r = {}) => ({ editor: i, tr: s, state: o, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = Q(n, o.schema), p = Q(e, o.schema), { selection: m, storedMarks: y } = o, { $from: b, $to: S } = m, w = b.blockRange(S), g = y || m.$to.parentOffset && m.$from.marks();
  if (!w)
    return !1;
  const M = fs((k) => ua(k.type.name, d))(m);
  if (w.depth >= 1 && M && w.depth - M.depth <= 1) {
    if (M.node.type === h)
      return c.liftListItem(p);
    if (ua(M.node.type.name, d) && h.validContent(M.node.content) && l)
      return a().command(() => (s.setNodeMarkup(M.pos, h), !0)).command(() => Ls(s, h)).command(() => Ps(s, h)).run();
  }
  return !t || !g || !l ? a().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => Ls(s, h)).command(() => Ps(s, h)).run() : a().command(() => {
    const k = u().wrapInList(h, r), D = g.filter((B) => f.includes(B.type.name));
    return s.ensureMarks(D), k ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => Ls(s, h)).command(() => Ps(s, h)).run();
}, ug = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: s = !1 } = t, o = Pt(n, r.schema);
  return fo(r, o, e) ? i.unsetMark(o, { extendEmptyMarkRange: s }) : i.setMark(o, e);
}, dg = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const s = Q(n, r.schema), o = Q(e, r.schema);
  return It(r, s, t) ? i.setNode(o) : i.setNode(s, t);
}, fg = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Q(n, t.schema);
  return It(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, hg = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let r = 0; r < t.length; r += 1) {
    const i = t[r];
    let s;
    if (i.spec.isInputRules && (s = i.getState(n))) {
      if (e) {
        const o = n.tr, l = s.transform;
        for (let a = l.steps.length - 1; a >= 0; a -= 1)
          o.step(l.steps[a].invert(l.docs[a]));
        if (s.text) {
          const a = o.doc.resolve(s.from).marks();
          o.replaceWith(s.from, s.to, n.schema.text(s.text, a));
        } else
          o.delete(s.from, s.to);
      }
      return !0;
    }
  }
  return !1;
}, pg = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, { empty: r, ranges: i } = t;
  return r || e && i.forEach((s) => {
    n.removeMark(s.$from.pos, s.$to.pos);
  }), !0;
}, mg = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  var s;
  const { extendEmptyMarkRange: o = !1 } = e, { selection: l } = t, a = Pt(n, r.schema), { $from: c, empty: u, ranges: d } = l;
  if (!i)
    return !0;
  if (u && o) {
    let { from: f, to: h } = l;
    const p = (s = c.marks().find((y) => y.type === a)) === null || s === void 0 ? void 0 : s.attrs, m = Fo(c, a, p);
    m && (f = m.from, h = m.to), t.removeMark(f, h, a);
  } else
    d.forEach((f) => {
      t.removeMark(f.$from.pos, f.$to.pos, a);
    });
  return t.removeStoredMark(a), !0;
}, gg = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let s = null, o = null;
  const l = us(typeof n == "string" ? n : n.name, r.schema);
  return l ? (l === "node" && (s = Q(n, r.schema)), l === "mark" && (o = Pt(n, r.schema)), i && t.selection.ranges.forEach((a) => {
    const c = a.$from.pos, u = a.$to.pos;
    r.doc.nodesBetween(c, u, (d, f) => {
      s && s === d.type && t.setNodeMarkup(f, void 0, {
        ...d.attrs,
        ...e
      }), o && d.marks.length && d.marks.forEach((h) => {
        if (o === h.type) {
          const p = Math.max(f, c), m = Math.min(f + d.nodeSize, u);
          t.addMark(p, m, o.create({
            ...h.attrs,
            ...e
          }));
        }
      });
    });
  }), !0) : !1;
}, yg = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Q(n, t.schema);
  return Op(i, e)(t, r);
}, bg = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Q(n, t.schema);
  return Ep(i, e)(t, r);
};
var vg = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur: Yp,
  clearContent: Xp,
  clearNodes: Qp,
  command: Zp,
  createParagraphNear: em,
  cut: tm,
  deleteCurrentNode: nm,
  deleteNode: rm,
  deleteRange: im,
  deleteSelection: sm,
  enter: om,
  exitCode: lm,
  extendMarkRange: cm,
  first: um,
  focus: dm,
  forEach: fm,
  insertContent: hm,
  insertContentAt: gm,
  joinBackward: vm,
  joinDown: bm,
  joinForward: km,
  joinItemBackward: xm,
  joinItemForward: Sm,
  joinTextblockBackward: wm,
  joinTextblockForward: Tm,
  joinUp: ym,
  keyboardShortcut: Mm,
  lift: Om,
  liftEmptyBlock: Em,
  liftListItem: Am,
  newlineInCode: Nm,
  resetAttributes: Dm,
  scrollIntoView: Im,
  selectAll: Rm,
  selectNodeBackward: Lm,
  selectNodeForward: Pm,
  selectParentNode: Bm,
  selectTextblockEnd: Hm,
  selectTextblockStart: zm,
  setContent: Fm,
  setMark: tg,
  setMeta: ng,
  setNode: rg,
  setNodeSelection: ig,
  setTextSelection: sg,
  sinkListItem: og,
  splitBlock: lg,
  splitListItem: ag,
  toggleList: cg,
  toggleMark: ug,
  toggleNode: dg,
  toggleWrap: fg,
  undoInputRule: hg,
  unsetAllMarks: pg,
  unsetMark: mg,
  updateAttributes: gg,
  wrapIn: yg,
  wrapInList: bg
});
const kg = ge.create({
  name: "commands",
  addCommands() {
    return {
      ...vg
    };
  }
}), xg = ge.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new be({
        key: new He("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), Sg = ge.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [
      new be({
        key: new He("focusEvents"),
        props: {
          handleDOMEvents: {
            focus: (e, t) => {
              n.isFocused = !0;
              const r = n.state.tr.setMeta("focus", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            },
            blur: (e, t) => {
              n.isFocused = !1;
              const r = n.state.tr.setMeta("blur", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            }
          }
        }
      })
    ];
  }
}), wg = ge.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: o }) => [
      () => o.undoInputRule(),
      // maybe convert first text block node to default node
      () => o.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: d } = a, { pos: f, parent: h } = d, p = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, m = p.parent.type.spec.isolating, y = d.pos - d.parentOffset, b = m && p.parent.childCount === 1 ? y === d.pos : P.atStart(c).from === f;
        return !u || !h.type.isTextblock || h.textContent.length || !b || b && d.parent.type.name === "paragraph" ? !1 : o.clearNodes();
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
      Backspace: n,
      "Mod-Backspace": n,
      "Shift-Backspace": n,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, i = {
      ...r
    }, s = {
      ...r,
      "Ctrl-h": n,
      "Alt-Backspace": n,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return Vo() || xu() ? s : i;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new be({
        key: new He("clearDocument"),
        appendTransaction: (n, e, t) => {
          if (!(n.some((p) => p.docChanged) && !e.doc.eq(t.doc)))
            return;
          const { empty: i, from: s, to: o } = e.selection, l = P.atStart(e.doc).from, a = P.atEnd(e.doc).to;
          if (i || !(s === l && o === a) || !(t.doc.textBetween(0, t.doc.content.size, " ", " ").length === 0))
            return;
          const d = t.tr, f = is({
            state: t,
            transaction: d
          }), { commands: h } = new ss({
            editor: this.editor,
            state: f
          });
          if (h.clearNodes(), !!d.steps.length)
            return d;
        }
      })
    ];
  }
}), Tg = ge.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new be({
        key: new He("tabindex"),
        props: {
          attributes: () => this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
class Wt {
  get name() {
    return this.node.type.name;
  }
  constructor(e, t, r = !1, i = null) {
    this.currentNode = null, this.actualDepth = null, this.isBlock = r, this.resolvedPos = e, this.editor = t, this.currentNode = i;
  }
  get node() {
    return this.currentNode || this.resolvedPos.node();
  }
  get element() {
    return this.editor.view.domAtPos(this.pos).node;
  }
  get depth() {
    var e;
    return (e = this.actualDepth) !== null && e !== void 0 ? e : this.resolvedPos.depth;
  }
  get pos() {
    return this.resolvedPos.pos;
  }
  get content() {
    return this.node.content;
  }
  set content(e) {
    let t = this.from, r = this.to;
    if (this.isBlock) {
      if (this.content.size === 0) {
        console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
        return;
      }
      t = this.from + 1, r = this.to - 1;
    }
    this.editor.commands.insertContentAt({ from: t, to: r }, e);
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
    const e = this.resolvedPos.start(this.resolvedPos.depth - 1), t = this.resolvedPos.doc.resolve(e);
    return new Wt(t, this.editor);
  }
  get before() {
    let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)), new Wt(e, this.editor);
  }
  get after() {
    let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)), new Wt(e, this.editor);
  }
  get children() {
    const e = [];
    return this.node.content.forEach((t, r) => {
      const i = t.isBlock && !t.isTextblock, s = this.pos + r + 1, o = this.resolvedPos.doc.resolve(s);
      if (!i && o.depth <= this.depth)
        return;
      const l = new Wt(o, this.editor, i, i ? t : null);
      i && (l.actualDepth = this.depth + 1), e.push(new Wt(o, this.editor, i, i ? t : null));
    }), e;
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get lastChild() {
    const e = this.children;
    return e[e.length - 1] || null;
  }
  closest(e, t = {}) {
    let r = null, i = this.parent;
    for (; i && !r; ) {
      if (i.node.type.name === e)
        if (Object.keys(t).length > 0) {
          const s = i.node.attrs, o = Object.keys(t);
          for (let l = 0; l < o.length; l += 1) {
            const a = o[l];
            if (s[a] !== t[a])
              break;
          }
        } else
          r = i;
      i = i.parent;
    }
    return r;
  }
  querySelector(e, t = {}) {
    return this.querySelectorAll(e, t, !0)[0] || null;
  }
  querySelectorAll(e, t = {}, r = !1) {
    let i = [];
    if (!this.children || this.children.length === 0)
      return i;
    const s = Object.keys(t);
    return this.children.forEach((o) => {
      r && i.length > 0 || (o.node.type.name === e && s.every((a) => t[a] === o.node.attrs[a]) && i.push(o), !(r && i.length > 0) && (i = i.concat(o.querySelectorAll(e, t, r))));
    }), i;
  }
  setAttribute(e) {
    const t = this.editor.state.selection;
    this.editor.chain().setTextSelection(this.from).updateAttributes(this.node.type.name, e).setTextSelection(t.from).run();
  }
}
const Cg = `.ProseMirror {
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
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
function Mg(n, e, t) {
  const r = document.querySelector("style[data-tiptap-style]");
  if (r !== null)
    return r;
  const i = document.createElement("style");
  return e && i.setAttribute("nonce", e), i.setAttribute("data-tiptap-style", ""), i.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(i), i;
}
let Og = class extends Lp {
  constructor(e = {}) {
    super(), this.isFocused = !1, this.isInitialized = !1, this.extensionStorage = {}, this.options = {
      element: document.createElement("div"),
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
      onBeforeCreate: () => null,
      onCreate: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null,
      onContentError: ({ error: t }) => {
        throw t;
      }
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("contentError", this.options.onContentError), this.createView(), this.injectCSS(), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), window.setTimeout(() => {
      this.isDestroyed || (this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
    }, 0);
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
    this.options.injectCSS && document && (this.css = Mg(Cg, this.options.injectNonce));
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
    }, !(!this.view || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  /**
   * Update editable state of the editor.
   */
  setEditable(e, t = !0) {
    this.setOptions({ editable: e }), t && this.emit("update", { editor: this, transaction: this.state.tr });
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
  get state() {
    return this.view.state;
  }
  /**
   * Register a ProseMirror plugin.
   *
   * @param plugin A ProseMirror plugin
   * @param handlePlugins Control how to merge the plugin into the existing plugins.
   */
  registerPlugin(e, t) {
    const r = gu(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], i = this.state.reconfigure({ plugins: r });
    this.view.updateState(i);
  }
  /**
   * Unregister a ProseMirror plugin.
   *
   * @param nameOrPluginKey The plugins name
   */
  unregisterPlugin(e) {
    if (this.isDestroyed)
      return;
    const t = typeof e == "string" ? `${e}$` : e.key, r = this.state.reconfigure({
      // @ts-ignore
      plugins: this.state.plugins.filter((i) => !i.key.startsWith(t))
    });
    this.view.updateState(r);
  }
  /**
   * Creates an extension manager.
   */
  createExtensionManager() {
    var e, t;
    const i = [...this.options.enableCoreExtensions ? [
      xg,
      Gp.configure({
        blockSeparator: (t = (e = this.options.coreExtensionOptions) === null || e === void 0 ? void 0 : e.clipboardTextSerializer) === null || t === void 0 ? void 0 : t.blockSeparator
      }),
      kg,
      Sg,
      wg,
      Tg
    ] : [], ...this.options.extensions].filter((s) => ["extension", "node", "mark"].includes(s == null ? void 0 : s.type));
    this.extensionManager = new xn(i, this);
  }
  /**
   * Creates an command manager.
   */
  createCommandManager() {
    this.commandManager = new ss({
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
   * Creates a ProseMirror view.
   */
  createView() {
    let e;
    try {
      e = uo(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
    } catch (s) {
      if (!(s instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(s.message))
        throw s;
      this.emit("contentError", {
        editor: this,
        error: s,
        disableCollaboration: () => {
          this.options.extensions = this.options.extensions.filter((o) => o.name !== "collaboration"), this.createExtensionManager();
        }
      }), e = uo(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: !1 });
    }
    const t = vu(e, this.options.autofocus);
    this.view = new Zh(this.options.element, {
      ...this.options.editorProps,
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: kn.create({
        doc: e,
        selection: t || void 0
      })
    });
    const r = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(r), this.createNodeViews(), this.prependClass();
    const i = this.view.dom;
    i.editor = this;
  }
  /**
   * Creates all node views.
   */
  createNodeViews() {
    this.view.isDestroyed || this.view.setProps({
      nodeViews: this.extensionManager.nodeViews
    });
  }
  /**
   * Prepend class name to element.
   */
  prependClass() {
    this.view.dom.className = `tiptap ${this.view.dom.className}`;
  }
  captureTransaction(e) {
    this.isCapturingTransaction = !0, e(), this.isCapturingTransaction = !1;
    const t = this.capturedTransaction;
    return this.capturedTransaction = null, t;
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
      e.steps.forEach((o) => {
        var l;
        return (l = this.capturedTransaction) === null || l === void 0 ? void 0 : l.step(o);
      });
      return;
    }
    const t = this.state.apply(e), r = !this.state.selection.eq(t.selection);
    this.emit("beforeTransaction", {
      editor: this,
      transaction: e,
      nextState: t
    }), this.view.updateState(t), this.emit("transaction", {
      editor: this,
      transaction: e
    }), r && this.emit("selectionUpdate", {
      editor: this,
      transaction: e
    });
    const i = e.getMeta("focus"), s = e.getMeta("blur");
    i && this.emit("focus", {
      editor: this,
      event: i.event,
      transaction: e
    }), s && this.emit("blur", {
      editor: this,
      event: s.event,
      transaction: e
    }), !(!e.docChanged || e.getMeta("preventUpdate")) && this.emit("update", {
      editor: this,
      transaction: e
    });
  }
  /**
   * Get attributes of the currently selected node or mark.
   */
  getAttributes(e) {
    return Su(this.state, e);
  }
  isActive(e, t) {
    const r = typeof e == "string" ? e : null, i = typeof e == "string" ? t : e;
    return Xm(this.state, r, i);
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
    return Km(this.state.doc.content, this.schema);
  }
  /**
   * Get the document as text.
   */
  getText(e) {
    const { blockSeparator: t = `

`, textSerializers: r = {} } = e || {};
    return Um(this.state.doc, {
      blockSeparator: t,
      textSerializers: {
        ...bu(this.schema),
        ...r
      }
    });
  }
  /**
   * Check if there is no content.
   */
  get isEmpty() {
    return wu(this.state.doc);
  }
  /**
   * Get the number of characters for the current document.
   *
   * @deprecated
   */
  getCharacterCount() {
    return console.warn('[tiptap warn]: "editor.getCharacterCount()" is deprecated. Please use "editor.storage.characterCount.characters()" instead.'), this.state.doc.content.size - 2;
  }
  /**
   * Destroy the editor.
   */
  destroy() {
    this.emit("destroy"), this.view && this.view.destroy(), this.removeAllListeners();
  }
  /**
   * Check if the editor is already destroyed.
   */
  get isDestroyed() {
    var e;
    return !(!((e = this.view) === null || e === void 0) && e.docView);
  }
  $node(e, t) {
    var r;
    return ((r = this.$doc) === null || r === void 0 ? void 0 : r.querySelector(e, t)) || null;
  }
  $nodes(e, t) {
    var r;
    return ((r = this.$doc) === null || r === void 0 ? void 0 : r.querySelectorAll(e, t)) || null;
  }
  $pos(e) {
    const t = this.state.doc.resolve(e);
    return new Wt(t, this);
  }
  get $doc() {
    return this.$pos(0);
  }
};
function ur(n) {
  return new as({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = H(n.getAttributes, void 0, r);
      if (i === !1 || i === null)
        return null;
      const { tr: s } = e, o = r[r.length - 1], l = r[0];
      if (o) {
        const a = l.search(/\S/), c = t.from + l.indexOf(o), u = c + o.length;
        if (jo(t.from, t.to, e.doc).filter((h) => h.mark.type.excluded.find((m) => m === n.type && m !== h.mark.type)).filter((h) => h.to > c).length)
          return null;
        u < t.to && s.delete(u, t.to), c > t.from && s.delete(t.from + a, c);
        const f = t.from + a + o.length;
        s.addMark(t.from + a, f, n.type.create(i || {})), s.removeStoredMark(n.type);
      }
    }
  });
}
function Eg(n) {
  return new as({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = H(n.getAttributes, void 0, r) || {}, { tr: s } = e, o = t.from;
      let l = t.to;
      const a = n.type.create(i);
      if (r[1]) {
        const c = r[0].lastIndexOf(r[1]);
        let u = o + c;
        u > l ? u = l : l = u + r[1].length;
        const d = r[0][r[0].length - 1];
        s.insertText(d, o + r[0].length - 1), s.replaceWith(u, l, a);
      } else if (r[0]) {
        const c = n.type.isInline ? o : o - 1;
        s.insert(c, n.type.create(i)).delete(s.mapping.map(o), s.mapping.map(l));
      }
      s.scrollIntoView();
    }
  });
}
function Ag(n) {
  return new as({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = e.doc.resolve(t.from), s = H(n.getAttributes, void 0, r) || {};
      if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), n.type))
        return null;
      e.tr.delete(t.from, t.to).setBlockType(t.from, t.from, n.type, s);
    }
  });
}
function dr(n) {
  return new as({
    find: n.find,
    handler: ({ state: e, range: t, match: r, chain: i }) => {
      const s = H(n.getAttributes, void 0, r) || {}, o = e.tr.delete(t.from, t.to), a = o.doc.resolve(t.from).blockRange(), c = a && Mo(a, n.type, s);
      if (!c)
        return null;
      if (o.wrap(a, c), n.keepMarks && n.editor) {
        const { selection: d, storedMarks: f } = e, { splittableMarks: h } = n.editor.extensionManager, p = f || d.$to.parentOffset && d.$from.marks();
        if (p) {
          const m = p.filter((y) => h.includes(y.type.name));
          o.ensureMarks(m);
        }
      }
      if (n.keepAttributes) {
        const d = n.type.name === "bulletList" || n.type.name === "orderedList" ? "listItem" : "taskList";
        i().updateAttributes(d, s).run();
      }
      const u = o.doc.resolve(t.from - 1).nodeBefore;
      u && u.type === n.type && Rt(o.doc, t.from - 1) && (!n.joinPredicate || n.joinPredicate(r, u)) && o.join(t.from - 1);
    }
  });
}
class Te {
  constructor(e = {}) {
    this.type = "mark", this.name = "mark", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = H(O(this, "addOptions", {
      name: this.name
    }))), this.storage = H(O(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new Te(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => cs(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new Te(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = H(O(t, "addOptions", {
      name: t.name
    })), t.storage = H(O(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  static handleExit({ editor: e, mark: t }) {
    const { tr: r } = e.state, i = e.state.selection.$from;
    if (i.pos === i.end()) {
      const o = i.marks();
      if (!!!o.find((c) => (c == null ? void 0 : c.type.name) === t.name))
        return !1;
      const a = o.find((c) => (c == null ? void 0 : c.type.name) === t.name);
      return a && r.removeStoredMark(a), r.insertText(" ", i.pos), e.view.dispatch(r), !0;
    }
    return !1;
  }
}
class ye {
  constructor(e = {}) {
    this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = H(O(this, "addOptions", {
      name: this.name
    }))), this.storage = H(O(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new ye(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => cs(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new ye(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = H(O(t, "addOptions", {
      name: t.name
    })), t.storage = H(O(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function Nn(n) {
  return new jp({
    find: n.find,
    handler: ({ state: e, range: t, match: r, pasteEvent: i }) => {
      const s = H(n.getAttributes, void 0, r, i);
      if (s === !1 || s === null)
        return null;
      const { tr: o } = e, l = r[r.length - 1], a = r[0];
      let c = t.to;
      if (l) {
        const u = a.search(/\S/), d = t.from + a.indexOf(l), f = d + l.length;
        if (jo(t.from, t.to, e.doc).filter((p) => p.mark.type.excluded.find((y) => y === n.type && y !== p.mark.type)).filter((p) => p.to > d).length)
          return null;
        f < t.to && o.delete(f, t.to), d > t.from && o.delete(t.from + u, d), c = t.from + u + l.length, o.addMark(t.from + u, c, n.type.create(s || {})), o.removeStoredMark(n.type);
      }
    }
  });
}
var xe = "top", Pe = "bottom", Be = "right", Se = "left", Wo = "auto", xr = [xe, Pe, Be, Se], Dn = "start", fr = "end", Ng = "clippingParents", Mu = "viewport", Kn = "popper", Dg = "reference", fa = /* @__PURE__ */ xr.reduce(function(n, e) {
  return n.concat([e + "-" + Dn, e + "-" + fr]);
}, []), Ou = /* @__PURE__ */ [].concat(xr, [Wo]).reduce(function(n, e) {
  return n.concat([e, e + "-" + Dn, e + "-" + fr]);
}, []), Ig = "beforeRead", Rg = "read", Lg = "afterRead", Pg = "beforeMain", Bg = "main", Hg = "afterMain", zg = "beforeWrite", Fg = "write", $g = "afterWrite", Vg = [Ig, Rg, Lg, Pg, Bg, Hg, zg, Fg, $g];
function rt(n) {
  return n ? (n.nodeName || "").toLowerCase() : null;
}
function Ce(n) {
  if (n == null)
    return window;
  if (n.toString() !== "[object Window]") {
    var e = n.ownerDocument;
    return e && e.defaultView || window;
  }
  return n;
}
function rn(n) {
  var e = Ce(n).Element;
  return n instanceof e || n instanceof Element;
}
function Le(n) {
  var e = Ce(n).HTMLElement;
  return n instanceof e || n instanceof HTMLElement;
}
function Ko(n) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Ce(n).ShadowRoot;
  return n instanceof e || n instanceof ShadowRoot;
}
function jg(n) {
  var e = n.state;
  Object.keys(e.elements).forEach(function(t) {
    var r = e.styles[t] || {}, i = e.attributes[t] || {}, s = e.elements[t];
    !Le(s) || !rt(s) || (Object.assign(s.style, r), Object.keys(i).forEach(function(o) {
      var l = i[o];
      l === !1 ? s.removeAttribute(o) : s.setAttribute(o, l === !0 ? "" : l);
    }));
  });
}
function Wg(n) {
  var e = n.state, t = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, t.popper), e.styles = t, e.elements.arrow && Object.assign(e.elements.arrow.style, t.arrow), function() {
    Object.keys(e.elements).forEach(function(r) {
      var i = e.elements[r], s = e.attributes[r] || {}, o = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : t[r]), l = o.reduce(function(a, c) {
        return a[c] = "", a;
      }, {});
      !Le(i) || !rt(i) || (Object.assign(i.style, l), Object.keys(s).forEach(function(a) {
        i.removeAttribute(a);
      }));
    });
  };
}
const Eu = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: jg,
  effect: Wg,
  requires: ["computeStyles"]
};
function et(n) {
  return n.split("-")[0];
}
var Qt = Math.max, yi = Math.min, In = Math.round;
function ho() {
  var n = navigator.userAgentData;
  return n != null && n.brands && Array.isArray(n.brands) ? n.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function Au() {
  return !/^((?!chrome|android).)*safari/i.test(ho());
}
function Rn(n, e, t) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  var r = n.getBoundingClientRect(), i = 1, s = 1;
  e && Le(n) && (i = n.offsetWidth > 0 && In(r.width) / n.offsetWidth || 1, s = n.offsetHeight > 0 && In(r.height) / n.offsetHeight || 1);
  var o = rn(n) ? Ce(n) : window, l = o.visualViewport, a = !Au() && t, c = (r.left + (a && l ? l.offsetLeft : 0)) / i, u = (r.top + (a && l ? l.offsetTop : 0)) / s, d = r.width / i, f = r.height / s;
  return {
    width: d,
    height: f,
    top: u,
    right: c + d,
    bottom: u + f,
    left: c,
    x: c,
    y: u
  };
}
function Uo(n) {
  var e = Rn(n), t = n.offsetWidth, r = n.offsetHeight;
  return Math.abs(e.width - t) <= 1 && (t = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: n.offsetLeft,
    y: n.offsetTop,
    width: t,
    height: r
  };
}
function Nu(n, e) {
  var t = e.getRootNode && e.getRootNode();
  if (n.contains(e))
    return !0;
  if (t && Ko(t)) {
    var r = e;
    do {
      if (r && n.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function ht(n) {
  return Ce(n).getComputedStyle(n);
}
function Kg(n) {
  return ["table", "td", "th"].indexOf(rt(n)) >= 0;
}
function Bt(n) {
  return ((rn(n) ? n.ownerDocument : (
    // $FlowFixMe[prop-missing]
    n.document
  )) || window.document).documentElement;
}
function hs(n) {
  return rt(n) === "html" ? n : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    n.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    n.parentNode || // DOM Element detected
    (Ko(n) ? n.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Bt(n)
  );
}
function ha(n) {
  return !Le(n) || // https://github.com/popperjs/popper-core/issues/837
  ht(n).position === "fixed" ? null : n.offsetParent;
}
function Ug(n) {
  var e = /firefox/i.test(ho()), t = /Trident/i.test(ho());
  if (t && Le(n)) {
    var r = ht(n);
    if (r.position === "fixed")
      return null;
  }
  var i = hs(n);
  for (Ko(i) && (i = i.host); Le(i) && ["html", "body"].indexOf(rt(i)) < 0; ) {
    var s = ht(i);
    if (s.transform !== "none" || s.perspective !== "none" || s.contain === "paint" || ["transform", "perspective"].indexOf(s.willChange) !== -1 || e && s.willChange === "filter" || e && s.filter && s.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function Sr(n) {
  for (var e = Ce(n), t = ha(n); t && Kg(t) && ht(t).position === "static"; )
    t = ha(t);
  return t && (rt(t) === "html" || rt(t) === "body" && ht(t).position === "static") ? e : t || Ug(n) || e;
}
function qo(n) {
  return ["top", "bottom"].indexOf(n) >= 0 ? "x" : "y";
}
function Qn(n, e, t) {
  return Qt(n, yi(e, t));
}
function qg(n, e, t) {
  var r = Qn(n, e, t);
  return r > t ? t : r;
}
function Du() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Iu(n) {
  return Object.assign({}, Du(), n);
}
function Ru(n, e) {
  return e.reduce(function(t, r) {
    return t[r] = n, t;
  }, {});
}
var Jg = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, {
    placement: t.placement
  })) : e, Iu(typeof e != "number" ? e : Ru(e, xr));
};
function _g(n) {
  var e, t = n.state, r = n.name, i = n.options, s = t.elements.arrow, o = t.modifiersData.popperOffsets, l = et(t.placement), a = qo(l), c = [Se, Be].indexOf(l) >= 0, u = c ? "height" : "width";
  if (!(!s || !o)) {
    var d = Jg(i.padding, t), f = Uo(s), h = a === "y" ? xe : Se, p = a === "y" ? Pe : Be, m = t.rects.reference[u] + t.rects.reference[a] - o[a] - t.rects.popper[u], y = o[a] - t.rects.reference[a], b = Sr(s), S = b ? a === "y" ? b.clientHeight || 0 : b.clientWidth || 0 : 0, w = m / 2 - y / 2, g = d[h], M = S - f[u] - d[p], k = S / 2 - f[u] / 2 + w, D = Qn(g, k, M), B = a;
    t.modifiersData[r] = (e = {}, e[B] = D, e.centerOffset = D - k, e);
  }
}
function Gg(n) {
  var e = n.state, t = n.options, r = t.element, i = r === void 0 ? "[data-popper-arrow]" : r;
  i != null && (typeof i == "string" && (i = e.elements.popper.querySelector(i), !i) || Nu(e.elements.popper, i) && (e.elements.arrow = i));
}
const Yg = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: _g,
  effect: Gg,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Ln(n) {
  return n.split("-")[1];
}
var Xg = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Qg(n, e) {
  var t = n.x, r = n.y, i = e.devicePixelRatio || 1;
  return {
    x: In(t * i) / i || 0,
    y: In(r * i) / i || 0
  };
}
function pa(n) {
  var e, t = n.popper, r = n.popperRect, i = n.placement, s = n.variation, o = n.offsets, l = n.position, a = n.gpuAcceleration, c = n.adaptive, u = n.roundOffsets, d = n.isFixed, f = o.x, h = f === void 0 ? 0 : f, p = o.y, m = p === void 0 ? 0 : p, y = typeof u == "function" ? u({
    x: h,
    y: m
  }) : {
    x: h,
    y: m
  };
  h = y.x, m = y.y;
  var b = o.hasOwnProperty("x"), S = o.hasOwnProperty("y"), w = Se, g = xe, M = window;
  if (c) {
    var k = Sr(t), D = "clientHeight", B = "clientWidth";
    if (k === Ce(t) && (k = Bt(t), ht(k).position !== "static" && l === "absolute" && (D = "scrollHeight", B = "scrollWidth")), k = k, i === xe || (i === Se || i === Be) && s === fr) {
      g = Pe;
      var A = d && k === M && M.visualViewport ? M.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        k[D]
      );
      m -= A - r.height, m *= a ? 1 : -1;
    }
    if (i === Se || (i === xe || i === Pe) && s === fr) {
      w = Be;
      var z = d && k === M && M.visualViewport ? M.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        k[B]
      );
      h -= z - r.width, h *= a ? 1 : -1;
    }
  }
  var V = Object.assign({
    position: l
  }, c && Xg), j = u === !0 ? Qg({
    x: h,
    y: m
  }, Ce(t)) : {
    x: h,
    y: m
  };
  if (h = j.x, m = j.y, a) {
    var W;
    return Object.assign({}, V, (W = {}, W[g] = S ? "0" : "", W[w] = b ? "0" : "", W.transform = (M.devicePixelRatio || 1) <= 1 ? "translate(" + h + "px, " + m + "px)" : "translate3d(" + h + "px, " + m + "px, 0)", W));
  }
  return Object.assign({}, V, (e = {}, e[g] = S ? m + "px" : "", e[w] = b ? h + "px" : "", e.transform = "", e));
}
function Zg(n) {
  var e = n.state, t = n.options, r = t.gpuAcceleration, i = r === void 0 ? !0 : r, s = t.adaptive, o = s === void 0 ? !0 : s, l = t.roundOffsets, a = l === void 0 ? !0 : l, c = {
    placement: et(e.placement),
    variation: Ln(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: i,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, pa(Object.assign({}, c, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: o,
    roundOffsets: a
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, pa(Object.assign({}, c, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const ey = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Zg,
  data: {}
};
var jr = {
  passive: !0
};
function ty(n) {
  var e = n.state, t = n.instance, r = n.options, i = r.scroll, s = i === void 0 ? !0 : i, o = r.resize, l = o === void 0 ? !0 : o, a = Ce(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return s && c.forEach(function(u) {
    u.addEventListener("scroll", t.update, jr);
  }), l && a.addEventListener("resize", t.update, jr), function() {
    s && c.forEach(function(u) {
      u.removeEventListener("scroll", t.update, jr);
    }), l && a.removeEventListener("resize", t.update, jr);
  };
}
const ny = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: ty,
  data: {}
};
var ry = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Zr(n) {
  return n.replace(/left|right|bottom|top/g, function(e) {
    return ry[e];
  });
}
var iy = {
  start: "end",
  end: "start"
};
function ma(n) {
  return n.replace(/start|end/g, function(e) {
    return iy[e];
  });
}
function Jo(n) {
  var e = Ce(n), t = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: r
  };
}
function _o(n) {
  return Rn(Bt(n)).left + Jo(n).scrollLeft;
}
function sy(n, e) {
  var t = Ce(n), r = Bt(n), i = t.visualViewport, s = r.clientWidth, o = r.clientHeight, l = 0, a = 0;
  if (i) {
    s = i.width, o = i.height;
    var c = Au();
    (c || !c && e === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: s,
    height: o,
    x: l + _o(n),
    y: a
  };
}
function oy(n) {
  var e, t = Bt(n), r = Jo(n), i = (e = n.ownerDocument) == null ? void 0 : e.body, s = Qt(t.scrollWidth, t.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = Qt(t.scrollHeight, t.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), l = -r.scrollLeft + _o(n), a = -r.scrollTop;
  return ht(i || t).direction === "rtl" && (l += Qt(t.clientWidth, i ? i.clientWidth : 0) - s), {
    width: s,
    height: o,
    x: l,
    y: a
  };
}
function Go(n) {
  var e = ht(n), t = e.overflow, r = e.overflowX, i = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + i + r);
}
function Lu(n) {
  return ["html", "body", "#document"].indexOf(rt(n)) >= 0 ? n.ownerDocument.body : Le(n) && Go(n) ? n : Lu(hs(n));
}
function Zn(n, e) {
  var t;
  e === void 0 && (e = []);
  var r = Lu(n), i = r === ((t = n.ownerDocument) == null ? void 0 : t.body), s = Ce(r), o = i ? [s].concat(s.visualViewport || [], Go(r) ? r : []) : r, l = e.concat(o);
  return i ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Zn(hs(o)))
  );
}
function po(n) {
  return Object.assign({}, n, {
    left: n.x,
    top: n.y,
    right: n.x + n.width,
    bottom: n.y + n.height
  });
}
function ly(n, e) {
  var t = Rn(n, !1, e === "fixed");
  return t.top = t.top + n.clientTop, t.left = t.left + n.clientLeft, t.bottom = t.top + n.clientHeight, t.right = t.left + n.clientWidth, t.width = n.clientWidth, t.height = n.clientHeight, t.x = t.left, t.y = t.top, t;
}
function ga(n, e, t) {
  return e === Mu ? po(sy(n, t)) : rn(e) ? ly(e, t) : po(oy(Bt(n)));
}
function ay(n) {
  var e = Zn(hs(n)), t = ["absolute", "fixed"].indexOf(ht(n).position) >= 0, r = t && Le(n) ? Sr(n) : n;
  return rn(r) ? e.filter(function(i) {
    return rn(i) && Nu(i, r) && rt(i) !== "body";
  }) : [];
}
function cy(n, e, t, r) {
  var i = e === "clippingParents" ? ay(n) : [].concat(e), s = [].concat(i, [t]), o = s[0], l = s.reduce(function(a, c) {
    var u = ga(n, c, r);
    return a.top = Qt(u.top, a.top), a.right = yi(u.right, a.right), a.bottom = yi(u.bottom, a.bottom), a.left = Qt(u.left, a.left), a;
  }, ga(n, o, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Pu(n) {
  var e = n.reference, t = n.element, r = n.placement, i = r ? et(r) : null, s = r ? Ln(r) : null, o = e.x + e.width / 2 - t.width / 2, l = e.y + e.height / 2 - t.height / 2, a;
  switch (i) {
    case xe:
      a = {
        x: o,
        y: e.y - t.height
      };
      break;
    case Pe:
      a = {
        x: o,
        y: e.y + e.height
      };
      break;
    case Be:
      a = {
        x: e.x + e.width,
        y: l
      };
      break;
    case Se:
      a = {
        x: e.x - t.width,
        y: l
      };
      break;
    default:
      a = {
        x: e.x,
        y: e.y
      };
  }
  var c = i ? qo(i) : null;
  if (c != null) {
    var u = c === "y" ? "height" : "width";
    switch (s) {
      case Dn:
        a[c] = a[c] - (e[u] / 2 - t[u] / 2);
        break;
      case fr:
        a[c] = a[c] + (e[u] / 2 - t[u] / 2);
        break;
    }
  }
  return a;
}
function hr(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, i = r === void 0 ? n.placement : r, s = t.strategy, o = s === void 0 ? n.strategy : s, l = t.boundary, a = l === void 0 ? Ng : l, c = t.rootBoundary, u = c === void 0 ? Mu : c, d = t.elementContext, f = d === void 0 ? Kn : d, h = t.altBoundary, p = h === void 0 ? !1 : h, m = t.padding, y = m === void 0 ? 0 : m, b = Iu(typeof y != "number" ? y : Ru(y, xr)), S = f === Kn ? Dg : Kn, w = n.rects.popper, g = n.elements[p ? S : f], M = cy(rn(g) ? g : g.contextElement || Bt(n.elements.popper), a, u, o), k = Rn(n.elements.reference), D = Pu({
    reference: k,
    element: w,
    strategy: "absolute",
    placement: i
  }), B = po(Object.assign({}, w, D)), A = f === Kn ? B : k, z = {
    top: M.top - A.top + b.top,
    bottom: A.bottom - M.bottom + b.bottom,
    left: M.left - A.left + b.left,
    right: A.right - M.right + b.right
  }, V = n.modifiersData.offset;
  if (f === Kn && V) {
    var j = V[i];
    Object.keys(z).forEach(function(W) {
      var ae = [Be, Pe].indexOf(W) >= 0 ? 1 : -1, ie = [xe, Pe].indexOf(W) >= 0 ? "y" : "x";
      z[W] += j[ie] * ae;
    });
  }
  return z;
}
function uy(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, i = t.boundary, s = t.rootBoundary, o = t.padding, l = t.flipVariations, a = t.allowedAutoPlacements, c = a === void 0 ? Ou : a, u = Ln(r), d = u ? l ? fa : fa.filter(function(p) {
    return Ln(p) === u;
  }) : xr, f = d.filter(function(p) {
    return c.indexOf(p) >= 0;
  });
  f.length === 0 && (f = d);
  var h = f.reduce(function(p, m) {
    return p[m] = hr(n, {
      placement: m,
      boundary: i,
      rootBoundary: s,
      padding: o
    })[et(m)], p;
  }, {});
  return Object.keys(h).sort(function(p, m) {
    return h[p] - h[m];
  });
}
function dy(n) {
  if (et(n) === Wo)
    return [];
  var e = Zr(n);
  return [ma(n), e, ma(e)];
}
function fy(n) {
  var e = n.state, t = n.options, r = n.name;
  if (!e.modifiersData[r]._skip) {
    for (var i = t.mainAxis, s = i === void 0 ? !0 : i, o = t.altAxis, l = o === void 0 ? !0 : o, a = t.fallbackPlacements, c = t.padding, u = t.boundary, d = t.rootBoundary, f = t.altBoundary, h = t.flipVariations, p = h === void 0 ? !0 : h, m = t.allowedAutoPlacements, y = e.options.placement, b = et(y), S = b === y, w = a || (S || !p ? [Zr(y)] : dy(y)), g = [y].concat(w).reduce(function(it, ze) {
      return it.concat(et(ze) === Wo ? uy(e, {
        placement: ze,
        boundary: u,
        rootBoundary: d,
        padding: c,
        flipVariations: p,
        allowedAutoPlacements: m
      }) : ze);
    }, []), M = e.rects.reference, k = e.rects.popper, D = /* @__PURE__ */ new Map(), B = !0, A = g[0], z = 0; z < g.length; z++) {
      var V = g[z], j = et(V), W = Ln(V) === Dn, ae = [xe, Pe].indexOf(j) >= 0, ie = ae ? "width" : "height", Y = hr(e, {
        placement: V,
        boundary: u,
        rootBoundary: d,
        altBoundary: f,
        padding: c
      }), U = ae ? W ? Be : Se : W ? Pe : xe;
      M[ie] > k[ie] && (U = Zr(U));
      var q = Zr(U), Ue = [];
      if (s && Ue.push(Y[j] <= 0), l && Ue.push(Y[U] <= 0, Y[q] <= 0), Ue.every(function(it) {
        return it;
      })) {
        A = V, B = !1;
        break;
      }
      D.set(V, Ue);
    }
    if (B)
      for (var qe = p ? 3 : 1, Ht = function(ze) {
        var st = g.find(function(on) {
          var ot = D.get(on);
          if (ot)
            return ot.slice(0, ze).every(function(ln) {
              return ln;
            });
        });
        if (st)
          return A = st, "break";
      }, Je = qe; Je > 0; Je--) {
        var zt = Ht(Je);
        if (zt === "break") break;
      }
    e.placement !== A && (e.modifiersData[r]._skip = !0, e.placement = A, e.reset = !0);
  }
}
const hy = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: fy,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ya(n, e, t) {
  return t === void 0 && (t = {
    x: 0,
    y: 0
  }), {
    top: n.top - e.height - t.y,
    right: n.right - e.width + t.x,
    bottom: n.bottom - e.height + t.y,
    left: n.left - e.width - t.x
  };
}
function ba(n) {
  return [xe, Be, Pe, Se].some(function(e) {
    return n[e] >= 0;
  });
}
function py(n) {
  var e = n.state, t = n.name, r = e.rects.reference, i = e.rects.popper, s = e.modifiersData.preventOverflow, o = hr(e, {
    elementContext: "reference"
  }), l = hr(e, {
    altBoundary: !0
  }), a = ya(o, r), c = ya(l, i, s), u = ba(a), d = ba(c);
  e.modifiersData[t] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: c,
    isReferenceHidden: u,
    hasPopperEscaped: d
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": d
  });
}
const my = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: py
};
function gy(n, e, t) {
  var r = et(n), i = [Se, xe].indexOf(r) >= 0 ? -1 : 1, s = typeof t == "function" ? t(Object.assign({}, e, {
    placement: n
  })) : t, o = s[0], l = s[1];
  return o = o || 0, l = (l || 0) * i, [Se, Be].indexOf(r) >= 0 ? {
    x: l,
    y: o
  } : {
    x: o,
    y: l
  };
}
function yy(n) {
  var e = n.state, t = n.options, r = n.name, i = t.offset, s = i === void 0 ? [0, 0] : i, o = Ou.reduce(function(u, d) {
    return u[d] = gy(d, e.rects, s), u;
  }, {}), l = o[e.placement], a = l.x, c = l.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += a, e.modifiersData.popperOffsets.y += c), e.modifiersData[r] = o;
}
const by = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: yy
};
function vy(n) {
  var e = n.state, t = n.name;
  e.modifiersData[t] = Pu({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const ky = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: vy,
  data: {}
};
function xy(n) {
  return n === "x" ? "y" : "x";
}
function Sy(n) {
  var e = n.state, t = n.options, r = n.name, i = t.mainAxis, s = i === void 0 ? !0 : i, o = t.altAxis, l = o === void 0 ? !1 : o, a = t.boundary, c = t.rootBoundary, u = t.altBoundary, d = t.padding, f = t.tether, h = f === void 0 ? !0 : f, p = t.tetherOffset, m = p === void 0 ? 0 : p, y = hr(e, {
    boundary: a,
    rootBoundary: c,
    padding: d,
    altBoundary: u
  }), b = et(e.placement), S = Ln(e.placement), w = !S, g = qo(b), M = xy(g), k = e.modifiersData.popperOffsets, D = e.rects.reference, B = e.rects.popper, A = typeof m == "function" ? m(Object.assign({}, e.rects, {
    placement: e.placement
  })) : m, z = typeof A == "number" ? {
    mainAxis: A,
    altAxis: A
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, A), V = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, j = {
    x: 0,
    y: 0
  };
  if (k) {
    if (s) {
      var W, ae = g === "y" ? xe : Se, ie = g === "y" ? Pe : Be, Y = g === "y" ? "height" : "width", U = k[g], q = U + y[ae], Ue = U - y[ie], qe = h ? -B[Y] / 2 : 0, Ht = S === Dn ? D[Y] : B[Y], Je = S === Dn ? -B[Y] : -D[Y], zt = e.elements.arrow, it = h && zt ? Uo(zt) : {
        width: 0,
        height: 0
      }, ze = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Du(), st = ze[ae], on = ze[ie], ot = Qn(0, D[Y], it[Y]), ln = w ? D[Y] / 2 - qe - ot - st - z.mainAxis : Ht - ot - st - z.mainAxis, pt = w ? -D[Y] / 2 + qe + ot + on + z.mainAxis : Je + ot + on + z.mainAxis, an = e.elements.arrow && Sr(e.elements.arrow), wr = an ? g === "y" ? an.clientTop || 0 : an.clientLeft || 0 : 0, zn = (W = V == null ? void 0 : V[g]) != null ? W : 0, Tr = U + ln - zn - wr, Cr = U + pt - zn, Fn = Qn(h ? yi(q, Tr) : q, U, h ? Qt(Ue, Cr) : Ue);
      k[g] = Fn, j[g] = Fn - U;
    }
    if (l) {
      var $n, Mr = g === "x" ? xe : Se, Or = g === "x" ? Pe : Be, lt = k[M], mt = M === "y" ? "height" : "width", Vn = lt + y[Mr], Ft = lt - y[Or], jn = [xe, Se].indexOf(b) !== -1, Er = ($n = V == null ? void 0 : V[M]) != null ? $n : 0, Ar = jn ? Vn : lt - D[mt] - B[mt] - Er + z.altAxis, Nr = jn ? lt + D[mt] + B[mt] - Er - z.altAxis : Ft, Dr = h && jn ? qg(Ar, lt, Nr) : Qn(h ? Ar : Vn, lt, h ? Nr : Ft);
      k[M] = Dr, j[M] = Dr - lt;
    }
    e.modifiersData[r] = j;
  }
}
const wy = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Sy,
  requiresIfExists: ["offset"]
};
function Ty(n) {
  return {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  };
}
function Cy(n) {
  return n === Ce(n) || !Le(n) ? Jo(n) : Ty(n);
}
function My(n) {
  var e = n.getBoundingClientRect(), t = In(e.width) / n.offsetWidth || 1, r = In(e.height) / n.offsetHeight || 1;
  return t !== 1 || r !== 1;
}
function Oy(n, e, t) {
  t === void 0 && (t = !1);
  var r = Le(e), i = Le(e) && My(e), s = Bt(e), o = Rn(n, i, t), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (r || !r && !t) && ((rt(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Go(s)) && (l = Cy(e)), Le(e) ? (a = Rn(e, !0), a.x += e.clientLeft, a.y += e.clientTop) : s && (a.x = _o(s))), {
    x: o.left + l.scrollLeft - a.x,
    y: o.top + l.scrollTop - a.y,
    width: o.width,
    height: o.height
  };
}
function Ey(n) {
  var e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), r = [];
  n.forEach(function(s) {
    e.set(s.name, s);
  });
  function i(s) {
    t.add(s.name);
    var o = [].concat(s.requires || [], s.requiresIfExists || []);
    o.forEach(function(l) {
      if (!t.has(l)) {
        var a = e.get(l);
        a && i(a);
      }
    }), r.push(s);
  }
  return n.forEach(function(s) {
    t.has(s.name) || i(s);
  }), r;
}
function Ay(n) {
  var e = Ey(n);
  return Vg.reduce(function(t, r) {
    return t.concat(e.filter(function(i) {
      return i.phase === r;
    }));
  }, []);
}
function Ny(n) {
  var e;
  return function() {
    return e || (e = new Promise(function(t) {
      Promise.resolve().then(function() {
        e = void 0, t(n());
      });
    })), e;
  };
}
function Dy(n) {
  var e = n.reduce(function(t, r) {
    var i = t[r.name];
    return t[r.name] = i ? Object.assign({}, i, r, {
      options: Object.assign({}, i.options, r.options),
      data: Object.assign({}, i.data, r.data)
    }) : r, t;
  }, {});
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}
var va = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function ka() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Iy(n) {
  n === void 0 && (n = {});
  var e = n, t = e.defaultModifiers, r = t === void 0 ? [] : t, i = e.defaultOptions, s = i === void 0 ? va : i;
  return function(l, a, c) {
    c === void 0 && (c = s);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, va, s),
      modifiersData: {},
      elements: {
        reference: l,
        popper: a
      },
      attributes: {},
      styles: {}
    }, d = [], f = !1, h = {
      state: u,
      setOptions: function(b) {
        var S = typeof b == "function" ? b(u.options) : b;
        m(), u.options = Object.assign({}, s, u.options, S), u.scrollParents = {
          reference: rn(l) ? Zn(l) : l.contextElement ? Zn(l.contextElement) : [],
          popper: Zn(a)
        };
        var w = Ay(Dy([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = w.filter(function(g) {
          return g.enabled;
        }), p(), h.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var b = u.elements, S = b.reference, w = b.popper;
          if (ka(S, w)) {
            u.rects = {
              reference: Oy(S, Sr(w), u.options.strategy === "fixed"),
              popper: Uo(w)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(z) {
              return u.modifiersData[z.name] = Object.assign({}, z.data);
            });
            for (var g = 0; g < u.orderedModifiers.length; g++) {
              if (u.reset === !0) {
                u.reset = !1, g = -1;
                continue;
              }
              var M = u.orderedModifiers[g], k = M.fn, D = M.options, B = D === void 0 ? {} : D, A = M.name;
              typeof k == "function" && (u = k({
                state: u,
                options: B,
                name: A,
                instance: h
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Ny(function() {
        return new Promise(function(y) {
          h.forceUpdate(), y(u);
        });
      }),
      destroy: function() {
        m(), f = !0;
      }
    };
    if (!ka(l, a))
      return h;
    h.setOptions(c).then(function(y) {
      !f && c.onFirstUpdate && c.onFirstUpdate(y);
    });
    function p() {
      u.orderedModifiers.forEach(function(y) {
        var b = y.name, S = y.options, w = S === void 0 ? {} : S, g = y.effect;
        if (typeof g == "function") {
          var M = g({
            state: u,
            name: b,
            instance: h,
            options: w
          }), k = function() {
          };
          d.push(M || k);
        }
      });
    }
    function m() {
      d.forEach(function(y) {
        return y();
      }), d = [];
    }
    return h;
  };
}
var Ry = [ny, ky, ey, Eu, by, hy, wy, Yg, my], Ly = /* @__PURE__ */ Iy({
  defaultModifiers: Ry
}), Py = "tippy-box", Bu = "tippy-content", By = "tippy-backdrop", Hu = "tippy-arrow", zu = "tippy-svg-arrow", Vt = {
  passive: !0,
  capture: !0
}, Fu = function() {
  return document.body;
};
function Bs(n, e, t) {
  if (Array.isArray(n)) {
    var r = n[e];
    return r ?? (Array.isArray(t) ? t[e] : t);
  }
  return n;
}
function Yo(n, e) {
  var t = {}.toString.call(n);
  return t.indexOf("[object") === 0 && t.indexOf(e + "]") > -1;
}
function $u(n, e) {
  return typeof n == "function" ? n.apply(void 0, e) : n;
}
function xa(n, e) {
  if (e === 0)
    return n;
  var t;
  return function(r) {
    clearTimeout(t), t = setTimeout(function() {
      n(r);
    }, e);
  };
}
function Hy(n) {
  return n.split(/\s+/).filter(Boolean);
}
function bn(n) {
  return [].concat(n);
}
function Sa(n, e) {
  n.indexOf(e) === -1 && n.push(e);
}
function zy(n) {
  return n.filter(function(e, t) {
    return n.indexOf(e) === t;
  });
}
function Fy(n) {
  return n.split("-")[0];
}
function bi(n) {
  return [].slice.call(n);
}
function wa(n) {
  return Object.keys(n).reduce(function(e, t) {
    return n[t] !== void 0 && (e[t] = n[t]), e;
  }, {});
}
function er() {
  return document.createElement("div");
}
function ps(n) {
  return ["Element", "Fragment"].some(function(e) {
    return Yo(n, e);
  });
}
function $y(n) {
  return Yo(n, "NodeList");
}
function Vy(n) {
  return Yo(n, "MouseEvent");
}
function jy(n) {
  return !!(n && n._tippy && n._tippy.reference === n);
}
function Wy(n) {
  return ps(n) ? [n] : $y(n) ? bi(n) : Array.isArray(n) ? n : bi(document.querySelectorAll(n));
}
function Hs(n, e) {
  n.forEach(function(t) {
    t && (t.style.transitionDuration = e + "ms");
  });
}
function Ta(n, e) {
  n.forEach(function(t) {
    t && t.setAttribute("data-state", e);
  });
}
function Ky(n) {
  var e, t = bn(n), r = t[0];
  return r != null && (e = r.ownerDocument) != null && e.body ? r.ownerDocument : document;
}
function Uy(n, e) {
  var t = e.clientX, r = e.clientY;
  return n.every(function(i) {
    var s = i.popperRect, o = i.popperState, l = i.props, a = l.interactiveBorder, c = Fy(o.placement), u = o.modifiersData.offset;
    if (!u)
      return !0;
    var d = c === "bottom" ? u.top.y : 0, f = c === "top" ? u.bottom.y : 0, h = c === "right" ? u.left.x : 0, p = c === "left" ? u.right.x : 0, m = s.top - r + d > a, y = r - s.bottom - f > a, b = s.left - t + h > a, S = t - s.right - p > a;
    return m || y || b || S;
  });
}
function zs(n, e, t) {
  var r = e + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(i) {
    n[r](i, t);
  });
}
function Ca(n, e) {
  for (var t = e; t; ) {
    var r;
    if (n.contains(t))
      return !0;
    t = t.getRootNode == null || (r = t.getRootNode()) == null ? void 0 : r.host;
  }
  return !1;
}
var Qe = {
  isTouch: !1
}, Ma = 0;
function qy() {
  Qe.isTouch || (Qe.isTouch = !0, window.performance && document.addEventListener("mousemove", Vu));
}
function Vu() {
  var n = performance.now();
  n - Ma < 20 && (Qe.isTouch = !1, document.removeEventListener("mousemove", Vu)), Ma = n;
}
function Jy() {
  var n = document.activeElement;
  if (jy(n)) {
    var e = n._tippy;
    n.blur && !e.state.isVisible && n.blur();
  }
}
function _y() {
  document.addEventListener("touchstart", qy, Vt), window.addEventListener("blur", Jy);
}
var Gy = typeof window < "u" && typeof document < "u", Yy = Gy ? (
  // @ts-ignore
  !!window.msCrypto
) : !1, Xy = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, Qy = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, je = Object.assign({
  appendTo: Fu,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: !0,
  ignoreAttributes: !1,
  interactive: !1,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function() {
  },
  onBeforeUpdate: function() {
  },
  onCreate: function() {
  },
  onDestroy: function() {
  },
  onHidden: function() {
  },
  onHide: function() {
  },
  onMount: function() {
  },
  onShow: function() {
  },
  onShown: function() {
  },
  onTrigger: function() {
  },
  onUntrigger: function() {
  },
  onClickOutside: function() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: !1,
  touch: !0,
  trigger: "mouseenter focus",
  triggerTarget: null
}, Xy, Qy), Zy = Object.keys(je), e0 = function(e) {
  var t = Object.keys(e);
  t.forEach(function(r) {
    je[r] = e[r];
  });
};
function ju(n) {
  var e = n.plugins || [], t = e.reduce(function(r, i) {
    var s = i.name, o = i.defaultValue;
    if (s) {
      var l;
      r[s] = n[s] !== void 0 ? n[s] : (l = je[s]) != null ? l : o;
    }
    return r;
  }, {});
  return Object.assign({}, n, t);
}
function t0(n, e) {
  var t = e ? Object.keys(ju(Object.assign({}, je, {
    plugins: e
  }))) : Zy, r = t.reduce(function(i, s) {
    var o = (n.getAttribute("data-tippy-" + s) || "").trim();
    if (!o)
      return i;
    if (s === "content")
      i[s] = o;
    else
      try {
        i[s] = JSON.parse(o);
      } catch {
        i[s] = o;
      }
    return i;
  }, {});
  return r;
}
function Oa(n, e) {
  var t = Object.assign({}, e, {
    content: $u(e.content, [n])
  }, e.ignoreAttributes ? {} : t0(n, e.plugins));
  return t.aria = Object.assign({}, je.aria, t.aria), t.aria = {
    expanded: t.aria.expanded === "auto" ? e.interactive : t.aria.expanded,
    content: t.aria.content === "auto" ? e.interactive ? null : "describedby" : t.aria.content
  }, t;
}
var n0 = function() {
  return "innerHTML";
};
function mo(n, e) {
  n[n0()] = e;
}
function Ea(n) {
  var e = er();
  return n === !0 ? e.className = Hu : (e.className = zu, ps(n) ? e.appendChild(n) : mo(e, n)), e;
}
function Aa(n, e) {
  ps(e.content) ? (mo(n, ""), n.appendChild(e.content)) : typeof e.content != "function" && (e.allowHTML ? mo(n, e.content) : n.textContent = e.content);
}
function go(n) {
  var e = n.firstElementChild, t = bi(e.children);
  return {
    box: e,
    content: t.find(function(r) {
      return r.classList.contains(Bu);
    }),
    arrow: t.find(function(r) {
      return r.classList.contains(Hu) || r.classList.contains(zu);
    }),
    backdrop: t.find(function(r) {
      return r.classList.contains(By);
    })
  };
}
function Wu(n) {
  var e = er(), t = er();
  t.className = Py, t.setAttribute("data-state", "hidden"), t.setAttribute("tabindex", "-1");
  var r = er();
  r.className = Bu, r.setAttribute("data-state", "hidden"), Aa(r, n.props), e.appendChild(t), t.appendChild(r), i(n.props, n.props);
  function i(s, o) {
    var l = go(e), a = l.box, c = l.content, u = l.arrow;
    o.theme ? a.setAttribute("data-theme", o.theme) : a.removeAttribute("data-theme"), typeof o.animation == "string" ? a.setAttribute("data-animation", o.animation) : a.removeAttribute("data-animation"), o.inertia ? a.setAttribute("data-inertia", "") : a.removeAttribute("data-inertia"), a.style.maxWidth = typeof o.maxWidth == "number" ? o.maxWidth + "px" : o.maxWidth, o.role ? a.setAttribute("role", o.role) : a.removeAttribute("role"), (s.content !== o.content || s.allowHTML !== o.allowHTML) && Aa(c, n.props), o.arrow ? u ? s.arrow !== o.arrow && (a.removeChild(u), a.appendChild(Ea(o.arrow))) : a.appendChild(Ea(o.arrow)) : u && a.removeChild(u);
  }
  return {
    popper: e,
    onUpdate: i
  };
}
Wu.$$tippy = !0;
var r0 = 1, Wr = [], Fs = [];
function i0(n, e) {
  var t = Oa(n, Object.assign({}, je, ju(wa(e)))), r, i, s, o = !1, l = !1, a = !1, c = !1, u, d, f, h = [], p = xa(Tr, t.interactiveDebounce), m, y = r0++, b = null, S = zy(t.plugins), w = {
    // Is the instance currently enabled?
    isEnabled: !0,
    // Is the tippy currently showing and not transitioning out?
    isVisible: !1,
    // Has the instance been destroyed?
    isDestroyed: !1,
    // Is the tippy currently mounted to the DOM?
    isMounted: !1,
    // Has the tippy finished transitioning in?
    isShown: !1
  }, g = {
    // properties
    id: y,
    reference: n,
    popper: er(),
    popperInstance: b,
    props: t,
    state: w,
    plugins: S,
    // methods
    clearDelayTimeouts: Ar,
    setProps: Nr,
    setContent: Dr,
    show: id,
    hide: sd,
    hideWithInteractivity: od,
    enable: jn,
    disable: Er,
    unmount: ld,
    destroy: ad
  };
  if (!t.render)
    return g;
  var M = t.render(g), k = M.popper, D = M.onUpdate;
  k.setAttribute("data-tippy-root", ""), k.id = "tippy-" + g.id, g.popper = k, n._tippy = g, k._tippy = g;
  var B = S.map(function(v) {
    return v.fn(g);
  }), A = n.hasAttribute("aria-expanded");
  return an(), qe(), U(), q("onCreate", [g]), t.showOnCreate && Vn(), k.addEventListener("mouseenter", function() {
    g.props.interactive && g.state.isVisible && g.clearDelayTimeouts();
  }), k.addEventListener("mouseleave", function() {
    g.props.interactive && g.props.trigger.indexOf("mouseenter") >= 0 && ae().addEventListener("mousemove", p);
  }), g;
  function z() {
    var v = g.props.touch;
    return Array.isArray(v) ? v : [v, 0];
  }
  function V() {
    return z()[0] === "hold";
  }
  function j() {
    var v;
    return !!((v = g.props.render) != null && v.$$tippy);
  }
  function W() {
    return m || n;
  }
  function ae() {
    var v = W().parentNode;
    return v ? Ky(v) : document;
  }
  function ie() {
    return go(k);
  }
  function Y(v) {
    return g.state.isMounted && !g.state.isVisible || Qe.isTouch || u && u.type === "focus" ? 0 : Bs(g.props.delay, v ? 0 : 1, je.delay);
  }
  function U(v) {
    v === void 0 && (v = !1), k.style.pointerEvents = g.props.interactive && !v ? "" : "none", k.style.zIndex = "" + g.props.zIndex;
  }
  function q(v, E, I) {
    if (I === void 0 && (I = !0), B.forEach(function(F) {
      F[v] && F[v].apply(F, E);
    }), I) {
      var $;
      ($ = g.props)[v].apply($, E);
    }
  }
  function Ue() {
    var v = g.props.aria;
    if (v.content) {
      var E = "aria-" + v.content, I = k.id, $ = bn(g.props.triggerTarget || n);
      $.forEach(function(F) {
        var fe = F.getAttribute(E);
        if (g.state.isVisible)
          F.setAttribute(E, fe ? fe + " " + I : I);
        else {
          var Me = fe && fe.replace(I, "").trim();
          Me ? F.setAttribute(E, Me) : F.removeAttribute(E);
        }
      });
    }
  }
  function qe() {
    if (!(A || !g.props.aria.expanded)) {
      var v = bn(g.props.triggerTarget || n);
      v.forEach(function(E) {
        g.props.interactive ? E.setAttribute("aria-expanded", g.state.isVisible && E === W() ? "true" : "false") : E.removeAttribute("aria-expanded");
      });
    }
  }
  function Ht() {
    ae().removeEventListener("mousemove", p), Wr = Wr.filter(function(v) {
      return v !== p;
    });
  }
  function Je(v) {
    if (!(Qe.isTouch && (a || v.type === "mousedown"))) {
      var E = v.composedPath && v.composedPath()[0] || v.target;
      if (!(g.props.interactive && Ca(k, E))) {
        if (bn(g.props.triggerTarget || n).some(function(I) {
          return Ca(I, E);
        })) {
          if (Qe.isTouch || g.state.isVisible && g.props.trigger.indexOf("click") >= 0)
            return;
        } else
          q("onClickOutside", [g, v]);
        g.props.hideOnClick === !0 && (g.clearDelayTimeouts(), g.hide(), l = !0, setTimeout(function() {
          l = !1;
        }), g.state.isMounted || st());
      }
    }
  }
  function zt() {
    a = !0;
  }
  function it() {
    a = !1;
  }
  function ze() {
    var v = ae();
    v.addEventListener("mousedown", Je, !0), v.addEventListener("touchend", Je, Vt), v.addEventListener("touchstart", it, Vt), v.addEventListener("touchmove", zt, Vt);
  }
  function st() {
    var v = ae();
    v.removeEventListener("mousedown", Je, !0), v.removeEventListener("touchend", Je, Vt), v.removeEventListener("touchstart", it, Vt), v.removeEventListener("touchmove", zt, Vt);
  }
  function on(v, E) {
    ln(v, function() {
      !g.state.isVisible && k.parentNode && k.parentNode.contains(k) && E();
    });
  }
  function ot(v, E) {
    ln(v, E);
  }
  function ln(v, E) {
    var I = ie().box;
    function $(F) {
      F.target === I && (zs(I, "remove", $), E());
    }
    if (v === 0)
      return E();
    zs(I, "remove", d), zs(I, "add", $), d = $;
  }
  function pt(v, E, I) {
    I === void 0 && (I = !1);
    var $ = bn(g.props.triggerTarget || n);
    $.forEach(function(F) {
      F.addEventListener(v, E, I), h.push({
        node: F,
        eventType: v,
        handler: E,
        options: I
      });
    });
  }
  function an() {
    V() && (pt("touchstart", zn, {
      passive: !0
    }), pt("touchend", Cr, {
      passive: !0
    })), Hy(g.props.trigger).forEach(function(v) {
      if (v !== "manual")
        switch (pt(v, zn), v) {
          case "mouseenter":
            pt("mouseleave", Cr);
            break;
          case "focus":
            pt(Yy ? "focusout" : "blur", Fn);
            break;
          case "focusin":
            pt("focusout", Fn);
            break;
        }
    });
  }
  function wr() {
    h.forEach(function(v) {
      var E = v.node, I = v.eventType, $ = v.handler, F = v.options;
      E.removeEventListener(I, $, F);
    }), h = [];
  }
  function zn(v) {
    var E, I = !1;
    if (!(!g.state.isEnabled || $n(v) || l)) {
      var $ = ((E = u) == null ? void 0 : E.type) === "focus";
      u = v, m = v.currentTarget, qe(), !g.state.isVisible && Vy(v) && Wr.forEach(function(F) {
        return F(v);
      }), v.type === "click" && (g.props.trigger.indexOf("mouseenter") < 0 || o) && g.props.hideOnClick !== !1 && g.state.isVisible ? I = !0 : Vn(v), v.type === "click" && (o = !I), I && !$ && Ft(v);
    }
  }
  function Tr(v) {
    var E = v.target, I = W().contains(E) || k.contains(E);
    if (!(v.type === "mousemove" && I)) {
      var $ = mt().concat(k).map(function(F) {
        var fe, Me = F._tippy, cn = (fe = Me.popperInstance) == null ? void 0 : fe.state;
        return cn ? {
          popperRect: F.getBoundingClientRect(),
          popperState: cn,
          props: t
        } : null;
      }).filter(Boolean);
      Uy($, v) && (Ht(), Ft(v));
    }
  }
  function Cr(v) {
    var E = $n(v) || g.props.trigger.indexOf("click") >= 0 && o;
    if (!E) {
      if (g.props.interactive) {
        g.hideWithInteractivity(v);
        return;
      }
      Ft(v);
    }
  }
  function Fn(v) {
    g.props.trigger.indexOf("focusin") < 0 && v.target !== W() || g.props.interactive && v.relatedTarget && k.contains(v.relatedTarget) || Ft(v);
  }
  function $n(v) {
    return Qe.isTouch ? V() !== v.type.indexOf("touch") >= 0 : !1;
  }
  function Mr() {
    Or();
    var v = g.props, E = v.popperOptions, I = v.placement, $ = v.offset, F = v.getReferenceClientRect, fe = v.moveTransition, Me = j() ? go(k).arrow : null, cn = F ? {
      getBoundingClientRect: F,
      contextElement: F.contextElement || W()
    } : n, sl = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(Ir) {
        var un = Ir.state;
        if (j()) {
          var cd = ie(), bs = cd.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(Rr) {
            Rr === "placement" ? bs.setAttribute("data-placement", un.placement) : un.attributes.popper["data-popper-" + Rr] ? bs.setAttribute("data-" + Rr, "") : bs.removeAttribute("data-" + Rr);
          }), un.attributes.popper = {};
        }
      }
    }, $t = [{
      name: "offset",
      options: {
        offset: $
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !fe
      }
    }, sl];
    j() && Me && $t.push({
      name: "arrow",
      options: {
        element: Me,
        padding: 3
      }
    }), $t.push.apply($t, (E == null ? void 0 : E.modifiers) || []), g.popperInstance = Ly(cn, k, Object.assign({}, E, {
      placement: I,
      onFirstUpdate: f,
      modifiers: $t
    }));
  }
  function Or() {
    g.popperInstance && (g.popperInstance.destroy(), g.popperInstance = null);
  }
  function lt() {
    var v = g.props.appendTo, E, I = W();
    g.props.interactive && v === Fu || v === "parent" ? E = I.parentNode : E = $u(v, [I]), E.contains(k) || E.appendChild(k), g.state.isMounted = !0, Mr();
  }
  function mt() {
    return bi(k.querySelectorAll("[data-tippy-root]"));
  }
  function Vn(v) {
    g.clearDelayTimeouts(), v && q("onTrigger", [g, v]), ze();
    var E = Y(!0), I = z(), $ = I[0], F = I[1];
    Qe.isTouch && $ === "hold" && F && (E = F), E ? r = setTimeout(function() {
      g.show();
    }, E) : g.show();
  }
  function Ft(v) {
    if (g.clearDelayTimeouts(), q("onUntrigger", [g, v]), !g.state.isVisible) {
      st();
      return;
    }
    if (!(g.props.trigger.indexOf("mouseenter") >= 0 && g.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(v.type) >= 0 && o)) {
      var E = Y(!1);
      E ? i = setTimeout(function() {
        g.state.isVisible && g.hide();
      }, E) : s = requestAnimationFrame(function() {
        g.hide();
      });
    }
  }
  function jn() {
    g.state.isEnabled = !0;
  }
  function Er() {
    g.hide(), g.state.isEnabled = !1;
  }
  function Ar() {
    clearTimeout(r), clearTimeout(i), cancelAnimationFrame(s);
  }
  function Nr(v) {
    if (!g.state.isDestroyed) {
      q("onBeforeUpdate", [g, v]), wr();
      var E = g.props, I = Oa(n, Object.assign({}, E, wa(v), {
        ignoreAttributes: !0
      }));
      g.props = I, an(), E.interactiveDebounce !== I.interactiveDebounce && (Ht(), p = xa(Tr, I.interactiveDebounce)), E.triggerTarget && !I.triggerTarget ? bn(E.triggerTarget).forEach(function($) {
        $.removeAttribute("aria-expanded");
      }) : I.triggerTarget && n.removeAttribute("aria-expanded"), qe(), U(), D && D(E, I), g.popperInstance && (Mr(), mt().forEach(function($) {
        requestAnimationFrame($._tippy.popperInstance.forceUpdate);
      })), q("onAfterUpdate", [g, v]);
    }
  }
  function Dr(v) {
    g.setProps({
      content: v
    });
  }
  function id() {
    var v = g.state.isVisible, E = g.state.isDestroyed, I = !g.state.isEnabled, $ = Qe.isTouch && !g.props.touch, F = Bs(g.props.duration, 0, je.duration);
    if (!(v || E || I || $) && !W().hasAttribute("disabled") && (q("onShow", [g], !1), g.props.onShow(g) !== !1)) {
      if (g.state.isVisible = !0, j() && (k.style.visibility = "visible"), U(), ze(), g.state.isMounted || (k.style.transition = "none"), j()) {
        var fe = ie(), Me = fe.box, cn = fe.content;
        Hs([Me, cn], 0);
      }
      f = function() {
        var $t;
        if (!(!g.state.isVisible || c)) {
          if (c = !0, k.offsetHeight, k.style.transition = g.props.moveTransition, j() && g.props.animation) {
            var ys = ie(), Ir = ys.box, un = ys.content;
            Hs([Ir, un], F), Ta([Ir, un], "visible");
          }
          Ue(), qe(), Sa(Fs, g), ($t = g.popperInstance) == null || $t.forceUpdate(), q("onMount", [g]), g.props.animation && j() && ot(F, function() {
            g.state.isShown = !0, q("onShown", [g]);
          });
        }
      }, lt();
    }
  }
  function sd() {
    var v = !g.state.isVisible, E = g.state.isDestroyed, I = !g.state.isEnabled, $ = Bs(g.props.duration, 1, je.duration);
    if (!(v || E || I) && (q("onHide", [g], !1), g.props.onHide(g) !== !1)) {
      if (g.state.isVisible = !1, g.state.isShown = !1, c = !1, o = !1, j() && (k.style.visibility = "hidden"), Ht(), st(), U(!0), j()) {
        var F = ie(), fe = F.box, Me = F.content;
        g.props.animation && (Hs([fe, Me], $), Ta([fe, Me], "hidden"));
      }
      Ue(), qe(), g.props.animation ? j() && on($, g.unmount) : g.unmount();
    }
  }
  function od(v) {
    ae().addEventListener("mousemove", p), Sa(Wr, p), p(v);
  }
  function ld() {
    g.state.isVisible && g.hide(), g.state.isMounted && (Or(), mt().forEach(function(v) {
      v._tippy.unmount();
    }), k.parentNode && k.parentNode.removeChild(k), Fs = Fs.filter(function(v) {
      return v !== g;
    }), g.state.isMounted = !1, q("onHidden", [g]));
  }
  function ad() {
    g.state.isDestroyed || (g.clearDelayTimeouts(), g.unmount(), wr(), delete n._tippy, g.state.isDestroyed = !0, q("onDestroy", [g]));
  }
}
function Hn(n, e) {
  e === void 0 && (e = {});
  var t = je.plugins.concat(e.plugins || []);
  _y();
  var r = Object.assign({}, e, {
    plugins: t
  }), i = Wy(n), s = i.reduce(function(o, l) {
    var a = l && i0(l, r);
    return a && o.push(a), o;
  }, []);
  return ps(n) ? s[0] : s;
}
Hn.defaultProps = je;
Hn.setDefaultProps = e0;
Hn.currentInput = Qe;
Object.assign({}, Eu, {
  effect: function(e) {
    var t = e.state, r = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow);
  }
});
Hn.setDefaultProps({
  render: Wu
});
class s0 {
  constructor({ editor: e, element: t, view: r, tippyOptions: i = {}, updateDelay: s = 250, shouldShow: o }) {
    this.preventHide = !1, this.shouldShow = ({ view: l, state: a, from: c, to: u }) => {
      const { doc: d, selection: f } = a, { empty: h } = f, p = !d.textBetween(c, u).length && $o(a.selection), m = this.element.contains(document.activeElement);
      return !(!(l.hasFocus() || m) || h || p || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.dragstartHandler = () => {
      this.hide();
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: l }) => {
      var a;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      l != null && l.relatedTarget && (!((a = this.element.parentNode) === null || a === void 0) && a.contains(l.relatedTarget)) || this.hide();
    }, this.tippyBlurHandler = (l) => {
      this.blurHandler({ event: l });
    }, this.handleDebouncedUpdate = (l, a) => {
      const c = !(a != null && a.selection.eq(l.state.selection)), u = !(a != null && a.doc.eq(l.state.doc));
      !c && !u || (this.updateDebounceTimer && clearTimeout(this.updateDebounceTimer), this.updateDebounceTimer = window.setTimeout(() => {
        this.updateHandler(l, c, u, a);
      }, this.updateDelay));
    }, this.updateHandler = (l, a, c, u) => {
      var d, f, h;
      const { state: p, composing: m } = l, { selection: y } = p;
      if (m || !a && !c)
        return;
      this.createTooltip();
      const { ranges: S } = y, w = Math.min(...S.map((k) => k.$from.pos)), g = Math.max(...S.map((k) => k.$to.pos));
      if (!((d = this.shouldShow) === null || d === void 0 ? void 0 : d.call(this, {
        editor: this.editor,
        view: l,
        state: p,
        oldState: u,
        from: w,
        to: g
      }))) {
        this.hide();
        return;
      }
      (f = this.tippy) === null || f === void 0 || f.setProps({
        getReferenceClientRect: ((h = this.tippyOptions) === null || h === void 0 ? void 0 : h.getReferenceClientRect) || (() => {
          if (Tu(p.selection)) {
            let k = l.nodeDOM(w);
            const D = k.dataset.nodeViewWrapper ? k : k.querySelector("[data-node-view-wrapper]");
            if (D && (k = D.firstChild), k)
              return k.getBoundingClientRect();
          }
          return Cu(l, w, g);
        })
      }), this.show();
    }, this.editor = e, this.element = t, this.view = r, this.updateDelay = s, o && (this.shouldShow = o), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.addEventListener("dragstart", this.dragstartHandler), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = i, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: e } = this.editor.options, t = !!e.parentElement;
    this.tippy || !t || (this.tippy = Hn(e, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "top",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler));
  }
  update(e, t) {
    const { state: r } = e, i = r.selection.from !== r.selection.to;
    if (this.updateDelay > 0 && i) {
      this.handleDebouncedUpdate(e, t);
      return;
    }
    const s = !(t != null && t.selection.eq(e.state.selection)), o = !(t != null && t.doc.eq(e.state.doc));
    this.updateHandler(e, s, o, t);
  }
  show() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.show();
  }
  hide() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.hide();
  }
  destroy() {
    var e, t;
    !((e = this.tippy) === null || e === void 0) && e.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (t = this.tippy) === null || t === void 0 || t.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.removeEventListener("dragstart", this.dragstartHandler), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const Ku = (n) => new be({
  key: typeof n.pluginKey == "string" ? new He(n.pluginKey) : n.pluginKey,
  view: (e) => new s0({ view: e, ...n })
});
ge.create({
  name: "bubbleMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "bubbleMenu",
      updateDelay: void 0,
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      Ku({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        updateDelay: this.options.updateDelay,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
class o0 {
  constructor({ editor: e, element: t, view: r, tippyOptions: i = {}, shouldShow: s }) {
    this.preventHide = !1, this.shouldShow = ({ view: o, state: l }) => {
      const { selection: a } = l, { $anchor: c, empty: u } = a, d = c.depth === 1, f = c.parent.isTextblock && !c.parent.type.spec.code && !c.parent.textContent;
      return !(!o.hasFocus() || !u || !d || !f || !this.editor.isEditable);
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
      o != null && o.relatedTarget && (!((l = this.element.parentNode) === null || l === void 0) && l.contains(o.relatedTarget)) || this.hide();
    }, this.tippyBlurHandler = (o) => {
      this.blurHandler({ event: o });
    }, this.editor = e, this.element = t, this.view = r, s && (this.shouldShow = s), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = i, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: e } = this.editor.options, t = !!e.parentElement;
    this.tippy || !t || (this.tippy = Hn(e, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "right",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler));
  }
  update(e, t) {
    var r, i, s;
    const { state: o } = e, { doc: l, selection: a } = o, { from: c, to: u } = a;
    if (t && t.doc.eq(l) && t.selection.eq(a))
      return;
    if (this.createTooltip(), !((r = this.shouldShow) === null || r === void 0 ? void 0 : r.call(this, {
      editor: this.editor,
      view: e,
      state: o,
      oldState: t
    }))) {
      this.hide();
      return;
    }
    (i = this.tippy) === null || i === void 0 || i.setProps({
      getReferenceClientRect: ((s = this.tippyOptions) === null || s === void 0 ? void 0 : s.getReferenceClientRect) || (() => Cu(e, c, u))
    }), this.show();
  }
  show() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.show();
  }
  hide() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.hide();
  }
  destroy() {
    var e, t;
    !((e = this.tippy) === null || e === void 0) && e.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (t = this.tippy) === null || t === void 0 || t.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const Uu = (n) => new be({
  key: typeof n.pluginKey == "string" ? new He(n.pluginKey) : n.pluginKey,
  view: (e) => new o0({ view: e, ...n })
});
ge.create({
  name: "floatingMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "floatingMenu",
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      Uu({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
const l0 = gr({
  name: "BubbleMenu",
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
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(n, { slots: e }) {
    const t = Gi(null);
    return To(() => {
      const { updateDelay: r, editor: i, pluginKey: s, shouldShow: o, tippyOptions: l } = n;
      i.registerPlugin(Ku({
        updateDelay: r,
        editor: i,
        element: t.value,
        pluginKey: s,
        shouldShow: o,
        tippyOptions: l
      }));
    }), Yi(() => {
      const { pluginKey: r, editor: i } = n;
      i.unregisterPlugin(r);
    }), () => {
      var r;
      return yr("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
function Na(n) {
  return md((e, t) => ({
    get() {
      return e(), n;
    },
    set(r) {
      n = r, requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          t();
        });
      });
    }
  }));
}
class a0 extends Og {
  constructor(e = {}) {
    return super(e), this.contentComponent = null, this.appContext = null, this.reactiveState = Na(this.view.state), this.reactiveExtensionStorage = Na(this.extensionStorage), this.on("beforeTransaction", ({ nextState: t }) => {
      this.reactiveState.value = t, this.reactiveExtensionStorage.value = this.extensionStorage;
    }), pd(this);
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
  registerPlugin(e, t) {
    super.registerPlugin(e, t), this.reactiveState.value = this.view.state;
  }
  /**
   * Unregister a ProseMirror plugin.
   */
  unregisterPlugin(e) {
    super.unregisterPlugin(e), this.reactiveState.value = this.view.state;
  }
}
const c0 = gr({
  name: "EditorContent",
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  setup(n) {
    const e = Gi(), t = ud();
    return dd(() => {
      const r = n.editor;
      r && r.options.element && e.value && fd(() => {
        if (!e.value || !r.options.element.firstChild)
          return;
        const i = ee(e.value);
        e.value.append(...r.options.element.childNodes), r.contentComponent = t.ctx._, t && (r.appContext = {
          ...t.appContext,
          // Vue internally uses prototype chain to forward/shadow injects across the entire component chain
          // so don't use object spread operator or 'Object.assign' and just set `provides` as is on editor's appContext
          // @ts-expect-error forward instance's 'provides' into appContext
          provides: t.provides
        }), r.setOptions({
          element: i
        }), r.createNodeViews();
      });
    }), Yi(() => {
      const r = n.editor;
      if (!r || (r.isDestroyed || r.view.setProps({
        nodeViews: {}
      }), r.contentComponent = null, r.appContext = null, !r.options.element.firstChild))
        return;
      const i = document.createElement("div");
      i.append(...r.options.element.childNodes), r.setOptions({
        element: i
      });
    }), { rootEl: e };
  },
  render() {
    return yr("div", {
      ref: (n) => {
        this.rootEl = n;
      }
    });
  }
});
gr({
  name: "FloatingMenu",
  props: {
    pluginKey: {
      // TODO: TypeScript breaks :(
      // type: [String, Object as PropType<Exclude<FloatingMenuPluginProps['pluginKey'], string>>],
      type: null,
      default: "floatingMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(n, { slots: e }) {
    const t = Gi(null);
    return To(() => {
      const { pluginKey: r, editor: i, tippyOptions: s, shouldShow: o } = n;
      i.registerPlugin(Uu({
        pluginKey: r,
        editor: i,
        element: t.value,
        tippyOptions: s,
        shouldShow: o
      }));
    }), Yi(() => {
      const { pluginKey: r, editor: i } = n;
      i.unregisterPlugin(r);
    }), () => {
      var r;
      return yr("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
gr({
  name: "NodeViewContent",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  render() {
    return yr(this.as, {
      style: {
        whiteSpace: "pre-wrap"
      },
      "data-node-view-content": ""
    });
  }
});
gr({
  name: "NodeViewWrapper",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  inject: ["onDragStart", "decorationClasses"],
  render() {
    var n, e;
    return yr(this.as, {
      // @ts-ignore
      class: this.decorationClasses,
      style: {
        whiteSpace: "normal"
      },
      "data-node-view-wrapper": "",
      // @ts-ignore (https://github.com/vuejs/vue-next/issues/3031)
      onDragstart: this.onDragStart
    }, (e = (n = this.$slots).default) === null || e === void 0 ? void 0 : e.call(n));
  }
});
const u0 = (n = {}) => {
  const e = hd();
  return To(() => {
    e.value = new a0(n);
  }), Yi(() => {
    var t;
    (t = e.value) === null || t === void 0 || t.destroy();
  }), e;
}, d0 = ye.create({
  name: "doc",
  topNode: !0,
  content: "block+"
}), f0 = ye.create({
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
    return [
      { tag: "p" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["p", G(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands: n }) => n.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), h0 = ye.create({
  name: "text",
  group: "inline"
});
var vi = 200, re = function() {
};
re.prototype.append = function(e) {
  return e.length ? (e = re.from(e), !this.length && e || e.length < vi && this.leafAppend(e) || this.length < vi && e.leafPrepend(this) || this.appendInner(e)) : this;
};
re.prototype.prepend = function(e) {
  return e.length ? re.from(e).append(this) : this;
};
re.prototype.appendInner = function(e) {
  return new p0(this, e);
};
re.prototype.slice = function(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? re.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
};
re.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
re.prototype.forEach = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length), t <= r ? this.forEachInner(e, t, r, 0) : this.forEachInvertedInner(e, t, r, 0);
};
re.prototype.map = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length);
  var i = [];
  return this.forEach(function(s, o) {
    return i.push(e(s, o));
  }, t, r), i;
};
re.from = function(e) {
  return e instanceof re ? e : e && e.length ? new qu(e) : re.empty;
};
var qu = /* @__PURE__ */ function(n) {
  function e(r) {
    n.call(this), this.values = r;
  }
  n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e;
  var t = { length: { configurable: !0 }, depth: { configurable: !0 } };
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
    if (this.length + i.length <= vi)
      return new e(this.values.concat(i.flatten()));
  }, e.prototype.leafPrepend = function(i) {
    if (this.length + i.length <= vi)
      return new e(i.flatten().concat(this.values));
  }, t.length.get = function() {
    return this.values.length;
  }, t.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, t), e;
}(re);
re.empty = new qu([]);
var p0 = /* @__PURE__ */ function(n) {
  function e(t, r) {
    n.call(this), this.left = t, this.right = r, this.length = t.length + r.length, this.depth = Math.max(t.depth, r.depth) + 1;
  }
  return n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
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
}(re);
const m0 = 500;
class Ve {
  constructor(e, t) {
    this.items = e, this.eventCount = t;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, t) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let i, s;
    t && (i = this.remapping(r, this.items.length), s = i.maps.length);
    let o = e.tr, l, a, c = [], u = [];
    return this.items.forEach((d, f) => {
      if (!d.step) {
        i || (i = this.remapping(r, f + 1), s = i.maps.length), s--, u.push(d);
        return;
      }
      if (i) {
        u.push(new _e(d.map));
        let h = d.step.map(i.slice(s)), p;
        h && o.maybeStep(h).doc && (p = o.mapping.maps[o.mapping.maps.length - 1], c.push(new _e(p, void 0, void 0, c.length + u.length))), s--, p && i.appendMap(p, s);
      } else
        o.maybeStep(d.step);
      if (d.selection)
        return l = i ? d.selection.map(i.slice(s)) : d.selection, a = new Ve(this.items.slice(0, r).append(u.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: a, transform: o, selection: l };
  }
  // Create a new branch with the given transform added.
  addTransform(e, t, r, i) {
    let s = [], o = this.eventCount, l = this.items, a = !i && l.length ? l.get(l.length - 1) : null;
    for (let u = 0; u < e.steps.length; u++) {
      let d = e.steps[u].invert(e.docs[u]), f = new _e(e.mapping.maps[u], d, t), h;
      (h = a && a.merge(f)) && (f = h, u ? s.pop() : l = l.slice(0, l.length - 1)), s.push(f), t && (o++, t = void 0), i || (a = f);
    }
    let c = o - r.depth;
    return c > y0 && (l = g0(l, c), o -= c), new Ve(l.append(s), o);
  }
  remapping(e, t) {
    let r = new Sn();
    return this.items.forEach((i, s) => {
      let o = i.mirrorOffset != null && s - i.mirrorOffset >= e ? r.maps.length - i.mirrorOffset : void 0;
      r.appendMap(i.map, o);
    }, e, t), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new Ve(this.items.append(e.map((t) => new _e(t))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, t) {
    if (!this.eventCount)
      return this;
    let r = [], i = Math.max(0, this.items.length - t), s = e.mapping, o = e.steps.length, l = this.eventCount;
    this.items.forEach((f) => {
      f.selection && l--;
    }, i);
    let a = t;
    this.items.forEach((f) => {
      let h = s.getMirror(--a);
      if (h == null)
        return;
      o = Math.min(o, h);
      let p = s.maps[h];
      if (f.step) {
        let m = e.steps[h].invert(e.docs[h]), y = f.selection && f.selection.map(s.slice(a + 1, h));
        y && l++, r.push(new _e(p, m, y));
      } else
        r.push(new _e(p));
    }, i);
    let c = [];
    for (let f = t; f < o; f++)
      c.push(new _e(s.maps[f]));
    let u = this.items.slice(0, i).append(c).append(r), d = new Ve(u, l);
    return d.emptyItemCount() > m0 && (d = d.compress(this.items.length - r.length)), d;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((t) => {
      t.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let t = this.remapping(0, e), r = t.maps.length, i = [], s = 0;
    return this.items.forEach((o, l) => {
      if (l >= e)
        i.push(o), o.selection && s++;
      else if (o.step) {
        let a = o.step.map(t.slice(r)), c = a && a.getMap();
        if (r--, c && t.appendMap(c, r), a) {
          let u = o.selection && o.selection.map(t.slice(r));
          u && s++;
          let d = new _e(c.invert(), a, u), f, h = i.length - 1;
          (f = i.length && i[h].merge(d)) ? i[h] = f : i.push(d);
        }
      } else o.map && r--;
    }, this.items.length, 0), new Ve(re.from(i.reverse()), s);
  }
}
Ve.empty = new Ve(re.empty, 0);
function g0(n, e) {
  let t;
  return n.forEach((r, i) => {
    if (r.selection && e-- == 0)
      return t = i, !1;
  }), n.slice(t);
}
class _e {
  constructor(e, t, r, i) {
    this.map = e, this.step = t, this.selection = r, this.mirrorOffset = i;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t)
        return new _e(t.getMap().invert(), t, this.selection);
    }
  }
}
class kt {
  constructor(e, t, r, i, s) {
    this.done = e, this.undone = t, this.prevRanges = r, this.prevTime = i, this.prevComposition = s;
  }
}
const y0 = 20;
function b0(n, e, t, r) {
  let i = t.getMeta(Zt), s;
  if (i)
    return i.historyState;
  t.getMeta(x0) && (n = new kt(n.done, n.undone, null, 0, -1));
  let o = t.getMeta("appendedTransaction");
  if (t.steps.length == 0)
    return n;
  if (o && o.getMeta(Zt))
    return o.getMeta(Zt).redo ? new kt(n.done.addTransform(t, void 0, r, ei(e)), n.undone, Da(t.mapping.maps), n.prevTime, n.prevComposition) : new kt(n.done, n.undone.addTransform(t, void 0, r, ei(e)), null, n.prevTime, n.prevComposition);
  if (t.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
    let l = t.getMeta("composition"), a = n.prevTime == 0 || !o && n.prevComposition != l && (n.prevTime < (t.time || 0) - r.newGroupDelay || !v0(t, n.prevRanges)), c = o ? $s(n.prevRanges, t.mapping) : Da(t.mapping.maps);
    return new kt(n.done.addTransform(t, a ? e.selection.getBookmark() : void 0, r, ei(e)), Ve.empty, c, t.time, l ?? n.prevComposition);
  } else return (s = t.getMeta("rebased")) ? new kt(n.done.rebased(t, s), n.undone.rebased(t, s), $s(n.prevRanges, t.mapping), n.prevTime, n.prevComposition) : new kt(n.done.addMaps(t.mapping.maps), n.undone.addMaps(t.mapping.maps), $s(n.prevRanges, t.mapping), n.prevTime, n.prevComposition);
}
function v0(n, e) {
  if (!e)
    return !1;
  if (!n.docChanged)
    return !0;
  let t = !1;
  return n.mapping.maps[0].forEach((r, i) => {
    for (let s = 0; s < e.length; s += 2)
      r <= e[s + 1] && i >= e[s] && (t = !0);
  }), t;
}
function Da(n) {
  let e = [];
  for (let t = n.length - 1; t >= 0 && e.length == 0; t--)
    n[t].forEach((r, i, s, o) => e.push(s, o));
  return e;
}
function $s(n, e) {
  if (!n)
    return null;
  let t = [];
  for (let r = 0; r < n.length; r += 2) {
    let i = e.map(n[r], 1), s = e.map(n[r + 1], -1);
    i <= s && t.push(i, s);
  }
  return t;
}
function k0(n, e, t) {
  let r = ei(e), i = Zt.get(e).spec.config, s = (t ? n.undone : n.done).popEvent(e, r);
  if (!s)
    return null;
  let o = s.selection.resolve(s.transform.doc), l = (t ? n.done : n.undone).addTransform(s.transform, e.selection.getBookmark(), i, r), a = new kt(t ? l : s.remaining, t ? s.remaining : l, null, 0, -1);
  return s.transform.setSelection(o).setMeta(Zt, { redo: t, historyState: a });
}
let Vs = !1, Ia = null;
function ei(n) {
  let e = n.plugins;
  if (Ia != e) {
    Vs = !1, Ia = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        Vs = !0;
        break;
      }
  }
  return Vs;
}
const Zt = new He("history"), x0 = new He("closeHistory");
function S0(n = {}) {
  return n = {
    depth: n.depth || 100,
    newGroupDelay: n.newGroupDelay || 500
  }, new be({
    key: Zt,
    state: {
      init() {
        return new kt(Ve.empty, Ve.empty, null, 0, -1);
      },
      apply(e, t, r) {
        return b0(t, r, e, n);
      }
    },
    config: n,
    props: {
      handleDOMEvents: {
        beforeinput(e, t) {
          let r = t.inputType, i = r == "historyUndo" ? _u : r == "historyRedo" ? Gu : null;
          return i ? (t.preventDefault(), i(e.state, e.dispatch)) : !1;
        }
      }
    }
  });
}
function Ju(n, e) {
  return (t, r) => {
    let i = Zt.getState(t);
    if (!i || (n ? i.undone : i.done).eventCount == 0)
      return !1;
    if (r) {
      let s = k0(i, t, n);
      s && r(e ? s.scrollIntoView() : s);
    }
    return !0;
  };
}
const _u = Ju(!1, !0), Gu = Ju(!0, !0), w0 = ge.create({
  name: "history",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: n, dispatch: e }) => _u(n, e),
      redo: () => ({ state: n, dispatch: e }) => Gu(n, e)
    };
  },
  addProseMirrorPlugins() {
    return [
      S0(this.options)
    ];
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
}), T0 = ye.create({
  name: "hardBreak",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  parseHTML() {
    return [
      { tag: "br" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["br", G(this.options.HTMLAttributes, n)];
  },
  renderText() {
    return `
`;
  },
  addCommands() {
    return {
      setHardBreak: () => ({ commands: n, chain: e, state: t, editor: r }) => n.first([
        () => n.exitCode(),
        () => n.command(() => {
          const { selection: i, storedMarks: s } = t;
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
});
class _ extends P {
  /**
  Create a gap cursor.
  */
  constructor(e) {
    super(e, e);
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    return _.valid(r) ? new _(r) : P.near(r);
  }
  content() {
    return C.empty;
  }
  eq(e) {
    return e instanceof _ && e.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new _(e.resolve(t.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new Xo(this.anchor);
  }
  /**
  @internal
  */
  static valid(e) {
    let t = e.parent;
    if (t.isTextblock || !C0(e) || !M0(e))
      return !1;
    let r = t.type.spec.allowGapCursor;
    if (r != null)
      return r;
    let i = t.contentMatchAt(e.index()).defaultType;
    return i && i.isTextblock;
  }
  /**
  @internal
  */
  static findGapCursorFrom(e, t, r = !1) {
    e: for (; ; ) {
      if (!r && _.valid(e))
        return e;
      let i = e.pos, s = null;
      for (let o = e.depth; ; o--) {
        let l = e.node(o);
        if (t > 0 ? e.indexAfter(o) < l.childCount : e.index(o) > 0) {
          s = l.child(t > 0 ? e.indexAfter(o) : e.index(o) - 1);
          break;
        } else if (o == 0)
          return null;
        i += t;
        let a = e.doc.resolve(i);
        if (_.valid(a))
          return a;
      }
      for (; ; ) {
        let o = t > 0 ? s.firstChild : s.lastChild;
        if (!o) {
          if (s.isAtom && !s.isText && !N.isSelectable(s)) {
            e = e.doc.resolve(i + s.nodeSize * t), r = !1;
            continue e;
          }
          break;
        }
        s = o, i += t;
        let l = e.doc.resolve(i);
        if (_.valid(l))
          return l;
      }
      return null;
    }
  }
}
_.prototype.visible = !1;
_.findFrom = _.findGapCursorFrom;
P.jsonID("gapcursor", _);
class Xo {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new Xo(e.map(this.pos));
  }
  resolve(e) {
    let t = e.resolve(this.pos);
    return _.valid(t) ? new _(t) : P.near(t);
  }
}
function C0(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.index(e), r = n.node(e);
    if (t == 0) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(t - 1); ; i = i.lastChild) {
      if (i.childCount == 0 && !i.inlineContent || i.isAtom || i.type.spec.isolating)
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function M0(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.indexAfter(e), r = n.node(e);
    if (t == r.childCount) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(t); ; i = i.firstChild) {
      if (i.childCount == 0 && !i.inlineContent || i.isAtom || i.type.spec.isolating)
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function O0() {
  return new be({
    props: {
      decorations: D0,
      createSelectionBetween(n, e, t) {
        return e.pos == t.pos && _.valid(t) ? new _(t) : null;
      },
      handleClick: A0,
      handleKeyDown: E0,
      handleDOMEvents: { beforeinput: N0 }
    }
  });
}
const E0 = au({
  ArrowLeft: Kr("horiz", -1),
  ArrowRight: Kr("horiz", 1),
  ArrowUp: Kr("vert", -1),
  ArrowDown: Kr("vert", 1)
});
function Kr(n, e) {
  const t = n == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(r, i, s) {
    let o = r.selection, l = e > 0 ? o.$to : o.$from, a = o.empty;
    if (o instanceof R) {
      if (!s.endOfTextblock(t) || l.depth == 0)
        return !1;
      a = !1, l = r.doc.resolve(e > 0 ? l.after() : l.before());
    }
    let c = _.findGapCursorFrom(l, e, a);
    return c ? (i && i(r.tr.setSelection(new _(c))), !0) : !1;
  };
}
function A0(n, e, t) {
  if (!n || !n.editable)
    return !1;
  let r = n.state.doc.resolve(e);
  if (!_.valid(r))
    return !1;
  let i = n.posAtCoords({ left: t.clientX, top: t.clientY });
  return i && i.inside > -1 && N.isSelectable(n.state.doc.nodeAt(i.inside)) ? !1 : (n.dispatch(n.state.tr.setSelection(new _(r))), !0);
}
function N0(n, e) {
  if (e.inputType != "insertCompositionText" || !(n.state.selection instanceof _))
    return !1;
  let { $from: t } = n.state.selection, r = t.parent.contentMatchAt(t.index()).findWrapping(n.state.schema.nodes.text);
  if (!r)
    return !1;
  let i = x.empty;
  for (let o = r.length - 1; o >= 0; o--)
    i = x.from(r[o].createAndFill(null, i));
  let s = n.state.tr.replace(t.pos, t.pos, new C(i, 0, 0));
  return s.setSelection(R.near(s.doc.resolve(t.pos + 1))), n.dispatch(s), !1;
}
function D0(n) {
  if (!(n.selection instanceof _))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", Z.create(n.doc, [Ie.widget(n.selection.head, e, { key: "gapcursor" })]);
}
const I0 = ge.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [
      O0()
    ];
  },
  extendNodeSchema(n) {
    var e;
    const t = {
      name: n.name,
      options: n.options,
      storage: n.storage
    };
    return {
      allowGapCursor: (e = H(O(n, "allowGapCursor", t))) !== null && e !== void 0 ? e : null
    };
  }
}), R0 = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, L0 = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, P0 = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, B0 = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, H0 = Te.create({
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
        getAttrs: (n) => n.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight",
        getAttrs: (n) => /^(bold(er)?|[5-9]\d{2,})$/.test(n) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["strong", G(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setBold: () => ({ commands: n }) => n.setMark(this.name),
      toggleBold: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetBold: () => ({ commands: n }) => n.unsetMark(this.name)
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
      ur({
        find: R0,
        type: this.type
      }),
      ur({
        find: P0,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Nn({
        find: L0,
        type: this.type
      }),
      Nn({
        find: B0,
        type: this.type
      })
    ];
  }
}), z0 = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, F0 = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, $0 = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, V0 = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, j0 = Te.create({
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
        getAttrs: (n) => n.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["em", G(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: n }) => n.setMark(this.name),
      toggleItalic: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetItalic: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      ur({
        find: z0,
        type: this.type
      }),
      ur({
        find: $0,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Nn({
        find: F0,
        type: this.type
      }),
      Nn({
        find: V0,
        type: this.type
      })
    ];
  }
}), W0 = Te.create({
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
        getAttrs: (n) => n.includes("underline") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["u", G(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setUnderline: () => ({ commands: n }) => n.setMark(this.name),
      toggleUnderline: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetUnderline: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-u": () => this.editor.commands.toggleUnderline(),
      "Mod-U": () => this.editor.commands.toggleUnderline()
    };
  }
}), K0 = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, U0 = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, q0 = Te.create({
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
        getAttrs: (n) => n.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["s", G(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setStrike: () => ({ commands: n }) => n.setMark(this.name),
      toggleStrike: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetStrike: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-s": () => this.editor.commands.toggleStrike()
    };
  },
  addInputRules() {
    return [
      ur({
        find: K0,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Nn({
        find: U0,
        type: this.type
      })
    ];
  }
}), Ur = ye.create({
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
  renderHTML({ HTMLAttributes: n }) {
    return ["li", G(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), J0 = ye.create({
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
  renderHTML({ HTMLAttributes: n }) {
    return ["li", G(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), Ra = Te.create({
  name: "textStyle",
  priority: 101,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => n.hasAttribute("style") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", G(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: n, commands: e }) => {
        const t = ds(n, this.type);
        return Object.entries(t).some(([, i]) => !!i) ? !0 : e.unsetMark(this.name);
      }
    };
  }
}), La = /^\s*([-+*])\s$/, _0 = ye.create({
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
    return [
      { tag: "ul" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["ul", G(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(J0.name, this.editor.getAttributes(Ra.name)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let n = dr({
      find: La,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = dr({
      find: La,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(Ra.name),
      editor: this.editor
    })), [
      n
    ];
  }
}), G0 = ye.create({
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
  renderHTML({ HTMLAttributes: n }) {
    return ["li", G(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), Pa = Te.create({
  name: "textStyle",
  priority: 101,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => n.hasAttribute("style") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", G(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: n, commands: e }) => {
        const t = ds(n, this.type);
        return Object.entries(t).some(([, i]) => !!i) ? !0 : e.unsetMark(this.name);
      }
    };
  }
}), Ba = /^(\d+)\.\s$/, Y0 = ye.create({
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
        parseHTML: (n) => n.hasAttribute("start") ? parseInt(n.getAttribute("start") || "", 10) : 1
      },
      type: {
        default: void 0,
        parseHTML: (n) => n.getAttribute("type")
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
  renderHTML({ HTMLAttributes: n }) {
    const { start: e, ...t } = n;
    return e === 1 ? ["ol", G(this.options.HTMLAttributes, t), 0] : ["ol", G(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(G0.name, this.editor.getAttributes(Pa.name)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let n = dr({
      find: Ba,
      type: this.type,
      getAttributes: (e) => ({ start: +e[1] }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1]
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = dr({
      find: Ba,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (e) => ({ start: +e[1], ...this.editor.getAttributes(Pa.name) }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1],
      editor: this.editor
    })), [
      n
    ];
  }
}), ms = (n, e) => {
  const { $from: t } = e.selection, r = Q(n, e.schema);
  let i = null, s = t.depth, o = t.pos, l = null;
  for (; s > 0 && l === null; )
    i = t.node(s), i.type === r ? l = s : (s -= 1, o -= 1);
  return l === null ? null : { $pos: e.doc.resolve(o), depth: l };
}, Yu = (n, e) => {
  const t = ms(n, e);
  if (!t)
    return !1;
  const [, r] = Ym(e, n, t.$pos.pos + 4);
  return r;
}, X0 = (n, e, t) => {
  const { $anchor: r } = n.selection, i = Math.max(0, r.pos - 2), s = n.doc.resolve(i).node();
  return !(!s || !t.includes(s.type.name));
}, Q0 = (n, e) => {
  var t;
  const { $anchor: r } = e.selection, i = e.doc.resolve(r.pos - 2);
  return !(i.index() === 0 || ((t = i.nodeBefore) === null || t === void 0 ? void 0 : t.type.name) !== n);
}, Z0 = (n, e, t) => {
  if (!t)
    return !1;
  const r = Q(n, e.schema);
  let i = !1;
  return t.descendants((s) => {
    s.type === r && (i = !0);
  }), i;
}, Ha = (n, e, t) => {
  if (n.commands.undoInputRule())
    return !0;
  if (!It(n.state, e) && X0(n.state, e, t)) {
    const { $anchor: l } = n.state.selection, a = n.state.doc.resolve(l.before() - 1), c = [];
    a.node().descendants((f, h) => {
      f.type.name === e && c.push({ node: f, pos: h });
    });
    const u = c.at(-1);
    if (!u)
      return !1;
    const d = n.state.doc.resolve(a.start() + u.pos + 1);
    return n.chain().cut({ from: l.start() - 1, to: l.end() + 1 }, d.end()).joinForward().run();
  }
  if (!It(n.state, e) || !Zm(n.state))
    return !1;
  const r = ms(e, n.state);
  if (!r)
    return !1;
  const s = n.state.doc.resolve(r.$pos.pos - 2).node(r.depth), o = Z0(e, n.state, s);
  return Q0(e, n.state) && !o ? n.commands.joinItemBackward() : n.chain().liftListItem(e).run();
}, eb = (n, e) => {
  const t = Yu(n, e), r = ms(n, e);
  return !r || !t ? !1 : t > r.depth;
}, tb = (n, e) => {
  const t = Yu(n, e), r = ms(n, e);
  return !r || !t ? !1 : t < r.depth;
}, za = (n, e) => !It(n.state, e) || !Qm(n.state, e) ? !1 : eb(e, n.state) ? n.chain().focus(n.state.selection.from + 4).lift(e).joinBackward().run() : tb(e, n.state) ? n.chain().joinForward().joinBackward().run() : n.commands.joinItemForward(), Fa = ge.create({
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
      Delete: ({ editor: n }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: t }) => {
          n.state.schema.nodes[t] !== void 0 && za(n, t) && (e = !0);
        }), e;
      },
      "Mod-Delete": ({ editor: n }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: t }) => {
          n.state.schema.nodes[t] !== void 0 && za(n, t) && (e = !0);
        }), e;
      },
      Backspace: ({ editor: n }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: t, wrapperNames: r }) => {
          n.state.schema.nodes[t] !== void 0 && Ha(n, t, r) && (e = !0);
        }), e;
      },
      "Mod-Backspace": ({ editor: n }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: t, wrapperNames: r }) => {
          n.state.schema.nodes[t] !== void 0 && Ha(n, t, r) && (e = !0);
        }), e;
      }
    };
  }
}), pn = ye.create({
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
    return this.options.levels.map((n) => ({
      tag: `h${n}`,
      attrs: { level: n }
    }));
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [`h${this.options.levels.includes(n.attrs.level) ? n.attrs.level : this.options.levels[0]}`, G(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.setNode(this.name, n) : !1,
      toggleHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.toggleNode(this.name, "paragraph", n) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce((n, e) => ({
      ...n,
      [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({ level: e })
    }), {});
  },
  addInputRules() {
    return this.options.levels.map((n) => Ag({
      find: new RegExp(`^(#{1,${n}})\\s$`),
      type: this.type,
      getAttributes: {
        level: n
      }
    }));
  }
}), nb = /^\s*>\s$/, rb = ye.create({
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
    return [
      { tag: "blockquote" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["blockquote", G(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands: n }) => n.wrapIn(this.name),
      toggleBlockquote: () => ({ commands: n }) => n.toggleWrap(this.name),
      unsetBlockquote: () => ({ commands: n }) => n.lift(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      dr({
        find: nb,
        type: this.type
      })
    ];
  }
}), ib = ye.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["hr", G(this.options.HTMLAttributes, n)];
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain: n, state: e }) => {
        const { selection: t } = e, { $from: r, $to: i } = t, s = n();
        return r.parentOffset === 0 ? s.insertContentAt({
          from: Math.max(r.pos - 1, 0),
          to: i.pos
        }, {
          type: this.name
        }) : Tu(t) ? s.insertContentAt(i.pos, {
          type: this.name
        }) : s.insertContent({ type: this.name }), s.command(({ tr: o, dispatch: l }) => {
          var a;
          if (l) {
            const { $to: c } = o.selection, u = c.end();
            if (c.nodeAfter)
              c.nodeAfter.isTextblock ? o.setSelection(R.create(o.doc, c.pos + 1)) : c.nodeAfter.isBlock ? o.setSelection(N.create(o.doc, c.pos)) : o.setSelection(R.create(o.doc, c.pos));
            else {
              const d = (a = c.parent.type.contentMatch.defaultType) === null || a === void 0 ? void 0 : a.create();
              d && (o.insert(u, d), o.setSelection(R.create(o.doc, u + 1)));
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
      Eg({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
}), sb = ge.create({
  name: "textAlign",
  addOptions() {
    return {
      types: [],
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: "left"
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: (n) => {
              const e = n.style.textAlign || this.options.defaultAlignment;
              return this.options.alignments.includes(e) ? e : this.options.defaultAlignment;
            },
            renderHTML: (n) => n.textAlign === this.options.defaultAlignment ? {} : { style: `text-align: ${n.textAlign}` }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setTextAlign: (n) => ({ commands: e }) => this.options.alignments.includes(n) ? this.options.types.map((t) => e.updateAttributes(t, { textAlign: n })).every((t) => t) : !1,
      unsetTextAlign: () => ({ commands: n }) => this.options.types.map((e) => n.resetAttributes(e, "textAlign")).every((e) => e)
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
}), ob = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4vianca6w0s2x0a2z0ure5ba0by2idu3namex3narepublic11d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0cast4mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dabur3d1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0ardian6cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster6d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2tura4vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9dnavy5lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0a1b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp2w2ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4finity6ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", lb = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", Pn = (n, e) => {
  for (const t in e)
    n[t] = e[t];
  return n;
}, yo = "numeric", bo = "ascii", vo = "alpha", ti = "asciinumeric", qr = "alphanumeric", ko = "domain", Xu = "emoji", ab = "scheme", cb = "slashscheme", $a = "whitespace";
function ub(n, e) {
  return n in e || (e[n] = []), e[n];
}
function qt(n, e, t) {
  e[yo] && (e[ti] = !0, e[qr] = !0), e[bo] && (e[ti] = !0, e[vo] = !0), e[ti] && (e[qr] = !0), e[vo] && (e[qr] = !0), e[qr] && (e[ko] = !0), e[Xu] && (e[ko] = !0);
  for (const r in e) {
    const i = ub(r, t);
    i.indexOf(n) < 0 && i.push(n);
  }
}
function db(n, e) {
  const t = {};
  for (const r in e)
    e[r].indexOf(n) >= 0 && (t[r] = !0);
  return t;
}
function ve(n) {
  n === void 0 && (n = null), this.j = {}, this.jr = [], this.jd = null, this.t = n;
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
  go(n) {
    const e = this, t = e.j[n];
    if (t)
      return t;
    for (let r = 0; r < e.jr.length; r++) {
      const i = e.jr[r][0], s = e.jr[r][1];
      if (s && i.test(n))
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
  has(n, e) {
    return e === void 0 && (e = !1), e ? n in this.j : !!this.go(n);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(n, e, t, r) {
    for (let i = 0; i < n.length; i++)
      this.tt(n[i], e, t, r);
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
  tr(n, e, t, r) {
    r = r || ve.groups;
    let i;
    return e && e.j ? i = e : (i = new ve(e), t && r && qt(e, t, r)), this.jr.push([n, i]), i;
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
  ts(n, e, t, r) {
    let i = this;
    const s = n.length;
    if (!s)
      return i;
    for (let o = 0; o < s - 1; o++)
      i = i.tt(n[o]);
    return i.tt(n[s - 1], e, t, r);
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
  tt(n, e, t, r) {
    r = r || ve.groups;
    const i = this;
    if (e && e.j)
      return i.j[n] = e, e;
    const s = e;
    let o, l = i.go(n);
    if (l ? (o = new ve(), Pn(o.j, l.j), o.jr.push.apply(o.jr, l.jr), o.jd = l.jd, o.t = l.t) : o = new ve(), s) {
      if (r)
        if (o.t && typeof o.t == "string") {
          const a = Pn(db(o.t, r), t);
          qt(s, a, r);
        } else t && qt(s, t, r);
      o.t = s;
    }
    return i.j[n] = o, o;
  }
};
const L = (n, e, t, r, i) => n.ta(e, t, r, i), Ee = (n, e, t, r, i) => n.tr(e, t, r, i), Va = (n, e, t, r, i) => n.ts(e, t, r, i), T = (n, e, t, r, i) => n.tt(e, t, r, i), ct = "WORD", xo = "UWORD", pr = "LOCALHOST", So = "TLD", wo = "UTLD", ni = "SCHEME", vn = "SLASH_SCHEME", Qo = "NUM", Qu = "WS", Zo = "NL", tr = "OPENBRACE", nr = "CLOSEBRACE", ki = "OPENBRACKET", xi = "CLOSEBRACKET", Si = "OPENPAREN", wi = "CLOSEPAREN", Ti = "OPENANGLEBRACKET", Ci = "CLOSEANGLEBRACKET", Mi = "FULLWIDTHLEFTPAREN", Oi = "FULLWIDTHRIGHTPAREN", Ei = "LEFTCORNERBRACKET", Ai = "RIGHTCORNERBRACKET", Ni = "LEFTWHITECORNERBRACKET", Di = "RIGHTWHITECORNERBRACKET", Ii = "FULLWIDTHLESSTHAN", Ri = "FULLWIDTHGREATERTHAN", Li = "AMPERSAND", Pi = "APOSTROPHE", Bi = "ASTERISK", xt = "AT", Hi = "BACKSLASH", zi = "BACKTICK", Fi = "CARET", wt = "COLON", el = "COMMA", $i = "DOLLAR", Ge = "DOT", Vi = "EQUALS", tl = "EXCLAMATION", Ye = "HYPHEN", ji = "PERCENT", Wi = "PIPE", Ki = "PLUS", Ui = "POUND", qi = "QUERY", nl = "QUOTE", rl = "SEMI", Xe = "SLASH", rr = "TILDE", Ji = "UNDERSCORE", Zu = "EMOJI", _i = "SYM";
var ed = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD: ct,
  UWORD: xo,
  LOCALHOST: pr,
  TLD: So,
  UTLD: wo,
  SCHEME: ni,
  SLASH_SCHEME: vn,
  NUM: Qo,
  WS: Qu,
  NL: Zo,
  OPENBRACE: tr,
  CLOSEBRACE: nr,
  OPENBRACKET: ki,
  CLOSEBRACKET: xi,
  OPENPAREN: Si,
  CLOSEPAREN: wi,
  OPENANGLEBRACKET: Ti,
  CLOSEANGLEBRACKET: Ci,
  FULLWIDTHLEFTPAREN: Mi,
  FULLWIDTHRIGHTPAREN: Oi,
  LEFTCORNERBRACKET: Ei,
  RIGHTCORNERBRACKET: Ai,
  LEFTWHITECORNERBRACKET: Ni,
  RIGHTWHITECORNERBRACKET: Di,
  FULLWIDTHLESSTHAN: Ii,
  FULLWIDTHGREATERTHAN: Ri,
  AMPERSAND: Li,
  APOSTROPHE: Pi,
  ASTERISK: Bi,
  AT: xt,
  BACKSLASH: Hi,
  BACKTICK: zi,
  CARET: Fi,
  COLON: wt,
  COMMA: el,
  DOLLAR: $i,
  DOT: Ge,
  EQUALS: Vi,
  EXCLAMATION: tl,
  HYPHEN: Ye,
  PERCENT: ji,
  PIPE: Wi,
  PLUS: Ki,
  POUND: Ui,
  QUERY: qi,
  QUOTE: nl,
  SEMI: rl,
  SLASH: Xe,
  TILDE: rr,
  UNDERSCORE: Ji,
  EMOJI: Zu,
  SYM: _i
});
const mn = /[a-z]/, js = new RegExp("\\p{L}", "u"), Ws = new RegExp("\\p{Emoji}", "u"), Ks = /\d/, ja = /\s/, Wa = `
`, fb = "️", hb = "‍";
let Jr = null, _r = null;
function pb(n) {
  n === void 0 && (n = []);
  const e = {};
  ve.groups = e;
  const t = new ve();
  Jr == null && (Jr = Ka(ob)), _r == null && (_r = Ka(lb)), T(t, "'", Pi), T(t, "{", tr), T(t, "}", nr), T(t, "[", ki), T(t, "]", xi), T(t, "(", Si), T(t, ")", wi), T(t, "<", Ti), T(t, ">", Ci), T(t, "（", Mi), T(t, "）", Oi), T(t, "「", Ei), T(t, "」", Ai), T(t, "『", Ni), T(t, "』", Di), T(t, "＜", Ii), T(t, "＞", Ri), T(t, "&", Li), T(t, "*", Bi), T(t, "@", xt), T(t, "`", zi), T(t, "^", Fi), T(t, ":", wt), T(t, ",", el), T(t, "$", $i), T(t, ".", Ge), T(t, "=", Vi), T(t, "!", tl), T(t, "-", Ye), T(t, "%", ji), T(t, "|", Wi), T(t, "+", Ki), T(t, "#", Ui), T(t, "?", qi), T(t, '"', nl), T(t, "/", Xe), T(t, ";", rl), T(t, "~", rr), T(t, "_", Ji), T(t, "\\", Hi);
  const r = Ee(t, Ks, Qo, {
    [yo]: !0
  });
  Ee(r, Ks, r);
  const i = Ee(t, mn, ct, {
    [bo]: !0
  });
  Ee(i, mn, i);
  const s = Ee(t, js, xo, {
    [vo]: !0
  });
  Ee(s, mn), Ee(s, js, s);
  const o = Ee(t, ja, Qu, {
    [$a]: !0
  });
  T(t, Wa, Zo, {
    [$a]: !0
  }), T(o, Wa), Ee(o, ja, o);
  const l = Ee(t, Ws, Zu, {
    [Xu]: !0
  });
  Ee(l, Ws, l), T(l, fb, l);
  const a = T(l, hb);
  Ee(a, Ws, l);
  const c = [[mn, i]], u = [[mn, null], [js, s]];
  for (let d = 0; d < Jr.length; d++)
    yt(t, Jr[d], So, ct, c);
  for (let d = 0; d < _r.length; d++)
    yt(t, _r[d], wo, xo, u);
  qt(So, {
    tld: !0,
    ascii: !0
  }, e), qt(wo, {
    utld: !0,
    alpha: !0
  }, e), yt(t, "file", ni, ct, c), yt(t, "mailto", ni, ct, c), yt(t, "http", vn, ct, c), yt(t, "https", vn, ct, c), yt(t, "ftp", vn, ct, c), yt(t, "ftps", vn, ct, c), qt(ni, {
    scheme: !0,
    ascii: !0
  }, e), qt(vn, {
    slashscheme: !0,
    ascii: !0
  }, e), n = n.sort((d, f) => d[0] > f[0] ? 1 : -1);
  for (let d = 0; d < n.length; d++) {
    const f = n[d][0], p = n[d][1] ? {
      [ab]: !0
    } : {
      [cb]: !0
    };
    f.indexOf("-") >= 0 ? p[ko] = !0 : mn.test(f) ? Ks.test(f) ? p[ti] = !0 : p[bo] = !0 : p[yo] = !0, Va(t, f, f, p);
  }
  return Va(t, "localhost", pr, {
    ascii: !0
  }), t.jd = new ve(_i), {
    start: t,
    tokens: Pn({
      groups: e
    }, ed)
  };
}
function mb(n, e) {
  const t = gb(e.replace(/[A-Z]/g, (l) => l.toLowerCase())), r = t.length, i = [];
  let s = 0, o = 0;
  for (; o < r; ) {
    let l = n, a = null, c = 0, u = null, d = -1, f = -1;
    for (; o < r && (a = l.go(t[o])); )
      l = a, l.accepts() ? (d = 0, f = 0, u = l) : d >= 0 && (d += t[o].length, f++), c += t[o].length, s += t[o].length, o++;
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
function gb(n) {
  const e = [], t = n.length;
  let r = 0;
  for (; r < t; ) {
    let i = n.charCodeAt(r), s, o = i < 55296 || i > 56319 || r + 1 === t || (s = n.charCodeAt(r + 1)) < 56320 || s > 57343 ? n[r] : n.slice(r, r + 2);
    e.push(o), r += o.length;
  }
  return e;
}
function yt(n, e, t, r, i) {
  let s;
  const o = e.length;
  for (let l = 0; l < o - 1; l++) {
    const a = e[l];
    n.j[a] ? s = n.j[a] : (s = new ve(r), s.jr = i.slice(), n.j[a] = s), n = s;
  }
  return s = new ve(t), s.jr = i.slice(), n.j[e[o - 1]] = s, s;
}
function Ka(n) {
  const e = [], t = [];
  let r = 0, i = "0123456789";
  for (; r < n.length; ) {
    let s = 0;
    for (; i.indexOf(n[r + s]) >= 0; )
      s++;
    if (s > 0) {
      e.push(t.join(""));
      for (let o = parseInt(n.substring(r, r + s), 10); o > 0; o--)
        t.pop();
      r += s;
    } else
      t.push(n[r]), r++;
  }
  return e;
}
const mr = {
  defaultProtocol: "http",
  events: null,
  format: Ua,
  formatHref: Ua,
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
function il(n, e) {
  e === void 0 && (e = null);
  let t = Pn({}, mr);
  n && (t = Pn(t, n instanceof il ? n.o : n));
  const r = t.ignoreTags, i = [];
  for (let s = 0; s < r.length; s++)
    i.push(r[s].toUpperCase());
  this.o = t, e && (this.defaultRender = e), this.ignoreTags = i;
}
il.prototype = {
  o: mr,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(n) {
    return n;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(n) {
    return this.get("validate", n.toString(), n);
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
  get(n, e, t) {
    const r = e != null;
    let i = this.o[n];
    return i && (typeof i == "object" ? (i = t.t in i ? i[t.t] : mr[n], typeof i == "function" && r && (i = i(e, t))) : typeof i == "function" && r && (i = i(e, t.t, t)), i);
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(n, e, t) {
    let r = this.o[n];
    return typeof r == "function" && e != null && (r = r(e, t.t, t)), r;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(n) {
    const e = n.render(this);
    return (this.get("render", null, n) || this.defaultRender)(e, n.t, n);
  }
};
function Ua(n) {
  return n;
}
function td(n, e) {
  this.t = "token", this.v = n, this.tk = e;
}
td.prototype = {
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
  toHref(n) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(n) {
    const e = this.toString(), t = n.get("truncate", e, this), r = n.get("format", e, this);
    return t && r.length > t ? r.substring(0, t) + "…" : r;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(n) {
    return n.get("formatHref", this.toHref(n.get("defaultProtocol")), this);
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
  toObject(n) {
    return n === void 0 && (n = mr.defaultProtocol), {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(n) {
    return {
      type: this.t,
      value: this.toFormattedString(n),
      isLink: this.isLink,
      href: this.toFormattedHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(n) {
    return n.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(n) {
    const e = this, t = this.toHref(n.get("defaultProtocol")), r = n.get("formatHref", t, this), i = n.get("tagName", t, e), s = this.toFormattedString(n), o = {}, l = n.get("className", t, e), a = n.get("target", t, e), c = n.get("rel", t, e), u = n.getObj("attributes", t, e), d = n.getObj("events", t, e);
    return o.href = r, l && (o.class = l), a && (o.target = a), c && (o.rel = c), u && Pn(o, u), {
      tagName: i,
      attributes: o,
      content: s,
      eventListeners: d
    };
  }
};
function gs(n, e) {
  class t extends td {
    constructor(i, s) {
      super(i, s), this.t = n;
    }
  }
  for (const r in e)
    t.prototype[r] = e[r];
  return t.t = n, t;
}
const qa = gs("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), Ja = gs("text"), yb = gs("nl"), Gr = gs("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(n) {
    return n === void 0 && (n = mr.defaultProtocol), this.hasProtocol() ? this.v : `${n}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const n = this.tk;
    return n.length >= 2 && n[0].t !== pr && n[1].t === wt;
  }
}), Ae = (n) => new ve(n);
function bb(n) {
  let {
    groups: e
  } = n;
  const t = e.domain.concat([Li, Bi, xt, Hi, zi, Fi, $i, Vi, Ye, Qo, ji, Wi, Ki, Ui, Xe, _i, rr, Ji]), r = [Pi, wt, el, Ge, tl, qi, nl, rl, Ti, Ci, tr, nr, xi, ki, Si, wi, Mi, Oi, Ei, Ai, Ni, Di, Ii, Ri], i = [Li, Pi, Bi, Hi, zi, Fi, $i, Vi, Ye, tr, nr, ji, Wi, Ki, Ui, qi, Xe, _i, rr, Ji], s = Ae(), o = T(s, rr);
  L(o, i, o), L(o, e.domain, o);
  const l = Ae(), a = Ae(), c = Ae();
  L(s, e.domain, l), L(s, e.scheme, a), L(s, e.slashscheme, c), L(l, i, o), L(l, e.domain, l);
  const u = T(l, xt);
  T(o, xt, u), T(a, xt, u), T(c, xt, u);
  const d = T(o, Ge);
  L(d, i, o), L(d, e.domain, o);
  const f = Ae();
  L(u, e.domain, f), L(f, e.domain, f);
  const h = T(f, Ge);
  L(h, e.domain, f);
  const p = Ae(qa);
  L(h, e.tld, p), L(h, e.utld, p), T(u, pr, p);
  const m = T(f, Ye);
  L(m, e.domain, f), L(p, e.domain, f), T(p, Ge, h), T(p, Ye, m);
  const y = T(p, wt);
  L(y, e.numeric, qa);
  const b = T(l, Ye), S = T(l, Ge);
  L(b, e.domain, l), L(S, i, o), L(S, e.domain, l);
  const w = Ae(Gr);
  L(S, e.tld, w), L(S, e.utld, w), L(w, e.domain, l), L(w, i, o), T(w, Ge, S), T(w, Ye, b), T(w, xt, u);
  const g = T(w, wt), M = Ae(Gr);
  L(g, e.numeric, M);
  const k = Ae(Gr), D = Ae();
  L(k, t, k), L(k, r, D), L(D, t, k), L(D, r, D), T(w, Xe, k), T(M, Xe, k);
  const B = T(a, wt), A = T(c, wt), z = T(A, Xe), V = T(z, Xe);
  L(a, e.domain, l), T(a, Ge, S), T(a, Ye, b), L(c, e.domain, l), T(c, Ge, S), T(c, Ye, b), L(B, e.domain, k), T(B, Xe, k), L(V, e.domain, k), L(V, t, k), T(V, Xe, k);
  const j = [
    [tr, nr],
    // {}
    [ki, xi],
    // []
    [Si, wi],
    // ()
    [Ti, Ci],
    // <>
    [Mi, Oi],
    // （）
    [Ei, Ai],
    // 「」
    [Ni, Di],
    // 『』
    [Ii, Ri]
    // ＜＞
  ];
  for (let W = 0; W < j.length; W++) {
    const [ae, ie] = j[W], Y = T(k, ae);
    T(D, ae, Y), T(Y, ie, k);
    const U = Ae(Gr);
    L(Y, t, U);
    const q = Ae();
    L(Y, r), L(U, t, U), L(U, r, q), L(q, t, U), L(q, r, q), T(U, ie, k), T(q, ie, k);
  }
  return T(s, pr, w), T(s, Zo, yb), {
    start: s,
    tokens: ed
  };
}
function vb(n, e, t) {
  let r = t.length, i = 0, s = [], o = [];
  for (; i < r; ) {
    let l = n, a = null, c = null, u = 0, d = null, f = -1;
    for (; i < r && !(a = l.go(t[i].t)); )
      o.push(t[i++]);
    for (; i < r && (c = a || l.go(t[i].t)); )
      a = null, l = c, l.accepts() ? (f = 0, d = l) : f >= 0 && f++, i++, u++;
    if (f < 0)
      i -= u, i < r && (o.push(t[i]), i++);
    else {
      o.length > 0 && (s.push(Us(Ja, e, o)), o = []), i -= f, u -= f;
      const h = d.t, p = t.slice(i - u, i);
      s.push(Us(h, e, p));
    }
  }
  return o.length > 0 && s.push(Us(Ja, e, o)), s;
}
function Us(n, e, t) {
  const r = t[0].s, i = t[t.length - 1].e, s = e.slice(r, i);
  return new n(s, t);
}
const kb = typeof console < "u" && console && console.warn || (() => {
}), xb = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", J = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function Sb() {
  ve.groups = {}, J.scanner = null, J.parser = null, J.tokenQueue = [], J.pluginQueue = [], J.customSchemes = [], J.initialized = !1;
}
function _a(n, e) {
  if (e === void 0 && (e = !1), J.initialized && kb(`linkifyjs: already initialized - will not register custom scheme "${n}" ${xb}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(n))
    throw new Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);
  J.customSchemes.push([n, e]);
}
function wb() {
  J.scanner = pb(J.customSchemes);
  for (let n = 0; n < J.tokenQueue.length; n++)
    J.tokenQueue[n][1]({
      scanner: J.scanner
    });
  J.parser = bb(J.scanner.tokens);
  for (let n = 0; n < J.pluginQueue.length; n++)
    J.pluginQueue[n][1]({
      scanner: J.scanner,
      parser: J.parser
    });
  J.initialized = !0;
}
function nd(n) {
  return J.initialized || wb(), vb(J.parser.start, n, mb(J.scanner.start, n));
}
function rd(n, e, t) {
  if (e === void 0 && (e = null), t === void 0 && (t = null), e && typeof e == "object") {
    if (t)
      throw Error(`linkifyjs: Invalid link type ${e}; must be a string`);
    t = e, e = null;
  }
  const r = new il(t), i = nd(n), s = [];
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    l.isLink && (!e || l.t === e) && r.check(l) && s.push(l.toFormattedObject(r));
  }
  return s;
}
function Tb(n) {
  return n.length === 1 ? n[0].isLink : n.length === 3 && n[1].isLink ? ["()", "[]"].includes(n[0].value + n[2].value) : !1;
}
function Cb(n) {
  return new be({
    key: new He("autolink"),
    appendTransaction: (e, t, r) => {
      const i = e.some((c) => c.docChanged) && !t.doc.eq(r.doc), s = e.some((c) => c.getMeta("preventAutolink"));
      if (!i || s)
        return;
      const { tr: o } = r, l = $m(t.doc, [...e]);
      if (Gm(l).forEach(({ newRange: c }) => {
        const u = jm(r.doc, c, (h) => h.isTextblock);
        let d, f;
        if (u.length > 1 ? (d = u[0], f = r.doc.textBetween(d.pos, d.pos + d.node.nodeSize, void 0, " ")) : u.length && r.doc.textBetween(c.from, c.to, " ", " ").endsWith(" ") && (d = u[0], f = r.doc.textBetween(d.pos, c.to, void 0, " ")), d && f) {
          const h = f.split(" ").filter((b) => b !== "");
          if (h.length <= 0)
            return !1;
          const p = h[h.length - 1], m = d.pos + f.lastIndexOf(p);
          if (!p)
            return !1;
          const y = nd(p).map((b) => b.toObject(n.defaultProtocol));
          if (!Tb(y))
            return !1;
          y.filter((b) => b.isLink).map((b) => ({
            ...b,
            from: m + b.start + 1,
            to: m + b.end + 1
          })).filter((b) => r.schema.marks.code ? !r.doc.rangeHasMark(b.from, b.to, r.schema.marks.code) : !0).filter((b) => n.validate(b.value)).forEach((b) => {
            jo(b.from, b.to, r.doc).some((S) => S.mark.type === n.type) || o.addMark(b.from, b.to, n.type.create({
              href: b.href
            }));
          });
        }
      }), !!o.steps.length)
        return o;
    }
  });
}
function Mb(n) {
  return new be({
    key: new He("handleClickLink"),
    props: {
      handleClick: (e, t, r) => {
        var i, s;
        if (r.button !== 0 || !e.editable)
          return !1;
        let o = r.target;
        const l = [];
        for (; o.nodeName !== "DIV"; )
          l.push(o), o = o.parentNode;
        if (!l.find((f) => f.nodeName === "A"))
          return !1;
        const a = Su(e.state, n.type.name), c = r.target, u = (i = c == null ? void 0 : c.href) !== null && i !== void 0 ? i : a.href, d = (s = c == null ? void 0 : c.target) !== null && s !== void 0 ? s : a.target;
        return c && u ? (window.open(u, d), !0) : !1;
      }
    }
  });
}
function Ob(n) {
  return new be({
    key: new He("handlePasteLink"),
    props: {
      handlePaste: (e, t, r) => {
        const { state: i } = e, { selection: s } = i, { empty: o } = s;
        if (o)
          return !1;
        let l = "";
        r.content.forEach((c) => {
          l += c.textContent;
        });
        const a = rd(l, { defaultProtocol: n.defaultProtocol }).find((c) => c.isLink && c.value === l);
        return !l || !a ? !1 : (n.editor.commands.setMark(n.type, {
          href: a.href
        }), !0);
      }
    }
  });
}
const Eb = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;
function Ga(n, e) {
  const t = ["http", "https", "ftp", "ftps", "mailto", "tel", "callto", "sms", "cid", "xmpp"];
  return e && e.forEach((r) => {
    const i = typeof r == "string" ? r : r.scheme;
    i && t.push(i);
  }), !n || n.replace(Eb, "").match(new RegExp(`^(?:(?:${t.join("|")}):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))`, "i"));
}
const Ab = Te.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: !1,
  exitable: !0,
  onCreate() {
    this.options.protocols.forEach((n) => {
      if (typeof n == "string") {
        _a(n);
        return;
      }
      _a(n.scheme, n.optionalSlashes);
    });
  },
  onDestroy() {
    Sb();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: !0,
      linkOnPaste: !0,
      autolink: !0,
      protocols: [],
      defaultProtocol: "http",
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      validate: (n) => !!n
    };
  },
  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML(n) {
          return n.getAttribute("href");
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
    return [{
      tag: "a[href]",
      getAttrs: (n) => {
        const e = n.getAttribute("href");
        return !e || !Ga(e, this.options.protocols) ? !1 : null;
      }
    }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return Ga(n.href, this.options.protocols) ? ["a", G(this.options.HTMLAttributes, n), 0] : ["a", G(this.options.HTMLAttributes, { ...n, href: "" }), 0];
  },
  addCommands() {
    return {
      setLink: (n) => ({ chain: e }) => e().setMark(this.name, n).setMeta("preventAutolink", !0).run(),
      toggleLink: (n) => ({ chain: e }) => e().toggleMark(this.name, n, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run(),
      unsetLink: () => ({ chain: n }) => n().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
    };
  },
  addPasteRules() {
    return [
      Nn({
        find: (n) => {
          const e = [];
          if (n) {
            const { validate: t } = this.options, r = rd(n).filter((i) => i.isLink && t(i.value));
            r.length && r.forEach((i) => e.push({
              text: i.value,
              data: {
                href: i.href
              },
              index: i.start
            }));
          }
          return e;
        },
        type: this.type,
        getAttributes: (n) => {
          var e;
          return {
            href: (e = n.data) === null || e === void 0 ? void 0 : e.href
          };
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const n = [];
    return this.options.autolink && n.push(Cb({
      type: this.type,
      defaultProtocol: this.options.defaultProtocol,
      validate: this.options.validate
    })), this.options.openOnClick === !0 && n.push(Mb({
      type: this.type
    })), this.options.linkOnPaste && n.push(Ob({
      editor: this.editor,
      defaultProtocol: this.options.defaultProtocol,
      type: this.type
    })), n;
  }
}), Nb = Te.create({
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
        getAttrs(n) {
          return n !== "sub" ? !1 : null;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["sub", G(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setSubscript: () => ({ commands: n }) => n.setMark(this.name),
      toggleSubscript: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetSubscript: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-,": () => this.editor.commands.toggleSubscript()
    };
  }
}), Db = Te.create({
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
        getAttrs(n) {
          return n !== "super" ? !1 : null;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["sup", G(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setSuperscript: () => ({ commands: n }) => n.setMark(this.name),
      toggleSuperscript: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetSuperscript: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-.": () => this.editor.commands.toggleSuperscript()
    };
  }
}), Ib = {
  key: 0,
  class: "v-wysiwyg"
}, Rb = { class: "toolbar" }, Lb = { class: "button-group" }, Pb = ["title", "aria-label"], Bb = ["data-replicated-value"], Hb = { class: "toolbar" }, zb = ["aria-pressed", "disabled", "aria-disabled", "title", "aria-label", "onClick"], Fb = { class: "toolbar bubble" }, $b = ["aria-pressed", "disabled", "aria-disabled", "title", "aria-label", "onClick"], Vb = {
  __name: "Wysiwyg",
  props: /* @__PURE__ */ gd({
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
    }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    let e = Gi(!1);
    const t = yd(n, "modelValue"), r = n, i = sb.configure({
      types: ["heading", "paragraph"]
    }), s = Ab.configure({
      openOnClick: !1,
      ...r.linkConfiguration
    }), o = {
      bold: {
        class: "mdi mdi-format-bold",
        action: (u) => u.chain().focus().toggleBold().run(),
        active: (u) => u.isActive("bold"),
        extensions: [H0]
      },
      italic: {
        class: "mdi mdi-format-italic",
        action: (u) => u.chain().focus().toggleItalic().run(),
        active: (u) => u.isActive("italic"),
        extensions: [j0]
      },
      underline: {
        class: "mdi mdi-format-underline",
        action: (u) => u.chain().focus().toggleUnderline().run(),
        active: (u) => u.isActive("underline"),
        extensions: [W0]
      },
      strike: {
        class: "mdi mdi-format-strikethrough-variant",
        action: (u) => u.chain().focus().toggleStrike().run(),
        active: (u) => u.isActive("strike"),
        extensions: [q0]
      },
      unordered: {
        class: "mdi mdi-format-list-bulleted",
        action: (u) => u.chain().focus().toggleBulletList().run(),
        active: (u) => u.isActive("bulletList"),
        extensions: [_0, Ur, Fa]
      },
      ordered: {
        class: "mdi mdi-format-list-numbered",
        action: (u) => u.chain().focus().toggleOrderedList().run(),
        active: (u) => u.isActive("orderedList"),
        extensions: [Y0, Ur, Fa]
      },
      outdent: {
        class: "mdi mdi-format-indent-decrease",
        action: (u) => u.chain().focus().liftListItem("listItem").run(),
        disabled: (u) => !u.can().liftListItem("listItem"),
        extensions: [Ur]
      },
      indent: {
        class: "mdi mdi-format-indent-increase",
        action: (u) => u.chain().focus().sinkListItem("listItem").run(),
        disabled: (u) => !u.can().sinkListItem("listItem"),
        extensions: [Ur]
      },
      h1: {
        class: "mdi mdi-format-header-1",
        action: (u) => u.chain().focus().toggleHeading({ level: 1 }).run(),
        active: (u) => u.isActive("heading", { level: 1 }),
        extensions: [pn]
      },
      h2: {
        class: "mdi mdi-format-header-2",
        action: (u) => u.chain().focus().toggleHeading({ level: 2 }).run(),
        active: (u) => u.isActive("heading", { level: 2 }),
        extensions: [pn]
      },
      h3: {
        class: "mdi mdi-format-header-3",
        action: (u) => u.chain().focus().toggleHeading({ level: 3 }).run(),
        active: (u) => u.isActive("heading", { level: 3 }),
        extensions: [pn]
      },
      h4: {
        class: "mdi mdi-format-header-4",
        action: (u) => u.chain().focus().toggleHeading({ level: 4 }).run(),
        active: (u) => u.isActive("heading", { level: 4 }),
        extensions: [pn]
      },
      h5: {
        class: "mdi mdi-format-header-5",
        action: (u) => u.chain().focus().toggleHeading({ level: 5 }).run(),
        active: (u) => u.isActive("heading", { level: 5 }),
        extensions: [pn]
      },
      h6: {
        class: "mdi mdi-format-header-6",
        action: (u) => u.chain().focus().toggleHeading({ level: 6 }).run(),
        active: (u) => u.isActive("heading", { level: 6 }),
        extensions: [pn]
      },
      quote: {
        class: "mdi mdi-format-quote-open",
        action: (u) => u.chain().focus().toggleBlockquote().run(),
        active: (u) => u.isActive("blockquote"),
        disabled: (u) => !u.can().toggleBlockquote(),
        extensions: [rb]
      },
      hardBreak: {
        class: "mdi mdi-keyboard-return",
        action: (u) => u.chain().focus().setHardBreak().run()
      },
      hr: {
        class: "mdi mdi-minus",
        action: (u) => u.chain().focus().setHorizontalRule().run(),
        extensions: [ib]
      },
      left: {
        class: "mdi mdi-format-align-left",
        action: (u) => u.chain().focus().setTextAlign("left").run(),
        active: (u) => u.isActive("textAlign", { align: "left" }),
        extensions: [i]
      },
      center: {
        class: "mdi mdi-format-align-center",
        action: (u) => u.chain().focus().setTextAlign("center").run(),
        active: (u) => u.isActive("textAlign", { align: "center" }),
        extensions: [i]
      },
      right: {
        class: "mdi mdi-format-align-right",
        action: (u) => u.chain().focus().setTextAlign("right").run(),
        active: (u) => u.isActive("textAlign", { align: "right" }),
        extensions: [i]
      },
      justify: {
        class: "mdi mdi-format-align-justify",
        action: (u) => u.chain().focus().setTextAlign("justify").run(),
        active: (u) => u.isActive("textAlign", { align: "justify" }),
        extensions: [i]
      },
      link: {
        class: "mdi mdi-link",
        action: (u) => c(u),
        active: (u) => u.isActive("link"),
        extensions: [s]
      },
      unlink: {
        class: "mdi mdi-link-off",
        action: (u) => u.chain().focus().unsetLink().run(),
        disabled: (u) => !u.isActive("link"),
        extensions: [s]
      },
      superscript: {
        class: "mdi mdi-format-superscript",
        action: (u) => {
          var d, f;
          (f = (d = u.chain()).unsetSubscript) == null || f.call(d).run(), u.chain().focus().toggleSuperscript().run();
        },
        active: (u) => u.isActive("superscript"),
        extensions: [Db]
      },
      subscript: {
        class: "mdi mdi-format-subscript",
        action: (u) => {
          var d, f;
          (f = (d = u.chain()).unsetSuperscript) == null || f.call(d).run(), u.chain().focus().toggleSubscript().run();
        },
        active: (u) => u.isActive("subscript"),
        extensions: [Nb]
      },
      removeFormat: {
        class: "mdi mdi-format-clear",
        action: (u) => u.chain().focus().unsetAllMarks().run()
      },
      undo: {
        class: "mdi mdi-undo",
        action: (u) => u.chain().focus().undo().run(),
        disabled: (u) => !u.can().undo()
      },
      redo: {
        class: "mdi mdi-redo",
        action: (u) => u.chain().focus().redo().run(),
        disabled: (u) => !u.can().redo()
      },
      viewsource: {
        class: "mdi mdi-code-tags",
        action: () => e.value = !e.value
      }
    }, l = r.toolbar.flat().flatMap((u) => o[u].extensions).filter((u, d, f) => f.indexOf(u) === d), a = u0({
      content: t.value,
      extensions: [d0, f0, h0, w0, T0, I0, ...l],
      onUpdate: function({ editor: u }) {
        t.value = u.getHTML();
      }
    });
    bd(t, (u, d) => {
      var f, h;
      u !== ((f = a == null ? void 0 : a.value) == null ? void 0 : f.getHTML()) && ((h = a == null ? void 0 : a.value) == null || h.commands.setContent(t.value));
    });
    const c = function(u) {
      const d = u.getAttributes("link").href, f = window.prompt("URL", d);
      if (f !== null) {
        if (f === "") {
          u.chain().focus().extendMarkRange("link").unsetLink().run();
          return;
        }
        u.chain().focus().extendMarkRange("link").setLink({ href: f.startsWith("http://") ? f : `http://${f}` }).run();
      }
    };
    return (u, d) => ee(a) ? (Oe(), Fe("div", Ib, [
      ee(e) ? (Oe(), Fe(dn, { key: 0 }, [
        gt("div", Rb, [
          d[2] || (d[2] = gt("div", { class: "button-group gap" }, null, -1)),
          gt("div", Lb, [
            gt("button", {
              type: "button",
              class: "mdi mdi-code-tags is-active",
              "aria-pressed": "true",
              title: u.$vui.i18n().wysiwyg.viewsource,
              "aria-label": u.$vui.i18n().wysiwyg.viewsource,
              onClick: d[0] || (d[0] = (...f) => o.viewsource.action && o.viewsource.action(...f))
            }, null, 8, Pb)
          ])
        ]),
        gt("div", {
          class: "grow-wrap",
          "data-replicated-value": t.value
        }, [
          vd(gt("textarea", {
            "onUpdate:modelValue": d[1] || (d[1] = (f) => t.value = f),
            class: "editor"
          }, null, 512), [
            [kd, t.value]
          ])
        ], 8, Bb)
      ], 64)) : (Oe(), Fe(dn, { key: 1 }, [
        gt("div", Hb, [
          (Oe(!0), Fe(dn, null, Lr(n.toolbar, (f) => (Oe(), Fe("div", {
            class: Pr(["button-group", { gap: f.length === 0 }])
          }, [
            (Oe(!0), Fe(dn, null, Lr(f, (h) => {
              var p, m, y, b, S, w, g, M;
              return Oe(), Fe("button", {
                type: "button",
                key: h,
                class: Pr([o[h].class, { "is-active": (m = (p = o[h]).active) == null ? void 0 : m.call(p, ee(a)) }]),
                "aria-pressed": (b = (y = o[h]).active) == null ? void 0 : b.call(y, ee(a)),
                disabled: (w = (S = o[h]).disabled) == null ? void 0 : w.call(S, ee(a)),
                "aria-disabled": (M = (g = o[h]).disabled) == null ? void 0 : M.call(g, ee(a)),
                title: u.$vui.i18n().wysiwyg[h],
                "aria-label": u.$vui.i18n().wysiwyg[h],
                onClick: (k) => o[h].action(ee(a))
              }, null, 10, zb);
            }), 128))
          ], 2))), 256))
        ]),
        ee(a) && n.bubbleToolbar ? (Oe(), xd(ee(l0), {
          key: 0,
          editor: ee(a),
          "tippy-options": { duration: 100 }
        }, {
          default: Sd(() => [
            gt("div", Fb, [
              (Oe(!0), Fe(dn, null, Lr(n.bubbleToolbar, (f) => (Oe(), Fe("div", {
                class: Pr(["button-group", { gap: f.length === 0 }])
              }, [
                (Oe(!0), Fe(dn, null, Lr(f, (h) => {
                  var p, m, y, b, S, w, g, M;
                  return Oe(), Fe("button", {
                    type: "button",
                    key: h,
                    class: Pr([o[h].class, { "is-active": (m = (p = o[h]).active) == null ? void 0 : m.call(p, ee(a)) }]),
                    "aria-pressed": (b = (y = o[h]).active) == null ? void 0 : b.call(y, ee(a)),
                    disabled: (w = (S = o[h]).disabled) == null ? void 0 : w.call(S, ee(a)),
                    "aria-disabled": (M = (g = o[h]).disabled) == null ? void 0 : M.call(g, ee(a)),
                    title: u.$vui.i18n().wysiwyg[h],
                    "aria-label": u.$vui.i18n().wysiwyg[h],
                    onClick: (k) => o[h].action(ee(a))
                  }, null, 10, $b);
                }), 128))
              ], 2))), 256))
            ])
          ]),
          _: 1
        }, 8, ["editor"])) : ol("", !0),
        wd(ee(c0), {
          editor: ee(a),
          class: "editor"
        }, null, 8, ["editor"])
      ], 64))
    ])) : ol("", !0);
  }
}, jb = {
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
  viewsource: "View Source"
}, Wb = {
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
  viewsource: "Voir le source"
};
var Kb = {
  install: function(n, e) {
    n.component("v-wysiwyg", Vb), VertigoUi.lang.enUS.wysiwyg = jb, VertigoUi.lang.fr.wysiwyg = Wb;
  }
};
window && (window.WYSIWYG = Kb);
export {
  Kb as default
};
//# sourceMappingURL=vertigo-wysiwyg.es.js.map
