import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todoItems, onDeleteTodo, toggleTodo, onEditTodo }) => {
  return (
    <div className="overflow-y-scroll bg-white mb-4 border-orange-400 border-2 w-11/12 max-w-xl p-3 md:p-7 min-h-[500px] rounded-xl flex flex-col">
      <h1 className="text-3xl font-bold mb-6 border-b-2 pb-2 text-center">
        TODO List
      </h1>

      {todoItems.map((todo) => (
        <div key={todo.id} data-testid="task" className="flex flex-col">
          <TodoItem
            todo={todo}
            toggleTodo={toggleTodo}
            onDeleteTodo={onDeleteTodo}
            onEditTodo={onEditTodo}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
