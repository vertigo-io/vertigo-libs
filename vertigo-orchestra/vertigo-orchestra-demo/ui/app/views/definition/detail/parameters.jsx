//librairies
import React, {PropTypes} from 'react';

// web components
import Panel from 'focus-components/components/panel';
import {mixin as formPreset} from 'focus-components/common/form';

//stores & actions
import processDefinitionStore from '../../../stores/process-definition';
import {initialParamsActions} from '../../../action/process-definition';

export default React.createClass({
    displayName: 'ProcessParamaters',
    propTypes: {
        id: PropTypes.string.isRequired
    },
    mixins: [formPreset],
    definitionPath: 'oProcessUi',
    stores: [{store: processDefinitionStore, properties: ['processCaracteristics']}],
    action: initialParamsActions,

    /** @inheritDoc */
    renderContent() {
        return (
            <Panel actions={this._renderActions} title='view.process.detail.parameters'>
                {this.fieldFor('initialParams',  {hasLabel:false, contentSize:12})}
            </Panel>
        );
    }
});
