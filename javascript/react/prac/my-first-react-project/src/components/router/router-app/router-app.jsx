import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import MyNavLink from '../router-mynav/router-mynav'
import AboutRoute from '../../../views/about/aboutRoute'
import HomeRoute from '../../../views/home/homeRoute'
export default class App extends Component{
    render(){
        return (
            <div className="container">
                <header className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <h1 className="page-header">React Router Demo</h1>
                    </div>
                </header>
                <section className="row">
                    <div className="col-xs-offset-2 col-xs-2">
                        <div className="list-group">  
                            <MyNavLink className="list-group-item" to="/about">About</MyNavLink>
                            <MyNavLink className="list-group-item" to="/Home">Home</MyNavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <Switch>
                            <Route path="/about" component={AboutRoute}>
                            </Route>
                            <Route path="/Home" component={HomeRoute}>
                            </Route>
                            <Redirect to="/about"></Redirect>
                        </Switch>
                    </div>
                </section>
            </div>
        )
    }
} 