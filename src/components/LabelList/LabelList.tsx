import { useState } from 'react';
import { useDeleteLabel, useLabels } from "../../hooks/useLabels"
import Loader from "../../shared/Loader/Loader";
import { truncateText } from "../../shared/TruncateText/TruncateText";
import type { ILabel } from "../../types/types";
import LabelForm from "./LabelForm";
import styles from './styles.module.scss'

function LabelList() {
  const {data: labels, isLoading, error} = useLabels();
  const deleteLabel = useDeleteLabel();
  const [sortAlphabetical, setSortAlphabetical] = useState(false);

  if (isLoading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  const handleDelete = (id: number) => {
    deleteLabel.mutate(id);
  };

  const toggleSort = () => setSortAlphabetical(prev => !prev);

  const sortedLabels = [...(labels || [])].sort((a, b) => {
    return sortAlphabetical ? a.caption.localeCompare(b.caption) : 0;
  });

  return (
    <>
        <h1 className={styles.title}>Labels</h1>
      <LabelForm />
        <div className={styles.sort_containter}>
          <button 
          onClick={toggleSort}
          className={styles.sortbtn}
          >
            {sortAlphabetical ? 'Сбросить' : 'Сортировать по алфавиту'}
          </button>
        </div>
      <div className={styles.grid}>
        {sortedLabels.map((label : ILabel) => (
          <div key={label.id} className={styles.label}>
            <h3 className={styles.label__caption}>{truncateText(label.caption, 45)}</h3>
            <p className={styles.label__color}>{truncateText(label.color, 45)}</p>
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