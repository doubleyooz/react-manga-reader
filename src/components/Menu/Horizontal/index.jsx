import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import wordmark from '../../../assets/wordmark.svg';
import logo from '../../../assets/logo2.jpg';

import { useCheckAuth } from '../../../shared/hooks/UseCheckAuth';
import './styles.scss';

export default function Menu() {
    const [showOptions, setShowOptions] = useState(false);

    const { token, setToken, handleLogin } = useCheckAuth();

    return (
        <ul className="horizontal-navbar">
            <Link to="/">
                <img src={logo} alt="MangaReader" />
            </Link>

            <div className="menu">
                <button
                    className="profile"
                    onClick={() => setShowOptions(!showOptions)}
                ></button>

                {token ? (
                    <ul className={showOptions ? 'options-display' : 'options'}>
                        <Link to="/user">
                            <li>Profile</li>
                        </Link>
                        <li>Config</li>
                        <Link to="/">
                            <li onClick={() => setToken(undefined)}>Logout</li>
                        </Link>
                    </ul>
                ) : (
                    <ul className={showOptions ? 'options-display' : 'options'}>
                        <Link to="/signin">
                            <li>Login</li>
                        </Link>

                        <Link to="/signup">
                            <li>Create account</li>
                        </Link>
                    </ul>
                )}
            </div>
        </ul>
    );
}
