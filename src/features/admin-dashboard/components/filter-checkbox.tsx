import { Checkbox } from "@/components/ui/checkbox";

type FilterStatusDevelopers = {
  developer: boolean;
  core: boolean;
  admin: boolean;
};
type FilterStatusRole = {
  developer: boolean;
  core: boolean;
  admin: boolean;
};
type Props = {
  value: string;
  filterStatus: FilterStatusDevelopers | FilterStatusRole;
  setFilterStatus: React.Dispatch<
    React.SetStateAction<FilterStatusDevelopers | FilterStatusRole>
  >;
};

export default function FilterCheckbox({
  value,
  filterStatus,
  setFilterStatus,
}: Props) {
  type CurrentFilter = typeof filterStatus;
  const isChecked = filterStatus[value as keyof CurrentFilter];

  function handleChange(checked: boolean) {
    setFilterStatus((prevStatus) => ({
      ...prevStatus,
      [value]: checked,
    }));
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
