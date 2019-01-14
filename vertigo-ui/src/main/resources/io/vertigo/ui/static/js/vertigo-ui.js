var VUi = { 
		methods : {
				onAjaxError: function(response) {
				//Quasar Notif Schema
				  let notif = {
					  type: 'negative',
					  message: 'Network Error.',
					  icon: 'warning',
				      timeout: 2500,
				   }
				  
				   //Setup Error Message //if response was an error
				   if(response.hasOwnProperty('message')){ 
			    	  notif.message = response.message
			       }
				  //Setup Generic Response Messages
				  if(response.status === 401){
					  notif.message = 'UnAuthorized, you may login with an authorized account'
					  this.$root.$emit('logout') //Emit Logout Event
				  } else if(response.status === 403){
					  notif.message = 'Forbidden, your havn&quote;t enought rights'					 
				  } else if(response.status === 404){
					  notif.message = 'API Route is Missing or Undefined'
				  } else if(response.status === 405){
					  notif.message = 'API Route Method Not Allowed'
				  } else if(response.status === 422){
				     //Validation Message
					  notif.message = 'Data validation errors'
				  } else if(response.status >= 500){
					  notif.message = 'Server Error'
				  }
				  if(response.statusText) { 
			    	  notif.message = response.statusText
			      }
				  //Try to Use the Response Message
				  if(response.hasOwnProperty('data')){
					 if(response.data.hasOwnProperty('message') && response.data.message.length > 0){
				    	 notif.message = response.data.message
				     } else if(response.data.hasOwnProperty('globalErrors') && response.data.globalErrors.length > 0){
				    	 notif.message = response.data.globalErrors.join('<br/>\n ');
				     }
				  }
				  //Send the notif
				  if(notif.message.length > 0) {
				     this.$q.notify(notif);
				  }
				},			
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
				paginationAndSortHandler : function (params) {
					var pagination = params.pagination;
					var filter = params.filter;
					var oldPagination = componentStates[pagination.componentId].pagination;
					if (oldPagination.sortBy != pagination.sortBy ||  oldPagination.descending != pagination.descending ) {
						if (pagination.sortBy) {
							// it's a sort
							if (pagination.sortUrl) {
								//order call the server
								pagination.page = 1 //reset pagination
								this.$http.post(pagination.sortUrl, { sortFieldName : pagination.sortBy, sortDesc : pagination.descending, CTX: this.$data.vueData.CTX}, { emulateJSON: true })
								.then( function (response ) {
									vueData[pagination.listKey] = response.body[pagination.listKey];
									this.$data.vueData.CTX = response.body['CTX'];
								});
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
					this.$http.post(url, {terms: terms, list : list , valueField : valueField,labelField : labelField, CTX: this.$data.vueData.CTX}, { emulateJSON: true }).then( function (response ) {
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
					return this.parseDateAsString(this.$data.vueData[object][field], format)
				},
				parseDateAsString : function (dateAsString, format) {
					if (dateAsString) {
						var parts = dateAsString.match(/(\d+)/g);
						var i=0;
						var fmt={};
						format.replace(/(YYYY|MM|DD)/g, function(part) { fmt[part] = i++; });
						return Quasar.utils.date.buildDate({year :parts[fmt['YYYY']], month :parts[fmt['MM']], date : parts[fmt['DD']]});
					} else {
						return null;
					}
				},
				sortDatesAsString : function (format) {
					return function (date1, date2) {
						return (VUi.methods.parseDateAsString(date1, format).getTime() > VUi.methods.parseDateAsString(date2, format).getTime()) ? 1 : -1;
					}
				},
				formatDateTime : function (object, field, newValue, format) {
					this.$data.vueData[object][field] = Quasar.utils.date.formatDate(newValue, format);
				},
				parseDateTime : function (object, field, format) {
					return this.parseDateTimeAsString(this.$data.vueData[object][field], format);
				},
				parseDateTimeAsString : function (dateTimeAsString, format) {
					if (dateTimeAsString) {
						var parts = dateTimeAsString.match(/(\d+)/g);
						var i=0;
						var fmt={};
						format.replace(/(YYYY|MM|DD|HH|mm)/g, function(part) { fmt[part] = i++; });
						return Quasar.utils.date.buildDate({year :parts[fmt['YYYY']], month :parts[fmt['MM']], date : parts[fmt['DD']], date : parts[fmt['DD']], hours : parts[fmt['HH']], minutes : parts[fmt['mm']]});
					} else {
						return null;
					}
				},
				sortDateTimesAsString : function (format) {
					return function (dateTime1, dateTime2) {
						return (VUi.methods.parseDateTimeAsString(date1, format).getTime() > VUi.methods.parseDateTimeAsString(date2, format).getTime()) ? 1 : -1;
					}
				},
				goTo : function (url) {
					window.location = url;
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
				toogleFacet : function (facetCode, facetValueCode, contextKey) {
					var multiple = false;
					vueData[contextKey+"_facets"].forEach(function (facet) {
						if (facet.code === facetCode) {
							// get the right facet 
							multiple = facet.multiple;
						}
					})
					var selectedFacetValues = vueData[contextKey+"_selectedFacets"][facetCode]
					if (selectedFacetValues.includes(facetValueCode)) {
						if (multiple) {
							selectedFacetValues.splice(selectedFacetValues.indexOf(facetValueCode), 1);
						} else {
							selectedFacetValues.splice(0);
						}
					} else {
						selectedFacetValues.push(facetValueCode);
					}
					this.search(contextKey);
				},
				search : Quasar.utils.debounce(function(contextKey) { 
					var selectedFacetsContextKey = contextKey +"_selectedFacets";
					var params = {};
					params['selectedFacets'] = JSON.stringify(vueData[selectedFacetsContextKey]);
					var criteriaContextKey = vueData[contextKey + '_criteriaContextKey'];
					params['vContext['+criteriaContextKey+']'] = vueData[criteriaContextKey];
					params['CTX'] = this.$data.vueData.CTX;
					
					var searchUrl = componentStates[contextKey+'Search'].searchUrl;
					var collectionComponentId = componentStates[contextKey+'Search'].collectionComponentId;
					
					if (componentStates[collectionComponentId].pagination && componentStates[collectionComponentId].pagination.sortBy) {
						var collectionPagination = componentStates[collectionComponentId].pagination;
						params['sortFieldName'] = collectionPagination.sortBy;
						params['sortDesc'] = collectionPagination.descending;
					}
					
					this.$http.post(searchUrl, params, { emulateJSON: true }).then( function (response ) {
						if (response.body.CTX) {
							this.$data.vueData.CTX = response.body.CTX;
						}
						Object.keys(response.body).forEach(function (key) {
							if ('CTX' != key) {
								vueData[key] = response.body[key];
							}
						});
						if (componentStates[collectionComponentId].pagination) {
							var collectionPagination = componentStates[collectionComponentId].pagination;
							collectionPagination.page = 1 // reset page
							collectionPagination.rowsNumber = response.body[contextKey+'_list'].length
						}
						
					});
				}, 400),
				showMore : function (componentId) {
					var showMoreCount = componentStates[componentId].pagination.showMoreCount;
					if (showMoreCount) {
					} else {
						showMoreCount = 1;
						componentStates[componentId].pagination.showMoreCount = showMoreCount;
					}
					componentStates[componentId].pagination.rowsPerPage = componentStates[componentId].pagination.rowsPerPage / showMoreCount * (showMoreCount + 1);
				},
				uploader_uploadFile : function(componentId) {
						this.$refs[componentId].upload()
				},				
				uploader_uploadedFile : function(file, componentId) {
						componentStates[componentId].fileUris.push(file.xhr.response);
						file.fileUri = file.xhr.response;
				},
				uploader_removeFile : function(removedFile, componentId) {
						var component = this.$refs[componentId];
						var componentFileUris = componentStates[componentId].fileUris;
						var indexOfFileUri = componentFileUris.indexOf(removedFile.fileUri);
						var xhrParams = {};
						xhrParams[component.name] = removedFile.fileUri;
						this.$http.delete(component.url, {params : xhrParams, credentials:component.withCredentials})
						.then( function (response) { //Ok
							if (component.multiple) {
								componentFileUris.splice(indexOfFileUri, 1);
							} else {
								componentFileUris.splice(0);
							}
						}, function(response) { //Ko
							this.$q.notify(response.status + ":" +response.statusText+ " Can't remove temporary file");
						});
						
				},
				httpPostAjax : function(url, params, handler) {
					params['CTX'] = vueData.CTX;
					Vue.http.post(url, params , { emulateJSON: true }).then( function (response ) {
						if (response.body.CTX) {
							vueData.CTX = response.body.CTX;
						}
						Object.keys(response.body).forEach(function (key) {
							if ('CTX' != key) {
								vueData[key] = response.body[key];
							}
						});
						handler(response);
					});
				}
			  }
	}

Vue.http.interceptors.push(function(request) {
   return function(response) { if(!response.ok) { VUi.methods.onAjaxError.bind(this)(response); } };
});