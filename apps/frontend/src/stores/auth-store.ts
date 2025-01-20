import { defineStore } from 'pinia';
import { AuthService } from '../api/auth-service';
import { jwtDecode } from 'jwt-decode';

const authService = new AuthService();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    decodedToken: (state: { token: string }) => {
      try {
        return jwtDecode(state.token);
      } catch {
        return null;
      }
    },
    username: (state: any, getters: any): string =>
      getters.decodedToken?.username || '',
    role: (state: any, getters: any): string =>
      getters.decodedToken?.role || null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.token.trim(),
  },
  actions: {
    async fetchToken(username: string, password: string) {
      const token = await authService.login(username, password);
      this.token = token;
      localStorage.setItem('token', token);
    },

    async logout() {
      this.token = '';
      localStorage.removeItem('token');
    },
  },
});
