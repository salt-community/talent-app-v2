"use client";

import { FaGithub } from "react-icons/fa6";
import type { SocialLink } from "../db";
import { useRouter } from "next/navigation";

type Props = SocialLink & { size?: number };

export function SocialLink({ url, name, size = 20 }: Props) {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(url);
  };

  return (
    <>
      {name === "Github" && (
        <button onClick={handleNavigation}>
          <FaGithub size={size} />
        </button>
      )}
      {name === "Resume" && (
        <button
          onClick={handleNavigation}
          className="font-bold text-[16px] leading-none"
        >
          CV{" "}
        </button>
      )}
    </>
  );
}
