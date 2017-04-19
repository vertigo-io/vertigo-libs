import fetch from 'focus-core/network/fetch';
import {loadError as loadErrorUrlGenerator} from '../config/server/test';

export function loadError() {
    return fetch(loadErrorUrlGenerator());
}
