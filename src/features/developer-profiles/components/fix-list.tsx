import React from "react";
import { FixItems } from "./fix-items";
import { Fix_Item } from "../types";

type Items = {
  items: Fix_Item[];
};

export function FixList({ items }: Items) {
  return (
    <div className="overflow-y-auto overflow-x-hidden max-h-[calc(70vh-200px)]">
      <FixItems items={items} />
    </div>
  );
}
