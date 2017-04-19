import {CoreStore} from 'focus-core/store';

/**
* Store dealing with subjects about movies.
* @type {focus}
*/
const processDefinitionStore = new CoreStore({
    definition: {
        processCaracteristics: 'processCaracteristics'
    }
});

export default processDefinitionStore;
