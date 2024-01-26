import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import { signInStart, signInSuccess , signInFailure } from '../redux/userSlice'
import OAuth from '../components/OAuth'
const Login = () => {
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleOnchange = (e) => {
      setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Please fill out all fields.'));
    }

      try {

        dispatch(signInStart());
        const res = await fetch('/api/auth/login',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        });

        const data =  await res.json();
        if(data.success === false) {
          dispatch(signInFailure(data.message));
        }

        if(res.ok) {
          dispatch(signInSuccess(data));
          navigate('/');
        }

      } catch (error) {
        dispatch(signInFailure(error.message));
      }
  }

  return (
    <div className='mt-20 min-h-screen'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className="left flex-1">
        <Link to='#' className='text-6xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-blue-500 via-sky-500 to-blue-800 rounded-lg text-white'>IN</span>
            Blog
        </Link>
        <p className='text-sm mt-5'>
          Here You can Login using your Email and password <br/>
          Or with help of Google Account.
        </p>
        </div>
        <div className="right flex-1">
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className="email">
            <Label value='Email'/>
              <TextInput
                type='email'
                placeholder='name@gmail.com'
                id='email'
                onChange={handleOnchange}
              />
            </div>
            <div className="password">
            <Label value='Password'/>
              <TextInput
                type='password'
                placeholder='**************'
                id='password'
                onChange={handleOnchange}
              />
            </div>
            <Button type='submit' disabled = {loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Log in'
              }
            </Button>
            {/* <OAuth/> */}
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account ?</span>
            <Link to='/register' className='text-blue-500'>
              Register
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Login