import React, {PropTypes} from 'react';


// web components
import Panel from 'focus-components/components/panel';
import ActivityExecutionsList from './activity-list'
import ActivityCaracteristics from './activity-execution-caracteristics';

//stores & actions
import activityExecutionsListStore from '../../../stores/activity-executions-list';
import {loadActivityExecutionsActions} from '../../../action/process-executions';

//cartridge configuration


export default React.createClass({
    displayName: 'ProcessExecutionActivitiesList',
    action: undefined,
    propTypes: {
        id: PropTypes.number.isRequired
    },
    componentWillMount() {
      this.action=loadActivityExecutionsActions(this.props.id);
    },
    getInitialState () {
        return {
            aceId: null
        };
    },

    componentWillReceiveProps(newProps) {
        this.action.updateProperties({criteria : {id:newProps.id}});
        this.setState({aceId: null});
    },

    onLineClick(d){
      this.setState({aceId: d.aceId});

    },

    /** @inheritDoc */
    render() {
        const {id} = this.props;
        const {aceId} = this.state;
        return (
              <div data-orchestra='activityExecutions-list'>
                <div data-orchestra='timeline'>
                  <ActivityExecutionsList
                      id = {id}
                      action={this.action.load}
                      columns={[]}
                      store={activityExecutionsListStore}
                      handleLineClick={this.onLineClick}
                   />
                </div>
                <div data-orchestra='detail'>
                   {aceId !== null &&
                      <ActivityCaracteristics id={aceId} />
                   }
                </div>
              </div>

        );
    }
});
