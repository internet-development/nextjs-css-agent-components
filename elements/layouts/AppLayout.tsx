import styles from '@elements/layouts/AppLayout.module.css';

import * as React from 'react';

export default function AppLayout(props) {
  return <div className={styles.root}>{props.children}</div>;
}
