import 'babel-preset-focus/dist/focus-polyfill';

import orchestraConf from '../package.json';
import focusCoreConf from 'focus-core/package.json';
import focusComponentsConf from 'focus-components/package.json';

console.info(
    `
        ORCHESTRA APP
        version: ${orchestraConf.version}
        focus-core: ${focusCoreConf.version}
        focus-components: ${focusComponentsConf.version}
        web: http://getfocus.io
    `
);

console.log('#########################[INIT]#######################################');
// initializers before DOM CONTENT LOADED
const beforeDomContentLoadedScript = require('./initializer/before');
beforeDomContentLoadedScript.initialize();

// initializers after DOM CONTENT LOADED
const onDOMContentLoaded = () => {
    const afterDomContentLoadedScript = require('./initializer/after');
    afterDomContentLoadedScript.initialize();
    console.log('#########################[START APP]############################');
    require('./application')();
    console.log('#########################[APP STARTED]##########################');
};

window.onDOMContentLoaded = onDOMContentLoaded;

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

//import app demo styles
import './styles';
