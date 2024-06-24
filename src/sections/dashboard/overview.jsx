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
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Devices</Typography>
                <Typography variant="body2">100</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Active Devices</Typography>
                <Typography variant="body2">80</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Inactive Devices</Typography>
                <Typography variant="body2">20</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ mt: 0, display: 'flex', justifyContent: 'center' }}>
          <Box mt={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', maxWidth: '600px' }}>
            <Line data={data} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

Overview.propTypes = {
  title: PropTypes.string.isRequired,
};