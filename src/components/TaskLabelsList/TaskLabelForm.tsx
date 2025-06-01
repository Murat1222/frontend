import { useState } from 'react';
import { useCreateTaskLabel } from '../../hooks/useTaskLabels';
import { useTasks } from '../../hooks/useTasks';
import { useLabels } from '../../hooks/useLabels';
import type { ITask, ILabel } from '../../types/types';
import styles from './styles.module.scss';

function TaskLabelForm() {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedLabelId, setSelectedLabelId] = useState<number | null>(null);
  
  const { data: tasks } = useTasks();
  const { data: labels } = useLabels();
  const createTaskLabel = useCreateTaskLabel();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTaskId && selectedLabelId) {
      createTaskLabel.mutate({
        task_id: selectedTaskId,
        label_id: selectedLabelId
      });
      setSelectedTaskId(null);
      setSelectedLabelId(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <select
        className={styles.form__select}
        value={selectedTaskId || ''}
        onChange={(e) => setSelectedTaskId(Number(e.target.value))}
        required
      >
        <option value="" disabled>
          Select task
        </option>
        {tasks?.map((task: ITask) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>

      <select
        className={styles.form__select}
        value={selectedLabelId || ''}
        onChange={(e) => setSelectedLabelId(Number(e.target.value))}
        required
      >
        <option value="" disabled>
          Select label
        </option>
        {labels?.map((label: ILabel) => (
          <option key={label.id} value={label.id}>
            {label.caption}
          </option>
        ))}
      </select>

      <button 
        type="submit" 
        className={styles.form__button}
        disabled={!selectedTaskId || !selectedLabelId || createTaskLabel.isPending}
      >
        {createTaskLabel.isPending ? 'Creating...' : 'Создать'}
      </button>
    </form>
  );
}

export default TaskLabelForm;