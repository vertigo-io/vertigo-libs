import React, {Component, PropTypes} from 'react';
import {component as SmartList} from 'focus-components/page/list';
import  {component as ListComponent} from 'focus-components/list/selection/list'
import SummaryLine from './summary-card-line';

const propTypes = {
    LineComponent: PropTypes.element,
    action: PropTypes.func,
    columns: PropTypes.array,
    handleLineClick: PropTypes.func,
    store: PropTypes.object
};

function SummaryList({ action, store, columns, handleLineClick}) {
    return (
        <SmartList
            ListComponent={ListComponent}
            LineComponent={SummaryLine}
            action={{load: action}}
            columns={columns}
            store={store}
            isSelection={false}
            onLineClick={handleLineClick}

        />
    );
};

SummaryList.displayName = 'SummaryList';
SummaryList.propTypes = propTypes;
export default SummaryList;
