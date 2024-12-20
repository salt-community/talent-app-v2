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

type Props = {
  user: { id: string; role: string } | undefined;
};

export function HamburgerMenu({ user }: Props) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <Sheet>
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
            <Link href="/">Home</Link>
          </li>
          {user?.role === "developer" && (
            <li
              className={`border-b ${
                isActive(`/profile/${user.id}`)
                  ? "border-primary"
                  : "border-white"
              } hover:border-primary`}
            >
              <Link href={`/profile/${user.id}`}>My profile</Link>
            </li>
          )}
          <li
            className={`border-b ${
              isActive("/dashboard") ? "border-primary" : "border-white"
            } hover:border-primary`}
          >
            <Link href="/dashboard">Admin</Link>
          </li>
          <li
            className={`border-b ${
              isActive("/developers") ? "border-primary" : "border-white"
            } hover:border-primary`}
          >
            <Link href="/developers">Developers</Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
