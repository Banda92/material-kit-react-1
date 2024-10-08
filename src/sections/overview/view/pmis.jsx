import { useRef, useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, Typography, CardContent } from '@mui/material';

import AppCentralMonitor from '../app-central-monitor';
import AppCentralMonitorData from '../app-central-monitor-data';
import AppCentralMonitorVital from '../app-central-monitor-vital'; 
import AppCentralMonitorPatinfo from '../app-central-monitor-patinfo';

// ----------------------------------------------------------------------

export default function PMIS() {
  const prevHeight = useRef(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      if (prevHeight.current !== currentHeight) {
        console.log('Inner Height:', currentHeight);
        setInnerHeight(currentHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  return (
    <Container maxWidth="xl" sx={{ height: `${innerHeight - 80 - 36 - innerHeight * 0.06}px` }}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column',  overflow:'auto'}}>
        <CardContent sx={{ flexGrow: 0 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            MediumsPMIS
          </Typography>
        </CardContent>
        <CardContent sx={{ flexGrow: 1 }}>
          <Grid container spacing={3} sx={{ height: '100%' }}>
            <Grid xs={12} sm={6} md={7} sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 3 }}>
              <Grid sx={{ flexBasis: 'auto', flexShrink: 0 }}>
                <AppCentralMonitor title="Central Monitor" />
              </Grid>
              <Grid sx={{ flexBasis: 1, flexGrow: 1, overflow: 'auto' }}>
                <AppCentralMonitorPatinfo title="Patient Information" />
              </Grid>
            </Grid>
            <Grid xs={12} sm={6} md={5} sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 3 }}>
              <Grid sx={{ flexBasis: 'auto', flexShrink: 0 }}>
                <AppCentralMonitorData title="Most Recently Received Data" />
              </Grid>
              <Grid sx={{ flexBasis: 'auto', flexShrink: 0, flexGrow: 1 }}>
                <AppCentralMonitorVital title="Vital Monitor" /> 
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
