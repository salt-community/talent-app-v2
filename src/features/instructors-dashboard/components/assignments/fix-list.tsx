import { Button, Textarea } from "@/components";
import { CalendarForm } from "@/components/ui/calendar-form";
import { Calendar1, Plus } from "lucide-react";
import { useOptimistic, useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  addFixToAssignmentScoreAction,
  deleteFixItemByIdAction,
  updateFixStatusByIdAction,
} from "../../action";
import { FixLists } from "../../types";
import { OptionMenu } from "./option-menu";

type FixesProps = {
  fixes: FixLists[];
  assignmentScoreId?: string | null;
};

export function FixList({ fixes, assignmentScoreId }: FixesProps) {
  const { toast } = useToast();
  const [datetime, setDatetime] = useState<{ date?: Date; time: string }>({
    date: undefined,
    time: "",
  });
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

  const [optimisticFixes, setOptimisticFixes] = useOptimistic(
    fixes,
    (
      state,
      action: {
        type: string;
        id?: string;
        newFix?: FixLists;
        newStatus?: boolean;
      }
    ) => {
      switch (action.type) {
        case "add":
          return [...state, action.newFix!];
        case "update":
          return state.map((item) =>
            item.id === action.id
              ? { ...item, isCompleted: action.newStatus! }
              : item
          );
        case "delete":
          return state.filter((item) => item.id !== action.id);
        default:
          return state;
      }
    }
  );

  const handleAddFix = async () => {
    if (!assignmentScoreId) {
      toast({
        title: "Error",
        description: "Cannot add fix: No assignment score selected",
        variant: "destructive",
      });
      return;
    }

    if (!description) {
      toast({
        title: "Error",
        description: "Please provide a description",
        variant: "destructive",
      });
      return;
    }

    let dueDate: Date | null = null;
    if (datetime.date) {
      dueDate = new Date(datetime.date);
      if (datetime.time) {
        const [hours, minutes] = datetime.time.split(":");
        dueDate.setHours(parseInt(hours || "0", 10));
        dueDate.setMinutes(parseInt(minutes || "0", 10));
      }
    }

    const newFix = {
      id: `temp-${Date.now()}`,
      assignmentScoreId,
      description,
      isCompleted: false,
      dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      developerId: "1",
    };

    startTransition(async () => {
      try {
        setOptimisticFixes({ type: "add", newFix });

        await addFixToAssignmentScoreAction({
          assignmentScoreId,
          description,
          dueDate,
        });

        toast({
          title: "Success",
          description: "Fix request added successfully",
          variant: "default",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong while adding the fix request",
          variant: "destructive",
        });
      }
    });

    setDescription("");
    setDatetime({ date: undefined, time: "" });
  };

  const handleStatusChange = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      try {
        setOptimisticFixes({
          type: "update",
          id,
          newStatus: !currentStatus,
        });

        const result = await updateFixStatusByIdAction(id, !currentStatus);

        if (!result.success) {
          setOptimisticFixes({
            type: "update",
            id,
            newStatus: currentStatus,
          });

          toast({
            title: "Error",
            description: String(result.error),
          });
        } else {
          toast({
            title: "Success",
            description: `Fix item status changed to ${!currentStatus ? "completed" : "pending"}`,
          });
        }
      } catch (error) {
        console.error(error);
        setOptimisticFixes({
          type: "update",
          id,
          newStatus: currentStatus,
        });

        toast({
          title: "Error",
          description: "An unexpected error occurred",
        });
      }
    });
  };

  const handleDeleteFixItem = (id: string) => {
    startTransition(async () => {
      try {
        setOptimisticFixes({
          type: "delete",
          id,
        });

        const result = await deleteFixItemByIdAction(id);

        if (!result.success) {
          toast({
            title: "Error",
            description: String(result.error),
          });
        } else {
          toast({
            title: "Success",
            description: "Fix item deleted successfully",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
        });
      }
    });
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
            disabled={isPending || !description}
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
        {optimisticFixes.length > 0 ? (
          optimisticFixes.map((item) => (
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
                <div className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <OptionMenu
                    id={item.id}
                    status={item.isCompleted}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteFixItem}
                    isPending={isPending}
                  />
                </div>
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
