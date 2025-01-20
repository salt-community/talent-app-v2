"use client";
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

      <div className="mt-2 text-center">
        {visibleCount > 5 && (
          <button
            onClick={handleLoadLess}
            className="inline-block p-1 mx-1 text-xs font-normal text-gray-500 bg-gray-50 border border-gray-200 rounded-sm hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
          >
            Load Less
          </button>
        )}
        {visibleCount < assignments.length && (
          <button
            onClick={handleLoadMore}
            className="inline-block p-1 mx-1 text-xs font-normal text-gray-500 bg-gray-50 border border-gray-200 rounded-sm hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
}
