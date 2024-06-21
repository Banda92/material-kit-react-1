import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import React, { 
  useRef, 
  useState, 
} from 'react';
import { 
  Title, 
  Legend, 
  Tooltip, 
  LinearScale, 
  LineElement, 
  PointElement, 
  CategoryScale, 
  Chart as ChartJS, 
} from 'chart.js';

import { ExpandMore, ExpandLess } from '@mui/icons-material';
import {
  Box,
  Card, 
  Grid, 
  Collapse, 
  CardHeader, 
  Typography, 
  IconButton,
  CardContent, 
} from '@mui/material';

// Register the necessary components with Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// ----------------------------------------------------------------------

export default function AppCentralMonitorVital({ title, subheader, ...other }) {
  const [expanded, setExpanded] = useState(true);
  const contentRef = useRef(null);

  const vitalData = {
    "Resp": [
      { "time": "8:00", "value": 15 },
      { "time": "8:15", "value": 20 },
      { "time": "8:30", "value": 25 },
      { "time": "8:45", "value": 30 },
      { "time": "9:00", "value": 28 },
      { "time": "9:15", "value": 27 },
      { "time": "9:30", "value": 30 },
      { "time": "9:45", "value": 29 }
    ],
    "Pulse": [
      { "time": "8:00", "value": 70 },
      { "time": "8:15", "value": 75 },
      { "time": "8:30", "value": 80 },
      { "time": "8:45", "value": 85 },
      { "time": "9:00", "value": 78 },
      { "time": "9:15", "value": 80 },
      { "time": "9:30", "value": 82 },
      { "time": "9:45", "value": 90 }
    ],
    "SPO2": [
      { "time": "8:00", "value": 98 },
      { "time": "8:15", "value": 98.5 },
      { "time": "8:30", "value": 99 },
      { "time": "8:45", "value": 99 },
      { "time": "9:00", "value": 98.8 },
      { "time": "9:15", "value": 98.9 },
      { "time": "9:30", "value": 99 },
      { "time": "9:45", "value": 99.2 }
    ],
    "Temp": [
      { "time": "8:00", "value": 36.5 },
      { "time": "8:15", "value": 36.6 },
      { "time": "8:30", "value": 36.7 },
      { "time": "8:45", "value": 36.8 },
      { "time": "9:00", "value": 36.7 },
      { "time": "9:15", "value": 36.8 },
      { "time": "9:30", "value": 36.9 },
      { "time": "9:45", "value": 37.0 }
    ]
  };

  const createChartData = (data, label) => ({
    labels: data.map(d => d.time),
    datasets: [
      {
        label,
        data: data.map(d => d.value),
        fill: false,
        borderColor: getColor(label),
        backgroundColor: getColor(label),
        tension: 0.1,
        datalabels: {
          align: 'end',
          anchor: 'end'
        }
      }
    ]
  });

  const getColor = (label) => {
    switch (label) {
      case 'Resp': return 'rgba(0, 191, 255, 1)';
      case 'Pulse': return 'rgba(255, 105, 180, 1)';
      case 'SPO2': return 'rgba(50, 205, 50, 1)';
      case 'Temp': return 'rgba(255, 165, 0, 1)';
      default: return 'rgba(0, 0, 0, 1)';
    }
  };

  const options = (yMin, yMax) => ({
    scales: {
      y: {
        beginAtZero: false,
        min: yMin,
        max: yMax
      }
    },
    plugins: {
      datalabels: {
        display: true,
        color: 'black',
        align: 'center',
        anchor: 'center'
      }
    }
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  return (
    <Card {...other} sx={{ transition: 'height 0.3s ease', height: expanded ? 'auto' : '56px' }}>
      <CardHeader 
        title={title} 
        subheader={subheader} 
        action={
          <IconButton onClick={handleExpandClick}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      />
      <Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent ref={contentRef}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Resp</Typography>
                <Line data={createChartData(vitalData.Resp, 'Resp')} options={options(0, 40)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Pulse</Typography>
                <Line data={createChartData(vitalData.Pulse, 'Pulse')} options={options(60, 100)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">SPO2</Typography>
                <Line data={createChartData(vitalData.SPO2, 'SPO2')} options={options(95, 100)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Temp</Typography>
                <Line data={createChartData(vitalData.Temp, 'Temp')} options={options(35, 38)} />
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Box>
    </Card>
  );
}

AppCentralMonitorVital.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};
