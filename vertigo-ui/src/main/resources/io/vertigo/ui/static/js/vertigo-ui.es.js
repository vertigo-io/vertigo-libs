const L = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Hn = {
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
}, Qt = window.Vue.renderList, Zt = window.Vue.Fragment, B = window.Vue.openBlock, Ke = window.Vue.createElementBlock, xe = window.Vue.resolveComponent, ge = window.Vue.createVNode, Se = window.Vue.withCtx, le = window.Vue.createBlock, we = window.Vue.createCommentVNode, en = window.Vue.toDisplayString, te = window.Vue.createElementVNode, Gn = window.Vue.withKeys, Jn = { class: "bot" }, Yn = { class: "q-pr-md" }, Wn = { class: "sys-chat" }, Xn = { class: "q-pb-sm" }, Kn = { class: "sys-chat non-selectable" }, Qn = { class: "text-blue-2 q-caption" }, Zn = { class: "row docs-btn" }, eo = { class: "message-processing sys-chat non-selectable" }, to = { class: "non-selectable" }, no = { class: "message-response row docs-btn q-pl-sm non-selectable" };
function oo(e, t, n, a, s, o) {
  const i = xe("q-rating"), r = xe("q-chat-message"), l = xe("q-btn"), d = xe("q-spinner-dots"), u = xe("q-scroll-area"), p = xe("q-input");
  return B(), Ke("div", Jn, [
    ge(u, {
      class: "bg-grey-2 col-grow row q-pa-sm",
      ref: "scroller"
    }, {
      default: Se(() => [
        te("div", Yn, [
          (B(!0), Ke(Zt, null, Qt(e.messages, (h, g) => (B(), Ke("div", { key: g }, [
            h.rating ? (B(), le(r, {
              class: "animate-fade",
              key: "msgRating-" + g,
              sent: h.sent,
              "bg-color": h.bgColor,
              avatar: h.avatar
            }, {
              default: Se(() => [
                ge(i, {
                  modelValue: h.rating,
                  "onUpdate:modelValue": (c) => h.rating = c,
                  max: 5,
                  style: { "font-size": "2rem" },
                  readonly: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1032, ["sent", "bg-color", "avatar"])) : we("", !0),
            h.text ? (B(), le(r, {
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
            }, null, 8, ["label", "sent", "text-color", "bg-color", "name", "avatar", "text", "stamp"])) : we("", !0)
          ]))), 128)),
          te("div", Wn, [
            e.error ? (B(), le(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "orange-4",
              "text-color": "black",
              size: "12"
            }, {
              default: Se(() => [
                te("div", Xn, en(e.$q.lang.vui.chatbot.errorMessage), 1),
                ge(l, {
                  class: "full-width",
                  onClick: t[0] || (t[0] = (h) => o.askBot(e.lastPayload)),
                  label: e.$q.lang.vui.chatbot.tryAgain,
                  color: "white",
                  "text-color": "black"
                }, null, 8, ["label"])
              ]),
              _: 1
            })) : we("", !0)
          ]),
          te("div", Kn, [
            e.inputConfig.buttons.length > 0 ? (B(), le(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "primary",
              size: "12"
            }, {
              default: Se(() => [
                te("div", Qn, en(e.$q.lang.vui.suggestedAnswers), 1),
                te("div", Zn, [
                  (B(!0), Ke(Zt, null, Qt(e.inputConfig.buttons, (h, g) => (B(), le(l, {
                    class: "full-width",
                    key: "repChatBtn-" + g,
                    onClick: (c) => o.postAnswerBtn(h),
                    label: h.title,
                    color: "white",
                    "text-color": "black"
                  }, null, 8, ["onClick", "label"]))), 128))
                ])
              ]),
              _: 1
            })) : we("", !0)
          ]),
          te("div", eo, [
            e.processing ? (B(), le(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "grey-4"
            }, {
              default: Se(() => [
                ge(d, { size: "2em" })
              ]),
              _: 1
            })) : we("", !0)
          ]),
          te("div", to, [
            e.inputConfig.showRating ? (B(), le(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "primary",
              sent: ""
            }, {
              default: Se(() => [
                ge(i, {
                  modelValue: e.rating,
                  "onUpdate:modelValue": t[1] || (t[1] = (h) => e.rating = h),
                  max: 4,
                  style: { "font-size": "2rem" }
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })) : we("", !0)
          ])
        ])
      ]),
      _: 1
    }, 512),
    te("div", no, [
      ge(p, {
        type: e.inputConfig.modeTextarea ? "textarea" : "text",
        ref: "input",
        onKeyup: t[2] || (t[2] = Gn((h) => e.inputConfig.modeTextarea || e.inputConfig.responseText.trim() === "" && e.inputConfig.rating === 0 ? !1 : o.postAnswerText(), ["enter"])),
        "max-height": 100,
        class: "col-grow",
        modelValue: e.inputConfig.responseText,
        "onUpdate:modelValue": t[3] || (t[3] = (h) => e.inputConfig.responseText = h),
        placeholder: e.$q.lang.vui.chatbot.inputPlaceholder,
        disable: e.processing || e.error,
        loading: e.processing
      }, null, 8, ["type", "modelValue", "placeholder", "disable", "loading"]),
      ge(l, {
        round: "",
        color: "primary",
        icon: "send",
        onClick: t[4] || (t[4] = (h) => o.postAnswerText()),
        disable: e.processing || e.inputConfig.responseText.trim() === "" && e.inputConfig.rating === 0
      }, null, 8, ["disable"]),
      n.devMode === !0 ? (B(), le(l, {
        key: 0,
        round: "",
        color: "red",
        icon: "refresh",
        onClick: o.restart
      }, null, 8, ["onClick"])) : we("", !0)
    ])
  ]);
}
const ao = /* @__PURE__ */ L(Hn, [["render", oo]]), io = {
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
}, Pe = window.Vue.toDisplayString, I = window.Vue.openBlock, de = window.Vue.createElementBlock, tn = window.Vue.createCommentVNode, Qe = window.Vue.resolveComponent, nn = window.Vue.withCtx, Ze = window.Vue.createBlock, on = window.Vue.createElementVNode, so = window.Vue.renderList, an = window.Vue.Fragment, ke = window.Vue.withKeys, Ct = window.Vue.createVNode, ro = window.Vue.createTextVNode, lo = {
  key: 0,
  style: { "line-height": "40px", opacity: "0.5", position: "fixed" }
}, co = {
  class: "bg-grey-4 text-center vertical-middle text-bold q-px-md",
  style: { "line-height": "40px" }
}, uo = {
  key: 0,
  class: "row col items-center q-py-xs"
}, fo = {
  key: 1,
  class: "col"
}, ho = {
  key: 1,
  class: "row col items-center"
}, po = {
  class: "col shadow-2 bg-secondary text-white q-px-md",
  style: { "line-height": "40px" }
};
function mo(e, t, n, a, s, o) {
  const i = Qe("q-select"), r = Qe("q-input"), l = Qe("q-separator"), d = Qe("q-btn");
  return I(), de("div", null, [
    e.isCommandCommited ? (I(), de("div", {
      key: 1,
      class: "row col-12 justify-between bg-white round-borders overflow-hidden shadow-2 text-black",
      onKeyup: t[0] || (t[0] = ke((...u) => o.executeCommand && o.executeCommand(...u), ["enter"]))
    }, [
      on("div", co, Pe(e.selectedCommand.commandName), 1),
      e.isExecuted ? (I(), de("div", ho, [
        on("div", po, Pe(e.commandResult.display), 1),
        e.commandResult.targetUrl ? (I(), Ze(d, {
          key: 0,
          type: "a",
          href: n.baseUrl + e.commandResult.targetUrl,
          flat: ""
        }, {
          default: nn(() => [
            ro(Pe(e.$q.lang.vui.commands.linkLabel), 1)
          ]),
          _: 1
        }, 8, ["href"])) : tn("", !0),
        Ct(d, {
          onClick: o.reset,
          flat: "",
          icon: "cancel",
          size: "sm",
          round: ""
        }, null, 8, ["onClick"])
      ])) : (I(), de("div", uo, [
        e.selectedCommand.commandParams && e.selectedCommand.commandParams.length > 0 ? (I(!0), de(an, { key: 0 }, so(e.selectedCommand.commandParams, (u, p) => (I(), de(an, { key: u }, [
          u.paramType.rawType === "io.vertigo.commons.command.GenericUID" ? (I(), Ze(i, {
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
            onKeydown: ke(function(h) {
              o.backIfNeeded(h, p === 0);
            }, ["delete"]),
            onKeyup: ke(function(h) {
              o.backIfNeeded(h, p === 0);
            }, ["esc"]),
            onFilter: (h) => o.autocompleteParam(u, p, e.val, e.update, e.abort),
            "onUpdate:modelValue": (h) => o.selectParam(e.newValue, p),
            style: { height: "32px" }
          }, null, 8, ["value", "options", "autofocus", "onKeydown", "onKeyup", "onFilter", "onUpdate:modelValue"])) : (I(), Ze(r, {
            key: 1,
            class: "col q-px-xs",
            color: "secondary",
            borderless: "",
            modelValue: e.commandParamsValues[p].value,
            "onUpdate:modelValue": (h) => e.commandParamsValues[p].value = h,
            onKeydown: ke((h) => o.backIfNeeded(e.event, p === 0), ["delete"]),
            onKeyup: [
              ke((h) => o.backIfNeeded(e.event, p === 0), ["esc"]),
              ke((h) => o.handleEnter(p), ["enter"])
            ],
            autofocus: p === 0,
            dense: "",
            style: { height: "32px" }
          }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown", "onKeyup", "autofocus"])),
          Ct(l, { vertical: "" })
        ], 64))), 128)) : (I(), de("div", fo, Pe(e.$q.lang.vui.commands.executeCommand), 1)),
        Ct(d, {
          onClick: o.executeCommand,
          flat: "",
          icon: "play_arrow",
          size: "sm",
          round: ""
        }, null, 8, ["onClick"])
      ]))
    ], 32)) : (I(), Ze(i, {
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
      default: nn(() => [
        e.text !== "" && e.selectedCommand.commandName && e.selectedCommand.commandName.startsWith(e.text) ? (I(), de("span", lo, Pe(e.selectedCommand.commandName), 1)) : tn("", !0)
      ]),
      _: 1
    }, 8, ["placeholder", "onBlur", "onKeydown", "options", "onFilter", "onUpdate:modelValue"]))
  ]);
}
const go = /* @__PURE__ */ L(io, [["render", mo]]), xt = window.Quasar, wo = {
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
      let t = xt.date.getDateDiff(Date.now(), e, "days");
      return t > 0 ? t + " days" : (t = xt.date.getDateDiff(Date.now(), e, "hours"), t > 0 ? t + " hours" : (t = xt.date.getDateDiff(Date.now(), e, "minutes"), t > 0 ? t + " min" : "Now"));
    }
  }
}, Ne = window.Vue.toDisplayString, et = window.Vue.createTextVNode, A = window.Vue.resolveComponent, T = window.Vue.withCtx, Ve = window.Vue.openBlock, tt = window.Vue.createBlock, St = window.Vue.createCommentVNode, E = window.Vue.createVNode, bo = window.Vue.renderList, yo = window.Vue.Fragment, sn = window.Vue.createElementBlock, rn = window.Vue.createElementVNode, vo = window.Vue.normalizeClass, $o = ["src"];
function _o(e, t, n, a, s, o) {
  const i = A("q-badge"), r = A("q-btn"), l = A("big"), d = A("q-item-label"), u = A("q-input"), p = A("q-item-section"), h = A("q-item"), g = A("q-separator"), c = A("q-avatar"), f = A("q-icon"), m = A("q-popup-edit"), b = A("q-list"), _ = A("q-drawer");
  return Ve(), sn("span", null, [
    E(r, {
      round: "",
      flat: n.flat,
      size: "lg",
      color: n.color,
      "text-color": n.textColor,
      icon: e.count > 0 ? n.icon : n.iconNone,
      onClick: t[0] || (t[0] = (y) => e.commentDrawer = !e.commentDrawer),
      class: "on-left",
      title: e.$q.lang.vui.comments.title
    }, {
      default: T(() => [
        e.count > 0 ? (Ve(), tt(i, {
          key: 0,
          floating: "",
          small: "",
          color: "red",
          style: { right: "-.4em", top: "-.4em" }
        }, {
          default: T(() => [
            et(Ne(e.count), 1)
          ]),
          _: 1
        })) : St("", !0)
      ]),
      _: 1
    }, 8, ["flat", "color", "text-color", "icon", "title"]),
    E(_, {
      overlay: "",
      behavior: "mobile",
      width: 600,
      modelValue: e.commentDrawer,
      "onUpdate:modelValue": t[2] || (t[2] = (y) => e.commentDrawer = y),
      side: "right",
      style: { top: "58px" }
    }, {
      default: T(() => [
        E(b, null, {
          default: T(() => [
            E(d, { header: "" }, {
              default: T(() => [
                E(l, null, {
                  default: T(() => [
                    et(Ne(e.$q.lang.vui.comments.title), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            E(h, null, {
              default: T(() => [
                E(p, null, {
                  default: T(() => [
                    E(u, {
                      class: "col",
                      type: "textarea",
                      autogrow: "",
                      modelValue: e.commentTextArea,
                      "onUpdate:modelValue": t[1] || (t[1] = (y) => e.commentTextArea = y),
                      label: e.$q.lang.vui.comments.inputLabel,
                      "stack-label": ""
                    }, null, 8, ["modelValue", "label"])
                  ]),
                  _: 1
                }),
                E(p, { side: "" }, {
                  default: T(() => [
                    E(r, {
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
            E(g),
            (Ve(!0), sn(yo, null, bo(e.list, (y) => (Ve(), tt(h, {
              key: y.uuid,
              class: vo(["items-start", { "cursor-pointer": y.author == n.connectedAccount }])
            }, {
              default: T(() => [
                E(p, { avatar: "" }, {
                  default: T(() => [
                    E(c, null, {
                      default: T(() => [
                        rn("img", {
                          src: n.baseUrl + "x/accounts/api/" + y.author + "/photo"
                        }, null, 8, $o)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                E(p, null, {
                  default: T(() => [
                    E(d, null, {
                      default: T(() => [
                        et(Ne(y.authorDisplayName), 1)
                      ]),
                      _: 2
                    }, 1024),
                    rn("div", null, Ne(y.msg), 1)
                  ]),
                  _: 2
                }, 1024),
                E(p, { side: "" }, {
                  default: T(() => [
                    E(d, { stamp: "" }, {
                      default: T(() => [
                        et(Ne(o.toDelay(new Date(y.creationDate))), 1)
                      ]),
                      _: 2
                    }, 1024),
                    y.author == n.connectedAccount ? (Ve(), tt(f, {
                      key: 0,
                      name: "edit"
                    })) : St("", !0)
                  ]),
                  _: 2
                }, 1024),
                y.author == n.connectedAccount ? (Ve(), tt(m, {
                  key: 0,
                  buttons: !0,
                  onSave: (V) => o.updateComment(y),
                  "label-cancel": e.$q.lang.vui.comments.cancel,
                  "label-set": e.$q.lang.vui.comments.save
                }, {
                  default: T(() => [
                    E(u, {
                      type: "textarea",
                      autogrow: "",
                      modelValue: y.msg,
                      "onUpdate:modelValue": (V) => y.msg = V,
                      dense: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 2
                }, 1032, ["onSave", "label-cancel", "label-set"])) : St("", !0)
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
const Co = /* @__PURE__ */ L(wo, [["render", _o]]), xo = {
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
}, So = window.Vue.renderList, ko = window.Vue.Fragment, kt = window.Vue.openBlock, Vt = window.Vue.createElementBlock, Ae = window.Vue.resolveComponent, Vo = window.Vue.normalizeStyle, qe = window.Vue.createVNode, nt = window.Vue.withCtx, ln = window.Vue.toDisplayString, Ue = window.Vue.createElementVNode, qo = { class: "row q-col-gutter-md" }, Do = { class: "row col items-center" }, Fo = { class: "q-subheading text-bold" }, Eo = { class: "row col q-body-2 text-justify" };
function To(e, t, n, a, s, o) {
  const i = Ae("q-icon"), r = Ae("q-item-section"), l = Ae("q-toggle"), d = Ae("q-item"), u = Ae("q-card");
  return kt(), Vt("div", qo, [
    (kt(!0), Vt(ko, null, So(e.extensions, (p) => (kt(), Vt("div", {
      class: "col-xs-12 col-lg-6 col-xl-4",
      key: p.name
    }, [
      qe(u, null, {
        default: nt(() => [
          qe(d, {
            class: "bg-white",
            style: { height: "100px" }
          }, {
            default: nt(() => [
              qe(r, { avatar: "" }, {
                default: nt(() => [
                  qe(i, {
                    name: p.icon,
                    size: "40px",
                    style: Vo(o.getIconStyle(p.color))
                  }, null, 8, ["name", "style"])
                ]),
                _: 2
              }, 1024),
              qe(r, null, {
                default: nt(() => [
                  Ue("div", Do, [
                    Ue("div", Fo, ln(p.label), 1),
                    t[0] || (t[0] = Ue("div", { class: "col" }, null, -1)),
                    Ue("div", null, [
                      qe(l, {
                        disable: "",
                        readonly: "",
                        color: "positive",
                        modelValue: p.enabled,
                        "onUpdate:modelValue": (h) => p.enabled = h
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  Ue("div", Eo, ln(p.description), 1)
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
const Oo = /* @__PURE__ */ L(xo, [["render", To]]), Mo = {
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
}, De = window.Vue.renderList, be = window.Vue.Fragment, S = window.Vue.openBlock, j = window.Vue.createElementBlock, ce = window.Vue.resolveComponent, q = window.Vue.createVNode, x = window.Vue.withCtx, dn = window.Vue.mergeProps, K = window.Vue.createBlock, ye = window.Vue.createCommentVNode, Lo = window.Vue.normalizeClass, ne = window.Vue.toDisplayString, ue = window.Vue.createTextVNode, Po = {
  key: 1,
  class: "facets"
}, No = {
  key: 0,
  class: "selectedFacets q-pb-md"
};
function Ao(e, t, n, a, s, o) {
  const i = ce("q-checkbox"), r = ce("q-item-section"), l = ce("q-item-label"), d = ce("q-chip"), u = ce("q-item"), p = ce("q-select"), h = ce("q-btn"), g = ce("q-list");
  return n.render === "selects" ? (S(), j("div", {
    key: 0,
    class: Lo(["row col q-gutter-md", { "horizontal-facets": n.layout === "horizontal" }])
  }, [
    (S(!0), j(be, null, De(n.facets.filter(n.facetFilter), (c) => (S(), j("div", {
      key: c.code,
      class: "facet-select"
    }, [
      c.multiple ? (S(), K(p, {
        key: 0,
        label: c.label,
        "model-value": n.selectedFacets[c.code],
        multiple: "",
        onAdd: (f) => e.$emit("toogle-facet", c.code, f.value.code, n.contextKey),
        onRemove: (f) => e.$emit("toogle-facet", c.code, f.value, n.contextKey),
        options: o.selectedInvisibleFacets(c.code).concat(c.values),
        "option-value": "code",
        "use-chips": "",
        outlined: "",
        "input-class": "no-wrap"
      }, {
        option: x(({ itemProps: f, opt: m, selected: b, toggleOption: _ }) => [
          q(u, dn({ ref_for: !0 }, f, {
            class: "facet-selection-option",
            dense: ""
          }), {
            default: x(() => [
              q(r, { avatar: "" }, {
                default: x(() => [
                  q(i, {
                    "model-value": b,
                    "onUpdate:modelValue": (y) => _(m),
                    size: "sm"
                  }, null, 8, ["model-value", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024),
              q(r, null, {
                default: x(() => [
                  q(l, {
                    innerHTML: m.label
                  }, null, 8, ["innerHTML"])
                ]),
                _: 2
              }, 1024),
              q(r, { side: "" }, {
                default: x(() => [
                  q(d, {
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
      }, 1032, ["label", "model-value", "onAdd", "onRemove", "options"])) : (S(), K(p, {
        key: 1,
        label: c.label,
        "model-value": n.selectedFacets[c.code].length > 0 ? n.selectedFacets[c.code][0] : null,
        "onUpdate:modelValue": (f) => e.$emit("toogle-facet", c.code, f || n.selectedFacets[c.code][0], n.contextKey),
        options: o.selectedInvisibleFacets(c.code).concat(c.values),
        "option-value": "code",
        clearable: "",
        "emit-value": "",
        "map-options": "",
        outlined: "",
        "input-class": "no-wrap"
      }, {
        option: x(({ itemProps: f, opt: m, selected: b, toggleOption: _ }) => [
          q(u, dn({ ref_for: !0 }, f, {
            class: "facet-selection-option",
            dense: ""
          }), {
            default: x(() => [
              q(r, null, {
                default: x(() => [
                  q(l, {
                    innerHTML: m.label
                  }, null, 8, ["innerHTML"])
                ]),
                _: 2
              }, 1024),
              q(r, { side: "" }, {
                default: x(() => [
                  q(d, {
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
  ], 2)) : (S(), j("div", Po, [
    o.isAnyFacetValueSelected() ? (S(), j("div", No, [
      (S(!0), j(be, null, De(n.selectedFacets, (c, f) => (S(), j("div", { key: f }, [
        o.facetMultipleByCode(f) ? ye("", !0) : (S(!0), j(be, { key: 0 }, De(c, (m) => (S(), K(d, {
          clickable: "",
          class: "q-mb-sm",
          key: m.code,
          onClick: (b) => e.$emit("toogle-facet", f, m, n.contextKey),
          "icon-right": "cancel"
        }, {
          default: x(() => [
            ue(ne(o.facetLabelByCode(f)) + ": " + ne(o.facetValueLabelByCode(f, m)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]))), 128))
    ])) : ye("", !0),
    (S(!0), j(be, null, De(n.facets.filter(n.facetFilter), (c) => (S(), K(g, {
      key: c.code,
      class: "facetValues q-py-none",
      dense: ""
    }, {
      default: x(() => [
        c.multiple || !o.isFacetSelected(c.code) ? (S(), j(be, { key: 0 }, [
          q(l, { header: "" }, {
            default: x(() => [
              ue(ne(c.label), 1)
            ]),
            _: 2
          }, 1024),
          (S(!0), j(be, null, De(o.selectedInvisibleFacets(c.code), (f) => (S(), K(u, {
            key: f.code,
            class: "facetValue q-ml-md",
            clickable: "",
            onClick: (m) => e.$emit("toogle-facet", c.code, f.code, n.contextKey)
          }, {
            default: x(() => [
              c.multiple ? (S(), K(r, {
                key: 0,
                side: ""
              }, {
                default: x(() => [
                  q(i, {
                    dense: "",
                    modelValue: !0,
                    "onUpdate:modelValue": (m) => e.$emit("toogle-facet", c.code, f.code, n.contextKey)
                  }, null, 8, ["onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024)) : ye("", !0),
              q(r, null, {
                default: x(() => [
                  ue(ne(o.facetValueLabelByCode(c.code, f.code)), 1)
                ]),
                _: 2
              }, 1024),
              q(r, { side: "" }, {
                default: x(() => [
                  ue(ne(f.count), 1)
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1032, ["onClick"]))), 128)),
          (S(!0), j(be, null, De(o.visibleFacets(c.code, c.values), (f) => (S(), K(u, {
            key: f.code,
            class: "facetValue q-ml-md",
            clickable: "",
            onClick: (m) => e.$emit("toogle-facet", c.code, f.code, n.contextKey)
          }, {
            default: x(() => [
              c.multiple ? (S(), K(r, {
                key: 0,
                side: ""
              }, {
                default: x(() => [
                  q(i, {
                    dense: "",
                    modelValue: o.isFacetValueSelected(c.code, f.code),
                    "onUpdate:modelValue": (m) => e.$emit("toogle-facet", c.code, f.code, n.contextKey)
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024)) : ye("", !0),
              q(r, null, {
                default: x(() => [
                  ue(ne(o.facetValueLabelByCode(c.code, f.code)), 1)
                ]),
                _: 2
              }, 1024),
              q(r, { side: "" }, {
                default: x(() => [
                  ue(ne(f.count), 1)
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1032, ["onClick"]))), 128)),
          q(u, null, {
            default: x(() => [
              c.values.length > n.maxValues && !o.isFacetExpanded(c.code) ? (S(), K(h, {
                key: 0,
                flat: "",
                onClick: (f) => o.expandFacet(c.code),
                class: "q-ma-none"
              }, {
                default: x(() => [
                  ue(ne(e.$q.lang.vui.facets.showAll), 1)
                ]),
                _: 2
              }, 1032, ["onClick"])) : ye("", !0),
              c.values.length > n.maxValues && o.isFacetExpanded(c.code) ? (S(), K(h, {
                key: 1,
                flat: "",
                onClick: (f) => o.reduceFacet(c.code),
                class: "q-ma-none"
              }, {
                default: x(() => [
                  ue(ne(e.$q.lang.vui.facets.showLess), 1)
                ]),
                _: 2
              }, 1032, ["onClick"])) : ye("", !0)
            ]),
            _: 2
          }, 1024)
        ], 64)) : ye("", !0)
      ]),
      _: 2
    }, 1024))), 128))
  ]));
}
const Uo = /* @__PURE__ */ L(Mo, [["render", Ao]]), Bo = {
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
}, Io = window.Vue.renderSlot, cn = window.Vue.vModelText, qt = window.Vue.createElementVNode, un = window.Vue.withDirectives, fn = window.Vue.createTextVNode, jo = { class: "inputs" };
function zo(e, t, n, a, s, o) {
  return Io(e.$slots, "default", { updateJson: o.updateJson }, () => [
    qt("div", jo, [
      t[4] || (t[4] = fn(" Longitude ")),
      un(qt("input", {
        "onUpdate:modelValue": [
          t[0] || (t[0] = (i) => e.inputObject.lon = i),
          t[1] || (t[1] = (...i) => o.updateJson && o.updateJson(...i))
        ]
      }, null, 512), [
        [
          cn,
          e.inputObject.lon,
          void 0,
          { number: !0 }
        ]
      ]),
      t[5] || (t[5] = fn(" Latitude ")),
      un(qt("input", {
        "onUpdate:modelValue": [
          t[2] || (t[2] = (i) => e.inputObject.lat = i),
          t[3] || (t[3] = (...i) => o.updateJson && o.updateJson(...i))
        ]
      }, null, 512), [
        [
          cn,
          e.inputObject.lat,
          void 0,
          { number: !0 }
        ]
      ])
    ])
  ]);
}
const Ro = /* @__PURE__ */ L(Bo, [["render", zo]]), Ho = {
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
}, Be = window.Vue.resolveComponent, ot = window.Vue.createVNode, at = window.Vue.withCtx, Go = window.Vue.renderList, Jo = window.Vue.Fragment, Dt = window.Vue.openBlock, hn = window.Vue.createElementBlock, Yo = window.Vue.toDisplayString, Wo = window.Vue.createTextVNode, Xo = window.Vue.resolveDirective, Ko = window.Vue.createBlock, Qo = window.Vue.withDirectives;
function Zo(e, t, n, a, s, o) {
  const i = Be("q-icon"), r = Be("q-input"), l = Be("q-item-section"), d = Be("q-item"), u = Be("q-list"), p = Xo("ripple");
  return Dt(), hn("div", null, [
    ot(r, {
      placeholder: e.$q.lang.vui.handles.placeholder,
      modelValue: e.text,
      "onUpdate:modelValue": t[0] || (t[0] = (h) => e.text = h),
      debounce: 300,
      onInput: o.searchHandles,
      autofocus: "",
      outlined: "",
      "bg-color": "white",
      dense: ""
    }, {
      prepend: at(() => [
        ot(i, { name: "search" })
      ]),
      _: 1
    }, 8, ["placeholder", "modelValue", "onInput"]),
    ot(u, {
      bordered: "",
      dense: "",
      separator: ""
    }, {
      default: at(() => [
        (Dt(!0), hn(Jo, null, Go(e.handles, (h) => Qo((Dt(), Ko(d, {
          clickable: "",
          onClick: (g) => e.VUi.methods.goTo(n.baseUrl + "hw/" + h.code),
          key: h.code
        }, {
          default: at(() => [
            ot(l, null, {
              default: at(() => [
                Wo(Yo(h.code), 1)
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
const ea = /* @__PURE__ */ L(Ho, [["render", Zo]]), ta = {
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
}, na = window.Vue.renderList, oa = window.Vue.Fragment, Ie = window.Vue.openBlock, Ft = window.Vue.createElementBlock, pn = window.Vue.resolveComponent, mn = window.Vue.createBlock;
window.Vue.createCommentVNode;
const aa = window.Vue.toDisplayString, ia = window.Vue.createElementVNode, sa = window.Vue.withCtx, ra = window.Vue.normalizeClass, la = { class: "row" };
function da(e, t, n, a, s, o) {
  const i = pn("q-input"), r = pn("q-field");
  return Ie(), Ft("div", la, [
    (Ie(!0), Ft(oa, null, na(e.jsonAsObject, (l, d) => (Ie(), Ft("div", {
      key: d,
      class: ra("col-" + 12 / n.cols)
    }, [
      n.readonly ? (Ie(), mn(r, {
        key: 1,
        label: d,
        orientation: "vertical",
        "stack-label": "",
        borderless: "",
        readonly: ""
      }, {
        default: sa(() => [
          ia("span", null, aa(l), 1)
        ]),
        _: 2
      }, 1032, ["label"])) : (Ie(), mn(i, {
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
const ca = /* @__PURE__ */ L(ta, [["render", da]]), je = window.Quasar, ua = {
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
      this.list = t, this.count = t.length, this.firstCall ? this.hasNew = n.length > 0 && je.date.getDateDiff(Date.now(), n[0].creationDate, "seconds") < 2 * 5 : (this.hasNew = n.length > 0, n.forEach((function(o) {
        this.$q.notify({
          type: "info",
          icon: this.toIcon(o.type),
          message: o.title,
          detail: o.content,
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
      let t = je.date.getDateDiff(Date.now(), e, "days");
      return t > 0 ? t + " " + this.$q.lang.vui.notifications.days : (t = je.date.getDateDiff(Date.now(), e, "hours"), t > 0 ? t + " " + this.$q.lang.vui.notifications.hours : (t = je.date.getDateDiff(Date.now(), e, "minutes"), t > 0 ? t + " " + this.$q.lang.vui.notifications.minutes : (t = je.date.getDateDiff(Date.now(), e, "seconds"), t + " " + this.$q.lang.vui.notifications.seconds)));
    }
  },
  beforeDestroy: function() {
    clearInterval(this.timer);
  }
}, it = window.Vue.toDisplayString, st = window.Vue.createTextVNode, fe = window.Vue.resolveComponent, J = window.Vue.withCtx, rt = window.Vue.openBlock, Et = window.Vue.createBlock, fa = window.Vue.createCommentVNode, ha = window.Vue.renderList, pa = window.Vue.Fragment, ma = window.Vue.createElementBlock, oe = window.Vue.createVNode;
function ga(e, t, n, a, s, o) {
  const i = fe("q-badge"), r = fe("q-icon"), l = fe("q-item-section"), d = fe("q-item-label"), u = fe("q-item"), p = fe("q-list"), h = fe("q-menu"), g = fe("q-btn");
  return rt(), Et(g, {
    round: "",
    flat: !e.hasNew,
    dense: "",
    color: e.hasNew ? n.colorNew : n.color,
    "text-color": e.hasNew ? n.textColorNew : n.textColor,
    icon: e.wasError ? n.iconError : e.count > 0 ? n.icon : n.iconNone,
    title: e.wasError ? e.$q.lang.vui.notifications.serverLost : ""
  }, {
    default: J(() => [
      e.count > 0 ? (rt(), Et(i, {
        key: 0,
        color: "red",
        "text-color": "white",
        floating: ""
      }, {
        default: J(() => [
          st(it(e.count), 1)
        ]),
        _: 1
      })) : fa("", !0),
      oe(h, { class: "notifications" }, {
        default: J(() => [
          oe(p, { style: { width: "300px" } }, {
            default: J(() => [
              (rt(!0), ma(pa, null, ha(e.list, (c) => (rt(), Et(u, {
                key: c.uuid,
                tag: "a",
                href: n.targetUrlPrefix + c.targetUrl
              }, {
                default: J(() => [
                  oe(l, { avatar: "" }, {
                    default: J(() => [
                      oe(r, {
                        name: o.toIcon(c.type),
                        size: "2rem"
                      }, null, 8, ["name"])
                    ]),
                    _: 2
                  }, 1024),
                  oe(l, null, {
                    default: J(() => [
                      oe(d, null, {
                        default: J(() => [
                          st(it(c.title), 1)
                        ]),
                        _: 2
                      }, 1024),
                      oe(d, {
                        caption: "",
                        lines: "3"
                      }, {
                        default: J(() => [
                          st(it(c.content), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  oe(l, {
                    side: "",
                    top: ""
                  }, {
                    default: J(() => [
                      oe(d, { caption: "" }, {
                        default: J(() => [
                          st(it(o.toDelay(new Date(c.creationDate))), 1)
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
const wa = /* @__PURE__ */ L(ua, [["render", ga]]), P = window.ol, ba = {
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
    let e = new P.View();
    const t = new P.source.OSM();
    let n = new P.layer.Tile({
      preload: 4,
      source: t
    });
    const a = [ya()];
    this.$props.overview && a.push(new P.control.OverviewMap({ layers: [new P.layer.Tile({ source: t })] })), this.$props.search && typeof Geocoder == "function" && a.push(new Geocoder("nominatim", {
      provider: "osm",
      lang: "fr",
      placeholder: "Search for ...",
      limit: 5,
      debug: !1,
      autoComplete: !0,
      keepOpen: !0,
      preventMarker: !0,
      defaultFlyResolution: 19
    })), this.olMap = new P.Map({
      interactions: P.interaction.defaults.defaults({
        onFocusOnly: !0
      }),
      target: this.$props.id,
      layers: [n],
      // Improve user experience by loading tiles while animating. Will make animations stutter on mobile or slow devices.
      loadTilesWhileAnimating: !0,
      view: e,
      controls: P.control.defaults.defaults().extend(a)
    }), this.$props.initialCenter && this.olMap.getView().setCenter(P.proj.fromLonLat([this.$props.initialCenter.lon, this.$props.initialCenter.lat])), this.olMap.on("moveend", (function(s) {
      let o = s.map.getView().calculateExtent(), i = P.proj.transformExtent(o, "EPSG:3857", "EPSG:4326"), r = P.extent.getTopLeft(i), l = P.extent.getBottomRight(i);
      VUiPage.debounce(() => this.$emit("moveend", r, l), 300);
    }).bind(this)), setTimeout((function() {
      this.olMap.on("click", (function(s) {
        s.originalEvent.target instanceof HTMLCanvasElement && (s.stopPropagation(), VUiPage.debounce(() => this.$emit("click", P.proj.transform(s.coordinate, "EPSG:3857", "EPSG:4326")), 300));
      }).bind(this));
    }).bind(this), 300);
  }
};
function ya() {
  return new class extends P.control.Control {
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
const va = window.Vue.normalizeProps, $a = window.Vue.guardReactiveProps, _a = window.Vue.renderSlot, Ca = window.Vue.openBlock, xa = window.Vue.createElementBlock, Sa = ["id"];
function ka(e, t, n, a, s, o) {
  return Ca(), xa("div", {
    id: n.id,
    class: "map"
  }, [
    _a(e.$slots, "default", va($a(e.$attrs)))
  ], 8, Sa);
}
const Va = /* @__PURE__ */ L(ba, [["render", ka]]), v = window.ol, qa = {
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
      let e = this.$props.field, t = this.$data.items.filter(function(a) {
        return a[e] != null;
      }).map((function(a) {
        let s;
        if (typeof a[e] == "string" || a[e] instanceof String ? s = JSON.parse(a[e]) : s = a[e], s != null && s.lon != null && s.lat != null) {
          let o = new v.Feature({
            geometry: new v.geom.Point(v.proj.fromLonLat([s.lon, s.lat]))
          });
          return this.$props.nameField && (o.set("name", a[this.$props.nameField]), o.set("innerObject", a), o.set("totalCount", a.totalCount)), o;
        }
        return null;
      }).bind(this)).filter((a) => a != null), n = this.$data.clusters.filter(function(a) {
        return a.geoLocation != null;
      }).map((function(a) {
        let s;
        if (typeof a.geoLocation == "string" || a.geoLocation instanceof String ? s = JSON.parse(a.geoLocation) : s = a.geoLocation, s != null) {
          let o = new v.Feature({
            geometry: new v.geom.Point(v.proj.fromLonLat([s.lon, s.lat]))
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
        let e = 19, t = this.features.length == 1 ? Math.min(this.olMap.getView().getZoom() || e, e) : e, n = v.geom.Polygon.fromExtent(this.$data.vectorSource.getExtent());
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
      Object.keys(this.$data.vectorSource).length == 0 && (this.$data.vectorSource = new v.source.Vector({})), this.$data.vectorSource.clear(), this.$data.vectorSource.addFeatures(this.features), this.$props.fitOnDataUpdate && this.fitView();
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
            const h = (s + o) / 2;
            p == 1 ? s = h : o = h;
          } else {
            const h = (n + a) / 2;
            p == 1 ? n = h : a = h;
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
      this.$data.vectorSource = new v.source.Vector({
        features: this.features
      });
      let t = new v.source.Cluster({
        source: this.$data.vectorSource,
        distance: 2 * this.$props.clusterCircleSize
      }), n = new v.layer.Vector({
        source: t
      }), a;
      this.$props.markerUseFont ? a = new v.style.Style({
        text: new v.style.Text({
          font: this.$props.markerSize + "px " + this.$props.markerFont,
          text: this.$props.markerIcon,
          fill: new v.style.Fill({ color: this.$props.markerColor }),
          textBaseline: "alphabetic"
        })
      }) : this.$props.markerImage ? a = new v.style.Style({
        image: new v.style.Icon({
          src: this.$props.markerImage,
          scale: this.$props.markerSize / 30,
          anchor: [0.5, 0.95],
          color: this.$props.markerColor
        })
      }) : a = new v.style.Style({
        image: new v.style.Icon({
          src: this.$props.markerImageDynamic(this.$props.markerSize),
          anchor: [0.5, 0.95],
          color: this.$props.markerColor
        })
      });
      let s = {};
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
          return l || (l = new v.style.Style({
            image: new v.style.Circle({
              radius: this.$props.clusterCircleSize,
              stroke: new v.style.Stroke({
                color: this.$props.clusterCircleBorderColor
              }),
              fill: new v.style.Fill({
                color: this.$props.clusterColor
              })
            }),
            text: new v.style.Text({
              text: i.toString(),
              font: this.$props.clusterTextSize + "px " + this.$props.clusterTextFont,
              fill: new v.style.Fill({
                color: this.$props.clusterTextColor
              })
            })
          }), s[i] = l), l;
        }
      }).bind(this)), this.olMap.addLayer(n), this.fitView(), this.features.length == 0 && (this.olMap.getView().setCenter(v.proj.fromLonLat([2.333333, 48.866667])), this.olMap.vInitialZoomOverride = 3), this.olMap.on("moveend", (function(o) {
        let i = o.map.getView().calculateExtent(), r = v.proj.transformExtent(i, "EPSG:3857", "EPSG:4326"), l = v.extent.getTopLeft(r), d = v.extent.getBottomRight(r);
        this.baseUrl && VUiPage.debounce(() => this.fetchList({ lat: l[0], lon: l[1] }, { lat: d[0], lon: d[1] }), 300), VUiPage.debounce(() => this.$emit("moveend", l, d), 300);
      }).bind(this)), this.$props.nameField) {
        let o = new v.Overlay({
          element: this.$el.querySelector("#" + this.$props.id + "Popup"),
          positioning: "bottom-center",
          stopEvent: !1,
          offset: [0, -20]
        });
        this.olMap.addOverlay(o), this.olMap.on("click", (function(i) {
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
                o.setPosition(l), this.$data.popupDisplayed = !0, this.$data.objectDisplayed = r.get("features")[0].get("innerObject"), i.stopPropagation(), VUiPage.debounce(() => this.$emit("click", v.proj.transform(l, "EPSG:3857", "EPSG:4326")), 300);
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
        this.olMap.on("click", (function(o) {
          if (o.originalEvent.target instanceof HTMLCanvasElement) {
            let i = this.olMap.forEachFeatureAtPixel(
              o.pixel,
              function(r) {
                return r;
              }
            );
            if (i && i.get("features") && i.get("features").length == 1) {
              let r = i.getGeometry().getCoordinates();
              o.stopPropagation(), VUiPage.debounce(() => this.$emit("click", v.proj.transform(r, "EPSG:3857", "EPSG:4326")), 300);
            }
          }
        }).bind(this));
      if (this.$props.object && this.$props.objectEditable) {
        let o = new v.interaction.Draw({
          source: this.$data.vectorSource,
          type: "Point"
        });
        o.on("drawend", (r) => {
          let l = r.feature, d = v.proj.toLonLat(l.getGeometry().getCoordinates());
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
}, Da = window.Vue.renderSlot, Fa = window.Vue.toDisplayString, gn = window.Vue.openBlock, wn = window.Vue.createElementBlock, Ea = window.Vue.createCommentVNode, Ta = window.Vue.createElementVNode, Oa = ["id"], Ma = ["id"], La = {
  key: 0,
  class: "popup"
};
function Pa(e, t, n, a, s, o) {
  return gn(), wn("div", { id: n.id }, [
    Ta("div", {
      id: n.id + "Popup"
    }, [
      Da(e.$slots, "card", { objectDisplayed: e.objectDisplayed }, () => [
        e.popupDisplayed ? (gn(), wn("div", La, Fa(e.objectDisplayed[n.nameField]), 1)) : Ea("", !0)
      ])
    ], 8, Ma)
  ], 8, Oa);
}
const Na = /* @__PURE__ */ L(qa, [["render", Pa]]), Aa = window.Quasar, Ua = {
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
      Aa.debounce(this.$refs.menu.updatePosition, 500)();
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
}, lt = window.Vue.resolveComponent, Tt = window.Vue.createVNode, Ba = window.Vue.toDisplayString, Ia = window.Vue.createElementVNode, dt = window.Vue.withCtx, ja = window.Vue.normalizeProps, za = window.Vue.guardReactiveProps, Ra = window.Vue.openBlock, Ha = window.Vue.createBlock, Ga = {
  class: "self-center full-width no-outline",
  tabindex: "0"
};
function Ja(e, t, n, a, s, o) {
  const i = lt("q-icon"), r = lt("q-tree"), l = lt("q-menu"), d = lt("q-field");
  return Ra(), Ha(d, ja(za(e.$attrs)), {
    append: dt(() => [
      Tt(i, { name: "arrow_drop_down" })
    ]),
    control: dt(() => [
      Ia("div", Ga, Ba(o.getSelectedLabel()), 1)
    ]),
    default: dt(() => [
      Tt(l, {
        breakpoint: 600,
        fit: "",
        ref: "menu"
      }, {
        default: dt(() => [
          Tt(r, {
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
const Ya = /* @__PURE__ */ L(Ua, [["render", Ja]]), Wa = window.Vue.ref, Xa = {
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
        this.files = n.map((a) => ({ ...a, status: "OK" })), this.$emit("init-ok");
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
          let n = Wa({
            name: t.name,
            size: t.size,
            type: t.type,
            status: "IN_PROGRESS",
            errorMessage: null,
            progress: 0,
            estimated: null,
            file: t
          }).value;
          this.$data.files.push(n), Ka.call(this, n);
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
function Ka(e) {
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
const Y = window.Vue.toDisplayString, ct = window.Vue.normalizeProps, ut = window.Vue.guardReactiveProps, ze = window.Vue.renderSlot, Qa = window.Vue.createTextVNode, z = window.Vue.openBlock, R = window.Vue.createElementBlock, ae = window.Vue.createCommentVNode, Za = window.Vue.renderList, ei = window.Vue.Fragment, ti = window.Vue.normalizeStyle, Re = window.Vue.createElementVNode, bn = window.Vue.withModifiers, yn = window.Vue.mergeProps, ni = { class: "v-fileupload" }, oi = {
  key: 0,
  class: "header"
}, ai = { class: "content" }, ii = { class: "files" }, si = {
  class: "file",
  style: { display: "flex", "flex-flow": "row wrap", "column-gap": "50px" }
}, ri = {
  key: 0,
  style: { color: "red" }
}, li = { style: { color: "grey" } }, di = { key: 1 }, ci = { key: 2 }, ui = ["onClick", "href"], fi = ["onClick"], hi = ["onClick"], pi = {
  key: 0,
  class: "input"
}, mi = ["id", "accept", "multiple"];
function gi(e, t, n, a, s, o) {
  return z(), R("div", ni, [
    e.$slots.header ? (z(), R("div", oi, [
      Qa(Y(e.$slots.header.$attrs) + " ", 1),
      ze(e.$slots, "header", ct(ut({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })))
    ])) : ae("", !0),
    Re("div", ai, [
      ze(e.$slots, "default", ct(ut({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })), () => [
        Re("div", ii, [
          ze(e.$slots, "files", ct(ut({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })), () => [
            (z(!0), R(ei, null, Za(e.files, (i) => (z(), R("span", si, [
              Re("span", {
                style: ti({ color: i.status === "IN_PROGRESS" ? "blue" : i.status == "ERROR" ? "red" : "" })
              }, Y(i.name), 5),
              i.status === "ERROR" ? (z(), R("span", ri, Y(i.errorMessage), 1)) : ae("", !0),
              Re("span", li, Y(o.humanStorageSize(i.size)), 1),
              i.status === "IN_PROGRESS" ? (z(), R("span", di, Y(e.$vui.i18n().uploader.progress) + " : " + Y((i.progress * 100).toFixed()) + " %", 1)) : ae("", !0),
              i.status === "IN_PROGRESS" && i.estimated != null ? (z(), R("span", ci, Y(e.$vui.i18n().uploader.estimated) + " : " + Y(i.estimated.toFixed()) + " s", 1)) : ae("", !0),
              i.status === "OK" ? (z(), R("a", {
                key: 3,
                onClick: (r) => o.downloadFile(i),
                href: n.downloadUrl + i.uri
              }, Y(e.$vui.i18n().uploader.download), 9, ui)) : ae("", !0),
              i.status === "IN_PROGRESS" ? (z(), R("button", {
                key: 4,
                onClick: bn((r) => o.abortUpload(i), ["prevent"])
              }, Y(e.$vui.i18n().uploader.abort), 9, fi)) : ae("", !0),
              !this.readonly && i.status !== "IN_PROGRESS" ? (z(), R("button", {
                key: 5,
                style: { color: "red" },
                onClick: bn((r) => o.removeFile(i), ["prevent"])
              }, Y(e.$vui.i18n().uploader.remove), 9, hi)) : ae("", !0)
            ]))), 256))
          ])
        ]),
        o.canAddFiles() ? (z(), R("div", pi, [
          ze(e.$slots, "input", ct(ut({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })), () => [
            Re("input", yn({
              id: e.$props.inputId,
              ref: "input",
              type: "file",
              accept: e.$props.accept,
              multiple: e.$props.multiple,
              onChange: t[0] || (t[0] = (i) => o.addFiles(i.target.files))
            }, e.$props.inputProps), null, 16, mi)
          ])
        ])) : ae("", !0)
      ])
    ]),
    e.$slots.footer ? (z(), R("div", yn({
      key: 1,
      class: "footer"
    }, { ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize }), [
      ze(e.$slots, "footer")
    ], 16)) : ae("", !0)
  ]);
}
const wi = /* @__PURE__ */ L(Xa, [["render", gi]]), bi = {
  props: {
    inputId: Number,
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
        this.files = n.map((a) => a), this.$emit("init-ok");
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
      return this.humanStorageSize(this.getGlobalSize());
    },
    humanStorageSize(e, t = 1) {
      let n = 0;
      for (; parseInt(e, 10) >= 1024 && n < this.$data.units.length - 1; )
        e /= 1024, ++n;
      return `${e.toFixed(t)} ${this.$data.units[n]}`;
    }
  }
}, Q = window.Vue.toDisplayString, ft = window.Vue.createTextVNode, he = window.Vue.resolveComponent, U = window.Vue.withCtx, Z = window.Vue.createVNode, k = window.Vue.openBlock, H = window.Vue.createBlock, O = window.Vue.createCommentVNode, ie = window.Vue.createElementBlock, W = window.Vue.createElementVNode, vn = window.Vue.renderList, Ot = window.Vue.Fragment, yi = window.Vue.normalizeClass, vi = window.Vue.renderSlot, $i = window.Vue.mergeProps, _i = window.Vue.createSlots, Ci = { class: "q-uploader__header-content flex flex-center no-wrap q-gutter-xs" }, xi = { class: "col column justify-center" }, Si = {
  key: 0,
  class: "q-uploader__title"
}, ki = {
  key: 1,
  class: "q-uploader__subtitle"
}, Vi = {
  key: 2,
  class: "q-uploader__subtitle"
}, qi = { class: "row" }, Di = { class: "col column justify-center" }, Fi = { class: "q-uploader__file-header row flex-center no-wrap" }, Ei = { class: "q-uploader__file-header-content col" }, Ti = { class: "q-uploader__title" }, Oi = { class: "q-uploader__file-header row flex-center no-wrap" }, Mi = { class: "q-uploader__file-header-content col" }, Li = ["id"], Pi = ["aria-labelledby"], Ni = {
  key: 0,
  class: "q-field__after q-field__marginal row no-wrap items-center"
};
function Ai(e, t, n, a, s, o) {
  const i = he("q-tooltip"), r = he("q-btn"), l = he("q-spinner"), d = he("q-uploader-add-trigger"), u = he("q-icon"), p = he("q-circular-progress"), h = he("q-field"), g = he("q-uploader");
  return k(), H(g, $i({
    url: e.$props.url,
    "auto-upload": "",
    "field-name": e.$props.fieldName,
    multiple: e.$props.multiple,
    "max-files": e.$props.multiple ? void 0 : 1,
    headers: [{ name: "Accept", value: "application/json" }],
    onUploaded: o.uploadedFiles,
    onFailed: o.failedFiles,
    readonly: e.$props.readonly || !o.globalCanAddFiles([])
  }, e.$attrs, { ref: "quasarUploader" }), _i({
    list: U((c) => [
      W("div", qi, [
        Z(h, {
          "label-width": 3,
          label: e.$props.simple ? e.$props.label : void 0,
          class: "col",
          orientation: "vertical",
          "stack-label": "",
          borderless: ""
        }, {
          control: U(() => [
            W("div", Di, [
              e.$props.readonly ? O("", !0) : (k(!0), ie(Ot, { key: 0 }, vn(c.files, (f) => (k(), ie(Ot, {
                key: f.name
              }, [
                f.__status !== "uploaded" ? (k(), ie("div", {
                  key: 0,
                  class: yi(["q-uploader__file relative-position", {
                    "q-uploader__file--failed": f.__status === "failed",
                    "q-uploader__file--uploaded": f.__status === "uploaded"
                  }])
                }, [
                  W("div", Fi, [
                    f.__status === "failed" ? (k(), H(u, {
                      key: 0,
                      class: "q-uploader__file-status",
                      name: e.$q.iconSet.type.negative,
                      color: "negative"
                    }, null, 8, ["name"])) : O("", !0),
                    Z(u, {
                      class: "q-uploader__file-status",
                      name: f.type.indexOf("video/") === 0 ? "movie" : f.type.indexOf("image/") === 0 ? "photo" : f.type.indexOf("audio/") === 0 ? "audiotrack" : "insert_drive_file"
                    }, null, 8, ["name"]),
                    W("div", Ei, [
                      W("div", Ti, Q(f.name), 1)
                    ]),
                    f.__status === "uploading" ? (k(), H(p, {
                      key: 1,
                      value: f.__progress,
                      min: 0,
                      max: 1,
                      indeterminate: f.__progress === 0
                    }, null, 8, ["value", "indeterminate"])) : O("", !0),
                    f.__status === "failed" ? (k(), H(r, {
                      key: 2,
                      round: "",
                      dense: "",
                      flat: "",
                      icon: e.$q.iconSet.uploader.clear,
                      onClick: (m) => c.removeFile(f)
                    }, null, 8, ["icon", "onClick"])) : O("", !0)
                  ])
                ], 2)) : O("", !0)
              ], 64))), 128)),
              (k(!0), ie(Ot, null, vn(e.files, (f) => (k(), ie("div", {
                key: f.name,
                class: "q-uploader__file relative-position q-uploader__file--uploaded"
              }, [
                W("div", Oi, [
                  Z(u, {
                    class: "q-uploader__file-status",
                    name: f.type.indexOf("video/") === 0 ? "movie" : f.type.indexOf("image/") === 0 ? "photo" : f.type.indexOf("audio/") === 0 ? "audiotrack" : "insert_drive_file"
                  }, null, 8, ["name"]),
                  W("div", Mi, [
                    W("div", {
                      class: "q-uploader__title",
                      id: f.fileUri + "_label"
                    }, Q(f.name), 9, Li)
                  ]),
                  W("div", {
                    role: "toolbar",
                    "aria-labelledby": f.fileUri + "_label"
                  }, [
                    e.$props.readonly ? O("", !0) : (k(), H(r, {
                      key: 0,
                      round: "",
                      dense: "",
                      flat: "",
                      icon: "delete",
                      onClick: (m) => o.removeRemoteFile(f),
                      title: e.$q.lang.vui.uploader.remove
                    }, null, 8, ["onClick", "title"])),
                    Z(r, {
                      round: "",
                      dense: "",
                      flat: "",
                      icon: "file_download",
                      onClick: (m) => e.$emit("download-file", f.fileUri),
                      title: e.$q.lang.vui.uploader.download
                    }, null, 8, ["onClick", "title"])
                  ], 8, Pi)
                ])
              ]))), 128))
            ])
          ]),
          _: 2
        }, 1032, ["label"]),
        e.$props.simple && !e.$props.readonly ? (k(), ie("div", Ni, [
          c.isUploading ? (k(), H(l, {
            key: 0,
            class: "q-uploader__spinner"
          })) : O("", !0),
          o.globalCanAddFiles(c.files) ? (k(), H(r, {
            key: 1,
            type: "a",
            icon: e.$q.iconSet.uploader.add,
            flat: "",
            dense: ""
          }, {
            default: U(() => [
              Z(d)
            ]),
            _: 1
          }, 8, ["icon"])) : O("", !0),
          c.isUploading ? (k(), H(r, {
            key: 2,
            type: "a",
            icon: e.$q.iconSet.uploader.clear,
            flat: "",
            dense: "",
            onClick: c.abort
          }, {
            default: U(() => [
              Z(i, null, {
                default: U(() => [
                  ft(Q(e.$q.lang.vui.uploader.abort), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : O("", !0)
        ])) : O("", !0)
      ]),
      vi(e.$slots, "footer")
    ]),
    _: 2
  }, [
    e.$props.simple ? {
      name: "header",
      fn: U(() => []),
      key: "0"
    } : {
      name: "header",
      fn: U((c) => [
        W("div", Ci, [
          c.queuedFiles.length > 0 && !c.readonly ? (k(), H(r, {
            key: 0,
            type: "a",
            icon: e.$q.iconSet.uploader.clear_all,
            flat: "",
            dense: "",
            onClick: c.removeQueuedFiles
          }, {
            default: U(() => [
              Z(i, null, {
                default: U(() => [
                  ft(Q(e.$q.lang.vui.uploader.clear_all), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : O("", !0),
          W("div", xi, [
            e.$props.label !== void 0 ? (k(), ie("div", Si, Q(e.$props.label), 1)) : O("", !0),
            c.isUploading ? (k(), ie("div", ki, Q(o.getGlobalSizeLabel()) + " / " + Q(c.uploadProgressLabel), 1)) : (k(), ie("div", Vi, Q(o.getGlobalSizeLabel()), 1))
          ]),
          c.isUploading ? (k(), H(l, {
            key: 1,
            class: "q-uploader__spinner"
          })) : O("", !0),
          c.isUploading && !c.readonly ? (k(), H(r, {
            key: 2,
            type: "a",
            href: "#",
            icon: e.$q.iconSet.uploader.clear,
            flat: "",
            dense: "",
            onClick: c.abort
          }, {
            default: U(() => [
              Z(i, null, {
                default: U(() => [
                  ft(Q(e.$q.lang.vui.uploader.abort), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : O("", !0),
          o.globalCanAddFiles(c.files) && !c.readonly ? (k(), H(r, {
            key: 3,
            icon: e.$q.iconSet.uploader.add,
            flat: "",
            dense: "",
            onClick: c.pickFiles
          }, {
            default: U(() => [
              Z(d, {
                id: e.$props.inputId
              }, null, 8, ["id"]),
              Z(i, null, {
                default: U(() => [
                  ft(Q(e.$q.lang.vui.uploader.add), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : O("", !0)
        ])
      ]),
      key: "1"
    }
  ]), 1040, ["url", "field-name", "multiple", "max-files", "onUploaded", "onFailed", "readonly"]);
}
const Ui = /* @__PURE__ */ L(bi, [["render", Ai]]);
function zt(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Mn(e, t) {
  var n = Object.create(e.prototype);
  for (var a in t) n[a] = t[a];
  return n;
}
function Ye() {
}
var Ge = 0.7, wt = 1 / Ge, Ee = "\\s*([+-]?\\d+)\\s*", Je = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ee = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Bi = /^#([0-9a-f]{3,8})$/, Ii = new RegExp(`^rgb\\(${Ee},${Ee},${Ee}\\)$`), ji = new RegExp(`^rgb\\(${ee},${ee},${ee}\\)$`), zi = new RegExp(`^rgba\\(${Ee},${Ee},${Ee},${Je}\\)$`), Ri = new RegExp(`^rgba\\(${ee},${ee},${ee},${Je}\\)$`), Hi = new RegExp(`^hsl\\(${Je},${ee},${ee}\\)$`), Gi = new RegExp(`^hsla\\(${Je},${ee},${ee},${Je}\\)$`), $n = {
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
zt(Ye, yt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: _n,
  // Deprecated! Use color.formatHex.
  formatHex: _n,
  formatHex8: Ji,
  formatHsl: Yi,
  formatRgb: Cn,
  toString: Cn
});
function _n() {
  return this.rgb().formatHex();
}
function Ji() {
  return this.rgb().formatHex8();
}
function Yi() {
  return Ln(this).formatHsl();
}
function Cn() {
  return this.rgb().formatRgb();
}
function yt(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Bi.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? xn(t) : n === 3 ? new N(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? ht(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? ht(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Ii.exec(e)) ? new N(t[1], t[2], t[3], 1) : (t = ji.exec(e)) ? new N(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = zi.exec(e)) ? ht(t[1], t[2], t[3], t[4]) : (t = Ri.exec(e)) ? ht(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Hi.exec(e)) ? Vn(t[1], t[2] / 100, t[3] / 100, 1) : (t = Gi.exec(e)) ? Vn(t[1], t[2] / 100, t[3] / 100, t[4]) : $n.hasOwnProperty(e) ? xn($n[e]) : e === "transparent" ? new N(NaN, NaN, NaN, 0) : null;
}
function xn(e) {
  return new N(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ht(e, t, n, a) {
  return a <= 0 && (e = t = n = NaN), new N(e, t, n, a);
}
function Wi(e) {
  return e instanceof Ye || (e = yt(e)), e ? (e = e.rgb(), new N(e.r, e.g, e.b, e.opacity)) : new N();
}
function Ut(e, t, n, a) {
  return arguments.length === 1 ? Wi(e) : new N(e, t, n, a ?? 1);
}
function N(e, t, n, a) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +a;
}
zt(N, Ut, Mn(Ye, {
  brighter(e) {
    return e = e == null ? wt : Math.pow(wt, e), new N(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ge : Math.pow(Ge, e), new N(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new N(_e(this.r), _e(this.g), _e(this.b), bt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Sn,
  // Deprecated! Use color.formatHex.
  formatHex: Sn,
  formatHex8: Xi,
  formatRgb: kn,
  toString: kn
}));
function Sn() {
  return `#${$e(this.r)}${$e(this.g)}${$e(this.b)}`;
}
function Xi() {
  return `#${$e(this.r)}${$e(this.g)}${$e(this.b)}${$e((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function kn() {
  const e = bt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${_e(this.r)}, ${_e(this.g)}, ${_e(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function bt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function _e(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function $e(e) {
  return e = _e(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Vn(e, t, n, a) {
  return a <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new X(e, t, n, a);
}
function Ln(e) {
  if (e instanceof X) return new X(e.h, e.s, e.l, e.opacity);
  if (e instanceof Ye || (e = yt(e)), !e) return new X();
  if (e instanceof X) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, a = e.b / 255, s = Math.min(t, n, a), o = Math.max(t, n, a), i = NaN, r = o - s, l = (o + s) / 2;
  return r ? (t === o ? i = (n - a) / r + (n < a) * 6 : n === o ? i = (a - t) / r + 2 : i = (t - n) / r + 4, r /= l < 0.5 ? o + s : 2 - o - s, i *= 60) : r = l > 0 && l < 1 ? 0 : i, new X(i, r, l, e.opacity);
}
function Bt(e, t, n, a) {
  return arguments.length === 1 ? Ln(e) : new X(e, t, n, a ?? 1);
}
function X(e, t, n, a) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +a;
}
zt(X, Bt, Mn(Ye, {
  brighter(e) {
    return e = e == null ? wt : Math.pow(wt, e), new X(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ge : Math.pow(Ge, e), new X(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, a = n + (n < 0.5 ? n : 1 - n) * t, s = 2 * n - a;
    return new N(
      Mt(e >= 240 ? e - 240 : e + 120, s, a),
      Mt(e, s, a),
      Mt(e < 120 ? e + 240 : e - 120, s, a),
      this.opacity
    );
  },
  clamp() {
    return new X(qn(this.h), pt(this.s), pt(this.l), bt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = bt(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${qn(this.h)}, ${pt(this.s) * 100}%, ${pt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function qn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function pt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Mt(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Rt = (e) => () => e;
function Pn(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Ki(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(a) {
    return Math.pow(e + a * t, n);
  };
}
function Qi(e, t) {
  var n = t - e;
  return n ? Pn(e, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : Rt(isNaN(e) ? t : e);
}
function Zi(e) {
  return (e = +e) == 1 ? He : function(t, n) {
    return n - t ? Ki(t, n, e) : Rt(isNaN(t) ? n : t);
  };
}
function He(e, t) {
  var n = t - e;
  return n ? Pn(e, n) : Rt(isNaN(e) ? t : e);
}
const es = function e(t) {
  var n = Zi(t);
  function a(s, o) {
    var i = n((s = Ut(s)).r, (o = Ut(o)).r), r = n(s.g, o.g), l = n(s.b, o.b), d = He(s.opacity, o.opacity);
    return function(u) {
      return s.r = i(u), s.g = r(u), s.b = l(u), s.opacity = d(u), s + "";
    };
  }
  return a.gamma = e, a;
}(1);
function ts(e) {
  return function(t, n) {
    var a = e((t = Bt(t)).h, (n = Bt(n)).h), s = He(t.s, n.s), o = He(t.l, n.l), i = He(t.opacity, n.opacity);
    return function(r) {
      return t.h = a(r), t.s = s(r), t.l = o(r), t.opacity = i(r), t + "";
    };
  };
}
const ns = ts(Qi);
let pe = { color: yt, interpolateHsl: ns, interpolateRgb: es };
function Lt(e, t, n) {
  if (e != "DEFAULT") {
    var a, s = os;
    e == "RAINBOW" || e == "iRAINBOW" ? a = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#00FF00", "rgb(75, 0, 130)", "rgb(238, 130, 238)"] : e == "SPECTRUM" || e == "iSPECTRUM" ? (a = ["rgb(230, 30, 30)", "rgb(230, 230, 30)", "rgb(30, 230, 30)", "rgb(30, 230, 230)", "rgb(30, 30, 230)", "rgb(230, 30, 230)", "rgb(230, 30, 30)"], s = is) : e == "RED2GREEN" || e == "iRED2GREEN" ? a = ["rgb(255, 51, 51)", "rgb(250, 235, 0)", "rgb(51, 200, 51)"] : e == "GREEN2BLUE" || e == "iGREEN2BLUE" ? a = ["rgb(51, 153, 51)", "rgb(51, 153, 200)", "rgb(51, 51, 255)"] : e == "HEAT" || e == "iHEAT" ? a = ["rgb(255, 51, 51)", "rgb(255, 255, 51)", "rgb(51, 153, 51)", "rgb(51, 153, 255)"] : e == "GREEN:INTENSITY" || e == "iGREEN:INTENSITY" ? (a = ["rgb(51, 153, 51)", "rgb(170, 250, 170)"], s = as) : e == "ANDROID" || e == "iANDROID" ? a = ["#0099CC", "#9933CC", "#CC0000", "#FF8800", "#669900"] : (e == "ANDROID:LIGHT" || e == "iANDROID:LIGHT") && (a = ["#33B5E5", "#AA66CC", "#ff4444", "#ffbb33", "#99cc00"]), e.charAt(0) == "i" && (a = a.reverse());
    var i, o = a[0] == a[a.length - 1], i = s(a, t + (o ? 1 : 0));
    return n ? i.map(function(r, l) {
      var d = pe.color(r);
      return d.opacity = n, d.formatRgb();
    }) : i;
  }
}
function os(e, t) {
  return Ht(e, t, function(n, a, s, o, i) {
    return pe.interpolateHsl(s, o)(n);
  });
}
function as(e, t) {
  return Ht(e, t, function(n, a, s, o, i) {
    return pe.interpolateRgb(s, o)(n);
  });
}
function is(e, t) {
  return Ht(e, t, function(n, a, s, o, i) {
    var r = { r: null, g: null, b: null }, l = a ? pe.rgb(a) : r, d = pe.rgb(s), u = pe.rgb(o), p = i ? pe.rgb(i) : r, h = Math.max(Math.min(Math.round(Pt(n, l.r, d.r, u.r, p.r)), 255), 0), g = Math.max(Math.min(Math.round(Pt(n, l.g, d.g, u.g, p.g)), 255), 0), c = Math.max(Math.min(Math.round(Pt(n, l.b, d.b, u.b, p.b)), 255), 0);
    return pe.rgb(h, g, c);
  });
}
function Ht(e, t, n) {
  if (t == 1)
    return [e[0]];
  for (var a = 0, s = new Array(), o = e.length, i = 0; (o - 1) % (t - 1) != 0 && i < 20; )
    i++, o = e.length + i * (e.length - 1);
  i++;
  for (var r = 0; r < e.length - 1; r++) {
    for (var l = r - 1 >= 0 ? e[r - 1] : null, d = e[r], u = e[r + 1], p = r + 2 < e.length ? e[r + 2] : null, h = a; h < i + 1; h++) {
      var g = n(h / i, l, d, u, p);
      s.push(g);
    }
    a = 1;
  }
  for (var c = new Array(), r = 0; r < t; r++) {
    var f = (s.length - 1) / (t - 1) * r;
    c.push(s[f]);
  }
  return c;
}
function Pt(e, t, n, a, s) {
  var o = a - n, i = t ?? n - o, r = s ?? a + o;
  return 0.5 * (2 * n + (-i + a) * e + (2 * i - 5 * n + 4 * a - r) * e * e + (-i + 3 * n - 3 * a + r) * e * e * e);
}
const ss = {
  id: "verticalLineTooltipPlugin",
  afterDraw: (e) => {
    var t, n;
    if ((n = (t = e.tooltip) == null ? void 0 : t._active) != null && n.length) {
      const { x: a } = e.tooltip._active[0].element, s = e.scales.y, { ctx: o } = e;
      o.save(), o.beginPath(), o.moveTo(a, s.top), o.lineTo(a, s.bottom), o.lineWidth = 2, o.strokeStyle = "rgba(50, 50, 50, 0.4)", o.stroke(), o.restore();
    }
  }
}, rs = {
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
}, ls = {
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
      var h = Object.values(s), g, c, f;
      if (this.type === "bubbles") {
        f = "bubble";
        var m = s.filter((C) => C !== a);
        h = Object.values(m);
        var b = this.toChartJsBubblesData(e, m.keys(), m, a);
        c = [{ data: b }], g = this.getChartJsBubblesOptions(e, m.keys(), a, m, i, r), this.setChartJsColorOptions(c, o, 1, 0.5);
      } else if (this.type === "linechart")
        f = "line", c = this.toChartJsData(e, s, n, a), g = this.getChartJsLineOptions(e, a, s, n, i, r), this.setChartJsColorOptions(c, o);
      else if (this.type === "barchart")
        f = "bar", c = this.toChartJsData(e, s, n, a), g = this.getChartJsLineOptions(e, a, s, n, i, r), this.setChartJsColorOptions(c, o, 1, 0.5);
      else if (this.type === "stackedbarchart")
        f = "bar", c = this.toChartJsData(e, s, n, a), g = this.getStackedOptions(e, a, s, n, i, r), this.setChartJsColorOptions(c, o, 1, 0.5);
      else if (this.type === "polararea") {
        f = "polarArea", c = this.toChartJsData(e, s, n, a);
        var _ = this.toChartJsPieData(c, s);
        c = _.datasets, h = _.labels, g = this.getPolarChartOptions(e, a, s, n, i, r), this.setChartJsPieColorOptions(c, o);
      } else if (this.type === "doughnut") {
        f = "doughnut";
        var m = s.filter((se) => se !== a);
        c = this.toChartJsData(e, m, n, a);
        var _ = this.toChartJsPieData(c, s);
        c = _.datasets, h = _.labels, this.setChartJsPieColorOptions(c, o), g = {
          legend: {
            display: !0,
            position: "bottom"
          }
        };
      }
      var y = this.$.refs.graphCanvas, V = this.mergeDeep(g, r);
      if (window.dashboardGraphChart[this.$data.graphChartId]) {
        var w = window.dashboardGraphChart[this.$data.graphChartId];
        w.data.datasets = c, this.hashCode(JSON.stringify(w.options.scales)) !== this.hashCode(JSON.stringify(V.scales)) && (w.options.scales = V.scales), w.update("none");
      } else {
        let C = {
          datasets: c
        };
        n || (C.labels = h);
        var w = new Chart(y, {
          type: f,
          data: C,
          options: V,
          plugins: [ss, rs]
        });
        window.dashboardGraphChart[this.$data.graphChartId] = w;
      }
    },
    setChartJsColorOptions: function(e, t, n, a) {
      if (t)
        for (var s = Lt(t, e.length, n), o = Lt(t, e.length, a || (n ? n * 0.25 : 0.25)), i = 0; i < e.length; i++)
          e[i].borderColor = s[i], e[i].backgroundColor = o[i], e[i].pointBackgroundColor = s[i], e[i].pointBorderColor = "#FFFFFFAF", e[i].pointBorderWidth = 2, e[i].fill = !0;
    },
    setChartJsPieColorOptions: function(e, t, n) {
      if (t)
        for (var a = 0; a < e.length; a++)
          e[a].backgroundColor = Lt(t, e[a].data.length, n);
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
      let s = function(m, b) {
        return m.indexOf(b, m.length - b.length) !== -1;
      };
      var o = this.timeDimToDayJsPeriod(), i = new Array();
      for (const m in t) {
        var r = new Object();
        r.data = new Array(), r.parsing = !1, t && t[m] && (r.label = t[m]);
        for (var l = this.$data.truncatedMinTime ? dayjs(this.$data.truncatedMinTime).subtract(1, o) : null, d = 0; d < e.length; d++) {
          if (n && this.fillGapDim)
            for (var u = l ? dayjs(l).add(1, o) : null, p = l ? u.add(1, o) : null, h = dayjs(e[d].time); !h.isBefore(p); )
              r.data.push({ x: u.valueOf(), y: this.fillGapValue }), u = p, p = p.add(1, o), l = u.valueOf();
          var g = n ? dayjs(e[d].time).valueOf() : e[d].values[a], c = e[d].values[m];
          !this.isEmpty(e[d].values) && !c && (c = 0), r.data.push({ x: g, y: c }), l = g;
        }
        if (n && this.fillGapDim && this.$data.truncatedMaxTime)
          for (var u = l ? dayjs(l).add(1, o) : null, f = dayjs(this.$data.truncatedMaxTime); !u.isAfter(f); )
            r.data.push({ x: u.valueOf(), y: this.fillGapValue }), u = u.add(1, o), l = u.valueOf();
        r.label || (s(m, "count") ? r.label = "Quantité" : s(m, "mean") ? r.label = "Moyenne" : s(m, "min") ? r.label = "Minimum" : s(m, "max") && (r.label = "Maximum")), i.push(r);
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
}, ds = window.Vue.openBlock, cs = window.Vue.createElementBlock, us = { ref: "graphCanvas" };
function fs(e, t, n, a, s, o) {
  return ds(), cs("canvas", us, null, 512);
}
const hs = /* @__PURE__ */ L(ls, [["render", fs]]), ps = {
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
}, ms = {
  mounted: function(e, t, n) {
    var a = t.value;
    a && !window.autofocus && (window.autofocus = !0, e.focus());
  }
}, gs = window.Vue.nextTick, ws = {
  updated: function(e, t, n) {
    gs(() => {
      !window.watcherUpdates || !window.watcherUpdates.updates_detected ? e.classList.add("hidden") : e.classList.remove("hidden");
    });
  }
};
function Nn(e, t = 250) {
  let n = !1, a;
  return function() {
    return n === !1 && (n = !0, setTimeout(() => {
      n = !1;
    }, t), a = e.apply(this, arguments)), a;
  };
}
const ve = window.Vue, bs = {
  created: function(e, t) {
    const n = t.value ? t.value.topOffset : null, a = t.value ? t.value.topOffsetEl : null, s = t.value ? t.value.leftOffset : null, o = t.value ? t.value.leftOffsetEl : null, i = t.value ? t.value.scrollContainerEl : ".q-page-container", r = e.querySelector(".mini");
    for (var l = 0; l < e.childNodes.length; l++) {
      var d = e.childNodes[l];
      d.classList && !d.classList.contains("mini") && d.classList.add("not-mini");
    }
    ve.minifyHandler = function() {
      var u = e.closest(i), p = u ? -u.getBoundingClientRect().y : window.pageYOffset, h = u ? -u.getBoundingClientRect().x : window.pageXOffset, g = e.getBoundingClientRect().y + p, c = e.getBoundingClientRect().x + h;
      (n || a) && (g = ve.minifyComputeOffset(n, a, 0, "TOP")), (s || o) && (c = ve.minifyComputeOffset(s, o, 0, "LEFT"));
      var f = r.getBoundingClientRect().height, m = e.getBoundingClientRect().height;
      p > m - f ? (r.classList.add("visible"), r.style.top = g + "px", r.style.left = c + "px") : (r.classList.remove("visible"), r.style.top = -f - g + "px");
    }, ve.minifyComputeOffset = function(u, p, h, g) {
      var c = h;
      if (u)
        c = u;
      else if (p) {
        var f = document.querySelector(p), m = f.getBoundingClientRect();
        g === "LEFT" ? c = m.width + m.x : g === "TOP" && (c = m.height + m.y);
      }
      return c;
    }, window.addEventListener("scroll", ve.minifyHandler), window.addEventListener("resize", Nn(ve.minifyHandler, 50));
  },
  updated: function() {
    setTimeout(ve.minifyHandler, 50);
  },
  unmounted: function(e) {
    window.removeEventListener("scroll"), window.removeEventListener("resize");
    for (var t = 0; t < e.childNodes.length; t++) {
      var n = e.childNodes[t];
      n.classList && n.classList.remove("not-mini");
    }
  }
}, ys = [null, document, document.body, document.scrollingElement, document.documentElement];
function vs(e, t) {
  let n = Vs(t);
  if (n === void 0) {
    if (e == null)
      return window;
    n = e.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return ys.includes(n) ? window : n;
}
function $s(e) {
  return (e === window ? document.body : e).scrollHeight;
}
function _s(e) {
  return (e === window ? document.body : e).scrollWidth;
}
function An(e) {
  return e === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : e.scrollTop;
}
function Un(e) {
  return e === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : e.scrollLeft;
}
function Gt(e, t, n = 0) {
  const a = arguments[3] === void 0 ? performance.now() : arguments[3], s = An(e);
  if (n <= 0) {
    s !== t && It(e, t);
    return;
  }
  requestAnimationFrame((o) => {
    const i = o - a, r = s + (t - s) / Math.max(i, n) * i;
    It(e, r), r !== t && Gt(e, t, n - i, o);
  });
}
function Jt(e, t, n = 0) {
  const a = arguments[3] === void 0 ? performance.now() : arguments[3], s = Un(e);
  if (n <= 0) {
    s !== t && jt(e, t);
    return;
  }
  requestAnimationFrame((o) => {
    const i = o - a, r = s + (t - s) / Math.max(i, n) * i;
    jt(e, r), r !== t && Jt(e, t, n - i, o);
  });
}
function It(e, t) {
  if (e === window) {
    window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, t);
    return;
  }
  e.scrollTop = t;
}
function jt(e, t) {
  if (e === window) {
    window.scrollTo(t, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    return;
  }
  e.scrollLeft = t;
}
function Cs(e, t, n) {
  if (n) {
    Gt(e, t, n);
    return;
  }
  It(e, t);
}
function xs(e, t, n) {
  if (n) {
    Jt(e, t, n);
    return;
  }
  jt(e, t);
}
let mt;
function Ss() {
  if (mt !== void 0)
    return mt;
  const e = document.createElement("p"), t = document.createElement("div");
  Dn(e, {
    width: "100%",
    height: "200px"
  }), Dn(t, {
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
  let a = e.offsetWidth;
  return n === a && (a = t.clientWidth), t.remove(), mt = n - a, mt;
}
function ks(e, t = !0) {
  return !e || e.nodeType !== Node.ELEMENT_NODE ? !1 : t ? e.scrollHeight > e.clientHeight && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-y"])) : e.scrollWidth > e.clientWidth && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-x"]));
}
function Vs(e) {
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
function Dn(e, t) {
  const n = e.style;
  for (const a in t)
    n[a] = t[a];
}
const Fe = {
  getScrollTarget: vs,
  getScrollHeight: $s,
  getScrollWidth: _s,
  getVerticalScrollPosition: An,
  getHorizontalScrollPosition: Un,
  animVerticalScrollTo: Gt,
  animHorizontalScrollTo: Jt,
  setVerticalScrollPosition: Cs,
  setHorizontalScrollPosition: xs,
  getScrollbarWidth: Ss,
  hasScrollbar: ks
}, M = window.Vue, qs = {
  created: function(e, t) {
    M.createDebugLine = function(g, c, f, m) {
      let b = document.createElement("div");
      return b.style.position = c, b.style.top = f + "px", b.style.border = "none", b.style.borderTop = m + " solid 1px", b.style.width = "100%", b.style.zIndex = "10000", b.style.padding = "0px", b.style.lineHeight = "0px", b.style.fontSize = "12px", b.style.color = m, b.innerHTML = g, document.querySelector("body").appendChild(b), b;
    };
    const n = t.value.debug ? t.value.debug : !1, a = t.value.startingOffset ? t.value.startingOffset : 24, s = t.value.fixedPos ? t.value.fixedPos : 24, o = a - s, i = t.value.scanner ? t.value.scanner : s + 30, r = e.querySelectorAll("a");
    r[0].classList.add("active"), r[0].ariaCurrent = "step";
    const l = Fe.getScrollTarget(document.querySelector(r[0].hash));
    let d = [], u, p;
    n && (u = M.createDebugLine("startLinear", "absolute", 0, "red"), p = M.createDebugLine("last", "absolute", 0, "red")), M.scrollSpyHandler = function() {
      if (n) {
        for (var g = e, c = 0, f = 0; g && !isNaN(g.offsetLeft) && !isNaN(g.offsetTop); )
          c += g.offsetLeft - g.scrollLeft, f += g.offsetTop - g.scrollTop, g = g.offsetParent;
        console.log("x: " + c), console.log("y: " + f + " (startingOffset)");
      }
      window.pageYOffset > o ? (e.style.top || (e.style.top = s + "px", e.classList.add("fixed")), e.style.width = e.parentElement.getBoundingClientRect().width + "px") : e.style.top && (e.classList.remove("fixed"), e.style.top = null, e.style.width = null);
      for (var m = Fe.getVerticalScrollPosition(l), b = M.computeBreakPoints(m), _ = 0; _ < r.length; _++)
        b[_] <= m && (_ >= r.length - 1 || m < b[_ + 1]) ? (r[_].classList.add("active"), r[_].ariaCurrent = "step") : (r[_].classList.remove("active"), r[_].removeAttribute("aria-current"));
    }, M.computeBlockTop = function(g) {
      var c = [];
      for (let f = 0; f < r.length; f++) {
        const m = r[f].hash, b = document.querySelector(m);
        b && c.push(g + b.getBoundingClientRect().top);
      }
      return c;
    }, M.scrollTo = function(g) {
      g.preventDefault();
      const c = g.target.hash, f = document.querySelector(c);
      for (var m = Fe.getVerticalScrollPosition(l) + f.getBoundingClientRect().top - i, b = Fe.getVerticalScrollPosition(l), _ = M.computeBlockTop(b), y = M.computeBreakPoints(b), V = 0; V < r.length; V++)
        if (r[V].hash == c) {
          _[V] - i < y[V + 1] || !y[V + 1] ? m = _[V] - i : m = y[V + 1] - 1;
          break;
        }
      var w = 200;
      Fe.setVerticalScrollPosition(l, m, w);
    }, M.computeBreakPoints = function(g) {
      var c = M.computeBlockTop(g);
      const f = window.innerHeight || document.documentElement.clientHeight, m = Fe.getScrollHeight(l), _ = m - f;
      let y = _ - f + i;
      for (let $ = 1; $ < r.length; $++)
        if (c[$] - i > y) {
          y = c[$] - i;
          break;
        }
      const V = _ - y;
      var w = [];
      w.push(0);
      for (let $ = 1; $ < r.length; $++)
        c[$] - i > y ? w[$] = y + V * (c[$] - y) / (m - y) : w[$] = c[$] - i, w[$] = Math.round(w[$]);
      if (n) {
        for (let $ = 1; $ < r.length; $++) {
          var C;
          d.length < $ ? (C = M.createDebugLine("navId#" + $, "absolute", 0, "red"), d.push(C)) : C = d[$ - 1], C.style.top = w[$] + i + "px";
        }
        u.style.top = y + i + "px", p.style.top = _ + i + "px";
      }
      return w;
    }, e.classList.add("scroll-spy-nav");
    for (var h = 0; h < r.length; h++)
      r[h].addEventListener("click", M.scrollTo);
    window.addEventListener("scroll", M.scrollSpyHandler), window.addEventListener("resize", Nn(M.scrollSpyHandler, 50));
  },
  unmounted: function(e) {
    e.classList.remove("scroll-spy-nav"), window.removeEventListener("scroll"), window.removeEventListener("resize");
    const t = e.querySelectorAll("a");
    for (var n = 0; n < t.length; n++)
      t.removeEventListener("click");
  }
};
function Ds(e, t) {
  return new Date(e) - new Date(t);
}
function Fn(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function En(e) {
  return typeof e == "number" && isFinite(e);
}
var gt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Fs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Nt, Tn;
function Es() {
  if (Tn) return Nt;
  Tn = 1;
  var e = "Expected a function", t = NaN, n = "[object Symbol]", a = /^\s+|\s+$/g, s = /^[-+]0x[0-9a-f]+$/i, o = /^0b[01]+$/i, i = /^0o[0-7]+$/i, r = parseInt, l = typeof gt == "object" && gt && gt.Object === Object && gt, d = typeof self == "object" && self && self.Object === Object && self, u = l || d || Function("return this")(), p = Object.prototype, h = p.toString, g = Math.max, c = Math.min, f = function() {
    return u.Date.now();
  };
  function m(w, C, $) {
    var se, Te, We, Ce, G, me, Oe = 0, Yt = !1, Me = !1, vt = !0;
    if (typeof w != "function")
      throw new TypeError(e);
    C = V(C) || 0, b($) && (Yt = !!$.leading, Me = "maxWait" in $, We = Me ? g(V($.maxWait) || 0, C) : We, vt = "trailing" in $ ? !!$.trailing : vt);
    function $t(F) {
      var re = se, Le = Te;
      return se = Te = void 0, Oe = F, Ce = w.apply(Le, re), Ce;
    }
    function In(F) {
      return Oe = F, G = setTimeout(Xe, C), Yt ? $t(F) : Ce;
    }
    function jn(F) {
      var re = F - me, Le = F - Oe, Kt = C - re;
      return Me ? c(Kt, We - Le) : Kt;
    }
    function Wt(F) {
      var re = F - me, Le = F - Oe;
      return me === void 0 || re >= C || re < 0 || Me && Le >= We;
    }
    function Xe() {
      var F = f();
      if (Wt(F))
        return Xt(F);
      G = setTimeout(Xe, jn(F));
    }
    function Xt(F) {
      return G = void 0, vt && se ? $t(F) : (se = Te = void 0, Ce);
    }
    function zn() {
      G !== void 0 && clearTimeout(G), Oe = 0, se = me = Te = G = void 0;
    }
    function Rn() {
      return G === void 0 ? Ce : Xt(f());
    }
    function _t() {
      var F = f(), re = Wt(F);
      if (se = arguments, Te = this, me = F, re) {
        if (G === void 0)
          return In(me);
        if (Me)
          return G = setTimeout(Xe, C), $t(me);
      }
      return G === void 0 && (G = setTimeout(Xe, C)), Ce;
    }
    return _t.cancel = zn, _t.flush = Rn, _t;
  }
  function b(w) {
    var C = typeof w;
    return !!w && (C == "object" || C == "function");
  }
  function _(w) {
    return !!w && typeof w == "object";
  }
  function y(w) {
    return typeof w == "symbol" || _(w) && h.call(w) == n;
  }
  function V(w) {
    if (typeof w == "number")
      return w;
    if (y(w))
      return t;
    if (b(w)) {
      var C = typeof w.valueOf == "function" ? w.valueOf() : w;
      w = b(C) ? C + "" : C;
    }
    if (typeof w != "string")
      return w === 0 ? w : +w;
    w = w.replace(a, "");
    var $ = o.test(w);
    return $ || i.test(w) ? r(w.slice(2), $ ? 2 : 8) : s.test(w) ? t : +w;
  }
  return Nt = m, Nt;
}
var Ts = Es();
const On = /* @__PURE__ */ Fs(Ts), D = window.Quasar, At = {
  debounce: On,
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
  transformListForSelection: function(e, t, n, a, s) {
    let o = this.$data.vueData[e];
    if (a && (o = o.filter(a)), s != null && s.trim() !== "") {
      const i = this.unaccentLower(s);
      o = o.filter((r) => this.unaccentLower(r[n].toString()).indexOf(i) > -1), o.sort((r, l) => {
        const d = this.unaccentLower(r[n].toString()).startsWith(i), u = this.unaccentLower(l[n].toString()).startsWith(i);
        return d && !u ? -1 : !d && u ? 1 : 0;
      });
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
          return (D.date.extractDate(d, s.datetimeFormat).getTime() > D.date.extractDate(u, s.datetimeFormat).getTime() ? 1 : -1) * o;
        });
      } else
        return this.sortCiAi(t, s.field, a);
    }).bind(this) : this.sortCiAi;
  },
  sortCiAi: function(e, t, n) {
    const a = n === !0 ? -1 : 1, s = (i) => i[t], o = new Intl.Collator();
    return e.sort((i, r) => {
      let l = s(i), d = s(r);
      return l == null ? -1 * a : d == null ? 1 * a : En(l) === !0 && En(d) === !0 ? (l - d) * a : Fn(l) === !0 && Fn(d) === !0 ? Ds(l, d) * a : typeof l == "boolean" && typeof d == "boolean" ? (l - d) * a : ([l, d] = [l, d].map((u) => (u + "").toLocaleString()), o.compare(l, d) * a);
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
    return function(t, n, a, s) {
      return D.date.extractDate(t, e).getTime() > D.date.extractDate(n, e).getTime() ? 1 : -1;
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
  toogleFacet: function(e, t, n, a = 1) {
    let s = this.$data.vueData;
    var o = !1;
    s[n + "_facets"].forEach(function(r) {
      r.code === e && (o = r.multiple);
    });
    var i = s[n + "_selectedFacets"][e];
    i ? i.includes(t) ? o ? i.splice(i.indexOf(t), 1) : i.splice(0) : i.push(t) : s[n + "_selectedFacets"][e] = [t], this.search(n, a);
  },
  search: On(function(e, t = 1) {
    let n = this.$data.componentStates, a = this.$data.vueData;
    var s = e + "_selectedFacets", o = a[e + "_criteriaContextKey"], i = this.vueDataParams([o]);
    i.append(s, JSON.stringify(a[s]));
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
    let t = e.dataset.componentId;
    e.dataset.autoHeight === "true" && (e.style.opacity = "0", this.modal_iframeAjustHeight(e)), this.componentStates[t].loading = !1, e.style.opacity = "1";
  },
  modal_iframeAjustHeight(e) {
    let t = e.dataset.componentId, n = e.contentDocument ? e.contentDocument : e.contentWindow.document;
    setTimeout((function() {
      let a = this.getDocHeight(n) + 4 + "px";
      e.style.height = "", this.componentStates[t].height = a;
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
    var a = t ? Array.isArray(t) ? this.vueDataParams(t) : t : [];
    let s = this.$data.vueData, o = this.$data.uiMessageStack, i = this.isFormData(a) ? a : this.objectToFormData(a);
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
          o[d] = r.data.uiMessageStack[d];
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
}, Os = {
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
}, Ms = {
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
var Bn = {
  getBoundMethods: function(e, t) {
    let n = {};
    return Object.keys(t).forEach((a) => n[a] = t[a].bind(e)), n;
  },
  install: function(e, t) {
    if (e.component("v-chatbot", ao), e.component("v-commands", go), e.component("v-comments", Co), e.component("v-extensions-store", Oo), e.component("v-facets", Uo), e.component("v-geopoint-input", Ro), e.component("v-handles", ea), e.component("v-json-editor", ca), e.component("v-notifications", wa), e.component("v-map", Va), e.component("v-map-layer", Na), e.component("v-tree", Ya), e.component("v-file-upload", wi), e.component("v-file-upload-quasar", Ui), e.component("v-dashboard-chart", hs), e.directive("alert-unsaved-updates", ps), e.directive("autofocus", ms), e.directive("if-unsaved-updates", ws), e.directive("minify", bs), e.directive("scroll-spy", qs), !t.axios) {
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
          return Bn.getBoundMethods(At, At);
        }
      }
    });
  },
  methods: At,
  initData: function(e, t) {
    e.vueData = t.vueData, e.componentStates = t.componentStates, e.uiMessageStack = t.uiMessageStack, e.vuiLang = t.vuiLang;
  },
  lang: {
    enUS: Os,
    fr: Ms
  }
};
window && (window.VertigoUi = Bn);
export {
  Bn as default
};
//# sourceMappingURL=vertigo-ui.es.js.map
