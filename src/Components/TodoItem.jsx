import React, { useState } from "react";

const TodoItem = ({ todo, onDeleteTodo, toggleTodo, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(todo.content);
  const [error, setError] = useState("");
  const handleEdit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Todo content cannot be empty");
      return;
    }
    setIsEditing(!isEditing);
    onEditTodo({
      id: todo.id,
      content: content.trim(),
      completed: todo.completed,
    });
    setError("");
  };

  const handleToggle = () => {
    toggleTodo(todo.id); // Pass the todo id to the parent for toggling
  };

  return (
    <>
      <div className="flex items-center justify-between my-2 ">
        <div className="flex items-center justify-start">
          <input
            id="complete"
            name="complete"
            type="checkbox"
            checked={todo.completed} // Controlled by todo.completed state
            onChange={handleToggle} // Toggle on change
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          {isEditing ? (
            <>
              <input
                type="text"
                className="rounded-md w-3/4 md:w-full border-0 mx-2 py-1 md:py-1.5 pl-2 md:pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm "
                value={content}
                onChange={(e) => setContent(e.target.value)}
                data-testid="edit-input"
              />
            </>
          ) : todo.completed ? (
            <h4
              className="ml-4 text-lg line-through"
              data-testid="todo-content"
            >
              {todo.content}
            </h4>
          ) : (
            <p className="ml-4 text-lg" data-testid="todo-content">
              {todo.content}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="rounded-lg bg-blue-600 px-3 py-2 text-[10px]  md:text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            data-testid="edit-button"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            onClick={() => onDeleteTodo(todo.id)}
            className="rounded-lg bg-red-600 px-3 py-2 text-[10px] md:text-sm font-semibold text-white shadow-sm hover:bg-red-500"
            data-testid="delete-button"
          >
            Delete
          </button>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default TodoItem;
