"use client";
import { useState } from "react";

type Props = {
  description: string;
};

export function ProjectDescription({ description }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
  function toggleText() {
    setIsExpanded(!isExpanded);
  }
  return (
    <button onClick={toggleText}>
      <p
        className={`mt-2 mx-2 text-justify overflow-hidden text-paragraph ${
          isExpanded ? "line-clamp-4" : "line-clamp-none"
        }`}
      >
        {description}
      </p>
    </button>
  );
}
