import {config} from 'focus-core/reference';

// load here all your reference lists
export default () => {
    console.info('|--- REFERENCES');

    config.set({
        scopes: () => {
            return Promise.resolve(
                //here call your webservice to get scope references
                [
                    {code: 'processus', label: 'search.scope.processus'}
                ]
            ).then(scopes => {
                //here define application icons
                scopes.map(_applyAdditionalScopeProperties);
                return scopes  ;
            });
        }
    });
}

function _applyAdditionalScopeProperties(scope) {
    switch (scope.code) {
        case 'processus':
            scope.icon = 'swap_horiz';
            break;
        default:
            scope.icon = 'mood_bad'
            break;
    }
}
