import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from './navbar';
import { Outlet } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { themeOptions } from '../theme';
import { motion } from 'framer-motion';

export default function Layout() {
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
          <Navbar toggleTheme={toggleTheme} />
          <Outlet />
        </Container>
      </motion.div>
    </ThemeProvider>
  );
}
