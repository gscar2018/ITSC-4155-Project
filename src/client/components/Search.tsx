import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import type { Post } from "../../types.ts";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (searchQuery !== "") {
            handleSearch();
        }
    }, [searchQuery]);

    const handleSearch = async () => {
        setLoading(true);
        try {
            
            console.log("Searching for posts with tags:", searchQuery);

            const response = await axios.get(`/api/posts/search?tags=${searchQuery}`);
            console.log("Search response:", response.data);

            setSearchResults(response.data);
            setShowResults(true);
        } catch (error) {
            console.error("Error searching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleResultClick = () => {
        setShowResults(false);
    };

    const getImageSource = (post: Post) => {
        /**
         * data: `data:${req.file.mimetype};base64,${req.file.buffer.toString(
                    "base64",
                )}`
         */
        //if image.data exists we need to extract the string between : and ;(mimetype)
        if (post.image.data?.startsWith("data:image/")) {
            return post.image.data;
        } if (post.image.data) {
            const mimeType = post.image.data.split(";")[0].split(":")[1];
            const base64Data = post.image.data.replace(/^data:image\/\w+;base64,/, "");
            const dataUrl = `data:${mimeType};base64,${base64Data}`;
            return dataUrl;
        }
        return `${window.location.origin}/${post.image.url}`;
    };
    return (
        <div ref={searchRef} className="relative">
            <div className="join my-4">
                <input
                    type="text"
                    placeholder="Search by tag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                    }}
                    className="input input-sm input-bordered join-item"
                />
                <button
                    type="button"
                    onClick={handleSearch}
                    disabled={loading}
                    className="btn btn-sm join-item bg-neutral text-white "
                >
                    Search
                </button>
            </div>
            {searchResults !== null && showResults && (
                <div className="absolute top-24 left-0 w-96 max-h-72 overflow-y-auto z-50 shadow-lg rounded-md bg-base-100">
                    {searchResults.length === 0 ? (
                        <div className="text-center p-4">No results found</div>
                    ) : (
                        searchResults.map((post: Post) => (
                            <NavLink
                                key={post._id}
                                to={`/post/${post._id}`}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={handleResultClick}
                            >
                                {post.image && (
                                    <img
                                        src={getImageSource(post)}
                                        alt="Post"
                                        className="w-20 h-20 object-cover rounded-md mr-4"
                                        onError={() =>
                                            console.error("Error loading image:", post.image.data)
                                        }
                                    />
                                )}
                                <div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-block bg-blue-500 rounded-full px-3 py-1 text-white text-sm font-semibold"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </NavLink>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;

