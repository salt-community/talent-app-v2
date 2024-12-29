"use client";

import { useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Alert variant="destructive" className="max-w-md shadow-lg">
        <AlertTitle>Access Denied</AlertTitle>
        <AlertDescription>
          You&apos;re not authorized to view this page. Please contact admin if
          you believe this is an error.
        </AlertDescription>
      </Alert>
    </div>
  );
}
