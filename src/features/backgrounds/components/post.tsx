import { PostBackground } from "./post-background";
import { PostIntroduction } from "./post-introduction";
import { PostSalt } from "./post-salt";

export function Post(){
 return (
  <main>
   <PostIntroduction/>
   <PostBackground/>
   <PostSalt/>
  </main>
 )
}