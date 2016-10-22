import {Map} from 'immutable';

function setState(state, newState) {
    return state.merge(newState);
}

export default function(state = Map(), action) {
    switch (action.type) {
        case 'SET_STATE':
            return setState(state, action.state);

        case 'AUTH':
            return setState(state, action.state);

        case 'FRIEND_GROUP_SEARCH':
            return setState(state, action.state);

        case 'FRIEND_TAB_CHANGE':
            return setState(state, action.state);
    }
    return state;
}