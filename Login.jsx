import "../styling/Login.css";
import { useState } from "react";

function Login({ users, onLogin }) {
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const clearMessages = () => {
        setError("");
        setSuccessMessage("");
    };

    const switchToLogin = () => {
        setIsRegisterMode(false);
        clearMessages();
    };

    const switchToRegister = () => {
        setIsRegisterMode(true);
        clearMessages();
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        clearMessages();

        if (!username.trim() || !password.trim()) {
            setError("Please enter a username and password");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username.trim(),
                    password: password.trim()
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Invalid username or password");
                return;
            }

            onLogin(data.user);
        } catch (err) {
            setError("Server Error");
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        clearMessages();

        if (!username.trim() || !password.trim()) {
            setError("Please enter a new username and password");
            return;
        }

        const usernameExists = users?.some(
            (user) => user.username?.toLowerCase() === username.trim().toLowerCase()
        );

        if (usernameExists) {
            setError("Username already exists");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username.trim(),
                    password: password.trim(),
                    role: "user"
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Could not create account");
                return;
            }

            setUsername("");
            setPassword("");
            setSuccessMessage("Account created successfully. You can now log in.");
            setIsRegisterMode(false);
        } catch (err) {
            setError("Server Error");
        }
    };

    return (
        <div id="loginPage">
            <form
                id="loginForm"
                onSubmit={isRegisterMode ? handleRegisterSubmit : handleLoginSubmit}
            >
                <h2 id="loginHeader">
                    {isRegisterMode ? "Create Account" : "CodeSchool"}
                </h2>

                <p id="loginSubtext">
                    {isRegisterMode
                        ? "Create a new username and password"
                        : "DuoLingo for Coding"}
                </p>

                <span className="loginField">
                    <label htmlFor="username">
                        {isRegisterMode ? "New Username" : "Username"}
                    </label>
                    <input
                        type="text"
                        id="username"
                        placeholder={isRegisterMode ? "Create username" : "Enter username"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </span>

                <span className="loginField">
                    <label htmlFor="password">
                        {isRegisterMode ? "New Password" : "Password"}
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder={isRegisterMode ? "Create password" : "Enter password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </span>

                <div id="loginButtons">
                    <button className="loginButton" type="submit">
                        {isRegisterMode ? "Create Account" : "Login"}
                    </button>
                </div>

                <div id="modeSwitch">
                    {isRegisterMode ? (
                        <p>
                            Already have an account?{" "}
                            <button
                                type="button"
                                className="switchButton"
                                onClick={switchToLogin}
                            >
                                Back to Login
                            </button>
                        </p>
                    ) : (
                        <p>
                            New here?{" "}
                            <button
                                type="button"
                                className="switchButton"
                                onClick={switchToRegister}
                            >
                                Create Account
                            </button>
                        </p>
                    )}
                </div>

                {error && <p id="errorMessage">{error}</p>}
                {successMessage && <p id="successMessage">{successMessage}</p>}
            </form>
        </div>
    );
}

export default Login;
