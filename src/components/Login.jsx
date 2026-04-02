import "../styling/Login.css"

// React component to build login page form
function Login(props) {
    return (
        <div id={"loginPage"}>
            <form id={"loginForm"}>
                <h2 id={"loginHeader"}>Code-School Login:</h2>

                <span className={"loginField"}>
                    <label htmlFor={"username"}>Username</label>
                    <input type={"text"} id={"username"} name={"username"} placeholder={"Enter username"}/>
                </span>

                <span className={"loginField"}>
                    <label htmlFor={"password"}>Password</label>
                    <input type={"text"} id={"password"} name={"password"} placeholder={"Enter password"}/>
                </span>

                <button id={"loginButton"} type={"submit"} onClick={props.onLogin}>Login</button>
            </form>
        </div>
    );
}

export default Login;