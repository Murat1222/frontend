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
  return response.data.data.labels
}