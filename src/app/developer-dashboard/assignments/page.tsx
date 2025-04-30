import { DeveloperAssignments } from "@/features/developer-profiles";
import React, { Suspense } from "react";
import Loading from "../loading";

export default function Page() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assignments</h1>
          <p className="text-gray-600">
            Here you can view the results for all of your assignments
          </p>
        </header>
        <Suspense fallback={<Loading />}>
          <DeveloperAssignments />
        </Suspense>
      </div>
    </div>
  );
}
