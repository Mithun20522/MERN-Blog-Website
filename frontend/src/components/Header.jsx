import React, { useEffect, useState } from 'react'
import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon, FaSun} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { signOutSuccess } from '../redux/userSlice'
const Header = () => {
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {theme}  = useSelector(state => state.theme);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl);
        }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);

    }

  return (
    <Navbar className='border-b-2'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-blue-500 via-sky-500 to-blue-800 rounded-lg text-white'>IN</span>
            Blog
        </Link>
        <form onSubmit={handleSubmit}>
            <TextInput
                type='text'
                placeholder='Search...'
                rightIcon={AiOutlineSearch}
                className='hidden sm:block lg:inline'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
        <Button className='w-12 h-10 hidden lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                {theme === 'light' ? <FaMoon/> : <FaSun/>}
            </Button>
            { currentUser ? (
                <Dropdown arrowIcon ={false} inline
                label={
                    <Avatar alt='user'
                    img={currentUser.profilePicUrl}
                    rounded>
                    </Avatar>
                }>
                <Dropdown.Header>
                    <span className='block text-sm'>@{currentUser.username}</span>
                    <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                </Dropdown.Header>
                <Link to='/dashboard?tab=profile'>
                    <DropdownItem>Profile</DropdownItem>
                    <DropdownDivider/>
                    <DropdownItem onClick={handleSignOut}>Log out</DropdownItem>
                </Link>
                </Dropdown>
            ) : (
                <Link to='/login'>
                    <Button outline>
                        Log in
                    </Button>
                </Link>
            )}
            
            <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}

export default Header