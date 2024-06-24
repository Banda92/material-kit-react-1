import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Add, Delete,} from '@mui/icons-material';
import { 
  Card, 
  Grid, 
  List, 
  Button, 
  ListItem, 
  TextField, 
  IconButton,
  Typography, 
  CardContent, 
  ListItemText, 
} from '@mui/material';

// 기본 데이터
const defaultDevices = [
  { name: "Heart Monitor", ip: "192.168.1.10" },
  { name: "Blood Pressure Cuff", ip: "192.168.1.11" },
  { name: "Pulse Oximeter", ip: "192.168.1.12" }
];

// ----------------------------------------------------------------------

export default function DeviceManagement({ title }) {
  const [devices, setDevices] = useState(defaultDevices);
  const [deviceName, setDeviceName] = useState('');
  const [deviceIP, setDeviceIP] = useState('');

  const handleAddDevice = () => {
    if (deviceName && deviceIP) {
      setDevices([...devices, { name: deviceName, ip: deviceIP }]);
      setDeviceName('');
      setDeviceIP('');
    }
  };

  const handleDeleteDevice = (index) => {
    setDevices(devices.filter((_, i) => i !== index));
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3 }}>{title}</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Device Name"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Device IP"
              value={deviceIP}
              onChange={(e) => setDeviceIP(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAddDevice}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <List sx={{ mt: 2 }}>
          {devices.map((device, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteDevice(index)}>
                  <Delete />
                </IconButton>
              }
            >
              <ListItemText primary={device.name} secondary={device.ip} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

DeviceManagement.propTypes = {
  title: PropTypes.string.isRequired,
};
