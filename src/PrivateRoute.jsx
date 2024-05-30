// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element, allowedRoles }) => {
    const { isAuthorized, userType } = useAuth();

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    // eslint-disable-next-line react/prop-types
    return isAuthorized && allowedRoles.includes(userType) ? element : <Navigate to="/" />;
};

export default PrivateRoute;
