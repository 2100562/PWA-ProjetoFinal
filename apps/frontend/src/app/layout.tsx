import {
  Alert,
  Container,
  CssBaseline,
  Snackbar,
  ThemeProvider,
} from '@mui/material';
import Navbar from './navbar';
import { Outlet } from '@tanstack/react-router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { themeOptions } from '../theme';
import { motion } from 'framer-motion';

interface ErrorProps {
  showError: (message: string) => void;
}

let ErrorContext = createContext<ErrorProps>({ showError: () => null });

export const useError = () => useContext(ErrorContext);

export default function Layout() {
  const [error, setError] = useState({ open: false, message: '' });

  const handleErrorClose = () => {
    setError({ open: false, message: '' });
  };

  const handleError = (message: string) => {
    setError({ open: true, message });
  };

  ErrorContext = createContext<ErrorProps>({ showError: handleError });

  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      setMode(savedMode as 'light' | 'dark');
    }
  }, []);

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          ...themeOptions,
          palette: {
            ...themeOptions.palette,
            mode,
          },
        })
      ),
    [mode]
  );

  const themeAnimationVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 1 } },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <motion.div
        key={mode}
        variants={themeAnimationVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Container>
          <nav>
            <Navbar toggleTheme={toggleTheme} />
          </nav>
          <main>
            <Outlet />
            <Snackbar
              open={error.open}
              autoHideDuration={6000}
              onClose={handleErrorClose}
            >
              <Alert
                onClose={handleErrorClose}
                severity="error"
                sx={{ width: '100%' }}
              >
                {error.message}
              </Alert>
            </Snackbar>
          </main>
        </Container>
      </motion.div>
    </ThemeProvider>
  );
}
