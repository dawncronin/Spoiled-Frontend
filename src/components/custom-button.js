import React from 'react'

const CustomButton = (props) => {
    return (
        <button className="btn" onClick={props.handleClick}>
            {props.text}
        </button>
    )
}


export default CustomButton