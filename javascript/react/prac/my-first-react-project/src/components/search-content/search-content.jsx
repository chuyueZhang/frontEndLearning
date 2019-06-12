import React, {Component} from 'react' 
import PropTypes from 'prop-types'
import './search-content.css'
export default class Content extends Component{
    constructor(props){
        super(props)
    }
    static propTypes = {
        initPage: PropTypes.bool.isRequired,
        include: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        users: PropTypes.array.isRequired
    }
    render(){
        if(this.props.initPage){
            return <div className="row">请输入用户名进行搜索！</div>
        }else if(this.props.loading){
            return <div>loading...</div>
        }else if(this.props.include){
            return (
                <section className="row">
                    {this.props.users.map((item, index)=>{
                        return (
                            <div className="col-xs-12 col-md-3" key={index}>
                                <div className="thumbnail">
                                    <img src={item.url} alt={item.username} style={{width: '100px', height: '100px'}}/>
                                    <div className="caption text-center">
                                        <p><a href={item.userurl}>{item.username}</a></p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>
            )
        }else{
            return <div className="row">没有搜索到用户，请重新搜索！</div>
        }
        
    }
}
