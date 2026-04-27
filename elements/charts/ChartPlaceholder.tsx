import styles from '@elements/charts/ChartPlaceholder.module.css';

export default function ChartPlaceholder(props) {
  return (
    <div className={styles.root} style={props.style}>
      {props.children}
    </div>
  );
}
