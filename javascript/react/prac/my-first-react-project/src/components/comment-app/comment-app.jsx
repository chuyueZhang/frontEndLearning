import React, {Component} from 'react'
import CommentAdd from '../comment-add/comment-add'
import CommentList from '../comment-list/comment-list'
import './comment-app.css'
class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            comments:[
            {username: 'tom', comment: 'hahahaha'},
            {username: 'jack', comment: 'xixixixxi'}]
        }
    }
    addComment = (comment)=>{
        const {comments} = this.state
        comments.unshift(comment)
        this.setState({comments})
    }
    deleteComment = (index)=>{
        const {comments} = this.state
        comments.splice(index, 1)
        this.setState({comments})
    }
    render(){
        return (
            <div className="container-fluid">
                <header><h1 className="container">react comment</h1></header>
                <div className="container">
                    <div className="row">
                        <CommentAdd addComment={this.addComment}/>
                        <CommentList comments={this.state.comments} deleteComment={this.deleteComment}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App