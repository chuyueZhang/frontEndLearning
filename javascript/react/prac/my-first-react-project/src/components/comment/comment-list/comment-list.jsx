import React, {Component} from 'react'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import CommentItem from '../comment-item/comment-item'

import './comment-list.css'
class CommentList extends Component{
    constructor(props){
        super(props)
    }
    //普通props方式
    // static propTypes = {
    //     comments: propTypes.array.isRequired,
    //     deleteComment: propTypes.func.isRequired
    // }
    //redux方式
    static propTypes = {
        comments: propTypes.array.isRequired
    }
    render(){
        const display = this.props.comments.length === 0 ? 'block' : 'none'
        return (
            <div className="col-xs-12 col-md-7">
                <h2>评论回复:</h2>
                <h3 style={{display}}>暂无评论，点击左侧添加！！</h3>
                {this.props.comments.map((item, index)=>{
                    // return <CommentItem comment={item} key={index} deleteComment={this.props.deleteComment}/> //普通props方式
                    return <CommentItem comment={item} key={index} index={index}/>
                })}
            </div>
        )
    }
}

export default connect(state=>({comments: state.comments}))(CommentList)