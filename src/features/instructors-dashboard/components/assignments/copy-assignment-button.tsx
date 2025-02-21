"use client";

import { Copy } from "lucide-react";
import React, { useState } from "react";

type Props = {
  link: string;
};

export function CopyAssignmentButton({ link }: Props) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${link}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 ml-2 bg-gray-50 border border-gray-300 mr-2 items-center gap-2 text-sm hover:bg-gray-100 p-1.5 rounded-md transition-colors flex"
      aria-label="Copy invite link"
    >
      <Copy size={16} />
      <span className="hidden sm:inline">
        {copied ? "Copied!" : "Copy invite link"}
      </span>
    </button>
  );
}
