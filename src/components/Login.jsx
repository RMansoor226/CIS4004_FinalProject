import "../styling/Login.css"
import { useState } from "react"

function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()

        const res = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })

        const data = await res.json()
        alert(data.message)
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })

        const data = await res.json()
        alert(data.message)

        if (data.message === "Login successful") {
            props.onLogin()
        }
    }

    return (
        <div id={"loginPage"}>
            <form id={"loginForm"}>
                <h2 id={"loginHeader"}>Code-School Login:</h2>

                <span className={"loginField"}>
                    <label htmlFor={"username"}>Username</label>
                    <input
                        type={"text"}
                        id={"username"}
                        name={"username"}
                        placeholder={"Enter username"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </span>

                <span className={"loginField"}>
                    <label htmlFor={"password"}>Password</label>
                    <input
                        type={"password"}
                        id={"password"}
                        name={"password"}
                        placeholder={"Enter password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </span>

                <button id={"loginButton"} type={"button"} onClick={handleLogin}>
                    Login
                </button>

                <button type={"button"} onClick={handleRegister}>
                    Register
                </button>
            </form>
        </div>
    )
}

export default Login