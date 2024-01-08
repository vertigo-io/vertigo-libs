const F = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, i] of t)
    n[o] = i;
  return n;
}, Xt = {
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
}, gt = window.Vue.renderList, wt = window.Vue.Fragment, N = window.Vue.openBlock, Te = window.Vue.createElementBlock, pe = window.Vue.resolveComponent, ie = window.Vue.createVNode, he = window.Vue.withCtx, K = window.Vue.createBlock, se = window.Vue.createCommentVNode, bt = window.Vue.toDisplayString, J = window.Vue.createElementVNode, Kt = window.Vue.withKeys, Wt = { class: "bot" }, Zt = { class: "q-pr-md" }, en = { class: "sys-chat" }, tn = { class: "q-pb-sm" }, nn = { class: "sys-chat non-selectable" }, on = { class: "text-blue-2 q-caption" }, an = { class: "row docs-btn" }, sn = { class: "message-processing sys-chat non-selectable" }, rn = { class: "non-selectable" }, ln = { class: "message-response row docs-btn q-pl-sm non-selectable" };
function cn(e, t, n, o, i, a) {
  const s = pe("q-rating"), r = pe("q-chat-message"), l = pe("q-btn"), c = pe("q-spinner-dots"), d = pe("q-scroll-area"), h = pe("q-input");
  return N(), Te("div", Wt, [
    ie(d, {
      class: "bg-grey-2 col-grow row q-pa-sm",
      ref: "scroller"
    }, {
      default: he(() => [
        J("div", Zt, [
          (N(!0), Te(wt, null, gt(e.messages, (u, p) => (N(), Te("div", { key: p }, [
            u.rating ? (N(), K(r, {
              class: "animate-fade",
              key: "msgRating-" + p,
              sent: u.sent,
              "bg-color": u.bgColor,
              avatar: u.avatar
            }, {
              default: he(() => [
                ie(s, {
                  modelValue: u.rating,
                  "onUpdate:modelValue": (f) => u.rating = f,
                  max: 5,
                  style: { "font-size": "2rem" },
                  readonly: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1032, ["sent", "bg-color", "avatar"])) : se("", !0),
            u.text ? (N(), K(r, {
              class: "animate-fade",
              key: "msg-" + p,
              label: u.label,
              sent: u.sent,
              "text-color": u.textColor,
              "bg-color": u.bgColor,
              name: u.name,
              avatar: u.avatar,
              text: u.text,
              stamp: u.stamp
            }, null, 8, ["label", "sent", "text-color", "bg-color", "name", "avatar", "text", "stamp"])) : se("", !0)
          ]))), 128)),
          J("div", en, [
            e.error ? (N(), K(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "orange-4",
              "text-color": "black",
              size: "12"
            }, {
              default: he(() => [
                J("div", tn, bt(e.$q.lang.vui.chatbot.errorMessage), 1),
                ie(l, {
                  class: "full-width",
                  onClick: t[0] || (t[0] = (u) => a.askBot(e.lastPayload)),
                  label: e.$q.lang.vui.chatbot.tryAgain,
                  color: "white",
                  "text-color": "black"
                }, null, 8, ["label"])
              ]),
              _: 1
            })) : se("", !0)
          ]),
          J("div", nn, [
            e.inputConfig.buttons.length > 0 ? (N(), K(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "primary",
              size: "12"
            }, {
              default: he(() => [
                J("div", on, bt(e.$q.lang.vui.suggestedAnswers), 1),
                J("div", an, [
                  (N(!0), Te(wt, null, gt(e.inputConfig.buttons, (u, p) => (N(), K(l, {
                    class: "full-width",
                    key: "repChatBtn-" + p,
                    onClick: (f) => a.postAnswerBtn(u),
                    label: u.title,
                    color: "white",
                    "text-color": "black"
                  }, null, 8, ["onClick", "label"]))), 128))
                ])
              ]),
              _: 1
            })) : se("", !0)
          ]),
          J("div", sn, [
            e.processing ? (N(), K(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "grey-4"
            }, {
              default: he(() => [
                ie(c, { size: "2em" })
              ]),
              _: 1
            })) : se("", !0)
          ]),
          J("div", rn, [
            e.inputConfig.showRating ? (N(), K(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "primary",
              sent: ""
            }, {
              default: he(() => [
                ie(s, {
                  modelValue: e.rating,
                  "onUpdate:modelValue": t[1] || (t[1] = (u) => e.rating = u),
                  max: 4,
                  style: { "font-size": "2rem" }
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })) : se("", !0)
          ])
        ])
      ]),
      _: 1
    }, 512),
    J("div", ln, [
      ie(h, {
        type: e.inputConfig.modeTextarea ? "textarea" : "text",
        ref: "input",
        onKeyup: t[2] || (t[2] = Kt((u) => e.inputConfig.modeTextarea || e.inputConfig.responseText.trim() === "" && e.inputConfig.rating === 0 ? !1 : a.postAnswerText(), ["enter"])),
        "max-height": 100,
        class: "col-grow",
        modelValue: e.inputConfig.responseText,
        "onUpdate:modelValue": t[3] || (t[3] = (u) => e.inputConfig.responseText = u),
        placeholder: e.$q.lang.vui.chatbot.inputPlaceholder,
        disable: e.processing || e.error,
        loading: e.processing
      }, null, 8, ["type", "modelValue", "placeholder", "disable", "loading"]),
      ie(l, {
        round: "",
        color: "primary",
        icon: "send",
        onClick: t[4] || (t[4] = (u) => a.postAnswerText()),
        disable: e.processing || e.inputConfig.responseText.trim() === "" && e.inputConfig.rating === 0
      }, null, 8, ["disable"]),
      n.devMode === !0 ? (N(), K(l, {
        key: 0,
        round: "",
        color: "red",
        icon: "refresh",
        onClick: a.restart
      }, null, 8, ["onClick"])) : se("", !0)
    ])
  ]);
}
const dn = /* @__PURE__ */ F(Xt, [["render", cn]]), un = {
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
          this.$data.commandAutocompleteOptions = this.$data.commands.map(function(i) {
            return {
              label: i.commandName,
              sublabel: i.descpription,
              value: i.commandName,
              command: i
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
    autocompleteParam: function(e, t, n, o, i) {
      if (n.length < 1) {
        i();
        return;
      }
      this.$http.get(this.baseUrl + "api/vertigo/commands/params/_autocomplete", { params: { terms: n, entityClass: e.paramType.actualTypeArguments[0] } }).then((function(a) {
        o((function() {
          var s = this.$data.paramsAutocompleteOptions.slice();
          s[t] = a.data.map(function(r) {
            return {
              label: r.label,
              value: r.urn
            };
          }), this.$data.paramsAutocompleteOptions = s;
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
}, ve = window.Vue.toDisplayString, L = window.Vue.openBlock, W = window.Vue.createElementBlock, yt = window.Vue.createCommentVNode, Be = window.Vue.resolveComponent, vt = window.Vue.withCtx, Oe = window.Vue.createBlock, _t = window.Vue.createElementVNode, fn = window.Vue.renderList, $t = window.Vue.Fragment, me = window.Vue.withKeys, Ze = window.Vue.createVNode, pn = window.Vue.createTextVNode, hn = {
  key: 0,
  style: { "line-height": "40px", opacity: "0.5", position: "fixed" }
}, mn = {
  class: "bg-grey-4 text-center vertical-middle text-bold q-px-md",
  style: { "line-height": "40px" }
}, gn = {
  key: 0,
  class: "row col items-center q-py-xs"
}, wn = {
  key: 1,
  class: "col"
}, bn = {
  key: 1,
  class: "row col items-center"
}, yn = {
  class: "col shadow-2 bg-secondary text-white q-px-md",
  style: { "line-height": "40px" }
};
function vn(e, t, n, o, i, a) {
  const s = Be("q-select"), r = Be("q-input"), l = Be("q-separator"), c = Be("q-btn");
  return L(), W("div", null, [
    e.isCommandCommited ? (L(), W("div", {
      key: 1,
      class: "row col-12 justify-between bg-white round-borders overflow-hidden shadow-2 text-black",
      onKeyup: t[0] || (t[0] = me((...d) => a.executeCommand && a.executeCommand(...d), ["enter"]))
    }, [
      _t("div", mn, ve(e.selectedCommand.commandName), 1),
      e.isExecuted ? (L(), W("div", bn, [
        _t("div", yn, ve(e.commandResult.display), 1),
        e.commandResult.targetUrl ? (L(), Oe(c, {
          key: 0,
          type: "a",
          href: n.baseUrl + e.commandResult.targetUrl,
          flat: ""
        }, {
          default: vt(() => [
            pn(ve(e.$q.lang.vui.commands.linkLabel), 1)
          ]),
          _: 1
        }, 8, ["href"])) : yt("", !0),
        Ze(c, {
          onClick: a.reset,
          flat: "",
          icon: "cancel",
          size: "sm",
          round: ""
        }, null, 8, ["onClick"])
      ])) : (L(), W("div", gn, [
        e.selectedCommand.commandParams && e.selectedCommand.commandParams.length > 0 ? (L(!0), W($t, { key: 0 }, fn(e.selectedCommand.commandParams, (d, h) => (L(), W($t, { key: d }, [
          d.paramType.rawType === "io.vertigo.commons.command.GenericUID" ? (L(), Oe(s, {
            key: 0,
            class: "col q-px-xs",
            "use-chips": "",
            "bg-color": "white",
            dense: "",
            borderless: "",
            "use-input": "",
            "input-debounce": "300",
            value: a.getParamValue(h),
            options: e.paramsAutocompleteOptions[h],
            autofocus: h === 0,
            "dropdown-icon": "search",
            onKeydown: me(function(u) {
              a.backIfNeeded(u, h === 0);
            }, ["delete"]),
            onKeyup: me(function(u) {
              a.backIfNeeded(u, h === 0);
            }, ["esc"]),
            onFilter: (u) => a.autocompleteParam(d, h, e.val, e.update, e.abort),
            "onUpdate:modelValue": (u) => a.selectParam(e.newValue, h),
            style: { height: "32px" }
          }, null, 8, ["value", "options", "autofocus", "onKeydown", "onKeyup", "onFilter", "onUpdate:modelValue"])) : (L(), Oe(r, {
            key: 1,
            class: "col q-px-xs",
            color: "secondary",
            borderless: "",
            modelValue: e.commandParamsValues[h].value,
            "onUpdate:modelValue": (u) => e.commandParamsValues[h].value = u,
            onKeydown: me((u) => a.backIfNeeded(e.event, h === 0), ["delete"]),
            onKeyup: [
              me((u) => a.backIfNeeded(e.event, h === 0), ["esc"]),
              me((u) => a.handleEnter(h), ["enter"])
            ],
            autofocus: h === 0,
            dense: "",
            style: { height: "32px" }
          }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown", "onKeyup", "autofocus"])),
          Ze(l, { vertical: "" })
        ], 64))), 128)) : (L(), W("div", wn, ve(e.$q.lang.vui.commands.executeCommand), 1)),
        Ze(c, {
          onClick: a.executeCommand,
          flat: "",
          icon: "play_arrow",
          size: "sm",
          round: ""
        }, null, 8, ["onClick"])
      ]))
    ], 32)) : (L(), Oe(s, {
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
      default: vt(() => [
        e.text !== "" && e.selectedCommand.commandName && e.selectedCommand.commandName.startsWith(e.text) ? (L(), W("span", hn, ve(e.selectedCommand.commandName), 1)) : yt("", !0)
      ]),
      _: 1
    }, 8, ["placeholder", "onBlur", "onKeydown", "options", "onFilter", "onUpdate:modelValue"]))
  ]);
}
const _n = /* @__PURE__ */ F(un, [["render", vn]]), et = window.Quasar, $n = {
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
      let t = et.date.getDateDiff(Date.now(), e, "days");
      return t > 0 ? t + " days" : (t = et.date.getDateDiff(Date.now(), e, "hours"), t > 0 ? t + " hours" : (t = et.date.getDateDiff(Date.now(), e, "minutes"), t > 0 ? t + " min" : "Now"));
    }
  }
}, _e = window.Vue.toDisplayString, Ne = window.Vue.createTextVNode, B = window.Vue.resolveComponent, V = window.Vue.withCtx, ge = window.Vue.openBlock, Le = window.Vue.createBlock, tt = window.Vue.createCommentVNode, C = window.Vue.createVNode, xn = window.Vue.renderList, Cn = window.Vue.Fragment, xt = window.Vue.createElementBlock, Ct = window.Vue.createElementVNode, Vn = window.Vue.normalizeClass, kn = ["src"];
function qn(e, t, n, o, i, a) {
  const s = B("q-badge"), r = B("q-btn"), l = B("big"), c = B("q-item-label"), d = B("q-input"), h = B("q-item-section"), u = B("q-item"), p = B("q-separator"), f = B("q-avatar"), m = B("q-icon"), y = B("q-popup-edit"), b = B("q-list"), x = B("q-drawer");
  return ge(), xt("span", null, [
    C(r, {
      round: "",
      flat: n.flat,
      size: "lg",
      color: n.color,
      "text-color": n.textColor,
      icon: e.count > 0 ? n.icon : n.iconNone,
      onClick: t[0] || (t[0] = (g) => e.commentDrawer = !e.commentDrawer),
      class: "on-left",
      title: e.$q.lang.vui.comments.title
    }, {
      default: V(() => [
        e.count > 0 ? (ge(), Le(s, {
          key: 0,
          floating: "",
          small: "",
          color: "red",
          style: { right: "-.4em", top: "-.4em" }
        }, {
          default: V(() => [
            Ne(_e(e.count), 1)
          ]),
          _: 1
        })) : tt("", !0)
      ]),
      _: 1
    }, 8, ["flat", "color", "text-color", "icon", "title"]),
    C(x, {
      overlay: "",
      behavior: "mobile",
      width: 600,
      modelValue: e.commentDrawer,
      "onUpdate:modelValue": t[2] || (t[2] = (g) => e.commentDrawer = g),
      side: "right",
      style: { top: "58px" }
    }, {
      default: V(() => [
        C(b, null, {
          default: V(() => [
            C(c, { header: "" }, {
              default: V(() => [
                C(l, null, {
                  default: V(() => [
                    Ne(_e(e.$q.lang.vui.comments.title), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            C(u, null, {
              default: V(() => [
                C(h, null, {
                  default: V(() => [
                    C(d, {
                      class: "col",
                      type: "textarea",
                      autogrow: "",
                      modelValue: e.commentTextArea,
                      "onUpdate:modelValue": t[1] || (t[1] = (g) => e.commentTextArea = g),
                      label: e.$q.lang.vui.comments.inputLabel,
                      "stack-label": ""
                    }, null, 8, ["modelValue", "label"])
                  ]),
                  _: 1
                }),
                C(h, { side: "" }, {
                  default: V(() => [
                    C(r, {
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
            C(p),
            (ge(!0), xt(Cn, null, xn(e.list, (g) => (ge(), Le(u, {
              key: g.uuid,
              class: Vn(["items-start", { "cursor-pointer": g.author == n.connectedAccount }])
            }, {
              default: V(() => [
                C(h, { avatar: "" }, {
                  default: V(() => [
                    C(f, null, {
                      default: V(() => [
                        Ct("img", {
                          src: n.baseUrl + "x/accounts/api/" + g.author + "/photo"
                        }, null, 8, kn)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                C(h, null, {
                  default: V(() => [
                    C(c, null, {
                      default: V(() => [
                        Ne(_e(g.authorDisplayName), 1)
                      ]),
                      _: 2
                    }, 1024),
                    Ct("div", null, _e(g.msg), 1)
                  ]),
                  _: 2
                }, 1024),
                C(h, { side: "" }, {
                  default: V(() => [
                    C(c, { stamp: "" }, {
                      default: V(() => [
                        Ne(_e(a.toDelay(new Date(g.creationDate))), 1)
                      ]),
                      _: 2
                    }, 1024),
                    g.author == n.connectedAccount ? (ge(), Le(m, {
                      key: 0,
                      name: "edit"
                    })) : tt("", !0)
                  ]),
                  _: 2
                }, 1024),
                g.author == n.connectedAccount ? (ge(), Le(y, {
                  key: 0,
                  buttons: !0,
                  onSave: (T) => a.updateComment(g),
                  "label-cancel": e.$q.lang.vui.comments.cancel,
                  "label-set": e.$q.lang.vui.comments.save
                }, {
                  default: V(() => [
                    C(d, {
                      type: "textarea",
                      autogrow: "",
                      modelValue: g.msg,
                      "onUpdate:modelValue": (T) => g.msg = T,
                      dense: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 2
                }, 1032, ["onSave", "label-cancel", "label-set"])) : tt("", !0)
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
const Sn = /* @__PURE__ */ F($n, [["render", qn]]), Dn = {
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
}, En = window.Vue.renderList, Fn = window.Vue.Fragment, nt = window.Vue.openBlock, ot = window.Vue.createElementBlock, $e = window.Vue.resolveComponent, Tn = window.Vue.normalizeStyle, we = window.Vue.createVNode, Me = window.Vue.withCtx, Vt = window.Vue.toDisplayString, ke = window.Vue.createElementVNode, Bn = { class: "row q-col-gutter-md" }, On = { class: "row col items-center" }, Nn = { class: "q-subheading text-bold" }, Ln = /* @__PURE__ */ ke("div", { class: "col" }, null, -1), Mn = { class: "row col q-body-2 text-justify" };
function Pn(e, t, n, o, i, a) {
  const s = $e("q-icon"), r = $e("q-item-section"), l = $e("q-toggle"), c = $e("q-item"), d = $e("q-card");
  return nt(), ot("div", Bn, [
    (nt(!0), ot(Fn, null, En(e.extensions, (h) => (nt(), ot("div", {
      class: "col-xs-12 col-lg-6 col-xl-4",
      key: h.name
    }, [
      we(d, null, {
        default: Me(() => [
          we(c, {
            class: "bg-white",
            style: { height: "100px" }
          }, {
            default: Me(() => [
              we(r, { avatar: "" }, {
                default: Me(() => [
                  we(s, {
                    name: h.icon,
                    size: "40px",
                    style: Tn(a.getIconStyle(h.color))
                  }, null, 8, ["name", "style"])
                ]),
                _: 2
              }, 1024),
              we(r, null, {
                default: Me(() => [
                  ke("div", On, [
                    ke("div", Nn, Vt(h.label), 1),
                    Ln,
                    ke("div", null, [
                      we(l, {
                        disable: "",
                        readonly: "",
                        color: "positive",
                        modelValue: h.enabled,
                        "onUpdate:modelValue": (u) => h.enabled = u
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  ke("div", Mn, Vt(h.description), 1)
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
const An = /* @__PURE__ */ F(Dn, [["render", Pn]]), Un = {
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
    this.facetValueTranslatorProvider(this);
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
}, xe = window.Vue.renderList, be = window.Vue.Fragment, k = window.Vue.openBlock, Y = window.Vue.createElementBlock, G = window.Vue.toDisplayString, Z = window.Vue.createTextVNode, re = window.Vue.resolveComponent, D = window.Vue.withCtx, ee = window.Vue.createBlock, le = window.Vue.createCommentVNode, te = window.Vue.createVNode, In = { class: "facets" }, jn = {
  key: 0,
  class: "selectedFacets q-pb-md"
};
function Rn(e, t, n, o, i, a) {
  const s = re("q-chip"), r = re("q-item-label"), l = re("q-checkbox"), c = re("q-item-section"), d = re("q-item"), h = re("q-btn"), u = re("q-list");
  return k(), Y("div", In, [
    a.isAnyFacetValueSelected() ? (k(), Y("div", jn, [
      (k(!0), Y(be, null, xe(n.selectedFacets, (p, f) => (k(), Y("div", { key: f }, [
        a.facetMultipleByCode(f) ? le("", !0) : (k(!0), Y(be, { key: 0 }, xe(p, (m) => (k(), ee(s, {
          clickable: "",
          class: "q-mb-sm",
          key: m.code,
          onClick: (y) => e.$emit("toogle-facet", f, m, n.contextKey),
          "icon-right": "cancel"
        }, {
          default: D(() => [
            Z(G(a.facetLabelByCode(f)) + ": " + G(a.facetValueLabelByCode(f, m)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]))), 128))
    ])) : le("", !0),
    (k(!0), Y(be, null, xe(n.facets, (p) => (k(), ee(u, {
      key: p.code,
      class: "facetValues q-py-none",
      dense: ""
    }, {
      default: D(() => [
        p.multiple || !a.isFacetSelected(p.code) ? (k(), Y(be, { key: 0 }, [
          te(r, { header: "" }, {
            default: D(() => [
              Z(G(p.label), 1)
            ]),
            _: 2
          }, 1024),
          (k(!0), Y(be, null, xe(a.selectedInvisibleFacets(p.code), (f) => (k(), ee(d, {
            key: f.code,
            class: "facetValue q-ml-md",
            clickable: "",
            onClick: (m) => e.$emit("toogle-facet", p.code, f.code, n.contextKey)
          }, {
            default: D(() => [
              p.multiple ? (k(), ee(c, {
                key: 0,
                side: ""
              }, {
                default: D(() => [
                  te(l, {
                    dense: "",
                    modelValue: !0,
                    "onUpdate:modelValue": (m) => e.$emit("toogle-facet", p.code, f.code, n.contextKey)
                  }, null, 8, ["onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024)) : le("", !0),
              te(c, null, {
                default: D(() => [
                  Z(G(a.facetValueLabelByCode(p.code, f.code)), 1)
                ]),
                _: 2
              }, 1024),
              te(c, { side: "" }, {
                default: D(() => [
                  Z(G(f.count), 1)
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1032, ["onClick"]))), 128)),
          (k(!0), Y(be, null, xe(a.visibleFacets(p.code, p.values), (f) => (k(), ee(d, {
            key: f.code,
            class: "facetValue q-ml-md",
            clickable: "",
            onClick: (m) => e.$emit("toogle-facet", p.code, f.code, n.contextKey)
          }, {
            default: D(() => [
              p.multiple ? (k(), ee(c, {
                key: 0,
                side: ""
              }, {
                default: D(() => [
                  te(l, {
                    dense: "",
                    modelValue: a.isFacetValueSelected(p.code, f.code),
                    "onUpdate:modelValue": (m) => e.$emit("toogle-facet", p.code, f.code, n.contextKey)
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024)) : le("", !0),
              te(c, null, {
                default: D(() => [
                  Z(G(a.facetValueLabelByCode(p.code, f.code)), 1)
                ]),
                _: 2
              }, 1024),
              te(c, { side: "" }, {
                default: D(() => [
                  Z(G(f.count), 1)
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1032, ["onClick"]))), 128)),
          te(d, null, {
            default: D(() => [
              p.values.length > n.maxValues && !a.isFacetExpanded(p.code) ? (k(), ee(h, {
                key: 0,
                flat: "",
                onClick: (f) => a.expandFacet(p.code),
                class: "q-ma-none"
              }, {
                default: D(() => [
                  Z(G(e.$q.lang.vui.facets.showAll), 1)
                ]),
                _: 2
              }, 1032, ["onClick"])) : le("", !0),
              p.values.length > n.maxValues && a.isFacetExpanded(p.code) ? (k(), ee(h, {
                key: 1,
                flat: "",
                onClick: (f) => a.reduceFacet(p.code),
                class: "q-ma-none"
              }, {
                default: D(() => [
                  Z(G(e.$q.lang.vui.facets.showLess), 1)
                ]),
                _: 2
              }, 1032, ["onClick"])) : le("", !0)
            ]),
            _: 2
          }, 1024)
        ], 64)) : le("", !0)
      ]),
      _: 2
    }, 1024))), 128))
  ]);
}
const Hn = /* @__PURE__ */ F(Un, [["render", Rn]]), zn = {
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
}, Jn = window.Vue.resolveComponent, kt = window.Vue.createVNode, Yn = window.Vue.openBlock, Gn = window.Vue.createElementBlock, Qn = { class: "row" };
function Xn(e, t, n, o, i, a) {
  const s = Jn("q-input");
  return Yn(), Gn("div", Qn, [
    kt(s, {
      label: "Longitude",
      "stack-label": "",
      modelValue: e.inputObject.lon,
      "onUpdate:modelValue": [
        t[0] || (t[0] = (r) => e.inputObject.lon = r),
        a.updateJson
      ],
      modelModifiers: { number: !0 }
    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
    kt(s, {
      label: "Latitude",
      "stack-label": "",
      modelValue: e.inputObject.lat,
      "onUpdate:modelValue": [
        t[1] || (t[1] = (r) => e.inputObject.lat = r),
        a.updateJson
      ],
      modelModifiers: { number: !0 }
    }, null, 8, ["modelValue", "onUpdate:modelValue"])
  ]);
}
const Kn = /* @__PURE__ */ F(zn, [["render", Xn]]), Wn = {
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
}, Ce = window.Vue.resolveComponent, Pe = window.Vue.createVNode, Ae = window.Vue.withCtx, Zn = window.Vue.renderList, eo = window.Vue.Fragment, at = window.Vue.openBlock, qt = window.Vue.createElementBlock, to = window.Vue.toDisplayString, no = window.Vue.createTextVNode, oo = window.Vue.resolveDirective, ao = window.Vue.createBlock, io = window.Vue.withDirectives;
function so(e, t, n, o, i, a) {
  const s = Ce("q-icon"), r = Ce("q-input"), l = Ce("q-item-section"), c = Ce("q-item"), d = Ce("q-list"), h = oo("ripple");
  return at(), qt("div", null, [
    Pe(r, {
      placeholder: e.$q.lang.vui.handles.placeholder,
      modelValue: e.text,
      "onUpdate:modelValue": t[0] || (t[0] = (u) => e.text = u),
      debounce: 300,
      onInput: a.searchHandles,
      autofocus: "",
      outlined: "",
      "bg-color": "white",
      dense: ""
    }, {
      prepend: Ae(() => [
        Pe(s, { name: "search" })
      ]),
      _: 1
    }, 8, ["placeholder", "modelValue", "onInput"]),
    Pe(d, {
      bordered: "",
      dense: "",
      separator: ""
    }, {
      default: Ae(() => [
        (at(!0), qt(eo, null, Zn(e.handles, (u) => io((at(), ao(c, {
          clickable: "",
          onClick: (p) => e.VUi.methods.goTo(n.baseUrl + "hw/" + u.code),
          key: u.code
        }, {
          default: Ae(() => [
            Pe(l, null, {
              default: Ae(() => [
                no(to(u.code), 1)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 2
        }, 1032, ["onClick"])), [
          [h]
        ])), 128))
      ]),
      _: 1
    })
  ]);
}
const ro = /* @__PURE__ */ F(Wn, [["render", so]]), lo = {
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
}, co = window.Vue.renderList, uo = window.Vue.Fragment, Ve = window.Vue.openBlock, it = window.Vue.createElementBlock, St = window.Vue.resolveComponent, Dt = window.Vue.createBlock;
window.Vue.createCommentVNode;
const fo = window.Vue.toDisplayString, po = window.Vue.createElementVNode, ho = window.Vue.withCtx, mo = window.Vue.normalizeClass, go = { class: "row" };
function wo(e, t, n, o, i, a) {
  const s = St("q-input"), r = St("q-field");
  return Ve(), it("div", go, [
    (Ve(!0), it(uo, null, co(e.jsonAsObject, (l, c) => (Ve(), it("div", {
      key: c,
      class: mo("col-" + 12 / n.cols)
    }, [
      n.readonly ? (Ve(), Dt(r, {
        key: 1,
        label: c,
        orientation: "vertical",
        "stack-label": "",
        borderless: "",
        readonly: ""
      }, {
        default: ho(() => [
          po("span", null, fo(l), 1)
        ]),
        _: 2
      }, 1032, ["label"])) : (Ve(), Dt(s, {
        key: 0,
        label: c,
        orientation: "vertical",
        "stack-label": "",
        modelValue: e.jsonAsObject[c],
        "onUpdate:modelValue": [(d) => e.jsonAsObject[c] = d, a.updateJson]
      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]))
    ], 2))), 128))
  ]);
}
const bo = /* @__PURE__ */ F(lo, [["render", wo]]), Ue = window.Quasar, yo = {
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
      const t = e.sort(function(a, s) {
        return s.creationDate - a.creationDate;
      });
      var n = [], o = this.list[0];
      if (!o)
        n = t;
      else
        for (var i = 0; i < t.length; i++)
          if (t[i].uuid != o.uuid) {
            if (t[i].creationDate < o.creationDate)
              break;
            n.push(t[i]);
          }
      this.list = t, this.count = t.length, this.hasNew = n.length > 0, this.firstCall || n.forEach((function(a) {
        this.$q.notify({
          type: "info",
          icon: this.toIcon(a.type),
          message: a.title,
          detail: a.content,
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
      let t = Ue.date.getDateDiff(Date.now(), e, "days");
      return t > 0 ? t + " " + this.$q.lang.vui.notifications.days : (t = Ue.date.getDateDiff(Date.now(), e, "hours"), t > 0 ? t + " " + this.$q.lang.vui.notifications.hours : (t = Ue.date.getDateDiff(Date.now(), e, "minutes"), t > 0 ? t + " " + this.$q.lang.vui.notifications.minutes : (t = Ue.date.getDateDiff(Date.now(), e, "seconds"), t + " " + this.$q.lang.vui.notifications.seconds)));
    }
  },
  beforeDestroy: function() {
    clearInterval(this.timer);
  }
}, Ie = window.Vue.toDisplayString, je = window.Vue.createTextVNode, ne = window.Vue.resolveComponent, A = window.Vue.withCtx, Re = window.Vue.openBlock, st = window.Vue.createBlock, vo = window.Vue.createCommentVNode, _o = window.Vue.renderList, $o = window.Vue.Fragment, xo = window.Vue.createElementBlock, Q = window.Vue.createVNode;
function Co(e, t, n, o, i, a) {
  const s = ne("q-badge"), r = ne("q-icon"), l = ne("q-item-section"), c = ne("q-item-label"), d = ne("q-item"), h = ne("q-list"), u = ne("q-menu"), p = ne("q-btn");
  return Re(), st(p, {
    round: "",
    flat: !e.hasNew,
    dense: "",
    color: e.hasNew ? "accent" : "secondary",
    "text-color": e.hasNew ? "accent-inverted" : "secondary-inverted",
    icon: e.count > 0 ? n.icon : n.iconNone,
    class: "on-left"
  }, {
    default: A(() => [
      e.count > 0 ? (Re(), st(s, {
        key: 0,
        color: "red",
        "text-color": "white",
        floating: ""
      }, {
        default: A(() => [
          je(Ie(e.count), 1)
        ]),
        _: 1
      })) : vo("", !0),
      Q(u, { class: "notifications" }, {
        default: A(() => [
          Q(h, { style: { width: "300px" } }, {
            default: A(() => [
              (Re(!0), xo($o, null, _o(e.list, (f) => (Re(), st(d, {
                key: f.uuid,
                tag: "a",
                href: f.targetUrl
              }, {
                default: A(() => [
                  Q(l, { avatar: "" }, {
                    default: A(() => [
                      Q(r, {
                        name: a.toIcon(f.type),
                        size: "2rem"
                      }, null, 8, ["name"])
                    ]),
                    _: 2
                  }, 1024),
                  Q(l, null, {
                    default: A(() => [
                      Q(c, null, {
                        default: A(() => [
                          je(Ie(f.title), 1)
                        ]),
                        _: 2
                      }, 1024),
                      Q(c, {
                        caption: "",
                        lines: "3"
                      }, {
                        default: A(() => [
                          je(Ie(f.content), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  Q(l, {
                    side: "",
                    top: ""
                  }, {
                    default: A(() => [
                      Q(c, { caption: "" }, {
                        default: A(() => [
                          je(Ie(a.toDelay(new Date(f.creationDate))), 1)
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
const Vo = /* @__PURE__ */ F(yo, [["render", Co]]), Et = window.Quasar, M = window.ol, ko = {
  props: {
    id: { type: String, required: !0 },
    initialZoomLevel: { type: Number },
    initialCenter: { type: Object }
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
    let e = new M.View(), t = new M.layer.Tile({
      preload: 4,
      source: new M.source.OSM()
    });
    this.olMap = new M.Map({
      interactions: M.interaction.defaults.defaults({
        onFocusOnly: !0
      }),
      target: this.$props.id,
      layers: [t],
      // Improve user experience by loading tiles while animating. Will make animations stutter on mobile or slow devices.
      loadTilesWhileAnimating: !0,
      view: e,
      controls: M.control.defaults.defaults().extend([new class extends M.control.Control {
        /**
         * @param {Object} [opt_options] Control options.
         */
        constructor(o) {
          const i = o || {}, a = document.createElement("div");
          a.className = "ol-v-custom-buttons ol-unselectable ol-control", super({
            element: a,
            target: i.target
          });
        }
      }()])
    }), this.$props.initialCenter && this.olMap.getView().setCenter(M.proj.fromLonLat([this.$props.initialCenter.lon, this.$props.initialCenter.lat])), this.olMap.on("moveend", (function(n) {
      let o = n.map.getView().calculateExtent(), i = M.proj.transformExtent(o, "EPSG:3857", "EPSG:4326"), a = M.extent.getTopLeft(i), s = M.extent.getBottomRight(i);
      Et.debounce(this.$emit("moveend", a, s), 300);
    }).bind(this)), setTimeout((function() {
      this.olMap.on("click", (function(n) {
        n.stopPropagation(), Et.debounce(this.$emit("click", M.proj.transform(n.coordinate, "EPSG:3857", "EPSG:4326")), 300);
      }).bind(this));
    }).bind(this), 300);
  }
}, qo = window.Vue.normalizeProps, So = window.Vue.guardReactiveProps, Do = window.Vue.renderSlot, Eo = window.Vue.openBlock, Fo = window.Vue.createElementBlock, To = ["id"];
function Bo(e, t, n, o, i, a) {
  return Eo(), Fo("div", { id: n.id }, [
    Do(e.$slots, "default", qo(So(e.$attrs)))
  ], 8, To);
}
const Oo = /* @__PURE__ */ F(ko, [["render", Bo]]), He = window.Quasar, w = window.ol, No = {
  props: {
    id: { type: String, required: !0 },
    list: { type: Array },
    cluster: { type: Array },
    object: { type: Object },
    objectEditable: { type: Boolean },
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
            this.$data.clusters = [];
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
        let i;
        if (typeof o[e] == "string" || o[e] instanceof String ? i = JSON.parse(o[e]) : i = o[e], i != null) {
          let a = new w.Feature({
            geometry: new w.geom.Point(w.proj.fromLonLat([i.lon, i.lat]))
          });
          return this.$props.nameField && (a.set("name", o[this.$props.nameField]), a.set("innerObject", o), a.set("totalCount", o.totalCount)), a;
        }
        return null;
      }).bind(this)), n = this.$data.clusters.filter(function(o) {
        return o[e] != null;
      }).map((function(o) {
        let i;
        if (typeof o[e] == "string" || o[e] instanceof String ? i = JSON.parse(o[e]) : i = o[e], i != null) {
          let a = new w.Feature({
            geometry: new w.geom.Point(w.proj.fromLonLat([i.lon, i.lat]))
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
        let e = 19, t = this.features.length == 1 ? Math.min(this.olMap.getView().getZoom() || e, e) : e, n = w.geom.Polygon.fromExtent(this.$data.vectorSource.getExtent());
        n.scale(1.2), this.olMap.getView().fit(n, { size: this.olMap.getSize(), maxZoom: t, duration: 750 });
      }
    },
    fetchList: function(e, t) {
      this.$http.get(this.baseUrl + '_geoSearch?topLeft="' + e.lat + "," + e.lon + '"&bottomRight="' + t.lat + "," + t.lon + '"', { timeout: 5 * 1e3 }).then((function(n) {
        this.$data.items = n.data, this.$data.vectorSource.clear(), this.$data.vectorSource.addFeatures(this.features);
      }).bind(this));
    },
    computeCoordString: function(e) {
      let t = Array.isArray(e) ? e.map((n) => n[this.$props.field]) : e[this.$props.field];
      return JSON.stringify(t);
    },
    updateMap: function() {
      this.$data.vectorSource.clear(), this.$data.vectorSource.addFeatures(this.features), this.fitView();
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
      const t = this.bounds(e), n = t.sw.lat, o = t.sw.lon, i = t.ne.lat, a = t.ne.lon;
      let s = (n + i) / 2, r = (o + a) / 2;
      return s = s.toFixed(Math.floor(2 - Math.log(i - n) / Math.LN10)), r = r.toFixed(Math.floor(2 - Math.log(a - o) / Math.LN10)), { lat: Number(s), lon: Number(r) };
    },
    /**
     * Returns SW/NE latitude/longitude bounds of specified geohash.
     *
     * @param   {string} geohash - Cell that bounds are required of.
     * @returns {{sw: {lat: number, lon: number}, ne: {lat: number, lon: number}}}
     * @throws  Invalid geohash.
     */
    bounds: function(e) {
      if (e.length == 0)
        throw new Error("Invalid geohash");
      e = e.toLowerCase();
      let t = !0, n = -90, o = 90, i = -180, a = 180;
      for (let r = 0; r < e.length; r++) {
        const l = e.charAt(r), c = this.$data.base32.indexOf(l);
        if (c == -1)
          throw new Error("Invalid geohash");
        for (let d = 4; d >= 0; d--) {
          const h = c >> d & 1;
          if (t) {
            const u = (i + a) / 2;
            h == 1 ? i = u : a = u;
          } else {
            const u = (n + o) / 2;
            h == 1 ? n = u : o = u;
          }
          t = !t;
        }
      }
      return {
        sw: { lat: n, lon: i },
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
      else
        this.$props.object && (this.$data.items = [this.$props.object]);
      this.$data.vectorSource = new w.source.Vector({
        features: this.features
      });
      let t = new w.source.Cluster({
        source: this.$data.vectorSource,
        distance: 2 * this.$props.clusterCircleSize
      }), n = new w.layer.Vector({
        source: t
      }), o = new w.style.Style({
        text: new w.style.Text({
          font: this.$props.markerSize + "px " + this.$props.markerFont,
          text: this.$props.markerIcon,
          fill: new w.style.Fill({ color: this.$props.markerColor }),
          offsetY: 0
        })
      }), i = {};
      if (n.setStyle((function(a) {
        let s = 0, r = a.get("features");
        for (let l = 0; l < r.length; l++) {
          let c = r[l].get("totalCount");
          s += c || 1;
        }
        if (!s || s == 1)
          return o;
        {
          let l = i[s];
          return l || (l = new w.style.Style({
            image: new w.style.Circle({
              radius: this.$props.clusterCircleSize,
              stroke: new w.style.Stroke({
                color: this.$props.clusterCircleBorderColor
              }),
              fill: new w.style.Fill({
                color: this.$props.clusterColor
              })
            }),
            text: new w.style.Text({
              text: s.toString(),
              font: this.$props.clusterTextSize + "px " + this.$props.clusterTextFont,
              fill: new w.style.Fill({
                color: this.$props.clusterTextColor
              })
            })
          }), i[s] = l), l;
        }
      }).bind(this)), this.olMap.addLayer(n), this.fitView(), this.olMap.on("moveend", (function(a) {
        let s = a.map.getView().calculateExtent(), r = w.proj.transformExtent(s, "EPSG:3857", "EPSG:4326"), l = w.extent.getTopLeft(r), c = w.extent.getBottomRight(r);
        this.baseUrl && He.debounce(this.fetchList({ lat: l[0], lon: l[1] }, { lat: c[0], lon: c[1] }), 300), He.debounce(this.$emit("moveend", l, c), 300);
      }).bind(this)), this.$props.nameField) {
        let a = new w.Overlay({
          element: this.$el.querySelector("#" + this.$props.id + "Popup"),
          positioning: "bottom-center",
          stopEvent: !1,
          offset: [0, -20]
        });
        this.olMap.addOverlay(a), this.olMap.on("click", (function(s) {
          let r = this.olMap.forEachFeatureAtPixel(
            s.pixel,
            function(l) {
              return l;
            }
          );
          if (r && r.get("features") && r.get("features").length == 1) {
            let l = r.getGeometry().getCoordinates();
            a.setPosition(l), this.$data.popupDisplayed = !0, this.$data.objectDisplayed = r.get("features")[0].get("innerObject"), s.stopPropagation(), He.debounce(this.$emit("click", w.proj.transform(l, "EPSG:3857", "EPSG:4326")), 300);
          } else
            this.$data.popupDisplayed = !1;
        }).bind(this)), this.olMap.on("pointermove", (function(s) {
          if (s.dragging) {
            this.$data.popupDisplayed = !1;
            return;
          }
          let r = this.olMap.getEventPixel(s.originalEvent), l = this.olMap.hasFeatureAtPixel(r);
          this.olMap.getTargetElement().style.cursor = l ? "pointer" : "";
        }).bind(this));
      } else
        this.olMap.on("click", (function(a) {
          let s = this.olMap.forEachFeatureAtPixel(
            a.pixel,
            function(r) {
              return r;
            }
          );
          if (s && s.get("features") && s.get("features").length == 1) {
            let r = s.getGeometry().getCoordinates();
            a.stopPropagation(), He.debounce(this.$emit("click", w.proj.transform(r, "EPSG:3857", "EPSG:4326")), 300);
          }
        }).bind(this));
      if (this.$props.object && this.$props.objectEditable) {
        let a = new w.interaction.Draw({
          source: this.$data.vectorSource,
          type: "Point"
        });
        a.on("drawend", (r) => {
          let l = r.feature, c = w.proj.toLonLat(l.getGeometry().getCoordinates());
          this.$data.vectorSource.clear(), this.olMap.removeInteraction(a), s.classList.remove("active"), this.$props.object[this.$props.field] = {
            lon: c[0],
            lat: c[1]
          };
        });
        const s = document.createElement("button");
        s.innerHTML = "&#9678;", s.addEventListener(
          "click",
          (r) => {
            r.preventDefault(), s.classList.contains("active") ? (this.olMap.removeInteraction(a), s.classList.remove("active")) : (this.olMap.addInteraction(a), a = this.olMap.getInteractions().getArray().slice(-1)[0], s.classList.add("active"));
          },
          !1
        ), this.olMap.getViewport().getElementsByClassName("ol-v-custom-buttons")[0].appendChild(s);
      }
    }).bind(this));
  }
}, Lo = window.Vue.renderSlot, Mo = window.Vue.toDisplayString, Ft = window.Vue.createElementVNode, Po = window.Vue.resolveComponent, Ao = window.Vue.withCtx, Tt = window.Vue.openBlock, Uo = window.Vue.createBlock, Io = window.Vue.createCommentVNode, jo = window.Vue.createElementBlock, Ro = ["id"], Ho = ["id"], zo = { class: "text-subtitle2" };
function Jo(e, t, n, o, i, a) {
  const s = Po("q-card");
  return Tt(), jo("div", { id: n.id }, [
    Ft("div", {
      id: n.id + "Popup"
    }, [
      e.popupDisplayed ? (Tt(), Uo(s, {
        key: 0,
        class: "q-px-md"
      }, {
        default: Ao(() => [
          Lo(e.$slots, "card", { objectDisplayed: e.objectDisplayed }, () => [
            Ft("div", zo, Mo(e.objectDisplayed[n.nameField]), 1)
          ])
        ]),
        _: 3
      })) : Io("", !0)
    ], 8, Ho)
  ], 8, Ro);
}
const Yo = /* @__PURE__ */ F(No, [["render", Jo]]), Go = window.Quasar, Qo = {
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
      Go.debounce(this.$refs.menu.updatePosition, 500)();
    },
    getSelectedLabel: function() {
      return this.$data.selectedNode ? this.$props.list.find((function(t) {
        return t[this.$props.keyField] === this.$data.selectedNode;
      }).bind(this))[this.$props.labelField] : null;
    },
    convertListToTree: function(e, t) {
      var n = {}, o, i = [], a, s = [];
      for (a = 0; a < e.length; a += 1)
        n[e[a][this.$props.keyField]] = a, s.push({ ...e[a], children: [] });
      for (a = 0; a < e.length; a += 1)
        o = s[a], o[this.$props.parentKeyField] ? s[n[o[this.$props.parentKeyField]]].children.push(o) : i.push(o);
      return t ? [s[n[t]]] : i;
    }
  }
}, ze = window.Vue.resolveComponent, rt = window.Vue.createVNode, Xo = window.Vue.toDisplayString, Ko = window.Vue.createElementVNode, Je = window.Vue.withCtx, Wo = window.Vue.normalizeProps, Zo = window.Vue.guardReactiveProps, ea = window.Vue.openBlock, ta = window.Vue.createBlock, na = {
  class: "self-center full-width no-outline",
  tabindex: "0"
};
function oa(e, t, n, o, i, a) {
  const s = ze("q-icon"), r = ze("q-tree"), l = ze("q-menu"), c = ze("q-field");
  return ea(), ta(c, Wo(Zo(e.$attrs)), {
    append: Je(() => [
      rt(s, { name: "arrow_drop_down" })
    ]),
    control: Je(() => [
      Ko("div", na, Xo(a.getSelectedLabel()), 1)
    ]),
    default: Je(() => [
      rt(l, {
        breakpoint: 600,
        fit: "",
        ref: "menu"
      }, {
        default: Je(() => [
          rt(r, {
            nodes: a.convertListToTree(e.$props.list, e.$props.subTreeKey),
            "node-key": e.$props.keyField,
            "label-key": e.$props.labelField,
            expanded: e.expandedNodes,
            "onUpdate:expanded": [
              t[0] || (t[0] = (d) => e.expandedNodes = d),
              a.handleExpanded
            ],
            selected: e.selectedNode,
            "onUpdate:selected": [
              t[1] || (t[1] = (d) => e.selectedNode = d),
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
const aa = /* @__PURE__ */ F(Qo, [["render", oa]]), ia = window.Quasar.format, { humanStorageSize: sa } = ia, ra = {
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
  emits: ["update:file-info-uris", "download-file"],
  computed: {},
  mounted() {
    this.changeIcon();
    var e = new URLSearchParams();
    this.fileInfoUris.forEach((t) => {
      e.append(this.fieldName, t);
    }), this.$http.get(this.url + "/fileInfos", { params: e, credentials: !1 }).then((function(t) {
      var n = t.data;
      this.files = n.map((o) => o);
    }).bind(this)).catch(
      (function(t) {
        t.response ? this.$q.notify(t.response.status + ":" + t.response.statusText + " Can't load file " + e) : this.$q.notify(t + " Can't load file " + e);
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
    start(e, t, n) {
      this.$refs.quasarUploader;
    },
    removeRemoteFile(e) {
      var t = this.files.indexOf(e), n = [...this.fileInfoUris], o = {};
      o[this.fieldName] = e.fileUri, this.$http.delete(this.url, { params: o, credentials: !1 }).then((function() {
        this.multiple ? (this.files.splice(t, 1), n.splice(t, 1)) : (this.files.splice(0), n.splice(0)), this.$emit("update:file-info-uris", n);
      }).bind(this)).catch((function(i) {
        this.$q.notify(i.response.status + ":" + i.response.statusText + " Can't remove temporary file");
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
    getGlobalSize(e) {
      var t = e.filter((o) => o.__status != "uploaded").reduce((o, i) => o + i.size, 0), n = this.files.reduce((o, i) => o + i.size, 0);
      return sa(t + n);
    }
  }
}, I = window.Vue.toDisplayString, Ye = window.Vue.createTextVNode, oe = window.Vue.resolveComponent, O = window.Vue.withCtx, j = window.Vue.createVNode, _ = window.Vue.openBlock, P = window.Vue.createBlock, q = window.Vue.createCommentVNode, X = window.Vue.createElementBlock, R = window.Vue.createElementVNode, Bt = window.Vue.renderList, lt = window.Vue.Fragment, la = window.Vue.normalizeClass, ca = window.Vue.mergeProps, da = window.Vue.createSlots, ua = { class: "row" }, fa = { class: "col column justify-center" }, pa = { class: "q-uploader__file-header row flex-center no-wrap" }, ha = { class: "q-uploader__file-header-content col" }, ma = { class: "q-uploader__title" }, ga = { class: "q-uploader__file-header row flex-center no-wrap" }, wa = { class: "q-uploader__file-header-content col" }, ba = { class: "q-uploader__title" }, ya = {
  key: 0,
  class: "q-field__after q-field__marginal row no-wrap items-center"
};
function va(e, t, n, o, i, a) {
  const s = oe("q-tooltip"), r = oe("q-btn"), l = oe("q-spinner"), c = oe("q-uploader-add-trigger"), d = oe("q-icon"), h = oe("q-circular-progress"), u = oe("q-field"), p = oe("q-uploader");
  return _(), P(p, ca({
    url: e.$props.url,
    "auto-upload": "",
    "field-name": e.$props.fieldName,
    multiple: e.$props.multiple,
    "max-files": e.$props.multiple ? void 0 : 1,
    headers: [{ name: "Accept", value: "application/json" }],
    onUploaded: a.uploadedFiles,
    readonly: e.$props.readonly || !a.globalCanAddFiles([])
  }, e.$attrs, { ref: "quasarUploader" }), da({
    list: O((f) => [
      R("div", ua, [
        j(u, {
          "label-width": 3,
          label: e.$props.simple ? e.$props.label : void 0,
          class: "col",
          orientation: "vertical",
          "stack-label": "",
          borderless: ""
        }, {
          control: O(() => [
            R("div", fa, [
              e.$props.readonly ? q("", !0) : (_(!0), X(lt, { key: 0 }, Bt(f.files, (m) => (_(), X(lt, {
                key: m.name
              }, [
                m.__status !== "uploaded" ? (_(), X("div", {
                  key: 0,
                  class: la(["q-uploader__file relative-position", {
                    "q-uploader__file--failed": m.__status === "failed",
                    "q-uploader__file--uploaded": m.__status === "uploaded"
                  }])
                }, [
                  R("div", pa, [
                    m.__status === "failed" ? (_(), P(d, {
                      key: 0,
                      class: "q-uploader__file-status",
                      name: e.$q.iconSet.type.negative,
                      color: "negative"
                    }, null, 8, ["name"])) : q("", !0),
                    j(d, {
                      class: "q-uploader__file-status",
                      name: m.type.indexOf("video/") === 0 ? "movie" : m.type.indexOf("image/") === 0 ? "photo" : m.type.indexOf("audio/") === 0 ? "audiotrack" : "insert_drive_file"
                    }, null, 8, ["name"]),
                    R("div", ha, [
                      R("div", ma, I(m.name), 1)
                    ]),
                    m.__status === "uploading" ? (_(), P(h, {
                      key: 1,
                      value: m.__progress,
                      min: 0,
                      max: 1,
                      indeterminate: m.__progress === 0
                    }, null, 8, ["value", "indeterminate"])) : q("", !0),
                    m.__status === "failed" ? (_(), P(r, {
                      key: 2,
                      round: "",
                      dense: "",
                      flat: "",
                      icon: e.$q.iconSet.uploader.clear,
                      onClick: (y) => f.removeFile(m)
                    }, null, 8, ["icon", "onClick"])) : q("", !0)
                  ])
                ], 2)) : q("", !0)
              ], 64))), 128)),
              (_(!0), X(lt, null, Bt(e.files, (m) => (_(), X("div", {
                key: m.name,
                class: "q-uploader__file relative-position q-uploader__file--uploaded"
              }, [
                R("div", ga, [
                  j(d, {
                    class: "q-uploader__file-status",
                    name: m.type.indexOf("video/") === 0 ? "movie" : m.type.indexOf("image/") === 0 ? "photo" : m.type.indexOf("audio/") === 0 ? "audiotrack" : "insert_drive_file"
                  }, null, 8, ["name"]),
                  R("div", wa, [
                    R("div", ba, I(m.name), 1)
                  ]),
                  e.$props.readonly ? q("", !0) : (_(), P(r, {
                    key: 0,
                    round: "",
                    dense: "",
                    flat: "",
                    icon: "delete",
                    onClick: (y) => a.removeRemoteFile(m)
                  }, null, 8, ["onClick"])),
                  j(r, {
                    round: "",
                    dense: "",
                    flat: "",
                    icon: "file_download",
                    onClick: (y) => e.$emit("download-file", m.fileUri)
                  }, null, 8, ["onClick"])
                ])
              ]))), 128))
            ])
          ]),
          _: 2
        }, 1032, ["label"]),
        e.$props.simple && !e.$props.readonly ? (_(), X("div", ya, [
          f.isUploading ? (_(), P(l, {
            key: 0,
            class: "q-uploader__spinner"
          })) : q("", !0),
          a.globalCanAddFiles(f.files) ? (_(), P(r, {
            key: 1,
            type: "a",
            icon: e.$q.iconSet.uploader.add,
            flat: "",
            dense: ""
          }, {
            default: O(() => [
              j(c)
            ]),
            _: 1
          }, 8, ["icon"])) : q("", !0),
          f.isUploading ? (_(), P(r, {
            key: 2,
            type: "a",
            icon: e.$q.iconSet.uploader.clear,
            flat: "",
            dense: "",
            onClick: f.abort
          }, {
            default: O(() => [
              j(s, null, {
                default: O(() => [
                  Ye(I(e.$q.lang.vui.uploader.clear), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : q("", !0)
        ])) : q("", !0)
      ])
    ]),
    _: 2
  }, [
    e.$props.simple ? {
      name: "header",
      fn: O(() => []),
      key: "0"
    } : {
      name: "header",
      fn: O((f) => [
        R("div", { class: "q-uploader__header-content flex flex-center no-wrap q-gutter-xs" }, [
          f.queuedFiles.length > 0 && !f.readonly ? (_(), P(r, {
            key: 0,
            type: "a",
            icon: e.$q.iconSet.uploader.clear_all,
            flat: "",
            dense: "",
            onClick: f.removeQueuedFiles
          }, {
            default: O(() => [
              j(s, null, {
                default: O(() => [
                  Ye(I(e.$q.lang.vui.uploader.clear_all), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : q("", !0),
          R("div", { class: "col column justify-center" }, [
            e.$props.label !== void 0 ? (_(), X("div", {
              key: 0,
              class: "q-uploader__title"
            }, I(e.$props.label), 1)) : q("", !0),
            f.isUploading ? (_(), X("div", {
              key: 1,
              class: "q-uploader__subtitle"
            }, I(a.getGlobalSize(f.files)) + " / " + I(f.uploadProgressLabel), 1)) : (_(), X("div", {
              key: 2,
              class: "q-uploader__subtitle"
            }, I(a.getGlobalSize(f.files)), 1))
          ]),
          f.isUploading ? (_(), P(l, {
            key: 1,
            class: "q-uploader__spinner"
          })) : q("", !0),
          f.isUploading && !f.readonly ? (_(), P(r, {
            key: 2,
            type: "a",
            icon: e.$q.iconSet.uploader.clear,
            flat: "",
            dense: "",
            onClick: f.abort
          }, {
            default: O(() => [
              j(s, null, {
                default: O(() => [
                  Ye(I(e.$q.lang.vui.uploader.clear), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : q("", !0),
          a.globalCanAddFiles(f.files) && !f.readonly ? (_(), P(r, {
            key: 3,
            type: "a",
            icon: e.$q.iconSet.uploader.add,
            flat: "",
            dense: ""
          }, {
            default: O(() => [
              j(c),
              j(s, null, {
                default: O(() => [
                  Ye(I(e.$q.lang.vui.uploader.add), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["icon"])) : q("", !0)
        ])
      ]),
      key: "1"
    }
  ]), 1040, ["url", "field-name", "multiple", "max-files", "onUploaded", "readonly"]);
}
const _a = /* @__PURE__ */ F(ra, [["render", va]]);
function pt(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Jt(e, t) {
  var n = Object.create(e.prototype);
  for (var o in t)
    n[o] = t[o];
  return n;
}
function Ee() {
}
var Se = 0.7, Xe = 1 / Se, ye = "\\s*([+-]?\\d+)\\s*", De = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", H = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $a = /^#([0-9a-f]{3,8})$/, xa = new RegExp(`^rgb\\(${ye},${ye},${ye}\\)$`), Ca = new RegExp(`^rgb\\(${H},${H},${H}\\)$`), Va = new RegExp(`^rgba\\(${ye},${ye},${ye},${De}\\)$`), ka = new RegExp(`^rgba\\(${H},${H},${H},${De}\\)$`), qa = new RegExp(`^hsl\\(${De},${H},${H}\\)$`), Sa = new RegExp(`^hsla\\(${De},${H},${H},${De}\\)$`), Ot = {
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
pt(Ee, We, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Nt,
  // Deprecated! Use color.formatHex.
  formatHex: Nt,
  formatHex8: Da,
  formatHsl: Ea,
  formatRgb: Lt,
  toString: Lt
});
function Nt() {
  return this.rgb().formatHex();
}
function Da() {
  return this.rgb().formatHex8();
}
function Ea() {
  return Yt(this).formatHsl();
}
function Lt() {
  return this.rgb().formatRgb();
}
function We(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = $a.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Mt(t) : n === 3 ? new E(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Ge(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Ge(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = xa.exec(e)) ? new E(t[1], t[2], t[3], 1) : (t = Ca.exec(e)) ? new E(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Va.exec(e)) ? Ge(t[1], t[2], t[3], t[4]) : (t = ka.exec(e)) ? Ge(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = qa.exec(e)) ? Ut(t[1], t[2] / 100, t[3] / 100, 1) : (t = Sa.exec(e)) ? Ut(t[1], t[2] / 100, t[3] / 100, t[4]) : Ot.hasOwnProperty(e) ? Mt(Ot[e]) : e === "transparent" ? new E(NaN, NaN, NaN, 0) : null;
}
function Mt(e) {
  return new E(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ge(e, t, n, o) {
  return o <= 0 && (e = t = n = NaN), new E(e, t, n, o);
}
function Fa(e) {
  return e instanceof Ee || (e = We(e)), e ? (e = e.rgb(), new E(e.r, e.g, e.b, e.opacity)) : new E();
}
function ut(e, t, n, o) {
  return arguments.length === 1 ? Fa(e) : new E(e, t, n, o ?? 1);
}
function E(e, t, n, o) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +o;
}
pt(E, ut, Jt(Ee, {
  brighter(e) {
    return e = e == null ? Xe : Math.pow(Xe, e), new E(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Se : Math.pow(Se, e), new E(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new E(fe(this.r), fe(this.g), fe(this.b), Ke(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Pt,
  // Deprecated! Use color.formatHex.
  formatHex: Pt,
  formatHex8: Ta,
  formatRgb: At,
  toString: At
}));
function Pt() {
  return `#${ue(this.r)}${ue(this.g)}${ue(this.b)}`;
}
function Ta() {
  return `#${ue(this.r)}${ue(this.g)}${ue(this.b)}${ue((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function At() {
  const e = Ke(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${fe(this.r)}, ${fe(this.g)}, ${fe(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ke(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function fe(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ue(e) {
  return e = fe(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Ut(e, t, n, o) {
  return o <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new U(e, t, n, o);
}
function Yt(e) {
  if (e instanceof U)
    return new U(e.h, e.s, e.l, e.opacity);
  if (e instanceof Ee || (e = We(e)), !e)
    return new U();
  if (e instanceof U)
    return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, o = e.b / 255, i = Math.min(t, n, o), a = Math.max(t, n, o), s = NaN, r = a - i, l = (a + i) / 2;
  return r ? (t === a ? s = (n - o) / r + (n < o) * 6 : n === a ? s = (o - t) / r + 2 : s = (t - n) / r + 4, r /= l < 0.5 ? a + i : 2 - a - i, s *= 60) : r = l > 0 && l < 1 ? 0 : s, new U(s, r, l, e.opacity);
}
function ft(e, t, n, o) {
  return arguments.length === 1 ? Yt(e) : new U(e, t, n, o ?? 1);
}
function U(e, t, n, o) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +o;
}
pt(U, ft, Jt(Ee, {
  brighter(e) {
    return e = e == null ? Xe : Math.pow(Xe, e), new U(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Se : Math.pow(Se, e), new U(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * t, i = 2 * n - o;
    return new E(
      ct(e >= 240 ? e - 240 : e + 120, i, o),
      ct(e, i, o),
      ct(e < 120 ? e + 240 : e - 120, i, o),
      this.opacity
    );
  },
  clamp() {
    return new U(It(this.h), Qe(this.s), Qe(this.l), Ke(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Ke(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${It(this.h)}, ${Qe(this.s) * 100}%, ${Qe(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function It(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Qe(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ct(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const ht = (e) => () => e;
function Gt(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Ba(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(o) {
    return Math.pow(e + o * t, n);
  };
}
function Oa(e, t) {
  var n = t - e;
  return n ? Gt(e, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : ht(isNaN(e) ? t : e);
}
function Na(e) {
  return (e = +e) == 1 ? qe : function(t, n) {
    return n - t ? Ba(t, n, e) : ht(isNaN(t) ? n : t);
  };
}
function qe(e, t) {
  var n = t - e;
  return n ? Gt(e, n) : ht(isNaN(e) ? t : e);
}
const La = function e(t) {
  var n = Na(t);
  function o(i, a) {
    var s = n((i = ut(i)).r, (a = ut(a)).r), r = n(i.g, a.g), l = n(i.b, a.b), c = qe(i.opacity, a.opacity);
    return function(d) {
      return i.r = s(d), i.g = r(d), i.b = l(d), i.opacity = c(d), i + "";
    };
  }
  return o.gamma = e, o;
}(1);
function Ma(e) {
  return function(t, n) {
    var o = e((t = ft(t)).h, (n = ft(n)).h), i = qe(t.s, n.s), a = qe(t.l, n.l), s = qe(t.opacity, n.opacity);
    return function(r) {
      return t.h = o(r), t.s = i(r), t.l = a(r), t.opacity = s(r), t + "";
    };
  };
}
const Pa = Ma(Oa);
let ae = { color: We, interpolateHsl: Pa, interpolateRgb: La };
function jt(e, t, n) {
  if (e != "DEFAULT") {
    var o, i = Aa;
    e == "RAINBOW" || e == "iRAINBOW" ? o = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#00FF00", "rgb(75, 0, 130)", "rgb(238, 130, 238)"] : e == "SPECTRUM" || e == "iSPECTRUM" ? (o = ["rgb(230, 30, 30)", "rgb(230, 230, 30)", "rgb(30, 230, 30)", "rgb(30, 230, 230)", "rgb(30, 30, 230)", "rgb(230, 30, 230)", "rgb(230, 30, 30)"], i = Ia) : e == "RED2GREEN" || e == "iRED2GREEN" ? o = ["rgb(255, 51, 51)", "rgb(250, 235, 0)", "rgb(51, 200, 51)"] : e == "GREEN2BLUE" || e == "iGREEN2BLUE" ? o = ["rgb(51, 153, 51)", "rgb(51, 153, 200)", "rgb(51, 51, 255)"] : e == "HEAT" || e == "iHEAT" ? o = ["rgb(255, 51, 51)", "rgb(255, 255, 51)", "rgb(51, 153, 51)", "rgb(51, 153, 255)"] : e == "GREEN:INTENSITY" || e == "iGREEN:INTENSITY" ? (o = ["rgb(51, 153, 51)", "rgb(170, 250, 170)"], i = Ua) : e == "ANDROID" || e == "iANDROID" ? o = ["#0099CC", "#9933CC", "#CC0000", "#FF8800", "#669900"] : (e == "ANDROID:LIGHT" || e == "iANDROID:LIGHT") && (o = ["#33B5E5", "#AA66CC", "#ff4444", "#ffbb33", "#99cc00"]), e.charAt(0) == "i" && (o = o.reverse());
    var s, a = o[0] == o[o.length - 1], s = i(o, t + (a ? 1 : 0));
    return n ? s.map(function(r, l) {
      var c = ae.color(r);
      return c.opacity = n, c.rgb();
    }) : s;
  }
}
function Aa(e, t) {
  return mt(e, t, function(n, o, i, a, s) {
    return ae.interpolateHsl(i, a)(n);
  });
}
function Ua(e, t) {
  return mt(e, t, function(n, o, i, a, s) {
    return ae.interpolateRgb(i, a)(n);
  });
}
function Ia(e, t) {
  return mt(e, t, function(n, o, i, a, s) {
    var r = { r: null, g: null, b: null }, l = o ? ae.rgb(o) : r, c = ae.rgb(i), d = ae.rgb(a), h = s ? ae.rgb(s) : r, u = Math.max(Math.min(Math.round(dt(n, l.r, c.r, d.r, h.r)), 255), 0), p = Math.max(Math.min(Math.round(dt(n, l.g, c.g, d.g, h.g)), 255), 0), f = Math.max(Math.min(Math.round(dt(n, l.b, c.b, d.b, h.b)), 255), 0);
    return ae.rgb(u, p, f);
  });
}
function mt(e, t, n) {
  if (t == 1)
    return [e[0]];
  for (var o = 0, i = new Array(), a = e.length, s = 0; (a - 1) % (t - 1) != 0 && s < 20; )
    s++, a = e.length + s * (e.length - 1);
  s++;
  for (var r = 0; r < e.length - 1; r++) {
    for (var l = r - 1 >= 0 ? e[r - 1] : null, c = e[r], d = e[r + 1], h = r + 2 < e.length ? e[r + 2] : null, u = o; u < s + 1; u++) {
      var p = n(u / s, l, c, d, h);
      i.push(p);
    }
    o = 1;
  }
  for (var f = new Array(), r = 0; r < t; r++) {
    var m = (i.length - 1) / (t - 1) * r;
    f.push(i[m]);
  }
  return f;
}
function dt(e, t, n, o, i) {
  var a = o - n, s = t ?? n - a, r = i ?? o + a;
  return 0.5 * (2 * n + (-s + o) * e + (2 * s - 5 * n + 4 * o - r) * e * e + (-s + 3 * n - 3 * o + r) * e * e * e);
}
const ja = {
  props: {
    type: { type: String, required: !0 },
    url: { type: String, required: !0 },
    queryClusteredMeasure: { type: Object, required: !1 },
    queryMeasures: { type: Array, required: !1 },
    queryDataFilter: { type: Object, required: !0 },
    queryTimeFilter: { type: Object, required: !0 },
    colors: { type: String, required: !0 },
    labels: { type: Object, required: !0 },
    queryGroupBy: { type: String, required: !0 },
    additionalOptions: { type: Object, required: !1 }
  },
  created: function() {
    this.fetchData();
  },
  data: function() {
    return {
      graphDataSets: []
    };
  },
  watch: {
    modelValue: {
      handler(e, t) {
      },
      deep: !0
    }
  },
  methods: {
    fetchData: function() {
      var e = this.buildQuery();
      this.$http.post(this.url, e).then((function(t) {
        var n = t.data, o = n.timedDataSeries ? n.timedDataSeries : n.tabularDataSeries, i = n.seriesNames;
        this.showChartJsChart(o, i, e, this.labels, this.colors, this.additionalOptions);
      }).bind(this));
    },
    buildQuery: function() {
      var e = { dataFilter: this.queryDataFilter, timeFilter: this.queryTimeFilter };
      return this.queryMeasures && (e.measures = this.queryMeasures), this.queryClusteredMeasure && (e.clusteredMeasure = this.queryClusteredMeasure), this.queryGroupBy && (e.groupBy = this.queryGroupBy), e;
    },
    showChartJsChart: function(e, t, n, o, i, a) {
      var s = e[0].time, r = o, l, c, d;
      if (this.type === "bubbles") {
        d = "bubble";
        var h = t.filter((y) => y !== n.groupBy), u = this.toChartJsBubblesData(e, h, o, n.groupBy);
        c = [{ data: u }], l = this.getChartJsBubblesOptions(e, h, n, o, a), this.setChartJsColorOptions(c, i, 0.5);
      } else if (this.type === "linechart")
        d = "line", c = this.toChartJsData(e, t, o, s, n.groupBy), l = this.getChartJsLineOptions(e, t, n, o, s, a), this.setChartJsColorOptions(c, i);
      else if (this.type === "stakedbarchart")
        d = "bar", c = this.toChartJsData(e, t, o, s, n.groupBy), l = this.getStackedOptions(e, t, n, o, s, a), this.setChartJsColorOptions(c, i);
      else if (this.type === "polararea") {
        d = "polarArea", c = this.toChartJsData(e, t, o, s, n.groupBy);
        var p = this.toChartJsPieData(c, o);
        c = p.datasets, r = p.labels, l = this.getPolarChartOptions(e, t, n, o, s, a), this.setChartJsPieColorOptions(c, i);
      } else if (this.type === "doughnut") {
        d = "doughnut";
        var h = t.filter((x) => x !== n.groupBy);
        c = this.toChartJsData(e, h, o, s, n.groupBy);
        var p = this.toChartJsPieData(c, o);
        c = p.datasets, r = p.labels, this.setChartJsPieColorOptions(c, i), l = {
          legend: {
            display: !0,
            position: "bottom"
          }
        };
      }
      var f = this.$.refs.graphCanvas, m = { ...l, ...a };
      new Chart(f, {
        type: d,
        data: {
          labels: r,
          datasets: c
        },
        options: m
      });
    },
    setChartJsColorOptions: function(e, t, n) {
      if (t)
        for (var o = jt(t, e.length, n), i = 0; i < e.length; i++)
          e[i].backgroundColor = o[i], e[i].fill = !0;
    },
    setChartJsPieColorOptions: function(e, t, n) {
      if (t)
        for (var o = 0; o < e.length; o++)
          e[o].backgroundColor = jt(t, e[o].data.length, n);
    },
    getChartJsBubblesOptions: function(e, t, n, o, i) {
      var a = this.getMaxRadius(e, t[2]), s = this.getAxisType(e, i, "xAxisType", t[0]), r = this.getAxisType(e, i, "yAxisType", t[1]);
      return {
        scales: {
          x: {
            type: s
          },
          y: {
            type: r
          }
        },
        elements: {
          point: {
            radius: function(l) {
              var c = l.dataIndex, d = l.dataset.data[c], h = l.chart.width, u = d.r_measure / a;
              return h / 24 * u;
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
              title: function(l) {
                var c = l[0];
                return c.dataset.data[c.dataIndex].name;
              },
              label: function(l) {
                var c = l.dataset.data[l.dataIndex];
                return [
                  o[t[0]] + " : " + Math.round(c.x),
                  o[t[1]] + " : " + Math.round(c.y),
                  o[t[2]] + " : " + Math.round(c.r_measure)
                ];
              }
            }
          }
        }
      };
    },
    getPolarChartOptions: function(e, t, n, o, i) {
      return {};
    },
    getAxisType: function(e, t, n, o) {
      var i = "linear";
      if (t && t[n])
        if (t[n] === "auto") {
          var a = getMinMax(e, o);
          a.max > 0 && a.min / a.max < 1e-3 && (i = "logarithmic");
        } else
          i = t[n];
      return i;
    },
    getChartJsLineOptions: function(e, t, n, o, i, a) {
      var s = {
        scales: {
          y: {
            ticks: {
              beginAtZero: !0
            }
          }
        },
        plugins: {
          tooltip: {
            mode: "index",
            callbacks: {
              label: function(r) {
                var l = r.dataset.data[r.dataIndex];
                return r.dataset.label + " : " + Math.floor(l.y);
              },
              title: function(r) {
                return "";
              }
            }
          }
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0
          }
        }
      };
      return i ? s.scales.x = {
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            hour: "HH:mm"
          }
        }
      } : s.scales.x = {
        type: "category"
      }, s;
    },
    getStackedOptions: function(e, t, n, o, i, a) {
      var s = this.getChartJsLineOptions(e, t, n, o, i, a);
      return s.scales.x.stacked = !0, s.scales.y.stacked = !0, s;
    },
    toChartJsBubblesData: function(e, t, n, o) {
      for (var i = new Array(), a = 0; a < e.length; a++) {
        var s = new Object();
        s.x = e[a].values[t[0]], s.y = e[a].values[t[1]];
        var r = e[a].values[t[2]];
        !this.isEmpty(e[a].values) && !r && (r = 0), s.name = e[a].values[o], s.r_measure = r, i.push(s);
      }
      return i;
    },
    getMaxRadius: function(e, t) {
      for (var n = 0, o = 0; o < e.length; o++) {
        var i = e[o].values[t];
        i > n && (n = i);
      }
      return Math.max(n, 1);
    },
    getMinMax: function(e, t) {
      for (var n = 0, o = 0, i = 0; i < e.length; i++) {
        var a = e[i].values[t];
        a > o && (o = a), a < n && (n = a);
      }
      return {
        min: n,
        max: o
      };
    },
    /** Conversion de données servers List<Instant, Map<NomMetric, value>> en données Chartjs.*/
    toChartJsData: function(e, t, n, o, i) {
      let a = function(p, f) {
        return p.indexOf(f, p.length - f.length) !== -1;
      };
      new Array();
      for (var s = new Array(), r = 0; r < t.length; r++) {
        var l = t[r], c = new Object();
        c.parsing = !1, n && n[l] && (c.label = n[l]), c.data = new Array();
        for (var d = 0; d < e.length; d++) {
          var h = o ? Date.parse(e[d].time) : e[d].values[i], u = e[d].values[l];
          !this.isEmpty(e[d].values) && !u && (u = 0), c.data[d] = {
            x: h,
            y: u
          };
        }
        c.label || (a(l, "count") ? c.label = "Quantit&eacute;" : a(l, "mean") ? c.label = "Moyenne" : a(l, "min") ? c.label = "Minimum" : a(l, "max") && (c.label = "Maximum")), s.push(c);
      }
      return s;
    },
    toChartJsPieData: function(e, t) {
      for (var n = new Array(), o = new Array(), i = 0; i < e[0].data.length; i++) {
        var a = e[0].data[i].x;
        t && t[e[0].data[i].x] && (a = t[e[0].data[i].x]), o.push(a), n.push(e[0].data[i].y);
      }
      return {
        datasets: [{ data: n }],
        labels: o
      };
    },
    isEmpty: function(e) {
      return Object.keys(e).length === 0;
    }
  }
}, Ra = window.Vue.openBlock, Ha = window.Vue.createElementBlock, za = { ref: "graphCanvas" };
function Ja(e, t, n, o, i, a) {
  return Ra(), Ha("canvas", za, null, 512);
}
const Ya = /* @__PURE__ */ F(ja, [["render", Ja]]), Ga = {
  mounted: function(e, t, n) {
    var o = t.value;
    if (!window.watcherUpdates && (window.watcherUpdates = {
      originalDocumentTitle: document.title,
      updates_detected: !1,
      acceptedUpdates: function() {
        window.watcherUpdates.updates_detected = !1, document.title = window.watcherUpdates.originalDocumentTitle;
      },
      beforeWindowUnload: function(s) {
        window.watcherUpdates.updates_detected && (s.preventDefault(), s.returnValue = `Voulez-vous quitter cette page ? 
 Les modifications que vous avez apportées ne seront peut-être pas enregistrées`);
      }
    }, window.addEventListener("beforeunload", window.watcherUpdates.beforeWindowUnload), t.instance.$root.uiMessageStack)) {
      var i = t.instance.$root.uiMessageStack, a = i.globalErrors.length > 0;
      for (let s of o.split(","))
        if (a = a || i.objectFieldErrors[s], a)
          break;
      a && (window.watcherUpdates.updates_detected = !0);
    }
    e.addEventListener("click", window.watcherUpdates.acceptedUpdates);
    for (let s of o.split(","))
      t.instance.$root.$watch("vueData." + s, function() {
        window.watcherUpdates.updates_detected = !0, document.title = "*" + window.watcherUpdates.originalDocumentTitle;
      }, { deep: !0 });
  },
  unmounted: function() {
    window.removeEventListener("beforeunload", window.watcherUpdates.beforeWindowUnload);
  }
}, Qa = {
  mounted: function(e, t, n) {
    var o = t.value;
    o && !window.autofocus && (window.autofocus = !0, e.focus());
  }
}, Xa = window.Vue.nextTick, Ka = {
  updated: function(e, t, n) {
    Xa(() => {
      !window.watcherUpdates || !window.watcherUpdates.updates_detected ? e.classList.add("hidden") : e.classList.remove("hidden");
    });
  }
}, ce = window.Vue, Wa = window.Quasar, Za = {
  created: function(e, t) {
    const n = t.value ? t.value.topOffset : null, o = t.value ? t.value.topOffsetEl : null, i = t.value ? t.value.leftOffset : null, a = t.value ? t.value.leftOffsetEl : null, s = e.querySelector(".mini");
    for (var r = 0; r < e.childNodes.length; r++) {
      var l = e.childNodes[r];
      l.classList && !l.classList.contains("mini") && l.classList.add("not-mini");
    }
    ce.minifyHandler = function() {
      var c = e.getBoundingClientRect().y + window.pageYOffset, d = e.getBoundingClientRect().x + window.pageXOffset;
      (n || o) && (c = ce.minifyComputeOffset(n, o, 0, "TOP")), (i || a) && (d = ce.minifyComputeOffset(i, a, 0, "LEFT"));
      var h = s.getBoundingClientRect().height, u = e.getBoundingClientRect().height;
      window.pageYOffset > u - h ? (s.classList.add("visible"), s.style.top = c + "px", s.style.left = d + "px") : (s.classList.remove("visible"), s.style.top = -h - c + "px");
    }, ce.minifyComputeOffset = function(c, d, h, u) {
      var p = h;
      if (c)
        p = c;
      else if (d) {
        var f = document.querySelector(d), m = f.getBoundingClientRect();
        u === "LEFT" ? p = m.width + m.x : u === "TOP" && (p = m.height + m.y);
      }
      return p;
    }, window.addEventListener("scroll", ce.minifyHandler), window.addEventListener("resize", Wa.throttle(ce.minifyHandler, 50));
  },
  updated: function() {
    setTimeout(ce.minifyHandler, 50);
  },
  unmounted: function(e) {
    window.removeEventListener("scroll"), window.removeEventListener("resize");
    for (var t = 0; t < e.childNodes.length; t++) {
      var n = e.childNodes[t];
      n.classList && n.classList.remove("not-mini");
    }
  }
}, S = window.Vue, de = window.Quasar, ei = {
  created: function(e, t) {
    S.createDebugLine = function(p, f, m, y) {
      let b = document.createElement("div");
      return b.style.position = f, b.style.top = m + "px", b.style.border = "none", b.style.borderTop = y + " solid 1px", b.style.width = "100%", b.style.zIndex = "10000", b.style.padding = "0px", b.style.lineHeight = "0px", b.style.fontSize = "12px", b.style.color = y, b.innerHTML = p, document.querySelector("body").appendChild(b), b;
    };
    const n = t.value.debug ? t.value.debug : !1, o = t.value.startingOffset ? t.value.startingOffset : 24, i = t.value.fixedPos ? t.value.fixedPos : 24, a = o - i, s = t.value.scanner ? t.value.scanner : i + 30, r = e.querySelectorAll("a");
    r[0].classList.add("active"), r[0].ariaCurrent = "step";
    const l = de.scroll.getScrollTarget(document.querySelector(r[0].hash));
    let c = [], d, h;
    n && (d = S.createDebugLine("startLinear", "absolute", 0, "red"), h = S.createDebugLine("last", "absolute", 0, "red")), S.scrollSpyHandler = function() {
      if (n) {
        for (var p = e, f = 0, m = 0; p && !isNaN(p.offsetLeft) && !isNaN(p.offsetTop); )
          f += p.offsetLeft - p.scrollLeft, m += p.offsetTop - p.scrollTop, p = p.offsetParent;
        console.log("x: " + f), console.log("y: " + m + " (startingOffset)");
      }
      window.pageYOffset > a ? e.style.top || (e.style.top = i + "px", e.style.width || (e.style.width = e.getBoundingClientRect().width + "px"), e.classList.add("fixed")) : e.style.top && (e.classList.remove("fixed"), e.style.top = null, e.style.width = e.getBoundingClientRect().width + "px");
      for (var y = de.scroll.getVerticalScrollPosition(l), b = S.computeBreakPoints(y), x = 0; x < r.length; x++)
        b[x] <= y && (x >= r.length - 1 || y < b[x + 1]) ? (r[x].classList.add("active"), r[x].ariaCurrent = "step") : (r[x].classList.remove("active"), r[x].removeAttribute("aria-current"));
    }, S.computeBlockTop = function(p) {
      var f = [];
      for (let m = 0; m < r.length; m++) {
        const y = r[m].hash, b = document.querySelector(y);
        b && f.push(p + b.getBoundingClientRect().top);
      }
      return f;
    }, S.scrollTo = function(p) {
      p.preventDefault();
      const f = p.target.hash, m = document.querySelector(f);
      for (var y = de.scroll.getVerticalScrollPosition(l) + m.getBoundingClientRect().top - s, b = de.scroll.getVerticalScrollPosition(l), x = S.computeBlockTop(b), g = S.computeBreakPoints(b), T = 0; T < r.length; T++)
        if (r[T].hash == f) {
          x[T] - s < g[T + 1] || !g[T + 1] ? y = x[T] - s : y = g[T + 1] - 1;
          break;
        }
      var z = 200;
      de.scroll.setVerticalScrollPosition(l, y, z);
    }, S.computeBreakPoints = function(p) {
      var f = S.computeBlockTop(p);
      const m = window.innerHeight || document.documentElement.clientHeight, y = de.scroll.getScrollHeight(l), x = y - m;
      let g = x - m + s;
      for (let v = 1; v < r.length; v++)
        if (f[v] - s > g) {
          g = f[v] - s;
          break;
        }
      const T = x - g;
      var z = [];
      z.push(0);
      for (let v = 1; v < r.length; v++)
        f[v] - s > g ? z[v] = g + T * (f[v] - g) / (y - g) : z[v] = f[v] - s, z[v] = Math.round(z[v]);
      if (n) {
        for (let v = 1; v < r.length; v++) {
          var Fe;
          c.length < v ? (Fe = S.createDebugLine("navId#" + v, "absolute", 0, "red"), c.push(Fe)) : Fe = c[v - 1], Fe.style.top = z[v] + s + "px";
        }
        d.style.top = g + s + "px", h.style.top = x + s + "px";
      }
      return z;
    }, e.classList.add("scroll-spy-nav");
    for (var u = 0; u < r.length; u++)
      r[u].addEventListener("click", S.scrollTo);
    window.addEventListener("scroll", S.scrollSpyHandler), window.addEventListener("resize", de.throttle(S.scrollSpyHandler, 50));
  },
  unmounted: function(e) {
    e.classList.remove("scroll-spy-nav"), window.removeEventListener("scroll"), window.removeEventListener("resize");
    const t = e.querySelectorAll("a");
    for (var n = 0; n < t.length; n++)
      t.removeEventListener("click");
  }
};
function ti(e, t) {
  return new Date(e) - new Date(t);
}
function Rt(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function Ht(e) {
  return typeof e == "number" && isFinite(e);
}
const $ = window.Quasar, zt = {
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
      } else
        Object.prototype.hasOwnProperty.call(e.data, "message") && (t.message = e.data.message);
      if (e.status === 401) {
        t.message = this.$q.lang.vui.ajaxErrors.code401, this.$root.$emit("unauthorized", e);
        return;
      } else
        e.status === 403 ? t.message = this.$q.lang.vui.ajaxErrors.code403 : e.status === 404 ? t.message = this.$q.lang.vui.ajaxErrors.code404 : e.status === 405 ? t.message = this.$q.lang.vui.ajaxErrors.code405 : e.status === 422 ? (t.message = "", Object.keys(e.data).forEach((function(o) {
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
  getSafeValue: function(e, t, n) {
    return this.$data.vueData[e] && this.$data.vueData[e][t] ? this.$data.vueData[e][t][n] : null;
  },
  transformListForSelection: function(e, t, n, o, i) {
    let a = this.$data.vueData[e];
    if (o && (a = a.filter(o)), i != null && i.trim() !== "") {
      const s = this.unaccentLower(i);
      a = a.filter((r) => this.unaccentLower(r[n].toString()).indexOf(s) > -1);
    }
    return a.map(function(s) {
      return { value: s[t], label: s[n].toString() };
    });
  },
  unaccentLower: function(e) {
    return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  },
  paginationAndSortHandler: function(e) {
    var t = e.pagination;
    let n = this.$data.componentStates, o = this.$data.vueData;
    var i = n[t.componentId].pagination;
    (i.sortBy != t.sortBy || i.descending != t.descending) && t.sortBy && (t.sortUrl ? (t.page = 1, this.$http.post(t.sortUrl, this.objectToFormData({ sortFieldName: t.sortBy, sortDesc: t.descending, CTX: this.$data.vueData.CTX })).then((function(a) {
      o[t.listKey] = a.data.model[t.listKey], this.$data.vueData.CTX = a.data.model.CTX;
    }).bind(this))) : this.$refs[t.componentId].sortMethod.apply(this.$refs[t.componentId], [o[t.listKey], t.sortBy, t.descending])), n[t.componentId].pagination = t;
  },
  paginatedData: function(e, t) {
    var o = this.$data.componentStates[t].pagination;
    if (o.rowsPerPage != 0) {
      var i = (o.page - 1) * o.rowsPerPage, a = o.page * o.rowsPerPage;
      return this.$data.vueData[e].slice(i, a);
    }
    return this.$data.vueData[e];
  },
  createDefaultTableSort: function(e) {
    return this.$data.componentStates[e] ? (function(t, n, o) {
      let i = this.$data.componentStates[e].columns.find((a) => a.name === n);
      if (i.datetimeFormat) {
        const a = o === !0 ? -1 : 1, s = (r) => r[n];
        return t.sort((r, l) => {
          let c = s(r), d = s(l);
          return ($.date.extractDate(c, i.datetimeFormat).getTime() > $.date.extractDate(d, i.datetimeFormat).getTime() ? 1 : -1) * a;
        });
      } else
        return this.sortCiAi(t, n, o);
    }).bind(this) : this.sortCiAi;
  },
  sortCiAi: function(e, t, n) {
    const o = n === !0 ? -1 : 1, i = (s) => s[t], a = new Intl.Collator();
    return e.sort((s, r) => {
      let l = i(s), c = i(r);
      return l == null ? -1 * o : c == null ? 1 * o : Ht(l) === !0 && Ht(c) === !0 ? (l - c) * o : Rt(l) === !0 && Rt(c) === !0 ? ti(l, c) * o : typeof l == "boolean" && typeof c == "boolean" ? (l - c) * o : ([l, c] = [l, c].map((d) => (d + "").toLocaleString()), a.compare(l, c) * o);
    });
  },
  selectedFunction: function(e, t, n) {
    this.$data.vueData[e][t] = n.value;
  },
  searchAutocomplete: function(e, t, n, o, i, a, s, r, l) {
    if (s.length < a) {
      l();
      return;
    }
    this.$http.post(i, this.objectToFormData({ terms: s, list: e, valueField: t, labelField: n, CTX: this.$data.vueData.CTX })).then((function(c) {
      var d = c.data.map(function(h) {
        return { value: h[t], label: h[n].toString() };
      });
      r((function() {
        this.$data.componentStates[o].options = d;
      }).bind(this));
    }).bind(this)).catch(function(c) {
      this.$q.notify(c.response.status + ":" + c.response.statusText), r([]);
    });
  },
  loadAutocompleteById: function(e, t, n, o, i, a, s, r) {
    var l;
    r != null ? l = this.$data.vueData[a][r][s] : l = this.$data.vueData[a][s], Array.isArray(l) ? l.forEach((c) => this.loadMissingAutocompleteOption(e, t, n, o, i, c)) : this.loadMissingAutocompleteOption(e, t, n, o, i, l);
  },
  loadMissingAutocompleteOption: function(e, t, n, o, i, a) {
    !a || this.$data.componentStates[o].options.filter((function(s) {
      return s.value === a;
    }).bind(this)).length > 0 || (this.$data.componentStates[o].loading = !0, this.$http.post(i, this.objectToFormData({ value: a, list: e, valueField: t, labelField: n, CTX: this.$data.vueData.CTX })).then((function(s) {
      var r = s.data.map(function(l) {
        return { value: l[t], label: l[n].toString() };
      });
      this.$data.componentStates[o].options = this.$data.componentStates[o].options.concat(r);
    }).bind(this)).catch((function(s) {
      this.$q.notify(s.response.status + ":" + s.response.statusText);
    }).bind(this)).then((function() {
      this.$data.componentStates[o].loading = !1;
    }).bind(this)));
  },
  decodeDate: function(e, t) {
    return e === $.date.formatDate($.date.extractDate(e, "DD/MM/YYYY"), "DD/MM/YYYY") ? $.date.formatDate($.date.extractDate(e, "DD/MM/YYYY"), t) : e;
  },
  encodeDate: function(e, t) {
    return e === $.date.formatDate($.date.extractDate(e, t), t) ? $.date.formatDate($.date.extractDate(e, t), "DD/MM/YYYY") : e;
  },
  decodeDatetime: function(e, t) {
    return e === $.date.formatDate($.date.extractDate(e, "DD/MM/YYYY HH:mm"), "DD/MM/YYYY HH:mm") ? $.date.formatDate($.date.extractDate(e, "DD/MM/YYYY HH:mm"), t) : e;
  },
  encodeDatetime: function(e, t) {
    return e === $.date.formatDate($.date.extractDate(e, t), t) ? $.date.formatDate($.date.extractDate(e, t), "DD/MM/YYYY HH:mm") : e;
  },
  sortDatesAsString: function(e) {
    return function(t, n, o, i) {
      return $.date.extractDate(t, e).getTime() > $.date.extractDate(n, e).getTime() ? 1 : -1;
    };
  },
  goTo: function(e) {
    window.location = e;
  },
  openModal: function(e, t, n) {
    if (t) {
      var o = t;
      if (n && Object.keys(n).length > 0) {
        var i = Object.keys(n).map(function(a) {
          return a + "=" + n[a];
        }).join("&");
        o = o + "?" + i;
      }
      this.$data.componentStates[e].srcUrl = o;
    }
    this.$data.componentStates[e].opened = !0;
  },
  toogleFacet: function(e, t, n) {
    let o = this.$data.vueData;
    var i = !1;
    o[n + "_facets"].forEach(function(s) {
      s.code === e && (i = s.multiple);
    });
    var a = o[n + "_selectedFacets"][e];
    a ? a.includes(t) ? i ? a.splice(a.indexOf(t), 1) : a.splice(0) : a.push(t) : o[n + "_selectedFacets"][e] = [t], this.search(n);
  },
  search: $.debounce(function(e) {
    let t = this.$data.componentStates, n = this.$data.vueData;
    var o = e + "_selectedFacets", i = n[e + "_criteriaContextKey"], a = this.vueDataParams([i]);
    a.append(o, JSON.stringify(n[o]));
    var s = t[e + "Search"].searchUrl, r = t[e + "Search"].collectionComponentId;
    if (t[r].pagination && t[r].pagination.sortBy) {
      var l = t[r].pagination;
      a.append("sortFieldName", l.sortBy), a.append("sortDesc", l.descending);
    }
    this.httpPostAjax(s, a, {
      onSuccess: function(c) {
        if (t[r].pagination) {
          var d = t[r].pagination;
          d.page = 1, d.rowsNumber = c.data.model[e + "_list"].length;
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
      set: function(i) {
        e.$data.vueData[t][o][n] = i;
      }
    } : {
      get: function() {
        return e.$data.vueData[t][n];
      },
      set: function(i) {
        e.$data.vueData[t][n] = i;
      }
    } : {
      get: function() {
        return e.$data.vueData[t];
      },
      set: function(i) {
        e.$data.vueData[t] = i;
      }
    };
  },
  uploader_dragenter(e) {
    let t = this.$data.componentStates;
    t[e].dragover = !0;
  },
  uploader_dragleave(e) {
    let t = this.$data.componentStates;
    t[e].dragover = !1;
  },
  uploader_drop(e, t) {
    var n = this.$refs[t];
    n.addFiles(e.dataTransfer.files);
  },
  httpPostAjax: function(e, t, n) {
    var o = Array.isArray(t) ? this.vueDataParams(t) : t;
    let i = this.$data.vueData, a = this.$data.uiMessageStack, s = this.isFormData(o) ? o : this.objectToFormData(o);
    s.append("CTX", i.CTX), this.pushPendingAction(e), this.$http.post(e, s).then((function(r) {
      r.data.model.CTX && (i.CTX = r.data.model.CTX), Object.keys(r.data.model).forEach(function(l) {
        l != "CTX" && (i[l] = r.data.model[l]);
      }), Object.keys(r.data.uiMessageStack).forEach(function(l) {
        a[l] = r.data.uiMessageStack[l];
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
    const o = this.$data.uiMessageStack.objectFieldErrors;
    if (o) {
      var i = n != null ? e + "[" + n + "]" : e;
      return Object.prototype.hasOwnProperty.call(o, i) && o[i] && Object.prototype.hasOwnProperty.call(o[i], t) && o[i][t].length > 0;
    }
    return !1;
  },
  getErrorMessage: function(e, t, n) {
    const o = this.$data.uiMessageStack.objectFieldErrors;
    if (o) {
      var i = n != null ? e + "[" + n + "]" : e;
      if (Object.prototype.hasOwnProperty.call(o, i) && o[i] && Object.prototype.hasOwnProperty.call(o[i], t))
        return o[i][t].join(", ");
    } else
      return "";
  },
  vueDataParams: function(e) {
    for (var t = new FormData(), n = 0; n < e.length; n++) {
      var o = e[n].split(".", 2), i = o[0], a = o[1], s = this.$data.vueData[i];
      s && typeof s == "object" && Array.isArray(s) === !1 ? a ? this._vueDataParamsKey(t, i, a, s) : Object.keys(s).forEach((function(r) {
        r.includes("_") || this._vueDataParamsKey(t, i, r, s);
      }).bind(this)) : s && Array.isArray(s) === !0 ? s.forEach((function(r, l) {
        a ? this._vueDataParamsKey(t, i + "][" + l, a, r) : Object.keys(r).forEach((function(c) {
          c.includes("_") || this._vueDataParamsKey(t, i + "][" + l, c, r);
        }).bind(this));
      }).bind(this)) : this.appendToFormData(t, "vContext[" + i + "]", s);
    }
    return t;
  },
  _vueDataParamsKey: function(e, t, n, o) {
    let i = o[n];
    Array.isArray(i) ? !i || i.length == 0 ? this.appendToFormData(e, "vContext[" + t + "][" + n + "]", "") : i.forEach((function(a, s) {
      i[s] && typeof i[s] == "object" ? this.appendToFormData(e, "vContext[" + t + "][" + n + "]", i[s]._v_inputValue) : this.appendToFormData(e, "vContext[" + t + "][" + n + "]", i[s]);
    }).bind(this)) : i && typeof i == "object" ? this.appendToFormData(e, "vContext[" + t + "][" + n + "]", i._v_inputValue) : this.appendToFormData(e, "vContext[" + t + "][" + n + "]", i);
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
    if (e.target.nodeName === "INPUT")
      return;
    let n, o;
    e.preventDefault(), e.originalEvent && e.originalEvent.clipboardData.getData ? (n = e.originalEvent.clipboardData.getData("text/plain"), this.$refs[t].runCmd("insertText", n)) : e.clipboardData && e.clipboardData.getData ? (n = e.clipboardData.getData("text/plain"), this.$refs[t].runCmd("insertText", n)) : window.clipboardData && window.clipboardData.getData && (o || (o = !0, this.$refs[t].runCmd("ms-pasteTextOnly", n)), o = !1);
  },
  editorHandlerFixHelper(e, t, n, o, i, a) {
    if (a.hasParents(e, !0))
      if (i.runCmd("formatBlock", o), a.range.commonAncestorContainer.hasChildNodes()) {
        for (var r = !1, l = a.range.startContainer; l && l !== a.el && l.parentNode !== a.range.commonAncestorContainer; )
          l = l.parentNode;
        for (var c = a.range.endContainer; c && c !== a.el && c.parentNode !== a.range.commonAncestorContainer; )
          c = c.parentNode;
        a.range.commonAncestorContainer.childNodes.forEach(
          function(d) {
            d === l && (r = !0), r && (d.outerHTML = d.outerHTML.replace(t, "")), d === c && (r = !1);
          }
        );
      } else
        for (var s = a.selection.focusNode.parentNode; s && s !== a.el; )
          e.includes(s.nodeName.toLowerCase()) && (s.outerHTML = s.outerHTML.replace(t, "")), s = s.parentNode;
    else
      i.runCmd("formatBlock", n);
  },
  editorHandlerBlockquoteFix(e, t, n) {
    this.editorHandlerFixHelper(["blockquote"], /<\/?blockquote[^>]*\/?>/g, "blockquote", "div", t, n);
  },
  editorHandlerParagrapheFix(e, t, n) {
    this.editorHandlerFixHelper(["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9"], /<\/?h[1-9][^>]*\/?>/g, "div", "div", t, n);
  }
}, ni = {
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
    removeUploaded: "Remove Uploaded Files",
    remove: "Remove",
    add: "Pick Files",
    upload: "Upload Files",
    clear: "Abort Upload"
  },
  handles: {
    placeholder: "Enter a handle : format is type/code"
  }
}, oi = {
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
    removeUploaded: "Supprimer tous",
    remove: "Supprimer",
    add: "Ajouter un fichier",
    upload: "Envoyer",
    clear: "Annuler"
  },
  handles: {
    placeholder: "Entrer un handle de la forme type/code"
  }
};
var Qt = {
  getBoundMethods: function(e, t) {
    let n = {};
    return Object.keys(t).forEach((o) => n[o] = t[o].bind(e)), n;
  },
  install: function(e, t) {
    if (e.component("v-chatbot", dn), e.component("v-commands", _n), e.component("v-comments", Sn), e.component("v-extensions-store", An), e.component("v-facets", Hn), e.component("v-geopoint-input", Kn), e.component("v-handles", ro), e.component("v-json-editor", bo), e.component("v-notifications", Vo), e.component("v-map", Oo), e.component("v-map-layer", Yo), e.component("v-tree", aa), e.component("v-file-upload", _a), e.component("v-dashboard-chart", Ya), e.directive("alert-unsaved-updates", Ga), e.directive("autofocus", Qa), e.directive("if-unsaved-updates", Ka), e.directive("minify", Za), e.directive("scroll-spy", ei), !t.axios) {
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
          return Qt.getBoundMethods(this, zt);
        }
      }
    });
  },
  methods: zt,
  initData: function(e, t) {
    e.vueData = t.vueData, e.componentStates = t.componentStates, e.uiMessageStack = t.uiMessageStack, e.vuiLang = t.vuiLang;
  },
  lang: {
    enUS: ni,
    fr: oi
  }
};
window && (window.VertigoUi = Qt);
export {
  Qt as default
};
//# sourceMappingURL=vertigo-ui.es.js.map
