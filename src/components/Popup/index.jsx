import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../../Contexts/AuthProvider';
import './styles.scss';

export default function Popup(props) {
    const { token, setToken, handleLogin } = useContext(Context);

    return props.trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close">close</button>
                <div className="message">{props.message}</div>
            </div>
        </div>
    ) : (
        ''
    );
}
