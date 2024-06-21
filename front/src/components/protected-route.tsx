import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: FC = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
