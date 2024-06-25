import React from 'react';
import PropTypes from 'prop-types';
import { PolarArea } from 'react-chartjs-2';
import {
  Title,
  Legend,
  Tooltip,
  ArcElement,
  Chart as ChartJS,
  RadialLinearScale,
} from 'chart.js';

import {
  Box,
  Card,
  Typography,
  CardContent,
} from '@mui/material';

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function UserManagement({ title }) {
  const data = {
    labels: ['Admin', 'Doctors', 'Nurses', 'Technicians', 'Support Staff'],
    datasets: [
      {
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography  variant="h5" >{title}</Typography>
        <Box sx={{ mt: 0, display: 'flex', justifyContent: 'center' }}>
          <Box mt={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', maxWidth: '600px' }}>
            <PolarArea data={data} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

UserManagement.propTypes = {
  title: PropTypes.string.isRequired,
};