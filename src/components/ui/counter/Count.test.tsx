import { render, fireEvent } from "@testing-library/react";
import Count from "./Counter";

describe("Count component", () => {
  it("should allow integer and float, replace comma with dot", () => {
    const { getByRole } = render(<Count />);
    const input = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "12,3" } });
    expect(input.value).toBe("12.3");
    fireEvent.change(input, { target: { value: "123.45" } });
    expect(input.value).toBe("123.45");
  });

  it("should remove invalid characters", () => {
    const { getByRole } = render(<Count />);
    const input = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "12a3" } });
    expect(input.value).toBe("123");
    fireEvent.change(input, { target: { value: "a123" } });
    expect(input.value).toBe("123");
    fireEvent.change(input, { target: { value: "1.2.3" } });
    expect(input.value).toBe("1.23");
  });

  it("should allow negative input but clamp to 0 on blur", () => {
    const { getByRole } = render(<Count />);
    const input = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "-5" } });
    expect(input.value).toBe("-5");
    fireEvent.blur(input);
    expect(input.value).toBe("0");
  });

  it("should clamp to 100 if unit is % and input > 100", () => {
    const { getByRole, getByText } = render(<Count />);
    const input = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "101" } });
    fireEvent.blur(input);
    expect(input.value).toBe("100");
    fireEvent.change(input, { target: { value: "120" } });
    fireEvent.click(getByText("px"));
    fireEvent.click(getByText("%"));
    expect(input.value).toBe("100");
  });

  it("should disable - button at 0 and + button at 100 for %", () => {
    const { getByRole, getByLabelText, getByText } = render(<Count />);
    const input = getByRole("textbox") as HTMLInputElement;
    const minus = getByLabelText("Decrease") as HTMLButtonElement;
    const plus = getByLabelText("Increase") as HTMLButtonElement;
    expect(minus).toHaveProperty("disabled", true);
    fireEvent.change(input, { target: { value: "100" } });
    fireEvent.blur(input);
    expect(plus).toHaveProperty("disabled", true);
    fireEvent.click(getByText("px"));
    expect(plus).toHaveProperty("disabled", false);
  });

  it("should step up/down and not exceed min/max", () => {
    const { getByRole, getByLabelText } = render(<Count />);
    const input = getByRole("textbox") as HTMLInputElement;
    const minus = getByLabelText("Decrease") as HTMLButtonElement;
    const plus = getByLabelText("Increase") as HTMLButtonElement;
    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.click(minus);
    expect(input.value).toBe("0");
    fireEvent.click(plus);
    expect(input.value).toBe("1");
  });
}); 