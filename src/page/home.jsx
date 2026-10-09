
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../component/navbar";
import TodoForm from "../component/todoform";
import TodoList from "../component/todolist";

function Home() {
    const navigate = useNavigate();

    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);

    // Get the logged-in username
    const currentUser = localStorage.getItem("currentUser");

    // Create a separate storage key for each user
    const todosKey = currentUser
        ? `todos_${currentUser}`
        : null;

    // Load the current user's todos
    useEffect(() => {
        if (!currentUser) {
            navigate("/", { replace: true });
            return;
        }

        const savedTodos = localStorage.getItem(todosKey);

        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        } else {
            setTodos([]);
        }

        setEditingTodo(null);
    }, [currentUser, todosKey, navigate]);

    // Add a new todo
    const addTodo = (todo) => {
        setTodos((currentTodos) => {
            const updatedTodos = [...currentTodos, todo];

            localStorage.setItem(
                todosKey,
                JSON.stringify(updatedTodos)
            );

            return updatedTodos;
        });
    };

    // Complete a todo
    const completeTodo = (id) => {
        setTodos((currentTodos) => {
            const updatedTodos = currentTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: true }
                    : todo
            );

            localStorage.setItem(
                todosKey,
                JSON.stringify(updatedTodos)
            );

            return updatedTodos;
        });
    };

    // Delete a todo
    const deleteTodo = (id) => {
        setTodos((currentTodos) => {
            const updatedTodos = currentTodos.filter(
                (todo) => todo.id !== id
            );

            localStorage.setItem(
                todosKey,
                JSON.stringify(updatedTodos)
            );

            return updatedTodos;
        });

        if (editingTodo?.id === id) {
            setEditingTodo(null);
        }
    };

    // Select a todo for editing
    const editTodo = (todo) => {
        setEditingTodo(todo);
    };

    // Update the existing todo without creating a new one
    const updateTodo = (updatedTodo) => {
        setTodos((currentTodos) => {
            const updatedTodos = currentTodos.map((todo) =>
                todo.id === updatedTodo.id
                    ? updatedTodo
                    : todo
            );

            localStorage.setItem(
                todosKey,
                JSON.stringify(updatedTodos)
            );

            return updatedTodos;
        });

        setEditingTodo(null);
    };

    return (
        <div>
            <Navbar />

            <div className="container-fluid px-4 pt-2">
                <div className="row align-items-start">

                    {/* Left side: Add or Edit task */}
                    <div className="col-md-5">
                        <TodoForm
                            onAddTodo={addTodo}
                            editingTodo={editingTodo}
                            onUpdateTodo={updateTodo}
                        />
                    </div>

                    {/* Right side: Pending tasks */}
                    <div className="col-md-7 pt-4">
                        <TodoList
                            todos={todos}
                            onComplete={completeTodo}
                            onEdit={editTodo}
                            onDelete={deleteTodo}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home