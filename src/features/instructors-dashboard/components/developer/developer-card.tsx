"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Developer } from "../../types";

export default function StudentCard({ developer }: { developer: Developer }) {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-6">
        {developer.map((dev) => (
          <div key={dev.id} className="flex items-center justify-between group">
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
                <Link
                  href={`/developers/${dev.slug}`}
                  className="text-foreground font-medium hover:underline hover:underline-offset-4"
                >
                  {dev.name}
                </Link>
                <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                  <span>@{dev.slug || dev.name.toLowerCase()}</span>
                </div>
              </div>
            </div>

            {/* Add something more after talk with Marcus */}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
