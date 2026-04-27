import styles from '@patterns/modals/Modals.module.css';

import * as React from 'react';

import Link from 'next/link';
import OutsideElementEvent from '@runtime/detectors/OutsideElementEvent';

import { H4 } from '@elements/type';
import { CommonModalProps, ModalComponent, useModals } from '@runtime/modals/ModalContext';

export interface ModalHamburgerMenuProps {
  content: {
    data: {
      navItems: { name: string; link: string }[];
    };
  };
}

const ModalHamburgerMenu: ModalComponent<ModalHamburgerMenuProps> = React.forwardRef((props, ref) => {
  const navItems = props.content.data.navItems;

  React.useImperativeHandle(ref, () => ({
    getUnmountDelayMS: () => 200,
  }));

  return (
    <OutsideElementEvent className={styles.hamburgerModal} onOutsideEvent={() => props.onClose()} style={{ animationDirection: !props.isClosing ? 'normal' : 'reverse' }}>
      {navItems?.map((item) => (
        <div key={item.name} className={styles.menuContent}>
          {item.link ? (
            <Link href={item.link} className={styles.linkStyle}>
              <H4>{item.name}</H4>
            </Link>
          ) : (
            <H4>{item.name}</H4>
          )}
        </div>
      ))}
    </OutsideElementEvent>
  );
});

export default ModalHamburgerMenu;
