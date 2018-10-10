/**
 * Created by juliusz.jakubowski@gmail.com on 10.10.18.
 */

export const currentPath = ( path ) => dispatch => {
    dispatch({
        type: 'CURRENT_PATH_ACTION',
        payload: path
    });
};