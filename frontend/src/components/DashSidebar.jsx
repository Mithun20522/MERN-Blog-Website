import React,{useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {Sidebar, SidebarItem} from 'flowbite-react'
import {HiUser, HiArrowCircleRight, HiDocumentText} from 'react-icons/hi'
import { signOutSuccess } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user);

  useEffect(() => {
    const urlParams =new URLSearchParams(location.search);
    const tabFromURL = urlParams.get('tab');

    if(tabFromURL) setTab(tabFromURL);

  }, [location.search])


  const handleSignOut = async () => {
    try {
        const res = await fetch('/api/user/signout',{
            method: 'POST',
        })

        const data = await res.json();
        if(!res.ok){
            console.log(data.message);
        }
        else{
            dispatch(signOutSuccess());
        }
    } catch (error) {
        console.log(error.message);
    }
}

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} as='div' labelColor = 'dark'>
                        Profile
                    </Sidebar.Item>
                </Link>
                {
                    currentUser.isAdmin && (
                        <Link to='/dashboard?tab=posts'>
                            <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div' >
                                Posts
                            </Sidebar.Item>
                        </Link>
                    )
                }
                
                <Sidebar.Item icon={HiArrowCircleRight} onClick={handleSignOut} className='cursor-pointer'>
                    Log out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar