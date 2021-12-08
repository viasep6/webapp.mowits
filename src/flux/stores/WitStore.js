import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import {
    GET_WITS_BY_FEED, GET_WITS_BY_USER,
    NEW_WITS_RETURNED,
    POST_WIT,
    ROAR_WIT,
    URL_GET_BY_USER_ID,
    URL_POST_WIT,
} from '../../util/constants';
import axios from 'axios';

export class WitStore extends EventEmitter {

    constructor(authStore) {
        super(authStore);
        this.state = {};
        this.authStore = authStore;
        dispatcher.register(action => {
            switch (action.type) {
                case POST_WIT:
                    this.handlePostWit(action.payload);
                    break;
                case GET_WITS_BY_USER:
                    this.handleWitsByUser(action.payload);
                    break;
                case GET_WITS_BY_FEED:
                    this.handleWitsByFeed(action.payload);
                    break;
                case ROAR_WIT:
                    this.handleRoarWit(action.payload);
                    break;
                default:
                    break;
            }
        });
    }

    handleWitsByUser(payload) {
        if (payload === undefined)
            return

        const userid = payload.userId;
        const startAfter = payload.startAfter ? payload.startAfter : new Date().toISOString(); // created (as date)
        axios.get('http://localhost:7072/wits/get_by_userid' + '?userId=' + userid + '&startAfter=' + startAfter)
        // axios.get(URL_GET_BY_USER_ID + '?userId=' + userid + '&startAfter=' + startAfter)
            .then((response) => {
                // returns
                this.emit(NEW_WITS_RETURNED, response.data);
            })
            .catch((error) => {
                this.emit(NEW_WITS_RETURNED, {errorMsg: error});
            });

    }


    handleWitsByFeed(payload) {
        if (payload === undefined)
            return

        const startAfter = payload.startAfter ? payload.startAfter : new Date().toISOString(); // created (as date)
        axios.defaults.headers.common = {Authorization: `Bearer ${this.authStore.state.authUser.accessToken}`};
        axios.get('http://localhost:7072/wits/get_by_feed' + '?startAfter=' + startAfter)
            // axios.get(URL_GET_BY_USER_ID + '?userId=' + userid + '&startAfter=' + startAfter)
            .then((response) => {
                // returns
                this.emit(NEW_WITS_RETURNED, response.data);
            })
            .catch((error) => {
                this.emit(NEW_WITS_RETURNED, {errorMsg: error});
            });
    }

    handleWitsByMovie(payload) {

    }

    handleRoarWit(witId) {
        axios.defaults.headers.common = {Authorization: `Bearer ${this.authStore.state.authUser.accessToken}`};
        axios.get('http://localhost:7072/wits/create' + '?roarWit=' + witId)
        // axios.get(URL_POST_WIT + '?roarWit=' + witId)
            .then((response) => {
                // no response
            })
            .catch((error) => {

            });
    }

    handlePostWit(wit) {
        axios.defaults.headers.common = {Authorization: `Bearer ${this.authStore.state.authUser.accessToken}`};
        // axios.post(URL_POST_WIT, {
        axios.post('http://localhost:7072/wits/create', {
            text: wit.text,
            // movieTags: [ {movieId: <id>, title: <title>}, ]
            movieTags: wit.movieTags,
            userTags: wit.userTags,
            roars: [],
        }).then((response) => {
            // returns posted wit
            this.emit(POST_WIT, response.data);
        })
            .catch((error) => {
                console.log("error", error);
                this.emit(POST_WIT, {errorMsg: error});
            });
    }

    addChangeListener(event, callback) {
        this.on(event, callback);
    }

    removeChangeListener(event, callback) {
        this.off(event, callback);
    }
}