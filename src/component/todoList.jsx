function TodoList({ todos, onComplete, onEdit, onDelete }) {
    const pendingTodos = todos.filter((todo) => !todo.completed);

    return (
        <div className="card shadow-sm border-0">
            <div className="card-body">

                <div className="d-flex align-items-center mb-3">
                    <span className="me-2">▤</span>

                    <h5 className="fw-bold mb-0">
                        Pending Tasks
                    </h5>

                    <span className="badge bg-light text-secondary ms-2">
                        {pendingTodos.length}
                    </span>
                </div>

                {pendingTodos.length === 0 ? (
                    <p className="text-muted text-center py-4">
                        No pending tasks
                    </p>
                ) : (
                    pendingTodos.map((todo) => (
                        <div
                            key={todo.id}
                            className="border rounded p-3 mb-3"
                        >

                            {/* Task details */}
                            <div className="d-flex align-items-start">

                                <input
                                    type="checkbox"
                                    className="form-check-input me-3"
                                    onChange={() =>
                                        onComplete(todo.id)
                                    }
                                />

                                <div style={{ flex: 1 }}>
                                    <h6 className="fw-bold mb-1">
                                        {todo.title}
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

                                <span className={`badge text-dark ${todo.priority === "High"
                                        ? "bg-danger-subtle"
                                        : todo.priority === "Medium"
                                        ? "bg-info-subtle"
                                        : "bg-warning-subtle"
                                    }`}>
                                    {todo.priority}
                                </span>

                        </div>

                            {/* Buttons */ }
                        < div
                                style = {{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "8px",
                        marginTop: "15px"
                    }}
                            >

                {/* Complete */}
                <button
                    type="button"
                    style={{
                        display: "block",
                        padding: "4px 10px",
                        fontSize: "14px",
                        backgroundColor: "#198754",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                    onClick={() =>
                        onComplete(todo.id)
                    }
                >
                    ✓ Complete
                </button>

                {/* Edit */}
                <button
                    type="button"
                    style={{
                        display: "block",
                        padding: "4px 10px",
                        fontSize: "14px",
                        backgroundColor: "#0d6efd",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        const result = window.confirm(
                            "Are you sure you want to edit this task?"
                        );

                        if (result) {
                            onEdit(todo);
                        }
                    }}
                >
                    ✎ Edit
                </button>

                {/* Delete */}
                <button
                    type="button"
                    style={{
                        display: "block",
                        padding: "4px 10px",
                        fontSize: "14px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                    onClick={() =>
                        onDelete(todo.id)
                    }
                >
                    🗑 Delete
                </button>

            </div>

        </div>
    ))
                )
}

            </div >
        </div >
    );
}

export default TodoList