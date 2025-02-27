"use client";

import { Button } from "@/components";
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
    <Button
      onClick={onClick}
      variant="outline"
      aria-label="Copy invite link"
    >
      <Copy size={16} />
      <span className="hidden sm:inline">
        {copied ? "Copied!" : "Copy invite link"}
      </span>
    </Button>
  );
}
