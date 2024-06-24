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



export default function DeviceStatusMonitoring({ title }) {
  const deviceData = [
    { name: 'Device 1', battery: 75 },
    { name: 'Device 2', battery: 50 },
    { name: 'Device 3', battery: 90 },
    { name: 'Device 4', battery: 20 },
  ];

  const getColor = (value) => {
    if (value <= 30) return '#FF6384'; // Critical
    if (value <= 50) return '#FFCE56'; // Warning
    return '#36A2EB'; // Normal
  };

  const data = {
    labels: deviceData.map(device => device.name),
    datasets: [
      {
        label: 'Battery Level',
        data: deviceData.map(device => device.battery),
        backgroundColor: deviceData.map(device => getColor(device.battery)),
        borderColor: deviceData.map(device => getColor(device.battery)),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          generateLabels: (chart) => [
            {
              text: 'Normal',
              fillStyle: '#36A2EB',
            },
            {
              text: 'Warning',
              fillStyle: '#FFCE56',
            },
            {
              text: 'Critical',
              fillStyle: '#FF6384',
            },
          ],
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Box sx={{ mt: 0, display: 'flex', justifyContent: 'center' }}>
          <Box mt={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', maxWidth:'600px' }}>            
          <Bar data={data} options={options} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

DeviceStatusMonitoring.propTypes = {
  title: PropTypes.string.isRequired,
};