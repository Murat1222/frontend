import { useState } from 'react';
import { useTaskLabels, useCreateTaskLabel } from '../../../hooks/useTaskLabels';
import styles from './styles.module.scss';
import type { ITask } from '../../../types/types';
import { useLabels } from '../../../hooks/useLabels';
import { truncateText } from '../../../shared/TruncateText/TruncateText';

function AddLabelModal({ task, onClose }: { task: ITask; onClose: () => void }) {
  const { data: labels } = useLabels();
  const { data: taskLabels } = useTaskLabels();
  const createTaskLabel = useCreateTaskLabel();

  const currentLabelIds = taskLabels
    ?.filter(tl => tl.task_id === task.id)
    .map(tl => tl.label_id) || [];

  const [selectedLabels, setSelectedLabels] = useState<number[]>(currentLabelIds);

  const handleCheckboxChange = (labelId: number) => {
    setSelectedLabels(prev => 
      prev.includes(labelId)
        ? prev.filter(id => id !== labelId)
        : [...prev, labelId]
    );
  };

  const handleSubmit = () => {
    selectedLabels
      .filter(id => !currentLabelIds.includes(id))
      .forEach(labelId => {
        createTaskLabel.mutate({ task_id: task.id, label_id: labelId });
      });
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <button onClick={onClose} className={styles.modal__close}>
          &times;
        </button>
        <h3 className={styles.modal__title}>Manage: {task.title}</h3>
        <div className={styles.labelsContainer}>
          {labels?.map(label => (
            <div key={label.id} className={styles.label}>
              <input
                type="checkbox"
                id={`label-${label.id}`}
                checked={selectedLabels.includes(label.id)}
                onChange={() => handleCheckboxChange(label.id)}
                className={styles.label__checkbox}
              />
              <label htmlFor={`label-${label.id}`} className={styles.label__content}>
                {truncateText(label.caption, 30)}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.modal__buttons}>
          <button onClick={onClose} className={styles.modal__btn}>
            Cancel
          </button>
          <button onClick={handleSubmit} className={styles.modal__btn}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddLabelModal;