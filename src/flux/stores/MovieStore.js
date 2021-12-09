import axios from 'axios';
import {EventEmitter} from "events";
import {GET_MOVIE_DETAILS, MOVIES_URL_DETAILS} from "../../util/constants";
import dispatcher from "../dispatcher";

export class MovieStore extends EventEmitter {

    constructor() {
        super();
        dispatcher.register(action => {
            switch (action.type) {
                case GET_MOVIE_DETAILS:
                    this.fetchMovieDetails(action.payload);
                    break;
                default:
                    break;
            }
        })
    }

    fetchMovieDetails(movieId) {
        axios.get(MOVIES_URL_DETAILS + `?movieid=${movieId}`)
            .then((response) => {
                this.emit(GET_MOVIE_DETAILS, response.data)
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
                this.emit(GET_MOVIE_DETAILS, {errorMessage: error})
            });
    }

    addChangeListener = (event, callback) => {
        this.on(event, callback);
    };

    removeChangeListener = (event, callback) => {
        this.off(event, callback);
    };
}