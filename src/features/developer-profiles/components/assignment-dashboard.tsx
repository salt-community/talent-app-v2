import { Star, List } from "lucide-react";
import { Fix_Item, TabType } from "../types";
import { DeveloperAssignments } from "./developer-assignments";
import { FixList } from "./fix-list";
import { developerProfilesService } from "../instance";
import { notFound } from "next/navigation";

export async function AssignmentDashboard() {
  const currentUser = await developerProfilesService.getCurrentUsers();
  const identityId = currentUser?.id;

  if (!identityId) {
    return notFound();
  }

  const assignments =
    await developerProfilesService.getScoredAssignmentsByIdentityId(identityId);

  const fixListItems = assignments.flatMap(
    (assignment) => assignment.fixList || []
  );

  const fixCount = fixListItems.filter(
    (item: Fix_Item) => item.isCompleted === false
  );

  const tabs = [
    {
      id: "feedback" as TabType,
      label: "Feedback",
      icon: <Star className="w-5 h-5" />,
    },
    {
      id: "fixList" as TabType,
      label: "Fix List",
      icon: <List className="w-5 h-5" />,
      count: fixCount.length ? fixCount.length : 0,
    },
  ];

  const fixListContent = (
    <div className="p-6">
      <FixList items={fixListItems} />
    </div>
  );

  return (
    <div>
      <DeveloperAssignments />
    </div>
  );
}
