import React, { useEffect } from 'react'
import { GoogleButton } from 'react-google-button'
import { UserAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

function Signin() {

    const { googleSignIn, user } = UserAuth();

    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user.accessToken) {
            navigate("/")
        }
    })

    return (
        <div>
            <GoogleButton onClick={handleGoogleSignIn} />
        </div>
    )
}

export default Signin
