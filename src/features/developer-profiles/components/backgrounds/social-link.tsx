"use client";

import { FaGithub } from "react-icons/fa6";
import type { SocialLink } from "../../types";
import Link from "next/link";

type Props = SocialLink & { size?: number };

export function SocialLink({ url, name, size = 20 }: Props) {
  return (
    <>
      {name === "Github" && (
        <Link href={url} target="_blank" rel="noopener noreferrer">
          <FaGithub size={size} />
        </Link>
      )}
      {name === "Resume" && (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[16px] leading-none"
        >
          CV{" "}
        </Link>
      )}
    </>
  );
}
