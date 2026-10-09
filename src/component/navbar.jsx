import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const username = localStorage.getItem("currentUser");

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/", { replace: true });
    };

    return (
        <nav className="todo-navbar">

            {/* Todo Logo */}
            <Link to="/home" className="todo-logo">
                <div className="todo-logo-icon">
                    ✓
                </div>

                <span>Todo List</span>
            </Link>

            {/* Navigation */}
            <div className="todo-nav-links">

                {/* History */}
                <Link
                    to="/history"
                    className={
                        location.pathname === "/history"
                            ? "todo-nav-link active"
                            : "todo-nav-link"
                    }
                >
                    <span className="nav-icon">
                        ◷
                    </span>

                    <span>History</span>
                </Link>

            </div>

            {/* Right Side */}
            <div className="todo-navbar-right">

                <div className="welcome-user">
                    <span>
                        Welcome, {username}
                    </span>
                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar