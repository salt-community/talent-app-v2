"use client";

import { Button } from "@/components";
import { Loader2 } from "lucide-react";

type Props = {
  onClick: () => void;
  loading: boolean;
};
export default function UpdateData({ onClick, loading }: Props) {
  return (
    <Button onClick={onClick} disabled={loading}>
      {loading ? <Loader2 className="animate-spin" /> : undefined}
      {loading ? "Updating, please wait..." : "Update"}
    </Button>
  );
}
