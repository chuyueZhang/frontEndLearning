import React, {Component} from 'react'
import CommentAdd from '../comment-add/comment-add'
import CommentList from '../comment-list/comment-list'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import './comment-app.css'

import {getCommentAsync} from '../../../redux/actions'
class App extends Component{
    constructor(props){
        super(props)
        //普通方式保存状态
        // this.state = {
        //     comments:[
        //     {username: 'tom', comment: 'hahahaha'},
        //     {username: 'jack', comment: 'xixixixxi'}]
        // }
    }
    static propTypes = {
        getCommentAsync: PropTypes.func.isRequired
    }
    // addComment = (comment)=>{
    //     const {comments} = this.state
    //     comments.unshift(comment)
    //     this.setState({comments})
    // }
    // deleteComment = (index)=>{
    //     const {comments} = this.state
    //     comments.splice(index, 1)
    //     this.setState({comments})
    // }
    componentDidMount(){
        const comments = [
                {username: 'tom', comment: 'hahahaha'},
                {username: 'jack', comment: 'xixixixxi'}]
        this.props.getCommentAsync(comments)
    }
    render(){
        return (
            <div className="container-fluid">
                <header><h1 className="container">react comment</h1></header>
                <div className="container">
                    <div className="row">
                        {/* <CommentAdd addComment={this.addComment}/>
                        <CommentList comments={this.state.comments} deleteComment={this.deleteComment}/> */}
                        <CommentAdd/>
                        <CommentList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {getCommentAsync})(App)