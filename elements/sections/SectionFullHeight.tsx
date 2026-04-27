import styles from '@elements/sections/SectionFullHeight.module.css';

import * as React from 'react';

export default function SectionFullHeight(props) {
  return <div className={styles.root}>{props.children}</div>;
}
