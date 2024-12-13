import { Tag } from "emblor";
import { SocialLink } from "./schema";

export type Background = {
  name: string;
  id: number;
  avatarUrl: string;
  title: string;
  bio: string;
  languages: Tag[];
  educations: Tag[];
  skills: Tag[];
  links: SocialLink[];
};