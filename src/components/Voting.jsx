import React from 'react';
import {SongContainer} from './Song';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';


export const Voting = React.createClass({
    componentDidMount: function() {
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
    handleFriendsChange(e){
        this.props.setState({chosenFriendId: e.target.value, chosenGroupId:-1});
        this.getAudios(e.target.value);
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
        this.getAudios('-' + e.target.value);
    },
    render: function() {
        return <div className="appcontainer">
                    <div>
                        <select ref="friendsSelect" onChange={this.handleFriendsChange} name="friends">
                                {this.props.friends.map((obj, index) =>

                                    <option key={obj.get('user_id')} value={obj.get('user_id')}>
                                        {obj.get('first_name')+' '+obj.get('last_name')}
                                        </option>
                                )}
                        </select>
                    </div>

                    <div>
                        <select ref="groupsSelect" onChange={this.handleGroupsChange} name="groups">
                            {this.props.groups.map((obj, index) =>
                                (index==0)? '':<option key={obj.get('gid')} value={obj.get('gid')}>
                                    {obj.get('name')}
                                </option>
                            )}
                        </select>
                    </div>

                    <div className="playList">
                        <div className="songContainer">
                            {this.props.playlist.map((obj, index) =>
                                (index==0)? '':<SongContainer key={obj.get('aid')} url={obj.get('url')}
                                                     entry={obj.get('artist') + ' ' + obj.get('title')}>
                                                    {obj.get('artist') + ' ' + obj.get('title')}
                                                </SongContainer>
                            )}
                        </div>
                    </div>

                    <div className="player">

                        <audio ref="audio" controls>
                            <source src={this.props.chosenSongMp3} type="audio/mpeg"/>
                                    Your browser does not support the audio element.
                        </audio>


                    </div>
              </div>;
    }
});

function mapStateToProps(state) {
    return {
        pair: state.get('pair'),
        authenticated: state.get('authenticated'),
        friends: state.get('friends'),
        groups: state.get('groups'),
        chosenFriendId: state.get('chosenFriendId'),
        chosenGroupId: state.get('chosenGroupId'),
        playlist: state.get('playlist'),
        chosenSongId: state.get('chosenSongId'),
        chosenSongMp3: state.get('chosenSongMp3')
    };
}

export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);