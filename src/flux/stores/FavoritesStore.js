import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import {
    LIST_NOT_FOUND,
    NEW_USER_MOVIE_LISTS, NO_LISTS_FOUND,
    USER_MOVIE_LIST
} from '../../util/constants';


export class FavoritesStore extends EventEmitter {

    constructor(props) {
        super(props);
        this.state = {
            movieLists: [],
        };

        dispatcher.register(action => {
            switch (action.type) {
                case NEW_USER_MOVIE_LISTS:
                    this.setNewLists(action.payload);
                    break;
                case USER_MOVIE_LIST:
                    this.listReceived(action.payload);
                    break;
                case NO_LISTS_FOUND:
                    this.emitNoListsFound();
                    break;
                case LIST_NOT_FOUND:
                    this.emitListNotFound();
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

    emitListNotFound() {
        this.emit(LIST_NOT_FOUND, undefined);
    }

    emitNoListsFound() {
        this.emit(NO_LISTS_FOUND, undefined);
    }

    setNewLists(lists) {
        this.state.movieLists = lists
        this.emit(NEW_USER_MOVIE_LISTS, this.state.movieLists);
    }

    listReceived(list) {
        this.emit(USER_MOVIE_LIST, list)
    }

}
