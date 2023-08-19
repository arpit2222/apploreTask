import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import { useRouter } from 'next/router';
import ViewProfile from './writer/viewProfile';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [userData,setUserData]= useState({})

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('apploreUser'));
    setUserData(storedUser);
      
},[])

  const handleLogout = () => {
    // Clear items from local storage
    localStorage.removeItem('apploreUser'); // Modify this according to your storage key

    // Redirect to a different page after logout
    router.push('/login'); // Replace with the desired redirect path
  };

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AppBar position="fixed" elevation={1} className="bg-orange-400">
      <Toolbar className="flex md:hidden justify-between">
        <IconButton color="inherit" onClick={toggleCollapse}>
          <MenuIcon />
        </IconButton>
       
          <Typography variant="h6" component="div">
          <ViewProfile />
        </Typography>
        
      </Toolbar>
      <Collapse in={isOpen} className="md:hidden">
        <Toolbar className="flex flex-col items-center">
        {
          userData.role=="admin"?
          <Typography variant="h6" component="div">
           <a href='/admin/blogs'>Admin Mode</a>
        </Typography>:
        <Typography variant="h6" component="div">
        <a href='/'>Home</a>
      </Typography>
        }
          <Typography variant="h6" component="div" onClick={handleLogout}>
            Logout
          </Typography>
          {/* Add more options here */}
        </Toolbar>
      </Collapse>
      <Toolbar className="hidden md:flex justify-between">
      {
          userData.role=="admin"?
          <Typography variant="h6" component="div">
           <a href='/admin/blogs'>Admin Mode</a>
        </Typography>:
        <Typography variant="h6" component="div">
        <a href='/'>Home</a>
      </Typography>
        }
        <div className='flex'>
        <Typography variant="h6" component="div" className='mr-4 cursor-pointer' onClick={handleLogout}>
          Logout
        </Typography>
        <Typography variant="h6" component="div">
          <ViewProfile />
        </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
