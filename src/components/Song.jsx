import React from 'react';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';

export const Song = React.createClass({
    playSong: function(e){

        if(this.props.aid == this.props.chosenSongId && !$("#jplayer_N").data().jPlayer.status.paused){
            $("#jplayer_N").jPlayer('pause');
            return;
        }else if(this.props.aid == this.props.chosenSongId && $("#jplayer_N").data().jPlayer.status.paused){
            $("#jplayer_N").jPlayer('play');
            return;
        }

        this.props.setState({chosenSongId: this.props.aid, chosenSongMp3: this.props.url,
            chosenSongIndex: this.props.index, chosenSongName: this.props.entry, chosenSongObj: this.props.songObj});
        console.log(this.props.songObj.get('title'));
        this.props.changeSong(this.props.songObj);
    },
    secondsFormat(seconds){
        var minutes = Math.floor(seconds/60);
        var seconds = seconds%60;
        return (minutes.toString().length==1? '0'+minutes.toString():minutes.toString()) + ':' +
                (seconds.toString().length==1? '0'+seconds.toString():seconds.toString());
    }
    ,
    render: function() {
        return <div className={'col-xs-6 col-sm-4 col-md-3 col-lg-2'}
         onClick={this.playSong} >
            <div className="item">
            <div className="pos-rlt">
            <div className="bottom">
            <span className="badge bg-info m-l-sm m-b-sm">{this.secondsFormat(this.props.songObj.get('duration'))}</span>
        </div>
        <div className={ (typeof this.props.aid != 'undefined' && typeof this.props.chosenSongId != 'undefined' &&
        this.props.aid == this.props.chosenSongId)? ' item-overlay opacity r r-2x bg-black active':'item-overlay opacity r r-2x bg-black'}>
            <div className="text-info padder m-t-sm text-sm">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star-o text-muted"></i>
            </div>
            <div className="center text-center m-t-n">
            <a href="#" className={ (typeof this.props.aid != 'undefined' && typeof this.props.chosenSongId != 'undefined' &&
            this.props.aid == this.props.chosenSongId)? 'active':''}>
                <i
                   className={ (typeof this.props.aid != 'undefined' && typeof this.props.chosenSongId != 'undefined' &&
                this.props.aid == this.props.chosenSongId)? 'icon-control-play i-2x text-active':'icon-control-play i-2x text'}></i>
                <i className={ (typeof this.props.aid != 'undefined' && typeof this.props.chosenSongId != 'undefined' &&
                   this.props.aid == this.props.chosenSongId)? 'icon-control-pause i-2x text':'icon-control-pause i-2x text-active'}></i>
            </a>
            </div>
            <div className="bottom padder m-b-sm">
            <a href="#" className="pull-right">
            <i className="fa fa-heart-o"></i>
            </a>
            <a href="#">
            <i className="fa fa-plus-circle"></i>
            </a>
            </div>
            </div>
            <a href="#"><img src="images/p1.jpg" alt="" className="r r-2x img-full"/></a>
            </div>
            <div className="padder-v">
            <a href="#" className="text-ellipsis">{this.props.songObj.get('title')}</a>
        <a href="#" className="text-ellipsis text-xs text-muted">{this.props.songObj.get('artist')}</a>
            </div>
            </div>
            </div>;
    }
});

function mapStateToProps(state) {
    return {
        chosenSongId: state.get('chosenSongId'),
        chosenSongMp3: state.get('chosenSongMp3'),
        chosenSongIndex: state.get('chosenSongIndex'),
        chosenSongName: state.get('chosenSongName'),
        chosenSongObj: state.get('chosenSongObj'),
    };
}

export const SongContainer = connect(mapStateToProps, actionCreators)(Song);