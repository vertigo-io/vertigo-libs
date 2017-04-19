import builder from 'focus-core/util/url/builder';
import {apiRoot} from './index';

const executionsRoot = `${apiRoot}executions/`;
const executionControlRoot = `${apiRoot}executionsControl/`;

export default {
    loadSummary: builder(executionsRoot+'summary/' + '${id}', 'GET'),
    loadSummaries: builder(executionsRoot+'summaries?status=${status}&offset=${offset}', 'GET'),
    loadProcessExecutions: builder(executionsRoot + '${id}?status=${status}&limit=${top}&offset=${skip}', 'GET'),
    loadActivityExecutions: builder(executionsRoot+'processExecution/'+'${id}'+'/activities', 'GET'),
    loadProcessExecution: builder(executionsRoot+'processExecution/'+'${id}', 'GET'),
    loadActivityExecution: builder(executionsRoot+'activityExecution/'+'${id}', 'GET'),
    executeProcess: builder(executionControlRoot+'executeNow', 'POST'),
    saveProcessExecution : builder(executionsRoot + '${id}/updateTreatment', 'POST'),
};
