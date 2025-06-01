import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";
import type { ITaskLabel } from "../types/types";

export const useTaskLabels = () => {
  return useQuery<ITaskLabel[]>({
    queryKey: ['task_labels'],
    queryFn: async () => {
      const response = await apiClient.post('', {
        query: `{
          task_labels {
            task_id
            label_id
          }
        }`
      })

      if (response.data.errors) {
        throw { message: response.data.errors[0]?.message || 'Unknown error' };
      }

      return response.data.data.task_labels
    }
  });
};

export const useCreateTaskLabel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskLabel: ITaskLabel) =>
      apiClient.post('', {
        query: `
          mutation CreateTaskLabel($task_id: Int!, $label_id: Int!) {
            insert_task_labels_one(object: { 
              task_id: $task_id, 
              label_id: $label_id 
            }) {
              task_id
              label_id
            }
          }
        `,
        variables: taskLabel
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task_labels'] });
    }
  });
};