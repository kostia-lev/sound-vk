import React from 'react';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';

export const ListGroupItemGroup = React.createClass({
    handleGroupsChange: function(e){
        this.props.setActiveAudioResource(-1, this.props.obj.get('gid'));
        this.props.handleGroupsChange(this.props.obj.get('gid'));
    },
    isVisible: function(){
        return (this.props.tabListActive == '#friends' || typeof this.props.friendGroupSearch == 'undefined'
        || this.props.friendGroupSearch == '' ||
        (this.props.obj.get('name').toLowerCase().
        indexOf(this.props.friendGroupSearch.toLowerCase()) != -1));
    },
    render: function() {
        return <li onClick={this.handleGroupsChange} style={{display: this.isVisible()? "inherit":"none"}}
                   className={(typeof this.props.chosenGroupId != 'undefined' && typeof this.props.chosenGroupId != 'undefined' &&
        this.props.obj.get('gid') == this.props.chosenGroupId)? "list-group-item active":"list-group-item" }>
                                                <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm">
                                                <img src="images/a1.png" alt="..." className="img-circle"/>
                                                <i className="on b-light right sm"></i>
                                                </span>
            <div className="clear">
                <div><a href="#">{this.props.obj.get('name')}</a></div>
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
        tabListActive: state.get('tabListActive'),
        friendGroupSearch: state.get('friendGroupSearch')
    };
}

export const ListGroupItemGroupContainer = connect(mapStateToProps, actionCreators)(ListGroupItemGroup);