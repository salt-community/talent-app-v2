import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import DeleteProject from "../delete-project";

describe("DeleteProject component", () => {
  it("renders correctly", () => {
    render(<DeleteProject onClick={() => {}} />);

    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
  
  it("shows dialog when clicked", () => {
    render(<DeleteProject onClick={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByText("This will delete your project!")).toBeInTheDocument();
  });
});
