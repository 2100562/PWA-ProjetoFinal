<script lang="ts">
import { defineComponent } from 'vue';
import LecturerHomeView from './LecturerHomeView.vue';
import { useAuthStore } from '../stores/auth-store';
import StudentHomeView from './StudentHomeView.vue';

export default defineComponent({
  name: 'HomeView',
  components: { StudentHomeView, LecturerHomeView },
  setup() {
    const auth = useAuthStore();
    return {
      role: auth.role.toString(),
    };
  },
});
</script>

<template>
  <template v-if="role === 'lecturer'">
    <LecturerHomeView />
  </template>
  <template v-else>
    <StudentHomeView />
  </template>
</template>
