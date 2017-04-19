//librairies
import React, {PropTypes} from 'react';

// web components
import Panel from 'focus-components/components/panel';
import {mixin as formPreset} from 'focus-components/common/form';
import {component as Modal} from 'focus-components/application/popin';
import {component as Button} from 'focus-components/common/button/action';
import {translate} from 'focus-core/translation';

//stores & actions
import processExecutionStore from '../../../stores/process-execution';
import {summaryAction} from '../../../action/process-executions';

//views
import ProcessExecutions from '../../components/processExecutions';
import ProcessSummary from '../../components/processSummary'

export default React.createClass({
    displayName: 'ProcessExecutions',
    propTypes: {
        id: PropTypes.string.isRequired
    },
    mixins: [formPreset],
    definitionPath: 'oProcessUi',
    stores: [{store: processExecutionStore, properties: ['summary']}],
    action: summaryAction,

    getInitialState () {
        return {
            isProcessExecutionsModalOpen: false,
            name: this.props.id,
            initialStatus: null
        };
    },

    componentWillReceiveProps(nextProps){
      this.setState({
          name: nextProps.id,
          initialStatus: null
      });
    },

    _onProcessExecutionsModalToggle() {
        const {isProcessExecutionsModalOpen} = this.state;
        this.setState({
            isProcessExecutionsModalOpen: !isProcessExecutionsModalOpen
        });
        if (isProcessExecutionsModalOpen){
          this.setState({
              initialStatus: null
          });
        }
    },

    _onSummaryErrorClick() {
        this.setState({
            initialStatus: 'ERROR'
        });
        this._onProcessExecutionsModalToggle();
    },

    _onSummarySuccessClick() {
        this.setState({
            initialStatus: 'DONE'
        });
        this._onProcessExecutionsModalToggle();
    },

    /** @inheritDoc */
    renderContent() {
        const {isProcessExecutionsModalOpen, initialStatus, name} = this.state;
        const {errorsCount, successfulCount, misfiredCount, averageExecutionTime, health} = this.state;
        return (
            <Panel title='view.process.detail.executions' data-orchestra="process-executions-panel">
                <ProcessSummary
                  errorsCount={errorsCount}
                  successfulCount={successfulCount}
                  misfiredCount={misfiredCount}
                  averageExecutionTime={averageExecutionTime}
                  health={health}
                  handleErrorClick={this._onSummaryErrorClick}
                  handleSuccessClick={this._onSummarySuccessClick} />
                <Button label={translate('button.viewAllExecutions')} type='button' handleOnClick={this._onProcessExecutionsModalToggle} />
                {isProcessExecutionsModalOpen &&
                    <div>
                        <Modal open={true} type='from-right' size="large" onPopinClose={this._onProcessExecutionsModalToggle}>
                          <ProcessExecutions id={name} initialStatus={initialStatus} />
                        </Modal>
                    </div>
                }
            </Panel>

        );
    }
});
