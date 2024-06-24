import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, Typography, CardContent } from '@mui/material';

import Overview from '../overview';
import ActiveRate from '../active-rate';
import UserManagement from '../user-management';
// import DeviceManagement from '../device-management';
import AlertsManagement from '../alerts-management';
import DeviceStatusMonitoring from '../device-status-monitoring';

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
            <Grid xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Grid sx={{ flexGrow: 1 }}>
                <Overview title="Overview" />
              </Grid>

              <Grid >
                <UserManagement title="User Management" />
              </Grid>
            </Grid>
            <Grid xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Grid sx={{ flexGrow: 1 }}>
                <ActiveRate title="Active Rate"/>
              </Grid>
              <Grid sx={{ flexGrow: 1 }}>
                <DeviceStatusMonitoring title="Device Status Monitoring" />
              </Grid>
              <Grid >
                <AlertsManagement title="Alerts Management" />
              </Grid>

            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
