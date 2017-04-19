//libraries
import React, {PropTypes} from 'react';

//web components
import {mixin as lineMixin} from 'focus-components/list/selection/line'

export default React.createClass({
    displayName: 'ProcessLine',
    mixins: [lineMixin],
    definitionPath: 'oProcessUi',
    propTypes: {
        data: PropTypes.object.isRequired
    },
    renderLineContent() {
        const {data} = this.props;
        const {proId} = data;
        return (
            <div key={proId}>
              {this.textFor('label')}
            </div>
        );
    }
});
