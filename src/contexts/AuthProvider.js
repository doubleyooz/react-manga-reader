import React, { createContext, useState, useEffect } from 'react';

//import useAuth from './hooks/useAuth';
import api from '../services/api';

const Context = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(undefined);
    const [loading, setLoading] = useState(true);

    async function handleLogin() {
        let config = {
            auth: {
                username: 'itachiut1r4@gmail.com',
                password: 'Lucarneiro@0009',
            },
        };

        await api
            .get('sign-in', config)
            .then(async (response) => {
                const accessToken =
                    await response.data.metadata.token.toString();
                setToken(accessToken);
            })
            .catch((err) => {
                console.log(err);
                setToken(undefined);
            });
    }

    /* const {
    authenticated, loading, handleLogin, handleLogout,
    } = useAuth();*/

    return (
        <Context.Provider value={{ token, setToken, handleLogin }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };
