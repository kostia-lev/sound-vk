import React from 'react';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';

export const Song = React.createClass({
    playSong: function(e){
        this.props.setState({chosenSongId: this.props.aid, chosenSongMp3: this.props.url,
            chosenSongIndex: this.props.index, chosenSongName: this.props.entry});
        this.props.changeSong(this.props.url);
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
        chosenSongMp3: state.get('chosenSongMp3'),
        chosenSongIndex: state.get('chosenSongIndex'),
        chosenSongName: state.get('chosenSongName'),
    };
}

export const SongContainer = connect(mapStateToProps, actionCreators)(Song);