import dispatcher from '../dispatcher';
import {
    SIGNUP,
    LOGIN,
    LOGOUT,
    GET_USER_BY_USERNAME,
    MOVIE_DETAILS_SUCCESS,
    GET_SEARCH_RESULTS,
    UPDATED_USER_COLLECTIONS,
    BASE_URL,
    GET_SIMILAR_MOVIES,
    NEW_WITS_RETURNED,
    GET_MOVIE_POPULAR,
    GET_MOVIE_UPCOMING,
    GET_MOVIE_TOP_RATED,
    GET_MOVIE_NOW_PLAYING, LOGGED_IN_USER,
} from '../../util/constants';
import APIProvider from '../../services/providers/APIProvider';
import MovieService from '../../services/MovieService';
import MovieCollectionService from '../../services/MovieCollectionService';
import UserService from '../../services/UserService';
import WitService from '../../services/WitService';

const apiProvider = APIProvider(BASE_URL)
const userService = UserService(apiProvider)
const moviesService = MovieService(apiProvider)
const witService = WitService(apiProvider)
const movieCollectionService = MovieCollectionService(apiProvider, moviesService)

/*
    Auth actions
*/
export const logout = () => {
    dispatcher.dispatch({
        type: LOGOUT
    })
}

export const login = (username, password) => {
    userService.login(username, password)
        .then(result => dispatcher.dispatch( {
            type: LOGIN,
            payload: result
        }))
}

export const signup = (username, email, password) => {
    userService.signup({displayName: username, email: email, password:password})
        .then(result =>  dispatcher.dispatch({
            type: SIGNUP,
            payload: result
        }))
}

/*
    User actions
*/
export const getUserByUsername = (username) => {
    userService.getUserByDisplayName(username)
        .then(result => dispatcher.dispatch({
            type: GET_USER_BY_USERNAME,
            payload: result
        }))
}
export const setUserProfileImage = (profileImageUrl) => {
    userService.changeProfileImage(profileImageUrl)
}

export const getLoggedInUser = () => {
    userService.getLoggedInUser()
        .then(result => dispatcher.dispatch({
            type: LOGGED_IN_USER,
            payload: result
        }))
}

/*
    Wits actions
 */
export const postWit = (wit) => {
    witService.postWit(wit)
        .then(result =>  dispatcher.dispatch({
                type: NEW_WITS_RETURNED,
                payload: result
        }))
}

export const getWitsByUser = (data) => {
    witService.getWitsByUser(data)
        .then(result => dispatcher.dispatch({
            type: NEW_WITS_RETURNED,
            payload: result
        }))
}

export const getWitsByFeed = (data) => {
    witService.getWitsByFeed(data)
        .then(result => dispatcher.dispatch({
            type: NEW_WITS_RETURNED,
            payload: result
        }))
}

export const getWitsByMovie = (movieId) => {
    witService.getWitsByMovie(movieId)
        .then(result => dispatcher.dispatch({
                type: NEW_WITS_RETURNED,
                payload: result
            })
        )
}

export const roarWit = (witId) => {
    witService.postWitRoar(witId)
}

/*
 Movie actions
*/
export const getMovieDetails = (movieId) => {
    moviesService.getMovieDetails(movieId)
        .then(result => dispatcher.dispatch( {
            type: MOVIE_DETAILS_SUCCESS,
            payload: result
        }))
}

export const getSearchResults = (query) => {
    moviesService.getSearchResults(query)
        .then(result => dispatcher.dispatch( {
            type: GET_SEARCH_RESULTS,
            payload: result
        }))

}

export const followMovie = (movie) => {
    moviesService.followMovie(movie.id, movie.title)
}

export const getPopularMovies = () => {
    moviesService.getMoviesByCollectionType(moviesService.movieCollectionTypes.POPULAR)
        .then(result => dispatcher.dispatch( {
            type: GET_MOVIE_POPULAR,
            payload: result
        }))
}

export const getUpcomingMovies = () => {
    moviesService.getMoviesByCollectionType(moviesService.movieCollectionTypes.UPCOMING)
        .then(result => dispatcher.dispatch( {
            type: GET_MOVIE_UPCOMING,
            payload: result
        }))
}

export const getTopRatedMovies = () => {
    moviesService.getMoviesByCollectionType(moviesService.movieCollectionTypes.TOP_RATED)
        .then(result => dispatcher.dispatch( {
            type: GET_MOVIE_TOP_RATED,
            payload: result
        }))
}

export const getMoviesNowPlaying = () => {
    moviesService.getMoviesByCollectionType(moviesService.movieCollectionTypes.NOW_PLAYING)
        .then(result => dispatcher.dispatch( {
            type: GET_MOVIE_NOW_PLAYING,
            payload: result
        }))
}

export const getSimilarMovies = (movieId) => {
    moviesService.getMoviesByCollectionType(moviesService.movieCollectionTypes.SIMILAR_MOVIES, movieId)
        .then(result => dispatcher.dispatch( {
            type: GET_SIMILAR_MOVIES,
            payload: result
        }))
}


/*
    Movie Lists.
 */
export const getMovieCollectionsByUserID = (collectionName='') => {
    movieCollectionService.getCollectionsByUserID(collectionName)
        .then(collections =>  dispatcher.dispatch({
            type: UPDATED_USER_COLLECTIONS,
            payload: collections
        }))
}

export const createMovieCollection = (collectionName) => {
    movieCollectionService.updateMovieCollectionByUserID(collectionName)
        .then(updatedCollections => dispatcher.dispatch({
            type: UPDATED_USER_COLLECTIONS,
            payload: updatedCollections
        }))
}

export const updateMovieCollection = (collectionName, movies) => {
    movieCollectionService.updateMovieCollectionByUserID(collectionName, movies)
        .then(updatedCollections => dispatcher.dispatch({
                type: UPDATED_USER_COLLECTIONS,
                payload: updatedCollections
        }))
}

export const deleteMovieCollection = (collectionName) => {
    movieCollectionService.deleteMovieCollection(collectionName)
        .then(updatedCollections => dispatcher.dispatch({
            type: UPDATED_USER_COLLECTIONS,
            payload: updatedCollections
        }))
}
