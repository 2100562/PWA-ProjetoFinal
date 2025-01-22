<script lang="ts">
import { useSurveyStore } from '../stores';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import router from '../router';

export default {
  name: 'AnswerSurveyView',
  async setup() {
    const surveyStore = useSurveyStore();
    const route = useRoute();
    const queryParams = ref(route.query);
    const answers = ref<number[]>([]);

    if (!queryParams.value) {
      await router.push('/');
    }

    if (!queryParams.value?.id) {
      await router.push('/');
    }

    const surveyId = queryParams.value?.id as string;

    await surveyStore.fetchSurveyById(surveyId);
    const survey = surveyStore.currentSurvey;

    const submitResult = async () => {
      const result = answers.value?.map((a, idx) => {
        return {
          questionId: idx,
          answerId: a,
        };
      });

      await surveyStore.createResult({
        surveyId,
        answers: result,
      });

      await router.push('/');
    };

    return {
      answers,
      survey,
      submitResult,
    };
  },
};
</script>

<template>
  <v-container
    class="pa-4"
    fluid
  >
    <v-card class="pa-4">
      <v-card-title class="text-h5">
        {{ survey?.title }}
      </v-card-title>
      <v-divider class="my-4" />

      <v-form ref="form">
        <div
          v-for="question in survey?.questions"
          :key="question.id"
          class="mb-4"
        >
          <v-row>
            <v-col cols="12">
              <p class="font-weight-medium">
                {{ question.question }}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-radio-group v-model="answers[question.id]">
                <v-radio
                  v-for="(answer, index) in question.answers"
                  :key="index"
                  :label="answer"
                  :value="index"
                />
              </v-radio-group>
            </v-col>
          </v-row>
        </div>

        <v-btn
          block
          color="primary"
          @click="submitResult"
        >
          Submeter
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
