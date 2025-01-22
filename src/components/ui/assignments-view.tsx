"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AssignmentsView() {
  // const [subTab, setSubTab] = useState("add");

  return (
    <div className="mt-6">
      {/* <Tabs value={subTab} onValueChange={setSubTab}> */}
      <TabsList className="gap-4 p-4">
        <TabsTrigger value="add">Add Assignment</TabsTrigger>
        <TabsTrigger value="list">List Assignments</TabsTrigger>
      </TabsList>

      {/* <TabsContent value="add">
          <AddAssignmentForm />
        </TabsContent>
        <TabsContent value="list">
          <ListAssignments />
        </TabsContent> */}
      {/* </Tabs> */}
    </div>
  );
}
