import React, {Component} from 'react' 
import {publish} from 'pubsub-js'
import './search-main.css'
export default class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: ''
        }
    }
    componentWillReceiveProps(newProps){
        
    }
    handleClick = ()=>{
        publish('search', this.state)
    }
    handleChange = (e)=>{
        const username = e.target.value
        this.setState({
            username
        })
    }
    render(){
        return (
            <div>
                <h2>search github users</h2>
                <div className="form-group">
                    <label htmlFor="username">username:</label>
                    <div className="form-inline">
                        <div className="form-group">
                            <input type="text" className="form-control unvarible-control" id="username" placeholder="username" onChange={this.handleChange}/>
                            <button className="btn btn-default" onClick={this.handleClick}>搜索</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}