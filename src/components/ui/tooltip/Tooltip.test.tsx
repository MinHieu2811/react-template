import { render, fireEvent, screen } from "@testing-library/react";
import Tooltip from "./Tooltip";

describe("Tooltip component", () => {
  it("should show tooltip on hover", () => {
    render(
      <Tooltip content="Test tooltip" position="top">
        <button disabled>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText("Hover me");
    fireEvent.mouseEnter(button);
    expect(screen.getByText("Test tooltip")).toBeInTheDocument();
  });

  it("should hide tooltip when mouse leaves", () => {
    render(
      <Tooltip content="Test tooltip">
        <button disabled>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText("Hover me");
    fireEvent.mouseEnter(button);
    expect(screen.getByText("Test tooltip")).toBeInTheDocument();
    fireEvent.mouseLeave(button);
    expect(screen.queryByText("Test tooltip")).not.toBeInTheDocument();
  });

  it("should render with different positions", () => {
    const { rerender } = render(
      <Tooltip content="Test tooltip" position="bottom">
        <button disabled>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText("Hover me");
    fireEvent.mouseEnter(button);
    const tooltip = screen.getByText("Test tooltip");
    expect(tooltip).toHaveClass("top-full");

    rerender(
      <Tooltip content="Test tooltip" position="left">
        <button disabled>Hover me</button>
      </Tooltip>
    );
    expect(tooltip).toHaveClass("right-full");
  });
}); 