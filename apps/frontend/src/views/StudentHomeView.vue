<script lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useSurveyStore } from '../stores/survey-store';
import router from '../router';

export default {
  name: 'StudentHomeView',
  async setup() {
    const display = useDisplay();
    const isDesktop = computed(() => display.mdAndUp.value);
    const surveyStore = useSurveyStore();

    await surveyStore.fetchUnansweredSurveys();

    const unansweredSurveys = surveyStore.unansweredSurveys;

    const answerSurvey = (id: string) => {
      router.push({
        path: `/answer-survey`,
        query: {
          id: id,
        },
      });
    };

    return {
      isDesktop,
      unansweredSurveys,
      answerSurvey: answerSurvey,
    };
  },
};
</script>

<template>
  <div>
    <template v-if="isDesktop">
      <v-container>
        <h1>Questionários por responder:</h1>
        <v-table dense>
          <thead>
            <tr>
              <th>Título</th>
              <th>Expira em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="survey in unansweredSurveys" :key="survey._id">
              <td>{{ survey.title }}</td>
              <td>{{ survey.validity.toLocaleString() }}</td>
              <td>
                <v-btn color="primary" @click="answerSurvey(survey._id)">
                  Responder
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </template>
    <template v-else>
      <h1>Questionários por responder:</h1>
      <v-list>
        <v-list-item
          v-for="survey in unansweredSurveys"
          :key="survey._id"
          @click="answerSurvey(survey._id)"
        >
          <span>{{ survey.title }}</span>
          <span class="ml">
            Expira em: {{ survey.validity.toLocaleString() }}
          </span>
        </v-list-item>
      </v-list>
    </template>
  </div>
</template>
