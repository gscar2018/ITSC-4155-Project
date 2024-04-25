// AuthContext.tsx
import { create } from "zustand";
import { checkLogin } from "../apiCalls";
import axios from "axios";
interface AuthContextProps {
	isLoading: boolean;
	userId?: string;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	signup: (email: string, password: string, username: string) => Promise<void>;
	checkLoginStatus: () => Promise<void>;
}

export const useAuth = create<AuthContextProps>((set) => ({
	isLoading: true,
	userId: undefined,
	login: async (email: string, password: string) => {
		try {
			const response = await axios.post("/api/auth/login", {
				email,
				password,
			});
			set({ userId: response.data.userId });
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		}
	},
	logout: async () => {
		try {
			await axios.post("/api/auth/logout");
			set({ userId: undefined });
		} catch (error) {
			console.error("Logout error:", error);
			throw error;
		}
	},
	signup: async (email: string, password: string, username: string) => {
		try {
			const response = await axios.post("/api/auth/signup", {
				email,
				password,
				username,
			});
			set({ userId: response.data.userId });
		} catch (error) {
			console.error("Signup error:", error);
			throw error;
		}
	},
	checkLoginStatus: async () => {
		try {
			set({ isLoading: true });
			const { userId } = await checkLogin();
			set({ userId });
		} catch (error) {
			console.error("Error checking login status:", error);
			throw error;
		} finally {
			set({ isLoading: false });
		}
	},
	initialize: async () => {
		await useAuth.getState().checkLoginStatus();
	},
}));
useAuth.getState().checkLoginStatus();
