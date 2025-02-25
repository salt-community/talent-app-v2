"use client";

import { Input } from "@/components";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

export function Search() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const searchParams = new URLSearchParams();

      if (event.target.value) searchParams.set("search", event.target.value);
      else searchParams.delete("search");

      redirect(`${pathname}/?${searchParams.toString()}`);
    },
    300
  );

  return (
    <div className="fixed left-0 w-full bg-white px-4 pt-4 z-10">
      <Input
        placeholder="Type to search"
        defaultValue={search}
        onChange={handleSearch}
      />
    </div>
  );
}
