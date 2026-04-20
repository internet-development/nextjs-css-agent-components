import styles from '@system/documents/index.module.scss';

import * as Queries from '@common/queries';
import * as React from 'react';
import * as Utilities from '@common/utilities';

import IntDev from '@system/svg/IntDev';
import InvoiceLayout from '@system/layouts/InvoiceLayout';
import Page from '@components/Page';

import { H4, Title, Text } from '@system/typography';

function ExampleEventProposal(props) {
  const allAcknowledged =
    props.data.nonneg_no_back_office &&
    props.data.nonneg_no_bathrooms &&
    props.data.nonneg_no_trash &&
    props.data.nonneg_no_retail &&
    props.data.nonneg_no_paying;

  const budgetItems = props.data.budget_items || [];
  const totalCost = budgetItems.reduce((sum, item) => {
    const cost = parseFloat(String(item.cost).replace(/[^0-9.]/g, ''));
    return sum + (isNaN(cost) ? 0 : cost);
  }, 0);

  return (
    <Page
      isNotOpenSourceExample
      title={`wireframes.internet.dev ➝ event proposal ${props.id}`}
      description={`Event proposal for ${props.data.event_name || 'Untitled Event'}`}
      url={`https://wireframes.internet.dev/examples/features/event-proposal/${props.id}`}
    >
      <InvoiceLayout>
        <IntDev height="32px" style={{ marginTop: 88 }} />
        <H4 style={{ marginTop: 16 }}>
          Event Proposal
          <br />
          {props.data.event_name || 'Untitled Event'}
        </H4>
        <Text style={{ marginTop: 16 }}>
          <strong>Proposal ID</strong> ➝ {props.id}
          <br />
          <strong>Date submitted</strong> ➝ {Utilities.toDateISOString(props.updated_at)}
        </Text>

        <section className={styles.row} style={{ marginTop: 48 }}>
          <section className={Utilities.classNames(styles.column, styles.shaded)}>1. Event Information</section>
          <section className={Utilities.classNames(styles.column, styles.subshaded)}>Event Name:</section>
          <section className={styles.remainder}>{props.data.event_name}</section>
        </section>

        <section className={styles.row}>
          <section className={Utilities.classNames(styles.column, styles.shaded)}></section>
          <section className={Utilities.classNames(styles.column, styles.subshaded)}>Event Date:</section>
          <section className={styles.remainder}>{props.data.event_date}</section>
        </section>

        <section className={styles.row}>
          <section className={Utilities.classNames(styles.column, styles.shaded)}></section>
          <section className={Utilities.classNames(styles.column, styles.subshaded)}>Proposer:</section>
          <section className={styles.remainder}>
            {props.data.proposer_name}
            {props.data.proposer_email ? ` (${props.data.proposer_email})` : ''}
          </section>
        </section>

        <section className={styles.row} style={{ marginTop: 24 }}>
          <section className={Utilities.classNames(styles.column, styles.shaded)}>2. Non-Negotiables</section>
          <section className={Utilities.classNames(styles.column, styles.subshaded)}>Status:</section>
          <section className={styles.remainder}>
            <strong>{allAcknowledged ? 'All acknowledged' : 'Not all acknowledged'}</strong>
          </section>
        </section>

        <section className={styles.row}>
          <section className={Utilities.classNames(styles.column, styles.shaded)}></section>
          <section className={Utilities.classNames(styles.column, styles.subshaded)}>2.1.</section>
          <section className={styles.remainder}>
            {props.data.nonneg_no_back_office ? '✓' : '✕'} No one is allowed in the back of the office during Belltown Art Walk
          </section>
        </section>

        <section className={styles.row}>
          <section className={Utilities.classNames(styles.column, styles.shaded)}></section>
          <section className={Utilities.classNames(styles.column, styles.subshaded)}>2.2.</section>
          <section className={styles.remainder}>
            {props.data.nonneg_no_bathrooms ? '✓' : '✕'} No one is allowed to use the bathrooms, keep the door locked
          </section>
        </section>

        <section className={styles.row}>
          <section className={Utilities.classNames(styles.column, styles.shaded)}></section>
          <section className={Utilities.classNames(styles.column, styles.subshaded)}>2.3.</section>
          <section className={styles.remainder}>{props.data.nonneg_no_trash ? '✓' : '✕'} No trash goes in the trash bins, we recycle</section>
        </section>

        <section className={styles.row}>
          <section className={Utilities.classNames(styles.column, styles.shaded)}></section>
          <section className={Utilities.classNames(styles.column, styles.subshaded)}>2.4.</section>
          <section className={styles.remainder}>
            {props.data.nonneg_no_retail ? '✓' : '✕'} No retail sales of items or exchange of items directly during the event
          </section>
        </section>

        <section className={styles.row}>
          <section className={Utilities.classNames(styles.column, styles.shaded)}></section>
          <section className={Utilities.classNames(styles.column, styles.subshaded)}>2.5.</section>
          <section className={styles.remainder}>
            {props.data.nonneg_no_paying ? '✓' : '✕'} We are not paying anyone unless there is a good reason. We are not a charity, we are a for-profit business with revenue goals.
            A good reason means the benefit is justifiable.
          </section>
        </section>

        <section className={styles.row} style={{ marginTop: 24 }}>
          <section className={Utilities.classNames(styles.column, styles.shaded)}>3. Event Details</section>
          <section className={Utilities.classNames(styles.column, styles.subshaded)}>3.1. Description:</section>
          <section className={styles.remainder}>{props.data.description}</section>
        </section>

        <section className={styles.row}>
          <section className={Utilities.classNames(styles.column, styles.shaded)}></section>
          <section className={Utilities.classNames(styles.column, styles.subshaded)}>3.2. Community Benefit:</section>
          <section className={styles.remainder}>{props.data.community_benefit}</section>
        </section>

        <section className={styles.row}>
          <section className={Utilities.classNames(styles.column, styles.shaded)}></section>
          <section className={Utilities.classNames(styles.column, styles.subshaded)}>3.3. Expected Attendance:</section>
          <section className={styles.remainder}>{props.data.expected_attendance}</section>
        </section>

        <section className={styles.row}>
          <section className={Utilities.classNames(styles.column, styles.shaded)}></section>
          <section className={Utilities.classNames(styles.column, styles.subshaded)}>3.4. Setup Requirements:</section>
          <section className={styles.remainder}>{props.data.setup_requirements}</section>
        </section>

        {props.data.additional_notes ? (
          <section className={styles.row}>
            <section className={Utilities.classNames(styles.column, styles.shaded)}></section>
            <section className={Utilities.classNames(styles.column, styles.subshaded)}>3.5. Additional Notes:</section>
            <section className={styles.remainder}>{props.data.additional_notes}</section>
          </section>
        ) : null}

        {budgetItems.length > 0 ? (
          <>
            <section className={styles.row} style={{ marginTop: 24 }}>
              <section className={Utilities.classNames(styles.column, styles.shaded)}>4. Financial Plan</section>
              <section className={Utilities.classNames(styles.column, styles.subshaded)}>Item / Component</section>
              <section className={styles.fact}>Person / Vendor</section>
              <section className={styles.fact}>Cost</section>
            </section>

            {budgetItems.map((lineItem, index) => (
              <section className={styles.row} key={index}>
                <section className={Utilities.classNames(styles.column, styles.shaded)}></section>
                <section className={Utilities.classNames(styles.column, styles.subshaded)}>{lineItem.item}</section>
                <section className={styles.fact}>{lineItem.vendor}</section>
                <section className={styles.fact}>{lineItem.cost}</section>
              </section>
            ))}

            <section className={styles.row}>
              <section className={Utilities.classNames(styles.column, styles.shaded)}></section>
              <section className={Utilities.classNames(styles.column, styles.subshaded)}>
                <strong>Total</strong>
              </section>
              <section className={styles.fact}></section>
              <section className={styles.fact}>
                <strong>{Utilities.formatDollars(totalCost)}</strong>
              </section>
            </section>
          </>
        ) : null}

        <Text style={{ marginTop: 88, opacity: 0.4 }}>
          This event proposal is confidential and intended only for authorized reviewers. If you are not the intended recipient, please disregard this document.
        </Text>
        <Text style={{ marginTop: 16, opacity: 0.4 }}>If you have questions about this proposal, please contact the proposer directly.</Text>
        <Text style={{ marginTop: 16, opacity: 0.4 }}>Thank you!</Text>
      </InvoiceLayout>
    </Page>
  );
}

export async function getServerSideProps(context) {
  const results = await Queries.onGetDocumentById({ id: context.params.id });

  if (!results) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { ...results.data },
  };
}

export default ExampleEventProposal;
