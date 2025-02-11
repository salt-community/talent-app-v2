import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent, TabsList } from "@radix-ui/react-tabs";
import { CohortList } from "./cohort-list";
import { AddCohortForm } from "./create-cohort-form";

export function CohortDashboard() {
  return (
    <Tabs defaultValue="cohorts" className="m-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
        <TabsTrigger value="add">Add cohort</TabsTrigger>
      </TabsList>
      <TabsContent value="cohorts">
        <CohortList />
      </TabsContent>
      <TabsContent value="add">{/* <AddCohortForm />/ */}</TabsContent>
    </Tabs>
  );
}
