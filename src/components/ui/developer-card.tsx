import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function DeveloperCard({ children }: Props) {
  return (
    <div className="py-6 md:py-8 md:px-32 lg:px-[10%] xl:px-[15%]">
      <Card className="mx-auto border-none">
        <CardContent className="">{children}</CardContent>
      </Card>
    </div>
  );
}
