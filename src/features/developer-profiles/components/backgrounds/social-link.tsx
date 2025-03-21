"use client";

import { FaGithub } from "react-icons/fa6";
import type { SocialLink } from "../../types";
import Link from "next/link";

type Props = SocialLink & { size?: number };

export function SocialLink({ url, name }: Props) {
  return (
    <>
      {name === "Github" && (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm truncate overflow-hidden whitespace-nowrap"
        >
          <span className="truncate">{url}</span>
        </Link>
      )}
      {name === "Resume" && (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm truncate overflow-hidden whitespace-nowrap"
        >
          <span className="truncate">{url}</span>
        </Link>
      )}
    </>
  );
}
