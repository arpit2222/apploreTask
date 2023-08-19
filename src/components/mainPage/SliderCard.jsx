import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';


export default function SliderCard({singleBlog, index}) {
  const router = useRouter();
  const imageArray=["animeBlogImage.jpg","animeBlogImage1.jpeg","animeBlogImage2.jpg"]
  
  const redirectToTarget = () => {
    const valueToPass=index
    localStorage.setItem('selectedBlogIndex', valueToPass)
    router.push({
      pathname: '/blogs',
      query: valueToPass,
    });
  };
  return (
    <Card sx={{ maxWidth: 450 }} className='mx-auto'>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={imageArray[index%3]}
      />
      <CardContent className='bg-orange-300'>
        <Typography gutterBottom variant="h5" component="div">
          {singleBlog?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <p className='text-lg'>Total Sections- <span>{singleBlog?.sections.length}</span></p>
        <p className='text-lg'>Total Comments- <span>{singleBlog?.comments.length}</span></p>
        </Typography>
      </CardContent>
      <CardActions className='bg-orange-400'>
        <Button size="small" className='text-white' onClick={redirectToTarget}>Preview</Button>
      </CardActions>
    </Card>
  );
}