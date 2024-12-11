"use client";

import { Input } from "@/components";
import { redirect, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

export function Search() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const searchParams = new URLSearchParams();
    if (event.target.value) searchParams.set("search", event.target.value);
    else searchParams.delete("search");
    redirect(`/developers?${searchParams.toString()}`);
  };

  return (
    <Input
      placeholder="Type to search"
      value={search}
      onChange={handleSearch}
    />
  );
}
