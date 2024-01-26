import React,{useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {Sidebar} from 'flowbite-react'
import {HiUser, HiArrowCircleRight} from 'react-icons/hi'

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams =new URLSearchParams(location.search);
    const tabFromURL = urlParams.get('tab');

    if(tabFromURL) setTab(tabFromURL);

  }, [location.search])

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor = 'dark'>
                        Profile
                    </Sidebar.Item>
                </Link>
                <Sidebar.Item  icon={HiArrowCircleRight} className='cursor-pointer'>
                    Log out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar