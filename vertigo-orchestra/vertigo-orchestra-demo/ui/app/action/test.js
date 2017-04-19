import actionBuilder from 'focus-core/application/action-builder';
import {loadError} from '../services/test';

export const error = {
    load: actionBuilder({
        service: loadError,
        node: 'customServerError',
        status: 'loaded',
        shouldDumpStoreOnActionCall: true
    })
};
