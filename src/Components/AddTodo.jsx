import React, { useState } from "react";

const AddTodo = ({ onAddTodo }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Todo content cannot be empty");
      return;
    }
    onAddTodo({ content: content.trim(), completed: false, id: Date.now() });
    setContent("");
    setError("");
  };
  console.log(error);
  return (
    <>
      <form
        onSubmit={handleAddTodo}
        className="w-full flex justify-center   mt-4 gap-2 "
      >
        <input
          type="text"
          name="content"
          value={content}
          className="rounded-md border-0 py-1.5 pl-7 md:pr-20  text-gray-900 ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm"
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add New Todo"
          data-testid="add-input"
        />
        <button
          className="rounded-lg bg-orange-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          type="submit"
          data-testid="add-button"
        >
          Add
        </button>
      </form>
      {error && <p className="text-red-500 text-lg font-bold">{error}</p>}
    </>
  );
};

export default AddTodo;
