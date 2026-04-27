import styles from '@elements/layouts/TwoColumnLayoutFull.module.css';

import * as React from 'react';

export default function TwoColumnLayoutFull(props) {
  return (
    <div className={styles.root}>
      {props.sidebar ? (
        <div className={styles.left} style={props.sidebarStyle}>
          {props.sidebar}
        </div>
      ) : null}
      <div className={styles.right}>{props.children}</div>
    </div>
  );
}
