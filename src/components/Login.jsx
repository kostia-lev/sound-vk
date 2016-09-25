import React from 'react';
import {Link} from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Login = React.createClass({
    mixins: [PureRenderMixin],
    handleClick: function(e){
        var self=this;
        if(!this.props.authenticated){
            VK.Auth.login(function(data){
                self.props.auth(true);
            }, (VK.access.FRIENDS | VK.access.AUDIO | VK.access.GROUPS));
        }else{
            VK.Auth.logout(function(){
                self.props.auth(false);
            });
        }

        e.preventDefault();
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    render: function() {
        return <div>
            <a href="#" onClick={this.handleClick}>{this.props.authenticated? 'Logout':'Login'}</a>
            <div>
                {/*{show page only if user logged}*/}
                {(this.props.authenticated)? this.props.children:''}
            </div>
        </div>;
    }
});

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        authenticated: state.getIn(['vote', 'authenticated']),
    };
}

export const LoginContainer = connect(mapStateToProps,
    actionCreators)(Login);