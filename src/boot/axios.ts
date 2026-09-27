import { defineBoot } from '#q-app';
import axios, { type AxiosInstance } from 'axios';

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: AxiosInstance;
  }
}

const API_URL = import.meta.env.QCLI_API_URL ?? 'http://localhost:8000/graphql';

const api = axios.create({ baseURL: API_URL, timeout: 60000 });

export default defineBoot(({ app }) => {
  app.config.globalProperties.$api = api;
});

export { api };
