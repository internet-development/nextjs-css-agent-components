import '@root/global.css';
import '@root/animations.css';

import * as React from 'react';

import Providers from '@patterns/chrome/Providers';

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;
