import * as React from 'react';

import DemoLockScreen from '@patterns/demos/DemoLockScreen';
import Footer from '@components/Footer';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';

function ExampleLockScreen(props) {
  return (
    <Page
      isNotOpenSourceExample
      title="Components ➝ lock screen"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/lockscreen"
    >
      <DemoLockScreen />
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ExampleLockScreen;
