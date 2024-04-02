import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';





function FloatingActionModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 모달 스타일
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      {/* 동그라미 모양의 버튼 */}
      <Fab color="primary" aria-label="add" onClick={handleOpen} style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <AddIcon />
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
            Modal Title
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your content goes here.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default FloatingActionModal;
