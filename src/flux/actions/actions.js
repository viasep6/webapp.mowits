import dispatcher from '../dispatcher';
import {
    SIGNUP,
    LOGIN,
    LOGOUT,
    GET_WITS_BY_USER,
    GET_WITS_BY_FEED,
    POST_WIT,
    ROAR_WIT,
    GET_USER_BY_USERNAME,
    SET_USER_PROFILE_IMAGE,
    GET_MOVIE_DETAILS,
    GET_MOVIE_LISTS_BY_USER_ID,
    NEW_USER_MOVIE_LISTS, GET_WITS_BY_MOVIE, GET_SEARCH_RESULTS, SUBSCRIBE_TO_MOVIE, GET_SIMILAR_MOVIES,
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

export const getWitsByMovie = (movieId) => {
    dispatcher.dispatch({
        type: GET_WITS_BY_MOVIE,
        payload: movieId
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

export const getSimilarMovies = (movieId) => {
    dispatcher.dispatch( {
        type: GET_SIMILAR_MOVIES,
        payload: movieId
    })
}

export const getSearchResults = (query) => {
    dispatcher.dispatch( {
        type: GET_SEARCH_RESULTS,
        payload: query
    })
}

export const followMovie = (movie) => {
    dispatcher.dispatch({
        type: SUBSCRIBE_TO_MOVIE,
        payload: {movieId: movie.id, movieTitle: movie.title}
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
