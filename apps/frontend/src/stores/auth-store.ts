import { defineStore } from 'pinia';
import { AuthService } from '../api';
import { jwtDecode } from 'jwt-decode';

const authService = new AuthService();

interface Token {
  username: string;
  role: string;
}

interface Getters {
  isAuthenticated: (state: State) => boolean;
  decodedToken: Token;
}

interface State {
  token: string;
  decodedToken: (state: State) => string;
  username: (state: State, getters: Getters) => string;
  role: (state: State, getters: Getters) => string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    decodedToken: (state: State) => {
      try {
        return jwtDecode(state.token);
      } catch {
        return null;
      }
    },
    username: (state: State, getters: Getters): string =>
      getters.decodedToken?.username || '',
    role: (state: State, getters: Getters): string =>
      getters.decodedToken?.role || '',
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

    async register(username: string, password: string) {
      const token = await authService.register(username, password);
      this.token = token;
      localStorage.setItem('token', token);
    },

    async logout() {
      this.token = '';
      localStorage.removeItem('token');
    },
  },
});
