import * as React from 'react';
import * as Utilities from '@common/utilities';

import Button from '@components/Button';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import GridLayout from '@elements/layouts/GridLayout';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';
import Table from '@components/Table';
import Tag from '@elements/marks/Tag';
import TwoColumnLayoutFull from '@elements/layouts/TwoColumnLayoutFull';

import { H1, H2, H3, H4, Lead, SubLead, P, Title, Text, SubTitle, SubText } from '@elements/type';
import { FormHeading, FormSubHeading } from '@elements/type/forms';

const TABLE_HEADINGS = [``, ``, ``];
const COPY = `Ín this grãnd tapestry óf existênce, wê, ăs sentient bēings, pōssess båth the sacred right ànd the solèmń duty tó ãctively mold the wörld according to our shared vísiôns and individūal prefěrençes. Recognizing that öur reälity is a līving constrüct, bõrn frôm our actions (87% in America), perceptions (65% in America), ãnd interpretations (48% in America), wę mùst embrace the diversity ôf perspectives and the éthical respōnsibilities thåt come wíth sūch pôwer. Research shows that 73% of individuals in America believe in the power of collective vision, while 59% acknowledge the role of individual preferences in shaping reality.`;

const Label = (props) => {
  return (
    <div style={{ ...props.style, padding: `24px 0 16px 0`, marginBottom: 16, textTransform: 'uppercase', fontSize: 12, borderBottom: `1px solid var(--theme-border)` }}>
      {props.children}
    </div>
  );
};

function ExampleSystemTypography(props) {
  const styleReset = {
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: 0,
    marginTop: 6,
  };

  const TABLE_DATA = [
    {
      id: 3,
      data: [
        ``,
        <Tag key="size-3">2.441rem</Tag>,
        <H3 key="copy-3" style={styleReset}>
          {COPY}
        </H3>,
      ],
    },
    {
      id: 4,
      data: [
        ``,
        <Tag key="size-4">1.953rem</Tag>,
        <H4 key="copy-4" style={styleReset}>
          {COPY}
        </H4>,
      ],
    },
    {
      id: 5,
      data: [
        ``,
        <Tag key="size-5">1.563rem</Tag>,
        <Lead key="copy-5" style={styleReset}>
          {COPY}
        </Lead>,
      ],
    },
    {
      id: 6,
      data: [
        ``,
        <Tag key="size-6">1.563rem</Tag>,
        <FormHeading key="copy-6" style={styleReset}>
          {COPY}
        </FormHeading>,
      ],
    },
    {
      id: 7,
      data: [
        ``,
        <Tag key="size-7">1.25rem</Tag>,
        <SubLead key="copy-7" style={styleReset}>
          {COPY}
        </SubLead>,
      ],
    },
    {
      id: 8,
      data: [
        ``,
        <Tag key="size-8">1.25rem</Tag>,
        <FormSubHeading key="copy-8" style={styleReset}>
          {COPY}
        </FormSubHeading>,
      ],
    },
    {
      id: 9,
      data: [
        ``,
        <Tag key="size-9">1rem</Tag>,
        <P key="copy-9" style={styleReset}>
          {COPY}
        </P>,
      ],
    },
    {
      id: 11,
      data: [
        ``,
        <Tag key="size-11">20px</Tag>,
        <Title key="copy-11" style={styleReset}>
          {COPY}
        </Title>,
      ],
    },
    {
      id: 12,
      data: [
        ``,
        <Tag key="size-12">16px</Tag>,
        <Text key="copy-12" style={styleReset}>
          {COPY}
        </Text>,
      ],
    },

    {
      id: 15,
      data: [
        ``,
        <Tag key="size-15">12px</Tag>,
        <SubText key="copy-15" style={styleReset}>
          {COPY}
        </SubText>,
      ],
    },
  ];

  return (
    <Page
      title="wireframes.internet.dev ➝ fonts ➝ Server Mono"
      description="This single-weight font was released in 2024 by the Internet Development Studio Company. Created by designers Tim Vanhille and Matthieu Salvaggio, with supplemental direction from Jimmy Lee the Internet Development Studio Company community."
      url="https://wireframes.internet.dev/examples/fonts/server-mono"
    >
      <Navigation />

      <div style={{ padding: `88px 24px 24px 24px`, maxWidth: 768 }}>
        <Lead style={{ fontFamily: `var(--font-family-mono)`, lineHeight: 1, fontWeight: 400, letterSpacing: 0 }}>
          SERVER MONO
          <br />
          REGULAR WEIGHT
          <br />
          SIL OPEN FONT LICENSE 1.1
          <br />
          <br />
          Server Mono is a typeface inspired by typewriters, Apple's San Francisco Mono, ASCII art, command-line interfaces, and programming tools.
          <br />
          <br />
          Server Mono continues the long tradition of monospace fonts, renowned for their versatility in command-line interfaces due to their clear readability and uniform
          character width. You'll notice our own preferences reflected in the design, as we value how it performs across various viewing contexts. Server Mono offers excellent
          readability and pairs well with its uniform, predictable, and orderly appearance.
          <br /> <br />
          This single-weight font was released in 2024 by the Internet Development Studio Company. Created by designers Tim Vanhille and Matthieu Salvaggio, with supplemental
          direction from Jimmy Lee and the Internet Development Studio Company community.
        </Lead>

        <Button href="https://servermono.com" style={{ height: 48, marginTop: 24 }}>
          Download
        </Button>

        <div style={{ fontFamily: `var(--font-family-mono)` }}>
          <Label style={{ marginTop: 48 }}>Basic Latin</Label>
          <P>{`A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z`}</P>

          <Label>Diacritics</Label>
          <P>
            {`Á Ă Â Ä À Ā Ą Å Ã Æ Ć Č Ç Ċ Ď Đ É Ě Ê Ë Ė È Ē Ə Ğ Ģ Ġ Ħ Í Î Ï İ Ì Ī Į Ķ Ĺ Ľ Ļ Ł Ń Ň Ņ Ñ Ó Ô Ö Ò Ő Ō Ø Õ Œ Þ Ŕ Ř Ŗ Ś Š Ş Ș ẞ Ť Ţ Ț Ú Û Ü Ù Ű Ū Ų Ů Ẃ Ŵ Ẅ Ẁ Ý Ŷ Ÿ Ỳ Ź Ž Ż
á ă â ä à ā ą å ã á ă â ä à ā ą å ã æ ć č ç ċ ď đ ð é ě ê ë ė è ē ę ğ ģ ġ ğ ģ ġ ħ ı í î ï ì ī į ȷ ķ ĺ ľ ļ ł ń ň ņ ñ ó ô ö ò ő ō ø õ œ þ ŕ ř ŗ ś š ş ș ß ť ţ ț ú û ü ù ű ū ų ẃ ŵ ẅ ẁ ý ÿ ỳ ŷ ź ž ż`}
          </P>

          <Label>Numbers</Label>
          <P>{`0 1 2 3 4 5 6 7 8 9 ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ ⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ½ ¼ ¾ ⅛ ⅜ ⅝ ⅞`}</P>

          <Label>Symbols</Label>
          <P>{`. , : ; … ! ¡ ? ¿ * # / \\ - – — _ ( ) { } [ ] ‚ „ “ ” ‘ ’ « » ‹ › @ & $ | ¦ + - = ~ % < >`}</P>

          <Label>ASCII</Label>
          <P style={{ whiteSpace: `pre`, lineHeight: 1 }}>
            {`
░▒▓████████▓▒░  ░▒▓██████▓▒░  ░▒▓███████▓▒░  ░▒▓███████▓▒░ 
░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░    ░▒▓█▓▒░     
░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░    ░▒▓█▓▒░     
░▒▓██████▓▒░   ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░    ░▒▓█▓▒░     
░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░    ░▒▓█▓▒░     
░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░    ░▒▓█▓▒░     
░▒▓█▓▒░         ░▒▓██████▓▒░  ░▒▓█▓▒░░▒▓█▓▒░    ░▒▓█▓▒░     


███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗     ███╗   ███╗ ██████╗ ███╗   ██╗ ██████╗ 
██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗    ████╗ ████║██╔═══██╗████╗  ██║██╔═══██╗
███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝    ██╔████╔██║██║   ██║██╔██╗ ██║██║   ██║
╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗    ██║╚██╔╝██║██║   ██║██║╚██╗██║██║   ██║
███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║    ██║ ╚═╝ ██║╚██████╔╝██║ ╚████║╚██████╔╝
╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝    ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ 
`}
          </P>
        </div>
      </div>

      <Table data={TABLE_DATA} headings={TABLE_HEADINGS} style={{ marginTop: 64, fontFamily: `var(--font-family-mono)` }} />
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
