import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../context/authContext";
import { memberService } from '../services/memberService';
import { authService }  from "../services/authService";

const Login = () => {
    const { login } = useContext(AuthContext);

    const handleLoginSuccess = (response) => {
        login(response);
        let payload = authService.parseToken(response.credential);
        let name = payload.name;
        let email = payload.email;
        memberService.getMember(response.credential, name).then((member) => {
            if (member === null) {
            memberService.createMember(response.credential, name, email);
            }
        }).catch((error) => {
            console.error(`Error fetching member: ${name}`, error);
        });
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