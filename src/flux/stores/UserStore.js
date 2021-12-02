import {EventEmitter} from 'events';
import {
    CHANGE_AUTH_TOKEN, GET_USER_BY_USERNAME, LOGIN_FAILURE, LOGIN_SUCCESS, URL_GET_USER,
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

        dispatcher.register(action => {
            switch (action.type) {
                case GET_USER_BY_USERNAME:
                    this.getUserByDisplayName(action.payload);
                    break;

                default:
                    break;
            }
        });

        authStore.on(CHANGE_AUTH_TOKEN, this.authUserChanged);

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
                this.emit(LOGIN_SUCCESS, response.data.userCredentials);
            })
            .catch((error) => {
                this.emit(LOGIN_FAILURE, {errorMsg: 'Error retrieving the data.'});
            });
    };

    getUserByDisplayName = (displayName) => {

        axios.get(URL_GET_USER + `?user=${displayName}`)
            .then((response) => {
                this.emit(GET_USER_BY_USERNAME, response.data);
            })
            .catch((error) => {
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