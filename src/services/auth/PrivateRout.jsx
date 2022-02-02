import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const PrivateRoute = () => {
	const { currentUser } = useAuth();
	return currentUser ? <Outlet /> : <Navigate to='/loginadimin' />;
};

export default PrivateRoute;
