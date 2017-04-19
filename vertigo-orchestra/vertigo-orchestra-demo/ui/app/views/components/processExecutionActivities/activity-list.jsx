import React, {Component, PropTypes} from 'react';
import {component as SmartList} from 'focus-components/page/list';
import  {component as ListComponent} from 'focus-components/list/timeline/list'
import ActivityExecutionLine from './activity-line';

const propTypes = {
    id: PropTypes.number.isRequired,
    LineComponent: PropTypes.element,
    action: PropTypes.func,
    columns: PropTypes.array,
    handleLineClick: PropTypes.func,
    store: PropTypes.object
};

function ActivitiesExecutionsList({handleLineClick, action, store, columns}) {
    return (
        <SmartList
            ListComponent={ListComponent}
            LineComponent={ActivityExecutionLine}
            action={{load: action}}
            columns={columns}
            onLineClick={handleLineClick}
            store={store}
            isSelection={false}
        />
    );
};

ActivitiesExecutionsList.displayName = 'ActivitiesExecutionsList';
ActivitiesExecutionsList.propTypes = propTypes;
export default ActivitiesExecutionsList;
