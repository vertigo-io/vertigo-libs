//dependencies
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {identity} from 'lodash/utility';
import ComponentBaseBehaviour from 'focus-components/behaviours/component-base';
import MDBehaviour from 'focus-components/behaviours/material';
import {translate} from 'focus-core/translation';
import {component as Icon} from 'focus-components/common/icon';
const MODE = {isEdit: true};

const propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    expandIcon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func,
    placeholder: PropTypes.string,
    unformatter: PropTypes.func,
    formatter: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

const defaultProps = {
    disabled: false,
    formatter: identity,
    unformatter: identity,
    type: 'text'
};

/**
* Component standing for an HTML input.
*/
@MDBehaviour('inputText')
@ComponentBaseBehaviour
class InputExpandableText extends Component {

    /**
    * Get the dom value of the component.
    * @return {object} - The unformated dom value.
    */
    getValue = () => {
        const {unformatter} = this.props;
        const domEl = ReactDOM.findDOMNode(this.refs.htmlInput);
        return unformatter(domEl.value, MODE);
    };
    /**
    * Handle the change on the input text, it only propagate the value.
    * @param  {object} evt - The react DOM event.
    * @return {object} - The function onChannge from the props, called.
    */
    _handleInputChange = (evt) => {
        const {unformatter, onChange} = this.props;
        const {value} = evt.target;
        return onChange(unformatter(value, MODE));
    };

    /**
     * @inheritdoc
     * @override
    */
    render() {
        const {error, expandIcon, name, placeholder, style, value: rawValue, formatter, ...otherProps} = this.props;
        const value = formatter(rawValue, MODE);
        const pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        const inputProps = {...otherProps, value, id: name, onChange: this._handleInputChange, pattern};
        const cssClass = `mdl-textfield mdl-js-textfield mdl-textfield--expandable${error ? ' is-invalid' : ''}`;
        return (
            <div className={cssClass} data-focus='input-expandable-text' ref='inputText'>
                <label className='mdl-button mdl-js-button mdl-button--icon' htmlFor={name}>
                    <Icon name={expandIcon} />
                </label>
                <div className='mdl-textfield__expandable-holder'>
                    <input className='mdl-textfield__input' ref='htmlInput' {...inputProps} />
                    <label className='mdl-textfield__label' htmlFor='sample-expandable'>{this.i18n(placeholder)}</label>
                    {error && <span className='mdl-textfield__error'>{error}</span>}
                </div>
            </div>
        );
    };

}

//Static props.
InputExpandableText.displayName = 'InputExpandableText';
InputExpandableText.defaultProps = defaultProps;
InputExpandableText.propTypes = propTypes;

export default InputExpandableText;
