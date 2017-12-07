import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TokenActions from "actions/token";
import { Page, Layout, Card, Button } from "@shopify/polaris";

class Auth extends Component {
  state = {
    token: '',
    error: '',
  }

  handleOnChange = (event) => {
    const { target: { value } } = event;
    this.setState({token: value, error: ''});
  }

  handleSubmit = () => {
    this.props.authenticate(this.state.token);
  }

  render() {
    const { token } = this.state;

    return <Page title="Token">
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <ol>
                <li>Go to https://github.com/settings/tokens</li>
                <li>Click personal access tokens</li>
                <li>Generate new token</li>
                <li>All repo, Admin:org read, notifications</li>
                <li>Generate</li>
              </ol>
              <label>Personal Access Token</label>
              <input type="text" value={token} onChange={this.handleOnChange.bind(this)} />
              <Button onClick={this.handleSubmit}>Authenticate</Button>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>;
  }
};
export default connect(
  ({token}) => ({token}),
  (dispatch) => bindActionCreators(TokenActions, dispatch)
)(Auth);

