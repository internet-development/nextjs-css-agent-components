import styles from '@elements/shells/AnyTextHeader.module.css';

import * as React from 'react';

export default function AnyTextHeader(props) {
  return (
    <nav className={styles.root}>
      <section className={styles.left}>
        <span className={styles.item}>{props.children}</span>
      </section>
    </nav>
  );
}
