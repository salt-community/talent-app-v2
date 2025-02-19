"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  slug: string;
};

export function AssignmentsCardSmall({ title, slug }: Props) {
  return (
    <Link href={slug}>
      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt={title} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
    </Link>
  );
}
