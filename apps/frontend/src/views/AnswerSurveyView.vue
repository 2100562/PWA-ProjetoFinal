<script lang="ts">
import { useSurveyStore } from '../stores';

export default {
  name: 'AnswerSurveyView',
  async setup() {
    const surveyStore = useSurveyStore();

    return {};
  },
};
</script>

<template>
  <v-container class="py-10" max-width="600">
    Responder Questionário
  </v-container>
</template>
