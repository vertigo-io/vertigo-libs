const E = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, ln = {
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
          var a = n.title.substring(1);
          a === "textarea" && (this.inputConfig.modeTextarea = !0), a === "eval" && (this.inputConfig.showRating = !0), a === "keep_action" && (this.keepAction = !0), n.payload && (this.inputConfig.responsePattern = n.payload);
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
}, Vt = window.Vue.renderList, qt = window.Vue.Fragment, B = window.Vue.openBlock, Ae = window.Vue.createElementBlock, we = window.Vue.resolveComponent, ce = window.Vue.createVNode, ye = window.Vue.withCtx, ne = window.Vue.createBlock, ue = window.Vue.createCommentVNode, Dt = window.Vue.toDisplayString, X = window.Vue.createElementVNode, dn = window.Vue.withKeys, cn = { class: "bot" }, un = { class: "q-pr-md" }, fn = { class: "sys-chat" }, hn = { class: "q-pb-sm" }, pn = { class: "sys-chat non-selectable" }, mn = { class: "text-blue-2 q-caption" }, gn = { class: "row docs-btn" }, bn = { class: "message-processing sys-chat non-selectable" }, wn = { class: "non-selectable" }, yn = { class: "message-response row docs-btn q-pl-sm non-selectable" };
function vn(e, t, n, a, s, o) {
  const i = we("q-rating"), r = we("q-chat-message"), l = we("q-btn"), d = we("q-spinner-dots"), u = we("q-scroll-area"), p = we("q-input");
  return B(), Ae("div", cn, [
    ce(u, {
      class: "bg-grey-2 col-grow row q-pa-sm",
      ref: "scroller"
    }, {
      default: ye(() => [
        X("div", un, [
          (B(!0), Ae(qt, null, Vt(e.messages, (f, h) => (B(), Ae("div", { key: h }, [
            f.rating ? (B(), ne(r, {
              class: "animate-fade",
              key: "msgRating-" + h,
              sent: f.sent,
              "bg-color": f.bgColor,
              avatar: f.avatar
            }, {
              default: ye(() => [
                ce(i, {
                  modelValue: f.rating,
                  "onUpdate:modelValue": (c) => f.rating = c,
                  max: 5,
                  style: { "font-size": "2rem" },
                  readonly: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1032, ["sent", "bg-color", "avatar"])) : ue("", !0),
            f.text ? (B(), ne(r, {
              class: "animate-fade",
              key: "msg-" + h,
              label: f.label,
              sent: f.sent,
              "text-color": f.textColor,
              "bg-color": f.bgColor,
              name: f.name,
              avatar: f.avatar,
              text: f.text,
              stamp: f.stamp
            }, null, 8, ["label", "sent", "text-color", "bg-color", "name", "avatar", "text", "stamp"])) : ue("", !0)
          ]))), 128)),
          X("div", fn, [
            e.error ? (B(), ne(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "orange-4",
              "text-color": "black",
              size: "12"
            }, {
              default: ye(() => [
                X("div", hn, Dt(e.$q.lang.vui.chatbot.errorMessage), 1),
                ce(l, {
                  class: "full-width",
                  onClick: t[0] || (t[0] = (f) => o.askBot(e.lastPayload)),
                  label: e.$q.lang.vui.chatbot.tryAgain,
                  color: "white",
                  "text-color": "black"
                }, null, 8, ["label"])
              ]),
              _: 1
            })) : ue("", !0)
          ]),
          X("div", pn, [
            e.inputConfig.buttons.length > 0 ? (B(), ne(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "primary",
              size: "12"
            }, {
              default: ye(() => [
                X("div", mn, Dt(e.$q.lang.vui.suggestedAnswers), 1),
                X("div", gn, [
                  (B(!0), Ae(qt, null, Vt(e.inputConfig.buttons, (f, h) => (B(), ne(l, {
                    class: "full-width",
                    key: "repChatBtn-" + h,
                    onClick: (c) => o.postAnswerBtn(f),
                    label: f.title,
                    color: "white",
                    "text-color": "black"
                  }, null, 8, ["onClick", "label"]))), 128))
                ])
              ]),
              _: 1
            })) : ue("", !0)
          ]),
          X("div", bn, [
            e.processing ? (B(), ne(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "grey-4"
            }, {
              default: ye(() => [
                ce(d, { size: "2em" })
              ]),
              _: 1
            })) : ue("", !0)
          ]),
          X("div", wn, [
            e.inputConfig.showRating ? (B(), ne(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "primary",
              sent: ""
            }, {
              default: ye(() => [
                ce(i, {
                  modelValue: e.rating,
                  "onUpdate:modelValue": t[1] || (t[1] = (f) => e.rating = f),
                  max: 4,
                  style: { "font-size": "2rem" }
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })) : ue("", !0)
          ])
        ])
      ]),
      _: 1
    }, 512),
    X("div", yn, [
      ce(p, {
        type: e.inputConfig.modeTextarea ? "textarea" : "text",
        ref: "input",
        onKeyup: t[2] || (t[2] = dn((f) => e.inputConfig.modeTextarea || e.inputConfig.responseText.trim() === "" && e.inputConfig.rating === 0 ? !1 : o.postAnswerText(), ["enter"])),
        "max-height": 100,
        class: "col-grow",
        modelValue: e.inputConfig.responseText,
        "onUpdate:modelValue": t[3] || (t[3] = (f) => e.inputConfig.responseText = f),
        placeholder: e.$q.lang.vui.chatbot.inputPlaceholder,
        disable: e.processing || e.error,
        loading: e.processing
      }, null, 8, ["type", "modelValue", "placeholder", "disable", "loading"]),
      ce(l, {
        round: "",
        color: "primary",
        icon: "send",
        onClick: t[4] || (t[4] = (f) => o.postAnswerText()),
        disable: e.processing || e.inputConfig.responseText.trim() === "" && e.inputConfig.rating === 0
      }, null, 8, ["disable"]),
      n.devMode === !0 ? (B(), ne(l, {
        key: 0,
        round: "",
        color: "red",
        icon: "refresh",
        onClick: o.restart
      }, null, 8, ["onClick"])) : ue("", !0)
    ])
  ]);
}
const $n = /* @__PURE__ */ E(ln, [["render", vn]]), _n = {
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
      this.$http.post(this.baseUrl + "api/vertigo/commands/_search", { prefix: e }).then((function(a) {
        this.$data.commands = a.data, t((function() {
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
    autocompleteParam: function(e, t, n, a, s) {
      if (n.length < 1) {
        s();
        return;
      }
      this.$http.get(this.baseUrl + "api/vertigo/commands/params/_autocomplete", { params: { terms: n, entityClass: e.paramType.actualTypeArguments[0] } }).then((function(o) {
        a((function() {
          var i = this.$data.paramsAutocompleteOptions.slice();
          i[t] = o.data.map(function(r) {
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
}, Se = window.Vue.toDisplayString, A = window.Vue.openBlock, oe = window.Vue.createElementBlock, Ft = window.Vue.createCommentVNode, Le = window.Vue.resolveComponent, Et = window.Vue.withCtx, Ue = window.Vue.createBlock, Tt = window.Vue.createElementVNode, Cn = window.Vue.renderList, Ot = window.Vue.Fragment, ve = window.Vue.withKeys, rt = window.Vue.createVNode, xn = window.Vue.createTextVNode, Sn = {
  key: 0,
  style: { "line-height": "40px", opacity: "0.5", position: "fixed" }
}, kn = {
  class: "bg-grey-4 text-center vertical-middle text-bold q-px-md",
  style: { "line-height": "40px" }
}, Vn = {
  key: 0,
  class: "row col items-center q-py-xs"
}, qn = {
  key: 1,
  class: "col"
}, Dn = {
  key: 1,
  class: "row col items-center"
}, Fn = {
  class: "col shadow-2 bg-secondary text-white q-px-md",
  style: { "line-height": "40px" }
};
function En(e, t, n, a, s, o) {
  const i = Le("q-select"), r = Le("q-input"), l = Le("q-separator"), d = Le("q-btn");
  return A(), oe("div", null, [
    e.isCommandCommited ? (A(), oe("div", {
      key: 1,
      class: "row col-12 justify-between bg-white round-borders overflow-hidden shadow-2 text-black",
      onKeyup: t[0] || (t[0] = ve((...u) => o.executeCommand && o.executeCommand(...u), ["enter"]))
    }, [
      Tt("div", kn, Se(e.selectedCommand.commandName), 1),
      e.isExecuted ? (A(), oe("div", Dn, [
        Tt("div", Fn, Se(e.commandResult.display), 1),
        e.commandResult.targetUrl ? (A(), Ue(d, {
          key: 0,
          type: "a",
          href: n.baseUrl + e.commandResult.targetUrl,
          flat: ""
        }, {
          default: Et(() => [
            xn(Se(e.$q.lang.vui.commands.linkLabel), 1)
          ]),
          _: 1
        }, 8, ["href"])) : Ft("", !0),
        rt(d, {
          onClick: o.reset,
          flat: "",
          icon: "cancel",
          size: "sm",
          round: ""
        }, null, 8, ["onClick"])
      ])) : (A(), oe("div", Vn, [
        e.selectedCommand.commandParams && e.selectedCommand.commandParams.length > 0 ? (A(!0), oe(Ot, { key: 0 }, Cn(e.selectedCommand.commandParams, (u, p) => (A(), oe(Ot, { key: u }, [
          u.paramType.rawType === "io.vertigo.commons.command.GenericUID" ? (A(), Ue(i, {
            key: 0,
            class: "col q-px-xs",
            "use-chips": "",
            "bg-color": "white",
            dense: "",
            borderless: "",
            "use-input": "",
            "input-debounce": "300",
            value: o.getParamValue(p),
            options: e.paramsAutocompleteOptions[p],
            autofocus: p === 0,
            "dropdown-icon": "search",
            onKeydown: ve(function(f) {
              o.backIfNeeded(f, p === 0);
            }, ["delete"]),
            onKeyup: ve(function(f) {
              o.backIfNeeded(f, p === 0);
            }, ["esc"]),
            onFilter: (f) => o.autocompleteParam(u, p, e.val, e.update, e.abort),
            "onUpdate:modelValue": (f) => o.selectParam(e.newValue, p),
            style: { height: "32px" }
          }, null, 8, ["value", "options", "autofocus", "onKeydown", "onKeyup", "onFilter", "onUpdate:modelValue"])) : (A(), Ue(r, {
            key: 1,
            class: "col q-px-xs",
            color: "secondary",
            borderless: "",
            modelValue: e.commandParamsValues[p].value,
            "onUpdate:modelValue": (f) => e.commandParamsValues[p].value = f,
            onKeydown: ve((f) => o.backIfNeeded(e.event, p === 0), ["delete"]),
            onKeyup: [
              ve((f) => o.backIfNeeded(e.event, p === 0), ["esc"]),
              ve((f) => o.handleEnter(p), ["enter"])
            ],
            autofocus: p === 0,
            dense: "",
            style: { height: "32px" }
          }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown", "onKeyup", "autofocus"])),
          rt(l, { vertical: "" })
        ], 64))), 128)) : (A(), oe("div", qn, Se(e.$q.lang.vui.commands.executeCommand), 1)),
        rt(d, {
          onClick: o.executeCommand,
          flat: "",
          icon: "play_arrow",
          size: "sm",
          round: ""
        }, null, 8, ["onClick"])
      ]))
    ], 32)) : (A(), Ue(i, {
      key: 0,
      placeholder: e.$q.lang.vui.commands.globalPlaceholder,
      outlined: "",
      "bg-color": "white",
      dense: "",
      ref: "commandInput",
      autofocus: "",
      "dropdown-icon": "search",
      onBlur: o.reset,
      "use-input": "",
      "input-debounce": "300",
      "hide-selected": "",
      onKeydown: o.commitCommand,
      options: e.commandAutocompleteOptions,
      onFilter: o.searchCommands,
      "onUpdate:modelValue": o.selectCommand
    }, {
      default: Et(() => [
        e.text !== "" && e.selectedCommand.commandName && e.selectedCommand.commandName.startsWith(e.text) ? (A(), oe("span", Sn, Se(e.selectedCommand.commandName), 1)) : Ft("", !0)
      ]),
      _: 1
    }, 8, ["placeholder", "onBlur", "onKeydown", "options", "onFilter", "onUpdate:modelValue"]))
  ]);
}
const Tn = /* @__PURE__ */ E(_n, [["render", En]]), lt = window.Quasar, On = {
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
      let t = lt.date.getDateDiff(Date.now(), e, "days");
      return t > 0 ? t + " days" : (t = lt.date.getDateDiff(Date.now(), e, "hours"), t > 0 ? t + " hours" : (t = lt.date.getDateDiff(Date.now(), e, "minutes"), t > 0 ? t + " min" : "Now"));
    }
  }
}, ke = window.Vue.toDisplayString, Ie = window.Vue.createTextVNode, P = window.Vue.resolveComponent, k = window.Vue.withCtx, $e = window.Vue.openBlock, ze = window.Vue.createBlock, dt = window.Vue.createCommentVNode, x = window.Vue.createVNode, Mn = window.Vue.renderList, Pn = window.Vue.Fragment, Mt = window.Vue.createElementBlock, Pt = window.Vue.createElementVNode, Nn = window.Vue.normalizeClass, Bn = ["src"];
function An(e, t, n, a, s, o) {
  const i = P("q-badge"), r = P("q-btn"), l = P("big"), d = P("q-item-label"), u = P("q-input"), p = P("q-item-section"), f = P("q-item"), h = P("q-separator"), c = P("q-avatar"), m = P("q-icon"), g = P("q-popup-edit"), w = P("q-list"), v = P("q-drawer");
  return $e(), Mt("span", null, [
    x(r, {
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
      default: k(() => [
        e.count > 0 ? ($e(), ze(i, {
          key: 0,
          floating: "",
          small: "",
          color: "red",
          style: { right: "-.4em", top: "-.4em" }
        }, {
          default: k(() => [
            Ie(ke(e.count), 1)
          ]),
          _: 1
        })) : dt("", !0)
      ]),
      _: 1
    }, 8, ["flat", "color", "text-color", "icon", "title"]),
    x(v, {
      overlay: "",
      behavior: "mobile",
      width: 600,
      modelValue: e.commentDrawer,
      "onUpdate:modelValue": t[2] || (t[2] = (b) => e.commentDrawer = b),
      side: "right",
      style: { top: "58px" }
    }, {
      default: k(() => [
        x(w, null, {
          default: k(() => [
            x(d, { header: "" }, {
              default: k(() => [
                x(l, null, {
                  default: k(() => [
                    Ie(ke(e.$q.lang.vui.comments.title), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            x(f, null, {
              default: k(() => [
                x(p, null, {
                  default: k(() => [
                    x(u, {
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
                x(p, { side: "" }, {
                  default: k(() => [
                    x(r, {
                      color: "primary",
                      round: "",
                      icon: "send",
                      title: e.$q.lang.vui.comments.actionLabel,
                      "aria-label": e.$q.lang.vui.comments.actionLabel,
                      onClick: o.publishComment
                    }, null, 8, ["title", "aria-label", "onClick"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            x(h),
            ($e(!0), Mt(Pn, null, Mn(e.list, (b) => ($e(), ze(f, {
              key: b.uuid,
              class: Nn(["items-start", { "cursor-pointer": b.author == n.connectedAccount }])
            }, {
              default: k(() => [
                x(p, { avatar: "" }, {
                  default: k(() => [
                    x(c, null, {
                      default: k(() => [
                        Pt("img", {
                          src: n.baseUrl + "x/accounts/api/" + b.author + "/photo"
                        }, null, 8, Bn)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                x(p, null, {
                  default: k(() => [
                    x(d, null, {
                      default: k(() => [
                        Ie(ke(b.authorDisplayName), 1)
                      ]),
                      _: 2
                    }, 1024),
                    Pt("div", null, ke(b.msg), 1)
                  ]),
                  _: 2
                }, 1024),
                x(p, { side: "" }, {
                  default: k(() => [
                    x(d, { stamp: "" }, {
                      default: k(() => [
                        Ie(ke(o.toDelay(new Date(b.creationDate))), 1)
                      ]),
                      _: 2
                    }, 1024),
                    b.author == n.connectedAccount ? ($e(), ze(m, {
                      key: 0,
                      name: "edit"
                    })) : dt("", !0)
                  ]),
                  _: 2
                }, 1024),
                b.author == n.connectedAccount ? ($e(), ze(g, {
                  key: 0,
                  buttons: !0,
                  onSave: (S) => o.updateComment(b),
                  "label-cancel": e.$q.lang.vui.comments.cancel,
                  "label-set": e.$q.lang.vui.comments.save
                }, {
                  default: k(() => [
                    x(u, {
                      type: "textarea",
                      autogrow: "",
                      modelValue: b.msg,
                      "onUpdate:modelValue": (S) => b.msg = S,
                      dense: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 2
                }, 1032, ["onSave", "label-cancel", "label-set"])) : dt("", !0)
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
const Ln = /* @__PURE__ */ E(On, [["render", An]]), Un = {
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
}, In = window.Vue.renderList, zn = window.Vue.Fragment, ct = window.Vue.openBlock, ut = window.Vue.createElementBlock, Ve = window.Vue.resolveComponent, Rn = window.Vue.normalizeStyle, _e = window.Vue.createVNode, Re = window.Vue.withCtx, Nt = window.Vue.toDisplayString, Oe = window.Vue.createElementVNode, jn = { class: "row q-col-gutter-md" }, Hn = { class: "row col items-center" }, Gn = { class: "q-subheading text-bold" }, Jn = /* @__PURE__ */ Oe("div", { class: "col" }, null, -1), Yn = { class: "row col q-body-2 text-justify" };
function Qn(e, t, n, a, s, o) {
  const i = Ve("q-icon"), r = Ve("q-item-section"), l = Ve("q-toggle"), d = Ve("q-item"), u = Ve("q-card");
  return ct(), ut("div", jn, [
    (ct(!0), ut(zn, null, In(e.extensions, (p) => (ct(), ut("div", {
      class: "col-xs-12 col-lg-6 col-xl-4",
      key: p.name
    }, [
      _e(u, null, {
        default: Re(() => [
          _e(d, {
            class: "bg-white",
            style: { height: "100px" }
          }, {
            default: Re(() => [
              _e(r, { avatar: "" }, {
                default: Re(() => [
                  _e(i, {
                    name: p.icon,
                    size: "40px",
                    style: Rn(o.getIconStyle(p.color))
                  }, null, 8, ["name", "style"])
                ]),
                _: 2
              }, 1024),
              _e(r, null, {
                default: Re(() => [
                  Oe("div", Hn, [
                    Oe("div", Gn, Nt(p.label), 1),
                    Jn,
                    Oe("div", null, [
                      _e(l, {
                        disable: "",
                        readonly: "",
                        color: "positive",
                        modelValue: p.enabled,
                        "onUpdate:modelValue": (f) => p.enabled = f
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  Oe("div", Yn, Nt(p.description), 1)
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
const Xn = /* @__PURE__ */ E(Un, [["render", Qn]]), Kn = {
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
}, qe = window.Vue.renderList, Ce = window.Vue.Fragment, V = window.Vue.openBlock, K = window.Vue.createElementBlock, W = window.Vue.toDisplayString, ae = window.Vue.createTextVNode, fe = window.Vue.resolveComponent, T = window.Vue.withCtx, ie = window.Vue.createBlock, he = window.Vue.createCommentVNode, se = window.Vue.createVNode, Wn = { class: "facets" }, Zn = {
  key: 0,
  class: "selectedFacets q-pb-md"
};
function eo(e, t, n, a, s, o) {
  const i = fe("q-chip"), r = fe("q-item-label"), l = fe("q-checkbox"), d = fe("q-item-section"), u = fe("q-item"), p = fe("q-btn"), f = fe("q-list");
  return V(), K("div", Wn, [
    o.isAnyFacetValueSelected() ? (V(), K("div", Zn, [
      (V(!0), K(Ce, null, qe(n.selectedFacets, (h, c) => (V(), K("div", { key: c }, [
        o.facetMultipleByCode(c) ? he("", !0) : (V(!0), K(Ce, { key: 0 }, qe(h, (m) => (V(), ie(i, {
          clickable: "",
          class: "q-mb-sm",
          key: m.code,
          onClick: (g) => e.$emit("toogle-facet", c, m, n.contextKey),
          "icon-right": "cancel"
        }, {
          default: T(() => [
            ae(W(o.facetLabelByCode(c)) + ": " + W(o.facetValueLabelByCode(c, m)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]))), 128))
    ])) : he("", !0),
    (V(!0), K(Ce, null, qe(n.facets, (h) => (V(), ie(f, {
      key: h.code,
      class: "facetValues q-py-none",
      dense: ""
    }, {
      default: T(() => [
        h.multiple || !o.isFacetSelected(h.code) ? (V(), K(Ce, { key: 0 }, [
          se(r, { header: "" }, {
            default: T(() => [
              ae(W(h.label), 1)
            ]),
            _: 2
          }, 1024),
          (V(!0), K(Ce, null, qe(o.selectedInvisibleFacets(h.code), (c) => (V(), ie(u, {
            key: c.code,
            class: "facetValue q-ml-md",
            clickable: "",
            onClick: (m) => e.$emit("toogle-facet", h.code, c.code, n.contextKey)
          }, {
            default: T(() => [
              h.multiple ? (V(), ie(d, {
                key: 0,
                side: ""
              }, {
                default: T(() => [
                  se(l, {
                    dense: "",
                    modelValue: !0,
                    "onUpdate:modelValue": (m) => e.$emit("toogle-facet", h.code, c.code, n.contextKey)
                  }, null, 8, ["onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024)) : he("", !0),
              se(d, null, {
                default: T(() => [
                  ae(W(o.facetValueLabelByCode(h.code, c.code)), 1)
                ]),
                _: 2
              }, 1024),
              se(d, { side: "" }, {
                default: T(() => [
                  ae(W(c.count), 1)
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1032, ["onClick"]))), 128)),
          (V(!0), K(Ce, null, qe(o.visibleFacets(h.code, h.values), (c) => (V(), ie(u, {
            key: c.code,
            class: "facetValue q-ml-md",
            clickable: "",
            onClick: (m) => e.$emit("toogle-facet", h.code, c.code, n.contextKey)
          }, {
            default: T(() => [
              h.multiple ? (V(), ie(d, {
                key: 0,
                side: ""
              }, {
                default: T(() => [
                  se(l, {
                    dense: "",
                    modelValue: o.isFacetValueSelected(h.code, c.code),
                    "onUpdate:modelValue": (m) => e.$emit("toogle-facet", h.code, c.code, n.contextKey)
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024)) : he("", !0),
              se(d, null, {
                default: T(() => [
                  ae(W(o.facetValueLabelByCode(h.code, c.code)), 1)
                ]),
                _: 2
              }, 1024),
              se(d, { side: "" }, {
                default: T(() => [
                  ae(W(c.count), 1)
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1032, ["onClick"]))), 128)),
          se(u, null, {
            default: T(() => [
              h.values.length > n.maxValues && !o.isFacetExpanded(h.code) ? (V(), ie(p, {
                key: 0,
                flat: "",
                onClick: (c) => o.expandFacet(h.code),
                class: "q-ma-none"
              }, {
                default: T(() => [
                  ae(W(e.$q.lang.vui.facets.showAll), 1)
                ]),
                _: 2
              }, 1032, ["onClick"])) : he("", !0),
              h.values.length > n.maxValues && o.isFacetExpanded(h.code) ? (V(), ie(p, {
                key: 1,
                flat: "",
                onClick: (c) => o.reduceFacet(h.code),
                class: "q-ma-none"
              }, {
                default: T(() => [
                  ae(W(e.$q.lang.vui.facets.showLess), 1)
                ]),
                _: 2
              }, 1032, ["onClick"])) : he("", !0)
            ]),
            _: 2
          }, 1024)
        ], 64)) : he("", !0)
      ]),
      _: 2
    }, 1024))), 128))
  ]);
}
const to = /* @__PURE__ */ E(Kn, [["render", eo]]), no = {
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
}, oo = window.Vue.resolveComponent, Bt = window.Vue.createVNode, ao = window.Vue.openBlock, io = window.Vue.createElementBlock, so = { class: "row" };
function ro(e, t, n, a, s, o) {
  const i = oo("q-input");
  return ao(), io("div", so, [
    Bt(i, {
      label: "Longitude",
      "stack-label": "",
      modelValue: e.inputObject.lon,
      "onUpdate:modelValue": [
        t[0] || (t[0] = (r) => e.inputObject.lon = r),
        o.updateJson
      ],
      modelModifiers: { number: !0 }
    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
    Bt(i, {
      label: "Latitude",
      "stack-label": "",
      modelValue: e.inputObject.lat,
      "onUpdate:modelValue": [
        t[1] || (t[1] = (r) => e.inputObject.lat = r),
        o.updateJson
      ],
      modelModifiers: { number: !0 }
    }, null, 8, ["modelValue", "onUpdate:modelValue"])
  ]);
}
const lo = /* @__PURE__ */ E(no, [["render", ro]]), co = {
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
}, De = window.Vue.resolveComponent, je = window.Vue.createVNode, He = window.Vue.withCtx, uo = window.Vue.renderList, fo = window.Vue.Fragment, ft = window.Vue.openBlock, At = window.Vue.createElementBlock, ho = window.Vue.toDisplayString, po = window.Vue.createTextVNode, mo = window.Vue.resolveDirective, go = window.Vue.createBlock, bo = window.Vue.withDirectives;
function wo(e, t, n, a, s, o) {
  const i = De("q-icon"), r = De("q-input"), l = De("q-item-section"), d = De("q-item"), u = De("q-list"), p = mo("ripple");
  return ft(), At("div", null, [
    je(r, {
      placeholder: e.$q.lang.vui.handles.placeholder,
      modelValue: e.text,
      "onUpdate:modelValue": t[0] || (t[0] = (f) => e.text = f),
      debounce: 300,
      onInput: o.searchHandles,
      autofocus: "",
      outlined: "",
      "bg-color": "white",
      dense: ""
    }, {
      prepend: He(() => [
        je(i, { name: "search" })
      ]),
      _: 1
    }, 8, ["placeholder", "modelValue", "onInput"]),
    je(u, {
      bordered: "",
      dense: "",
      separator: ""
    }, {
      default: He(() => [
        (ft(!0), At(fo, null, uo(e.handles, (f) => bo((ft(), go(d, {
          clickable: "",
          onClick: (h) => e.VUi.methods.goTo(n.baseUrl + "hw/" + f.code),
          key: f.code
        }, {
          default: He(() => [
            je(l, null, {
              default: He(() => [
                po(ho(f.code), 1)
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
const yo = /* @__PURE__ */ E(co, [["render", wo]]), vo = {
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
}, $o = window.Vue.renderList, _o = window.Vue.Fragment, Fe = window.Vue.openBlock, ht = window.Vue.createElementBlock, Lt = window.Vue.resolveComponent, Ut = window.Vue.createBlock;
window.Vue.createCommentVNode;
const Co = window.Vue.toDisplayString, xo = window.Vue.createElementVNode, So = window.Vue.withCtx, ko = window.Vue.normalizeClass, Vo = { class: "row" };
function qo(e, t, n, a, s, o) {
  const i = Lt("q-input"), r = Lt("q-field");
  return Fe(), ht("div", Vo, [
    (Fe(!0), ht(_o, null, $o(e.jsonAsObject, (l, d) => (Fe(), ht("div", {
      key: d,
      class: ko("col-" + 12 / n.cols)
    }, [
      n.readonly ? (Fe(), Ut(r, {
        key: 1,
        label: d,
        orientation: "vertical",
        "stack-label": "",
        borderless: "",
        readonly: ""
      }, {
        default: So(() => [
          xo("span", null, Co(l), 1)
        ]),
        _: 2
      }, 1032, ["label"])) : (Fe(), Ut(i, {
        key: 0,
        label: d,
        orientation: "vertical",
        "stack-label": "",
        modelValue: e.jsonAsObject[d],
        "onUpdate:modelValue": [(u) => e.jsonAsObject[d] = u, o.updateJson]
      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]))
    ], 2))), 128))
  ]);
}
const Do = /* @__PURE__ */ E(vo, [["render", qo]]), Ge = window.Quasar, Fo = {
  props: {
    icon: { type: String, default: "notifications" },
    iconNone: { type: String, default: "notifications_none" },
    typeIconMap: { type: Object, default: function() {
      return {};
    } },
    baseUrl: { type: String, default: "/api/", required: !0 }
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
      this.$http.get(this.baseUrl + "x/notifications/api/messages", { timeout: 5 * 1e3 }).then((function(e) {
        this.updateNotificationsData(e.data), this.wasError && (clearInterval(this.timer), this.timer = setInterval(this.fetchNotificationsList, 5e3)), this.wasError = !1;
      }).bind(this)).catch((function() {
        this.wasError || (clearInterval(this.timer), this.timer = setInterval(this.fetchNotificationsList, 6e4)), this.wasError = !0;
      }).bind(this));
    },
    updateNotificationsData: function(e) {
      const t = e.sort(function(o, i) {
        return i.creationDate - o.creationDate;
      });
      var n = [], a = this.list[0];
      if (!a)
        n = t;
      else
        for (var s = 0; s < t.length; s++)
          if (t[s].uuid != a.uuid) {
            if (t[s].creationDate < a.creationDate)
              break;
            n.push(t[s]);
          }
      this.list = t, this.count = t.length, this.hasNew = n.length > 0, this.firstCall || n.forEach((function(o) {
        this.$q.notify({
          type: "info",
          icon: this.toIcon(o.type),
          message: o.title,
          detail: o.content,
          timeout: 3e3,
          position: "bottom-right"
        });
      }).bind(this)), this.firstCall = !1;
    },
    cancelAutoUpdate: function() {
      clearInterval(this.timer);
    },
    toIcon: function(e) {
      var t = this.typeIconMap[e];
      return t || "mail";
    },
    toDelay: function(e) {
      let t = Ge.date.getDateDiff(Date.now(), e, "days");
      return t > 0 ? t + " " + this.$q.lang.vui.notifications.days : (t = Ge.date.getDateDiff(Date.now(), e, "hours"), t > 0 ? t + " " + this.$q.lang.vui.notifications.hours : (t = Ge.date.getDateDiff(Date.now(), e, "minutes"), t > 0 ? t + " " + this.$q.lang.vui.notifications.minutes : (t = Ge.date.getDateDiff(Date.now(), e, "seconds"), t + " " + this.$q.lang.vui.notifications.seconds)));
    }
  },
  beforeDestroy: function() {
    clearInterval(this.timer);
  }
}, Je = window.Vue.toDisplayString, Ye = window.Vue.createTextVNode, re = window.Vue.resolveComponent, z = window.Vue.withCtx, Qe = window.Vue.openBlock, pt = window.Vue.createBlock, Eo = window.Vue.createCommentVNode, To = window.Vue.renderList, Oo = window.Vue.Fragment, Mo = window.Vue.createElementBlock, Z = window.Vue.createVNode;
function Po(e, t, n, a, s, o) {
  const i = re("q-badge"), r = re("q-icon"), l = re("q-item-section"), d = re("q-item-label"), u = re("q-item"), p = re("q-list"), f = re("q-menu"), h = re("q-btn");
  return Qe(), pt(h, {
    round: "",
    flat: !e.hasNew,
    dense: "",
    color: e.hasNew ? "accent" : "secondary",
    "text-color": e.hasNew ? "accent-inverted" : "secondary-inverted",
    icon: e.count > 0 ? n.icon : n.iconNone,
    class: "on-left"
  }, {
    default: z(() => [
      e.count > 0 ? (Qe(), pt(i, {
        key: 0,
        color: "red",
        "text-color": "white",
        floating: ""
      }, {
        default: z(() => [
          Ye(Je(e.count), 1)
        ]),
        _: 1
      })) : Eo("", !0),
      Z(f, { class: "notifications" }, {
        default: z(() => [
          Z(p, { style: { width: "300px" } }, {
            default: z(() => [
              (Qe(!0), Mo(Oo, null, To(e.list, (c) => (Qe(), pt(u, {
                key: c.uuid,
                tag: "a",
                href: c.targetUrl
              }, {
                default: z(() => [
                  Z(l, { avatar: "" }, {
                    default: z(() => [
                      Z(r, {
                        name: o.toIcon(c.type),
                        size: "2rem"
                      }, null, 8, ["name"])
                    ]),
                    _: 2
                  }, 1024),
                  Z(l, null, {
                    default: z(() => [
                      Z(d, null, {
                        default: z(() => [
                          Ye(Je(c.title), 1)
                        ]),
                        _: 2
                      }, 1024),
                      Z(d, {
                        caption: "",
                        lines: "3"
                      }, {
                        default: z(() => [
                          Ye(Je(c.content), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  Z(l, {
                    side: "",
                    top: ""
                  }, {
                    default: z(() => [
                      Z(d, { caption: "" }, {
                        default: z(() => [
                          Ye(Je(o.toDelay(new Date(c.creationDate))), 1)
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
  }, 8, ["flat", "color", "text-color", "icon"]);
}
const No = /* @__PURE__ */ E(Fo, [["render", Po]]), It = window.Quasar, O = window.ol, Bo = {
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
      this.$props.initialZoomLevel && this.olMap.getView().setZoom(this.$props.initialZoomLevel);
    }
  },
  mounted: function() {
    let e = new O.View();
    const t = new O.source.OSM();
    let n = new O.layer.Tile({
      preload: 4,
      source: t
    });
    const a = [Ao()];
    this.$props.overview && a.push(new O.control.OverviewMap({ layers: [new O.layer.Tile({ source: t })] })), this.$props.search && typeof Geocoder == "function" && a.push(new Geocoder("nominatim", {
      provider: "osm",
      lang: this.$q.lang.isoName,
      placeholder: "Search for ...",
      limit: 5,
      debug: !1,
      autoComplete: !0,
      keepOpen: !0,
      preventMarker: !0,
      defaultFlyResolution: 19
    })), this.olMap = new O.Map({
      interactions: O.interaction.defaults.defaults({
        onFocusOnly: !0
      }),
      target: this.$props.id,
      layers: [n],
      // Improve user experience by loading tiles while animating. Will make animations stutter on mobile or slow devices.
      loadTilesWhileAnimating: !0,
      view: e,
      controls: O.control.defaults.defaults().extend(a)
    }), this.$props.initialCenter && this.olMap.getView().setCenter(O.proj.fromLonLat([this.$props.initialCenter.lon, this.$props.initialCenter.lat])), this.olMap.on("moveend", (function(s) {
      let o = s.map.getView().calculateExtent(), i = O.proj.transformExtent(o, "EPSG:3857", "EPSG:4326"), r = O.extent.getTopLeft(i), l = O.extent.getBottomRight(i);
      It.debounce(this.$emit("moveend", r, l), 300);
    }).bind(this)), setTimeout((function() {
      this.olMap.on("click", (function(s) {
        s.stopPropagation(), It.debounce(this.$emit("click", O.proj.transform(s.coordinate, "EPSG:3857", "EPSG:4326")), 300);
      }).bind(this));
    }).bind(this), 300);
  }
};
function Ao() {
  return new class extends O.control.Control {
    /**
     * @param {Object} [opt_options] Control options.
     */
    constructor(t) {
      const n = t || {}, a = document.createElement("div");
      a.className = "ol-v-custom-buttons ol-unselectable ol-control", super({
        element: a,
        target: n.target
      });
    }
  }();
}
const Lo = window.Vue.normalizeProps, Uo = window.Vue.guardReactiveProps, Io = window.Vue.renderSlot, zo = window.Vue.openBlock, Ro = window.Vue.createElementBlock, jo = ["id"];
function Ho(e, t, n, a, s, o) {
  return zo(), Ro("div", { id: n.id }, [
    Io(e.$slots, "default", Lo(Uo(e.$attrs)))
  ], 8, jo);
}
const Go = /* @__PURE__ */ E(Bo, [["render", Ho]]), Xe = window.Quasar, y = window.ol, Jo = {
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
          if (this._clusterCoordString && t !== this._clusterCoordString) {
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
      let e = this.$props.field, t = this.$data.items.filter(function(a) {
        return a[e] != null;
      }).map((function(a) {
        let s;
        if (typeof a[e] == "string" || a[e] instanceof String ? s = JSON.parse(a[e]) : s = a[e], s != null) {
          let o = new y.Feature({
            geometry: new y.geom.Point(y.proj.fromLonLat([s.lon, s.lat]))
          });
          return this.$props.nameField && (o.set("name", a[this.$props.nameField]), o.set("innerObject", a), o.set("totalCount", a.totalCount)), o;
        }
        return null;
      }).bind(this)), n = this.$data.clusters.filter(function(a) {
        return a[e] != null;
      }).map((function(a) {
        let s;
        if (typeof a[e] == "string" || a[e] instanceof String ? s = JSON.parse(a[e]) : s = a[e], s != null) {
          let o = new y.Feature({
            geometry: new y.geom.Point(y.proj.fromLonLat([s.lon, s.lat]))
          });
          return this.$props.nameField && (o.set("name", a[this.$props.nameField]), o.set("innerObject", a), o.set("totalCount", a.totalCount)), o;
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
      this.$data.vectorSource.clear(), this.$data.vectorSource.addFeatures(this.features), this.$props.fitOnDataUpdate && this.fitView();
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
      const t = this.bounds(e), n = t.sw.lat, a = t.sw.lon, s = t.ne.lat, o = t.ne.lon;
      let i = (n + s) / 2, r = (a + o) / 2;
      return i = i.toFixed(Math.floor(2 - Math.log(s - n) / Math.LN10)), r = r.toFixed(Math.floor(2 - Math.log(o - a) / Math.LN10)), { lat: Number(i), lon: Number(r) };
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
      let t = !0, n = -90, a = 90, s = -180, o = 180;
      for (let r = 0; r < e.length; r++) {
        const l = e.charAt(r), d = this.$data.base32.indexOf(l);
        if (d == -1) throw new Error("Invalid geohash");
        for (let u = 4; u >= 0; u--) {
          const p = d >> u & 1;
          if (t) {
            const f = (s + o) / 2;
            p == 1 ? s = f : o = f;
          } else {
            const f = (n + a) / 2;
            p == 1 ? n = f : a = f;
          }
          t = !t;
        }
      }
      return {
        sw: { lat: n, lon: s },
        ne: { lat: a, lon: o }
      };
    }
  },
  mounted: function() {
    this.$parent.onMapLoad((function(e) {
      if (this.$data.olMap = e, this.$data.items = [], this.$data.clusters = [], this.$props.list)
        this.$data.items = this.$props.list;
      else if (this.$props.cluster)
        for (let o = 0; o < this.$props.cluster.length; o++)
          this.$props.cluster[o].totalCount == 1 ? this.$data.items = this.$data.items.concat(this.$props.cluster[o].list) : this.$data.clusters.push({
            geoHash: this.$props.cluster[o].code,
            geoLocation: this.decode(this.$props.cluster[o].code),
            totalCount: this.$props.cluster[o].totalCount
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
      }), a = new y.style.Style({
        text: new y.style.Text({
          font: this.$props.markerSize + "px " + this.$props.markerFont,
          text: this.$props.markerIcon,
          fill: new y.style.Fill({ color: this.$props.markerColor }),
          offsetY: 0
        })
      }), s = {};
      if (n.setStyle((function(o) {
        let i = 0, r = o.get("features");
        for (let l = 0; l < r.length; l++) {
          let d = r[l].get("totalCount");
          i += d || 1;
        }
        if (!i || i == 1)
          return a;
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
      }).bind(this)), this.olMap.addLayer(n), this.fitView(), this.olMap.on("moveend", (function(o) {
        let i = o.map.getView().calculateExtent(), r = y.proj.transformExtent(i, "EPSG:3857", "EPSG:4326"), l = y.extent.getTopLeft(r), d = y.extent.getBottomRight(r);
        this.baseUrl && Xe.debounce(this.fetchList({ lat: l[0], lon: l[1] }, { lat: d[0], lon: d[1] }), 300), Xe.debounce(this.$emit("moveend", l, d), 300);
      }).bind(this)), this.$props.nameField) {
        let o = new y.Overlay({
          element: this.$el.querySelector("#" + this.$props.id + "Popup"),
          positioning: "bottom-center",
          stopEvent: !1,
          offset: [0, -20]
        });
        this.olMap.addOverlay(o), this.olMap.on("click", (function(i) {
          let r = this.olMap.forEachFeatureAtPixel(
            i.pixel,
            function(l) {
              return l;
            }
          );
          if (r && r.get("features") && r.get("features").length == 1) {
            let l = r.getGeometry().getCoordinates();
            o.setPosition(l), this.$data.popupDisplayed = !0, this.$data.objectDisplayed = r.get("features")[0].get("innerObject"), i.stopPropagation(), Xe.debounce(this.$emit("click", y.proj.transform(l, "EPSG:3857", "EPSG:4326")), 300);
          } else
            this.$data.popupDisplayed = !1;
        }).bind(this)), this.olMap.on("pointermove", (function(i) {
          if (i.dragging) {
            this.$data.popupDisplayed = !1;
            return;
          }
          let r = this.olMap.getEventPixel(i.originalEvent), l = this.olMap.hasFeatureAtPixel(r);
          this.olMap.getTargetElement().style.cursor = l ? "pointer" : "";
        }).bind(this));
      } else
        this.olMap.on("click", (function(o) {
          let i = this.olMap.forEachFeatureAtPixel(
            o.pixel,
            function(r) {
              return r;
            }
          );
          if (i && i.get("features") && i.get("features").length == 1) {
            let r = i.getGeometry().getCoordinates();
            o.stopPropagation(), Xe.debounce(this.$emit("click", y.proj.transform(r, "EPSG:3857", "EPSG:4326")), 300);
          }
        }).bind(this));
      if (this.$props.object && this.$props.objectEditable) {
        let o = new y.interaction.Draw({
          source: this.$data.vectorSource,
          type: "Point"
        });
        o.on("drawend", (r) => {
          let l = r.feature, d = y.proj.toLonLat(l.getGeometry().getCoordinates());
          this.$data.vectorSource.clear(), this.olMap.removeInteraction(o), i.classList.remove("active"), this.$props.object[this.$props.field] = {
            lon: d[0],
            lat: d[1]
          };
        });
        const i = document.createElement("button");
        i.innerHTML = "&#9678;", i.addEventListener(
          "click",
          (r) => {
            r.preventDefault(), i.classList.contains("active") ? (this.olMap.removeInteraction(o), i.classList.remove("active")) : (this.olMap.addInteraction(o), o = this.olMap.getInteractions().getArray().slice(-1)[0], i.classList.add("active"));
          },
          !1
        ), this.olMap.getViewport().getElementsByClassName("ol-v-custom-buttons")[0].appendChild(i);
      }
    }).bind(this));
  }
}, Yo = window.Vue.renderSlot, Qo = window.Vue.toDisplayString, zt = window.Vue.createElementVNode, Xo = window.Vue.resolveComponent, Ko = window.Vue.withCtx, Rt = window.Vue.openBlock, Wo = window.Vue.createBlock, Zo = window.Vue.createCommentVNode, ea = window.Vue.createElementBlock, ta = ["id"], na = ["id"], oa = { class: "text-subtitle2" };
function aa(e, t, n, a, s, o) {
  const i = Xo("q-card");
  return Rt(), ea("div", { id: n.id }, [
    zt("div", {
      id: n.id + "Popup"
    }, [
      e.popupDisplayed ? (Rt(), Wo(i, {
        key: 0,
        class: "q-px-md"
      }, {
        default: Ko(() => [
          Yo(e.$slots, "card", { objectDisplayed: e.objectDisplayed }, () => [
            zt("div", oa, Qo(e.objectDisplayed[n.nameField]), 1)
          ])
        ]),
        _: 3
      })) : Zo("", !0)
    ], 8, na)
  ], 8, ta);
}
const ia = /* @__PURE__ */ E(Jo, [["render", aa]]), sa = window.Quasar, ra = {
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
      sa.debounce(this.$refs.menu.updatePosition, 500)();
    },
    getSelectedLabel: function() {
      return this.$data.selectedNode ? this.$props.list.find((function(t) {
        return t[this.$props.keyField] === this.$data.selectedNode;
      }).bind(this))[this.$props.labelField] : null;
    },
    convertListToTree: function(e, t) {
      var n = {}, a, s = [], o, i = [];
      for (o = 0; o < e.length; o += 1)
        n[e[o][this.$props.keyField]] = o, i.push({ ...e[o], children: [] });
      for (o = 0; o < e.length; o += 1)
        a = i[o], a[this.$props.parentKeyField] ? i[n[a[this.$props.parentKeyField]]].children.push(a) : s.push(a);
      return t ? [i[n[t]]] : s;
    }
  }
}, Ke = window.Vue.resolveComponent, mt = window.Vue.createVNode, la = window.Vue.toDisplayString, da = window.Vue.createElementVNode, We = window.Vue.withCtx, ca = window.Vue.normalizeProps, ua = window.Vue.guardReactiveProps, fa = window.Vue.openBlock, ha = window.Vue.createBlock, pa = {
  class: "self-center full-width no-outline",
  tabindex: "0"
};
function ma(e, t, n, a, s, o) {
  const i = Ke("q-icon"), r = Ke("q-tree"), l = Ke("q-menu"), d = Ke("q-field");
  return fa(), ha(d, ca(ua(e.$attrs)), {
    append: We(() => [
      mt(i, { name: "arrow_drop_down" })
    ]),
    control: We(() => [
      da("div", pa, la(o.getSelectedLabel()), 1)
    ]),
    default: We(() => [
      mt(l, {
        breakpoint: 600,
        fit: "",
        ref: "menu"
      }, {
        default: We(() => [
          mt(r, {
            nodes: o.convertListToTree(e.$props.list, e.$props.subTreeKey),
            "node-key": e.$props.keyField,
            "label-key": e.$props.labelField,
            expanded: e.expandedNodes,
            "onUpdate:expanded": [
              t[0] || (t[0] = (u) => e.expandedNodes = u),
              o.handleExpanded
            ],
            selected: e.selectedNode,
            "onUpdate:selected": [
              t[1] || (t[1] = (u) => e.selectedNode = u),
              o.handleSelected
            ]
          }, null, 8, ["nodes", "node-key", "label-key", "expanded", "onUpdate:expanded", "selected", "onUpdate:selected"])
        ]),
        _: 1
      }, 512)
    ]),
    _: 1
  }, 16);
}
const ga = /* @__PURE__ */ E(ra, [["render", ma]]), ba = window.Vue.ref, wa = {
  props: {
    inputId: String,
    readonly: Boolean,
    fileInfoUris: Array,
    fieldName: String,
    url: String,
    accept: String,
    multiple: { type: Boolean, default: !0 },
    maxFiles: Number,
    callbackOnDelete: { default: !1 },
    inputProps: { type: Object }
  },
  emits: ["update:file-info-uris", "download-file", "file-ok", "file-failed", "init-ok", "init-ko"],
  computed: {},
  mounted() {
    let e = new URLSearchParams();
    this.fileInfoUris.forEach((t) => {
      e.append(this.fieldName, t);
    }), this.$http.get(this.url + "/fileInfos", { params: e, credentials: !1 }).then((function(t) {
      let n = t.data;
      this.files = n.map((a) => ({ ...a, status: "OK" })), this.$emit("init-ok");
    }).bind(this)).catch(
      (function(t) {
        this.$emit("update:file-info-uris", []), this.$emit("init-ko"), this.$q && (t.response ? this.$q.notify(t.response.status + ":" + t.response.statusText + " Can't load file " + e) : this.$q.notify(t + " Can't load file " + e));
      }).bind(this)
    ), typeof this.callbackOnDelete != "function" && typeof this.callbackOnDelete != "boolean" && console.error("callback-on-delete must be a function or a boolean");
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
    addFiles(e) {
      this.files = this.files.filter((t) => t.status != "ERROR");
      for (let t of e)
        if (this.canAddFiles()) {
          let n = ba({
            name: t.name,
            size: t.size,
            type: t.type,
            status: "IN_PROGRESS",
            errorMessage: null,
            progress: 0,
            estimated: null,
            file: t
          }).value;
          this.$data.files.push(n), ya.call(this, n);
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
      let a = typeof this.callbackOnDelete == "function";
      if (this.callbackOnDelete === !0 || a) {
        let s = {};
        s[this.fieldName] = e.fileUri;
        let o = this.$http.delete(this.url, { params: s, credentials: !1 });
        a && this.callbackOnDelete(this, o);
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
function ya(e) {
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
      onUploadProgress: (function(a) {
        e.progress = a.progress, e.estimated = a.estimated;
      }).bind(this)
    }
  ).then((function(a) {
    this.$emit("file-ok", a.data);
    let s = a.data;
    e.status = "OK", e.fileUri = s, this.$emit("update:file-info-uris", [...this.fileInfoUris, s]);
  }).bind(this)).catch((function(a) {
    var s;
    this.$emit("file-failed", a), e.status = "ERROR", ((s = a == null ? void 0 : a.response) == null ? void 0 : s.status) === 413 && (e.errorMessage = this.$vui.i18n().uploader.fileErrorTooBig);
  }).bind(this));
}
const R = window.Vue.toDisplayString, Ze = window.Vue.normalizeProps, et = window.Vue.guardReactiveProps, Ee = window.Vue.renderSlot, va = window.Vue.createTextVNode, L = window.Vue.openBlock, U = window.Vue.createElementBlock, ee = window.Vue.createCommentVNode, $a = window.Vue.renderList, _a = window.Vue.Fragment, Ca = window.Vue.normalizeStyle, Te = window.Vue.createElementVNode, gt = window.Vue.withModifiers, jt = window.Vue.mergeProps, xa = { class: "v-fileupload" }, Sa = {
  key: 0,
  class: "header"
}, ka = { class: "content" }, Va = { class: "files" }, qa = {
  class: "file",
  style: { display: "flex", "flex-flow": "row wrap", "column-gap": "50px" }
}, Da = {
  key: 0,
  style: { color: "red" }
}, Fa = { style: { color: "grey" } }, Ea = { key: 1 }, Ta = { key: 2 }, Oa = ["onClick"], Ma = ["onClick"], Pa = ["onClick"], Na = {
  key: 0,
  class: "input"
}, Ba = ["id", "accept", "multiple"];
function Aa(e, t, n, a, s, o) {
  return L(), U("div", xa, [
    e.$slots.header ? (L(), U("div", Sa, [
      va(R(e.$slots.header.$attrs) + " ", 1),
      Ee(e.$slots, "header", Ze(et({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })))
    ])) : ee("", !0),
    Te("div", ka, [
      Ee(e.$slots, "default", Ze(et({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })), () => [
        Te("div", Va, [
          Ee(e.$slots, "files", Ze(et({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })), () => [
            (L(!0), U(_a, null, $a(e.files, (i) => (L(), U("span", qa, [
              Te("span", {
                style: Ca({ color: i.status === "IN_PROGRESS" ? "blue" : i.status == "ERROR" ? "red" : "" })
              }, R(i.name), 5),
              i.status === "ERROR" ? (L(), U("span", Da, R(i.errorMessage), 1)) : ee("", !0),
              Te("span", Fa, R(o.humanStorageSize(i.size)), 1),
              i.status === "IN_PROGRESS" ? (L(), U("span", Ea, R(e.$vui.i18n().uploader.progress) + " : " + R((i.progress * 100).toFixed()) + " %", 1)) : ee("", !0),
              i.status === "IN_PROGRESS" && i.estimated != null ? (L(), U("span", Ta, R(e.$vui.i18n().uploader.estimated) + " : " + R(i.estimated.toFixed()) + " s", 1)) : ee("", !0),
              i.status === "OK" ? (L(), U("button", {
                key: 3,
                onClick: gt((r) => o.downloadFile(i), ["prevent"])
              }, R(e.$vui.i18n().uploader.download), 9, Oa)) : ee("", !0),
              i.status === "IN_PROGRESS" ? (L(), U("button", {
                key: 4,
                onClick: gt((r) => o.abortUpload(i), ["prevent"])
              }, R(e.$vui.i18n().uploader.abort), 9, Ma)) : ee("", !0),
              !this.readonly && i.status !== "IN_PROGRESS" ? (L(), U("button", {
                key: 5,
                style: { color: "red" },
                onClick: gt((r) => o.removeFile(i), ["prevent"])
              }, R(e.$vui.i18n().uploader.remove), 9, Pa)) : ee("", !0)
            ]))), 256))
          ])
        ]),
        o.canAddFiles() ? (L(), U("div", Na, [
          Ee(e.$slots, "input", Ze(et({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })), () => [
            Te("input", jt({
              id: e.$props.inputId,
              ref: "input",
              type: "file",
              accept: e.$props.accept,
              multiple: e.$props.multiple,
              onChange: t[0] || (t[0] = (i) => o.addFiles(i.target.files))
            }, e.$props.inputProps), null, 16, Ba)
          ])
        ])) : ee("", !0)
      ])
    ]),
    e.$slots.footer ? (L(), U("div", jt({
      key: 1,
      class: "footer"
    }, { ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize }), [
      Ee(e.$slots, "footer")
    ], 16)) : ee("", !0)
  ]);
}
const La = /* @__PURE__ */ E(wa, [["render", Aa]]), Ua = window.Quasar.format, { humanStorageSize: Ia } = Ua, za = {
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
    this.changeIcon();
    var e = new URLSearchParams();
    this.fileInfoUris.forEach((t) => {
      e.append(this.fieldName, t);
    }), this.$http.get(this.url + "/fileInfos", { params: e, credentials: !1 }).then((function(t) {
      var n = t.data;
      this.files = n.map((a) => a), this.$emit("init-ok");
    }).bind(this)).catch(
      (function(t) {
        this.$emit("update:file-info-uris", []), this.$emit("init-ko"), t.response ? this.$q.notify(t.response.status + ":" + t.response.statusText + " Can't load file " + e) : this.$q.notify(t + " Can't load file " + e);
      }).bind(this)
    );
  },
  data: function() {
    return {
      files: []
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
      var t = this.files.indexOf(e), n = [...this.fileInfoUris], a = {};
      a[this.fieldName] = e.fileUri, this.$http.delete(this.url, { params: a, credentials: !1 }).then((function() {
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
      var e = this.files.filter((n) => n.__status != "uploaded").reduce((n, a) => n + a.size, 0), t = this.files.reduce((n, a) => n + a.size, 0);
      return e + t;
    },
    getGlobalSizeLabel() {
      return Ia(this.getGlobalSize());
    }
  }
}, H = window.Vue.toDisplayString, tt = window.Vue.createTextVNode, le = window.Vue.resolveComponent, N = window.Vue.withCtx, G = window.Vue.createVNode, _ = window.Vue.openBlock, I = window.Vue.createBlock, D = window.Vue.createCommentVNode, te = window.Vue.createElementBlock, J = window.Vue.createElementVNode, Ht = window.Vue.renderList, bt = window.Vue.Fragment, Ra = window.Vue.normalizeClass, ja = window.Vue.mergeProps, Ha = window.Vue.createSlots, Ga = { class: "q-uploader__header-content flex flex-center no-wrap q-gutter-xs" }, Ja = { class: "col column justify-center" }, Ya = {
  key: 0,
  class: "q-uploader__title"
}, Qa = {
  key: 1,
  class: "q-uploader__subtitle"
}, Xa = {
  key: 2,
  class: "q-uploader__subtitle"
}, Ka = { class: "row" }, Wa = { class: "col column justify-center" }, Za = { class: "q-uploader__file-header row flex-center no-wrap" }, ei = { class: "q-uploader__file-header-content col" }, ti = { class: "q-uploader__title" }, ni = { class: "q-uploader__file-header row flex-center no-wrap" }, oi = { class: "q-uploader__file-header-content col" }, ai = { class: "q-uploader__title" }, ii = {
  key: 0,
  class: "q-field__after q-field__marginal row no-wrap items-center"
};
function si(e, t, n, a, s, o) {
  const i = le("q-tooltip"), r = le("q-btn"), l = le("q-spinner"), d = le("q-uploader-add-trigger"), u = le("q-icon"), p = le("q-circular-progress"), f = le("q-field"), h = le("q-uploader");
  return _(), I(h, ja({
    url: e.$props.url,
    "auto-upload": "",
    "field-name": e.$props.fieldName,
    multiple: e.$props.multiple,
    "max-files": e.$props.multiple ? void 0 : 1,
    headers: [{ name: "Accept", value: "application/json" }],
    onUploaded: o.uploadedFiles,
    onFailed: o.failedFiles,
    readonly: e.$props.readonly || !o.globalCanAddFiles([])
  }, e.$attrs, { ref: "quasarUploader" }), Ha({
    list: N((c) => [
      J("div", Ka, [
        G(f, {
          "label-width": 3,
          label: e.$props.simple ? e.$props.label : void 0,
          class: "col",
          orientation: "vertical",
          "stack-label": "",
          borderless: ""
        }, {
          control: N(() => [
            J("div", Wa, [
              e.$props.readonly ? D("", !0) : (_(!0), te(bt, { key: 0 }, Ht(c.files, (m) => (_(), te(bt, {
                key: m.name
              }, [
                m.__status !== "uploaded" ? (_(), te("div", {
                  key: 0,
                  class: Ra(["q-uploader__file relative-position", {
                    "q-uploader__file--failed": m.__status === "failed",
                    "q-uploader__file--uploaded": m.__status === "uploaded"
                  }])
                }, [
                  J("div", Za, [
                    m.__status === "failed" ? (_(), I(u, {
                      key: 0,
                      class: "q-uploader__file-status",
                      name: e.$q.iconSet.type.negative,
                      color: "negative"
                    }, null, 8, ["name"])) : D("", !0),
                    G(u, {
                      class: "q-uploader__file-status",
                      name: m.type.indexOf("video/") === 0 ? "movie" : m.type.indexOf("image/") === 0 ? "photo" : m.type.indexOf("audio/") === 0 ? "audiotrack" : "insert_drive_file"
                    }, null, 8, ["name"]),
                    J("div", ei, [
                      J("div", ti, H(m.name), 1)
                    ]),
                    m.__status === "uploading" ? (_(), I(p, {
                      key: 1,
                      value: m.__progress,
                      min: 0,
                      max: 1,
                      indeterminate: m.__progress === 0
                    }, null, 8, ["value", "indeterminate"])) : D("", !0),
                    m.__status === "failed" ? (_(), I(r, {
                      key: 2,
                      round: "",
                      dense: "",
                      flat: "",
                      icon: e.$q.iconSet.uploader.clear,
                      onClick: (g) => c.removeFile(m)
                    }, null, 8, ["icon", "onClick"])) : D("", !0)
                  ])
                ], 2)) : D("", !0)
              ], 64))), 128)),
              (_(!0), te(bt, null, Ht(e.files, (m) => (_(), te("div", {
                key: m.name,
                class: "q-uploader__file relative-position q-uploader__file--uploaded"
              }, [
                J("div", ni, [
                  G(u, {
                    class: "q-uploader__file-status",
                    name: m.type.indexOf("video/") === 0 ? "movie" : m.type.indexOf("image/") === 0 ? "photo" : m.type.indexOf("audio/") === 0 ? "audiotrack" : "insert_drive_file"
                  }, null, 8, ["name"]),
                  J("div", oi, [
                    J("div", ai, H(m.name), 1)
                  ]),
                  e.$props.readonly ? D("", !0) : (_(), I(r, {
                    key: 0,
                    round: "",
                    dense: "",
                    flat: "",
                    icon: "delete",
                    onClick: (g) => o.removeRemoteFile(m)
                  }, null, 8, ["onClick"])),
                  G(r, {
                    round: "",
                    dense: "",
                    flat: "",
                    icon: "file_download",
                    onClick: (g) => e.$emit("download-file", m.fileUri)
                  }, null, 8, ["onClick"])
                ])
              ]))), 128))
            ])
          ]),
          _: 2
        }, 1032, ["label"]),
        e.$props.simple && !e.$props.readonly ? (_(), te("div", ii, [
          c.isUploading ? (_(), I(l, {
            key: 0,
            class: "q-uploader__spinner"
          })) : D("", !0),
          o.globalCanAddFiles(c.files) ? (_(), I(r, {
            key: 1,
            type: "a",
            icon: e.$q.iconSet.uploader.add,
            flat: "",
            dense: ""
          }, {
            default: N(() => [
              G(d)
            ]),
            _: 1
          }, 8, ["icon"])) : D("", !0),
          c.isUploading ? (_(), I(r, {
            key: 2,
            type: "a",
            icon: e.$q.iconSet.uploader.clear,
            flat: "",
            dense: "",
            onClick: c.abort
          }, {
            default: N(() => [
              G(i, null, {
                default: N(() => [
                  tt(H(e.$q.lang.vui.uploader.abort), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : D("", !0)
        ])) : D("", !0)
      ])
    ]),
    _: 2
  }, [
    e.$props.simple ? {
      name: "header",
      fn: N(() => []),
      key: "0"
    } : {
      name: "header",
      fn: N((c) => [
        J("div", Ga, [
          c.queuedFiles.length > 0 && !c.readonly ? (_(), I(r, {
            key: 0,
            type: "a",
            icon: e.$q.iconSet.uploader.clear_all,
            flat: "",
            dense: "",
            onClick: c.removeQueuedFiles
          }, {
            default: N(() => [
              G(i, null, {
                default: N(() => [
                  tt(H(e.$q.lang.vui.uploader.clear_all), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : D("", !0),
          J("div", Ja, [
            e.$props.label !== void 0 ? (_(), te("div", Ya, H(e.$props.label), 1)) : D("", !0),
            c.isUploading ? (_(), te("div", Qa, H(o.getGlobalSizeLabel()) + " / " + H(c.uploadProgressLabel), 1)) : (_(), te("div", Xa, H(o.getGlobalSizeLabel()), 1))
          ]),
          c.isUploading ? (_(), I(l, {
            key: 1,
            class: "q-uploader__spinner"
          })) : D("", !0),
          c.isUploading && !c.readonly ? (_(), I(r, {
            key: 2,
            type: "a",
            href: "#",
            icon: e.$q.iconSet.uploader.clear,
            flat: "",
            dense: "",
            onClick: c.abort
          }, {
            default: N(() => [
              G(i, null, {
                default: N(() => [
                  tt(H(e.$q.lang.vui.uploader.abort), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : D("", !0),
          o.globalCanAddFiles(c.files) && !c.readonly ? (_(), I(r, {
            key: 3,
            icon: e.$q.iconSet.uploader.add,
            flat: "",
            dense: "",
            onClick: c.pickFiles
          }, {
            default: N(() => [
              G(d),
              G(i, null, {
                default: N(() => [
                  tt(H(e.$q.lang.vui.uploader.add), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : D("", !0)
        ])
      ]),
      key: "1"
    }
  ]), 1040, ["url", "field-name", "multiple", "max-files", "onUploaded", "onFailed", "readonly"]);
}
const ri = /* @__PURE__ */ E(za, [["render", si]]);
function xt(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function nn(e, t) {
  var n = Object.create(e.prototype);
  for (var a in t) n[a] = t[a];
  return n;
}
function Be() {
}
var Pe = 0.7, at = 1 / Pe, xe = "\\s*([+-]?\\d+)\\s*", Ne = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Y = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", li = /^#([0-9a-f]{3,8})$/, di = new RegExp(`^rgb\\(${xe},${xe},${xe}\\)$`), ci = new RegExp(`^rgb\\(${Y},${Y},${Y}\\)$`), ui = new RegExp(`^rgba\\(${xe},${xe},${xe},${Ne}\\)$`), fi = new RegExp(`^rgba\\(${Y},${Y},${Y},${Ne}\\)$`), hi = new RegExp(`^hsl\\(${Ne},${Y},${Y}\\)$`), pi = new RegExp(`^hsla\\(${Ne},${Y},${Y},${Ne}\\)$`), Gt = {
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
xt(Be, st, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Jt,
  // Deprecated! Use color.formatHex.
  formatHex: Jt,
  formatHex8: mi,
  formatHsl: gi,
  formatRgb: Yt,
  toString: Yt
});
function Jt() {
  return this.rgb().formatHex();
}
function mi() {
  return this.rgb().formatHex8();
}
function gi() {
  return on(this).formatHsl();
}
function Yt() {
  return this.rgb().formatRgb();
}
function st(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = li.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Qt(t) : n === 3 ? new M(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? nt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? nt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = di.exec(e)) ? new M(t[1], t[2], t[3], 1) : (t = ci.exec(e)) ? new M(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = ui.exec(e)) ? nt(t[1], t[2], t[3], t[4]) : (t = fi.exec(e)) ? nt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = hi.exec(e)) ? Wt(t[1], t[2] / 100, t[3] / 100, 1) : (t = pi.exec(e)) ? Wt(t[1], t[2] / 100, t[3] / 100, t[4]) : Gt.hasOwnProperty(e) ? Qt(Gt[e]) : e === "transparent" ? new M(NaN, NaN, NaN, 0) : null;
}
function Qt(e) {
  return new M(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function nt(e, t, n, a) {
  return a <= 0 && (e = t = n = NaN), new M(e, t, n, a);
}
function bi(e) {
  return e instanceof Be || (e = st(e)), e ? (e = e.rgb(), new M(e.r, e.g, e.b, e.opacity)) : new M();
}
function _t(e, t, n, a) {
  return arguments.length === 1 ? bi(e) : new M(e, t, n, a ?? 1);
}
function M(e, t, n, a) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +a;
}
xt(M, _t, nn(Be, {
  brighter(e) {
    return e = e == null ? at : Math.pow(at, e), new M(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Pe : Math.pow(Pe, e), new M(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new M(be(this.r), be(this.g), be(this.b), it(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Xt,
  // Deprecated! Use color.formatHex.
  formatHex: Xt,
  formatHex8: wi,
  formatRgb: Kt,
  toString: Kt
}));
function Xt() {
  return `#${ge(this.r)}${ge(this.g)}${ge(this.b)}`;
}
function wi() {
  return `#${ge(this.r)}${ge(this.g)}${ge(this.b)}${ge((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Kt() {
  const e = it(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${be(this.r)}, ${be(this.g)}, ${be(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function it(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function be(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ge(e) {
  return e = be(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Wt(e, t, n, a) {
  return a <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new j(e, t, n, a);
}
function on(e) {
  if (e instanceof j) return new j(e.h, e.s, e.l, e.opacity);
  if (e instanceof Be || (e = st(e)), !e) return new j();
  if (e instanceof j) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, a = e.b / 255, s = Math.min(t, n, a), o = Math.max(t, n, a), i = NaN, r = o - s, l = (o + s) / 2;
  return r ? (t === o ? i = (n - a) / r + (n < a) * 6 : n === o ? i = (a - t) / r + 2 : i = (t - n) / r + 4, r /= l < 0.5 ? o + s : 2 - o - s, i *= 60) : r = l > 0 && l < 1 ? 0 : i, new j(i, r, l, e.opacity);
}
function Ct(e, t, n, a) {
  return arguments.length === 1 ? on(e) : new j(e, t, n, a ?? 1);
}
function j(e, t, n, a) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +a;
}
xt(j, Ct, nn(Be, {
  brighter(e) {
    return e = e == null ? at : Math.pow(at, e), new j(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Pe : Math.pow(Pe, e), new j(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, a = n + (n < 0.5 ? n : 1 - n) * t, s = 2 * n - a;
    return new M(
      wt(e >= 240 ? e - 240 : e + 120, s, a),
      wt(e, s, a),
      wt(e < 120 ? e + 240 : e - 120, s, a),
      this.opacity
    );
  },
  clamp() {
    return new j(Zt(this.h), ot(this.s), ot(this.l), it(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = it(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Zt(this.h)}, ${ot(this.s) * 100}%, ${ot(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Zt(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ot(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function wt(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const St = (e) => () => e;
function an(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function yi(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(a) {
    return Math.pow(e + a * t, n);
  };
}
function vi(e, t) {
  var n = t - e;
  return n ? an(e, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : St(isNaN(e) ? t : e);
}
function $i(e) {
  return (e = +e) == 1 ? Me : function(t, n) {
    return n - t ? yi(t, n, e) : St(isNaN(t) ? n : t);
  };
}
function Me(e, t) {
  var n = t - e;
  return n ? an(e, n) : St(isNaN(e) ? t : e);
}
const _i = function e(t) {
  var n = $i(t);
  function a(s, o) {
    var i = n((s = _t(s)).r, (o = _t(o)).r), r = n(s.g, o.g), l = n(s.b, o.b), d = Me(s.opacity, o.opacity);
    return function(u) {
      return s.r = i(u), s.g = r(u), s.b = l(u), s.opacity = d(u), s + "";
    };
  }
  return a.gamma = e, a;
}(1);
function Ci(e) {
  return function(t, n) {
    var a = e((t = Ct(t)).h, (n = Ct(n)).h), s = Me(t.s, n.s), o = Me(t.l, n.l), i = Me(t.opacity, n.opacity);
    return function(r) {
      return t.h = a(r), t.s = s(r), t.l = o(r), t.opacity = i(r), t + "";
    };
  };
}
const xi = Ci(vi);
let de = { color: st, interpolateHsl: xi, interpolateRgb: _i };
function yt(e, t, n) {
  if (e != "DEFAULT") {
    var a, s = Si;
    e == "RAINBOW" || e == "iRAINBOW" ? a = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#00FF00", "rgb(75, 0, 130)", "rgb(238, 130, 238)"] : e == "SPECTRUM" || e == "iSPECTRUM" ? (a = ["rgb(230, 30, 30)", "rgb(230, 230, 30)", "rgb(30, 230, 30)", "rgb(30, 230, 230)", "rgb(30, 30, 230)", "rgb(230, 30, 230)", "rgb(230, 30, 30)"], s = Vi) : e == "RED2GREEN" || e == "iRED2GREEN" ? a = ["rgb(255, 51, 51)", "rgb(250, 235, 0)", "rgb(51, 200, 51)"] : e == "GREEN2BLUE" || e == "iGREEN2BLUE" ? a = ["rgb(51, 153, 51)", "rgb(51, 153, 200)", "rgb(51, 51, 255)"] : e == "HEAT" || e == "iHEAT" ? a = ["rgb(255, 51, 51)", "rgb(255, 255, 51)", "rgb(51, 153, 51)", "rgb(51, 153, 255)"] : e == "GREEN:INTENSITY" || e == "iGREEN:INTENSITY" ? (a = ["rgb(51, 153, 51)", "rgb(170, 250, 170)"], s = ki) : e == "ANDROID" || e == "iANDROID" ? a = ["#0099CC", "#9933CC", "#CC0000", "#FF8800", "#669900"] : (e == "ANDROID:LIGHT" || e == "iANDROID:LIGHT") && (a = ["#33B5E5", "#AA66CC", "#ff4444", "#ffbb33", "#99cc00"]), e.charAt(0) == "i" && (a = a.reverse());
    var i, o = a[0] == a[a.length - 1], i = s(a, t + (o ? 1 : 0));
    return n ? i.map(function(r, l) {
      var d = de.color(r);
      return d.opacity = n, d.formatRgb();
    }) : i;
  }
}
function Si(e, t) {
  return kt(e, t, function(n, a, s, o, i) {
    return de.interpolateHsl(s, o)(n);
  });
}
function ki(e, t) {
  return kt(e, t, function(n, a, s, o, i) {
    return de.interpolateRgb(s, o)(n);
  });
}
function Vi(e, t) {
  return kt(e, t, function(n, a, s, o, i) {
    var r = { r: null, g: null, b: null }, l = a ? de.rgb(a) : r, d = de.rgb(s), u = de.rgb(o), p = i ? de.rgb(i) : r, f = Math.max(Math.min(Math.round(vt(n, l.r, d.r, u.r, p.r)), 255), 0), h = Math.max(Math.min(Math.round(vt(n, l.g, d.g, u.g, p.g)), 255), 0), c = Math.max(Math.min(Math.round(vt(n, l.b, d.b, u.b, p.b)), 255), 0);
    return de.rgb(f, h, c);
  });
}
function kt(e, t, n) {
  if (t == 1)
    return [e[0]];
  for (var a = 0, s = new Array(), o = e.length, i = 0; (o - 1) % (t - 1) != 0 && i < 20; )
    i++, o = e.length + i * (e.length - 1);
  i++;
  for (var r = 0; r < e.length - 1; r++) {
    for (var l = r - 1 >= 0 ? e[r - 1] : null, d = e[r], u = e[r + 1], p = r + 2 < e.length ? e[r + 2] : null, f = a; f < i + 1; f++) {
      var h = n(f / i, l, d, u, p);
      s.push(h);
    }
    a = 1;
  }
  for (var c = new Array(), r = 0; r < t; r++) {
    var m = (s.length - 1) / (t - 1) * r;
    c.push(s[m]);
  }
  return c;
}
function vt(e, t, n, a, s) {
  var o = a - n, i = t ?? n - o, r = s ?? a + o;
  return 0.5 * (2 * n + (-i + a) * e + (2 * i - 5 * n + 4 * a - r) * e * e + (-i + 3 * n - 3 * a + r) * e * e * e);
}
const qi = {
  id: "verticalLineTooltipPlugin",
  afterDraw: (e) => {
    var t, n;
    if ((n = (t = e.tooltip) == null ? void 0 : t._active) != null && n.length) {
      const { x: a } = e.tooltip._active[0].element, s = e.scales.y, { ctx: o } = e;
      o.save(), o.beginPath(), o.moveTo(a, s.top), o.lineTo(a, s.bottom), o.lineWidth = 2, o.strokeStyle = "rgba(50, 50, 50, 0.4)", o.stroke(), o.restore();
    }
  }
}, Di = {
  id: "verticalLinePlugin",
  getLinePositionAtIndex: function(e, t) {
    return e.getDatasetMeta(0).data[t].x;
  },
  getLinePositionAtX: function(e, t) {
    return e.scales.x.getPixelForValue(t, 0);
  },
  renderVerticalLine: function(e, t) {
    const n = e.scales.y, a = e.ctx, s = t.x ? this.getLinePositionAtX(e, t.x) : getLinePositionAtIndex(chart, t.idx);
    a.beginPath(), a.strokeStyle = t.color ? t.color : "#ff0000", a.moveTo(s, n.top), a.lineTo(s, n.bottom), a.stroke(), a.fillStyle = t.color ? t.color : "#ff0000", a.textAlign = "center", typeof t.label == "function" ? a.fillText(t.label(), s, n.top - 8) : a.fillText(t.label ? t.label : "", s, n.top - 8);
  },
  afterDatasetsDraw: function(e, t) {
    e.config.options.vLineAt && e.config.options.vLineAt.forEach((n) => this.renderVerticalLine(e, n));
  }
}, Fi = {
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
    showChartJsChart: function(e, t, n, a, s, o, i, r) {
      var l = this.timeDimToDayJsPeriod();
      if (this.fillGapDim && this.minTime && this.maxTime && l !== "hour") {
        var d = dayjs(this.minTime, this.timeFormat).startOf(l), u = dayjs(this.maxTime, this.timeFormat).startOf(l), p = dayjs(this.minTime, this.timeFormat).endOf(l);
        p.isAfter(u) && (u = p), this.$data.truncatedMinTime = d.add(d.utcOffset(), "minute").valueOf(), this.$data.truncatedMaxTime = u.add(u.utcOffset(), "minute").valueOf();
      } else
        this.$data.truncatedMinTime = this.minTime ? dayjs(this.minTime, this.timeFormat).valueOf() : null, this.$data.truncatedMaxTime = this.maxTime ? dayjs(this.maxTime, this.timeFormat).valueOf() : null;
      var f = Object.values(s), h, c, m;
      if (this.type === "bubbles") {
        m = "bubble";
        var g = s.filter((Q) => Q !== a);
        f = Object.values(g);
        var w = this.toChartJsBubblesData(e, g.keys(), g, a);
        c = [{ data: w }], h = this.getChartJsBubblesOptions(e, g.keys(), a, g, i, r), this.setChartJsColorOptions(c, o, 1, 0.5);
      } else if (this.type === "linechart")
        m = "line", c = this.toChartJsData(e, s, n, a), h = this.getChartJsLineOptions(e, a, s, n, i, r), this.setChartJsColorOptions(c, o);
      else if (this.type === "barchart")
        m = "bar", c = this.toChartJsData(e, s, n, a), h = this.getChartJsLineOptions(e, a, s, n, i, r), this.setChartJsColorOptions(c, o, 1, 0.5);
      else if (this.type === "stackedbarchart")
        m = "bar", c = this.toChartJsData(e, s, n, a), h = this.getStackedOptions(e, a, s, n, i, r), this.setChartJsColorOptions(c, o, 1, 0.5);
      else if (this.type === "polararea") {
        m = "polarArea", c = this.toChartJsData(e, s, n, a);
        var v = this.toChartJsPieData(c, s);
        c = v.datasets, f = v.labels, h = this.getPolarChartOptions(e, a, s, n, i, r), this.setChartJsPieColorOptions(c, o);
      } else if (this.type === "doughnut") {
        m = "doughnut";
        var g = s.filter((rn) => rn !== a);
        c = this.toChartJsData(e, g, n, a);
        var v = this.toChartJsPieData(c, s);
        c = v.datasets, f = v.labels, this.setChartJsPieColorOptions(c, o), h = {
          legend: {
            display: !0,
            position: "bottom"
          }
        };
      }
      var b = this.$.refs.graphCanvas, S = this.mergeDeep(h, r);
      if (window.dashboardGraphChart[this.$data.graphChartId]) {
        var q = window.dashboardGraphChart[this.$data.graphChartId];
        q.data.datasets = c, this.hashCode(JSON.stringify(q.options.scales)) !== this.hashCode(JSON.stringify(S.scales)) && (q.options.scales = S.scales), q.update("none");
      } else {
        let Q = {
          datasets: c
        };
        n || (Q.labels = f);
        var q = new Chart(b, {
          type: m,
          data: Q,
          options: S,
          plugins: [qi, Di]
        });
        window.dashboardGraphChart[this.$data.graphChartId] = q;
      }
    },
    setChartJsColorOptions: function(e, t, n, a) {
      if (t)
        for (var s = yt(t, e.length, n), o = yt(t, e.length, a || (n ? n * 0.25 : 0.25)), i = 0; i < e.length; i++)
          e[i].borderColor = s[i], e[i].backgroundColor = o[i], e[i].pointBackgroundColor = s[i], e[i].pointBorderColor = "#FFFFFFAF", e[i].pointBorderWidth = 2, e[i].fill = !0;
    },
    setChartJsPieColorOptions: function(e, t, n) {
      if (t)
        for (var a = 0; a < e.length; a++)
          e[a].backgroundColor = yt(t, e[a].data.length, n);
    },
    getChartJsBubblesOptions: function(e, t, n, a, s, o) {
      var i = this.getMaxRadius(e, t[2]), r = this.getAxisType(e, o, "xAxisType", t[0]), l = this.getAxisType(e, o, "yAxisType", t[1]);
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
              var u = d.dataIndex, p = d.dataset.data[u], f = d.chart.width, h = p.r_measure / i;
              return f / 24 * h;
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
                  a[t[0]] + " : " + Math.round(u.x),
                  a[t[1]] + " : " + Math.round(u.y),
                  a[t[2]] + " : " + Math.round(u.r_measure)
                ];
              }
            }
          }
        }
      };
    },
    getPolarChartOptions: function(e, t, n, a, s) {
      return {};
    },
    getAxisType: function(e, t, n, a) {
      var s = "linear";
      if (t && t[n])
        if (t[n] === "auto") {
          var o = getMinMax(e, a);
          o.max > 0 && o.min / o.max < 1e-3 && (s = "logarithmic");
        } else
          s = t[n];
      return s;
    },
    getChartJsLineOptions: function(e, t, n, a, s, o) {
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
      return a ? (i.scales.x = {
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
    getStackedOptions: function(e, t, n, a, s, o) {
      var i = this.getChartJsLineOptions(e, t, n, a, s, o), r = {
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
    toChartJsBubblesData: function(e, t, n, a) {
      for (var s = new Array(), o = 0; o < e.length; o++) {
        var i = new Object();
        i.x = e[o].values[t[0]], i.y = e[o].values[t[1]];
        var r = e[o].values[t[2]];
        !this.isEmpty(e[o].values) && !r && (r = 0), i.name = e[o].values[a], i.r_measure = r, s.push(i);
      }
      return s;
    },
    getMaxRadius: function(e, t) {
      for (var n = 0, a = 0; a < e.length; a++) {
        var s = e[a].values[t];
        s > n && (n = s);
      }
      return Math.max(n, 1);
    },
    getMinMax: function(e, t) {
      for (var n = 0, a = 0, s = 0; s < e.length; s++) {
        var o = e[s].values[t];
        o > a && (a = o), o < n && (n = o);
      }
      return {
        min: n,
        max: a
      };
    },
    defaultDataSeriesTranslator: function(e) {
      var t = e.timedDataSeries ? e.timedDataSeries : e.tabularDataSeries, n = e.seriesNames;
      return { dataValues: t, dataMetrics: n, timedSeries: !!e.timedDataSeries };
    },
    /** Conversion de données servers List<Instant, Map<NomMetric, value>> en données Chartjs.*/
    toChartJsData: function(e, t, n, a) {
      let s = function(g, w) {
        return g.indexOf(w, g.length - w.length) !== -1;
      };
      var o = this.timeDimToDayJsPeriod(), i = new Array();
      for (const g in t) {
        var r = new Object();
        r.data = new Array(), r.parsing = !1, t && t[g] && (r.label = t[g]);
        for (var l = this.$data.truncatedMinTime ? dayjs(this.$data.truncatedMinTime).subtract(1, o) : null, d = 0; d < e.length; d++) {
          if (n && this.fillGapDim)
            for (var u = l ? dayjs(l).add(1, o) : null, p = l ? u.add(1, o) : null, f = dayjs(e[d].time); !f.isBefore(p); )
              r.data.push({ x: u.valueOf(), y: this.fillGapValue }), u = p, p = p.add(1, o), l = u.valueOf();
          var h = n ? dayjs(e[d].time).valueOf() : e[d].values[a], c = e[d].values[g];
          !this.isEmpty(e[d].values) && !c && (c = 0), r.data.push({ x: h, y: c }), l = h;
        }
        if (n && this.fillGapDim && this.$data.truncatedMaxTime)
          for (var u = l ? dayjs(l).add(1, o) : null, m = dayjs(this.$data.truncatedMaxTime); !u.isAfter(m); )
            r.data.push({ x: u.valueOf(), y: this.fillGapValue }), u = u.add(1, o), l = u.valueOf();
        r.label || (s(g, "count") ? r.label = "Quantité" : s(g, "mean") ? r.label = "Moyenne" : s(g, "min") ? r.label = "Minimum" : s(g, "max") && (r.label = "Maximum")), i.push(r);
      }
      return i;
    },
    toChartJsPieData: function(e, t) {
      for (var n = new Array(), a = new Array(), s = 0; s < e[0].data.length; s++) {
        var o = e[0].data[s].x;
        t && t[e[0].data[s].x] && (o = t[e[0].data[s].x]), a.push(o), n.push(e[0].data[s].y);
      }
      return {
        datasets: [{ data: n }],
        labels: a
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
        for (const a in n)
          this.isObject(n[a]) ? (e[a] || Object.assign(e, { [a]: {} }), this.mergeDeep(e[a], n[a])) : Object.assign(e, { [a]: n[a] });
      return this.mergeDeep(e, ...t);
    }
  }
}, Ei = window.Vue.openBlock, Ti = window.Vue.createElementBlock, Oi = { ref: "graphCanvas" };
function Mi(e, t, n, a, s, o) {
  return Ei(), Ti("canvas", Oi, null, 512);
}
const Pi = /* @__PURE__ */ E(Fi, [["render", Mi]]), Ni = {
  mounted: function(e, t, n) {
    var a = t.value;
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
      var s = t.instance.$root.uiMessageStack, o = s.globalErrors.length > 0;
      for (let i of a.split(","))
        if (o = o || s.objectFieldErrors[i], o)
          break;
      o && (window.watcherUpdates.updates_detected = !0);
    }
    e.addEventListener("click", window.watcherUpdates.acceptedUpdates);
    for (let i of a.split(","))
      t.instance.$root.$watch("vueData." + i, function() {
        window.watcherUpdates.updates_detected = !0, document.title = "*" + window.watcherUpdates.originalDocumentTitle;
      }, { deep: !0 });
  },
  unmounted: function() {
    window.removeEventListener("beforeunload", window.watcherUpdates.beforeWindowUnload);
  }
}, Bi = {
  mounted: function(e, t, n) {
    var a = t.value;
    a && !window.autofocus && (window.autofocus = !0, e.focus());
  }
}, Ai = window.Vue.nextTick, Li = {
  updated: function(e, t, n) {
    Ai(() => {
      !window.watcherUpdates || !window.watcherUpdates.updates_detected ? e.classList.add("hidden") : e.classList.remove("hidden");
    });
  }
}, pe = window.Vue, Ui = window.Quasar, Ii = {
  created: function(e, t) {
    const n = t.value ? t.value.topOffset : null, a = t.value ? t.value.topOffsetEl : null, s = t.value ? t.value.leftOffset : null, o = t.value ? t.value.leftOffsetEl : null, i = e.querySelector(".mini");
    for (var r = 0; r < e.childNodes.length; r++) {
      var l = e.childNodes[r];
      l.classList && !l.classList.contains("mini") && l.classList.add("not-mini");
    }
    pe.minifyHandler = function() {
      var d = e.closest(".q-page-container"), u = d ? -d.getBoundingClientRect().y : window.pageYOffset, p = d ? -d.getBoundingClientRect().x : window.pageXOffset, f = e.getBoundingClientRect().y + u, h = e.getBoundingClientRect().x + p;
      (n || a) && (f = pe.minifyComputeOffset(n, a, 0, "TOP")), (s || o) && (h = pe.minifyComputeOffset(s, o, 0, "LEFT"));
      var c = i.getBoundingClientRect().height, m = e.getBoundingClientRect().height;
      u > m - c ? (i.classList.add("visible"), i.style.top = f + "px", i.style.left = h + "px") : (i.classList.remove("visible"), i.style.top = -c - f + "px");
    }, pe.minifyComputeOffset = function(d, u, p, f) {
      var h = p;
      if (d)
        h = d;
      else if (u) {
        var c = document.querySelector(u), m = c.getBoundingClientRect();
        f === "LEFT" ? h = m.width + m.x : f === "TOP" && (h = m.height + m.y);
      }
      return h;
    }, window.addEventListener("scroll", pe.minifyHandler), window.addEventListener("resize", Ui.throttle(pe.minifyHandler, 50));
  },
  updated: function() {
    setTimeout(pe.minifyHandler, 50);
  },
  unmounted: function(e) {
    window.removeEventListener("scroll"), window.removeEventListener("resize");
    for (var t = 0; t < e.childNodes.length; t++) {
      var n = e.childNodes[t];
      n.classList && n.classList.remove("not-mini");
    }
  }
}, F = window.Vue, me = window.Quasar, zi = {
  created: function(e, t) {
    F.createDebugLine = function(h, c, m, g) {
      let w = document.createElement("div");
      return w.style.position = c, w.style.top = m + "px", w.style.border = "none", w.style.borderTop = g + " solid 1px", w.style.width = "100%", w.style.zIndex = "10000", w.style.padding = "0px", w.style.lineHeight = "0px", w.style.fontSize = "12px", w.style.color = g, w.innerHTML = h, document.querySelector("body").appendChild(w), w;
    };
    const n = t.value.debug ? t.value.debug : !1, a = t.value.startingOffset ? t.value.startingOffset : 24, s = t.value.fixedPos ? t.value.fixedPos : 24, o = a - s, i = t.value.scanner ? t.value.scanner : s + 30, r = e.querySelectorAll("a");
    r[0].classList.add("active"), r[0].ariaCurrent = "step";
    const l = me.scroll.getScrollTarget(document.querySelector(r[0].hash));
    let d = [], u, p;
    n && (u = F.createDebugLine("startLinear", "absolute", 0, "red"), p = F.createDebugLine("last", "absolute", 0, "red")), F.scrollSpyHandler = function() {
      if (n) {
        for (var h = e, c = 0, m = 0; h && !isNaN(h.offsetLeft) && !isNaN(h.offsetTop); )
          c += h.offsetLeft - h.scrollLeft, m += h.offsetTop - h.scrollTop, h = h.offsetParent;
        console.log("x: " + c), console.log("y: " + m + " (startingOffset)");
      }
      window.pageYOffset > o ? (e.style.top || (e.style.top = s + "px", e.classList.add("fixed")), e.style.width = e.parentElement.getBoundingClientRect().width + "px") : e.style.top && (e.classList.remove("fixed"), e.style.top = null, e.style.width = null);
      for (var g = me.scroll.getVerticalScrollPosition(l), w = F.computeBreakPoints(g), v = 0; v < r.length; v++)
        w[v] <= g && (v >= r.length - 1 || g < w[v + 1]) ? (r[v].classList.add("active"), r[v].ariaCurrent = "step") : (r[v].classList.remove("active"), r[v].removeAttribute("aria-current"));
    }, F.computeBlockTop = function(h) {
      var c = [];
      for (let m = 0; m < r.length; m++) {
        const g = r[m].hash, w = document.querySelector(g);
        w && c.push(h + w.getBoundingClientRect().top);
      }
      return c;
    }, F.scrollTo = function(h) {
      h.preventDefault();
      const c = h.target.hash, m = document.querySelector(c);
      for (var g = me.scroll.getVerticalScrollPosition(l) + m.getBoundingClientRect().top - i, w = me.scroll.getVerticalScrollPosition(l), v = F.computeBlockTop(w), b = F.computeBreakPoints(w), S = 0; S < r.length; S++)
        if (r[S].hash == c) {
          v[S] - i < b[S + 1] || !b[S + 1] ? g = v[S] - i : g = b[S + 1] - 1;
          break;
        }
      var q = 200;
      me.scroll.setVerticalScrollPosition(l, g, q);
    }, F.computeBreakPoints = function(h) {
      var c = F.computeBlockTop(h);
      const m = window.innerHeight || document.documentElement.clientHeight, g = me.scroll.getScrollHeight(l), v = g - m;
      let b = v - m + i;
      for (let $ = 1; $ < r.length; $++)
        if (c[$] - i > b) {
          b = c[$] - i;
          break;
        }
      const S = v - b;
      var q = [];
      q.push(0);
      for (let $ = 1; $ < r.length; $++)
        c[$] - i > b ? q[$] = b + S * (c[$] - b) / (g - b) : q[$] = c[$] - i, q[$] = Math.round(q[$]);
      if (n) {
        for (let $ = 1; $ < r.length; $++) {
          var Q;
          d.length < $ ? (Q = F.createDebugLine("navId#" + $, "absolute", 0, "red"), d.push(Q)) : Q = d[$ - 1], Q.style.top = q[$] + i + "px";
        }
        u.style.top = b + i + "px", p.style.top = v + i + "px";
      }
      return q;
    }, e.classList.add("scroll-spy-nav");
    for (var f = 0; f < r.length; f++)
      r[f].addEventListener("click", F.scrollTo);
    window.addEventListener("scroll", F.scrollSpyHandler), window.addEventListener("resize", me.throttle(F.scrollSpyHandler, 50));
  },
  unmounted: function(e) {
    e.classList.remove("scroll-spy-nav"), window.removeEventListener("scroll"), window.removeEventListener("resize");
    const t = e.querySelectorAll("a");
    for (var n = 0; n < t.length; n++)
      t.removeEventListener("click");
  }
};
function Ri(e, t) {
  return new Date(e) - new Date(t);
}
function en(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function tn(e) {
  return typeof e == "number" && isFinite(e);
}
const C = window.Quasar, $t = {
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
      } else e.status === 403 ? t.message = this.$q.lang.vui.ajaxErrors.code403 : e.status === 404 ? t.message = this.$q.lang.vui.ajaxErrors.code404 : e.status === 405 ? t.message = this.$q.lang.vui.ajaxErrors.code405 : e.status === 422 ? (t.message = "", Object.keys(e.data).forEach((function(a) {
        this.$data.uiMessageStack[a] = e.data[a];
      }).bind(this))) : e.status >= 500 && (t.message = this.$q.lang.vui.ajaxErrors.code500);
      if (e.statusText && e.status !== 422 && (t.message = e.statusText), Object.prototype.hasOwnProperty.call(e, "data")) {
        if (Object.prototype.hasOwnProperty.call(e.data, "message") && e.data.message && e.data.message.length > 0)
          t.message = e.data.message;
        else if (Object.prototype.hasOwnProperty.call(e.data, "globalErrors") && e.data.globalErrors && e.data.globalErrors.length > 0) {
          var n = this.uiMessageStackToNotify(e.data);
          n.forEach((function(a) {
            this.$q.notify(a);
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
          type: "negative",
          message: n,
          multiLine: !0,
          timeout: 2500
        });
      }), Object.prototype.hasOwnProperty.call(e, "globalWarnings") && e.globalWarnings && e.globalWarnings.length > 0 && e.globalWarnings.forEach(function(n) {
        t.push({
          type: "warning",
          message: n,
          multiLine: !0,
          timeout: 2500
        });
      }), Object.prototype.hasOwnProperty.call(e, "globalInfos") && e.globalInfos && e.globalInfos.length > 0 && e.globalInfos.forEach(function(n) {
        t.push({
          type: "info",
          message: n,
          multiLine: !0,
          timeout: 2500
        });
      }), Object.prototype.hasOwnProperty.call(e, "globalSuccess") && e.globalSuccess && e.globalSuccess.length > 0 && e.globalSuccess.forEach(function(n) {
        t.push({
          type: "positive",
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
  transformListForSelection: function(e, t, n, a, s) {
    let o = this.$data.vueData[e];
    if (a && (o = o.filter(a)), s != null && s.trim() !== "") {
      const i = this.unaccentLower(s);
      o = o.filter((r) => this.unaccentLower(r[n].toString()).indexOf(i) > -1);
    }
    return o.map(function(i) {
      return { value: i[t], label: i[n].toString() };
    });
  },
  unaccentLower: function(e) {
    return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  },
  paginationAndSortHandler: function(e) {
    var t = e.pagination;
    let n = this.$data.componentStates, a = this.$data.vueData;
    var s = n[t.componentId].pagination;
    if ((s.sortBy != t.sortBy || s.descending != t.descending) && t.sortBy) {
      let o = n[t.componentId].columns.find((i) => i.name === t.sortBy);
      t.sortUrl ? (t.page = 1, this.$http.post(t.sortUrl, this.objectToFormData({ sortFieldName: o.field, sortDesc: t.descending, CTX: this.$data.vueData.CTX })).then((function(i) {
        a[t.listKey] = i.data.model[t.listKey], this.$data.vueData.CTX = i.data.model.CTX;
      }).bind(this))) : this.$refs[t.componentId].sortMethod.apply(this.$refs[t.componentId], [a[t.listKey], o.field, t.descending]);
    }
    n[t.componentId].pagination = t;
  },
  paginatedData: function(e, t) {
    var a = this.$data.componentStates[t].pagination;
    if (a.rowsPerPage != 0) {
      var s = (a.page - 1) * a.rowsPerPage, o = a.page * a.rowsPerPage;
      return this.$data.vueData[e].slice(s, o);
    }
    return this.$data.vueData[e];
  },
  createDefaultTableSort: function(e) {
    return this.$data.componentStates[e] ? (function(t, n, a) {
      let s = this.$data.componentStates[e].columns.find((o) => o.name === n);
      if (s.datetimeFormat) {
        const o = a === !0 ? -1 : 1, i = (r) => r[s.field];
        return t.sort((r, l) => {
          let d = i(r), u = i(l);
          return (C.date.extractDate(d, s.datetimeFormat).getTime() > C.date.extractDate(u, s.datetimeFormat).getTime() ? 1 : -1) * o;
        });
      } else
        return this.sortCiAi(t, s.field, a);
    }).bind(this) : this.sortCiAi;
  },
  sortCiAi: function(e, t, n) {
    const a = n === !0 ? -1 : 1, s = (i) => i[t], o = new Intl.Collator();
    return e.sort((i, r) => {
      let l = s(i), d = s(r);
      return l == null ? -1 * a : d == null ? 1 * a : tn(l) === !0 && tn(d) === !0 ? (l - d) * a : en(l) === !0 && en(d) === !0 ? Ri(l, d) * a : typeof l == "boolean" && typeof d == "boolean" ? (l - d) * a : ([l, d] = [l, d].map((u) => (u + "").toLocaleString()), o.compare(l, d) * a);
    });
  },
  selectedFunction: function(e, t, n) {
    this.$data.vueData[e][t] = n.value;
  },
  searchAutocomplete: function(e, t, n, a, s, o, i, r, l) {
    if (i.length < o) {
      l();
      return;
    }
    this.$http.post(s, this.objectToFormData({ terms: i, list: e, valueField: t, labelField: n, CTX: this.$data.vueData.CTX })).then((function(d) {
      var u = d.data.map(function(p) {
        return { value: p[t], label: p[n].toString() };
      });
      r((function() {
        this.$data.componentStates[a].options = u;
      }).bind(this));
    }).bind(this)).catch(function(d) {
      this.$q.notify(d.response.status + ":" + d.response.statusText), r([]);
    });
  },
  loadAutocompleteById: function(e, t, n, a, s, o, i, r) {
    var l;
    r != null ? l = this.$data.vueData[o][r][i] : l = this.$data.vueData[o][i], Array.isArray(l) ? l.forEach((d) => this.loadMissingAutocompleteOption(e, t, n, a, s, d)) : this.loadMissingAutocompleteOption(e, t, n, a, s, l);
  },
  loadMissingAutocompleteOption: function(e, t, n, a, s, o) {
    !o || this.$data.componentStates[a].options.filter((function(i) {
      return i.value === o;
    }).bind(this)).length > 0 || (this.$data.componentStates[a].loading = !0, this.$http.post(s, this.objectToFormData({ value: o, list: e, valueField: t, labelField: n, CTX: this.$data.vueData.CTX })).then((function(i) {
      var r = i.data.map(function(l) {
        return { value: l[t], label: l[n].toString() };
      });
      this.$data.componentStates[a].options = this.$data.componentStates[a].options.concat(r);
    }).bind(this)).catch((function(i) {
      this.$q.notify(i.response.status + ":" + i.response.statusText);
    }).bind(this)).then((function() {
      this.$data.componentStates[a].loading = !1;
    }).bind(this)));
  },
  decodeDate: function(e, t) {
    return e === C.date.formatDate(C.date.extractDate(e, "DD/MM/YYYY"), "DD/MM/YYYY") ? C.date.formatDate(C.date.extractDate(e, "DD/MM/YYYY"), t) : e;
  },
  encodeDate: function(e, t) {
    return e === C.date.formatDate(C.date.extractDate(e, t), t) ? C.date.formatDate(C.date.extractDate(e, t), "DD/MM/YYYY") : e;
  },
  decodeDatetime: function(e, t) {
    return e === C.date.formatDate(C.date.extractDate(e, "DD/MM/YYYY HH:mm"), "DD/MM/YYYY HH:mm") ? C.date.formatDate(C.date.extractDate(e, "DD/MM/YYYY HH:mm"), t) : e;
  },
  encodeDatetime: function(e, t) {
    return e === C.date.formatDate(C.date.extractDate(e, t), t) ? C.date.formatDate(C.date.extractDate(e, t), "DD/MM/YYYY HH:mm") : e;
  },
  sortDatesAsString: function(e) {
    return function(t, n, a, s) {
      return C.date.extractDate(t, e).getTime() > C.date.extractDate(n, e).getTime() ? 1 : -1;
    };
  },
  goTo: function(e) {
    window.location = e;
  },
  openModal: function(e, t, n) {
    if (t) {
      var a = t;
      if (n && Object.keys(n).length > 0) {
        var s = Object.keys(n).map(function(o) {
          return o + "=" + n[o];
        }).join("&");
        a = a + "?" + s;
      }
      this.$data.componentStates[e].srcUrl = a;
    }
    this.$data.componentStates[e].opened = !0;
  },
  toogleFacet: function(e, t, n) {
    let a = this.$data.vueData;
    var s = !1;
    a[n + "_facets"].forEach(function(i) {
      i.code === e && (s = i.multiple);
    });
    var o = a[n + "_selectedFacets"][e];
    o ? o.includes(t) ? s ? o.splice(o.indexOf(t), 1) : o.splice(0) : o.push(t) : a[n + "_selectedFacets"][e] = [t], this.search(n);
  },
  search: C.debounce(function(e) {
    let t = this.$data.componentStates, n = this.$data.vueData;
    var a = e + "_selectedFacets", s = n[e + "_criteriaContextKey"], o = this.vueDataParams([s]);
    o.append(a, JSON.stringify(n[a]));
    var i = t[e + "Search"].searchUrl, r = t[e + "Search"].collectionComponentId;
    if (t[r].pagination && t[r].pagination.sortBy) {
      var l = t[r].pagination;
      let d = t[r].columns.find((u) => u.name === l.sortBy);
      d.field != null && o.append("sortFieldName", d.field), o.append("sortDesc", l.descending);
    }
    this.httpPostAjax(i, o, {
      onSuccess: function(d) {
        if (t[r].pagination) {
          var u = t[r].pagination;
          u.page = 1, u.rowsNumber = d.data.model[e + "_list"].length;
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
  obtainVueDataAccessor(e, t, n, a) {
    return n != null && n != "null" ? a != null ? {
      get: function() {
        return e.$data.vueData[t][a][n];
      },
      set: function(s) {
        e.$data.vueData[t][a][n] = s;
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
    let t = e.dataset.componentId, n = e.dataset.autoHeight, a = e.contentDocument ? e.contentDocument : e.contentWindow.document;
    n === "true" && (e.style.opacity = "0", setTimeout((function() {
      let s = this.getDocHeight(a) + 4 + "px";
      e.style.height = "", this.componentStates[t].height = s;
    }).bind(this), 1)), this.componentStates[t].loading = !1, e.style.opacity = "1";
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
    var a = t ? Array.isArray(t) ? this.vueDataParams(t) : t : [];
    let s = this.$data.vueData, o = this.$data.uiMessageStack, i = this.isFormData(a) ? a : this.objectToFormData(a);
    i.append("CTX", s.CTX), this.pushPendingAction(e), this.$http.post(e, i).then((function(r) {
      r.data.model.CTX && (s.CTX = r.data.model.CTX), Object.keys(r.data.model).forEach(function(l) {
        l != "CTX" && (s[l] = r.data.model[l]);
      }), Object.keys(r.data.uiMessageStack).forEach(function(l) {
        o[l] = r.data.uiMessageStack[l];
      }), n && n.onSuccess && n.onSuccess.call(this, r, window);
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
    const a = this.$data.uiMessageStack.objectFieldErrors, s = t.split("_")[0];
    if (a) {
      var o = n != null ? e + "[" + n + "]" : e;
      return ((r = (i = a == null ? void 0 : a[o]) == null ? void 0 : i[s]) == null ? void 0 : r.length) > 0;
    }
    return !1;
  },
  getErrorMessage: function(e, t, n) {
    const a = this.$data.uiMessageStack.objectFieldErrors, s = t.split("_")[0];
    if (a) {
      var o = n != null ? e + "[" + n + "]" : e;
      if (Object.prototype.hasOwnProperty.call(a, o) && a[o] && Object.prototype.hasOwnProperty.call(a[o], s))
        return a[o][s].join(", ");
    } else
      return "";
  },
  vueDataParams: function(e) {
    for (var t = new FormData(), n = 0; n < e.length; n++) {
      var a = e[n].split(".", 2), s = a[0], o = a[1], i = this.$data.vueData[s];
      i && typeof i == "object" && Array.isArray(i) === !1 ? o ? this._vueDataParamsKey(t, s, o, i) : Object.keys(i).forEach((function(r) {
        r.includes("_") || this._vueDataParamsKey(t, s, r, i);
      }).bind(this)) : i && Array.isArray(i) === !0 ? i.forEach((function(r, l) {
        o ? this._vueDataParamsKey(t, s + "][" + l, o, r) : Object.keys(r).forEach((function(d) {
          d.includes("_") || this._vueDataParamsKey(t, s + "][" + l, d, r);
        }).bind(this));
      }).bind(this)) : this.appendToFormData(t, "vContext[" + s + "]", i);
    }
    return t;
  },
  _vueDataParamsKey: function(e, t, n, a) {
    let s = a[n];
    Array.isArray(s) ? !s || s.length == 0 ? this.appendToFormData(e, "vContext[" + t + "][" + n + "]", "") : s.forEach((function(o, i) {
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
    let n, a;
    e.preventDefault(), e.originalEvent && e.originalEvent.clipboardData.getData ? (n = e.originalEvent.clipboardData.getData("text/plain"), this.$refs[t].runCmd("insertText", n)) : e.clipboardData && e.clipboardData.getData ? (n = e.clipboardData.getData("text/plain"), this.$refs[t].runCmd("insertText", n)) : window.clipboardData && window.clipboardData.getData && (a || (a = !0, this.$refs[t].runCmd("ms-pasteTextOnly", n)), a = !1);
  },
  editorHandlerFixHelper(e, t, n, a, s, o) {
    if (o.hasParents(e, !0))
      if (s.runCmd("formatBlock", a), o.range.commonAncestorContainer.hasChildNodes()) {
        for (var r = !1, l = o.range.startContainer; l && l !== o.el && l.parentNode !== o.range.commonAncestorContainer; )
          l = l.parentNode;
        for (var d = o.range.endContainer; d && d !== o.el && d.parentNode !== o.range.commonAncestorContainer; )
          d = d.parentNode;
        o.range.commonAncestorContainer.childNodes.forEach(
          function(u) {
            u === l && (r = !0), r && (u.outerHTML = u.outerHTML.replace(t, "")), u === d && (r = !1);
          }
        );
      } else
        for (var i = o.selection.focusNode.parentNode; i && i !== o.el; )
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
}, ji = {
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
    seconds: "s"
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
}, Hi = {
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
    seconds: "s"
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
var sn = {
  getBoundMethods: function(e, t) {
    let n = {};
    return Object.keys(t).forEach((a) => n[a] = t[a].bind(e)), n;
  },
  install: function(e, t) {
    if (e.component("v-chatbot", $n), e.component("v-commands", Tn), e.component("v-comments", Ln), e.component("v-extensions-store", Xn), e.component("v-facets", to), e.component("v-geopoint-input", lo), e.component("v-handles", yo), e.component("v-json-editor", Do), e.component("v-notifications", No), e.component("v-map", Go), e.component("v-map-layer", ia), e.component("v-tree", ga), e.component("v-file-upload", La), e.component("v-file-upload-quasar", ri), e.component("v-dashboard-chart", Pi), e.directive("alert-unsaved-updates", Ni), e.directive("autofocus", Bi), e.directive("if-unsaved-updates", Li), e.directive("minify", Ii), e.directive("scroll-spy", zi), !t.axios) {
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
          return sn.getBoundMethods($t, $t);
        }
      }
    });
  },
  methods: $t,
  initData: function(e, t) {
    e.vueData = t.vueData, e.componentStates = t.componentStates, e.uiMessageStack = t.uiMessageStack, e.vuiLang = t.vuiLang;
  },
  lang: {
    enUS: ji,
    fr: Hi
  }
};
window && (window.VertigoUi = sn);
export {
  sn as default
};
//# sourceMappingURL=vertigo-ui.es.js.map
