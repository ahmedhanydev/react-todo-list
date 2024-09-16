import { useState } from "react";
import "./App.css";
import AddTodo from "./Components/AddTodo";
import TodoList from "./Components/TodoList";

function App() {
  const [todoItems, setTodoItems] = useState(
    JSON.parse(localStorage.getItem("todoItems")) || []
  );

  const onAddTodo = (todo) => {
    if (todo.content !== "") {
      const updatedTodos = [...todoItems, todo];
      setTodoItems(updatedTodos);
      localStorage.setItem("todoItems", JSON.stringify(updatedTodos));
    }
  };

  const onDeleteTodo = (id) => {
    const todoExists = todoItems.some((todo) => todo.id === id);
    if (!todoExists) {
      console.error("Todo item not found");
      return;
    }
    const updatedTodos = todoItems.filter((todo) => todo.id !== id);
    setTodoItems(updatedTodos);
    localStorage.setItem("todoItems", JSON.stringify(updatedTodos));
  };

  const toggleTodo = (id) => {
    const todoExists = todoItems.some((todo) => todo.id === id);
    if (!todoExists) {
      console.error("Todo item not found");
      return;
    }
    const updatedTodos = todoItems.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoItems(updatedTodos);
    localStorage.setItem("todoItems", JSON.stringify(updatedTodos));
  };

  const onEditTodo = (updatedTodo) => {
    const updatedTodos = todoItems.map((todo) =>
      todo.id === updatedTodo.id ? { ...updatedTodo } : todo
    );
    setTodoItems(updatedTodos);
    localStorage.setItem("todoItems", JSON.stringify(updatedTodos));
  };

  return (
    <div className="bg-gray-600 h-screen flex flex-col  items-center gap-4">
      <AddTodo onAddTodo={onAddTodo} />
      <TodoList
        todoItems={todoItems}
        onDeleteTodo={onDeleteTodo}
        onEditTodo={onEditTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  );
}

export default App;
