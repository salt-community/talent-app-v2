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

      redirect(`/${searchParams.toString()}`);
    },
    300
  );

  return (
    <Input
      placeholder="Type to search"
      defaultValue={search}
      onChange={handleSearch}
    />
  );
}
