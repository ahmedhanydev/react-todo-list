import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItem from "./../Components/TodoItem";

const mockTodo = {
  id: 1,
  content: "Test Todo",
  completed: false,
};

const mockDeleteTodo = jest.fn();
const mockToggleTodo = jest.fn();
const mockEditTodo = jest.fn();

describe("TodoItem", () => {
  test("renders the todo item", async () => {
    render(
      <TodoItem
        todo={mockTodo}
        onDeleteTodo={mockDeleteTodo}
        toggleTodo={mockToggleTodo}
        onEditTodo={mockEditTodo}
      />
    );

    const content = await screen.findByTestId("todo-content");
    console.log(content.innerHTML);
    expect(content.innerHTML).toBe(mockTodo.content);
  });

  test("can toggle todo completion", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onDeleteTodo={mockDeleteTodo}
        toggleTodo={mockToggleTodo}
        onEditTodo={mockEditTodo}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    userEvent.click(checkbox);
    expect(mockToggleTodo).toHaveBeenCalledWith(mockTodo.id);
  });

  test("can delete a todo item", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onDeleteTodo={mockDeleteTodo}
        toggleTodo={mockToggleTodo}
        onEditTodo={mockEditTodo}
      />
    );

    const deleteButton = screen.getByTestId("delete-button");
    userEvent.click(deleteButton);
    expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodo.id);
  });

  test("can edit a todo item", async () => {
    render(
      <TodoItem
        todo={mockTodo}
        onDeleteTodo={mockDeleteTodo}
        toggleTodo={mockToggleTodo}
        onEditTodo={mockEditTodo}
      />
    );

    // Find the edit button and click it to enter edit mode
    const editButton = screen.getByTestId("edit-button");
    await userEvent.click(editButton);

    // Find the input field and type new content
    const input = screen.getByTestId("edit-input");
    await userEvent.clear(input);
    await userEvent.type(input, "Updated Todo");

    // Click the edit button again to save the changes
    await userEvent.click(editButton);

    // Check that mockEditTodo was called with the updated todo content
    expect(mockEditTodo).toHaveBeenCalledWith({
      id: mockTodo.id,
      content: "Updated Todo",
      completed: false,
    });
  });
});
