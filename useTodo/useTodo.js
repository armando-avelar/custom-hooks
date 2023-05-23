import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {

    const [todos, dispatch] = useReducer(todoReducer, init());

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleNewTodo = (todo) => {
        dispatch({ type: 'Add', payload: todo });
    }

    const handleDeleteTodo = (id) => {
        dispatch({ type: 'Delete', payload: id });
    }

    const handleToogleTodo = (id) => {
        dispatch({ type: 'Toggle', payload: id });
    }

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToogleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length
    }
}
