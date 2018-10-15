/**
 * Created by juliusz.jakubowski@gmail.com on 15.10.18.
 */

export const setSettings = settings => dispatch => {
    dispatch({
        type: 'SET_SETTINGS',
        payload: settings
    });
};