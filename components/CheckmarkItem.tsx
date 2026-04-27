import styles from '@components/CheckmarkItem.module.css';

import * as React from 'react';

import Checkmark from '@elements/icons/Checkmark';

export default function CheckMarkItem(props) {
  if (props.isMinimal) {
    return (
      <div className={styles.itemMinimal} style={props.style}>
        <span className={styles.leftMinimal}>
          <Checkmark height="16px" />
        </span>
        <span className={styles.rightMinimal}>{props.children}</span>
      </div>
    );
  }

  return (
    <div className={styles.item} style={props.style}>
      <span className={styles.left}>
        <Checkmark height="16px" />
      </span>
      <span className={styles.right}>{props.children}</span>
    </div>
  );
}
