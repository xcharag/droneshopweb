import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { VALIDATE_TOKEN } from './query';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [userType, setUserType] = useState(null);
    const [validateToken] = useLazyQuery(VALIDATE_TOKEN);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = localStorage.getItem('token');
                const seller = JSON.parse(localStorage.getItem('seller'));
                const client = JSON.parse(localStorage.getItem('client'));

                if (token) {
                    const { data } = await validateToken({
                        context: {
                            headers: {
                                Authorization: token,
                            },
                        },
                    });
                    setIsAuthorized(data?.validateToken?.status || false);
                    setUserType(seller ? 'SELLER' : client ? 'CLIENT' : null);
                } else {
                    setIsAuthorized(false);
                }
            } catch (err) {
                console.error(err);
                setIsAuthorized(false);
            }
        };
        checkToken();
    }, [validateToken]);

    const value = { isAuthorized, userType, setIsAuthorized, setUserType };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
