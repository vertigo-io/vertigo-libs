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
          return(<div>
                  {Object.keys(obj).map((o,i) => (
                    this._isDisplayed(o) &&
                    <div className="mdl-grid" data-orchestra="json-field" data-focus="field">
                      <div className="mdl-cell mdl-cell--4-col" data-focus="field-label-container" data-orchestra="json-field-label">
                          <label data-focus="label">{o}</label>
                      </div>
                      <div className="mdl-cell mdl-cell--8-col" data-focus="field-value-container" data-orchestra="json-field-value">
                        {obj[o]}
                      </div>
                    </div>
                  ))}
              </div>);
        } else {
          return(<div>

            </div>);
        }
    }
});
