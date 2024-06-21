import { useState } from 'react';
import PropTypes from 'prop-types';

import { ExpandMore, ExpandLess } from '@mui/icons-material';
import {
  Box,
  Card,
  Table,
  Paper,
  TableRow,
  Collapse,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  IconButton,
  TableContainer,
} from '@mui/material';

// ----------------------------------------------------------------------

export default function AppCentralMonitorData({ title, subheader, ...other }) {
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const labData = {
    "LabData": [
      {
        "Index": 1,
        "Date": "2024-06-20",
        "Time": "10:00:00",
        "Item": "HR",
        "Code": "HR01",
        "Value": 72
      },
      {
        "Index": 2,
        "Date": "2024-06-20",
        "Time": "10:01:00",
        "Item": "SPO2",
        "Code": "SP01",
        "Value": 98
      },
      {
        "Index": 3,
        "Date": "2024-06-20",
        "Time": "10:02:00",
        "Item": "HR",
        "Code": "HR02",
        "Value": 75
      },
      {
        "Index": 4,
        "Date": "2024-06-20",
        "Time": "10:03:00",
        "Item": "SPO2",
        "Code": "SP02",
        "Value": 97
      },
      {
        "Index": 5,
        "Date": "2024-06-20",
        "Time": "10:04:00",
        "Item": "HR",
        "Code": "HR03",
        "Value": 70
      }
    ]
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

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ p: 3, pb: 1 }}>
          <TableContainer component={Paper} sx={{ maxHeight: 400, whiteSpace: 'nowrap' }} >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Index</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {labData.LabData.map((row) => (
                  <TableRow key={row.Index}>
                    <TableCell>{row.Index}</TableCell>
                    <TableCell>{row.Date}</TableCell>
                    <TableCell>{row.Time}</TableCell>
                    <TableCell>{row.Item}</TableCell>
                    <TableCell>{row.Code}</TableCell>
                    <TableCell>{row.Value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Collapse>
    </Card>
  );
}

AppCentralMonitorData.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};
