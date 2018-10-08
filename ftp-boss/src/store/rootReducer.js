/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

import { combineReducers } from 'redux';

import test from './reducers/test';
import serverSettings from './reducers/serverSettings';

export default combineReducers({
    test,
    serverSettings
});