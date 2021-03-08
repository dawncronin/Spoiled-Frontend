import React from 'react'

import './form-input.styles.css'

const FormInput = (props) => {
    return (
        <div className={`form-input ${props.class}`}>
            <label>{props.label}</label>
            <input type={props.type} value={props.value} onChange={props.handleChange} name={props.name} placeholder={props.placeholder}/>
        </div>
    )
}


export default FormInput