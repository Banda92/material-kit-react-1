import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Link, LinkOff, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Grid, List, Radio, Button, Select, ListItem, Collapse, MenuItem, Container, TextField, InputLabel, Typography, RadioGroup, IconButton, FormControl, ListItemText, FormControlLabel, } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppCentralMonitor({ title, subheader, ...other }) {
  const [serverData, setServerData] = useState({
    "PMIS": [
      { "name": "AGS-10.70.150.161", "status": "disconnected", "Manufacturer": "Company A", "NetLinkType": "Type 1", "IP": "10.70.150.161", "Port": 8080, "SendResponseYN": "Y" },
      { "name": "AGS-10.70.150.162", "status": "disconnected", "Manufacturer": "Company B", "NetLinkType": "Type 2", "IP": "10.70.150.162", "Port": 8081, "SendResponseYN": "N" },
      { "name": "AGS-127.0.0.1", "status": "connected", "Manufacturer": "Company C", "NetLinkType": "Type 3", "IP": "127.0.0.1", "Port": 8082, "SendResponseYN": "Y" }
    ]
  });

  const [pmisOpen, setPmisOpen] = useState(true);
  const [open, setOpen] = useState({});
  const [selectedAGS, setSelectedAGS] = useState(null);
  const [cardOpen, setCardOpen] = useState(true);

  const handleCardToggle = () => {
    setCardOpen((prev) => !prev);
  };

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
    <Box sx={{ p: 0,  }} >
      <Card {...other} sx={{ height: 'auto' }}>
        <CardHeader 
          title={title} 
          subheader={subheader} 
          action={
            <IconButton onClick={handleCardToggle}>
              {cardOpen ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          }
        />
        <Collapse in={cardOpen} timeout="auto" unmountOnExit>
          <Box sx={{ p: 2, height: 'auto' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Container>
                  <List component="nav">
                    <ListItem button onClick={handlePmisClick} sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                      <ListItemText primary="PMIS" />
                      {pmisOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={pmisOpen} timeout="auto" unmountOnExit>
                      {serverData.PMIS.map((ags, index) => (
                        <Box key={index} ml={4}>
                          <ListItem button onClick={() => handleClick(ags)} sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                            <Box display="flex" alignItems="center">
                              {ags.status === 'connected' ? <Link color="primary" sx={{ mr: 1 }} /> : <LinkOff color="error" sx={{ mr: 1 }} />}
                              <Typography component="span">
                                {ags.name}
                              </Typography>
                            </Box>
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
                      <Typography variant="h6" gutterBottom>
                        Edit {selectedAGS.name}
                      </Typography>
                      <Box display="flex" alignItems="center" mb={1}>
                        <TextField
                          label="Status"
                          value={selectedAGS.status}
                          fullWidth
                          margin="dense"
                          disabled
                          sx={{ fontSize: '0.875rem' }}
                        />
                        <Button
                          variant="contained"
                          color={selectedAGS.status === 'connected' ? 'error' : 'success'}
                          sx={{ mt: 1, ml: 2, height: '36px', fontSize: '0.75rem' }}
                          onClick={toggleConnectionStatus}
                        >
                          {selectedAGS.status === 'connected' ? '해제' : '연결'}
                        </Button>
                      </Box>
                      <FormControl fullWidth margin="dense">
                        <InputLabel>Manufacturer</InputLabel>
                        <Select
                          value={selectedAGS.Manufacturer}
                          onChange={(e) => handleChange('Manufacturer', e.target.value)}
                          sx={{ fontSize: '0.875rem' }}
                        >
                          <MenuItem value="Company A">Company A</MenuItem>
                          <MenuItem value="Company B">Company B</MenuItem>
                          <MenuItem value="Company C">Company C</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth margin="dense">
                        <InputLabel>NetLinkType</InputLabel>
                        <Select
                          value={selectedAGS.NetLinkType}
                          onChange={(e) => handleChange('NetLinkType', e.target.value)}
                          sx={{ fontSize: '0.875rem' }}
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
                        margin="dense"
                        onChange={(e) => handleChange('IP', e.target.value)}
                        sx={{ fontSize: '0.875rem' }}
                      />
                      <TextField
                        label="Port"
                        value={selectedAGS.Port}
                        fullWidth
                        margin="dense"
                        onChange={(e) => handleChange('Port', e.target.value)}
                        sx={{ fontSize: '0.875rem' }}
                      />
                      <FormControl fullWidth margin="dense">
                        <Box sx={{ mt: 1 }}>
                          <Typography component="legend" sx={{ fontSize: '0.875rem' }}>SendResponseYN</Typography>
                          <Box sx={{ border: '1px solid #ced4da', borderRadius: 1, padding: 1 }}>
                            <RadioGroup
                              row
                              value={selectedAGS.SendResponseYN}
                              onChange={(e) => handleChange('SendResponseYN', e.target.value)}
                              sx={{ fontSize: '0.875rem' }}
                            >
                              <FormControlLabel value="Y" control={<Radio />} label="예" />
                              <FormControlLabel value="N" control={<Radio />} label="아니오" />
                            </RadioGroup>
                          </Box>
                        </Box>
                      </FormControl>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, fontSize: '0.875rem', height: '36px' }}
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
        </Collapse>
      </Card>
    </Box>
  );
}

AppCentralMonitor.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};
