import { useEffect, useState } from "react";

function TodoForm({ onAddTodo, editingTodo, onUpdateTodo }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [priority, setPriority] = useState("Medium");

    // Load selected task data when Edit is clicked
    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.title);
            setDescription(editingTodo.description);
            setDate(editingTodo.date);
            setTime(editingTodo.time);
            setPriority(editingTodo.priority);
        }
    }, [editingTodo]);

    // Add or Update
    const handleSubmit = (e) => {
        e.preventDefault();

        // If editingTodo exists, UPDATE the existing task
        if (editingTodo) {
            const updatedTodo = {
                ...editingTodo,
                title,
                description,
                date,
                time,
                priority
            };

            onUpdateTodo(updatedTodo);

            return;
        }

        // Otherwise, ADD a new task
        const todo = {
            id: Date.now(),
            title,
            description,
            date,
            time,
            priority,
            completed: false
        };

        onAddTodo(todo);

        // Clear form after adding
        setTitle("");
        setDescription("");
        setDate("");
        setTime("");
        setPriority("Medium");
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-body p-4">

                <h5 className="card-title fw-bold mb-4">
                    {editingTodo
                        ? "Edit Task"
                        : "Add New Task"}
                </h5>

                <form onSubmit={handleSubmit}>

                    {/* Title */}
                    <div className="mb-3">
                        <label className="form-label small fw-semibold">
                            Title / Activity{" "}
                            <span className="text-danger">
                                *
                            </span>
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter task title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label className="form-label small fw-semibold">
                            Description
                        </label>

                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Enter task details (optional)"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        ></textarea>
                    </div>

                    {/* Date */}
                    <div className="mb-3">
                        <label className="form-label small fw-semibold">
                            Date
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            value={date}
                            onChange={(e) =>
                                setDate(e.target.value)
                            }
                        />
                    </div>

                    {/* Time */}
                    <div className="mb-3">
                        <label className="form-label small fw-semibold">
                            Time
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Time"
                            value={time}
                            onChange={(e) =>
                                setTime(e.target.value)
                            }
                        />
                    </div>

                    {/* Priority */}
                    <div className="mb-3">
                        <label className="form-label small fw-semibold">
                            Priority
                        </label>

                        <select
                            className="form-select"
                            value={priority}
                            onChange={(e) =>
                                setPriority(e.target.value)
                            }
                        >
                            <option value="Low">
                                Low
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="High">
                                High
                            </option>
                        </select>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        {editingTodo
                            ? "Update Task"
                            : "Add Task"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default TodoForm