import { apiClient } from '../apiClient';

export const fetchUsers = async () => {
  const response = await apiClient.post('', {
    query: `
      query GetUsers {
        users {
          id
          first_name
          last_name
          bio
        }
      }
    `,
  });
  return response.data.data.users;
};