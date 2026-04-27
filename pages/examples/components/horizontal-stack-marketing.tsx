import * as React from 'react';

import Content from '@elements/layouts/Content';
import Cross from '@elements/icons/Cross';
import DemoElementSpacer from '@patterns/demos/DemoElementSpacer';
import Footer from '@components/Footer';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import IntDev from '@elements/icons/IntDev';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';
import SectionHorizontalStack from '@elements/sections/SectionHorizontalStack';

import { H1, Lead } from '@elements/type';

function ExampleHorizontalStackMarketing(props) {
  return (
    <Page
      title="wireframes.internet.dev ➝ components ➝ horizontal stack"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/horizontal-stack-marketing"
    >
      <Navigation />
      <SectionHorizontalStack
        top={
          <DemoElementSpacer left={<Cross height={64} />} right={<Cross height={64} />} middleStyle={{ display: 'flex', alignItems: 'flex-end' }}>
            <IntDev width="100%" />
          </DemoElementSpacer>
        }
        bottom={
          <DemoElementSpacer left={<Cross height={64} />} right={<Cross height={64} />}>
            <IntDev width="100%" />
          </DemoElementSpacer>
        }
      >
        <H1 style={{ textAlign: 'center' }}>Middle of Stack</H1>
        <Lead style={{ textAlign: 'center', marginTop: 24 }}>This is the middle of the stack in a calc(100dvh - 48px) container.</Lead>
      </SectionHorizontalStack>
      <Footer style={{ borderTop: `1px solid var(--theme-border)` }} />
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ExampleHorizontalStackMarketing;
