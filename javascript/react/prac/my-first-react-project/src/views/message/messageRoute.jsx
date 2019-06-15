import React, {Component} from 'react'
import {Link, Switch, Route} from 'react-router-dom'

import DetailsRoute from '../details/detailsRoute'
export default class MessageRoute extends Component{
    constructor(props){
        super(props)
        this.state = {
            arr: []
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                arr: ['news001', 'news002', 'news003']
            })
        }, 1000)
    }
    handlePush=(id)=>{
        this.props.history.push('/home/message/'+id)
    }
    handleReplace=(id)=>{
        this.props.history.replace('/home/message/'+id)
    }
    handleForward=(id)=>{
        this.props.history.goForward()
    }
    handleBack=(id)=>{
        this.props.history.goBack()
    }
    render(){
        return (
            <div>
                <ul>
                    {this.state.arr.map((item, index)=>{
                        return <li key={index}><Link to={"/home/message/"+(index+1)}>{item}</Link><button className="btn btn-default btn-sm" onClick={()=>{this.handlePush(index+1)}}>push查看</button><button className="btn btn-default btn-sm" onClick={()=>{this.handleReplace(index+1)}}>replace查看</button></li>
                    })}
                </ul>
                <hr/>
                <Switch>
                    <Route path="/home/message/:id" component={DetailsRoute}></Route>
                </Switch>
                <button className="btn btn-default btn-sm" onClick={this.handleForward}>前进</button>
                <button className="btn btn-default btn-sm" onClick={this.handleBack}>后退</button>
            </div>
        )
    }
} 