"use client";

import { cn } from "@/lib/utils";
import type { SocialLink } from "../../types";
import Link from "next/link";

type Props = SocialLink & {
  size?: number;
  variant?: "default" | "cv";
};

export function SocialLink({ url, name, variant = "default" }: Props) {
  return (
    <>
      {name === "Github" && (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-sm truncate overflow-hidden whitespace-nowrap",
            variant === "cv" && "text-white"
          )}
        >
          <span className="truncate">{url}</span>
        </Link>
      )}
      {name === "Resume" && (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-sm truncate overflow-hidden whitespace-nowrap",
            variant === "cv" && "text-white"
          )}
        >
          <span className="truncate">{url}</span>
        </Link>
      )}
    </>
  );
}
