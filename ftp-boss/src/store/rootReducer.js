/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

import { combineReducers } from 'redux';

import serverSettings from './reducers/serverSettings';
import currentPath from './reducers/currentPath';
import setSettings from './reducers/setSettings';

export default combineReducers({
    serverSettings,
    currentPath,
    setSettings
});