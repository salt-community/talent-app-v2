import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components";
import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  placeholder: string;
  onAdd: (value: string) => void;
};

export function CvPopover({ placeholder, onAdd }: Props) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleOnAdd = () => {
    onAdd(value);
    setOpen(false);
    setValue("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="w-full h-7 mt-2">
          <Plus size={24} className="cursor-pointer" /> Add
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-54 p-1 flex items-center justify-center"
        align="end"
      >
        <div className="flex items-center justify-center w-full gap-1">
          <input
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="p-1 rounded h-7 flex-grow text-sm focus:ring-slate-500"
          />
          <Button variant="link" size="sm" onClick={handleOnAdd}>
            <Plus size={12} className="cursor-pointer" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
