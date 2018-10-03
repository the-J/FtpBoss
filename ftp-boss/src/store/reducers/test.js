/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

export default ( state = {}, action ) => {
    switch (action.type) {
        case 'TEST_ACTION':
            return {
                result: action.payload
            };
        default:
            return state;
    }
}