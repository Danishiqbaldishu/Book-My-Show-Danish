import { useState } from "react";

const SignInForm = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [signInClicked, setSignInClicked] = useState(false); // State to trigger re-render
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      setPasswordError("Password is required");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const validateUsername = (value) => {
    if (!value.trim()) {
      setUsernameError("Username is required");
    } else {
      setUsernameError("");
    }
  };

  const handleSignIn = () => {
    // Validate email, username, and password
    validateEmail(email);
    validatePassword(password);
    validateUsername(username);

    // Check if there are any errors
    if (!emailError && !passwordError && !usernameError) {
      // Perform sign-in logic here
      // For simplicity, let's just save the email, username, and password to local storage
      localStorage.setItem("email", email);
      localStorage.setItem("username", username);
      // You might want to encrypt the password before storing it in local storage for security reasons
      localStorage.setItem("password", password);
      // Close the modal after sign-in
      closeModal();
      // Set login status to true
      setIsLoggedIn(true);
      // Trigger re-render by updating state
      setSignInClicked(true);
    }
  };

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    // Set login status to false
    setIsLoggedIn(false);
    // Trigger re-render by updating state
    setSignInClicked(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={(e) => validateUsername(e.target.value)}
        placeholder="Username"
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(e) => validateEmail(e.target.value)}
        placeholder="Email"
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
      {emailError && <div className="text-red-500">{emailError}</div>}
     
      {usernameError && <div className="text-red-500">{usernameError}</div>}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={(e) => validatePassword(e.target.value)}
        placeholder="Password"
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
      {passwordError && <div className="text-red-500">{passwordError}</div>}
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default SignInForm;
