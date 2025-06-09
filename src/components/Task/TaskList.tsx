import { useState } from "react";
import { useDeleteTask, useTasks } from "../../hooks/useTasks";
import { useTaskLabels } from "../../hooks/useTaskLabels";
import { useLabels } from "../../hooks/useLabels";
import Loader from "../../shared/Loader/Loader";
import { truncateText } from "../../shared/TruncateText/TruncateText";
import type { ILabel, ITask } from "../../types/types";
import styles from './styles.module.scss';
import TaskForm from "./TaskForm";
import LabelCard from "../Label/LabelCard";
import AddLabelModal from "./ui/AddLabelModal";

function TaskList() {
  const { data: tasks, isLoading, error } = useTasks();
  const { data: taskLabels } = useTaskLabels();
  const { data: labels } = useLabels();
  const deleteTask = useDeleteTask();
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [addLabelsTask, setAddLabelsTask] = useState<ITask | null>(null);
  
  if (isLoading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  const handleDelete = (id: number) => {
    deleteTask.mutate(id);
  };

  const openLabelsModal = (task: ITask) => {
    setSelectedTask(task);
  };

  const closeLabelsModal = () => {
    setSelectedTask(null);
  };

  const getTaskLabels = (taskId: number) => {
    if (!taskLabels || !labels) return [];
    const labelIds = taskLabels.filter(tl => tl.task_id === taskId).map(tl => tl.label_id);
    return labels.filter(label => labelIds.includes(label.id));
  };

  return (
    <>
      <h1 className={styles.title}>Tasks</h1>
      <TaskForm />
      <div className={styles.grid}>
        {tasks?.map((task: ITask) => (
          <div key={task.id} className={styles.task}>
            <button 
              onClick={() => openLabelsModal(task)}
              className={styles.task__showbtn}
            >
              Show Labels
            </button>
            <button
              onClick={() => setAddLabelsTask(task)}
              className={styles.task__showbtn}
            >
              Add label
            </button>
            <h3 className={styles.task__title}>{truncateText(task.title, 45)}</h3>
            <p className={styles.task__description}>{truncateText(task.description, 60)}</p>
            {task.created_at && <span className={styles.task__created}>{new Date(task.created_at).toLocaleDateString()}</span>}
            <button 
              onClick={() => handleDelete(task.id)}
              className={styles.task__delete}
            >
              &times;
            </button>
            <TaskForm task={task} />
          </div>
        ))}
      </div>

      {selectedTask && (
        <div className={styles.modal}>
          <div className={styles.modal__content}>
            <button 
              onClick={closeLabelsModal}
              className={styles.modal__close}
            >
              &times;
            </button>
            <h3 className={styles.modal__title}>
              Labels for: {selectedTask.title}
            </h3>
            <div className={styles.modal__labels}>
              {getTaskLabels(selectedTask.id).length > 0 ? (
                getTaskLabels(selectedTask.id).map((label: ILabel) => (
                  <LabelCard key={label.id} label={label} />
                ))
              ) : (
                <p className={styles.noLabels}>No labels assigned to this task</p>
              )}
            </div>
          </div>
        </div>         
      )}
      {addLabelsTask && (
        <AddLabelModal
          task={addLabelsTask} 
          onClose={() => setAddLabelsTask(null)} 
        />
      )}
    </>
  );
}

export default TaskList;