import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import Image from "next/image";

export function ProjectHighlight(){
 return (
   <Card className="m-2">
     <CardHeader className="px-2 py-6">
       <div className="flex items-center gap-6">
         <Avatar>
           <AvatarImage className="w-10" src={"./avatar.png"} />
         </Avatar>
         <div>
           <CardTitle className="text-xl">Developer Name</CardTitle>
           <CardDescription>Full-stack JavaScript Developer</CardDescription>
         </div>
       </div>
     </CardHeader>
     <CardContent className="pt-0">
      <p className=" font-semibold text-lg">Project title</p>
       <Image
         src="/placholder-img.png"
         width={250}
         height={240}
         alt=""
         unoptimized
         className=" object-fill w-full pt-2 pb-4"
       />
       <p className="text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta repellat, earum aperiam aliquid nemo quas totam laboriosam voluptatum aut sequi cumque, odit tempora natus? Repudiandae, omnis velit! Soluta, saepe nesciunt!
       </p>
     </CardContent>
   </Card>
 );
}