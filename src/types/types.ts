export interface ILabel {
  id: number;
  caption: string;
  color: string;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  bio?: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  assignee_id: number;
  created_at?: string;
}

export interface ITaskLabel {
  task_id: number;
  label_id: number
}