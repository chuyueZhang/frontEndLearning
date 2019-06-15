import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {increment, decrement, incrementAsync} from '../../../redux/actions'
import {connect} from 'react-redux'
class App extends Component{
     constructor(props){
         super(props)
         // 通过props来管理状态
        //  this.state = {
        //      count: 0
        //  }
     }
     static propTypes = {
         count: PropTypes.number.isRequired,
         increment: PropTypes.func.isRequired,
         decrement: PropTypes.func.isRequired,
         incrementAsync: PropTypes.func.isRequired
     }
     increment = ()=>{
         // 通过props来管理状态
        // const count = this.select.value*1 + this.state.count
        // this.setState({
        //     count
        // })
        //通过纯redux来管理状态
        this.props.increment(this.select.value*1)
     }
     decrement = ()=>{
         // 通过props来管理状态
        // const count = this.select.value*1 - this.state.count
        // this.setState({
        //     count
        // })
        //通过纯redux来管理状态
        // this.props.store.dispatch(decrement(this.select.value*1))
        //通过react-redux来管理
        this.props.decrement(this.select.value*1)
    }
    incrementWhenOdd = ()=>{
        // if(this.select.value%2===0) return
        // 通过props来管理状态
        // const count = this.select.value*1 + this.state.count
        // this.setState({
        //     count
        // })
        //通过纯redux来管理状态
        if(this.props.count%2===0) return
        this.props.increment(this.select.value*1)
    }
    incrementAsync = ()=>{
        //  setTimeout(()=>{
        //      this.increment()
        //  }, 1000)
        this.props.incrementAsync(this.select.value*1)
    }
     render(){
         return (
             <div>
                 <h3>count: {this.props.count}</h3>
                 <select name="number" id="number" ref={(select)=>this.select=select}>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                 </select>
                 <button onClick={this.increment}>+</button>
                 <button onClick={this.decrement}>-</button>
                 <button onClick={this.incrementWhenOdd}>increment when odd</button>
                 <button onClick={this.incrementAsync}>increment async</button>
             </div>
         )
     }
 }
export default connect(state=>({count: state.counter}), {increment, decrement, incrementAsync})(App)