import styles from '@elements/layouts/Content.module.css';

import * as React from 'react';

export default function Content(props) {
  return <div className={styles.root}>{props.children}</div>;
}
