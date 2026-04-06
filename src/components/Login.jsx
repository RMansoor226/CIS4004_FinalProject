import "../styling/Login.css";
import { useState } from "react";

function Login({ users, onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const foundUser = users.find(
            (user) =>
                user.username === username.trim() &&
                user.password === password.trim()
        );

        if (!foundUser) {
            setError("Invalid username or password");
            return;
        }

        setError("");
        onLogin(foundUser);
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

                <button id="loginButton" type="submit">
                    Login
                </button>

                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default Login;
