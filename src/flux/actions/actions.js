import dispatcher from '../dispatcher';
import {
    GET_USER_BY_USERNAME,
    GET_WITS_BY_USER, LOGIN,
    LOGOUT,
    POST_WIT,
    SIGNUP,
    GET_MOVIE_LISTS_BY_USER_ID,
    NEW_USER_MOVIE_LISTS
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

/*
    Wits actions
 */
export const postWit = (wit) => {
    dispatcher.dispatch({
        type: POST_WIT,
        payload: wit
    })
}

export const getWitsByUser = (user) => {
    dispatcher.dispatch({
        type: GET_WITS_BY_USER,
        payload: user
    })
}

/*
    Movie Lists.
 */
export const getMovieListsByUserID = (accessToken) => {
    dispatcher.dispatch({
        type: GET_MOVIE_LISTS_BY_USER_ID,
        payload: accessToken
    })
}

export const newUserMovieLists = (lists) => {
    dispatcher.dispatch({
        type: NEW_USER_MOVIE_LISTS,
        payload: lists
    })
}
