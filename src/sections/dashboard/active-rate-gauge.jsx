import React from 'react';
import PropTypes from 'prop-types';
import GaugeChart from 'react-gauge-chart';

import {
  Box,
  Card,
  Grid,
  Divider,
  Typography,
  CardContent,
} from '@mui/material';

export default function ActiveRate({ title }) {
  const deviceData = [
    { type: 'Device A', total: 50, active: 10 },
    { type: 'Device B', total: 20, active: 9 },
    { type: 'Device C', total: 30, active: 20 },
    { type: 'Device D', total: 10, active: 8 },
  ];

  const calculateActiveRate = (active, total) => {
    if (total === 0) {
      return 0;
    }
    return (active / total);
  };



  return (
      <CardContent>
        <Typography variant="h5" align="center">{title}</Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {deviceData.map((device, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent sx={{ whiteSpace: 'nowrap', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h6">{device.type}</Typography>
                    <Typography ml={1} variant="body2">{`( ${device.active} / ${device.total})`}</Typography>
                  </Box>
                  <Divider sx={{ my: 1, width: '100%' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <GaugeChart
                      id={`gauge-chart-${index}`}
                      nrOfLevels={3}
                      colors={['#FF6384', '#FFCE56', '#36A2EB']}
                      arcWidth={0.3}
                      percent={calculateActiveRate(device.active, device.total)}
                      // formatTextValue={(value) => `${value.toFixed(2)}%`}
                      formatTextValue={(value)=>`${value}%`}
                      textColor='black'
                      style={{ width: '100%' }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
  );
}

ActiveRate.propTypes = {
  title: PropTypes.string.isRequired,
};
