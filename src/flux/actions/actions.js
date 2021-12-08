import dispatcher from '../dispatcher';
import {
    SIGNUP,
    LOGIN,
    LOGOUT,
    GET_USER_BY_USERNAME,
    GET_WITS_BY_USER, LOGIN,
    POST_WIT,
    ROAR_WIT,
    GET_MOVIE_LISTS_BY_USER_ID,
    NEW_USER_MOVIE_LISTS,
    GET_MOVIE_DETAILS
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

export const getWitsByUser = (data) => {
    dispatcher.dispatch({
        type: GET_WITS_BY_USER,
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
