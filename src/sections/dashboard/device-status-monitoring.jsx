import React from 'react';
import PropTypes from 'prop-types';

import { 
  Box, 
  Card, 
  Typography, 
  CardContent, 
} from '@mui/material';

export default function DeviceStatusMonitoring({ title }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Box sx={{ height: 200 }}>Real-Time Device Status</Box>
      </CardContent>
    </Card>
  );
}

DeviceStatusMonitoring.propTypes = {
  title: PropTypes.string.isRequired,
};
