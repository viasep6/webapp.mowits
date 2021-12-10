import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import {GET_MOVIE_DETAILS, GET_SEARCH_RESULTS, URL_MOVIE_SEARCH} from "../../util/constants";
import axios from "axios";

export class SearchStore extends EventEmitter {

    constructor() {
        super();
        dispatcher.register(action => {
            switch (action.type) {
                case GET_SEARCH_RESULTS:
                    this.fetchSearchResults(action.payload);
                    break;
                default:
                    break;
            }
        })
    }

    fetchSearchResults(query) {
        if (query !== "")

            axios.get(URL_MOVIE_SEARCH + `?query=${query}`)
            .then((response) => {

                let searchOptions = response.data.map(movie => {
                    let release = (movie.release_date !== undefined) ? ` (${movie.release_date.split('-')[0]})` : ' (N/A)';

                    return {label: movie.title + release, id: movie.id}
                })

                this.emit(GET_SEARCH_RESULTS, searchOptions)
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


    addSearchChangeListener = (event, callback) => {
        this.on(event, callback);
    };

    removeSearchChangeListener = (event, callback) => {
        this.off(event, callback);
    };

}