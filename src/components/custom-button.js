import React from 'react'

import './custom-button.styles.css'
const CustomButton = (props) => {
    return (
        <button className={`btn ${props.class}`} onClick={props.handleClick}>
            {props.text}
        </button>
    )
}


export default CustomButton