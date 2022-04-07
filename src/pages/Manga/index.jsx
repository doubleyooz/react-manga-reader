import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import './styles.scss';

import { Context } from '../../contexts/AuthProvider';
import Chapter from '../../components/Chapter';
import api from '../../services/api';

require('dotenv').config();

const Manga = (props) => {
    const { token, handleLogin } = useContext(Context);

    const [chapters, setChapters] = useState([]);
    const [manga, setManga] = useState({});
    const [isSelected, setIsSelected] = useState('b');
    const [loading, setLoading] = useState(true);

    const { manga_title } = useParams();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        async function getMangaData() {
            console.log(manga_title);
            console.log(token);
            api.get(`manga/index?title=${manga_title}`, config)
                .then((response) => {
                    //setState({ feed: response.data });
                    if (response.data !== null) {
                        console.log('here');
                        console.log(response.data.data[0]);
                        setManga(response.data.data[0]);
                        console.log(manga);
                        console.log('get manga info well succeed');

                        api.get(`chapter/list?manga_id=${manga._id}`, config)
                            .then((response) => {
                                //setState({ feed: response.data });
                                if (response.data !== null) {
                                    console.log(response);
                                    console.log(response.data);
                                    console.log(response.data.data);

                                    setChapters(response.data.data);
                                    console.log('list chapters well succeed');
                                    setLoading(false);
                                } else {
                                    console.log('list chapters failed');
                                    setLoading(false);
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                console.log('list chapters failed');
                                setLoading(false);
                            });
                    } else {
                        console.log('get manga info failed');
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    console.log('get manga info failed');
                    setLoading(false);
                });
        }

        getMangaData();
    }, [loading]); // <-- empty dependency array

    function ResponsiveImage({ width, height }) {
        return (
            <div className="responsive-image">
                <div
                    className="resizer"
                    style={{
                        paddingBottom: `${(width / height) * 100}%`,
                    }}
                />
                <div
                    className="image"
                    style={{
                        backgroundImage: `url('${
                            process.env.REACT_APP_SERVER +
                            manga_title +
                            '/' +
                            manga.cover
                        }')`,
                        backgroundPosition: 'center center',
                    }}
                    alt={'cover'}
                />
                <div className="content" />
            </div>
        );
    }

    function renderStatus(param) {
        console.log(manga);
        switch (param) {
            case 0:
                return (
                    <>
                        <div
                            class="sign"
                            style={{ backgroundColor: 'green' }}
                        ></div>
                        <div>On going</div>
                    </>
                );

            case 1:
                return (
                    <>
                        <div
                            class="sign"
                            style={{ backgroundColor: 'blue' }}
                        ></div>
                        <div>Complete</div>
                    </>
                );

            case 2:
                return (
                    <>
                        <div
                            class="sign"
                            style={{ backgroundColor: 'red' }}
                        ></div>
                        <div>Dropped</div>
                    </>
                );

            default:
                return (
                    <>
                        <div
                            class="sign"
                            style={{ backgroundColor: 'gray' }}
                        ></div>
                        <div>Unknow</div>
                    </>
                );
        }
    }

    const styles = {
        display: {
            transform: 'scaleX(1)',
            transformOrigin: 'right',
            transition: '.25s',
        },
        no_display: {
            transform: 'scaleX(0)',
            transformOrigin: 'right',
            transition: '.25s',
        },
    };

    return (
        <>
            <div className="manga-board">
                <div className="card">
                    <ResponsiveImage width="1200" height="800" />
                </div>
                <div className="content-container">
                    <div className="header">
                        <div className="title">{manga_title}</div>
                        <div className="status">
                            {renderStatus(manga.status)}
                        </div>
                    </div>

                    <div className="toogler">
                        <span
                            className={
                                isSelected === 'a' ? 'selected' : 'not-selected'
                            }
                            onClick={() => setIsSelected('a')}
                        >
                            info
                        </span>
                        <span
                            className={
                                isSelected === 'b' ? 'selected' : 'not-selected'
                            }
                            onClick={() => setIsSelected('b')}
                        >
                            chapters
                        </span>
                        <span
                            className={
                                isSelected === 'c' ? 'selected' : 'not-selected'
                            }
                            onClick={() => setIsSelected('c')}
                        >
                            art
                        </span>
                    </div>

                    <div className="container">
                        <div
                            className="info"
                            style={
                                isSelected === 'a'
                                    ? { ...styles.display }
                                    : { ...styles.no_display }
                            }
                        >
                            <span>{manga.synopsis}</span>
                        </div>

                        <div
                            className="list"
                            style={
                                isSelected === 'b'
                                    ? { ...styles.display }
                                    : { ...styles.no_display }
                            }
                        >
                            {!loading ? (
                                chapters.length !== 0 ? (
                                    chapters.map((chapter, index) => (
                                        <div className="chapter">
                                            <Chapter
                                                data={{
                                                    chapter: chapter,
                                                    manga: manga,
                                                }}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div>No chapters to display</div>
                                )
                            ) : (
                                <div>Loading...</div>
                            )}
                        </div>

                        <div
                            className="art"
                            style={
                                isSelected === 'c'
                                    ? { ...styles.display }
                                    : { ...styles.no_display }
                            }
                        >
                            Art
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Manga;
