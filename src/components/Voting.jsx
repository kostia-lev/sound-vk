import React from 'react';
import {SongContainer} from './Song';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';


export const Voting = React.createClass({
    songEnded: function(e){
        console.log(parseInt(this.props.chosenSongIndex)+1);
        //play next song in playlist array
        var nextSongObj = this.props.playlist.get(parseInt(this.props.chosenSongIndex)+1);
        this.props.setState({chosenSongId: nextSongObj.get('aid'), chosenSongMp3: nextSongObj.get('url'),
            chosenSongIndex: (parseInt(this.props.chosenSongIndex)+1),
            chosenSongName: (nextSongObj.get('artist') + ': ' + nextSongObj.get('title'))
        });
        this.playSong(nextSongObj.get('url'));
    },
    componentDidMount: function() {
        $(this.refs.audio).on('ended', this.songEnded);
        var self = this;
        var friends = [];
        var groups = [];
        var playlist = [];

        VK.Api.call('friends.get', {fields:'first_name, last_name'}, function(r){
            friends = r.response;
            console.log(friends);
            VK.Api.call('groups.get', {extended:true}, function(r){
                groups = r.response;
                console.log(groups);
                self.props.receiveFriendsGroups(friends, groups);
            });
        });
    },
    componentWillUnmount: function(){
        $(this.refs.audio).unbind('audio');
    },
    handleFriendsChange(e){

        this.props.setState({chosenFriendId: e.target.value, chosenGroupId:-1});
        if(e.target.value != -1){
            this.getAudios(e.target.value);
        }else{
            this.props.setState({playlist: []});
        }
    },
    getAudios(owner_id){
        var self = this;
        VK.Api.call('audio.get', {owner_id: owner_id}, function(r){
            if(r.response){
                var audios = r.response;
                console.log(audios);
                self.props.setState({playlist: audios});
            }else{
                console.log(r);
            }
        });
    },
    handleGroupsChange(e){
        this.props.setState({chosenGroupId: e.target.value, chosenFriendId: -1});
        if(e.target.value != -1){
            this.getAudios('-' + e.target.value);
        }else{
            this.props.setState({playlist: []});
        }
    },
    playSong(url){
        var audio = this.refs.audio;
        //this.refs.audio.src = url;
        audio.load();
        audio.play();
    },
    render: function() {
        return <div className="appcontainer">
                    <div>Привет, {this.props.loggedInUser.get('first_name')+' '+this.props.loggedInUser.get('last_name')}!</div>
                    <div>
                        <select ref="friendsSelect" onChange={this.handleFriendsChange} name="friends">
                                <option value="-1">-</option>
                                <option key={this.props.loggedInUser.get('id')} value={this.props.loggedInUser.get('id')} >
                                    {this.props.loggedInUser.get('first_name')+' '+this.props.loggedInUser.get('last_name')}
                                </option>

                                {this.props.friends.map((obj, index) =>
                                    <option key={obj.get('user_id')} value={obj.get('user_id')}>
                                        {obj.get('first_name')+' '+obj.get('last_name')}
                                        </option>
                                )}
                        </select>
                    </div>

                    <div>
                        <select ref="groupsSelect" onChange={this.handleGroupsChange} name="groups">
                            <option value='-1'>-</option>
                            {this.props.groups.map((obj, index) =>
                                (index==0)? '':<option key={obj.get('gid')} value={obj.get('gid')}>
                                    {obj.get('name')}
                                </option>
                            )}
                        </select>
                    </div>

                    <div className="playList">
                        <div className="playlistContainer">
                            {this.props.playlist.map((obj, index) =>
                                (index==0)? '':<SongContainer index={String(index)} changeSong={this.playSong} key={obj.get('aid')}
                                                              url={obj.get('url')} aid={obj.get('aid')}
                                                     entry={obj.get('artist') + ': ' + obj.get('title') }/>
                            )}
                        </div>
                    </div>

                    <div className="player">

                        <audio ref="audio" controls>
                            <source src={this.props.chosenSongMp3} type="audio/mpeg"/>
                                    Your browser does not support the audio element.
                        </audio>
                        <span className="nowPlayingPrefix">Now playing: </span>
                        <span className="nowPlaying">{this.props.chosenSongName}</span>


                    </div>
              </div>;
    }
});

function mapStateToProps(state) {
    return {
        pair: state.get('pair'),
        authenticated: state.get('authenticated'),
        loggedInUser: state.get('loggedInUser'),
        friends: state.get('friends'),
        groups: state.get('groups'),
        chosenFriendId: state.get('chosenFriendId'),
        chosenGroupId: state.get('chosenGroupId'),
        playlist: state.get('playlist'),
        chosenSongId: state.get('chosenSongId'),
        chosenSongMp3: state.get('chosenSongMp3'),
        chosenSongIndex: state.get('chosenSongIndex'),
        chosenSongName: state.get('chosenSongName')
    };
}

export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);