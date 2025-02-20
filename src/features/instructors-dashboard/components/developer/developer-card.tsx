"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Developer } from "../../types";
import { Separator } from "@/components";

export default function StudentCard({ developer }: { developer: Developer }) {
  return (
    <>
      <Separator />
      <Card className="border-none shadow-none">
        <CardContent className="space-y-6">
          {developer.map((dev) => (
            <div
              key={dev.id}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
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
                  <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                    <Link
                      href={`/developers/${dev.slug}`}
                      className="text-foreground font-medium hover:underline hover:underline-offset-4 hover:text-blue-700"
                    >
                      <span>@{dev.slug || dev.name.toLowerCase()}</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Add something more after talk with Marcus */}
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
