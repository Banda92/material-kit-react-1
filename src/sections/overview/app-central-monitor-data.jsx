import PropTypes from 'prop-types';

import {
  Box,
  Card,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  TableContainer,
} from '@mui/material';

// ----------------------------------------------------------------------

export default function AppCentralMonitorData({ title, subheader, ...other }) {
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
    <Card {...other} sx={{ height: '100%' }}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <TableContainer component={Paper}>
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
    </Card>
  );
}

AppCentralMonitorData.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};
