import definitionServices from '../services/definitions';
import actionBuilder from 'focus-core/application/action-builder';

export const propertiesActions = {
    load: actionBuilder({
        node: 'processCaracteristics',
        service: definitionServices.loadProcessDefinition,
        shouldDumpStoreOnActionCall: true,
        status: 'loaded'
    }),
    save: actionBuilder({
        node: 'processCaracteristics',
        service: definitionServices.saveProcessProperties,
        shouldDumpStoreOnActionCall: true,
        status: 'saved'
    })
}

export const initialParamsActions = {
    load: actionBuilder({
        node: 'processCaracteristics',
        service: definitionServices.loadProcessDefinition,
        shouldDumpStoreOnActionCall: true,
        status: 'loaded'
    }),
    save: actionBuilder({
        node: 'processCaracteristics',
        service: definitionServices.saveProcessInitialParams,
        shouldDumpStoreOnActionCall: true,
        status: 'saved'
    })
}

export const caracteristicsActions = {
    load: actionBuilder({
        node: 'processCaracteristics',
        service: definitionServices.loadProcessDefinition,
        shouldDumpStoreOnActionCall: true,
        status: 'loaded'
    })
}
