import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";

export function ProjectHighlight(){
 return (
   <Card className="m-2">
     <CardHeader>
       <div className="flex items-center justify-evenly gap-6">
         <Avatar>
           <AvatarImage className="w-10" src={"./avatar.png"} />
         </Avatar>
         <div>
         <CardTitle className="text-xl">Developer Name</CardTitle>
         <CardDescription>Full-stack JavaScript Developer</CardDescription>
         </div>
       </div>
     </CardHeader>
     <CardContent>
       <p>Slow Chat Final</p>
     </CardContent>
     <CardFooter>
       <p>Card Footer</p>
     </CardFooter>
   </Card>
 );
}