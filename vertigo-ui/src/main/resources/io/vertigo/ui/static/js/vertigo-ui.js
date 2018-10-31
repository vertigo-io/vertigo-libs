var VUi = { 
		methods : {
				transformListForSelection: function (list, valueField, labelField) {
					return this.$data.vueData[list].map(function (object) {
						return { value: object[valueField], label: object[labelField].toString()} // a label is always a string
					});
				},
				transformListForStaticSelection: function (list, valueField, labelField) {
					var finalList =  this.$data.vueData[list].map(function (object) {
						return { value: object[valueField], label: object[labelField].toString()} // a label is always a string
					});
					return {field : 'label', list : finalList}
				},
				request : function (params) {
					var pagination = params.pagination;
					var filter = params.filter;
					var oldPagination = componentStates[pagination.componentId].pagination;
					if (oldPagination.sortBy != pagination.sortBy ||  oldPagination.descending != pagination.descending ) {
						// it's a sort order call the server
						pagination.page = 1 //reset pagination
						this.$http.post(pagination.sortUrl, { sortFieldName : pagination.sortBy, sortDesc : pagination.descending, CTX: this.$data.ctxId}, { emulateJSON: true }).then( function (response ) {
							vueData[pagination.listKey] = response.body[pagination.listKey];
							this.$data.ctxId = response.body['CTX'];
						});
					}
						// otherwise it's pagination or filter : do it locally
						// nothing to do everything is done by the paginatedData function
					componentStates[pagination.componentId].pagination = pagination;
				},
				paginatedData: function (list, componentId) {
					var pagination = componentStates[componentId].pagination;
					if (pagination.rowsPerPage != 0) { // not all
						var firstRowIndex = (pagination.page - 1) * pagination.rowsPerPage;
						var lastRowIndex = pagination.page * pagination.rowsPerPage;
						return this.$data.vueData[list].slice(firstRowIndex, lastRowIndex);
					}
					return this.$data.vueData[list];
				},
				selectedFunction : function (object, field, item, keyboard) {
					this.$data.vueData[object][field] = item.value;
				},
				searchAutocomplete : function (list, valueField, labelField, url, terms, done) {
					this.$http.post(url, {terms: terms, list : list , valueField : valueField,labelField : labelField, CTX: this.$data.ctxId}, { emulateJSON: true }).then( function (response ) {
						var finalList =  response.body.map(function (object) {
							return { value: object[valueField], label: object[labelField].toString()} // a label is always a string
						});
						done(finalList);
					}, 
					function (response) {
						this.$q.notify(response.status + ":" +response.statusText);
						done([]);
					});
					
				},
				formatDate : function (object, field, newValue, format) {
					this.$data.vueData[object][field] = Quasar.utils.date.formatDate(newValue, format);
				},
				parseDate : function (object, field, format) {
					var parts = this.$data.vueData[object][field].match(/(\d+)/g);
					var i=0;
					var fmt={};
					format.replace(/(YYYY|MM|DD)/g, function(part) { fmt[part] = i++; });
					return Quasar.utils.date.buildDate({year :parts[fmt['YYYY']], month :parts[fmt['MM']], date : parts[fmt['DD']]});
				},
				formatDateTime : function (object, field, newValue, format) {
					this.$data.vueData[object][field] = Quasar.utils.date.formatDate(newValue, format);
				},
				parseDateTime : function (object, field, format) {
					var parts = this.$data.vueData[object][field].match(/(\d+)/g);
					var i=0;
					var fmt={};
					format.replace(/(YYYY|MM|DD|HH|mm)/g, function(part) { fmt[part] = i++; });
					return Quasar.utils.date.buildDate({year :parts[fmt['YYYY']], month :parts[fmt['MM']], date : parts[fmt['DD']], date : parts[fmt['DD']], hours : parts[fmt['HH']], minutes : parts[fmt['mm']]});
				},
				openModal : function (modalId, url, params) {
					if (url) {
						var finalUrl = url;
						if (params && Object.keys(params).length > 0) {
							var paramsString = Object.keys(params).map(function(key){
							    return key + '=' + params[key] ;
							}).join("&");
							finalUrl = finalUrl + '?' + paramsString;
						}
						this.$data.componentStates[modalId].srcUrl = finalUrl;
					}
					this.$data.componentStates[modalId].opened = true;
				},
				toogleFacet : function (facetCode, facetValueCode, componentId) {
					var multiple = false;
					vueData[componentId+"_facets"].forEach(function (facet) {
						if (facet.code === facetCode) {
							// get the right facet 
							multiple = facet.multiple;
						}
					})
					var selectedFacetValues = vueData[componentId+"_selectedFacets"][facetCode]
					if (selectedFacetValues.includes(facetValueCode)) {
						if (multiple) {
							selectedFacetValues.splice(selectedFacetValues.indexOf(facetValueCode), 1);
						} else {
							selectedFacetValues.splice(0);
						}
					} else {
						selectedFacetValues.push(facetValueCode);
					}
					this.search("result");
				},
				search : Quasar.utils.debounce(function(componentId) { 
					var selectedFacetsContextKey = componentId +"_selectedFacets";
					var params = {};
					Object.keys(vueData[selectedFacetsContextKey]).forEach(function (key) {
						for (var i = 0; i < vueData[selectedFacetsContextKey][key].length; i++) {
							var array_element = vueData[selectedFacetsContextKey][key][i];
							paramName = 'vContext['+selectedFacetsContextKey+']'+'['+key+']'+'['+i+']';
							params[paramName] = vueData[selectedFacetsContextKey][key][i]
							
						}
					})
					var criteriaContextKey = vueData[componentId + '_criteriaContextKey'];
					params['vContext['+criteriaContextKey+']'] = vueData[criteriaContextKey];
					params['CTX'] = this.$data.ctxId;
					this.$http.post("/test/movies/_search", params, { emulateJSON: true }).then( function (response ) {
						Object.keys(response.body).forEach(function (key) {
							if ('CTX' === key) {
								ctxId = response.body['CTX'];
							} else {
								vueData[key] = response.body[key];
							}
						});
					});
				}, 400)
			  }
	}