import {component as SelectRadio} from 'focus-components/common/select/radio';
import {translate} from 'focus-core/translation';

export default {
    SelectComponent: SelectRadio,
    refContainer: {yesNoList: [{code: true, label: 'Oui'}, {code: false, label: 'Non'}]},
    listName: 'yesNoList',
    formatter: translate
};
