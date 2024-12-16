import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function DeveloperCard({ children }: Props) {
  return (
    <div className="md:flex md:flex-col md:justify-center md:items-center">
      <Card className="md: mx-auto max-w-96 ">
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
