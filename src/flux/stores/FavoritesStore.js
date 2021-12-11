import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import {
    NEW_USER_MOVIE_COLLECTIONS,
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
        this.emit(NEW_USER_MOVIE_COLLECTIONS, this.state.movieCollections);
    }


}
