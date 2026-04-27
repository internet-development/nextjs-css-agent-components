import * as React from 'react';

import DemoSearchComponentLockScreenResults from '@patterns/demos/DemoSearchComponentLockScreenResults';
import Footer from '@components/Footer';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';

function ExampleSearchVersionLockScreenResults(props) {
  return (
    <Page
      isNotOpenSourceExample
      title="Components ➝ search lockscreen results"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/search-lockscreen-results"
    >
      <DemoSearchComponentLockScreenResults />
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ExampleSearchVersionLockScreenResults;
