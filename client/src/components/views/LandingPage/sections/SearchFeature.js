import React,{useState} from 'react'
import {Input} from 'antd'
const {Search} = Input;


function SearchFeature(props) {
const [SearchTerm,SetSearchTerm] = useState('')

    const onSearch=(event)=>{
        SetSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    return (
        <div>
        <Search value={SearchTerm}
                 onChange={onSearch}
                 placeholder="type your search"
                 />

        </div>
    )
}

export default SearchFeature
