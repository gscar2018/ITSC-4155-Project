import React, { useEffect, useState } from "react";
import { useAuth } from "../api/auth/authContext";
import { NavLink, useParams } from "react-router-dom";
import {
	getUserFavoritesHandler,
	getUserHandler,
	getUserPostsHandler,
} from "../api/apiCalls";
import type { Post, User } from "../../types";

function UserAccount() {
	const { isLoggedIn } = useAuth();
	const { userId } = useParams<{ userId: string }>();
	const [user, setUser] = useState<User>();
	const [userPosts, setUserPosts] = useState<Post[]>([]);
	const [favPosts, setFavPosts] = useState<Post[]>([]);
	const [activeTab, setActiveTab] = useState<"home" | "favorites">("home");

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				if (!userId) return;
				//get user info
				const user: User = await getUserHandler(userId);
				const userPosts = await getUserPostsHandler(userId);
				const favoritePosts = await getUserFavoritesHandler(userId);

				setUser(user);
				setUserPosts(userPosts);
				setFavPosts(favoritePosts);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		if (isLoggedIn && userId) {
			fetchUserData();
		}
	}, [isLoggedIn, userId]);

	const date = new Date(user?.createdAt as Date);
	//format yyyy-mm-dd
	const formattedDate = `${
		date.getMonth() + 1
	}/${date.getDate()}/${date.getFullYear()}`;
	const renderTabContent = () => {
		if (activeTab === "home") {
			return (
				<section>
					<h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{userPosts.map((post: Post, index) => (
							<div key={post._id} className="card bg-base-200 shadow-xl">
								<figure className="px-4 pt-4">
									<img
										src={`${window.location.origin}/${post.image.url}`}
										alt={post.image.caption}
										className="rounded-xl w-full h-40 object-cover"
									/>
								</figure>
								<div className="card-body items-center text-center p-4">
									<h3 className="card-title">{post.title}</h3>
									<NavLink to={`/post/${post._id}`}>
										<button type="button" className="btn btn-primary">
											View Post
										</button>
									</NavLink>
								</div>
							</div>
						))}
					</div>
				</section>
			);
		}
		if (activeTab === "favorites") {
			return (
				<section>
					<h2 className="text-2xl font-semibold mb-4">Favorite Posts</h2>
					{/* Render favorite posts */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{Object.entries(favPosts).map(([collectionName, posts]) => (
							<div key={collectionName}>
								<h3 className="text-xl font-semibold mb-2">{collectionName}</h3>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
									{Object.values(posts).map((post: Post) => (
										<div key={post._id} className="card bg-base-200 shadow-xl">
											<figure className="px-4 pt-4">
												<img
													src={post.image.url}
													alt={post.title}
													className="rounded-xl w-full h-40 object-cover"
													loading="lazy"
												/>
											</figure>
											<div className="card-body items-center text-center p-4">
												<h3 className="card-title">{post.title}</h3>
												<p>{post.content}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</section>
			);
		}
	};

	return (
		<main className="bg-base-100 min-h-screen">
			<div className="container mx-auto mt-8 px-4">
				<h1 className="text-4xl font-bold mb-4">Welcome, {user?.username}!</h1>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">Account Details</h2>
					<ul className="list-disc list-inside">
						<li>Joined: {formattedDate}</li>
					</ul>
				</section>

				<div role="tablist" className="tabs tabs-bordered">
					<input
						type="radio"
						name="my_tabs_1"
						role="tab"
						className="tab"
						aria-label="Tab 1"
						checked={activeTab === "home"}
						onChange={() => setActiveTab("home")}
					/>
					<div role="tabpanel" className="tab-content p-10">
						{renderTabContent()}
					</div>

					<input
						type="radio"
						name="my_tabs_1"
						role="tab"
						className="tab"
						aria-label="Tab 2"
						checked={activeTab === "favorites"}
						onChange={() => setActiveTab("favorites")}
					/>
					<div role="tabpanel" className="tab-content p-10">
						{renderTabContent()}
					</div>
				</div>
			</div>
		</main>
	);
}

export default UserAccount;
