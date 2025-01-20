<script lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useSurveyStore } from '../stores/survey-store';
import router from '../router';

export default {
  name: 'LecturerHomeView',
  async setup() {
    const display = useDisplay();
    const isDesktop = computed(() => display.mdAndUp.value);
    const surveyStore = useSurveyStore();

    await surveyStore.fetchAllSurveys();

    const allSurveys = surveyStore.surveys;

    const viewSurvey = (id: string) => {
      router.push({
        path: `/view-survey`,
        query: {
          id: id,
        },
      });
    };

    const createSurvey = () => {
      router.push(`/create-survey`);
    };

    return {
      isDesktop,
      allSurveys,
      viewSurvey,
      createSurvey,
    };
  },
};
</script>

<template>
  <div>
    <div v-if="isDesktop" class="header">
      <h1>Os meus questionários:</h1>
      <v-btn color="primary" @click="createSurvey">Novo</v-btn>
    </div>
    <template v-if="isDesktop">
      <v-container>
        <v-table dense>
          <thead>
            <tr>
              <th>Título</th>
              <th>Validade</th>
              <th>Estado</th>
              <th>Respostas</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="survey in allSurveys" :key="survey._id">
              <td>{{ survey.title }}</td>
              <td>{{ new Date(survey.validity).toLocaleDateString() }}</td>
              <td>{{ survey.state === 'active' ? 'Ativo' : 'Expirado' }}</td>
              <td>{{ survey.results.length }}</td>
              <td>
                <v-btn color="primary" @click="viewSurvey(survey._id)">
                  Ver
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </template>
    <template v-else>
      <h1>Os meus questionários:</h1>
      <v-list>
        <v-list-item
          v-for="survey in allSurveys"
          :key="survey._id"
          @click="viewSurvey(survey._id)"
        >
          <span>{{ survey.title }}</span>
          <span class="ml">Respostas: {{ survey.results.length }}</span>
        </v-list-item>
      </v-list>
      <div class="mobile-button">
        <v-btn color="primary" @click="createSurvey">Novo</v-btn>
      </div>
    </template>
  </div>
</template>

<style lang="css" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
