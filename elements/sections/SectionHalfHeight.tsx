import styles from '@elements/sections/SectionHalfHeight.module.css';

import * as React from 'react';

export default function SectionHalfHeight(props) {
  return <div className={styles.root}>{props.children}</div>;
}
