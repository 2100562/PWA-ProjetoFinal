import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useMemo } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SurveyService } from './services/survey.service';
import { useQuery } from '@tanstack/react-query';
import CenterLoad from './center-load';
import Box from '@mui/material/Box';

export default function SurveyLecturer({ surveyId }: { surveyId: string }) {
  const theme = useTheme();

  const color = theme.palette.mode === 'dark' ? 'white' : 'black';

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const surveyService = useMemo(() => {
    return new SurveyService();
  }, []);

  const {
    isLoading: isSurveyLoading,
    data: survey,
    error: surveyError,
  } = useQuery({
    queryKey: ['survey', surveyId],
    queryFn: async () => {
      return surveyService.getOne(surveyId);
    },
  });

  if (surveyError) {
    throw surveyError;
  }

  if (isSurveyLoading) {
    return <CenterLoad />;
  }

  return (
    <>
      <Typography
        variant="h4"
        component="div"
        sx={{ color, mr: 2, mt: 20, textAlign: 'left' }}
      >
        {survey?.title}
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{ color, mr: 2, mt: 2, textAlign: 'left' }}
      >
        Respostas: {survey?.results.length}
      </Typography>
      <Typography
        variant="h4"
        component="div"
        sx={{ color, mr: 2, mt: 5, textAlign: 'left' }}
      >
        Últimas Respostas
      </Typography>
      {isDesktop ? (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Utilizador</TableCell>
                <TableCell>Corretas</TableCell>
                <TableCell>Erradas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {survey?.results.map((result, idx) => (
                <TableRow key={'row_' + idx}>
                  <TableCell key={'row_' + idx + '_title'}>
                    {result.username}
                  </TableCell>
                  <TableCell key={'row_' + idx + '_answers_ok'}>
                    {result.correct}
                  </TableCell>
                  <TableCell key={'row_' + idx + '_answers_nok'}>
                    {result.wrong}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box display="flex" flexDirection="column" padding={2}>
          {survey?.results.map((result, idx) => (
            <Box
              key={idx + '_box'}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Typography
                key={idx + '_title'}
                variant="h5"
                component="h1"
                sx={{ textAlign: 'left' }}
              >
                {result.username}
              </Typography>
              <Typography
                key={idx + '_answers_ok'}
                variant="h5"
                component="h1"
                sx={{ textAlign: 'right' }}
              >
                Corretas: {result.correct}
              </Typography>
              <Typography
                key={idx + '_answers_nok'}
                variant="h5"
                component="h1"
                sx={{ textAlign: 'right' }}
              >
                Erradas: {result.wrong}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
}
