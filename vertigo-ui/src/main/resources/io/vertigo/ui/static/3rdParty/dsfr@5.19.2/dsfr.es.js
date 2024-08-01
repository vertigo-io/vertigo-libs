import { defineComponent as z, ref as R, reactive as He, computed as b, onMounted as ae, onUpdated as Xt, toRefs as Yt, h as Ae, watch as le, onUnmounted as me, Comment as jt, cloneVNode as Ot, openBlock as r, createElementBlock as c, normalizeClass as L, createElementVNode as o, mergeProps as E, renderSlot as C, createTextVNode as I, toDisplayString as h, createCommentVNode as m, createBlock as M, resolveDynamicComponent as $, withCtx as F, unref as X, Transition as it, resolveComponent as J, withDirectives as Pe, vShow as ot, Fragment as T, renderList as N, normalizeStyle as de, createVNode as O, withModifiers as W, normalizeProps as re, guardReactiveProps as Ne, withKeys as qt, toRef as Qt, useSlots as st, Teleport as Gt, useAttrs as Kt, onBeforeUnmount as Wt, useCssVars as Ut, vModelSelect as Zt, nextTick as $t, pushScopeId as dt, popScopeId as ut } from "vue";
const Jt = { "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;", "&": "&amp;" };
let ea = 0;
var ta = (t) => t.replace(/[<>"&]/g, (e) => Jt[e] || e), aa = (t) => t + ea++;
const ce = {}, la = (t) => {
  const { name: e, paths: a = [], d: n, polygons: l = [], points: i } = t;
  n && a.push({ d: n }), i && l.push({ points: i }), ce[e] = Object.assign({}, t, { paths: a, polygons: l }), ce[e].minX || (ce[e].minX = 0), ce[e].minY || (ce[e].minY = 0);
}, Qe = (...t) => {
  for (const e of t) la(e);
}, ie = z({ name: "OhVueIcon", props: { name: { type: String, validator: (t) => !t || t in ce || (console.warn(`Invalid prop: prop "name" is referring to an unregistered icon "${t}".
Please make sure you have imported this icon before using it.`), !1) }, title: String, fill: String, scale: { type: [Number, String], default: 1 }, animation: { validator: (t) => ["spin", "spin-pulse", "wrench", "ring", "pulse", "flash", "float"].includes(t) }, hover: Boolean, flip: { validator: (t) => ["horizontal", "vertical", "both"].includes(t) }, speed: { validator: (t) => t === "fast" || t === "slow" }, label: String, inverse: Boolean }, setup(t) {
  const e = R([]), a = He({ outerScale: 1.2, x: null, y: null }), n = He({ width: 0, height: 0 }), l = b(() => {
    const S = Number(t.scale);
    return isNaN(S) || S <= 0 ? (console.warn('Invalid prop: prop "scale" should be a number over 0.'), a.outerScale) : S * a.outerScale;
  }), i = b(() => ({ "ov-icon": !0, "ov-inverse": t.inverse, "ov-flip-horizontal": t.flip === "horizontal", "ov-flip-vertical": t.flip === "vertical", "ov-flip-both": t.flip === "both", "ov-spin": t.animation === "spin", "ov-spin-pulse": t.animation === "spin-pulse", "ov-wrench": t.animation === "wrench", "ov-ring": t.animation === "ring", "ov-pulse": t.animation === "pulse", "ov-flash": t.animation === "flash", "ov-float": t.animation === "float", "ov-hover": t.hover, "ov-fast": t.speed === "fast", "ov-slow": t.speed === "slow" })), s = b(() => t.name ? ce[t.name] : null), d = b(() => s.value ? `${s.value.minX} ${s.value.minY} ${s.value.width} ${s.value.height}` : `0 0 ${u.value} ${v.value}`), f = b(() => {
    if (!s.value) return 1;
    const { width: S, height: g } = s.value;
    return Math.max(S, g) / 16;
  }), u = b(() => n.width || s.value && s.value.width / f.value * l.value || 0), v = b(() => n.height || s.value && s.value.height / f.value * l.value || 0), p = b(() => l.value !== 1 && { fontSize: l.value + "em" }), _ = b(() => {
    if (!s.value || !s.value.raw) return null;
    const S = {};
    let g = s.value.raw;
    return g = g.replace(/\s(?:xml:)?id=(["']?)([^"')\s]+)\1/g, (x, H, B) => {
      const V = aa("vat-");
      return S[B] = V, ` id="${V}"`;
    }), g = g.replace(/#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g, (x, H, B, V) => {
      const Y = H || V;
      return Y && S[Y] ? `#${S[Y]}` : x;
    }), g;
  }), D = b(() => s.value && s.value.attr ? s.value.attr : {}), y = () => {
    if (!t.name && t.name !== null && e.value.length === 0) return void console.warn('Invalid prop: prop "name" is required.');
    if (s.value) return;
    let S = 0, g = 0;
    e.value.forEach((x) => {
      x.outerScale = l.value, S = Math.max(S, x.width), g = Math.max(g, x.height);
    }), n.width = S, n.height = g, e.value.forEach((x) => {
      x.x = (S - x.width) / 2, x.y = (g - x.height) / 2;
    });
  };
  return ae(() => {
    y();
  }), Xt(() => {
    y();
  }), { ...Yt(a), children: e, icon: s, klass: i, style: p, width: u, height: v, box: d, attribs: D, raw: _ };
}, created() {
  const t = this.$parent;
  t && t.children && t.children.push(this);
}, render() {
  const t = Object.assign({ role: this.$attrs.role || (this.label || this.title ? "img" : null), "aria-label": this.label || null, "aria-hidden": !(this.label || this.title), width: this.width, height: this.height, viewBox: this.box }, this.attribs);
  this.attribs.stroke ? t.stroke = this.fill ? this.fill : "currentColor" : t.fill = this.fill ? this.fill : "currentColor", this.x && (t.x = this.x.toString()), this.y && (t.y = this.y.toString());
  let e = { class: this.klass, style: this.style };
  if (e = Object.assign(e, t), this.raw) {
    const l = this.title ? `<title>${ta(this.title)}</title>${this.raw}` : this.raw;
    e.innerHTML = l;
  }
  const a = this.title ? [Ae("title", this.title)] : [], n = (l, i, s) => Ae(l, { ...i, key: `${l}-${s}` });
  return Ae("svg", e, this.raw ? void 0 : a.concat([this.$slots.default ? this.$slots.default() : this.icon ? [...this.icon.paths.map((l, i) => n("path", l, i)), ...this.icon.polygons.map((l, i) => n("polygon", l, i))] : []]));
} });
function Xe(t, e) {
  e === void 0 && (e = {});
  var a = e.insertAt;
  if (t && typeof document < "u") {
    var n = document.head || document.getElementsByTagName("head")[0], l = document.createElement("style");
    l.type = "text/css", a === "top" && n.firstChild ? n.insertBefore(l, n.firstChild) : n.appendChild(l), l.styleSheet ? l.styleSheet.cssText = t : l.appendChild(document.createTextNode(t));
  }
}
Xe(`.ov-icon {
  display: inline-block;
  overflow: visible;
  vertical-align: -0.2em;
}
`);
Xe(`/* ---------------- spin ---------------- */
.ov-spin:not(.ov-hover),
.ov-spin.ov-hover:hover,
.ov-parent.ov-hover:hover > .ov-spin {
  animation: ov-spin 1s linear infinite;
}

.ov-spin:not(.ov-hover).ov-fast,
.ov-spin.ov-hover.ov-fast:hover,
.ov-parent.ov-hover:hover > .ov-spin.ov-fast {
  animation: ov-spin 0.7s linear infinite;
}

.ov-spin:not(.ov-hover).ov-slow,
.ov-spin.ov-hover.ov-slow:hover,
.ov-parent.ov-hover:hover > .ov-spin.ov-slow {
  animation: ov-spin 2s linear infinite;
}

/* ---------------- spin-pulse ---------------- */

.ov-spin-pulse:not(.ov-hover),
.ov-spin-pulse.ov-hover:hover,
.ov-parent.ov-hover:hover > .ov-spin-pulse {
  animation: ov-spin 1s infinite steps(8);
}

.ov-spin-pulse:not(.ov-hover).ov-fast,
.ov-spin-pulse.ov-hover.ov-fast:hover,
.ov-parent.ov-hover:hover > .ov-spin-pulse.ov-fast {
  animation: ov-spin 0.7s infinite steps(8);
}

.ov-spin-pulse:not(.ov-hover).ov-slow,
.ov-spin-pulse.ov-hover.ov-slow:hover,
.ov-parent.ov-hover:hover > .ov-spin-pulse.ov-slow {
  animation: ov-spin 2s infinite steps(8);
}

@keyframes ov-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* ---------------- wrench ---------------- */
.ov-wrench:not(.ov-hover),
.ov-wrench.ov-hover:hover,
.ov-parent.ov-hover:hover > .ov-wrench {
  animation: ov-wrench 2.5s ease infinite;
}

.ov-wrench:not(.ov-hover).ov-fast,
.ov-wrench.ov-hover.ov-fast:hover,
.ov-parent.ov-hover:hover > .ov-wrench.ov-fast {
  animation: ov-wrench 1.2s ease infinite;
}

.ov-wrench:not(.ov-hover).ov-slow,
.ov-wrench.ov-hover.ov-slow:hover,
.ov-parent.ov-hover:hover > .ov-wrench.ov-slow {
  animation: ov-wrench 3.7s ease infinite;
}

@keyframes ov-wrench {
  0% {
    transform: rotate(-12deg);
  }

  8% {
    transform: rotate(12deg);
  }

  10%, 28%, 30%, 48%, 50%, 68% {
    transform: rotate(24deg);
  }

  18%, 20%, 38%, 40%, 58%, 60% {
    transform: rotate(-24deg);
  }

  75%, 100% {
    transform: rotate(0deg);
  }
}

/* ---------------- ring ---------------- */
.ov-ring:not(.ov-hover),
.ov-ring.ov-hover:hover,
.ov-parent.ov-hover:hover > .ov-ring {
  animation: ov-ring 2s ease infinite;
}

.ov-ring:not(.ov-hover).ov-fast,
.ov-ring.ov-hover.ov-fast:hover,
.ov-parent.ov-hover:hover > .ov-ring.ov-fast {
  animation: ov-ring 1s ease infinite;
}

.ov-ring:not(.ov-hover).ov-slow,
.ov-ring.ov-hover.ov-slow:hover,
.ov-parent.ov-hover:hover > .ov-ring.ov-slow {
  animation: ov-ring 3s ease infinite;
}

@keyframes ov-ring {
  0% {
    transform: rotate(-15deg);
  }

  2% {
    transform: rotate(15deg);
  }

  4%, 12% {
    transform: rotate(-18deg);
  }

  6% {
    transform: rotate(18deg);
  }

  8% {
    transform: rotate(-22deg);
  }

  10% {
    transform: rotate(22deg);
  }

  12% {
    transform: rotate(-18deg);
  }

  14% {
    transform: rotate(18deg);
  }

  16% {
    transform: rotate(-12deg);
  }

  18% {
    transform: rotate(12deg);
  }

  20%, 100% {
    transform: rotate(0deg);
  }
}

/* ---------------- pulse ---------------- */
.ov-pulse:not(.ov-hover),
.ov-pulse.ov-hover:hover,
.ov-parent.ov-hover:hover > .ov-pulse {
  animation: ov-pulse 2s linear infinite;
}

.ov-pulse:not(.ov-hover).ov-fast,
.ov-pulse.ov-hover.ov-fast:hover,
.ov-parent.ov-hover:hover > .ov-pulse.ov-fast {
  animation: ov-pulse 1s linear infinite;
}

.ov-pulse:not(.ov-hover).ov-slow,
.ov-pulse.ov-hover.ov-slow:hover,
.ov-parent.ov-hover:hover > .ov-pulse.ov-slow {
  animation: ov-pulse 3s linear infinite;
}

@keyframes ov-pulse {
  0% {
    transform: scale(1.1);
  }

  50% {
    transform: scale(0.8);
  }

  100% {
    transform: scale(1.1);
  }
}

/* ---------------- flash ---------------- */
.ov-flash:not(.ov-hover),
.ov-flash.ov-hover:hover,
.ov-parent.ov-hover:hover > .ov-flash {
  animation: ov-flash 2s ease infinite;
}

.ov-flash:not(.ov-hover).ov-fast,
.ov-flash.ov-hover.ov-fast:hover,
.ov-parent.ov-hover:hover > .ov-flash.ov-fast {
  animation: ov-flash 1s ease infinite;
}

.ov-flash:not(.ov-hover).ov-slow,
.ov-flash.ov-hover.ov-slow:hover,
.ov-parent.ov-hover:hover > .ov-flash.ov-slow {
  animation: ov-flash 3s ease infinite;
}

@keyframes ov-flash {
  0%, 100%, 50%{
    opacity: 1;
  }
  25%, 75%{
    opacity: 0;
  }
}

/* ---------------- float ---------------- */
.ov-float:not(.ov-hover),
.ov-float.ov-hover:hover,
.ov-parent.ov-hover:hover > .ov-float {
  animation: ov-float 2s linear infinite;
}

.ov-float:not(.ov-hover).ov-fast,
.ov-float.ov-hover.ov-fast:hover,
.ov-parent.ov-hover:hover > .ov-float.ov-fast {
  animation: ov-float 1s linear infinite;
}

.ov-float:not(.ov-hover).ov-slow,
.ov-float.ov-hover.ov-slow:hover,
.ov-parent.ov-hover:hover > .ov-float.ov-slow {
  animation: ov-float 3s linear infinite;
}

@keyframes ov-float {
  0%, 100% {
    transform: translateY(-3px);
  }
  50% {
    transform: translateY(3px);
  }
}
`);
Xe(`.ov-flip-horizontal {
  transform: scale(-1, 1);
}

.ov-flip-vertical {
  transform: scale(1, -1);
}

.ov-flip-both {
  transform: scale(-1, -1);
}

.ov-inverse {
  color: #fff;
}
`);
const na = /* @__PURE__ */ z({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(t) {
    return (e, a) => (r(), c("a", {
      class: L(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${e.position}`]),
      href: "#top"
    }, h(e.label), 3));
  }
}), ra = "abcdefghijklmnopqrstuvwyz0123456789", Ge = ra.repeat(10), ia = () => {
  const t = Math.floor(Math.random() * Ge.length);
  return Ge[t];
}, oa = (t) => Array.from({ length: t }).map(ia).join(""), q = (t = "", e = "") => (t ? `${t}-` : "") + oa(5) + (e ? `-${e}` : ""), ue = () => {
  const t = R(), e = R(!1), a = R(!1), n = () => {
    if (!t.value)
      return;
    t.value.style.setProperty("--collapser", "none");
    const l = t.value.offsetHeight;
    t.value.style.setProperty("--collapse", `${-l}px`), t.value.style.setProperty("--collapser", "");
  };
  return {
    collapse: t,
    collapsing: e,
    cssExpanded: a,
    doExpand: (l) => {
      t.value && (l === !0 && t.value.style.setProperty("--collapse-max-height", "none"), window.requestAnimationFrame(() => {
        e.value = !0, n(), window.requestAnimationFrame(() => {
          a.value = l;
        });
      }));
    },
    adjust: n,
    onTransitionEnd: (l) => {
      e.value = !1, t.value && l === !1 && t.value.style.removeProperty("--collapse-max-height");
    }
  };
}, sa = { class: "fr-accordion" }, da = ["aria-expanded", "aria-controls"], ua = ["id"], ca = /* @__PURE__ */ z({
  __name: "DsfrAccordion",
  props: {
    id: { default: () => q("accordion") },
    expandedId: { default: void 0 },
    title: { default: "Sans intitulé" },
    titleTag: { default: "h3" }
  },
  emits: ["expand"],
  setup(t, { emit: e }) {
    const a = t, n = e, {
      collapse: l,
      collapsing: i,
      cssExpanded: s,
      doExpand: d,
      onTransitionEnd: f
    } = ue(), u = b(() => a.expandedId === a.id);
    ae(() => {
      u.value && d(!0);
    }), le(u, (p, _) => {
      p !== _ && d(p);
    });
    const v = () => {
      n("expand", u.value ? void 0 : a.id);
    };
    return (p, _) => (r(), c("section", sa, [
      (r(), M($(p.titleTag), { class: "fr-accordion__title" }, {
        default: F(() => [
          o("button", {
            class: "fr-accordion__btn",
            "aria-expanded": u.value,
            "aria-controls": p.id,
            type: "button",
            onClick: _[0] || (_[0] = (D) => v())
          }, [
            C(p.$slots, "title", {}, () => [
              o("span", null, h(p.title), 1)
            ])
          ], 8, da)
        ]),
        _: 3
      })),
      o("div", {
        id: p.id,
        ref_key: "collapse",
        ref: l,
        class: L(["fr-collapse", {
          "fr-collapse--expanded": X(s),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": X(i)
        }]),
        onTransitionend: _[1] || (_[1] = (D) => X(f)(u.value))
      }, [
        C(p.$slots, "default")
      ], 42, ua)
    ]));
  }
}), fa = /* @__PURE__ */ z({
  __name: "DsfrAccordionsGroup",
  setup(t) {
    const e = R(), a = (n) => {
      e.value = n;
    };
    return (n, l) => (r(), c("ul", {
      class: "fr-accordions-group",
      onExpand: l[0] || (l[0] = (i) => a(i))
    }, [
      C(n.$slots, "default", { expandedId: e.value })
    ], 32));
  }
}), va = ["id"], pa = { class: "alert-content" }, ha = { class: "fr-alert__description" }, ma = ["title", "aria-label"], ga = /* @__PURE__ */ z({
  __name: "DsfrAlert",
  props: {
    closed: { type: Boolean },
    closeable: { type: Boolean },
    id: { default: () => q("basic", "alert") },
    title: { default: "" },
    description: {},
    small: { type: Boolean },
    titleTag: { default: "h3" },
    type: { default: "info" },
    closeButtonLabel: { default: "Fermer" }
  },
  emits: ["close"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = () => n("close"), i = b(
      () => [
        `fr-alert--${a.type}`,
        {
          "fr-alert--sm": a.small
        }
      ]
    );
    return (s, d) => (r(), M(it, { name: "slide-fade" }, {
      default: F(() => [
        s.closed ? m("", !0) : (r(), c("div", {
          key: 0,
          id: s.id,
          class: L(["fr-alert", i.value])
        }, [
          o("div", pa, [
            s.small ? m("", !0) : (r(), M($(s.titleTag), {
              key: 0,
              class: "fr-alert__title"
            }, {
              default: F(() => [
                I(h(s.title), 1)
              ]),
              _: 1
            })),
            o("p", ha, [
              C(s.$slots, "default", {}, () => [
                I(h(s.description), 1)
              ])
            ])
          ]),
          s.closeable ? (r(), c("button", {
            key: 0,
            class: "fr-btn fr-btn--close",
            title: s.closeButtonLabel,
            "aria-label": s.closeButtonLabel,
            onClick: l
          }, null, 8, ma)) : m("", !0)
        ], 10, va))
      ]),
      _: 3
    }));
  }
}), ba = ["title"], ya = /* @__PURE__ */ z({
  __name: "DsfrBadge",
  props: {
    label: {},
    type: { default: "info" },
    noIcon: { type: Boolean },
    small: { type: Boolean },
    ellipsis: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (r(), c("p", {
      class: L(["fr-badge", {
        [`fr-badge--${e.type}`]: e.type,
        "fr-badge--no-icon": e.noIcon,
        "fr-badge--sm": e.small
      }]),
      title: e.ellipsis ? e.label : void 0
    }, [
      o("span", {
        class: L(e.ellipsis ? "fr-ellipsis" : "")
      }, h(e.label), 3)
    ], 10, ba));
  }
}), ka = ["aria-label"], wa = ["aria-expanded", "aria-controls"], _a = ["id"], xa = { class: "fr-breadcrumb__list" }, za = ["aria-current"], Da = /* @__PURE__ */ z({
  __name: "DsfrBreadcrumb",
  props: {
    breadcrumbId: { default: () => q("breadcrumb") },
    links: { default: () => [{ text: "" }] },
    navigationLabel: { default: "vous êtes ici :" },
    showBreadcrumbLabel: { default: "Voir le fil d’Ariane" }
  },
  setup(t) {
    const {
      collapse: e,
      collapsing: a,
      cssExpanded: n,
      doExpand: l,
      onTransitionEnd: i
    } = ue(), s = R(!1);
    return le(s, (d, f) => {
      d !== f && l(d);
    }), (d, f) => {
      const u = J("RouterLink");
      return r(), c("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": d.navigationLabel
      }, [
        Pe(o("button", {
          class: "fr-breadcrumb__button",
          "aria-expanded": s.value,
          "aria-controls": d.breadcrumbId,
          onClick: f[0] || (f[0] = (v) => s.value = !s.value)
        }, h(d.showBreadcrumbLabel), 9, wa), [
          [ot, !s.value]
        ]),
        o("div", {
          id: d.breadcrumbId,
          ref_key: "collapse",
          ref: e,
          class: L(["fr-collapse", {
            "fr-collapse--expanded": X(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": X(a)
          }]),
          onTransitionend: f[1] || (f[1] = (v) => X(i)(s.value))
        }, [
          o("ol", xa, [
            (r(!0), c(T, null, N(d.links, (v, p) => (r(), c("li", {
              key: p,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              v.to ? (r(), M(u, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: v.to,
                "aria-current": p === d.links.length - 1 ? "page" : void 0
              }, {
                default: F(() => [
                  I(h(v.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : m("", !0),
              v.to ? m("", !0) : (r(), c("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": p === d.links.length - 1 ? "page" : void 0
              }, h(v.text), 9, za))
            ]))), 128))
          ])
        ], 42, _a)
      ], 8, ka);
    };
  }
}), Ca = ["title", "disabled", "aria-disabled"], Ma = { key: 1 }, La = /* @__PURE__ */ z({
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
  setup(t, { expose: e }) {
    const a = t, n = b(() => ["sm", "small"].includes(a.size)), l = b(() => ["md", "medium"].includes(a.size)), i = b(() => ["lg", "large"].includes(a.size)), s = R(null);
    e({ focus: () => {
      var v;
      (v = s.value) == null || v.focus();
    } });
    const d = b(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), f = b(() => a.iconOnly ? 1.25 : 0.8325), u = b(
      () => typeof a.icon == "string" ? { scale: f.value, name: a.icon } : { scale: f.value, ...a.icon }
    );
    return (v, p) => (r(), c("button", {
      ref_key: "btn",
      ref: s,
      class: L(["fr-btn", {
        "fr-btn--secondary": v.secondary && !v.tertiary,
        "fr-btn--tertiary": v.tertiary && !v.secondary && !v.noOutline,
        "fr-btn--tertiary-no-outline": v.tertiary && !v.secondary && v.noOutline,
        "fr-btn--sm": n.value,
        "fr-btn--md": l.value,
        "fr-btn--lg": i.value,
        "fr-btn--icon-right": !v.iconOnly && d.value && v.iconRight,
        "fr-btn--icon-left": !v.iconOnly && d.value && !v.iconRight,
        "inline-flex": !d.value,
        reverse: v.iconRight && !d.value,
        "justify-center": !d.value && v.iconOnly,
        [v.icon]: d.value
      }]),
      title: v.iconOnly ? v.label : void 0,
      disabled: v.disabled,
      "aria-disabled": v.disabled,
      style: de(!d.value && v.iconOnly ? { "padding-inline": "0.5rem" } : {}),
      onClick: p[0] || (p[0] = (_) => v.onClick ? v.onClick(_) : () => {
      })
    }, [
      v.icon && !d.value ? (r(), M(X(ie), re(E({ key: 0 }, u.value)), null, 16)) : m("", !0),
      v.iconOnly ? m("", !0) : (r(), c("span", Ma, [
        I(h(v.label) + " ", 1),
        C(v.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, Ca));
  }
}), ne = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [n, l] of e)
    a[n] = l;
  return a;
}, ke = /* @__PURE__ */ ne(La, [["__scopeId", "data-v-d2e9ceaf"]]), Me = /* @__PURE__ */ z({
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
  setup(t) {
    const e = t, a = R(null), n = b(() => ["sm", "small"].includes(e.size)), l = b(() => ["md", "medium"].includes(e.size)), i = b(() => ["lg", "large"].includes(e.size)), s = b(() => ["always", "", !0].includes(e.inlineLayoutWhen)), d = b(() => ["sm", "small"].includes(e.inlineLayoutWhen)), f = b(() => ["md", "medium"].includes(e.inlineLayoutWhen)), u = b(() => ["lg", "large"].includes(e.inlineLayoutWhen)), v = b(() => e.align === "center"), p = b(() => e.align === "right"), _ = R("auto"), D = b(() => `--equisized-width: ${_.value};`), y = async () => {
      var S;
      let g = 0;
      await new Promise((x) => setTimeout(x, 100)), (S = a.value) == null || S.querySelectorAll(".fr-btn").forEach((x) => {
        const H = x, B = H.offsetWidth, V = window.getComputedStyle(H), Y = +V.marginLeft.replace("px", ""), P = +V.marginRight.replace("px", "");
        H.style.width = "var(--equisized-width)";
        const U = B + Y + P;
        U > g && (g = U);
      }), _.value = `${g}px`;
    };
    return ae(async () => {
      !a.value || !e.equisized || await y();
    }), (S, g) => (r(), c("ul", {
      ref_key: "buttonsEl",
      ref: a,
      style: de(D.value),
      class: L(["fr-btns-group", {
        "fr-btns-group--equisized": S.equisized,
        "fr-btns-group--sm": n.value,
        "fr-btns-group--md": l.value,
        "fr-btns-group--lg": i.value,
        "fr-btns-group--inline-sm": s.value || d.value,
        "fr-btns-group--inline-md": s.value || f.value,
        "fr-btns-group--inline-lg": s.value || u.value,
        "fr-btns-group--center": v.value,
        "fr-btns-group--right": p.value,
        "fr-btns-group--icon-right": S.iconRight,
        "fr-btns-group--inline-reverse": S.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (r(!0), c(T, null, N(S.buttons, ({ onClick: x, ...H }, B) => (r(), c("li", { key: B }, [
        O(ke, E({ ref_for: !0 }, H, { onClick: x }), null, 16, ["onClick"])
      ]))), 128)),
      C(S.$slots, "default")
    ], 6));
  }
}), Ia = { class: "fr-callout__text" }, Sa = /* @__PURE__ */ z({
  __name: "DsfrCallout",
  props: {
    title: {},
    content: {},
    titleTag: { default: "h3" },
    button: { default: () => {
    } },
    icon: { default: void 0 }
  },
  setup(t) {
    const e = t, a = b(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), n = b(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : { ...e.icon ?? {} });
    return (l, i) => {
      const s = J("VIcon");
      return r(), c("div", {
        class: L(["fr-callout", { [String(l.icon)]: a.value }])
      }, [
        l.icon && n.value ? (r(), M(s, re(E({ key: 0 }, n.value)), null, 16)) : m("", !0),
        l.title ? (r(), M($(l.titleTag), {
          key: 1,
          class: "fr-callout__title"
        }, {
          default: F(() => [
            I(h(l.title), 1)
          ]),
          _: 1
        })) : m("", !0),
        o("p", Ia, h(l.content), 1),
        l.button ? (r(), M(ke, re(E({ key: 2 }, l.button)), null, 16)) : m("", !0),
        C(l.$slots, "default", {}, void 0, !0)
      ], 2);
    };
  }
}), Ba = /* @__PURE__ */ ne(Sa, [["__scopeId", "data-v-8d5c8ed4"]]), Ke = /* @__PURE__ */ z({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(t) {
    const e = t, a = b(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = b(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, i) => {
      const s = J("VIcon");
      return r(), c("p", {
        class: L(["fr-card__detail", a.value ? { [String(l.icon)]: a.value } : {}])
      }, [
        l.icon && !a.value ? (r(), M(s, re(E({ key: 0 }, n.value)), null, 16)) : m("", !0),
        C(l.$slots, "default")
      ], 2);
    };
  }
}), Aa = { class: "fr-card__body" }, Ta = { class: "fr-card__content" }, Ha = ["href"], Va = { class: "fr-card__desc" }, Ea = {
  key: 0,
  class: "fr-card__start"
}, Fa = {
  key: 1,
  class: "fr-card__end"
}, Ra = {
  key: 0,
  class: "fr-card__footer"
}, Pa = {
  key: 1,
  class: "fr-links-group"
}, Na = ["href"], Xa = {
  key: 0,
  class: "fr-card__header"
}, Ya = { class: "fr-card__img" }, ja = ["src", "alt"], Oa = /* @__PURE__ */ z({
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
    buttons: { default: () => [] },
    linksGroup: { default: () => [] },
    noArrow: { type: Boolean },
    horizontal: { type: Boolean },
    download: { type: Boolean }
  },
  setup(t, { expose: e }) {
    const a = t, n = b(() => ["sm", "small"].includes(a.size)), l = b(() => ["lg", "large"].includes(a.size)), i = b(() => ["sm", "small"].includes(a.imgRatio)), s = b(() => ["lg", "large"].includes(a.imgRatio)), d = b(() => typeof a.link == "string" && a.link.startsWith("http")), f = R(null);
    return e({ goToTargetLink: () => {
      var u;
      ((u = f.value) == null ? void 0 : u.querySelector(".fr-card__link")).click();
    } }), (u, v) => {
      const p = J("RouterLink");
      return r(), c("div", {
        class: L(["fr-card", {
          "fr-card--horizontal": u.horizontal,
          "fr-enlarge-link": !u.noArrow,
          "fr-card--sm": n.value,
          "fr-card--lg": l.value,
          "fr-card--horizontal-tier": i.value,
          "fr-card--horizontal-half": s.value,
          "fr-card--download": u.download
        }]),
        "data-testid": "fr-card"
      }, [
        o("div", Aa, [
          o("div", Ta, [
            (r(), M($(u.titleTag), { class: "fr-card__title" }, {
              default: F(() => [
                d.value ? (r(), c("a", {
                  key: 0,
                  href: u.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, h(u.title), 9, Ha)) : u.link ? (r(), M(p, {
                  key: 1,
                  to: u.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: v[0] || (v[0] = (_) => _.stopPropagation())
                }, {
                  default: F(() => [
                    I(h(u.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (r(), c(T, { key: 2 }, [
                  I(h(u.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            o("p", Va, h(u.description), 1),
            u.$slots["start-details"] || u.detail ? (r(), c("div", Ea, [
              C(u.$slots, "start-details"),
              u.detail ? (r(), M(Ke, {
                key: 0,
                icon: u.detailIcon
              }, {
                default: F(() => [
                  I(h(u.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : m("", !0)
            ])) : m("", !0),
            u.$slots["end-details"] || u.endDetail ? (r(), c("div", Fa, [
              C(u.$slots, "end-details"),
              u.endDetail ? (r(), M(Ke, {
                key: 0,
                icon: u.endDetailIcon
              }, {
                default: F(() => [
                  I(h(u.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : m("", !0)
            ])) : m("", !0)
          ]),
          u.buttons.length || u.linksGroup.length ? (r(), c("div", Ra, [
            u.buttons.length ? (r(), M(Me, {
              key: 0,
              buttons: u.buttons,
              "inline-layout-when": "always",
              size: u.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : m("", !0),
            u.linksGroup.length ? (r(), c("ul", Pa, [
              (r(!0), c(T, null, N(u.linksGroup, (_, D) => (r(), c("li", {
                key: `card-link-${D}`
              }, [
                _.to ? (r(), M(p, {
                  key: 0,
                  to: _.to
                }, {
                  default: F(() => [
                    I(h(_.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (r(), c("a", {
                  key: 1,
                  href: _.link || _.href,
                  class: L(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": n.value,
                    "fr-link--lg": l.value
                  }])
                }, h(_.label), 11, Na))
              ]))), 128))
            ])) : m("", !0)
          ])) : m("", !0)
        ]),
        u.imgSrc ? (r(), c("div", Xa, [
          o("div", Ya, [
            o("img", {
              src: u.imgSrc,
              class: "fr-responsive-img",
              alt: u.altImg,
              "data-testid": "card-img"
            }, null, 8, ja)
          ])
        ])) : m("", !0)
      ], 2);
    };
  }
}), qa = ["id", "name", "checked", "data-testid", "data-test"], Qa = ["for"], Ga = {
  key: 0,
  class: "required"
}, Ka = {
  key: 0,
  class: "fr-hint-text"
}, Wa = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, Le = /* @__PURE__ */ z({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: {
    id: { default: () => q("basic", "checkbox") },
    name: {},
    required: { type: Boolean },
    modelValue: { type: Boolean },
    small: { type: Boolean },
    inline: { type: Boolean },
    label: { default: "" },
    errorMessage: { default: "" },
    validMessage: { default: "" },
    hint: { default: "" }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = b(() => a.errorMessage || a.validMessage), i = b(() => a.errorMessage ? "fr-error-text" : "fr-valid-text"), s = (d) => {
      n("update:modelValue", d.target.checked);
    };
    return (d, f) => (r(), c("div", {
      class: L(["fr-fieldset__element", { "fr-fieldset__element--inline": d.inline }])
    }, [
      o("div", {
        class: L(["fr-checkbox-group", {
          "fr-checkbox-group--error": d.errorMessage,
          "fr-checkbox-group--valid": !d.errorMessage && d.validMessage,
          "fr-checkbox-group--sm": d.small
        }])
      }, [
        o("input", E({
          id: d.id,
          name: d.name,
          type: "checkbox",
          checked: d.modelValue
        }, d.$attrs, {
          "data-testid": `input-checkbox-${d.id}`,
          "data-test": `input-checkbox-${d.id}`,
          onChange: f[0] || (f[0] = (u) => s(u))
        }), null, 16, qa),
        o("label", {
          for: d.id,
          class: "fr-label"
        }, [
          C(d.$slots, "label", {}, () => [
            I(h(d.label) + " ", 1),
            C(d.$slots, "required-tip", {}, () => [
              d.required ? (r(), c("span", Ga, " *")) : m("", !0)
            ])
          ]),
          d.hint ? (r(), c("span", Ka, h(d.hint), 1)) : m("", !0)
        ], 8, Qa),
        l.value ? (r(), c("div", Wa, [
          o("p", {
            class: L(["fr-message--info flex items-center", i.value])
          }, h(l.value), 3)
        ])) : m("", !0)
      ], 2)
    ], 2));
  }
}), Ua = { class: "fr-form-group" }, Za = ["disabled", "aria-labelledby", "aria-invalid", "role"], $a = ["id"], Ja = {
  key: 0,
  class: "required"
}, el = ["id"], tl = /* @__PURE__ */ z({
  __name: "DsfrCheckboxSet",
  props: {
    titleId: { default: () => q("checkbox", "group") },
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
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = b(() => a.errorMessage || a.validMessage), i = b(() => a.errorMessage ? "fr-error-text" : "fr-valid-text"), s = ({ name: f, checked: u }) => {
      const v = u ? [...a.modelValue, f] : a.modelValue.filter((p) => p !== f);
      n("update:modelValue", v);
    }, d = b(() => l.value ? `${a.titleId} messages-${a.titleId}` : a.titleId);
    return (f, u) => (r(), c("div", Ua, [
      o("fieldset", {
        class: L(["fr-fieldset", {
          "fr-fieldset--error": f.errorMessage,
          "fr-fieldset--valid": !f.errorMessage && f.validMessage
        }]),
        disabled: f.disabled,
        "aria-labelledby": d.value,
        "aria-invalid": f.ariaInvalid,
        role: f.errorMessage || f.validMessage ? "group" : void 0
      }, [
        o("legend", {
          id: f.titleId,
          class: "fr-fieldset__legend fr-text--regular"
        }, [
          C(f.$slots, "legend", {}, () => [
            I(h(f.legend) + " ", 1),
            C(f.$slots, "required-tip", {}, () => [
              f.required ? (r(), c("span", Ja, " *")) : m("", !0)
            ])
          ])
        ], 8, $a),
        C(f.$slots, "default", {}, () => [
          (r(!0), c(T, null, N(f.options, (v) => (r(), M(Le, {
            id: v.id,
            key: v.id || v.name,
            name: v.name,
            label: v.label,
            disabled: v.disabled,
            "aria-disabled": v.disabled,
            small: f.small,
            inline: f.inline,
            "model-value": f.modelValue.includes(v.name),
            hint: v.hint,
            "onUpdate:modelValue": (p) => s({ name: v.name, checked: p })
          }, null, 8, ["id", "name", "label", "disabled", "aria-disabled", "small", "inline", "model-value", "hint", "onUpdate:modelValue"]))), 128))
        ]),
        l.value ? (r(), c("div", {
          key: 0,
          id: `messages-${f.titleId}`,
          class: "fr-messages-group",
          role: "alert"
        }, [
          o("p", {
            class: L(["fr-message--info flex items-center", i.value])
          }, [
            o("span", null, h(l.value), 1)
          ], 2)
        ], 8, el)) : m("", !0)
      ], 10, Za)
    ]));
  }
}), al = { class: "fr-consent-banner__content" }, ll = { class: "fr-text--sm" }, nl = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, rl = /* @__PURE__ */ z({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(t) {
    const e = t, a = b(() => typeof e.url == "string" && e.url.startsWith("http")), n = b(() => e.url ? a.value ? "a" : "RouterLink" : "a"), l = b(() => ({ [a.value ? "href" : "to"]: e.url }));
    return (i, s) => (r(), c(T, null, [
      o("div", al, [
        o("p", ll, [
          C(i.$slots, "default", {}, () => [
            I(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page "),
            (r(), M($(n.value), E(l.value, { "data-testid": "link" }), {
              default: F(() => [
                I(" Données personnelles et cookies ")
              ]),
              _: 1
            }, 16)),
            I(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. ")
          ])
        ])
      ]),
      o("ul", nl, [
        o("li", null, [
          o("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: s[0] || (s[0] = W((d) => i.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        o("li", null, [
          o("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: s[1] || (s[1] = W((d) => i.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        o("li", null, [
          o("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: s[2] || (s[2] = W((d) => i.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), il = "data:image/png;base64,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", ol = (t) => (dt("data-v-0f6cf5b4"), t = t(), ut(), t), sl = { class: "fr-container flex" }, dl = { class: "half" }, ul = { class: "fr-h1" }, cl = { class: "flex fr-my-md-3w" }, fl = { class: "fr-h6" }, vl = /* @__PURE__ */ ol(() => /* @__PURE__ */ o("div", { class: "half self-center text-center" }, [
  /* @__PURE__ */ o("img", {
    class: "error-img",
    src: il
  })
], -1)), pl = /* @__PURE__ */ z({
  __name: "DsfrErrorPage",
  props: {
    title: { default: "Page non trouvée" },
    subtitle: { default: "Erreur 404" },
    description: { default: "La page que vous cherchez est introuvable. Excusez-nous pour la gêne occasionnée." },
    help: { default: "Si vous avez tapé l'adresse web dans le navigateur, vérifiez qu'elle est correcte. La page n'est peut être plus disponible." },
    buttons: { default: void 0 }
  },
  setup(t) {
    return (e, a) => {
      var n;
      return r(), c("div", sl, [
        o("div", dl, [
          o("h1", ul, h(e.title), 1),
          o("span", cl, h(e.subtitle), 1),
          o("p", fl, h(e.description), 1),
          o("p", null, h(e.help), 1),
          (n = e.buttons) != null && n.length ? (r(), M(Me, {
            key: 0,
            buttons: e.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : m("", !0),
          C(e.$slots, "default", {}, void 0, !0)
        ]),
        vl
      ]);
    };
  }
}), hl = /* @__PURE__ */ ne(pl, [["__scopeId", "data-v-0f6cf5b4"]]), ml = { class: "fr-fieldset" }, gl = ["id"], bl = {
  key: 1,
  class: "fr-fieldset__element"
}, yl = { class: "fr-fieldset__element" }, kl = /* @__PURE__ */ z({
  __name: "DsfrFieldset",
  props: {
    legend: { default: "" },
    legendClass: { default: "" },
    legendId: { default: "" },
    hint: { default: "" },
    hintClass: { default: "" }
  },
  setup(t) {
    return (e, a) => {
      var n, l, i, s;
      return r(), c("fieldset", ml, [
        e.legend || (l = (n = e.$slots).legend) != null && l.call(n).length ? (r(), c("legend", {
          key: 0,
          id: e.legendId,
          class: L(["fr-fieldset__legend", e.legendClass])
        }, [
          I(h(e.legend) + " ", 1),
          C(e.$slots, "legend")
        ], 10, gl)) : m("", !0),
        e.hint || (s = (i = e.$slots).hint) != null && s.call(i).length ? (r(), c("div", bl, [
          o("span", {
            class: L(["fr-hint-text", e.hintClass])
          }, [
            I(h(e.hint) + " ", 1),
            C(e.$slots, "hint")
          ], 2)
        ])) : m("", !0),
        o("div", yl, [
          C(e.$slots, "default")
        ])
      ]);
    };
  }
}), wl = ["href", "download"], _l = { class: "fr-link__detail" }, ct = /* @__PURE__ */ z({
  __name: "DsfrFileDownload",
  props: {
    title: { default: "Télécharger le document" },
    format: { default: "JPEG" },
    size: { default: "250 Ko" },
    href: { default: "#" },
    download: { default: "" }
  },
  setup(t) {
    return (e, a) => (r(), c("a", {
      href: e.href,
      download: e.download,
      class: "fr-link fr-link--download"
    }, [
      I(h(e.title) + " ", 1),
      o("span", _l, h(e.format) + " – " + h(e.size), 1)
    ], 8, wl));
  }
}), xl = { class: "fr-downloads-group fr-downloads-group--bordered" }, zl = {
  key: 0,
  class: "fr-downloads-group__title"
}, Dl = /* @__PURE__ */ z({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (r(), c("div", xl, [
      e.title ? (r(), c("h4", zl, h(e.title), 1)) : m("", !0),
      o("ul", null, [
        (r(!0), c(T, null, N(e.files, (n, l) => (r(), c("li", { key: l }, [
          O(ct, {
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
}), Cl = ["for"], Ml = {
  key: 0,
  class: "required"
}, Ll = {
  key: 1,
  class: "fr-hint-text"
}, Il = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], Sl = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Bl = ["id"], Al = /* @__PURE__ */ z({
  inheritAttrs: !1,
  __name: "DsfrFileUpload",
  props: {
    id: { default: () => q("file-upload") },
    label: { default: "Ajouter un fichier" },
    accept: { default: void 0 },
    hint: { default: "" },
    error: { default: "" },
    validMessage: { default: "" },
    disabled: { type: Boolean },
    modelValue: { default: "" }
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = (s) => {
      var d, f;
      n("update:modelValue", (d = s.target) == null ? void 0 : d.value), n("change", (f = s.target) == null ? void 0 : f.files);
    }, i = b(() => Array.isArray(a.accept) ? a.accept.join(",") : a.accept);
    return (s, d) => (r(), c("div", {
      class: L(["fr-upload-group", {
        "fr-upload-group--error": s.error,
        "fr-upload-group--valid": s.validMessage,
        "fr-upload-group--disabled": s.disabled
      }])
    }, [
      o("label", {
        class: "fr-label",
        for: s.id
      }, [
        I(h(s.label) + " ", 1),
        "required" in s.$attrs && s.$attrs.required !== !1 ? (r(), c("span", Ml, " *")) : m("", !0),
        s.hint ? (r(), c("span", Ll, h(s.hint), 1)) : m("", !0)
      ], 8, Cl),
      o("input", E({
        id: s.id,
        class: "fr-upload",
        type: "file",
        "aria-describedby": s.error || s.validMessage ? `${s.id}-desc` : void 0
      }, s.$attrs, {
        value: s.modelValue,
        disabled: s.disabled,
        "aria-disabled": s.disabled,
        accept: i.value,
        onChange: d[0] || (d[0] = (f) => l(f))
      }), null, 16, Il),
      s.error || s.validMessage ? (r(), c("div", Sl, [
        s.error ? (r(), c("p", {
          key: 0,
          id: `${s.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, h(s.error ?? s.validMessage), 9, Bl)) : m("", !0)
      ])) : m("", !0)
    ], 2));
  }
}), Tl = { class: "fr-follow__social" }, Hl = /* @__PURE__ */ o("br", null, null, -1), Vl = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, El = ["title", "href"], ft = /* @__PURE__ */ z({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(t) {
    return (e, a) => (r(), c("div", Tl, [
      (r(), M($(e.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: F(() => [
          I(" Suivez-nous "),
          Hl,
          I(" sur les réseaux sociaux ")
        ]),
        _: 1
      })),
      e.networks.length ? (r(), c("ul", Vl, [
        (r(!0), c(T, null, N(e.networks, (n, l) => (r(), c("li", { key: l }, [
          o("a", {
            class: L(["fr-btn", `fr-btn--${n.type}`]),
            title: n.name,
            href: n.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, h(n.name), 11, El)
        ]))), 128))
      ])) : m("", !0)
    ]));
  }
}), Fl = { class: "fr-follow__newsletter" }, Rl = { class: "fr-h5 fr-follow__title" }, Pl = { class: "fr-text--sm fr-follow__desc" }, Nl = { key: 0 }, Xl = ["title"], Yl = { key: 1 }, jl = { action: "" }, Ol = {
  class: "fr-label",
  for: "newsletter-email"
}, ql = { class: "fr-input-wrap fr-input-wrap--addon" }, Ql = ["title", "placeholder", "value"], Gl = ["title"], Kl = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Wl = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, Ul = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, vt = /* @__PURE__ */ z({
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
  setup(t, { emit: e }) {
    const a = e, n = (l) => a("update:email", l.target.value);
    return (l, i) => (r(), c("div", Fl, [
      o("div", null, [
        o("h3", Rl, h(l.title), 1),
        o("p", Pl, h(l.description), 1)
      ]),
      l.onlyCallout ? (r(), c("div", Nl, [
        o("button", {
          class: "fr-btn",
          title: l.buttonTitle,
          onClick: i[0] || (i[0] = (s) => l.buttonAction ? l.buttonAction(s) : () => {
          })
        }, h(l.buttonText), 9, Xl)
      ])) : (r(), c("div", Yl, [
        o("form", jl, [
          o("label", Ol, h(l.labelEmail), 1),
          o("div", ql, [
            o("input", {
              id: "newsletter-email",
              class: "fr-input",
              "aria-describedby": "fr-newsletter-hint-text",
              title: l.inputTitle || l.labelEmail,
              placeholder: l.placeholder || l.labelEmail,
              type: "email",
              name: "newsletter-email",
              value: l.email,
              autocomplete: "email",
              onInput: i[1] || (i[1] = (s) => n(s))
            }, null, 40, Ql),
            o("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: l.buttonTitle,
              type: "submit"
            }, h(l.buttonText), 9, Gl)
          ]),
          l.error ? (r(), c("div", Kl, [
            o("p", Wl, h(l.error), 1)
          ])) : m("", !0),
          o("p", Ul, h(l.hintText), 1)
        ])
      ]))
    ]));
  }
}), Zl = { class: "fr-follow" }, $l = { class: "fr-container" }, Jl = { class: "fr-grid-row" }, en = /* @__PURE__ */ z({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(t) {
    const e = t, a = b(() => e.networks && e.networks.length), n = b(() => typeof e.newsletterData == "object");
    return (l, i) => (r(), c("div", Zl, [
      o("div", $l, [
        o("div", Jl, [
          C(l.$slots, "default", {}, () => [
            l.newsletterData ? (r(), c("div", {
              key: 0,
              class: L(["fr-col-12", { "fr-col-md-8": a.value }])
            }, [
              O(vt, re(Ne(l.newsletterData)), null, 16)
            ], 2)) : m("", !0),
            a.value ? (r(), c("div", {
              key: 1,
              class: L(["fr-col-12", { "fr-col-md-4": n.value }])
            }, [
              O(ft, { networks: l.networks }, null, 8, ["networks"])
            ], 2)) : m("", !0)
          ])
        ])
      ])
    ]));
  }
}), tn = ["innerHTML"], _e = /* @__PURE__ */ z({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(t) {
    const e = t, a = b(() => Array.isArray(e.logoText) ? e.logoText.join("<br>") : e.logoText);
    return (n, l) => (r(), c("p", {
      class: L(["fr-logo", {
        "fr-logo--sm": n.small && !n.large,
        "fr-logo--lg": n.large && !n.small
      }]),
      innerHTML: a.value
    }, null, 10, tn));
  }
}), an = { class: "fr-footer__partners" }, ln = {
  key: 0,
  class: "fr-footer__partners-title"
}, nn = { class: "fr-footer__partners-logos" }, rn = {
  key: 0,
  class: "fr-footer__partners-main"
}, on = ["href"], sn = ["src", "alt"], dn = { class: "fr-footer__partners-sub" }, un = ["href"], cn = ["src", "alt"], pt = /* @__PURE__ */ z({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (r(), c("div", an, [
      e.title ? (r(), c("h4", ln, h(e.title), 1)) : m("", !0),
      o("div", nn, [
        e.mainPartner ? (r(), c("div", rn, [
          o("a", {
            class: "fr-footer__partners-link",
            href: e.mainPartner.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, [
            o("img", {
              class: "fr-footer__logo",
              src: e.mainPartner.logo,
              alt: e.mainPartner.name
            }, null, 8, sn)
          ], 8, on)
        ])) : m("", !0),
        o("div", dn, [
          o("ul", null, [
            (r(!0), c(T, null, N(e.subPartners, (n, l) => (r(), c("li", { key: l }, [
              o("a", {
                class: "fr-footer__partners-link",
                href: n.href,
                target: "_blank",
                rel: "noopener noreferrer"
              }, [
                o("img", {
                  class: "fr-footer__logo",
                  src: n.logo,
                  alt: n.name
                }, null, 8, cn)
              ], 8, un)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), We = 1, fn = /* @__PURE__ */ z({
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
    href: { default: void 0 }
  },
  setup(t) {
    const e = t, a = b(() => {
      var v;
      return (v = e.href) == null ? void 0 : v.startsWith("http");
    }), n = b(() => {
      var v;
      return (v = e.href) == null ? void 0 : v.startsWith("mailto");
    }), l = b(() => e.button ? "button" : a.value || n.value ? "a" : "RouterLink"), i = b(() => {
      if (!(!a.value && !n.value))
        return e.href;
    }), s = b(() => {
      if (!(a.value || n.value))
        return e.to;
    }), d = b(() => s.value ? { to: s.value } : { href: i.value }), f = b(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), u = b(
      () => typeof e.icon == "string" ? { name: e.icon, scale: We, ...e.iconAttrs ?? {} } : { scale: We, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (v, p) => (r(), M($(l.value), E({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": f.value && v.iconRight,
        "fr-btn--icon-left": f.value && !v.iconRight,
        [String(v.icon)]: f.value
      }]
    }, d.value, {
      target: v.target,
      onClick: W(v.onClick, ["stop"])
    }), {
      default: F(() => {
        var _, D;
        return [
          !f.value && (v.icon || (_ = v.iconAttrs) != null && _.name) && !v.iconRight ? (r(), M(X(ie), E({
            key: 0,
            class: "fr-mr-1w"
          }, u.value), null, 16)) : m("", !0),
          I(" " + h(v.label) + " ", 1),
          !f.value && (v.icon || (D = v.iconAttrs) != null && D.name) && v.iconRight ? (r(), M(X(ie), E({
            key: 1,
            class: "fr-ml-1w"
          }, u.value), null, 16)) : m("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), vn = {
  id: "footer",
  class: "fr-footer",
  role: "contentinfo"
}, pn = {
  key: 0,
  class: "fr-footer__top"
}, hn = { class: "fr-container" }, mn = { class: "fr-grid-row fr-grid-row--start fr-grid-row--gutters" }, gn = { class: "fr-container" }, bn = { class: "fr-footer__body" }, yn = {
  key: 0,
  class: "fr-footer__brand fr-enlarge-link"
}, kn = ["href"], wn = ["src", "alt"], _n = ["src", "alt"], xn = {
  key: 1,
  class: "fr-footer__brand fr-enlarge-link"
}, zn = { class: "fr-footer__content" }, Dn = { class: "fr-footer__content-desc" }, Cn = { class: "fr-footer__content-list" }, Mn = ["href"], Ln = { class: "fr-footer__bottom" }, In = { class: "fr-footer__bottom-list" }, Sn = {
  key: 0,
  class: "fr-footer__bottom-copy"
}, Bn = /* @__PURE__ */ z({
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
    mandatoryLinks: { default: (t) => [
      {
        label: `Accessibilité : ${t.a11yCompliance}`,
        to: t.a11yComplianceLink
      },
      {
        label: "Mentions légales",
        to: t.legalLink,
        "data-testid": "/mentions-legales"
      },
      {
        label: "Données personnelles",
        to: t.personalDataLink
      },
      {
        label: "Gestion des cookies",
        to: t.cookiesLink
      }
    ] },
    ecosystemLinks: { default: () => [
      {
        label: "legifrance.gouv.fr",
        href: "https://legifrance.gouv.fr"
      },
      {
        label: "info.gouv.fr",
        href: "https://info.gouv.fr"
      },
      {
        label: "service-public.fr",
        href: "https://service-public.fr"
      },
      {
        label: "data.gouv.fr",
        href: "https://data.gouv.fr"
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
    licenceText: { default: "Sauf mention contraire, tous les textes de ce site sont sous" },
    licenceName: { default: "licence etalab-2.0" }
  },
  setup(t) {
    const e = t, a = b(() => [
      ...e.beforeMandatoryLinks,
      ...e.mandatoryLinks,
      ...e.afterMandatoryLinks
    ]), n = st(), l = b(() => {
      var u;
      return (u = n["footer-link-lists"]) == null ? void 0 : u.call(n).length;
    }), i = b(() => {
      const u = e.licenceTo || e.licenceLinkProps.to;
      return u && typeof u == "string" && u.startsWith("http");
    }), s = b(() => i.value ? "" : e.licenceTo), d = b(() => i.value ? e.licenceTo : ""), f = b(() => typeof e.operatorTo == "string" && e.operatorTo.startsWith("http"));
    return (u, v) => {
      const p = J("RouterLink");
      return r(), c("footer", vn, [
        l.value ? (r(), c("div", pn, [
          o("div", hn, [
            o("div", mn, [
              C(u.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : m("", !0),
        o("div", gn, [
          o("div", bn, [
            u.operatorImgSrc ? (r(), c("div", yn, [
              O(_e, { "logo-text": u.logoText }, null, 8, ["logo-text"]),
              f.value ? (r(), c("a", {
                key: 0,
                href: u.operatorTo,
                "data-testid": "card-link",
                class: "fr-footer__brand-link"
              }, [
                o("img", {
                  class: "fr-footer__logo",
                  style: de(u.operatorImgStyle),
                  src: u.operatorImgSrc,
                  alt: u.operatorImgAlt
                }, null, 12, wn)
              ], 8, kn)) : (r(), M(p, {
                key: 1,
                class: "fr-footer__brand-link",
                to: u.homeLink,
                title: u.homeTitle
              }, {
                default: F(() => [
                  o("img", {
                    class: "fr-footer__logo",
                    style: de(u.operatorImgStyle),
                    src: u.operatorImgSrc,
                    alt: u.operatorImgAlt
                  }, null, 12, _n)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (r(), c("div", xn, [
              O(p, {
                to: u.homeLink,
                title: u.homeTitle
              }, {
                default: F(() => [
                  O(_e, { "logo-text": u.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            o("div", zn, [
              o("p", Dn, [
                C(u.$slots, "description", {}, () => [
                  I(h(u.descText), 1)
                ], !0)
              ]),
              o("ul", Cn, [
                (r(!0), c(T, null, N(u.ecosystemLinks, (_, D) => (r(), c("li", {
                  key: D,
                  class: "fr-footer__content-item"
                }, [
                  o("a", {
                    class: "fr-footer__content-link",
                    href: _.href,
                    target: "_blank",
                    rel: "noopener noreferrer"
                  }, h(_.label), 9, Mn)
                ]))), 128))
              ])
            ])
          ]),
          u.partners ? (r(), M(pt, re(E({ key: 0 }, u.partners)), null, 16)) : m("", !0),
          o("div", Ln, [
            o("ul", In, [
              (r(!0), c(T, null, N(a.value, (_, D) => (r(), c("li", {
                key: D,
                class: "fr-footer__bottom-item"
              }, [
                O(fn, E({ ref_for: !0 }, _), null, 16)
              ]))), 128))
            ]),
            u.licenceText ? (r(), c("div", Sn, [
              o("p", null, [
                I(h(u.licenceText) + " ", 1),
                (r(), M($(i.value ? "a" : "RouterLink"), E({
                  class: "fr-link-licence no-content-after",
                  to: i.value ? null : s.value,
                  href: d.value,
                  target: i.value ? "_blank" : void 0,
                  rel: "noopener noreferrer"
                }, u.licenceLinkProps), {
                  default: F(() => [
                    I(h(u.licenceName), 1)
                  ]),
                  _: 1
                }, 16, ["to", "href", "target"]))
              ])
            ])) : m("", !0)
          ])
        ])
      ]);
    };
  }
}), An = /* @__PURE__ */ ne(Bn, [["__scopeId", "data-v-a64fdd76"]]), Tn = { class: "fr-footer__top-cat" }, Hn = { class: "fr-footer__top-list" }, Vn = ["href"], En = /* @__PURE__ */ z({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(t) {
    return (e, a) => {
      const n = J("RouterLink");
      return r(), c("div", null, [
        o("h3", Tn, h(e.categoryName), 1),
        o("ul", Hn, [
          (r(!0), c(T, null, N(e.links, (l, i) => (r(), c("li", { key: i }, [
            typeof l.to == "string" && l.to.startsWith("http") ? (r(), c("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: l.to
            }, h(l.label), 9, Vn)) : m("", !0),
            typeof l.to == "object" || typeof l.to == "string" && !l.to.startsWith("http") ? (r(), M(n, {
              key: 1,
              class: "fr-footer__top-link",
              to: l.to
            }, {
              default: F(() => [
                I(h(l.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : m("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Fn = { class: "fr-connect-group" }, Rn = /* @__PURE__ */ o("span", { class: "fr-connect__login" }, "S’identifier avec ", -1), Pn = { class: "fr-connect__brand" }, Nn = ["href", "title"], Xn = /* @__PURE__ */ z({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(t) {
    return (e, a) => (r(), c("div", Fn, [
      o("button", {
        class: L(["fr-connect", [{ "fr-connect--plus": e.secure }]])
      }, [
        Rn,
        o("span", Pn, "FranceConnect" + h(e.secure ? "+" : ""), 1)
      ], 2),
      o("p", null, [
        o("a", {
          href: e.url ?? `https://franceconnect.gouv.fr/${e.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, h(`Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ?`), 9, Nn)
      ])
    ]));
  }
}), Yn = ["for"], jn = {
  key: 0,
  class: "required"
}, On = {
  key: 0,
  class: "fr-hint-text"
}, qn = /* @__PURE__ */ z({
  inheritAttrs: !1,
  __name: "DsfrInput",
  props: {
    id: { default: () => q("basic", "input") },
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
  setup(t, { expose: e }) {
    const a = t, n = Kt(), l = R(null), i = () => {
      var u;
      return (u = l.value) == null ? void 0 : u.focus();
    }, s = b(() => a.isTextarea ? "textarea" : "input"), d = b(() => a.isWithWrapper || n.type === "date" || !!a.wrapperClass), f = b(() => [
      "fr-label",
      { invisible: !a.labelVisible },
      a.labelClass
    ]);
    return e({
      focus: i
    }), (u, v) => (r(), c(T, null, [
      o("label", {
        class: L(f.value),
        for: u.id
      }, [
        C(u.$slots, "label", {}, () => [
          I(h(u.label) + " ", 1),
          C(u.$slots, "required-tip", {}, () => [
            "required" in u.$attrs && u.$attrs.required !== !1 ? (r(), c("span", jn, "*")) : m("", !0)
          ], !0)
        ], !0),
        u.hint ? (r(), c("span", On, h(u.hint), 1)) : m("", !0)
      ], 10, Yn),
      d.value ? (r(), c("div", {
        key: 1,
        class: L([
          { "fr-input-wrap": u.isWithWrapper || u.$attrs.type === "date" },
          u.wrapperClass
        ])
      }, [
        (r(), M($(s.value), E({ id: u.id }, u.$attrs, {
          ref_key: "__input",
          ref: l,
          class: ["fr-input", {
            "fr-input--error": u.isInvalid,
            "fr-input--valid": u.isValid
          }],
          value: u.modelValue,
          "aria-describedby": u.descriptionId || void 0,
          onInput: v[1] || (v[1] = (p) => u.$emit("update:modelValue", p.target.value))
        }), null, 16, ["id", "class", "value", "aria-describedby"]))
      ], 2)) : (r(), M($(s.value), E({
        key: 0,
        id: u.id
      }, u.$attrs, {
        ref_key: "__input",
        ref: l,
        class: ["fr-input", {
          "fr-input--error": u.isInvalid,
          "fr-input--valid": u.isValid
        }],
        value: u.modelValue,
        "aria-describedby": u.descriptionId || void 0,
        onInput: v[0] || (v[0] = (p) => u.$emit("update:modelValue", p.target.value))
      }), null, 16, ["id", "class", "value", "aria-describedby"]))
    ], 64));
  }
}), Ye = /* @__PURE__ */ ne(qn, [["__scopeId", "data-v-771f90df"]]), Ve = /* @__PURE__ */ z({
  __name: "DsfrSearchBar",
  props: {
    id: { default: () => q("search", "input") },
    label: { default: "" },
    labelVisible: { type: Boolean },
    large: { type: Boolean },
    buttonText: { default: "" },
    modelValue: { default: "" },
    placeholder: { default: "Rechercher" },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "search"],
  setup(t, { emit: e }) {
    const a = e;
    return (n, l) => (r(), c("div", {
      class: L(["fr-search-bar", { "fr-search-bar--lg": n.large }]),
      role: "search"
    }, [
      O(Ye, {
        id: n.id,
        type: "search",
        placeholder: n.placeholder,
        "model-value": n.modelValue,
        "label-visible": n.labelVisible,
        label: n.label,
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        "onUpdate:modelValue": l[0] || (l[0] = (i) => a("update:modelValue", i)),
        onKeydown: l[1] || (l[1] = qt((i) => a("search", n.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label-visible", "label", "disabled", "aria-disabled"]),
      O(ke, {
        title: "Rechercher",
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        onClick: l[2] || (l[2] = (i) => a("search", n.modelValue))
      }, {
        default: F(() => [
          I(h(n.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), Ue = 1, ht = /* @__PURE__ */ z({
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
    href: { default: void 0 }
  },
  setup(t) {
    const e = t, a = b(() => typeof e.path == "string"), n = b(() => {
      var p;
      return ((p = e.href) == null ? void 0 : p.startsWith("http")) || a.value && e.path.startsWith("http");
    }), l = b(() => {
      var p;
      return ((p = e.href) == null ? void 0 : p.startsWith("mailto")) || a.value && e.path.startsWith("mailto");
    }), i = b(() => e.button ? "button" : n.value || l.value ? "a" : "RouterLink"), s = b(() => {
      if (!(!n.value && !l.value))
        return e.href !== void 0 ? e.href : e.path;
    }), d = b(() => {
      if (!(n.value || l.value))
        return e.to || e.path;
    }), f = b(() => d.value ? { to: d.value } : { href: s.value }), u = b(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), v = b(
      () => typeof e.icon == "string" ? { name: e.icon, scale: Ue, ...e.iconAttrs ?? {} } : { scale: Ue, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (p, _) => (r(), M($(i.value), E({
      class: ["fr-btn", {
        "fr-btn--icon-right": u.value && p.iconRight,
        "fr-btn--icon-left": u.value && !p.iconRight,
        [String(p.icon)]: u.value
      }]
    }, f.value, {
      target: p.target,
      onClick: W(p.onClick, ["stop"])
    }), {
      default: F(() => {
        var D, y;
        return [
          !u.value && (p.icon || (D = p.iconAttrs) != null && D.name) && !p.iconRight ? (r(), M(X(ie), E({
            key: 0,
            class: "fr-mr-1w"
          }, v.value), null, 16)) : m("", !0),
          I(" " + h(p.label) + " ", 1),
          !u.value && (p.icon || (y = p.iconAttrs) != null && y.name) && p.iconRight ? (r(), M(X(ie), E({
            key: 1,
            class: "fr-ml-1w"
          }, v.value), null, 16)) : m("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), Qn = ["aria-label"], Gn = { class: "fr-btns-group" }, Ee = /* @__PURE__ */ z({
  __name: "DsfrHeaderMenuLinks",
  props: {
    links: { default: () => [] },
    navAriaLabel: { default: "Menu secondaire" }
  },
  emits: ["linkClick"],
  setup(t, { emit: e }) {
    const a = e;
    return (n, l) => (r(), c("nav", {
      role: "navigation",
      "aria-label": n.navAriaLabel
    }, [
      o("ul", Gn, [
        (r(!0), c(T, null, N(n.links, (i, s) => (r(), c("li", { key: s }, [
          O(ht, E({ ref_for: !0 }, i, {
            "on-click": (d) => {
              var f;
              a("linkClick", d), (f = i.onClick) == null || f.call(i, d);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Qn));
  }
}), Kn = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, Wn = { class: "fr-nav__item" }, Un = ["aria-controls", "aria-expanded"], Zn = { class: "fr-hidden-lg" }, $n = ["id"], Jn = { class: "fr-menu__list" }, er = ["hreflang", "lang", "aria-current", "href", "onClick"], Fe = /* @__PURE__ */ z({
  __name: "DsfrLanguageSelector",
  props: {
    id: { default: () => q("translate") },
    languages: { default: () => [] },
    currentLanguage: { default: "fr" }
  },
  emits: ["select"],
  setup(t, { emit: e }) {
    const a = t, n = e, {
      collapse: l,
      collapsing: i,
      cssExpanded: s,
      doExpand: d,
      onTransitionEnd: f
    } = ue(), u = R(!1);
    function v(_) {
      u.value = !1, n("select", _);
    }
    const p = b(
      () => a.languages.find(({ codeIso: _ }) => _ === a.currentLanguage)
    );
    return le(u, (_, D) => {
      _ !== D && d(_);
    }), (_, D) => {
      var y, S;
      return r(), c("nav", Kn, [
        o("div", Wn, [
          o("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": _.id,
            "aria-expanded": u.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: D[0] || (D[0] = W((g) => u.value = !u.value, ["prevent", "stop"]))
          }, [
            I(h((y = p.value) == null ? void 0 : y.codeIso.toUpperCase()), 1),
            o("span", Zn, " - " + h((S = p.value) == null ? void 0 : S.label), 1)
          ], 8, Un),
          o("div", {
            id: _.id,
            ref_key: "collapse",
            ref: l,
            class: L(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": X(s), "fr-collapsing": X(i) }]),
            onTransitionend: D[1] || (D[1] = (g) => X(f)(u.value))
          }, [
            o("ul", Jn, [
              (r(!0), c(T, null, N(_.languages, (g, x) => (r(), c("li", { key: x }, [
                o("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: g.codeIso,
                  lang: g.codeIso,
                  "aria-current": _.currentLanguage === g.codeIso ? !0 : void 0,
                  href: `#${g.codeIso}`,
                  onClick: W((H) => v(g), ["prevent", "stop"])
                }, h(`${g.codeIso.toUpperCase()} - ${g.label}`), 9, er)
              ]))), 128))
            ])
          ], 42, $n)
        ])
      ]);
    };
  }
}), tr = {
  role: "banner",
  class: "fr-header"
}, ar = { class: "fr-header__body" }, lr = { class: "fr-container width-inherit" }, nr = { class: "fr-header__body-row" }, rr = { class: "fr-header__brand fr-enlarge-link" }, ir = { class: "fr-header__brand-top" }, or = { class: "fr-header__logo" }, sr = {
  key: 0,
  class: "fr-header__operator"
}, dr = ["src", "alt"], ur = {
  key: 1,
  class: "fr-header__navbar"
}, cr = ["aria-label", "title", "data-fr-opened"], fr = ["aria-label", "title"], vr = {
  key: 0,
  class: "fr-header__service"
}, pr = { class: "fr-header__service-title" }, hr = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, mr = {
  key: 0,
  class: "fr-header__service-tagline"
}, gr = {
  key: 1,
  class: "fr-header__service"
}, br = /* @__PURE__ */ o("p", { class: "fr-header__service-title" }, [
  /* @__PURE__ */ o("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
], -1), yr = [
  br
], kr = { class: "fr-header__tools" }, wr = {
  key: 0,
  class: "fr-header__tools-links"
}, _r = {
  key: 1,
  class: "fr-header__search fr-modal"
}, xr = ["aria-label"], zr = { class: "fr-container" }, Dr = { class: "fr-header__menu-links" }, Cr = { role: "navigation" }, Mr = {
  key: 1,
  class: "flex justify-center items-center"
}, Lr = {
  key: 1,
  class: "fr-hidden fr-unhidden-lg"
}, Ir = /* @__PURE__ */ z({
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
    menuModalLabel: { default: "Menu modal" },
    closeMenuModalLabel: { default: "Fermer" },
    homeLabel: { default: "Accueil" }
  },
  emits: ["update:modelValue", "search", "language-select"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = Qt(a, "languageSelector"), i = R(!1), s = R(!1), d = R(!1), f = () => {
      var g;
      d.value = !1, i.value = !1, s.value = !1, (g = document.getElementById("button-menu")) == null || g.focus();
    }, u = (g) => {
      g.key === "Escape" && f();
    };
    ae(() => {
      document.addEventListener("keydown", u);
    }), me(() => {
      document.removeEventListener("keydown", u);
    });
    const v = () => {
      var g;
      d.value = !0, i.value = !0, s.value = !1, (g = document.getElementById("close-button")) == null || g.focus();
    }, p = () => {
      d.value = !0, i.value = !1, s.value = !0;
    }, _ = f, D = st(), y = b(() => {
      var g;
      return !!((g = D.operator) != null && g.call(D).length) || !!a.operatorImgSrc;
    }), S = b(() => !!D.mainnav);
    return (g, x) => {
      var H, B, V;
      const Y = J("RouterLink");
      return r(), c("header", tr, [
        o("div", ar, [
          o("div", lr, [
            o("div", nr, [
              o("div", rr, [
                o("div", ir, [
                  o("div", or, [
                    O(_e, {
                      "logo-text": g.logoText,
                      "data-testid": "header-logo"
                    }, null, 8, ["logo-text"])
                  ]),
                  y.value ? (r(), c("div", sr, [
                    C(g.$slots, "operator", {}, () => [
                      g.operatorImgSrc ? (r(), c("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: g.operatorImgSrc,
                        alt: g.operatorImgAlt,
                        style: de(g.operatorImgStyle)
                      }, null, 12, dr)) : m("", !0)
                    ])
                  ])) : m("", !0),
                  g.showSearch || S.value || (H = g.quickLinks) != null && H.length ? (r(), c("div", ur, [
                    g.showSearch ? (r(), c("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": g.showSearchLabel,
                      title: g.showSearchLabel,
                      "data-fr-opened": s.value,
                      onClick: x[0] || (x[0] = W((P) => p(), ["prevent", "stop"]))
                    }, null, 8, cr)) : m("", !0),
                    S.value || (B = g.quickLinks) != null && B.length ? (r(), c("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": v,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": g.menuLabel,
                      title: g.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: x[1] || (x[1] = W((P) => v(), ["prevent", "stop"]))
                    }, null, 8, fr)) : m("", !0)
                  ])) : m("", !0)
                ]),
                g.serviceTitle ? (r(), c("div", vr, [
                  O(Y, E({
                    to: g.homeTo,
                    title: `${g.homeLabel} - ${g.serviceTitle}`
                  }, g.$attrs), {
                    default: F(() => [
                      o("p", pr, [
                        I(h(g.serviceTitle) + " ", 1),
                        g.showBeta ? (r(), c("span", hr, " BETA ")) : m("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  g.serviceDescription ? (r(), c("p", mr, h(g.serviceDescription), 1)) : m("", !0)
                ])) : m("", !0),
                !g.serviceTitle && g.showBeta ? (r(), c("div", gr, yr)) : m("", !0)
              ]),
              o("div", kr, [
                (V = g.quickLinks) != null && V.length || l.value ? (r(), c("div", wr, [
                  i.value ? m("", !0) : (r(), M(Ee, {
                    key: 0,
                    links: g.quickLinks,
                    "nav-aria-label": g.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  l.value ? (r(), M(Fe, E({ key: 1 }, l.value, {
                    onSelect: x[2] || (x[2] = (P) => n("language-select", P))
                  }), null, 16)) : m("", !0)
                ])) : m("", !0),
                g.showSearch ? (r(), c("div", _r, [
                  O(Ve, {
                    "searchbar-id": g.searchbarId,
                    label: g.searchLabel,
                    "model-value": g.modelValue,
                    placeholder: g.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": x[3] || (x[3] = (P) => n("update:modelValue", P)),
                    onSearch: x[4] || (x[4] = (P) => n("search", P))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])
                ])) : m("", !0)
              ])
            ]),
            g.showSearch || S.value || g.quickLinks && g.quickLinks.length || l.value ? (r(), c("div", {
              key: 0,
              id: "header-navigation",
              class: L(["fr-header__menu fr-modal", { "fr-modal--opened": d.value }]),
              "aria-label": g.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              o("div", zr, [
                o("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: x[5] || (x[5] = W((P) => f(), ["prevent", "stop"]))
                }, h(g.closeMenuModalLabel), 1),
                o("div", Dr, [
                  l.value ? (r(), M(Fe, E({ key: 0 }, l.value, {
                    onSelect: x[6] || (x[6] = (P) => l.value.currentLanguage = P.codeIso)
                  }), null, 16)) : m("", !0),
                  o("nav", Cr, [
                    i.value ? (r(), M(Ee, {
                      key: 0,
                      role: "navigation",
                      links: g.quickLinks,
                      "nav-aria-label": g.quickLinksAriaLabel,
                      onLinkClick: X(_)
                    }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : m("", !0)
                  ])
                ]),
                d.value ? C(g.$slots, "mainnav", {
                  key: 0,
                  hidemodal: f
                }) : m("", !0),
                s.value ? (r(), c("div", Mr, [
                  O(Ve, {
                    "searchbar-id": g.searchbarId,
                    "model-value": g.modelValue,
                    placeholder: g.placeholder,
                    "onUpdate:modelValue": x[7] || (x[7] = (P) => n("update:modelValue", P)),
                    onSearch: x[8] || (x[8] = (P) => n("search", P))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : m("", !0)
              ])
            ], 10, xr)) : m("", !0),
            S.value && !d.value ? (r(), c("div", Lr, [
              C(g.$slots, "mainnav", { hidemodal: f })
            ])) : m("", !0),
            C(g.$slots, "default")
          ])
        ])
      ]);
    };
  }
}), Sr = { class: "fr-highlight" }, Br = /* @__PURE__ */ z({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (r(), c("div", Sr, [
      o("p", {
        class: L({
          "fr-text--lg": e.large && !e.small,
          "fr-text--sm": e.small && !e.large
        })
      }, [
        I(h(e.text) + " ", 1),
        C(e.$slots, "default")
      ], 2)
    ]));
  }
}), Ar = {
  key: 1,
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, Tr = ["id", "data-testid"], Hr = /* @__PURE__ */ z({
  inheritAttrs: !1,
  __name: "DsfrInputGroup",
  props: {
    descriptionId: { default: () => q("basic", "input") },
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
  setup(t) {
    const e = t, a = b(() => e.errorMessage || e.validMessage), n = b(() => e.errorMessage ? "fr-error-text" : "fr-valid-text");
    return (l, i) => (r(), c("div", {
      class: L(["fr-input-group", [
        {
          "fr-input-group--error": l.errorMessage,
          "fr-input-group--valid": l.validMessage
        },
        l.wrapperClass
      ]])
    }, [
      C(l.$slots, "before-input"),
      C(l.$slots, "default"),
      l.$slots.default ? m("", !0) : (r(), M(Ye, E({ key: 0 }, l.$attrs, {
        "is-valid": !!l.validMessage,
        "is-invalid": !!l.errorMessage,
        label: l.label,
        hint: l.hint,
        "description-id": a.value && l.descriptionId || void 0,
        "label-visible": l.labelVisible,
        "model-value": l.modelValue,
        placeholder: l.placeholder,
        "onUpdate:modelValue": i[0] || (i[0] = (s) => l.$emit("update:modelValue", s))
      }), null, 16, ["is-valid", "is-invalid", "label", "hint", "description-id", "label-visible", "model-value", "placeholder"])),
      a.value ? (r(), c("div", Ar, [
        o("p", {
          id: l.descriptionId,
          "data-testid": l.descriptionId,
          class: L(n.value)
        }, [
          o("span", null, h(a.value), 1)
        ], 10, Tr)
      ])) : m("", !0)
    ], 2));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var mt = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], xe = /* @__PURE__ */ mt.join(","), gt = typeof Element > "u", ve = gt ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, ze = !gt && Element.prototype.getRootNode ? function(t) {
  var e;
  return t == null || (e = t.getRootNode) === null || e === void 0 ? void 0 : e.call(t);
} : function(t) {
  return t == null ? void 0 : t.ownerDocument;
}, De = function t(e, a) {
  var n;
  a === void 0 && (a = !0);
  var l = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "inert"), i = l === "" || l === "true", s = i || a && e && t(e.parentNode);
  return s;
}, Vr = function(t) {
  var e, a = t == null || (e = t.getAttribute) === null || e === void 0 ? void 0 : e.call(t, "contenteditable");
  return a === "" || a === "true";
}, bt = function(t, e, a) {
  if (De(t))
    return [];
  var n = Array.prototype.slice.apply(t.querySelectorAll(xe));
  return e && ve.call(t, xe) && n.unshift(t), n = n.filter(a), n;
}, yt = function t(e, a, n) {
  for (var l = [], i = Array.from(e); i.length; ) {
    var s = i.shift();
    if (!De(s, !1))
      if (s.tagName === "SLOT") {
        var d = s.assignedElements(), f = d.length ? d : s.children, u = t(f, !0, n);
        n.flatten ? l.push.apply(l, u) : l.push({
          scopeParent: s,
          candidates: u
        });
      } else {
        var v = ve.call(s, xe);
        v && n.filter(s) && (a || !e.includes(s)) && l.push(s);
        var p = s.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(s), _ = !De(p, !1) && (!n.shadowRootFilter || n.shadowRootFilter(s));
        if (p && _) {
          var D = t(p === !0 ? s.children : p.children, !0, n);
          n.flatten ? l.push.apply(l, D) : l.push({
            scopeParent: s,
            candidates: D
          });
        } else
          i.unshift.apply(i, s.children);
      }
  }
  return l;
}, kt = function(t) {
  return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
}, fe = function(t) {
  if (!t)
    throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || Vr(t)) && !kt(t) ? 0 : t.tabIndex;
}, Er = function(t, e) {
  var a = fe(t);
  return a < 0 && e && !kt(t) ? 0 : a;
}, Fr = function(t, e) {
  return t.tabIndex === e.tabIndex ? t.documentOrder - e.documentOrder : t.tabIndex - e.tabIndex;
}, wt = function(t) {
  return t.tagName === "INPUT";
}, Rr = function(t) {
  return wt(t) && t.type === "hidden";
}, Pr = function(t) {
  var e = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(a) {
    return a.tagName === "SUMMARY";
  });
  return e;
}, Nr = function(t, e) {
  for (var a = 0; a < t.length; a++)
    if (t[a].checked && t[a].form === e)
      return t[a];
}, Xr = function(t) {
  if (!t.name)
    return !0;
  var e = t.form || ze(t), a = function(i) {
    return e.querySelectorAll('input[type="radio"][name="' + i + '"]');
  }, n;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    n = a(window.CSS.escape(t.name));
  else
    try {
      n = a(t.name);
    } catch (i) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", i.message), !1;
    }
  var l = Nr(n, t.form);
  return !l || l === t;
}, Yr = function(t) {
  return wt(t) && t.type === "radio";
}, jr = function(t) {
  return Yr(t) && !Xr(t);
}, Or = function(t) {
  var e, a = t && ze(t), n = (e = a) === null || e === void 0 ? void 0 : e.host, l = !1;
  if (a && a !== t) {
    var i, s, d;
    for (l = !!((i = n) !== null && i !== void 0 && (s = i.ownerDocument) !== null && s !== void 0 && s.contains(n) || t != null && (d = t.ownerDocument) !== null && d !== void 0 && d.contains(t)); !l && n; ) {
      var f, u, v;
      a = ze(n), n = (f = a) === null || f === void 0 ? void 0 : f.host, l = !!((u = n) !== null && u !== void 0 && (v = u.ownerDocument) !== null && v !== void 0 && v.contains(n));
    }
  }
  return l;
}, Ze = function(t) {
  var e = t.getBoundingClientRect(), a = e.width, n = e.height;
  return a === 0 && n === 0;
}, qr = function(t, e) {
  var a = e.displayCheck, n = e.getShadowRoot;
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  var l = ve.call(t, "details>summary:first-of-type"), i = l ? t.parentElement : t;
  if (ve.call(i, "details:not([open]) *"))
    return !0;
  if (!a || a === "full" || a === "legacy-full") {
    if (typeof n == "function") {
      for (var s = t; t; ) {
        var d = t.parentElement, f = ze(t);
        if (d && !d.shadowRoot && n(d) === !0)
          return Ze(t);
        t.assignedSlot ? t = t.assignedSlot : !d && f !== t.ownerDocument ? t = f.host : t = d;
      }
      t = s;
    }
    if (Or(t))
      return !t.getClientRects().length;
    if (a !== "legacy-full")
      return !0;
  } else if (a === "non-zero-area")
    return Ze(t);
  return !1;
}, Qr = function(t) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
    for (var e = t.parentElement; e; ) {
      if (e.tagName === "FIELDSET" && e.disabled) {
        for (var a = 0; a < e.children.length; a++) {
          var n = e.children.item(a);
          if (n.tagName === "LEGEND")
            return ve.call(e, "fieldset[disabled] *") ? !0 : !n.contains(t);
        }
        return !0;
      }
      e = e.parentElement;
    }
  return !1;
}, Ce = function(t, e) {
  return !(e.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  De(e) || Rr(e) || qr(e, t) || // For a details element with a summary, the summary element gets the focus
  Pr(e) || Qr(e));
}, Re = function(t, e) {
  return !(jr(e) || fe(e) < 0 || !Ce(t, e));
}, Gr = function(t) {
  var e = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(e) || e >= 0);
}, Kr = function t(e) {
  var a = [], n = [];
  return e.forEach(function(l, i) {
    var s = !!l.scopeParent, d = s ? l.scopeParent : l, f = Er(d, s), u = s ? t(l.candidates) : d;
    f === 0 ? s ? a.push.apply(a, u) : a.push(d) : n.push({
      documentOrder: i,
      tabIndex: f,
      item: l,
      isScope: s,
      content: u
    });
  }), n.sort(Fr).reduce(function(l, i) {
    return i.isScope ? l.push.apply(l, i.content) : l.push(i.content), l;
  }, []).concat(a);
}, Wr = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = yt([t], e.includeContainer, {
    filter: Re.bind(null, e),
    flatten: !1,
    getShadowRoot: e.getShadowRoot,
    shadowRootFilter: Gr
  }) : a = bt(t, e.includeContainer, Re.bind(null, e)), Kr(a);
}, Ur = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = yt([t], e.includeContainer, {
    filter: Ce.bind(null, e),
    flatten: !0,
    getShadowRoot: e.getShadowRoot
  }) : a = bt(t, e.includeContainer, Ce.bind(null, e)), a;
}, he = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return ve.call(t, xe) === !1 ? !1 : Re(e, t);
}, Zr = /* @__PURE__ */ mt.concat("iframe").join(","), Te = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return ve.call(t, Zr) === !1 ? !1 : Ce(e, t);
};
/*!
* focus-trap 7.5.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function $e(t, e) {
  var a = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(l) {
      return Object.getOwnPropertyDescriptor(t, l).enumerable;
    })), a.push.apply(a, n);
  }
  return a;
}
function Je(t) {
  for (var e = 1; e < arguments.length; e++) {
    var a = arguments[e] != null ? arguments[e] : {};
    e % 2 ? $e(Object(a), !0).forEach(function(n) {
      $r(t, n, a[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : $e(Object(a)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(a, n));
    });
  }
  return t;
}
function $r(t, e, a) {
  return e = ei(e), e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}
function Jr(t, e) {
  if (typeof t != "object" || t === null) return t;
  var a = t[Symbol.toPrimitive];
  if (a !== void 0) {
    var n = a.call(t, e || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function ei(t) {
  var e = Jr(t, "string");
  return typeof e == "symbol" ? e : String(e);
}
var et = {
  activateTrap: function(t, e) {
    if (t.length > 0) {
      var a = t[t.length - 1];
      a !== e && a.pause();
    }
    var n = t.indexOf(e);
    n === -1 || t.splice(n, 1), t.push(e);
  },
  deactivateTrap: function(t, e) {
    var a = t.indexOf(e);
    a !== -1 && t.splice(a, 1), t.length > 0 && t[t.length - 1].unpause();
  }
}, ti = function(t) {
  return t.tagName && t.tagName.toLowerCase() === "input" && typeof t.select == "function";
}, ai = function(t) {
  return (t == null ? void 0 : t.key) === "Escape" || (t == null ? void 0 : t.key) === "Esc" || (t == null ? void 0 : t.keyCode) === 27;
}, ye = function(t) {
  return (t == null ? void 0 : t.key) === "Tab" || (t == null ? void 0 : t.keyCode) === 9;
}, li = function(t) {
  return ye(t) && !t.shiftKey;
}, ni = function(t) {
  return ye(t) && t.shiftKey;
}, tt = function(t) {
  return setTimeout(t, 0);
}, at = function(t, e) {
  var a = -1;
  return t.every(function(n, l) {
    return e(n) ? (a = l, !1) : !0;
  }), a;
}, be = function(t) {
  for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
    a[n - 1] = arguments[n];
  return typeof t == "function" ? t.apply(void 0, a) : t;
}, we = function(t) {
  return t.target.shadowRoot && typeof t.composedPath == "function" ? t.composedPath()[0] : t.target;
}, ri = [], ii = function(t, e) {
  var a = (e == null ? void 0 : e.document) || document, n = (e == null ? void 0 : e.trapStack) || ri, l = Je({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: li,
    isKeyBackward: ni
  }, e), i = {
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
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  }, s, d = function(w, k, A) {
    return w && w[k] !== void 0 ? w[k] : l[A || k];
  }, f = function(w, k) {
    var A = typeof (k == null ? void 0 : k.composedPath) == "function" ? k.composedPath() : void 0;
    return i.containerGroups.findIndex(function(Q) {
      var j = Q.container, G = Q.tabbableNodes;
      return j.contains(w) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (A == null ? void 0 : A.includes(j)) || G.find(function(K) {
        return K === w;
      });
    });
  }, u = function(w) {
    var k = l[w];
    if (typeof k == "function") {
      for (var A = arguments.length, Q = new Array(A > 1 ? A - 1 : 0), j = 1; j < A; j++)
        Q[j - 1] = arguments[j];
      k = k.apply(void 0, Q);
    }
    if (k === !0 && (k = void 0), !k) {
      if (k === void 0 || k === !1)
        return k;
      throw new Error("`".concat(w, "` was specified but was not a node, or did not return a node"));
    }
    var G = k;
    if (typeof k == "string" && (G = a.querySelector(k), !G))
      throw new Error("`".concat(w, "` as selector refers to no known node"));
    return G;
  }, v = function() {
    var w = u("initialFocus");
    if (w === !1)
      return !1;
    if (w === void 0 || !Te(w, l.tabbableOptions))
      if (f(a.activeElement) >= 0)
        w = a.activeElement;
      else {
        var k = i.tabbableGroups[0], A = k && k.firstTabbableNode;
        w = A || u("fallbackFocus");
      }
    if (!w)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return w;
  }, p = function() {
    if (i.containerGroups = i.containers.map(function(w) {
      var k = Wr(w, l.tabbableOptions), A = Ur(w, l.tabbableOptions), Q = k.length > 0 ? k[0] : void 0, j = k.length > 0 ? k[k.length - 1] : void 0, G = A.find(function(Z) {
        return he(Z);
      }), K = A.slice().reverse().find(function(Z) {
        return he(Z);
      }), te = !!k.find(function(Z) {
        return fe(Z) > 0;
      });
      return {
        container: w,
        tabbableNodes: k,
        focusableNodes: A,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: te,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: Q,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: j,
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
        lastDomTabbableNode: K,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(Z) {
          var pe = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, ge = k.indexOf(Z);
          return ge < 0 ? pe ? A.slice(A.indexOf(Z) + 1).find(function(se) {
            return he(se);
          }) : A.slice(0, A.indexOf(Z)).reverse().find(function(se) {
            return he(se);
          }) : k[ge + (pe ? 1 : -1)];
        }
      };
    }), i.tabbableGroups = i.containerGroups.filter(function(w) {
      return w.tabbableNodes.length > 0;
    }), i.tabbableGroups.length <= 0 && !u("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (i.containerGroups.find(function(w) {
      return w.posTabIndexesFound;
    }) && i.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, _ = function w(k) {
    var A = k.activeElement;
    if (A)
      return A.shadowRoot && A.shadowRoot.activeElement !== null ? w(A.shadowRoot) : A;
  }, D = function w(k) {
    if (k !== !1 && k !== _(document)) {
      if (!k || !k.focus) {
        w(v());
        return;
      }
      k.focus({
        preventScroll: !!l.preventScroll
      }), i.mostRecentlyFocusedNode = k, ti(k) && k.select();
    }
  }, y = function(w) {
    var k = u("setReturnFocus", w);
    return k || (k === !1 ? !1 : w);
  }, S = function(w) {
    var k = w.target, A = w.event, Q = w.isBackward, j = Q === void 0 ? !1 : Q;
    k = k || we(A), p();
    var G = null;
    if (i.tabbableGroups.length > 0) {
      var K = f(k, A), te = K >= 0 ? i.containerGroups[K] : void 0;
      if (K < 0)
        j ? G = i.tabbableGroups[i.tabbableGroups.length - 1].lastTabbableNode : G = i.tabbableGroups[0].firstTabbableNode;
      else if (j) {
        var Z = at(i.tabbableGroups, function(Se) {
          var Be = Se.firstTabbableNode;
          return k === Be;
        });
        if (Z < 0 && (te.container === k || Te(k, l.tabbableOptions) && !he(k, l.tabbableOptions) && !te.nextTabbableNode(k, !1)) && (Z = K), Z >= 0) {
          var pe = Z === 0 ? i.tabbableGroups.length - 1 : Z - 1, ge = i.tabbableGroups[pe];
          G = fe(k) >= 0 ? ge.lastTabbableNode : ge.lastDomTabbableNode;
        } else ye(A) || (G = te.nextTabbableNode(k, !1));
      } else {
        var se = at(i.tabbableGroups, function(Se) {
          var Be = Se.lastTabbableNode;
          return k === Be;
        });
        if (se < 0 && (te.container === k || Te(k, l.tabbableOptions) && !he(k, l.tabbableOptions) && !te.nextTabbableNode(k)) && (se = K), se >= 0) {
          var Nt = se === i.tabbableGroups.length - 1 ? 0 : se + 1, qe = i.tabbableGroups[Nt];
          G = fe(k) >= 0 ? qe.firstTabbableNode : qe.firstDomTabbableNode;
        } else ye(A) || (G = te.nextTabbableNode(k));
      }
    } else
      G = u("fallbackFocus");
    return G;
  }, g = function(w) {
    var k = we(w);
    if (!(f(k, w) >= 0)) {
      if (be(l.clickOutsideDeactivates, w)) {
        s.deactivate({
          // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
          //  which will result in the outside click setting focus to the node
          //  that was clicked (and if not focusable, to "nothing"); by setting
          //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
          //  on activation (or the configured `setReturnFocus` node), whether the
          //  outside click was on a focusable node or not
          returnFocus: l.returnFocusOnDeactivate
        });
        return;
      }
      be(l.allowOutsideClick, w) || w.preventDefault();
    }
  }, x = function(w) {
    var k = we(w), A = f(k, w) >= 0;
    if (A || k instanceof Document)
      A && (i.mostRecentlyFocusedNode = k);
    else {
      w.stopImmediatePropagation();
      var Q, j = !0;
      if (i.mostRecentlyFocusedNode)
        if (fe(i.mostRecentlyFocusedNode) > 0) {
          var G = f(i.mostRecentlyFocusedNode), K = i.containerGroups[G].tabbableNodes;
          if (K.length > 0) {
            var te = K.findIndex(function(Z) {
              return Z === i.mostRecentlyFocusedNode;
            });
            te >= 0 && (l.isKeyForward(i.recentNavEvent) ? te + 1 < K.length && (Q = K[te + 1], j = !1) : te - 1 >= 0 && (Q = K[te - 1], j = !1));
          }
        } else
          i.containerGroups.some(function(Z) {
            return Z.tabbableNodes.some(function(pe) {
              return fe(pe) > 0;
            });
          }) || (j = !1);
      else
        j = !1;
      j && (Q = S({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: i.mostRecentlyFocusedNode,
        isBackward: l.isKeyBackward(i.recentNavEvent)
      })), D(Q || i.mostRecentlyFocusedNode || v());
    }
    i.recentNavEvent = void 0;
  }, H = function(w) {
    var k = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    i.recentNavEvent = w;
    var A = S({
      event: w,
      isBackward: k
    });
    A && (ye(w) && w.preventDefault(), D(A));
  }, B = function(w) {
    if (ai(w) && be(l.escapeDeactivates, w) !== !1) {
      w.preventDefault(), s.deactivate();
      return;
    }
    (l.isKeyForward(w) || l.isKeyBackward(w)) && H(w, l.isKeyBackward(w));
  }, V = function(w) {
    var k = we(w);
    f(k, w) >= 0 || be(l.clickOutsideDeactivates, w) || be(l.allowOutsideClick, w) || (w.preventDefault(), w.stopImmediatePropagation());
  }, Y = function() {
    if (i.active)
      return et.activateTrap(n, s), i.delayInitialFocusTimer = l.delayInitialFocus ? tt(function() {
        D(v());
      }) : D(v()), a.addEventListener("focusin", x, !0), a.addEventListener("mousedown", g, {
        capture: !0,
        passive: !1
      }), a.addEventListener("touchstart", g, {
        capture: !0,
        passive: !1
      }), a.addEventListener("click", V, {
        capture: !0,
        passive: !1
      }), a.addEventListener("keydown", B, {
        capture: !0,
        passive: !1
      }), s;
  }, P = function() {
    if (i.active)
      return a.removeEventListener("focusin", x, !0), a.removeEventListener("mousedown", g, !0), a.removeEventListener("touchstart", g, !0), a.removeEventListener("click", V, !0), a.removeEventListener("keydown", B, !0), s;
  }, U = function(w) {
    var k = w.some(function(A) {
      var Q = Array.from(A.removedNodes);
      return Q.some(function(j) {
        return j === i.mostRecentlyFocusedNode;
      });
    });
    k && D(v());
  }, oe = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(U) : void 0, ee = function() {
    oe && (oe.disconnect(), i.active && !i.paused && i.containers.map(function(w) {
      oe.observe(w, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return s = {
    get active() {
      return i.active;
    },
    get paused() {
      return i.paused;
    },
    activate: function(w) {
      if (i.active)
        return this;
      var k = d(w, "onActivate"), A = d(w, "onPostActivate"), Q = d(w, "checkCanFocusTrap");
      Q || p(), i.active = !0, i.paused = !1, i.nodeFocusedBeforeActivation = a.activeElement, k == null || k();
      var j = function() {
        Q && p(), Y(), ee(), A == null || A();
      };
      return Q ? (Q(i.containers.concat()).then(j, j), this) : (j(), this);
    },
    deactivate: function(w) {
      if (!i.active)
        return this;
      var k = Je({
        onDeactivate: l.onDeactivate,
        onPostDeactivate: l.onPostDeactivate,
        checkCanReturnFocus: l.checkCanReturnFocus
      }, w);
      clearTimeout(i.delayInitialFocusTimer), i.delayInitialFocusTimer = void 0, P(), i.active = !1, i.paused = !1, ee(), et.deactivateTrap(n, s);
      var A = d(k, "onDeactivate"), Q = d(k, "onPostDeactivate"), j = d(k, "checkCanReturnFocus"), G = d(k, "returnFocus", "returnFocusOnDeactivate");
      A == null || A();
      var K = function() {
        tt(function() {
          G && D(y(i.nodeFocusedBeforeActivation)), Q == null || Q();
        });
      };
      return G && j ? (j(y(i.nodeFocusedBeforeActivation)).then(K, K), this) : (K(), this);
    },
    pause: function(w) {
      if (i.paused || !i.active)
        return this;
      var k = d(w, "onPause"), A = d(w, "onPostPause");
      return i.paused = !0, k == null || k(), P(), ee(), A == null || A(), this;
    },
    unpause: function(w) {
      if (!i.paused || !i.active)
        return this;
      var k = d(w, "onUnpause"), A = d(w, "onPostUnpause");
      return i.paused = !1, k == null || k(), p(), Y(), ee(), A == null || A(), this;
    },
    updateContainerElements: function(w) {
      var k = [].concat(w).filter(Boolean);
      return i.containers = k.map(function(A) {
        return typeof A == "string" ? a.querySelector(A) : A;
      }), i.active && p(), ee(), this;
    }
  }, s.updateContainerElements(t), s;
};
/*!
  * focus-trap-vue v4.0.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const oi = {
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
}, si = z({
  props: Object.assign({
    active: {
      // TODO: could be options for activate but what about the options for deactivating?
      type: Boolean,
      default: !0
    }
  }, oi),
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
  setup(t, { slots: e, emit: a }) {
    let n;
    const l = R(null), i = b(() => {
      const d = l.value;
      return d && (d instanceof HTMLElement ? d : d.$el);
    });
    function s() {
      return n || (n = ii(i.value, {
        escapeDeactivates: t.escapeDeactivates,
        allowOutsideClick: t.allowOutsideClick,
        returnFocusOnDeactivate: t.returnFocusOnDeactivate,
        clickOutsideDeactivates: t.clickOutsideDeactivates,
        onActivate: () => {
          a("update:active", !0), a("activate");
        },
        onDeactivate: () => {
          a("update:active", !1), a("deactivate");
        },
        onPostActivate: () => a("postActivate"),
        onPostDeactivate: () => a("postDeactivate"),
        initialFocus: t.initialFocus,
        fallbackFocus: t.fallbackFocus,
        tabbableOptions: t.tabbableOptions,
        delayInitialFocus: t.delayInitialFocus,
        preventScroll: t.preventScroll
      }));
    }
    return ae(() => {
      le(() => t.active, (d) => {
        d && i.value ? s().activate() : n && (n.deactivate(), (!i.value || i.value.nodeType === Node.COMMENT_NODE) && (n = null));
      }, { immediate: !0, flush: "post" });
    }), me(() => {
      n && n.deactivate(), n = null;
    }), {
      activate() {
        s().activate();
      },
      deactivate() {
        n && n.deactivate();
      },
      renderImpl() {
        if (!e.default)
          return null;
        const d = e.default().filter((f) => f.type !== jt);
        return !d || !d.length || d.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), d) : Ot(d[0], { ref: l });
      }
    };
  }
}), di = ["aria-labelledby", "role", "open"], ui = { class: "fr-container fr-container--fluid fr-container-md" }, ci = { class: "fr-grid-row fr-grid-row--center" }, fi = { class: "fr-modal__body" }, vi = { class: "fr-modal__header" }, pi = ["title"], hi = { class: "fr-modal__content" }, mi = ["id"], gi = {
  key: 0,
  class: "fr-modal__footer"
}, lt = 2, bi = /* @__PURE__ */ z({
  __name: "DsfrModal",
  props: {
    modalId: { default: () => q("modal", "dialog") },
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
  setup(t, { emit: e }) {
    const a = t, n = e, l = (y) => {
      y.key === "Escape" && p();
    }, i = b(() => a.isAlert ? "alertdialog" : "dialog"), s = R(null), d = R();
    le(() => a.opened, (y) => {
      var S, g;
      y ? ((S = d.value) == null || S.showModal(), setTimeout(() => {
        var x;
        (x = s.value) == null || x.focus();
      }, 100)) : (g = d.value) == null || g.close(), f(y);
    });
    function f(y) {
      typeof window < "u" && document.body.classList.toggle("modal-open", y);
    }
    ae(() => {
      u(), f(a.opened);
    }), Wt(() => {
      v(), f(!1);
    });
    function u() {
      document.addEventListener("keydown", l);
    }
    function v() {
      document.removeEventListener("keydown", l);
    }
    async function p() {
      var y;
      await $t(), (y = a.origin) == null || y.focus(), n("close");
    }
    const _ = b(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), D = b(
      () => _.value ? void 0 : typeof a.icon == "string" ? { name: a.icon, scale: lt } : { scale: lt, ...a.icon ?? {} }
    );
    return (y, S) => y.opened ? (r(), M(X(si), { key: 0 }, {
      default: F(() => {
        var g, x;
        return [
          o("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: d,
            "aria-labelledby": y.modalId,
            role: i.value,
            class: L(["fr-modal", { "fr-modal--opened": y.opened }]),
            open: y.opened
          }, [
            o("div", ui, [
              o("div", ci, [
                o("div", {
                  class: L(["fr-col-12", {
                    "fr-col-md-8": y.size === "lg",
                    "fr-col-md-6": y.size === "md",
                    "fr-col-md-4": y.size === "sm"
                  }])
                }, [
                  o("div", fi, [
                    o("div", vi, [
                      o("button", {
                        ref_key: "closeBtn",
                        ref: s,
                        class: "fr-btn fr-btn--close",
                        title: y.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: S[0] || (S[0] = (H) => p())
                      }, [
                        o("span", null, h(y.closeButtonLabel), 1)
                      ], 8, pi)
                    ]),
                    o("div", hi, [
                      o("h1", {
                        id: y.modalId,
                        class: "fr-modal__title"
                      }, [
                        _.value || D.value ? (r(), c("span", {
                          key: 0,
                          class: L({
                            [String(y.icon)]: _.value
                          })
                        }, [
                          y.icon && D.value ? (r(), M(X(ie), re(E({ key: 0 }, D.value)), null, 16)) : m("", !0)
                        ], 2)) : m("", !0),
                        I(" " + h(y.title), 1)
                      ], 8, mi),
                      C(y.$slots, "default", {}, void 0, !0)
                    ]),
                    (g = y.actions) != null && g.length || y.$slots.footer ? (r(), c("div", gi, [
                      C(y.$slots, "footer", {}, void 0, !0),
                      (x = y.actions) != null && x.length ? (r(), M(Me, {
                        key: 0,
                        align: "right",
                        buttons: y.actions,
                        "inline-layout-when": "large",
                        reverse: ""
                      }, null, 8, ["buttons"])) : m("", !0)
                    ])) : m("", !0)
                  ])
                ], 2)
              ])
            ])
          ], 10, di)
        ];
      }),
      _: 3
    })) : m("", !0);
  }
}), yi = /* @__PURE__ */ ne(bi, [["__scopeId", "data-v-43ec81d5"]]), ki = ["id", "aria-current"], wi = /* @__PURE__ */ z({
  __name: "DsfrNavigationItem",
  props: {
    id: { default: () => q("nav", "item") },
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (r(), c("li", {
      id: e.id,
      class: "fr-nav__item",
      "aria-current": e.active ? "page" : void 0
    }, [
      C(e.$slots, "default", {}, void 0, !0)
    ], 8, ki));
  }
}), _t = /* @__PURE__ */ ne(wi, [["__scopeId", "data-v-5909c19f"]]), _i = ["href"], nt = 2, Ie = /* @__PURE__ */ z({
  __name: "DsfrNavigationMenuLink",
  props: {
    id: { default: () => q("menu-link") },
    to: { default: "#" },
    text: { default: "" },
    icon: { default: void 0 },
    onClick: { type: Function, default: () => {
    } }
  },
  emits: ["toggleId"],
  setup(t) {
    const e = t, a = b(() => typeof e.to == "string" && e.to.startsWith("http")), n = b(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), l = b(
      () => n.value || !e.icon ? void 0 : typeof e.icon == "string" ? { scale: nt, name: e.icon } : { scale: nt, ...e.icon || {} }
    );
    return (i, s) => {
      const d = J("RouterLink");
      return a.value ? (r(), c("a", {
        key: 0,
        class: "fr-nav__link",
        "data-testid": "nav-external-link",
        href: i.to,
        onClick: s[0] || (s[0] = (f) => i.$emit("toggleId", i.id))
      }, h(i.text), 9, _i)) : (r(), M(d, {
        key: 1,
        class: L(["fr-nav__link", {
          [String(i.icon)]: n.value
        }]),
        "data-testid": "nav-router-link",
        to: i.to,
        onClick: s[1] || (s[1] = (f) => i.$emit("toggleId", i.id))
      }, {
        default: F(() => [
          i.icon && l.value ? (r(), M(X(ie), re(E({ key: 0 }, l.value)), null, 16)) : m("", !0),
          I(" " + h(i.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), xi = ["id", "aria-current"], xt = /* @__PURE__ */ z({
  __name: "DsfrNavigationMenuItem",
  props: {
    id: { default: () => q("menu", "item") },
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (r(), c("li", {
      id: e.id,
      class: "fr-menu__item",
      "aria-current": e.active ? "page" : void 0
    }, [
      C(e.$slots, "default")
    ], 8, xi));
  }
}), zi = ["aria-expanded", "aria-current", "aria-controls"], Di = ["id"], Ci = { class: "fr-menu__list" }, zt = /* @__PURE__ */ z({
  __name: "DsfrNavigationMenu",
  props: {
    id: { default: () => q("menu") },
    title: {},
    links: { default: () => [] },
    expandedId: { default: "" },
    active: { type: Boolean }
  },
  emits: ["toggleId"],
  setup(t) {
    const e = t, {
      collapse: a,
      collapsing: n,
      cssExpanded: l,
      doExpand: i,
      onTransitionEnd: s
    } = ue(), d = b(() => e.id === e.expandedId);
    return le(d, (f, u) => {
      f !== u && i(f);
    }), ae(() => {
      d.value && i(!0);
    }), (f, u) => (r(), c(T, null, [
      o("button", {
        class: "fr-nav__btn",
        "aria-expanded": d.value,
        "aria-current": f.active || void 0,
        "aria-controls": f.id,
        onClick: u[0] || (u[0] = (v) => f.$emit("toggleId", f.id))
      }, [
        o("span", null, h(f.title), 1)
      ], 8, zi),
      o("div", {
        id: f.id,
        ref_key: "collapse",
        ref: a,
        class: L(["fr-collapse fr-menu", { "fr-collapse--expanded": X(l), "fr-collapsing": X(n) }]),
        "data-testid": "navigation-menu",
        onTransitionend: u[2] || (u[2] = (v) => X(s)(d.value))
      }, [
        o("ul", Ci, [
          C(f.$slots, "default"),
          (r(!0), c(T, null, N(f.links, (v, p) => (r(), M(xt, { key: p }, {
            default: F(() => [
              O(Ie, E({ ref_for: !0 }, v, {
                onToggleId: u[1] || (u[1] = (_) => f.$emit("toggleId", f.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, Di)
    ], 64));
  }
}), Mi = { class: "fr-col-12 fr-col-lg-3" }, Li = { class: "fr-mega-menu__category" }, Ii = { class: "fr-mega-menu__list" }, Dt = /* @__PURE__ */ z({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(t) {
    return (e, a) => (r(), c("div", Mi, [
      o("h5", Li, [
        o("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: a[0] || (a[0] = W(() => {
          }, ["prevent"]))
        }, h(e.title), 1)
      ]),
      o("ul", Ii, [
        (r(!0), c(T, null, N(e.links, (n, l) => (r(), c("li", {
          key: l,
          class: "fr-nav__link"
        }, [
          O(Ie, E({ ref_for: !0 }, n), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), Si = ["aria-expanded", "aria-current", "aria-controls"], Bi = ["id"], Ai = { class: "fr-container fr-container--fluid fr-container-lg" }, Ti = { class: "fr-grid-row fr-grid-row-lg--gutters" }, Hi = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, Vi = { class: "fr-mega-menu__leader" }, Ei = { class: "fr-h4 fr-mb-2v" }, Fi = { class: "fr-hidden fr-displayed-lg" }, Ri = /* @__PURE__ */ z({
  __name: "DsfrNavigationMegaMenu",
  props: {
    id: { default: () => q("menu") },
    title: {},
    description: { default: "" },
    link: { default: () => ({ to: "#", text: "Voir toute la rubrique" }) },
    menus: { default: () => [] },
    expandedId: { default: "" },
    active: { type: Boolean }
  },
  emits: ["toggleId"],
  setup(t) {
    const e = t, {
      collapse: a,
      collapsing: n,
      cssExpanded: l,
      doExpand: i,
      onTransitionEnd: s
    } = ue(), d = b(() => e.id === e.expandedId);
    return le(d, (f, u) => {
      f !== u && i(f);
    }), ae(() => {
      d.value && i(!0);
    }), (f, u) => {
      const v = J("RouterLink");
      return r(), c(T, null, [
        o("button", {
          class: "fr-nav__btn",
          "aria-expanded": d.value,
          "aria-current": f.active || void 0,
          "aria-controls": f.id,
          onClick: u[0] || (u[0] = (p) => f.$emit("toggleId", f.id))
        }, h(f.title), 9, Si),
        o("div", {
          id: f.id,
          ref_key: "collapse",
          ref: a,
          "data-testid": "mega-menu-wrapper",
          class: L(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": X(l),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": X(n)
          }]),
          tabindex: "-1",
          onTransitionend: u[2] || (u[2] = (p) => X(s)(d.value))
        }, [
          o("div", Ai, [
            o("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: u[1] || (u[1] = (p) => f.$emit("toggleId", f.id))
            }, " Fermer "),
            o("div", Ti, [
              o("div", Hi, [
                o("div", Vi, [
                  o("h4", Ei, h(f.title), 1),
                  o("p", Fi, [
                    I(h(f.description) + " ", 1),
                    C(f.$slots, "description", {}, void 0, !0)
                  ]),
                  O(v, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: f.link.to
                  }, {
                    default: F(() => [
                      I(h(f.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              C(f.$slots, "default", {}, void 0, !0),
              (r(!0), c(T, null, N(f.menus, (p, _) => (r(), M(Dt, E({
                key: _,
                ref_for: !0
              }, p), null, 16))), 128))
            ])
          ])
        ], 42, Bi)
      ], 64);
    };
  }
}), Ct = /* @__PURE__ */ ne(Ri, [["__scopeId", "data-v-020a2672"]]), Pi = ["id", "aria-label"], Ni = { class: "fr-nav__list" }, Xi = /* @__PURE__ */ z({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => q("menu") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(t) {
    const e = t, a = R(void 0), n = (d) => {
      if (d === a.value) {
        a.value = void 0;
        return;
      }
      a.value = d;
    }, l = (d) => {
      if (d !== document.getElementById(e.id)) {
        if (!(d != null && d.parentNode)) {
          n(a.value);
          return;
        }
        l(d.parentNode);
      }
    }, i = (d) => {
      l(d.target);
    }, s = (d) => {
      d.key === "Escape" && n(a.value);
    };
    return ae(() => {
      document.addEventListener("click", i), document.addEventListener("keydown", s);
    }), me(() => {
      document.removeEventListener("click", i), document.removeEventListener("keydown", s);
    }), (d, f) => (r(), c("nav", {
      id: d.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": d.label
    }, [
      o("ul", Ni, [
        C(d.$slots, "default"),
        (r(!0), c(T, null, N(d.navItems, (u, v) => (r(), M(_t, { key: v }, {
          default: F(() => [
            u.to && u.text ? (r(), M(Ie, E({
              key: 0,
              ref_for: !0
            }, u, {
              "expanded-id": a.value,
              onToggleId: f[0] || (f[0] = (p) => n(p))
            }), null, 16, ["expanded-id"])) : u.title && u.links ? (r(), M(zt, E({
              key: 1,
              ref_for: !0
            }, u, {
              "expanded-id": a.value,
              onToggleId: f[1] || (f[1] = (p) => n(p))
            }), null, 16, ["expanded-id"])) : u.title && u.menus ? (r(), M(Ct, E({
              key: 2,
              ref_for: !0
            }, u, {
              "expanded-id": a.value,
              onToggleId: f[2] || (f[2] = (p) => n(p))
            }), null, 16, ["expanded-id"])) : m("", !0)
          ]),
          _: 2
        }, 1024))), 128))
      ])
    ], 8, Pi));
  }
}), Yi = { class: "fr-notice fr-notice--info" }, ji = { class: "fr-container" }, Oi = { class: "fr-notice__body" }, qi = { class: "fr-notice__title" }, Qi = /* @__PURE__ */ z({
  __name: "DsfrNotice",
  props: {
    title: { default: "" },
    closeable: { type: Boolean }
  },
  emits: ["close"],
  setup(t) {
    return (e, a) => (r(), c("div", Yi, [
      o("div", ji, [
        o("div", Oi, [
          o("p", qi, [
            C(e.$slots, "default", {}, () => [
              I(h(e.title), 1)
            ])
          ]),
          e.closeable ? (r(), c("button", {
            key: 0,
            class: "fr-btn--close fr-btn",
            title: "Masquer le message",
            onClick: a[0] || (a[0] = (n) => e.$emit("close"))
          }, " Masquer le message ")) : m("", !0)
        ])
      ])
    ]));
  }
}), Gi = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, Ki = { class: "fr-pagination__list" }, Wi = ["href", "title", "disabled", "aria-disabled"], Ui = ["href", "title", "disabled", "aria-disabled"], Zi = ["href", "title", "aria-current", "onClick"], $i = { key: 0 }, Ji = { key: 1 }, eo = ["href", "title", "disabled", "aria-disabled"], to = ["href", "title", "disabled", "aria-disabled"], ao = /* @__PURE__ */ z({
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
  emits: ["update:currentPage"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = b(() => Math.min(a.pages.length - 1 - a.truncLimit, Math.max(a.currentPage - (a.truncLimit - a.truncLimit % 2) / 2, 0))), i = b(() => Math.min(a.pages.length - 1, l.value + a.truncLimit)), s = b(() => a.pages.length > a.truncLimit ? a.pages.slice(l.value, i.value + 1) : a.pages), d = (y) => n("update:currentPage", y), f = (y) => d(y), u = () => f(0), v = () => f(Math.max(0, a.currentPage - 1)), p = () => f(Math.min(a.pages.length - 1, a.currentPage + 1)), _ = () => f(a.pages.length - 1), D = (y) => a.pages.indexOf(y) === a.currentPage;
    return (y, S) => {
      var g, x, H, B;
      return r(), c("nav", Gi, [
        o("ul", Ki, [
          o("li", null, [
            o("a", {
              href: (g = y.pages[0]) == null ? void 0 : g.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: y.firstPageTitle,
              disabled: y.currentPage === 0 ? !0 : void 0,
              "aria-disabled": y.currentPage === 0 ? !0 : void 0,
              onClick: S[0] || (S[0] = W((V) => u(), ["prevent"]))
            }, null, 8, Wi)
          ]),
          o("li", null, [
            o("a", {
              href: (x = y.pages[Math.max(y.currentPage - 1, 0)]) == null ? void 0 : x.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: y.prevPageTitle,
              disabled: y.currentPage === 0 ? !0 : void 0,
              "aria-disabled": y.currentPage === 0 ? !0 : void 0,
              onClick: S[1] || (S[1] = W((V) => v(), ["prevent"]))
            }, h(y.prevPageTitle), 9, Ui)
          ]),
          (r(!0), c(T, null, N(s.value, (V, Y) => (r(), c("li", { key: Y }, [
            o("a", {
              href: V == null ? void 0 : V.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: V.title,
              "aria-current": D(V) ? "page" : void 0,
              onClick: W((P) => f(y.pages.indexOf(V)), ["prevent"])
            }, [
              s.value.indexOf(V) === 0 && l.value > 0 ? (r(), c("span", $i, "...")) : m("", !0),
              I(" " + h(V.label) + " ", 1),
              s.value.indexOf(V) === s.value.length - 1 && i.value < y.pages.length - 1 ? (r(), c("span", Ji, "...")) : m("", !0)
            ], 8, Zi)
          ]))), 128)),
          o("li", null, [
            o("a", {
              href: (H = y.pages[Math.min(y.currentPage + 1, y.pages.length - 1)]) == null ? void 0 : H.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: y.nextPageTitle,
              disabled: y.currentPage === y.pages.length - 1 ? !0 : void 0,
              "aria-disabled": y.currentPage === y.pages.length - 1 ? !0 : void 0,
              onClick: S[2] || (S[2] = W((V) => p(), ["prevent"]))
            }, h(y.nextPageTitle), 9, eo)
          ]),
          o("li", null, [
            o("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (B = y.pages[y.pages.length - 1]) == null ? void 0 : B.href,
              title: y.lastPageTitle,
              disabled: y.currentPage === y.pages.length - 1 ? !0 : null,
              "aria-disabled": y.currentPage === y.pages.length - 1 ? !0 : void 0,
              onClick: S[3] || (S[3] = W((V) => _(), ["prevent"]))
            }, null, 8, to)
          ])
        ])
      ]);
    };
  }
}), lo = /* @__PURE__ */ ne(ao, [["__scopeId", "data-v-da6fd85b"]]), no = ["aria-label"], ro = { class: "fr-content-media__img" }, io = ["src", "alt", "title", "ratio"], oo = { class: "fr-content-media__caption" }, so = /* @__PURE__ */ z({
  __name: "DsfrPicture",
  props: {
    alt: { default: "" },
    legend: { default: "" },
    size: { default: "medium" },
    src: {},
    title: { default: "" },
    ratio: { default: "16x9" }
  },
  setup(t) {
    return (e, a) => (r(), c("figure", {
      class: L(["fr-content-media", {
        "fr-content-media--sm": e.size === "small",
        "fr-content-media--lg": e.size === "large"
      }]),
      role: "group",
      "aria-label": e.legend
    }, [
      o("div", ro, [
        C(e.$slots, "default", {}, () => [
          e.src ? (r(), c("img", {
            key: 0,
            src: e.src,
            class: L(["fr-responsive-img", `fr-ratio-${e.ratio}`]),
            alt: e.alt,
            title: e.title,
            ratio: e.ratio
          }, null, 10, io)) : m("", !0)
        ])
      ]),
      o("figcaption", oo, h(e.legend), 1)
    ], 10, no));
  }
}), uo = { class: "fr-quote fr-quote--column" }, co = ["cite"], fo = { class: "fr-quote__author" }, vo = { class: "fr-quote__source" }, po = ["href"], ho = {
  key: 0,
  class: "fr-quote__image"
}, mo = ["src"], go = /* @__PURE__ */ z({
  __name: "DsfrQuote",
  props: {
    quote: { default: void 0 },
    author: { default: void 0 },
    details: { default: () => [] },
    source: { default: "" },
    sourceUrl: { default: "" },
    quoteImage: { default: "" }
  },
  setup(t) {
    return (e, a) => (r(), c("figure", uo, [
      e.source ? (r(), c("blockquote", {
        key: 0,
        cite: e.sourceUrl
      }, [
        o("p", null, "« " + h(e.quote) + " »", 1)
      ], 8, co)) : m("", !0),
      o("figcaption", null, [
        o("p", fo, h(e.author), 1),
        o("ul", vo, [
          o("li", null, [
            o("cite", null, h(e.source), 1)
          ]),
          (r(!0), c(T, null, N(e.details, (n, l) => (r(), c("li", { key: l }, [
            typeof n == "object" ? (r(), c("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.url
            }, h(n.label), 9, po)) : m("", !0),
            I(" " + h(typeof n != "object" ? n : ""), 1)
          ]))), 128))
        ]),
        e.quoteImage ? (r(), c("div", ho, [
          o("img", {
            src: e.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, mo)
        ])) : m("", !0)
      ])
    ]));
  }
}), bo = ["id", "name", "value", "checked", "disabled"], yo = ["for"], ko = {
  key: 0,
  class: "required"
}, wo = {
  key: 0,
  class: "fr-hint-text"
}, _o = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, xo = ["src"], zo = ["href"], Do = ["href"], Co = ["href"], Mt = /* @__PURE__ */ z({
  __name: "DsfrRadioButton",
  props: {
    id: { default: () => q("basic", "radio") },
    name: {},
    modelValue: { type: [String, Number, Boolean], default: "" },
    disabled: { type: Boolean },
    small: { type: Boolean },
    inline: { type: Boolean },
    value: { type: [String, Number, Boolean] },
    label: { default: "" },
    hint: { default: "" },
    img: { default: void 0 },
    svgPath: { default: void 0 },
    svgAttrs: { default: () => ({ viewBox: "0 0 80 80", width: "80px", height: "80px" }) }
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, a = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = b(() => !!e.img || !!e.svgPath);
    return (l, i) => (r(), c("div", {
      class: L(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      o("div", {
        class: L(["fr-radio-group", {
          "fr-radio-rich": n.value,
          "fr-radio-group--sm": l.small
        }])
      }, [
        o("input", E({
          id: l.id,
          type: "radio",
          name: l.name,
          value: l.value,
          checked: l.modelValue === l.value,
          disabled: l.disabled
        }, l.$attrs, {
          onClick: i[0] || (i[0] = (s) => l.$emit("update:modelValue", l.value))
        }), null, 16, bo),
        o("label", {
          for: l.id,
          class: "fr-label"
        }, [
          C(l.$slots, "label", {}, () => [
            I(h(l.label) + " ", 1),
            C(l.$slots, "required-tip", {}, () => [
              l.$attrs.required ? (r(), c("span", ko, " *")) : m("", !0)
            ])
          ]),
          l.hint ? (r(), c("span", wo, h(l.hint), 1)) : m("", !0)
        ], 8, yo),
        l.img || l.svgPath ? (r(), c("div", _o, [
          l.img ? (r(), c("img", {
            key: 0,
            src: l.img,
            class: "fr-artwork",
            alt: ""
          }, null, 8, xo)) : (r(), c("svg", E({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...a, ...l.svgAttrs }), [
            o("use", {
              class: "fr-artwork-decorative",
              href: `${l.svgPath}#artwork-decorative`
            }, null, 8, zo),
            o("use", {
              class: "fr-artwork-minor",
              href: `${l.svgPath}#artwork-minor`
            }, null, 8, Do),
            o("use", {
              class: "fr-artwork-major",
              href: `${l.svgPath}#artwork-major`
            }, null, 8, Co)
          ], 16))
        ])) : m("", !0)
      ], 2)
    ], 2));
  }
}), Mo = { class: "fr-form-group" }, Lo = ["disabled", "aria-labelledby", "aria-invalid", "role"], Io = ["id"], So = {
  key: 0,
  class: "required"
}, Bo = ["id"], Ao = { class: "line-1" }, To = /* @__PURE__ */ z({
  __name: "DsfrRadioButtonSet",
  props: {
    titleId: { default: () => q("radio-button", "group") },
    disabled: { type: Boolean },
    required: { type: Boolean },
    small: { type: Boolean },
    inline: { type: Boolean },
    name: {},
    errorMessage: { default: "" },
    validMessage: { default: "" },
    legend: { default: "" },
    modelValue: { type: [String, Number, Boolean] },
    options: { default: () => [] },
    ariaInvalid: { type: [Boolean, String] }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = b(() => a.errorMessage || a.validMessage), i = b(() => a.errorMessage ? "fr-error-text" : "fr-valid-text"), s = (f) => {
      f !== a.modelValue && n("update:modelValue", f);
    }, d = b(() => l.value ? `${a.titleId} messages-${a.titleId}` : a.titleId);
    return (f, u) => (r(), c("div", Mo, [
      o("fieldset", {
        class: L(["fr-fieldset", {
          "fr-fieldset--error": f.errorMessage,
          "fr-fieldset--valid": f.validMessage
        }]),
        disabled: f.disabled,
        "aria-labelledby": d.value,
        "aria-invalid": f.ariaInvalid,
        role: f.errorMessage || f.validMessage ? "group" : void 0
      }, [
        f.legend || f.$slots.legend ? (r(), c("legend", {
          key: 0,
          id: f.titleId,
          class: "fr-fieldset__legend fr-fieldset__legend--regular"
        }, [
          C(f.$slots, "legend", {}, () => [
            I(h(f.legend) + " ", 1),
            C(f.$slots, "required-tip", {}, () => [
              f.required ? (r(), c("span", So, " *")) : m("", !0)
            ])
          ])
        ], 8, Io)) : m("", !0),
        C(f.$slots, "default", {}, () => [
          (r(!0), c(T, null, N(f.options, (v, p) => (r(), M(Mt, E({
            key: typeof v.value == "boolean" ? p : v.value || p,
            name: f.name,
            "aria-disabled": v.disabled,
            ref_for: !0
          }, v, {
            small: f.small,
            inline: f.inline,
            "model-value": f.modelValue,
            "onUpdate:modelValue": u[0] || (u[0] = (_) => s(_))
          }), null, 16, ["name", "aria-disabled", "small", "inline", "model-value"]))), 128))
        ]),
        l.value ? (r(), c("div", {
          key: 1,
          id: `messages-${f.titleId}`,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          o("p", {
            class: L(["fr-message--info flex items-center", i.value])
          }, [
            o("span", Ao, h(l.value), 1)
          ], 2)
        ], 8, Bo)) : m("", !0)
      ], 10, Lo)
    ]));
  }
}), Ho = ["id"], Vo = ["id"], Eo = { class: "fr-hint-text" }, Fo = ["data-fr-prefix", "data-fr-suffix"], Ro = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Po = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], No = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Xo = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Yo = ["id"], jo = ["id"], Oo = /* @__PURE__ */ z({
  __name: "DsfrRange",
  props: {
    id: { default: () => q("range") },
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
  setup(t, { emit: e }) {
    const a = t, n = e, l = R(), i = R(), s = R(), d = b(() => a.lowerValue !== void 0), f = b(() => a.lowerValue === void 0 ? `transform: translateX(${(a.modelValue - a.min) / (a.max - a.min) * s.value}px) translateX(-${a.modelValue}%);` : `transform: translateX(${(a.modelValue + a.lowerValue - a.min) / 2 / (a.max - a.min) * s.value}px) translateX(-${a.lowerValue + (a.modelValue - a.lowerValue) / 2}%);`), u = b(() => {
      const p = (a.modelValue - a.min) / (a.max - a.min) * s.value - (d.value ? 12 : 0), _ = ((a.lowerValue ?? 0) - a.min) / (a.max - a.min) * s.value;
      return {
        "--progress-right": `${p + 24}px`,
        ...d.value ? { "--progress-left": `${_ + 12}px` } : {}
      };
    });
    le([() => a.modelValue, () => a.lowerValue], ([p, _]) => {
      _ !== void 0 && (d.value && p < _ && n("update:lowerValue", p), d.value && _ > p && n("update:modelValue", _));
    });
    const v = b(() => (a.prefix ?? "").concat(d.value ? `${a.lowerValue} - ` : "").concat(`${a.modelValue}`).concat(a.suffix ?? ""));
    return ae(() => {
      var p;
      s.value = (p = l.value) == null ? void 0 : p.offsetWidth;
    }), (p, _) => (r(), c("div", {
      id: `${p.id}-group`,
      class: L(["fr-range-group", { "fr-range-group--error": p.message }])
    }, [
      o("label", {
        id: `${p.id}-label`,
        class: "fr-label"
      }, [
        C(p.$slots, "label", {}, () => [
          I(h(p.label), 1)
        ]),
        o("span", Eo, [
          C(p.$slots, "hint", {}, () => [
            I(h(p.hint), 1)
          ])
        ])
      ], 8, Vo),
      o("div", {
        class: L(["fr-range", {
          "fr-range--sm": p.small,
          "fr-range--double": d.value,
          "fr-range-group--disabled": p.disabled
        }]),
        "data-fr-js-range": "true",
        "data-fr-prefix": p.prefix ?? void 0,
        "data-fr-suffix": p.suffix ?? void 0,
        style: de(u.value)
      }, [
        o("span", {
          ref_key: "output",
          ref: i,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: de(f.value)
        }, h(v.value), 5),
        d.value ? (r(), c("input", {
          key: 0,
          id: `${p.id}-2`,
          type: "range",
          min: p.min,
          max: p.max,
          step: p.step,
          value: p.lowerValue,
          disabled: p.disabled,
          "aria-disabled": p.disabled,
          "aria-labelledby": `${p.id}-label`,
          "aria-describedby": `${p.id}-messages`,
          onInput: _[0] || (_[0] = (D) => {
            var y;
            return n("update:lowerValue", +((y = D.target) == null ? void 0 : y.value));
          })
        }, null, 40, Ro)) : m("", !0),
        o("input", {
          id: p.id,
          ref_key: "input",
          ref: l,
          type: "range",
          min: p.min,
          max: p.max,
          step: p.step,
          value: p.modelValue,
          disabled: p.disabled,
          "aria-disabled": p.disabled,
          "aria-labelledby": `${p.id}-label`,
          "aria-describedby": `${p.id}-messages`,
          onInput: _[1] || (_[1] = (D) => {
            var y;
            return n("update:modelValue", +((y = D.target) == null ? void 0 : y.value));
          })
        }, null, 40, Po),
        p.hideIndicators ? m("", !0) : (r(), c("span", No, h(p.min), 1)),
        p.hideIndicators ? m("", !0) : (r(), c("span", Xo, h(p.max), 1))
      ], 14, Fo),
      p.message || p.$slots.messages ? (r(), c("div", {
        key: 0,
        id: `${p.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        C(p.$slots, "messages", {}, () => [
          p.message ? (r(), c("p", {
            key: 0,
            id: `${p.id}-message-error`,
            class: "fr-message fr-message--error"
          }, h(p.message), 9, jo)) : m("", !0)
        ])
      ], 8, Yo)) : m("", !0)
    ], 10, Ho));
  }
}), qo = { class: "fr-segmented__element" }, Qo = ["id", "name", "value", "checked", "disabled", "aria-disabled"], Go = ["for"], Ko = { key: 1 }, Lt = /* @__PURE__ */ z({
  __name: "DsfrSegmented",
  props: {
    id: { default: () => q("basic", "checkbox") },
    name: { default: void 0 },
    modelValue: { default: "" },
    value: {},
    label: { default: "" },
    disabled: { type: Boolean },
    icon: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, a = b(() => typeof e.icon == "string" ? { name: e.icon } : e.icon), n = b(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : "");
    return (l, i) => (r(), c("div", qo, [
      o("input", E({
        id: l.id,
        type: "radio",
        name: l.name,
        value: l.value,
        checked: l.modelValue === l.value,
        disabled: l.disabled,
        "aria-disabled": l.disabled
      }, l.$attrs, {
        onClick: i[0] || (i[0] = (s) => l.$emit("update:modelValue", l.value))
      }), null, 16, Qo),
      o("label", {
        for: l.id,
        class: L(["fr-label", { [n.value]: n.value }])
      }, [
        l.icon && !n.value ? (r(), M(X(ie), re(E({ key: 0 }, a.value)), null, 16)) : m("", !0),
        l.icon ? (r(), c("span", Ko, " ")) : m("", !0),
        I(" " + h(l.label), 1)
      ], 10, Go)
    ]));
  }
}), Wo = { class: "fr-form-group" }, Uo = ["disabled"], Zo = ["id"], $o = {
  key: 0,
  class: "fr-hint-text"
}, Jo = { class: "fr-segmented__elements" }, es = /* @__PURE__ */ z({
  __name: "DsfrSegmentedSet",
  props: {
    titleId: { default: () => q("radio-button", "group") },
    disabled: { type: Boolean },
    small: { type: Boolean },
    inline: { type: Boolean },
    name: { default: "no-name" },
    hint: {},
    legend: { default: "" },
    modelValue: {},
    options: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = (i) => {
      i !== a.modelValue && n("update:modelValue", i);
    };
    return (i, s) => (r(), c("div", Wo, [
      o("fieldset", {
        class: L(["fr-segmented", {
          "fr-segmented--sm": i.small,
          "fr-segmented--no-legend": !i.legend
        }]),
        disabled: i.disabled
      }, [
        i.legend ? (r(), c("legend", {
          key: 0,
          id: i.titleId,
          class: L(["fr-segmented__legend", {
            "fr-segmented__legend--inline": i.inline
          }])
        }, [
          C(i.$slots, "legend", {}, () => [
            I(h(i.legend), 1)
          ]),
          i.hint ? (r(), c("span", $o, h(i.hint), 1)) : m("", !0)
        ], 10, Zo)) : m("", !0),
        o("div", Jo, [
          C(i.$slots, "default", {}, () => [
            (r(!0), c(T, null, N(i.options, (d, f) => (r(), M(Lt, E({
              key: d.value || f,
              name: i.name || d.name,
              ref_for: !0
            }, { ...d, disabled: i.disabled || d.disabled }, {
              "model-value": i.modelValue,
              "onUpdate:modelValue": s[0] || (s[0] = (u) => l(u))
            }), null, 16, ["name", "model-value"]))), 128))
          ])
        ])
      ], 10, Uo)
    ]));
  }
}), ts = ["for"], as = {
  key: 0,
  class: "required"
}, ls = {
  key: 0,
  class: "fr-hint-text"
}, ns = ["id", "name", "disabled", "aria-disabled", "required"], rs = ["selected"], is = ["selected", "value", "disabled", "aria-disabled"], os = ["id"], ss = /* @__PURE__ */ z({
  inheritAttrs: !1,
  __name: "DsfrSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => q("select") },
    name: { default: void 0 },
    description: { default: void 0 },
    modelValue: { default: void 0 },
    label: { default: "" },
    options: { default: () => [] },
    successMessage: { default: "" },
    errorMessage: { default: "" },
    defaultUnselectedText: { default: "Sélectionner une option" }
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, a = b(() => e.errorMessage || e.successMessage), n = b(() => e.errorMessage ? "error" : "valid");
    return (l, i) => (r(), c("div", {
      class: L(["fr-select-group", { [`fr-select-group--${n.value}`]: a.value }])
    }, [
      o("label", {
        class: "fr-label",
        for: l.selectId
      }, [
        C(l.$slots, "label", {}, () => [
          I(h(l.label) + " ", 1),
          C(l.$slots, "required-tip", {}, () => [
            l.required ? (r(), c("span", as, " *")) : m("", !0)
          ])
        ]),
        l.description ? (r(), c("span", ls, h(l.description), 1)) : m("", !0)
      ], 8, ts),
      o("select", E({
        id: l.selectId,
        class: [{ [`fr-select--${n.value}`]: a.value }, "fr-select"],
        name: l.name || l.selectId,
        disabled: l.disabled,
        "aria-disabled": l.disabled,
        required: l.required
      }, l.$attrs, {
        onChange: i[0] || (i[0] = (s) => {
          var d;
          return l.$emit("update:modelValue", (d = s.target) == null ? void 0 : d.value);
        })
      }), [
        o("option", {
          value: "",
          selected: l.modelValue == null,
          disabled: "",
          hidden: ""
        }, h(l.defaultUnselectedText), 9, rs),
        (r(!0), c(T, null, N(l.options, (s, d) => (r(), c("option", {
          key: d,
          selected: l.modelValue === s || typeof s == "object" && s.value === l.modelValue,
          value: typeof s == "object" ? s.value : s,
          disabled: !!(typeof s == "object" && s.disabled),
          "aria-disabled": !!(typeof s == "object" && s.disabled)
        }, h(typeof s == "object" ? s.text : s), 9, is))), 128))
      ], 16, ns),
      a.value ? (r(), c("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: L(`fr-${n.value}-text`)
      }, h(a.value), 11, os)) : m("", !0)
    ], 2));
  }
}), ds = { class: "fr-share" }, us = { class: "fr-share__title" }, cs = { class: "fr-btns-group" }, fs = ["title", "href", "onClick"], vs = { key: 0 }, ps = ["href", "title"], hs = ["title"], ms = /* @__PURE__ */ z({
  __name: "DsfrShare",
  props: {
    title: { default: "Partager la page" },
    copyLabel: { default: "Copier dans le presse-papier" },
    mail: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(t) {
    const e = () => {
      const n = window.location.href;
      navigator.clipboard.writeText(n);
    }, a = ({ url: n, label: l }) => {
      window.open(
        n,
        l,
        "toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450"
      );
    };
    return (n, l) => {
      var i;
      return r(), c("div", ds, [
        o("p", us, h(n.title), 1),
        o("ul", cs, [
          (r(!0), c(T, null, N(n.networks, (s, d) => (r(), c("li", { key: d }, [
            o("a", {
              class: L(`fr-btn fr-btn--${s.name}`),
              title: `${s.label} - nouvelle fenêtre`,
              href: s.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: W((f) => a(s), ["prevent"])
            }, h(s.label), 11, fs)
          ]))), 128)),
          (i = n.mail) != null && i.to ? (r(), c("li", vs, [
            o("a", {
              class: "fr-btn fr-btn--mail",
              href: n.mail.to,
              title: n.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, h(n.mail.label), 9, ps)
          ])) : m("", !0),
          o("li", null, [
            o("button", {
              class: "fr-btn fr-btn--copy",
              title: n.copyLabel,
              onClick: l[0] || (l[0] = (s) => e())
            }, h(n.copyLabel), 9, hs)
          ])
        ])
      ]);
    };
  }
}), It = /* @__PURE__ */ z({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (r(), c("li", {
      class: L(["fr-sidemenu__item", { "fr-sidemenu__item--active": e.active }])
    }, [
      C(e.$slots, "default")
    ], 2));
  }
}), gs = ["aria-current", "aria-expanded", "aria-controls"], St = /* @__PURE__ */ z({
  __name: "DsfrSideMenuButton",
  props: {
    active: { type: Boolean },
    expanded: { type: Boolean },
    controlId: {}
  },
  emits: ["toggleExpand"],
  setup(t) {
    return (e, a) => (r(), c("button", {
      class: "fr-sidemenu__btn",
      "aria-current": e.active ? "page" : void 0,
      "aria-expanded": !!e.expanded,
      "aria-controls": e.controlId,
      onClick: a[0] || (a[0] = (n) => e.$emit("toggleExpand", e.controlId))
    }, [
      C(e.$slots, "default")
    ], 8, gs));
  }
}), bs = ["id"], ys = { class: "fr-sidemenu__list" }, Bt = /* @__PURE__ */ z({
  __name: "DsfrSideMenuList",
  props: {
    id: {},
    collapsable: { type: Boolean },
    expanded: { type: Boolean },
    menuItems: { default: () => [] }
  },
  emits: ["toggleExpand"],
  setup(t) {
    const e = t, {
      collapse: a,
      collapsing: n,
      cssExpanded: l,
      doExpand: i,
      onTransitionEnd: s
    } = ue();
    le(() => e.expanded, (v, p) => {
      v !== p && i(v);
    }), ae(() => {
      e.expanded && i(!0);
    });
    const d = (v) => typeof v == "string" && v.startsWith("http"), f = (v) => d(v) ? "a" : "RouterLink", u = (v) => ({ [d(v) ? "href" : "to"]: v });
    return (v, p) => {
      const _ = J("DsfrSideMenuList", !0);
      return r(), c("div", {
        id: v.id,
        ref_key: "collapse",
        ref: a,
        class: L({
          "fr-collapse": v.collapsable,
          "fr-collapsing": X(n),
          "fr-collapse--expanded": X(l)
        }),
        onTransitionend: p[2] || (p[2] = (D) => X(s)(!!v.expanded))
      }, [
        o("ul", ys, [
          C(v.$slots, "default"),
          (r(!0), c(T, null, N(v.menuItems, (D, y) => (r(), M(It, {
            key: y,
            active: D.active
          }, {
            default: F(() => [
              D.menuItems ? m("", !0) : (r(), M($(f(D.to)), E({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": D.active ? "page" : void 0,
                ref_for: !0
              }, u(D.to)), {
                default: F(() => [
                  I(h(D.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              D.menuItems ? (r(), c(T, { key: 1 }, [
                O(St, {
                  active: !!D.active,
                  expanded: !!D.expanded,
                  "control-id": D.id,
                  onToggleExpand: p[0] || (p[0] = (S) => v.$emit("toggleExpand", S))
                }, {
                  default: F(() => [
                    I(h(D.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                D.menuItems ? (r(), M(_, {
                  key: 0,
                  id: D.id,
                  collapsable: "",
                  expanded: D.expanded,
                  "menu-items": D.menuItems,
                  onToggleExpand: p[1] || (p[1] = (S) => v.$emit("toggleExpand", S))
                }, null, 8, ["id", "expanded", "menu-items"])) : m("", !0)
              ], 64)) : m("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, bs);
    };
  }
}), ks = ["aria-labelledby"], ws = { class: "fr-sidemenu__inner" }, _s = ["aria-controls", "aria-expanded"], xs = ["id"], zs = { class: "fr-sidemenu__title" }, Ds = /* @__PURE__ */ z({
  __name: "DsfrSideMenu",
  props: {
    buttonLabel: { default: "Dans cette rubrique" },
    id: { default: () => q("sidemenu") },
    sideMenuListId: { default: () => q("sidemenu", "list") },
    collapseValue: { default: "-492px" },
    menuItems: { default: () => {
    } },
    headingTitle: { default: "" }
  },
  emits: ["toggleExpand"],
  setup(t) {
    const {
      collapse: e,
      collapsing: a,
      cssExpanded: n,
      doExpand: l,
      onTransitionEnd: i
    } = ue(), s = R(!1);
    return le(s, (d, f) => {
      d !== f && l(d);
    }), (d, f) => (r(), c("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": d.id
    }, [
      o("div", ws, [
        o("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": d.id,
          "aria-expanded": s.value,
          onClick: f[0] || (f[0] = W((u) => s.value = !s.value, ["prevent", "stop"]))
        }, h(d.buttonLabel), 9, _s),
        o("div", {
          id: d.id,
          ref_key: "collapse",
          ref: e,
          class: L(["fr-collapse", {
            "fr-collapse--expanded": X(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": X(a)
          }]),
          onTransitionend: f[2] || (f[2] = (u) => X(i)(s.value))
        }, [
          o("div", zs, h(d.headingTitle), 1),
          C(d.$slots, "default", {}, () => [
            O(Bt, {
              id: d.sideMenuListId,
              "menu-items": d.menuItems,
              onToggleExpand: f[1] || (f[1] = (u) => d.$emit("toggleExpand", u))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, xs)
      ])
    ], 8, ks));
  }
}), Cs = /* @__PURE__ */ z({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(t) {
    const e = t, a = b(() => typeof e.to == "string" && e.to.startsWith("http")), n = b(() => a.value ? "a" : "RouterLink"), l = b(() => ({ [a.value ? "href" : "to"]: e.to }));
    return (i, s) => (r(), M($(n.value), E({
      "aria-current": i.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, l.value), {
      default: F(() => [
        C(i.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), Ms = { class: "fr-skiplinks" }, Ls = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, Is = { class: "fr-skiplinks__list" }, Ss = ["href", "onClick"], Bs = /* @__PURE__ */ z({
  __name: "DsfrSkipLinks",
  props: {
    links: {}
  },
  setup(t) {
    const e = (a) => {
      const n = document.getElementById(a);
      n == null || n.focus();
    };
    return (a, n) => (r(), c("div", Ms, [
      o("nav", Ls, [
        o("ul", Is, [
          (r(!0), c(T, null, N(a.links, (l) => (r(), c("li", {
            key: l.id
          }, [
            o("a", {
              class: "fr-link",
              href: `#${l.id}`,
              onClick: W((i) => e(l.id), ["prevent"])
            }, h(l.text), 9, Ss)
          ]))), 128))
        ])
      ])
    ]));
  }
}), As = { class: "fr-stepper" }, Ts = { class: "fr-stepper__title" }, Hs = { class: "fr-stepper__state" }, Vs = ["data-fr-current-step", "data-fr-steps"], Es = { class: "fr-stepper__details" }, Fs = {
  key: 0,
  class: "fr-text--bold"
}, Rs = /* @__PURE__ */ z({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(t) {
    return (e, a) => (r(), c("div", As, [
      o("h2", Ts, [
        I(h(e.steps[e.currentStep - 1]) + " ", 1),
        o("span", Hs, "Étape " + h(e.currentStep) + " sur " + h(e.steps.length), 1)
      ]),
      o("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": e.currentStep,
        "data-fr-steps": e.steps.length
      }, null, 8, Vs),
      o("p", Es, [
        e.currentStep < e.steps.length ? (r(), c("span", Fs, "Étape suivante :")) : m("", !0),
        I(" " + h(e.steps[e.currentStep]), 1)
      ])
    ]));
  }
}), Ps = {
  class: "fr-summary",
  role: "navigation",
  "aria-labelledby": "fr-summary-title"
}, Ns = {
  id: "fr-summary-title",
  class: "fr-summary__title"
}, Xs = { class: "fr-summary__list" }, Ys = ["href"], js = /* @__PURE__ */ z({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (r(), c("nav", Ps, [
      o("h2", Ns, h(e.title), 1),
      o("ol", Xs, [
        (r(!0), c(T, null, N(e.anchors, (n, l) => (r(), c("li", { key: l }, [
          o("a", {
            class: "fr-summary__link",
            href: n.link
          }, h(n.name), 9, Ys)
        ]))), 128))
      ])
    ]));
  }
}), Os = { role: "presentation" }, qs = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], Qs = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, At = /* @__PURE__ */ z({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    selected: { type: Boolean },
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = R(null);
    le(() => a.selected, (d) => {
      var f;
      d && ((f = l.value) == null || f.focus());
    });
    const i = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      ArrowDown: "next",
      ArrowUp: "previous",
      Home: "first",
      End: "last"
    };
    function s(d) {
      const f = d == null ? void 0 : d.key, u = i[f];
      u && n(u);
    }
    return (d, f) => (r(), c("li", Os, [
      o("button", {
        id: d.tabId,
        ref_key: "button",
        ref: l,
        "data-testid": `test-${d.tabId}`,
        class: "fr-tabs__tab",
        tabindex: d.selected ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": d.selected,
        "aria-controls": d.panelId,
        onClick: f[0] || (f[0] = W((u) => d.$emit("click", u), ["prevent"])),
        onKeydown: f[1] || (f[1] = (u) => s(u))
      }, [
        d.icon ? (r(), c("span", Qs, [
          O(X(ie), { name: d.icon }, null, 8, ["name"])
        ])) : m("", !0),
        C(d.$slots, "default")
      ], 40, qs)
    ]));
  }
}), Gs = ["id", "aria-labelledby", "tabindex"], Ks = /* @__PURE__ */ z({
  __name: "DsfrTabContent",
  props: {
    asc: { type: Boolean },
    selected: { type: Boolean },
    panelId: {},
    tabId: {}
  },
  setup(t) {
    Ut((i) => ({
      "71a34239": n.value,
      "6beade6c": l.value
    }));
    const e = t, a = { true: "100%", false: "-100%" }, n = b(() => a[String(e.asc)]), l = b(() => a[String(!e.asc)]);
    return (i, s) => (r(), M(it, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: F(() => [
        Pe(o("div", {
          id: i.panelId,
          class: L(["fr-tabs__panel", {
            "fr-tabs__panel--selected": i.selected
          }]),
          role: "tabpanel",
          "aria-labelledby": i.tabId,
          tabindex: i.selected ? 0 : -1
        }, [
          C(i.$slots, "default", {}, void 0, !0)
        ], 10, Gs), [
          [ot, i.selected]
        ])
      ]),
      _: 3
    }));
  }
}), Tt = /* @__PURE__ */ ne(Ks, [["__scopeId", "data-v-f60b34d7"]]), Ws = ["aria-label"], Us = /* @__PURE__ */ z({
  __name: "DsfrTabs",
  props: {
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] },
    initialSelectedIndex: { default: 0 }
  },
  emits: ["selectTab"],
  setup(t, { expose: e, emit: a }) {
    const n = t, l = a, i = R(n.initialSelectedIndex || 0), s = He({}), d = R(!0), f = R(null), u = R(null), v = R(null), p = (B) => i.value === B, _ = () => {
      var B, V;
      if (i.value < 0 || !v.value || !v.value.offsetHeight)
        return;
      const Y = v.value.offsetHeight, P = (B = u.value) == null ? void 0 : B.querySelectorAll(".fr-tabs__panel")[i.value];
      if (!P || !P.offsetHeight)
        return;
      const U = P.offsetHeight;
      (V = u.value) == null || V.style.setProperty("--tabs-height", `${Y + U}px`);
    }, D = (B) => {
      if (s[B])
        return s[B];
      const V = q("tab");
      return s[B] = V, V;
    }, y = async (B) => {
      d.value = B > i.value, i.value = B, l("selectTab", B);
    }, S = async () => {
      const B = i.value === 0 ? n.tabTitles.length - 1 : i.value - 1;
      await y(B);
    }, g = async () => {
      const B = i.value === n.tabTitles.length - 1 ? 0 : i.value + 1;
      await y(B);
    }, x = async () => {
      await y(0);
    }, H = async () => {
      await y(n.tabTitles.length - 1);
    };
    return ae(() => {
      var B;
      window.ResizeObserver && (f.value = new window.ResizeObserver(() => {
        _();
      })), (B = u.value) == null || B.querySelectorAll(".fr-tabs__panel").forEach((V) => {
        var Y;
        V && ((Y = f.value) == null || Y.observe(V));
      });
    }), me(() => {
      var B;
      (B = u.value) == null || B.querySelectorAll(".fr-tabs__panel").forEach((V) => {
        var Y;
        V && ((Y = f.value) == null || Y.unobserve(V));
      });
    }), e({
      renderTabs: _,
      selectIndex: y,
      selectFirst: x,
      selectLast: H
    }), (B, V) => (r(), c("div", {
      ref_key: "$el",
      ref: u,
      class: "fr-tabs"
    }, [
      o("ul", {
        ref_key: "tablist",
        ref: v,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": B.tabListName
      }, [
        C(B.$slots, "tab-items", {}, () => [
          (r(!0), c(T, null, N(B.tabTitles, (Y, P) => (r(), M(At, {
            key: P,
            icon: Y.icon,
            "panel-id": Y.panelId || `${D(P)}-panel`,
            "tab-id": Y.tabId || D(P),
            selected: p(P),
            onClick: (U) => y(P),
            onNext: V[0] || (V[0] = (U) => g()),
            onPrevious: V[1] || (V[1] = (U) => S()),
            onFirst: V[2] || (V[2] = (U) => x()),
            onLast: V[3] || (V[3] = (U) => H())
          }, {
            default: F(() => [
              I(h(Y.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "selected", "onClick"]))), 128))
        ])
      ], 8, Ws),
      (r(!0), c(T, null, N(B.tabContents, (Y, P) => {
        var U, oe, ee, w;
        return r(), M(Tt, {
          key: P,
          "panel-id": ((oe = (U = B.tabTitles) == null ? void 0 : U[P]) == null ? void 0 : oe.panelId) || `${D(P)}-panel`,
          "tab-id": ((w = (ee = B.tabTitles) == null ? void 0 : ee[P]) == null ? void 0 : w.tabId) || D(P),
          selected: p(P),
          asc: d.value
        }, {
          default: F(() => [
            o("p", null, h(Y), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id", "selected", "asc"]);
      }), 128)),
      C(B.$slots, "default")
    ], 512));
  }
}), Ht = /* @__PURE__ */ z({
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
  setup(t) {
    const e = t, a = b(() => typeof e.field == "object" && e.field !== null && e.field.component ? e.field.component : !1), n = b(() => typeof ["string", "number", "boolean"].includes(typeof e.field));
    return (l, i) => (r(), c("td", re(Ne(l.cellAttrs)), [
      a.value ? (r(), M($(a.value), re(E({ key: 0 }, typeof l.field == "object" ? l.field : {})), {
        default: F(() => [
          I(h(l.field.text), 1)
        ]),
        _: 1
      }, 16)) : (r(), c(T, { key: 1 }, [
        I(h(n.value ? l.field : l.field.text), 1)
      ], 64))
    ], 16));
  }
}), Vt = /* @__PURE__ */ z({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(t) {
    return (e, a) => (r(), c("tr", re(Ne(e.rowAttrs)), [
      C(e.$slots, "default"),
      (r(!0), c(T, null, N(e.rowData, (n, l) => (r(), M(Ht, {
        key: l,
        field: n ?? "",
        "cell-attrs": typeof n == "object" && n !== null && !n.component ? n.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), Et = /* @__PURE__ */ z({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(t) {
    const e = t, a = b(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = b(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, i) => (r(), c("th", E(l.headerAttrs, { scope: "col" }), [
      I(h(l.header) + " ", 1),
      l.icon && !a.value ? (r(), M(X(ie), re(E({ key: 0 }, n.value)), null, 16)) : m("", !0),
      a.value ? (r(), c("span", {
        key: 1,
        class: L({ [String(l.icon)]: a.value })
      }, null, 2)) : m("", !0)
    ], 16));
  }
}), Zs = { key: 0 }, Ft = /* @__PURE__ */ z({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(t) {
    return (e, a) => e.headers ? (r(), c("tr", Zs, [
      (r(!0), c(T, null, N(e.headers, (n, l) => (r(), M(Et, {
        key: l,
        header: (typeof n == "object" ? n : {}).text || n,
        "header-attrs": n.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : m("", !0);
  }
}), $s = (t) => (dt("data-v-d7bee41c"), t = t(), ut(), t), Js = { class: "caption" }, ed = { key: 1 }, td = ["colspan"], ad = { class: "flex justify-right" }, ld = { class: "self-center" }, nd = /* @__PURE__ */ $s(() => /* @__PURE__ */ o("span", null, "Résultats par page : ", -1)), rd = ["value"], id = { class: "flex ml-1" }, od = { class: "self-center" }, sd = { class: "flex ml-1" }, dd = /* @__PURE__ */ z({
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
  setup(t, { emit: e }) {
    const a = t, n = e, l = (g) => Array.isArray(g) ? g : g.rowData, i = R(a.currentPage), s = R(a.resultsDisplayed), d = R(
      a.rows.length > s.value ? Math.ceil(a.rows.length / s.value) : 1
    ), f = [5, 10, 25, 50, 100], u = () => i.value * s.value - s.value, v = () => i.value * s.value;
    le(
      () => s.value,
      (g) => {
        d.value = a.rows.length > s.value ? Math.ceil(a.rows.length / g) : 1;
      }
    );
    const p = b(() => a.pagination ? a.rows.slice(u(), v()) : a.rows), _ = () => {
      i.value = 1, n("update:currentPage");
    }, D = () => {
      i.value > 1 && (i.value -= 1, n("update:currentPage"));
    }, y = () => {
      i.value < d.value && (i.value += 1, n("update:currentPage"));
    }, S = () => {
      i.value = d.value, n("update:currentPage");
    };
    return (g, x) => (r(), c("div", {
      class: L(["fr-table", { "fr-table--no-caption": g.noCaption }])
    }, [
      o("table", null, [
        o("caption", Js, h(g.title), 1),
        o("thead", null, [
          C(g.$slots, "header", {}, () => [
            g.headers && g.headers.length ? (r(), M(Ft, {
              key: 0,
              headers: g.headers
            }, null, 8, ["headers"])) : m("", !0)
          ], !0)
        ]),
        o("tbody", null, [
          C(g.$slots, "default", {}, void 0, !0),
          g.rows && g.rows.length ? (r(!0), c(T, { key: 0 }, N(p.value, (H, B) => (r(), M(Vt, {
            key: g.rowKey && l(H) ? typeof g.rowKey == "string" ? l(H)[g.headers.indexOf(g.rowKey)].toString() : g.rowKey(l(H)) : B,
            "row-data": l(H),
            "row-attrs": "rowAttrs" in H ? H.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : m("", !0),
          g.pagination ? (r(), c("tr", ed, [
            o("td", {
              colspan: g.headers.length
            }, [
              o("div", ad, [
                o("div", ld, [
                  nd,
                  Pe(o("select", {
                    "onUpdate:modelValue": x[0] || (x[0] = (H) => s.value = H),
                    onChange: x[1] || (x[1] = (H) => n("update:currentPage"))
                  }, [
                    (r(), c(T, null, N(f, (H, B) => o("option", {
                      key: B,
                      value: H
                    }, h(H), 9, rd)), 64))
                  ], 544), [
                    [Zt, s.value]
                  ])
                ]),
                o("div", id, [
                  o("span", od, "Page " + h(i.value) + " sur " + h(d.value), 1)
                ]),
                o("div", sd, [
                  o("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: x[2] || (x[2] = (H) => _())
                  }),
                  o("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: x[3] || (x[3] = (H) => D())
                  }),
                  o("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: x[4] || (x[4] = (H) => y())
                  }),
                  o("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: x[5] || (x[5] = (H) => S())
                  })
                ])
              ])
            ], 8, td)
          ])) : m("", !0)
        ])
      ])
    ], 2));
  }
}), ud = /* @__PURE__ */ ne(dd, [["__scopeId", "data-v-d7bee41c"]]), rt = 0.9, cd = /* @__PURE__ */ z({
  __name: "DsfrTag",
  props: {
    label: { default: void 0 },
    link: { default: void 0 },
    tagName: { default: "p" },
    icon: { default: void 0 },
    disabled: { type: Boolean },
    small: { type: Boolean },
    iconOnly: { type: Boolean }
  },
  setup(t) {
    const e = t, a = b(() => typeof e.link == "string" && e.link.startsWith("http")), n = b(() => e.link ? a.value ? "a" : "RouterLink" : e.disabled && e.tagName === "p" ? "button" : e.tagName), l = b(() => ({ [a.value ? "href" : "to"]: e.link })), i = b(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), s = b(() => i.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: rt } : { scale: rt, ...e.icon ?? {} });
    return (d, f) => (r(), M($(n.value), E({
      class: ["fr-tag", {
        "fr-tag--sm": d.small,
        [d.icon]: i.value,
        "fr-tag--icon-left": i.value
      }],
      disabled: d.disabled
    }, l.value), {
      default: F(() => [
        e.icon && !i.value ? (r(), M(X(ie), E({
          key: 0,
          label: d.iconOnly ? d.label : void 0,
          class: "fr-mr-1v"
        }, s.value), null, 16, ["label"])) : m("", !0),
        d.iconOnly ? m("", !0) : (r(), c(T, { key: 1 }, [
          I(h(d.label), 1)
        ], 64)),
        C(d.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class"]));
  }
}), je = /* @__PURE__ */ ne(cd, [["__scopeId", "data-v-a225f0e1"]]), fd = { class: "fr-tags-group" }, vd = /* @__PURE__ */ z({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (r(), c("ul", fd, [
      (r(!0), c(T, null, N(e.tags, ({ icon: n, label: l, ...i }, s) => (r(), c("li", { key: s }, [
        O(je, E({ ref_for: !0 }, i, {
          icon: n,
          label: l
        }), null, 16, ["icon", "label"])
      ]))), 128))
    ]));
  }
}), pd = { class: "fr-tile__body" }, hd = { class: "fr-tile__content" }, md = ["download", "href"], gd = {
  key: 0,
  class: "fr-tile__desc"
}, bd = {
  key: 1,
  class: "fr-tile__detail"
}, yd = {
  key: 2,
  class: "fr-tile__start"
}, kd = { class: "fr-tile__header" }, wd = {
  key: 0,
  class: "fr-tile__pictogram"
}, _d = ["src"], xd = ["href"], zd = ["href"], Dd = ["href"], Cd = /* @__PURE__ */ z({
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
    grey: { type: Boolean }
  },
  setup(t) {
    const e = t, a = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = b(() => typeof e.to == "string" && e.to.startsWith("http"));
    return (l, i) => {
      const s = J("RouterLink");
      return r(), c("div", {
        class: L(["fr-tile fr-enlarge-link", [{
          "fr-tile--disabled": l.disabled,
          "fr-tile--sm": l.small === !0,
          "fr-tile--horizontal": l.horizontal === !0,
          "fr-tile--vertical": l.horizontal === !1 || l.vertical === "md" || l.vertical === "lg",
          "fr-tile--vertical@md": l.vertical === "md",
          "fr-tile--vertical@lg": l.vertical === "lg",
          "fr-tile--download": l.download,
          "fr-tile--no-icon": l.icon === !1,
          "fr-tile--no-border": l.noBorder,
          "fr-tile--no-background": l.noBackground,
          "fr-tile--shadow": l.shadow,
          "fr-tile--grey": l.grey
        }]])
      }, [
        o("div", pd, [
          o("div", hd, [
            (r(), M($(l.titleTag), { class: "fr-tile__title" }, {
              default: F(() => [
                n.value ? (r(), c("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: l.download,
                  href: l.disabled ? "" : l.to
                }, h(l.title), 9, md)) : m("", !0),
                n.value ? m("", !0) : (r(), M(s, {
                  key: 1,
                  download: l.download,
                  class: "fr-tile__link",
                  to: l.disabled ? "" : l.to
                }, {
                  default: F(() => [
                    I(h(l.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            l.description ? (r(), c("p", gd, h(l.description), 1)) : m("", !0),
            l.details ? (r(), c("p", bd, h(l.details), 1)) : m("", !0),
            l.$slots["start-details"] ? (r(), c("div", yd, [
              C(l.$slots, "start-details", {}, void 0, !0)
            ])) : m("", !0)
          ])
        ]),
        o("div", kd, [
          C(l.$slots, "header", {}, void 0, !0),
          l.imgSrc || l.svgPath ? (r(), c("div", wd, [
            l.imgSrc ? (r(), c("img", {
              key: 0,
              src: l.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, _d)) : (r(), c("svg", E({
              key: 1,
              "aria-hidden": "true",
              class: "fr-artwork"
            }, { ...a, ...l.svgAttrs }), [
              o("use", {
                class: "fr-artwork-decorative",
                href: `${l.svgPath}#artwork-decorative`
              }, null, 8, xd),
              o("use", {
                class: "fr-artwork-minor",
                href: `${l.svgPath}#artwork-minor`
              }, null, 8, zd),
              o("use", {
                class: "fr-artwork-major",
                href: `${l.svgPath}#artwork-major`
              }, null, 8, Dd)
            ], 16))
          ])) : m("", !0)
        ])
      ], 2);
    };
  }
}), Rt = /* @__PURE__ */ ne(Cd, [["__scopeId", "data-v-4653a118"]]), Md = { class: "fr-grid-row fr-grid-row--gutters" }, Ld = /* @__PURE__ */ z({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (r(), c("div", Md, [
      (r(!0), c(T, null, N(e.tiles, (n, l) => (r(), c("div", {
        key: l,
        class: L({
          [n.containerClass]: n.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !n.containerClass && !e.horizontal,
          "fr-col-12": e.horizontal
        })
      }, [
        O(Rt, E({
          horizontal: e.horizontal,
          ref_for: !0
        }, n), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), Id = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby"], Sd = ["id", "for"], Bd = ["id"], Ad = /* @__PURE__ */ z({
  __name: "DsfrToggleSwitch",
  props: {
    modelValue: { type: Boolean },
    inputId: { default: () => q("toggle") },
    hint: { default: "" },
    label: { default: "" },
    disabled: { type: Boolean },
    labelLeft: { type: Boolean, default: !1 },
    borderBottom: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, a = b(() => `${e.inputId}-hint-text`);
    return (n, l) => (r(), c("div", {
      class: L(["fr-toggle", {
        "fr-toggle--label-left": n.labelLeft,
        "fr-toggle--border-bottom": n.borderBottom
      }])
    }, [
      o("input", {
        id: n.inputId,
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        type: "checkbox",
        checked: n.modelValue,
        "data-testid": n.inputId,
        class: "fr-toggle__input",
        "aria-describedby": a.value,
        onInput: l[0] || (l[0] = (i) => n.$emit("update:modelValue", i.target.checked))
      }, null, 40, Id),
      o("label", {
        id: a.value,
        class: "fr-toggle__label",
        for: n.inputId,
        "data-fr-checked-label": "Activé",
        "data-fr-unchecked-label": "Désactivé",
        style: { "--toggle-status-width": "3.55208125rem" }
      }, h(n.label), 9, Sd),
      n.hint ? (r(), c("p", {
        key: 0,
        id: `${n.inputId}-hint-text`,
        class: "fr-hint-text"
      }, h(n.hint), 9, Bd)) : m("", !0)
    ], 2));
  }
}), Td = ["id"], Hd = /* @__PURE__ */ z({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => q("tooltip") }
  },
  setup(t) {
    const e = t, a = R(!1), n = R(null), l = R(null), i = R("0px"), s = R("0px"), d = R("0px"), f = R(!1), u = R(0);
    async function v() {
      var x, H, B, V, Y, P;
      if (typeof document > "u" || !a.value)
        return;
      await new Promise((K) => setTimeout(K, 100));
      const U = (x = n.value) == null ? void 0 : x.getBoundingClientRect().top, oe = (H = n.value) == null ? void 0 : H.offsetHeight, ee = (B = n.value) == null ? void 0 : B.offsetWidth, w = (V = n.value) == null ? void 0 : V.getBoundingClientRect().left, k = (Y = l.value) == null ? void 0 : Y.offsetHeight, A = (P = l.value) == null ? void 0 : P.offsetWidth, Q = !(U - k < 0) && U + oe + k >= document.documentElement.offsetHeight;
      f.value = Q;
      const j = w + ee >= document.documentElement.offsetWidth, G = w + ee / 2 - A / 2 <= 0;
      s.value = Q ? `${U - k + 8}px` : `${U + oe - 8}px`, u.value = 1, i.value = j ? `${w + ee - A - 4}px` : G ? `${w + 4}px` : `${w + ee / 2 - A / 2}px`, d.value = j ? `${A / 2 - ee / 2 + 4}px` : G ? `${-(A / 2) + ee / 2 - 4}px` : "0px";
    }
    le(a, v, { immediate: !0 }), ae(() => {
      window.addEventListener("scroll", v);
    }), me(() => {
      window.removeEventListener("scroll", v);
    });
    const p = b(() => `transform: translate(${i.value}, ${s.value}); --arrow-x: ${d.value}; opacity: ${u.value};'`), _ = b(() => ({
      "fr-tooltip--shown": a.value,
      "fr-placement--top": f.value,
      "fr-placement--bottom": !f.value
    })), D = (x) => {
      var H, B;
      a.value && (x.target === n.value || (H = n.value) != null && H.contains(x.target) || x.target === l.value || (B = l.value) != null && B.contains(x.target) || (a.value = !1));
    };
    ae(() => {
      document.documentElement.addEventListener("click", D);
    }), me(() => {
      document.documentElement.removeEventListener("click", D);
    });
    const y = () => {
      e.onHover && (a.value = !0);
    }, S = () => {
      e.onHover && (a.value = !1);
    }, g = () => {
      e.onHover || (a.value = !a.value);
    };
    return (x, H) => (r(), c(T, null, [
      (r(), M($(x.onHover ? "a" : "button"), {
        id: `link-${x.id}`,
        ref_key: "source",
        ref: n,
        class: L(x.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip"),
        "aria-describedby": x.id,
        href: x.onHover ? "#" : void 0,
        onClick: H[0] || (H[0] = (B) => g()),
        onMouseenter: H[1] || (H[1] = (B) => y()),
        onMouseleave: H[2] || (H[2] = (B) => S())
      }, {
        default: F(() => [
          C(x.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 40, ["id", "class", "aria-describedby", "href"])),
      o("span", {
        id: x.id,
        ref_key: "tooltip",
        ref: l,
        class: L(["fr-tooltip fr-placement", _.value]),
        style: de(p.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, h(x.content), 15, Td)
    ], 64));
  }
}), Vd = /* @__PURE__ */ ne(Hd, [["__scopeId", "data-v-c54626f2"]]), Ed = { class: "fr-transcription" }, Fd = ["aria-expanded", "aria-controls"], Rd = ["id"], Pd = ["id", "aria-labelledby"], Nd = { class: "fr-container fr-container--fluid fr-container-md" }, Xd = { class: "fr-grid-row fr-grid-row--center" }, Yd = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, jd = { class: "fr-modal__body" }, Od = { class: "fr-modal__header" }, qd = ["aria-controls"], Qd = { class: "fr-modal__content" }, Gd = ["id"], Kd = { class: "fr-transcription__footer" }, Wd = { class: "fr-transcription__actions-group" }, Ud = ["aria-controls"], Pt = /* @__PURE__ */ z({
  __name: "DsfrTranscription",
  props: {
    id: { default: () => q("transcription") },
    title: { default: "Titre de la vidéo" },
    content: { default: "Transcription du contenu de la vidéo" }
  },
  setup(t) {
    const e = t, {
      collapse: a,
      collapsing: n,
      cssExpanded: l,
      doExpand: i,
      onTransitionEnd: s
    } = ue(), d = R(!1), f = R(!1), u = b(() => `fr-transcription__modal-${e.id}`), v = b(() => `fr-transcription__collapse-${e.id}`);
    return le(f, (p, _) => {
      p !== _ && i(p);
    }), (p, _) => {
      const D = J("DsfrModal");
      return r(), c("div", Ed, [
        o("button", {
          class: "fr-transcription__btn",
          "aria-expanded": f.value,
          "aria-controls": v.value,
          onClick: _[0] || (_[0] = (y) => f.value = !f.value)
        }, " Transcription ", 8, Fd),
        o("div", {
          id: v.value,
          ref_key: "collapse",
          ref: a,
          class: L(["fr-collapse", { "fr-collapse--expanded": X(l), "fr-collapsing": X(n) }]),
          onTransitionend: _[2] || (_[2] = (y) => X(s)(f.value))
        }, [
          o("dialog", {
            id: u.value,
            class: "fr-modal",
            role: "dialog",
            "aria-labelledby": `${u.value}-title`
          }, [
            o("div", Nd, [
              o("div", Xd, [
                o("div", Yd, [
                  o("div", jd, [
                    o("div", Od, [
                      o("button", {
                        class: "fr-btn--close fr-btn",
                        "aria-controls": u.value,
                        title: "Fermer"
                      }, " Fermer ", 8, qd)
                    ]),
                    o("div", Qd, [
                      o("h1", {
                        id: `${u.value}-title`,
                        class: "fr-modal__title"
                      }, h(p.title), 9, Gd),
                      I(" " + h(p.content), 1)
                    ]),
                    o("div", Kd, [
                      o("div", Wd, [
                        o("button", {
                          class: "fr-btn fr-btn--fullscreen",
                          "aria-controls": u.value,
                          "data-fr-opened": "false",
                          title: "",
                          onClick: _[1] || (_[1] = (y) => d.value = !0)
                        }, " Agrandir ", 8, Ud)
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ], 8, Pd)
        ], 42, Rd),
        (r(), M(Gt, { to: "body" }, [
          O(D, {
            title: p.title,
            opened: d.value,
            onClose: _[3] || (_[3] = (y) => d.value = !1)
          }, {
            default: F(() => [
              C(p.$slots, "default", {}, () => [
                I(h(p.content), 1)
              ])
            ]),
            _: 3
          }, 8, ["title", "opened"])
        ]))
      ]);
    };
  }
}), Zd = ["src"], $d = { class: "fr-content-media__caption" }, Jd = /* @__PURE__ */ z({
  __name: "DsfrVideo",
  props: {
    src: {},
    legend: { default: "" },
    size: { default: "medium" },
    transcriptionTitle: { default: "" },
    transcriptionContent: { default: "" },
    ratio: { default: "16x9" }
  },
  setup(t) {
    return (e, a) => (r(), c("figure", {
      class: L(["fr-content-media", {
        "fr-content-media--sm": e.size === "small",
        "fr-content-media--lg": e.size === "large"
      }])
    }, [
      o("div", {
        class: L(["fr-responsive-vid", `fr-ratio-${e.ratio}`])
      }, [
        o("iframe", {
          src: e.src,
          class: "fr-responsive-vid__player",
          width: "100%",
          height: "100%",
          allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        }, null, 8, Zd)
      ], 2),
      o("div", $d, h(e.legend), 1),
      O(Pt, {
        title: e.transcriptionTitle,
        content: e.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 2));
  }
}), eu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: ca,
  DsfrAccordionsGroup: fa,
  DsfrAlert: ga,
  DsfrBackToTop: na,
  DsfrBadge: ya,
  DsfrBreadcrumb: Da,
  DsfrButton: ke,
  DsfrButtonGroup: Me,
  DsfrCallout: Ba,
  DsfrCard: Oa,
  DsfrCheckbox: Le,
  DsfrCheckboxSet: tl,
  DsfrConsent: rl,
  DsfrErrorPage: hl,
  DsfrFieldset: kl,
  DsfrFileDownload: ct,
  DsfrFileDownloadList: Dl,
  DsfrFileUpload: Al,
  DsfrFollow: en,
  DsfrFooter: An,
  DsfrFooterLinkList: En,
  DsfrFooterPartners: pt,
  DsfrFranceConnect: Xn,
  DsfrHeader: Ir,
  DsfrHeaderMenuLink: ht,
  DsfrHeaderMenuLinks: Ee,
  DsfrHighlight: Br,
  DsfrInput: Ye,
  DsfrInputGroup: Hr,
  DsfrLanguageSelector: Fe,
  DsfrLogo: _e,
  DsfrModal: yi,
  DsfrNavigation: Xi,
  DsfrNavigationItem: _t,
  DsfrNavigationMegaMenu: Ct,
  DsfrNavigationMegaMenuCategory: Dt,
  DsfrNavigationMenu: zt,
  DsfrNavigationMenuItem: xt,
  DsfrNavigationMenuLink: Ie,
  DsfrNewsLetter: vt,
  DsfrNotice: Qi,
  DsfrPagination: lo,
  DsfrPicture: so,
  DsfrQuote: go,
  DsfrRadioButton: Mt,
  DsfrRadioButtonSet: To,
  DsfrRange: Oo,
  DsfrSearchBar: Ve,
  DsfrSegmented: Lt,
  DsfrSegmentedSet: es,
  DsfrSelect: ss,
  DsfrShare: ms,
  DsfrSideMenu: Ds,
  DsfrSideMenuButton: St,
  DsfrSideMenuLink: Cs,
  DsfrSideMenuList: Bt,
  DsfrSideMenuListItem: It,
  DsfrSkipLinks: Bs,
  DsfrSocialNetworks: ft,
  DsfrStepper: Rs,
  DsfrSummary: js,
  DsfrTabContent: Tt,
  DsfrTabItem: At,
  DsfrTable: ud,
  DsfrTableCell: Ht,
  DsfrTableHeader: Et,
  DsfrTableHeaders: Ft,
  DsfrTableRow: Vt,
  DsfrTabs: Us,
  DsfrTag: je,
  DsfrTags: vd,
  DsfrTile: Rt,
  DsfrTiles: Ld,
  DsfrToggleSwitch: Ad,
  DsfrTooltip: Vd,
  DsfrTranscription: Pt,
  DsfrVideo: Jd
}, Symbol.toStringTag, { value: "Module" })), tu = { name: "ri-account-circle-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0012.16 13a8.968 8.968 0 00-6.137 2.416zM12 11a3 3 0 100-6 3 3 0 000 6z"/>' }, au = { name: "ri-account-circle-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0012 20a7.97 7.97 0 005.167-1.892A6.979 6.979 0 0012.16 16a6.981 6.981 0 00-5.147 2.256zM5.616 16.82A8.975 8.975 0 0112.16 14a8.972 8.972 0 016.362 2.634 8 8 0 10-12.906.187zM12 13a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"/>' }, lu = { name: "ri-add-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/>' }, nu = { name: "ri-alert-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12.866 3l9.526 16.5a1 1 0 01-.866 1.5H2.474a1 1 0 01-.866-1.5L11.134 3a1 1 0 011.732 0zM11 16v2h2v-2h-2zm0-7v5h2V9h-2z"/>' }, ru = { name: "ri-alert-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12.866 3l9.526 16.5a1 1 0 01-.866 1.5H2.474a1 1 0 01-.866-1.5L11.134 3a1 1 0 011.732 0zm-8.66 16h15.588L12 5.5 4.206 19zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z"/>' }, iu = { name: "ri-arrow-down-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z"/>' }, ou = { name: "ri-arrow-down-s-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"/>' }, su = { name: "ri-arrow-drop-down-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"/>' }, du = { name: "ri-arrow-left-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"/>' }, uu = { name: "ri-arrow-left-s-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/>' }, cu = { name: "ri-arrow-right-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"/>' }, fu = { name: "ri-arrow-right-s-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>' }, vu = { name: "ri-arrow-up-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 4l7.778 7.778-1.414 1.414L13 7.828z"/>' }, pu = { name: "ri-arrow-up-s-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"/>' }, hu = { name: "ri-chat-1-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M10 3h4a8 8 0 110 16v3.5c-5-2-12-5-12-11.5a8 8 0 018-8zm2 14h2a6 6 0 100-12h-4a6 6 0 00-6 6c0 3.61 2.462 5.966 8 8.48V17z"/>' }, mu = { name: "ri-chat-quote-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M21 3a1 1 0 011 1v14a1 1 0 01-1 1H6.455L2 22.5V4a1 1 0 011-1h18zm-1 2H4v13.385L5.763 17H20V5zm-9.485 2.412l.447.688c-1.668.903-1.639 2.352-1.639 2.664.155-.02.318-.024.48-.009a1.761 1.761 0 011.613 1.745 1.75 1.75 0 01-1.75 1.75c-.537 0-1.05-.245-1.374-.59-.515-.546-.792-1.16-.792-2.155 0-1.75 1.228-3.318 3.015-4.093zm5 0l.447.688c-1.668.903-1.639 2.352-1.639 2.664.155-.02.318-.024.48-.009a1.761 1.761 0 011.613 1.745 1.75 1.75 0 01-1.75 1.75c-.537 0-1.05-.245-1.374-.59-.515-.546-.792-1.16-.792-2.155 0-1.75 1.228-3.318 3.015-4.093z"/>' }, gu = { name: "ri-check-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"/>' }, bu = { name: "ri-checkbox-circle-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"/>' }, yu = { name: "ri-checkbox-circle-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/>' }, ku = { name: "ri-close-circle-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"/>' }, wu = { name: "ri-close-circle-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"/>' }, _u = { name: "ri-close-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>' }, xu = { name: "ri-delete-bin-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8H2V6h5V3a1 1 0 011-1h8a1 1 0 011 1v3zm-8 5v6h2v-6H9zm4 0v6h2v-6h-2zM9 4v2h6V4H9z"/>' }, zu = { name: "ri-delete-bin-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8H2V6h5V3a1 1 0 011-1h8a1 1 0 011 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/>' }, Du = { name: "ri-double-quotes-l", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z"/>' }, Cu = { name: "ri-download-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M3 19h18v2H3v-2zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172z"/>' }, Mu = { name: "ri-edit-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M7.243 18H3v-4.243L14.435 2.322a1 1 0 011.414 0l2.829 2.829a1 1 0 010 1.414L7.243 18zM3 20h18v2H3v-2z"/>' }, Lu = { name: "ri-edit-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M6.414 16L16.556 5.858l-1.414-1.414L5 14.586V16h1.414zm.829 2H3v-4.243L14.435 2.322a1 1 0 011.414 0l2.829 2.829a1 1 0 010 1.414L7.243 18zM3 20h18v2H3v-2z"/>' }, Iu = { name: "ri-error-warning-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/>' }, Su = { name: "ri-error-warning-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/>' }, Bu = { name: "ri-external-link-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M10 6v2H5v11h11v-5h2v6a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z"/>' }, Au = { name: "ri-eye-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 008.777-7 9.005 9.005 0 00-17.554 0A9.005 9.005 0 0012 19zm0-2.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-2a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/>' }, Tu = { name: "ri-eye-off-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M17.882 19.297A10.949 10.949 0 0112 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 013.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 003.223 12a9.005 9.005 0 0013.201 5.838l-2.028-2.028A4.5 4.5 0 018.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 003.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0020.777 12 9.005 9.005 0 009.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 01-2.012 4.592zm-9.084-9.084a4.5 4.5 0 014.769 4.769l-4.77-4.769z"/>' }, Hu = { name: "ri-facebook-circle-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>' }, Vu = { name: "ri-file-download-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M16 2l5 5v14.008a.993.993 0 01-.993.992H3.993A1 1 0 013 21.008V2.992C3 2.444 3.445 2 3.993 2H16zm-3 10V8h-2v4H8l4 4 4-4h-3z"/>' }, Eu = { name: "ri-file-download-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M13 12h3l-4 4-4-4h3V8h2v4zm2-8H5v16h14V8h-4V4zM3 2.992C3 2.444 3.447 2 3.999 2H16l5 5v13.993A1 1 0 0120.007 22H3.993A1 1 0 013 21.008V2.992z"/>' }, Fu = { name: "ri-file-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M3 8l6.003-6h10.995C20.55 2 21 2.455 21 2.992v18.016a.993.993 0 01-.993.992H3.993A1 1 0 013 20.993V8zm7-4.5L4.5 9H10V3.5z"/>' }, Ru = { name: "ri-file-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M9 2.003V2h10.998C20.55 2 21 2.455 21 2.992v18.016a.993.993 0 01-.993.992H3.993A1 1 0 013 20.993V8l6-5.997zM5.83 8H9V4.83L5.83 8zM11 4v5a1 1 0 01-1 1H5v10h14V4h-8z"/>' }, Pu = { name: "ri-file-pdf-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M16 2l5 5v14.008a.993.993 0 01-.993.992H3.993A1 1 0 013 21.008V2.992C3 2.444 3.445 2 3.993 2H16zm-4 14a4 4 0 100-8H8v8h4zm-2-6h2a2 2 0 110 4h-2v-4z"/>' }, Nu = { name: "ri-file-pdf-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 16H8V8h4a4 4 0 110 8zm-2-6v4h2a2 2 0 100-4h-2zm5-6H5v16h14V8h-4V4zM3 2.992C3 2.444 3.447 2 3.999 2H16l5 5v13.993A1 1 0 0120.007 22H3.993A1 1 0 013 21.008V2.992z"/>' }, Xu = { name: "ri-information-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/>' }, Yu = { name: "ri-information-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/>' }, ju = { name: "ri-instagram-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 00-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/>' }, Ou = { name: "ri-linkedin-box-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"/>' }, qu = { name: "ri-loader-4-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M18.364 5.636L16.95 7.05A7 7 0 1019 12h2a9 9 0 11-2.636-6.364z"/>' }, Qu = { name: "ri-lock-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M19 10h1a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V11a1 1 0 011-1h1V9a7 7 0 1114 0v1zm-2 0V9A5 5 0 007 9v1h10zm-6 4v4h2v-4h-2z"/>' }, Gu = { name: "ri-lock-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M19 10h1a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V11a1 1 0 011-1h1V9a7 7 0 1114 0v1zM5 12v8h14v-8H5zm6 2h2v4h-2v-4zm6-4V9A5 5 0 007 9v1h10z"/>' }, Ku = { name: "ri-mail-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm9.06 8.683L5.648 6.238 4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.285 5.439z"/>' }, Wu = { name: "ri-mail-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z"/>' }, Uu = { name: "ri-menu-2-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z"/>' }, Zu = { name: "ri-menu-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>' }, $u = { name: "ri-pause-circle-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM9 9v6h2V9H9zm4 0v6h2V9h-2z"/>' }, Ju = { name: "ri-pause-circle-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zM9 9h2v6H9V9zm4 0h2v6h-2V9z"/>' }, ec = { name: "ri-play-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M19.376 12.416L8.777 19.482A.5.5 0 018 19.066V4.934a.5.5 0 01.777-.416l10.599 7.066a.5.5 0 010 .832z"/>' }, tc = { name: "ri-play-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M16.394 12L10 7.737v8.526L16.394 12zm2.982.416L8.777 19.482A.5.5 0 018 19.066V4.934a.5.5 0 01.777-.416l10.599 7.066a.5.5 0 010 .832z"/>' }, ac = { name: "ri-printer-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M7 17h10v5H7v-5zm12 3v-5H5v5H3a1 1 0 01-1-1V9a1 1 0 011-1h18a1 1 0 011 1v10a1 1 0 01-1 1h-2zM5 10v2h3v-2H5zm2-8h10a1 1 0 011 1v3H6V3a1 1 0 011-1z"/>' }, lc = { name: "ri-printer-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M6 19H3a1 1 0 01-1-1V8a1 1 0 011-1h3V3a1 1 0 011-1h10a1 1 0 011 1v4h3a1 1 0 011 1v10a1 1 0 01-1 1h-3v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2zm0-2v-1a1 1 0 011-1h10a1 1 0 011 1v1h2V9H4v8h2zM8 4v3h8V4H8zm0 13v3h8v-3H8zm-3-7h3v2H5v-2z"/>' }, nc = { name: "ri-question-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm2-1.645A3.502 3.502 0 0012 6.5a3.501 3.501 0 00-3.433 2.813l1.962.393A1.5 1.5 0 1112 11.5a1 1 0 00-1 1V14h2v-.645z"/>' }, rc = { name: "ri-question-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 011-1 1.5 1.5 0 10-1.471-1.794l-1.962-.393A3.501 3.501 0 1113 13.355z"/>' }, ic = { name: "ri-save-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M18 21v-8H6v8H4a1 1 0 01-1-1V4a1 1 0 011-1h13l4 4v13a1 1 0 01-1 1h-2zm-2 0H8v-6h8v6z"/>' }, oc = { name: "ri-save-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M7 19v-6h10v6h2V7.828L16.172 5H5v14h2zM4 3h13l4 4v13a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm5 12v4h6v-4H9z"/>' }, sc = { name: "ri-search-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0111 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.969 5.617z"/>' }, dc = { name: "ri-search-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0111 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.969 5.617zm-2.006-.742A6.977 6.977 0 0018 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 004.875-1.975l.15-.15z"/>' }, uc = { name: "ri-skip-back-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M8 11.333l10.223-6.815a.5.5 0 01.777.416v14.132a.5.5 0 01-.777.416L8 12.667V19a1 1 0 01-2 0V5a1 1 0 112 0v6.333z"/>' }, cc = { name: "ri-skip-forward-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M16 12.667L5.777 19.482A.5.5 0 015 19.066V4.934a.5.5 0 01.777-.416L16 11.333V5a1 1 0 012 0v14a1 1 0 01-2 0v-6.333z"/>' }, fc = { name: "ri-sort-asc", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M19 3l4 5h-3v12h-2V8h-3l4-5zm-5 15v2H3v-2h11zm0-7v2H3v-2h11zm-2-7v2H3V4h9z"/>' }, vc = { name: "ri-sort-desc", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M20 4v12h3l-4 5-4-5h3V4h2zm-8 14v2H3v-2h9zm2-7v2H3v-2h11zm0-7v2H3V4h11z"/>' }, pc = { name: "ri-subtract-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M5 11h14v2H5z"/>' }, hc = { name: "ri-twitter-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.191 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165z"/>' }, mc = { name: "ri-user-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M4 22a8 8 0 1116 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z"/>' }, gc = { name: "ri-user-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M4 22a8 8 0 1116 0h-2a6 6 0 10-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>' }, bc = { name: "ri-volume-down-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M8.889 16H5a1 1 0 01-1-1V9a1 1 0 011-1h3.889l5.294-4.332a.5.5 0 01.817.387v15.89a.5.5 0 01-.817.387L8.89 16zm9.974.591l-1.422-1.422A3.993 3.993 0 0019 12c0-1.43-.75-2.685-1.88-3.392l1.439-1.439A5.991 5.991 0 0121 12c0 1.842-.83 3.49-2.137 4.591z"/>' }, yc = { name: "ri-volume-down-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M13 7.22L9.603 10H6v4h3.603L13 16.78V7.22zM8.889 16H5a1 1 0 01-1-1V9a1 1 0 011-1h3.889l5.294-4.332a.5.5 0 01.817.387v15.89a.5.5 0 01-.817.387L8.89 16zm9.974.591l-1.422-1.422A3.993 3.993 0 0019 12c0-1.43-.75-2.685-1.88-3.392l1.439-1.439A5.991 5.991 0 0121 12c0 1.842-.83 3.49-2.137 4.591z"/>' }, kc = { name: "ri-volume-mute-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M5.889 16H2a1 1 0 01-1-1V9a1 1 0 011-1h3.889l5.294-4.332a.5.5 0 01.817.387v15.89a.5.5 0 01-.817.387L5.89 16zm14.525-4l3.536 3.536-1.414 1.414L19 13.414l-3.536 3.536-1.414-1.414L17.586 12 14.05 8.464l1.414-1.414L19 10.586l3.536-3.536 1.414 1.414L20.414 12z"/>' }, wc = { name: "ri-volume-mute-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M10 7.22L6.603 10H3v4h3.603L10 16.78V7.22zM5.889 16H2a1 1 0 01-1-1V9a1 1 0 011-1h3.889l5.294-4.332a.5.5 0 01.817.387v15.89a.5.5 0 01-.817.387L5.89 16zm14.525-4l3.536 3.536-1.414 1.414L19 13.414l-3.536 3.536-1.414-1.414L17.586 12 14.05 8.464l1.414-1.414L19 10.586l3.536-3.536 1.414 1.414L20.414 12z"/>' }, _c = { name: "ri-volume-up-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M5.889 16H2a1 1 0 01-1-1V9a1 1 0 011-1h3.889l5.294-4.332a.5.5 0 01.817.387v15.89a.5.5 0 01-.817.387L5.89 16zm13.517 4.134l-1.416-1.416A8.978 8.978 0 0021 12a8.982 8.982 0 00-3.304-6.968l1.42-1.42A10.976 10.976 0 0123 12c0 3.223-1.386 6.122-3.594 8.134zm-3.543-3.543l-1.422-1.422A3.993 3.993 0 0016 12c0-1.43-.75-2.685-1.88-3.392l1.439-1.439A5.991 5.991 0 0118 12c0 1.842-.83 3.49-2.137 4.591z"/>' }, xc = { name: "ri-volume-up-line", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M10 7.22L6.603 10H3v4h3.603L10 16.78V7.22zM5.889 16H2a1 1 0 01-1-1V9a1 1 0 011-1h3.889l5.294-4.332a.5.5 0 01.817.387v15.89a.5.5 0 01-.817.387L5.89 16zm13.517 4.134l-1.416-1.416A8.978 8.978 0 0021 12a8.982 8.982 0 00-3.304-6.968l1.42-1.42A10.976 10.976 0 0123 12c0 3.223-1.386 6.122-3.594 8.134zm-3.543-3.543l-1.422-1.422A3.993 3.993 0 0016 12c0-1.43-.75-2.685-1.88-3.392l1.439-1.439A5.991 5.991 0 0118 12c0 1.842-.83 3.49-2.137 4.591z"/>' }, zc = { name: "ri-youtube-fill", minX: 0, minY: 0, width: 24, height: 24, raw: '<path fill="none" d="M0 0h24v24H0z"/><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/>' }, Dc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RiAccountCircleFill: tu,
  RiAccountCircleLine: au,
  RiAddLine: lu,
  RiAlertFill: nu,
  RiAlertLine: ru,
  RiArrowDownLine: iu,
  RiArrowDownSLine: ou,
  RiArrowDropDownLine: su,
  RiArrowLeftLine: du,
  RiArrowLeftSLine: uu,
  RiArrowRightLine: cu,
  RiArrowRightSLine: fu,
  RiArrowUpLine: vu,
  RiArrowUpSLine: pu,
  RiChat1Line: hu,
  RiChatQuoteLine: mu,
  RiCheckLine: gu,
  RiCheckboxCircleFill: bu,
  RiCheckboxCircleLine: yu,
  RiCloseCircleFill: ku,
  RiCloseCircleLine: wu,
  RiCloseLine: _u,
  RiDeleteBinFill: xu,
  RiDeleteBinLine: zu,
  RiDoubleQuotesL: Du,
  RiDownloadLine: Cu,
  RiEditFill: Mu,
  RiEditLine: Lu,
  RiErrorWarningFill: Iu,
  RiErrorWarningLine: Su,
  RiExternalLinkLine: Bu,
  RiEyeLine: Au,
  RiEyeOffLine: Tu,
  RiFacebookCircleFill: Hu,
  RiFileDownloadFill: Vu,
  RiFileDownloadLine: Eu,
  RiFileFill: Fu,
  RiFileLine: Ru,
  RiFilePdfFill: Pu,
  RiFilePdfLine: Nu,
  RiInformationFill: Xu,
  RiInformationLine: Yu,
  RiInstagramFill: ju,
  RiLinkedinBoxFill: Ou,
  RiLoader4Line: qu,
  RiLockFill: Qu,
  RiLockLine: Gu,
  RiMailFill: Ku,
  RiMailLine: Wu,
  RiMenu2Fill: Uu,
  RiMenuFill: Zu,
  RiPauseCircleFill: $u,
  RiPauseCircleLine: Ju,
  RiPlayFill: ec,
  RiPlayLine: tc,
  RiPrinterFill: ac,
  RiPrinterLine: lc,
  RiQuestionFill: nc,
  RiQuestionLine: rc,
  RiSaveFill: ic,
  RiSaveLine: oc,
  RiSearchFill: sc,
  RiSearchLine: dc,
  RiSkipBackFill: uc,
  RiSkipForwardFill: cc,
  RiSortAsc: fc,
  RiSortDesc: vc,
  RiSubtractLine: pc,
  RiTwitterFill: hc,
  RiUserFill: mc,
  RiUserLine: gc,
  RiVolumeDownFill: bc,
  RiVolumeDownLine: yc,
  RiVolumeMuteFill: kc,
  RiVolumeMuteLine: wc,
  RiVolumeUpFill: _c,
  RiVolumeUpLine: xc,
  RiYoutubeFill: zc
}, Symbol.toStringTag, { value: "Module" })), Cc = {
  install: (t, { icons: e, components: a } = {}) => {
    Object.entries(eu).forEach(([n, l]) => {
      (a === void 0 || a === "all" || a.map(({ name: i }) => i).includes(n)) && t.component(n, l);
    }), Qe(...Object.values(Dc)), e && Qe(...e), t.component("VIcon", ie);
  }
}, Mc = {
  _searchAndFilterList: function(t, e, a, n, l) {
    let i = this.$data.vueData[t];
    if (n && (i = i.filter(n)), l != null && l.trim() !== "") {
      const s = this.unaccentLower(l);
      i = i.filter((d) => this.unaccentLower(d[a].toString()).indexOf(s) > -1);
    }
    return i;
  },
  dsfrTransformListForSelection: function(t, e, a, n, l) {
    return this._searchAndFilterList(t, e, a, n, l).map(function(s) {
      return { value: s[e], text: s[a].toString() };
    });
  },
  dsfrTransformListForRadio: function(t, e, a, n, l, i, s) {
    return this._searchAndFilterList(t, e, a, i, s).map(function(f) {
      return { value: f[e], label: f[a].toString(), hint: f[l], disabled: f[n] };
    });
  },
  dsfrTransformListForCheckbox: function(t, e, a, n, l, i, s, d) {
    return this._searchAndFilterList(t, e, a, s, d).map(function(u) {
      return { value: u[e], label: u[a].toString(), name: i, hint: u[l], disabled: u[n] };
    });
  }
}, Lc = ["href"], Ic = {
  __name: "RouterLink",
  props: ["to"],
  setup(t) {
    const e = t;
    return (a, n) => (r(), c("a", {
      href: e.to
    }, [
      C(a.$slots, "default")
    ], 8, Lc));
  }
}, Oe = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [n, l] of e)
    a[n] = l;
  return a;
}, Sc = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: Le, DsfrTag: je, DsfrButton: ke },
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
    addFacetValueTranslator(t, e) {
      this.codeToLabelTranslater[t] = e;
    },
    facetByCode(t) {
      return this.facets.filter(function(e) {
        return e.code === t;
      })[0];
    },
    facetValueByCode(t, e) {
      return this.facetByCode(t).values.filter(function(a) {
        return a.code === e;
      })[0];
    },
    facetLabelByCode(t) {
      return this.facetByCode(t).label;
    },
    facetMultipleByCode(t) {
      return this.facetByCode(t).multiple;
    },
    facetValueLabelByCode(t, e) {
      if (this.codeToLabelTranslater[t])
        return this.codeToLabelTranslater[t](t, e);
      var a = this.facetValueByCode(t, e);
      return a ? a.label : e;
    },
    isFacetValueSelected(t, e) {
      return this.selectedFacets[t].includes(e);
    },
    isFacetSelected(t) {
      return this.selectedFacets[t] ? this.selectedFacets[t].length > 0 : !1;
    },
    isAnyFacetValueSelected() {
      return Object.keys(this.selectedFacets).some((function(t) {
        return !this.facetMultipleByCode(t);
      }).bind(this));
    },
    expandFacet(t) {
      this.isFacetExpanded(t) || this.$data.expandedFacets.push(t);
    },
    reduceFacet(t) {
      this.isFacetExpanded(t) && this.$data.expandedFacets.splice(this.$data.expandedFacets.indexOf(t), 1);
    },
    isFacetExpanded(t) {
      return this.$data.expandedFacets.includes(t);
    },
    selectedInvisibleFacets(t) {
      return this.selectedFacets[t].filter((e) => !this.facetValueByCode(t, e)).map((e) => {
        var a = {};
        return a.code = e, a.label = e, a.count = 0, a;
      });
    },
    visibleFacets(t, e) {
      return this.isFacetExpanded(t) ? e : e.slice(0, this.maxValues);
    }
  }
}, Bc = {
  key: 0,
  class: "fr-mb-2w"
}, Ac = { class: "fr-mb-1w" }, Tc = { key: 0 }, Hc = { class: "facet" }, Vc = { class: "flex justify-between w-full fr-mb-0" }, Ec = { class: "facet--count" }, Fc = { key: 1 }, Rc = { class: "flex justify-between w-full" }, Pc = { class: "facet--count" }, Nc = { key: 0 }, Xc = { class: "facet" }, Yc = { class: "flex justify-between w-full fr-mb-0" }, jc = { class: "facet--count" }, Oc = { key: 1 }, qc = { class: "flex justify-between w-full" }, Qc = { class: "facet--count" }, Gc = { class: "fr-mb-2w" };
function Kc(t, e, a, n, l, i) {
  const s = J("DsfrTag"), d = J("DsfrCheckbox"), f = J("DsfrButton");
  return r(), c("div", null, [
    i.isAnyFacetValueSelected() ? (r(), c("div", Bc, [
      (r(!0), c(T, null, N(a.selectedFacets, (u, v) => (r(), c("div", { key: v }, [
        i.facetMultipleByCode(v) ? m("", !0) : (r(!0), c(T, { key: 0 }, N(u, (p) => (r(), M(s, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: p.code,
          onClick: (_) => t.$emit("toogle-facet", v, p, a.contextKey)
        }, {
          default: F(() => [
            I(h(i.facetLabelByCode(v)) + ": " + h(i.facetValueLabelByCode(v, p)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]))), 128))
    ])) : m("", !0),
    (r(!0), c(T, null, N(a.facets, (u) => (r(), c("div", {
      key: u.code,
      class: "facets"
    }, [
      u.multiple || !i.isFacetSelected(u.code) ? (r(), c(T, { key: 0 }, [
        o("h6", Ac, h(u.label), 1),
        o("ul", null, [
          (r(!0), c(T, null, N(i.selectedInvisibleFacets(u.code), (v) => (r(), c(T, {
            key: v.code
          }, [
            u.multiple ? (r(), c("li", Tc, [
              o("div", Hc, [
                O(d, {
                  small: "",
                  modelValue: !0,
                  "onUpdate:modelValue": (p) => t.$emit("toogle-facet", u.code, v.code, a.contextKey)
                }, {
                  label: F(() => [
                    o("p", Vc, [
                      I(h(i.facetValueLabelByCode(u.code, v.code)) + " ", 1),
                      o("span", Ec, h(v.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onUpdate:modelValue"])
              ])
            ])) : (r(), c("li", Fc, [
              O(f, {
                tertiary: "",
                "no-outline": "",
                onClick: (p) => t.$emit("toogle-facet", u.code, v.code, a.contextKey)
              }, {
                default: F(() => [
                  o("span", Rc, [
                    I(h(i.facetValueLabelByCode(u.code, v.code)) + " ", 1),
                    o("span", Pc, h(v.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        o("ul", null, [
          (r(!0), c(T, null, N(i.visibleFacets(u.code, u.values), (v) => (r(), c(T, {
            key: v.code
          }, [
            u.multiple ? (r(), c("li", Nc, [
              o("div", Xc, [
                O(d, {
                  small: "",
                  modelValue: i.isFacetValueSelected(u.code, v.code),
                  class: "facet",
                  "onUpdate:modelValue": (p) => t.$emit("toogle-facet", u.code, v.code, a.contextKey)
                }, {
                  label: F(() => [
                    o("p", Yc, [
                      I(h(i.facetValueLabelByCode(u.code, v.code)) + " ", 1),
                      o("span", jc, h(v.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"])
              ])
            ])) : (r(), c("li", Oc, [
              O(f, {
                tertiary: "",
                "no-outline": "",
                onClick: (p) => t.$emit("toogle-facet", u.code, v.code, a.contextKey)
              }, {
                default: F(() => [
                  o("span", qc, [
                    I(h(i.facetValueLabelByCode(u.code, v.code)) + " ", 1),
                    o("span", Qc, h(v.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        o("div", Gc, [
          u.values.length > a.maxValues && !i.isFacetExpanded(u.code) ? (r(), M(f, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (v) => i.expandFacet(u.code)
          }, {
            default: F(() => [
              I(h(t.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : m("", !0),
          u.values.length > a.maxValues && i.isFacetExpanded(u.code) ? (r(), M(f, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (v) => i.reduceFacet(u.code)
          }, {
            default: F(() => [
              I(h(t.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : m("", !0)
        ])
      ], 64)) : m("", !0)
    ]))), 128))
  ]);
}
const Wc = /* @__PURE__ */ Oe(Sc, [["render", Kc], ["__scopeId", "data-v-e1d6020e"]]), Uc = {
  name: "DsfrVTable",
  components: { DsfrCheckbox: Le },
  props: {
    rows: Array,
    columns: Object,
    title: String,
    resultsPerPage: {
      type: Number,
      default: 10
    },
    small: Boolean,
    bordered: Boolean,
    selectable: Boolean
  },
  computed: {},
  data: function() {
    return {
      selectableRows: [],
      currentPage: 1
    };
  },
  created: function() {
  },
  methods: {}
}, Zc = { class: "fr-table__wrapper" }, $c = { class: "fr-table__container" }, Jc = { class: "fr-table__content" }, e1 = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, t1 = /* @__PURE__ */ o("span", { class: "fr-sr-only" }, "Sélectionner", -1), a1 = [
  t1
], l1 = ["data-row-key"], n1 = {
  key: 0,
  class: "fr-cell--fixed",
  scope: "row"
};
function r1(t, e, a, n, l, i) {
  const s = J("dsfr-checkbox");
  return r(), c("div", {
    class: L(["fr-table", {
      "fr-table--sm": a.small,
      "fr-table--bordered": a.bordered
    }])
  }, [
    o("div", Zc, [
      o("div", $c, [
        o("div", Jc, [
          o("table", null, [
            o("caption", null, h(a.title), 1),
            o("thead", null, [
              o("tr", null, [
                a.selectable ? (r(), c("th", e1, a1)) : m("", !0),
                (r(!0), c(T, null, N(a.columns, (d) => (r(), c("th", {
                  key: typeof d == "object" ? d.key : d,
                  scope: "col"
                }, [
                  C(t.$slots, "header", E({ ref_for: !0 }, typeof d == "object" ? d : { key: d, label: d }), () => [
                    I(h(typeof d == "object" ? d.label : d), 1)
                  ])
                ]))), 128))
              ])
            ]),
            o("tbody", null, [
              (r(!0), c(T, null, N(a.rows, (d, f) => (r(), c("tr", {
                key: `row-${f}`,
                "data-row-key": f + 1
              }, [
                a.selectable ? (r(), c("th", n1, [
                  O(s, {
                    small: "",
                    label: "Sélectionner la ligne " + (f + 1)
                  }, null, 8, ["label"])
                ])) : m("", !0),
                C(t.$slots, "default", {
                  props: { row: d, idx: f }
                })
              ], 8, l1))), 128))
            ])
          ])
        ])
      ])
    ])
  ], 2);
}
const i1 = /* @__PURE__ */ Oe(Uc, [["render", r1]]), o1 = {
  name: "DsfrVTable",
  props: {
    key: String,
    props: Object
  },
  computed: {},
  data: function() {
    return {};
  },
  created: function() {
  },
  methods: {}
};
function s1(t, e, a, n, l, i) {
  return r(), c("td", { key: a.key }, [
    C(t.$slots, "default", { props: a.props })
  ]);
}
const d1 = /* @__PURE__ */ Oe(o1, [["render", s1]]);
var u1 = {
  install: function(t, e) {
    t.use(Cc), t.component("RouterLink", Ic), t.component("DsfrFacets", Wc), t.component("DsfrVTable", i1), t.component("DsfrVTd", d1);
  },
  methods: Mc
};
window && (window.DSFR = u1);
export {
  u1 as default
};
//# sourceMappingURL=dsfr.es.js.map
