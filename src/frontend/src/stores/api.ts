import { ref } from 'vue';
import { defineStore } from 'pinia';
import { HttpClient, Api } from '@common/api'; // Adjust import paths as necessary
import router from '@/router';

export const useApiStore = defineStore('api', () => {
  const token = ref<string>(localStorage.getItem('user_token') || '');

  const client = new HttpClient<string>({
    secure: true,
    baseURL: "http://localhost:3000",
    securityWorker: (accessToken: string | null) =>
      accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {},
  });

  // Adding response interceptor to handle 401 Unauthorized error
  client.instance.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
      logout();  // logout clears token and handles redirection
    }
    return Promise.reject(error);
  });

  // Set the security data immediately if the token exists
  if (token.value) {
    client.setSecurityData(token.value);
  }

  const api = ref(new Api<string>(client));

  // Method to update the token both in state and localStorage
  function setToken(newToken: string): void {
    token.value = newToken;
    localStorage.setItem('user_token', newToken);
    client.setSecurityData(newToken);
  }

  function logout(): void {
    localStorage.removeItem('user_token');
    token.value = '';
    client.setSecurityData('');
    router.push('/login');
  }


  return { token, setToken, api, logout };
});
