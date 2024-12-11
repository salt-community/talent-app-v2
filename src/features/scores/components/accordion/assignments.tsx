"use client"
import { useState } from "react";
import { Assignment as AssignmentType } from "../../types";
import { Assignment } from "../assignment";

type Props = {
  assignments: AssignmentType[];
};

export function Assignments({ assignments }: Props) {
  const [visibleCount, setVisibleCount] = useState(5);
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleLoadLess = () => {
    setVisibleCount((prev) => Math.max(5, prev - 5)); 
  };

  return (
    <>
      {assignments.slice(0, visibleCount).map((assignment) => (
        <Assignment key={assignment.id} assignment={assignment} />
      ))}

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        {visibleCount > 5 && (
          <button onClick={handleLoadLess} className="border-2">
            Load Less
          </button>
        )}
        {visibleCount < assignments.length && (
          <button onClick={handleLoadMore} className="border-2">
            Load More
          </button>
        )}
      </div>
    </>
  );
}


