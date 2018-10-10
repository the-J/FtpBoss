/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

import { combineReducers } from 'redux';

import serverSettings from './reducers/serverSettings';
import currentPath from './reducers/currentPath';

export default combineReducers({
    serverSettings,
    currentPath
});