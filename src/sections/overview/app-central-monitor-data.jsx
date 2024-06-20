import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

// ----------------------------------------------------------------------

export default function AppCentralMonitorData({ title, subheader,  ...other }) {
  

  return (
    <Card {...other} sx={{height:'100%'}}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        1
      </Box>
    </Card>
  );
}

AppCentralMonitorData.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};
