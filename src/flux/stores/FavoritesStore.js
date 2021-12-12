import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import {
    UPDATED_MOVIE_COLLECTIONS,
} from '../../util/constants';


export class FavoritesStore extends EventEmitter {

    constructor(props) {
        super(props);
        this.state = {
            movieCollections: [],
        };

        dispatcher.register(action => {
            switch (action.type) {
                case UPDATED_MOVIE_COLLECTIONS:
                    this.setNewCollections(action.payload);
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

    setNewCollections(collections) {
        this.state.movieCollections = collections
        this.emit(UPDATED_MOVIE_COLLECTIONS, this.state.movieCollections);
    }


}
