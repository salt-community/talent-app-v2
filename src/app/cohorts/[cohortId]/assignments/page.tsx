import { H1 } from "@/components";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="container mx-auto flex flex-col justify-center px-4 py-4 gap-4">
      <div className="md:flex md:justify-between">
        <H1>Cohorts</H1>
        <div className="flex py-1 px-1 bg-gray-200 rounded-md justify-between mt-2 md:mt-0">
          <Link
            href="/admin/developers"
            className="py-1 px-4 rounded-md bg-black text-white"
          >
            Assignments
          </Link>
          <Link
            href="/admin/identities"
            className="mx-2 py-1 px-4 rounded-md text-paragraphLight"
          >
            Students
          </Link>
        </div>
      </div>
    </div>
  );
}
