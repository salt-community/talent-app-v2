import { AboutSalt } from "./about-salt";
import { Hero } from "./hero";
import { HighlightedDevelopers } from "./highlighted-developers";
import { Posts } from "./posts";

export function HighlightPage(){
 return(
  <>
  <Hero/>
  <AboutSalt/>
  <Posts/>
  <HighlightedDevelopers/>

  </>
 )
}