"use client";

import Link from "next/link";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Alert variant="destructive" className="max-w-md shadow-lg p-6">
        <AlertTitle className="font-bold mb-4">Internal server error</AlertTitle>
        <AlertDescription>
          Please go back or try again.
          {error.digest && (
            <p className="text-red-500 mt-4 mb-6">
              <strong>Digest:</strong> {error.digest}
            </p>
          )}
          <Link
            href="/"
            className="bg-zinc-900 text-white p-3 text-sm rounded-md hover:bg-zinc-800"
          >
            Go back
          </Link>
          <Link
            href="#"
            className="bg-zinc-900 text-white p-3 text-sm rounded-md hover:bg-zinc-800 ml-6"
            onClick={reset}
          >
            Try again
          </Link>
        </AlertDescription>
      </Alert>
    </div>
  );
}
