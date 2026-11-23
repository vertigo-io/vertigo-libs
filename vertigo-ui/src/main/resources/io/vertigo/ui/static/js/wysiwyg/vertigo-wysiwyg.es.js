import { Fragment as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createElementVNode as i, createVNode as a, customRef as o, defineComponent as s, getCurrentInstance as c, h as l, markRaw as u, mergeModels as d, nextTick as f, normalizeClass as p, normalizeStyle as m, onBeforeUnmount as h, onMounted as g, openBlock as _, ref as v, renderList as y, shallowRef as b, unref as x, useModel as S, vModelText as C, watch as w, watchEffect as T, withCtx as E, withDirectives as D } from "vue";
// node_modules/orderedmap/dist/index.js
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
// node_modules/prosemirror-model/dist/index.js
function k(e, t, n) {
	for (let r = 0;; r++) {
		if (r == e.childCount || r == t.childCount) return e.childCount == t.childCount ? null : n;
		let i = e.child(r), a = t.child(r);
		if (i == a) n += i.nodeSize;
		else {
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
}
function ee(e, t, n, r) {
	for (let i = e.childCount, a = t.childCount;;) {
		if (i == 0 || a == 0) return i == a ? null : {
			a: n,
			b: r
		};
		let o = e.child(--i), s = t.child(--a), c = o.nodeSize;
		if (o == s) n -= c, r -= c;
		else {
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
		return n.create(t.attrs);
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
	}
	if (!n.content.size) return pe(a, he(e, t, r));
	if (!n.openStart && !n.openEnd && e.depth == r && t.depth == r) {
		let r = e.parent, i = r.content;
		return pe(r, i.cut(0, e.parentOffset).append(n.content).append(i.cut(t.parentOffset)));
	}
	{
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
	if (!e.type.validContent(t)) throw new ie("Invalid content for node " + e.type.name);
	return e.copy(t);
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
		for (var a = 0; a < i.length; a++) i[a].type.spec.inclusive !== !1 || r && i[a].isInSet(r.marks) || (i = i[a--].removeFromSet(i));
		return i;
	}
	marksAcross(e) {
		let t = this.parent.maybeChild(this.index());
		if (!t || !t.isInline) return null;
		let n = t.marks, r = e.parent.maybeChild(e.index());
		for (var i = 0; i < n.length; i++) n[i].type.spec.inclusive !== !1 || r && n[i].isInSet(r.marks) || (n = n[i--].removeFromSet(n));
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
		return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Ee(this.marks, e);
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
		this.type.checkContent(this.content), De(this.type.attrs, this.attrs, "node", this.type.name);
		let e = N.none;
		for (let t = 0; t < this.marks.length; t++) {
			let n = this.marks[t];
			De(n.type.attrs, n.attrs, "mark", n.type.name), e = n.addToSet(e);
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
		let r = M.fromJSON(e, t.content);
		return e.nodeType(t.type).create(t.attrs, r, n);
	}
};
Ce.prototype.text = void 0;
var we = (() => {
	let { stack: e } = /* @__PURE__ */ Error("/");
	if (!e || !/\n\s*at\s/.test(e)) return (e) => e;
	let t = Object.create(null);
	return (e) => (t[e], e);
})(), Te = class e extends Ce {
	constructor(e, t, n, r) {
		if (super(e, t, null, r), !n) throw RangeError("Empty text nodes are not allowed");
		this.text = n;
	}
	toString() {
		return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Ee(this.marks, JSON.stringify(this.text));
	}
	get textContent() {
		return this.text;
	}
	textBetween(e, t) {
		return we(this.text.slice(e, t));
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
		return e == 0 && t == this.text.length ? this : this.withText(we(this.text.slice(e, t)));
	}
	eq(e) {
		return this.sameMarkup(e) && this.text == e.text;
	}
	toJSON() {
		let e = super.toJSON();
		return e.text = this.text, e;
	}
};
function Ee(e, t) {
	for (let n = e.length - 1; n >= 0; n--) t = e[n].type.name + "(" + t + ")";
	return t;
}
function De(e, t, n, r) {
	for (let i in t) if (!(i in e)) throw RangeError(`Unsupported attribute ${i} for ${n} of type ${r}`);
	for (let n in e) e[n].validate && e[n].validate(t[n]);
}
var Oe = class e {
	constructor(e) {
		this.validEnd = e, this.next = [], this.wrapCache = [];
	}
	static parse(t, n) {
		let r = new ke(t, n);
		if (r.next == null) return e.empty;
		let i = Ae(r);
		r.next && r.err("Unexpected trailing text");
		let a = Be(Le(i));
		return Ve(a, r), a;
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
				a.isLeaf || a.hasRequiredAttrs() || a.name in t || r.type && !o.validEnd || (n.push({
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
Oe.empty = new Oe(!0);
var ke = class {
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
function Ae(e) {
	let t = [];
	do
		t.push(je(e));
	while (e.eat("|"));
	return t.length == 1 ? t[0] : {
		type: "choice",
		exprs: t
	};
}
function je(e) {
	let t = [];
	do
		t.push(Me(e));
	while (e.next && e.next != ")" && e.next != "|");
	return t.length == 1 ? t[0] : {
		type: "seq",
		exprs: t
	};
}
function Me(e) {
	let t = Ie(e);
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
	else if (e.eat("{")) t = Pe(e, t);
	else break;
	return t;
}
function Ne(e) {
	/\D/.test(e.next) && e.err("Expected number, got '" + e.next + "'");
	let t = Number(e.next);
	return e.pos++, t;
}
function Pe(e, t) {
	let n = Ne(e), r = n;
	return e.eat(",") && (r = e.next == "}" ? -1 : Ne(e)), e.eat("}") || e.err("Unclosed braced range"), {
		type: "range",
		min: n,
		max: r,
		expr: t
	};
}
function Fe(e, t) {
	let n = e.nodeTypes, r = n[t];
	if (r) return [r];
	let i = [];
	for (let e in n) {
		let r = n[e];
		r.isInGroup(t) && i.push(r);
	}
	return i.length == 0 && e.err("No node type or group '" + t + "' found"), i;
}
function Ie(e) {
	if (e.eat("(")) {
		let t = Ae(e);
		return e.eat(")") || e.err("Missing closing paren"), t;
	}
	if (/\W/.test(e.next)) e.err("Unexpected token '" + e.next + "'");
	else {
		let t = Fe(e, e.next).map((t) => (e.inline == null ? e.inline = t.isInline : e.inline != t.isInline && e.err("Mixing inline and block content"), {
			type: "name",
			value: t
		}));
		return e.pos++, t.length == 1 ? t[0] : {
			type: "choice",
			exprs: t
		};
	}
}
function Le(e) {
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
function Re(e, t) {
	return t - e;
}
function ze(e, t) {
	let n = [];
	return r(t), n.sort(Re);
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
function Be(e) {
	let t = Object.create(null);
	return n(ze(e, 0));
	function n(r) {
		let i = [];
		r.forEach((t) => {
			e[t].forEach(({ term: t, to: n }) => {
				if (!t) return;
				let r;
				for (let e = 0; e < i.length; e++) i[e][0] == t && (r = i[e][1]);
				ze(e, n).forEach((e) => {
					r || i.push([t, r = []]), r.indexOf(e) == -1 && r.push(e);
				});
			});
		});
		let a = t[r.join(",")] = new Oe(r.indexOf(e.length - 1) > -1);
		for (let e = 0; e < i.length; e++) {
			let r = i[e][1].sort(Re);
			a.next.push({
				type: i[e][0],
				next: t[r.join(",")] || n(r)
			});
		}
		return a;
	}
}
function Ve(e, t) {
	for (let n = 0, r = [e]; n < r.length; n++) {
		let e = r[n], i = !e.validEnd, a = [];
		for (let t = 0; t < e.next.length; t++) {
			let { type: n, next: o } = e.next[t];
			a.push(n.name), i && !(n.isText || n.hasRequiredAttrs()) && (i = !1), r.indexOf(o) == -1 && r.push(o);
		}
		i && t.err("Only non-generatable nodes (" + a.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
	}
}
function He(e) {
	let t = Object.create(null);
	for (let n in e) {
		let r = e[n];
		if (!r.hasDefault) return null;
		t[n] = r.default;
	}
	return t;
}
function Ue(e, t) {
	let n = Object.create(null);
	for (let r in e) {
		let i = e[r], a = t && t[r];
		if (a === void 0) {
			if (i.hasDefault) a = i.default;
			else throw RangeError("No value supplied for attribute " + r);
		} else i.validate && i.validate(a);
		n[r] = a;
	}
	return n;
}
function We(e, t) {
	let n = Object.create(null);
	if (t) for (let r in t) n[r] = new qe(e, r, t[r]);
	return n;
}
var Ge = class e {
	constructor(e, t, n) {
		this.name = e, this.schema = t, this.spec = n, this.markSet = null, this.groups = n.group ? n.group.split(" ") : [], this.attrs = We(e, n.attrs), this.defaultAttrs = He(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(n.inline || e == "text"), this.isText = e == "text";
	}
	get isInline() {
		return !this.isBlock;
	}
	get isTextblock() {
		return this.isBlock && this.inlineContent;
	}
	get isLeaf() {
		return this.contentMatch == Oe.empty;
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
		return !e && this.defaultAttrs ? this.defaultAttrs : Ue(this.attrs, e);
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
	checkAttrs(e) {}
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
function Ke(e, t, n) {
	let r = n.split("|");
	return (n) => {
		let i = n === null ? "null" : typeof n;
		if (r.indexOf(i) < 0) throw RangeError(`Expected value of type ${r} for attribute ${t} on type ${e}, got ${i}`);
	};
}
var qe = class {
	constructor(e, t, n) {
		this.hasDefault = Object.prototype.hasOwnProperty.call(n, "default"), this.default = n.default, this.validate = typeof n.validate == "string" ? Ke(e, t, n.validate) : n.validate;
	}
	get isRequired() {
		return !this.hasDefault;
	}
}, Je = class e {
	constructor(e, t, n, r) {
		this.name = e, this.rank = t, this.schema = n, this.spec = r, this.attrs = We(e, r.attrs), this.excluded = null;
		let i = He(this.attrs);
		this.instance = i ? new N(this, i) : null;
	}
	create(e = null) {
		return !e && this.instance ? this.instance : new N(this, Ue(this.attrs, e));
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
	excludes(e) {
		return this.excluded.indexOf(e) > -1;
	}
}, Ye = class {
	constructor(e) {
		this.linebreakReplacement = null, this.cached = Object.create(null);
		let t = this.spec = {};
		for (let n in e) t[n] = e[n];
		t.nodes = O.from(e.nodes), t.marks = O.from(e.marks || {}), this.nodes = Ge.compile(this.spec.nodes, this), this.marks = Je.compile(this.spec.marks, this);
		let n = Object.create(null);
		for (let e in this.nodes) {
			if (e in this.marks) throw RangeError(e + " can not be both a node and a mark");
			let t = this.nodes[e], r = t.spec.content || "", i = t.spec.marks;
			if (t.contentMatch = n[r] || (n[r] = Oe.parse(r, this.nodes)), t.inlineContent = t.contentMatch.inlineContent, t.spec.linebreakReplacement) {
				if (this.linebreakReplacement) throw RangeError("Multiple linebreak nodes defined");
				if (!t.isInline || !t.isLeaf) throw RangeError("Linebreak replacement nodes must be inline leaf nodes");
				this.linebreakReplacement = t;
			}
			t.markSet = i == "_" ? null : i ? Xe(this, i.split(" ")) : i == "" || !t.inlineContent ? [] : null;
		}
		for (let e in this.marks) {
			let t = this.marks[e], n = t.spec.excludes;
			t.excluded = n == null ? [t] : n == "" ? [] : Xe(this, n.split(" "));
		}
		this.nodeFromJSON = (e) => Ce.fromJSON(this, e), this.markFromJSON = (e) => N.fromJSON(this, e), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = Object.create(null);
	}
	node(e, t = null, n, r) {
		if (typeof e == "string") e = this.nodeType(e);
		else if (!(e instanceof Ge)) throw RangeError("Invalid node type: " + e);
		else if (e.schema != this) throw RangeError("Node type from different schema used (" + e.name + ")");
		return e.createChecked(t, n, r);
	}
	text(e, t) {
		let n = this.nodes.text;
		return new Te(n, n.defaultAttrs, e, N.setFrom(t));
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
function Xe(e, t) {
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
function Ze(e) {
	return e.tag != null;
}
function Qe(e) {
	return e.style != null;
}
var $e = class e {
	constructor(e, t) {
		this.schema = e, this.rules = t, this.tags = [], this.styles = [];
		let n = this.matchedStyles = [];
		t.forEach((e) => {
			if (Ze(e)) this.tags.push(e);
			else if (Qe(e)) {
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
		let n = new ct(this, t, !1);
		return n.addAll(e, N.none, t.from, t.to), n.finish();
	}
	parseSlice(e, t = {}) {
		let n = new ct(this, t, !0);
		return n.addAll(e, N.none, t.from, t.to), P.maxOpen(n.finish());
	}
	matchTag(e, t, n) {
		for (let r = n ? this.tags.indexOf(n) + 1 : 0; r < this.tags.length; r++) {
			let n = this.tags[r];
			if (ut(e, n.tag) && (n.namespace === void 0 || e.namespaceURI == n.namespace) && (!n.context || t.matchesContext(n.context))) {
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
				n(e = dt(e)), e.mark || e.ignore || e.clearMark || (e.mark = t);
			});
		}
		for (let t in e.nodes) {
			let r = e.nodes[t].spec.parseDOM;
			r && r.forEach((e) => {
				n(e = dt(e)), e.node || e.ignore || e.mark || (e.node = t);
			});
		}
		return t;
	}
	static fromSchema(t) {
		return t.cached.domParser || (t.cached.domParser = new e(t, e.schemaRules(t)));
	}
}, et = {
	address: !0,
	article: !0,
	aside: !0,
	blockquote: !0,
	body: !0,
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
}, tt = {
	head: !0,
	noscript: !0,
	object: !0,
	script: !0,
	style: !0,
	title: !0
}, nt = {
	ol: !0,
	ul: !0
}, rt = 1, it = 2, at = 4;
function ot(e, t, n) {
	return t == null ? e && e.whitespace == "pre" ? 3 : n & -5 : (t ? rt : 0) | (t === "full" ? it : 0);
}
var st = class {
	constructor(e, t, n, r, i, a) {
		this.type = e, this.attrs = t, this.marks = n, this.solid = r, this.options = a, this.content = [], this.activeMarks = N.none, this.match = i || (a & at ? null : e.contentMatch);
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
		if (!(this.options & rt)) {
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
		return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !et.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
	}
}, ct = class {
	constructor(e, t, n) {
		this.parser = e, this.options = t, this.isOpen = n, this.open = 0, this.localPreserveWS = !1;
		let r = t.topNode, i, a = ot(null, t.preserveWhitespace, 0) | (n ? at : 0);
		i = r ? new st(r.type, r.attrs, N.none, !0, t.topMatch || r.type.contentMatch, a) : n ? new st(null, null, N.none, !0, null, a) : new st(e.schema.topNodeType, null, N.none, !0, null, a), this.nodes = [i], this.find = t.findPositions, this.needsBlock = !1;
	}
	get top() {
		return this.nodes[this.open];
	}
	addDOM(e, t) {
		e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
	}
	addTextNode(e, t) {
		let n = e.nodeValue, r = this.top, i = r.options & it ? "full" : this.localPreserveWS || (r.options & rt) > 0, { schema: a } = this.parser;
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
		nt.hasOwnProperty(a) && this.parser.normalizeLists && lt(e);
		let s = this.options.ruleFromNode && this.options.ruleFromNode(e) || (o = this.parser.matchTag(e, this, n));
		out: if (s ? s.ignore : tt.hasOwnProperty(a)) this.findInside(e), this.ignoreFallback(e, t);
		else if (!s || s.skip || s.closeParent) {
			s && s.closeParent ? this.open = Math.max(0, this.open - 1) : s && s.skip.nodeType && (e = s.skip);
			let n, r = this.needsBlock;
			if (et.hasOwnProperty(a)) i.content.length && i.content[0].isInline && this.open && (this.open--, i = this.top), n = !0, i.type || (this.needsBlock = !0);
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
		e.nodeName != "BR" || this.top.type && this.top.type.inlineContent || this.findPlace(this.parser.schema.text("-"), t, !0);
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
		if (t.node) {
			if (a = this.parser.schema.nodes[t.node], a.isLeaf) this.insertNode(a.create(t.attrs), n, e.nodeName == "BR") || this.leafFallback(e, n);
			else {
				let e = this.enter(a, t.attrs || null, n, t.preserveWhitespace);
				e && (i = !0, n = e);
			}
		} else {
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
			for (let i of r.concat(e.marks)) (t.type ? t.type.allowsMarkType(i.type) : ft(i.type, e.type)) && (n = i.addToSet(n));
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
		let o = ot(e, i, a.options);
		a.options & at && a.content.length == 0 && (o |= at);
		let s = N.none;
		return n = n.filter((t) => !(a.type ? a.type.allowsMarkType(t.type) : ft(t.type, e)) || (s = t.addToSet(s), !1)), this.nodes.push(new st(e, t, s, r, null, o)), this.open++, n;
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
		else this.localPreserveWS && (this.nodes[t].options |= rt);
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
				}
				{
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
function lt(e) {
	for (let t = e.firstChild, n = null; t; t = t.nextSibling) {
		let e = t.nodeType == 1 ? t.nodeName.toLowerCase() : null;
		e && nt.hasOwnProperty(e) && n ? (n.appendChild(t), t = n) : e == "li" ? n = t : e && (n = null);
	}
}
function ut(e, t) {
	return (e.matches || e.msMatchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector).call(e, t);
}
function dt(e) {
	let t = {};
	for (let n in e) t[n] = e[n];
	return t;
}
function ft(e, t) {
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
var pt = class e {
	constructor(e, t) {
		this.nodes = e, this.marks = t;
	}
	serializeFragment(e, t = {}, n) {
		n ||= ht(t).createDocumentFragment();
		let r = n, i = [];
		return e.forEach((e) => {
			if (i.length || e.marks.length) {
				let n = 0, a = 0;
				for (; n < i.length && a < e.marks.length;) {
					let t = e.marks[a];
					if (!this.marks[t.type.name]) a++;
					else {
						if (!t.eq(i[n][0]) || t.type.spec.spanning === !1) break;
						n++, a++;
					}
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
		if (e.isText) return ht(t).createTextNode(e.text);
		let { dom: n, contentDOM: r } = yt(ht(t), this.nodes[e.type.name](e), null, e.attrs);
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
		return r && yt(ht(n), r(e, t), null, e.attrs);
	}
	static renderSpec(e, t, n = null, r) {
		return typeof t == "string" ? { dom: e.createTextNode(t) } : yt(e, t, n, r);
	}
	static fromSchema(t) {
		return t.cached.domSerializer || (t.cached.domSerializer = new e(this.nodesFromSchema(t), this.marksFromSchema(t)));
	}
	static nodesFromSchema(e) {
		let t = mt(e.nodes);
		return t.text ||= (e) => e.text, t;
	}
	static marksFromSchema(e) {
		return mt(e.marks);
	}
};
function mt(e) {
	let t = {};
	for (let n in e) {
		let r = e[n].spec.toDOM;
		r && (t[n] = r);
	}
	return t;
}
function ht(e) {
	return e.document || window.document;
}
var gt = /* @__PURE__ */ new WeakMap();
function _t(e) {
	let t = gt.get(e);
	return t === void 0 && gt.set(e, t = vt(e)), t;
}
function vt(e) {
	let t = null;
	function n(e) {
		if (e && typeof e == "object") {
			if (Array.isArray(e)) {
				if (typeof e[0] == "string") t ||= [], t.push(e);
				else for (let t = 0; t < e.length; t++) n(e[t]);
			} else for (let t in e) n(e[t]);
		}
	}
	return n(e), t;
}
function yt(e, t, n, r) {
	if (t.nodeType == 1) return { dom: t };
	if (t.dom && t.dom.nodeType == 1) return t;
	let i = t[0], a;
	if (typeof i != "string") throw RangeError("Invalid array passed to renderSpec");
	if (r && (a = _t(r)) && a.indexOf(t) > -1) throw RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
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
		}
		if (typeof a == "string") c.appendChild(e.createTextNode(a));
		else {
			let { dom: t, contentDOM: i } = yt(e, a, n, r);
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
// node_modules/prosemirror-transform/dist/index.js
var bt = 65535, xt = 2 ** 16;
function St(e, t) {
	return e + t * xt;
}
function Ct(e) {
	return e & bt;
}
function wt(e) {
	return (e - (e & bt)) / xt;
}
var Tt = 1, Et = 2, Dt = 4, Ot = 8, kt = class {
	constructor(e, t, n) {
		this.pos = e, this.delInfo = t, this.recover = n;
	}
	get deleted() {
		return (this.delInfo & Ot) > 0;
	}
	get deletedBefore() {
		return (this.delInfo & 5) > 0;
	}
	get deletedAfter() {
		return (this.delInfo & 6) > 0;
	}
	get deletedAcross() {
		return (this.delInfo & Dt) > 0;
	}
}, At = class e {
	constructor(t, n = !1) {
		if (this.ranges = t, this.inverted = n, !t.length && e.empty) return e.empty;
	}
	recover(e) {
		let t = 0, n = Ct(e);
		if (!this.inverted) for (let e = 0; e < n; e++) t += this.ranges[e * 3 + 2] - this.ranges[e * 3 + 1];
		return this.ranges[n * 3] + t + wt(e);
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
				let d = e == (t < 0 ? s : u) ? null : St(o / 3, e - s), f = 0;
				return c && (f |= e == s ? Et : e == u ? Tt : Dt, (t < 0 ? e != s : e != u) && (f |= Ot)), new kt(a, f, d);
			}
			r += l - c;
		}
		return n ? e + r : new kt(e + r, 0, null);
	}
	touches(e, t) {
		let n = 0, r = Ct(t), i = this.inverted ? 2 : 1, a = this.inverted ? 1 : 2;
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
At.empty = new At([]);
var jt = class e {
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
		for (let t = e.from, n = this._maps.length; t < e.to; t++) {
			let r = e.getMirror(t);
			r != null && (r = r < t && r >= e.from ? n + (r - e.from) : void 0), this.appendMap(e._maps[t], r);
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
		for (let t = e.to - 1, n = this._maps.length + e._maps.length; t >= e.from; t--) {
			let r = e.getMirror(t);
			r != null && (r = r > t && r < e.to ? n - (r - e.from) - 1 : void 0), this.appendMap(e._maps[t].invert(), r);
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
		return n ? e : new kt(e, r, null);
	}
}, Mt = Object.create(null), F = class {
	getMap() {
		return At.empty;
	}
	merge(e) {
		return null;
	}
	static fromJSON(e, t) {
		if (!t || !t.stepType) throw RangeError("Invalid input for Step.fromJSON");
		let n = Mt[t.stepType];
		if (!n) throw RangeError(`No step type ${t.stepType} defined`);
		return n.fromJSON(e, t);
	}
	static jsonID(e, t) {
		if (e in Mt) throw RangeError("Duplicate use of step JSON ID " + e);
		return Mt[e] = t, t.prototype.jsonID = e, t;
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
function Nt(e, t, n) {
	let r = [];
	for (let i = 0; i < e.childCount; i++) {
		let a = e.child(i);
		a.content.size && (a = a.copy(Nt(a.content, t, a))), a.isInline && (a = t(a, n, i)), r.push(a);
	}
	return M.fromArray(r);
}
var Pt = class e extends F {
	constructor(e, t, n) {
		super(), this.from = e, this.to = t, this.mark = n;
	}
	apply(e) {
		let t = e.slice(this.from, this.to), n = e.resolve(this.from), r = n.node(n.sharedDepth(this.to)), i = new P(Nt(t.content, (e, t) => !e.isAtom || !t.type.allowsMarkType(this.mark.type) ? e : e.mark(this.mark.addToSet(e.marks)), r), t.openStart, t.openEnd);
		return I.fromReplace(e, this.from, this.to, i);
	}
	invert(t) {
		let n = [];
		return t.nodesBetween(this.from, this.to, (t, r) => {
			if (t.isInline && t.isAtom) {
				let i = this.mark.addToSet(t.marks);
				if (!N.sameSet(i, t.marks)) {
					let a = Math.max(this.from, r), o = Math.min(this.to, r + t.nodeSize);
					It(Ft, a, o, this.mark, n);
					for (let r of t.marks) r.isInSet(i) || It(e, a, o, r, n);
				}
			}
		}), n.length == 1 ? n[0] : new Lt(n);
	}
	map(t) {
		let n = t.map(this.from, 1), r = t.map(this.to, -1);
		return n >= r ? null : new e(n, r, this.mark);
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
F.jsonID("addMark", Pt);
var Ft = class e extends F {
	constructor(e, t, n) {
		super(), this.from = e, this.to = t, this.mark = n;
	}
	apply(e) {
		let t = e.slice(this.from, this.to), n = new P(Nt(t.content, (e) => e.mark(this.mark.removeFromSet(e.marks)), e), t.openStart, t.openEnd);
		return I.fromReplace(e, this.from, this.to, n);
	}
	invert(e) {
		let t = [];
		return e.nodesBetween(this.from, this.to, (e, n) => {
			e.isInline && e.isAtom && this.mark.isInSet(e.marks) && It(Pt, Math.max(this.from, n), Math.min(this.to, n + e.nodeSize), this.mark, t);
		}), t.length == 1 ? t[0] : new Lt(t);
	}
	map(t) {
		let n = t.map(this.from, 1), r = t.map(this.to, -1);
		return n >= r ? null : new e(n, r, this.mark);
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
F.jsonID("removeMark", Ft);
function It(e, t, n, r, i) {
	let a = i.length ? i[i.length - 1] : null;
	a && a instanceof e && a.to == t && a.mark.eq(r) ? i[i.length - 1] = new e(a.from, n, r) : i.push(new e(t, n, r));
}
var Lt = class e extends F {
	constructor(e) {
		super(), this.steps = e;
	}
	apply(e) {
		for (let t of this.steps) {
			let n = t.apply(e);
			if (!n.doc) return n;
			e = n.doc;
		}
		return new I(e, null);
	}
	invert(t) {
		return new e(this.steps.map((e) => e.invert(t)));
	}
	map(t) {
		let n = [];
		for (let e of this.steps) {
			let r = e.map(t);
			r && n.push(r);
		}
		return n.length ? new e(n) : null;
	}
	toJSON() {
		return {
			stepType: "markSet",
			steps: this.steps.map((e) => e.toJSON())
		};
	}
	static fromJSON(t, n) {
		if (!Array.isArray(n.steps) || !n.steps.every((e) => e.stepType == "addMark" || e.stepType == "removeMark")) throw RangeError("Invalid JSON for MarkSetStep");
		return new e(n.steps.map((e) => F.fromJSON(t, e)));
	}
};
F.jsonID("markSet", Lt);
var Rt = class e extends F {
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
		return new zt(this.pos, this.mark);
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
F.jsonID("addNodeMark", Rt);
var zt = class e extends F {
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
		return !t || !this.mark.isInSet(t.marks) ? this : new Rt(this.pos, this.mark);
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
F.jsonID("removeNodeMark", zt);
var Bt = class e extends F {
	constructor(e, t, n, r = !1) {
		super(), this.from = e, this.to = t, this.slice = n, this.structure = r;
	}
	apply(e) {
		return this.structure && Ht(e, this.from, this.to) ? I.fail("Structure replace would overwrite content") : I.fromReplace(e, this.from, this.to, this.slice);
	}
	getMap() {
		return new At([
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
		}
		if (t.to == this.from && !this.slice.openStart && !t.slice.openEnd) {
			let n = this.slice.size + t.slice.size == 0 ? P.empty : new P(t.slice.content.append(this.slice.content), t.slice.openStart, this.slice.openEnd);
			return new e(t.from, this.to, n, this.structure);
		}
		return null;
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
Bt.MAP_BIAS = 1, F.jsonID("replace", Bt);
var Vt = class e extends F {
	constructor(e, t, n, r, i, a, o = !1) {
		super(), this.from = e, this.to = t, this.gapFrom = n, this.gapTo = r, this.slice = i, this.insert = a, this.structure = o;
	}
	apply(e) {
		if (this.structure && (Ht(e, this.from, this.gapFrom) || Ht(e, this.gapTo, this.to))) return I.fail("Structure gap-replace would overwrite content");
		let t = e.slice(this.gapFrom, this.gapTo);
		if (t.openStart || t.openEnd) return I.fail("Gap is not a flat range");
		let n = this.slice.insertAt(this.insert, t.content);
		return n ? I.fromReplace(e, this.from, this.to, n) : I.fail("Content does not fit in gap");
	}
	getMap() {
		return new At([
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
		return n.deletedAcross && r.deletedAcross || i < n.pos || a > r.pos || i > a ? null : new e(n.pos, r.pos, i, a, this.slice, this.insert, this.structure);
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
F.jsonID("replaceAround", Vt);
function Ht(e, t, n) {
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
function Ut(e, t, n, r) {
	let i = [];
	e.doc.nodesBetween(t, n, (e, a, o) => {
		if (!e.isInline) return;
		let s = e.marks;
		!r.isInSet(s) && o.type.allowsMarkType(r.type) && It(Pt, Math.max(a, t), Math.min(a + e.nodeSize, n), r, i);
	}), i.forEach((t) => e.step(t));
}
function Wt(e, t, n, r) {
	let i = [], a = 0;
	e.doc.nodesBetween(t, n, (e, o) => {
		if (!e.isInline || !e.isAtom) return;
		a++;
		let s = null;
		if (r instanceof Je) {
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
	}), i.forEach((t) => e.step(new Ft(t.from, t.to, t.style)));
}
function Gt(e, t, n, r = n.contentMatch, i = !0) {
	let a = e.doc.nodeAt(t), o = [], s = t + 1;
	for (let t = 0; t < a.childCount; t++) {
		let c = a.child(t), l = s + c.nodeSize, u = r.matchType(c.type);
		if (!u) o.push(new Bt(s, l, P.empty));
		else {
			r = u;
			for (let t = 0; t < c.marks.length; t++) n.allowsMarkType(c.marks[t].type) || e.step(new Ft(s, l, c.marks[t]));
			if (i && c.isText && n.whitespace != "pre") {
				let e, t = /\r?\n|\r/g, r;
				for (; e = t.exec(c.text);) r ||= new P(M.from(n.schema.text(" ", n.allowedMarks(c.marks))), 0, 0), o.push(new Bt(s + e.index, s + e.index + e[0].length, r));
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
function Kt(e, t, n) {
	return (t == 0 || e.canReplace(t, e.childCount)) && (n == e.childCount || e.canReplace(0, n));
}
function qt(e) {
	let t = e.parent.content.cutByIndex(e.startIndex, e.endIndex);
	for (let n = e.depth, r = 0, i = 0;; --n) {
		let a = e.$from.node(n), o = e.$from.index(n) + r, s = e.$to.indexAfter(n) - i;
		if (n < e.depth && a.canReplace(o, s, t)) return n;
		if (n == 0 || a.type.spec.isolating || !Kt(a, o, s)) break;
		o && (r = 1), s < a.childCount && (i = 1);
	}
	return null;
}
function Jt(e, t, n) {
	let { $from: r, $to: i, depth: a } = t, o = r.before(a + 1), s = i.after(a + 1), c = o, l = s, u = M.empty, d = 0;
	for (let e = a, t = !1; e > n; e--) t || r.index(e) > 0 ? (t = !0, u = M.from(r.node(e).copy(u)), d++) : c--;
	let f = M.empty, p = 0;
	for (let e = a, t = !1; e > n; e--) t || i.after(e + 1) < i.end(e) ? (t = !0, f = M.from(i.node(e).copy(f)), p++) : l++;
	e.step(new Vt(c, l, o, s, new P(u.append(f), d, p), u.size - d, !0));
}
function Yt(e, t, n = null, r = e) {
	let i = Zt(e, t), a = i && Qt(r, t);
	return a ? i.map(Xt).concat({
		type: t,
		attrs: n
	}).concat(a.map(Xt)) : null;
}
function Xt(e) {
	return {
		type: e,
		attrs: null
	};
}
function Zt(e, t) {
	let { parent: n, startIndex: r, endIndex: i } = e, a = n.contentMatchAt(r).findWrapping(t);
	if (!a) return null;
	let o = a.length ? a[0] : t;
	return n.canReplaceWith(r, i, o) ? a : null;
}
function Qt(e, t) {
	let { parent: n, startIndex: r, endIndex: i } = e, a = n.child(r), o = t.contentMatch.findWrapping(a.type);
	if (!o) return null;
	let s = (o.length ? o[o.length - 1] : t).contentMatch;
	for (let e = r; s && e < i; e++) s = s.matchType(n.child(e).type);
	return !s || !s.validEnd ? null : o;
}
function $t(e, t, n) {
	let r = M.empty;
	for (let e = n.length - 1; e >= 0; e--) {
		if (r.size) {
			let t = n[e].type.contentMatch.matchFragment(r);
			if (!t || !t.validEnd) throw RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
		}
		r = M.from(n[e].type.create(n[e].attrs, r));
	}
	let i = t.start, a = t.end;
	e.step(new Vt(i, a, i, a, new P(r, 0, 0), n.length, !0));
}
function en(e, t, n, r, i) {
	if (!r.isTextblock) throw RangeError("Type given to setBlockType should be a textblock");
	let a = e.steps.length;
	e.doc.nodesBetween(t, n, (t, n) => {
		let o = typeof i == "function" ? i(t) : i;
		if (t.isTextblock && !t.hasMarkup(r, o) && rn(e.doc, e.mapping.slice(a).map(n), r)) {
			let i = null;
			if (r.schema.linebreakReplacement) {
				let e = r.whitespace == "pre", t = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
				e && !t ? i = !1 : !e && t && (i = !0);
			}
			i === !1 && nn(e, t, n, a), Gt(e, e.mapping.slice(a).map(n, 1), r, void 0, i === null);
			let s = e.mapping.slice(a), c = s.map(n, 1), l = s.map(n + t.nodeSize, 1);
			return e.step(new Vt(c, l, c + 1, l - 1, new P(M.from(r.create(o, null, t.marks)), 0, 0), 1, !0)), i === !0 && tn(e, t, n, a), !1;
		}
	});
}
function tn(e, t, n, r) {
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
function nn(e, t, n, r) {
	t.forEach((i, a) => {
		if (i.type == i.type.schema.linebreakReplacement) {
			let i = e.mapping.slice(r).map(n + 1 + a);
			e.replaceWith(i, i + 1, t.type.schema.text("\n"));
		}
	});
}
function rn(e, t, n) {
	let r = e.resolve(t), i = r.index();
	return r.parent.canReplaceWith(i, i + 1, n);
}
function an(e, t, n, r, i) {
	let a = e.doc.nodeAt(t);
	if (!a) throw RangeError("No node at given position");
	n ||= a.type;
	let o = n.create(r, null, i || a.marks);
	if (a.isLeaf) return e.replaceWith(t, t + a.nodeSize, o);
	if (!n.validContent(a.content)) throw RangeError("Invalid content for node type " + n.name);
	e.step(new Vt(t, t + a.nodeSize, t + 1, t + a.nodeSize - 1, new P(M.from(o), 0, 0), 1, !0));
}
function on(e, t, n = 1, r) {
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
function sn(e, t, n = 1, r) {
	let i = e.doc.resolve(t), a = M.empty, o = M.empty;
	for (let e = i.depth, t = i.depth - n, s = n - 1; e > t; e--, s--) {
		a = M.from(i.node(e).copy(a));
		let t = r && r[s];
		o = M.from(t ? t.type.create(t.attrs, o) : i.node(e).copy(o));
	}
	e.step(new Bt(t, t, new P(a.append(o), n, n), !0));
}
function cn(e, t) {
	let n = e.resolve(t), r = n.index();
	return un(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function ln(e, t) {
	t.content.size || e.type.compatibleContent(t.type);
	let n = e.contentMatchAt(e.childCount), { linebreakReplacement: r } = e.type.schema;
	for (let i = 0; i < t.childCount; i++) {
		let a = t.child(i), o = a.type == r ? e.type.schema.nodes.text : a.type;
		if (n = n.matchType(o), !n || !e.type.allowsMarks(a.marks)) return !1;
	}
	return n.validEnd;
}
function un(e, t) {
	return !!(e && t && !e.isLeaf && ln(e, t));
}
function dn(e, t, n = -1) {
	let r = e.resolve(t);
	for (let e = r.depth;; e--) {
		let i, a, o = r.index(e);
		if (e == r.depth ? (i = r.nodeBefore, a = r.nodeAfter) : n > 0 ? (i = r.node(e + 1), o++, a = r.node(e).maybeChild(o)) : (i = r.node(e).maybeChild(o - 1), a = r.node(e + 1)), i && !i.isTextblock && un(i, a) && r.node(e).canReplace(o, o + 1)) return t;
		if (e == 0) break;
		t = n < 0 ? r.before(e) : r.after(e);
	}
}
function fn(e, t, n) {
	let r = null, { linebreakReplacement: i } = e.doc.type.schema, a = e.doc.resolve(t - n), o = a.node().type;
	if (i && o.inlineContent) {
		let e = o.whitespace == "pre", t = !!o.contentMatch.matchType(i);
		e && !t ? r = !1 : !e && t && (r = !0);
	}
	let s = e.steps.length;
	if (r === !1) {
		let r = e.doc.resolve(t + n);
		nn(e, r.node(), r.before(), s);
	}
	o.inlineContent && Gt(e, t + n - 1, o, a.node().contentMatchAt(a.index()), r == null);
	let c = e.mapping.slice(s), l = c.map(t - n);
	if (e.step(new Bt(l, c.map(t + n, -1), P.empty, !0)), r === !0) {
		let t = e.doc.resolve(l);
		tn(e, t.node(), t.before(), e.steps.length);
	}
	return e;
}
function pn(e, t, n) {
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
function mn(e, t, n) {
	let r = e.resolve(t);
	if (!n.content.size) return t;
	let i = n.content;
	for (let e = 0; e < n.openStart; e++) i = i.firstChild.content;
	for (let e = 1; e <= (n.openStart == 0 && n.size ? 2 : 1); e++) for (let t = r.depth; t >= 0; t--) {
		let n = t == r.depth ? 0 : r.pos <= (r.start(t + 1) + r.end(t + 1)) / 2 ? -1 : 1;
		for (let a = 0; a < 2; a++) {
			if (a) {
				if (!n) break;
				n = -n;
			}
			let o = r.index(t) + +(n > 0), s = r.node(t), c = !1;
			if (e == 1) c = s.canReplace(o, o, i);
			else {
				let e = s.contentMatchAt(o).findWrapping(i.firstChild.type);
				c = e && s.canReplaceWith(o, o, e[0]);
			}
			if (c) return n == 0 ? r.pos : n < 0 ? r.before(t + 1) : r.after(t + 1);
		}
	}
	return null;
}
function hn(e, t, n = t, r = P.empty) {
	if (t == n && !r.size) return null;
	let i = e.resolve(t), a = e.resolve(n);
	return gn(i, a, r) ? new Bt(t, n, r) : new _n(i, a, r).fit();
}
function gn(e, t, n) {
	return !n.openStart && !n.openEnd && e.start() == t.start() && e.parent.canReplace(e.index(), t.index(), n.content);
}
var _n = class {
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
		return e > -1 ? new Vt(n.pos, e, this.$to.pos, this.$to.end(), s, t) : s.size || n.pos != this.$to.pos ? new Bt(n.pos, r.pos, s) : null;
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
			n ? (r = bn(this.unplaced.content, n - 1).firstChild, e = r.content) : e = this.unplaced.content;
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
		let { content: e, openStart: t, openEnd: n } = this.unplaced;
		return Tn(e, -1) <= t ? !1 : (this.unplaced.size > 1 && Tn(e, 1) > n && n++, this.unplaced = new P(e, t + 1, n), !0);
	}
	dropNode() {
		let { content: e, openStart: t, openEnd: n } = this.unplaced, r = bn(e, t);
		if (r.childCount <= 1 && t > 0) {
			let i = e.size - t <= t + r.size;
			this.unplaced = new P(vn(e, t - 1, 1), t - 1, i ? t - 1 : n);
		} else this.unplaced = new P(vn(e, t, 1), t, n);
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
			c++, (c > 1 || s == 0 || e.content.size) && (u = t, l.push(xn(e.mark(d.allowedMarks(e.marks)), c == 1 ? s : 0, c == o.childCount ? f : -1)));
		}
		let p = c == o.childCount;
		p || (f = -1), this.placed = yn(this.placed, t, M.from(l)), this.frontier[t].match = u, p && f < 0 && n && n.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
		for (let e = 0, t = l[l.length - 1]; t && e < f; e++) this.frontier.push({
			type: t.type,
			match: t.contentMatchAt(t.childCount)
		}), t = t.lastChild;
		this.unplaced = p ? e == 0 ? P.empty : new P(vn(a.content, e - 1, 1), e - 1, f < 0 ? a.openEnd : e - 1) : new P(vn(a.content, e, c), e, a.openEnd);
	}
	mustMoveInline() {
		if (!this.$to.parent.isTextblock) return -1;
		let e = this.frontier[this.depth], t;
		if (!e.type.isTextblock || !Sn(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth) return -1;
		let { depth: n } = this.$to, r = this.$to.after(n);
		for (; n > 1 && r == this.$to.end(--n);) ++r;
		return r;
	}
	findCloseLevel(e) {
		scan: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
			let { match: n, type: r } = this.frontier[t], i = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), a = Sn(e, t, r, n, i);
			if (a) {
				for (let n = t - 1; n >= 0; n--) {
					let { match: t, type: r } = this.frontier[n], i = Sn(e, n, r, t, !0);
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
		t.fit.childCount && (this.placed = yn(this.placed, t.depth, t.fit)), e = t.move;
		for (let n = t.depth + 1; n <= e.depth; n++) {
			let t = e.node(n), r = t.type.contentMatch.fillBefore(t.content, !0, e.index(n));
			this.openFrontierNode(t.type, t.attrs, r);
		}
		return e;
	}
	openFrontierNode(e, t = null, n) {
		let r = this.frontier[this.depth];
		r.match = r.match.matchType(e), this.placed = yn(this.placed, this.depth, M.from(e.create(t, n))), this.frontier.push({
			type: e,
			match: e.contentMatch
		});
	}
	closeFrontierNode() {
		let e = this.frontier.pop().match.fillBefore(M.empty, !0);
		e.childCount && (this.placed = yn(this.placed, this.frontier.length, e));
	}
};
function vn(e, t, n) {
	return t == 0 ? e.cutByIndex(n, e.childCount) : e.replaceChild(0, e.firstChild.copy(vn(e.firstChild.content, t - 1, n)));
}
function yn(e, t, n) {
	return t == 0 ? e.append(n) : e.replaceChild(e.childCount - 1, e.lastChild.copy(yn(e.lastChild.content, t - 1, n)));
}
function bn(e, t) {
	for (let n = 0; n < t; n++) e = e.firstChild.content;
	return e;
}
function xn(e, t, n) {
	if (t <= 0) return e;
	let r = e.content;
	return t > 1 && (r = r.replaceChild(0, xn(r.firstChild, t - 1, r.childCount == 1 ? n - 1 : 0))), t > 0 && (r = e.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(e.type.contentMatch.matchFragment(r).fillBefore(M.empty, !0)))), e.copy(r);
}
function Sn(e, t, n, r, i) {
	let a = e.node(t), o = i ? e.indexAfter(t) : e.index(t);
	if (o == a.childCount && !n.compatibleContent(a.type)) return null;
	let s = r.fillBefore(a.content, !0, o);
	return s && !Cn(n, a.content, o) ? s : null;
}
function Cn(e, t, n) {
	for (let r = n; r < t.childCount; r++) if (!e.allowsMarks(t.child(r).marks)) return !0;
	return !1;
}
function wn(e) {
	return e.spec.defining || e.spec.definingForContent;
}
function Tn(e, t) {
	for (let n = 0;; n++) {
		let r = t < 0 ? e.firstChild : e.lastChild;
		if (!r || r.isAtom) return n;
		e = r.content;
	}
}
function En(e, t, n, r) {
	if (!r.size) return e.deleteRange(t, n);
	let i = e.doc.resolve(t), a = e.doc.resolve(n);
	if (gn(i, a, r)) return e.step(new Bt(t, n, r));
	let o = An(i, a);
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
		let t = l[e], n = wn(t.type);
		if (n && !t.sameMarkup(i.node(Math.abs(s) - 1))) u = e;
		else if (n || !t.type.isTextblock) break;
	}
	for (let t = r.openStart; t >= 0; t--) {
		let s = (t + u + 1) % (r.openStart + 1), d = l[s];
		if (d) for (let t = 0; t < o.length; t++) {
			let l = o[(t + c) % o.length], u = !0;
			l < 0 && (u = !1, l = -l);
			let f = i.node(l - 1), p = i.index(l - 1);
			if (f.canReplaceWith(p, p, d.type, d.marks)) return e.replace(i.before(l), u ? a.after(l) : n, new P(Dn(r.content, 0, r.openStart, s), s, r.openEnd));
		}
	}
	let d = e.steps.length;
	for (let s = o.length - 1; s >= 0 && (e.replace(t, n, r), !(e.steps.length > d)); s--) {
		let e = o[s];
		e < 0 || (t = i.before(e), n = a.after(e));
	}
}
function Dn(e, t, n, r, i) {
	if (t < n) {
		let i = e.firstChild;
		e = e.replaceChild(0, i.copy(Dn(i.content, t + 1, n, r, i)));
	}
	if (t > r) {
		let t = i.contentMatchAt(0), n = t.fillBefore(e).append(e);
		e = n.append(t.matchFragment(n).fillBefore(M.empty, !0));
	}
	return e;
}
function On(e, t, n, r) {
	if (!r.isInline && t == n && e.doc.resolve(t).parent.content.size) {
		let i = pn(e.doc, t, r.type);
		i != null && (t = n = i);
	}
	e.replaceRange(t, n, new P(M.from(r), 0, 0));
}
function kn(e, t, n) {
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
	let a = An(r, i);
	for (let t = 0; t < a.length; t++) {
		let n = a[t], o = t == a.length - 1;
		if (o && n == 0 || r.node(n).type.contentMatch.validEnd) return e.delete(r.start(n), i.end(n));
		if (n > 0 && (o || r.node(n - 1).canReplace(r.index(n - 1), i.indexAfter(n - 1)))) return e.delete(r.before(n), i.after(n));
	}
	for (let a = 1; a <= r.depth && a <= i.depth; a++) if (t - r.start(a) == r.depth - a && n > r.end(a) && i.end(a) - n != i.depth - a && r.start(a - 1) == i.start(a - 1) && r.node(a - 1).canReplace(r.index(a - 1), i.index(a - 1))) return e.delete(r.before(a), n);
	e.delete(t, n);
}
function An(e, t) {
	let n = [], r = Math.min(e.depth, t.depth);
	for (let i = r; i >= 0; i--) {
		let r = e.start(i);
		if (r < e.pos - (e.depth - i) || t.end(i) > t.pos + (t.depth - i) || e.node(i).type.spec.isolating || t.node(i).type.spec.isolating) break;
		(r == t.start(i) || i == e.depth && i == t.depth && e.parent.inlineContent && t.parent.inlineContent && i && t.start(i - 1) == r - 1) && n.push(i);
	}
	return n;
}
var jn = class e extends F {
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
		return At.empty;
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
F.jsonID("attr", jn);
var Mn = class e extends F {
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
		return At.empty;
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
F.jsonID("docAttr", Mn);
var Nn = class extends Error {};
Nn = function e(t) {
	let n = Error.call(this, t);
	return n.__proto__ = e.prototype, n;
}, Nn.prototype = Object.create(Error.prototype), Nn.prototype.constructor = Nn, Nn.prototype.name = "TransformError";
var Pn = class {
	constructor(e) {
		this.doc = e, this.steps = [], this.docs = [], this.mapping = new jt();
	}
	get before() {
		return this.docs.length ? this.docs[0] : this.doc;
	}
	step(e) {
		let t = this.maybeStep(e);
		if (t.failed) throw new Nn(t.failed);
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
		let r = hn(this.doc, e, t, n);
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
		return En(this, e, t, n), this;
	}
	replaceRangeWith(e, t, n) {
		return On(this, e, t, n), this;
	}
	deleteRange(e, t) {
		return kn(this, e, t), this;
	}
	lift(e, t) {
		return Jt(this, e, t), this;
	}
	join(e, t = 1) {
		return fn(this, e, t), this;
	}
	wrap(e, t) {
		return $t(this, e, t), this;
	}
	setBlockType(e, t = e, n, r = null) {
		return en(this, e, t, n, r), this;
	}
	setNodeMarkup(e, t, n = null, r) {
		return an(this, e, t, n, r), this;
	}
	setNodeAttribute(e, t, n) {
		return this.step(new jn(e, t, n)), this;
	}
	setDocAttribute(e, t) {
		return this.step(new Mn(e, t)), this;
	}
	addNodeMark(e, t) {
		return this.step(new Rt(e, t)), this;
	}
	removeNodeMark(e, t) {
		let n = this.doc.nodeAt(e);
		if (!n) throw RangeError("No node at position " + e);
		if (t instanceof N) t.isInSet(n.marks) && this.step(new zt(e, t));
		else {
			let r = n.marks, i, a = [];
			for (; i = t.isInSet(r);) a.push(new zt(e, i)), r = i.removeFromSet(r);
			for (let e = a.length - 1; e >= 0; e--) this.step(a[e]);
		}
		return this;
	}
	split(e, t = 1, n) {
		return sn(this, e, t, n), this;
	}
	addMark(e, t, n) {
		return Ut(this, e, t, n), this;
	}
	removeMark(e, t, n) {
		return Wt(this, e, t, n), this;
	}
	clearIncompatible(e, t, n) {
		return Gt(this, e, t, n), this;
	}
}, Fn = Object.create(null), L = class {
	constructor(e, t, n) {
		this.$anchor = e, this.$head = t, this.ranges = n || [new In(e.min(t), e.max(t))];
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
			e.replaceRange(l.map(s.pos), l.map(c.pos), o ? P.empty : t), o == 0 && Wn(e, i, (n ? n.isInline : r && r.isTextblock) ? -1 : 1);
		}
	}
	replaceWith(e, t) {
		let n = e.steps.length, r = this.ranges;
		for (let i = 0; i < r.length; i++) {
			let { $from: a, $to: o } = r[i], s = e.mapping.slice(n), c = s.map(a.pos), l = s.map(o.pos);
			i ? e.deleteRange(c, l) : (e.replaceRangeWith(c, l, t), Wn(e, n, t.isInline ? -1 : 1));
		}
	}
	static findFrom(e, t, n = !1) {
		let r = e.parent.inlineContent ? new R(e) : Un(e.node(0), e.parent, e.pos, e.index(), t, n);
		if (r) return r;
		for (let r = e.depth - 1; r >= 0; r--) {
			let i = t < 0 ? Un(e.node(0), e.node(r), e.before(r + 1), e.index(r), t, n) : Un(e.node(0), e.node(r), e.after(r + 1), e.index(r) + 1, t, n);
			if (i) return i;
		}
		return null;
	}
	static near(e, t = 1) {
		return this.findFrom(e, t) || this.findFrom(e, -t) || new Vn(e.node(0));
	}
	static atStart(e) {
		return Un(e, e, 0, 0, 1) || new Vn(e);
	}
	static atEnd(e) {
		return Un(e, e, e.content.size, e.childCount, -1) || new Vn(e);
	}
	static fromJSON(e, t) {
		if (!t || !t.type) throw RangeError("Invalid input for Selection.fromJSON");
		let n = Fn[t.type];
		if (!n) throw RangeError(`No selection type ${t.type} defined`);
		return n.fromJSON(e, t);
	}
	static jsonID(e, t) {
		if (e in Fn) throw RangeError("Duplicate use of selection JSON ID " + e);
		return Fn[e] = t, t.prototype.jsonID = e, t;
	}
	getBookmark() {
		return R.between(this.$anchor, this.$head).getBookmark();
	}
};
L.prototype.visible = !0;
var In = class {
	constructor(e, t) {
		this.$from = e, this.$to = t;
	}
}, Ln = !1;
function Rn(e) {
	!Ln && !e.parent.inlineContent && (Ln = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + e.parent.type.name + ")"));
}
var R = class e extends L {
	constructor(e, t = e) {
		Rn(e), Rn(t), super(e, t);
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
		return new zn(this.anchor, this.head);
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
var zn = class e {
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
		return new Bn(this.anchor);
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
var Bn = class e {
	constructor(e) {
		this.anchor = e;
	}
	map(t) {
		let { deleted: n, pos: r } = t.mapResult(this.anchor);
		return n ? new zn(r, r) : new e(r);
	}
	resolve(e) {
		let t = e.resolve(this.anchor), n = t.nodeAfter;
		return n && z.isSelectable(n) ? new z(t) : L.near(t);
	}
}, Vn = class e extends L {
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
		return Hn;
	}
};
L.jsonID("all", Vn);
var Hn = {
	map() {
		return this;
	},
	resolve(e) {
		return new Vn(e);
	}
};
function Un(e, t, n, r, i, a = !1) {
	if (t.inlineContent) return R.create(e, n);
	for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < t.childCount : o >= 0; o += i) {
		let r = t.child(o);
		if (!r.isAtom) {
			let t = Un(e, r, n + i, i < 0 ? r.childCount : 0, i, a);
			if (t) return t;
		} else if (!a && z.isSelectable(r)) return z.create(e, n - (i < 0 ? r.nodeSize : 0));
		n += r.nodeSize * i;
	}
	return null;
}
function Wn(e, t, n) {
	let r = e.steps.length - 1;
	if (r < t) return;
	let i = e.steps[r];
	if (!(i instanceof Bt || i instanceof Vt)) return;
	let a = e.mapping.maps[r], o;
	a.forEach((e, t, n, r) => {
		o ??= r;
	}), e.setSelection(L.near(e.doc.resolve(o), n));
}
var Gn = 1, Kn = 2, qn = 4, Jn = class extends Pn {
	constructor(e) {
		super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
	}
	get selection() {
		return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
	}
	setSelection(e) {
		if (e.$from.doc != this.doc) throw RangeError("Selection passed to setSelection must point at the current document");
		return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Gn) & -3, this.storedMarks = null, this;
	}
	get selectionSet() {
		return (this.updated & Gn) > 0;
	}
	setStoredMarks(e) {
		return this.storedMarks = e, this.updated |= Kn, this;
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
		return (this.updated & Kn) > 0;
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
		return this.updated |= qn, this;
	}
	get scrolledIntoView() {
		return (this.updated & qn) > 0;
	}
};
function Yn(e, t) {
	return !t || !e ? e : e.bind(t);
}
var Xn = class {
	constructor(e, t, n) {
		this.name = e, this.init = Yn(t.init, n), this.apply = Yn(t.apply, n);
	}
}, Zn = [
	new Xn("doc", {
		init(e) {
			return e.doc || e.schema.topNodeType.createAndFill();
		},
		apply(e) {
			return e.doc;
		}
	}),
	new Xn("selection", {
		init(e, t) {
			return e.selection || L.atStart(t.doc);
		},
		apply(e) {
			return e.selection;
		}
	}),
	new Xn("storedMarks", {
		init(e) {
			return e.storedMarks || null;
		},
		apply(e, t, n, r) {
			return r.selection.$cursor ? e.storedMarks : null;
		}
	}),
	new Xn("scrollToSelection", {
		init() {
			return 0;
		},
		apply(e, t) {
			return e.scrolledIntoView ? t + 1 : t;
		}
	})
], Qn = class {
	constructor(e, t) {
		this.schema = e, this.plugins = [], this.pluginsByKey = Object.create(null), this.fields = Zn.slice(), t && t.forEach((e) => {
			if (this.pluginsByKey[e.key]) throw RangeError("Adding different instances of a keyed plugin (" + e.key + ")");
			this.plugins.push(e), this.pluginsByKey[e.key] = e, e.spec.state && this.fields.push(new Xn(e.key, e.spec.state, e));
		});
	}
}, $n = class e {
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
		return new Jn(this);
	}
	static create(t) {
		let n = new Qn(t.doc ? t.doc.type.schema : t.schema, t.plugins), r = new e(n);
		for (let e = 0; e < n.fields.length; e++) r[n.fields[e].name] = n.fields[e].init(t, r);
		return r;
	}
	reconfigure(t) {
		let n = new Qn(this.schema, t.plugins), r = n.fields, i = new e(n);
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
		let i = new Qn(t.schema, t.plugins), a = new e(i);
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
function er(e, t, n) {
	for (let r in e) {
		let i = e[r];
		i instanceof Function ? i = i.bind(t) : r == "handleDOMEvents" && (i = er(i, t, {})), n[r] = i;
	}
	return n;
}
var B = class {
	constructor(e) {
		this.spec = e, this.props = {}, e.props && er(e.props, this, this.props), this.key = e.key ? e.key.key : nr("plugin");
	}
	getState(e) {
		return e[this.key];
	}
}, tr = Object.create(null);
function nr(e) {
	return e in tr ? e + "$" + ++tr[e] : (tr[e] = 0, e + "$");
}
var rr = class {
	constructor(e = "key") {
		this.key = nr(e);
	}
	get(e) {
		return e.config.pluginsByKey[this.key];
	}
	getState(e) {
		return e[this.key];
	}
}, ir = function(e) {
	for (var t = 0;; t++) if (e = e.previousSibling, !e) return t;
};
function ar(e) {
	let t = e.assignedSlot || e.parentNode;
	return t && t.nodeType == 11 ? t.host : t;
}
var or = null;
function sr(e, t, n) {
	let r = or ||= document.createRange();
	return r.setEnd(e, n ?? e.nodeValue.length), r.setStart(e, t || 0), r;
}
function cr() {
	or = null;
}
function lr(e, t, n, r) {
	return n && (dr(e, t, n, r, -1) || dr(e, t, n, r, 1));
}
var ur = /^(img|br|input|textarea|hr)$/i;
function dr(e, t, n, r, i) {
	for (;;) {
		if (e == n && t == r) return !0;
		if (t == (i < 0 ? 0 : V(e))) {
			let n = e.parentNode;
			if (!n || !H(n) || gr(e) || ur.test(e.nodeName) || e.contentEditable == "false") return !1;
			t = ir(e) + (i < 0 ? 0 : 1), e = n;
		} else if (H(e)) {
			let n = e.childNodes[t + (i < 0 ? -1 : 0)];
			if (H(n) && n.contentEditable == "false") {
				if (n.pmViewDesc?.ignoreForSelection) t += i;
				else return !1;
			} else if (gr(n) || ur.test(n.nodeName)) return !1;
			else e = n, t = i < 0 ? V(e) : 0;
		} else return !1;
	}
}
function V(e) {
	return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length;
}
function H(e) {
	return e.nodeType == 1;
}
function U(e) {
	return e.nodeType == 3;
}
function fr(e, t) {
	return t ? e.contains(H(t) ? t : t.parentNode) : !1;
}
function pr(e, t) {
	for (;;) {
		if (U(e) && t) return e;
		if (H(e) && t > 0) {
			if (e.contentEditable == "false") return null;
			e = e.childNodes[t - 1], t = V(e);
		} else if (e.parentNode && !gr(e, !0)) t = ir(e), e = e.parentNode;
		else return null;
	}
}
function mr(e, t) {
	for (;;) {
		if (U(e) && t < e.nodeValue.length) return e;
		if (H(e) && t < e.childNodes.length) {
			if (e.contentEditable == "false") return null;
			e = e.childNodes[t], t = 0;
		} else if (e.parentNode && !gr(e, !0)) t = ir(e) + 1, e = e.parentNode;
		else return null;
	}
}
function hr(e, t, n) {
	for (let r = t == 0, i = t == V(e); r || i;) {
		if (e == n) return !0;
		let t = ir(e);
		if (e = e.parentNode, !e) return !1;
		r &&= t == 0, i &&= t == V(e);
	}
}
function gr(e, t = !1) {
	let n;
	for (let t = e; t && !(n = t.pmViewDesc); t = t.parentNode);
	return n && n.node && (!t || n.node.isBlock) && (n.dom == e || n.contentDOM == e);
}
function _r(e) {
	return e.focusNode && lr(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset);
}
function vr(e, t) {
	e.collapse(t.anchorNode, t.anchorOffset), (t.focusNode != t.anchorNode || t.focusOffset != t.anchorOffset) && e.extend(t.focusNode, t.focusOffset);
}
function yr(e, t) {
	let n = document.createEvent("Event");
	return n.initEvent("keydown", !0, !0), n.keyCode = e, n.key = n.code = t, n;
}
function br(e) {
	let t = e.activeElement;
	for (; t && t.shadowRoot;) t = t.shadowRoot.activeElement;
	return t;
}
function xr(e, t, n) {
	if (e.caretPositionFromPoint) try {
		let r = e.caretPositionFromPoint(t, n);
		if (r) return {
			node: r.offsetNode,
			offset: Math.min(V(r.offsetNode), r.offset)
		};
	} catch {}
	if (e.caretRangeFromPoint) {
		let r = e.caretRangeFromPoint(t, n);
		if (r) return {
			node: r.startContainer,
			offset: Math.min(V(r.startContainer), r.startOffset)
		};
	}
}
var Sr = typeof navigator < "u" ? navigator : null, Cr = typeof document < "u" ? document : null, wr = Sr && Sr.userAgent || "", Tr = /gecko\/(\d+)/i.test(wr) && !/edge?\//i.test(wr);
Tr && +(/Firefox\/(\d+)/.exec(wr) || [0, 0])[1];
var Er = /Chrome\/(\d+)/.exec(wr), Dr = !!Er, Or = Er ? +Er[1] : 0, kr = !!Sr && /Apple Computer/.test(Sr.vendor), Ar = kr && (/Mobile\/\w+/.test(wr) || !!Sr && Sr.maxTouchPoints > 2), jr = Ar || (Sr ? /Mac/.test(Sr.platform) : !1), Mr = Sr ? /Win/.test(Sr.platform) : !1, Nr = /Android \d/.test(wr), Pr = !!Cr && "webkitFontSmoothing" in Cr.documentElement.style, Fr = Pr ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Ir(e) {
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
function Lr(e, t) {
	return typeof e == "number" ? e : e[t];
}
function Rr(e) {
	let t = e.getBoundingClientRect(), n = t.width / e.offsetWidth || 1, r = t.height / e.offsetHeight || 1;
	return {
		left: t.left,
		right: t.left + e.clientWidth * n,
		top: t.top,
		bottom: t.top + e.clientHeight * r
	};
}
function zr(e, t, n) {
	if (!ei(t) && t.left == 0) return;
	let r = e.someProp("scrollThreshold") || 0, i = e.someProp("scrollMargin") || 5, a = e.dom.ownerDocument;
	for (let o = n || e.dom; o;) {
		if (!H(o)) {
			o = ar(o);
			continue;
		}
		let e = o == a.body, n = e ? Ir(a) : Rr(o), s = 0, c = 0;
		if (t.top < n.top + Lr(r, "top") ? c = -(n.top - t.top + Lr(i, "top")) : t.bottom > n.bottom - Lr(r, "bottom") && (c = t.bottom - t.top > n.bottom - n.top ? t.top + Lr(i, "top") - n.top : t.bottom - n.bottom + Lr(i, "bottom")), t.left < n.left + Lr(r, "left") ? s = -(n.left - t.left + Lr(i, "left")) : t.right > n.right - Lr(r, "right") && (s = t.right - n.right + Lr(i, "right")), s || c) {
			if (e) a.defaultView.scrollBy(s, c);
			else {
				let e = o.scrollLeft, n = o.scrollTop;
				c && (o.scrollTop += c), s && (o.scrollLeft += s);
				let r = o.scrollLeft - e, i = o.scrollTop - n;
				t = {
					left: t.left - r,
					top: t.top - i,
					right: t.right - r,
					bottom: t.bottom - i
				};
			}
		}
		let l = e ? "fixed" : getComputedStyle(o).position;
		if (/^(fixed|sticky)$/.test(l)) break;
		o = l == "absolute" ? o.offsetParent : ar(o);
	}
}
function Br(e) {
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
		stack: Vr(e.dom)
	};
}
function Vr(e) {
	let t = [], n = e.ownerDocument;
	for (let r = e; r && (t.push({
		dom: r,
		top: r.scrollTop,
		left: r.scrollLeft
	}), e != n); r = ar(r));
	return t;
}
function Hr({ refDOM: e, refTop: t, stack: n }) {
	let r = e ? e.getBoundingClientRect().top : 0;
	Ur(n, r == 0 ? 0 : r - t);
}
function Ur(e, t) {
	for (let n = 0; n < e.length; n++) {
		let { dom: r, top: i, left: a } = e[n];
		r.scrollTop != i + t && (r.scrollTop = i + t), r.scrollLeft != a && (r.scrollLeft = a);
	}
}
var Wr = null;
function Gr(e) {
	if (e.setActive) return e.setActive();
	if (Wr) return e.focus(Wr);
	let t = Vr(e);
	e.focus(Wr == null ? { get preventScroll() {
		return Wr = { preventScroll: !0 }, !0;
	} } : void 0), Wr || (Wr = !1, Ur(t, 0));
}
function Kr(e, t) {
	let n, r = 2e8, i, a = 0, o = t.top, s = t.top, c, l;
	for (let u = e.firstChild, d = 0; u; u = u.nextSibling, d++) {
		let e;
		if (H(u)) e = u.getClientRects();
		else if (U(u)) e = sr(u).getClientRects();
		else continue;
		for (let f = 0; f < e.length; f++) {
			let p = e[f];
			if (p.top <= o && p.bottom >= s) {
				o = Math.max(p.bottom, o), s = Math.min(p.top, s);
				let e = p.left > t.left ? p.left - t.left : p.right < t.left ? t.left - p.right : 0;
				if (e < r) {
					n = u, r = e, i = e && U(n) ? {
						left: p.right < t.left ? p.right : p.left,
						top: t.top
					} : t, H(u) && e && (a = d + +(t.left >= (p.left + p.right) / 2));
					continue;
				}
			} else p.top > t.top && !c && p.left <= t.left && p.right >= t.left && (c = u, l = {
				left: Math.max(p.left, Math.min(p.right, t.left)),
				top: p.top
			});
			!n && (t.left >= p.right && t.top >= p.top || t.left >= p.left && t.top >= p.bottom) && (a = d + 1);
		}
	}
	return !n && c && (n = c, i = l, r = 0), n && U(n) ? qr(n, i) : !n || r ? {
		node: e,
		offset: a
	} : Kr(n, i);
}
function qr(e, t) {
	let n = e.nodeValue.length, r = document.createRange(), i;
	for (let a = 0; a < n; a++) {
		r.setEnd(e, a + 1), r.setStart(e, a);
		let n = ti(r, 1);
		if (n.top != n.bottom && Jr(t, n)) {
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
function Jr(e, t) {
	return e.left >= t.left - 1 && e.left <= t.right + 1 && e.top >= t.top - 1 && e.top <= t.bottom + 1;
}
function Yr(e, t) {
	let n = e.parentNode;
	return n && /^li$/i.test(n.nodeName) && t.left < e.getBoundingClientRect().left ? n : e;
}
function Xr(e, t, n) {
	let { node: r, offset: i } = Kr(t, n), a = -1;
	if (H(r) && !r.firstChild) {
		let e = r.getBoundingClientRect();
		a = e.left != e.right && n.left > (e.left + e.right) / 2 ? 1 : -1;
	}
	return e.docView.posFromDOM(r, i, a);
}
function Zr(e, t, n, r) {
	let i = -1;
	for (let n = t, a = !1; n != e.dom;) {
		let t = e.docView.nearestDesc(n, !0), o;
		if (!t) return null;
		if (H(t.dom) && (t.node.isBlock && t.parent || !t.contentDOM) && ((o = t.dom.getBoundingClientRect()).width || o.height) && (t.node.isBlock && t.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(t.dom.nodeName) && (!a && o.left > r.left || o.top > r.top ? i = t.posBefore : (!a && o.right < r.left || o.bottom < r.top) && (i = t.posAfter), a = !0), !t.contentDOM && i < 0 && !t.node.isText)) return (t.node.isBlock ? r.top < (o.top + o.bottom) / 2 : r.left < (o.left + o.right) / 2) ? t.posBefore : t.posAfter;
		n = t.dom.parentNode;
	}
	return i > -1 ? i : e.docView.posFromDOM(t, n, -1);
}
function Qr(e, t, n) {
	let r = e.childNodes.length;
	if (r && n.top < n.bottom) for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (t.top - n.top) / (n.bottom - n.top)) - 2)), a = i;;) {
		let n = e.childNodes[a];
		if (H(n)) {
			let e = n.getClientRects();
			for (let r = 0; r < e.length; r++) {
				let i = e[r];
				if (Jr(t, i)) return Qr(n, t, i);
			}
		}
		if ((a = (a + 1) % r) == i) break;
	}
	return e;
}
function $r(e, t) {
	let n = e.dom.ownerDocument, r, i = 0, a = xr(n, t.left, t.top);
	a && ({node: r, offset: i} = a);
	let o = (e.root.elementFromPoint ? e.root : n).elementFromPoint(t.left, t.top), s;
	if (!o || !e.dom.contains(o)) {
		let n = e.dom.getBoundingClientRect();
		if (!Jr(t, n) || (o = Qr(e.dom, t, n), !o)) return null;
	}
	if (kr) for (let e = o; r && e; e = ar(e)) e.draggable && (r = void 0);
	if (o = Yr(o, t), r) {
		if (Tr && H(r) && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
			let e = r.childNodes[i], n;
			e.nodeName == "IMG" && (n = e.getBoundingClientRect()).right <= t.left && n.bottom > t.top && i++;
		}
		let n;
		Pr && i && H(r) && H(n = r.childNodes[i - 1]) && n.contentEditable == "false" && n.getBoundingClientRect().top >= t.top && i--, r == e.dom && i == r.childNodes.length - 1 && H(r.lastChild) && t.top > r.lastChild.getBoundingClientRect().bottom ? s = e.state.doc.content.size : i != 0 && H(r) && r.childNodes[i - 1].nodeName == "BR" || (s = Zr(e, r, i, t));
	}
	s ??= Xr(e, o, t);
	let c = e.docView.nearestDesc(o, !0);
	return {
		pos: s,
		inside: c ? c.posAtStart - c.border : -1
	};
}
function ei(e) {
	return e.top < e.bottom || e.left < e.right;
}
function ti(e, t) {
	let n = e.getClientRects();
	if (n.length) {
		let e = n[t < 0 ? 0 : n.length - 1];
		if (ei(e)) return e;
	}
	return Array.prototype.find.call(n, ei) || e.getBoundingClientRect();
}
var ni = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function ri(e, t, n) {
	let { node: r, offset: i, atom: a } = e.docView.domFromPos(t, n < 0 ? -1 : 1), o = Pr || Tr;
	if (U(r)) {
		if (o && (ni.test(r.nodeValue) || (n < 0 ? !i : i == r.nodeValue.length))) {
			let e = ti(sr(r, i, i), n);
			if (Tr && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
				let t = ti(sr(r, i - 1, i - 1), -1);
				if (t.top == e.top) {
					let n = ti(sr(r, i, i + 1), -1);
					if (n.top != e.top) return ii(n, n.left < t.left);
				}
			}
			return e;
		}
		{
			let e = i, t = i, a = n < 0 ? 1 : -1;
			return n < 0 && !i ? (t++, a = -1) : n >= 0 && i == r.nodeValue.length ? (e--, a = 1) : n < 0 ? e-- : t++, ii(ti(sr(r, e, t), a), a < 0);
		}
	}
	if (!e.state.doc.resolve(t - (a || 0)).parent.inlineContent) {
		if (a == null && i && (n < 0 || i == V(r))) {
			let e = r.childNodes[i - 1];
			if (H(e)) return ai(e.getBoundingClientRect(), !1);
		}
		if (a == null && i < V(r)) {
			let e = r.childNodes[i];
			if (H(e)) return ai(e.getBoundingClientRect(), !0);
		}
		return ai(r.getBoundingClientRect(), n >= 0);
	}
	if (a == null && i && (n < 0 || i == V(r))) {
		let e = r.childNodes[i - 1], t = U(e) ? sr(e, V(e) - +!o) : H(e) && (e.nodeName != "BR" || !e.nextSibling) ? e : null;
		if (t) return ii(ti(t, 1), !1);
	}
	if (a == null && i < V(r)) {
		let e = r.childNodes[i];
		for (; e.pmViewDesc && e.pmViewDesc.ignoreForCoords;) e = e.nextSibling;
		let t = e ? U(e) ? sr(e, 0, +!o) : H(e) ? e : null : null;
		if (t) return ii(ti(t, -1), !0);
	}
	return ii(ti(U(r) ? sr(r) : r, -n), n >= 0);
}
function ii(e, t) {
	if (e.width == 0) return e;
	let n = t ? e.left : e.right;
	return {
		top: e.top,
		bottom: e.bottom,
		left: n,
		right: n
	};
}
function ai(e, t) {
	if (e.height == 0) return e;
	let n = t ? e.top : e.bottom;
	return {
		top: n,
		bottom: n,
		left: e.left,
		right: e.right
	};
}
function oi(e, t, n) {
	let r = e.state, i = e.root.activeElement;
	r != t && e.updateState(t), i != e.dom && e.focus();
	try {
		return n();
	} finally {
		r != t && e.updateState(r), i != e.dom && i && i.focus();
	}
}
function si(e, t, n) {
	let r = t.selection, i = n == "up" ? r.$from : r.$to;
	return oi(e, t, () => {
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
		let r = ri(e, i.pos, 1);
		for (let e = t.firstChild; e; e = e.nextSibling) {
			let t;
			if (H(e)) t = e.getClientRects();
			else if (U(e)) t = sr(e, 0, e.nodeValue.length).getClientRects();
			else continue;
			for (let e = 0; e < t.length; e++) {
				let i = t[e];
				if (i.bottom > i.top + 1 && (n == "up" ? r.top - i.top > (i.bottom - r.top) * 2 : i.bottom - r.bottom > (r.bottom - i.top) * 2)) return !1;
			}
		}
		return !0;
	});
}
var ci = /[\u0590-\u08ac]/;
function li(e, t, n) {
	let { $head: r } = t.selection;
	if (!r.parent.isTextblock) return !1;
	let i = r.parentOffset, a = !i, o = i == r.parent.content.size, s = e.domSelection();
	return s ? !ci.test(r.parent.textContent) || !s.modify ? n == "left" || n == "backward" ? a : o : oi(e, t, () => {
		let t = e.domSel.readRange(), i = s.caretBidiLevel;
		s.modify("move", n, "character");
		let a = r.depth ? e.docView.domAfterPos(r.before()) : e.dom, { focusNode: o, focusOffset: c } = e.domSel.readRange(), l = o && !fr(a, o) || t.focusNode == o && t.focusOffset == c;
		return vr(s, t), i != null && (s.caretBidiLevel = i), l;
	}) : r.pos == r.start() || r.pos == r.end();
}
var ui = null, di = null, fi = !1;
function pi(e, t, n) {
	return ui == t && di == n ? fi : (ui = t, di = n, fi = n == "up" || n == "down" ? si(e, t, n) : li(e, t, n));
}
var mi = class {
	constructor(e, t, n, r) {
		this.parent = e, this.children = t, this.dom = n, this.contentDOM = r, this.damage = 0, n.pmViewDesc = this;
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
	parseRule(e) {
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
		if (this.contentDOM && fr(this.contentDOM, e)) {
			if (n < 0) {
				let n, r;
				if (e == this.contentDOM) n = e.childNodes[t - 1];
				else {
					for (; e.parentNode != this.contentDOM;) e = e.parentNode;
					n = e.previousSibling;
				}
				for (; n && !((r = n.pmViewDesc) && r.parent == this);) n = n.previousSibling;
				return n ? this.posBeforeChild(r) + r.size : this.posAtStart;
			}
			{
				let n, r;
				if (e == this.contentDOM) n = e.childNodes[t];
				else {
					for (; e.parentNode != this.contentDOM;) e = e.parentNode;
					n = e.nextSibling;
				}
				for (; n && !((r = n.pmViewDesc) && r.parent == this);) n = n.nextSibling;
				return n ? this.posBeforeChild(r) : this.posAtEnd;
			}
		}
		let r;
		if (e == this.dom && this.contentDOM) r = t > ir(this.contentDOM);
		else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) {
			let n = e.compareDocumentPosition(this.contentDOM);
			r = n & 16 ? t > Array.from(e.childNodes).findIndex((e) => e.contains(this.contentDOM)) : !(n & 4);
		} else if (this.dom.firstChild) {
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
			if (i && (!t || i.node)) {
				if (n && (a = i.nodeDOM) && !(H(a) ? fr(a, e) : a == e)) n = !1;
				else return i;
			}
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
			if (a > e) {
				r = e - t;
				break;
			}
			t = a;
		}
		if (r) return this.children[n].domFromPos(r - this.children[n].border, t);
		for (; n > 0; n--) {
			let e = this.children[n - 1];
			if (e.size || !(e instanceof xi || e instanceof hi && e.side >= 0)) break;
		}
		if (t <= 0) {
			let e, r = !0;
			for (; e = n ? this.children[n - 1] : null, e && e.dom.parentNode != this.contentDOM; n--, r = !1);
			return e && t && r && !e.border && !e.domAtom ? e.domFromPos(e.size, t) : {
				node: this.contentDOM,
				offset: e ? ir(e.dom) + 1 : 0
			};
		}
		{
			let e, r = !0;
			for (; e = n < this.children.length ? this.children[n] : null, e && e.dom.parentNode != this.contentDOM; n++, r = !1);
			return e && r && !e.border && !e.domAtom ? e.domFromPos(0, t) : {
				node: this.contentDOM,
				offset: e ? ir(e.dom) : this.contentDOM.childNodes.length
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
						r = ir(n.dom) + 1;
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
						i = ir(n.dom);
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
		if (!H(t) || n == t.childNodes.length) throw RangeError("No node after pos " + e);
		return t.childNodes[n];
	}
	ignoreMutation(e) {
		return !this.contentDOM && e.type != "selection";
	}
	get contentLost() {
		return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
	}
	markDamage(e) {
		e && (this.damage |= e, this.markParentDamage());
	}
	markParentDamage() {
		for (let e = this;;) {
			let { parent: t } = e;
			if (!t || t.damage & 1) break;
			t.damage |= 1, e = t;
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
}, hi = class extends mi {
	constructor(e, t, n, r) {
		let i, a = t.type.toDOM;
		if (typeof a == "function" && (a = a(n, () => {
			if (!i) return r;
			if (i.parent) return i.parent.posBeforeChild(i);
		})), !t.type.spec.raw) {
			let e = H(a) ? a : document.createElement("span");
			e != a && (e.appendChild(a), a = e), e.hasAttribute("contenteditable") || (e.contentEditable = "false"), e.classList.add("ProseMirror-widget");
		}
		super(e, [], a, null), this.widget = t, this.widget = t, i = this;
	}
	matchesWidget(e) {
		return !this.damage && e.type.eq(this.widget.type);
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
}, gi = class extends mi {
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
}, _i = class e extends mi {
	constructor(e, t, n, r, i) {
		super(e, [], n, r), this.mark = t, this.spec = i;
	}
	static create(t, n, r, i) {
		let a = i.nodeViews[n.type.name], o = a && a(n, i, r);
		return o && o.dom || (o = pt.renderSpec(document, n.type.spec.toDOM(n, r), null, n.attrs)), new e(t, n, o.dom, o.contentDOM || o.dom, o);
	}
	parseRule() {
		return this.damage & 4 || this.mark.type.spec.reparseInView ? null : {
			mark: this.mark.type.name,
			attrs: this.mark.attrs,
			contentElement: this.contentDOM
		};
	}
	matchesMark(e) {
		return !(this.damage & 4) && this.mark.eq(e);
	}
	markDamage(e) {
		var t;
		this.damage |= e, (t = this.parent) == null || t.markDamage(2);
	}
	slice(t, n, r) {
		let i = e.create(this.parent, this.mark, !0, r), a = this.children, o = this.size;
		n < o && (a = Ri(a, n, o, r)), t > 0 && (a = Ri(a, 0, t, r));
		for (let e = 0; e < a.length; e++) a[e].parent = i;
		return i.children = a, i;
	}
	ignoreMutation(e) {
		return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
	}
	destroy() {
		this.spec.destroy && this.spec.destroy(), super.destroy();
	}
}, vi = class e extends mi {
	constructor(e, t, n, r, i, a, o) {
		super(e, [], i, a), this.node = t, this.outerDeco = n, this.innerDeco = r, this.nodeDOM = o;
	}
	static create(t, n, r, i, a, o) {
		let s = a.nodeViews[n.type.name], c, l = s && s(n, a, () => {
			if (!c) return o;
			if (c.parent) return c.parent.posBeforeChild(c);
		}, r, i), u = l && l.dom, d = l && l.contentDOM;
		if (n.isText) {
			if (!u) u = document.createTextNode(n.text);
			else if (!U(u)) throw RangeError("Text must be rendered as a DOM text node");
		} else if (!u) {
			let e = pt.renderSpec(document, n.type.spec.toDOM(n), null, n.attrs);
			({dom: u, contentDOM: d} = e);
		}
		!d && !n.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), n.type.spec.draggable && (u.draggable = !0));
		let f = u;
		return u = ki(u, r, n), l ? c = new Si(t, n, r, i, u, d || null, f, l) : n.isText ? new bi(t, n, r, i, u, f) : new e(t, n, r, i, u, d || null, f);
	}
	parseRule(e) {
		if (this.node.type.spec.reparseInView) return null;
		let t = {
			node: this.node.type.name,
			attrs: this.node.attrs
		};
		if (this.node.type.whitespace == "pre" && (t.preserveWhitespace = "full"), !this.contentDOM) t.getContent = () => this.node.content;
		else if (!this.contentLost) t.contentElement = this.contentDOM;
		else {
			for (let e = this.children.length - 1; e >= 0; e--) {
				let n = this.children[e];
				if (this.dom.contains(n.dom.parentNode)) {
					t.contentElement = n.dom.parentNode;
					break;
				}
			}
			if (!t.contentElement) {
				let n = e && e.find((t) => H(t) && e.indexOf(t.parentNode) < 0 && this.dom.contains(t));
				n ? t.contentElement = n : t.getContent = () => M.empty;
			}
		}
		return t;
	}
	matchesNode(e, t, n) {
		return !this.damage && e.eq(this.node) && Ai(t, this.outerDeco) && n.eq(this.innerDeco);
	}
	get size() {
		return this.node.nodeSize;
	}
	get border() {
		return +!this.node.isLeaf;
	}
	updateChildren(e, t) {
		let n = this.node.inlineContent, r = t, i = e.composing ? this.localCompositionInfo(e, t) : null, a = i && i.pos > -1 ? i : null, o = i && i.pos < 0, s = new Mi(this, a && a.node, e), c = this.node.inlineContent, l = c && this.node.isBlock;
		Fi(this.node, this.innerDeco, (t, i, a) => {
			t.spec.marks ? s.syncToMarks(t.spec.marks, n, e, i) : t.type.side >= 0 && !a && s.syncToMarks(i == this.node.childCount ? N.none : this.node.child(i).marks, n, e, i), s.placeWidget(t, e, r);
		}, (t, a, u, d) => {
			s.syncToMarks(t.marks, n, e, d), l && t.isAtom && !t.isText && s.addHackNode("IMG", s.top);
			let f;
			s.findNodeMatch(t, a, u, d) || o && e.state.selection.from > r && e.state.selection.to < r + t.nodeSize && (f = s.findIndexWithChild(i.node)) > -1 && s.updateNodeAt(t, a, u, f, e, r) || s.updateNextNode(t, a, u, e, d, r) || s.addNode(t, a, u, e, r), r += t.nodeSize, c && (l = t.isAtom && !t.isText);
		}), s.syncToMarks([], n, e, 0), this.node.isTextblock && s.addTextblockHacks(), s.destroyRest(), (s.changed || this.damage & 2) && (a && this.protectLocalComposition(e, a), Ci(this.contentDOM, this.children, e), Ar && Ii(this.dom));
	}
	localCompositionInfo(e, t) {
		let { from: n, to: r } = e.state.selection;
		if (!(e.state.selection instanceof R) || n < t || r > t + this.node.content.size) return null;
		let i = e.input.compositionNode;
		if (!i || !this.dom.contains(i.parentNode)) return null;
		if (this.node.inlineContent) {
			let e = i.nodeValue, a = Li(this.node.content, e, n - t, r - t);
			return a < 0 ? null : {
				node: i,
				pos: a,
				text: e
			};
		}
		return {
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
			i.pmViewDesc && (i.pmViewDesc = void 0);
		}
		let a = new gi(this, i, t, r);
		e.input.compositionNodes.push(a), this.children = Ri(this.children, n, n + r.length, e, a);
	}
	update(e, t, n, r, i) {
		return this.damage & 4 || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, n, r, i), !0);
	}
	updateInner(e, t, n, r, i) {
		this.updateOuterDeco(t), this.node = e, this.innerDeco = n, this.contentDOM && this.updateChildren(r, i + 1), this.damage = 0;
	}
	updateOuterDeco(e) {
		if (Ai(e, this.outerDeco)) return;
		let t = !H(this.nodeDOM), n = this.dom;
		this.dom = Di(this.dom, this.nodeDOM, Ei(this.outerDeco, this.node, t), Ei(e, this.node, t)), this.dom != n && (n.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
	}
	selectNode() {
		H(this.nodeDOM) && (this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.nodeDOM.draggable = !0));
	}
	deselectNode() {
		H(this.nodeDOM) && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.nodeDOM.removeAttribute("draggable"));
	}
	get domAtom() {
		return this.node.isAtom;
	}
};
function yi(e, t, n, r, i, a) {
	a ? Di(r, r, Ei(a, e, !1), Ei(t, e, !1)) : ki(r, t, e);
	let o = new vi(void 0, e, t, n, r, r, r);
	return o.contentDOM && o.updateChildren(i, 0), o;
}
var bi = class e extends vi {
	constructor(e, t, n, r, i, a) {
		super(e, t, n, r, i, null, a);
	}
	parseRule() {
		let e = this.nodeDOM.parentNode;
		for (; e && e != this.dom && !e.pmIsDeco;) e = e.parentNode;
		return { skip: e || !0 };
	}
	update(e, t, n, r) {
		return this.damage & 4 || this.damage && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.damage & 8 || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, r.trackWrites == this.nodeDOM && (r.trackWrites = null)), this.node = e, this.damage = 0, !0);
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
		return !1;
	}
	slice(t, n, r) {
		let i = this.node.cut(t, n), a = document.createTextNode(i.text);
		return new e(this.parent, i, this.outerDeco, this.innerDeco, a, a);
	}
	get domAtom() {
		return !1;
	}
	isText(e) {
		return this.node.text == e;
	}
}, xi = class extends mi {
	parseRule() {
		return { ignore: !0 };
	}
	matchesHack(e) {
		return !this.damage && this.dom.nodeName == e;
	}
	get domAtom() {
		return !0;
	}
	get ignoreForCoords() {
		return this.dom.nodeName == "IMG";
	}
}, Si = class extends vi {
	constructor(e, t, n, r, i, a, o, s) {
		super(e, t, n, r, i, a, o), this.spec = s;
	}
	update(e, t, n, r, i) {
		if (this.damage & 4) return !1;
		if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
			let a = this.spec.update(e, t, n);
			return a && this.updateInner(e, t, n, r, i), a;
		}
		return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, n, r, i);
	}
	selectNode() {
		this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
	}
	deselectNode() {
		this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
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
function Ci(e, t, n) {
	let r = e.firstChild, i = !1;
	for (let a = 0; a < t.length; a++) {
		let o = t[a], s = o.dom;
		if (s.parentNode == e) {
			for (; s != r;) r = ji(r), i = !0;
			r = r.nextSibling;
		} else i = !0, e.insertBefore(s, r);
		if (o instanceof _i) {
			let t = r ? r.previousSibling : e.lastChild;
			Ci(o.contentDOM, o.children, n), r = t ? t.nextSibling : e.firstChild;
		}
	}
	for (; r;) r = ji(r), i = !0;
	i && n.trackWrites == e && (n.trackWrites = null);
}
var wi = function(e) {
	e && (this.nodeName = e);
};
wi.prototype = Object.create(null);
var Ti = [new wi()];
function Ei(e, t, n) {
	if (e.length == 0) return Ti;
	let r = n ? Ti[0] : new wi(), i = [r];
	for (let a = 0; a < e.length; a++) {
		let o = e[a].type.attrs;
		if (o) {
			o.nodeName && i.push(r = new wi(o.nodeName));
			for (let e in o) {
				let a = o[e];
				a != null && (n && i.length == 1 && i.push(r = new wi(t.isInline ? "span" : "div")), e == "class" ? r.class = (r.class ? r.class + " " : "") + a : e == "style" ? r.style = (r.style ? r.style + ";" : "") + a : e != "nodeName" && (r[e] = a));
			}
		}
	}
	return i;
}
function Di(e, t, n, r) {
	if (n == Ti && r == Ti) return t;
	let i = t;
	for (let t = 0; t < r.length; t++) {
		let a = r[t], o = n[t];
		if (t) {
			let t;
			o && o.nodeName == a.nodeName && i != e && (t = i.parentNode) && t.nodeName.toLowerCase() == a.nodeName || (t = document.createElement(a.nodeName), t.pmIsDeco = !0, t.appendChild(i), o = Ti[0]), i = t;
		}
		Oi(i, o || Ti[0], a);
	}
	return i;
}
function Oi(e, t, n) {
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
function ki(e, t, n) {
	return Di(e, e, Ti, Ei(t, n, !H(e)));
}
function Ai(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) if (!e[n].type.eq(t[n].type)) return !1;
	return !0;
}
function ji(e) {
	let t = e.nextSibling;
	return e.parentNode.removeChild(e), t;
}
var Mi = class {
	constructor(e, t, n) {
		this.lock = t, this.view = n, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = Ni(e.node.content, e);
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
		for (; i < a;) this.destroyRest(), this.top.damage = 0, this.index = this.stack.pop(), this.top = this.stack.pop(), a--;
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
			if (i < 0 && this.index < this.top.children.length) {
				let t = this.top.children[this.index];
				t instanceof _i && !(t.damage & 4) && t.mark.type == e[a].type && t.spec.update && !this.isLocked(t.dom) && t.spec.update(e[a]) && (t.mark = e[a], i = this.index, this.changed = !0);
			}
			if (i > -1) i > this.index && (this.changed = !0, this.destroyBetween(this.index, i)), this.top = this.top.children[this.index];
			else {
				let r = _i.create(this.top, e[a], t, n);
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
	updateNodeAt(e, t, n, r, i, a) {
		let o = this.top.children[r];
		return o.damage & 4 && o.dom == o.contentDOM && (o.damage = 2), o.update(e, t, n, i, a) ? (this.destroyBetween(this.index, r), this.index++, !0) : !1;
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
			if (s instanceof vi) {
				let c = this.preMatch.matched.get(s);
				if (c != null && c != i) return !1;
				let l = s.dom, u, d = this.isLocked(l) && !(e.isText && s.node && s.node.isText && s.nodeDOM.nodeValue == e.text && !(s.damage & 4) && Ai(t, s.outerDeco));
				if (!d && s.update(e, t, n, r, a)) return this.destroyBetween(this.index, o), s.dom != l && (this.changed = !0), this.index++, !0;
				if (!d && (u = this.recreateWrapper(s, e, t, n, r, a))) return this.destroyBetween(this.index, o), this.top.children[this.index] = u, u.contentDOM && (u.damage |= 2, u.updateChildren(r, a + 1), u.damage = 0), this.changed = !0, this.index++, !0;
				break;
			}
		}
		return !1;
	}
	recreateWrapper(e, t, n, r, i, a) {
		if (e.damage & 3 || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !Ai(n, e.outerDeco) || !r.eq(e.innerDeco)) return null;
		let o = vi.create(this.top, t, n, r, i, a);
		if (o.contentDOM) {
			o.children = e.children, e.children = [];
			for (let e of o.children) e.parent = o;
		}
		return e.destroy(), o;
	}
	addNode(e, t, n, r, i) {
		let a = vi.create(this.top, e, t, n, r, i);
		a.contentDOM && a.updateChildren(r, i + 1), this.top.children.splice(this.index++, 0, a), this.changed = !0;
	}
	placeWidget(e, t, n) {
		let r = this.index < this.top.children.length ? this.top.children[this.index] : null;
		if (r && r.matchesWidget(e) && (e == r.widget || !r.widget.type.toDOM.parentNode)) this.index++;
		else {
			let r = new hi(this.top, e, t, n);
			this.top.children.splice(this.index++, 0, r), this.changed = !0;
		}
	}
	addTextblockHacks() {
		let e = this.top.children[this.index - 1], t = this.top;
		for (; e instanceof _i;) t = e, e = t.children[t.children.length - 1];
		(!e || !(e instanceof bi) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((kr || Dr) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
	}
	addHackNode(e, t) {
		if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e)) this.index++;
		else {
			let n = document.createElement(e);
			e == "IMG" && (n.className = "ProseMirror-separator", n.alt = ""), e == "BR" && (n.className = "ProseMirror-trailingBreak");
			let r = new xi(this.top, [], n, null);
			t == this.top ? t.children.splice(this.index++, 0, r) : t.children.push(r), this.changed = !0;
		}
	}
	isLocked(e) {
		return this.lock && (e == this.lock || H(e) && e.contains(this.lock.parentNode));
	}
};
function Ni(e, t) {
	let n = t, r = n.children.length, i = [], a = e.childCount, o = /* @__PURE__ */ new Map(), s = [];
	outer: for (; a > 0;) {
		let c;
		for (;;) if (r) {
			let e = n.children[r - 1];
			if (e instanceof _i) i.push(r - 1), n = e, r = e.children.length;
			else {
				c = e, r--;
				break;
			}
		} else if (n == t) break outer;
		else r = i.pop(), n = n.parent;
		let l = c.node;
		if (l) {
			if (l != e.child(a - 1)) break;
			--a, o.set(c, a), s.push(c);
		}
	}
	return {
		index: a,
		matched: o,
		matches: s.reverse()
	};
}
function Pi(e, t) {
	return e.type.side - t.type.side;
}
function Fi(e, t, n, r) {
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
		if (u) {
			if (d) {
				d.sort(Pi);
				for (let e = 0; e < d.length; e++) n(d[e], l, !!c);
			} else n(u, l, !!c);
		}
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
function Ii(e) {
	if (e.nodeName == "UL" || e.nodeName == "OL") {
		let t = e.style.cssText;
		e.style.cssText = t + "; list-style: square !important", window.getComputedStyle(e).listStyle, e.style.cssText = t;
	}
}
function Li(e, t, n, r) {
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
function Ri(e, t, n, r, i) {
	let a = [];
	for (let o = 0, s = 0; o < e.length; o++) {
		let c = e[o], l = s, u = s += c.size;
		l >= n || u <= t ? a.push(c) : (l < t && a.push(c.slice(0, t - l, r)), i &&= (a.push(i), void 0), u > n && a.push(c.slice(n - l, c.size, r)));
	}
	return a;
}
function zi(e, t) {
	let { $anchor: n, $head: r } = e.selection, i = t > 0 ? n.max(r) : n.min(r), a = i.parent.inlineContent ? i.depth ? e.doc.resolve(t > 0 ? i.after() : i.before()) : null : i;
	return a && L.findFrom(a, t);
}
function Bi(e, t) {
	return e.dispatch(e.state.tr.setSelection(t).scrollIntoView()), !0;
}
function Vi(e, t, n) {
	let r = e.state.selection;
	if (r instanceof R) {
		if (n.indexOf("s") > -1) {
			let { $head: n } = r, i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter;
			if (!i || i.isText || !i.isLeaf) return !1;
			let a = e.state.doc.resolve(n.pos + i.nodeSize * (t < 0 ? -1 : 1));
			return Bi(e, new R(r.$anchor, a));
		}
		if (!r.empty) return !1;
		if (e.endOfTextblock(t > 0 ? "forward" : "backward")) {
			let n = zi(e.state, t);
			return n && n instanceof z ? Bi(e, n) : !1;
		}
		if (!jr || n.indexOf("m") < 0) {
			let n = r.$head, i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter, a;
			if (!i || i.isText) return !1;
			let o = t < 0 ? n.pos - i.nodeSize : n.pos;
			return i.isAtom || (a = e.docView.descAt(o)) && !a.contentDOM ? z.isSelectable(i) ? Bi(e, new z(t < 0 ? e.state.doc.resolve(n.pos - i.nodeSize) : n)) : Bi(e, new R(e.state.doc.resolve(t < 0 ? o : o + i.nodeSize))) : !1;
		}
	} else if (r instanceof z && r.node.isInline) return Bi(e, new R(t > 0 ? r.$to : r.$from));
	else {
		let n = zi(e.state, t);
		return n ? Bi(e, n) : !1;
	}
}
function Hi(e, t) {
	let n = e.pmViewDesc;
	return n ? n.size == 0 && (t < 0 || e.nextSibling || e.nodeName != "BR") : H(e) && e.contentEditable == "false";
}
function Ui(e, t) {
	return t < 0 ? Wi(e) : Gi(e);
}
function Wi(e) {
	let t = e.domSel.readRange(), n = t.focusNode, r = t.focusOffset;
	if (!n) return;
	let i, a, o = !1;
	for (Tr && H(n) && r < V(n) && Hi(n.childNodes[r], -1) && (o = !0);;) if (r > 0) {
		if (!H(n)) break;
		let e = n.childNodes[r - 1];
		if (Hi(e, -1)) i = n, a = --r;
		else if (U(e)) n = e, r = n.nodeValue.length;
		else break;
	} else if (Ki(n)) break;
	else {
		let t = n.previousSibling;
		for (; t && Hi(t, -1);) i = n.parentNode, a = ir(t), t = t.previousSibling;
		if (t) n = t, r = V(n);
		else {
			if (n = n.parentNode, n == e.dom) break;
			r = 0;
		}
	}
	o ? qi(e, n, r) : i && qi(e, i, a);
}
function Gi(e) {
	let t = e.domSel.readRange(), n = t.focusNode, r = t.focusOffset;
	if (!n) return;
	let i = V(n), a, o;
	for (;;) if (r < i) {
		if (!H(n)) break;
		let e = n.childNodes[r];
		if (Hi(e, 1)) a = n, o = ++r;
		else break;
	} else if (Ki(n)) break;
	else {
		let t = n.nextSibling;
		for (; t && Hi(t, 1);) a = t.parentNode, o = ir(t) + 1, t = t.nextSibling;
		if (t) n = t, r = 0, i = V(n);
		else {
			if (n = n.parentNode, n == e.dom) break;
			r = i = 0;
		}
	}
	a && qi(e, a, o);
}
function Ki(e) {
	for (let t = e; t; t = t.parentNode) {
		let e = t.pmViewDesc;
		if (e) return e.node ? e.node.isBlock : !1;
	}
	return !1;
}
function qi(e, t, n) {
	if (!U(t)) {
		let e, r;
		(r = mr(t, n)) ? (t = r, n = 0) : (e = pr(t, n)) && (t = e, n = e.nodeValue.length);
	}
	let r = e.domSelection(), i = e.domSel.readRange();
	if (!r) return;
	_r(i) ? r.collapse(t, n) : r.extend && (r.collapse(i.anchorNode, i.anchorOffset), r.extend(t, n)), e.domSel.ignore();
	let { state: a } = e;
	setTimeout(() => {
		e.state == a && e.domSel.sync();
	}, 50);
}
function Ji(e, t) {
	let n = e.state.doc.resolve(t);
	if (!(Dr || Mr) && n.parent.inlineContent) {
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
	let r = e.dom;
	for (let t = n.depth; t > 0; t--) if (n.node(t).isBlock) {
		r = e.nodeDOM(n.before(t)) || r;
		break;
	}
	return getComputedStyle(r).direction == "rtl" ? "rtl" : "ltr";
}
function Yi(e, t, n) {
	let r = e.state.selection;
	if (r instanceof R && !r.empty || n.indexOf("s") > -1 || jr && n.indexOf("m") > -1) return !1;
	let { $from: i, $to: a } = r;
	if (!i.parent.inlineContent || e.endOfTextblock(t < 0 ? "up" : "down")) {
		let n = zi(e.state, t);
		if (n && n instanceof z) return Bi(e, n);
	}
	if (!i.parent.inlineContent) {
		let n = t < 0 ? i : a, o = r instanceof Vn ? L.near(n, t) : L.findFrom(n, t);
		return o ? Bi(e, o) : !1;
	}
	return !1;
}
function Xi(e, t) {
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
function Zi(e, t, n) {
	e.domObserver.stopped(() => t.contentEditable = n);
}
function Qi(e) {
	if (!kr || e.state.selection.$head.parentOffset > 0) return !1;
	let { focusNode: t, focusOffset: n } = e.domSel.readRange();
	if (t && H(t) && n == 0 && t.firstChild && H(t.firstChild) && t.firstChild.contentEditable == "false") {
		let n = t.firstChild;
		Zi(e, n, "true"), setTimeout(() => Zi(e, n, "false"), 20);
	}
	return !1;
}
function $i(e) {
	let t = "";
	return e.ctrlKey && (t += "c"), e.metaKey && (t += "m"), e.altKey && (t += "a"), e.shiftKey && (t += "s"), t;
}
function ea(e, t) {
	let n = t.keyCode, r = $i(t);
	if (n == 8 || jr && n == 72 && r == "c") return Xi(e, -1) || Ui(e, -1);
	if (n == 46 && !t.shiftKey || jr && n == 68 && r == "c") return Xi(e, 1) || Ui(e, 1);
	if (n == 13 || n == 27) return !0;
	if (n == 37 || jr && n == 66 && r == "c") {
		let t = n == 37 ? Ji(e, e.state.selection.from) == "ltr" ? -1 : 1 : -1;
		return Vi(e, t, r) || Ui(e, t);
	}
	if (n == 39 || jr && n == 70 && r == "c") {
		let t = n == 39 ? Ji(e, e.state.selection.from) == "ltr" ? 1 : -1 : 1;
		return Vi(e, t, r) || Ui(e, t);
	}
	return n == 38 || jr && n == 80 && r == "c" ? Yi(e, -1, r) || Ui(e, -1) : n == 40 || jr && n == 78 && r == "c" ? Qi(e) || Yi(e, 1, r) || Ui(e, 1) : !(r != (jr ? "m" : "c") || n != 66 && n != 73 && n != 89 && n != 90);
}
function ta(e, t) {
	e.someProp("transformCopied", (n) => {
		t = n(t, e);
	});
	let n = [], { content: r, openStart: i, openEnd: a } = t;
	for (; i > 1 && a > 1 && r.childCount == 1 && r.firstChild.childCount == 1;) {
		i--, a--;
		let e = r.firstChild;
		n.push(e.type.name, e.attrs == e.type.defaultAttrs ? null : e.attrs), r = e.content;
	}
	let o = e.someProp("clipboardSerializer") || pt.fromSchema(e.state.schema), s = da(), c = s.createElement("div");
	c.appendChild(o.serializeFragment(r, { document: s }));
	let l = c.firstChild, u, d = 0;
	for (; l && H(l) && (u = ua[l.nodeName.toLowerCase()]);) {
		for (let e = u.length - 1; e >= 0; e--) {
			let t = s.createElement(u[e]);
			for (; c.firstChild;) t.appendChild(c.firstChild);
			c.appendChild(t), d++;
		}
		l = c.firstChild;
	}
	return l && H(l) && l.setAttribute("data-pm-slice", `${i} ${a}${d ? ` -${d}` : ""} ${JSON.stringify(n)}`), {
		dom: c,
		text: e.someProp("clipboardTextSerializer", (n) => n(t, e)) || t.content.textBetween(0, t.content.size, "\n\n"),
		slice: t
	};
}
function na(e, t, n, r, i) {
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
			let n = i.marks(), { schema: r } = e.state, a = pt.fromSchema(r);
			o = document.createElement("div"), t.split(/(?:\r\n?|\n)+/).forEach((e) => {
				let t = o.appendChild(document.createElement("p"));
				e && t.appendChild(a.serializeNode(r.text(e, n)));
			});
		}
	} else e.someProp("transformPastedHTML", (t) => {
		n = t(n, e);
	}), o = ma(n), Pr && ha(o);
	let l = o && o.querySelector("[data-pm-slice]"), u = l && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(l.getAttribute("data-pm-slice") || "");
	if (u && u[3]) for (let e = +u[3]; e > 0; e--) {
		let e = o.firstChild;
		for (; e && !H(e);) e = e.nextSibling;
		if (!e) break;
		o = e;
	}
	if (s ||= (e.someProp("clipboardParser") || e.someProp("domParser") || $e.fromSchema(e.state.schema)).parseSlice(o, {
		preserveWhitespace: !!(c || u),
		context: i,
		ruleFromNode(e) {
			return e.nodeName == "BR" && !e.nextSibling && e.parentNode && !ra.test(e.parentNode.nodeName) ? { ignore: !0 } : null;
		}
	}), u) s = ga(la(s, +u[1], +u[2]), u[4]);
	else if (s = P.maxOpen(ia(s.content, i), !0), s.openStart || s.openEnd) {
		let e = 0, t = 0;
		for (let t = s.content.firstChild; e < s.openStart && !t.type.spec.isolating; e++, t = t.firstChild);
		for (let e = s.content.lastChild; t < s.openEnd && !e.type.spec.isolating; t++, e = e.lastChild);
		s = la(s, e, t);
	}
	return e.someProp("transformPasted", (t) => {
		s = t(s, e, r);
	}), s;
}
var ra = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function ia(e, t) {
	if (e.childCount < 2) return e;
	for (let n = t.depth; n >= 0; n--) {
		let r = t.node(n).contentMatchAt(t.index(n)), i, a = [];
		if (e.forEach((e) => {
			if (!a) return;
			let t = r.findWrapping(e.type), n;
			if (!t) return a = null;
			if (n = a.length && i.length && oa(t, i, e, a[a.length - 1], 0)) a[a.length - 1] = n;
			else {
				a.length && (a[a.length - 1] = sa(a[a.length - 1], i.length));
				let n = aa(e, t);
				a.push(n), r = r.matchType(n.type), i = t;
			}
		}), a) return M.from(a);
	}
	return e;
}
function aa(e, t, n = 0) {
	for (let r = t.length - 1; r >= n; r--) e = t[r].create(null, M.from(e));
	return e;
}
function oa(e, t, n, r, i) {
	if (i < e.length && i < t.length && e[i] == t[i]) {
		let a = oa(e, t, n, r.lastChild, i + 1);
		if (a) return r.copy(r.content.replaceChild(r.childCount - 1, a));
		if (r.contentMatchAt(r.childCount).matchType(i == e.length - 1 ? n.type : e[i + 1])) return r.copy(r.content.append(M.from(aa(n, e, i + 1))));
	}
}
function sa(e, t) {
	if (t == 0) return e;
	let n = e.content.replaceChild(e.childCount - 1, sa(e.lastChild, t - 1)), r = e.contentMatchAt(e.childCount).fillBefore(M.empty, !0);
	return e.copy(n.append(r));
}
function ca(e, t, n, r, i, a) {
	let o = t < 0 ? e.firstChild : e.lastChild, s = o.content;
	return e.childCount > 1 && (a = 0), i < r - 1 && (s = ca(s, t, n, r, i + 1, a)), i >= n && (s = t < 0 ? o.contentMatchAt(0).fillBefore(s, a <= i).append(s) : s.append(o.contentMatchAt(o.childCount).fillBefore(M.empty, !0))), e.replaceChild(t < 0 ? 0 : e.childCount - 1, o.copy(s));
}
function la(e, t, n) {
	return t < e.openStart && (e = new P(ca(e.content, -1, t, e.openStart, 0, e.openEnd), t, e.openEnd)), n < e.openEnd && (e = new P(ca(e.content, 1, n, e.openEnd, 0, 0), e.openStart, n)), e;
}
var ua = {
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
};
function da() {
	return document.implementation.createHTMLDocument("title");
}
var fa = null;
function pa(e) {
	let t = window.trustedTypes;
	if (!t) return e;
	if (!fa) {
		if (fa = t.defaultPolicy) try {
			return fa.createHTML(e);
		} catch {}
		fa = t.createPolicy("ProseMirrorClipboard", { createHTML: (e) => e });
	}
	return fa.createHTML(e);
}
function ma(e) {
	let t = /^(\s*<meta [^>]*>)*/.exec(e);
	t && (e = e.slice(t[0].length));
	let n = da(), r = n.body, i = /<([a-z][^>\s]+)/i.exec(e), a;
	if ((a = i && ua[i[1].toLowerCase()]) && (e = a.map((e) => "<" + e + ">").join("") + e + a.map((e) => "</" + e + ">").reverse().join("")), r.innerHTML = pa(e), a) for (let e = 0; e < a.length; e++) r = r.querySelector(a[e]) || r;
	for (let e = 0; e < n.styleSheets.length; e++) {
		let t = n.styleSheets[e];
		for (let e = 0; e < t.rules.length; e++) {
			let n = t.rules[e];
			if (n instanceof CSSStyleRule) {
				let e = r.querySelectorAll(n.selectorText);
				for (let t = 0; t < e.length; t++) e[t].style.cssText += n.style.cssText;
			}
		}
	}
	return r;
}
function ha(e) {
	let t = e.querySelectorAll(Dr ? "span:not([class]):not([style])" : "span.Apple-converted-space");
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		r.childNodes.length == 1 && r.textContent == "\xA0" && r.parentNode && r.parentNode.replaceChild(e.ownerDocument.createTextNode(" "), r);
	}
}
function ga(e, t) {
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
		if (!t || t.hasRequiredAttrs() || !t.createAndFill(null, i)) break;
		try {
			i = M.from(t.create(r[e + 1], i));
		} catch {
			break;
		}
		a++, o++;
	}
	return new P(i, a, o);
}
var _a = class e {
	constructor(e, t, n, r) {
		this.anchorNode = e, this.anchorOffset = t, this.focusNode = n, this.focusOffset = r;
	}
	static from(t) {
		return t instanceof e ? t : new e(t.anchorNode, t.anchorOffset, t.focusNode, t.focusOffset);
	}
	eq(e) {
		return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
	}
};
_a.null = new _a(null, 0, null, 0);
var va = class {
	constructor(e) {
		this.view = e, this.range = _a.null, this.active = !1, this.synced = !1, this.suppress = !1, this.currentDocument = null, this.onSelectionChange = this.onSelectionChange.bind(this);
	}
	ensureListener() {
		let e = this.view.dom.ownerDocument;
		e != this.currentDocument && (this.currentDocument && this.currentDocument.removeEventListener("selectionchange", this.onSelectionChange), this.currentDocument = e, e.addEventListener("selectionchange", this.onSelectionChange));
	}
	destroy() {
		this.currentDocument &&= (this.currentDocument.removeEventListener("selectionchange", this.onSelectionChange), null), this.active = !1, this.range = _a.null;
	}
	suppressChanges() {
		this.suppress = !0, setTimeout(() => this.suppress = !1, 50);
	}
	onSelectionChange() {
		if (this.suppress && this.view.hasFocus()) return this.sync();
		this.read() && this.view.domObserver.flush(!1);
	}
	readRange() {
		let { view: e } = this, t = e.dom.isConnected !== !1 && e.domSelection();
		return t ? kr && e.root.nodeType === 11 && br(e.dom.ownerDocument) == e.dom ? _a.from(ya(e, t) || t) : _a.from(t) : _a.null;
	}
	read() {
		this.ensureListener();
		let e = Fa(this.view);
		if (!e) this.active = !1, this.range = _a.null;
		else return this.active = !0, !this.range.eq(e) && (this.range = e, this.synced = !1, !0);
	}
	sync(e = !1) {
		let { view: t } = this;
		t.docView && (this.ensureListener(), t.domObserver.stopped(() => {
			Ma(t, t.state.selection);
			let n = t.state.selection;
			if (t.input.mouseDown || Sa(t)) {
				let { desc: r, start: i } = wa(t.docView, n.from, n.to, 0);
				t.cursorWrapper ? ja(t) : r instanceof Si && r.spec.setSelection ? r.spec.setSelection(n.anchor - i, n.head - i, t.root) : Ca(t, e, r, i), this.synced = this.active = !0;
			}
			n.visible == t.dom.classList.contains("ProseMirror-hideselection") && (n.visible ? t.dom.classList.remove("ProseMirror-hideselection") : (t.dom.classList.add("ProseMirror-hideselection"), Aa(t))), this.range = this.readRange();
		}));
	}
	ignore(e = this.readRange()) {
		this.range = _a.from(e), this.synced = !0;
	}
	deactivate() {
		this.range = _a.null, this.active = this.synced = !1;
	}
};
function ya(e, t) {
	if (t.getComposedRanges) {
		let n = t.getComposedRanges(e.root)[0];
		if (n) return ba(e, n);
	}
	let n;
	function r(e) {
		e.preventDefault(), e.stopImmediatePropagation(), n = e.getTargetRanges()[0];
	}
	return e.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), e.dom.removeEventListener("beforeinput", r, !0), n ? ba(e, n) : null;
}
function ba(e, t) {
	let n = t.startContainer, r = t.startOffset, i = t.endContainer, a = t.endOffset, o = e.domAtPos(e.state.selection.anchor);
	return lr(o.node, o.offset, i, a) && ([n, r, i, a] = [
		i,
		a,
		n,
		r
	]), new _a(n, r, i, a);
}
function xa(e, t, n = null) {
	let r = e.state.doc;
	if (!t.focusNode) return null;
	let i = e.docView.nearestDesc(t.focusNode), a = i && i.size == 0, o = e.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
	if (o < 0) return null;
	let s = r.resolve(o), c, l;
	if (_r(t)) {
		for (c = o; i && !i.node;) i = i.parent;
		if (i && i.node.isAtom && z.isSelectable(i.node) && i.parent && !(i.node.isInline && hr(t.focusNode, t.focusOffset, i.dom))) {
			let e = i.posBefore;
			l = new z(o == e ? s : r.resolve(e));
		} else if (Tr && n == "key" && o > e.state.selection.to && H(t.focusNode) && t.focusOffset == t.focusNode.childNodes.length && i && i.posAtStart > e.state.selection.to) for (let e = t.focusNode;; e = e.parentNode) {
			if (getComputedStyle(e).overflow != "visible") {
				l = L.findFrom(r.resolve(i.posAtStart), 1);
				break;
			}
			if (e == i.dom || e.nextSibling || !e.parentNode || !H(e.parentNode)) break;
		}
	} else {
		if (t instanceof e.dom.ownerDocument.defaultView.Selection && t.rangeCount > 1) {
			let n = o, i = o;
			for (let r = 0; r < t.rangeCount; r++) {
				let a = t.getRangeAt(r);
				n = Math.min(n, e.docView.posFromDOM(a.startContainer, a.startOffset, 1)), i = Math.max(i, e.docView.posFromDOM(a.endContainer, a.endOffset, -1));
			}
			if (n < 0) return null;
			[c, o] = i == e.state.selection.anchor ? [i, n] : [n, i], s = r.resolve(o);
		} else c = e.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
		if (c < 0) return null;
	}
	let u = r.resolve(c);
	if (!l) {
		let t = n == "pointer" || e.state.selection.head < s.pos && !a ? 1 : -1;
		l = Pa(e, u, s, t);
	}
	return l;
}
function Sa(e) {
	return e.editable ? e.hasFocus() : Ia(e, e.domSel.readRange()) && (!document.activeElement || document.activeElement.contains(e.dom));
}
function Ca(e, t, n, r) {
	let i = e.state.selection, { anchor: a, head: o } = i, s, c;
	Ea && !(i instanceof R) && (i.$from.parent.inlineContent || (s = Da(e, i.from)), !i.empty && !i.$from.parent.inlineContent && (c = Da(e, i.to)));
	let l = n.domFromPos(a - r, a > r ? -1 : 1);
	Ta(a, o, l, o == a ? l : n.domFromPos(o - r, o > r ? -1 : 1), e, t), Ea && (s && ka(s), c && ka(c));
}
function wa(e, t, n, r = 0) {
	for (let i = 0, a = r; i < e.children.length; i++) {
		let r = e.children[i], o = a + r.size;
		if (t > a && n < o) return wa(r, t, n, a + r.border);
		a = o;
	}
	return {
		desc: e,
		start: r
	};
}
function Ta(e, t, n, r, i, a) {
	let o = !1;
	if ((Tr || kr) && e == t) {
		let { node: e, offset: t } = n;
		if (U(e)) {
			if (o = !!(t && e.nodeValue[t - 1] == "\n"), o && t == e.nodeValue.length) for (let t = e, i; t; t = t.parentNode) {
				if (i = t.nextSibling) {
					i.nodeName == "BR" && (n = r = {
						node: i.parentNode,
						offset: ir(i) + 1
					});
					break;
				}
				let e = t.pmViewDesc;
				if (e && e.node && e.node.isBlock) break;
			}
		} else {
			let n = e.childNodes[t - 1];
			o = n && (n.nodeName == "BR" || n.contentEditable == "false");
		}
	}
	let s = i.domSel.readRange();
	if (Tr && s.focusNode && s.focusNode != r.node && H(s.focusNode)) {
		let e = s.focusNode.childNodes[s.focusOffset];
		e && e.contentEditable == "false" && (a = !0);
	}
	!(a || o && kr) && lr(n.node, n.offset, s.anchorNode, s.anchorOffset) && lr(r.node, r.offset, s.focusNode, s.focusOffset) || vr(i.domSelection(), {
		focusNode: r.node,
		focusOffset: r.offset,
		anchorNode: n.node,
		anchorOffset: n.offset
	});
}
var Ea = kr || Dr && Or < 63;
function Da(e, t) {
	let { node: n, offset: r } = e.docView.domFromPos(t, 0), i = r < n.childNodes.length ? n.childNodes[r] : null, a = r ? n.childNodes[r - 1] : null;
	if (kr && i && i.contentEditable == "false") return Oa(i);
	if ((!i || i.contentEditable == "false") && (!a || a.contentEditable == "false")) {
		if (i) return Oa(i);
		if (a) return Oa(a);
	}
}
function Oa(e) {
	return e.contentEditable = "true", kr && e.draggable && (e.draggable = !1, e.wasDraggable = !0), e;
}
function ka(e) {
	e.contentEditable = "false", e.wasDraggable &&= (e.draggable = !0, null);
}
function Aa(e) {
	let t = e.dom.ownerDocument;
	t.removeEventListener("selectionchange", e.input.hideSelectionGuard);
	let n = e.domSel.readRange(), r = n.anchorNode, i = n.anchorOffset;
	t.addEventListener("selectionchange", e.input.hideSelectionGuard = () => {
		(n.anchorNode != r || n.anchorOffset != i) && (t.removeEventListener("selectionchange", e.input.hideSelectionGuard), setTimeout(() => {
			(!Sa(e) || e.state.selection.visible) && e.dom.classList.remove("ProseMirror-hideselection");
		}, 20));
	});
}
function ja(e) {
	let t = e.domSelection();
	if (!t) return;
	let n = e.cursorWrapper.dom;
	n.nodeName == "IMG" ? t.collapse(n.parentNode, ir(n) + 1) : t.collapse(n, 0);
}
function Ma(e, t) {
	if (t instanceof z) {
		let n = e.docView.descAt(t.from);
		n != e.lastSelectedViewDesc && (Na(e), n && n.selectNode(), e.lastSelectedViewDesc = n);
	} else Na(e);
}
function Na(e) {
	e.lastSelectedViewDesc &&= (e.lastSelectedViewDesc.parent && e.lastSelectedViewDesc.deselectNode(), void 0);
}
function Pa(e, t, n, r) {
	let i = e.someProp("createSelectionBetween", (r) => r(e, t, n)) || R.between(t, n, r);
	return e.someProp("adjustSelectionFromDOM", (t) => {
		i = t(e, i);
	}), i;
}
function Fa(e) {
	if (e.editable && !e.hasFocus()) return null;
	let t = e.domSel.readRange();
	return t && Ia(e, t) ? t : null;
}
function Ia(e, t) {
	if (!t.anchorNode) return !1;
	try {
		return fr(e.dom, t.anchorNode) && (e.editable || fr(e.dom, t.focusNode));
	} catch {
		return !1;
	}
}
var La = {}, Ra = {}, za = {
	touchstart: !0,
	touchmove: !0
}, Ba = class {
	constructor() {
		this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastKeyDispatched = !1, this.lastClick = {
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
			Ka(e, t) && (e.input.composing && (t.type == "keydown" || t.type == "beforeinput") && t.isComposing === !1 && go(e, !0), Ga(e, t) || !e.editable && t.type in Ra || n(e, t));
		}, za[t] ? { passive: !0 } : void 0);
	}
	kr && e.dom.addEventListener("input", () => null), Wa(e);
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
function Ja(e, t) {
	let { input: n } = e;
	return n.lastKeyDispatched || e.composing ? !1 : (n.lastKeyDispatched = !0, typeof t == "string" && (t = yr(t == "Backspace" ? 8 : 13, t)), e.someProp("handleKeyDown", (n) => n(e, t)));
}
Ra.keydown = (e, t) => {
	let n = t;
	if (e.input.shiftKey = n.keyCode == 16 || n.shiftKey, e.input.lastKeyCode = n.keyCode, e.input.lastKeyCodeTime = Date.now(), e.input.lastKeyDispatched = !1, !(Nr && Dr && n.keyCode == 13)) {
		if (Ar && n.keyCode == 13 && !n.ctrlKey && !n.altKey && !n.metaKey) {
			let t = Date.now();
			e.input.lastIOSEnter = t, e.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
				e.input.lastIOSEnter == t && (Ja(e, "Enter"), e.input.lastIOSEnter = 0);
			}, 200);
		} else n.keyCode != 229 && e.domObserver.forceFlush(!0), Ja(e, n) || ea(e, n) ? n.preventDefault() : Ha(e, "key");
	}
}, Ra.keyup = (e, t) => {
	t.keyCode == 16 && (e.input.shiftKey = !1);
}, Ra.keypress = (e, t) => {
	let n = t;
	if (po(e) || !n.charCode || n.ctrlKey && !n.altKey || jr && n.metaKey) return;
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
function Ya(e) {
	return {
		left: e.clientX,
		top: e.clientY
	};
}
function Xa(e, t) {
	let n = t.x - e.clientX, r = t.y - e.clientY;
	return n * n + r * r < 100;
}
function Za(e, t, n, r, i) {
	if (r == -1) return !1;
	let a = e.state.doc.resolve(r);
	for (let r = a.depth + 1; r > 0; r--) if (e.someProp(t, (t) => r > a.depth ? t(e, n, a.nodeAfter, a.before(r), i, !0) : t(e, n, a.node(r), a.before(r), i, !1))) return !0;
	return !1;
}
function Qa(e, t, n) {
	if (e.focused || e.focus(), e.state.selection.eq(t)) return;
	let r = e.state.tr.setSelection(t);
	r.setMeta("pointer", !0), e.dispatch(r);
}
function $a(e, t) {
	if (t == -1) return !1;
	let n = e.state.doc.resolve(t), r = n.nodeAfter;
	return r && r.isAtom && z.isSelectable(r) ? (Qa(e, new z(n)), !0) : !1;
}
function eo(e, t) {
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
	return i != null && (Qa(e, z.create(e.state.doc, i)), !0);
}
function to(e, t, n, r, i) {
	return Za(e, "handleClickOn", t, n, r) || e.someProp("handleClick", (n) => n(e, t, r)) || (i ? eo(e, n) : $a(e, n));
}
function no(e, t, n, r) {
	return Za(e, "handleDoubleClickOn", t, n, r) || e.someProp("handleDoubleClick", (n) => n(e, t, r));
}
function ro(e, t, n, r) {
	return Za(e, "handleTripleClickOn", t, n, r) || e.someProp("handleTripleClick", (n) => n(e, t, r));
}
function io(e, t, n) {
	if (t == -1) return e.inlineContent ? R.create(e, 0, e.content.size) : null;
	let r = e.resolve(t);
	for (let t = r.depth + 1; t > 0; t--) {
		let i = t > r.depth ? r.nodeAfter : r.node(t), a = r.before(t);
		if (i.inlineContent) return R.create(e, a + 1, a + 1 + i.content.size);
		if (n && z.isSelectable(i)) return z.create(e, a);
	}
	return null;
}
var ao = /[\w_\u00a1-\uffff]+/g;
try {
	ao = /* @__PURE__ */ RegExp("[\\p{L}\\p{N}_]+", "gu");
} catch {}
function oo(e, t) {
	let n = e.resolve(t), r = n.node(), i = "", a = t, o = t;
	for (let e = n.indexAfter(), o = !1; e > 0; e--) {
		let s = r.child(e - 1);
		if (!s.text) break;
		let c = a == t ? t - n.posAtIndex(e - 1) : s.text.length, l = c;
		for (; l > 0; l--) if (/\S/.test(s.text[l - 1])) o = !0;
		else if (o) break;
		if (i = s.text.slice(l, c) + i, a -= c - l, l || a < t - 50) break;
	}
	for (let e = n.index(), a = !1; e < r.childCount; e++) {
		let s = r.child(e);
		if (!s.text) break;
		let c = o == t ? t - n.posAtIndex(e) : 0, l = c;
		for (; l < s.text.length; l++) if (/\S/.test(s.text[l])) a = !0;
		else if (a) break;
		if (i += s.text.slice(c, l), o += l - c, l < s.text.length || o > t + 50) break;
	}
	let s = a, c = o;
	if (Intl.Segmenter) {
		for (let n of new Intl.Segmenter(void 0, { granularity: "word" }).segment(i)) if (n.isWordLike) {
			let r = n.index + a, i = r + n.segment.length;
			if (i < t) s = i;
			else if (r > t) {
				c = r;
				break;
			} else return R.create(e, r, i);
		}
	} else {
		ao.lastIndex = 0;
		for (let n; n = ao.exec(i);) {
			let r = n.index + a, i = r + n[0].length;
			if (i < t) s = i;
			else if (r > t) {
				c = r;
				break;
			} else return R.create(e, r, i);
		}
	}
	let l = i.slice(s - a, t - a), u = i.slice(t - a, c - a), d = /\S*$/.exec(l)[0].length, f = /^\S*/.exec(u)[0].length;
	if (d || f) return R.create(e, t - d, t + f);
	let p = /\s*$/.exec(l)[0].length, m = /^\s*/.exec(u)[0].length;
	return R.create(e, t - p, t + m);
}
var so = jr ? "metaKey" : "ctrlKey";
La.mousedown = (e, t) => {
	let n = t, r = Date.now();
	if (e.input.shiftKey = n.shiftKey, e.input.lastTouch > r - 500) return !1;
	bo(e);
	let i = "singleClick";
	r - e.input.lastClick.time < 500 && Xa(n, e.input.lastClick) && !n[so] && e.input.lastClick.button == n.button && (e.input.lastClick.type == "singleClick" ? i = "doubleClick" : e.input.lastClick.type == "doubleClick" && (i = "tripleClick")), e.input.lastClick = {
		time: r,
		x: n.clientX,
		y: n.clientY,
		type: i,
		button: n.button
	}, e.input.mouseDown && e.input.mouseDown.done();
	let a = e.posAtCoords(Ya(n));
	if (a) {
		if (n.button == 0) {
			if (!e.hasFocus()) {
				Gr(e.dom);
				let t = e.root.activeElement;
				t && !t.contains(e.dom) && t.blur();
			}
			(e.input.mouseDown = new co(e, a, n, i)).mightDrag || n.preventDefault();
		} else Ha(e, "pointer");
	}
};
var co = class {
	constructor(e, t, n, r) {
		this.view = e, this.startPos = t, this.event = n, this.type = r, this.didMove = !1, this.lastPos = -1, this.anchorRange = null, this.startDoc = e.state.doc, this.selectNode = !!n[so], this.extend = n.shiftKey, this.anchorDoc = this.startDoc;
		let i = lo(e);
		if (this.extend) {
			let t = e.state.selection;
			this.anchorRange = t instanceof z ? {
				from: t.from,
				to: t.to
			} : {
				from: t.anchor,
				to: t.anchor
			};
			let n = t instanceof z ? e.nodeDOM(t.from).getBoundingClientRect() : e.coordsAtPos(t.anchor);
			this.anchorOffset = {
				x: (n.left + n.right) / 2 - i.x,
				y: (n.top + n.bottom) / 2 - i.y
			};
		} else this.anchorOffset = {
			x: n.clientX - i.x,
			y: n.clientY - i.y
		};
		if (r == "singleClick") {
			let { selection: r } = e.state, i, a, o = !1;
			if (r instanceof z && r.from <= t.pos && r.to >= t.pos) a = r.from, i = r.node, o = !0;
			else if (t.inside > -1) i = e.state.doc.nodeAt(t.inside), a = t.inside;
			else {
				let n = e.state.doc.resolve(t.pos);
				i = n.parent, a = n.depth ? n.before() : -1;
			}
			if (o || a > -1 && i.type.spec.draggable && i.type.spec.selectable !== !1) {
				let t = e.docView.descAt(a)?.nodeDOM;
				this.mightDrag = {
					node: i,
					elt: t,
					pos: a,
					addAttr: !1
				}, t && !t.draggable && (this.mightDrag.addAttr = !0, e.domObserver.stopped(() => t.draggable = !0));
			} else this.mightDrag = fo(e, n);
		} else this.mightDrag = !1;
		e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), this.mightDrag || this.select(this.startPos, !0);
	}
	done() {
		this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.view.input.mouseDown == this && (this.view.input.mouseDown = null), typeof this.mightDrag == "object" && this.mightDrag.addAttr && this.view.domObserver.stopped(() => this.mightDrag.elt.removeAttribute("draggable"));
	}
	maybeRunHandler(e, t) {
		return (this.type == "singleClick" ? to : this.type == "doubleClick" ? no : ro)(this.view, e.pos, e.inside, t, this.selectNode);
	}
	up(e) {
		if (this.done(), !this.view.dom.contains(e.target)) return;
		let t = this.startPos;
		this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(Ya(e))), t && (this.didMove || this.maybeRunHandler(t, e) || this.select(t, !0), e.preventDefault());
	}
	move(e) {
		if (e.buttons == 0) this.done();
		else {
			if (!this.didMove && (Math.abs(this.event.x - e.clientX) > 8 || Math.abs(this.event.y - e.clientY) > 8) && (this.didMove = !0, this.mightDrag = !1), !this.mightDrag) {
				let t = this.view.posAtCoords(Ya(e));
				t && this.select(t, !1);
			}
			e.preventDefault();
		}
	}
	select(e, t) {
		if (e.pos == this.lastPos) return;
		this.lastPos = e.pos;
		let { view: n } = this, { doc: r } = n.state, i = this.type == "singleClick" ? uo(n, r, e) : this.type == "doubleClick" ? oo(r, e.pos) : io(r, e.inside, t);
		i && (t && !this.extend ? this.anchorRange = i : (!t || this.extend) && (r.eq(this.anchorDoc) || this.restoreAnchor(), this.anchorRange && this.anchorRange.from < i.from ? i = Pa(n, r.resolve(this.anchorRange.from), r.resolve(i.to)) : this.anchorRange && this.anchorRange.to > i.to && (i = Pa(n, r.resolve(this.anchorRange.to), r.resolve(i.from)))), i.eq(n.state.selection) || n.dispatch(n.state.tr.setSelection(i).setMeta("pointer", !0).scrollIntoView()));
	}
	restoreAnchor() {
		let e = lo(this.view), t = this.view.posAtCoords({
			left: this.anchorOffset.x + e.x,
			top: this.anchorOffset.y + e.y
		});
		if (!t) this.anchorRange = null;
		else {
			let { doc: e } = this.view.state;
			this.anchorRange = this.type == "singleClick" ? uo(this.view, e, t) : this.type == "doubleClick" ? oo(e, t.pos) : io(e, t.inside, !1), this.anchorDoc = this.view.state.doc;
		}
	}
};
function lo(e) {
	let t = e.dom.getBoundingClientRect();
	return {
		x: t.left - e.dom.scrollLeft,
		y: t.top - e.dom.scrollTop
	};
}
function uo(e, t, n) {
	if (n.inside > -1) {
		let e = t.nodeAt(n.inside);
		if (e.isAtom && z.isSelectable(e)) return z.create(t, n.inside);
	}
	let r = t.resolve(n.pos);
	return Pa(e, r, r);
}
function fo(e, t) {
	let { selection: n } = e.state;
	if (n.empty) return !1;
	let r = e.domSelection();
	if (!r || r.rangeCount == 0) return !0;
	let i = r.getRangeAt(0).getClientRects();
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		if (n.left <= t.clientX && n.right >= t.clientX && n.top <= t.clientY && n.bottom >= t.clientY) return !0;
	}
	return !1;
}
La.touchstart = (e) => {
	e.input.lastTouch = Date.now(), bo(e), Ha(e, "pointer");
}, La.touchmove = (e) => {
	e.input.lastTouch = Date.now(), Ha(e, "pointer");
}, La.contextmenu = (e) => bo(e);
function po(e, t) {
	return e.composing ? !0 : kr && Math.abs(Date.now() - e.input.compositionEndedAt) < 500 ? (e.input.compositionEndedAt = -2e8, !0) : !1;
}
var mo = Nr ? 5e3 : -1;
Ra.compositionstart = Ra.compositionupdate = (e) => {
	if (!e.composing) {
		e.domObserver.flush();
		let { state: t } = e, n = t.selection.$to;
		if (t.selection instanceof R && t.selection.empty && (t.storedMarks || !n.textOffset && n.parentOffset && n.nodeBefore.marks.some((e) => e.type.spec.inclusive === !1) || Dr && Mr && ho(e))) e.markCursor = e.state.storedMarks || n.marks(), bo(e, !0), e.markCursor = null;
		else if (bo(e, !t.selection.empty), Tr && e.domSel.active && t.selection.empty && n.parentOffset && !n.textOffset && n.nodeBefore.marks.length) for (let { focusNode: t, focusOffset: n } = e.domSel.range; t && H(t) && n != 0;) {
			let r = n < 0 ? t.lastChild : t.childNodes[n - 1];
			if (!r) break;
			if (U(r)) {
				let t = e.domSelection();
				t && t.collapse(r, r.nodeValue.length);
				break;
			}
			t = r, n = -1;
		}
		e.input.composing = !0;
	}
	_o(e, mo);
};
function ho(e) {
	let { focusNode: t, focusOffset: n } = e.domSel.range;
	if (!t || !H(t) || n >= t.childNodes.length) return !1;
	let r = t.childNodes[n];
	return H(r) && r.contentEditable == "false";
}
Ra.compositionend = (e, t) => {
	e.composing && go(e);
};
function go(e, t = !1) {
	e.input.composing = !1, e.input.compositionEndedAt = Date.now(), e.input.compositionPendingChanges = e.domObserver.pendingRecords().length ? e.input.compositionID : 0, e.input.compositionNode = null, e.input.badSafariComposition ? e.domObserver.forceFlush() : e.input.compositionPendingChanges && Promise.resolve().then(() => e.domObserver.flush()), e.input.compositionID++, t ? bo(e) : _o(e, 20);
}
function _o(e, t) {
	clearTimeout(e.input.composingTimeout), t > -1 && (e.input.composingTimeout = setTimeout(() => bo(e), t));
}
function vo(e) {
	e.composing && (e.input.composing = !1, e.input.compositionEndedAt = Date.now());
	for (let t; t = e.input.compositionNodes.pop();) t.markParentDamage();
}
function yo(e) {
	let t = e.domSel.range;
	if (!e.domSel.active || !t.focusNode) return null;
	let n = pr(t.focusNode, t.focusOffset), r = mr(t.focusNode, t.focusOffset);
	if (n && r && n != r) {
		let t = r.pmViewDesc, i = e.domObserver.lastChangedTextNode;
		if (n == i || r == i) return i;
		if (!t || !t.isText(r.nodeValue)) return r;
		if (e.input.compositionNode == r) {
			let e = n.pmViewDesc;
			if (e && e.isText(n.nodeValue)) return r;
		}
	}
	return n || r;
}
function bo(e, t = !1) {
	if (!(Nr && e.domObserver.flushingSoon >= 0) && (e.domObserver.forceFlush(), vo(e), t || e.docView && e.docView.damage)) {
		let n = xa(e, e.domSel.readRange()), r = e.state.selection;
		n && !n.eq(r) ? e.dispatch(e.state.tr.setSelection(n)) : (e.markCursor || t) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? e.dispatch(e.state.tr.deleteSelection()) : e.updateState(e.state);
	}
}
function xo(e, t) {
	if (!e.dom.parentNode) return;
	let n = e.dom.parentNode.appendChild(document.createElement("div"));
	n.appendChild(t), n.style.cssText = "position: fixed; left: -10000px; top: 10px";
	let r = getSelection(), i = document.createRange();
	i.selectNodeContents(t), e.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
		n.parentNode && n.parentNode.removeChild(n), e.focus();
	}, 50);
}
var So = Ar && Fr < 604;
La.copy = Ra.cut = (e, t) => {
	let n = t, r = e.state.selection, i = n.type == "cut";
	if (r.empty) return;
	let a = So ? null : n.clipboardData, { dom: o, text: s } = ta(e, r.content());
	a ? (n.preventDefault(), a.clearData(), a.setData("text/html", o.innerHTML), a.setData("text/plain", s)) : xo(e, o), i && e.dispatch(e.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function Co(e) {
	return e.openStart == 0 && e.openEnd == 0 && e.content.childCount == 1 ? e.content.firstChild : null;
}
function wo(e, t) {
	if (!e.dom.parentNode) return;
	let n = e.input.shiftKey || e.state.selection.$from.parent.type.spec.code, r = e.dom.parentNode.appendChild(document.createElement(n ? "textarea" : "div"));
	n || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
	let i = e.input.shiftKey && e.input.lastKeyCode != 45;
	setTimeout(() => {
		e.focus(), r.parentNode && r.parentNode.removeChild(r), n ? To(e, r.value, null, i, t) : To(e, r.textContent, r.innerHTML, i, t);
	}, 50);
}
function To(e, t, n, r, i) {
	let a = na(e, t, n, r, e.state.selection.$from);
	if (e.someProp("handlePaste", (t) => t(e, i, a || P.empty))) return !0;
	if (!a) return !1;
	let o = Co(a), s = o ? e.state.tr.replaceSelectionWith(o, r) : e.state.tr.replaceSelection(a);
	return e.dispatch(s.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function Eo(e) {
	let t = e.getData("text/plain") || e.getData("Text");
	if (t) return t;
	let n = e.getData("text/uri-list");
	return n ? n.replace(/\r?\n/g, " ") : "";
}
Ra.paste = (e, t) => {
	let n = t;
	if (e.composing && !Nr) return;
	let r = So ? null : n.clipboardData, i = e.input.shiftKey && e.input.lastKeyCode != 45;
	r && To(e, Eo(r), r.getData("text/html"), i, n) ? n.preventDefault() : wo(e, n);
};
var Do = class {
	constructor(e, t, n) {
		this.slice = e, this.move = t, this.node = n;
	}
}, Oo = jr ? "altKey" : "ctrlKey";
function ko(e, t) {
	let n;
	return e.someProp("dragCopies", (e) => {
		n ||= e(t);
	}), n == null ? !t[Oo] : !n;
}
La.dragstart = (e, t) => {
	let n = t, r = e.input.mouseDown;
	if (r && r.done(), !n.dataTransfer) return;
	let i = e.state.selection, a = i.empty ? null : e.posAtCoords(Ya(n)), o;
	if (!(a && a.pos >= i.from && a.pos <= (i instanceof z ? i.to - 1 : i.to))) {
		if (r && typeof r.mightDrag == "object") o = z.create(e.state.doc, r.mightDrag.pos);
		else if (n.target && H(n.target)) {
			let t = e.docView.nearestDesc(n.target, !0);
			t && t.node.type.spec.draggable && t != e.docView && (o = z.create(e.state.doc, t.posBefore));
		}
	}
	let { dom: s, text: c, slice: l } = ta(e, (o || e.state.selection).content());
	(!n.dataTransfer.files.length || !Dr || Or > 120) && n.dataTransfer.clearData(), n.dataTransfer.setData(So ? "Text" : "text/html", s.innerHTML), n.dataTransfer.effectAllowed = "copyMove", So || n.dataTransfer.setData("text/plain", c), e.dragging = new Do(l, ko(e, n), o);
}, La.dragend = (e) => {
	let t = e.dragging;
	window.setTimeout(() => {
		e.dragging == t && (e.dragging = null);
	}, 50);
}, Ra.dragover = Ra.dragenter = (e, t) => t.preventDefault(), Ra.drop = (e, t) => {
	try {
		Ao(e, t, e.dragging);
	} finally {
		e.dragging = null;
	}
};
function Ao(e, t, n) {
	if (!t.dataTransfer) return;
	let r = e.posAtCoords(Ya(t));
	if (!r) return;
	let i = e.state.doc.resolve(r.pos), a = n && n.slice;
	a ? e.someProp("transformPasted", (t) => {
		a = t(a, e, !1);
	}) : a = na(e, Eo(t.dataTransfer), So ? null : t.dataTransfer.getData("text/html"), !1, i);
	let o = !!(n && ko(e, t));
	if (e.someProp("handleDrop", (n) => n(e, t, a || P.empty, o))) {
		t.preventDefault();
		return;
	}
	if (!a) return;
	t.preventDefault();
	let s = a ? mn(e.state.doc, i.pos, a) : i.pos;
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
		c.mapping.maps[c.mapping.maps.length - 1].forEach((e, n, r, i) => t = i), c.setSelection(Pa(e, f, c.doc.resolve(t)));
	}
	e.focus(), e.dispatch(c.setMeta("uiEvent", "drop"));
}
La.focus = (e) => {
	if (e.input.lastFocus = Date.now(), !e.focused && (e.domObserver.stopped(() => e.dom.classList.add("ProseMirror-focused")), e.focused = !0, e.domSel.read(), !e.domSel.synced)) {
		let t = e.domSel.range;
		setTimeout(() => {
			let n = e.domSel.readRange();
			n && t.eq(n) && e.domSel.sync();
		}, 20);
	}
}, La.blur = (e, t) => {
	let n = t;
	e.focused &&= (e.domObserver.stopped(() => e.dom.classList.remove("ProseMirror-focused")), n.relatedTarget && e.dom.contains(n.relatedTarget) && e.domSel.deactivate(), !1);
}, La.beforeinput = (e, t) => {
	if (Nr && t.inputType == "deleteContentBackward") {
		e.domObserver.flushSoon();
		let { domChangeCount: t } = e.input;
		setTimeout(() => {
			if (e.input.domChangeCount != t || e.domObserver.pendingRecords().length || (e.dom.blur(), e.focus(), Ja(e, "Backspace"))) return;
			let { $cursor: n } = e.state.selection;
			n && n.pos > 0 && e.dispatch(e.state.tr.delete(n.pos - 1, n.pos).scrollIntoView());
		}, 50);
	}
};
for (let e in Ra) La[e] = Ra[e];
function jo(e, t) {
	if (e == t) return !0;
	for (let n in e) if (e[n] !== t[n]) return !1;
	for (let n in t) if (!(n in e)) return !1;
	return !0;
}
var Mo = class {
	constructor(e) {
		this.frag = e, this.index = 0, this.off = 0;
	}
	nodeAt(e) {
		for (; this.off <= e && this.index < this.frag.childCount;) {
			let t = this.frag.child(this.index);
			if (this.off == e) return t;
			this.off += t.nodeSize, this.index++;
		}
		return null;
	}
}, No = class e {
	constructor(e, t) {
		this.toDOM = e, this.spec = t || Ro, this.side = this.spec.side || 0;
	}
	map(e, t, n, r) {
		let { pos: i, deleted: a } = e.mapResult(t.from + r, this.side < 0 ? -1 : 1);
		return a ? null : new Io(i - n, i - n, this);
	}
	valid() {
		return !0;
	}
	eq(t) {
		return this == t || t instanceof e && (this.spec.key && this.spec.key == t.spec.key || this.toDOM == t.toDOM && jo(this.spec, t.spec));
	}
	destroy(e) {
		this.spec.destroy && this.spec.destroy(e);
	}
}, Po = class e {
	constructor(e, t) {
		this.attrs = e, this.spec = t || Ro;
	}
	map(e, t, n, r) {
		let i = e.map(t.from + r, this.spec.inclusiveStart ? -1 : 1) - n, a = e.map(t.to + r, this.spec.inclusiveEnd ? 1 : -1) - n;
		return i >= a ? null : new Io(i, a, this);
	}
	valid(e, t) {
		return t.from < t.to;
	}
	eq(t) {
		return this == t || t instanceof e && jo(this.attrs, t.attrs) && jo(this.spec, t.spec);
	}
	static is(t) {
		return t.type instanceof e;
	}
	destroy() {}
}, Fo = class e {
	constructor(e, t) {
		this.attrs = e, this.spec = t || Ro;
	}
	map(e, t, n, r) {
		let i = e.mapResult(t.from + r, 1);
		if (i.deleted) return null;
		let a = e.mapResult(t.to + r, -1);
		return a.deleted || a.pos <= i.pos ? null : new Io(i.pos - n, a.pos - n, this);
	}
	valid(e, t, n) {
		let r = n.nodeAt(t.from);
		return !!r && !r.isText && t.from + r.nodeSize == t.to;
	}
	eq(t) {
		return this == t || t instanceof e && jo(this.attrs, t.attrs) && jo(this.spec, t.spec);
	}
	destroy() {}
}, Io = class e {
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
		return new e(t, t, new No(n, r));
	}
	static inline(t, n, r, i) {
		return new e(t, n, new Po(r, i));
	}
	static node(t, n, r, i) {
		return new e(t, n, new Fo(r, i));
	}
	get spec() {
		return this.type.spec;
	}
	get inline() {
		return this.type instanceof Po;
	}
	get widget() {
		return this.type instanceof No;
	}
}, Lo = [], Ro = {}, zo = class e {
	constructor(e, t) {
		this.local = e.length ? e : Lo, this.children = t.length ? t : Lo;
	}
	static create(e, t) {
		return t.length ? Ko(t, e, 0, Ro) : W;
	}
	find(e, t, n) {
		let r = [];
		return this.findInner(e ?? 0, t ?? 1e9, r, 0, n), r;
	}
	findInner(e, t, n, r, i) {
		for (let a = 0; a < this.local.length; a++) {
			let o = this.local[a];
			if (o.from > t) break;
			o.to >= e && (!i || i(o.spec)) && n.push(o.copy(o.from + r, o.to + r));
		}
		for (let a = 0; a < this.children.length && !(this.children[a] >= t); a += 3) if (this.children[a + 1] > e) {
			let o = this.children[a] + 1;
			this.children[a + 2].findInner(e - o, t - o, n, r + o, i);
		}
	}
	map(e, t, n) {
		return this == W || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, n || Ro);
	}
	mapInner(t, n, r, i, a) {
		let o;
		if (this.local.length) {
			let e = new Mo(n.content);
			for (let s = 0; s < this.local.length; s++) {
				let c = this.local[s].map(t, r, i);
				c && c.type.valid(n, c, e) ? (o ||= []).push(c) : a.onRemove && a.onRemove(this.local[s].spec);
			}
		}
		return this.children.length ? Vo(this.children, o || [], t, n, r, i, a) : o ? new e(o.sort(qo), Lo) : W;
	}
	add(t, n) {
		return n.length ? this == W ? e.create(t, n) : this.addInner(t, n, 0) : this;
	}
	addInner(t, n, r) {
		let i, a = 0;
		t.forEach((e, t) => {
			let o = t + r, s;
			if (s = Wo(n, e, o)) {
				for (i ||= this.children.slice(); a < i.length && i[a] < t;) a += 3;
				i[a] == t ? i[a + 2] = i[a + 2].addInner(e, s, o + 1) : i.splice(a, 0, t, t + e.nodeSize, Ko(s, e, o + 1, Ro)), a += 3;
			}
		});
		let o = Ho(a ? Go(n) : n, -r).sort(qo);
		if (o.length) {
			let e = new Mo(t.content);
			for (let n = 0; n < o.length; n++) o[n].type.valid(t, o[n], e) || o.splice(n--, 1);
		}
		return new e(o.length ? this.local.concat(o).sort(qo) : this.local, i || this.children);
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
		let r, i, a = 0, o = this.children.length / 3;
		for (; a < o;) {
			let e = a + o >>> 1, n = e * 3, i = this.children[n];
			if (i < t) a = e + 1;
			else if (i > t) o = e;
			else {
				r = this.children[n + 2];
				break;
			}
		}
		let s = t + 1, c = s + n.content.size;
		for (let e = 0; e < this.local.length; e++) {
			let t = this.local[e];
			if (t.from < c && t.to > s && t.type instanceof Po) {
				let e = Math.max(s, t.from) - s, n = Math.min(c, t.to) - s;
				e < n && (i ||= []).push(t.copy(e, n));
			}
		}
		if (i) {
			let t = new e(i.sort(qo), Lo);
			return r ? new Bo([t, r]) : t;
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
		return Jo(this.localsInner(e));
	}
	localsInner(e) {
		if (this == W) return Lo;
		if (e.inlineContent || !this.local.some(Po.is)) return this.local;
		let t = [];
		for (let e = 0; e < this.local.length; e++) this.local[e].type instanceof Po || t.push(this.local[e]);
		return t;
	}
	forEachSet(e) {
		e(this);
	}
};
zo.empty = new zo([], []), zo.removeOverlap = Jo;
var W = zo.empty, Bo = class e {
	constructor(e) {
		this.members = e;
	}
	map(t, n) {
		let r = this.members.map((e) => e.map(t, n, Ro));
		return e.from(r);
	}
	forChild(t, n) {
		if (n.isLeaf) return zo.empty;
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
			if (i.length) {
				if (!t) t = i;
				else {
					n &&= (t = t.slice(), !1);
					for (let e = 0; e < i.length; e++) t.push(i[e]);
				}
			}
		}
		return t ? Jo(n ? t : t.sort(qo)) : Lo;
	}
	static from(t) {
		switch (t.length) {
			case 0: return W;
			case 1: return t[0];
			default: return new e(t.every((e) => e instanceof zo) ? t : t.reduce((e, t) => e.concat(t instanceof zo ? t : t.members), []));
		}
	}
	forEachSet(e) {
		for (let t = 0; t < this.members.length; t++) this.members[t].forEachSet(e);
	}
};
function Vo(e, t, n, r, i, a, o) {
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
		let c = Ko(Uo(s, e, t, n, i, a, o), r, 0, o);
		t = c.local;
		for (let e = 0; e < s.length; e += 3) s[e + 1] < 0 && (s.splice(e, 3), e -= 3);
		for (let e = 0, t = 0; e < c.children.length; e += 3) {
			let n = c.children[e];
			for (; t < s.length && s[t] < n;) t += 3;
			s.splice(t, 0, c.children[e], c.children[e + 1], c.children[e + 2]);
		}
	}
	return new zo(t.sort(qo), s);
}
function Ho(e, t) {
	if (!t || !e.length) return e;
	let n = [];
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		n.push(new Io(i.from + t, i.to + t, i.type));
	}
	return n;
}
function Uo(e, t, n, r, i, a, o) {
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
function Wo(e, t, n) {
	if (t.isLeaf) return null;
	let r = n + t.nodeSize, i = null;
	for (let t = 0, a; t < e.length; t++) (a = e[t]) && a.from > n && a.to < r && ((i ||= []).push(a), e[t] = null);
	return i;
}
function Go(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) e[n] != null && t.push(e[n]);
	return t;
}
function Ko(e, t, n, r) {
	let i = [], a = !1;
	t.forEach((t, o) => {
		let s = Wo(e, t, o + n);
		if (s) {
			a = !0;
			let e = Ko(s, t, n + o + 1, r);
			e != W && i.push(o, o + t.nodeSize, e);
		}
	});
	let o = Ho(a ? Go(e) : e, -n).sort(qo);
	if (o.length) {
		let e = new Mo(t.content);
		for (let n = 0; n < o.length; n++) o[n].type.valid(t, o[n], e) || (r.onRemove && r.onRemove(o[n].spec), o.splice(n--, 1));
	}
	return o.length || i.length ? new zo(o, i) : W;
}
function qo(e, t) {
	return e.from - t.from || e.to - t.to;
}
function Jo(e) {
	let t = e;
	for (let n = 0; n < t.length - 1; n++) {
		let r = t[n];
		if (r.from != r.to) for (let i = n + 1; i < t.length; i++) {
			let a = t[i];
			if (a.from == r.from) a.to != r.to && (t == e && (t = e.slice()), t[i] = a.copy(a.from, r.to), Yo(t, i + 1, a.copy(r.to, a.to)));
			else {
				a.from < r.to && (t == e && (t = e.slice()), t[n] = r.copy(r.from, a.from), Yo(t, i, r.copy(a.from, r.to)));
				break;
			}
		}
	}
	return t;
}
function Yo(e, t, n) {
	for (; t < e.length && qo(n, e[t]) > 0;) t++;
	e.splice(t, 0, n);
}
function Xo(e) {
	let t = [];
	return e.someProp("decorations", (n) => {
		let r = n(e.state);
		r && r != W && t.push(r);
	}), e.cursorWrapper && t.push(zo.create(e.state.doc, [e.cursorWrapper.deco])), Bo.from(t);
}
function Zo(e, t, n, r) {
	let { node: i, fromOffset: a, toOffset: o, from: s, to: c } = e.docView.parseRange(t, n), l = e.domSel.range, u, d = l.anchorNode;
	if (d && fr(e.dom, d) && (u = [{
		node: d,
		offset: l.anchorOffset
	}], _r(l) || u.push({
		node: l.focusNode,
		offset: l.focusOffset
	})), Dr && e.input.lastKeyCode === 8) for (let e = o; e > a; e--) {
		let t = i.childNodes[e - 1], n = t.pmViewDesc;
		if (t.nodeName == "BR" && !n) {
			o = e;
			break;
		}
		if (!n || n.size) break;
	}
	let f = e.state.doc, p = e.someProp("domParser") || $e.fromSchema(e.state.schema), m = f.resolve(s), h = null, g = p.parse(i, {
		topNode: m.parent,
		topMatch: m.parent.contentMatchAt(m.index()),
		topOpen: !0,
		from: a,
		to: o,
		preserveWhitespace: m.parent.type.whitespace != "pre" || "full",
		findPositions: u,
		ruleFromNode: Qo(r),
		context: m
	});
	if (u && u[0].pos != null) {
		let e = u[0].pos, t = u[1] && u[1].pos;
		t ??= e, h = {
			anchor: e + s,
			head: t + s
		};
	}
	return {
		doc: g,
		sel: h,
		from: s,
		to: c
	};
}
var Qo = (e) => (t) => {
	let n = t.pmViewDesc;
	if (n) return n.parseRule(e);
	if (t.nodeName == "BR" && t.parentNode) {
		if (kr && /^(ul|ol)$/i.test(t.parentNode.nodeName)) {
			let e = document.createElement("div");
			return e.appendChild(document.createElement("li")), { skip: e };
		}
		if (t.parentNode.lastChild == t || kr && /^(tr|table)$/i.test(t.parentNode.nodeName)) return { ignore: !0 };
	} else if (t.nodeName == "IMG" && t.getAttribute("mark-placeholder")) return { ignore: !0 };
	return null;
}, $o = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function es(e, t, n, r, i, a) {
	let o = e.input.compositionPendingChanges || (e.composing ? e.input.compositionID : 0);
	if (e.input.compositionPendingChanges = 0, t < 0) {
		let t = e.input.lastSelectionTime > Date.now() - 50 ? e.input.lastSelectionOrigin : null, n = xa(e, e.domSel.range, t);
		if (n && !e.state.selection.eq(n) && e.domSel.active) {
			if (Dr && Nr && e.input.lastKeyCode === 13 && Date.now() - 100 < e.input.lastKeyCodeTime && Ja(e, "Enter")) return;
			let r = e.state.tr.setSelection(n);
			t == "pointer" ? r.setMeta("pointer", !0) : t == "key" && r.scrollIntoView(), o && r.setMeta("composition", o), e.dispatch(r);
		}
		return;
	}
	let s = e.state.doc.resolve(t), c = s.sharedDepth(n);
	t = s.before(c + 1), n = e.state.doc.resolve(n).after(c + 1);
	let l = e.state.selection, u = Zo(e, t, n, a), d = e.state.doc, f = d.slice(u.from, u.to), p, m;
	e.input.lastKeyCode === 8 && Date.now() - 100 < e.input.lastKeyCodeTime ? (p = e.state.selection.to, m = "end") : (p = e.state.selection.from, m = "start"), e.input.lastKeyCode = null;
	let h = ss(f.content, u.doc.content, u.from, p, m);
	if (h && e.input.domChangeCount++, (Ar && e.input.lastIOSEnter > Date.now() - 225 || Nr) && a.some((e) => H(e) && !$o.test(e.nodeName)) && (!h || h.endA >= h.endB) && Ja(e, "Enter")) {
		e.input.lastIOSEnter = 0;
		return;
	}
	if (!h) {
		if (i && l instanceof R && !l.empty && l.$head.sameParent(l.$anchor) && !e.composing && !(u.sel && u.sel.anchor != u.sel.head)) h = {
			start: l.from,
			endA: l.to,
			endB: l.to
		};
		else {
			if (u.sel) {
				let t = ts(e, e.state.doc, u.sel);
				if (t && !t.eq(e.state.selection)) {
					let n = e.state.tr.setSelection(t);
					o && n.setMeta("composition", o), e.dispatch(n);
				}
			}
			return;
		}
	}
	e.state.selection.from < e.state.selection.to && h.start == h.endB && e.state.selection instanceof R && (h.start > e.state.selection.from && h.start <= e.state.selection.from + 2 && e.state.selection.from >= u.from ? h.start = e.state.selection.from : h.endA < e.state.selection.to && h.endA >= e.state.selection.to - 2 && e.state.selection.to <= u.to && (h.endB += e.state.selection.to - h.endA, h.endA = e.state.selection.to));
	let g = u.doc.resolveNoCache(h.start - u.from), _ = u.doc.resolveNoCache(h.endB - u.from), v = d.resolve(h.start), y = g.sameParent(_) && g.parent.inlineContent && v.end() >= h.endA;
	if ((Ar && e.input.lastIOSEnter > Date.now() - 225 && (!y || a.some((e) => e.nodeName == "DIV" || e.nodeName == "P")) || !y && is(u.doc, g.pos, _.pos)) && Ja(e, "Enter")) {
		e.input.lastIOSEnter = 0;
		return;
	}
	if (e.state.selection.anchor > h.start && (y ? h.endA > h.start && h.endB == h.start : rs(d, h.start, h.endA, g, _)) && Ja(e, "Backspace")) {
		Nr && Dr && e.domSel.suppressChanges();
		return;
	}
	Dr && h.endB == h.start && (e.input.lastChromeDelete = Date.now()), Nr && !y && g.start() != _.start() && _.parentOffset == 0 && g.depth == _.depth && u.sel && u.sel.anchor == u.sel.head && u.sel.head == h.endA && (h.endB -= 2, _ = u.doc.resolveNoCache(h.endB - u.from), setTimeout(() => Ja(e, "Enter"), 20));
	let b = h.start, x = h.endA, S = (t) => {
		let n = t || e.state.tr.replace(b, x, u.doc.slice(h.start - u.from, h.endB - u.from));
		if (u.sel) {
			let t = ts(e, n.doc, u.sel);
			t && !(Dr && e.composing && t.empty && (h.start != h.endB || e.input.lastChromeDelete < Date.now() - 100) && (t.head == b || t.head == n.mapping.map(x) - 1)) && n.setSelection(t);
		}
		return o && n.setMeta("composition", o), n.scrollIntoView();
	}, C;
	if (y) {
		if (g.pos == _.pos) {
			let t = S(e.state.tr.delete(b, x)), n = d.resolve(h.start).marksAcross(d.resolve(h.endA));
			n && t.ensureMarks(n), e.dispatch(t);
		} else if (h.endA == h.endB && (C = ns(g.parent.content.cut(g.parentOffset, _.parentOffset), v.parent.content.cut(v.parentOffset, h.endA - v.start())))) {
			let t = S(e.state.tr);
			C.type == "add" ? t.addMark(b, x, C.mark) : t.removeMark(b, x, C.mark), e.dispatch(t);
		} else if (g.parent.child(g.index()).isText && g.index() == _.index() - +!_.textOffset) {
			let t = g.parent.textBetween(g.parentOffset, _.parentOffset), n = () => S(e.state.tr.insertText(t, b, x));
			e.someProp("handleTextInput", (r) => r(e, b, x, t, n)) || e.dispatch(n());
		} else e.dispatch(S());
	} else e.dispatch(S());
}
function ts(e, t, n) {
	return Math.max(n.anchor, n.head) > t.content.size ? null : Pa(e, t.resolve(n.anchor), t.resolve(n.head));
}
function ns(e, t) {
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
function rs(e, t, n, r, i) {
	if (n - t <= i.pos - r.pos || as(r, !0, !1) < i.pos) return !1;
	let a = e.resolve(t);
	if (!r.parent.inlineContent) {
		let e = a.nodeAfter;
		return e != null && n == t + e.nodeSize;
	}
	if (a.parentOffset < a.parent.content.size || !a.parent.isTextblock) return !1;
	let o = e.resolve(as(a, !0, !0));
	return !o.parent.isTextblock || o.pos > n || as(o, !0, !1) < n ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function is(e, t, n) {
	let r = 0, i = 0;
	return e.nodesBetween(t, n, (e, a) => {
		e.isTextblock && a >= t && a < n ? r++ : (e.isText ? /\S/.test(e.text.slice(Math.max(0, t - a), Math.min(e.nodeSize, n - a))) : e.isLeaf) && i++;
	}), i == 0 && r == 1;
}
function as(e, t, n) {
	let r = e.depth, i = t ? e.end() : e.pos;
	for (; r > 0 && (t || e.indexAfter(r) == e.node(r).childCount);) r--, i++, t = !1;
	if (n) {
		let t = e.node(r).maybeChild(e.indexAfter(r));
		for (; t && !t.isLeaf;) t = t.firstChild, i++;
	}
	return i;
}
function ss(e, t, n, r, i) {
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
var cs = {
	childList: !0,
	characterData: !0,
	characterDataOldValue: !0,
	attributes: !0,
	attributeOldValue: !0,
	subtree: !0
}, ls = class {
	constructor(e) {
		this.view = e, this.queue = [], this.flushingSoon = -1, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.started = !1, this.observer = new window.MutationObserver((t) => {
			for (let e = 0; e < t.length; e++) this.queue.push(t[e]);
			kr && e.composing && t.some((e) => e.type == "childList" && e.target.nodeName == "TR") ? (e.input.badSafariComposition = !0, this.flushSoon()) : this.flush();
		});
	}
	flushSoon() {
		this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
			this.flushingSoon = -1, this.flush();
		}, 20));
	}
	forceFlush(e = !1) {
		this.flushingSoon > -1 ? (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush(!0)) : e && this.flush(!0);
	}
	start() {
		this.observer.takeRecords(), this.observer.observe(this.view.dom, cs), this.started = !0;
	}
	stop() {
		let e = this.observer.takeRecords();
		if (e.length) {
			for (let t = 0; t < e.length; t++) this.queue.push(e[t]);
			window.setTimeout(() => this.flush(), 20);
		}
		this.observer.disconnect(), this.started = !1;
	}
	stopped(e) {
		if (!this.started) return e();
		this.stop();
		try {
			return e();
		} finally {
			this.start();
		}
	}
	ignoreSelectionChange(e) {
		if (!e.focusNode) return !0;
		let t = /* @__PURE__ */ new Set(), n;
		for (let n = e.focusNode; n; n = ar(n)) t.add(n);
		for (let r = e.anchorNode; r; r = ar(r)) if (t.has(r)) {
			n = r;
			break;
		}
		let r = n && this.view.docView.nearestDesc(n);
		if (r && r.ignoreMutation({
			type: "selection",
			target: U(n) ? n.parentNode : n
		})) return this.view.domSel.ignore(e), !0;
	}
	pendingRecords() {
		for (let e of this.observer.takeRecords()) this.queue.push(e);
		return this.queue;
	}
	flush(e = !0) {
		let { view: t } = this;
		if (!t.docView || this.flushingSoon > -1) return;
		let n = this.pendingRecords();
		n.length && (this.queue = []), e && t.domSel.read();
		let r = !t.domSel.suppress && !t.domSel.synced && !!Fa(t) && !this.ignoreSelectionChange(t.domSel.range), i = -1, a = -1, o = !1, s = [];
		if (t.editable) for (let e = 0; e < n.length; e++) {
			let t = this.registerMutation(n[e], s);
			t && (i = i < 0 ? t.from : Math.min(t.from, i), a = a < 0 ? t.to : Math.max(t.to, a), t.typeOver && (o = !0));
		}
		if (s.some((e) => e.nodeName == "BR") && (t.input.lastKeyCode == 8 || t.input.lastKeyCode == 46 || Dr && (t.composing || t.input.compositionEndedAt > Date.now() - 50) && n.some((e) => e.type == "childList" && e.removedNodes.length))) {
			for (let e of s) if (e.nodeName == "BR" && e.parentNode) {
				let t = e.nextSibling;
				for (; t && H(t);) {
					if (t.contentEditable == "false") {
						e.parentNode.removeChild(e);
						break;
					}
					t = t.firstChild;
				}
			}
		} else if (Tr && s.length) {
			let e = s.filter((e) => e.nodeName == "BR");
			if (e.length == 2) {
				let [t, n] = e;
				t.parentNode && t.parentNode.parentNode == n.parentNode ? n.remove() : t.remove();
			} else {
				let { focusNode: n } = t.domSel.range;
				for (let r of e) {
					let e = r.parentNode;
					e && e.nodeName == "LI" && (!n || ps(t, n) != e) && r.remove();
				}
			}
		}
		let c = null;
		i < 0 && r && t.domSel.active && t.input.lastFocus > Date.now() - 200 && Math.max(t.input.lastTouch, t.input.lastClick.time) < Date.now() - 300 && _r(t.domSel.range) && (c = xa(t, t.domSel.range)) && c.eq(L.near(t.state.doc.resolve(0), 1)) ? (t.input.lastFocus = 0, t.domSel.sync(), t.scrollToSelection()) : (i > -1 || r) && (i > -1 && fs(t), t.input.badSafariComposition && (t.input.badSafariComposition = !1, ms(t, s)), es(this.view, i, a, r, o, s), t.docView && t.docView.damage ? t.updateState(t.state) : r && t.domSel.sync());
	}
	registerMutation(e, t) {
		if (t.indexOf(e.target) > -1) return null;
		let n;
		for (let t = e.target; t && !(n = this.view.docView.getDesc(t)); t = t.parentNode);
		if (e.type == "attributes" && (n == this.view.docView || e.attributeName == "contenteditable" || e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !n || n.ignoreMutation(e)) return null;
		if (e.type == "childList") {
			for (let n = 0; n < e.addedNodes.length; n++) {
				let r = e.addedNodes[n];
				t.push(r), U(r) && (this.lastChangedTextNode = r);
			}
			if (n.contentDOM && n.contentDOM != n.dom && !n.contentDOM.contains(e.target)) return n.markDamage(4), {
				from: n.posBefore,
				to: n.posAfter
			};
			let r = e.previousSibling, i = e.nextSibling, a = r && r.parentNode == e.target ? ir(r) + 1 : 0, o = n.localPosFromDOM(e.target, a, -1), s = i && i.parentNode == e.target ? ir(i) : e.target.childNodes.length, c = n.localPosFromDOM(e.target, s, 1);
			return n.markDamage(n.contentDOM?.contains(e.target) ? 2 : 4), {
				from: o,
				to: c
			};
		}
		return e.type == "attributes" ? (n.markDamage(4), {
			from: n.posAtStart - n.border,
			to: n.posAtEnd + n.border
		}) : (this.lastChangedTextNode = e.target, n.markDamage(n instanceof bi && e.target == n.nodeDOM ? 8 : 4), {
			from: n.posAtStart,
			to: n.posAtEnd,
			typeOver: e.target.nodeValue == e.oldValue
		});
	}
}, us = /* @__PURE__ */ new WeakMap(), ds = !1;
function fs(e) {
	if (!us.has(e) && (us.set(e, null), [
		"normal",
		"nowrap",
		"pre-line"
	].indexOf(getComputedStyle(e.dom).whiteSpace) !== -1)) {
		if (e.requiresGeckoHackNode = Tr, ds) return;
		console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), ds = !0;
	}
}
function ps(e, t) {
	for (let n = t.parentNode; n && n != e.dom; n = n.parentNode) {
		let t = e.docView.nearestDesc(n, !0);
		if (t && t.node.isBlock) return n;
	}
	return null;
}
function ms(e, t) {
	let { focusNode: n, focusOffset: r } = e.domSel.range;
	for (let i of t) if (i.parentNode?.nodeName == "TR") {
		let t = i.nextSibling;
		for (; t && t.nodeName != "TD" && t.nodeName != "TH";) t = t.nextSibling;
		if (t) {
			let a = t;
			for (;;) {
				let e = a.firstChild;
				if (!e || !H(e) || e.contentEditable == "false" || /^(BR|IMG)$/.test(e.nodeName)) break;
				a = e;
			}
			a.insertBefore(i, a.firstChild), n == i && e.domSelection().collapse(i, r);
		} else i.parentNode.removeChild(i);
	}
}
var hs = class {
	constructor(e, t) {
		this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new Ba(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(Ss), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = vs(this), _s(this), this.nodeViews = bs(this), this.docView = yi(this.state.doc, gs(this), Xo(this), this.dom, this), this.domObserver = new ls(this), this.domSel = new va(this), this.domObserver.start(), this.domSel.read(), Va(this), this.updatePluginViews();
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
		this._props = e, e.plugins && (e.plugins.forEach(Ss), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
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
		e.storedMarks && this.composing && (vo(this), i = !0), this.state = e;
		let a = n.plugins != e.plugins || this._props.plugins != t.plugins;
		if (a || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
			let e = bs(this);
			xs(e, this.nodeViews) && (this.nodeViews = e, r = !0);
		}
		(a || t.handleDOMEvents != this._props.handleDOMEvents) && Wa(this), this.editable = vs(this), _s(this);
		let o = Xo(this), s = gs(this), c = n.plugins != e.plugins && !n.doc.eq(e.doc) ? "reset" : e.scrollToSelection > n.scrollToSelection ? "to selection" : "preserve", l = r || !this.docView.matchesNode(e.doc, s, o);
		(l || !e.selection.eq(n.selection)) && (i = !0);
		let u = c == "preserve" && i && this.dom.style.overflowAnchor == null && Br(this);
		i && this.domObserver.stopped(() => {
			let t = l && Dr && !this.composing && !n.selection.empty && !e.selection.empty && ys(n.selection, e.selection);
			if (l) {
				let n = Dr ? this.trackWrites = this.domSel.range.focusNode : null;
				if (this.composing && (this.input.compositionNode = yo(this)), r || !this.docView.update(e.doc, s, o, this, -1)) {
					let t = this.docView.outerDeco;
					this.docView.destroy(), this.docView = yi(e.doc, s, o, this.dom, this, t);
				}
				!n || this.trackWrites && this.dom.contains(this.trackWrites) || (t = !0);
			}
			this.domSel.sync(t);
		}), this.updatePluginViews(n), this.dragging?.node && !n.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, n), c == "reset" ? this.dom.scrollTop = 0 : c == "to selection" ? this.scrollToSelection() : u && Hr(u);
	}
	scrollToSelection() {
		let e = this.domSel.range.focusNode;
		if (e && this.domSel.active && !this.someProp("handleScrollToSelection", (e) => e(this))) {
			if (this.state.selection instanceof z) {
				let t = this.docView.domAfterPos(this.state.selection.from);
				H(t) && zr(this, t.getBoundingClientRect(), e);
			} else zr(this, this.coordsAtPos(this.state.selection.head, 1), e);
		}
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
		this.dragging = new Do(e.slice, e.move, r < 0 ? void 0 : z.create(this.state.doc, r));
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
		return this.root.activeElement == this.dom;
	}
	focus() {
		this.editable && Gr(this.dom), this.domSel.sync();
	}
	get root() {
		let e = this.dom.isConnected !== !1;
		e || (this._root = null);
		let t = this._root;
		if (t == null && e) {
			for (let e = this.dom.parentNode; e; e = e.parentNode) if (e.nodeType == 9 || e.nodeType == 11 && e.host) return e.getSelection || (Object.getPrototypeOf(e).getSelection = () => e.ownerDocument.getSelection()), this._root = e;
		}
		return t || document;
	}
	updateRoot() {
		this._root = null;
	}
	posAtCoords(e) {
		return $r(this, e);
	}
	coordsAtPos(e, t = 1) {
		return ri(this, e, t);
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
		return pi(this, t || this.state, e);
	}
	pasteHTML(e, t) {
		return To(this, "", e, !1, t || new ClipboardEvent("paste"));
	}
	pasteText(e, t) {
		return To(this, e, null, !0, t || new ClipboardEvent("paste"));
	}
	serializeForClipboard(e) {
		return ta(this, e);
	}
	destroy() {
		this.docView && (Ua(this), this.domSel.destroy(), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], Xo(this), this, -1), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, cr());
	}
	get isDestroyed() {
		return this.docView == null;
	}
	dispatchEvent(e) {
		return qa(this, e);
	}
	domSelection() {
		return this.root.getSelection();
	}
};
hs.prototype.dispatch = function(e) {
	let t = this._props.dispatchTransaction;
	t ? t.call(this, e) : this.updateState(this.state.apply(e));
};
function gs(e) {
	let t = Object.create(null);
	return t.class = "ProseMirror", t.contenteditable = String(e.editable), e.someProp("attributes", (n) => {
		if (typeof n == "function" && (n = n(e.state)), n) for (let e in n) e == "class" ? t.class += " " + n[e] : e == "style" ? t.style = (t.style ? t.style + ";" : "") + n[e] : !t[e] && e != "contenteditable" && e != "nodeName" && (t[e] = String(n[e]));
	}), t.translate ||= "no", [Io.node(0, e.state.doc.content.size, t)];
}
function _s(e) {
	if (e.markCursor) {
		let t = document.createElement("img");
		t.className = "ProseMirror-separator", t.setAttribute("mark-placeholder", "true"), t.setAttribute("alt", ""), e.cursorWrapper = {
			dom: t,
			deco: Io.widget(e.state.selection.from, t, {
				raw: !0,
				marks: e.markCursor
			})
		};
	} else e.cursorWrapper = null;
}
function vs(e) {
	return !e.someProp("editable", (t) => t(e.state) === !1);
}
function ys(e, t) {
	let n = Math.min(e.$anchor.sharedDepth(e.head), t.$anchor.sharedDepth(t.head));
	return e.$anchor.start(n) != t.$anchor.start(n);
}
function bs(e) {
	let t = Object.create(null);
	function n(e) {
		for (let n in e) Object.prototype.hasOwnProperty.call(t, n) || (t[n] = e[n]);
	}
	return e.someProp("nodeViews", n), e.someProp("markViews", n), t;
}
function xs(e, t) {
	let n = 0, r = 0;
	for (let r in e) {
		if (e[r] != t[r]) return !0;
		n++;
	}
	for (let e in t) r++;
	return n != r;
}
function Ss(e) {
	if (e.spec.state || e.spec.filterTransaction || e.spec.appendTransaction) throw RangeError("Plugins passed directly to the view must not have a state component");
}
for (var Cs = {
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
}, ws = {
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
}, Ts = typeof navigator < "u" && /Mac/.test(navigator.platform), Es = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), Ds = 0; Ds < 10; Ds++) Cs[48 + Ds] = Cs[96 + Ds] = String(Ds);
for (var Ds = 1; Ds <= 24; Ds++) Cs[Ds + 111] = "F" + Ds;
for (var Ds = 65; Ds <= 90; Ds++) Cs[Ds] = String.fromCharCode(Ds + 32), ws[Ds] = String.fromCharCode(Ds);
for (var Os in Cs) ws.hasOwnProperty(Os) || (ws[Os] = Cs[Os]);
function ks(e) {
	var t = !(Ts && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey || Es && e.shiftKey && e.key && e.key.length == 1 || e.key == "Unidentified") && e.key || (e.shiftKey ? ws : Cs)[e.keyCode] || e.key || "Unidentified";
	return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
// node_modules/prosemirror-keymap/dist/index.js
var As = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), js = typeof navigator < "u" && /Win/.test(navigator.platform);
function Ms(e) {
	let t = e.split(/-(?!$)/), n = t[t.length - 1];
	n == "Space" && (n = " ");
	let r, i, a, o;
	for (let e = 0; e < t.length - 1; e++) {
		let n = t[e];
		if (/^(cmd|meta|m)$/i.test(n)) o = !0;
		else if (/^a(lt)?$/i.test(n)) r = !0;
		else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
		else if (/^s(hift)?$/i.test(n)) a = !0;
		else if (/^mod$/i.test(n)) As ? o = !0 : i = !0;
		else throw Error("Unrecognized modifier name: " + n);
	}
	return r && (n = "Alt-" + n), i && (n = "Ctrl-" + n), o && (n = "Meta-" + n), a && (n = "Shift-" + n), n;
}
function Ns(e) {
	let t = Object.create(null);
	for (let n in e) t[Ms(n)] = e[n];
	return t;
}
function Ps(e, t, n = !0) {
	return t.altKey && (e = "Alt-" + e), t.ctrlKey && (e = "Ctrl-" + e), t.metaKey && (e = "Meta-" + e), n && t.shiftKey && (e = "Shift-" + e), e;
}
function Fs(e) {
	return new B({ props: { handleKeyDown: Is(e) } });
}
function Is(e) {
	let t = Ns(e);
	return function(e, n) {
		let r = ks(n), i, a = t[Ps(r, n)];
		if (a && a(e.state, e.dispatch, e)) return !0;
		if (r.length == 1 && r != " ") {
			if (n.shiftKey) {
				let i = t[Ps(r, n, !1)];
				if (i && i(e.state, e.dispatch, e)) return !0;
			}
			if ((n.altKey || n.metaKey || n.ctrlKey) && !(js && n.ctrlKey && n.altKey) && (i = Cs[n.keyCode]) && i != r) {
				let r = t[Ps(i, n)];
				if (r && r(e.state, e.dispatch, e)) return !0;
			}
		}
		return !1;
	};
}
// node_modules/prosemirror-commands/dist/index.js
var Ls = (e, t) => !e.selection.empty && (t && t(e.tr.deleteSelection().scrollIntoView()), !0);
function Rs(e, t) {
	let { $cursor: n } = e.selection;
	return !n || (t ? !t.endOfTextblock("backward", e) : n.parentOffset > 0) ? null : n;
}
var zs = (e, t, n) => {
	let r = Rs(e, n);
	if (!r) return !1;
	let i = Gs(r);
	if (!i) {
		let n = r.blockRange(), i = n && qt(n);
		return i != null && (t && t(e.tr.lift(n, i).scrollIntoView()), !0);
	}
	let a = i.nodeBefore;
	if (lc(e, i, t, -1)) return !0;
	if (r.parent.content.size == 0 && (Us(a, "end") || z.isSelectable(a))) for (let n = r.depth;; n--) {
		let o = hn(e.doc, r.before(n), r.after(n), P.empty);
		if (o && o.slice.size < o.to - o.from) {
			if (t) {
				let n = e.tr.step(o);
				n.setSelection(Us(a, "end") ? L.findFrom(n.doc.resolve(n.mapping.map(i.pos, -1)), -1) : z.create(n.doc, i.pos - a.nodeSize)), t(n.scrollIntoView());
			}
			return !0;
		}
		if (n == 1 || r.node(n - 1).childCount > 1) break;
	}
	return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos - a.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Bs = (e, t, n) => {
	let r = Rs(e, n);
	if (!r) return !1;
	let i = Gs(r);
	return i ? Hs(e, i, t) : !1;
}, Vs = (e, t, n) => {
	let r = Ks(e, n);
	if (!r) return !1;
	let i = Ys(r);
	return i ? Hs(e, i, t) : !1;
};
function Hs(e, t, n) {
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
	let s = hn(e.doc, i, o, P.empty);
	if (!s || s.from != i || s instanceof Bt && s.slice.size >= o - i) return !1;
	if (n) {
		let t = e.tr.step(s);
		t.setSelection(R.create(t.doc, i)), n(t.scrollIntoView());
	}
	return !0;
}
function Us(e, t, n = !1) {
	for (let r = e; r; r = t == "start" ? r.firstChild : r.lastChild) {
		if (r.isTextblock) return !0;
		if (n && r.childCount != 1) return !1;
	}
	return !1;
}
var Ws = (e, t, n) => {
	let { $head: r, empty: i } = e.selection, a = r;
	if (!i) return !1;
	if (r.parent.isTextblock) {
		if (n ? !n.endOfTextblock("backward", e) : r.parentOffset > 0) return !1;
		a = Gs(r);
	}
	let o = a && a.nodeBefore;
	return !o || !z.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(z.create(e.doc, a.pos - o.nodeSize)).scrollIntoView()), !0);
};
function Gs(e) {
	if (!e.parent.type.spec.isolating) for (let t = e.depth - 1; t >= 0; t--) {
		if (e.index(t) > 0) return e.doc.resolve(e.before(t + 1));
		if (e.node(t).type.spec.isolating) break;
	}
	return null;
}
function Ks(e, t) {
	let { $cursor: n } = e.selection;
	return !n || (t ? !t.endOfTextblock("forward", e) : n.parentOffset < n.parent.content.size) ? null : n;
}
var qs = (e, t, n) => {
	let r = Ks(e, n);
	if (!r) return !1;
	let i = Ys(r);
	if (!i) return !1;
	let a = i.nodeAfter;
	if (lc(e, i, t, 1)) return !0;
	if (r.parent.content.size == 0 && (Us(a, "start") || z.isSelectable(a))) {
		let n = hn(e.doc, r.before(), r.after(), P.empty);
		if (n && n.slice.size < n.to - n.from) {
			if (t) {
				let r = e.tr.step(n);
				r.setSelection(Us(a, "start") ? L.findFrom(r.doc.resolve(r.mapping.map(i.pos)), 1) : z.create(r.doc, r.mapping.map(i.pos))), t(r.scrollIntoView());
			}
			return !0;
		}
	}
	return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos, i.pos + a.nodeSize).scrollIntoView()), !0) : !1;
}, Js = (e, t, n) => {
	let { $head: r, empty: i } = e.selection, a = r;
	if (!i) return !1;
	if (r.parent.isTextblock) {
		if (n ? !n.endOfTextblock("forward", e) : r.parentOffset < r.parent.content.size) return !1;
		a = Ys(r);
	}
	let o = a && a.nodeAfter;
	return !o || !z.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(z.create(e.doc, a.pos)).scrollIntoView()), !0);
};
function Ys(e) {
	if (!e.parent.type.spec.isolating) for (let t = e.depth - 1; t >= 0; t--) {
		let n = e.node(t);
		if (e.index(t) + 1 < n.childCount) return e.doc.resolve(e.after(t + 1));
		if (n.type.spec.isolating) break;
	}
	return null;
}
var Xs = (e, t) => {
	let n = e.selection, r = n instanceof z, i;
	if (r) {
		if (n.node.isTextblock || !cn(e.doc, n.from)) return !1;
		i = n.from;
	} else if (i = dn(e.doc, n.from, -1), i == null) return !1;
	if (t) {
		let n = e.tr.join(i);
		r && n.setSelection(z.create(n.doc, i - e.doc.resolve(i).nodeBefore.nodeSize)), t(n.scrollIntoView());
	}
	return !0;
}, Zs = (e, t) => {
	let n = e.selection, r;
	if (n instanceof z) {
		if (n.node.isTextblock || !cn(e.doc, n.to)) return !1;
		r = n.to;
	} else if (r = dn(e.doc, n.to, 1), r == null) return !1;
	return t && t(e.tr.join(r).scrollIntoView()), !0;
}, Qs = (e, t) => {
	let { $from: n, $to: r } = e.selection, i = n.blockRange(r), a = i && qt(i);
	return a != null && (t && t(e.tr.lift(i, a).scrollIntoView()), !0);
}, $s = (e, t) => {
	let { $head: n, $anchor: r } = e.selection;
	return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (t && t(e.tr.insertText("\n").scrollIntoView()), !0);
};
function ec(e) {
	for (let t = 0; t < e.edgeCount; t++) {
		let { type: n } = e.edge(t);
		if (n.isTextblock && !n.hasRequiredAttrs()) return n;
	}
	return null;
}
var tc = (e, t) => {
	let { $head: n, $anchor: r } = e.selection;
	if (!n.parent.type.spec.code || !n.sameParent(r)) return !1;
	let i = n.node(-1), a = n.indexAfter(-1), o = ec(i.contentMatchAt(a));
	if (!o || !i.canReplaceWith(a, a, o)) return !1;
	if (t) {
		let r = n.after(), i = e.tr.replaceWith(r, r, o.createAndFill());
		i.setSelection(L.near(i.doc.resolve(r), 1)), t(i.scrollIntoView());
	}
	return !0;
}, nc = (e, t) => {
	let n = e.selection, { $from: r, $to: i } = n;
	if (n instanceof Vn || r.parent.inlineContent || i.parent.inlineContent) return !1;
	let a = ec(i.parent.contentMatchAt(i.indexAfter()));
	if (!a || !a.isTextblock) return !1;
	if (t) {
		let n = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, o = e.tr.insert(n, a.createAndFill());
		o.setSelection(R.create(o.doc, n + 1)), t(o.scrollIntoView());
	}
	return !0;
}, rc = (e, t) => {
	let { $cursor: n } = e.selection;
	if (!n || n.parent.content.size) return !1;
	if (n.depth > 1 && n.after() != n.end(-1)) {
		let r = n.before();
		if (on(e.doc, r)) return t && t(e.tr.split(r).scrollIntoView()), !0;
	}
	let r = n.blockRange(), i = r && qt(r);
	return i != null && (t && t(e.tr.lift(r, i).scrollIntoView()), !0);
};
function ic(e) {
	return (t, n) => {
		if (t.selection instanceof z && t.selection.node.isBlock) {
			let { $from: e } = t.selection;
			return !e.parentOffset || !on(t.doc, e.pos) ? !1 : (n && n(t.tr.split(e.pos).scrollIntoView()), !0);
		}
		if (!t.selection.$from.depth) return !1;
		let r = t.tr;
		!t.selection.empty && (t.selection instanceof R || t.selection instanceof Vn) && r.deleteSelection();
		let { $from: i } = r.selection, a = r.steps.length, o = [], s, c, l = !1, u = !1;
		for (let t = i.depth;; t--) if (i.node(t).isBlock) {
			l = i.end(t) == i.pos + (i.depth - t), u = i.start(t) == i.pos - (i.depth - t), c = ec(i.node(t - 1).contentMatchAt(i.indexAfter(t - 1)));
			let n = e && e(i.parent, l, i);
			o.unshift(n || (l && c ? { type: c } : null)), s = t;
			break;
		} else {
			if (t == 1) return !1;
			o.unshift(null);
		}
		let d = i.pos, f = on(r.doc, d, o.length, o);
		if (f ||= (o[0] = c ? { type: c } : null, on(r.doc, d, o.length, o)), !f) return !1;
		if (r.split(d, o.length, o), !l && u && i.node(s).type != c) {
			let e = r.mapping.slice(a), t = e.map(i.before(s)), n = r.doc.resolve(t);
			c && i.node(s - 1).canReplaceWith(n.index(), n.index() + 1, c) && r.setNodeMarkup(e.map(i.before(s)), c);
		}
		return n && n(r.scrollIntoView()), !0;
	};
}
var ac = ic(), oc = (e, t) => {
	let { $from: n, to: r } = e.selection, i, a = n.sharedDepth(r);
	return a != 0 && (i = n.before(a), t && t(e.tr.setSelection(z.create(e.doc, i))), !0);
}, sc = (e, t) => (t && t(e.tr.setSelection(new Vn(e.doc))), !0);
function cc(e, t, n) {
	let r = t.nodeBefore, i = t.nodeAfter, a = t.index();
	return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && t.parent.canReplace(a - 1, a) ? (n && n(e.tr.delete(t.pos - r.nodeSize, t.pos).scrollIntoView()), !0) : !t.parent.canReplace(a, a + 1) || !(i.isTextblock || cn(e.doc, t.pos)) ? !1 : (n && n(e.tr.join(t.pos).scrollIntoView()), !0);
}
function lc(e, t, n, r) {
	let i = t.nodeBefore, a = t.nodeAfter, o, s, c = i.type.spec.isolating || a.type.spec.isolating;
	if (!c && cc(e, t, n)) return !0;
	let l = !c && t.parent.canReplace(t.index(), t.index() + 1);
	if (l && (o = (s = i.contentMatchAt(i.childCount)).findWrapping(a.type)) && s.matchType(o[0] || a.type).validEnd) {
		if (n) {
			let r = t.pos + a.nodeSize, s = M.empty;
			for (let e = o.length - 1; e >= 0; e--) s = M.from(o[e].create(null, s));
			s = M.from(i.copy(s));
			let c = e.tr.step(new Vt(t.pos - 1, r, t.pos, r, new P(s, 1, 0), o.length, !0)), l = c.doc.resolve(r + 2 * o.length);
			l.nodeAfter && l.nodeAfter.type == i.type && cn(c.doc, l.pos) && c.join(l.pos), n(c.scrollIntoView());
		}
		return !0;
	}
	let u = a.type.spec.isolating || r > 0 && c ? null : L.findFrom(t, 1), d = u && u.$from.blockRange(u.$to), f = d && qt(d);
	if (f != null && f >= t.depth) return n && n(e.tr.lift(d, f).scrollIntoView()), !0;
	if (l && Us(a, "start", !0) && Us(i, "end")) {
		let r = i, o = [];
		for (; o.push(r), !r.isTextblock;) r = r.lastChild;
		let s = a, c = 1;
		for (; !s.isTextblock; s = s.firstChild) c++;
		if (r.canReplace(r.childCount, r.childCount, s.content)) {
			if (n) {
				let r = M.empty;
				for (let e = o.length - 1; e >= 0; e--) r = M.from(o[e].copy(r));
				n(e.tr.step(new Vt(t.pos - o.length, t.pos + a.nodeSize, t.pos + c, t.pos + a.nodeSize - c, new P(r, o.length, 0), 0, !0)).scrollIntoView());
			}
			return !0;
		}
	}
	return !1;
}
function uc(e) {
	return function(t, n) {
		let r = t.selection, i = e < 0 ? r.$from : r.$to, a = i.depth;
		for (; i.node(a).isInline;) {
			if (!a) return !1;
			a--;
		}
		return i.node(a).isTextblock ? (n && n(t.tr.setSelection(R.create(t.doc, e < 0 ? i.start(a) : i.end(a)))), !0) : !1;
	};
}
var dc = uc(-1), fc = uc(1);
function pc(e, t = null) {
	return function(n, r) {
		let { $from: i, $to: a } = n.selection, o = i.blockRange(a), s = o && Yt(o, e, t);
		return s ? (r && r(n.tr.wrap(o, s).scrollIntoView()), !0) : !1;
	};
}
function mc(e, t = null) {
	return function(n, r) {
		let i = !1;
		for (let r = 0; r < n.selection.ranges.length && !i; r++) {
			let { $from: { pos: a }, $to: { pos: o } } = n.selection.ranges[r];
			n.doc.nodesBetween(a, o, (r, a) => {
				if (i) return !1;
				if (r.isTextblock && !r.hasMarkup(e, t)) {
					if (r.type == e) i = !0;
					else {
						let t = n.doc.resolve(a), r = t.index();
						i = t.parent.canReplaceWith(r, r + 1, e);
					}
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
function hc(...e) {
	return function(t, n, r) {
		for (let i = 0; i < e.length; i++) if (e[i](t, n, r)) return !0;
		return !1;
	};
}
var gc = hc(Ls, zs, Ws), _c = hc(Ls, qs, Js), vc = {
	Enter: hc($s, nc, rc, ac),
	"Mod-Enter": tc,
	Backspace: gc,
	"Mod-Backspace": gc,
	"Shift-Backspace": gc,
	Delete: _c,
	"Mod-Delete": _c,
	"Mod-a": sc
}, yc = {
	"Ctrl-h": vc.Backspace,
	"Alt-Backspace": vc["Mod-Backspace"],
	"Ctrl-d": vc.Delete,
	"Ctrl-Alt-Backspace": vc["Mod-Delete"],
	"Alt-Delete": vc["Mod-Delete"],
	"Alt-d": vc["Mod-Delete"],
	"Ctrl-a": dc,
	"Ctrl-e": fc
};
for (let e in vc) yc[e] = vc[e];
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform();
// node_modules/prosemirror-schema-list/dist/index.js
function bc(e, t = null) {
	return function(n, r) {
		let { $from: i, $to: a } = n.selection, o = i.blockRange(a);
		if (!o) return !1;
		let s = r ? n.tr : null;
		return xc(s, o, e, t) ? (r && r(s.scrollIntoView()), !0) : !1;
	};
}
function xc(e, t, n, r = null) {
	let i = !1, a = t, o = t.$from.doc;
	if (t.depth >= 2 && t.$from.node(t.depth - 1).type.compatibleContent(n) && t.startIndex == 0) {
		if (t.$from.index(t.depth - 1) == 0) return !1;
		let e = o.resolve(t.start - 2);
		a = new xe(e, e, t.depth), t.endIndex < t.parent.childCount && (t = new xe(t.$from, o.resolve(t.$to.end(t.depth)), t.depth)), i = !0;
	}
	let s = Yt(a, n, r, t);
	return s ? (e && Sc(e, t, s, i, n), !0) : !1;
}
function Sc(e, t, n, r, i) {
	let a = M.empty;
	for (let e = n.length - 1; e >= 0; e--) a = M.from(n[e].type.create(n[e].attrs, a));
	e.step(new Vt(t.start - (r ? 2 : 0), t.end, t.start, t.end, new P(a, 0, 0), n.length, !0));
	let o = 0;
	for (let e = 0; e < n.length; e++) n[e].type == i && (o = e + 1);
	let s = n.length - o, c = t.start + n.length - (r ? 2 : 0), l = t.parent;
	for (let n = t.startIndex, r = t.endIndex, i = !0; n < r; n++, i = !1) !i && s && on(e.doc, c, s) && (e.split(c, s), c += 2 * s), c += l.child(n).nodeSize;
	return e;
}
function Cc(e, t) {
	return e instanceof Ge ? t == e : e.indexOf(t) > -1;
}
function wc(e) {
	return function(t, n) {
		let { $from: r, $to: i } = t.selection, a = r.blockRange(i, (t) => t.childCount > 0 && Cc(e, t.firstChild.type));
		return a ? n ? Cc(e, r.node(a.depth - 1).type) ? Tc(t, n, a) : Ec(t, n, a) : !0 : !1;
	};
}
function Tc(e, t, n) {
	let r = e.tr, i = n.end, a = n.$to.end(n.depth), o = n.parent.child(n.endIndex - 1).type;
	i < a && (r.step(new Vt(i - 1, a, i, a, new P(M.from(o.create(null, n.parent.copy())), 1, 0), 1, !0)), n = new xe(r.doc.resolve(n.$from.pos), r.doc.resolve(a), n.depth));
	let s = qt(n);
	if (s == null) return !1;
	r.lift(n, s);
	let c = r.doc.resolve(r.mapping.map(i, -1) - 1);
	return cn(r.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && r.join(c.pos), t(r.scrollIntoView()), !0;
}
function Ec(e, t, n) {
	let r = e.tr, i = n.parent;
	for (let e = n.end, t = n.endIndex - 1, a = n.startIndex; t > a; t--) e -= i.child(t).nodeSize, r.delete(e - 1, e + 1);
	let a = r.doc.resolve(n.start), o = a.nodeAfter;
	if (r.mapping.map(n.end) != n.start + a.nodeAfter.nodeSize) return !1;
	let s = n.startIndex == 0, c = n.endIndex == i.childCount, l = a.node(-1), u = a.index(-1);
	if (!l.canReplace(u + +!s, u + 1, o.content.append(c ? M.empty : M.from(i)))) return !1;
	let d = a.pos, f = d + o.nodeSize;
	return r.step(new Vt(d - +!!s, f + +!!c, d + 1, f - 1, new P((s ? M.empty : M.from(i.copy(M.empty))).append(c ? M.empty : M.from(i.copy(M.empty))), +!s, +!c), +!s)), t(r.scrollIntoView()), !0;
}
function Dc(e) {
	return function(t, n) {
		let { $from: r, $to: i } = t.selection, a = r.blockRange(i, (t) => t.childCount > 0 && Cc(e, t.firstChild.type));
		if (!a) return !1;
		let o = a.startIndex;
		if (o == 0) return !1;
		let s = a.parent, c = s.child(o - 1);
		if (!Cc(e, c.type)) return !1;
		if (n) {
			let e = c.lastChild && c.lastChild.type == s.type, r = M.from(e ? c.lastChild.lastChild.type.create() : null), i = new P(M.from(c.type.create(null, M.from(s.type.create(null, r)))), e ? 3 : 1, 0), o = a.start, l = a.end;
			n(t.tr.step(new Vt(o - (e ? 3 : 1), l, o, l, i, 1, !0)).scrollIntoView());
		}
		return !0;
	};
}
// node_modules/@tiptap/core/dist/index.js
function Oc(e) {
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
var kc = class {
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
			state: Oc({
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
}, Ac = class {
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
function jc(e) {
	return {
		baseExtensions: e.filter((e) => e.type === "extension"),
		nodeExtensions: e.filter((e) => e.type === "node"),
		markExtensions: e.filter((e) => e.type === "mark")
	};
}
function Mc(e) {
	let t = [], { nodeExtensions: n, markExtensions: r } = jc(e), i = [...n, ...r], a = {
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
			if (e === "__proto__") Object.defineProperty(n, e, {
				configurable: !0,
				enumerable: !0,
				value: t,
				writable: !0
			});
			else if (!n[e]) n[e] = t;
			else if (e === "class") {
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
function Nc(e, t) {
	return t.filter((t) => t.type === e.type.name).filter((e) => e.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(e.attrs) || {} : { [t.name]: e.attrs[t.name] }).reduce((e, t) => q(e, t), {});
}
function Pc(e) {
	return typeof e == "function";
}
function J(e, t = void 0, ...n) {
	return Pc(e) ? t ? e.bind(t)(...n) : e(...n) : e;
}
function Fc(e = {}) {
	return Object.keys(e).length === 0 && e.constructor === Object;
}
function Ic(e) {
	return typeof e == "string" ? e.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(e) : e === "true" || e !== "false" && e : e;
}
function Lc(e, t) {
	return "style" in e ? e : {
		...e,
		getAttrs: (n) => {
			let r = e.getAttrs ? e.getAttrs(n) : e.attrs;
			if (r === !1) return !1;
			let i = t.reduce((e, t) => {
				let r = t.attribute.parseHTML ? t.attribute.parseHTML(n) : Ic(n.getAttribute(t.name));
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
function Rc(e) {
	return Object.fromEntries(Object.entries(e).filter(([e, t]) => e === "attrs" && Fc(t) ? !1 : t != null));
}
function zc(e, t) {
	let n = Mc(e), { nodeExtensions: r, markExtensions: i } = jc(e), a = r.find((e) => G(e, "topNode"))?.name;
	return new Ye({
		topNode: a,
		nodes: Object.fromEntries(r.map((r) => {
			let i = n.filter((e) => e.type === r.name), a = {
				name: r.name,
				options: r.options,
				storage: r.storage,
				editor: t
			}, o = Rc({
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
			s && (o.parseDOM = s.map((e) => Lc(e, i)));
			let c = G(r, "renderHTML", a);
			c && (o.toDOM = (e) => c({
				node: e,
				HTMLAttributes: Nc(e, i)
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
			}, o = Rc({
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
			s && (o.parseDOM = s.map((e) => Lc(e, i)));
			let c = G(r, "renderHTML", a);
			return c && (o.toDOM = (e) => c({
				mark: e,
				HTMLAttributes: Nc(e, i)
			})), [r.name, o];
		}))
	});
}
function Bc(e, t) {
	return t.nodes[e] || t.marks[e] || null;
}
function Vc(e, t) {
	return Array.isArray(t) ? t.some((t) => (typeof t == "string" ? t : t.name) === e.name) : t;
}
function Hc(e, t) {
	let n = pt.fromSchema(t).serializeFragment(e), r = document.implementation.createHTMLDocument().createElement("div");
	return r.appendChild(n), r.innerHTML;
}
var Uc = (e, t = 500) => {
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
function Wc(e) {
	return Object.prototype.toString.call(e) === "[object RegExp]";
}
var Gc = class {
	constructor(e) {
		this.find = e.find, this.handler = e.handler;
	}
}, Kc = (e, t) => {
	if (Wc(t)) return t.exec(e);
	let n = t(e);
	if (!n) return null;
	let r = [n.text];
	return r.index = n.index, r.input = e, r.data = n.data, n.replaceWith && (n.text.includes(n.replaceWith) || console.warn("[tiptap warn]: \"inputRuleMatch.replaceWith\" must be part of \"inputRuleMatch.text\"."), r.push(n.replaceWith)), r;
};
function qc(e) {
	let { editor: t, from: n, to: r, text: i, rules: a, plugin: o } = e, { view: s } = t;
	if (s.composing) return !1;
	let c = s.state.doc.resolve(n);
	if (c.parent.type.spec.code || (c.nodeBefore || c.nodeAfter)?.marks.find((e) => e.type.spec.code)) return !1;
	let l = !1, u = Uc(c) + i;
	return a.forEach((e) => {
		if (l) return;
		let a = Kc(u, e.find);
		if (!a) return;
		let c = s.state.tr, d = Oc({
			state: s.state,
			transaction: c
		}), f = {
			from: n - (a[0].length - i.length),
			to: r
		}, { commands: p, chain: m, can: h } = new kc({
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
		}) !== null && c.steps.length && (c.setMeta(o, {
			transform: c,
			from: n,
			to: r,
			text: i
		}), s.dispatch(c), l = !0);
	}), l;
}
function Jc(e) {
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
					e = typeof e == "string" ? e : Hc(M.from(e), a.schema);
					let { from: i } = s, o = i + e.length;
					qc({
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
				return qc({
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
				i && qc({
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
				return a ? qc({
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
function Yc(e) {
	return Object.prototype.toString.call(e).slice(8, -1);
}
function Xc(e) {
	return Yc(e) === "Object" && e.constructor === Object && Object.getPrototypeOf(e) === Object.prototype;
}
function Zc(e, t) {
	let n = { ...e };
	return Xc(e) && Xc(t) && Object.keys(t).forEach((r) => {
		Xc(t[r]) && Xc(e[r]) ? n[r] = Zc(e[r], t[r]) : n[r] = t[r];
	}), n;
}
var Qc = class e {
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
			addOptions: () => Zc(this.options, e)
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
function $c(e) {
	return typeof e == "number";
}
var el = class {
	constructor(e) {
		this.find = e.find, this.handler = e.handler;
	}
}, tl = (e, t, n) => {
	if (Wc(t)) return [...e.matchAll(t)];
	let r = t(e, n);
	return r ? r.map((t) => {
		let n = [t.text];
		return n.index = t.index, n.input = e, n.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn("[tiptap warn]: \"pasteRuleMatch.replaceWith\" must be part of \"pasteRuleMatch.text\"."), n.push(t.replaceWith)), n;
	}) : [];
};
function nl(e) {
	let { editor: t, state: n, from: r, to: i, rule: a, pasteEvent: o, dropEvent: s } = e, { commands: c, chain: l, can: u } = new kc({
		editor: t,
		state: n
	}), d = [];
	return n.doc.nodesBetween(r, i, (e, t) => {
		if (!e.isTextblock || e.type.spec.code) return;
		let f = Math.max(r, t), p = Math.min(i, t + e.content.size);
		tl(e.textBetween(f - t, p - t, void 0, "￼"), a.find, o).forEach((e) => {
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
var rl = null, il = (e) => {
	var t;
	let n = new ClipboardEvent("paste", { clipboardData: new DataTransfer() });
	return (t = n.clipboardData) == null || t.setData("text/html", e), n;
};
function al(e) {
	let { editor: t, rules: n } = e, r = null, i = !1, a = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, s;
	try {
		s = typeof DragEvent < "u" ? new DragEvent("drop") : null;
	} catch {
		s = null;
	}
	let c = ({ state: e, from: n, to: r, rule: i, pasteEvt: a }) => {
		let c = e.tr, l = Oc({
			state: e,
			transaction: c
		});
		if (nl({
			editor: t,
			state: l,
			from: Math.max(n - 1, 0),
			to: r.b - 1,
			rule: i,
			pasteEvent: a,
			dropEvent: s
		}) && c.steps.length) {
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
				r = e.dom.parentElement?.contains(n.target) ? e.dom.parentElement : null, r && (rl = t);
			}, i = () => {
				rl &&= null;
			};
			return window.addEventListener("dragstart", n), window.addEventListener("dragend", i), { destroy() {
				window.removeEventListener("dragstart", n), window.removeEventListener("dragend", i);
			} };
		},
		props: { handleDOMEvents: {
			drop: (e, t) => {
				if (a = r === e.dom.parentElement, s = t, !a) {
					let e = rl;
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
				t = typeof t == "string" ? t : Hc(M.from(t), r.schema);
				let { from: n } = d, i = n + t.length, a = il(t);
				return c({
					rule: e,
					state: r,
					from: n,
					to: { b: i },
					pasteEvt: a
				});
			}
			let p = n.doc.content.findDiffStart(r.doc.content), m = n.doc.content.findDiffEnd(r.doc.content);
			if ($c(p) && m && p !== m.b) return c({
				rule: e,
				state: r,
				from: p,
				to: m,
				pasteEvt: o
			});
		}
	}));
}
function ol(e) {
	let t = e.filter((t, n) => e.indexOf(t) !== n);
	return Array.from(new Set(t));
}
var sl = class e {
	constructor(t, n) {
		this.splittableMarks = [], this.editor = n, this.extensions = e.resolve(t), this.schema = zc(this.extensions, n), this.setupExtensions();
	}
	static resolve(t) {
		let n = e.sort(e.flatten(t)), r = ol(n.map((e) => e.name));
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
				type: Bc(t.name, this.schema)
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
				type: Bc(e.name, this.schema)
			}, a = [], o = G(e, "addKeyboardShortcuts", n), s = {};
			if (e.type === "mark" && G(e, "exitable", n) && (s.ArrowRight = () => Qc.handleExit({
				editor: t,
				mark: e
			})), o) {
				let e = Object.fromEntries(Object.entries(o()).map(([e, n]) => [e, () => n({ editor: t })]));
				s = {
					...s,
					...e
				};
			}
			let c = Fs(s);
			a.push(c);
			let l = G(e, "addInputRules", n);
			Vc(e, t.options.enableInputRules) && l && r.push(...l());
			let u = G(e, "addPasteRules", n);
			Vc(e, t.options.enablePasteRules) && u && i.push(...u());
			let d = G(e, "addProseMirrorPlugins", n);
			if (d) {
				let e = d();
				a.push(...e);
			}
			return a;
		}).flat();
		return [
			Jc({
				editor: t,
				rules: r
			}),
			...al({
				editor: t,
				rules: i
			}),
			...a
		];
	}
	get attributes() {
		return Mc(this.extensions);
	}
	get nodeViews() {
		let { editor: e } = this, { nodeExtensions: t } = jc(this.extensions);
		return Object.fromEntries(t.filter((e) => !!G(e, "addNodeView")).map((t) => {
			let n = this.attributes.filter((e) => e.type === t.name), r = G(t, "addNodeView", {
				name: t.name,
				options: t.options,
				storage: t.storage,
				editor: e,
				type: K(t.name, this.schema)
			});
			return r ? [t.name, (i, a, o, s, c) => {
				let l = Nc(i, n);
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
				type: Bc(e.name, this.schema)
			};
			e.type === "mark" && (J(G(e, "keepOnSplit", t)) ?? !0) && this.splittableMarks.push(e.name);
			let n = G(e, "onBeforeCreate", t), r = G(e, "onCreate", t), i = G(e, "onUpdate", t), a = G(e, "onSelectionUpdate", t), o = G(e, "onTransaction", t), s = G(e, "onFocus", t), c = G(e, "onBlur", t), l = G(e, "onDestroy", t);
			n && this.editor.on("beforeCreate", n), r && this.editor.on("create", r), i && this.editor.on("update", i), a && this.editor.on("selectionUpdate", a), o && this.editor.on("transaction", o), s && this.editor.on("focus", s), c && this.editor.on("blur", c), l && this.editor.on("destroy", l);
		});
	}
}, cl = class e {
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
			addOptions: () => Zc(this.options, e)
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
function ll(e, t, n) {
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
function ul(e) {
	return Object.fromEntries(Object.entries(e.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
var dl = cl.create({
	name: "clipboardTextSerializer",
	addOptions() {
		return { blockSeparator: void 0 };
	},
	addProseMirrorPlugins() {
		return [new B({
			key: new rr("clipboardTextSerializer"),
			props: { clipboardTextSerializer: () => {
				let { editor: e } = this, { state: t, schema: n } = e, { doc: r, selection: i } = t, { ranges: a } = i, o = Math.min(...a.map((e) => e.$from.pos)), s = Math.max(...a.map((e) => e.$to.pos)), c = ul(n);
				return ll(r, {
					from: o,
					to: s
				}, {
					...this.options.blockSeparator === void 0 ? {} : { blockSeparator: this.options.blockSeparator },
					textSerializers: c
				});
			} }
		})];
	}
}), fl = () => ({ editor: e, view: t }) => (requestAnimationFrame(() => {
	var n;
	e.isDestroyed || (t.dom.blur(), (n = window == null ? void 0 : window.getSelection()) == null || n.removeAllRanges());
}), !0), pl = (e = !1) => ({ commands: t }) => t.setContent("", e), ml = () => ({ state: e, tr: t, dispatch: n }) => {
	let { selection: r } = t, { ranges: i } = r;
	return n && i.forEach(({ $from: n, $to: r }) => {
		e.doc.nodesBetween(n.pos, r.pos, (e, n) => {
			if (e.type.isText) return;
			let { doc: r, mapping: i } = t, a = r.resolve(i.map(n)), o = r.resolve(i.map(n + e.nodeSize)), s = a.blockRange(o);
			if (!s) return;
			let c = qt(s);
			if (e.type.isTextblock) {
				let { defaultType: e } = a.parent.contentMatchAt(a.index());
				t.setNodeMarkup(s.start, e);
			}
			(c || c === 0) && t.lift(s, c);
		});
	}), !0;
}, hl = (e) => (t) => e(t), gl = () => ({ state: e, dispatch: t }) => nc(e, t), _l = (e, t) => ({ editor: n, tr: r }) => {
	let { state: i } = n, a = i.doc.slice(e.from, e.to);
	r.deleteRange(e.from, e.to);
	let o = r.mapping.map(t);
	return r.insert(o, a.content), r.setSelection(new R(r.doc.resolve(Math.max(o - 1, 0)))), !0;
}, vl = () => ({ tr: e, dispatch: t }) => {
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
}, yl = (e) => ({ tr: t, state: n, dispatch: r }) => {
	let i = K(e, n.schema), a = t.selection.$anchor;
	for (let e = a.depth; e > 0; --e) if (a.node(e).type === i) {
		if (r) {
			let n = a.before(e), r = a.after(e);
			t.delete(n, r).scrollIntoView();
		}
		return !0;
	}
	return !1;
}, bl = (e) => ({ tr: t, dispatch: n }) => {
	let { from: r, to: i } = e;
	return n && t.delete(r, i), !0;
}, xl = () => ({ state: e, dispatch: t }) => Ls(e, t), Sl = () => ({ commands: e }) => e.keyboardShortcut("Enter"), Cl = () => ({ state: e, dispatch: t }) => tc(e, t);
function wl(e, t, n = { strict: !0 }) {
	let r = Object.keys(t);
	return !r.length || r.every((r) => n.strict ? t[r] === e[r] : Wc(t[r]) ? t[r].test(e[r]) : t[r] === e[r]);
}
function Tl(e, t, n = {}) {
	return e.find((e) => e.type === t && wl(Object.fromEntries(Object.keys(n).map((t) => [t, e.attrs[t]])), n));
}
function El(e, t, n = {}) {
	return !!Tl(e, t, n);
}
function Dl(e, t, n) {
	if (!e || !t) return;
	let r = e.parent.childAfter(e.parentOffset);
	if (r.node && r.node.marks.some((e) => e.type === t) || (r = e.parent.childBefore(e.parentOffset)), !r.node || !r.node.marks.some((e) => e.type === t) || (n ||= r.node.marks[0]?.attrs, !Tl([...r.node.marks], t, n))) return;
	let i = r.index, a = e.start() + r.offset, o = i + 1, s = a + r.node.nodeSize;
	for (; i > 0 && El([...e.parent.child(i - 1).marks], t, n);) --i, a -= e.parent.child(i).nodeSize;
	for (; o < e.parent.childCount && El([...e.parent.child(o).marks], t, n);) s += e.parent.child(o).nodeSize, o += 1;
	return {
		from: a,
		to: s
	};
}
function Ol(e, t) {
	if (typeof e == "string") {
		if (!t.marks[e]) throw Error(`There is no mark type named '${e}'. Maybe you forgot to add the extension?`);
		return t.marks[e];
	}
	return e;
}
var kl = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let a = Ol(e, r.schema), { doc: o, selection: s } = n, { $from: c, from: l, to: u } = s;
	if (i) {
		let e = Dl(c, a, t);
		if (e && e.from <= l && e.to >= u) {
			let t = R.create(o, e.from, e.to);
			n.setSelection(t);
		}
	}
	return !0;
}, Al = (e) => (t) => {
	let n = typeof e == "function" ? e(t) : e;
	for (let e = 0; e < n.length; e += 1) if (n[e](t)) return !0;
	return !1;
};
function jl(e) {
	return e instanceof R;
}
function Ml(e = 0, t = 0, n = 0) {
	return Math.min(Math.max(e, t), n);
}
function Nl(e, t = null) {
	if (!t) return null;
	let n = L.atStart(e), r = L.atEnd(e);
	if (t === "start" || t === !0) return n;
	if (t === "end") return r;
	let i = n.from, a = r.to;
	return t === "all" ? R.create(e, Ml(0, i, a), Ml(e.content.size, i, a)) : R.create(e, Ml(t, i, a), Ml(t, i, a));
}
function Pl() {
	return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
}
function Fl() {
	return [
		"iPad Simulator",
		"iPhone Simulator",
		"iPod Simulator",
		"iPad",
		"iPhone",
		"iPod"
	].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function Il() {
	return typeof navigator < "u" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
var Ll = (e = null, t = {}) => ({ editor: n, view: r, tr: i, dispatch: a }) => {
	t = {
		scrollIntoView: !0,
		...t
	};
	let o = () => {
		(Fl() || Pl()) && r.dom.focus(), requestAnimationFrame(() => {
			n.isDestroyed || (r.focus(), Il() && !Fl() && !Pl() && r.dom.focus({ preventScroll: !0 }));
		});
	};
	if (r.hasFocus() && e === null || e === !1) return !0;
	if (a && e === null && !jl(n.state.selection)) return o(), !0;
	let s = Nl(i.doc, e) || n.state.selection, c = n.state.selection.eq(s);
	return a && (c || i.setSelection(s), c && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0;
}, Rl = (e, t) => (n) => e.every((e, r) => t(e, {
	...n,
	index: r
})), zl = (e, t) => ({ tr: n, commands: r }) => r.insertContentAt({
	from: n.selection.from,
	to: n.selection.to
}, e, t), Bl = (e) => {
	let t = e.childNodes;
	for (let n = t.length - 1; n >= 0; --n) {
		let r = t[n];
		r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? e.removeChild(r) : r.nodeType === 1 && Bl(r);
	}
	return e;
};
function Vl(e) {
	let t = `<body>${e}</body>`, n = new window.DOMParser().parseFromString(t, "text/html").body;
	return Bl(n);
}
function Hl(e, t, n) {
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
		return console.warn("[tiptap warn]: Invalid content.", "Passed value:", e, "Error:", r), Hl("", t, n);
	}
	if (i) {
		if (n.errorOnInvalidContent) {
			let r = !1, i = "", a = new Ye({
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
			if (n.slice ? $e.fromSchema(a).parseSlice(Vl(e), n.parseOptions) : $e.fromSchema(a).parse(Vl(e), n.parseOptions), n.errorOnInvalidContent && r) throw Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ Error(`Invalid element found: ${i}`) });
		}
		let r = $e.fromSchema(t);
		return n.slice ? r.parseSlice(Vl(e), n.parseOptions).content : r.parse(Vl(e), n.parseOptions);
	}
	return Hl("", t, n);
}
function Ul(e, t, n) {
	let r = e.steps.length - 1;
	if (r < t) return;
	let i = e.steps[r];
	if (!(i instanceof Bt || i instanceof Vt)) return;
	let a = e.mapping.maps[r], o = 0;
	a.forEach((e, t, n, r) => {
		o === 0 && (o = r);
	}), e.setSelection(L.near(e.doc.resolve(o), n));
}
var Wl = (e) => !("type" in e), Gl = (e, t, n) => ({ tr: r, dispatch: i, editor: a }) => {
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
			Hl(t, a.schema, {
				parseOptions: s,
				errorOnInvalidContent: !0
			});
		} catch (e) {
			o(e);
		}
		try {
			i = Hl(t, a.schema, {
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
		if ((Wl(i) ? i : [i]).forEach((e) => {
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
		n.updateSelection && Ul(r, r.steps.length - 1, -1), n.applyInputRules && r.setMeta("applyInputRules", {
			from: c,
			text: f
		}), n.applyPasteRules && r.setMeta("applyPasteRules", {
			from: c,
			text: f
		});
	}
	return !0;
}, Kl = () => ({ state: e, dispatch: t }) => Xs(e, t), ql = () => ({ state: e, dispatch: t }) => Zs(e, t), Jl = () => ({ state: e, dispatch: t }) => zs(e, t), Yl = () => ({ state: e, dispatch: t }) => qs(e, t), Xl = () => ({ state: e, dispatch: t, tr: n }) => {
	try {
		let r = dn(e.doc, e.selection.$from.pos, -1);
		return r != null && (n.join(r, 2), t && t(n), !0);
	} catch {
		return !1;
	}
}, Zl = () => ({ state: e, dispatch: t, tr: n }) => {
	try {
		let r = dn(e.doc, e.selection.$from.pos, 1);
		return r != null && (n.join(r, 2), t && t(n), !0);
	} catch {
		return !1;
	}
}, Ql = () => ({ state: e, dispatch: t }) => Bs(e, t), $l = () => ({ state: e, dispatch: t }) => Vs(e, t);
function eu() {
	return typeof navigator < "u" && /Mac/.test(navigator.platform);
}
function tu(e) {
	let t = e.split(/-(?!$)/), n = t[t.length - 1];
	n === "Space" && (n = " ");
	let r, i, a, o;
	for (let e = 0; e < t.length - 1; e += 1) {
		let n = t[e];
		if (/^(cmd|meta|m)$/i.test(n)) o = !0;
		else if (/^a(lt)?$/i.test(n)) r = !0;
		else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
		else if (/^s(hift)?$/i.test(n)) a = !0;
		else if (/^mod$/i.test(n)) Fl() || eu() ? o = !0 : i = !0;
		else throw Error(`Unrecognized modifier name: ${n}`);
	}
	return r && (n = `Alt-${n}`), i && (n = `Ctrl-${n}`), o && (n = `Meta-${n}`), a && (n = `Shift-${n}`), n;
}
var nu = (e) => ({ editor: t, view: n, tr: r, dispatch: i }) => {
	let a = tu(e).split(/-(?!$)/), o = a.find((e) => ![
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
function ru(e, t, n = {}) {
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
	let c = i - r, l = s.filter((e) => !o || o.name === e.node.type.name).filter((e) => wl(e.node.attrs, n, { strict: !1 }));
	return a ? !!l.length : l.reduce((e, t) => e + t.to - t.from, 0) >= c;
}
var iu = (e, t = {}) => ({ state: n, dispatch: r }) => ru(n, K(e, n.schema), t) ? Qs(n, r) : !1, au = () => ({ state: e, dispatch: t }) => rc(e, t), ou = (e) => ({ state: t, dispatch: n }) => wc(K(e, t.schema))(t, n), su = () => ({ state: e, dispatch: t }) => $s(e, t);
function cu(e, t) {
	return t.nodes[e] ? "node" : t.marks[e] ? "mark" : null;
}
function lu(e, t) {
	let n = typeof t == "string" ? [t] : t;
	return Object.keys(e).reduce((t, r) => (n.includes(r) || (t[r] = e[r]), t), {});
}
var uu = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
	let a = null, o = null, s = cu(typeof e == "string" ? e : e.name, r.schema);
	return s ? (s === "node" && (a = K(e, r.schema)), s === "mark" && (o = Ol(e, r.schema)), i && n.selection.ranges.forEach((e) => {
		r.doc.nodesBetween(e.$from.pos, e.$to.pos, (e, r) => {
			a && a === e.type && n.setNodeMarkup(r, void 0, lu(e.attrs, t)), o && e.marks.length && e.marks.forEach((i) => {
				o === i.type && n.addMark(r, r + e.nodeSize, o.create(lu(i.attrs, t)));
			});
		});
	}), !0) : !1;
}, du = () => ({ tr: e, dispatch: t }) => (t && e.scrollIntoView(), !0), fu = () => ({ tr: e, dispatch: t }) => {
	if (t) {
		let t = new Vn(e.doc);
		e.setSelection(t);
	}
	return !0;
}, pu = () => ({ state: e, dispatch: t }) => Ws(e, t), mu = () => ({ state: e, dispatch: t }) => Js(e, t), hu = () => ({ state: e, dispatch: t }) => oc(e, t), gu = () => ({ state: e, dispatch: t }) => fc(e, t), _u = () => ({ state: e, dispatch: t }) => dc(e, t);
function vu(e, t, n = {}, r = {}) {
	return Hl(e, t, {
		slice: !1,
		parseOptions: n,
		errorOnInvalidContent: r.errorOnInvalidContent
	});
}
var yu = (e, t = !1, n = {}, r = {}) => ({ editor: i, tr: a, dispatch: o, commands: s }) => {
	let { doc: c } = a;
	if (n.preserveWhitespace !== "full") {
		let s = vu(e, i.schema, n, { errorOnInvalidContent: r.errorOnInvalidContent ?? i.options.enableContentCheck });
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
function bu(e, t) {
	let n = Ol(t, e.schema), { from: r, to: i, empty: a } = e.selection, o = [];
	a ? (e.storedMarks && o.push(...e.storedMarks), o.push(...e.selection.$head.marks())) : e.doc.nodesBetween(r, i, (e) => {
		o.push(...e.marks);
	});
	let s = o.find((e) => e.type.name === n.name);
	return s ? { ...s.attrs } : {};
}
function xu(e, t) {
	let n = new Pn(e);
	return t.forEach((e) => {
		e.steps.forEach((e) => {
			n.step(e);
		});
	}), n;
}
function Su(e) {
	for (let t = 0; t < e.edgeCount; t += 1) {
		let { type: n } = e.edge(t);
		if (n.isTextblock && !n.hasRequiredAttrs()) return n;
	}
	return null;
}
function Cu(e, t, n) {
	let r = [];
	return e.nodesBetween(t.from, t.to, (e, t) => {
		n(e) && r.push({
			node: e,
			pos: t
		});
	}), r;
}
function wu(e, t) {
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
function Tu(e) {
	return (t) => wu(t.$from, e);
}
function Eu(e, t) {
	return ll(e, {
		from: 0,
		to: e.content.size
	}, t);
}
function Du(e, t) {
	let n = K(t, e.schema), { from: r, to: i } = e.selection, a = [];
	e.doc.nodesBetween(r, i, (e) => {
		a.push(e);
	});
	let o = a.reverse().find((e) => e.type.name === n.name);
	return o ? { ...o.attrs } : {};
}
function Ou(e, t) {
	let n = cu(typeof t == "string" ? t : t.name, e.schema);
	return n === "node" ? Du(e, t) : n === "mark" ? bu(e, t) : {};
}
function ku(e, t = JSON.stringify) {
	let n = {};
	return e.filter((e) => {
		let r = t(e);
		return Object.prototype.hasOwnProperty.call(n, r) ? !1 : n[r] = !0;
	});
}
function Au(e) {
	let t = ku(e);
	return t.length === 1 ? t : t.filter((e, n) => !t.filter((e, t) => t !== n).some((t) => e.oldRange.from >= t.oldRange.from && e.oldRange.to <= t.oldRange.to && e.newRange.from >= t.newRange.from && e.newRange.to <= t.newRange.to));
}
function ju(e) {
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
	}), Au(r);
}
function Mu(e, t, n) {
	let r = [];
	return e === t ? n.resolve(e).marks().forEach((t) => {
		let i = Dl(n.resolve(e), t.type);
		i && r.push({
			mark: t,
			...i
		});
	}) : n.nodesBetween(e, t, (e, t) => {
		e && e?.nodeSize !== void 0 && r.push(...e.marks.map((n) => ({
			from: t,
			to: t + e.nodeSize,
			mark: n
		})));
	}), r;
}
var Nu = (e, t, n, r = 20) => {
	let i = e.doc.resolve(n), a = r, o = null;
	for (; a > 0 && o === null;) {
		let e = i.node(a);
		e?.type.name === t ? o = e : --a;
	}
	return [o, a];
};
function Pu(e, t, n) {
	return Object.fromEntries(Object.entries(n).filter(([n]) => {
		let r = e.find((e) => e.type === t && e.name === n);
		return r ? r.attribute.keepOnSplit : !1;
	}));
}
function Fu(e, t, n = {}) {
	let { empty: r, ranges: i } = e.selection, a = t ? Ol(t, e.schema) : null;
	if (r) return !!(e.storedMarks || e.selection.$from.marks()).filter((e) => !a || a.name === e.type.name).find((e) => wl(e.attrs, n, { strict: !1 }));
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
	let c = s.filter((e) => !a || a.name === e.mark.type.name).filter((e) => wl(e.mark.attrs, n, { strict: !1 })).reduce((e, t) => e + t.to - t.from, 0), l = s.filter((e) => !a || e.mark.type !== a && e.mark.type.excludes(a)).reduce((e, t) => e + t.to - t.from, 0);
	return (c > 0 ? c + l : c) >= o;
}
function Iu(e, t, n = {}) {
	if (!t) return ru(e, null, n) || Fu(e, null, n);
	let r = cu(t, e.schema);
	return r === "node" ? ru(e, t, n) : r === "mark" && Fu(e, t, n);
}
var Lu = (e, t) => {
	let { $from: n, $to: r, $anchor: i } = e.selection;
	if (t) {
		let n = Tu((e) => e.type.name === t)(e.selection);
		if (!n) return !1;
		let r = e.doc.resolve(n.pos + 1);
		return i.pos + 1 === r.end();
	}
	return !(r.parentOffset < r.parent.nodeSize - 2 || n.pos !== r.pos);
}, Ru = (e) => {
	let { $from: t, $to: n } = e.selection;
	return !(t.parentOffset > 0 || t.pos !== n.pos);
};
function zu(e, t) {
	let { nodeExtensions: n } = jc(t), r = n.find((t) => t.name === e);
	if (!r) return !1;
	let i = J(G(r, "group", {
		name: r.name,
		options: r.options,
		storage: r.storage
	}));
	return typeof i == "string" && i.split(" ").includes("list");
}
function Bu(e, { checkChildren: t = !0, ignoreWhitespace: n = !1 } = {}) {
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
			r !== !1 && (Bu(e, {
				ignoreWhitespace: n,
				checkChildren: t
			}) || (r = !1));
		}), r;
	}
	return !1;
}
function Vu(e) {
	return e instanceof z;
}
function Hu(e, t, n) {
	let r = e.state.doc.content.size, i = Ml(t, 0, r), a = Ml(n, 0, r), o = e.coordsAtPos(i), s = e.coordsAtPos(a, -1), c = Math.min(o.top, s.top), l = Math.max(o.bottom, s.bottom), u = Math.min(o.left, s.left), d = Math.max(o.right, s.right), f = {
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
function Uu(e, t, n) {
	let { selection: r } = t, i = null;
	if (jl(r) && (i = r.$cursor), i) {
		let t = e.storedMarks ?? i.marks();
		return !!n.isInSet(t) || !t.some((e) => e.type.excludes(n));
	}
	let { ranges: a } = r;
	return a.some(({ $from: t, $to: r }) => {
		let i = t.depth === 0 && e.doc.inlineContent && e.doc.type.allowsMarkType(n);
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
var Wu = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
	let { selection: a } = n, { empty: o, ranges: s } = a, c = Ol(e, r.schema);
	if (i) {
		if (o) {
			let e = bu(r, c);
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
	}
	return Uu(r, n, c);
}, Gu = (e, t) => ({ tr: n }) => (n.setMeta(e, t), !0), Ku = (e, t = {}) => ({ state: n, dispatch: r, chain: i }) => {
	let a = K(e, n.schema), o;
	return n.selection.$anchor.sameParent(n.selection.$head) && (o = n.selection.$anchor.parent.attrs), a.isTextblock ? i().command(({ commands: e }) => mc(a, {
		...o,
		...t
	})(n) ? !0 : e.clearNodes()).command(({ state: e }) => mc(a, {
		...o,
		...t
	})(e, r)).run() : (console.warn("[tiptap warn]: Currently \"setNode()\" only supports text block nodes."), !1);
}, qu = (e) => ({ tr: t, dispatch: n }) => {
	if (n) {
		let { doc: n } = t, r = Ml(e, 0, n.content.size), i = z.create(n, r);
		t.setSelection(i);
	}
	return !0;
}, Ju = (e) => ({ tr: t, dispatch: n }) => {
	if (n) {
		let { doc: n } = t, { from: r, to: i } = typeof e == "number" ? {
			from: e,
			to: e
		} : e, a = R.atStart(n).from, o = R.atEnd(n).to, s = Ml(r, a, o), c = Ml(i, a, o), l = R.create(n, s, c);
		t.setSelection(l);
	}
	return !0;
}, Yu = (e) => ({ state: t, dispatch: n }) => Dc(K(e, t.schema))(t, n);
function Xu(e, t) {
	let n = e.storedMarks || e.selection.$to.parentOffset && e.selection.$from.marks();
	if (n) {
		let r = n.filter((e) => t?.includes(e.type.name));
		e.tr.ensureMarks(r);
	}
}
var Zu = ({ keepMarks: e = !0 } = {}) => ({ tr: t, state: n, dispatch: r, editor: i }) => {
	let { selection: a, doc: o } = t, { $from: s, $to: c } = a, l = i.extensionManager.attributes, u = Pu(l, s.node().type.name, s.node().attrs);
	if (a instanceof z && a.node.isBlock) return !s.parentOffset || !on(o, s.pos) ? !1 : (r && (e && Xu(n, i.extensionManager.splittableMarks), t.split(s.pos).scrollIntoView()), !0);
	if (!s.parent.isBlock) return !1;
	let d = c.parentOffset === c.parent.content.size, f = s.depth === 0 ? void 0 : Su(s.node(-1).contentMatchAt(s.indexAfter(-1))), p = d && f ? [{
		type: f,
		attrs: u
	}] : void 0, m = on(t.doc, t.mapping.map(s.pos), 1, p);
	if (!p && !m && on(t.doc, t.mapping.map(s.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, p = f ? [{
		type: f,
		attrs: u
	}] : void 0), r) {
		if (m && (a instanceof R && t.deleteSelection(), t.split(t.mapping.map(s.pos), 1, p), f && !d && !s.parentOffset && s.parent.type !== f)) {
			let e = t.mapping.map(s.before()), n = t.doc.resolve(e);
			s.node(-1).canReplaceWith(n.index(), n.index() + 1, f) && t.setNodeMarkup(t.mapping.map(s.before()), f);
		}
		e && Xu(n, i.extensionManager.splittableMarks), t.scrollIntoView();
	}
	return m;
}, Qu = (e, t = {}) => ({ tr: n, state: r, dispatch: i, editor: a }) => {
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
				...Pu(d, s.node().type.name, s.node().attrs),
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
		...Pu(d, u.type.name, u.attrs),
		...t
	}, m = {
		...Pu(d, s.node().type.name, s.node().attrs),
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
	if (!on(n.doc, s.pos, 2)) return !1;
	if (i) {
		let { selection: e, storedMarks: t } = r, { splittableMarks: o } = a.extensionManager, c = t || e.$to.parentOffset && e.$from.marks();
		if (n.split(s.pos, 2, h).scrollIntoView(), !c || !i) return !0;
		let l = c.filter((e) => o.includes(e.type.name));
		n.ensureMarks(l);
	}
	return !0;
}, $u = (e, t) => {
	let n = Tu((e) => e.type === t)(e.selection);
	if (!n) return !0;
	let r = e.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
	if (r === void 0) return !0;
	let i = e.doc.nodeAt(r);
	return n.node.type === i?.type && cn(e.doc, n.pos) && e.join(n.pos), !0;
}, ed = (e, t) => {
	let n = Tu((e) => e.type === t)(e.selection);
	if (!n) return !0;
	let r = e.doc.resolve(n.start).after(n.depth);
	if (r === void 0) return !0;
	let i = e.doc.nodeAt(r);
	return n.node.type === i?.type && cn(e.doc, r) && e.join(r), !0;
}, td = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	blur: fl,
	clearContent: pl,
	clearNodes: ml,
	command: hl,
	createParagraphNear: gl,
	cut: _l,
	deleteCurrentNode: vl,
	deleteNode: yl,
	deleteRange: bl,
	deleteSelection: xl,
	enter: Sl,
	exitCode: Cl,
	extendMarkRange: kl,
	first: Al,
	focus: Ll,
	forEach: Rl,
	insertContent: zl,
	insertContentAt: Gl,
	joinBackward: Jl,
	joinDown: ql,
	joinForward: Yl,
	joinItemBackward: Xl,
	joinItemForward: Zl,
	joinTextblockBackward: Ql,
	joinTextblockForward: $l,
	joinUp: Kl,
	keyboardShortcut: nu,
	lift: iu,
	liftEmptyBlock: au,
	liftListItem: ou,
	newlineInCode: su,
	resetAttributes: uu,
	scrollIntoView: du,
	selectAll: fu,
	selectNodeBackward: pu,
	selectNodeForward: mu,
	selectParentNode: hu,
	selectTextblockEnd: gu,
	selectTextblockStart: _u,
	setContent: yu,
	setMark: Wu,
	setMeta: Gu,
	setNode: Ku,
	setNodeSelection: qu,
	setTextSelection: Ju,
	sinkListItem: Yu,
	splitBlock: Zu,
	splitListItem: Qu,
	toggleList: (e, t, n, r = {}) => ({ editor: i, tr: a, state: o, dispatch: s, chain: c, commands: l, can: u }) => {
		let { extensions: d, splittableMarks: f } = i.extensionManager, p = K(e, o.schema), m = K(t, o.schema), { selection: h, storedMarks: g } = o, { $from: _, $to: v } = h, y = _.blockRange(v), b = g || h.$to.parentOffset && h.$from.marks();
		if (!y) return !1;
		let x = Tu((e) => zu(e.type.name, d))(h);
		if (y.depth >= 1 && x && y.depth - x.depth <= 1) {
			if (x.node.type === p) return l.liftListItem(m);
			if (zu(x.node.type.name, d) && p.validContent(x.node.content) && s) return c().command(() => (a.setNodeMarkup(x.pos, p), !0)).command(() => $u(a, p)).command(() => ed(a, p)).run();
		}
		return !n || !b || !s ? c().command(() => u().wrapInList(p, r) ? !0 : l.clearNodes()).wrapInList(p, r).command(() => $u(a, p)).command(() => ed(a, p)).run() : c().command(() => {
			let e = u().wrapInList(p, r), t = b.filter((e) => f.includes(e.type.name));
			return a.ensureMarks(t), e ? !0 : l.clearNodes();
		}).wrapInList(p, r).command(() => $u(a, p)).command(() => ed(a, p)).run();
	},
	toggleMark: (e, t = {}, n = {}) => ({ state: r, commands: i }) => {
		let { extendEmptyMarkRange: a = !1 } = n, o = Ol(e, r.schema);
		return Fu(r, o, t) ? i.unsetMark(o, { extendEmptyMarkRange: a }) : i.setMark(o, t);
	},
	toggleNode: (e, t, n = {}) => ({ state: r, commands: i }) => {
		let a = K(e, r.schema), o = K(t, r.schema), s = ru(r, a, n), c;
		return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), s ? i.setNode(o, c) : i.setNode(a, {
			...c,
			...n
		});
	},
	toggleWrap: (e, t = {}) => ({ state: n, commands: r }) => {
		let i = K(e, n.schema);
		return ru(n, i, t) ? r.lift(i) : r.wrapIn(i, t);
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
		let { extendEmptyMarkRange: a = !1 } = t, { selection: o } = n, s = Ol(e, r.schema), { $from: c, empty: l, ranges: u } = o;
		if (!i) return !0;
		if (l && a) {
			let { from: e, to: t } = o, r = Dl(c, s, c.marks().find((e) => e.type === s)?.attrs);
			r && (e = r.from, t = r.to), n.removeMark(e, t, s);
		} else u.forEach((e) => {
			n.removeMark(e.$from.pos, e.$to.pos, s);
		});
		return n.removeStoredMark(s), !0;
	},
	updateAttributes: (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
		let a = null, o = null, s = cu(typeof e == "string" ? e : e.name, r.schema);
		return s ? (s === "node" && (a = K(e, r.schema)), s === "mark" && (o = Ol(e, r.schema)), i && n.selection.ranges.forEach((e) => {
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
	wrapIn: (e, t = {}) => ({ state: n, dispatch: r }) => pc(K(e, n.schema), t)(n, r),
	wrapInList: (e, t = {}) => ({ state: n, dispatch: r }) => bc(K(e, n.schema), t)(n, r)
}), nd = cl.create({
	name: "commands",
	addCommands() {
		return { ...td };
	}
}), rd = cl.create({
	name: "drop",
	addProseMirrorPlugins() {
		return [new B({
			key: new rr("tiptapDrop"),
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
}), id = cl.create({
	name: "editable",
	addProseMirrorPlugins() {
		return [new B({
			key: new rr("editable"),
			props: { editable: () => this.editor.options.editable }
		})];
	}
}), ad = new rr("focusEvents"), od = cl.create({
	name: "focusEvents",
	addProseMirrorPlugins() {
		let { editor: e } = this;
		return [new B({
			key: ad,
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
}), sd = cl.create({
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
		return Fl() || eu() ? i : r;
	},
	addProseMirrorPlugins() {
		return [new B({
			key: new rr("clearDocument"),
			appendTransaction: (e, t, n) => {
				if (e.some((e) => e.getMeta("composition"))) return;
				let r = e.some((e) => e.docChanged) && !t.doc.eq(n.doc), i = e.some((e) => e.getMeta("preventClearDocument"));
				if (!r || i) return;
				let { empty: a, from: o, to: s } = t.selection, c = L.atStart(t.doc).from, l = L.atEnd(t.doc).to;
				if (a || o !== c || s !== l || !Bu(n.doc)) return;
				let u = n.tr, d = Oc({
					state: n,
					transaction: u
				}), { commands: f } = new kc({
					editor: this.editor,
					state: d
				});
				if (f.clearNodes(), u.steps.length) return u;
			}
		})];
	}
}), cd = cl.create({
	name: "paste",
	addProseMirrorPlugins() {
		return [new B({
			key: new rr("tiptapPaste"),
			props: { handlePaste: (e, t, n) => {
				this.editor.emit("paste", {
					editor: this.editor,
					event: t,
					slice: n
				});
			} }
		})];
	}
}), ld = cl.create({
	name: "tabindex",
	addProseMirrorPlugins() {
		return [new B({
			key: new rr("tabindex"),
			props: { attributes: () => this.editor.isEditable ? { tabindex: "0" } : {} }
		})];
	}
}), ud = class e {
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
			if (r.node.type.name === e) {
				if (Object.keys(t).length > 0) {
					let e = r.node.attrs, n = Object.keys(t);
					for (let r = 0; r < n.length; r += 1) {
						let i = n[r];
						if (e[i] !== t[i]) break;
					}
				} else n = r;
			}
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
			n && r.length > 0 || (a.node.type.name === e && i.every((e) => t[e] === a.node.attrs[e]) && r.push(a), n && r.length > 0 || (r = r.concat(a.querySelectorAll(e, t, n))));
		}), r;
	}
	setAttribute(e) {
		let { tr: t } = this.editor.state;
		t.setNodeMarkup(this.from, void 0, {
			...this.node.attrs,
			...e
		}), this.editor.view.dispatch(t);
	}
}, dd = ".ProseMirror {\n  position: relative;\n}\n\n.ProseMirror {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  white-space: break-spaces;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  font-feature-settings: \"liga\" 0; /* the above doesn't seem to work in Edge */\n}\n\n.ProseMirror [contenteditable=\"false\"] {\n  white-space: normal;\n}\n\n.ProseMirror [contenteditable=\"false\"] [contenteditable=\"true\"] {\n  white-space: pre-wrap;\n}\n\n.ProseMirror pre {\n  white-space: pre-wrap;\n}\n\nimg.ProseMirror-separator {\n  display: inline !important;\n  border: none !important;\n  margin: 0 !important;\n  width: 0 !important;\n  height: 0 !important;\n}\n\n.ProseMirror-gapcursor {\n  display: none;\n  pointer-events: none;\n  position: absolute;\n  margin: 0;\n}\n\n.ProseMirror-gapcursor:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: -2px;\n  width: 20px;\n  border-top: 1px solid black;\n  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;\n}\n\n@keyframes ProseMirror-cursor-blink {\n  to {\n    visibility: hidden;\n  }\n}\n\n.ProseMirror-hideselection *::selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection *::-moz-selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection * {\n  caret-color: transparent;\n}\n\n.ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}\n\n.tippy-box[data-animation=fade][data-state=hidden] {\n  opacity: 0\n}";
function fd(e, t, n) {
	let r = document.querySelector(`style[data-tiptap-style${n ? `-${n}` : ""}]`);
	if (r !== null) return r;
	let i = document.createElement("style");
	return t && i.setAttribute("nonce", t), i.setAttribute(`data-tiptap-style${n ? `-${n}` : ""}`, ""), i.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(i), i;
}
var pd = class extends Ac {
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
		this.options.injectCSS && document && (this.css = fd(dd, this.options.injectNonce));
	}
	setOptions(e = {}) {
		this.options = {
			...this.options,
			...e
		}, this.view && this.state && !this.isDestroyed && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
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
		let n = Pc(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], r = this.state.reconfigure({ plugins: n });
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
			id,
			dl.configure({ blockSeparator: this.options.coreExtensionOptions?.clipboardTextSerializer?.blockSeparator }),
			nd,
			od,
			sd,
			ld,
			rd,
			cd
		].filter((e) => typeof this.options.enableCoreExtensions != "object" || this.options.enableCoreExtensions[e.name] !== !1) : [], ...this.options.extensions].filter((e) => [
			"extension",
			"node",
			"mark"
		].includes(e?.type));
		this.extensionManager = new sl(e, this);
	}
	createCommandManager() {
		this.commandManager = new kc({ editor: this });
	}
	createSchema() {
		this.schema = this.extensionManager.schema;
	}
	createView() {
		let e;
		try {
			e = vu(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
		} catch (t) {
			if (!(t instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(t.message)) throw t;
			this.emit("contentError", {
				editor: this,
				error: t,
				disableCollaboration: () => {
					this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((e) => e.name !== "collaboration"), this.createExtensionManager();
				}
			}), e = vu(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: !1 });
		}
		let t = Nl(e, this.options.autofocus);
		this.view = new hs(this.options.element, {
			...this.options.editorProps,
			attributes: {
				role: "textbox",
				...this.options.editorProps?.attributes
			},
			dispatchTransaction: this.dispatchTransaction.bind(this),
			state: $n.create({
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
		}), e.docChanged && !e.getMeta("preventUpdate") && this.emit("update", {
			editor: this,
			transaction: e
		});
	}
	getAttributes(e) {
		return Ou(this.state, e);
	}
	isActive(e, t) {
		let n = typeof e == "string" ? e : null, r = typeof e == "string" ? t : e;
		return Iu(this.state, n, r);
	}
	getJSON() {
		return this.state.doc.toJSON();
	}
	getHTML() {
		return Hc(this.state.doc.content, this.schema);
	}
	getText(e) {
		let { blockSeparator: t = "\n\n", textSerializers: n = {} } = e || {};
		return Eu(this.state.doc, {
			blockSeparator: t,
			textSerializers: {
				...ul(this.schema),
				...n
			}
		});
	}
	get isEmpty() {
		return Bu(this.state.doc);
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
		return new ud(this.state.doc.resolve(e), this);
	}
	get $doc() {
		return this.$pos(0);
	}
};
function md(e) {
	return new Gc({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = J(e.getAttributes, void 0, r);
			if (i === !1 || i === null) return null;
			let { tr: a } = t, o = r[r.length - 1], s = r[0];
			if (o) {
				let r = s.search(/\S/), c = n.from + s.indexOf(o), l = c + o.length;
				if (Mu(n.from, n.to, t.doc).filter((t) => t.mark.type.excluded.find((n) => n === e.type && n !== t.mark.type)).filter((e) => e.to > c).length) return null;
				l < n.to && a.delete(l, n.to), c > n.from && a.delete(n.from + r, c);
				let u = n.from + r + o.length;
				a.addMark(n.from + r, u, e.type.create(i || {})), a.removeStoredMark(e.type);
			}
		}
	});
}
function hd(e) {
	return new Gc({
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
function gd(e) {
	return new Gc({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = t.doc.resolve(n.from), a = J(e.getAttributes, void 0, r) || {};
			if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), e.type)) return null;
			t.tr.delete(n.from, n.to).setBlockType(n.from, n.from, e.type, a);
		}
	});
}
function _d(e) {
	return new Gc({
		find: e.find,
		handler: ({ state: t, range: n, match: r, chain: i }) => {
			let a = J(e.getAttributes, void 0, r) || {}, o = t.tr.delete(n.from, n.to), s = o.doc.resolve(n.from).blockRange(), c = s && Yt(s, e.type, a);
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
			l && l.type === e.type && cn(o.doc, n.from - 1) && (!e.joinPredicate || e.joinPredicate(r, l)) && o.join(n.from - 1);
		}
	});
}
var vd = class e {
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
			addOptions: () => Zc(this.options, e)
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
function yd(e) {
	return new el({
		find: e.find,
		handler: ({ state: t, range: n, match: r, pasteEvent: i }) => {
			let a = J(e.getAttributes, void 0, r, i);
			if (a === !1 || a === null) return null;
			let { tr: o } = t, s = r[r.length - 1], c = r[0], l = n.to;
			if (s) {
				let r = c.search(/\S/), i = n.from + c.indexOf(s), u = i + s.length;
				if (Mu(n.from, n.to, t.doc).filter((t) => t.mark.type.excluded.find((n) => n === e.type && n !== t.mark.type)).filter((e) => e.to > i).length) return null;
				u < n.to && o.delete(u, n.to), i > n.from && o.delete(n.from + r, i), l = n.from + r + s.length, o.addMark(n.from + r, l, e.type.create(a || {})), o.removeStoredMark(e.type);
			}
		}
	});
}
function bd(e, t) {
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
var xd = "bottom", Sd = "right", Cd = "left", wd = "auto", Td = [
	"top",
	xd,
	Sd,
	Cd
], Ed = "start", Dd = "clippingParents", Od = "viewport", kd = "popper", Ad = "reference", jd = /*#__PURE__*/ Td.reduce(function(e, t) {
	return e.concat([t + "-" + Ed, t + "-end"]);
}, []), Md = /*#__PURE__*/ [].concat(Td, [wd]).reduce(function(e, t) {
	return e.concat([
		t,
		t + "-" + Ed,
		t + "-end"
	]);
}, []), Nd = [
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
// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function Pd(e) {
	return e ? (e.nodeName || "").toLowerCase() : null;
}
// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function Fd(e) {
	if (e == null) return window;
	if (e.toString() !== "[object Window]") {
		var t = e.ownerDocument;
		return t && t.defaultView || window;
	}
	return e;
}
// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function Id(e) {
	return e instanceof Fd(e).Element || e instanceof Element;
}
function Ld(e) {
	return e instanceof Fd(e).HTMLElement || e instanceof HTMLElement;
}
function Rd(e) {
	return typeof ShadowRoot > "u" ? !1 : e instanceof Fd(e).ShadowRoot || e instanceof ShadowRoot;
}
// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function zd(e) {
	var t = e.state;
	Object.keys(t.elements).forEach(function(e) {
		var n = t.styles[e] || {}, r = t.attributes[e] || {}, i = t.elements[e];
		Ld(i) && Pd(i) && (Object.assign(i.style, n), Object.keys(r).forEach(function(e) {
			var t = r[e];
			t === !1 ? i.removeAttribute(e) : i.setAttribute(e, t === !0 ? "" : t);
		}));
	});
}
function Bd(e) {
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
			Ld(r) && Pd(r) && (Object.assign(r.style, a), Object.keys(i).forEach(function(e) {
				r.removeAttribute(e);
			}));
		});
	};
}
var Vd = {
	name: "applyStyles",
	enabled: !0,
	phase: "write",
	fn: zd,
	effect: Bd,
	requires: ["computeStyles"]
};
// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function Hd(e) {
	return e.split("-")[0];
}
// node_modules/@popperjs/core/lib/utils/math.js
var Ud = Math.max, Wd = Math.min, Gd = Math.round;
// node_modules/@popperjs/core/lib/utils/userAgent.js
function Kd() {
	var e = navigator.userAgentData;
	return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(e) {
		return e.brand + "/" + e.version;
	}).join(" ") : navigator.userAgent;
}
// node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function qd() {
	return !/^((?!chrome|android).)*safari/i.test(Kd());
}
// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function Jd(e, t, n) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	var r = e.getBoundingClientRect(), i = 1, a = 1;
	t && Ld(e) && (i = e.offsetWidth > 0 && Gd(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && Gd(r.height) / e.offsetHeight || 1);
	var o = (Id(e) ? Fd(e) : window).visualViewport, s = !qd() && n, c = (r.left + (s && o ? o.offsetLeft : 0)) / i, l = (r.top + (s && o ? o.offsetTop : 0)) / a, u = r.width / i, d = r.height / a;
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
// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function Yd(e) {
	var t = Jd(e), n = e.offsetWidth, r = e.offsetHeight;
	return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
		x: e.offsetLeft,
		y: e.offsetTop,
		width: n,
		height: r
	};
}
// node_modules/@popperjs/core/lib/dom-utils/contains.js
function Xd(e, t) {
	var n = t.getRootNode && t.getRootNode();
	if (e.contains(t)) return !0;
	if (n && Rd(n)) {
		var r = t;
		do {
			if (r && e.isSameNode(r)) return !0;
			r = r.parentNode || r.host;
		} while (r);
	}
	return !1;
}
// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function Zd(e) {
	return Fd(e).getComputedStyle(e);
}
// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function Qd(e) {
	return [
		"table",
		"td",
		"th"
	].indexOf(Pd(e)) >= 0;
}
// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function $d(e) {
	return ((Id(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function ef(e) {
	return Pd(e) === "html" ? e : e.assignedSlot || e.parentNode || (Rd(e) ? e.host : null) || $d(e);
}
// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function tf(e) {
	return !Ld(e) || Zd(e).position === "fixed" ? null : e.offsetParent;
}
function nf(e) {
	var t = /firefox/i.test(Kd());
	if (/Trident/i.test(Kd()) && Ld(e) && Zd(e).position === "fixed") return null;
	var n = ef(e);
	for (Rd(n) && (n = n.host); Ld(n) && ["html", "body"].indexOf(Pd(n)) < 0;) {
		var r = Zd(n);
		if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none") return n;
		n = n.parentNode;
	}
	return null;
}
function rf(e) {
	for (var t = Fd(e), n = tf(e); n && Qd(n) && Zd(n).position === "static";) n = tf(n);
	return n && (Pd(n) === "html" || Pd(n) === "body" && Zd(n).position === "static") ? t : n || nf(e) || t;
}
// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function af(e) {
	return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
// node_modules/@popperjs/core/lib/utils/within.js
function of(e, t, n) {
	return Ud(e, Wd(t, n));
}
function sf(e, t, n) {
	var r = of(e, t, n);
	return r > n ? n : r;
}
// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function cf() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function lf(e) {
	return Object.assign({}, cf(), e);
}
// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function uf(e, t) {
	return t.reduce(function(t, n) {
		return t[n] = e, t;
	}, {});
}
// node_modules/@popperjs/core/lib/modifiers/arrow.js
var df = function(e, t) {
	return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, lf(typeof e == "number" ? uf(e, Td) : e);
};
function ff(e) {
	var t, n = e.state, r = e.name, i = e.options, a = n.elements.arrow, o = n.modifiersData.popperOffsets, s = Hd(n.placement), c = af(s), l = ["left", "right"].indexOf(s) >= 0 ? "height" : "width";
	if (a && o) {
		var u = df(i.padding, n), d = Yd(a), f = c === "y" ? "top" : Cd, p = c === "y" ? xd : Sd, m = n.rects.reference[l] + n.rects.reference[c] - o[c] - n.rects.popper[l], h = o[c] - n.rects.reference[c], g = rf(a), _ = g ? c === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, v = m / 2 - h / 2, y = u[f], b = _ - d[l] - u[p], x = _ / 2 - d[l] / 2 + v, S = of(y, x, b), C = c;
		n.modifiersData[r] = (t = {}, t[C] = S, t.centerOffset = S - x, t);
	}
}
function pf(e) {
	var t = e.state, n = e.options.element, r = n === void 0 ? "[data-popper-arrow]" : n;
	r != null && (typeof r == "string" && (r = t.elements.popper.querySelector(r), !r) || Xd(t.elements.popper, r) && (t.elements.arrow = r));
}
var mf = {
	name: "arrow",
	enabled: !0,
	phase: "main",
	fn: ff,
	effect: pf,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
// node_modules/@popperjs/core/lib/utils/getVariation.js
function hf(e) {
	return e.split("-")[1];
}
// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var gf = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function _f(e, t) {
	var n = e.x, r = e.y, i = t.devicePixelRatio || 1;
	return {
		x: Gd(n * i) / i || 0,
		y: Gd(r * i) / i || 0
	};
}
function vf(e) {
	var t, n = e.popper, r = e.popperRect, i = e.placement, a = e.variation, o = e.offsets, s = e.position, c = e.gpuAcceleration, l = e.adaptive, u = e.roundOffsets, d = e.isFixed, f = o.x, p = f === void 0 ? 0 : f, m = o.y, h = m === void 0 ? 0 : m, g = typeof u == "function" ? u({
		x: p,
		y: h
	}) : {
		x: p,
		y: h
	};
	p = g.x, h = g.y;
	var _ = o.hasOwnProperty("x"), v = o.hasOwnProperty("y"), y = Cd, b = "top", x = window;
	if (l) {
		var S = rf(n), C = "clientHeight", w = "clientWidth";
		if (S === Fd(n) && (S = $d(n), Zd(S).position !== "static" && s === "absolute" && (C = "scrollHeight", w = "scrollWidth")), S = S, i === "top" || (i === "left" || i === "right") && a === "end") {
			b = xd;
			var T = d && S === x && x.visualViewport ? x.visualViewport.height : S[C];
			h -= T - r.height, h *= c ? 1 : -1;
		}
		if (i === "left" || (i === "top" || i === "bottom") && a === "end") {
			y = Sd;
			var E = d && S === x && x.visualViewport ? x.visualViewport.width : S[w];
			p -= E - r.width, p *= c ? 1 : -1;
		}
	}
	var D = Object.assign({ position: s }, l && gf), O = u === !0 ? _f({
		x: p,
		y: h
	}, Fd(n)) : {
		x: p,
		y: h
	};
	if (p = O.x, h = O.y, c) {
		var k;
		return Object.assign({}, D, (k = {}, k[b] = v ? "0" : "", k[y] = _ ? "0" : "", k.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", k));
	}
	return Object.assign({}, D, (t = {}, t[b] = v ? h + "px" : "", t[y] = _ ? p + "px" : "", t.transform = "", t));
}
function yf(e) {
	var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 || r, a = n.adaptive, o = a === void 0 || a, s = n.roundOffsets, c = s === void 0 || s, l = {
		placement: Hd(t.placement),
		variation: hf(t.placement),
		popper: t.elements.popper,
		popperRect: t.rects.popper,
		gpuAcceleration: i,
		isFixed: t.options.strategy === "fixed"
	};
	t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, vf(Object.assign({}, l, {
		offsets: t.modifiersData.popperOffsets,
		position: t.options.strategy,
		adaptive: o,
		roundOffsets: c
	})))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, vf(Object.assign({}, l, {
		offsets: t.modifiersData.arrow,
		position: "absolute",
		adaptive: !1,
		roundOffsets: c
	})))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var bf = {
	name: "computeStyles",
	enabled: !0,
	phase: "beforeWrite",
	fn: yf,
	data: {}
}, xf = { passive: !0 };
function Sf(e) {
	var t = e.state, n = e.instance, r = e.options, i = r.scroll, a = i === void 0 || i, o = r.resize, s = o === void 0 || o, c = Fd(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
	return a && l.forEach(function(e) {
		e.addEventListener("scroll", n.update, xf);
	}), s && c.addEventListener("resize", n.update, xf), function() {
		a && l.forEach(function(e) {
			e.removeEventListener("scroll", n.update, xf);
		}), s && c.removeEventListener("resize", n.update, xf);
	};
}
var Cf = {
	name: "eventListeners",
	enabled: !0,
	phase: "write",
	fn: function() {},
	effect: Sf,
	data: {}
}, wf = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Tf(e) {
	return e.replace(/left|right|bottom|top/g, function(e) {
		return wf[e];
	});
}
// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var Ef = {
	start: "end",
	end: "start"
};
function Df(e) {
	return e.replace(/start|end/g, function(e) {
		return Ef[e];
	});
}
// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function Of(e) {
	var t = Fd(e);
	return {
		scrollLeft: t.pageXOffset,
		scrollTop: t.pageYOffset
	};
}
// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function kf(e) {
	return Jd($d(e)).left + Of(e).scrollLeft;
}
// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function Af(e, t) {
	var n = Fd(e), r = $d(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		var l = qd();
		(l || !l && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	return {
		width: a,
		height: o,
		x: s + kf(e),
		y: c
	};
}
// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function jf(e) {
	var t = $d(e), n = Of(e), r = e.ownerDocument?.body, i = Ud(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), a = Ud(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), o = -n.scrollLeft + kf(e), s = -n.scrollTop;
	return Zd(r || t).direction === "rtl" && (o += Ud(t.clientWidth, r ? r.clientWidth : 0) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function Mf(e) {
	var t = Zd(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
	return /auto|scroll|overlay|hidden/.test(n + i + r);
}
// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function Nf(e) {
	return [
		"html",
		"body",
		"#document"
	].indexOf(Pd(e)) >= 0 ? e.ownerDocument.body : Ld(e) && Mf(e) ? e : Nf(ef(e));
}
// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function Pf(e, t) {
	t === void 0 && (t = []);
	var n = Nf(e), r = n === e.ownerDocument?.body, i = Fd(n), a = r ? [i].concat(i.visualViewport || [], Mf(n) ? n : []) : n, o = t.concat(a);
	return r ? o : o.concat(Pf(ef(a)));
}
// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function Ff(e) {
	return Object.assign({}, e, {
		left: e.x,
		top: e.y,
		right: e.x + e.width,
		bottom: e.y + e.height
	});
}
// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function If(e, t) {
	var n = Jd(e, !1, t === "fixed");
	return n.top += e.clientTop, n.left += e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Lf(e, t, n) {
	return t === "viewport" ? Ff(Af(e, n)) : Id(t) ? If(t, n) : Ff(jf($d(e)));
}
function Rf(e) {
	var t = Pf(ef(e)), n = ["absolute", "fixed"].indexOf(Zd(e).position) >= 0 && Ld(e) ? rf(e) : e;
	return Id(n) ? t.filter(function(e) {
		return Id(e) && Xd(e, n) && Pd(e) !== "body";
	}) : [];
}
function zf(e, t, n, r) {
	var i = t === "clippingParents" ? Rf(e) : [].concat(t), a = [].concat(i, [n]), o = a[0], s = a.reduce(function(t, n) {
		var i = Lf(e, n, r);
		return t.top = Ud(i.top, t.top), t.right = Wd(i.right, t.right), t.bottom = Wd(i.bottom, t.bottom), t.left = Ud(i.left, t.left), t;
	}, Lf(e, o, r));
	return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function Bf(e) {
	var t = e.reference, n = e.element, r = e.placement, i = r ? Hd(r) : null, a = r ? hf(r) : null, o = t.x + t.width / 2 - n.width / 2, s = t.y + t.height / 2 - n.height / 2, c;
	switch (i) {
		case "top":
			c = {
				x: o,
				y: t.y - n.height
			};
			break;
		case xd:
			c = {
				x: o,
				y: t.y + t.height
			};
			break;
		case Sd:
			c = {
				x: t.x + t.width,
				y: s
			};
			break;
		case Cd:
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
	var l = i ? af(i) : null;
	if (l != null) {
		var u = l === "y" ? "height" : "width";
		switch (a) {
			case Ed:
				c[l] = c[l] - (t[u] / 2 - n[u] / 2);
				break;
			case "end": c[l] = c[l] + (t[u] / 2 - n[u] / 2);
		}
	}
	return c;
}
// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function Vf(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = r === void 0 ? e.placement : r, a = n.strategy, o = a === void 0 ? e.strategy : a, s = n.boundary, c = s === void 0 ? Dd : s, l = n.rootBoundary, u = l === void 0 ? Od : l, d = n.elementContext, f = d === void 0 ? kd : d, p = n.altBoundary, m = p !== void 0 && p, h = n.padding, g = h === void 0 ? 0 : h, _ = lf(typeof g == "number" ? uf(g, Td) : g), v = f === "popper" ? Ad : kd, y = e.rects.popper, b = e.elements[m ? v : f], x = zf(Id(b) ? b : b.contextElement || $d(e.elements.popper), c, u, o), S = Jd(e.elements.reference), C = Bf({
		reference: S,
		element: y,
		strategy: "absolute",
		placement: i
	}), w = Ff(Object.assign({}, y, C)), T = f === "popper" ? w : S, E = {
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
// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function Hf(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = n.boundary, a = n.rootBoundary, o = n.padding, s = n.flipVariations, c = n.allowedAutoPlacements, l = c === void 0 ? Md : c, u = hf(r), d = u ? s ? jd : jd.filter(function(e) {
		return hf(e) === u;
	}) : Td, f = d.filter(function(e) {
		return l.indexOf(e) >= 0;
	});
	f.length === 0 && (f = d);
	var p = f.reduce(function(t, n) {
		return t[n] = Vf(e, {
			placement: n,
			boundary: i,
			rootBoundary: a,
			padding: o
		})[Hd(n)], t;
	}, {});
	return Object.keys(p).sort(function(e, t) {
		return p[e] - p[t];
	});
}
// node_modules/@popperjs/core/lib/modifiers/flip.js
function Uf(e) {
	if (Hd(e) === "auto") return [];
	var t = Tf(e);
	return [
		Df(e),
		t,
		Df(t)
	];
}
function Wf(e) {
	var t = e.state, n = e.options, r = e.name;
	if (!t.modifiersData[r]._skip) {
		for (var i = n.mainAxis, a = i === void 0 || i, o = n.altAxis, s = o === void 0 || o, c = n.fallbackPlacements, l = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, m = p === void 0 || p, h = n.allowedAutoPlacements, g = t.options.placement, _ = Hd(g) === g, v = c || (_ || !m ? [Tf(g)] : Uf(g)), y = [g].concat(v).reduce(function(e, n) {
			return e.concat(Hd(n) === "auto" ? Hf(t, {
				placement: n,
				boundary: u,
				rootBoundary: d,
				padding: l,
				flipVariations: m,
				allowedAutoPlacements: h
			}) : n);
		}, []), b = t.rects.reference, x = t.rects.popper, S = /* @__PURE__ */ new Map(), C = !0, w = y[0], T = 0; T < y.length; T++) {
			var E = y[T], D = Hd(E), O = hf(E) === Ed, k = ["top", xd].indexOf(D) >= 0, ee = k ? "width" : "height", A = Vf(t, {
				placement: E,
				boundary: u,
				rootBoundary: d,
				altBoundary: f,
				padding: l
			}), j = k ? O ? Sd : Cd : O ? xd : "top";
			b[ee] > x[ee] && (j = Tf(j));
			var M = Tf(j), te = [];
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
var Gf = {
	name: "flip",
	enabled: !0,
	phase: "main",
	fn: Wf,
	requiresIfExists: ["offset"],
	data: { _skip: !1 }
};
// node_modules/@popperjs/core/lib/modifiers/hide.js
function Kf(e, t, n) {
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
function qf(e) {
	return [
		"top",
		Sd,
		xd,
		Cd
	].some(function(t) {
		return e[t] >= 0;
	});
}
function Jf(e) {
	var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, a = t.modifiersData.preventOverflow, o = Vf(t, { elementContext: "reference" }), s = Vf(t, { altBoundary: !0 }), c = Kf(o, r), l = Kf(s, i, a), u = qf(c), d = qf(l);
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
var Yf = {
	name: "hide",
	enabled: !0,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: Jf
};
// node_modules/@popperjs/core/lib/modifiers/offset.js
function Xf(e, t, n) {
	var r = Hd(e), i = ["left", "top"].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, o = a[0], s = a[1];
	return o ||= 0, s = (s || 0) * i, ["left", "right"].indexOf(r) >= 0 ? {
		x: s,
		y: o
	} : {
		x: o,
		y: s
	};
}
function Zf(e) {
	var t = e.state, n = e.options, r = e.name, i = n.offset, a = i === void 0 ? [0, 0] : i, o = Md.reduce(function(e, n) {
		return e[n] = Xf(n, t.rects, a), e;
	}, {}), s = o[t.placement], c = s.x, l = s.y;
	t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += l), t.modifiersData[r] = o;
}
var Qf = {
	name: "offset",
	enabled: !0,
	phase: "main",
	requires: ["popperOffsets"],
	fn: Zf
};
// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function $f(e) {
	var t = e.state, n = e.name;
	t.modifiersData[n] = Bf({
		reference: t.rects.reference,
		element: t.rects.popper,
		strategy: "absolute",
		placement: t.placement
	});
}
var ep = {
	name: "popperOffsets",
	enabled: !0,
	phase: "read",
	fn: $f,
	data: {}
};
// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function tp(e) {
	return e === "x" ? "y" : "x";
}
// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function np(e) {
	var t = e.state, n = e.options, r = e.name, i = n.mainAxis, a = i === void 0 || i, o = n.altAxis, s = o !== void 0 && o, c = n.boundary, l = n.rootBoundary, u = n.altBoundary, d = n.padding, f = n.tether, p = f === void 0 || f, m = n.tetherOffset, h = m === void 0 ? 0 : m, g = Vf(t, {
		boundary: c,
		rootBoundary: l,
		padding: d,
		altBoundary: u
	}), _ = Hd(t.placement), v = hf(t.placement), y = !v, b = af(_), x = tp(b), S = t.modifiersData.popperOffsets, C = t.rects.reference, w = t.rects.popper, T = typeof h == "function" ? h(Object.assign({}, t.rects, { placement: t.placement })) : h, E = typeof T == "number" ? {
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
			var k = b === "y" ? "top" : Cd, ee = b === "y" ? xd : Sd, A = b === "y" ? "height" : "width", j = S[b], M = j + g[k], te = j - g[ee], ne = p ? -w[A] / 2 : 0, re = v === "start" ? C[A] : w[A], N = v === "start" ? -w[A] : -C[A], ie = t.elements.arrow, P = p && ie ? Yd(ie) : {
				width: 0,
				height: 0
			}, ae = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : cf(), oe = ae[k], se = ae[ee], ce = of(0, C[A], P[A]), le = y ? C[A] / 2 - ne - ce - oe - E.mainAxis : re - ce - oe - E.mainAxis, ue = y ? -C[A] / 2 + ne + ce + se + E.mainAxis : N + ce + se + E.mainAxis, de = t.elements.arrow && rf(t.elements.arrow), fe = de ? b === "y" ? de.clientTop || 0 : de.clientLeft || 0 : 0, pe = D?.[b] ?? 0, me = j + le - pe - fe, he = j + ue - pe, ge = of(p ? Wd(M, me) : M, j, p ? Ud(te, he) : te);
			S[b] = ge, O[b] = ge - j;
		}
		if (s) {
			var _e = b === "x" ? "top" : Cd, ve = b === "x" ? xd : Sd, ye = S[x], be = x === "y" ? "height" : "width", xe = ye + g[_e], Se = ye - g[ve], Ce = ["top", Cd].indexOf(_) !== -1, we = D?.[x] ?? 0, Te = Ce ? xe : ye - C[be] - w[be] - we + E.altAxis, Ee = Ce ? ye + C[be] + w[be] - we - E.altAxis : Se, De = p && Ce ? sf(Te, ye, Ee) : of(p ? Te : xe, ye, p ? Ee : Se);
			S[x] = De, O[x] = De - ye;
		}
		t.modifiersData[r] = O;
	}
}
var rp = {
	name: "preventOverflow",
	enabled: !0,
	phase: "main",
	fn: np,
	requiresIfExists: ["offset"]
};
// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function ip(e) {
	return {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	};
}
// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function ap(e) {
	return e === Fd(e) || !Ld(e) ? Of(e) : ip(e);
}
// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function op(e) {
	var t = e.getBoundingClientRect(), n = Gd(t.width) / e.offsetWidth || 1, r = Gd(t.height) / e.offsetHeight || 1;
	return n !== 1 || r !== 1;
}
function sp(e, t, n) {
	n === void 0 && (n = !1);
	var r = Ld(t), i = Ld(t) && op(t), a = $d(t), o = Jd(e, i, n), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = {
		x: 0,
		y: 0
	};
	return (r || !r && !n) && ((Pd(t) !== "body" || Mf(a)) && (s = ap(t)), Ld(t) ? (c = Jd(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = kf(a))), {
		x: o.left + s.scrollLeft - c.x,
		y: o.top + s.scrollTop - c.y,
		width: o.width,
		height: o.height
	};
}
// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function cp(e) {
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
function lp(e) {
	var t = cp(e);
	return Nd.reduce(function(e, n) {
		return e.concat(t.filter(function(e) {
			return e.phase === n;
		}));
	}, []);
}
// node_modules/@popperjs/core/lib/utils/debounce.js
function up(e) {
	var t;
	return function() {
		return t ||= new Promise(function(n) {
			Promise.resolve().then(function() {
				t = void 0, n(e());
			});
		}), t;
	};
}
// node_modules/@popperjs/core/lib/utils/mergeByName.js
function dp(e) {
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
// node_modules/@popperjs/core/lib/createPopper.js
var fp = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function pp() {
	return ![...arguments].some(function(e) {
		return !(e && typeof e.getBoundingClientRect == "function");
	});
}
function mp(e) {
	e === void 0 && (e = {});
	var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, a = i === void 0 ? fp : i;
	return function(e, t, n) {
		n === void 0 && (n = a);
		var i = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, fp, a),
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
					reference: Id(e) ? Pf(e) : e.contextElement ? Pf(e.contextElement) : [],
					popper: Pf(t)
				};
				var s = lp(dp([].concat(r, i.options.modifiers)));
				return i.orderedModifiers = s.filter(function(e) {
					return e.enabled;
				}), l(), c.update();
			},
			forceUpdate: function() {
				if (!s) {
					var e = i.elements, t = e.reference, n = e.popper;
					if (pp(t, n)) {
						i.rects = {
							reference: sp(t, rf(n), i.options.strategy === "fixed"),
							popper: Yd(n)
						}, i.reset = !1, i.placement = i.options.placement, i.orderedModifiers.forEach(function(e) {
							return i.modifiersData[e.name] = Object.assign({}, e.data);
						});
						for (var r = 0; r < i.orderedModifiers.length; r++) if (i.reset === !0) i.reset = !1, r = -1;
						else {
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
			update: up(function() {
				return new Promise(function(e) {
					c.forceUpdate(), e(i);
				});
			}),
			destroy: function() {
				u(), s = !0;
			}
		};
		if (!pp(e, t)) return c;
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
var hp = /*#__PURE__*/ mp({ defaultModifiers: [
	Cf,
	ep,
	bf,
	Vd,
	Qf,
	Gf,
	rp,
	mf,
	Yf
] }), gp = "tippy-box", _p = "tippy-content", vp = "tippy-backdrop", yp = "tippy-arrow", bp = "tippy-svg-arrow", xp = {
	passive: !0,
	capture: !0
}, Sp = function() {
	return document.body;
};
function Cp(e, t, n) {
	return Array.isArray(e) ? e[t] ?? (Array.isArray(n) ? n[t] : n) : e;
}
function wp(e, t) {
	var n = {}.toString.call(e);
	return n.indexOf("[object") === 0 && n.indexOf(t + "]") > -1;
}
function Tp(e, t) {
	return typeof e == "function" ? e.apply(void 0, t) : e;
}
function Ep(e, t) {
	if (t === 0) return e;
	var n;
	return function(r) {
		clearTimeout(n), n = setTimeout(function() {
			e(r);
		}, t);
	};
}
function Dp(e) {
	return e.split(/\s+/).filter(Boolean);
}
function Op(e) {
	return [].concat(e);
}
function kp(e, t) {
	e.indexOf(t) === -1 && e.push(t);
}
function Ap(e) {
	return e.filter(function(t, n) {
		return e.indexOf(t) === n;
	});
}
function jp(e) {
	return e.split("-")[0];
}
function Mp(e) {
	return [].slice.call(e);
}
function Np(e) {
	return Object.keys(e).reduce(function(t, n) {
		return e[n] !== void 0 && (t[n] = e[n]), t;
	}, {});
}
function Pp() {
	return document.createElement("div");
}
function Fp(e) {
	return ["Element", "Fragment"].some(function(t) {
		return wp(e, t);
	});
}
function Ip(e) {
	return wp(e, "NodeList");
}
function Lp(e) {
	return wp(e, "MouseEvent");
}
function Rp(e) {
	return !!(e && e._tippy && e._tippy.reference === e);
}
function zp(e) {
	return Fp(e) ? [e] : Ip(e) ? Mp(e) : Array.isArray(e) ? e : Mp(document.querySelectorAll(e));
}
function Bp(e, t) {
	e.forEach(function(e) {
		e && (e.style.transitionDuration = t + "ms");
	});
}
function Vp(e, t) {
	e.forEach(function(e) {
		e && e.setAttribute("data-state", t);
	});
}
function Hp(e) {
	var t, n = Op(e)[0];
	return n != null && (t = n.ownerDocument) != null && t.body ? n.ownerDocument : document;
}
function Up(e, t) {
	var n = t.clientX, r = t.clientY;
	return e.every(function(e) {
		var t = e.popperRect, i = e.popperState, a = e.props.interactiveBorder, o = jp(i.placement), s = i.modifiersData.offset;
		if (!s) return !0;
		var c = o === "bottom" ? s.top.y : 0, l = o === "top" ? s.bottom.y : 0, u = o === "right" ? s.left.x : 0, d = o === "left" ? s.right.x : 0, f = t.top - r + c > a, p = r - t.bottom - l > a, m = t.left - n + u > a, h = n - t.right - d > a;
		return f || p || m || h;
	});
}
function Wp(e, t, n) {
	var r = t + "EventListener";
	["transitionend", "webkitTransitionEnd"].forEach(function(t) {
		e[r](t, n);
	});
}
function Gp(e, t) {
	for (var n = t; n;) {
		if (e.contains(n)) return !0;
		n = n.getRootNode == null ? void 0 : n.getRootNode()?.host;
	}
	return !1;
}
var Kp = { isTouch: !1 }, qp = 0;
function Jp() {
	Kp.isTouch || (Kp.isTouch = !0, window.performance && document.addEventListener("mousemove", Yp));
}
function Yp() {
	var e = performance.now();
	e - qp < 20 && (Kp.isTouch = !1, document.removeEventListener("mousemove", Yp)), qp = e;
}
function Xp() {
	var e = document.activeElement;
	if (Rp(e)) {
		var t = e._tippy;
		e.blur && !t.state.isVisible && e.blur();
	}
}
function Zp() {
	document.addEventListener("touchstart", Jp, xp), window.addEventListener("blur", Xp);
}
var Qp = typeof window < "u" && typeof document < "u" && !!window.msCrypto, $p = Object.assign({
	appendTo: Sp,
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
}), em = Object.keys($p), tm = function(e) {
	Object.keys(e).forEach(function(t) {
		$p[t] = e[t];
	});
};
function nm(e) {
	var t = (e.plugins || []).reduce(function(t, n) {
		var r = n.name, i = n.defaultValue;
		return r && (t[r] = e[r] === void 0 ? $p[r] ?? i : e[r]), t;
	}, {});
	return Object.assign({}, e, t);
}
function rm(e, t) {
	return (t ? Object.keys(nm(Object.assign({}, $p, { plugins: t }))) : em).reduce(function(t, n) {
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
function im(e, t) {
	var n = Object.assign({}, t, { content: Tp(t.content, [e]) }, t.ignoreAttributes ? {} : rm(e, t.plugins));
	return n.aria = Object.assign({}, $p.aria, n.aria), n.aria = {
		expanded: n.aria.expanded === "auto" ? t.interactive : n.aria.expanded,
		content: n.aria.content === "auto" ? t.interactive ? null : "describedby" : n.aria.content
	}, n;
}
var am = function() {
	return "innerHTML";
};
function om(e, t) {
	e[am()] = t;
}
function sm(e) {
	var t = Pp();
	return e === !0 ? t.className = yp : (t.className = bp, Fp(e) ? t.appendChild(e) : om(t, e)), t;
}
function cm(e, t) {
	Fp(t.content) ? (om(e, ""), e.appendChild(t.content)) : typeof t.content != "function" && (t.allowHTML ? om(e, t.content) : e.textContent = t.content);
}
function lm(e) {
	var t = e.firstElementChild, n = Mp(t.children);
	return {
		box: t,
		content: n.find(function(e) {
			return e.classList.contains(_p);
		}),
		arrow: n.find(function(e) {
			return e.classList.contains(yp) || e.classList.contains(bp);
		}),
		backdrop: n.find(function(e) {
			return e.classList.contains(vp);
		})
	};
}
function um(e) {
	var t = Pp(), n = Pp();
	n.className = gp, n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
	var r = Pp();
	r.className = _p, r.setAttribute("data-state", "hidden"), cm(r, e.props), t.appendChild(n), n.appendChild(r), i(e.props, e.props);
	function i(n, r) {
		var i = lm(t), a = i.box, o = i.content, s = i.arrow;
		r.theme ? a.setAttribute("data-theme", r.theme) : a.removeAttribute("data-theme"), typeof r.animation == "string" ? a.setAttribute("data-animation", r.animation) : a.removeAttribute("data-animation"), r.inertia ? a.setAttribute("data-inertia", "") : a.removeAttribute("data-inertia"), a.style.maxWidth = typeof r.maxWidth == "number" ? r.maxWidth + "px" : r.maxWidth, r.role ? a.setAttribute("role", r.role) : a.removeAttribute("role"), (n.content !== r.content || n.allowHTML !== r.allowHTML) && cm(o, e.props), r.arrow ? s ? n.arrow !== r.arrow && (a.removeChild(s), a.appendChild(sm(r.arrow))) : a.appendChild(sm(r.arrow)) : s && a.removeChild(s);
	}
	return {
		popper: t,
		onUpdate: i
	};
}
um.$$tippy = !0;
var dm = 1, fm = [], pm = [];
function mm(e, t) {
	var n = im(e, Object.assign({}, $p, nm(Np(t)))), r, i, a, o = !1, s = !1, c = !1, l = !1, u, d, f, p = [], m = Ep(me, n.interactiveDebounce), h, g = dm++, _ = null, v = Ap(n.plugins), y = {
		id: g,
		reference: e,
		popper: Pp(),
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
		return e ? Hp(e) : document;
	}
	function ee() {
		return lm(x);
	}
	function A(e) {
		return y.state.isMounted && !y.state.isVisible || Kp.isTouch || u && u.type === "focus" ? 0 : Cp(y.props.delay, +!e, $p.delay);
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
			Op(y.props.triggerTarget || e).forEach(function(e) {
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
		!w && y.props.aria.expanded && Op(y.props.triggerTarget || e).forEach(function(e) {
			y.props.interactive ? e.setAttribute("aria-expanded", y.state.isVisible && e === O() ? "true" : "false") : e.removeAttribute("aria-expanded");
		});
	}
	function re() {
		k().removeEventListener("mousemove", m), fm = fm.filter(function(e) {
			return e !== m;
		});
	}
	function N(t) {
		if (!Kp.isTouch || !c && t.type !== "mousedown") {
			var n = t.composedPath && t.composedPath()[0] || t.target;
			if (!(y.props.interactive && Gp(x, n))) {
				if (Op(y.props.triggerTarget || e).some(function(e) {
					return Gp(e, n);
				})) {
					if (Kp.isTouch || y.state.isVisible && y.props.trigger.indexOf("click") >= 0) return;
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
		e.addEventListener("mousedown", N, !0), e.addEventListener("touchend", N, xp), e.addEventListener("touchstart", P, xp), e.addEventListener("touchmove", ie, xp);
	}
	function oe() {
		var e = k();
		e.removeEventListener("mousedown", N, !0), e.removeEventListener("touchend", N, xp), e.removeEventListener("touchstart", P, xp), e.removeEventListener("touchmove", ie, xp);
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
			e.target === n && (Wp(n, "remove", r), t());
		}
		if (e === 0) return t();
		Wp(n, "remove", d), Wp(n, "add", r), d = r;
	}
	function ue(t, n, r) {
		r === void 0 && (r = !1), Op(y.props.triggerTarget || e).forEach(function(e) {
			e.addEventListener(t, n, r), p.push({
				node: e,
				eventType: t,
				handler: n,
				options: r
			});
		});
	}
	function de() {
		E() && (ue("touchstart", pe, { passive: !0 }), ue("touchend", he, { passive: !0 })), Dp(y.props.trigger).forEach(function(e) {
			if (e !== "manual") switch (ue(e, pe), e) {
				case "mouseenter":
					ue("mouseleave", he);
					break;
				case "focus":
					ue(Qp ? "focusout" : "blur", ge);
					break;
				case "focusin": ue("focusout", ge);
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
			u = e, h = e.currentTarget, ne(), !y.state.isVisible && Lp(e) && fm.forEach(function(t) {
				return t(e);
			}), e.type === "click" && (y.props.trigger.indexOf("mouseenter") < 0 || o) && y.props.hideOnClick !== !1 && y.state.isVisible ? t = !0 : Se(e), e.type === "click" && (o = !t), t && !n && Ce(e);
		}
	}
	function me(e) {
		var t = e.target, r = O().contains(t) || x.contains(t);
		e.type === "mousemove" && r || Up(xe().concat(x).map(function(e) {
			var t = e._tippy.popperInstance?.state;
			return t ? {
				popperRect: e.getBoundingClientRect(),
				popperState: t,
				props: n
			} : null;
		}).filter(Boolean), e) && (re(), Ce(e));
	}
	function he(e) {
		_e(e) || y.props.trigger.indexOf("click") >= 0 && o || (y.props.interactive ? y.hideWithInteractivity(e) : Ce(e));
	}
	function ge(e) {
		y.props.trigger.indexOf("focusin") < 0 && e.target !== O() || y.props.interactive && e.relatedTarget && x.contains(e.relatedTarget) || Ce(e);
	}
	function _e(e) {
		return Kp.isTouch ? E() !== e.type.indexOf("touch") >= 0 : !1;
	}
	function ve() {
		ye();
		var t = y.props, n = t.popperOptions, r = t.placement, i = t.offset, a = t.getReferenceClientRect, o = t.moveTransition, s = D() ? lm(x).arrow : null, c = a ? {
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
		}), l.push.apply(l, n?.modifiers || []), y.popperInstance = hp(c, x, Object.assign({}, n, {
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
		t = y.props.interactive && e === Sp || e === "parent" ? n.parentNode : Tp(e, [n]), t.contains(x) || t.appendChild(x), y.state.isMounted = !0, ve();
	}
	function xe() {
		return Mp(x.querySelectorAll("[data-tippy-root]"));
	}
	function Se(e) {
		y.clearDelayTimeouts(), e && M("onTrigger", [y, e]), ae();
		var t = A(!0), n = T(), i = n[0], a = n[1];
		Kp.isTouch && i === "hold" && a && (t = a), t ? r = setTimeout(function() {
			y.show();
		}, t) : y.show();
	}
	function Ce(e) {
		if (y.clearDelayTimeouts(), M("onUntrigger", [y, e]), !y.state.isVisible) oe();
		else if (!(y.props.trigger.indexOf("mouseenter") >= 0 && y.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(e.type) >= 0 && o)) {
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
			var n = y.props, r = im(e, Object.assign({}, n, Np(t), { ignoreAttributes: !0 }));
			y.props = r, de(), n.interactiveDebounce !== r.interactiveDebounce && (re(), m = Ep(me, r.interactiveDebounce)), n.triggerTarget && !r.triggerTarget ? Op(n.triggerTarget).forEach(function(e) {
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
		var e = y.state.isVisible, t = y.state.isDestroyed, n = !y.state.isEnabled, r = Kp.isTouch && !y.props.touch, i = Cp(y.props.duration, 0, $p.duration);
		if (!(e || t || n || r) && !O().hasAttribute("disabled") && (M("onShow", [y], !1), y.props.onShow(y) !== !1)) {
			if (y.state.isVisible = !0, D() && (x.style.visibility = "visible"), j(), ae(), y.state.isMounted || (x.style.transition = "none"), D()) {
				var a = ee(), o = a.box, s = a.content;
				Bp([o, s], 0);
			}
			f = function() {
				var e;
				if (y.state.isVisible && !l) {
					if (l = !0, x.offsetHeight, x.style.transition = y.props.moveTransition, D() && y.props.animation) {
						var t = ee(), n = t.box, r = t.content;
						Bp([n, r], i), Vp([n, r], "visible");
					}
					te(), ne(), kp(pm, y), (e = y.popperInstance) == null || e.forceUpdate(), M("onMount", [y]), y.props.animation && D() && ce(i, function() {
						y.state.isShown = !0, M("onShown", [y]);
					});
				}
			}, be();
		}
	}
	function Ae() {
		var e = !y.state.isVisible, t = y.state.isDestroyed, n = !y.state.isEnabled, r = Cp(y.props.duration, 1, $p.duration);
		if (!(e || t || n) && (M("onHide", [y], !1), y.props.onHide(y) !== !1)) {
			if (y.state.isVisible = !1, y.state.isShown = !1, l = !1, o = !1, D() && (x.style.visibility = "hidden"), re(), oe(), j(!0), D()) {
				var i = ee(), a = i.box, s = i.content;
				y.props.animation && (Bp([a, s], r), Vp([a, s], "hidden"));
			}
			te(), ne(), y.props.animation ? D() && se(r, y.unmount) : y.unmount();
		}
	}
	function je(e) {
		k().addEventListener("mousemove", m), kp(fm, m), m(e);
	}
	function Me() {
		y.state.isVisible && y.hide(), y.state.isMounted && (ye(), xe().forEach(function(e) {
			e._tippy.unmount();
		}), x.parentNode && x.parentNode.removeChild(x), pm = pm.filter(function(e) {
			return e !== y;
		}), y.state.isMounted = !1, M("onHidden", [y]));
	}
	function Ne() {
		y.state.isDestroyed || (y.clearDelayTimeouts(), y.unmount(), fe(), delete e._tippy, y.state.isDestroyed = !0, M("onDestroy", [y]));
	}
}
function hm(e, t) {
	t === void 0 && (t = {});
	var n = $p.plugins.concat(t.plugins || []);
	Zp();
	var r = Object.assign({}, t, { plugins: n }), i = zp(e).reduce(function(e, t) {
		var n = t && mm(t, r);
		return n && e.push(n), e;
	}, []);
	return Fp(e) ? i[0] : i;
}
hm.defaultProps = $p, hm.setDefaultProps = tm, hm.currentInput = Kp, Object.assign({}, Vd, { effect: function(e) {
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
} }), hm.setDefaultProps({ render: um });
// node_modules/@tiptap/extension-bubble-menu/dist/index.js
var gm = class {
	constructor({ editor: e, element: t, view: n, tippyOptions: r = {}, updateDelay: i = 250, shouldShow: a }) {
		this.preventHide = !1, this.shouldShow = ({ view: e, state: t, from: n, to: r }) => {
			let { doc: i, selection: a } = t, { empty: o } = a, s = !i.textBetween(n, r).length && jl(t.selection), c = this.element.contains(document.activeElement);
			return !(!(e.hasFocus() || c) || o || s || !this.editor.isEditable);
		}, this.mousedownHandler = () => {
			this.preventHide = !0;
		}, this.dragstartHandler = () => {
			this.hide();
		}, this.focusHandler = () => {
			setTimeout(() => this.update(this.editor.view));
		}, this.blurHandler = ({ event: e }) => {
			this.preventHide ? this.preventHide = !1 : e?.relatedTarget && this.element.parentNode?.contains(e.relatedTarget) || e?.relatedTarget !== this.editor.view.dom && this.hide();
		}, this.tippyBlurHandler = (e) => {
			this.blurHandler({ event: e });
		}, this.handleDebouncedUpdate = (e, t) => {
			let n = !t?.selection.eq(e.state.selection), r = !t?.doc.eq(e.state.doc);
			(n || r) && (this.updateDebounceTimer && clearTimeout(this.updateDebounceTimer), this.updateDebounceTimer = window.setTimeout(() => {
				this.updateHandler(e, n, r, t);
			}, this.updateDelay));
		}, this.updateHandler = (e, t, n, r) => {
			var i;
			let { state: a, composing: o } = e, { selection: s } = a;
			if (o || !t && !n) return;
			this.createTooltip();
			let { ranges: c } = s, l = Math.min(...c.map((e) => e.$from.pos)), u = Math.max(...c.map((e) => e.$to.pos));
			this.shouldShow?.call(this, {
				editor: this.editor,
				element: this.element,
				view: e,
				state: a,
				oldState: r,
				from: l,
				to: u
			}) ? ((i = this.tippy) == null || i.setProps({ getReferenceClientRect: this.tippyOptions?.getReferenceClientRect || (() => {
				if (Vu(a.selection)) {
					let t = e.nodeDOM(l);
					if (t) {
						let e = t.dataset.nodeViewWrapper ? t : t.querySelector("[data-node-view-wrapper]");
						if (e && (t = e.firstChild), t) return t.getBoundingClientRect();
					}
				}
				return Hu(e, l, u);
			}) }), this.show()) : this.hide();
		}, this.editor = e, this.element = t, this.view = n, this.updateDelay = i, a && (this.shouldShow = a), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.addEventListener("dragstart", this.dragstartHandler), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = r, this.element.remove(), this.element.style.visibility = "visible";
	}
	createTooltip() {
		let { element: e } = this.editor.options, t = !!e.parentElement;
		this.element.tabIndex = 0, !this.tippy && t && (this.tippy = hm(e, {
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
}, _m = (e) => new B({
	key: typeof e.pluginKey == "string" ? new rr(e.pluginKey) : e.pluginKey,
	view: (t) => new gm({
		view: t,
		...e
	})
});
cl.create({
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
		return this.options.element ? [_m({
			pluginKey: this.options.pluginKey,
			editor: this.editor,
			element: this.options.element,
			tippyOptions: this.options.tippyOptions,
			updateDelay: this.options.updateDelay,
			shouldShow: this.options.shouldShow
		})] : [];
	}
});
// node_modules/@tiptap/extension-floating-menu/dist/index.js
var vm = class {
	getTextContent(e) {
		return Eu(e, { textSerializers: ul(this.editor.schema) });
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
			this.preventHide ? this.preventHide = !1 : e?.relatedTarget && this.element.parentNode?.contains(e.relatedTarget) || e?.relatedTarget !== this.editor.view.dom && this.hide();
		}, this.tippyBlurHandler = (e) => {
			this.blurHandler({ event: e });
		}, this.editor = e, this.element = t, this.view = n, i && (this.shouldShow = i), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = r, this.element.remove(), this.element.style.visibility = "visible";
	}
	createTooltip() {
		let { element: e } = this.editor.options, t = !!e.parentElement;
		this.element.tabIndex = 0, !this.tippy && t && (this.tippy = hm(e, {
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
		t && t.doc.eq(i) && t.selection.eq(a) || (this.createTooltip(), this.shouldShow?.call(this, {
			editor: this.editor,
			view: e,
			state: r,
			oldState: t
		}) ? ((n = this.tippy) == null || n.setProps({ getReferenceClientRect: this.tippyOptions?.getReferenceClientRect || (() => Hu(e, o, s)) }), this.show()) : this.hide());
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
}, ym = (e) => new B({
	key: typeof e.pluginKey == "string" ? new rr(e.pluginKey) : e.pluginKey,
	view: (t) => new vm({
		view: t,
		...e
	})
});
cl.create({
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
		return this.options.element ? [ym({
			pluginKey: this.options.pluginKey,
			editor: this.editor,
			element: this.options.element,
			tippyOptions: this.options.tippyOptions,
			shouldShow: this.options.shouldShow
		})] : [];
	}
});
// node_modules/@tiptap/vue-3/dist/index.js
var bm = s({
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
			r.registerPlugin(_m({
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
function xm(e) {
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
var Sm = class extends pd {
	constructor(e = {}) {
		return super(e), this.contentComponent = null, this.appContext = null, this.reactiveState = xm(this.view.state), this.reactiveExtensionStorage = xm(this.extensionStorage), this.on("beforeTransaction", ({ nextState: e }) => {
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
}, Cm = s({
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
			r.registerPlugin(ym({
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
var wm = (e = {}) => {
	let t = b();
	return g(() => {
		t.value = new Sm(e);
	}), h(() => {
		var e, n;
		let r = t.value?.options.element, i = r?.cloneNode(!0);
		(e = r?.parentNode) == null || e.replaceChild(i, r), (n = t.value) == null || n.destroy();
	}), t;
}, Tm = vd.create({
	name: "doc",
	topNode: !0,
	content: "block+"
}), Em = vd.create({
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
}), Dm = vd.create({
	name: "text",
	group: "inline"
}), Om = 200, Y = function() {};
Y.prototype.append = function(e) {
	return e.length ? (e = Y.from(e), !this.length && e || e.length < Om && this.leafAppend(e) || this.length < Om && e.leafPrepend(this) || this.appendInner(e)) : this;
}, Y.prototype.prepend = function(e) {
	return e.length ? Y.from(e).append(this) : this;
}, Y.prototype.appendInner = function(e) {
	return new Am(this, e);
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
	return e instanceof Y ? e : e && e.length ? new km(e) : Y.empty;
};
var km = /* @__PURE__ */ function(e) {
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
		if (this.length + e.length <= Om) return new t(this.values.concat(e.flatten()));
	}, t.prototype.leafPrepend = function(e) {
		if (this.length + e.length <= Om) return new t(e.flatten().concat(this.values));
	}, n.length.get = function() {
		return this.values.length;
	}, n.depth.get = function() {
		return 0;
	}, Object.defineProperties(t.prototype, n), t;
}(Y);
Y.empty = new km([]);
var Am = /* @__PURE__ */ function(e) {
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
}(Y), jm = 500, Mm = class e {
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
			if (!t.step) i || (i = this.remapping(r, n + 1), a = i.maps.length), a--, u.push(t);
			else {
				if (i) {
					u.push(new Pm(t.map));
					let e = t.step.map(i.slice(a)), n;
					e && o.maybeStep(e).doc && (n = o.mapping.maps[o.mapping.maps.length - 1], l.push(new Pm(n, void 0, void 0, l.length + u.length))), a--, n && i.appendMap(n, a);
				} else o.maybeStep(t.step);
				if (t.selection) return s = i ? t.selection.map(i.slice(a)) : t.selection, c = new e(this.items.slice(0, r).append(u.reverse().concat(l)), this.eventCount - 1), !1;
			}
		}, this.items.length, 0), {
			remaining: c,
			transform: o,
			selection: s
		};
	}
	addTransform(t, n, r, i) {
		let a = [], o = this.eventCount, s = this.items, c = !i && s.length ? s.get(s.length - 1) : null;
		for (let e = 0; e < t.steps.length; e++) {
			let r = t.steps[e].invert(t.docs[e]), l = new Pm(t.mapping.maps[e], r, n), u;
			(u = c && c.merge(l)) && (l = u, e ? a.pop() : s = s.slice(0, s.length - 1)), a.push(l), n &&= (o++, void 0), i || (c = l);
		}
		let l = o - r.depth;
		return l > Im && (s = Nm(s, l), o -= l), new e(s.append(a), o);
	}
	remapping(e, t) {
		let n = new jt();
		return this.items.forEach((t, r) => {
			let i = t.mirrorOffset != null && r - t.mirrorOffset >= e ? n.maps.length - t.mirrorOffset : void 0;
			n.appendMap(t.map, i);
		}, e, t), n;
	}
	addMaps(t) {
		return this.eventCount == 0 ? this : new e(this.items.append(t.map((e) => new Pm(e))), this.eventCount);
	}
	rebased(t, n) {
		if (!this.eventCount) return this;
		n = Math.min(this.items.length, n);
		let r = [], i = this.items.length - n, a = t.mapping, o = t.steps.length, s = this.eventCount;
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
				l && s++, r.push(new Pm(i, o, l));
			} else r.push(new Pm(i));
		}, i);
		let l = [];
		for (let e = n; e < o; e++) l.push(new Pm(a.maps[e]));
		let u = this.items.slice(0, i).append(l).append(r), d = new e(u, s);
		return d.emptyItemCount() > jm && (d = d.compress(this.items.length - r.length)), d;
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
					let c = new Pm(o.invert(), t, s), l, u = i.length - 1;
					(l = i.length && i[u].merge(c)) ? i[u] = l : i.push(c);
				}
			} else e.map && r--;
		}, this.items.length, 0), new e(Y.from(i.reverse()), a);
	}
};
Mm.empty = new Mm(Y.empty, 0);
function Nm(e, t) {
	let n;
	return e.forEach((e, r) => {
		if (e.selection && t-- == 0) return n = r, !1;
	}), e.slice(n);
}
var Pm = class e {
	constructor(e, t, n, r) {
		this.map = e, this.step = t, this.selection = n, this.mirrorOffset = r;
	}
	merge(t) {
		if (this.step && t.step && !t.selection) {
			let n = t.step.merge(this.step);
			if (n) return new e(n.getMap().invert(), n, this.selection);
		}
	}
}, Fm = class {
	constructor(e, t, n, r, i) {
		this.done = e, this.undone = t, this.prevRanges = n, this.prevTime = r, this.prevComposition = i;
	}
}, Im = 20;
function Lm(e, t, n, r) {
	let i = n.getMeta(Km), a;
	if (i) return i.historyState;
	n.getMeta(qm) && (e = new Fm(e.done, e.undone, null, 0, -1));
	let o = n.getMeta("appendedTransaction");
	if (n.steps.length == 0) return e;
	if (o && o.getMeta(Km)) return o.getMeta(Km).redo ? new Fm(e.done.addTransform(n, void 0, r, Gm(t)), e.undone, zm(n.mapping.maps), e.prevTime, e.prevComposition) : new Fm(e.done, e.undone.addTransform(n, void 0, r, Gm(t)), null, e.prevTime, e.prevComposition);
	if (n.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
		let i = n.getMeta("composition"), a = e.prevTime == 0 || !o && e.prevComposition != i && (e.prevTime < (n.time || 0) - r.newGroupDelay || !Rm(n, e.prevRanges)), s = o ? Bm(e.prevRanges, n.mapping) : zm(n.mapping.maps);
		return new Fm(e.done.addTransform(n, a ? t.selection.getBookmark() : void 0, r, Gm(t)), Mm.empty, s, n.time, i ?? e.prevComposition);
	}
	return (a = n.getMeta("rebased")) ? new Fm(e.done.rebased(n, a), e.undone.rebased(n, a), Bm(e.prevRanges, n.mapping), e.prevTime, e.prevComposition) : new Fm(e.done.addMaps(n.mapping.maps), e.undone.addMaps(n.mapping.maps), Bm(e.prevRanges, n.mapping), e.prevTime, e.prevComposition);
}
function Rm(e, t) {
	if (!t) return !1;
	if (!e.docChanged) return !0;
	let n = !1;
	return e.mapping.maps[0].forEach((e, r) => {
		for (let i = 0; i < t.length; i += 2) e <= t[i + 1] && r >= t[i] && (n = !0);
	}), n;
}
function zm(e) {
	let t = [];
	for (let n = e.length - 1; n >= 0 && t.length == 0; n--) e[n].forEach((e, n, r, i) => t.push(r, i));
	return t;
}
function Bm(e, t) {
	if (!e) return null;
	let n = [];
	for (let r = 0; r < e.length; r += 2) {
		let i = t.map(e[r], 1), a = t.map(e[r + 1], -1);
		i <= a && n.push(i, a);
	}
	return n;
}
function Vm(e, t) {
	for (let n = 0; n < t.steps.length; n++) {
		let r = t.mapping.maps[n], i = -1;
		if (r.forEach((e, t) => i = t), i < 0) {
			let e = t.steps[n];
			(e instanceof Pt || e instanceof Ft) && (i = e.to);
		}
		if (i > -1) return L.near(e.doc.resolve(i));
	}
	return e.selection;
}
function Hm(e, t, n) {
	let r = Gm(t), i = Km.get(t).spec.config, a = (n ? e.undone : e.done).popEvent(t, r);
	if (!a) return null;
	let o = a.selection.resolve(a.transform.doc), s = (n ? e.done : e.undone).addTransform(a.transform, Vm(t, a.transform).getBookmark(), i, r), c = new Fm(n ? s : a.remaining, n ? a.remaining : s, null, 0, -1);
	return a.transform.setSelection(o).setMeta(Km, {
		redo: n,
		historyState: c
	});
}
var Um = !1, Wm = null;
function Gm(e) {
	let t = e.plugins;
	if (Wm != t) {
		Um = !1, Wm = t;
		for (let e = 0; e < t.length; e++) if (t[e].spec.historyPreserveItems) {
			Um = !0;
			break;
		}
	}
	return Um;
}
var Km = new rr("history"), qm = new rr("closeHistory");
function Jm(e = {}) {
	return e = {
		depth: e.depth || 100,
		newGroupDelay: e.newGroupDelay || 500
	}, new B({
		key: Km,
		state: {
			init() {
				return new Fm(Mm.empty, Mm.empty, null, 0, -1);
			},
			apply(t, n, r) {
				return Lm(n, r, t, e);
			}
		},
		config: e,
		props: { handleDOMEvents: { beforeinput(e, t) {
			let n = t.inputType, r = n == "historyUndo" ? Xm : n == "historyRedo" ? Zm : null;
			return !r || !e.editable ? !1 : (t.preventDefault(), r(e.state, e.dispatch));
		} } }
	});
}
function Ym(e, t) {
	return (n, r) => {
		let i = Km.getState(n);
		if (!i || (e ? i.undone : i.done).eventCount == 0) return !1;
		if (r) {
			let a = Hm(i, n, e);
			a && r(t ? a.scrollIntoView() : a);
		}
		return !0;
	};
}
var Xm = Ym(!1, !0), Zm = Ym(!0, !0), Qm = cl.create({
	name: "history",
	addOptions() {
		return {
			depth: 100,
			newGroupDelay: 500
		};
	},
	addCommands() {
		return {
			undo: () => ({ state: e, dispatch: t }) => Xm(e, t),
			redo: () => ({ state: e, dispatch: t }) => Zm(e, t)
		};
	},
	addProseMirrorPlugins() {
		return [Jm(this.options)];
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
}), $m = vd.create({
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
}), eh = class e extends L {
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
		return new th(this.anchor);
	}
	static valid(e) {
		let t = e.parent;
		if (t.inlineContent || !rh(e) || !ih(e)) return !1;
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
				}
				if (r == 0) return null;
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
eh.prototype.visible = !1, eh.findFrom = eh.findGapCursorFrom, L.jsonID("gapcursor", eh);
var th = class e {
	constructor(e) {
		this.pos = e;
	}
	map(t) {
		return new e(t.map(this.pos));
	}
	resolve(e) {
		let t = e.resolve(this.pos);
		return eh.valid(t) ? new eh(t) : L.near(t);
	}
};
function nh(e) {
	return e.isAtom || e.spec.isolating || e.spec.createGapCursor;
}
function rh(e) {
	for (let t = e.depth; t >= 0; t--) {
		let n = e.index(t), r = e.node(t);
		if (n == 0) {
			if (r.type.spec.isolating) return !0;
		} else for (let e = r.child(n - 1);; e = e.lastChild) {
			if (e.childCount == 0 && !e.inlineContent || nh(e.type)) return !0;
			if (e.inlineContent) return !1;
		}
	}
	return !0;
}
function ih(e) {
	for (let t = e.depth; t >= 0; t--) {
		let n = e.indexAfter(t), r = e.node(t);
		if (n == r.childCount) {
			if (r.type.spec.isolating) return !0;
		} else for (let e = r.child(n);; e = e.firstChild) {
			if (e.childCount == 0 && !e.inlineContent || nh(e.type)) return !0;
			if (e.inlineContent) return !1;
		}
	}
	return !0;
}
function ah() {
	return new B({ props: {
		decorations: uh,
		createSelectionBetween(e, t, n) {
			return t.pos == n.pos && eh.valid(n) ? new eh(n) : null;
		},
		handleClick: ch,
		handleKeyDown: oh,
		handleDOMEvents: { beforeinput: lh }
	} });
}
var oh = Is({
	ArrowLeft: sh("horiz", -1),
	ArrowRight: sh("horiz", 1),
	ArrowUp: sh("vert", -1),
	ArrowDown: sh("vert", 1)
});
function sh(e, t) {
	let n = e == "vert" ? t > 0 ? "down" : "up" : t > 0 ? "right" : "left";
	return function(e, r, i) {
		let a = e.selection, o = t > 0 ? a.$to : a.$from, s = a.empty;
		if (a instanceof R) {
			if (!i.endOfTextblock(n) || o.depth == 0) return !1;
			s = !1, o = e.doc.resolve(t > 0 ? o.after() : o.before());
		}
		let c = eh.findGapCursorFrom(o, t, s);
		return c ? (r && r(e.tr.setSelection(new eh(c))), !0) : !1;
	};
}
function ch(e, t, n) {
	if (!e || !e.editable) return !1;
	let r = e.state.doc.resolve(t);
	if (!eh.valid(r)) return !1;
	let i = e.posAtCoords({
		left: n.clientX,
		top: n.clientY
	});
	return i && i.inside > -1 && z.isSelectable(e.state.doc.nodeAt(i.inside)) ? !1 : (e.dispatch(e.state.tr.setSelection(new eh(r))), !0);
}
function lh(e, t) {
	if (t.inputType != "insertCompositionText" || !(e.state.selection instanceof eh)) return !1;
	let { $from: n } = e.state.selection, r = n.parent.contentMatchAt(n.index()).findWrapping(e.state.schema.nodes.text);
	if (!r) return !1;
	let i = M.empty;
	for (let e = r.length - 1; e >= 0; e--) i = M.from(r[e].createAndFill(null, i));
	let a = e.state.tr.replace(n.pos, n.pos, new P(i, 0, 0));
	return a.setSelection(R.near(a.doc.resolve(n.pos + 1))), e.dispatch(a), !1;
}
function uh(e) {
	if (!(e.selection instanceof eh)) return null;
	let t = document.createElement("div");
	return t.className = "ProseMirror-gapcursor", zo.create(e.doc, [Io.widget(e.selection.head, t, { key: "gapcursor" })]);
}
// node_modules/@tiptap/extension-gapcursor/dist/index.js
var dh = cl.create({
	name: "gapCursor",
	addProseMirrorPlugins() {
		return [ah()];
	},
	extendNodeSchema(e) {
		return { allowGapCursor: J(G(e, "allowGapCursor", {
			name: e.name,
			options: e.options,
			storage: e.storage
		})) ?? null };
	}
}), fh = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, ph = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, mh = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, hh = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, gh = Qc.create({
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
		return [md({
			find: fh,
			type: this.type
		}), md({
			find: mh,
			type: this.type
		})];
	},
	addPasteRules() {
		return [yd({
			find: ph,
			type: this.type
		}), yd({
			find: hh,
			type: this.type
		})];
	}
}), _h = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, vh = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, yh = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, bh = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, xh = Qc.create({
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
		return [md({
			find: _h,
			type: this.type
		}), md({
			find: yh,
			type: this.type
		})];
	},
	addPasteRules() {
		return [yd({
			find: vh,
			type: this.type
		}), yd({
			find: bh,
			type: this.type
		})];
	}
}), Sh = Qc.create({
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
}), Ch = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, wh = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, Th = Qc.create({
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
		return [md({
			find: Ch,
			type: this.type
		})];
	},
	addPasteRules() {
		return [yd({
			find: wh,
			type: this.type
		})];
	}
}), Eh = vd.create({
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
}), Dh = "listItem", Oh = "textStyle", kh = /^\s*([-+*])\s$/, Ah = vd.create({
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
		return { toggleBulletList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(Dh, this.editor.getAttributes(Oh)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-8": () => this.editor.commands.toggleBulletList() };
	},
	addInputRules() {
		let e = _d({
			find: kh,
			type: this.type
		});
		return (this.options.keepMarks || this.options.keepAttributes) && (e = _d({
			find: kh,
			type: this.type,
			keepMarks: this.options.keepMarks,
			keepAttributes: this.options.keepAttributes,
			getAttributes: () => this.editor.getAttributes(Oh),
			editor: this.editor
		})), [e];
	}
}), jh = "listItem", Mh = "textStyle", Nh = /^(\d+)\.\s$/, Ph = vd.create({
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
		return { toggleOrderedList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(jh, this.editor.getAttributes(Mh)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-7": () => this.editor.commands.toggleOrderedList() };
	},
	addInputRules() {
		let e = _d({
			find: Nh,
			type: this.type,
			getAttributes: (e) => ({ start: +e[1] }),
			joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1]
		});
		return (this.options.keepMarks || this.options.keepAttributes) && (e = _d({
			find: Nh,
			type: this.type,
			keepMarks: this.options.keepMarks,
			keepAttributes: this.options.keepAttributes,
			getAttributes: (e) => ({
				start: +e[1],
				...this.editor.getAttributes(Mh)
			}),
			joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1],
			editor: this.editor
		})), [e];
	}
}), Fh = (e, t) => {
	let { $from: n } = t.selection, r = K(e, t.schema), i = null, a = n.depth, o = n.pos, s = null;
	for (; a > 0 && s === null;) i = n.node(a), i.type === r ? s = a : (--a, --o);
	return s === null ? null : {
		$pos: t.doc.resolve(o),
		depth: s
	};
}, Ih = (e, t) => {
	let n = Fh(e, t);
	if (!n) return !1;
	let [, r] = Nu(t, e, n.$pos.pos + 4);
	return r;
}, Lh = (e, t, n) => {
	let { $anchor: r } = e.selection, i = Math.max(0, r.pos - 2), a = e.doc.resolve(i).node();
	return !(!a || !n.includes(a.type.name));
}, Rh = (e, t) => {
	let { $anchor: n } = t.selection, r = t.doc.resolve(n.pos - 2);
	return r.index() !== 0 && r.nodeBefore?.type.name === e;
}, zh = (e, t, n) => {
	if (!n) return !1;
	let r = K(e, t.schema), i = !1;
	return n.descendants((e) => {
		e.type === r && (i = !0);
	}), i;
}, Bh = (e, t, n) => {
	if (e.commands.undoInputRule()) return !0;
	if (e.state.selection.from !== e.state.selection.to) return !1;
	if (!ru(e.state, t) && Lh(e.state, t, n)) {
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
	if (!ru(e.state, t) || !Ru(e.state)) return !1;
	let r = Fh(t, e.state);
	if (!r) return !1;
	let i = e.state.doc.resolve(r.$pos.pos - 2).node(r.depth), a = zh(t, e.state, i);
	return Rh(t, e.state) && !a ? e.commands.joinItemBackward() : e.chain().liftListItem(t).run();
}, Vh = (e, t) => {
	let n = Ih(e, t), r = Fh(e, t);
	return !r || !n ? !1 : n > r.depth;
}, Hh = (e, t) => {
	let n = Ih(e, t), r = Fh(e, t);
	return !r || !n ? !1 : n < r.depth;
}, Uh = (e, t) => {
	if (!ru(e.state, t) || !Lu(e.state, t)) return !1;
	let { selection: n } = e.state, { $from: r, $to: i } = n;
	return !n.empty && r.sameParent(i) ? !1 : Vh(t, e.state) ? e.chain().focus(e.state.selection.from + 4).lift(t).joinBackward().run() : Hh(t, e.state) ? e.chain().joinForward().joinBackward().run() : e.commands.joinItemForward();
}, Wh = cl.create({
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
					e.state.schema.nodes[n] !== void 0 && Uh(e, n) && (t = !0);
				}), t;
			},
			"Mod-Delete": ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n }) => {
					e.state.schema.nodes[n] !== void 0 && Uh(e, n) && (t = !0);
				}), t;
			},
			Backspace: ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
					e.state.schema.nodes[n] !== void 0 && Bh(e, n, r) && (t = !0);
				}), t;
			},
			"Mod-Backspace": ({ editor: e }) => {
				let t = !1;
				return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
					e.state.schema.nodes[n] !== void 0 && Bh(e, n, r) && (t = !0);
				}), t;
			}
		};
	}
}), Gh = vd.create({
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
		return this.options.levels.map((e) => gd({
			find: RegExp(`^(#{${Math.min(...this.options.levels)},${e}})\\s$`),
			type: this.type,
			getAttributes: { level: e }
		}));
	}
}), Kh = /^\s*>\s$/, qh = vd.create({
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
		return [_d({
			find: Kh,
			type: this.type
		})];
	}
}), Jh = vd.create({
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
			if (!bd(t, t.schema.nodes[this.name])) return !1;
			let { selection: n } = t, { $from: r, $to: i } = n, a = e();
			return r.parentOffset === 0 ? a.insertContentAt({
				from: Math.max(r.pos - 1, 0),
				to: i.pos
			}, { type: this.name }) : Vu(n) ? a.insertContentAt(i.pos, { type: this.name }) : a.insertContent({ type: this.name }), a.command(({ tr: e, dispatch: t }) => {
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
		return [hd({
			find: /^(?:---|—-|___\s|\*\*\*\s)$/,
			type: this.type
		})];
	}
}), Yh = cl.create({
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
}), Xh = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2odyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos6kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rck0msd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12b0cam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2oodside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", Zh = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", Qh = "numeric", $h = "ascii", eg = "alpha", tg = "asciinumeric", ng = "alphanumeric", rg = "domain", ig = "emoji", ag = "scheme", og = "slashscheme", sg = "whitespace";
function cg(e, t) {
	return e in t || (t[e] = []), t[e];
}
function lg(e, t, n) {
	t[Qh] && (t[tg] = !0, t[ng] = !0), t[$h] && (t[tg] = !0, t[eg] = !0), t[tg] && (t[ng] = !0), t[eg] && (t[ng] = !0), t[ng] && (t[rg] = !0), t[ig] && (t[rg] = !0);
	for (let r in t) {
		let t = cg(r, n);
		t.indexOf(e) < 0 && t.push(e);
	}
}
function ug(e, t) {
	let n = {};
	for (let r in t) t[r].indexOf(e) >= 0 && (n[r] = !0);
	return n;
}
function dg(e = null) {
	this.j = {}, this.jr = [], this.jd = null, this.t = e;
}
dg.groups = {}, dg.prototype = {
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
		r ||= dg.groups;
		let i;
		return t && t.j ? i = t : (i = new dg(t), n && r && lg(t, n, r)), this.jr.push([e, i]), i;
	},
	ts(e, t, n, r) {
		let i = this, a = e.length;
		if (!a) return i;
		for (let t = 0; t < a - 1; t++) i = i.tt(e[t]);
		return i.tt(e[a - 1], t, n, r);
	},
	tt(e, t, n, r) {
		r ||= dg.groups;
		let i = this;
		if (t && t.j) return i.j[e] = t, t;
		let a = t, o, s = i.go(e);
		return s ? (o = new dg(), Object.assign(o.j, s.j), o.jr.push.apply(o.jr, s.jr), o.jd = s.jd, o.t = s.t) : o = new dg(), a && (r && (o.t && typeof o.t == "string" ? lg(a, Object.assign(ug(o.t, r), n), r) : n && lg(a, n, r)), o.t = a), i.j[e] = o, o;
	}
};
var X = (e, t, n, r, i) => e.ta(t, n, r, i), Z = (e, t, n, r, i) => e.tr(t, n, r, i), fg = (e, t, n, r, i) => e.ts(t, n, r, i), Q = (e, t, n, r, i) => e.tt(t, n, r, i), pg = "WORD", mg = "UWORD", hg = "ASCIINUMERICAL", gg = "ALPHANUMERICAL", _g = "LOCALHOST", vg = "TLD", yg = "UTLD", bg = "SCHEME", xg = "SLASH_SCHEME", Sg = "NUM", Cg = "WS", wg = "NL", Tg = "OPENBRACE", Eg = "CLOSEBRACE", Dg = "OPENBRACKET", Og = "CLOSEBRACKET", kg = "OPENPAREN", Ag = "CLOSEPAREN", jg = "OPENANGLEBRACKET", Mg = "CLOSEANGLEBRACKET", Ng = "FULLWIDTHLEFTPAREN", Pg = "FULLWIDTHRIGHTPAREN", Fg = "LEFTCORNERBRACKET", Ig = "RIGHTCORNERBRACKET", Lg = "LEFTWHITECORNERBRACKET", Rg = "RIGHTWHITECORNERBRACKET", zg = "FULLWIDTHLESSTHAN", Bg = "FULLWIDTHGREATERTHAN", Vg = "AMPERSAND", Hg = "APOSTROPHE", Ug = "ASTERISK", Wg = "AT", Gg = "BACKSLASH", Kg = "BACKTICK", qg = "CARET", Jg = "COLON", Yg = "COMMA", Xg = "DOLLAR", Zg = "DOT", Qg = "EQUALS", $g = "EXCLAMATION", e_ = "HYPHEN", t_ = "PERCENT", n_ = "PIPE", r_ = "PLUS", i_ = "POUND", a_ = "QUERY", o_ = "QUOTE", s_ = "FULLWIDTHMIDDLEDOT", c_ = "SEMI", l_ = "SLASH", u_ = "TILDE", d_ = "UNDERSCORE", f_ = "EMOJI", p_ = "SYM", m_ = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	ALPHANUMERICAL: gg,
	AMPERSAND: Vg,
	APOSTROPHE: Hg,
	ASCIINUMERICAL: hg,
	ASTERISK: Ug,
	AT: Wg,
	BACKSLASH: Gg,
	BACKTICK: Kg,
	CARET: qg,
	CLOSEANGLEBRACKET: Mg,
	CLOSEBRACE: Eg,
	CLOSEBRACKET: Og,
	CLOSEPAREN: Ag,
	COLON: Jg,
	COMMA: Yg,
	DOLLAR: Xg,
	DOT: Zg,
	EMOJI: f_,
	EQUALS: Qg,
	EXCLAMATION: $g,
	FULLWIDTHGREATERTHAN: Bg,
	FULLWIDTHLEFTPAREN: Ng,
	FULLWIDTHLESSTHAN: zg,
	FULLWIDTHMIDDLEDOT: s_,
	FULLWIDTHRIGHTPAREN: Pg,
	HYPHEN: e_,
	LEFTCORNERBRACKET: Fg,
	LEFTWHITECORNERBRACKET: Lg,
	LOCALHOST: _g,
	NL: wg,
	NUM: Sg,
	OPENANGLEBRACKET: jg,
	OPENBRACE: Tg,
	OPENBRACKET: Dg,
	OPENPAREN: kg,
	PERCENT: t_,
	PIPE: n_,
	PLUS: r_,
	POUND: i_,
	QUERY: a_,
	QUOTE: o_,
	RIGHTCORNERBRACKET: Ig,
	RIGHTWHITECORNERBRACKET: Rg,
	SCHEME: bg,
	SEMI: c_,
	SLASH: l_,
	SLASH_SCHEME: xg,
	SYM: p_,
	TILDE: u_,
	TLD: vg,
	UNDERSCORE: d_,
	UTLD: yg,
	UWORD: mg,
	WORD: pg,
	WS: Cg
}), h_ = /[a-z]/, g_ = /[a-z]/i, __ = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]|\u{FE0F}/u;
try {
	g_ = /* @__PURE__ */ RegExp("\\p{L}", "u"), __ = /* @__PURE__ */ RegExp("\\p{Emoji}", "u");
} catch {}
var v_ = /\d/, y_ = /\s/, b_ = "\r", x_ = "\n", S_ = "️", C_ = "‍", w_ = "￼", T_ = null, E_ = null;
function D_(e = []) {
	let t = {};
	dg.groups = t;
	let n = new dg();
	T_ ??= j_(Xh), E_ ??= j_(Zh), Q(n, "'", Hg), Q(n, "{", Tg), Q(n, "}", Eg), Q(n, "[", Dg), Q(n, "]", Og), Q(n, "(", kg), Q(n, ")", Ag), Q(n, "<", jg), Q(n, ">", Mg), Q(n, "（", Ng), Q(n, "）", Pg), Q(n, "「", Fg), Q(n, "」", Ig), Q(n, "『", Lg), Q(n, "』", Rg), Q(n, "＜", zg), Q(n, "＞", Bg), Q(n, "&", Vg), Q(n, "*", Ug), Q(n, "@", Wg), Q(n, "`", Kg), Q(n, "^", qg), Q(n, ":", Jg), Q(n, ",", Yg), Q(n, "$", Xg), Q(n, ".", Zg), Q(n, "=", Qg), Q(n, "!", $g), Q(n, "-", e_), Q(n, "%", t_), Q(n, "|", n_), Q(n, "+", r_), Q(n, "#", i_), Q(n, "?", a_), Q(n, "\"", o_), Q(n, "/", l_), Q(n, ";", c_), Q(n, "~", u_), Q(n, "_", d_), Q(n, "\\", Gg), Q(n, "・", s_);
	let r = Z(n, v_, Sg, { [Qh]: !0 });
	Z(r, v_, r);
	let i = Z(r, h_, hg, { [tg]: !0 }), a = Z(r, g_, gg, { [ng]: !0 }), o = Z(n, h_, pg, { [$h]: !0 });
	Z(o, v_, i), Z(o, h_, o), Z(i, v_, i), Z(i, h_, i);
	let s = Z(n, g_, mg, { [eg]: !0 });
	Z(s, h_), Z(s, v_, a), Z(s, g_, s), Z(a, v_, a), Z(a, h_), Z(a, g_, a);
	let c = Q(n, x_, wg, { [sg]: !0 }), l = Q(n, b_, Cg, { [sg]: !0 }), u = Z(n, y_, Cg, { [sg]: !0 });
	Q(n, w_, u), Q(l, x_, c), Q(l, w_, u), Z(l, y_, u), Q(u, b_), Q(u, x_), Z(u, y_, u), Q(u, w_, u);
	let d = Z(n, __, f_, { [ig]: !0 });
	Q(d, "#"), Z(d, __, d), Q(d, S_, d);
	let f = Q(d, C_);
	Q(f, "#"), Z(f, __, d);
	let p = [[h_, o], [v_, i]], m = [
		[h_, null],
		[g_, s],
		[v_, a]
	];
	for (let e = 0; e < T_.length; e++) A_(n, T_[e], vg, pg, p);
	for (let e = 0; e < E_.length; e++) A_(n, E_[e], yg, mg, m);
	lg(vg, {
		tld: !0,
		ascii: !0
	}, t), lg(yg, {
		utld: !0,
		alpha: !0
	}, t), A_(n, "file", bg, pg, p), A_(n, "mailto", bg, pg, p), A_(n, "http", xg, pg, p), A_(n, "https", xg, pg, p), A_(n, "ftp", xg, pg, p), A_(n, "ftps", xg, pg, p), lg(bg, {
		scheme: !0,
		ascii: !0
	}, t), lg(xg, {
		slashscheme: !0,
		ascii: !0
	}, t), e = e.sort((e, t) => e[0] > t[0] ? 1 : -1);
	for (let t = 0; t < e.length; t++) {
		let r = e[t][0], i = e[t][1] ? { [ag]: !0 } : { [og]: !0 };
		r.indexOf("-") >= 0 ? i[rg] = !0 : h_.test(r) ? v_.test(r) ? i[tg] = !0 : i[$h] = !0 : i[Qh] = !0, fg(n, r, r, i);
	}
	return fg(n, "localhost", _g, { ascii: !0 }), n.jd = new dg(p_), {
		start: n,
		tokens: Object.assign({ groups: t }, m_)
	};
}
function O_(e, t) {
	let n = k_(t.replace(/[A-Z]/g, (e) => e.toLowerCase())), r = n.length, i = [], a = 0, o = 0;
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
function k_(e) {
	let t = [], n = e.length, r = 0;
	for (; r < n;) {
		let i = e.charCodeAt(r), a, o = i < 55296 || i > 56319 || r + 1 === n || (a = e.charCodeAt(r + 1)) < 56320 || a > 57343 ? e[r] : e.slice(r, r + 2);
		t.push(o), r += o.length;
	}
	return t;
}
function A_(e, t, n, r, i) {
	let a, o = t.length;
	for (let n = 0; n < o - 1; n++) {
		let o = t[n];
		e.j[o] ? a = e.j[o] : (a = new dg(r), a.jr = i.slice(), e.j[o] = a), e = a;
	}
	return a = new dg(n), a.jr = i.slice(), e.j[t[o - 1]] = a, a;
}
function j_(e) {
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
var M_ = {
	defaultProtocol: "http",
	events: null,
	format: P_,
	formatHref: P_,
	nl2br: !1,
	tagName: "a",
	target: null,
	rel: null,
	validate: !0,
	truncate: Infinity,
	className: null,
	attributes: null,
	ignoreTags: [],
	ignoreClasses: [],
	render: null
};
function N_(e, t = null) {
	let n = Object.assign({}, M_);
	e && (n = Object.assign(n, e instanceof N_ ? e.o : e));
	let r = n.ignoreTags, i = [];
	for (let e = 0; e < r.length; e++) i.push(r[e].toUpperCase());
	this.o = n, t && (this.defaultRender = t), this.ignoreTags = i, this.ignoreClasses = n.ignoreClasses.slice();
}
N_.prototype = {
	o: M_,
	ignoreTags: [],
	ignoreClasses: [],
	isIgnoredClass(e) {
		if (typeof e != "string" || this.ignoreClasses.length === 0) return !1;
		let t = e.split(/\s+/);
		for (let e = 0; e < t.length; e++) if (this.ignoreClasses.indexOf(t[e]) >= 0) return !0;
		return !1;
	},
	defaultRender(e) {
		return e;
	},
	check(e) {
		return this.get("validate", e.toString(), e);
	},
	get(e, t, n) {
		let r = t != null, i = this.o[e];
		return i && (typeof i == "object" ? (i = n.t in i ? i[n.t] : M_[e], typeof i == "function" && r && (i = i(t, n))) : typeof i == "function" && r && (i = i(t, n.t, n)), i);
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
function P_(e) {
	return e;
}
function F_(e, t) {
	this.t = "token", this.v = e, this.tk = t;
}
F_.prototype = {
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
	toObject(e = M_.defaultProtocol) {
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
function I_(e, t) {
	class n extends F_ {
		constructor(t, n) {
			super(t, n), this.t = e;
		}
	}
	for (let e in t) n.prototype[e] = t[e];
	return n.t = e, n;
}
var L_ = I_("email", {
	isLink: !0,
	toHref() {
		return "mailto:" + this.toString();
	}
}), R_ = I_("text"), z_ = I_("nl"), B_ = I_("url", {
	isLink: !0,
	toHref(e = M_.defaultProtocol) {
		return this.hasProtocol() ? this.v : `${e}://${this.v}`;
	},
	hasProtocol() {
		let e = this.tk;
		return e.length >= 2 && e[0].t !== _g && e[1].t === Jg;
	}
}), V_ = (e) => new dg(e);
function H_({ groups: e }) {
	let t = e.domain.concat([
		Vg,
		Ug,
		Wg,
		Gg,
		Kg,
		qg,
		Xg,
		Qg,
		e_,
		Sg,
		t_,
		n_,
		r_,
		i_,
		l_,
		p_,
		u_,
		d_
	]), n = [
		Hg,
		Jg,
		Yg,
		Zg,
		$g,
		t_,
		a_,
		o_,
		c_,
		jg,
		Mg,
		Tg,
		Eg,
		Og,
		Dg,
		kg,
		Ag,
		Ng,
		Pg,
		Fg,
		Ig,
		Lg,
		Rg,
		zg,
		Bg
	], r = [
		Vg,
		Hg,
		Ug,
		Gg,
		Kg,
		qg,
		Xg,
		Qg,
		e_,
		Tg,
		Eg,
		t_,
		n_,
		r_,
		i_,
		a_,
		l_,
		p_,
		u_,
		d_
	], i = V_(), a = Q(i, u_);
	X(a, r, a), X(a, e.domain, a);
	let o = V_(), s = V_(), c = V_();
	X(i, e.domain, o), X(i, e.scheme, s), X(i, e.slashscheme, c), X(o, r, a), X(o, e.domain, o);
	let l = Q(o, Wg);
	Q(a, Wg, l), Q(s, Wg, l), Q(c, Wg, l);
	let u = Q(a, Zg);
	X(u, r, a), X(u, e.domain, a);
	let d = V_();
	X(l, e.domain, d), X(d, e.domain, d);
	let f = Q(d, Zg);
	X(f, e.domain, d);
	let p = V_(L_);
	X(f, e.tld, p), X(f, e.utld, p), Q(l, _g, p);
	let m = Q(d, e_);
	Q(m, e_, m), X(m, e.domain, d), X(p, e.domain, d), Q(p, Zg, f), Q(p, e_, m);
	let h = Q(o, e_), g = Q(o, Zg);
	Q(h, e_, h), X(h, e.domain, o), X(g, r, a), X(g, e.domain, o);
	let _ = V_(B_);
	X(g, e.tld, _), X(g, e.utld, _), X(_, e.domain, o), X(_, r, a), Q(_, Zg, g), Q(_, e_, h), Q(_, Wg, l);
	let v = Q(_, Jg), y = V_(B_);
	X(v, e.numeric, y);
	let b = V_(B_), x = V_();
	X(b, t, b), X(b, n, x), X(x, t, b), X(x, n, x), Q(_, l_, b), Q(y, l_, b), Q(_, a_, x), Q(_, i_, b), Q(y, a_, x), Q(y, i_, b);
	let S = Q(s, Jg), C = Q(Q(Q(c, Jg), l_), l_);
	X(s, e.domain, o), Q(s, Zg, g), Q(s, e_, h), X(c, e.domain, o), Q(c, Zg, g), Q(c, e_, h), X(S, e.domain, b), Q(S, l_, b), Q(S, a_, b), X(C, e.domain, b), X(C, t, b), Q(C, l_, b);
	let w = [
		[Tg, Eg],
		[Dg, Og],
		[kg, Ag],
		[jg, Mg],
		[Ng, Pg],
		[Fg, Ig],
		[Lg, Rg],
		[zg, Bg]
	];
	for (let e = 0; e < w.length; e++) {
		let [r, i] = w[e], a = Q(b, r);
		Q(x, r, a);
		let o = V_(B_);
		X(a, t, o);
		let s = V_();
		X(a, n, s), Q(a, i, b), X(o, t, o), X(o, n, s), X(s, t, o), X(s, n, s), Q(o, i, b), Q(s, i, b);
	}
	return Q(i, _g, _), Q(i, wg, z_), {
		start: i,
		tokens: m_
	};
}
function U_(e, t, n) {
	let r = n.length, i = 0, a = [], o = [], s = [];
	for (; i < r;) {
		let c = e, l = null, u = null, d = 0, f = null, p = -1, m = [];
		for (; i < r && !(l = c.go(n[i].t));) o.push(n[i++]);
		for (; i < r && (u = l || c.go(n[i].t));) if (l = null, c = u, i++, d++, c.accepts()) p = 0, f = c, m = [];
		else if (p >= 0 && p++, m.push(c), s[i] && s[i].has(c)) break;
		for (let e = 0, t = i - m.length + 1; e < m.length; e++, t++) (s[t] || (s[t] = /* @__PURE__ */ new Set())).add(m[e]);
		if (p < 0) i -= d, i < r && (o.push(n[i]), i++);
		else {
			o.length > 0 && (a.push(W_(R_, t, o)), o = []), i -= p, d -= p;
			let e = f.t, r = n.slice(i - d, i);
			a.push(W_(e, t, r));
		}
	}
	return o.length > 0 && a.push(W_(R_, t, o)), a;
}
function W_(e, t, n) {
	let r = n[0].s, i = n[n.length - 1].e;
	return new e(t.slice(r, i), n);
}
var G_ = typeof console < "u" && console && console.warn || (() => {}), K_ = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", $ = {
	scanner: null,
	parser: null,
	tokenQueue: [],
	pluginQueue: [],
	customSchemes: [],
	initialized: !1
};
function q_() {
	return dg.groups = {}, $.scanner = null, $.parser = null, $.tokenQueue = [], $.pluginQueue = [], $.customSchemes = [], $.initialized = !1, $;
}
function J_(e, t = !1) {
	if ($.initialized && G_(`linkifyjs: already initialized - will not register custom scheme "${e}" ${K_}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(e)) throw Error("linkifyjs: incorrect scheme format.\n1. Must only contain digits, lowercase ASCII letters or \"-\"\n2. Cannot start or end with \"-\"\n3. \"-\" cannot repeat");
	$.customSchemes.push([e, t]);
}
function Y_() {
	$.scanner = D_($.customSchemes);
	for (let e = 0; e < $.tokenQueue.length; e++) $.tokenQueue[e][1]({ scanner: $.scanner });
	$.parser = H_($.scanner.tokens);
	for (let e = 0; e < $.pluginQueue.length; e++) $.pluginQueue[e][1]({
		scanner: $.scanner,
		parser: $.parser
	});
	return $.initialized = !0, $;
}
function X_(e) {
	return $.initialized || Y_(), U_($.parser.start, e, O_($.scanner.start, e));
}
X_.scan = O_;
function Z_(e, t = null, n = null) {
	if (t && typeof t == "object") {
		if (n) throw Error(`linkifyjs: Invalid link type ${t}; must be a string`);
		n = t, t = null;
	}
	let r = new N_(n), i = X_(e), a = [];
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		n.isLink && (!t || n.t === t) && r.check(n) && a.push(n.toFormattedObject(r));
	}
	return a;
}
// node_modules/@tiptap/extension-link/dist/index.js
var Q_ = "[\0- \xA0 ᠎ -\u2029 　]", $_ = new RegExp(Q_), ev = RegExp(`${Q_}$`), tv = new RegExp(Q_, "g");
function nv(e) {
	return e.length === 1 ? e[0].isLink : e.length === 3 && e[1].isLink ? ["()", "[]"].includes(e[0].value + e[2].value) : !1;
}
function rv(e) {
	return new B({
		key: new rr("autolink"),
		appendTransaction: (t, n, r) => {
			let i = t.some((e) => e.docChanged) && !n.doc.eq(r.doc), a = t.some((e) => e.getMeta("preventAutolink"));
			if (!i || a) return;
			let { tr: o } = r;
			if (ju(xu(n.doc, [...t])).forEach(({ newRange: t }) => {
				let n = Cu(r.doc, t, (e) => e.isTextblock), i, a;
				if (n.length > 1) i = n[0], a = r.doc.textBetween(i.pos, i.pos + i.node.nodeSize, void 0, " ");
				else if (n.length) {
					let e = r.doc.textBetween(t.from, t.to, " ", " ");
					if (!ev.test(e)) return;
					i = n[0], a = r.doc.textBetween(i.pos, t.to, void 0, " ");
				}
				if (i && a) {
					let t = a.split($_).filter(Boolean);
					if (t.length <= 0) return !1;
					let n = t[t.length - 1], s = i.pos + a.lastIndexOf(n);
					if (!n) return !1;
					let c = X_(n).map((t) => t.toObject(e.defaultProtocol));
					if (!nv(c)) return !1;
					c.filter((e) => e.isLink).map((e) => ({
						...e,
						from: s + e.start + 1,
						to: s + e.end + 1
					})).filter((e) => !r.schema.marks.code || !r.doc.rangeHasMark(e.from, e.to, r.schema.marks.code)).filter((t) => e.validate(t.value)).filter((t) => e.shouldAutoLink(t.value)).forEach((t) => {
						Mu(t.from, t.to, r.doc).some((t) => t.mark.type === e.type) || o.addMark(t.from, t.to, e.type.create({ href: t.href }));
					});
				}
			}), o.steps.length) return o;
		}
	});
}
function iv(e) {
	return new B({
		key: new rr("handleClickLink"),
		props: { handleClick: (t, n, r) => {
			if (r.button !== 0 || !t.editable) return !1;
			let i = r.target, a = [];
			for (; i.nodeName !== "DIV";) a.push(i), i = i.parentNode;
			if (!a.find((e) => e.nodeName === "A")) return !1;
			let o = Ou(t.state, e.type.name), s = r.target, c = s?.href ?? o.href, l = s?.target ?? o.target;
			return s && c ? (window.open(c, l), !0) : !1;
		} }
	});
}
function av(e) {
	return new B({
		key: new rr("handlePasteLink"),
		props: { handlePaste: (t, n, r) => {
			let { state: i } = t, { selection: a } = i, { empty: o } = a;
			if (o) return !1;
			let s = "";
			r.content.forEach((e) => {
				s += e.textContent;
			});
			let c = Z_(s, { defaultProtocol: e.defaultProtocol }).find((e) => e.isLink && e.value === s);
			return !s || !c ? !1 : e.editor.commands.setMark(e.type, { href: c.href });
		} }
	});
}
function ov(e, t) {
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
	}), !e || e.replace(tv, "").match(RegExp(`^(?:(?:${n.join("|")}):|[^a-z]|[a-z0-9+.\-]+(?:[^a-z+.\-:]|$))`, "i"));
}
var sv = Qc.create({
	name: "link",
	priority: 1e3,
	keepOnSplit: !1,
	exitable: !0,
	onCreate() {
		this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((e) => {
			typeof e == "string" ? J_(e) : J_(e.scheme, e.optionalSlashes);
		});
	},
	onDestroy() {
		q_();
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
			isAllowedUri: (e, t) => !!ov(e, t.protocols),
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
					defaultValidate: (e) => !!ov(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : null;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return this.options.isAllowedUri(e.href, {
			defaultValidate: (e) => !!ov(e, this.options.protocols),
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
					defaultValidate: (e) => !!ov(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? t().setMark(this.name, e).setMeta("preventAutolink", !0).run() : !1;
			},
			toggleLink: (e) => ({ chain: t }) => {
				let { href: n } = e;
				return this.options.isAllowedUri(n, {
					defaultValidate: (e) => !!ov(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? t().toggleMark(this.name, e, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run() : !1;
			},
			unsetLink: () => ({ chain: e }) => e().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
		};
	},
	addPasteRules() {
		return [yd({
			find: (e) => {
				let t = [];
				if (e) {
					let { protocols: n, defaultProtocol: r } = this.options, i = Z_(e).filter((e) => e.isLink && this.options.isAllowedUri(e.value, {
						defaultValidate: (e) => !!ov(e, n),
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
		return this.options.autolink && e.push(rv({
			type: this.type,
			defaultProtocol: this.options.defaultProtocol,
			validate: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!ov(e, t),
				protocols: t,
				defaultProtocol: n
			}),
			shouldAutoLink: this.options.shouldAutoLink
		})), this.options.openOnClick === !0 && e.push(iv({ type: this.type })), this.options.linkOnPaste && e.push(av({
			editor: this.editor,
			defaultProtocol: this.options.defaultProtocol,
			type: this.type
		})), e;
	}
}), cv = Qc.create({
	name: "subscript",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [{ tag: "sub" }, {
			style: "vertical-align",
			getAttrs(e) {
				return e === "sub" && null;
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
}), lv = Qc.create({
	name: "superscript",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [{ tag: "sup" }, {
			style: "vertical-align",
			getAttrs(e) {
				return e === "super" && null;
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
}), uv = {
	key: 0,
	class: "v-wysiwyg"
}, dv = { class: "toolbar" }, fv = { class: "button-group" }, pv = ["title", "aria-label"], mv = ["data-replicated-value"], hv = { class: "toolbar" }, gv = [
	"aria-pressed",
	"disabled",
	"aria-disabled",
	"title",
	"aria-label",
	"onClick"
], _v = { class: "toolbar bubble" }, vv = [
	"aria-pressed",
	"disabled",
	"aria-disabled",
	"title",
	"aria-label",
	"onClick"
], yv = {
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
		let s = v(!1), c = S(o, "modelValue"), l = o, u = Yh.configure({ types: ["heading", "paragraph"] }), d = sv.configure({
			openOnClick: !1,
			...l.linkConfiguration
		}), f = {
			bold: {
				class: "mdi mdi-format-bold",
				action: (e) => e.chain().focus().toggleBold().run(),
				active: (e) => e.isActive("bold"),
				extensions: [gh]
			},
			italic: {
				class: "mdi mdi-format-italic",
				action: (e) => e.chain().focus().toggleItalic().run(),
				active: (e) => e.isActive("italic"),
				extensions: [xh]
			},
			underline: {
				class: "mdi mdi-format-underline",
				action: (e) => e.chain().focus().toggleUnderline().run(),
				active: (e) => e.isActive("underline"),
				extensions: [Sh]
			},
			strike: {
				class: "mdi mdi-format-strikethrough-variant",
				action: (e) => e.chain().focus().toggleStrike().run(),
				active: (e) => e.isActive("strike"),
				extensions: [Th]
			},
			unordered: {
				class: "mdi mdi-format-list-bulleted",
				action: (e) => e.chain().focus().toggleBulletList().run(),
				active: (e) => O(e) === "bulletList",
				extensions: [
					Ah,
					Eh,
					Wh
				]
			},
			ordered: {
				class: "mdi mdi-format-list-numbered",
				action: (e) => e.chain().focus().toggleOrderedList().run(),
				active: (e) => O(e) === "orderedList",
				extensions: [
					Ph,
					Eh,
					Wh
				]
			},
			outdent: {
				class: "mdi mdi-format-indent-decrease",
				action: (e) => e.chain().focus().liftListItem("listItem").run(),
				disabled: (e) => !e.can().liftListItem("listItem"),
				extensions: [Eh]
			},
			indent: {
				class: "mdi mdi-format-indent-increase",
				action: (e) => e.chain().focus().sinkListItem("listItem").run(),
				disabled: (e) => !e.can().sinkListItem("listItem"),
				extensions: [Eh]
			},
			h1: {
				class: "mdi mdi-format-header-1",
				action: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
				active: (e) => e.isActive("heading", { level: 1 }),
				extensions: [Gh]
			},
			h2: {
				class: "mdi mdi-format-header-2",
				action: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
				active: (e) => e.isActive("heading", { level: 2 }),
				extensions: [Gh]
			},
			h3: {
				class: "mdi mdi-format-header-3",
				action: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
				active: (e) => e.isActive("heading", { level: 3 }),
				extensions: [Gh]
			},
			h4: {
				class: "mdi mdi-format-header-4",
				action: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
				active: (e) => e.isActive("heading", { level: 4 }),
				extensions: [Gh]
			},
			h5: {
				class: "mdi mdi-format-header-5",
				action: (e) => e.chain().focus().toggleHeading({ level: 5 }).run(),
				active: (e) => e.isActive("heading", { level: 5 }),
				extensions: [Gh]
			},
			h6: {
				class: "mdi mdi-format-header-6",
				action: (e) => e.chain().focus().toggleHeading({ level: 6 }).run(),
				active: (e) => e.isActive("heading", { level: 6 }),
				extensions: [Gh]
			},
			quote: {
				class: "mdi mdi-format-quote-open",
				action: (e) => e.chain().focus().toggleBlockquote().run(),
				active: (e) => e.isActive("blockquote"),
				disabled: (e) => !e.can().toggleBlockquote(),
				extensions: [qh]
			},
			hardBreak: {
				class: "mdi mdi-keyboard-return",
				action: (e) => e.chain().focus().setHardBreak().run()
			},
			hr: {
				class: "mdi mdi-minus",
				action: (e) => e.chain().focus().setHorizontalRule().run(),
				extensions: [Jh]
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
				extensions: [lv]
			},
			subscript: {
				class: "mdi mdi-format-subscript",
				action: (e) => {
					e.chain().unsetSuperscript?.().run(), e.chain().focus().toggleSubscript().run();
				},
				active: (e) => e.isActive("subscript"),
				extensions: [cv]
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
		}, h = l.toolbar.flat().flatMap((e) => f[e].extensions).filter((e, t, n) => n.indexOf(e) === t), g = vd.create({
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
		}), b = wm({
			content: c.value,
			extensions: [
				Tm,
				Em,
				Dm,
				Qm,
				$m,
				dh,
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
			n !== null && (n === "" ? e.chain().focus().extendMarkRange("link").unsetLink().run() : e.chain().focus().extendMarkRange("link").setLink({ href: /^https?:\/\//i.test(n) ? n : `https://${n}` }).run());
		}, O = function(e) {
			return Tu((t) => zu(t.type.name, e.extensionManager.extensions))(e.state.selection)?.node?.type.name;
		};
		return (l, u) => x(b) ? (_(), r("div", uv, [x(s) ? (_(), r(e, { key: 0 }, [i("div", dv, [u[2] ||= i("div", { class: "button-group gap" }, null, -1), i("div", fv, [i("button", {
			type: "button",
			class: "mdi mdi-code-tags is-active",
			"aria-pressed": "true",
			title: l.$vui.i18n().wysiwyg.viewsource,
			"aria-label": l.$vui.i18n().wysiwyg.viewsource,
			onClick: u[0] ||= (...e) => f.viewsource.action && f.viewsource.action(...e)
		}, null, 8, pv)])]), i("div", {
			class: "grow-wrap",
			"data-replicated-value": c.value
		}, [D(i("textarea", {
			"onUpdate:modelValue": u[1] ||= (e) => c.value = e,
			class: "editor",
			style: m({ "max-height": o.maxHeight })
		}, null, 4), [[C, c.value]])], 8, mv)], 64)) : (_(), r(e, { key: 1 }, [
			i("div", hv, [(_(!0), r(e, null, y(o.toolbar, (t) => (_(), r("div", { class: p(["button-group", { gap: t.length === 0 }]) }, [(_(!0), r(e, null, y(t, (e) => (_(), r("button", {
				type: "button",
				key: e,
				class: p([f[e].class, { "is-active": f[e].active?.(x(b)) }]),
				"aria-pressed": f[e].active?.(x(b)),
				disabled: f[e].disabled?.(x(b)),
				"aria-disabled": f[e].disabled?.(x(b)),
				title: l.$vui.i18n().wysiwyg[e],
				"aria-label": l.$vui.i18n().wysiwyg[e],
				onClick: (t) => f[e].action(x(b))
			}, null, 10, gv))), 128))], 2))), 256))]),
			x(b) && o.bubbleToolbar ? (_(), t(x(bm), {
				key: 0,
				editor: x(b)
			}, {
				default: E(() => [i("div", _v, [(_(!0), r(e, null, y(o.bubbleToolbar, (t) => (_(), r("div", { class: p(["button-group", { gap: t.length === 0 }]) }, [(_(!0), r(e, null, y(t, (e) => (_(), r("button", {
					type: "button",
					key: e,
					class: p([f[e].class, { "is-active": f[e].active?.(x(b)) }]),
					"aria-pressed": f[e].active?.(x(b)),
					disabled: f[e].disabled?.(x(b)),
					"aria-disabled": f[e].disabled?.(x(b)),
					title: l.$vui.i18n().wysiwyg[e],
					"aria-label": l.$vui.i18n().wysiwyg[e],
					onClick: (t) => f[e].action(x(b))
				}, null, 10, vv))), 128))], 2))), 256))])]),
				_: 1
			}, 8, ["editor"])) : n("", !0),
			a(x(Cm), {
				editor: x(b),
				class: "editor",
				style: m({ "max-height": o.maxHeight })
			}, null, 8, ["editor", "style"])
		], 64))])) : n("", !0);
	}
}, bv = {
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
}, xv = {
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
}, Sv = { install: function(e, t) {
	e.component("v-wysiwyg", yv), VertigoUi.lang.enUS.wysiwyg = bv, VertigoUi.lang.fr.wysiwyg = xv;
} };
window && (window.WYSIWYG = Sv);
export { Sv as default };

//# sourceMappingURL=vertigo-wysiwyg.es.js.map