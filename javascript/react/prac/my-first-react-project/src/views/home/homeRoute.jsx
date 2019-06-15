import React from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import MyNavLink from '../../components/router/router-mynav/router-mynav'
import NewsRoute from '../news/newsRoute'
import MessageRoute from '../message/messageRoute'
export default function AboutRoute(){
        return (
            <div>
                <h1>Home组件内容</h1>
                <ul className="nav nav-tabs">
                    <li><MyNavLink to="/home/news">News</MyNavLink></li>
                    <li><MyNavLink to="/home/Message">Message</MyNavLink></li>
                </ul>
                <Switch>
                    <Route path="/home/news" component={NewsRoute}></Route>
                    <Route path="/home/Message" component={MessageRoute}></Route>
                    <Redirect to="/home/news"></Redirect>
                </Switch>
            </div>
        )
} 