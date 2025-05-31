import { useQuery } from "@tanstack/react-query"
import { fetchTasks } from "../api/tasks/tasksApi"

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  })
}