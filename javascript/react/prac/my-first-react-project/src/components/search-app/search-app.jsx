import React, {Component} from 'react' 
import {subscribe} from 'pubsub-js'
import Main from '../search-main/search-main'
import Content from '../search-content/search-content'

export default class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            initPage: true,
            include: false,
            loading: false,
            users: [] 
        }
        subscribe('search', (msg, data)=>{
            this.setState({
                initPage: false,
                loading: true
            })
            fetch(`https://api.github.com/search/users?q=${data.username}`)
            .then(res=>{
                return res.json()
            }).then(data=>{
                console.log(data)
                this.setState({
                    loading: false,
                    include: data.items.length!==0,
                    users: data.items.map((item, index)=>{
                        return {url: item.avatar_url, username: item.login, userurl: item.html_url}
                    })
                })
            })
        })
    }
    render(){
        return (
            <div className="container">
                <Main />
                <Content {...(this.state)}/>
            </div>
        )
    }
}