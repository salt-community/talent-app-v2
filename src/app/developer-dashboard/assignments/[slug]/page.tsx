import { DeveloperAssignment } from "@/features/developer-profiles";
import React from "react";
type Params = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Params) {
  const { slug } = await params;
  return (
    <div>
      <DeveloperAssignment slug={slug} />
    </div>
  );
}
