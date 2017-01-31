import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';


describe('reducer', () => {

    it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
        type: 'SET_STATE',
        state: Map(
             {
                chosenSongId: 1,
                chosenSongMp3: 'http://test',
                chosenSongIndex: 1,
                chosenSongName: 'name'

        })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        chosenSongId: 1,
        chosenSongMp3: 'http://test',
        chosenSongIndex: 1,
        chosenSongName: 'name'

    }));
});

});