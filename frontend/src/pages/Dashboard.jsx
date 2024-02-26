import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import Dashprofile from '../components/Dashprofile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashBoardComponent from '../components/DashBoardComponent';

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams =new URLSearchParams(location.search);
    const tabFromURL = urlParams.get('tab');

    if(tabFromURL) setTab(tabFromURL);

  }, [location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSidebar/>
      </div>
      {tab === 'profile' && <Dashprofile/>}
      {tab === 'posts' && <DashPosts/>}
      {tab === 'users' && <DashUsers/>}
      {tab === 'comments' && <DashComments/>}
      {tab === 'dash' && <DashBoardComponent/>}
    </div>
  )
}

export default Dashboard