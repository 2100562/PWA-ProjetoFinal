import { CircularProgress, Grid2 } from '@mui/material';
import * as React from 'react';

export default function CenterLoad() {
  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid2>
        <CircularProgress />
      </Grid2>
    </Grid2>
  );
}
