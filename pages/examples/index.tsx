import * as React from 'react';

import Content from '@elements/layouts/Content';
import Footer from '@components/Footer';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';
import SectionFullHeight from '@elements/sections/SectionFullHeight';

import { H1, Lead } from '@elements/type';

function ExampleBase(props) {
  return (
    <Page
      title="wireframes.internet.dev ➝ example"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples"
    >
      <Navigation />
      <SectionFullHeight>
        <Content>
          <H1>nextjs-sass-starter</H1>
          <Lead style={{ marginTop: `var(--type-scale-5)` }}>
            A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites. <br />
            <br />
            This example tests a navigation, theming, SEO pixel, and if scrollbars accidently render since we don't use overflow hacks.
          </Lead>
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

export default ExampleBase;
