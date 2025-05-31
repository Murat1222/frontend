import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";
import type { ITask } from "../types/types";

export const useTasks = () => {
  return useQuery<ITask[]>({
    queryKey: ['tasks'],
    queryFn: () => 
      apiClient.post('', {
        query: `{ tasks { id title description assignee_id created_at } }`
      }).then(res => res.data.data.tasks)
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (task: Omit<ITask, 'id'>) =>
      apiClient.post('', {
        query: `
          mutation CreateTask($title: String!, $description: String!, $assignee_id: Int!) {
            insert_tasks_one(object: { 
              title: $title, 
              description: $description, 
              assignee_id: $assignee_id 
            }) { id }
          }
        `,
        variables: task
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (task: ITask) =>
      apiClient.post('', {
        query: `
          mutation UpdateTask($id: Int!, $title: String!, $description: String!, $assignee_id: Int!) {
            update_tasks_by_pk(
              pk_columns: { id: $id },
              _set: { 
                title: $title, 
                description: $description, 
                assignee_id: $assignee_id 
              }
            ) { id }
          }
        `,
        variables: task
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      apiClient.post('', {
        query: `mutation DeleteTask($id: Int!) {
          delete_tasks_by_pk(id: $id) { id }
        }`,
        variables: { id }
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  });
};