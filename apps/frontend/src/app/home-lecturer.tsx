import {
  Link,
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
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useMemo } from 'react';
import { SurveyService } from './services/survey.service';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { router } from './app';
import CenterLoad from './center-load';
import { SurveyState } from '@pwa-projeto-final/model';

export default function HomeLecturer() {
  const theme = useTheme();

  const color = theme.palette.mode === 'dark' ? 'white' : 'black';

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const surveyService = useMemo(() => {
    return new SurveyService();
  }, []);

  const {
    isLoading: isSurveysLoading,
    data: surveys,
    error: surveysError,
  } = useQuery({
    queryKey: ['surveys'],
    queryFn: async () => {
      return surveyService.getAll();
    },
  });

  if (surveysError) {
    throw surveysError;
  }

  if (isSurveysLoading) {
    return <CenterLoad />;
  }

  return (
    <>
      <Typography
        variant="h4"
        component="div"
        sx={{ color, mr: 2, mt: 20, textAlign: 'left' }}
      >
        Os meus questionários:
      </Typography>
      <Box sx={{ mt: 5 }}>
        {isDesktop ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button variant="contained">Novo</Button>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Título</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Respostas</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {surveys?.map((survey) => (
                    <TableRow key={'row_' + survey._id}>
                      <TableCell key={'row_' + survey._id + '_title'}>
                        {survey.title}
                      </TableCell>
                      <TableCell key={'row_' + survey._id + '_state'}>
                        {survey.state === SurveyState.ACTIVE
                          ? 'Ativo'
                          : 'Expirado'}
                      </TableCell>
                      <TableCell key={'row_' + survey._id + '_answers'}>
                        {survey.answers}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() =>
                            router.navigate({
                              to: '/survey',
                              search: { id: survey._id },
                            })
                          }
                        >
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <Box display="flex" flexDirection="column" padding={2}>
              {surveys?.map((survey) => (
                <Box
                  key={survey._id + '_box'}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom={2}
                >
                  <Link
                    key={survey._id + '_link'}
                    onClick={() =>
                      router.navigate({
                        to: '/survey',
                        search: { id: survey._id },
                      })
                    }
                  >
                    <Typography
                      key={survey._id + '_title'}
                      variant="h5"
                      component="h1"
                      sx={{ textAlign: 'left' }}
                    >
                      {survey.title}
                    </Typography>
                  </Link>
                  <Typography
                    key={survey._id + '_answers'}
                    variant="h5"
                    component="h1"
                    sx={{ textAlign: 'right' }}
                  >
                    Respostas: {survey.answers}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box
              position="fixed"
              bottom={16}
              left={0}
              width="100%"
              display="flex"
              justifyContent="center"
              padding={2}
            >
              <Button variant="contained">Novo</Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
