import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function WriterCard({singleWriter, index}) {
  const imageArray=["writerImage1.jpg","writerImage2.jpg","writerImage3.jpeg"]
  return (
    <Card sx={{ maxWidth: 450  }} className='mx-auto '>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={imageArray[index%3]}
      />
      <CardContent className='bg-orange-300 text-center'>
        <Typography gutterBottom variant="h5" component="div">
          {singleWriter?.pen_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <p className='text-lg'>Name- <span>{singleWriter?.name}</span></p>
        <p className='text-lg'>Email- <span>{singleWriter?.email}</span></p>
        <p className='text-lg'>Bio- <span>{singleWriter?.bio}</span></p>
        </Typography>
      </CardContent>
    </Card>
  );
}