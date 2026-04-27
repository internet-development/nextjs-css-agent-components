import * as React from 'react';
import * as Server from '@common/server';
import * as Utilities from '@common/utilities';

import ActionItem from '@elements/marks/ActionItem';
import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import Content from '@elements/layouts/Content';
import DemoLevelsExample from '@patterns/demos/DemoLevelsExample';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import GridLayout from '@elements/layouts/GridLayout';
import Input from '@elements/controls/Input';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';
import Select from '@components/Select';
import TextArea from '@elements/controls/TextArea';
import TwoColumnLayoutSidebar from '@elements/layouts/TwoColumnLayoutSidebar';

import { FormHeading, FormParagraph, InputLabel } from '@elements/type/forms';
import { H1, H2, H3, H4, Lead, SubLead, P, Title, Text, SubTitle, SubText, UnitLabel } from '@elements/type';

const PLACEHOLDER = `A large ramp`;

const options = [
  { value: '1', label: 'Option A' },
  { value: '2', label: 'Option B' },
  { value: '3', label: 'Option C' },
];

function ExampleWindowsLevelSelector(props) {
  const [currentSelectValue, setSelectValue] = React.useState<string | null>(null);
  const [checked, setChecked] = React.useState(true);
  const [unchecked, setUnchecked] = React.useState(false);

  return (
    <Page
      title="wireframes.internet.dev ➝ components ➝ windows marble level select"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/windows-level-selector"
    >
      <Navigation />
      <TwoColumnLayoutSidebar
        sidebar={
          <GridLayout style={{ overflow: 'hidden', position: 'relative' }}>
            <DemoLevelsExample />
          </GridLayout>
        }
      >
        <Content>
          <FormHeading>Edit 001 — World One</FormHeading>

          <img
            alt="Marble world preview"
            style={{ display: 'block', margin: `16px 0 0px 0`, width: '100%', borderRadius: `4px` }}
            src="https://intdev-global.s3.us-west-2.amazonaws.com/public/internet-dev/7de9c721-b118-43a5-8692-1209911bea2e.png"
          />
          <Button href="#" style={{ marginTop: 16, width: '100%' }}>
            Open world editor
          </Button>

          <InputLabel style={{ marginTop: 24 }}>Name</InputLabel>
          <Input style={{ marginTop: 8 }} defaultValue={`World One`} />

          <InputLabel style={{ marginTop: 24 }}>Description</InputLabel>
          <TextArea style={{ marginTop: 8 }} defaultValue={PLACEHOLDER} />

          <Button href="#" style={{ marginTop: 48, width: '100%' }}>
            Save
          </Button>
          <Button href="#" style={{ background: `var(--theme-foreground)`, color: `var(--theme-foreground-text)`, marginTop: 16, width: '100%' }}>
            Cancel
          </Button>
          <Button visual href="#" style={{ marginTop: 16, width: '100%' }}>
            Remove
          </Button>
        </Content>
      </TwoColumnLayoutSidebar>
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

export default ExampleWindowsLevelSelector;
