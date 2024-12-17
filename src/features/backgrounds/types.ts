import { Tag } from "emblor";
import { SocialLink } from "./schema";

export type Background = {
  id: number;
  name: string;
  devId: string;
  avatarUrl: string;
  title: string;
  bio: string;
  languages: Tag[];
  educations: Tag[];
  skills: Tag[];
  links: SocialLink[];
};

export type ServiceMethods = {
  syncBackgroundSearchIndex: (
    background: Record<string, unknown>[]
  ) => Promise<unknown>;
};
