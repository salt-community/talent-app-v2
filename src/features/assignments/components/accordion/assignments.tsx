"use client";

import { useEffect, useState } from "react";
import { useAssignments } from "../../assignments-context";

export function Assignments() {
  const { assignments, loadAssignments } = useAssignments();
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    void loadAssignments();
  }, [loadAssignments]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleLoadLess = () => {
    setVisibleCount((prev) => Math.max(5, prev - 5));
  };

  const visibleAssignments = assignments.slice(0, visibleCount);

  return (
    <>
      {visibleAssignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
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
