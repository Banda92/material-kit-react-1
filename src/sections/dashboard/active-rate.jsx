import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Title,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
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
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Overview({ title }) {
  const deviceData = [
    { type: 'Device1', total: 50, active: 10, inactive: 40 },
    { type: 'Device2', total: 20, active: 9, inactive: 11 },
    { type: 'Device3', total: 30, active: 20, inactive: 10 },
    { type: 'Device4', total: 10, active: 8, inactive: 2 },
  ];

  const calculateActiveRate = (active, total) => {
    if (total === 0) {
      return '0%';
    }
    return `${((active / total) * 100).toFixed(2)}%`;
  };

  const chartData = {
    labels: deviceData.map(device => device.type),
    datasets: [
      {
        label: 'Active Rate (%)',
        data: deviceData.map(device => parseFloat(calculateActiveRate(device.active, device.total))),
        backgroundColor: deviceData.map(device => {
          const rate = parseFloat(calculateActiveRate(device.active, device.total));
          if (rate <= 30) return '#FF6384';
          if (rate <= 50) return '#FFCE56';
          return '#36A2EB';
        }),
        borderColor: deviceData.map(device => {
          const rate = parseFloat(calculateActiveRate(device.active, device.total));
          if (rate <= 30) return '#FF6384';
          if (rate <= 50) return '#FFCE56';
          return '#36A2EB';
        }),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          generateLabels: chart => [
            {
              text: '30% 이하',
              fillStyle: '#FF6384',
              strokeStyle: '#FF6384',
              hidden: false,
            },
            {
              text: '50% 이하',
              fillStyle: '#FFCE56',
              strokeStyle: '#FFCE56',
              hidden: false,
            },
            {
              text: '50% 이상(정상)',
              fillStyle: '#36A2EB',
              strokeStyle: '#36A2EB',
              hidden: false,
            },
          ],
        },
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {deviceData.map((device, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{device.type}</Typography>
                  <Typography variant="body2">Total: {device.total}</Typography>
                  <Typography variant="body2">Active: {device.active}</Typography>
                  <Typography variant="body2">Inactive: {device.inactive}</Typography>
                  <Typography variant="body2">Active Rate: {calculateActiveRate(device.active, device.total)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Box mt={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', maxWidth: '600px' }}>
            <Bar data={chartData} options={chartOptions} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

Overview.propTypes = {
  title: PropTypes.string.isRequired,
};
