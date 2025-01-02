import { Separator, H1 } from "@/components";
import { SearchSettings } from "./search-configuration";
import { MeiliPopulation } from "./search-population";
import Link from "next/link";
import { adminService } from "../../instance";

export async function MeiliDashboard() {
  const isHealthy = await adminService.isSearchHealthOk();

  return (
    <div className="container mx-auto flex flex-col justify-center px-4 py-4 gap-4">
      <div className="md:flex md:justify-between">
        <H1>Admin</H1>
        <div className="flex py-1 px-1 bg-gray-200 rounded-md justify-between mt-2 md:mt-0">
          <Link
            href={"/admin/developers"}
            className="py-1 px-4 rounded-md text-paragraphLight"
          >
            Developers
          </Link>
          <Link
            href={"/admin/identities"}
            className="py-1 px-4 rounded-md text-paragraphLight"
          >
            Identities
          </Link>
          <Link
            href={"/admin/meilisearch-configuration"}
            className="py-1 px-4 rounded-md  bg-black text-white"
          >
            Search
          </Link>
        </div>
      </div>
      {isHealthy ? (
        <section className="container mx-auto h-full p-2">
          <div className="flex flex-col gap-8">
            <MeiliPopulation />
            <Separator />
            <SearchSettings />
          </div>
        </section>
      ) : (
        <div>Search is not healthy</div>
      )}
    </div>
  );
}
