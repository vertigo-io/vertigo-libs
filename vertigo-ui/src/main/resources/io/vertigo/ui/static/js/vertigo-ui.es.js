var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$b = {
  props: {
    botUrl: { type: String, required: true },
    devMode: { type: Boolean, "default": false },
    minTimeBetweenMessages: { type: Number, "default": 1e3 },
    botAvatar: { type: String, required: true },
    botName: { type: String, required: true }
  },
  data: function() {
    return {
      convId: 42,
      inputConfig: {
        modeTextarea: false,
        responseText: "",
        responsePattern: "",
        showRating: false,
        rating: 0,
        buttons: []
      },
      prevInputConfig: {},
      lastPayload: null,
      processing: false,
      error: false,
      messages: [],
      keepAction: false,
      menu: false,
      lastUserInteraction: 0,
      watingMessagesStack: []
    };
  },
  created: function() {
    this.askBot("/start");
    this.convId = Math.random();
  },
  methods: {
    postAnswerBtn: function(btn) {
      this.messages.push({
        text: [btn.title],
        sent: true,
        bgColor: "primary",
        textColor: "white"
      });
      this._scrollToBottom();
      this.askBot(btn.payload);
    },
    postAnswerText: function() {
      var sanitizedString = this.inputConfig.responseText.trim().replace(/(?:\r\n|\r|\n)/g, "<br>");
      this.messages.push({
        text: sanitizedString !== "" ? [sanitizedString] : null,
        rating: this.inputConfig.rating > 0 ? this.inputConfig.rating : null,
        sent: true,
        bgColor: "primary",
        textColor: "white"
      });
      this._scrollToBottom();
      var response = this.inputConfig.responsePattern === "" ? sanitizedString.replace(/(")/g, '"') : this.inputConfig.responsePattern.replace("#", sanitizedString.replace(/(")/g, '\\"'));
      this.askBot(response);
    },
    _scrollToBottom: function() {
      if (this.$refs.scroller) {
        this.$refs.scroller.setScrollPosition(this.$refs.scroller.scrollHeight, 400);
      }
    },
    askBot: function(value) {
      this.prevInputConfig = JSON.parse(JSON.stringify(this.inputConfig));
      this.reinitInput();
      this.lastPayload = value;
      this.processing = true;
      this.lastUserInteraction = Date.now();
      this.$http.post(this.botUrl, { sender: this.convId, message: value }).then(function(httpResponse) {
        httpResponse.data.forEach(function(value2) {
          this.watingMessagesStack.push(value2);
        }, this);
        this._displayMessages();
      }.bind(this)).catch(function() {
        this.error = true;
        this.processing = false;
        this._scrollToBottom();
      }.bind(this));
    },
    _displayMessages: function() {
      if (this.watingMessagesStack.length > 0) {
        var currentMessage = this.watingMessagesStack.shift();
        var watingTime = this.lastUserInteraction - Date.now() + this.minTimeBetweenMessages;
        this.sleep(watingTime).then(function() {
          this._processResponse(currentMessage);
          this.lastUserInteraction = Date.now();
          this._displayMessages();
        }.bind(this));
      } else {
        this.processing = false;
        if (this.keepAction) {
          this.inputConfig = this.prevInputConfig;
          this.inputConfig.responseText = "";
          this.keepAction = false;
        }
        this.sleep(1).then(function() {
          this.$refs.input.focus();
        }.bind(this));
      }
    },
    _processResponse: function(response) {
      var lastMsg = this.messages[this.messages.length - 1];
      if (lastMsg && !lastMsg.sent) {
        lastMsg.text.push(response.text);
      } else {
        this.messages.push({
          avatar: this.botAvatar,
          text: [response.text],
          bgColor: "grey-4"
        });
      }
      if (response.buttons) {
        response.buttons.forEach(function(value) {
          if (value.title.startsWith("#")) {
            var cmd = value.title.substring(1);
            if (cmd === "textarea")
              this.inputConfig.modeTextarea = true;
            if (cmd === "eval")
              this.inputConfig.showRating = true;
            if (cmd === "keep_action")
              this.keepAction = true;
            if (value.payload)
              this.inputConfig.responsePattern = value.payload;
          } else {
            this.inputConfig.buttons.push(value);
          }
        }, this);
      }
      this._scrollToBottom();
    },
    restart: function() {
      this.messages.push({
        text: [this.$q.lang.vui.chatbot.restartMessage],
        bgColor: "orange"
      });
      this._scrollToBottom();
      this.$http.post(this.botUrl, '{"sender":"' + this.convId + '","message":"/restart"}').then(function() {
        this.askBot("/start");
      }.bind(this));
    },
    reinitInput: function() {
      this.inputConfig.modeTextarea = false;
      this.inputConfig.responsePattern = "";
      this.inputConfig.responseText = "";
      this.inputConfig.showRating = false;
      this.inputConfig.rating = 0;
      this.inputConfig.buttons = [];
      this.error = false;
    },
    sleep: function(milliseconds) {
      return new Promise(function(resolve) {
        setTimeout(resolve, milliseconds);
      });
    }
  }
};
const _renderList$7 = window["Vue"].renderList;
const _Fragment$7 = window["Vue"].Fragment;
const _openBlock$b = window["Vue"].openBlock;
const _createElementBlock$a = window["Vue"].createElementBlock;
const _resolveComponent$a = window["Vue"].resolveComponent;
const _createVNode$8 = window["Vue"].createVNode;
const _withCtx$9 = window["Vue"].withCtx;
const _createBlock$8 = window["Vue"].createBlock;
const _createCommentVNode$5 = window["Vue"].createCommentVNode;
const _toDisplayString$9 = window["Vue"].toDisplayString;
const _createElementVNode$6 = window["Vue"].createElementVNode;
const _withKeys$1 = window["Vue"].withKeys;
const _hoisted_1$9 = { class: "bot" };
const _hoisted_2$4 = { class: "q-pr-md" };
const _hoisted_3$3 = { class: "sys-chat" };
const _hoisted_4$2 = { class: "q-pb-sm" };
const _hoisted_5$2 = { class: "sys-chat non-selectable" };
const _hoisted_6$1 = { class: "text-blue-2 q-caption" };
const _hoisted_7 = { class: "row docs-btn" };
const _hoisted_8 = { class: "message-processing sys-chat non-selectable" };
const _hoisted_9 = { class: "non-selectable" };
const _hoisted_10 = { class: "message-response row docs-btn q-pl-sm non-selectable" };
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_rating = _resolveComponent$a("q-rating");
  const _component_q_chat_message = _resolveComponent$a("q-chat-message");
  const _component_q_btn = _resolveComponent$a("q-btn");
  const _component_q_spinner_dots = _resolveComponent$a("q-spinner-dots");
  const _component_q_scroll_area = _resolveComponent$a("q-scroll-area");
  const _component_q_input = _resolveComponent$a("q-input");
  return _openBlock$b(), _createElementBlock$a("div", _hoisted_1$9, [
    _createVNode$8(_component_q_scroll_area, {
      class: "bg-grey-2 col-grow row q-pa-sm",
      ref: "scroller"
    }, {
      default: _withCtx$9(() => [
        _createElementVNode$6("div", _hoisted_2$4, [
          (_openBlock$b(true), _createElementBlock$a(_Fragment$7, null, _renderList$7(_ctx.messages, (msg, index) => {
            return _openBlock$b(), _createElementBlock$a("div", { key: index }, [
              msg.rating ? (_openBlock$b(), _createBlock$8(_component_q_chat_message, {
                class: "animate-fade",
                key: "msgRating-" + index,
                sent: msg.sent,
                "bg-color": msg.bgColor,
                avatar: msg.avatar
              }, {
                default: _withCtx$9(() => [
                  _createVNode$8(_component_q_rating, {
                    modelValue: msg.rating,
                    "onUpdate:modelValue": ($event) => msg.rating = $event,
                    max: 5,
                    style: { "font-size": "2rem" },
                    readonly: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1032, ["sent", "bg-color", "avatar"])) : _createCommentVNode$5("", true),
              msg.text ? (_openBlock$b(), _createBlock$8(_component_q_chat_message, {
                class: "animate-fade",
                key: "msg-" + index,
                label: msg.label,
                sent: msg.sent,
                "text-color": msg.textColor,
                "bg-color": msg.bgColor,
                name: msg.name,
                avatar: msg.avatar,
                text: msg.text,
                stamp: msg.stamp
              }, null, 8, ["label", "sent", "text-color", "bg-color", "name", "avatar", "text", "stamp"])) : _createCommentVNode$5("", true)
            ]);
          }), 128)),
          _createElementVNode$6("div", _hoisted_3$3, [
            _ctx.error ? (_openBlock$b(), _createBlock$8(_component_q_chat_message, {
              key: 0,
              class: "animate-fade",
              "bg-color": "orange-4",
              "text-color": "black",
              size: "12"
            }, {
              default: _withCtx$9(() => [
                _createElementVNode$6("div", _hoisted_4$2, _toDisplayString$9(_ctx.$q.lang.vui.chatbot.errorMessage), 1),
                _createVNode$8(_component_q_btn, {
                  class: "full-width",
                  onClick: _cache[0] || (_cache[0] = ($event) => $options.askBot(_ctx.lastPayload)),
                  label: _ctx.$q.lang.vui.chatbot.tryAgain,
                  color: "white",
                  "text-color": "black"
                }, null, 8, ["label"])
              ]),
              _: 1
            })) : _createCommentVNode$5("", true)
          ]),
          _createElementVNode$6("div", _hoisted_5$2, [
            _ctx.inputConfig.buttons.length > 0 ? (_openBlock$b(), _createBlock$8(_component_q_chat_message, {
              key: 0,
              class: "animate-fade",
              "bg-color": "primary",
              size: "12"
            }, {
              default: _withCtx$9(() => [
                _createElementVNode$6("div", _hoisted_6$1, _toDisplayString$9(_ctx.$q.lang.vui.suggestedAnswers), 1),
                _createElementVNode$6("div", _hoisted_7, [
                  (_openBlock$b(true), _createElementBlock$a(_Fragment$7, null, _renderList$7(_ctx.inputConfig.buttons, (btn, index) => {
                    return _openBlock$b(), _createBlock$8(_component_q_btn, {
                      class: "full-width",
                      key: "repChatBtn-" + index,
                      onClick: ($event) => $options.postAnswerBtn(btn),
                      label: btn.title,
                      color: "white",
                      "text-color": "black"
                    }, null, 8, ["onClick", "label"]);
                  }), 128))
                ])
              ]),
              _: 1
            })) : _createCommentVNode$5("", true)
          ]),
          _createElementVNode$6("div", _hoisted_8, [
            _ctx.processing ? (_openBlock$b(), _createBlock$8(_component_q_chat_message, {
              key: 0,
              class: "animate-fade",
              "bg-color": "grey-4"
            }, {
              default: _withCtx$9(() => [
                _createVNode$8(_component_q_spinner_dots, { size: "2em" })
              ]),
              _: 1
            })) : _createCommentVNode$5("", true)
          ]),
          _createElementVNode$6("div", _hoisted_9, [
            _ctx.inputConfig.showRating ? (_openBlock$b(), _createBlock$8(_component_q_chat_message, {
              key: 0,
              class: "animate-fade",
              "bg-color": "primary",
              sent: ""
            }, {
              default: _withCtx$9(() => [
                _createVNode$8(_component_q_rating, {
                  modelValue: _ctx.rating,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.rating = $event),
                  max: 4,
                  style: { "font-size": "2rem" }
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })) : _createCommentVNode$5("", true)
          ])
        ])
      ]),
      _: 1
    }, 512),
    _createElementVNode$6("div", _hoisted_10, [
      _createVNode$8(_component_q_input, {
        type: _ctx.inputConfig.modeTextarea ? "textarea" : "text",
        ref: "input",
        onKeyup: _cache[2] || (_cache[2] = _withKeys$1(($event) => _ctx.inputConfig.modeTextarea ? false : _ctx.inputConfig.responseText.trim() === "" && _ctx.inputConfig.rating === 0 ? false : $options.postAnswerText(), ["enter"])),
        "max-height": 100,
        class: "col-grow",
        modelValue: _ctx.inputConfig.responseText,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.inputConfig.responseText = $event),
        placeholder: _ctx.$q.lang.vui.chatbot.inputPlaceholder,
        disable: _ctx.processing || _ctx.error,
        loading: _ctx.processing
      }, null, 8, ["type", "modelValue", "placeholder", "disable", "loading"]),
      _createVNode$8(_component_q_btn, {
        round: "",
        color: "primary",
        icon: "send",
        onClick: _cache[4] || (_cache[4] = ($event) => $options.postAnswerText()),
        disable: _ctx.processing || _ctx.inputConfig.responseText.trim() === "" && _ctx.inputConfig.rating === 0
      }, null, 8, ["disable"]),
      $props.devMode === true ? (_openBlock$b(), _createBlock$8(_component_q_btn, {
        key: 0,
        round: "",
        color: "red",
        icon: "refresh",
        onClick: $options.restart
      }, null, 8, ["onClick"])) : _createCommentVNode$5("", true)
    ])
  ]);
}
var VChatbot = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
const _sfc_main$a = {
  data: function() {
    return {
      text: "",
      commandParamsValues: [],
      commands: [],
      commandAutocompleteOptions: [],
      isCommandCommited: false,
      selectedCommand: {},
      isExecuted: false,
      commandResult: {},
      paramsAutocompleteOptions: []
    };
  },
  props: {
    baseUrl: { type: String, "default": "/" }
  },
  methods: {
    searchCommands: function(val, update, abort) {
      this.$data.text = val;
      this.$data.selectedCommand = {};
      if (val.length < 1) {
        abort();
        return;
      }
      this.$http.post(this.baseUrl + "api/vertigo/commands/_search", { prefix: val }).then(function(response) {
        this.$data.commands = response.data;
        update(function() {
          this.$data.commandAutocompleteOptions = this.$data.commands.map(function(command) {
            return {
              label: command.commandName,
              sublabel: command.descpription,
              value: command.commandName,
              command
            };
          });
        }.bind(this));
        if (this.$data.commands.length > 0) {
          this.chooseCommand(this.$data.commands[0], false);
        }
      }.bind(this));
    },
    selectCommand: function(selection) {
      this.chooseCommand(selection.command, true);
    },
    chooseCommand: function(command, commitCommand) {
      this.$data.selectedCommand = command;
      if (this.$data.selectedCommand.commandParams) {
        this.$data.commandParamsValues = this.$data.selectedCommand.commandParams.map(function() {
          return {
            value: ""
          };
        });
      } else {
        this.$data.commandParamsValues = [];
      }
      this.$data.isCommandCommited = commitCommand;
    },
    commitCommand: function(keyEvent) {
      if (this.$data.selectedCommand && this.$data.selectedCommand.commandName) {
        switch (keyEvent.keyCode) {
          case 9:
          case 13:
            this.$data.isCommandCommited = true;
            keyEvent.preventDefault();
        }
      }
    },
    executeCommand: function() {
      if (this.$data.commandParamsValues.every(function(paramValue) {
        return paramValue;
      })) {
        var actualParams = this.$data.commandParamsValues.map(function(param) {
          return param.value;
        });
        this.$http.post(this.baseUrl + "api/vertigo/commands/_execute", { command: this.$data.selectedCommand.commandName, params: actualParams }).then(function(response) {
          this.$data.isExecuted = true;
          this.$data.commandResult = response.data;
        }.bind(this));
      } else {
        return false;
      }
    },
    handleEnter: function(index) {
      if (index === this.$data.selectedCommand.commandParams.length - 1 && this.$data.commandParamsValues[index].value) {
        this.executeCommand();
      }
    },
    autocompleteParam: function(param, index, val, update, abort) {
      if (val.length < 1) {
        abort();
        return;
      }
      this.$http.get(this.baseUrl + "api/vertigo/commands/params/_autocomplete", { params: { terms: val, entityClass: param.paramType.actualTypeArguments[0] } }).then(function(response) {
        update(function() {
          var newOptions = this.$data.paramsAutocompleteOptions.slice();
          newOptions[index] = response.data.map(function(element) {
            return {
              label: element.label,
              value: element.urn
            };
          });
          this.$data.paramsAutocompleteOptions = newOptions;
        }.bind(this));
      }.bind(this));
    },
    selectParam: function(selection, index) {
      var newParams = this.$data.commandParamsValues.slice();
      newParams[index] = selection;
      this.$data.commandParamsValues = newParams;
    },
    getParamValue(index) {
      var actualValue = this.$data.commandParamsValues[index];
      if (actualValue && actualValue.value) {
        return actualValue;
      }
    },
    backIfNeeded: function(index, isFirst) {
      if (isFirst && !this.$data.commandParamsValues[0].value) {
        this.back();
      }
    },
    back: function() {
      this.$data.commandParamsValues = [];
      this.$data.commands = [];
      this.$data.isCommandCommited = false;
      this.$data.selectedCommand = {};
      this.$data.isExecuted = false;
      this.$data.commandResult = {};
      this.$data.paramsAutocompleteOptions = [];
      this.$nextTick(function() {
        this.$refs.commandInput.updateInputValue(this.$data.text);
      });
    },
    reset: function() {
      this.back();
      this.$data.text = "";
    }
  }
};
const _toDisplayString$8 = window["Vue"].toDisplayString;
const _openBlock$a = window["Vue"].openBlock;
const _createElementBlock$9 = window["Vue"].createElementBlock;
const _createCommentVNode$4 = window["Vue"].createCommentVNode;
const _resolveComponent$9 = window["Vue"].resolveComponent;
const _withCtx$8 = window["Vue"].withCtx;
const _createBlock$7 = window["Vue"].createBlock;
const _createElementVNode$5 = window["Vue"].createElementVNode;
const _renderList$6 = window["Vue"].renderList;
const _Fragment$6 = window["Vue"].Fragment;
const _withKeys = window["Vue"].withKeys;
const _createVNode$7 = window["Vue"].createVNode;
const _createTextVNode$4 = window["Vue"].createTextVNode;
const _hoisted_1$8 = {
  key: 0,
  style: { "line-height": "40px", "opacity": "0.5", "position": "fixed" }
};
const _hoisted_2$3 = {
  class: "bg-grey-4 text-center vertical-middle text-bold q-px-md",
  style: { "line-height": "40px" }
};
const _hoisted_3$2 = {
  key: 0,
  class: "row col items-center q-py-xs"
};
const _hoisted_4$1 = {
  key: 1,
  class: "col"
};
const _hoisted_5$1 = {
  key: 1,
  class: "row col items-center"
};
const _hoisted_6 = {
  class: "col shadow-2 bg-secondary text-white q-px-md",
  style: { "line-height": "40px" }
};
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_select = _resolveComponent$9("q-select");
  const _component_q_input = _resolveComponent$9("q-input");
  const _component_q_separator = _resolveComponent$9("q-separator");
  const _component_q_btn = _resolveComponent$9("q-btn");
  return _openBlock$a(), _createElementBlock$9("div", null, [
    !_ctx.isCommandCommited ? (_openBlock$a(), _createBlock$7(_component_q_select, {
      key: 0,
      placeholder: _ctx.$q.lang.vui.commands.globalPlaceholder,
      outlined: "",
      "bg-color": "white",
      dense: "",
      ref: "commandInput",
      autofocus: "",
      "dropdown-icon": "search",
      onBlur: $options.reset,
      "use-input": "",
      "input-debounce": "300",
      "hide-selected": "",
      onKeydown: $options.commitCommand,
      options: _ctx.commandAutocompleteOptions,
      onFilter: $options.searchCommands,
      "onUpdate:modelValue": $options.selectCommand
    }, {
      default: _withCtx$8(() => [
        _ctx.text !== "" && _ctx.selectedCommand.commandName && _ctx.selectedCommand.commandName.startsWith(_ctx.text) ? (_openBlock$a(), _createElementBlock$9("span", _hoisted_1$8, _toDisplayString$8(_ctx.selectedCommand.commandName), 1)) : _createCommentVNode$4("", true)
      ]),
      _: 1
    }, 8, ["placeholder", "onBlur", "onKeydown", "options", "onFilter", "onUpdate:modelValue"])) : (_openBlock$a(), _createElementBlock$9("div", {
      key: 1,
      class: "row col-12 justify-between bg-white round-borders overflow-hidden shadow-2 text-black",
      onKeyup: _cache[0] || (_cache[0] = _withKeys((...args) => $options.executeCommand && $options.executeCommand(...args), ["enter"]))
    }, [
      _createElementVNode$5("div", _hoisted_2$3, _toDisplayString$8(_ctx.selectedCommand.commandName), 1),
      !_ctx.isExecuted ? (_openBlock$a(), _createElementBlock$9("div", _hoisted_3$2, [
        _ctx.selectedCommand.commandParams && _ctx.selectedCommand.commandParams.length > 0 ? (_openBlock$a(true), _createElementBlock$9(_Fragment$6, { key: 0 }, _renderList$6(_ctx.selectedCommand.commandParams, (param, index) => {
          return _openBlock$a(), _createElementBlock$9(_Fragment$6, { key: param }, [
            param.paramType.rawType === "io.vertigo.commons.command.GenericUID" ? (_openBlock$a(), _createBlock$7(_component_q_select, {
              key: 0,
              class: "col q-px-xs",
              "use-chips": "",
              "bg-color": "white",
              dense: "",
              borderless: "",
              "use-input": "",
              "input-debounce": "300",
              value: $options.getParamValue(index),
              options: _ctx.paramsAutocompleteOptions[index],
              autofocus: index === 0,
              "dropdown-icon": "search",
              onKeydown: _withKeys(function(event) {
                $options.backIfNeeded(event, index === 0);
              }, ["delete"]),
              onKeyup: _withKeys(function(event) {
                $options.backIfNeeded(event, index === 0);
              }, ["esc"]),
              onFilter: ($event) => $options.autocompleteParam(param, index, _ctx.val, _ctx.update, _ctx.abort),
              "onUpdate:modelValue": ($event) => $options.selectParam(_ctx.newValue, index),
              style: { "height": "32px" }
            }, null, 8, ["value", "options", "autofocus", "onKeydown", "onKeyup", "onFilter", "onUpdate:modelValue"])) : (_openBlock$a(), _createBlock$7(_component_q_input, {
              key: 1,
              class: "col q-px-xs",
              color: "secondary",
              borderless: "",
              modelValue: _ctx.commandParamsValues[index].value,
              "onUpdate:modelValue": ($event) => _ctx.commandParamsValues[index].value = $event,
              onKeydown: _withKeys(($event) => $options.backIfNeeded(_ctx.event, index === 0), ["delete"]),
              onKeyup: [
                _withKeys(($event) => $options.backIfNeeded(_ctx.event, index === 0), ["esc"]),
                _withKeys(($event) => $options.handleEnter(index), ["enter"])
              ],
              autofocus: index === 0,
              dense: "",
              style: { "height": "32px" }
            }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown", "onKeyup", "autofocus"])),
            _createVNode$7(_component_q_separator, { vertical: "" })
          ], 64);
        }), 128)) : (_openBlock$a(), _createElementBlock$9("div", _hoisted_4$1, _toDisplayString$8(_ctx.$q.lang.vui.commands.executeCommand), 1)),
        _createVNode$7(_component_q_btn, {
          onClick: $options.executeCommand,
          flat: "",
          icon: "play_arrow",
          size: "sm",
          round: ""
        }, null, 8, ["onClick"])
      ])) : (_openBlock$a(), _createElementBlock$9("div", _hoisted_5$1, [
        _createElementVNode$5("div", _hoisted_6, _toDisplayString$8(_ctx.commandResult.display), 1),
        _ctx.commandResult.targetUrl ? (_openBlock$a(), _createBlock$7(_component_q_btn, {
          key: 0,
          type: "a",
          href: $props.baseUrl + _ctx.commandResult.targetUrl,
          flat: ""
        }, {
          default: _withCtx$8(() => [
            _createTextVNode$4(_toDisplayString$8(_ctx.$q.lang.vui.commands.linkLabel), 1)
          ]),
          _: 1
        }, 8, ["href"])) : _createCommentVNode$4("", true),
        _createVNode$7(_component_q_btn, {
          onClick: $options.reset,
          flat: "",
          icon: "cancel",
          size: "sm",
          round: ""
        }, null, 8, ["onClick"])
      ]))
    ], 32))
  ]);
}
var VCommands = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
const Quasar$7 = window["Quasar"];
const _sfc_main$9 = {
  props: {
    concept: { type: String },
    id: { type: String },
    icon: { type: String, "default": "comment" },
    iconNone: { type: String, "default": "add_comment" },
    baseUrl: { type: String, "default": "/api/", required: true },
    connectedAccount: { type: String }
  },
  data: function() {
    return {
      list: [],
      count: 0,
      commentDrawer: false,
      commentTextArea: ""
    };
  },
  created: function() {
    this.fetchCommentsList();
  },
  methods: {
    fetchCommentsList: function() {
      this.$http.get(this.baseUrl + "x/comment/api/comments?concept=" + this.concept + "&id=" + this.id).then(function(response) {
        this.list = response.data;
        this.count = this.list.length;
      }.bind(this));
    },
    publishComment: function() {
      var newComment = {
        msg: this.commentTextArea
      };
      if (newComment.msg) {
        newComment.concept = this.concept;
        newComment.id = this.id;
        this.$http.post(this.baseUrl + "x/comment/api/comments?concept=" + this.concept + "&id=" + this.id, newComment).then(function() {
          this.commentTextArea = "";
          this.fetchCommentsList();
        }.bind(this));
      }
    },
    updateComment: function(newComment) {
      this.$http.put(this.baseUrl + "x/comment/api/comments/" + newComment.uuid, newComment).then(function() {
        this.commentTextArea = "";
        this.fetchCommentsList();
      }.bind(this));
    },
    toDelay: function(creationDate) {
      let diff = Quasar$7.date.getDateDiff(Date.now(), creationDate, "days");
      if (diff > 0)
        return diff + " days";
      diff = Quasar$7.date.getDateDiff(Date.now(), creationDate, "hours");
      if (diff > 0)
        return diff + " hours";
      diff = Quasar$7.date.getDateDiff(Date.now(), creationDate, "minutes");
      if (diff > 0)
        return diff + " min";
      return "Now";
    }
  }
};
const _toDisplayString$7 = window["Vue"].toDisplayString;
const _createTextVNode$3 = window["Vue"].createTextVNode;
const _resolveComponent$8 = window["Vue"].resolveComponent;
const _withCtx$7 = window["Vue"].withCtx;
const _openBlock$9 = window["Vue"].openBlock;
const _createBlock$6 = window["Vue"].createBlock;
const _createCommentVNode$3 = window["Vue"].createCommentVNode;
const _createVNode$6 = window["Vue"].createVNode;
const _renderList$5 = window["Vue"].renderList;
const _Fragment$5 = window["Vue"].Fragment;
const _createElementBlock$8 = window["Vue"].createElementBlock;
const _createElementVNode$4 = window["Vue"].createElementVNode;
const _normalizeClass$1 = window["Vue"].normalizeClass;
const _hoisted_1$7 = ["src"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_badge = _resolveComponent$8("q-badge");
  const _component_q_btn = _resolveComponent$8("q-btn");
  const _component_big = _resolveComponent$8("big");
  const _component_q_item_label = _resolveComponent$8("q-item-label");
  const _component_q_input = _resolveComponent$8("q-input");
  const _component_q_item_section = _resolveComponent$8("q-item-section");
  const _component_q_item = _resolveComponent$8("q-item");
  const _component_q_separator = _resolveComponent$8("q-separator");
  const _component_q_avatar = _resolveComponent$8("q-avatar");
  const _component_q_icon = _resolveComponent$8("q-icon");
  const _component_q_popup_edit = _resolveComponent$8("q-popup-edit");
  const _component_q_list = _resolveComponent$8("q-list");
  const _component_q_drawer = _resolveComponent$8("q-drawer");
  return _openBlock$9(), _createElementBlock$8("span", null, [
    _createVNode$6(_component_q_btn, {
      round: "",
      size: "lg",
      color: "primary",
      textColor: "white",
      icon: _ctx.count > 0 ? $props.icon : $props.iconNone,
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.commentDrawer = !_ctx.commentDrawer),
      class: "on-left"
    }, {
      default: _withCtx$7(() => [
        _ctx.count > 0 ? (_openBlock$9(), _createBlock$6(_component_q_badge, {
          key: 0,
          floating: "",
          small: "",
          color: "red",
          style: { "right": "-.4em", "top": "-.4em" }
        }, {
          default: _withCtx$7(() => [
            _createTextVNode$3(_toDisplayString$7(_ctx.count), 1)
          ]),
          _: 1
        })) : _createCommentVNode$3("", true)
      ]),
      _: 1
    }, 8, ["icon"]),
    _createVNode$6(_component_q_drawer, {
      overlay: "",
      behavior: "mobile",
      width: 600,
      modelValue: _ctx.commentDrawer,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.commentDrawer = $event),
      side: "right",
      style: { "top": "58px" }
    }, {
      default: _withCtx$7(() => [
        _createVNode$6(_component_q_list, null, {
          default: _withCtx$7(() => [
            _createVNode$6(_component_q_item_label, { header: "" }, {
              default: _withCtx$7(() => [
                _createVNode$6(_component_big, null, {
                  default: _withCtx$7(() => [
                    _createTextVNode$3(_toDisplayString$7(_ctx.$q.lang.vui.comments.title), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            _createVNode$6(_component_q_item, null, {
              default: _withCtx$7(() => [
                _createVNode$6(_component_q_item_section, null, {
                  default: _withCtx$7(() => [
                    _createVNode$6(_component_q_input, {
                      class: "col",
                      type: "textarea",
                      autogrow: "",
                      modelValue: _ctx.commentTextArea,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.commentTextArea = $event),
                      label: _ctx.$q.lang.vui.comments.inputLabel,
                      "stack-label": ""
                    }, null, 8, ["modelValue", "label"])
                  ]),
                  _: 1
                }),
                _createVNode$6(_component_q_item_section, { side: "" }, {
                  default: _withCtx$7(() => [
                    _createVNode$6(_component_q_btn, {
                      color: "primary",
                      round: "",
                      icon: "send",
                      title: _ctx.$q.lang.vui.comments.actionLabel,
                      "aria-label": _ctx.$q.lang.vui.comments.actionLabel,
                      onClick: $options.publishComment
                    }, null, 8, ["title", "aria-label", "onClick"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            _createVNode$6(_component_q_separator),
            (_openBlock$9(true), _createElementBlock$8(_Fragment$5, null, _renderList$5(_ctx.list, (comment) => {
              return _openBlock$9(), _createBlock$6(_component_q_item, {
                key: comment.uuid,
                class: _normalizeClass$1(["items-start", { "cursor-pointer": comment.author == $props.connectedAccount }])
              }, {
                default: _withCtx$7(() => [
                  _createVNode$6(_component_q_item_section, { avatar: "" }, {
                    default: _withCtx$7(() => [
                      _createVNode$6(_component_q_avatar, null, {
                        default: _withCtx$7(() => [
                          _createElementVNode$4("img", {
                            src: $props.baseUrl + "x/accounts/api/" + comment.author + "/photo"
                          }, null, 8, _hoisted_1$7)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  _createVNode$6(_component_q_item_section, null, {
                    default: _withCtx$7(() => [
                      _createVNode$6(_component_q_item_label, null, {
                        default: _withCtx$7(() => [
                          _createTextVNode$3(_toDisplayString$7(comment.authorDisplayName), 1)
                        ]),
                        _: 2
                      }, 1024),
                      _createElementVNode$4("div", null, _toDisplayString$7(comment.msg), 1)
                    ]),
                    _: 2
                  }, 1024),
                  _createVNode$6(_component_q_item_section, { side: "" }, {
                    default: _withCtx$7(() => [
                      _createVNode$6(_component_q_item_label, { stamp: "" }, {
                        default: _withCtx$7(() => [
                          _createTextVNode$3(_toDisplayString$7($options.toDelay(new Date(comment.creationDate))), 1)
                        ]),
                        _: 2
                      }, 1024),
                      comment.author == $props.connectedAccount ? (_openBlock$9(), _createBlock$6(_component_q_icon, {
                        key: 0,
                        name: "edit"
                      })) : _createCommentVNode$3("", true)
                    ]),
                    _: 2
                  }, 1024),
                  comment.author == $props.connectedAccount ? (_openBlock$9(), _createBlock$6(_component_q_popup_edit, {
                    key: 0,
                    buttons: true,
                    onSave: ($event) => $options.updateComment(comment),
                    "label-cancel": _ctx.$q.lang.vui.comments.cancel,
                    "label-set": _ctx.$q.lang.vui.comments.save
                  }, {
                    default: _withCtx$7(() => [
                      _createVNode$6(_component_q_input, {
                        type: "textarea",
                        autogrow: "",
                        modelValue: comment.msg,
                        "onUpdate:modelValue": ($event) => comment.msg = $event,
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, 1032, ["onSave", "label-cancel", "label-set"])) : _createCommentVNode$3("", true)
                ]),
                _: 2
              }, 1032, ["class"]);
            }), 128))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ]);
}
var VComments = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
const _sfc_main$8 = {
  props: {
    activeSkills: { type: Array, required: true }
  },
  data: function() {
    return {
      extensions: []
    };
  },
  created: function() {
    var availableExtensions = [
      { name: "vertigo-audit", label: "Audit", description: "Trace every single aspect of your app through exhaustive logging capabilities.", color: "#F7578C", icon: "fas fa-clipboard-list", enabled: false },
      { name: "vertigo-dashboard", label: "Dashboard", description: "Monitor you system to make sure your app meets the customer requirements.", color: "#742774", icon: "fas fa-chart-line", enabled: false },
      { name: "vertigo-geo", label: "Geo", description: "Enhance your data by enabling geographic functions and tools.", icon: "fas fa-globe", color: "#0E2947", enabled: false },
      { name: "vertigo-ledger", label: "Ledger", description: "Use a blockchain to enforce secure transactions in your app !", icon: "fas fa-link", color: "#00AC5C", enabled: false },
      { name: "vertigo-orchestra", label: "Orchestra", description: "Manage jobs and monitor their status with this powerfull control tower.", color: "#FC636B", icon: "fas fa-tasks", enabled: false },
      { name: "vertigo-quarto", label: "Quarto", description: "Generate slick documents and reports using the Quarto template engine.", color: "#0747A6", icon: "fas fa-file-invoice", enabled: false },
      { name: "vertigo-social", label: "Social", description: "Ensure real time communication and collaboration between your app users.", color: "#FF3366", icon: "far fa-comments", enabled: false },
      { name: "vertigo-stella", label: "Stella", description: "Enable multi-node task dispatching for your app and assign specific tasks to each node.", color: "#0066FF", icon: "fas fa-network-wired", enabled: false }
    ];
    availableExtensions.forEach(function(availableExtension) {
      availableExtension.enabled = this.$props.activeSkills.indexOf(availableExtension.name) > -1;
    }.bind(this));
    this.extensions = availableExtensions;
  },
  methods: {
    getIconStyle: function(color) {
      return "border: 3px solid " + color + "; background-color: " + color + "; color: white; padding: 5px; width: 70px; height: 70px;";
    }
  }
};
const _renderList$4 = window["Vue"].renderList;
const _Fragment$4 = window["Vue"].Fragment;
const _openBlock$8 = window["Vue"].openBlock;
const _createElementBlock$7 = window["Vue"].createElementBlock;
const _resolveComponent$7 = window["Vue"].resolveComponent;
const _normalizeStyle = window["Vue"].normalizeStyle;
const _createVNode$5 = window["Vue"].createVNode;
const _withCtx$6 = window["Vue"].withCtx;
const _toDisplayString$6 = window["Vue"].toDisplayString;
const _createElementVNode$3 = window["Vue"].createElementVNode;
const _hoisted_1$6 = { class: "row q-col-gutter-md" };
const _hoisted_2$2 = { class: "row col items-center" };
const _hoisted_3$1 = { class: "q-subheading text-bold" };
const _hoisted_4 = /* @__PURE__ */ _createElementVNode$3("div", { class: "col" }, null, -1);
const _hoisted_5 = { class: "row col q-body-2 text-justify" };
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_icon = _resolveComponent$7("q-icon");
  const _component_q_item_section = _resolveComponent$7("q-item-section");
  const _component_q_toggle = _resolveComponent$7("q-toggle");
  const _component_q_item = _resolveComponent$7("q-item");
  const _component_q_card = _resolveComponent$7("q-card");
  return _openBlock$8(), _createElementBlock$7("div", _hoisted_1$6, [
    (_openBlock$8(true), _createElementBlock$7(_Fragment$4, null, _renderList$4(_ctx.extensions, (extension) => {
      return _openBlock$8(), _createElementBlock$7("div", {
        class: "col-xs-12 col-lg-6 col-xl-4",
        key: extension.name
      }, [
        _createVNode$5(_component_q_card, null, {
          default: _withCtx$6(() => [
            _createVNode$5(_component_q_item, {
              class: "bg-white",
              style: { "height": "100px" }
            }, {
              default: _withCtx$6(() => [
                _createVNode$5(_component_q_item_section, { avatar: "" }, {
                  default: _withCtx$6(() => [
                    _createVNode$5(_component_q_icon, {
                      name: extension.icon,
                      size: "40px",
                      style: _normalizeStyle($options.getIconStyle(extension.color))
                    }, null, 8, ["name", "style"])
                  ]),
                  _: 2
                }, 1024),
                _createVNode$5(_component_q_item_section, null, {
                  default: _withCtx$6(() => [
                    _createElementVNode$3("div", _hoisted_2$2, [
                      _createElementVNode$3("div", _hoisted_3$1, _toDisplayString$6(extension.label), 1),
                      _hoisted_4,
                      _createElementVNode$3("div", null, [
                        _createVNode$5(_component_q_toggle, {
                          disable: "",
                          readonly: "",
                          color: "positive",
                          modelValue: extension.enabled,
                          "onUpdate:modelValue": ($event) => extension.enabled = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    _createElementVNode$3("div", _hoisted_5, _toDisplayString$6(extension.description), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 2
        }, 1024)
      ]);
    }), 128))
  ]);
}
var VExtensionsStore = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
const _sfc_main$7 = {
  props: {
    facets: Array,
    selectedFacets: Object,
    contextKey: String,
    maxValues: {
      type: Number,
      default: 5
    }
  },
  emits: ["toogle-facet"],
  computed: {},
  data: function() {
    return {
      expandedFacets: []
    };
  },
  methods: {
    facetByCode(facetCode) {
      return this.facets.filter(function(facet) {
        return facet.code === facetCode;
      })[0];
    },
    facetValueByCode(facetCode, facetValueCode) {
      return this.facetByCode(facetCode).values.filter(function(facetValue) {
        return facetValue.code === facetValueCode;
      })[0];
    },
    facetLabelByCode(facetCode) {
      return this.facetByCode(facetCode).label;
    },
    facetMultipleByCode(facetCode) {
      return this.facetByCode(facetCode).multiple;
    },
    facetValueLabelByCode(facetCode, facetValueCode) {
      var facetValueByCode = this.facetValueByCode(facetCode, facetValueCode);
      return facetValueByCode ? facetValueByCode.label : facetValueCode;
    },
    isFacetValueSelected(facetCode, facetValueCode) {
      return this.selectedFacets[facetCode].includes(facetValueCode);
    },
    isFacetSelected(facetCode) {
      if (this.selectedFacets[facetCode]) {
        return this.selectedFacets[facetCode].length > 0;
      }
      return false;
    },
    isAnyFacetValueSelected() {
      return Object.keys(this.selectedFacets).some(function(facetCode) {
        return !this.facetMultipleByCode(facetCode);
      }.bind(this));
    },
    expandFacet(facetCode) {
      if (!this.isFacetExpanded(facetCode)) {
        this.$data.expandedFacets.push(facetCode);
      }
    },
    reduceFacet(facetCode) {
      if (this.isFacetExpanded(facetCode)) {
        this.$data.expandedFacets.splice(this.$data.expandedFacets.indexOf(facetCode), 1);
      }
    },
    isFacetExpanded(facetCode) {
      return this.$data.expandedFacets.includes(facetCode);
    },
    selectedInvisibleFacets(facetCode) {
      return this.selectedFacets[facetCode].filter((facetValueCode) => !this.facetValueByCode(facetCode, facetValueCode)).map((facetValueCode) => {
        var obj = {};
        obj.code = facetValueCode;
        obj.label = facetValueCode;
        obj.count = 0;
        return obj;
      });
    },
    visibleFacets(facetCode, facetValues) {
      if (!this.isFacetExpanded(facetCode)) {
        return facetValues.slice(0, this.maxValues);
      }
      return facetValues;
    }
  }
};
const _renderList$3 = window["Vue"].renderList;
const _Fragment$3 = window["Vue"].Fragment;
const _openBlock$7 = window["Vue"].openBlock;
const _createElementBlock$6 = window["Vue"].createElementBlock;
const _toDisplayString$5 = window["Vue"].toDisplayString;
const _createTextVNode$2 = window["Vue"].createTextVNode;
const _resolveComponent$6 = window["Vue"].resolveComponent;
const _withCtx$5 = window["Vue"].withCtx;
const _createBlock$5 = window["Vue"].createBlock;
const _createCommentVNode$2 = window["Vue"].createCommentVNode;
const _createVNode$4 = window["Vue"].createVNode;
const _hoisted_1$5 = { class: "facets" };
const _hoisted_2$1 = {
  key: 0,
  class: "selectedFacets q-pb-md"
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_chip = _resolveComponent$6("q-chip");
  const _component_big = _resolveComponent$6("big");
  const _component_q_item_label = _resolveComponent$6("q-item-label");
  const _component_q_checkbox = _resolveComponent$6("q-checkbox");
  const _component_q_item_section = _resolveComponent$6("q-item-section");
  const _component_q_item = _resolveComponent$6("q-item");
  const _component_q_btn = _resolveComponent$6("q-btn");
  const _component_q_list = _resolveComponent$6("q-list");
  return _openBlock$7(), _createElementBlock$6("div", _hoisted_1$5, [
    $options.isAnyFacetValueSelected() ? (_openBlock$7(), _createElementBlock$6("div", _hoisted_2$1, [
      (_openBlock$7(true), _createElementBlock$6(_Fragment$3, null, _renderList$3($props.selectedFacets, (selectedFacetValues, selectedFacet) => {
        return _openBlock$7(), _createElementBlock$6("div", { key: selectedFacet }, [
          !$options.facetMultipleByCode(selectedFacet) ? (_openBlock$7(true), _createElementBlock$6(_Fragment$3, { key: 0 }, _renderList$3(selectedFacetValues, (selectedFacetValue) => {
            return _openBlock$7(), _createBlock$5(_component_q_chip, {
              clickable: "",
              class: "q-mb-sm",
              key: selectedFacetValue.code,
              onClick: ($event) => _ctx.$emit("toogle-facet", selectedFacet, selectedFacetValue, $props.contextKey),
              "icon-right": "cancel"
            }, {
              default: _withCtx$5(() => [
                _createTextVNode$2(_toDisplayString$5($options.facetLabelByCode(selectedFacet)) + ": " + _toDisplayString$5($options.facetValueLabelByCode(selectedFacet, selectedFacetValue)), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]);
          }), 128)) : _createCommentVNode$2("", true)
        ]);
      }), 128))
    ])) : _createCommentVNode$2("", true),
    (_openBlock$7(true), _createElementBlock$6(_Fragment$3, null, _renderList$3($props.facets, (facet) => {
      return _openBlock$7(), _createBlock$5(_component_q_list, {
        key: facet.code,
        class: "facetValues q-py-none",
        dense: ""
      }, {
        default: _withCtx$5(() => [
          facet.multiple || !$options.isFacetSelected(facet.code) ? (_openBlock$7(), _createElementBlock$6(_Fragment$3, { key: 0 }, [
            _createVNode$4(_component_q_item_label, { header: "" }, {
              default: _withCtx$5(() => [
                _createVNode$4(_component_big, null, {
                  default: _withCtx$5(() => [
                    _createTextVNode$2(_toDisplayString$5(facet.label), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024),
            (_openBlock$7(true), _createElementBlock$6(_Fragment$3, null, _renderList$3($options.selectedInvisibleFacets(facet.code), (value) => {
              return _openBlock$7(), _createBlock$5(_component_q_item, {
                key: value.code,
                class: "facetValue q-ml-md",
                clickable: "",
                onClick: ($event) => _ctx.$emit("toogle-facet", facet.code, value.code, $props.contextKey)
              }, {
                default: _withCtx$5(() => [
                  facet.multiple ? (_openBlock$7(), _createBlock$5(_component_q_item_section, {
                    key: 0,
                    side: ""
                  }, {
                    default: _withCtx$5(() => [
                      _createVNode$4(_component_q_checkbox, {
                        dense: "",
                        modelValue: true,
                        "onUpdate:modelValue": ($event) => _ctx.$emit("toogle-facet", facet.code, value.code, $props.contextKey)
                      }, null, 8, ["onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, 1024)) : _createCommentVNode$2("", true),
                  _createVNode$4(_component_q_item_section, null, {
                    default: _withCtx$5(() => [
                      _createTextVNode$2(_toDisplayString$5(value.label), 1)
                    ]),
                    _: 2
                  }, 1024),
                  _createVNode$4(_component_q_item_section, { side: "" }, {
                    default: _withCtx$5(() => [
                      _createTextVNode$2(_toDisplayString$5(value.count), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1032, ["onClick"]);
            }), 128)),
            (_openBlock$7(true), _createElementBlock$6(_Fragment$3, null, _renderList$3($options.visibleFacets(facet.code, facet.values), (value) => {
              return _openBlock$7(), _createBlock$5(_component_q_item, {
                key: value.code,
                class: "facetValue q-ml-md",
                clickable: "",
                onClick: ($event) => _ctx.$emit("toogle-facet", facet.code, value.code, $props.contextKey)
              }, {
                default: _withCtx$5(() => [
                  facet.multiple ? (_openBlock$7(), _createBlock$5(_component_q_item_section, {
                    key: 0,
                    side: ""
                  }, {
                    default: _withCtx$5(() => [
                      _createVNode$4(_component_q_checkbox, {
                        dense: "",
                        modelValue: $options.isFacetValueSelected(facet.code, value.code),
                        "onUpdate:modelValue": ($event) => _ctx.$emit("toogle-facet", facet.code, value.code, $props.contextKey)
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, 1024)) : _createCommentVNode$2("", true),
                  _createVNode$4(_component_q_item_section, null, {
                    default: _withCtx$5(() => [
                      _createTextVNode$2(_toDisplayString$5(value.label), 1)
                    ]),
                    _: 2
                  }, 1024),
                  _createVNode$4(_component_q_item_section, { side: "" }, {
                    default: _withCtx$5(() => [
                      _createTextVNode$2(_toDisplayString$5(value.count), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1032, ["onClick"]);
            }), 128)),
            facet.values.length > $props.maxValues && !$options.isFacetExpanded(facet.code) ? (_openBlock$7(), _createBlock$5(_component_q_btn, {
              key: 0,
              flat: "",
              onClick: ($event) => $options.expandFacet(facet.code)
            }, {
              default: _withCtx$5(() => [
                _createTextVNode$2(_toDisplayString$5(_ctx.$q.lang.vui.facets.showAll), 1)
              ]),
              _: 2
            }, 1032, ["onClick"])) : _createCommentVNode$2("", true),
            facet.values.length > $props.maxValues && $options.isFacetExpanded(facet.code) ? (_openBlock$7(), _createBlock$5(_component_q_btn, {
              key: 1,
              flat: "",
              onClick: ($event) => $options.reduceFacet(facet.code)
            }, {
              default: _withCtx$5(() => [
                _createTextVNode$2(_toDisplayString$5(_ctx.$q.lang.vui.facets.showLess), 1)
              ]),
              _: 2
            }, 1032, ["onClick"])) : _createCommentVNode$2("", true)
          ], 64)) : _createCommentVNode$2("", true)
        ]),
        _: 2
      }, 1024);
    }), 128))
  ]);
}
var VFacets = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
const _sfc_main$6 = {
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
    modelValue: function(newVal) {
      this.$data.inputObject = newVal ? newVal : {};
      this.updateJson();
    }
  },
  beforeMount() {
    this.updateJson();
  },
  methods: {
    updateJson() {
      var newInputValue;
      if (this.$props.modelValue) {
        newInputValue = JSON.stringify({ lon: this.$data.inputObject.lon, lat: this.$data.inputObject.lat });
        this.$props.modelValue["_v_inputValue"] = newInputValue;
      }
      this.$emit("update:modelValue", this.$data.inputObject);
    }
  }
};
const _resolveComponent$5 = window["Vue"].resolveComponent;
const _createVNode$3 = window["Vue"].createVNode;
const _openBlock$6 = window["Vue"].openBlock;
const _createElementBlock$5 = window["Vue"].createElementBlock;
const _hoisted_1$4 = { class: "row" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_input = _resolveComponent$5("q-input");
  return _openBlock$6(), _createElementBlock$5("div", _hoisted_1$4, [
    _createVNode$3(_component_q_input, {
      label: "Longitude",
      "stack-label": "",
      modelValue: _ctx.inputObject.lon,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => _ctx.inputObject.lon = $event),
        $options.updateJson
      ],
      modelModifiers: { number: true }
    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
    _createVNode$3(_component_q_input, {
      label: "Latitude",
      "stack-label": "",
      modelValue: _ctx.inputObject.lat,
      "onUpdate:modelValue": [
        _cache[1] || (_cache[1] = ($event) => _ctx.inputObject.lat = $event),
        $options.updateJson
      ],
      modelModifiers: { number: true }
    }, null, 8, ["modelValue", "onUpdate:modelValue"])
  ]);
}
var VGeopointInput = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
const _sfc_main$5 = {
  props: {
    baseUrl: { type: String, "default": "/" }
  },
  data: function() {
    return {
      text: "",
      handles: []
    };
  },
  methods: {
    searchHandles: function(val) {
      if (val) {
        this.$http.post(this.baseUrl + "api/vertigo/handle/_search", { prefix: val }).then(function(response) {
          this.$data.handles = response.data;
        }.bind(this));
      }
    }
  }
};
const _resolveComponent$4 = window["Vue"].resolveComponent;
const _createVNode$2 = window["Vue"].createVNode;
const _withCtx$4 = window["Vue"].withCtx;
const _renderList$2 = window["Vue"].renderList;
const _Fragment$2 = window["Vue"].Fragment;
const _openBlock$5 = window["Vue"].openBlock;
const _createElementBlock$4 = window["Vue"].createElementBlock;
const _toDisplayString$4 = window["Vue"].toDisplayString;
const _createTextVNode$1 = window["Vue"].createTextVNode;
const _resolveDirective = window["Vue"].resolveDirective;
const _createBlock$4 = window["Vue"].createBlock;
const _withDirectives = window["Vue"].withDirectives;
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_icon = _resolveComponent$4("q-icon");
  const _component_q_input = _resolveComponent$4("q-input");
  const _component_q_item_section = _resolveComponent$4("q-item-section");
  const _component_q_item = _resolveComponent$4("q-item");
  const _component_q_list = _resolveComponent$4("q-list");
  const _directive_ripple = _resolveDirective("ripple");
  return _openBlock$5(), _createElementBlock$4("div", null, [
    _createVNode$2(_component_q_input, {
      placeholder: _ctx.$q.lang.vui.handles.placeholder,
      modelValue: _ctx.text,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.text = $event),
      debounce: 300,
      onInput: $options.searchHandles,
      autofocus: "",
      outlined: "",
      "bg-color": "white",
      dense: ""
    }, {
      prepend: _withCtx$4(() => [
        _createVNode$2(_component_q_icon, { name: "search" })
      ]),
      _: 1
    }, 8, ["placeholder", "modelValue", "onInput"]),
    _createVNode$2(_component_q_list, {
      bordered: "",
      dense: "",
      separator: ""
    }, {
      default: _withCtx$4(() => [
        (_openBlock$5(true), _createElementBlock$4(_Fragment$2, null, _renderList$2(_ctx.handles, (handle) => {
          return _withDirectives((_openBlock$5(), _createBlock$4(_component_q_item, {
            clickable: "",
            onClick: ($event) => _ctx.VUi.methods.goTo($props.baseUrl + "hw/" + handle.code),
            key: handle.code
          }, {
            default: _withCtx$4(() => [
              _createVNode$2(_component_q_item_section, null, {
                default: _withCtx$4(() => [
                  _createTextVNode$1(_toDisplayString$4(handle.code), 1)
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1032, ["onClick"])), [
            [_directive_ripple]
          ]);
        }), 128))
      ]),
      _: 1
    })
  ]);
}
var VHandles = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
const _sfc_main$4 = {
  props: {
    modelValue: { type: String, required: true },
    readonly: { type: Boolean, required: true },
    cols: { type: Number, "default": 2 }
  },
  emits: ["update:modelValue"],
  data: function() {
    return {
      jsonAsObject: JSON.parse(this.$props.modelValue)
    };
  },
  watch: {
    modelValue: function(newVal) {
      this.$data.jsonAsObject = JSON.parse(newVal);
    }
  },
  methods: {
    updateJson() {
      this.$emit("update:modelValue", JSON.stringify(this.$data.jsonAsObject));
    }
  }
};
const _renderList$1 = window["Vue"].renderList;
const _Fragment$1 = window["Vue"].Fragment;
const _openBlock$4 = window["Vue"].openBlock;
const _createElementBlock$3 = window["Vue"].createElementBlock;
const _resolveComponent$3 = window["Vue"].resolveComponent;
const _createBlock$3 = window["Vue"].createBlock;
window["Vue"].createCommentVNode;
const _toDisplayString$3 = window["Vue"].toDisplayString;
const _createElementVNode$2 = window["Vue"].createElementVNode;
const _withCtx$3 = window["Vue"].withCtx;
const _normalizeClass = window["Vue"].normalizeClass;
const _hoisted_1$3 = { class: "row" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_input = _resolveComponent$3("q-input");
  const _component_q_field = _resolveComponent$3("q-field");
  return _openBlock$4(), _createElementBlock$3("div", _hoisted_1$3, [
    (_openBlock$4(true), _createElementBlock$3(_Fragment$1, null, _renderList$1(_ctx.jsonAsObject, (value, key) => {
      return _openBlock$4(), _createElementBlock$3("div", {
        key,
        class: _normalizeClass("col-" + 12 / $props.cols)
      }, [
        !$props.readonly ? (_openBlock$4(), _createBlock$3(_component_q_input, {
          key: 0,
          label: key,
          orientation: "vertical",
          "stack-label": "",
          modelValue: _ctx.jsonAsObject[key],
          "onUpdate:modelValue": [($event) => _ctx.jsonAsObject[key] = $event, $options.updateJson]
        }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])) : (_openBlock$4(), _createBlock$3(_component_q_field, {
          key: 1,
          label: key,
          orientation: "vertical",
          "stack-label": "",
          borderless: "",
          readonly: ""
        }, {
          default: _withCtx$3(() => [
            _createElementVNode$2("span", null, _toDisplayString$3(value), 1)
          ]),
          _: 2
        }, 1032, ["label"]))
      ], 2);
    }), 128))
  ]);
}
var VJsonEditor = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const Quasar$6 = window["Quasar"];
const _sfc_main$3 = {
  props: {
    icon: { type: String, "default": "notifications" },
    iconNone: { type: String, "default": "notifications_none" },
    typeIconMap: { type: Object, "default": function() {
      return {};
    } },
    baseUrl: { type: String, "default": "/api/", required: true }
  },
  data: function() {
    return {
      firstCall: true,
      list: [],
      hasNew: false,
      wasError: false,
      count: 0,
      timer: ""
    };
  },
  created: function() {
    this.fetchNotificationsList();
    this.timer = setInterval(this.fetchNotificationsList, 5e3);
  },
  methods: {
    fetchNotificationsList: function() {
      this.$http.get(this.baseUrl + "x/notifications/api/messages", { timeout: 5 * 1e3 }).then(function(response) {
        this.updateNotificationsData(response.data);
        if (this.wasError) {
          clearInterval(this.timer);
          this.timer = setInterval(this.fetchNotificationsList, 5e3);
        }
        this.wasError = false;
      }.bind(this)).catch(function() {
        if (!this.wasError) {
          clearInterval(this.timer);
          this.timer = setInterval(this.fetchNotificationsList, 6e4);
        }
        this.wasError = true;
      }.bind(this));
    },
    updateNotificationsData: function(newList) {
      const sortedList = newList.sort(function(a, b) {
        return b.creationDate - a.creationDate;
      });
      var newElements = [];
      var lastOldElement = this.list[0];
      if (!lastOldElement) {
        newElements = sortedList;
      } else {
        for (var newIdx = 0; newIdx < sortedList.length; newIdx++) {
          if (sortedList[newIdx].uuid != lastOldElement.uuid) {
            if (sortedList[newIdx].creationDate < lastOldElement.creationDate) {
              break;
            } else {
              newElements.push(sortedList[newIdx]);
            }
          }
        }
      }
      this.list = sortedList;
      this.count = sortedList.length;
      this.hasNew = newElements.length > 0;
      if (!this.firstCall) {
        newElements.forEach(function(notif) {
          this.$q.notify({
            type: "info",
            icon: this.toIcon(notif.type),
            message: notif.title,
            detail: notif.content,
            timeout: 3e3,
            position: "bottom-right"
          });
        }.bind(this));
      }
      this.firstCall = false;
    },
    cancelAutoUpdate: function() {
      clearInterval(this.timer);
    },
    toIcon: function(type) {
      var typeIcon = this.typeIconMap[type];
      return typeIcon ? typeIcon : "mail";
    },
    toDelay: function(creationDate) {
      let diff = Quasar$6.date.getDateDiff(Date.now(), creationDate, "days");
      if (diff > 0)
        return diff + " " + this.$q.lang.vui.notifications.days;
      diff = Quasar$6.date.getDateDiff(Date.now(), creationDate, "hours");
      if (diff > 0)
        return diff + " " + this.$q.lang.vui.notifications.hours;
      diff = Quasar$6.date.getDateDiff(Date.now(), creationDate, "minutes");
      if (diff > 0)
        return diff + " " + this.$q.lang.vui.notifications.minutes;
      diff = Quasar$6.date.getDateDiff(Date.now(), creationDate, "seconds");
      return diff + " " + this.$q.lang.vui.notifications.seconds;
    }
  },
  beforeDestroy: function() {
    clearInterval(this.timer);
  }
};
const _toDisplayString$2 = window["Vue"].toDisplayString;
const _createTextVNode = window["Vue"].createTextVNode;
const _resolveComponent$2 = window["Vue"].resolveComponent;
const _withCtx$2 = window["Vue"].withCtx;
const _openBlock$3 = window["Vue"].openBlock;
const _createBlock$2 = window["Vue"].createBlock;
const _createCommentVNode$1 = window["Vue"].createCommentVNode;
const _renderList = window["Vue"].renderList;
const _Fragment = window["Vue"].Fragment;
const _createElementBlock$2 = window["Vue"].createElementBlock;
const _createVNode$1 = window["Vue"].createVNode;
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_badge = _resolveComponent$2("q-badge");
  const _component_q_icon = _resolveComponent$2("q-icon");
  const _component_q_item_section = _resolveComponent$2("q-item-section");
  const _component_q_item_label = _resolveComponent$2("q-item-label");
  const _component_q_item = _resolveComponent$2("q-item");
  const _component_q_list = _resolveComponent$2("q-list");
  const _component_q_menu = _resolveComponent$2("q-menu");
  const _component_q_btn = _resolveComponent$2("q-btn");
  return _openBlock$3(), _createBlock$2(_component_q_btn, {
    round: "",
    dense: "",
    color: _ctx.hasNew ? "primary" : "white",
    textColor: _ctx.hasNew ? "white" : "primary",
    icon: _ctx.count > 0 ? $props.icon : $props.iconNone,
    class: "on-left"
  }, {
    default: _withCtx$2(() => [
      _ctx.count > 0 ? (_openBlock$3(), _createBlock$2(_component_q_badge, {
        key: 0,
        color: "red",
        "text-color": "white",
        floating: ""
      }, {
        default: _withCtx$2(() => [
          _createTextVNode(_toDisplayString$2(_ctx.count), 1)
        ]),
        _: 1
      })) : _createCommentVNode$1("", true),
      _createVNode$1(_component_q_menu, { class: "notifications" }, {
        default: _withCtx$2(() => [
          _createVNode$1(_component_q_list, { style: { "width": "300px" } }, {
            default: _withCtx$2(() => [
              (_openBlock$3(true), _createElementBlock$2(_Fragment, null, _renderList(_ctx.list, (notif) => {
                return _openBlock$3(), _createBlock$2(_component_q_item, {
                  key: notif.uuid,
                  tag: "a",
                  href: notif.targetUrl
                }, {
                  default: _withCtx$2(() => [
                    _createVNode$1(_component_q_item_section, { avatar: "" }, {
                      default: _withCtx$2(() => [
                        _createVNode$1(_component_q_icon, {
                          name: $options.toIcon(notif.type),
                          size: "2rem"
                        }, null, 8, ["name"])
                      ]),
                      _: 2
                    }, 1024),
                    _createVNode$1(_component_q_item_section, null, {
                      default: _withCtx$2(() => [
                        _createVNode$1(_component_q_item_label, null, {
                          default: _withCtx$2(() => [
                            _createTextVNode(_toDisplayString$2(notif.title), 1)
                          ]),
                          _: 2
                        }, 1024),
                        _createVNode$1(_component_q_item_label, {
                          caption: "",
                          lines: "3"
                        }, {
                          default: _withCtx$2(() => [
                            _createTextVNode(_toDisplayString$2(notif.content), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024),
                    _createVNode$1(_component_q_item_section, {
                      side: "",
                      top: ""
                    }, {
                      default: _withCtx$2(() => [
                        _createVNode$1(_component_q_item_label, { caption: "" }, {
                          default: _withCtx$2(() => [
                            _createTextVNode(_toDisplayString$2($options.toDelay(new Date(notif.creationDate))), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["href"]);
              }), 128))
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["color", "textColor", "icon"]);
}
var VNotifications = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const Quasar$5 = window["Quasar"];
const ol$1 = window["ol"];
const _sfc_main$2 = {
  props: {
    id: { type: String, required: true },
    initialZoomLevel: { type: Number },
    initialCenter: { type: Object }
  },
  emits: ["moveend", "click"],
  methods: {
    onMapLoad: function(found) {
      var vm = this;
      function checkForMap() {
        if (vm.olMap) {
          found(vm.olMap);
          vm.postInit();
        } else {
          setTimeout(checkForMap, 50);
        }
      }
      checkForMap();
    },
    postInit() {
      if (this.$props.initialZoomLevel) {
        this.olMap.getView().setZoom(this.$props.initialZoomLevel);
      }
    }
  },
  mounted: function() {
    var view = new ol$1.View();
    var osmLayer = new ol$1.layer.Tile({
      preload: 4,
      source: new ol$1.source.OSM()
    });
    this.olMap = new ol$1.Map({
      interactions: ol$1.interaction.defaults({
        onFocusOnly: true
      }),
      target: this.$props.id,
      layers: [osmLayer],
      loadTilesWhileAnimating: true,
      view
    });
    if (this.$props.initialCenter) {
      this.olMap.getView().setCenter(ol$1.proj.fromLonLat([this.$props.initialCenter.lon, this.$props.initialCenter.lat]));
    }
    this.olMap.on("moveend", function(e) {
      var mapExtent = e.map.getView().calculateExtent();
      var wgs84Extent = ol$1.proj.transformExtent(mapExtent, "EPSG:3857", "EPSG:4326");
      var topLeft = ol$1.extent.getTopLeft(wgs84Extent);
      var bottomRight = ol$1.extent.getBottomRight(wgs84Extent);
      Quasar$5.debounce(this.$emit("moveend", topLeft, bottomRight), 300);
    }.bind(this));
    setTimeout(function() {
      this.olMap.on("click", function(evt) {
        evt.stopPropagation();
        Quasar$5.debounce(this.$emit("click", ol$1.proj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326")), 300);
      }.bind(this));
    }.bind(this), 300);
  }
};
const _normalizeProps$1 = window["Vue"].normalizeProps;
const _guardReactiveProps$1 = window["Vue"].guardReactiveProps;
const _renderSlot$1 = window["Vue"].renderSlot;
const _openBlock$2 = window["Vue"].openBlock;
const _createElementBlock$1 = window["Vue"].createElementBlock;
const _hoisted_1$2 = ["id"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock$2(), _createElementBlock$1("div", { id: $props.id }, [
    _renderSlot$1(_ctx.$slots, "default", _normalizeProps$1(_guardReactiveProps$1(_ctx.$attrs)))
  ], 8, _hoisted_1$2);
}
var VMap = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const Quasar$4 = window["Quasar"];
const ol = window["ol"];
const _sfc_main$1 = {
  props: {
    id: { type: String, required: true },
    list: { type: Array },
    cluster: { type: Array },
    object: { type: Object },
    baseUrl: { type: String },
    field: { type: String, required: true },
    nameField: { type: String },
    markerColor: { type: String, "default": "#000000" },
    markerFont: { type: String, "default": "Material Icons" },
    markerIcon: { type: String, "default": "place" },
    markerSize: { type: Number, "default": 30 },
    clusterCircleSize: { type: Number, "default": 20 },
    clusterColor: { type: String, "default": "#fff" },
    clusterCircleBorderColor: { type: String, "default": "#000000" },
    clusterTextColor: { type: String, "default": "#000000" },
    clusterTextSize: { type: Number, "default": 12 },
    clusterTextFont: { type: String, "default": "sans-serif" }
  },
  emits: ["moveend", "click"],
  data: function() {
    return {
      popupDisplayed: false,
      objectDisplayed: {},
      items: [],
      clusters: [],
      olMap: {},
      vectorSource: {},
      base32: "0123456789bcdefghjkmnpqrstuvwxyz"
    };
  },
  watch: {
    list: function(newVal) {
      this.$data.items = newVal;
      this.$data.vectorSource.clear();
      this.$data.vectorSource.addFeatures(this.features);
    },
    cluster: function(newVal) {
      this.$data.items = [];
      this.$data.clusters = [];
      for (var i = 0; i < newVal.length; i++) {
        if (newVal[i].totalCount == 1) {
          this.$data.items = this.$data.items.concat(newVal[i].list);
        } else {
          this.$data.clusters.push({
            geoHash: newVal[i].code,
            geoLocation: this.decode(newVal[i].code),
            totalCount: newVal[i].totalCount
          });
        }
      }
      this.$data.vectorSource.clear();
      this.$data.vectorSource.addFeatures(this.features);
    },
    "object.geoLocation": function() {
      this.$data.vectorSource.clear();
      this.$data.vectorSource.addFeatures(this.features);
    }
  },
  computed: {
    features: function() {
      var geoField = this.$props.field;
      var arrayOfFeatures = this.$data.items.filter(function(object) {
        return object[geoField] != null;
      }).map(function(object) {
        var geoObject;
        if (typeof object[geoField] === "string" || object[geoField] instanceof String) {
          geoObject = JSON.parse(object[geoField]);
        } else {
          geoObject = object[geoField];
        }
        if (geoObject != null) {
          var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([geoObject.lon, geoObject.lat]))
          });
          if (this.$props.nameField) {
            iconFeature.set("name", object[this.$props.nameField]);
            iconFeature.set("innerObject", object);
            iconFeature.set("totalCount", object.totalCount);
          }
          return iconFeature;
        }
        return null;
      }.bind(this));
      var arrayOfClusterFeatures = this.$data.clusters.filter(function(object) {
        return object[geoField] != null;
      }).map(function(object) {
        var geoObject;
        if (typeof object[geoField] === "string" || object[geoField] instanceof String) {
          geoObject = JSON.parse(object[geoField]);
        } else {
          geoObject = object[geoField];
        }
        if (geoObject != null) {
          var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([geoObject.lon, geoObject.lat]))
          });
          if (this.$props.nameField) {
            iconFeature.set("name", object[this.$props.nameField]);
            iconFeature.set("innerObject", object);
            iconFeature.set("totalCount", object.totalCount);
          }
          return iconFeature;
        }
        return null;
      }.bind(this));
      return arrayOfFeatures.concat(arrayOfClusterFeatures);
    }
  },
  methods: {
    fetchList: function(topLeft, bottomRight) {
      this.$http.get(this.baseUrl + '_geoSearch?topLeft="' + topLeft.lat + "," + topLeft.lon + '"&bottomRight="' + bottomRight.lat + "," + bottomRight.lon + '"', { timeout: 5 * 1e3 }).then(function(response) {
        this.$data.items = response.data;
        this.$data.vectorSource.clear();
        this.$data.vectorSource.addFeatures(this.features);
      }.bind(this));
    },
    decode: function(geohash) {
      const bounds = this.bounds(geohash);
      const latMin = bounds.sw.lat, lonMin = bounds.sw.lon;
      const latMax = bounds.ne.lat, lonMax = bounds.ne.lon;
      let lat = (latMin + latMax) / 2;
      let lon = (lonMin + lonMax) / 2;
      lat = lat.toFixed(Math.floor(2 - Math.log(latMax - latMin) / Math.LN10));
      lon = lon.toFixed(Math.floor(2 - Math.log(lonMax - lonMin) / Math.LN10));
      return { lat: Number(lat), lon: Number(lon) };
    },
    bounds: function(geohash) {
      if (geohash.length == 0)
        throw new Error("Invalid geohash");
      geohash = geohash.toLowerCase();
      let evenBit = true;
      let latMin = -90, latMax = 90;
      let lonMin = -180, lonMax = 180;
      for (let i = 0; i < geohash.length; i++) {
        const chr = geohash.charAt(i);
        const idx = this.$data.base32.indexOf(chr);
        if (idx == -1)
          throw new Error("Invalid geohash");
        for (let n = 4; n >= 0; n--) {
          const bitN = idx >> n & 1;
          if (evenBit) {
            const lonMid = (lonMin + lonMax) / 2;
            if (bitN == 1) {
              lonMin = lonMid;
            } else {
              lonMax = lonMid;
            }
          } else {
            const latMid = (latMin + latMax) / 2;
            if (bitN == 1) {
              latMin = latMid;
            } else {
              latMax = latMid;
            }
          }
          evenBit = !evenBit;
        }
      }
      const bounds = {
        sw: { lat: latMin, lon: lonMin },
        ne: { lat: latMax, lon: lonMax }
      };
      return bounds;
    }
  },
  mounted: function() {
    this.$parent.onMapLoad(function(olMap) {
      this.$data.olMap = olMap;
      this.$data.items = [];
      this.$data.clusters = [];
      if (this.$props.list) {
        this.$data.items = this.$props.list;
      } else if (this.$props.cluster) {
        for (var i = 0; i < this.$props.cluster.length; i++) {
          if (this.$props.cluster[i].totalCount == 1) {
            this.$data.items = this.$data.items.concat(this.$props.cluster[i].list);
          } else {
            this.$data.clusters.push({
              geoHash: this.$props.cluster[i].code,
              geoLocation: this.decode(this.$props.cluster[i].code),
              totalCount: this.$props.cluster[i].totalCount
            });
          }
        }
      } else if (this.$props.object) {
        this.$data.items = [this.$props.object];
      }
      this.$data.vectorSource = new ol.source.Vector({
        features: this.features
      });
      var clusterSource = new ol.source.Cluster({
        source: this.$data.vectorSource,
        distance: 2 * this.$props.clusterCircleSize
      });
      var clusterLayer = new ol.layer.Vector({
        source: clusterSource
      });
      var styleIcon = new ol.style.Style({
        text: new ol.style.Text({
          font: this.$props.markerSize + "px " + this.$props.markerFont,
          text: this.$props.markerIcon,
          fill: new ol.style.Fill({ color: this.$props.markerColor }),
          offsetY: 0
        })
      });
      var styleCache = {};
      clusterLayer.setStyle(function(feature) {
        var size = 0;
        var agregateFeatures = feature.get("features");
        for (var i2 = 0; i2 < agregateFeatures.length; i2++) {
          var fSize = agregateFeatures[i2].get("totalCount");
          size += !fSize ? 1 : fSize;
        }
        if (!size || size == 1) {
          return styleIcon;
        } else {
          var style = styleCache[size];
          if (!style) {
            style = new ol.style.Style({
              image: new ol.style.Circle({
                radius: this.$props.clusterCircleSize,
                stroke: new ol.style.Stroke({
                  color: this.$props.clusterCircleBorderColor
                }),
                fill: new ol.style.Fill({
                  color: this.$props.clusterColor
                })
              }),
              text: new ol.style.Text({
                text: size.toString(),
                font: this.$props.clusterTextSize + "px " + this.$props.clusterTextFont,
                fill: new ol.style.Fill({
                  color: this.$props.clusterTextColor
                })
              })
            });
            styleCache[size] = style;
          }
          return style;
        }
      }.bind(this));
      this.olMap.addLayer(clusterLayer);
      if (this.features.length > 0) {
        this.olMap.getView().fit(clusterLayer.getSource().getSource().getExtent(), this.olMap.getSize());
      }
      this.olMap.on("moveend", function(e) {
        var mapExtent = e.map.getView().calculateExtent();
        var wgs84Extent = ol.proj.transformExtent(mapExtent, "EPSG:3857", "EPSG:4326");
        var topLeft = ol.extent.getTopLeft(wgs84Extent);
        var bottomRight = ol.extent.getBottomRight(wgs84Extent);
        if (this.baseUrl) {
          Quasar$4.debounce(this.fetchList({ lat: topLeft[0], lon: topLeft[1] }, { lat: bottomRight[0], lon: bottomRight[1] }), 300);
        }
        Quasar$4.debounce(this.$emit("moveend", topLeft, bottomRight), 300);
      }.bind(this));
      if (this.$props.nameField) {
        var popup = new ol.Overlay({
          element: this.$el.querySelector("#" + this.$props.id + "Popup"),
          positioning: "bottom-center",
          stopEvent: false,
          offset: [0, -20]
        });
        this.olMap.addOverlay(popup);
        this.olMap.on("click", function(evt) {
          var feature = this.olMap.forEachFeatureAtPixel(evt.pixel, function(feature2) {
            return feature2;
          });
          if (feature && feature.get("features").length == 1) {
            var coordinates = feature.getGeometry().getCoordinates();
            popup.setPosition(coordinates);
            this.$data.popupDisplayed = true;
            this.$data.objectDisplayed = feature.get("features")[0].get("innerObject");
            evt.stopPropagation();
            Quasar$4.debounce(this.$emit("click", ol.proj.transform(coordinates, "EPSG:3857", "EPSG:4326")), 300);
          } else {
            this.$data.popupDisplayed = false;
          }
        }.bind(this));
        this.olMap.on("pointermove", function(e) {
          if (e.dragging) {
            this.$data.popupDisplayed = false;
            return;
          }
          var pixel = this.olMap.getEventPixel(e.originalEvent);
          var hit = this.olMap.hasFeatureAtPixel(pixel);
          this.olMap.getTargetElement().style.cursor = hit ? "pointer" : "";
        }.bind(this));
      } else {
        this.olMap.on("click", function(evt) {
          var feature = this.olMap.forEachFeatureAtPixel(evt.pixel, function(feature2) {
            return feature2;
          });
          if (feature && feature.get("features").length == 1) {
            var coordinates = feature.getGeometry().getCoordinates();
            evt.stopPropagation();
            Quasar$4.debounce(this.$emit("click", ol.proj.transform(coordinates, "EPSG:3857", "EPSG:4326")), 300);
          }
        }.bind(this));
      }
    }.bind(this));
  }
};
const _renderSlot = window["Vue"].renderSlot;
const _toDisplayString$1 = window["Vue"].toDisplayString;
const _createElementVNode$1 = window["Vue"].createElementVNode;
const _resolveComponent$1 = window["Vue"].resolveComponent;
const _withCtx$1 = window["Vue"].withCtx;
const _openBlock$1 = window["Vue"].openBlock;
const _createBlock$1 = window["Vue"].createBlock;
const _createCommentVNode = window["Vue"].createCommentVNode;
const _createElementBlock = window["Vue"].createElementBlock;
const _hoisted_1$1 = ["id"];
const _hoisted_2 = ["id"];
const _hoisted_3 = { class: "text-subtitle2" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_card = _resolveComponent$1("q-card");
  return _openBlock$1(), _createElementBlock("div", { id: $props.id }, [
    _createElementVNode$1("div", {
      id: $props.id + "Popup"
    }, [
      _ctx.popupDisplayed ? (_openBlock$1(), _createBlock$1(_component_q_card, {
        key: 0,
        class: "q-px-md"
      }, {
        default: _withCtx$1(() => [
          _renderSlot(_ctx.$slots, "card", { objectDisplayed: _ctx.objectDisplayed }, () => [
            _createElementVNode$1("div", _hoisted_3, _toDisplayString$1(_ctx.objectDisplayed[$props.nameField]), 1)
          ])
        ]),
        _: 3
      })) : _createCommentVNode("", true)
    ], 8, _hoisted_2)
  ], 8, _hoisted_1$1);
}
var VMapLayer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const Quasar$3 = window["Quasar"];
const _sfc_main = {
  props: {
    modelValue: { type: String, required: true },
    list: { type: Array, required: true },
    keyField: { type: String, required: true },
    labelField: { type: String, required: true },
    parentKeyField: { type: String, required: true },
    subTreeKey: { type: String, required: false }
  },
  emits: ["update:modelValue"],
  data: function() {
    return {
      selectedNode: this.$props.modelValue,
      expandedNodes: [this.$props.modelValue]
    };
  },
  watch: {
    modelValue: function(newVal) {
      this.$data.selectedNode = newVal;
    }
  },
  methods: {
    handleSelected: function(target) {
      this.$emit("update:modelValue", this.$data.selectedNode);
      if (target) {
        this.$refs.menu.hide();
      }
    },
    handleExpanded: function() {
      Quasar$3.debounce(this.$refs.menu.updatePosition, 500)();
    },
    getSelectedLabel: function() {
      if (this.$data.selectedNode) {
        let node = this.$props.list.find(function(rse) {
          return rse[this.$props.keyField] === this.$data.selectedNode;
        }.bind(this));
        return node[this.$props.labelField];
      }
      return null;
    },
    convertListToTree: function(list, subTreeKey) {
      var map = {}, node, roots = [], i;
      for (i = 0; i < list.length; i += 1) {
        map[list[i][this.$props.keyField]] = i;
        list[i].children = [];
      }
      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node[this.$props.parentKeyField]) {
          list[map[node[this.$props.parentKeyField]]].children.push(node);
        } else {
          roots.push(node);
        }
      }
      if (subTreeKey) {
        return [list[map[subTreeKey]]];
      }
      return roots;
    }
  }
};
const _resolveComponent = window["Vue"].resolveComponent;
const _createVNode = window["Vue"].createVNode;
const _toDisplayString = window["Vue"].toDisplayString;
const _createElementVNode = window["Vue"].createElementVNode;
const _withCtx = window["Vue"].withCtx;
const _normalizeProps = window["Vue"].normalizeProps;
const _guardReactiveProps = window["Vue"].guardReactiveProps;
const _openBlock = window["Vue"].openBlock;
const _createBlock = window["Vue"].createBlock;
const _hoisted_1 = {
  class: "self-center full-width no-outline",
  tabindex: "0"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_icon = _resolveComponent("q-icon");
  const _component_q_tree = _resolveComponent("q-tree");
  const _component_q_menu = _resolveComponent("q-menu");
  const _component_q_field = _resolveComponent("q-field");
  return _openBlock(), _createBlock(_component_q_field, _normalizeProps(_guardReactiveProps(_ctx.$attrs)), {
    append: _withCtx(() => [
      _createVNode(_component_q_icon, { name: "arrow_drop_down" })
    ]),
    control: _withCtx(() => [
      _createElementVNode("div", _hoisted_1, _toDisplayString($options.getSelectedLabel()), 1)
    ]),
    default: _withCtx(() => [
      _createVNode(_component_q_menu, {
        breakpoint: 600,
        fit: "",
        ref: "menu"
      }, {
        default: _withCtx(() => [
          _createVNode(_component_q_tree, {
            nodes: $options.convertListToTree(_ctx.$props.list, _ctx.$props.subTreeKey),
            "node-key": _ctx.$props.keyField,
            "label-key": _ctx.$props.labelField,
            expanded: _ctx.expandedNodes,
            "onUpdate:expanded": [
              _cache[0] || (_cache[0] = ($event) => _ctx.expandedNodes = $event),
              $options.handleExpanded
            ],
            selected: _ctx.selectedNode,
            "onUpdate:selected": [
              _cache[1] || (_cache[1] = ($event) => _ctx.selectedNode = $event),
              $options.handleSelected
            ]
          }, null, 8, ["nodes", "node-key", "label-key", "expanded", "onUpdate:expanded", "selected", "onUpdate:selected"])
        ]),
        _: 1
      }, 512)
    ]),
    _: 1
  }, 16);
}
var VTree = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const Vue$1 = window["Vue"];
const Quasar$2 = window["Quasar"];
var VMinify = {
  created: function(elMaxi, binding) {
    const topOffset = binding.value.topOffset;
    const topOffsetElSelector = binding.value.topOffsetEl;
    const leftOffset = binding.value.leftOffset;
    const leftOffsetElSelector = binding.value.leftOffsetEl;
    const elMini = elMaxi.querySelector(".mini");
    for (var i = 0; i < elMaxi.childNodes.length; i++) {
      var elChild = elMaxi.childNodes[i];
      if (elChild.classList && !elChild.classList.contains("mini")) {
        elChild.classList.add("not-mini");
      }
    }
    Vue$1.minifyHandler = function() {
      var currentTopOffset = Vue$1.minifyComputeOffset(topOffset, topOffsetElSelector, 0, "TOP");
      var currentLeftOffset = Vue$1.minifyComputeOffset(leftOffset, leftOffsetElSelector, 0, "LEFT");
      var elMiniHeight = elMini.getBoundingClientRect().height - currentTopOffset;
      var elMaxiHeight = elMaxi.getBoundingClientRect().height;
      if (window.pageYOffset > elMaxiHeight - elMiniHeight) {
        elMini.classList.add("visible");
        elMini.style.top = 0;
        elMini.style.paddingTop = currentTopOffset + "px";
        elMini.style.paddingLeft = currentLeftOffset + "px";
      } else {
        elMini.classList.remove("visible");
        elMini.style.top = -elMiniHeight - currentTopOffset + "px";
      }
    };
    Vue$1.minifyComputeOffset = function(offset, offsetElSelector, defaultOffset, direction) {
      var currentOffset = defaultOffset;
      if (offset) {
        currentOffset = offset;
      } else if (offsetElSelector) {
        var offsetElement = document.querySelector(offsetElSelector);
        if (direction === "LEFT") {
          currentOffset = offsetElement.getBoundingClientRect().width + offsetElement.getBoundingClientRect().x;
        } else if (direction === "TOP") {
          currentOffset = offsetElement.getBoundingClientRect().height + offsetElement.getBoundingClientRect().y;
        }
      }
      return currentOffset;
    };
    window.addEventListener("scroll", Vue$1.minifyHandler);
    window.addEventListener("resize", Quasar$2.throttle(Vue$1.minifyHandler, 50));
  },
  updated: function() {
    const interval = 50;
    const maxDelay = 1e3;
    for (var delay = interval; delay < maxDelay; delay += delay) {
      setTimeout(Vue$1.minifyHandler, delay);
    }
  },
  unmounted: function(elMaxi) {
    window.removeEventListener("scroll");
    window.removeEventListener("resize");
    for (var i = 0; i < elMaxi.childNodes.length; i++) {
      var elChild = elMaxi.childNodes[i];
      if (elChild.classList) {
        elChild.classList.remove("not-mini");
      }
    }
  }
};
const Vue = window["Vue"];
const Quasar$1 = window["Quasar"];
var VScrollSpy = {
  created: function(elNav, args) {
    const debugMode = args.value.debug ? args.value.debug : false;
    const offset = args.value.offset ? args.value.offset : 0;
    const padding = args.value.padding ? args.value.padding : 24;
    const scanner = args.value.scanner ? args.value.scanner : offset + 30;
    const elAs = elNav.querySelectorAll("a");
    elAs[0].classList.add("active");
    const scrollContainer = Quasar$1.scroll.getScrollTarget(document.querySelector(elAs[0].hash));
    let scannerLine1;
    if (debugMode) {
      scannerLine1 = document.createElement("HR");
      scannerLine1.style.position = "absolute";
      scannerLine1.style.top = scanner + "px";
      scannerLine1.style.border = "none";
      scannerLine1.style.borderTop = "red solid 1px";
      scannerLine1.style.width = "100%";
      scannerLine1.style.zIndex = "10000";
      document.querySelector("body").appendChild(scannerLine1);
    }
    Vue.scrollSpyHandler = function() {
      if (window.pageYOffset > offset) {
        elNav.style.top = offset + padding + "px";
        elNav.style.width = elNav.parentElement.getBoundingClientRect().width + "px";
        elNav.classList.add("fixed");
      } else {
        elNav.classList.remove("fixed");
        elNav.style.top = null;
        elNav.style.width = null;
      }
      var scrollPosition = Quasar$1.scroll.getVerticalScrollPosition(scrollContainer);
      var scrollBreakpoints = Vue.computeBreakPoints(scrollPosition);
      for (var i2 = 0; i2 < elAs.length; i2++) {
        if (scrollBreakpoints[i2] <= scrollPosition && (i2 >= elAs.length - 1 || scrollPosition < scrollBreakpoints[i2 + 1])) {
          elAs[i2].classList.add("active");
        } else {
          elAs[i2].classList.remove("active");
        }
      }
    };
    Vue.scrollTo = function(event) {
      event.preventDefault();
      const elScrollId = event.target.hash;
      const elScroll = document.querySelector(elScrollId);
      var toScroll = Quasar$1.scroll.getVerticalScrollPosition(scrollContainer) + elScroll.getBoundingClientRect().top - scanner;
      var scrollPosition = Quasar$1.scroll.getVerticalScrollPosition(scrollContainer);
      var scrollBreakpoints = Vue.computeBreakPoints(scrollPosition);
      for (var i2 = 0; i2 < elAs.length; i2++) {
        if (elAs[i2].hash == elScrollId) {
          toScroll = scrollBreakpoints[i2];
          break;
        }
      }
      var duration = 200;
      Quasar$1.scroll.setVerticalScrollPosition(scrollContainer, toScroll, duration);
    };
    Vue.computeBreakPoints = function(scrollPosition) {
      var blockHeight = [];
      for (let i2 = 0; i2 < elAs.length; i2++) {
        const elScrollId = elAs[i2].hash;
        const elScroll = document.querySelector(elScrollId);
        if (elScroll) {
          blockHeight.push(scrollPosition + elScroll.getBoundingClientRect().top);
        }
      }
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollHeight = Quasar$1.scroll.getScrollHeight(scrollContainer);
      const scrollMax = scrollHeight - windowHeight;
      const scrollStart = scrollMax - windowHeight + scanner;
      const blockHeightDelta = blockHeight[blockHeight.length - 1] - scanner - scrollStart;
      const scrollDelta = windowHeight - scanner;
      var scrollBreakpoints = [];
      scrollBreakpoints.push(0);
      for (let i2 = 1; i2 < elAs.length; i2++) {
        if (blockHeight[i2] > scrollStart) {
          const blockScanFromStart = blockHeight[i2] - scrollStart - scanner;
          scrollBreakpoints[i2] = scrollStart + blockScanFromStart / blockHeightDelta * scrollDelta;
        } else {
          scrollBreakpoints[i2] = blockHeight[i2] - scanner;
        }
        scrollBreakpoints[i2] = Math.round(scrollBreakpoints[i2]);
      }
      if (debugMode) {
        scannerLine1.style.top = scrollBreakpoints[scrollBreakpoints.length - 1] + "px";
      }
      return scrollBreakpoints;
    };
    elNav.classList.add("scroll-spy-nav");
    for (var i = 0; i < elAs.length; i++) {
      elAs[i].addEventListener("click", Vue.scrollTo);
    }
    window.addEventListener("scroll", Vue.scrollSpyHandler);
    window.addEventListener("resize", Quasar$1.throttle(Vue.scrollSpyHandler, 50));
  },
  unmounted: function(elNav) {
    elNav.classList.remove("scroll-spy-nav");
    window.removeEventListener("scroll");
    window.removeEventListener("resize");
    const elAs = elNav.querySelectorAll("a");
    for (var i = 0; i < elAs.length; i++) {
      elAs.removeEventListener("click");
    }
  }
};
function sortDate(a, b) {
  return new Date(a) - new Date(b);
}
function isDate(v) {
  return Object.prototype.toString.call(v) === "[object Date]";
}
function isNumber(v) {
  return typeof v === "number" && isFinite(v);
}
const Quasar = window["Quasar"];
var VMethods = {
  onAjaxError: function(response) {
    let notif = {
      type: "negative",
      message: "Network Error.",
      multiLine: true,
      icon: "warning",
      timeout: 2500
    };
    if (Object.prototype.hasOwnProperty.call(response, "message")) {
      notif.message = response.message;
    }
    if (response.status === 401) {
      notif.message = "UnAuthorized, you may login with an authorized account";
      this.$root.$emit("logout");
    } else if (response.status === 403) {
      notif.message = "Forbidden, your havn&quote;t enought rights";
    } else if (response.status === 404) {
      notif.message = "API Route is Missing or Undefined";
    } else if (response.status === 405) {
      notif.message = "API Route Method Not Allowed";
    } else if (response.status === 422) {
      notif.message = "";
      Object.keys(response.data).forEach(function(key) {
        this.$data.uiMessageStack[key] = response.data[key];
      }.bind(this));
    } else if (response.status >= 500) {
      notif.message = "Server Error";
    }
    if (response.statusText) {
      notif.message = response.statusText;
    }
    if (Object.prototype.hasOwnProperty.call(response, "data")) {
      if (Object.prototype.hasOwnProperty.call(response.data, "message") && response.data.message && response.data.message.length > 0) {
        notif.message = response.data.message;
      } else if (Object.prototype.hasOwnProperty.call(response.data, "globalErrors") && response.data.globalErrors && response.data.globalErrors.length > 0) {
        notif.message = response.data.globalErrors.join("<br/>\n ");
      }
    }
    if (notif.message.length > 0) {
      this.$q.notify(notif);
    }
  },
  getSafeValue: function(objectkey, fieldKey, subFieldKey) {
    if (this.$data.vueData[objectkey] && this.$data.vueData[objectkey][fieldKey]) {
      return this.$data.vueData[objectkey][fieldKey][subFieldKey];
    }
    return null;
  },
  transformListForSelection: function(list, valueField, labelField) {
    return this.$data.vueData[list].map(function(object) {
      return { value: object[valueField], label: object[labelField].toString() };
    });
  },
  paginationAndSortHandler: function(params) {
    var pagination = params.pagination;
    let componentStates = this.$data.componentStates;
    let vueData = this.$data.vueData;
    var oldPagination = componentStates[pagination.componentId].pagination;
    if (oldPagination.sortBy != pagination.sortBy || oldPagination.descending != pagination.descending) {
      if (pagination.sortBy) {
        if (pagination.sortUrl) {
          pagination.page = 1;
          this.$http.post(pagination.sortUrl, this.objectToFormData({ sortFieldName: pagination.sortBy, sortDesc: pagination.descending, CTX: this.$data.vueData.CTX })).then(function(response) {
            vueData[pagination.listKey] = response.data.model[pagination.listKey];
            this.$data.vueData.CTX = response.data.model["CTX"];
          }.bind(this));
        } else {
          this.$refs[pagination.componentId].sortMethod.apply(this.$refs[pagination.componentId], [vueData[pagination.listKey], pagination.sortBy, pagination.descending]);
        }
      }
    }
    componentStates[pagination.componentId].pagination = pagination;
  },
  paginatedData: function(list, componentId) {
    let componentStates = this.$data.componentStates;
    var pagination = componentStates[componentId].pagination;
    if (pagination.rowsPerPage != 0) {
      var firstRowIndex = (pagination.page - 1) * pagination.rowsPerPage;
      var lastRowIndex = pagination.page * pagination.rowsPerPage;
      return this.$data.vueData[list].slice(firstRowIndex, lastRowIndex);
    }
    return this.$data.vueData[list];
  },
  sortCiAi: function(data, sortBy, descending) {
    const col = this.colList.find((def) => def.name === sortBy);
    if (col === void 0 || col.field === void 0) {
      return data;
    }
    const dir = descending === true ? -1 : 1, val = typeof col.field === "function" ? (v) => col.field(v) : (v) => v[col.field];
    const collator = new Intl.Collator();
    return data.sort((a, b) => {
      let A = val(a), B = val(b);
      if (A === null || A === void 0) {
        return -1 * dir;
      }
      if (B === null || B === void 0) {
        return 1 * dir;
      }
      if (col.sort !== void 0) {
        return col.sort(A, B, a, b) * dir;
      }
      if (isNumber(A) === true && isNumber(B) === true) {
        return (A - B) * dir;
      }
      if (isDate(A) === true && isDate(B) === true) {
        return sortDate(A, B) * dir;
      }
      if (typeof A === "boolean" && typeof B === "boolean") {
        return (A - B) * dir;
      }
      [A, B] = [A, B].map((s) => (s + "").toLocaleString());
      return collator.compare(A, B) * dir;
    });
  },
  selectedFunction: function(object, field, item) {
    this.$data.vueData[object][field] = item.value;
  },
  searchAutocomplete: function(list, valueField, labelField, componentId, url, terms, update, abort) {
    if (terms.length < 2) {
      abort();
      return;
    }
    this.$http.post(url, this.objectToFormData({ terms, list, valueField, labelField, CTX: this.$data.vueData.CTX })).then(function(response) {
      var finalList = response.data.map(function(object) {
        return { value: object[valueField], label: object[labelField].toString() };
      });
      update(function() {
        this.$data.componentStates[componentId].options = finalList;
      }.bind(this));
    }.bind(this)).catch(function(error) {
      this.$q.notify(error.response.status + ":" + error.response.statusText);
      update([]);
    });
  },
  loadAutocompleteById: function(list, valueField, labelField, componentId, url, objectName, fieldName) {
    if (!this.$data.vueData[objectName][fieldName] || this.$data.componentStates[componentId].options.filter(function(option) {
      return option.value === this.$data.vueData[objectName][fieldName];
    }.bind(this)).length > 0) {
      return;
    }
    this.$data.componentStates[componentId].loading = true;
    this.$data.componentStates[componentId].options.push({ "value": this.$data.vueData[objectName][fieldName], "label": "" });
    this.$http.post(url, this.objectToFormData({ value: this.$data.vueData[objectName][fieldName], list, valueField, labelField, CTX: this.$data.vueData.CTX })).then(function(response) {
      var finalList = response.data.map(function(object) {
        return { value: object[valueField], label: object[labelField].toString() };
      });
      this.$data.componentStates[componentId].options.pop();
      this.$data.componentStates[componentId].options = this.$data.componentStates[componentId].options.concat(finalList);
    }.bind(this)).catch(function(error) {
      this.$data.componentStates[componentId].options.pop();
      this.$q.notify(error.response.status + ":" + error.response.statusText);
    }.bind(this)).then(function() {
      this.$data.componentStates[componentId].loading = false;
    }.bind(this));
  },
  decodeDate: function(value, format) {
    if (value === Quasar.date.formatDate(Quasar.date.extractDate(value, "DD/MM/YYYY"), "DD/MM/YYYY")) {
      return Quasar.date.formatDate(Quasar.date.extractDate(value, "DD/MM/YYYY"), format);
    } else {
      return value;
    }
  },
  encodeDate: function(newValue, format) {
    if (newValue === Quasar.date.formatDate(Quasar.date.extractDate(newValue, format), format)) {
      return Quasar.date.formatDate(Quasar.date.extractDate(newValue, format), "DD/MM/YYYY");
    } else {
      return newValue;
    }
  },
  decodeDatetime: function(value, format) {
    if (value === Quasar.date.formatDate(Quasar.date.extractDate(value, "DD/MM/YYYY HH:mm"), "DD/MM/YYYY HH:mm")) {
      return Quasar.date.formatDate(Quasar.date.extractDate(value, "DD/MM/YYYY HH:mm"), format);
    } else {
      return value;
    }
  },
  encodeDatetime: function(newValue, format) {
    if (newValue === Quasar.date.formatDate(Quasar.date.extractDate(newValue, format), format)) {
      return Quasar.date.formatDate(Quasar.date.extractDate(newValue, format), "DD/MM/YYYY HH:mm");
    } else {
      return newValue;
    }
  },
  sortDatesAsString: function(format) {
    return function(date1, date2) {
      return Quasar.date.extractDate(date1, format).getTime() > Quasar.date.extractDate(date2, format).getTime() ? 1 : -1;
    };
  },
  goTo: function(url) {
    window.location = url;
  },
  openModal: function(modalId, url, params) {
    if (url) {
      var finalUrl = url;
      if (params && Object.keys(params).length > 0) {
        var paramsString = Object.keys(params).map(function(key) {
          return key + "=" + params[key];
        }).join("&");
        finalUrl = finalUrl + "?" + paramsString;
      }
      this.$data.componentStates[modalId].srcUrl = finalUrl;
    }
    this.$data.componentStates[modalId].opened = true;
  },
  toogleFacet: function(facetCode, facetValueCode, contextKey) {
    let vueData = this.$data.vueData;
    var multiple = false;
    vueData[contextKey + "_facets"].forEach(function(facet) {
      if (facet.code === facetCode) {
        multiple = facet.multiple;
      }
    });
    var selectedFacetValues = vueData[contextKey + "_selectedFacets"][facetCode];
    if (selectedFacetValues) {
      if (selectedFacetValues.includes(facetValueCode)) {
        if (multiple) {
          selectedFacetValues.splice(selectedFacetValues.indexOf(facetValueCode), 1);
        } else {
          selectedFacetValues.splice(0);
        }
      } else {
        selectedFacetValues.push(facetValueCode);
      }
    } else {
      vueData[contextKey + "_selectedFacets"][facetCode] = [facetValueCode];
    }
    this.search(contextKey);
  },
  search: Quasar.debounce(function(contextKey) {
    let componentStates = this.$data.componentStates;
    let vueData = this.$data.vueData;
    var selectedFacetsContextKey = contextKey + "_selectedFacets";
    var criteriaContextKey = vueData[contextKey + "_criteriaContextKey"];
    var params = this.vueDataParams([criteriaContextKey]);
    params.append(selectedFacetsContextKey, JSON.stringify(vueData[selectedFacetsContextKey]));
    var searchUrl = componentStates[contextKey + "Search"].searchUrl;
    var collectionComponentId = componentStates[contextKey + "Search"].collectionComponentId;
    if (componentStates[collectionComponentId].pagination && componentStates[collectionComponentId].pagination.sortBy) {
      var collectionPagination = componentStates[collectionComponentId].pagination;
      params.append("sortFieldName", collectionPagination.sortBy);
      params.append("sortDesc", collectionPagination.descending);
    }
    this.httpPostAjax(searchUrl, params, {
      onSuccess: function(response) {
        if (componentStates[collectionComponentId].pagination) {
          var collectionPagination2 = componentStates[collectionComponentId].pagination;
          collectionPagination2.page = 1;
          collectionPagination2.rowsNumber = response.data.model[contextKey + "_list"].length;
        }
      }
    });
  }, 400),
  showMore: function(componentId) {
    let componentStates = this.$data.componentStates;
    var showMoreCount = componentStates[componentId].pagination.showMoreCount;
    if (showMoreCount)
      ;
    else {
      showMoreCount = 1;
      componentStates[componentId].pagination.showMoreCount = showMoreCount;
    }
    componentStates[componentId].pagination.rowsPerPage = componentStates[componentId].pagination.rowsPerPage / showMoreCount * (showMoreCount + 1);
  },
  vueDataToArray(value) {
    if (Array.isArray(value)) {
      return value;
    } else if (value) {
      return [value];
    }
    return [];
  },
  obtainVueDataAccessor(referer, object, field, rowIndex) {
    if (field != null && field != "null") {
      if (rowIndex != null) {
        return {
          get: function() {
            return referer.$data.vueData[object][rowIndex][field];
          },
          set: function(newData) {
            referer.$data.vueData[object][rowIndex][field] = newData;
          }
        };
      } else {
        return {
          get: function() {
            return referer.$data.vueData[object][field];
          },
          set: function(newData) {
            referer.$data.vueData[object][field] = newData;
          }
        };
      }
    } else {
      return {
        get: function() {
          return referer.$data.vueData[object];
        },
        set: function(newData) {
          referer.$data.vueData[object] = newData;
        }
      };
    }
  },
  uploader_changeIcon() {
    this.$q.iconSet.uploader.removeUploaded = "delete_sweep";
    this.$q.iconSet.uploader.done = "delete";
  },
  uploader_mounted(componentId, object, field, rowIndex) {
    this.uploader_changeIcon();
    var component = this.$refs[componentId];
    component.vueDataAccessor = this.obtainVueDataAccessor(this, object, field, rowIndex);
    var vueDataAccessor = component.vueDataAccessor;
    var curValue = vueDataAccessor.get();
    if (!Array.isArray(curValue)) {
      vueDataAccessor.set(this.vueDataToArray(curValue));
    }
    vueDataAccessor.set(vueDataAccessor.get().filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    }));
    vueDataAccessor.get().forEach(function(uri) {
      var xhrParams = {};
      xhrParams[component.fieldName] = uri;
      this.$http.get(component.url, { params: xhrParams, credentials: component.withCredentials }).then(function(response) {
        var fileData = response.data;
        if (component.files.some((file) => file.name === fileData.name)) {
          console.warn("Component doesn't support duplicate file ", fileData);
        } else {
          fileData.__sizeLabel = Quasar.format.humanStorageSize(fileData.size);
          fileData.__progressLabel = "100%";
          component.files.push(fileData);
          component.uploadedFiles.push(fileData);
          this.uploader_forceComputeUploadedSize(componentId);
        }
      }.bind(this)).catch(function(error) {
        if (error.response) {
          this.$q.notify(error.response.status + ":" + error.response.statusText + " Can't load file " + uri);
        } else {
          this.$q.notify(error + " Can't load file " + uri);
        }
      }.bind(this));
    }.bind(this));
  },
  uploader_dragenter(componentId) {
    let componentStates = this.$data.componentStates;
    componentStates[componentId].dragover = true;
  },
  uploader_dragleave(componentId) {
    let componentStates = this.$data.componentStates;
    componentStates[componentId].dragover = false;
  },
  uploader_drop(event, componentId) {
    var component = this.$refs[componentId];
    component.addFiles(event.dataTransfer.files);
  },
  uploader_forceComputeUploadedSize: function(componentId) {
    var component = this.$refs[componentId];
    component.uploadedSize = 0;
    component.uploadedFiles.forEach(function(file) {
      component.uploadedSize += file.size;
    });
    component.uploadSize = component.uploadedSize;
    component.queuedFiles.forEach(function(file) {
      component.uploadSize += file.size;
    });
  },
  uploader_humanStorageSize: function(size) {
    return Quasar.format.humanStorageSize(size);
  },
  uploader_addedFile: function(isMultiple, componentId) {
    if (!isMultiple) {
      var component = this.$refs[componentId];
      var vueDataAccessor = component.vueDataAccessor;
      component.removeUploadedFiles();
      vueDataAccessor.set([]);
    }
  },
  uploader_uploadedFiles: function(uploadInfo, componentId) {
    var component = this.$refs[componentId];
    var vueDataAccessor = component.vueDataAccessor;
    uploadInfo.files.forEach(function(file) {
      file.fileUri = file.xhr.response;
      vueDataAccessor.get().push(file.fileUri);
    }.bind(this));
  },
  uploader_failedFiles: function(uploadInfo) {
    uploadInfo.files.forEach(function(file) {
      this.onAjaxError({
        status: file.xhr.status,
        statusText: file.xhr.statusText,
        data: JSON.parse(file.xhr.response)
      });
    }.bind(this));
  },
  uploader_removeFiles: function(removedFiles, componentId) {
    var component = this.$refs[componentId];
    var vueDataAccessor = component.vueDataAccessor;
    var dataFileUris = vueDataAccessor.get();
    removedFiles.forEach(function(removedFile) {
      if (removedFile.fileUri) {
        var indexOfFileUri = dataFileUris.indexOf(removedFile.fileUri);
        var xhrParams = {};
        xhrParams[component.fieldName] = removedFile.fileUri;
        this.$http.delete(component.url, { params: xhrParams, credentials: component.withCredentials }).then(function() {
          if (component.multiple) {
            dataFileUris.splice(indexOfFileUri, 1);
          } else {
            dataFileUris.splice(0);
          }
          this.uploader_forceComputeUploadedSize(componentId);
        }.bind(this)).catch(function(error) {
          this.$q.notify(error.response.status + ":" + error.response.statusText + " Can't remove temporary file");
        }.bind(this));
      }
    }.bind(this));
  },
  httpPostAjax: function(url, paramsIn, options) {
    let vueData = this.$data.vueData;
    let uiMessageStack = this.$data.uiMessageStack;
    let params = this.isFormData(paramsIn) ? paramsIn : this.objectToFormData(paramsIn);
    params.append("CTX", vueData.CTX);
    this.$http.post(url, params).then(function(response) {
      if (response.data.model.CTX) {
        vueData.CTX = response.data.model.CTX;
      }
      Object.keys(response.data.model).forEach(function(key) {
        if (key != "CTX") {
          vueData[key] = response.data.model[key];
        }
      });
      Object.keys(response.data.uiMessageStack).forEach(function(key) {
        uiMessageStack[key] = response.data.uiMessageStack[key];
      });
      if (options && options.onSuccess) {
        options.onSuccess.call(this, response);
      }
    }.bind(this)).catch(function(error) {
      if (options && options.onError) {
        options.onError.call(this, error.response);
      }
    });
  },
  hasFieldsError: function(object, field, rowIndex) {
    const fieldsErrors = this.$data.uiMessageStack.objectFieldErrors;
    if (fieldsErrors) {
      var objectName = rowIndex != null ? object + "[" + rowIndex + "]" : object;
      return Object.prototype.hasOwnProperty.call(fieldsErrors, objectName) && fieldsErrors[objectName] && Object.prototype.hasOwnProperty.call(fieldsErrors[objectName], field) && fieldsErrors[objectName][field].length > 0;
    }
    return false;
  },
  getErrorMessage: function(object, field, rowIndex) {
    const fieldsErrors = this.$data.uiMessageStack.objectFieldErrors;
    if (fieldsErrors) {
      var objectName = rowIndex != null ? object + "[" + rowIndex + "]" : object;
      if (Object.prototype.hasOwnProperty.call(fieldsErrors, objectName) && fieldsErrors[objectName] && Object.prototype.hasOwnProperty.call(fieldsErrors[objectName], field)) {
        return fieldsErrors[objectName][field].join(", ");
      }
    } else {
      return "";
    }
  },
  vueDataParams: function(keys) {
    var params = new FormData();
    for (var i = 0; i < keys.length; i++) {
      var contextKey = keys[i];
      var vueDataValue = this.$data.vueData[contextKey];
      if (vueDataValue && typeof vueDataValue === "object" && Array.isArray(vueDataValue) === false) {
        Object.keys(vueDataValue).forEach(function(propertyKey) {
          if (!propertyKey.startsWith("_")) {
            if (Array.isArray(vueDataValue[propertyKey])) {
              vueDataValue[propertyKey].forEach(function(value, index) {
                if (vueDataValue[propertyKey][index] && typeof vueDataValue[propertyKey][index] === "object") {
                  this.appendToFormData(params, "vContext[" + contextKey + "][" + propertyKey + "]", vueDataValue[propertyKey][index]["_v_inputValue"]);
                } else {
                  this.appendToFormData(params, "vContext[" + contextKey + "][" + propertyKey + "]", vueDataValue[propertyKey][index]);
                }
              }.bind(this));
            } else {
              if (vueDataValue[propertyKey] && typeof vueDataValue[propertyKey] === "object") {
                this.appendToFormData(params, "vContext[" + contextKey + "][" + propertyKey + "]", vueDataValue[propertyKey]["_v_inputValue"]);
              } else {
                this.appendToFormData(params, "vContext[" + contextKey + "][" + propertyKey + "]", vueDataValue[propertyKey]);
              }
            }
          }
        }.bind(this));
      } else {
        this.appendToFormData(params, "vContext[" + contextKey + "]", vueDataValue);
      }
    }
    return params;
  },
  objectToFormData: function(object) {
    const formData = new FormData();
    Object.keys(object).forEach(function(key) {
      this.appendToFormData(formData, key, object[key]);
    }.bind(this));
    return formData;
  },
  appendToFormData: function(formData, name, value) {
    if (value != null) {
      formData.append(name, value);
    } else {
      formData.append(name, "");
    }
  },
  isFormData: function(val) {
    return typeof FormData !== "undefined" && val instanceof FormData;
  }
};
var EnUs = {
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
  "uploader": {
    "clear_all": "Clear All",
    "removeUploaded": "Remove Uploaded Files",
    "remove": "Remove",
    "add": "Pick Files",
    "upload": "Upload Files",
    "clear": "Abort Upload"
  },
  handles: {
    placeholder: "Enter a handle : format is type/code"
  }
};
var Fr = {
  comments: {
    title: "Commentaires",
    inputLabel: "Ins\xE9rer un commentaire ici",
    actionlabel: "Publier",
    cancel: "Annuler",
    save: "Sauver"
  },
  chatbot: {
    errorMessage: "Une erreur est survenue lors de l'envoi du message",
    tryAgain: "Essayez de nouveau",
    suggestedAnswers: "R\xE9ponses sugg\xE9r\xE9es",
    inputPlaceHolder: "Ecrire un message",
    restartMessage: "Red\xE9marrage de la conversation"
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
    executeCommand: "Appuyer sur entr\xE9e pour executer la commande",
    linkLabel: "Voir les d\xE9tails"
  },
  "uploader": {
    "clear_all": "Annuler tous",
    "removeUploaded": "Supprimer tous",
    "remove": "Supprimer",
    "add": "Ajouter un fichier",
    "upload": "Envoyer",
    "clear": "Annuler"
  },
  handles: {
    placeholder: "Entrer un handle de la forme type/code"
  }
};
var VertigoUi = {
  getBoundMethods: function(obj, methods) {
    let boundMethods = {};
    Object.keys(methods).forEach((methodName) => boundMethods[methodName] = methods[methodName].bind(obj));
    return boundMethods;
  },
  install: function(vueApp, options) {
    vueApp.component("v-chatbot", VChatbot);
    vueApp.component("v-commands", VCommands);
    vueApp.component("v-comments", VComments);
    vueApp.component("v-extensions-store", VExtensionsStore);
    vueApp.component("v-facets", VFacets);
    vueApp.component("v-geopoint-input", VGeopointInput);
    vueApp.component("v-handles", VHandles);
    vueApp.component("v-json-editor", VJsonEditor);
    vueApp.component("v-notifications", VNotifications);
    vueApp.component("v-map", VMap);
    vueApp.component("v-map-layer", VMapLayer);
    vueApp.component("v-tree", VTree);
    vueApp.directive("minify", VMinify);
    vueApp.directive("scroll-spy", VScrollSpy);
    if (!options.axios) {
      console.error("You have to install axios");
      return;
    }
    vueApp.axios = options.axios;
    vueApp.$http = options.axios;
    Object.defineProperties(vueApp.config.globalProperties, {
      axios: {
        get() {
          return options.axios;
        }
      },
      $http: {
        get() {
          return options.axios;
        }
      },
      $vui: {
        get() {
          return VertigoUi.getBoundMethods(this, VMethods);
        }
      }
    });
  },
  methods: VMethods,
  initData: function(instance, json) {
    instance.vueData = json.vueData;
    instance.componentStates = json.componentStates;
    instance.uiMessageStack = json.uiMessageStack;
    instance.vuiLang = json.vuiLang;
  },
  lang: {
    enUS: EnUs,
    fr: Fr
  }
};
if (window) {
  window.VertigoUi = VertigoUi;
}
export { VertigoUi as default };
