import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Page,
  Layout,
  Card,
  Button,
  Link,
  List,
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
      notifications: [],
    }
  }

  componentDidMount() {
    this.api
      .get("/notifications")
      .then(response => {
        console.log(response);
        this.setState({notifications: response.data})
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  parseNotifications(data) {
    let issues;
    let pullRequests;
    let repositories;
    let notifications;

    data.each(i => {

    });
    this.setState({notifications})
  }

  filterItems(tab) {
    const { notifications } = this.state;
    return notifications.filter(n => {
      if (!FILTERS[tab]) {
        return true
      } else {
        return n.subject.type === FILTERS[tab];
      }
    });
  }

  renderPanel(tabId) {
    const items = this.filterItems(tabId).map(n => {
      return {
        url: n.subject.lastest_comment_url,
        media: <Thumbnail
          source={n.repository.owner.avatar_url}
          alt="Black choker necklace"
        />,
        attributeOne: n.subject.title,
        // attributeTwo: "#139801 opened 16 hours ago by jgodson ",
        // badges: [{ content: "Assigned" }],
      };
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
          { !!this.state.notifications.length && this.renderPanel(tabs[tabIndex].id) }
        </Tabs.Panel>
      </Page>
    );
  }
}

export default connect(({ token }) => ({ token }))(Notifications);
