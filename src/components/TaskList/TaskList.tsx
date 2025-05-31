import { useTasks } from "../../hooks/useTasks"
import type { ITask } from "../../types/types";
import styles from './styles.module.scss'

function TaskList() {
  const {data: tasks, isLoading, error} = useTasks();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className={styles.grid}>
      {tasks?.map((task : ITask) => (
        <div key={task.id} className={styles.task}>
          <h3 className={styles.task__title}>{task.title}</h3>
          <p className={styles.task__description}>{task.description}</p>
          <span className={styles.task__created}>{new Date(task.created_at).toLocaleDateString()}</span>
          <button className={styles.task__delete}>
              &times;
            </button>
        </div>
      ))}
    </div>
  )
}

export default TaskList