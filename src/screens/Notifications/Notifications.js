import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as NotificationActions from "actions/notifications";
import {
  Page,
  Layout,
  Card,
  Button,
  Link,
  List,
  Icon,
  DisplayText,
  Heading,
  FooterHelp,
  ResourceList,
  Thumbnail,
  Tabs,
} from "@shopify/polaris";
import axios from "axios";

const FILTERS = {
  pullRequests: 'PullRequest',
  issues: 'Issue',
};

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.api = axios.create({
      baseURL: "https://api.github.com",
      auth: {
        username: props.token,
      }
    });

    this.state = {
      tabIndex: 0,
    }
  }

  componentDidMount() {
    if(!this.props.notifications.length) {
      this.api
      .get("/notifications")
      .then(response => {
        console.log(response);
        this.props.saveNotifications(response.data)
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }

  filterItems(tab) {
    const { notifications } = this.props;
    return notifications.filter(n => {
      if (!FILTERS[tab]) {
        return true
      } else {
        return n.subject.type === FILTERS[tab];
      }
    });
  }

  renderIssue (issue){
    return {
      url: issue.subject.latest_comment_url,
      media: <Icon source="alert" />,
      attributeOne: issue.subject.title,
      actions: [{content: 'View listing'}],
      persistActions: true,
      //"#139801 opened 16 hours ago by jgodson ",
      // badges: [{ content: "Assigned" }],
    };
  }
  renderPullRequest(pullRequest){
    return {
      url: pullRequest.subject.latest_comment_url,
      media: <Icon source="embed" />,
      attributeOne: pullRequest.subject.title,
      //"#139801 opened 16 hours ago by jgodson ",
      // badges: [{ content: "Assigned" }],
    };
  }
  renderPanel(tabId) {
    const items = this.filterItems(tabId).map(n => {
      return n.subject.type === 'Issue'
        ? this.renderIssue(n)
        : this.renderPullRequest(n);
    });

    return(
      <ResourceList items={items} renderItem={(item, index) => {
        return <ResourceList.Item key={index} {...item} />;
      }} />
    );
  }

  render() {
    const { tabIndex } = this.state;

    const tabs = [
      { id: "all", title: "All", accessibilityLabel: "Issues and pull requests", panelID: "all" },
      { id: "pullRequests", title: "Pull Requests", accessibilityLabel: "Pull requests", panelID: "pullRequests" },
      { id: "issues", title: "Issues", accessibilityLabel: "Issues", panelID: "issues" },
    ];


    return(
      <Page title="Notifications">
        <Tabs fitted selected={tabIndex} tabs={tabs} onSelect={tabIndex => this.setState({ tabIndex })} />

        <Tabs.Panel id={tabs[tabIndex].panelId}>
          { !!this.props.notifications.length && this.renderPanel(tabs[tabIndex].id) }
        </Tabs.Panel>
      </Page>
    );
  }
}

export default connect(
  ({ token, notifications }) => ({ token, notifications }),
  (dispatch) => bindActionCreators(NotificationActions, dispatch)
)(Notifications);
