import { Fragment as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createElementVNode as i, createVNode as a, customRef as o, defineComponent as s, getCurrentInstance as c, h as l, markRaw as u, mergeModels as d, nextTick as f, normalizeClass as p, normalizeStyle as m, onBeforeUnmount as h, onMounted as g, openBlock as _, ref as v, renderList as y, shallowRef as b, unref as x, useModel as S, vModelText as C, watch as w, watchEffect as T, withCtx as E, withDirectives as D } from "vue";
//#region node_modules/orderedmap/dist/index.js
function O(e) {
	this.content = e;
}
O.prototype = {
	constructor: O,
	find: function(e) {
		for (var t = 0; t < this.content.length; t += 2) if (this.content[t] === e) return t;
		return -1;
	},
	get: function(e) {
		var t = this.find(e);
		return t == -1 ? void 0 : this.content[t + 1];
	},
	update: function(e, t, n) {
		var r = n && n != e ? this.remove(n) : this, i = r.find(e), a = r.content.slice();
		return i == -1 ? a.push(n || e, t) : (a[i + 1] = t, n && (a[i] = n)), new O(a);
	},
	remove: function(e) {
		var t = this.find(e);
		if (t == -1) return this;
		var n = this.content.slice();
		return n.splice(t, 2), new O(n);
	},
	addToStart: function(e, t) {
		return new O([e, t].concat(this.remove(e).content));
	},
	addToEnd: function(e, t) {
		var n = this.remove(e).content.slice();
		return n.push(e, t), new O(n);
	},
	addBefore: function(e, t, n) {
		var r = this.remove(t), i = r.content.slice(), a = r.find(e);
		return i.splice(a == -1 ? i.length : a, 0, t, n), new O(i);
	},
	forEach: function(e) {
		for (var t = 0; t < this.content.length; t += 2) e(this.content[t], this.content[t + 1]);
	},
	prepend: function(e) {
		return e = O.from(e), e.size ? new O(e.content.concat(this.subtract(e).content)) : this;
	},
	append: function(e) {
		return e = O.from(e), e.size ? new O(this.subtract(e).content.concat(e.content)) : this;
	},
	subtract: function(e) {
		var t = this;
		e = O.from(e);
		for (var n = 0; n < e.content.length; n += 2) t = t.remove(e.content[n]);
		return t;
	},
	toObject: function() {
		var e = {};
		return this.forEach(function(t, n) {
			e[t] = n;
		}), e;
	},
	get size() {
		return this.content.length >> 1;
	}
}, O.from = function(e) {
	if (e instanceof O) return e;
	var t = [];
	if (e) for (var n in e) t.push(n, e[n]);
	return new O(t);
};
//#endregion
//#region node_modules/prosemirror-model/dist/index.js
function k(e, t, n) {
	for (let r = 0;; r++) {
		if (r == e.childCount || r == t.childCount) return e.childCount == t.childCount ? null : n;
		let i = e.child(r), a = t.child(r);
		if (i == a) {
			n += i.nodeSize;
			continue;
		}
		if (!i.sameMarkup(a)) return n;
		if (i.isText && i.text != a.text) {
			let e = i.text, t = a.text, r = 0;
			for (; e[r] == t[r]; r++) n++;
			return r && r < e.length && r < t.length && j(e.charCodeAt(r - 1)) && A(e.charCodeAt(r)) && n--, n;
		}
		if (i.content.size || a.content.size) {
			let e = k(i.content, a.content, n + 1);
			if (e != null) return e;
		}
		n += i.nodeSize;
	}
}
function ee(e, t, n, r) {
	for (let i = e.childCount, a = t.childCount;;) {
		if (i == 0 || a == 0) return i == a ? null : {
			a: n,
			b: r
		};
		let o = e.child(--i), s = t.child(--a), c = o.nodeSize;
		if (o == s) {
			n -= c, r -= c;
			continue;
		}
		if (!o.sameMarkup(s)) return {
			a: n,
			b: r
		};
		if (o.isText && o.text != s.text) {
			let e = o.text, t = s.text, i = e.length, a = t.length;
			for (; i > 0 && a > 0 && e[i - 1] == t[a - 1];) i--, a--, n--, r--;
			return i && a && i < e.length && j(e.charCodeAt(i - 1)) && A(e.charCodeAt(i)) && (n++, r++), {
				a: n,
				b: r
			};
		}
		if (o.content.size || s.content.size) {
			let e = ee(o.content, s.content, n - 1, r - 1);
			if (e) return e;
		}
		n -= c, r -= c;
	}
}
function A(e) {
	return e >= 56320 && e < 57344;
}
function j(e) {
	return e >= 55296 && e < 56320;
}
var M = class e {
	constructor(e, t) {
		if (this.content = e, this.size = t || 0, t == null) for (let t = 0; t < e.length; t++) this.size += e[t].nodeSize;
	}
	nodesBetween(e, t, n, r = 0, i) {
		for (let a = 0, o = 0; o < t; a++) {
			let s = this.content[a], c = o + s.nodeSize;
			if (c > e && n(s, r + o, i || null, a) !== !1 && s.content.size) {
				let i = o + 1;
				s.nodesBetween(Math.max(0, e - i), Math.min(s.content.size, t - i), n, r + i);
			}
			o = c;
		}
	}
	descendants(e) {
		this.nodesBetween(0, this.size, e);
	}
	textBetween(e, t, n, r) {
		let i = "", a = !0;
		return this.nodesBetween(e, t, (o, s) => {
			let c = o.isText ? o.text.slice(Math.max(e, s) - s, t - s) : o.isLeaf ? r ? typeof r == "function" ? r(o) : r : o.type.spec.leafText ? o.type.spec.leafText(o) : "" : "";
			o.isBlock && (o.isLeaf && c || o.isTextblock) && n && (a ? a = !1 : i += n), i += c;
		}, 0), i;
	}
	append(t) {
		if (!t.size) return this;
		if (!this.size) return t;
		let n = this.lastChild, r = t.firstChild, i = this.content.slice(), a = 0;
		for (n.isText && n.sameMarkup(r) && (i[i.length - 1] = n.withText(n.text + r.text), a = 1); a < t.content.length; a++) i.push(t.content[a]);
		return new e(i, this.size + t.size);
	}
	cut(t, n = this.size) {
		if (t == 0 && n == this.size) return this;
		let r = [], i = 0;
		if (n > t) for (let e = 0, a = 0; a < n; e++) {
			let o = this.content[e], s = a + o.nodeSize;
			s > t && ((a < t || s > n) && (o = o.isText ? o.cut(Math.max(0, t - a), Math.min(o.text.length, n - a)) : o.cut(Math.max(0, t - a - 1), Math.min(o.content.size, n - a - 1))), r.push(o), i += o.nodeSize), a = s;
		}
		return new e(r, i);
	}
	cutByIndex(t, n) {
		return t == n ? e.empty : t == 0 && n == this.content.length ? this : new e(this.content.slice(t, n));
	}
	replaceChild(t, n) {
		let r = this.content[t];
		if (r == n) return this;
		let i = this.content.slice(), a = this.size + n.nodeSize - r.nodeSize;
		return i[t] = n, new e(i, a);
	}
	addToStart(t) {
		return new e([t].concat(this.content), this.size + t.nodeSize);
	}
	addToEnd(t) {
		return new e(this.content.concat(t), this.size + t.nodeSize);
	}
	eq(e) {
		if (this.content.length != e.content.length) return !1;
		for (let t = 0; t < this.content.length; t++) if (!this.content[t].eq(e.content[t])) return !1;
		return !0;
	}
	get firstChild() {
		return this.content.length ? this.content[0] : null;
	}
	get lastChild() {
		return this.content.length ? this.content[this.content.length - 1] : null;
	}
	get childCount() {
		return this.content.length;
	}
	child(e) {
		let t = this.content[e];
		if (!t) throw RangeError("Index " + e + " out of range for " + this);
		return t;
	}
	maybeChild(e) {
		return this.content[e] || null;
	}
	forEach(e) {
		for (let t = 0, n = 0; t < this.content.length; t++) {
			let r = this.content[t];
			e(r, n, t), n += r.nodeSize;
		}
	}
	findDiffStart(e, t = 0) {
		return k(this, e, t);
	}
	findDiffEnd(e, t = this.size, n = e.size) {
		return ee(this, e, t, n);
	}
	findIndex(e) {
		if (e == 0) return ne(0, e);
		if (e == this.size) return ne(this.content.length, e);
		if (e > this.size || e < 0) throw RangeError(`Position ${e} outside of fragment (${this})`);
		for (let t = 0, n = 0;; t++) {
			let r = this.child(t), i = n + r.nodeSize;
			if (i >= e) return i == e ? ne(t + 1, i) : ne(t, n);
			n = i;
		}
	}
	toString() {
		return "<" + this.toStringInner() + ">";
	}
	toStringInner() {
		return this.content.join(", ");
	}
	toJSON() {
		return this.content.length ? this.content.map((e) => e.toJSON()) : null;
	}
	static fromJSON(t, n) {
		if (!n) return e.empty;
		if (!Array.isArray(n)) throw RangeError("Invalid input for Fragment.fromJSON");
		return e.fromArray(n.map(t.nodeFromJSON));
	}
	static fromArray(t) {
		if (!t.length) return e.empty;
		let n, r = 0;
		for (let e = 0; e < t.length; e++) {
			let i = t[e];
			r += i.nodeSize, e && i.isText && t[e - 1].sameMarkup(i) ? (n ||= t.slice(0, e), n[n.length - 1] = i.withText(n[n.length - 1].text + i.text)) : n && n.push(i);
		}
		return new e(n || t, r);
	}
	static from(t) {
		if (!t) return e.empty;
		if (t instanceof e) return t;
		if (Array.isArray(t)) return this.fromArray(t);
		if (t.attrs) return new e([t], t.nodeSize);
		throw RangeError("Can not convert " + t + " to a Fragment" + (t.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
	}
};
M.empty = new M([], 0);
var te = {
	index: 0,
	offset: 0
};
function ne(e, t) {
	return te.index = e, te.offset = t, te;
}
function re(e, t) {
	if (e === t) return !0;
	if (!(e && typeof e == "object") || !(t && typeof t == "object")) return !1;
	let n = Array.isArray(e);
	if (Array.isArray(t) != n) return !1;
	if (n) {
		if (e.length != t.length) return !1;
		for (let n = 0; n < e.length; n++) if (!re(e[n], t[n])) return !1;
	} else {
		for (let n in e) if (!(n in t) || !re(e[n], t[n])) return !1;
		for (let n in t) if (!(n in e)) return !1;
	}
	return !0;
}
var N = class e {
	constructor(e, t) {
		this.type = e, this.attrs = t;
	}
	addToSet(e) {
		let t, n = !1;
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (this.eq(i)) return e;
			if (this.type.excludes(i.type)) t ||= e.slice(0, r);
			else if (i.type.excludes(this.type)) return e;
			else !n && i.type.rank > this.type.rank && (t ||= e.slice(0, r), t.push(this), n = !0), t && t.push(i);
		}
		return t ||= e.slice(), n || t.push(this), t;
	}
	removeFromSet(e) {
		for (let t = 0; t < e.length; t++) if (this.eq(e[t])) return e.slice(0, t).concat(e.slice(t + 1));
		return e;
	}
	isInSet(e) {
		for (let t = 0; t < e.length; t++) if (this.eq(e[t])) return !0;
		return !1;
	}
	eq(e) {
		return this == e || this.type == e.type && re(this.attrs, e.attrs);
	}
	toJSON() {
		let e = { type: this.type.name };
		for (let t in this.attrs) {
			e.attrs = this.attrs;
			break;
		}
		return e;
	}
	static fromJSON(e, t) {
		if (!t) throw RangeError("Invalid input for Mark.fromJSON");
		let n = e.marks[t.type];
		if (!n) throw RangeError(`There is no mark type ${t.type} in this schema`);
		let r = n.create(t.attrs);
		return n.checkAttrs(r.attrs), r;
	}
	static sameSet(e, t) {
		if (e == t) return !0;
		if (e.length != t.length) return !1;
		for (let n = 0; n < e.length; n++) if (!e[n].eq(t[n])) return !1;
		return !0;
	}
	static setFrom(t) {
		if (!t || Array.isArray(t) && t.length == 0) return e.none;
		if (t instanceof e) return [t];
		let n = t.slice();
		return n.sort((e, t) => e.type.rank - t.type.rank), n;
	}
};
N.none = [];
var ie = class extends Error {}, P = class e {
	constructor(e, t, n) {
		this.content = e, this.openStart = t, this.openEnd = n;
	}
	get size() {
		return this.content.size - this.openStart - this.openEnd;
	}
	insertAt(t, n) {
		let r = oe(this.content, t + this.openStart, n, this.openStart + 1, this.openEnd + 1);
		return r && new e(r, this.openStart, this.openEnd);
	}
	removeBetween(t, n) {
		return new e(ae(this.content, t + this.openStart, n + this.openStart), this.openStart, this.openEnd);
	}
	eq(e) {
		return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
	}
	toString() {
		return this.content + "(" + this.openStart + "," + this.openEnd + ")";
	}
	toJSON() {
		if (!this.content.size) return null;
		let e = { content: this.content.toJSON() };
		return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
	}
	static fromJSON(t, n) {
		if (!n) return e.empty;
		let r = n.openStart || 0, i = n.openEnd || 0;
		if (typeof r != "number" || typeof i != "number") throw RangeError("Invalid input for Slice.fromJSON");
		return new e(M.fromJSON(t, n.content), r, i);
	}
	static maxOpen(t, n = !0) {
		let r = 0, i = 0;
		for (let e = t.firstChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.firstChild) r++;
		for (let e = t.lastChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.lastChild) i++;
		return new e(t, r, i);
	}
};
P.empty = new P(M.empty, 0, 0);
function ae(e, t, n) {
	let { index: r, offset: i } = e.findIndex(t), a = e.maybeChild(r), { index: o, offset: s } = e.findIndex(n);
	if (i == t || a.isText) {
		if (s != n && !e.child(o).isText) throw RangeError("Removing non-flat range");
		return e.cut(0, t).append(e.cut(n));
	}
	if (r != o) throw RangeError("Removing non-flat range");
	return e.replaceChild(r, a.copy(ae(a.content, t - i - 1, n - i - 1)));
}
function oe(e, t, n, r, i, a) {
	let { index: o, offset: s } = e.findIndex(t), c = e.maybeChild(o);
	if (s == t || c.isText) return a && r <= 0 && i <= 0 && !a.canReplace(o, o, n) ? null : e.cut(0, t).append(n).append(e.cut(t));
	let l = oe(c.content, t - s - 1, n, o == 0 ? r - 1 : 0, o == e.childCount - 1 ? i - 1 : 0, c);
	return l && e.replaceChild(o, c.copy(l));
}
function se(e, t, n) {
	if (n.openStart > e.depth) throw new ie("Inserted content deeper than insertion position");
	if (e.depth - n.openStart != t.depth - n.openEnd) throw new ie("Inconsistent open depths");
	return ce(e, t, n, 0);
}
function ce(e, t, n, r) {
	let i = e.index(r), a = e.node(r);
	if (i == t.index(r) && r < e.depth - n.openStart) {
		let o = ce(e, t, n, r + 1);
		return a.copy(a.content.replaceChild(i, o));
	} else if (!n.content.size) return pe(a, he(e, t, r));
	else if (!n.openStart && !n.openEnd && e.depth == r && t.depth == r) {
		let r = e.parent, i = r.content;
		return pe(r, i.cut(0, e.parentOffset).append(n.content).append(i.cut(t.parentOffset)));
	} else {
		let { start: i, end: o } = ge(n, e);
		return pe(a, me(e, i, o, t, r));
	}
}
function le(e, t) {
	if (!t.type.compatibleContent(e.type)) throw new ie("Cannot join " + t.type.name + " onto " + e.type.name);
}
function ue(e, t, n) {
	let r = e.node(n);
	return le(r, t.node(n)), r;
}
function de(e, t) {
	let n = t.length - 1;
	n >= 0 && e.isText && e.sameMarkup(t[n]) ? t[n] = e.withText(t[n].text + e.text) : t.push(e);
}
function fe(e, t, n, r) {
	let i = (t || e).node(n), a = 0, o = t ? t.index(n) : i.childCount;
	e && (a = e.index(n), e.depth > n ? a++ : e.textOffset && (de(e.nodeAfter, r), a++));
	for (let e = a; e < o; e++) de(i.child(e), r);
	t && t.depth == n && t.textOffset && de(t.nodeBefore, r);
}
function pe(e, t) {
	return e.type.checkContent(t), e.copy(t);
}
function me(e, t, n, r, i) {
	let a = e.depth > i && ue(e, t, i + 1), o = r.depth > i && ue(n, r, i + 1), s = [];
	return fe(null, e, i, s), a && o && t.index(i) == n.index(i) ? (le(a, o), de(pe(a, me(e, t, n, r, i + 1)), s)) : (a && de(pe(a, he(e, t, i + 1)), s), fe(t, n, i, s), o && de(pe(o, he(n, r, i + 1)), s)), fe(r, null, i, s), new M(s);
}
function he(e, t, n) {
	let r = [];
	return fe(null, e, n, r), e.depth > n && de(pe(ue(e, t, n + 1), he(e, t, n + 1)), r), fe(t, null, n, r), new M(r);
}
function ge(e, t) {
	let n = t.depth - e.openStart, r = t.node(n).copy(e.content);
	for (let e = n - 1; e >= 0; e--) r = t.node(e).copy(M.from(r));
	return {
		start: r.resolveNoCache(e.openStart + n),
		end: r.resolveNoCache(r.content.size - e.openEnd - n)
	};
}
var _e = class e {
	constructor(e, t, n) {
		this.pos = e, this.path = t, this.parentOffset = n, this.depth = t.length / 3 - 1;
	}
	resolveDepth(e) {
		return e == null ? this.depth : e < 0 ? this.depth + e : e;
	}
	get parent() {
		return this.node(this.depth);
	}
	get doc() {
		return this.node(0);
	}
	node(e) {
		return this.path[this.resolveDepth(e) * 3];
	}
	index(e) {
		return this.path[this.resolveDepth(e) * 3 + 1];
	}
	indexAfter(e) {
		return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
	}
	start(e) {
		return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
	}
	end(e) {
		return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
	}
	before(e) {
		if (e = this.resolveDepth(e), !e) throw RangeError("There is no position before the top-level node");
		return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
	}
	after(e) {
		if (e = this.resolveDepth(e), !e) throw RangeError("There is no position after the top-level node");
		return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
	}
	get textOffset() {
		return this.pos - this.path[this.path.length - 1];
	}
	get nodeAfter() {
		let e = this.parent, t = this.index(this.depth);
		if (t == e.childCount) return null;
		let n = this.pos - this.path[this.path.length - 1], r = e.child(t);
		return n ? e.child(t).cut(n) : r;
	}
	get nodeBefore() {
		let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
		return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
	}
	posAtIndex(e, t) {
		t = this.resolveDepth(t);
		let n = this.path[t * 3], r = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
		for (let t = 0; t < e; t++) r += n.child(t).nodeSize;
		return r;
	}
	marks() {
		let e = this.parent, t = this.index();
		if (e.content.size == 0) return N.none;
		if (this.textOffset) return e.child(t).marks;
		let n = e.maybeChild(t - 1), r = e.maybeChild(t);
		if (!n) {
			let e = n;
			n = r, r = e;
		}
		let i = n.marks;
		for (var a = 0; a < i.length; a++) i[a].type.spec.inclusive === !1 && (!r || !i[a].isInSet(r.marks)) && (i = i[a--].removeFromSet(i));
		return i;
	}
	marksAcross(e) {
		let t = this.parent.maybeChild(this.index());
		if (!t || !t.isInline) return null;
		let n = t.marks, r = e.parent.maybeChild(e.index());
		for (var i = 0; i < n.length; i++) n[i].type.spec.inclusive === !1 && (!r || !n[i].isInSet(r.marks)) && (n = n[i--].removeFromSet(n));
		return n;
	}
	sharedDepth(e) {
		for (let t = this.depth; t > 0; t--) if (this.start(t) <= e && this.end(t) >= e) return t;
		return 0;
	}
	blockRange(e = this, t) {
		if (e.pos < this.pos) return e.blockRange(this);
		for (let n = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); n >= 0; n--) if (e.pos <= this.end(n) && (!t || t(this.node(n)))) return new xe(this, e, n);
		return null;
	}
	sameParent(e) {
		return this.pos - this.parentOffset == e.pos - e.parentOffset;
	}
	max(e) {
		return e.pos > this.pos ? e : this;
	}
	min(e) {
		return e.pos < this.pos ? e : this;
	}
	toString() {
		let e = "";
		for (let t = 1; t <= this.depth; t++) e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
		return e + ":" + this.parentOffset;
	}
	static resolve(t, n) {
		if (!(n >= 0 && n <= t.content.size)) throw RangeError("Position " + n + " out of range");
		let r = [], i = 0, a = n;
		for (let e = t;;) {
			let { index: t, offset: n } = e.content.findIndex(a), o = a - n;
			if (r.push(e, t, i + n), !o || (e = e.child(t), e.isText)) break;
			a = o - 1, i += n + 1;
		}
		return new e(n, r, a);
	}
	static resolveCached(t, n) {
		let r = be.get(t);
		if (r) for (let e = 0; e < r.elts.length; e++) {
			let t = r.elts[e];
			if (t.pos == n) return t;
		}
		else be.set(t, r = new ve());
		let i = r.elts[r.i] = e.resolve(t, n);
		return r.i = (r.i + 1) % ye, i;
	}
}, ve = class {
	constructor() {
		this.elts = [], this.i = 0;
	}
}, ye = 12, be = /* @__PURE__ */ new WeakMap(), xe = class {
	constructor(e, t, n) {
		this.$from = e, this.$to = t, this.depth = n;
	}
	get start() {
		return this.$from.before(this.depth + 1);
	}
	get end() {
		return this.$to.after(this.depth + 1);
	}
	get parent() {
		return this.$from.node(this.depth);
	}
	get startIndex() {
		return this.$from.index(this.depth);
	}
	get endIndex() {
		return this.$to.indexAfter(this.depth);
	}
}, Se = Object.create(null), Ce = class e {
	constructor(e, t, n, r = N.none) {
		this.type = e, this.attrs = t, this.marks = r, this.content = n || M.empty;
	}
	get children() {
		return this.content.content;
	}
	get nodeSize() {
		return this.isLeaf ? 1 : 2 + this.content.size;
	}
	get childCount() {
		return this.content.childCount;
	}
	child(e) {
		return this.content.child(e);
	}
	maybeChild(e) {
		return this.content.maybeChild(e);
	}
	forEach(e) {
		this.content.forEach(e);
	}
	nodesBetween(e, t, n, r = 0) {
		this.content.nodesBetween(e, t, n, r, this);
	}
	descendants(e) {
		this.nodesBetween(0, this.content.size, e);
	}
	get textContent() {
		return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
	}
	textBetween(e, t, n, r) {
		return this.content.textBetween(e, t, n, r);
	}
	get firstChild() {
		return this.content.firstChild;
	}
	get lastChild() {
		return this.content.lastChild;
	}
	eq(e) {
		return this == e || this.sameMarkup(e) && this.content.eq(e.content);
	}
	sameMarkup(e) {
		return this.hasMarkup(e.type, e.attrs, e.marks);
	}
	hasMarkup(e, t, n) {
		return this.type == e && re(this.attrs, t || e.defaultAttrs || Se) && N.sameSet(this.marks, n || N.none);
	}
	copy(t = null) {
		return t == this.content ? this : new e(this.type, this.attrs, t, this.marks);
	}
	mark(t) {
		return t == this.marks ? this : new e(this.type, this.attrs, this.content, t);
	}
	cut(e, t = this.content.size) {
		return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
	}
	slice(e, t = this.content.size, n = !1) {
		if (e == t) return P.empty;
		let r = this.resolve(e), i = this.resolve(t), a = n ? 0 : r.sharedDepth(t), o = r.start(a);
		return new P(r.node(a).content.cut(r.pos - o, i.pos - o), r.depth - a, i.depth - a);
	}
	replace(e, t, n) {
		return se(this.resolve(e), this.resolve(t), n);
	}
	nodeAt(e) {
		for (let t = this;;) {
			let { index: n, offset: r } = t.content.findIndex(e);
			if (t = t.maybeChild(n), !t) return null;
			if (r == e || t.isText) return t;
			e -= r + 1;
		}
	}
	childAfter(e) {
		let { index: t, offset: n } = this.content.findIndex(e);
		return {
			node: this.content.maybeChild(t),
			index: t,
			offset: n
		};
	}
	childBefore(e) {
		if (e == 0) return {
			node: null,
			index: 0,
			offset: 0
		};
		let { index: t, offset: n } = this.content.findIndex(e);
		if (n < e) return {
			node: this.content.child(t),
			index: t,
			offset: n
		};
		let r = this.content.child(t - 1);
		return {
			node: r,
			index: t - 1,
			offset: n - r.nodeSize
		};
	}
	resolve(e) {
		return _e.resolveCached(this, e);
	}
	resolveNoCache(e) {
		return _e.resolve(this, e);
	}
	rangeHasMark(e, t, n) {
		let r = !1;
		return t > e && this.nodesBetween(e, t, (e) => (n.isInSet(e.marks) && (r = !0), !r)), r;
	}
	get isBlock() {
		return this.type.isBlock;
	}
	get isTextblock() {
		return this.type.isTextblock;
	}
	get inlineContent() {
		return this.type.inlineContent;
	}
	get isInline() {
		return this.type.isInline;
	}
	get isText() {
		return this.type.isText;
	}
	get isLeaf() {
		return this.type.isLeaf;
	}
	get isAtom() {
		return this.type.isAtom;
	}
	toString() {
		if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
		let e = this.type.name;
		return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Te(this.marks, e);
	}
	contentMatchAt(e) {
		let t = this.type.contentMatch.matchFragment(this.content, 0, e);
		if (!t) throw Error("Called contentMatchAt on a node with invalid content");
		return t;
	}
	canReplace(e, t, n = M.empty, r = 0, i = n.childCount) {
		let a = this.contentMatchAt(e).matchFragment(n, r, i), o = a && a.matchFragment(this.content, t);
		if (!o || !o.validEnd) return !1;
		for (let e = r; e < i; e++) if (!this.type.allowsMarks(n.child(e).marks)) return !1;
		return !0;
	}
	canReplaceWith(e, t, n, r) {
		if (r && !this.type.allowsMarks(r)) return !1;
		let i = this.contentMatchAt(e).matchType(n), a = i && i.matchFragment(this.content, t);
		return a ? a.validEnd : !1;
	}
	canAppend(e) {
		return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
	}
	check() {
		this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
		let e = N.none;
		for (let t = 0; t < this.marks.length; t++) {
			let n = this.marks[t];
			n.type.checkAttrs(n.attrs), e = n.addToSet(e);
		}
		if (!N.sameSet(e, this.marks)) throw RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((e) => e.type.name)}`);
		this.content.forEach((e) => e.check());
	}
	toJSON() {
		let e = { type: this.type.name };
		for (let t in this.attrs) {
			e.attrs = this.attrs;
			break;
		}
		return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((e) => e.toJSON())), e;
	}
	static fromJSON(e, t) {
		if (!t) throw RangeError("Invalid input for Node.fromJSON");
		let n;
		if (t.marks) {
			if (!Array.isArray(t.marks)) throw RangeError("Invalid mark data for Node.fromJSON");
			n = t.marks.map(e.markFromJSON);
		}
		if (t.type == "text") {
			if (typeof t.text != "string") throw RangeError("Invalid text node in JSON");
			return e.text(t.text, n);
		}
		let r = M.fromJSON(e, t.content), i = e.nodeType(t.type).create(t.attrs, r, n);
		return i.type.checkAttrs(i.attrs), i;
	}
};
Ce.prototype.text = void 0;
var we = class e extends Ce {
	constructor(e, t, n, r) {
		if (super(e, t, null, r), !n) throw RangeError("Empty text nodes are not allowed");
		this.text = n;
	}
	toString() {
		return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Te(this.marks, JSON.stringify(this.text));
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
	mark(t) {
		return t == this.marks ? this : new e(this.type, this.attrs, this.text, t);
	}
	withText(t) {
		return t == this.text ? this : new e(this.type, this.attrs, t, this.marks);
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
};
function Te(e, t) {
	for (let n = e.length - 1; n >= 0; n--) t = e[n].type.name + "(" + t + ")";
	return t;
}
var Ee = class e {
	constructor(e) {
		this.validEnd = e, this.next = [], this.wrapCache = [];
	}
	static parse(t, n) {
		let r = new De(t, n);
		if (r.next == null) return e.empty;
		let i = Oe(r);
		r.next && r.err("Unexpected trailing text");
		let a = Re(Fe(i));
		return ze(a, r), a;
	}
	matchType(e) {
		for (let t = 0; t < this.next.length; t++) if (this.next[t].type == e) return this.next[t].next;
		return null;
	}
	matchFragment(e, t = 0, n = e.childCount) {
		let r = this;
		for (let i = t; r && i < n; i++) r = r.matchType(e.child(i).type);
		return r;
	}
	get inlineContent() {
		return this.next.length != 0 && this.next[0].type.isInline;
	}
	get defaultType() {
		for (let e = 0; e < this.next.length; e++) {
			let { type: t } = this.next[e];
			if (!(t.isText || t.hasRequiredAttrs())) return t;
		}
		return null;
	}
	compatible(e) {
		for (let t = 0; t < this.next.length; t++) for (let n = 0; n < e.next.length; n++) if (this.next[t].type == e.next[n].type) return !0;
		return !1;
	}
	fillBefore(e, t = !1, n = 0) {
		let r = [this];
		function i(a, o) {
			let s = a.matchFragment(e, n);
			if (s && (!t || s.validEnd)) return M.from(o.map((e) => e.createAndFill()));
			for (let e = 0; e < a.next.length; e++) {
				let { type: t, next: n } = a.next[e];
				if (!(t.isText || t.hasRequiredAttrs()) && r.indexOf(n) == -1) {
					r.push(n);
					let e = i(n, o.concat(t));
					if (e) return e;
				}
			}
			return null;
		}
		return i(this, []);
	}
	findWrapping(e) {
		for (let t = 0; t < this.wrapCache.length; t += 2) if (this.wrapCache[t] == e) return this.wrapCache[t + 1];
		let t = this.computeWrapping(e);
		return this.wrapCache.push(e, t), t;
	}
	computeWrapping(e) {
		let t = Object.create(null), n = [{
			match: this,
			type: null,
			via: null
		}];
		for (; n.length;) {
			let r = n.shift(), i = r.match;
			if (i.matchType(e)) {
				let e = [];
				for (let t = r; t.type; t = t.via) e.push(t.type);
				return e.reverse();
			}
			for (let e = 0; e < i.next.length; e++) {
				let { type: a, next: o } = i.next[e];
				!a.isLeaf && !a.hasRequiredAttrs() && !(a.name in t) && (!r.type || o.validEnd) && (n.push({
					match: a.contentMatch,
					type: a,
					via: r
				}), t[a.name] = !0);
			}
		}
		return null;
	}
	get edgeCount() {
		return this.next.length;
	}
	edge(e) {
		if (e >= this.next.length) throw RangeError(`There's no ${e}th edge in this content match`);
		return this.next[e];
	}
	toString() {
		let e = [];
		function t(n) {
			e.push(n);
			for (let r = 0; r < n.next.length; r++) e.indexOf(n.next[r].next) == -1 && t(n.next[r].next);
		}
		return t(this), e.map((t, n) => {
			let r = n + (t.validEnd ? "*" : " ") + " ";
			for (let n = 0; n < t.next.length; n++) r += (n ? ", " : "") + t.next[n].type.name + "->" + e.indexOf(t.next[n].next);
			return r;
		}).join("\n");
	}
};
Ee.empty = new Ee(!0);
var De = class {
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
		throw SyntaxError(e + " (in content expression '" + this.string + "')");
	}
};
function Oe(e) {
	let t = [];
	do
		t.push(ke(e));
	while (e.eat("|"));
	return t.length == 1 ? t[0] : {
		type: "choice",
		exprs: t
	};
}
function ke(e) {
	let t = [];
	do
		t.push(Ae(e));
	while (e.next && e.next != ")" && e.next != "|");
	return t.length == 1 ? t[0] : {
		type: "seq",
		exprs: t
	};
}
function Ae(e) {
	let t = Pe(e);
	for (;;) if (e.eat("+")) t = {
		type: "plus",
		expr: t
	};
	else if (e.eat("*")) t = {
		type: "star",
		expr: t
	};
	else if (e.eat("?")) t = {
		type: "opt",
		expr: t
	};
	else if (e.eat("{")) t = Me(e, t);
	else break;
	return t;
}
function je(e) {
	/\D/.test(e.next) && e.err("Expected number, got '" + e.next + "'");
	let t = Number(e.next);
	return e.pos++, t;
}
function Me(e, t) {
	let n = je(e), r = n;
	return e.eat(",") && (r = e.next == "}" ? -1 : je(e)), e.eat("}") || e.err("Unclosed braced range"), {
		type: "range",
		min: n,
		max: r,
		expr: t
	};
}
function Ne(e, t) {
	let n = e.nodeTypes, r = n[t];
	if (r) return [r];
	let i = [];
	for (let e in n) {
		let r = n[e];
		r.isInGroup(t) && i.push(r);
	}
	return i.length == 0 && e.err("No node type or group '" + t + "' found"), i;
}
function Pe(e) {
	if (e.eat("(")) {
		let t = Oe(e);
		return e.eat(")") || e.err("Missing closing paren"), t;
	} else if (/\W/.test(e.next)) e.err("Unexpected token '" + e.next + "'");
	else {
		let t = Ne(e, e.next).map((t) => (e.inline == null ? e.inline = t.isInline : e.inline != t.isInline && e.err("Mixing inline and block content"), {
			type: "name",
			value: t
		}));
		return e.pos++, t.length == 1 ? t[0] : {
			type: "choice",
			exprs: t
		};
	}
}
function Fe(e) {
	let t = [[]];
	return i(a(e, 0), n()), t;
	function n() {
		return t.push([]) - 1;
	}
	function r(e, n, r) {
		let i = {
			term: r,
			to: n
		};
		return t[e].push(i), i;
	}
	function i(e, t) {
		e.forEach((e) => e.to = t);
	}
	function a(e, t) {
		if (e.type == "choice") return e.exprs.reduce((e, n) => e.concat(a(n, t)), []);
		if (e.type == "seq") for (let r = 0;; r++) {
			let o = a(e.exprs[r], t);
			if (r == e.exprs.length - 1) return o;
			i(o, t = n());
		}
		else if (e.type == "star") {
			let o = n();
			return r(t, o), i(a(e.expr, o), o), [r(o)];
		} else if (e.type == "plus") {
			let o = n();
			return i(a(e.expr, t), o), i(a(e.expr, o), o), [r(o)];
		} else if (e.type == "opt") return [r(t)].concat(a(e.expr, t));
		else if (e.type == "range") {
			let o = t;
			for (let t = 0; t < e.min; t++) {
				let t = n();
				i(a(e.expr, o), t), o = t;
			}
			if (e.max == -1) i(a(e.expr, o), o);
			else for (let t = e.min; t < e.max; t++) {
				let t = n();
				r(o, t), i(a(e.expr, o), t), o = t;
			}
			return [r(o)];
		} else if (e.type == "name") return [r(t, void 0, e.value)];
		else throw Error("Unknown expr type");
	}
}
function Ie(e, t) {
	return t - e;
}
function Le(e, t) {
	let n = [];
	return r(t), n.sort(Ie);
	function r(t) {
		let i = e[t];
		if (i.length == 1 && !i[0].term) return r(i[0].to);
		n.push(t);
		for (let e = 0; e < i.length; e++) {
			let { term: t, to: a } = i[e];
			!t && n.indexOf(a) == -1 && r(a);
		}
	}
}
function Re(e) {
	let t = Object.create(null);
	return n(Le(e, 0));
	function n(r) {
		let i = [];
		r.forEach((t) => {
			e[t].forEach(({ term: t, to: n }) => {
				if (!t) return;
				let r;
				for (let e = 0; e < i.length; e++) i[e][0] == t && (r = i[e][1]);
				Le(e, n).forEach((e) => {
					r || i.push([t, r = []]), r.indexOf(e) == -1 && r.push(e);
				});
			});
		});
		let a = t[r.join(",")] = new Ee(r.indexOf(e.length - 1) > -1);
		for (let e = 0; e < i.length; e++) {
			let r = i[e][1].sort(Ie);
			a.next.push({
				type: i[e][0],
				next: t[r.join(",")] || n(r)
			});
		}
		return a;
	}
}
function ze(e, t) {
	for (let n = 0, r = [e]; n < r.length; n++) {
		let e = r[n], i = !e.validEnd, a = [];
		for (let t = 0; t < e.next.length; t++) {
			let { type: n, next: o } = e.next[t];
			a.push(n.name), i && !(n.isText || n.hasRequiredAttrs()) && (i = !1), r.indexOf(o) == -1 && r.push(o);
		}
		i && t.err("Only non-generatable nodes (" + a.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
	}
}
function Be(e) {
	let t = Object.create(null);
	for (let n in e) {
		let r = e[n];
		if (!r.hasDefault) return null;
		t[n] = r.default;
	}
	return t;
}
function Ve(e, t) {
	let n = Object.create(null);
	for (let r in e) {
		let i = t && t[r];
		if (i === void 0) {
			let t = e[r];
			if (t.hasDefault) i = t.default;
			else throw RangeError("No value supplied for attribute " + r);
		}
		n[r] = i;
	}
	return n;
}
function He(e, t, n, r) {
	for (let i in t) if (!(i in e)) throw RangeError(`Unsupported attribute ${i} for ${n} of type ${r}`);
	for (let n in e) e[n].validate && e[n].validate(t[n]);
}
function Ue(e, t) {
	let n = Object.create(null);
	if (t) for (let r in t) n[r] = new Ke(e, r, t[r]);
	return n;
}
var We = class e {
	constructor(e, t, n) {
		this.name = e, this.schema = t, this.spec = n, this.markSet = null, this.groups = n.group ? n.group.split(" ") : [], this.attrs = Ue(e, n.attrs), this.defaultAttrs = Be(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(n.inline || e == "text"), this.isText = e == "text";
	}
	get isInline() {
		return !this.isBlock;
	}
	get isTextblock() {
		return this.isBlock && this.inlineContent;
	}
	get isLeaf() {
		return this.contentMatch == Ee.empty;
	}
	get isAtom() {
		return this.isLeaf || !!this.spec.atom;
	}
	isInGroup(e) {
		return this.groups.indexOf(e) > -1;
	}
	get whitespace() {
		return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
	}
	hasRequiredAttrs() {
		for (let e in this.attrs) if (this.attrs[e].isRequired) return !0;
		return !1;
	}
	compatibleContent(e) {
		return this == e || this.contentMatch.compatible(e.contentMatch);
	}
	computeAttrs(e) {
		return !e && this.defaultAttrs ? this.defaultAttrs : Ve(this.attrs, e);
	}
	create(e = null, t, n) {
		if (this.isText) throw Error("NodeType.create can't construct text nodes");
		return new Ce(this, this.computeAttrs(e), M.from(t), N.setFrom(n));
	}
	createChecked(e = null, t, n) {
		return t = M.from(t), this.checkContent(t), new Ce(this, this.computeAttrs(e), t, N.setFrom(n));
	}
	createAndFill(e = null, t, n) {
		if (e = this.computeAttrs(e), t = M.from(t), t.size) {
			let e = this.contentMatch.fillBefore(t);
			if (!e) return null;
			t = e.append(t);
		}
		let r = this.contentMatch.matchFragment(t), i = r && r.fillBefore(M.empty, !0);
		return i ? new Ce(this, e, t.append(i), N.setFrom(n)) : null;
	}
	validContent(e) {
		let t = this.contentMatch.matchFragment(e);
		if (!t || !t.validEnd) return !1;
		for (let t = 0; t < e.childCount; t++) if (!this.allowsMarks(e.child(t).marks)) return !1;
		return !0;
	}
	checkContent(e) {
		if (!this.validContent(e)) throw RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
	}
	checkAttrs(e) {
		He(this.attrs, e, "node", this.name);
	}
	allowsMarkType(e) {
		return this.markSet == null || this.markSet.indexOf(e) > -1;
	}
	allowsMarks(e) {
		if (this.markSet == null) return !0;
		for (let t = 0; t < e.length; t++) if (!this.allowsMarkType(e[t].type)) return !1;
		return !0;
	}
	allowedMarks(e) {
		if (this.markSet == null) return e;
		let t;
		for (let n = 0; n < e.length; n++) this.allowsMarkType(e[n].type) ? t && t.push(e[n]) : t ||= e.slice(0, n);
		return t ? t.length ? t : N.none : e;
	}
	static compile(t, n) {
		let r = Object.create(null);
		t.forEach((t, i) => r[t] = new e(t, n, i));
		let i = n.spec.topNode || "doc";
		if (!r[i]) throw RangeError("Schema is missing its top node type ('" + i + "')");
		if (!r.text) throw RangeError("Every schema needs a 'text' type");
		for (let e in r.text.attrs) throw RangeError("The text node type should not have attributes");
		return r;
	}
};
function Ge(e, t, n) {
	let r = n.split("|");
	return (n) => {
		let i = n === null ? "null" : typeof n;
		if (r.indexOf(i) < 0) throw RangeError(`Expected value of type ${r} for attribute ${t} on type ${e}, got ${i}`);
	};
}
var Ke = class {
	constructor(e, t, n) {
		this.hasDefault = Object.prototype.hasOwnProperty.call(n, "default"), this.default = n.default, this.validate = typeof n.validate == "string" ? Ge(e, t, n.validate) : n.validate;
	}
	get isRequired() {
		return !this.hasDefault;
	}
}, qe = class e {
	constructor(e, t, n, r) {
		this.name = e, this.rank = t, this.schema = n, this.spec = r, this.attrs = Ue(e, r.attrs), this.excluded = null;
		let i = Be(this.attrs);
		this.instance = i ? new N(this, i) : null;
	}
	create(e = null) {
		return !e && this.instance ? this.instance : new N(this, Ve(this.attrs, e));
	}
	static compile(t, n) {
		let r = Object.create(null), i = 0;
		return t.forEach((t, a) => r[t] = new e(t, i++, n, a)), r;
	}
	removeFromSet(e) {
		for (var t = 0; t < e.length; t++) e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
		return e;
	}
	isInSet(e) {
		for (let t = 0; t < e.length; t++) if (e[t].type == this) return e[t];
	}
	checkAttrs(e) {
		He(this.attrs, e, "mark", this.name);
	}
	excludes(e) {
		return this.excluded.indexOf(e) > -1;
	}
}, Je = class {
	constructor(e) {
		this.linebreakReplacement = null, this.cached = Object.create(null);
		let t = this.spec = {};
		for (let n in e) t[n] = e[n];
		t.nodes = O.from(e.nodes), t.marks = O.from(e.marks || {}), this.nodes = We.compile(this.spec.nodes, this), this.marks = qe.compile(this.spec.marks, this);
		let n = Object.create(null);
		for (let e in this.nodes) {
			if (e in this.marks) throw RangeError(e + " can not be both a node and a mark");
			let t = this.nodes[e], r = t.spec.content || "", i = t.spec.marks;
			if (t.contentMatch = n[r] || (n[r] = Ee.parse(r, this.nodes)), t.inlineContent = t.contentMatch.inlineContent, t.spec.linebreakReplacement) {
				if (this.linebreakReplacement) throw RangeError("Multiple linebreak nodes defined");
				if (!t.isInline || !t.isLeaf) throw RangeError("Linebreak replacement nodes must be inline leaf nodes");
				this.linebreakReplacement = t;
			}
			t.markSet = i == "_" ? null : i ? Ye(this, i.split(" ")) : i == "" || !t.inlineContent ? [] : null;
		}
		for (let e in this.marks) {
			let t = this.marks[e], n = t.spec.excludes;
			t.excluded = n == null ? [t] : n == "" ? [] : Ye(this, n.split(" "));
		}
		this.nodeFromJSON = (e) => Ce.fromJSON(this, e), this.markFromJSON = (e) => N.fromJSON(this, e), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = Object.create(null);
	}
	node(e, t = null, n, r) {
		if (typeof e == "string") e = this.nodeType(e);
		else if (!(e instanceof We)) throw RangeError("Invalid node type: " + e);
		else if (e.schema != this) throw RangeError("Node type from different schema used (" + e.name + ")");
		return e.createChecked(t, n, r);
	}
	text(e, t) {
		let n = this.nodes.text;
		return new we(n, n.defaultAttrs, e, N.setFrom(t));
	}
	mark(e, t) {
		return typeof e == "string" && (e = this.marks[e]), e.create(t);
	}
	nodeType(e) {
		let t = this.nodes[e];
		if (!t) throw RangeError("Unknown node type: " + e);
		return t;
	}
};
function Ye(e, t) {
	let n = [];
	for (let r = 0; r < t.length; r++) {
		let i = t[r], a = e.marks[i], o = a;
		if (a) n.push(a);
		else for (let t in e.marks) {
			let r = e.marks[t];
			(i == "_" || r.spec.group && r.spec.group.split(" ").indexOf(i) > -1) && n.push(o = r);
		}
		if (!o) throw SyntaxError("Unknown mark type: '" + t[r] + "'");
	}
	return n;
}
function Xe(e) {
	return e.tag != null;
}
function Ze(e) {
	return e.style != null;
}
var Qe = class e {
	constructor(e, t) {
		this.schema = e, this.rules = t, this.tags = [], this.styles = [];
		let n = this.matchedStyles = [];
		t.forEach((e) => {
			if (Xe(e)) this.tags.push(e);
			else if (Ze(e)) {
				let t = /[^=]*/.exec(e.style)[0];
				n.indexOf(t) < 0 && n.push(t), this.styles.push(e);
			}
		}), this.normalizeLists = !this.tags.some((t) => {
			if (!/^(ul|ol)\b/.test(t.tag) || !t.node) return !1;
			let n = e.nodes[t.node];
			return n.contentMatch.matchType(n);
		});
	}
	parse(e, t = {}) {
		let n = new st(this, t, !1);
		return n.addAll(e, N.none, t.from, t.to), n.finish();
	}
	parseSlice(e, t = {}) {
		let n = new st(this, t, !0);
		return n.addAll(e, N.none, t.from, t.to), P.maxOpen(n.finish());
	}
	matchTag(e, t, n) {
		for (let r = n ? this.tags.indexOf(n) + 1 : 0; r < this.tags.length; r++) {
			let n = this.tags[r];
			if (lt(e, n.tag) && (n.namespace === void 0 || e.namespaceURI == n.namespace) && (!n.context || t.matchesContext(n.context))) {
				if (n.getAttrs) {
					let t = n.getAttrs(e);
					if (t === !1) continue;
					n.attrs = t || void 0;
				}
				return n;
			}
		}
	}
	matchStyle(e, t, n, r) {
		for (let i = r ? this.styles.indexOf(r) + 1 : 0; i < this.styles.length; i++) {
			let r = this.styles[i], a = r.style;
			if (!(a.indexOf(e) != 0 || r.context && !n.matchesContext(r.context) || a.length > e.length && (a.charCodeAt(e.length) != 61 || a.slice(e.length + 1) != t))) {
				if (r.getAttrs) {
					let e = r.getAttrs(t);
					if (e === !1) continue;
					r.attrs = e || void 0;
				}
				return r;
			}
		}
	}
	static schemaRules(e) {
		let t = [];
		function n(e) {
			let n = e.priority == null ? 50 : e.priority, r = 0;
			for (; r < t.length; r++) {
				let e = t[r];
				if ((e.priority == null ? 50 : e.priority) < n) break;
			}
			t.splice(r, 0, e);
		}
		for (let t in e.marks) {
			let r = e.marks[t].spec.parseDOM;
			r && r.forEach((e) => {
				n(e = ut(e)), e.mark || e.ignore || e.clearMark || (e.mark = t);
			});
		}
		for (let t in e.nodes) {
			let r = e.nodes[t].spec.parseDOM;
			r && r.forEach((e) => {
				n(e = ut(e)), e.node || e.ignore || e.mark || (e.node = t);
			});
		}
		return t;
	}
	static fromSchema(t) {
		return t.cached.domParser || (t.cached.domParser = new e(t, e.schemaRules(t)));
	}
}, $e = {
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
}, et = {
	head: !0,
	noscript: !0,
	object: !0,
	script: !0,
	style: !0,
	title: !0
}, tt = {
	ol: !0,
	ul: !0
}, nt = 1, rt = 2, it = 4;
function at(e, t, n) {
	return t == null ? e && e.whitespace == "pre" ? 3 : n & -5 : (t ? nt : 0) | (t === "full" ? rt : 0);
}
var ot = class {
	constructor(e, t, n, r, i, a) {
		this.type = e, this.attrs = t, this.marks = n, this.solid = r, this.options = a, this.content = [], this.activeMarks = N.none, this.match = i || (a & it ? null : e.contentMatch);
	}
	findWrapping(e) {
		if (!this.match) {
			if (!this.type) return [];
			let t = this.type.contentMatch.fillBefore(M.from(e));
			if (t) this.match = this.type.contentMatch.matchFragment(t);
			else {
				let t = this.type.contentMatch, n;
				return (n = t.findWrapping(e.type)) ? (this.match = t, n) : null;
			}
		}
		return this.match.findWrapping(e.type);
	}
	finish(e) {
		if (!(this.options & nt)) {
			let e = this.content[this.content.length - 1], t;
			if (e && e.isText && (t = /[ \t\r\n\u000c]+$/.exec(e.text))) {
				let n = e;
				e.text.length == t[0].length ? this.content.pop() : this.content[this.content.length - 1] = n.withText(n.text.slice(0, n.text.length - t[0].length));
			}
		}
		let t = M.from(this.content);
		return !e && this.match && (t = t.append(this.match.fillBefore(M.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
	}
	inlineContext(e) {
		return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !$e.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
	}
}, st = class {
	constructor(e, t, n) {
		this.parser = e, this.options = t, this.isOpen = n, this.open = 0, this.localPreserveWS = !1;
		let r = t.topNode, i, a = at(null, t.preserveWhitespace, 0) | (n ? it : 0);
		i = r ? new ot(r.type, r.attrs, N.none, !0, t.topMatch || r.type.contentMatch, a) : n ? new ot(null, null, N.none, !0, null, a) : new ot(e.schema.topNodeType, null, N.none, !0, null, a), this.nodes = [i], this.find = t.findPositions, this.needsBlock = !1;
	}
	get top() {
		return this.nodes[this.open];
	}
	addDOM(e, t) {
		e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
	}
	addTextNode(e, t) {
		let n = e.nodeValue, r = this.top, i = r.options & rt ? "full" : this.localPreserveWS || (r.options & nt) > 0, { schema: a } = this.parser;
		if (i === "full" || r.inlineContext(e) || /[^ \t\r\n\u000c]/.test(n)) {
			if (!i) {
				if (n = n.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(n) && this.open == this.nodes.length - 1) {
					let t = r.content[r.content.length - 1], i = e.previousSibling;
					(!t || i && i.nodeName == "BR" || t.isText && /[ \t\r\n\u000c]$/.test(t.text)) && (n = n.slice(1));
				}
			} else if (i === "full") n = n.replace(/\r\n?/g, "\n");
			else if (a.linebreakReplacement && /[\r\n]/.test(n) && this.top.findWrapping(a.linebreakReplacement.create())) {
				let e = n.split(/\r?\n|\r/);
				for (let n = 0; n < e.length; n++) n && this.insertNode(a.linebreakReplacement.create(), t, !0), e[n] && this.insertNode(a.text(e[n]), t, !/\S/.test(e[n]));
				n = "";
			} else n = n.replace(/\r?\n|\r/g, " ");
			n && this.insertNode(a.text(n), t, !/\S/.test(n)), this.findInText(e);
		} else this.findInside(e);
	}
	addElement(e, t, n) {
		let r = this.localPreserveWS, i = this.top;
		(e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
		let a = e.nodeName.toLowerCase(), o;
		tt.hasOwnProperty(a) && this.parser.normalizeLists && ct(e);
		let s = this.options.ruleFromNode && this.options.ruleFromNode(e) || (o = this.parser.matchTag(e, this, n));
		out: if (s ? s.ignore : et.hasOwnProperty(a)) this.findInside(e), this.ignoreFallback(e, t);
		else if (!s || s.skip || s.closeParent) {
			s && s.closeParent ? this.open = Math.max(0, this.open - 1) : s && s.skip.nodeType && (e = s.skip);
			let n, r = this.needsBlock;
			if ($e.hasOwnProperty(a)) i.content.length && i.content[0].isInline && this.open && (this.open--, i = this.top), n = !0, i.type || (this.needsBlock = !0);
			else if (!e.firstChild) {
				this.leafFallback(e, t);
				break out;
			}
			let o = s && s.skip ? t : this.readStyles(e, t);
			o && this.addAll(e, o), n && this.sync(i), this.needsBlock = r;
		} else {
			let n = this.readStyles(e, t);
			n && this.addElementByRule(e, s, n, s.consuming === !1 ? o : void 0);
		}
		this.localPreserveWS = r;
	}
	leafFallback(e, t) {
		e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode("\n"), t);
	}
	ignoreFallback(e, t) {
		e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t, !0);
	}
	readStyles(e, t) {
		let n = e.style;
		if (n && n.length) for (let e = 0; e < this.parser.matchedStyles.length; e++) {
			let r = this.parser.matchedStyles[e], i = n.getPropertyValue(r);
			if (i) for (let e;;) {
				let n = this.parser.matchStyle(r, i, this, e);
				if (!n) break;
				if (n.ignore) return null;
				if (t = n.clearMark ? t.filter((e) => !n.clearMark(e)) : t.concat(this.parser.schema.marks[n.mark].create(n.attrs)), n.consuming === !1) e = n;
				else break;
			}
		}
		return t;
	}
	addElementByRule(e, t, n, r) {
		let i, a;
		if (t.node) if (a = this.parser.schema.nodes[t.node], a.isLeaf) this.insertNode(a.create(t.attrs), n, e.nodeName == "BR") || this.leafFallback(e, n);
		else {
			let e = this.enter(a, t.attrs || null, n, t.preserveWhitespace);
			e && (i = !0, n = e);
		}
		else {
			let e = this.parser.schema.marks[t.mark];
			n = n.concat(e.create(t.attrs));
		}
		let o = this.top;
		if (a && a.isLeaf) this.findInside(e);
		else if (r) this.addElement(e, n, r);
		else if (t.getContent) this.findInside(e), t.getContent(e, this.parser.schema).forEach((e) => this.insertNode(e, n, !1));
		else {
			let r = e;
			typeof t.contentElement == "string" ? r = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? r = t.contentElement(e) : t.contentElement && (r = t.contentElement), this.findAround(e, r, !0), this.addAll(r, n), this.findAround(e, r, !1);
		}
		i && this.sync(o) && this.open--;
	}
	addAll(e, t, n, r) {
		let i = n || 0;
		for (let a = n ? e.childNodes[n] : e.firstChild, o = r == null ? null : e.childNodes[r]; a != o; a = a.nextSibling, ++i) this.findAtPoint(e, i), this.addDOM(a, t);
		this.findAtPoint(e, i);
	}
	findPlace(e, t, n) {
		let r, i;
		for (let t = this.open, a = 0; t >= 0; t--) {
			let o = this.nodes[t], s = o.findWrapping(e);
			if (s && (!r || r.length > s.length + a) && (r = s, i = o, !s.length)) break;
			if (o.solid) {
				if (n) break;
				a += 2;
			}
		}
		if (!r) return null;
		this.sync(i);
		for (let e = 0; e < r.length; e++) t = this.enterInner(r[e], null, t, !1);
		return t;
	}
	insertNode(e, t, n) {
		if (e.isInline && this.needsBlock && !this.top.type) {
			let e = this.textblockFromContext();
			e && (t = this.enterInner(e, null, t));
		}
		let r = this.findPlace(e, t, n);
		if (r) {
			this.closeExtra();
			let t = this.top;
			t.match &&= t.match.matchType(e.type);
			let n = N.none;
			for (let i of r.concat(e.marks)) (t.type ? t.type.allowsMarkType(i.type) : dt(i.type, e.type)) && (n = i.addToSet(n));
			return t.content.push(e.mark(n)), !0;
		}
		return !1;
	}
	enter(e, t, n, r) {
		let i = this.findPlace(e.create(t), n, !1);
		return i &&= this.enterInner(e, t, n, !0, r), i;
	}
	enterInner(e, t, n, r = !1, i) {
		this.closeExtra();
		let a = this.top;
		a.match = a.match && a.match.matchType(e);
		let o = at(e, i, a.options);
		a.options & it && a.content.length == 0 && (o |= it);
		let s = N.none;
		return n = n.filter((t) => (a.type ? a.type.allowsMarkType(t.type) : dt(t.type, e)) ? (s = t.addToSet(s), !1) : !0), this.nodes.push(new ot(e, t, s, r, null, o)), this.open++, n;
	}
	closeExtra(e = !1) {
		let t = this.nodes.length - 1;
		if (t > this.open) {
			for (; t > this.open; t--) this.nodes[t - 1].content.push(this.nodes[t].finish(e));
			this.nodes.length = this.open + 1;
		}
	}
	finish() {
		return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
	}
	sync(e) {
		for (let t = this.open; t >= 0; t--) if (this.nodes[t] == e) return this.open = t, !0;
		else this.localPreserveWS && (this.nodes[t].options |= nt);
		return !1;
	}
	get currentPos() {
		this.closeExtra();
		let e = 0;
		for (let t = this.open; t >= 0; t--) {
			let n = this.nodes[t].content;
			for (let t = n.length - 1; t >= 0; t--) e += n[t].nodeSize;
			t && e++;
		}
		return e;
	}
	findAtPoint(e, t) {
		if (this.find) for (let n = 0; n < this.find.length; n++) this.find[n].node == e && this.find[n].offset == t && (this.find[n].pos = this.currentPos);
	}
	findInside(e) {
		if (this.find) for (let t = 0; t < this.find.length; t++) this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
	}
	findAround(e, t, n) {
		if (e != t && this.find) for (let r = 0; r < this.find.length; r++) this.find[r].pos == null && e.nodeType == 1 && e.contains(this.find[r].node) && t.compareDocumentPosition(this.find[r].node) & (n ? 2 : 4) && (this.find[r].pos = this.currentPos);
	}
	findInText(e) {
		if (this.find) for (let t = 0; t < this.find.length; t++) this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
	}
	matchesContext(e) {
		if (e.indexOf("|") > -1) return e.split(/\s*\|\s*/).some(this.matchesContext, this);
		let t = e.split("/"), n = this.options.context, r = !this.isOpen && (!n || n.parent.type == this.nodes[0].type), i = -(n ? n.depth + 1 : 0) + +!r, a = (e, o) => {
			for (; e >= 0; e--) {
				let s = t[e];
				if (s == "") {
					if (e == t.length - 1 || e == 0) continue;
					for (; o >= i; o--) if (a(e - 1, o)) return !0;
					return !1;
				} else {
					let e = o > 0 || o == 0 && r ? this.nodes[o].type : n && o >= i ? n.node(o - i).type : null;
					if (!e || e.name != s && !e.isInGroup(s)) return !1;
					o--;
				}
			}
			return !0;
		};
		return a(t.length - 1, this.open);
	}
	textblockFromContext() {
		let e = this.options.context;
		if (e) for (let t = e.depth; t >= 0; t--) {
			let n = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
			if (n && n.isTextblock && n.defaultAttrs) return n;
		}
		for (let e in this.parser.schema.nodes) {
			let t = this.parser.schema.nodes[e];
			if (t.isTextblock && t.defaultAttrs) return t;
		}
	}
};
function ct(e) {
	for (let t = e.firstChild, n = null; t; t = t.nextSibling) {
		let e = t.nodeType == 1 ? t.nodeName.toLowerCase() : null;
		e && tt.hasOwnProperty(e) && n ? (n.appendChild(t), t = n) : e == "li" ? n = t : e && (n = null);
	}
}
function lt(e, t) {
	return (e.matches || e.msMatchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector).call(e, t);
}
function ut(e) {
	let t = {};
	for (let n in e) t[n] = e[n];
	return t;
}
function dt(e, t) {
	let n = t.schema.nodes;
	for (let r in n) {
		let i = n[r];
		if (!i.allowsMarkType(e)) continue;
		let a = [], o = (e) => {
			a.push(e);
			for (let n = 0; n < e.edgeCount; n++) {
				let { type: r, next: i } = e.edge(n);
				if (r == t || a.indexOf(i) < 0 && o(i)) return !0;
			}
		};
		if (o(i.contentMatch)) return !0;
	}
}
var ft = class e {
	constructor(e, t) {
		this.nodes = e, this.marks = t;
	}
	serializeFragment(e, t = {}, n) {
		n ||= mt(t).createDocumentFragment();
		let r = n, i = [];
		return e.forEach((e) => {
			if (i.length || e.marks.length) {
				let n = 0, a = 0;
				for (; n < i.length && a < e.marks.length;) {
					let t = e.marks[a];
					if (!this.marks[t.type.name]) {
						a++;
						continue;
					}
					if (!t.eq(i[n][0]) || t.type.spec.spanning === !1) break;
					n++, a++;
				}
				for (; n < i.length;) r = i.pop()[1];
				for (; a < e.marks.length;) {
					let n = e.marks[a++], o = this.serializeMark(n, e.isInline, t);
					o && (i.push([n, r]), r.appendChild(o.dom), r = o.contentDOM || o.dom);
				}
			}
			r.appendChild(this.serializeNodeInner(e, t));
		}), n;
	}
	serializeNodeInner(e, t) {
		if (e.isText) return mt(t).createTextNode(e.text);
		let { dom: n, contentDOM: r } = vt(mt(t), this.nodes[e.type.name](e), null, e.attrs);
		if (r) {
			if (e.isLeaf) throw RangeError("Content hole not allowed in a leaf node spec");
			this.serializeFragment(e.content, t, r);
		}
		return n;
	}
	serializeNode(e, t = {}) {
		let n = this.serializeNodeInner(e, t);
		for (let r = e.marks.length - 1; r >= 0; r--) {
			let i = this.serializeMark(e.marks[r], e.isInline, t);
			i && ((i.contentDOM || i.dom).appendChild(n), n = i.dom);
		}
		return n;
	}
	serializeMark(e, t, n = {}) {
		let r = this.marks[e.type.name];
		return r && vt(mt(n), r(e, t), null, e.attrs);
	}
	static renderSpec(e, t, n = null, r) {
		return typeof t == "string" ? { dom: e.createTextNode(t) } : vt(e, t, n, r);
	}
	static fromSchema(t) {
		return t.cached.domSerializer || (t.cached.domSerializer = new e(this.nodesFromSchema(t), this.marksFromSchema(t)));
	}
	static nodesFromSchema(e) {
		let t = pt(e.nodes);
		return t.text ||= (e) => e.text, t;
	}
	static marksFromSchema(e) {
		return pt(e.marks);
	}
};
function pt(e) {
	let t = {};
	for (let n in e) {
		let r = e[n].spec.toDOM;
		r && (t[n] = r);
	}
	return t;
}
function mt(e) {
	return e.document || window.document;
}
var ht = /* @__PURE__ */ new WeakMap();
function gt(e) {
	let t = ht.get(e);
	return t === void 0 && ht.set(e, t = _t(e)), t;
}
function _t(e) {
	let t = null;
	function n(e) {
		if (e && typeof e == "object") if (Array.isArray(e)) if (typeof e[0] == "string") t ||= [], t.push(e);
		else for (let t = 0; t < e.length; t++) n(e[t]);
		else for (let t in e) n(e[t]);
	}
	return n(e), t;
}
function vt(e, t, n, r) {
	if (t.nodeType == 1) return { dom: t };
	if (t.dom && t.dom.nodeType == 1) return t;
	let i = t[0], a;
	if (typeof i != "string") throw RangeError("Invalid array passed to renderSpec");
	if (r && (a = gt(r)) && a.indexOf(t) > -1) throw RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
	let o = i.indexOf(" ");
	o > 0 && (n = i.slice(0, o), i = i.slice(o + 1));
	let s, c = n ? e.createElementNS(n, i) : e.createElement(i), l = t[1], u = 1;
	if (l && typeof l == "object" && l.nodeType == null && !Array.isArray(l)) {
		u = 2;
		for (let e in l) if (l[e] != null) {
			let t = e.indexOf(" ");
			t > 0 ? c.setAttributeNS(e.slice(0, t), e.slice(t + 1), l[e]) : e == "style" && c.style ? c.style.cssText = l[e] : c.setAttribute(e, l[e]);
		}
	}
	for (let i = u; i < t.length; i++) {
		let a = t[i];
		if (a === 0) {
			if (i < t.length - 1 || i > u) throw RangeError("Content hole must be the only child of its parent node");
			return {
				dom: c,
				contentDOM: c
			};
		} else if (typeof a == "string") c.appendChild(e.createTextNode(a));
		else {
			let { dom: t, contentDOM: i } = vt(e, a, n, r);
			if (c.appendChild(t), i) {
				if (s) throw RangeError("Multiple content holes");
				s = i;
			}
		}
	}
	return {
		dom: c,
		contentDOM: s
	};
}
//#endregion
//#region node_modules/prosemirror-transform/dist/index.js
var yt = 65535, bt = 2 ** 16;
function xt(e, t) {
	return e + t * bt;
}
function St(e) {
	return e & yt;
}
function Ct(e) {
	return (e - (e & yt)) / bt;
}
var wt = 1, Tt = 2, Et = 4, Dt = 8, Ot = class {
	constructor(e, t, n) {
		this.pos = e, this.delInfo = t, this.recover = n;
	}
	get deleted() {
		return (this.delInfo & Dt) > 0;
	}
	get deletedBefore() {
		return (this.delInfo & 5) > 0;
	}
	get deletedAfter() {
		return (this.delInfo & 6) > 0;
	}
	get deletedAcross() {
		return (this.delInfo & Et) > 0;
	}
}, kt = class e {
	constructor(t, n = !1) {
		if (this.ranges = t, this.inverted = n, !t.length && e.empty) return e.empty;
	}
	recover(e) {
		let t = 0, n = St(e);
		if (!this.inverted) for (let e = 0; e < n; e++) t += this.ranges[e * 3 + 2] - this.ranges[e * 3 + 1];
		return this.ranges[n * 3] + t + Ct(e);
	}
	mapResult(e, t = 1) {
		return this._map(e, t, !1);
	}
	map(e, t = 1) {
		return this._map(e, t, !0);
	}
	_map(e, t, n) {
		let r = 0, i = this.inverted ? 2 : 1, a = this.inverted ? 1 : 2;
		for (let o = 0; o < this.ranges.length; o += 3) {
			let s = this.ranges[o] - (this.inverted ? r : 0);
			if (s > e) break;
			let c = this.ranges[o + i], l = this.ranges[o + a], u = s + c;
			if (e <= u) {
				let i = c ? e == s ? -1 : e == u ? 1 : t : t, a = s + r + (i < 0 ? 0 : l);
				if (n) return a;
				let d = e == (t < 0 ? s : u) ? null : xt(o / 3, e - s), f = e == s ? Tt : e == u ? wt : Et;
				return (t < 0 ? e != s : e != u) && (f |= Dt), new Ot(a, f, d);
			}
			r += l - c;
		}
		return n ? e + r : new Ot(e + r, 0, null);
	}
	touches(e, t) {
		let n = 0, r = St(t), i = this.inverted ? 2 : 1, a = this.inverted ? 1 : 2;
		for (let t = 0; t < this.ranges.length; t += 3) {
			let o = this.ranges[t] - (this.inverted ? n : 0);
			if (o > e) break;
			let s = this.ranges[t + i];
			if (e <= o + s && t == r * 3) return !0;
			n += this.ranges[t + a] - s;
		}
		return !1;
	}
	forEach(e) {
		let t = this.inverted ? 2 : 1, n = this.inverted ? 1 : 2;
		for (let r = 0, i = 0; r < this.ranges.length; r += 3) {
			let a = this.ranges[r], o = a - (this.inverted ? i : 0), s = a + (this.inverted ? 0 : i), c = this.ranges[r + t], l = this.ranges[r + n];
			e(o, o + c, s, s + l), i += l - c;
		}
	}
	invert() {
		return new e(this.ranges, !this.inverted);
	}
	toString() {
		return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
	}
	static offset(t) {
		return t == 0 ? e.empty : new e(t < 0 ? [
			0,
			-t,
			0
		] : [
			0,
			0,
			t
		]);
	}
};
kt.empty = new kt([]);
var At = class e {
	constructor(e, t, n = 0, r = e ? e.length : 0) {
		this.mirror = t, this.from = n, this.to = r, this._maps = e || [], this.ownData = !(e || t);
	}
	get maps() {
		return this._maps;
	}
	slice(t = 0, n = this.maps.length) {
		return new e(this._maps, this.mirror, t, n);
	}
	appendMap(e, t) {
		this.ownData ||= (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), !0), this.to = this._maps.push(e), t != null && this.setMirror(this._maps.length - 1, t);
	}
	appendMapping(e) {
		for (let t = 0, n = this._maps.length; t < e._maps.length; t++) {
			let r = e.getMirror(t);
			this.appendMap(e._maps[t], r != null && r < t ? n + r : void 0);
		}
	}
	getMirror(e) {
		if (this.mirror) {
			for (let t = 0; t < this.mirror.length; t++) if (this.mirror[t] == e) return this.mirror[t + (t % 2 ? -1 : 1)];
		}
	}
	setMirror(e, t) {
		this.mirror ||= [], this.mirror.push(e, t);
	}
	appendMappingInverted(e) {
		for (let t = e.maps.length - 1, n = this._maps.length + e._maps.length; t >= 0; t--) {
			let r = e.getMirror(t);
			this.appendMap(e._maps[t].invert(), r != null && r > t ? n - r - 1 : void 0);
		}
	}
	invert() {
		let t = new e();
		return t.appendMappingInverted(this), t;
	}
	map(e, t = 1) {
		if (this.mirror) return this._map(e, t, !0);
		for (let n = this.from; n < this.to; n++) e = this._maps[n].map(e, t);
		return e;
	}
	mapResult(e, t = 1) {
		return this._map(e, t, !1);
	}
	_map(e, t, n) {
		let r = 0;
		for (let n = this.from; n < this.to; n++) {
			let i = this._maps[n].mapResult(e, t);
			if (i.recover != null) {
				let t = this.getMirror(n);
				if (t != null && t > n && t < this.to) {
					n = t, e = this._maps[t].recover(i.recover);
					continue;
				}
			}
			r |= i.delInfo, e = i.pos;
		}
		return n ? e : new Ot(e, r, null);
	}
}, jt = Object.create(null), F = class {
	getMap() {
		return kt.empty;
	}
	merge(e) {
		return null;
	}
	static fromJSON(e, t) {
		if (!t || !t.stepType) throw RangeError("Invalid input for Step.fromJSON");
		let n = jt[t.stepType];
		if (!n) throw RangeError(`No step type ${t.stepType} defined`);
		return n.fromJSON(e, t);
	}
	static jsonID(e, t) {
		if (e in jt) throw RangeError("Duplicate use of step JSON ID " + e);
		return jt[e] = t, t.prototype.jsonID = e, t;
	}
}, I = class e {
	constructor(e, t) {
		this.doc = e, this.failed = t;
	}
	static ok(t) {
		return new e(t, null);
	}
	static fail(t) {
		return new e(null, t);
	}
	static fromReplace(t, n, r, i) {
		try {
			return e.ok(t.replace(n, r, i));
		} catch (t) {
			if (t instanceof ie) return e.fail(t.message);
			throw t;
		}
	}
};
function Mt(e, t, n) {
	let r = [];
	for (let i = 0; i < e.childCount; i++) {
		let a = e.child(i);
		a.content.size && (a = a.copy(Mt(a.content, t, a))), a.isInline && (a = t(a, n, i)), r.push(a);
	}
	return M.fromArray(r);
}
var Nt = class e extends F {
	constructor(e, t, n) {
		super(), this.from = e, this.to = t, this.mark = n;
	}
	apply(e) {
		let t = e.slice(this.from, this.to), n = e.resolve(this.from), r = n.node(n.sharedDepth(this.to)), i = new P(Mt(t.content, (e, t) => !e.isAtom || !t.type.allowsMarkType(this.mark.type) ? e : e.mark(this.mark.addToSet(e.marks)), r), t.openStart, t.openEnd);
		return I.fromReplace(e, this.from, this.to, i);
	}
	invert() {
		return new Pt(this.from, this.to, this.mark);
	}
	map(t) {
		let n = t.mapResult(this.from, 1), r = t.mapResult(this.to, -1);
		return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark);
	}
	merge(t) {
		return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null;
	}
	toJSON() {
		return {
			stepType: "addMark",
			mark: this.mark.toJSON(),
			from: this.from,
			to: this.to
		};
	}
	static fromJSON(t, n) {
		if (typeof n.from != "number" || typeof n.to != "number") throw RangeError("Invalid input for AddMarkStep.fromJSON");
		return new e(n.from, n.to, t.markFromJSON(n.mark));
	}
};
F.jsonID("addMark", Nt);
var Pt = class e extends F {
	constructor(e, t, n) {
		super(), this.from = e, this.to = t, this.mark = n;
	}
	apply(e) {
		let t = e.slice(this.from, this.to), n = new P(Mt(t.content, (e) => e.mark(this.mark.removeFromSet(e.marks)), e), t.openStart, t.openEnd);
		return I.fromReplace(e, this.from, this.to, n);
	}
	invert() {
		return new Nt(this.from, this.to, this.mark);
	}
	map(t) {
		let n = t.mapResult(this.from, 1), r = t.mapResult(this.to, -1);
		return n.deleted && r.deleted || n.pos >= r.pos ? null : new e(n.pos, r.pos, this.mark);
	}
	merge(t) {
		return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null;
	}
	toJSON() {
		return {
			stepType: "removeMark",
			mark: this.mark.toJSON(),
			from: this.from,
			to: this.to
		};
	}
	static fromJSON(t, n) {
		if (typeof n.from != "number" || typeof n.to != "number") throw RangeError("Invalid input for RemoveMarkStep.fromJSON");
		return new e(n.from, n.to, t.markFromJSON(n.mark));
	}
};
F.jsonID("removeMark", Pt);
var Ft = class e extends F {
	constructor(e, t) {
		super(), this.pos = e, this.mark = t;
	}
	apply(e) {
		let t = e.nodeAt(this.pos);
		if (!t) return I.fail("No node at mark step's position");
		let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
		return I.fromReplace(e, this.pos, this.pos + 1, new P(M.from(n), 0, +!t.isLeaf));
	}
	invert(t) {
		let n = t.nodeAt(this.pos);
		if (n) {
			let t = this.mark.addToSet(n.marks);
			if (t.length == n.marks.length) {
				for (let r = 0; r < n.marks.length; r++) if (!n.marks[r].isInSet(t)) return new e(this.pos, n.marks[r]);
				return new e(this.pos, this.mark);
			}
		}
		return new It(this.pos, this.mark);
	}
	map(t) {
		let n = t.mapResult(this.pos, 1);
		return n.deletedAfter ? null : new e(n.pos, this.mark);
	}
	toJSON() {
		return {
			stepType: "addNodeMark",
			pos: this.pos,
			mark: this.mark.toJSON()
		};
	}
	static fromJSON(t, n) {
		if (typeof n.pos != "number") throw RangeError("Invalid input for AddNodeMarkStep.fromJSON");
		return new e(n.pos, t.markFromJSON(n.mark));
	}
};
F.jsonID("addNodeMark", Ft);
var It = class e extends F {
	constructor(e, t) {
		super(), this.pos = e, this.mark = t;
	}
	apply(e) {
		let t = e.nodeAt(this.pos);
		if (!t) return I.fail("No node at mark step's position");
		let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
		return I.fromReplace(e, this.pos, this.pos + 1, new P(M.from(n), 0, +!t.isLeaf));
	}
	invert(e) {
		let t = e.nodeAt(this.pos);
		return !t || !this.mark.isInSet(t.marks) ? this : new Ft(this.pos, this.mark);
	}
	map(t) {
		let n = t.mapResult(this.pos, 1);
		return n.deletedAfter ? null : new e(n.pos, this.mark);
	}
	toJSON() {
		return {
			stepType: "removeNodeMark",
			pos: this.pos,
			mark: this.mark.toJSON()
		};
	}
	static fromJSON(t, n) {
		if (typeof n.pos != "number") throw RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
		return new e(n.pos, t.markFromJSON(n.mark));
	}
};
F.jsonID("removeNodeMark", It);
var Lt = class e extends F {
	constructor(e, t, n, r = !1) {
		super(), this.from = e, this.to = t, this.slice = n, this.structure = r;
	}
	apply(e) {
		return this.structure && zt(e, this.from, this.to) ? I.fail("Structure replace would overwrite content") : I.fromReplace(e, this.from, this.to, this.slice);
	}
	getMap() {
		return new kt([
			this.from,
			this.to - this.from,
			this.slice.size
		]);
	}
	invert(t) {
		return new e(this.from, this.from + this.slice.size, t.slice(this.from, this.to));
	}
	map(t) {
		let n = t.mapResult(this.to, -1), r = this.from == this.to && e.MAP_BIAS < 0 ? n : t.mapResult(this.from, 1);
		return r.deletedAcross && n.deletedAcross ? null : new e(r.pos, Math.max(r.pos, n.pos), this.slice, this.structure);
	}
	merge(t) {
		if (!(t instanceof e) || t.structure || this.structure) return null;
		if (this.from + this.slice.size == t.from && !this.slice.openEnd && !t.slice.openStart) {
			let n = this.slice.size + t.slice.size == 0 ? P.empty : new P(this.slice.content.append(t.slice.content), this.slice.openStart, t.slice.openEnd);
			return new e(this.from, this.to + (t.to - t.from), n, this.structure);
		} else if (t.to == this.from && !this.slice.openStart && !t.slice.openEnd) {
			let n = this.slice.size + t.slice.size == 0 ? P.empty : new P(t.slice.content.append(this.slice.content), t.slice.openStart, this.slice.openEnd);
			return new e(t.from, this.to, n, this.structure);
		} else return null;
	}
	toJSON() {
		let e = {
			stepType: "replace",
			from: this.from,
			to: this.to
		};
		return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
	}
	static fromJSON(t, n) {
		if (typeof n.from != "number" || typeof n.to != "number") throw RangeError("Invalid input for ReplaceStep.fromJSON");
		return new e(n.from, n.to, P.fromJSON(t, n.slice), !!n.structure);
	}
};
Lt.MAP_BIAS = 1, F.jsonID("replace", Lt);
var Rt = class e extends F {
	constructor(e, t, n, r, i, a, o = !1) {
		super(), this.from = e, this.to = t, this.gapFrom = n, this.gapTo = r, this.slice = i, this.insert = a, this.structure = o;
	}
	apply(e) {
		if (this.structure && (zt(e, this.from, this.gapFrom) || zt(e, this.gapTo, this.to))) return I.fail("Structure gap-replace would overwrite content");
		let t = e.slice(this.gapFrom, this.gapTo);
		if (t.openStart || t.openEnd) return I.fail("Gap is not a flat range");
		let n = this.slice.insertAt(this.insert, t.content);
		return n ? I.fromReplace(e, this.from, this.to, n) : I.fail("Content does not fit in gap");
	}
	getMap() {
		return new kt([
			this.from,
			this.gapFrom - this.from,
			this.insert,
			this.gapTo,
			this.to - this.gapTo,
			this.slice.size - this.insert
		]);
	}
	invert(t) {
		let n = this.gapTo - this.gapFrom;
		return new e(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, t.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
	}
	map(t) {
		let n = t.mapResult(this.from, 1), r = t.mapResult(this.to, -1), i = this.from == this.gapFrom ? n.pos : t.map(this.gapFrom, -1), a = this.to == this.gapTo ? r.pos : t.map(this.gapTo, 1);
		return n.deletedAcross && r.deletedAcross || i < n.pos || a > r.pos ? null : new e(n.pos, r.pos, i, a, this.slice, this.insert, this.structure);
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
	static fromJSON(t, n) {
		if (typeof n.from != "number" || typeof n.to != "number" || typeof n.gapFrom != "number" || typeof n.gapTo != "number" || typeof n.insert != "number") throw RangeError("Invalid input for ReplaceAroundStep.fromJSON");
		return new e(n.from, n.to, n.gapFrom, n.gapTo, P.fromJSON(t, n.slice), n.insert, !!n.structure);
	}
};
F.jsonID("replaceAround", Rt);
function zt(e, t, n) {
	let r = e.resolve(t), i = n - t, a = r.depth;
	for (; i > 0 && a > 0 && r.indexAfter(a) == r.node(a).childCount;) a--, i--;
	if (i > 0) {
		let e = r.node(a).maybeChild(r.indexAfter(a));
		for (; i > 0;) {
			if (!e || e.isLeaf) return !0;
			e = e.firstChild, i--;
		}
	}
	return !1;
}
function Bt(e, t, n, r) {
	let i = [], a = [], o, s;
	e.doc.nodesBetween(t, n, (e, c, l) => {
		if (!e.isInline) return;
		let u = e.marks;
		if (!r.isInSet(u) && l.type.allowsMarkType(r.type)) {
			let l = Math.max(c, t), d = Math.min(c + e.nodeSize, n), f = r.addToSet(u);
			for (let e = 0; e < u.length; e++) u[e].isInSet(f) || (o && o.to == l && o.mark.eq(u[e]) ? o.to = d : i.push(o = new Pt(l, d, u[e])));
			s && s.to == l ? s.to = d : a.push(s = new Nt(l, d, r));
		}
	}), i.forEach((t) => e.step(t)), a.forEach((t) => e.step(t));
}
function Vt(e, t, n, r) {
	let i = [], a = 0;
	e.doc.nodesBetween(t, n, (e, o) => {
		if (!e.isInline) return;
		a++;
		let s = null;
		if (r instanceof qe) {
			let t = e.marks, n;
			for (; n = r.isInSet(t);) (s ||= []).push(n), t = n.removeFromSet(t);
		} else r ? r.isInSet(e.marks) && (s = [r]) : s = e.marks;
		if (s && s.length) {
			let r = Math.min(o + e.nodeSize, n);
			for (let e = 0; e < s.length; e++) {
				let n = s[e], c;
				for (let e = 0; e < i.length; e++) {
					let t = i[e];
					t.step == a - 1 && n.eq(i[e].style) && (c = t);
				}
				c ? (c.to = r, c.step = a) : i.push({
					style: n,
					from: Math.max(o, t),
					to: r,
					step: a
				});
			}
		}
	}), i.forEach((t) => e.step(new Pt(t.from, t.to, t.style)));
}
function Ht(e, t, n, r = n.contentMatch, i = !0) {
	let a = e.doc.nodeAt(t), o = [], s = t + 1;
	for (let t = 0; t < a.childCount; t++) {
		let c = a.child(t), l = s + c.nodeSize, u = r.matchType(c.type);
		if (!u) o.push(new Lt(s, l, P.empty));
		else {
			r = u;
			for (let t = 0; t < c.marks.length; t++) n.allowsMarkType(c.marks[t].type) || e.step(new Pt(s, l, c.marks[t]));
			if (i && c.isText && n.whitespace != "pre") {
				let e, t = /\r?\n|\r/g, r;
				for (; e = t.exec(c.text);) r ||= new P(M.from(n.schema.text(" ", n.allowedMarks(c.marks))), 0, 0), o.push(new Lt(s + e.index, s + e.index + e[0].length, r));
			}
		}
		s = l;
	}
	if (!r.validEnd) {
		let t = r.fillBefore(M.empty, !0);
		e.replace(s, s, new P(t, 0, 0));
	}
	for (let t = o.length - 1; t >= 0; t--) e.step(o[t]);
}
function Ut(e, t, n) {
	return (t == 0 || e.canReplace(t, e.childCount)) && (n == e.childCount || e.canReplace(0, n));
}
function Wt(e) {
	let t = e.parent.content.cutByIndex(e.startIndex, e.endIndex);
	for (let n = e.depth, r = 0, i = 0;; --n) {
		let a = e.$from.node(n), o = e.$from.index(n) + r, s = e.$to.indexAfter(n) - i;
		if (n < e.depth && a.canReplace(o, s, t)) return n;
		if (n == 0 || a.type.spec.isolating || !Ut(a, o, s)) break;
		o && (r = 1), s < a.childCount && (i = 1);
	}
	return null;
}
function Gt(e, t, n) {
	let { $from: r, $to: i, depth: a } = t, o = r.before(a + 1), s = i.after(a + 1), c = o, l = s, u = M.empty, d = 0;
	for (let e = a, t = !1; e > n; e--) t || r.index(e) > 0 ? (t = !0, u = M.from(r.node(e).copy(u)), d++) : c--;
	let f = M.empty, p = 0;
	for (let e = a, t = !1; e > n; e--) t || i.after(e + 1) < i.end(e) ? (t = !0, f = M.from(i.node(e).copy(f)), p++) : l++;
	e.step(new Rt(c, l, o, s, new P(u.append(f), d, p), u.size - d, !0));
}
function Kt(e, t, n = null, r = e) {
	let i = Jt(e, t), a = i && Yt(r, t);
	return a ? i.map(qt).concat({
		type: t,
		attrs: n
	}).concat(a.map(qt)) : null;
}
function qt(e) {
	return {
		type: e,
		attrs: null
	};
}
function Jt(e, t) {
	let { parent: n, startIndex: r, endIndex: i } = e, a = n.contentMatchAt(r).findWrapping(t);
	if (!a) return null;
	let o = a.length ? a[0] : t;
	return n.canReplaceWith(r, i, o) ? a : null;
}
function Yt(e, t) {
	let { parent: n, startIndex: r, endIndex: i } = e, a = n.child(r), o = t.contentMatch.findWrapping(a.type);
	if (!o) return null;
	let s = (o.length ? o[o.length - 1] : t).contentMatch;
	for (let e = r; s && e < i; e++) s = s.matchType(n.child(e).type);
	return !s || !s.validEnd ? null : o;
}
function Xt(e, t, n) {
	let r = M.empty;
	for (let e = n.length - 1; e >= 0; e--) {
		if (r.size) {
			let t = n[e].type.contentMatch.matchFragment(r);
			if (!t || !t.validEnd) throw RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
		}
		r = M.from(n[e].type.create(n[e].attrs, r));
	}
	let i = t.start, a = t.end;
	e.step(new Rt(i, a, i, a, new P(r, 0, 0), n.length, !0));
}
function Zt(e, t, n, r, i) {
	if (!r.isTextblock) throw RangeError("Type given to setBlockType should be a textblock");
	let a = e.steps.length;
	e.doc.nodesBetween(t, n, (t, n) => {
		let o = typeof i == "function" ? i(t) : i;
		if (t.isTextblock && !t.hasMarkup(r, o) && en(e.doc, e.mapping.slice(a).map(n), r)) {
			let i = null;
			if (r.schema.linebreakReplacement) {
				let e = r.whitespace == "pre", t = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
				e && !t ? i = !1 : !e && t && (i = !0);
			}
			i === !1 && $t(e, t, n, a), Ht(e, e.mapping.slice(a).map(n, 1), r, void 0, i === null);
			let s = e.mapping.slice(a), c = s.map(n, 1), l = s.map(n + t.nodeSize, 1);
			return e.step(new Rt(c, l, c + 1, l - 1, new P(M.from(r.create(o, null, t.marks)), 0, 0), 1, !0)), i === !0 && Qt(e, t, n, a), !1;
		}
	});
}
function Qt(e, t, n, r) {
	t.forEach((i, a) => {
		if (i.isText) {
			let o, s = /\r?\n|\r/g;
			for (; o = s.exec(i.text);) {
				let i = e.mapping.slice(r).map(n + 1 + a + o.index);
				e.replaceWith(i, i + 1, t.type.schema.linebreakReplacement.create());
			}
		}
	});
}
function $t(e, t, n, r) {
	t.forEach((i, a) => {
		if (i.type == i.type.schema.linebreakReplacement) {
			let i = e.mapping.slice(r).map(n + 1 + a);
			e.replaceWith(i, i + 1, t.type.schema.text("\n"));
		}
	});
}
function en(e, t, n) {
	let r = e.resolve(t), i = r.index();
	return r.parent.canReplaceWith(i, i + 1, n);
}
function tn(e, t, n, r, i) {
	let a = e.doc.nodeAt(t);
	if (!a) throw RangeError("No node at given position");
	n ||= a.type;
	let o = n.create(r, null, i || a.marks);
	if (a.isLeaf) return e.replaceWith(t, t + a.nodeSize, o);
	if (!n.validContent(a.content)) throw RangeError("Invalid content for node type " + n.name);
	e.step(new Rt(t, t + a.nodeSize, t + 1, t + a.nodeSize - 1, new P(M.from(o), 0, 0), 1, !0));
}
function nn(e, t, n = 1, r) {
	let i = e.resolve(t), a = i.depth - n, o = r && r[r.length - 1] || i.parent;
	if (a < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount))) return !1;
	for (let e = i.depth - 1, t = n - 2; e > a; e--, t--) {
		let n = i.node(e), a = i.index(e);
		if (n.type.spec.isolating) return !1;
		let o = n.content.cutByIndex(a, n.childCount), s = r && r[t + 1];
		s && (o = o.replaceChild(0, s.type.create(s.attrs)));
		let c = r && r[t] || n;
		if (!n.canReplace(a + 1, n.childCount) || !c.type.validContent(o)) return !1;
	}
	let s = i.indexAfter(a), c = r && r[0];
	return i.node(a).canReplaceWith(s, s, c ? c.type : i.node(a + 1).type);
}
function rn(e, t, n = 1, r) {
	let i = e.doc.resolve(t), a = M.empty, o = M.empty;
	for (let e = i.depth, t = i.depth - n, s = n - 1; e > t; e--, s--) {
		a = M.from(i.node(e).copy(a));
		let t = r && r[s];
		o = M.from(t ? t.type.create(t.attrs, o) : i.node(e).copy(o));
	}
	e.step(new Lt(t, t, new P(a.append(o), n, n), !0));
}
function an(e, t) {
	let n = e.resolve(t), r = n.index();
	return sn(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function on(e, t) {
	t.content.size || e.type.compatibleContent(t.type);
	let n = e.contentMatchAt(e.childCount), { linebreakReplacement: r } = e.type.schema;
	for (let i = 0; i < t.childCount; i++) {
		let a = t.child(i), o = a.type == r ? e.type.schema.nodes.text : a.type;
		if (n = n.matchType(o), !n || !e.type.allowsMarks(a.marks)) return !1;
	}
	return n.validEnd;
}
function sn(e, t) {
	return !!(e && t && !e.isLeaf && on(e, t));
}
function cn(e, t, n = -1) {
	let r = e.resolve(t);
	for (let e = r.depth;; e--) {
		let i, a, o = r.index(e);
		if (e == r.depth ? (i = r.nodeBefore, a = r.nodeAfter) : n > 0 ? (i = r.node(e + 1), o++, a = r.node(e).maybeChild(o)) : (i = r.node(e).maybeChild(o - 1), a = r.node(e + 1)), i && !i.isTextblock && sn(i, a) && r.node(e).canReplace(o, o + 1)) return t;
		if (e == 0) break;
		t = n < 0 ? r.before(e) : r.after(e);
	}
}
function ln(e, t, n) {
	let r = null, { linebreakReplacement: i } = e.doc.type.schema, a = e.doc.resolve(t - n), o = a.node().type;
	if (i && o.inlineContent) {
		let e = o.whitespace == "pre", t = !!o.contentMatch.matchType(i);
		e && !t ? r = !1 : !e && t && (r = !0);
	}
	let s = e.steps.length;
	if (r === !1) {
		let r = e.doc.resolve(t + n);
		$t(e, r.node(), r.before(), s);
	}
	o.inlineContent && Ht(e, t + n - 1, o, a.node().contentMatchAt(a.index()), r == null);
	let c = e.mapping.slice(s), l = c.map(t - n);
	if (e.step(new Lt(l, c.map(t + n, -1), P.empty, !0)), r === !0) {
		let t = e.doc.resolve(l);
		Qt(e, t.node(), t.before(), e.steps.length);
	}
	return e;
}
function un(e, t, n) {
	let r = e.resolve(t);
	if (r.parent.canReplaceWith(r.index(), r.index(), n)) return t;
	if (r.parentOffset == 0) for (let e = r.depth - 1; e >= 0; e--) {
		let t = r.index(e);
		if (r.node(e).canReplaceWith(t, t, n)) return r.before(e + 1);
		if (t > 0) return null;
	}
	if (r.parentOffset == r.parent.content.size) for (let e = r.depth - 1; e >= 0; e--) {
		let t = r.indexAfter(e);
		if (r.node(e).canReplaceWith(t, t, n)) return r.after(e + 1);
		if (t < r.node(e).childCount) return null;
	}
	return null;
}
function dn(e, t, n) {
	let r = e.resolve(t);
	if (!n.content.size) return t;
	let i = n.content;
	for (let e = 0; e < n.openStart; e++) i = i.firstChild.content;
	for (let e = 1; e <= (n.openStart == 0 && n.size ? 2 : 1); e++) for (let t = r.depth; t >= 0; t--) {
		let n = t == r.depth ? 0 : r.pos <= (r.start(t + 1) + r.end(t + 1)) / 2 ? -1 : 1, a = r.index(t) + +(n > 0), o = r.node(t), s = !1;
		if (e == 1) s = o.canReplace(a, a, i);
		else {
			let e = o.contentMatchAt(a).findWrapping(i.firstChild.type);
			s = e && o.canReplaceWith(a, a, e[0]);
		}
		if (s) return n == 0 ? r.pos : n < 0 ? r.before(t + 1) : r.after(t + 1);
	}
	return null;
}
function fn(e, t, n = t, r = P.empty) {
	if (t == n && !r.size) return null;
	let i = e.resolve(t), a = e.resolve(n);
	return pn(i, a, r) ? new Lt(t, n, r) : new mn(i, a, r).fit();
}
function pn(e, t, n) {
	return !n.openStart && !n.openEnd && e.start() == t.start() && e.parent.canReplace(e.index(), t.index(), n.content);
}
var mn = class {
	constructor(e, t, n) {
		this.$from = e, this.$to = t, this.unplaced = n, this.frontier = [], this.placed = M.empty;
		for (let t = 0; t <= e.depth; t++) {
			let n = e.node(t);
			this.frontier.push({
				type: n.type,
				match: n.contentMatchAt(e.indexAfter(t))
			});
		}
		for (let t = e.depth; t > 0; t--) this.placed = M.from(e.node(t).copy(this.placed));
	}
	get depth() {
		return this.frontier.length - 1;
	}
	fit() {
		for (; this.unplaced.size;) {
			let e = this.findFittable();
			e ? this.placeNodes(e) : this.openMore() || this.dropNode();
		}
		let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, n = this.$from, r = this.close(e < 0 ? this.$to : n.doc.resolve(e));
		if (!r) return null;
		let i = this.placed, a = n.depth, o = r.depth;
		for (; a && o && i.childCount == 1;) i = i.firstChild.content, a--, o--;
		let s = new P(i, a, o);
		return e > -1 ? new Rt(n.pos, e, this.$to.pos, this.$to.end(), s, t) : s.size || n.pos != this.$to.pos ? new Lt(n.pos, r.pos, s) : null;
	}
	findFittable() {
		let e = this.unplaced.openStart;
		for (let t = this.unplaced.content, n = 0, r = this.unplaced.openEnd; n < e; n++) {
			let i = t.firstChild;
			if (t.childCount > 1 && (r = 0), i.type.spec.isolating && r <= n) {
				e = n;
				break;
			}
			t = i.content;
		}
		for (let t = 1; t <= 2; t++) for (let n = t == 1 ? e : this.unplaced.openStart; n >= 0; n--) {
			let e, r = null;
			n ? (r = _n(this.unplaced.content, n - 1).firstChild, e = r.content) : e = this.unplaced.content;
			let i = e.firstChild;
			for (let e = this.depth; e >= 0; e--) {
				let { type: a, match: o } = this.frontier[e], s, c = null;
				if (t == 1 && (i ? o.matchType(i.type) || (c = o.fillBefore(M.from(i), !1)) : r && a.compatibleContent(r.type))) return {
					sliceDepth: n,
					frontierDepth: e,
					parent: r,
					inject: c
				};
				if (t == 2 && i && (s = o.findWrapping(i.type))) return {
					sliceDepth: n,
					frontierDepth: e,
					parent: r,
					wrap: s
				};
				if (r && o.matchType(r.type)) break;
			}
		}
	}
	openMore() {
		let { content: e, openStart: t, openEnd: n } = this.unplaced, r = _n(e, t);
		return !r.childCount || r.firstChild.isLeaf ? !1 : (this.unplaced = new P(e, t + 1, Math.max(n, r.size + t >= e.size - n ? t + 1 : 0)), !0);
	}
	dropNode() {
		let { content: e, openStart: t, openEnd: n } = this.unplaced, r = _n(e, t);
		if (r.childCount <= 1 && t > 0) {
			let i = e.size - t <= t + r.size;
			this.unplaced = new P(hn(e, t - 1, 1), t - 1, i ? t - 1 : n);
		} else this.unplaced = new P(hn(e, t, 1), t, n);
	}
	placeNodes({ sliceDepth: e, frontierDepth: t, parent: n, inject: r, wrap: i }) {
		for (; this.depth > t;) this.closeFrontierNode();
		if (i) for (let e = 0; e < i.length; e++) this.openFrontierNode(i[e]);
		let a = this.unplaced, o = n ? n.content : a.content, s = a.openStart - e, c = 0, l = [], { match: u, type: d } = this.frontier[t];
		if (r) {
			for (let e = 0; e < r.childCount; e++) l.push(r.child(e));
			u = u.matchFragment(r);
		}
		let f = o.size + e - (a.content.size - a.openEnd);
		for (; c < o.childCount;) {
			let e = o.child(c), t = u.matchType(e.type);
			if (!t) break;
			c++, (c > 1 || s == 0 || e.content.size) && (u = t, l.push(vn(e.mark(d.allowedMarks(e.marks)), c == 1 ? s : 0, c == o.childCount ? f : -1)));
		}
		let p = c == o.childCount;
		p || (f = -1), this.placed = gn(this.placed, t, M.from(l)), this.frontier[t].match = u, p && f < 0 && n && n.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
		for (let e = 0, t = o; e < f; e++) {
			let e = t.lastChild;
			this.frontier.push({
				type: e.type,
				match: e.contentMatchAt(e.childCount)
			}), t = e.content;
		}
		this.unplaced = p ? e == 0 ? P.empty : new P(hn(a.content, e - 1, 1), e - 1, f < 0 ? a.openEnd : e - 1) : new P(hn(a.content, e, c), a.openStart, a.openEnd);
	}
	mustMoveInline() {
		if (!this.$to.parent.isTextblock) return -1;
		let e = this.frontier[this.depth], t;
		if (!e.type.isTextblock || !yn(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth) return -1;
		let { depth: n } = this.$to, r = this.$to.after(n);
		for (; n > 1 && r == this.$to.end(--n);) ++r;
		return r;
	}
	findCloseLevel(e) {
		scan: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
			let { match: n, type: r } = this.frontier[t], i = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), a = yn(e, t, r, n, i);
			if (a) {
				for (let n = t - 1; n >= 0; n--) {
					let { match: t, type: r } = this.frontier[n], i = yn(e, n, r, t, !0);
					if (!i || i.childCount) continue scan;
				}
				return {
					depth: t,
					fit: a,
					move: i ? e.doc.resolve(e.after(t + 1)) : e
				};
			}
		}
	}
	close(e) {
		let t = this.findCloseLevel(e);
		if (!t) return null;
		for (; this.depth > t.depth;) this.closeFrontierNode();
		t.fit.childCount && (this.placed = gn(this.placed, t.depth, t.fit)), e = t.move;
		for (let n = t.depth + 1; n <= e.depth; n++) {
			let t = e.node(n), r = t.type.contentMatch.fillBefore(t.content, !0, e.index(n));
			this.openFrontierNode(t.type, t.attrs, r);
		}
		return e;
	}
	openFrontierNode(e, t = null, n) {
		let r = this.frontier[this.depth];
		r.match = r.match.matchType(e), this.placed = gn(this.placed, this.depth, M.from(e.create(t, n))), this.frontier.push({
			type: e,
			match: e.contentMatch
		});
	}
	closeFrontierNode() {
		let e = this.frontier.pop().match.fillBefore(M.empty, !0);
		e.childCount && (this.placed = gn(this.placed, this.frontier.length, e));
	}
};
function hn(e, t, n) {
	return t == 0 ? e.cutByIndex(n, e.childCount) : e.replaceChild(0, e.firstChild.copy(hn(e.firstChild.content, t - 1, n)));
}
function gn(e, t, n) {
	return t == 0 ? e.append(n) : e.replaceChild(e.childCount - 1, e.lastChild.copy(gn(e.lastChild.content, t - 1, n)));
}
function _n(e, t) {
	for (let n = 0; n < t; n++) e = e.firstChild.content;
	return e;
}
function vn(e, t, n) {
	if (t <= 0) return e;
	let r = e.content;
	return t > 1 && (r = r.replaceChild(0, vn(r.firstChild, t - 1, r.childCount == 1 ? n - 1 : 0))), t > 0 && (r = e.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(e.type.contentMatch.matchFragment(r).fillBefore(M.empty, !0)))), e.copy(r);
}
function yn(e, t, n, r, i) {
	let a = e.node(t), o = i ? e.indexAfter(t) : e.index(t);
	if (o == a.childCount && !n.compatibleContent(a.type)) return null;
	let s = r.fillBefore(a.content, !0, o);
	return s && !bn(n, a.content, o) ? s : null;
}
function bn(e, t, n) {
	for (let r = n; r < t.childCount; r++) if (!e.allowsMarks(t.child(r).marks)) return !0;
	return !1;
}
function xn(e) {
	return e.spec.defining || e.spec.definingForContent;
}
function Sn(e, t, n, r) {
	if (!r.size) return e.deleteRange(t, n);
	let i = e.doc.resolve(t), a = e.doc.resolve(n);
	if (pn(i, a, r)) return e.step(new Lt(t, n, r));
	let o = En(i, a);
	o[o.length - 1] == 0 && o.pop();
	let s = -(i.depth + 1);
	o.unshift(s);
	for (let e = i.depth, t = i.pos - 1; e > 0; e--, t--) {
		let n = i.node(e).type.spec;
		if (n.defining || n.definingAsContext || n.isolating) break;
		o.indexOf(e) > -1 ? s = e : i.before(e) == t && o.splice(1, 0, -e);
	}
	let c = o.indexOf(s), l = [], u = r.openStart;
	for (let e = r.content, t = 0;; t++) {
		let n = e.firstChild;
		if (l.push(n), t == r.openStart) break;
		e = n.content;
	}
	for (let e = u - 1; e >= 0; e--) {
		let t = l[e], n = xn(t.type);
		if (n && !t.sameMarkup(i.node(Math.abs(s) - 1))) u = e;
		else if (n || !t.type.isTextblock) break;
	}
	for (let t = r.openStart; t >= 0; t--) {
		let s = (t + u + 1) % (r.openStart + 1), d = l[s];
		if (d) for (let t = 0; t < o.length; t++) {
			let l = o[(t + c) % o.length], u = !0;
			l < 0 && (u = !1, l = -l);
			let f = i.node(l - 1), p = i.index(l - 1);
			if (f.canReplaceWith(p, p, d.type, d.marks)) return e.replace(i.before(l), u ? a.after(l) : n, new P(Cn(r.content, 0, r.openStart, s), s, r.openEnd));
		}
	}
	let d = e.steps.length;
	for (let s = o.length - 1; s >= 0 && (e.replace(t, n, r), !(e.steps.length > d)); s--) {
		let e = o[s];
		e < 0 || (t = i.before(e), n = a.after(e));
	}
}
function Cn(e, t, n, r, i) {
	if (t < n) {
		let i = e.firstChild;
		e = e.replaceChild(0, i.copy(Cn(i.content, t + 1, n, r, i)));
	}
	if (t > r) {
		let t = i.contentMatchAt(0), n = t.fillBefore(e).append(e);
		e = n.append(t.matchFragment(n).fillBefore(M.empty, !0));
	}
	return e;
}
function wn(e, t, n, r) {
	if (!r.isInline && t == n && e.doc.resolve(t).parent.content.size) {
		let i = un(e.doc, t, r.type);
		i != null && (t = n = i);
	}
	e.replaceRange(t, n, new P(M.from(r), 0, 0));
}
function Tn(e, t, n) {
	let r = e.doc.resolve(t), i = e.doc.resolve(n);
	if (r.parent.isTextblock && i.parent.isTextblock && r.start() != i.start() && r.parentOffset == 0 && i.parentOffset == 0) {
		let a = r.sharedDepth(n), o = !1;
		for (let e = r.depth; e > a; e--) r.node(e).type.spec.isolating && (o = !0);
		for (let e = i.depth; e > a; e--) i.node(e).type.spec.isolating && (o = !0);
		if (!o) {
			for (let e = r.depth; e > 0 && t == r.start(e); e--) t = r.before(e);
			for (let e = i.depth; e > 0 && n == i.start(e); e--) n = i.before(e);
			r = e.doc.resolve(t), i = e.doc.resolve(n);
		}
	}
	let a = En(r, i);
	for (let t = 0; t < a.length; t++) {
		let n = a[t], o = t == a.length - 1;
		if (o && n == 0 || r.node(n).type.contentMatch.validEnd) return e.delete(r.start(n), i.end(n));
		if (n > 0 && (o || r.node(n - 1).canReplace(r.index(n - 1), i.indexAfter(n - 1)))) return e.delete(r.before(n), i.after(n));
	}
	for (let a = 1; a <= r.depth && a <= i.depth; a++) if (t - r.start(a) == r.depth - a && n > r.end(a) && i.end(a) - n != i.depth - a && r.start(a - 1) == i.start(a - 1) && r.node(a - 1).canReplace(r.index(a - 1), i.index(a - 1))) return e.delete(r.before(a), n);
	e.delete(t, n);
}
function En(e, t) {
	let n = [], r = Math.min(e.depth, t.depth);
	for (let i = r; i >= 0; i--) {
		let r = e.start(i);
		if (r < e.pos - (e.depth - i) || t.end(i) > t.pos + (t.depth - i) || e.node(i).type.spec.isolating || t.node(i).type.spec.isolating) break;
		(r == t.start(i) || i == e.depth && i == t.depth && e.parent.inlineContent && t.parent.inlineContent && i && t.start(i - 1) == r - 1) && n.push(i);
	}
	return n;
}
var Dn = class e extends F {
	constructor(e, t, n) {
		super(), this.pos = e, this.attr = t, this.value = n;
	}
	apply(e) {
		let t = e.nodeAt(this.pos);
		if (!t) return I.fail("No node at attribute step's position");
		let n = Object.create(null);
		for (let e in t.attrs) n[e] = t.attrs[e];
		n[this.attr] = this.value;
		let r = t.type.create(n, null, t.marks);
		return I.fromReplace(e, this.pos, this.pos + 1, new P(M.from(r), 0, +!t.isLeaf));
	}
	getMap() {
		return kt.empty;
	}
	invert(t) {
		return new e(this.pos, this.attr, t.nodeAt(this.pos).attrs[this.attr]);
	}
	map(t) {
		let n = t.mapResult(this.pos, 1);
		return n.deletedAfter ? null : new e(n.pos, this.attr, this.value);
	}
	toJSON() {
		return {
			stepType: "attr",
			pos: this.pos,
			attr: this.attr,
			value: this.value
		};
	}
	static fromJSON(t, n) {
		if (typeof n.pos != "number" || typeof n.attr != "string") throw RangeError("Invalid input for AttrStep.fromJSON");
		return new e(n.pos, n.attr, n.value);
	}
};
F.jsonID("attr", Dn);
var On = class e extends F {
	constructor(e, t) {
		super(), this.attr = e, this.value = t;
	}
	apply(e) {
		let t = Object.create(null);
		for (let n in e.attrs) t[n] = e.attrs[n];
		t[this.attr] = this.value;
		let n = e.type.create(t, e.content, e.marks);
		return I.ok(n);
	}
	getMap() {
		return kt.empty;
	}
	invert(t) {
		return new e(this.attr, t.attrs[this.attr]);
	}
	map(e) {
		return this;
	}
	toJSON() {
		return {
			stepType: "docAttr",
			attr: this.attr,
			value: this.value
		};
	}
	static fromJSON(t, n) {
		if (typeof n.attr != "string") throw RangeError("Invalid input for DocAttrStep.fromJSON");
		return new e(n.attr, n.value);
	}
};
F.jsonID("docAttr", On);
var kn = class extends Error {};
kn = function e(t) {
	let n = Error.call(this, t);
	return n.__proto__ = e.prototype, n;
}, kn.prototype = Object.create(Error.prototype), kn.prototype.constructor = kn, kn.prototype.name = "TransformError";
var An = class {
	constructor(e) {
		this.doc = e, this.steps = [], this.docs = [], this.mapping = new At();
	}
	get before() {
		return this.docs.length ? this.docs[0] : this.doc;
	}
	step(e) {
		let t = this.maybeStep(e);
		if (t.failed) throw new kn(t.failed);
		return this;
	}
	maybeStep(e) {
		let t = e.apply(this.doc);
		return t.failed || this.addStep(e, t.doc), t;
	}
	get docChanged() {
		return this.steps.length > 0;
	}
	changedRange() {
		let e = 1e9, t = -1e9;
		for (let n = 0; n < this.mapping.maps.length; n++) {
			let r = this.mapping.maps[n];
			n && (e = r.map(e, 1), t = r.map(t, -1)), r.forEach((n, r, i, a) => {
				e = Math.min(e, i), t = Math.max(t, a);
			});
		}
		return e == 1e9 ? null : {
			from: e,
			to: t
		};
	}
	addStep(e, t) {
		this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
	}
	replace(e, t = e, n = P.empty) {
		let r = fn(this.doc, e, t, n);
		return r && this.step(r), this;
	}
	replaceWith(e, t, n) {
		return this.replace(e, t, new P(M.from(n), 0, 0));
	}
	delete(e, t) {
		return this.replace(e, t, P.empty);
	}
	insert(e, t) {
		return this.replaceWith(e, e, t);
	}
	replaceRange(e, t, n) {
		return Sn(this, e, t, n), this;
	}
	replaceRangeWith(e, t, n) {
		return wn(this, e, t, n), this;
	}
	deleteRange(e, t) {
		return Tn(this, e, t), this;
	}
	lift(e, t) {
		return Gt(this, e, t), this;
	}
	join(e, t = 1) {
		return ln(this, e, t), this;
	}
	wrap(e, t) {
		return Xt(this, e, t), this;
	}
	setBlockType(e, t = e, n, r = null) {
		return Zt(this, e, t, n, r), this;
	}
	setNodeMarkup(e, t, n = null, r) {
		return tn(this, e, t, n, r), this;
	}
	setNodeAttribute(e, t, n) {
		return this.step(new Dn(e, t, n)), this;
	}
	setDocAttribute(e, t) {
		return this.step(new On(e, t)), this;
	}
	addNodeMark(e, t) {
		return this.step(new Ft(e, t)), this;
	}
	removeNodeMark(e, t) {
		let n = this.doc.nodeAt(e);
		if (!n) throw RangeError("No node at position " + e);
		if (t instanceof N) t.isInSet(n.marks) && this.step(new It(e, t));
		else {
			let r = n.marks, i, a = [];
			for (; i = t.isInSet(r);) a.push(new It(e, i)), r = i.removeFromSet(r);
			for (let e = a.length - 1; e >= 0; e--) this.step(a[e]);
		}
		return this;
	}
	split(e, t = 1, n) {
		return rn(this, e, t, n), this;
	}
	addMark(e, t, n) {
		return Bt(this, e, t, n), this;
	}
	removeMark(e, t, n) {
		return Vt(this, e, t, n), this;
	}
	clearIncompatible(e, t, n) {
		return Ht(this, e, t, n), this;
	}
}, jn = Object.create(null), L = class {
	constructor(e, t, n) {
		this.$anchor = e, this.$head = t, this.ranges = n || [new Mn(e.min(t), e.max(t))];
	}
	get anchor() {
		return this.$anchor.pos;
	}
	get head() {
		return this.$head.pos;
	}
	get from() {
		return this.$from.pos;
	}
	get to() {
		return this.$to.pos;
	}
	get $from() {
		return this.ranges[0].$from;
	}
	get $to() {
		return this.ranges[0].$to;
	}
	get empty() {
		let e = this.ranges;
		for (let t = 0; t < e.length; t++) if (e[t].$from.pos != e[t].$to.pos) return !1;
		return !0;
	}
	content() {
		return this.$from.doc.slice(this.from, this.to, !0);
	}
	replace(e, t = P.empty) {
		let n = t.content.lastChild, r = null;
		for (let e = 0; e < t.openEnd; e++) r = n, n = n.lastChild;
		let i = e.steps.length, a = this.ranges;
		for (let o = 0; o < a.length; o++) {
			let { $from: s, $to: c } = a[o], l = e.mapping.slice(i);
			e.replaceRange(l.map(s.pos), l.map(c.pos), o ? P.empty : t), o == 0 && Bn(e, i, (n ? n.isInline : r && r.isTextblock) ? -1 : 1);
		}
	}
	replaceWith(e, t) {
		let n = e.steps.length, r = this.ranges;
		for (let i = 0; i < r.length; i++) {
			let { $from: a, $to: o } = r[i], s = e.mapping.slice(n), c = s.map(a.pos), l = s.map(o.pos);
			i ? e.deleteRange(c, l) : (e.replaceRangeWith(c, l, t), Bn(e, n, t.isInline ? -1 : 1));
		}
	}
	static findFrom(e, t, n = !1) {
		let r = e.parent.inlineContent ? new R(e) : zn(e.node(0), e.parent, e.pos, e.index(), t, n);
		if (r) return r;
		for (let r = e.depth - 1; r >= 0; r--) {
			let i = t < 0 ? zn(e.node(0), e.node(r), e.before(r + 1), e.index(r), t, n) : zn(e.node(0), e.node(r), e.after(r + 1), e.index(r) + 1, t, n);
			if (i) return i;
		}
		return null;
	}
	static near(e, t = 1) {
		return this.findFrom(e, t) || this.findFrom(e, -t) || new Ln(e.node(0));
	}
	static atStart(e) {
		return zn(e, e, 0, 0, 1) || new Ln(e);
	}
	static atEnd(e) {
		return zn(e, e, e.content.size, e.childCount, -1) || new Ln(e);
	}
	static fromJSON(e, t) {
		if (!t || !t.type) throw RangeError("Invalid input for Selection.fromJSON");
		let n = jn[t.type];
		if (!n) throw RangeError(`No selection type ${t.type} defined`);
		return n.fromJSON(e, t);
	}
	static jsonID(e, t) {
		if (e in jn) throw RangeError("Duplicate use of selection JSON ID " + e);
		return jn[e] = t, t.prototype.jsonID = e, t;
	}
	getBookmark() {
		return R.between(this.$anchor, this.$head).getBookmark();
	}
};
L.prototype.visible = !0;
var Mn = class {
	constructor(e, t) {
		this.$from = e, this.$to = t;
	}
}, Nn = !1;
function Pn(e) {
	!Nn && !e.parent.inlineContent && (Nn = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + e.parent.type.name + ")"));
}
var R = class e extends L {
	constructor(e, t = e) {
		Pn(e), Pn(t), super(e, t);
	}
	get $cursor() {
		return this.$anchor.pos == this.$head.pos ? this.$head : null;
	}
	map(t, n) {
		let r = t.resolve(n.map(this.head));
		if (!r.parent.inlineContent) return L.near(r);
		let i = t.resolve(n.map(this.anchor));
		return new e(i.parent.inlineContent ? i : r, r);
	}
	replace(e, t = P.empty) {
		if (super.replace(e, t), t == P.empty) {
			let t = this.$from.marksAcross(this.$to);
			t && e.ensureMarks(t);
		}
	}
	eq(t) {
		return t instanceof e && t.anchor == this.anchor && t.head == this.head;
	}
	getBookmark() {
		return new Fn(this.anchor, this.head);
	}
	toJSON() {
		return {
			type: "text",
			anchor: this.anchor,
			head: this.head
		};
	}
	static fromJSON(t, n) {
		if (typeof n.anchor != "number" || typeof n.head != "number") throw RangeError("Invalid input for TextSelection.fromJSON");
		return new e(t.resolve(n.anchor), t.resolve(n.head));
	}
	static create(e, t, n = t) {
		let r = e.resolve(t);
		return new this(r, n == t ? r : e.resolve(n));
	}
	static between(t, n, r) {
		let i = t.pos - n.pos;
		if ((!r || i) && (r = i >= 0 ? 1 : -1), !n.parent.inlineContent) {
			let e = L.findFrom(n, r, !0) || L.findFrom(n, -r, !0);
			if (e) n = e.$head;
			else return L.near(n, r);
		}
		return t.parent.inlineContent || (i == 0 ? t = n : (t = (L.findFrom(t, -r, !0) || L.findFrom(t, r, !0)).$anchor, t.pos < n.pos != i < 0 && (t = n))), new e(t, n);
	}
};
L.jsonID("text", R);
var Fn = class e {
	constructor(e, t) {
		this.anchor = e, this.head = t;
	}
	map(t) {
		return new e(t.map(this.anchor), t.map(this.head));
	}
	resolve(e) {
		return R.between(e.resolve(this.anchor), e.resolve(this.head));
	}
}, z = class e extends L {
	constructor(e) {
		let t = e.nodeAfter, n = e.node(0).resolve(e.pos + t.nodeSize);
		super(e, n), this.node = t;
	}
	map(t, n) {
		let { deleted: r, pos: i } = n.mapResult(this.anchor), a = t.resolve(i);
		return r ? L.near(a) : new e(a);
	}
	content() {
		return new P(M.from(this.node), 0, 0);
	}
	eq(t) {
		return t instanceof e && t.anchor == this.anchor;
	}
	toJSON() {
		return {
			type: "node",
			anchor: this.anchor
		};
	}
	getBookmark() {
		return new In(this.anchor);
	}
	static fromJSON(t, n) {
		if (typeof n.anchor != "number") throw RangeError("Invalid input for NodeSelection.fromJSON");
		return new e(t.resolve(n.anchor));
	}
	static create(t, n) {
		return new e(t.resolve(n));
	}
	static isSelectable(e) {
		return !e.isText && e.type.spec.selectable !== !1;
	}
};
z.prototype.visible = !1, L.jsonID("node", z);
var In = class e {
	constructor(e) {
		this.anchor = e;
	}
	map(t) {
		let { deleted: n, pos: r } = t.mapResult(this.anchor);
		return n ? new Fn(r, r) : new e(r);
	}
	resolve(e) {
		let t = e.resolve(this.anchor), n = t.nodeAfter;
		return n && z.isSelectable(n) ? new z(t) : L.near(t);
	}
}, Ln = class e extends L {
	constructor(e) {
		super(e.resolve(0), e.resolve(e.content.size));
	}
	replace(e, t = P.empty) {
		if (t == P.empty) {
			e.delete(0, e.doc.content.size);
			let t = L.atStart(e.doc);
			t.eq(e.selection) || e.setSelection(t);
		} else super.replace(e, t);
	}
	toJSON() {
		return { type: "all" };
	}
	static fromJSON(t) {
		return new e(t);
	}
	map(t) {
		return new e(t);
	}
	eq(t) {
		return t instanceof e;
	}
	getBookmark() {
		return Rn;
	}
};
L.jsonID("all", Ln);
var Rn = {
	map() {
		return this;
	},
	resolve(e) {
		return new Ln(e);
	}
};
function zn(e, t, n, r, i, a = !1) {
	if (t.inlineContent) return R.create(e, n);
	for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < t.childCount : o >= 0; o += i) {
		let r = t.child(o);
		if (!r.isAtom) {
			let t = zn(e, r, n + i, i < 0 ? r.childCount : 0, i, a);
			if (t) return t;
		} else if (!a && z.isSelectable(r)) return z.create(e, n - (i < 0 ? r.nodeSize : 0));
		n += r.nodeSize * i;
	}
	return null;
}
function Bn(e, t, n) {
	let r = e.steps.length - 1;
	if (r < t) return;
	let i = e.steps[r];
	if (!(i instanceof Lt || i instanceof Rt)) return;
	let a = e.mapping.maps[r], o;
	a.forEach((e, t, n, r) => {
		o ??= r;
	}), e.setSelection(L.near(e.doc.resolve(o), n));
}
var Vn = 1, Hn = 2, Un = 4, Wn = class extends An {
	constructor(e) {
		super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
	}
	get selection() {
		return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
	}
	setSelection(e) {
		if (e.$from.doc != this.doc) throw RangeError("Selection passed to setSelection must point at the current document");
		return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Vn) & -3, this.storedMarks = null, this;
	}
	get selectionSet() {
		return (this.updated & Vn) > 0;
	}
	setStoredMarks(e) {
		return this.storedMarks = e, this.updated |= Hn, this;
	}
	ensureMarks(e) {
		return N.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
	}
	addStoredMark(e) {
		return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
	}
	removeStoredMark(e) {
		return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
	}
	get storedMarksSet() {
		return (this.updated & Hn) > 0;
	}
	addStep(e, t) {
		super.addStep(e, t), this.updated &= -3, this.storedMarks = null;
	}
	setTime(e) {
		return this.time = e, this;
	}
	replaceSelection(e) {
		return this.selection.replace(this, e), this;
	}
	replaceSelectionWith(e, t = !0) {
		let n = this.selection;
		return t && (e = e.mark(this.storedMarks || (n.empty ? n.$from.marks() : n.$from.marksAcross(n.$to) || N.none))), n.replaceWith(this, e), this;
	}
	deleteSelection() {
		return this.selection.replace(this), this;
	}
	insertText(e, t, n) {
		let r = this.doc.type.schema;
		if (t == null) return e ? this.replaceSelectionWith(r.text(e), !0) : this.deleteSelection();
		{
			if (n ??= t, !e) return this.deleteRange(t, n);
			let i = this.storedMarks;
			if (!i) {
				let e = this.doc.resolve(t);
				i = n == t ? e.marks() : e.marksAcross(this.doc.resolve(n));
			}
			return this.replaceRangeWith(t, n, r.text(e, i)), !this.selection.empty && this.selection.to == t + e.length && this.setSelection(L.near(this.selection.$to)), this;
		}
	}
	setMeta(e, t) {
		return this.meta[typeof e == "string" ? e : e.key] = t, this;
	}
	getMeta(e) {
		return this.meta[typeof e == "string" ? e : e.key];
	}
	get isGeneric() {
		for (let e in this.meta) return !1;
		return !0;
	}
	scrollIntoView() {
		return this.updated |= Un, this;
	}
	get scrolledIntoView() {
		return (this.updated & Un) > 0;
	}
};
function Gn(e, t) {
	return !t || !e ? e : e.bind(t);
}
var Kn = class {
	constructor(e, t, n) {
		this.name = e, this.init = Gn(t.init, n), this.apply = Gn(t.apply, n);
	}
}, qn = [
	new Kn("doc", {
		init(e) {
			return e.doc || e.schema.topNodeType.createAndFill();
		},
		apply(e) {
			return e.doc;
		}
	}),
	new Kn("selection", {
		init(e, t) {
			return e.selection || L.atStart(t.doc);
		},
		apply(e) {
			return e.selection;
		}
	}),
	new Kn("storedMarks", {
		init(e) {
			return e.storedMarks || null;
		},
		apply(e, t, n, r) {
			return r.selection.$cursor ? e.storedMarks : null;
		}
	}),
	new Kn("scrollToSelection", {
		init() {
			return 0;
		},
		apply(e, t) {
			return e.scrolledIntoView ? t + 1 : t;
		}
	})
], Jn = class {
	constructor(e, t) {
		this.schema = e, this.plugins = [], this.pluginsByKey = Object.create(null), this.fields = qn.slice(), t && t.forEach((e) => {
			if (this.pluginsByKey[e.key]) throw RangeError("Adding different instances of a keyed plugin (" + e.key + ")");
			this.plugins.push(e), this.pluginsByKey[e.key] = e, e.spec.state && this.fields.push(new Kn(e.key, e.spec.state, e));
		});
	}
}, Yn = class e {
	constructor(e) {
		this.config = e;
	}
	get schema() {
		return this.config.schema;
	}
	get plugins() {
		return this.config.plugins;
	}
	apply(e) {
		return this.applyTransaction(e).state;
	}
	filterTransaction(e, t = -1) {
		for (let n = 0; n < this.config.plugins.length; n++) if (n != t) {
			let t = this.config.plugins[n];
			if (t.spec.filterTransaction && !t.spec.filterTransaction.call(t, e, this)) return !1;
		}
		return !0;
	}
	applyTransaction(e) {
		if (!this.filterTransaction(e)) return {
			state: this,
			transactions: []
		};
		let t = [e], n = this.applyInner(e), r = null;
		for (;;) {
			let i = !1;
			for (let a = 0; a < this.config.plugins.length; a++) {
				let o = this.config.plugins[a];
				if (o.spec.appendTransaction) {
					let s = r ? r[a].n : 0, c = r ? r[a].state : this, l = s < t.length && o.spec.appendTransaction.call(o, s ? t.slice(s) : t, c, n);
					if (l && n.filterTransaction(l, a)) {
						if (l.setMeta("appendedTransaction", e), !r) {
							r = [];
							for (let e = 0; e < this.config.plugins.length; e++) r.push(e < a ? {
								state: n,
								n: t.length
							} : {
								state: this,
								n: 0
							});
						}
						t.push(l), n = n.applyInner(l), i = !0;
					}
					r && (r[a] = {
						state: n,
						n: t.length
					});
				}
			}
			if (!i) return {
				state: n,
				transactions: t
			};
		}
	}
	applyInner(t) {
		if (!t.before.eq(this.doc)) throw RangeError("Applying a mismatched transaction");
		let n = new e(this.config), r = this.config.fields;
		for (let e = 0; e < r.length; e++) {
			let i = r[e];
			n[i.name] = i.apply(t, this[i.name], this, n);
		}
		return n;
	}
	get tr() {
		return new Wn(this);
	}
	static create(t) {
		let n = new Jn(t.doc ? t.doc.type.schema : t.schema, t.plugins), r = new e(n);
		for (let e = 0; e < n.fields.length; e++) r[n.fields[e].name] = n.fields[e].init(t, r);
		return r;
	}
	reconfigure(t) {
		let n = new Jn(this.schema, t.plugins), r = n.fields, i = new e(n);
		for (let e = 0; e < r.length; e++) {
			let n = r[e].name;
			i[n] = this.hasOwnProperty(n) ? this[n] : r[e].init(t, i);
		}
		return i;
	}
	toJSON(e) {
		let t = {
			doc: this.doc.toJSON(),
			selection: this.selection.toJSON()
		};
		if (this.storedMarks && (t.storedMarks = this.storedMarks.map((e) => e.toJSON())), e && typeof e == "object") for (let n in e) {
			if (n == "doc" || n == "selection") throw RangeError("The JSON fields `doc` and `selection` are reserved");
			let r = e[n], i = r.spec.state;
			i && i.toJSON && (t[n] = i.toJSON.call(r, this[r.key]));
		}
		return t;
	}
	static fromJSON(t, n, r) {
		if (!n) throw RangeError("Invalid input for EditorState.fromJSON");
		if (!t.schema) throw RangeError("Required config field 'schema' missing");
		let i = new Jn(t.schema, t.plugins), a = new e(i);
		return i.fields.forEach((e) => {
			if (e.name == "doc") a.doc = Ce.fromJSON(t.schema, n.doc);
			else if (e.name == "selection") a.selection = L.fromJSON(a.doc, n.selection);
			else if (e.name == "storedMarks") n.storedMarks && (a.storedMarks = n.storedMarks.map(t.schema.markFromJSON));
			else {
				if (r) for (let i in r) {
					let o = r[i], s = o.spec.state;
					if (o.key == e.name && s && s.fromJSON && Object.prototype.hasOwnProperty.call(n, i)) {
						a[e.name] = s.fromJSON.call(o, t, n[i], a);
						return;
					}
				}
				a[e.name] = e.init(t, a);
			}
		}), a;
	}
};
function Xn(e, t, n) {
	for (let r in e) {
		let i = e[r];
		i instanceof Function ? i = i.bind(t) : r == "handleDOMEvents" && (i = Xn(i, t, {})), n[r] = i;
	}
	return n;
}
var B = class {
	constructor(e) {
		this.spec = e, this.props = {}, e.props && Xn(e.props, this, this.props), this.key = e.key ? e.key.key : Qn("plugin");
	}
	getState(e) {
		return e[this.key];
	}
}, Zn = Object.create(null);
function Qn(e) {
	return e in Zn ? e + "$" + ++Zn[e] : (Zn[e] = 0, e + "$");
}
var $n = class {
	constructor(e = "key") {
		this.key = Qn(e);
	}
	get(e) {
		return e.config.pluginsByKey[this.key];
	}
	getState(e) {
		return e[this.key];
	}
}, V = function(e) {
	for (var t = 0;; t++) if (e = e.previousSibling, !e) return t;
}, er = function(e) {
	let t = e.assignedSlot || e.parentNode;
	return t && t.nodeType == 11 ? t.host : t;
}, tr = null, nr = function(e, t, n) {
	let r = tr ||= document.createRange();
	return r.setEnd(e, n ?? e.nodeValue.length), r.setStart(e, t || 0), r;
}, rr = function() {
	tr = null;
}, ir = function(e, t, n, r) {
	return n && (or(e, t, n, r, -1) || or(e, t, n, r, 1));
}, ar = /^(img|br|input|textarea|hr)$/i;
function or(e, t, n, r, i) {
	for (;;) {
		if (e == n && t == r) return !0;
		if (t == (i < 0 ? 0 : sr(e))) {
			let n = e.parentNode;
			if (!n || n.nodeType != 1 || dr(e) || ar.test(e.nodeName) || e.contentEditable == "false") return !1;
			t = V(e) + (i < 0 ? 0 : 1), e = n;
		} else if (e.nodeType == 1) {
			let n = e.childNodes[t + (i < 0 ? -1 : 0)];
			if (n.nodeType == 1 && n.contentEditable == "false") if (n.pmViewDesc?.ignoreForSelection) t += i;
			else return !1;
			else e = n, t = i < 0 ? sr(e) : 0;
		} else return !1;
	}
}
function sr(e) {
	return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length;
}
function cr(e, t) {
	for (;;) {
		if (e.nodeType == 3 && t) return e;
		if (e.nodeType == 1 && t > 0) {
			if (e.contentEditable == "false") return null;
			e = e.childNodes[t - 1], t = sr(e);
		} else if (e.parentNode && !dr(e)) t = V(e), e = e.parentNode;
		else return null;
	}
}
function lr(e, t) {
	for (;;) {
		if (e.nodeType == 3 && t < e.nodeValue.length) return e;
		if (e.nodeType == 1 && t < e.childNodes.length) {
			if (e.contentEditable == "false") return null;
			e = e.childNodes[t], t = 0;
		} else if (e.parentNode && !dr(e)) t = V(e) + 1, e = e.parentNode;
		else return null;
	}
}
function ur(e, t, n) {
	for (let r = t == 0, i = t == sr(e); r || i;) {
		if (e == n) return !0;
		let t = V(e);
		if (e = e.parentNode, !e) return !1;
		r &&= t == 0, i &&= t == sr(e);
	}
}
function dr(e) {
	let t;
	for (let n = e; n && !(t = n.pmViewDesc); n = n.parentNode);
	return t && t.node && t.node.isBlock && (t.dom == e || t.contentDOM == e);
}
var fr = function(e) {
	return e.focusNode && ir(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset);
};
function pr(e, t) {
	let n = document.createEvent("Event");
	return n.initEvent("keydown", !0, !0), n.keyCode = e, n.key = n.code = t, n;
}
function mr(e) {
	let t = e.activeElement;
	for (; t && t.shadowRoot;) t = t.shadowRoot.activeElement;
	return t;
}
function hr(e, t, n) {
	if (e.caretPositionFromPoint) try {
		let r = e.caretPositionFromPoint(t, n);
		if (r) return {
			node: r.offsetNode,
			offset: Math.min(sr(r.offsetNode), r.offset)
		};
	} catch {}
	if (e.caretRangeFromPoint) {
		let r = e.caretRangeFromPoint(t, n);
		if (r) return {
			node: r.startContainer,
			offset: Math.min(sr(r.startContainer), r.startOffset)
		};
	}
}
var gr = typeof navigator < "u" ? navigator : null, _r = typeof document < "u" ? document : null, vr = gr && gr.userAgent || "", yr = /Edge\/(\d+)/.exec(vr), br = /MSIE \d/.exec(vr), xr = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(vr), Sr = !!(br || xr || yr), Cr = br ? document.documentMode : xr ? +xr[1] : yr ? +yr[1] : 0, wr = !Sr && /gecko\/(\d+)/i.test(vr);
wr && +(/Firefox\/(\d+)/.exec(vr) || [0, 0])[1];
var Tr = !Sr && /Chrome\/(\d+)/.exec(vr), H = !!Tr, Er = Tr ? +Tr[1] : 0, U = !Sr && !!gr && /Apple Computer/.test(gr.vendor), Dr = U && (/Mobile\/\w+/.test(vr) || !!gr && gr.maxTouchPoints > 2), Or = Dr || (gr ? /Mac/.test(gr.platform) : !1), kr = gr ? /Win/.test(gr.platform) : !1, Ar = /Android \d/.test(vr), jr = !!_r && "webkitFontSmoothing" in _r.documentElement.style, Mr = jr ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Nr(e) {
	let t = e.defaultView && e.defaultView.visualViewport;
	return t ? {
		left: 0,
		right: t.width,
		top: 0,
		bottom: t.height
	} : {
		left: 0,
		right: e.documentElement.clientWidth,
		top: 0,
		bottom: e.documentElement.clientHeight
	};
}
function Pr(e, t) {
	return typeof e == "number" ? e : e[t];
}
function Fr(e) {
	let t = e.getBoundingClientRect(), n = t.width / e.offsetWidth || 1, r = t.height / e.offsetHeight || 1;
	return {
		left: t.left,
		right: t.left + e.clientWidth * n,
		top: t.top,
		bottom: t.top + e.clientHeight * r
	};
}
function Ir(e, t, n) {
	let r = e.someProp("scrollThreshold") || 0, i = e.someProp("scrollMargin") || 5, a = e.dom.ownerDocument;
	for (let o = n || e.dom; o;) {
		if (o.nodeType != 1) {
			o = er(o);
			continue;
		}
		let e = o, n = e == a.body, s = n ? Nr(a) : Fr(e), c = 0, l = 0;
		if (t.top < s.top + Pr(r, "top") ? l = -(s.top - t.top + Pr(i, "top")) : t.bottom > s.bottom - Pr(r, "bottom") && (l = t.bottom - t.top > s.bottom - s.top ? t.top + Pr(i, "top") - s.top : t.bottom - s.bottom + Pr(i, "bottom")), t.left < s.left + Pr(r, "left") ? c = -(s.left - t.left + Pr(i, "left")) : t.right > s.right - Pr(r, "right") && (c = t.right - s.right + Pr(i, "right")), c || l) if (n) a.defaultView.scrollBy(c, l);
		else {
			let n = e.scrollLeft, r = e.scrollTop;
			l && (e.scrollTop += l), c && (e.scrollLeft += c);
			let i = e.scrollLeft - n, a = e.scrollTop - r;
			t = {
				left: t.left - i,
				top: t.top - a,
				right: t.right - i,
				bottom: t.bottom - a
			};
		}
		let u = n ? "fixed" : getComputedStyle(o).position;
		if (/^(fixed|sticky)$/.test(u)) break;
		o = u == "absolute" ? o.offsetParent : er(o);
	}
}
function Lr(e) {
	let t = e.dom.getBoundingClientRect(), n = Math.max(0, t.top), r, i;
	for (let a = (t.left + t.right) / 2, o = n + 1; o < Math.min(innerHeight, t.bottom); o += 5) {
		let t = e.root.elementFromPoint(a, o);
		if (!t || t == e.dom || !e.dom.contains(t)) continue;
		let s = t.getBoundingClientRect();
		if (s.top >= n - 20) {
			r = t, i = s.top;
			break;
		}
	}
	return {
		refDOM: r,
		refTop: i,
		stack: Rr(e.dom)
	};
}
function Rr(e) {
	let t = [], n = e.ownerDocument;
	for (let r = e; r && (t.push({
		dom: r,
		top: r.scrollTop,
		left: r.scrollLeft
	}), e != n); r = er(r));
	return t;
}
function zr({ refDOM: e, refTop: t, stack: n }) {
	let r = e ? e.getBoundingClientRect().top : 0;
	Br(n, r == 0 ? 0 : r - t);
}
function Br(e, t) {
	for (let n = 0; n < e.length; n++) {
		let { dom: r, top: i, left: a } = e[n];
		r.scrollTop != i + t && (r.scrollTop = i + t), r.scrollLeft != a && (r.scrollLeft = a);
	}
}
var Vr = null;
function Hr(e) {
	if (e.setActive) return e.setActive();
	if (Vr) return e.focus(Vr);
	let t = Rr(e);
	e.focus(Vr == null ? { get preventScroll() {
		return Vr = { preventScroll: !0 }, !0;
	} } : void 0), Vr || (Vr = !1, Br(t, 0));
}
function Ur(e, t) {
	let n, r = 2e8, i, a = 0, o = t.top, s = t.top, c, l;
	for (let u = e.firstChild, d = 0; u; u = u.nextSibling, d++) {
		let e;
		if (u.nodeType == 1) e = u.getClientRects();
		else if (u.nodeType == 3) e = nr(u).getClientRects();
		else continue;
		for (let f = 0; f < e.length; f++) {
			let p = e[f];
			if (p.top <= o && p.bottom >= s) {
				o = Math.max(p.bottom, o), s = Math.min(p.top, s);
				let e = p.left > t.left ? p.left - t.left : p.right < t.left ? t.left - p.right : 0;
				if (e < r) {
					n = u, r = e, i = e && n.nodeType == 3 ? {
						left: p.right < t.left ? p.right : p.left,
						top: t.top
					} : t, u.nodeType == 1 && e && (a = d + +(t.left >= (p.left + p.right) / 2));
					continue;
				}
			} else p.top > t.top && !c && p.left <= t.left && p.right >= t.left && (c = u, l = {
				left: Math.max(p.left, Math.min(p.right, t.left)),
				top: p.top
			});
			!n && (t.left >= p.right && t.top >= p.top || t.left >= p.left && t.top >= p.bottom) && (a = d + 1);
		}
	}
	return !n && c && (n = c, i = l, r = 0), n && n.nodeType == 3 ? Wr(n, i) : !n || r && n.nodeType == 1 ? {
		node: e,
		offset: a
	} : Ur(n, i);
}
function Wr(e, t) {
	let n = e.nodeValue.length, r = document.createRange(), i;
	for (let a = 0; a < n; a++) {
		r.setEnd(e, a + 1), r.setStart(e, a);
		let n = Qr(r, 1);
		if (n.top != n.bottom && Gr(t, n)) {
			i = {
				node: e,
				offset: a + +(t.left >= (n.left + n.right) / 2)
			};
			break;
		}
	}
	return r.detach(), i || {
		node: e,
		offset: 0
	};
}
function Gr(e, t) {
	return e.left >= t.left - 1 && e.left <= t.right + 1 && e.top >= t.top - 1 && e.top <= t.bottom + 1;
}
function Kr(e, t) {
	let n = e.parentNode;
	return n && /^li$/i.test(n.nodeName) && t.left < e.getBoundingClientRect().left ? n : e;
}
function qr(e, t, n) {
	let { node: r, offset: i } = Ur(t, n), a = -1;
	if (r.nodeType == 1 && !r.firstChild) {
		let e = r.getBoundingClientRect();
		a = e.left != e.right && n.left > (e.left + e.right) / 2 ? 1 : -1;
	}
	return e.docView.posFromDOM(r, i, a);
}
function Jr(e, t, n, r) {
	let i = -1;
	for (let n = t, a = !1; n != e.dom;) {
		let t = e.docView.nearestDesc(n, !0), o;
		if (!t) return null;
		if (t.dom.nodeType == 1 && (t.node.isBlock && t.parent || !t.contentDOM) && ((o = t.dom.getBoundingClientRect()).width || o.height) && (t.node.isBlock && t.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(t.dom.nodeName) && (!a && o.left > r.left || o.top > r.top ? i = t.posBefore : (!a && o.right < r.left || o.bottom < r.top) && (i = t.posAfter), a = !0), !t.contentDOM && i < 0 && !t.node.isText)) return (t.node.isBlock ? r.top < (o.top + o.bottom) / 2 : r.left < (o.left + o.right) / 2) ? t.posBefore : t.posAfter;
		n = t.dom.parentNode;
	}
	return i > -1 ? i : e.docView.posFromDOM(t, n, -1);
}
function Yr(e, t, n) {
	let r = e.childNodes.length;
	if (r && n.top < n.bottom) for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (t.top - n.top) / (n.bottom - n.top)) - 2)), a = i;;) {
		let n = e.childNodes[a];
		if (n.nodeType == 1) {
			let e = n.getClientRects();
			for (let r = 0; r < e.length; r++) {
				let i = e[r];
				if (Gr(t, i)) return Yr(n, t, i);
			}
		}
		if ((a = (a + 1) % r) == i) break;
	}
	return e;
}
function Xr(e, t) {
	let n = e.dom.ownerDocument, r, i = 0, a = hr(n, t.left, t.top);
	a && ({node: r, offset: i} = a);
	let o = (e.root.elementFromPoint ? e.root : n).elementFromPoint(t.left, t.top), s;
	if (!o || !e.dom.contains(o.nodeType == 1 ? o : o.parentNode)) {
		let n = e.dom.getBoundingClientRect();
		if (!Gr(t, n) || (o = Yr(e.dom, t, n), !o)) return null;
	}
	if (U) for (let e = o; r && e; e = er(e)) e.draggable && (r = void 0);
	if (o = Kr(o, t), r) {
		if (wr && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
			let e = r.childNodes[i], n;
			e.nodeName == "IMG" && (n = e.getBoundingClientRect()).right <= t.left && n.bottom > t.top && i++;
		}
		let n;
		jr && i && r.nodeType == 1 && (n = r.childNodes[i - 1]).nodeType == 1 && n.contentEditable == "false" && n.getBoundingClientRect().top >= t.top && i--, r == e.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && t.top > r.lastChild.getBoundingClientRect().bottom ? s = e.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (s = Jr(e, r, i, t));
	}
	s ??= qr(e, o, t);
	let c = e.docView.nearestDesc(o, !0);
	return {
		pos: s,
		inside: c ? c.posAtStart - c.border : -1
	};
}
function Zr(e) {
	return e.top < e.bottom || e.left < e.right;
}
function Qr(e, t) {
	let n = e.getClientRects();
	if (n.length) {
		let e = n[t < 0 ? 0 : n.length - 1];
		if (Zr(e)) return e;
	}
	return Array.prototype.find.call(n, Zr) || e.getBoundingClientRect();
}
var $r = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function ei(e, t, n) {
	let { node: r, offset: i, atom: a } = e.docView.domFromPos(t, n < 0 ? -1 : 1), o = jr || wr;
	if (r.nodeType == 3) if (o && ($r.test(r.nodeValue) || (n < 0 ? !i : i == r.nodeValue.length))) {
		let e = Qr(nr(r, i, i), n);
		if (wr && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
			let t = Qr(nr(r, i - 1, i - 1), -1);
			if (t.top == e.top) {
				let n = Qr(nr(r, i, i + 1), -1);
				if (n.top != e.top) return ti(n, n.left < t.left);
			}
		}
		return e;
	} else {
		let e = i, t = i, a = n < 0 ? 1 : -1;
		return n < 0 && !i ? (t++, a = -1) : n >= 0 && i == r.nodeValue.length ? (e--, a = 1) : n < 0 ? e-- : t++, ti(Qr(nr(r, e, t), a), a < 0);
	}
	if (!e.state.doc.resolve(t - (a || 0)).parent.inlineContent) {
		if (a == null && i && (n < 0 || i == sr(r))) {
			let e = r.childNodes[i - 1];
			if (e.nodeType == 1) return ni(e.getBoundingClientRect(), !1);
		}
		if (a == null && i < sr(r)) {
			let e = r.childNodes[i];
			if (e.nodeType == 1) return ni(e.getBoundingClientRect(), !0);
		}
		return ni(r.getBoundingClientRect(), n >= 0);
	}
	if (a == null && i && (n < 0 || i == sr(r))) {
		let e = r.childNodes[i - 1], t = e.nodeType == 3 ? nr(e, sr(e) - +!o) : e.nodeType == 1 && (e.nodeName != "BR" || !e.nextSibling) ? e : null;
		if (t) return ti(Qr(t, 1), !1);
	}
	if (a == null && i < sr(r)) {
		let e = r.childNodes[i];
		for (; e.pmViewDesc && e.pmViewDesc.ignoreForCoords;) e = e.nextSibling;
		let t = e ? e.nodeType == 3 ? nr(e, 0, +!o) : e.nodeType == 1 ? e : null : null;
		if (t) return ti(Qr(t, -1), !0);
	}
	return ti(Qr(r.nodeType == 3 ? nr(r) : r, -n), n >= 0);
}
function ti(e, t) {
	if (e.width == 0) return e;
	let n = t ? e.left : e.right;
	return {
		top: e.top,
		bottom: e.bottom,
		left: n,
		right: n
	};
}
function ni(e, t) {
	if (e.height == 0) return e;
	let n = t ? e.top : e.bottom;
	return {
		top: n,
		bottom: n,
		left: e.left,
		right: e.right
	};
}
function ri(e, t, n) {
	let r = e.state, i = e.root.activeElement;
	r != t && e.updateState(t), i != e.dom && e.focus();
	try {
		return n();
	} finally {
		r != t && e.updateState(r), i != e.dom && i && i.focus();
	}
}
function ii(e, t, n) {
	let r = t.selection, i = n == "up" ? r.$from : r.$to;
	return ri(e, t, () => {
		let { node: t } = e.docView.domFromPos(i.pos, n == "up" ? -1 : 1);
		for (;;) {
			let n = e.docView.nearestDesc(t, !0);
			if (!n) break;
			if (n.node.isBlock) {
				t = n.contentDOM || n.dom;
				break;
			}
			t = n.dom.parentNode;
		}
		let r = ei(e, i.pos, 1);
		for (let e = t.firstChild; e; e = e.nextSibling) {
			let t;
			if (e.nodeType == 1) t = e.getClientRects();
			else if (e.nodeType == 3) t = nr(e, 0, e.nodeValue.length).getClientRects();
			else continue;
			for (let e = 0; e < t.length; e++) {
				let i = t[e];
				if (i.bottom > i.top + 1 && (n == "up" ? r.top - i.top > (i.bottom - r.top) * 2 : i.bottom - r.bottom > (r.bottom - i.top) * 2)) return !1;
			}
		}
		return !0;
	});
}
var ai = /[\u0590-\u08ac]/;
function oi(e, t, n) {
	let { $head: r } = t.selection;
	if (!r.parent.isTextblock) return !1;
	let i = r.parentOffset, a = !i, o = i == r.parent.content.size, s = e.domSelection();
	return s ? !ai.test(r.parent.textContent) || !s.modify ? n == "left" || n == "backward" ? a : o : ri(e, t, () => {
		let { focusNode: t, focusOffset: i, anchorNode: a, anchorOffset: o } = e.domSelectionRange(), c = s.caretBidiLevel;
		s.modify("move", n, "character");
		let l = r.depth ? e.docView.domAfterPos(r.before()) : e.dom, { focusNode: u, focusOffset: d } = e.domSelectionRange(), f = u && !l.contains(u.nodeType == 1 ? u : u.parentNode) || t == u && i == d;
		try {
			s.collapse(a, o), t && (t != a || i != o) && s.extend && s.extend(t, i);
		} catch {}
		return c != null && (s.caretBidiLevel = c), f;
	}) : r.pos == r.start() || r.pos == r.end();
}
var si = null, ci = null, li = !1;
function ui(e, t, n) {
	return si == t && ci == n ? li : (si = t, ci = n, li = n == "up" || n == "down" ? ii(e, t, n) : oi(e, t, n));
}
var di = 0, fi = 1, pi = 2, mi = 3, hi = class {
	constructor(e, t, n, r) {
		this.parent = e, this.children = t, this.dom = n, this.contentDOM = r, this.dirty = di, n.pmViewDesc = this;
	}
	matchesWidget(e) {
		return !1;
	}
	matchesMark(e) {
		return !1;
	}
	matchesNode(e, t, n) {
		return !1;
	}
	matchesHack(e) {
		return !1;
	}
	parseRule() {
		return null;
	}
	stopEvent(e) {
		return !1;
	}
	get size() {
		let e = 0;
		for (let t = 0; t < this.children.length; t++) e += this.children[t].size;
		return e;
	}
	get border() {
		return 0;
	}
	destroy() {
		this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
		for (let e = 0; e < this.children.length; e++) this.children[e].destroy();
	}
	posBeforeChild(e) {
		for (let t = 0, n = this.posAtStart;; t++) {
			let r = this.children[t];
			if (r == e) return n;
			n += r.size;
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
	localPosFromDOM(e, t, n) {
		if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode)) if (n < 0) {
			let n, r;
			if (e == this.contentDOM) n = e.childNodes[t - 1];
			else {
				for (; e.parentNode != this.contentDOM;) e = e.parentNode;
				n = e.previousSibling;
			}
			for (; n && !((r = n.pmViewDesc) && r.parent == this);) n = n.previousSibling;
			return n ? this.posBeforeChild(r) + r.size : this.posAtStart;
		} else {
			let n, r;
			if (e == this.contentDOM) n = e.childNodes[t];
			else {
				for (; e.parentNode != this.contentDOM;) e = e.parentNode;
				n = e.nextSibling;
			}
			for (; n && !((r = n.pmViewDesc) && r.parent == this);) n = n.nextSibling;
			return n ? this.posBeforeChild(r) : this.posAtEnd;
		}
		let r;
		if (e == this.dom && this.contentDOM) r = t > V(this.contentDOM);
		else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) r = e.compareDocumentPosition(this.contentDOM) & 2;
		else if (this.dom.firstChild) {
			if (t == 0) for (let t = e;; t = t.parentNode) {
				if (t == this.dom) {
					r = !1;
					break;
				}
				if (t.previousSibling) break;
			}
			if (r == null && t == e.childNodes.length) for (let t = e;; t = t.parentNode) {
				if (t == this.dom) {
					r = !0;
					break;
				}
				if (t.nextSibling) break;
			}
		}
		return r ?? n > 0 ? this.posAtEnd : this.posAtStart;
	}
	nearestDesc(e, t = !1) {
		for (let n = !0, r = e; r; r = r.parentNode) {
			let i = this.getDesc(r), a;
			if (i && (!t || i.node)) if (n && (a = i.nodeDOM) && !(a.nodeType == 1 ? a.contains(e.nodeType == 1 ? e : e.parentNode) : a == e)) n = !1;
			else return i;
		}
	}
	getDesc(e) {
		let t = e.pmViewDesc;
		for (let e = t; e; e = e.parent) if (e == this) return t;
	}
	posFromDOM(e, t, n) {
		for (let r = e; r; r = r.parentNode) {
			let i = this.getDesc(r);
			if (i) return i.localPosFromDOM(e, t, n);
		}
		return -1;
	}
	descAt(e) {
		for (let t = 0, n = 0; t < this.children.length; t++) {
			let r = this.children[t], i = n + r.size;
			if (n == e && i != n) {
				for (; !r.border && r.children.length;) for (let e = 0; e < r.children.length; e++) {
					let t = r.children[e];
					if (t.size) {
						r = t;
						break;
					}
				}
				return r;
			}
			if (e < i) return r.descAt(e - n - r.border);
			n = i;
		}
	}
	domFromPos(e, t) {
		if (!this.contentDOM) return {
			node: this.dom,
			offset: 0,
			atom: e + 1
		};
		let n = 0, r = 0;
		for (let t = 0; n < this.children.length; n++) {
			let i = this.children[n], a = t + i.size;
			if (a > e || i instanceof Si) {
				r = e - t;
				break;
			}
			t = a;
		}
		if (r) return this.children[n].domFromPos(r - this.children[n].border, t);
		for (let e; n && !(e = this.children[n - 1]).size && e instanceof gi && e.side >= 0; n--);
		if (t <= 0) {
			let e, r = !0;
			for (; e = n ? this.children[n - 1] : null, !(!e || e.dom.parentNode == this.contentDOM); n--, r = !1);
			return e && t && r && !e.border && !e.domAtom ? e.domFromPos(e.size, t) : {
				node: this.contentDOM,
				offset: e ? V(e.dom) + 1 : 0
			};
		} else {
			let e, r = !0;
			for (; e = n < this.children.length ? this.children[n] : null, !(!e || e.dom.parentNode == this.contentDOM); n++, r = !1);
			return e && r && !e.border && !e.domAtom ? e.domFromPos(0, t) : {
				node: this.contentDOM,
				offset: e ? V(e.dom) : this.contentDOM.childNodes.length
			};
		}
	}
	parseRange(e, t, n = 0) {
		if (this.children.length == 0) return {
			node: this.contentDOM,
			from: e,
			to: t,
			fromOffset: 0,
			toOffset: this.contentDOM.childNodes.length
		};
		let r = -1, i = -1;
		for (let a = n, o = 0;; o++) {
			let n = this.children[o], s = a + n.size;
			if (r == -1 && e <= s) {
				let i = a + n.border;
				if (e >= i && t <= s - n.border && n.node && n.contentDOM && this.contentDOM.contains(n.contentDOM)) return n.parseRange(e, t, i);
				e = a;
				for (let t = o; t > 0; t--) {
					let n = this.children[t - 1];
					if (n.size && n.dom.parentNode == this.contentDOM && !n.emptyChildAt(1)) {
						r = V(n.dom) + 1;
						break;
					}
					e -= n.size;
				}
				r == -1 && (r = 0);
			}
			if (r > -1 && (s > t || o == this.children.length - 1)) {
				t = s;
				for (let e = o + 1; e < this.children.length; e++) {
					let n = this.children[e];
					if (n.size && n.dom.parentNode == this.contentDOM && !n.emptyChildAt(-1)) {
						i = V(n.dom);
						break;
					}
					t += n.size;
				}
				i == -1 && (i = this.contentDOM.childNodes.length);
				break;
			}
			a = s;
		}
		return {
			node: this.contentDOM,
			from: e,
			to: t,
			fromOffset: r,
			toOffset: i
		};
	}
	emptyChildAt(e) {
		if (this.border || !this.contentDOM || !this.children.length) return !1;
		let t = this.children[e < 0 ? 0 : this.children.length - 1];
		return t.size == 0 || t.emptyChildAt(e);
	}
	domAfterPos(e) {
		let { node: t, offset: n } = this.domFromPos(e, 0);
		if (t.nodeType != 1 || n == t.childNodes.length) throw RangeError("No node after pos " + e);
		return t.childNodes[n];
	}
	setSelection(e, t, n, r = !1) {
		let i = Math.min(e, t), a = Math.max(e, t);
		for (let o = 0, s = 0; o < this.children.length; o++) {
			let c = this.children[o], l = s + c.size;
			if (i > s && a < l) return c.setSelection(e - s - c.border, t - s - c.border, n, r);
			s = l;
		}
		let o = this.domFromPos(e, e ? -1 : 1), s = t == e ? o : this.domFromPos(t, t ? -1 : 1), c = n.root.getSelection(), l = n.domSelectionRange(), u = !1;
		if ((wr || U) && e == t) {
			let { node: e, offset: t } = o;
			if (e.nodeType == 3) {
				if (u = !!(t && e.nodeValue[t - 1] == "\n"), u && t == e.nodeValue.length) for (let t = e, n; t; t = t.parentNode) {
					if (n = t.nextSibling) {
						n.nodeName == "BR" && (o = s = {
							node: n.parentNode,
							offset: V(n) + 1
						});
						break;
					}
					let e = t.pmViewDesc;
					if (e && e.node && e.node.isBlock) break;
				}
			} else {
				let n = e.childNodes[t - 1];
				u = n && (n.nodeName == "BR" || n.contentEditable == "false");
			}
		}
		if (wr && l.focusNode && l.focusNode != s.node && l.focusNode.nodeType == 1) {
			let e = l.focusNode.childNodes[l.focusOffset];
			e && e.contentEditable == "false" && (r = !0);
		}
		if (!(r || u && U) && ir(o.node, o.offset, l.anchorNode, l.anchorOffset) && ir(s.node, s.offset, l.focusNode, l.focusOffset)) return;
		let d = !1;
		if ((c.extend || e == t) && !(u && wr)) {
			c.collapse(o.node, o.offset);
			try {
				e != t && c.extend(s.node, s.offset), d = !0;
			} catch {}
		}
		if (!d) {
			if (e > t) {
				let e = o;
				o = s, s = e;
			}
			let n = document.createRange();
			n.setEnd(s.node, s.offset), n.setStart(o.node, o.offset), c.removeAllRanges(), c.addRange(n);
		}
	}
	ignoreMutation(e) {
		return !this.contentDOM && e.type != "selection";
	}
	get contentLost() {
		return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
	}
	markDirty(e, t) {
		for (let n = 0, r = 0; r < this.children.length; r++) {
			let i = this.children[r], a = n + i.size;
			if (n == a ? e <= a && t >= n : e < a && t > n) {
				let r = n + i.border, o = a - i.border;
				if (e >= r && t <= o) {
					this.dirty = e == n || t == a ? pi : fi, e == r && t == o && (i.contentLost || i.dom.parentNode != this.contentDOM) ? i.dirty = mi : i.markDirty(e - r, t - r);
					return;
				} else i.dirty = i.dom == i.contentDOM && i.dom.parentNode == this.contentDOM && !i.children.length ? pi : mi;
			}
			n = a;
		}
		this.dirty = pi;
	}
	markParentsDirty() {
		let e = 1;
		for (let t = this.parent; t; t = t.parent, e++) {
			let n = e == 1 ? pi : fi;
			t.dirty < n && (t.dirty = n);
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
}, gi = class extends hi {
	constructor(e, t, n, r) {
		let i, a = t.type.toDOM;
		if (typeof a == "function" && (a = a(n, () => {
			if (!i) return r;
			if (i.parent) return i.parent.posBeforeChild(i);
		})), !t.type.spec.raw) {
			if (a.nodeType != 1) {
				let e = document.createElement("span");
				e.appendChild(a), a = e;
			}
			a.contentEditable = "false", a.classList.add("ProseMirror-widget");
		}
		super(e, [], a, null), this.widget = t, this.widget = t, i = this;
	}
	matchesWidget(e) {
		return this.dirty == di && e.type.eq(this.widget.type);
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
	get ignoreForSelection() {
		return !!this.widget.type.spec.relaxedSide;
	}
	get side() {
		return this.widget.type.side;
	}
}, _i = class extends hi {
	constructor(e, t, n, r) {
		super(e, [], t, null), this.textDOM = n, this.text = r;
	}
	get size() {
		return this.text.length;
	}
	localPosFromDOM(e, t) {
		return e == this.textDOM ? this.posAtStart + t : this.posAtStart + (t ? this.size : 0);
	}
	domFromPos(e) {
		return {
			node: this.textDOM,
			offset: e
		};
	}
	ignoreMutation(e) {
		return e.type === "characterData" && e.target.nodeValue == e.oldValue;
	}
}, vi = class e extends hi {
	constructor(e, t, n, r, i) {
		super(e, [], n, r), this.mark = t, this.spec = i;
	}
	static create(t, n, r, i) {
		let a = i.nodeViews[n.type.name], o = a && a(n, i, r);
		return (!o || !o.dom) && (o = ft.renderSpec(document, n.type.spec.toDOM(n, r), null, n.attrs)), new e(t, n, o.dom, o.contentDOM || o.dom, o);
	}
	parseRule() {
		return this.dirty & mi || this.mark.type.spec.reparseInView ? null : {
			mark: this.mark.type.name,
			attrs: this.mark.attrs,
			contentElement: this.contentDOM
		};
	}
	matchesMark(e) {
		return this.dirty != mi && this.mark.eq(e);
	}
	markDirty(e, t) {
		if (super.markDirty(e, t), this.dirty != di) {
			let e = this.parent;
			for (; !e.node;) e = e.parent;
			e.dirty < this.dirty && (e.dirty = this.dirty), this.dirty = di;
		}
	}
	slice(t, n, r) {
		let i = e.create(this.parent, this.mark, !0, r), a = this.children, o = this.size;
		n < o && (a = zi(a, n, o, r)), t > 0 && (a = zi(a, 0, t, r));
		for (let e = 0; e < a.length; e++) a[e].parent = i;
		return i.children = a, i;
	}
	ignoreMutation(e) {
		return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
	}
	destroy() {
		this.spec.destroy && this.spec.destroy(), super.destroy();
	}
}, yi = class e extends hi {
	constructor(e, t, n, r, i, a, o, s, c) {
		super(e, [], i, a), this.node = t, this.outerDeco = n, this.innerDeco = r, this.nodeDOM = o;
	}
	static create(t, n, r, i, a, o) {
		let s = a.nodeViews[n.type.name], c, l = s && s(n, a, () => {
			if (!c) return o;
			if (c.parent) return c.parent.posBeforeChild(c);
		}, r, i), u = l && l.dom, d = l && l.contentDOM;
		if (n.isText) {
			if (!u) u = document.createTextNode(n.text);
			else if (u.nodeType != 3) throw RangeError("Text must be rendered as a DOM text node");
		} else if (!u) {
			let e = ft.renderSpec(document, n.type.spec.toDOM(n), null, n.attrs);
			({dom: u, contentDOM: d} = e);
		}
		!d && !n.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), n.type.spec.draggable && (u.draggable = !0));
		let f = u;
		return u = Ai(u, r, n), l ? c = new Ci(t, n, r, i, u, d || null, f, l, a, o + 1) : n.isText ? new xi(t, n, r, i, u, f, a) : new e(t, n, r, i, u, d || null, f, a, o + 1);
	}
	parseRule() {
		if (this.node.type.spec.reparseInView) return null;
		let e = {
			node: this.node.type.name,
			attrs: this.node.attrs
		};
		if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM) e.getContent = () => this.node.content;
		else if (!this.contentLost) e.contentElement = this.contentDOM;
		else {
			for (let t = this.children.length - 1; t >= 0; t--) {
				let n = this.children[t];
				if (this.dom.contains(n.dom.parentNode)) {
					e.contentElement = n.dom.parentNode;
					break;
				}
			}
			e.contentElement || (e.getContent = () => M.empty);
		}
		return e;
	}
	matchesNode(e, t, n) {
		return this.dirty == di && e.eq(this.node) && ji(t, this.outerDeco) && n.eq(this.innerDeco);
	}
	get size() {
		return this.node.nodeSize;
	}
	get border() {
		return +!this.node.isLeaf;
	}
	updateChildren(e, t) {
		let n = this.node.inlineContent, r = t, i = e.composing ? this.localCompositionInfo(e, t) : null, a = i && i.pos > -1 ? i : null, o = i && i.pos < 0, s = new Ni(this, a && a.node, e);
		Ii(this.node, this.innerDeco, (t, i, a) => {
			t.spec.marks ? s.syncToMarks(t.spec.marks, n, e, i) : t.type.side >= 0 && !a && s.syncToMarks(i == this.node.childCount ? N.none : this.node.child(i).marks, n, e, i), s.placeWidget(t, e, r);
		}, (t, a, c, l) => {
			s.syncToMarks(t.marks, n, e, l);
			let u;
			s.findNodeMatch(t, a, c, l) || o && e.state.selection.from > r && e.state.selection.to < r + t.nodeSize && (u = s.findIndexWithChild(i.node)) > -1 && s.updateNodeAt(t, a, c, u, e) || s.updateNextNode(t, a, c, e, l, r) || s.addNode(t, a, c, e, r), r += t.nodeSize;
		}), s.syncToMarks([], n, e, 0), this.node.isTextblock && s.addTextblockHacks(), s.destroyRest(), (s.changed || this.dirty == pi) && (a && this.protectLocalComposition(e, a), wi(this.contentDOM, this.children, e), Dr && Li(this.dom));
	}
	localCompositionInfo(e, t) {
		let { from: n, to: r } = e.state.selection;
		if (!(e.state.selection instanceof R) || n < t || r > t + this.node.content.size) return null;
		let i = e.input.compositionNode;
		if (!i || !this.dom.contains(i.parentNode)) return null;
		if (this.node.inlineContent) {
			let e = i.nodeValue, a = Ri(this.node.content, e, n - t, r - t);
			return a < 0 ? null : {
				node: i,
				pos: a,
				text: e
			};
		} else return {
			node: i,
			pos: -1,
			text: ""
		};
	}
	protectLocalComposition(e, { node: t, pos: n, text: r }) {
		if (this.getDesc(t)) return;
		let i = t;
		for (; i.parentNode != this.contentDOM; i = i.parentNode) {
			for (; i.previousSibling;) i.parentNode.removeChild(i.previousSibling);
			for (; i.nextSibling;) i.parentNode.removeChild(i.nextSibling);
			i.pmViewDesc &&= void 0;
		}
		let a = new _i(this, i, t, r);
		e.input.compositionNodes.push(a), this.children = zi(this.children, n, n + r.length, e, a);
	}
	update(e, t, n, r) {
		return this.dirty == mi || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, n, r), !0);
	}
	updateInner(e, t, n, r) {
		this.updateOuterDeco(t), this.node = e, this.innerDeco = n, this.contentDOM && this.updateChildren(r, this.posAtStart), this.dirty = di;
	}
	updateOuterDeco(e) {
		if (ji(e, this.outerDeco)) return;
		let t = this.nodeDOM.nodeType != 1, n = this.dom;
		this.dom = Oi(this.dom, this.nodeDOM, Di(this.outerDeco, this.node, t), Di(e, this.node, t)), this.dom != n && (n.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
	}
	selectNode() {
		this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.nodeDOM.draggable = !0));
	}
	deselectNode() {
		this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.nodeDOM.removeAttribute("draggable"));
	}
	get domAtom() {
		return this.node.isAtom;
	}
};
function bi(e, t, n, r, i) {
	Ai(r, t, e);
	let a = new yi(void 0, e, t, n, r, r, r, i, 0);
	return a.contentDOM && a.updateChildren(i, 0), a;
}
var xi = class e extends yi {
	constructor(e, t, n, r, i, a, o) {
		super(e, t, n, r, i, null, a, o, 0);
	}
	parseRule() {
		let e = this.nodeDOM.parentNode;
		for (; e && e != this.dom && !e.pmIsDeco;) e = e.parentNode;
		return { skip: e || !0 };
	}
	update(e, t, n, r) {
		return this.dirty == mi || this.dirty != di && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != di || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, r.trackWrites == this.nodeDOM && (r.trackWrites = null)), this.node = e, this.dirty = di, !0);
	}
	inParent() {
		let e = this.parent.contentDOM;
		for (let t = this.nodeDOM; t; t = t.parentNode) if (t == e) return !0;
		return !1;
	}
	domFromPos(e) {
		return {
			node: this.nodeDOM,
			offset: e
		};
	}
	localPosFromDOM(e, t, n) {
		return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, n);
	}
	ignoreMutation(e) {
		return e.type != "characterData" && e.type != "selection";
	}
	slice(t, n, r) {
		let i = this.node.cut(t, n), a = document.createTextNode(i.text);
		return new e(this.parent, i, this.outerDeco, this.innerDeco, a, a, r);
	}
	markDirty(e, t) {
		super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = mi);
	}
	get domAtom() {
		return !1;
	}
	isText(e) {
		return this.node.text == e;
	}
}, Si = class extends hi {
	parseRule() {
		return { ignore: !0 };
	}
	matchesHack(e) {
		return this.dirty == di && this.dom.nodeName == e;
	}
	get domAtom() {
		return !0;
	}
	get ignoreForCoords() {
		return this.dom.nodeName == "IMG";
	}
}, Ci = class extends yi {
	constructor(e, t, n, r, i, a, o, s, c, l) {
		super(e, t, n, r, i, a, o, c, l), this.spec = s;
	}
	update(e, t, n, r) {
		if (this.dirty == mi) return !1;
		if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
			let i = this.spec.update(e, t, n);
			return i && this.updateInner(e, t, n, r), i;
		} else if (!this.contentDOM && !e.isLeaf) return !1;
		else return super.update(e, t, n, r);
	}
	selectNode() {
		this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
	}
	deselectNode() {
		this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
	}
	setSelection(e, t, n, r) {
		this.spec.setSelection ? this.spec.setSelection(e, t, n.root) : super.setSelection(e, t, n, r);
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
};
function wi(e, t, n) {
	let r = e.firstChild, i = !1;
	for (let a = 0; a < t.length; a++) {
		let o = t[a], s = o.dom;
		if (s.parentNode == e) {
			for (; s != r;) r = Mi(r), i = !0;
			r = r.nextSibling;
		} else i = !0, e.insertBefore(s, r);
		if (o instanceof vi) {
			let t = r ? r.previousSibling : e.lastChild;
			wi(o.contentDOM, o.children, n), r = t ? t.nextSibling : e.firstChild;
		}
	}
	for (; r;) r = Mi(r), i = !0;
	i && n.trackWrites == e && (n.trackWrites = null);
}
var Ti = function(e) {
	e && (this.nodeName = e);
};
Ti.prototype = Object.create(null);
var Ei = [new Ti()];
function Di(e, t, n) {
	if (e.length == 0) return Ei;
	let r = n ? Ei[0] : new Ti(), i = [r];
	for (let a = 0; a < e.length; a++) {
		let o = e[a].type.attrs;
		if (o) {
			o.nodeName && i.push(r = new Ti(o.nodeName));
			for (let e in o) {
				let a = o[e];
				a != null && (n && i.length == 1 && i.push(r = new Ti(t.isInline ? "span" : "div")), e == "class" ? r.class = (r.class ? r.class + " " : "") + a : e == "style" ? r.style = (r.style ? r.style + ";" : "") + a : e != "nodeName" && (r[e] = a));
			}
		}
	}
	return i;
}
function Oi(e, t, n, r) {
	if (n == Ei && r == Ei) return t;
	let i = t;
	for (let t = 0; t < r.length; t++) {
		let a = r[t], o = n[t];
		if (t) {
			let t;
			o && o.nodeName == a.nodeName && i != e && (t = i.parentNode) && t.nodeName.toLowerCase() == a.nodeName ? i = t : (t = document.createElement(a.nodeName), t.pmIsDeco = !0, t.appendChild(i), o = Ei[0], i = t);
		}
		ki(i, o || Ei[0], a);
	}
	return i;
}
function ki(e, t, n) {
	for (let r in t) r != "class" && r != "style" && r != "nodeName" && !(r in n) && e.removeAttribute(r);
	for (let r in n) r != "class" && r != "style" && r != "nodeName" && n[r] != t[r] && e.setAttribute(r, n[r]);
	if (t.class != n.class) {
		let r = t.class ? t.class.split(" ").filter(Boolean) : [], i = n.class ? n.class.split(" ").filter(Boolean) : [];
		for (let t = 0; t < r.length; t++) i.indexOf(r[t]) == -1 && e.classList.remove(r[t]);
		for (let t = 0; t < i.length; t++) r.indexOf(i[t]) == -1 && e.classList.add(i[t]);
		e.classList.length == 0 && e.removeAttribute("class");
	}
	if (t.style != n.style) {
		if (t.style) {
			let n = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, r;
			for (; r = n.exec(t.style);) e.style.removeProperty(r[1]);
		}
		n.style && (e.style.cssText += n.style);
	}
}
function Ai(e, t, n) {
	return Oi(e, e, Ei, Di(t, n, e.nodeType != 1));
}
function ji(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) if (!e[n].type.eq(t[n].type)) return !1;
	return !0;
}
function Mi(e) {
	let t = e.nextSibling;
	return e.parentNode.removeChild(e), t;
}
var Ni = class {
	constructor(e, t, n) {
		this.lock = t, this.view = n, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = Pi(e.node.content, e);
	}
	destroyBetween(e, t) {
		if (e != t) {
			for (let n = e; n < t; n++) this.top.children[n].destroy();
			this.top.children.splice(e, t - e), this.changed = !0;
		}
	}
	destroyRest() {
		this.destroyBetween(this.index, this.top.children.length);
	}
	syncToMarks(e, t, n, r) {
		let i = 0, a = this.stack.length >> 1, o = Math.min(a, e.length);
		for (; i < o && (i == a - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1;) i++;
		for (; i < a;) this.destroyRest(), this.top.dirty = di, this.index = this.stack.pop(), this.top = this.stack.pop(), a--;
		for (; a < e.length;) {
			this.stack.push(this.top, this.index + 1);
			let i = -1, o = this.top.children.length;
			r < this.preMatch.index && (o = Math.min(this.index + 3, o));
			for (let t = this.index; t < o; t++) {
				let n = this.top.children[t];
				if (n.matchesMark(e[a]) && !this.isLocked(n.dom)) {
					i = t;
					break;
				}
			}
			if (i > -1) i > this.index && (this.changed = !0, this.destroyBetween(this.index, i)), this.top = this.top.children[this.index];
			else {
				let r = vi.create(this.top, e[a], t, n);
				this.top.children.splice(this.index, 0, r), this.top = r, this.changed = !0;
			}
			this.index = 0, a++;
		}
	}
	findNodeMatch(e, t, n, r) {
		let i = -1, a;
		if (r >= this.preMatch.index && (a = this.preMatch.matches[r - this.preMatch.index]).parent == this.top && a.matchesNode(e, t, n)) i = this.top.children.indexOf(a, this.index);
		else for (let r = this.index, a = Math.min(this.top.children.length, r + 5); r < a; r++) {
			let a = this.top.children[r];
			if (a.matchesNode(e, t, n) && !this.preMatch.matched.has(a)) {
				i = r;
				break;
			}
		}
		return i < 0 ? !1 : (this.destroyBetween(this.index, i), this.index++, !0);
	}
	updateNodeAt(e, t, n, r, i) {
		let a = this.top.children[r];
		return a.dirty == mi && a.dom == a.contentDOM && (a.dirty = pi), a.update(e, t, n, i) ? (this.destroyBetween(this.index, r), this.index++, !0) : !1;
	}
	findIndexWithChild(e) {
		for (;;) {
			let t = e.parentNode;
			if (!t) return -1;
			if (t == this.top.contentDOM) {
				let t = e.pmViewDesc;
				if (t) {
					for (let e = this.index; e < this.top.children.length; e++) if (this.top.children[e] == t) return e;
				}
				return -1;
			}
			e = t;
		}
	}
	updateNextNode(e, t, n, r, i, a) {
		for (let o = this.index; o < this.top.children.length; o++) {
			let s = this.top.children[o];
			if (s instanceof yi) {
				let c = this.preMatch.matched.get(s);
				if (c != null && c != i) return !1;
				let l = s.dom, u, d = this.isLocked(l) && !(e.isText && s.node && s.node.isText && s.nodeDOM.nodeValue == e.text && s.dirty != mi && ji(t, s.outerDeco));
				if (!d && s.update(e, t, n, r)) return this.destroyBetween(this.index, o), s.dom != l && (this.changed = !0), this.index++, !0;
				if (!d && (u = this.recreateWrapper(s, e, t, n, r, a))) return this.destroyBetween(this.index, o), this.top.children[this.index] = u, u.contentDOM && (u.dirty = pi, u.updateChildren(r, a + 1), u.dirty = di), this.changed = !0, this.index++, !0;
				break;
			}
		}
		return !1;
	}
	recreateWrapper(e, t, n, r, i, a) {
		if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !ji(n, e.outerDeco) || !r.eq(e.innerDeco)) return null;
		let o = yi.create(this.top, t, n, r, i, a);
		if (o.contentDOM) {
			o.children = e.children, e.children = [];
			for (let e of o.children) e.parent = o;
		}
		return e.destroy(), o;
	}
	addNode(e, t, n, r, i) {
		let a = yi.create(this.top, e, t, n, r, i);
		a.contentDOM && a.updateChildren(r, i + 1), this.top.children.splice(this.index++, 0, a), this.changed = !0;
	}
	placeWidget(e, t, n) {
		let r = this.index < this.top.children.length ? this.top.children[this.index] : null;
		if (r && r.matchesWidget(e) && (e == r.widget || !r.widget.type.toDOM.parentNode)) this.index++;
		else {
			let r = new gi(this.top, e, t, n);
			this.top.children.splice(this.index++, 0, r), this.changed = !0;
		}
	}
	addTextblockHacks() {
		let e = this.top.children[this.index - 1], t = this.top;
		for (; e instanceof vi;) t = e, e = t.children[t.children.length - 1];
		(!e || !(e instanceof xi) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((U || H) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
	}
	addHackNode(e, t) {
		if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e)) this.index++;
		else {
			let n = document.createElement(e);
			e == "IMG" && (n.className = "ProseMirror-separator", n.alt = ""), e == "BR" && (n.className = "ProseMirror-trailingBreak");
			let r = new Si(this.top, [], n, null);
			t == this.top ? t.children.splice(this.index++, 0, r) : t.children.push(r), this.changed = !0;
		}
	}
	isLocked(e) {
		return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
	}
};
function Pi(e, t) {
	let n = t, r = n.children.length, i = e.childCount, a = /* @__PURE__ */ new Map(), o = [];
	outer: for (; i > 0;) {
		let s;
		for (;;) if (r) {
			let e = n.children[r - 1];
			if (e instanceof vi) n = e, r = e.children.length;
			else {
				s = e, r--;
				break;
			}
		} else if (n == t) break outer;
		else r = n.parent.children.indexOf(n), n = n.parent;
		let c = s.node;
		if (c) {
			if (c != e.child(i - 1)) break;
			--i, a.set(s, i), o.push(s);
		}
	}
	return {
		index: i,
		matched: a,
		matches: o.reverse()
	};
}
function Fi(e, t) {
	return e.type.side - t.type.side;
}
function Ii(e, t, n, r) {
	let i = t.locals(e), a = 0;
	if (i.length == 0) {
		for (let n = 0; n < e.childCount; n++) {
			let o = e.child(n);
			r(o, i, t.forChild(a, o), n), a += o.nodeSize;
		}
		return;
	}
	let o = 0, s = [], c = null;
	for (let l = 0;;) {
		let u, d;
		for (; o < i.length && i[o].to == a;) {
			let e = i[o++];
			e.widget && (u ? (d ||= [u]).push(e) : u = e);
		}
		if (u) if (d) {
			d.sort(Fi);
			for (let e = 0; e < d.length; e++) n(d[e], l, !!c);
		} else n(u, l, !!c);
		let f, p;
		if (c) p = -1, f = c, c = null;
		else if (l < e.childCount) p = l, f = e.child(l++);
		else break;
		for (let e = 0; e < s.length; e++) s[e].to <= a && s.splice(e--, 1);
		for (; o < i.length && i[o].from <= a && i[o].to > a;) s.push(i[o++]);
		let m = a + f.nodeSize;
		if (f.isText) {
			let e = m;
			o < i.length && i[o].from < e && (e = i[o].from);
			for (let t = 0; t < s.length; t++) s[t].to < e && (e = s[t].to);
			e < m && (c = f.cut(e - a), f = f.cut(0, e - a), m = e, p = -1);
		} else for (; o < i.length && i[o].to < m;) o++;
		let h = f.isInline && !f.isLeaf ? s.filter((e) => !e.inline) : s.slice();
		r(f, h, t.forChild(a, f), p), a = m;
	}
}
function Li(e) {
	if (e.nodeName == "UL" || e.nodeName == "OL") {
		let t = e.style.cssText;
		e.style.cssText = t + "; list-style: square !important", window.getComputedStyle(e).listStyle, e.style.cssText = t;
	}
}
function Ri(e, t, n, r) {
	for (let i = 0, a = 0; i < e.childCount && a <= r;) {
		let o = e.child(i++), s = a;
		if (a += o.nodeSize, !o.isText) continue;
		let c = o.text;
		for (; i < e.childCount;) {
			let t = e.child(i++);
			if (a += t.nodeSize, !t.isText) break;
			c += t.text;
		}
		if (a >= n) {
			if (a >= r && c.slice(r - t.length - s, r - s) == t) return r - t.length;
			let e = s < r ? c.lastIndexOf(t, r - s - 1) : -1;
			if (e >= 0 && e + t.length + s >= n) return s + e;
			if (n == r && c.length >= r + t.length - s && c.slice(r - s, r - s + t.length) == t) return r;
		}
	}
	return -1;
}
function zi(e, t, n, r, i) {
	let a = [];
	for (let o = 0, s = 0; o < e.length; o++) {
		let c = e[o], l = s, u = s += c.size;
		l >= n || u <= t ? a.push(c) : (l < t && a.push(c.slice(0, t - l, r)), i &&= (a.push(i), void 0), u > n && a.push(c.slice(n - l, c.size, r)));
	}
	return a;
}
function Bi(e, t = null) {
	let n = e.domSelectionRange(), r = e.state.doc;
	if (!n.focusNode) return null;
	let i = e.docView.nearestDesc(n.focusNode), a = i && i.size == 0, o = e.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
	if (o < 0) return null;
	let s = r.resolve(o), c, l;
	if (fr(n)) {
		for (c = o; i && !i.node;) i = i.parent;
		let e = i.node;
		if (i && e.isAtom && z.isSelectable(e) && i.parent && !(e.isInline && ur(n.focusNode, n.focusOffset, i.dom))) {
			let e = i.posBefore;
			l = new z(o == e ? s : r.resolve(e));
		}
	} else {
		if (n instanceof e.dom.ownerDocument.defaultView.Selection && n.rangeCount > 1) {
			let t = o, i = o;
			for (let r = 0; r < n.rangeCount; r++) {
				let a = n.getRangeAt(r);
				t = Math.min(t, e.docView.posFromDOM(a.startContainer, a.startOffset, 1)), i = Math.max(i, e.docView.posFromDOM(a.endContainer, a.endOffset, -1));
			}
			if (t < 0) return null;
			[c, o] = i == e.state.selection.anchor ? [i, t] : [t, i], s = r.resolve(o);
		} else c = e.docView.posFromDOM(n.anchorNode, n.anchorOffset, 1);
		if (c < 0) return null;
	}
	let u = r.resolve(c);
	if (!l) {
		let n = t == "pointer" || e.state.selection.head < s.pos && !a ? 1 : -1;
		l = Zi(e, u, s, n);
	}
	return l;
}
function Vi(e) {
	return e.editable ? e.hasFocus() : $i(e) && document.activeElement && document.activeElement.contains(e.dom);
}
function Hi(e, t = !1) {
	let n = e.state.selection;
	if (Yi(e, n), !Vi(e)) return;
	let r = e.input.mouseDown;
	if (!t && H && r) {
		let t = e.domSelectionRange(), n = e.domObserver.currentSelection;
		if (t.anchorNode && n.anchorNode && ir(t.anchorNode, t.anchorOffset, n.anchorNode, n.anchorOffset) && r.delaySelUpdate()) {
			e.domObserver.setCurSelection();
			return;
		}
	}
	if (e.domObserver.disconnectSelection(), e.cursorWrapper) Ji(e);
	else {
		let { anchor: r, head: i } = n, a, o;
		Ui && !(n instanceof R) && (n.$from.parent.inlineContent || (a = Wi(e, n.from)), !n.empty && !n.$from.parent.inlineContent && (o = Wi(e, n.to))), e.docView.setSelection(r, i, e, t), Ui && (a && Ki(a), o && Ki(o)), n.visible ? e.dom.classList.remove("ProseMirror-hideselection") : (e.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && qi(e));
	}
	e.domObserver.setCurSelection(), e.domObserver.connectSelection();
}
var Ui = U || H && Er < 63;
function Wi(e, t) {
	let { node: n, offset: r } = e.docView.domFromPos(t, 0), i = r < n.childNodes.length ? n.childNodes[r] : null, a = r ? n.childNodes[r - 1] : null;
	if (U && i && i.contentEditable == "false") return Gi(i);
	if ((!i || i.contentEditable == "false") && (!a || a.contentEditable == "false")) {
		if (i) return Gi(i);
		if (a) return Gi(a);
	}
}
function Gi(e) {
	return e.contentEditable = "true", U && e.draggable && (e.draggable = !1, e.wasDraggable = !0), e;
}
function Ki(e) {
	e.contentEditable = "false", e.wasDraggable &&= (e.draggable = !0, null);
}
function qi(e) {
	let t = e.dom.ownerDocument;
	t.removeEventListener("selectionchange", e.input.hideSelectionGuard);
	let n = e.domSelectionRange(), r = n.anchorNode, i = n.anchorOffset;
	t.addEventListener("selectionchange", e.input.hideSelectionGuard = () => {
		(n.anchorNode != r || n.anchorOffset != i) && (t.removeEventListener("selectionchange", e.input.hideSelectionGuard), setTimeout(() => {
			(!Vi(e) || e.state.selection.visible) && e.dom.classList.remove("ProseMirror-hideselection");
		}, 20));
	});
}
function Ji(e) {
	let t = e.domSelection();
	if (!t) return;
	let n = e.cursorWrapper.dom, r = n.nodeName == "IMG";
	r ? t.collapse(n.parentNode, V(n) + 1) : t.collapse(n, 0), !r && !e.state.selection.visible && Sr && Cr <= 11 && (n.disabled = !0, n.disabled = !1);
}
function Yi(e, t) {
	if (t instanceof z) {
		let n = e.docView.descAt(t.from);
		n != e.lastSelectedViewDesc && (Xi(e), n && n.selectNode(), e.lastSelectedViewDesc = n);
	} else Xi(e);
}
function Xi(e) {
	e.lastSelectedViewDesc &&= (e.lastSelectedViewDesc.parent && e.lastSelectedViewDesc.deselectNode(), void 0);
}
function Zi(e, t, n, r) {
	return e.someProp("createSelectionBetween", (r) => r(e, t, n)) || R.between(t, n, r);
}
function Qi(e) {
	return e.editable && !e.hasFocus() ? !1 : $i(e);
}
function $i(e) {
	let t = e.domSelectionRange();
	if (!t.anchorNode) return !1;
	try {
		return e.dom.contains(t.anchorNode.nodeType == 3 ? t.anchorNode.parentNode : t.anchorNode) && (e.editable || e.dom.contains(t.focusNode.nodeType == 3 ? t.focusNode.parentNode : t.focusNode));
	} catch {
		return !1;
	}
}
function ea(e) {
	let t = e.docView.domFromPos(e.state.selection.anchor, 0), n = e.domSelectionRange();
	return ir(t.node, t.offset, n.anchorNode, n.anchorOffset);
}
function ta(e, t) {
	let { $anchor: n, $head: r } = e.selection, i = t > 0 ? n.max(r) : n.min(r), a = i.parent.inlineContent ? i.depth ? e.doc.resolve(t > 0 ? i.after() : i.before()) : null : i;
	return a && L.findFrom(a, t);
}
function na(e, t) {
	return e.dispatch(e.state.tr.setSelection(t).scrollIntoView()), !0;
}
function ra(e, t, n) {
	let r = e.state.selection;
	if (r instanceof R) {
		if (n.indexOf("s") > -1) {
			let { $head: n } = r, i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter;
			if (!i || i.isText || !i.isLeaf) return !1;
			let a = e.state.doc.resolve(n.pos + i.nodeSize * (t < 0 ? -1 : 1));
			return na(e, new R(r.$anchor, a));
		} else if (!r.empty) return !1;
		else if (e.endOfTextblock(t > 0 ? "forward" : "backward")) {
			let n = ta(e.state, t);
			return n && n instanceof z ? na(e, n) : !1;
		} else if (!(Or && n.indexOf("m") > -1)) {
			let n = r.$head, i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter, a;
			if (!i || i.isText) return !1;
			let o = t < 0 ? n.pos - i.nodeSize : n.pos;
			return i.isAtom || (a = e.docView.descAt(o)) && !a.contentDOM ? z.isSelectable(i) ? na(e, new z(t < 0 ? e.state.doc.resolve(n.pos - i.nodeSize) : n)) : jr ? na(e, new R(e.state.doc.resolve(t < 0 ? o : o + i.nodeSize))) : !1 : !1;
		}
	} else if (r instanceof z && r.node.isInline) return na(e, new R(t > 0 ? r.$to : r.$from));
	else {
		let n = ta(e.state, t);
		return n ? na(e, n) : !1;
	}
}
function ia(e) {
	return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length;
}
function aa(e, t) {
	let n = e.pmViewDesc;
	return n && n.size == 0 && (t < 0 || e.nextSibling || e.nodeName != "BR");
}
function oa(e, t) {
	return t < 0 ? sa(e) : ca(e);
}
function sa(e) {
	let t = e.domSelectionRange(), n = t.focusNode, r = t.focusOffset;
	if (!n) return;
	let i, a, o = !1;
	for (wr && n.nodeType == 1 && r < ia(n) && aa(n.childNodes[r], -1) && (o = !0);;) if (r > 0) {
		if (n.nodeType != 1) break;
		{
			let e = n.childNodes[r - 1];
			if (aa(e, -1)) i = n, a = --r;
			else if (e.nodeType == 3) n = e, r = n.nodeValue.length;
			else break;
		}
	} else if (la(n)) break;
	else {
		let t = n.previousSibling;
		for (; t && aa(t, -1);) i = n.parentNode, a = V(t), t = t.previousSibling;
		if (t) n = t, r = ia(n);
		else {
			if (n = n.parentNode, n == e.dom) break;
			r = 0;
		}
	}
	o ? fa(e, n, r) : i && fa(e, i, a);
}
function ca(e) {
	let t = e.domSelectionRange(), n = t.focusNode, r = t.focusOffset;
	if (!n) return;
	let i = ia(n), a, o;
	for (;;) if (r < i) {
		if (n.nodeType != 1) break;
		let e = n.childNodes[r];
		if (aa(e, 1)) a = n, o = ++r;
		else break;
	} else if (la(n)) break;
	else {
		let t = n.nextSibling;
		for (; t && aa(t, 1);) a = t.parentNode, o = V(t) + 1, t = t.nextSibling;
		if (t) n = t, r = 0, i = ia(n);
		else {
			if (n = n.parentNode, n == e.dom) break;
			r = i = 0;
		}
	}
	a && fa(e, a, o);
}
function la(e) {
	let t = e.pmViewDesc;
	return t && t.node && t.node.isBlock;
}
function ua(e, t) {
	for (; e && t == e.childNodes.length && !dr(e);) t = V(e) + 1, e = e.parentNode;
	for (; e && t < e.childNodes.length;) {
		let n = e.childNodes[t];
		if (n.nodeType == 3) return n;
		if (n.nodeType == 1 && n.contentEditable == "false") break;
		e = n, t = 0;
	}
}
function da(e, t) {
	for (; e && !t && !dr(e);) t = V(e), e = e.parentNode;
	for (; e && t;) {
		let n = e.childNodes[t - 1];
		if (n.nodeType == 3) return n;
		if (n.nodeType == 1 && n.contentEditable == "false") break;
		e = n, t = e.childNodes.length;
	}
}
function fa(e, t, n) {
	if (t.nodeType != 3) {
		let e, r;
		(r = ua(t, n)) ? (t = r, n = 0) : (e = da(t, n)) && (t = e, n = e.nodeValue.length);
	}
	let r = e.domSelection();
	if (!r) return;
	if (fr(r)) {
		let e = document.createRange();
		e.setEnd(t, n), e.setStart(t, n), r.removeAllRanges(), r.addRange(e);
	} else r.extend && r.extend(t, n);
	e.domObserver.setCurSelection();
	let { state: i } = e;
	setTimeout(() => {
		e.state == i && Hi(e);
	}, 50);
}
function pa(e, t) {
	let n = e.state.doc.resolve(t);
	if (!(H || kr) && n.parent.inlineContent) {
		let r = e.coordsAtPos(t);
		if (t > n.start()) {
			let n = e.coordsAtPos(t - 1), i = (n.top + n.bottom) / 2;
			if (i > r.top && i < r.bottom && Math.abs(n.left - r.left) > 1) return n.left < r.left ? "ltr" : "rtl";
		}
		if (t < n.end()) {
			let n = e.coordsAtPos(t + 1), i = (n.top + n.bottom) / 2;
			if (i > r.top && i < r.bottom && Math.abs(n.left - r.left) > 1) return n.left > r.left ? "ltr" : "rtl";
		}
	}
	return getComputedStyle(e.dom).direction == "rtl" ? "rtl" : "ltr";
}
function ma(e, t, n) {
	let r = e.state.selection;
	if (r instanceof R && !r.empty || n.indexOf("s") > -1 || Or && n.indexOf("m") > -1) return !1;
	let { $from: i, $to: a } = r;
	if (!i.parent.inlineContent || e.endOfTextblock(t < 0 ? "up" : "down")) {
		let n = ta(e.state, t);
		if (n && n instanceof z) return na(e, n);
	}
	if (!i.parent.inlineContent) {
		let n = t < 0 ? i : a, o = r instanceof Ln ? L.near(n, t) : L.findFrom(n, t);
		return o ? na(e, o) : !1;
	}
	return !1;
}
function ha(e, t) {
	if (!(e.state.selection instanceof R)) return !0;
	let { $head: n, $anchor: r, empty: i } = e.state.selection;
	if (!n.sameParent(r)) return !0;
	if (!i) return !1;
	if (e.endOfTextblock(t > 0 ? "forward" : "backward")) return !0;
	let a = !n.textOffset && (t < 0 ? n.nodeBefore : n.nodeAfter);
	if (a && !a.isText) {
		let r = e.state.tr;
		return t < 0 ? r.delete(n.pos - a.nodeSize, n.pos) : r.delete(n.pos, n.pos + a.nodeSize), e.dispatch(r), !0;
	}
	return !1;
}
function ga(e, t, n) {
	e.domObserver.stop(), t.contentEditable = n, e.domObserver.start();
}
function _a(e) {
	if (!U || e.state.selection.$head.parentOffset > 0) return !1;
	let { focusNode: t, focusOffset: n } = e.domSelectionRange();
	if (t && t.nodeType == 1 && n == 0 && t.firstChild && t.firstChild.contentEditable == "false") {
		let n = t.firstChild;
		ga(e, n, "true"), setTimeout(() => ga(e, n, "false"), 20);
	}
	return !1;
}
function va(e) {
	let t = "";
	return e.ctrlKey && (t += "c"), e.metaKey && (t += "m"), e.altKey && (t += "a"), e.shiftKey && (t += "s"), t;
}
function ya(e, t) {
	let n = t.keyCode, r = va(t);
	if (n == 8 || Or && n == 72 && r == "c") return ha(e, -1) || oa(e, -1);
	if (n == 46 && !t.shiftKey || Or && n == 68 && r == "c") return ha(e, 1) || oa(e, 1);
	if (n == 13 || n == 27) return !0;
	if (n == 37 || Or && n == 66 && r == "c") {
		let t = n == 37 ? pa(e, e.state.selection.from) == "ltr" ? -1 : 1 : -1;
		return ra(e, t, r) || oa(e, t);
	} else if (n == 39 || Or && n == 70 && r == "c") {
		let t = n == 39 ? pa(e, e.state.selection.from) == "ltr" ? 1 : -1 : 1;
		return ra(e, t, r) || oa(e, t);
	} else if (n == 38 || Or && n == 80 && r == "c") return ma(e, -1, r) || oa(e, -1);
	else if (n == 40 || Or && n == 78 && r == "c") return _a(e) || ma(e, 1, r) || oa(e, 1);
	else if (r == (Or ? "m" : "c") && (n == 66 || n == 73 || n == 89 || n == 90)) return !0;
	return !1;
}
function ba(e, t) {
	e.someProp("transformCopied", (n) => {
		t = n(t, e);
	});
	let n = [], { content: r, openStart: i, openEnd: a } = t;
	for (; i > 1 && a > 1 && r.childCount == 1 && r.firstChild.childCount == 1;) {
		i--, a--;
		let e = r.firstChild;
		n.push(e.type.name, e.attrs == e.type.defaultAttrs ? null : e.attrs), r = e.content;
	}
	let o = e.someProp("clipboardSerializer") || ft.fromSchema(e.state.schema), s = ja(), c = s.createElement("div");
	c.appendChild(o.serializeFragment(r, { document: s }));
	let l = c.firstChild, u, d = 0;
	for (; l && l.nodeType == 1 && (u = ka[l.nodeName.toLowerCase()]);) {
		for (let e = u.length - 1; e >= 0; e--) {
			let t = s.createElement(u[e]);
			for (; c.firstChild;) t.appendChild(c.firstChild);
			c.appendChild(t), d++;
		}
		l = c.firstChild;
	}
	return l && l.nodeType == 1 && l.setAttribute("data-pm-slice", `${i} ${a}${d ? ` -${d}` : ""} ${JSON.stringify(n)}`), {
		dom: c,
		text: e.someProp("clipboardTextSerializer", (n) => n(t, e)) || t.content.textBetween(0, t.content.size, "\n\n"),
		slice: t
	};
}
function xa(e, t, n, r, i) {
	let a = i.parent.type.spec.code, o, s;
	if (!n && !t) return null;
	let c = !!t && (r || a || !n);
	if (c) {
		if (e.someProp("transformPastedText", (n) => {
			t = n(t, a || r, e);
		}), a) return s = new P(M.from(e.state.schema.text(t.replace(/\r\n?/g, "\n"))), 0, 0), e.someProp("transformPasted", (t) => {
			s = t(s, e, !0);
		}), s;
		let n = e.someProp("clipboardTextParser", (n) => n(t, i, r, e));
		if (n) s = n;
		else {
			let n = i.marks(), { schema: r } = e.state, a = ft.fromSchema(r);
			o = document.createElement("div"), t.split(/(?:\r\n?|\n)+/).forEach((e) => {
				let t = o.appendChild(document.createElement("p"));
				e && t.appendChild(a.serializeNode(r.text(e, n)));
			});
		}
	} else e.someProp("transformPastedHTML", (t) => {
		n = t(n, e);
	}), o = Pa(n), jr && Fa(o);
	let l = o && o.querySelector("[data-pm-slice]"), u = l && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(l.getAttribute("data-pm-slice") || "");
	if (u && u[3]) for (let e = +u[3]; e > 0; e--) {
		let e = o.firstChild;
		for (; e && e.nodeType != 1;) e = e.nextSibling;
		if (!e) break;
		o = e;
	}
	if (s ||= (e.someProp("clipboardParser") || e.someProp("domParser") || Qe.fromSchema(e.state.schema)).parseSlice(o, {
		preserveWhitespace: !!(c || u),
		context: i,
		ruleFromNode(e) {
			return e.nodeName == "BR" && !e.nextSibling && e.parentNode && !Sa.test(e.parentNode.nodeName) ? { ignore: !0 } : null;
		}
	}), u) s = Ia(Oa(s, +u[1], +u[2]), u[4]);
	else if (s = P.maxOpen(Ca(s.content, i), !0), s.openStart || s.openEnd) {
		let e = 0, t = 0;
		for (let t = s.content.firstChild; e < s.openStart && !t.type.spec.isolating; e++, t = t.firstChild);
		for (let e = s.content.lastChild; t < s.openEnd && !e.type.spec.isolating; t++, e = e.lastChild);
		s = Oa(s, e, t);
	}
	return e.someProp("transformPasted", (t) => {
		s = t(s, e, c);
	}), s;
}
var Sa = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function Ca(e, t) {
	if (e.childCount < 2) return e;
	for (let n = t.depth; n >= 0; n--) {
		let r = t.node(n).contentMatchAt(t.index(n)), i, a = [];
		if (e.forEach((e) => {
			if (!a) return;
			let t = r.findWrapping(e.type), n;
			if (!t) return a = null;
			if (n = a.length && i.length && Ta(t, i, e, a[a.length - 1], 0)) a[a.length - 1] = n;
			else {
				a.length && (a[a.length - 1] = Ea(a[a.length - 1], i.length));
				let n = wa(e, t);
				a.push(n), r = r.matchType(n.type), i = t;
			}
		}), a) return M.from(a);
	}
	return e;
}
function wa(e, t, n = 0) {
	for (let r = t.length - 1; r >= n; r--) e = t[r].create(null, M.from(e));
	return e;
}
function Ta(e, t, n, r, i) {
	if (i < e.length && i < t.length && e[i] == t[i]) {
		let a = Ta(e, t, n, r.lastChild, i + 1);
		if (a) return r.copy(r.content.replaceChild(r.childCount - 1, a));
		if (r.contentMatchAt(r.childCount).matchType(i == e.length - 1 ? n.type : e[i + 1])) return r.copy(r.content.append(M.from(wa(n, e, i + 1))));
	}
}
function Ea(e, t) {
	if (t == 0) return e;
	let n = e.content.replaceChild(e.childCount - 1, Ea(e.lastChild, t - 1)), r = e.contentMatchAt(e.childCount).fillBefore(M.empty, !0);
	return e.copy(n.append(r));
}
function Da(e, t, n, r, i, a) {
	let o = t < 0 ? e.firstChild : e.lastChild, s = o.content;
	return e.childCount > 1 && (a = 0), i < r - 1 && (s = Da(s, t, n, r, i + 1, a)), i >= n && (s = t < 0 ? o.contentMatchAt(0).fillBefore(s, a <= i).append(s) : s.append(o.contentMatchAt(o.childCount).fillBefore(M.empty, !0))), e.replaceChild(t < 0 ? 0 : e.childCount - 1, o.copy(s));
}
function Oa(e, t, n) {
	return t < e.openStart && (e = new P(Da(e.content, -1, t, e.openStart, 0, e.openEnd), t, e.openEnd)), n < e.openEnd && (e = new P(Da(e.content, 1, n, e.openEnd, 0, 0), e.openStart, n)), e;
}
var ka = {
	thead: ["table"],
	tbody: ["table"],
	tfoot: ["table"],
	caption: ["table"],
	colgroup: ["table"],
	col: ["table", "colgroup"],
	tr: ["table", "tbody"],
	td: [
		"table",
		"tbody",
		"tr"
	],
	th: [
		"table",
		"tbody",
		"tr"
	]
}, Aa = null;
function ja() {
	return Aa ||= document.implementation.createHTMLDocument("title");
}
var Ma = null;
function Na(e) {
	let t = window.trustedTypes;
	return t ? (Ma ||= t.defaultPolicy || t.createPolicy("ProseMirrorClipboard", { createHTML: (e) => e }), Ma.createHTML(e)) : e;
}
function Pa(e) {
	let t = /^(\s*<meta [^>]*>)*/.exec(e);
	t && (e = e.slice(t[0].length));
	let n = ja().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(e), i;
	if ((i = r && ka[r[1].toLowerCase()]) && (e = i.map((e) => "<" + e + ">").join("") + e + i.map((e) => "</" + e + ">").reverse().join("")), n.innerHTML = Na(e), i) for (let e = 0; e < i.length; e++) n = n.querySelector(i[e]) || n;
	return n;
}
function Fa(e) {
	let t = e.querySelectorAll(H ? "span:not([class]):not([style])" : "span.Apple-converted-space");
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		r.childNodes.length == 1 && r.textContent == "\xA0" && r.parentNode && r.parentNode.replaceChild(e.ownerDocument.createTextNode(" "), r);
	}
}
function Ia(e, t) {
	if (!e.size) return e;
	let n = e.content.firstChild.type.schema, r;
	try {
		r = JSON.parse(t);
	} catch {
		return e;
	}
	let { content: i, openStart: a, openEnd: o } = e;
	for (let e = r.length - 2; e >= 0; e -= 2) {
		let t = n.nodes[r[e]];
		if (!t || t.hasRequiredAttrs()) break;
		i = M.from(t.create(r[e + 1], i)), a++, o++;
	}
	return new P(i, a, o);
}
var La = {}, Ra = {}, za = {
	touchstart: !0,
	touchmove: !0
}, Ba = class {
	constructor() {
		this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = {
			time: 0,
			x: 0,
			y: 0,
			type: "",
			button: 0
		}, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.badSafariComposition = !1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = Object.create(null), this.hideSelectionGuard = null;
	}
};
function Va(e) {
	for (let t in La) {
		let n = La[t];
		e.dom.addEventListener(t, e.input.eventHandlers[t] = (t) => {
			Ka(e, t) && !Ga(e, t) && (e.editable || !(t.type in Ra)) && n(e, t);
		}, za[t] ? { passive: !0 } : void 0);
	}
	U && e.dom.addEventListener("input", () => null), Wa(e);
}
function Ha(e, t) {
	e.input.lastSelectionOrigin = t, e.input.lastSelectionTime = Date.now();
}
function Ua(e) {
	e.input.mouseDown && e.input.mouseDown.done(), e.domObserver.stop();
	for (let t in e.input.eventHandlers) e.dom.removeEventListener(t, e.input.eventHandlers[t]);
	clearTimeout(e.input.composingTimeout), clearTimeout(e.input.lastIOSEnterFallbackTimeout);
}
function Wa(e) {
	e.someProp("handleDOMEvents", (t) => {
		for (let n in t) e.input.eventHandlers[n] || e.dom.addEventListener(n, e.input.eventHandlers[n] = (t) => Ga(e, t));
	});
}
function Ga(e, t) {
	return e.someProp("handleDOMEvents", (n) => {
		let r = n[t.type];
		return r ? r(e, t) || t.defaultPrevented : !1;
	});
}
function Ka(e, t) {
	if (!t.bubbles) return !0;
	if (t.defaultPrevented) return !1;
	for (let n = t.target; n != e.dom; n = n.parentNode) if (!n || n.nodeType == 11 || n.pmViewDesc && n.pmViewDesc.stopEvent(t)) return !1;
	return !0;
}
function qa(e, t) {
	!Ga(e, t) && La[t.type] && (e.editable || !(t.type in Ra)) && La[t.type](e, t);
}
Ra.keydown = (e, t) => {
	let n = t;
	if (e.input.shiftKey = n.keyCode == 16 || n.shiftKey, !uo(e) && (e.input.lastKeyCode = n.keyCode, e.input.lastKeyCodeTime = Date.now(), !(Ar && H && n.keyCode == 13))) if (n.keyCode != 229 && e.domObserver.forceFlush(), Dr && n.keyCode == 13 && !n.ctrlKey && !n.altKey && !n.metaKey) {
		let t = Date.now();
		e.input.lastIOSEnter = t, e.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
			e.input.lastIOSEnter == t && (e.someProp("handleKeyDown", (t) => t(e, pr(13, "Enter"))), e.input.lastIOSEnter = 0);
		}, 200);
	} else e.someProp("handleKeyDown", (t) => t(e, n)) || ya(e, n) ? n.preventDefault() : Ha(e, "key");
}, Ra.keyup = (e, t) => {
	t.keyCode == 16 && (e.input.shiftKey = !1);
}, Ra.keypress = (e, t) => {
	let n = t;
	if (uo(e) || !n.charCode || n.ctrlKey && !n.altKey || Or && n.metaKey) return;
	if (e.someProp("handleKeyPress", (t) => t(e, n))) {
		n.preventDefault();
		return;
	}
	let r = e.state.selection;
	if (!(r instanceof R) || !r.$from.sameParent(r.$to)) {
		let t = String.fromCharCode(n.charCode), i = () => e.state.tr.insertText(t).scrollIntoView();
		!/[\r\n]/.test(t) && !e.someProp("handleTextInput", (n) => n(e, r.$from.pos, r.$to.pos, t, i)) && e.dispatch(i()), n.preventDefault();
	}
};
function Ja(e) {
	return {
		left: e.clientX,
		top: e.clientY
	};
}
function Ya(e, t) {
	let n = t.x - e.clientX, r = t.y - e.clientY;
	return n * n + r * r < 100;
}
function Xa(e, t, n, r, i) {
	if (r == -1) return !1;
	let a = e.state.doc.resolve(r);
	for (let r = a.depth + 1; r > 0; r--) if (e.someProp(t, (t) => r > a.depth ? t(e, n, a.nodeAfter, a.before(r), i, !0) : t(e, n, a.node(r), a.before(r), i, !1))) return !0;
	return !1;
}
function Za(e, t, n) {
	if (e.focused || e.focus(), e.state.selection.eq(t)) return;
	let r = e.state.tr.setSelection(t);
	n == "pointer" && r.setMeta("pointer", !0), e.dispatch(r);
}
function Qa(e, t) {
	if (t == -1) return !1;
	let n = e.state.doc.resolve(t), r = n.nodeAfter;
	return r && r.isAtom && z.isSelectable(r) ? (Za(e, new z(n), "pointer"), !0) : !1;
}
function $a(e, t) {
	if (t == -1) return !1;
	let n = e.state.selection, r, i;
	n instanceof z && (r = n.node);
	let a = e.state.doc.resolve(t);
	for (let e = a.depth + 1; e > 0; e--) {
		let t = e > a.depth ? a.nodeAfter : a.node(e);
		if (z.isSelectable(t)) {
			i = r && n.$from.depth > 0 && e >= n.$from.depth && a.before(n.$from.depth + 1) == n.$from.pos ? a.before(n.$from.depth) : a.before(e);
			break;
		}
	}
	return i == null ? !1 : (Za(e, z.create(e.state.doc, i), "pointer"), !0);
}
function eo(e, t, n, r, i) {
	return Xa(e, "handleClickOn", t, n, r) || e.someProp("handleClick", (n) => n(e, t, r)) || (i ? $a(e, n) : Qa(e, n));
}
function to(e, t, n, r) {
	return Xa(e, "handleDoubleClickOn", t, n, r) || e.someProp("handleDoubleClick", (n) => n(e, t, r));
}
function no(e, t, n, r) {
	return Xa(e, "handleTripleClickOn", t, n, r) || e.someProp("handleTripleClick", (n) => n(e, t, r)) || ro(e, n, r);
}
function ro(e, t, n) {
	if (n.button != 0) return !1;
	let r = io(e, t, !0), i = e.state.doc;
	return r ? (Za(e, r, "pointer"), r instanceof R && i.eq(e.state.doc) && (e.input.mouseDown = new lo(e, r)), !0) : !1;
}
function io(e, t, n) {
	let r = e.state.doc;
	if (t == -1) return r.inlineContent ? R.create(r, 0, r.content.size) : null;
	let i = r.resolve(t);
	for (let e = i.depth + 1; e > 0; e--) {
		let t = e > i.depth ? i.nodeAfter : i.node(e), a = i.before(e);
		if (t.inlineContent) return R.create(r, a + 1, a + 1 + t.content.size);
		if (n && z.isSelectable(t)) return z.create(r, a);
	}
	return null;
}
function ao(e) {
	return _o(e);
}
var oo = Or ? "metaKey" : "ctrlKey";
La.mousedown = (e, t) => {
	let n = t;
	e.input.shiftKey = n.shiftKey;
	let r = ao(e), i = Date.now(), a = "singleClick";
	i - e.input.lastClick.time < 500 && Ya(n, e.input.lastClick) && !n[oo] && e.input.lastClick.button == n.button && (e.input.lastClick.type == "singleClick" ? a = "doubleClick" : e.input.lastClick.type == "doubleClick" && (a = "tripleClick")), e.input.lastClick = {
		time: i,
		x: n.clientX,
		y: n.clientY,
		type: a,
		button: n.button
	}, e.input.mouseDown && e.input.mouseDown.done();
	let o = e.posAtCoords(Ja(n));
	o && (a == "singleClick" ? e.input.mouseDown = new co(e, o, n, !!r) : (a == "doubleClick" ? to : no)(e, o.pos, o.inside, n) ? n.preventDefault() : Ha(e, "pointer"));
};
var so = class {
	constructor(e) {
		this.view = e, this.mightDrag = null, e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this));
	}
	up(e) {
		this.done();
	}
	move(e) {
		e.buttons == 0 && this.done();
	}
	done() {
		this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.view.input.mouseDown == this && (this.view.input.mouseDown = null);
	}
	delaySelUpdate() {
		return !1;
	}
}, co = class extends so {
	constructor(e, t, n, r) {
		super(e), this.pos = t, this.event = n, this.flushed = r, this.delayedSelectionSync = !1, this.startDoc = e.state.doc, this.selectNode = !!n[oo], this.allowDefault = n.shiftKey;
		let i, a;
		if (t.inside > -1) i = e.state.doc.nodeAt(t.inside), a = t.inside;
		else {
			let n = e.state.doc.resolve(t.pos);
			i = n.parent, a = n.depth ? n.before() : 0;
		}
		let o = r ? null : n.target, s = o ? e.docView.nearestDesc(o, !0) : null;
		this.target = s && s.nodeDOM.nodeType == 1 ? s.nodeDOM : null;
		let { selection: c } = e.state;
		n.button == 0 && (i.type.spec.draggable && i.type.spec.selectable !== !1 || c instanceof z && c.from <= a && c.to > a) && (this.mightDrag = {
			node: i,
			pos: a,
			addAttr: !!(this.target && !this.target.draggable),
			setUneditable: !!(this.target && wr && !this.target.hasAttribute("contentEditable"))
		}), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
			this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
		}, 20), this.view.domObserver.start()), Ha(e, "pointer");
	}
	done() {
		super.done(), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => {
			this.view.isDestroyed || Hi(this.view);
		});
	}
	up(e) {
		if (this.done(), !this.view.dom.contains(e.target)) return;
		let t = this.pos;
		this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(Ja(e))), this.updateAllowDefault(e), this.allowDefault || !t ? Ha(this.view, "pointer") : eo(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || U && this.mightDrag && !this.mightDrag.node.isAtom || H && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (Za(this.view, L.near(this.view.state.doc.resolve(t.pos)), "pointer"), e.preventDefault()) : Ha(this.view, "pointer");
	}
	move(e) {
		this.updateAllowDefault(e), Ha(this.view, "pointer"), super.move(e);
	}
	updateAllowDefault(e) {
		!this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
	}
	delaySelUpdate() {
		return this.allowDefault ? (this.delayedSelectionSync = !0, !0) : !1;
	}
}, lo = class extends so {
	constructor(e, t) {
		super(e), this.startSelection = t, this.startDoc = e.state.doc;
	}
	move(e) {
		if (e.buttons == 0 || this.view.isDestroyed || !this.view.state.doc.eq(this.startDoc)) {
			this.done();
			return;
		}
		e.preventDefault(), Ha(this.view, "pointer");
		let t = this.view.posAtCoords(Ja(e)), n = t && io(this.view, t.inside, !1);
		if (!n) return;
		let { doc: r } = this.view.state, i = this.startSelection, [a, o] = n.from < i.from ? [i.to, n.from] : [i.from, n.to];
		Za(this.view, R.create(r, a, o), "pointer");
	}
};
La.touchstart = (e) => {
	e.input.lastTouch = Date.now(), ao(e), Ha(e, "pointer");
}, La.touchmove = (e) => {
	e.input.lastTouch = Date.now(), Ha(e, "pointer");
}, La.contextmenu = (e) => ao(e);
function uo(e, t) {
	return e.composing ? !0 : U && Math.abs(Date.now() - e.input.compositionEndedAt) < 500 ? (e.input.compositionEndedAt = -2e8, !0) : !1;
}
var fo = Ar ? 5e3 : -1;
Ra.compositionstart = Ra.compositionupdate = (e) => {
	if (!e.composing) {
		e.domObserver.flush();
		let { state: t } = e, n = t.selection.$to;
		if (t.selection instanceof R && (t.storedMarks || !n.textOffset && n.parentOffset && n.nodeBefore.marks.some((e) => e.type.spec.inclusive === !1) || H && kr && po(e))) e.markCursor = e.state.storedMarks || n.marks(), _o(e, !0), e.markCursor = null;
		else if (_o(e, !t.selection.empty), wr && t.selection.empty && n.parentOffset && !n.textOffset && n.nodeBefore.marks.length) {
			let t = e.domSelectionRange();
			for (let n = t.focusNode, r = t.focusOffset; n && n.nodeType == 1 && r != 0;) {
				let t = r < 0 ? n.lastChild : n.childNodes[r - 1];
				if (!t) break;
				if (t.nodeType == 3) {
					let n = e.domSelection();
					n && n.collapse(t, t.nodeValue.length);
					break;
				} else n = t, r = -1;
			}
		}
		e.input.composing = !0;
	}
	mo(e, fo);
};
function po(e) {
	let { focusNode: t, focusOffset: n } = e.domSelectionRange();
	if (!t || t.nodeType != 1 || n >= t.childNodes.length) return !1;
	let r = t.childNodes[n];
	return r.nodeType == 1 && r.contentEditable == "false";
}
Ra.compositionend = (e, t) => {
	e.composing && (e.input.composing = !1, e.input.compositionEndedAt = Date.now(), e.input.compositionPendingChanges = e.domObserver.pendingRecords().length ? e.input.compositionID : 0, e.input.compositionNode = null, e.input.badSafariComposition ? e.domObserver.forceFlush() : e.input.compositionPendingChanges && Promise.resolve().then(() => e.domObserver.flush()), e.input.compositionID++, mo(e, 20));
};
function mo(e, t) {
	clearTimeout(e.input.composingTimeout), t > -1 && (e.input.composingTimeout = setTimeout(() => _o(e), t));
}
function ho(e) {
	for (e.composing && (e.input.composing = !1, e.input.compositionEndedAt = Date.now()); e.input.compositionNodes.length > 0;) e.input.compositionNodes.pop().markParentsDirty();
}
function go(e) {
	let t = e.domSelectionRange();
	if (!t.focusNode) return null;
	let n = cr(t.focusNode, t.focusOffset), r = lr(t.focusNode, t.focusOffset);
	if (n && r && n != r) {
		let t = r.pmViewDesc, i = e.domObserver.lastChangedTextNode;
		if (n == i || r == i) return i;
		if (!t || !t.isText(r.nodeValue)) return r;
		if (e.input.compositionNode == r) {
			let e = n.pmViewDesc;
			if (!(!e || !e.isText(n.nodeValue))) return r;
		}
	}
	return n || r;
}
function _o(e, t = !1) {
	if (!(Ar && e.domObserver.flushingSoon >= 0)) {
		if (e.domObserver.forceFlush(), ho(e), t || e.docView && e.docView.dirty) {
			let n = Bi(e), r = e.state.selection;
			return n && !n.eq(r) ? e.dispatch(e.state.tr.setSelection(n)) : (e.markCursor || t) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? e.dispatch(e.state.tr.deleteSelection()) : e.updateState(e.state), !0;
		}
		return !1;
	}
}
function vo(e, t) {
	if (!e.dom.parentNode) return;
	let n = e.dom.parentNode.appendChild(document.createElement("div"));
	n.appendChild(t), n.style.cssText = "position: fixed; left: -10000px; top: 10px";
	let r = getSelection(), i = document.createRange();
	i.selectNodeContents(t), e.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
		n.parentNode && n.parentNode.removeChild(n), e.focus();
	}, 50);
}
var yo = Sr && Cr < 15 || Dr && Mr < 604;
La.copy = Ra.cut = (e, t) => {
	let n = t, r = e.state.selection, i = n.type == "cut";
	if (r.empty) return;
	let a = yo ? null : n.clipboardData, { dom: o, text: s } = ba(e, r.content());
	a ? (n.preventDefault(), a.clearData(), a.setData("text/html", o.innerHTML), a.setData("text/plain", s)) : vo(e, o), i && e.dispatch(e.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function bo(e) {
	return e.openStart == 0 && e.openEnd == 0 && e.content.childCount == 1 ? e.content.firstChild : null;
}
function xo(e, t) {
	if (!e.dom.parentNode) return;
	let n = e.input.shiftKey || e.state.selection.$from.parent.type.spec.code, r = e.dom.parentNode.appendChild(document.createElement(n ? "textarea" : "div"));
	n || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
	let i = e.input.shiftKey && e.input.lastKeyCode != 45;
	setTimeout(() => {
		e.focus(), r.parentNode && r.parentNode.removeChild(r), n ? So(e, r.value, null, i, t) : So(e, r.textContent, r.innerHTML, i, t);
	}, 50);
}
function So(e, t, n, r, i) {
	let a = xa(e, t, n, r, e.state.selection.$from);
	if (e.someProp("handlePaste", (t) => t(e, i, a || P.empty))) return !0;
	if (!a) return !1;
	let o = bo(a), s = o ? e.state.tr.replaceSelectionWith(o, r) : e.state.tr.replaceSelection(a);
	return e.dispatch(s.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function Co(e) {
	let t = e.getData("text/plain") || e.getData("Text");
	if (t) return t;
	let n = e.getData("text/uri-list");
	return n ? n.replace(/\r?\n/g, " ") : "";
}
Ra.paste = (e, t) => {
	let n = t;
	if (e.composing && !Ar) return;
	let r = yo ? null : n.clipboardData, i = e.input.shiftKey && e.input.lastKeyCode != 45;
	r && So(e, Co(r), r.getData("text/html"), i, n) ? n.preventDefault() : xo(e, n);
};
var wo = class {
	constructor(e, t, n) {
		this.slice = e, this.move = t, this.node = n;
	}
}, To = Or ? "altKey" : "ctrlKey";
function Eo(e, t) {
	let n;
	return e.someProp("dragCopies", (e) => {
		n ||= e(t);
	}), n == null ? !t[To] : !n;
}
La.dragstart = (e, t) => {
	let n = t, r = e.input.mouseDown;
	if (r && r.done(), !n.dataTransfer) return;
	let i = e.state.selection, a = i.empty ? null : e.posAtCoords(Ja(n)), o;
	if (!(a && a.pos >= i.from && a.pos <= (i instanceof z ? i.to - 1 : i.to))) {
		if (r && r.mightDrag) o = z.create(e.state.doc, r.mightDrag.pos);
		else if (n.target && n.target.nodeType == 1) {
			let t = e.docView.nearestDesc(n.target, !0);
			t && t.node.type.spec.draggable && t != e.docView && (o = z.create(e.state.doc, t.posBefore));
		}
	}
	let { dom: s, text: c, slice: l } = ba(e, (o || e.state.selection).content());
	(!n.dataTransfer.files.length || !H || Er > 120) && n.dataTransfer.clearData(), n.dataTransfer.setData(yo ? "Text" : "text/html", s.innerHTML), n.dataTransfer.effectAllowed = "copyMove", yo || n.dataTransfer.setData("text/plain", c), e.dragging = new wo(l, Eo(e, n), o);
}, La.dragend = (e) => {
	let t = e.dragging;
	window.setTimeout(() => {
		e.dragging == t && (e.dragging = null);
	}, 50);
}, Ra.dragover = Ra.dragenter = (e, t) => t.preventDefault(), Ra.drop = (e, t) => {
	try {
		Do(e, t, e.dragging);
	} finally {
		e.dragging = null;
	}
};
function Do(e, t, n) {
	if (!t.dataTransfer) return;
	let r = e.posAtCoords(Ja(t));
	if (!r) return;
	let i = e.state.doc.resolve(r.pos), a = n && n.slice;
	a ? e.someProp("transformPasted", (t) => {
		a = t(a, e, !1);
	}) : a = xa(e, Co(t.dataTransfer), yo ? null : t.dataTransfer.getData("text/html"), !1, i);
	let o = !!(n && Eo(e, t));
	if (e.someProp("handleDrop", (n) => n(e, t, a || P.empty, o))) {
		t.preventDefault();
		return;
	}
	if (!a) return;
	t.preventDefault();
	let s = a ? dn(e.state.doc, i.pos, a) : i.pos;
	s ??= i.pos;
	let c = e.state.tr;
	if (o) {
		let { node: e } = n;
		e ? e.replace(c) : c.deleteSelection();
	}
	let l = c.mapping.map(s), u = a.openStart == 0 && a.openEnd == 0 && a.content.childCount == 1, d = c.doc;
	if (u ? c.replaceRangeWith(l, l, a.content.firstChild) : c.replaceRange(l, l, a), c.doc.eq(d)) return;
	let f = c.doc.resolve(l);
	if (u && z.isSelectable(a.content.firstChild) && f.nodeAfter && f.nodeAfter.sameMarkup(a.content.firstChild)) c.setSelection(new z(f));
	else {
		let t = c.mapping.map(s);
		c.mapping.maps[c.mapping.maps.length - 1].forEach((e, n, r, i) => t = i), c.setSelection(Zi(e, f, c.doc.resolve(t)));
	}
	e.focus(), e.dispatch(c.setMeta("uiEvent", "drop"));
}
La.focus = (e) => {
	e.input.lastFocus = Date.now(), e.focused || (e.domObserver.stop(), e.dom.classList.add("ProseMirror-focused"), e.domObserver.start(), e.focused = !0, setTimeout(() => {
		e.docView && e.hasFocus() && !e.domObserver.currentSelection.eq(e.domSelectionRange()) && Hi(e);
	}, 20));
}, La.blur = (e, t) => {
	let n = t;
	e.focused &&= (e.domObserver.stop(), e.dom.classList.remove("ProseMirror-focused"), e.domObserver.start(), n.relatedTarget && e.dom.contains(n.relatedTarget) && e.domObserver.currentSelection.clear(), !1);
}, La.beforeinput = (e, t) => {
	if (H && Ar && t.inputType == "deleteContentBackward") {
		e.domObserver.flushSoon();
		let { domChangeCount: t } = e.input;
		setTimeout(() => {
			if (e.input.domChangeCount != t || (e.dom.blur(), e.focus(), e.someProp("handleKeyDown", (t) => t(e, pr(8, "Backspace"))))) return;
			let { $cursor: n } = e.state.selection;
			n && n.pos > 0 && e.dispatch(e.state.tr.delete(n.pos - 1, n.pos).scrollIntoView());
		}, 50);
	}
};
for (let e in Ra) La[e] = Ra[e];
function Oo(e, t) {
	if (e == t) return !0;
	for (let n in e) if (e[n] !== t[n]) return !1;
	for (let n in t) if (!(n in e)) return !1;
	return !0;
}
var ko = class e {
	constructor(e, t) {
		this.toDOM = e, this.spec = t || Po, this.side = this.spec.side || 0;
	}
	map(e, t, n, r) {
		let { pos: i, deleted: a } = e.mapResult(t.from + r, this.side < 0 ? -1 : 1);
		return a ? null : new Mo(i - n, i - n, this);
	}
	valid() {
		return !0;
	}
	eq(t) {
		return this == t || t instanceof e && (this.spec.key && this.spec.key == t.spec.key || this.toDOM == t.toDOM && Oo(this.spec, t.spec));
	}
	destroy(e) {
		this.spec.destroy && this.spec.destroy(e);
	}
}, Ao = class e {
	constructor(e, t) {
		this.attrs = e, this.spec = t || Po;
	}
	map(e, t, n, r) {
		let i = e.map(t.from + r, this.spec.inclusiveStart ? -1 : 1) - n, a = e.map(t.to + r, this.spec.inclusiveEnd ? 1 : -1) - n;
		return i >= a ? null : new Mo(i, a, this);
	}
	valid(e, t) {
		return t.from < t.to;
	}
	eq(t) {
		return this == t || t instanceof e && Oo(this.attrs, t.attrs) && Oo(this.spec, t.spec);
	}
	static is(t) {
		return t.type instanceof e;
	}
	destroy() {}
}, jo = class e {
	constructor(e, t) {
		this.attrs = e, this.spec = t || Po;
	}
	map(e, t, n, r) {
		let i = e.mapResult(t.from + r, 1);
		if (i.deleted) return null;
		let a = e.mapResult(t.to + r, -1);
		return a.deleted || a.pos <= i.pos ? null : new Mo(i.pos - n, a.pos - n, this);
	}
	valid(e, t) {
		let { index: n, offset: r } = e.content.findIndex(t.from), i;
		return r == t.from && !(i = e.child(n)).isText && r + i.nodeSize == t.to;
	}
	eq(t) {
		return this == t || t instanceof e && Oo(this.attrs, t.attrs) && Oo(this.spec, t.spec);
	}
	destroy() {}
}, Mo = class e {
	constructor(e, t, n) {
		this.from = e, this.to = t, this.type = n;
	}
	copy(t, n) {
		return new e(t, n, this.type);
	}
	eq(e, t = 0) {
		return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
	}
	map(e, t, n) {
		return this.type.map(e, this, t, n);
	}
	static widget(t, n, r) {
		return new e(t, t, new ko(n, r));
	}
	static inline(t, n, r, i) {
		return new e(t, n, new Ao(r, i));
	}
	static node(t, n, r, i) {
		return new e(t, n, new jo(r, i));
	}
	get spec() {
		return this.type.spec;
	}
	get inline() {
		return this.type instanceof Ao;
	}
	get widget() {
		return this.type instanceof ko;
	}
}, No = [], Po = {}, Fo = class e {
	constructor(e, t) {
		this.local = e.length ? e : No, this.children = t.length ? t : No;
	}
	static create(e, t) {
		return t.length ? Ho(t, e, 0, Po) : W;
	}
	find(e, t, n) {
		let r = [];
		return this.findInner(e ?? 0, t ?? 1e9, r, 0, n), r;
	}
	findInner(e, t, n, r, i) {
		for (let a = 0; a < this.local.length; a++) {
			let o = this.local[a];
			o.from <= t && o.to >= e && (!i || i(o.spec)) && n.push(o.copy(o.from + r, o.to + r));
		}
		for (let a = 0; a < this.children.length; a += 3) if (this.children[a] < t && this.children[a + 1] > e) {
			let o = this.children[a] + 1;
			this.children[a + 2].findInner(e - o, t - o, n, r + o, i);
		}
	}
	map(e, t, n) {
		return this == W || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, n || Po);
	}
	mapInner(t, n, r, i, a) {
		let o;
		for (let e = 0; e < this.local.length; e++) {
			let s = this.local[e].map(t, r, i);
			s && s.type.valid(n, s) ? (o ||= []).push(s) : a.onRemove && a.onRemove(this.local[e].spec);
		}
		return this.children.length ? Lo(this.children, o || [], t, n, r, i, a) : o ? new e(o.sort(Uo), No) : W;
	}
	add(t, n) {
		return n.length ? this == W ? e.create(t, n) : this.addInner(t, n, 0) : this;
	}
	addInner(t, n, r) {
		let i, a = 0;
		t.forEach((e, t) => {
			let o = t + r, s;
			if (s = Bo(n, e, o)) {
				for (i ||= this.children.slice(); a < i.length && i[a] < t;) a += 3;
				i[a] == t ? i[a + 2] = i[a + 2].addInner(e, s, o + 1) : i.splice(a, 0, t, t + e.nodeSize, Ho(s, e, o + 1, Po)), a += 3;
			}
		});
		let o = Ro(a ? Vo(n) : n, -r);
		for (let e = 0; e < o.length; e++) o[e].type.valid(t, o[e]) || o.splice(e--, 1);
		return new e(o.length ? this.local.concat(o).sort(Uo) : this.local, i || this.children);
	}
	remove(e) {
		return e.length == 0 || this == W ? this : this.removeInner(e, 0);
	}
	removeInner(t, n) {
		let r = this.children, i = this.local;
		for (let e = 0; e < r.length; e += 3) {
			let i, a = r[e] + n, o = r[e + 1] + n;
			for (let e = 0, n; e < t.length; e++) (n = t[e]) && n.from > a && n.to < o && (t[e] = null, (i ||= []).push(n));
			if (!i) continue;
			r == this.children && (r = this.children.slice());
			let s = r[e + 2].removeInner(i, a + 1);
			s == W ? (r.splice(e, 3), e -= 3) : r[e + 2] = s;
		}
		if (i.length) {
			for (let e = 0, r; e < t.length; e++) if (r = t[e]) for (let e = 0; e < i.length; e++) i[e].eq(r, n) && (i == this.local && (i = this.local.slice()), i.splice(e--, 1));
		}
		return r == this.children && i == this.local ? this : i.length || r.length ? new e(i, r) : W;
	}
	forChild(t, n) {
		if (this == W) return this;
		if (n.isLeaf) return e.empty;
		let r, i;
		for (let e = 0; e < this.children.length; e += 3) if (this.children[e] >= t) {
			this.children[e] == t && (r = this.children[e + 2]);
			break;
		}
		let a = t + 1, o = a + n.content.size;
		for (let e = 0; e < this.local.length; e++) {
			let t = this.local[e];
			if (t.from < o && t.to > a && t.type instanceof Ao) {
				let e = Math.max(a, t.from) - a, n = Math.min(o, t.to) - a;
				e < n && (i ||= []).push(t.copy(e, n));
			}
		}
		if (i) {
			let t = new e(i.sort(Uo), No);
			return r ? new Io([t, r]) : t;
		}
		return r || W;
	}
	eq(t) {
		if (this == t) return !0;
		if (!(t instanceof e) || this.local.length != t.local.length || this.children.length != t.children.length) return !1;
		for (let e = 0; e < this.local.length; e++) if (!this.local[e].eq(t.local[e])) return !1;
		for (let e = 0; e < this.children.length; e += 3) if (this.children[e] != t.children[e] || this.children[e + 1] != t.children[e + 1] || !this.children[e + 2].eq(t.children[e + 2])) return !1;
		return !0;
	}
	locals(e) {
		return Wo(this.localsInner(e));
	}
	localsInner(e) {
		if (this == W) return No;
		if (e.inlineContent || !this.local.some(Ao.is)) return this.local;
		let t = [];
		for (let e = 0; e < this.local.length; e++) this.local[e].type instanceof Ao || t.push(this.local[e]);
		return t;
	}
	forEachSet(e) {
		e(this);
	}
};
Fo.empty = new Fo([], []), Fo.removeOverlap = Wo;
var W = Fo.empty, Io = class e {
	constructor(e) {
		this.members = e;
	}
	map(t, n) {
		let r = this.members.map((e) => e.map(t, n, Po));
		return e.from(r);
	}
	forChild(t, n) {
		if (n.isLeaf) return Fo.empty;
		let r = [];
		for (let i = 0; i < this.members.length; i++) {
			let a = this.members[i].forChild(t, n);
			a != W && (a instanceof e ? r = r.concat(a.members) : r.push(a));
		}
		return e.from(r);
	}
	eq(t) {
		if (!(t instanceof e) || t.members.length != this.members.length) return !1;
		for (let e = 0; e < this.members.length; e++) if (!this.members[e].eq(t.members[e])) return !1;
		return !0;
	}
	locals(e) {
		let t, n = !0;
		for (let r = 0; r < this.members.length; r++) {
			let i = this.members[r].localsInner(e);
			if (i.length) if (!t) t = i;
			else {
				n &&= (t = t.slice(), !1);
				for (let e = 0; e < i.length; e++) t.push(i[e]);
			}
		}
		return t ? Wo(n ? t : t.sort(Uo)) : No;
	}
	static from(t) {
		switch (t.length) {
			case 0: return W;
			case 1: return t[0];
			default: return new e(t.every((e) => e instanceof Fo) ? t : t.reduce((e, t) => e.concat(t instanceof Fo ? t : t.members), []));
		}
	}
	forEachSet(e) {
		for (let t = 0; t < this.members.length; t++) this.members[t].forEachSet(e);
	}
};
function Lo(e, t, n, r, i, a, o) {
	let s = e.slice();
	for (let e = 0, t = a; e < n.maps.length; e++) {
		let r = 0;
		n.maps[e].forEach((e, n, i, a) => {
			let o = a - i - (n - e);
			for (let i = 0; i < s.length; i += 3) {
				let a = s[i + 1];
				if (a < 0 || e > a + t - r) continue;
				let c = s[i] + t - r;
				n >= c ? s[i + 1] = e <= c ? -2 : -1 : e >= t && o && (s[i] += o, s[i + 1] += o);
			}
			r += o;
		}), t = n.maps[e].map(t, -1);
	}
	let c = !1;
	for (let t = 0; t < s.length; t += 3) if (s[t + 1] < 0) {
		if (s[t + 1] == -2) {
			c = !0, s[t + 1] = -1;
			continue;
		}
		let l = n.map(e[t] + a), u = l - i;
		if (u < 0 || u >= r.content.size) {
			c = !0;
			continue;
		}
		let d = n.map(e[t + 1] + a, -1) - i, { index: f, offset: p } = r.content.findIndex(u), m = r.maybeChild(f);
		if (m && p == u && p + m.nodeSize == d) {
			let r = s[t + 2].mapInner(n, m, l + 1, e[t] + a + 1, o);
			r == W ? (s[t + 1] = -2, c = !0) : (s[t] = u, s[t + 1] = d, s[t + 2] = r);
		} else c = !0;
	}
	if (c) {
		let c = Ho(zo(s, e, t, n, i, a, o), r, 0, o);
		t = c.local;
		for (let e = 0; e < s.length; e += 3) s[e + 1] < 0 && (s.splice(e, 3), e -= 3);
		for (let e = 0, t = 0; e < c.children.length; e += 3) {
			let n = c.children[e];
			for (; t < s.length && s[t] < n;) t += 3;
			s.splice(t, 0, c.children[e], c.children[e + 1], c.children[e + 2]);
		}
	}
	return new Fo(t.sort(Uo), s);
}
function Ro(e, t) {
	if (!t || !e.length) return e;
	let n = [];
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		n.push(new Mo(i.from + t, i.to + t, i.type));
	}
	return n;
}
function zo(e, t, n, r, i, a, o) {
	function s(e, t) {
		for (let a = 0; a < e.local.length; a++) {
			let s = e.local[a].map(r, i, t);
			s ? n.push(s) : o.onRemove && o.onRemove(e.local[a].spec);
		}
		for (let n = 0; n < e.children.length; n += 3) s(e.children[n + 2], e.children[n] + t + 1);
	}
	for (let n = 0; n < e.length; n += 3) e[n + 1] == -1 && s(e[n + 2], t[n] + a + 1);
	return n;
}
function Bo(e, t, n) {
	if (t.isLeaf) return null;
	let r = n + t.nodeSize, i = null;
	for (let t = 0, a; t < e.length; t++) (a = e[t]) && a.from > n && a.to < r && ((i ||= []).push(a), e[t] = null);
	return i;
}
function Vo(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) e[n] != null && t.push(e[n]);
	return t;
}
function Ho(e, t, n, r) {
	let i = [], a = !1;
	t.forEach((t, o) => {
		let s = Bo(e, t, o + n);
		if (s) {
			a = !0;
			let e = Ho(s, t, n + o + 1, r);
			e != W && i.push(o, o + t.nodeSize, e);
		}
	});
	let o = Ro(a ? Vo(e) : e, -n).sort(Uo);
	for (let e = 0; e < o.length; e++) o[e].type.valid(t, o[e]) || (r.onRemove && r.onRemove(o[e].spec), o.splice(e--, 1));
	return o.length || i.length ? new Fo(o, i) : W;
}
function Uo(e, t) {
	return e.from - t.from || e.to - t.to;
}
function Wo(e) {
	let t = e;
	for (let n = 0; n < t.length - 1; n++) {
		let r = t[n];
		if (r.from != r.to) for (let i = n + 1; i < t.length; i++) {
			let a = t[i];
			if (a.from == r.from) {
				a.to != r.to && (t == e && (t = e.slice()), t[i] = a.copy(a.from, r.to), Go(t, i + 1, a.copy(r.to, a.to)));
				continue;
			} else {
				a.from < r.to && (t == e && (t = e.slice()), t[n] = r.copy(r.from, a.from), Go(t, i, r.copy(a.from, r.to)));
				break;
			}
		}
	}
	return t;
}
function Go(e, t, n) {
	for (; t < e.length && Uo(n, e[t]) > 0;) t++;
	e.splice(t, 0, n);
}
function Ko(e) {
	let t = [];
	return e.someProp("decorations", (n) => {
		let r = n(e.state);
		r && r != W && t.push(r);
	}), e.cursorWrapper && t.push(Fo.create(e.state.doc, [e.cursorWrapper.deco])), Io.from(t);
}
var qo = {
	childList: !0,
	characterData: !0,
	characterDataOldValue: !0,
	attributes: !0,
	attributeOldValue: !0,
	subtree: !0
}, Jo = Sr && Cr <= 11, Yo = class {
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
}, Xo = class {
	constructor(e, t) {
		this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new Yo(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((t) => {
			for (let e = 0; e < t.length; e++) this.queue.push(t[e]);
			Sr && Cr <= 11 && t.some((e) => e.type == "childList" && e.removedNodes.length || e.type == "characterData" && e.oldValue.length > e.target.nodeValue.length) ? this.flushSoon() : U && e.composing && t.some((e) => e.type == "childList" && e.target.nodeName == "TR") ? (e.input.badSafariComposition = !0, this.flushSoon()) : this.flush();
		}), Jo && (this.onCharData = (e) => {
			this.queue.push({
				target: e.target,
				type: "characterData",
				oldValue: e.prevValue
			}), this.flushSoon();
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
		this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, qo)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
	}
	stop() {
		if (this.observer) {
			let e = this.observer.takeRecords();
			if (e.length) {
				for (let t = 0; t < e.length; t++) this.queue.push(e[t]);
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
		if (Qi(this.view)) {
			if (this.suppressingSelectionUpdates) return Hi(this.view);
			if (Sr && Cr <= 11 && !this.view.state.selection.empty) {
				let e = this.view.domSelectionRange();
				if (e.focusNode && ir(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)) return this.flushSoon();
			}
			this.flush();
		}
	}
	setCurSelection() {
		this.currentSelection.set(this.view.domSelectionRange());
	}
	ignoreSelectionChange(e) {
		if (!e.focusNode) return !0;
		let t = /* @__PURE__ */ new Set(), n;
		for (let n = e.focusNode; n; n = er(n)) t.add(n);
		for (let r = e.anchorNode; r; r = er(r)) if (t.has(r)) {
			n = r;
			break;
		}
		let r = n && this.view.docView.nearestDesc(n);
		if (r && r.ignoreMutation({
			type: "selection",
			target: n.nodeType == 3 ? n.parentNode : n
		})) return this.setCurSelection(), !0;
	}
	pendingRecords() {
		if (this.observer) for (let e of this.observer.takeRecords()) this.queue.push(e);
		return this.queue;
	}
	flush() {
		let { view: e } = this;
		if (!e.docView || this.flushingSoon > -1) return;
		let t = this.pendingRecords();
		t.length && (this.queue = []);
		let n = e.domSelectionRange(), r = !this.suppressingSelectionUpdates && !this.currentSelection.eq(n) && Qi(e) && !this.ignoreSelectionChange(n), i = -1, a = -1, o = !1, s = [];
		if (e.editable) for (let e = 0; e < t.length; e++) {
			let n = this.registerMutation(t[e], s);
			n && (i = i < 0 ? n.from : Math.min(n.from, i), a = a < 0 ? n.to : Math.max(n.to, a), n.typeOver && (o = !0));
		}
		if (s.some((e) => e.nodeName == "BR") && (e.input.lastKeyCode == 8 || e.input.lastKeyCode == 46 || H && (e.composing || e.input.compositionEndedAt > Date.now() - 50) && t.some((e) => e.type == "childList" && e.removedNodes.length))) {
			for (let e of s) if (e.nodeName == "BR" && e.parentNode) {
				let t = e.nextSibling;
				for (; t && t.nodeType == 1;) {
					if (t.contentEditable == "false") {
						e.parentNode.removeChild(e);
						break;
					}
					t = t.firstChild;
				}
			}
		} else if (wr && s.length) {
			let t = s.filter((e) => e.nodeName == "BR");
			if (t.length == 2) {
				let [e, n] = t;
				e.parentNode && e.parentNode.parentNode == n.parentNode ? n.remove() : e.remove();
			} else {
				let { focusNode: n } = this.currentSelection;
				for (let r of t) {
					let t = r.parentNode;
					t && t.nodeName == "LI" && (!n || ns(e, n) != t) && r.remove();
				}
			}
		}
		let c = null;
		i < 0 && r && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && fr(n) && (c = Bi(e)) && c.eq(L.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, Hi(e), this.currentSelection.set(n), e.scrollToSelection()) : (i > -1 || r) && (i > -1 && (e.docView.markDirty(i, a), $o(e)), e.input.badSafariComposition && (e.input.badSafariComposition = !1, rs(e, s)), this.handleDOMChange(i, a, o, s), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(n) || Hi(e), this.currentSelection.set(n));
	}
	registerMutation(e, t) {
		if (t.indexOf(e.target) > -1) return null;
		let n = this.view.docView.nearestDesc(e.target);
		if (e.type == "attributes" && (n == this.view.docView || e.attributeName == "contenteditable" || e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !n || n.ignoreMutation(e)) return null;
		if (e.type == "childList") {
			for (let n = 0; n < e.addedNodes.length; n++) {
				let r = e.addedNodes[n];
				t.push(r), r.nodeType == 3 && (this.lastChangedTextNode = r);
			}
			if (n.contentDOM && n.contentDOM != n.dom && !n.contentDOM.contains(e.target)) return {
				from: n.posBefore,
				to: n.posAfter
			};
			let r = e.previousSibling, i = e.nextSibling;
			if (Sr && Cr <= 11 && e.addedNodes.length) for (let t = 0; t < e.addedNodes.length; t++) {
				let { previousSibling: n, nextSibling: a } = e.addedNodes[t];
				(!n || Array.prototype.indexOf.call(e.addedNodes, n) < 0) && (r = n), (!a || Array.prototype.indexOf.call(e.addedNodes, a) < 0) && (i = a);
			}
			let a = r && r.parentNode == e.target ? V(r) + 1 : 0, o = n.localPosFromDOM(e.target, a, -1), s = i && i.parentNode == e.target ? V(i) : e.target.childNodes.length;
			return {
				from: o,
				to: n.localPosFromDOM(e.target, s, 1)
			};
		} else if (e.type == "attributes") return {
			from: n.posAtStart - n.border,
			to: n.posAtEnd + n.border
		};
		else return this.lastChangedTextNode = e.target, {
			from: n.posAtStart,
			to: n.posAtEnd,
			typeOver: e.target.nodeValue == e.oldValue
		};
	}
}, Zo = /* @__PURE__ */ new WeakMap(), Qo = !1;
function $o(e) {
	if (!Zo.has(e) && (Zo.set(e, null), [
		"normal",
		"nowrap",
		"pre-line"
	].indexOf(getComputedStyle(e.dom).whiteSpace) !== -1)) {
		if (e.requiresGeckoHackNode = wr, Qo) return;
		console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), Qo = !0;
	}
}
function es(e, t) {
	let n = t.startContainer, r = t.startOffset, i = t.endContainer, a = t.endOffset, o = e.domAtPos(e.state.selection.anchor);
	return ir(o.node, o.offset, i, a) && ([n, r, i, a] = [
		i,
		a,
		n,
		r
	]), {
		anchorNode: n,
		anchorOffset: r,
		focusNode: i,
		focusOffset: a
	};
}
function ts(e, t) {
	if (t.getComposedRanges) {
		let n = t.getComposedRanges(e.root)[0];
		if (n) return es(e, n);
	}
	let n;
	function r(e) {
		e.preventDefault(), e.stopImmediatePropagation(), n = e.getTargetRanges()[0];
	}
	return e.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), e.dom.removeEventListener("beforeinput", r, !0), n ? es(e, n) : null;
}
function ns(e, t) {
	for (let n = t.parentNode; n && n != e.dom; n = n.parentNode) {
		let t = e.docView.nearestDesc(n, !0);
		if (t && t.node.isBlock) return n;
	}
	return null;
}
function rs(e, t) {
	let { focusNode: n, focusOffset: r } = e.domSelectionRange();
	for (let i of t) if (i.parentNode?.nodeName == "TR") {
		let t = i.nextSibling;
		for (; t && t.nodeName != "TD" && t.nodeName != "TH";) t = t.nextSibling;
		if (t) {
			let a = t;
			for (;;) {
				let e = a.firstChild;
				if (!e || e.nodeType != 1 || e.contentEditable == "false" || /^(BR|IMG)$/.test(e.nodeName)) break;
				a = e;
			}
			a.insertBefore(i, a.firstChild), n == i && e.domSelection().collapse(i, r);
		} else i.parentNode.removeChild(i);
	}
}
function is(e, t, n) {
	let { node: r, fromOffset: i, toOffset: a, from: o, to: s } = e.docView.parseRange(t, n), c = e.domSelectionRange(), l, u = c.anchorNode;
	if (u && e.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (l = [{
		node: u,
		offset: c.anchorOffset
	}], fr(c) || l.push({
		node: c.focusNode,
		offset: c.focusOffset
	})), H && e.input.lastKeyCode === 8) for (let e = a; e > i; e--) {
		let t = r.childNodes[e - 1], n = t.pmViewDesc;
		if (t.nodeName == "BR" && !n) {
			a = e;
			break;
		}
		if (!n || n.size) break;
	}
	let d = e.state.doc, f = e.someProp("domParser") || Qe.fromSchema(e.state.schema), p = d.resolve(o), m = null, h = f.parse(r, {
		topNode: p.parent,
		topMatch: p.parent.contentMatchAt(p.index()),
		topOpen: !0,
		from: i,
		to: a,
		preserveWhitespace: p.parent.type.whitespace == "pre" ? "full" : !0,
		findPositions: l,
		ruleFromNode: as,
		context: p
	});
	if (l && l[0].pos != null) {
		let e = l[0].pos, t = l[1] && l[1].pos;
		t ??= e, m = {
			anchor: e + o,
			head: t + o
		};
	}
	return {
		doc: h,
		sel: m,
		from: o,
		to: s
	};
}
function as(e) {
	let t = e.pmViewDesc;
	if (t) return t.parseRule();
	if (e.nodeName == "BR" && e.parentNode) {
		if (U && /^(ul|ol)$/i.test(e.parentNode.nodeName)) {
			let e = document.createElement("div");
			return e.appendChild(document.createElement("li")), { skip: e };
		} else if (e.parentNode.lastChild == e || U && /^(tr|table)$/i.test(e.parentNode.nodeName)) return { ignore: !0 };
	} else if (e.nodeName == "IMG" && e.getAttribute("mark-placeholder")) return { ignore: !0 };
	return null;
}
var ss = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function cs(e, t, n, r, i) {
	let a = e.input.compositionPendingChanges || (e.composing ? e.input.compositionID : 0);
	if (e.input.compositionPendingChanges = 0, t < 0) {
		let t = e.input.lastSelectionTime > Date.now() - 50 ? e.input.lastSelectionOrigin : null, n = Bi(e, t);
		if (n && !e.state.selection.eq(n)) {
			if (H && Ar && e.input.lastKeyCode === 13 && Date.now() - 100 < e.input.lastKeyCodeTime && e.someProp("handleKeyDown", (t) => t(e, pr(13, "Enter")))) return;
			let r = e.state.tr.setSelection(n);
			t == "pointer" ? r.setMeta("pointer", !0) : t == "key" && r.scrollIntoView(), a && r.setMeta("composition", a), e.dispatch(r);
		}
		return;
	}
	let o = e.state.doc.resolve(t), s = o.sharedDepth(n);
	t = o.before(s + 1), n = e.state.doc.resolve(n).after(s + 1);
	let c = e.state.selection, l = is(e, t, n), u = e.state.doc, d = u.slice(l.from, l.to), f, p;
	e.input.lastKeyCode === 8 && Date.now() - 100 < e.input.lastKeyCodeTime ? (f = e.state.selection.to, p = "end") : (f = e.state.selection.from, p = "start"), e.input.lastKeyCode = null;
	let m = ps(d.content, l.doc.content, l.from, f, p);
	if (m && e.input.domChangeCount++, (Dr && e.input.lastIOSEnter > Date.now() - 225 || Ar) && i.some((e) => e.nodeType == 1 && !ss.test(e.nodeName)) && (!m || m.endA >= m.endB) && e.someProp("handleKeyDown", (t) => t(e, pr(13, "Enter")))) {
		e.input.lastIOSEnter = 0;
		return;
	}
	if (!m) if (r && c instanceof R && !c.empty && c.$head.sameParent(c.$anchor) && !e.composing && !(l.sel && l.sel.anchor != l.sel.head)) m = {
		start: c.from,
		endA: c.to,
		endB: c.to
	};
	else {
		if (l.sel) {
			let t = ls(e, e.state.doc, l.sel);
			if (t && !t.eq(e.state.selection)) {
				let n = e.state.tr.setSelection(t);
				a && n.setMeta("composition", a), e.dispatch(n);
			}
		}
		return;
	}
	e.state.selection.from < e.state.selection.to && m.start == m.endB && e.state.selection instanceof R && (m.start > e.state.selection.from && m.start <= e.state.selection.from + 2 && e.state.selection.from >= l.from ? m.start = e.state.selection.from : m.endA < e.state.selection.to && m.endA >= e.state.selection.to - 2 && e.state.selection.to <= l.to && (m.endB += e.state.selection.to - m.endA, m.endA = e.state.selection.to)), Sr && Cr <= 11 && m.endB == m.start + 1 && m.endA == m.start && m.start > l.from && l.doc.textBetween(m.start - l.from - 1, m.start - l.from + 1) == " \xA0" && (m.start--, m.endA--, m.endB--);
	let h = l.doc.resolveNoCache(m.start - l.from), g = l.doc.resolveNoCache(m.endB - l.from), _ = u.resolve(m.start), v = h.sameParent(g) && h.parent.inlineContent && _.end() >= m.endA;
	if ((Dr && e.input.lastIOSEnter > Date.now() - 225 && (!v || i.some((e) => e.nodeName == "DIV" || e.nodeName == "P")) || !v && h.pos < l.doc.content.size && (!h.sameParent(g) || !h.parent.inlineContent) && h.pos < g.pos && !/\S/.test(l.doc.textBetween(h.pos, g.pos, "", ""))) && e.someProp("handleKeyDown", (t) => t(e, pr(13, "Enter")))) {
		e.input.lastIOSEnter = 0;
		return;
	}
	if (e.state.selection.anchor > m.start && ds(u, m.start, m.endA, h, g) && e.someProp("handleKeyDown", (t) => t(e, pr(8, "Backspace")))) {
		Ar && H && e.domObserver.suppressSelectionUpdates();
		return;
	}
	H && m.endB == m.start && (e.input.lastChromeDelete = Date.now()), Ar && !v && h.start() != g.start() && g.parentOffset == 0 && h.depth == g.depth && l.sel && l.sel.anchor == l.sel.head && l.sel.head == m.endA && (m.endB -= 2, g = l.doc.resolveNoCache(m.endB - l.from), setTimeout(() => {
		e.someProp("handleKeyDown", function(t) {
			return t(e, pr(13, "Enter"));
		});
	}, 20));
	let y = m.start, b = m.endA, x = (t) => {
		let n = t || e.state.tr.replace(y, b, l.doc.slice(m.start - l.from, m.endB - l.from));
		if (l.sel) {
			let t = ls(e, n.doc, l.sel);
			t && !(H && e.composing && t.empty && (m.start != m.endB || e.input.lastChromeDelete < Date.now() - 100) && (t.head == y || t.head == n.mapping.map(b) - 1) || Sr && t.empty && t.head == y) && n.setSelection(t);
		}
		return a && n.setMeta("composition", a), n.scrollIntoView();
	}, S;
	if (v) if (h.pos == g.pos) {
		Sr && Cr <= 11 && h.parentOffset == 0 && (e.domObserver.suppressSelectionUpdates(), setTimeout(() => Hi(e), 20));
		let t = x(e.state.tr.delete(y, b)), n = u.resolve(m.start).marksAcross(u.resolve(m.endA));
		n && t.ensureMarks(n), e.dispatch(t);
	} else if (m.endA == m.endB && (S = us(h.parent.content.cut(h.parentOffset, g.parentOffset), _.parent.content.cut(_.parentOffset, m.endA - _.start())))) {
		let t = x(e.state.tr);
		S.type == "add" ? t.addMark(y, b, S.mark) : t.removeMark(y, b, S.mark), e.dispatch(t);
	} else if (h.parent.child(h.index()).isText && h.index() == g.index() - +!g.textOffset) {
		let t = h.parent.textBetween(h.parentOffset, g.parentOffset), n = () => x(e.state.tr.insertText(t, y, b));
		e.someProp("handleTextInput", (r) => r(e, y, b, t, n)) || e.dispatch(n());
	} else e.dispatch(x());
	else e.dispatch(x());
}
function ls(e, t, n) {
	return Math.max(n.anchor, n.head) > t.content.size ? null : Zi(e, t.resolve(n.anchor), t.resolve(n.head));
}
function us(e, t) {
	let n = e.firstChild.marks, r = t.firstChild.marks, i = n, a = r, o, s, c;
	for (let e = 0; e < r.length; e++) i = r[e].removeFromSet(i);
	for (let e = 0; e < n.length; e++) a = n[e].removeFromSet(a);
	if (i.length == 1 && a.length == 0) s = i[0], o = "add", c = (e) => e.mark(s.addToSet(e.marks));
	else if (i.length == 0 && a.length == 1) s = a[0], o = "remove", c = (e) => e.mark(s.removeFromSet(e.marks));
	else return null;
	let l = [];
	for (let e = 0; e < t.childCount; e++) l.push(c(t.child(e)));
	if (M.from(l).eq(e)) return {
		mark: s,
		type: o
	};
}
function ds(e, t, n, r, i) {
	if (n - t <= i.pos - r.pos || fs(r, !0, !1) < i.pos) return !1;
	let a = e.resolve(t);
	if (!r.parent.isTextblock) {
		let e = a.nodeAfter;
		return e != null && n == t + e.nodeSize;
	}
	if (a.parentOffset < a.parent.content.size || !a.parent.isTextblock) return !1;
	let o = e.resolve(fs(a, !0, !0));
	return !o.parent.isTextblock || o.pos > n || fs(o, !0, !1) < n ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function fs(e, t, n) {
	let r = e.depth, i = t ? e.end() : e.pos;
	for (; r > 0 && (t || e.indexAfter(r) == e.node(r).childCount);) r--, i++, t = !1;
	if (n) {
		let t = e.node(r).maybeChild(e.indexAfter(r));
		for (; t && !t.isLeaf;) t = t.firstChild, i++;
	}
	return i;
}
function ps(e, t, n, r, i) {
	let a = e.findDiffStart(t, n), o = n + e.size, s = n + t.size;
	if (a == null) return null;
	let { a: c, b: l } = e.findDiffEnd(t, o, s);
	if (i == "end") {
		let e = Math.max(0, a - Math.min(c, l));
		r -= c + e - a;
	}
	if (c < a && o < s) {
		let e = r <= a && r >= c ? a - r : 0;
		a -= e, l = a + (l - c), c = a;
	} else if (l < a) {
		let e = r <= a && r >= l ? a - r : 0;
		a -= e, c = a + (c - l), l = a;
	}
	return {
		start: a,
		endA: c,
		endB: l
	};
}
var ms = class {
	constructor(e, t) {
		this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new Ba(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(xs), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = _s(this), gs(this), this.nodeViews = ys(this), this.docView = bi(this.state.doc, hs(this), Ko(this), this.dom, this), this.domObserver = new Xo(this, (e, t, n, r) => cs(this, e, t, n, r)), this.domObserver.start(), Va(this), this.updatePluginViews();
	}
	get composing() {
		return this.input.composing;
	}
	get props() {
		if (this._props.state != this.state) {
			let e = this._props;
			this._props = {};
			for (let t in e) this._props[t] = e[t];
			this._props.state = this.state;
		}
		return this._props;
	}
	update(e) {
		e.handleDOMEvents != this._props.handleDOMEvents && Wa(this);
		let t = this._props;
		this._props = e, e.plugins && (e.plugins.forEach(xs), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
	}
	setProps(e) {
		let t = {};
		for (let e in this._props) t[e] = this._props[e];
		t.state = this.state;
		for (let n in e) t[n] = e[n];
		this.update(t);
	}
	updateState(e) {
		this.updateStateInner(e, this._props);
	}
	updateStateInner(e, t) {
		let n = this.state, r = !1, i = !1;
		e.storedMarks && this.composing && (ho(this), i = !0), this.state = e;
		let a = n.plugins != e.plugins || this._props.plugins != t.plugins;
		if (a || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
			let e = ys(this);
			bs(e, this.nodeViews) && (this.nodeViews = e, r = !0);
		}
		(a || t.handleDOMEvents != this._props.handleDOMEvents) && Wa(this), this.editable = _s(this), gs(this);
		let o = Ko(this), s = hs(this), c = n.plugins != e.plugins && !n.doc.eq(e.doc) ? "reset" : e.scrollToSelection > n.scrollToSelection ? "to selection" : "preserve", l = r || !this.docView.matchesNode(e.doc, s, o);
		(l || !e.selection.eq(n.selection)) && (i = !0);
		let u = c == "preserve" && i && this.dom.style.overflowAnchor == null && Lr(this);
		if (i) {
			this.domObserver.stop();
			let t = l && (Sr || H) && !this.composing && !n.selection.empty && !e.selection.empty && vs(n.selection, e.selection);
			if (l) {
				let n = H ? this.trackWrites = this.domSelectionRange().focusNode : null;
				this.composing && (this.input.compositionNode = go(this)), (r || !this.docView.update(e.doc, s, o, this)) && (this.docView.updateOuterDeco(s), this.docView.destroy(), this.docView = bi(e.doc, s, o, this.dom, this)), n && (!this.trackWrites || !this.dom.contains(this.trackWrites)) && (t = !0);
			}
			let i = this.input.mouseDown;
			t || !(i && this.domObserver.currentSelection.eq(this.domSelectionRange()) && ea(this) && i.delaySelUpdate()) ? Hi(this, t) : (Yi(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
		}
		this.updatePluginViews(n), this.dragging?.node && !n.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, n), c == "reset" ? this.dom.scrollTop = 0 : c == "to selection" ? this.scrollToSelection() : u && zr(u);
	}
	scrollToSelection() {
		let e = this.domSelectionRange().focusNode;
		if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode)) && !this.someProp("handleScrollToSelection", (e) => e(this))) if (this.state.selection instanceof z) {
			let t = this.docView.domAfterPos(this.state.selection.from);
			t.nodeType == 1 && Ir(this, t.getBoundingClientRect(), e);
		} else Ir(this, this.coordsAtPos(this.state.selection.head, 1), e);
	}
	destroyPluginViews() {
		let e;
		for (; e = this.pluginViews.pop();) e.destroy && e.destroy();
	}
	updatePluginViews(e) {
		if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
			this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
			for (let e = 0; e < this.directPlugins.length; e++) {
				let t = this.directPlugins[e];
				t.spec.view && this.pluginViews.push(t.spec.view(this));
			}
			for (let e = 0; e < this.state.plugins.length; e++) {
				let t = this.state.plugins[e];
				t.spec.view && this.pluginViews.push(t.spec.view(this));
			}
		} else for (let t = 0; t < this.pluginViews.length; t++) {
			let n = this.pluginViews[t];
			n.update && n.update(this, e);
		}
	}
	updateDraggedNode(e, t) {
		let n = e.node, r = -1;
		if (n.from < this.state.doc.content.size && this.state.doc.nodeAt(n.from) == n.node) r = n.from;
		else {
			let e = n.from + (this.state.doc.content.size - t.doc.content.size);
			(e > 0 && e < this.state.doc.content.size && this.state.doc.nodeAt(e)) == n.node && (r = e);
		}
		this.dragging = new wo(e.slice, e.move, r < 0 ? void 0 : z.create(this.state.doc, r));
	}
	someProp(e, t) {
		let n = this._props && this._props[e], r;
		if (n != null && (r = t ? t(n) : n)) return r;
		for (let n = 0; n < this.directPlugins.length; n++) {
			let i = this.directPlugins[n].props[e];
			if (i != null && (r = t ? t(i) : i)) return r;
		}
		let i = this.state.plugins;
		if (i) for (let n = 0; n < i.length; n++) {
			let a = i[n].props[e];
			if (a != null && (r = t ? t(a) : a)) return r;
		}
	}
	hasFocus() {
		if (Sr) {
			let e = this.root.activeElement;
			if (e == this.dom) return !0;
			if (!e || !this.dom.contains(e)) return !1;
			for (; e && this.dom != e && this.dom.contains(e);) {
				if (e.contentEditable == "false") return !1;
				e = e.parentElement;
			}
			return !0;
		}
		return this.root.activeElement == this.dom;
	}
	focus() {
		this.domObserver.stop(), this.editable && Hr(this.dom), Hi(this), this.domObserver.start();
	}
	get root() {
		let e = this._root;
		if (e == null) {
			for (let e = this.dom.parentNode; e; e = e.parentNode) if (e.nodeType == 9 || e.nodeType == 11 && e.host) return e.getSelection || (Object.getPrototypeOf(e).getSelection = () => e.ownerDocument.getSelection()), this._root = e;
		}
		return e || document;
	}
	updateRoot() {
		this._root = null;
	}
	posAtCoords(e) {
		return Xr(this, e);
	}
	coordsAtPos(e, t = 1) {
		return ei(this, e, t);
	}
	domAtPos(e, t = 0) {
		return this.docView.domFromPos(e, t);
	}
	nodeDOM(e) {
		let t = this.docView.descAt(e);
		return t ? t.nodeDOM : null;
	}
	posAtDOM(e, t, n = -1) {
		let r = this.docView.posFromDOM(e, t, n);
		if (r == null) throw RangeError("DOM position not inside the editor");
		return r;
	}
	endOfTextblock(e, t) {
		return ui(this, t || this.state, e);
	}
	pasteHTML(e, t) {
		return So(this, "", e, !1, t || new ClipboardEvent("paste"));
	}
	pasteText(e, t) {
		return So(this, e, null, !0, t || new ClipboardEvent("paste"));
	}
	serializeForClipboard(e) {
		return ba(this, e);
	}
	destroy() {
		this.docView && (Ua(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], Ko(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, rr());
	}
	get isDestroyed() {
		return this.docView == null;
	}
	dispatchEvent(e) {
		return qa(this, e);
	}
	domSelectionRange() {
		let e = this.domSelection();
		return e ? U && this.root.nodeType === 11 && mr(this.dom.ownerDocument) == this.dom && ts(this, e) || e : {
			focusNode: null,
			focusOffset: 0,
			anchorNode: null,
			anchorOffset: 0
		};
	}
	domSelection() {
		return this.root.getSelection();
	}
};
ms.prototype.dispatch = function(e) {
	let t = this._props.dispatchTransaction;
	t ? t.call(this, e) : this.updateState(this.state.apply(e));
};
function hs(e) {
	let t = Object.create(null);
	return t.class = "ProseMirror", t.contenteditable = String(e.editable), e.someProp("attributes", (n) => {
		if (typeof n == "function" && (n = n(e.state)), n) for (let e in n) e == "class" ? t.class += " " + n[e] : e == "style" ? t.style = (t.style ? t.style + ";" : "") + n[e] : !t[e] && e != "contenteditable" && e != "nodeName" && (t[e] = String(n[e]));
	}), t.translate ||= "no", [Mo.node(0, e.state.doc.content.size, t)];
}
function gs(e) {
	if (e.markCursor) {
		let t = document.createElement("img");
		t.className = "ProseMirror-separator", t.setAttribute("mark-placeholder", "true"), t.setAttribute("alt", ""), e.cursorWrapper = {
			dom: t,
			deco: Mo.widget(e.state.selection.from, t, {
				raw: !0,
				marks: e.markCursor
			})
		};
	} else e.cursorWrapper = null;
}
function _s(e) {
	return !e.someProp("editable", (t) => t(e.state) === !1);
}
function vs(e, t) {
	let n = Math.min(e.$anchor.sharedDepth(e.head), t.$anchor.sharedDepth(t.head));
	return e.$anchor.start(n) != t.$anchor.start(n);
}
function ys(e) {
	let t = Object.create(null);
	function n(e) {
		for (let n in e) Object.prototype.hasOwnProperty.call(t, n) || (t[n] = e[n]);
	}
	return e.someProp("nodeViews", n), e.someProp("markViews", n), t;
}
function bs(e, t) {
	let n = 0, r = 0;
	for (let r in e) {
		if (e[r] != t[r]) return !0;
		n++;
	}
	for (let e in t) r++;
	return n != r;
}
function xs(e) {
	if (e.spec.state || e.spec.filterTransaction || e.spec.appendTransaction) throw RangeError("Plugins passed directly to the view must not have a state component");
}
for (var Ss = {
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
}, Cs = {
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
	222: "\""
}, ws = typeof navigator < "u" && /Mac/.test(navigator.platform), Ts = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), Es = 0; Es < 10; Es++) Ss[48 + Es] = Ss[96 + Es] = String(Es);
for (var Es = 1; Es <= 24; Es++) Ss[Es + 111] = "F" + Es;
for (var Es = 65; Es <= 90; Es++) Ss[Es] = String.fromCharCode(Es + 32), Cs[Es] = String.fromCharCode(Es);
for (var Ds in Ss) Cs.hasOwnProperty(Ds) || (Cs[Ds] = Ss[Ds]);
function Os(e) {
	var t = !(ws && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey || Ts && e.shiftKey && e.key && e.key.length == 1 || e.key == "Unidentified") && e.key || (e.shiftKey ? Cs : Ss)[e.keyCode] || e.key || "Unidentified";
	return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
//#endregion
//#region node_modules/prosemirror-keymap/dist/index.js
var ks = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), As = typeof navigator < "u" && /Win/.test(navigator.platform);
function js(e) {
	let t = e.split(/-(?!$)/), n = t[t.length - 1];
	n == "Space" && (n = " ");
	let r, i, a, o;
	for (let e = 0; e < t.length - 1; e++) {
		let n = t[e];
		if (/^(cmd|meta|m)$/i.test(n)) o = !0;
		else if (/^a(lt)?$/i.test(n)) r = !0;
		else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
		else if (/^s(hift)?$/i.test(n)) a = !0;
		else if (/^mod$/i.test(n)) ks ? o = !0 : i = !0;
		else throw Error("Unrecognized modifier name: " + n);
	}
	return r && (n = "Alt-" + n), i && (n = "Ctrl-" + n), o && (n = "Meta-" + n), a && (n = "Shift-" + n), n;
}
function Ms(e) {
	let t = Object.create(null);
	for (let n in e) t[js(n)] = e[n];
	return t;
}
function Ns(e, t, n = !0) {
	return t.altKey && (e = "Alt-" + e), t.ctrlKey && (e = "Ctrl-" + e), t.metaKey && (e = "Meta-" + e), n && t.shiftKey && (e = "Shift-" + e), e;
}
function Ps(e) {
	return new B({ props: { handleKeyDown: Fs(e) } });
}
function Fs(e) {
	let t = Ms(e);
	return function(e, n) {
		let r = Os(n), i, a = t[Ns(r, n)];
		if (a && a(e.state, e.dispatch, e)) return !0;
		if (r.length == 1 && r != " ") {
			if (n.shiftKey) {
				let i = t[Ns(r, n, !1)];
				if (i && i(e.state, e.dispatch, e)) return !0;
			}
			if ((n.altKey || n.metaKey || n.ctrlKey) && !(As && n.ctrlKey && n.altKey) && (i = Ss[n.keyCode]) && i != r) {
				let r = t[Ns(i, n)];
				if (r && r(e.state, e.dispatch, e)) return !0;
			}
		}
		return !1;
	};
}
//#endregion
//#region node_modules/prosemirror-commands/dist/index.js
var Is = (e, t) => e.selection.empty ? !1 : (t && t(e.tr.deleteSelection().scrollIntoView()), !0);
function Ls(e, t) {
	let { $cursor: n } = e.selection;
	return !n || (t ? !t.endOfTextblock("backward", e) : n.parentOffset > 0) ? null : n;
}
var Rs = (e, t, n) => {
	let r = Ls(e, n);
	if (!r) return !1;
	let i = Ws(r);
	if (!i) {
		let n = r.blockRange(), i = n && Wt(n);
		return i == null ? !1 : (t && t(e.tr.lift(n, i).scrollIntoView()), !0);
	}
	let a = i.nodeBefore;
	if (cc(e, i, t, -1)) return !0;
	if (r.parent.content.size == 0 && (Hs(a, "end") || z.isSelectable(a))) for (let n = r.depth;; n--) {
		let o = fn(e.doc, r.before(n), r.after(n), P.empty);
		if (o && o.slice.size < o.to - o.from) {
			if (t) {
				let n = e.tr.step(o);
				n.setSelection(Hs(a, "end") ? L.findFrom(n.doc.resolve(n.mapping.map(i.pos, -1)), -1) : z.create(n.doc, i.pos - a.nodeSize)), t(n.scrollIntoView());
			}
			return !0;
		}
		if (n == 1 || r.node(n - 1).childCount > 1) break;
	}
	return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos - a.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, zs = (e, t, n) => {
	let r = Ls(e, n);
	if (!r) return !1;
	let i = Ws(r);
	return i ? Vs(e, i, t) : !1;
}, Bs = (e, t, n) => {
	let r = Gs(e, n);
	if (!r) return !1;
	let i = Js(r);
	return i ? Vs(e, i, t) : !1;
};
function Vs(e, t, n) {
	let r = t.nodeBefore, i = t.pos - 1;
	for (; !r.isTextblock; i--) {
		if (r.type.spec.isolating) return !1;
		let e = r.lastChild;
		if (!e) return !1;
		r = e;
	}
	let a = t.nodeAfter, o = t.pos + 1;
	for (; !a.isTextblock; o++) {
		if (a.type.spec.isolating) return !1;
		let e = a.firstChild;
		if (!e) return !1;
		a = e;
	}
	let s = fn(e.doc, i, o, P.empty);
	if (!s || s.from != i || s instanceof Lt && s.slice.size >= o - i) return !1;
	if (n) {
		let t = e.tr.step(s);
		t.setSelection(R.create(t.doc, i)), n(t.scrollIntoView());
	}
	return !0;
}
function Hs(e, t, n = !1) {
	for (let r = e; r; r = t == "start" ? r.firstChild : r.lastChild) {
		if (r.isTextblock) return !0;
		if (n && r.childCount != 1) return !1;
	}
	return !1;
}
var Us = (e, t, n) => {
	let { $head: r, empty: i } = e.selection, a = r;
	if (!i) return !1;
	if (r.parent.isTextblock) {
		if (n ? !n.endOfTextblock("backward", e) : r.parentOffset > 0) return !1;
		a = Ws(r);
	}
	let o = a && a.nodeBefore;
	return !o || !z.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(z.create(e.doc, a.pos - o.nodeSize)).scrollIntoView()), !0);
};
function Ws(e) {
	if (!e.parent.type.spec.isolating) for (let t = e.depth - 1; t >= 0; t--) {
		if (e.index(t) > 0) return e.doc.resolve(e.before(t + 1));
		if (e.node(t).type.spec.isolating) break;
	}
	return null;
}
function Gs(e, t) {
	let { $cursor: n } = e.selection;
	return !n || (t ? !t.endOfTextblock("forward", e) : n.parentOffset < n.parent.content.size) ? null : n;
}
var Ks = (e, t, n) => {
	let r = Gs(e, n);
	if (!r) return !1;
	let i = Js(r);
	if (!i) return !1;
	let a = i.nodeAfter;
	if (cc(e, i, t, 1)) return !0;
	if (r.parent.content.size == 0 && (Hs(a, "start") || z.isSelectable(a))) {
		let n = fn(e.doc, r.before(), r.after(), P.empty);
		if (n && n.slice.size < n.to - n.from) {
			if (t) {
				let r = e.tr.step(n);
				r.setSelection(Hs(a, "start") ? L.findFrom(r.doc.resolve(r.mapping.map(i.pos)), 1) : z.create(r.doc, r.mapping.map(i.pos))), t(r.scrollIntoView());
			}
			return !0;
		}
	}
	return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos, i.pos + a.nodeSize).scrollIntoView()), !0) : !1;
}, qs = (e, t, n) => {
	let { $head: r, empty: i } = e.selection, a = r;
	if (!i) return !1;
	if (r.parent.isTextblock) {
		if (n ? !n.endOfTextblock("forward", e) : r.parentOffset < r.parent.content.size) return !1;
		a = Js(r);
	}
	let o = a && a.nodeAfter;
	return !o || !z.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(z.create(e.doc, a.pos)).scrollIntoView()), !0);
};
function Js(e) {
	if (!e.parent.type.spec.isolating) for (let t = e.depth - 1; t >= 0; t--) {
		let n = e.node(t);
		if (e.index(t) + 1 < n.childCount) return e.doc.resolve(e.after(t + 1));
		if (n.type.spec.isolating) break;
	}
	return null;
}
var Ys = (e, t) => {
	let n = e.selection, r = n instanceof z, i;
	if (r) {
		if (n.node.isTextblock || !an(e.doc, n.from)) return !1;
		i = n.from;
	} else if (i = cn(e.doc, n.from, -1), i == null) return !1;
	if (t) {
		let n = e.tr.join(i);
		r && n.setSelection(z.create(n.doc, i - e.doc.resolve(i).nodeBefore.nodeSize)), t(n.scrollIntoView());
	}
	return !0;
}, Xs = (e, t) => {
	let n = e.selection, r;
	if (n instanceof z) {
		if (n.node.isTextblock || !an(e.doc, n.to)) return !1;
		r = n.to;
	} else if (r = cn(e.doc, n.to, 1), r == null) return !1;
	return t && t(e.tr.join(r).scrollIntoView()), !0;
}, Zs = (e, t) => {
	let { $from: n, $to: r } = e.selection, i = n.blockRange(r), a = i && Wt(i);
	return a == null ? !1 : (t && t(e.tr.lift(i, a).scrollIntoView()), !0);
}, Qs = (e, t) => {
	let { $head: n, $anchor: r } = e.selection;
	return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (t && t(e.tr.insertText("\n").scrollIntoView()), !0);
};
function $s(e) {
	for (let t = 0; t < e.edgeCount; t++) {
		let { type: n } = e.edge(t);
		if (n.isTextblock && !n.hasRequiredAttrs()) return n;
	}
	return null;
}
var ec = (e, t) => {
	let { $head: n, $anchor: r } = e.selection;
	if (!n.parent.type.spec.code || !n.sameParent(r)) return !1;
	let i = n.node(-1), a = n.indexAfter(-1), o = $s(i.contentMatchAt(a));
	if (!o || !i.canReplaceWith(a, a, o)) return !1;
	if (t) {
		let r = n.after(), i = e.tr.replaceWith(r, r, o.createAndFill());
		i.setSelection(L.near(i.doc.resolve(r), 1)), t(i.scrollIntoView());
	}
	return !0;
}, tc = (e, t) => {
	let n = e.selection, { $from: r, $to: i } = n;
	if (n instanceof Ln || r.parent.inlineContent || i.parent.inlineContent) return !1;
	let a = $s(i.parent.contentMatchAt(i.indexAfter()));
	if (!a || !a.isTextblock) return !1;
	if (t) {
		let n = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, o = e.tr.insert(n, a.createAndFill());
		o.setSelection(R.create(o.doc, n + 1)), t(o.scrollIntoView());
	}
	return !0;
}, nc = (e, t) => {
	let { $cursor: n } = e.selection;
	if (!n || n.parent.content.size) return !1;
	if (n.depth > 1 && n.after() != n.end(-1)) {
		let r = n.before();
		if (nn(e.doc, r)) return t && t(e.tr.split(r).scrollIntoView()), !0;
	}
	let r = n.blockRange(), i = r && Wt(r);
	return i == null ? !1 : (t && t(e.tr.lift(r, i).scrollIntoView()), !0);
};
function rc(e) {
	return (t, n) => {
		let { $from: r, $to: i } = t.selection;
		if (t.selection instanceof z && t.selection.node.isBlock) return !r.parentOffset || !nn(t.doc, r.pos) ? !1 : (n && n(t.tr.split(r.pos).scrollIntoView()), !0);
		if (!r.depth) return !1;
		let a = [], o, s, c = !1, l = !1;
		for (let t = r.depth;; t--) if (r.node(t).isBlock) {
			c = r.end(t) == r.pos + (r.depth - t), l = r.start(t) == r.pos - (r.depth - t), s = $s(r.node(t - 1).contentMatchAt(r.indexAfter(t - 1)));
			let n = e && e(i.parent, c, r);
			a.unshift(n || (c && s ? { type: s } : null)), o = t;
			break;
		} else {
			if (t == 1) return !1;
			a.unshift(null);
		}
		let u = t.tr;
		(t.selection instanceof R || t.selection instanceof Ln) && u.deleteSelection();
		let d = u.mapping.map(r.pos), f = nn(u.doc, d, a.length, a);
		if (f ||= (a[0] = s ? { type: s } : null, nn(u.doc, d, a.length, a)), !f) return !1;
		if (u.split(d, a.length, a), !c && l && r.node(o).type != s) {
			let e = u.mapping.map(r.before(o)), t = u.doc.resolve(e);
			s && r.node(o - 1).canReplaceWith(t.index(), t.index() + 1, s) && u.setNodeMarkup(u.mapping.map(r.before(o)), s);
		}
		return n && n(u.scrollIntoView()), !0;
	};
}
var ic = rc(), ac = (e, t) => {
	let { $from: n, to: r } = e.selection, i, a = n.sharedDepth(r);
	return a == 0 ? !1 : (i = n.before(a), t && t(e.tr.setSelection(z.create(e.doc, i))), !0);
}, oc = (e, t) => (t && t(e.tr.setSelection(new Ln(e.doc))), !0);
function sc(e, t, n) {
	let r = t.nodeBefore, i = t.nodeAfter, a = t.index();
	return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && t.parent.canReplace(a - 1, a) ? (n && n(e.tr.delete(t.pos - r.nodeSize, t.pos).scrollIntoView()), !0) : !t.parent.canReplace(a, a + 1) || !(i.isTextblock || an(e.doc, t.pos)) ? !1 : (n && n(e.tr.join(t.pos).scrollIntoView()), !0);
}
function cc(e, t, n, r) {
	let i = t.nodeBefore, a = t.nodeAfter, o, s, c = i.type.spec.isolating || a.type.spec.isolating;
	if (!c && sc(e, t, n)) return !0;
	let l = !c && t.parent.canReplace(t.index(), t.index() + 1);
	if (l && (o = (s = i.contentMatchAt(i.childCount)).findWrapping(a.type)) && s.matchType(o[0] || a.type).validEnd) {
		if (n) {
			let r = t.pos + a.nodeSize, s = M.empty;
			for (let e = o.length - 1; e >= 0; e--) s = M.from(o[e].create(null, s));
			s = M.from(i.copy(s));
			let c = e.tr.step(new Rt(t.pos - 1, r, t.pos, r, new P(s, 1, 0), o.length, !0)), l = c.doc.resolve(r + 2 * o.length);
			l.nodeAfter && l.nodeAfter.type == i.type && an(c.doc, l.pos) && c.join(l.pos), n(c.scrollIntoView());
		}
		return !0;
	}
	let u = a.type.spec.isolating || r > 0 && c ? null : L.findFrom(t, 1), d = u && u.$from.blockRange(u.$to), f = d && Wt(d);
	if (f != null && f >= t.depth) return n && n(e.tr.lift(d, f).scrollIntoView()), !0;
	if (l && Hs(a, "start", !0) && Hs(i, "end")) {
		let r = i, o = [];
		for (; o.push(r), !r.isTextblock;) r = r.lastChild;
		let s = a, c = 1;
		for (; !s.isTextblock; s = s.firstChild) c++;
		if (r.canReplace(r.childCount, r.childCount, s.content)) {
			if (n) {
				let r = M.empty;
				for (let e = o.length - 1; e >= 0; e--) r = M.from(o[e].copy(r));
				n(e.tr.step(new Rt(t.pos - o.length, t.pos + a.nodeSize, t.pos + c, t.pos + a.nodeSize - c, new P(r, o.length, 0), 0, !0)).scrollIntoView());
			}
			return !0;
		}
	}
	return !1;
}
function lc(e) {
	return function(t, n) {
		let r = t.selection, i = e < 0 ? r.$from : r.$to, a = i.depth;
		for (; i.node(a).isInline;) {
			if (!a) return !1;
			a--;
		}
		return i.node(a).isTextblock ? (n && n(t.tr.setSelection(R.create(t.doc, e < 0 ? i.start(a) : i.end(a)))), !0) : !1;
	};
}
var uc = lc(-1), dc = lc(1);
function fc(e, t = null) {
	return function(n, r) {
		let { $from: i, $to: a } = n.selection, o = i.blockRange(a), s = o && Kt(o, e, t);
		return s ? (r && r(n.tr.wrap(o, s).scrollIntoView()), !0) : !1;
	};
}
function pc(e, t = null) {
	return function(n, r) {
		let i = !1;
		for (let r = 0; r < n.selection.ranges.length && !i; r++) {
			let { $from: { pos: a }, $to: { pos: o } } = n.selection.ranges[r];
			n.doc.nodesBetween(a, o, (r, a) => {
				if (i) return !1;
				if (!(!r.isTextblock || r.hasMarkup(e, t))) if (r.type == e) i = !0;
				else {
					let t = n.doc.resolve(a), r = t.index();
					i = t.parent.canReplaceWith(r, r + 1, e);
				}
			});
		}
		if (!i) return !1;
		if (r) {
			let i = n.tr;
			for (let r = 0; r < n.selection.ranges.length; r++) {
				let { $from: { pos: a }, $to: { pos: o } } = n.selection.ranges[r];
				i.setBlockType(a, o, e, t);
			}
			r(i.scrollIntoView());
		}
		return !0;
	};
}
function mc(...e) {
	return function(t, n, r) {
		for (let i = 0; i < e.length; i++) if (e[i](t, n, r)) return !0;
		return !1;
	};
}
var hc = mc(Is, Rs, Us), gc = mc(Is, Ks, qs), _c = {
	Enter: mc(Qs, tc, nc, ic),
	"Mod-Enter": ec,
	Backspace: hc,
	"Mod-Backspace": hc,
	"Shift-Backspace": hc,
	Delete: gc,
	"Mod-Delete": gc,
	"Mod-a": oc
}, vc = {
	"Ctrl-h": _c.Backspace,
	"Alt-Backspace": _c["Mod-Backspace"],
	"Ctrl-d": _c.Delete,
	"Ctrl-Alt-Backspace": _c["Mod-Delete"],
	"Alt-Delete": _c["Mod-Delete"],
	"Alt-d": _c["Mod-Delete"],
	"Ctrl-a": uc,
	"Ctrl-e": dc
};
for (let e in _c) vc[e] = _c[e];
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform();
//#endregion
//#region node_modules/prosemirror-schema-list/dist/index.js
function yc(e, t = null) {
	return function(n, r) {
		let { $from: i, $to: a } = n.selection, o = i.blockRange(a);
		if (!o) return !1;
		let s = r ? n.tr : null;
		return bc(s, o, e, t) ? (r && r(s.scrollIntoView()), !0) : !1;
	};
}
function bc(e, t, n, r = null) {
	let i = !1, a = t, o = t.$from.doc;
	if (t.depth >= 2 && t.$from.node(t.depth - 1).type.compatibleContent(n) && t.startIndex == 0) {
		if (t.$from.index(t.depth - 1) == 0) return !1;
		let e = o.resolve(t.start - 2);
		a = new xe(e, e, t.depth), t.endIndex < t.parent.childCount && (t = new xe(t.$from, o.resolve(t.$to.end(t.depth)), t.depth)), i = !0;
	}
	let s = Kt(a, n, r, t);
	return s ? (e && xc(e, t, s, i, n), !0) : !1;
}
function xc(e, t, n, r, i) {
	let a = M.empty;
	for (let e = n.length - 1; e >= 0; e--) a = M.from(n[e].type.create(n[e].attrs, a));
	e.step(new Rt(t.start - (r ? 2 : 0), t.end, t.start, t.end, new P(a, 0, 0), n.length, !0));
	let o = 0;
	for (let e = 0; e < n.length; e++) n[e].type == i && (o = e + 1);
	let s = n.length - o, c = t.start + n.length - (r ? 2 : 0), l = t.parent;
	for (let n = t.startIndex, r = t.endIndex, i = !0; n < r; n++, i = !1) !i && nn(e.doc, c, s) && (e.split(c, s), c += 2 * s), c += l.child(n).nodeSize;
	return e;
}
function Sc(e) {
	return function(t, n) {
		let { $from: r, $to: i } = t.selection, a = r.blockRange(i, (t) => t.childCount > 0 && t.firstChild.type == e);
		return a ? n ? r.node(a.depth - 1).type == e ? Cc(t, n, e, a) : wc(t, n, a) : !0 : !1;
	};
}
function Cc(e, t, n, r) {
	let i = e.tr, a = r.end, o = r.$to.end(r.depth);
	a < o && (i.step(new Rt(a - 1, o, a, o, new P(M.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new xe(i.doc.resolve(r.$from.pos), i.doc.resolve(o), r.depth));
	let s = Wt(r);
	if (s == null) return !1;
	i.lift(r, s);
	let c = i.doc.resolve(i.mapping.map(a, -1) - 1);
	return an(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), t(i.scrollIntoView()), !0;
}
function wc(e, t, n) {
	let r = e.tr, i = n.parent;
	for (let e = n.end, t = n.endIndex - 1, a = n.startIndex; t > a; t--) e -= i.child(t).nodeSize, r.delete(e - 1, e + 1);
	let a = r.doc.resolve(n.start), o = a.nodeAfter;
	if (r.mapping.map(n.end) != n.start + a.nodeAfter.nodeSize) return !1;
	let s = n.startIndex == 0, c = n.endIndex == i.childCount, l = a.node(-1), u = a.index(-1);
	if (!l.canReplace(u + +!s, u + 1, o.content.append(c ? M.empty : M.from(i)))) return !1;
	let d = a.pos, f = d + o.nodeSize;
	return r.step(new Rt(d - +!!s, f + +!!c, d + 1, f - 1, new P((s ? M.empty : M.from(i.copy(M.empty))).append(c ? M.empty : M.from(i.copy(M.empty))), +!s, +!c), +!s)), t(r.scrollIntoView()), !0;
}
function Tc(e) {
	return function(t, n) {
		let { $from: r, $to: i } = t.selection, a = r.blockRange(i, (t) => t.childCount > 0 && t.firstChild.type == e);
		if (!a) return !1;
		let o = a.startIndex;
		if (o == 0) return !1;
		let s = a.parent, c = s.child(o - 1);
		if (c.type != e) return !1;
		if (n) {
			let r = c.lastChild && c.lastChild.type == s.type, i = M.from(r ? e.create() : null), o = new P(M.from(e.create(null, M.from(s.type.create(null, i)))), r ? 3 : 1, 0), l = a.start, u = a.end;
			n(t.tr.step(new Rt(l - (r ? 3 : 1), u, l, u, o, 1, !0)).scrollIntoView());
		}
		return !0;
	};
}
//#endregion
//#region node_modules/@tiptap/core/dist/index.js
function Ec(e) {
	let { state: t, transaction: n } = e, { selection: r } = n, { doc: i } = n, { storedMarks: a } = n;
	return {
		...t,
		apply: t.apply.bind(t),
		applyTransaction: t.applyTransaction.bind(t),
		plugins: t.plugins,
		schema: t.schema,
		reconfigure: t.reconfigure.bind(t),
		toJSON: t.toJSON.bind(t),
		get storedMarks() {
			return a;
		},
		get selection() {
			return r;
		},
		get doc() {
			return i;
		},
		get tr() {
			return r = n.selection, i = n.doc, a = n.storedMarks, n;
		}
	};
}
var Dc = class {
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
		let { rawCommands: e, editor: t, state: n } = this, { view: r } = t, { tr: i } = n, a = this.buildProps(i);
		return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, (...e) => {
			let n = t(...e)(a);
			return !i.getMeta("preventDispatch") && !this.hasCustomState && r.dispatch(i), n;
		}]));
	}
	get chain() {
		return () => this.createChain();
	}
	get can() {
		return () => this.createCan();
	}
	createChain(e, t = !0) {
		let { rawCommands: n, editor: r, state: i } = this, { view: a } = r, o = [], s = !!e, c = e || i.tr, l = () => (!s && t && !c.getMeta("preventDispatch") && !this.hasCustomState && a.dispatch(c), o.every((e) => e === !0)), u = {
			...Object.fromEntries(Object.entries(n).map(([e, n]) => [e, (...e) => {
				let r = this.buildProps(c, t), i = n(...e)(r);
				return o.push(i), u;
			}])),
			run: l
		};
		return u;
	}
	createCan(e) {
		let { rawCommands: t, state: n } = this, r = e || n.tr, i = this.buildProps(r, !1);
		return {
			...Object.fromEntries(Object.entries(t).map(([e, t]) => [e, (...e) => t(...e)({
				...i,
				dispatch: void 0
			})])),
			chain: () => this.createChain(r, !1)
		};
	}
	buildProps(e, t = !0) {
		let { rawCommands: n, editor: r, state: i } = this, { view: a } = r, o = {
			tr: e,
			editor: r,
			view: a,
			state: Ec({
				state: i,
				transaction: e
			}),
			dispatch: t ? () => void 0 : void 0,
			chain: () => this.createChain(e, t),
			can: () => this.createCan(e),
			get commands() {
				return Object.fromEntries(Object.entries(n).map(([e, t]) => [e, (...e) => t(...e)(o)]));
			}
		};
		return o;
	}
}, Oc = class {
	constructor() {
		this.callbacks = {};
	}
	on(e, t) {
		return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), this;
	}
	emit(e, ...t) {
		let n = this.callbacks[e];
		return n && n.forEach((e) => e.apply(this, t)), this;
	}
	off(e, t) {
		let n = this.callbacks[e];
		return n && (t ? this.callbacks[e] = n.filter((e) => e !== t) : delete this.callbacks[e]), this;
	}
	once(e, t) {
		let n = (...r) => {
			this.off(e, n), t.apply(this, r);
		};
		return this.on(e, n);
	}
	removeAllListeners() {
		this.callbacks = {};
	}
};
function G(e, t, n) {
	return e.config[t] === void 0 && e.parent ? G(e.parent, t, n) : typeof e.config[t] == "function" ? e.config[t].bind({
		...n,
		parent: e.parent ? G(e.parent, t, n) : null
	}) : e.config[t];
}
function kc(e) {
	return {
		baseExtensions: e.filter((e) => e.type === "extension"),
		nodeExtensions: e.filter((e) => e.type === "node"),
		markExtensions: e.filter((e) => e.type === "mark")
	};
}
function Ac(e) {
	let t = [], { nodeExtensions: n, markExtensions: r } = kc(e), i = [...n, ...r], a = {
		default: null,
		rendered: !0,
		renderHTML: null,
		parseHTML: null,
		keepOnSplit: !0,
		isRequired: !1
	};
	return e.forEach((e) => {
		let n = G(e, "addGlobalAttributes", {
			name: e.name,
			options: e.options,
			storage: e.storage,
			extensions: i
		});
		n && n().forEach((e) => {
			e.types.forEach((n) => {
				Object.entries(e.attributes).forEach(([e, r]) => {
					t.push({
						type: n,
						name: e,
						attribute: {
							...a,
							...r
						}
					});
				});
			});
		});
	}), i.forEach((e) => {
		let n = G(e, "addAttributes", {
			name: e.name,
			options: e.options,
			storage: e.storage
		});
		if (!n) return;
		let r = n();
		Object.entries(r).forEach(([n, r]) => {
			let i = {
				...a,
				...r
			};
			typeof i?.default == "function" && (i.default = i.default()), i?.isRequired && i?.default === void 0 && delete i.default, t.push({
				type: e.name,
				name: n,
				attribute: i
			});
		});
	}), t;
}
function K(e, t) {
	if (typeof e == "string") {
		if (!t.nodes[e]) throw Error(`There is no node type named '${e}'. Maybe you forgot to add the extension?`);
		return t.nodes[e];
	}
	return e;
}
function q(...e) {
	return e.filter((e) => !!e).reduce((e, t) => {
		let n = { ...e };
		return Object.entries(t).forEach(([e, t]) => {
			if (!n[e]) {
				n[e] = t;
				return;
			}
			if (e === "class") {
				let r = t ? String(t).split(" ") : [], i = n[e] ? n[e].split(" ") : [], a = r.filter((e) => !i.includes(e));
				n[e] = [...i, ...a].join(" ");
			} else if (e === "style") {
				let r = t ? t.split(";").map((e) => e.trim()).filter(Boolean) : [], i = n[e] ? n[e].split(";").map((e) => e.trim()).filter(Boolean) : [], a = /* @__PURE__ */ new Map();
				i.forEach((e) => {
					let [t, n] = e.split(":").map((e) => e.trim());
					a.set(t, n);
				}), r.forEach((e) => {
					let [t, n] = e.split(":").map((e) => e.trim());
					a.set(t, n);
				}), n[e] = Array.from(a.entries()).map(([e, t]) => `${e}: ${t}`).join("; ");
			} else n[e] = t;
		}), n;
	}, {});
}
function jc(e, t) {
	return t.filter((t) => t.type === e.type.name).filter((e) => e.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(e.attrs) || {} : { [t.name]: e.attrs[t.name] }).reduce((e, t) => q(e, t), {});
}
function Mc(e) {
	return typeof e == "function";
}
function J(e, t = void 0, ...n) {
	return Mc(e) ? t ? e.bind(t)(...n) : e(...n) : e;
}
function Nc(e = {}) {
	return Object.keys(e).length === 0 && e.constructor === Object;
}
function Pc(e) {
	return typeof e == "string" ? e.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(e) : e === "true" ? !0 : e === "false" ? !1 : e : e;
}
function Fc(e, t) {
	return "style" in e ? e : {
		...e,
		getAttrs: (n) => {
			let r = e.getAttrs ? e.getAttrs(n) : e.attrs;
			if (r === !1) return !1;
			let i = t.reduce((e, t) => {
				let r = t.attribute.parseHTML ? t.attribute.parseHTML(n) : Pc(n.getAttribute(t.name));
				return r == null ? e : {
					...e,
					[t.name]: r
				};
			}, {});
			return {
				...r,
				...i
			};
		}
	};
}
function Ic(e) {
	return Object.fromEntries(Object.entries(e).filter(([e, t]) => e === "attrs" && Nc(t) ? !1 : t != null));
}
function Lc(e, t) {
	let n = Ac(e), { nodeExtensions: r, markExtensions: i } = kc(e);
	return new Je({
		topNode: r.find((e) => G(e, "topNode"))?.name,
		nodes: Object.fromEntries(r.map((r) => {
			let i = n.filter((e) => e.type === r.name), a = {
				name: r.name,
				options: r.options,
				storage: r.storage,
				editor: t
			}, o = Ic({
				...e.reduce((e, t) => {
					let n = G(t, "extendNodeSchema", a);
					return {
						...e,
						...n ? n(r) : {}
					};
				}, {}),
				content: J(G(r, "content", a)),
				marks: J(G(r, "marks", a)),
				group: J(G(r, "group", a)),
				inline: J(G(r, "inline", a)),
				atom: J(G(r, "atom", a)),
				selectable: J(G(r, "selectable", a)),
				draggable: J(G(r, "draggable", a)),
				code: J(G(r, "code", a)),
				whitespace: J(G(r, "whitespace", a)),
				linebreakReplacement: J(G(r, "linebreakReplacement", a)),
				defining: J(G(r, "defining", a)),
				isolating: J(G(r, "isolating", a)),
				attrs: Object.fromEntries(i.map((e) => [e.name, { default: e?.attribute?.default }]))
			}), s = J(G(r, "parseHTML", a));
			s && (o.parseDOM = s.map((e) => Fc(e, i)));
			let c = G(r, "renderHTML", a);
			c && (o.toDOM = (e) => c({
				node: e,
				HTMLAttributes: jc(e, i)
			}));
			let l = G(r, "renderText", a);
			return l && (o.toText = l), [r.name, o];
		})),
		marks: Object.fromEntries(i.map((r) => {
			let i = n.filter((e) => e.type === r.name), a = {
				name: r.name,
				options: r.options,
				storage: r.storage,
				editor: t
			}, o = Ic({
				...e.reduce((e, t) => {
					let n = G(t, "extendMarkSchema", a);
					return {
						...e,
						...n ? n(r) : {}
					};
				}, {}),
				inclusive: J(G(r, "inclusive", a)),
				excludes: J(G(r, "excludes", a)),
				group: J(G(r, "group", a)),
				spanning: J(G(r, "spanning", a)),
				code: J(G(r, "code", a)),
				attrs: Object.fromEntries(i.map((e) => [e.name, { default: e?.attribute?.default }]))
			}), s = J(G(r, "parseHTML", a));
			s && (o.parseDOM = s.map((e) => Fc(e, i)));
			let c = G(r, "renderHTML", a);
			return c && (o.toDOM = (e) => c({
				mark: e,
				HTMLAttributes: jc(e, i)
			})), [r.name, o];
		}))
	});
}
function Rc(e, t) {
	return t.nodes[e] || t.marks[e] || null;
}
function zc(e, t) {
	return Array.isArray(t) ? t.some((t) => (typeof t == "string" ? t : t.name) === e.name) : t;
}
function Bc(e, t) {
	let n = ft.fromSchema(t).serializeFragment(e), r = document.implementation.createHTMLDocument().createElement("div");
	return r.appendChild(n), r.innerHTML;
}
var Vc = (e, t = 500) => {
	let n = "", r = e.parentOffset;
	return e.parent.nodesBetween(Math.max(0, r - t), r, (e, t, i, a) => {
		var o;
		let s = (o = e.type.spec).toText?.call(o, {
			node: e,
			pos: t,
			parent: i,
			index: a
		}) || e.textContent || "%leaf%";
		n += e.isAtom && !e.isText ? s : s.slice(0, Math.max(0, r - t));
	}), n;
};
function Hc(e) {
	return Object.prototype.toString.call(e) === "[object RegExp]";
}
var Uc = class {
	constructor(e) {
		this.find = e.find, this.handler = e.handler;
	}
}, Wc = (e, t) => {
	if (Hc(t)) return t.exec(e);
	let n = t(e);
	if (!n) return null;
	let r = [n.text];
	return r.index = n.index, r.input = e, r.data = n.data, n.replaceWith && (n.text.includes(n.replaceWith) || console.warn("[tiptap warn]: \"inputRuleMatch.replaceWith\" must be part of \"inputRuleMatch.text\"."), r.push(n.replaceWith)), r;
};
function Gc(e) {
	let { editor: t, from: n, to: r, text: i, rules: a, plugin: o } = e, { view: s } = t;
	if (s.composing) return !1;
	let c = s.state.doc.resolve(n);
	if (c.parent.type.spec.code || (c.nodeBefore || c.nodeAfter)?.marks.find((e) => e.type.spec.code)) return !1;
	let l = !1, u = Vc(c) + i;
	return a.forEach((e) => {
		if (l) return;
		let a = Wc(u, e.find);
		if (!a) return;
		let c = s.state.tr, d = Ec({
			state: s.state,
			transaction: c
		}), f = {
			from: n - (a[0].length - i.length),
			to: r
		}, { commands: p, chain: m, can: h } = new Dc({
			editor: t,
			state: d
		});
		e.handler({
			state: d,
			range: f,
			match: a,
			commands: p,
			chain: m,
			can: h
		}) === null || !c.steps.length || (c.setMeta(o, {
			transform: c,
			from: n,
			to: r,
			text: i
		}), s.dispatch(c), l = !0);
	}), l;
}
function Kc(e) {
	let { editor: t, rules: n } = e, r = new B({
		state: {
			init() {
				return null;
			},
			apply(e, i, a) {
				let o = e.getMeta(r);
				if (o) return o;
				let s = e.getMeta("applyInputRules");
				return s && setTimeout(() => {
					let { text: e } = s;
					e = typeof e == "string" ? e : Bc(M.from(e), a.schema);
					let { from: i } = s, o = i + e.length;
					Gc({
						editor: t,
						from: i,
						to: o,
						text: e,
						rules: n,
						plugin: r
					});
				}), e.selectionSet || e.docChanged ? null : i;
			}
		},
		props: {
			handleTextInput(e, i, a, o) {
				return Gc({
					editor: t,
					from: i,
					to: a,
					text: o,
					rules: n,
					plugin: r
				});
			},
			handleDOMEvents: { compositionend: (e) => (setTimeout(() => {
				let { $cursor: i } = e.state.selection;
				i && Gc({
					editor: t,
					from: i.pos,
					to: i.pos,
					text: "",
					rules: n,
					plugin: r
				});
			}), !1) },
			handleKeyDown(e, i) {
				if (i.key !== "Enter") return !1;
				let { $cursor: a } = e.state.selection;
				return a ? Gc({
					editor: t,
					from: a.pos,
					to: a.pos,
					text: "\n",
					rules: n,
					plugin: r
				}) : !1;
			}
		},
		isInputRules: !0
	});
	return r;
}
function qc(e) {
	return Object.prototype.toString.call(e).slice(8, -1);
}
function Jc(e) {
	return qc(e) === "Object" ? e.constructor === Object && Object.getPrototypeOf(e) === Object.prototype : !1;
}
function Yc(e, t) {
	let n = { ...e };
	return Jc(e) && Jc(t) && Object.keys(t).forEach((r) => {
		Jc(t[r]) && Jc(e[r]) ? n[r] = Yc(e[r], t[r]) : n[r] = t[r];
	}), n;
}
var Xc = class e {
	constructor(e = {}) {
		this.type = "mark", this.name = "mark", this.parent = null, this.child = null, this.config = {
			name: this.name,
			defaultOptions: {}
		}, this.config = {
			...this.config,
			...e
		}, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = J(G(this, "addOptions", { name: this.name }))), this.storage = J(G(this, "addStorage", {
			name: this.name,
			options: this.options
		})) || {};
	}
	static create(t = {}) {
		return new e(t);
	}
	configure(e = {}) {
		let t = this.extend({
			...this.config,
			addOptions: () => Yc(this.options, e)
		});
		return t.name = this.name, t.parent = this.parent, t;
	}
	extend(t = {}) {
		let n = new e(t);
		return n.parent = this, this.child = n, n.name = t.name ? t.name : n.parent.name, t.defaultOptions && Object.keys(t.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${n.name}".`), n.options = J(G(n, "addOptions", { name: n.name })), n.storage = J(G(n, "addStorage", {
			name: n.name,
			options: n.options
		})), n;
	}
	static handleExit({ editor: e, mark: t }) {
		let { tr: n } = e.state, r = e.state.selection.$from;
		if (r.pos === r.end()) {
			let i = r.marks();
			if (!i.find((e) => e?.type.name === t.name)) return !1;
			let a = i.find((e) => e?.type.name === t.name);
			return a && n.removeStoredMark(a), n.insertText(" ", r.pos), e.view.dispatch(n), !0;
		}
		return !1;
	}
};
function Zc(e) {
	return typeof e == "number";
}
var Qc = class {
	constructor(e) {
		this.find = e.find, this.handler = e.handler;
	}
}, $c = (e, t, n) => {
	if (Hc(t)) return [...e.matchAll(t)];
	let r = t(e, n);
	return r ? r.map((t) => {
		let n = [t.text];
		return n.index = t.index, n.input = e, n.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn("[tiptap warn]: \"pasteRuleMatch.replaceWith\" must be part of \"pasteRuleMatch.text\"."), n.push(t.replaceWith)), n;
	}) : [];
};
function el(e) {
	let { editor: t, state: n, from: r, to: i, rule: a, pasteEvent: o, dropEvent: s } = e, { commands: c, chain: l, can: u } = new Dc({
		editor: t,
		state: n
	}), d = [];
	return n.doc.nodesBetween(r, i, (e, t) => {
		if (!e.isTextblock || e.type.spec.code) return;
		let f = Math.max(r, t), p = Math.min(i, t + e.content.size);
		$c(e.textBetween(f - t, p - t, void 0, "￼"), a.find, o).forEach((e) => {
			if (e.index === void 0) return;
			let t = f + e.index + 1, r = t + e[0].length, i = {
				from: n.tr.mapping.map(t),
				to: n.tr.mapping.map(r)
			}, p = a.handler({
				state: n,
				range: i,
				match: e,
				commands: c,
				chain: l,
				can: u,
				pasteEvent: o,
				dropEvent: s
			});
			d.push(p);
		});
	}), d.every((e) => e !== null);
}
var tl = null, nl = (e) => {
	var t;
	let n = new ClipboardEvent("paste", { clipboardData: new DataTransfer() });
	return (t = n.clipboardData) == null || t.setData("text/html", e), n;
};
function rl(e) {
	let { editor: t, rules: n } = e, r = null, i = !1, a = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, s;
	try {
		s = typeof DragEvent < "u" ? new DragEvent("drop") : null;
	} catch {
		s = null;
	}
	let c = ({ state: e, from: n, to: r, rule: i, pasteEvt: a }) => {
		let c = e.tr, l = Ec({
			state: e,
			transaction: c
		});
		if (!(!el({
			editor: t,
			state: l,
			from: Math.max(n - 1, 0),
			to: r.b - 1,
			rule: i,
			pasteEvent: a,
			dropEvent: s
		}) || !c.steps.length)) {
			try {
				s = typeof DragEvent < "u" ? new DragEvent("drop") : null;
			} catch {
				s = null;
			}
			return o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, c;
		}
	};
	return n.map((e) => new B({
		view(e) {
			let n = (n) => {
				r = e.dom.parentElement?.contains(n.target) ? e.dom.parentElement : null, r && (tl = t);
			}, i = () => {
				tl &&= null;
			};
			return window.addEventListener("dragstart", n), window.addEventListener("dragend", i), { destroy() {
				window.removeEventListener("dragstart", n), window.removeEventListener("dragend", i);
			} };
		},
		props: { handleDOMEvents: {
			drop: (e, t) => {
				if (a = r === e.dom.parentElement, s = t, !a) {
					let e = tl;
					e?.isEditable && setTimeout(() => {
						let t = e.state.selection;
						t && e.commands.deleteRange({
							from: t.from,
							to: t.to
						});
					}, 10);
				}
				return !1;
			},
			paste: (e, t) => {
				let n = t.clipboardData?.getData("text/html");
				return o = t, i = !!n?.includes("data-pm-slice"), !1;
			}
		} },
		appendTransaction: (t, n, r) => {
			let s = t[0], l = s.getMeta("uiEvent") === "paste" && !i, u = s.getMeta("uiEvent") === "drop" && !a, d = s.getMeta("applyPasteRules"), f = !!d;
			if (!l && !u && !f) return;
			if (f) {
				let { text: t } = d;
				t = typeof t == "string" ? t : Bc(M.from(t), r.schema);
				let { from: n } = d, i = n + t.length, a = nl(t);
				return c({
					rule: e,
					state: r,
					from: n,
					to: { b: i },
					pasteEvt: a
				});
			}
			let p = n.doc.content.findDiffStart(r.doc.content), m = n.doc.content.findDiffEnd(r.doc.content);
			if (!(!Zc(p) || !m || p === m.b)) return c({
				rule: e,
				state: r,
				from: p,
				to: m,
				pasteEvt: o
			});
		}
	}));
}
function il(e) {
	let t = e.filter((t, n) => e.indexOf(t) !== n);
	return Array.from(new Set(t));
}
var al = class e {
	constructor(t, n) {
		this.splittableMarks = [], this.editor = n, this.extensions = e.resolve(t), this.schema = Lc(this.extensions, n), this.setupExtensions();
	}
	static resolve(t) {
		let n = e.sort(e.flatten(t)), r = il(n.map((e) => e.name));
		return r.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${r.map((e) => `'${e}'`).join(", ")}]. This can lead to issues.`), n;
	}
	static flatten(e) {
		return e.map((e) => {
			let t = G(e, "addExtensions", {
				name: e.name,
				options: e.options,
				storage: e.storage
			});
			return t ? [e, ...this.flatten(t())] : e;
		}).flat(10);
	}
	static sort(e) {
		return e.sort((e, t) => {
			let n = G(e, "priority") || 100, r = G(t, "priority") || 100;
			return n > r ? -1 : +(n < r);
		});
	}
	get commands() {
		return this.extensions.reduce((e, t) => {
			let n = G(t, "addCommands", {
				name: t.name,
				options: t.options,
				storage: t.storage,
				editor: this.editor,
				type: Rc(t.name, this.schema)
			});
			return n ? {
				...e,
				...n()
			} : e;
		}, {});
	}
	get plugins() {
		let { editor: t } = this, n = e.sort([...this.extensions].reverse()), r = [], i = [], a = n.map((e) => {
			let n = {
				name: e.name,
				options: e.options,
				storage: e.storage,
				editor: t,
				type: Rc(e.name, this.schema)
			}, a = [], o = G(e, "addKeyboardShortcuts", n), s = {};
			if (e.type === "mark" && G(e, "exitable", n) && (s.ArrowRight = () => Xc.handleExit({
				editor: t,
				mark: e
			})), o) {
				let e = Object.fromEntries(Object.entries(o()).map(([e, n]) => [e, () => n({ editor: t })]));
				s = {
					...s,
					...e
				};
			}
			let c = Ps(s);
			a.push(c);
			let l = G(e, "addInputRules", n);
			zc(e, t.options.enableInputRules) && l && r.push(...l());
			let u = G(e, "addPasteRules", n);
			zc(e, t.options.enablePasteRules) && u && i.push(...u());
			let d = G(e, "addProseMirrorPlugins", n);
			if (d) {
				let e = d();
				a.push(...e);
			}
			return a;
		}).flat();
		return [
			Kc({
				editor: t,
				rules: r
			}),
			...rl({
				editor: t,
				rules: i
			}),
			...a
		];
	}
	get attributes() {
		return Ac(this.extensions);
	}
	get nodeViews() {
		let { editor: e } = this, { nodeExtensions: t } = kc(this.extensions);
		return Object.fromEntries(t.filter((e) => !!G(e, "addNodeView")).map((t) => {
			let n = this.attributes.filter((e) => e.type === t.name), r = G(t, "addNodeView", {
				name: t.name,
				options: t.options,
				storage: t.storage,
				editor: e,
				type: K(t.name, this.schema)
			});
			return r ? [t.name, (i, a, o, s, c) => {
				let l = jc(i, n);
				return r()({
					node: i,
					view: a,
					getPos: o,
					decorations: s,
					innerDecorations: c,
					editor: e,
					extension: t,
					HTMLAttributes: l
				});
			}] : [];
		}));
	}
	setupExtensions() {
		this.extensions.forEach((e) => {
			this.editor.extensionStorage[e.name] = e.storage;
			let t = {
				name: e.name,
				options: e.options,
				storage: e.storage,
				editor: this.editor,
				type: Rc(e.name, this.schema)
			};
			e.type === "mark" && (J(G(e, "keepOnSplit", t)) ?? !0) && this.splittableMarks.push(e.name);
			let n = G(e, "onBeforeCreate", t), r = G(e, "onCreate", t), i = G(e, "onUpdate", t), a = G(e, "onSelectionUpdate", t), o = G(e, "onTransaction", t), s = G(e, "onFocus", t), c = G(e, "onBlur", t), l = G(e, "onDestroy", t);
			n && this.editor.on("beforeCreate", n), r && this.editor.on("create", r), i && this.editor.on("update", i), a && this.editor.on("selectionUpdate", a), o && this.editor.on("transaction", o), s && this.editor.on("focus", s), c && this.editor.on("blur", c), l && this.editor.on("destroy", l);
		});
	}
}, ol = class e {
	constructor(e = {}) {
		this.type = "extension", this.name = "extension", this.parent = null, this.child = null, this.config = {
			name: this.name,
			defaultOptions: {}
		}, this.config = {
			...this.config,
			...e
		}, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = J(G(this, "addOptions", { name: this.name }))), this.storage = J(G(this, "addStorage", {
			name: this.name,
			options: this.options
		})) || {};
	}
	static create(t = {}) {
		return new e(t);
	}
	configure(e = {}) {
		let t = this.extend({
			...this.config,
			addOptions: () => Yc(this.options, e)
		});
		return t.name = this.name, t.parent = this.parent, t;
	}
	extend(t = {}) {
		let n = new e({
			...this.config,
			...t
		});
		return n.parent = this, this.child = n, n.name = t.name ? t.name : n.parent.name, t.defaultOptions && Object.keys(t.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${n.name}".`), n.options = J(G(n, "addOptions", { name: n.name })), n.storage = J(G(n, "addStorage", {
			name: n.name,
			options: n.options
		})), n;
	}
};
function sl(e, t, n) {
	let { from: r, to: i } = t, { blockSeparator: a = "\n\n", textSerializers: o = {} } = n || {}, s = "";
	return e.nodesBetween(r, i, (e, n, c, l) => {
		e.isBlock && n > r && (s += a);
		let u = o?.[e.type.name];
		if (u) return c && (s += u({
			node: e,
			pos: n,
			parent: c,
			index: l,
			range: t
		})), !1;
		e.isText && (s += (e?.text)?.slice(Math.max(r, n) - n, i - n));
	}), s;
}
function cl(e) {
	return Object.fromEntries(Object.entries(e.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
var ll = ol.create({
	name: "clipboardTextSerializer",
	addOptions() {
		return { blockSeparator: void 0 };
	},
	addProseMirrorPlugins() {
		return [new B({
			key: new $n("clipboardTextSerializer"),
			props: { clipboardTextSerializer: () => {
				let { editor: e } = this, { state: t, schema: n } = e, { doc: r, selection: i } = t, { ranges: a } = i, o = Math.min(...a.map((e) => e.$from.pos)), s = Math.max(...a.map((e) => e.$to.pos)), c = cl(n);
				return sl(r, {
					from: o,
					to: s
				}, {
					...this.options.blockSeparator === void 0 ? {} : { blockSeparator: this.options.blockSeparator },
					textSerializers: c
				});
			} }
		})];
	}
}), ul = () => ({ editor: e, view: t }) => (requestAnimationFrame(() => {
	var n;
	e.isDestroyed || (t.dom.blur(), (n = window == null ? void 0 : window.getSelection()) == null || n.removeAllRanges());
}), !0), dl = (e = !1) => ({ commands: t }) => t.setContent("", e), fl = () => ({ state: e, tr: t, dispatch: n }) => {
	let { selection: r } = t, { ranges: i } = r;
	return n && i.forEach(({ $from: n, $to: r }) => {
		e.doc.nodesBetween(n.pos, r.pos, (e, n) => {
			if (e.type.isText) return;
			let { doc: r, mapping: i } = t, a = r.resolve(i.map(n)), o = r.resolve(i.map(n + e.nodeSize)), s = a.blockRange(o);
			if (!s) return;
			let c = Wt(s);
			if (e.type.isTextblock) {
				let { defaultType: e } = a.parent.contentMatchAt(a.index());
				t.setNodeMarkup(s.start, e);
			}
			(c || c === 0) && t.lift(s, c);
		});
	}), !0;
}, pl = (e) => (t) => e(t), ml = () => ({ state: e, dispatch: t }) => tc(e, t), hl = (e, t) => ({ editor: n, tr: r }) => {
	let { state: i } = n, a = i.doc.slice(e.from, e.to);
	r.deleteRange(e.from, e.to);
	let o = r.mapping.map(t);
	return r.insert(o, a.content), r.setSelection(new R(r.doc.resolve(Math.max(o - 1, 0)))), !0;
}, gl = () => ({ tr: e, dispatch: t }) => {
	let { selection: n } = e, r = n.$anchor.node();
	if (r.content.size > 0) return !1;
	let i = e.selection.$anchor;
	for (let n = i.depth; n > 0; --n) if (i.node(n).type === r.type) {
		if (t) {
			let t = i.before(n), r = i.after(n);
			e.delete(t, r).scrollIntoView();
		}
		return !0;
	}
	return !1;
}, _l = (e) => ({ tr: t, state: n, dispatch: r }) => {
	let i = K(e, n.schema), a = t.selection.$anchor;
	for (let e = a.depth; e > 0; --e) if (a.node(e).type === i) {
		if (r) {
			let n = a.before(e), r = a.after(e);
			t.delete(n, r).scrollIntoView();
		}
		return !0;
	}
	return !1;
}, vl = (e) => ({ tr: t, dispatch: n }) => {
	let { from: r, to: i } = e;
	return n && t.delete(r, i), !0;
}, yl = () => ({ state: e, dispatch: t }) => Is(e, t), bl = () => ({ commands: e }) => e.keyboardShortcut("Enter"), xl = () => ({ state: e, dispatch: t }) => ec(e, t);
function Sl(e, t, n = { strict: !0 }) {
	let r = Object.keys(t);
	return r.length ? r.every((r) => n.strict ? t[r] === e[r] : Hc(t[r]) ? t[r].test(e[r]) : t[r] === e[r]) : !0;
}
function Cl(e, t, n = {}) {
	return e.find((e) => e.type === t && Sl(Object.fromEntries(Object.keys(n).map((t) => [t, e.attrs[t]])), n));
}
function wl(e, t, n = {}) {
	return !!Cl(e, t, n);
}
function Tl(e, t, n) {
	if (!e || !t) return;
	let r = e.parent.childAfter(e.parentOffset);
	if ((!r.node || !r.node.marks.some((e) => e.type === t)) && (r = e.parent.childBefore(e.parentOffset)), !r.node || !r.node.marks.some((e) => e.type === t) || (n ||= r.node.marks[0]?.attrs, !Cl([...r.node.marks], t, n))) return;
	let i = r.index, a = e.start() + r.offset, o = i + 1, s = a + r.node.nodeSize;
	for (; i > 0 && wl([...e.parent.child(i - 1).marks], t, n);) --i, a -= e.parent.child(i).nodeSize;
	for (; o < e.parent.childCount && wl([...e.parent.child(o).marks], t, n);) s += e.parent.child(o).nodeSize, o += 1;
	return {
		from: a,
		to: s
	};
}
function El(e, t) {
	if (typeof e == "string") {
		if (!t.marks[e]) throw Error(`There is no mark type named '${e}'. Maybe you forgot to add the extension?`);
		return t.marks[e];
	}
	return e;
}
var Dl = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let a = El(e, r.schema), { doc: o, selection: s } = n, { $from: c, from: l, to: u } = s;
	if (i) {
		let e = Tl(c, a, t);
		if (e && e.from <= l && e.to >= u) {
			let t = R.create(o, e.from, e.to);
			n.setSelection(t);
		}
	}
	return !0;
}, Ol = (e) => (t) => {
	let n = typeof e == "function" ? e(t) : e;
	for (let e = 0; e < n.length; e += 1) if (n[e](t)) return !0;
	return !1;
};
function kl(e) {
	return e instanceof R;
}
function Al(e = 0, t = 0, n = 0) {
	return Math.min(Math.max(e, t), n);
}
function jl(e, t = null) {
	if (!t) return null;
	let n = L.atStart(e), r = L.atEnd(e);
	if (t === "start" || t === !0) return n;
	if (t === "end") return r;
	let i = n.from, a = r.to;
	return t === "all" ? R.create(e, Al(0, i, a), Al(e.content.size, i, a)) : R.create(e, Al(t, i, a), Al(t, i, a));
}
function Ml() {
	return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
}
function Nl() {
	return [
		"iPad Simulator",
		"iPhone Simulator",
		"iPod Simulator",
		"iPad",
		"iPhone",
		"iPod"
	].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function Pl() {
	return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
var Fl = (e = null, t = {}) => ({ editor: n, view: r, tr: i, dispatch: a }) => {
	t = {
		scrollIntoView: !0,
		...t
	};
	let o = () => {
		(Nl() || Ml()) && r.dom.focus(), requestAnimationFrame(() => {
			n.isDestroyed || (r.focus(), Pl() && !Nl() && !Ml() && r.dom.focus({ preventScroll: !0 }));
		});
	};
	if (r.hasFocus() && e === null || e === !1) return !0;
	if (a && e === null && !kl(n.state.selection)) return o(), !0;
	let s = jl(i.doc, e) || n.state.selection, c = n.state.selection.eq(s);
	return a && (c || i.setSelection(s), c && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0;
}, Il = (e, t) => (n) => e.every((e, r) => t(e, {
	...n,
	index: r
})), Ll = (e, t) => ({ tr: n, commands: r }) => r.insertContentAt({
	from: n.selection.from,
	to: n.selection.to
}, e, t), Rl = (e) => {
	let t = e.childNodes;
	for (let n = t.length - 1; n >= 0; --n) {
		let r = t[n];
		r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? e.removeChild(r) : r.nodeType === 1 && Rl(r);
	}
	return e;
};
function zl(e) {
	let t = `<body>${e}</body>`, n = new window.DOMParser().parseFromString(t, "text/html").body;
	return Rl(n);
}
function Bl(e, t, n) {
	if (e instanceof Ce || e instanceof M) return e;
	n = {
		slice: !0,
		parseOptions: {},
		...n
	};
	let r = typeof e == "object" && !!e, i = typeof e == "string";
	if (r) try {
		if (Array.isArray(e) && e.length > 0) return M.fromArray(e.map((e) => t.nodeFromJSON(e)));
		let r = t.nodeFromJSON(e);
		return n.errorOnInvalidContent && r.check(), r;
	} catch (r) {
		if (n.errorOnInvalidContent) throw Error("[tiptap error]: Invalid JSON content", { cause: r });
		return console.warn("[tiptap warn]: Invalid content.", "Passed value:", e, "Error:", r), Bl("", t, n);
	}
	if (i) {
		if (n.errorOnInvalidContent) {
			let r = !1, i = "", a = new Je({
				topNode: t.spec.topNode,
				marks: t.spec.marks,
				nodes: t.spec.nodes.append({ __tiptap__private__unknown__catch__all__node: {
					content: "inline*",
					group: "block",
					parseDOM: [{
						tag: "*",
						getAttrs: (e) => (r = !0, i = typeof e == "string" ? e : e.outerHTML, null)
					}]
				} })
			});
			if (n.slice ? Qe.fromSchema(a).parseSlice(zl(e), n.parseOptions) : Qe.fromSchema(a).parse(zl(e), n.parseOptions), n.errorOnInvalidContent && r) throw Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ Error(`Invalid element found: ${i}`) });
		}
		let r = Qe.fromSchema(t);
		return n.slice ? r.parseSlice(zl(e), n.parseOptions).content : r.parse(zl(e), n.parseOptions);
	}
	return Bl("", t, n);
}
function Vl(e, t, n) {
	let r = e.steps.length - 1;
	if (r < t) return;
	let i = e.steps[r];
	if (!(i instanceof Lt || i instanceof Rt)) return;
	let a = e.mapping.maps[r], o = 0;
	a.forEach((e, t, n, r) => {
		o === 0 && (o = r);
	}), e.setSelection(L.near(e.doc.resolve(o), n));
}
var Hl = (e) => !("type" in e), Ul = (e, t, n) => ({ tr: r, dispatch: i, editor: a }) => {
	if (i) {
		n = {
			parseOptions: a.options.parseOptions,
			updateSelection: !0,
			applyInputRules: !1,
			applyPasteRules: !1,
			...n
		};
		let i, o = (e) => {
			a.emit("contentError", {
				editor: a,
				error: e,
				disableCollaboration: () => {
					a.storage.collaboration && (a.storage.collaboration.isDisabled = !0);
				}
			});
		}, s = {
			preserveWhitespace: "full",
			...n.parseOptions
		};
		if (!n.errorOnInvalidContent && !a.options.enableContentCheck && a.options.emitContentError) try {
			Bl(t, a.schema, {
				parseOptions: s,
				errorOnInvalidContent: !0
			});
		} catch (e) {
			o(e);
		}
		try {
			i = Bl(t, a.schema, {
				parseOptions: s,
				errorOnInvalidContent: n.errorOnInvalidContent ?? a.options.enableContentCheck
			});
		} catch (e) {
			return o(e), !1;
		}
		let { from: c, to: l } = typeof e == "number" ? {
			from: e,
			to: e
		} : {
			from: e.from,
			to: e.to
		}, u = !0, d = !0;
		if ((Hl(i) ? i : [i]).forEach((e) => {
			e.check(), u = u ? e.isText && e.marks.length === 0 : !1, d = d ? e.isBlock : !1;
		}), c === l && d) {
			let { parent: e } = r.doc.resolve(c);
			e.isTextblock && !e.type.spec.code && !e.childCount && (--c, l += 1);
		}
		let f;
		if (u) {
			if (Array.isArray(t)) f = t.map((e) => e.text || "").join("");
			else if (t instanceof M) {
				let e = "";
				t.forEach((t) => {
					t.text && (e += t.text);
				}), f = e;
			} else f = typeof t == "object" && t && t.text ? t.text : t;
			r.insertText(f, c, l);
		} else f = i, r.replaceWith(c, l, f);
		n.updateSelection && Vl(r, r.steps.length - 1, -1), n.applyInputRules && r.setMeta("applyInputRules", {
			from: c,
			text: f
		}), n.applyPasteRules && r.setMeta("applyPasteRules", {
			from: c,
			text: f
		});
	}
	return !0;
}, Wl = () => ({ state: e, dispatch: t }) => Ys(e, t), Gl = () => ({ state: e, dispatch: t }) => Xs(e, t), Kl = () => ({ state: e, dispatch: t }) => Rs(e, t), ql = () => ({ state: e, dispatch: t }) => Ks(e, t), Jl = () => ({ state: e, dispatch: t, tr: n }) => {
	try {
		let r = cn(e.doc, e.selection.$from.pos, -1);
		return r == null ? !1 : (n.join(r, 2), t && t(n), !0);
	} catch {
		return !1;
	}
}, Yl = () => ({ state: e, dispatch: t, tr: n }) => {
	try {
		let r = cn(e.doc, e.selection.$from.pos, 1);
		return r == null ? !1 : (n.join(r, 2), t && t(n), !0);
	} catch {
		return !1;
	}
}, Xl = () => ({ state: e, dispatch: t }) => zs(e, t), Zl = () => ({ state: e, dispatch: t }) => Bs(e, t);
function Ql() {
	return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function $l(e) {
	let t = e.split(/-(?!$)/), n = t[t.length - 1];
	n === "Space" && (n = " ");
	let r, i, a, o;
	for (let e = 0; e < t.length - 1; e += 1) {
		let n = t[e];
		if (/^(cmd|meta|m)$/i.test(n)) o = !0;
		else if (/^a(lt)?$/i.test(n)) r = !0;
		else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
		else if (/^s(hift)?$/i.test(n)) a = !0;
		else if (/^mod$/i.test(n)) Nl() || Ql() ? o = !0 : i = !0;
		else throw Error(`Unrecognized modifier name: ${n}`);
	}
	return r && (n = `Alt-${n}`), i && (n = `Ctrl-${n}`), o && (n = `Meta-${n}`), a && (n = `Shift-${n}`), n;
}
var eu = (e) => ({ editor: t, view: n, tr: r, dispatch: i }) => {
	let a = $l(e).split(/-(?!$)/), o = a.find((e) => ![
		"Alt",
		"Ctrl",
		"Meta",
		"Shift"
	].includes(e)), s = new KeyboardEvent("keydown", {
		key: o === "Space" ? " " : o,
		altKey: a.includes("Alt"),
		ctrlKey: a.includes("Ctrl"),
		metaKey: a.includes("Meta"),
		shiftKey: a.includes("Shift"),
		bubbles: !0,
		cancelable: !0
	});
	return t.captureTransaction(() => {
		n.someProp("handleKeyDown", (e) => e(n, s));
	})?.steps.forEach((e) => {
		let t = e.map(r.mapping);
		t && i && r.maybeStep(t);
	}), !0;
};
function tu(e, t, n = {}) {
	let { from: r, to: i, empty: a } = e.selection, o = t ? K(t, e.schema) : null, s = [];
	e.doc.nodesBetween(r, i, (e, t) => {
		if (e.isText) return;
		let n = Math.max(r, t), a = Math.min(i, t + e.nodeSize);
		s.push({
			node: e,
			from: n,
			to: a
		});
	});
	let c = i - r, l = s.filter((e) => o ? o.name === e.node.type.name : !0).filter((e) => Sl(e.node.attrs, n, { strict: !1 }));
	return a ? !!l.length : l.reduce((e, t) => e + t.to - t.from, 0) >= c;
}
var nu = (e, t = {}) => ({ state: n, dispatch: r }) => tu(n, K(e, n.schema), t) ? Zs(n, r) : !1, ru = () => ({ state: e, dispatch: t }) => nc(e, t), iu = (e) => ({ state: t, dispatch: n }) => Sc(K(e, t.schema))(t, n), au = () => ({ state: e, dispatch: t }) => Qs(e, t);
function ou(e, t) {
	return t.nodes[e] ? "node" : t.marks[e] ? "mark" : null;
}
function su(e, t) {
	let n = typeof t == "string" ? [t] : t;
	return Object.keys(e).reduce((t, r) => (n.includes(r) || (t[r] = e[r]), t), {});
}
var cu = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
	let a = null, o = null, s = ou(typeof e == "string" ? e : e.name, r.schema);
	return s ? (s === "node" && (a = K(e, r.schema)), s === "mark" && (o = El(e, r.schema)), i && n.selection.ranges.forEach((e) => {
		r.doc.nodesBetween(e.$from.pos, e.$to.pos, (e, r) => {
			a && a === e.type && n.setNodeMarkup(r, void 0, su(e.attrs, t)), o && e.marks.length && e.marks.forEach((i) => {
				o === i.type && n.addMark(r, r + e.nodeSize, o.create(su(i.attrs, t)));
			});
		});
	}), !0) : !1;
}, lu = () => ({ tr: e, dispatch: t }) => (t && e.scrollIntoView(), !0), uu = () => ({ tr: e, dispatch: t }) => {
	if (t) {
		let t = new Ln(e.doc);
		e.setSelection(t);
	}
	return !0;
}, du = () => ({ state: e, dispatch: t }) => Us(e, t), fu = () => ({ state: e, dispatch: t }) => qs(e, t), pu = () => ({ state: e, dispatch: t }) => ac(e, t), mu = () => ({ state: e, dispatch: t }) => dc(e, t), hu = () => ({ state: e, dispatch: t }) => uc(e, t);
function gu(e, t, n = {}, r = {}) {
	return Bl(e, t, {
		slice: !1,
		parseOptions: n,
		errorOnInvalidContent: r.errorOnInvalidContent
	});
}
var _u = (e, t = !1, n = {}, r = {}) => ({ editor: i, tr: a, dispatch: o, commands: s }) => {
	let { doc: c } = a;
	if (n.preserveWhitespace !== "full") {
		let s = gu(e, i.schema, n, { errorOnInvalidContent: r.errorOnInvalidContent ?? i.options.enableContentCheck });
		return o && a.replaceWith(0, c.content.size, s).setMeta("preventUpdate", !t), !0;
	}
	return o && a.setMeta("preventUpdate", !t), s.insertContentAt({
		from: 0,
		to: c.content.size
	}, e, {
		parseOptions: n,
		errorOnInvalidContent: r.errorOnInvalidContent ?? i.options.enableContentCheck
	});
};
function vu(e, t) {
	let n = El(t, e.schema), { from: r, to: i, empty: a } = e.selection, o = [];
	a ? (e.storedMarks && o.push(...e.storedMarks), o.push(...e.selection.$head.marks())) : e.doc.nodesBetween(r, i, (e) => {
		o.push(...e.marks);
	});
	let s = o.find((e) => e.type.name === n.name);
	return s ? { ...s.attrs } : {};
}
function yu(e, t) {
	let n = new An(e);
	return t.forEach((e) => {
		e.steps.forEach((e) => {
			n.step(e);
		});
	}), n;
}
function bu(e) {
	for (let t = 0; t < e.edgeCount; t += 1) {
		let { type: n } = e.edge(t);
		if (n.isTextblock && !n.hasRequiredAttrs()) return n;
	}
	return null;
}
function xu(e, t, n) {
	let r = [];
	return e.nodesBetween(t.from, t.to, (e, t) => {
		n(e) && r.push({
			node: e,
			pos: t
		});
	}), r;
}
function Su(e, t) {
	for (let n = e.depth; n > 0; --n) {
		let r = e.node(n);
		if (t(r)) return {
			pos: n > 0 ? e.before(n) : 0,
			start: e.start(n),
			depth: n,
			node: r
		};
	}
}
function Cu(e) {
	return (t) => Su(t.$from, e);
}
function wu(e, t) {
	return sl(e, {
		from: 0,
		to: e.content.size
	}, t);
}
function Tu(e, t) {
	let n = K(t, e.schema), { from: r, to: i } = e.selection, a = [];
	e.doc.nodesBetween(r, i, (e) => {
		a.push(e);
	});
	let o = a.reverse().find((e) => e.type.name === n.name);
	return o ? { ...o.attrs } : {};
}
function Eu(e, t) {
	let n = ou(typeof t == "string" ? t : t.name, e.schema);
	return n === "node" ? Tu(e, t) : n === "mark" ? vu(e, t) : {};
}
function Du(e, t = JSON.stringify) {
	let n = {};
	return e.filter((e) => {
		let r = t(e);
		return Object.prototype.hasOwnProperty.call(n, r) ? !1 : n[r] = !0;
	});
}
function Ou(e) {
	let t = Du(e);
	return t.length === 1 ? t : t.filter((e, n) => !t.filter((e, t) => t !== n).some((t) => e.oldRange.from >= t.oldRange.from && e.oldRange.to <= t.oldRange.to && e.newRange.from >= t.newRange.from && e.newRange.to <= t.newRange.to));
}
function ku(e) {
	let { mapping: t, steps: n } = e, r = [];
	return t.maps.forEach((e, i) => {
		let a = [];
		if (e.ranges.length) e.forEach((e, t) => {
			a.push({
				from: e,
				to: t
			});
		});
		else {
			let { from: e, to: t } = n[i];
			if (e === void 0 || t === void 0) return;
			a.push({
				from: e,
				to: t
			});
		}
		a.forEach(({ from: e, to: n }) => {
			let a = t.slice(i).map(e, -1), o = t.slice(i).map(n), s = t.invert().map(a, -1), c = t.invert().map(o);
			r.push({
				oldRange: {
					from: s,
					to: c
				},
				newRange: {
					from: a,
					to: o
				}
			});
		});
	}), Ou(r);
}
function Au(e, t, n) {
	let r = [];
	return e === t ? n.resolve(e).marks().forEach((t) => {
		let i = Tl(n.resolve(e), t.type);
		i && r.push({
			mark: t,
			...i
		});
	}) : n.nodesBetween(e, t, (e, t) => {
		!e || e?.nodeSize === void 0 || r.push(...e.marks.map((n) => ({
			from: t,
			to: t + e.nodeSize,
			mark: n
		})));
	}), r;
}
var ju = (e, t, n, r = 20) => {
	let i = e.doc.resolve(n), a = r, o = null;
	for (; a > 0 && o === null;) {
		let e = i.node(a);
		e?.type.name === t ? o = e : --a;
	}
	return [o, a];
};
function Mu(e, t, n) {
	return Object.fromEntries(Object.entries(n).filter(([n]) => {
		let r = e.find((e) => e.type === t && e.name === n);
		return r ? r.attribute.keepOnSplit : !1;
	}));
}
function Nu(e, t, n = {}) {
	let { empty: r, ranges: i } = e.selection, a = t ? El(t, e.schema) : null;
	if (r) return !!(e.storedMarks || e.selection.$from.marks()).filter((e) => a ? a.name === e.type.name : !0).find((e) => Sl(e.attrs, n, { strict: !1 }));
	let o = 0, s = [];
	if (i.forEach(({ $from: t, $to: n }) => {
		let r = t.pos, i = n.pos;
		e.doc.nodesBetween(r, i, (e, t) => {
			if (!e.isText && !e.marks.length) return;
			let n = Math.max(r, t), a = Math.min(i, t + e.nodeSize), c = a - n;
			o += c, s.push(...e.marks.map((e) => ({
				mark: e,
				from: n,
				to: a
			})));
		});
	}), o === 0) return !1;
	let c = s.filter((e) => a ? a.name === e.mark.type.name : !0).filter((e) => Sl(e.mark.attrs, n, { strict: !1 })).reduce((e, t) => e + t.to - t.from, 0), l = s.filter((e) => a ? e.mark.type !== a && e.mark.type.excludes(a) : !0).reduce((e, t) => e + t.to - t.from, 0);
	return (c > 0 ? c + l : c) >= o;
}
function Pu(e, t, n = {}) {
	if (!t) return tu(e, null, n) || Nu(e, null, n);
	let r = ou(t, e.schema);
	return r === "node" ? tu(e, t, n) : r === "mark" ? Nu(e, t, n) : !1;
}
var Fu = (e, t) => {
	let { $from: n, $to: r, $anchor: i } = e.selection;
	if (t) {
		let n = Cu((e) => e.type.name === t)(e.selection);
		if (!n) return !1;
		let r = e.doc.resolve(n.pos + 1);
		return i.pos + 1 === r.end();
	}
	return !(r.parentOffset < r.parent.nodeSize - 2 || n.pos !== r.pos);
}, Iu = (e) => {
	let { $from: t, $to: n } = e.selection;
	return !(t.parentOffset > 0 || t.pos !== n.pos);
};
function Lu(e, t) {
	let { nodeExtensions: n } = kc(t), r = n.find((t) => t.name === e);
	if (!r) return !1;
	let i = J(G(r, "group", {
		name: r.name,
		options: r.options,
		storage: r.storage
	}));
	return typeof i == "string" ? i.split(" ").includes("list") : !1;
}
function Ru(e, { checkChildren: t = !0, ignoreWhitespace: n = !1 } = {}) {
	if (n) {
		if (e.type.name === "hardBreak") return !0;
		if (e.isText) return /^\s*$/m.test(e.text ?? "");
	}
	if (e.isText) return !e.text;
	if (e.isAtom || e.isLeaf) return !1;
	if (e.content.childCount === 0) return !0;
	if (t) {
		let r = !0;
		return e.content.forEach((e) => {
			r !== !1 && (Ru(e, {
				ignoreWhitespace: n,
				checkChildren: t
			}) || (r = !1));
		}), r;
	}
	return !1;
}
function zu(e) {
	return e instanceof z;
}
function Bu(e, t, n) {
	let r = e.state.doc.content.size, i = Al(t, 0, r), a = Al(n, 0, r), o = e.coordsAtPos(i), s = e.coordsAtPos(a, -1), c = Math.min(o.top, s.top), l = Math.max(o.bottom, s.bottom), u = Math.min(o.left, s.left), d = Math.max(o.right, s.right), f = {
		top: c,
		bottom: l,
		left: u,
		right: d,
		width: d - u,
		height: l - c,
		x: u,
		y: c
	};
	return {
		...f,
		toJSON: () => f
	};
}
function Vu(e, t, n) {
	let { selection: r } = t, i = null;
	if (kl(r) && (i = r.$cursor), i) {
		let t = e.storedMarks ?? i.marks();
		return !!n.isInSet(t) || !t.some((e) => e.type.excludes(n));
	}
	let { ranges: a } = r;
	return a.some(({ $from: t, $to: r }) => {
		let i = t.depth === 0 ? e.doc.inlineContent && e.doc.type.allowsMarkType(n) : !1;
		return e.doc.nodesBetween(t.pos, r.pos, (e, t, r) => {
			if (i) return !1;
			if (e.isInline) {
				let t = !r || r.type.allowsMarkType(n), a = !!n.isInSet(e.marks) || !e.marks.some((e) => e.type.excludes(n));
				i = t && a;
			}
			return !i;
		}), i;
	});
}
var Hu = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let { selection: a } = n, { empty: o, ranges: s } = a, c = El(e, r.schema);
	if (i) if (o) {
		let e = vu(r, c);
		n.addStoredMark(c.create({
			...e,
			...t
		}));
	} else s.forEach((e) => {
		let i = e.$from.pos, a = e.$to.pos;
		r.doc.nodesBetween(i, a, (e, r) => {
			let o = Math.max(r, i), s = Math.min(r + e.nodeSize, a);
			e.marks.find((e) => e.type === c) ? e.marks.forEach((e) => {
				c === e.type && n.addMark(o, s, c.create({
					...e.attrs,
					...t
				}));
			}) : n.addMark(o, s, c.create(t));
		});
	});
	return Vu(r, n, c);
}, Uu = (e, t) => ({ tr: n }) => (n.setMeta(e, t), !0), Wu = (e, t = {}) => ({ state: n, dispatch: r, chain: i }) => {
	let a = K(e, n.schema), o;
	return n.selection.$anchor.sameParent(n.selection.$head) && (o = n.selection.$anchor.parent.attrs), a.isTextblock ? i().command(({ commands: e }) => pc(a, {
		...o,
		...t
	})(n) ? !0 : e.clearNodes()).command(({ state: e }) => pc(a, {
		...o,
		...t
	})(e, r)).run() : (console.warn("[tiptap warn]: Currently \"setNode()\" only supports text block nodes."), !1);
}, Gu = (e) => ({ tr: t, dispatch: n }) => {
	if (n) {
		let { doc: n } = t, r = Al(e, 0, n.content.size), i = z.create(n, r);
		t.setSelection(i);
	}
	return !0;
}, Ku = (e) => ({ tr: t, dispatch: n }) => {
	if (n) {
		let { doc: n } = t, { from: r, to: i } = typeof e == "number" ? {
			from: e,
			to: e
		} : e, a = R.atStart(n).from, o = R.atEnd(n).to, s = Al(r, a, o), c = Al(i, a, o), l = R.create(n, s, c);
		t.setSelection(l);
	}
	return !0;
}, qu = (e) => ({ state: t, dispatch: n }) => Tc(K(e, t.schema))(t, n);
function Ju(e, t) {
	let n = e.storedMarks || e.selection.$to.parentOffset && e.selection.$from.marks();
	if (n) {
		let r = n.filter((e) => t?.includes(e.type.name));
		e.tr.ensureMarks(r);
	}
}
var Yu = ({ keepMarks: e = !0 } = {}) => ({ tr: t, state: n, dispatch: r, editor: i }) => {
	let { selection: a, doc: o } = t, { $from: s, $to: c } = a, l = i.extensionManager.attributes, u = Mu(l, s.node().type.name, s.node().attrs);
	if (a instanceof z && a.node.isBlock) return !s.parentOffset || !nn(o, s.pos) ? !1 : (r && (e && Ju(n, i.extensionManager.splittableMarks), t.split(s.pos).scrollIntoView()), !0);
	if (!s.parent.isBlock) return !1;
	let d = c.parentOffset === c.parent.content.size, f = s.depth === 0 ? void 0 : bu(s.node(-1).contentMatchAt(s.indexAfter(-1))), p = d && f ? [{
		type: f,
		attrs: u
	}] : void 0, m = nn(t.doc, t.mapping.map(s.pos), 1, p);
	if (!p && !m && nn(t.doc, t.mapping.map(s.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, p = f ? [{
		type: f,
		attrs: u
	}] : void 0), r) {
		if (m && (a instanceof R && t.deleteSelection(), t.split(t.mapping.map(s.pos), 1, p), f && !d && !s.parentOffset && s.parent.type !== f)) {
			let e = t.mapping.map(s.before()), n = t.doc.resolve(e);
			s.node(-1).canReplaceWith(n.index(), n.index() + 1, f) && t.setNodeMarkup(t.mapping.map(s.before()), f);
		}
		e && Ju(n, i.extensionManager.splittableMarks), t.scrollIntoView();
	}
	return m;
}, Xu = (e, t = {}) => ({ tr: n, state: r, dispatch: i, editor: a }) => {
	let o = K(e, r.schema), { $from: s, $to: c } = r.selection, l = r.selection.node;
	if (l && l.isBlock || s.depth < 2 || !s.sameParent(c)) return !1;
	let u = s.node(-1);
	if (u.type !== o) return !1;
	let d = a.extensionManager.attributes;
	if (s.parent.content.size === 0 && s.node(-1).childCount === s.indexAfter(-1)) {
		if (s.depth === 2 || s.node(-3).type !== o || s.index(-2) !== s.node(-2).childCount - 1) return !1;
		if (i) {
			let e = M.empty, r = s.index(-1) ? 1 : s.index(-2) ? 2 : 3;
			for (let t = s.depth - r; t >= s.depth - 3; --t) e = M.from(s.node(t).copy(e));
			let i = s.indexAfter(-1) < s.node(-2).childCount ? 1 : s.indexAfter(-2) < s.node(-3).childCount ? 2 : 3, a = {
				...Mu(d, s.node().type.name, s.node().attrs),
				...t
			}, c = o.contentMatch.defaultType?.createAndFill(a) || void 0;
			e = e.append(M.from(o.createAndFill(null, c) || void 0));
			let l = s.before(s.depth - (r - 1));
			n.replace(l, s.after(-i), new P(e, 4 - r, 0));
			let u = -1;
			n.doc.nodesBetween(l, n.doc.content.size, (e, t) => {
				if (u > -1) return !1;
				e.isTextblock && e.content.size === 0 && (u = t + 1);
			}), u > -1 && n.setSelection(R.near(n.doc.resolve(u))), n.scrollIntoView();
		}
		return !0;
	}
	let f = c.pos === s.end() ? u.contentMatchAt(0).defaultType : null, p = {
		...Mu(d, u.type.name, u.attrs),
		...t
	}, m = {
		...Mu(d, s.node().type.name, s.node().attrs),
		...t
	};
	n.delete(s.pos, c.pos);
	let h = f ? [{
		type: o,
		attrs: p
	}, {
		type: f,
		attrs: m
	}] : [{
		type: o,
		attrs: p
	}];
	if (!nn(n.doc, s.pos, 2)) return !1;
	if (i) {
		let { selection: e, storedMarks: t } = r, { splittableMarks: o } = a.extensionManager, c = t || e.$to.parentOffset && e.$from.marks();
		if (n.split(s.pos, 2, h).scrollIntoView(), !c || !i) return !0;
		let l = c.filter((e) => o.includes(e.type.name));
		n.ensureMarks(l);
	}
	return !0;
}, Zu = (e, t) => {
	let n = Cu((e) => e.type === t)(e.selection);
	if (!n) return !0;
	let r = e.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
	if (r === void 0) return !0;
	let i = e.doc.nodeAt(r);
	return n.node.type === i?.type && an(e.doc, n.pos) && e.join(n.pos), !0;
}, Qu = (e, t) => {
	let n = Cu((e) => e.type === t)(e.selection);
	if (!n) return !0;
	let r = e.doc.resolve(n.start).after(n.depth);
	if (r === void 0) return !0;
	let i = e.doc.nodeAt(r);
	return n.node.type === i?.type && an(e.doc, r) && e.join(r), !0;
}, $u = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	blur: ul,
	clearContent: dl,
	clearNodes: fl,
	command: pl,
	createParagraphNear: ml,
	cut: hl,
	deleteCurrentNode: gl,
	deleteNode: _l,
	deleteRange: vl,
	deleteSelection: yl,
	enter: bl,
	exitCode: xl,
	extendMarkRange: Dl,
	first: Ol,
	focus: Fl,
	forEach: Il,
	insertContent: Ll,
	insertContentAt: Ul,
	joinBackward: Kl,
	joinDown: Gl,
	joinForward: ql,
	joinItemBackward: Jl,
	joinItemForward: Yl,
	joinTextblockBackward: Xl,
	joinTextblockForward: Zl,
	joinUp: Wl,
	keyboardShortcut: eu,
	lift: nu,
	liftEmptyBlock: ru,
	liftListItem: iu,
	newlineInCode: au,
	resetAttributes: cu,
	scrollIntoView: lu,
	selectAll: uu,
	selectNodeBackward: du,
	selectNodeForward: fu,
	selectParentNode: pu,
	selectTextblockEnd: mu,
	selectTextblockStart: hu,
	setContent: _u,
	setMark: Hu,
	setMeta: Uu,
	setNode: Wu,
	setNodeSelection: Gu,
	setTextSelection: Ku,
	sinkListItem: qu,
	splitBlock: Yu,
	splitListItem: Xu,
	toggleList: (e, t, n, r = {}) => ({ editor: i, tr: a, state: o, dispatch: s, chain: c, commands: l, can: u }) => {
		let { extensions: d, splittableMarks: f } = i.extensionManager, p = K(e, o.schema), m = K(t, o.schema), { selection: h, storedMarks: g } = o, { $from: _, $to: v } = h, y = _.blockRange(v), b = g || h.$to.parentOffset && h.$from.marks();
		if (!y) return !1;
		let x = Cu((e) => Lu(e.type.name, d))(h);
		if (y.depth >= 1 && x && y.depth - x.depth <= 1) {
			if (x.node.type === p) return l.liftListItem(m);
			if (Lu(x.node.type.name, d) && p.validContent(x.node.content) && s) return c().command(() => (a.setNodeMarkup(x.pos, p), !0)).command(() => Zu(a, p)).command(() => Qu(a, p)).run();
		}
		return !n || !b || !s ? c().command(() => u().wrapInList(p, r) ? !0 : l.clearNodes()).wrapInList(p, r).command(() => Zu(a, p)).command(() => Qu(a, p)).run() : c().command(() => {
			let e = u().wrapInList(p, r), t = b.filter((e) => f.includes(e.type.name));
			return a.ensureMarks(t), e ? !0 : l.clearNodes();
		}).wrapInList(p, r).command(() => Zu(a, p)).command(() => Qu(a, p)).run();
	},
	toggleMark: (e, t = {}, n = {}) => ({ state: r, commands: i }) => {
		let { extendEmptyMarkRange: a = !1 } = n, o = El(e, r.schema);
		return Nu(r, o, t) ? i.unsetMark(o, { extendEmptyMarkRange: a }) : i.setMark(o, t);
	},
	toggleNode: (e, t, n = {}) => ({ state: r, commands: i }) => {
		let a = K(e, r.schema), o = K(t, r.schema), s = tu(r, a, n), c;
		return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), s ? i.setNode(o, c) : i.setNode(a, {
			...c,
			...n
		});
	},
	toggleWrap: (e, t = {}) => ({ state: n, commands: r }) => {
		let i = K(e, n.schema);
		return tu(n, i, t) ? r.lift(i) : r.wrapIn(i, t);
	},
	undoInputRule: () => ({ state: e, dispatch: t }) => {
		let n = e.plugins;
		for (let r = 0; r < n.length; r += 1) {
			let i = n[r], a;
			if (i.spec.isInputRules && (a = i.getState(e))) {
				if (t) {
					let t = e.tr, n = a.transform;
					for (let e = n.steps.length - 1; e >= 0; --e) t.step(n.steps[e].invert(n.docs[e]));
					if (a.text) {
						let n = t.doc.resolve(a.from).marks();
						t.replaceWith(a.from, a.to, e.schema.text(a.text, n));
					} else t.delete(a.from, a.to);
				}
				return !0;
			}
		}
		return !1;
	},
	unsetAllMarks: () => ({ tr: e, dispatch: t }) => {
		let { selection: n } = e, { empty: r, ranges: i } = n;
		return r || t && i.forEach((t) => {
			e.removeMark(t.$from.pos, t.$to.pos);
		}), !0;
	},
	unsetMark: (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
		let { extendEmptyMarkRange: a = !1 } = t, { selection: o } = n, s = El(e, r.schema), { $from: c, empty: l, ranges: u } = o;
		if (!i) return !0;
		if (l && a) {
			let { from: e, to: t } = o, r = Tl(c, s, c.marks().find((e) => e.type === s)?.attrs);
			r && (e = r.from, t = r.to), n.removeMark(e, t, s);
		} else u.forEach((e) => {
			n.removeMark(e.$from.pos, e.$to.pos, s);
		});
		return n.removeStoredMark(s), !0;
	},
	updateAttributes: (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
		let a = null, o = null, s = ou(typeof e == "string" ? e : e.name, r.schema);
		return s ? (s === "node" && (a = K(e, r.schema)), s === "mark" && (o = El(e, r.schema)), i && n.selection.ranges.forEach((e) => {
			let i = e.$from.pos, s = e.$to.pos, c, l, u, d;
			n.selection.empty ? r.doc.nodesBetween(i, s, (e, t) => {
				a && a === e.type && (u = Math.max(t, i), d = Math.min(t + e.nodeSize, s), c = t, l = e);
			}) : r.doc.nodesBetween(i, s, (e, r) => {
				r < i && a && a === e.type && (u = Math.max(r, i), d = Math.min(r + e.nodeSize, s), c = r, l = e), r >= i && r <= s && (a && a === e.type && n.setNodeMarkup(r, void 0, {
					...e.attrs,
					...t
				}), o && e.marks.length && e.marks.forEach((a) => {
					if (o === a.type) {
						let c = Math.max(r, i), l = Math.min(r + e.nodeSize, s);
						n.addMark(c, l, o.create({
							...a.attrs,
							...t
						}));
					}
				}));
			}), l && (c !== void 0 && n.setNodeMarkup(c, void 0, {
				...l.attrs,
				...t
			}), o && l.marks.length && l.marks.forEach((e) => {
				o === e.type && n.addMark(u, d, o.create({
					...e.attrs,
					...t
				}));
			}));
		}), !0) : !1;
	},
	wrapIn: (e, t = {}) => ({ state: n, dispatch: r }) => fc(K(e, n.schema), t)(n, r),
	wrapInList: (e, t = {}) => ({ state: n, dispatch: r }) => yc(K(e, n.schema), t)(n, r)
}), ed = ol.create({
	name: "commands",
	addCommands() {
		return { ...$u };
	}
}), td = ol.create({
	name: "drop",
	addProseMirrorPlugins() {
		return [new B({
			key: new $n("tiptapDrop"),
			props: { handleDrop: (e, t, n, r) => {
				this.editor.emit("drop", {
					editor: this.editor,
					event: t,
					slice: n,
					moved: r
				});
			} }
		})];
	}
}), nd = ol.create({
	name: "editable",
	addProseMirrorPlugins() {
		return [new B({
			key: new $n("editable"),
			props: { editable: () => this.editor.options.editable }
		})];
	}
}), rd = new $n("focusEvents"), id = ol.create({
	name: "focusEvents",
	addProseMirrorPlugins() {
		let { editor: e } = this;
		return [new B({
			key: rd,
			props: { handleDOMEvents: {
				focus: (t, n) => {
					e.isFocused = !0;
					let r = e.state.tr.setMeta("focus", { event: n }).setMeta("addToHistory", !1);
					return t.dispatch(r), !1;
				},
				blur: (t, n) => {
					e.isFocused = !1;
					let r = e.state.tr.setMeta("blur", { event: n }).setMeta("addToHistory", !1);
					return t.dispatch(r), !1;
				}
			} }
		})];
	}
}), ad = ol.create({
	name: "keymap",
	addKeyboardShortcuts() {
		let e = () => this.editor.commands.first(({ commands: e }) => [
			() => e.undoInputRule(),
			() => e.command(({ tr: t }) => {
				let { selection: n, doc: r } = t, { empty: i, $anchor: a } = n, { pos: o, parent: s } = a, c = a.parent.isTextblock && o > 0 ? t.doc.resolve(o - 1) : a, l = c.parent.type.spec.isolating, u = a.pos - a.parentOffset, d = l && c.parent.childCount === 1 ? u === a.pos : L.atStart(r).from === o;
				return !i || !s.type.isTextblock || s.textContent.length || !d || d && a.parent.type.name === "paragraph" ? !1 : e.clearNodes();
			}),
			() => e.deleteSelection(),
			() => e.joinBackward(),
			() => e.selectNodeBackward()
		]), t = () => this.editor.commands.first(({ commands: e }) => [
			() => e.deleteSelection(),
			() => e.deleteCurrentNode(),
			() => e.joinForward(),
			() => e.selectNodeForward()
		]), n = {
			Enter: () => this.editor.commands.first(({ commands: e }) => [
				() => e.newlineInCode(),
				() => e.createParagraphNear(),
				() => e.liftEmptyBlock(),
				() => e.splitBlock()
			]),
			"Mod-Enter": () => this.editor.commands.exitCode(),
			Backspace: e,
			"Mod-Backspace": e,
			"Shift-Backspace": e,
			Delete: t,
			"Mod-Delete": t,
			"Mod-a": () => this.editor.commands.selectAll()
		}, r = { ...n }, i = {
			...n,
			"Ctrl-h": e,
			"Alt-Backspace": e,
			"Ctrl-d": t,
			"Ctrl-Alt-Backspace": t,
			"Alt-Delete": t,
			"Alt-d": t,
			"Ctrl-a": () => this.editor.commands.selectTextblockStart(),
			"Ctrl-e": () => this.editor.commands.selectTextblockEnd()
		};
		return Nl() || Ql() ? i : r;
	},
	addProseMirrorPlugins() {
		return [new B({
			key: new $n("clearDocument"),
			appendTransaction: (e, t, n) => {
				if (e.some((e) => e.getMeta("composition"))) return;
				let r = e.some((e) => e.docChanged) && !t.doc.eq(n.doc), i = e.some((e) => e.getMeta("preventClearDocument"));
				if (!r || i) return;
				let { empty: a, from: o, to: s } = t.selection, c = L.atStart(t.doc).from, l = L.atEnd(t.doc).to;
				if (a || !(o === c && s === l) || !Ru(n.doc)) return;
				let u = n.tr, d = Ec({
					state: n,
					transaction: u
				}), { commands: f } = new Dc({
					editor: this.editor,
					state: d
				});
				if (f.clearNodes(), u.steps.length) return u;
			}
		})];
	}
}), od = ol.create({
	name: "paste",
	addProseMirrorPlugins() {
		return [new B({
			key: new $n("tiptapPaste"),
			props: { handlePaste: (e, t, n) => {
				this.editor.emit("paste", {
					editor: this.editor,
					event: t,
					slice: n
				});
			} }
		})];
	}
}), sd = ol.create({
	name: "tabindex",
	addProseMirrorPlugins() {
		return [new B({
			key: new $n("tabindex"),
			props: { attributes: () => this.editor.isEditable ? { tabindex: "0" } : {} }
		})];
	}
}), cd = class e {
	get name() {
		return this.node.type.name;
	}
	constructor(e, t, n = !1, r = null) {
		this.currentNode = null, this.actualDepth = null, this.isBlock = n, this.resolvedPos = e, this.editor = t, this.currentNode = r;
	}
	get node() {
		return this.currentNode || this.resolvedPos.node();
	}
	get element() {
		return this.editor.view.domAtPos(this.pos).node;
	}
	get depth() {
		return this.actualDepth ?? this.resolvedPos.depth;
	}
	get pos() {
		return this.resolvedPos.pos;
	}
	get content() {
		return this.node.content;
	}
	set content(e) {
		let t = this.from, n = this.to;
		if (this.isBlock) {
			if (this.content.size === 0) {
				console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
				return;
			}
			t = this.from + 1, n = this.to - 1;
		}
		this.editor.commands.insertContentAt({
			from: t,
			to: n
		}, e);
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
		return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + +!this.node.isText;
	}
	get parent() {
		if (this.depth === 0) return null;
		let t = this.resolvedPos.start(this.resolvedPos.depth - 1), n = this.resolvedPos.doc.resolve(t);
		return new e(n, this.editor);
	}
	get before() {
		let t = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
		return t.depth !== this.depth && (t = this.resolvedPos.doc.resolve(this.from - 3)), new e(t, this.editor);
	}
	get after() {
		let t = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
		return t.depth !== this.depth && (t = this.resolvedPos.doc.resolve(this.to + 3)), new e(t, this.editor);
	}
	get children() {
		let t = [];
		return this.node.content.forEach((n, r) => {
			let i = n.isBlock && !n.isTextblock, a = n.isAtom && !n.isText, o = this.pos + r + +!a;
			if (o < 0 || o > this.resolvedPos.doc.nodeSize - 2) return;
			let s = this.resolvedPos.doc.resolve(o);
			if (!i && s.depth <= this.depth) return;
			let c = new e(s, this.editor, i, i ? n : null);
			i && (c.actualDepth = this.depth + 1), t.push(new e(s, this.editor, i, i ? n : null));
		}), t;
	}
	get firstChild() {
		return this.children[0] || null;
	}
	get lastChild() {
		let e = this.children;
		return e[e.length - 1] || null;
	}
	closest(e, t = {}) {
		let n = null, r = this.parent;
		for (; r && !n;) {
			if (r.node.type.name === e) if (Object.keys(t).length > 0) {
				let e = r.node.attrs, n = Object.keys(t);
				for (let r = 0; r < n.length; r += 1) {
					let i = n[r];
					if (e[i] !== t[i]) break;
				}
			} else n = r;
			r = r.parent;
		}
		return n;
	}
	querySelector(e, t = {}) {
		return this.querySelectorAll(e, t, !0)[0] || null;
	}
	querySelectorAll(e, t = {}, n = !1) {
		let r = [];
		if (!this.children || this.children.length === 0) return r;
		let i = Object.keys(t);
		return this.children.forEach((a) => {
			n && r.length > 0 || (a.node.type.name === e && i.every((e) => t[e] === a.node.attrs[e]) && r.push(a), !(n && r.length > 0) && (r = r.concat(a.querySelectorAll(e, t, n))));
		}), r;
	}
	setAttribute(e) {
		let { tr: t } = this.editor.state;
		t.setNodeMarkup(this.from, void 0, {
			...this.node.attrs,
			...e
		}), this.editor.view.dispatch(t);
	}
}, ld = ".ProseMirror {\n  position: relative;\n}\n\n.ProseMirror {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  white-space: break-spaces;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  font-feature-settings: \"liga\" 0; /* the above doesn't seem to work in Edge */\n}\n\n.ProseMirror [contenteditable=\"false\"] {\n  white-space: normal;\n}\n\n.ProseMirror [contenteditable=\"false\"] [contenteditable=\"true\"] {\n  white-space: pre-wrap;\n}\n\n.ProseMirror pre {\n  white-space: pre-wrap;\n}\n\nimg.ProseMirror-separator {\n  display: inline !important;\n  border: none !important;\n  margin: 0 !important;\n  width: 0 !important;\n  height: 0 !important;\n}\n\n.ProseMirror-gapcursor {\n  display: none;\n  pointer-events: none;\n  position: absolute;\n  margin: 0;\n}\n\n.ProseMirror-gapcursor:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: -2px;\n  width: 20px;\n  border-top: 1px solid black;\n  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;\n}\n\n@keyframes ProseMirror-cursor-blink {\n  to {\n    visibility: hidden;\n  }\n}\n\n.ProseMirror-hideselection *::selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection *::-moz-selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection * {\n  caret-color: transparent;\n}\n\n.ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}\n\n.tippy-box[data-animation=fade][data-state=hidden] {\n  opacity: 0\n}";
function ud(e, t, n) {
	let r = document.querySelector(`style[data-tiptap-style${n ? `-${n}` : ""}]`);
	if (r !== null) return r;
	let i = document.createElement("style");
	return t && i.setAttribute("nonce", t), i.setAttribute(`data-tiptap-style${n ? `-${n}` : ""}`, ""), i.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(i), i;
}
var dd = class extends Oc {
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
			emitContentError: !1,
			onBeforeCreate: () => null,
			onCreate: () => null,
			onUpdate: () => null,
			onSelectionUpdate: () => null,
			onTransaction: () => null,
			onFocus: () => null,
			onBlur: () => null,
			onDestroy: () => null,
			onContentError: ({ error: e }) => {
				throw e;
			},
			onPaste: () => null,
			onDrop: () => null
		}, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("contentError", this.options.onContentError), this.createView(), this.injectCSS(), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: e, slice: t, moved: n }) => this.options.onDrop(e, t, n)), this.on("paste", ({ event: e, slice: t }) => this.options.onPaste(e, t)), window.setTimeout(() => {
			this.isDestroyed || (this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
		}, 0);
	}
	get storage() {
		return this.extensionStorage;
	}
	get commands() {
		return this.commandManager.commands;
	}
	chain() {
		return this.commandManager.chain();
	}
	can() {
		return this.commandManager.can();
	}
	injectCSS() {
		this.options.injectCSS && document && (this.css = ud(ld, this.options.injectNonce));
	}
	setOptions(e = {}) {
		this.options = {
			...this.options,
			...e
		}, !(!this.view || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
	}
	setEditable(e, t = !0) {
		this.setOptions({ editable: e }), t && this.emit("update", {
			editor: this,
			transaction: this.state.tr
		});
	}
	get isEditable() {
		return this.options.editable && this.view && this.view.editable;
	}
	get state() {
		return this.view.state;
	}
	registerPlugin(e, t) {
		let n = Mc(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], r = this.state.reconfigure({ plugins: n });
		return this.view.updateState(r), r;
	}
	unregisterPlugin(e) {
		if (this.isDestroyed) return;
		let t = this.state.plugins, n = t;
		if ([].concat(e).forEach((e) => {
			let t = typeof e == "string" ? `${e}$` : e.key;
			n = n.filter((e) => !e.key.startsWith(t));
		}), t.length === n.length) return;
		let r = this.state.reconfigure({ plugins: n });
		return this.view.updateState(r), r;
	}
	createExtensionManager() {
		let e = [...this.options.enableCoreExtensions ? [
			nd,
			ll.configure({ blockSeparator: this.options.coreExtensionOptions?.clipboardTextSerializer?.blockSeparator }),
			ed,
			id,
			ad,
			sd,
			td,
			od
		].filter((e) => typeof this.options.enableCoreExtensions == "object" ? this.options.enableCoreExtensions[e.name] !== !1 : !0) : [], ...this.options.extensions].filter((e) => [
			"extension",
			"node",
			"mark"
		].includes(e?.type));
		this.extensionManager = new al(e, this);
	}
	createCommandManager() {
		this.commandManager = new Dc({ editor: this });
	}
	createSchema() {
		this.schema = this.extensionManager.schema;
	}
	createView() {
		let e;
		try {
			e = gu(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
		} catch (t) {
			if (!(t instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(t.message)) throw t;
			this.emit("contentError", {
				editor: this,
				error: t,
				disableCollaboration: () => {
					this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((e) => e.name !== "collaboration"), this.createExtensionManager();
				}
			}), e = gu(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: !1 });
		}
		let t = jl(e, this.options.autofocus);
		this.view = new ms(this.options.element, {
			...this.options.editorProps,
			attributes: {
				role: "textbox",
				...this.options.editorProps?.attributes
			},
			dispatchTransaction: this.dispatchTransaction.bind(this),
			state: Yn.create({
				doc: e,
				selection: t || void 0
			})
		});
		let n = this.state.reconfigure({ plugins: this.extensionManager.plugins });
		this.view.updateState(n), this.createNodeViews(), this.prependClass();
		let r = this.view.dom;
		r.editor = this;
	}
	createNodeViews() {
		this.view.isDestroyed || this.view.setProps({ nodeViews: this.extensionManager.nodeViews });
	}
	prependClass() {
		this.view.dom.className = `tiptap ${this.view.dom.className}`;
	}
	captureTransaction(e) {
		this.isCapturingTransaction = !0, e(), this.isCapturingTransaction = !1;
		let t = this.capturedTransaction;
		return this.capturedTransaction = null, t;
	}
	dispatchTransaction(e) {
		if (this.view.isDestroyed) return;
		if (this.isCapturingTransaction) {
			if (!this.capturedTransaction) {
				this.capturedTransaction = e;
				return;
			}
			e.steps.forEach((e) => this.capturedTransaction?.step(e));
			return;
		}
		let t = this.state.apply(e), n = !this.state.selection.eq(t.selection);
		this.emit("beforeTransaction", {
			editor: this,
			transaction: e,
			nextState: t
		}), this.view.updateState(t), this.emit("transaction", {
			editor: this,
			transaction: e
		}), n && this.emit("selectionUpdate", {
			editor: this,
			transaction: e
		});
		let r = e.getMeta("focus"), i = e.getMeta("blur");
		r && this.emit("focus", {
			editor: this,
			event: r.event,
			transaction: e
		}), i && this.emit("blur", {
			editor: this,
			event: i.event,
			transaction: e
		}), !(!e.docChanged || e.getMeta("preventUpdate")) && this.emit("update", {
			editor: this,
			transaction: e
		});
	}
	getAttributes(e) {
		return Eu(this.state, e);
	}
	isActive(e, t) {
		let n = typeof e == "string" ? e : null, r = typeof e == "string" ? t : e;
		return Pu(this.state, n, r);
	}
	getJSON() {
		return this.state.doc.toJSON();
	}
	getHTML() {
		return Bc(this.state.doc.content, this.schema);
	}
	getText(e) {
		let { blockSeparator: t = "\n\n", textSerializers: n = {} } = e || {};
		return wu(this.state.doc, {
			blockSeparator: t,
			textSerializers: {
				...cl(this.schema),
				...n
			}
		});
	}
	get isEmpty() {
		return Ru(this.state.doc);
	}
	getCharacterCount() {
		return console.warn("[tiptap warn]: \"editor.getCharacterCount()\" is deprecated. Please use \"editor.storage.characterCount.characters()\" instead."), this.state.doc.content.size - 2;
	}
	destroy() {
		if (this.emit("destroy"), this.view) {
			let e = this.view.dom;
			e && e.editor && delete e.editor, this.view.destroy();
		}
		this.removeAllListeners();
	}
	get isDestroyed() {
		return !this.view?.docView;
	}
	$node(e, t) {
		return this.$doc?.querySelector(e, t) || null;
	}
	$nodes(e, t) {
		return this.$doc?.querySelectorAll(e, t) || null;
	}
	$pos(e) {
		return new cd(this.state.doc.resolve(e), this);
	}
	get $doc() {
		return this.$pos(0);
	}
};
function fd(e) {
	return new Uc({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = J(e.getAttributes, void 0, r);
			if (i === !1 || i === null) return null;
			let { tr: a } = t, o = r[r.length - 1], s = r[0];
			if (o) {
				let r = s.search(/\S/), c = n.from + s.indexOf(o), l = c + o.length;
				if (Au(n.from, n.to, t.doc).filter((t) => t.mark.type.excluded.find((n) => n === e.type && n !== t.mark.type)).filter((e) => e.to > c).length) return null;
				l < n.to && a.delete(l, n.to), c > n.from && a.delete(n.from + r, c);
				let u = n.from + r + o.length;
				a.addMark(n.from + r, u, e.type.create(i || {})), a.removeStoredMark(e.type);
			}
		}
	});
}
function pd(e) {
	return new Uc({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = J(e.getAttributes, void 0, r) || {}, { tr: a } = t, o = n.from, s = n.to, c = e.type.create(i);
			if (r[1]) {
				let e = o + r[0].lastIndexOf(r[1]);
				e > s ? e = s : s = e + r[1].length;
				let t = r[0][r[0].length - 1];
				a.insertText(t, o + r[0].length - 1), a.replaceWith(e, s, c);
			} else if (r[0]) {
				let t = e.type.isInline ? o : o - 1;
				a.insert(t, e.type.create(i)).delete(a.mapping.map(o), a.mapping.map(s));
			}
			a.scrollIntoView();
		}
	});
}
function md(e) {
	return new Uc({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = t.doc.resolve(n.from), a = J(e.getAttributes, void 0, r) || {};
			if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), e.type)) return null;
			t.tr.delete(n.from, n.to).setBlockType(n.from, n.from, e.type, a);
		}
	});
}
function hd(e) {
	return new Uc({
		find: e.find,
		handler: ({ state: t, range: n, match: r, chain: i }) => {
			let a = J(e.getAttributes, void 0, r) || {}, o = t.tr.delete(n.from, n.to), s = o.doc.resolve(n.from).blockRange(), c = s && Kt(s, e.type, a);
			if (!c) return null;
			if (o.wrap(s, c), e.keepMarks && e.editor) {
				let { selection: n, storedMarks: r } = t, { splittableMarks: i } = e.editor.extensionManager, a = r || n.$to.parentOffset && n.$from.marks();
				if (a) {
					let e = a.filter((e) => i.includes(e.type.name));
					o.ensureMarks(e);
				}
			}
			if (e.keepAttributes) {
				let t = e.type.name === "bulletList" || e.type.name === "orderedList" ? "listItem" : "taskList";
				i().updateAttributes(t, a).run();
			}
			let l = o.doc.resolve(n.from - 1).nodeBefore;
			l && l.type === e.type && an(o.doc, n.from - 1) && (!e.joinPredicate || e.joinPredicate(r, l)) && o.join(n.from - 1);
		}
	});
}
var gd = class e {
	constructor(e = {}) {
		this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
			name: this.name,
			defaultOptions: {}
		}, this.config = {
			...this.config,
			...e
		}, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = J(G(this, "addOptions", { name: this.name }))), this.storage = J(G(this, "addStorage", {
			name: this.name,
			options: this.options
		})) || {};
	}
	static create(t = {}) {
		return new e(t);
	}
	configure(e = {}) {
		let t = this.extend({
			...this.config,
			addOptions: () => Yc(this.options, e)
		});
		return t.name = this.name, t.parent = this.parent, t;
	}
	extend(t = {}) {
		let n = new e(t);
		return n.parent = this, this.child = n, n.name = t.name ? t.name : n.parent.name, t.defaultOptions && Object.keys(t.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${n.name}".`), n.options = J(G(n, "addOptions", { name: n.name })), n.storage = J(G(n, "addStorage", {
			name: n.name,
			options: n.options
		})), n;
	}
};
function _d(e) {
	return new Qc({
		find: e.find,
		handler: ({ state: t, range: n, match: r, pasteEvent: i }) => {
			let a = J(e.getAttributes, void 0, r, i);
			if (a === !1 || a === null) return null;
			let { tr: o } = t, s = r[r.length - 1], c = r[0], l = n.to;
			if (s) {
				let r = c.search(/\S/), i = n.from + c.indexOf(s), u = i + s.length;
				if (Au(n.from, n.to, t.doc).filter((t) => t.mark.type.excluded.find((n) => n === e.type && n !== t.mark.type)).filter((e) => e.to > i).length) return null;
				u < n.to && o.delete(u, n.to), i > n.from && o.delete(n.from + r, i), l = n.from + r + s.length, o.addMark(n.from + r, l, e.type.create(a || {})), o.removeStoredMark(e.type);
			}
		}
	});
}
function vd(e, t) {
	let { selection: n } = e, { $from: r } = n;
	if (n instanceof z) {
		let e = r.index();
		return r.parent.canReplaceWith(e, e + 1, t);
	}
	let i = r.depth;
	for (; i >= 0;) {
		let e = r.index(i);
		if (r.node(i).contentMatchAt(e).matchType(t)) return !0;
		--i;
	}
	return !1;
}
var yd = "bottom", bd = "right", xd = "left", Sd = "auto", Cd = [
	"top",
	yd,
	bd,
	xd
], wd = "start", Td = "clippingParents", Ed = "viewport", Dd = "popper", Od = "reference", kd = /*#__PURE__*/ Cd.reduce(function(e, t) {
	return e.concat([t + "-" + wd, t + "-end"]);
}, []), Ad = /*#__PURE__*/ [].concat(Cd, [Sd]).reduce(function(e, t) {
	return e.concat([
		t,
		t + "-" + wd,
		t + "-end"
	]);
}, []), jd = [
	"beforeRead",
	"read",
	"afterRead",
	"beforeMain",
	"main",
	"afterMain",
	"beforeWrite",
	"write",
	"afterWrite"
];
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function Md(e) {
	return e ? (e.nodeName || "").toLowerCase() : null;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function Nd(e) {
	if (e == null) return window;
	if (e.toString() !== "[object Window]") {
		var t = e.ownerDocument;
		return t && t.defaultView || window;
	}
	return e;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function Pd(e) {
	return e instanceof Nd(e).Element || e instanceof Element;
}
function Fd(e) {
	return e instanceof Nd(e).HTMLElement || e instanceof HTMLElement;
}
function Id(e) {
	return typeof ShadowRoot > "u" ? !1 : e instanceof Nd(e).ShadowRoot || e instanceof ShadowRoot;
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function Ld(e) {
	var t = e.state;
	Object.keys(t.elements).forEach(function(e) {
		var n = t.styles[e] || {}, r = t.attributes[e] || {}, i = t.elements[e];
		!Fd(i) || !Md(i) || (Object.assign(i.style, n), Object.keys(r).forEach(function(e) {
			var t = r[e];
			t === !1 ? i.removeAttribute(e) : i.setAttribute(e, t === !0 ? "" : t);
		}));
	});
}
function Rd(e) {
	var t = e.state, n = {
		popper: {
			position: t.options.strategy,
			left: "0",
			top: "0",
			margin: "0"
		},
		arrow: { position: "absolute" },
		reference: {}
	};
	return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
		Object.keys(t.elements).forEach(function(e) {
			var r = t.elements[e], i = t.attributes[e] || {}, a = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce(function(e, t) {
				return e[t] = "", e;
			}, {});
			!Fd(r) || !Md(r) || (Object.assign(r.style, a), Object.keys(i).forEach(function(e) {
				r.removeAttribute(e);
			}));
		});
	};
}
var zd = {
	name: "applyStyles",
	enabled: !0,
	phase: "write",
	fn: Ld,
	effect: Rd,
	requires: ["computeStyles"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function Bd(e) {
	return e.split("-")[0];
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/math.js
var Vd = Math.max, Hd = Math.min, Ud = Math.round;
//#endregion
//#region node_modules/@popperjs/core/lib/utils/userAgent.js
function Wd() {
	var e = navigator.userAgentData;
	return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(e) {
		return e.brand + "/" + e.version;
	}).join(" ") : navigator.userAgent;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function Gd() {
	return !/^((?!chrome|android).)*safari/i.test(Wd());
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function Kd(e, t, n) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	var r = e.getBoundingClientRect(), i = 1, a = 1;
	t && Fd(e) && (i = e.offsetWidth > 0 && Ud(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && Ud(r.height) / e.offsetHeight || 1);
	var o = (Pd(e) ? Nd(e) : window).visualViewport, s = !Gd() && n, c = (r.left + (s && o ? o.offsetLeft : 0)) / i, l = (r.top + (s && o ? o.offsetTop : 0)) / a, u = r.width / i, d = r.height / a;
	return {
		width: u,
		height: d,
		top: l,
		right: c + u,
		bottom: l + d,
		left: c,
		x: c,
		y: l
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function qd(e) {
	var t = Kd(e), n = e.offsetWidth, r = e.offsetHeight;
	return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
		x: e.offsetLeft,
		y: e.offsetTop,
		width: n,
		height: r
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/contains.js
function Jd(e, t) {
	var n = t.getRootNode && t.getRootNode();
	if (e.contains(t)) return !0;
	if (n && Id(n)) {
		var r = t;
		do {
			if (r && e.isSameNode(r)) return !0;
			r = r.parentNode || r.host;
		} while (r);
	}
	return !1;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function Yd(e) {
	return Nd(e).getComputedStyle(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function Xd(e) {
	return [
		"table",
		"td",
		"th"
	].indexOf(Md(e)) >= 0;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function Zd(e) {
	return ((Pd(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function Qd(e) {
	return Md(e) === "html" ? e : e.assignedSlot || e.parentNode || (Id(e) ? e.host : null) || Zd(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function $d(e) {
	return !Fd(e) || Yd(e).position === "fixed" ? null : e.offsetParent;
}
function ef(e) {
	var t = /firefox/i.test(Wd());
	if (/Trident/i.test(Wd()) && Fd(e) && Yd(e).position === "fixed") return null;
	var n = Qd(e);
	for (Id(n) && (n = n.host); Fd(n) && ["html", "body"].indexOf(Md(n)) < 0;) {
		var r = Yd(n);
		if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none") return n;
		n = n.parentNode;
	}
	return null;
}
function tf(e) {
	for (var t = Nd(e), n = $d(e); n && Xd(n) && Yd(n).position === "static";) n = $d(n);
	return n && (Md(n) === "html" || Md(n) === "body" && Yd(n).position === "static") ? t : n || ef(e) || t;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function nf(e) {
	return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/within.js
function rf(e, t, n) {
	return Vd(e, Hd(t, n));
}
function af(e, t, n) {
	var r = rf(e, t, n);
	return r > n ? n : r;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function of() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function sf(e) {
	return Object.assign({}, of(), e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function cf(e, t) {
	return t.reduce(function(t, n) {
		return t[n] = e, t;
	}, {});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/arrow.js
var lf = function(e, t) {
	return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, sf(typeof e == "number" ? cf(e, Cd) : e);
};
function uf(e) {
	var t, n = e.state, r = e.name, i = e.options, a = n.elements.arrow, o = n.modifiersData.popperOffsets, s = Bd(n.placement), c = nf(s), l = ["left", "right"].indexOf(s) >= 0 ? "height" : "width";
	if (!(!a || !o)) {
		var u = lf(i.padding, n), d = qd(a), f = c === "y" ? "top" : xd, p = c === "y" ? yd : bd, m = n.rects.reference[l] + n.rects.reference[c] - o[c] - n.rects.popper[l], h = o[c] - n.rects.reference[c], g = tf(a), _ = g ? c === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, v = m / 2 - h / 2, y = u[f], b = _ - d[l] - u[p], x = _ / 2 - d[l] / 2 + v, S = rf(y, x, b), C = c;
		n.modifiersData[r] = (t = {}, t[C] = S, t.centerOffset = S - x, t);
	}
}
function df(e) {
	var t = e.state, n = e.options.element, r = n === void 0 ? "[data-popper-arrow]" : n;
	r != null && (typeof r == "string" && (r = t.elements.popper.querySelector(r), !r) || Jd(t.elements.popper, r) && (t.elements.arrow = r));
}
var ff = {
	name: "arrow",
	enabled: !0,
	phase: "main",
	fn: uf,
	effect: df,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getVariation.js
function pf(e) {
	return e.split("-")[1];
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var mf = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function hf(e, t) {
	var n = e.x, r = e.y, i = t.devicePixelRatio || 1;
	return {
		x: Ud(n * i) / i || 0,
		y: Ud(r * i) / i || 0
	};
}
function gf(e) {
	var t, n = e.popper, r = e.popperRect, i = e.placement, a = e.variation, o = e.offsets, s = e.position, c = e.gpuAcceleration, l = e.adaptive, u = e.roundOffsets, d = e.isFixed, f = o.x, p = f === void 0 ? 0 : f, m = o.y, h = m === void 0 ? 0 : m, g = typeof u == "function" ? u({
		x: p,
		y: h
	}) : {
		x: p,
		y: h
	};
	p = g.x, h = g.y;
	var _ = o.hasOwnProperty("x"), v = o.hasOwnProperty("y"), y = xd, b = "top", x = window;
	if (l) {
		var S = tf(n), C = "clientHeight", w = "clientWidth";
		if (S === Nd(n) && (S = Zd(n), Yd(S).position !== "static" && s === "absolute" && (C = "scrollHeight", w = "scrollWidth")), S = S, i === "top" || (i === "left" || i === "right") && a === "end") {
			b = yd;
			var T = d && S === x && x.visualViewport ? x.visualViewport.height : S[C];
			h -= T - r.height, h *= c ? 1 : -1;
		}
		if (i === "left" || (i === "top" || i === "bottom") && a === "end") {
			y = bd;
			var E = d && S === x && x.visualViewport ? x.visualViewport.width : S[w];
			p -= E - r.width, p *= c ? 1 : -1;
		}
	}
	var D = Object.assign({ position: s }, l && mf), O = u === !0 ? hf({
		x: p,
		y: h
	}, Nd(n)) : {
		x: p,
		y: h
	};
	if (p = O.x, h = O.y, c) {
		var k;
		return Object.assign({}, D, (k = {}, k[b] = v ? "0" : "", k[y] = _ ? "0" : "", k.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", k));
	}
	return Object.assign({}, D, (t = {}, t[b] = v ? h + "px" : "", t[y] = _ ? p + "px" : "", t.transform = "", t));
}
function _f(e) {
	var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 ? !0 : r, a = n.adaptive, o = a === void 0 ? !0 : a, s = n.roundOffsets, c = s === void 0 ? !0 : s, l = {
		placement: Bd(t.placement),
		variation: pf(t.placement),
		popper: t.elements.popper,
		popperRect: t.rects.popper,
		gpuAcceleration: i,
		isFixed: t.options.strategy === "fixed"
	};
	t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, gf(Object.assign({}, l, {
		offsets: t.modifiersData.popperOffsets,
		position: t.options.strategy,
		adaptive: o,
		roundOffsets: c
	})))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, gf(Object.assign({}, l, {
		offsets: t.modifiersData.arrow,
		position: "absolute",
		adaptive: !1,
		roundOffsets: c
	})))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var vf = {
	name: "computeStyles",
	enabled: !0,
	phase: "beforeWrite",
	fn: _f,
	data: {}
}, yf = { passive: !0 };
function bf(e) {
	var t = e.state, n = e.instance, r = e.options, i = r.scroll, a = i === void 0 ? !0 : i, o = r.resize, s = o === void 0 ? !0 : o, c = Nd(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
	return a && l.forEach(function(e) {
		e.addEventListener("scroll", n.update, yf);
	}), s && c.addEventListener("resize", n.update, yf), function() {
		a && l.forEach(function(e) {
			e.removeEventListener("scroll", n.update, yf);
		}), s && c.removeEventListener("resize", n.update, yf);
	};
}
var xf = {
	name: "eventListeners",
	enabled: !0,
	phase: "write",
	fn: function() {},
	effect: bf,
	data: {}
}, Sf = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Cf(e) {
	return e.replace(/left|right|bottom|top/g, function(e) {
		return Sf[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var wf = {
	start: "end",
	end: "start"
};
function Tf(e) {
	return e.replace(/start|end/g, function(e) {
		return wf[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function Ef(e) {
	var t = Nd(e);
	return {
		scrollLeft: t.pageXOffset,
		scrollTop: t.pageYOffset
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function Df(e) {
	return Kd(Zd(e)).left + Ef(e).scrollLeft;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function Of(e, t) {
	var n = Nd(e), r = Zd(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		var l = Gd();
		(l || !l && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	return {
		width: a,
		height: o,
		x: s + Df(e),
		y: c
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function kf(e) {
	var t = Zd(e), n = Ef(e), r = e.ownerDocument?.body, i = Vd(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), a = Vd(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), o = -n.scrollLeft + Df(e), s = -n.scrollTop;
	return Yd(r || t).direction === "rtl" && (o += Vd(t.clientWidth, r ? r.clientWidth : 0) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function Af(e) {
	var t = Yd(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
	return /auto|scroll|overlay|hidden/.test(n + i + r);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function jf(e) {
	return [
		"html",
		"body",
		"#document"
	].indexOf(Md(e)) >= 0 ? e.ownerDocument.body : Fd(e) && Af(e) ? e : jf(Qd(e));
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function Mf(e, t) {
	t === void 0 && (t = []);
	var n = jf(e), r = n === e.ownerDocument?.body, i = Nd(n), a = r ? [i].concat(i.visualViewport || [], Af(n) ? n : []) : n, o = t.concat(a);
	return r ? o : o.concat(Mf(Qd(a)));
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function Nf(e) {
	return Object.assign({}, e, {
		left: e.x,
		top: e.y,
		right: e.x + e.width,
		bottom: e.y + e.height
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function Pf(e, t) {
	var n = Kd(e, !1, t === "fixed");
	return n.top += e.clientTop, n.left += e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Ff(e, t, n) {
	return t === "viewport" ? Nf(Of(e, n)) : Pd(t) ? Pf(t, n) : Nf(kf(Zd(e)));
}
function If(e) {
	var t = Mf(Qd(e)), n = ["absolute", "fixed"].indexOf(Yd(e).position) >= 0 && Fd(e) ? tf(e) : e;
	return Pd(n) ? t.filter(function(e) {
		return Pd(e) && Jd(e, n) && Md(e) !== "body";
	}) : [];
}
function Lf(e, t, n, r) {
	var i = t === "clippingParents" ? If(e) : [].concat(t), a = [].concat(i, [n]), o = a[0], s = a.reduce(function(t, n) {
		var i = Ff(e, n, r);
		return t.top = Vd(i.top, t.top), t.right = Hd(i.right, t.right), t.bottom = Hd(i.bottom, t.bottom), t.left = Vd(i.left, t.left), t;
	}, Ff(e, o, r));
	return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeOffsets.js
function Rf(e) {
	var t = e.reference, n = e.element, r = e.placement, i = r ? Bd(r) : null, a = r ? pf(r) : null, o = t.x + t.width / 2 - n.width / 2, s = t.y + t.height / 2 - n.height / 2, c;
	switch (i) {
		case "top":
			c = {
				x: o,
				y: t.y - n.height
			};
			break;
		case yd:
			c = {
				x: o,
				y: t.y + t.height
			};
			break;
		case bd:
			c = {
				x: t.x + t.width,
				y: s
			};
			break;
		case xd:
			c = {
				x: t.x - n.width,
				y: s
			};
			break;
		default: c = {
			x: t.x,
			y: t.y
		};
	}
	var l = i ? nf(i) : null;
	if (l != null) {
		var u = l === "y" ? "height" : "width";
		switch (a) {
			case wd:
				c[l] = c[l] - (t[u] / 2 - n[u] / 2);
				break;
			case "end":
				c[l] = c[l] + (t[u] / 2 - n[u] / 2);
				break;
			default:
		}
	}
	return c;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/detectOverflow.js
function zf(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = r === void 0 ? e.placement : r, a = n.strategy, o = a === void 0 ? e.strategy : a, s = n.boundary, c = s === void 0 ? Td : s, l = n.rootBoundary, u = l === void 0 ? Ed : l, d = n.elementContext, f = d === void 0 ? Dd : d, p = n.altBoundary, m = p === void 0 ? !1 : p, h = n.padding, g = h === void 0 ? 0 : h, _ = sf(typeof g == "number" ? cf(g, Cd) : g), v = f === "popper" ? Od : Dd, y = e.rects.popper, b = e.elements[m ? v : f], x = Lf(Pd(b) ? b : b.contextElement || Zd(e.elements.popper), c, u, o), S = Kd(e.elements.reference), C = Rf({
		reference: S,
		element: y,
		strategy: "absolute",
		placement: i
	}), w = Nf(Object.assign({}, y, C)), T = f === "popper" ? w : S, E = {
		top: x.top - T.top + _.top,
		bottom: T.bottom - x.bottom + _.bottom,
		left: x.left - T.left + _.left,
		right: T.right - x.right + _.right
	}, D = e.modifiersData.offset;
	if (f === "popper" && D) {
		var O = D[i];
		Object.keys(E).forEach(function(e) {
			var t = ["right", "bottom"].indexOf(e) >= 0 ? 1 : -1, n = ["top", "bottom"].indexOf(e) >= 0 ? "y" : "x";
			E[e] += O[n] * t;
		});
	}
	return E;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function Bf(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = n.boundary, a = n.rootBoundary, o = n.padding, s = n.flipVariations, c = n.allowedAutoPlacements, l = c === void 0 ? Ad : c, u = pf(r), d = u ? s ? kd : kd.filter(function(e) {
		return pf(e) === u;
	}) : Cd, f = d.filter(function(e) {
		return l.indexOf(e) >= 0;
	});
	f.length === 0 && (f = d);
	var p = f.reduce(function(t, n) {
		return t[n] = zf(e, {
			placement: n,
			boundary: i,
			rootBoundary: a,
			padding: o
		})[Bd(n)], t;
	}, {});
	return Object.keys(p).sort(function(e, t) {
		return p[e] - p[t];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/flip.js
function Vf(e) {
	if (Bd(e) === "auto") return [];
	var t = Cf(e);
	return [
		Tf(e),
		t,
		Tf(t)
	];
}
function Hf(e) {
	var t = e.state, n = e.options, r = e.name;
	if (!t.modifiersData[r]._skip) {
		for (var i = n.mainAxis, a = i === void 0 ? !0 : i, o = n.altAxis, s = o === void 0 ? !0 : o, c = n.fallbackPlacements, l = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, m = p === void 0 ? !0 : p, h = n.allowedAutoPlacements, g = t.options.placement, _ = Bd(g) === g, v = c || (_ || !m ? [Cf(g)] : Vf(g)), y = [g].concat(v).reduce(function(e, n) {
			return e.concat(Bd(n) === "auto" ? Bf(t, {
				placement: n,
				boundary: u,
				rootBoundary: d,
				padding: l,
				flipVariations: m,
				allowedAutoPlacements: h
			}) : n);
		}, []), b = t.rects.reference, x = t.rects.popper, S = /* @__PURE__ */ new Map(), C = !0, w = y[0], T = 0; T < y.length; T++) {
			var E = y[T], D = Bd(E), O = pf(E) === wd, k = ["top", yd].indexOf(D) >= 0, ee = k ? "width" : "height", A = zf(t, {
				placement: E,
				boundary: u,
				rootBoundary: d,
				altBoundary: f,
				padding: l
			}), j = k ? O ? bd : xd : O ? yd : "top";
			b[ee] > x[ee] && (j = Cf(j));
			var M = Cf(j), te = [];
			if (a && te.push(A[D] <= 0), s && te.push(A[j] <= 0, A[M] <= 0), te.every(function(e) {
				return e;
			})) {
				w = E, C = !1;
				break;
			}
			S.set(E, te);
		}
		if (C) for (var ne = m ? 3 : 1, re = function(e) {
			var t = y.find(function(t) {
				var n = S.get(t);
				if (n) return n.slice(0, e).every(function(e) {
					return e;
				});
			});
			if (t) return w = t, "break";
		}, N = ne; N > 0 && re(N) !== "break"; N--);
		t.placement !== w && (t.modifiersData[r]._skip = !0, t.placement = w, t.reset = !0);
	}
}
var Uf = {
	name: "flip",
	enabled: !0,
	phase: "main",
	fn: Hf,
	requiresIfExists: ["offset"],
	data: { _skip: !1 }
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/hide.js
function Wf(e, t, n) {
	return n === void 0 && (n = {
		x: 0,
		y: 0
	}), {
		top: e.top - t.height - n.y,
		right: e.right - t.width + n.x,
		bottom: e.bottom - t.height + n.y,
		left: e.left - t.width - n.x
	};
}
function Gf(e) {
	return [
		"top",
		bd,
		yd,
		xd
	].some(function(t) {
		return e[t] >= 0;
	});
}
function Kf(e) {
	var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, a = t.modifiersData.preventOverflow, o = zf(t, { elementContext: "reference" }), s = zf(t, { altBoundary: !0 }), c = Wf(o, r), l = Wf(s, i, a), u = Gf(c), d = Gf(l);
	t.modifiersData[n] = {
		referenceClippingOffsets: c,
		popperEscapeOffsets: l,
		isReferenceHidden: u,
		hasPopperEscaped: d
	}, t.attributes.popper = Object.assign({}, t.attributes.popper, {
		"data-popper-reference-hidden": u,
		"data-popper-escaped": d
	});
}
var qf = {
	name: "hide",
	enabled: !0,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: Kf
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/offset.js
function Jf(e, t, n) {
	var r = Bd(e), i = ["left", "top"].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, o = a[0], s = a[1];
	return o ||= 0, s = (s || 0) * i, ["left", "right"].indexOf(r) >= 0 ? {
		x: s,
		y: o
	} : {
		x: o,
		y: s
	};
}
function Yf(e) {
	var t = e.state, n = e.options, r = e.name, i = n.offset, a = i === void 0 ? [0, 0] : i, o = Ad.reduce(function(e, n) {
		return e[n] = Jf(n, t.rects, a), e;
	}, {}), s = o[t.placement], c = s.x, l = s.y;
	t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += l), t.modifiersData[r] = o;
}
var Xf = {
	name: "offset",
	enabled: !0,
	phase: "main",
	requires: ["popperOffsets"],
	fn: Yf
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function Zf(e) {
	var t = e.state, n = e.name;
	t.modifiersData[n] = Rf({
		reference: t.rects.reference,
		element: t.rects.popper,
		strategy: "absolute",
		placement: t.placement
	});
}
var Qf = {
	name: "popperOffsets",
	enabled: !0,
	phase: "read",
	fn: Zf,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getAltAxis.js
function $f(e) {
	return e === "x" ? "y" : "x";
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function ep(e) {
	var t = e.state, n = e.options, r = e.name, i = n.mainAxis, a = i === void 0 ? !0 : i, o = n.altAxis, s = o === void 0 ? !1 : o, c = n.boundary, l = n.rootBoundary, u = n.altBoundary, d = n.padding, f = n.tether, p = f === void 0 ? !0 : f, m = n.tetherOffset, h = m === void 0 ? 0 : m, g = zf(t, {
		boundary: c,
		rootBoundary: l,
		padding: d,
		altBoundary: u
	}), _ = Bd(t.placement), v = pf(t.placement), y = !v, b = nf(_), x = $f(b), S = t.modifiersData.popperOffsets, C = t.rects.reference, w = t.rects.popper, T = typeof h == "function" ? h(Object.assign({}, t.rects, { placement: t.placement })) : h, E = typeof T == "number" ? {
		mainAxis: T,
		altAxis: T
	} : Object.assign({
		mainAxis: 0,
		altAxis: 0
	}, T), D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, O = {
		x: 0,
		y: 0
	};
	if (S) {
		if (a) {
			var k = b === "y" ? "top" : xd, ee = b === "y" ? yd : bd, A = b === "y" ? "height" : "width", j = S[b], M = j + g[k], te = j - g[ee], ne = p ? -w[A] / 2 : 0, re = v === "start" ? C[A] : w[A], N = v === "start" ? -w[A] : -C[A], ie = t.elements.arrow, P = p && ie ? qd(ie) : {
				width: 0,
				height: 0
			}, ae = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : of(), oe = ae[k], se = ae[ee], ce = rf(0, C[A], P[A]), le = y ? C[A] / 2 - ne - ce - oe - E.mainAxis : re - ce - oe - E.mainAxis, ue = y ? -C[A] / 2 + ne + ce + se + E.mainAxis : N + ce + se + E.mainAxis, de = t.elements.arrow && tf(t.elements.arrow), fe = de ? b === "y" ? de.clientTop || 0 : de.clientLeft || 0 : 0, pe = D?.[b] ?? 0, me = j + le - pe - fe, he = j + ue - pe, ge = rf(p ? Hd(M, me) : M, j, p ? Vd(te, he) : te);
			S[b] = ge, O[b] = ge - j;
		}
		if (s) {
			var _e = b === "x" ? "top" : xd, ve = b === "x" ? yd : bd, ye = S[x], be = x === "y" ? "height" : "width", xe = ye + g[_e], Se = ye - g[ve], Ce = ["top", xd].indexOf(_) !== -1, we = D?.[x] ?? 0, Te = Ce ? xe : ye - C[be] - w[be] - we + E.altAxis, Ee = Ce ? ye + C[be] + w[be] - we - E.altAxis : Se, De = p && Ce ? af(Te, ye, Ee) : rf(p ? Te : xe, ye, p ? Ee : Se);
			S[x] = De, O[x] = De - ye;
		}
		t.modifiersData[r] = O;
	}
}
var tp = {
	name: "preventOverflow",
	enabled: !0,
	phase: "main",
	fn: ep,
	requiresIfExists: ["offset"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function np(e) {
	return {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function rp(e) {
	return e === Nd(e) || !Fd(e) ? Ef(e) : np(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function ip(e) {
	var t = e.getBoundingClientRect(), n = Ud(t.width) / e.offsetWidth || 1, r = Ud(t.height) / e.offsetHeight || 1;
	return n !== 1 || r !== 1;
}
function ap(e, t, n) {
	n === void 0 && (n = !1);
	var r = Fd(t), i = Fd(t) && ip(t), a = Zd(t), o = Kd(e, i, n), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = {
		x: 0,
		y: 0
	};
	return (r || !r && !n) && ((Md(t) !== "body" || Af(a)) && (s = rp(t)), Fd(t) ? (c = Kd(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Df(a))), {
		x: o.left + s.scrollLeft - c.x,
		y: o.top + s.scrollTop - c.y,
		width: o.width,
		height: o.height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/orderModifiers.js
function op(e) {
	var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
	e.forEach(function(e) {
		t.set(e.name, e);
	});
	function i(e) {
		n.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach(function(e) {
			if (!n.has(e)) {
				var r = t.get(e);
				r && i(r);
			}
		}), r.push(e);
	}
	return e.forEach(function(e) {
		n.has(e.name) || i(e);
	}), r;
}
function sp(e) {
	var t = op(e);
	return jd.reduce(function(e, n) {
		return e.concat(t.filter(function(e) {
			return e.phase === n;
		}));
	}, []);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/debounce.js
function cp(e) {
	var t;
	return function() {
		return t ||= new Promise(function(n) {
			Promise.resolve().then(function() {
				t = void 0, n(e());
			});
		}), t;
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergeByName.js
function lp(e) {
	var t = e.reduce(function(e, t) {
		var n = e[t.name];
		return e[t.name] = n ? Object.assign({}, n, t, {
			options: Object.assign({}, n.options, t.options),
			data: Object.assign({}, n.data, t.data)
		}) : t, e;
	}, {});
	return Object.keys(t).map(function(e) {
		return t[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/createPopper.js
var up = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function dp() {
	return ![...arguments].some(function(e) {
		return !(e && typeof e.getBoundingClientRect == "function");
	});
}
function fp(e) {
	e === void 0 && (e = {});
	var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, a = i === void 0 ? up : i;
	return function(e, t, n) {
		n === void 0 && (n = a);
		var i = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, up, a),
			modifiersData: {},
			elements: {
				reference: e,
				popper: t
			},
			attributes: {},
			styles: {}
		}, o = [], s = !1, c = {
			state: i,
			setOptions: function(n) {
				var o = typeof n == "function" ? n(i.options) : n;
				u(), i.options = Object.assign({}, a, i.options, o), i.scrollParents = {
					reference: Pd(e) ? Mf(e) : e.contextElement ? Mf(e.contextElement) : [],
					popper: Mf(t)
				};
				var s = sp(lp([].concat(r, i.options.modifiers)));
				return i.orderedModifiers = s.filter(function(e) {
					return e.enabled;
				}), l(), c.update();
			},
			forceUpdate: function() {
				if (!s) {
					var e = i.elements, t = e.reference, n = e.popper;
					if (dp(t, n)) {
						i.rects = {
							reference: ap(t, tf(n), i.options.strategy === "fixed"),
							popper: qd(n)
						}, i.reset = !1, i.placement = i.options.placement, i.orderedModifiers.forEach(function(e) {
							return i.modifiersData[e.name] = Object.assign({}, e.data);
						});
						for (var r = 0; r < i.orderedModifiers.length; r++) {
							if (i.reset === !0) {
								i.reset = !1, r = -1;
								continue;
							}
							var a = i.orderedModifiers[r], o = a.fn, l = a.options, u = l === void 0 ? {} : l, d = a.name;
							typeof o == "function" && (i = o({
								state: i,
								options: u,
								name: d,
								instance: c
							}) || i);
						}
					}
				}
			},
			update: cp(function() {
				return new Promise(function(e) {
					c.forceUpdate(), e(i);
				});
			}),
			destroy: function() {
				u(), s = !0;
			}
		};
		if (!dp(e, t)) return c;
		c.setOptions(n).then(function(e) {
			!s && n.onFirstUpdate && n.onFirstUpdate(e);
		});
		function l() {
			i.orderedModifiers.forEach(function(e) {
				var t = e.name, n = e.options, r = n === void 0 ? {} : n, a = e.effect;
				if (typeof a == "function") {
					var s = a({
						state: i,
						name: t,
						instance: c,
						options: r
					});
					o.push(s || function() {});
				}
			});
		}
		function u() {
			o.forEach(function(e) {
				return e();
			}), o = [];
		}
		return c;
	};
}
var pp = /*#__PURE__*/ fp({ defaultModifiers: [
	xf,
	Qf,
	vf,
	zd,
	Xf,
	Uf,
	tp,
	ff,
	qf
] }), mp = "tippy-box", hp = "tippy-content", gp = "tippy-backdrop", _p = "tippy-arrow", vp = "tippy-svg-arrow", yp = {
	passive: !0,
	capture: !0
}, bp = function() {
	return document.body;
};
function xp(e, t, n) {
	return Array.isArray(e) ? e[t] ?? (Array.isArray(n) ? n[t] : n) : e;
}
function Sp(e, t) {
	var n = {}.toString.call(e);
	return n.indexOf("[object") === 0 && n.indexOf(t + "]") > -1;
}
function Cp(e, t) {
	return typeof e == "function" ? e.apply(void 0, t) : e;
}
function wp(e, t) {
	if (t === 0) return e;
	var n;
	return function(r) {
		clearTimeout(n), n = setTimeout(function() {
			e(r);
		}, t);
	};
}
function Tp(e) {
	return e.split(/\s+/).filter(Boolean);
}
function Ep(e) {
	return [].concat(e);
}
function Dp(e, t) {
	e.indexOf(t) === -1 && e.push(t);
}
function Op(e) {
	return e.filter(function(t, n) {
		return e.indexOf(t) === n;
	});
}
function kp(e) {
	return e.split("-")[0];
}
function Ap(e) {
	return [].slice.call(e);
}
function jp(e) {
	return Object.keys(e).reduce(function(t, n) {
		return e[n] !== void 0 && (t[n] = e[n]), t;
	}, {});
}
function Mp() {
	return document.createElement("div");
}
function Np(e) {
	return ["Element", "Fragment"].some(function(t) {
		return Sp(e, t);
	});
}
function Pp(e) {
	return Sp(e, "NodeList");
}
function Fp(e) {
	return Sp(e, "MouseEvent");
}
function Ip(e) {
	return !!(e && e._tippy && e._tippy.reference === e);
}
function Lp(e) {
	return Np(e) ? [e] : Pp(e) ? Ap(e) : Array.isArray(e) ? e : Ap(document.querySelectorAll(e));
}
function Rp(e, t) {
	e.forEach(function(e) {
		e && (e.style.transitionDuration = t + "ms");
	});
}
function zp(e, t) {
	e.forEach(function(e) {
		e && e.setAttribute("data-state", t);
	});
}
function Bp(e) {
	var t, n = Ep(e)[0];
	return n != null && (t = n.ownerDocument) != null && t.body ? n.ownerDocument : document;
}
function Vp(e, t) {
	var n = t.clientX, r = t.clientY;
	return e.every(function(e) {
		var t = e.popperRect, i = e.popperState, a = e.props.interactiveBorder, o = kp(i.placement), s = i.modifiersData.offset;
		if (!s) return !0;
		var c = o === "bottom" ? s.top.y : 0, l = o === "top" ? s.bottom.y : 0, u = o === "right" ? s.left.x : 0, d = o === "left" ? s.right.x : 0, f = t.top - r + c > a, p = r - t.bottom - l > a, m = t.left - n + u > a, h = n - t.right - d > a;
		return f || p || m || h;
	});
}
function Hp(e, t, n) {
	var r = t + "EventListener";
	["transitionend", "webkitTransitionEnd"].forEach(function(t) {
		e[r](t, n);
	});
}
function Up(e, t) {
	for (var n = t; n;) {
		if (e.contains(n)) return !0;
		n = n.getRootNode == null ? void 0 : n.getRootNode()?.host;
	}
	return !1;
}
var Wp = { isTouch: !1 }, Gp = 0;
function Kp() {
	Wp.isTouch || (Wp.isTouch = !0, window.performance && document.addEventListener("mousemove", qp));
}
function qp() {
	var e = performance.now();
	e - Gp < 20 && (Wp.isTouch = !1, document.removeEventListener("mousemove", qp)), Gp = e;
}
function Jp() {
	var e = document.activeElement;
	if (Ip(e)) {
		var t = e._tippy;
		e.blur && !t.state.isVisible && e.blur();
	}
}
function Yp() {
	document.addEventListener("touchstart", Kp, yp), window.addEventListener("blur", Jp);
}
var Xp = typeof window < "u" && typeof document < "u" ? !!window.msCrypto : !1, Zp = Object.assign({
	appendTo: bp,
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
	onAfterUpdate: function() {},
	onBeforeUpdate: function() {},
	onCreate: function() {},
	onDestroy: function() {},
	onHidden: function() {},
	onHide: function() {},
	onMount: function() {},
	onShow: function() {},
	onShown: function() {},
	onTrigger: function() {},
	onUntrigger: function() {},
	onClickOutside: function() {},
	placement: "top",
	plugins: [],
	popperOptions: {},
	render: null,
	showOnCreate: !1,
	touch: !0,
	trigger: "mouseenter focus",
	triggerTarget: null
}, {
	animateFill: !1,
	followCursor: !1,
	inlinePositioning: !1,
	sticky: !1
}, {
	allowHTML: !1,
	animation: "fade",
	arrow: !0,
	content: "",
	inertia: !1,
	maxWidth: 350,
	role: "tooltip",
	theme: "",
	zIndex: 9999
}), Qp = Object.keys(Zp), $p = function(e) {
	Object.keys(e).forEach(function(t) {
		Zp[t] = e[t];
	});
};
function em(e) {
	var t = (e.plugins || []).reduce(function(t, n) {
		var r = n.name, i = n.defaultValue;
		return r && (t[r] = e[r] === void 0 ? Zp[r] ?? i : e[r]), t;
	}, {});
	return Object.assign({}, e, t);
}
function tm(e, t) {
	return (t ? Object.keys(em(Object.assign({}, Zp, { plugins: t }))) : Qp).reduce(function(t, n) {
		var r = (e.getAttribute("data-tippy-" + n) || "").trim();
		if (!r) return t;
		if (n === "content") t[n] = r;
		else try {
			t[n] = JSON.parse(r);
		} catch {
			t[n] = r;
		}
		return t;
	}, {});
}
function nm(e, t) {
	var n = Object.assign({}, t, { content: Cp(t.content, [e]) }, t.ignoreAttributes ? {} : tm(e, t.plugins));
	return n.aria = Object.assign({}, Zp.aria, n.aria), n.aria = {
		expanded: n.aria.expanded === "auto" ? t.interactive : n.aria.expanded,
		content: n.aria.content === "auto" ? t.interactive ? null : "describedby" : n.aria.content
	}, n;
}
var rm = function() {
	return "innerHTML";
};
function im(e, t) {
	e[rm()] = t;
}
function am(e) {
	var t = Mp();
	return e === !0 ? t.className = _p : (t.className = vp, Np(e) ? t.appendChild(e) : im(t, e)), t;
}
function om(e, t) {
	Np(t.content) ? (im(e, ""), e.appendChild(t.content)) : typeof t.content != "function" && (t.allowHTML ? im(e, t.content) : e.textContent = t.content);
}
function sm(e) {
	var t = e.firstElementChild, n = Ap(t.children);
	return {
		box: t,
		content: n.find(function(e) {
			return e.classList.contains(hp);
		}),
		arrow: n.find(function(e) {
			return e.classList.contains(_p) || e.classList.contains(vp);
		}),
		backdrop: n.find(function(e) {
			return e.classList.contains(gp);
		})
	};
}
function cm(e) {
	var t = Mp(), n = Mp();
	n.className = mp, n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
	var r = Mp();
	r.className = hp, r.setAttribute("data-state", "hidden"), om(r, e.props), t.appendChild(n), n.appendChild(r), i(e.props, e.props);
	function i(n, r) {
		var i = sm(t), a = i.box, o = i.content, s = i.arrow;
		r.theme ? a.setAttribute("data-theme", r.theme) : a.removeAttribute("data-theme"), typeof r.animation == "string" ? a.setAttribute("data-animation", r.animation) : a.removeAttribute("data-animation"), r.inertia ? a.setAttribute("data-inertia", "") : a.removeAttribute("data-inertia"), a.style.maxWidth = typeof r.maxWidth == "number" ? r.maxWidth + "px" : r.maxWidth, r.role ? a.setAttribute("role", r.role) : a.removeAttribute("role"), (n.content !== r.content || n.allowHTML !== r.allowHTML) && om(o, e.props), r.arrow ? s ? n.arrow !== r.arrow && (a.removeChild(s), a.appendChild(am(r.arrow))) : a.appendChild(am(r.arrow)) : s && a.removeChild(s);
	}
	return {
		popper: t,
		onUpdate: i
	};
}
cm.$$tippy = !0;
var lm = 1, um = [], dm = [];
function fm(e, t) {
	var n = nm(e, Object.assign({}, Zp, em(jp(t)))), r, i, a, o = !1, s = !1, c = !1, l = !1, u, d, f, p = [], m = wp(me, n.interactiveDebounce), h, g = lm++, _ = null, v = Op(n.plugins), y = {
		id: g,
		reference: e,
		popper: Mp(),
		popperInstance: _,
		props: n,
		state: {
			isEnabled: !0,
			isVisible: !1,
			isDestroyed: !1,
			isMounted: !1,
			isShown: !1
		},
		plugins: v,
		clearDelayTimeouts: Ee,
		setProps: De,
		setContent: Oe,
		show: ke,
		hide: Ae,
		hideWithInteractivity: je,
		enable: we,
		disable: Te,
		unmount: Me,
		destroy: Ne
	};
	/* istanbul ignore if */
	if (!n.render) return y;
	var b = n.render(y), x = b.popper, S = b.onUpdate;
	x.setAttribute("data-tippy-root", ""), x.id = "tippy-" + y.id, y.popper = x, e._tippy = y, x._tippy = y;
	var C = v.map(function(e) {
		return e.fn(y);
	}), w = e.hasAttribute("aria-expanded");
	return de(), ne(), j(), M("onCreate", [y]), n.showOnCreate && Se(), x.addEventListener("mouseenter", function() {
		y.props.interactive && y.state.isVisible && y.clearDelayTimeouts();
	}), x.addEventListener("mouseleave", function() {
		y.props.interactive && y.props.trigger.indexOf("mouseenter") >= 0 && k().addEventListener("mousemove", m);
	}), y;
	function T() {
		var e = y.props.touch;
		return Array.isArray(e) ? e : [e, 0];
	}
	function E() {
		return T()[0] === "hold";
	}
	function D() {
		var e;
		return !!((e = y.props.render) != null && e.$$tippy);
	}
	function O() {
		return h || e;
	}
	function k() {
		var e = O().parentNode;
		return e ? Bp(e) : document;
	}
	function ee() {
		return sm(x);
	}
	function A(e) {
		return y.state.isMounted && !y.state.isVisible || Wp.isTouch || u && u.type === "focus" ? 0 : xp(y.props.delay, +!e, Zp.delay);
	}
	function j(e) {
		e === void 0 && (e = !1), x.style.pointerEvents = y.props.interactive && !e ? "" : "none", x.style.zIndex = "" + y.props.zIndex;
	}
	function M(e, t, n) {
		if (n === void 0 && (n = !0), C.forEach(function(n) {
			n[e] && n[e].apply(n, t);
		}), n) {
			var r;
			(r = y.props)[e].apply(r, t);
		}
	}
	function te() {
		var t = y.props.aria;
		if (t.content) {
			var n = "aria-" + t.content, r = x.id;
			Ep(y.props.triggerTarget || e).forEach(function(e) {
				var t = e.getAttribute(n);
				if (y.state.isVisible) e.setAttribute(n, t ? t + " " + r : r);
				else {
					var i = t && t.replace(r, "").trim();
					i ? e.setAttribute(n, i) : e.removeAttribute(n);
				}
			});
		}
	}
	function ne() {
		w || !y.props.aria.expanded || Ep(y.props.triggerTarget || e).forEach(function(e) {
			y.props.interactive ? e.setAttribute("aria-expanded", y.state.isVisible && e === O() ? "true" : "false") : e.removeAttribute("aria-expanded");
		});
	}
	function re() {
		k().removeEventListener("mousemove", m), um = um.filter(function(e) {
			return e !== m;
		});
	}
	function N(t) {
		if (!(Wp.isTouch && (c || t.type === "mousedown"))) {
			var n = t.composedPath && t.composedPath()[0] || t.target;
			if (!(y.props.interactive && Up(x, n))) {
				if (Ep(y.props.triggerTarget || e).some(function(e) {
					return Up(e, n);
				})) {
					if (Wp.isTouch || y.state.isVisible && y.props.trigger.indexOf("click") >= 0) return;
				} else M("onClickOutside", [y, t]);
				y.props.hideOnClick === !0 && (y.clearDelayTimeouts(), y.hide(), s = !0, setTimeout(function() {
					s = !1;
				}), y.state.isMounted || oe());
			}
		}
	}
	function ie() {
		c = !0;
	}
	function P() {
		c = !1;
	}
	function ae() {
		var e = k();
		e.addEventListener("mousedown", N, !0), e.addEventListener("touchend", N, yp), e.addEventListener("touchstart", P, yp), e.addEventListener("touchmove", ie, yp);
	}
	function oe() {
		var e = k();
		e.removeEventListener("mousedown", N, !0), e.removeEventListener("touchend", N, yp), e.removeEventListener("touchstart", P, yp), e.removeEventListener("touchmove", ie, yp);
	}
	function se(e, t) {
		le(e, function() {
			!y.state.isVisible && x.parentNode && x.parentNode.contains(x) && t();
		});
	}
	function ce(e, t) {
		le(e, t);
	}
	function le(e, t) {
		var n = ee().box;
		function r(e) {
			e.target === n && (Hp(n, "remove", r), t());
		}
		if (e === 0) return t();
		Hp(n, "remove", d), Hp(n, "add", r), d = r;
	}
	function ue(t, n, r) {
		r === void 0 && (r = !1), Ep(y.props.triggerTarget || e).forEach(function(e) {
			e.addEventListener(t, n, r), p.push({
				node: e,
				eventType: t,
				handler: n,
				options: r
			});
		});
	}
	function de() {
		E() && (ue("touchstart", pe, { passive: !0 }), ue("touchend", he, { passive: !0 })), Tp(y.props.trigger).forEach(function(e) {
			if (e !== "manual") switch (ue(e, pe), e) {
				case "mouseenter":
					ue("mouseleave", he);
					break;
				case "focus":
					ue(Xp ? "focusout" : "blur", ge);
					break;
				case "focusin":
					ue("focusout", ge);
					break;
			}
		});
	}
	function fe() {
		p.forEach(function(e) {
			var t = e.node, n = e.eventType, r = e.handler, i = e.options;
			t.removeEventListener(n, r, i);
		}), p = [];
	}
	function pe(e) {
		var t = !1;
		if (!(!y.state.isEnabled || _e(e) || s)) {
			var n = u?.type === "focus";
			u = e, h = e.currentTarget, ne(), !y.state.isVisible && Fp(e) && um.forEach(function(t) {
				return t(e);
			}), e.type === "click" && (y.props.trigger.indexOf("mouseenter") < 0 || o) && y.props.hideOnClick !== !1 && y.state.isVisible ? t = !0 : Se(e), e.type === "click" && (o = !t), t && !n && Ce(e);
		}
	}
	function me(e) {
		var t = e.target, r = O().contains(t) || x.contains(t);
		e.type === "mousemove" && r || Vp(xe().concat(x).map(function(e) {
			var t = e._tippy.popperInstance?.state;
			return t ? {
				popperRect: e.getBoundingClientRect(),
				popperState: t,
				props: n
			} : null;
		}).filter(Boolean), e) && (re(), Ce(e));
	}
	function he(e) {
		if (!(_e(e) || y.props.trigger.indexOf("click") >= 0 && o)) {
			if (y.props.interactive) {
				y.hideWithInteractivity(e);
				return;
			}
			Ce(e);
		}
	}
	function ge(e) {
		y.props.trigger.indexOf("focusin") < 0 && e.target !== O() || y.props.interactive && e.relatedTarget && x.contains(e.relatedTarget) || Ce(e);
	}
	function _e(e) {
		return Wp.isTouch ? E() !== e.type.indexOf("touch") >= 0 : !1;
	}
	function ve() {
		ye();
		var t = y.props, n = t.popperOptions, r = t.placement, i = t.offset, a = t.getReferenceClientRect, o = t.moveTransition, s = D() ? sm(x).arrow : null, c = a ? {
			getBoundingClientRect: a,
			contextElement: a.contextElement || O()
		} : e, l = [
			{
				name: "offset",
				options: { offset: i }
			},
			{
				name: "preventOverflow",
				options: { padding: {
					top: 2,
					bottom: 2,
					left: 5,
					right: 5
				} }
			},
			{
				name: "flip",
				options: { padding: 5 }
			},
			{
				name: "computeStyles",
				options: { adaptive: !o }
			},
			{
				name: "$$tippy",
				enabled: !0,
				phase: "beforeWrite",
				requires: ["computeStyles"],
				fn: function(e) {
					var t = e.state;
					if (D()) {
						var n = ee().box;
						[
							"placement",
							"reference-hidden",
							"escaped"
						].forEach(function(e) {
							e === "placement" ? n.setAttribute("data-placement", t.placement) : t.attributes.popper["data-popper-" + e] ? n.setAttribute("data-" + e, "") : n.removeAttribute("data-" + e);
						}), t.attributes.popper = {};
					}
				}
			}
		];
		D() && s && l.push({
			name: "arrow",
			options: {
				element: s,
				padding: 3
			}
		}), l.push.apply(l, n?.modifiers || []), y.popperInstance = pp(c, x, Object.assign({}, n, {
			placement: r,
			onFirstUpdate: f,
			modifiers: l
		}));
	}
	function ye() {
		y.popperInstance &&= (y.popperInstance.destroy(), null);
	}
	function be() {
		var e = y.props.appendTo, t, n = O();
		t = y.props.interactive && e === bp || e === "parent" ? n.parentNode : Cp(e, [n]), t.contains(x) || t.appendChild(x), y.state.isMounted = !0, ve();
	}
	function xe() {
		return Ap(x.querySelectorAll("[data-tippy-root]"));
	}
	function Se(e) {
		y.clearDelayTimeouts(), e && M("onTrigger", [y, e]), ae();
		var t = A(!0), n = T(), i = n[0], a = n[1];
		Wp.isTouch && i === "hold" && a && (t = a), t ? r = setTimeout(function() {
			y.show();
		}, t) : y.show();
	}
	function Ce(e) {
		if (y.clearDelayTimeouts(), M("onUntrigger", [y, e]), !y.state.isVisible) {
			oe();
			return;
		}
		if (!(y.props.trigger.indexOf("mouseenter") >= 0 && y.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(e.type) >= 0 && o)) {
			var t = A(!1);
			t ? i = setTimeout(function() {
				y.state.isVisible && y.hide();
			}, t) : a = requestAnimationFrame(function() {
				y.hide();
			});
		}
	}
	function we() {
		y.state.isEnabled = !0;
	}
	function Te() {
		y.hide(), y.state.isEnabled = !1;
	}
	function Ee() {
		clearTimeout(r), clearTimeout(i), cancelAnimationFrame(a);
	}
	function De(t) {
		if (!y.state.isDestroyed) {
			M("onBeforeUpdate", [y, t]), fe();
			var n = y.props, r = nm(e, Object.assign({}, n, jp(t), { ignoreAttributes: !0 }));
			y.props = r, de(), n.interactiveDebounce !== r.interactiveDebounce && (re(), m = wp(me, r.interactiveDebounce)), n.triggerTarget && !r.triggerTarget ? Ep(n.triggerTarget).forEach(function(e) {
				e.removeAttribute("aria-expanded");
			}) : r.triggerTarget && e.removeAttribute("aria-expanded"), ne(), j(), S && S(n, r), y.popperInstance && (ve(), xe().forEach(function(e) {
				requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
			})), M("onAfterUpdate", [y, t]);
		}
	}
	function Oe(e) {
		y.setProps({ content: e });
	}
	function ke() {
		var e = y.state.isVisible, t = y.state.isDestroyed, n = !y.state.isEnabled, r = Wp.isTouch && !y.props.touch, i = xp(y.props.duration, 0, Zp.duration);
		if (!(e || t || n || r) && !O().hasAttribute("disabled") && (M("onShow", [y], !1), y.props.onShow(y) !== !1)) {
			if (y.state.isVisible = !0, D() && (x.style.visibility = "visible"), j(), ae(), y.state.isMounted || (x.style.transition = "none"), D()) {
				var a = ee(), o = a.box, s = a.content;
				Rp([o, s], 0);
			}
			f = function() {
				var e;
				if (!(!y.state.isVisible || l)) {
					if (l = !0, x.offsetHeight, x.style.transition = y.props.moveTransition, D() && y.props.animation) {
						var t = ee(), n = t.box, r = t.content;
						Rp([n, r], i), zp([n, r], "visible");
					}
					te(), ne(), Dp(dm, y), (e = y.popperInstance) == null || e.forceUpdate(), M("onMount", [y]), y.props.animation && D() && ce(i, function() {
						y.state.isShown = !0, M("onShown", [y]);
					});
				}
			}, be();
		}
	}
	function Ae() {
		var e = !y.state.isVisible, t = y.state.isDestroyed, n = !y.state.isEnabled, r = xp(y.props.duration, 1, Zp.duration);
		if (!(e || t || n) && (M("onHide", [y], !1), y.props.onHide(y) !== !1)) {
			if (y.state.isVisible = !1, y.state.isShown = !1, l = !1, o = !1, D() && (x.style.visibility = "hidden"), re(), oe(), j(!0), D()) {
				var i = ee(), a = i.box, s = i.content;
				y.props.animation && (Rp([a, s], r), zp([a, s], "hidden"));
			}
			te(), ne(), y.props.animation ? D() && se(r, y.unmount) : y.unmount();
		}
	}
	function je(e) {
		k().addEventListener("mousemove", m), Dp(um, m), m(e);
	}
	function Me() {
		y.state.isVisible && y.hide(), y.state.isMounted && (ye(), xe().forEach(function(e) {
			e._tippy.unmount();
		}), x.parentNode && x.parentNode.removeChild(x), dm = dm.filter(function(e) {
			return e !== y;
		}), y.state.isMounted = !1, M("onHidden", [y]));
	}
	function Ne() {
		y.state.isDestroyed || (y.clearDelayTimeouts(), y.unmount(), fe(), delete e._tippy, y.state.isDestroyed = !0, M("onDestroy", [y]));
	}
}
function pm(e, t) {
	t === void 0 && (t = {});
	var n = Zp.plugins.concat(t.plugins || []);
	Yp();
	var r = Object.assign({}, t, { plugins: n }), i = Lp(e).reduce(function(e, t) {
		var n = t && fm(t, r);
		return n && e.push(n), e;
	}, []);
	return Np(e) ? i[0] : i;
}
pm.defaultProps = Zp, pm.setDefaultProps = $p, pm.currentInput = Wp, Object.assign({}, zd, { effect: function(e) {
	var t = e.state, n = {
		popper: {
			position: t.options.strategy,
			left: "0",
			top: "0",
			margin: "0"
		},
		arrow: { position: "absolute" },
		reference: {}
	};
	Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow);
} }), pm.setDefaultProps({ render: cm });
//#endregion
//#region node_modules/@tiptap/extension-bubble-menu/dist/index.js
var mm = class {
	constructor({ editor: e, element: t, view: n, tippyOptions: r = {}, updateDelay: i = 250, shouldShow: a }) {
		this.preventHide = !1, this.shouldShow = ({ view: e, state: t, from: n, to: r }) => {
			let { doc: i, selection: a } = t, { empty: o } = a, s = !i.textBetween(n, r).length && kl(t.selection), c = this.element.contains(document.activeElement);
			return !(!(e.hasFocus() || c) || o || s || !this.editor.isEditable);
		}, this.mousedownHandler = () => {
			this.preventHide = !0;
		}, this.dragstartHandler = () => {
			this.hide();
		}, this.focusHandler = () => {
			setTimeout(() => this.update(this.editor.view));
		}, this.blurHandler = ({ event: e }) => {
			if (this.preventHide) {
				this.preventHide = !1;
				return;
			}
			e?.relatedTarget && this.element.parentNode?.contains(e.relatedTarget) || e?.relatedTarget !== this.editor.view.dom && this.hide();
		}, this.tippyBlurHandler = (e) => {
			this.blurHandler({ event: e });
		}, this.handleDebouncedUpdate = (e, t) => {
			let n = !t?.selection.eq(e.state.selection), r = !t?.doc.eq(e.state.doc);
			!n && !r || (this.updateDebounceTimer && clearTimeout(this.updateDebounceTimer), this.updateDebounceTimer = window.setTimeout(() => {
				this.updateHandler(e, n, r, t);
			}, this.updateDelay));
		}, this.updateHandler = (e, t, n, r) => {
			var i;
			let { state: a, composing: o } = e, { selection: s } = a;
			if (o || !t && !n) return;
			this.createTooltip();
			let { ranges: c } = s, l = Math.min(...c.map((e) => e.$from.pos)), u = Math.max(...c.map((e) => e.$to.pos));
			if (!this.shouldShow?.call(this, {
				editor: this.editor,
				element: this.element,
				view: e,
				state: a,
				oldState: r,
				from: l,
				to: u
			})) {
				this.hide();
				return;
			}
			(i = this.tippy) == null || i.setProps({ getReferenceClientRect: this.tippyOptions?.getReferenceClientRect || (() => {
				if (zu(a.selection)) {
					let t = e.nodeDOM(l);
					if (t) {
						let e = t.dataset.nodeViewWrapper ? t : t.querySelector("[data-node-view-wrapper]");
						if (e && (t = e.firstChild), t) return t.getBoundingClientRect();
					}
				}
				return Bu(e, l, u);
			}) }), this.show();
		}, this.editor = e, this.element = t, this.view = n, this.updateDelay = i, a && (this.shouldShow = a), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.addEventListener("dragstart", this.dragstartHandler), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = r, this.element.remove(), this.element.style.visibility = "visible";
	}
	createTooltip() {
		let { element: e } = this.editor.options, t = !!e.parentElement;
		this.element.tabIndex = 0, !(this.tippy || !t) && (this.tippy = pm(e, {
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
		let { state: n } = e, r = n.selection.from !== n.selection.to;
		if (this.updateDelay > 0 && r) {
			this.handleDebouncedUpdate(e, t);
			return;
		}
		let i = !t?.selection.eq(e.state.selection), a = !t?.doc.eq(e.state.doc);
		this.updateHandler(e, i, a, t);
	}
	show() {
		var e;
		(e = this.tippy) == null || e.show();
	}
	hide() {
		var e;
		(e = this.tippy) == null || e.hide();
	}
	destroy() {
		var e;
		this.tippy?.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (e = this.tippy) == null || e.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.removeEventListener("dragstart", this.dragstartHandler), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
	}
}, hm = (e) => new B({
	key: typeof e.pluginKey == "string" ? new $n(e.pluginKey) : e.pluginKey,
	view: (t) => new mm({
		view: t,
		...e
	})
});
ol.create({
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
		return this.options.element ? [hm({
			pluginKey: this.options.pluginKey,
			editor: this.editor,
			element: this.options.element,
			tippyOptions: this.options.tippyOptions,
			updateDelay: this.options.updateDelay,
			shouldShow: this.options.shouldShow
		})] : [];
	}
});
//#endregion
//#region node_modules/@tiptap/extension-floating-menu/dist/index.js
var gm = class {
	getTextContent(e) {
		return wu(e, { textSerializers: cl(this.editor.schema) });
	}
	constructor({ editor: e, element: t, view: n, tippyOptions: r = {}, shouldShow: i }) {
		this.preventHide = !1, this.shouldShow = ({ view: e, state: t }) => {
			let { selection: n } = t, { $anchor: r, empty: i } = n, a = r.depth === 1, o = r.parent.isTextblock && !r.parent.type.spec.code && !r.parent.textContent && r.parent.childCount === 0 && !this.getTextContent(r.parent);
			return !(!e.hasFocus() || !i || !a || !o || !this.editor.isEditable);
		}, this.mousedownHandler = () => {
			this.preventHide = !0;
		}, this.focusHandler = () => {
			setTimeout(() => this.update(this.editor.view));
		}, this.blurHandler = ({ event: e }) => {
			if (this.preventHide) {
				this.preventHide = !1;
				return;
			}
			e?.relatedTarget && this.element.parentNode?.contains(e.relatedTarget) || e?.relatedTarget !== this.editor.view.dom && this.hide();
		}, this.tippyBlurHandler = (e) => {
			this.blurHandler({ event: e });
		}, this.editor = e, this.element = t, this.view = n, i && (this.shouldShow = i), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = r, this.element.remove(), this.element.style.visibility = "visible";
	}
	createTooltip() {
		let { element: e } = this.editor.options, t = !!e.parentElement;
		this.element.tabIndex = 0, !(this.tippy || !t) && (this.tippy = pm(e, {
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
		var n;
		let { state: r } = e, { doc: i, selection: a } = r, { from: o, to: s } = a;
		if (!(t && t.doc.eq(i) && t.selection.eq(a))) {
			if (this.createTooltip(), !this.shouldShow?.call(this, {
				editor: this.editor,
				view: e,
				state: r,
				oldState: t
			})) {
				this.hide();
				return;
			}
			(n = this.tippy) == null || n.setProps({ getReferenceClientRect: this.tippyOptions?.getReferenceClientRect || (() => Bu(e, o, s)) }), this.show();
		}
	}
	show() {
		var e;
		(e = this.tippy) == null || e.show();
	}
	hide() {
		var e;
		(e = this.tippy) == null || e.hide();
	}
	destroy() {
		var e;
		this.tippy?.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (e = this.tippy) == null || e.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
	}
}, _m = (e) => new B({
	key: typeof e.pluginKey == "string" ? new $n(e.pluginKey) : e.pluginKey,
	view: (t) => new gm({
		view: t,
		...e
	})
});
ol.create({
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
		return this.options.element ? [_m({
			pluginKey: this.options.pluginKey,
			editor: this.editor,
			element: this.options.element,
			tippyOptions: this.options.tippyOptions,
			shouldShow: this.options.shouldShow
		})] : [];
	}
});
//#endregion
//#region node_modules/@tiptap/vue-3/dist/index.js
var vm = s({
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
	setup(e, { slots: t }) {
		let n = v(null);
		return g(() => {
			let { updateDelay: t, editor: r, pluginKey: i, shouldShow: a, tippyOptions: o } = e;
			r.registerPlugin(hm({
				updateDelay: t,
				editor: r,
				element: n.value,
				pluginKey: i,
				shouldShow: a,
				tippyOptions: o
			}));
		}), h(() => {
			let { pluginKey: t, editor: n } = e;
			n.unregisterPlugin(t);
		}), () => l("div", { ref: n }, t.default?.call(t));
	}
});
function ym(e) {
	return o((t, n) => ({
		get() {
			return t(), e;
		},
		set(t) {
			e = t, requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					n();
				});
			});
		}
	}));
}
var bm = class extends dd {
	constructor(e = {}) {
		return super(e), this.contentComponent = null, this.appContext = null, this.reactiveState = ym(this.view.state), this.reactiveExtensionStorage = ym(this.extensionStorage), this.on("beforeTransaction", ({ nextState: e }) => {
			this.reactiveState.value = e, this.reactiveExtensionStorage.value = this.extensionStorage;
		}), u(this);
	}
	get state() {
		return this.reactiveState ? this.reactiveState.value : this.view.state;
	}
	get storage() {
		return this.reactiveExtensionStorage ? this.reactiveExtensionStorage.value : super.storage;
	}
	registerPlugin(e, t) {
		let n = super.registerPlugin(e, t);
		return this.reactiveState && (this.reactiveState.value = n), n;
	}
	unregisterPlugin(e) {
		let t = super.unregisterPlugin(e);
		return this.reactiveState && t && (this.reactiveState.value = t), t;
	}
}, xm = s({
	name: "EditorContent",
	props: { editor: {
		default: null,
		type: Object
	} },
	setup(e) {
		let t = v(), n = c();
		return T(() => {
			let r = e.editor;
			r && r.options.element && t.value && f(() => {
				if (!t.value || !r.options.element.firstChild) return;
				let e = x(t.value);
				t.value.append(...r.options.element.childNodes), r.contentComponent = n.ctx._, n && (r.appContext = {
					...n.appContext,
					provides: n.provides
				}), r.setOptions({ element: e }), r.createNodeViews();
			});
		}), h(() => {
			let t = e.editor;
			t && (t.contentComponent = null, t.appContext = null);
		}), { rootEl: t };
	},
	render() {
		return l("div", { ref: (e) => {
			this.rootEl = e;
		} });
	}
});
s({
	name: "FloatingMenu",
	props: {
		pluginKey: {
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
	setup(e, { slots: t }) {
		let n = v(null);
		return g(() => {
			let { pluginKey: t, editor: r, tippyOptions: i, shouldShow: a } = e;
			r.registerPlugin(_m({
				pluginKey: t,
				editor: r,
				element: n.value,
				tippyOptions: i,
				shouldShow: a
			}));
		}), h(() => {
			let { pluginKey: t, editor: n } = e;
			n.unregisterPlugin(t);
		}), () => l("div", { ref: n }, t.default?.call(t));
	}
}), s({
	name: "NodeViewContent",
	props: { as: {
		type: String,
		default: "div"
	} },
	render() {
		return l(this.as, {
			style: { whiteSpace: "pre-wrap" },
			"data-node-view-content": ""
		});
	}
}), s({
	name: "NodeViewWrapper",
	props: { as: {
		type: String,
		default: "div"
	} },
	inject: ["onDragStart", "decorationClasses"],
	render() {
		var e;
		return l(this.as, {
			class: this.decorationClasses,
			style: { whiteSpace: "normal" },
			"data-node-view-wrapper": "",
			onDragstart: this.onDragStart
		}, (e = this.$slots).default?.call(e));
	}
});
var Sm = (e = {}) => {
	let t = b();
	return g(() => {
		t.value = new bm(e);
	}), h(() => {
		var e, n;
		let r = t.value?.options.element, i = r?.cloneNode(!0);
		(e = r?.parentNode) == null || e.replaceChild(i, r), (n = t.value) == null || n.destroy();
	}), t;
}, Cm = gd.create({
	name: "doc",
	topNode: !0,
	content: "block+"
}), wm = gd.create({
	name: "paragraph",
	priority: 1e3,
	addOptions() {
		return { HTMLAttributes: {} };
	},
	group: "block",
	content: "inline*",
	parseHTML() {
		return [{ tag: "p" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"p",
			q(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return { setParagraph: () => ({ commands: e }) => e.setNode(this.name) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Alt-0": () => this.editor.commands.setParagraph() };
	}
}), Tm = gd.create({
	name: "text",
	group: "inline"
}), Em = 200, Y = function() {};
Y.prototype.append = function(e) {
	return e.length ? (e = Y.from(e), !this.length && e || e.length < Em && this.leafAppend(e) || this.length < Em && e.leafPrepend(this) || this.appendInner(e)) : this;
}, Y.prototype.prepend = function(e) {
	return e.length ? Y.from(e).append(this) : this;
}, Y.prototype.appendInner = function(e) {
	return new Om(this, e);
}, Y.prototype.slice = function(e, t) {
	return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? Y.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
}, Y.prototype.get = function(e) {
	if (!(e < 0 || e >= this.length)) return this.getInner(e);
}, Y.prototype.forEach = function(e, t, n) {
	t === void 0 && (t = 0), n === void 0 && (n = this.length), t <= n ? this.forEachInner(e, t, n, 0) : this.forEachInvertedInner(e, t, n, 0);
}, Y.prototype.map = function(e, t, n) {
	t === void 0 && (t = 0), n === void 0 && (n = this.length);
	var r = [];
	return this.forEach(function(t, n) {
		return r.push(e(t, n));
	}, t, n), r;
}, Y.from = function(e) {
	return e instanceof Y ? e : e && e.length ? new Dm(e) : Y.empty;
};
var Dm = /* @__PURE__ */ function(e) {
	function t(t) {
		e.call(this), this.values = t;
	}
	e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t;
	var n = {
		length: { configurable: !0 },
		depth: { configurable: !0 }
	};
	return t.prototype.flatten = function() {
		return this.values;
	}, t.prototype.sliceInner = function(e, n) {
		return e == 0 && n == this.length ? this : new t(this.values.slice(e, n));
	}, t.prototype.getInner = function(e) {
		return this.values[e];
	}, t.prototype.forEachInner = function(e, t, n, r) {
		for (var i = t; i < n; i++) if (e(this.values[i], r + i) === !1) return !1;
	}, t.prototype.forEachInvertedInner = function(e, t, n, r) {
		for (var i = t - 1; i >= n; i--) if (e(this.values[i], r + i) === !1) return !1;
	}, t.prototype.leafAppend = function(e) {
		if (this.length + e.length <= Em) return new t(this.values.concat(e.flatten()));
	}, t.prototype.leafPrepend = function(e) {
		if (this.length + e.length <= Em) return new t(e.flatten().concat(this.values));
	}, n.length.get = function() {
		return this.values.length;
	}, n.depth.get = function() {
		return 0;
	}, Object.defineProperties(t.prototype, n), t;
}(Y);
Y.empty = new Dm([]);
var Om = /* @__PURE__ */ function(e) {
	function t(t, n) {
		e.call(this), this.left = t, this.right = n, this.length = t.length + n.length, this.depth = Math.max(t.depth, n.depth) + 1;
	}
	return e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t, t.prototype.flatten = function() {
		return this.left.flatten().concat(this.right.flatten());
	}, t.prototype.getInner = function(e) {
		return e < this.left.length ? this.left.get(e) : this.right.get(e - this.left.length);
	}, t.prototype.forEachInner = function(e, t, n, r) {
		var i = this.left.length;
		if (t < i && this.left.forEachInner(e, t, Math.min(n, i), r) === !1 || n > i && this.right.forEachInner(e, Math.max(t - i, 0), Math.min(this.length, n) - i, r + i) === !1) return !1;
	}, t.prototype.forEachInvertedInner = function(e, t, n, r) {
		var i = this.left.length;
		if (t > i && this.right.forEachInvertedInner(e, t - i, Math.max(n, i) - i, r + i) === !1 || n < i && this.left.forEachInvertedInner(e, Math.min(t, i), n, r) === !1) return !1;
	}, t.prototype.sliceInner = function(e, t) {
		if (e == 0 && t == this.length) return this;
		var n = this.left.length;
		return t <= n ? this.left.slice(e, t) : e >= n ? this.right.slice(e - n, t - n) : this.left.slice(e, n).append(this.right.slice(0, t - n));
	}, t.prototype.leafAppend = function(e) {
		var n = this.right.leafAppend(e);
		if (n) return new t(this.left, n);
	}, t.prototype.leafPrepend = function(e) {
		var n = this.left.leafPrepend(e);
		if (n) return new t(n, this.right);
	}, t.prototype.appendInner = function(e) {
		return this.left.depth >= Math.max(this.right.depth, e.depth) + 1 ? new t(this.left, new t(this.right, e)) : new t(this, e);
	}, t;
}(Y), km = 500, Am = class e {
	constructor(e, t) {
		this.items = e, this.eventCount = t;
	}
	popEvent(t, n) {
		if (this.eventCount == 0) return null;
		let r = this.items.length;
		for (;; r--) if (this.items.get(r - 1).selection) {
			--r;
			break;
		}
		let i, a;
		n && (i = this.remapping(r, this.items.length), a = i.maps.length);
		let o = t.tr, s, c, l = [], u = [];
		return this.items.forEach((t, n) => {
			if (!t.step) {
				i || (i = this.remapping(r, n + 1), a = i.maps.length), a--, u.push(t);
				return;
			}
			if (i) {
				u.push(new Mm(t.map));
				let e = t.step.map(i.slice(a)), n;
				e && o.maybeStep(e).doc && (n = o.mapping.maps[o.mapping.maps.length - 1], l.push(new Mm(n, void 0, void 0, l.length + u.length))), a--, n && i.appendMap(n, a);
			} else o.maybeStep(t.step);
			if (t.selection) return s = i ? t.selection.map(i.slice(a)) : t.selection, c = new e(this.items.slice(0, r).append(u.reverse().concat(l)), this.eventCount - 1), !1;
		}, this.items.length, 0), {
			remaining: c,
			transform: o,
			selection: s
		};
	}
	addTransform(t, n, r, i) {
		let a = [], o = this.eventCount, s = this.items, c = !i && s.length ? s.get(s.length - 1) : null;
		for (let e = 0; e < t.steps.length; e++) {
			let r = t.steps[e].invert(t.docs[e]), l = new Mm(t.mapping.maps[e], r, n), u;
			(u = c && c.merge(l)) && (l = u, e ? a.pop() : s = s.slice(0, s.length - 1)), a.push(l), n &&= (o++, void 0), i || (c = l);
		}
		let l = o - r.depth;
		return l > Pm && (s = jm(s, l), o -= l), new e(s.append(a), o);
	}
	remapping(e, t) {
		let n = new At();
		return this.items.forEach((t, r) => {
			let i = t.mirrorOffset != null && r - t.mirrorOffset >= e ? n.maps.length - t.mirrorOffset : void 0;
			n.appendMap(t.map, i);
		}, e, t), n;
	}
	addMaps(t) {
		return this.eventCount == 0 ? this : new e(this.items.append(t.map((e) => new Mm(e))), this.eventCount);
	}
	rebased(t, n) {
		if (!this.eventCount) return this;
		let r = [], i = Math.max(0, this.items.length - n), a = t.mapping, o = t.steps.length, s = this.eventCount;
		this.items.forEach((e) => {
			e.selection && s--;
		}, i);
		let c = n;
		this.items.forEach((e) => {
			let n = a.getMirror(--c);
			if (n == null) return;
			o = Math.min(o, n);
			let i = a.maps[n];
			if (e.step) {
				let o = t.steps[n].invert(t.docs[n]), l = e.selection && e.selection.map(a.slice(c + 1, n));
				l && s++, r.push(new Mm(i, o, l));
			} else r.push(new Mm(i));
		}, i);
		let l = [];
		for (let e = n; e < o; e++) l.push(new Mm(a.maps[e]));
		let u = this.items.slice(0, i).append(l).append(r), d = new e(u, s);
		return d.emptyItemCount() > km && (d = d.compress(this.items.length - r.length)), d;
	}
	emptyItemCount() {
		let e = 0;
		return this.items.forEach((t) => {
			t.step || e++;
		}), e;
	}
	compress(t = this.items.length) {
		let n = this.remapping(0, t), r = n.maps.length, i = [], a = 0;
		return this.items.forEach((e, o) => {
			if (o >= t) i.push(e), e.selection && a++;
			else if (e.step) {
				let t = e.step.map(n.slice(r)), o = t && t.getMap();
				if (r--, o && n.appendMap(o, r), t) {
					let s = e.selection && e.selection.map(n.slice(r));
					s && a++;
					let c = new Mm(o.invert(), t, s), l, u = i.length - 1;
					(l = i.length && i[u].merge(c)) ? i[u] = l : i.push(c);
				}
			} else e.map && r--;
		}, this.items.length, 0), new e(Y.from(i.reverse()), a);
	}
};
Am.empty = new Am(Y.empty, 0);
function jm(e, t) {
	let n;
	return e.forEach((e, r) => {
		if (e.selection && t-- == 0) return n = r, !1;
	}), e.slice(n);
}
var Mm = class e {
	constructor(e, t, n, r) {
		this.map = e, this.step = t, this.selection = n, this.mirrorOffset = r;
	}
	merge(t) {
		if (this.step && t.step && !t.selection) {
			let n = t.step.merge(this.step);
			if (n) return new e(n.getMap().invert(), n, this.selection);
		}
	}
}, Nm = class {
	constructor(e, t, n, r, i) {
		this.done = e, this.undone = t, this.prevRanges = n, this.prevTime = r, this.prevComposition = i;
	}
}, Pm = 20;
function Fm(e, t, n, r) {
	let i = n.getMeta(Um), a;
	if (i) return i.historyState;
	n.getMeta(Wm) && (e = new Nm(e.done, e.undone, null, 0, -1));
	let o = n.getMeta("appendedTransaction");
	if (n.steps.length == 0) return e;
	if (o && o.getMeta(Um)) return o.getMeta(Um).redo ? new Nm(e.done.addTransform(n, void 0, r, Hm(t)), e.undone, Lm(n.mapping.maps), e.prevTime, e.prevComposition) : new Nm(e.done, e.undone.addTransform(n, void 0, r, Hm(t)), null, e.prevTime, e.prevComposition);
	if (n.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
		let i = n.getMeta("composition"), a = e.prevTime == 0 || !o && e.prevComposition != i && (e.prevTime < (n.time || 0) - r.newGroupDelay || !Im(n, e.prevRanges)), s = o ? Rm(e.prevRanges, n.mapping) : Lm(n.mapping.maps);
		return new Nm(e.done.addTransform(n, a ? t.selection.getBookmark() : void 0, r, Hm(t)), Am.empty, s, n.time, i ?? e.prevComposition);
	} else if (a = n.getMeta("rebased")) return new Nm(e.done.rebased(n, a), e.undone.rebased(n, a), Rm(e.prevRanges, n.mapping), e.prevTime, e.prevComposition);
	else return new Nm(e.done.addMaps(n.mapping.maps), e.undone.addMaps(n.mapping.maps), Rm(e.prevRanges, n.mapping), e.prevTime, e.prevComposition);
}
function Im(e, t) {
	if (!t) return !1;
	if (!e.docChanged) return !0;
	let n = !1;
	return e.mapping.maps[0].forEach((e, r) => {
		for (let i = 0; i < t.length; i += 2) e <= t[i + 1] && r >= t[i] && (n = !0);
	}), n;
}
function Lm(e) {
	let t = [];
	for (let n = e.length - 1; n >= 0 && t.length == 0; n--) e[n].forEach((e, n, r, i) => t.push(r, i));
	return t;
}
function Rm(e, t) {
	if (!e) return null;
	let n = [];
	for (let r = 0; r < e.length; r += 2) {
		let i = t.map(e[r], 1), a = t.map(e[r + 1], -1);
		i <= a && n.push(i, a);
	}
	return n;
}
function zm(e, t, n) {
	let r = Hm(t), i = Um.get(t).spec.config, a = (n ? e.undone : e.done).popEvent(t, r);
	if (!a) return null;
	let o = a.selection.resolve(a.transform.doc), s = (n ? e.done : e.undone).addTransform(a.transform, t.selection.getBookmark(), i, r), c = new Nm(n ? s : a.remaining, n ? a.remaining : s, null, 0, -1);
	return a.transform.setSelection(o).setMeta(Um, {
		redo: n,
		historyState: c
	});
}
var Bm = !1, Vm = null;
function Hm(e) {
	let t = e.plugins;
	if (Vm != t) {
		Bm = !1, Vm = t;
		for (let e = 0; e < t.length; e++) if (t[e].spec.historyPreserveItems) {
			Bm = !0;
			break;
		}
	}
	return Bm;
}
var Um = new $n("history"), Wm = new $n("closeHistory");
function Gm(e = {}) {
	return e = {
		depth: e.depth || 100,
		newGroupDelay: e.newGroupDelay || 500
	}, new B({
		key: Um,
		state: {
			init() {
				return new Nm(Am.empty, Am.empty, null, 0, -1);
			},
			apply(t, n, r) {
				return Fm(n, r, t, e);
			}
		},
		config: e,
		props: { handleDOMEvents: { beforeinput(e, t) {
			let n = t.inputType, r = n == "historyUndo" ? qm : n == "historyRedo" ? Jm : null;
			return !r || !e.editable ? !1 : (t.preventDefault(), r(e.state, e.dispatch));
		} } }
	});
}
function Km(e, t) {
	return (n, r) => {
		let i = Um.getState(n);
		if (!i || (e ? i.undone : i.done).eventCount == 0) return !1;
		if (r) {
			let a = zm(i, n, e);
			a && r(t ? a.scrollIntoView() : a);
		}
		return !0;
	};
}
var qm = Km(!1, !0), Jm = Km(!0, !0), Ym = ol.create({
	name: "history",
	addOptions() {
		return {
			depth: 100,
			newGroupDelay: 500
		};
	},
	addCommands() {
		return {
			undo: () => ({ state: e, dispatch: t }) => qm(e, t),
			redo: () => ({ state: e, dispatch: t }) => Jm(e, t)
		};
	},
	addProseMirrorPlugins() {
		return [Gm(this.options)];
	},
	addKeyboardShortcuts() {
		return {
			"Mod-z": () => this.editor.commands.undo(),
			"Shift-Mod-z": () => this.editor.commands.redo(),
			"Mod-y": () => this.editor.commands.redo(),
			"Mod-я": () => this.editor.commands.undo(),
			"Shift-Mod-я": () => this.editor.commands.redo()
		};
	}
}), Xm = gd.create({
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
	linebreakReplacement: !0,
	parseHTML() {
		return [{ tag: "br" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return ["br", q(this.options.HTMLAttributes, e)];
	},
	renderText() {
		return "\n";
	},
	addCommands() {
		return { setHardBreak: () => ({ commands: e, chain: t, state: n, editor: r }) => e.first([() => e.exitCode(), () => e.command(() => {
			let { selection: e, storedMarks: i } = n;
			if (e.$from.parent.type.spec.isolating) return !1;
			let { keepMarks: a } = this.options, { splittableMarks: o } = r.extensionManager, s = i || e.$to.parentOffset && e.$from.marks();
			return t().insertContent({ type: this.name }).command(({ tr: e, dispatch: t }) => {
				if (t && s && a) {
					let t = s.filter((e) => o.includes(e.type.name));
					e.ensureMarks(t);
				}
				return !0;
			}).run();
		})]) };
	},
	addKeyboardShortcuts() {
		return {
			"Mod-Enter": () => this.editor.commands.setHardBreak(),
			"Shift-Enter": () => this.editor.commands.setHardBreak()
		};
	}
}), Zm = class e extends L {
	constructor(e) {
		super(e, e);
	}
	map(t, n) {
		let r = t.resolve(n.map(this.head));
		return e.valid(r) ? new e(r) : L.near(r);
	}
	content() {
		return P.empty;
	}
	eq(t) {
		return t instanceof e && t.head == this.head;
	}
	toJSON() {
		return {
			type: "gapcursor",
			pos: this.head
		};
	}
	static fromJSON(t, n) {
		if (typeof n.pos != "number") throw RangeError("Invalid input for GapCursor.fromJSON");
		return new e(t.resolve(n.pos));
	}
	getBookmark() {
		return new Qm(this.anchor);
	}
	static valid(e) {
		let t = e.parent;
		if (t.inlineContent || !eh(e) || !th(e)) return !1;
		let n = t.type.spec.allowGapCursor;
		if (n != null) return n;
		let r = t.contentMatchAt(e.index()).defaultType;
		return r && r.isTextblock;
	}
	static findGapCursorFrom(t, n, r = !1) {
		search: for (;;) {
			if (!r && e.valid(t)) return t;
			let i = t.pos, a = null;
			for (let r = t.depth;; r--) {
				let o = t.node(r);
				if (n > 0 ? t.indexAfter(r) < o.childCount : t.index(r) > 0) {
					a = o.child(n > 0 ? t.indexAfter(r) : t.index(r) - 1);
					break;
				} else if (r == 0) return null;
				i += n;
				let s = t.doc.resolve(i);
				if (e.valid(s)) return s;
			}
			for (;;) {
				let o = n > 0 ? a.firstChild : a.lastChild;
				if (!o) {
					if (a.isAtom && !a.isText && !z.isSelectable(a)) {
						t = t.doc.resolve(i + a.nodeSize * n), r = !1;
						continue search;
					}
					break;
				}
				a = o, i += n;
				let s = t.doc.resolve(i);
				if (e.valid(s)) return s;
			}
			return null;
		}
	}
};
Zm.prototype.visible = !1, Zm.findFrom = Zm.findGapCursorFrom, L.jsonID("gapcursor", Zm);
var Qm = class e {
	constructor(e) {
		this.pos = e;
	}
	map(t) {
		return new e(t.map(this.pos));
	}
	resolve(e) {
		let t = e.resolve(this.pos);
		return Zm.valid(t) ? new Zm(t) : L.near(t);
	}
};
function $m(e) {
	return e.isAtom || e.spec.isolating || e.spec.createGapCursor;
}
function eh(e) {
	for (let t = e.depth; t >= 0; t--) {
		let n = e.index(t), r = e.node(t);
		if (n == 0) {
			if (r.type.spec.isolating) return !0;
			continue;
		}
		for (let e = r.child(n - 1);; e = e.lastChild) {
			if (e.childCount == 0 && !e.inlineContent || $m(e.type)) return !0;
			if (e.inlineContent) return !1;
		}
	}
	return !0;
}
function th(e) {
	for (let t = e.depth; t >= 0; t--) {
		let n = e.indexAfter(t), r = e.node(t);
		if (n == r.childCount) {
			if (r.type.spec.isolating) return !0;
			continue;
		}
		for (let e = r.child(n);; e = e.firstChild) {
			if (e.childCount == 0 && !e.inlineContent || $m(e.type)) return !0;
			if (e.inlineContent) return !1;
		}
	}
	return !0;
}
function nh() {
	return new B({ props: {
		decorations: sh,
		createSelectionBetween(e, t, n) {
			return t.pos == n.pos && Zm.valid(n) ? new Zm(n) : null;
		},
		handleClick: ah,
		handleKeyDown: rh,
		handleDOMEvents: { beforeinput: oh }
	} });
}
var rh = Fs({
	ArrowLeft: ih("horiz", -1),
	ArrowRight: ih("horiz", 1),
	ArrowUp: ih("vert", -1),
	ArrowDown: ih("vert", 1)
});
function ih(e, t) {
	let n = e == "vert" ? t > 0 ? "down" : "up" : t > 0 ? "right" : "left";
	return function(e, r, i) {
		let a = e.selection, o = t > 0 ? a.$to : a.$from, s = a.empty;
		if (a instanceof R) {
			if (!i.endOfTextblock(n) || o.depth == 0) return !1;
			s = !1, o = e.doc.resolve(t > 0 ? o.after() : o.before());
		}
		let c = Zm.findGapCursorFrom(o, t, s);
		return c ? (r && r(e.tr.setSelection(new Zm(c))), !0) : !1;
	};
}
function ah(e, t, n) {
	if (!e || !e.editable) return !1;
	let r = e.state.doc.resolve(t);
	if (!Zm.valid(r)) return !1;
	let i = e.posAtCoords({
		left: n.clientX,
		top: n.clientY
	});
	return i && i.inside > -1 && z.isSelectable(e.state.doc.nodeAt(i.inside)) ? !1 : (e.dispatch(e.state.tr.setSelection(new Zm(r))), !0);
}
function oh(e, t) {
	if (t.inputType != "insertCompositionText" || !(e.state.selection instanceof Zm)) return !1;
	let { $from: n } = e.state.selection, r = n.parent.contentMatchAt(n.index()).findWrapping(e.state.schema.nodes.text);
	if (!r) return !1;
	let i = M.empty;
	for (let e = r.length - 1; e >= 0; e--) i = M.from(r[e].createAndFill(null, i));
	let a = e.state.tr.replace(n.pos, n.pos, new P(i, 0, 0));
	return a.setSelection(R.near(a.doc.resolve(n.pos + 1))), e.dispatch(a), !1;
}
function sh(e) {
	if (!(e.selection instanceof Zm)) return null;
	let t = document.createElement("div");
	return t.className = "ProseMirror-gapcursor", Fo.create(e.doc, [Mo.widget(e.selection.head, t, { key: "gapcursor" })]);
}
//#endregion
//#region node_modules/@tiptap/extension-gapcursor/dist/index.js
var ch = ol.create({
	name: "gapCursor",
	addProseMirrorPlugins() {
		return [nh()];
	},
	extendNodeSchema(e) {
		return { allowGapCursor: J(G(e, "allowGapCursor", {
			name: e.name,
			options: e.options,
			storage: e.storage
		})) ?? null };
	}
}), lh = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, uh = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, dh = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, fh = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, ph = Xc.create({
	name: "bold",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [
			{ tag: "strong" },
			{
				tag: "b",
				getAttrs: (e) => e.style.fontWeight !== "normal" && null
			},
			{
				style: "font-weight=400",
				clearMark: (e) => e.type.name === this.name
			},
			{
				style: "font-weight",
				getAttrs: (e) => /^(bold(er)?|[5-9]\d{2,})$/.test(e) && null
			}
		];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"strong",
			q(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return {
			setBold: () => ({ commands: e }) => e.setMark(this.name),
			toggleBold: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetBold: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return {
			"Mod-b": () => this.editor.commands.toggleBold(),
			"Mod-B": () => this.editor.commands.toggleBold()
		};
	},
	addInputRules() {
		return [fd({
			find: lh,
			type: this.type
		}), fd({
			find: dh,
			type: this.type
		})];
	},
	addPasteRules() {
		return [_d({
			find: uh,
			type: this.type
		}), _d({
			find: fh,
			type: this.type
		})];
	}
}), mh = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, hh = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, gh = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, _h = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, vh = Xc.create({
	name: "italic",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [
			{ tag: "em" },
			{
				tag: "i",
				getAttrs: (e) => e.style.fontStyle !== "normal" && null
			},
			{
				style: "font-style=normal",
				clearMark: (e) => e.type.name === this.name
			},
			{ style: "font-style=italic" }
		];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"em",
			q(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return {
			setItalic: () => ({ commands: e }) => e.setMark(this.name),
			toggleItalic: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetItalic: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return {
			"Mod-i": () => this.editor.commands.toggleItalic(),
			"Mod-I": () => this.editor.commands.toggleItalic()
		};
	},
	addInputRules() {
		return [fd({
			find: mh,
			type: this.type
		}), fd({
			find: gh,
			type: this.type
		})];
	},
	addPasteRules() {
		return [_d({
			find: hh,
			type: this.type
		}), _d({
			find: _h,
			type: this.type
		})];
	}
}), yh = Xc.create({
	name: "underline",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [{ tag: "u" }, {
			style: "text-decoration",
			consuming: !1,
			getAttrs: (e) => e.includes("underline") ? {} : !1
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"u",
			q(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return {
			setUnderline: () => ({ commands: e }) => e.setMark(this.name),
			toggleUnderline: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetUnderline: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return {
			"Mod-u": () => this.editor.commands.toggleUnderline(),
			"Mod-U": () => this.editor.commands.toggleUnderline()
		};
	}
}), bh = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, xh = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, Sh = Xc.create({
	name: "strike",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [
			{ tag: "s" },
			{ tag: "del" },
			{ tag: "strike" },
			{
				style: "text-decoration",
				consuming: !1,
				getAttrs: (e) => e.includes("line-through") ? {} : !1
			}
		];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"s",
			q(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return {
			setStrike: () => ({ commands: e }) => e.setMark(this.name),
			toggleStrike: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetStrike: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-s": () => this.editor.commands.toggleStrike() };
	},
	addInputRules() {
		return [fd({
			find: bh,
			type: this.type
		})];
	},
	addPasteRules() {
		return [_d({
			find: xh,
			type: this.type
		})];
	}
}), Ch = gd.create({
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
		return [{ tag: "li" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"li",
			q(this.options.HTMLAttributes, e),
			0
		];
	},
	addKeyboardShortcuts() {
		return {
			Enter: () => this.editor.commands.splitListItem(this.name),
			Tab: () => this.editor.commands.sinkListItem(this.name),
			"Shift-Tab": () => this.editor.commands.liftListItem(this.name)
		};
	}
}), wh = "listItem", Th = "textStyle", Eh = /^\s*([-+*])\s$/, Dh = gd.create({
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
	renderHTML({ HTMLAttributes: e }) {
		return [
			"ul",
			q(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return { toggleBulletList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(wh, this.editor.getAttributes(Th)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-8": () => this.editor.commands.toggleBulletList() };
	},
	addInputRules() {
		let e = hd({
			find: Eh,
			type: this.type
		});
		return (this.options.keepMarks || this.options.keepAttributes) && (e = hd({
			find: Eh,
			type: this.type,
			keepMarks: this.options.keepMarks,
			keepAttributes: this.options.keepAttributes,
			getAttributes: () => this.editor.getAttributes(Th),
			editor: this.editor
		})), [e];
	}
}), Oh = "listItem", kh = "textStyle", Ah = /^(\d+)\.\s$/, jh = gd.create({
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
				parseHTML: (e) => e.hasAttribute("start") ? parseInt(e.getAttribute("start") || "", 10) : 1
			},
			type: {
				default: null,
				parseHTML: (e) => e.getAttribute("type")
			}
		};
	},
	parseHTML() {
		return [{ tag: "ol" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		let { start: t, ...n } = e;
		return t === 1 ? [
			"ol",
			q(this.options.HTMLAttributes, n),
			0
		] : [
			"ol",
			q(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return { toggleOrderedList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(Oh, this.editor.getAttributes(kh)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-7": () => this.editor.commands.toggleOrderedList() };
	},
	addInputRules() {
		let e = hd({
			find: Ah,
			type: this.type,
			getAttributes: (e) => ({ start: +e[1] }),
			joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1]
		});
		return (this.options.keepMarks || this.options.keepAttributes) && (e = hd({
			find: Ah,
			type: this.type,
			keepMarks: this.options.keepMarks,
			keepAttributes: this.options.keepAttributes,
			getAttributes: (e) => ({
				start: +e[1],
				...this.editor.getAttributes(kh)
			}),
			joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1],
			editor: this.editor
		})), [e];
	}
}), Mh = (e, t) => {
	let { $from: n } = t.selection, r = K(e, t.schema), i = null, a = n.depth, o = n.pos, s = null;
	for (; a > 0 && s === null;) i = n.node(a), i.type === r ? s = a : (--a, --o);
	return s === null ? null : {
		$pos: t.doc.resolve(o),
		depth: s
	};
}, Nh = (e, t) => {
	let n = Mh(e, t);
	if (!n) return !1;
	let [, r] = ju(t, e, n.$pos.pos + 4);
	return r;
}, Ph = (e, t, n) => {
	let { $anchor: r } = e.selection, i = Math.max(0, r.pos - 2), a = e.doc.resolve(i).node();
	return !(!a || !n.includes(a.type.name));
}, Fh = (e, t) => {
	let { $anchor: n } = t.selection, r = t.doc.resolve(n.pos - 2);
	return !(r.index() === 0 || r.nodeBefore?.type.name !== e);
}, Ih = (e, t, n) => {
	if (!n) return !1;
	let r = K(e, t.schema), i = !1;
	return n.descendants((e) => {
		e.type === r && (i = !0);
	}), i;
}, Lh = (e, t, n) => {
	if (e.commands.undoInputRule()) return !0;
	if (e.state.selection.from !== e.state.selection.to) return !1;
	if (!tu(e.state, t) && Ph(e.state, t, n)) {
		let { $anchor: n } = e.state.selection, r = e.state.doc.resolve(n.before() - 1), i = [];
		r.node().descendants((e, n) => {
			e.type.name === t && i.push({
				node: e,
				pos: n
			});
		});
		let a = i.at(-1);
		if (!a) return !1;
		let o = e.state.doc.resolve(r.start() + a.pos + 1);
		return e.chain().cut({
			from: n.start() - 1,
			to: n.end() + 1
		}, o.end()).joinForward().run();
	}
	if (!tu(e.state, t) || !Iu(e.state)) return !1;
	let r = Mh(t, e.state);
	if (!r) return !1;
	let i = e.state.doc.resolve(r.$pos.pos - 2).node(r.depth), a = Ih(t, e.state, i);
	return Fh(t, e.state) && !a ? e.commands.joinItemBackward() : e.chain().liftListItem(t).run();
}, Rh = (e, t) => {
	let n = Nh(e, t), r = Mh(e, t);
	return !r || !n ? !1 : n > r.depth;
}, zh = (e, t) => {
	let n = Nh(e, t), r = Mh(e, t);
	return !r || !n ? !1 : n < r.depth;
}, Bh = (e, t) => {
	if (!tu(e.state, t) || !Fu(e.state, t)) return !1;
	let { selection: n } = e.state, { $from: r, $to: i } = n;
	return !n.empty && r.sameParent(i) ? !1 : Rh(t, e.state) ? e.chain().focus(e.state.selection.from + 4).lift(t).joinBackward().run() : zh(t, e.state) ? e.chain().joinForward().joinBackward().run() : e.commands.joinItemForward();
}, Vh = ol.create({
	name: "listKeymap",
	addOptions() {
		return { listTypes: [{
			itemName: "listItem",
			wrapperNames: ["bulletList", "orderedList"]
		}, {
			itemName: "taskItem",
			wrapperNames: ["taskList"]
		}] };
	},
	addKeyboardShortcuts() {
		return {
			Delete: ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n }) => {
					e.state.schema.nodes[n] !== void 0 && Bh(e, n) && (t = !0);
				}), t;
			},
			"Mod-Delete": ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n }) => {
					e.state.schema.nodes[n] !== void 0 && Bh(e, n) && (t = !0);
				}), t;
			},
			Backspace: ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
					e.state.schema.nodes[n] !== void 0 && Lh(e, n, r) && (t = !0);
				}), t;
			},
			"Mod-Backspace": ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
					e.state.schema.nodes[n] !== void 0 && Lh(e, n, r) && (t = !0);
				}), t;
			}
		};
	}
}), Hh = gd.create({
	name: "heading",
	addOptions() {
		return {
			levels: [
				1,
				2,
				3,
				4,
				5,
				6
			],
			HTMLAttributes: {}
		};
	},
	content: "inline*",
	group: "block",
	defining: !0,
	addAttributes() {
		return { level: {
			default: 1,
			rendered: !1
		} };
	},
	parseHTML() {
		return this.options.levels.map((e) => ({
			tag: `h${e}`,
			attrs: { level: e }
		}));
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		return [
			`h${this.options.levels.includes(e.attrs.level) ? e.attrs.level : this.options.levels[0]}`,
			q(this.options.HTMLAttributes, t),
			0
		];
	},
	addCommands() {
		return {
			setHeading: (e) => ({ commands: t }) => this.options.levels.includes(e.level) ? t.setNode(this.name, e) : !1,
			toggleHeading: (e) => ({ commands: t }) => this.options.levels.includes(e.level) ? t.toggleNode(this.name, "paragraph", e) : !1
		};
	},
	addKeyboardShortcuts() {
		return this.options.levels.reduce((e, t) => ({
			...e,
			[`Mod-Alt-${t}`]: () => this.editor.commands.toggleHeading({ level: t })
		}), {});
	},
	addInputRules() {
		return this.options.levels.map((e) => md({
			find: RegExp(`^(#{${Math.min(...this.options.levels)},${e}})\\s$`),
			type: this.type,
			getAttributes: { level: e }
		}));
	}
}), Uh = /^\s*>\s$/, Wh = gd.create({
	name: "blockquote",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	content: "block+",
	group: "block",
	defining: !0,
	parseHTML() {
		return [{ tag: "blockquote" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"blockquote",
			q(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return {
			setBlockquote: () => ({ commands: e }) => e.wrapIn(this.name),
			toggleBlockquote: () => ({ commands: e }) => e.toggleWrap(this.name),
			unsetBlockquote: () => ({ commands: e }) => e.lift(this.name)
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-b": () => this.editor.commands.toggleBlockquote() };
	},
	addInputRules() {
		return [hd({
			find: Uh,
			type: this.type
		})];
	}
}), Gh = gd.create({
	name: "horizontalRule",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	group: "block",
	parseHTML() {
		return [{ tag: "hr" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return ["hr", q(this.options.HTMLAttributes, e)];
	},
	addCommands() {
		return { setHorizontalRule: () => ({ chain: e, state: t }) => {
			if (!vd(t, t.schema.nodes[this.name])) return !1;
			let { selection: n } = t, { $from: r, $to: i } = n, a = e();
			return r.parentOffset === 0 ? a.insertContentAt({
				from: Math.max(r.pos - 1, 0),
				to: i.pos
			}, { type: this.name }) : zu(n) ? a.insertContentAt(i.pos, { type: this.name }) : a.insertContent({ type: this.name }), a.command(({ tr: e, dispatch: t }) => {
				if (t) {
					let { $to: t } = e.selection, n = t.end();
					if (t.nodeAfter) t.nodeAfter.isTextblock ? e.setSelection(R.create(e.doc, t.pos + 1)) : t.nodeAfter.isBlock ? e.setSelection(z.create(e.doc, t.pos)) : e.setSelection(R.create(e.doc, t.pos));
					else {
						let r = t.parent.type.contentMatch.defaultType?.create();
						r && (e.insert(n, r), e.setSelection(R.create(e.doc, n + 1)));
					}
					e.scrollIntoView();
				}
				return !0;
			}).run();
		} };
	},
	addInputRules() {
		return [pd({
			find: /^(?:---|—-|___\s|\*\*\*\s)$/,
			type: this.type
		})];
	}
}), Kh = ol.create({
	name: "textAlign",
	addOptions() {
		return {
			types: [],
			alignments: [
				"left",
				"center",
				"right",
				"justify"
			],
			defaultAlignment: null
		};
	},
	addGlobalAttributes() {
		return [{
			types: this.options.types,
			attributes: { textAlign: {
				default: this.options.defaultAlignment,
				parseHTML: (e) => {
					let t = e.style.textAlign;
					return this.options.alignments.includes(t) ? t : this.options.defaultAlignment;
				},
				renderHTML: (e) => e.textAlign ? { style: `text-align: ${e.textAlign}` } : {}
			} }
		}];
	},
	addCommands() {
		return {
			setTextAlign: (e) => ({ commands: t }) => this.options.alignments.includes(e) ? this.options.types.map((n) => t.updateAttributes(n, { textAlign: e })).every((e) => e) : !1,
			unsetTextAlign: () => ({ commands: e }) => this.options.types.map((t) => e.resetAttributes(t, "textAlign")).every((e) => e),
			toggleTextAlign: (e) => ({ editor: t, commands: n }) => this.options.alignments.includes(e) ? t.isActive({ textAlign: e }) ? n.unsetTextAlign() : n.setTextAlign(e) : !1
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
}), qh = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2odyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rck0msd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2oodside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", Jh = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", Yh = "numeric", Xh = "ascii", Zh = "alpha", Qh = "asciinumeric", $h = "alphanumeric", eg = "domain", tg = "emoji", ng = "scheme", rg = "slashscheme", ig = "whitespace";
function ag(e, t) {
	return e in t || (t[e] = []), t[e];
}
function og(e, t, n) {
	t[Yh] && (t[Qh] = !0, t[$h] = !0), t[Xh] && (t[Qh] = !0, t[Zh] = !0), t[Qh] && (t[$h] = !0), t[Zh] && (t[$h] = !0), t[$h] && (t[eg] = !0), t[tg] && (t[eg] = !0);
	for (let r in t) {
		let t = ag(r, n);
		t.indexOf(e) < 0 && t.push(e);
	}
}
function sg(e, t) {
	let n = {};
	for (let r in t) t[r].indexOf(e) >= 0 && (n[r] = !0);
	return n;
}
function cg(e = null) {
	this.j = {}, this.jr = [], this.jd = null, this.t = e;
}
cg.groups = {}, cg.prototype = {
	accepts() {
		return !!this.t;
	},
	go(e) {
		let t = this, n = t.j[e];
		if (n) return n;
		for (let n = 0; n < t.jr.length; n++) {
			let r = t.jr[n][0], i = t.jr[n][1];
			if (i && r.test(e)) return i;
		}
		return t.jd;
	},
	has(e, t = !1) {
		return t ? e in this.j : !!this.go(e);
	},
	ta(e, t, n, r) {
		for (let i = 0; i < e.length; i++) this.tt(e[i], t, n, r);
	},
	tr(e, t, n, r) {
		r ||= cg.groups;
		let i;
		return t && t.j ? i = t : (i = new cg(t), n && r && og(t, n, r)), this.jr.push([e, i]), i;
	},
	ts(e, t, n, r) {
		let i = this, a = e.length;
		if (!a) return i;
		for (let t = 0; t < a - 1; t++) i = i.tt(e[t]);
		return i.tt(e[a - 1], t, n, r);
	},
	tt(e, t, n, r) {
		r ||= cg.groups;
		let i = this;
		if (t && t.j) return i.j[e] = t, t;
		let a = t, o, s = i.go(e);
		return s ? (o = new cg(), Object.assign(o.j, s.j), o.jr.push.apply(o.jr, s.jr), o.jd = s.jd, o.t = s.t) : o = new cg(), a && (r && (o.t && typeof o.t == "string" ? og(a, Object.assign(sg(o.t, r), n), r) : n && og(a, n, r)), o.t = a), i.j[e] = o, o;
	}
};
var X = (e, t, n, r, i) => e.ta(t, n, r, i), Z = (e, t, n, r, i) => e.tr(t, n, r, i), lg = (e, t, n, r, i) => e.ts(t, n, r, i), Q = (e, t, n, r, i) => e.tt(t, n, r, i), ug = "WORD", dg = "UWORD", fg = "ASCIINUMERICAL", pg = "ALPHANUMERICAL", mg = "LOCALHOST", hg = "TLD", gg = "UTLD", _g = "SCHEME", vg = "SLASH_SCHEME", yg = "NUM", bg = "WS", xg = "NL", Sg = "OPENBRACE", Cg = "CLOSEBRACE", wg = "OPENBRACKET", Tg = "CLOSEBRACKET", Eg = "OPENPAREN", Dg = "CLOSEPAREN", Og = "OPENANGLEBRACKET", kg = "CLOSEANGLEBRACKET", Ag = "FULLWIDTHLEFTPAREN", jg = "FULLWIDTHRIGHTPAREN", Mg = "LEFTCORNERBRACKET", Ng = "RIGHTCORNERBRACKET", Pg = "LEFTWHITECORNERBRACKET", Fg = "RIGHTWHITECORNERBRACKET", Ig = "FULLWIDTHLESSTHAN", Lg = "FULLWIDTHGREATERTHAN", Rg = "AMPERSAND", zg = "APOSTROPHE", Bg = "ASTERISK", Vg = "AT", Hg = "BACKSLASH", Ug = "BACKTICK", Wg = "CARET", Gg = "COLON", Kg = "COMMA", qg = "DOLLAR", Jg = "DOT", Yg = "EQUALS", Xg = "EXCLAMATION", Zg = "HYPHEN", Qg = "PERCENT", $g = "PIPE", e_ = "PLUS", t_ = "POUND", n_ = "QUERY", r_ = "QUOTE", i_ = "FULLWIDTHMIDDLEDOT", a_ = "SEMI", o_ = "SLASH", s_ = "TILDE", c_ = "UNDERSCORE", l_ = "EMOJI", u_ = "SYM", d_ = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	ALPHANUMERICAL: pg,
	AMPERSAND: Rg,
	APOSTROPHE: zg,
	ASCIINUMERICAL: fg,
	ASTERISK: Bg,
	AT: Vg,
	BACKSLASH: Hg,
	BACKTICK: Ug,
	CARET: Wg,
	CLOSEANGLEBRACKET: kg,
	CLOSEBRACE: Cg,
	CLOSEBRACKET: Tg,
	CLOSEPAREN: Dg,
	COLON: Gg,
	COMMA: Kg,
	DOLLAR: qg,
	DOT: Jg,
	EMOJI: l_,
	EQUALS: Yg,
	EXCLAMATION: Xg,
	FULLWIDTHGREATERTHAN: Lg,
	FULLWIDTHLEFTPAREN: Ag,
	FULLWIDTHLESSTHAN: Ig,
	FULLWIDTHMIDDLEDOT: i_,
	FULLWIDTHRIGHTPAREN: jg,
	HYPHEN: Zg,
	LEFTCORNERBRACKET: Mg,
	LEFTWHITECORNERBRACKET: Pg,
	LOCALHOST: mg,
	NL: xg,
	NUM: yg,
	OPENANGLEBRACKET: Og,
	OPENBRACE: Sg,
	OPENBRACKET: wg,
	OPENPAREN: Eg,
	PERCENT: Qg,
	PIPE: $g,
	PLUS: e_,
	POUND: t_,
	QUERY: n_,
	QUOTE: r_,
	RIGHTCORNERBRACKET: Ng,
	RIGHTWHITECORNERBRACKET: Fg,
	SCHEME: _g,
	SEMI: a_,
	SLASH: o_,
	SLASH_SCHEME: vg,
	SYM: u_,
	TILDE: s_,
	TLD: hg,
	UNDERSCORE: c_,
	UTLD: gg,
	UWORD: dg,
	WORD: ug,
	WS: bg
}), f_ = /[a-z]/, p_ = /\p{L}/u, m_ = /\p{Emoji}/u, h_ = /\d/, g_ = /\s/, __ = "\r", v_ = "\n", y_ = "️", b_ = "‍", x_ = "￼", S_ = null, C_ = null;
function w_(e = []) {
	let t = {};
	cg.groups = t;
	let n = new cg();
	S_ ??= O_(qh), C_ ??= O_(Jh), Q(n, "'", zg), Q(n, "{", Sg), Q(n, "}", Cg), Q(n, "[", wg), Q(n, "]", Tg), Q(n, "(", Eg), Q(n, ")", Dg), Q(n, "<", Og), Q(n, ">", kg), Q(n, "（", Ag), Q(n, "）", jg), Q(n, "「", Mg), Q(n, "」", Ng), Q(n, "『", Pg), Q(n, "』", Fg), Q(n, "＜", Ig), Q(n, "＞", Lg), Q(n, "&", Rg), Q(n, "*", Bg), Q(n, "@", Vg), Q(n, "`", Ug), Q(n, "^", Wg), Q(n, ":", Gg), Q(n, ",", Kg), Q(n, "$", qg), Q(n, ".", Jg), Q(n, "=", Yg), Q(n, "!", Xg), Q(n, "-", Zg), Q(n, "%", Qg), Q(n, "|", $g), Q(n, "+", e_), Q(n, "#", t_), Q(n, "?", n_), Q(n, "\"", r_), Q(n, "/", o_), Q(n, ";", a_), Q(n, "~", s_), Q(n, "_", c_), Q(n, "\\", Hg), Q(n, "・", i_);
	let r = Z(n, h_, yg, { [Yh]: !0 });
	Z(r, h_, r);
	let i = Z(r, f_, fg, { [Qh]: !0 }), a = Z(r, p_, pg, { [$h]: !0 }), o = Z(n, f_, ug, { [Xh]: !0 });
	Z(o, h_, i), Z(o, f_, o), Z(i, h_, i), Z(i, f_, i);
	let s = Z(n, p_, dg, { [Zh]: !0 });
	Z(s, f_), Z(s, h_, a), Z(s, p_, s), Z(a, h_, a), Z(a, f_), Z(a, p_, a);
	let c = Q(n, v_, xg, { [ig]: !0 }), l = Q(n, __, bg, { [ig]: !0 }), u = Z(n, g_, bg, { [ig]: !0 });
	Q(n, x_, u), Q(l, v_, c), Q(l, x_, u), Z(l, g_, u), Q(u, __), Q(u, v_), Z(u, g_, u), Q(u, x_, u);
	let d = Z(n, m_, l_, { [tg]: !0 });
	Q(d, "#"), Z(d, m_, d), Q(d, y_, d);
	let f = Q(d, b_);
	Q(f, "#"), Z(f, m_, d);
	let p = [[f_, o], [h_, i]], m = [
		[f_, null],
		[p_, s],
		[h_, a]
	];
	for (let e = 0; e < S_.length; e++) D_(n, S_[e], hg, ug, p);
	for (let e = 0; e < C_.length; e++) D_(n, C_[e], gg, dg, m);
	og(hg, {
		tld: !0,
		ascii: !0
	}, t), og(gg, {
		utld: !0,
		alpha: !0
	}, t), D_(n, "file", _g, ug, p), D_(n, "mailto", _g, ug, p), D_(n, "http", vg, ug, p), D_(n, "https", vg, ug, p), D_(n, "ftp", vg, ug, p), D_(n, "ftps", vg, ug, p), og(_g, {
		scheme: !0,
		ascii: !0
	}, t), og(vg, {
		slashscheme: !0,
		ascii: !0
	}, t), e = e.sort((e, t) => e[0] > t[0] ? 1 : -1);
	for (let t = 0; t < e.length; t++) {
		let r = e[t][0], i = e[t][1] ? { [ng]: !0 } : { [rg]: !0 };
		r.indexOf("-") >= 0 ? i[eg] = !0 : f_.test(r) ? h_.test(r) ? i[Qh] = !0 : i[Xh] = !0 : i[Yh] = !0, lg(n, r, r, i);
	}
	return lg(n, "localhost", mg, { ascii: !0 }), n.jd = new cg(u_), {
		start: n,
		tokens: Object.assign({ groups: t }, d_)
	};
}
function T_(e, t) {
	let n = E_(t.replace(/[A-Z]/g, (e) => e.toLowerCase())), r = n.length, i = [], a = 0, o = 0;
	for (; o < r;) {
		let s = e, c = null, l = 0, u = null, d = -1, f = -1;
		for (; o < r && (c = s.go(n[o]));) s = c, s.accepts() ? (d = 0, f = 0, u = s) : d >= 0 && (d += n[o].length, f++), l += n[o].length, a += n[o].length, o++;
		a -= d, o -= f, l -= d, i.push({
			t: u.t,
			v: t.slice(a - l, a),
			s: a - l,
			e: a
		});
	}
	return i;
}
function E_(e) {
	let t = [], n = e.length, r = 0;
	for (; r < n;) {
		let i = e.charCodeAt(r), a, o = i < 55296 || i > 56319 || r + 1 === n || (a = e.charCodeAt(r + 1)) < 56320 || a > 57343 ? e[r] : e.slice(r, r + 2);
		t.push(o), r += o.length;
	}
	return t;
}
function D_(e, t, n, r, i) {
	let a, o = t.length;
	for (let n = 0; n < o - 1; n++) {
		let o = t[n];
		e.j[o] ? a = e.j[o] : (a = new cg(r), a.jr = i.slice(), e.j[o] = a), e = a;
	}
	return a = new cg(n), a.jr = i.slice(), e.j[t[o - 1]] = a, a;
}
function O_(e) {
	let t = [], n = [], r = 0;
	for (; r < e.length;) {
		let i = 0;
		for (; "0123456789".indexOf(e[r + i]) >= 0;) i++;
		if (i > 0) {
			t.push(n.join(""));
			for (let t = parseInt(e.substring(r, r + i), 10); t > 0; t--) n.pop();
			r += i;
		} else n.push(e[r]), r++;
	}
	return t;
}
var k_ = {
	defaultProtocol: "http",
	events: null,
	format: j_,
	formatHref: j_,
	nl2br: !1,
	tagName: "a",
	target: null,
	rel: null,
	validate: !0,
	truncate: Infinity,
	className: null,
	attributes: null,
	ignoreTags: [],
	render: null
};
function A_(e, t = null) {
	let n = Object.assign({}, k_);
	e && (n = Object.assign(n, e instanceof A_ ? e.o : e));
	let r = n.ignoreTags, i = [];
	for (let e = 0; e < r.length; e++) i.push(r[e].toUpperCase());
	this.o = n, t && (this.defaultRender = t), this.ignoreTags = i;
}
A_.prototype = {
	o: k_,
	ignoreTags: [],
	defaultRender(e) {
		return e;
	},
	check(e) {
		return this.get("validate", e.toString(), e);
	},
	get(e, t, n) {
		let r = t != null, i = this.o[e];
		return i && (typeof i == "object" ? (i = n.t in i ? i[n.t] : k_[e], typeof i == "function" && r && (i = i(t, n))) : typeof i == "function" && r && (i = i(t, n.t, n)), i);
	},
	getObj(e, t, n) {
		let r = this.o[e];
		return typeof r == "function" && t != null && (r = r(t, n.t, n)), r;
	},
	render(e) {
		let t = e.render(this);
		return (this.get("render", null, e) || this.defaultRender)(t, e.t, e);
	}
};
function j_(e) {
	return e;
}
function M_(e, t) {
	this.t = "token", this.v = e, this.tk = t;
}
M_.prototype = {
	isLink: !1,
	toString() {
		return this.v;
	},
	toHref(e) {
		return this.toString();
	},
	toFormattedString(e) {
		let t = this.toString(), n = e.get("truncate", t, this), r = e.get("format", t, this);
		return n && r.length > n ? r.substring(0, n) + "…" : r;
	},
	toFormattedHref(e) {
		return e.get("formatHref", this.toHref(e.get("defaultProtocol")), this);
	},
	startIndex() {
		return this.tk[0].s;
	},
	endIndex() {
		return this.tk[this.tk.length - 1].e;
	},
	toObject(e = k_.defaultProtocol) {
		return {
			type: this.t,
			value: this.toString(),
			isLink: this.isLink,
			href: this.toHref(e),
			start: this.startIndex(),
			end: this.endIndex()
		};
	},
	toFormattedObject(e) {
		return {
			type: this.t,
			value: this.toFormattedString(e),
			isLink: this.isLink,
			href: this.toFormattedHref(e),
			start: this.startIndex(),
			end: this.endIndex()
		};
	},
	validate(e) {
		return e.get("validate", this.toString(), this);
	},
	render(e) {
		let t = this, n = this.toHref(e.get("defaultProtocol")), r = e.get("formatHref", n, this), i = e.get("tagName", n, t), a = this.toFormattedString(e), o = {}, s = e.get("className", n, t), c = e.get("target", n, t), l = e.get("rel", n, t), u = e.getObj("attributes", n, t), d = e.getObj("events", n, t);
		return o.href = r, s && (o.class = s), c && (o.target = c), l && (o.rel = l), u && Object.assign(o, u), {
			tagName: i,
			attributes: o,
			content: a,
			eventListeners: d
		};
	}
};
function N_(e, t) {
	class n extends M_ {
		constructor(t, n) {
			super(t, n), this.t = e;
		}
	}
	for (let e in t) n.prototype[e] = t[e];
	return n.t = e, n;
}
var P_ = N_("email", {
	isLink: !0,
	toHref() {
		return "mailto:" + this.toString();
	}
}), F_ = N_("text"), I_ = N_("nl"), L_ = N_("url", {
	isLink: !0,
	toHref(e = k_.defaultProtocol) {
		return this.hasProtocol() ? this.v : `${e}://${this.v}`;
	},
	hasProtocol() {
		let e = this.tk;
		return e.length >= 2 && e[0].t !== mg && e[1].t === Gg;
	}
}), R_ = (e) => new cg(e);
function z_({ groups: e }) {
	let t = e.domain.concat([
		Rg,
		Bg,
		Vg,
		Hg,
		Ug,
		Wg,
		qg,
		Yg,
		Zg,
		yg,
		Qg,
		$g,
		e_,
		t_,
		o_,
		u_,
		s_,
		c_
	]), n = [
		zg,
		Gg,
		Kg,
		Jg,
		Xg,
		Qg,
		n_,
		r_,
		a_,
		Og,
		kg,
		Sg,
		Cg,
		Tg,
		wg,
		Eg,
		Dg,
		Ag,
		jg,
		Mg,
		Ng,
		Pg,
		Fg,
		Ig,
		Lg
	], r = [
		Rg,
		zg,
		Bg,
		Hg,
		Ug,
		Wg,
		qg,
		Yg,
		Zg,
		Sg,
		Cg,
		Qg,
		$g,
		e_,
		t_,
		n_,
		o_,
		u_,
		s_,
		c_
	], i = R_(), a = Q(i, s_);
	X(a, r, a), X(a, e.domain, a);
	let o = R_(), s = R_(), c = R_();
	X(i, e.domain, o), X(i, e.scheme, s), X(i, e.slashscheme, c), X(o, r, a), X(o, e.domain, o);
	let l = Q(o, Vg);
	Q(a, Vg, l), Q(s, Vg, l), Q(c, Vg, l);
	let u = Q(a, Jg);
	X(u, r, a), X(u, e.domain, a);
	let d = R_();
	X(l, e.domain, d), X(d, e.domain, d);
	let f = Q(d, Jg);
	X(f, e.domain, d);
	let p = R_(P_);
	X(f, e.tld, p), X(f, e.utld, p), Q(l, mg, p);
	let m = Q(d, Zg);
	Q(m, Zg, m), X(m, e.domain, d), X(p, e.domain, d), Q(p, Jg, f), Q(p, Zg, m);
	let h = Q(o, Zg), g = Q(o, Jg);
	Q(h, Zg, h), X(h, e.domain, o), X(g, r, a), X(g, e.domain, o);
	let _ = R_(L_);
	X(g, e.tld, _), X(g, e.utld, _), X(_, e.domain, o), X(_, r, a), Q(_, Jg, g), Q(_, Zg, h), Q(_, Vg, l);
	let v = Q(_, Gg), y = R_(L_);
	X(v, e.numeric, y);
	let b = R_(L_), x = R_();
	X(b, t, b), X(b, n, x), X(x, t, b), X(x, n, x), Q(_, o_, b), Q(y, o_, b);
	let S = Q(s, Gg), C = Q(Q(Q(c, Gg), o_), o_);
	X(s, e.domain, o), Q(s, Jg, g), Q(s, Zg, h), X(c, e.domain, o), Q(c, Jg, g), Q(c, Zg, h), X(S, e.domain, b), Q(S, o_, b), Q(S, n_, b), X(C, e.domain, b), X(C, t, b), Q(C, o_, b);
	let w = [
		[Sg, Cg],
		[wg, Tg],
		[Eg, Dg],
		[Og, kg],
		[Ag, jg],
		[Mg, Ng],
		[Pg, Fg],
		[Ig, Lg]
	];
	for (let e = 0; e < w.length; e++) {
		let [r, i] = w[e], a = Q(b, r);
		Q(x, r, a);
		let o = R_(L_);
		X(a, t, o);
		let s = R_();
		X(a, n, s), Q(a, i, b), X(o, t, o), X(o, n, s), X(s, t, o), X(s, n, s), Q(o, i, b), Q(s, i, b);
	}
	return Q(i, mg, _), Q(i, xg, I_), {
		start: i,
		tokens: d_
	};
}
function B_(e, t, n) {
	let r = n.length, i = 0, a = [], o = [];
	for (; i < r;) {
		let s = e, c = null, l = null, u = 0, d = null, f = -1;
		for (; i < r && !(c = s.go(n[i].t));) o.push(n[i++]);
		for (; i < r && (l = c || s.go(n[i].t));) c = null, s = l, s.accepts() ? (f = 0, d = s) : f >= 0 && f++, i++, u++;
		if (f < 0) i -= u, i < r && (o.push(n[i]), i++);
		else {
			o.length > 0 && (a.push(V_(F_, t, o)), o = []), i -= f, u -= f;
			let e = d.t, r = n.slice(i - u, i);
			a.push(V_(e, t, r));
		}
	}
	return o.length > 0 && a.push(V_(F_, t, o)), a;
}
function V_(e, t, n) {
	let r = n[0].s, i = n[n.length - 1].e;
	return new e(t.slice(r, i), n);
}
var H_ = typeof console < "u" && console && console.warn || (() => {}), U_ = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", $ = {
	scanner: null,
	parser: null,
	tokenQueue: [],
	pluginQueue: [],
	customSchemes: [],
	initialized: !1
};
function W_() {
	return cg.groups = {}, $.scanner = null, $.parser = null, $.tokenQueue = [], $.pluginQueue = [], $.customSchemes = [], $.initialized = !1, $;
}
function G_(e, t = !1) {
	if ($.initialized && H_(`linkifyjs: already initialized - will not register custom scheme "${e}" ${U_}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(e)) throw Error("linkifyjs: incorrect scheme format.\n1. Must only contain digits, lowercase ASCII letters or \"-\"\n2. Cannot start or end with \"-\"\n3. \"-\" cannot repeat");
	$.customSchemes.push([e, t]);
}
function K_() {
	$.scanner = w_($.customSchemes);
	for (let e = 0; e < $.tokenQueue.length; e++) $.tokenQueue[e][1]({ scanner: $.scanner });
	$.parser = z_($.scanner.tokens);
	for (let e = 0; e < $.pluginQueue.length; e++) $.pluginQueue[e][1]({
		scanner: $.scanner,
		parser: $.parser
	});
	return $.initialized = !0, $;
}
function q_(e) {
	return $.initialized || K_(), B_($.parser.start, e, T_($.scanner.start, e));
}
q_.scan = T_;
function J_(e, t = null, n = null) {
	if (t && typeof t == "object") {
		if (n) throw Error(`linkifyjs: Invalid link type ${t}; must be a string`);
		n = t, t = null;
	}
	let r = new A_(n), i = q_(e), a = [];
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		n.isLink && (!t || n.t === t) && r.check(n) && a.push(n.toFormattedObject(r));
	}
	return a;
}
//#endregion
//#region node_modules/@tiptap/extension-link/dist/index.js
var Y_ = "[\0- \xA0 ᠎ -\u2029 　]", X_ = new RegExp(Y_), Z_ = RegExp(`${Y_}$`), Q_ = new RegExp(Y_, "g");
function $_(e) {
	return e.length === 1 ? e[0].isLink : e.length === 3 && e[1].isLink ? ["()", "[]"].includes(e[0].value + e[2].value) : !1;
}
function ev(e) {
	return new B({
		key: new $n("autolink"),
		appendTransaction: (t, n, r) => {
			let i = t.some((e) => e.docChanged) && !n.doc.eq(r.doc), a = t.some((e) => e.getMeta("preventAutolink"));
			if (!i || a) return;
			let { tr: o } = r;
			if (ku(yu(n.doc, [...t])).forEach(({ newRange: t }) => {
				let n = xu(r.doc, t, (e) => e.isTextblock), i, a;
				if (n.length > 1) i = n[0], a = r.doc.textBetween(i.pos, i.pos + i.node.nodeSize, void 0, " ");
				else if (n.length) {
					let e = r.doc.textBetween(t.from, t.to, " ", " ");
					if (!Z_.test(e)) return;
					i = n[0], a = r.doc.textBetween(i.pos, t.to, void 0, " ");
				}
				if (i && a) {
					let t = a.split(X_).filter(Boolean);
					if (t.length <= 0) return !1;
					let n = t[t.length - 1], s = i.pos + a.lastIndexOf(n);
					if (!n) return !1;
					let c = q_(n).map((t) => t.toObject(e.defaultProtocol));
					if (!$_(c)) return !1;
					c.filter((e) => e.isLink).map((e) => ({
						...e,
						from: s + e.start + 1,
						to: s + e.end + 1
					})).filter((e) => r.schema.marks.code ? !r.doc.rangeHasMark(e.from, e.to, r.schema.marks.code) : !0).filter((t) => e.validate(t.value)).filter((t) => e.shouldAutoLink(t.value)).forEach((t) => {
						Au(t.from, t.to, r.doc).some((t) => t.mark.type === e.type) || o.addMark(t.from, t.to, e.type.create({ href: t.href }));
					});
				}
			}), o.steps.length) return o;
		}
	});
}
function tv(e) {
	return new B({
		key: new $n("handleClickLink"),
		props: { handleClick: (t, n, r) => {
			if (r.button !== 0 || !t.editable) return !1;
			let i = r.target, a = [];
			for (; i.nodeName !== "DIV";) a.push(i), i = i.parentNode;
			if (!a.find((e) => e.nodeName === "A")) return !1;
			let o = Eu(t.state, e.type.name), s = r.target, c = s?.href ?? o.href, l = s?.target ?? o.target;
			return s && c ? (window.open(c, l), !0) : !1;
		} }
	});
}
function nv(e) {
	return new B({
		key: new $n("handlePasteLink"),
		props: { handlePaste: (t, n, r) => {
			let { state: i } = t, { selection: a } = i, { empty: o } = a;
			if (o) return !1;
			let s = "";
			r.content.forEach((e) => {
				s += e.textContent;
			});
			let c = J_(s, { defaultProtocol: e.defaultProtocol }).find((e) => e.isLink && e.value === s);
			return !s || !c ? !1 : e.editor.commands.setMark(e.type, { href: c.href });
		} }
	});
}
function rv(e, t) {
	let n = [
		"http",
		"https",
		"ftp",
		"ftps",
		"mailto",
		"tel",
		"callto",
		"sms",
		"cid",
		"xmpp"
	];
	return t && t.forEach((e) => {
		let t = typeof e == "string" ? e : e.scheme;
		t && n.push(t);
	}), !e || e.replace(Q_, "").match(RegExp(`^(?:(?:${n.join("|")}):|[^a-z]|[a-z0-9+.\-]+(?:[^a-z+.\-:]|$))`, "i"));
}
var iv = Xc.create({
	name: "link",
	priority: 1e3,
	keepOnSplit: !1,
	exitable: !0,
	onCreate() {
		this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((e) => {
			if (typeof e == "string") {
				G_(e);
				return;
			}
			G_(e.scheme, e.optionalSlashes);
		});
	},
	onDestroy() {
		W_();
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
			isAllowedUri: (e, t) => !!rv(e, t.protocols),
			validate: (e) => !!e,
			shouldAutoLink: (e) => !!e
		};
	},
	addAttributes() {
		return {
			href: {
				default: null,
				parseHTML(e) {
					return e.getAttribute("href");
				}
			},
			target: { default: this.options.HTMLAttributes.target },
			rel: { default: this.options.HTMLAttributes.rel },
			class: { default: this.options.HTMLAttributes.class }
		};
	},
	parseHTML() {
		return [{
			tag: "a[href]",
			getAttrs: (e) => {
				let t = e.getAttribute("href");
				return !t || !this.options.isAllowedUri(t, {
					defaultValidate: (e) => !!rv(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : null;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return this.options.isAllowedUri(e.href, {
			defaultValidate: (e) => !!rv(e, this.options.protocols),
			protocols: this.options.protocols,
			defaultProtocol: this.options.defaultProtocol
		}) ? [
			"a",
			q(this.options.HTMLAttributes, e),
			0
		] : [
			"a",
			q(this.options.HTMLAttributes, {
				...e,
				href: ""
			}),
			0
		];
	},
	addCommands() {
		return {
			setLink: (e) => ({ chain: t }) => {
				let { href: n } = e;
				return this.options.isAllowedUri(n, {
					defaultValidate: (e) => !!rv(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? t().setMark(this.name, e).setMeta("preventAutolink", !0).run() : !1;
			},
			toggleLink: (e) => ({ chain: t }) => {
				let { href: n } = e;
				return this.options.isAllowedUri(n, {
					defaultValidate: (e) => !!rv(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? t().toggleMark(this.name, e, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run() : !1;
			},
			unsetLink: () => ({ chain: e }) => e().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
		};
	},
	addPasteRules() {
		return [_d({
			find: (e) => {
				let t = [];
				if (e) {
					let { protocols: n, defaultProtocol: r } = this.options, i = J_(e).filter((e) => e.isLink && this.options.isAllowedUri(e.value, {
						defaultValidate: (e) => !!rv(e, n),
						protocols: n,
						defaultProtocol: r
					}));
					i.length && i.forEach((e) => t.push({
						text: e.value,
						data: { href: e.href },
						index: e.start
					}));
				}
				return t;
			},
			type: this.type,
			getAttributes: (e) => ({ href: e.data?.href })
		})];
	},
	addProseMirrorPlugins() {
		let e = [], { protocols: t, defaultProtocol: n } = this.options;
		return this.options.autolink && e.push(ev({
			type: this.type,
			defaultProtocol: this.options.defaultProtocol,
			validate: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!rv(e, t),
				protocols: t,
				defaultProtocol: n
			}),
			shouldAutoLink: this.options.shouldAutoLink
		})), this.options.openOnClick === !0 && e.push(tv({ type: this.type })), this.options.linkOnPaste && e.push(nv({
			editor: this.editor,
			defaultProtocol: this.options.defaultProtocol,
			type: this.type
		})), e;
	}
}), av = Xc.create({
	name: "subscript",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [{ tag: "sub" }, {
			style: "vertical-align",
			getAttrs(e) {
				return e === "sub" ? null : !1;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"sub",
			q(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return {
			setSubscript: () => ({ commands: e }) => e.setMark(this.name),
			toggleSubscript: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetSubscript: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-,": () => this.editor.commands.toggleSubscript() };
	}
}), ov = Xc.create({
	name: "superscript",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [{ tag: "sup" }, {
			style: "vertical-align",
			getAttrs(e) {
				return e === "super" ? null : !1;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"sup",
			q(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return {
			setSuperscript: () => ({ commands: e }) => e.setMark(this.name),
			toggleSuperscript: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetSuperscript: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-.": () => this.editor.commands.toggleSuperscript() };
	}
}), sv = {
	key: 0,
	class: "v-wysiwyg"
}, cv = { class: "toolbar" }, lv = { class: "button-group" }, uv = ["title", "aria-label"], dv = ["data-replicated-value"], fv = { class: "toolbar" }, pv = [
	"aria-pressed",
	"disabled",
	"aria-disabled",
	"title",
	"aria-label",
	"onClick"
], mv = { class: "toolbar bubble" }, hv = [
	"aria-pressed",
	"disabled",
	"aria-disabled",
	"title",
	"aria-label",
	"onClick"
], gv = {
	__name: "Wysiwyg",
	props: /*@__PURE__*/ d({
		toolbar: {
			type: Array,
			default: [
				[
					"bold",
					"italic",
					"underline"
				],
				[
					"unordered",
					"ordered",
					"outdent",
					"indent"
				],
				[],
				["undo", "redo"],
				["viewsource"]
			]
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
	setup(o) {
		let s = v(!1), c = S(o, "modelValue"), l = o, u = Kh.configure({ types: ["heading", "paragraph"] }), d = iv.configure({
			openOnClick: !1,
			...l.linkConfiguration
		}), f = {
			bold: {
				class: "mdi mdi-format-bold",
				action: (e) => e.chain().focus().toggleBold().run(),
				active: (e) => e.isActive("bold"),
				extensions: [ph]
			},
			italic: {
				class: "mdi mdi-format-italic",
				action: (e) => e.chain().focus().toggleItalic().run(),
				active: (e) => e.isActive("italic"),
				extensions: [vh]
			},
			underline: {
				class: "mdi mdi-format-underline",
				action: (e) => e.chain().focus().toggleUnderline().run(),
				active: (e) => e.isActive("underline"),
				extensions: [yh]
			},
			strike: {
				class: "mdi mdi-format-strikethrough-variant",
				action: (e) => e.chain().focus().toggleStrike().run(),
				active: (e) => e.isActive("strike"),
				extensions: [Sh]
			},
			unordered: {
				class: "mdi mdi-format-list-bulleted",
				action: (e) => e.chain().focus().toggleBulletList().run(),
				active: (e) => O(e) === "bulletList",
				extensions: [
					Dh,
					Ch,
					Vh
				]
			},
			ordered: {
				class: "mdi mdi-format-list-numbered",
				action: (e) => e.chain().focus().toggleOrderedList().run(),
				active: (e) => O(e) === "orderedList",
				extensions: [
					jh,
					Ch,
					Vh
				]
			},
			outdent: {
				class: "mdi mdi-format-indent-decrease",
				action: (e) => e.chain().focus().liftListItem("listItem").run(),
				disabled: (e) => !e.can().liftListItem("listItem"),
				extensions: [Ch]
			},
			indent: {
				class: "mdi mdi-format-indent-increase",
				action: (e) => e.chain().focus().sinkListItem("listItem").run(),
				disabled: (e) => !e.can().sinkListItem("listItem"),
				extensions: [Ch]
			},
			h1: {
				class: "mdi mdi-format-header-1",
				action: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
				active: (e) => e.isActive("heading", { level: 1 }),
				extensions: [Hh]
			},
			h2: {
				class: "mdi mdi-format-header-2",
				action: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
				active: (e) => e.isActive("heading", { level: 2 }),
				extensions: [Hh]
			},
			h3: {
				class: "mdi mdi-format-header-3",
				action: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
				active: (e) => e.isActive("heading", { level: 3 }),
				extensions: [Hh]
			},
			h4: {
				class: "mdi mdi-format-header-4",
				action: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
				active: (e) => e.isActive("heading", { level: 4 }),
				extensions: [Hh]
			},
			h5: {
				class: "mdi mdi-format-header-5",
				action: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
				active: (e) => e.isActive("heading", { level: 5 }),
				extensions: [Hh]
			},
			h6: {
				class: "mdi mdi-format-header-6",
				action: (e) => e.chain().focus().toggleHeading({ level: 6 }).run(),
				active: (e) => e.isActive("heading", { level: 6 }),
				extensions: [Hh]
			},
			quote: {
				class: "mdi mdi-format-quote-open",
				action: (e) => e.chain().focus().toggleBlockquote().run(),
				active: (e) => e.isActive("blockquote"),
				disabled: (e) => !e.can().toggleBlockquote(),
				extensions: [Wh]
			},
			hardBreak: {
				class: "mdi mdi-keyboard-return",
				action: (e) => e.chain().focus().setHardBreak().run()
			},
			hr: {
				class: "mdi mdi-minus",
				action: (e) => e.chain().focus().setHorizontalRule().run(),
				extensions: [Gh]
			},
			left: {
				class: "mdi mdi-format-align-left",
				action: (e) => e.chain().focus().unsetTextAlign().run(),
				active: (e) => !(e.isActive({ textAlign: "center" }) || e.isActive({ textAlign: "right" }) || e.isActive({ textAlign: "justify" })),
				extensions: [u]
			},
			center: {
				class: "mdi mdi-format-align-center",
				action: (e) => e.chain().focus().setTextAlign("center").run(),
				active: (e) => e.isActive({ textAlign: "center" }),
				extensions: [u]
			},
			right: {
				class: "mdi mdi-format-align-right",
				action: (e) => e.chain().focus().setTextAlign("right").run(),
				active: (e) => e.isActive({ textAlign: "right" }),
				extensions: [u]
			},
			justify: {
				class: "mdi mdi-format-align-justify",
				action: (e) => e.chain().focus().setTextAlign("justify").run(),
				active: (e) => e.isActive({ textAlign: "justify" }),
				extensions: [u]
			},
			link: {
				class: "mdi mdi-link",
				action: (e) => T(e),
				active: (e) => e.isActive("link"),
				extensions: [d]
			},
			unlink: {
				class: "mdi mdi-link-off",
				action: (e) => e.chain().focus().unsetLink().run(),
				disabled: (e) => !e.isActive("link"),
				extensions: [d]
			},
			superscript: {
				class: "mdi mdi-format-superscript",
				action: (e) => {
					e.chain().unsetSubscript?.().run(), e.chain().focus().toggleSuperscript().run();
				},
				active: (e) => e.isActive("superscript"),
				extensions: [ov]
			},
			subscript: {
				class: "mdi mdi-format-subscript",
				action: (e) => {
					e.chain().unsetSuperscript?.().run(), e.chain().focus().toggleSubscript().run();
				},
				active: (e) => e.isActive("subscript"),
				extensions: [av]
			},
			removeFormat: {
				class: "mdi mdi-format-clear",
				action: (e) => e.chain().focus().unsetAllMarks().run()
			},
			undo: {
				class: "mdi mdi-undo",
				action: (e) => e.chain().focus().undo().run(),
				disabled: (e) => !e.can().undo()
			},
			redo: {
				class: "mdi mdi-redo",
				action: (e) => e.chain().focus().redo().run(),
				disabled: (e) => !e.can().redo()
			},
			viewsource: {
				class: "mdi mdi-code-tags",
				action: () => s.value = !s.value
			},
			infoBlock: {
				class: "mdi mdi-information-outline",
				action: (e) => e.chain().focus().toggleCustom().run(),
				active: (e) => e.isActive("info-block")
			}
		}, h = l.toolbar.flat().flatMap((e) => f[e].extensions).filter((e, t, n) => n.indexOf(e) === t), g = gd.create({
			name: "info-block",
			content: "block+",
			group: "block",
			defining: !0,
			addOptions() {
				return { HTMLAttributes: { class: "info-block" } };
			},
			parseHTML() {
				return [{ tag: "div" }];
			},
			renderHTML({ HTMLAttributes: e }) {
				return [
					"div",
					q(this.options.HTMLAttributes, e),
					0
				];
			},
			addCommands() {
				return { toggleCustom: () => ({ commands: e }) => e.toggleWrap(this.name) };
			}
		}), b = Sm({
			content: c.value,
			extensions: [
				Cm,
				wm,
				Tm,
				Ym,
				Xm,
				ch,
				g,
				...h
			],
			onUpdate: function({ editor: e }) {
				c.value = e.getHTML();
			},
			autofocus: l.autofocus
		});
		w(c, (e, t) => {
			e !== b?.value?.getHTML() && b?.value?.commands.setContent(c.value);
		});
		let T = function(e) {
			let t = e.getAttributes("link").href, n = window.prompt("URL", t);
			if (n !== null) {
				if (n === "") {
					e.chain().focus().extendMarkRange("link").unsetLink().run();
					return;
				}
				e.chain().focus().extendMarkRange("link").setLink({ href: /^https?:\/\//i.test(n) ? n : `https://${n}` }).run();
			}
		}, O = function(e) {
			return Cu((t) => Lu(t.type.name, e.extensionManager.extensions))(e.state.selection)?.node?.type.name;
		};
		return (l, u) => x(b) ? (_(), r("div", sv, [x(s) ? (_(), r(e, { key: 0 }, [i("div", cv, [u[2] ||= i("div", { class: "button-group gap" }, null, -1), i("div", lv, [i("button", {
			type: "button",
			class: "mdi mdi-code-tags is-active",
			"aria-pressed": "true",
			title: l.$vui.i18n().wysiwyg.viewsource,
			"aria-label": l.$vui.i18n().wysiwyg.viewsource,
			onClick: u[0] ||= (...e) => f.viewsource.action && f.viewsource.action(...e)
		}, null, 8, uv)])]), i("div", {
			class: "grow-wrap",
			"data-replicated-value": c.value
		}, [D(i("textarea", {
			"onUpdate:modelValue": u[1] ||= (e) => c.value = e,
			class: "editor",
			style: m({ "max-height": o.maxHeight })
		}, null, 4), [[C, c.value]])], 8, dv)], 64)) : (_(), r(e, { key: 1 }, [
			i("div", fv, [(_(!0), r(e, null, y(o.toolbar, (t) => (_(), r("div", { class: p(["button-group", { gap: t.length === 0 }]) }, [(_(!0), r(e, null, y(t, (e) => (_(), r("button", {
				type: "button",
				key: e,
				class: p([f[e].class, { "is-active": f[e].active?.(x(b)) }]),
				"aria-pressed": f[e].active?.(x(b)),
				disabled: f[e].disabled?.(x(b)),
				"aria-disabled": f[e].disabled?.(x(b)),
				title: l.$vui.i18n().wysiwyg[e],
				"aria-label": l.$vui.i18n().wysiwyg[e],
				onClick: (t) => f[e].action(x(b))
			}, null, 10, pv))), 128))], 2))), 256))]),
			x(b) && o.bubbleToolbar ? (_(), t(x(vm), {
				key: 0,
				editor: x(b)
			}, {
				default: E(() => [i("div", mv, [(_(!0), r(e, null, y(o.bubbleToolbar, (t) => (_(), r("div", { class: p(["button-group", { gap: t.length === 0 }]) }, [(_(!0), r(e, null, y(t, (e) => (_(), r("button", {
					type: "button",
					key: e,
					class: p([f[e].class, { "is-active": f[e].active?.(x(b)) }]),
					"aria-pressed": f[e].active?.(x(b)),
					disabled: f[e].disabled?.(x(b)),
					"aria-disabled": f[e].disabled?.(x(b)),
					title: l.$vui.i18n().wysiwyg[e],
					"aria-label": l.$vui.i18n().wysiwyg[e],
					onClick: (t) => f[e].action(x(b))
				}, null, 10, hv))), 128))], 2))), 256))])]),
				_: 1
			}, 8, ["editor"])) : n("", !0),
			a(x(xm), {
				editor: x(b),
				class: "editor",
				style: m({ "max-height": o.maxHeight })
			}, null, 8, ["editor", "style"])
		], 64))])) : n("", !0);
	}
}, _v = {
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
}, vv = {
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
}, yv = { install: function(e, t) {
	e.component("v-wysiwyg", gv), VertigoUi.lang.enUS.wysiwyg = _v, VertigoUi.lang.fr.wysiwyg = vv;
} };
window && (window.WYSIWYG = yv);
//#endregion
export { yv as default };

//# sourceMappingURL=vertigo-wysiwyg.es.js.map