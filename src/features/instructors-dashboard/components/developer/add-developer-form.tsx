import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Developer } from "../../types";

type Props = {
  developer: Developer;
};

export const AddDeveloperForm = ({ developer }: Props) => {
  const [selectedDev, setSelectedDev] = React.useState<string>("");

  const handleSubmit = () => {
    console.log({ selectedDeveloper: selectedDev });
  };

  return (
    <div className="space-y-4">
      <Select value={selectedDev} onValueChange={setSelectedDev}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a developer" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Developers</SelectLabel>
            {developer.map((dev) => (
              <SelectItem key={dev.id} value={dev.id}>
                {dev.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={handleSubmit} className="w-full">
        Add Developer
      </Button>
    </div>
  );
};
