import axios from 'axios';
import {EventEmitter} from 'events';
import {
    URL_POPULAR_MOVIES,
    URL_MOVIE_DETAILS,
    URL_MOVIE_SIMILAR,
    URL_SUBSCRIBE_TO_MOVIE,
    GET_MOVIE_DETAILS,
    GET_SIMILAR_MOVIES,
    SUBSCRIBE_TO_MOVIE,
    GET_MOVIE_POPULAR,
    URL_UPCOMING_MOVIES,
    GET_MOVIE_UPCOMING,
    GET_MOVIE_TOP_RATED,
    GET_MOVIE_NOW_PLAYING, URL_NOW_PLAYING_MOVIES, URL_TOP_RATED_MOVIES,
} from '../../util/constants';
import dispatcher from '../dispatcher';


export class MovieStore extends EventEmitter {

    constructor(authStore) {
        super();
        this.authStore = authStore;
        dispatcher.register(action => {
            switch (action.type) {
                case GET_MOVIE_DETAILS:
                    this.fetchMovieDetails(action.payload);
                    break;
                case SUBSCRIBE_TO_MOVIE:
                    this.subscribeToMovie(action.payload);
                    break;
                case GET_SIMILAR_MOVIES:
                    this.fetchSimilarMovies(action.payload);
                    break;
                case GET_MOVIE_POPULAR:
                    this.fetchPopularMovies();
                    break;
                default:
                    break;
            }
        });
    }

    fetchMovieDetails(movieId) {
        let userId = undefined;
        if (this.authStore.state.authUser?.accessToken) {
            userId = this.authStore.state.authUser.uid;
        }
        axios.get(URL_MOVIE_DETAILS, {
            // axios.get('http://localhost:7071/movies/MovieDetails', {
            params: {
                movieid: movieId,
                userId: userId
            }
        })
            .then((response) => {
                this.emit(GET_MOVIE_DETAILS, response.data);
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
                this.emit(GET_MOVIE_DETAILS, {errorMessage: error});
            });
    }

    fetchPopularMovies() {
        axios.get(URL_POPULAR_MOVIES
        // axios.get('http://localhost:7071/movies/Popular',
        )
        .then((response) => {
            this.emit(GET_MOVIE_POPULAR, response.data);
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
            this.emit(URL_POPULAR_MOVIES, {errorMessage: error});
        });
    }

    fetchUpcomingMovies() {
        axios.get(URL_UPCOMING_MOVIES
            // axios.get('http://localhost:7071/movies/Upcoming',
        )
            .then((response) => {
                this.emit(GET_MOVIE_UPCOMING, response.data);
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
                this.emit(GET_MOVIE_UPCOMING, {errorMessage: error});
            });
    }

    fetchTopRatedMovies() {
        axios.get(URL_TOP_RATED_MOVIES
        // axios.get('http://localhost:7071/movies/TopRated',
        )
            .then((response) => {
                this.emit(GET_MOVIE_TOP_RATED, response.data);
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
                this.emit(GET_MOVIE_TOP_RATED, {errorMessage: error});
            });
    }

    fetchNowPlayingMovies() {
        axios.get(URL_NOW_PLAYING_MOVIES
        // axios.get('http://localhost:7071/movies/NowPlaying',
        )
            .then((response) => {
                this.emit(GET_MOVIE_NOW_PLAYING, response.data);
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
                this.emit(GET_MOVIE_NOW_PLAYING, {errorMessage: error});
            });
    }



    subscribeToMovie(data) {
        axios.defaults.headers.common = {Authorization: `Bearer ${this.authStore.state.authUser.accessToken}`};
        // axios.post('http://localhost:7071/movies/Follow', {
        axios.post(URL_SUBSCRIBE_TO_MOVIE, {
            movieId: data.movieId,
            title: data.movieTitle,
        }).then((response) => {
            // not gonna use response
        })
            .catch((error) => {
                console.log(error);
            });
    }

    fetchSimilarMovies(movieId) {
        axios.get(URL_MOVIE_SIMILAR, {
            // axios.get('http://localhost:7071/movies/Similar', {
            params: {
                movieid: movieId,
            }
        })
            .then((response) => {
                this.emit(GET_SIMILAR_MOVIES, response.data);
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
                this.emit(GET_SIMILAR_MOVIES, {errorMessage: error});
            });

    }

    addChangeListener = (event, callback) => {
        this.on(event, callback);
    };

    removeChangeListener = (event, callback) => {
        this.off(event, callback);
    };
}