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

import { getPatientInfoData } from '../../public/assets/Datas/AKFP_Datas';
import { useSelectedPatNo, useOpenPatListModal, } from '../hooks/useStatusHooks';

const FloatingActionModal = () => {
  // const [open, setOpen] = useState(false);
  const { openPatListModal, setOpenPatListModal } = useOpenPatListModal();
  const { setSelectedPatNo } = useSelectedPatNo();




  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleOpen = () => setOpenPatListModal(true);
  const handleClose = () => setOpenPatListModal(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // 페이지 크기가 변경될 때 첫 페이지로 돌아갑니다.
  };
  const handleRowClick = (patientId) => {
    setSelectedPatNo(`${patientId}`);
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

  const patInfo = getPatientInfoData()

  // 현재 페이지에 해당하는 행만 표시합니다.
  const displayedRows = patInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
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
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Iconify icon="eva:search-fill" color="white" width={30} />
          <Typography variant="caption" sx={{
            mt: 1, '@media (max-width:600px)': {
              mt: 0, fontSize: '0.6rem'
            },
          }}>
            환자 선택
          </Typography>
        </div>
      </Fab>


      <Modal open={openPatListModal} onClose={handleClose}>
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
                    key={row.pat_id}
                    hover
                    onClick={() => handleRowClick(row.pat_id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell component="th" scope="row">{row.pat_id}</TableCell>
                    <TableCell>{row.real_age}</TableCell>
                    <TableCell>{row.sex}</TableCell>
                    <TableCell>{row.patientweight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={patInfo.length}
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
