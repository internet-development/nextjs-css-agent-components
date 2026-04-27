import * as React from 'react';

import Button from '@components/Button';
import Content from '@elements/layouts/Content';
import Footer from '@components/Footer';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';
import SectionFullHeight from '@elements/sections/SectionFullHeight';
import ModalColorPicker from '@patterns/modals/ModalColorPicker';

import { useModals } from '@runtime/modals/ModalContext';

function ExampleModalsWebsitePrompt(props) {
  const modals = useModals();

  return (
    <Page
      title="wireframes.internet.dev ➝ components ➝ modals color picker"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/modals-color-picker"
    >
      <Navigation />
      <SectionFullHeight>
        <Content>
          <Button onClick={() => modals.open(ModalColorPicker)}>Show the color picker</Button>
        </Content>
      </SectionFullHeight>
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ExampleModalsWebsitePrompt;
