//librairies
import React from 'react';
import {translate} from 'focus-core/translation';
import history from 'focus-core/history';
import {mixin as lineMix} from 'focus-components/list/timeline/line';


const ProcessExecutionsLine = React.createClass({
    displayName: 'ProcessExecutionsLine',
    mixins: [lineMix],
    definitionPath: 'oProcessExecutionUi',

    getClassFromStatus(status){
      switch (status) {
        case 'DONE':
            return 'done';
        case 'ERROR':
            return 'error';
        case 'RUNNING':
            return 'running';
        default:
            return '';

      }
    },

    renderLineContent() {
        return (
            <div >
                {this.textFor('beginTime')}
                <div data-orchestra="status-indicator" className={this.getClassFromStatus(this.props.data.status)}></div>
            </div>
        );
    }
});

export default ProcessExecutionsLine;
