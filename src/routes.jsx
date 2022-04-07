import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Reader from './pages/Reader';
import ActivateAccount from './pages/ActivateAccount';
import Home from './pages/Home';
import Manga from './pages/Manga';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';

import HorizontalMenu from './components/Menu/Horizontal';

export default function Routes() {
    return (
        <div className="routes-container">
            <BrowserRouter>
                <HorizontalMenu />
                <Switch>
                    <Route exact path="/" component={Home} />

                    <Route path="/manga/:manga_title" exact component={Manga} />
                    <Route
                        path="/manga/:manga_title/:chapter_number"
                        exact
                        component={Reader}
                    />
                    <Route
                        path="/activateaccount/:token"
                        exact
                        component={ActivateAccount}
                    />
                    <Route path="/search" exact component={Search} />
                    <Route path="/signin" exact component={Login} />
                    <Route path="/signup" exact component={Register} />
                    <Route path="/user" exact component={User} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}
