import { useLabels } from "../../hooks/useLabels"
import type { ILabel } from "../../types/types";
import styles from './styles.module.scss'

function LabelList() {
  const {data: labels, isLoading, error} = useLabels();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.grid}>
      {labels?.map((label : ILabel) => (
        <div key={label.id} className={styles.label}>
          <h3 className={styles.label__caption}>{label.caption}</h3>
          <p className={styles.label__color}>{label.color}</p>
          <button className={styles.label__delete}>
            &times;
          </button>
        </div>
      ))}
    </div>
  )
}

export default LabelList