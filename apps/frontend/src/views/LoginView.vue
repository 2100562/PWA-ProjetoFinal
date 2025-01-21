<script lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores';
import router from '../router';

export default {
  name: 'LoginView',
  setup() {
    const username = ref('');
    const password = ref('');
    const loginError = ref('');

    const auth = useAuthStore();

    const login = async () => {
      loginError.value = '';
      if (!username.value.trim() || !password.value.trim()) {
        loginError.value = 'Please fill in all fields.';
        return;
      }

      try {
        await auth.fetchToken(username.value, password.value);
        if (auth.isAuthenticated) {
          await router.push('/');
        }
      } catch (error) {
        if (
          error.message === 'Unauthorized' ||
          error.message === 'Not Found' ||
          error.message === 'Bad Request'
        ) {
          loginError.value = 'Invalid username or password.';
        } else {
          loginError.value = 'An unexpected error occurred. Please try again.';
        }
      }
    };

    return {
      username,
      password,
      login,
      loginError,
    };
  },
  data: () => ({
    visible: false,
  }),
};
</script>

<template>
  <div>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      min-width="400"
      rounded="lg"
    >
      <v-container>
        <v-row>
          <v-col class="text-center">
            <h2>Autenticação</h2>
          </v-col>
        </v-row>
      </v-container>
      <div class="text-subtitle-1 text-medium-emphasis">Conta</div>

      <v-text-field
        v-model="username"
        density="compact"
        placeholder="Utilizador"
        prepend-inner-icon="mdi-account"
        variant="outlined"
      />

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password
      </div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Escreva a sua password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      />

      <!-- Error Message -->
      <v-alert v-if="loginError" class="mb-4" dense text="" type="error">
        {{ loginError }}
      </v-alert>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click="login"
      >
        Entrar
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="/register"
          rel="noopener noreferrer"
        >
          Registo
          <v-icon icon="mdi-chevron-right" />
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>
