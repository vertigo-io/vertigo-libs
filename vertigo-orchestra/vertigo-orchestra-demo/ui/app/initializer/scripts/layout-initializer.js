import React from 'react';
import render from 'focus-core/application/render';
import Layout from 'focus-components/components/layout';
import DemoMenuLeft from '../../views/menu/menu-left';
import DemoFooter from '../../views/footer';

export default () => {
    console.info('|--- LAYOUT');

    render(Layout, `.${__ANCHOR_CLASS__}`, {
        props: {
            MenuLeft: DemoMenuLeft,
            Footer: DemoFooter
        }
    });
}
