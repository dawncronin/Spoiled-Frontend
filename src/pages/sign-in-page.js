import React from 'react'

import SignUpForm from '../components/sign-up-form'
import SignInForm from '../components/sign-in-form'

export default function SignIn(props) {
    return (
        <div>
            Sign IN or Sign UPPP
            <SignUpForm history={props.history}/>
            <SignInForm/>
        </div>
    )
}