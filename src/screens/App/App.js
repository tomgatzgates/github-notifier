import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "actions/user";
import * as TokenActions from "actions/token";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from 'screens/Home/Home';
import Login from "screens/Auth/Auth";

import AppBanner from 'components/Banner/AppBanner'

const About = () => {
  return (<div><h1>About</h1></div>);
}
class App extends Component {
  constructor(props) {
    super(props);
    this.api = null;
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) {
    const { token } = this.props;

    if (token !== prevProps.token) {
      this.api = axios.create({
        baseURL: "https://api.github.com",
        auth: {
          username: token,
        }
      });

      this.getUser();
    }
  }

  getUser = () => {
    this.api
      .get("/user")
      .then(response => {
        console.log(response);
        this.props.setUser(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { user } = this.props;
    const { error } = this.state;

    return (
      <div>
        { error && <AppBanner message={error} /> }

        {!!Object.keys(user) && <p>{this.props.user.name}</p>}

        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/auth">Auth</Link>
              </li>
            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/auth" component={Login} />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(
  ({ token, user }) => ({ token, user }),
  dispatch => bindActionCreators({...TokenActions, ...UserActions}, dispatch)
)(App);
