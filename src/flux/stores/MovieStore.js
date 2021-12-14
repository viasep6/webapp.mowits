import {EventEmitter} from 'events';
import {
    MOVIE_DETAILS_SUCCESS,
    SUCCESS,
    ERROR,
    GET_SEARCH_RESULTS,
    GET_MOVIE_POPULAR,
    GET_MOVIE_UPCOMING,
    GET_MOVIE_TOP_RATED,
    GET_MOVIE_NOW_PLAYING,
    GET_SIMILAR_MOVIES, UPDATED_USER_COLLECTIONS,
} from '../../util/constants';
import dispatcher from '../dispatcher';


export class MovieStore extends EventEmitter {

    constructor(props) {
        super(props);
        this.state = {
            collections: {
                popular: [],
                upcoming: [],
                topRated: [],
                nowPlaying: [],
                userCollections: []
            }
        }

        dispatcher.register(action => {
            switch (action.type) {
                case MOVIE_DETAILS_SUCCESS:
                    this.movieDetailsReceived(action.payload)
                    break
                case GET_SEARCH_RESULTS:
                    this.searchResultReceived(action.payload)
                    break
                case GET_MOVIE_POPULAR:
                    this.popularReceived(action.payload)
                    break
                case GET_MOVIE_UPCOMING:
                    this.upcomingReceived(action.payload)
                    break
                case GET_MOVIE_TOP_RATED:
                    this.topRatedReceived(action.payload)
                    break
                case GET_MOVIE_NOW_PLAYING:
                    this.nowPlayingReceived(action.payload)
                    break
                case GET_SIMILAR_MOVIES:
                    this.similarMoviesReceived(action.payload)
                    break
                case UPDATED_USER_COLLECTIONS:
                    this.userCollectionsReceived(action.payload);
                    break
                default:
                    break
            }
        });
    }

    movieDetailsReceived(result) {
        switch (result.state) {
            case SUCCESS:
                this.emit(MOVIE_DETAILS_SUCCESS, result.data);
                break
            case ERROR:
                console.log('Movie Store Error:', result.data.errorMessage);
                break
            default:
                break
        }
    }

    popularReceived(result) {
        switch (result.state) {
            case SUCCESS:
                this.state.collections.popular = result.data
                this.emit(GET_MOVIE_POPULAR, this.state.collections.popular)
                break
            case ERROR:
                this.emit(GET_MOVIE_POPULAR, result.data)
                break
            default:
                break
        }
    }

    upcomingReceived(result) {
        switch (result.state) {
            case SUCCESS:
                this.state.collections.upcoming = result.data
                this.emit(GET_MOVIE_UPCOMING, this.state.collections.upcoming)
                break
            case ERROR:
                this.emit(GET_MOVIE_UPCOMING, result.data)
                break
            default:
                break
        }
    }

    topRatedReceived(result) {
        switch (result.state) {
            case SUCCESS:
                this.state.collections.topRated = result.data
                this.emit(GET_MOVIE_TOP_RATED, this.state.collections.topRated)
                break
            case ERROR:
                this.emit(GET_MOVIE_TOP_RATED, result.data)
                break
            default:
                break
        }
    }

    nowPlayingReceived(result) {
        switch (result.state) {
            case SUCCESS:
                this.state.collections.nowPlaying = result.data
                this.emit(GET_MOVIE_NOW_PLAYING, this.state.collections.nowPlaying)
                break
            case ERROR:
                this.emit(GET_MOVIE_NOW_PLAYING, result.data)
                break
            default:
                break
        }
    }

    similarMoviesReceived(result) {
        switch (result.state) {
            case SUCCESS:
                this.emit(GET_SIMILAR_MOVIES, result.data)
                break
            case ERROR:
                this.emit(GET_SIMILAR_MOVIES, result.data)
                break
            default:
                break
        }
    }

    userCollectionsReceived(collections) {
        this.state.collections.userCollections = collections
        this.emit(UPDATED_USER_COLLECTIONS, this.state.collections.userCollections);
    }

    searchResultReceived(result) {
        switch (result.state) {
            case SUCCESS:
                let searchOptions = result.data.map(movie => {
                    let release = (movie.release_date !== undefined) ? ` (${movie.release_date.split('-')[0]})` : ' (N/A)';

                    return {label: movie.title + release, id: movie.id}
                })

                this.emit(GET_SEARCH_RESULTS, searchOptions)
                break
            case ERROR:
                console.log('Store search error', result.data.errorMessage);
                break
            default:
                break
        }
    }

    requestCollection(actionType) {
        switch (actionType) {
            case GET_MOVIE_POPULAR:
                return this.checkCollectionContent(this.state.collections.popular, actionType)
            case GET_MOVIE_UPCOMING:
                return this.checkCollectionContent(this.state.collections.upcoming, actionType)
            case GET_MOVIE_TOP_RATED:
                return this.checkCollectionContent(this.state.collections.topRated, actionType)
            case GET_MOVIE_NOW_PLAYING:
                return this.checkCollectionContent(this.state.collections.nowPlaying, actionType)
            case UPDATED_USER_COLLECTIONS:
                return this.checkCollectionContent(this.state.collections.userCollections, actionType)
            default:
                break
        }
    }

    checkCollectionContent = (collection, emitType) => {
        if (collection.length === 0) {
            return false
        }
        else {
            this.emit(emitType, collection);
            return true
        }
    }

    addChangeListener = (event, callback) => {
        this.on(event, callback);
    };

    removeChangeListener = (event, callback) => {
        this.off(event, callback);
    };
}