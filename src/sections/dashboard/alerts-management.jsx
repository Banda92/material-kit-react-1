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
  Card,
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
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Box sx={{ mt: 0, display: 'flex', justifyContent: 'center' }}>
          <Box mt={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', maxWidth: '600px' }}>
            <Doughnut data={data} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

AlertsManagement.propTypes = {
  title: PropTypes.string.isRequired,
};