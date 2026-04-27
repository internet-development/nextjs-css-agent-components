import styles from '@elements/layouts/GridLayout.module.css';

import * as React from 'react';

export default function GridLayout(props) {
  return (
    <div className={styles.root} style={props.style} onClick={props.onClick}>
      {props.children}
    </div>
  );
}
