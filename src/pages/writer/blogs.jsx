// pages/index.js
import Navbar from '@/components/navbar';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TableChartIcon from '@mui/icons-material/TableChart';
import { orange } from '@mui/material/colors';
import GridOnIcon from '@mui/icons-material/GridOn';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBlog from '@/components/writer/addBlog';
import { useRouter } from 'next/router';
import axios from 'axios';
import ViewBlog from '@/components/writer/viewBlog';



function BlogPage() {
    const [view,setView] = useState(true)
    const [userInfo,setUserInfo] = useState('')
    const [blogs,setBlogs] = useState([])
    const router = useRouter();

    useEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem('apploreUser'));
        if(!storedUser){
            router.push('/login');
          }
          console.log(storedUser)
        setUserInfo(storedUser);
          axios.defaults.headers.common = {
            'Content-Type': 'application/json',
            'Authorization': storedUser.token,
            'user_id': storedUser.id,
            'token':storedUser.token
          };

          async function fetchBlogs(){
            try {
                const response = await axios.get(`http://localhost:8000/api/user/user-blogs/${storedUser.id}`); 
                setBlogs(response.data)
                console.log(response.data)
              } catch (error) {
                throw error;
              }
          }
          fetchBlogs();
    },[])

    const iconStyle = {
        color: orange[500], // Use the orange color shade
      };

  return (
    <div className='bg-orange-200 h-[100vh]'>
      <Navbar />

      <div className='w-[90vw] lg:w-[75vw] m-auto pt-10'>

        <div className="mt-16 mx-4 md:mx-8 lg:mx-16">

        <div className='flex justify-between text-lg'>

            <div className='flex'>
                <p>Writer /</p>
                <p className='text-orange-600 ml-2'> Blogs</p>
            </div>
            <div>
            <Button variant="text" style={iconStyle} onClick={()=>setView(false)}>
                <GridOnIcon />
            </Button>
            <Button variant="text" style={iconStyle} onClick={()=>setView(true)}>
                <TableChartIcon />
            </Button>
            </div>
        </div>

        <div className='flex justify-between'>
        <h2 className="text-2xl my-4">Blog Preview</h2>
        <AddBlog />
        </div>

        {
            view?
        <div>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow >
                    <TableCell className='text-lg text-center'>Title</TableCell>
                    <TableCell className='text-lg text-center'>Date</TableCell>
                    <TableCell className='text-lg text-center'>Comments</TableCell>
                    <TableCell className='text-lg text-center'>Preview</TableCell>
                    <TableCell className='text-lg text-center'>Delete</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {blogs.map((singleBlogs,index) => (
                    <TableRow key={index}>
                    <TableCell>{singleBlogs.title}</TableCell>
                    <TableCell>{singleBlogs.createdAt}</TableCell>
                    <TableCell>{singleBlogs.comments.length}</TableCell>
                    <TableCell className='text-center cursor-pointer'><ViewBlog singleBlog={singleBlogs}/></TableCell>
                    <TableCell className='text-center text-red-500 text-lg cursor-pointer'><DeleteForeverIcon /></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>:

        <div>
        <Grid container spacing={3}>
        {blog.map((post) => (
            <Grid item key={post.title} xs={12} md={6} lg={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="subtitle2">{post.date}</Typography>
            </Paper>
            </Grid>
        ))}
        </Grid>
        </div>
        }

        </div>
      </div>
    </div>
  );
}

export default BlogPage;
