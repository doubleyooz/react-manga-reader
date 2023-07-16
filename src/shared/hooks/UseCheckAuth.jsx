import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthProvider';

const useCheckAuth = () => {
    const { userData } = useContext(AuthContext);
    console.log(useContext(AuthContext));

    const nav = useNavigate();

    useEffect(() => {
        console.log(userData);
        if (userData.token) {
            nav('/');
        } else {
            nav('/sign-in')
        }
    }, [nav, userData]);
    console.log(userData);
    return userData.token;
};

export { useCheckAuth };