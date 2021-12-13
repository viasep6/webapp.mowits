import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import {
    ERROR,
    NEW_WITS_RETURNED,
    SUCCESS
} from '../../util/constants';


export class WitStore extends EventEmitter {

    constructor(props) {
        super(props);
        dispatcher.register(action => {
            switch (action.type) {
                case NEW_WITS_RETURNED:
                    this.newWitsReturned(action.payload)
                    break
                default:
                    break;
            }
        });
    }

    newWitsReturned(result) {
        switch (result.state) {
            case SUCCESS:
                this.emit(NEW_WITS_RETURNED, result.data);
                break
            case ERROR:
                this.emit(NEW_WITS_RETURNED, result.data);
                break
            default:
                break
        }
    }

    addChangeListener(event, callback) {
        this.on(event, callback);
    }

    removeChangeListener(event, callback) {
        this.off(event, callback);
    }
}