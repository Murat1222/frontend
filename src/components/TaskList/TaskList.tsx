import { useTasks } from "../../hooks/useTasks"
import type { ITask } from "../../types/types";

function TaskList() {
  const {data: tasks, isLoading, error} = useTasks();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {tasks?.map((task : ITask) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <span>{new Date(task.created_at).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  )
}

export default TaskList