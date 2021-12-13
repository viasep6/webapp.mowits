import {LOGIN_FAILURE, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_SUCCESS} from '../util/constants';
import {loginWithEmailAndPassword} from './providers/Firebase';

function UserService(apiProvider) {
    const userPath = '/users'

    const signup = async (user) => await apiProvider.post(`${userPath}/create`, user)
        .then((response) => {
            if (response.data.success) {
                return getResponseObject(SIGNUP_SUCCESS, {success: 'Success'})
            } else {
                return getResponseObject(SIGNUP_FAILURE,  {general: 'Error creating user.'})
            }
        })
        .catch((error) => {
            if (error.response !== undefined) {
                return getResponseObject(SIGNUP_FAILURE,  {general: error.response.data})
            } else {
                return getResponseObject(SIGNUP_FAILURE,  {general: 'Unknown error occurred'})
            }
        });

    const login = (username, password) => {
        return loginWithEmailAndPassword(username, password).then(response => {
            let token = response.user.accessToken;
            if (token !== null) {
                return getResponseObject(LOGIN_SUCCESS, {user: response.user})
            } else {
                return getResponseObject(LOGIN_FAILURE, {general: 'Error validating login. try again later.'})
            }
        }).catch((error) => {
            if (error.message.includes('invalid-email') || error.message.includes('user-not-found')) {
                return getResponseObject(LOGIN_FAILURE, {email: 'invalid email'})
            } else if (error.message.includes('wrong-password')) {
                return getResponseObject(LOGIN_FAILURE, {password: 'Wrong password'})
            } else {
                return getResponseObject(LOGIN_FAILURE, {general: 'could not login'})
            }
        });
    }

    const getResponseObject = (status, payload) => {
        return {
            state: status,
            payload: payload
        }
    }

    return { signup, login}

}

export default UserService