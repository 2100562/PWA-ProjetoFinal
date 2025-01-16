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

export default function HomeStudent() {
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
      return surveyService.getAllUnanswered();
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
        Questionários por responder:
      </Typography>
      <Box sx={{ mt: 5 }}>
        {isDesktop ? (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Expira em</TableCell>
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
                      {survey.validity.toLocaleString(
                        Intl.NumberFormat().resolvedOptions().locale
                      )}
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
                        Responder
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
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
                  Expira em:{' '}
                  {survey.validity.toLocaleString(
                    Intl.NumberFormat().resolvedOptions().locale
                  )}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}
