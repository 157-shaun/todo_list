import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";

function History() {
    const navigate = useNavigate();

    const [completedTodos, setCompletedTodos] = useState([]);

    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");

        if (!currentUser) {
            navigate("/", { replace: true });
            return;
        }

        const savedTodos = localStorage.getItem("todos");

        if (savedTodos) {
            const todos = JSON.parse(savedTodos);

            const completed = todos.filter(
                (todo) => todo.completed
            );

            setCompletedTodos(completed);
        }
    }, [navigate]);

    // Remove task from History
    const removeFromHistory = (id) => {
        const savedTodos = localStorage.getItem("todos");

        if (!savedTodos) {
            return;
        }

        const todos = JSON.parse(savedTodos);

        const updatedTodos = todos.filter(
            (todo) => todo.id !== id
        );

        // Save updated todos
        localStorage.setItem(
            "todos",
            JSON.stringify(updatedTodos)
        );

        // Update History screen
        const completed = updatedTodos.filter(
            (todo) => todo.completed
        );

        setCompletedTodos(completed);
    };

    return (
        <div>
            <Navbar />

            <div className="container-fluid p-4">

                <h5 className="fw-bold mb-3">
                    ✓ History (Completed Tasks)

                    <span className="badge bg-light text-secondary ms-2">
                        {completedTodos.length}
                    </span>
                </h5>

                {completedTodos.length === 0 ? (
                    <p className="text-muted">
                        No completed tasks yet.
                    </p>
                ) : (
                    completedTodos.map((todo) => (
                        <div
                            key={todo.id}
                            className="card mb-2 border-0 shadow-sm"
                        >
                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-start">

                                    {/* Task information */}
                                    <div>
                                        <h6 className="fw-bold">
                                            ✓ {todo.title}
                                        </h6>

                                        <p className="text-muted small mb-2">
                                            {todo.description}
                                        </p>

                                        <div className="small text-muted">
                                            📅 {todo.date || "No date"}

                                            <span className="ms-3">
                                                🕐 {todo.time || "No time"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Remove button */}
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            removeFromHistory(todo.id)
                                        }
                                    >
                                        🗑 Remove
                                    </button>

                                </div>

                            </div>
                        </div>
                    ))
                )}

            </div>
        </div>
    );
}

export default History