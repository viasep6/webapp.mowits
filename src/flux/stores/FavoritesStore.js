import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import {
    COLLECTION_NOT_FOUND,
    NEW_USER_MOVIE_COLLECTIONS, NO_COLLECTIONS_FOUND,
    USER_MOVIE_COLLECTION
} from '../../util/constants';


export class FavoritesStore extends EventEmitter {

    constructor(props) {
        super(props);
        this.state = {
            movieCollections: [],
        };

        dispatcher.register(action => {
            switch (action.type) {
                case NEW_USER_MOVIE_COLLECTIONS:
                    this.setNewCollections(action.payload);
                    break;
                case USER_MOVIE_COLLECTION:
                    this.collectionReceived(action.payload);
                    break;
                case NO_COLLECTIONS_FOUND:
                    this.emitNoCollectionsFound();
                    break;
                case COLLECTION_NOT_FOUND:
                    this.emitCollectionNotFound();
                    break;
                default:
                    break;
            }
        });
    }

    addChangeListener(event, callback) {
        this.on(event, callback);
    }

    removeChangeListener(event, callback) {
        this.off(event, callback);
    }

    emitCollectionNotFound() {
        this.emit(COLLECTION_NOT_FOUND, undefined);
    }

    emitNoCollectionsFound() {
        this.emit(NO_COLLECTIONS_FOUND, undefined);
    }

    setNewCollections(collections) {
        this.state.movieCollections = collections
        this.emit(NEW_USER_MOVIE_COLLECTIONS, this.state.movieCollections);
    }

    collectionReceived(collection) {
        this.emit(USER_MOVIE_COLLECTION, collection)
    }

}
