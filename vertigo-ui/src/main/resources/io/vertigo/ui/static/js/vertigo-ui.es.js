const L = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, s] of t)
    n[i] = s;
  return n;
}, Rn = {
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
          var i = n.title.substring(1);
          i === "textarea" && (this.inputConfig.modeTextarea = !0), i === "eval" && (this.inputConfig.showRating = !0), i === "keep_action" && (this.keepAction = !0), n.payload && (this.inputConfig.responsePattern = n.payload);
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
}, Zt = window.Vue.renderList, en = window.Vue.Fragment, U = window.Vue.openBlock, Ke = window.Vue.createElementBlock, xe = window.Vue.resolveComponent, ge = window.Vue.createVNode, Se = window.Vue.withCtx, le = window.Vue.createBlock, we = window.Vue.createCommentVNode, tn = window.Vue.toDisplayString, oe = window.Vue.createElementVNode, Hn = window.Vue.withKeys, Gn = { class: "bot" }, Jn = { class: "q-pr-md" }, Yn = { class: "sys-chat" }, Wn = { class: "q-pb-sm" }, Xn = { class: "sys-chat non-selectable" }, Qn = { class: "text-blue-2 q-caption" }, Kn = { class: "row docs-btn" }, Zn = { class: "message-processing sys-chat non-selectable" }, eo = { class: "non-selectable" }, to = { class: "message-response row docs-btn q-pl-sm non-selectable" };
function no(e, t, n, i, s, o) {
  const a = xe("q-rating"), r = xe("q-chat-message"), l = xe("q-btn"), c = xe("q-spinner-dots"), u = xe("q-scroll-area"), p = xe("q-input");
  return U(), Ke("div", Gn, [
    ge(u, {
      class: "bg-grey-2 col-grow row q-pa-sm",
      ref: "scroller"
    }, {
      default: Se(() => [
        oe("div", Jn, [
          (U(!0), Ke(en, null, Zt(e.messages, (h, m) => (U(), Ke("div", { key: m }, [
            h.rating ? (U(), le(r, {
              class: "animate-fade",
              key: "msgRating-" + m,
              sent: h.sent,
              "bg-color": h.bgColor,
              avatar: h.avatar
            }, {
              default: Se(() => [
                ge(a, {
                  modelValue: h.rating,
                  "onUpdate:modelValue": (d) => h.rating = d,
                  max: 5,
                  style: { "font-size": "2rem" },
                  readonly: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1032, ["sent", "bg-color", "avatar"])) : we("", !0),
            h.text ? (U(), le(r, {
              class: "animate-fade",
              key: "msg-" + m,
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
          oe("div", Yn, [
            e.error ? (U(), le(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "orange-4",
              "text-color": "black",
              size: "12"
            }, {
              default: Se(() => [
                oe("div", Wn, tn(e.$q.lang.vui.chatbot.errorMessage), 1),
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
          oe("div", Xn, [
            e.inputConfig.buttons.length > 0 ? (U(), le(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "primary",
              size: "12"
            }, {
              default: Se(() => [
                oe("div", Qn, tn(e.$q.lang.vui.suggestedAnswers), 1),
                oe("div", Kn, [
                  (U(!0), Ke(en, null, Zt(e.inputConfig.buttons, (h, m) => (U(), le(l, {
                    class: "full-width",
                    key: "repChatBtn-" + m,
                    onClick: (d) => o.postAnswerBtn(h),
                    label: h.title,
                    color: "white",
                    "text-color": "black"
                  }, null, 8, ["onClick", "label"]))), 128))
                ])
              ]),
              _: 1
            })) : we("", !0)
          ]),
          oe("div", Zn, [
            e.processing ? (U(), le(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "grey-4"
            }, {
              default: Se(() => [
                ge(c, { size: "2em" })
              ]),
              _: 1
            })) : we("", !0)
          ]),
          oe("div", eo, [
            e.inputConfig.showRating ? (U(), le(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "primary",
              sent: ""
            }, {
              default: Se(() => [
                ge(a, {
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
    oe("div", to, [
      ge(p, {
        type: e.inputConfig.modeTextarea ? "textarea" : "text",
        ref: "input",
        onKeyup: t[2] || (t[2] = Hn((h) => e.inputConfig.modeTextarea || e.inputConfig.responseText.trim() === "" && e.inputConfig.rating === 0 ? !1 : o.postAnswerText(), ["enter"])),
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
      n.devMode === !0 ? (U(), le(l, {
        key: 0,
        round: "",
        color: "red",
        icon: "refresh",
        onClick: o.restart
      }, null, 8, ["onClick"])) : we("", !0)
    ])
  ]);
}
const oo = /* @__PURE__ */ L(Rn, [["render", no]]), io = {
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
      this.$http.post(this.baseUrl + "api/vertigo/commands/_search", { prefix: e }).then((function(i) {
        this.$data.commands = i.data, t((function() {
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
    autocompleteParam: function(e, t, n, i, s) {
      if (n.length < 1) {
        s();
        return;
      }
      this.$http.get(this.baseUrl + "api/vertigo/commands/params/_autocomplete", { params: { terms: n, entityClass: e.paramType.actualTypeArguments[0] } }).then((function(o) {
        i((function() {
          var a = this.$data.paramsAutocompleteOptions.slice();
          a[t] = o.data.map(function(r) {
            return {
              label: r.label,
              value: r.urn
            };
          }), this.$data.paramsAutocompleteOptions = a;
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
}, Pe = window.Vue.toDisplayString, I = window.Vue.openBlock, de = window.Vue.createElementBlock, nn = window.Vue.createCommentVNode, Ze = window.Vue.resolveComponent, on = window.Vue.withCtx, et = window.Vue.createBlock, an = window.Vue.createElementVNode, ao = window.Vue.renderList, sn = window.Vue.Fragment, ke = window.Vue.withKeys, xt = window.Vue.createVNode, so = window.Vue.createTextVNode, ro = {
  key: 0,
  style: { "line-height": "40px", opacity: "0.5", position: "fixed" }
}, lo = {
  class: "bg-grey-4 text-center vertical-middle text-bold q-px-md",
  style: { "line-height": "40px" }
}, co = {
  key: 0,
  class: "row col items-center q-py-xs"
}, uo = {
  key: 1,
  class: "col"
}, fo = {
  key: 1,
  class: "row col items-center"
}, ho = {
  class: "col shadow-2 bg-secondary text-white q-px-md",
  style: { "line-height": "40px" }
};
function po(e, t, n, i, s, o) {
  const a = Ze("q-select"), r = Ze("q-input"), l = Ze("q-separator"), c = Ze("q-btn");
  return I(), de("div", null, [
    e.isCommandCommited ? (I(), de("div", {
      key: 1,
      class: "row col-12 justify-between bg-white round-borders overflow-hidden shadow-2 text-black",
      onKeyup: t[0] || (t[0] = ke((...u) => o.executeCommand && o.executeCommand(...u), ["enter"]))
    }, [
      an("div", lo, Pe(e.selectedCommand.commandName), 1),
      e.isExecuted ? (I(), de("div", fo, [
        an("div", ho, Pe(e.commandResult.display), 1),
        e.commandResult.targetUrl ? (I(), et(c, {
          key: 0,
          type: "a",
          href: n.baseUrl + e.commandResult.targetUrl,
          flat: ""
        }, {
          default: on(() => [
            so(Pe(e.$q.lang.vui.commands.linkLabel), 1)
          ]),
          _: 1
        }, 8, ["href"])) : nn("", !0),
        xt(c, {
          onClick: o.reset,
          flat: "",
          icon: "cancel",
          size: "sm",
          round: ""
        }, null, 8, ["onClick"])
      ])) : (I(), de("div", co, [
        e.selectedCommand.commandParams && e.selectedCommand.commandParams.length > 0 ? (I(!0), de(sn, { key: 0 }, ao(e.selectedCommand.commandParams, (u, p) => (I(), de(sn, { key: u }, [
          u.paramType.rawType === "io.vertigo.commons.command.GenericUID" ? (I(), et(a, {
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
          }, null, 8, ["value", "options", "autofocus", "onKeydown", "onKeyup", "onFilter", "onUpdate:modelValue"])) : (I(), et(r, {
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
          xt(l, { vertical: "" })
        ], 64))), 128)) : (I(), de("div", uo, Pe(e.$q.lang.vui.commands.executeCommand), 1)),
        xt(c, {
          onClick: o.executeCommand,
          flat: "",
          icon: "play_arrow",
          size: "sm",
          round: ""
        }, null, 8, ["onClick"])
      ]))
    ], 32)) : (I(), et(a, {
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
      default: on(() => [
        e.text !== "" && e.selectedCommand.commandName && e.selectedCommand.commandName.startsWith(e.text) ? (I(), de("span", ro, Pe(e.selectedCommand.commandName), 1)) : nn("", !0)
      ]),
      _: 1
    }, 8, ["placeholder", "onBlur", "onKeydown", "options", "onFilter", "onUpdate:modelValue"]))
  ]);
}
const mo = /* @__PURE__ */ L(io, [["render", po]]), St = window.Quasar, go = {
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
      let t = St.date.getDateDiff(Date.now(), e, "days");
      return t > 0 ? t + " days" : (t = St.date.getDateDiff(Date.now(), e, "hours"), t > 0 ? t + " hours" : (t = St.date.getDateDiff(Date.now(), e, "minutes"), t > 0 ? t + " min" : "Now"));
    }
  }
}, Be = window.Vue.toDisplayString, tt = window.Vue.createTextVNode, P = window.Vue.resolveComponent, T = window.Vue.withCtx, Ve = window.Vue.openBlock, nt = window.Vue.createBlock, kt = window.Vue.createCommentVNode, E = window.Vue.createVNode, wo = window.Vue.renderList, bo = window.Vue.Fragment, rn = window.Vue.createElementBlock, ln = window.Vue.createElementVNode, yo = window.Vue.normalizeClass, vo = ["src"];
function $o(e, t, n, i, s, o) {
  const a = P("q-badge"), r = P("q-btn"), l = P("big"), c = P("q-item-label"), u = P("q-input"), p = P("q-item-section"), h = P("q-item"), m = P("q-separator"), d = P("q-avatar"), f = P("q-icon"), g = P("q-popup-edit"), b = P("q-list"), _ = P("q-drawer");
  return Ve(), rn("span", null, [
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
        e.count > 0 ? (Ve(), nt(a, {
          key: 0,
          floating: "",
          small: "",
          color: "red",
          style: { right: "-.4em", top: "-.4em" }
        }, {
          default: T(() => [
            tt(Be(e.count), 1)
          ]),
          _: 1
        })) : kt("", !0)
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
            E(c, { header: "" }, {
              default: T(() => [
                E(l, null, {
                  default: T(() => [
                    tt(Be(e.$q.lang.vui.comments.title), 1)
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
            E(m),
            (Ve(!0), rn(bo, null, wo(e.list, (y) => (Ve(), nt(h, {
              key: y.uuid,
              class: yo(["items-start", { "cursor-pointer": y.author == n.connectedAccount }])
            }, {
              default: T(() => [
                E(p, { avatar: "" }, {
                  default: T(() => [
                    E(d, null, {
                      default: T(() => [
                        ln("img", {
                          src: n.baseUrl + "x/accounts/api/" + y.author + "/photo"
                        }, null, 8, vo)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                E(p, null, {
                  default: T(() => [
                    E(c, null, {
                      default: T(() => [
                        tt(Be(y.authorDisplayName), 1)
                      ]),
                      _: 2
                    }, 1024),
                    ln("div", null, Be(y.msg), 1)
                  ]),
                  _: 2
                }, 1024),
                E(p, { side: "" }, {
                  default: T(() => [
                    E(c, { stamp: "" }, {
                      default: T(() => [
                        tt(Be(o.toDelay(new Date(y.creationDate))), 1)
                      ]),
                      _: 2
                    }, 1024),
                    y.author == n.connectedAccount ? (Ve(), nt(f, {
                      key: 0,
                      name: "edit"
                    })) : kt("", !0)
                  ]),
                  _: 2
                }, 1024),
                y.author == n.connectedAccount ? (Ve(), nt(g, {
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
                }, 1032, ["onSave", "label-cancel", "label-set"])) : kt("", !0)
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
const _o = /* @__PURE__ */ L(go, [["render", $o]]), Co = {
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
}, xo = window.Vue.renderList, So = window.Vue.Fragment, Vt = window.Vue.openBlock, Dt = window.Vue.createElementBlock, Ue = window.Vue.resolveComponent, ko = window.Vue.normalizeStyle, De = window.Vue.createVNode, ot = window.Vue.withCtx, dn = window.Vue.toDisplayString, Ie = window.Vue.createElementVNode, Vo = { class: "row q-col-gutter-md" }, Do = { class: "row col items-center" }, Fo = { class: "q-subheading text-bold" }, qo = { class: "row col q-body-2 text-justify" };
function Eo(e, t, n, i, s, o) {
  const a = Ue("q-icon"), r = Ue("q-item-section"), l = Ue("q-toggle"), c = Ue("q-item"), u = Ue("q-card");
  return Vt(), Dt("div", Vo, [
    (Vt(!0), Dt(So, null, xo(e.extensions, (p) => (Vt(), Dt("div", {
      class: "col-xs-12 col-lg-6 col-xl-4",
      key: p.name
    }, [
      De(u, null, {
        default: ot(() => [
          De(c, {
            class: "bg-white",
            style: { height: "100px" }
          }, {
            default: ot(() => [
              De(r, { avatar: "" }, {
                default: ot(() => [
                  De(a, {
                    name: p.icon,
                    size: "40px",
                    style: ko(o.getIconStyle(p.color))
                  }, null, 8, ["name", "style"])
                ]),
                _: 2
              }, 1024),
              De(r, null, {
                default: ot(() => [
                  Ie("div", Do, [
                    Ie("div", Fo, dn(p.label), 1),
                    t[0] || (t[0] = Ie("div", { class: "col" }, null, -1)),
                    Ie("div", null, [
                      De(l, {
                        disable: "",
                        readonly: "",
                        color: "positive",
                        modelValue: p.enabled,
                        "onUpdate:modelValue": (h) => p.enabled = h
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  Ie("div", qo, dn(p.description), 1)
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
const To = /* @__PURE__ */ L(Co, [["render", Eo]]), Oo = {
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
}, Fe = window.Vue.renderList, be = window.Vue.Fragment, S = window.Vue.openBlock, z = window.Vue.createElementBlock, ce = window.Vue.resolveComponent, D = window.Vue.createVNode, x = window.Vue.withCtx, H = window.Vue.toDisplayString, K = window.Vue.createTextVNode, cn = window.Vue.mergeProps, Z = window.Vue.createBlock, ye = window.Vue.createCommentVNode, Mo = window.Vue.normalizeClass, Lo = {
  key: 1,
  class: "facets"
}, No = {
  key: 0,
  class: "selectedFacets q-pb-md"
};
function Ao(e, t, n, i, s, o) {
  const a = ce("q-checkbox"), r = ce("q-item-section"), l = ce("q-item-label"), c = ce("q-chip"), u = ce("q-item"), p = ce("q-select"), h = ce("q-btn"), m = ce("q-list");
  return n.render === "selects" ? (S(), z("div", {
    key: 0,
    class: Mo(["row col q-gutter-md", { "horizontal-facets": n.layout === "horizontal" }])
  }, [
    (S(!0), z(be, null, Fe(n.facets.filter(n.facetFilter), (d) => (S(), z("div", {
      key: d.code,
      class: "facet-select"
    }, [
      d.multiple ? (S(), Z(p, {
        key: 0,
        label: d.label,
        "model-value": n.selectedFacets[d.code],
        multiple: "",
        onAdd: (f) => e.$emit("toogle-facet", d.code, f.value.code, n.contextKey),
        onRemove: (f) => e.$emit("toogle-facet", d.code, f.value, n.contextKey),
        options: o.selectedInvisibleFacets(d.code).concat(d.values),
        "option-value": "code",
        "use-chips": "",
        outlined: "",
        "input-class": "no-wrap"
      }, {
        option: x(({ itemProps: f, opt: g, selected: b, toggleOption: _ }) => [
          D(u, cn({ ref_for: !0 }, f, {
            class: "facet-selection-option",
            dense: ""
          }), {
            default: x(() => [
              D(r, { avatar: "" }, {
                default: x(() => [
                  D(a, {
                    "model-value": b,
                    "onUpdate:modelValue": (y) => _(g),
                    size: "sm"
                  }, null, 8, ["model-value", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024),
              D(r, null, {
                default: x(() => [
                  D(l, null, {
                    default: x(() => [
                      K(H(g.label), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024),
              D(r, { side: "" }, {
                default: x(() => [
                  D(c, {
                    label: g.count,
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
      }, 1032, ["label", "model-value", "onAdd", "onRemove", "options"])) : (S(), Z(p, {
        key: 1,
        label: d.label,
        "model-value": n.selectedFacets[d.code].length > 0 ? n.selectedFacets[d.code][0] : null,
        "onUpdate:modelValue": (f) => e.$emit("toogle-facet", d.code, f || n.selectedFacets[d.code][0], n.contextKey),
        options: o.selectedInvisibleFacets(d.code).concat(d.values),
        "option-value": "code",
        clearable: "",
        "emit-value": "",
        "map-options": "",
        outlined: "",
        "input-class": "no-wrap"
      }, {
        option: x(({ itemProps: f, opt: g, selected: b, toggleOption: _ }) => [
          D(u, cn({ ref_for: !0 }, f, {
            class: "facet-selection-option",
            dense: ""
          }), {
            default: x(() => [
              D(r, null, {
                default: x(() => [
                  D(l, null, {
                    default: x(() => [
                      K(H(g.label), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024),
              D(r, { side: "" }, {
                default: x(() => [
                  D(c, {
                    label: g.count,
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
  ], 2)) : (S(), z("div", Lo, [
    o.isAnyFacetValueSelected() ? (S(), z("div", No, [
      (S(!0), z(be, null, Fe(n.selectedFacets, (d, f) => (S(), z("div", { key: f }, [
        o.facetMultipleByCode(f) ? ye("", !0) : (S(!0), z(be, { key: 0 }, Fe(d, (g) => (S(), Z(c, {
          clickable: "",
          class: "q-mb-sm",
          key: g.code,
          onClick: (b) => e.$emit("toogle-facet", f, g, n.contextKey),
          "icon-right": "cancel"
        }, {
          default: x(() => [
            K(H(o.facetLabelByCode(f)) + ": " + H(o.facetValueLabelByCode(f, g)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]))), 128))
    ])) : ye("", !0),
    (S(!0), z(be, null, Fe(n.facets.filter(n.facetFilter), (d) => (S(), Z(m, {
      key: d.code,
      class: "facetValues q-py-none",
      dense: ""
    }, {
      default: x(() => [
        d.multiple || !o.isFacetSelected(d.code) ? (S(), z(be, { key: 0 }, [
          D(l, { header: "" }, {
            default: x(() => [
              K(H(d.label), 1)
            ]),
            _: 2
          }, 1024),
          (S(!0), z(be, null, Fe(o.selectedInvisibleFacets(d.code), (f) => (S(), Z(u, {
            key: f.code,
            class: "facetValue q-ml-md",
            clickable: "",
            onClick: (g) => e.$emit("toogle-facet", d.code, f.code, n.contextKey)
          }, {
            default: x(() => [
              d.multiple ? (S(), Z(r, {
                key: 0,
                side: ""
              }, {
                default: x(() => [
                  D(a, {
                    dense: "",
                    modelValue: !0,
                    "onUpdate:modelValue": (g) => e.$emit("toogle-facet", d.code, f.code, n.contextKey)
                  }, null, 8, ["onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024)) : ye("", !0),
              D(r, null, {
                default: x(() => [
                  K(H(o.facetValueLabelByCode(d.code, f.code)), 1)
                ]),
                _: 2
              }, 1024),
              D(r, { side: "" }, {
                default: x(() => [
                  K(H(f.count), 1)
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1032, ["onClick"]))), 128)),
          (S(!0), z(be, null, Fe(o.visibleFacets(d.code, d.values), (f) => (S(), Z(u, {
            key: f.code,
            class: "facetValue q-ml-md",
            clickable: "",
            onClick: (g) => e.$emit("toogle-facet", d.code, f.code, n.contextKey)
          }, {
            default: x(() => [
              d.multiple ? (S(), Z(r, {
                key: 0,
                side: ""
              }, {
                default: x(() => [
                  D(a, {
                    dense: "",
                    modelValue: o.isFacetValueSelected(d.code, f.code),
                    "onUpdate:modelValue": (g) => e.$emit("toogle-facet", d.code, f.code, n.contextKey)
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024)) : ye("", !0),
              D(r, null, {
                default: x(() => [
                  K(H(o.facetValueLabelByCode(d.code, f.code)), 1)
                ]),
                _: 2
              }, 1024),
              D(r, { side: "" }, {
                default: x(() => [
                  K(H(f.count), 1)
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1032, ["onClick"]))), 128)),
          D(u, null, {
            default: x(() => [
              d.values.length > n.maxValues && !o.isFacetExpanded(d.code) ? (S(), Z(h, {
                key: 0,
                flat: "",
                onClick: (f) => o.expandFacet(d.code),
                class: "q-ma-none"
              }, {
                default: x(() => [
                  K(H(e.$q.lang.vui.facets.showAll), 1)
                ]),
                _: 2
              }, 1032, ["onClick"])) : ye("", !0),
              d.values.length > n.maxValues && o.isFacetExpanded(d.code) ? (S(), Z(h, {
                key: 1,
                flat: "",
                onClick: (f) => o.reduceFacet(d.code),
                class: "q-ma-none"
              }, {
                default: x(() => [
                  K(H(e.$q.lang.vui.facets.showLess), 1)
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
const Po = /* @__PURE__ */ L(Oo, [["render", Ao]]), Bo = {
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
}, Uo = window.Vue.renderSlot, un = window.Vue.vModelText, Ft = window.Vue.createElementVNode, fn = window.Vue.withDirectives, hn = window.Vue.createTextVNode, Io = { class: "inputs" };
function zo(e, t, n, i, s, o) {
  return Uo(e.$slots, "default", { updateJson: o.updateJson }, () => [
    Ft("div", Io, [
      t[4] || (t[4] = hn(" Longitude ")),
      fn(Ft("input", {
        "onUpdate:modelValue": [
          t[0] || (t[0] = (a) => e.inputObject.lon = a),
          t[1] || (t[1] = (...a) => o.updateJson && o.updateJson(...a))
        ]
      }, null, 512), [
        [
          un,
          e.inputObject.lon,
          void 0,
          { number: !0 }
        ]
      ]),
      t[5] || (t[5] = hn(" Latitude ")),
      fn(Ft("input", {
        "onUpdate:modelValue": [
          t[2] || (t[2] = (a) => e.inputObject.lat = a),
          t[3] || (t[3] = (...a) => o.updateJson && o.updateJson(...a))
        ]
      }, null, 512), [
        [
          un,
          e.inputObject.lat,
          void 0,
          { number: !0 }
        ]
      ])
    ])
  ]);
}
const jo = /* @__PURE__ */ L(Bo, [["render", zo]]), Ro = {
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
}, ze = window.Vue.resolveComponent, it = window.Vue.createVNode, at = window.Vue.withCtx, Ho = window.Vue.renderList, Go = window.Vue.Fragment, qt = window.Vue.openBlock, pn = window.Vue.createElementBlock, Jo = window.Vue.toDisplayString, Yo = window.Vue.createTextVNode, Wo = window.Vue.resolveDirective, Xo = window.Vue.createBlock, Qo = window.Vue.withDirectives;
function Ko(e, t, n, i, s, o) {
  const a = ze("q-icon"), r = ze("q-input"), l = ze("q-item-section"), c = ze("q-item"), u = ze("q-list"), p = Wo("ripple");
  return qt(), pn("div", null, [
    it(r, {
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
        it(a, { name: "search" })
      ]),
      _: 1
    }, 8, ["placeholder", "modelValue", "onInput"]),
    it(u, {
      bordered: "",
      dense: "",
      separator: ""
    }, {
      default: at(() => [
        (qt(!0), pn(Go, null, Ho(e.handles, (h) => Qo((qt(), Xo(c, {
          clickable: "",
          onClick: (m) => e.VUi.methods.goTo(n.baseUrl + "hw/" + h.code),
          key: h.code
        }, {
          default: at(() => [
            it(l, null, {
              default: at(() => [
                Yo(Jo(h.code), 1)
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
const Zo = /* @__PURE__ */ L(Ro, [["render", Ko]]), ei = {
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
}, ti = window.Vue.renderList, ni = window.Vue.Fragment, je = window.Vue.openBlock, Et = window.Vue.createElementBlock, mn = window.Vue.resolveComponent, gn = window.Vue.createBlock;
window.Vue.createCommentVNode;
const oi = window.Vue.toDisplayString, ii = window.Vue.createElementVNode, ai = window.Vue.withCtx, si = window.Vue.normalizeClass, ri = { class: "row" };
function li(e, t, n, i, s, o) {
  const a = mn("q-input"), r = mn("q-field");
  return je(), Et("div", ri, [
    (je(!0), Et(ni, null, ti(e.jsonAsObject, (l, c) => (je(), Et("div", {
      key: c,
      class: si("col-" + 12 / n.cols)
    }, [
      n.readonly ? (je(), gn(r, {
        key: 1,
        label: c,
        orientation: "vertical",
        "stack-label": "",
        borderless: "",
        readonly: ""
      }, {
        default: ai(() => [
          ii("span", null, oi(l), 1)
        ]),
        _: 2
      }, 1032, ["label"])) : (je(), gn(a, {
        key: 0,
        label: c,
        orientation: "vertical",
        "stack-label": "",
        modelValue: e.jsonAsObject[c],
        "onUpdate:modelValue": [(u) => e.jsonAsObject[c] = u, o.updateJson]
      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]))
    ], 2))), 128))
  ]);
}
const di = /* @__PURE__ */ L(ei, [["render", li]]), Re = window.Quasar, ci = {
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
      const t = e.sort(function(o, a) {
        return a.creationDate - o.creationDate;
      });
      var n = [], i = this.list[0];
      if (!i)
        n = t;
      else
        for (var s = 0; s < t.length; s++)
          if (t[s].uuid != i.uuid) {
            if (t[s].creationDate < i.creationDate)
              break;
            n.push(t[s]);
          }
      this.list = t, this.count = t.length, this.firstCall ? this.hasNew = n.length > 0 && Re.date.getDateDiff(Date.now(), n[0].creationDate, "seconds") < 2 * 5 : (this.hasNew = n.length > 0, n.forEach((function(o) {
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
      let t = Re.date.getDateDiff(Date.now(), e, "days");
      return t > 0 ? t + " " + this.$q.lang.vui.notifications.days : (t = Re.date.getDateDiff(Date.now(), e, "hours"), t > 0 ? t + " " + this.$q.lang.vui.notifications.hours : (t = Re.date.getDateDiff(Date.now(), e, "minutes"), t > 0 ? t + " " + this.$q.lang.vui.notifications.minutes : (t = Re.date.getDateDiff(Date.now(), e, "seconds"), t + " " + this.$q.lang.vui.notifications.seconds)));
    }
  },
  beforeDestroy: function() {
    clearInterval(this.timer);
  }
}, st = window.Vue.toDisplayString, rt = window.Vue.createTextVNode, ue = window.Vue.resolveComponent, G = window.Vue.withCtx, lt = window.Vue.openBlock, Tt = window.Vue.createBlock, ui = window.Vue.createCommentVNode, fi = window.Vue.renderList, hi = window.Vue.Fragment, pi = window.Vue.createElementBlock, ie = window.Vue.createVNode;
function mi(e, t, n, i, s, o) {
  const a = ue("q-badge"), r = ue("q-icon"), l = ue("q-item-section"), c = ue("q-item-label"), u = ue("q-item"), p = ue("q-list"), h = ue("q-menu"), m = ue("q-btn");
  return lt(), Tt(m, {
    round: "",
    flat: !e.hasNew,
    dense: "",
    color: e.hasNew ? n.colorNew : n.color,
    "text-color": e.hasNew ? n.textColorNew : n.textColor,
    icon: e.wasError ? n.iconError : e.count > 0 ? n.icon : n.iconNone,
    title: e.wasError ? e.$q.lang.vui.notifications.serverLost : ""
  }, {
    default: G(() => [
      e.count > 0 ? (lt(), Tt(a, {
        key: 0,
        color: "red",
        "text-color": "white",
        floating: ""
      }, {
        default: G(() => [
          rt(st(e.count), 1)
        ]),
        _: 1
      })) : ui("", !0),
      ie(h, { class: "notifications" }, {
        default: G(() => [
          ie(p, { style: { width: "300px" } }, {
            default: G(() => [
              (lt(!0), pi(hi, null, fi(e.list, (d) => (lt(), Tt(u, {
                key: d.uuid,
                tag: "a",
                href: n.targetUrlPrefix + d.targetUrl
              }, {
                default: G(() => [
                  ie(l, { avatar: "" }, {
                    default: G(() => [
                      ie(r, {
                        name: o.toIcon(d.type),
                        size: "2rem"
                      }, null, 8, ["name"])
                    ]),
                    _: 2
                  }, 1024),
                  ie(l, null, {
                    default: G(() => [
                      ie(c, null, {
                        default: G(() => [
                          rt(st(d.title), 1)
                        ]),
                        _: 2
                      }, 1024),
                      ie(c, {
                        caption: "",
                        lines: "3"
                      }, {
                        default: G(() => [
                          rt(st(d.content), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  ie(l, {
                    side: "",
                    top: ""
                  }, {
                    default: G(() => [
                      ie(c, { caption: "" }, {
                        default: G(() => [
                          rt(st(o.toDelay(new Date(d.creationDate))), 1)
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
const gi = /* @__PURE__ */ L(ci, [["render", mi]]);
var dt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function wi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ot, wn;
function bi() {
  if (wn) return Ot;
  wn = 1;
  var e = "Expected a function", t = NaN, n = "[object Symbol]", i = /^\s+|\s+$/g, s = /^[-+]0x[0-9a-f]+$/i, o = /^0b[01]+$/i, a = /^0o[0-7]+$/i, r = parseInt, l = typeof dt == "object" && dt && dt.Object === Object && dt, c = typeof self == "object" && self && self.Object === Object && self, u = l || c || Function("return this")(), p = Object.prototype, h = p.toString, m = Math.max, d = Math.min, f = function() {
    return u.Date.now();
  };
  function g(w, C, $) {
    var se, Me, Xe, Ce, R, me, Le = 0, Wt = !1, Ne = !1, $t = !0;
    if (typeof w != "function")
      throw new TypeError(e);
    C = V(C) || 0, b($) && (Wt = !!$.leading, Ne = "maxWait" in $, Xe = Ne ? m(V($.maxWait) || 0, C) : Xe, $t = "trailing" in $ ? !!$.trailing : $t);
    function _t(q) {
      var re = se, Ae = Me;
      return se = Me = void 0, Le = q, Ce = w.apply(Ae, re), Ce;
    }
    function Un(q) {
      return Le = q, R = setTimeout(Qe, C), Wt ? _t(q) : Ce;
    }
    function In(q) {
      var re = q - me, Ae = q - Le, Kt = C - re;
      return Ne ? d(Kt, Xe - Ae) : Kt;
    }
    function Xt(q) {
      var re = q - me, Ae = q - Le;
      return me === void 0 || re >= C || re < 0 || Ne && Ae >= Xe;
    }
    function Qe() {
      var q = f();
      if (Xt(q))
        return Qt(q);
      R = setTimeout(Qe, In(q));
    }
    function Qt(q) {
      return R = void 0, $t && se ? _t(q) : (se = Me = void 0, Ce);
    }
    function zn() {
      R !== void 0 && clearTimeout(R), Le = 0, se = me = Me = R = void 0;
    }
    function jn() {
      return R === void 0 ? Ce : Qt(f());
    }
    function Ct() {
      var q = f(), re = Xt(q);
      if (se = arguments, Me = this, me = q, re) {
        if (R === void 0)
          return Un(me);
        if (Ne)
          return R = setTimeout(Qe, C), _t(me);
      }
      return R === void 0 && (R = setTimeout(Qe, C)), Ce;
    }
    return Ct.cancel = zn, Ct.flush = jn, Ct;
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
    w = w.replace(i, "");
    var $ = o.test(w);
    return $ || a.test(w) ? r(w.slice(2), $ ? 2 : 8) : s.test(w) ? t : +w;
  }
  return Ot = g, Ot;
}
var yi = bi();
const Oe = /* @__PURE__ */ wi(yi), N = window.ol, vi = {
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
    let e = new N.View();
    const t = new N.source.OSM();
    let n = new N.layer.Tile({
      preload: 4,
      source: t
    });
    const i = [$i()];
    this.$props.overview && i.push(new N.control.OverviewMap({ layers: [new N.layer.Tile({ source: t })] })), this.$props.search && typeof Geocoder == "function" && i.push(new Geocoder("nominatim", {
      provider: "osm",
      lang: "fr",
      placeholder: "Search for ...",
      limit: 5,
      debug: !1,
      autoComplete: !0,
      keepOpen: !0,
      preventMarker: !0,
      defaultFlyResolution: 19
    })), this.olMap = new N.Map({
      interactions: N.interaction.defaults.defaults({
        onFocusOnly: !0
      }),
      target: this.$props.id,
      layers: [n],
      // Improve user experience by loading tiles while animating. Will make animations stutter on mobile or slow devices.
      loadTilesWhileAnimating: !0,
      view: e,
      controls: N.control.defaults.defaults().extend(i)
    }), this.$props.initialCenter && this.olMap.getView().setCenter(N.proj.fromLonLat([this.$props.initialCenter.lon, this.$props.initialCenter.lat])), this.onMapMoveEndDebounced = Oe((s, o) => {
      this.$emit("moveend", s, o);
    }, 300), this.olMap.on("moveend", (function(s) {
      let o = s.map.getView().calculateExtent(), a = N.proj.transformExtent(o, "EPSG:3857", "EPSG:4326"), r = N.extent.getTopLeft(a), l = N.extent.getBottomRight(a);
      this.onMapMoveEndDebounced(r, l);
    }).bind(this)), this.onMapClickDebounced = Oe((s) => {
      this.$emit("click", N.proj.transform(s, "EPSG:3857", "EPSG:4326"));
    }, 300), setTimeout((function() {
      this.olMap.on("click", (function(s) {
        s.originalEvent.target instanceof HTMLCanvasElement && (s.stopPropagation(), this.onMapClickDebounced(s.coordinate));
      }).bind(this));
    }).bind(this), 300);
  }
};
function $i() {
  return new class extends N.control.Control {
    /**
     * @param {Object} [opt_options] Control options.
     */
    constructor(t) {
      const n = t || {}, i = document.createElement("div");
      i.className = "ol-v-custom-buttons ol-unselectable ol-control", super({
        element: i,
        target: n.target
      });
    }
  }();
}
const _i = window.Vue.normalizeProps, Ci = window.Vue.guardReactiveProps, xi = window.Vue.renderSlot, Si = window.Vue.openBlock, ki = window.Vue.createElementBlock, Vi = ["id"];
function Di(e, t, n, i, s, o) {
  return Si(), ki("div", {
    id: n.id,
    class: "map"
  }, [
    xi(e.$slots, "default", _i(Ci(e.$attrs)))
  ], 8, Vi);
}
const Fi = /* @__PURE__ */ L(vi, [["render", Di]]), v = window.ol, qi = {
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
      let e = this.$props.field, t = this.$data.items.filter(function(i) {
        return i[e] != null;
      }).map((function(i) {
        let s;
        if (typeof i[e] == "string" || i[e] instanceof String ? s = JSON.parse(i[e]) : s = i[e], s != null && s.lon != null && s.lat != null) {
          let o = new v.Feature({
            geometry: new v.geom.Point(v.proj.fromLonLat([s.lon, s.lat]))
          });
          return this.$props.nameField && (o.set("name", i[this.$props.nameField]), o.set("innerObject", i), o.set("totalCount", i.totalCount)), o;
        }
        return null;
      }).bind(this)).filter((i) => i != null), n = this.$data.clusters.filter(function(i) {
        return i.geoLocation != null;
      }).map((function(i) {
        let s;
        if (typeof i.geoLocation == "string" || i.geoLocation instanceof String ? s = JSON.parse(i.geoLocation) : s = i.geoLocation, s != null) {
          let o = new v.Feature({
            geometry: new v.geom.Point(v.proj.fromLonLat([s.lon, s.lat]))
          });
          return this.$props.nameField && (o.set("name", i[this.$props.nameField]), o.set("innerObject", i), o.set("totalCount", i.totalCount)), o;
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
      const t = this.bounds(e), n = t.sw.lat, i = t.sw.lon, s = t.ne.lat, o = t.ne.lon;
      let a = (n + s) / 2, r = (i + o) / 2;
      return a = a.toFixed(Math.floor(2 - Math.log(s - n) / Math.LN10)), r = r.toFixed(Math.floor(2 - Math.log(o - i) / Math.LN10)), { lat: Number(a), lon: Number(r) };
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
      let t = !0, n = -90, i = 90, s = -180, o = 180;
      for (let r = 0; r < e.length; r++) {
        const l = e.charAt(r), c = this.$data.base32.indexOf(l);
        if (c == -1) throw new Error("Invalid geohash");
        for (let u = 4; u >= 0; u--) {
          const p = c >> u & 1;
          if (t) {
            const h = (s + o) / 2;
            p == 1 ? s = h : o = h;
          } else {
            const h = (n + i) / 2;
            p == 1 ? n = h : i = h;
          }
          t = !t;
        }
      }
      return {
        sw: { lat: n, lon: s },
        ne: { lat: i, lon: o }
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
      }), i;
      this.$props.markerUseFont ? i = new v.style.Style({
        text: new v.style.Text({
          font: this.$props.markerSize + "px " + this.$props.markerFont,
          text: this.$props.markerIcon,
          fill: new v.style.Fill({ color: this.$props.markerColor }),
          textBaseline: "alphabetic"
        })
      }) : this.$props.markerImage ? i = new v.style.Style({
        image: new v.style.Icon({
          src: this.$props.markerImage,
          scale: this.$props.markerSize / 30,
          anchor: [0.5, 0.95],
          color: this.$props.markerColor
        })
      }) : i = new v.style.Style({
        image: new v.style.Icon({
          src: this.$props.markerImageDynamic(this.$props.markerSize),
          anchor: [0.5, 0.95],
          color: this.$props.markerColor
        })
      });
      let s = {};
      if (n.setStyle((function(o) {
        let a = 0, r = o.get("features");
        for (let l = 0; l < r.length; l++) {
          let c = r[l].get("totalCount");
          a += c || 1;
        }
        if (!a || a == 1)
          return i;
        {
          let l = s[a];
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
              text: a.toString(),
              font: this.$props.clusterTextSize + "px " + this.$props.clusterTextFont,
              fill: new v.style.Fill({
                color: this.$props.clusterTextColor
              })
            })
          }), s[a] = l), l;
        }
      }).bind(this)), this.olMap.addLayer(n), this.fitView(), this.features.length == 0 && (this.olMap.getView().setCenter(v.proj.fromLonLat([2.333333, 48.866667])), this.olMap.vInitialZoomOverride = 3), this.onMapMoveEndDebounced = Oe((o, a) => {
        this.baseUrl && this.fetchList({ lat: o[0], lon: o[1] }, { lat: a[0], lon: a[1] }), this.$emit("moveend", o, a);
      }, 300), this.olMap.on("moveend", (function(o) {
        let a = o.map.getView().calculateExtent(), r = v.proj.transformExtent(a, "EPSG:3857", "EPSG:4326"), l = v.extent.getTopLeft(r), c = v.extent.getBottomRight(r);
        this.onMapMoveEndDebounced(l, c);
      }).bind(this)), this.onMapClickDebounced = Oe((o) => {
        this.$emit("click", v.proj.transform(o, "EPSG:3857", "EPSG:4326"));
      }, 300), this.$props.nameField) {
        let o = new v.Overlay({
          element: this.$el.querySelector("#" + this.$props.id + "Popup"),
          positioning: "bottom-center",
          stopEvent: !1,
          offset: [0, -20]
        });
        this.olMap.addOverlay(o), this.olMap.on("click", (function(a) {
          if (a.originalEvent.target instanceof HTMLCanvasElement) {
            let r = this.olMap.forEachFeatureAtPixel(
              a.pixel,
              function(l) {
                return l;
              }
            );
            if (r && r.get("features") && r.get("features").length == 1) {
              if (!Object.hasOwn(r.get("features")[0].get("innerObject"), "geoHash")) {
                let l = r.getGeometry().getCoordinates();
                o.setPosition(l), this.$data.popupDisplayed = !0, this.$data.objectDisplayed = r.get("features")[0].get("innerObject"), a.stopPropagation(), this.onMapClickDebounced(l);
              }
            } else
              this.$data.popupDisplayed = !1;
          }
        }).bind(this)), this.olMap.on("pointermove", (function(a) {
          if (a.dragging) {
            this.$data.popupDisplayed = !1;
            return;
          }
          let r = this.olMap.getEventPixel(a.originalEvent), l = this.olMap.hasFeatureAtPixel(r);
          this.olMap.getTargetElement().style.cursor = l ? "pointer" : "";
        }).bind(this));
      } else
        this.olMap.on("click", (function(o) {
          if (o.originalEvent.target instanceof HTMLCanvasElement) {
            let a = this.olMap.forEachFeatureAtPixel(
              o.pixel,
              function(r) {
                return r;
              }
            );
            if (a && a.get("features") && a.get("features").length == 1) {
              let r = a.getGeometry().getCoordinates();
              o.stopPropagation(), this.onMapClickDebounced(r);
            }
          }
        }).bind(this));
      if (this.$props.object && this.$props.objectEditable) {
        let o = new v.interaction.Draw({
          source: this.$data.vectorSource,
          type: "Point"
        });
        o.on("drawend", (r) => {
          let l = r.feature, c = v.proj.toLonLat(l.getGeometry().getCoordinates());
          this.$data.vectorSource.clear(), this.olMap.removeInteraction(o), a.classList.remove("active"), this.$props.object[this.$props.field] = {
            lon: c[0],
            lat: c[1]
          };
        });
        const a = document.createElement("button");
        a.innerHTML = "&#9678;", a.addEventListener(
          "click",
          (r) => {
            r.preventDefault(), a.classList.contains("active") ? (this.olMap.removeInteraction(o), a.classList.remove("active")) : (this.olMap.addInteraction(o), o = this.olMap.getInteractions().getArray().slice(-1)[0], a.classList.add("active"));
          },
          !1
        ), this.olMap.getViewport().getElementsByClassName("ol-v-custom-buttons")[0].appendChild(a);
      }
    }).bind(this));
  }
}, Ei = window.Vue.renderSlot, Ti = window.Vue.toDisplayString, bn = window.Vue.createElementVNode, Oi = window.Vue.createCommentVNode, Mi = window.Vue.openBlock, Li = window.Vue.createElementBlock, Ni = ["id"], Ai = ["id"], Pi = { class: "popup" };
function Bi(e, t, n, i, s, o) {
  return Mi(), Li("div", { id: n.id }, [
    bn("div", {
      id: n.id + "Popup"
    }, [
      e.popupDisplayed ? Ei(e.$slots, "card", {
        key: 0,
        objectDisplayed: e.objectDisplayed
      }, () => [
        bn("div", Pi, Ti(e.objectDisplayed[n.nameField]), 1)
      ]) : Oi("", !0)
    ], 8, Ai)
  ], 8, Ni);
}
const Ui = /* @__PURE__ */ L(qi, [["render", Bi]]), Ii = window.Quasar, zi = {
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
      Ii.debounce(this.$refs.menu.updatePosition, 500)();
    },
    getSelectedLabel: function() {
      return this.$data.selectedNode ? this.$props.list.find((function(t) {
        return t[this.$props.keyField] === this.$data.selectedNode;
      }).bind(this))[this.$props.labelField] : null;
    },
    convertListToTree: function(e, t) {
      var n = {}, i, s = [], o, a = [];
      for (o = 0; o < e.length; o += 1)
        n[e[o][this.$props.keyField]] = o, a.push({ ...e[o], children: [] });
      for (o = 0; o < e.length; o += 1)
        i = a[o], i[this.$props.parentKeyField] ? a[n[i[this.$props.parentKeyField]]].children.push(i) : s.push(i);
      return t ? [a[n[t]]] : s;
    }
  }
}, ct = window.Vue.resolveComponent, Mt = window.Vue.createVNode, ji = window.Vue.toDisplayString, Ri = window.Vue.createElementVNode, ut = window.Vue.withCtx, Hi = window.Vue.normalizeProps, Gi = window.Vue.guardReactiveProps, Ji = window.Vue.openBlock, Yi = window.Vue.createBlock, Wi = {
  class: "self-center full-width no-outline",
  tabindex: "0"
};
function Xi(e, t, n, i, s, o) {
  const a = ct("q-icon"), r = ct("q-tree"), l = ct("q-menu"), c = ct("q-field");
  return Ji(), Yi(c, Hi(Gi(e.$attrs)), {
    append: ut(() => [
      Mt(a, { name: "arrow_drop_down" })
    ]),
    control: ut(() => [
      Ri("div", Wi, ji(o.getSelectedLabel()), 1)
    ]),
    default: ut(() => [
      Mt(l, {
        breakpoint: 600,
        fit: "",
        ref: "menu"
      }, {
        default: ut(() => [
          Mt(r, {
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
const Qi = /* @__PURE__ */ L(zi, [["render", Xi]]), Ki = window.Vue.ref, Zi = {
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
        this.files = n.map((i) => ({ ...i, status: "OK" })), this.$emit("init-ok");
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
          let n = Ki({
            name: t.name,
            size: t.size,
            type: t.type,
            status: "IN_PROGRESS",
            errorMessage: null,
            progress: 0,
            estimated: null,
            file: t
          }).value;
          this.$data.files.push(n), ea.call(this, n);
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
      let i = typeof this.callbackOnDelete == "function";
      if (this.callbackOnDelete === !0 || i) {
        let s = {};
        s[this.fieldName] = e.fileUri;
        let o = this.$http.delete(this.url, { params: s, credentials: !1 });
        i && this.callbackOnDelete(this, o);
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
function ea(e) {
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
      onUploadProgress: (function(i) {
        e.progress = i.progress, e.estimated = i.estimated;
      }).bind(this)
    }
  ).then((function(i) {
    this.$emit("file-ok", i.data);
    let s = i.data;
    e.status = "OK", e.fileUri = s, this.$emit("update:file-info-uris", [...this.fileInfoUris, s]);
  }).bind(this)).catch((function(i) {
    var s;
    this.$emit("file-failed", i), e.status = "ERROR", ((s = i == null ? void 0 : i.response) == null ? void 0 : s.status) === 413 && (e.errorMessage = this.$vui.i18n().uploader.fileErrorTooBig);
  }).bind(this));
}
const J = window.Vue.toDisplayString, ft = window.Vue.normalizeProps, ht = window.Vue.guardReactiveProps, He = window.Vue.renderSlot, ta = window.Vue.createTextVNode, Y = window.Vue.openBlock, W = window.Vue.createElementBlock, fe = window.Vue.createCommentVNode, na = window.Vue.renderList, oa = window.Vue.Fragment, ia = window.Vue.normalizeStyle, qe = window.Vue.createElementVNode, yn = window.Vue.withModifiers, vn = window.Vue.mergeProps, aa = window.Vue.vShow, sa = window.Vue.withDirectives, ra = { class: "v-fileupload" }, la = {
  key: 0,
  class: "header"
}, da = { class: "content" }, ca = { class: "files" }, ua = {
  class: "file",
  style: { display: "flex", "flex-flow": "row wrap", "column-gap": "50px" }
}, fa = {
  key: 0,
  style: { color: "red" }
}, ha = { style: { color: "grey" } }, pa = { key: 1 }, ma = { key: 2 }, ga = ["onClick", "href"], wa = ["onClick"], ba = ["onClick"], ya = { class: "input" }, va = ["id", "accept", "multiple", "disabled"];
function $a(e, t, n, i, s, o) {
  return Y(), W("div", ra, [
    e.$slots.header ? (Y(), W("div", la, [
      ta(J(e.$slots.header.$attrs) + " ", 1),
      He(e.$slots, "header", ft(ht({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })))
    ])) : fe("", !0),
    qe("div", da, [
      He(e.$slots, "default", ft(ht({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })), () => [
        qe("div", ca, [
          He(e.$slots, "files", ft(ht({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })), () => [
            (Y(!0), W(oa, null, na(e.files, (a) => (Y(), W("span", ua, [
              qe("span", {
                style: ia({ color: a.status === "IN_PROGRESS" ? "blue" : a.status == "ERROR" ? "red" : "" })
              }, J(a.name), 5),
              a.status === "ERROR" ? (Y(), W("span", fa, J(a.errorMessage), 1)) : fe("", !0),
              qe("span", ha, J(o.humanStorageSize(a.size)), 1),
              a.status === "IN_PROGRESS" ? (Y(), W("span", pa, J(e.$vui.i18n().uploader.progress) + " : " + J((a.progress * 100).toFixed()) + " %", 1)) : fe("", !0),
              a.status === "IN_PROGRESS" && a.estimated != null ? (Y(), W("span", ma, J(e.$vui.i18n().uploader.estimated) + " : " + J(a.estimated.toFixed()) + " s", 1)) : fe("", !0),
              a.status === "OK" ? (Y(), W("a", {
                key: 3,
                onClick: (r) => o.downloadFile(a),
                href: n.downloadUrl + a.uri
              }, J(e.$vui.i18n().uploader.download), 9, ga)) : fe("", !0),
              a.status === "IN_PROGRESS" ? (Y(), W("button", {
                key: 4,
                onClick: yn((r) => o.abortUpload(a), ["prevent"])
              }, J(e.$vui.i18n().uploader.abort), 9, wa)) : fe("", !0),
              !this.readonly && a.status !== "IN_PROGRESS" ? (Y(), W("button", {
                key: 5,
                style: { color: "red" },
                onClick: yn((r) => o.removeFile(a), ["prevent"])
              }, J(e.$vui.i18n().uploader.remove), 9, ba)) : fe("", !0)
            ]))), 256))
          ])
        ]),
        sa(qe("div", ya, [
          He(e.$slots, "input", ft(ht({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })), () => [
            qe("input", vn({
              id: e.$props.inputId,
              ref: "input",
              type: "file",
              accept: e.$props.accept,
              multiple: e.$props.multiple,
              disabled: o.canAddFiles() ? void 0 : !0,
              onChange: t[0] || (t[0] = (a) => o.addFiles(a.target.files))
            }, e.$props.inputProps), null, 16, va)
          ])
        ], 512), [
          [aa, o.canAddFiles()]
        ])
      ])
    ]),
    e.$slots.footer ? (Y(), W("div", vn({
      key: 1,
      class: "footer"
    }, { ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize }), [
      He(e.$slots, "footer")
    ], 16)) : fe("", !0)
  ]);
}
const _a = /* @__PURE__ */ L(Zi, [["render", $a]]), Ca = {
  props: {
    inputId: String,
    readonly: Boolean,
    label: String,
    simple: { type: Boolean, default: !1 },
    fileInfoUris: Array,
    fieldName: String,
    url: String,
    downloadUrl: { type: String, default: (e) => e.baseUrl + "/download" },
    multiple: { type: Boolean, default: !0 },
    accept: String,
    maxFileSize: Number,
    maxTotalSize: Number,
    maxFiles: Number
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
        this.files = n.map((i) => i), this.$emit("init-ok");
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
    filterFiles(e) {
      let t = [], n = this.getGlobalSize();
      for (let i of e) {
        if (this.maxFiles && this.files.length + t.length >= this.maxFiles) {
          i._error = "maxFiles";
          continue;
        }
        if (this.maxTotalSize && n + i.size > this.maxTotalSize) {
          i._error = "maxTotalSize";
          continue;
        }
        t.push(i), n += i.size;
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
      for (let n of e)
        n.failedPropValidation === "accept" ? t.push(this.$vui.i18n().uploader.fileErrorAccept(this.accept)) : n.failedPropValidation === "max-file-size" ? t.push(this.$vui.i18n().uploader.fileErrorTooBigSize(this.$props.maxFileSize)) : n.failedPropValidation === "filter" && (n.file._error === "maxFiles" ? t.push(this.$vui.i18n().uploader.fileCountError(this.$props.maxFiles)) : n.file._error === "maxTotalSize" && t.push(this.$vui.i18n().uploader.fileErrorMaxTotalSize(this.$props.maxTotalSize)));
      VUiPage.uiMessageStackToNotify({ globalErrors: t }).forEach((function(n) {
        this.$q.notify(n);
      }).bind(this));
    },
    removeRemoteFile(e) {
      var t = this.files.indexOf(e), n = [...this.fileInfoUris], i = {};
      i[this.fieldName] = e.fileUri, this.$http.delete(this.url, { params: i, credentials: !1 }).then((function() {
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
      return this.files.reduce((e, t) => e + t.size, 0);
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
}, ee = window.Vue.toDisplayString, pt = window.Vue.createTextVNode, he = window.Vue.resolveComponent, B = window.Vue.withCtx, te = window.Vue.createVNode, k = window.Vue.openBlock, j = window.Vue.createBlock, O = window.Vue.createCommentVNode, ae = window.Vue.createElementBlock, X = window.Vue.createElementVNode, $n = window.Vue.renderList, Lt = window.Vue.Fragment, xa = window.Vue.normalizeClass, Sa = window.Vue.renderSlot, ka = window.Vue.mergeProps, Va = window.Vue.createSlots, Da = { class: "q-uploader__header-content flex flex-center no-wrap q-gutter-xs" }, Fa = { class: "col column justify-center" }, qa = {
  key: 0,
  class: "q-uploader__title"
}, Ea = {
  key: 1,
  class: "q-uploader__subtitle"
}, Ta = {
  key: 2,
  class: "q-uploader__subtitle"
}, Oa = { class: "row" }, Ma = { class: "col column justify-center" }, La = { class: "q-uploader__file-header row flex-center no-wrap" }, Na = { class: "q-uploader__file-header-content col" }, Aa = { class: "q-uploader__title" }, Pa = { class: "q-uploader__file-header row flex-center no-wrap" }, Ba = { class: "q-uploader__file-header-content col" }, Ua = ["id"], Ia = ["aria-labelledby"], za = {
  key: 0,
  class: "q-field__after q-field__marginal row no-wrap items-center"
};
function ja(e, t, n, i, s, o) {
  const a = he("q-tooltip"), r = he("q-btn"), l = he("q-spinner"), c = he("q-uploader-add-trigger"), u = he("q-icon"), p = he("q-circular-progress"), h = he("q-field"), m = he("q-uploader");
  return k(), j(m, ka({
    url: e.$props.url,
    "auto-upload": "",
    "field-name": e.$props.fieldName,
    multiple: e.$props.multiple,
    "max-files": e.$props.multiple ? void 0 : 1,
    "max-file-size": e.$props.maxFileSize,
    accept: e.$props.accept,
    headers: [{ name: "Accept", value: "application/json" }],
    filter: o.filterFiles,
    onUploaded: o.uploadedFiles,
    onFailed: o.failedFiles,
    onRejected: o.rejectedFiles,
    readonly: e.$props.readonly || !o.globalCanAddFiles([])
  }, e.$attrs, { ref: "quasarUploader" }), Va({
    list: B((d) => [
      X("div", Oa, [
        te(h, {
          "label-width": 3,
          label: e.$props.simple ? e.$props.label : void 0,
          class: "col",
          orientation: "vertical",
          "stack-label": "",
          borderless: ""
        }, {
          control: B(() => [
            X("div", Ma, [
              e.$props.readonly ? O("", !0) : (k(!0), ae(Lt, { key: 0 }, $n(d.files, (f) => (k(), ae(Lt, {
                key: f.name
              }, [
                f.__status !== "uploaded" ? (k(), ae("div", {
                  key: 0,
                  class: xa(["q-uploader__file relative-position", {
                    "q-uploader__file--failed": f.__status === "failed",
                    "q-uploader__file--uploaded": f.__status === "uploaded"
                  }])
                }, [
                  X("div", La, [
                    f.__status === "failed" ? (k(), j(u, {
                      key: 0,
                      class: "q-uploader__file-status",
                      name: e.$q.iconSet.type.negative,
                      color: "negative"
                    }, null, 8, ["name"])) : O("", !0),
                    te(u, {
                      class: "q-uploader__file-status",
                      name: f.type.indexOf("video/") === 0 ? "movie" : f.type.indexOf("image/") === 0 ? "photo" : f.type.indexOf("audio/") === 0 ? "audiotrack" : "insert_drive_file"
                    }, null, 8, ["name"]),
                    X("div", Na, [
                      X("div", Aa, ee(f.name), 1)
                    ]),
                    f.__status === "uploading" ? (k(), j(p, {
                      key: 1,
                      value: f.__progress,
                      min: 0,
                      max: 1,
                      indeterminate: f.__progress === 0
                    }, null, 8, ["value", "indeterminate"])) : O("", !0),
                    f.__status === "failed" ? (k(), j(r, {
                      key: 2,
                      round: "",
                      dense: "",
                      flat: "",
                      icon: e.$q.iconSet.uploader.clear,
                      onClick: (g) => d.removeFile(f)
                    }, null, 8, ["icon", "onClick"])) : O("", !0)
                  ])
                ], 2)) : O("", !0)
              ], 64))), 128)),
              (k(!0), ae(Lt, null, $n(e.files, (f) => (k(), ae("div", {
                key: f.name,
                class: "q-uploader__file relative-position q-uploader__file--uploaded"
              }, [
                X("div", Pa, [
                  te(u, {
                    class: "q-uploader__file-status",
                    name: f.type.indexOf("video/") === 0 ? "movie" : f.type.indexOf("image/") === 0 ? "photo" : f.type.indexOf("audio/") === 0 ? "audiotrack" : "insert_drive_file"
                  }, null, 8, ["name"]),
                  X("div", Ba, [
                    X("div", {
                      class: "q-uploader__title",
                      id: f.fileUri + "_label"
                    }, ee(f.name), 9, Ua)
                  ]),
                  X("div", {
                    role: "toolbar",
                    "aria-labelledby": f.fileUri + "_label"
                  }, [
                    e.$props.readonly ? O("", !0) : (k(), j(r, {
                      key: 0,
                      round: "",
                      dense: "",
                      flat: "",
                      icon: "delete",
                      onClick: (g) => o.removeRemoteFile(f),
                      title: e.$q.lang.vui.uploader.remove
                    }, null, 8, ["onClick", "title"])),
                    te(r, {
                      round: "",
                      dense: "",
                      flat: "",
                      icon: "file_download",
                      onClick: (g) => e.$emit("download-file", f.fileUri),
                      title: e.$q.lang.vui.uploader.download
                    }, null, 8, ["onClick", "title"])
                  ], 8, Ia)
                ])
              ]))), 128))
            ])
          ]),
          _: 2
        }, 1032, ["label"]),
        e.$props.simple && !e.$props.readonly ? (k(), ae("div", za, [
          d.isUploading ? (k(), j(l, {
            key: 0,
            class: "q-uploader__spinner"
          })) : O("", !0),
          o.globalCanAddFiles(d.files) ? (k(), j(r, {
            key: 1,
            type: "a",
            icon: e.$q.iconSet.uploader.add,
            flat: "",
            dense: ""
          }, {
            default: B(() => [
              te(c)
            ]),
            _: 1
          }, 8, ["icon"])) : O("", !0),
          d.isUploading ? (k(), j(r, {
            key: 2,
            type: "a",
            icon: e.$q.iconSet.uploader.clear,
            flat: "",
            dense: "",
            onClick: d.abort
          }, {
            default: B(() => [
              te(a, null, {
                default: B(() => [
                  pt(ee(e.$q.lang.vui.uploader.abort), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : O("", !0)
        ])) : O("", !0)
      ]),
      Sa(e.$slots, "footer")
    ]),
    _: 2
  }, [
    e.$props.simple ? {
      name: "header",
      fn: B(() => []),
      key: "0"
    } : {
      name: "header",
      fn: B((d) => [
        X("div", Da, [
          d.queuedFiles.length > 0 && !d.readonly ? (k(), j(r, {
            key: 0,
            type: "a",
            icon: e.$q.iconSet.uploader.clear_all,
            flat: "",
            dense: "",
            onClick: d.removeQueuedFiles
          }, {
            default: B(() => [
              te(a, null, {
                default: B(() => [
                  pt(ee(e.$q.lang.vui.uploader.clear_all), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : O("", !0),
          X("div", Fa, [
            e.$props.label !== void 0 ? (k(), ae("div", qa, ee(e.$props.label), 1)) : O("", !0),
            d.isUploading ? (k(), ae("div", Ea, ee(o.getGlobalSizeLabel()) + " / " + ee(d.uploadProgressLabel), 1)) : (k(), ae("div", Ta, ee(o.getGlobalSizeLabel()), 1))
          ]),
          d.isUploading ? (k(), j(l, {
            key: 1,
            class: "q-uploader__spinner"
          })) : O("", !0),
          d.isUploading && !d.readonly ? (k(), j(r, {
            key: 2,
            type: "a",
            href: "#",
            icon: e.$q.iconSet.uploader.clear,
            flat: "",
            dense: "",
            onClick: d.abort
          }, {
            default: B(() => [
              te(a, null, {
                default: B(() => [
                  pt(ee(e.$q.lang.vui.uploader.abort), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : O("", !0),
          o.globalCanAddFiles(d.files) && !d.readonly ? (k(), j(r, {
            key: 3,
            icon: e.$q.iconSet.uploader.add,
            flat: "",
            dense: "",
            onClick: d.pickFiles
          }, {
            default: B(() => [
              te(c, {
                id: e.$props.inputId
              }, null, 8, ["id"]),
              te(a, null, {
                default: B(() => [
                  pt(ee(e.$q.lang.vui.uploader.add), 1)
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
  ]), 1040, ["url", "field-name", "multiple", "max-files", "max-file-size", "accept", "filter", "onUploaded", "onFailed", "onRejected", "readonly"]);
}
const Ra = /* @__PURE__ */ L(Ca, [["render", ja]]);
function Rt(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function On(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function We() {
}
var Je = 0.7, bt = 1 / Je, Te = "\\s*([+-]?\\d+)\\s*", Ye = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ne = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ha = /^#([0-9a-f]{3,8})$/, Ga = new RegExp(`^rgb\\(${Te},${Te},${Te}\\)$`), Ja = new RegExp(`^rgb\\(${ne},${ne},${ne}\\)$`), Ya = new RegExp(`^rgba\\(${Te},${Te},${Te},${Ye}\\)$`), Wa = new RegExp(`^rgba\\(${ne},${ne},${ne},${Ye}\\)$`), Xa = new RegExp(`^hsl\\(${Ye},${ne},${ne}\\)$`), Qa = new RegExp(`^hsla\\(${Ye},${ne},${ne},${Ye}\\)$`), _n = {
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
Rt(We, vt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Cn,
  // Deprecated! Use color.formatHex.
  formatHex: Cn,
  formatHex8: Ka,
  formatHsl: Za,
  formatRgb: xn,
  toString: xn
});
function Cn() {
  return this.rgb().formatHex();
}
function Ka() {
  return this.rgb().formatHex8();
}
function Za() {
  return Mn(this).formatHsl();
}
function xn() {
  return this.rgb().formatRgb();
}
function vt(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Ha.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Sn(t) : n === 3 ? new A(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? mt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? mt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Ga.exec(e)) ? new A(t[1], t[2], t[3], 1) : (t = Ja.exec(e)) ? new A(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Ya.exec(e)) ? mt(t[1], t[2], t[3], t[4]) : (t = Wa.exec(e)) ? mt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Xa.exec(e)) ? Dn(t[1], t[2] / 100, t[3] / 100, 1) : (t = Qa.exec(e)) ? Dn(t[1], t[2] / 100, t[3] / 100, t[4]) : _n.hasOwnProperty(e) ? Sn(_n[e]) : e === "transparent" ? new A(NaN, NaN, NaN, 0) : null;
}
function Sn(e) {
  return new A(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function mt(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new A(e, t, n, i);
}
function es(e) {
  return e instanceof We || (e = vt(e)), e ? (e = e.rgb(), new A(e.r, e.g, e.b, e.opacity)) : new A();
}
function Ut(e, t, n, i) {
  return arguments.length === 1 ? es(e) : new A(e, t, n, i ?? 1);
}
function A(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
Rt(A, Ut, On(We, {
  brighter(e) {
    return e = e == null ? bt : Math.pow(bt, e), new A(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Je : Math.pow(Je, e), new A(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new A(_e(this.r), _e(this.g), _e(this.b), yt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: kn,
  // Deprecated! Use color.formatHex.
  formatHex: kn,
  formatHex8: ts,
  formatRgb: Vn,
  toString: Vn
}));
function kn() {
  return `#${$e(this.r)}${$e(this.g)}${$e(this.b)}`;
}
function ts() {
  return `#${$e(this.r)}${$e(this.g)}${$e(this.b)}${$e((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Vn() {
  const e = yt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${_e(this.r)}, ${_e(this.g)}, ${_e(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function yt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function _e(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function $e(e) {
  return e = _e(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Dn(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Q(e, t, n, i);
}
function Mn(e) {
  if (e instanceof Q) return new Q(e.h, e.s, e.l, e.opacity);
  if (e instanceof We || (e = vt(e)), !e) return new Q();
  if (e instanceof Q) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, s = Math.min(t, n, i), o = Math.max(t, n, i), a = NaN, r = o - s, l = (o + s) / 2;
  return r ? (t === o ? a = (n - i) / r + (n < i) * 6 : n === o ? a = (i - t) / r + 2 : a = (t - n) / r + 4, r /= l < 0.5 ? o + s : 2 - o - s, a *= 60) : r = l > 0 && l < 1 ? 0 : a, new Q(a, r, l, e.opacity);
}
function It(e, t, n, i) {
  return arguments.length === 1 ? Mn(e) : new Q(e, t, n, i ?? 1);
}
function Q(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
Rt(Q, It, On(We, {
  brighter(e) {
    return e = e == null ? bt : Math.pow(bt, e), new Q(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Je : Math.pow(Je, e), new Q(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, s = 2 * n - i;
    return new A(
      Nt(e >= 240 ? e - 240 : e + 120, s, i),
      Nt(e, s, i),
      Nt(e < 120 ? e + 240 : e - 120, s, i),
      this.opacity
    );
  },
  clamp() {
    return new Q(Fn(this.h), gt(this.s), gt(this.l), yt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = yt(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Fn(this.h)}, ${gt(this.s) * 100}%, ${gt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Fn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function gt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Nt(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Ht = (e) => () => e;
function Ln(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function ns(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function os(e, t) {
  var n = t - e;
  return n ? Ln(e, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : Ht(isNaN(e) ? t : e);
}
function is(e) {
  return (e = +e) == 1 ? Ge : function(t, n) {
    return n - t ? ns(t, n, e) : Ht(isNaN(t) ? n : t);
  };
}
function Ge(e, t) {
  var n = t - e;
  return n ? Ln(e, n) : Ht(isNaN(e) ? t : e);
}
const as = function e(t) {
  var n = is(t);
  function i(s, o) {
    var a = n((s = Ut(s)).r, (o = Ut(o)).r), r = n(s.g, o.g), l = n(s.b, o.b), c = Ge(s.opacity, o.opacity);
    return function(u) {
      return s.r = a(u), s.g = r(u), s.b = l(u), s.opacity = c(u), s + "";
    };
  }
  return i.gamma = e, i;
}(1);
function ss(e) {
  return function(t, n) {
    var i = e((t = It(t)).h, (n = It(n)).h), s = Ge(t.s, n.s), o = Ge(t.l, n.l), a = Ge(t.opacity, n.opacity);
    return function(r) {
      return t.h = i(r), t.s = s(r), t.l = o(r), t.opacity = a(r), t + "";
    };
  };
}
const rs = ss(os);
let pe = { color: vt, interpolateHsl: rs, interpolateRgb: as };
function At(e, t, n) {
  if (e != "DEFAULT") {
    var i, s = ls;
    e == "RAINBOW" || e == "iRAINBOW" ? i = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#00FF00", "rgb(75, 0, 130)", "rgb(238, 130, 238)"] : e == "SPECTRUM" || e == "iSPECTRUM" ? (i = ["rgb(230, 30, 30)", "rgb(230, 230, 30)", "rgb(30, 230, 30)", "rgb(30, 230, 230)", "rgb(30, 30, 230)", "rgb(230, 30, 230)", "rgb(230, 30, 30)"], s = cs) : e == "RED2GREEN" || e == "iRED2GREEN" ? i = ["rgb(255, 51, 51)", "rgb(250, 235, 0)", "rgb(51, 200, 51)"] : e == "GREEN2BLUE" || e == "iGREEN2BLUE" ? i = ["rgb(51, 153, 51)", "rgb(51, 153, 200)", "rgb(51, 51, 255)"] : e == "HEAT" || e == "iHEAT" ? i = ["rgb(255, 51, 51)", "rgb(255, 255, 51)", "rgb(51, 153, 51)", "rgb(51, 153, 255)"] : e == "GREEN:INTENSITY" || e == "iGREEN:INTENSITY" ? (i = ["rgb(51, 153, 51)", "rgb(170, 250, 170)"], s = ds) : e == "ANDROID" || e == "iANDROID" ? i = ["#0099CC", "#9933CC", "#CC0000", "#FF8800", "#669900"] : (e == "ANDROID:LIGHT" || e == "iANDROID:LIGHT") && (i = ["#33B5E5", "#AA66CC", "#ff4444", "#ffbb33", "#99cc00"]), e.charAt(0) == "i" && (i = i.reverse());
    var a, o = i[0] == i[i.length - 1], a = s(i, t + (o ? 1 : 0));
    return n ? a.map(function(r, l) {
      var c = pe.color(r);
      return c.opacity = n, c.formatRgb();
    }) : a;
  }
}
function ls(e, t) {
  return Gt(e, t, function(n, i, s, o, a) {
    return pe.interpolateHsl(s, o)(n);
  });
}
function ds(e, t) {
  return Gt(e, t, function(n, i, s, o, a) {
    return pe.interpolateRgb(s, o)(n);
  });
}
function cs(e, t) {
  return Gt(e, t, function(n, i, s, o, a) {
    var r = { r: null, g: null, b: null }, l = i ? pe.rgb(i) : r, c = pe.rgb(s), u = pe.rgb(o), p = a ? pe.rgb(a) : r, h = Math.max(Math.min(Math.round(Pt(n, l.r, c.r, u.r, p.r)), 255), 0), m = Math.max(Math.min(Math.round(Pt(n, l.g, c.g, u.g, p.g)), 255), 0), d = Math.max(Math.min(Math.round(Pt(n, l.b, c.b, u.b, p.b)), 255), 0);
    return pe.rgb(h, m, d);
  });
}
function Gt(e, t, n) {
  if (t == 1)
    return [e[0]];
  for (var i = 0, s = new Array(), o = e.length, a = 0; (o - 1) % (t - 1) != 0 && a < 20; )
    a++, o = e.length + a * (e.length - 1);
  a++;
  for (var r = 0; r < e.length - 1; r++) {
    for (var l = r - 1 >= 0 ? e[r - 1] : null, c = e[r], u = e[r + 1], p = r + 2 < e.length ? e[r + 2] : null, h = i; h < a + 1; h++) {
      var m = n(h / a, l, c, u, p);
      s.push(m);
    }
    i = 1;
  }
  for (var d = new Array(), r = 0; r < t; r++) {
    var f = (s.length - 1) / (t - 1) * r;
    d.push(s[f]);
  }
  return d;
}
function Pt(e, t, n, i, s) {
  var o = i - n, a = t ?? n - o, r = s ?? i + o;
  return 0.5 * (2 * n + (-a + i) * e + (2 * a - 5 * n + 4 * i - r) * e * e + (-a + 3 * n - 3 * i + r) * e * e * e);
}
const us = {
  id: "verticalLineTooltipPlugin",
  afterDraw: (e) => {
    var t, n;
    if ((n = (t = e.tooltip) == null ? void 0 : t._active) != null && n.length) {
      const { x: i } = e.tooltip._active[0].element, s = e.scales.y, { ctx: o } = e;
      o.save(), o.beginPath(), o.moveTo(i, s.top), o.lineTo(i, s.bottom), o.lineWidth = 2, o.strokeStyle = "rgba(50, 50, 50, 0.4)", o.stroke(), o.restore();
    }
  }
}, fs = {
  id: "verticalLinePlugin",
  getLinePositionAtIndex: function(e, t) {
    return e.getDatasetMeta(0).data[t].x;
  },
  getLinePositionAtX: function(e, t) {
    return e.scales.x.getPixelForValue(t, 0);
  },
  renderVerticalLine: function(e, t) {
    const n = e.scales.y, i = e.ctx, s = t.x ? this.getLinePositionAtX(e, t.x) : getLinePositionAtIndex(chart, t.idx);
    i.beginPath(), i.strokeStyle = t.color ? t.color : "#ff0000", i.moveTo(s, n.top), i.lineTo(s, n.bottom), i.stroke(), i.fillStyle = t.color ? t.color : "#ff0000", i.textAlign = "center", typeof t.label == "function" ? i.fillText(t.label(), s, n.top - 8) : i.fillText(t.label ? t.label : "", s, n.top - 8);
  },
  afterDatasetsDraw: function(e, t) {
    e.config.options.vLineAt && e.config.options.vLineAt.forEach((n) => this.renderVerticalLine(e, n));
  }
}, hs = {
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
    timeFormat: { type: String, default: "YYYY-MM-DDTHH:mm" },
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
    showChartJsChart: function(e, t, n, i, s, o, a, r) {
      var l = this.timeDimToDayJsPeriod();
      if (this.fillGapDim && this.minTime && this.maxTime && l !== "hour") {
        var c = dayjs(this.minTime, this.timeFormat).startOf(l), u = dayjs(this.maxTime, this.timeFormat).startOf(l), p = dayjs(this.minTime, this.timeFormat).endOf(l);
        p.isAfter(u) && (u = p), this.$data.truncatedMinTime = c.add(c.utcOffset(), "minute").valueOf(), this.$data.truncatedMaxTime = u.add(u.utcOffset(), "minute").valueOf();
      } else
        this.$data.truncatedMinTime = this.minTime ? dayjs(this.minTime, this.timeFormat).valueOf() : null, this.$data.truncatedMaxTime = this.maxTime ? dayjs(this.maxTime, this.timeFormat).valueOf() : null;
      var h = Object.values(s), m, d, f;
      if (this.type === "bubbles") {
        f = "bubble";
        var g = s.filter((C) => C !== i);
        h = Object.values(g);
        var b = this.toChartJsBubblesData(e, g.keys(), g, i);
        d = [{ data: b }], m = this.getChartJsBubblesOptions(e, g.keys(), i, g, a, r), this.setChartJsColorOptions(d, o, 1, 0.5);
      } else if (this.type === "linechart")
        f = "line", d = this.toChartJsData(e, s, n, i), m = this.getChartJsLineOptions(e, i, s, n, a, r), this.setChartJsColorOptions(d, o);
      else if (this.type === "barchart")
        f = "bar", d = this.toChartJsData(e, s, n, i), m = this.getChartJsLineOptions(e, i, s, n, a, r), this.setChartJsColorOptions(d, o, 1, 0.5);
      else if (this.type === "stackedbarchart")
        f = "bar", d = this.toChartJsData(e, s, n, i), m = this.getStackedOptions(e, i, s, n, a, r), this.setChartJsColorOptions(d, o, 1, 0.5);
      else if (this.type === "polararea") {
        f = "polarArea", d = this.toChartJsData(e, s, n, i);
        var _ = this.toChartJsPieData(d, s);
        d = _.datasets, h = _.labels, m = this.getPolarChartOptions(e, i, s, n, a, r), this.setChartJsPieColorOptions(d, o);
      } else if (this.type === "doughnut") {
        f = "doughnut";
        var g = s.filter((se) => se !== i);
        d = this.toChartJsData(e, g, n, i);
        var _ = this.toChartJsPieData(d, s);
        d = _.datasets, h = _.labels, this.setChartJsPieColorOptions(d, o), m = {
          legend: {
            display: !0,
            position: "bottom"
          }
        };
      }
      var y = this.$.refs.graphCanvas, V = this.mergeDeep(m, r);
      if (window.dashboardGraphChart[this.$data.graphChartId]) {
        var w = window.dashboardGraphChart[this.$data.graphChartId];
        w.data.datasets = d, this.hashCode(JSON.stringify(w.options.scales)) !== this.hashCode(JSON.stringify(V.scales)) && (w.options.scales = V.scales), w.update("none");
      } else {
        let C = {
          datasets: d
        };
        n || (C.labels = h);
        var w = new Chart(y, {
          type: f,
          data: C,
          options: V,
          plugins: [us, fs]
        });
        window.dashboardGraphChart[this.$data.graphChartId] = w;
      }
    },
    setChartJsColorOptions: function(e, t, n, i) {
      if (t)
        for (var s = At(t, e.length, n), o = At(t, e.length, i || (n ? n * 0.25 : 0.25)), a = 0; a < e.length; a++)
          e[a].borderColor = s[a], e[a].backgroundColor = o[a], e[a].pointBackgroundColor = s[a], e[a].pointBorderColor = "#FFFFFFAF", e[a].pointBorderWidth = 2, e[a].fill = !0;
    },
    setChartJsPieColorOptions: function(e, t, n) {
      if (t)
        for (var i = 0; i < e.length; i++)
          e[i].backgroundColor = At(t, e[i].data.length, n);
    },
    getChartJsBubblesOptions: function(e, t, n, i, s, o) {
      var a = this.getMaxRadius(e, t[2]), r = this.getAxisType(e, o, "xAxisType", t[0]), l = this.getAxisType(e, o, "yAxisType", t[1]);
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
            radius: function(c) {
              var u = c.dataIndex, p = c.dataset.data[u], h = c.chart.width, m = p.r_measure / a;
              return h / 24 * m;
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
              title: function(c) {
                var u = c[0];
                return u.dataset.data[u.dataIndex].name;
              },
              label: function(c) {
                var u = c.dataset.data[c.dataIndex];
                return [
                  i[t[0]] + " : " + Math.round(u.x),
                  i[t[1]] + " : " + Math.round(u.y),
                  i[t[2]] + " : " + Math.round(u.r_measure)
                ];
              }
            }
          }
        }
      };
    },
    getPolarChartOptions: function(e, t, n, i, s) {
      return {};
    },
    getAxisType: function(e, t, n, i) {
      var s = "linear";
      if (t && t[n])
        if (t[n] === "auto") {
          var o = getMinMax(e, i);
          o.max > 0 && o.min / o.max < 1e-3 && (s = "logarithmic");
        } else
          s = t[n];
      return s;
    },
    getChartJsLineOptions: function(e, t, n, i, s, o) {
      var a = {
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
      return i ? (a.scales.x = {
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
      }, this.$data.truncatedMinTime && (a.scales.x.suggestedMin = this.$data.truncatedMinTime), this.$data.truncatedMaxTime && (a.scales.x.suggestedMax = this.$data.truncatedMaxTime)) : a.scales.x = {
        type: "category"
      }, a;
    },
    getStackedOptions: function(e, t, n, i, s, o) {
      var a = this.getChartJsLineOptions(e, t, n, i, s, o), r = {
        scales: {
          x: {
            stacked: !0
          },
          y: {
            stacked: !0
          }
        }
      };
      return this.mergeDeep(a, r);
    },
    toChartJsBubblesData: function(e, t, n, i) {
      for (var s = new Array(), o = 0; o < e.length; o++) {
        var a = new Object();
        a.x = e[o].values[t[0]], a.y = e[o].values[t[1]];
        var r = e[o].values[t[2]];
        !this.isEmpty(e[o].values) && !r && (r = 0), a.name = e[o].values[i], a.r_measure = r, s.push(a);
      }
      return s;
    },
    getMaxRadius: function(e, t) {
      for (var n = 0, i = 0; i < e.length; i++) {
        var s = e[i].values[t];
        s > n && (n = s);
      }
      return Math.max(n, 1);
    },
    getMinMax: function(e, t) {
      for (var n = 0, i = 0, s = 0; s < e.length; s++) {
        var o = e[s].values[t];
        o > i && (i = o), o < n && (n = o);
      }
      return {
        min: n,
        max: i
      };
    },
    defaultDataSeriesTranslator: function(e) {
      var t = e.timedDataSeries ? e.timedDataSeries : e.tabularDataSeries, n = e.seriesNames;
      return { dataValues: t, dataMetrics: n, timedSeries: !!e.timedDataSeries };
    },
    /** Conversion de données servers List<Instant, Map<NomMetric, value>> en données Chartjs.*/
    toChartJsData: function(e, t, n, i) {
      let s = function(g, b) {
        return g.indexOf(b, g.length - b.length) !== -1;
      };
      var o = this.timeDimToDayJsPeriod(), a = new Array();
      for (const g in t) {
        var r = new Object();
        r.data = new Array(), r.parsing = !1, t && t[g] && (r.label = t[g]);
        for (var l = this.$data.truncatedMinTime ? dayjs(this.$data.truncatedMinTime).subtract(1, o) : null, c = 0; c < e.length; c++) {
          if (n && this.fillGapDim)
            for (var u = l ? dayjs(l).add(1, o) : null, p = l ? u.add(1, o) : null, h = dayjs(e[c].time); !h.isBefore(p); )
              r.data.push({ x: u.valueOf(), y: this.fillGapValue }), u = p, p = p.add(1, o), l = u.valueOf();
          var m = n ? dayjs(e[c].time).valueOf() : e[c].values[i], d = e[c].values[g];
          !this.isEmpty(e[c].values) && !d && (d = 0), r.data.push({ x: m, y: d }), l = m;
        }
        if (n && this.fillGapDim && this.$data.truncatedMaxTime)
          for (var u = l ? dayjs(l).add(1, o) : null, f = dayjs(this.$data.truncatedMaxTime); !u.isAfter(f); )
            r.data.push({ x: u.valueOf(), y: this.fillGapValue }), u = u.add(1, o), l = u.valueOf();
        r.label || (s(g, "count") ? r.label = "Quantité" : s(g, "mean") ? r.label = "Moyenne" : s(g, "min") ? r.label = "Minimum" : s(g, "max") && (r.label = "Maximum")), a.push(r);
      }
      return a;
    },
    toChartJsPieData: function(e, t) {
      for (var n = new Array(), i = new Array(), s = 0; s < e[0].data.length; s++) {
        var o = e[0].data[s].x;
        t && t[e[0].data[s].x] && (o = t[e[0].data[s].x]), i.push(o), n.push(e[0].data[s].y);
      }
      return {
        datasets: [{ data: n }],
        labels: i
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
        for (const i in n)
          this.isObject(n[i]) ? (e[i] || Object.assign(e, { [i]: {} }), this.mergeDeep(e[i], n[i])) : Object.assign(e, { [i]: n[i] });
      return this.mergeDeep(e, ...t);
    }
  }
}, ps = window.Vue.openBlock, ms = window.Vue.createElementBlock, gs = { ref: "graphCanvas" };
function ws(e, t, n, i, s, o) {
  return ps(), ms("canvas", gs, null, 512);
}
const bs = /* @__PURE__ */ L(hs, [["render", ws]]), ys = {
  mounted: function(e, t, n) {
    var i = t.value;
    if (!window.watcherUpdates && (window.watcherUpdates = {
      originalDocumentTitle: document.title,
      updates_detected: !1,
      acceptedUpdates: function() {
        window.watcherUpdates.updates_detected = !1, document.title = window.watcherUpdates.originalDocumentTitle;
      },
      beforeWindowUnload: function(a) {
        window.watcherUpdates.updates_detected && (a.preventDefault(), a.returnValue = `Voulez-vous quitter cette page ? 
 Les modifications que vous avez apportées ne seront peut-être pas enregistrées`);
      }
    }, window.addEventListener("beforeunload", window.watcherUpdates.beforeWindowUnload), t.instance.$root.uiMessageStack)) {
      var s = t.instance.$root.uiMessageStack, o = s.globalErrors.length > 0;
      for (let a of i.split(","))
        if (o = o || s.objectFieldErrors[a], o)
          break;
      o && (window.watcherUpdates.updates_detected = !0);
    }
    e.addEventListener("click", window.watcherUpdates.acceptedUpdates);
    for (let a of i.split(","))
      t.instance.$root.$watch("vueData." + a, function() {
        window.watcherUpdates.updates_detected = !0, document.title = "*" + window.watcherUpdates.originalDocumentTitle;
      }, { deep: !0 });
  },
  unmounted: function() {
    window.removeEventListener("beforeunload", window.watcherUpdates.beforeWindowUnload);
  }
}, vs = {
  mounted: function(e, t, n) {
    var i = t.value;
    i && !window.autofocus && (window.autofocus = !0, e.focus());
  }
}, $s = window.Vue.nextTick, _s = {
  updated: function(e, t, n) {
    $s(() => {
      !window.watcherUpdates || !window.watcherUpdates.updates_detected ? e.classList.add("hidden") : e.classList.remove("hidden");
    });
  }
};
function Nn(e, t = 250) {
  let n = !1, i;
  return function() {
    return n === !1 && (n = !0, setTimeout(() => {
      n = !1;
    }, t), i = e.apply(this, arguments)), i;
  };
}
const ve = window.Vue, Cs = {
  created: function(e, t) {
    const n = t.value ? t.value.topOffset : null, i = t.value ? t.value.topOffsetEl : null, s = t.value ? t.value.leftOffset : null, o = t.value ? t.value.leftOffsetEl : null, a = t.value ? t.value.scrollContainerEl : ".q-page-container", r = e.querySelector(".mini");
    for (var l = 0; l < e.childNodes.length; l++) {
      var c = e.childNodes[l];
      c.classList && !c.classList.contains("mini") && c.classList.add("not-mini");
    }
    ve.minifyHandler = function() {
      var u = e.closest(a), p = u ? -u.getBoundingClientRect().y : window.pageYOffset, h = u ? -u.getBoundingClientRect().x : window.pageXOffset, m = e.getBoundingClientRect().y + p, d = e.getBoundingClientRect().x + h;
      (n || i) && (m = ve.minifyComputeOffset(n, i, 0, "TOP")), (s || o) && (d = ve.minifyComputeOffset(s, o, 0, "LEFT"));
      var f = r.getBoundingClientRect().height, g = e.getBoundingClientRect().height;
      p > g - f ? (r.classList.add("visible"), r.style.top = m + "px", r.style.left = d + "px") : (r.classList.remove("visible"), r.style.top = -f - m + "px");
    }, ve.minifyComputeOffset = function(u, p, h, m) {
      var d = h;
      if (u)
        d = u;
      else if (p) {
        var f = document.querySelector(p), g = f.getBoundingClientRect();
        m === "LEFT" ? d = g.width + g.x : m === "TOP" && (d = g.height + g.y);
      }
      return d;
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
}, xs = [null, document, document.body, document.scrollingElement, document.documentElement];
function Ss(e, t) {
  let n = Ts(t);
  if (n === void 0) {
    if (e == null)
      return window;
    n = e.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return xs.includes(n) ? window : n;
}
function ks(e) {
  return (e === window ? document.body : e).scrollHeight;
}
function Vs(e) {
  return (e === window ? document.body : e).scrollWidth;
}
function An(e) {
  return e === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : e.scrollTop;
}
function Pn(e) {
  return e === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : e.scrollLeft;
}
function Jt(e, t, n = 0) {
  const i = arguments[3] === void 0 ? performance.now() : arguments[3], s = An(e);
  if (n <= 0) {
    s !== t && zt(e, t);
    return;
  }
  requestAnimationFrame((o) => {
    const a = o - i, r = s + (t - s) / Math.max(a, n) * a;
    zt(e, r), r !== t && Jt(e, t, n - a, o);
  });
}
function Yt(e, t, n = 0) {
  const i = arguments[3] === void 0 ? performance.now() : arguments[3], s = Pn(e);
  if (n <= 0) {
    s !== t && jt(e, t);
    return;
  }
  requestAnimationFrame((o) => {
    const a = o - i, r = s + (t - s) / Math.max(a, n) * a;
    jt(e, r), r !== t && Yt(e, t, n - a, o);
  });
}
function zt(e, t) {
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
function Ds(e, t, n) {
  if (n) {
    Jt(e, t, n);
    return;
  }
  zt(e, t);
}
function Fs(e, t, n) {
  if (n) {
    Yt(e, t, n);
    return;
  }
  jt(e, t);
}
let wt;
function qs() {
  if (wt !== void 0)
    return wt;
  const e = document.createElement("p"), t = document.createElement("div");
  qn(e, {
    width: "100%",
    height: "200px"
  }), qn(t, {
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
  let i = e.offsetWidth;
  return n === i && (i = t.clientWidth), t.remove(), wt = n - i, wt;
}
function Es(e, t = !0) {
  return !e || e.nodeType !== Node.ELEMENT_NODE ? !1 : t ? e.scrollHeight > e.clientHeight && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-y"])) : e.scrollWidth > e.clientWidth && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-x"]));
}
function Ts(e) {
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
function qn(e, t) {
  const n = e.style;
  for (const i in t)
    n[i] = t[i];
}
const Ee = {
  getScrollTarget: Ss,
  getScrollHeight: ks,
  getScrollWidth: Vs,
  getVerticalScrollPosition: An,
  getHorizontalScrollPosition: Pn,
  animVerticalScrollTo: Jt,
  animHorizontalScrollTo: Yt,
  setVerticalScrollPosition: Ds,
  setHorizontalScrollPosition: Fs,
  getScrollbarWidth: qs,
  hasScrollbar: Es
}, M = window.Vue, Os = {
  created: function(e, t) {
    M.createDebugLine = function(m, d, f, g) {
      let b = document.createElement("div");
      return b.style.position = d, b.style.top = f + "px", b.style.border = "none", b.style.borderTop = g + " solid 1px", b.style.width = "100%", b.style.zIndex = "10000", b.style.padding = "0px", b.style.lineHeight = "0px", b.style.fontSize = "12px", b.style.color = g, b.innerHTML = m, document.querySelector("body").appendChild(b), b;
    };
    const n = t.value.debug ? t.value.debug : !1, i = t.value.startingOffset ? t.value.startingOffset : 24, s = t.value.fixedPos ? t.value.fixedPos : 24, o = i - s, a = t.value.scanner ? t.value.scanner : s + 30, r = e.querySelectorAll("a");
    r[0].classList.add("active"), r[0].ariaCurrent = "step";
    const l = Ee.getScrollTarget(document.querySelector(r[0].hash));
    let c = [], u, p;
    n && (u = M.createDebugLine("startLinear", "absolute", 0, "red"), p = M.createDebugLine("last", "absolute", 0, "red")), M.scrollSpyHandler = function() {
      if (n) {
        for (var m = e, d = 0, f = 0; m && !isNaN(m.offsetLeft) && !isNaN(m.offsetTop); )
          d += m.offsetLeft - m.scrollLeft, f += m.offsetTop - m.scrollTop, m = m.offsetParent;
        console.log("x: " + d), console.log("y: " + f + " (startingOffset)");
      }
      window.pageYOffset > o ? (e.style.top || (e.style.top = s + "px", e.classList.add("fixed")), e.style.width = e.parentElement.getBoundingClientRect().width + "px") : e.style.top && (e.classList.remove("fixed"), e.style.top = null, e.style.width = null);
      for (var g = Ee.getVerticalScrollPosition(l), b = M.computeBreakPoints(g), _ = 0; _ < r.length; _++)
        b[_] <= g && (_ >= r.length - 1 || g < b[_ + 1]) ? (r[_].classList.add("active"), r[_].ariaCurrent = "step") : (r[_].classList.remove("active"), r[_].removeAttribute("aria-current"));
    }, M.computeBlockTop = function(m) {
      var d = [];
      for (let f = 0; f < r.length; f++) {
        const g = r[f].hash, b = document.querySelector(g);
        b && d.push(m + b.getBoundingClientRect().top);
      }
      return d;
    }, M.scrollTo = function(m) {
      m.preventDefault();
      const d = m.target.hash, f = document.querySelector(d);
      for (var g = Ee.getVerticalScrollPosition(l) + f.getBoundingClientRect().top - a, b = Ee.getVerticalScrollPosition(l), _ = M.computeBlockTop(b), y = M.computeBreakPoints(b), V = 0; V < r.length; V++)
        if (r[V].hash == d) {
          _[V] - a < y[V + 1] || !y[V + 1] ? g = _[V] - a : g = y[V + 1] - 1;
          break;
        }
      var w = 200;
      Ee.setVerticalScrollPosition(l, g, w);
    }, M.computeBreakPoints = function(m) {
      var d = M.computeBlockTop(m);
      const f = window.innerHeight || document.documentElement.clientHeight, g = Ee.getScrollHeight(l), _ = g - f;
      let y = _ - f + a;
      for (let $ = 1; $ < r.length; $++)
        if (d[$] - a > y) {
          y = d[$] - a;
          break;
        }
      const V = _ - y;
      var w = [];
      w.push(0);
      for (let $ = 1; $ < r.length; $++)
        d[$] - a > y ? w[$] = y + V * (d[$] - y) / (g - y) : w[$] = d[$] - a, w[$] = Math.round(w[$]);
      if (n) {
        for (let $ = 1; $ < r.length; $++) {
          var C;
          c.length < $ ? (C = M.createDebugLine("navId#" + $, "absolute", 0, "red"), c.push(C)) : C = c[$ - 1], C.style.top = w[$] + a + "px";
        }
        u.style.top = y + a + "px", p.style.top = _ + a + "px";
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
function Ms(e, t) {
  return new Date(e) - new Date(t);
}
function En(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function Tn(e) {
  return typeof e == "number" && isFinite(e);
}
const F = window.Quasar, Bt = {
  debounce: Oe,
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
      } else e.status === 403 ? t.message = this.$q.lang.vui.ajaxErrors.code403 : e.status === 404 ? t.message = this.$q.lang.vui.ajaxErrors.code404 : e.status === 405 ? t.message = this.$q.lang.vui.ajaxErrors.code405 : e.status === 422 ? (t.message = "", Object.keys(e.data).forEach((function(i) {
        this.$data.uiMessageStack[i] = e.data[i];
      }).bind(this))) : e.status >= 500 && (t.message = this.$q.lang.vui.ajaxErrors.code500);
      if (e.statusText && e.status !== 422 && (t.message = e.statusText), Object.prototype.hasOwnProperty.call(e, "data")) {
        if (Object.prototype.hasOwnProperty.call(e.data, "message") && e.data.message && e.data.message.length > 0)
          t.message = e.data.message;
        else if (Object.prototype.hasOwnProperty.call(e.data, "globalErrors") && e.data.globalErrors && e.data.globalErrors.length > 0) {
          var n = this.uiMessageStackToNotify(e.data);
          n.forEach((function(i) {
            this.$q.notify(i);
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
  transformListForSelection: function(e, t, n, i, s) {
    let o = this.$data.vueData[e];
    if (i && (o = o.filter(i)), s != null && s.trim() !== "") {
      const a = this.unaccentLower(s);
      o = o.filter((r) => this.unaccentLower(r[n].toString()).indexOf(a) > -1), o.sort((r, l) => {
        const c = this.unaccentLower(r[n].toString()).startsWith(a), u = this.unaccentLower(l[n].toString()).startsWith(a);
        return c && !u ? -1 : !c && u ? 1 : 0;
      });
    }
    return o.map(function(a) {
      return { value: a[t], label: a[n].toString() };
    });
  },
  unaccentLower: function(e) {
    return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  },
  paginationAndSortHandler: function(e) {
    var t = e.pagination;
    let n = this.$data.componentStates, i = this.$data.vueData;
    var s = n[t.componentId].pagination;
    if ((s.sortBy != t.sortBy || s.descending != t.descending) && t.sortBy) {
      let o = n[t.componentId].columns.find((a) => a.name === t.sortBy);
      t.sortUrl ? (t.page = 1, this.$http.post(t.sortUrl, this.objectToFormData({ sortFieldName: o.field, sortDesc: t.descending, CTX: this.$data.vueData.CTX })).then((function(a) {
        i[t.listKey] = a.data.model[t.listKey], this.$data.vueData.CTX = a.data.model.CTX;
      }).bind(this))) : this.$refs[t.componentId].sortMethod.apply(this.$refs[t.componentId], [i[t.listKey], o.field, t.descending]);
    }
    n[t.componentId].pagination = t;
  },
  paginatedData: function(e, t) {
    var i = this.$data.componentStates[t].pagination;
    if (i.rowsPerPage != 0) {
      var s = (i.page - 1) * i.rowsPerPage, o = i.page * i.rowsPerPage;
      return this.$data.vueData[e].slice(s, o);
    }
    return this.$data.vueData[e];
  },
  createDefaultTableSort: function(e) {
    return this.$data.componentStates[e] ? (function(t, n, i) {
      let s = this.$data.componentStates[e].columns.find((o) => o.name === n);
      if (s.datetimeFormat) {
        const o = i === !0 ? -1 : 1, a = (r) => r[s.field];
        return t.sort((r, l) => {
          let c = a(r), u = a(l);
          return (F.date.extractDate(c, s.datetimeFormat).getTime() > F.date.extractDate(u, s.datetimeFormat).getTime() ? 1 : -1) * o;
        });
      } else
        return this.sortCiAi(t, s.field, i);
    }).bind(this) : this.sortCiAi;
  },
  sortCiAi: function(e, t, n) {
    const i = n === !0 ? -1 : 1, s = (a) => a[t], o = new Intl.Collator();
    return e.sort((a, r) => {
      let l = s(a), c = s(r);
      return l == null ? -1 * i : c == null ? 1 * i : Tn(l) === !0 && Tn(c) === !0 ? (l - c) * i : En(l) === !0 && En(c) === !0 ? Ms(l, c) * i : typeof l == "boolean" && typeof c == "boolean" ? (l - c) * i : ([l, c] = [l, c].map((u) => (u + "").toLocaleString()), o.compare(l, c) * i);
    });
  },
  selectedFunction: function(e, t, n) {
    this.$data.vueData[e][t] = n.value;
  },
  searchAutocomplete: function(e, t, n, i, s, o, a, r, l) {
    if (a.length < o) {
      l();
      return;
    }
    this.$http.post(s, this.objectToFormData({ terms: a, list: e, valueField: t, labelField: n, CTX: this.$data.vueData.CTX })).then((function(c) {
      var u = c.data.map(function(p) {
        return { value: p[t], label: p[n].toString() };
      });
      r((function() {
        this.$data.componentStates[i].options = u;
      }).bind(this));
    }).bind(this)).catch(function(c) {
      this.$q.notify(c.response.status + ":" + c.response.statusText), r([]);
    });
  },
  loadAutocompleteById: function(e, t, n, i, s, o, a, r) {
    var l;
    r != null ? l = this.$data.vueData[o][r][a] : l = this.$data.vueData[o][a], Array.isArray(l) ? l.forEach((c) => this.loadMissingAutocompleteOption(e, t, n, i, s, c)) : this.loadMissingAutocompleteOption(e, t, n, i, s, l);
  },
  loadMissingAutocompleteOption: function(e, t, n, i, s, o) {
    !o || this.$data.componentStates[i].options.filter((function(a) {
      return a.value === o;
    }).bind(this)).length > 0 || (this.$data.componentStates[i].loading = !0, this.$http.post(s, this.objectToFormData({ value: o, list: e, valueField: t, labelField: n, CTX: this.$data.vueData.CTX })).then((function(a) {
      var r = a.data.map(function(l) {
        return { value: l[t], label: l[n].toString() };
      });
      this.$data.componentStates[i].options = this.$data.componentStates[i].options.concat(r);
    }).bind(this)).catch((function(a) {
      this.$q.notify(a.response.status + ":" + a.response.statusText);
    }).bind(this)).then((function() {
      this.$data.componentStates[i].loading = !1;
    }).bind(this)));
  },
  decodeDate: function(e, t) {
    return e === F.date.formatDate(F.date.extractDate(e, "YYYY-MM-DD"), "YYYY-MM-DD") ? F.date.formatDate(F.date.extractDate(e, "YYYY-MM-DD"), t) : e;
  },
  encodeDate: function(e, t) {
    return e === F.date.formatDate(F.date.extractDate(e, t), t) ? F.date.formatDate(F.date.extractDate(e, t), "YYYY-MM-DD") : e;
  },
  decodeDatetime: function(e, t) {
    return e === F.date.formatDate(F.date.extractDate(e, "YYYY-MM-DD[T]HH:mm"), "YYYY-MM-DD[T]HH:mm") ? F.date.formatDate(F.date.extractDate(e, "YYYY-MM-DD[T]HH:mm"), t) : e;
  },
  encodeDatetime: function(e, t) {
    return e === F.date.formatDate(F.date.extractDate(e, t), t) ? F.date.formatDate(F.date.extractDate(e, t), "YYYY-MM-DD[T]HH:mm") : e;
  },
  sortDatesAsString: function(e) {
    return function(t, n, i, s) {
      return F.date.extractDate(t, e).getTime() > F.date.extractDate(n, e).getTime() ? 1 : -1;
    };
  },
  goTo: function(e) {
    window.location = e;
  },
  openModal: function(e, t, n) {
    if (t) {
      var i = t;
      if (n && Object.keys(n).length > 0) {
        var s = Object.keys(n).map(function(o) {
          return o + "=" + n[o];
        }).join("&");
        i = i + "?" + s;
      }
      this.$data.componentStates[e].srcUrl = i;
    }
    this.$data.componentStates[e].opened = !0;
  },
  toogleFacet: function(e, t, n, i = 1) {
    let s = this.$data.vueData;
    var o = !1;
    s[n + "_facets"].forEach(function(r) {
      r.code === e && (o = r.multiple);
    });
    var a = s[n + "_selectedFacets"][e];
    a ? a.includes(t) ? o ? a.splice(a.indexOf(t), 1) : a.splice(0) : a.push(t) : s[n + "_selectedFacets"][e] = [t], this.search(n, i);
  },
  search: Oe(function(e, t = 1) {
    let n = this.$data.componentStates, i = this.$data.vueData;
    var s = e + "_selectedFacets", o = i[e + "_criteriaContextKey"], a = this.vueDataParams([o]);
    a.append(s, JSON.stringify(i[s]));
    var r = n[e + "Search"].searchUrl, l = n[e + "Search"].collectionComponentId;
    if (n[l].pagination && n[l].pagination.sortBy) {
      var c = n[l].pagination;
      let u = n[l].columns.find((p) => p.name === c.sortBy);
      u.field != null && a.append("sortFieldName", u.field), a.append("sortDesc", c.descending);
    }
    this.httpPostAjax(r, a, {
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
  obtainVueDataAccessor(e, t, n, i) {
    return n != null && n != "null" ? i != null ? {
      get: function() {
        return e.$data.vueData[t][i][n];
      },
      set: function(s) {
        e.$data.vueData[t][i][n] = s;
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
      let i = this.getDocHeight(n) + 4 + "px";
      e.style.height = "", this.componentStates[t].height = i;
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
    var i = t ? Array.isArray(t) ? this.vueDataParams(t) : t : [];
    let s = this.$data.vueData, o = this.$data.uiMessageStack, a = this.isFormData(i) ? i : this.objectToFormData(i);
    a.append("CTX", s.CTX), this.pushPendingAction(e), this.$http.post(e, a).then((function(r) {
      if (r.data.model.CTX && (s.CTX = r.data.model.CTX), n && n.updatedKeys)
        for (var l = 0; l < n.updatedKeys.length; l++) {
          var c = n.updatedKeys[l].split(".", 2), u = c[0], p = c[1];
          let m = r.data.model[u];
          m && (typeof m == "object" && Array.isArray(m) === !1 ? p ? s[u][p] = r.data.model[u][p] : s[u] = r.data.model[u] : (Array.isArray(m), s[u] = r.data.model[u]));
        }
      else
        Object.keys(r.data.model).forEach(function(m) {
          m != "CTX" && (s[m] = r.data.model[m]);
        });
      if (n && n.notifyUiMessageStack) {
        var h = this.uiMessageStackToNotify(r.data.uiMessageStack);
        h.forEach((function(m) {
          this.$q.notify(m);
        }).bind(this));
      } else
        Object.keys(r.data.uiMessageStack).forEach(function(m) {
          o[m] = r.data.uiMessageStack[m];
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
    var a, r;
    const i = this.$data.uiMessageStack.objectFieldErrors, s = t.split("_")[0];
    if (i) {
      var o = n != null ? e + "[" + n + "]" : e;
      return ((r = (a = i == null ? void 0 : i[o]) == null ? void 0 : a[s]) == null ? void 0 : r.length) > 0;
    }
    return !1;
  },
  getErrorMessage: function(e, t, n) {
    const i = this.$data.uiMessageStack.objectFieldErrors, s = t.split("_")[0];
    if (i) {
      var o = n != null ? e + "[" + n + "]" : e;
      if (Object.prototype.hasOwnProperty.call(i, o) && i[o] && Object.prototype.hasOwnProperty.call(i[o], s))
        return i[o][s].join(", ");
    } else
      return "";
  },
  vueDataParams: function(e) {
    for (var t = new FormData(), n = 0; n < e.length; n++) {
      var i = e[n].split(".", 2), s = i[0], o = i[1], a = this.$data.vueData[s];
      a && typeof a == "object" && Array.isArray(a) === !1 ? o ? this._vueDataParamsKey(t, s, o, a) : Object.keys(a).forEach((function(r) {
        r.includes("_") || this._vueDataParamsKey(t, s, r, a);
      }).bind(this)) : a && Array.isArray(a) === !0 ? a.forEach((function(r, l) {
        typeof r == "object" ? o ? this._vueDataParamsKey(t, s + "][" + l, o, r) : Object.keys(r).forEach((function(c) {
          c.includes("_") || this._vueDataParamsKey(t, s + "][" + l, c, r);
        }).bind(this)) : this.appendToFormData(t, "vContext[" + s + "]", r);
      }).bind(this)) : this.appendToFormData(t, "vContext[" + s + "]", a);
    }
    return t;
  },
  _vueDataParamsKey: function(e, t, n, i) {
    let s = i[n];
    Array.isArray(s) ? !s || s.length == 0 ? this.appendToFormData(e, "vContext[" + t + "][" + n + "]", "") : s.forEach((function(o, a) {
      s[a] && typeof s[a] == "object" ? this.appendToFormData(e, "vContext[" + t + "][" + n + "]", s[a]._v_inputValue) : this.appendToFormData(e, "vContext[" + t + "][" + n + "]", s[a]);
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
    let n, i;
    e.preventDefault(), e.originalEvent && e.originalEvent.clipboardData.getData ? (n = e.originalEvent.clipboardData.getData("text/plain"), this.$refs[t].runCmd("insertText", n)) : e.clipboardData && e.clipboardData.getData ? (n = e.clipboardData.getData("text/plain"), this.$refs[t].runCmd("insertText", n)) : window.clipboardData && window.clipboardData.getData && (i || (i = !0, this.$refs[t].runCmd("ms-pasteTextOnly", n)), i = !1);
  },
  editorHandlerFixHelper(e, t, n, i, s, o) {
    if (o.hasParents(e, !0))
      if (s.runCmd("formatBlock", i), o.range.commonAncestorContainer.hasChildNodes()) {
        for (var r = !1, l = o.range.startContainer; l && l !== o.el && l.parentNode !== o.range.commonAncestorContainer; )
          l = l.parentNode;
        for (var c = o.range.endContainer; c && c !== o.el && c.parentNode !== o.range.commonAncestorContainer; )
          c = c.parentNode;
        o.range.commonAncestorContainer.childNodes.forEach(
          function(u) {
            u === l && (r = !0), r && (u.outerHTML = u.outerHTML.replace(t, "")), u === c && (r = !1);
          }
        );
      } else
        for (var a = o.selection.focusNode.parentNode; a && a !== o.el; )
          e.includes(a.nodeName.toLowerCase()) && (a.outerHTML = a.outerHTML.replace(t, "")), a = a.parentNode;
    else
      s.runCmd("formatBlock", n);
  },
  editorHandlerBlockquoteFix(e, t, n) {
    this.editorHandlerFixHelper(["blockquote"], /<\/?blockquote[^>]*\/?>/g, "blockquote", "div", t, n);
  },
  editorHandlerParagrapheFix(e, t, n) {
    this.editorHandlerFixHelper(["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9"], /<\/?h[1-9][^>]*\/?>/g, "div", "div", t, n);
  }
}, Ls = {
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
  handles: {
    placeholder: "Enter a handle : format is type/code"
  }
}, Ns = {
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
  handles: {
    placeholder: "Entrer un handle de la forme type/code"
  }
};
var Bn = {
  getBoundMethods: function(e, t) {
    let n = {};
    return Object.keys(t).forEach((i) => n[i] = t[i].bind(e)), n;
  },
  install: function(e, t) {
    if (e.component("v-chatbot", oo), e.component("v-commands", mo), e.component("v-comments", _o), e.component("v-extensions-store", To), e.component("v-facets", Po), e.component("v-geopoint-input", jo), e.component("v-handles", Zo), e.component("v-json-editor", di), e.component("v-notifications", gi), e.component("v-map", Fi), e.component("v-map-layer", Ui), e.component("v-tree", Qi), e.component("v-file-upload", _a), e.component("v-file-upload-quasar", Ra), e.component("v-dashboard-chart", bs), e.directive("alert-unsaved-updates", ys), e.directive("autofocus", vs), e.directive("if-unsaved-updates", _s), e.directive("minify", Cs), e.directive("scroll-spy", Os), !t.axios) {
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
          return Bn.getBoundMethods(Bt, Bt);
        }
      }
    });
  },
  methods: Bt,
  initData: function(e, t) {
    e.vueData = t.vueData, e.componentStates = t.componentStates, e.uiMessageStack = t.uiMessageStack, e.vuiLang = t.vuiLang;
  },
  lang: {
    enUS: Ls,
    fr: Ns
  }
};
window && (window.VertigoUi = Bn);
export {
  Bn as default
};
//# sourceMappingURL=vertigo-ui.es.js.map
