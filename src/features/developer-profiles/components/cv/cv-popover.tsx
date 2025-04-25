import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components";
import { useState } from "react";

type Props = {
  placeholder: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  onAdd: (value: string) => void;
};

export function CvPopover({ placeholder, children, icon: Icon, onAdd }: Props) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleOnAdd = () => {
    onAdd(value);
    setOpen(false);
    setValue("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-52 p-1 flex items-center justify-center  "
        align="end"
      >
        <div className="flex items-center justify-center  ">
          <input
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="p-1 rounded text-sm focus:ring-slate-500 mr-3"
            onKeyDown={(event) => {
              if (event.key === "Enter") handleOnAdd();
            }}
          />
          <Button
            variant="link"
            size="sm"
            onClick={handleOnAdd}
            className="pl-1 cursor-pointer bg-gray-200  p-0 h-8 w-8 hover:motion-preset-seesaw"
          >
            <Icon size={16} />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
