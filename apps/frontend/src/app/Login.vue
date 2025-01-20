<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth-store';
import router from '../router';

export default {
  setup() {
    const username = ref('');
    const password = ref('');

    const auth = useAuthStore();

    const login = async () => {
      if (!username.value.trim() || !password.value.trim()) {
        return;
      }

      await auth.fetchToken(username.value, password.value);

      if (auth.isAuthenticated) {
        await router.push('/');
      } else {
        console.error('Login failed, token not set');
      }
    };

    return {
      username,
      password,
      login,
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
      <div class="text-subtitle-1 text-medium-emphasis">Conta</div>

      <v-text-field
        v-model="username"
        density="compact"
        placeholder="Utilizador"
        prepend-inner-icon="mdi-account"
        variant="outlined"
      ></v-text-field>

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
      ></v-text-field>

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
          href="#"
          rel="noopener noreferrer"
        >
          Registo
          <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>
