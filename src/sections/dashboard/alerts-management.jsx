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
    labels: ['Critical', 'Warning', 'Information'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
      },
    ],
  };

  return (
      <CardContent>
        <Typography variant="h5" align="center">{title}</Typography>
        <Box mt={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
          <Box sx={{ width:'100%', maxWidth: '450px', maxHeight: '450px' }}>
            <Doughnut data={data} />
          </Box>
        </Box>
      </CardContent>
  );
}

AlertsManagement.propTypes = {
  title: PropTypes.string.isRequired,
};
