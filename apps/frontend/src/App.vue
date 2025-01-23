<script lang="ts">
import { ref } from 'vue';
import { useAuthStore } from './stores';
import router from './router';

export default {
  name: 'App',
  setup() {
    const theme = ref('light');
    const auth = useAuthStore();

    const onClick = () =>
      (theme.value = theme.value === 'light' ? 'dark' : 'light');

    const navigate = (to: string) => router.push(to);

    const logout = async () => {
      auth.logout();
      await router.push('/login');
    };

    return {
      onClick,
      navigate,
      logout,
      auth,
      theme,
    };
  },
};
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <template v-if="auth.isAuthenticated">
        <v-app-bar class="px-3">
          <v-app-bar-title class="cursor-pointer" @click="navigate('/')">
            Questionários
          </v-app-bar-title>
          <template #append>
            <v-btn
              class="cursor-pointer"
              text=""
              variant="text"
              @click="navigate('/')"
            >
              Início
            </v-btn>
            <v-btn
              class="cursor-pointer"
              text=""
              variant="text"
              @click="logout"
            >
              Sair
            </v-btn>
            <v-btn
              :prepend-icon="
                theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
              "
              slim
              @click="onClick"
            />
          </template>
        </v-app-bar>
      </template>
      <v-main>
        <v-container class="d-flex align-center justify-center fill-height">
          <Suspense fallback="Loading...">
            <RouterView />
          </Suspense>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
