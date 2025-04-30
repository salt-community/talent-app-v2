"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Developer } from "../../types";
import dynamic from "next/dynamic";

const DeleteDeveloperButton = dynamic(
  () =>
    import("./delete-developer-button").then(
      (mod) => mod.DeleteDeveloperButton
    ),
  { ssr: false }
);

export default function StudentCard({ developer }: { developer: Developer[] }) {
  return (
    <>
      <Card className="border-none shadow-none">
        <CardContent className="space-y-6">
          {developer.map((dev) => (
            <div
              key={dev.id}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={
                      "https://api.dicebear.com/9.x/pixel-art/svg" +
                      dev.name +
                      ".svg"
                    }
                    alt={dev.name}
                  />
                  <AvatarFallback>
                    {dev.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  {dev.name}
                  <div className="flex items-center space-x-2 text-muted-foreground text-sm"></div>
                </div>
              </div>
              <DeleteDeveloperButton identityId={dev.id} name={dev.name} />
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
