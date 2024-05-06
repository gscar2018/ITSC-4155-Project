import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { Post } from "../../types.js";
import { useAuth } from "../api/auth/authContext.js";
import { deletePostHandler } from "../api/apiCalls.js";
import { motion } from "framer-motion";
import OpenAiBtn from "../components/OpenAiBtn.js";
import { toast } from "react-toastify";
function PostPage() {
    const post = useLoaderData() as Post;
    const [username, setUsername] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const { userId } = useAuth();

    useEffect(() => {
        //check if owner
        if (typeof post.user === 'string' && userId === post.user) {
            setIsOwner(true);
        }
        // Fetch the username based on the user ID associated with the post
        fetch(`/api/users/${post.user}`)
            .then((response) => response.json())
            .then((userData) => setUsername(userData.username))
            .catch((error) => console.error("Error fetching username:", error));
    }, [post.user, userId]);
    console.log(post.image);
    const base64Str = post.image.data?.split(",")[1];
    const charArr = base64Str?.split("");
    console.log(base64Str);
    function OpenAiHandler() {
        const sendMessage = async () => {
            setIsSending(true);

            //convert image to base64 strings for backend 
            console.log(post.image.data);

            //wait for images to be converted
            const imageBase64Strings = await Promise.all(imagePromises);

            ///payload for the openai api
            const payload = { images: imageBase64Strings };

            try {
                const response = await fetch("/api/openai", {
                    body: JSON.stringify(payload),
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                //error handling
                if (!response.ok) {
                    throw new Error("Failed to send message");
                }
                //
            } catch (error) {
                toast.error("Failed to send message");
                console.error(error);
            } finally {
                setIsSending(false);
            }
        }
    };


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
                    <OpenAiBtn />
                </div>
            </div>
        </div>
    );
}

export default PostPage;