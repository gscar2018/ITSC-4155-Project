// AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import { checkLogin } from "../apiCalls";

export const AuthContext = React.createContext<
	[boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const authState = async () => {
			const loggedIn = await checkLogin();
			setIsLoggedIn(loggedIn);
		};
		checkLogin();
	}, []);

	return (
		<AuthContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
			{children}
		</AuthContext.Provider>
	);
};
