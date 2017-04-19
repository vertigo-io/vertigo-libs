//librairies
import React from 'react';
import {translate} from 'focus-core/translation';
import {mixin as LinePreset} from 'focus-components/list/selection/line'

import ProcessSummary from '../../components/processSummary'


const SummaryLine = React.createClass({
    displayName: 'SummaryLine',
    mixins: [LinePreset],
    definitionPath: 'oExecutionSummary',



    renderLineContent() {
        const {errorsCount, successfulCount, misfiredCount, averageExecutionTime, health} = this.props.data;
        return (
            <div data-orchestra='summary-line-content' >
                <div data-orchestra='name' >
                {this.textFor('processLabel')}
                </div>
                <div data-orchestra='counts'>
                  <ProcessSummary
                    errorsCount={errorsCount}
                    successfulCount={successfulCount}
                    misfiredCount={misfiredCount}
                    averageExecutionTime={averageExecutionTime}
                    health={health}
                    handleErrorClick={() => {}}
                    handleSuccessClick={() => {}} />
                </div>
                <div data-orchestra='last'>
                <span>{translate('view.home.line.lastExecutionTime')}</span>
                <br/>
                {this.textFor('lastExecutionTime')}
                </div>
                <div data-orchestra='next'>
                <span>{translate('view.home.line.nextExecutionTime')}</span>
                <br/>
                {this.textFor('nextExecutionTime')}
                </div>
            </div>
        );
    }
});

export default SummaryLine;
