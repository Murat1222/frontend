import { useTaskLabels } from "../../hooks/useTaskLabels";
import { useTasks } from "../../hooks/useTasks";
import { useLabels } from "../../hooks/useLabels";
import type { ILabel, ITask, ITaskLabel } from "../../types/types";
import styles from './styles.module.scss';

function TaskLabelList() {
  const { data: taskLabels, isLoading, error } = useTaskLabels();
  const { data: tasks } = useTasks();
  const { data: labels } = useLabels();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const getTaskTitle = (taskId: number) => {
    return tasks?.find((task : ITask) => task.id === taskId)?.title || `Task ${taskId}`;
  };

  const getLabelCaption = (labelId: number) => {
    return labels?.find((label : ILabel) => label.id === labelId)?.caption || `Label ${labelId}`;
  };

  return (
    <div className={styles.grid}>
      {taskLabels?.map((tasklb: ITaskLabel, i: number) => (
        <div key={i} className={styles.tasklabel}>
          <h3 className={styles.tasklabel__title}>
            {getTaskTitle(tasklb.task_id)}
          </h3>
          <p className={styles.tasklabel__caption}>
            {getLabelCaption(tasklb.label_id)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default TaskLabelList;