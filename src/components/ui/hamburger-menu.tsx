"use client";

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
import { useState } from "react";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const closeMenu = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="p-0">
        <MenuIcon className="hover:bg-accent p-1" size={32} />
      </SheetTrigger>
      <SheetContent className="pt-4">
        <SheetHeader className="p-0 m-0">
          <SheetTitle className="text-xl">{"<salt/>"}</SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-4 py-2">
          <li
            className={`border-b ${
              isActive("/") ? "border-primary" : "border-white"
            } hover:border-primary`}
          >
            <Link href="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li
            className={`border-b ${
              isActive("/dashboard") ? "border-primary" : "border-white"
            } hover:border-primary`}
          >
            <Link href="/dashboard" onClick={closeMenu}>
              Admin
            </Link>
          </li>
          <li
            className={`border-b ${
              isActive("/developers") ? "border-primary" : "border-white"
            } hover:border-primary`}
          >
            <Link href="/developers" onClick={closeMenu}>
              Developers
            </Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
