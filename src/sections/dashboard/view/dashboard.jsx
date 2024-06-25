import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, Typography, CardContent } from '@mui/material';

import Overview from '../overview';
import ActiveRate from '../active-rate';
import AlertsManagement from '../alerts-management';

// ----------------------------------------------------------------------

export default function Dashboard() {
  return (
    <Container maxWidth="xl" sx={{ height: 'auto', minWidth: 'auto' }}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 0 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Medical Equipment Interface System
          </Typography>
        </CardContent>
        <CardContent sx={{ flexGrow: 1 }}>
          <Grid container spacing={3} sx={{ height: '100%' }}>
            <Grid xs={12} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Grid sx={{ flexGrow: 1 }}>
                <Overview title="Overview" />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
              <Grid xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ height: '100%' }}>
                    <ActiveRate title="Active Rate" />
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ height: '100%' }}>
                    <AlertsManagement title="Alerts Management" />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
