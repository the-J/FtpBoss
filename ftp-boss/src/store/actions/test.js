/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

export const testAction = () => dispatch => {
    dispatch({
        type: 'TEST_ACTION',
        payload: 'result_of_test_action'
    })
}