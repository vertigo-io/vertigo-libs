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
    dsfrUpdateMenuNavigationActiveState: function () {
        this.componentStates?.dsfrHeader?.navItems
            .filter(item => item.title)
            .forEach(item => {
                item.active = item.links.some(link => window.location.pathname.startsWith(link.to));
            });
    }
}