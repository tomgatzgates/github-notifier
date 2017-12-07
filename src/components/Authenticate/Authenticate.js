import React, { Component } from 'react';
import {Card} from '@shopify/polaris';

class Authenticate extends Component {
  state = {
    token: '',
  }

  handleChange = (event) => {
    this.setState({token: event.target.value});
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
          <input type="text" value={token} onChange={this.handleChange}/>
        </Card.Section>
      </Card>
    );
  }
}

export default Authenticate;
