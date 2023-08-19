import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState } from "react";
import UserInfoCard from "@/components/admin/UserInfoCard";
import { useEffect } from "react";
import axios from "axios";
import ResponsiveDrawer from "@/components/admin/ResponsiveSidebar";
import { useRouter } from "next/router";
import AddWriter from "@/components/admin/WriterAdd";


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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const rows = [
    {
        Post:"Manager",
        Name:"Manger1",
        TotalOrders:"5",
        Status:"Active",
        Description:"can manage all order, raw material and etc",
        ClientsAdded:"3"
      },
      {
        Post:"Supervisor",
        Name:"9ice Surevisior",
        TotalOrders:"5",
        Status:"Active",
        Description:"can update order status",
        ClientsAdded:"3"
      },
      {
        Post:"Supervisor",
        Name:"Smokizz Surevisior",
        TotalOrders:"5",
        Status:"Inactive",
        Description:"can update order status",
        ClientsAdded:"0"
      },
      {
        Post:"Inventory Manager",
        Name:"Inventory Manager1",
        TotalOrders:"5",
        Status:"Inactive",
        Description:"can manage inventory",
        ClientsAdded:"0"
      },
      {
        Post:"Inventory Manager",
        Name:"Inventory Manager2",
        TotalOrders:"5",
        Status:"Active",
        Description:"can manage inventory",
        ClientsAdded:"0"
      },
      {
        Post:"Inventory Manager",
        Name:"Inventory Manager3",
        TotalOrders:"5",
        Status:"Active",
        Description:"can manage inventory",
        ClientsAdded:"0"
      }

];


function main(props) {

  const [users, setUsers] = useState([]);
  const [userInfo,setUserInfo] = useState('')
  const router = useRouter();


  useEffect(() => {
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

    const fetchWriters = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/getAllUsers`);
        setUsers(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

     fetchWriters();
  }, []);


  
  return (
    <main className="bg-gray-300 min-h-screen">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* sidebar */}
          <Grid item xs={2}>
            <ResponsiveDrawer /> 
          </Grid>

          {/* Inventory and category */}
          <Grid item xs={12} lg={10} className="mb-8">

            <Box className="pt-2 md:pt-8 pl-2 md:pl-10 md pb-4">
              <Box>
                <div role="presentation" onClick={handleClick}>
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                      Admin
                    </Link>
                    <Typography color="text.primary">
                     Users
                    </Typography>
                  </Breadcrumbs>
                </div>
              </Box>
            </Box>

            <Box>
              <div className="flex justify-between pr-[20%]">
              <p className="text-[30px] gray-700">Active Users</p>
                <AddWriter />
              </div>
                
                <Grid container spacing={2} className="mt-2 px-20">
                      {
                        users.map((user,index)=>(
                        user.status=="active"?
                        <Grid item xs={4}>
                          <UserInfoCard singleUser={user} index={index} />
                    </Grid>:null
                        ))
                      }
                      
                </Grid>
            </Box>

            <hr className="border-[1px] border-gray-500 mx-4 mt-12"/>

            <Box className="mt-8">
                <p className="text-[30px] gray-700">Inactive Users</p>
                <Grid container spacing={2} className="mt-2 px-20">
                {
                        users.map((user,index)=>(
                        user.status=="inactive"?
                        <Grid item xs={4}>
                          <UserInfoCard singleUser={user} index={index} />
                    </Grid>:null
                        ))
                      }
                </Grid>
            </Box>

          </Grid>
        </Grid>
      </Box>
    </main>
  );
}

export default main;
