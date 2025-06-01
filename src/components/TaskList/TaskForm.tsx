import { useState, type FormEvent } from "react";
import { useUsers } from "../../hooks/useUsers";
import { useCreateTask, useUpdateTask } from "../../hooks/useTasks";
import type { ITask, IUser } from "../../types/types";
import styles from "./styles.module.scss";

interface TaskFormProps {
  task?: ITask | null;
}

function TaskForm({ task = null }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [assigneeId, setAssigneeId] = useState<number>(task?.assignee_id || 0);
  const { data: users } = useUsers();

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (task) {
      updateTask.mutate({ 
        id: task.id,
        title,
        description,
        assignee_id: assigneeId
      });
    } else {
      createTask.mutate({ 
        title,
        description,
        assignee_id: assigneeId
      });
      setTitle('')
      setDescription('')
      setAssigneeId(0)
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <select
        value={assigneeId}
        onChange={(e) => setAssigneeId(Number(e.target.value))}
        className={styles.form__select}
        required
      >
        <option value={0} className={styles.form__option}>Select assignee</option>
        {users?.map((user: IUser) => (
          <option key={user.id} value={user.id}>
            {user.first_name} {user.last_name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className={styles.form__input}
        required
      />

      <input
        type="text"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className={styles.form__input}
        required
      />

      <button 
        type="submit" 
        className={styles.form__button}
        disabled={createTask.isPending || updateTask.isPending}
      >
        {task ? "Update" : "Create"}
      </button>
    </form>
  );
}

export default TaskForm;