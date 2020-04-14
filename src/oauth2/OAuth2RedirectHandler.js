import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'
import {ACCESS_TOKEN} from "../constants/Const";

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        debugger;
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if(token) {
            debugger;
            console.log("sad")
            localStorage.setItem(ACCESS_TOKEN, token);
            return <Redirect to={{
                pathname: "/admin/index",
                state: { from: this.props.location }
            }}/>; 
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { 
                    from: this.props.location,
                    error: error 
                }
            }}/>; 
        }
    }
}

export default OAuth2RedirectHandler;