import LoginImg from "./image2.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./register.css";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [mobile, setMobile] = useState("");
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {

        e.preventDefault();

        const savedUsers = localStorage.getItem("users");

        let users = {};

        if (savedUsers) {
            users = JSON.parse(savedUsers);
        }

        // Check if username already exists
        if (users[username]) {
            alert("Username already exists");
            return;
        }

        // Create the new user
        users[username] = {
            mobile: mobile,
            gmail: gmail,
            password: password
        };

        // Save users
        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Registration successful");

        navigate("/");
    };

    return (
        <div
            className="register-page"
            style={{ backgroundImage: `url(${LoginImg})` }}
        >
            <div className="register-box">

                <form onSubmit={handleRegister}>

                    <h1>Register</h1>

                    {/* Username */}
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                        />
                    </div>

                    {/* Mobile Number */}
                    <div className="input-box">
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            required
                            maxLength="10"
                            pattern="[0-9]{10}"
                            value={mobile}
                            onChange={(e) =>
                                setMobile(
                                    e.target.value.replace(/\D/g, "")
                                )
                            }
                        />
                    </div>

                    {/* Gmail */}
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Gmail"
                            required
                            value={gmail}
                            onChange={(e) =>
                                setGmail(e.target.value)
                            }
                        />
                    </div>

                    {/* Password */}
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="register-button"
                    >
                        Register
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Register