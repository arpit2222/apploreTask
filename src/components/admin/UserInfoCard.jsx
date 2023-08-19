import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useRouter } from "next/router";

export default function UserInfoCard({singleUser,index}) {
  const [userInfo,setUserInfo]=React.useState({})
  const router = useRouter();
  const imageArray=["../writerImage1.jpg","../writerImage2.jpg","../writerImage3.jpeg"]


  React.useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('apploreUser'));
    setUserInfo(storedUser);
    
},[])

  async function deactivate(blogId){
    
    const status="inactive";
    axios.defaults.headers.common = {
      'Content-Type': 'application/json',
      'Authorization': userInfo?.token,
      'user_id': userInfo?.id,
      'token':userInfo?.token
    };    
    
    try {
        const response = await axios.patch(`http://localhost:8000/api/user/update-status/${singleUser._id}`,{status}); 
        console.log(response.data)
      } catch (error) {
        throw error;
      }
      router.reload();
  }

  async function activate(blogId){
    
    const status="active";
    axios.defaults.headers.common = {
      'Content-Type': 'application/json',
      'Authorization': userInfo?.token,
      'user_id': userInfo?.id,
      'token':userInfo?.token
    };    
    
    try {
        const response = await axios.patch(`http://localhost:8000/api/user/update-status/${singleUser._id}`,{status}); 
        console.log(response.data)
      } catch (error) {
        throw error;
      }
      router.reload();
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="writer"
        image={imageArray[index%3]}
        className='h-[200px] object-fill'
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" className='text-center'>
          {singleUser.pen_name}
        </Typography>
        <ul className='list-disc px-2'>
            <li className='flex text-gray-500'>Status- {singleUser.status=="active"?<p className='text-green-600 text-sm ml-4'>{singleUser.status}</p>:<p className='text-red-600 text-sm ml-4'>{singleUser.status}</p>}</li>
            <li className='flex   text-gray-500'>Email- <p className='text-black text-sm ml-4'>{singleUser.email}</p></li>
            <li className='flex  text-gray-500'>User Name- <p className='text-black text-sm ml-4'>{singleUser.name}</p></li>
            <li className='flex  text-gray-500'>Blogs<p className='text-black text-sm ml-4'>{singleUser.blogs.length}</p></li>
        </ul>
      </CardContent>
      <CardActions>
        {singleUser.status=="inactive"?<Button variant="outlined" color="success" onClick={()=>activate()}>Activate</Button>:<Button variant="outlined" color="warning" onClick={()=>deactivate()}>Deactivate</Button>}
      </CardActions>
    </Card>
  );
}