import React from "react";
import { FixItems } from "./fix-items";
import { Fix_Item } from "../types";

type Items = {
  items: Fix_Item[];
};

export async function FixList({ items }: Items) {
  return (
    <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
      <FixItems items={items} />
    </div>
  );
}
