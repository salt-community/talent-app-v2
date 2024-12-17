import { createService } from "./service";

type DevelopersService = ReturnType<typeof createService>;

export type CheckAccess = DevelopersService["checkAccess"];
