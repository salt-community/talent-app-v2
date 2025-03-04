import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CreateProfileButton } from "../create-profile-button";
import { addDeveloperProfileAction } from "../../actions";

vi.mock("../actions", () => ({
  addDeveloperProfileAction: vi.fn(),
}));

describe("CreateProfileButton", () => {
  it("renders the button with correct label", () => {
    render(<CreateProfileButton identityId="123" />);
    const button = screen.getByText("New Profile");
    expect(button).toBeInTheDocument();
  });

  it("calls addDeveloperProfileAction when button is clicked", async () => {
    render(<CreateProfileButton identityId="123" />);
    const button = screen.getByText("New Profile");
    fireEvent.click(button);
    await waitFor(() => expect(addDeveloperProfileAction).toHaveBeenCalled());
  });
});
