import { Hero } from "./hero";
import { HighlightedDevelopers } from "./highlighted-developers";
import { InterviewCard } from "./interview-card";
import { Posts } from "./posts";

export function HighlightPage(){
 return(
  <>
  <Hero/>
  <HighlightedDevelopers/>
  <Posts/>

  </>
 )
}