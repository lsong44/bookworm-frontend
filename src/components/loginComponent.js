import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../context/authContext";

const Login = () => {
    const { login } = useContext(AuthContext);

    const handleLoginSuccess = (response) => {
        login(response);
    };

    return (
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log('Login Failed')}
            render={renderProps => (
                <button className="btn btn-outline-success" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    Login with Google
                </button>
            )}
        />
    );
}

export default Login;