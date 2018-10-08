/**
 * Created by juliusz.jakubowski@gmail.com on 08.10.18.
 */


export default ( state = {}, action ) => {
    switch (action.type) {
        case 'SERVER_SETTINGS_ACTION':
            return {
                result: action.payload
            };
        default:
            return state;
    }
}