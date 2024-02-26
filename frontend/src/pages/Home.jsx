import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
const Home = () => {
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("/api/post/get-posts");
        const data = await res.json();
        if (res.ok) {
          setposts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPost();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 px-3 p-28 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome to the world of Exploration
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
        Welcome to our modern MERN blog, where fashion meets sustainability, science merges with technology, and nature's wonders inspire. 
        Explore the latest trends in ethical fashion, groundbreaking advancements in science and technology, and the beauty of our natural world. 
        Join us as we celebrate diversity and curiosity, shaping a brighter future together.
        </p>
      </div>
      <div className="max-w-6xl mx-auto p-3  flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg sm:text-sm text-teal-500 font-bold text-center hover:underline"
            >
              View all post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
