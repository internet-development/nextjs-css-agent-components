import styles from '@patterns/modals/Modals.module.css';

import * as React from 'react';

import Error from '@elements/icons/Error';
import OutsideElementEvent from '@runtime/detectors/OutsideElementEvent';

import { ModalComponent } from '@runtime/modals/ModalContext';

export interface ModalErrorProps {
  message: any
}

const ModalError: ModalComponent<ModalErrorProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <OutsideElementEvent className={styles.errorModal} onOutsideEvent={() => props.onClose()}>
        <span className={styles.errorModalLeft}>
          <Error height="16px" />
        </span>
        <span className={styles.errorModalRight}>{props.message}</span>
      </OutsideElementEvent>
    </div>
  );
}

export default ModalError;