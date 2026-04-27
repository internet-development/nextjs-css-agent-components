import styles from '@elements/layouts/WideAppLayout.module.css';

import * as React from 'react';

export default function WideAppLayout(props) {
  return <div className={styles.root}>{props.children}</div>;
}
