/* url */
export const BASE_URL = process.env['REACT_APP_BASE_URL']
export const URL_SIGNUP =  BASE_URL + '/users/create'
export const URL_GET_USER = BASE_URL + '/users/get'
export const URL_GET_BY_USER_ID = BASE_URL + '/wits/get_by_userid'
export const URL_GET_BY_FEED = BASE_URL + '/wits/get_by_feed'
export const URL_GET_BY_MOVIE = BASE_URL + '/wits/get_by_movie'
export const URL_POST_WIT = BASE_URL + '/wits/create'
export const URL_CHANGE_PROFILE_IMAGE = BASE_URL + '/users/create'
export const URL_SUBSCRIBE_TO_MOVIE = BASE_URL + '/movies/Follow'
export const URL_POPULAR_MOVIES = BASE_URL + '/movies/Popular'
export const URL_UPCOMING_MOVIES = BASE_URL + '/movies/Upcoming'
export const URL_MOVIE_DETAILS = BASE_URL + '/movies/MovieDetails'
export const URL_MOVIE_SEARCH = BASE_URL + '/movies/MovieSearch'
export const URL_MOVIE_SIMILAR = BASE_URL + '/movies/Similar'
export const URL_NOW_PLAYING_MOVIES = BASE_URL + '/movies/NowPlaying'
export const URL_TOP_RATED_MOVIES = BASE_URL + '/movies/TopRated'
export const MOVIES_PROFILE_DEFAULT_URL = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'

/* auth */
export const CHANGE_AUTH_TOKEN = 'CHANGE_AUTH_TOKEN'
export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT = 'LOGOUT'

export const SIGNUP = 'SIGNUP'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

/* user */
export const GET_USER_BY_USERNAME = 'GET_USER_BY_USERNAME'
export const SET_USER_PROFILE_IMAGE = 'SET_USER_PROFILE_IMAGE'

/* wits */
export const POST_WIT = 'POST_WIT'
export const NEW_WITS_RETURNED = 'NEW_WITS_RETURNED'
export const GET_WITS_BY_USER = 'GET_WITS_BY_USER'
export const ROAR_WIT = 'ROAR_WIT'
export const GET_WITS_BY_FEED = 'GET_WITS_BY_FEED'
export const GET_WITS_BY_MOVIE = 'GET_WITS_BY_MOVIE'

/* movies */
export const GET_MOVIE_DETAILS = 'GET_MOVIE_DETAILS'
export const GET_SIMILAR_MOVIES = 'GET_SIMILAR_MOVIES'
export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS'
export const SUBSCRIBE_TO_MOVIE = 'SUBSCRIBE_TO_MOVIE'
export const GET_MOVIE_POPULAR = 'GET_MOVIE_POPULAR'
export const GET_MOVIE_UPCOMING = 'GET_MOVIE_UPCOMING'
export const GET_MOVIE_TOP_RATED = 'GET_MOVIE_TOP_RATED'
export const GET_MOVIE_NOW_PLAYING = 'GET_MOVIE_NOW_PLAYING'
export const DEBOUNCE_TIME = 600

/* lists */
export const UPDATED_MOVIE_COLLECTIONS = 'UPDATED_MOVIE_COLLECTIONS'




