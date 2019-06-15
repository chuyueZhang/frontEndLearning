import React from 'react'
const arr = [{id: 1, title: 'news001', content: 'i love u'},
{id: 2, title: 'news002', content: 'i love uu'},
{id: 3, title: 'news003', content: 'i love uuu'}]
export default function AboutRoute(props){
        const obj = arr.find((item)=>{
            return parseInt(props.match.params.id) === item.id
        })
        return (
            <ul>
                <li>{obj.id}</li>
                <li>{obj.title}</li>
                <li>{obj.content}</li>
            </ul>
        )
} 