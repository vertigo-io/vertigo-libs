import {CoreStore} from 'focus-core/store';

/**
* Store dealing with subjects about movies.
* @type {focus}
*/
const testStore = new CoreStore({
    definition: {
        customServerError: 'customServerError'
    }
});

export default testStore;
