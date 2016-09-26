import React from 'react';
import Song from './Song';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';


export const Voting = React.createClass({
    componentDidMount: function() {
        var self = this;
        var friends = [];
        var groups = [];
        VK.Api.call('friends.get', {fields:'first_name, last_name', 'count':3}, function(r){
            friends = r.response;
            console.log(friends);
            VK.Api.call('groups.get', {extended:true, 'count':3}, function(r){
                groups = r.response;
                console.log(groups);
                self.props.receiveFriendsGroups(friends, groups);
            });
        });
    },
    render: function() {
        return <div className="appcontainer">
            <div>
                <select name="friends">
                        {this.props.friends.map((obj, index) =>

                            <option key={obj.get('user_id')} value={obj.get('user_id')}>
                                {obj.get('first_name')+' '+obj.get('last_name')}
                                </option>

                        )}
                </select>
            </div>

            <div>
                <select name="groups">
                    {this.props.groups.map((obj, index) =>
                        (index==0)? '':<option key={obj.get('gid')} value={obj.get('gid')}>
                            {obj.get('name')}
                        </option>
                    )}
                </select>
            </div>
                    <div className="player"></div>
                </div>;
    }
});

function mapStateToProps(state) {
    return {
        pair: state.get('pair'),
        authenticated: state.get('authenticated'),
        friends: state.get('friends'),
        groups: state.get('groups')
    };
}

export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);