const M = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, gn = {
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
}, Et = window.Vue.renderList, Tt = window.Vue.Fragment, B = window.Vue.openBlock, Ue = window.Vue.createElementBlock, ve = window.Vue.resolveComponent, fe = window.Vue.createVNode, _e = window.Vue.withCtx, ae = window.Vue.createBlock, he = window.Vue.createCommentVNode, Ot = window.Vue.toDisplayString, Z = window.Vue.createElementVNode, bn = window.Vue.withKeys, wn = { class: "bot" }, yn = { class: "q-pr-md" }, vn = { class: "sys-chat" }, _n = { class: "q-pb-sm" }, $n = { class: "sys-chat non-selectable" }, Cn = { class: "text-blue-2 q-caption" }, xn = { class: "row docs-btn" }, Sn = { class: "message-processing sys-chat non-selectable" }, kn = { class: "non-selectable" }, Vn = { class: "message-response row docs-btn q-pl-sm non-selectable" };
function qn(e, t, n, a, s, o) {
  const i = ve("q-rating"), r = ve("q-chat-message"), l = ve("q-btn"), d = ve("q-spinner-dots"), u = ve("q-scroll-area"), p = ve("q-input");
  return B(), Ue("div", wn, [
    fe(u, {
      class: "bg-grey-2 col-grow row q-pa-sm",
      ref: "scroller"
    }, {
      default: _e(() => [
        Z("div", yn, [
          (B(!0), Ue(Tt, null, Et(e.messages, (h, m) => (B(), Ue("div", { key: m }, [
            h.rating ? (B(), ae(r, {
              class: "animate-fade",
              key: "msgRating-" + m,
              sent: h.sent,
              "bg-color": h.bgColor,
              avatar: h.avatar
            }, {
              default: _e(() => [
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
            h.text ? (B(), ae(r, {
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
            }, null, 8, ["label", "sent", "text-color", "bg-color", "name", "avatar", "text", "stamp"])) : he("", !0)
          ]))), 128)),
          Z("div", vn, [
            e.error ? (B(), ae(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "orange-4",
              "text-color": "black",
              size: "12"
            }, {
              default: _e(() => [
                Z("div", _n, Ot(e.$q.lang.vui.chatbot.errorMessage), 1),
                fe(l, {
                  class: "full-width",
                  onClick: t[0] || (t[0] = (h) => o.askBot(e.lastPayload)),
                  label: e.$q.lang.vui.chatbot.tryAgain,
                  color: "white",
                  "text-color": "black"
                }, null, 8, ["label"])
              ]),
              _: 1
            })) : he("", !0)
          ]),
          Z("div", $n, [
            e.inputConfig.buttons.length > 0 ? (B(), ae(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "primary",
              size: "12"
            }, {
              default: _e(() => [
                Z("div", Cn, Ot(e.$q.lang.vui.suggestedAnswers), 1),
                Z("div", xn, [
                  (B(!0), Ue(Tt, null, Et(e.inputConfig.buttons, (h, m) => (B(), ae(l, {
                    class: "full-width",
                    key: "repChatBtn-" + m,
                    onClick: (c) => o.postAnswerBtn(h),
                    label: h.title,
                    color: "white",
                    "text-color": "black"
                  }, null, 8, ["onClick", "label"]))), 128))
                ])
              ]),
              _: 1
            })) : he("", !0)
          ]),
          Z("div", Sn, [
            e.processing ? (B(), ae(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "grey-4"
            }, {
              default: _e(() => [
                fe(d, { size: "2em" })
              ]),
              _: 1
            })) : he("", !0)
          ]),
          Z("div", kn, [
            e.inputConfig.showRating ? (B(), ae(r, {
              key: 0,
              class: "animate-fade",
              "bg-color": "primary",
              sent: ""
            }, {
              default: _e(() => [
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
    Z("div", Vn, [
      fe(p, {
        type: e.inputConfig.modeTextarea ? "textarea" : "text",
        ref: "input",
        onKeyup: t[2] || (t[2] = bn((h) => e.inputConfig.modeTextarea || e.inputConfig.responseText.trim() === "" && e.inputConfig.rating === 0 ? !1 : o.postAnswerText(), ["enter"])),
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
        onClick: t[4] || (t[4] = (h) => o.postAnswerText()),
        disable: e.processing || e.inputConfig.responseText.trim() === "" && e.inputConfig.rating === 0
      }, null, 8, ["disable"]),
      n.devMode === !0 ? (B(), ae(l, {
        key: 0,
        round: "",
        color: "red",
        icon: "refresh",
        onClick: o.restart
      }, null, 8, ["onClick"])) : he("", !0)
    ])
  ]);
}
const Dn = /* @__PURE__ */ M(gn, [["render", qn]]), Fn = {
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
}, Ve = window.Vue.toDisplayString, U = window.Vue.openBlock, ie = window.Vue.createElementBlock, Mt = window.Vue.createCommentVNode, Ie = window.Vue.resolveComponent, Lt = window.Vue.withCtx, je = window.Vue.createBlock, Nt = window.Vue.createElementVNode, En = window.Vue.renderList, Pt = window.Vue.Fragment, $e = window.Vue.withKeys, dt = window.Vue.createVNode, Tn = window.Vue.createTextVNode, On = {
  key: 0,
  style: { "line-height": "40px", opacity: "0.5", position: "fixed" }
}, Mn = {
  class: "bg-grey-4 text-center vertical-middle text-bold q-px-md",
  style: { "line-height": "40px" }
}, Ln = {
  key: 0,
  class: "row col items-center q-py-xs"
}, Nn = {
  key: 1,
  class: "col"
}, Pn = {
  key: 1,
  class: "row col items-center"
}, An = {
  class: "col shadow-2 bg-secondary text-white q-px-md",
  style: { "line-height": "40px" }
};
function Bn(e, t, n, a, s, o) {
  const i = Ie("q-select"), r = Ie("q-input"), l = Ie("q-separator"), d = Ie("q-btn");
  return U(), ie("div", null, [
    e.isCommandCommited ? (U(), ie("div", {
      key: 1,
      class: "row col-12 justify-between bg-white round-borders overflow-hidden shadow-2 text-black",
      onKeyup: t[0] || (t[0] = $e((...u) => o.executeCommand && o.executeCommand(...u), ["enter"]))
    }, [
      Nt("div", Mn, Ve(e.selectedCommand.commandName), 1),
      e.isExecuted ? (U(), ie("div", Pn, [
        Nt("div", An, Ve(e.commandResult.display), 1),
        e.commandResult.targetUrl ? (U(), je(d, {
          key: 0,
          type: "a",
          href: n.baseUrl + e.commandResult.targetUrl,
          flat: ""
        }, {
          default: Lt(() => [
            Tn(Ve(e.$q.lang.vui.commands.linkLabel), 1)
          ]),
          _: 1
        }, 8, ["href"])) : Mt("", !0),
        dt(d, {
          onClick: o.reset,
          flat: "",
          icon: "cancel",
          size: "sm",
          round: ""
        }, null, 8, ["onClick"])
      ])) : (U(), ie("div", Ln, [
        e.selectedCommand.commandParams && e.selectedCommand.commandParams.length > 0 ? (U(!0), ie(Pt, { key: 0 }, En(e.selectedCommand.commandParams, (u, p) => (U(), ie(Pt, { key: u }, [
          u.paramType.rawType === "io.vertigo.commons.command.GenericUID" ? (U(), je(i, {
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
            onKeydown: $e(function(h) {
              o.backIfNeeded(h, p === 0);
            }, ["delete"]),
            onKeyup: $e(function(h) {
              o.backIfNeeded(h, p === 0);
            }, ["esc"]),
            onFilter: (h) => o.autocompleteParam(u, p, e.val, e.update, e.abort),
            "onUpdate:modelValue": (h) => o.selectParam(e.newValue, p),
            style: { height: "32px" }
          }, null, 8, ["value", "options", "autofocus", "onKeydown", "onKeyup", "onFilter", "onUpdate:modelValue"])) : (U(), je(r, {
            key: 1,
            class: "col q-px-xs",
            color: "secondary",
            borderless: "",
            modelValue: e.commandParamsValues[p].value,
            "onUpdate:modelValue": (h) => e.commandParamsValues[p].value = h,
            onKeydown: $e((h) => o.backIfNeeded(e.event, p === 0), ["delete"]),
            onKeyup: [
              $e((h) => o.backIfNeeded(e.event, p === 0), ["esc"]),
              $e((h) => o.handleEnter(p), ["enter"])
            ],
            autofocus: p === 0,
            dense: "",
            style: { height: "32px" }
          }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown", "onKeyup", "autofocus"])),
          dt(l, { vertical: "" })
        ], 64))), 128)) : (U(), ie("div", Nn, Ve(e.$q.lang.vui.commands.executeCommand), 1)),
        dt(d, {
          onClick: o.executeCommand,
          flat: "",
          icon: "play_arrow",
          size: "sm",
          round: ""
        }, null, 8, ["onClick"])
      ]))
    ], 32)) : (U(), je(i, {
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
      default: Lt(() => [
        e.text !== "" && e.selectedCommand.commandName && e.selectedCommand.commandName.startsWith(e.text) ? (U(), ie("span", On, Ve(e.selectedCommand.commandName), 1)) : Mt("", !0)
      ]),
      _: 1
    }, 8, ["placeholder", "onBlur", "onKeydown", "options", "onFilter", "onUpdate:modelValue"]))
  ]);
}
const Un = /* @__PURE__ */ M(Fn, [["render", Bn]]), ct = window.Quasar, In = {
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
}, qe = window.Vue.toDisplayString, ze = window.Vue.createTextVNode, P = window.Vue.resolveComponent, E = window.Vue.withCtx, Ce = window.Vue.openBlock, Re = window.Vue.createBlock, ut = window.Vue.createCommentVNode, F = window.Vue.createVNode, jn = window.Vue.renderList, zn = window.Vue.Fragment, At = window.Vue.createElementBlock, Bt = window.Vue.createElementVNode, Rn = window.Vue.normalizeClass, Hn = ["src"];
function Gn(e, t, n, a, s, o) {
  const i = P("q-badge"), r = P("q-btn"), l = P("big"), d = P("q-item-label"), u = P("q-input"), p = P("q-item-section"), h = P("q-item"), m = P("q-separator"), c = P("q-avatar"), f = P("q-icon"), g = P("q-popup-edit"), b = P("q-list"), y = P("q-drawer");
  return Ce(), At("span", null, [
    F(r, {
      round: "",
      flat: n.flat,
      size: "lg",
      color: n.color,
      "text-color": n.textColor,
      icon: e.count > 0 ? n.icon : n.iconNone,
      onClick: t[0] || (t[0] = (w) => e.commentDrawer = !e.commentDrawer),
      class: "on-left",
      title: e.$q.lang.vui.comments.title
    }, {
      default: E(() => [
        e.count > 0 ? (Ce(), Re(i, {
          key: 0,
          floating: "",
          small: "",
          color: "red",
          style: { right: "-.4em", top: "-.4em" }
        }, {
          default: E(() => [
            ze(qe(e.count), 1)
          ]),
          _: 1
        })) : ut("", !0)
      ]),
      _: 1
    }, 8, ["flat", "color", "text-color", "icon", "title"]),
    F(y, {
      overlay: "",
      behavior: "mobile",
      width: 600,
      modelValue: e.commentDrawer,
      "onUpdate:modelValue": t[2] || (t[2] = (w) => e.commentDrawer = w),
      side: "right",
      style: { top: "58px" }
    }, {
      default: E(() => [
        F(b, null, {
          default: E(() => [
            F(d, { header: "" }, {
              default: E(() => [
                F(l, null, {
                  default: E(() => [
                    ze(qe(e.$q.lang.vui.comments.title), 1)
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
                      "onUpdate:modelValue": t[1] || (t[1] = (w) => e.commentTextArea = w),
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
                      onClick: o.publishComment
                    }, null, 8, ["title", "aria-label", "onClick"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            F(m),
            (Ce(!0), At(zn, null, jn(e.list, (w) => (Ce(), Re(h, {
              key: w.uuid,
              class: Rn(["items-start", { "cursor-pointer": w.author == n.connectedAccount }])
            }, {
              default: E(() => [
                F(p, { avatar: "" }, {
                  default: E(() => [
                    F(c, null, {
                      default: E(() => [
                        Bt("img", {
                          src: n.baseUrl + "x/accounts/api/" + w.author + "/photo"
                        }, null, 8, Hn)
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
                        ze(qe(w.authorDisplayName), 1)
                      ]),
                      _: 2
                    }, 1024),
                    Bt("div", null, qe(w.msg), 1)
                  ]),
                  _: 2
                }, 1024),
                F(p, { side: "" }, {
                  default: E(() => [
                    F(d, { stamp: "" }, {
                      default: E(() => [
                        ze(qe(o.toDelay(new Date(w.creationDate))), 1)
                      ]),
                      _: 2
                    }, 1024),
                    w.author == n.connectedAccount ? (Ce(), Re(f, {
                      key: 0,
                      name: "edit"
                    })) : ut("", !0)
                  ]),
                  _: 2
                }, 1024),
                w.author == n.connectedAccount ? (Ce(), Re(g, {
                  key: 0,
                  buttons: !0,
                  onSave: (D) => o.updateComment(w),
                  "label-cancel": e.$q.lang.vui.comments.cancel,
                  "label-set": e.$q.lang.vui.comments.save
                }, {
                  default: E(() => [
                    F(u, {
                      type: "textarea",
                      autogrow: "",
                      modelValue: w.msg,
                      "onUpdate:modelValue": (D) => w.msg = D,
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
const Jn = /* @__PURE__ */ M(In, [["render", Gn]]), Yn = {
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
}, Wn = window.Vue.renderList, Qn = window.Vue.Fragment, ft = window.Vue.openBlock, ht = window.Vue.createElementBlock, De = window.Vue.resolveComponent, Kn = window.Vue.normalizeStyle, xe = window.Vue.createVNode, He = window.Vue.withCtx, Ut = window.Vue.toDisplayString, Le = window.Vue.createElementVNode, Xn = { class: "row q-col-gutter-md" }, Zn = { class: "row col items-center" }, eo = { class: "q-subheading text-bold" }, to = /* @__PURE__ */ Le("div", { class: "col" }, null, -1), no = { class: "row col q-body-2 text-justify" };
function oo(e, t, n, a, s, o) {
  const i = De("q-icon"), r = De("q-item-section"), l = De("q-toggle"), d = De("q-item"), u = De("q-card");
  return ft(), ht("div", Xn, [
    (ft(!0), ht(Qn, null, Wn(e.extensions, (p) => (ft(), ht("div", {
      class: "col-xs-12 col-lg-6 col-xl-4",
      key: p.name
    }, [
      xe(u, null, {
        default: He(() => [
          xe(d, {
            class: "bg-white",
            style: { height: "100px" }
          }, {
            default: He(() => [
              xe(r, { avatar: "" }, {
                default: He(() => [
                  xe(i, {
                    name: p.icon,
                    size: "40px",
                    style: Kn(o.getIconStyle(p.color))
                  }, null, 8, ["name", "style"])
                ]),
                _: 2
              }, 1024),
              xe(r, null, {
                default: He(() => [
                  Le("div", Zn, [
                    Le("div", eo, Ut(p.label), 1),
                    to,
                    Le("div", null, [
                      xe(l, {
                        disable: "",
                        readonly: "",
                        color: "positive",
                        modelValue: p.enabled,
                        "onUpdate:modelValue": (h) => p.enabled = h
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  Le("div", no, Ut(p.description), 1)
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
const ao = /* @__PURE__ */ M(Yn, [["render", oo]]), io = {
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
}, Se = window.Vue.renderList, pe = window.Vue.Fragment, x = window.Vue.openBlock, I = window.Vue.createElementBlock, se = window.Vue.resolveComponent, V = window.Vue.createVNode, C = window.Vue.withCtx, It = window.Vue.mergeProps, Y = window.Vue.createBlock, me = window.Vue.createCommentVNode, so = window.Vue.normalizeClass, ee = window.Vue.toDisplayString, re = window.Vue.createTextVNode, ro = {
  key: 1,
  class: "facets"
}, lo = {
  key: 0,
  class: "selectedFacets q-pb-md"
};
function co(e, t, n, a, s, o) {
  const i = se("q-checkbox"), r = se("q-item-section"), l = se("q-item-label"), d = se("q-chip"), u = se("q-item"), p = se("q-select"), h = se("q-btn"), m = se("q-list");
  return n.render === "selects" ? (x(), I("div", {
    key: 0,
    class: so(["row col q-gutter-md", { "horizontal-facets": n.layout === "horizontal" }])
  }, [
    (x(!0), I(pe, null, Se(n.facets.filter(n.facetFilter), (c) => (x(), I("div", {
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
        options: o.selectedInvisibleFacets(c.code).concat(c.values),
        "option-value": "code",
        "use-chips": "",
        outlined: "",
        "input-class": "no-wrap"
      }, {
        option: C(({ itemProps: f, opt: g, selected: b, toggleOption: y }) => [
          V(u, It({ ref_for: !0 }, f, {
            class: "facet-selection-option",
            dense: ""
          }), {
            default: C(() => [
              V(r, { avatar: "" }, {
                default: C(() => [
                  V(i, {
                    "model-value": b,
                    "onUpdate:modelValue": (w) => y(g),
                    size: "sm"
                  }, null, 8, ["model-value", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024),
              V(r, null, {
                default: C(() => [
                  V(l, {
                    innerHTML: g.label
                  }, null, 8, ["innerHTML"])
                ]),
                _: 2
              }, 1024),
              V(r, { side: "" }, {
                default: C(() => [
                  V(d, {
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
      }, 1032, ["label", "model-value", "onAdd", "onRemove", "options"])) : (x(), Y(p, {
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
        option: C(({ itemProps: f, opt: g, selected: b, toggleOption: y }) => [
          V(u, It({ ref_for: !0 }, f, {
            class: "facet-selection-option",
            dense: ""
          }), {
            default: C(() => [
              V(r, null, {
                default: C(() => [
                  V(l, {
                    innerHTML: g.label
                  }, null, 8, ["innerHTML"])
                ]),
                _: 2
              }, 1024),
              V(r, { side: "" }, {
                default: C(() => [
                  V(d, {
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
  ], 2)) : (x(), I("div", ro, [
    o.isAnyFacetValueSelected() ? (x(), I("div", lo, [
      (x(!0), I(pe, null, Se(n.selectedFacets, (c, f) => (x(), I("div", { key: f }, [
        o.facetMultipleByCode(f) ? me("", !0) : (x(!0), I(pe, { key: 0 }, Se(c, (g) => (x(), Y(d, {
          clickable: "",
          class: "q-mb-sm",
          key: g.code,
          onClick: (b) => e.$emit("toogle-facet", f, g, n.contextKey),
          "icon-right": "cancel"
        }, {
          default: C(() => [
            re(ee(o.facetLabelByCode(f)) + ": " + ee(o.facetValueLabelByCode(f, g)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]))), 128))
    ])) : me("", !0),
    (x(!0), I(pe, null, Se(n.facets.filter(n.facetFilter), (c) => (x(), Y(m, {
      key: c.code,
      class: "facetValues q-py-none",
      dense: ""
    }, {
      default: C(() => [
        c.multiple || !o.isFacetSelected(c.code) ? (x(), I(pe, { key: 0 }, [
          V(l, { header: "" }, {
            default: C(() => [
              re(ee(c.label), 1)
            ]),
            _: 2
          }, 1024),
          (x(!0), I(pe, null, Se(o.selectedInvisibleFacets(c.code), (f) => (x(), Y(u, {
            key: f.code,
            class: "facetValue q-ml-md",
            clickable: "",
            onClick: (g) => e.$emit("toogle-facet", c.code, f.code, n.contextKey)
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
                    "onUpdate:modelValue": (g) => e.$emit("toogle-facet", c.code, f.code, n.contextKey)
                  }, null, 8, ["onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024)) : me("", !0),
              V(r, null, {
                default: C(() => [
                  re(ee(o.facetValueLabelByCode(c.code, f.code)), 1)
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
          (x(!0), I(pe, null, Se(o.visibleFacets(c.code, c.values), (f) => (x(), Y(u, {
            key: f.code,
            class: "facetValue q-ml-md",
            clickable: "",
            onClick: (g) => e.$emit("toogle-facet", c.code, f.code, n.contextKey)
          }, {
            default: C(() => [
              c.multiple ? (x(), Y(r, {
                key: 0,
                side: ""
              }, {
                default: C(() => [
                  V(i, {
                    dense: "",
                    modelValue: o.isFacetValueSelected(c.code, f.code),
                    "onUpdate:modelValue": (g) => e.$emit("toogle-facet", c.code, f.code, n.contextKey)
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1024)) : me("", !0),
              V(r, null, {
                default: C(() => [
                  re(ee(o.facetValueLabelByCode(c.code, f.code)), 1)
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
              c.values.length > n.maxValues && !o.isFacetExpanded(c.code) ? (x(), Y(h, {
                key: 0,
                flat: "",
                onClick: (f) => o.expandFacet(c.code),
                class: "q-ma-none"
              }, {
                default: C(() => [
                  re(ee(e.$q.lang.vui.facets.showAll), 1)
                ]),
                _: 2
              }, 1032, ["onClick"])) : me("", !0),
              c.values.length > n.maxValues && o.isFacetExpanded(c.code) ? (x(), Y(h, {
                key: 1,
                flat: "",
                onClick: (f) => o.reduceFacet(c.code),
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
const uo = /* @__PURE__ */ M(io, [["render", co]]), fo = {
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
}, ho = window.Vue.resolveComponent, jt = window.Vue.createVNode, po = window.Vue.openBlock, mo = window.Vue.createElementBlock, go = { class: "row" };
function bo(e, t, n, a, s, o) {
  const i = ho("q-input");
  return po(), mo("div", go, [
    jt(i, {
      label: "Longitude",
      "stack-label": "",
      modelValue: e.inputObject.lon,
      "onUpdate:modelValue": [
        t[0] || (t[0] = (r) => e.inputObject.lon = r),
        o.updateJson
      ],
      modelModifiers: { number: !0 }
    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
    jt(i, {
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
const wo = /* @__PURE__ */ M(fo, [["render", bo]]), yo = {
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
}, Fe = window.Vue.resolveComponent, Ge = window.Vue.createVNode, Je = window.Vue.withCtx, vo = window.Vue.renderList, _o = window.Vue.Fragment, pt = window.Vue.openBlock, zt = window.Vue.createElementBlock, $o = window.Vue.toDisplayString, Co = window.Vue.createTextVNode, xo = window.Vue.resolveDirective, So = window.Vue.createBlock, ko = window.Vue.withDirectives;
function Vo(e, t, n, a, s, o) {
  const i = Fe("q-icon"), r = Fe("q-input"), l = Fe("q-item-section"), d = Fe("q-item"), u = Fe("q-list"), p = xo("ripple");
  return pt(), zt("div", null, [
    Ge(r, {
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
        (pt(!0), zt(_o, null, vo(e.handles, (h) => ko((pt(), So(d, {
          clickable: "",
          onClick: (m) => e.VUi.methods.goTo(n.baseUrl + "hw/" + h.code),
          key: h.code
        }, {
          default: Je(() => [
            Ge(l, null, {
              default: Je(() => [
                Co($o(h.code), 1)
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
const qo = /* @__PURE__ */ M(yo, [["render", Vo]]), Do = {
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
}, Fo = window.Vue.renderList, Eo = window.Vue.Fragment, Ee = window.Vue.openBlock, mt = window.Vue.createElementBlock, Rt = window.Vue.resolveComponent, Ht = window.Vue.createBlock;
window.Vue.createCommentVNode;
const To = window.Vue.toDisplayString, Oo = window.Vue.createElementVNode, Mo = window.Vue.withCtx, Lo = window.Vue.normalizeClass, No = { class: "row" };
function Po(e, t, n, a, s, o) {
  const i = Rt("q-input"), r = Rt("q-field");
  return Ee(), mt("div", No, [
    (Ee(!0), mt(Eo, null, Fo(e.jsonAsObject, (l, d) => (Ee(), mt("div", {
      key: d,
      class: Lo("col-" + 12 / n.cols)
    }, [
      n.readonly ? (Ee(), Ht(r, {
        key: 1,
        label: d,
        orientation: "vertical",
        "stack-label": "",
        borderless: "",
        readonly: ""
      }, {
        default: Mo(() => [
          Oo("span", null, To(l), 1)
        ]),
        _: 2
      }, 1032, ["label"])) : (Ee(), Ht(i, {
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
const Ao = /* @__PURE__ */ M(Do, [["render", Po]]), Te = window.Quasar, Bo = {
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
      this.list = t, this.count = t.length, this.firstCall ? this.hasNew = n.length > 0 && Te.date.getDateDiff(Date.now(), n[0].creationDate, "seconds") < 2 * 5 : (this.hasNew = n.length > 0, n.forEach((function(o) {
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
      let t = Te.date.getDateDiff(Date.now(), e, "days");
      return t > 0 ? t + " " + this.$q.lang.vui.notifications.days : (t = Te.date.getDateDiff(Date.now(), e, "hours"), t > 0 ? t + " " + this.$q.lang.vui.notifications.hours : (t = Te.date.getDateDiff(Date.now(), e, "minutes"), t > 0 ? t + " " + this.$q.lang.vui.notifications.minutes : (t = Te.date.getDateDiff(Date.now(), e, "seconds"), t + " " + this.$q.lang.vui.notifications.seconds)));
    }
  },
  beforeDestroy: function() {
    clearInterval(this.timer);
  }
}, Ye = window.Vue.toDisplayString, We = window.Vue.createTextVNode, le = window.Vue.resolveComponent, H = window.Vue.withCtx, Qe = window.Vue.openBlock, gt = window.Vue.createBlock, Uo = window.Vue.createCommentVNode, Io = window.Vue.renderList, jo = window.Vue.Fragment, zo = window.Vue.createElementBlock, te = window.Vue.createVNode;
function Ro(e, t, n, a, s, o) {
  const i = le("q-badge"), r = le("q-icon"), l = le("q-item-section"), d = le("q-item-label"), u = le("q-item"), p = le("q-list"), h = le("q-menu"), m = le("q-btn");
  return Qe(), gt(m, {
    round: "",
    flat: !e.hasNew,
    dense: "",
    color: e.hasNew ? n.colorNew : n.color,
    "text-color": e.hasNew ? n.textColorNew : n.textColor,
    icon: e.wasError ? n.iconError : e.count > 0 ? n.icon : n.iconNone,
    title: e.wasError ? e.$q.lang.vui.notifications.serverLost : ""
  }, {
    default: H(() => [
      e.count > 0 ? (Qe(), gt(i, {
        key: 0,
        color: "red",
        "text-color": "white",
        floating: ""
      }, {
        default: H(() => [
          We(Ye(e.count), 1)
        ]),
        _: 1
      })) : Uo("", !0),
      te(h, { class: "notifications" }, {
        default: H(() => [
          te(p, { style: { width: "300px" } }, {
            default: H(() => [
              (Qe(!0), zo(jo, null, Io(e.list, (c) => (Qe(), gt(u, {
                key: c.uuid,
                tag: "a",
                href: n.targetUrlPrefix + c.targetUrl
              }, {
                default: H(() => [
                  te(l, { avatar: "" }, {
                    default: H(() => [
                      te(r, {
                        name: o.toIcon(c.type),
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
                          We(Ye(o.toDelay(new Date(c.creationDate))), 1)
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
const Ho = /* @__PURE__ */ M(Bo, [["render", Ro]]), Gt = window.Quasar, L = window.ol, Go = {
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
    const a = [Jo()];
    this.$props.overview && a.push(new L.control.OverviewMap({ layers: [new L.layer.Tile({ source: t })] })), this.$props.search && typeof Geocoder == "function" && a.push(new Geocoder("nominatim", {
      provider: "osm",
      lang: this.$q.lang.isoName,
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
      controls: L.control.defaults.defaults().extend(a)
    }), this.$props.initialCenter && this.olMap.getView().setCenter(L.proj.fromLonLat([this.$props.initialCenter.lon, this.$props.initialCenter.lat])), this.olMap.on("moveend", (function(s) {
      let o = s.map.getView().calculateExtent(), i = L.proj.transformExtent(o, "EPSG:3857", "EPSG:4326"), r = L.extent.getTopLeft(i), l = L.extent.getBottomRight(i);
      Gt.debounce(this.$emit("moveend", r, l), 300);
    }).bind(this)), setTimeout((function() {
      this.olMap.on("click", (function(s) {
        s.originalEvent.target instanceof HTMLCanvasElement && (s.stopPropagation(), Gt.debounce(this.$emit("click", L.proj.transform(s.coordinate, "EPSG:3857", "EPSG:4326")), 300));
      }).bind(this));
    }).bind(this), 300);
  }
};
function Jo() {
  return new class extends L.control.Control {
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
const Yo = window.Vue.normalizeProps, Wo = window.Vue.guardReactiveProps, Qo = window.Vue.renderSlot, Ko = window.Vue.openBlock, Xo = window.Vue.createElementBlock, Zo = ["id"];
function ea(e, t, n, a, s, o) {
  return Ko(), Xo("div", { id: n.id }, [
    Qo(e.$slots, "default", Yo(Wo(e.$attrs)))
  ], 8, Zo);
}
const ta = /* @__PURE__ */ M(Go, [["render", ea]]), Ke = window.Quasar, $ = window.ol, na = {
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
          let o = new $.Feature({
            geometry: new $.geom.Point($.proj.fromLonLat([s.lon, s.lat]))
          });
          return this.$props.nameField && (o.set("name", a[this.$props.nameField]), o.set("innerObject", a), o.set("totalCount", a.totalCount)), o;
        }
        return null;
      }).bind(this)).filter((a) => a != null), n = this.$data.clusters.filter(function(a) {
        return a.geoLocation != null;
      }).map((function(a) {
        let s;
        if (typeof a.geoLocation == "string" || a.geoLocation instanceof String ? s = JSON.parse(a.geoLocation) : s = a.geoLocation, s != null) {
          let o = new $.Feature({
            geometry: new $.geom.Point($.proj.fromLonLat([s.lon, s.lat]))
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
        let e = 19, t = this.features.length == 1 ? Math.min(this.olMap.getView().getZoom() || e, e) : e, n = $.geom.Polygon.fromExtent(this.$data.vectorSource.getExtent());
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
      Object.keys(this.$data.vectorSource).length == 0 && (this.$data.vectorSource = new $.source.Vector({})), this.$data.vectorSource.clear(), this.$data.vectorSource.addFeatures(this.features), this.$props.fitOnDataUpdate && this.fitView();
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
      this.$data.vectorSource = new $.source.Vector({
        features: this.features
      });
      let t = new $.source.Cluster({
        source: this.$data.vectorSource,
        distance: 2 * this.$props.clusterCircleSize
      }), n = new $.layer.Vector({
        source: t
      }), a = new $.style.Style({
        text: new $.style.Text({
          font: this.$props.markerSize + "px " + this.$props.markerFont,
          text: this.$props.markerIcon,
          fill: new $.style.Fill({ color: this.$props.markerColor }),
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
          return l || (l = new $.style.Style({
            image: new $.style.Circle({
              radius: this.$props.clusterCircleSize,
              stroke: new $.style.Stroke({
                color: this.$props.clusterCircleBorderColor
              }),
              fill: new $.style.Fill({
                color: this.$props.clusterColor
              })
            }),
            text: new $.style.Text({
              text: i.toString(),
              font: this.$props.clusterTextSize + "px " + this.$props.clusterTextFont,
              fill: new $.style.Fill({
                color: this.$props.clusterTextColor
              })
            })
          }), s[i] = l), l;
        }
      }).bind(this)), this.olMap.addLayer(n), this.fitView(), this.features.length == 0 && (this.olMap.getView().setCenter($.proj.fromLonLat([2.333333, 48.866667])), this.olMap.vInitialZoomOverride = 3), this.olMap.on("moveend", (function(o) {
        let i = o.map.getView().calculateExtent(), r = $.proj.transformExtent(i, "EPSG:3857", "EPSG:4326"), l = $.extent.getTopLeft(r), d = $.extent.getBottomRight(r);
        this.baseUrl && Ke.debounce(this.fetchList({ lat: l[0], lon: l[1] }, { lat: d[0], lon: d[1] }), 300), Ke.debounce(this.$emit("moveend", l, d), 300);
      }).bind(this)), this.$props.nameField) {
        let o = new $.Overlay({
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
                o.setPosition(l), this.$data.popupDisplayed = !0, this.$data.objectDisplayed = r.get("features")[0].get("innerObject"), i.stopPropagation(), Ke.debounce(this.$emit("click", $.proj.transform(l, "EPSG:3857", "EPSG:4326")), 300);
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
              o.stopPropagation(), Ke.debounce(this.$emit("click", $.proj.transform(r, "EPSG:3857", "EPSG:4326")), 300);
            }
          }
        }).bind(this));
      if (this.$props.object && this.$props.objectEditable) {
        let o = new $.interaction.Draw({
          source: this.$data.vectorSource,
          type: "Point"
        });
        o.on("drawend", (r) => {
          let l = r.feature, d = $.proj.toLonLat(l.getGeometry().getCoordinates());
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
}, oa = window.Vue.renderSlot, aa = window.Vue.toDisplayString, Jt = window.Vue.createElementVNode, ia = window.Vue.resolveComponent, sa = window.Vue.withCtx, Yt = window.Vue.openBlock, ra = window.Vue.createBlock, la = window.Vue.createCommentVNode, da = window.Vue.createElementBlock, ca = ["id"], ua = ["id"], fa = { class: "text-subtitle2" };
function ha(e, t, n, a, s, o) {
  const i = ia("q-card");
  return Yt(), da("div", { id: n.id }, [
    Jt("div", {
      id: n.id + "Popup"
    }, [
      e.popupDisplayed ? (Yt(), ra(i, { key: 0 }, {
        default: sa(() => [
          oa(e.$slots, "card", { objectDisplayed: e.objectDisplayed }, () => [
            Jt("div", fa, aa(e.objectDisplayed[n.nameField]), 1)
          ])
        ]),
        _: 3
      })) : la("", !0)
    ], 8, ua)
  ], 8, ca);
}
const pa = /* @__PURE__ */ M(na, [["render", ha]]), ma = window.Quasar, ga = {
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
      ma.debounce(this.$refs.menu.updatePosition, 500)();
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
}, Xe = window.Vue.resolveComponent, bt = window.Vue.createVNode, ba = window.Vue.toDisplayString, wa = window.Vue.createElementVNode, Ze = window.Vue.withCtx, ya = window.Vue.normalizeProps, va = window.Vue.guardReactiveProps, _a = window.Vue.openBlock, $a = window.Vue.createBlock, Ca = {
  class: "self-center full-width no-outline",
  tabindex: "0"
};
function xa(e, t, n, a, s, o) {
  const i = Xe("q-icon"), r = Xe("q-tree"), l = Xe("q-menu"), d = Xe("q-field");
  return _a(), $a(d, ya(va(e.$attrs)), {
    append: Ze(() => [
      bt(i, { name: "arrow_drop_down" })
    ]),
    control: Ze(() => [
      wa("div", Ca, ba(o.getSelectedLabel()), 1)
    ]),
    default: Ze(() => [
      bt(l, {
        breakpoint: 600,
        fit: "",
        ref: "menu"
      }, {
        default: Ze(() => [
          bt(r, {
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
const Sa = /* @__PURE__ */ M(ga, [["render", xa]]), ka = window.Vue.ref, Va = {
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
          let n = ka({
            name: t.name,
            size: t.size,
            type: t.type,
            status: "IN_PROGRESS",
            errorMessage: null,
            progress: 0,
            estimated: null,
            file: t
          }).value;
          this.$data.files.push(n), qa.call(this, n);
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
function qa(e) {
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
const G = window.Vue.toDisplayString, et = window.Vue.normalizeProps, tt = window.Vue.guardReactiveProps, Oe = window.Vue.renderSlot, Da = window.Vue.createTextVNode, j = window.Vue.openBlock, z = window.Vue.createElementBlock, ne = window.Vue.createCommentVNode, Fa = window.Vue.renderList, Ea = window.Vue.Fragment, Ta = window.Vue.normalizeStyle, Me = window.Vue.createElementVNode, Wt = window.Vue.withModifiers, Qt = window.Vue.mergeProps, Oa = { class: "v-fileupload" }, Ma = {
  key: 0,
  class: "header"
}, La = { class: "content" }, Na = { class: "files" }, Pa = {
  class: "file",
  style: { display: "flex", "flex-flow": "row wrap", "column-gap": "50px" }
}, Aa = {
  key: 0,
  style: { color: "red" }
}, Ba = { style: { color: "grey" } }, Ua = { key: 1 }, Ia = { key: 2 }, ja = ["onClick", "href"], za = ["onClick"], Ra = ["onClick"], Ha = {
  key: 0,
  class: "input"
}, Ga = ["id", "accept", "multiple"];
function Ja(e, t, n, a, s, o) {
  return j(), z("div", Oa, [
    e.$slots.header ? (j(), z("div", Ma, [
      Da(G(e.$slots.header.$attrs) + " ", 1),
      Oe(e.$slots, "header", et(tt({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })))
    ])) : ne("", !0),
    Me("div", La, [
      Oe(e.$slots, "default", et(tt({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })), () => [
        Me("div", Na, [
          Oe(e.$slots, "files", et(tt({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })), () => [
            (j(!0), z(Ea, null, Fa(e.files, (i) => (j(), z("span", Pa, [
              Me("span", {
                style: Ta({ color: i.status === "IN_PROGRESS" ? "blue" : i.status == "ERROR" ? "red" : "" })
              }, G(i.name), 5),
              i.status === "ERROR" ? (j(), z("span", Aa, G(i.errorMessage), 1)) : ne("", !0),
              Me("span", Ba, G(o.humanStorageSize(i.size)), 1),
              i.status === "IN_PROGRESS" ? (j(), z("span", Ua, G(e.$vui.i18n().uploader.progress) + " : " + G((i.progress * 100).toFixed()) + " %", 1)) : ne("", !0),
              i.status === "IN_PROGRESS" && i.estimated != null ? (j(), z("span", Ia, G(e.$vui.i18n().uploader.estimated) + " : " + G(i.estimated.toFixed()) + " s", 1)) : ne("", !0),
              i.status === "OK" ? (j(), z("a", {
                key: 3,
                onClick: (r) => o.downloadFile(i),
                href: n.downloadUrl + i.uri
              }, G(e.$vui.i18n().uploader.download), 9, ja)) : ne("", !0),
              i.status === "IN_PROGRESS" ? (j(), z("button", {
                key: 4,
                onClick: Wt((r) => o.abortUpload(i), ["prevent"])
              }, G(e.$vui.i18n().uploader.abort), 9, za)) : ne("", !0),
              !this.readonly && i.status !== "IN_PROGRESS" ? (j(), z("button", {
                key: 5,
                style: { color: "red" },
                onClick: Wt((r) => o.removeFile(i), ["prevent"])
              }, G(e.$vui.i18n().uploader.remove), 9, Ra)) : ne("", !0)
            ]))), 256))
          ])
        ]),
        o.canAddFiles() ? (j(), z("div", Ha, [
          Oe(e.$slots, "input", et(tt({ ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize })), () => [
            Me("input", Qt({
              id: e.$props.inputId,
              ref: "input",
              type: "file",
              accept: e.$props.accept,
              multiple: e.$props.multiple,
              onChange: t[0] || (t[0] = (i) => o.addFiles(i.target.files))
            }, e.$props.inputProps), null, 16, Ga)
          ])
        ])) : ne("", !0)
      ])
    ]),
    e.$slots.footer ? (j(), z("div", Qt({
      key: 1,
      class: "footer"
    }, { ...e.$data, ...e.$props, canAddFiles: o.canAddFiles, addFiles: o.addFiles, abortUpload: o.abortUpload, removeFile: o.removeFile, downloadFile: o.downloadFile, getGlobalSize: o.getGlobalSize, getGlobalSizeLabel: o.getGlobalSizeLabel, humanStorageSize: o.humanStorageSize }), [
      Oe(e.$slots, "footer")
    ], 16)) : ne("", !0)
  ]);
}
const Ya = /* @__PURE__ */ M(Va, [["render", Ja]]), Wa = {
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
      return humanStorageSize(this.getGlobalSize());
    },
    humanStorageSize(e, t = 1) {
      let n = 0;
      for (; parseInt(e, 10) >= 1024 && n < this.$data.units.length - 1; )
        e /= 1024, ++n;
      return `${e.toFixed(t)} ${this.$data.units[n]}`;
    }
  }
}, W = window.Vue.toDisplayString, nt = window.Vue.createTextVNode, de = window.Vue.resolveComponent, A = window.Vue.withCtx, Q = window.Vue.createVNode, S = window.Vue.openBlock, R = window.Vue.createBlock, T = window.Vue.createCommentVNode, oe = window.Vue.createElementBlock, K = window.Vue.createElementVNode, Kt = window.Vue.renderList, wt = window.Vue.Fragment, Qa = window.Vue.normalizeClass, Ka = window.Vue.mergeProps, Xa = window.Vue.createSlots, Za = { class: "q-uploader__header-content flex flex-center no-wrap q-gutter-xs" }, ei = { class: "col column justify-center" }, ti = {
  key: 0,
  class: "q-uploader__title"
}, ni = {
  key: 1,
  class: "q-uploader__subtitle"
}, oi = {
  key: 2,
  class: "q-uploader__subtitle"
}, ai = { class: "row" }, ii = { class: "col column justify-center" }, si = { class: "q-uploader__file-header row flex-center no-wrap" }, ri = { class: "q-uploader__file-header-content col" }, li = { class: "q-uploader__title" }, di = { class: "q-uploader__file-header row flex-center no-wrap" }, ci = { class: "q-uploader__file-header-content col" }, ui = { class: "q-uploader__title" }, fi = {
  key: 0,
  class: "q-field__after q-field__marginal row no-wrap items-center"
};
function hi(e, t, n, a, s, o) {
  const i = de("q-tooltip"), r = de("q-btn"), l = de("q-spinner"), d = de("q-uploader-add-trigger"), u = de("q-icon"), p = de("q-circular-progress"), h = de("q-field"), m = de("q-uploader");
  return S(), R(m, Ka({
    url: e.$props.url,
    "auto-upload": "",
    "field-name": e.$props.fieldName,
    multiple: e.$props.multiple,
    "max-files": e.$props.multiple ? void 0 : 1,
    headers: [{ name: "Accept", value: "application/json" }],
    onUploaded: o.uploadedFiles,
    onFailed: o.failedFiles,
    readonly: e.$props.readonly || !o.globalCanAddFiles([])
  }, e.$attrs, { ref: "quasarUploader" }), Xa({
    list: A((c) => [
      K("div", ai, [
        Q(h, {
          "label-width": 3,
          label: e.$props.simple ? e.$props.label : void 0,
          class: "col",
          orientation: "vertical",
          "stack-label": "",
          borderless: ""
        }, {
          control: A(() => [
            K("div", ii, [
              e.$props.readonly ? T("", !0) : (S(!0), oe(wt, { key: 0 }, Kt(c.files, (f) => (S(), oe(wt, {
                key: f.name
              }, [
                f.__status !== "uploaded" ? (S(), oe("div", {
                  key: 0,
                  class: Qa(["q-uploader__file relative-position", {
                    "q-uploader__file--failed": f.__status === "failed",
                    "q-uploader__file--uploaded": f.__status === "uploaded"
                  }])
                }, [
                  K("div", si, [
                    f.__status === "failed" ? (S(), R(u, {
                      key: 0,
                      class: "q-uploader__file-status",
                      name: e.$q.iconSet.type.negative,
                      color: "negative"
                    }, null, 8, ["name"])) : T("", !0),
                    Q(u, {
                      class: "q-uploader__file-status",
                      name: f.type.indexOf("video/") === 0 ? "movie" : f.type.indexOf("image/") === 0 ? "photo" : f.type.indexOf("audio/") === 0 ? "audiotrack" : "insert_drive_file"
                    }, null, 8, ["name"]),
                    K("div", ri, [
                      K("div", li, W(f.name), 1)
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
                      onClick: (g) => c.removeFile(f)
                    }, null, 8, ["icon", "onClick"])) : T("", !0)
                  ])
                ], 2)) : T("", !0)
              ], 64))), 128)),
              (S(!0), oe(wt, null, Kt(e.files, (f) => (S(), oe("div", {
                key: f.name,
                class: "q-uploader__file relative-position q-uploader__file--uploaded"
              }, [
                K("div", di, [
                  Q(u, {
                    class: "q-uploader__file-status",
                    name: f.type.indexOf("video/") === 0 ? "movie" : f.type.indexOf("image/") === 0 ? "photo" : f.type.indexOf("audio/") === 0 ? "audiotrack" : "insert_drive_file"
                  }, null, 8, ["name"]),
                  K("div", ci, [
                    K("div", ui, W(f.name), 1)
                  ]),
                  e.$props.readonly ? T("", !0) : (S(), R(r, {
                    key: 0,
                    round: "",
                    dense: "",
                    flat: "",
                    icon: "delete",
                    onClick: (g) => o.removeRemoteFile(f)
                  }, null, 8, ["onClick"])),
                  Q(r, {
                    round: "",
                    dense: "",
                    flat: "",
                    icon: "file_download",
                    onClick: (g) => e.$emit("download-file", f.fileUri)
                  }, null, 8, ["onClick"])
                ])
              ]))), 128))
            ])
          ]),
          _: 2
        }, 1032, ["label"]),
        e.$props.simple && !e.$props.readonly ? (S(), oe("div", fi, [
          c.isUploading ? (S(), R(l, {
            key: 0,
            class: "q-uploader__spinner"
          })) : T("", !0),
          o.globalCanAddFiles(c.files) ? (S(), R(r, {
            key: 1,
            type: "a",
            icon: e.$q.iconSet.uploader.add,
            flat: "",
            dense: ""
          }, {
            default: A(() => [
              Q(d)
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
              Q(i, null, {
                default: A(() => [
                  nt(W(e.$q.lang.vui.uploader.abort), 1)
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
        K("div", Za, [
          c.queuedFiles.length > 0 && !c.readonly ? (S(), R(r, {
            key: 0,
            type: "a",
            icon: e.$q.iconSet.uploader.clear_all,
            flat: "",
            dense: "",
            onClick: c.removeQueuedFiles
          }, {
            default: A(() => [
              Q(i, null, {
                default: A(() => [
                  nt(W(e.$q.lang.vui.uploader.clear_all), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : T("", !0),
          K("div", ei, [
            e.$props.label !== void 0 ? (S(), oe("div", ti, W(e.$props.label), 1)) : T("", !0),
            c.isUploading ? (S(), oe("div", ni, W(o.getGlobalSizeLabel()) + " / " + W(c.uploadProgressLabel), 1)) : (S(), oe("div", oi, W(o.getGlobalSizeLabel()), 1))
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
              Q(i, null, {
                default: A(() => [
                  nt(W(e.$q.lang.vui.uploader.abort), 1)
                ]),
                _: 1
              })
            ]),
            _: 2
          }, 1032, ["icon", "onClick"])) : T("", !0),
          o.globalCanAddFiles(c.files) && !c.readonly ? (S(), R(r, {
            key: 3,
            icon: e.$q.iconSet.uploader.add,
            flat: "",
            dense: "",
            onClick: c.pickFiles
          }, {
            default: A(() => [
              Q(d),
              Q(i, null, {
                default: A(() => [
                  nt(W(e.$q.lang.vui.uploader.add), 1)
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
const pi = /* @__PURE__ */ M(Wa, [["render", hi]]);
function Vt(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function fn(e, t) {
  var n = Object.create(e.prototype);
  for (var a in t) n[a] = t[a];
  return n;
}
function Be() {
}
var Pe = 0.7, st = 1 / Pe, ke = "\\s*([+-]?\\d+)\\s*", Ae = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", X = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", mi = /^#([0-9a-f]{3,8})$/, gi = new RegExp(`^rgb\\(${ke},${ke},${ke}\\)$`), bi = new RegExp(`^rgb\\(${X},${X},${X}\\)$`), wi = new RegExp(`^rgba\\(${ke},${ke},${ke},${Ae}\\)$`), yi = new RegExp(`^rgba\\(${X},${X},${X},${Ae}\\)$`), vi = new RegExp(`^hsl\\(${Ae},${X},${X}\\)$`), _i = new RegExp(`^hsla\\(${Ae},${X},${X},${Ae}\\)$`), Xt = {
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
Vt(Be, lt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Zt,
  // Deprecated! Use color.formatHex.
  formatHex: Zt,
  formatHex8: $i,
  formatHsl: Ci,
  formatRgb: en,
  toString: en
});
function Zt() {
  return this.rgb().formatHex();
}
function $i() {
  return this.rgb().formatHex8();
}
function Ci() {
  return hn(this).formatHsl();
}
function en() {
  return this.rgb().formatRgb();
}
function lt(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = mi.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? tn(t) : n === 3 ? new N(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? ot(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? ot(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = gi.exec(e)) ? new N(t[1], t[2], t[3], 1) : (t = bi.exec(e)) ? new N(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = wi.exec(e)) ? ot(t[1], t[2], t[3], t[4]) : (t = yi.exec(e)) ? ot(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = vi.exec(e)) ? an(t[1], t[2] / 100, t[3] / 100, 1) : (t = _i.exec(e)) ? an(t[1], t[2] / 100, t[3] / 100, t[4]) : Xt.hasOwnProperty(e) ? tn(Xt[e]) : e === "transparent" ? new N(NaN, NaN, NaN, 0) : null;
}
function tn(e) {
  return new N(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ot(e, t, n, a) {
  return a <= 0 && (e = t = n = NaN), new N(e, t, n, a);
}
function xi(e) {
  return e instanceof Be || (e = lt(e)), e ? (e = e.rgb(), new N(e.r, e.g, e.b, e.opacity)) : new N();
}
function xt(e, t, n, a) {
  return arguments.length === 1 ? xi(e) : new N(e, t, n, a ?? 1);
}
function N(e, t, n, a) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +a;
}
Vt(N, xt, fn(Be, {
  brighter(e) {
    return e = e == null ? st : Math.pow(st, e), new N(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Pe : Math.pow(Pe, e), new N(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new N(ye(this.r), ye(this.g), ye(this.b), rt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: nn,
  // Deprecated! Use color.formatHex.
  formatHex: nn,
  formatHex8: Si,
  formatRgb: on,
  toString: on
}));
function nn() {
  return `#${we(this.r)}${we(this.g)}${we(this.b)}`;
}
function Si() {
  return `#${we(this.r)}${we(this.g)}${we(this.b)}${we((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function on() {
  const e = rt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ye(this.r)}, ${ye(this.g)}, ${ye(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function rt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ye(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function we(e) {
  return e = ye(e), (e < 16 ? "0" : "") + e.toString(16);
}
function an(e, t, n, a) {
  return a <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new J(e, t, n, a);
}
function hn(e) {
  if (e instanceof J) return new J(e.h, e.s, e.l, e.opacity);
  if (e instanceof Be || (e = lt(e)), !e) return new J();
  if (e instanceof J) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, a = e.b / 255, s = Math.min(t, n, a), o = Math.max(t, n, a), i = NaN, r = o - s, l = (o + s) / 2;
  return r ? (t === o ? i = (n - a) / r + (n < a) * 6 : n === o ? i = (a - t) / r + 2 : i = (t - n) / r + 4, r /= l < 0.5 ? o + s : 2 - o - s, i *= 60) : r = l > 0 && l < 1 ? 0 : i, new J(i, r, l, e.opacity);
}
function St(e, t, n, a) {
  return arguments.length === 1 ? hn(e) : new J(e, t, n, a ?? 1);
}
function J(e, t, n, a) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +a;
}
Vt(J, St, fn(Be, {
  brighter(e) {
    return e = e == null ? st : Math.pow(st, e), new J(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Pe : Math.pow(Pe, e), new J(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, a = n + (n < 0.5 ? n : 1 - n) * t, s = 2 * n - a;
    return new N(
      yt(e >= 240 ? e - 240 : e + 120, s, a),
      yt(e, s, a),
      yt(e < 120 ? e + 240 : e - 120, s, a),
      this.opacity
    );
  },
  clamp() {
    return new J(sn(this.h), at(this.s), at(this.l), rt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = rt(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${sn(this.h)}, ${at(this.s) * 100}%, ${at(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function sn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function at(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function yt(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const qt = (e) => () => e;
function pn(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function ki(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(a) {
    return Math.pow(e + a * t, n);
  };
}
function Vi(e, t) {
  var n = t - e;
  return n ? pn(e, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : qt(isNaN(e) ? t : e);
}
function qi(e) {
  return (e = +e) == 1 ? Ne : function(t, n) {
    return n - t ? ki(t, n, e) : qt(isNaN(t) ? n : t);
  };
}
function Ne(e, t) {
  var n = t - e;
  return n ? pn(e, n) : qt(isNaN(e) ? t : e);
}
const Di = function e(t) {
  var n = qi(t);
  function a(s, o) {
    var i = n((s = xt(s)).r, (o = xt(o)).r), r = n(s.g, o.g), l = n(s.b, o.b), d = Ne(s.opacity, o.opacity);
    return function(u) {
      return s.r = i(u), s.g = r(u), s.b = l(u), s.opacity = d(u), s + "";
    };
  }
  return a.gamma = e, a;
}(1);
function Fi(e) {
  return function(t, n) {
    var a = e((t = St(t)).h, (n = St(n)).h), s = Ne(t.s, n.s), o = Ne(t.l, n.l), i = Ne(t.opacity, n.opacity);
    return function(r) {
      return t.h = a(r), t.s = s(r), t.l = o(r), t.opacity = i(r), t + "";
    };
  };
}
const Ei = Fi(Vi);
let ce = { color: lt, interpolateHsl: Ei, interpolateRgb: Di };
function vt(e, t, n) {
  if (e != "DEFAULT") {
    var a, s = Ti;
    e == "RAINBOW" || e == "iRAINBOW" ? a = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#00FF00", "rgb(75, 0, 130)", "rgb(238, 130, 238)"] : e == "SPECTRUM" || e == "iSPECTRUM" ? (a = ["rgb(230, 30, 30)", "rgb(230, 230, 30)", "rgb(30, 230, 30)", "rgb(30, 230, 230)", "rgb(30, 30, 230)", "rgb(230, 30, 230)", "rgb(230, 30, 30)"], s = Mi) : e == "RED2GREEN" || e == "iRED2GREEN" ? a = ["rgb(255, 51, 51)", "rgb(250, 235, 0)", "rgb(51, 200, 51)"] : e == "GREEN2BLUE" || e == "iGREEN2BLUE" ? a = ["rgb(51, 153, 51)", "rgb(51, 153, 200)", "rgb(51, 51, 255)"] : e == "HEAT" || e == "iHEAT" ? a = ["rgb(255, 51, 51)", "rgb(255, 255, 51)", "rgb(51, 153, 51)", "rgb(51, 153, 255)"] : e == "GREEN:INTENSITY" || e == "iGREEN:INTENSITY" ? (a = ["rgb(51, 153, 51)", "rgb(170, 250, 170)"], s = Oi) : e == "ANDROID" || e == "iANDROID" ? a = ["#0099CC", "#9933CC", "#CC0000", "#FF8800", "#669900"] : (e == "ANDROID:LIGHT" || e == "iANDROID:LIGHT") && (a = ["#33B5E5", "#AA66CC", "#ff4444", "#ffbb33", "#99cc00"]), e.charAt(0) == "i" && (a = a.reverse());
    var i, o = a[0] == a[a.length - 1], i = s(a, t + (o ? 1 : 0));
    return n ? i.map(function(r, l) {
      var d = ce.color(r);
      return d.opacity = n, d.formatRgb();
    }) : i;
  }
}
function Ti(e, t) {
  return Dt(e, t, function(n, a, s, o, i) {
    return ce.interpolateHsl(s, o)(n);
  });
}
function Oi(e, t) {
  return Dt(e, t, function(n, a, s, o, i) {
    return ce.interpolateRgb(s, o)(n);
  });
}
function Mi(e, t) {
  return Dt(e, t, function(n, a, s, o, i) {
    var r = { r: null, g: null, b: null }, l = a ? ce.rgb(a) : r, d = ce.rgb(s), u = ce.rgb(o), p = i ? ce.rgb(i) : r, h = Math.max(Math.min(Math.round(_t(n, l.r, d.r, u.r, p.r)), 255), 0), m = Math.max(Math.min(Math.round(_t(n, l.g, d.g, u.g, p.g)), 255), 0), c = Math.max(Math.min(Math.round(_t(n, l.b, d.b, u.b, p.b)), 255), 0);
    return ce.rgb(h, m, c);
  });
}
function Dt(e, t, n) {
  if (t == 1)
    return [e[0]];
  for (var a = 0, s = new Array(), o = e.length, i = 0; (o - 1) % (t - 1) != 0 && i < 20; )
    i++, o = e.length + i * (e.length - 1);
  i++;
  for (var r = 0; r < e.length - 1; r++) {
    for (var l = r - 1 >= 0 ? e[r - 1] : null, d = e[r], u = e[r + 1], p = r + 2 < e.length ? e[r + 2] : null, h = a; h < i + 1; h++) {
      var m = n(h / i, l, d, u, p);
      s.push(m);
    }
    a = 1;
  }
  for (var c = new Array(), r = 0; r < t; r++) {
    var f = (s.length - 1) / (t - 1) * r;
    c.push(s[f]);
  }
  return c;
}
function _t(e, t, n, a, s) {
  var o = a - n, i = t ?? n - o, r = s ?? a + o;
  return 0.5 * (2 * n + (-i + a) * e + (2 * i - 5 * n + 4 * a - r) * e * e + (-i + 3 * n - 3 * a + r) * e * e * e);
}
const Li = {
  id: "verticalLineTooltipPlugin",
  afterDraw: (e) => {
    var t, n;
    if ((n = (t = e.tooltip) == null ? void 0 : t._active) != null && n.length) {
      const { x: a } = e.tooltip._active[0].element, s = e.scales.y, { ctx: o } = e;
      o.save(), o.beginPath(), o.moveTo(a, s.top), o.lineTo(a, s.bottom), o.lineWidth = 2, o.strokeStyle = "rgba(50, 50, 50, 0.4)", o.stroke(), o.restore();
    }
  }
}, Ni = {
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
}, Pi = {
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
      var h = Object.values(s), m, c, f;
      if (this.type === "bubbles") {
        f = "bubble";
        var g = s.filter((_) => _ !== a);
        h = Object.values(g);
        var b = this.toChartJsBubblesData(e, g.keys(), g, a);
        c = [{ data: b }], m = this.getChartJsBubblesOptions(e, g.keys(), a, g, i, r), this.setChartJsColorOptions(c, o, 1, 0.5);
      } else if (this.type === "linechart")
        f = "line", c = this.toChartJsData(e, s, n, a), m = this.getChartJsLineOptions(e, a, s, n, i, r), this.setChartJsColorOptions(c, o);
      else if (this.type === "barchart")
        f = "bar", c = this.toChartJsData(e, s, n, a), m = this.getChartJsLineOptions(e, a, s, n, i, r), this.setChartJsColorOptions(c, o, 1, 0.5);
      else if (this.type === "stackedbarchart")
        f = "bar", c = this.toChartJsData(e, s, n, a), m = this.getStackedOptions(e, a, s, n, i, r), this.setChartJsColorOptions(c, o, 1, 0.5);
      else if (this.type === "polararea") {
        f = "polarArea", c = this.toChartJsData(e, s, n, a);
        var y = this.toChartJsPieData(c, s);
        c = y.datasets, h = y.labels, m = this.getPolarChartOptions(e, a, s, n, i, r), this.setChartJsPieColorOptions(c, o);
      } else if (this.type === "doughnut") {
        f = "doughnut";
        var g = s.filter((ue) => ue !== a);
        c = this.toChartJsData(e, g, n, a);
        var y = this.toChartJsPieData(c, s);
        c = y.datasets, h = y.labels, this.setChartJsPieColorOptions(c, o), m = {
          legend: {
            display: !0,
            position: "bottom"
          }
        };
      }
      var w = this.$.refs.graphCanvas, D = this.mergeDeep(m, r);
      if (window.dashboardGraphChart[this.$data.graphChartId]) {
        var k = window.dashboardGraphChart[this.$data.graphChartId];
        k.data.datasets = c, this.hashCode(JSON.stringify(k.options.scales)) !== this.hashCode(JSON.stringify(D.scales)) && (k.options.scales = D.scales), k.update("none");
      } else {
        let _ = {
          datasets: c
        };
        n || (_.labels = h);
        var k = new Chart(w, {
          type: f,
          data: _,
          options: D,
          plugins: [Li, Ni]
        });
        window.dashboardGraphChart[this.$data.graphChartId] = k;
      }
    },
    setChartJsColorOptions: function(e, t, n, a) {
      if (t)
        for (var s = vt(t, e.length, n), o = vt(t, e.length, a || (n ? n * 0.25 : 0.25)), i = 0; i < e.length; i++)
          e[i].borderColor = s[i], e[i].backgroundColor = o[i], e[i].pointBackgroundColor = s[i], e[i].pointBorderColor = "#FFFFFFAF", e[i].pointBorderWidth = 2, e[i].fill = !0;
    },
    setChartJsPieColorOptions: function(e, t, n) {
      if (t)
        for (var a = 0; a < e.length; a++)
          e[a].backgroundColor = vt(t, e[a].data.length, n);
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
              var u = d.dataIndex, p = d.dataset.data[u], h = d.chart.width, m = p.r_measure / i;
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
      let s = function(g, b) {
        return g.indexOf(b, g.length - b.length) !== -1;
      };
      var o = this.timeDimToDayJsPeriod(), i = new Array();
      for (const g in t) {
        var r = new Object();
        r.data = new Array(), r.parsing = !1, t && t[g] && (r.label = t[g]);
        for (var l = this.$data.truncatedMinTime ? dayjs(this.$data.truncatedMinTime).subtract(1, o) : null, d = 0; d < e.length; d++) {
          if (n && this.fillGapDim)
            for (var u = l ? dayjs(l).add(1, o) : null, p = l ? u.add(1, o) : null, h = dayjs(e[d].time); !h.isBefore(p); )
              r.data.push({ x: u.valueOf(), y: this.fillGapValue }), u = p, p = p.add(1, o), l = u.valueOf();
          var m = n ? dayjs(e[d].time).valueOf() : e[d].values[a], c = e[d].values[g];
          !this.isEmpty(e[d].values) && !c && (c = 0), r.data.push({ x: m, y: c }), l = m;
        }
        if (n && this.fillGapDim && this.$data.truncatedMaxTime)
          for (var u = l ? dayjs(l).add(1, o) : null, f = dayjs(this.$data.truncatedMaxTime); !u.isAfter(f); )
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
}, Ai = window.Vue.openBlock, Bi = window.Vue.createElementBlock, Ui = { ref: "graphCanvas" };
function Ii(e, t, n, a, s, o) {
  return Ai(), Bi("canvas", Ui, null, 512);
}
const ji = /* @__PURE__ */ M(Pi, [["render", Ii]]), zi = {
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
}, Ri = {
  mounted: function(e, t, n) {
    var a = t.value;
    a && !window.autofocus && (window.autofocus = !0, e.focus());
  }
}, Hi = window.Vue.nextTick, Gi = {
  updated: function(e, t, n) {
    Hi(() => {
      !window.watcherUpdates || !window.watcherUpdates.updates_detected ? e.classList.add("hidden") : e.classList.remove("hidden");
    });
  }
}, ge = window.Vue, Ji = window.Quasar, Yi = {
  created: function(e, t) {
    const n = t.value ? t.value.topOffset : null, a = t.value ? t.value.topOffsetEl : null, s = t.value ? t.value.leftOffset : null, o = t.value ? t.value.leftOffsetEl : null, i = e.querySelector(".mini");
    for (var r = 0; r < e.childNodes.length; r++) {
      var l = e.childNodes[r];
      l.classList && !l.classList.contains("mini") && l.classList.add("not-mini");
    }
    ge.minifyHandler = function() {
      var d = e.closest(".q-page-container"), u = d ? -d.getBoundingClientRect().y : window.pageYOffset, p = d ? -d.getBoundingClientRect().x : window.pageXOffset, h = e.getBoundingClientRect().y + u, m = e.getBoundingClientRect().x + p;
      (n || a) && (h = ge.minifyComputeOffset(n, a, 0, "TOP")), (s || o) && (m = ge.minifyComputeOffset(s, o, 0, "LEFT"));
      var c = i.getBoundingClientRect().height, f = e.getBoundingClientRect().height;
      u > f - c ? (i.classList.add("visible"), i.style.top = h + "px", i.style.left = m + "px") : (i.classList.remove("visible"), i.style.top = -c - h + "px");
    }, ge.minifyComputeOffset = function(d, u, p, h) {
      var m = p;
      if (d)
        m = d;
      else if (u) {
        var c = document.querySelector(u), f = c.getBoundingClientRect();
        h === "LEFT" ? m = f.width + f.x : h === "TOP" && (m = f.height + f.y);
      }
      return m;
    }, window.addEventListener("scroll", ge.minifyHandler), window.addEventListener("resize", Ji.throttle(ge.minifyHandler, 50));
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
}, O = window.Vue, be = window.Quasar, Wi = {
  created: function(e, t) {
    O.createDebugLine = function(m, c, f, g) {
      let b = document.createElement("div");
      return b.style.position = c, b.style.top = f + "px", b.style.border = "none", b.style.borderTop = g + " solid 1px", b.style.width = "100%", b.style.zIndex = "10000", b.style.padding = "0px", b.style.lineHeight = "0px", b.style.fontSize = "12px", b.style.color = g, b.innerHTML = m, document.querySelector("body").appendChild(b), b;
    };
    const n = t.value.debug ? t.value.debug : !1, a = t.value.startingOffset ? t.value.startingOffset : 24, s = t.value.fixedPos ? t.value.fixedPos : 24, o = a - s, i = t.value.scanner ? t.value.scanner : s + 30, r = e.querySelectorAll("a");
    r[0].classList.add("active"), r[0].ariaCurrent = "step";
    const l = be.scroll.getScrollTarget(document.querySelector(r[0].hash));
    let d = [], u, p;
    n && (u = O.createDebugLine("startLinear", "absolute", 0, "red"), p = O.createDebugLine("last", "absolute", 0, "red")), O.scrollSpyHandler = function() {
      if (n) {
        for (var m = e, c = 0, f = 0; m && !isNaN(m.offsetLeft) && !isNaN(m.offsetTop); )
          c += m.offsetLeft - m.scrollLeft, f += m.offsetTop - m.scrollTop, m = m.offsetParent;
        console.log("x: " + c), console.log("y: " + f + " (startingOffset)");
      }
      window.pageYOffset > o ? (e.style.top || (e.style.top = s + "px", e.classList.add("fixed")), e.style.width = e.parentElement.getBoundingClientRect().width + "px") : e.style.top && (e.classList.remove("fixed"), e.style.top = null, e.style.width = null);
      for (var g = be.scroll.getVerticalScrollPosition(l), b = O.computeBreakPoints(g), y = 0; y < r.length; y++)
        b[y] <= g && (y >= r.length - 1 || g < b[y + 1]) ? (r[y].classList.add("active"), r[y].ariaCurrent = "step") : (r[y].classList.remove("active"), r[y].removeAttribute("aria-current"));
    }, O.computeBlockTop = function(m) {
      var c = [];
      for (let f = 0; f < r.length; f++) {
        const g = r[f].hash, b = document.querySelector(g);
        b && c.push(m + b.getBoundingClientRect().top);
      }
      return c;
    }, O.scrollTo = function(m) {
      m.preventDefault();
      const c = m.target.hash, f = document.querySelector(c);
      for (var g = be.scroll.getVerticalScrollPosition(l) + f.getBoundingClientRect().top - i, b = be.scroll.getVerticalScrollPosition(l), y = O.computeBlockTop(b), w = O.computeBreakPoints(b), D = 0; D < r.length; D++)
        if (r[D].hash == c) {
          y[D] - i < w[D + 1] || !w[D + 1] ? g = y[D] - i : g = w[D + 1] - 1;
          break;
        }
      var k = 200;
      be.scroll.setVerticalScrollPosition(l, g, k);
    }, O.computeBreakPoints = function(m) {
      var c = O.computeBlockTop(m);
      const f = window.innerHeight || document.documentElement.clientHeight, g = be.scroll.getScrollHeight(l), y = g - f;
      let w = y - f + i;
      for (let v = 1; v < r.length; v++)
        if (c[v] - i > w) {
          w = c[v] - i;
          break;
        }
      const D = y - w;
      var k = [];
      k.push(0);
      for (let v = 1; v < r.length; v++)
        c[v] - i > w ? k[v] = w + D * (c[v] - w) / (g - w) : k[v] = c[v] - i, k[v] = Math.round(k[v]);
      if (n) {
        for (let v = 1; v < r.length; v++) {
          var _;
          d.length < v ? (_ = O.createDebugLine("navId#" + v, "absolute", 0, "red"), d.push(_)) : _ = d[v - 1], _.style.top = k[v] + i + "px";
        }
        u.style.top = w + i + "px", p.style.top = y + i + "px";
      }
      return k;
    }, e.classList.add("scroll-spy-nav");
    for (var h = 0; h < r.length; h++)
      r[h].addEventListener("click", O.scrollTo);
    window.addEventListener("scroll", O.scrollSpyHandler), window.addEventListener("resize", be.throttle(O.scrollSpyHandler, 50));
  },
  unmounted: function(e) {
    e.classList.remove("scroll-spy-nav"), window.removeEventListener("scroll"), window.removeEventListener("resize");
    const t = e.querySelectorAll("a");
    for (var n = 0; n < t.length; n++)
      t.removeEventListener("click");
  }
};
function Qi(e, t) {
  return new Date(e) - new Date(t);
}
function rn(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function ln(e) {
  return typeof e == "number" && isFinite(e);
}
var it = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ki(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Xi = "Expected a function", dn = NaN, Zi = "[object Symbol]", es = /^\s+|\s+$/g, ts = /^[-+]0x[0-9a-f]+$/i, ns = /^0b[01]+$/i, os = /^0o[0-7]+$/i, as = parseInt, is = typeof it == "object" && it && it.Object === Object && it, ss = typeof self == "object" && self && self.Object === Object && self, rs = is || ss || Function("return this")(), ls = Object.prototype, ds = ls.toString, cs = Math.max, us = Math.min, $t = function() {
  return rs.Date.now();
};
function fs(e, t, n) {
  var a, s, o, i, r, l, d = 0, u = !1, p = !1, h = !0;
  if (typeof e != "function")
    throw new TypeError(Xi);
  t = cn(t) || 0, kt(n) && (u = !!n.leading, p = "maxWait" in n, o = p ? cs(cn(n.maxWait) || 0, t) : o, h = "trailing" in n ? !!n.trailing : h);
  function m(_) {
    var v = a, ue = s;
    return a = s = void 0, d = _, i = e.apply(ue, v), i;
  }
  function c(_) {
    return d = _, r = setTimeout(b, t), u ? m(_) : i;
  }
  function f(_) {
    var v = _ - l, ue = _ - d, Ft = t - v;
    return p ? us(Ft, o - ue) : Ft;
  }
  function g(_) {
    var v = _ - l, ue = _ - d;
    return l === void 0 || v >= t || v < 0 || p && ue >= o;
  }
  function b() {
    var _ = $t();
    if (g(_))
      return y(_);
    r = setTimeout(b, f(_));
  }
  function y(_) {
    return r = void 0, h && a ? m(_) : (a = s = void 0, i);
  }
  function w() {
    r !== void 0 && clearTimeout(r), d = 0, a = l = s = r = void 0;
  }
  function D() {
    return r === void 0 ? i : y($t());
  }
  function k() {
    var _ = $t(), v = g(_);
    if (a = arguments, s = this, l = _, v) {
      if (r === void 0)
        return c(l);
      if (p)
        return r = setTimeout(b, t), m(l);
    }
    return r === void 0 && (r = setTimeout(b, t)), i;
  }
  return k.cancel = w, k.flush = D, k;
}
function kt(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function hs(e) {
  return !!e && typeof e == "object";
}
function ps(e) {
  return typeof e == "symbol" || hs(e) && ds.call(e) == Zi;
}
function cn(e) {
  if (typeof e == "number")
    return e;
  if (ps(e))
    return dn;
  if (kt(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = kt(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(es, "");
  var n = ns.test(e);
  return n || os.test(e) ? as(e.slice(2), n ? 2 : 8) : ts.test(e) ? dn : +e;
}
var ms = fs;
const un = /* @__PURE__ */ Ki(ms), q = window.Quasar, Ct = {
  debounce: un,
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
          return (q.date.extractDate(d, s.datetimeFormat).getTime() > q.date.extractDate(u, s.datetimeFormat).getTime() ? 1 : -1) * o;
        });
      } else
        return this.sortCiAi(t, s.field, a);
    }).bind(this) : this.sortCiAi;
  },
  sortCiAi: function(e, t, n) {
    const a = n === !0 ? -1 : 1, s = (i) => i[t], o = new Intl.Collator();
    return e.sort((i, r) => {
      let l = s(i), d = s(r);
      return l == null ? -1 * a : d == null ? 1 * a : ln(l) === !0 && ln(d) === !0 ? (l - d) * a : rn(l) === !0 && rn(d) === !0 ? Qi(l, d) * a : typeof l == "boolean" && typeof d == "boolean" ? (l - d) * a : ([l, d] = [l, d].map((u) => (u + "").toLocaleString()), o.compare(l, d) * a);
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
    return e === q.date.formatDate(q.date.extractDate(e, "YYYY-MM-DD"), "YYYY-MM-DD") ? q.date.formatDate(q.date.extractDate(e, "YYYY-MM-DD"), t) : e;
  },
  encodeDate: function(e, t) {
    return e === q.date.formatDate(q.date.extractDate(e, t), t) ? q.date.formatDate(q.date.extractDate(e, t), "YYYY-MM-DD") : e;
  },
  decodeDatetime: function(e, t) {
    return e === q.date.formatDate(q.date.extractDate(e, "YYYY-MM-DD[T]HH:mm"), "YYYY-MM-DD[T]HH:mm") ? q.date.formatDate(q.date.extractDate(e, "YYYY-MM-DD[T]HH:mm"), t) : e;
  },
  encodeDatetime: function(e, t) {
    return e === q.date.formatDate(q.date.extractDate(e, t), t) ? q.date.formatDate(q.date.extractDate(e, t), "YYYY-MM-DD[T]HH:mm") : e;
  },
  sortDatesAsString: function(e) {
    return function(t, n, a, s) {
      return q.date.extractDate(t, e).getTime() > q.date.extractDate(n, e).getTime() ? 1 : -1;
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
  search: un(function(e, t = 1) {
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
}, gs = {
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
}, bs = {
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
var mn = {
  getBoundMethods: function(e, t) {
    let n = {};
    return Object.keys(t).forEach((a) => n[a] = t[a].bind(e)), n;
  },
  install: function(e, t) {
    if (e.component("v-chatbot", Dn), e.component("v-commands", Un), e.component("v-comments", Jn), e.component("v-extensions-store", ao), e.component("v-facets", uo), e.component("v-geopoint-input", wo), e.component("v-handles", qo), e.component("v-json-editor", Ao), e.component("v-notifications", Ho), e.component("v-map", ta), e.component("v-map-layer", pa), e.component("v-tree", Sa), e.component("v-file-upload", Ya), e.component("v-file-upload-quasar", pi), e.component("v-dashboard-chart", ji), e.directive("alert-unsaved-updates", zi), e.directive("autofocus", Ri), e.directive("if-unsaved-updates", Gi), e.directive("minify", Yi), e.directive("scroll-spy", Wi), !t.axios) {
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
          return mn.getBoundMethods(Ct, Ct);
        }
      }
    });
  },
  methods: Ct,
  initData: function(e, t) {
    e.vueData = t.vueData, e.componentStates = t.componentStates, e.uiMessageStack = t.uiMessageStack, e.vuiLang = t.vuiLang;
  },
  lang: {
    enUS: gs,
    fr: bs
  }
};
window && (window.VertigoUi = mn);
export {
  mn as default
};
//# sourceMappingURL=vertigo-ui.es.js.map
