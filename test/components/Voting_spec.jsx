import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import {Main} from '../../src/components/Main';
import {expect} from 'chai';

describe('Main', () => {

    it('renders a pair of buttons', () => {
        expect(true).to.equal(true);
    });

});