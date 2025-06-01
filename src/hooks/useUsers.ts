import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";
import type { IUser } from "../types/types";

export const useUsers = () => {
  return useQuery<IUser[], { message: string }>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await apiClient.post('', {
        query: `{
          users(order_by: {id: asc}) {
            id
            first_name
            last_name
            bio
          }
        }`
      });

      if (response.data.errors) {
        throw { message: response.data.errors[0]?.message || 'Unknown error' };
      }

      return response.data.data.users;
    }
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: Omit<IUser, "id">) =>
      apiClient.post("", {
        query: `
          mutation CreateUser($first_name: String!, $last_name: String!, $bio: String) {
            insert_users_one(object: { 
              first_name: $first_name, 
              last_name: $last_name, 
              bio: $bio 
            }) { id }
          }
        `,
        variables: user,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUser) =>
      apiClient.post("", {
        query: `
          mutation UpdateUser($id: Int!, $first_name: String!, $last_name: String!, $bio: String) {
            update_users_by_pk(
              pk_columns: { id: $id },
              _set: { 
                first_name: $first_name, 
                last_name: $last_name, 
                bio: $bio 
              }
            ) { id }
          }
        `,
        variables: user,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};