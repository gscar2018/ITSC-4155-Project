import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { Post } from "../../types.js";
import { useAuth } from "../api/auth/authContext.js";
import { deletePostHandler } from "../api/apiCalls.js";
import { motion } from "framer-motion";
function PostPage() {
    const post = useLoaderData() as Post;
    const [username, setUsername] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const { userId } = useAuth();

    useEffect(() => {
        //check if owner
        if (userId === post.user) {
            setIsOwner(true);
        }
        // Fetch the username based on the user ID associated with the post
        fetch(`/api/users/${post.user}`)
            .then((response) => response.json())
            .then((userData) => setUsername(userData.username))
            .catch((error) => console.error("Error fetching username:", error));
    }, [post.user, userId]);

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col space-y-2 items-center justify-center md:justify-start md:items-start">
                    <h1>Posted by: {username}</h1>
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={
                                post.image.data || `${window.location.origin}/${post.image.url}`
                            }
                            alt={post.image.caption}
                            className="w-auto h-auto object-cover rounded-lg"
                        />
                    </motion.div>
                    {isOwner && (
                        <div className="flex justify-center mt-4">
                            <button
                                type="button"
                                onClick={() => deletePostHandler(post._id)}
                                className="btn btn-error btn-sm"
                            >
                                Delete Post
                            </button>
                        </div>
                    )}
                </div>
                <div className="">
                    <h2>Tags</h2>
                    <div className="flex space-x-2 m-5 pb-5">
                        {post.tags.map((tag) => {
                            return (
                                <span
                                    key={tag}
                                    className="inline-block bg-base-200 rounded-full px-3 py-1 text-sm font-semibold"
                                >
                                    {tag}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostPage;