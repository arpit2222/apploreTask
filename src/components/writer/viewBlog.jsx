import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(56, 56, 56, 0.8);',
};

export default function ViewBlog({singleBlog}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
  return (
    <div>
      <p onClick={handleOpen}><RemoveRedEyeIcon /></p>
      <Modal
        open={open} 
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='over'
      >
        <Box style={style} 
          className='bg-orange-100 bg-opacity-100 rounded-xl px-10 py-6 border-white border-[1px] w-[100%] md:w-[50%] '
        >
          <div style={{ overflowY: 'auto', maxHeight: '80vh' }}>
            <p className='text-xl text-red-900 font-semibold'>Title - <span className="text-black">{singleBlog.title}</span></p>
            <p className='text-xl text-red-900 font-semibold'>Sections</p>
            {
              singleBlog.sections.map((section,index)=>(
                <p key={index} className='text-xl text-red-900 font-semibold'>{section.subtitle} - <span className="text-black">{section.data}</span></p>

              ))
            }
          </div>
        </Box>
      </Modal>
    </div>
  );
}
