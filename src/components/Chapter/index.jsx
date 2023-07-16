import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './styles.scss';

export default function Chapter(props) {
    const navigator = useNavigate();

    console.log(props.data);

    return (
        <div className="chapter-container">
            <div className="row">
                <div
                    className="box-1"
                    onClick={() =>
                        navigator(
                            `/Manga/${props.data.manga.title.replace(
                                ' ',
                                '%20'
                            )}/${props.data.chapter.number}`,
                            {
                                chapter: props.data.chapter,
                                manga: props.data.manga,
                            }
                        )
                    }
                >
                    <div className="number">{`Chapter ${props.data.chapter.number}: `}</div>
                    <div className="title">{props.data.chapter.title}</div>
                    <div className="date">{`28/05/2001`}</div>
                    {/*<div className="date">{`${props.data.chapter.updatedAt}`}</div> */}
                </div>

                <div className="box-2">
                    <h4>Scan_name</h4>
                </div>
            </div>
        </div>
    );
}
