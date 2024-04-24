import React, { useContext } from "react";
import { useAuth } from "../api/auth/authContext";

function UserAccount() {
	const { isLoggedIn } = useAuth();
	console.log("UserAccount");
	console.log(`you are logged in: ${isLoggedIn}`);
	return <div>UserAccount</div>;
}

export default UserAccount;
