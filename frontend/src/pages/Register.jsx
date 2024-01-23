import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import {Link} from 'react-router-dom'
const Register = () => {
  return (
    <div className='mt-20 min-h-screen'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className="left flex-1">
        <Link to='/' className='text-6xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-blue-500 via-sky-500 to-blue-800 rounded-lg text-white'>IN</span>
            Blog
        </Link>
        <p className='text-sm mt-5'>
          Here You can Register using your Email and password <br/>
          Or with help of Google Account.
        </p>
        </div>
        <div className="right flex-1">
          <form className='flex flex-col gap-5'>
            <div className="username">
              <Label value='Username'/>
              <TextInput
                type='text'
                placeholder='Enter your username'
                required
                id='username'
              />
            </div>
            <div className="email">
            <Label value='Email'/>
              <TextInput
                type='text'
                placeholder='Enter your email'
                required
                id='email'
              />
            </div>
            <div className="password">
            <Label value='Password'/>
              <TextInput
                type='password'
                placeholder='Enter your password'
                required
                id='password'
              />
            </div>
            <Button type='submit'>Register</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register