import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';
const Register = () => {
  const [errorMessage, setErrormessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleOnchange = (e) => {
      setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!formData.username || !formData.email || !formData.password){
      return setErrormessage('Please fill out all fields.');
    }

      try {

        setLoading(true);
        setErrormessage(null);
        const res = await fetch('/api/auth/register',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        });

        const data =  await res.json();
        if(data.success === false) return setErrormessage(data.message);

        setLoading(false);

        if(res.ok) navigate('/login');

      } catch (error) {
        setErrormessage(error.message);
        setLoading(false)
      }
  }

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
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className="username">
              <Label value='Username'/>
              <TextInput
                type='text'
                placeholder='Enter your username'
                id='username'
                onChange={handleOnchange}
              />
            </div>
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
                placeholder='Enter your password'
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
                ) : 'Register'
              }
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account ?</span>
            <Link to='/login' className='text-blue-500'>
              Log in
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

export default Register