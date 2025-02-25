export type Developer = {
  id: string;
  name: string;
  clerkId: string;
  email: string;
  role: string;
};

 export type Cohort = {
   id?: string;
   name: string;
   status: string;
   description: string;
   createdAt: Date | null;
 };