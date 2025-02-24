import React from "react";
import { instructorService } from "../../instance";

export async function AssignmentComponent({ slug }: { slug: string }) {
  const assignment = await instructorService.getAssignmentBySlug(slug);
  if (!assignment) return null;
  
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
