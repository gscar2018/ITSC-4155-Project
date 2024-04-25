// AuthContext.tsx
import { createContext, useState, useEffect, useContext } from "react";
import { checkLogin } from "../apiCalls";
import axios from "axios";
import { response } from "express";

interface AuthContextProps {
	isLoggedIn: boolean;
	isLoading: boolean;
	userId?: string;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	signup: (email: string, password: string, username: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
	isLoggedIn: false,
	isLoading: true,
	userId: "",
	login: async () => {},
	logout: async () => {},
	signup: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [userId, setUserId] = useState<string>("");

	useEffect(() => {
		const checkLoginStatus = async () => {
			try {
				const response = await axios.get("/api/auth/loginStatus");
				setIsLoggedIn(response.data.isLoggedIn);

				if (response.data.isLoggedIn) {
					setUserId(response.data.userId);
				}
			} catch (error) {
				console.error("Error checking login status:", error);
			} finally {
				setIsLoading(false);
			}
		};
		checkLoginStatus();
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const response = await axios.post("/api/auth/login", {
				email,
				password,
			});
			setIsLoggedIn(true);
			setUserId(response.data.userId);
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await axios.post("/api/auth/logout");
			setIsLoggedIn(false);
		} catch (error) {
			console.error("Logout error:", error);
			throw error;
		}
	};

	const signup = async (email: string, password: string, username: string) => {
		try {
			const response = await axios.post("/api/auth/signup", {
				email,
				password,
				username,
			});
			setIsLoggedIn(true);
			setUserId(response.data.userId);
		} catch (error) {
			console.error("Signup error:", error);
			throw error;
		}
	};
	return (
		<AuthContext.Provider
			value={{ isLoggedIn, isLoading, userId, login, logout, signup }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
