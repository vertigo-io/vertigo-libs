import * as Quasar from "quasar"
import { sortDate } from "quasar/src/utils/private/sort.js"
import { isNumber, isDate } from "quasar/src/utils/is.js"

export default {
    onAjaxError: function (response) {
        //Quasar Notif Schema
        let notif = {
            type: 'negative',
            message: 'Network Error.',
            multiLine: true,
            icon: 'warning',
            timeout: 2500,
        }

        //Setup Error Message
        if(response) {
            if (Object.prototype.hasOwnProperty.call(response.data, 'redirect')) { //if response was a redirect
                 window.location = response.data.redirect;
                 return;
            } else if (Object.prototype.hasOwnProperty.call(response.data, 'message')) { //if response was an error
                notif.message = response.data.message
            }
            //Setup Generic Response Messages
            if (response.status === 401) {
                notif.message = this.$q.lang.vui.ajaxErrors.code401	            
                this.$root.$emit('unauthorized', response) //Emit Logout Event
                return;
            } else if (response.status === 403) {
                notif.message = this.$q.lang.vui.ajaxErrors.code403
            } else if (response.status === 404) {
                notif.message = this.$q.lang.vui.ajaxErrors.code404
            } else if (response.status === 405) {
                notif.message = this.$q.lang.vui.ajaxErrors.code405
            } else if (response.status === 422) {
                //Validation Message
                notif.message = '';
                Object.keys(response.data).forEach(function (key) {
                    this.$data.uiMessageStack[key] = response.data[key];
                }.bind(this));
            } else if (response.status >= 500) {
                notif.message = this.$q.lang.vui.ajaxErrors.code500
            }
            if (response.statusText && response.status !== 422) {
                notif.message = response.statusText
            }
            //Try to Use the Response Message
            if (Object.prototype.hasOwnProperty.call(response, 'data')) {
                if (Object.prototype.hasOwnProperty.call(response.data, 'message') && response.data.message && response.data.message.length > 0) {
                    notif.message = response.data.message
                } else if (Object.prototype.hasOwnProperty.call(response.data, 'globalErrors') && response.data.globalErrors && response.data.globalErrors.length > 0) {
                    var notifyMessages = this.uiMessageStackToNotify(response.data);
                    notifyMessages.forEach(function(notifyMessage) { this.$q.notify(notifyMessage)}.bind(this));
                    notif.message = ''; //déja envoyé
                }
            }
        }
        //Send the notif
        if (notif.message.length > 0) {
            this.$q.notify(notif);
        }
    },
    uiMessageStackToNotify : function(uiMessageStack) {
      if(uiMessageStack) {
        var notifyMessages = [];
        if(Object.prototype.hasOwnProperty.call(uiMessageStack, 'globalErrors') && uiMessageStack.globalErrors && uiMessageStack.globalErrors.length > 0) {
           uiMessageStack.globalErrors.forEach(function(uiMessage) { notifyMessages.push( {
            type: 'negative', message: uiMessage,
            multiLine: true, timeout: 2500,
           })});
        }
        if(Object.prototype.hasOwnProperty.call(uiMessageStack, 'globalWarnings') && uiMessageStack.globalWarnings && uiMessageStack.globalWarnings.length > 0) {
           uiMessageStack.globalWarnings.forEach(function(uiMessage) { notifyMessages.push( {
            type: 'warning', message: uiMessage,
            multiLine: true, timeout: 2500,
           })});
        }
        if(Object.prototype.hasOwnProperty.call(uiMessageStack, 'globalInfos') && uiMessageStack.globalInfos && uiMessageStack.globalInfos.length > 0) {
           uiMessageStack.globalInfos.forEach(function(uiMessage) { notifyMessages.push( {
            type: 'info', message: uiMessage,
            multiLine: true, timeout: 2500,
           })});
        }
        if(Object.prototype.hasOwnProperty.call(uiMessageStack, 'globalSuccess') && uiMessageStack.globalSuccess && uiMessageStack.globalSuccess.length > 0) {
           uiMessageStack.globalSuccess.forEach(function(uiMessage) { notifyMessages.push( {
            type: 'positive', message: uiMessage,
            multiLine: true, timeout: 2500,
           })});
        }
        //Pour le moment, rien avec : objectFieldErrors, objectFieldWarnings, objectFieldInfos
        
        return notifyMessages;
      }
    },

    getSafeValue: function (objectkey, fieldKey, subFieldKey) {
        if (this.$data.vueData[objectkey] && this.$data.vueData[objectkey][fieldKey]) {
            return this.$data.vueData[objectkey][fieldKey][subFieldKey];
        }
        return null;
    },

    transformListForSelection: function (list, valueField, labelField, filterFunction) {
        var rawList = this.$data.vueData[list];
        if (filterFunction) {
            rawList = rawList.filter(filterFunction);
        }
        return rawList.map(function (object) {
            return { value: object[valueField], label: object[labelField].toString() } // a label is always a string
        });
    },

    paginationAndSortHandler: function (params) {
        var pagination = params.pagination;
        let componentStates = this.$data.componentStates;
        let vueData = this.$data.vueData;
        var oldPagination = componentStates[pagination.componentId].pagination;
        if (oldPagination.sortBy != pagination.sortBy || oldPagination.descending != pagination.descending) {
            if (pagination.sortBy) {
                // it's a sort
                if (pagination.sortUrl) {
                    //order call the server
                    pagination.page = 1 //reset pagination
                    this.$http.post(pagination.sortUrl, this.objectToFormData({ sortFieldName: pagination.sortBy, sortDesc: pagination.descending, CTX: this.$data.vueData.CTX }))
                        .then(function (response) {
                            vueData[pagination.listKey] = response.data.model[pagination.listKey];
                            this.$data.vueData.CTX = response.data.model['CTX'];
                        }.bind(this));
                } else {
                    //do locally
                    this.$refs[pagination.componentId].sortMethod.apply(this.$refs[pagination.componentId], [vueData[pagination.listKey], pagination.sortBy, pagination.descending])
                }
            } // if we reset the sort we do nothing
        }
        // otherwise it's pagination or filter : do it locally
        // nothing to do everything is done by the paginatedData function
        componentStates[pagination.componentId].pagination = pagination;
    },
    paginatedData: function (list, componentId) {
        let componentStates = this.$data.componentStates;
        var pagination = componentStates[componentId].pagination;
        if (pagination.rowsPerPage != 0) { // not all
            var firstRowIndex = (pagination.page - 1) * pagination.rowsPerPage;
            var lastRowIndex = pagination.page * pagination.rowsPerPage;
            return this.$data.vueData[list].slice(firstRowIndex, lastRowIndex);
        }
        return this.$data.vueData[list];
    },
    createDefaultTableSort: function(componentId) {
        if (this.$data.componentStates[componentId]) {
            return function (data, sortBy, descending) {
                let sortedColumn = this.$data.componentStates[componentId].columns.find(column => column.name === sortBy);
                if (sortedColumn.datetimeFormat) {
                        const
                        dir = descending === true ? -1 : 1,
                        val =  v => v[sortBy]

                    return data.sort((a, b) => {
                        let A = val(a),
                            B = val(b);
                        return ((Quasar.date.extractDate(A, sortedColumn.datetimeFormat).getTime() > Quasar.date.extractDate(B, sortedColumn.datetimeFormat).getTime()) ? 1 : -1) * dir;
                    })
                } else {
                    return this.sortCiAi(data, sortBy, descending)
                }
            }.bind(this)
        }
        return this.sortCiAi
    },
    sortCiAi: function (data, sortBy, descending) {

        const
            dir = descending === true ? -1 : 1,
            val =  v => v[sortBy]

        const collator = new Intl.Collator();

        return data.sort((a, b) => {
            let A = val(a),
                B = val(b)

            if (A === null || A === void 0) {
                return -1 * dir;
            }
            if (B === null || B === void 0) {
                return 1 * dir;
            }
            if (isNumber(A) === true && isNumber(B) === true) {
                return (A - B) * dir;
            }
            if (isDate(A) === true && isDate(B) === true) {
                return sortDate(A, B) * dir;
            }
            if (typeof A === 'boolean' && typeof B === 'boolean') {
                return (A - B) * dir;
            }

            [A, B] = [A, B].map(s => (s + '').toLocaleString());

            return collator.compare(A, B) * dir;
        })
    },

    selectedFunction: function (object, field, item /*, keyboard*/) {
        this.$data.vueData[object][field] = item.value;
    },

    searchAutocomplete: function (list, valueField, labelField, componentId, url, terms, update, abort) {
        if (terms.length < 2) {
            abort();
            return
        }
        this.$http.post(url, this.objectToFormData({ terms: terms, list: list, valueField: valueField, labelField: labelField, CTX: this.$data.vueData.CTX }))
            .then(function (response) {
                var finalList = response.data.map(function (object) {
                    return { value: object[valueField], label: object[labelField].toString() } // a label is always a string
                });
                update(function () {
                    this.$data.componentStates[componentId].options = finalList;
                }.bind(this));
            }.bind(this))
            .catch(function (error) {
                this.$q.notify(error.response.status + ":" + error.response.statusText);
                update([]);
            });

    },
    loadAutocompleteById: function (list, valueField, labelField, componentId, url, objectName, fieldName, rowIndex) {
        //Method use when value(id) is set by another way : like Ajax Viewcontext update, other component, ...
        //if options already contains the value (id) : we won't reload.
        var value
        if (rowIndex != null) {
            value = this.$data.vueData[objectName][rowIndex][fieldName];
        } else {
            value = this.$data.vueData[objectName][fieldName];
        }
         
        if (Array.isArray(value)) {
            value.forEach(element => this.loadMissingAutocompleteOption(list, valueField, labelField, componentId, url, element));
        } else {
            this.loadMissingAutocompleteOption(list, valueField, labelField, componentId, url, value);
        }
        
    },
	loadMissingAutocompleteOption: function (list, valueField, labelField, componentId, url, value){
        if (!value || (this.$data.componentStates[componentId].options
            .filter(function (option) { return option.value === value }.bind(this)).length > 0)) {
            return
        }
        this.$data.componentStates[componentId].loading = true;
        this.$http.post(url, this.objectToFormData({ value: value, list: list, valueField: valueField, labelField: labelField, CTX: this.$data.vueData.CTX }))
            .then(function (response) {
                var finalList = response.data.map(function (object) {
                    return { value: object[valueField], label: object[labelField].toString() } // a label is always a string
                });
                this.$data.componentStates[componentId].options = this.$data.componentStates[componentId].options.concat(finalList);
            }.bind(this))
            .catch(function (error) {
                this.$q.notify(error.response.status + ":" + error.response.statusText);
            }.bind(this))
            .then(function () {// always executed
                this.$data.componentStates[componentId].loading = false;
            }.bind(this));
	},
    decodeDate: function (value, format) {
        if (value === Quasar.date.formatDate(Quasar.date.extractDate(value, 'DD/MM/YYYY'), 'DD/MM/YYYY')) {
            return Quasar.date.formatDate(Quasar.date.extractDate(value, 'DD/MM/YYYY'), format);
        } else {
            return value;
        }
    },

    encodeDate: function (newValue, format) {
        if (newValue === Quasar.date.formatDate(Quasar.date.extractDate(newValue, format), format)) {
            return Quasar.date.formatDate(Quasar.date.extractDate(newValue, format), 'DD/MM/YYYY');
        } else {
            return newValue;
        }
    },

    decodeDatetime: function (value, format) {
        if (value === Quasar.date.formatDate(Quasar.date.extractDate(value, 'DD/MM/YYYY HH:mm'), 'DD/MM/YYYY HH:mm')) {
            return Quasar.date.formatDate(Quasar.date.extractDate(value, 'DD/MM/YYYY HH:mm'), format);
        } else {
            return value;
        }
    },

    encodeDatetime: function (newValue, format) {
        if (newValue === Quasar.date.formatDate(Quasar.date.extractDate(newValue, format), format)) {
            return Quasar.date.formatDate(Quasar.date.extractDate(newValue, format), 'DD/MM/YYYY HH:mm');
        } else {
            return newValue;
        }
    },

    sortDatesAsString: function (format) {
        return function (date1, date2, rowA, rowB) {
            return (Quasar.date.extractDate(date1, format).getTime() > Quasar.date.extractDate(date2, format).getTime()) ? 1 : -1;
        }
    },

    goTo: function (url) {
        window.location = url;
    },

    openModal: function (modalId, url, params) {
        if (url) {
            var finalUrl = url;
            if (params && Object.keys(params).length > 0) {
                var paramsString = Object.keys(params).map(function (key) {
                    return key + '=' + params[key];
                }).join("&");
                finalUrl = finalUrl + '?' + paramsString;
            }
            this.$data.componentStates[modalId].srcUrl = finalUrl;
        }
        this.$data.componentStates[modalId].opened = true;
    },

    toogleFacet: function (facetCode, facetValueCode, contextKey) {
        let vueData = this.$data.vueData;
        var multiple = false;
        vueData[contextKey + "_facets"].forEach(function (facet) {
            if (facet.code === facetCode) {
                // get the right facet 
                multiple = facet.multiple;
            }
        })
        var selectedFacetValues = vueData[contextKey + "_selectedFacets"][facetCode]
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

    search: Quasar.debounce(function (contextKey) {
        let componentStates = this.$data.componentStates;
        let vueData = this.$data.vueData;
        var selectedFacetsContextKey = contextKey + "_selectedFacets";
        var criteriaContextKey = vueData[contextKey + '_criteriaContextKey'];
        var params = this.vueDataParams([criteriaContextKey]);
        params.append(selectedFacetsContextKey, JSON.stringify(vueData[selectedFacetsContextKey]));

        var searchUrl = componentStates[contextKey + 'Search'].searchUrl;
        var collectionComponentId = componentStates[contextKey + 'Search'].collectionComponentId;

        if (componentStates[collectionComponentId].pagination && componentStates[collectionComponentId].pagination.sortBy) {
            var collectionPagination = componentStates[collectionComponentId].pagination;
            params.append('sortFieldName', collectionPagination.sortBy);
            params.append('sortDesc', collectionPagination.descending);
        }
        this.httpPostAjax(searchUrl, params, {
            onSuccess: function (response) {
                if (componentStates[collectionComponentId].pagination) {
                    var collectionPagination = componentStates[collectionComponentId].pagination;
                    collectionPagination.page = 1 // reset page
                    collectionPagination.rowsNumber = response.data.model[contextKey + '_list'].length
                }
            }
        });
    }, 400),

    showMore: function (componentId) {
        let componentStates = this.$data.componentStates;
        var showMoreCount = componentStates[componentId].pagination.showMoreCount;
        if (showMoreCount) {
            // nothing to do
        } else {
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
    vueDataToObject(value) {
        if(Array.isArray(value)) {
            if (value.length == 0 ) {
                return null
            } else if (value.length == 1) {
                return value[0]
            }
            return value;
        } else if(value) {
            return value;
        }
        return null;
    },
    obtainVueDataAccessor(referer, object, field, rowIndex) {
        if (field != null && field != 'null') {
            if (rowIndex != null) {
                return {
                    get: function () {
                        return referer.$data.vueData[object][rowIndex][field];
                    },
                    set: function (newData) {
                        referer.$data.vueData[object][rowIndex][field] = newData;
                    }
                }
            } else {
                return {
                    get: function () {
                        return referer.$data.vueData[object][field];
                    },
                    set: function (newData) {
                        referer.$data.vueData[object][field] = newData;
                    }
                }
            }
        } else {
            return {
                get: function () {
                    return referer.$data.vueData[object];
                },
                set: function (newData) {
                    referer.$data.vueData[object] = newData;
                }
            }
        }
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
    httpPostAjax: function (url, paramsIn, options) {
        var paramsInResolved = Array.isArray(paramsIn) ? this.vueDataParams(paramsIn) : paramsIn;
        let vueData = this.$data.vueData;
        let uiMessageStack = this.$data.uiMessageStack;
        let params = this.isFormData(paramsInResolved) ? paramsInResolved : this.objectToFormData(paramsInResolved);
        params.append('CTX', vueData.CTX);
        this.pushPendingAction(url);
        this.$http.post(url, params).then(function (response) {
          if (response.data.model.CTX) {
            vueData.CTX = response.data.model.CTX;
          }
          Object.keys(response.data.model).forEach(function (key) {
            if ('CTX' != key) {
              vueData[key] = response.data.model[key];
            }
          });
          Object.keys(response.data.uiMessageStack).forEach(function (key) {
            uiMessageStack[key] = response.data.uiMessageStack[key];
          });
          if (options && options.onSuccess) {
            options.onSuccess.call(this, response);
          }
        }.bind(this)).catch(function (error) {
          if (options && options.onError) {
            options.onError.call(this, error.response);
          }              
        }).finally(function () {
          this.removePendingAction(url);
        }.bind(this));
    },
    isPendingAction: function(actionName) {
        if(actionName) {
            return this.$data.componentStates.pendingAction.actionNames.includes(actionName);
        } else {
            return this.$data.componentStates.pendingAction.actionNames.length > 0;
        }
    },
    pushPendingAction: function(actionName) {
         this.$data.componentStates.pendingAction.actionNames.push(actionName);
    },
    removePendingAction: function(actionName) {
        this.$data.componentStates.pendingAction.actionNames = this.$data.componentStates.pendingAction.actionNames.filter(e => e !== actionName);
    },        

    hasFieldsError: function (object, field, rowIndex) {
        const fieldsErrors = this.$data.uiMessageStack.objectFieldErrors;
        if (fieldsErrors) {
            var objectName = rowIndex != null ? object + '[' + rowIndex + ']' : object;
            return Object.prototype.hasOwnProperty.call(fieldsErrors, objectName) &&
                fieldsErrors[objectName] && Object.prototype.hasOwnProperty.call(fieldsErrors[objectName], field) && fieldsErrors[objectName][field].length > 0
        }
        return false;
    },

    getErrorMessage: function (object, field, rowIndex) {
        const fieldsErrors = this.$data.uiMessageStack.objectFieldErrors;
        if (fieldsErrors) {
            var objectName = rowIndex != null ? object + '[' + rowIndex + ']' : object;
            if (Object.prototype.hasOwnProperty.call(fieldsErrors, objectName) &&
                fieldsErrors[objectName] && Object.prototype.hasOwnProperty.call(fieldsErrors[objectName], field)) {
                return fieldsErrors[objectName][field].join(', ');
            }
        } else {
            return '';
        }
    },

    vueDataParams: function (keys) {
        var params = new FormData();
        for (var i = 0; i < keys.length; i++) {
            var attribs = keys[i].split('.',2);
            var contextKey = attribs[0];
            var attribute = attribs[1];
            var vueDataValue = this.$data.vueData[contextKey];
            if (vueDataValue && typeof vueDataValue === 'object' && Array.isArray(vueDataValue) === false) {
                // object
                if(!attribute) {
                    Object.keys(vueDataValue).forEach(function (propertyKey) {
                        if (!propertyKey.includes("_") ) {
                            //  properties taht start with _ are private and don't belong to the serialized entity
                            // we filter field with modifiers (like <field>_display and <field>_fmt)
                            this._vueDataParamsKey(params, contextKey, propertyKey, vueDataValue)
                        }
                    }.bind(this));
                } else {
                    this._vueDataParamsKey(params, contextKey, attribute, vueDataValue)
                }
            } else {
                //primitive
                this.appendToFormData(params, 'vContext[' + contextKey + ']', vueDataValue);
            }
        }
        return params;

    },
    _vueDataParamsKey: function(params, contextKey, propertyKey, vueDataValue) {
        let vueDataFieldValue = vueDataValue[propertyKey];
        if (Array.isArray(vueDataFieldValue)) {
            if (!vueDataFieldValue || vueDataFieldValue.length == 0) {
                this.appendToFormData(params, 'vContext[' + contextKey + '][' + propertyKey + ']', ""); // reset array with an empty string
            } else {
                vueDataFieldValue.forEach(function (value, index) {
                    if (vueDataFieldValue[index] && typeof vueDataFieldValue[index] === 'object') {
                        this.appendToFormData(params, 'vContext[' + contextKey + '][' + propertyKey + ']', vueDataFieldValue[index]['_v_inputValue']);
                    } else {
                        this.appendToFormData(params, 'vContext[' + contextKey + '][' + propertyKey + ']', vueDataFieldValue[index]);
                    }
                }.bind(this));
            }
        } else {
            if (vueDataFieldValue && typeof vueDataFieldValue === 'object') {
                this.appendToFormData(params, 'vContext[' + contextKey + '][' + propertyKey + ']', vueDataFieldValue['_v_inputValue']);
            } else {
                this.appendToFormData(params, 'vContext[' + contextKey + '][' + propertyKey + ']', vueDataFieldValue);
            }
        }
    },
    objectToFormData: function (object) {
        const formData = new FormData();
        Object.keys(object).forEach(function (key) {
            this.appendToFormData(formData, key, object[key])
        }.bind(this));
        return formData;
    },

    appendToFormData: function (formData, name, value) {
        if (value != null) {
            formData.append(name, value)
        } else {
            formData.append(name, "")
        }
    },

    isFormData: function (val) {
        return (typeof FormData !== 'undefined') && (val instanceof FormData);
    },
    /**
     * Capture the <CTL-V> paste event, only allow plain-text, no images.         *
     * see: https://stackoverflow.com/a/28213320         *
     * @param {object} evt - array of files
     * @author Daniel Thompson-Yvetot
     * @license MIT
     */
    pastePlainTextCapture (evt, editorRef) {
      // Let inputs do their thing, so we don't break pasting of links.
      if (evt.target.nodeName === 'INPUT') return
      let text, onPasteStripFormattingIEPaste
      evt.preventDefault()
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData('text/plain')
        this.$refs[editorRef].runCmd('insertText', text)
      }
      else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData('text/plain')
        this.$refs[editorRef].runCmd('insertText', text)
      }
      else if (window.clipboardData && window.clipboardData.getData) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true
          this.$refs[editorRef].runCmd('ms-pasteTextOnly', text)
        }
        onPasteStripFormattingIEPaste = false
      }
    },
    editorHandlerFixHelper(tags, regexp, doBlockName, undoBlockName, eVm, caret) {
        if(caret.hasParents(tags, true)) { 
            eVm.runCmd('formatBlock', undoBlockName);
            
            if(!caret.range.commonAncestorContainer.hasChildNodes()) {
                 var currentNode = caret.selection.focusNode.parentNode;
                while(currentNode && currentNode !== caret.el) {
                    if(tags.includes(currentNode.nodeName.toLowerCase())) {
                        currentNode.outerHTML = currentNode.outerHTML.replace(regexp,"");
                    }
                    currentNode = currentNode.parentNode;
                }                    
            } else {
               var inSelection = false;
                var startNode = caret.range.startContainer;
                while(startNode && startNode !== caret.el && startNode.parentNode !== caret.range.commonAncestorContainer) {
                    startNode = startNode.parentNode;
                }                
                var endNode = caret.range.endContainer;
                while(endNode && endNode !== caret.el && endNode.parentNode !== caret.range.commonAncestorContainer) {
                    endNode = endNode.parentNode;
                }
                caret.range.commonAncestorContainer.childNodes.forEach(
                    function (currentNode) {
                        if(currentNode === startNode) {
                            inSelection = true;
                        }
                        if(inSelection) {
                            currentNode.outerHTML = currentNode.outerHTML.replace(regexp,"");
                        }
                        if(currentNode === endNode) {
                            inSelection = false;                            
                        }
                    }
                )
            }
        } else {
            eVm.runCmd('formatBlock', doBlockName);
        }
    },
    editorHandlerBlockquoteFix(e,eVm,caret) {
        this.editorHandlerFixHelper(['blockquote'], /<\/?blockquote[^>]*\/?>/g, 'blockquote', 'div', eVm, caret);
    },
    editorHandlerParagrapheFix(e,eVm,caret) {
        this.editorHandlerFixHelper(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9'], /<\/?h[1-9][^>]*\/?>/g, 'div', 'div', eVm, caret);            
    }
}
