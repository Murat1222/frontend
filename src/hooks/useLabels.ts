import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";
import type { ILabel } from "../types/types";

export const useLabels = () => {
  return useQuery<ILabel[]>({
    queryKey: ['labels'],
    queryFn: () => 
      apiClient.post('', {
        query: `{
          labels(order_by: {id: asc}) {
            id
            caption
            color
          }
        }`
      }).then(res => res.data.data.labels)
  });
};

export const useCreateLabel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (label: Omit<ILabel, 'id'>) =>
      apiClient.post('', {
        query: `
          mutation CreateLabel($caption: String!, $color: String!) {
            insert_labels_one(object: { 
              caption: $caption, 
              color: $color 
            }) { id }
          }
        `,
        variables: label
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['labels'] })
  });
};

export const useUpdateLabel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (label: ILabel) =>
      apiClient.post('', {
        query: `
          mutation UpdateLabel($id: Int!, $caption: String!, $color: String!) {
            update_labels_by_pk(
              pk_columns: { id: $id },
              _set: { 
                caption: $caption, 
                color: $color 
              }
            ) { id }
          }
        `,
        variables: label
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['labels'] })
  });
};

export const useDeleteLabel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      apiClient.post('', {
        query: `mutation DeleteLabel($id: Int!) {
          delete_labels_by_pk(id: $id) { id }
        }`,
        variables: { id }
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['labels'] })
  });
};