import builder from 'focus-core/util/url/builder';
import {apiRoot} from './index';

const authentificationRoot = `${apiRoot}authentification/`;

export default {
    logout: builder(authentificationRoot + 'logout', 'GET'),
};
