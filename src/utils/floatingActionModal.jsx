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

import { useStatus } from './Context API/StatusContext';

function FloatingActionModal() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { 
    setSelectedPatNo,
  } = useStatus()

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
    setSelectedPatNo(patientId);
    handleClose()
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
    { id: '001', age: 30, gender: 'Male', weight: 70 },
    { id: '002', age: 25, gender: 'Female', weight: 55 },
    { id: '003', age: 30, gender: 'Male', weight: 70 },
    { id: '004', age: 25, gender: 'Female', weight: 55 },
    { id: '005', age: 30, gender: 'Male', weight: 70 },
    { id: '006', age: 25, gender: 'Female', weight: 55 },
    { id: '007', age: 30, gender: 'Male', weight: 70 },
    { id: '008', age: 25, gender: 'Female', weight: 55 },
    { id: '009', age: 30, gender: 'Male', weight: 70 },
    { id: '010', age: 25, gender: 'Female', weight: 55 },
    { id: '011', age: 30, gender: 'Male', weight: 70 },
    { id: '012', age: 25, gender: 'Female', weight: 55 },
    { id: '013', age: 30, gender: 'Male', weight: 70 },
    { id: '014', age: 25, gender: 'Female', weight: 55 },
    { id: '015', age: 30, gender: 'Male', weight: 70 },
    { id: '016', age: 25, gender: 'Female', weight: 55 },
    { id: '017', age: 30, gender: 'Male', weight: 70 },
    { id: '018', age: 25, gender: 'Female', weight: 55 },
    { id: '019', age: 30, gender: 'Male', weight: 70 },
    { id: '020', age: 25, gender: 'Female', weight: 55 },
    { id: '021', age: 30, gender: 'Male', weight: 70 },
    { id: '022', age: 25, gender: 'Female', weight: 55 },
    { id: '023', age: 30, gender: 'Male', weight: 70 },
    { id: '024', age: 25, gender: 'Female', weight: 55 },
    { id: '025', age: 30, gender: 'Male', weight: 70 },
    { id: '026', age: 25, gender: 'Female', weight: 55 },
    { id: '027', age: 30, gender: 'Male', weight: 70 },
    { id: '028', age: 25, gender: 'Female', weight: 55 },
    { id: '029', age: 30, gender: 'Male', weight: 70 },
    { id: '030', age: 25, gender: 'Female', weight: 55 },
    { id: '031', age: 30, gender: 'Male', weight: 70 },
    { id: '032', age: 25, gender: 'Female', weight: 55 },
    { id: '033', age: 30, gender: 'Male', weight: 70 },
    { id: '034', age: 25, gender: 'Female', weight: 55 },
    { id: '035', age: 30, gender: 'Male', weight: 70 },
    { id: '036', age: 25, gender: 'Female', weight: 55 },
    { id: '037', age: 30, gender: 'Male', weight: 70 },
    { id: '038', age: 25, gender: 'Female', weight: 55 },
    { id: '039', age: 30, gender: 'Male', weight: 70 },
    { id: '040', age: 25, gender: 'Female', weight: 55 },
    { id: '051', age: 30, gender: 'Male', weight: 70 },
    { id: '052', age: 25, gender: 'Female', weight: 55 },
    { id: '053', age: 30, gender: 'Male', weight: 70 },
    { id: '054', age: 25, gender: 'Female', weight: 55 },
    { id: '055', age: 30, gender: 'Male', weight: 70 },
    { id: '056', age: 25, gender: 'Female', weight: 55 },
    { id: '057', age: 30, gender: 'Male', weight: 70 },
    { id: '058', age: 25, gender: 'Female', weight: 55 },
    { id: '059', age: 30, gender: 'Male', weight: 70 },
    { id: '050', age: 25, gender: 'Female', weight: 55 },
    { id: '061', age: 30, gender: 'Male', weight: 70 },
    { id: '062', age: 25, gender: 'Female', weight: 55 },
    { id: '063', age: 30, gender: 'Male', weight: 70 },
    { id: '064', age: 25, gender: 'Female', weight: 55 },
    { id: '065', age: 30, gender: 'Male', weight: 70 },
    { id: '066', age: 25, gender: 'Female', weight: 55 },
    { id: '067', age: 30, gender: 'Male', weight: 70 },
    { id: '068', age: 25, gender: 'Female', weight: 55 },
    { id: '069', age: 30, gender: 'Male', weight: 70 },
    { id: '070', age: 25, gender: 'Female', weight: 55 },
    { id: '071', age: 30, gender: 'Male', weight: 70 },
    { id: '072', age: 25, gender: 'Female', weight: 55 },
    { id: '073', age: 30, gender: 'Male', weight: 70 },
    { id: '074', age: 25, gender: 'Female', weight: 55 },
    { id: '075', age: 30, gender: 'Male', weight: 70 },
    { id: '076', age: 25, gender: 'Female', weight: 55 },
    { id: '077', age: 30, gender: 'Male', weight: 70 },
    { id: '078', age: 25, gender: 'Female', weight: 55 },
    { id: '079', age: 30, gender: 'Male', weight: 70 },
    { id: '080', age: 25, gender: 'Female', weight: 55 },
    { id: '081', age: 30, gender: 'Male', weight: 70 },
    { id: '082', age: 25, gender: 'Female', weight: 55 },
    { id: '083', age: 30, gender: 'Male', weight: 70 },
    { id: '084', age: 25, gender: 'Female', weight: 55 },
    { id: '085', age: 30, gender: 'Male', weight: 70 },
    { id: '086', age: 25, gender: 'Female', weight: 55 },
    { id: '087', age: 30, gender: 'Male', weight: 70 },
    { id: '088', age: 25, gender: 'Female', weight: 55 },
    { id: '089', age: 30, gender: 'Male', weight: 70 },
    { id: '090', age: 25, gender: 'Female', weight: 55 },
    { id: '091', age: 30, gender: 'Male', weight: 70 },
    { id: '092', age: 25, gender: 'Female', weight: 55 },
    { id: '093', age: 30, gender: 'Male', weight: 70 },
    { id: '094', age: 25, gender: 'Female', weight: 55 },
    { id: '095', age: 30, gender: 'Male', weight: 70 },
    { id: '096', age: 25, gender: 'Female', weight: 55 },
    { id: '097', age: 30, gender: 'Male', weight: 70 },
    { id: '098', age: 25, gender: 'Female', weight: 55 },
    { id: '099', age: 30, gender: 'Male', weight: 70 },
    { id: '100', age: 25, gender: 'Female', weight: 55 },
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
