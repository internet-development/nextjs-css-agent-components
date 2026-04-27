import styles from '@elements/sections/SectionHorizontalStack.module.css';

import * as React from 'react';

export default function SectionHorizontalStack(props) {
  return (
    <div className={styles.root}>
      <div className={styles.top}>{props.top}</div>
      <div className={styles.middle}>{props.children}</div>
      <div className={styles.bottom}>{props.bottom}</div>
    </div>
  );
}
