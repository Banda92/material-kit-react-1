import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Grid, List, Radio, Button, Select, ListItem, Collapse, MenuItem, Container, TextField, InputLabel, Typography, RadioGroup, FormControl, ListItemText, FormControlLabel } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppCentralMonitor({ title, subheader, ...other }) {
  const [serverData, setServerData] = useState({
    "PMIS": [
      { "name": "AGS-10.70.150.161", "status": "disconnected", "Manufacturer": "Company A", "NetLinkType": "Type 1", "IP": "10.70.150.161", "Port": 8080, "SendResponseYN": "Y" },
      { "name": "AGS-10.70.150.162", "status": "disconnected", "Manufacturer": "Company B", "NetLinkType": "Type 2", "IP": "10.70.150.162", "Port": 8081, "SendResponseYN": "N" },
      { "name": "AGS-127.0.0.1", "status": "connected", "Manufacturer": "Company C", "NetLinkType": "Type 3", "IP": "127.0.0.1", "Port": 8082, "SendResponseYN": "Y" }
    ]
  });

  const [pmisOpen, setPmisOpen] = useState(false);
  const [open, setOpen] = useState({});
  const [selectedAGS, setSelectedAGS] = useState(null);

  const handlePmisClick = () => {
    setPmisOpen((prev) => !prev);
  };

  const handleClick = (ags) => {
    setSelectedAGS(ags);
    setOpen((prev) => ({ ...prev, [ags.name]: !prev[ags.name] }));
  };

  const handleChange = (field, value) => {
    setSelectedAGS(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setServerData(prev => ({
      ...prev,
      PMIS: prev.PMIS.map(ags => (ags.name === selectedAGS.name ? selectedAGS : ags))
    }));
    console.log("Saved AGS data:", selectedAGS);
  };

  const toggleConnectionStatus = () => {
    setSelectedAGS(prev => ({ ...prev, status: prev.status === 'connected' ? 'disconnected' : 'connected' }));
  };

  return (
    <Card {...other} sx={{ height: '100%' }}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1, height: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Container>
              <List component="nav">
                <ListItem button onClick={handlePmisClick} sx={{ cursor: 'pointer' }}>
                  <ListItemText primary="PMIS" />
                  {pmisOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={pmisOpen} timeout="auto" unmountOnExit>
                  {serverData.PMIS.map((ags, index) => (
                    <Box key={index} ml={4}>
                      <ListItem button onClick={() => handleClick(ags)} sx={{ cursor: 'pointer' }}>
                        <ListItemText
                          primary={
                            <>
                              <Typography component="span">
                                {ags.name}
                              </Typography>
                              <Typography
                                component="span"
                                style={{ color: ags.status === 'disconnected' ? 'red' : 'green' }}
                              >
                                {` (${ags.status})`}
                              </Typography>
                            </>
                          }
                        />
                        {open[ags.name] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={open[ags.name]} timeout="auto" unmountOnExit>
                        <Box marginLeft={4}>
                          <Typography variant="body1">Manufacturer: {ags.Manufacturer}</Typography>
                          <Typography variant="body1">NetLinkType: {ags.NetLinkType}</Typography>
                          <Typography variant="body1">IP: {ags.IP}</Typography>
                          <Typography variant="body1">Port: {ags.Port}</Typography>
                          <Typography variant="body1">SendResponseYN: {ags.SendResponseYN}</Typography>
                        </Box>
                      </Collapse>
                    </Box>
                  ))}
                </Collapse>
              </List>
            </Container>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Container>
              {selectedAGS ? (
                <Box component="form" noValidate autoComplete="off">
                  <Typography variant="h5" gutterBottom>
                    Edit {selectedAGS.name}
                  </Typography>
                  <Box display="flex" alignItems="center" mb={2}>
                    <TextField
                      label="Status"
                      value={selectedAGS.status}
                      fullWidth
                      margin="normal"
                      disabled
                    />
                    <Button
                      variant="contained"
                      color={selectedAGS.status === 'connected' ? 'error' : 'success'}
                      sx={{ mt: 2, ml: 2, height: '56px' }}
                      onClick={toggleConnectionStatus}
                    >
                      {selectedAGS.status === 'connected' ? '해제' : '연결'}
                    </Button>
                  </Box>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Manufacturer</InputLabel>
                    <Select
                      value={selectedAGS.Manufacturer}
                      onChange={(e) => handleChange('Manufacturer', e.target.value)}
                    >
                      <MenuItem value="Company A">Company A</MenuItem>
                      <MenuItem value="Company B">Company B</MenuItem>
                      <MenuItem value="Company C">Company C</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>NetLinkType</InputLabel>
                    <Select
                      value={selectedAGS.NetLinkType}
                      onChange={(e) => handleChange('NetLinkType', e.target.value)}
                    >
                      <MenuItem value="Type 1">Type 1</MenuItem>
                      <MenuItem value="Type 2">Type 2</MenuItem>
                      <MenuItem value="Type 3">Type 3</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="IP"
                    value={selectedAGS.IP}
                    fullWidth
                    margin="normal"
                    onChange={(e) => handleChange('IP', e.target.value)}
                  />
                  <TextField
                    label="Port"
                    value={selectedAGS.Port}
                    fullWidth
                    margin="normal"
                    onChange={(e) => handleChange('Port', e.target.value)}
                  />
                  <FormControl fullWidth margin="normal">
                    SendResponseYN
                    <Box sx={{ border: '1px solid #ced4da', borderRadius: 1, padding: 1 }}>
                      <RadioGroup
                        sx={{ml:1}}
                        row
                        value={selectedAGS.SendResponseYN}
                        onChange={(e) => handleChange('SendResponseYN', e.target.value)}
                      >
                        <FormControlLabel value="Y" control={<Radio />} label="예" />
                        <FormControlLabel value="N" control={<Radio />} label="아니오" />
                      </RadioGroup>
                    </Box>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </Box>
              ) : (
                <Typography variant="h6">Select an AGS item to edit</Typography>
              )}
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

AppCentralMonitor.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};
