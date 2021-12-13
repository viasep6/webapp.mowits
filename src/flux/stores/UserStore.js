import {EventEmitter} from 'events';
import {
    CHANGE_AUTH_TOKEN, ERROR,
    GET_USER_BY_USERNAME, LOGGED_IN_USER,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    SUCCESS,
} from '../../util/constants';
import dispatcher from '../dispatcher';
import * as actions from '../../flux/actions/actions';


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
                    this.userByDisplayNameReceived(action.payload);
                    break
                case LOGGED_IN_USER:
                    this.loggedInUserReceived(action.payload)
                    break
                default:
                    break;
            }
        });

        authStore.authAddChangeListener(CHANGE_AUTH_TOKEN, this.authUserChanged);
    }

    authUserChanged = (user) => {
        if (this.state.authUser !== user) {
            this.state = {
                ...this.state,
                authUser: user,
            };
            if (user !== null) {
                actions.getLoggedInUser()
            }
        }
    };

    loggedInUserReceived = (result) => {
        switch (result.state) {
            case SUCCESS:
                this.state = {
                    ...this.state,
                    loggedInUser: result.data.userCredentials,
                };

                if (!this.state.loggedInUser.profileImage) {
                    this.state.loggedInUser.profileImage = this.defaultProfileImage;
                }

                this.emit(LOGIN_SUCCESS, result.data.userCredentials);

                break
            case ERROR:
                this.emit(LOGIN_FAILURE, result.data);
                break
            default:
                break
        }
    }

    userByDisplayNameReceived = (result) => {
        switch (result.state) {
            case SUCCESS:
                if (!result.data.profileImage) {
                    result.data.profileImage = this.defaultProfileImage;
                }
                this.emit(GET_USER_BY_USERNAME, result.data);
                break
            case ERROR:
                this.emit(GET_USER_BY_USERNAME, null);
                break
            default:
                break
        }

    };

    userAddChangeListener = (event, callback) => {
        this.on(event, callback);
    };

    userRemoveChangeListener = (event, callback) => {
        this.off(event, callback);
    };

}

