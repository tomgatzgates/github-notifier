import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from 'screens/Home/Home';
import Issues from "screens/Issues/Issues";

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
    return (
     <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/issues" component={Issues} />
        </div>
      </Router>
    );
  }
}

export default connect(({ token }) => ({ token }))(App);
