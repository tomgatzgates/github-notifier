import React from 'react';
import {Page, Layout, Card, Button, AccountConnection, List, DisplayText, Heading, FooterHelp, Link, Tabs, ResourceList, Icon} from '@shopify/polaris';

const Home = () => {
  return(
    <Page title="Snoozify">
      <Layout>
        <Layout.Section secondary>
          <Card>
            <Card.Section><Heading>Watching</Heading>
              <List>
                <List.Item>Issues</List.Item>
                <List.Item>Pull requests</List.Item>
              </List>
            </Card.Section>
            <Card.Section><Heading>Repositories</Heading>
              <List>
                <List.Item>shopify/shopify</List.Item>
                <List.Item>shopify/documentation</List.Item>
                <List.Item>shopify/shopify-theme-store</List.Item>
              </List>
              <Button plain>View all repositories</Button>
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <DisplayText size="extraLarge">Good evening, Tom.</DisplayText>
          <DisplayText size="small">We have a lot of work to do.</DisplayText>
          <AccountConnection
          title="Connect your Github account with Snoozify"
          action={{content: 'Connect'}}
          details="No account connected"
          termsOfService={<p>By clicking Connect, you agree to Let us read all the Github information. Thanks.</p>}
          />
          <Tabs
            fitted
            selected={0}
            tabs={[
              {
                id: 'all-content',
                title: 'All',
                accessibilityLabel: 'Issues and pull requests',
                panelID: 'all-content',
              },
              {
                id: 'issues',
                title: 'Issues',
                panelID: 'issues-content',
              },
              {
                id: 'pull-requests',
                title: 'Pull Requests',
                panelID: 'pull-requests-content',
              },
            ]}
          />
          <ResourceList
            items={[
              {
                url: '#',
                media: <Icon source="alert" />,
                attributeOne: 'Bug when scripts uses a discount code to discount cart to 0',
                attributeTwo: '#139801 opened 16 hours ago by jgodson ', 
                badges: [{
                  content: 'Assigned',
                }]
              },{
                url: '#',
                media: <Icon source="embed" />,
                attributeOne: 'Allow reconciliation to be re-run after successful resolution',
                attributeTwo: '#139824 opened 15 minutes ago by jasonwebster',
                badges: [{
                  status: 'attention',
                  content: 'Needs review',
                }],
                actions: [{content: 'Watch'}],
                persistActions: true,
              },
              {
                url: '#',
                media: <Icon source="alert" />,
                attributeOne: 'Error in TrackingSyncJob with deleted api client',
                attributeTwo: '#139730 opened 22 hours ago by shopify-spy ',
                actions: [{content: 'Watch'}],
                persistActions: true,
              },
            ]}
            renderItem={(item, index) => {
              return <ResourceList.Item key={index} {...item} />;
            }}
          />
          <FooterHelp>Learn more about who made this. <Link url="">Tom Gates</Link> and <Link url="">Kevin Schaeken</Link>.</FooterHelp>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
export default Home;
