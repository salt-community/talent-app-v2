import { render, screen} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../ui";
import React from 'react';

describe("Button", () => {
  it("renders the button with correct label", () => {
    render(<Button title="Click me" />);
     const button = screen.getByTitle("Click me");
     expect(button).toBeInTheDocument();
  });
});
