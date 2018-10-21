/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

import { combineReducers } from 'redux';

import currentPath from './reducers/currentPath';
import settings from './reducers/settings';

export default combineReducers({
    currentPath,
    settings
});