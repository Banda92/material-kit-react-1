import React,{ useState, useEffect,} from 'react';

import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import  { useSelectedPatNo } from '../../hooks/useStatusHooks';
import { getPatientInfoData } from '../../../public/assets/Datas/AKFP_Datas';


function PatientInfoGrid() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const { selectedPatNo } = useSelectedPatNo();

  const [selectedPatData, setSelectedPatData] = useState(null)

  useEffect(() => {
    setSelectedPatData(getPatientInfoData().find(person => person.pat_id === parseInt(selectedPatNo, 10)))
  }, [selectedPatNo])


  return (
    <Paper elevation={3} sx={{ p: 2, margin: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
        환자 정보
      </Typography>
      <div style={{
        display: 'flex',
        flexDirection: matches ? 'row' : 'column',
        flexWrap: 'wrap'
      }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, whiteSpace: 'normal', flex: matches ? '1 1 auto' : '1 0 100%' }}>
          환자번호: {selectedPatNo}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, whiteSpace: 'normal', flex: matches ? '1 1 auto' : '1 0 100%' }}>
          나이: {selectedPatData ? selectedPatData.real_age:'No Data'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, whiteSpace: 'normal', flex: matches ? '1 1 auto' : '1 0 100%' }}>
          성별: {selectedPatData ? selectedPatData.sex:'No Data'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, whiteSpace: 'normal', flex: matches ? '1 1 auto' : '1 0 100%' }}>
          몸무게: {selectedPatData ? selectedPatData.patientweight:'No Data'} kg
        </Typography>
      </div>
    </Paper>
  );
}

export default PatientInfoGrid;
