//librairies
import React from 'react';
import {translate} from 'focus-core/translation';

//web components
import {mixin as formPreset} from 'focus-components/common/form';

//stores
import processDefinitionStore from '../../../stores/process-definition';

//custom components

export default React.createClass({
    displayName: 'MovieDetailHeaderSummary',
    mixins: [formPreset],
    definitionPath: 'oProcessUi',
    stores: [{store: processDefinitionStore, properties: ['processCaracteristics']}],

    /** @inheritDoc */
    renderContent() {
        const {title} = this.state;
        return (
            <div data-demo='header-content-summary'>
                <h4>{this.textFor('label')}</h4>
            </div>
        );
    }
})
