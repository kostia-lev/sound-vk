import React from 'react';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';
import {debounce} from 'throttle-debounce';

export const FriendGroupSearch = React.createClass({
    componentWillMount() {
        this.typeSearch = debounce(500, this.typeSearch);
    },
    printChange(e) {
        this.typeSearch(e.target.value);
    },
    typeSearch: function(val){
        this.props.friendGroupSearchOntype(val);
    },
    render: function() {
        return <form className="" role="search">
            <div className="form-group clearfix m-b-none">
                <div className="input-group m-t m-b">
                        <span className="input-group-btn">
                          <button type="submit" className="btn btn-sm bg-empty text-muted btn-icon"><i className="fa fa-search"></i></button>
                        </span>
                    <input onKeyUp={this.printChange} type="text"
                           className="form-control input-sm text-white bg-empty b-b b-dark no-border" placeholder="Search members"/>
                </div>
            </div>
        </form>;
    }
});

function mapStateToProps(state) {
    return {
        chosenSongId: state.get('chosenSongId'),
        chosenSongMp3: state.get('chosenSongMp3'),
        chosenSongIndex: state.get('chosenSongIndex'),
        chosenSongName: state.get('chosenSongName'),
        chosenSongObj: state.get('chosenSongObj'),
        friendGroupSearch: state.get('friendGroupSearch')
    };
}

export const FriendGroupSearchContainer = connect(mapStateToProps, actionCreators)(FriendGroupSearch);