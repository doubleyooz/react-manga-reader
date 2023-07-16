import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './styles.scss';

import { Context } from '../../contexts/AuthProvider';
import api from '../../services/api';

require('dotenv').config();

const Reader = (props) => {
    const { token, handleLogin } = useContext(Context);

    const navigator = useNavigate();

    const { manga_title, chapter_number } = useParams();

    const chapter = useRef({ imgCollection: [] });

    const notInitialRender = useRef(false);

    const [manga, setManga] = useState({ chapters: [] });
    const [currentPage, setCurrentPage] = useState(0);
    const [currentChapter, setCurrentChapter] = useState(chapter_number - 1);
    const [loading, setLoading] = useState(true);

    const [vertical, setVertical] = useState(false);

    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        async function usingProps() {
            console.log('using Props');
            setManga(props.location.state.manga);
            getChapterData(props.location.state.manga.chapters[currentChapter]);
        }

        async function getChapterData(id) {
            console.log('get chapter data');
            setLoading(true);

            api.get(`chapter/index?chapter_id=${id}`, config)
                .then((c) => {
                    if (c.data !== null) {
                        chapter.current = c.data.data;
                        setCurrentChapter(c.data.data.number - 1);

                        console.log('list pages well succeed');
                    } else {
                        console.log('list pages failed');
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    console.log('list pages failed');
                    setLoading(false);
                });
        }

        async function getMangaData() {
            console.log('get manga data');

            api.get(`manga/index?title=${manga_title}`, config)
                .then((result) => {
                    if (result.data !== null) {
                        setManga(result.data.data[0]);

                        console.log('chapter list successfuly retrieved');
                        getChapterData(
                            result.data.data[0].chapters[currentChapter]
                        );
                    } else {
                        console.log('chapter list retrieve failed');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    console.log('chapter list retrieve failed');
                });
        }

        async function fetchData() {
            notInitialRender.current
                ? getChapterData(manga.chapters[currentChapter])
                : props.location.state
                ? usingProps()
                : getMangaData();
        }
        fetchData();
    }, [currentChapter]); // <-- empty dependency array

    function nextChapter() {
        let f1 = function () {
            console.log(currentChapter);
            navigator(
                `/Manga/${manga_title}/${
                    currentChapter + 1 >= manga.chapters.length
                        ? manga.chapters.length
                        : currentChapter + 2
                }`
            );
            notInitialRender.current = true;
            setCurrentChapter(currentChapter + 1);
            setCurrentPage(0);
            return null;
        };

        if (currentChapter === manga.chapters.length - 1) {
            console.log('last chapter reached');
        } else {
            console.log(loading);
            !loading ? f1() : console.log(currentChapter);
        }
    }

    function prevChapter() {
        let f1 = function () {
            console.log(currentChapter);
            navigator(
                `/Manga/${manga_title}/${
                    currentChapter - 1 <= 0 ? 1 : currentChapter
                }`
            );
            notInitialRender.current = true;
            setCurrentChapter(currentChapter - 1);
            setCurrentPage(0);
            return null;
        };

        if (currentChapter === 0) {
            console.log('first chapter reached');
        } else {
            console.log(loading);
            !loading ? f1() : console.log(currentChapter);
        }
    }

    function nextPage() {
        if (currentPage === chapter.current.imgCollection.length - 1) {
            console.log('last page reached');
        } else {
            setCurrentPage(currentPage + 1);
        }
    }

    function prevPage() {
        if (currentPage === 0) {
            console.log('first page reached');
        } else {
            setCurrentPage(currentPage - 1);
        }
    }

    function useKey(key, cb) {
        const callbackRef = useRef(cb);

        useEffect(() => {
            callbackRef.current = cb;
        });

        useEffect(() => {
            function handle(event) {
                if (event.code === key) {
                    callbackRef.current(event);
                }
            }
            document.addEventListener('keydown', handle);
            return () => document.removeEventListener('keydown', handle);
        }, [key]);
    }

    useKey('ArrowRight', () => nextPage());
    useKey('ArrowLeft', () => prevPage());
    return (
        <>
            <div className="reader">
                <div className="header-board">
                    <div className="left">
                        <div
                            className="button"
                            onClick={() => setVertical(!vertical)}
                        >
                            {vertical ? (
                                <span>horizontal</span>
                            ) : (
                                <span>vertical</span>
                            )}
                        </div>
                    </div>
                    <div className="center">
                        <div
                            className="title"
                            onClick={() =>
                                navigator(
                                    `/Manga/${manga_title.replace(' ', '%20')}`
                                )
                            }
                        >
                            <h2>{manga_title}</h2>
                        </div>

                        <div className="controllers">
                            <button
                                className="button"
                                onClick={() => prevChapter()}
                            >
                                ◄◄
                            </button>
                            <div className="chapters">
                                {' '}
                                Chapter #0{chapter_number}{' '}
                            </div>
                            <button
                                className="button"
                                onClick={() => nextChapter()}
                            >
                                ►►
                            </button>
                        </div>
                    </div>
                    <div className="right">
                        {!vertical ? (
                            <div className="controllers">
                                <button
                                    className="button"
                                    onClick={() => prevPage()}
                                >
                                    ◄
                                </button>
                                <div className="pages-list">
                                    Page {currentPage}
                                </div>
                                <div className="version"></div>
                                <div className="viewToggle"></div>
                                <button
                                    className="button"
                                    onClick={() => nextPage()}
                                >
                                    ►
                                </button>
                            </div>
                        ) : (
                            <div
                                className="controllers"
                                style={{ width: '10%', minWidth: '80px' }}
                            >
                                {' '}
                            </div>
                        )}
                    </div>
                </div>

                <div className="board">
                    {chapter.current ? (
                        vertical ? (
                            chapter.current.imgCollection.map((page, index) => (
                                //<img src= {`http://localhost:3333/files/${post.image}`} alt= "post"/>
                                <img
                                    src={
                                        process.env.REACT_APP_SERVER +
                                        manga_title +
                                        '/' +
                                        chapter.current.number +
                                        '/' +
                                        page.filename
                                    }
                                    key={page.filename + index}
                                    alt={page.originalname}
                                />
                            ))
                        ) : (
                            chapter.current.imgCollection.map((page, index) => (
                                //<img src= {`http://localhost:3333/files/${post.image}`} alt= "post"/>
                                <img
                                    src={
                                        process.env.REACT_APP_SERVER +
                                        manga_title +
                                        '/' +
                                        chapter.current.number +
                                        '/' +
                                        page.filename
                                    }
                                    key={page.filename + index}
                                    alt={page.originalname}
                                    style={
                                        index === currentPage
                                            ? {}
                                            : { display: 'none' }
                                    }
                                    onClick={() => nextPage()}
                                />
                            ))
                        )
                    ) : (
                        <div>no data</div>
                    )}
                </div>
                <div
                    className="footer-reader"
                    style={!vertical ? {} : { display: 'none' }}
                >
                    <button className="comments" onClick={() => {}}>
                        comments
                    </button>
                    <div className="rate">
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label for="star5" title="text">
                            ★
                        </label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label for="star4" title="text">
                            ★
                        </label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label for="star3" title="text">
                            ★
                        </label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label for="star2" title="text">
                            ★
                        </label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label for="star1" title="text">
                            ★
                        </label>
                    </div>
                    <button className="report" onClick={() => {}}>
                        !!
                    </button>
                    <div className="zoom">zoom</div>
                </div>
            </div>
        </>
    );
};

export default Reader;
