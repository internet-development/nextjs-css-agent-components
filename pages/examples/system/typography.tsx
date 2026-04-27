import * as React from 'react';
import * as Utilities from '@common/utilities';

import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import GridLayout from '@elements/layouts/GridLayout';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';
import Table from '@components/Table';
import Tag from '@elements/marks/Tag';
import TwoColumnLayoutFull from '@elements/layouts/TwoColumnLayoutFull';

import { H1, H2, H3, H4, Lead, SubLead, P, Title, Text, SubTitle, SubText, UnitLabel } from '@elements/type';
import { FormHeading, FormSubHeading, FormParagraph, InputLabel } from '@elements/type/forms';

const TABLE_HEADINGS = [``, `Component`, `Size`, `Preview`];
const COPY = `My heart had great experience of wisdom and knowledge, [1:17] and I gave my heart to know wisdom, and to know madness and folly: I perceived that this also is vexation of spirit. For in much wisdom is much grief: and he that increaseth knowledge increaseth sorrow.`;

function ExampleSystemTypography(props) {
  const TABLE_DATA = [
    { id: 1, data: [``, <Tag key="label-1">H1</Tag>, <Tag key="size-1">3.815rem</Tag>, <H1 key="copy-1">{COPY}</H1>] },
    { id: 2, data: [``, <Tag key="label-2">H2</Tag>, <Tag key="size-2">3.052rem</Tag>, <H2 key="copy-2">{COPY}</H2>] },
    { id: 3, data: [``, <Tag key="label-3">H3</Tag>, <Tag key="size-3">2.441rem</Tag>, <H3 key="copy-3">{COPY}</H3>] },
    { id: 4, data: [``, <Tag key="label-4">H4</Tag>, <Tag key="size-4">1.953rem</Tag>, <H4 key="copy-4">{COPY}</H4>] },
    { id: 5, data: [``, <Tag key="label-5">Lead</Tag>, <Tag key="size-5">1.563rem</Tag>, <Lead key="copy-5">{COPY}</Lead>] },
    { id: 6, data: [``, <Tag key="label-6">FormHeading</Tag>, <Tag key="size-6">1.563rem</Tag>, <FormHeading key="copy-6">{COPY}</FormHeading>] },
    { id: 7, data: [``, <Tag key="label-7">SubLead</Tag>, <Tag key="size-7">1.25rem</Tag>, <SubLead key="copy-7">{COPY}</SubLead>] },
    { id: 8, data: [``, <Tag key="label-8">FormSubHeading</Tag>, <Tag key="size-8">1.25rem</Tag>, <FormSubHeading key="copy-8">{COPY}</FormSubHeading>] },
    { id: 9, data: [``, <Tag key="label-9">P</Tag>, <Tag key="size-9">1rem</Tag>, <P key="copy-9">{COPY}</P>] },
    { id: 10, data: [``, <Tag key="label-10">FormParagraph</Tag>, <Tag key="size-10">1rem</Tag>, <FormParagraph key="copy-10">{COPY}</FormParagraph>] },
    { id: 11, data: [``, <Tag key="label-11">Title</Tag>, <Tag key="size-11">20px</Tag>, <Title key="copy-11">{COPY}</Title>] },
    { id: 12, data: [``, <Tag key="label-12">Text</Tag>, <Tag key="size-12">16px</Tag>, <Text key="copy-12">{COPY}</Text>] },
    { id: 13, data: [``, <Tag key="label-13">UnitLabel</Tag>, <Tag key="size-13">14px</Tag>, <UnitLabel key="copy-13">{COPY}</UnitLabel>] },
    { id: 14, data: [``, <Tag key="label-14">SubTitle</Tag>, <Tag key="size-14">12px</Tag>, <SubTitle key="copy-14">{COPY}</SubTitle>] },
    { id: 15, data: [``, <Tag key="label-15">SubText</Tag>, <Tag key="size-15">12px</Tag>, <SubText key="copy-15">{COPY}</SubText>] },
    { id: 16, data: [``, <Tag key="label-16">InputLabel</Tag>, <Tag key="size-16">12px</Tag>, <InputLabel key="copy-16">{COPY}</InputLabel>] },
  ];

  return (
    <Page
      title="wireframes.internet.dev ➝ system ➝ typography"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/system/typography"
    >
      <Navigation />
      <TwoColumnLayoutFull sidebar={<GridLayout />}>
        <Table data={TABLE_DATA} headings={TABLE_HEADINGS} style={{ marginTop: 64 }} />
      </TwoColumnLayoutFull>
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ExampleSystemTypography;
