//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, a) => (a = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), l = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, u = {
	props: {
		botUrl: {
			type: String,
			required: !0
		},
		devMode: {
			type: Boolean,
			default: !1
		},
		minTimeBetweenMessages: {
			type: Number,
			default: 1e3
		},
		botAvatar: {
			type: String,
			required: !0
		},
		botName: {
			type: String,
			required: !0
		}
	},
	data: function() {
		return {
			convId: 42,
			inputConfig: {
				modeTextarea: !1,
				responseText: "",
				responsePattern: "",
				showRating: !1,
				rating: 0,
				buttons: []
			},
			prevInputConfig: {},
			lastPayload: null,
			processing: !1,
			error: !1,
			messages: [],
			keepAction: !1,
			menu: !1,
			lastUserInteraction: 0,
			watingMessagesStack: []
		};
	},
	created: function() {
		this.askBot("/start"), this.convId = Math.random();
	},
	methods: {
		postAnswerBtn: function(e) {
			this.messages.push({
				text: [e.title],
				sent: !0,
				bgColor: "primary",
				textColor: "white"
			}), this._scrollToBottom(), this.askBot(e.payload);
		},
		postAnswerText: function() {
			var e = this.inputConfig.responseText.trim().replace(/(?:\r\n|\r|\n)/g, "<br>");
			this.messages.push({
				text: e === "" ? null : [e],
				rating: this.inputConfig.rating > 0 ? this.inputConfig.rating : null,
				sent: !0,
				bgColor: "primary",
				textColor: "white"
			}), this._scrollToBottom();
			var t = this.inputConfig.responsePattern === "" ? e.replace(/(")/g, "\"") : this.inputConfig.responsePattern.replace("#", e.replace(/(")/g, "\\\""));
			this.askBot(t);
		},
		_scrollToBottom: function() {
			this.$refs.scroller && this.$refs.scroller.setScrollPosition(this.$refs.scroller.scrollHeight, 400);
		},
		askBot: function(e) {
			this.prevInputConfig = JSON.parse(JSON.stringify(this.inputConfig)), this.reinitInput(), this.lastPayload = e, this.processing = !0, this.lastUserInteraction = Date.now(), this.$http.post(this.botUrl, {
				sender: this.convId,
				message: e
			}).then(function(e) {
				e.data.forEach(function(e) {
					this.watingMessagesStack.push(e);
				}, this), this._displayMessages();
			}.bind(this)).catch(function() {
				this.error = !0, this.processing = !1, this._scrollToBottom();
			}.bind(this));
		},
		_displayMessages: function() {
			if (this.watingMessagesStack.length > 0) {
				var e = this.watingMessagesStack.shift(), t = this.lastUserInteraction - Date.now() + this.minTimeBetweenMessages;
				this.sleep(t).then(function() {
					this._processResponse(e), this.lastUserInteraction = Date.now(), this._displayMessages();
				}.bind(this));
			} else this.processing = !1, this.keepAction &&= (this.inputConfig = this.prevInputConfig, this.inputConfig.responseText = "", !1), this.sleep(1).then(function() {
				this.$refs.input.focus();
			}.bind(this));
		},
		_processResponse: function(e) {
			var t = this.messages[this.messages.length - 1];
			t && !t.sent ? t.text.push(e.text) : this.messages.push({
				avatar: this.botAvatar,
				text: [e.text],
				bgColor: "grey-4"
			}), e.buttons && e.buttons.forEach(function(e) {
				if (e.title.startsWith("#")) {
					var t = e.title.substring(1);
					t === "textarea" && (this.inputConfig.modeTextarea = !0), t === "eval" && (this.inputConfig.showRating = !0), t === "keep_action" && (this.keepAction = !0), e.payload && (this.inputConfig.responsePattern = e.payload);
				} else this.inputConfig.buttons.push(e);
			}, this), this._scrollToBottom();
		},
		restart: function() {
			this.messages.push({
				text: [this.$q.lang.vui.chatbot.restartMessage],
				bgColor: "orange"
			}), this._scrollToBottom(), this.$http.post(this.botUrl, "{\"sender\":\"" + this.convId + "\",\"message\":\"/restart\"}").then(function() {
				this.askBot("/start");
			}.bind(this));
		},
		reinitInput: function() {
			this.inputConfig.modeTextarea = !1, this.inputConfig.responsePattern = "", this.inputConfig.responseText = "", this.inputConfig.showRating = !1, this.inputConfig.rating = 0, this.inputConfig.buttons = [], this.error = !1;
		},
		sleep: function(e) {
			return new Promise(function(t) {
				setTimeout(t, e);
			});
		}
	}
}, d = window.Vue.renderList, f = window.Vue.Fragment, p = window.Vue.openBlock, m = window.Vue.createElementBlock, h = window.Vue.resolveComponent, g = window.Vue.createVNode, _ = window.Vue.withCtx, v = window.Vue.createBlock, y = window.Vue.createCommentVNode, ee = window.Vue.toDisplayString, b = window.Vue.createElementVNode, te = window.Vue.withKeys, ne = { class: "bot" }, re = { class: "q-pr-md" }, ie = { class: "sys-chat" }, ae = { class: "q-pb-sm" }, oe = { class: "sys-chat non-selectable" }, se = { class: "text-blue-2 q-caption" }, ce = { class: "row docs-btn" }, le = { class: "message-processing sys-chat non-selectable" }, ue = { class: "non-selectable" }, de = { class: "message-response row docs-btn q-pl-sm non-selectable" };
function fe(e, t, n, r, i, a) {
	let o = h("q-rating"), s = h("q-chat-message"), c = h("q-btn"), l = h("q-spinner-dots"), u = h("q-scroll-area"), fe = h("q-input");
	return p(), m("div", ne, [g(u, {
		class: "bg-grey-2 col-grow row q-pa-sm",
		ref: "scroller"
	}, {
		default: _(() => [b("div", re, [
			(p(!0), m(f, null, d(e.messages, (e, t) => (p(), m("div", { key: t }, [e.rating ? (p(), v(s, {
				class: "animate-fade",
				key: "msgRating-" + t,
				sent: e.sent,
				"bg-color": e.bgColor,
				avatar: e.avatar
			}, {
				default: _(() => [g(o, {
					modelValue: e.rating,
					"onUpdate:modelValue": (t) => e.rating = t,
					max: 5,
					style: { "font-size": "2rem" },
					readonly: ""
				}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
				_: 2
			}, 1032, [
				"sent",
				"bg-color",
				"avatar"
			])) : y("", !0), e.text ? (p(), v(s, {
				class: "animate-fade",
				key: "msg-" + t,
				label: e.label,
				sent: e.sent,
				"text-color": e.textColor,
				"bg-color": e.bgColor,
				name: e.name,
				avatar: e.avatar,
				text: e.text,
				stamp: e.stamp
			}, null, 8, [
				"label",
				"sent",
				"text-color",
				"bg-color",
				"name",
				"avatar",
				"text",
				"stamp"
			])) : y("", !0)]))), 128)),
			b("div", ie, [e.error ? (p(), v(s, {
				key: 0,
				class: "animate-fade",
				"bg-color": "orange-4",
				"text-color": "black",
				size: "12"
			}, {
				default: _(() => [b("div", ae, ee(e.$q.lang.vui.chatbot.errorMessage), 1), g(c, {
					class: "full-width",
					onClick: t[0] ||= (t) => a.askBot(e.lastPayload),
					label: e.$q.lang.vui.chatbot.tryAgain,
					color: "white",
					"text-color": "black"
				}, null, 8, ["label"])]),
				_: 1
			})) : y("", !0)]),
			b("div", oe, [e.inputConfig.buttons.length > 0 ? (p(), v(s, {
				key: 0,
				class: "animate-fade",
				"bg-color": "primary",
				size: "12"
			}, {
				default: _(() => [b("div", se, ee(e.$q.lang.vui.suggestedAnswers), 1), b("div", ce, [(p(!0), m(f, null, d(e.inputConfig.buttons, (e, t) => (p(), v(c, {
					class: "full-width",
					key: "repChatBtn-" + t,
					onClick: (t) => a.postAnswerBtn(e),
					label: e.title,
					color: "white",
					"text-color": "black"
				}, null, 8, ["onClick", "label"]))), 128))])]),
				_: 1
			})) : y("", !0)]),
			b("div", le, [e.processing ? (p(), v(s, {
				key: 0,
				class: "animate-fade",
				"bg-color": "grey-4"
			}, {
				default: _(() => [g(l, { size: "2em" })]),
				_: 1
			})) : y("", !0)]),
			b("div", ue, [e.inputConfig.showRating ? (p(), v(s, {
				key: 0,
				class: "animate-fade",
				"bg-color": "primary",
				sent: ""
			}, {
				default: _(() => [g(o, {
					modelValue: e.rating,
					"onUpdate:modelValue": t[1] ||= (t) => e.rating = t,
					max: 4,
					style: { "font-size": "2rem" }
				}, null, 8, ["modelValue"])]),
				_: 1
			})) : y("", !0)])
		])]),
		_: 1
	}, 512), b("div", de, [
		g(fe, {
			type: e.inputConfig.modeTextarea ? "textarea" : "text",
			ref: "input",
			onKeyup: t[2] ||= te((t) => e.inputConfig.modeTextarea || e.inputConfig.responseText.trim() === "" && e.inputConfig.rating === 0 ? !1 : a.postAnswerText(), ["enter"]),
			"max-height": 100,
			class: "col-grow",
			modelValue: e.inputConfig.responseText,
			"onUpdate:modelValue": t[3] ||= (t) => e.inputConfig.responseText = t,
			placeholder: e.$q.lang.vui.chatbot.inputPlaceholder,
			disable: e.processing || e.error,
			loading: e.processing
		}, null, 8, [
			"type",
			"modelValue",
			"placeholder",
			"disable",
			"loading"
		]),
		g(c, {
			round: "",
			color: "primary",
			icon: "send",
			onClick: t[4] ||= (e) => a.postAnswerText(),
			disable: e.processing || e.inputConfig.responseText.trim() === "" && e.inputConfig.rating === 0
		}, null, 8, ["disable"]),
		n.devMode === !0 ? (p(), v(c, {
			key: 0,
			round: "",
			color: "red",
			icon: "refresh",
			onClick: a.restart
		}, null, 8, ["onClick"])) : y("", !0)
	])]);
}
var pe = /*#__PURE__*/ l(u, [["render", fe]]), me = {
	data: function() {
		return {
			text: "",
			commandParamsValues: [],
			commands: [],
			commandAutocompleteOptions: [],
			isCommandCommited: !1,
			selectedCommand: {},
			isExecuted: !1,
			commandResult: {},
			paramsAutocompleteOptions: []
		};
	},
	props: { baseUrl: {
		type: String,
		default: "/"
	} },
	methods: {
		searchCommands: function(e, t, n) {
			if (this.$data.text = e, this.$data.selectedCommand = {}, e.length < 1) {
				n();
				return;
			}
			this.$http.post(this.baseUrl + "api/vertigo/commands/_search", { prefix: e }).then(function(e) {
				this.$data.commands = e.data, t(function() {
					this.$data.commandAutocompleteOptions = this.$data.commands.map(function(e) {
						return {
							label: e.commandName,
							sublabel: e.descpription,
							value: e.commandName,
							command: e
						};
					});
				}.bind(this)), this.$data.commands.length > 0 && this.chooseCommand(this.$data.commands[0], !1);
			}.bind(this));
		},
		selectCommand: function(e) {
			this.chooseCommand(e.command, !0);
		},
		chooseCommand: function(e, t) {
			this.$data.selectedCommand = e, this.$data.selectedCommand.commandParams ? this.$data.commandParamsValues = this.$data.selectedCommand.commandParams.map(function() {
				return { value: "" };
			}) : this.$data.commandParamsValues = [], this.$data.isCommandCommited = t;
		},
		commitCommand: function(e) {
			if (this.$data.selectedCommand && this.$data.selectedCommand.commandName) switch (e.keyCode) {
				case 9:
				case 13: this.$data.isCommandCommited = !0, e.preventDefault();
			}
		},
		executeCommand: function() {
			if (this.$data.commandParamsValues.every(function(e) {
				return e;
			})) {
				var e = this.$data.commandParamsValues.map(function(e) {
					return e.value;
				});
				this.$http.post(this.baseUrl + "api/vertigo/commands/_execute", {
					command: this.$data.selectedCommand.commandName,
					params: e
				}).then(function(e) {
					this.$data.isExecuted = !0, this.$data.commandResult = e.data;
				}.bind(this));
			} else return !1;
		},
		handleEnter: function(e) {
			e === this.$data.selectedCommand.commandParams.length - 1 && this.$data.commandParamsValues[e].value && this.executeCommand();
		},
		autocompleteParam: function(e, t, n, r, i) {
			if (n.length < 1) {
				i();
				return;
			}
			this.$http.get(this.baseUrl + "api/vertigo/commands/params/_autocomplete", { params: {
				terms: n,
				entityClass: e.paramType.actualTypeArguments[0]
			} }).then(function(e) {
				r(function() {
					var n = this.$data.paramsAutocompleteOptions.slice();
					n[t] = e.data.map(function(e) {
						return {
							label: e.label,
							value: e.urn
						};
					}), this.$data.paramsAutocompleteOptions = n;
				}.bind(this));
			}.bind(this));
		},
		selectParam: function(e, t) {
			var n = this.$data.commandParamsValues.slice();
			n[t] = e, this.$data.commandParamsValues = n;
		},
		getParamValue(e) {
			var t = this.$data.commandParamsValues[e];
			if (t && t.value) return t;
		},
		backIfNeeded: function(e, t) {
			t && !this.$data.commandParamsValues[0].value && this.back();
		},
		back: function() {
			this.$data.commandParamsValues = [], this.$data.commands = [], this.$data.isCommandCommited = !1, this.$data.selectedCommand = {}, this.$data.isExecuted = !1, this.$data.commandResult = {}, this.$data.paramsAutocompleteOptions = [], this.$nextTick(function() {
				this.$refs.commandInput.updateInputValue(this.$data.text);
			});
		},
		reset: function() {
			this.back(), this.$data.text = "";
		}
	}
}, he = window.Vue.toDisplayString, x = window.Vue.openBlock, S = window.Vue.createElementBlock, ge = window.Vue.createCommentVNode, _e = window.Vue.resolveComponent, ve = window.Vue.withCtx, ye = window.Vue.createBlock, be = window.Vue.createElementVNode, xe = window.Vue.renderList, Se = window.Vue.Fragment, Ce = window.Vue.withKeys, we = window.Vue.createVNode, Te = window.Vue.createTextVNode, Ee = {
	key: 0,
	style: {
		"line-height": "40px",
		opacity: "0.5",
		position: "fixed"
	}
}, De = {
	class: "bg-grey-4 text-center vertical-middle text-bold q-px-md",
	style: { "line-height": "40px" }
}, Oe = {
	key: 0,
	class: "row col items-center q-py-xs"
}, ke = {
	key: 1,
	class: "col"
}, Ae = {
	key: 1,
	class: "row col items-center"
}, je = {
	class: "col shadow-2 bg-secondary text-white q-px-md",
	style: { "line-height": "40px" }
};
function Me(e, t, n, r, i, a) {
	let o = _e("q-select"), s = _e("q-input"), c = _e("q-separator"), l = _e("q-btn");
	return x(), S("div", null, [e.isCommandCommited ? (x(), S("div", {
		key: 1,
		class: "row col-12 justify-between bg-white round-borders overflow-hidden shadow-2 text-black",
		onKeyup: t[0] ||= Ce((...e) => a.executeCommand && a.executeCommand(...e), ["enter"])
	}, [be("div", De, he(e.selectedCommand.commandName), 1), e.isExecuted ? (x(), S("div", Ae, [
		be("div", je, he(e.commandResult.display), 1),
		e.commandResult.targetUrl ? (x(), ye(l, {
			key: 0,
			type: "a",
			href: n.baseUrl + e.commandResult.targetUrl,
			flat: ""
		}, {
			default: ve(() => [Te(he(e.$q.lang.vui.commands.linkLabel), 1)]),
			_: 1
		}, 8, ["href"])) : ge("", !0),
		we(l, {
			onClick: a.reset,
			flat: "",
			icon: "cancel",
			size: "sm",
			round: ""
		}, null, 8, ["onClick"])
	])) : (x(), S("div", Oe, [e.selectedCommand.commandParams && e.selectedCommand.commandParams.length > 0 ? (x(!0), S(Se, { key: 0 }, xe(e.selectedCommand.commandParams, (t, n) => (x(), S(Se, { key: t }, [t.paramType.rawType === "io.vertigo.commons.command.GenericUID" ? (x(), ye(o, {
		key: 0,
		class: "col q-px-xs",
		"use-chips": "",
		"bg-color": "white",
		dense: "",
		borderless: "",
		"use-input": "",
		"input-debounce": "300",
		value: a.getParamValue(n),
		options: e.paramsAutocompleteOptions[n],
		autofocus: n === 0,
		"dropdown-icon": "search",
		onKeydown: Ce(function(e) {
			a.backIfNeeded(e, n === 0);
		}, ["delete"]),
		onKeyup: Ce(function(e) {
			a.backIfNeeded(e, n === 0);
		}, ["esc"]),
		onFilter: (r) => a.autocompleteParam(t, n, e.val, e.update, e.abort),
		"onUpdate:modelValue": (t) => a.selectParam(e.newValue, n),
		style: { height: "32px" }
	}, null, 8, [
		"value",
		"options",
		"autofocus",
		"onKeydown",
		"onKeyup",
		"onFilter",
		"onUpdate:modelValue"
	])) : (x(), ye(s, {
		key: 1,
		class: "col q-px-xs",
		color: "secondary",
		borderless: "",
		modelValue: e.commandParamsValues[n].value,
		"onUpdate:modelValue": (t) => e.commandParamsValues[n].value = t,
		onKeydown: Ce((t) => a.backIfNeeded(e.event, n === 0), ["delete"]),
		onKeyup: [Ce((t) => a.backIfNeeded(e.event, n === 0), ["esc"]), Ce((e) => a.handleEnter(n), ["enter"])],
		autofocus: n === 0,
		dense: "",
		style: { height: "32px" }
	}, null, 8, [
		"modelValue",
		"onUpdate:modelValue",
		"onKeydown",
		"onKeyup",
		"autofocus"
	])), we(c, { vertical: "" })], 64))), 128)) : (x(), S("div", ke, he(e.$q.lang.vui.commands.executeCommand), 1)), we(l, {
		onClick: a.executeCommand,
		flat: "",
		icon: "play_arrow",
		size: "sm",
		round: ""
	}, null, 8, ["onClick"])]))], 32)) : (x(), ye(o, {
		key: 0,
		placeholder: e.$q.lang.vui.commands.globalPlaceholder,
		outlined: "",
		"bg-color": "white",
		dense: "",
		ref: "commandInput",
		autofocus: "",
		"dropdown-icon": "search",
		onBlur: a.reset,
		"use-input": "",
		"input-debounce": "300",
		"hide-selected": "",
		onKeydown: a.commitCommand,
		options: e.commandAutocompleteOptions,
		onFilter: a.searchCommands,
		"onUpdate:modelValue": a.selectCommand
	}, {
		default: ve(() => [e.text !== "" && e.selectedCommand.commandName && e.selectedCommand.commandName.startsWith(e.text) ? (x(), S("span", Ee, he(e.selectedCommand.commandName), 1)) : ge("", !0)]),
		_: 1
	}, 8, [
		"placeholder",
		"onBlur",
		"onKeydown",
		"options",
		"onFilter",
		"onUpdate:modelValue"
	]))]);
}
var Ne = /*#__PURE__*/ l(me, [["render", Me]]), Pe = window.Quasar, Fe = {
	props: {
		concept: { type: String },
		id: { type: String },
		icon: {
			type: String,
			default: "comment"
		},
		iconNone: {
			type: String,
			default: "add_comment"
		},
		baseUrl: {
			type: String,
			default: "/api/",
			required: !0
		},
		connectedAccount: { type: String },
		color: {
			type: String,
			default: "primary"
		},
		textColor: {
			type: String,
			default: "white"
		},
		flat: {
			type: Boolean,
			default: !1
		}
	},
	data: function() {
		return {
			list: [],
			count: 0,
			commentDrawer: !1,
			commentTextArea: ""
		};
	},
	created: function() {
		this.fetchCommentsList();
	},
	methods: {
		fetchCommentsList: function() {
			this.$http.get(this.baseUrl + "x/comment/api/comments?concept=" + this.concept + "&id=" + this.id).then(function(e) {
				this.list = e.data, this.count = this.list.length;
			}.bind(this));
		},
		publishComment: function() {
			var e = { msg: this.commentTextArea };
			e.msg && (e.concept = this.concept, e.id = this.id, this.$http.post(this.baseUrl + "x/comment/api/comments?concept=" + this.concept + "&id=" + this.id, e).then(function() {
				this.commentTextArea = "", this.fetchCommentsList();
			}.bind(this)));
		},
		updateComment: function(e) {
			this.$http.put(this.baseUrl + "x/comment/api/comments/" + e.uuid, e).then(function() {
				this.commentTextArea = "", this.fetchCommentsList();
			}.bind(this));
		},
		toDelay: function(e) {
			let t = Pe.date.getDateDiff(Date.now(), e, "days");
			return t > 0 ? t + " days" : (t = Pe.date.getDateDiff(Date.now(), e, "hours"), t > 0 ? t + " hours" : (t = Pe.date.getDateDiff(Date.now(), e, "minutes"), t > 0 ? t + " min" : "Now"));
		}
	}
}, Ie = window.Vue.toDisplayString, Le = window.Vue.createTextVNode, C = window.Vue.resolveComponent, w = window.Vue.withCtx, Re = window.Vue.openBlock, ze = window.Vue.createBlock, Be = window.Vue.createCommentVNode, T = window.Vue.createVNode, Ve = window.Vue.renderList, He = window.Vue.Fragment, Ue = window.Vue.createElementBlock, We = window.Vue.createElementVNode, Ge = window.Vue.normalizeClass, Ke = ["src"];
function qe(e, t, n, r, i, a) {
	let o = C("q-badge"), s = C("q-btn"), c = C("big"), l = C("q-item-label"), u = C("q-input"), d = C("q-item-section"), f = C("q-item"), p = C("q-separator"), m = C("q-avatar"), h = C("q-icon"), g = C("q-popup-edit"), _ = C("q-list"), v = C("q-drawer");
	return Re(), Ue("span", null, [T(s, {
		round: "",
		flat: n.flat,
		size: "lg",
		color: n.color,
		"text-color": n.textColor,
		icon: e.count > 0 ? n.icon : n.iconNone,
		onClick: t[0] ||= (t) => e.commentDrawer = !e.commentDrawer,
		class: "on-left",
		title: e.$q.lang.vui.comments.title
	}, {
		default: w(() => [e.count > 0 ? (Re(), ze(o, {
			key: 0,
			floating: "",
			small: "",
			color: "red",
			style: {
				right: "-.4em",
				top: "-.4em"
			}
		}, {
			default: w(() => [Le(Ie(e.count), 1)]),
			_: 1
		})) : Be("", !0)]),
		_: 1
	}, 8, [
		"flat",
		"color",
		"text-color",
		"icon",
		"title"
	]), T(v, {
		overlay: "",
		behavior: "mobile",
		width: 600,
		modelValue: e.commentDrawer,
		"onUpdate:modelValue": t[2] ||= (t) => e.commentDrawer = t,
		side: "right",
		style: { top: "58px" }
	}, {
		default: w(() => [T(_, null, {
			default: w(() => [
				T(l, { header: "" }, {
					default: w(() => [T(c, null, {
						default: w(() => [Le(Ie(e.$q.lang.vui.comments.title), 1)]),
						_: 1
					})]),
					_: 1
				}),
				T(f, null, {
					default: w(() => [T(d, null, {
						default: w(() => [T(u, {
							class: "col",
							type: "textarea",
							autogrow: "",
							modelValue: e.commentTextArea,
							"onUpdate:modelValue": t[1] ||= (t) => e.commentTextArea = t,
							label: e.$q.lang.vui.comments.inputLabel,
							"stack-label": ""
						}, null, 8, ["modelValue", "label"])]),
						_: 1
					}), T(d, { side: "" }, {
						default: w(() => [T(s, {
							color: "primary",
							round: "",
							icon: "send",
							title: e.$q.lang.vui.comments.actionLabel,
							"aria-label": e.$q.lang.vui.comments.actionLabel,
							onClick: a.publishComment
						}, null, 8, [
							"title",
							"aria-label",
							"onClick"
						])]),
						_: 1
					})]),
					_: 1
				}),
				T(p),
				(Re(!0), Ue(He, null, Ve(e.list, (t) => (Re(), ze(f, {
					key: t.uuid,
					class: Ge(["items-start", { "cursor-pointer": t.author == n.connectedAccount }])
				}, {
					default: w(() => [
						T(d, { avatar: "" }, {
							default: w(() => [T(m, null, {
								default: w(() => [We("img", { src: n.baseUrl + "x/accounts/api/" + t.author + "/photo" }, null, 8, Ke)]),
								_: 2
							}, 1024)]),
							_: 2
						}, 1024),
						T(d, null, {
							default: w(() => [T(l, null, {
								default: w(() => [Le(Ie(t.authorDisplayName), 1)]),
								_: 2
							}, 1024), We("div", null, Ie(t.msg), 1)]),
							_: 2
						}, 1024),
						T(d, { side: "" }, {
							default: w(() => [T(l, { stamp: "" }, {
								default: w(() => [Le(Ie(a.toDelay(new Date(t.creationDate))), 1)]),
								_: 2
							}, 1024), t.author == n.connectedAccount ? (Re(), ze(h, {
								key: 0,
								name: "edit"
							})) : Be("", !0)]),
							_: 2
						}, 1024),
						t.author == n.connectedAccount ? (Re(), ze(g, {
							key: 0,
							buttons: !0,
							onSave: (e) => a.updateComment(t),
							"label-cancel": e.$q.lang.vui.comments.cancel,
							"label-set": e.$q.lang.vui.comments.save
						}, {
							default: w(() => [T(u, {
								type: "textarea",
								autogrow: "",
								modelValue: t.msg,
								"onUpdate:modelValue": (e) => t.msg = e,
								dense: ""
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 2
						}, 1032, [
							"onSave",
							"label-cancel",
							"label-set"
						])) : Be("", !0)
					]),
					_: 2
				}, 1032, ["class"]))), 128))
			]),
			_: 1
		})]),
		_: 1
	}, 8, ["modelValue"])]);
}
var Je = /*#__PURE__*/ l(Fe, [["render", qe]]), Ye = {
	props: { activeSkills: {
		type: Array,
		required: !0
	} },
	data: function() {
		return { extensions: [] };
	},
	created: function() {
		var e = [
			{
				name: "vertigo-audit",
				label: "Audit",
				description: "Trace every single aspect of your app through exhaustive logging capabilities.",
				color: "#F7578C",
				icon: "fas fa-clipboard-list",
				enabled: !1
			},
			{
				name: "vertigo-dashboard",
				label: "Dashboard",
				description: "Monitor you system to make sure your app meets the customer requirements.",
				color: "#742774",
				icon: "fas fa-chart-line",
				enabled: !1
			},
			{
				name: "vertigo-geo",
				label: "Geo",
				description: "Enhance your data by enabling geographic functions and tools.",
				icon: "fas fa-globe",
				color: "#0E2947",
				enabled: !1
			},
			{
				name: "vertigo-ledger",
				label: "Ledger",
				description: "Use a blockchain to enforce secure transactions in your app !",
				icon: "fas fa-link",
				color: "#00AC5C",
				enabled: !1
			},
			{
				name: "vertigo-orchestra",
				label: "Orchestra",
				description: "Manage jobs and monitor their status with this powerfull control tower.",
				color: "#FC636B",
				icon: "fas fa-tasks",
				enabled: !1
			},
			{
				name: "vertigo-quarto",
				label: "Quarto",
				description: "Generate slick documents and reports using the Quarto template engine.",
				color: "#0747A6",
				icon: "fas fa-file-invoice",
				enabled: !1
			},
			{
				name: "vertigo-social",
				label: "Social",
				description: "Ensure real time communication and collaboration between your app users.",
				color: "#FF3366",
				icon: "far fa-comments",
				enabled: !1
			},
			{
				name: "vertigo-stella",
				label: "Stella",
				description: "Enable multi-node task dispatching for your app and assign specific tasks to each node.",
				color: "#0066FF",
				icon: "fas fa-network-wired",
				enabled: !1
			}
		];
		e.forEach(function(e) {
			e.enabled = this.$props.activeSkills.indexOf(e.name) > -1;
		}.bind(this)), this.extensions = e;
	},
	methods: { getIconStyle: function(e) {
		return "border: 3px solid " + e + "; background-color: " + e + "; color: white; padding: 5px; width: 70px; height: 70px;";
	} }
}, Xe = window.Vue.renderList, Ze = window.Vue.Fragment, Qe = window.Vue.openBlock, $e = window.Vue.createElementBlock, et = window.Vue.resolveComponent, tt = window.Vue.normalizeStyle, nt = window.Vue.createVNode, rt = window.Vue.withCtx, it = window.Vue.toDisplayString, at = window.Vue.createElementVNode, ot = { class: "row q-col-gutter-md" }, st = { class: "row col items-center" }, ct = { class: "q-subheading text-bold" }, lt = { class: "row col q-body-2 text-justify" };
function ut(e, t, n, r, i, a) {
	let o = et("q-icon"), s = et("q-item-section"), c = et("q-toggle"), l = et("q-item"), u = et("q-card");
	return Qe(), $e("div", ot, [(Qe(!0), $e(Ze, null, Xe(e.extensions, (e) => (Qe(), $e("div", {
		class: "col-xs-12 col-lg-6 col-xl-4",
		key: e.name
	}, [nt(u, null, {
		default: rt(() => [nt(l, {
			class: "bg-white",
			style: { height: "100px" }
		}, {
			default: rt(() => [nt(s, { avatar: "" }, {
				default: rt(() => [nt(o, {
					name: e.icon,
					size: "40px",
					style: tt(a.getIconStyle(e.color))
				}, null, 8, ["name", "style"])]),
				_: 2
			}, 1024), nt(s, null, {
				default: rt(() => [at("div", st, [
					at("div", ct, it(e.label), 1),
					t[0] ||= at("div", { class: "col" }, null, -1),
					at("div", null, [nt(c, {
						disable: "",
						readonly: "",
						color: "positive",
						modelValue: e.enabled,
						"onUpdate:modelValue": (t) => e.enabled = t
					}, null, 8, ["modelValue", "onUpdate:modelValue"])])
				]), at("div", lt, it(e.description), 1)]),
				_: 2
			}, 1024)]),
			_: 2
		}, 1024)]),
		_: 2
	}, 1024)]))), 128))]);
}
var dt = /*#__PURE__*/ l(Ye, [["render", ut]]), ft = {
	props: {
		facets: Array,
		selectedFacets: Object,
		contextKey: String,
		facetValueTranslatorProvider: Function,
		facetTranslatorProvider: Function,
		layout: {
			type: String,
			default: "vertical"
		},
		render: {
			type: String,
			default: "list"
		},
		facetFilter: {
			type: Function,
			default: () => !0
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
		};
	},
	created: function() {
		this.facetValueTranslatorProvider !== void 0 && this.facetValueTranslatorProvider(this);
	},
	methods: {
		addFacetValueTranslator(e, t) {
			this.codeToLabelTranslater[e] = t;
		},
		facetByCode(e) {
			return this.facets.filter(function(t) {
				return t.code === e;
			})[0];
		},
		facetValueByCode(e, t) {
			return this.facetByCode(e).values.filter(function(e) {
				return e.code === t;
			})[0];
		},
		facetLabelByCode(e) {
			let t = this.facetByCode(e);
			return this.facetTranslatorProvider ? this.facetTranslatorProvider(t) : t.label;
		},
		facetMultipleByCode(e) {
			return this.facetByCode(e).multiple;
		},
		facetValueLabelByCode(e, t) {
			if (this.codeToLabelTranslater[e]) return this.codeToLabelTranslater[e](e, t);
			var n = this.facetValueByCode(e, t);
			return n ? n.label : t;
		},
		isFacetValueSelected(e, t) {
			return this.selectedFacets[e].includes(t);
		},
		isFacetSelected(e) {
			return this.selectedFacets[e] ? this.selectedFacets[e].length > 0 : !1;
		},
		isAnyFacetValueSelected() {
			return Object.keys(this.selectedFacets).some(function(e) {
				return !this.facetMultipleByCode(e);
			}.bind(this));
		},
		expandFacet(e) {
			this.isFacetExpanded(e) || this.$data.expandedFacets.push(e);
		},
		reduceFacet(e) {
			this.isFacetExpanded(e) && this.$data.expandedFacets.splice(this.$data.expandedFacets.indexOf(e), 1);
		},
		isFacetExpanded(e) {
			return this.$data.expandedFacets.includes(e);
		},
		selectedInvisibleFacets(e) {
			return this.selectedFacets[e].filter((t) => !this.facetValueByCode(e, t)).map((e) => {
				var t = {};
				return t.code = e, t.label = e, t.count = 0, t;
			});
		},
		visibleFacets(e, t) {
			return this.isFacetExpanded(e) ? t : t.slice(0, this.maxValues);
		}
	}
}, pt = window.Vue.renderList, mt = window.Vue.Fragment, E = window.Vue.openBlock, D = window.Vue.createElementBlock, ht = window.Vue.resolveComponent, O = window.Vue.createVNode, k = window.Vue.withCtx, A = window.Vue.toDisplayString, j = window.Vue.createTextVNode, gt = window.Vue.mergeProps, M = window.Vue.createBlock, _t = window.Vue.createCommentVNode, vt = window.Vue.normalizeClass, yt = {
	key: 1,
	class: "facets"
}, bt = {
	key: 0,
	class: "selectedFacets q-pb-md"
};
function xt(e, t, n, r, i, a) {
	let o = ht("q-checkbox"), s = ht("q-item-section"), c = ht("q-item-label"), l = ht("q-chip"), u = ht("q-item"), d = ht("q-select"), f = ht("q-btn"), p = ht("q-list");
	return n.render === "selects" ? (E(), D("div", {
		key: 0,
		class: vt(["row col q-gutter-md", { "horizontal-facets": n.layout === "horizontal" }])
	}, [(E(!0), D(mt, null, pt(n.facets.filter(n.facetFilter), (t) => (E(), D("div", {
		key: t.code,
		class: "facet-select"
	}, [t.multiple ? (E(), M(d, {
		key: 0,
		label: a.facetLabelByCode(t.code),
		"model-value": n.selectedFacets[t.code],
		multiple: "",
		onAdd: (r) => e.$emit("toogle-facet", t.code, r.value.code, n.contextKey),
		onRemove: (r) => e.$emit("toogle-facet", t.code, r.value, n.contextKey),
		options: a.selectedInvisibleFacets(t.code).concat(t.values),
		"option-value": "code",
		"use-chips": "",
		outlined: "",
		"input-class": "no-wrap"
	}, {
		option: k(({ itemProps: e, opt: t, selected: n, toggleOption: r }) => [O(u, gt({ ref_for: !0 }, e, {
			class: "facet-selection-option",
			dense: ""
		}), {
			default: k(() => [
				O(s, { avatar: "" }, {
					default: k(() => [O(o, {
						"model-value": n,
						"onUpdate:modelValue": (e) => r(t),
						size: "sm"
					}, null, 8, ["model-value", "onUpdate:modelValue"])]),
					_: 2
				}, 1024),
				O(s, null, {
					default: k(() => [O(c, null, {
						default: k(() => [j(A(t.label), 1)]),
						_: 2
					}, 1024)]),
					_: 2
				}, 1024),
				O(s, { side: "" }, {
					default: k(() => [O(l, {
						label: t.count,
						size: "sm"
					}, null, 8, ["label"])]),
					_: 2
				}, 1024)
			]),
			_: 2
		}, 1040)]),
		_: 1
	}, 8, [
		"label",
		"model-value",
		"onAdd",
		"onRemove",
		"options"
	])) : (E(), M(d, {
		key: 1,
		label: a.facetLabelByCode(t.code),
		"model-value": n.selectedFacets[t.code].length > 0 ? n.selectedFacets[t.code][0] : null,
		"onUpdate:modelValue": (r) => e.$emit("toogle-facet", t.code, r || n.selectedFacets[t.code][0], n.contextKey),
		options: a.selectedInvisibleFacets(t.code).concat(t.values),
		"option-value": "code",
		clearable: "",
		"emit-value": "",
		"map-options": "",
		outlined: "",
		"input-class": "no-wrap"
	}, {
		option: k(({ itemProps: e, opt: t, selected: n, toggleOption: r }) => [O(u, gt({ ref_for: !0 }, e, {
			class: "facet-selection-option",
			dense: ""
		}), {
			default: k(() => [O(s, null, {
				default: k(() => [O(c, null, {
					default: k(() => [j(A(t.label), 1)]),
					_: 2
				}, 1024)]),
				_: 2
			}, 1024), O(s, { side: "" }, {
				default: k(() => [O(l, {
					label: t.count,
					size: "sm"
				}, null, 8, ["label"])]),
				_: 2
			}, 1024)]),
			_: 2
		}, 1040)]),
		_: 1
	}, 8, [
		"label",
		"model-value",
		"onUpdate:modelValue",
		"options"
	]))]))), 128))], 2)) : (E(), D("div", yt, [a.isAnyFacetValueSelected() ? (E(), D("div", bt, [(E(!0), D(mt, null, pt(n.selectedFacets, (t, r) => (E(), D("div", { key: r }, [a.facetMultipleByCode(r) ? _t("", !0) : (E(!0), D(mt, { key: 0 }, pt(t, (t) => (E(), M(l, {
		clickable: "",
		class: "q-mb-sm",
		key: t.code,
		onClick: (i) => e.$emit("toogle-facet", r, t, n.contextKey),
		"icon-right": "cancel"
	}, {
		default: k(() => [j(A(a.facetLabelByCode(r)) + ": " + A(a.facetValueLabelByCode(r, t)), 1)]),
		_: 2
	}, 1032, ["onClick"]))), 128))]))), 128))])) : _t("", !0), (E(!0), D(mt, null, pt(n.facets.filter(n.facetFilter), (t) => (E(), M(p, {
		key: t.code,
		class: "facetValues q-py-none",
		dense: ""
	}, {
		default: k(() => [t.multiple || !a.isFacetSelected(t.code) ? (E(), D(mt, { key: 0 }, [
			O(c, { header: "" }, {
				default: k(() => [j(A(a.facetLabelByCode(t.code)), 1)]),
				_: 2
			}, 1024),
			(E(!0), D(mt, null, pt(a.selectedInvisibleFacets(t.code), (r) => (E(), M(u, {
				key: r.code,
				class: "facetValue q-ml-md",
				clickable: "",
				onClick: (i) => e.$emit("toogle-facet", t.code, r.code, n.contextKey)
			}, {
				default: k(() => [
					t.multiple ? (E(), M(s, {
						key: 0,
						side: ""
					}, {
						default: k(() => [O(o, {
							dense: "",
							modelValue: !0,
							"onUpdate:modelValue": (i) => e.$emit("toogle-facet", t.code, r.code, n.contextKey)
						}, null, 8, ["onUpdate:modelValue"])]),
						_: 2
					}, 1024)) : _t("", !0),
					O(s, null, {
						default: k(() => [j(A(a.facetValueLabelByCode(t.code, r.code)), 1)]),
						_: 2
					}, 1024),
					O(s, { side: "" }, {
						default: k(() => [j(A(r.count), 1)]),
						_: 2
					}, 1024)
				]),
				_: 2
			}, 1032, ["onClick"]))), 128)),
			(E(!0), D(mt, null, pt(a.visibleFacets(t.code, t.values), (r) => (E(), M(u, {
				key: r.code,
				class: "facetValue q-ml-md",
				clickable: "",
				onClick: (i) => e.$emit("toogle-facet", t.code, r.code, n.contextKey)
			}, {
				default: k(() => [
					t.multiple ? (E(), M(s, {
						key: 0,
						side: ""
					}, {
						default: k(() => [O(o, {
							dense: "",
							modelValue: a.isFacetValueSelected(t.code, r.code),
							"onUpdate:modelValue": (i) => e.$emit("toogle-facet", t.code, r.code, n.contextKey)
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						_: 2
					}, 1024)) : _t("", !0),
					O(s, null, {
						default: k(() => [j(A(a.facetValueLabelByCode(t.code, r.code)), 1)]),
						_: 2
					}, 1024),
					O(s, { side: "" }, {
						default: k(() => [j(A(r.count), 1)]),
						_: 2
					}, 1024)
				]),
				_: 2
			}, 1032, ["onClick"]))), 128)),
			O(u, null, {
				default: k(() => [t.values.length > n.maxValues && !a.isFacetExpanded(t.code) ? (E(), M(f, {
					key: 0,
					flat: "",
					onClick: (e) => a.expandFacet(t.code),
					class: "q-ma-none"
				}, {
					default: k(() => [j(A(e.$q.lang.vui.facets.showAll), 1)]),
					_: 1
				}, 8, ["onClick"])) : _t("", !0), t.values.length > n.maxValues && a.isFacetExpanded(t.code) ? (E(), M(f, {
					key: 1,
					flat: "",
					onClick: (e) => a.reduceFacet(t.code),
					class: "q-ma-none"
				}, {
					default: k(() => [j(A(e.$q.lang.vui.facets.showLess), 1)]),
					_: 1
				}, 8, ["onClick"])) : _t("", !0)]),
				_: 2
			}, 1024)
		], 64)) : _t("", !0)]),
		_: 2
	}, 1024))), 128))]));
}
var St = /*#__PURE__*/ l(ft, [["render", xt]]), Ct = {
	props: { modelValue: { type: Object } },
	emits: ["update:modelValue"],
	data: function() {
		return { inputObject: this.$props.modelValue ? this.$props.modelValue : {} };
	},
	watch: { modelValue: function(e) {
		this.$data.inputObject = e || {}, this.updateJson();
	} },
	beforeMount() {
		this.updateJson();
	},
	methods: { updateJson() {
		var e;
		this.$props.modelValue && (e = JSON.stringify({
			lon: this.$data.inputObject.lon,
			lat: this.$data.inputObject.lat
		}), this.$props.modelValue._v_inputValue = e), this.$emit("update:modelValue", this.$data.inputObject);
	} }
}, wt = window.Vue.renderSlot, Tt = window.Vue.vModelText, Et = window.Vue.createElementVNode, Dt = window.Vue.withDirectives, Ot = window.Vue.createTextVNode, kt = { class: "inputs" };
function At(e, t, n, r, i, a) {
	return wt(e.$slots, "default", { updateJson: a.updateJson }, () => [Et("div", kt, [
		t[4] ||= Ot(" Longitude ", -1),
		Dt(Et("input", { "onUpdate:modelValue": [t[0] ||= (t) => e.inputObject.lon = t, t[1] ||= (...e) => a.updateJson && a.updateJson(...e)] }, null, 512), [[
			Tt,
			e.inputObject.lon,
			void 0,
			{ number: !0 }
		]]),
		t[5] ||= Ot(" Latitude ", -1),
		Dt(Et("input", { "onUpdate:modelValue": [t[2] ||= (t) => e.inputObject.lat = t, t[3] ||= (...e) => a.updateJson && a.updateJson(...e)] }, null, 512), [[
			Tt,
			e.inputObject.lat,
			void 0,
			{ number: !0 }
		]])
	])]);
}
var jt = /*#__PURE__*/ l(Ct, [["render", At]]), Mt = {
	props: { baseUrl: {
		type: String,
		default: "/"
	} },
	data: function() {
		return {
			text: "",
			handles: []
		};
	},
	methods: { searchHandles: function(e) {
		e && this.$http.post(this.baseUrl + "api/vertigo/handle/_search", { prefix: e }).then(function(e) {
			this.$data.handles = e.data;
		}.bind(this));
	} }
}, Nt = window.Vue.resolveComponent, Pt = window.Vue.createVNode, Ft = window.Vue.withCtx, It = window.Vue.renderList, Lt = window.Vue.Fragment, Rt = window.Vue.openBlock, zt = window.Vue.createElementBlock, Bt = window.Vue.toDisplayString, Vt = window.Vue.createTextVNode, Ht = window.Vue.resolveDirective, Ut = window.Vue.createBlock, Wt = window.Vue.withDirectives;
function Gt(e, t, n, r, i, a) {
	let o = Nt("q-icon"), s = Nt("q-input"), c = Nt("q-item-section"), l = Nt("q-item"), u = Nt("q-list"), d = Ht("ripple");
	return Rt(), zt("div", null, [Pt(s, {
		placeholder: e.$q.lang.vui.handles.placeholder,
		modelValue: e.text,
		"onUpdate:modelValue": t[0] ||= (t) => e.text = t,
		debounce: 300,
		onInput: a.searchHandles,
		autofocus: "",
		outlined: "",
		"bg-color": "white",
		dense: ""
	}, {
		prepend: Ft(() => [Pt(o, { name: "search" })]),
		_: 1
	}, 8, [
		"placeholder",
		"modelValue",
		"onInput"
	]), Pt(u, {
		bordered: "",
		dense: "",
		separator: ""
	}, {
		default: Ft(() => [(Rt(!0), zt(Lt, null, It(e.handles, (t) => Wt((Rt(), Ut(l, {
			clickable: "",
			onClick: (r) => e.VUi.methods.goTo(n.baseUrl + "hw/" + t.code),
			key: t.code
		}, {
			default: Ft(() => [Pt(c, null, {
				default: Ft(() => [Vt(Bt(t.code), 1)]),
				_: 2
			}, 1024)]),
			_: 2
		}, 1032, ["onClick"])), [[d]])), 128))]),
		_: 1
	})]);
}
var Kt = /*#__PURE__*/ l(Mt, [["render", Gt]]), qt = {
	props: {
		modelValue: {
			type: String,
			required: !0
		},
		readonly: {
			type: Boolean,
			required: !0
		},
		cols: {
			type: Number,
			default: 2
		}
	},
	emits: ["update:modelValue"],
	data: function() {
		return { jsonAsObject: JSON.parse(this.$props.modelValue) };
	},
	watch: { modelValue: function(e) {
		this.$data.jsonAsObject = JSON.parse(e);
	} },
	methods: { updateJson() {
		this.$emit("update:modelValue", JSON.stringify(this.$data.jsonAsObject));
	} }
}, Jt = window.Vue.renderList, Yt = window.Vue.Fragment, Xt = window.Vue.openBlock, Zt = window.Vue.createElementBlock, Qt = window.Vue.resolveComponent, $t = window.Vue.createBlock;
window.Vue.createCommentVNode;
var en = window.Vue.toDisplayString, tn = window.Vue.createElementVNode, nn = window.Vue.withCtx, rn = window.Vue.normalizeClass, an = { class: "row" };
function on(e, t, n, r, i, a) {
	let o = Qt("q-input"), s = Qt("q-field");
	return Xt(), Zt("div", an, [(Xt(!0), Zt(Yt, null, Jt(e.jsonAsObject, (t, r) => (Xt(), Zt("div", {
		key: r,
		class: rn("col-" + 12 / n.cols)
	}, [n.readonly ? (Xt(), $t(s, {
		key: 1,
		label: r,
		orientation: "vertical",
		"stack-label": "",
		borderless: "",
		readonly: ""
	}, {
		default: nn(() => [tn("span", null, en(t), 1)]),
		_: 2
	}, 1032, ["label"])) : (Xt(), $t(o, {
		key: 0,
		label: r,
		orientation: "vertical",
		"stack-label": "",
		modelValue: e.jsonAsObject[r],
		"onUpdate:modelValue": [(t) => e.jsonAsObject[r] = t, a.updateJson]
	}, null, 8, [
		"label",
		"modelValue",
		"onUpdate:modelValue"
	]))], 2))), 128))]);
}
var sn = /*#__PURE__*/ l(qt, [["render", on]]), cn = window.Quasar, ln = {
	props: {
		icon: {
			type: String,
			default: "notifications"
		},
		iconNone: {
			type: String,
			default: "notifications_none"
		},
		iconError: {
			type: String,
			default: "warning"
		},
		color: {
			type: String,
			default: "secondary"
		},
		colorNew: {
			type: String,
			default: "accent"
		},
		textColor: {
			type: String,
			default: "secondary-inverted"
		},
		textColorNew: {
			type: String,
			default: "accent-inverted"
		},
		typeIconMap: {
			type: Object,
			default: function() {
				return {};
			}
		},
		baseUrl: {
			type: String,
			default: "/api/",
			required: !0
		},
		targetUrlPrefix: {
			type: String,
			default: "/",
			required: !0
		}
	},
	data: function() {
		return {
			firstCall: !0,
			list: [],
			hasNew: !1,
			wasError: !1,
			count: 0,
			timer: ""
		};
	},
	created: function() {
		this.fetchNotificationsList(), this.timer = setInterval(this.fetchNotificationsList, 5e3);
	},
	methods: {
		fetchNotificationsList: function() {
			this.$http.get(this.baseUrl + "x/notifications/api/messages", {
				timeout: 5 * 1e3,
				vNoDefaultErrorHandler: !0
			}).then(function(e) {
				this.updateNotificationsData(e.data), this.wasError && (clearInterval(this.timer), this.timer = setInterval(this.fetchNotificationsList, 5e3)), this.wasError = !1;
			}.bind(this)).catch(function() {
				this.wasError || (clearInterval(this.timer), this.timer = setInterval(this.fetchNotificationsList, 6e4)), this.wasError = !0;
			}.bind(this));
		},
		updateNotificationsData: function(e) {
			let t = e.sort(function(e, t) {
				return t.creationDate - e.creationDate;
			});
			var n = [], r = this.list[0];
			if (!r) n = t;
			else for (var i = 0; i < t.length; i++) if (t[i].uuid != r.uuid) {
				if (t[i].creationDate < r.creationDate) break;
				n.push(t[i]);
			}
			this.list = t, this.count = t.length, this.firstCall ? this.hasNew = n.length > 0 && cn.date.getDateDiff(Date.now(), n[0].creationDate, "seconds") < 10 : (this.hasNew = n.length > 0, n.forEach(function(e) {
				this.$q.notify({
					type: "info",
					icon: this.toIcon(e.type),
					message: e.title,
					detail: e.content,
					timeout: 3e3,
					position: "bottom-right"
				});
			}.bind(this))), this.firstCall = !1;
		},
		cancelAutoUpdate: function() {
			clearInterval(this.timer);
		},
		toIcon: function(e) {
			return this.typeIconMap[e] || "mail";
		},
		toDelay: function(e) {
			let t = cn.date.getDateDiff(Date.now(), e, "days");
			return t > 0 ? t + " " + this.$q.lang.vui.notifications.days : (t = cn.date.getDateDiff(Date.now(), e, "hours"), t > 0 ? t + " " + this.$q.lang.vui.notifications.hours : (t = cn.date.getDateDiff(Date.now(), e, "minutes"), t > 0 ? t + " " + this.$q.lang.vui.notifications.minutes : (t = cn.date.getDateDiff(Date.now(), e, "seconds"), t + " " + this.$q.lang.vui.notifications.seconds)));
		}
	},
	beforeDestroy: function() {
		clearInterval(this.timer);
	}
}, un = window.Vue.toDisplayString, dn = window.Vue.createTextVNode, N = window.Vue.resolveComponent, P = window.Vue.withCtx, fn = window.Vue.openBlock, pn = window.Vue.createBlock, mn = window.Vue.createCommentVNode, hn = window.Vue.renderList, gn = window.Vue.Fragment, _n = window.Vue.createElementBlock, F = window.Vue.createVNode;
function vn(e, t, n, r, i, a) {
	let o = N("q-badge"), s = N("q-icon"), c = N("q-item-section"), l = N("q-item-label"), u = N("q-item"), d = N("q-list"), f = N("q-menu"), p = N("q-btn");
	return fn(), pn(p, {
		round: "",
		flat: !e.hasNew,
		dense: "",
		color: e.hasNew ? n.colorNew : n.color,
		"text-color": e.hasNew ? n.textColorNew : n.textColor,
		icon: e.wasError ? n.iconError : e.count > 0 ? n.icon : n.iconNone,
		title: e.wasError ? e.$q.lang.vui.notifications.serverLost : ""
	}, {
		default: P(() => [e.count > 0 ? (fn(), pn(o, {
			key: 0,
			color: "red",
			"text-color": "white",
			floating: ""
		}, {
			default: P(() => [dn(un(e.count), 1)]),
			_: 1
		})) : mn("", !0), F(f, { class: "notifications" }, {
			default: P(() => [F(d, { style: { width: "300px" } }, {
				default: P(() => [(fn(!0), _n(gn, null, hn(e.list, (e) => (fn(), pn(u, {
					key: e.uuid,
					tag: "a",
					href: n.targetUrlPrefix + e.targetUrl
				}, {
					default: P(() => [
						F(c, { avatar: "" }, {
							default: P(() => [F(s, {
								name: a.toIcon(e.type),
								size: "2rem"
							}, null, 8, ["name"])]),
							_: 2
						}, 1024),
						F(c, null, {
							default: P(() => [F(l, null, {
								default: P(() => [dn(un(e.title), 1)]),
								_: 2
							}, 1024), F(l, {
								caption: "",
								lines: "3"
							}, {
								default: P(() => [dn(un(e.content), 1)]),
								_: 2
							}, 1024)]),
							_: 2
						}, 1024),
						F(c, {
							side: "",
							top: ""
						}, {
							default: P(() => [F(l, { caption: "" }, {
								default: P(() => [dn(un(a.toDelay(new Date(e.creationDate))), 1)]),
								_: 2
							}, 1024)]),
							_: 2
						}, 1024)
					]),
					_: 2
				}, 1032, ["href"]))), 128))]),
				_: 1
			})]),
			_: 1
		})]),
		_: 1
	}, 8, [
		"flat",
		"color",
		"text-color",
		"icon",
		"title"
	]);
}
var yn = /*#__PURE__*/ l(ln, [["render", vn]]), bn = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
	var n = NaN, r = /^\s+|\s+$/g, i = /^[-+]0x[0-9a-f]+$/i, a = /^0b[01]+$/i, o = /^0o[0-7]+$/i, s = parseInt, c = typeof global == "object" && global && global.Object === Object && global, l = typeof self == "object" && self && self.Object === Object && self, u = c || l || Function("return this")(), d = Object.prototype.toString, f = Math.max, p = Math.min, m = function() {
		return u.Date.now();
	};
	function h(e, t, n) {
		var r, i, a, o, s, c, l = 0, u = !1, d = !1, h = !0;
		if (typeof e != "function") throw TypeError("Expected a function");
		t = y(t) || 0, g(n) && (u = !!n.leading, d = "maxWait" in n, a = d ? f(y(n.maxWait) || 0, t) : a, h = "trailing" in n ? !!n.trailing : h);
		function _(t) {
			var n = r, a = i;
			return r = i = void 0, l = t, o = e.apply(a, n), o;
		}
		function v(e) {
			return l = e, s = setTimeout(te, t), u ? _(e) : o;
		}
		function ee(e) {
			var n = e - c, r = e - l, i = t - n;
			return d ? p(i, a - r) : i;
		}
		function b(e) {
			var n = e - c, r = e - l;
			return c === void 0 || n >= t || n < 0 || d && r >= a;
		}
		function te() {
			var e = m();
			if (b(e)) return ne(e);
			s = setTimeout(te, ee(e));
		}
		function ne(e) {
			return s = void 0, h && r ? _(e) : (r = i = void 0, o);
		}
		function re() {
			s !== void 0 && clearTimeout(s), l = 0, r = c = i = s = void 0;
		}
		function ie() {
			return s === void 0 ? o : ne(m());
		}
		function ae() {
			var e = m(), n = b(e);
			if (r = arguments, i = this, c = e, n) {
				if (s === void 0) return v(c);
				if (d) return s = setTimeout(te, t), _(c);
			}
			return s === void 0 && (s = setTimeout(te, t)), o;
		}
		return ae.cancel = re, ae.flush = ie, ae;
	}
	function g(e) {
		var t = typeof e;
		return !!e && (t == "object" || t == "function");
	}
	function _(e) {
		return !!e && typeof e == "object";
	}
	function v(e) {
		return typeof e == "symbol" || _(e) && d.call(e) == "[object Symbol]";
	}
	function y(e) {
		if (typeof e == "number") return e;
		if (v(e)) return n;
		if (g(e)) {
			var t = typeof e.valueOf == "function" ? e.valueOf() : e;
			e = g(t) ? t + "" : t;
		}
		if (typeof e != "string") return e === 0 ? e : +e;
		e = e.replace(r, "");
		var c = a.test(e);
		return c || o.test(e) ? s(e.slice(2), c ? 2 : 8) : i.test(e) ? n : +e;
	}
	t.exports = h;
})))()), I = window.ol, xn = {
	props: {
		id: {
			type: String,
			required: !0
		},
		initialZoomLevel: { type: Number },
		initialCenter: { type: Object },
		search: { type: Boolean },
		overview: { type: Boolean }
	},
	emits: ["moveend", "click"],
	methods: {
		onMapLoad: function(e) {
			let t = this;
			function n() {
				t.olMap ? (e(t.olMap), t.postInit()) : setTimeout(n, 50);
			}
			n();
		},
		postInit() {
			this.$props.initialZoomLevel && this.olMap.getView().setZoom(this.$props.initialZoomLevel), this.olMap.vInitialZoomOverride && this.olMap.getView().setZoom(this.olMap.vInitialZoomOverride);
		}
	},
	mounted: function() {
		let e = new I.View(), t = new I.source.OSM(), n = new I.layer.Tile({
			preload: 4,
			source: t
		}), r = [Sn()];
		this.$props.overview && r.push(new I.control.OverviewMap({ layers: [new I.layer.Tile({ source: t })] })), this.$props.search && typeof Geocoder == "function" && r.push(new Geocoder("nominatim", {
			provider: "osm",
			lang: "fr",
			placeholder: "Search for ...",
			limit: 5,
			debug: !1,
			autoComplete: !0,
			keepOpen: !0,
			preventMarker: !0,
			defaultFlyResolution: 19
		})), this.olMap = new I.Map({
			interactions: I.interaction.defaults.defaults({ onFocusOnly: !0 }),
			target: this.$props.id,
			layers: [n],
			loadTilesWhileAnimating: !0,
			view: e,
			controls: I.control.defaults.defaults().extend(r)
		}), this.$props.initialCenter && this.olMap.getView().setCenter(I.proj.fromLonLat([this.$props.initialCenter.lon, this.$props.initialCenter.lat])), this.onMapMoveEndDebounced = (0, bn.default)((e, t) => {
			this.$emit("moveend", e, t);
		}, 300), this.olMap.on("moveend", function(e) {
			let t = e.map.getView().calculateExtent(), n = I.proj.transformExtent(t, "EPSG:3857", "EPSG:4326"), r = I.extent.getTopLeft(n), i = I.extent.getBottomRight(n);
			this.onMapMoveEndDebounced(r, i);
		}.bind(this)), this.onMapClickDebounced = (0, bn.default)((e) => {
			this.$emit("click", I.proj.transform(e, "EPSG:3857", "EPSG:4326"));
		}, 300), setTimeout(function() {
			this.olMap.on("click", function(e) {
				e.originalEvent.target instanceof HTMLCanvasElement && (e.stopPropagation(), this.onMapClickDebounced(e.coordinate));
			}.bind(this));
		}.bind(this), 300);
	}
};
function Sn() {
	return new class extends I.control.Control {
		constructor(e) {
			let t = e || {}, n = document.createElement("div");
			n.className = "ol-v-custom-buttons ol-unselectable ol-control", super({
				element: n,
				target: t.target
			});
		}
	}();
}
var Cn = window.Vue.normalizeProps, wn = window.Vue.guardReactiveProps, Tn = window.Vue.renderSlot, En = window.Vue.openBlock, Dn = window.Vue.createElementBlock, On = ["id"];
function kn(e, t, n, r, i, a) {
	return En(), Dn("div", {
		id: n.id,
		class: "map"
	}, [Tn(e.$slots, "default", Cn(wn(e.$attrs)))], 8, On);
}
var An = /*#__PURE__*/ l(xn, [["render", kn]]), L = window.ol, jn = {
	props: {
		id: {
			type: String,
			required: !0
		},
		list: { type: Array },
		cluster: { type: Array },
		object: { type: Object },
		objectEditable: { type: Boolean },
		fitOnDataUpdate: { type: Boolean },
		baseUrl: { type: String },
		field: {
			type: String,
			required: !0
		},
		nameField: { type: String },
		markerColor: {
			type: String,
			default: "#000000"
		},
		markerUseFont: {
			type: Boolean,
			default: !1
		},
		markerImage: { type: String },
		markerImageDynamic: {
			type: Function,
			default: (e) => "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='" + e + "' height='" + e + "'><path style='fill:white' d='M18.364 3.636a9 9 0 0 1 0 12.728L12 22.728l-6.364-6.364A9 9 0 0 1 18.364 3.636ZM12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z'/></svg>"
		},
		markerFont: {
			type: String,
			default: "Material Icons"
		},
		markerIcon: {
			type: String,
			default: "place"
		},
		markerSize: {
			type: Number,
			default: 30
		},
		clusterCircleSize: {
			type: Number,
			default: 20
		},
		clusterColor: {
			type: String,
			default: "#fff"
		},
		clusterCircleBorderColor: {
			type: String,
			default: "#000000"
		},
		clusterTextColor: {
			type: String,
			default: "#000000"
		},
		clusterTextSize: {
			type: Number,
			default: 12
		},
		clusterTextFont: {
			type: String,
			default: "sans-serif"
		}
	},
	emits: ["moveend", "click"],
	data: function() {
		return {
			popupDisplayed: !1,
			objectDisplayed: {},
			items: [],
			_itemsCoordString: null,
			clusters: [],
			_clusterCoordString: null,
			olMap: {},
			vectorSource: {},
			base32: "0123456789bcdefghjkmnpqrstuvwxyz"
		};
	},
	watch: {
		list: {
			handler(e) {
				if (e) {
					let t = this.computeCoordString(e);
					this._itemsCoordString && t !== this._itemsCoordString && (this.$data.items = e, this.updateMap()), this._itemsCoordString = t;
				}
			},
			deep: !0,
			immediate: !0
		},
		cluster: {
			handler(e) {
				if (e) {
					let t = this.computeCoordString(e);
					if (this._clusterCoordString) {
						this.$data.items = [], this.$data.clusters = [];
						for (let t = 0; t < e.length; t++) e[t].totalCount == 1 ? this.$data.items = this.$data.items.concat(e[t].list) : this.$data.clusters.push({
							geoHash: e[t].code,
							geoLocation: this.decode(e[t].code),
							totalCount: e[t].totalCount
						});
						this.updateMap();
					}
					this._clusterCoordString = t;
				}
			},
			deep: !0,
			immediate: !0
		},
		object: {
			handler(e) {
				if (e) {
					let t = this.computeCoordString(e);
					this._itemsCoordString && t !== this._itemsCoordString && this.updateMap(), this._itemsCoordString = t;
				}
			},
			deep: !0,
			immediate: !0
		}
	},
	computed: { features: function() {
		let e = this.$props.field, t = this.$data.items.filter(function(t) {
			return t[e] != null;
		}).map(function(t) {
			let n;
			if (n = typeof t[e] == "string" || t[e] instanceof String ? JSON.parse(t[e]) : t[e], n != null && n.lon != null && n.lat != null) {
				let e = new L.Feature({ geometry: new L.geom.Point(L.proj.fromLonLat([n.lon, n.lat])) });
				return this.$props.nameField && (e.set("name", t[this.$props.nameField]), e.set("innerObject", t), e.set("totalCount", t.totalCount)), e;
			}
			return null;
		}.bind(this)).filter((e) => e != null), n = this.$data.clusters.filter(function(e) {
			return e.geoLocation != null;
		}).map(function(e) {
			let t;
			if (t = typeof e.geoLocation == "string" || e.geoLocation instanceof String ? JSON.parse(e.geoLocation) : e.geoLocation, t != null) {
				let n = new L.Feature({ geometry: new L.geom.Point(L.proj.fromLonLat([t.lon, t.lat])) });
				return this.$props.nameField && (n.set("name", e[this.$props.nameField]), n.set("innerObject", e), n.set("totalCount", e.totalCount)), n;
			}
			return null;
		}.bind(this));
		return t.concat(n);
	} },
	methods: {
		fitView: function() {
			if (this.features.length > 0) {
				let e = this.features.length == 1 ? Math.min(this.olMap.getView().getZoom() || 19, 19) : 19, t = L.geom.Polygon.fromExtent(this.$data.vectorSource.getExtent());
				t.scale(1.2), this.olMap.getView().fit(t, {
					size: this.olMap.getSize(),
					maxZoom: e,
					duration: 750
				});
			}
		},
		fetchList: function(e, t) {
			this.$http.get(this.baseUrl + "_geoSearch?topLeft=\"" + e.lat + "," + e.lon + "\"&bottomRight=\"" + t.lat + "," + t.lon + "\"", { timeout: 5 * 1e3 }).then(function(e) {
				this.$data.items = e.data, this.$data.vectorSource.clear(), this.$data.vectorSource.addFeatures(this.features);
			}.bind(this));
		},
		computeCoordString: function(e) {
			let t;
			return t = Array.isArray(e) ? this.$props.cluster ? e.map((e) => this.decode(e.code)) : e.map((e) => e[this.$props.field]) : e[this.$props.field], JSON.stringify(t);
		},
		updateMap: function() {
			Object.keys(this.$data.vectorSource).length == 0 && (this.$data.vectorSource = new L.source.Vector({})), this.$data.vectorSource.clear(), this.$data.vectorSource.addFeatures(this.features), this.$props.fitOnDataUpdate && this.fitView();
		},
		decode: function(e) {
			let t = this.bounds(e), n = t.sw.lat, r = t.sw.lon, i = t.ne.lat, a = t.ne.lon, o = (n + i) / 2, s = (r + a) / 2;
			return o = o.toFixed(Math.floor(2 - Math.log(i - n) / Math.LN10)), s = s.toFixed(Math.floor(2 - Math.log(a - r) / Math.LN10)), {
				lat: Number(o),
				lon: Number(s)
			};
		},
		bounds: function(e) {
			if (e.length == 0) throw Error("Invalid geohash");
			e = e.toLowerCase();
			let t = !0, n = -90, r = 90, i = -180, a = 180;
			for (let o = 0; o < e.length; o++) {
				let s = e.charAt(o), c = this.$data.base32.indexOf(s);
				if (c == -1) throw Error("Invalid geohash");
				for (let e = 4; e >= 0; e--) {
					let o = c >> e & 1;
					if (t) {
						let e = (i + a) / 2;
						o == 1 ? i = e : a = e;
					} else {
						let e = (n + r) / 2;
						o == 1 ? n = e : r = e;
					}
					t = !t;
				}
			}
			return {
				sw: {
					lat: n,
					lon: i
				},
				ne: {
					lat: r,
					lon: a
				}
			};
		}
	},
	mounted: function() {
		this.$parent.onMapLoad(function(e) {
			if (this.$data.olMap = e, this.$data.items = [], this.$data.clusters = [], this.$props.list) this.$data.items = this.$props.list;
			else if (this.$props.cluster) for (let e = 0; e < this.$props.cluster.length; e++) this.$props.cluster[e].totalCount == 1 ? this.$data.items = this.$data.items.concat(this.$props.cluster[e].list) : this.$data.clusters.push({
				geoHash: this.$props.cluster[e].code,
				geoLocation: this.decode(this.$props.cluster[e].code),
				totalCount: this.$props.cluster[e].totalCount
			});
			else this.$props.object && (this.$data.items = [this.$props.object]);
			this.$data.vectorSource = new L.source.Vector({ features: this.features });
			let t = new L.source.Cluster({
				source: this.$data.vectorSource,
				distance: 2 * this.$props.clusterCircleSize
			}), n = new L.layer.Vector({ source: t }), r;
			r = this.$props.markerUseFont ? new L.style.Style({ text: new L.style.Text({
				font: this.$props.markerSize + "px " + this.$props.markerFont,
				text: this.$props.markerIcon,
				fill: new L.style.Fill({ color: this.$props.markerColor }),
				textBaseline: "alphabetic"
			}) }) : this.$props.markerImage ? new L.style.Style({ image: new L.style.Icon({
				src: this.$props.markerImage,
				scale: this.$props.markerSize / 30,
				anchor: [.5, .95],
				color: this.$props.markerColor
			}) }) : new L.style.Style({ image: new L.style.Icon({
				src: this.$props.markerImageDynamic(this.$props.markerSize),
				anchor: [.5, .95],
				color: this.$props.markerColor
			}) });
			let i = {};
			if (n.setStyle(function(e) {
				let t = 0, n = e.get("features");
				for (let e = 0; e < n.length; e++) {
					let r = n[e].get("totalCount");
					t += r || 1;
				}
				if (!t || t == 1) return r;
				{
					let e = i[t];
					return e || (e = new L.style.Style({
						image: new L.style.Circle({
							radius: this.$props.clusterCircleSize,
							stroke: new L.style.Stroke({ color: this.$props.clusterCircleBorderColor }),
							fill: new L.style.Fill({ color: this.$props.clusterColor })
						}),
						text: new L.style.Text({
							text: t.toString(),
							font: this.$props.clusterTextSize + "px " + this.$props.clusterTextFont,
							fill: new L.style.Fill({ color: this.$props.clusterTextColor })
						})
					}), i[t] = e), e;
				}
			}.bind(this)), this.olMap.addLayer(n), this.fitView(), this.features.length == 0 && (this.olMap.getView().setCenter(L.proj.fromLonLat([2.333333, 48.866667])), this.olMap.vInitialZoomOverride = 3), this.onMapMoveEndDebounced = (0, bn.default)((e, t) => {
				this.baseUrl && this.fetchList({
					lat: e[0],
					lon: e[1]
				}, {
					lat: t[0],
					lon: t[1]
				}), this.$emit("moveend", e, t);
			}, 300), this.olMap.on("moveend", function(e) {
				let t = e.map.getView().calculateExtent(), n = L.proj.transformExtent(t, "EPSG:3857", "EPSG:4326"), r = L.extent.getTopLeft(n), i = L.extent.getBottomRight(n);
				this.onMapMoveEndDebounced(r, i);
			}.bind(this)), this.onMapClickDebounced = (0, bn.default)((e) => {
				this.$emit("click", L.proj.transform(e, "EPSG:3857", "EPSG:4326"));
			}, 300), this.$props.nameField) {
				let e = new L.Overlay({
					element: this.$el.querySelector("#" + this.$props.id + "Popup"),
					positioning: "bottom-center",
					stopEvent: !1,
					offset: [0, -20]
				});
				this.olMap.addOverlay(e), this.olMap.on("click", function(t) {
					if (t.originalEvent.target instanceof HTMLCanvasElement) {
						let n = this.olMap.forEachFeatureAtPixel(t.pixel, function(e) {
							return e;
						});
						if (n && n.get("features") && n.get("features").length == 1) {
							if (!Object.hasOwn(n.get("features")[0].get("innerObject"), "geoHash")) {
								let r = n.getGeometry().getCoordinates();
								e.setPosition(r), this.$data.popupDisplayed = !0, this.$data.objectDisplayed = n.get("features")[0].get("innerObject"), t.stopPropagation(), this.onMapClickDebounced(r);
							}
						} else this.$data.popupDisplayed = !1;
					}
				}.bind(this)), this.olMap.on("pointermove", function(e) {
					if (e.dragging) {
						this.$data.popupDisplayed = !1;
						return;
					}
					let t = this.olMap.getEventPixel(e.originalEvent), n = this.olMap.hasFeatureAtPixel(t);
					this.olMap.getTargetElement().style.cursor = n ? "pointer" : "";
				}.bind(this));
			} else this.olMap.on("click", function(e) {
				if (e.originalEvent.target instanceof HTMLCanvasElement) {
					let t = this.olMap.forEachFeatureAtPixel(e.pixel, function(e) {
						return e;
					});
					if (t && t.get("features") && t.get("features").length == 1) {
						let n = t.getGeometry().getCoordinates();
						e.stopPropagation(), this.onMapClickDebounced(n);
					}
				}
			}.bind(this));
			if (this.$props.object && this.$props.objectEditable) {
				let e = new L.interaction.Draw({
					source: this.$data.vectorSource,
					type: "Point"
				});
				e.on("drawend", (n) => {
					let r = n.feature, i = L.proj.toLonLat(r.getGeometry().getCoordinates());
					this.$data.vectorSource.clear(), this.olMap.removeInteraction(e), t.classList.remove("active"), this.$props.object[this.$props.field] = {
						lon: i[0],
						lat: i[1]
					};
				});
				let t = document.createElement("button");
				t.innerHTML = "&#9678;", t.addEventListener("click", (n) => {
					n.preventDefault(), t.classList.contains("active") ? (this.olMap.removeInteraction(e), t.classList.remove("active")) : (this.olMap.addInteraction(e), e = this.olMap.getInteractions().getArray().slice(-1)[0], t.classList.add("active"));
				}, !1), this.olMap.getViewport().getElementsByClassName("ol-v-custom-buttons")[0].appendChild(t);
			}
		}.bind(this));
	}
}, Mn = window.Vue.renderSlot, Nn = window.Vue.toDisplayString, Pn = window.Vue.createElementVNode, Fn = window.Vue.createCommentVNode, In = window.Vue.openBlock, Ln = window.Vue.createElementBlock, Rn = ["id"], zn = ["id"], Bn = { class: "popup" };
function Vn(e, t, n, r, i, a) {
	return In(), Ln("div", { id: n.id }, [Pn("div", { id: n.id + "Popup" }, [e.popupDisplayed ? Mn(e.$slots, "card", {
		key: 0,
		objectDisplayed: e.objectDisplayed
	}, () => [Pn("div", Bn, Nn(e.objectDisplayed[n.nameField]), 1)]) : Fn("", !0)], 8, zn)], 8, Rn);
}
var Hn = /*#__PURE__*/ l(jn, [["render", Vn]]), Un = window.Quasar, Wn = {
	props: {
		modelValue: {
			type: String,
			required: !0
		},
		list: {
			type: Array,
			required: !0
		},
		keyField: {
			type: String,
			required: !0
		},
		labelField: {
			type: String,
			required: !0
		},
		parentKeyField: {
			type: String,
			required: !0
		},
		subTreeKey: {
			type: String,
			required: !1
		}
	},
	emits: ["update:modelValue"],
	data: function() {
		return {
			selectedNode: this.$props.modelValue,
			expandedNodes: [this.$props.modelValue]
		};
	},
	watch: { modelValue: function(e) {
		this.$data.selectedNode = e;
	} },
	methods: {
		handleSelected: function(e) {
			this.$emit("update:modelValue", this.$data.selectedNode), e && this.$refs.menu.hide();
		},
		handleExpanded: function() {
			Un.debounce(this.$refs.menu.updatePosition, 500)();
		},
		getSelectedLabel: function() {
			return this.$data.selectedNode ? this.$props.list.find(function(e) {
				return e[this.$props.keyField] === this.$data.selectedNode;
			}.bind(this))[this.$props.labelField] : null;
		},
		convertListToTree: function(e, t) {
			var n = {}, r, i = [], a, o = [];
			for (a = 0; a < e.length; a += 1) n[e[a][this.$props.keyField]] = a, o.push({
				...e[a],
				children: []
			});
			for (a = 0; a < e.length; a += 1) r = o[a], r[this.$props.parentKeyField] ? o[n[r[this.$props.parentKeyField]]].children.push(r) : i.push(r);
			return t ? [o[n[t]]] : i;
		}
	}
}, Gn = window.Vue.resolveComponent, Kn = window.Vue.createVNode, qn = window.Vue.toDisplayString, Jn = window.Vue.createElementVNode, Yn = window.Vue.withCtx, Xn = window.Vue.normalizeProps, Zn = window.Vue.guardReactiveProps, Qn = window.Vue.openBlock, $n = window.Vue.createBlock, er = {
	class: "self-center full-width no-outline",
	tabindex: "0"
};
function tr(e, t, n, r, i, a) {
	let o = Gn("q-icon"), s = Gn("q-tree"), c = Gn("q-menu"), l = Gn("q-field");
	return Qn(), $n(l, Xn(Zn(e.$attrs)), {
		append: Yn(() => [Kn(o, { name: "arrow_drop_down" })]),
		control: Yn(() => [Jn("div", er, qn(a.getSelectedLabel()), 1)]),
		default: Yn(() => [Kn(c, {
			breakpoint: 600,
			fit: "",
			ref: "menu"
		}, {
			default: Yn(() => [Kn(s, {
				nodes: a.convertListToTree(e.$props.list, e.$props.subTreeKey),
				"node-key": e.$props.keyField,
				"label-key": e.$props.labelField,
				expanded: e.expandedNodes,
				"onUpdate:expanded": [t[0] ||= (t) => e.expandedNodes = t, a.handleExpanded],
				selected: e.selectedNode,
				"onUpdate:selected": [t[1] ||= (t) => e.selectedNode = t, a.handleSelected]
			}, null, 8, [
				"nodes",
				"node-key",
				"label-key",
				"expanded",
				"onUpdate:expanded",
				"selected",
				"onUpdate:selected"
			])]),
			_: 1
		}, 512)]),
		_: 1
	}, 16);
}
var nr = /*#__PURE__*/ l(Wn, [["render", tr]]), rr = window.Vue.ref, ir = {
	props: {
		inputId: String,
		readonly: Boolean,
		fileInfoUris: Array,
		fieldName: String,
		url: String,
		downloadUrl: String,
		accept: String,
		multiple: {
			type: Boolean,
			default: !0
		},
		maxFiles: Number,
		callbackOnDelete: { default: !1 },
		inputProps: { type: Object }
	},
	emits: [
		"update:file-info-uris",
		"download-file",
		"file-ok",
		"file-failed",
		"init-ok",
		"init-ko"
	],
	computed: {},
	mounted() {
		if (this.fileInfoUris.length > 0) {
			let e = new URLSearchParams();
			this.fileInfoUris.forEach((t) => {
				e.append(this.fieldName, t);
			}), this.$http.get(this.url + "/fileInfos", {
				params: e,
				credentials: !1
			}).then(function(e) {
				let t = e.data;
				this.files = t.map((e) => ({
					...e,
					status: "OK"
				})), this.$emit("init-ok");
			}.bind(this)).catch(function(t) {
				this.$emit("update:file-info-uris", []), this.$emit("init-ko"), this.$q && (t.response ? this.$q.notify(t.response.status + ":" + t.response.statusText + " Can't load file " + e) : this.$q.notify(t + " Can't load file " + e));
			}.bind(this));
		}
		typeof this.callbackOnDelete != "function" && typeof this.callbackOnDelete != "boolean" && console.error("callback-on-delete must be a function or a boolean");
	},
	data: function() {
		return {
			files: [],
			units: [
				this.$vui.i18n().uploader.unit_b,
				this.$vui.i18n().uploader.unit_kb,
				this.$vui.i18n().uploader.unit_mb,
				this.$vui.i18n().uploader.unit_gb
			]
		};
	},
	methods: {
		canAddFiles() {
			if (this.$props.readonly) return !1;
			let e = this.multiple ? this.maxFiles : 1;
			return e == null || this.$data.files.filter((e) => e.status != "ERROR").length < e;
		},
		reset() {
			this.files.length = 0;
		},
		addFiles(e) {
			this.files = this.files.filter((e) => e.status != "ERROR");
			for (let t of e) if (this.canAddFiles()) {
				let e = rr({
					name: t.name,
					size: t.size,
					type: t.type,
					status: "IN_PROGRESS",
					errorMessage: null,
					progress: 0,
					estimated: null,
					file: t
				}).value;
				this.$data.files.push(e), ar.call(this, e);
			}
			this.$refs.input && (this.$refs.input.value = null);
		},
		abortUpload(e) {
			e.abortController.abort();
			let t = this.files.indexOf(e);
			this.files.splice(t, 1);
		},
		removeFile(e) {
			if (this.$props.readonly) return;
			let t = this.files.indexOf(e);
			this.files.splice(t, 1);
			let n = [...this.fileInfoUris];
			n.splice(t, 1), this.$emit("update:file-info-uris", n);
			let r = typeof this.callbackOnDelete == "function";
			if (this.callbackOnDelete === !0 || r) {
				let t = {};
				t[this.fieldName] = e.fileUri;
				let n = this.$http.delete(this.url, {
					params: t,
					credentials: !1
				});
				r && this.callbackOnDelete(this, n);
			}
		},
		downloadFile(e) {
			this.$emit("download-file", e.fileUri);
		},
		getGlobalSize() {
			return this.files.filter((e) => e.status != "ERROR").reduce((e, t) => e + t.size, 0);
		},
		getGlobalSizeLabel() {
			return this.humanStorageSize(this.getGlobalSize());
		},
		humanStorageSize(e, t = 1) {
			let n = 0;
			for (; parseInt(e, 10) >= 1024 && n < this.$data.units.length - 1;) e /= 1024, ++n;
			return `${e.toFixed(t)} ${this.$data.units[n]}`;
		}
	}
};
function ar(e) {
	let t = new AbortController();
	e.abortController = t;
	let n = new FormData();
	n.append("file", e.file), this.$http.post(this.url, n, {
		credentials: !1,
		headers: {
			"Content-Type": "multipart/form-data",
			Accept: "application/json"
		},
		signal: t.signal,
		onUploadProgress: function(t) {
			e.progress = t.progress, e.estimated = t.estimated;
		}.bind(this)
	}).then(function(t) {
		this.$emit("file-ok", t.data);
		let n = t.data;
		e.status = "OK", e.fileUri = n, this.$emit("update:file-info-uris", [...this.fileInfoUris, n]);
	}.bind(this)).catch(function(t) {
		this.$emit("file-failed", t), e.status = "ERROR", t?.response?.status === 413 && (e.errorMessage = this.$vui.i18n().uploader.fileErrorTooBig);
	}.bind(this));
}
var R = window.Vue.toDisplayString, or = window.Vue.normalizeProps, sr = window.Vue.guardReactiveProps, cr = window.Vue.renderSlot, lr = window.Vue.createTextVNode, z = window.Vue.openBlock, B = window.Vue.createElementBlock, ur = window.Vue.createCommentVNode, dr = window.Vue.renderList, fr = window.Vue.Fragment, pr = window.Vue.normalizeStyle, mr = window.Vue.createElementVNode, hr = window.Vue.withModifiers, gr = window.Vue.mergeProps, _r = window.Vue.vShow, vr = window.Vue.withDirectives, yr = { class: "v-fileupload" }, br = {
	key: 0,
	class: "header"
}, xr = { class: "content" }, Sr = { class: "files" }, Cr = {
	class: "file",
	style: {
		display: "flex",
		"flex-flow": "row wrap",
		"column-gap": "50px"
	}
}, wr = {
	key: 0,
	style: { color: "red" }
}, Tr = { style: { color: "grey" } }, Er = { key: 1 }, Dr = { key: 2 }, Or = ["onClick", "href"], kr = ["onClick"], Ar = ["onClick"], jr = { class: "input" }, Mr = [
	"id",
	"accept",
	"multiple",
	"disabled"
];
function Nr(e, t, n, r, i, a) {
	return z(), B("div", yr, [
		e.$slots.header ? (z(), B("div", br, [lr(R(e.$slots.header.$attrs) + " ", 1), cr(e.$slots, "header", or(sr({
			...e.$data,
			...e.$props,
			canAddFiles: a.canAddFiles,
			addFiles: a.addFiles,
			abortUpload: a.abortUpload,
			removeFile: a.removeFile,
			downloadFile: a.downloadFile,
			getGlobalSize: a.getGlobalSize,
			getGlobalSizeLabel: a.getGlobalSizeLabel,
			humanStorageSize: a.humanStorageSize
		})))])) : ur("", !0),
		mr("div", xr, [cr(e.$slots, "default", or(sr({
			...e.$data,
			...e.$props,
			canAddFiles: a.canAddFiles,
			addFiles: a.addFiles,
			abortUpload: a.abortUpload,
			removeFile: a.removeFile,
			downloadFile: a.downloadFile,
			getGlobalSize: a.getGlobalSize,
			getGlobalSizeLabel: a.getGlobalSizeLabel,
			humanStorageSize: a.humanStorageSize
		})), () => [mr("div", Sr, [cr(e.$slots, "files", or(sr({
			...e.$data,
			...e.$props,
			canAddFiles: a.canAddFiles,
			addFiles: a.addFiles,
			abortUpload: a.abortUpload,
			removeFile: a.removeFile,
			downloadFile: a.downloadFile,
			getGlobalSize: a.getGlobalSize,
			getGlobalSizeLabel: a.getGlobalSizeLabel,
			humanStorageSize: a.humanStorageSize
		})), () => [(z(!0), B(fr, null, dr(e.files, (t) => (z(), B("span", Cr, [
			mr("span", { style: pr({ color: t.status === "IN_PROGRESS" ? "blue" : t.status == "ERROR" ? "red" : "" }) }, R(t.name), 5),
			t.status === "ERROR" ? (z(), B("span", wr, R(t.errorMessage), 1)) : ur("", !0),
			mr("span", Tr, R(a.humanStorageSize(t.size)), 1),
			t.status === "IN_PROGRESS" ? (z(), B("span", Er, R(e.$vui.i18n().uploader.progress) + " : " + R((t.progress * 100).toFixed()) + " %", 1)) : ur("", !0),
			t.status === "IN_PROGRESS" && t.estimated != null ? (z(), B("span", Dr, R(e.$vui.i18n().uploader.estimated) + " : " + R(t.estimated.toFixed()) + " s", 1)) : ur("", !0),
			t.status === "OK" ? (z(), B("a", {
				key: 3,
				onClick: (e) => a.downloadFile(t),
				href: n.downloadUrl + t.uri
			}, R(e.$vui.i18n().uploader.download), 9, Or)) : ur("", !0),
			t.status === "IN_PROGRESS" ? (z(), B("button", {
				key: 4,
				onClick: hr((e) => a.abortUpload(t), ["prevent"])
			}, R(e.$vui.i18n().uploader.abort), 9, kr)) : ur("", !0),
			!this.readonly && t.status !== "IN_PROGRESS" ? (z(), B("button", {
				key: 5,
				style: { color: "red" },
				onClick: hr((e) => a.removeFile(t), ["prevent"])
			}, R(e.$vui.i18n().uploader.remove), 9, Ar)) : ur("", !0)
		]))), 256))])]), vr(mr("div", jr, [cr(e.$slots, "input", or(sr({
			...e.$data,
			...e.$props,
			canAddFiles: a.canAddFiles,
			addFiles: a.addFiles,
			abortUpload: a.abortUpload,
			removeFile: a.removeFile,
			downloadFile: a.downloadFile,
			getGlobalSize: a.getGlobalSize,
			getGlobalSizeLabel: a.getGlobalSizeLabel,
			humanStorageSize: a.humanStorageSize
		})), () => [mr("input", gr({
			id: e.$props.inputId,
			ref: "input",
			type: "file",
			accept: e.$props.accept,
			multiple: e.$props.multiple,
			disabled: a.canAddFiles() ? void 0 : !0,
			onChange: t[0] ||= (e) => a.addFiles(e.target.files)
		}, e.$props.inputProps), null, 16, Mr)])], 512), [[_r, a.canAddFiles()]])])]),
		e.$slots.footer ? (z(), B("div", gr({
			key: 1,
			class: "footer"
		}, {
			...e.$data,
			...e.$props,
			canAddFiles: a.canAddFiles,
			addFiles: a.addFiles,
			abortUpload: a.abortUpload,
			removeFile: a.removeFile,
			downloadFile: a.downloadFile,
			getGlobalSize: a.getGlobalSize,
			getGlobalSizeLabel: a.getGlobalSizeLabel,
			humanStorageSize: a.humanStorageSize
		}), [cr(e.$slots, "footer")], 16)) : ur("", !0)
	]);
}
var Pr = /*#__PURE__*/ l(ir, [["render", Nr]]), Fr = {
	props: {
		inputId: String,
		readonly: Boolean,
		label: String,
		simple: {
			type: Boolean,
			default: !1
		},
		fileInfoUris: Array,
		fieldName: String,
		url: String,
		downloadUrl: {
			type: String,
			default: (e) => e.baseUrl + "/download"
		},
		multiple: {
			type: Boolean,
			default: !0
		},
		accept: String,
		maxFileSize: Number,
		maxTotalSize: Number,
		maxFiles: Number
	},
	emits: [
		"update:file-info-uris",
		"download-file",
		"init-ok",
		"init-ko"
	],
	computed: {},
	mounted() {
		if (this.changeIcon(), this.fileInfoUris.length > 0) {
			var e = new URLSearchParams();
			this.fileInfoUris.forEach((t) => {
				e.append(this.fieldName, t);
			}), this.$http.get(this.url + "/fileInfos", {
				params: e,
				credentials: !1
			}).then(function(e) {
				var t = e.data;
				this.files = t.map((e) => e), this.$emit("init-ok");
			}.bind(this)).catch(function(t) {
				this.$emit("update:file-info-uris", []), this.$emit("init-ko"), t.response ? this.$q.notify(t.response.status + ":" + t.response.statusText + " Can't load file " + e) : this.$q.notify(t + " Can't load file " + e);
			}.bind(this));
		}
	},
	data: function() {
		return {
			files: [],
			units: [
				this.$vui.i18n().uploader.unit_b,
				this.$vui.i18n().uploader.unit_kb,
				this.$vui.i18n().uploader.unit_mb,
				this.$vui.i18n().uploader.unit_gb
			]
		};
	},
	methods: {
		uploadedFiles(e) {
			var t = [...this.fileInfoUris];
			e.files.forEach(function(e) {
				this.files.push(e), e.fileUri = e.xhr.response, t.push(e.fileUri), this.$refs.quasarUploader.removeFile(e), this.$emit("update:file-info-uris", t);
			}.bind(this));
		},
		filterFiles(e) {
			let t = [], n = this.getGlobalSize();
			for (let r of e) {
				if (this.maxFiles && this.files.length + t.length >= this.maxFiles) {
					r._error = "maxFiles";
					continue;
				}
				if (this.maxTotalSize && n + r.size > this.maxTotalSize) {
					r._error = "maxTotalSize";
					continue;
				}
				t.push(r), n += r.size;
			}
			return t;
		},
		failedFiles(e) {
			e.xhr.status === 413 ? this.$q.notify({
				type: "negative",
				message: this.$vui.i18n().uploader.fileErrorTooBig,
				multiLine: !0,
				timeout: 2500
			}) : this.$q.notify({
				type: "negative",
				message: this.$vui.i18n().uploader.fileErrorUnknown,
				multiLine: !0,
				timeout: 2500
			});
		},
		rejectedFiles(e) {
			let t = [];
			for (let n of e) n.failedPropValidation === "accept" ? t.push(this.$vui.i18n().uploader.fileErrorAccept(this.accept)) : n.failedPropValidation === "max-file-size" ? t.push(this.$vui.i18n().uploader.fileErrorTooBigSize(this.$props.maxFileSize)) : n.failedPropValidation === "filter" && (n.file._error === "maxFiles" ? t.push(this.$vui.i18n().uploader.fileCountError(this.$props.maxFiles)) : n.file._error === "maxTotalSize" && t.push(this.$vui.i18n().uploader.fileErrorMaxTotalSize(this.$props.maxTotalSize)));
			VUiPage.uiMessageStackToNotify({ globalErrors: t }).forEach(function(e) {
				this.$q.notify(e);
			}.bind(this));
		},
		removeRemoteFile(e) {
			var t = this.files.indexOf(e), n = [...this.fileInfoUris], r = {};
			r[this.fieldName] = e.fileUri, this.$http.delete(this.url, {
				params: r,
				credentials: !1
			}).then(function() {
				this.multiple ? (this.files.splice(t, 1), n.splice(t, 1)) : (this.files.splice(0), n.splice(0)), this.$emit("update:file-info-uris", n);
			}.bind(this)).catch(function(e) {
				this.$q.notify(e.response.status + ":" + e.response.statusText + " Can't remove temporary file");
			}.bind(this));
		},
		globalCanAddFiles(e) {
			return this.multiple ? !this.$props.readonly : !this.$props.readonly && e.filter((e) => e.__status != "uploaded").length + this.fileInfoUris.length < 1;
		},
		changeIcon() {
			this.$q.iconSet.uploader.removeUploaded = "delete_sweep", this.$q.iconSet.uploader.done = "delete";
		},
		addFiles(e) {
			var t = this.$refs.quasarUploader;
			this.globalCanAddFiles(t.files) && this.$refs.quasarUploader.addFiles(e);
		},
		getGlobalSize() {
			return this.files.reduce((e, t) => e + t.size, 0);
		},
		getGlobalSizeLabel() {
			return this.humanStorageSize(this.getGlobalSize());
		},
		humanStorageSize(e, t = 1) {
			let n = 0;
			for (; parseInt(e, 10) >= 1024 && n < this.$data.units.length - 1;) e /= 1024, ++n;
			return `${e.toFixed(t)} ${this.$data.units[n]}`;
		}
	}
}, V = window.Vue.toDisplayString, Ir = window.Vue.createTextVNode, Lr = window.Vue.resolveComponent, H = window.Vue.withCtx, U = window.Vue.createVNode, W = window.Vue.openBlock, G = window.Vue.createBlock, K = window.Vue.createCommentVNode, q = window.Vue.createElementBlock, J = window.Vue.createElementVNode, Rr = window.Vue.renderList, zr = window.Vue.Fragment, Br = window.Vue.normalizeClass, Vr = window.Vue.renderSlot, Hr = window.Vue.mergeProps, Ur = window.Vue.createSlots, Wr = { class: "q-uploader__header-content flex flex-center no-wrap q-gutter-xs" }, Gr = { class: "col column justify-center" }, Kr = {
	key: 0,
	class: "q-uploader__title"
}, qr = {
	key: 1,
	class: "q-uploader__subtitle"
}, Jr = {
	key: 2,
	class: "q-uploader__subtitle"
}, Yr = {
	key: 3,
	class: "relative-position"
}, Xr = { class: "row" }, Zr = { class: "col column justify-center" }, Qr = { class: "q-uploader__file-header row flex-center no-wrap" }, $r = { class: "q-uploader__file-header-content col" }, ei = { class: "q-uploader__title" }, ti = { class: "q-uploader__file-header row flex-center no-wrap" }, ni = { class: "q-uploader__file-header-content col" }, ri = ["id"], ii = ["aria-labelledby"], ai = {
	key: 0,
	class: "q-field__after q-field__marginal row no-wrap items-center"
}, oi = {
	key: 1,
	class: "relative-position"
};
function si(e, t, n, r, i, a) {
	let o = Lr("q-tooltip"), s = Lr("q-btn"), c = Lr("q-spinner"), l = Lr("q-uploader-add-trigger"), u = Lr("q-icon"), d = Lr("q-circular-progress"), f = Lr("q-field"), p = Lr("q-uploader");
	return W(), G(p, Hr({
		url: e.$props.url,
		"auto-upload": "",
		"field-name": e.$props.fieldName,
		multiple: e.$props.multiple,
		"max-files": e.$props.multiple ? void 0 : 1,
		"max-file-size": e.$props.maxFileSize,
		accept: e.$props.accept,
		headers: [{
			name: "Accept",
			value: "application/json"
		}],
		filter: a.filterFiles,
		onUploaded: a.uploadedFiles,
		onFailed: a.failedFiles,
		onRejected: a.rejectedFiles,
		readonly: e.$props.readonly || !a.globalCanAddFiles([])
	}, e.$attrs, { ref: "quasarUploader" }), Ur({
		list: H((t) => [J("div", Xr, [U(f, {
			"label-width": 3,
			label: e.$props.simple ? e.$props.label : void 0,
			class: "col",
			orientation: "vertical",
			"stack-label": "",
			borderless: ""
		}, {
			control: H(() => [J("div", Zr, [e.$props.readonly ? K("", !0) : (W(!0), q(zr, { key: 0 }, Rr(t.files, (n) => (W(), q(zr, { key: n.name }, [n.__status === "uploaded" ? K("", !0) : (W(), q("div", {
				key: 0,
				class: Br(["q-uploader__file relative-position", {
					"q-uploader__file--failed": n.__status === "failed",
					"q-uploader__file--uploaded": n.__status === "uploaded"
				}])
			}, [J("div", Qr, [
				n.__status === "failed" ? (W(), G(u, {
					key: 0,
					class: "q-uploader__file-status",
					name: e.$q.iconSet.type.negative,
					color: "negative"
				}, null, 8, ["name"])) : K("", !0),
				U(u, {
					class: "q-uploader__file-status",
					name: n.type.indexOf("video/") === 0 ? "movie" : n.type.indexOf("image/") === 0 ? "photo" : n.type.indexOf("audio/") === 0 ? "audiotrack" : "insert_drive_file"
				}, null, 8, ["name"]),
				J("div", $r, [J("div", ei, V(n.name), 1)]),
				n.__status === "uploading" ? (W(), G(d, {
					key: 1,
					value: n.__progress,
					min: 0,
					max: 1,
					indeterminate: n.__progress === 0
				}, null, 8, ["value", "indeterminate"])) : K("", !0),
				n.__status === "failed" ? (W(), G(s, {
					key: 2,
					round: "",
					dense: "",
					flat: "",
					icon: e.$q.iconSet.uploader.clear,
					onClick: (e) => t.removeFile(n)
				}, null, 8, ["icon", "onClick"])) : K("", !0)
			])], 2))], 64))), 128)), (W(!0), q(zr, null, Rr(e.files, (t) => (W(), q("div", {
				key: t.name,
				class: "q-uploader__file relative-position q-uploader__file--uploaded"
			}, [J("div", ti, [
				U(u, {
					class: "q-uploader__file-status",
					name: t.type.indexOf("video/") === 0 ? "movie" : t.type.indexOf("image/") === 0 ? "photo" : t.type.indexOf("audio/") === 0 ? "audiotrack" : "insert_drive_file"
				}, null, 8, ["name"]),
				J("div", ni, [J("div", {
					class: "q-uploader__title",
					id: t.fileUri + "_label"
				}, V(t.name), 9, ri)]),
				J("div", {
					role: "toolbar",
					"aria-labelledby": t.fileUri + "_label"
				}, [e.$props.readonly ? K("", !0) : (W(), G(s, {
					key: 0,
					round: "",
					dense: "",
					flat: "",
					icon: "delete",
					onClick: (e) => a.removeRemoteFile(t),
					title: e.$q.lang.vui.uploader.remove
				}, null, 8, ["onClick", "title"])), U(s, {
					round: "",
					dense: "",
					flat: "",
					icon: "file_download",
					onClick: (n) => e.$emit("download-file", t.fileUri),
					title: e.$q.lang.vui.uploader.download
				}, null, 8, ["onClick", "title"])], 8, ii)
			])]))), 128))])]),
			_: 2
		}, 1032, ["label"]), e.$props.simple && !e.$props.readonly ? (W(), q("div", ai, [
			t.isUploading ? (W(), G(c, {
				key: 0,
				class: "q-uploader__spinner"
			})) : K("", !0),
			a.globalCanAddFiles(t.files) ? (W(), q("div", oi, [
				U(s, {
					icon: e.$q.iconSet.uploader.add,
					flat: "",
					dense: "",
					onClick: t.pickFiles
				}, null, 8, ["icon", "onClick"]),
				U(o, null, {
					default: H(() => [Ir(V(e.$q.lang.vui.uploader.add), 1)]),
					_: 1
				}),
				U(l, { id: e.$props.inputId }, null, 8, ["id"])
			])) : K("", !0),
			t.isUploading ? (W(), G(s, {
				key: 2,
				type: "a",
				icon: e.$q.iconSet.uploader.clear,
				flat: "",
				dense: "",
				onClick: t.abort
			}, {
				default: H(() => [U(o, null, {
					default: H(() => [Ir(V(e.$q.lang.vui.uploader.abort), 1)]),
					_: 1
				})]),
				_: 1
			}, 8, ["icon", "onClick"])) : K("", !0)
		])) : K("", !0)]), Vr(e.$slots, "footer")]),
		_: 2
	}, [e.$props.simple ? {
		name: "header",
		fn: H(() => []),
		key: "0"
	} : {
		name: "header",
		fn: H((t) => [J("div", Wr, [
			t.queuedFiles.length > 0 && !t.readonly ? (W(), G(s, {
				key: 0,
				type: "a",
				icon: e.$q.iconSet.uploader.clear_all,
				flat: "",
				dense: "",
				onClick: t.removeQueuedFiles
			}, {
				default: H(() => [U(o, null, {
					default: H(() => [Ir(V(e.$q.lang.vui.uploader.clear_all), 1)]),
					_: 1
				})]),
				_: 1
			}, 8, ["icon", "onClick"])) : K("", !0),
			J("div", Gr, [e.$props.label === void 0 ? K("", !0) : (W(), q("div", Kr, V(e.$props.label), 1)), t.isUploading ? (W(), q("div", qr, V(a.getGlobalSizeLabel()) + " / " + V(t.uploadProgressLabel), 1)) : (W(), q("div", Jr, V(a.getGlobalSizeLabel()), 1))]),
			t.isUploading ? (W(), G(c, {
				key: 1,
				class: "q-uploader__spinner"
			})) : K("", !0),
			t.isUploading && !t.readonly ? (W(), G(s, {
				key: 2,
				type: "a",
				href: "#",
				icon: e.$q.iconSet.uploader.clear,
				flat: "",
				dense: "",
				onClick: t.abort
			}, {
				default: H(() => [U(o, null, {
					default: H(() => [Ir(V(e.$q.lang.vui.uploader.abort), 1)]),
					_: 1
				})]),
				_: 1
			}, 8, ["icon", "onClick"])) : K("", !0),
			a.globalCanAddFiles(t.files) && !t.readonly ? (W(), q("div", Yr, [
				U(s, {
					icon: e.$q.iconSet.uploader.add,
					flat: "",
					dense: "",
					onClick: t.pickFiles
				}, null, 8, ["icon", "onClick"]),
				U(o, null, {
					default: H(() => [Ir(V(e.$q.lang.vui.uploader.add), 1)]),
					_: 1
				}),
				U(l, { id: e.$props.inputId }, null, 8, ["id"])
			])) : K("", !0)
		])]),
		key: "1"
	}]), 1040, [
		"url",
		"field-name",
		"multiple",
		"max-files",
		"max-file-size",
		"accept",
		"filter",
		"onUploaded",
		"onFailed",
		"onRejected",
		"readonly"
	]);
}
var ci = /*#__PURE__*/ l(Fr, [["render", si]]);
//#endregion
//#region node_modules/d3-color/src/define.js
function li(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function ui(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
//#endregion
//#region node_modules/d3-color/src/color.js
function di() {}
var fi = .7, pi = 1 / fi, mi = "\\s*([+-]?\\d+)\\s*", hi = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Y = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", gi = /^#([0-9a-f]{3,8})$/, _i = RegExp(`^rgb\\(${mi},${mi},${mi}\\)$`), vi = RegExp(`^rgb\\(${Y},${Y},${Y}\\)$`), yi = RegExp(`^rgba\\(${mi},${mi},${mi},${hi}\\)$`), bi = RegExp(`^rgba\\(${Y},${Y},${Y},${hi}\\)$`), xi = RegExp(`^hsl\\(${hi},${Y},${Y}\\)$`), Si = RegExp(`^hsla\\(${hi},${Y},${Y},${hi}\\)$`), Ci = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
li(di, Oi, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: wi,
	formatHex: wi,
	formatHex8: Ti,
	formatHsl: Ei,
	formatRgb: Di,
	toString: Di
});
function wi() {
	return this.rgb().formatHex();
}
function Ti() {
	return this.rgb().formatHex8();
}
function Ei() {
	return Bi(this).formatHsl();
}
function Di() {
	return this.rgb().formatRgb();
}
function Oi(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = gi.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? ki(t) : n === 3 ? new X(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Ai(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Ai(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = _i.exec(e)) ? new X(t[1], t[2], t[3], 1) : (t = vi.exec(e)) ? new X(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = yi.exec(e)) ? Ai(t[1], t[2], t[3], t[4]) : (t = bi.exec(e)) ? Ai(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = xi.exec(e)) ? zi(t[1], t[2] / 100, t[3] / 100, 1) : (t = Si.exec(e)) ? zi(t[1], t[2] / 100, t[3] / 100, t[4]) : Ci.hasOwnProperty(e) ? ki(Ci[e]) : e === "transparent" ? new X(NaN, NaN, NaN, 0) : null;
}
function ki(e) {
	return new X(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ai(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new X(e, t, n, r);
}
function ji(e) {
	return e instanceof di || (e = Oi(e)), e ? (e = e.rgb(), new X(e.r, e.g, e.b, e.opacity)) : new X();
}
function Mi(e, t, n, r) {
	return arguments.length === 1 ? ji(e) : new X(e, t, n, r ?? 1);
}
function X(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
li(X, Mi, ui(di, {
	brighter(e) {
		return e = e == null ? pi : pi ** +e, new X(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? fi : fi ** +e, new X(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new X(Li(this.r), Li(this.g), Li(this.b), Ii(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: Ni,
	formatHex: Ni,
	formatHex8: Pi,
	formatRgb: Fi,
	toString: Fi
}));
function Ni() {
	return `#${Ri(this.r)}${Ri(this.g)}${Ri(this.b)}`;
}
function Pi() {
	return `#${Ri(this.r)}${Ri(this.g)}${Ri(this.b)}${Ri((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Fi() {
	let e = Ii(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${Li(this.r)}, ${Li(this.g)}, ${Li(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ii(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Li(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Ri(e) {
	return e = Li(e), (e < 16 ? "0" : "") + e.toString(16);
}
function zi(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Z(e, t, n, r);
}
function Bi(e) {
	if (e instanceof Z) return new Z(e.h, e.s, e.l, e.opacity);
	if (e instanceof di || (e = Oi(e)), !e) return new Z();
	if (e instanceof Z) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new Z(o, s, c, e.opacity);
}
function Vi(e, t, n, r) {
	return arguments.length === 1 ? Bi(e) : new Z(e, t, n, r ?? 1);
}
function Z(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
li(Z, Vi, ui(di, {
	brighter(e) {
		return e = e == null ? pi : pi ** +e, new Z(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? fi : fi ** +e, new Z(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new X(Wi(e >= 240 ? e - 240 : e + 120, i, r), Wi(e, i, r), Wi(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new Z(Hi(this.h), Ui(this.s), Ui(this.l), Ii(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = Ii(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${Hi(this.h)}, ${Ui(this.s) * 100}%, ${Ui(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function Hi(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ui(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function Wi(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
//#endregion
//#region node_modules/d3-interpolate/src/constant.js
var Gi = (e) => () => e;
//#endregion
//#region node_modules/d3-interpolate/src/color.js
function Ki(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function qi(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function Ji(e, t) {
	var n = t - e;
	return n ? Ki(e, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : Gi(isNaN(e) ? t : e);
}
function Yi(e) {
	return (e = +e) == 1 ? Xi : function(t, n) {
		return n - t ? qi(t, n, e) : Gi(isNaN(t) ? n : t);
	};
}
function Xi(e, t) {
	var n = t - e;
	return n ? Ki(e, n) : Gi(isNaN(e) ? t : e);
}
//#endregion
//#region node_modules/d3-interpolate/src/rgb.js
var Zi = (function e(t) {
	var n = Yi(t);
	function r(e, t) {
		var r = n((e = Mi(e)).r, (t = Mi(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = Xi(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
//#endregion
//#region node_modules/d3-interpolate/src/hsl.js
function Qi(e) {
	return function(t, n) {
		var r = e((t = Vi(t)).h, (n = Vi(n)).h), i = Xi(t.s, n.s), a = Xi(t.l, n.l), o = Xi(t.opacity, n.opacity);
		return function(e) {
			return t.h = r(e), t.s = i(e), t.l = a(e), t.opacity = o(e), t + "";
		};
	};
}
//#endregion
//#region src/components/dashboard/dashboard-tools.js
var $i = {
	color: Oi,
	interpolateHsl: Qi(Ji),
	interpolateRgb: Zi
};
function ea(e, t, n) {
	if (e != "DEFAULT") {
		var r, i = ta;
		e == "RAINBOW" || e == "iRAINBOW" ? r = [
			"#FF0000",
			"#FFA500",
			"#FFFF00",
			"#00FF00",
			"#00FF00",
			"rgb(75, 0, 130)",
			"rgb(238, 130, 238)"
		] : e == "SPECTRUM" || e == "iSPECTRUM" ? (r = [
			"rgb(230, 30, 30)",
			"rgb(230, 230, 30)",
			"rgb(30, 230, 30)",
			"rgb(30, 230, 230)",
			"rgb(30, 30, 230)",
			"rgb(230, 30, 230)",
			"rgb(230, 30, 30)"
		], i = ra) : e == "RED2GREEN" || e == "iRED2GREEN" ? r = [
			"rgb(255, 51, 51)",
			"rgb(250, 235, 0)",
			"rgb(51, 200, 51)"
		] : e == "GREEN2BLUE" || e == "iGREEN2BLUE" ? r = [
			"rgb(51, 153, 51)",
			"rgb(51, 153, 200)",
			"rgb(51, 51, 255)"
		] : e == "HEAT" || e == "iHEAT" ? r = [
			"rgb(255, 51, 51)",
			"rgb(255, 255, 51)",
			"rgb(51, 153, 51)",
			"rgb(51, 153, 255)"
		] : e == "GREEN:INTENSITY" || e == "iGREEN:INTENSITY" ? (r = ["rgb(51, 153, 51)", "rgb(170, 250, 170)"], i = na) : e == "ANDROID" || e == "iANDROID" ? r = [
			"#0099CC",
			"#9933CC",
			"#CC0000",
			"#FF8800",
			"#669900"
		] : (e == "ANDROID:LIGHT" || e == "iANDROID:LIGHT") && (r = [
			"#33B5E5",
			"#AA66CC",
			"#ff4444",
			"#ffbb33",
			"#99cc00"
		]), e.charAt(0) == "i" && (r = r.reverse());
		var a, o = r[0] == r[r.length - 1], a = i(r, t + +!!o);
		return n ? a.map(function(e, t) {
			var r = $i.color(e);
			return r.opacity = n, r.formatRgb();
		}) : a;
	}
}
function ta(e, t) {
	return ia(e, t, function(e, t, n, r, i) {
		return $i.interpolateHsl(n, r)(e);
	});
}
function na(e, t) {
	return ia(e, t, function(e, t, n, r, i) {
		return $i.interpolateRgb(n, r)(e);
	});
}
function ra(e, t) {
	return ia(e, t, function(e, t, n, r, i) {
		var a = {
			r: null,
			g: null,
			b: null
		}, o = t ? $i.rgb(t) : a, s = $i.rgb(n), c = $i.rgb(r), l = i ? $i.rgb(i) : a, u = Math.max(Math.min(Math.round(aa(e, o.r, s.r, c.r, l.r)), 255), 0), d = Math.max(Math.min(Math.round(aa(e, o.g, s.g, c.g, l.g)), 255), 0), f = Math.max(Math.min(Math.round(aa(e, o.b, s.b, c.b, l.b)), 255), 0);
		return $i.rgb(u, d, f);
	});
}
function ia(e, t, n) {
	if (t == 1) return [e[0]];
	for (var r = 0, i = [], a = e.length, o = 0; (a - 1) % (t - 1) != 0 && o < 20;) o++, a = e.length + o * (e.length - 1);
	o++;
	for (var s = 0; s < e.length - 1; s++) {
		for (var c = s - 1 >= 0 ? e[s - 1] : null, l = e[s], u = e[s + 1], d = s + 2 < e.length ? e[s + 2] : null, f = r; f < o + 1; f++) {
			var p = n(f / o, c, l, u, d);
			i.push(p);
		}
		r = 1;
	}
	for (var m = [], s = 0; s < t; s++) {
		var h = (i.length - 1) / (t - 1) * s;
		m.push(i[h]);
	}
	return m;
}
function aa(e, t, n, r, i) {
	var a = r - n, o = t ?? n - a, s = i ?? r + a;
	return .5 * (2 * n + (-o + r) * e + (2 * o - 5 * n + 4 * r - s) * e * e + (-o + 3 * n - 3 * r + s) * e * e * e);
}
//#endregion
//#region src/components/dashboard/VDashboardChart.vue
var oa = {
	id: "verticalLineTooltipPlugin",
	afterDraw: (e) => {
		if (e.tooltip?._active?.length) {
			let { x: t } = e.tooltip._active[0].element, n = e.scales.y, { ctx: r } = e;
			r.save(), r.beginPath(), r.moveTo(t, n.top), r.lineTo(t, n.bottom), r.lineWidth = 2, r.strokeStyle = "rgba(50, 50, 50, 0.4)", r.stroke(), r.restore();
		}
	}
}, sa = {
	id: "verticalLinePlugin",
	getLinePositionAtIndex: function(e, t) {
		return e.getDatasetMeta(0).data[t].x;
	},
	getLinePositionAtX: function(e, t) {
		return e.scales.x.getPixelForValue(t, 0);
	},
	renderVerticalLine: function(e, t) {
		let n = e.scales.y, r = e.ctx, i = t.x ? this.getLinePositionAtX(e, t.x) : getLinePositionAtIndex(e, t.idx);
		r.beginPath(), r.strokeStyle = t.color ? t.color : "#ff0000", r.moveTo(i, n.top), r.lineTo(i, n.bottom), r.stroke(), r.fillStyle = t.color ? t.color : "#ff0000", r.textAlign = "center", typeof t.label == "function" ? r.fillText(t.label(), i, n.top - 8) : r.fillText(t.label ? t.label : "", i, n.top - 8);
	},
	afterDatasetsDraw: function(e, t) {
		e.config.options.vLineAt && e.config.options.vLineAt.forEach((t) => this.renderVerticalLine(e, t));
	}
}, ca = {
	props: {
		title: { type: String },
		type: {
			type: String,
			required: !0
		},
		datas: { type: Object },
		dataSeriesTranslator: { type: Function },
		queryUrl: { type: String },
		queryClusteredMeasure: { type: Object },
		queryMeasures: { type: Array },
		queryDataFilter: { type: Object },
		queryTimeFilter: { type: Object },
		queryGroupBy: { type: String },
		colors: {
			type: String,
			default: "DEFAULT"
		},
		labels: {
			type: Object,
			required: !0
		},
		minTime: { type: String },
		maxTime: { type: String },
		fillGapDim: { type: String },
		fillGapValue: { type: Number },
		timeFormat: {
			type: String,
			default: "YYYY-MM-DDTHH:mm"
		},
		tooltipTimeFormat: {
			type: String,
			default: "L LT"
		},
		verticalLines: { type: Array },
		additionalOptions: { type: Object }
	},
	created: function() {
		this.$data.graphChartId = "graphChartId_" + this.hashCode(this.type + "_" + JSON.stringify(this.labels)), window.dashboardGraphChart || (window.dashboardGraphChart = {});
	},
	mounted: function() {
		if (this.queryUrl) this.fetchData();
		else {
			this.$data.graphDataSeriesTranslator = this.dataSeriesTranslator ? this.dataSeriesTranslator : this.defaultDataSeriesTranslator;
			var e = this.$data.graphDataSeriesTranslator(this.datas);
			this.showChartJsChart(e.dataValues, e.dataMetrics, e.timedSeries, this.queryGroupBy, this.labels, this.colors, this.title, this.additionalOptions);
		}
	},
	data: function() {
		return {
			graphChartId: {},
			graphDataSeriesTranslator: this.defaultDataSeriesTranslator,
			stepSize: 1,
			truncatedMinTime: null,
			truncatedMaxTime: null
		};
	},
	watch: {
		datas: {
			handler(e, t) {
				if (this.datas) {
					var n = this.$data.graphDataSeriesTranslator(e);
					this.showChartJsChart(n.dataValues, n.dataMetrics, n.timedSeries, this.queryGroupBy, this.labels, this.colors, this.title, this.additionalOptions);
				}
			},
			deep: !0
		},
		queryTimeFilter: {
			handler(e, t) {
				this.queryUrl && this.hashCode(JSON.stringify(e)) !== this.hashCode(JSON.stringify(t)) && this.fetchData();
			},
			deep: !0
		},
		queryDataFilter: {
			handler(e, t) {
				this.queryUrl && this.hashCode(JSON.stringify(e)) !== this.hashCode(JSON.stringify(t)) && this.fetchData();
			},
			deep: !0
		}
	},
	unmounted: function() {
		var e = window.dashboardGraphChart[this.$data.graphChartId];
		e && (e.destroy(), delete window.dashboardGraphChart[this.$data.graphChartId]);
	},
	methods: {
		_filterObj: function(e, t) {
			var n = {};
			for (var r in e) e.hasOwnProperty(r) && r !== t && (n[r] = e[r]);
			return n;
		},
		hashCode: function(e) {
			let t;
			for (let n = 0; n < e.length; n++) t = Math.imul(31, t) + e.charCodeAt(n) | 0;
			return t;
		},
		fetchData: function() {
			var e = this.buildQuery();
			this.$http.post(this.queryUrl, e).then(function(e) {
				var t = this.$data.graphDataSeriesTranslator(e.data);
				this.showChartJsChart(t.dataValues, t.dataMetrics, t.timedSeries, this.queryGroupBy, this.labels, this.colors, this.title, this.additionalOptions);
			}.bind(this));
		},
		buildQuery: function() {
			var e = {
				dataFilter: this.queryDataFilter,
				timeFilter: this.queryTimeFilter
			};
			return this.queryMeasures && (e.measures = this.queryMeasures), this.queryClusteredMeasure && (e.clusteredMeasure = this.queryClusteredMeasure), this.queryGroupBy && (e.groupBy = this.queryGroupBy), e;
		},
		showChartJsChart: function(e, t, n, r, i, a, o, s) {
			var c = this.timeDimToDayJsPeriod();
			if (this.fillGapDim && this.minTime && this.maxTime && c !== "hour") {
				var l = dayjs(this.minTime, this.timeFormat).startOf(c), u = dayjs(this.maxTime, this.timeFormat).startOf(c), d = dayjs(this.minTime, this.timeFormat).endOf(c);
				d.isAfter(u) && (u = d), this.$data.truncatedMinTime = l.add(l.utcOffset(), "minute").valueOf(), this.$data.truncatedMaxTime = u.add(u.utcOffset(), "minute").valueOf();
			} else this.$data.truncatedMinTime = this.minTime ? dayjs(this.minTime, this.timeFormat).valueOf() : null, this.$data.truncatedMaxTime = this.maxTime ? dayjs(this.maxTime, this.timeFormat).valueOf() : null;
			var f = Object.values(i), p, m, h;
			if (this.type === "bubbles") {
				h = "bubble";
				var g = this._filterObj(i, r);
				f = Object.values(g), m = [{ data: this.toChartJsBubblesData(e, Object.keys(g), g, r) }], p = this.getChartJsBubblesOptions(e, Object.keys(g), r, g, o, s), this.setChartJsColorOptions(m, a, 1, .5);
			} else if (this.type === "linechart") h = "line", m = this.toChartJsData(e, i, n, r), p = this.getChartJsLineOptions(e, r, i, n, o, s), this.setChartJsColorOptions(m, a);
			else if (this.type === "barchart") h = "bar", m = this.toChartJsData(e, i, n, r), p = this.getChartJsLineOptions(e, r, i, n, o, s), this.setChartJsColorOptions(m, a, 1, .5);
			else if (this.type === "stackedbarchart") h = "bar", m = this.toChartJsData(e, i, n, r), p = this.getStackedOptions(e, r, i, n, o, s), this.setChartJsColorOptions(m, a, 1, .5);
			else if (this.type === "polararea") {
				h = "polarArea", m = this.toChartJsData(e, i, n, r);
				var _ = this.toChartJsPieData(m, i);
				m = _.datasets, f = _.labels, p = this.getPolarChartOptions(e, r, i, n, o, s), this.setChartJsPieColorOptions(m, a);
			} else if (this.type === "doughnut") {
				h = "doughnut";
				var g = this._filterObj(i, r);
				m = this.toChartJsData(e, g, n, r);
				var _ = this.toChartJsPieData(m, i);
				m = _.datasets, f = _.labels, this.setChartJsPieColorOptions(m, a), p = { legend: {
					display: !0,
					position: "bottom"
				} };
			}
			var v = this.$refs.graphCanvas, y = this.mergeDeep(p, s);
			if (window.dashboardGraphChart[this.$data.graphChartId]) {
				var ee = window.dashboardGraphChart[this.$data.graphChartId];
				ee.data.datasets = m, this.hashCode(JSON.stringify(ee.options.scales)) !== this.hashCode(JSON.stringify(y.scales)) && (ee.options.scales = y.scales), ee.update("none");
			} else {
				let e = { datasets: m };
				n || (e.labels = f);
				var ee = new Chart(v, {
					type: h,
					data: e,
					options: y,
					plugins: [oa, sa]
				});
				window.dashboardGraphChart[this.$data.graphChartId] = ee;
			}
		},
		setChartJsColorOptions: function(e, t, n, r) {
			if (t && t !== "DEFAULT") for (var i = ea(t, e.length, n), a = ea(t, e.length, r || (n ? n * .25 : .25)), o = 0; o < e.length; o++) e[o].borderColor = i[o], e[o].backgroundColor = a[o], e[o].pointBackgroundColor = i[o], e[o].pointBorderColor = "#FFFFFFAF", e[o].pointBorderWidth = 2, e[o].fill = !0;
		},
		setChartJsPieColorOptions: function(e, t, n) {
			if (t && t !== "DEFAULT") for (var r = 0; r < e.length; r++) e[r].backgroundColor = ea(t, e[r].data.length, n);
		},
		getChartJsBubblesOptions: function(e, t, n, r, i, a) {
			var o = this.getMaxRadius(e, t[2]), s = this.getAxisType(e, a, "xAxisType", t[0]), c = this.getAxisType(e, a, "yAxisType", t[1]);
			return {
				scales: {
					x: { type: s },
					y: { type: c }
				},
				elements: { point: { radius: function(e) {
					var t = e.dataIndex, n = e.dataset.data[t], r = e.chart.width, i = n.r_measure / o;
					return r / 24 * i;
				} } },
				legend: { display: !1 },
				plugins: { tooltip: {
					displayColors: !1,
					callbacks: {
						title: function(e) {
							var t = e[0];
							return t.dataset.data[t.dataIndex].name;
						},
						label: function(e) {
							var n = e.dataset.data[e.dataIndex];
							return [
								r[t[0]] + " : " + Math.round(n.x),
								r[t[1]] + " : " + Math.round(n.y),
								r[t[2]] + " : " + Math.round(n.r_measure)
							];
						}
					}
				} }
			};
		},
		getPolarChartOptions: function(e, t, n, r, i) {
			return {};
		},
		getAxisType: function(e, t, n, r) {
			var i = "linear";
			if (t && t[n]) if (t[n] === "auto") {
				var a = getMinMax(e, r);
				a.max > 0 && a.min / a.max < .001 && (i = "logarithmic");
			} else i = t[n];
			return i;
		},
		getChartJsLineOptions: function(e, t, n, r, i, a) {
			var o = {
				scales: { y: {
					ticks: { beginAtZero: !0 },
					suggestedMin: 0,
					suggestedMax: 5
				} },
				plugins: {
					title: {
						display: !!i,
						text: i || "",
						align: "start",
						padding: 20,
						font: {
							size: 14,
							weight: "bold"
						}
					},
					legend: { position: "bottom" },
					tooltip: {
						mode: "index",
						position: "nearest",
						boxPadding: 3,
						backgroundColor: "#F8F8F8D0",
						titleColor: "#000",
						bodyColor: "#000",
						borderColor: "#333",
						borderWidth: 1
					}
				},
				elements: {
					point: {
						radius: 3,
						hoverRadius: 6
					},
					line: { tension: 0 },
					bar: { borderWidth: 3 }
				}
			};
			return r ? (o.scales.x = {
				type: "time",
				ticks: {
					source: "auto",
					major: { enabled: !0 }
				},
				time: {
					displayFormats: {
						hour: "HH:mm",
						minute: "HH:mm"
					},
					tooltipFormat: this.tooltipTimeFormat
				}
			}, this.$data.truncatedMinTime && (o.scales.x.suggestedMin = this.$data.truncatedMinTime), this.$data.truncatedMaxTime && (o.scales.x.suggestedMax = this.$data.truncatedMaxTime)) : o.scales.x = { type: "category" }, o;
		},
		getStackedOptions: function(e, t, n, r, i, a) {
			var o = this.getChartJsLineOptions(e, t, n, r, i, a);
			return this.mergeDeep(o, { scales: {
				x: { stacked: !0 },
				y: { stacked: !0 }
			} });
		},
		toChartJsBubblesData: function(e, t, n, r) {
			for (var i = [], a = 0; a < e.length; a++) {
				var o = {};
				o.x = e[a].values[t[0]], o.y = e[a].values[t[1]];
				var s = e[a].values[t[2]];
				!this.isEmpty(e[a].values) && !s && (s = 0), o.name = e[a].values[r], o.r_measure = s, i.push(o);
			}
			return i;
		},
		getMaxRadius: function(e, t) {
			for (var n = 0, r = 0; r < e.length; r++) {
				var i = e[r].values[t];
				i > n && (n = i);
			}
			return Math.max(n, 1);
		},
		getMinMax: function(e, t) {
			for (var n = 0, r = 0, i = 0; i < e.length; i++) {
				var a = e[i].values[t];
				a > r && (r = a), a < n && (n = a);
			}
			return {
				min: n,
				max: r
			};
		},
		defaultDataSeriesTranslator: function(e) {
			return {
				dataValues: e.timedDataSeries ? e.timedDataSeries : e.tabularDataSeries,
				dataMetrics: e.seriesNames,
				timedSeries: !!e.timedDataSeries
			};
		},
		toChartJsData: function(e, t, n, r) {
			let i = function(e, t) {
				return e.indexOf(t, e.length - t.length) !== -1;
			};
			var a = this.timeDimToDayJsPeriod(), o = [];
			for (let g in t) {
				var s = {};
				s.data = [], s.parsing = !1, t && t[g] && (s.label = t[g]);
				for (var c = this.$data.truncatedMinTime ? dayjs(this.$data.truncatedMinTime).subtract(1, a) : null, l = 0; l < e.length; l++) {
					if (n && this.fillGapDim) for (var u = c ? dayjs(c).add(1, a) : null, d = c ? u.add(1, a) : null, f = dayjs(e[l].time); !f.isBefore(d);) s.data.push({
						x: u.valueOf(),
						y: this.fillGapValue
					}), u = d, d = d.add(1, a), c = u.valueOf();
					var p = n ? dayjs(e[l].time).valueOf() : e[l].values[r], m = e[l].values[g];
					!this.isEmpty(e[l].values) && !m && (m = 0), s.data.push({
						x: p,
						y: m
					}), c = p;
				}
				if (n && this.fillGapDim && this.$data.truncatedMaxTime) for (var u = c ? dayjs(c).add(1, a) : null, h = dayjs(this.$data.truncatedMaxTime); !u.isAfter(h);) s.data.push({
					x: u.valueOf(),
					y: this.fillGapValue
				}), u = u.add(1, a), c = u.valueOf();
				s.label || (i(g, "count") ? s.label = "Quantité" : i(g, "mean") ? s.label = "Moyenne" : i(g, "min") ? s.label = "Minimum" : i(g, "max") && (s.label = "Maximum")), o.push(s);
			}
			return o;
		},
		toChartJsPieData: function(e, t) {
			for (var n = [], r = [], i = 0; i < e[0].data.length; i++) {
				var a = e[0].data[i].x;
				t && t[e[0].data[i].x] && (a = t[e[0].data[i].x]), r.push(a), n.push(e[0].data[i].y);
			}
			return {
				datasets: [{ data: n }],
				labels: r
			};
		},
		timeDimToDayJsPeriod: function() {
			let e = this.fillGapDim;
			return e === "1h" ? "hour" : e === "1d" ? "day" : e === "1w" ? "week" : e === "1M" ? "month" : e === "3M" ? "quarter" : e === "1y" ? "year" : "hour";
		},
		isEmpty: function(e) {
			return Object.keys(e).length === 0;
		},
		isObject: function(e) {
			return e && typeof e == "object" && !Array.isArray(e);
		},
		mergeDeep: function(e, ...t) {
			if (!t.length) return e;
			let n = t.shift();
			if (this.isObject(e) && this.isObject(n)) for (let t in n) this.isObject(n[t]) ? (e[t] || Object.assign(e, { [t]: {} }), this.mergeDeep(e[t], n[t])) : Object.assign(e, { [t]: n[t] });
			return this.mergeDeep(e, ...t);
		}
	}
}, la = window.Vue.openBlock, ua = window.Vue.createElementBlock, da = { ref: "graphCanvas" };
function fa(e, t, n, r, i, a) {
	return la(), ua("canvas", da, null, 512);
}
var pa = /*#__PURE__*/ l(ca, [["render", fa]]), ma = {
	mounted: function(e, t, n) {
		var r = t.value;
		if (!window.watcherUpdates && (window.watcherUpdates = {
			originalDocumentTitle: document.title,
			updates_detected: !1,
			acceptedUpdates: function() {
				window.watcherUpdates.updates_detected = !1, document.title = window.watcherUpdates.originalDocumentTitle;
			},
			beforeWindowUnload: function(e) {
				window.watcherUpdates.updates_detected && (e.preventDefault(), e.returnValue = "Voulez-vous quitter cette page ? \n Les modifications que vous avez apportées ne seront peut-être pas enregistrées");
			}
		}, window.addEventListener("beforeunload", window.watcherUpdates.beforeWindowUnload), t.instance.$root.uiMessageStack)) {
			var i = t.instance.$root.uiMessageStack, a = i.globalErrors.length > 0;
			for (let e of r.split(",")) if (a ||= i.objectFieldErrors[e], a) break;
			a && (window.watcherUpdates.updates_detected = !0);
		}
		e.addEventListener("click", window.watcherUpdates.acceptedUpdates);
		for (let e of r.split(",")) t.instance.$root.$watch("vueData." + e, function() {
			window.watcherUpdates.updates_detected = !0, document.title = "*" + window.watcherUpdates.originalDocumentTitle;
		}, { deep: !0 });
	},
	unmounted: function() {
		window.removeEventListener("beforeunload", window.watcherUpdates.beforeWindowUnload);
	}
}, ha = { mounted: function(e, t, n) {
	t.value && !window.autofocus && (window.autofocus = !0, e.focus());
} }, ga = window.Vue.nextTick, _a = { updated: function(e, t, n) {
	ga(() => {
		!window.watcherUpdates || !window.watcherUpdates.updates_detected ? e.classList.add("hidden") : e.classList.remove("hidden");
	});
} };
//#endregion
//#region node_modules/quasar/src/utils/throttle/throttle.js
function va(e, t = 250) {
	let n = !1, r;
	return function(...i) {
		return n || (n = !0, setTimeout(() => {
			n = !1;
		}, t), r = e.apply(this, i)), r;
	};
}
//#endregion
//#region src/directives/VMinify.js
var ya = window.Vue, ba = {
	created: function(e, t) {
		let n = t.value ? t.value.topOffset : null, r = t.value ? t.value.topOffsetEl : null, i = t.value ? t.value.leftOffset : null, a = t.value ? t.value.leftOffsetEl : null, o = t.value ? t.value.scrollContainerEl : ".q-page-container", s = e.querySelector(".mini");
		for (var c = 0; c < e.childNodes.length; c++) {
			var l = e.childNodes[c];
			l.classList && !l.classList.contains("mini") && l.classList.add("not-mini");
		}
		ya.minifyHandler = function() {
			var t = e.closest(o), c = t ? -t.getBoundingClientRect().y : window.pageYOffset, l = t ? -t.getBoundingClientRect().x : window.pageXOffset, u = e.getBoundingClientRect().y + c, d = e.getBoundingClientRect().x + l;
			(n || r) && (u = ya.minifyComputeOffset(n, r, 0, "TOP")), (i || a) && (d = ya.minifyComputeOffset(i, a, 0, "LEFT"));
			var f = s.getBoundingClientRect().height;
			c > e.getBoundingClientRect().height - f ? (s.classList.add("visible"), s.style.top = u + "px", s.style.left = d + "px") : (s.classList.remove("visible"), s.style.top = -f - u + "px");
		}, ya.minifyComputeOffset = function(e, t, n, r) {
			var i = n;
			if (e) i = e;
			else if (t) {
				var a = document.querySelector(t).getBoundingClientRect();
				r === "LEFT" ? i = a.width + a.x : r === "TOP" && (i = a.height + a.y);
			}
			return i;
		}, window.addEventListener("scroll", ya.minifyHandler), window.addEventListener("resize", va(ya.minifyHandler, 50));
	},
	updated: function() {
		setTimeout(ya.minifyHandler, 50);
	},
	unmounted: function(e) {
		window.removeEventListener("scroll"), window.removeEventListener("resize");
		for (var t = 0; t < e.childNodes.length; t++) {
			var n = e.childNodes[t];
			n.classList && n.classList.remove("not-mini");
		}
	}
}, xa = [
	null,
	document,
	document.body,
	document.scrollingElement,
	document.documentElement
];
function Sa(e, t) {
	let n = Ia(t);
	if (n === void 0) {
		if (e == null) return window;
		n = e.closest(".scroll,.scroll-y,.overflow-auto");
	}
	return xa.includes(n) ? window : n;
}
function Ca(e) {
	return (e === window ? document.body : e).scrollHeight;
}
function wa(e) {
	return (e === window ? document.body : e).scrollWidth;
}
function Ta(e) {
	return e === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : e.scrollTop;
}
function Ea(e) {
	return e === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : e.scrollLeft;
}
function Da(e, t, n = 0) {
	let r = arguments[3] === void 0 ? performance.now() : arguments[3], i = Ta(e);
	if (n <= 0) {
		i !== t && ka(e, t);
		return;
	}
	requestAnimationFrame((a) => {
		let o = a - r, s = i + (t - i) / Math.max(o, n) * o;
		ka(e, s), s !== t && Da(e, t, n - o, a);
	});
}
function Oa(e, t, n = 0) {
	let r = arguments[3] === void 0 ? performance.now() : arguments[3], i = Ea(e);
	if (n <= 0) {
		i !== t && Aa(e, t);
		return;
	}
	requestAnimationFrame((a) => {
		let o = a - r, s = i + (t - i) / Math.max(o, n) * o;
		Aa(e, s), s !== t && Oa(e, t, n - o, a);
	});
}
function ka(e, t) {
	if (e === window) {
		window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, t);
		return;
	}
	e.scrollTop = t;
}
function Aa(e, t) {
	if (e === window) {
		window.scrollTo(t, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
		return;
	}
	e.scrollLeft = t;
}
function ja(e, t, n) {
	if (n) {
		Da(e, t, n);
		return;
	}
	ka(e, t);
}
function Ma(e, t, n) {
	if (n) {
		Oa(e, t, n);
		return;
	}
	Aa(e, t);
}
var Na;
function Pa() {
	if (Na !== void 0) return Na;
	let e = document.createElement("p"), t = document.createElement("div");
	La(e, {
		width: "100%",
		height: "200px"
	}), La(t, {
		position: "absolute",
		top: "0px",
		left: "0px",
		visibility: "hidden",
		width: "200px",
		height: "150px",
		overflow: "hidden"
	}), t.appendChild(e), document.body.appendChild(t);
	let n = e.offsetWidth;
	t.style.overflow = "scroll";
	let r = e.offsetWidth;
	return n === r && (r = t.clientWidth), t.remove(), Na = n - r, Na;
}
function Fa(e, t = !0) {
	return !e || e.nodeType !== Node.ELEMENT_NODE ? !1 : t ? e.scrollHeight > e.clientHeight && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-y"])) : e.scrollWidth > e.clientWidth && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-x"]));
}
function Ia(e) {
	if (e == null) return;
	if (typeof e == "string") try {
		return document.querySelector(e) || void 0;
	} catch {
		return;
	}
	let t = unref(e);
	if (t) return t.$el || t;
}
function La(e, t) {
	let n = e.style;
	for (let e in t) n[e] = t[e];
}
var Ra = {
	getScrollTarget: Sa,
	getScrollHeight: Ca,
	getScrollWidth: wa,
	getVerticalScrollPosition: Ta,
	getHorizontalScrollPosition: Ea,
	animVerticalScrollTo: Da,
	animHorizontalScrollTo: Oa,
	setVerticalScrollPosition: ja,
	setHorizontalScrollPosition: Ma,
	getScrollbarWidth: Pa,
	hasScrollbar: Fa
}, Q = window.Vue, za = {
	created: function(e, t) {
		Q.createDebugLine = function(e, t, n, r) {
			let i = document.createElement("div");
			return i.style.position = t, i.style.top = n + "px", i.style.border = "none", i.style.borderTop = r + " solid 1px", i.style.width = "100%", i.style.zIndex = "10000", i.style.padding = "0px", i.style.lineHeight = "0px", i.style.fontSize = "12px", i.style.color = r, i.innerHTML = e, document.querySelector("body").appendChild(i), i;
		};
		let n = t.value.debug ? t.value.debug : !1, r = t.value.startingOffset ? t.value.startingOffset : 24, i = t.value.fixedPos ? t.value.fixedPos : 24, a = r - i, o = t.value.scanner ? t.value.scanner : i + 30, s = e.querySelectorAll("a");
		s[0].classList.add("active"), s[0].ariaCurrent = "step";
		let c = Ra.getScrollTarget(document.querySelector(s[0].hash)), l = [], u, d;
		n && (u = Q.createDebugLine("startLinear", "absolute", 0, "red"), d = Q.createDebugLine("last", "absolute", 0, "red")), Q.scrollSpyHandler = function() {
			if (n) {
				for (var t = e, r = 0, o = 0; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop);) r += t.offsetLeft - t.scrollLeft, o += t.offsetTop - t.scrollTop, t = t.offsetParent;
				console.log("x: " + r), console.log("y: " + o + " (startingOffset)");
			}
			window.pageYOffset > a ? (e.style.top || (e.style.top = i + "px", e.classList.add("fixed")), e.style.width = e.parentElement.getBoundingClientRect().width + "px") : e.style.top && (e.classList.remove("fixed"), e.style.top = null, e.style.width = null);
			for (var l = Ra.getVerticalScrollPosition(c), u = Q.computeBreakPoints(l), d = 0; d < s.length; d++) u[d] <= l && (d >= s.length - 1 || l < u[d + 1]) ? (s[d].classList.add("active"), s[d].ariaCurrent = "step") : (s[d].classList.remove("active"), s[d].removeAttribute("aria-current"));
		}, Q.computeBlockTop = function(e) {
			var t = [];
			for (let n = 0; n < s.length; n++) {
				let r = s[n].hash, i = document.querySelector(r);
				i && t.push(e + i.getBoundingClientRect().top);
			}
			return t;
		}, Q.scrollTo = function(e) {
			e.preventDefault();
			let t = e.target.hash, n = document.querySelector(t);
			for (var r = Ra.getVerticalScrollPosition(c) + n.getBoundingClientRect().top - o, i = Ra.getVerticalScrollPosition(c), a = Q.computeBlockTop(i), l = Q.computeBreakPoints(i), u = 0; u < s.length; u++) if (s[u].hash == t) {
				r = a[u] - o < l[u + 1] || !l[u + 1] ? a[u] - o : l[u + 1] - 1;
				break;
			}
			Ra.setVerticalScrollPosition(c, r, 200);
		}, Q.computeBreakPoints = function(e) {
			var t = Q.computeBlockTop(e);
			let r = window.innerHeight || document.documentElement.clientHeight, i = Ra.getScrollHeight(c), a = i - r, f = a - r + o;
			for (let e = 1; e < s.length; e++) if (t[e] - o > f) {
				f = t[e] - o;
				break;
			}
			let p = a - f;
			var m = [];
			m.push(0);
			for (let e = 1; e < s.length; e++) t[e] - o > f ? m[e] = f + p * (t[e] - f) / (i - f) : m[e] = t[e] - o, m[e] = Math.round(m[e]);
			if (n) {
				for (let e = 1; e < s.length; e++) {
					var h;
					l.length < e ? (h = Q.createDebugLine("navId#" + e, "absolute", 0, "red"), l.push(h)) : h = l[e - 1], h.style.top = m[e] + o + "px";
				}
				u.style.top = f + o + "px", d.style.top = a + o + "px";
			}
			return m;
		}, e.classList.add("scroll-spy-nav");
		for (var f = 0; f < s.length; f++) s[f].addEventListener("click", Q.scrollTo);
		window.addEventListener("scroll", Q.scrollSpyHandler), window.addEventListener("resize", va(Q.scrollSpyHandler, 50));
	},
	unmounted: function(e) {
		e.classList.remove("scroll-spy-nav"), window.removeEventListener("scroll"), window.removeEventListener("resize");
		let t = e.querySelectorAll("a");
		for (var n = 0; n < t.length; n++) t.removeEventListener("click");
	}
};
//#endregion
//#region node_modules/quasar/src/utils/private.sort/sort.js
function Ba(e, t) {
	return new Date(e) - new Date(t);
}
//#endregion
//#region node_modules/quasar/src/utils/is/is.js
function Va(e) {
	return Object.prototype.toString.call(e) === "[object Date]";
}
function Ha(e) {
	return typeof e == "number" && Number.isFinite(e);
}
//#endregion
//#region src/methods.js
var $ = window.Quasar, Ua = {
	debounce: bn.default,
	onAjaxError: function(e) {
		let t = {
			type: "negative",
			message: "Network Error.",
			multiLine: !0,
			icon: "warning",
			timeout: 2500
		};
		if (e) {
			if (Object.prototype.hasOwnProperty.call(e.data, "redirect")) {
				window.location = e.data.redirect;
				return;
			} else Object.prototype.hasOwnProperty.call(e.data, "message") && (t.message = e.data.message);
			if (e.status === 401) {
				t.message = this.$q.lang.vui.ajaxErrors.code401, this.$root.$emit("unauthorized", e);
				return;
			} else e.status === 403 ? t.message = this.$q.lang.vui.ajaxErrors.code403 : e.status === 404 ? t.message = this.$q.lang.vui.ajaxErrors.code404 : e.status === 405 ? t.message = this.$q.lang.vui.ajaxErrors.code405 : e.status === 422 ? (t.message = "", Object.keys(e.data).forEach(function(t) {
				this.$data.uiMessageStack[t] = e.data[t];
			}.bind(this))) : e.status >= 500 && (t.message = this.$q.lang.vui.ajaxErrors.code500);
			e.statusText && e.status !== 422 && (t.message = e.statusText), Object.prototype.hasOwnProperty.call(e, "data") && (Object.prototype.hasOwnProperty.call(e.data, "message") && e.data.message && e.data.message.length > 0 ? t.message = e.data.message : Object.prototype.hasOwnProperty.call(e.data, "globalErrors") && e.data.globalErrors && e.data.globalErrors.length > 0 && (this.uiMessageStackToNotify(e.data).forEach(function(e) {
				this.$q.notify(e);
			}.bind(this)), t.message = ""));
		}
		t.message.length > 0 && this.$q.notify(t);
	},
	uiMessageStackToNotify: function(e) {
		if (e) {
			var t = [];
			return Object.prototype.hasOwnProperty.call(e, "globalErrors") && e.globalErrors && e.globalErrors.length > 0 && e.globalErrors.forEach(function(e) {
				t.push({
					color: "negative",
					textColor: "white",
					message: e,
					multiLine: !0,
					timeout: 2500
				});
			}), Object.prototype.hasOwnProperty.call(e, "globalWarnings") && e.globalWarnings && e.globalWarnings.length > 0 && e.globalWarnings.forEach(function(e) {
				t.push({
					color: "warning",
					textColor: "black",
					message: e,
					multiLine: !0,
					timeout: 2500
				});
			}), Object.prototype.hasOwnProperty.call(e, "globalInfos") && e.globalInfos && e.globalInfos.length > 0 && e.globalInfos.forEach(function(e) {
				t.push({
					color: "info",
					textColor: "black",
					message: e,
					multiLine: !0,
					timeout: 2500
				});
			}), Object.prototype.hasOwnProperty.call(e, "globalSuccess") && e.globalSuccess && e.globalSuccess.length > 0 && e.globalSuccess.forEach(function(e) {
				t.push({
					color: "positive",
					textColor: "black",
					message: e,
					multiLine: !0,
					timeout: 2500
				});
			}), t;
		}
	},
	i18n: function() {
		return VertigoUi.lang[VertigoUi.vuiLang];
	},
	getSafeValue: function(e, t, n) {
		return this.$data.vueData[e] && this.$data.vueData[e][t] ? this.$data.vueData[e][t][n] : null;
	},
	transformListForSelection: function(e, t, n, r, i) {
		let a = this.$data.vueData[e];
		if (r && (a = a.filter(r)), i != null && i.trim() !== "") {
			let e = this.unaccentLower(i);
			a = a.filter((t) => this.unaccentLower(t[n].toString()).indexOf(e) > -1), a.sort((t, r) => {
				let i = this.unaccentLower(t[n].toString()).startsWith(e), a = this.unaccentLower(r[n].toString()).startsWith(e);
				return i && !a ? -1 : !i && a ? 1 : 0;
			});
		}
		return a.map(function(e) {
			return {
				value: e[t],
				label: e[n].toString()
			};
		});
	},
	unaccentLower: function(e) {
		return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
	},
	paginationAndSortHandler: function(e) {
		var t = e.pagination;
		let n = this.$data.componentStates, r = this.$data.vueData;
		var i = n[t.componentId].pagination;
		if ((i.sortBy != t.sortBy || i.descending != t.descending) && t.sortBy) {
			let e = n[t.componentId].columns.find((e) => e.name === t.sortBy);
			t.sortUrl ? (t.page = 1, this.$http.post(t.sortUrl, this.objectToFormData({
				sortFieldName: e.field,
				sortDesc: t.descending,
				CTX: this.$data.vueData.CTX
			})).then(function(e) {
				r[t.listKey] = e.data.model[t.listKey], this.$data.vueData.CTX = e.data.model.CTX;
			}.bind(this))) : this.$refs[t.componentId].sortMethod.apply(this.$refs[t.componentId], [
				r[t.listKey],
				e.field,
				t.descending
			]);
		}
		n[t.componentId].pagination = t;
	},
	paginatedData: function(e, t) {
		var n = this.$data.componentStates[t].pagination;
		if (n.rowsPerPage != 0) {
			var r = (n.page - 1) * n.rowsPerPage, i = n.page * n.rowsPerPage;
			return this.$data.vueData[e].slice(r, i);
		}
		return this.$data.vueData[e];
	},
	createDefaultTableSort: function(e) {
		return this.$data.componentStates[e] ? function(t, n, r) {
			let i = this.$data.componentStates[e].columns.find((e) => e.name === n);
			if (i.datetimeFormat) {
				let e = r === !0 ? -1 : 1, n = (e) => e[i.field];
				return t.sort((t, r) => {
					let a = n(t), o = n(r);
					return ($.date.extractDate(a, i.datetimeFormat).getTime() > $.date.extractDate(o, i.datetimeFormat).getTime() ? 1 : -1) * e;
				});
			} else return this.sortCiAi(t, i.field, r);
		}.bind(this) : this.sortCiAi;
	},
	sortCiAi: function(e, t, n) {
		let r = n === !0 ? -1 : 1, i = (e) => e[t], a = new Intl.Collator();
		return e.sort((e, t) => {
			let n = i(e), o = i(t);
			return n == null ? -1 * r : o == null ? 1 * r : Ha(n) === !0 && Ha(o) === !0 ? (n - o) * r : Va(n) === !0 && Va(o) === !0 ? Ba(n, o) * r : typeof n == "boolean" && typeof o == "boolean" ? (n - o) * r : ([n, o] = [n, o].map((e) => (e + "").toLocaleString()), a.compare(n, o) * r);
		});
	},
	selectedFunction: function(e, t, n) {
		this.$data.vueData[e][t] = n.value;
	},
	searchAutocomplete: function(e, t, n, r, i, a, o, s, c) {
		if (o.length < a) {
			c();
			return;
		}
		this.$http.post(i, this.objectToFormData({
			terms: o,
			list: e,
			valueField: t,
			labelField: n,
			CTX: this.$data.vueData.CTX
		})).then(function(e) {
			var i = e.data.map(function(e) {
				return {
					value: e[t],
					label: e[n].toString()
				};
			});
			s(function() {
				this.$data.componentStates[r].options = i;
			}.bind(this));
		}.bind(this)).catch(function(e) {
			this.$q.notify(e.response.status + ":" + e.response.statusText), s([]);
		});
	},
	loadAutocompleteById: function(e, t, n, r, i, a, o, s) {
		var c = s == null ? this.$data.vueData[a][o] : this.$data.vueData[a][s][o];
		Array.isArray(c) ? c.forEach((a) => this.loadMissingAutocompleteOption(e, t, n, r, i, a)) : this.loadMissingAutocompleteOption(e, t, n, r, i, c);
	},
	loadMissingAutocompleteOption: function(e, t, n, r, i, a) {
		!a || this.$data.componentStates[r].options.filter(function(e) {
			return e.value === a;
		}.bind(this)).length > 0 || (this.$data.componentStates[r].loading = !0, this.$http.post(i, this.objectToFormData({
			value: a,
			list: e,
			valueField: t,
			labelField: n,
			CTX: this.$data.vueData.CTX
		})).then(function(e) {
			var i = e.data.map(function(e) {
				return {
					value: e[t],
					label: e[n].toString()
				};
			});
			this.$data.componentStates[r].options = this.$data.componentStates[r].options.concat(i);
		}.bind(this)).catch(function(e) {
			this.$q.notify(e.response.status + ":" + e.response.statusText);
		}.bind(this)).then(function() {
			this.$data.componentStates[r].loading = !1;
		}.bind(this)));
	},
	decodeDate: function(e, t) {
		return e === $.date.formatDate($.date.extractDate(e, "YYYY-MM-DD"), "YYYY-MM-DD") ? $.date.formatDate($.date.extractDate(e, "YYYY-MM-DD"), t) : e;
	},
	encodeDate: function(e, t) {
		return e === $.date.formatDate($.date.extractDate(e, t), t) ? $.date.formatDate($.date.extractDate(e, t), "YYYY-MM-DD") : e;
	},
	decodeDatetime: function(e, t) {
		return e === $.date.formatDate($.date.extractDate(e, "YYYY-MM-DD[T]HH:mm"), "YYYY-MM-DD[T]HH:mm") ? $.date.formatDate($.date.extractDate(e, "YYYY-MM-DD[T]HH:mm"), t) : e;
	},
	encodeDatetime: function(e, t) {
		return e === $.date.formatDate($.date.extractDate(e, t), t) ? $.date.formatDate($.date.extractDate(e, t), "YYYY-MM-DD[T]HH:mm") : e;
	},
	sortDatesAsString: function(e) {
		return function(t, n, r, i) {
			return $.date.extractDate(t, e).getTime() > $.date.extractDate(n, e).getTime() ? 1 : -1;
		};
	},
	goTo: function(e) {
		window.location = e;
	},
	openModal: function(e, t, n) {
		if (t) {
			var r = t;
			if (n && Object.keys(n).length > 0) {
				var i = Object.keys(n).map(function(e) {
					return e + "=" + n[e];
				}).join("&");
				r = r + "?" + i;
			}
			this.$data.componentStates[e].srcUrl = r;
		}
		this.$data.componentStates[e].opened = !0;
	},
	toogleFacet: function(e, t, n, r = 1) {
		let i = this.$data.vueData;
		var a = !1;
		i[n + "_facets"].forEach(function(t) {
			t.code === e && (a = t.multiple);
		});
		var o = i[n + "_selectedFacets"][e];
		o ? o.includes(t) ? a ? o.splice(o.indexOf(t), 1) : o.splice(0) : o.push(t) : i[n + "_selectedFacets"][e] = [t], this.search(n, r);
	},
	search: (0, bn.default)(function(e, t = 1) {
		let n = this.$data.componentStates, r = this.$data.vueData;
		var i = e + "_selectedFacets", a = r[e + "_criteriaContextKey"], o = this.vueDataParams([a]);
		o.append(i, JSON.stringify(r[i]));
		var s = n[e + "Search"].searchUrl, c = n[e + "Search"].collectionComponentId;
		if (n[c].pagination && n[c].pagination.sortBy) {
			var l = n[c].pagination;
			let e = n[c].columns.find((e) => e.name === l.sortBy);
			e.field != null && o.append("sortFieldName", e.field), o.append("sortDesc", l.descending);
		}
		this.httpPostAjax(s, o, { onSuccess: function(r) {
			if (n[c].pagination) {
				var i = n[c].pagination;
				i.page = t, i.rowsNumber = r.data.model[e + "_list"].length;
			}
		} });
	}, 400),
	showMore: function(e) {
		let t = this.$data.componentStates;
		var n = t[e].pagination.showMoreCount;
		n || (n = 1, t[e].pagination.showMoreCount = n), t[e].pagination.rowsPerPage = t[e].pagination.rowsPerPage / n * (n + 1);
	},
	vueDataToArray(e) {
		return Array.isArray(e) ? e : e ? [e] : [];
	},
	vueDataToObject(e) {
		return Array.isArray(e) ? e.length == 0 ? null : e.length == 1 ? e[0] : e : e || null;
	},
	obtainVueDataAccessor(e, t, n, r) {
		return n != null && n != "null" ? r == null ? {
			get: function() {
				return e.$data.vueData[t][n];
			},
			set: function(r) {
				e.$data.vueData[t][n] = r;
			}
		} : {
			get: function() {
				return e.$data.vueData[t][r][n];
			},
			set: function(i) {
				e.$data.vueData[t][r][n] = i;
			}
		} : {
			get: function() {
				return e.$data.vueData[t];
			},
			set: function(n) {
				e.$data.vueData[t] = n;
			}
		};
	},
	uploader_dragenter(e, t) {
		let n = this.$data.componentStates;
		n[e].dragover = !0;
	},
	uploader_dragover(e, t) {
		this.$refs[t]?.canAddFiles() || (e.dataTransfer.dropEffect = "none");
	},
	uploader_dragleave(e) {
		let t = this.$data.componentStates;
		t[e].dragover = !1;
	},
	uploader_drop(e, t) {
		this.$refs[t].addFiles(e.dataTransfer.files);
	},
	modal_iframeLoad(e) {
		let t = e.dataset.componentId;
		e.dataset.autoHeight === "true" && (e.style.opacity = "0", this.modal_iframeAjustHeight(e)), this.componentStates[t].loading = !1, e.style.opacity = "1";
	},
	modal_iframeAjustHeight(e) {
		let t = e.dataset.componentId, n = e.contentDocument ? e.contentDocument : e.contentWindow.document;
		setTimeout(function() {
			let r = this.getDocHeight(n) + 4 + "px";
			e.style.height = "", this.componentStates[t].height = r;
		}.bind(this), 1);
	},
	getDocHeight: function(e) {
		e ||= document;
		let t = e.body, n = e.documentElement;
		return Math.max(t.scrollHeight, t.offsetHeight, n.scrollHeight, n.offsetHeight, n.clientHeight);
	},
	httpPostAjax: function(e, t, n) {
		var r = t ? Array.isArray(t) ? this.vueDataParams(t) : t : [];
		let i = this.$data.vueData, a = this.$data.uiMessageStack, o = this.isFormData(r) ? r : this.objectToFormData(r);
		o.append("CTX", i.CTX), this.pushPendingAction(e), this.$http.post(e, o).then(function(e) {
			if (e.data.model.CTX && (i.CTX = e.data.model.CTX), n && n.updatedKeys) for (var t = 0; t < n.updatedKeys.length; t++) {
				var r = n.updatedKeys[t].split(".", 2), o = r[0], s = r[1];
				let a = e.data.model[o];
				a && (typeof a == "object" && Array.isArray(a) === !1 && s ? i[o][s] = e.data.model[o][s] : i[o] = e.data.model[o]);
			}
			else Object.keys(e.data.model).forEach(function(t) {
				t != "CTX" && (i[t] = e.data.model[t]);
			});
			n && n.notifyUiMessageStack ? this.uiMessageStackToNotify(e.data.uiMessageStack).forEach(function(e) {
				this.$q.notify(e);
			}.bind(this)) : Object.keys(e.data.uiMessageStack).forEach(function(t) {
				a[t] = e.data.uiMessageStack[t];
			}), n && n.onSuccess && n.onSuccess.call(this, e, window);
		}.bind(this)).catch(function(e) {
			n && n.onError && n.onError.call(this, e.response, window);
		}).finally(function() {
			this.removePendingAction(e);
		}.bind(this));
	},
	isPendingAction: function(e) {
		return e ? this.$data.componentStates.pendingAction.actionNames.includes(e) : this.$data.componentStates.pendingAction.actionNames.length > 0;
	},
	pushPendingAction: function(e) {
		this.$data.componentStates.pendingAction.actionNames.push(e);
	},
	removePendingAction: function(e) {
		this.$data.componentStates.pendingAction.actionNames = this.$data.componentStates.pendingAction.actionNames.filter((t) => t !== e);
	},
	removePendingActionAfterDelay: function(e, t) {
		setTimeout(function() {
			this.removePendingAction(e);
		}.bind(this), t);
	},
	hasFieldsError: function(e, t, n) {
		let r = this.$data.uiMessageStack.objectFieldErrors, i = t.split("_")[0];
		if (r) {
			var a = n == null ? e : e + "[" + n + "]";
			return r?.[a]?.[i]?.length > 0;
		}
		return !1;
	},
	getErrorMessage: function(e, t, n) {
		let r = this.$data.uiMessageStack.objectFieldErrors, i = t.split("_")[0];
		if (r) {
			var a = n == null ? e : e + "[" + n + "]";
			if (Object.prototype.hasOwnProperty.call(r, a) && r[a] && Object.prototype.hasOwnProperty.call(r[a], i)) return r[a][i].join(", ");
		} else return "";
	},
	vueDataParams: function(e) {
		for (var t = new FormData(), n = 0; n < e.length; n++) {
			var r = e[n].split(".", 2), i = r[0], a = r[1], o = this.$data.vueData[i];
			o && typeof o == "object" && Array.isArray(o) === !1 ? a ? this._vueDataParamsKey(t, i, a, o) : Object.keys(o).forEach(function(e) {
				e.includes("_") || this._vueDataParamsKey(t, i, e, o);
			}.bind(this)) : o && Array.isArray(o) === !0 ? o.forEach(function(e, n) {
				typeof e == "object" ? a ? this._vueDataParamsKey(t, i + "][" + n, a, e) : Object.keys(e).forEach(function(r) {
					r.includes("_") || this._vueDataParamsKey(t, i + "][" + n, r, e);
				}.bind(this)) : this.appendToFormData(t, "vContext[" + i + "]", e);
			}.bind(this)) : this.appendToFormData(t, "vContext[" + i + "]", o);
		}
		return t;
	},
	_vueDataParamsKey: function(e, t, n, r) {
		let i = r[n];
		Array.isArray(i) ? !i || i.length == 0 ? this.appendToFormData(e, "vContext[" + t + "][" + n + "]", "") : i.forEach(function(r, a) {
			i[a] && typeof i[a] == "object" ? this.appendToFormData(e, "vContext[" + t + "][" + n + "]", i[a]._v_inputValue) : this.appendToFormData(e, "vContext[" + t + "][" + n + "]", i[a]);
		}.bind(this)) : i && typeof i == "object" ? this.appendToFormData(e, "vContext[" + t + "][" + n + "]", i._v_inputValue) : this.appendToFormData(e, "vContext[" + t + "][" + n + "]", i);
	},
	objectToFormData: function(e) {
		let t = new FormData();
		return Object.keys(e).forEach(function(n) {
			this.appendToFormData(t, n, e[n]);
		}.bind(this)), t;
	},
	appendToFormData: function(e, t, n) {
		n == null ? e.append(t, "") : e.append(t, n);
	},
	isFormData: function(e) {
		return typeof FormData < "u" && e instanceof FormData;
	},
	pastePlainTextCapture(e, t) {
		if (e.target.nodeName === "INPUT") return;
		let n, r;
		e.preventDefault(), e.originalEvent && e.originalEvent.clipboardData.getData ? (n = e.originalEvent.clipboardData.getData("text/plain"), this.$refs[t].runCmd("insertText", n)) : e.clipboardData && e.clipboardData.getData ? (n = e.clipboardData.getData("text/plain"), this.$refs[t].runCmd("insertText", n)) : window.clipboardData && window.clipboardData.getData && (r || (r = !0, this.$refs[t].runCmd("ms-pasteTextOnly", n)), r = !1);
	},
	editorHandlerFixHelper(e, t, n, r, i, a) {
		if (a.hasParents(e, !0)) if (i.runCmd("formatBlock", r), a.range.commonAncestorContainer.hasChildNodes()) {
			for (var o = !1, s = a.range.startContainer; s && s !== a.el && s.parentNode !== a.range.commonAncestorContainer;) s = s.parentNode;
			for (var c = a.range.endContainer; c && c !== a.el && c.parentNode !== a.range.commonAncestorContainer;) c = c.parentNode;
			a.range.commonAncestorContainer.childNodes.forEach(function(e) {
				e === s && (o = !0), o && (e.outerHTML = e.outerHTML.replace(t, "")), e === c && (o = !1);
			});
		} else for (var l = a.selection.focusNode.parentNode; l && l !== a.el;) e.includes(l.nodeName.toLowerCase()) && (l.outerHTML = l.outerHTML.replace(t, "")), l = l.parentNode;
		else i.runCmd("formatBlock", n);
	},
	editorHandlerBlockquoteFix(e, t, n) {
		this.editorHandlerFixHelper(["blockquote"], /<\/?blockquote[^>]*\/?>/g, "blockquote", "div", t, n);
	},
	editorHandlerParagrapheFix(e, t, n) {
		this.editorHandlerFixHelper([
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"h7",
			"h8",
			"h9"
		], /<\/?h[1-9][^>]*\/?>/g, "div", "div", t, n);
	}
}, Wa = {
	ajaxErrors: {
		code401: "UnAuthorized, you may login with an authorized account",
		code403: "Forbidden, your havn&quote;t enought rights",
		code404: "API Route is Missing or Undefined",
		code405: "API Route Method Not Allowed",
		code500: "Server Error"
	},
	comments: {
		title: "Comments",
		inputLabel: "Insert here a comment",
		actionlabel: "Publish",
		cancel: "Cancel",
		save: "Save"
	},
	chatbot: {
		errorMessage: "An error occured sending the message",
		tryAgain: "Try again",
		suggestedAnswers: "Suggested answers",
		inputPlaceHolder: "Enter here a message",
		restartMessage: "Conversation is restarting"
	},
	facets: {
		showAll: "Show all",
		showLess: "Show less"
	},
	notifications: {
		days: "days",
		hours: "hours",
		minutes: "min",
		seconds: "s",
		serverLost: "Reconnecting to server..."
	},
	commands: {
		globalPlaceholder: "Type / to show all available commands",
		executeCommand: "Press Enter to execute command",
		linkLabel: "Show details"
	},
	uploader: {
		clear_all: "Clear All",
		remove: "Remove",
		add: "Pick Files",
		abort: "Abort Upload",
		download: "Download",
		fileErrorUnknown: "Unknown error : This file cannot be uploaded",
		fileErrorTooBig: "This file is too large",
		fileErrorTooBigSize: (e) => `A single file must not exceed ${Math.round(e / 1024 / 1024)} MB`,
		fileErrorMaxTotalSize: (e) => `The total file size must not exceed ${Math.round(e / 1024 / 1024)} MB`,
		fileErrorAccept: (e) => `The file type is not allowed, only '${e}' files are allowed`,
		fileCountError: (e) => `The field can contain a maximum of ${e} document${e > 1 ? "s" : ""}`,
		progress: "Progress",
		estimated: "Time remaining",
		unit_b: "B",
		unit_kb: "KB",
		unit_mb: "MB",
		unit_gb: "GB"
	},
	handles: { placeholder: "Enter a handle : format is type/code" }
}, Ga = {
	ajaxErrors: {
		code401: "Non autoris&eacute;, essayez de vous reconnecter",
		code403: "Vous n&quote;avez pas les droits suffisants pour effectuer cette action",
		code404: "API introuvable",
		code405: "API non autoris&eacute;e",
		code500: "Erreur serveur"
	},
	comments: {
		title: "Commentaires",
		inputLabel: "Insérer un commentaire ici",
		actionlabel: "Publier",
		cancel: "Annuler",
		save: "Sauver"
	},
	chatbot: {
		errorMessage: "Une erreur est survenue lors de l'envoi du message",
		tryAgain: "Essayez de nouveau",
		suggestedAnswers: "Réponses suggérées",
		inputPlaceHolder: "Ecrire un message",
		restartMessage: "Redémarrage de la conversation"
	},
	facets: {
		showAll: "Voir plus",
		showLess: "Voir moins"
	},
	notifications: {
		days: "jours",
		hours: "heures",
		minutes: "min",
		seconds: "s",
		serverLost: "Reconnexion au serveur en cours..."
	},
	commands: {
		globalPlaceholder: "Taper / pour afficher les commandes disponibles",
		executeCommand: "Appuyer sur entrée pour executer la commande",
		linkLabel: "Voir les détails"
	},
	uploader: {
		clear_all: "Annuler tout",
		remove: "Supprimer",
		add: "Ajouter des fichiers",
		abort: "Annuler",
		download: "Télécharger",
		fileErrorUnknown: "Erreur inconnue : Ce fichier ne peut pas être envoyé",
		fileErrorTooBig: "Le fichier est trop volumineux",
		fileErrorTooBigSize: (e) => `La taille d'un fichier ne doit pas dépasser ${Math.round(e / 1024 / 1024)} Mo`,
		fileErrorMaxTotalSize: (e) => `La taille totale des fichiers ne doit pas dépasser ${Math.round(e / 1024 / 1024)} Mo`,
		fileErrorAccept: (e) => `Type de fichier invalide. Seuls les fichiers de type '${e}' sont acceptés`,
		fileCountError: (e) => `Le champ peut contenir au maximum ${e} document${e > 1 ? "s" : ""}`,
		progress: "Progression",
		estimated: "Temps restant",
		unit_b: "o",
		unit_kb: "Ko",
		unit_mb: "Mo",
		unit_gb: "Go"
	},
	handles: { placeholder: "Entrer un handle de la forme type/code" }
};
//#endregion
//#region src/main.js
window.Quasar;
var Ka = {
	getBoundMethods: function(e, t) {
		let n = {};
		return Object.keys(t).forEach((r) => n[r] = t[r].bind(e)), n;
	},
	install: function(e, t) {
		if (e.component("v-chatbot", pe), e.component("v-commands", Ne), e.component("v-comments", Je), e.component("v-extensions-store", dt), e.component("v-facets", St), e.component("v-geopoint-input", jt), e.component("v-handles", Kt), e.component("v-json-editor", sn), e.component("v-notifications", yn), e.component("v-map", An), e.component("v-map-layer", Hn), e.component("v-tree", nr), e.component("v-file-upload", Pr), e.component("v-file-upload-quasar", ci), e.component("v-dashboard-chart", pa), e.directive("alert-unsaved-updates", ma), e.directive("autofocus", ha), e.directive("if-unsaved-updates", _a), e.directive("minify", ba), e.directive("scroll-spy", za), !t.axios) {
			console.error("You have to install axios");
			return;
		}
		e.axios = t.axios, e.$http = t.axios, Object.defineProperties(e.config.globalProperties, {
			axios: { get() {
				return t.axios;
			} },
			$http: { get() {
				return t.axios;
			} },
			$vui: { get() {
				return Ka.getBoundMethods(Ua, Ua);
			} }
		});
	},
	methods: Ua,
	initData: function(e, t) {
		e.vueData = t.vueData, e.componentStates = t.componentStates, e.uiMessageStack = t.uiMessageStack, e.vuiLang = t.vuiLang;
	},
	lang: {
		enUS: Wa,
		fr: Ga
	}
};
window && (window.VertigoUi = Ka);
//#endregion
export { Ka as default };

//# sourceMappingURL=vertigo-ui.es.js.map