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
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';

function FloatingActionModal() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // 페이지 크기가 변경될 때 첫 페이지로 돌아갑니다.
  };
  const handleRowClick = (patientId) => {
    console.log('Selected patient ID:', patientId);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    minWidth: '60vw',
    height: 'auto',
    // minHeight:'40vh',
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
    { id: 'P010', age: 25, gender: 'Female', weight: 55 },
    { id: 'P011', age: 30, gender: 'Male', weight: 70 },
    { id: 'P012', age: 25, gender: 'Female', weight: 55 },
    { id: 'P013', age: 30, gender: 'Male', weight: 70 },
    { id: 'P014', age: 25, gender: 'Female', weight: 55 },
    { id: 'P015', age: 30, gender: 'Male', weight: 70 },
    { id: 'P016', age: 25, gender: 'Female', weight: 55 },
    { id: 'P017', age: 30, gender: 'Male', weight: 70 },
    { id: 'P018', age: 25, gender: 'Female', weight: 55 },
    { id: 'P019', age: 30, gender: 'Male', weight: 70 },
    { id: 'P020', age: 25, gender: 'Female', weight: 55 },
    { id: 'P021', age: 30, gender: 'Male', weight: 70 },
    { id: 'P022', age: 25, gender: 'Female', weight: 55 },
    { id: 'P023', age: 30, gender: 'Male', weight: 70 },
    { id: 'P024', age: 25, gender: 'Female', weight: 55 },
    { id: 'P025', age: 30, gender: 'Male', weight: 70 },
    { id: 'P026', age: 25, gender: 'Female', weight: 55 },
    { id: 'P027', age: 30, gender: 'Male', weight: 70 },
    { id: 'P028', age: 25, gender: 'Female', weight: 55 },
    { id: 'P029', age: 30, gender: 'Male', weight: 70 },
    { id: 'P030', age: 25, gender: 'Female', weight: 55 },
    { id: 'P031', age: 30, gender: 'Male', weight: 70 },
    { id: 'P032', age: 25, gender: 'Female', weight: 55 },
    { id: 'P033', age: 30, gender: 'Male', weight: 70 },
    { id: 'P034', age: 25, gender: 'Female', weight: 55 },
    { id: 'P035', age: 30, gender: 'Male', weight: 70 },
    { id: 'P036', age: 25, gender: 'Female', weight: 55 },
    { id: 'P037', age: 30, gender: 'Male', weight: 70 },
    { id: 'P038', age: 25, gender: 'Female', weight: 55 },
    { id: 'P039', age: 30, gender: 'Male', weight: 70 },
    { id: 'P040', age: 25, gender: 'Female', weight: 55 },
    { id: 'P051', age: 30, gender: 'Male', weight: 70 },
    { id: 'P052', age: 25, gender: 'Female', weight: 55 },
    { id: 'P053', age: 30, gender: 'Male', weight: 70 },
    { id: 'P054', age: 25, gender: 'Female', weight: 55 },
    { id: 'P055', age: 30, gender: 'Male', weight: 70 },
    { id: 'P056', age: 25, gender: 'Female', weight: 55 },
    { id: 'P057', age: 30, gender: 'Male', weight: 70 },
    { id: 'P058', age: 25, gender: 'Female', weight: 55 },
    { id: 'P059', age: 30, gender: 'Male', weight: 70 },
    { id: 'P050', age: 25, gender: 'Female', weight: 55 },
    { id: 'P061', age: 30, gender: 'Male', weight: 70 },
    { id: 'P062', age: 25, gender: 'Female', weight: 55 },
    { id: 'P063', age: 30, gender: 'Male', weight: 70 },
    { id: 'P064', age: 25, gender: 'Female', weight: 55 },
    { id: 'P065', age: 30, gender: 'Male', weight: 70 },
    { id: 'P066', age: 25, gender: 'Female', weight: 55 },
    { id: 'P067', age: 30, gender: 'Male', weight: 70 },
    { id: 'P068', age: 25, gender: 'Female', weight: 55 },
    { id: 'P069', age: 30, gender: 'Male', weight: 70 },
    { id: 'P070', age: 25, gender: 'Female', weight: 55 },
    { id: 'P071', age: 30, gender: 'Male', weight: 70 },
    { id: 'P072', age: 25, gender: 'Female', weight: 55 },
    { id: 'P073', age: 30, gender: 'Male', weight: 70 },
    { id: 'P074', age: 25, gender: 'Female', weight: 55 },
    { id: 'P075', age: 30, gender: 'Male', weight: 70 },
    { id: 'P076', age: 25, gender: 'Female', weight: 55 },
    { id: 'P077', age: 30, gender: 'Male', weight: 70 },
    { id: 'P078', age: 25, gender: 'Female', weight: 55 },
    { id: 'P079', age: 30, gender: 'Male', weight: 70 },
    { id: 'P080', age: 25, gender: 'Female', weight: 55 },
    { id: 'P081', age: 30, gender: 'Male', weight: 70 },
    { id: 'P082', age: 25, gender: 'Female', weight: 55 },
    { id: 'P083', age: 30, gender: 'Male', weight: 70 },
    { id: 'P084', age: 25, gender: 'Female', weight: 55 },
    { id: 'P085', age: 30, gender: 'Male', weight: 70 },
    { id: 'P086', age: 25, gender: 'Female', weight: 55 },
    { id: 'P087', age: 30, gender: 'Male', weight: 70 },
    { id: 'P088', age: 25, gender: 'Female', weight: 55 },
    { id: 'P089', age: 30, gender: 'Male', weight: 70 },
    { id: 'P090', age: 25, gender: 'Female', weight: 55 },
    { id: 'P091', age: 30, gender: 'Male', weight: 70 },
    { id: 'P092', age: 25, gender: 'Female', weight: 55 },
    { id: 'P093', age: 30, gender: 'Male', weight: 70 },
    { id: 'P094', age: 25, gender: 'Female', weight: 55 },
    { id: 'P095', age: 30, gender: 'Male', weight: 70 },
    { id: 'P096', age: 25, gender: 'Female', weight: 55 },
    { id: 'P097', age: 30, gender: 'Male', weight: 70 },
    { id: 'P098', age: 25, gender: 'Female', weight: 55 },
    { id: 'P099', age: 30, gender: 'Male', weight: 70 },
    { id: 'P100', age: 25, gender: 'Female', weight: 55 },
    // 추가 자 정보...
  ];

  // 현재 페이지에 해당하는 행만 표시합니다.
  const displayedRows = patientInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <Fab color="primary" aria-label="search" onClick={handleOpen} sx={{
          opacity: 0.6,
          position: 'fixed',
          bottom: '4vh',
          right: '5vh',
          height: '80px',
          width: '80px',
          fontSize: '2.3rem',
          '&:hover, &:active': {
            opacity: 1,
          },
          '@media (max-width:600px)': {
            height: '60px',
            width: '60px'
          },
        }}>
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
          <Iconify icon="eva:search-fill" color="white" width={30} />
          <Typography variant="caption" sx={{ mt: 1,'@media (max-width:600px)': {
            mt:0, fontSize:'0.6rem'
          }, }}>
          환자 선택
        </Typography>
        </div>
        </Fab>
        

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">환자 리스트</Typography>
          <div style={{ maxHeight: '60vh', overflowY: 'auto' }}> {/* 여기에 스타일을 추가합니다. */}
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>환자번호</TableCell>
                  <TableCell>나이</TableCell>
                  <TableCell>성별</TableCell>
                  <TableCell>몸무게</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedRows.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    onClick={() => handleRowClick(row.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell component="th" scope="row">{row.id}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={patientInfo.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              '@media (max-width:600px)': {
                '& .MuiToolbar-root': {
                  flexWrap: 'wrap', // 내부 요소들을 감싸도록 설정
                  justifyContent: 'space-between',
                }
              },
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default FloatingActionModal;
