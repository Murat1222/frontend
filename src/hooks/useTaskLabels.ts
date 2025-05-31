import { useQuery } from "@tanstack/react-query"
import { fetchTaskLabels } from "../api/tasklabels/tasklabelsApi"

export const useTaskLabels = () => {
  return useQuery({
    queryKey: ['task_labels'],
    queryFn: fetchTaskLabels
  })
}