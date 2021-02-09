import React from 'react'

const FormInput = (props) => {
    return (
        <div>
            <label>{props.label}</label>
            <input type={props.type} onChange={props.handleChange} name={props.name}/>
        </div>
    )
}


export default FormInput