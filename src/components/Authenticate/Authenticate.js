import React, { Component } from 'react';
import {Card,TextField} from '@shopify/polaris';

class Authenticate extends Component {
  state = {
    token: '',
  }

  handleChange = (value) => {
    this.setState({token: value});
  }

  render() {
    const { token } = this.state;
    const title = "Connect your Github account with Snoozify";
    const btnText = "Connect";

    return (
      <Card title={title} primaryFooterAction={{ content: btnText, onAction: () => this.props.handleSubmit(token) }}>
        <Card.Section>
          <p>
            We need access to your Github profile to see issues and repositories
          </p>
          <TextField label="Token" value={token} onChange={this.handleChange}/>
        </Card.Section>
      </Card>
    );
  }
}

export default Authenticate;
