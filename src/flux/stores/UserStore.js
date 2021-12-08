import {EventEmitter} from 'events';
import {
    CHANGE_AUTH_TOKEN,
    GET_USER_BY_USERNAME,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    SET_USER_PROFILE_IMAGE, SIGNUP_FAILURE, SIGNUP_SUCCESS, URL_CHANGE_PROFILE_IMAGE,
    URL_GET_USER,
    URL_SIGNUP,
} from '../../util/constants';
import axios from 'axios';
import dispatcher from '../dispatcher';

export class UserStore extends EventEmitter {

    constructor(authStore) {
        super(authStore);
        this.state = {
            loggedInUser: null,
            authUser: null,
        };

        this.defaultProfileImage = require('../../assets/img/defaultprofile.jpg').default;

        dispatcher.register(action => {
            switch (action.type) {
                case GET_USER_BY_USERNAME:
                    this.getUserByDisplayName(action.payload);
                    break;
                case SET_USER_PROFILE_IMAGE:
                    this.changeProfileImage(action.payload);
                    break;
                default:
                    break;
            }
        });

        authStore.authAddChangeListener(CHANGE_AUTH_TOKEN, this.authUserChanged);

    }

    changeProfileImage(profileImageUrl) {
        axios.post(URL_CHANGE_PROFILE_IMAGE, {imageUrl: profileImageUrl})
            .then((response) => {
                if (response.data.success) {

                } else {

                }
            })
            .catch((error) => {
                if (error.response !== undefined) {

                } else {

                }
            });
    }

    authUserChanged = (user) => {
        if (this.state.authUser !== user) {
            this.state = {
                ...this.state,
                authUser: user,
            };
            if (user !== null) {
                this.getLoggedInUser();
            }
        }
    };

    getLoggedInUser = () => {
        axios.defaults.headers.common = {Authorization: `Bearer ${this.state.authUser.accessToken}`};
        axios.get(URL_GET_USER)
            .then((response) => {
                this.state = {
                    ...this.state,
                    loggedInUser: response.data.userCredentials,
                };

                if (!this.state.loggedInUser.profileImage) {
                    this.state.loggedInUser.profileImage = this.defaultProfileImage;
                }

                this.emit(LOGIN_SUCCESS, response.data.userCredentials);
            })
            .catch((error) => {
                this.emit(LOGIN_FAILURE, {errorMsg: 'Error retrieving the data.'});
            });
    };

    getUserByDisplayName = (displayName) => {
        axios.get(URL_GET_USER + `?user=${displayName}`)
            .then((response) => {
                if (!response.data.profileImage) {
                    response.data.profileImage = this.defaultProfileImage;
                }
                this.emit(GET_USER_BY_USERNAME, response.data);
            })
            .catch(error => {
                this.emit(GET_USER_BY_USERNAME, null);
            });

    };

    userAddChangeListener = (event, callback) => {
        this.on(event, callback);
    };

    userRemoveChangeListener = (event, callback) => {
        this.off(event, callback);
    };

}