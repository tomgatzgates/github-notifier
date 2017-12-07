import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class AppBanner extends Component {
  render() {
    const { message } = this.props;

    return(
      <div>
        <p>{message}</p>
      </div>
    );
  }
}

AppBanner.props = {
  message: PropTypes.string.isRequired,
};
