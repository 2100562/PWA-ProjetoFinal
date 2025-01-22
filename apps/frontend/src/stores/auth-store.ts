import { defineStore } from 'pinia';
import { AuthService } from '../api';
import { jwtDecode } from 'jwt-decode';
import { computed, ref } from 'vue';

const authService = new AuthService();

interface Token {
  username: string;
  role: string;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') || '');

  const decodedToken = computed<Token | null>(() => {
    try {
      return jwtDecode<Token>(token.value);
    } catch {
      return null;
    }
  });

  const isAuthenticated = computed<boolean>(() => !!decodedToken.value);

  const username = computed<string>(() => decodedToken.value?.username || '');
  const role = computed<string>(() => decodedToken.value?.role || '');

  const fetchToken = async (username: string, password: string) => {
    const newToken = await authService.login(username, password);
    token.value = newToken;
    localStorage.setItem('token', newToken);
  };

  const register = async (username: string, password: string) => {
    const newToken = await authService.register(username, password);
    token.value = newToken;
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    token.value = '';
    localStorage.removeItem('token');
  };

  return {
    token,
    decodedToken,
    isAuthenticated,
    username,
    role,
    fetchToken,
    register,
    logout,
  };
});
