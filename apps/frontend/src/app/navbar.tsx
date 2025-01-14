import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AppBar, IconButton, useTheme } from '@mui/material';
import { router } from './app';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function Navbar({ toggleTheme }: { toggleTheme: () => void }) {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: '#fff' }}
            onClick={() => router.navigate({ to: '/' })}
          >
            Questionários
          </Typography>
          <Box sx={{ display: 'block' }}>
            <Button
              sx={{ color: '#fff' }}
              onClick={() => router.navigate({ to: '/' })}
            >
              Início
            </Button>
            <Button sx={{ color: '#fff' }}>Sair</Button>
            <IconButton sx={{ ml: 1, color: '#fff' }} onClick={toggleTheme}>
              {theme.palette.mode === 'dark' ? (
                <Brightness7 />
              ) : (
                <Brightness4 />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
