export default {
    _searchAndFilterList: function(list, valueField, labelField, filterFunction, searchValue) {
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
    dsfrTransformListForSelection: function (list, valueField, labelField, filterFunction, searchValue) {
        let rawList = this._searchAndFilterList(list, valueField, labelField, filterFunction, searchValue);
        return rawList.map(function (object) {
            return { value: object[valueField], text: object[labelField].toString() } // a label is always a string
        });
    },
    dsfrTransformListForRadio: function (list, valueField, labelField, disabledField, hintField, filterFunction, searchValue) {
        let rawList = this._searchAndFilterList(list, valueField, labelField, filterFunction, searchValue);
        return rawList.map(function (object) {
            return { value: object[valueField], label: object[labelField].toString(), hint: object[hintField], disabled: object[disabledField] } // a label is always a string
        });
    },
    dsfrTransformListForCheckbox: function (list, valueField, labelField, disabledField, hintField, name, filterFunction, searchValue) {
        let rawList = this._searchAndFilterList(list, valueField, labelField, filterFunction, searchValue);
        return rawList.map(function (object) {
            return { value: object[valueField], label: object[labelField].toString(), name: name, hint: object[hintField], disabled: object[disabledField] } // a label is always a string
        });
    }
}