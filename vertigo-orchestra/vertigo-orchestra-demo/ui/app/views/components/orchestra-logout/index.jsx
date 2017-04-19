import React, {Component, PropTypes} from 'react';
import {component as Button} from 'focus-components/common/button/action';
import history from 'focus-core/history';
import authentificationServices from '../../../services/authentification';

export default React.createClass({
    displayName: 'OrchestraLogout',

    _onLogoutClick() {
        authentificationServices.logout().then(() => {
            window.location.replace(`./`);
        });
    },

    render() {
        return (
            <div onClick={this._onLogoutClick}>
              <Button label='Déconnexion' type='button' shape='icon' icon='power_settings_new' color='primary' handleOnClick={this._onLogoutClick} />
            </div>
        );
    }
});
