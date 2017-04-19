// libraires
import React, {PropTypes, Component} from 'react';
import Translation from 'focus-components/behaviours/translation';
import formatter from  'focus-core/definition/formatter/number';
import history from 'focus-core/history';
import {quickSearchStore} from 'focus-core/search/built-in-store';
import dispatcher from 'focus-core/dispatcher';

//web components
import {component as Button} from 'focus-components/common/button/action';

const propTypes = {
    count: PropTypes.number.isRequired,
    groupKey: PropTypes.string.isRequired,
    showAllHandler: PropTypes.func
};

const defaultProps = {
    count: 0
};

@Translation
class QuickSearchGroup extends Component {

    render() {
        const {children} = this.props;
        return (
          <div data-focus="group-container">
             <div data-focus="group-container-results">
                 {children}
             </div>
         </div>
        );
    }
}

QuickSearchGroup.propTypes = propTypes;
QuickSearchGroup.defaultProps = defaultProps;
QuickSearchGroup.displayName = 'QuickSearchGroup';

export default QuickSearchGroup;
