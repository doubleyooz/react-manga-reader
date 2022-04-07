import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import './styles.scss';

import api from '../../services/api';

export default function ActivateAccount() {
    const [response, setResponse] = useState('');
    let { token } = useParams();

    useEffect(() => {
        // Update the document title using the browser API
        api.post(`/authentication/activate/${token}`)
            .then((res) => {
                setResponse(res.data.message);
            })
            .catch((err) => {
                setResponse(err.message);
            });
    }, []);

    return (
        <>
            <div className="redirecting-container">
                <h1>Redirecting</h1>
                <div>{response}</div>;
            </div>
        </>
    );
}
