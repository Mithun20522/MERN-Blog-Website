import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiAnnotation, HiArrowNarrowUp, HiDocument, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const DashBoardComponent = () => {
  const [users, setusers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/get-users?limit=5");
        const data = await res.json();
        if (res.ok) {
          setusers(data.users);
          setTotalUsers(data.totalusers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/get-posts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/get-comments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComment);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);
  return (
    <div className="p-3 md:mx-auto">
      <div className="flex flex-wrap gap-4 justify-center">
      <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
          <div>
            <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
            <p className="text-2xl">{totalUsers}</p>
          </div>
          <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
        <div className="flex text-sm items-center gap-2">
          <span className="text-green-500 flex items-center">
            <HiArrowNarrowUp />
            {lastMonthUsers}
          </span>
          <span className="text-gray-500">Last month</span>
        </div>
      </div>
      <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
          <div>
            <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
            <p className="text-2xl">{totalPosts}</p>
          </div>
          <HiDocumentText className="bg-purple-600 text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
        <div className="flex text-sm items-center gap-2">
          <span className="text-green-500 flex items-center">
            <HiArrowNarrowUp />
            {lastMonthPosts}
          </span>
          <span className="text-gray-500">Last month</span>
        </div>
      </div>
      <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
          <div>
            <h3 className="text-gray-500 text-md uppercase">Total Comments</h3>
            <p className="text-2xl">{totalComments}</p>
          </div>
          <HiAnnotation className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
        <div className="flex text-sm items-center gap-2">
          <span className="text-green-500 flex items-center">
            <HiArrowNarrowUp />
            {lastMonthComments}
          </span>
          <span className="text-gray-500">Last month</span>
        </div>
      </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between items-center p-3 text-sm font-semibold">
                <h1 className="text-center p-2">Recent Users</h1>
                <Button outline gradientDuoTone='greenToBlue'>
                    <Link to={'/dashboard?tab=users'}>
                        See all
                    </Link>
                </Button>
            </div>
            <Table>
                <TableHead>
                    <TableHeadCell>User image</TableHeadCell>
                    <TableHeadCell>Username</TableHeadCell>
                </TableHead>
                {users && users.map((user) => (
                    <TableBody key={user._id} className="divide-y">
                        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <TableCell>
                                <img src={user.profilePicUrl} alt={user.username} className="w-10 h-10 rounded-full bg-gray-500" />
                            </TableCell>
                            <TableCell>{user.username}</TableCell>
                        </TableRow>
                        

                    </TableBody>
                ))}
            </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between items-center p-3 text-sm font-semibold">
                <h1 className="text-center p-2">Recent Posts</h1>
                <Button outline gradientDuoTone='greenToBlue'>
                    <Link to={'/dashboard?tab=posts'}>
                        See all
                    </Link>
                </Button>
            </div>
            <Table>
                <TableHead>
                    <TableHeadCell>Post image</TableHeadCell>
                    <TableHeadCell>Post Title</TableHeadCell>
                    <TableHeadCell>Category</TableHeadCell>
                </TableHead>
                {posts && posts.map((post) => (
                    <TableBody key={post._id} className="divide-y">
                        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <TableCell>
                                <img src={post.image} alt={post.title} className="w-14 h-10 rounded-md bg-gray-500" />
                            </TableCell>
                            <TableCell>{post.title}</TableCell>
                            <TableCell>{post.category}</TableCell>
                        </TableRow>
                    </TableBody>
                ))}
            </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between items-center p-3 text-sm font-semibold">
                <h1 className="text-center p-2">Recent Comments</h1>
                <Button outline gradientDuoTone='greenToBlue'>
                    <Link to={'/dashboard?tab=comments'}>
                        See all
                    </Link>
                </Button>
            </div>
            <Table>
                <TableHead>
                    <TableHeadCell>Comment Content</TableHeadCell>
                    <TableHeadCell>Likes</TableHeadCell>
                </TableHead>
                {comments && comments.map((comment) => (
                    <TableBody key={comment._id} className="divide-y">
                        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <TableCell><p className="line-clamp-2">{comment.content}</p></TableCell>
                            <TableCell>{comment.numberOfLikes}</TableCell>
                        </TableRow>
                    </TableBody>
                ))}
            </Table>
        </div>
      </div>
    </div>
  );
};

export default DashBoardComponent;
