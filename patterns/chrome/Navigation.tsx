import styles from '@patterns/chrome/Navigation.module.css';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import ModalAuthentication from '@patterns/modals/ModalAuthentication';
import ModalNavigationV2 from '@patterns/modals/ModalNavigationV2';

import { useModals } from '@runtime/modals/ModalContext';

export default function Navigation() {
  const modals = useModals();

  return (
    <nav className={styles.root}>
      <section className={styles.left}>
        <a href="/" className={styles.item}>
          Template
        </a>
      </section>
      <section className={styles.stretch}>
        <span className={styles.item} onClick={() => Utilities.onHandleThemeChange()}>
          Theme
        </span>
        <a className={styles.item} href="/examples/features/settings">
          Settings
        </a>
        <a className={styles.item} href="/examples/features/services">
          Services
        </a>
        <a className={styles.item} href="/examples/features/files-s3">
          Files
        </a>
        <span className={styles.item} id="site-signin-button" onClick={() => modals.open(ModalAuthentication, { parentId: 'site-signin-button' })}>
          Sign In
        </span>
      </section>
      <section className={styles.right}>
        <span
          className={styles.item}
          id="site-navigation-button"
          onClick={() => modals.open(ModalNavigationV2, { parentId: 'site-navigation-button' })}
          data-detector-ignore-navigation
        >
          Navigation
        </span>
      </section>
    </nav>
  );
}
