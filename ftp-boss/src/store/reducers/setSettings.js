/**
 * Created by juliusz.jakubowski@gmail.com on 15.10.18.
 */

export default ( state = {}, action ) => {
    switch (action.type) {
        case 'SET_SETTINGS':
            return {
                result: action.payload
            };
        default:
            return state;
    }
}