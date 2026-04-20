import * as Queries from '@common/queries';
import * as React from 'react';
import * as Server from '@common/server';
import * as Utilities from '@common/utilities';

import ActionItem from '@system/documents/ActionItem';
import Button from '@system/Button';
import Checkbox from '@system/Checkbox';
import Cookies from '@modules/cookies';
import Content from '@system/layouts/Content';
import GlobalModalManager from '@system/modals/GlobalModalManager';
import Input from '@system/Input';
import KeyHeader from '@system/KeyHeader';
import ModalError from '@demos/modals/ModalError';
import MonospacePreview from '@system/MonospacePreview';
import Page from '@components/Page';
import TextArea from '@system/TextArea';
import ThinAppLayoutHeader from '@system/layouts/ThinAppLayoutHeader';
import ThreeColumnAppLayout from '@system/layouts/ThreeColumnAppLayout';

import { P } from '@system/typography';
import { FormHeading, FormParagraph, InputLabel } from '@system/typography/forms';
import { useModals } from '@root/system/modals/ModalContext';

const DOCUMENT_TYPE = 'EVENT_PROPOSAL';

function ExampleEventProposals(props) {
  const modals = useModals();

  const [currentProposal, setCurrentProposal] = React.useState<Record<string, any> | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [proposals, setProposals] = React.useState<Array<any>>([]);
  const [key, setKey] = React.useState<string>(props.sessionKey);
  const [updates, setUpdates] = React.useState<Record<string, any> | null>(null);

  const onError = (message: string) => {
    modals.open(ModalError, { message: message });
  };

  const onAddLineItem = () => {
    if (!updates) return;
    const items = updates.budget_items ? [...updates.budget_items] : [];
    items.push({ item: '', vendor: '', cost: '' });
    setUpdates({ ...updates, budget_items: items });
  };

  const onRemoveLineItem = (index: number) => {
    if (!updates) return;
    const items = [...updates.budget_items];
    items.splice(index, 1);
    setUpdates({ ...updates, budget_items: items });
  };

  const onUpdateLineItem = (index: number, field: string, value: string) => {
    if (!updates) return;
    const items = [...updates.budget_items];
    items[index] = { ...items[index], [field]: value };
    setUpdates({ ...updates, budget_items: items });
  };

  const sidebar = (
    <div style={{ padding: `48px 24px 24px 24px` }}>
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
      <FormHeading style={{ marginTop: 64 }}>Event Proposals</FormHeading>
      <FormParagraph>
        Use this form to submit event proposals for review. Each proposal includes event details, non-negotiable acknowledgments, and a financial plan.
      </FormParagraph>
      <FormParagraph>Each proposal gets a unique page with a unique ID that is only discoverable if you share it.</FormParagraph>
      <Button
        onClick={async () => {
          if (Utilities.isEmpty(key)) {
            return onError('You must provide an API key');
          }

          const domain = Utilities.getDomainFromEmailWithoutAnySubdomain(props.viewer.email);
          const result = await Queries.onUserCreateDocument({ key, type: DOCUMENT_TYPE, domain });
          if (!result) {
            return;
          }

          const results = await Queries.onRefreshDocuments({ key, type: DOCUMENT_TYPE, domain });
          if (!results) {
            return;
          }

          setProposals(results.data);
        }}
        style={{ marginTop: 24, width: '100%' }}
      >
        Create
      </Button>
      <ActionItem
        icon={`⊹`}
        onClick={async () => {
          if (Utilities.isEmpty(key)) {
            return onError('You must provide an API key');
          }

          const domain = Utilities.getDomainFromEmailWithoutAnySubdomain(props.viewer.email);
          const results = await Queries.onRefreshDocuments({ key, type: DOCUMENT_TYPE, domain });
          if (!results) {
            return;
          }

          setProposals(results.data);
        }}
        style={{ marginTop: 16 }}
      >
        Refresh / List proposals
      </ActionItem>
    </div>
  );

  const details = (
    <div style={{ padding: `48px 24px 24px 24px` }}>
      {proposals.map((each) => {
        return (
          <MonospacePreview
            isActive={currentProposal && each.id === currentProposal.id}
            key={each.id}
            onClick={() => {
              if (currentProposal && currentProposal.id === each.id) {
                return;
              }

              setCurrentProposal(each);
              setUpdates({
                event_name: each.data.event_name || '',
                event_date: each.data.event_date || '',
                proposer_name: each.data.proposer_name || '',
                proposer_email: each.data.proposer_email || '',
                nonneg_no_back_office: each.data.nonneg_no_back_office || false,
                nonneg_no_bathrooms: each.data.nonneg_no_bathrooms || false,
                nonneg_no_trash: each.data.nonneg_no_trash || false,
                nonneg_no_retail: each.data.nonneg_no_retail || false,
                nonneg_no_paying: each.data.nonneg_no_paying || false,
                description: each.data.description || '',
                community_benefit: each.data.community_benefit || '',
                expected_attendance: each.data.expected_attendance || '',
                setup_requirements: each.data.setup_requirements || '',
                additional_notes: each.data.additional_notes || '',
                budget_items: each.data.budget_items || [{ item: '', vendor: '', cost: '' }],
              });
            }}
            onDelete={async () => {
              if (Utilities.isEmpty(key)) {
                return onError('You must provide an API key');
              }

              const confirm = window.confirm(`Are you sure you want to delete ${each.id}? This action is irreversible.`);
              if (!confirm) {
                return;
              }

              const response = await Queries.onDeleteDocumentById({ id: each.id, key });
              const domain = Utilities.getDomainFromEmailWithoutAnySubdomain(props.viewer.email);
              const results = await Queries.onRefreshDocuments({ key, type: DOCUMENT_TYPE, domain });
              if (!results) {
                return;
              }

              if (currentProposal && currentProposal.id === each.id) {
                setCurrentProposal(null);
              }

              setProposals(results.data);
            }}
            style={{ marginBottom: 16 }}
            title={each.data.type}
          >
            {JSON.stringify({ id: each.id, event: each.data.event_name }, null, 2)}
          </MonospacePreview>
        );
      })}
    </div>
  );

  return (
    <Page
      title="wireframes.internet.dev ➝ features ➝ event proposal"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/features/event-proposal"
    >
      <KeyHeader onInputChange={setKey} value={key} viewer={props.viewer} />
      <ThreeColumnAppLayout sidebar={sidebar} details={details}>
        {updates && currentProposal ? (
          <div style={{ padding: `48px 24px 24px 24px` }}>
            <div>
              <ActionItem icon={`⭢`} href={`/examples/features/event-proposal/${currentProposal.id}`} target="_blank">
                View shareable event proposal
              </ActionItem>
            </div>

            <FormHeading style={{ marginTop: 32 }}>Event Information</FormHeading>

            <InputLabel style={{ marginTop: 24 }}>Event name</InputLabel>
            <Input
              autoComplete="off"
              name="event_name"
              onChange={(e) => {
                setUpdates({ ...updates, [e.target.name]: e.target.value });
              }}
              placeholder="Belltown Art Walk Opening"
              style={{ marginTop: 8 }}
              value={updates.event_name}
            />

            <InputLabel style={{ marginTop: 16 }}>Event date</InputLabel>
            <Input
              autoComplete="off"
              name="event_date"
              onChange={(e) => {
                setUpdates({ ...updates, [e.target.name]: e.target.value });
              }}
              placeholder="June 15th, 2026"
              style={{ marginTop: 8 }}
              value={updates.event_date}
            />

            <InputLabel style={{ marginTop: 16 }}>Proposer name</InputLabel>
            <Input
              autoComplete="off"
              name="proposer_name"
              onChange={(e) => {
                setUpdates({ ...updates, [e.target.name]: e.target.value });
              }}
              placeholder="Jane Doe"
              style={{ marginTop: 8 }}
              value={updates.proposer_name}
            />

            <InputLabel style={{ marginTop: 16 }}>Proposer e-mail</InputLabel>
            <Input
              autoComplete="off"
              name="proposer_email"
              onChange={(e) => {
                setUpdates({ ...updates, [e.target.name]: e.target.value });
              }}
              placeholder="jane@example.com"
              style={{ marginTop: 8 }}
              value={updates.proposer_email}
            />

            <FormHeading style={{ marginTop: 64 }}>Non-Negotiables</FormHeading>
            <FormParagraph>You must acknowledge all of the following before submitting this proposal.</FormParagraph>

            <Checkbox
              name="nonneg_no_back_office"
              onChange={(e) => {
                setUpdates({ ...updates, [e.target.name]: e.target.checked });
              }}
              value={updates.nonneg_no_back_office}
              style={{ marginTop: 24 }}
            >
              No one is allowed in the back of the office during Belltown Art Walk
            </Checkbox>

            <Checkbox
              name="nonneg_no_bathrooms"
              onChange={(e) => {
                setUpdates({ ...updates, [e.target.name]: e.target.checked });
              }}
              value={updates.nonneg_no_bathrooms}
              style={{ marginTop: 8 }}
            >
              No one is allowed to use the bathrooms, keep the door locked
            </Checkbox>

            <Checkbox
              name="nonneg_no_trash"
              onChange={(e) => {
                setUpdates({ ...updates, [e.target.name]: e.target.checked });
              }}
              value={updates.nonneg_no_trash}
              style={{ marginTop: 8 }}
            >
              No trash goes in the trash bins, we recycle
            </Checkbox>

            <Checkbox
              name="nonneg_no_retail"
              onChange={(e) => {
                setUpdates({ ...updates, [e.target.name]: e.target.checked });
              }}
              value={updates.nonneg_no_retail}
              style={{ marginTop: 8 }}
            >
              No retail sales of items or exchange of items directly during the event
            </Checkbox>

            <Checkbox
              name="nonneg_no_paying"
              onChange={(e) => {
                setUpdates({ ...updates, [e.target.name]: e.target.checked });
              }}
              value={updates.nonneg_no_paying}
              style={{ marginTop: 8 }}
            >
              We are not paying anyone unless there is a good reason. We are not a charity, we are a for-profit business with revenue goals. A good reason means the benefit is justifiable.
            </Checkbox>

            <FormHeading style={{ marginTop: 64 }}>Event Details</FormHeading>

            <InputLabel style={{ marginTop: 24 }}>Event description</InputLabel>
            <TextArea
              autoComplete="off"
              name="description"
              onChange={(e) => {
                setUpdates({ ...updates, [e.target.name]: e.target.value });
              }}
              style={{ marginTop: 8 }}
              value={updates.description}
            />

            <InputLabel style={{ marginTop: 16 }}>Community benefit</InputLabel>
            <TextArea
              autoComplete="off"
              name="community_benefit"
              onChange={(e) => {
                setUpdates({ ...updates, [e.target.name]: e.target.value });
              }}
              style={{ marginTop: 8 }}
              value={updates.community_benefit}
            />

            <InputLabel style={{ marginTop: 16 }}>Expected attendance</InputLabel>
            <Input
              autoComplete="off"
              name="expected_attendance"
              onChange={(e) => {
                setUpdates({ ...updates, [e.target.name]: e.target.value });
              }}
              placeholder="50"
              style={{ marginTop: 8 }}
              value={updates.expected_attendance}
            />

            <InputLabel style={{ marginTop: 16 }}>Setup requirements</InputLabel>
            <TextArea
              autoComplete="off"
              name="setup_requirements"
              onChange={(e) => {
                setUpdates({ ...updates, [e.target.name]: e.target.value });
              }}
              style={{ marginTop: 8 }}
              value={updates.setup_requirements}
            />

            <InputLabel style={{ marginTop: 16 }}>Additional notes</InputLabel>
            <TextArea
              autoComplete="off"
              name="additional_notes"
              onChange={(e) => {
                setUpdates({ ...updates, [e.target.name]: e.target.value });
              }}
              style={{ marginTop: 8 }}
              value={updates.additional_notes}
            />

            <FormHeading style={{ marginTop: 64 }}>Financial Plan</FormHeading>
            <FormParagraph>Add line items for all anticipated costs associated with the event.</FormParagraph>

            <div
              style={{
                marginTop: 24,
                display: 'flex',
                borderBottom: '1px solid var(--theme-border)',
                paddingBottom: 8,
              }}
            >
              <InputLabel style={{ width: '40%', margin: 0 }}>Item / Component</InputLabel>
              <InputLabel style={{ width: '30%', margin: 0 }}>Person / Vendor</InputLabel>
              <InputLabel style={{ width: '20%', margin: 0 }}>Cost</InputLabel>
              <div style={{ width: '10%' }} />
            </div>

            {updates.budget_items &&
              updates.budget_items.map((lineItem, index) => {
                return (
                  <div key={index} style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
                    <Input
                      autoComplete="off"
                      onChange={(e) => onUpdateLineItem(index, 'item', e.target.value)}
                      placeholder="Refreshments"
                      style={{ width: '40%' }}
                      value={lineItem.item}
                    />
                    <Input
                      autoComplete="off"
                      onChange={(e) => onUpdateLineItem(index, 'vendor', e.target.value)}
                      placeholder="Local Bakery"
                      style={{ width: '30%' }}
                      value={lineItem.vendor}
                    />
                    <Input
                      autoComplete="off"
                      onChange={(e) => onUpdateLineItem(index, 'cost', e.target.value)}
                      placeholder="$0.00"
                      style={{ width: '20%' }}
                      value={lineItem.cost}
                    />
                    <button
                      onClick={() => onRemoveLineItem(index)}
                      style={{
                        width: '10%',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 16,
                        color: 'var(--theme-text)',
                        opacity: 0.5,
                      }}
                      type="button"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}

            <ActionItem icon={`⊹`} onClick={onAddLineItem} style={{ marginTop: 16 }}>
              Add line item
            </ActionItem>

            <Button
              onClick={async () => {
                if (Utilities.isEmpty(key)) {
                  return onError('You must provide an API key');
                }

                setLoading(true);
                const result = await Queries.onUpdateDocumentById({ id: currentProposal.id, key, data: updates });
                if (!result) {
                  setLoading(false);
                  return;
                }

                const domain = Utilities.getDomainFromEmailWithoutAnySubdomain(props.viewer.email);
                const results = await Queries.onRefreshDocuments({ key, type: DOCUMENT_TYPE, domain });
                setLoading(false);
                if (!results) {
                  return;
                }

                setProposals(results.data);
              }}
              style={{ marginTop: 24, width: '100%' }}
            >
              Submit proposal
            </Button>
            <Button
              onClick={async () => {
                if (Utilities.isEmpty(key)) {
                  return onError('You must provide an API key');
                }

                setLoading(true);
                const result = await Queries.onUpdateDocumentById({ id: currentProposal.id, key, data: { ...updates, status: 'DRAFT' } });
                if (!result) {
                  setLoading(false);
                  return;
                }

                const domain = Utilities.getDomainFromEmailWithoutAnySubdomain(props.viewer.email);
                const results = await Queries.onRefreshDocuments({ key, type: DOCUMENT_TYPE, domain });
                setLoading(false);
                if (!results) {
                  return;
                }

                setProposals(results.data);
              }}
              visual
              style={{ marginTop: 8, width: '100%' }}
            >
              Save draft
            </Button>
            <ActionItem icon={`⭢`} href={`/examples/features/event-proposal/${currentProposal.id}`} target="_blank" style={{ marginTop: 16 }}>
              View shareable event proposal
            </ActionItem>
          </div>
        ) : null}
      </ThreeColumnAppLayout>
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  const { sessionKey, viewer } = await Server.setup(context);

  return {
    props: { sessionKey, viewer },
  };
}

export default ExampleEventProposals;
