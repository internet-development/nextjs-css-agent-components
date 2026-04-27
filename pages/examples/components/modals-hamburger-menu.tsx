import * as React from 'react';

import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import HamburgerMenuButton from '@patterns/chrome/HamburgerMenuButton';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';

function ExampleModalsHamburgerMenu(props) {
  // (@xBalbinus): This populates the navigation in the hamburger menu.
  // You should change this to your own content in production.
  const NAV_CONTENT = [
    { name: 'Home' },
    { name: 'About' },
  ];

  return (
    <Page
      title="wireframes.internet.dev ➝ components ➝ modals hamburger menu"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/modals-hamburger-menu"
    >
      <Navigation />
      <GlobalModalManager />
      <HamburgerMenuButton navItems={NAV_CONTENT} />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ExampleModalsHamburgerMenu;
