import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function PatientInfoGrid() {
  return (
    <Paper elevation={3} sx={{ p: 2, margin: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
        환자 정보
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <Typography variant="body2" color="text.secondary">
            환자번호: 0001
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2" color="text.secondary">
            나이: 35
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2" color="text.secondary">
            성별: Male
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2" color="text.secondary">
            몸무게: 75 kg
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PatientInfoGrid;
