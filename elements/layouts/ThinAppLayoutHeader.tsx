import styles from '@elements/layouts/ThinAppLayoutHeader.module.css';

import * as React from 'react';

import ActionItem from '@elements/marks/ActionItem';

export default function ThinAppLayoutHeader(props) {
  return (
    <div className={styles.root}>
      <ActionItem href="/" icon={`⭠`}>
        Return home
      </ActionItem>
      {props.token ? (
        <ActionItem icon={`⊹`} onClick={props.onSignOut}>
          Sign out
        </ActionItem>
      ) : (
        <>
          <ActionItem icon={`⭢`} href="/examples/features/authentication/google">
            Sign in with Google
          </ActionItem>
          <ActionItem icon={`⭢`} href="/examples/features/authentication">
            Sign in
          </ActionItem>
        </>
      )}
    </div>
  );
}
