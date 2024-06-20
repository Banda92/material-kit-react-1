import PropTypes from 'prop-types';
import { 
        useRef,
        useState,
        useEffect,
} from 'react';

import { Add, Edit, Delete, ExpandMore, ExpandLess } from '@mui/icons-material';
import {
  Box,
  Card,
  Grid,
  Table,
  Paper,
  Select,
  Button,
  TableRow,
  Collapse,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  CardHeader,
  InputLabel,
  IconButton,
  FormControl,
  TableContainer,
} from '@mui/material';







export default function AppCentralMonitorPatinfo({ title, subheader, ...other }) {
  const [selectedWard, setSelectedWard] = useState('All');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expanded, setExpanded] = useState(true);
  const tableContainerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const patData = {
    "PatData": [
      {
        "PatID": "P001",
        "Name": "John Doe",
        "Ward": "A",
        "Room": "101",
        "Bed": "1A",
        "ReportInterval": "15 minutes",
        "SendedToEMRTM": "2024-06-01 10:30:00"
      },
      {
        "PatID": "P002",
        "Name": "Jane Smith",
        "Ward": "B",
        "Room": "202",
        "Bed": "2B",
        "ReportInterval": "30 minutes",
        "SendedToEMRTM": "2024-06-01 11:00:00"
      },
      {
        "PatID": "P003",
        "Name": "Alice Johnson",
        "Ward": "C",
        "Room": "303",
        "Bed": "3C",
        "ReportInterval": "1 hour",
        "SendedToEMRTM": "2024-06-01 12:00:00"
      },
      {
        "PatID": "P004",
        "Name": "Bob Brown",
        "Ward": "A",
        "Room": "104",
        "Bed": "1D",
        "ReportInterval": "45 minutes",
        "SendedToEMRTM": "2024-06-01 09:45:00"
      },
      {
        "PatID": "P005",
        "Name": "Charlie Davis",
        "Ward": "B",
        "Room": "201",
        "Bed": "2A",
        "ReportInterval": "15 minutes",
        "SendedToEMRTM": "2024-06-01 10:15:00"
      }
    ]
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card {...other} sx={{ height: '100%' }}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <IconButton onClick={handleExpandClick}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ p: 3, pb: 1 }}>
          <Grid container spacing={2} alignItems="center" mb={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">임상관찰기록지 (병동)</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>병동 선택</InputLabel>
                <Select value={selectedWard} onChange={handleWardChange} label="병동 선택">
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="body1" textAlign="right">
                {currentTime.toISOString().slice(0, 19).replace('T', ' ')}
              </Typography>
            </Grid>
          </Grid>

          <TableContainer component={Paper} sx={{ maxHeight: expanded ? 250 : 0 }} ref={tableContainerRef}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>PatID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Ward</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Bed</TableCell>
                  <TableCell>Report Interval</TableCell>
                  <TableCell>Sended To EMR TM</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patData.PatData.filter(pat => selectedWard === 'All' || pat.Ward === selectedWard).map((pat) => (
                  <TableRow key={pat.PatID}>
                    <TableCell>{pat.PatID}</TableCell>
                    <TableCell>{pat.Name}</TableCell>
                    <TableCell>{pat.Ward}</TableCell>
                    <TableCell>{pat.Room}</TableCell>
                    <TableCell>{pat.Bed}</TableCell>
                    <TableCell>{pat.ReportInterval}</TableCell>
                    <TableCell>{pat.SendedToEMRTM}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" color="primary" startIcon={<Add />} sx={{ mr: 1 }}>
              추가
            </Button>
            <Button variant="contained" color="secondary" startIcon={<Edit />} sx={{ mr: 1 }}>
              수정
            </Button>
            <Button variant="contained" color="error" startIcon={<Delete />}>
              삭제
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Card>
  );
}

AppCentralMonitorPatinfo.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};
