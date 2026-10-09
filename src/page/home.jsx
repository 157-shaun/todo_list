import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../component/navbar";
import TodoForm from "../component/todoform";
import TodoList from "../component/todolist";

function Home() {
    const navigate = useNavigate();

    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);

    // Load user and todos
    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");

        // If user is not logged in, go to login page
        if (!currentUser) {
            navigate("/", { replace: true });
            return;
        }

        // Load todos from localStorage
        const savedTodos = localStorage.getItem("todos");

        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, [navigate]);

    // Add new todo
    const addTodo = (todo) => {
        const updatedTodos = [...todos, todo];

        setTodos(updatedTodos);

        localStorage.setItem(
            "todos",
            JSON.stringify(updatedTodos)
        );
    };

    // Complete todo
    const completeTodo = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id
                ? { ...todo, completed: true }
                : todo
        );

        setTodos(updatedTodos);

        localStorage.setItem(
            "todos",
            JSON.stringify(updatedTodos)
        );
    };

    // Delete todo
    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(
            (todo) => todo.id !== id
        );

        setTodos(updatedTodos);

        localStorage.setItem(
            "todos",
            JSON.stringify(updatedTodos)
        );
    };

    // Start editing a todo
    const editTodo = (todo) => {
        setEditingTodo(todo);
    };

    // Update existing todo
    const updateTodo = (updatedTodo) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === updatedTodo.id
                ? updatedTodo
                : todo
        );

        setTodos(updatedTodos);

        localStorage.setItem(
            "todos",
            JSON.stringify(updatedTodos)
        );

        // Exit edit mode
        setEditingTodo(null);
    };

    // Count completed todos
    const completedCount = todos.filter(
        (todo) => todo.completed
    ).length;

    return (
        <div>
            <Navbar />

            <div className="container-fluid px-4 pt-2">

                <div className="row align-items-start">

                    {/* Left side - Form */}
                    <div className="col-md-5">

                        <TodoForm
                            onAddTodo={addTodo}
                            editingTodo={editingTodo}
                            onUpdateTodo={updateTodo}
                        />

                    </div>

                    {/* Right side - Todo List */}
                    <div className="col-md-7 pt-4">

                        <TodoList
                            todos={todos}
                            onComplete={completeTodo}
                            onEdit={editTodo}
                            onDelete={deleteTodo}
                        />

                        {/* Completed Tasks */}
                        <div className="mt-3">

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Home