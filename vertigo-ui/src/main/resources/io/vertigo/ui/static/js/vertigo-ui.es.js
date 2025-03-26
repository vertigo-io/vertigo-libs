const M = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, kn = {
  props: {
    botUrl: { type: String, required: !0 },
    devMode: { type: Boolean, default: !1 },
    minTimeBetweenMessages: { type: Number, default: 1e3 },
    botAvatar: { type: String, required: !0 },
    botName: { type: String, required: !0 }
  },
  data: function() {
    return {
      // config
      convId: 42,
      // technique
      inputConfig: {
        modeTextarea: !1,
        // TODO, il exste d'autres modes, par ex email
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
        text: e !== "" ? [e] : null,
        rating: this.inputConfig.rating > 0 ? this.inputConfig.rating : null,
        sent: !0,
        bgColor: "primary",
        textColor: "white"
      }), this._scrollToBottom();
      var t = this.inputConfig.responsePattern === "" ? e.replace(/(")/g, '"') : this.inputConfig.responsePattern.replace("#", e.replace(/(")/g, '\\"'));
      this.askBot(t);
    },
    _scrollToBottom: function() {
      this.$refs.scroller && this.$refs.scroller.setScrollPosition(this.$refs.scroller.scrollHeight, 400);
    },
    askBot: function(e) {
      this.prevInputConfig = JSON.parse(JSON.stringify(this.inputConfig)), this.reinitInput(), this.lastPayload = e, this.processing = !0, this.lastUserInteraction = Date.now(), this.$http.post(this.botUrl, { sender: this.convId, message: e }).then((function(t) {
        t.data.forEach(function(n) {
          this.watingMessagesStack.push(n);
        }, this), this._displayMessages();
      }).bind(this)).catch(
        (function() {
          this.error = !0, this.processing = !1, this._scrollToBottom();
        }).bind(this)
      );
    },
    _displayMessages: function() {
      if (this.watingMessagesStack.length > 0) {
        var e = this.watingMessagesStack.shift(), t = this.lastUserInteraction - Date.now() + this.minTimeBetweenMessages;
        this.sleep(t).then((function() {
          this._processResponse(e), this.lastUserInteraction = Date.now(), this._displayMessages();
        }).bind(this));
      } else
        this.processing = !1, this.keepAction && (this.inputConfig = this.prevInputConfig, this.inputConfig.responseText = "", this.keepAction = !1), this.sleep(1).then((function() {
          this.$refs.input.focus();
        }).bind(this));
    },
    _processResponse: function(e) {
      var t = this.messages[this.messages.length - 1];
      t && !t.sent ? t.text.push(e.text) : this.messages.push({
        avatar: this.botAvatar,
        text: [e.text],
        bgColor: "grey-4"
      }), e.buttons && e.buttons.forEach(function(n) {
        if (n.title.startsWith("#")) {
          var o = n.title.substring(1);
          o === "textarea" && (this.inputConfig.modeTextarea = !0), o === "eval" && (this.inputConfig.showRating = !0), o === "keep_action" && (this.keepAction = !0), n.payload && (this.inputConfig.responsePattern = n.payload);
        } else
          this.inputConfig.buttons.push(n);
      }, this), this._scrollToBottom();
    },
    restart: function() {
      this.messages.push({
        text: [this.$q.lang.vui.chatbot.restartMessage],
        bgColor: "orange"
      }), this._scrollToBottom(), this.$http.post(this.botUrl, '{"sender":"' + this.convId + '","message":"/restart"}').then((function() {
        this.askBot("/start");
      }).bind(this));
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
}, Pt = window.Vue.renderList, Nt = window.Vue.Fragment, U = window.Vue.openBlock, Be = window.Vue.createElementBlock, ye = window.Vue.resolveComponent, fe = window.Vue.createVNode, ve = window.Vue.withCtx, ae = window.Vue.createBlock, he = window.Vue.createCommentVNode, At = window.Vue.toDisplayString, Z = window.Vue.createElementVNode, Vn = window.Vue.withKeys, Dn = { class: "bot" }, qn = { class: "q-pr-md" }, Fn = { class: "sys-chat" }, En = { class: "q-pb-sm" }, Tn = { class: "sys-chat non-selectable" }, On = { class: "text-blue-2 q-caption" }, Mn = { class: "row docs-btn" }, Ln = { class: "message-processing sys-chat non-selectable" }, Pn = { class: "non-selectable" }, Nn = { class: "message-response row docs-btn q-pl-sm non-selectable" };
function An(e, t, n, o, s, a) {
  const i = ye("q-rating"), r = ye("q-chat-message"), l = ye("q-btn"), d = ye("q-spinner-dots"), u = ye("q-scroll-area"), p = ye("q-input");
  return U(), Be("div", Dn, [
    fe(u, {
      class: "bg-grey-2 col-grow row q-pa-sm",
      ref: "scroller"
    }, {
      default: ve(() => [
        Z("div", qn, [
          (U(!0), Be(Nt, null, Pt(e.messages, (h, g) => (U(), Be("div", { key: g }, [
            h.rating ? (U(), ae(r, {
              class: "animate-fade",
              key: "msgRating-" + g,
              sent: h.sent,
              "bg-color": h.bgColor,
              avatar: h.avatar
            }, {
              default: ve(() => [
                fe(i, {
                  modelValue: h.rating,
                  "onUpdate:modelValue": (c) => h.rating = c,
                  max: 5,
                  style: { "font-size": "2rem" },
                  readonly: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1032, ["sent", "bg-color", "avatar"])) : he("", !0),
            h.text ? (U(), ae(r, {
              class: "animate-fade",
              key: "msg-" + g,
              label: h.label,
              sent: h.sent,
              "text-color": h.textColor,
              "bg-color": h.bgColor,
              name: h.name,
              avatar: h.avatar,
              text: h.text,
              stamp: h.stamp
            }, null, 8, ["label", "sent", "text-color", "bg-color", "name", "avatar", "text", "stamp"])) : he("", !0)
          ]))), 128)),
          Z("div", Fn, [
            e.error ? (U(), ae(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "orange-4",
              "text-color": "black",
              size: "12"
            }, {
              default: ve(() => [
                Z("div", En, At(e.$q.lang.vui.chatbot.errorMessage), 1),
                fe(l, {
                  class: "full-width",
                  onClick: t[0] || (t[0] = (h) => a.askBot(e.lastPayload)),
                  label: e.$q.lang.vui.chatbot.tryAgain,
                  color: "white",
                  "text-color": "black"
                }, null, 8, ["label"])
              ]),
              _: 1
            })) : he("", !0)
          ]),
          Z("div", Tn, [
            e.inputConfig.buttons.length > 0 ? (U(), ae(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "primary",
              size: "12"
            }, {
              default: ve(() => [
                Z("div", On, At(e.$q.lang.vui.suggestedAnswers), 1),
                Z("div", Mn, [
                  (U(!0), Be(Nt, null, Pt(e.inputConfig.buttons, (h, g) => (U(), ae(l, {
                    class: "full-width",
                    key: "repChatBtn-" + g,
                    onClick: (c) => a.postAnswerBtn(h),
                    label: h.title,
                    color: "white",
                    "text-color": "black"
                  }, null, 8, ["onClick", "label"]))), 128))
                ])
              ]),
              _: 1
            })) : he("", !0)
          ]),
          Z("div", Ln, [
            e.processing ? (U(), ae(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "grey-4"
            }, {
              default: ve(() => [
                fe(d, { size: "2em" })
              ]),
              _: 1
            })) : he("", !0)
          ]),
          Z("div", Pn, [
            e.inputConfig.showRating ? (U(), ae(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "primary",
              sent: ""
            }, {
              default: ve(() => [
                fe(i, {
                  modelValue: e.rating,
                  "onUpdate:modelValue": t[1] || (t[1] = (h) => e.rating = h),
                  max: 4,
                  style: { "font-size": "2rem" }
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })) : he("", !0)
          ])
        ])
      ]),
      _: 1
    }, 512),
    Z("div", Nn, [
      fe(p, {
        type: e.inputConfig.modeTextarea ? "textarea" : "text",
        ref: "input",
        onKeyup: t[2] || (t[2] = Vn((h) => e.inputConfig.modeTextarea || e.inputConfig.responseText.trim() === "" && e.inputConfig.rating === 0 ? !1 : a.postAnswerText(), ["enter"])),
        "max-height": 100,
        class: "col-grow",
        modelValue: e.inputConfig.responseText,
        "onUpdate:modelValue": t[3] || (t[3] = (h) => e.inputConfig.responseText = h),
        placeholder: e.$q.lang.vui.chatbot.inputPlaceholder,
        disable: e.processing || e.error,
        loading: e.processing
      }, null, 8, ["type", "modelValue", "placeholder", "disable", "loading"]),
      fe(l, {
        round: "",
        color: "primary",
        icon: "send",
        onClick: t[4] || (t[4] = (h) => a.postAnswerText()),
        disable: e.processing || e.inputConfig.responseText.trim() === "" && e.inputConfig.rating === 0
      }, null, 8, ["disable"]),
      n.devMode === !0 ? (U(), ae(l, {
        key: 0,
        round: "",
        color: "red",
        icon: "refresh",
        onClick: a.restart
      }, null, 8, ["onClick"])) : he("", !0)
    ])
  ]);
}
const Un = /* @__PURE__ */ M(kn, [["render", An]]), Bn = {
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
  props: {
    baseUrl: { type: String, default: "/" }
  },
  methods: {
    searchCommands: function(e, t, n) {
      if (this.$data.text = e, this.$data.selectedCommand = {}, e.length < 1) {
        n();
        return;
      }
      this.$http.post(this.baseUrl + "api/vertigo/commands/_search", { prefix: e }).then((function(o) {
        this.$data.commands = o.data, t((function() {
          this.$data.commandAutocompleteOptions = this.$data.commands.map(function(s) {
            return {
              label: s.commandName,
              sublabel: s.descpription,
              value: s.commandName,
              command: s
            };
          });
        }).bind(this)), this.$data.commands.length > 0 && this.chooseCommand(this.$data.commands[0], !1);
      }).bind(this));
    },
    selectCommand: function(e) {
      this.chooseCommand(e.command, !0);
    },
    chooseCommand: function(e, t) {
      this.$data.selectedCommand = e, this.$data.selectedCommand.commandParams ? this.$data.commandParamsValues = this.$data.selectedCommand.commandParams.map(function() {
        return {
          value: ""
        };
      }) : this.$data.commandParamsValues = [], this.$data.isCommandCommited = t;
    },
    commitCommand: function(e) {
      if (this.$data.selectedCommand && this.$data.selectedCommand.commandName)
        switch (e.keyCode) {
          case 9:
          case 13:
            this.$data.isCommandCommited = !0, e.preventDefault();
        }
    },
    executeCommand: function() {
      if (this.$data.commandParamsValues.every(function(t) {
        return t;
      })) {
        var e = this.$data.commandParamsValues.map(function(t) {
          return t.value;
        });
        this.$http.post(this.baseUrl + "api/vertigo/commands/_execute", { command: this.$data.selectedCommand.commandName, params: e }).then((function(t) {
          this.$data.isExecuted = !0, this.$data.commandResult = t.data;
        }).bind(this));
      } else
        return !1;
    },
    handleEnter: function(e) {
      e === this.$data.selectedCommand.commandParams.length - 1 && this.$data.commandParamsValues[e].value && this.executeCommand();
    },
    autocompleteParam: function(e, t, n, o, s) {
      if (n.length < 1) {
        s();
        return;
      }
      this.$http.get(this.baseUrl + "api/vertigo/commands/params/_autocomplete", { params: { terms: n, entityClass: e.paramType.actualTypeArguments[0] } }).then((function(a) {
        o((function() {
          var i = this.$data.paramsAutocompleteOptions.slice();
          i[t] = a.data.map(function(r) {
            return {
              label: r.label,
              value: r.urn
            };
          }), this.$data.paramsAutocompleteOptions = i;
        }).bind(this));
      }).bind(this));
    },
    selectParam: function(e, t) {
      var n = this.$data.commandParamsValues.slice();
      n[t] = e, this.$data.commandParamsValues = n;
    },
    getParamValue(e) {
      var t = this.$data.commandParamsValues[e];
      if (t && t.value)
        return t;
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
}, Ve = window.Vue.toDisplayString, B = window.Vue.openBlock, ie = window.Vue.createElementBlock, Ut = window.Vue.createCommentVNode, Ie = window.Vue.resolveComponent, Bt = window.Vue.withCtx, je = window.Vue.createBlock, It = window.Vue.createElementVNode, In = window.Vue.renderList, jt = window.Vue.Fragment, _e = window.Vue.withKeys, dt = window.Vue.createVNode, jn = window.Vue.createTextVNode, zn = {
  key: 0,
  style: { "line-height": "40px", opacity: "0.5", position: "fixed" }
}, Rn = {
  class: "bg-grey-4 text-center vertical-middle text-bold q-px-md",
  style: { "line-height": "40px" }
}, Hn = {
  key: 0,
  class: "row col items-center q-py-xs"
}, Gn = {
  key: 1,
  class: "col"
}, Jn = {
  key: 1,
  class: "row col items-center"
}, Yn = {
  class: "col shadow-2 bg-secondary text-white q-px-md",
  style: { "line-height": "40px" }
};
function Wn(e, t, n, o, s, a) {
  const i = Ie("q-select"), r = Ie("q-input"), l = Ie("q-separator"), d = Ie("q-btn");
  return B(), ie("div", null, [
    e.isCommandCommited ? (B(), ie("div", {
      key: 1,
      class: "row col-12 justify-between bg-white round-borders overflow-hidden shadow-2 text-black",
      onKeyup: t[0] || (t[0] = _e((...u) => a.executeCommand && a.executeCommand(...u), ["enter"]))
    }, [
      It("div", Rn, Ve(e.selectedCommand.commandName), 1),
      e.isExecuted ? (B(), ie("div", Jn, [
        It("div", Yn, Ve(e.commandResult.display), 1),
        e.commandResult.targetUrl ? (B(), je(d, {
          key: 0,
          type: "a",
          href: n.baseUrl + e.commandResult.targetUrl,
          flat: ""
        }, {
          default: Bt(() => [
            jn(Ve(e.$q.lang.vui.commands.linkLabel), 1)
          ]),
          _: 1
        }, 8, ["href"])) : Ut("", !0),
        dt(d, {
          onClick: a.reset,
          flat: "",
          icon: "cancel",
          size: "sm",
          round: ""
        }, null, 8, ["onClick"])
      ])) : (B(), ie("div", Hn, [
        e.selectedCommand.commandParams && e.selectedCommand.commandParams.length > 0 ? (B(!0), ie(jt, { key: 0 }, In(e.selectedCommand.commandParams, (u, p) => (B(), ie(jt, { key: u }, [
          u.paramType.rawType === "io.vertigo.commons.command.GenericUID" ? (B(), je(i, {
            key: 0,
            class: "col q-px-xs",
            "use-chips": "",
            "bg-color": "white",
            dense: "",
            borderless: "",
            "use-input": "",
            "input-debounce": "300",
            value: a.getParamValue(p),
            options: e.paramsAutocompleteOptions[p],
            autofocus: p === 0,
            "dropdown-icon": "search",
            onKeydown: _e(function(h) {
              a.backIfNeeded(h, p === 0);
            }, ["delete"]),
            onKeyup: _e(function(h) {
              a.backIfNeeded(h, p === 0);
            }, ["esc"]),
            onFilter: (h) => a.autocompleteParam(u, p, e.val, e.update, e.abort),
            "onUpdate:modelValue": (h) => a.selectParam(e.newValue, p),
            style: { height: "32px" }
          }, null, 8, ["value", "options", "autofocus", "onKeydown", "onKeyup", "onFilter", "onUpdate:modelValue"])) : (B(), je(r, {
            key: 1,
            class: "col q-px-xs",
            color: "secondary",
            borderless: "",
            modelValue: e.commandParamsValues[p].value,
            "onUpdate:modelValue": (h) => e.commandParamsValues[p].value = h,
            onKeydown: _e((h) => a.backIfNeeded(e.event, p === 0), ["delete"]),
            onKeyup: [
              _e((h) => a.backIfNeeded(e.event, p === 0), ["esc"]),
              _e((h) => a.handleEnter(p), ["enter"])
            ],
            autofocus: p === 0,
            dense: "",
            style: { height: "32px" }
          }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown", "onKeyup", "autofocus"])),
          dt(l, { vertical: "" })
        ], 64))), 128)) : (B(), ie("div", Gn, Ve(e.$q.lang.vui.commands.executeCommand), 1)),
        dt(d, {
          onClick: a.executeCommand,
          flat: "",
          icon: "play_arrow",
          size: "sm",
          round: ""
        }, null, 8, ["onClick"])
      ]))
    ], 32)) : (B(), je(i, {
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
      default: Bt(() => [
        e.text !== "" && e.selectedCommand.commandName && e.selectedCommand.commandName.startsWith(e.text) ? (B(), ie("span", zn, Ve(e.selectedCommand.commandName), 1)) : Ut("", !0)
      ]),
      _: 1
    }, 8, ["placeholder", "onBlur", "onKeydown", "options", "onFilter", "onUpdate:modelValue"]))
  ]);
}
const Xn = /* @__PURE__ */ M(Bn, [["render", Wn]]), ct = window.Quasar, Kn = {
  props: {
    concept: { type: String },
    id: { type: String },
    icon: { type: String, default: "comment" },
    iconNone: { type: String, default: "add_comment" },
    baseUrl: { type: String, default: "/api/", required: !0 },
    connectedAccount: { type: String },
    color: { type: String, default: "primary" },
    textColor: { type: String, default: "white" },
    flat: { type: Boolean, default: !1 }
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
      this.$http.get(this.baseUrl + "x/comment/api/comments?concept=" + this.concept + "&id=" + this.id).then((function(e) {
        this.list = e.data, this.count = this.list.length;
      }).bind(this));
    },
    publishComment: function() {
      var e = {
        msg: this.commentTextArea
      };
      e.msg && (e.concept = this.concept, e.id = this.id, this.$http.post(this.baseUrl + "x/comment/api/comments?concept=" + this.concept + "&id=" + this.id, e).then((function() {
        this.commentTextArea = "", this.fetchCommentsList();
      }).bind(this)));
    },
    updateComment: function(e) {
      this.$http.put(this.baseUrl + "x/comment/api/comments/" + e.uuid, e).then((function() {
        this.commentTextArea = "", this.fetchCommentsList();
      }).bind(this));
    },
    toDelay: function(e) {
      let t = ct.date.getDateDiff(Date.now(), e, "days");
      return t > 0 ? t + " days" : (t = ct.date.getDateDiff(Date.now(), e, "hours"), t > 0 ? t + " hours" : (t = ct.date.getDateDiff(Date.now(), e, "minutes"), t > 0 ? t + " min" : "Now"));
    }
  }
}, De = window.Vue.toDisplayString, ze = window.Vue.createTextVNode, N = window.Vue.resolveComponent, E = window.Vue.withCtx, $e = window.Vue.openBlock, Re = window.Vue.createBlock, ut = window.Vue.createCommentVNode, F = window.Vue.createVNode, Qn = window.Vue.renderList, Zn = window.Vue.Fragment, zt = window.Vue.createElementBlock, Rt = window.Vue.createElementVNode, eo = window.Vue.normalizeClass, to = ["src"];
function no(e, t, n, o, s, a) {
  const i = N("q-badge"), r = N("q-btn"), l = N("big"), d = N("q-item-label"), u = N("q-input"), p = N("q-item-section"), h = N("q-item"), g = N("q-separator"), c = N("q-avatar"), f = N("q-icon"), m = N("q-popup-edit"), w = N("q-list"), v = N("q-drawer");
  return $e(), zt("span", null, [
    F(r, {
      round: "",
      flat: n.flat,
      size: "lg",
      color: n.color,
      "text-color": n.textColor,
      icon: e.count > 0 ? n.icon : n.iconNone,
      onClick: t[0] || (t[0] = (b) => e.commentDrawer = !e.commentDrawer),
      class: "on-left",
      title: e.$q.lang.vui.comments.title
    }, {
      default: E(() => [
        e.count > 0 ? ($e(), Re(i, {
          key: 0,
          floating: "",
          small: "",
          color: "red",
          style: { right: "-.4em", top: "-.4em" }
        }, {
          default: E(() => [
            ze(De(e.count), 1)
          ]),
          _: 1
        })) : ut("", !0)
      ]),
      _: 1
    }, 8, ["flat", "color", "text-color", "icon", "title"]),
    F(v, {
      overlay: "",
      behavior: "mobile",
      width: 600,
      modelValue: e.commentDrawer,
      "onUpdate:modelValue": t[2] || (t[2] = (b) => e.commentDrawer = b),
      side: "right",
      style: { top: "58px" }
    }, {
      default: E(() => [
        F(w, null, {
          default: E(() => [
            F(d, { header: "" }, {
              default: E(() => [
                F(l, null, {
                  default: E(() => [
                    ze(De(e.$q.lang.vui.comments.title), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            F(h, null, {
              default: E(() => [
                F(p, null, {
                  default: E(() => [
                    F(u, {
                      class: "col",
                      type: "textarea",
                      autogrow: "",
                      modelValue: e.commentTextArea,
                      "onUpdate:modelValue": t[1] || (t[1] = (b) => e.commentTextArea = b),
                      label: e.$q.lang.vui.comments.inputLabel,
                      "stack-label": ""
                    }, null, 8, ["modelValue", "label"])
                  ]),
                  _: 1
                }),
                F(p, { side: "" }, {
                  default: E(() => [
                    F(r, {
                      color: "primary",
                      round: "",
                      icon: "send",
                      title: e.$q.lang.vui.comments.actionLabel,
                      "aria-label": e.$q.lang.vui.comments.actionLabel,
                      onClick: a.publishComment
                    }, null, 8, ["title", "aria-label", "onClick"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            F(g),
            ($e(!0), zt(Zn, null, Qn(e.list, (b) => ($e(), Re(h, {
              key: b.uuid,
              class: eo(["items-start", { "cursor-pointer": b.author == n.connectedAccount }])
            }, {
              default: E(() => [
                F(p, { avatar: "" }, {
                  default: E(() => [
                    F(c, null, {
                      default: E(() => [
                        Rt("img", {
                          src: n.baseUrl + "x/accounts/api/" + b.author + "/photo"
                        }, null, 8, to)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                F(p, null, {
                  default: E(() => [
                    F(d, null, {
                      default: E(() => [
                        ze(De(b.authorDisplayName), 1)
                      ]),
                      _: 2
                    }, 1024),
                    Rt("div", null, De(b.msg), 1)
                  ]),
                  _: 2
                }, 1024),
                F(p, { side: "" }, {
                  default: E(() => [
                    F(d, { stamp: "" }, {
                      default: E(() => [
                        ze(De(a.toDelay(new Date(b.creationDate))), 1)
                      ]),
                      _: 2
                    }, 1024),
                    b.author == n.connectedAccount ? ($e(), Re(f, {
                      key: 0,
                      name: "edit"
                    })) : ut("", !0)
                  ]),
                  _: 2
                }, 1024),
                b.author == n.connectedAccount ? ($e(), Re(m, {
                  key: 0,
                  buttons: !0,
                  onSave: (q) => a.updateComment(b),
                  "label-cancel": e.$q.lang.vui.comments.cancel,
                  "label-set": e.$q.lang.vui.comments.save
                }, {
                  default: E(() => [
                    F(u, {
                      type: "textarea",
                      autogrow: "",
                      modelValue: b.msg,
                      "onUpdate:modelValue": (q) => b.msg = q,
                      dense: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 2
                }, 1032, ["onSave", "label-cancel", "label-set"])) : ut("", !0)
              ]),
              _: 2
            }, 1032, ["class"]))), 128))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ]);
}
const oo = /* @__PURE__ */ M(Kn, [["render", no]]), ao = {
  props: {
    activeSkills: { type: Array, required: !0 }
  },
  data: function() {
    return {
      extensions: []
    };
  },
  created: function() {
    var e = [
      { name: "vertigo-audit", label: "Audit", description: "Trace every single aspect of your app through exhaustive logging capabilities.", color: "#F7578C", icon: "fas fa-clipboard-list", enabled: !1 },
      { name: "vertigo-dashboard", label: "Dashboard", description: "Monitor you system to make sure your app meets the customer requirements.", color: "#742774", icon: "fas fa-chart-line", enabled: !1 },
      { name: "vertigo-geo", label: "Geo", description: "Enhance your data by enabling geographic functions and tools.", icon: "fas fa-globe", color: "#0E2947", enabled: !1 },
      { name: "vertigo-ledger", label: "Ledger", description: "Use a blockchain to enforce secure transactions in your app !", icon: "fas fa-link", color: "#00AC5C", enabled: !1 },
      { name: "vertigo-orchestra", label: "Orchestra", description: "Manage jobs and monitor their status with this powerfull control tower.", color: "#FC636B", icon: "fas fa-tasks", enabled: !1 },
      { name: "vertigo-quarto", label: "Quarto", description: "Generate slick documents and reports using the Quarto template engine.", color: "#0747A6", icon: "fas fa-file-invoice", enabled: !1 },
      { name: "vertigo-social", label: "Social", description: "Ensure real time communication and collaboration between your app users.", color: "#FF3366", icon: "far fa-comments", enabled: !1 },
      { name: "vertigo-stella", label: "Stella", description: "Enable multi-node task dispatching for your app and assign specific tasks to each node.", color: "#0066FF", icon: "fas fa-network-wired", enabled: !1 }
    ];
    e.forEach((function(t) {
      t.enabled = this.$props.activeSkills.indexOf(t.name) > -1;
    }).bind(this)), this.extensions = e;
  },
  methods: {
    getIconStyle: function(e) {
      return "border: 3px solid " + e + "; background-color: " + e + "; color: white; padding: 5px; width: 70px; height: 70px;";
    }
  }
}, io = window.Vue.renderList, so = window.Vue.Fragment, ft = window.Vue.openBlock, ht = window.Vue.createElementBlock, qe = window.Vue.resolveComponent, ro = window.Vue.normalizeStyle, Ce = window.Vue.createVNode, He = window.Vue.withCtx, Ht = window.Vue.toDisplayString, Le = window.Vue.createElementVNode, lo = { class: "row q-col-gutter-md" }, co = { class: "row col items-center" }, uo = { class: "q-subheading text-bold" }, fo = /* @__PURE__ */ Le("div", { class: "col" }, null, -1), ho = { class: "row col q-body-2 text-justify" };
function po(e, t, n, o, s, a) {
  const i = qe("q-icon"), r = qe("q-item-section"), l = qe("q-toggle"), d = qe("q-item"), u = qe("q-card");
  return ft(), ht("div", lo, [
    (ft(!0), ht(so, null, io(e.extensions, (p) => (ft(), ht("div", {
      class: "col-xs-12 col-lg-6 col-xl-4",
      key: p.name
    }, [
      Ce(u, null, {
        default: He(() => [
          Ce(d, {
            class: "bg-white",
            style: { height: "100px" }
          }, {
            default: He(() => [
              Ce(r, { avatar: "" }, {
                default: He(() => [
                  Ce(i, {
                    name: p.icon,
                    size: "40px",
                    style: ro(a.getIconStyle(p.color))
                  }, null, 8, ["name", "style"])
                ]),
                _: 2
              }, 1024),
              Ce(r, null, {
                default: He(() => [
                  Le("div", co, [
                    Le("div", uo, Ht(p.label), 1),
                    fo,
                    Le("div", null, [
                      Ce(l, {
                        disable: "",
                        readonly: "",
                        color: "positive",
                        modelValue: p.enabled,
                        "onUpdate:modelValue": (h) => p.enabled = h
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  Le("div", ho, Ht(p.description), 1)
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1024)
        ]),
        _: 2
      }, 1024)
    ]))), 128))
  ]);
}
const mo = /* @__PURE__ */ M(ao, [["render", po]]), go = {
  props: {
    facets: Array,
    selectedFacets: Object,
    contextKey: String,
    facetValueTranslatorProvider: Function,
    layout: { type: String, default: "vertical" },
    render: { type: String, default: "list" },
    facetFilter: { type: Function, default: () => !0 },
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
    addFacetValueTranslator(e, t) {
      this.codeToLabelTranslater[e] = t;
    },
    facetByCode(e) {
      return this.facets.filter(function(t) {
        return t.code === e;
      })[0];
    },
    facetValueByCode(e, t) {
      return this.facetByCode(e).values.filter(function(n) {
        return n.code === t;
      })[0];
    },
    facetLabelByCode(e) {
      return this.facetByCode(e).label;
    },
    facetMultipleByCode(e) {
      return this.facetByCode(e).multiple;
    },
    facetValueLabelByCode(e, t) {
      if (this.codeToLabelTranslater[e])
        return this.codeToLabelTranslater[e](e, t);
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
      return Object.keys(this.selectedFacets).some((function(e) {
        return !this.facetMultipleByCode(e);
      }).bind(this));
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
      return this.selectedFacets[e].filter((t) => !this.facetValueByCode(e, t)).map((t) => {
        var n = {};
        return n.code = t, n.label = t, n.count = 0, n;
      });
    },
    visibleFacets(e, t) {
      return this.isFacetExpanded(e) ? t : t.slice(0, this.maxValues);
    }
  }
}, xe = window.Vue.renderList, pe = window.Vue.Fragment, x = window.Vue.openBlock, I = window.Vue.createElementBlock, se = window.Vue.resolveComponent, V = window.Vue.createVNode, C = window.Vue.withCtx, Gt = window.Vue.mergeProps, Y = window.Vue.createBlock, me = window.Vue.createCommentVNode, wo = window.Vue.normalizeClass, ee = window.Vue.toDisplayString, re = window.Vue.createTextVNode, bo = {
  key: 1,
  class: "facets"
}, yo = {
  key: 0,
  class: "selectedFacets q-pb-md"
};
function vo(e, t, n, o, s, a) {
  const i = se("q-checkbox"), r = se("q-item-section"), l = se("q-item-label"), d = se("q-chip"), u = se("q-item"), p = se("q-select"), h = se("q-btn"), g = se("q-list");
  return n.render === "selects" ? (x(), I("div", {
    key: 0,
    class: wo(["row col q-gutter-md", { "horizontal-facets": n.layout === "horizontal" }])
  }, [
    (x(!0), I(pe, null, xe(n.facets.filter(n.facetFilter), (c) => (x(), I("div", {
      key: c.code,
      class: "facet-select"
    }, [
      c.multiple ? (x(), Y(p, {
        key: 0,
        label: c.label,
        "model-value": n.selectedFacets[c.code],
        multiple: "",
        onAdd: (f) => e.$emit("toogle-facet", c.code, f.value.code, n.contextKey),
        onRemove: (f) => e.$emit("toogle-facet", c.code, f.value, n.contextKey),
        options: a.selectedInvisibleFacets(c.code).concat(c.values),
        "option-value": "code",
        "use-chips": "",
        outlined: "",
        "input-class": "no-wrap"
      }, {
        option: C(({ itemProps: f, opt: m, selected: w, toggleOption: v }) => [
          V(u, Gt({ ref_for: !0 }, f, {
            class: "facet-selection-option",
            dense: ""
          }), {
            default: C(() => [
              V(r, { avatar: "" }, {
                default: C(() => [
                  V(i, {
                    "model-value": w,
                    "onUpdate:modelValue": (b) => v(m),
                    size: "sm"
                  }, null, 8, ["model-value", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024),
              V(r, null, {
                default: C(() => [
                  V(l, {
                    innerHTML: m.label
                  }, null, 8, ["innerHTML"])
                ]),
                _: 2
              }, 1024),
              V(r, { side: "" }, {
                default: C(() => [
                  V(d, {
                    label: m.count,
                    size: "sm"
                  }, null, 8, ["label"])
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1040)
        ]),
        _: 2
      }, 1032, ["label", "model-value", "onAdd", "onRemove", "options"])) : (x(), Y(p, {
        key: 1,
        label: c.label,
        "model-value": n.selectedFacets[c.code].length > 0 ? n.selectedFacets[c.code][0] : null,
        "onUpdate:modelValue": (f) => e.$emit("toogle-facet", c.code, f || n.selectedFacets[c.code][0], n.contextKey),
        options: a.selectedInvisibleFacets(c.code).concat(c.values),
        "option-value": "code",
        clearable: "",
        "emit-value": "",
        "map-options": "",
        outlined: "",
        "input-class": "no-wrap"
      }, {
        option: C(({ itemProps: f, opt: m, selected: w, toggleOption: v }) => [
          V(u, Gt({ ref_for: !0 }, f, {
            class: "facet-selection-option",
            dense: ""
          }), {
            default: C(() => [
              V(r, null, {
                default: C(() => [
                  V(l, {
                    innerHTML: m.label
                  }, null, 8, ["innerHTML"])
                ]),
                _: 2
              }, 1024),
              V(r, { side: "" }, {
                default: C(() => [
                  V(d, {
                    label: m.count,
                    size: "sm"
                  }, null, 8, ["label"])
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1040)
        ]),
        _: 2
      }, 1032, ["label", "model-value", "onUpdate:modelValue", "options"]))
    ]))), 128))
  ], 2)) : (x(), I("div", bo, [
    a.isAnyFacetValueSelected() ? (x(), I("div", yo, [
      (x(!0), I(pe, null, xe(n.selectedFacets, (c, f) => (x(), I("div", { key: f }, [
        a.facetMultipleByCode(f) ? me("", !0) : (x(!0), I(pe, { key: 0 }, xe(c, (m) => (x(), Y(d, {
          clickable: "",
          class: "q-mb-sm",
          key: m.code,
          onClick: (w) => e.$emit("toogle-facet", f, m, n.contextKey),
          "icon-right": "cancel"
        }, {
          default: C(() => [
            re(ee(a.facetLabelByCode(f)) + ": " + ee(a.facetValueLabelByCode(f, m)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]))), 128))
    ])) : me("", !0),
    (x(!0), I(pe, null, xe(n.facets.filter(n.facetFilter), (c) => (x(), Y(g, {
      key: c.code,
      class: "facetValues q-py-none",
      dense: ""
    }, {
      default: C(() => [
        c.multiple || !a.isFacetSelected(c.code) ? (x(), I(pe, { key: 0 }, [
          V(l, { header: "" }, {
            default: C(() => [
              re(ee(c.label), 1)
            ]),
            _: 2
          }, 1024),
          (x(!0), I(pe, null, xe(a.selectedInvisibleFacets(c.code), (f) => (x(), Y(u, {
            key: f.code,
            class: "facetValue q-ml-md",
            clickable: "",
            onClick: (m) => e.$emit("toogle-facet", c.code, f.code, n.contextKey)
          }, {
            default: C(() => [
              c.multiple ? (x(), Y(r, {
                key: 0,
                side: ""
              }, {
                default: C(() => [
                  V(i, {
                    dense: "",
                    modelValue: !0,
                    "onUpdate:modelValue": (m) => e.$emit("toogle-facet", c.code, f.code, n.contextKey)
                  }, null, 8, ["onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024)) : me("", !0),
              V(r, null, {
                default: C(() => [
                  re(ee(a.facetValueLabelByCode(c.code, f.code)), 1)
                ]),
                _: 2
              }, 1024),
              V(r, { side: "" }, {
                default: C(() => [
                  re(ee(f.count), 1)
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1032, ["onClick"]))), 128)),
          (x(!0), I(pe, null, xe(a.visibleFacets(c.code, c.values), (f) => (x(), Y(u, {
            key: f.code,
            class: "facetValue q-ml-md",
            clickable: "",
            onClick: (m) => e.$emit("toogle-facet", c.code, f.code, n.contextKey)
          }, {
            default: C(() => [
              c.multiple ? (x(), Y(r, {
                key: 0,
                side: ""
              }, {
                default: C(() => [
                  V(i, {
                    dense: "",
                    modelValue: a.isFacetValueSelected(c.code, f.code),
                    "onUpdate:modelValue": (m) => e.$emit("toogle-facet", c.code, f.code, n.contextKey)
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024)) : me("", !0),
              V(r, null, {
                default: C(() => [
                  re(ee(a.facetValueLabelByCode(c.code, f.code)), 1)
                ]),
                _: 2
              }, 1024),
              V(r, { side: "" }, {
                default: C(() => [
                  re(ee(f.count), 1)
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1032, ["onClick"]))), 128)),
          V(u, null, {
            default: C(() => [
              c.values.length > n.maxValues && !a.isFacetExpanded(c.code) ? (x(), Y(h, {
                key: 0,
                flat: "",
                onClick: (f) => a.expandFacet(c.code),
                class: "q-ma-none"
              }, {
                default: C(() => [
                  re(ee(e.$q.lang.vui.facets.showAll), 1)
                ]),
                _: 2
              }, 1032, ["onClick"])) : me("", !0),
              c.values.length > n.maxValues && a.isFacetExpanded(c.code) ? (x(), Y(h, {
                key: 1,
                flat: "",
                onClick: (f) => a.reduceFacet(c.code),
                class: "q-ma-none"
              }, {
                default: C(() => [
                  re(ee(e.$q.lang.vui.facets.showLess), 1)
                ]),
                _: 2
              }, 1032, ["onClick"])) : me("", !0)
            ]),
            _: 2
          }, 1024)
        ], 64)) : me("", !0)
      ]),
      _: 2
    }, 1024))), 128))
  ]));
}
const _o = /* @__PURE__ */ M(go, [["render", vo]]), $o = {
  props: {
    modelValue: { type: Object }
  },
  emits: ["update:modelValue"],
  data: function() {
    return {
      inputObject: this.$props.modelValue ? this.$props.modelValue : {}
    };
  },
  watch: {
    modelValue: function(e) {
      this.$data.inputObject = e || {}, this.updateJson();
    }
  },
  beforeMount() {
    this.updateJson();
  },
  methods: {
    updateJson() {
      var e;
      this.$props.modelValue && (e = JSON.stringify({ lon: this.$data.inputObject.lon, lat: this.$data.inputObject.lat }), this.$props.modelValue._v_inputValue = e), this.$emit("update:modelValue", this.$data.inputObject);
    }
  }
}, Co = window.Vue.renderSlot, Jt = window.Vue.vModelText, pt = window.Vue.createElementVNode, Yt = window.Vue.withDirectives, Wt = window.Vue.createTextVNode, xo = { class: "inputs" };
function So(e, t, n, o, s, a) {
  return Co(e.$slots, "default", {}, () => [
    pt("div", xo, [
      Wt(" Longitude "),
      Yt(pt("input", {
        "onUpdate:modelValue": t[0] || (t[0] = (i) => e.inputObject.lon = i),
        "on:update:modelValue": t[1] || (t[1] = (...i) => a.updateJson && a.updateJson(...i))
      }, null, 544), [
        [
          Jt,
          e.inputObject.lon,
          void 0,
          { number: !0 }
        ]
      ]),
      Wt(" Latitude "),
      Yt(pt("input", {
        "onUpdate:modelValue": t[2] || (t[2] = (i) => e.inputObject.lat = i),
        "on:update:modelValue": t[3] || (t[3] = (...i) => a.updateJson && a.updateJson(...i))
      }, null, 544), [
        [
          Jt,
          e.inputObject.lat,
          void 0,
          { number: !0 }
        ]
      ])
    ])
  ]);
}
const ko = /* @__PURE__ */ M($o, [["render", So]]), Vo = {
  props: {
    baseUrl: { type: String, default: "/" }
  },
  data: function() {
    return {
      text: "",
      handles: []
    };
  },
  methods: {
    searchHandles: function(e) {
      e && this.$http.post(this.baseUrl + "api/vertigo/handle/_search", { prefix: e }).then((function(t) {
        this.$data.handles = t.data;
      }).bind(this));
    }
  }
}, Fe = window.Vue.resolveComponent, Ge = window.Vue.createVNode, Je = window.Vue.withCtx, Do = window.Vue.renderList, qo = window.Vue.Fragment, mt = window.Vue.openBlock, Xt = window.Vue.createElementBlock, Fo = window.Vue.toDisplayString, Eo = window.Vue.createTextVNode, To = window.Vue.resolveDirective, Oo = window.Vue.createBlock, Mo = window.Vue.withDirectives;
function Lo(e, t, n, o, s, a) {
  const i = Fe("q-icon"), r = Fe("q-input"), l = Fe("q-item-section"), d = Fe("q-item"), u = Fe("q-list"), p = To("ripple");
  return mt(), Xt("div", null, [
    Ge(r, {
      placeholder: e.$q.lang.vui.handles.placeholder,
      modelValue: e.text,
      "onUpdate:modelValue": t[0] || (t[0] = (h) => e.text = h),
      debounce: 300,
      onInput: a.searchHandles,
      autofocus: "",
      outlined: "",
      "bg-color": "white",
      dense: ""
    }, {
      prepend: Je(() => [
        Ge(i, { name: "search" })
      ]),
      _: 1
    }, 8, ["placeholder", "modelValue", "onInput"]),
    Ge(u, {
      bordered: "",
      dense: "",
      separator: ""
    }, {
      default: Je(() => [
        (mt(!0), Xt(qo, null, Do(e.handles, (h) => Mo((mt(), Oo(d, {
          clickable: "",
          onClick: (g) => e.VUi.methods.goTo(n.baseUrl + "hw/" + h.code),
          key: h.code
        }, {
          default: Je(() => [
            Ge(l, null, {
              default: Je(() => [
                Eo(Fo(h.code), 1)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 2
        }, 1032, ["onClick"])), [
          [p]
        ])), 128))
      ]),
      _: 1
    })
  ]);
}
const Po = /* @__PURE__ */ M(Vo, [["render", Lo]]), No = {
  props: {
    modelValue: { type: String, required: !0 },
    readonly: { type: Boolean, required: !0 },
    cols: { type: Number, default: 2 }
  },
  emits: ["update:modelValue"],
  data: function() {
    return {
      jsonAsObject: JSON.parse(this.$props.modelValue)
    };
  },
  watch: {
    modelValue: function(e) {
      this.$data.jsonAsObject = JSON.parse(e);
    }
  },
  methods: {
    updateJson() {
      this.$emit("update:modelValue", JSON.stringify(this.$data.jsonAsObject));
    }
  }
}, Ao = window.Vue.renderList, Uo = window.Vue.Fragment, Ee = window.Vue.openBlock, gt = window.Vue.createElementBlock, Kt = window.Vue.resolveComponent, Qt = window.Vue.createBlock;
window.Vue.createCommentVNode;
const Bo = window.Vue.toDisplayString, Io = window.Vue.createElementVNode, jo = window.Vue.withCtx, zo = window.Vue.normalizeClass, Ro = { class: "row" };
function Ho(e, t, n, o, s, a) {
  const i = Kt("q-input"), r = Kt("q-field");
  return Ee(), gt("div", Ro, [
    (Ee(!0), gt(Uo, null, Ao(e.jsonAsObject, (l, d) => (Ee(), gt("div", {
      key: d,
      class: zo("col-" + 12 / n.cols)
    }, [
      n.readonly ? (Ee(), Qt(r, {
        key: 1,
        label: d,
        orientation: "vertical",
        "stack-label": "",
        borderless: "",
        readonly: ""
      }, {
        default: jo(() => [
          Io("span", null, Bo(l), 1)
        ]),
        _: 2
      }, 1032, ["label"])) : (Ee(), Qt(i, {
        key: 0,
        label: d,
        orientation: "vertical",
        "stack-label": "",
        modelValue: e.jsonAsObject[d],
        "onUpdate:modelValue": [(u) => e.jsonAsObject[d] = u, a.updateJson]
      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]))
    ], 2))), 128))
  ]);
}
const Go = /* @__PURE__ */ M(No, [["render", Ho]]), Te = window.Quasar, Jo = {
  props: {
    icon: { type: String, default: "notifications" },
    iconNone: { type: String, default: "notifications_none" },
    iconError: { type: String, default: "warning" },
    color: { type: String, default: "secondary" },
    colorNew: { type: String, default: "accent" },
    textColor: { type: String, default: "secondary-inverted" },
    textColorNew: { type: String, default: "accent-inverted" },
    typeIconMap: { type: Object, default: function() {
      return {};
    } },
    baseUrl: { type: String, default: "/api/", required: !0 },
    targetUrlPrefix: { type: String, default: "/", required: !0 }
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
      this.$http.get(this.baseUrl + "x/notifications/api/messages", { timeout: 5 * 1e3, vNoDefaultErrorHandler: !0 }).then((function(e) {
        this.updateNotificationsData(e.data), this.wasError && (clearInterval(this.timer), this.timer = setInterval(this.fetchNotificationsList, 5e3)), this.wasError = !1;
      }).bind(this)).catch((function() {
        this.wasError || (clearInterval(this.timer), this.timer = setInterval(this.fetchNotificationsList, 6e4)), this.wasError = !0;
      }).bind(this));
    },
    updateNotificationsData: function(e) {
      const t = e.sort(function(a, i) {
        return i.creationDate - a.creationDate;
      });
      var n = [], o = this.list[0];
      if (!o)
        n = t;
      else
        for (var s = 0; s < t.length; s++)
          if (t[s].uuid != o.uuid) {
            if (t[s].creationDate < o.creationDate)
              break;
            n.push(t[s]);
          }
      this.list = t, this.count = t.length, this.firstCall ? this.hasNew = n.length > 0 && Te.date.getDateDiff(Date.now(), n[0].creationDate, "seconds") < 2 * 5 : (this.hasNew = n.length > 0, n.forEach((function(a) {
        this.$q.notify({
          type: "info",
          icon: this.toIcon(a.type),
          message: a.title,
          detail: a.content,
          timeout: 3e3,
          position: "bottom-right"
        });
      }).bind(this))), this.firstCall = !1;
    },
    cancelAutoUpdate: function() {
      clearInterval(this.timer);
    },
    toIcon: function(e) {
      var t = this.typeIconMap[e];
      return t || "mail";
    },
    toDelay: function(e) {
      let t = Te.date.getDateDiff(Date.now(), e, "days");
      return t > 0 ? t + " " + this.$q.lang.vui.notifications.days : (t = Te.date.getDateDiff(Date.now(), e, "hours"), t > 0 ? t + " " + this.$q.lang.vui.notifications.hours : (t = Te.date.getDateDiff(Date.now(), e, "minutes"), t > 0 ? t + " " + this.$q.lang.vui.notifications.minutes : (t = Te.date.getDateDiff(Date.now(), e, "seconds"), t + " " + this.$q.lang.vui.notifications.seconds)));
    }
  },
  beforeDestroy: function() {
    clearInterval(this.timer);
  }
}, Ye = window.Vue.toDisplayString, We = window.Vue.createTextVNode, le = window.Vue.resolveComponent, H = window.Vue.withCtx, Xe = window.Vue.openBlock, wt = window.Vue.createBlock, Yo = window.Vue.createCommentVNode, Wo = window.Vue.renderList, Xo = window.Vue.Fragment, Ko = window.Vue.createElementBlock, te = window.Vue.createVNode;
function Qo(e, t, n, o, s, a) {
  const i = le("q-badge"), r = le("q-icon"), l = le("q-item-section"), d = le("q-item-label"), u = le("q-item"), p = le("q-list"), h = le("q-menu"), g = le("q-btn");
  return Xe(), wt(g, {
    round: "",
    flat: !e.hasNew,
    dense: "",
    color: e.hasNew ? n.colorNew : n.color,
    "text-color": e.hasNew ? n.textColorNew : n.textColor,
    icon: e.wasError ? n.iconError : e.count > 0 ? n.icon : n.iconNone,
    title: e.wasError ? e.$q.lang.vui.notifications.serverLost : ""
  }, {
    default: H(() => [
      e.count > 0 ? (Xe(), wt(i, {
        key: 0,
        color: "red",
        "text-color": "white",
        floating: ""
      }, {
        default: H(() => [
          We(Ye(e.count), 1)
        ]),
        _: 1
      })) : Yo("", !0),
      te(h, { class: "notifications" }, {
        default: H(() => [
          te(p, { style: { width: "300px" } }, {
            default: H(() => [
              (Xe(!0), Ko(Xo, null, Wo(e.list, (c) => (Xe(), wt(u, {
                key: c.uuid,
                tag: "a",
                href: n.targetUrlPrefix + c.targetUrl
              }, {
                default: H(() => [
                  te(l, { avatar: "" }, {
                    default: H(() => [
                      te(r, {
                        name: a.toIcon(c.type),
                        size: "2rem"
                      }, null, 8, ["name"])
                    ]),
                    _: 2
                  }, 1024),
                  te(l, null, {
                    default: H(() => [
                      te(d, null, {
                        default: H(() => [
                          We(Ye(c.title), 1)
                        ]),
                        _: 2
                      }, 1024),
                      te(d, {
                        caption: "",
                        lines: "3"
                      }, {
                        default: H(() => [
                          We(Ye(c.content), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  te(l, {
                    side: "",
                    top: ""
                  }, {
                    default: H(() => [
                      te(d, { caption: "" }, {
                        default: H(() => [
                          We(Ye(a.toDelay(new Date(c.creationDate))), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1032, ["href"]))), 128))
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["flat", "color", "text-color", "icon", "title"]);
}
const Zo = /* @__PURE__ */ M(Jo, [["render", Qo]]), L = window.ol, ea = {
  props: {
    id: { type: String, required: !0 },
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
    let e = new L.View();
    const t = new L.source.OSM();
    let n = new L.layer.Tile({
      preload: 4,
      source: t
    });
    const o = [ta()];
    this.$props.overview && o.push(new L.control.OverviewMap({ layers: [new L.layer.Tile({ source: t })] })), this.$props.search && typeof Geocoder == "function" && o.push(new Geocoder("nominatim", {
      provider: "osm",
      lang: "fr",
      placeholder: "Search for ...",
      limit: 5,
      debug: !1,
      autoComplete: !0,
      keepOpen: !0,
      preventMarker: !0,
      defaultFlyResolution: 19
    })), this.olMap = new L.Map({
      interactions: L.interaction.defaults.defaults({
        onFocusOnly: !0
      }),
      target: this.$props.id,
      layers: [n],
      // Improve user experience by loading tiles while animating. Will make animations stutter on mobile or slow devices.
      loadTilesWhileAnimating: !0,
      view: e,
      controls: L.control.defaults.defaults().extend(o)
    }), this.$props.initialCenter && this.olMap.getView().setCenter(L.proj.fromLonLat([this.$props.initialCenter.lon, this.$props.initialCenter.lat])), this.olMap.on("moveend", (function(s) {
      let a = s.map.getView().calculateExtent(), i = L.proj.transformExtent(a, "EPSG:3857", "EPSG:4326"), r = L.extent.getTopLeft(i), l = L.extent.getBottomRight(i);
      VUiPage.debounce(() => this.$emit("moveend", r, l), 300);
    }).bind(this)), setTimeout((function() {
      this.olMap.on("click", (function(s) {
        s.originalEvent.target instanceof HTMLCanvasElement && (s.stopPropagation(), VUiPage.debounce(() => this.$emit("click", L.proj.transform(s.coordinate, "EPSG:3857", "EPSG:4326")), 300));
      }).bind(this));
    }).bind(this), 300);
  }
};
function ta() {
  return new class extends L.control.Control {
    /**
     * @param {Object} [opt_options] Control options.
     */
    constructor(t) {
      const n = t || {}, o = document.createElement("div");
      o.className = "ol-v-custom-buttons ol-unselectable ol-control", super({
        element: o,
        target: n.target
      });
    }
  }();
}
const na = window.Vue.normalizeProps, oa = window.Vue.guardReactiveProps, aa = window.Vue.renderSlot, ia = window.Vue.openBlock, sa = window.Vue.createElementBlock, ra = ["id"];
function la(e, t, n, o, s, a) {
  return ia(), sa("div", {
    id: n.id,
    class: "map"
  }, [
    aa(e.$slots, "default", na(oa(e.$attrs)))
  ], 8, ra);
}
const da = /* @__PURE__ */ M(ea, [["render", la]]), y = window.ol, ca = {
  props: {
    id: { type: String, required: !0 },
    list: { type: Array },
    cluster: { type: Array },
    object: { type: Object },
    objectEditable: { type: Boolean },
    fitOnDataUpdate: { type: Boolean },
    baseUrl: { type: String },
    field: { type: String, required: !0 },
    nameField: { type: String },
    markerColor: { type: String, default: "#000000" },
    markerUseFont: { type: Boolean, default: !1 },
    markerImage: { type: String },
    markerImageDynamic: { type: Function, default: (e) => "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='" + e + "' height='" + e + "'><path style='fill:white' d='M18.364 3.636a9 9 0 0 1 0 12.728L12 22.728l-6.364-6.364A9 9 0 0 1 18.364 3.636ZM12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z'/></svg>" },
    markerFont: { type: String, default: "Material Icons" },
    markerIcon: { type: String, default: "place" },
    markerSize: { type: Number, default: 30 },
    clusterCircleSize: { type: Number, default: 20 },
    clusterColor: { type: String, default: "#fff" },
    clusterCircleBorderColor: { type: String, default: "#000000" },
    clusterTextColor: { type: String, default: "#000000" },
    clusterTextSize: { type: Number, default: 12 },
    clusterTextFont: { type: String, default: "sans-serif" }
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
      // (geohash-specific) Base32 map
    };
  },
  watch: {
    // watch list, cluster and object but filter to only process when desired field ('field' prop, eg geoLocation) is modified
    list: {
      handler(e) {
        if (e) {
          let t = this.computeCoordString(e);
          this._itemsCoordString && t !== this._itemsCoordString && (this.$data.items = e, this.updateMap()), this._itemsCoordString = t;
        }
      },
      deep: !0,
      immediate: !0
      // initialize _itemsCoordString
    },
    cluster: {
      handler(e) {
        if (e) {
          let t = this.computeCoordString(e);
          if (this._clusterCoordString) {
            this.$data.items = [], this.$data.clusters = [];
            for (let n = 0; n < e.length; n++)
              e[n].totalCount == 1 ? this.$data.items = this.$data.items.concat(e[n].list) : this.$data.clusters.push({
                geoHash: e[n].code,
                geoLocation: this.decode(e[n].code),
                totalCount: e[n].totalCount
              });
            this.updateMap();
          }
          this._clusterCoordString = t;
        }
      },
      deep: !0,
      immediate: !0
      // initialize _clusterCoordString
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
      // initialize _itemsCoordString
    }
  },
  computed: {
    features: function() {
      let e = this.$props.field, t = this.$data.items.filter(function(o) {
        return o[e] != null;
      }).map((function(o) {
        let s;
        if (typeof o[e] == "string" || o[e] instanceof String ? s = JSON.parse(o[e]) : s = o[e], s != null && s.lon != null && s.lat != null) {
          let a = new y.Feature({
            geometry: new y.geom.Point(y.proj.fromLonLat([s.lon, s.lat]))
          });
          return this.$props.nameField && (a.set("name", o[this.$props.nameField]), a.set("innerObject", o), a.set("totalCount", o.totalCount)), a;
        }
        return null;
      }).bind(this)).filter((o) => o != null), n = this.$data.clusters.filter(function(o) {
        return o.geoLocation != null;
      }).map((function(o) {
        let s;
        if (typeof o.geoLocation == "string" || o.geoLocation instanceof String ? s = JSON.parse(o.geoLocation) : s = o.geoLocation, s != null) {
          let a = new y.Feature({
            geometry: new y.geom.Point(y.proj.fromLonLat([s.lon, s.lat]))
          });
          return this.$props.nameField && (a.set("name", o[this.$props.nameField]), a.set("innerObject", o), a.set("totalCount", o.totalCount)), a;
        }
        return null;
      }).bind(this));
      return t.concat(n);
    }
  },
  methods: {
    fitView: function() {
      if (this.features.length > 0) {
        let e = 19, t = this.features.length == 1 ? Math.min(this.olMap.getView().getZoom() || e, e) : e, n = y.geom.Polygon.fromExtent(this.$data.vectorSource.getExtent());
        n.scale(1.2), this.olMap.getView().fit(n, { size: this.olMap.getSize(), maxZoom: t, duration: 750 });
      }
    },
    fetchList: function(e, t) {
      this.$http.get(this.baseUrl + '_geoSearch?topLeft="' + e.lat + "," + e.lon + '"&bottomRight="' + t.lat + "," + t.lon + '"', { timeout: 5 * 1e3 }).then((function(n) {
        this.$data.items = n.data, this.$data.vectorSource.clear(), this.$data.vectorSource.addFeatures(this.features);
      }).bind(this));
    },
    computeCoordString: function(e) {
      let t;
      return Array.isArray(e) ? this.$props.cluster ? t = e.map((n) => this.decode(n.code)) : t = e.map((n) => n[this.$props.field]) : t = e[this.$props.field], JSON.stringify(t);
    },
    updateMap: function() {
      Object.keys(this.$data.vectorSource).length == 0 && (this.$data.vectorSource = new y.source.Vector({})), this.$data.vectorSource.clear(), this.$data.vectorSource.addFeatures(this.features), this.$props.fitOnDataUpdate && this.fitView();
    },
    /**
    * Decode geohash to latitude/longitude (location is approximate centre of geohash cell,
    *     to reasonable precision).
    *
    * @param   {string} geohash - Geohash string to be converted to latitude/longitude.
    * @returns {{lat:number, lon:number}} (Center of) geohashed location.
    * @throws  Invalid geohash.
    *
    * @example
    *     const latlon = Geohash.decode('u120fxw'); // => { lat: 52.205, lon: 0.1188 }
    */
    decode: function(e) {
      const t = this.bounds(e), n = t.sw.lat, o = t.sw.lon, s = t.ne.lat, a = t.ne.lon;
      let i = (n + s) / 2, r = (o + a) / 2;
      return i = i.toFixed(Math.floor(2 - Math.log(s - n) / Math.LN10)), r = r.toFixed(Math.floor(2 - Math.log(a - o) / Math.LN10)), { lat: Number(i), lon: Number(r) };
    },
    /**
     * Returns SW/NE latitude/longitude bounds of specified geohash.
     *
     * @param   {string} geohash - Cell that bounds are required of.
     * @returns {{sw: {lat: number, lon: number}, ne: {lat: number, lon: number}}}
     * @throws  Invalid geohash.
     */
    bounds: function(e) {
      if (e.length == 0) throw new Error("Invalid geohash");
      e = e.toLowerCase();
      let t = !0, n = -90, o = 90, s = -180, a = 180;
      for (let r = 0; r < e.length; r++) {
        const l = e.charAt(r), d = this.$data.base32.indexOf(l);
        if (d == -1) throw new Error("Invalid geohash");
        for (let u = 4; u >= 0; u--) {
          const p = d >> u & 1;
          if (t) {
            const h = (s + a) / 2;
            p == 1 ? s = h : a = h;
          } else {
            const h = (n + o) / 2;
            p == 1 ? n = h : o = h;
          }
          t = !t;
        }
      }
      return {
        sw: { lat: n, lon: s },
        ne: { lat: o, lon: a }
      };
    }
  },
  mounted: function() {
    this.$parent.onMapLoad((function(e) {
      if (this.$data.olMap = e, this.$data.items = [], this.$data.clusters = [], this.$props.list)
        this.$data.items = this.$props.list;
      else if (this.$props.cluster)
        for (let a = 0; a < this.$props.cluster.length; a++)
          this.$props.cluster[a].totalCount == 1 ? this.$data.items = this.$data.items.concat(this.$props.cluster[a].list) : this.$data.clusters.push({
            geoHash: this.$props.cluster[a].code,
            geoLocation: this.decode(this.$props.cluster[a].code),
            totalCount: this.$props.cluster[a].totalCount
          });
      else this.$props.object && (this.$data.items = [this.$props.object]);
      this.$data.vectorSource = new y.source.Vector({
        features: this.features
      });
      let t = new y.source.Cluster({
        source: this.$data.vectorSource,
        distance: 2 * this.$props.clusterCircleSize
      }), n = new y.layer.Vector({
        source: t
      }), o;
      this.$props.markerUseFont ? o = new y.style.Style({
        text: new y.style.Text({
          font: this.$props.markerSize + "px " + this.$props.markerFont,
          text: this.$props.markerIcon,
          fill: new y.style.Fill({ color: this.$props.markerColor }),
          textBaseline: "alphabetic"
        })
      }) : this.$props.markerImage ? o = new y.style.Style({
        image: new y.style.Icon({
          src: this.$props.markerImage,
          scale: this.$props.markerSize / 30,
          anchor: [0.5, 0.95],
          color: this.$props.markerColor
        })
      }) : o = new y.style.Style({
        image: new y.style.Icon({
          src: this.$props.markerImageDynamic(this.$props.markerSize),
          anchor: [0.5, 0.95],
          color: this.$props.markerColor
        })
      });
      let s = {};
      if (n.setStyle((function(a) {
        let i = 0, r = a.get("features");
        for (let l = 0; l < r.length; l++) {
          let d = r[l].get("totalCount");
          i += d || 1;
        }
        if (!i || i == 1)
          return o;
        {
          let l = s[i];
          return l || (l = new y.style.Style({
            image: new y.style.Circle({
              radius: this.$props.clusterCircleSize,
              stroke: new y.style.Stroke({
                color: this.$props.clusterCircleBorderColor
              }),
              fill: new y.style.Fill({
                color: this.$props.clusterColor
              })
            }),
            text: new y.style.Text({
              text: i.toString(),
              font: this.$props.clusterTextSize + "px " + this.$props.clusterTextFont,
              fill: new y.style.Fill({
                color: this.$props.clusterTextColor
              })
            })
          }), s[i] = l), l;
        }
      }).bind(this)), this.olMap.addLayer(n), this.fitView(), this.features.length == 0 && (this.olMap.getView().setCenter(y.proj.fromLonLat([2.333333, 48.866667])), this.olMap.vInitialZoomOverride = 3), this.olMap.on("moveend", (function(a) {
        let i = a.map.getView().calculateExtent(), r = y.proj.transformExtent(i, "EPSG:3857", "EPSG:4326"), l = y.extent.getTopLeft(r), d = y.extent.getBottomRight(r);
        this.baseUrl && VUiPage.debounce(() => this.fetchList({ lat: l[0], lon: l[1] }, { lat: d[0], lon: d[1] }), 300), VUiPage.debounce(() => this.$emit("moveend", l, d), 300);
      }).bind(this)), this.$props.nameField) {
        let a = new y.Overlay({
          element: this.$el.querySelector("#" + this.$props.id + "Popup"),
          positioning: "bottom-center",
          stopEvent: !1,
          offset: [0, -20]
        });
        this.olMap.addOverlay(a), this.olMap.on("click", (function(i) {
          if (i.originalEvent.target instanceof HTMLCanvasElement) {
            let r = this.olMap.forEachFeatureAtPixel(
              i.pixel,
              function(l) {
                return l;
              }
            );
            if (r && r.get("features") && r.get("features").length == 1) {
              if (!Object.hasOwn(r.get("features")[0].get("innerObject"), "geoHash")) {
                let l = r.getGeometry().getCoordinates();
                a.setPosition(l), this.$data.popupDisplayed = !0, this.$data.objectDisplayed = r.get("features")[0].get("innerObject"), i.stopPropagation(), VUiPage.debounce(() => this.$emit("click", y.proj.transform(l, "EPSG:3857", "EPSG:4326")), 300);
              }
            } else
              this.$data.popupDisplayed = !1;
          }
        }).bind(this)), this.olMap.on("pointermove", (function(i) {
          if (i.dragging) {
            this.$data.popupDisplayed = !1;
            return;
          }
          let r = this.olMap.getEventPixel(i.originalEvent), l = this.olMap.hasFeatureAtPixel(r);
          this.olMap.getTargetElement().style.cursor = l ? "pointer" : "";
        }).bind(this));
      } else
        this.olMap.on("click", (function(a) {
          if (a.originalEvent.target instanceof HTMLCanvasElement) {
            let i = this.olMap.forEachFeatureAtPixel(
              a.pixel,
              function(r) {
                return r;
              }
            );
            if (i && i.get("features") && i.get("features").length == 1) {
              let r = i.getGeometry().getCoordinates();
              a.stopPropagation(), VUiPage.debounce(() => this.$emit("click", y.proj.transform(r, "EPSG:3857", "EPSG:4326")), 300);
            }
          }
        }).bind(this));
      if (this.$props.object && this.$props.objectEditable) {
        let a = new y.interaction.Draw({
          source: this.$data.vectorSource,
          type: "Point"
        });
        a.on("drawend", (r) => {
          let l = r.feature, d = y.proj.toLonLat(l.getGeometry().getCoordinates());
          this.$data.vectorSource.clear(), this.olMap.removeInteraction(a), i.classList.remove("active"), this.$props.object[this.$props.field] = {
            lon: d[0],
            lat: d[1]
          };
        });
        const i = document.createElement("button");
        i.innerHTML = "&#9678;", i.addEventListener(
          "click",
          (r) => {
            r.preventDefault(), i.classList.contains("active") ? (this.olMap.removeInteraction(a), i.classList.remove("active")) : (this.olMap.addInteraction(a), a = this.olMap.getInteractions().getArray().slice(-1)[0], i.classList.add("active"));
          },
          !1
        ), this.olMap.getViewport().getElementsByClassName("ol-v-custom-buttons")[0].appendChild(i);
      }
    }).bind(this));
  }
}, ua = window.Vue.renderSlot, fa = window.Vue.toDisplayString, Zt = window.Vue.openBlock, en = window.Vue.createElementBlock, ha = window.Vue.createCommentVNode, pa = window.Vue.createElementVNode, ma = ["id"], ga = ["id"], wa = {
  key: 0,
  class: "popup"
};
function ba(e, t, n, o, s, a) {
  return Zt(), en("div", { id: n.id }, [
    pa("div", {
      id: n.id + "Popup"
    }, [
      ua(e.$slots, "card", { objectDisplayed: e.objectDisplayed }, () => [
        e.popupDisplayed ? (Zt(), en("div", wa, fa(e.objectDisplayed[n.nameField]), 1)) : ha("", !0)
      ])
    ], 8, ga)
  ], 8, ma);
}
const ya = /* @__PURE__ */ M(ca, [["render", ba]]), va = window.Quasar, _a = {
  props: {
    modelValue: { type: String, required: !0 },
    list: { type: Array, required: !0 },
    keyField: { type: String, required: !0 },
    labelField: { type: String, required: !0 },
    parentKeyField: { type: String, required: !0 },
    subTreeKey: { type: String, required: !1 }
  },
  emits: ["update:modelValue"],
  data: function() {
    return {
      selectedNode: this.$props.modelValue,
      expandedNodes: [this.$props.modelValue]
    };
  },
  watch: {
    modelValue: function(e) {
      this.$data.selectedNode = e;
    }
  },
  methods: {
    handleSelected: function(e) {
      this.$emit("update:modelValue", this.$data.selectedNode), e && this.$refs.menu.hide();
    },
    handleExpanded: function() {
      va.debounce(this.$refs.menu.updatePosition, 500)();
    },
    getSelectedLabel: function() {
      return this.$data.selectedNode ? this.$props.list.find((function(t) {
        return t[this.$props.keyField] === this.$data.selectedNode;
      }).bind(this))[this.$props.labelField] : null;
    },
    convertListToTree: function(e, t) {
      var n = {}, o, s = [], a, i = [];
      for (a = 0; a < e.length; a += 1)
        n[e[a][this.$props.keyField]] = a, i.push({ ...e[a], children: [] });
      for (a = 0; a < e.length; a += 1)
        o = i[a], o[this.$props.parentKeyField] ? i[n[o[this.$props.parentKeyField]]].children.push(o) : s.push(o);
      return t ? [i[n[t]]] : s;
    }
  }
}, Ke = window.Vue.resolveComponent, bt = window.Vue.createVNode, $a = window.Vue.toDisplayString, Ca = window.Vue.createElementVNode, Qe = window.Vue.withCtx, xa = window.Vue.normalizeProps, Sa = window.Vue.guardReactiveProps, ka = window.Vue.openBlock, Va = window.Vue.createBlock, Da = {
  class: "self-center full-width no-outline",
  tabindex: "0"
};
function qa(e, t, n, o, s, a) {
  const i = Ke("q-icon"), r = Ke("q-tree"), l = Ke("q-menu"), d = Ke("q-field");
  return ka(), Va(d, xa(Sa(e.$attrs)), {
    append: Qe(() => [
      bt(i, { name: "arrow_drop_down" })
    ]),
    control: Qe(() => [
      Ca("div", Da, $a(a.getSelectedLabel()), 1)
    ]),
    default: Qe(() => [
      bt(l, {
        breakpoint: 600,
        fit: "",
        ref: "menu"
      }, {
        default: Qe(() => [
          bt(r, {
            nodes: a.convertListToTree(e.$props.list, e.$props.subTreeKey),
            "node-key": e.$props.keyField,
            "label-key": e.$props.labelField,
            expanded: e.expandedNodes,
            "onUpdate:expanded": [
              t[0] || (t[0] = (u) => e.expandedNodes = u),
              a.handleExpanded
            ],
            selected: e.selectedNode,
            "onUpdate:selected": [
              t[1] || (t[1] = (u) => e.selectedNode = u),
              a.handleSelected
            ]
          }, null, 8, ["nodes", "node-key", "label-key", "expanded", "onUpdate:expanded", "selected", "onUpdate:selected"])
        ]),
        _: 1
      }, 512)
    ]),
    _: 1
  }, 16);
}
const Fa = /* @__PURE__ */ M(_a, [["render", qa]]), Ea = window.Vue.ref, Ta = {
  props: {
    inputId: String,
    readonly: Boolean,
    fileInfoUris: Array,
    fieldName: String,
    url: String,
    downloadUrl: String,
    accept: String,
    multiple: { type: Boolean, default: !0 },
    maxFiles: Number,
    callbackOnDelete: { default: !1 },
    inputProps: { type: Object }
  },
  emits: ["update:file-info-uris", "download-file", "file-ok", "file-failed", "init-ok", "init-ko"],
  computed: {},
  mounted() {
    if (this.fileInfoUris.length > 0) {
      let e = new URLSearchParams();
      this.fileInfoUris.forEach((t) => {
        e.append(this.fieldName, t);
      }), this.$http.get(this.url + "/fileInfos", { params: e, credentials: !1 }).then((function(t) {
        let n = t.data;
        this.files = n.map((o) => ({ ...o, status: "OK" })), this.$emit("init-ok");
      }).bind(this)).catch(
        (function(t) {
          this.$emit("update:file-info-uris", []), this.$emit("init-ko"), this.$q && (t.response ? this.$q.notify(t.response.status + ":" + t.response.statusText + " Can't load file " + e) : this.$q.notify(t + " Can't load file " + e));
        }).bind(this)
      );
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
      return e == null || this.$data.files.filter((t) => t.status != "ERROR").length < e;
    },
    reset() {
      this.files.length = 0;
    },
    addFiles(e) {
      this.files = this.files.filter((t) => t.status != "ERROR");
      for (let t of e)
        if (this.canAddFiles()) {
          let n = Ea({
            name: t.name,
            size: t.size,
            type: t.type,
            status: "IN_PROGRESS",
            errorMessage: null,
            progress: 0,
            estimated: null,
            file: t
          }).value;
          this.$data.files.push(n), Oa.call(this, n);
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
      let o = typeof this.callbackOnDelete == "function";
      if (this.callbackOnDelete === !0 || o) {
        let s = {};
        s[this.fieldName] = e.fileUri;
        let a = this.$http.delete(this.url, { params: s, credentials: !1 });
        o && this.callbackOnDelete(this, a);
      }
    },
    downloadFile(e) {
      this.$emit("download-file", e.fileUri);
    },
    getGlobalSize() {
      return this.files.filter((t) => t.status != "ERROR").reduce((t, n) => t + n.size, 0);
    },
    getGlobalSizeLabel() {
      return this.humanStorageSize(this.getGlobalSize());
    },
    humanStorageSize(e, t = 1) {
      let n = 0;
      for (; parseInt(e, 10) >= 1024 && n < this.$data.units.length - 1; )
        e /= 1024, ++n;
      return `${e.toFixed(t)} ${this.$data.units[n]}`;
    }
  }
};
function Oa(e) {
  let t = new AbortController();
  e.abortController = t;
  let n = new FormData();
  n.append("file", e.file), this.$http.post(
    this.url,
    n,
    {
      credentials: !1,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json"
      },
      signal: t.signal,
      onUploadProgress: (function(o) {
        e.progress = o.progress, e.estimated = o.estimated;
      }).bind(this)
    }
  ).then((function(o) {
    this.$emit("file-ok", o.data);
    let s = o.data;
    e.status = "OK", e.fileUri = s, this.$emit("update:file-info-uris", [...this.fileInfoUris, s]);
  }).bind(this)).catch((function(o) {
    var s;
    this.$emit("file-failed", o), e.status = "ERROR", ((s = o == null ? void 0 : o.response) == null ? void 0 : s.status) === 413 && (e.errorMessage = this.$vui.i18n().uploader.fileErrorTooBig);
  }).bind(this));
}
const G = window.Vue.toDisplayString, Ze = window.Vue.normalizeProps, et = window.Vue.guardReactiveProps, Oe = window.Vue.renderSlot, Ma = window.Vue.createTextVNode, j = window.Vue.openBlock, z = window.Vue.createElementBlock, ne = window.Vue.createCommentVNode, La = window.Vue.renderList, Pa = window.Vue.Fragment, Na = window.Vue.normalizeStyle, Me = window.Vue.createElementVNode, tn = window.Vue.withModifiers, nn = window.Vue.mergeProps, Aa = { class: "v-fileupload" }, Ua = {
  key: 0,
  class: "header"
}, Ba = { class: "content" }, Ia = { class: "files" }, ja = {
  class: "file",
  style: { display: "flex", "flex-flow": "row wrap", "column-gap": "50px" }
}, za = {
  key: 0,
  style: { color: "red" }
}, Ra = { style: { color: "grey" } }, Ha = { key: 1 }, Ga = { key: 2 }, Ja = ["onClick", "href"], Ya = ["onClick"], Wa = ["onClick"], Xa = {
  key: 0,
  class: "input"
}, Ka = ["id", "accept", "multiple"];
function Qa(e, t, n, o, s, a) {
  return j(), z("div", Aa, [
    e.$slots.header ? (j(), z("div", Ua, [
      Ma(G(e.$slots.header.$attrs) + " ", 1),
      Oe(e.$slots, "header", Ze(et({ ...e.$data, ...e.$props, canAddFiles: a.canAddFiles, addFiles: a.addFiles, abortUpload: a.abortUpload, removeFile: a.removeFile, downloadFile: a.downloadFile, getGlobalSize: a.getGlobalSize, getGlobalSizeLabel: a.getGlobalSizeLabel, humanStorageSize: a.humanStorageSize })))
    ])) : ne("", !0),
    Me("div", Ba, [
      Oe(e.$slots, "default", Ze(et({ ...e.$data, ...e.$props, canAddFiles: a.canAddFiles, addFiles: a.addFiles, abortUpload: a.abortUpload, removeFile: a.removeFile, downloadFile: a.downloadFile, getGlobalSize: a.getGlobalSize, getGlobalSizeLabel: a.getGlobalSizeLabel, humanStorageSize: a.humanStorageSize })), () => [
        Me("div", Ia, [
          Oe(e.$slots, "files", Ze(et({ ...e.$data, ...e.$props, canAddFiles: a.canAddFiles, addFiles: a.addFiles, abortUpload: a.abortUpload, removeFile: a.removeFile, downloadFile: a.downloadFile, getGlobalSize: a.getGlobalSize, getGlobalSizeLabel: a.getGlobalSizeLabel, humanStorageSize: a.humanStorageSize })), () => [
            (j(!0), z(Pa, null, La(e.files, (i) => (j(), z("span", ja, [
              Me("span", {
                style: Na({ color: i.status === "IN_PROGRESS" ? "blue" : i.status == "ERROR" ? "red" : "" })
              }, G(i.name), 5),
              i.status === "ERROR" ? (j(), z("span", za, G(i.errorMessage), 1)) : ne("", !0),
              Me("span", Ra, G(a.humanStorageSize(i.size)), 1),
              i.status === "IN_PROGRESS" ? (j(), z("span", Ha, G(e.$vui.i18n().uploader.progress) + " : " + G((i.progress * 100).toFixed()) + " %", 1)) : ne("", !0),
              i.status === "IN_PROGRESS" && i.estimated != null ? (j(), z("span", Ga, G(e.$vui.i18n().uploader.estimated) + " : " + G(i.estimated.toFixed()) + " s", 1)) : ne("", !0),
              i.status === "OK" ? (j(), z("a", {
                key: 3,
                onClick: (r) => a.downloadFile(i),
                href: n.downloadUrl + i.uri
              }, G(e.$vui.i18n().uploader.download), 9, Ja)) : ne("", !0),
              i.status === "IN_PROGRESS" ? (j(), z("button", {
                key: 4,
                onClick: tn((r) => a.abortUpload(i), ["prevent"])
              }, G(e.$vui.i18n().uploader.abort), 9, Ya)) : ne("", !0),
              !this.readonly && i.status !== "IN_PROGRESS" ? (j(), z("button", {
                key: 5,
                style: { color: "red" },
                onClick: tn((r) => a.removeFile(i), ["prevent"])
              }, G(e.$vui.i18n().uploader.remove), 9, Wa)) : ne("", !0)
            ]))), 256))
          ])
        ]),
        a.canAddFiles() ? (j(), z("div", Xa, [
          Oe(e.$slots, "input", Ze(et({ ...e.$data, ...e.$props, canAddFiles: a.canAddFiles, addFiles: a.addFiles, abortUpload: a.abortUpload, removeFile: a.removeFile, downloadFile: a.downloadFile, getGlobalSize: a.getGlobalSize, getGlobalSizeLabel: a.getGlobalSizeLabel, humanStorageSize: a.humanStorageSize })), () => [
            Me("input", nn({
              id: e.$props.inputId,
              ref: "input",
              type: "file",
              accept: e.$props.accept,
              multiple: e.$props.multiple,
              onChange: t[0] || (t[0] = (i) => a.addFiles(i.target.files))
            }, e.$props.inputProps), null, 16, Ka)
          ])
        ])) : ne("", !0)
      ])
    ]),
    e.$slots.footer ? (j(), z("div", nn({
      key: 1,
      class: "footer"
    }, { ...e.$data, ...e.$props, canAddFiles: a.canAddFiles, addFiles: a.addFiles, abortUpload: a.abortUpload, removeFile: a.removeFile, downloadFile: a.downloadFile, getGlobalSize: a.getGlobalSize, getGlobalSizeLabel: a.getGlobalSizeLabel, humanStorageSize: a.humanStorageSize }), [
      Oe(e.$slots, "footer")
    ], 16)) : ne("", !0)
  ]);
}
const Za = /* @__PURE__ */ M(Ta, [["render", Qa]]), ei = {
  props: {
    readonly: Boolean,
    label: String,
    simple: { type: Boolean, default: !1 },
    fileInfoUris: Array,
    fieldName: String,
    url: String,
    downloadUrl: { type: String, default: (e) => e.baseUrl + "/download" },
    multiple: { type: Boolean, default: !0 }
  },
  emits: ["update:file-info-uris", "download-file", "init-ok", "init-ko"],
  computed: {},
  mounted() {
    if (this.changeIcon(), this.fileInfoUris.length > 0) {
      var e = new URLSearchParams();
      this.fileInfoUris.forEach((t) => {
        e.append(this.fieldName, t);
      }), this.$http.get(this.url + "/fileInfos", { params: e, credentials: !1 }).then((function(t) {
        var n = t.data;
        this.files = n.map((o) => o), this.$emit("init-ok");
      }).bind(this)).catch(
        (function(t) {
          this.$emit("update:file-info-uris", []), this.$emit("init-ko"), t.response ? this.$q.notify(t.response.status + ":" + t.response.statusText + " Can't load file " + e) : this.$q.notify(t + " Can't load file " + e);
        }).bind(this)
      );
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
      e.files.forEach((function(n) {
        this.files.push(n), n.fileUri = n.xhr.response, t.push(n.fileUri), this.$refs.quasarUploader.removeFile(n), this.$emit("update:file-info-uris", t);
      }).bind(this));
    },
    failedFiles(e) {
      e.xhr.status === 413 ? this.$q.notify({
        type: "negative",
        message: this.$q.lang.vui.uploader.fileErrorTooBig,
        multiLine: !0,
        timeout: 2500
      }) : this.$q.notify({
        type: "negative",
        message: this.$q.lang.vui.uploader.fileErrorUnknown,
        multiLine: !0,
        timeout: 2500
      });
    },
    start(e, t, n) {
      this.$refs.quasarUploader;
    },
    removeRemoteFile(e) {
      var t = this.files.indexOf(e), n = [...this.fileInfoUris], o = {};
      o[this.fieldName] = e.fileUri, this.$http.delete(this.url, { params: o, credentials: !1 }).then((function() {
        this.multiple ? (this.files.splice(t, 1), n.splice(t, 1)) : (this.files.splice(0), n.splice(0)), this.$emit("update:file-info-uris", n);
      }).bind(this)).catch((function(s) {
        this.$q.notify(s.response.status + ":" + s.response.statusText + " Can't remove temporary file");
      }).bind(this));
    },
    globalCanAddFiles(e) {
      return this.multiple ? !this.$props.readonly : !this.$props.readonly && e.filter((t) => t.__status != "uploaded").length + this.fileInfoUris.length < 1;
    },
    changeIcon() {
      this.$q.iconSet.uploader.removeUploaded = "delete_sweep", this.$q.iconSet.uploader.done = "delete";
    },
    addFiles(e) {
      var t = this.$refs.quasarUploader;
      this.globalCanAddFiles(t.files) && this.$refs.quasarUploader.addFiles(e);
    },
    getGlobalSize() {
      var e = this.files.filter((n) => n.__status != "uploaded").reduce((n, o) => n + o.size, 0), t = this.files.reduce((n, o) => n + o.size, 0);
      return e + t;
    },
    getGlobalSizeLabel() {
      return this.humanStorageSize(this.getGlobalSize());
    },
    humanStorageSize(e, t = 1) {
      let n = 0;
      for (; parseInt(e, 10) >= 1024 && n < this.$data.units.length - 1; )
        e /= 1024, ++n;
      return `${e.toFixed(t)} ${this.$data.units[n]}`;
    }
  }
}, W = window.Vue.toDisplayString, tt = window.Vue.createTextVNode, de = window.Vue.resolveComponent, A = window.Vue.withCtx, X = window.Vue.createVNode, S = window.Vue.openBlock, R = window.Vue.createBlock, T = window.Vue.createCommentVNode, oe = window.Vue.createElementBlock, K = window.Vue.createElementVNode, on = window.Vue.renderList, yt = window.Vue.Fragment, ti = window.Vue.normalizeClass, ni = window.Vue.mergeProps, oi = window.Vue.createSlots, ai = { class: "q-uploader__header-content flex flex-center no-wrap q-gutter-xs" }, ii = { class: "col column justify-center" }, si = {
  key: 0,
  class: "q-uploader__title"
}, ri = {
  key: 1,
  class: "q-uploader__subtitle"
}, li = {
  key: 2,
  class: "q-uploader__subtitle"
}, di = { class: "row" }, ci = { class: "col column justify-center" }, ui = { class: "q-uploader__file-header row flex-center no-wrap" }, fi = { class: "q-uploader__file-header-content col" }, hi = { class: "q-uploader__title" }, pi = { class: "q-uploader__file-header row flex-center no-wrap" }, mi = { class: "q-uploader__file-header-content col" }, gi = { class: "q-uploader__title" }, wi = {
  key: 0,
  class: "q-field__after q-field__marginal row no-wrap items-center"
};
function bi(e, t, n, o, s, a) {
  const i = de("q-tooltip"), r = de("q-btn"), l = de("q-spinner"), d = de("q-uploader-add-trigger"), u = de("q-icon"), p = de("q-circular-progress"), h = de("q-field"), g = de("q-uploader");
  return S(), R(g, ni({
    url: e.$props.url,
    "auto-upload": "",
    "field-name": e.$props.fieldName,
    multiple: e.$props.multiple,
    "max-files": e.$props.multiple ? void 0 : 1,
    headers: [{ name: "Accept", value: "application/json" }],
    onUploaded: a.uploadedFiles,
    onFailed: a.failedFiles,
    readonly: e.$props.readonly || !a.globalCanAddFiles([])
  }, e.$attrs, { ref: "quasarUploader" }), oi({
    list: A((c) => [
      K("div", di, [
        X(h, {
          "label-width": 3,
          label: e.$props.simple ? e.$props.label : void 0,
          class: "col",
          orientation: "vertical",
          "stack-label": "",
          borderless: ""
        }, {
          control: A(() => [
            K("div", ci, [
              e.$props.readonly ? T("", !0) : (S(!0), oe(yt, { key: 0 }, on(c.files, (f) => (S(), oe(yt, {
                key: f.name
              }, [
                f.__status !== "uploaded" ? (S(), oe("div", {
                  key: 0,
                  class: ti(["q-uploader__file relative-position", {
                    "q-uploader__file--failed": f.__status === "failed",
                    "q-uploader__file--uploaded": f.__status === "uploaded"
                  }])
                }, [
                  K("div", ui, [
                    f.__status === "failed" ? (S(), R(u, {
                      key: 0,
                      class: "q-uploader__file-status",
                      name: e.$q.iconSet.type.negative,
                      color: "negative"
                    }, null, 8, ["name"])) : T("", !0),
                    X(u, {
                      class: "q-uploader__file-status",
                      name: f.type.indexOf("video/") === 0 ? "movie" : f.type.indexOf("image/") === 0 ? "photo" : f.type.indexOf("audio/") === 0 ? "audiotrack" : "insert_drive_file"
                    }, null, 8, ["name"]),
                    K("div", fi, [
                      K("div", hi, W(f.name), 1)
                    ]),
                    f.__status === "uploading" ? (S(), R(p, {
                      key: 1,
                      value: f.__progress,
                      min: 0,
                      max: 1,
                      indeterminate: f.__progress === 0
                    }, null, 8, ["value", "indeterminate"])) : T("", !0),
                    f.__status === "failed" ? (S(), R(r, {
                      key: 2,
                      round: "",
                      dense: "",
                      flat: "",
                      icon: e.$q.iconSet.uploader.clear,
                      onClick: (m) => c.removeFile(f)
                    }, null, 8, ["icon", "onClick"])) : T("", !0)
                  ])
                ], 2)) : T("", !0)
              ], 64))), 128)),
              (S(!0), oe(yt, null, on(e.files, (f) => (S(), oe("div", {
                key: f.name,
                class: "q-uploader__file relative-position q-uploader__file--uploaded"
              }, [
                K("div", pi, [
                  X(u, {
                    class: "q-uploader__file-status",
                    name: f.type.indexOf("video/") === 0 ? "movie" : f.type.indexOf("image/") === 0 ? "photo" : f.type.indexOf("audio/") === 0 ? "audiotrack" : "insert_drive_file"
                  }, null, 8, ["name"]),
                  K("div", mi, [
                    K("div", gi, W(f.name), 1)
                  ]),
                  e.$props.readonly ? T("", !0) : (S(), R(r, {
                    key: 0,
                    round: "",
                    dense: "",
                    flat: "",
                    icon: "delete",
                    onClick: (m) => a.removeRemoteFile(f)
                  }, null, 8, ["onClick"])),
                  X(r, {
                    round: "",
                    dense: "",
                    flat: "",
                    icon: "file_download",
                    onClick: (m) => e.$emit("download-file", f.fileUri)
                  }, null, 8, ["onClick"])
                ])
              ]))), 128))
            ])
          ]),
          _: 2
        }, 1032, ["label"]),
        e.$props.simple && !e.$props.readonly ? (S(), oe("div", wi, [
          c.isUploading ? (S(), R(l, {
            key: 0,
            class: "q-uploader__spinner"
          })) : T("", !0),
          a.globalCanAddFiles(c.files) ? (S(), R(r, {
            key: 1,
            type: "a",
            icon: e.$q.iconSet.uploader.add,
            flat: "",
            dense: ""
          }, {
            default: A(() => [
              X(d)
            ]),
            _: 1
          }, 8, ["icon"])) : T("", !0),
          c.isUploading ? (S(), R(r, {
            key: 2,
            type: "a",
            icon: e.$q.iconSet.uploader.clear,
            flat: "",
            dense: "",
            onClick: c.abort
          }, {
            default: A(() => [
              X(i, null, {
                default: A(() => [
                  tt(W(e.$q.lang.vui.uploader.abort), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : T("", !0)
        ])) : T("", !0)
      ])
    ]),
    _: 2
  }, [
    e.$props.simple ? {
      name: "header",
      fn: A(() => []),
      key: "0"
    } : {
      name: "header",
      fn: A((c) => [
        K("div", ai, [
          c.queuedFiles.length > 0 && !c.readonly ? (S(), R(r, {
            key: 0,
            type: "a",
            icon: e.$q.iconSet.uploader.clear_all,
            flat: "",
            dense: "",
            onClick: c.removeQueuedFiles
          }, {
            default: A(() => [
              X(i, null, {
                default: A(() => [
                  tt(W(e.$q.lang.vui.uploader.clear_all), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : T("", !0),
          K("div", ii, [
            e.$props.label !== void 0 ? (S(), oe("div", si, W(e.$props.label), 1)) : T("", !0),
            c.isUploading ? (S(), oe("div", ri, W(a.getGlobalSizeLabel()) + " / " + W(c.uploadProgressLabel), 1)) : (S(), oe("div", li, W(a.getGlobalSizeLabel()), 1))
          ]),
          c.isUploading ? (S(), R(l, {
            key: 1,
            class: "q-uploader__spinner"
          })) : T("", !0),
          c.isUploading && !c.readonly ? (S(), R(r, {
            key: 2,
            type: "a",
            href: "#",
            icon: e.$q.iconSet.uploader.clear,
            flat: "",
            dense: "",
            onClick: c.abort
          }, {
            default: A(() => [
              X(i, null, {
                default: A(() => [
                  tt(W(e.$q.lang.vui.uploader.abort), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : T("", !0),
          a.globalCanAddFiles(c.files) && !c.readonly ? (S(), R(r, {
            key: 3,
            icon: e.$q.iconSet.uploader.add,
            flat: "",
            dense: "",
            onClick: c.pickFiles
          }, {
            default: A(() => [
              X(d),
              X(i, null, {
                default: A(() => [
                  tt(W(e.$q.lang.vui.uploader.add), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : T("", !0)
        ])
      ]),
      key: "1"
    }
  ]), 1040, ["url", "field-name", "multiple", "max-files", "onUploaded", "onFailed", "readonly"]);
}
const yi = /* @__PURE__ */ M(ei, [["render", bi]]);
function Ft(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function yn(e, t) {
  var n = Object.create(e.prototype);
  for (var o in t) n[o] = t[o];
  return n;
}
function Ue() {
}
var Ne = 0.7, st = 1 / Ne, ke = "\\s*([+-]?\\d+)\\s*", Ae = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Q = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", vi = /^#([0-9a-f]{3,8})$/, _i = new RegExp(`^rgb\\(${ke},${ke},${ke}\\)$`), $i = new RegExp(`^rgb\\(${Q},${Q},${Q}\\)$`), Ci = new RegExp(`^rgba\\(${ke},${ke},${ke},${Ae}\\)$`), xi = new RegExp(`^rgba\\(${Q},${Q},${Q},${Ae}\\)$`), Si = new RegExp(`^hsl\\(${Ae},${Q},${Q}\\)$`), ki = new RegExp(`^hsla\\(${Ae},${Q},${Q},${Ae}\\)$`), an = {
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
Ft(Ue, lt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: sn,
  // Deprecated! Use color.formatHex.
  formatHex: sn,
  formatHex8: Vi,
  formatHsl: Di,
  formatRgb: rn,
  toString: rn
});
function sn() {
  return this.rgb().formatHex();
}
function Vi() {
  return this.rgb().formatHex8();
}
function Di() {
  return vn(this).formatHsl();
}
function rn() {
  return this.rgb().formatRgb();
}
function lt(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = vi.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? ln(t) : n === 3 ? new P(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? nt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? nt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = _i.exec(e)) ? new P(t[1], t[2], t[3], 1) : (t = $i.exec(e)) ? new P(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Ci.exec(e)) ? nt(t[1], t[2], t[3], t[4]) : (t = xi.exec(e)) ? nt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Si.exec(e)) ? un(t[1], t[2] / 100, t[3] / 100, 1) : (t = ki.exec(e)) ? un(t[1], t[2] / 100, t[3] / 100, t[4]) : an.hasOwnProperty(e) ? ln(an[e]) : e === "transparent" ? new P(NaN, NaN, NaN, 0) : null;
}
function ln(e) {
  return new P(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function nt(e, t, n, o) {
  return o <= 0 && (e = t = n = NaN), new P(e, t, n, o);
}
function qi(e) {
  return e instanceof Ue || (e = lt(e)), e ? (e = e.rgb(), new P(e.r, e.g, e.b, e.opacity)) : new P();
}
function St(e, t, n, o) {
  return arguments.length === 1 ? qi(e) : new P(e, t, n, o ?? 1);
}
function P(e, t, n, o) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +o;
}
Ft(P, St, yn(Ue, {
  brighter(e) {
    return e = e == null ? st : Math.pow(st, e), new P(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ne : Math.pow(Ne, e), new P(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new P(be(this.r), be(this.g), be(this.b), rt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: dn,
  // Deprecated! Use color.formatHex.
  formatHex: dn,
  formatHex8: Fi,
  formatRgb: cn,
  toString: cn
}));
function dn() {
  return `#${we(this.r)}${we(this.g)}${we(this.b)}`;
}
function Fi() {
  return `#${we(this.r)}${we(this.g)}${we(this.b)}${we((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function cn() {
  const e = rt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${be(this.r)}, ${be(this.g)}, ${be(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function rt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function be(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function we(e) {
  return e = be(e), (e < 16 ? "0" : "") + e.toString(16);
}
function un(e, t, n, o) {
  return o <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new J(e, t, n, o);
}
function vn(e) {
  if (e instanceof J) return new J(e.h, e.s, e.l, e.opacity);
  if (e instanceof Ue || (e = lt(e)), !e) return new J();
  if (e instanceof J) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, o = e.b / 255, s = Math.min(t, n, o), a = Math.max(t, n, o), i = NaN, r = a - s, l = (a + s) / 2;
  return r ? (t === a ? i = (n - o) / r + (n < o) * 6 : n === a ? i = (o - t) / r + 2 : i = (t - n) / r + 4, r /= l < 0.5 ? a + s : 2 - a - s, i *= 60) : r = l > 0 && l < 1 ? 0 : i, new J(i, r, l, e.opacity);
}
function kt(e, t, n, o) {
  return arguments.length === 1 ? vn(e) : new J(e, t, n, o ?? 1);
}
function J(e, t, n, o) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +o;
}
Ft(J, kt, yn(Ue, {
  brighter(e) {
    return e = e == null ? st : Math.pow(st, e), new J(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ne : Math.pow(Ne, e), new J(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * t, s = 2 * n - o;
    return new P(
      vt(e >= 240 ? e - 240 : e + 120, s, o),
      vt(e, s, o),
      vt(e < 120 ? e + 240 : e - 120, s, o),
      this.opacity
    );
  },
  clamp() {
    return new J(fn(this.h), ot(this.s), ot(this.l), rt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = rt(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${fn(this.h)}, ${ot(this.s) * 100}%, ${ot(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function fn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ot(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function vt(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Et = (e) => () => e;
function _n(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Ei(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(o) {
    return Math.pow(e + o * t, n);
  };
}
function Ti(e, t) {
  var n = t - e;
  return n ? _n(e, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : Et(isNaN(e) ? t : e);
}
function Oi(e) {
  return (e = +e) == 1 ? Pe : function(t, n) {
    return n - t ? Ei(t, n, e) : Et(isNaN(t) ? n : t);
  };
}
function Pe(e, t) {
  var n = t - e;
  return n ? _n(e, n) : Et(isNaN(e) ? t : e);
}
const Mi = function e(t) {
  var n = Oi(t);
  function o(s, a) {
    var i = n((s = St(s)).r, (a = St(a)).r), r = n(s.g, a.g), l = n(s.b, a.b), d = Pe(s.opacity, a.opacity);
    return function(u) {
      return s.r = i(u), s.g = r(u), s.b = l(u), s.opacity = d(u), s + "";
    };
  }
  return o.gamma = e, o;
}(1);
function Li(e) {
  return function(t, n) {
    var o = e((t = kt(t)).h, (n = kt(n)).h), s = Pe(t.s, n.s), a = Pe(t.l, n.l), i = Pe(t.opacity, n.opacity);
    return function(r) {
      return t.h = o(r), t.s = s(r), t.l = a(r), t.opacity = i(r), t + "";
    };
  };
}
const Pi = Li(Ti);
let ce = { color: lt, interpolateHsl: Pi, interpolateRgb: Mi };
function _t(e, t, n) {
  if (e != "DEFAULT") {
    var o, s = Ni;
    e == "RAINBOW" || e == "iRAINBOW" ? o = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#00FF00", "rgb(75, 0, 130)", "rgb(238, 130, 238)"] : e == "SPECTRUM" || e == "iSPECTRUM" ? (o = ["rgb(230, 30, 30)", "rgb(230, 230, 30)", "rgb(30, 230, 30)", "rgb(30, 230, 230)", "rgb(30, 30, 230)", "rgb(230, 30, 230)", "rgb(230, 30, 30)"], s = Ui) : e == "RED2GREEN" || e == "iRED2GREEN" ? o = ["rgb(255, 51, 51)", "rgb(250, 235, 0)", "rgb(51, 200, 51)"] : e == "GREEN2BLUE" || e == "iGREEN2BLUE" ? o = ["rgb(51, 153, 51)", "rgb(51, 153, 200)", "rgb(51, 51, 255)"] : e == "HEAT" || e == "iHEAT" ? o = ["rgb(255, 51, 51)", "rgb(255, 255, 51)", "rgb(51, 153, 51)", "rgb(51, 153, 255)"] : e == "GREEN:INTENSITY" || e == "iGREEN:INTENSITY" ? (o = ["rgb(51, 153, 51)", "rgb(170, 250, 170)"], s = Ai) : e == "ANDROID" || e == "iANDROID" ? o = ["#0099CC", "#9933CC", "#CC0000", "#FF8800", "#669900"] : (e == "ANDROID:LIGHT" || e == "iANDROID:LIGHT") && (o = ["#33B5E5", "#AA66CC", "#ff4444", "#ffbb33", "#99cc00"]), e.charAt(0) == "i" && (o = o.reverse());
    var i, a = o[0] == o[o.length - 1], i = s(o, t + (a ? 1 : 0));
    return n ? i.map(function(r, l) {
      var d = ce.color(r);
      return d.opacity = n, d.formatRgb();
    }) : i;
  }
}
function Ni(e, t) {
  return Tt(e, t, function(n, o, s, a, i) {
    return ce.interpolateHsl(s, a)(n);
  });
}
function Ai(e, t) {
  return Tt(e, t, function(n, o, s, a, i) {
    return ce.interpolateRgb(s, a)(n);
  });
}
function Ui(e, t) {
  return Tt(e, t, function(n, o, s, a, i) {
    var r = { r: null, g: null, b: null }, l = o ? ce.rgb(o) : r, d = ce.rgb(s), u = ce.rgb(a), p = i ? ce.rgb(i) : r, h = Math.max(Math.min(Math.round($t(n, l.r, d.r, u.r, p.r)), 255), 0), g = Math.max(Math.min(Math.round($t(n, l.g, d.g, u.g, p.g)), 255), 0), c = Math.max(Math.min(Math.round($t(n, l.b, d.b, u.b, p.b)), 255), 0);
    return ce.rgb(h, g, c);
  });
}
function Tt(e, t, n) {
  if (t == 1)
    return [e[0]];
  for (var o = 0, s = new Array(), a = e.length, i = 0; (a - 1) % (t - 1) != 0 && i < 20; )
    i++, a = e.length + i * (e.length - 1);
  i++;
  for (var r = 0; r < e.length - 1; r++) {
    for (var l = r - 1 >= 0 ? e[r - 1] : null, d = e[r], u = e[r + 1], p = r + 2 < e.length ? e[r + 2] : null, h = o; h < i + 1; h++) {
      var g = n(h / i, l, d, u, p);
      s.push(g);
    }
    o = 1;
  }
  for (var c = new Array(), r = 0; r < t; r++) {
    var f = (s.length - 1) / (t - 1) * r;
    c.push(s[f]);
  }
  return c;
}
function $t(e, t, n, o, s) {
  var a = o - n, i = t ?? n - a, r = s ?? o + a;
  return 0.5 * (2 * n + (-i + o) * e + (2 * i - 5 * n + 4 * o - r) * e * e + (-i + 3 * n - 3 * o + r) * e * e * e);
}
const Bi = {
  id: "verticalLineTooltipPlugin",
  afterDraw: (e) => {
    var t, n;
    if ((n = (t = e.tooltip) == null ? void 0 : t._active) != null && n.length) {
      const { x: o } = e.tooltip._active[0].element, s = e.scales.y, { ctx: a } = e;
      a.save(), a.beginPath(), a.moveTo(o, s.top), a.lineTo(o, s.bottom), a.lineWidth = 2, a.strokeStyle = "rgba(50, 50, 50, 0.4)", a.stroke(), a.restore();
    }
  }
}, Ii = {
  id: "verticalLinePlugin",
  getLinePositionAtIndex: function(e, t) {
    return e.getDatasetMeta(0).data[t].x;
  },
  getLinePositionAtX: function(e, t) {
    return e.scales.x.getPixelForValue(t, 0);
  },
  renderVerticalLine: function(e, t) {
    const n = e.scales.y, o = e.ctx, s = t.x ? this.getLinePositionAtX(e, t.x) : getLinePositionAtIndex(chart, t.idx);
    o.beginPath(), o.strokeStyle = t.color ? t.color : "#ff0000", o.moveTo(s, n.top), o.lineTo(s, n.bottom), o.stroke(), o.fillStyle = t.color ? t.color : "#ff0000", o.textAlign = "center", typeof t.label == "function" ? o.fillText(t.label(), s, n.top - 8) : o.fillText(t.label ? t.label : "", s, n.top - 8);
  },
  afterDatasetsDraw: function(e, t) {
    e.config.options.vLineAt && e.config.options.vLineAt.forEach((n) => this.renderVerticalLine(e, n));
  }
}, ji = {
  props: {
    title: { type: String },
    type: { type: String, required: !0 },
    datas: { type: Object },
    dataSeriesTranslator: { type: Function },
    queryUrl: { type: String },
    queryClusteredMeasure: { type: Object },
    queryMeasures: { type: Array },
    queryDataFilter: { type: Object },
    queryTimeFilter: { type: Object },
    queryGroupBy: { type: String },
    colors: { type: String, default: "DEFAULT" },
    labels: { type: Object, required: !0 },
    minTime: { type: String },
    maxTime: { type: String },
    fillGapDim: { type: String },
    fillGapValue: { type: Number },
    timeFormat: { type: String, default: "DD/MM/YYYY HH:mm" },
    verticalLines: { type: Array },
    /** {x, label, color} */
    additionalOptions: { type: Object }
  },
  created: function() {
    this.$data.graphChartId = "graphChartId_" + this.hashCode(this.type + "_" + JSON.stringify(this.labels)), window.dashboardGraphChart || (window.dashboardGraphChart = {});
  },
  mounted: function() {
    if (this.queryUrl)
      this.fetchData();
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
  methods: {
    hashCode: function(e) {
      let t;
      for (let n = 0; n < e.length; n++)
        t = Math.imul(31, t) + e.charCodeAt(n) | 0;
      return t;
    },
    fetchData: function() {
      var e = this.buildQuery();
      this.$http.post(this.queryUrl, e).then((function(t) {
        var n = this.$data.graphDataSeriesTranslator(t.data);
        this.showChartJsChart(n.dataValues, n.dataMetrics, n.timedSeries, this.queryGroupBy, this.labels, this.colors, this.title, this.additionalOptions);
      }).bind(this));
    },
    buildQuery: function() {
      var e = { dataFilter: this.queryDataFilter, timeFilter: this.queryTimeFilter };
      return this.queryMeasures && (e.measures = this.queryMeasures), this.queryClusteredMeasure && (e.clusteredMeasure = this.queryClusteredMeasure), this.queryGroupBy && (e.groupBy = this.queryGroupBy), e;
    },
    showChartJsChart: function(e, t, n, o, s, a, i, r) {
      var l = this.timeDimToDayJsPeriod();
      if (this.fillGapDim && this.minTime && this.maxTime && l !== "hour") {
        var d = dayjs(this.minTime, this.timeFormat).startOf(l), u = dayjs(this.maxTime, this.timeFormat).startOf(l), p = dayjs(this.minTime, this.timeFormat).endOf(l);
        p.isAfter(u) && (u = p), this.$data.truncatedMinTime = d.add(d.utcOffset(), "minute").valueOf(), this.$data.truncatedMaxTime = u.add(u.utcOffset(), "minute").valueOf();
      } else
        this.$data.truncatedMinTime = this.minTime ? dayjs(this.minTime, this.timeFormat).valueOf() : null, this.$data.truncatedMaxTime = this.maxTime ? dayjs(this.maxTime, this.timeFormat).valueOf() : null;
      var h = Object.values(s), g, c, f;
      if (this.type === "bubbles") {
        f = "bubble";
        var m = s.filter(($) => $ !== o);
        h = Object.values(m);
        var w = this.toChartJsBubblesData(e, m.keys(), m, o);
        c = [{ data: w }], g = this.getChartJsBubblesOptions(e, m.keys(), o, m, i, r), this.setChartJsColorOptions(c, a, 1, 0.5);
      } else if (this.type === "linechart")
        f = "line", c = this.toChartJsData(e, s, n, o), g = this.getChartJsLineOptions(e, o, s, n, i, r), this.setChartJsColorOptions(c, a);
      else if (this.type === "barchart")
        f = "bar", c = this.toChartJsData(e, s, n, o), g = this.getChartJsLineOptions(e, o, s, n, i, r), this.setChartJsColorOptions(c, a, 1, 0.5);
      else if (this.type === "stackedbarchart")
        f = "bar", c = this.toChartJsData(e, s, n, o), g = this.getStackedOptions(e, o, s, n, i, r), this.setChartJsColorOptions(c, a, 1, 0.5);
      else if (this.type === "polararea") {
        f = "polarArea", c = this.toChartJsData(e, s, n, o);
        var v = this.toChartJsPieData(c, s);
        c = v.datasets, h = v.labels, g = this.getPolarChartOptions(e, o, s, n, i, r), this.setChartJsPieColorOptions(c, a);
      } else if (this.type === "doughnut") {
        f = "doughnut";
        var m = s.filter((ue) => ue !== o);
        c = this.toChartJsData(e, m, n, o);
        var v = this.toChartJsPieData(c, s);
        c = v.datasets, h = v.labels, this.setChartJsPieColorOptions(c, a), g = {
          legend: {
            display: !0,
            position: "bottom"
          }
        };
      }
      var b = this.$.refs.graphCanvas, q = this.mergeDeep(g, r);
      if (window.dashboardGraphChart[this.$data.graphChartId]) {
        var k = window.dashboardGraphChart[this.$data.graphChartId];
        k.data.datasets = c, this.hashCode(JSON.stringify(k.options.scales)) !== this.hashCode(JSON.stringify(q.scales)) && (k.options.scales = q.scales), k.update("none");
      } else {
        let $ = {
          datasets: c
        };
        n || ($.labels = h);
        var k = new Chart(b, {
          type: f,
          data: $,
          options: q,
          plugins: [Bi, Ii]
        });
        window.dashboardGraphChart[this.$data.graphChartId] = k;
      }
    },
    setChartJsColorOptions: function(e, t, n, o) {
      if (t)
        for (var s = _t(t, e.length, n), a = _t(t, e.length, o || (n ? n * 0.25 : 0.25)), i = 0; i < e.length; i++)
          e[i].borderColor = s[i], e[i].backgroundColor = a[i], e[i].pointBackgroundColor = s[i], e[i].pointBorderColor = "#FFFFFFAF", e[i].pointBorderWidth = 2, e[i].fill = !0;
    },
    setChartJsPieColorOptions: function(e, t, n) {
      if (t)
        for (var o = 0; o < e.length; o++)
          e[o].backgroundColor = _t(t, e[o].data.length, n);
    },
    getChartJsBubblesOptions: function(e, t, n, o, s, a) {
      var i = this.getMaxRadius(e, t[2]), r = this.getAxisType(e, a, "xAxisType", t[0]), l = this.getAxisType(e, a, "yAxisType", t[1]);
      return {
        scales: {
          x: {
            type: r
          },
          y: {
            type: l
          }
        },
        elements: {
          point: {
            radius: function(d) {
              var u = d.dataIndex, p = d.dataset.data[u], h = d.chart.width, g = p.r_measure / i;
              return h / 24 * g;
            }
          }
        },
        legend: {
          display: !1
        },
        plugins: {
          tooltip: {
            displayColors: !1,
            callbacks: {
              title: function(d) {
                var u = d[0];
                return u.dataset.data[u.dataIndex].name;
              },
              label: function(d) {
                var u = d.dataset.data[d.dataIndex];
                return [
                  o[t[0]] + " : " + Math.round(u.x),
                  o[t[1]] + " : " + Math.round(u.y),
                  o[t[2]] + " : " + Math.round(u.r_measure)
                ];
              }
            }
          }
        }
      };
    },
    getPolarChartOptions: function(e, t, n, o, s) {
      return {};
    },
    getAxisType: function(e, t, n, o) {
      var s = "linear";
      if (t && t[n])
        if (t[n] === "auto") {
          var a = getMinMax(e, o);
          a.max > 0 && a.min / a.max < 1e-3 && (s = "logarithmic");
        } else
          s = t[n];
      return s;
    },
    getChartJsLineOptions: function(e, t, n, o, s, a) {
      var i = {
        scales: {
          y: {
            ticks: {
              beginAtZero: !0
            },
            suggestedMin: 0,
            suggestedMax: 5
          }
        },
        plugins: {
          title: {
            display: !!s,
            text: s || "",
            align: "start",
            padding: 20,
            font: { size: 14, weight: "bold" }
          },
          legend: {
            position: "bottom"
          },
          tooltip: {
            mode: "index",
            position: "nearest",
            boxPadding: 3,
            backgroundColor: "#F8F8F8D0",
            titleColor: "#000",
            bodyColor: "#000",
            borderColor: "#333",
            borderWidth: 1
            /*callbacks: {
            	label: function(graph) {
            		var point = graph.dataset.data[graph.dataIndex];
            		return graph.dataset.label +" : "+ Math.floor(point.y);
            	},
            	title: function(graphs) {
            		return timeFormatter;
            	}
            }*/
          }
        },
        elements: {
          point: {
            radius: 3,
            hoverRadius: 6
          },
          line: {
            tension: 0
          },
          bar: {
            borderWidth: 3
          }
        }
      };
      return o ? (i.scales.x = {
        type: "time",
        ticks: {
          source: "auto",
          major: {
            enabled: !0
          }
        },
        time: {
          displayFormats: {
            hour: "HH:mm",
            minute: "HH:mm"
          },
          tooltipFormat: this.timeFormat + " Z"
        }
      }, this.$data.truncatedMinTime && (i.scales.x.suggestedMin = this.$data.truncatedMinTime), this.$data.truncatedMaxTime && (i.scales.x.suggestedMax = this.$data.truncatedMaxTime)) : i.scales.x = {
        type: "category"
      }, i;
    },
    getStackedOptions: function(e, t, n, o, s, a) {
      var i = this.getChartJsLineOptions(e, t, n, o, s, a), r = {
        scales: {
          x: {
            stacked: !0
          },
          y: {
            stacked: !0
          }
        }
      };
      return this.mergeDeep(i, r);
    },
    toChartJsBubblesData: function(e, t, n, o) {
      for (var s = new Array(), a = 0; a < e.length; a++) {
        var i = new Object();
        i.x = e[a].values[t[0]], i.y = e[a].values[t[1]];
        var r = e[a].values[t[2]];
        !this.isEmpty(e[a].values) && !r && (r = 0), i.name = e[a].values[o], i.r_measure = r, s.push(i);
      }
      return s;
    },
    getMaxRadius: function(e, t) {
      for (var n = 0, o = 0; o < e.length; o++) {
        var s = e[o].values[t];
        s > n && (n = s);
      }
      return Math.max(n, 1);
    },
    getMinMax: function(e, t) {
      for (var n = 0, o = 0, s = 0; s < e.length; s++) {
        var a = e[s].values[t];
        a > o && (o = a), a < n && (n = a);
      }
      return {
        min: n,
        max: o
      };
    },
    defaultDataSeriesTranslator: function(e) {
      var t = e.timedDataSeries ? e.timedDataSeries : e.tabularDataSeries, n = e.seriesNames;
      return { dataValues: t, dataMetrics: n, timedSeries: !!e.timedDataSeries };
    },
    /** Conversion de données servers List<Instant, Map<NomMetric, value>> en données Chartjs.*/
    toChartJsData: function(e, t, n, o) {
      let s = function(m, w) {
        return m.indexOf(w, m.length - w.length) !== -1;
      };
      var a = this.timeDimToDayJsPeriod(), i = new Array();
      for (const m in t) {
        var r = new Object();
        r.data = new Array(), r.parsing = !1, t && t[m] && (r.label = t[m]);
        for (var l = this.$data.truncatedMinTime ? dayjs(this.$data.truncatedMinTime).subtract(1, a) : null, d = 0; d < e.length; d++) {
          if (n && this.fillGapDim)
            for (var u = l ? dayjs(l).add(1, a) : null, p = l ? u.add(1, a) : null, h = dayjs(e[d].time); !h.isBefore(p); )
              r.data.push({ x: u.valueOf(), y: this.fillGapValue }), u = p, p = p.add(1, a), l = u.valueOf();
          var g = n ? dayjs(e[d].time).valueOf() : e[d].values[o], c = e[d].values[m];
          !this.isEmpty(e[d].values) && !c && (c = 0), r.data.push({ x: g, y: c }), l = g;
        }
        if (n && this.fillGapDim && this.$data.truncatedMaxTime)
          for (var u = l ? dayjs(l).add(1, a) : null, f = dayjs(this.$data.truncatedMaxTime); !u.isAfter(f); )
            r.data.push({ x: u.valueOf(), y: this.fillGapValue }), u = u.add(1, a), l = u.valueOf();
        r.label || (s(m, "count") ? r.label = "Quantité" : s(m, "mean") ? r.label = "Moyenne" : s(m, "min") ? r.label = "Minimum" : s(m, "max") && (r.label = "Maximum")), i.push(r);
      }
      return i;
    },
    toChartJsPieData: function(e, t) {
      for (var n = new Array(), o = new Array(), s = 0; s < e[0].data.length; s++) {
        var a = e[0].data[s].x;
        t && t[e[0].data[s].x] && (a = t[e[0].data[s].x]), o.push(a), n.push(e[0].data[s].y);
      }
      return {
        datasets: [{ data: n }],
        labels: o
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
      const n = t.shift();
      if (this.isObject(e) && this.isObject(n))
        for (const o in n)
          this.isObject(n[o]) ? (e[o] || Object.assign(e, { [o]: {} }), this.mergeDeep(e[o], n[o])) : Object.assign(e, { [o]: n[o] });
      return this.mergeDeep(e, ...t);
    }
  }
}, zi = window.Vue.openBlock, Ri = window.Vue.createElementBlock, Hi = { ref: "graphCanvas" };
function Gi(e, t, n, o, s, a) {
  return zi(), Ri("canvas", Hi, null, 512);
}
const Ji = /* @__PURE__ */ M(ji, [["render", Gi]]), Yi = {
  mounted: function(e, t, n) {
    var o = t.value;
    if (!window.watcherUpdates && (window.watcherUpdates = {
      originalDocumentTitle: document.title,
      updates_detected: !1,
      acceptedUpdates: function() {
        window.watcherUpdates.updates_detected = !1, document.title = window.watcherUpdates.originalDocumentTitle;
      },
      beforeWindowUnload: function(i) {
        window.watcherUpdates.updates_detected && (i.preventDefault(), i.returnValue = `Voulez-vous quitter cette page ? 
 Les modifications que vous avez apportées ne seront peut-être pas enregistrées`);
      }
    }, window.addEventListener("beforeunload", window.watcherUpdates.beforeWindowUnload), t.instance.$root.uiMessageStack)) {
      var s = t.instance.$root.uiMessageStack, a = s.globalErrors.length > 0;
      for (let i of o.split(","))
        if (a = a || s.objectFieldErrors[i], a)
          break;
      a && (window.watcherUpdates.updates_detected = !0);
    }
    e.addEventListener("click", window.watcherUpdates.acceptedUpdates);
    for (let i of o.split(","))
      t.instance.$root.$watch("vueData." + i, function() {
        window.watcherUpdates.updates_detected = !0, document.title = "*" + window.watcherUpdates.originalDocumentTitle;
      }, { deep: !0 });
  },
  unmounted: function() {
    window.removeEventListener("beforeunload", window.watcherUpdates.beforeWindowUnload);
  }
}, Wi = {
  mounted: function(e, t, n) {
    var o = t.value;
    o && !window.autofocus && (window.autofocus = !0, e.focus());
  }
}, Xi = window.Vue.nextTick, Ki = {
  updated: function(e, t, n) {
    Xi(() => {
      !window.watcherUpdates || !window.watcherUpdates.updates_detected ? e.classList.add("hidden") : e.classList.remove("hidden");
    });
  }
};
function $n(e, t = 250) {
  let n = !1, o;
  return function() {
    return n === !1 && (n = !0, setTimeout(() => {
      n = !1;
    }, t), o = e.apply(this, arguments)), o;
  };
}
const ge = window.Vue, Qi = {
  created: function(e, t) {
    const n = t.value ? t.value.topOffset : null, o = t.value ? t.value.topOffsetEl : null, s = t.value ? t.value.leftOffset : null, a = t.value ? t.value.leftOffsetEl : null, i = t.value ? t.value.scrollContainerEl : ".q-page-container", r = e.querySelector(".mini");
    for (var l = 0; l < e.childNodes.length; l++) {
      var d = e.childNodes[l];
      d.classList && !d.classList.contains("mini") && d.classList.add("not-mini");
    }
    ge.minifyHandler = function() {
      var u = e.closest(i), p = u ? -u.getBoundingClientRect().y : window.pageYOffset, h = u ? -u.getBoundingClientRect().x : window.pageXOffset, g = e.getBoundingClientRect().y + p, c = e.getBoundingClientRect().x + h;
      (n || o) && (g = ge.minifyComputeOffset(n, o, 0, "TOP")), (s || a) && (c = ge.minifyComputeOffset(s, a, 0, "LEFT"));
      var f = r.getBoundingClientRect().height, m = e.getBoundingClientRect().height;
      p > m - f ? (r.classList.add("visible"), r.style.top = g + "px", r.style.left = c + "px") : (r.classList.remove("visible"), r.style.top = -f - g + "px");
    }, ge.minifyComputeOffset = function(u, p, h, g) {
      var c = h;
      if (u)
        c = u;
      else if (p) {
        var f = document.querySelector(p), m = f.getBoundingClientRect();
        g === "LEFT" ? c = m.width + m.x : g === "TOP" && (c = m.height + m.y);
      }
      return c;
    }, window.addEventListener("scroll", ge.minifyHandler), window.addEventListener("resize", $n(ge.minifyHandler, 50));
  },
  updated: function() {
    setTimeout(ge.minifyHandler, 50);
  },
  unmounted: function(e) {
    window.removeEventListener("scroll"), window.removeEventListener("resize");
    for (var t = 0; t < e.childNodes.length; t++) {
      var n = e.childNodes[t];
      n.classList && n.classList.remove("not-mini");
    }
  }
}, Zi = [null, document, document.body, document.scrollingElement, document.documentElement];
function es(e, t) {
  let n = rs(t);
  if (n === void 0) {
    if (e == null)
      return window;
    n = e.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return Zi.includes(n) ? window : n;
}
function ts(e) {
  return (e === window ? document.body : e).scrollHeight;
}
function ns(e) {
  return (e === window ? document.body : e).scrollWidth;
}
function Cn(e) {
  return e === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : e.scrollTop;
}
function xn(e) {
  return e === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : e.scrollLeft;
}
function Ot(e, t, n = 0) {
  const o = arguments[3] === void 0 ? performance.now() : arguments[3], s = Cn(e);
  if (n <= 0) {
    s !== t && Vt(e, t);
    return;
  }
  requestAnimationFrame((a) => {
    const i = a - o, r = s + (t - s) / Math.max(i, n) * i;
    Vt(e, r), r !== t && Ot(e, t, n - i, a);
  });
}
function Mt(e, t, n = 0) {
  const o = arguments[3] === void 0 ? performance.now() : arguments[3], s = xn(e);
  if (n <= 0) {
    s !== t && Dt(e, t);
    return;
  }
  requestAnimationFrame((a) => {
    const i = a - o, r = s + (t - s) / Math.max(i, n) * i;
    Dt(e, r), r !== t && Mt(e, t, n - i, a);
  });
}
function Vt(e, t) {
  if (e === window) {
    window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, t);
    return;
  }
  e.scrollTop = t;
}
function Dt(e, t) {
  if (e === window) {
    window.scrollTo(t, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    return;
  }
  e.scrollLeft = t;
}
function os(e, t, n) {
  if (n) {
    Ot(e, t, n);
    return;
  }
  Vt(e, t);
}
function as(e, t, n) {
  if (n) {
    Mt(e, t, n);
    return;
  }
  Dt(e, t);
}
let at;
function is() {
  if (at !== void 0)
    return at;
  const e = document.createElement("p"), t = document.createElement("div");
  hn(e, {
    width: "100%",
    height: "200px"
  }), hn(t, {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
    width: "200px",
    height: "150px",
    overflow: "hidden"
  }), t.appendChild(e), document.body.appendChild(t);
  const n = e.offsetWidth;
  t.style.overflow = "scroll";
  let o = e.offsetWidth;
  return n === o && (o = t.clientWidth), t.remove(), at = n - o, at;
}
function ss(e, t = !0) {
  return !e || e.nodeType !== Node.ELEMENT_NODE ? !1 : t ? e.scrollHeight > e.clientHeight && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-y"])) : e.scrollWidth > e.clientWidth && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-x"]));
}
function rs(e) {
  if (e == null)
    return;
  if (typeof e == "string")
    try {
      return document.querySelector(e) || void 0;
    } catch {
      return;
    }
  const t = unref(e);
  if (t)
    return t.$el || t;
}
function hn(e, t) {
  const n = e.style;
  for (const o in t)
    n[o] = t[o];
}
const Se = {
  getScrollTarget: es,
  getScrollHeight: ts,
  getScrollWidth: ns,
  getVerticalScrollPosition: Cn,
  getHorizontalScrollPosition: xn,
  animVerticalScrollTo: Ot,
  animHorizontalScrollTo: Mt,
  setVerticalScrollPosition: os,
  setHorizontalScrollPosition: as,
  getScrollbarWidth: is,
  hasScrollbar: ss
}, O = window.Vue, ls = {
  created: function(e, t) {
    O.createDebugLine = function(g, c, f, m) {
      let w = document.createElement("div");
      return w.style.position = c, w.style.top = f + "px", w.style.border = "none", w.style.borderTop = m + " solid 1px", w.style.width = "100%", w.style.zIndex = "10000", w.style.padding = "0px", w.style.lineHeight = "0px", w.style.fontSize = "12px", w.style.color = m, w.innerHTML = g, document.querySelector("body").appendChild(w), w;
    };
    const n = t.value.debug ? t.value.debug : !1, o = t.value.startingOffset ? t.value.startingOffset : 24, s = t.value.fixedPos ? t.value.fixedPos : 24, a = o - s, i = t.value.scanner ? t.value.scanner : s + 30, r = e.querySelectorAll("a");
    r[0].classList.add("active"), r[0].ariaCurrent = "step";
    const l = Se.getScrollTarget(document.querySelector(r[0].hash));
    let d = [], u, p;
    n && (u = O.createDebugLine("startLinear", "absolute", 0, "red"), p = O.createDebugLine("last", "absolute", 0, "red")), O.scrollSpyHandler = function() {
      if (n) {
        for (var g = e, c = 0, f = 0; g && !isNaN(g.offsetLeft) && !isNaN(g.offsetTop); )
          c += g.offsetLeft - g.scrollLeft, f += g.offsetTop - g.scrollTop, g = g.offsetParent;
        console.log("x: " + c), console.log("y: " + f + " (startingOffset)");
      }
      window.pageYOffset > a ? (e.style.top || (e.style.top = s + "px", e.classList.add("fixed")), e.style.width = e.parentElement.getBoundingClientRect().width + "px") : e.style.top && (e.classList.remove("fixed"), e.style.top = null, e.style.width = null);
      for (var m = Se.getVerticalScrollPosition(l), w = O.computeBreakPoints(m), v = 0; v < r.length; v++)
        w[v] <= m && (v >= r.length - 1 || m < w[v + 1]) ? (r[v].classList.add("active"), r[v].ariaCurrent = "step") : (r[v].classList.remove("active"), r[v].removeAttribute("aria-current"));
    }, O.computeBlockTop = function(g) {
      var c = [];
      for (let f = 0; f < r.length; f++) {
        const m = r[f].hash, w = document.querySelector(m);
        w && c.push(g + w.getBoundingClientRect().top);
      }
      return c;
    }, O.scrollTo = function(g) {
      g.preventDefault();
      const c = g.target.hash, f = document.querySelector(c);
      for (var m = Se.getVerticalScrollPosition(l) + f.getBoundingClientRect().top - i, w = Se.getVerticalScrollPosition(l), v = O.computeBlockTop(w), b = O.computeBreakPoints(w), q = 0; q < r.length; q++)
        if (r[q].hash == c) {
          v[q] - i < b[q + 1] || !b[q + 1] ? m = v[q] - i : m = b[q + 1] - 1;
          break;
        }
      var k = 200;
      Se.setVerticalScrollPosition(l, m, k);
    }, O.computeBreakPoints = function(g) {
      var c = O.computeBlockTop(g);
      const f = window.innerHeight || document.documentElement.clientHeight, m = Se.getScrollHeight(l), v = m - f;
      let b = v - f + i;
      for (let _ = 1; _ < r.length; _++)
        if (c[_] - i > b) {
          b = c[_] - i;
          break;
        }
      const q = v - b;
      var k = [];
      k.push(0);
      for (let _ = 1; _ < r.length; _++)
        c[_] - i > b ? k[_] = b + q * (c[_] - b) / (m - b) : k[_] = c[_] - i, k[_] = Math.round(k[_]);
      if (n) {
        for (let _ = 1; _ < r.length; _++) {
          var $;
          d.length < _ ? ($ = O.createDebugLine("navId#" + _, "absolute", 0, "red"), d.push($)) : $ = d[_ - 1], $.style.top = k[_] + i + "px";
        }
        u.style.top = b + i + "px", p.style.top = v + i + "px";
      }
      return k;
    }, e.classList.add("scroll-spy-nav");
    for (var h = 0; h < r.length; h++)
      r[h].addEventListener("click", O.scrollTo);
    window.addEventListener("scroll", O.scrollSpyHandler), window.addEventListener("resize", $n(O.scrollSpyHandler, 50));
  },
  unmounted: function(e) {
    e.classList.remove("scroll-spy-nav"), window.removeEventListener("scroll"), window.removeEventListener("resize");
    const t = e.querySelectorAll("a");
    for (var n = 0; n < t.length; n++)
      t.removeEventListener("click");
  }
};
function ds(e, t) {
  return new Date(e) - new Date(t);
}
function pn(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function mn(e) {
  return typeof e == "number" && isFinite(e);
}
var it = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function cs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var us = "Expected a function", gn = NaN, fs = "[object Symbol]", hs = /^\s+|\s+$/g, ps = /^[-+]0x[0-9a-f]+$/i, ms = /^0b[01]+$/i, gs = /^0o[0-7]+$/i, ws = parseInt, bs = typeof it == "object" && it && it.Object === Object && it, ys = typeof self == "object" && self && self.Object === Object && self, vs = bs || ys || Function("return this")(), _s = Object.prototype, $s = _s.toString, Cs = Math.max, xs = Math.min, Ct = function() {
  return vs.Date.now();
};
function Ss(e, t, n) {
  var o, s, a, i, r, l, d = 0, u = !1, p = !1, h = !0;
  if (typeof e != "function")
    throw new TypeError(us);
  t = wn(t) || 0, qt(n) && (u = !!n.leading, p = "maxWait" in n, a = p ? Cs(wn(n.maxWait) || 0, t) : a, h = "trailing" in n ? !!n.trailing : h);
  function g($) {
    var _ = o, ue = s;
    return o = s = void 0, d = $, i = e.apply(ue, _), i;
  }
  function c($) {
    return d = $, r = setTimeout(w, t), u ? g($) : i;
  }
  function f($) {
    var _ = $ - l, ue = $ - d, Lt = t - _;
    return p ? xs(Lt, a - ue) : Lt;
  }
  function m($) {
    var _ = $ - l, ue = $ - d;
    return l === void 0 || _ >= t || _ < 0 || p && ue >= a;
  }
  function w() {
    var $ = Ct();
    if (m($))
      return v($);
    r = setTimeout(w, f($));
  }
  function v($) {
    return r = void 0, h && o ? g($) : (o = s = void 0, i);
  }
  function b() {
    r !== void 0 && clearTimeout(r), d = 0, o = l = s = r = void 0;
  }
  function q() {
    return r === void 0 ? i : v(Ct());
  }
  function k() {
    var $ = Ct(), _ = m($);
    if (o = arguments, s = this, l = $, _) {
      if (r === void 0)
        return c(l);
      if (p)
        return r = setTimeout(w, t), g(l);
    }
    return r === void 0 && (r = setTimeout(w, t)), i;
  }
  return k.cancel = b, k.flush = q, k;
}
function qt(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function ks(e) {
  return !!e && typeof e == "object";
}
function Vs(e) {
  return typeof e == "symbol" || ks(e) && $s.call(e) == fs;
}
function wn(e) {
  if (typeof e == "number")
    return e;
  if (Vs(e))
    return gn;
  if (qt(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = qt(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(hs, "");
  var n = ms.test(e);
  return n || gs.test(e) ? ws(e.slice(2), n ? 2 : 8) : ps.test(e) ? gn : +e;
}
var Ds = Ss;
const bn = /* @__PURE__ */ cs(Ds), D = window.Quasar, xt = {
  debounce: bn,
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
      } else e.status === 403 ? t.message = this.$q.lang.vui.ajaxErrors.code403 : e.status === 404 ? t.message = this.$q.lang.vui.ajaxErrors.code404 : e.status === 405 ? t.message = this.$q.lang.vui.ajaxErrors.code405 : e.status === 422 ? (t.message = "", Object.keys(e.data).forEach((function(o) {
        this.$data.uiMessageStack[o] = e.data[o];
      }).bind(this))) : e.status >= 500 && (t.message = this.$q.lang.vui.ajaxErrors.code500);
      if (e.statusText && e.status !== 422 && (t.message = e.statusText), Object.prototype.hasOwnProperty.call(e, "data")) {
        if (Object.prototype.hasOwnProperty.call(e.data, "message") && e.data.message && e.data.message.length > 0)
          t.message = e.data.message;
        else if (Object.prototype.hasOwnProperty.call(e.data, "globalErrors") && e.data.globalErrors && e.data.globalErrors.length > 0) {
          var n = this.uiMessageStackToNotify(e.data);
          n.forEach((function(o) {
            this.$q.notify(o);
          }).bind(this)), t.message = "";
        }
      }
    }
    t.message.length > 0 && this.$q.notify(t);
  },
  uiMessageStackToNotify: function(e) {
    if (e) {
      var t = [];
      return Object.prototype.hasOwnProperty.call(e, "globalErrors") && e.globalErrors && e.globalErrors.length > 0 && e.globalErrors.forEach(function(n) {
        t.push({
          color: "negative",
          textColor: "white",
          message: n,
          multiLine: !0,
          timeout: 2500
        });
      }), Object.prototype.hasOwnProperty.call(e, "globalWarnings") && e.globalWarnings && e.globalWarnings.length > 0 && e.globalWarnings.forEach(function(n) {
        t.push({
          color: "warning",
          textColor: "black",
          message: n,
          multiLine: !0,
          timeout: 2500
        });
      }), Object.prototype.hasOwnProperty.call(e, "globalInfos") && e.globalInfos && e.globalInfos.length > 0 && e.globalInfos.forEach(function(n) {
        t.push({
          color: "info",
          textColor: "black",
          message: n,
          multiLine: !0,
          timeout: 2500
        });
      }), Object.prototype.hasOwnProperty.call(e, "globalSuccess") && e.globalSuccess && e.globalSuccess.length > 0 && e.globalSuccess.forEach(function(n) {
        t.push({
          color: "positive",
          textColor: "black",
          message: n,
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
  transformListForSelection: function(e, t, n, o, s) {
    let a = this.$data.vueData[e];
    if (o && (a = a.filter(o)), s != null && s.trim() !== "") {
      const i = this.unaccentLower(s);
      a = a.filter((r) => this.unaccentLower(r[n].toString()).indexOf(i) > -1), a.sort((r, l) => {
        const d = this.unaccentLower(r[n].toString()).startsWith(i), u = this.unaccentLower(l[n].toString()).startsWith(i);
        return d && !u ? -1 : !d && u ? 1 : 0;
      });
    }
    return a.map(function(i) {
      return { value: i[t], label: i[n].toString() };
    });
  },
  unaccentLower: function(e) {
    return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  },
  paginationAndSortHandler: function(e) {
    var t = e.pagination;
    let n = this.$data.componentStates, o = this.$data.vueData;
    var s = n[t.componentId].pagination;
    if ((s.sortBy != t.sortBy || s.descending != t.descending) && t.sortBy) {
      let a = n[t.componentId].columns.find((i) => i.name === t.sortBy);
      t.sortUrl ? (t.page = 1, this.$http.post(t.sortUrl, this.objectToFormData({ sortFieldName: a.field, sortDesc: t.descending, CTX: this.$data.vueData.CTX })).then((function(i) {
        o[t.listKey] = i.data.model[t.listKey], this.$data.vueData.CTX = i.data.model.CTX;
      }).bind(this))) : this.$refs[t.componentId].sortMethod.apply(this.$refs[t.componentId], [o[t.listKey], a.field, t.descending]);
    }
    n[t.componentId].pagination = t;
  },
  paginatedData: function(e, t) {
    var o = this.$data.componentStates[t].pagination;
    if (o.rowsPerPage != 0) {
      var s = (o.page - 1) * o.rowsPerPage, a = o.page * o.rowsPerPage;
      return this.$data.vueData[e].slice(s, a);
    }
    return this.$data.vueData[e];
  },
  createDefaultTableSort: function(e) {
    return this.$data.componentStates[e] ? (function(t, n, o) {
      let s = this.$data.componentStates[e].columns.find((a) => a.name === n);
      if (s.datetimeFormat) {
        const a = o === !0 ? -1 : 1, i = (r) => r[s.field];
        return t.sort((r, l) => {
          let d = i(r), u = i(l);
          return (D.date.extractDate(d, s.datetimeFormat).getTime() > D.date.extractDate(u, s.datetimeFormat).getTime() ? 1 : -1) * a;
        });
      } else
        return this.sortCiAi(t, s.field, o);
    }).bind(this) : this.sortCiAi;
  },
  sortCiAi: function(e, t, n) {
    const o = n === !0 ? -1 : 1, s = (i) => i[t], a = new Intl.Collator();
    return e.sort((i, r) => {
      let l = s(i), d = s(r);
      return l == null ? -1 * o : d == null ? 1 * o : mn(l) === !0 && mn(d) === !0 ? (l - d) * o : pn(l) === !0 && pn(d) === !0 ? ds(l, d) * o : typeof l == "boolean" && typeof d == "boolean" ? (l - d) * o : ([l, d] = [l, d].map((u) => (u + "").toLocaleString()), a.compare(l, d) * o);
    });
  },
  selectedFunction: function(e, t, n) {
    this.$data.vueData[e][t] = n.value;
  },
  searchAutocomplete: function(e, t, n, o, s, a, i, r, l) {
    if (i.length < a) {
      l();
      return;
    }
    this.$http.post(s, this.objectToFormData({ terms: i, list: e, valueField: t, labelField: n, CTX: this.$data.vueData.CTX })).then((function(d) {
      var u = d.data.map(function(p) {
        return { value: p[t], label: p[n].toString() };
      });
      r((function() {
        this.$data.componentStates[o].options = u;
      }).bind(this));
    }).bind(this)).catch(function(d) {
      this.$q.notify(d.response.status + ":" + d.response.statusText), r([]);
    });
  },
  loadAutocompleteById: function(e, t, n, o, s, a, i, r) {
    var l;
    r != null ? l = this.$data.vueData[a][r][i] : l = this.$data.vueData[a][i], Array.isArray(l) ? l.forEach((d) => this.loadMissingAutocompleteOption(e, t, n, o, s, d)) : this.loadMissingAutocompleteOption(e, t, n, o, s, l);
  },
  loadMissingAutocompleteOption: function(e, t, n, o, s, a) {
    !a || this.$data.componentStates[o].options.filter((function(i) {
      return i.value === a;
    }).bind(this)).length > 0 || (this.$data.componentStates[o].loading = !0, this.$http.post(s, this.objectToFormData({ value: a, list: e, valueField: t, labelField: n, CTX: this.$data.vueData.CTX })).then((function(i) {
      var r = i.data.map(function(l) {
        return { value: l[t], label: l[n].toString() };
      });
      this.$data.componentStates[o].options = this.$data.componentStates[o].options.concat(r);
    }).bind(this)).catch((function(i) {
      this.$q.notify(i.response.status + ":" + i.response.statusText);
    }).bind(this)).then((function() {
      this.$data.componentStates[o].loading = !1;
    }).bind(this)));
  },
  decodeDate: function(e, t) {
    return e === D.date.formatDate(D.date.extractDate(e, "YYYY-MM-DD"), "YYYY-MM-DD") ? D.date.formatDate(D.date.extractDate(e, "YYYY-MM-DD"), t) : e;
  },
  encodeDate: function(e, t) {
    return e === D.date.formatDate(D.date.extractDate(e, t), t) ? D.date.formatDate(D.date.extractDate(e, t), "YYYY-MM-DD") : e;
  },
  decodeDatetime: function(e, t) {
    return e === D.date.formatDate(D.date.extractDate(e, "YYYY-MM-DD[T]HH:mm"), "YYYY-MM-DD[T]HH:mm") ? D.date.formatDate(D.date.extractDate(e, "YYYY-MM-DD[T]HH:mm"), t) : e;
  },
  encodeDatetime: function(e, t) {
    return e === D.date.formatDate(D.date.extractDate(e, t), t) ? D.date.formatDate(D.date.extractDate(e, t), "YYYY-MM-DD[T]HH:mm") : e;
  },
  sortDatesAsString: function(e) {
    return function(t, n, o, s) {
      return D.date.extractDate(t, e).getTime() > D.date.extractDate(n, e).getTime() ? 1 : -1;
    };
  },
  goTo: function(e) {
    window.location = e;
  },
  openModal: function(e, t, n) {
    if (t) {
      var o = t;
      if (n && Object.keys(n).length > 0) {
        var s = Object.keys(n).map(function(a) {
          return a + "=" + n[a];
        }).join("&");
        o = o + "?" + s;
      }
      this.$data.componentStates[e].srcUrl = o;
    }
    this.$data.componentStates[e].opened = !0;
  },
  toogleFacet: function(e, t, n) {
    let o = this.$data.vueData;
    var s = !1;
    o[n + "_facets"].forEach(function(i) {
      i.code === e && (s = i.multiple);
    });
    var a = o[n + "_selectedFacets"][e];
    a ? a.includes(t) ? s ? a.splice(a.indexOf(t), 1) : a.splice(0) : a.push(t) : o[n + "_selectedFacets"][e] = [t], this.search(n);
  },
  search: bn(function(e, t = 1) {
    let n = this.$data.componentStates, o = this.$data.vueData;
    var s = e + "_selectedFacets", a = o[e + "_criteriaContextKey"], i = this.vueDataParams([a]);
    i.append(s, JSON.stringify(o[s]));
    var r = n[e + "Search"].searchUrl, l = n[e + "Search"].collectionComponentId;
    if (n[l].pagination && n[l].pagination.sortBy) {
      var d = n[l].pagination;
      let u = n[l].columns.find((p) => p.name === d.sortBy);
      u.field != null && i.append("sortFieldName", u.field), i.append("sortDesc", d.descending);
    }
    this.httpPostAjax(r, i, {
      onSuccess: function(u) {
        if (n[l].pagination) {
          var p = n[l].pagination;
          p.page = t, p.rowsNumber = u.data.model[e + "_list"].length;
        }
      }
    });
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
  obtainVueDataAccessor(e, t, n, o) {
    return n != null && n != "null" ? o != null ? {
      get: function() {
        return e.$data.vueData[t][o][n];
      },
      set: function(s) {
        e.$data.vueData[t][o][n] = s;
      }
    } : {
      get: function() {
        return e.$data.vueData[t][n];
      },
      set: function(s) {
        e.$data.vueData[t][n] = s;
      }
    } : {
      get: function() {
        return e.$data.vueData[t];
      },
      set: function(s) {
        e.$data.vueData[t] = s;
      }
    };
  },
  uploader_dragenter(e, t) {
    let n = this.$data.componentStates;
    n[e].dragover = !0;
  },
  uploader_dragover(e, t) {
    var n;
    (n = this.$refs[t]) != null && n.canAddFiles() || (e.dataTransfer.dropEffect = "none");
  },
  uploader_dragleave(e) {
    let t = this.$data.componentStates;
    t[e].dragover = !1;
  },
  uploader_drop(e, t) {
    var n = this.$refs[t];
    n.addFiles(e.dataTransfer.files);
  },
  modal_iframeLoad(e) {
    let t = e.dataset.componentId;
    e.dataset.autoHeight === "true" && (e.style.opacity = "0", this.modal_iframeAjustHeight(e)), this.componentStates[t].loading = !1, e.style.opacity = "1";
  },
  modal_iframeAjustHeight(e) {
    let t = e.dataset.componentId, n = e.contentDocument ? e.contentDocument : e.contentWindow.document;
    setTimeout((function() {
      let o = this.getDocHeight(n) + 4 + "px";
      e.style.height = "", this.componentStates[t].height = o;
    }).bind(this), 1);
  },
  getDocHeight: function(e) {
    e = e || document;
    let t = e.body, n = e.documentElement;
    return Math.max(
      t.scrollHeight,
      t.offsetHeight,
      n.scrollHeight,
      n.offsetHeight,
      n.clientHeight
    );
  },
  httpPostAjax: function(e, t, n) {
    var o = t ? Array.isArray(t) ? this.vueDataParams(t) : t : [];
    let s = this.$data.vueData, a = this.$data.uiMessageStack, i = this.isFormData(o) ? o : this.objectToFormData(o);
    i.append("CTX", s.CTX), this.pushPendingAction(e), this.$http.post(e, i).then((function(r) {
      if (r.data.model.CTX && (s.CTX = r.data.model.CTX), Object.keys(r.data.model).forEach(function(d) {
        d != "CTX" && (s[d] = r.data.model[d]);
      }), n && n.notifyUiMessageStack) {
        var l = this.uiMessageStackToNotify(r.data.uiMessageStack);
        l.forEach((function(d) {
          this.$q.notify(d);
        }).bind(this));
      } else
        Object.keys(r.data.uiMessageStack).forEach(function(d) {
          a[d] = r.data.uiMessageStack[d];
        });
      n && n.onSuccess && n.onSuccess.call(this, r, window);
    }).bind(this)).catch(function(r) {
      n && n.onError && n.onError.call(this, r.response, window);
    }).finally((function() {
      this.removePendingAction(e);
    }).bind(this));
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
    setTimeout((function() {
      this.removePendingAction(e);
    }).bind(this), t);
  },
  hasFieldsError: function(e, t, n) {
    var i, r;
    const o = this.$data.uiMessageStack.objectFieldErrors, s = t.split("_")[0];
    if (o) {
      var a = n != null ? e + "[" + n + "]" : e;
      return ((r = (i = o == null ? void 0 : o[a]) == null ? void 0 : i[s]) == null ? void 0 : r.length) > 0;
    }
    return !1;
  },
  getErrorMessage: function(e, t, n) {
    const o = this.$data.uiMessageStack.objectFieldErrors, s = t.split("_")[0];
    if (o) {
      var a = n != null ? e + "[" + n + "]" : e;
      if (Object.prototype.hasOwnProperty.call(o, a) && o[a] && Object.prototype.hasOwnProperty.call(o[a], s))
        return o[a][s].join(", ");
    } else
      return "";
  },
  vueDataParams: function(e) {
    for (var t = new FormData(), n = 0; n < e.length; n++) {
      var o = e[n].split(".", 2), s = o[0], a = o[1], i = this.$data.vueData[s];
      i && typeof i == "object" && Array.isArray(i) === !1 ? a ? this._vueDataParamsKey(t, s, a, i) : Object.keys(i).forEach((function(r) {
        r.includes("_") || this._vueDataParamsKey(t, s, r, i);
      }).bind(this)) : i && Array.isArray(i) === !0 ? i.forEach((function(r, l) {
        a ? this._vueDataParamsKey(t, s + "][" + l, a, r) : Object.keys(r).forEach((function(d) {
          d.includes("_") || this._vueDataParamsKey(t, s + "][" + l, d, r);
        }).bind(this));
      }).bind(this)) : this.appendToFormData(t, "vContext[" + s + "]", i);
    }
    return t;
  },
  _vueDataParamsKey: function(e, t, n, o) {
    let s = o[n];
    Array.isArray(s) ? !s || s.length == 0 ? this.appendToFormData(e, "vContext[" + t + "][" + n + "]", "") : s.forEach((function(a, i) {
      s[i] && typeof s[i] == "object" ? this.appendToFormData(e, "vContext[" + t + "][" + n + "]", s[i]._v_inputValue) : this.appendToFormData(e, "vContext[" + t + "][" + n + "]", s[i]);
    }).bind(this)) : s && typeof s == "object" ? this.appendToFormData(e, "vContext[" + t + "][" + n + "]", s._v_inputValue) : this.appendToFormData(e, "vContext[" + t + "][" + n + "]", s);
  },
  objectToFormData: function(e) {
    const t = new FormData();
    return Object.keys(e).forEach((function(n) {
      this.appendToFormData(t, n, e[n]);
    }).bind(this)), t;
  },
  appendToFormData: function(e, t, n) {
    n != null ? e.append(t, n) : e.append(t, "");
  },
  isFormData: function(e) {
    return typeof FormData < "u" && e instanceof FormData;
  },
  /**
   * Capture the <CTL-V> paste event, only allow plain-text, no images.         *
   * see: https://stackoverflow.com/a/28213320         *
   * @param {object} evt - array of files
   * @author Daniel Thompson-Yvetot
   * @license MIT
   */
  pastePlainTextCapture(e, t) {
    if (e.target.nodeName === "INPUT") return;
    let n, o;
    e.preventDefault(), e.originalEvent && e.originalEvent.clipboardData.getData ? (n = e.originalEvent.clipboardData.getData("text/plain"), this.$refs[t].runCmd("insertText", n)) : e.clipboardData && e.clipboardData.getData ? (n = e.clipboardData.getData("text/plain"), this.$refs[t].runCmd("insertText", n)) : window.clipboardData && window.clipboardData.getData && (o || (o = !0, this.$refs[t].runCmd("ms-pasteTextOnly", n)), o = !1);
  },
  editorHandlerFixHelper(e, t, n, o, s, a) {
    if (a.hasParents(e, !0))
      if (s.runCmd("formatBlock", o), a.range.commonAncestorContainer.hasChildNodes()) {
        for (var r = !1, l = a.range.startContainer; l && l !== a.el && l.parentNode !== a.range.commonAncestorContainer; )
          l = l.parentNode;
        for (var d = a.range.endContainer; d && d !== a.el && d.parentNode !== a.range.commonAncestorContainer; )
          d = d.parentNode;
        a.range.commonAncestorContainer.childNodes.forEach(
          function(u) {
            u === l && (r = !0), r && (u.outerHTML = u.outerHTML.replace(t, "")), u === d && (r = !1);
          }
        );
      } else
        for (var i = a.selection.focusNode.parentNode; i && i !== a.el; )
          e.includes(i.nodeName.toLowerCase()) && (i.outerHTML = i.outerHTML.replace(t, "")), i = i.parentNode;
    else
      s.runCmd("formatBlock", n);
  },
  editorHandlerBlockquoteFix(e, t, n) {
    this.editorHandlerFixHelper(["blockquote"], /<\/?blockquote[^>]*\/?>/g, "blockquote", "div", t, n);
  },
  editorHandlerParagrapheFix(e, t, n) {
    this.editorHandlerFixHelper(["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9"], /<\/?h[1-9][^>]*\/?>/g, "div", "div", t, n);
  }
}, qs = {
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
    fileErrorTooBig: "Error : This file is too large",
    fileErrorUnknown: "Unknown error : This file cannot be uploaded",
    progress: "Progress",
    estimated: "Time remaining",
    unit_b: "B",
    unit_kb: "KB",
    unit_mb: "MB",
    unit_gb: "GB"
  },
  handles: {
    placeholder: "Enter a handle : format is type/code"
  }
}, Fs = {
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
    clear_all: "Annuler tous",
    remove: "Supprimer",
    add: "Ajouter un fichier",
    abort: "Annuler",
    download: "Télécharger",
    fileErrorTooBig: "Erreur : Le fichier est trop volumineux",
    fileErrorUnknown: "Erreur inconnue : Ce fichier ne peut pas être envoyé",
    progress: "Progression",
    estimated: "Temps restant",
    unit_b: "o",
    unit_kb: "Ko",
    unit_mb: "Mo",
    unit_gb: "Go"
  },
  handles: {
    placeholder: "Entrer un handle de la forme type/code"
  }
};
var Sn = {
  getBoundMethods: function(e, t) {
    let n = {};
    return Object.keys(t).forEach((o) => n[o] = t[o].bind(e)), n;
  },
  install: function(e, t) {
    if (e.component("v-chatbot", Un), e.component("v-commands", Xn), e.component("v-comments", oo), e.component("v-extensions-store", mo), e.component("v-facets", _o), e.component("v-geopoint-input", ko), e.component("v-handles", Po), e.component("v-json-editor", Go), e.component("v-notifications", Zo), e.component("v-map", da), e.component("v-map-layer", ya), e.component("v-tree", Fa), e.component("v-file-upload", Za), e.component("v-file-upload-quasar", yi), e.component("v-dashboard-chart", Ji), e.directive("alert-unsaved-updates", Yi), e.directive("autofocus", Wi), e.directive("if-unsaved-updates", Ki), e.directive("minify", Qi), e.directive("scroll-spy", ls), !t.axios) {
      console.error("You have to install axios");
      return;
    }
    e.axios = t.axios, e.$http = t.axios, Object.defineProperties(e.config.globalProperties, {
      axios: {
        get() {
          return t.axios;
        }
      },
      $http: {
        get() {
          return t.axios;
        }
      },
      $vui: {
        get() {
          return Sn.getBoundMethods(xt, xt);
        }
      }
    });
  },
  methods: xt,
  initData: function(e, t) {
    e.vueData = t.vueData, e.componentStates = t.componentStates, e.uiMessageStack = t.uiMessageStack, e.vuiLang = t.vuiLang;
  },
  lang: {
    enUS: qs,
    fr: Fs
  }
};
window && (window.VertigoUi = Sn);
export {
  Sn as default
};
//# sourceMappingURL=vertigo-ui.es.js.map
