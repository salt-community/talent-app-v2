import React from "react";

export async function AssignmentComponent({ slug }: { slug: string }) {
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
