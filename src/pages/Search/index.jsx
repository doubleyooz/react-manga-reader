import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import './styles.scss';

import { Context } from '../../contexts/AuthProvider';
import api from '../../services/api';

require('dotenv').config();

const Search = (props) => {
    const { token, loading, handleLogin } = useContext(Context);

    return (
        <>
            <div className="search">SEARCH</div>
        </>
    );
};

export default Search;
