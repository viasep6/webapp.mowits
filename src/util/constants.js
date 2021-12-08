/* url */
export const BASE_URL = process.env['REACT_APP_BASE_URL']
export const URL_SIGNUP =  BASE_URL + '/users/create'
export const URL_GET_USER = BASE_URL + '/users/get'
export const URL_GET_BY_USER_ID = BASE_URL + '/wits/get_by_userid'
export const URL_GET_BY_FEED = BASE_URL + '/wits/get_by_feed'
export const URL_POST_WIT = BASE_URL + '/wits/create'
export const URL_CHANGE_PROFILE_IMAGE = BASE_URL + '/users/create'

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

/* movies */
const MOVIES_BASE = 'https://mowitsapp.azure-api.net/movies/'
export const MOVIES_URL_DETAILS = MOVIES_BASE + 'MovieDetails'
export const MOVIES_URL_SEARCH = MOVIES_BASE + 'MovieSearch'
export const MOVIES_PROFILE_DEFAULT_URL = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
export const GET_MOVIE_DETAILS = 'GET_MOVIE_DETAILS'

/* lists */
export const GET_MOVIE_LISTS_BY_USER_ID = 'GET_MOVIE_LISTS_BY_USER_ID'
export const NEW_USER_MOVIE_LISTS = 'NEW_USER_MOVIE_LISTS'


