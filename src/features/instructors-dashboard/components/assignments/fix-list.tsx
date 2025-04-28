import { Button, Textarea } from "@/components";
import { CalendarForm } from "@/components/ui/calendar-form";
import { Calendar1, Plus } from "lucide-react";
import { useOptimistic, useState, useTransition } from "react";
import {
  addFixToAssignmentScoreAction,
  deleteFixItemByIdAction,
  updateFixStatusByIdAction,
} from "../../action";
import { FixLists } from "../../types";
import { OptionMenu } from "./option-menu";
import toast from "react-hot-toast";

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


  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());


  const handleAddFix = async () => {

    let dueDate: Date | null = null;
    if (datetime.date) {
      dueDate = new Date(datetime.date);
      if (datetime.time) {
        const [hours, minutes] = datetime.time.split(":");
        dueDate.setHours(parseInt(hours || "0", 10));
        dueDate.setMinutes(parseInt(minutes || "0", 10));
      }
    }
    if (!assignmentScoreId) {
      return;
    }

    return toast.promise(
      new Promise(async (resolve) => {
        startTransition(async () => {
          await addFixToAssignmentScoreAction({ assignmentScoreId, description, dueDate });
          resolve(true);
        });
      }),
      {
        loading: "Adding...",
        success: "New fix added",
        error: "Could not add the new fix",
      }
    ).then(() => {
      setDescription("");
      setDatetime({ date: undefined, time: "" });
    });
  };

  const handleStatusChange = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      setOptimisticFixes({
        type: "update",
        id,
        newStatus: !currentStatus,
      });
    });
    return toast.promise(
      new Promise(async (resolve) => {

        await updateFixStatusByIdAction(id, !currentStatus);
        resolve(true);
      }),
      {
        loading: "Updating status...",
        success: "Status updated successfully!",
        error: "Failed to update status.",
      }
    );
  };

  const handleDeleteFixItem = (id: string) => {
    setDeletingIds(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
    return toast.promise(new Promise((resolve) => {
      startTransition(async () => {
        setOptimisticFixes({
          type: "delete",
          id,
        });
        await deleteFixItemByIdAction(id);
      });
      resolve(true)
    }),
      {
        loading: "Deleting fix...",
        success: "Fix deleted successfully!",
        error: "Failed to delete the items."
      })
  };

  return (
    <div className="container mx-auto p-6 ">
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
      <div className="space-y-4 flex flex-col overflow-hidden ">
        {optimisticFixes.length > 0 ? (
          optimisticFixes.sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
            .map((item) => (
              <div
                key={item.id}
                className={`border border-gray-200 rounded-lg p-4 relative 
                  ${deletingIds.has(item.id)
                    ? "motion-translate-x-out-100 motion-duration-[1s] motion-ease-spring-smooth "
                    : "motion-translate-y-in-100 motion-duration-[1s] motion-ease-spring-smooth"}`}
              >
                <div
                  className={`absolute top-0 left-0 h-full w-2 rounded-l-lg transition-colors duration-300 ease-in-out ${item.isCompleted ? "bg-green-500" : "bg-red-500"
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
