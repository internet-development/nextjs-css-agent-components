import * as React from 'react';
import * as Server from '@common/server';
import * as Utilities from '@common/utilities';

import AppLayout from '@elements/layouts/AppLayout';
import Cookies from '@modules/cookies';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import KeyHeader from '@patterns/chrome/KeyHeader';
import Page from '@patterns/chrome/Page';
import Table from '@components/Table';
import ThinAppLayoutHeader from '@elements/layouts/ThinAppLayoutHeader';

import { P } from '@elements/type';
import { FormHeading, FormParagraph } from '@elements/type/forms';

function ExampleFixedStockWatchlist(props) {
  const [key, setKey] = React.useState<string>(props.sessionKey);

  const headings = [`Stock`, `Price`, `Outstanding Shares`, `P/E`, `Marketcap (USD)`];
  const data = props.data
    ? Object.keys(props.data).map((each) => {
        const stock = props.data[each].quote;
        return {
          id: each,
          data: [
            <a key={stock.symbol} href={`/examples/features/stocks/${stock.symbol}`} target="_blank">
              {stock.companyName} ({stock.symbol})
            </a>,
            `${Utilities.formatDollars(stock.iexRealtimePrice)}`,
            `${Number(stock.marketCap / stock.iexRealtimePrice)}`,
            `${stock.peRatio}`,
            `${Utilities.formatDollars(stock.marketCap)}`,
          ],
        };
      })
    : [];

  return (
    <Page
      title="wireframes.internet.dev ➝ features ➝ stocks ➝ fixed watchlist"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/features/stocks/fixed-watchlist"
    >
      <KeyHeader onInputChange={setKey} value={key} viewer={props.viewer} />
      <AppLayout>
        <ThinAppLayoutHeader
          token={key}
          onSignOut={() => {
            const confirm = window.confirm('Are you sure you want to sign out?');
            if (!confirm) {
              return;
            }

            setKey('');
            Cookies.remove('sitekey');
            window.location.reload();
          }}
        />
        <FormHeading style={{ marginTop: 48 }}>Example watchlist</FormHeading>
        <FormParagraph>
          Here is a sample list of stocks accessible through a hardcoded endpoint. If you are authenticated, you can use our API to view this stock watchlist and monitor the stock
          prices in real time. All prices are sourced from IEX Cloud and are updated live.
        </FormParagraph>
        {data && data.length ? <Table data={data} headings={headings} style={{ marginTop: 24 }} /> : null}
      </AppLayout>
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  let data = null;

  const { sessionKey, viewer } = await Server.setup(context);

  try {
    const response = await fetch('https://api.internet.dev/api/markets/stocks', {
      method: 'POST',
      headers: { 'X-API-KEY': sessionKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ tickers: 'msft,aapl,goog' }),
    });
    const result = await response.json();
    if (result && result.data) {
      data = result.data;
    }
  } catch (e) {}

  return {
    props: { sessionKey, viewer, data },
  };
}

export default ExampleFixedStockWatchlist;
