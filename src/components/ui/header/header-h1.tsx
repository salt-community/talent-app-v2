import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  textColor?: string;
};
export function H1({ children, textColor }: Props) {
  return <h1 className={`text-3xl font-bold ${textColor}`}>{children}</h1>;
}
