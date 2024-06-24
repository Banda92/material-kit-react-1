import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
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

export default function DataAnalytics({ title }) {
  const data = {
    labels: ['Device A', 'Device B', 'Device C', 'Device D'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Box sx={{ mt: 4 }}>
          <Pie data={data} />
        </Box>
      </CardContent>
    </Card>
  );
}

DataAnalytics.propTypes = {
  title: PropTypes.string.isRequired,
};