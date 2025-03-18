import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  value: string;
};

export default function FilterCheckbox({ value }: Props) {
  return (
    <div className="flex items-start p-2">
      <Checkbox id={value} />
      <label
        htmlFor={value}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-2"
      >
        {value}
      </label>
    </div>
  );
}
