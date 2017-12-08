import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as IssueActions from "actions/issues";
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

class Issues extends Component {
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
    if(!this.props.issues.length) {
      this.api
        .get("/issues?filter=subscribed")
        .then(response => {
          console.log(response);
          this.props.saveIssues(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  filterIssues(tabId) {
    const { issues } = this.props;
    switch (tabId) {
      case "pullRequests":
        return issues.filter(i => !!i.pull_request);
      case "issues":
        return issues.filter(i => !i.pull_request);
      default:
        return issues;
    }
  }

  renderIssue(issue){
    return {
      media: <Icon source="alert" />,
    };
  }
  renderPullRequest(issue){
    return {
      media: <Icon source="embed" />,
    };
  }
  renderPanel(tabId) {
    const items = this.filterIssues(tabId).sort((a, b) => {
      return Date.parse(b.updated_at) - Date.parse(a.updated_at);
    }).map(issue => {
      return {
        url: issue.html_url,
        media: <Icon source="alert" />,
        attributeOne: issue.title,
        attributeTwo: `#${issue.number} ${issue.state} by ${issue.user.login}`,
        attributeThree: <img src={issue.user.avatar_url} width="25px" height="25px" />,
        ...!!issue.pull_request ? this.renderPullRequest(issue) : this.renderIssue(issue),
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
      <Page title="Issues">
        <Tabs fitted selected={tabIndex} tabs={tabs} onSelect={tabIndex => this.setState({ tabIndex })} />

        <Tabs.Panel id={tabs[tabIndex].panelId}>
          { !!this.props.issues.length && this.renderPanel(tabs[tabIndex].id) }
        </Tabs.Panel>
      </Page>
    );
  }
}

export default connect(
  ({ token, issues }) => ({ token, issues }),
  (dispatch) => bindActionCreators(IssueActions, dispatch)
)(Issues);
