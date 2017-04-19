import keys from 'lodash/object/keys';
import trim from 'lodash/string/trim';

export default {

    /**
    * Transform an objet to an array.
    * @param  {object} data object to transform
    * @param  {string} key  property key to transform
    */
    _transformSearchResponseObjectToArray(data, key) {
        const obj = data[key];
        data[key] = keys(obj).reduce((arr, key) => {
            const arrObj = {};
            arrObj[key] = obj[key];
            arr.push(arrObj);
            return arr;
        }, []);
    },

    /**
    * Transform an old search response
    * @param  {object} data search response to transform
    * @return {object}      transform repsonse object
    */
    transformResponse(data) {
        if(data.groups){
            this._transformSearchResponseObjectToArray(data, 'groups');
        }
        if(data.facets) {
            this._transformSearchResponseObjectToArray(data, 'facets');
            data.facets.map((facet) => {
                keys(facet).map((key) => {
                    this._transformSearchResponseObjectToArray(facet, key);
                });
            });
        }
        return data;
    },

    /**
     * Transform the configuration send to server to fit new search api contract
     * @param  {object} config          search configuration that will be sent to the server
     * @param  {boolean} includeFacets  indicates whether the facets should be included in the configuration or not
     * @return {object}                 the configuration that fits to new search api contract
     */
    transformConfig(config, includeFacets = true) {
        const {data} = config;
        const {criteria, facets, group} = data;
        const {query} = criteria;
        const trimmedGroup = trim(group);
        config.data = { criteria: query };
        if(includeFacets) {
            config.data['facets'] = facets;  // we should have to do this. check with backend API to remove that.
        }
        if(trimmedGroup.length > 0) {
            config.data['group'] = trimmedGroup;
        }
        return config;
    },

};
