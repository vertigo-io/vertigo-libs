import fetch from 'focus-core/network/fetch';

import definitionsUrl from '../config/server/definitions';

import searchParser from './helpers/old-search-parser';

const ENABLE_NEW_SEARCH_API = false;

export default {

    _nofacetServerResult(serverData) {
        return {groups :{
                        'processus' : serverData
                      },
                totalCount: serverData.length
                };
    },



    /**
     * Target search service call.
     * (This should the target : search service should be written this way.)
     *
     * @param  {object} config search call configuration.
     * @param  {string} scope  scope search
     * @return {object}        search response
     */
    _search(config, scope) {
            console.log(`[SEARCH PROCESSUS] config: ${JSON.stringify(config)}`);
            return fetch(definitionsUrl.search(config))
            .then(this._nofacetServerResult);
    },

    /**
    * Search with scope.
    * @param  {Object} AdvancedSearch config that launches the call of this service
    * @return {Promise}
    */
    scoped(config) {
        /*const {criteria} = config.data;
        const {scope} = criteria;*/
        // we only have one scope
        const serverConfig = searchParser.transformConfig(config, false);
        return this._search(serverConfig);
    },
    /**
    * Search without scope.
    * @param  {Object} AdvancedSearch config that launches the call of this service
    * @return {Promise}
    */
    unscoped(config) {
        const serverConfig = searchParser.transformConfig(config, false);
        return this._search(serverConfig);
    }
};
