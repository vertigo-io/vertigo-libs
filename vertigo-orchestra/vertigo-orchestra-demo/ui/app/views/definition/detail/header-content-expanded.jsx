// libraries
import React from 'react';
import {translate} from 'focus-core/translation';

//web components
import {mixin as formPreset} from 'focus-components/common/form';

//stores
import processDefinitionStore from '../../../stores/process-definition';

//custom components

export default React.createClass({
    displayName: 'MovieDetailHeaderExpanded',
    mixins: [formPreset],
    definitionPath: 'oProcessUi',
    stores: [{store: processDefinitionStore, properties: ['processCaracteristics']}],

    /** @inheritDoc */
    renderContent() {
        const {title, trailerHRef} = this.state;
        return (
            <div data-demo='header-content-expanded'>
                <div data-demo='header-content-expanded__infos'>
                    <h3>{this.textFor('label')}</h3>
                </div>
            </div>
        );
    }
})
