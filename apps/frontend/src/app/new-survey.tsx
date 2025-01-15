import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useMemo, useState } from 'react';
import {
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  useTheme,
} from '@mui/material';
import { SurveyService } from './services/survey.service';
import { NewQuestion } from '@pwa-projeto-final/model';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { router } from './app';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useError } from './layout';

export default function NewSurvey() {
  const theme = useTheme();

  const color = theme.palette.mode === 'dark' ? 'white' : 'black';

  const surveyService = useMemo(() => {
    return new SurveyService();
  }, []);

  const [title, setTitle] = useState('');
  const [validity, setValidity] = useState('');
  const [questions, setQuestions] = useState<NewQuestion[]>([
    { question: '', answers: ['', '', '', ''], correctAnswer: undefined },
  ]);
  const [errors, setErrors] = useState('');
  const { showError } = useError();

  const queryClient = useQueryClient();

  const addSurvey = useMutation({
    mutationFn: async () => {
      const newSurvey = { title, validity: new Date(validity), questions };
      return surveyService.create(newSurvey);
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ['surveys'] })
        .then(() => setTitle(''))
        .then(() => setValidity(''))
        .then(() =>
          setQuestions([
            {
              question: '',
              answers: ['', '', '', ''],
              correctAnswer: undefined,
            },
          ])
        );
    },
    onError: () => {
      showError('Failed to add Activity Provider.');
    },
  });

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (
    qIndex: number,
    aIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answers[aIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (
    qIndex: number,
    aIndex: number | undefined
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = aIndex;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', answers: ['', '', '', ''], correctAnswer: undefined },
    ]);
  };

  const validateForm = () => {
    let validationErrors = '';

    if (!title.trim()) {
      validationErrors += 'O Título é obrigatório.\n';
    }

    if (!validity) {
      validationErrors += 'A Validade é obrigatória.\n';
    }

    questions.forEach((question, index) => {
      if (!question.question.trim()) {
        validationErrors += `Pergunta ${index + 1} é obrigatória.\n`;
      }

      question.answers.forEach((answer, aIndex) => {
        if (!answer.trim()) {
          validationErrors += `Resposta ${String.fromCharCode(
            65 + aIndex
          )} para a Pergunta ${index + 1} é obrigatória.\n`;
        }
      });

      if (!question.correctAnswer) {
        validationErrors += `Deverá ser selecionada uma resposta correta para a Pergunta ${
          index + 1
        }.\n`;
      }
    });

    return validationErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(validationErrors);
      showError(validationErrors);
    } else {
      setErrors('');
      addSurvey.mutate();
      router.navigate({ to: '/' });
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        component="div"
        sx={{ color, mr: 2, mt: 10, textAlign: 'left' }}
      >
        Novo Questionário
      </Typography>

      <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <TextField
          fullWidth
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          error={!title.trim() && !!errors}
        />
        <TextField
          fullWidth
          type="date"
          label="Validade"
          slotProps={{ inputLabel: { shrink: true } }}
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          margin="normal"
          error={!validity && !!errors}
        />
        <Divider sx={{ my: 2 }} />
        {questions.map((question, qIndex) => (
          <Box key={qIndex} sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Pergunta {qIndex + 1}
            </Typography>
            <TextField
              fullWidth
              label="Pergunta"
              multiline
              rows={3}
              value={question.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              margin="normal"
              error={!question.question.trim() && !!errors}
            />
            {question.answers.map((answer, aIndex) => (
              <Box key={aIndex} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  label={`Resposta ${String.fromCharCode(65 + aIndex)}`}
                  value={answer}
                  onChange={(e) =>
                    handleAnswerChange(qIndex, aIndex, e.target.value)
                  }
                  margin="normal"
                  sx={{ flexGrow: 1 }}
                  error={!answer.trim() && !!errors}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={question.correctAnswer === aIndex}
                      onChange={() => handleCorrectAnswerChange(qIndex, aIndex)}
                    />
                  }
                  label="Correta"
                  sx={{ ml: 2 }}
                />
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
          </Box>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" onClick={addQuestion}>
            Adicionar Pergunta
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ ml: 2 }}
          >
            Criar
          </Button>
        </Box>
      </Box>
    </>
  );
}
