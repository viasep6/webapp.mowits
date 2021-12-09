import {EventEmitter} from 'events';
import {auth, loginWithEmailAndPassword} from '../../firebase/firebase';
import dispatcher from '../dispatcher';
import {
    CHANGE_AUTH_TOKEN,
    LOGIN,
    LOGIN_FAILURE,
    LOGOUT, SIGNUP, SIGNUP_FAILURE, SIGNUP_SUCCESS, URL_SIGNUP,

} from '../../util/constants';
import axios from 'axios';

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
                    this.login(action.payload.username, action.payload.password);
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
                    this.emit(CHANGE_AUTH_TOKEN, user);
                }
            }
        });

    }

    signup(user) {
        axios.post(URL_SIGNUP, user)
            .then((response) => {
                if (response.data.success) {
                    this.emit(SIGNUP_SUCCESS);
                } else {
                    this.emit(SIGNUP_FAILURE, {general: 'Error creating user.'});
                }
            })
            .catch((error) => {
                if (error.response !== undefined) {
                    this.emit(SIGNUP_FAILURE, error.response.data);
                } else {
                    this.emit(SIGNUP_FAILURE, {general: 'Unknown error occurred'});
                }
            });
    }

    login(username, password) {
        loginWithEmailAndPassword(username, password).then(r => {
            let token = r.user.accessToken;
            if (token !== null) {
                this.state.authUser = r.user;
            } else {
                if (this.state.authUser !== null) {
                    this.state.authUser = null;
                }
                this.emit(LOGIN_FAILURE, {general: 'Error validating login. try again later.'});
            }

        }).catch((error) => {
            if (error.message.includes('invalid-email') || error.message.includes('user-not-found')) {
                this.emit(LOGIN_FAILURE, {email: 'invalid email'});
            } else if (error.message.includes('wrong-password')) {
                this.emit(LOGIN_FAILURE, {password: 'Wrong password'});
            } else {
                this.emit(LOGIN_FAILURE, {general: 'could not login'});
            }
        });
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