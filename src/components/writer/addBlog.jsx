import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(56, 56, 56, 0.8);',
};

export default function AddBlog() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sections',
  });
  const router = useRouter();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loader, setLoader] = useState(false);

  const onSubmit = async (data) => {
    setLoader(true);
    const storedUser = JSON.parse(localStorage.getItem('apploreUser'));
          axios.defaults.headers.common = {
            'Content-Type': 'application/json',
            'Authorization': storedUser?.token,
            'user_id': storedUser?.id,
            'token':storedUser?.token
          };

          // for(let i=0;i<data.sections.length;i++){
          //   data.sections[i].image=data.sections[i].image[0]
          // }
          data.user_id=storedUser.id;
          
          try {
              const response = await axios.post(`http://localhost:8000/api/user/create-blog`,{data}); 
              console.log(response.data)
            } catch (error) {
              throw error;
            }
            setLoader(false);
            handleClose();
            router.reload();
  };

  const validateImage = (file) => {
    if (!file) {
      return 'Image is required.';
    }
    const fileType = file[0]?.type;
    if (!['image/jpeg', 'image/png'].includes(fileType)) {
      return 'Only JPG and PNG images are allowed.';
    }
    if (file[0]?.size > 1024 * 1024) {
      return 'Image size should be less than 1 MB.';
    }
    return true;
  };

  return (
    <div>
      <input className='my-4 py-[3px] rounded-lg border-orange-600 border-[1px] px-4 text-white bg-orange-400 hover:cursor-pointer'
        type='button'
        value='Add Blog'
        onClick={handleOpen}
      />
      <Modal
        open={open} 
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style} 
          className='bg-orange-100 bg-opacity-100 rounded-xl px-10 py-6 border-white border-[1px] w-[100%] md:w-[50%] '
        >
          <form onSubmit={handleSubmit(onSubmit)} style={{ overflowY: 'auto', maxHeight: '80vh' }}>
            <h2 className="text-2xl mb-4">Add Blog</h2>

            <div className="mb-4">
              <label className="block text-gray-700">Blog Title</label>
              <input
                type="text"
                {...register('title', { required: true })}
                className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400 mt-2"
              />
              {errors.BlogTitle && <p className="text-red-500">Blog Title is required</p>}
            </div>

            {/* Section Fields */}
            {fields.map((section, index) => (
              <div key={section.id} className="border p-4 mb-4">
                <h3 className="text-lg mb-2">Section {index + 1}</h3>
                <div className="mb-2">
                  <label className="block text-gray-700">Section Title</label>
                  <input
                    type="text"
                    {...register(`sections.${index}.subtitle`, { required: true })}
                    className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400 mt-2"
                  />
                  {errors.sections && errors.sections[index] && errors.sections[index].subtitle && (
                    <p className="text-red-500">Section Title is required</p>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Section Content</label>
                  <textarea
                    {...register(`sections.${index}.data`, { required: true })}
                    className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400 mt-2"
                  />
                  {errors.sections && errors.sections[index] && errors.sections[index].data && (
                    <p className="text-red-500">Section Content is required</p>
                  )}
                </div>
                {/* <div className="mb-2">
                  <label className="block text-gray-700">Section Image (Png or Jpg)</label>
                  <input
                    type="file"
                    {...register(`sections.${index}.image`, { validate: validateImage })}
                    className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400 mt-2"
                  />
                  {errors.sections && errors.sections[index] && errors.sections[index].image && (
                    <p className="text-red-500">{errors.sections[index].image.message}</p>
                  )}
                </div> */}
                <button type="button" onClick={() => remove(index)} className='bg-red-500 text-white px-2 rounded'>
                  Remove Section
                </button>
              </div>
            ))}

            <div className='flex justify-between'>
            <button type="button" onClick={() => append({ subtitle: '', data: '', image: null })} className='bg-green-700 text-white px-2 py-2 rounded-lg'>
              Add Section
            </button>
            {
              loader?
              <div>
            <CircularProgress />
            </div>:""
            }
            
            
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Submit
            </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
