import React from 'react';
import {Page, Layout, Card, Button} from '@shopify/polaris';

const Home = () => {
  return(
    <Page title="Home">
      <Layout>
        <Layout.Section secondary>
          <Card sectioned>Side bar</Card>
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <Button onClick={() => alert('Button clicked!')}>Example button</Button>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
export default Home;
