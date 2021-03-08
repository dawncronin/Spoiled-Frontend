import React from 'react'

import SignUpForm from '../components/sign-up-form'
import SignInForm from '../components/sign-in-form'

import './sign-in-page.styles.css'

export default function SignIn(props) {
    return (
        <div className='sign-in-page'>
            <SignInForm/>
            <SignUpForm history={props.history}/>
        </div>
    )
}