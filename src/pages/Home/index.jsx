import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Context } from '../../contexts/AuthProvider';
import Manga from '../../components/Activity';
import api from '../../services/api';

import arrowLeft from '../../assets/arrow-left.png';

import './styles.scss';

export default function Home() {
    const { token, setToken, handleLogin } = useContext(Context);

    const mangas = useRef([]);

    const [update, setUpdate] = useState(false);
    const [fetch, setFetch] = useState(false);
    const [block, setBlock] = useState(0);
    //const [text, setText] = useState("")

    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        async function fetchData() {
            const userMock = {
                name: 'John Doe',
                email: 'johndoe@mail.com',
                password: 'secretPassWord',
                phone: '(88) 98888-8888',
                state: 'State of Tests',
                city: 'City of Tests',
            };
            api.get('/users/61b3561b3aee45a124a82725')
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });
            /*
            api.get('manga/list?recent=true')
                    .then(response => {

                        //setState({ feed: response.data });  
                        if (response.data !== null) {



                            let temp = response.data.data.map(item => {

                                return { uid: uuidv4(), ...item }
                            })

                            console.log(temp)

                            temp.forEach(element => {
                                mangas.current.push(
                                    <div className="manga-container" key={element.uid}>
                                        <Manga data={element} />
                                    </div>
                                )
                            });

                            setUpdate(!update)

                            console.log("list mangas well succeed")



                        } else {
                            console.log("list mangas failed")
                            return null
                        }

                    }).catch(err => {
                        console.log(err)
                        console.log("list mangas failed")
                        return null
                    })        
            */
        }
        fetchData();
    }, [fetch]); // <-- empty dependency array

    return (
        <>
            <div className="home-container">
                {/*token ? <div className="div">auth</div> : <div className="div">not auth</div>*/}

                <div className="last-updated">
                    <div className="header">
                        <h2>Lastest Update</h2>
                        <div className="next">
                            <img
                                src={arrowLeft}
                                onClick={() => setFetch(!fetch)}
                            />
                        </div>
                    </div>

                    <div className="box">
                        {mangas.current.length !== 0 ? (
                            mangas.current
                        ) : (
                            <div>no manga to be shown</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
