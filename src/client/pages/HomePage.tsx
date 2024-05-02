import { NavLink, useLoaderData } from "react-router-dom";
import type { Post } from "../../types";
import { useAuth } from "../api/auth/authContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { addToFavoritesHandler, getUserHandler } from "../api/apiCalls";
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";

import '../index.css';

function HomePage() {
    const data = useLoaderData() as Post[];
    const { userId } = useAuth();
    const [favoritedPosts, setFavoritedPosts] = useState<string[]>([]);
    const handleFavorite = async (post: Post) => {
        if (!userId) {
            console.log("You must be logged in to favorite posts.");
            toast.error("You must be logged in to favorite posts.", {
                position: "top-right",
                autoClose: 5000,
            });
            return;
        }
        try {
            await addToFavoritesHandler(userId, post._id);
            setFavoritedPosts((prevFavoritedPosts) => [
                ...prevFavoritedPosts,
                post._id,
            ]);

            const updatedUser = await getUserHandler(userId);
            setFavoritedPosts(updatedUser.favoritePosts);
        } catch (error) {
            console.error("Error adding post to favorites:", error);
            toast.error("Failed to add post to favorites.");
        }
    };

    useEffect(() => {
        const fetchFavoritePosts = async () => {
            if (!userId) return;
            const user = await getUserHandler(userId);
            setFavoritedPosts(user.favoritePosts);
        };
        if (userId) {
            fetchFavoritePosts();
        }
    }, [userId]);
    return (
        <>
            <ToastContainer />
            <div className="p-8 mx-20 md:mx-32">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {data.slice().reverse().map((post, index) => {
                        if (!post || !post.image) {
                            console.warn(`Post at index ${index} is undefined or missing image.`);
                            return null;
                        }
                        return (
                            <motion.div
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 100,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            staggerChildren: 0.1,
                                        },
                                    },
                                }}
                                initial="hidden"
                                animate="visible"
                                className="card bg-base-200 shadow-md rounded-lg overflow-hidden " key={post._id}>
                                <figure className="relative">
                                    <img src={post.image.data || post.image.url} alt={post.image.caption} className="w-full h-52 object-cover " />
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary to-transparent opacity-20  transition-opacity duration-300 hover:opacity-40" />
                                </figure>
                                <div className="card-body p-1">
                                    <button type="button" className="flex  justify-end " onClick={() => handleFavorite(post)}>
                                        <Icon icon={favoritedPosts.includes(post._id) ? "mdi:heart" : "mdi:heart-outline"} className="text-red-700 text-4xl hover:text-red-900 transition-colors" />
                                    </button>
                                    <div className="flex flex-wrap justify-center gap-2 mb-4 ">
                                        {post.tags.map((tag) => (
                                            <span key={tag} className="badge py-2 badge-outline">{tag}</span>
                                        ))}
                                    </div>
                                    {/* have btn glow on hover  */}
                                    <NavLink to={`/post/${post._id}`} className="btn btn-primary btn-block hover:btn-secondary glow-effect">
                                        View More
                                    </NavLink>

                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default HomePage;
