import React from "react";
import { BackgroundAvatar } from "./avatar";
import { H2 } from "@/components";
import { addBackground } from "../actions";

type Props = { devId: string };

export default async function BackgroundSkeleton({ devId }: Props) {
  const developer = await addBackground(devId);
  return (
    <>
      <section className="flex justify-between w-full">
        <div className="flex gap-6 items-center justify-between">
          <BackgroundAvatar url={"/avatar.png"} />
          <div>
            <p className="uppercase text-sm font-semibold"></p>
            <H2>{developer.name}</H2>
          </div>
        </div>
        <ul className="flex flex-col gap-2 justify-end items-top h-full"></ul>
      </section>
    </>
  );
}
