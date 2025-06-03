import { useDeleteLabel } from '../../hooks/useLabels';
import { truncateText } from '../../shared/TruncateText/TruncateText';
import type { ILabel } from '../../types/types';
import LabelForm from './LabelForm';
import styles from './styles.module.scss'

interface LabelCardProps {
  label: ILabel;
}

function LabelCard({label} : LabelCardProps) {
  const deleteLabel = useDeleteLabel();


  const handleDelete = (id: number) => {
    deleteLabel.mutate(id);
  };

  
  return (
    <div>
      <div className={styles.label}>
            <h3 className={styles.label__caption}>{truncateText(label.caption, 45)}</h3>
            <p className={styles.label__color}>{truncateText(label.color, 45)}</p>
            <button className={styles.label__delete} onClick={() => handleDelete(label.id)}>
              &times;
            </button>
            <LabelForm label={label}/>
        </div>
    </div>
  )
}

export default LabelCard