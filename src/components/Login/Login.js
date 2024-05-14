// Login.js
import React from "react";
import SignInForm from "./SignInForm";

const Login = ({ onClose, onSignIn }) => {
  return (
    <div>
      <h2>Login</h2>
      <SignInForm onClose={onClose} onSignIn={onSignIn} />
    </div>
  );
};

export default Login;
