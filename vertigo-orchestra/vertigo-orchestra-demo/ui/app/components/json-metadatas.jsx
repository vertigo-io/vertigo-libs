import React, {Component, PropTypes} from 'react';
import {translate} from 'focus-core/translation';

export default React.createClass({

    _parseValue(jsonValue){
      if (jsonValue){
        return JSON.parse(jsonValue);
      }
    },


    render() {
        let obj = this._parseValue(this.props.value);
        if (obj != null) {
          return(<div>
                  {Object.keys(obj).map((o,i) => (
                    <div className="mdl-grid" data-focus="field" >
                      <div className="mdl-cell mdl-cell--4-col" data-focus="field-label-container">
                          <label data-focus="label">{translate('metadatas.labels.'+o)}</label>
                      </div>
                      <div className="mdl-cell mdl-cell--8-col" data-focus="field-value-container">
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
