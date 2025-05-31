import { apiClient } from "../apiClient";

export const fetchTaskLabels = async () => {
  const response = await apiClient.post('', {
    query: `
      query GetTaskLabels {
        task_labels {
          task_id
          label_id
        }
      }
    `,
  });
  return response.data.data.task_labels;
};