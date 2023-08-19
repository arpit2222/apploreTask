// components/Login.js
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Image from 'next/image';

function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('apploreUser'));
    if(storedUser){
      router.push('/writer/blogs');
    }
},[])

  const onSubmit = async (data) => {
    console.log(data); // You can handle login logic here
    try {
      const response = await axios.post(`http://localhost:8000/api/user/login`, data); 
      console.log(response.data)
      localStorage.setItem('apploreUser', JSON.stringify(response.data));
      if(response.data.role=="writer"){
      router.push('/writer/blogs');
    }else if(response.data.role=="admin"){
      router.push('/admin/blogs');
    }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex justify-center  h-screen bg-orange-300">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 p-6 mt-32 h-[300px] bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register('password', { required: true })}
            className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
          />
          {errors.password && <p className="text-red-500">Password is required</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Login
        </button>
      </form>
      <div className='absolute bottom-0 right-0'>
      <Image width={600} height={300} src="/gear5.png" alt="anime1" className="mx-auto mt-8"/>
      </div>
    </div>
  );
}

export default Login;
