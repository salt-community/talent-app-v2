import { Checkbox } from "@/components/ui/checkbox";

type FilterStatus = {
  highlighted: boolean;
  published: boolean;
  unpublished: boolean;
};
type Props = {
  value: string;
  filterStatus: FilterStatus;
  setFilterStatus: React.Dispatch<React.SetStateAction<FilterStatus>>;
};

export default function FilterCheckbox({
  value,
  filterStatus,
  setFilterStatus,
}: Props) {
  const isChecked = filterStatus[value as keyof FilterStatus];

  function handleChange(checked: boolean) {
    setFilterStatus((prevStatus) => ({
      ...prevStatus,
      [value]: checked,
    }));
  }
  return (
    <div className="flex items-start p-2">
      <Checkbox id={value} checked={isChecked} onCheckedChange={handleChange} />
      <label
        htmlFor={value}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-2"
      >
        {value}
      </label>
    </div>
  );
}
