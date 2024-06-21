import { useRef, useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, Typography, CardContent } from '@mui/material';

import HdcsOrderInfo from '../hdcs-orders-info';
import HdcsResults from '../hdcs-orders-result';
import HdcsEventViewer from '../hdcs-orders-event';


// ----------------------------------------------------------------------

export default function HDCS() {
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
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 0 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            MediumsPMIS
          </Typography>
        </CardContent>
        <CardContent sx={{ flexGrow: 1 }}>
          <Grid container spacing={3} sx={{ height: '100%' }}>
            <Grid xs={12} sm={6} md={7} sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 3 }}>
              <Grid sx={{ flexBasis: 'auto', flexShrink: 0 }}>
              <HdcsOrderInfo title="Order Infomations"/>
              </Grid>
              <Grid sx={{ flexBasis: 1, flexGrow: 1, overflow: 'auto' }}>
                <HdcsEventViewer title="Event Viewer"/>
              </Grid>
            </Grid>
            <Grid xs={12} sm={6} md={5} sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 3 }}>
              <Grid sx={{ flexBasis: 'auto', flexShrink: 0 }}>
                <HdcsResults title="ECG/EP - Results"/>
              </Grid>
              {/* <Grid sx={{ flexBasis: 'auto', flexShrink: 0, flexGrow: 1 }}> */}
                {/* <AppCentralMonitorVital title="Vital Monitor" />  */}
              {/* </Grid> */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
