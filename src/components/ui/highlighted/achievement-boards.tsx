import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export function AchievementBoards(){
 return (
   <section className="flex flex-col items-center py-8 gap-8 md:flex-row md:justify-evenly">
     <article className="outline rounded-full w-52 h-52 flex flex-col justify-center items-center p-3">
       <h2 className="text-center text-xl font-bold">Best Hack Week Project</h2>
       <div className="flex items-center p-2 gap-2">
         <Avatar>
           <AvatarImage className="w-10" src={"./avatar.png"} />
         </Avatar>
         <p className="text-center text-paragraph">Developer name</p>
       </div>
     </article>
     <article className="outline  rounded-full w-52 h-52 flex flex-col justify-center items-center p-3">
       <h2 className="text-center text-xl font-bold">Best Final Project</h2>
       <div className="flex items-center p-2 gap-2">
         <Avatar>
           <AvatarImage className="w-10" src={"./avatar.png"} />
         </Avatar>
         <p className="text-center text-paragraph">Developer name</p>
       </div>
     </article>
     <article className="outline rounded-full w-52 h-52 flex flex-col justify-center items-center p-3">
       <h2 className="text-center text-xl font-bold">Student of the month</h2>
       <div className="flex items-center p-2 gap-2">
         <Avatar>
           <AvatarImage className="w-10" src={"./avatar.png"} />
         </Avatar>
         <p className="text-center text-paragraph">Developer name</p>
       </div>
     </article>
   </section>
 );
}