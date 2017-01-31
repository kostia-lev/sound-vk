import React from 'react';
import ReactDOM from 'react-dom';
import {MainContainer} from './components/Main';
import {Router, Route, hashHistory, browserHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer'

VK.init({
    apiId: 5641844
});
const store = createStore(reducer);
store.dispatch({
    type: 'SET_STATE',
    state: {
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
            loggedInUserPhotoSrc: '#',
            autoPlay: false,
            chosenSongObj: null,
            tabListActive: '#friends'
    }
});


ReactDOM.render(
    <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={MainContainer} />
    </Router>
    </Provider>,
    document.getElementById('app')
);

module.hot.accept();