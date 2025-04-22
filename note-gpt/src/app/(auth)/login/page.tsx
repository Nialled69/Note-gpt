import React from 'react'
import {LoginForm} from "./components/LoginForm"

const LoginPage =() =>{
    return(
        <div className="flex h-svh items-center justify-center">
            <div className="w-full max-w-md px-6">
                <LoginForm />
            </div>
        </div>
    )
}
export default LoginPage