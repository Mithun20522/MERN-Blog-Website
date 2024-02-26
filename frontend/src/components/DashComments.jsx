import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Table, TableCell, Modal, Button} from 'flowbite-react'
import {Link} from 'react-router-dom'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {FaCheck, FaTimes} from 'react-icons/fa'
const DashComments = () => {
  const {currentUser} = useSelector(state => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  useEffect(() => {
    const fetchComments = async () => {
      try {

        const res = await fetch(`/api/comment/get-comments`);
        const data = await res.json();
        if(res.ok){
          setComments(data.comments)
          if(data.comments.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if(currentUser.isAdmin){
      fetchComments();
    }
  }, [currentUser._id])


  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/comment/get-comments?startIndex=${startIndex}`)
      const data = await res.json();
      if(res.ok){
        setUsers((prev) => [...prev,...data.comments]);
        if(data.comments.length < 9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeleteComment = async () => {
      setShowModel(false);
      try {
        const res = await fetch(`/api/comment/delete-comment/${commentIdToDelete}`, {method: 'DELETE'});
        const data = await res.json();
        if(!res.ok){
          console.log(data.message);
        }
        else{
          setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete));
          setShowModel(false);
        }
      } catch (error) {
        console.log(error.message);
      }
  }
  
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && comments.length > 0 ? (
          <>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
                <Table.HeadCell>Comment content</Table.HeadCell>
                <Table.HeadCell>Number of likes</Table.HeadCell>
                <Table.HeadCell>Post Id</Table.HeadCell>
                <Table.HeadCell>User Id</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {
                comments.map((comment) => (
                  <Table.Body className='divide-y' key={comment._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>{new Date(comment.createdAt).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>
                          {comment.content}
                      </Table.Cell>
                      <Table.Cell>
                        {comment.numberOfLikes}
                      </Table.Cell>
                      <Table.Cell>
                        {comment.postId}
                      </Table.Cell>
                      <Table.Cell>
                        {comment.userId}
                      </Table.Cell>
                      <Table.Cell>
                        <span onClick={() => {
                          setShowModel(true);
                          setCommentIdToDelete(comment._id);

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
          <p>You have No Comments Yet!</p>
        )
      }
      <Modal show={showModel} onClose={() => setShowModel(false)} popup size='md'>
            <Modal.Header/>
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this user?</h3>
                        <div className='flex justify-between'>
                            <Button onClick={handleDeleteComment} color='failure'>Yes I'm sure</Button>
                            <Button color='gray' onClick={() => setShowModel(false)}>No, Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
        </Modal>
    </div>
  )
}

export default DashComments