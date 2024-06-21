import React from 'react';
import PropTypes from 'prop-types';

import { 
  Box, 
  Card, 
  Typography, 
  CardContent, 
} from '@mui/material';

export default function DataAnalytics({ title }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Box sx={{ height: 200 }}>Data Analytics Components</Box>
      </CardContent>
    </Card>
  );
}

DataAnalytics.propTypes = {
  title: PropTypes.string.isRequired,
};
