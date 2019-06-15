import React, {Component} from 'react'
import {connect} from 'react-redux'
import propTypes from 'prop-types'

import './comment-add.css'
import {addComment} from '../../../redux/actions'
class CommentAdd extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            comment: ''
        }
    }
    static propTypes = {
        addComment: propTypes.func.isRequired
    }
    handleSubmit = (e)=>{
        this.props.addComment(this.state)
        this.setState({
            username: '',
            comment: ''
        })
        e.preventDefault()
    }
    handleChange = (e)=>{
        let comment = this.state
        comment[e.target.id] = e.target.value
        this.setState(comment)
    }
    render(){
        return (
            <div className="col-xs-12 col-md-5">
                <form action="/">
                    <div className="form-group">
                        <label htmlFor="username">用户名</label>
                        <input type="text" className="form-control" id="username" placeholder="用户名" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">评论内容</label>
                        <textarea className="form-control" rows="6" id="comment" placeholder="评论内容" onChange={this.handleChange}></textarea>
                    </div>
                    <button className="btn btn-default" onClick={this.handleSubmit}>提交</button>
                </form>
            </div>
        )
    }
}

export default connect(null, {addComment})(CommentAdd)