import React from 'react';
import PropTypes from 'prop-types';

import { 
  Card, 
  Grid, 
  Typography, 
  CardContent, 
} from '@mui/material';

export default function Overview({ title }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Grid container spacing={3}>
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
      </CardContent>
    </Card>
  );
}

Overview.propTypes = {
  title: PropTypes.string.isRequired,
};

