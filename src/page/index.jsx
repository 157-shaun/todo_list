import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Index() {
    return (
        <div className="index-page">

            {/* Login and Register buttons */}

            <div className="button-container">

                <Link
                    to="/login"
                    className="auth-button"
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    className="auth-button"
                >
                    Register
                </Link>

            </div>

        </div>
    );
}

export default Index;
