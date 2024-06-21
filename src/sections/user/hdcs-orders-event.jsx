import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { ExpandMore, ExpandLess } from '@mui/icons-material';
import {
  Box,
  Card,
  Grid,
  Table,
  Paper,
  Button,
  Select,
  Collapse,
  TableRow,
  MenuItem,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  IconButton,
  InputLabel,
  FormControl,
  TableContainer,
} from '@mui/material';

// ----------------------------------------------------------------------

const ordersData = {
  "orders": [
    {
      "orderID": "096105433",
      "patientName": "김철수",
      "executionDate": "2024-06-21 15:57:32",
      "orderOrigin": "병동1",
      "examName": "심전도검사 EKG",
      "examCode": "CCE65412",
      "interpretationNumber": "987654",
      "examDate": "2024-06-21",
      "examStatus": "진행중",
      "examSite": "ICU"
    },
    {
      "orderID": "096104654",
      "patientName": "박영희",
      "executionDate": "2024-06-21 15:56:11",
      "orderOrigin": "센터2",
      "examName": "심전도검사 EKG",
      "examCode": "CCE65412",
      "interpretationNumber": "123456",
      "examDate": "2024-06-21",
      "examStatus": "완료",
      "examSite": "2CU"
    }
    // 더 많은 데이터 추가
  ]
};

// ----------------------------------------------------------------------

export default function HdcsEventViewer({ title, subheader, ...other }) {
  const [expanded, setExpanded] = useState(true);
  const [examSite, setExamSite] = useState('');
  const [patientID, setPatientID] = useState('');
  const [patientName, setPatientName] = useState('');

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
      <Box sx={{ overflow: 'hidden', height: expanded ? 'auto' : 0, transition: 'height 0.3s' }}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ p: 3, pb: 1 }}>
            <Grid container spacing={2} alignItems="center" mb={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>검사실</InputLabel>
                  <Select
                    value={examSite}
                    onChange={(e) => setExamSite(e.target.value)}
                    label="검사실"
                  >
                    <MenuItem value="ICU">ICU</MenuItem>
                    <MenuItem value="2CU">2CU</MenuItem>
                    <MenuItem value="3CU">3CU</MenuItem>
                    {/* 추가 옵션 필요 시 추가 */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="환자 등록번호"
                  variant="outlined"
                  value={patientID}
                  onChange={(e) => setPatientID(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="환자 이름"
                  variant="outlined"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>검사 상태</InputLabel>
                  <Select
                    fullWidth
                    variant="outlined"
                    defaultValue=""
                  >
                    <MenuItem value="">검사 상태</MenuItem>
                    <MenuItem value="모두">모두</MenuItem>
                    <MenuItem value="진행중">진행중</MenuItem>
                    <MenuItem value="완료">완료</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth type="date" label="검사 일자" InputLabelProps={{ shrink: true }} />
              </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="flex-end" mb={2}>
              <Grid item xs={12} sm={12} pb={2}>
                <Button variant="contained" fullWidth>오더 조회</Button>
              </Grid>
            </Grid>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>등록번호</TableCell>
                    <TableCell>이름</TableCell>
                    <TableCell>실행일자</TableCell>
                    <TableCell>오더 발행처</TableCell>
                    <TableCell>검사이름</TableCell>
                    <TableCell>검사코드</TableCell>
                    <TableCell>판독번호</TableCell>
                    <TableCell>검사일자</TableCell>
                    <TableCell>검사상태</TableCell>
                    <TableCell>검사실</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ordersData.orders.map((order) => (
                    <TableRow key={order.orderID}>
                      <TableCell>{order.orderID}</TableCell>
                      <TableCell>{order.patientName}</TableCell>
                      <TableCell>{order.executionDate}</TableCell>
                      <TableCell>{order.orderOrigin}</TableCell>
                      <TableCell>{order.examName}</TableCell>
                      <TableCell>{order.examCode}</TableCell>
                      <TableCell>{order.interpretationNumber}</TableCell>
                      <TableCell>{order.examDate}</TableCell>
                      <TableCell>{order.examStatus}</TableCell>
                      <TableCell>{order.examSite}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                EMR 전송
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Card>
  );
}

HdcsEventViewer.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};
