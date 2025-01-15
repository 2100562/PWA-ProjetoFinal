export const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#23b4dc',
    },
    secondary: {
      main: '#f50057',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
        },
        contained: {
          '&:hover': {
            backgroundColor: '#f50057',
          },
        },
      },
    },
  },
};
