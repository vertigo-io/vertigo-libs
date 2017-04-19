import React, {Component, PropTypes} from 'react';
import {translate} from 'focus-core/translation';


export default React.createClass({

    _parseValue(jsonValue){
      if (jsonValue){
        return JSON.parse(jsonValue);
      }
    },

    _isDisplayed(key){
      switch (key) {
        case 'processExecutionId':
        case 'activityExecutionId':
        case 'token':
        case 'processName':
        case 'status':
        case 'logFile':
          return false;
        default:
          return true;
      }
      return true;
    },

    render() {
        let obj = this._parseValue(this.props.value);
        if (obj != null) {
          return(<div data-orchestra="jsonInput">
                  {Object.keys(obj).map((o,i) => (
                    this._isDisplayed(o) &&
                    <div className="mdl-grid" data-orchestra="json-field">
                      <div className="mdl-cell mdl-cell--4-col" data-focus="field-label-container" data-orchestra="json-field-label">
                          <label data-focus="label">{o}</label>
                      </div>
                      <div className="mdl-cell mdl-cell--8-col" data-focus="field-value-container" data-orchestra="json-field-value">
                        <div className="mdl-textfield mdl-js-textfield is-dirty is-upgraded" data-focus="input-text" data-upgraded=",MaterialTextfield" data-orchestra="paramInput">
                            <input className='mdl-textfield__input' ref={'params.'+o} defaultValue={obj[o]} />
                            <label className='mdl-textfield__label' />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>);
        } else {
          return(<div>

            </div>);
        }
    },

    getValue() {
        let obj = this._parseValue(this.props.value);
        if (obj != null) {
          Object.keys(obj).map((o,i) => (
                obj[o] = this.refs['params.'+o].value
          ));
          var res = JSON.stringify(obj);
          return res;
        }
        return '';
    }
});
