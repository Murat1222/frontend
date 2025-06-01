import axios from 'axios';

const HASURA_ADMIN_KEY = import.meta.env.VITE_HASURA_ADMIN_KEY
const BASE_URL = import.meta.env.VITE_BASE_API_URL

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-Type': 'application/json',
    'x-hasura-admin-secret': HASURA_ADMIN_KEY,
  },
});