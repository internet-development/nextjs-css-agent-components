import * as React from 'react';

import DemoPost from '@patterns/demos/DemoPost';
import Footer from '@components/Footer';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';

function ExamplePost(props) {
  return (
    <Page
      title="wireframes.internet.dev ➝ components ➝ post"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/post"
    >
      <Navigation />
      <DemoPost />
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

export default ExamplePost;
