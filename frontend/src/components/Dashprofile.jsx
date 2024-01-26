import { Button, TextInput } from 'flowbite-react';
import React from 'react'
import {useSelector} from 'react-redux'

const Dashprofile = () => {
    const {currentUser} = useSelector(state => state.user);

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center text-3xl font-semibold'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <div className='w-32 h-32 self-center cursor-pointer shadow-xl overflow-hidden rounded-full'>
                <img src={currentUser.profilePicUrl} alt="user" className='rounded-full w-full h-full border-8 border-[lightgray] object-cover'/>
            </div>
            <TextInput type='text' id='username' placeholder='username'  defaultValue={currentUser.username}/>
            <TextInput type='email' id='email' placeholder='email'  defaultValue={currentUser.email}/>
            <TextInput type='password' id='password' placeholder='password'/>
            <Button type='submit' gradientDuoTone='greenToBlue' outline>Update</Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span className='cursor-pointer hover:text-red-600'>Delete Account</span>
            <span className='cursor-pointer hover:text-red-600'>Log out</span>
        </div>
    </div>
  )
}

export default Dashprofile