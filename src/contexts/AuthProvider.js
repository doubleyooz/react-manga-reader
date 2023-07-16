import { createContext, useState } from 'react';

import { signIn } from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({
    children,
}) => {
    const [userData, setUserData] = useState({
        name: null,
        token: null,
        email: null,
        _id: null,
        picture: null,
    });
    const [loading, setLoading] = useState(true);

    async function handleSignIn(email, password) {
        try {
            const authResponse = await signIn(email, password);

            console.log(authResponse);
            if (authResponse) {
                setUserData((prevState) => ({
                    ...prevState,
                    _id: authResponse.data.data._id,
                    token: authResponse.data.metadata.accessToken,
                }));
            } else throw new Error('Login failed');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const contextValue = {
        setUserData,
        signIn: handleSignIn,
        userData,
        loading,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;