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
import {getMovieCollectionsByUserID} from '../actions/actions';


export class MovieStore extends EventEmitter {

    constructor(props) {
        super(props);
        this.state = {
            userCollections: []
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
                    this.collectionTypeReceived(action.payload, action.type)
                    break
                case GET_MOVIE_UPCOMING:
                    this.collectionTypeReceived(action.payload, action.type)
                    break
                case GET_MOVIE_TOP_RATED:
                    this.collectionTypeReceived(action.payload, action.type)
                    break
                case GET_MOVIE_NOW_PLAYING:
                    this.collectionTypeReceived(action.payload, action.type)
                    break
                case GET_SIMILAR_MOVIES:
                    this.collectionTypeReceived(action.payload, action.type)
                    break
                case UPDATED_USER_COLLECTIONS:
                    this.setNewUserCollections(action.payload);
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

    collectionTypeReceived(result, emitType) {
        switch (result.state) {
            case SUCCESS:
                this.emit(emitType, result.data)
                break
            case ERROR:
                this.emit(emitType, result.data)
                break
            default:
                break
        }
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

    setNewUserCollections(collections) {
        this.state.userCollections = collections
        this.emit(UPDATED_USER_COLLECTIONS, this.state.userCollections);
    }

    requestUserCollections = () => {
        this.state.userCollections.length === 0
            ? getMovieCollectionsByUserID()
            : this.emit(UPDATED_USER_COLLECTIONS, this.state.userCollections);
    }

    addChangeListener = (event, callback) => {
        this.on(event, callback);
    };

    removeChangeListener = (event, callback) => {
        this.off(event, callback);
    };
}