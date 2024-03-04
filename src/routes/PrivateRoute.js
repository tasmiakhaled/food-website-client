import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div class="d-flex justify-content-center">
        <div class="spinner-border text-danger mb-5 mt-5" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    }

    if (user && user.uid) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location}} replace></Navigate>;
};

export default PrivateRoute;