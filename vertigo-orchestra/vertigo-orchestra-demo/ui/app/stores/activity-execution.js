import {CoreStore} from 'focus-core/store';

/**
* Store dealing with subjects about movies.
* @type {focus}
*/
const activityExecutionStore = new CoreStore({
    definition: {
        activityExecution: 'activityExecution'
    }
});

export default activityExecutionStore;
