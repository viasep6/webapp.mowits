import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import {
    NEW_USER_MOVIE_LISTS
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
                default:
                    break;
            }
        });
    }

    setNewLists(lists) {
        this.state.movieLists = lists
        this.emit(NEW_USER_MOVIE_LISTS, this.state.movieLists);
    }


    addChangeListener(event, callback) {
        this.on(event, callback);
    }

    removeChangeListener(event, callback) {
        this.off(event, callback);
    }

}