const BASE_URL = process.env['REACT_APP_BASE_URL']

export const URL_SIGNUP =  BASE_URL + '/users/create'
export const URL_GET_USER = BASE_URL + '/users/get'


export const LOGIN = 'LOGIN'
export const CHANGE_AUTH_TOKEN = 'CHANGE_AUTH_TOKEN'


export const LOGOUT = 'LOGOUT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const GET_USER_BY_USERNAME = 'GET_USER_BY_USERNAME'
export const SIGNUP = 'SIGNUP'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'