import { apiClient } from "../apiClient"

export const fetchTasks = async () => {
  const response = await apiClient.post('', {
    query:`
      query GetTasks {
        tasks {
          id
          title
          description
          assignee_id
          created_at
        }
      }
    `
  })
  return response.data.data.tasks
}