import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../api/auth/authContext";
function PrivateRoute(): React.ReactNode {
	const { userId, isLoading } = useAuth();
	const location = useLocation();

	if (isLoading) {
		return <div className="text-center">Loading...</div>;
	}

	return userId ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
}

export default PrivateRoute;
