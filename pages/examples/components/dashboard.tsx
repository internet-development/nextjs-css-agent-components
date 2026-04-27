import * as React from 'react';

import DashboardWithSidebarLayout from '@elements/layouts/DashboardWithSidebarLayout';
import DemoBentoLayout from '@patterns/demos/DemoBentoLayout';
import DemoSidebarLayout from '@patterns/demos/DemoSidebarLayout';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';

import { H1, Lead } from '@elements/type';

function ExampleDashboard(props) {
  const sidebarElement = <DemoSidebarLayout />;

  return (
    <Page
      title="wireframes.internet.dev ➝ components ➝ navigation, dashboard"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/dashboard"
    >
      <Navigation />
      <DashboardWithSidebarLayout sidebar={sidebarElement}>
        <DemoBentoLayout hideContent />
      </DashboardWithSidebarLayout>
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ExampleDashboard;
