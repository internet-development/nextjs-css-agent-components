import * as React from 'react';

import DemoSearchComponentPerplexityAgent from '@patterns/demos/DemoSearchComponentPerplexityAgent';
import Footer from '@components/Footer';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';

// DemoSearchComponentPerplexityAgent

function ExampleSearchVersionPerplexityAgent(props) {
  return (
    <Page
      isNotOpenSourceExample
      title="Components ➝ search concept with perplexity and calendar"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/search-perplexity-agent"
    >
      <DemoSearchComponentPerplexityAgent />
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ExampleSearchVersionPerplexityAgent;
