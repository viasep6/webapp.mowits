import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import {POST_WIT} from '../../util/constants';
import axios from 'axios';

export class WitStore extends EventEmitter {

    constructor(authStore) {
        super();
        this.state = {};
        this.authStore = authStore;
        dispatcher.register(action => {
            switch (action.type) {
                case POST_WIT:
                    this.handlePostWit(action.payload);
                    break;
                default:
                    break;
            }
        });

    }

    handlePostWit(wit) {
        axios.defaults.headers.common = {Authorization: `Bearer ${this.authStore.state.authUser.accessToken}`};
        // axios.post(URL_POST_WIT, {
        axios.post('http://localhost:7072/wits/Create', {
            text: wit.text,
            movieTags: wit.movieTags,
            userTags: wit.userTags,
        }).then((response) => {
            // returns posted wit
            this.emit(POST_WIT, response.data);
        })
            .catch((error) => {
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