import React from 'react';
import PropTypes from 'prop-types';

import { 
  Box, 
  Card, 
  Typography, 
  CardContent, 
} from '@mui/material';

export default function AlertsManagement({ title }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Box sx={{ height: 200 }}>Alerts and Notifications Management</Box>
      </CardContent>
    </Card>
  );
}

AlertsManagement.propTypes = {
  title: PropTypes.string.isRequired,
};
