"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HamburgerMenu() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="pt-3">
        <SheetHeader className="p-0 m-0">
          <SheetTitle className="text-xl">{"<salt/>"}</SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-4 py-2">
          <li
            className={`border-b ${
              isActive("/") ? "border-primary" : "border-white"
            } hover:border-primary`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`border-b ${
              isActive("/dashboard") ? "border-primary" : "border-white"
            } hover:border-primary`}
          >
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li
            className={`border-b ${
              isActive("/search") ? "border-primary" : "border-white"
            } hover:border-primary`}
          >
            <Link href="/search">Search</Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
