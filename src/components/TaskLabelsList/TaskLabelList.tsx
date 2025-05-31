import { useTaskLabels } from "../../hooks/useTaskLabels"
import type { ITaskLabel } from "../../types/types";

function TaskLabelList() {
  const {data: taskLabels, isLoading, error} = useTaskLabels();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {taskLabels?.map((tasklb : ITaskLabel, i : number) => (
        <div key={i}>
          <h3>{tasklb.task_id}</h3>
          <p>{tasklb.label_id}</p>
        </div>
      ))}
    </div>
  )
}

export default TaskLabelList