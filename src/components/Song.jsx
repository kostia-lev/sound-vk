import React from 'react';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';

export const Song = React.createClass({
    playSong: function(e){
        this.props.setState({chosenSongId: this.props.aid, chosenSongMp3: this.props.url});
        this.props.changeSong(this.props.url);
        //not the state is old, so we cannot use props from here
        //console.log(this.props.chosenSongMp3);
        //console.log(this.props.chosenSongId);
    },
    render: function() {
        return <div className={ (typeof this.props.aid != 'undefined' && typeof this.props.chosenSongId != 'undefined' &&
        this.props.aid == this.props.chosenSongId)? ' songContainer active':'songContainer'}>
                        <button onClick={this.playSong} className="song">
                            <h1>{this.props.entry + this.props.aid}</h1>
                        </button>
                </div>;
    }
});

function mapStateToProps(state) {
    return {
        chosenSongId: state.get('chosenSongId'),
        chosenSongMp3: state.get('chosenSongMp3')
    };
}

export const SongContainer = connect(mapStateToProps, actionCreators)(Song);