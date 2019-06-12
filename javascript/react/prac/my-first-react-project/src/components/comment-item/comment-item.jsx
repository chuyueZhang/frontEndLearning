import React, {Component} from 'react'
import propTypes from 'prop-types'

import './comment-item.css'

export class CommentItem extends Component{
    constructor(props){
        super(props)
    }
    static propTypes = {
        comment: propTypes.object.isRequired,
        deleteComment: propTypes.func.isRequired
    }
    handleDelete = ()=>{
        if(window.confirm(`真的要删除${this.props.comment.username}的评论吗？`)){
            this.props.deleteComment(this.props.key)
        }
    }
    render(){
        return (
            <div className="item">
                <h3>{this.props.comment.username}说:</h3>
                <div>{this.props.comment.comment}</div>
                <button className="btn btn-default btn-sm" onClick={this.handleDelete}>删除</button>
            </div>
        )
    }
}

export default CommentItem