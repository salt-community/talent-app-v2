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

type Props = {
  user: { slug: string; id: string; role: string } | undefined;
  permissions: {
    hasAdminDashboardAccess: boolean;
    hasDeveloperAccess: boolean;
    hasInstructorsDashboardAccess: boolean;
  };
};

export function HamburgerMenu({ user, permissions }: Props) {
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
          <SheetTitle className="text-xl">{"</salt>"}</SheetTitle>
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
              isActive("/developers") ? "border-primary" : "border-white"
            } hover:border-primary`}
          >
            <Link href="/developers" onClick={closeMenu}>
              Developers
            </Link>
          </li>
          {permissions.hasDeveloperAccess && (
            <li
              className={`border-b ${
                isActive(`/profile/${user?.id}`)
                  ? "border-primary"
                  : "border-white"
              } hover:border-primary`}
            >
              <Link href={`/developer-dashboard`}>Dashboard</Link>
            </li>
          )}
          {permissions.hasInstructorsDashboardAccess && (
            <li
              className={`border-b ${
                isActive("/cohorts") ? "border-primary" : "border-white"
              } hover:border-primary`}
            >
              <Link href="/instructor-dashboard" onClick={closeMenu}>
                Instructors Dashboard
              </Link>
            </li>
          )}
          {permissions.hasAdminDashboardAccess && (
            <li
              className={`border-b ${
                isActive("/admin/developers")
                  ? "border-primary"
                  : "border-white"
              } hover:border-primary`}
            >
              <Link href="/admin/developers" onClick={closeMenu}>
                Admin
              </Link>
            </li>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
