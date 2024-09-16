import { render, screen, fireEvent } from "@testing-library/react";
import AddTodo from "./../Components/AddTodo";
import userEvent from "@testing-library/user-event";

const mockAddTodo = jest.fn();

describe("test AddTodo component", () => {
  test("renders the add todo form", () => {
    render(<AddTodo onAddTodo={mockAddTodo} />);

    expect(screen.getByTestId("add-input")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
  });

  test("calls onAddTodo when a new todo is added", () => {
    render(<AddTodo onAddTodo={mockAddTodo} />);

    const input = screen.getByTestId("add-input");
    userEvent.type(input, "New Todo");

    const addButton = screen.getByTestId("add-button");
    userEvent.click(addButton);

    expect(mockAddTodo).toHaveBeenCalledWith({
      content: "New Todo",
      completed: false,
      id: expect.any(Number),
    });
  });

  test("does not call onAddTodo if input is empty", () => {
    render(<AddTodo onAddTodo={mockAddTodo} />);

    const addButton = screen.getByTestId("add-button");
    userEvent.click(addButton);

    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});
