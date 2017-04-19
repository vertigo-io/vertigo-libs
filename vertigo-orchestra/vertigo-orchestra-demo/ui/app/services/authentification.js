import fetch from 'focus-core/network/fetch';
import authentificationUrl from '../config/server/authentification';
import omit from 'lodash/object/omit';

export default {
    logout() {
        console.log(`[PROCESS] call logout() method`);
        return fetch(authentificationUrl.logout(), {isCORS: true});
    }
}
