/**
 * Created by juliusz.jakubowski@gmail.com on 10.10.18.
 */

export default ( state = {}, action ) => {
    switch (action.type) {
        case 'CURRENT_PATH_ACTION':
            return {
                result: action.payload
            };
        default:
            return state;
    }
}