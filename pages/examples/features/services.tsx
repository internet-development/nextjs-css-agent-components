import * as React from 'react';
import * as Server from '@common/server';
import * as Utilities from '@common/utilities';

import Cookies from '@modules/cookies';
import DemoServicesAndPaymentsWithLayout from '@patterns/demos/DemoServicesAndPaymentsWithLayout';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import KeyHeader from '@patterns/chrome/KeyHeader';
import Page from '@patterns/chrome/Page';

function ExampleServicesPage(props) {
  const [key, setKey] = React.useState<string>(props.sessionKey);

  return (
    <Page
      title="wireframes.internet.dev ➝ features ➝ services"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/features/services"
    >
      <KeyHeader onInputChange={setKey} value={key} viewer={props.viewer} />
      <DemoServicesAndPaymentsWithLayout viewer={props.viewer} />
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  const { sessionKey, viewer } = await Server.setup(context);

  return {
    props: { sessionKey, viewer },
  };
}

export default ExampleServicesPage;
