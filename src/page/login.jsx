import LoginImg from "./image2.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const savedUsers = localStorage.getItem("users");

        if (!savedUsers) {
            alert("No registered users found");
            return;
        }

        const users = JSON.parse(savedUsers);

        // Check username
        if (!users[username]) {
            alert("Username not found");
            return;
        }

        // Check password
        if (users[username].password !== password) {
            alert("Incorrect password");
            return;
        }

        // Create login session
        localStorage.setItem("currentUser", username);

        alert("Login successful");

        // Go to Home
        navigate("/home", { replace: true });
    };

    return (
        <div
            className="login-page"
            style={{ backgroundImage: `url(${LoginImg})` }}
        >
            <div className="login-box">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>

                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login