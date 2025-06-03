import { useState } from 'react';
import Loader from "../../shared/Loader/Loader";
import type { ILabel } from "../../types/types";
import LabelForm from "./LabelForm";
import styles from './styles.module.scss'
import LabelCard from './LabelCard';
import { useLabels } from '../../hooks/useLabels';

function LabelList() {
  const {data: labels, isLoading, error} = useLabels();
  const [sortAlphabetical, setSortAlphabetical] = useState(false);

  if (isLoading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

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
           <LabelCard label={label} />
        ))}
      </div>
    </>
  )
}

export default LabelList