import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';

function FloatingActionModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    height: '60vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };





  const patientInfo = [
    { id: 'P001', age: 30, gender: 'Male', weight: 70 },
    { id: 'P002', age: 25, gender: 'Female', weight: 55 },
    { id: 'P003', age: 30, gender: 'Male', weight: 70 },
    { id: 'P004', age: 25, gender: 'Female', weight: 55 },
    { id: 'P005', age: 30, gender: 'Male', weight: 70 },
    { id: 'P006', age: 25, gender: 'Female', weight: 55 },
    { id: 'P007', age: 30, gender: 'Male', weight: 70 },
    { id: 'P008', age: 25, gender: 'Female', weight: 55 },
    { id: 'P009', age: 30, gender: 'Male', weight: 70 },
    { id: 'P0010', age: 25, gender: 'Female', weight: 55 },
    { id: 'P0011', age: 30, gender: 'Male', weight: 70 },
    { id: 'P0012', age: 25, gender: 'Female', weight: 55 },
    { id: 'P0013', age: 30, gender: 'Male', weight: 70 },
    { id: 'P0014', age: 25, gender: 'Female', weight: 55 },

    // 추가 환자 정보...
  ];

  return (
    <div>
      {/* 수정된 플로팅 액션 버튼 */}
      <Fab
        color="primary"
        aria-label="search"
        onClick={handleOpen}
        sx={{
          opacity: 0.6, // 기본 투명도 설정
          position: 'fixed',
          bottom: '4vh',
          right: '5vh',
          display: 'flex',
          flexDirection: 'column', // 요소들을 세로로 정렬
          alignItems: 'center',
          height: '80px', // 버튼의 크기 조정
          width: '80px', // 버튼의 너비 조정
          fontSize: '2.3rem', // 아이콘 크기 조정
          '&:hover, &:active': {
            opacity: 1, // 마우스 오버 또는 클릭 시 투명도 100%
          },
        }}
      >
        <SearchIcon /> {/* 'sx' prop에서 스타일을 지정하였기 때문에 별도의 style 제거 */}
        {/* '환자 선택' 문구 추가 */}
        <Typography variant="caption" sx={{ marginTop: '4px' }}>
          환자 선택
        </Typography>
      </Fab>

      {/* 클릭 시 나타날 모달 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            환자 리스트
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            조회할 환자를 선택해주세요.
          </Typography>
          <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>환자번호</TableCell>
              <TableCell>나이</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>몸무게</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientInfo.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
          
        </Box>
      </Modal>
    </div>
  );
}

export default FloatingActionModal;
