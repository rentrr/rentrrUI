import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
import React, {Component} from "react";
import Alert from 'react-s-alert';
import AppHeader from "./common/AppHeader";
import LoadingIndicator from "./common/LoadingIndicator";
import {ACCESS_TOKEN} from "./constants/Const";
import {getCurrentUser} from "./util/APIUtils";
import OAuth2RedirectHandler from "./oauth2/OAuth2RedirectHandler";
import NotFound from "./common/NotFound";




class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: false
        }

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    loadCurrentlyLoggedInUser() {
        this.setState({
            loading: true
        });

        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    authenticated: true,
                    loading: false
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null
        });
        alert("Success");
        Alert.success("You're safely logged out!");
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }



    render() {
            if(this.state.loading) {
                return <LoadingIndicator />
            }

            return (
                <div className="app">
                    {/*<div className="app-top-box">
                        <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
                    </div>*/}
                    <div className="app-body">
                        <Switch>
                            <Route path="/admin" render={props => <AdminLayout {...props} authenticated={this.state.authenticated} logout={this.handleLogout} currentUser={this.state.currentUser}/>} />
                            <Route path="/auth" render={props => <AuthLayout authenticated={this.state.authenticated} {...props} />} />
                            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                            <Redirect from="/" to="/admin/index" />
                        </Switch>
                    </div>
                    <Alert stack={{limit: 3}}
                           timeout = {3000}
                           position='top-right' effect='slide' offset={65} />
                </div>
            );
        }
    }

    export default App;

