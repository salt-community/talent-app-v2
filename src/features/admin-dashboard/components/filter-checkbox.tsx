import { Checkbox } from "@/components/ui/checkbox";
import { FilterStatusDevelopers, FilterStatusRole } from "../types";
import { CheckedState } from "@radix-ui/react-checkbox";

type FilterStatus = FilterStatusDevelopers | FilterStatusRole;

type Props<T extends FilterStatus> = {
  value: string;
  filterStatus: T;
  setFilterStatus: React.Dispatch<React.SetStateAction<T>>;
};

export default function FilterCheckbox<T extends FilterStatus>({
  value,
  filterStatus,
  setFilterStatus,
}: Props<T>) {
  const isChecked: CheckedState = !!filterStatus[value as keyof T];

  function handleChange(checked: CheckedState) {
    setFilterStatus(
      (prevStatus: T) =>
        ({
          ...prevStatus,
          [value]: !!checked,
        }) as T
    );
  }

  return (
    <div className="flex justify-between p-2">
      <label
        htmlFor={value}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-2"
      >
        {value}
      </label>
      <Checkbox id={value} checked={isChecked} onCheckedChange={handleChange} />
    </div>
  );
}
