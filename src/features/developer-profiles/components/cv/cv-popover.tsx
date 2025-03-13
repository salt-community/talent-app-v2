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
    <Popover
      open={open}
      onOpenChange={(opened) => {
        setOpen(opened);
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="link" size="icon">
          <Plus size={24} className="cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-54" align="end">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border p-1 rounded"
          />
          <Button onClick={handleOnAdd}>Add</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
