import React, {PropTypes} from 'react';
import {translate} from 'focus-core/translation';

// web components
import Panel from 'focus-components/components/panel';
import {component as Button} from 'focus-components/common/button/action';
import ProcessExecutionsList from './processExecutions-list'
import ProcessExecutionsActivities from '../processExecutionActivities'
import ExecutionCaracteristics from './execution-caracteristics';
import ExecutionTreatment from './execution-treatment';

//stores & actions
import processExecutionListStore from '../../../stores/process-executions-list';
import activityExecutionsListStore from '../../../stores/activity-executions-list';


//cartridge configuration


export default React.createClass({
    displayName: 'ProcessExecutionsList',

    propTypes: {
        id: PropTypes.number.isRequired,
        initialStatus: PropTypes.string
    },




    getInitialState () {
        return {
            proId: this.props.id,
            preId: null,
            status: null,
            activeTab: 'ACTIVITIES'
        };
    },

    componentWillMount(){
        this.setState({status: this.props.initialStatus});
    },


    _onProcessExecutionLineClick(d) {
        this.setState({preId: d.preId});

    },

    _onErrorClick(d) {
        this.setState({status: 'ERROR', preId:null});

    },

    _onAllClick(d) {
        this.setState({status:null, preId:null});

    },
    _onSuccessClick(d) {
        this.setState({status:'DONE', preId:null});

    },

    _onActivitiesClick(d) {
        this.setState({activeTab:'ACTIVITIES'});

    },

    _onTreatmentClick(d) {
        this.setState({activeTab:'TREATMENT'});

    },


    /** @inheritDoc */
    render() {
        //const {id} = this.props;
        const {proId, status, preId, activeTab} = this.state;
        return (
          <div data-orchestra='processExecutions-list'>
            <div data-orchestra='panel-left'>
              <div data-orchestra='header'>
                <div data-orchestra='filter'>
                  <Button label='Tout' type='button' shape='fab' icon='done_all' handleOnClick={this._onAllClick} />
                  <Button label='Err' type='button' shape='fab' icon='report_problem'  handleOnClick={this._onErrorClick} />
                  <Button label='Succ' type='button' shape='fab' icon='verified_user' handleOnClick={this._onSuccessClick} />
                </div>
              </div>
              <div data-orchestra='timeline'>
                <ProcessExecutionsList
                    id = {proId}
                    status = {status}
                    columns={[]}
                    store={processExecutionListStore}
                    handleLineClick={d => this.setState({preId: d.preId})}
                 />
              </div>
            </div>
            <div data-orchestra='item-detail'>
               {preId !== null &&
                 <div>
                  <div>
                    <ExecutionCaracteristics id={preId} />
                  </div>
                  <div className='mdl-tabs mdl-js-tabs mdl-js-ripple-effect'>
                    <div className="mdl-tabs__tab-bar">
                        <Button label={translate('view.executions.detail.tabs.activities')} type='button' handleOnClick={this._onActivitiesClick} className={activeTab === 'ACTIVITIES' ? 'active' : 'inactive'} />
                        <Button label={translate('view.executions.detail.tabs.treatment')} type='button' handleOnClick={this._onTreatmentClick} className={activeTab === 'TREATMENT' ? 'active' : 'inactive'}/>
                    </div>
                    { activeTab === 'ACTIVITIES' &&
                    <div className="mdl-tabs__panel is-active">
                      <ProcessExecutionsActivities id={preId} />
                    </div>
                    }
                    { activeTab === 'TREATMENT' &&
                    <div className="mdl-tabs__panel is-active">
                      <ExecutionTreatment id={preId} />
                    </div>
                    }
                  </div>
                </div>
               }
            </div>
          </div>

        );
    }
});
