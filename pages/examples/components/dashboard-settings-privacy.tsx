import * as React from 'react';

import DashboardWithSidebarLayout from '@elements/layouts/DashboardWithSidebarLayout';
import DemoBentoLayout from '@patterns/demos/DemoBentoLayout';
import DemoSidebarLayoutSettings from '@patterns/demos/DemoSidebarLayoutSettings';
import FormSettingsPrivacy from '@components/FormSettingsPrivacy';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';

import { H1, Lead } from '@elements/type';

function ExampleDashboardSettingsPrivacy(props) {
  const sidebarElement = <DemoSidebarLayoutSettings />;

  return (
    <Page
      title="wireframes.internet.dev ➝ components ➝ navigation, dashboard settings privacy"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/dashboard-settings-privacy"
    >
      <Navigation />
      <DashboardWithSidebarLayout sidebar={sidebarElement}>
        <FormSettingsPrivacy />
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

export default ExampleDashboardSettingsPrivacy;
