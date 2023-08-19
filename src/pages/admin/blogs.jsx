import * as React from "react";
import Box from "@mui/material/Box";
import ResponsiveDrawer from "@/components/admin/ResponsiveSidebar";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VerifiedIcon from '@mui/icons-material/Verified';

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));



function main(props) {

  const [userInfo,setUserInfo] = useState('')
    const [blogs,setBlogs] = useState([])
    const router = useRouter();

    useEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem('apploreUser'));
        if(!storedUser){
            router.push('/login');
          }else if(storedUser.role=="writer"){
            router.push('/writer/blogs')
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
                const response = await axios.get(`http://localhost:8000/api/user/all-blogs`); 
                setBlogs(response.data)
                console.log(response.data)
              } catch (error) {
                throw error;
              }
          }
          fetchBlogs();
    },[])

    async function deactivate(blogId){
      const status=false;
      axios.defaults.headers.common = {
        'Content-Type': 'application/json',
        'Authorization': userInfo?.token,
        'user_id': userInfo?.id,
        'token':userInfo?.token
      };    
      
      try {
          const response = await axios.patch(`http://localhost:8000/api/user/change-blog-status/${blogId}`,{status}); 
          console.log(response.data)
        } catch (error) {
          throw error;
        }
        router.reload();
    }

    async function activate(blogId){
      const status=true;
      axios.defaults.headers.common = {
        'Content-Type': 'application/json',
        'Authorization': userInfo?.token,
        'user_id': userInfo?.id,
        'token':userInfo?.token
      };    
      
      try {
          const response = await axios.patch(`http://localhost:8000/api/user/change-blog-status/${blogId}`,{status}); 
          console.log(response.data)
        } catch (error) {
          throw error;
        }
        router.reload();
    }

  return (
    <main className="bg-gray-300 min-h-screen">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
          <ResponsiveDrawer />
          </Grid>

          {/* order and category */}
          <Grid item xs={12} lg={10}>
            <Box className="pt-2 md:pt-8 pl-2 md:pl-10 md pb-4">
              <Box>
                <div role="presentation" onClick={handleClick}>
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                      Admin
                    </Link>
                    <Typography color="text.primary">Blogs</Typography>
                  </Breadcrumbs>
                </div>
              </Box>
            </Box> 
            <Box>
              <hr className="border-[1px] border-black mx-4 mt-6" />
              <Box className="p-2 sm:p-8">
                <Box className="flex justify-between mb-4">
                  <p className="text-[30px] font-semibold mb-2">
                    All Blogs (Active)
                  </p>
                </Box>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          Title
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Date
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Comments
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Preview
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Inactive
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        blogs.map((singleBlog,index)=>(
                          singleBlog.status?
                          <StyledTableRow key={index}>
                            <StyledTableCell
                              component="th"
                              scope="row"
                              className="cursor-pointer px-8"
                            >
                              {singleBlog.title}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {singleBlog.createdAt}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {singleBlog.comments.length}
                            </StyledTableCell>
                            <StyledTableCell align="right" className='text-center cursor-pointer'>
                            <RemoveRedEyeIcon />
                            </StyledTableCell>
                            <StyledTableCell align="right" className='text-center text-red-500 text-lg cursor-pointer'>
                            <DeleteForeverIcon onClick={()=>deactivate(singleBlog._id)} />
                            </StyledTableCell>
                          </StyledTableRow>:""
                        ))
                      }
                         
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>


              <hr className="border-[1px] border-black mx-4 mt-6" />
              <Box className="p-2 sm:p-8">
                <Box className="flex justify-between mb-4">
                  <p className="text-[30px] font-semibold mb-2">
                    All Blogs (InActive)
                  </p>
                </Box>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          Title
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Date
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Comments
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Preview
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Activate
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        blogs.map((singleBlog,index)=>(
                          !singleBlog.status?
                          <StyledTableRow key={index}>
                            <StyledTableCell
                              component="th"
                              scope="row"
                              className="cursor-pointer px-8"
                            >
                              {singleBlog.title}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {singleBlog.createdAt}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {singleBlog.comments.length}
                            </StyledTableCell>
                            <StyledTableCell align="right" className='text-center cursor-pointer'>
                            <RemoveRedEyeIcon />
                            </StyledTableCell>
                            <StyledTableCell align="right" className='text-center text-green-500 text-lg cursor-pointer'>
                            <VerifiedIcon onClick={()=>activate(singleBlog._id)}/>
                            </StyledTableCell>
                          </StyledTableRow>:""
                        ))
                      }
                         
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}

export default main;
