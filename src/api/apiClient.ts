import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080/v1/graphql',
  headers: {
    'content-Type': 'application/json',
    'x-hasura-admin-secret': 'test123',
  },
});