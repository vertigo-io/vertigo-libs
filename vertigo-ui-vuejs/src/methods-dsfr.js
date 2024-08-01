export default {
    dsfrTransformListForSelection: function (list, valueField, labelField, filterFunction, searchValue) {
        let rawList = this.$data.vueData[list];
        if (filterFunction) {
            rawList = rawList.filter(filterFunction);
        }
        if (searchValue != null && searchValue.trim() !== '') {
            const searchNormalized = this.unaccentLower(searchValue);
            rawList = rawList.filter(val => this.unaccentLower(val[labelField].toString()).indexOf(searchNormalized) > -1); // label contains
        }
        return rawList.map(function (object) {
            return { value: object[valueField], text: object[labelField].toString() } // a label is always a string
        });
    }
}
