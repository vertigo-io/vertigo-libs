import fetch from 'focus-core/network/fetch';
import executionsUrl from '../config/server/executions';
import omit from 'lodash/object/omit';
import message from 'focus-core/message';

export default {
    loadProcessSummary(id) {
        console.log(`[PROCESS] call loadProcessSummary(${id}) method`);
        return fetch(executionsUrl.loadSummary({urlData: {id}}), {isCORS: true});
    },
    loadSummaries({urlData,data}) {
        console.log(`[PROCESS] call loadSummaries() method`);
        let status = data.criteria.status ? data.criteria.status : '';
        let offset = data.criteria.offset ? data.criteria.offset : 0;
        return fetch(executionsUrl.loadSummaries({urlData: {status:status, offset: offset ,  ...urlData}}), {isCORS: true}).then((data) => (
        {dataList: data, totalCount: data.length}
        ));
    },
    loadProcessExecutions({urlData,data}) {
        console.log(`[PROCESS] call loadProcessExecutions() method with parameters :`, urlData);
        let status = data.criteria.status ? data.criteria.status : '';
        return fetch(executionsUrl.loadProcessExecutions({urlData: {id:data.criteria.id, status:status ,  ...urlData}}), {isCORS: true}).then((filteredData) => (
        {dataList: filteredData, totalCount: filteredData.length === 0 ? 0: 500}
        ));
    },
    loadActivityExecutions({urlData,data}) {
        console.log(`[PROCESS] call loadActivityExecutions() method with parameters :`);
        return fetch(executionsUrl.loadActivityExecutions({urlData: {id:data.criteria.id, ...urlData}}), {isCORS: true}).then((filteredData) => (
        {dataList: filteredData, totalCount: filteredData.length}
        ));
    },
    loadProcessExecution(id) {
        console.log(`[PROCESS] call loadProcessExecution(${id}) method`);
        return fetch(executionsUrl.loadProcessExecution({urlData: {id}}), {isCORS: true});
    },
    loadActivityExecution(id) {
        console.log(`[PROCESS] call loadActivityExecution(${id}) method`);
        return fetch(executionsUrl.loadActivityExecution({urlData: {id}}), {isCORS: true});
    },

    executeProcess(id){
        return fetch(executionsUrl.executeProcess({ data : {processName:id}}), {isCORS: true}).then(
          (success) => {
              message.addSuccessMessage('view.process.action.executeNow.success');
          }, (failure) => {
              message.addErrorMessage('view.process.action.executeNow.error');
          }
        );
    },

    saveProcessExecution(data) {
        console.log(`[PROCESS] call saveProcessExecution(${data.name}) method`);
        return fetch(executionsUrl.saveProcessExecution({urlData: {id: data.name}, data: data}), {isCORS: true});
    }
}
