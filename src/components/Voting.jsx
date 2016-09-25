import React from 'react';
import Song from './Song';
import {connect} from 'react-redux';


export const Voting = React.createClass({
    getPair: function() {
        VK.Api.call('audio.get', {owner_id: 7850914, count: 3}, function(r){
            console.log(r);
        });
        return this.props.pair || [];
    },
    render: function() {
        return <div className="appcontainer">
                    <div>
                    {this.getPair().map((obj, index) =>
                        (0 == index)? '': <Song key={obj.title} entry={obj.title}/>
                    )}
                    </div>
                    <div className="player"></div>
                </div>;
    }
});

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        authenticated: state.getIn(['vote', 'authenticated']),
        tally: state.getIn(['vote', 'tally'])
    };
}

export const VotingContainer = connect(mapStateToProps)(Voting);