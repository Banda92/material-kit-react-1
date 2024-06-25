import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Title,
  Legend,
  Tooltip,
  ArcElement,
  Chart as ChartJS,
} from 'chart.js';

import {
  Box,
  Typography,
  CardContent,
} from '@mui/material';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AlertsManagement({ title }) {
  const data = {
    labels: ['Information', 'Warning', 'Critical'],
    datasets: [
      {
        data: [300, 100, 50],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };

  return (
    <CardContent>
      <Typography variant="h5" align="center">{title}</Typography>
      <Box mt={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
        <Box sx={{ width: '100%', maxWidth: '450px', maxHeight: '450px' }}>
          <Doughnut data={data} />
        </Box>
      </Box>
    </CardContent>
  );
}

AlertsManagement.propTypes = {
  title: PropTypes.string.isRequired,
};
