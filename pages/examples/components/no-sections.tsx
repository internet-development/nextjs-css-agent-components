import * as React from 'react';

import Content from '@elements/layouts/Content';
import DemoBentoLayout from '@patterns/demos/DemoBentoLayout';
import DemoPricing from '@patterns/demos/DemoPricing';
import DemoSimpleGrid from '@patterns/demos/DemoSimpleGrid';
import Footer from '@components/Footer';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';

import { H1, Lead } from '@elements/type';

function ExampleNoSections(props) {
  return (
    <Page
      title="wireframes.internet.dev ➝ components ➝ no sections"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/no-sections"
    >
      <Navigation />
      <Content>
        <H1>nextjs-sass-starter</H1>
        <Lead style={{ marginTop: `var(--type-scale-5)` }}>
          A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites. <br />
          <br />
          This example tests a navigation, theming, mobile responsiveness, a SEO pixel, and half browser height sections so more content is above the fold.
        </Lead>
      </Content>
      <DemoBentoLayout />
      <DemoSimpleGrid />
      <DemoPricing style={{ marginTop: `var(--type-scale-5)` }} />
      <Footer />
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ExampleNoSections;
