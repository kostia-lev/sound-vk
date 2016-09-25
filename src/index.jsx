import React from 'react';
import ReactDOM from 'react-dom';
import {VotingContainer} from './components/Voting';
import {LoginContainer} from './components/Login';
import {Router, Route, hashHistory} from 'react-router';
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
        vote: {
            pair: ['Sunshine', '28 Days Later', 'Trainspotting'],
            tally: ['Sunshine', 2],
            authenticated: false,
            winner: 'winner'
        }
    }
});


const routes = <Route component={LoginContainer}>
                        <Route path="/" component={VotingContainer} />
                </Route>;

ReactDOM.render(
    <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);

module.hot.accept();