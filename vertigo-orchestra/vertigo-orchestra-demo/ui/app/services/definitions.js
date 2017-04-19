import fetch from 'focus-core/network/fetch';
import definitionsUrl from '../config/server/definitions';
import omit from 'lodash/object/omit';

export default {
    loadProcessDefinition(id) {
        console.log(`[PROCESS] call loadProcessDefinition(${id}) method`);
        return fetch(definitionsUrl.load({urlData: {id}}), {isCORS: true});
    },
    saveProcessProperties(data) {
        console.log(`[PROCESS] call saveProcessProperties(${data.id}) method`);
        return fetch(definitionsUrl.saveProcessProperties({urlData: {id: data.name}, data: data}), {isCORS: true});
    },
    saveProcessInitialParams(data) {
        console.log(`[PROCESS] call saveProcessInitialParams(${data.id}) method`);
        return fetch(definitionsUrl.saveProcessInitialParams({urlData: {id: data.name}, data: data}), {isCORS: true});
    }
}
