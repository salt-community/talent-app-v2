import { roles } from "./roles";

export type Role = keyof typeof roles;
export type Permission = (typeof roles)[Role][number];
