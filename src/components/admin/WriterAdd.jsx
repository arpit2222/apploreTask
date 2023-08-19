import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AddWriter() {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [userInfo,setUserInfo]=React.useState({})


  React.useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('apploreUser'));
    setUserInfo(storedUser);
    
},[])

  const onSubmit = async (data) => {
    axios.defaults.headers.common = {
      'Content-Type': 'application/json',
      'Authorization': userInfo?.token,
      'user_id': userInfo?.id,
      'token':userInfo?.token
    };    
    
    try {
      const response = await axios.post(`http://localhost:8000/api/user/addUser`, data);
      console.log(response.data);
    } catch (error) {
      console.error('Error posting brand data:', error);
    }
    router.reload();
  };

  const handleChange = (event) => {
    setBrandIndex(event.target.value);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained"  className="bg-gray-700 text-white hover:bg-gray-500" startIcon={<AddIcon className="scale-[125%]" />} onClick={handleClickOpen}>
        Add Writer
        </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Typography gutterBottom>
            <p className='text-lg text-gray-700 font-semibold'>Add Writer</p>
          </Typography>
          <Box className="px-8 mt-4">
          <TextField fullWidth id="outlined-basic"  {...register('name', { required: true })} label=" Name" variant="outlined" className='my-4'/>
          <TextField fullWidth id="outlined-basic"  {...register('email', { required: true })} label="Email" type="email" variant="outlined" className='my-4'/>
          <TextField fullWidth id="outlined-basic"  {...register('bio', { required: true })} label="Bio" variant="outlined" className='my-4'/>
          <TextField fullWidth id="outlined-basic"  {...register('pen_name', { required: true })} label="Pen Name" variant="outlined" className='my-4'/>
          <TextField fullWidth id="outlined-basic"  {...register('password', { required: true })} label="Password" variant="outlined" className='my-4'/>
          </Box>
        </DialogContent>
        <DialogActions>
        <Button autoFocus type="submit" onClick={handleClose}>
            Save
          </Button>
          <Button onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}