import * as React from 'react';

import DemoLockScreenCalendar from '@patterns/demos/DemoLockScreenCalendar';
import Footer from '@components/Footer';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';

function ExampleLockScreenCalendar(props) {
  return (
    <Page
      isNotOpenSourceExample
      title="Components ➝ lockscreen calendar"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/lockscreen-calendar"
    >
      <DemoLockScreenCalendar />
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ExampleLockScreenCalendar;
