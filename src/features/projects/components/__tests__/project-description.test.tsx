import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import { ProjectDescription } from "../project-description";

describe("ProjectDescription component", () => {
  it("renders correctly and displays description", () => {
    render(<ProjectDescription description="Sample text" />);

    expect(screen.getByText("Sample text")).toBeInTheDocument();
  });

  it("Shows collapsed text initially", () => {
    render(
      <ProjectDescription description="This is a detailed project description that explains the purpose and scope of the project. It provides insights into the key features and functionalities while ensuring clarity for the user." />
    );

    const paragraph = screen.getByText(
      "This is a detailed project description that explains the purpose and scope of the project. It provides insights into the key features and functionalities while ensuring clarity for the user."
    );

    expect(paragraph).toHaveClass("line-clamp-4")
  });

  it("Shows full text when clicked", () => {
    render(
      <ProjectDescription description="This is a detailed project description that explains the purpose and scope of the project. It provides insights into the key features and functionalities while ensuring clarity for the user." />
    );
  
    const button = screen.getByRole("button")
    const paragraph = screen.getByText(
      "This is a detailed project description that explains the purpose and scope of the project. It provides insights into the key features and functionalities while ensuring clarity for the user."
    );

    fireEvent.click(button)
  
    expect(paragraph).toHaveClass("line-clamp-none")
  });
  
  it("Shows collapsed text when clicked for the second time", () => {
    render(
      <ProjectDescription description="This is a detailed project description that explains the purpose and scope of the project. It provides insights into the key features and functionalities while ensuring clarity for the user." />
    );
  
    const button = screen.getByRole("button")
    const paragraph = screen.getByText(
      "This is a detailed project description that explains the purpose and scope of the project. It provides insights into the key features and functionalities while ensuring clarity for the user."
    );

    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(paragraph).toHaveClass("line-clamp-4")
  });

});
