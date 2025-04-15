"use client";

import Link from "next/link";
import { Button } from "@/components";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="p-6 flex flex-col justify-center items-center gap-2">
        <h1 className=" text-5xl font-bold mb-4 text-center">
          Oops, something went wrong!
        </h1>
        <p className="text-paragraphLight text-center">
          We are sorry, but an unexpected error has occurred. Please try again
          later!
        </p>
        {error.digest && (
          <p className="mt-4 mb-6 text-paragraphLight">
            <strong>Digest:</strong> {error.digest}
          </p>
        )}
        <div className="flex gap-3">
          <Button>
            <Link href="/">Homepage</Link>
          </Button>
          <Button>
            <Link href="#" onClick={reset}>
              Try again
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
