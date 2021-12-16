import {ERROR, LOGIN_FAILURE, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_SUCCESS, SUCCESS} from '../util/constants';
import {auth, loginWithEmailAndPassword} from './providers/Firebase';
import {getResponseObject} from '../util/ServiceResponse';


function UserService(apiProvider) {
    const userPath = '/users'

    const signup = (user) => apiProvider.post(`${userPath}/create`, user)
        .then((response) => {
            if (response.data.success) {
                return getResponseObject(SIGNUP_SUCCESS, {success: 'Success'})
            } else {
                return getResponseObject(SIGNUP_FAILURE,  {general: 'Error creating user.'})
            }
        })
        .catch((error) => {
            if (error.response !== undefined) {
                return getResponseObject(SIGNUP_FAILURE,  error.response.data)
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

    const getUserByDisplayName = (displayName) => {
        const params = { user: displayName}
        return apiProvider.get(`${userPath}/get`, {}, params)
            .then(res => getResponseObject(SUCCESS, res.data))
            .catch(error => getResponseObject(ERROR, { errorMsg: error }))
    }

    const changeProfileImage = (profileImageUrl) => apiProvider.post(`${userPath}/create`,
        {
            imageUrl: profileImageUrl
        })
        .catch(error => console.log('User Service Change Image Error:', error))

    const getLoggedInUser = () => apiProvider.get(`${userPath}/Get`,
            { Authorization: `Bearer ${auth.currentUser?.accessToken}` })
        .then(res => getResponseObject(SUCCESS, res.data))
        .catch(error => getResponseObject(ERROR, { errorMsg: error }))


    return { signup, login, getUserByDisplayName, changeProfileImage, getLoggedInUser }

}

export default UserService