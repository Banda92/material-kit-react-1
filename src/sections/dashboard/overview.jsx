import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Title,
  Legend,
  Tooltip,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from 'chart.js';

import {
  Box,
  Card,
  Grid,
  Typography,
  CardContent,
} from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Overview({ title }) {
  const data = {
    labels: ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01', '2024-05-01', '2024-06-01', '2024-07-01'],
    datasets: [
      {
        label: 'Active Devices',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
      x: {
        type: 'category',
        labels: data.labels,
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    maintainAspectRatio: false
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Grid container spacing={3} sx={{ mt: 0 }}>
          <Grid item xs={12} sm={4}>
            <Card >
              <CardContent align="center">
                <Typography variant="h6">Active Devices</Typography>
                <Typography mt={1} variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>80</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent align="center">
                <Typography variant="h6">Total Devices</Typography>
                <Typography mt={1} variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>100</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent align="center">
                <Typography variant="h6">Active Rate</Typography>
                <Typography mt={1} variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>80%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ mt: 0, display: 'flex', justifyContent: 'center' }}>
          <Box mt={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '300px', width: '100%'}}>
            <Line data={data} options={options} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

Overview.propTypes = {
  title: PropTypes.string.isRequired,
};
