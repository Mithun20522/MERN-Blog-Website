import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Table, TableCell, Modal, Button} from 'flowbite-react'
import {Link} from 'react-router-dom'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {FaCheck, FaTimes} from 'react-icons/fa'
const DashUsers = () => {
  const {currentUser} = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [userToDelete, setUserToDelete] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {

        const res = await fetch(`/api/user/get-users`);
        const data = await res.json();
        if(res.ok){
          setUsers(data.users)
          if(data.users.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if(currentUser.isAdmin){
      fetchUsers();
    }
  }, [currentUser._id])


  const handleShowMore = async () => {
    const startIndex = userUsers.length;
    try {
      const res = await fetch(`/api/user/get-users?startIndex=${startIndex}`)
      const data = await res.json();
      if(res.ok){
        setUsers((prev) => [...prev,...data.users]);
        if(data.users.length < 9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeleteUser = async () => {
      setShowModel(false);
      try {
        const res = await fetch(`/api/user/delete/${userToDelete}`, {method: 'DELETE'});
        const data = await res.json();
        if(!res.ok){
          console.log(data.message);
        }
        else{
          setUsers((prev) =>
          prev.filter((user) => user._id !== userToDelete));
          setShowModel(false);
        }
      } catch (error) {
        console.log(error.message);
      }
  }
  
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && users.length > 0 ? (
          <>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>Date created</Table.HeadCell>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {
                users.map((user) => (
                  <Table.Body className='divide-y' key={user._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>
                          <img
                            src={user.profilePicUrl}
                            alt={user.username}
                            className='w-10 h-10 rounded-full object-cover bg-gray-500'
                          />
                      </Table.Cell>
                      <Table.Cell>
                        {user.username}
                      </Table.Cell>
                      <Table.Cell>
                        {user.email}
                      </Table.Cell>
                      <Table.Cell>
                        {user.isAdmin ? (<FaCheck className='text-green-500'/>) : (<FaTimes className='text-red-500'/>)}  
                      </Table.Cell>
                      <Table.Cell>
                        <span onClick={() => {
                          setShowModel(true);
                          setUserToDelete(user._id);

                        }} className='font-medium text-red-600 hover:underline cursor-pointer'>Delete</span>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))
              }
            </Table>
            {
              showMore && (
                <button onClick={handleShowMore} className='w-full self-center text-sm py-7 text-teal-500'>
                  Show more
                </button>
              )
            }
          </>
        ) : (
          <p>You have No Users Yet!</p>
        )
      }
      <Modal show={showModel} onClose={() => setShowModel(false)} popup size='md'>
            <Modal.Header/>
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this user?</h3>
                        <div className='flex justify-between'>
                            <Button onClick={handleDeleteUser} color='failure'>Yes I'm sure</Button>
                            <Button color='gray' onClick={() => setShowModel(false)}>No, Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
        </Modal>
    </div>
  )
}

export default DashUsers