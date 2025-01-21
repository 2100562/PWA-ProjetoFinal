<script lang="ts">
import { useSurveyStore } from '../stores';
import { ref } from 'vue';
import { NewQuestion } from '@pwa-projeto-final/model';
import router from '../router';

export default {
  name: 'CreateSurveyView',
  async setup() {
    const surveyStore = useSurveyStore();

    const title = ref('');
    const validity = ref('');
    const errors = ref('');
    const questions = ref<NewQuestion[]>([
      { question: '', answers: ['', '', '', ''], correctAnswer: -1 },
    ]);

    const createSurvey = async () => {
      return surveyStore
        .createSurvey({
          title: title.value,
          validity: new Date(validity.value),
          newQuestions: questions.value,
        })
        .then(() => router.push('/'));
    };

    const handleCorrectAnswerChange = (qIndex: number, aIndex: number) => {
      questions.value[qIndex].correctAnswer = aIndex;
    };

    const addQuestion = () => {
      questions.value.push({
        question: '',
        answers: ['', '', '', ''],
        correctAnswer: -1,
      });
    };

    const validateForm = () => {
      let validationErrors = '';

      if (!title.value.trim()) {
        validationErrors += 'O Título é obrigatório.\n';
      }

      if (!validity.value) {
        validationErrors += 'A Validade é obrigatória.\n';
      }

      questions.value.forEach((question, index) => {
        if (!question.question.trim()) {
          validationErrors += `Pergunta ${index + 1} é obrigatória.\n`;
        }

        question.answers.forEach((answer, aIndex) => {
          if (!answer.trim()) {
            validationErrors += `Resposta ${String.fromCharCode(65 + aIndex)} para a Pergunta ${index + 1} é obrigatória.\n`;
          }
        });

        if (question.correctAnswer === -1) {
          validationErrors += `Deverá ser selecionada uma resposta correta para a Pergunta ${index + 1}.\n`;
        }
      });

      return validationErrors;
    };

    const handleSubmit = () => {
      const validationErrors = validateForm();
      if (validationErrors) {
        console.log(validationErrors);
      } else {
        errors.value = '';
        createSurvey();
      }
    };

    return {
      title,
      validity,
      questions,
      errors,
      handleCorrectAnswerChange,
      addQuestion,
      handleSubmit,
    };
  },
};
</script>

<template>
  <v-container class="py-10" max-width="600">
    <p class="mb-2 text-h4">Novo Questionário</p>

    <v-text-field
      v-model="title"
      :error="!title.trim() && !!errors"
      class="mb-4"
      label="Título"
      outlined
    />

    <v-text-field
      v-model="validity"
      :error="!validity && !!errors"
      class="mb-4"
      label="Validade"
      outlined
      type="date"
    />

    <v-divider class="my-6" />

    <div
      v-for="(question, qIndex) in questions.value"
      :key="qIndex"
      class="mb-8"
    >
      <p class="mb-2 text-h6">Pergunta {{ qIndex + 1 }}</p>

      <v-textarea
        v-model="question.question"
        :error="!question.question.trim() && !!errors"
        class="mb-4"
        label="Pergunta"
        outlined
        rows="3"
      />

      <div
        v-for="(answer, aIndex) in question.answers"
        :key="aIndex"
        class="d-flex align-center mb-2"
      >
        <v-text-field
          v-model="question.answers[aIndex]"
          :error="!answer.trim() && !!errors"
          :label="`Resposta ${String.fromCharCode(65 + aIndex)}`"
          class="flex-grow-1"
          outlined
        />

        <v-checkbox
          :value="question.correctAnswer === aIndex"
          class="ml-4"
          label="Correta"
          @change="() => handleCorrectAnswerChange(qIndex, aIndex)"
        />
      </div>

      <v-divider class="my-6" />
    </div>

    <v-btn class="mb-6" color="primary" @click="addQuestion">
      Adicionar Pergunta
    </v-btn>

    <div class="d-flex justify-center">
      <v-btn class="ml-2" color="primary" @click="handleSubmit"> Criar </v-btn>
    </div>
  </v-container>
</template>
