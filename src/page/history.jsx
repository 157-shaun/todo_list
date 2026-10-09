
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";

function History() {
    const navigate = useNavigate();

    const [completedTodos, setCompletedTodos] = useState([]);

    const currentUser = localStorage.getItem("currentUser");
    const todosKey = currentUser
        ? `todos_${currentUser}`
        : null;

    // Load the logged-in user's completed tasks
    useEffect(() => {
        if (!currentUser) {
            navigate("/", { replace: true });
            return;
        }

        const savedTodos = localStorage.getItem(todosKey);

        if (savedTodos) {
            const todos = JSON.parse(savedTodos);

            setCompletedTodos(
                todos.filter((todo) => todo.completed)
            );
        } else {
            setCompletedTodos([]);
        }
    }, [currentUser, todosKey, navigate]);

    // Remove a completed task from storage and history
    const removeFromHistory = (id) => {
        const savedTodos = localStorage.getItem(todosKey);

        if (!savedTodos) {
            return;
        }

        const todos = JSON.parse(savedTodos);

        const updatedTodos = todos.filter(
            (todo) => todo.id !== id
        );

        localStorage.setItem(
            todosKey,
            JSON.stringify(updatedTodos)
        );

        setCompletedTodos(
            updatedTodos.filter((todo) => todo.completed)
        );
    };

    return (
        <div>
            <Navbar />

            <div className="container-fluid p-4">
                {/* History heading */}
                <h5 className="fw-bold mb-3">
                    ✓ History (Completed Tasks)

                    <span className="badge bg-light text-secondary ms-2">
                        {completedTodos.length}
                    </span>
                </h5>

                {/* Completed tasks */}
                {completedTodos.length === 0 ? (
                    <p className="text-muted">
                        No completed tasks yet.
                    </p>
                ) : (
                    completedTodos.map((todo) => (
                        <div
                            key={todo.id}
                            className="card mb-3 border-0 shadow-sm"
                        >
                            <div className="card-body d-flex justify-content-between align-items-center">
                                {/* Task details on the left */}
                                <div className="flex-grow-1">
                                    <h6 className="fw-bold mb-2">
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

                                {/* Remove button on the right */}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-danger ms-3 flex-shrink-0"
                                    onClick={() =>
                                        removeFromHistory(todo.id)
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default History