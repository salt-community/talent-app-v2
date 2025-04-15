"use client";

import * as React from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

type DateTimeValue = {
  date?: Date;
  time: string;
};

type CalendarFormProps = {
  value: DateTimeValue;
  onChange: (val: DateTimeValue) => void;
};

export function CalendarForm({ value, onChange }: CalendarFormProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="px-4 cursor-pointer">
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 space-y-4" align="start">
        <Calendar
          mode="single"
          selected={value.date}
          onSelect={(date) => onChange({ ...value, date: date ?? undefined })}
          initialFocus
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
        />

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <Input
            type="time"
            value={value.time}
            onChange={(e) => onChange({ ...value, time: e.target.value })}
            className="w-[120px]"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
