import { format, parse } from 'date-fns'

export default {
    dsfrDecodeDate: function (value, formatDate) {
        if (typeof value !== "string" || value === "" ) {
            return value;
        }
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (regex.test(value)) {
            return value;
        }

        const date = parse(value, formatDate, new Date());
        return format(date, 'yyyy-MM-dd');
    },
    dsfrSearch: function(contextKey) {
        return this.search(contextKey, 0);
    },
    dsfrDecodeDateTime: function (value, formatDate) {
        if (value === "") {
            return value;
        }
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        if (regex.test(value)) {
            return value;
        }
        const date = parse(value, formatDate, new Date());
        return format(date, "yyyy-MM-dd'T'HH:mm");
    },
    _searchAndFilterList: function (list, valueField, labelField, filterFunction, searchValue) {
        let rawList = this.$data.vueData[list];
        if (filterFunction) {
            rawList = rawList.filter(filterFunction);
        }
        if (searchValue != null && searchValue.trim() !== '') {
            const searchNormalized = this.unaccentLower(searchValue);
            rawList = rawList.filter(val => this.unaccentLower(val[labelField].toString()).indexOf(searchNormalized) > -1); // label contains
        }
        return rawList
    },
    dsfrTransformListForSelection: function (list, valueField, labelField, nullText, filterFunction, searchValue) {
        let rawList = this._searchAndFilterList(list, valueField, labelField, filterFunction, searchValue);
        let result = rawList.map(function (object) {
            return {value: object[valueField], text: object[labelField].toString()} // a label is always a string
        });
        if (nullText !== undefined && nullText !== null && nullText !== '') {
            result.unshift({value: '', text: nullText});
        }
        return result;
    },
    dsfrTransformListForRadio: function (list, valueField, labelField, disabledField, hintField, filterFunction, searchValue) {
        let rawList = this._searchAndFilterList(list, valueField, labelField, filterFunction, searchValue);
        return rawList.map(function (object) {
            return {
                value: object[valueField],
                label: object[labelField].toString(),
                hint: object[hintField],
                disabled: object[disabledField]
            } // a label is always a string
        });
    },
    dsfrTransformListForCheckbox: function (list, valueField, labelField, disabledField, hintField, name, filterFunction, searchValue) {
        let rawList = this._searchAndFilterList(list, valueField, labelField, filterFunction, searchValue);
        return rawList.map(function (object) {
            return {
                value: object[valueField],
                label: object[labelField].toString(),
                name: name,
                hint: object[hintField],
                disabled: object[disabledField]
            } // a label is always a string
        });
    },
    dsfrSearchAutocomplete: function (list, valueField, labelField, componentId, url, minQueryLength, terms) {
        if (terms.length < minQueryLength) {
            return Promise.resolve([]);
        }

        return this.$http.post(url, this.objectToFormData({ terms, list, valueField, labelField, CTX: this.$data.vueData.CTX }))
            .then((response) => {
                return response.data.map((object) => ({
                    value: object[valueField],
                    label: object[labelField].toString(), // A label is always a string
                }));
            })
            .catch(() => {
                return []; // On error, resolve with an empty array
            });
    },
    dsfrLoadAutocompleteById: function (list, valueField, labelField, componentId, url, objectName, fieldName, rowIndex) {
        //Method use when value(id) is set by another way : like Ajax Viewcontext update, other component, ...
        //if options already contains the value (id) : we won't reload.
        let value = rowIndex != null && rowIndex !== 'null'
            ? this.$data.vueData[objectName][rowIndex][fieldName]
            : this.$data.vueData[objectName][fieldName];

        if (Array.isArray(value)) {
            value.forEach(element => this.dsfrLoadMissingAutocompleteOption(list, valueField, labelField, componentId, url, element));
        } else {
            this.dsfrLoadMissingAutocompleteOption(list, valueField, labelField, componentId, url, value);
        }

    },
    dsfrLoadMissingAutocompleteOption: function (list, valueField, labelField, componentId, url, value){
        let currentValue = this.componentStates[componentId].options.find((e) => e.value === value);
        if (!value || (currentValue !== undefined)) {
            if (currentValue?.label !== undefined) {
                this.componentStates[componentId].field = currentValue.label;
            }
            return
        }
        this.$data.componentStates[componentId].loading = true;
        this.$http.post(url, this.objectToFormData({ value: value, list: list, valueField: valueField, labelField: labelField, CTX: this.$data.vueData.CTX }))
            .then(function (response) {
                let res = response.data.map(function (object) {
                    return { value: object[valueField], label: object[labelField].toString() } // a label is always a string
                });
                this.$data.componentStates[componentId].options = this.$data.componentStates[componentId].options.concat(res);

                this.componentStates[componentId].field = res[0].label;

                return this.$data.componentStates[componentId].options;
            }.bind(this))
            .catch(function (error) {
                this.$q.notify(error.response.status + ":" + error.response.statusText);
            }.bind(this))
            .then(function () {// always executed
                this.$data.componentStates[componentId].loading = false;
            }.bind(this));
    },
    dsfrResetAutocomplete: function(componentId, objectName, fieldName, rowIndex) {
        let value = this.componentStates[componentId].field;
        if (value === undefined) { return }

        let currentValue = this.componentStates[componentId].options.find((e) => e.label.toLowerCase().startsWith(value.trim().toLowerCase()));
        if (currentValue === undefined || value === "") {
            this.componentStates[componentId].field = undefined;
            if (rowIndex != null && rowIndex !== 'null') {
                this.$data.vueData[objectName][rowIndex][fieldName] = undefined;
            } else {
                this.$data.vueData[objectName][fieldName] = undefined;
            }
        } else {
            this.$data.componentStates[componentId].field = currentValue.label;
            if (rowIndex != null && rowIndex !== 'null') {
                this.$data.vueData[objectName][rowIndex][fieldName] = currentValue.value;
            } else {
                this.$data.vueData[objectName][fieldName] = currentValue.value;
            }
        }
    },
    dsfrUpdateMenuNavigationActiveState: function () {
        this.componentStates?.dsfrHeader?.navItems
            .forEach(item => {
                if (item.title) {
                    item.active = item.links.some(link => link.setActive === true || window.location.pathname.startsWith(link.to));
                } else {
                    item.active = item.setActive === true;
                }
            });
    },
    dsfrTableRows: function(componentId) {
        let pagination = this.$data.componentStates[componentId].pagination;
        let rows = this.$data.vueData[pagination.listKey];
        if (pagination.sortUrl && pagination.descending ) {
            // DataTableDsfr alw ays reverse locally so we need to reverse it before to keep server order
            return rows.slice().reverse();
        }
        return rows;
    },
    dsfrServerSideSort: function (componentId){
        let componentStates = this.$data.componentStates;
        let pagination = componentStates[componentId].pagination;
        let vueData = this.$data.vueData;
        pagination.page = 0 //reset pagination (0 based in dsfr)
        if (pagination.sortUrl && pagination.sortBy) {
            this.$http.post(pagination.sortUrl, this.objectToFormData({ sortFieldName: pagination.sortBy, sortDesc: pagination.descending, CTX: this.$data.vueData.CTX }))
                .then(
                    function (response) {
                        vueData[pagination.listKey] = response.data.model[pagination.listKey];
                        this.$data.vueData.CTX = response.data.model['CTX'];
                    }.bind(this)
            );
        }
    }
}