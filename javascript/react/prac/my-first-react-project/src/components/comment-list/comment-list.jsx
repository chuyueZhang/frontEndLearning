import React, {Component} from 'react'
import propTypes from 'prop-types'
import CommentItem from '../comment-item/comment-item'

import './comment-list.css'
class CommentList extends Component{
    constructor(props){
        super(props)
    }
    static propTypes = {
        comments: propTypes.array.isRequired,
        deleteComment: propTypes.func.isRequired
    }
    render(){
        const display = this.props.comments.length === 0 ? 'block' : 'none'
        return (
            <div className="col-xs-12 col-md-7">
                <h2>评论回复:</h2>
                <h3 style={{display}}>暂无评论，点击左侧添加！！</h3>
                {this.props.comments.map((item, index)=>{
                    return <CommentItem comment={item} key={index} deleteComment={this.props.deleteComment}/>
                })}
            </div>
        )
    }
}

export default CommentList