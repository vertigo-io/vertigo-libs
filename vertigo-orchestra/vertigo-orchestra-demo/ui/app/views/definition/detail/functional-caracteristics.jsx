//librairies
import React, {PropTypes} from 'react';

// web components
import Panel from 'focus-components/components/panel';
import {mixin as formPreset} from 'focus-components/common/form';

//stores & actions
import processDefinitionStore from '../../../stores/process-definition';
import {caracteristicsActions} from '../../../action/process-definition';

export default React.createClass({
    displayName: 'ProcessFunctionalCaracteristics',
    propTypes: {
        id: PropTypes.string.isRequired
    },
    mixins: [formPreset],
    definitionPath: 'oProcessUi',
    stores: [{store: processDefinitionStore, properties: ['processCaracteristics']}],
    action: caracteristicsActions,

    /** @inheritDoc */
    renderContent() {
        return (
            <Panel title='view.process.detail.functionalCaracteristics'>
              {this.fieldFor('metadatas',  {hasLabel:false, contentSize:12})}
            </Panel>
        );
    }
});
