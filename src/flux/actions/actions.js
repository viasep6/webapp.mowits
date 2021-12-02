import dispatcher from '../dispatcher';
import {GET_USER_BY_USERNAME, LOGIN, LOGOUT, SIGNUP} from '../../util/constants';


// log user out and clear details
export const logout = () => {
    dispatcher.dispatch({
        type: LOGOUT
    })
}

export const login = (username, password) => {
    dispatcher.dispatch( {
        type: LOGIN,
        payload: {username: username, password: password}
    })
}

export const signup = (username, email, password) => {
    dispatcher.dispatch({
        type: SIGNUP,
        payload: {displayName: username, email: email, password:password}
    })
}

export const getUserByUsername = (username) => {
    dispatcher.dispatch({
        type: GET_USER_BY_USERNAME,
        payload: username
    })
}



// // eslint-disable-next-line import/no-anonymous-default-export
// export default {
//
// }