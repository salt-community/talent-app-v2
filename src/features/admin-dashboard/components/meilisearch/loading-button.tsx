"use client";

import { Button } from "@/components";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

type Props = { text: string; loadingText: string };
export function LoadingButton({ text, loadingText }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          {loadingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
}
