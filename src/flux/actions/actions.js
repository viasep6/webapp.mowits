import dispatcher from '../dispatcher';
import {
    GET_MOVIE_DETAILS,
    GET_USER_BY_USERNAME,
    GET_WITS_BY_USER,
    GET_WITS_BY_FEED,
    LOGIN,
    LOGOUT,
    POST_WIT,
    ROAR_WIT,
    SIGNUP, SET_USER_PROFILE_IMAGE,
} from '../../util/constants';

/*
    Auth actions
*/
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

/*
    User actions
*/
export const getUserByUsername = (username) => {
    dispatcher.dispatch({
        type: GET_USER_BY_USERNAME,
        payload: username
    })
}
export const setUserProfileImage = (profileImageUrl) => {
    dispatcher.dispatch({
        type: SET_USER_PROFILE_IMAGE,
        payload: profileImageUrl
    })
}

/*
    Wits actions
 */
export const postWit = (wit) => {
    dispatcher.dispatch({
        type: POST_WIT,
        payload: wit
    })
}

export const getWitsByUser = (data) => {
    dispatcher.dispatch({
        type: GET_WITS_BY_USER,
        payload: data
    })
}

export const getWitsByFeed = (data) => {
    dispatcher.dispatch({
        type: GET_WITS_BY_FEED,
        payload: data
    })
}

export const roarWit = (witId) => {
    dispatcher.dispatch( {
        type: ROAR_WIT,
        payload: witId
    })
}

/*
 Movie actions
*/
export const getMovieDetails = (movieId) => {
    dispatcher.dispatch( {
        type: GET_MOVIE_DETAILS,
        payload: movieId
    })
}