import * as React from 'react';

import DemoSearchComponentFour from '@patterns/demos/DemoSearchComponentFour';
import Footer from '@components/Footer';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';

function ExampleSearchVersionFour(props) {
  return (
    <Page
      isNotOpenSourceExample
      title="Components ➝ search concept IV"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/search-4"
    >
      <DemoSearchComponentFour />
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ExampleSearchVersionFour;
