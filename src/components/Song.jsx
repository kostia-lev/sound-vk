import React from 'react';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';

export const Song = React.createClass({
    playSong: function(e){
        this.props.setState({chosenSongId: this.props.key, chosenSongMp3: this.props.url});
        var audio = this.refs.audio;
        audio.load(); //call this to just preload the audio without playing
        audio.play(); //call this to play the song right away
    },
    render: function() {
        return <div className="songContainer">
                        <button onClick={this.playSong} className="song">
                            <h1>{this.props.entry}</h1>
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