import React from 'react';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';

export const ListGroupItem = React.createClass({
    handleFriendsChange: function(e){
        this.props.setState({chosenFriendId: this.props.obj.get('uid'), chosenGroupId:-1});
        this.props.handleFriendsChange(this.props.obj.get('uid'));
    },
    isVisible: function(){
        return (this.props.tabListActive == '#groups' || typeof this.props.friendGroupSearch == 'undefined'
        || this.props.friendGroupSearch == '' ||
        (this.props.obj.get('first_name').toLowerCase().
        indexOf(this.props.friendGroupSearch.toLowerCase()) != -1) || (this.props.obj.get('last_name').toLowerCase().
        indexOf(this.props.friendGroupSearch.toLowerCase()) != -1));
    },
    render: function() {
        return <li onClick={this.handleFriendsChange} style={{display: this.isVisible()? "inherit":"none"}}
                   className={(typeof this.props.chosenFriendId != 'undefined' && typeof this.props.chosenFriendId != 'undefined' &&
        this.props.obj.get('uid') == this.props.chosenFriendId)? "list-group-item active":"list-group-item" }>
                                                <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm">
                                                <img src="images/a1.png" alt="..." className="img-circle"/>
                                                <i className="on b-light right sm"></i>
                                                </span>
            <div className="clear">
                <div><a href="#">{}
                {this.props.obj.get('first_name')+' '+ this.props.obj.get('last_name')}</a></div>
                <small className="text-muted">
                    {(typeof this.props.obj.get('city') == 'object')? this.props.obj.get('city').title : ''}</small>
            </div>
        </li>;
    }
});

function mapStateToProps(state) {
    return {
        chosenFriendId: state.get('chosenFriendId'),
        chosenGroupId: state.get('chosenGroupId'),
        friendGroupSearch: state.get('friendGroupSearch'),
        tabListActive: state.get('tabListActive')
    };
}

export const ListGroupItemContainer = connect(mapStateToProps, actionCreators)(ListGroupItem);