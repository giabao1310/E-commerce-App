import axios from 'axios';

const externalApi = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

const localApi = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export { externalApi, localApi };
