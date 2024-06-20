import { useRef, useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import AppCentralMonitor from '../app-central-monitor';
import AppCentralMonitorData from '../app-central-monitor-data';
import AppCentralMonitorPatinfo from '../app-central-monitor-patinfo';

// ----------------------------------------------------------------------

export default function AppView() {
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
    <Container maxWidth="xl">
      <Grid container spacing={3} sx={{ height: `${innerHeight - 80 - innerHeight * 0.06}px` }}>
        <Grid container item xs={12} sm={6} md={7} spacing={3} direction="column" sx={{ display: 'flex', height: '100%' }}>
          <Grid item xs={12} sx={{ flexBasis: '30%', flexGrow: 0 }}>
            <AppCentralMonitor title="Central Monitor" />
          </Grid>
          <Grid item xs={12} sx={{ flexBasis: '70%', flexGrow: 0 }}>
            <AppCentralMonitorPatinfo title="Patient Information" />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <AppCentralMonitorData title="Most Recently Received Data" />
        </Grid>
      </Grid>
    </Container>
  );
}
