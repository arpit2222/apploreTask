import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(56, 56, 56, 0.8);',
};

export default function ViewProfile() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userInfo,setUserInfo] = useState('')


    useEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem('apploreUser'));
        setUserInfo(storedUser);
    },[])


 
  return (
    <div>
      <p className='cursor-pointer' onClick={handleOpen}>Profile</p>
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
          <p className='text-xl text-red-900 font-semibold'>Email - <span className="text-black">{userInfo.email}</span></p>
          <p className='text-xl text-red-900 font-semibold'>Id - <span className="text-black">{userInfo.id}</span></p>
          <p className='text-xl text-red-900 font-semibold'>Pen Name - <span className="text-black">{userInfo.pen_name}</span></p>
          <p className='text-xl text-red-900 font-semibold'>role - <span className="text-black">{userInfo.role}</span></p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
