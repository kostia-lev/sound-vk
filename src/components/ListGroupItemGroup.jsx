import React from 'react';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';

export const ListGroupItemGroup = React.createClass({
    handleGroupsChange: function(e){
        this.props.setState({chosenGroupId: this.props.obj.get('gid'), chosenFriendId:-1});
        this.props.handleGroupsChange(this.props.obj.get('gid'));
    },
    render: function() {
        return <li onClick={this.handleGroupsChange}
                   className={(typeof this.props.chosenGroupId != 'undefined' && typeof this.props.chosenGroupId != 'undefined' &&
        this.props.obj.get('gid') == this.props.chosenGroupId)? "list-group-item active":"list-group-item" }>
                                                <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm">
                                                <img src="images/a1.png" alt="..." className="img-circle"/>
                                                <i className="on b-light right sm"></i>
                                                </span>
            <div className="clear">
                <div><a href="#">{this.props.obj.get('first_name')+' '+ this.props.obj.get('last_name')}</a></div>
                <small className="text-muted">
                    {(typeof this.props.obj.get('city') == 'object')? this.props.obj.get('city').title : ''}</small>
            </div>
        </li>;
    }
});

function mapStateToProps(state) {
    return {
        chosenFriendId: state.get('chosenFriendId'),
        chosenGroupId: state.get('chosenGroupId')
    };
}

export const ListGroupItemGroupContainer = connect(mapStateToProps, actionCreators)(ListGroupItemGroup);