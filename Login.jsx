import "../styling/Login.css";
import { useState } from "react";

function Login({ users, onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

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

    const handleRegister = async () => {
        setError("");
        setSuccessMessage("");

        if (!username.trim() || !password.trim()) {
            setError("Please enter a username and password");
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
            const res = await fetch("http://localhost:5000/users", {
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
        } catch (err) {
            setError("Server Error");
        }
    };

    return (
        <div id="loginPage">
            <form id="loginForm" onSubmit={handleSubmit}>
                <h2 id="loginHeader">Code-School Login:</h2>

                <span className="loginField">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </span>

                <span className="loginField">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </span>

                <div id="loginButtons">
                    <button className="loginButton" type="submit">
                        Login
                    </button>
                    <button
                        className="loginButton"
                        type="button"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </div>

                {error && <p id="errorMessage">{error}</p>}
                {successMessage && <p id="successMessage">{successMessage}</p>}
            </form>
        </div>
    );
}

export default Login;
