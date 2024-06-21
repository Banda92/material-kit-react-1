import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { 
  Info, 
  Error, 
  Warning, 
  ExpandMore, 
  ExpandLess, 
} from '@mui/icons-material';
import {
  Box,
  Card,
  Chip,
  Stack,
  Table,
  Paper,
  Collapse,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  IconButton,
  TableContainer,
} from '@mui/material';

// JSON 데이터
const eventsData = {
  "events": [
    {
      "type": "경고",
      "date": "2024-06-21",
      "time": "10:00:00",
      "source": "MediumHDCS",
      "category": "A",
      "event": 0,
      "message": "오더를 조회합니다. (오더ID: 12345)"
    },
    {
      "type": "오류",
      "date": "2024-06-21",
      "time": "10:01:00",
      "source": "MediumHDCS",
      "category": "B",
      "event": 1,
      "message": "검사 리스트를 조회합니다."
    },
    {
      "type": "정보",
      "date": "2024-06-21",
      "time": "10:02:00",
      "source": "MediumHDCS",
      "category": "C",
      "event": 2,
      "message": "검사를 시작합니다. (검사ID: 67890)"
    },
    {
      "type": "정보",
      "date": "2024-06-21",
      "time": "10:03:00",
      "source": "MediumHDCS",
      "category": "D",
      "event": 3,
      "message": "검사를 종료합니다. (검사ID: 67890)"
    }
    // 추가 데이터 필요시 추가
  ]
};

// ----------------------------------------------------------------------

export default function HdcsEventViewer({ title, subheader, ...other }) {
  const [expanded, setExpanded] = useState(true);
  const [warningCount, setWarningCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [infoCount, setInfoCount] = useState(0);

  useEffect(() => {
    const warningEventsCount = eventsData.events.filter(event => event.type === '경고').length;
    const errorEventsCount = eventsData.events.filter(event => event.type === '오류').length;
    const infoEventsCount = eventsData.events.filter(event => event.type === '정보').length;

    setWarningCount(warningEventsCount);
    setErrorCount(errorEventsCount);
    setInfoCount(infoEventsCount);
  }, []);

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
      <Box sx={{ p: 3, pb: 0, pt:1 }}>
        <Stack direction="row" spacing={1} mb={0}>
          <Chip icon={<Warning />} label={`경고 ${warningCount}건`} color="warning" />
          <Chip icon={<Error />} label={`오류 ${errorCount}건`} color="error" />
          <Chip icon={<Info />} label={`정보 ${infoCount}건`} color="info" />
        </Stack>
      </Box>
      <Box sx={{ overflow: 'hidden', height: expanded ? 'auto' : 0, transition: 'height 0.3s' }}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ p: 3, pb: 1 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>종류</TableCell>
                    <TableCell>날짜</TableCell>
                    <TableCell>시간</TableCell>
                    <TableCell>원본</TableCell>
                    <TableCell>범주</TableCell>
                    <TableCell>이벤트</TableCell>
                    <TableCell>메시지</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {eventsData.events.map((event, index) => (
                    <TableRow key={index}>
                      <TableCell>{event.type}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.time}</TableCell>
                      <TableCell>{event.source}</TableCell>
                      <TableCell>{event.category}</TableCell>
                      <TableCell>{event.event}</TableCell>
                      <TableCell>{event.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
