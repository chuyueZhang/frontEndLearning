import React, {Component} from 'react'

export default class NewsRoute extends Component{
    constructor(props){
        super(props)
        this.state = {
            arr: ['news001', 'news002', 'news003']
        }
    }
    render(){
        return (
            <div>
                <ul>
                    {this.state.arr.map((item, index)=>{
                        return <li key={index}>{item}</li>
                    })}
                </ul>
            </div>
        )
    }
} 