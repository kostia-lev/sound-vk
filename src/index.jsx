import React from 'react';
import ReactDOM from 'react-dom';
import {VotingContainer} from './components/Voting';
import {Router, Route, hashHistory, browserHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer'
import App from './components/App';
VK.init({
    apiId: 5641844
});
const store = createStore(reducer);
store.dispatch({
    type: 'SET_STATE',
    state: {
            pair: [{title:'Sunshine'}, {title:'28 Days Later'}, {title:'Trainspotting'}],
            authenticated: false,
            friends: [],
            groups: [],
            chosenFriendId: -1,
            chosenGroupId: -1,
            playlist: [],
            chosenSongId: -1,
            chosenSongMp3: '#',
            chosenSongIndex: -1,
            chosenSongName: '',
            loggedInUser: null,
            autoPlay: false,
            chosenSongObj: null,
            tabListActive: '#friends'
    }
});


ReactDOM.render(
    <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={VotingContainer} />
    </Router>
    </Provider>,
    document.getElementById('app')
);

module.hot.accept();