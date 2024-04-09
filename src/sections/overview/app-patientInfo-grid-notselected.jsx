import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';



function PatientInfoGridNotSelected() {


  return (
    <Paper elevation={3} sx={{ p: 2, margin: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
        환자 정보
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, whiteSpace: 'normal', }}>
        선택된 환자 정보가 존재하지 않습니다. 대상 환자를 선택해주세요.
      </Typography>
    </Paper>
  );
}

export default PatientInfoGridNotSelected;
