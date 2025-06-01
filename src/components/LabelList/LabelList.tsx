import { useDeleteLabel, useLabels } from "../../hooks/useLabels"
import type { ILabel } from "../../types/types";
import LabelForm from "./LabelForm";
import styles from './styles.module.scss'

function LabelList() {
  const {data: labels, isLoading, error} = useLabels();
  const deleteLabel = useDeleteLabel();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleDelete = (id: number) => {
    deleteLabel.mutate(id);
  };

  return (
    <>
    <LabelForm />
      <div className={styles.grid}>
        {labels?.map((label : ILabel) => (
          <div key={label.id} className={styles.label}>
            <h3 className={styles.label__caption}>{label.caption}</h3>
            <p className={styles.label__color}>{label.color}</p>
            <button className={styles.label__delete} onClick={() => handleDelete(label.id)}>
              &times;
            </button>
            <LabelForm label={label}/>
          </div>
        ))}
      </div>
    </>
  )
}

export default LabelList