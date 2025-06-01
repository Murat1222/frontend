import { useTaskLabels } from "../../hooks/useTaskLabels";
import { useTasks } from "../../hooks/useTasks";
import { useLabels } from "../../hooks/useLabels";
import type { ILabel, ITask, ITaskLabel } from "../../types/types";
import styles from './styles.module.scss';
import TaskLabelForm from "./TaskLabelForm";
import Loader from "../../shared/Loader/Loader";
import { truncateText } from "../../shared/TruncateText/TruncateText";

function TaskLabelList() {
  const { data: taskLabels, isLoading, error } = useTaskLabels();
  const { data: tasks } = useTasks();
  const { data: labels } = useLabels();

  if (isLoading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  const getTaskTitle = (taskId: number) => {
    return tasks?.find((task : ITask) => task.id === taskId)?.title || `Task ${taskId}`;
  };

  const getLabelCaption = (labelId: number) => {
    return labels?.find((label : ILabel) => label.id === labelId)?.caption || `Label ${labelId}`;
  };

  return (
    <>
      <h1 className={styles.title}>Task Labels</h1>
      <TaskLabelForm />
      <div className={styles.grid}>
        {taskLabels?.map((tasklb: ITaskLabel, i: number) => (
          <div key={i} className={styles.tasklabel}>
            <h3 className={styles.tasklabel__title}>
              {truncateText(getTaskTitle(tasklb.task_id), 45)}
            </h3>
            <p className={styles.tasklabel__caption}>
              {truncateText(getLabelCaption(tasklb.label_id), 45)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default TaskLabelList;