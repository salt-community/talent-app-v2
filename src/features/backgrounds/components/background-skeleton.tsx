import React from "react";
import { BackgroundAvatar } from "./avatar";
import { H2 } from "@/components";
import { addBackground } from "../actions";
import type { Developer } from "@/features/developer-profiles";
import { errorHandler } from "@/lib";

type Props = { developerProfileId: string };

export default async function BackgroundSkeleton({
  developerProfileId,
}: Props) {
  let developer: Developer | undefined;

  try {
    developer = await addBackground(developerProfileId);
  } catch (error) {
    errorHandler(error);
  }

  return (
    <>
      <section className="flex justify-between w-full">
        <div className="flex gap-6 items-center justify-between">
          <BackgroundAvatar url={"/avatar.png"} />
          <div>
            <p className="uppercase text-sm font-semibold"></p>
            <H2>{developer ? developer.name : "Loading..."}</H2>
          </div>
        </div>
        <ul className="flex flex-col gap-2 justify-end items-top h-full"></ul>
      </section>
    </>
  );
}
