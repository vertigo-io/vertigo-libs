// libraries
import React, {PropTypes} from 'react';

// web components
import ScrollspyContainer from 'focus-components/components/scrollspy-container';
import {component as BackButton} from 'focus-components/common/button/back';
import {cartridgeBehaviour} from 'focus-components/page/mixin';

//stores & actions
import {executeProcessActions} from '../../../action/process-executions';
//views
import FunctionalCaracteristics from './functional-caracteristics';
import TechnicalCaracteristics from './technical-caracteristics';
import Parameters from './parameters';
import ProcessExecutions from './process-executions';

import HeaderExpanded from './header-content-expanded';
import HeaderSummary from './header-content-summary';


export default React.createClass({
    displayName: 'ProcessDetailView',
    propTypes: {
        id: PropTypes.string.isRequired
    },
    mixins: [cartridgeBehaviour],

    /**
    * Related to the CartridgeBehaviour.
    * Define the cartridge configuration.
    * @return {[type]} [description]
    */
    cartridgeConfiguration() {
        const props = { hasLoad: false, hasForm: false }; //{id: this.props.id};
        return {
            barLeft: { component: BackButton },
            cartridge: { component: HeaderExpanded, props },
            summary: { component: HeaderSummary, props },
            canDeploy:false,
            actions: {
                primary: this._getGlobalPrimaryActions() || [],
                secondary: []
            }
        };
    },

    _getGlobalPrimaryActions() {
        const actions = [];
        actions.push( {label: '', icon: 'play_circle_outline', action:  () => { executeProcessActions.executeProcess(this.props.id)}});
        return actions;
    },

    /** @inheritDoc */
    render() {
        const {id} = this.props;
        return (
            <ScrollspyContainer gridContentSize={10} gridMenuSize={2}>
                <ProcessExecutions id={id} />
                <FunctionalCaracteristics id={id} />
                <TechnicalCaracteristics id={id} />
                <Parameters id={id} />
            </ScrollspyContainer>
        );
    }
});
