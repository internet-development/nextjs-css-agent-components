import * as React from 'react';

import Content from '@elements/layouts/Content';
import DemoBentoLayout from '@patterns/demos/DemoBentoLayout';
import DemoPricing from '@patterns/demos/DemoPricing';
import DemoSimpleGrid from '@patterns/demos/DemoSimpleGrid';
import Footer from '@components/Footer';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';
import SectionFullHeight from '@elements/sections/SectionFullHeight';

import { H1, Lead } from '@elements/type';

function ExampleFullLanding(props) {
  return (
    <Page
      title="wireframes.internet.dev ➝ components ➝ full section"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/full-section"
    >
      <Navigation />
      <SectionFullHeight>
        <Content>
          <H1>nextjs-sass-starter</H1>
          <Lead style={{ marginTop: `var(--type-scale-5)` }}>
            A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites. <br />
            <br />
            This example tests a navigation, theming, mobile responsiveness, a SEO pixel, and full browser height sections.
          </Lead>
        </Content>
      </SectionFullHeight>
      <SectionFullHeight>
        <DemoBentoLayout />
      </SectionFullHeight>
      <SectionFullHeight>
        <DemoSimpleGrid />
      </SectionFullHeight>
      <SectionFullHeight>
        <DemoPricing />
      </SectionFullHeight>
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

export default ExampleFullLanding;
