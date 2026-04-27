import * as Queries from '@common/queries';
import * as React from 'react';
import * as Server from '@common/server';
import * as Utilities from '@common/utilities';

import Button from '@components/Button';
import Content from '@elements/layouts/Content';
import Footer from '@components/Footer';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import ModalAuthentication from '@patterns/modals/ModalAuthentication';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';
import SectionFullHeight from '@elements/sections/SectionFullHeight';

import { useModals } from '@runtime/modals/ModalContext';

function ExampleModals(props) {
  const modals = useModals();

  return (
    <Page
      title="wireframes.internet.dev ➝ features ➝ authentication ➝ modal"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/features/authentication/modal"
    >
      <Navigation />
      <SectionFullHeight>
        <Content>
          <Button
            onClick={() => {
              modals.open(ModalAuthentication);
            }}
          >
            Join or sign in
          </Button>
        </Content>
      </SectionFullHeight>
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

export default ExampleModals;
