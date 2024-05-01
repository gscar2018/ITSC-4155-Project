import { useLoaderData } from "react-router-dom";
import type { Post } from "../../types";
import { useAuth } from "../api/auth/authContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { addToFavoritesHandler, getUserHandler } from "../api/apiCalls";
import 'react-toastify/dist/ReactToastify.css';

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
            <div className="p-5">
                <div className="gap-5 grid grid-cols-1  md:grid-cols-3 items-center justify-center">
                    {/* loop to render card*/}
                    {data
                        .slice()
                        .reverse()
                        .map((post, index) => {
                            if (!post || !post.image) {
                                console.warn(
                                    `Post at index ${index} is undefined or missing image.`,
                                );
                                return null; // Or display a placeholder component/message.
                            }
                            return (
                                <div
                                    className="container flex flex-col items-center"
                                    key={post._id}
                                >
                                    <div className="relative">
                                        {/* dynamic img size based on mobile or desktop screen size */}
                                        <img
                                            src={post.image.data || post.image.url}
                                            alt={post.image.caption}
                                            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-lg"
                                        />
                                        <div className="absolute bottom-0 right-0 cursor-pointer">
                                            <button
                                                type="button"
                                                className="p-2"
                                                onClick={() => handleFavorite(post)}
                                            >
                                                <Icon
                                                    icon={
                                                        favoritedPosts.includes(post._id)
                                                            ? "mdi:heart"
                                                            : "mdi:heart-outline"
                                                    }
                                                    className="text-red-400 text-3xl"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-block bg-base-200 rounded-full px-3 py-1 text-sm font-semibold"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <a
                                        className="mt-6 btn btn-sm btn-neutral text-neutral-content font-bold py-2 px-4 rounded"
                                        href={`/post/${post._id}`}
                                    >
                                        View More
                                    </a>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}

export default HomePage;
