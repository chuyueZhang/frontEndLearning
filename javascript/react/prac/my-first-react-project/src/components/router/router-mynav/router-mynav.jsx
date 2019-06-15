import React from 'react'
import {NavLink} from 'react-router-dom'
import './mynav.css'
export default function MyNavLink(props){
        return (
            <NavLink activeClassName="myActive" {...props}></NavLink>
        )
}