import { useDeleteTask, useTasks } from "../../hooks/useTasks"
import Loader from "../../shared/Loader/Loader";
import { truncateText } from "../../shared/TruncateText/TruncateText";
import type { ITask } from "../../types/types";
import styles from './styles.module.scss'
import TaskForm from "./TaskForm";

function TaskList() {
  const {data: tasks, isLoading, error} = useTasks();
  const deleteTask = useDeleteTask();
  
  if (isLoading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  const handleDelete = (id: number) => {
    deleteTask.mutate(id);
  };
  
  return (
    <>
      <h1 className={styles.title}>Tasks</h1>
      <TaskForm />
      <div className={styles.grid}>
        {tasks?.map((task : ITask) => (
          <div key={task.id} className={styles.task}>
            <h3 className={styles.task__title}>{truncateText(task.title, 45)}</h3>
            <p className={styles.task__description}>{truncateText(task.description, 60)}</p>
            {task.created_at && <span className={styles.task__created}>{new Date(task.created_at).toLocaleDateString()}</span>}
            <button 
                onClick={() => handleDelete(task.id)}
                className={styles.task__delete}
              >
                &times;
            </button>
            <TaskForm 
              task={task} 
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default TaskList