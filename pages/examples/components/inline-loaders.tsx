import * as React from 'react';

import DemoInlineLoaders from '@patterns/demos/DemoInlineLoaders';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';

function ExampleInlineLoaders(props) {
  return (
    <Page title="wireframes.internet.dev ➝ components ➝ inline loaders" description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites." url="https://wireframes.internet.dev/examples/components/inline-loaders">
      <Navigation />
      <DemoInlineLoaders />
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ExampleInlineLoaders;
