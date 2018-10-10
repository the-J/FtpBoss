/**
 * Created by juliusz.jakubowski@gmail.com on 08.10.18.
 */


export const serverSettings = ( settings ) => dispatch => {
    dispatch({
        type: 'SERVER_SETTINGS_ACTION',
        payload: settings
    });
};