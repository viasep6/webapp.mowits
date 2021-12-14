import {getResponseObject} from '../util/ServiceResponse';
import {ERROR, SUCCESS} from '../util/constants';
import {auth} from './providers/Firebase';

function WitService(apiProvider) {
    const api = apiProvider
    const witPath = '/wits'

    const getWitsByMovie = (payload) => {
        if (!parseInt(payload.movieId))
            return;
        const startAfter = payload.startAfter ? payload.startAfter : new Date().toISOString(); // created (as date)
        return api.get(`${witPath}/get_by_movie`,
            {},
            {
                movieId: payload.movieId,
                startAfter: startAfter
            })
            .then(res => {
                return getResponseObject(SUCCESS, res.data)
            })
            .catch(error => getResponseObject(ERROR, { errorMsg: error }))
    }

    const getWitsByUser = (payload) => {
        if (payload === undefined)
            return;

        const userid = payload.userId;
        const startAfter = payload.startAfter ? payload.startAfter : new Date().toISOString(); // created (as date)
        return api.get(`${witPath}/get_by_userid`,
            {},
            {
                userId: userid,
                startAfter: startAfter
            })
            .then(res => {
                return getResponseObject(SUCCESS, res.data)
            })
            .catch(error => getResponseObject(ERROR, { errorMsg: error }))
    }

    const getWitsByFeed = (payload) => {
        if (payload === undefined)
            return;

        const startAfter = payload.startAfter ? payload.startAfter : new Date().toISOString(); // created (as date)
        return api.get(`${witPath}/get_by_feed`,
            { Authorization: `Bearer ${auth.currentUser?.accessToken}` },
            {
                startAfter: startAfter
            })
            .then(res => {
                return getResponseObject(SUCCESS, res.data)
            })
            .catch(error => getResponseObject(ERROR, { errorMsg: error }))
    }

    const postWitRoar = (witId) => {
        return api.get(`${witPath}/create`,
            { Authorization: `Bearer ${auth.currentUser?.accessToken}` },
            {
                roarWit: witId
            })
            .catch(error => console.log('Wit Roar API Error: ', error))
    }

    const postWit = (wit) => {
        return api.post(`${witPath}/create`,
            {
                text: wit.text,
                // movieTags: [ {movieId: <id>, title: <title>}, ]
                movieTags: wit.movieTags,
                userTags: wit.userTags,
                roars: [],
            },
            { Authorization: `Bearer ${auth.currentUser?.accessToken}` })
            .then(res => getResponseObject(SUCCESS, res.data))
            .catch(error => getResponseObject(ERROR, { errorMsg: error }))
    }

    return { getWitsByMovie, getWitsByUser, getWitsByFeed, postWitRoar, postWit }
}

export default WitService