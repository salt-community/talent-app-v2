"use client";

import { Input } from "@/components";
import { redirect, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

export function Search() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const searchParams = new URLSearchParams();

      if (event.target.value) searchParams.set("search", event.target.value);
      else searchParams.delete("search");

      redirect(`/developers?${searchParams.toString()}`);
    },
    300,
  );

  return (
    <div className="fixed z-10 mr-10 w-screen bg-white -my-2 pt-4">
      <Input
        placeholder="Type to search"
        defaultValue={search}
        onChange={handleSearch}
      />
    </div>
  );
}
