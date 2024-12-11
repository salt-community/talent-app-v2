import { Circle } from "lucide-react";

type Props = {
 status: string;
}

export function Status({status}:Props) {
 return <Circle size={14} fill={status} color="none" />;
}