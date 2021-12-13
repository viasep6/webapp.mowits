import {EventEmitter} from 'events';
import {auth} from '../../services/providers/Firebase';
import dispatcher from '../dispatcher';
import {
    CHANGE_AUTH_TOKEN,
    LOGIN,
    LOGIN_FAILURE, LOGIN_SUCCESS,
    LOGOUT, SIGNUP, SIGNUP_FAILURE, SIGNUP_SUCCESS
} from '../../util/constants';

/*
    AuthStore observes auth state and its changes.
    Login, logout, auth change.
 */
export class AuthStore extends EventEmitter {

    constructor(props) {
        super(props);
        this.state = {
            authUser: auth.currentUser,
        };

        dispatcher.register(action => {
            switch (action.type) {
                case SIGNUP:
                    this.signup(action.payload);
                    break;
                case LOGOUT:
                    this.logout();
                    break;
                case LOGIN:
                    this.login(action.payload);
                    break;
                default:
                    break;
            }
        });

        // firebase token is automatically persisted (https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed_in_user)
        auth.onIdTokenChanged(user => {
            if (user) {
                if (this.state.authUser !== user) {
                    this.state = {
                        ...this.state,
                        authUser: user,
                    };
                    this.emit(CHANGE_AUTH_TOKEN, user);
                }
            } else {
                // not signed in
                if (this.state.authUser !== null) {
                    this.state = {
                        ...this.state,
                        authUser: user,
                    };
                }
                this.emit(CHANGE_AUTH_TOKEN, user);
            }
        });
    }

    signup(result) {
        switch (result.state) {
            case SIGNUP_SUCCESS:
                this.emit(SIGNUP_SUCCESS)
                break
            case SIGNUP_FAILURE:
                this.emit(SIGNUP_FAILURE, result.payload)
                break
            default:
                break
        }
    }

    login(result) {
        switch (result.state) {
            case LOGIN_SUCCESS:
                let token = result.payload.user.accessToken;
                if (token !== null) {
                    this.state.authUser = result.payload.user;
                } else {
                    if (this.state.authUser !== null) {
                        this.state.authUser = null;
                    }
                    this.emit(LOGIN_FAILURE, {general: 'Error validating login. try again later.'});
                }
                break
            case LOGIN_FAILURE:
                this.emit(LOGIN_FAILURE, result.payload)
                break
            default:
                break
        }
    }

    logout() {
        auth.signOut().then(() => {
            this.state = {
                ...this.state,
                authUser: null,
            };
        });
    }

    authAddChangeListener(event, callback) {
        this.on(event, callback);
    }

    authRemoveChangeListener(event, callback) {
        this.off(event, callback);
    }

}