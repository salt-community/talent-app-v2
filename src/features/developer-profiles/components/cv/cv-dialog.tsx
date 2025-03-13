import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components";
import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  placeholder: string;
  isOpen: boolean;
  onAdd: (value: string) => void;
};

export function CvDialog({ placeholder, isOpen, onAdd }: Props) {
  const [value, setValue] = useState("");

  const handleOnAdd = () => {
    onAdd(value);
    setValue("");
  };

  return (
    <Popover>
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
            className="border p-1 rounded"
          />
          <Button onClick={handleOnAdd}>Add</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
