import { render, screen } from "@testing-library/react";
import App from "./../App";

describe("test App", () => {
  test("renders the app correctly", () => {
    render(<App />);
    expect(screen.getByText("TODO List")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
  });
});
