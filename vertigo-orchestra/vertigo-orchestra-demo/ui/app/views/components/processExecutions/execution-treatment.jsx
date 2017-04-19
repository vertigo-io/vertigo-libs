//librairies
import React, {PropTypes} from 'react';

// web components
import {mixin as formPreset} from 'focus-components/common/form';
import Panel from 'focus-components/components/panel';
//stores & actions
import processExecutionStore from '../../../stores/process-execution';
import {caracteristicsActions} from '../../../action/process-executions';

export default React.createClass({
    displayName: 'ProcessExecutionTreatment',
    propTypes: {
        id: PropTypes.number.isRequired
    },
    mixins: [formPreset],
    definitionPath: 'oProcessExecutionUi',
    stores: [{store: processExecutionStore, properties: ['processExecution']}],
    action: caracteristicsActions,

    componentWillMount(){
      this.action.load(this.props.id);
    },

    componentWillReceiveProps(newProps) {
      this.action.load(newProps.id)
    },

    /** @inheritDoc */
    renderContent() {
        const {hasLogFile, isEdit} = this.state;
        const preId = this.props.id;
        return (
            <Panel actions={this._renderActions} title='view.executions.detail.title' data-orchestra='item-detail'>
                {this.fieldFor('checked')}
                {!isEdit &&
                  this.fieldFor('checkingDate')
                }
                {this.fieldFor('checkingComment')}
            </Panel>
        );
    }
});
