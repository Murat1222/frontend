import { useQuery } from "@tanstack/react-query";
import { fetchLabels } from "../api/labels/labelsApi";

export const useLabels = () => {
  return useQuery({
    queryKey: ['labels'],
    queryFn: fetchLabels
  })
}