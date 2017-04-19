import React, {PropTypes} from 'react';
import {component as QuickSearch} from 'focus-components/page/search/quick-search';
import {configuration} from './configuration';

function QuickSearchView({handleClosePopin}) {

    configuration.onLineClick = ((onLineClickFn, handleClosePopinFn) => {
        return (data) => {
            onLineClickFn(data);
            handleClosePopinFn();
        }
    })(configuration.onLineClick, handleClosePopin);

    return (
        <div data-demo="quick-search-view">
            <h5>Recherche rapide</h5>
            <QuickSearch {...configuration} showAllHandler={handleClosePopin} />
        </div>
    );
}

QuickSearchView.displayName = 'QuickSearchView';
QuickSearchView.propTypes = {
    onLineClick: PropTypes.func
};
export default QuickSearchView;
