import styles from '@elements/layouts/InvoiceLayout.module.css';

import * as React from 'react';

export default function InvoiceLayout(props) {
  return <div className={styles.root}>{props.children}</div>;
}
