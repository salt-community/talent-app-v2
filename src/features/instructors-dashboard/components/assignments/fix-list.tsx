import { Button, Textarea } from "@/components";
import { CalendarForm } from "@/components/ui/calendar-form";
import { Calendar1, Plus } from "lucide-react";
import { useState } from "react";
import { addFixToAssignmentScoreAction } from "../../action";
import { FixLists } from "../../types";
import OptionMenu from "./option-menu";

type FixesProps = {
  fixes: FixLists[];
  assignmentScoreId?: string | null;
};

export function FixList({ fixes, assignmentScoreId }: FixesProps) {
  const [datetime, setDatetime] = useState<{ date?: Date; time: string }>({
    date: undefined,
    time: "",
  });
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // need to refactor for better error handling later, maybe anton can help?
  const handleAddFix = async () => {
    if (!assignmentScoreId) {
      alert("Cannot add fix: No assignment score selected");
      return;
    }

    if (!description) {
      alert("Please provide a description");
      return;
    }

    setIsSubmitting(true);

    let dueDate = undefined;
    if (datetime.date) {
      dueDate = new Date(datetime.date);
      if (datetime.time) {
        const [hours, minutes] = datetime.time.split(":");
        dueDate.setHours(parseInt(hours || "0", 10));
        dueDate.setMinutes(parseInt(minutes || "0", 10));
      }
    }

    await addFixToAssignmentScoreAction({
      assignmentScoreId,
      description,
      dueDate,
    });

    setDescription("");
    setDatetime({ date: undefined, time: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Fix List</h1>
        <div className="flex items-center">
          <CalendarForm value={datetime} onChange={setDatetime} />
          <Button
            className="bg-gray-900 text-white ml-4 cursor-pointer"
            onClick={handleAddFix}
            disabled={isSubmitting || !description}
          >
            <Plus size={18} />
            Add New Fix
          </Button>
        </div>
      </div>
      <div className="mb-2">
        <Textarea
          placeholder="Describe the fix request..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {datetime.date && (
        <div className="mb-8 text-sm text-gray-600 italic ml-1">
          Due:{" "}
          {datetime.date?.toLocaleDateString("en-SE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {datetime.time && <span className="ml-1">at {datetime.time}</span>}
        </div>
      )}
      <div className="space-y-4">
        {fixes.length > 0 ? (
          fixes.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 relative"
            >
              <div
                className={`absolute top-0 left-0 h-full w-2 rounded-l-lg ${
                  item.isCompleted ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <div className="flex justify-end">
                <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <OptionMenu />
                </button>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex items-center text-gray-500 gap-2">
                <Calendar1 size={16} />
                <span>
                  Due{" "}
                  {item.dueDate
                    ? item.dueDate.toLocaleDateString()
                    : "No due date"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-600 text-lg text-center italic">
              No fix requests have been submitted for this developer
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
