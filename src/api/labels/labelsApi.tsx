import { apiClient } from "../apiClient";

export const fetchLabels = async () => {
  const response = await apiClient.post('', {
    query: `
      query GetLabels {
        labels {
          id
          caption
          color
        }
      }
    `
  })
  console.log(response);
  console.log(response.data);
  console.log(response.data.data);
  console.log(response.data.data.labels);
  return response.data.data.labels
}