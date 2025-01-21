<script lang="ts">
import { useSurveyStore } from '../stores';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import router from '../router';
import { useDisplay } from 'vuetify';

export default {
  name: 'ViewSurveyView',
  async setup() {
    const display = useDisplay();
    const isDesktop = computed(() => display.mdAndUp.value);
    const surveyStore = useSurveyStore();
    const route = useRoute();
    const queryParams = ref(route.query);

    if (!queryParams.value) {
      await router.push('/');
    }

    if (!queryParams.value?.id) {
      await router.push('/');
    }

    const surveyId = queryParams.value?.id as string;

    await surveyStore.fetchSurveyById(surveyId);
    const survey = surveyStore.currentSurvey;

    return {
      surveyId,
      survey,
      isDesktop,
    };
  },
};
</script>

<template>
  <div>
    <p class="text-h4">
      {{ survey?.title }}
    </p>
    <p class="text-h6 mt">Respostas: {{ survey?.results.length }}</p>
    <p class="text-h4 mt">Últimas respostas:</p>
    <template v-if="isDesktop">
      <v-container>
        <v-table dense>
          <thead>
            <tr>
              <th>Utilizador</th>
              <th>Corretas</th>
              <th>Erradas</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="result in survey?.results"
              :key="survey?._id + result.username"
            >
              <td>{{ result.username }}</td>
              <td>{{ result.correct }}</td>
              <td>{{ result.wrong }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </template>
    <template v-else>
      <v-list>
        <v-list-item
          v-for="result in survey?.results"
          :key="survey?._id + result.username"
        >
          <span>{{ result.username }}</span>
          <span class="ml">Corretas: {{ result.correct }}</span>
          <span class="ml">Erradas: {{ result.wrong }}</span>
        </v-list-item>
      </v-list>
    </template>
  </div>
</template>
