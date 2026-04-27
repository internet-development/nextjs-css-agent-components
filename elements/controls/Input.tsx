import styles from '@elements/controls/Input.module.css';

function Input(props) {
  return <input className={styles.input} {...props} />;
}

export default Input;
